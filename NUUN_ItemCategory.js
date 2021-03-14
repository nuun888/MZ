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
 * @version 1.1.2
 * 
 * @help
 * アイテムに独自のカテゴリーを追加または必要な項目のみ表示させることが出来ます。
 * プラグインパラメータでカテゴリーキーを設定し、アイテム、武器、防具のメモ欄に<CategoryType:[typeName]>を記入します。
 * メモ欄に記入した[typeName]と同じカテゴリーキーのカテゴリーにアイテムが表示されるようになります。
 * カテゴリーキーに「allItems」を記入しますと、そのカテゴリーは隠しアイテムを除く
 * 全てのアイテムが表示されます。
 * 
 * [typeName]:カテゴリーキー
 * ※カテゴリーキーについて
 *  item、weapon、armor、keyItemは独自カテゴリーのキーには使用できません。
 * 
 * <CategoryType:sozai>　このタグを記入したアイテムはsozaiカテゴリーに表示されます。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
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
 * @default ["{\"CategoryName\":\"\",\"Categorykey\":\"item\"}","{\"CategoryName\":\"\",\"Categorykey\":\"weapon\"}","{\"CategoryName\":\"\",\"Categorykey\":\"armor\"}","{\"CategoryName\":\"\",\"Categorykey\":\"keyItem\"}"]
 * @type struct<ItemCategoryList>[]
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
 * @desc カテゴリーキーを設定します。例:アイテムならitem
 * @type string
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
const param = JSON.parse(JSON.stringify(parameters, function(key, value) {
  try {
    return JSON.parse(value);
  } catch (e) {
    try {
      return eval(value);
    } catch (e) {
      return value;
    }
  }
}));
const TypeLength = param.ItemCategory.length

const _Scene_Item_categoryWindowRect = Scene_Item.prototype.categoryWindowRect;
Scene_Item.prototype.categoryWindowRect = function() {
  const rect = _Scene_Item_categoryWindowRect.call(this);
  rect.height = this.calcWindowHeight(param.CategoryRows, true);
  return rect;
};

const _Scene_Shop_categoryWindowRect = Scene_Shop.prototype.categoryWindowRect;
Scene_Shop.prototype.categoryWindowRect = function() {
  const rect = _Scene_Shop_categoryWindowRect.call(this);
  rect.height = this.calcWindowHeight(param.CategoryRows, true);
  return rect;
};

Window_ItemCategory.prototype.maxCols = function() {
  return param.CategoryCols;
};

Window_ItemCategory.prototype.makeCommandList = function() {
  const list = param.ItemCategory;
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
  if(this._category === 'allItems' && !this.secretItem(item) && item) {
    return true;
  }
  const type = item ? item.meta.CategoryType : null;
  const category = _Window_ItemList_includes.call(this, item);
  if(category && !type) {
    return category;
  }
  switch (this._category) {
    case type:
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

Window_ItemList.prototype.needsNumber = function() {
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
      const list = param.ItemCategory;
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
    const list = param.ItemCategory;
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