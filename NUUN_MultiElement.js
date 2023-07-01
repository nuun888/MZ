/*:-----------------------------------------------------------------------------------
 * NUUN_MultiElement.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Multiple Element
 * @author NUUN
 * @version 1.1.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * You can set multiple element for items and skills.
 * 
 * Item/skill notes
 * <multElement:[id],[id],....> In addition to the database configuration elements, it has an elemen with element ID [id].
 * <multElement:5> It has an element with element ID 5.
 * <multElement:5,6> It has multiple elements with element IDs 5 and 6.
 * 
 * <multElementRate[id]:[rate]> Sets the probability of adding the specified element.
 * [id]:Element ID
 * [rate]:Added probability
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 7/1/2023 Ver.1.1.0
 * Added a function that allows you to set the probability for the element to be added.
 * Changed the display in languages other than Japanese to English.
 * 11/17/2021 Ver.1.0.1
 * Fixed some processing.
 * 8/8/2021 Ver.1.0.0
 * First edition.
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 複数属性
 * @author NUUN
 * @version 1.1.0
 * 
 * @help
 * アイテム、スキルに複数の属性を設定できます。
 * 
 * アイテム、スキルのメモ欄
 * <multElement:[id],[id],....> データベースの設定属性に加えて属性ID[id]番の属性を持ちます。
 * [id]:属性ID
 * <multElement:5> 属性ID5番の属性を持ちます。
 * <multElement:5,6> 属性ID5番と6番の複数属性を持ちます。
 * 
 * <multElementRate[id]:[rate]> 指定の属性を付加する確率を設定します。
 * [id]:属性ID
 * [rate]:付加される確率
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/7/1 Ver.1.1.0
 * 付加する属性に確率を設定できる機能を追加。
 * 日本語以外での表示を英語表示に変更。
 * 2021/11/7 Ver.1.0.1
 * 一部の処理の修正。
 * 2021/8/8 Ver.1.0.0
 * 初版
 * 
 */
var Imported = Imported || {};
Imported.NUUN_MultiElement = true;

(() => {
const parameters = PluginManager.parameters('NUUN_MultiElement');

Game_Action.prototype.calcElementRate = function(target) {//再定義
  if (this.item().damage.elementId < 0) {
    return this.getAttackElementsRate(target);
  } else {
    return this.getItemElementsRate(target);
  }
};

Game_Action.prototype.getAttackElementsRate = function(target) {
  return this.elementsMaxRate(target, this.getAttackElements());
};

Game_Action.prototype.getItemElementsRate = function(target) {
  return this.elementsMaxRate(target, this.getItemElements());
};

Game_Action.prototype.getAttackElements = function() {
    const elements = this.getMultiElement().concat(this.subject().attackElements());
    return this.getFilterElements(elements);
};

Game_Action.prototype.getItemElements = function() {
    const elements = this.getMultiElement().concat(this.item().damage.elementId);
    return this.getFilterElements(elements);
};

Game_Action.prototype.getMultiElement = function() {
  return this.item().meta.multElement ? this.item().meta.multElement.split(',').map(Number) : [];
};

Game_Action.prototype.getFilterElements = function(elements) {
    const item = this.item();
    const newElements = elements.filter(element => {
        const tag = "multElementRate" + element;
        return item.meta[tag] ? Math.randomInt(100) < Number(item.meta[tag]) : true;
    });
    this._multiElements = newElements;
    return newElements;
};

})();