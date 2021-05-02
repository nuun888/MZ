/*:-----------------------------------------------------------------------------------
 * NUUN_ItemUseCount.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */
/*:
 * @target MZ
 * @plugindesc  アイテム使用回数
 * @author NUUN
 * @version 1.0.2
 * 
 * 
 * @help
 * アイテムに１回消費するまでの使用回数を設定できます。使用回数カウントが０になった時そのアイテムは消耗します。
 * アイテムを売却する際、全て売却した場合そのアイテムの通常売却額１つ分の売却額が使用回数に応じて減少します。
 * ※現在のバージョンではショップ画面で表示される売却額は使用回数を考慮していない売却額となっています。
 * 
 * アイテム消耗率と併用する場合は、順番によってはSE再生等の動作が異なります。
 * 
 * アイテムのメモ欄
 * <ItemUseCount:[Num]>使用回数を設定します。[Num]:使用回数
 * <ItemUseCountHide>アイテム欄に使用回数を表示させません。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/5/2 Ver.1.0.2
 * 装備を外すときにエラーが出る問題を修正。
 * 2020/12/31 Ver.1.0.1
 * アイテム欄の使用回数を非表示に出来る機能を追加。
 * 2020/12/24 Ver.1.0.0
 * 初版
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_ItemUseCount = true;

(() => {
const parameters = PluginManager.parameters('NUUN_ItemUseCount');

const _Game_Party_initialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
  _Game_Party_initialize.call(this);
  this.initUseItemCount();
};

const _DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
  _DataManager_extractSaveContents.call(this, contents);
  $gameParty.initUseItemCount();
};

Game_Party.prototype.initUseItemCount = function() {
  if (!this._useItemCount) {
    this._useItemCount = [];
  }
  for (let i = 1; i < $dataItems.length; i++) {
    this.setUseItemCount($dataItems[i]);
  }
};

Game_Party.prototype.setUseItemCount = function(item) {
  if (item && !this._useItemCount[item.id]) {
    this._useItemCount[item.id] = Number(item.meta.ItemUseCount) || 0;
  }
};

Game_Party.prototype.useItemCount = function(item) {
  this._useItemCount[item.id]--;
};

Game_Party.prototype.useItemCountReset = function(item) {
  this.setUseItemCount(item);
};

Game_Party.prototype.getUseItemCount = function(item) {
  return this._useItemCount[item.id] || 0;
};

const _Game_Party_consumeItem = Game_Party.prototype.consumeItem;
Game_Party.prototype.consumeItem = function(item) {
  if (DataManager.isItem(item) && item.consumable) {
    if (this.getUseItemCount(item) > 0) {
      this.useItemCount(item);
      if (this.getUseItemCount(item) > 0) {
        return;
      }
      this.useItemCountReset(item);
    }
    _Game_Party_consumeItem.call(this, item);
  }
};

const _Game_Party_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
  const container = this.itemContainer(item);
  if (container) {
    this.setUseItemCount(item);
  }
  _Game_Party_gainItem.call(this, item, amount, includeEquip);
};

const _Game_Party_loseItem = Game_Party.prototype.loseItem;
Game_Party.prototype.loseItem = function(item, amount, includeEquip) {
  _Game_Party_loseItem.call(this, item, amount, includeEquip);
  if (this.numItems(item) === 0) {
    this.useItemCountReset(item);
  }
};

const _Scene_Shop_doSell = Scene_Shop.prototype.doSell;
Scene_Shop.prototype.doSell = function(number) {
  const count = $gameParty.getUseItemCount(this._item);
  _Scene_Shop_doSell.call(this, number);
  if ($gameParty.numItems(this._item) === 0) {
    $gameParty.loseGold(this.depreciation(this.sellingPrice(), count));
  }
};

Scene_Shop.prototype.depreciation = function(price, count) {
  if ($gameParty.getUseItemCount(this._item) > 0) {
    price = price - Math.floor(count / this._item.meta.ItemUseCount * price);
  }
  return price;
};

const _Window_ItemList_initialize = Window_ItemList.prototype.initialize;
Window_ItemList.prototype.initialize = function(rect) {
  _Window_ItemList_initialize.call(this, rect);
  this._itemUseCountText = "";
  this._itemUseCountTextWidth = 0;
};

const _Window_ItemList_drawItem = Window_ItemList.prototype.drawItem;
Window_ItemList.prototype.drawItem = function(index) {
  const item = this.itemAt(index);
  if (item && item.meta.ItemUseCount && !item.meta.ItemUseCountHide) {
    this._itemUseCountText = " ["+ $gameParty.getUseItemCount(item) +"/"+ item.meta.ItemUseCount +"]";
    this._itemUseCountTextWidth = this.textWidth(this._itemUseCountText);
  } else {
    this._itemUseCountTextWidth = 0;
    this._itemUseCountText = '';
  }
  _Window_ItemList_drawItem.call(this, index);
};

const _Window_ItemList_umberWidth = Window_ItemList.prototype.numberWidth;
Window_ItemList.prototype.numberWidth = function() {
  return _Window_ItemList_umberWidth.call(this) + this._itemUseCountTextWidth;
};

const _Window_ItemList_drawItemNumber = Window_ItemList.prototype.drawItemNumber;
Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
  if (this.needsNumber()) {
      const width2 = width - this._itemUseCountTextWidth;
      _Window_ItemList_drawItemNumber.call(this, item, x, y, width2);
      this.drawItemUseCountNumber(item, x, y, width);
  }
};

Window_ItemList.prototype.drawItemUseCountNumber = function(item, x, y, width) {
  if (item.meta.ItemUseCount) {
    this.drawText(this._itemUseCountText, x, y, width, "right");
  }
};
})();