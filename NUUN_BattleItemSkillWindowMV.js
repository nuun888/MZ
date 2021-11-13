/*:-----------------------------------------------------------------------------------
 * NUUN_BattleItemSkillWindowMV.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc  戦闘中アイテム、スキル選択画面MV風表示
 * @author NUUN
 * @version 1.1.2
 * 
 * @help
 * 戦闘中のアイテム、スキル選択画面をMV風形式に変更させます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 
 * 更新履歴
 * 2021/11/14 Ver.1.1.2
 * スキル、アイテムを選択し敵の選択画面を表示した後にキャンセルするとアクターウィンドウが表示されない問題を修正。
 * 2021/11/5 Ver.1.1.1
 * キャンセルボタンの表示がスキル、アイテムウィンドウが開いていなくても一番上に表示されてしまう問題を修正。
 * 2021/11/5 Ver.1.1.0
 * 画面下まで表示できる機能を追加。
 * 可変モードでスキル及びアイテムが１つもない場合、１行分表示されるように修正。
 * キャンセルボタンの位置を変更。
 * 2021/2/3 Ver.1.0.2
 * マップ上でアイテム、スキル画面を表示した時、戦闘時の画面が表示されてしまう問題を修正。
 * 2021/2/1 Ver.1.0.1
 * キャンセルボタンの処理を修正。
 * 2021/1/31 Ver.1.0.0
 * 初版
 * 
 * @param ItemMaxRow
 * @desc 表示する行。
 * @text 表示行
 * @type number
 * @default 6
 * @min 1
 * 
 * @param FullWindowHeight
 * @text 画面下まで表示
 * @desc ウィンドウを画面下まで表示出来るようにします。（通常はアクターウィンドウまで）
 * @type boolean
 * @default false
 * 
 * @param VariableHeight
 * @text 縦幅可変
 * @desc 縦幅をアイテム、スキルの個数によって高さを変えます。
 * @type boolean
 * @default false
 * 
 * 
 */

var Imported = Imported || {};
Imported.NUUN_BattleItemSkillWindowMV = true;

(() => {
const parameters = PluginManager.parameters('NUUN_BattleItemSkillWindowMV');
const VariableHeight = eval(parameters['VariableHeight'] || "false");
const FullWindowHeight = eval(parameters['FullWindowHeight'] || "false");
const ItemMaxRow = Number(parameters['ItemMaxRow'] || 6);
let maxHeight = 0;

const _Scene_Battle_initialize = Scene_Battle.prototype.initialize;
Scene_Battle.prototype.initialize = function() {
  _Scene_Battle_initialize.call(this);
};

const _Scene_Battle_skillWindowRect = Scene_Battle.prototype.skillWindowRect;
Scene_Battle.prototype.skillWindowRect = function() {
  const rect = _Scene_Battle_skillWindowRect.call(this);
  rect.y = this._helpWindow.height + this.itemSkillWindowButtonAreaHeight();
  maxHeight = Math.min(this.calcWindowHeight(ItemMaxRow, true), this.itemSkillWindowMaxHeight(rect.y));
  rect.height = maxHeight;
  return rect;
};

const _Scene_Battle_helpWindowRect = Scene_Battle.prototype.helpWindowRect;
Scene_Battle.prototype.helpWindowRect = function() {
  const rect = _Scene_Battle_helpWindowRect.call(this);
  rect.y = this.itemSkillWindowButtonAreaHeight();
  return rect;
};

Scene_Battle.prototype.itemSkillWindowButtonAreaHeight = function() {
  return ConfigManager.touchUI ? this.buttonAreaHeight() - Math.floor((this.buttonAreaHeight() - 48) / 2) : 0;
};

Scene_Battle.prototype.itemSkillWindowMaxHeight = function(y) {
  if (FullWindowHeight) {
    return Graphics.boxHeight - y;
  } else {
    return Graphics.boxHeight - y - this.windowAreaHeight();
  }
};

const _Scene_Battle_createCancelButton = Scene_Battle.prototype.createCancelButton;
Scene_Battle.prototype.createCancelButton = function() {
  _Scene_Battle_createCancelButton.call(this);
  this._originalCancelButtonY = this._cancelButton.y;
};

const _Scene_Battle_updateCancelButton = Scene_Battle.prototype.updateCancelButton;
Scene_Battle.prototype.updateCancelButton = function() {
  _Scene_Battle_updateCancelButton.call(this);
  if (this._cancelButton && this._skillWindow.visible || this._itemWindow.visible) {  
    this._cancelButton.y = 0;
  } else {
    this._cancelButton.y = this._originalCancelButtonY;
  }
};

const _Scene_Battle_commandSkill = Scene_Battle.prototype.commandSkill;
Scene_Battle.prototype.commandSkill = function() {
  _Scene_Battle_commandSkill.call(this);
  if (!this._statusWindow.visible) {
    this._statusWindow.show();
  }
  if (!this._actorCommandWindow.visible) {
    this._actorCommandWindow.show();
  }
};

const _Scene_Battle_commandItem = Scene_Battle.prototype.commandItem;
Scene_Battle.prototype.commandItem = function() {
  _Scene_Battle_commandItem.call(this);
  if (!this._statusWindow.visible) {
    this._statusWindow.show();
  }
  if (!this._actorCommandWindow.visible) {
    this._actorCommandWindow.show();
  }
};

const _Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
  _Scene_Battle_onEnemyCancel.call(this);
  switch (this._actorCommandWindow.currentSymbol()) {
    case "skill":
    case "item":
      this._statusWindow.show();
      break;
  }
};

const _Window_BattleSkill_refresh = Window_BattleSkill.prototype.refresh;
Window_BattleSkill.prototype.refresh = function() {
  _Window_BattleSkill_refresh.call(this);
  if (VariableHeight) {
    this.height = Math.min(maxHeight, this.fittingHeight(Math.max(Math.ceil(this.maxItems() / this.maxCols()), 1)));
  }
};

const _Window_BattleItem_refresh = Window_ItemList.prototype.refresh;
Window_BattleItem.prototype.refresh = function() {
  _Window_BattleItem_refresh.call(this);
  if (VariableHeight) {
    this.height = Math.min(maxHeight, this.fittingHeight(Math.max(Math.ceil(this.maxItems() / this.maxCols()), 1)));
  }
};

})();