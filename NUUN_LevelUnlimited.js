/*:-----------------------------------------------------------------------------------
 * NUUN_LevelUnlimited.js
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
 * @plugindesc レベル上限限界突破プラグイン
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
 * 
 * 利用規
 * このプラグインはMITライセンスで配布しています。
 * 
 */
var Imported = Imported || {};
Imported.NUUN_LevelUnlimited = true;

(() => {
const parameters = PluginManager.parameters('NUUN_LevelUnlimited');

const _Game_Actor_paramBase = Game_Actor.prototype.paramBase;
Game_Actor.prototype.paramBase = function(paramId) {
  if (this._level >= 100) {
    const u_levelParam = this.currentClass().params[paramId][99];
    const d_levelParam = this.currentClass().params[paramId][95];
    return this.overLevelParam(u_levelParam, d_levelParam);
  } else {
    return _Game_Actor_paramBase.call(this, paramId);
  }
};

Game_Actor.prototype.overLevelParam = function(Param1, Param2) {
  return (this._level - 99) * ((Param1 - Param2) / 5) + Param1;
};

const _Game_Actor_maxLevel = Game_Actor.prototype.maxLevel;
Game_Actor.prototype.maxLevel = function() {
  return this.actor().meta.MaxLevel ? this.actor().meta.MaxLevel : _Game_Actor_maxLevel.call(this);
};

Game_Actor.prototype.initSkills = function() {
  this._skills = [];
  for (const learning of this.currentClass().learnings) {
    let learnLv = Number(this.learnSkillNote(learning));
    learnLv = learnLv > 0 ? learnLv : learning.level;
    if (learnLv <= this._level) {
      this.learnSkill(learning.skillId);
    }
  }
};

Game_Actor.prototype.levelUp = function() {
  this._level++;
  for (const learning of this.currentClass().learnings) {
    let learnLv = Number(this.learnSkillNote(learning));
    learnLv = learnLv > 0 ? learnLv : learning.level;
    if (learnLv === this._level) {
      this.learnSkill(learning.skillId);
    }
  }
};

Game_Actor.prototype.learnSkillNote = function(learn) {
  const re = /<(?:LearnSkill):\s*(\d+)>/g;
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
