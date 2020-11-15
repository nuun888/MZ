/*:-----------------------------------------------------------------------------------
 * NUUN_LevelEX.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 更新履歴
 * 2020/11 Ver 1.0.0
 */ 
/*:
 * @target MZ
 * @plugindesc レベルの上限限界突破及び変動制最大レベル
 * @author NUUN
 * 
 * @help
 * 最大レベルを１００以上に設定できます。
 * アクターのメモ欄に<MaxLevel:[最大レベル]>を記入してください。
 * <MaxLevel:200> アクターの最大レベルは２００になります。
 * 
 * レベル１００以上でスキルを習得させる場合は職業の習得スキルのメモ欄に
 * <LearnSkill:[習得レベル]>を記入します。デフォルトの習得レベルは
 * 無視されます。
 * <LearnSkill:105> レベル１０５にレベルアップした時にスキルを習得します。
 * 
 * プラグインコマンド
 * 最大レベルを任意のタイミングで変更することができます。
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
 * @param UpLvStatus
 * @text 参照上ステータスレベル
 * @desc レベル１００以上での参照するステータスの上レベル。
 * @type number
 * @max 99
 * @min 1
 * @default 99
 * 
 * @param UnLvStatus
 * @text 参照下ステータスレベル
 * @desc レベル１００以上での参照するステータスの下レベル。
 * @type number
 * @max 98
 * @min 1
 * @default 95
 * 
 */
var Imported = Imported || {};
Imported.NUUN_LevelEX = true;

(() => {
const parameters = PluginManager.parameters('NUUN_LevelEX');
const UpLvStatus = Number(parameters['UpLvStatus'] || 99);
const UnLvStatus = Number(parameters['UnLvStatus'] || 95);
const pluginName = "NUUN_LevelEX";

PluginManager.registerCommand(pluginName, "MaxLevelSet", args => {
  $gameActors.actor(args.ActorId).changeMaxLevel(args.changeMaxLevel);
});

const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
  _Game_Actor_initMembers.call(this);
  this._maxLevel = 0;
};

Game_Actor.prototype.changeMaxLevel = function(changeMaxLevel) {
  this._maxLevel = (this._level <= changeMaxLevel ? changeMaxLevel : this._maxLevel);
};

const _Game_Actor_paramBase = Game_Actor.prototype.paramBase;
Game_Actor.prototype.paramBase = function(paramId) {
  if(this._level > 99){
    const param1 = this.currentClass().params[paramId][UnLvStatus];
    const param2 = this.currentClass().params[paramId][UpLvStatus];
    const param = (param2 - param1) / (UpLvStatus - UnLvStatus + 1);
    return Math.round((this._level - 99) * param + param2);
  } else {
    return _Game_Actor_paramBase.call(this, paramId);
  }
};

const _Game_Actor_maxLevel = Game_Actor.prototype.maxLevel;
Game_Actor.prototype.maxLevel = function() {
  if(this._maxLevel > 0) {
    return this._maxLevel;
  } else {
    return this.actor().meta.MaxLevel ? this.actor().meta.MaxLevel : _Game_Actor_maxLevel.call(this);
  }
};

Game_Actor.prototype.initSkills = function() {
  this._skills = [];
  for (const learning of this.currentClass().learnings) {
    let learnLv = this.learnSkillNote(learning);
    if ((learning.level <= this._level) && !learnLv || (learnLv <= this._level) && learnLv) {
      this.learnSkill(learning.skillId);
    }
  }
};

Game_Actor.prototype.levelUp = function() {
  this._level++;
  for (const learning of this.currentClass().learnings) {
    let learnLv = this.learnSkillNote(learning);
    if ((learning.level === this._level) && !learnLv || (learnLv === this._level) && learnLv) {
      this.learnSkill(learning.skillId);
    }
  }
};

Game_Actor.prototype.learnSkillNote = function(learn) {
  const re =/<(?:LearnSkill):\s*(\d+)>/g;
  let val = null;
  while(true) {
    let match = re.exec(learn.note);
    if (match) {
      val = Number(match[1]);
      break;
    } else {
      break;
    }
  }
  return val;
};
})();
