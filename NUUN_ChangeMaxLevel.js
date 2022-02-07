/*:-----------------------------------------------------------------------------------
 * NUUN_ChangeMaxLevel.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc 最大レベル変動プラグイン
 * @author NUUN
 * @version 1.1.0
 * @orderBefore NUUN_LevelUnlimited
 * 
 * @help
 * アクターの最大レベルをゲーム途中でも変更または特徴により最大レベルを変更できます。
 * 優先順位はアイテム、スキル、プラグインコマンドで変更したレベル ＞ 特徴での最大レベル ＞ 元の最大レベル
 * 
 * アイテム、スキルのメモ欄
 * <ChangeMaxLevel:[lavel]> レベルの上限を変更します。
 * <ChangeMaxLevel:80> レベルの上限を80に変更します。
 * <ChangeMaxLevelld:[lavel±]> レベルの上限を増減します。
 * <ChangeMaxLevelld:5> レベルの上限を５増やします。
 * 
 * 特徴を有するメモ欄
 * <F_ChangeMaxLevel:[lavel]> レベルの上限を変更します。
 * <F_ChangeMaxLevel:50> レベルの上限を50に変更します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/2/7 Ver.1.2.0
 * 特徴があれば最大レベルを変更できる機能を追加。
 * 2021/12/7 Ver.1.1.0
 * 最大レベルを増減させる機能を追加。
 * 最大レベルを変更、増減させるスキル、アイテムを設定できる機能を追加。
 * 2020/12/13 Ver.1.0.1
 * 微修正
 * 2020/12/12 Ver.1.0.0
 * 初版
 * 
 * @command MaxLevelSet
 * @text 最大レベルの変更
 * @desc 最大レベルを変更します。
 * 
 * @arg changeMaxLevel
 * @type number
 * @min 1
 * @default 99
 * @text 最大レベル
 * @desc 変更する最大レベルを設定します。
 * 
 * @arg ActorId
 * @type actor
 * @default 1
 * @text アクター
 * @desc 変更するアクターを指定します。
 * @min 0
 * @max 9999
 * 
 * @command MaxLevelldSet
 * @text 最大レベルの増減
 * @desc 最大レベルを増減します。
 * 
 * @arg changeMaxLevel
 * @type number
 * @min -99999999999
 * @default 1
 * @text 最大レベル
 * @desc 増減する最大レベルを設定します。
 * 
 * @arg ActorId
 * @type actor
 * @default 1
 * @text アクター
 * @desc 変更するアクターを指定します。
 * @min 0
 * @max 9999
 * 
 */
var Imported = Imported || {};
Imported.NUUN_ChangeMaxLevel = true;

(() => {
const parameters = PluginManager.parameters('NUUN_ChangeMaxLevel');
const pluginName = "NUUN_ChangeMaxLevel";

PluginManager.registerCommand(pluginName, "MaxLevelSet", args => {
  $gameActors.actor(Number(args.ActorId)).changeMaxLevel(Number(args.changeMaxLevel));
});

PluginManager.registerCommand(pluginName, "MaxLevelldSet", args => {
  $gameActors.actor(Number(args.ActorId)).changeMaxLevelld(Number(args.changeMaxLevel));
});

const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
  _Game_Actor_initMembers.call(this);
  this._maxLevel = 0;
};

Game_Actor.prototype.changeMaxLevel = function(changeMaxLevel) {
  if (!Imported.NUUN_LevelUnlimited && !Imported.VisuMZ_0_CoreEngine) {
    Math.min(changeMaxLevel, 99);
  }
  this._maxLevel = (this._level <= changeMaxLevel ? changeMaxLevel : this._maxLevel);
};

Game_Actor.prototype.changeMaxLevelld = function(changeMaxLevel) {
  if (!this._maxLevel) {
    this._maxLevel = this.maxLevel();
  }
  this._maxLevel = Math.max(this._maxLevel + changeMaxLevel, 1);
};

const _Game_Actor_maxLevel = Game_Actor.prototype.maxLevel;
Game_Actor.prototype.maxLevel = function() {
  const _maxLevelTrait = this.maxLevelTrait();
  return this._maxLevel > 0 ? this._maxLevel : (_maxLevelTrait > 0 ? _maxLevelTrait : _Game_Actor_maxLevel.call(this));
};

const _Game_Actor_changeExp = Game_Actor.prototype.changeExp;
Game_Actor.prototype.changeExp = function(exp, show) {
  exp = Math.min(this.expForLevel(this.maxLevel()), exp);
  _Game_Actor_changeExp.call(this, exp, show);
};

Game_Action.prototype.testChangeMaxLevelItem = function(target) {
  return this.item().meta.ChangeMaxLevel || this.item().meta.ChangeMaxLevelld;
};

const _Game_Action_testApply = Game_Action.prototype.testApply;
Game_Action.prototype.testApply = function(target) {
  return _Game_Action_testApply.call(this, target) || this.testChangeMaxLevelItem(target);
};

const _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
  Game_Action.prototype.applyItemUserEffect = function(target) {
    _Game_Action_applyItemUserEffect.call(this, target);
    if (this.item().meta.ChangeMaxLevel) {
      target.changeMaxLevel(Number(this.item().meta.ChangeMaxLevel));
      this.makeSuccess(target);
    }
    if (this.item().meta.ChangeMaxLevelld) {
      target.changeMaxLevelld(Number(this.item().meta.ChangeMaxLevelld));
      this.makeSuccess(target);
    }
};

Game_Actor.prototype.maxLevelTrait = function() {
  return this.traitObjects().reduce((r, trait) => {
    if (trait.meta.F_ChangeMaxLevel && trait.meta.F_ChangeMaxLevel > r) {
      return r = trait.meta.F_ChangeMaxLevel;
    } else {
      return r;
    }
  }, 0);
};

})();