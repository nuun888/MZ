/*:-----------------------------------------------------------------------------------
 * NUUN_ActorFixed.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc アクター並び替え固定
 * @author NUUN
 * @version 1.1.0
 * 
 * @help
 * アクターの並び替えを固定します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/8/25 Ver.1.1.0
 * 固定したメンバーを控えメンバーに移動させない機能を追加。
 * 2021/8/17 Ver.1.0.0
 * 初版
 * 
 * @command ActorFixed
 * @desc 並び替えを固定します。
 * @text 並び替え固定
 * 
 * @arg ActorId
 * @type actor
 * @default 0
 * @text アクターID
 * @desc アクターIDを指定します。0で全アクター
 * 
 * @command ActorFixedRelease
 * @desc 並び替え固定を解除します。
 * @text 並び替え固定解除
 * 
 * @arg ActorId
 * @type actor
 * @default 0
 * @text アクターID
 * @desc アクターIDを指定します。0で全アクター
 * 
 * 
 * @param ActorFixedMovable
 * @text 待機固定アクター移動可
 * @desc 待機メンバーの固定アクターの戦闘メンバーへの移動を許可します。
 * @type boolean
 * @default false
 * @parent ActorFixedSetting
 * 
 */
var Imported = Imported || {};
Imported.NUUN_ActorFixed = true;

(() => {
const parameters = PluginManager.parameters('NUUN_ActorFixed');
const ActorFixedMovable = eval(parameters['ActorFixedMovable'] || 'false');

const pluginName = "NUUN_ActorFixed";

PluginManager.registerCommand(pluginName, 'ActorFixed', args => {
  const actorId = Number(args.ActorId);
  if (actorId > 0) {
    $gameActors._data[actorId].setFixed();
  } else {
    $gameParty.allMembers().forEach(actor => actor.setFixed());
  }
});

PluginManager.registerCommand(pluginName, 'ActorFixedRelease', args => {
  const actorId = Number(args.ActorId);
  if (actorId > 0) {
    $gameActors._data[actorId].setFixedRelease();
  } else {
    $gameParty.allMembers().forEach(actor => actor.setFixedRelease());
  }
});

Game_Actor.prototype.setFixed = function() {
  this._fixed = true;
};

Game_Actor.prototype.setFixedRelease = function() {
  this._fixed = false;
};

Game_Actor.prototype.setFixedMovable = function(flag) {
  this._fixedMovable = flag;
};

Game_Actor.prototype.isFixedMovable = function() {
  return this._fixedMovable === undefined ? false : this._fixedMovable;
};

Game_Actor.prototype.isFixed = function() {
  return (this._fixed === undefined ? false : this._fixed) && !this.isFixedMovable();
};

Game_Actor.prototype.getFixed = function() {
  return (this._fixed === undefined ? false : this._fixed);
};

const _Game_Actor_isFormationChangeOk = Game_Actor.prototype.isFormationChangeOk;
Game_Actor.prototype.isFormationChangeOk = function() {
  return _Game_Actor_isFormationChangeOk.call(this) && !this.isFixed();
};

Game_Actor.prototype.setFixedMovable_pp = function() {
  this.setFixedMovable(ActorFixedMovable);
};

const _Window_MenuStatus_isCurrentItemEnabled = Window_MenuStatus.prototype.isCurrentItemEnabled;
Window_MenuStatus.prototype.isCurrentItemEnabled = function() {
  const actor = this.actor(this.index());
  if (this._formationMode) {
    if (this._pendingIndex < $gameParty.maxBattleMembers() && this.index() >= $gameParty.maxBattleMembers()) {
      actor.setFixedMovable(ActorFixedMovable);
    } else {
      actor.setFixedMovable(false);
    }
  }
  return _Window_MenuStatus_isCurrentItemEnabled.call(this);
};
})();