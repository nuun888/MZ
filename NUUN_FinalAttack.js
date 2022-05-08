/*:-----------------------------------------------------------------------------------
 * NUUN_FinalAttack.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
 /*:
 * @target MZ
 * @plugindesc ファイナルアタック特徴
 * @author NUUN
 * @version 1.1.0
 * 
 * @help
 * ファイナルアタックを実装します。
 * 
 * 特徴を有するメモ欄
 * <FinalAttack:1> 
 * 戦闘不能になった時にファイナルアタック設定の１番で指定したスキルが発動します。
 * スキルのコストは考慮してませんのでスキルコストがある場合数値がマイナスに表示される場合があります。
 * 設定できるスキルは複数指定できます。
 * 
 * 仕様
 * ２回行動以上でファイナルアタックが割り込んだ場合その時点で行動が終了します。
 * 
 * 更新履歴
 * 2022/5/8 Ver.1.1.0
 * とどめを刺したバトラーに攻撃する機能の追加。
 * スキルの設定されていないidを指定するとエラーが出る問題を修正。
 * 2021/5/3 Ver.1.0.1
 * 少し修正。
 * 2021/5/3 Ver.1.0.0
 * 初版
 * 
 * @param FinalAttack
 * @desc ファイナルアタックを行うスキルを設定します。
 * @text ファイナルアタック設定
 * @type struct<FinalAttackList>[]
 * @default []
 */
/*~struct~FinalAttackList:
 * 
 * @param FinalAttackSkill
 * @desc スキル設定。
 * @text スキル設定
 * @type struct<FinalAttackSkillList>[]
 * @default []
 * 
 * @param FinalAttackTarget
 * @desc ターゲットモード
 * @text ターゲットモード
 * @type select
 * @option 設定スキルのターゲット
 * @value 0
 * @option とどめを刺したバトラー（設定スキルの範囲が敵単体）
 * @value 1
 * @default 0
 * 
 */
/*~struct~FinalAttackSkillList:
 *  
 * @param FinalAttackSkillId
 * @desc ファイナルアタックを行うスキル。
 * @text ファイナルアタックスキル
 * @default 0
 * @type skill
 * 
 * @param FinalAttackSkillRate
 * @desc このスキルを実行する確率。
 * @text 実行確率
 * @default 100
 * @type number
 * 
 */

var Imported = Imported || {};
Imported.NUUN_FinalAttack = true;

(() => {
const parameters = PluginManager.parameters('NUUN_FinalAttack');
const param = JSON.parse(JSON.stringify(parameters, function(key, value) {
  try {
      return JSON.parse(value);
  } catch (e) {
      try {
          return eval(value);
      } catch (e) {
          return value;
      }
  }
}));

const _BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
  _BattleManager_initMembers.call(this);
  this.finalAttackList = [];
  this._finalAttack = false;
  this._finalAttackLastAttack = -1;
};

const _BattleManager_processForcedAction = BattleManager.processForcedAction;
BattleManager.processForcedAction = function() {
  _BattleManager_processForcedAction.call(this);
  if (this._finalAttack) {
    this.resetFinalAttack(this._subject);
  }
};

BattleManager.resetFinalAttack = function(subject) {
  if (subject._actions[0]) {
    this.forceAction(subject);
    this._finalAttack = true;
  } else {
    subject.finalAttackEnd = true;
    this.removeFinalAttack();
    if (!this.finalAttackList[0]) {
      this._finalAttack = false;
    } else {
      this.forceAction(this.finalAttackList[0]);
      this._finalAttack = true;
    }
  }
};

BattleManager.removeFinalAttack = function() {
  this.finalAttackList.shift();
};

BattleManager.setFinalAttackLastAttack = function(mode) {
  this._finalAttackLastAttack = mode && this._subject ? this._subject.index() : -1;
};

BattleManager.getFinalAttackLastAttack = function() {
  return this._finalAttackLastAttack;
};

BattleManager.setFinalAttack = function(subject) {
  this.finalAttackList.push(subject);
  if (!this.finalAttackList[1]) {
    this.forceAction(this.finalAttackList[0]);
  }
  this._finalAttack = true;
};

const _Game_Actor_performCollapse = Game_Actor.prototype.performCollapse;
Game_Actor.prototype.performCollapse = function() {
  if ($gameParty.inBattle()) {
    if (!this.finalAttackEnd && this.finalAttackDate()) {
      BattleManager.setFinalAttack(this);
    } else {
      this.finalAttackEnd = false;
      _Game_Actor_performCollapse.call(this);
    }
  }
};

const _Game_Enemy_performCollapse = Game_Enemy.prototype.performCollapse;
Game_Enemy.prototype.performCollapse = function() {
  if (!this.finalAttackEnd && this.finalAttackDate()) {
    BattleManager.setFinalAttack(this);
  } else {
    this.finalAttackEnd = false;
    _Game_Enemy_performCollapse.call(this);
  }
};

Game_BattlerBase.prototype.finalAttackDate = function(){
  let allAction = [];
  BattleManager.setFinalAttackLastAttack(true);
	this.traitObjects().forEach(function(traitObject) {
		if (traitObject.meta.FinalAttack) {
			this.makeFinalAttackActions(Number(traitObject.meta.FinalAttack));
      Array.prototype.push.apply(allAction, this._actions);
      //allAction = allAction.concat(this._actions);
		}
	}, this);
  if (allAction.length > 0) {
    this._actions = allAction;
    return true;
  }
  return false;
};

const _Game_Battler_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
  _Game_Battler_initMembers.call(this);
  this.finalAttackEnd = false;
};

Game_Battler.prototype.makeFinalAttackActions = function(id) {
  this.clearActions();
  const finalAttack = param.FinalAttack[id - 1];
  const actionTimes = finalAttack && finalAttack.FinalAttackSkill ? finalAttack.FinalAttackSkill.length : 0;
  if (actionTimes > 0) {
    const actionList = finalAttack.FinalAttackSkill;
    for (let i = 0; i < actionTimes; i++) {
      const actionData = actionList[i];
      if (this.finalAttackRate(actionData)) {
        const action = new Game_Action(this);
        action.setSkill(actionData.FinalAttackSkillId);
        action.setFinalAttackTarget(finalAttack);
        this._actions.push(action);
      }
    }
  }
};

Game_Action.prototype.setFinalAttackTarget = function(action) {
  const index = BattleManager.getFinalAttackLastAttack();
  if (action.FinalAttackTarget === 1 && index > 0) {
    this.setTarget(index);
  }
};

Game_Battler.prototype.finalAttackRate = function(action) {
  return Math.floor(Math.random() * 100) < action.FinalAttackSkillRate;
};

const _Window_BattleLog_endAction = Window_BattleLog.prototype.endAction;
Window_BattleLog.prototype.endAction = function(subject) {
  _Window_BattleLog_endAction.call(this, subject);
  this.displayfinalAttackEndCollapse(subject);
};

Window_BattleLog.prototype.displayfinalAttackEndCollapse = function(subject) {
  if (subject.finalAttackEnd && subject.hp === 0) {
    this.push("performCollapse", subject);
    this.push("wait");
  }
};

})();