/*:-----------------------------------------------------------------------------------
 * NUUN_ItemCategory.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */
/*:
 * @target MZ
 * @plugindesc アイテムカテゴリーカスタマイズ
 * @author NUUN
 * @version 1.3.1
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_ItemNum
 * 
 * @help
 * アイテムに独自のカテゴリーを追加することが出来ます。
 * プラグインパラメータでカテゴリーキーを設定し、アイテム、武器、防具のメモ欄に<CategoryType:[typeName]>を記入します。
 * メモ欄に記入した[typeName]と同じカテゴリーキーのカテゴリーにアイテムが表示されるようになります。
 * カテゴリーキーに「allItems」を記入しますと、そのカテゴリーは隠しアイテムを除く
 * 全てのアイテムが表示されます。
 * item:カテゴリーキーのないまたは大事なもの以外のアイテム
 * weapon:カテゴリーキーのない武器
 * armor:カテゴリーキーのない防具
 * keyItem:大事なもの
 * allItems:アイテム、武器、防具、大事なものすべて
 * allItem:全てのアイテム
 * 
 * [typeName]:カテゴリーキー
 * ※カテゴリーキーについて
 *  item、weapon、armor、keyItemは独自カテゴリーのキーには使用できません。
 * 例
 * <CategoryType:sozai> このタグを記入したアイテムはsozaiカテゴリーに表示されます。
 * 
 * データベースのアイテムカテゴリーのチェックを外した場合、このプラグインで設定してもチェックを外したカテゴリーは表示はされません。
 * 
 * このプラグインはNUUN_Base Ver.1.3.0以降が必要です。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/6/12 Ver.1.3.1
 * 戦闘中でも個数非表示を適用する機能を追加。
 * 2022/5/8 Ver.1.3.0
 * 表示するカテゴリーを変更する機能を追加。
 * カテゴリーキーの設定方法変更（要再設定）
 * 2021/12/28 Ver.1.2.0
 * アイテムとキーアイテムを表示する機能を追加。
 * カテゴリーキーをコンボボックスに変更。
 * 2021/8/22 Ver.1.1.3
 * アイテム図鑑の独自カテゴリー機能追加による競合対策。
 * 2021/3/15 Ver.1.1.2
 * 戦闘中にアイテムの個数が表示されない問題を修正。
 * 2021/3/8 Ver.1.1.1
 * 全てのアイテム表示でkeyItem以外の個数の表示を反映するように修正。
 * 2021/3/7 Ver.1.1.0
 * 各カテゴリーに個数を表示するか選択できる機能を追加。
 * 売却画面でも表示行数を反映させるように修正。
 * 2020/11/18 Ver.1.0.0
 * 初版
 * 
 * @command AddCategory
 * @desc 表示するカテゴリーを変更します。
 * @text 表示カテゴリー変更
 * 
 * @arg ItemCategory
 * @text カテゴリー項目
 * @desc カテゴリー項目の設定。
 * @default []
 * @type struct<ItemCategoryList>[]
 * 
 * @command ResetCategory
 * @desc 表示するカテゴリーをもとに戻します。
 * @text 表示カテゴリーリセット
 * 
 * 
 * @param CategoryCols
 * @desc カテゴリーの表示列数。
 * @text カテゴリー列数
 * @type number
 * @default 4
 * 
 * @param CategoryRows
 * @desc カテゴリーの表示行数。
 * @text カテゴリー行数
 * @type number
 * @default 1
 * 
 * @param ItemCategory
 * @text カテゴリー項目
 * @desc カテゴリー項目の設定。
 * @default ["{\"CategoryName\":\"\",\"Categorykey\":\"'item'\",\"NumShow\":\"true\"}","{\"CategoryName\":\"\",\"Categorykey\":\"'weapon'\",\"NumShow\":\"true\"}","{\"CategoryName\":\"\",\"Categorykey\":\"'armor'\",\"NumShow\":\"true\"}","{\"CategoryName\":\"\",\"Categorykey\":\"'keyItem'\",\"NumShow\":\"true\"}"]
 * @type struct<ItemCategoryList>[]
 * 
 * @param BattleNumVisible
 * @text 戦闘中個数非表示
 * @desc 戦闘中でも個数表示をOFF、大事なものの個数を表示をOFFにしたカテゴリーアイテムの個数非表示を適用させます。
 * @type boolean
 * @default true
 * 
 */
/*~struct~ItemCategoryList:
 * @param CategoryName
 * @text カテゴリー名
 * @desc カテゴリー名を設定します。
 * @type string
 * 
 * @param Categorykey
 * @text カテゴリーキー
 * @desc カテゴリーキーを設定します。例:アイテムならitem リストにないキーは直接記入してください。
 * @type combo
 * @option 'item'
 * @option 'weapon'
 * @option 'armor'
 * @option 'keyItem'
 * @option 'allItems'
 * @option 'allItem'
 * @default
 * 
 * @param NumShow
 * @type boolean
 * @default true
 * @text 個数表示
 * @desc 個数を表示する。
 * 
 */
var Imported = Imported || {};
Imported.NUUN_ItemCategory = true;

