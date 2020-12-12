/*:-----------------------------------------------------------------------------------
 * NUUN_ChangeMaxLevel.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 更新履歴
 * 2020/12/12 Ver 1.0.0
 */ 
/*:
 * @target MZ
 * @plugindesc 最大レベル変動プラグイン  
 * @author NUUN
 * @orderBefore NUUN_LevelUnlimited
 * 
 * @help
 * アクターの最大レベルを任意のタイミングで変更できます。
 * 
 * プラグインコマンド
 * MaxLevelSet　アクターの最大レベルを変更。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 
 * @command MaxLevelSet
 * @text 最大レベルの変更。
 * @desc 最大レベルを変更します。
 * 
 * @arg changeMaxLevel
 * @type number
 * @min 1
 * @default 99
 * @text 最大レベル
 * @desc 最大レベルを変更します。
 * 
 * @arg ActorId
 * @type actor
 * @default 1
 * @text アクター
 * @desc 変更するアクターを指定します。
 * 
 */
var Imported = Imported || {};
Imported.NUUN_ChangeMaxLevel = true;

(() => {
const parameters = PluginManager.parameters('NUUN_ChangeMaxLevel');
const pluginName = "NUUN_ChangeMaxLevel";

PluginManager.registerCommand(pluginName, "MaxLevelSet", args => {
  $gameActors.actor(args.ActorId).changeMaxLevel(Number(args.changeMaxLevel));
});

const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
  _Game_Actor_initMembers.call(this);
  this._maxLevel = 0;
};

Game_Actor.prototype.changeMaxLevel = function(changeMaxLevel) {
  if (!Imported.NUUN_LevelUnlimited) {
    Math.min(changeMaxLevel, 99);
  }
  this._maxLevel = (this._level <= changeMaxLevel ? changeMaxLevel : this._maxLevel);
};

const _Game_Actor_maxLevel = Game_Actor.prototype.maxLevel;
Game_Actor.prototype.maxLevel = function() {
  return this._maxLevel > 0 ? this._maxLevel : _Game_Actor_maxLevel.call(this);
};

const _Game_Actor_changeExp = Game_Actor.prototype.changeExp;
Game_Actor.prototype.changeExp = function(exp, show) {
  exp = Math.min(this.expForLevel(this.maxLevel()), exp);
  _Game_Actor_changeExp.call(this, exp, show);
};
})();