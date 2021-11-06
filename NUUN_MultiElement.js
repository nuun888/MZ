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
 * @plugindesc 複数属性
 * @author NUUN
 * @version 1.0.1
 * 
 * @help
 * アイテム、スキルに複数の属性を設定できます。
 * 
 * アイテム、スキルのメモ欄
 * <multElement:[id],[id],....> データベースの設定属性に加えて属性ID[id]番の属性を持ちます。
 * <multElement:5> 属性ID5番の属性を持ちます。
 * <multElement:5,6> 属性ID5番と6番の複数属性を持ちます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
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
  return this.getMultiElement().concat(this.subject().attackElements());
};

Game_Action.prototype.getItemElements = function() {
  return this.getMultiElement().concat(this.item().damage.elementId);
};

Game_Action.prototype.getMultiElement = function() {
  return this.item().meta.multElement ? this.item().meta.multElement.split(',').map(Number) : [];
};

})();