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
 * @plugindesc  戦闘時アイテム、スキル欄MV風表示
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * 戦闘中のアイテム、スキル選択画面をMV風形式に変更させます。
 * 
 * 
 * 更新履歴
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
 * @param VariableHeight
 * @text 縦幅可変
 * @desc 縦幅を可変にする。
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
const ItemMaxRow = Number(parameters['ItemMaxRow'] || 6);
let maxHeight = 0;
let cancelButton_y = 0;

const _Scene_Battle_initialize = Scene_Battle.prototype.initialize;
Scene_Battle.prototype.initialize = function() {
  _Scene_Battle_initialize.call(this);
};

const _Scene_Battle_skillWindowRect = Scene_Battle.prototype.skillWindowRect;
Scene_Battle.prototype.skillWindowRect = function() {
  const rect = _Scene_Battle_skillWindowRect.call(this);//ItemMaxRow
  rect.y = this._helpWindow.height;
  maxHeight = Math.min(this.calcWindowHeight(ItemMaxRow, true), Graphics.boxHeight - rect.y - this.windowAreaHeight());
  rect.height = maxHeight;
  return rect;
};

const _Window_ItemList_refresh = Window_ItemList.prototype.refresh;
Window_ItemList.prototype.refresh = function() {
  _Window_ItemList_refresh.call(this);
  if (VariableHeight) {
    this.height = Math.min(maxHeight, this.itemHeight() * Math.ceil(this.maxItems() / this.maxCols()) + $gameSystem.windowPadding() * 2);
  }
};

const _Window_SkillList_refresh = Window_SkillList.prototype.refresh;
Window_SkillList.prototype.refresh = function() {
  _Window_SkillList_refresh.call(this);
  if (VariableHeight) {
    this.height = Math.min(maxHeight, this.itemHeight() * Math.ceil(this.maxItems() / this.maxCols()) + $gameSystem.windowPadding() * 2);
  }
};

const _Scene_Battle_createCancelButton = Scene_Battle.prototype.createCancelButton;
Scene_Battle.prototype.createCancelButton = function() {
  _Scene_Battle_createCancelButton.call(this);
  cancelButton_y = this.buttonY();
};

const _Scene_Battle_updateCancelButton = Scene_Battle.prototype.updateCancelButton;
Scene_Battle.prototype.updateCancelButton = function() {
  _Scene_Battle_updateCancelButton.call(this);
  if (this._cancelButton) {
    if (this._skillWindow.visible) {
      this._cancelButton.y = this._skillWindow.height + cancelButton_y;
    } else if (this._itemWindow.visible) {
      this._cancelButton.y = this._itemWindow.height + cancelButton_y;
    } else{
      this._cancelButton.y = cancelButton_y;
    }
  }
};

const _Scene_Battle_commandSkill = Scene_Battle.prototype.commandSkill;
Scene_Battle.prototype.commandSkill = function() {
  _Scene_Battle_commandSkill.call(this);
  if (!this._statusWindow.visible) {
    this._statusWindow.show();
  }
  if (!this._actorCommandWindow.visible && !ConfigManager.touchUI) {
    this._actorCommandWindow.show();
  }
};

const _Scene_Battle_commandItem = Scene_Battle.prototype.commandItem;
Scene_Battle.prototype.commandItem = function() {
  _Scene_Battle_commandItem.call(this);
  if (!this._statusWindow.visible) {
    this._statusWindow.show();
  }
  if (!this._actorCommandWindow.visible && !ConfigManager.touchUI) {
    this._actorCommandWindow.show();
  }
};
})();
