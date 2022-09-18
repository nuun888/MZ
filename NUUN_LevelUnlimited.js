/*:-----------------------------------------------------------------------------------
 * NUUN_LevelUnlimited.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc レベル上限限界突破プラグイン
 * @author NUUN
 * @version 1.2.0
 * 
 * @help
 * 最大レベルを１００以上に設定できます。
 * 
 * アクターのメモ欄
 * <MaxLevel:[level]>  最大レベルを変更します。
 * <StartLevel:[level]>　パーティ加入時の初期レベルを設定します。
 * <TestMaxLevel:[level]> テスト戦闘でのレベルを設定します。
 * 
 * 例
 * <MaxLevel:200> アクターの最大レベルは２００になります。
 * <StartLevel:120> 初期レベルを設定します。設定例では初期レベルが１２０になります。
 * <TestMaxLevel:130> テスト戦闘でのレベルを130に設定します。
 * 
 * 
 * レベル100以上でスキルを習得させる場合は職業の習得スキルのメモ欄に
 * <LearnSkill:[習得レベル]>を記入します。デフォルトの習得レベルは無視されます。
 * <LearnSkill:105> レベル105にレベルアップした時にスキルを習得します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/9/18 Ver 1.2.0
 * テストプレイ時のレベルにレベル100以上できる機能を追加。
 * 2021/6/27 Ver 1.1.0
 * 初期レベルをレベル100以上に設定できる機能を追加。
 * 2020/12/12 Ver 1.0.1
 * レベル100以上のステータスの計算が間違っていたのを修正。
 * 2020/12/12 Ver 1.0.0
 * 初版
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_LevelUnlimited = true;

(() => {
const parameters = PluginManager.parameters('NUUN_LevelUnlimited');

const _Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
  _Game_Actor_setup.call(this, actorId);
  const actor = $dataActors[actorId];
  if (actor.meta.StartLevel) {
    this._level = Number(actor.meta.StartLevel) || actor.initialLevel;
    this.initImages();
    this.initExp();
    this.initSkills();
    this.initEquips(actor.equips);
    this.clearParamPlus();
    this.recoverAll();
  }
};

const _Game_Actor_paramBase = Game_Actor.prototype.paramBase;
Game_Actor.prototype.paramBase = function(paramId) {
  if (this._level >= 100) {
    const u_levelParam = this.currentClass().params[paramId][99];
    const d_levelParam = this.currentClass().params[paramId][94];
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
    let learnLv = this.learnSkillNote(learning);
    learnLv = learnLv > 0 ? learnLv : learning.level;
    if (learnLv <= this._level) {
      this.learnSkill(learning.skillId);
    }
  }
};

Game_Actor.prototype.levelUp = function() {
  this._level++;
  for (const learning of this.currentClass().learnings) {
    let learnLv = this.learnSkillNote(learning);
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

const _Game_Party_setupBattleTestMembers = Game_Party.prototype.setupBattleTestMembers;
Game_Party.prototype.setupBattleTestMembers = function() {
  _Game_Party_setupBattleTestMembers.call(this);
  for (const battler of $dataSystem.testBattlers) {
      const actor = $gameActors.actor(battler.actorId);
      if (actor) {
          const testLevel = actor.actor().meta.TestMaxLevel;
          if (testLevel) {
            actor.changeLevel(Number(testLevel), false);
            actor.recoverAll();
          }
      }
  }
};



})();
