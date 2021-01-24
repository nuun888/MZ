/*:-----------------------------------------------------------------------------------
 * NUUN_IconSideBySide.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 更新履歴
 * 2021/1/24 Ver.1.0.3
 * バトルスタイル拡張併用時の処理を再度修正。
 * 2021/1/17 Ver.1.0.2
 * バトルスタイル拡張プラグイン導入時、ステートの座標許可をtureにすると座標が反映されない問題を修正。
 * バトルスタイル拡張プラグイン2.0.0以降対応。
 * 2021/1/3 Ver.1.0.1
 * 表示する横幅を指定できるように変更。
 * 2021/1/2 Ver.1.0.0
 * 初版
 */ 
/*:
 * @target MZ
 * @plugindesc  戦闘時アクターステート横並び表示
 * @author NUUN
 * @orderAfter NUUN_BattleStyleEX_Base
 * 
 * 
 * @help
 * 戦闘中のアクターのステート表示を横並びに表示させます。
 * バトルスタイル拡張プラグインと併用する場合はVer.2.0.2以降対応。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 
 * @param StateIconWidth_X
 * @desc ステートアイコンの表示する横幅を指定します。
 * @text 横幅
 * @type number
 * @default 0
 * @min 0
 */

var Imported = Imported || {};
Imported.NUUN_IconSideBySide = true;

(() => {
const parameters = PluginManager.parameters('NUUN_IconSideBySide');
const StateIconWidth = Number(parameters['StateIconWidth'] || 0);

const _Scene_Battle_createStatusWindow = Scene_Battle.prototype.createStatusWindow;
Scene_Battle.prototype.createStatusWindow = function() {
  _Scene_Battle_createStatusWindow.call(this);
  BattleManager._statusWindow = Imported.NUUN_BattleStyleEX_Base ? this._actorStatus : this._statusWindow;
};

const _Window_BattleStatus_placeStateIcon = Window_BattleStatus.prototype.placeStateIcon;
Window_BattleStatus.prototype.placeStateIcon = function(actor, x, y) {
  if (actor.isActor()) {
    this.drawStateIcon(actor, x, y);
  } else {
    _Window_BattleStatus_placeStateIcon.call(this, actor, x, y);
  }
};

Window_BattleStatus.prototype.drawStateIcon = function(actor, x, y) {
  this.drawActorIcons(actor, x, y, (StateIconWidth > 0 ? StateIconWidth : this.itemWidth() - 8));
};

Window_BattleStatus.prototype.refreshContentsDraw = function() {
  this.contents.clear();
  for (const actor of $gameParty.members()) {
    const index = actor.index();
    this.drawItemImage(index);
    const rect = this.itemRectWithPadding(index);
    const stateIconX = this.stateIconX(rect);
    const stateIconY = this.stateIconY(rect);
    this.drawStateIcon(actor, stateIconX, stateIconY);
  }
};

Window_BattleStatus.prototype.stateIconX = function(rect) {
  return rect.x;
};

Window_BattleStatus.prototype.stateIconY = function(rect) {
  return rect.y + 4;
};

const _Game_Actor_addState = Game_Actor.prototype.addState;
Game_Actor.prototype.addState = function(stateId) {
  _Game_Actor_addState.call(this, stateId);
  if (BattleManager._statusWindow) {
    BattleManager._statusWindow.refreshContentsDraw();
  }
};

const _Game_Actor_removeState = Game_Actor.prototype.removeState;
Game_Actor.prototype.removeState = function(stateId) {
  _Game_Actor_removeState.call(this, stateId);
  if (BattleManager._statusWindow) {
    BattleManager._statusWindow.refreshContentsDraw();
  }
};
})();