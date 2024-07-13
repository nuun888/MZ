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
 * @plugindesc Final Attack Features
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.1.5
 * 
 * @help
 * Implement final attack.
 * 
 * Note with features
 * <FinalAttack:1> 
 * When you become incapacitated, the skill specified in #1 of the final attack settings will be activated.
 * Skill costs are not taken into consideration, so if there is a skill cost, the number may be displayed as a negative number.
 * You can specify multiple skills that can be set.
 * 
 * Specification
 * If the final attack interrupts with two or more actions, the action ends at that point.
 * 
 * Log
 * 7/13/2024 Ver.1.1.5
 * Fixed some plugin conflicts.
 * Fixed the timing of skill selection for Final Attack.
 * 7/3/2024 Ver.1.1.4
 * Fixed an issue where the skill cost-free setting was not being applied.
 * Fixed a problem where skills would not be activated if all target members were incapacitated.
 * 6/30/2024 Ver.1.1.3
 * Fixed an issue where monster images would not disappear at the end of battle and final attacks would not be executed.
 * Added the ability to enable skill costs.
 * 6/4/2024 Ver.1.1.2
 * Fixed Final Attack skill not being added if skill cost is insufficient.
 * 11/12/2022 Ver.1.1.1
 * Changed the display in languages other than Japanese to English.
 * 5/8/2022 Ver.1.1.0
 * Added a function to attack the battler who stabbed the finisher.
 * Fixed the problem that an error occurs when specifying an id with no skill set.
 * 5/3/2021 Ver.1.0.1
 * A little fix.
 * 5/3/2021 Ver.1.0.0
 * first edition.
 * 
 * @param FinalAttack
 * @desc Sets the skill for final attack.
 * @text Final attack settings
 * @type struct<FinalAttackList>[]
 * @default []
 */
/*~struct~FinalAttackList:
 * 
 * @param FinalAttackSkill
 * @desc Skill settings.
 * @text Skill settings
 * @type struct<FinalAttackSkillList>[]
 * @default []
 * 
 * @param FinalAttackTarget
 * @desc Target mode
 * @text Target mode
 * @type select
 * @option Setting Skill Target
 * @value 0
 * @option Butler who stabbed the end (range of set skill is single enemy)
 * @value 1
 * @default 0
 * 
 * @param CostConsumption
 * @desc Enable consumption costs.
 * @text Enable consumption costs
 * @type boolean
 * @default true
 * 
 */
/*~struct~FinalAttackSkillList:
 *  
 * @param FinalAttackSkillId
 * @desc A skill that performs a final attack.
 * @text Final attack skill
 * @default 0
 * @type skill
 * 
 * @param FinalAttackSkillRate
 * @desc Chance to perform this skill.
 * @text Execution probability
 * @default 100
 * @type number
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc ファイナルアタック特徴
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.1.5
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
 * イベントコマンドから戦闘不能にした場合はファイナルアタックを発動しません。
 * 
 * 更新履歴
 * 2024/7/13 Ver.1.1.5
 * 一部プラグインでの競合対応。
 * ファイナルアタックのスキル選定のタイミングを修正。
 * 2024/7/3 Ver.1.1.4
 * スキルコストが消費されない設定が適用されない問題を修正。
 * 対象のメンバー全員が戦闘不能になっている場合、スキルを発動しないように修正。
 * 2024/6/30 Ver.1.1.3
 * 戦闘終了時にモンスター画像が消えず、ファイナルアタックが実行されない問題を修正。
 * スキルコストを有効にする機能を追加。
 * 2024/6/4 Ver.1.1.2
 * スキルコストが足りない場合ファイナルアタックのスキルを追加しないように修正。
 * 2022/11/12 Ver.1.1.1
 * 日本語以外での表示を英語表示に変更。
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
/*~struct~FinalAttackList:ja
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
 * @param CostConsumption
 * @desc 消費コストを有効にします。
 * @text 消費コスト有効
 * @type boolean
 * @default true
 * 
 */