(() => {
const parameters = PluginManager.parameters('NUUN_ItemCategory');
const CategoryCols = Number(parameters['CategoryCols'] || 4);
const CategoryRows = Number(parameters['CategoryRows'] || 1);
const ItemCategory = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ItemCategory'])) : null) || [];
const BattleNumVisible = eval(parameters['BattleNumVisible'] || 'true');
let itemData = null;

const pluginName = "NUUN_ItemCategory";
PluginManager.registerCommand(pluginName, 'AddCategory', args => {
  $gameSystem.itemCategory = DataManager.nuun_structureData(args.ItemCategory) || null;
});

PluginManager.registerCommand(pluginName, 'ResetCategory', args => {
  $gameSystem.itemCategory = null;
});

function getItemCategory() {
  return $gameSystem.itemCategory ? $gameSystem.itemCategory : ItemCategory;
}


const _Scene_Item_categoryWindowRect = Scene_Item.prototype.categoryWindowRect;
Scene_Item.prototype.categoryWindowRect = function() {
  const rect = _Scene_Item_categoryWindowRect.call(this);
  rect.height = this.calcWindowHeight(CategoryRows, true);
  return rect;
};

const _Scene_Shop_categoryWindowRect = Scene_Shop.prototype.categoryWindowRect;
Scene_Shop.prototype.categoryWindowRect = function() {
  const rect = _Scene_Shop_categoryWindowRect.call(this);
  rect.height = this.calcWindowHeight(CategoryRows, true);
  return rect;
};

Window_ItemCategory.prototype.maxCols = function() {
  return CategoryCols;
};

Window_ItemCategory.prototype.makeCommandList = function() {
  const list = getItemCategory();
    if(!list) {
    return;
  }
  list.forEach(names => {
    if(this.needsCommand(names.Categorykey) && names.Categorykey === 'item') {
      this.addCommand(TextManager.item, names.Categorykey);
    } else if(this.needsCommand(names.Categorykey) && names.Categorykey === 'weapon') {
      this.addCommand(TextManager.weapon, names.Categorykey);
    } else if(this.needsCommand(names.Categorykey) && names.Categorykey === 'armor') {
      this.addCommand(TextManager.armor, names.Categorykey);
    } else if(this.needsCommand(names.Categorykey) && names.Categorykey === 'keyItem') {
      this.addCommand(TextManager.keyItem, names.Categorykey);
    } else if (this.needsCommand(names.Categorykey) && names.Categorykey === 'allItems') {
      this.addCommand(names.CategoryName, names.Categorykey);
    } else if(this.needsCommand(names.Categorykey) && names.CategoryName) { 
      this.addCommand(names.CategoryName, names.Categorykey);
    }
  });
};

const _Window_ItemList_includes = Window_ItemList.prototype.includes;
Window_ItemList.prototype.includes = function(item) {
  if (this.isConstructor()) {
    return _Window_ItemList_includes.call(this, item);
  }
  if(this._category === 'allItems' && !this.secretItem(item) && item) {
    return true;
  } else if (this._category === 'allItem' && DataManager.isItem(item) && (item.itypeId === 1 || item.itypeId === 2)) {
    return true;
  }
  const type = item ? item.meta.CategoryType : null;
  const category = _Window_ItemList_includes.call(this, item);
  if(category && !type) {
    return category;
  }
  if (this._category === type) {
    return true;
  }
  return false;
};

Window_ItemList.prototype.secretItem = function(item) {
  if(DataManager.isItem(item) && item.itypeId > 2) {
    return true;
  }
  return false;
};

const _Window_ItemList_drawItemNumber = Window_ItemList.prototype.drawItemNumber;
Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
  if (this.allItemsNeedsNumber(item)) {
    _Window_ItemList_drawItemNumber.call(this, item, x, y, width);
  }
};

const _Window_ItemList_drawItem = Window_ItemList.prototype.drawItem;
Window_ItemList.prototype.drawItem = function(index) {
    itemData = this.itemAt(index);
    _Window_ItemList_drawItem.call(this, index);
};

Window_ItemList.prototype.needsNumber = function() {
  if (BattleNumVisible && itemData && $gameParty.inBattle()) {
    this._category = itemData.meta.CategoryType ? itemData.meta.CategoryType : (itemData.itypeId === 2 ? "keyItem" : this._needsCategory);
  }
  if (this._category === "keyItem") {  
    return $dataSystem.optKeyItemsNumber;
  }
  return this._needsCategory === undefined || this._needsCategory === null ? true : this._needsCategory;
};

Window_ItemList.prototype.allItemsNeedsNumber = function(item) {
  if (this._category === "allItems") {
    if (item.itypeId === 2) {
      return $dataSystem.optKeyItemsNumber;
    } else if (item.meta.CategoryType) {
      const list = getItemCategory();
      const find = list.find(date => date.Categorykey === item.meta.CategoryType);
      if (find && find.NumShow !== undefined) {
        return find.NumShow;
      }
      return true;
    } 
  }
  return true;
};

const _Window_ItemList_setCategory = Window_ItemList.prototype.setCategory;
Window_ItemList.prototype.setCategory = function(category) {
  if (this._category !== category) {
    this._needsCategory = true;
    const list = getItemCategory();
    if (list) {
      const find = list.find(date => date.Categorykey === category);
      if (find) {
        this._needsCategory = (find.NumShow === undefined ? true : find.NumShow);
      }
    }
  }
  _Window_ItemList_setCategory.call(this, category)
};

})();