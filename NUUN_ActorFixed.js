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
 * @version 1.0.0
 * 
 * @help
 * アクターの並び替えを固定します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
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
 */
var Imported = Imported || {};
Imported.NUUN_ActorFixed = true;

(() => {
const parameters = PluginManager.parameters('NUUN_ActorFixed');
const FixedActorBackColor = Number(parameters['FixedActorBackColor'] || 3);

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
  this._fixed = false ;
};

Game_Actor.prototype.getFixed = function() {
  return this._fixed === undefined ? false : this._fixed;
};

const _Game_Actor_isFormationChangeOk = Game_Actor.prototype.isFormationChangeOk;
Game_Actor.prototype.isFormationChangeOk = function() {
  return _Game_Actor_isFormationChangeOk.call(this) && !this.getFixed();
};

})();