/*~struct~FinalAttackSkillList:ja
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
const params = Nuun_PluginParams.getPluginParams(document.currentScript);
let _costConsumption = false;

class Game_FinalAttackAction extends Game_Action {
    constructor(subject) {
        super(subject);
    }

    setup(data) {
        this._finalAttack = data;
        this.finalAttackSkill = true;
    }

    setFinalAttackTarget() {
        const index = BattleManager.getFinalAttackLastAttack();
        if (this._finalAttack.FinalAttackTarget === 1 && index > 0) {
            this.setTarget(index);
        }
    }

    isCostConsumption() {
        return this._finalAttack.CostConsumption;
    }
};


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
        subject.clearFinalAttack();
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

const _BattleManager_isActionForced = BattleManager.isActionForced;
BattleManager.isActionForced = function() {
    return this.isFinalAttack() || _BattleManager_isActionForced.apply(this, arguments);
};

BattleManager.isFinalAttack = function() {
    return this.finalAttackList.length > 0;
};

BattleManager.isFinalAttackCostConsumption = function() {
    const subject = this._subject;
    const action = subject.currentAction();
    return action && action.finalAttackSkill ? action.isCostConsumption() : true;
};


const _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    _Game_Action_applyItemUserEffect.apply(this, arguments);
    this.setFinalAttack(target);
};

Game_Action.prototype.setFinalAttack = function(target) {
    if ($gameParty.inBattle()) {
        const result = target.result();
        const states = result.addedStateObjects();
        for (const state of states) {
            if (state.id === target.deathStateId()) {
                target.setFinalAttack();
            }
        }
    }
};


Game_Battler.prototype.setFinalAttack = function() {
    if (this.finalAttackDate()) {
        BattleManager.setFinalAttack(this);
    }
};

Game_Battler.prototype.resetFinalAttack = function() {
    this.finalAttackEnd = false;
    this.clearFinalAttack();
};

const _Game_Actor_performCollapse = Game_Actor.prototype.performCollapse;
Game_Actor.prototype.performCollapse = function() {
    if ($gameParty.inBattle()) {
        if (this.isFinalAttack() && !this.finalAttackEnd) {
            return;
        }
        if (this.isFinalAttack() && this.finalAttackEnd) {
            this.resetFinalAttack();
        }
        _Game_Actor_performCollapse.apply(this, arguments);
    }
};

const _Game_Enemy_performCollapse = Game_Enemy.prototype.performCollapse;
Game_Enemy.prototype.performCollapse = function() {
    if (this.isFinalAttack() && !this.finalAttackEnd) {
        return;
    }
    if (this.isFinalAttack() && this.finalAttackEnd) {
        this.resetFinalAttack();
    }
    _Game_Enemy_performCollapse.apply(this, arguments);
};

Game_BattlerBase.prototype.finalAttackDate = function(){
    let allAction = [];
    BattleManager.setFinalAttackLastAttack(true);
        this.traitObjects().forEach(function(traitObject) {
            if (traitObject.meta.FinalAttack) {
                this.makeFinalAttackActions(Number(traitObject.meta.FinalAttack));
                Array.prototype.push.apply(allAction, this._actions);
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
    const finalAttack = params.FinalAttack[id - 1];
    const actionTimes = finalAttack && finalAttack.FinalAttackSkill ? finalAttack.FinalAttackSkill.length : 0;
    if (actionTimes > 0) {
        const actionList = finalAttack.FinalAttackSkill;
        for (let i = 0; i < actionTimes; i++) {
            const actionData = actionList[i];
            if (this.finalAttackRate(actionData)) {
                const action = new Game_FinalAttackAction(this);
                action.setSkill(actionData.FinalAttackSkillId);
                if (finalAttack.CostConsumption && this.isFinalAttackValid(action.item()) || !finalAttack.CostConsumption) {
                    action.setup(finalAttack);
                    action.setFinalAttackTarget();
                    this._actions.push(action);
                    this.setOnFinalAttack();
                }
            }
        }
    }
};

Game_Battler.prototype.isFinalAttack = function() {
    return this._onFinalAttack;
};

Game_Battler.prototype.setOnFinalAttack = function() {
    this._onFinalAttack = true;
};

Game_Battler.prototype.clearFinalAttack = function() {
    this._onFinalAttack = false;
};

Game_Battler.prototype.isFinalAttackValid = function(skill) {
    return this.isUnitAllDeadFinalAttack() && this.canPaySkillCost(skill);
};

Game_Actor.prototype.isUnitAllDeadFinalAttack = function() {
    return !$gameTroop.isAllDead();
};

Game_Enemy.prototype.isUnitAllDeadFinalAttack = function() {
    return !$gameParty.isAllDead();
};

const _Game_Battler_useItem = Game_Battler.prototype.useItem;
Game_Battler.prototype.useItem = function(item) {
    if (BattleManager.isFinalAttackCostConsumption()) {
        _Game_Battler_useItem.apply(this, arguments);
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