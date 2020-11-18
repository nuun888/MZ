/*:-----------------------------------------------------------------------------------
 * NUUN_ItemCategory.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 更新履歴
 * 2020/11/18 Ver 1.0.0
 */
/*:ja
 * @target MZ
 * @plugindesc アイテムのカテゴリーカスタマイズ
 * @author NUUN
 * 
 * @help
 * アイテムに独自のカテゴリーを追加または必要な項目のみ表示させることが出来ます。
 * アイテム、武器、防具のメモ欄に<CategoryType:[typeName]>を記入します。
 * プラグインパラメータで「CategoryKey」と同じキーのカテゴリーにアイテムが
 * 表示されるようになります。
 * [typeName]:カテゴリーキー
 * ※カテゴリーキーについて
 *  item、weapon、armor、keyItemは独自カテゴリーのキーには使用できません。
 *  allItemsは全てのアイテムが表示されます。
 * 
 * <CategoryType:sozai>　このタグを記入したアイテムはsozaiカテゴリーに表示されます。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
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

const _Scene_Item_createCategoryWindow = Scene_Item.prototype.createCategoryWindow;
Scene_Item.prototype.createCategoryWindow = function() {
  _Scene_Item_createCategoryWindow.call(this);
  this._categoryWindow.height = this.calcWindowHeight(param.CategoryRows, true);
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
  if((this._category === 'allItems' || (!param.OneCategoryShow && TypeLength < 2)) && !this.secretItem(item) && item) {
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
})();
