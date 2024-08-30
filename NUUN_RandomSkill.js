/*:-----------------------------------------------------------------------------------
 * NUUN_RandomSkill.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Random skill
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_SkillCostEX
 * @version 1.0.3
 * 
 * @help
 * You can set skills that can be activated randomly.
 * 
 * Skill notes
 * <RandomSkill:[id]> Set a skill that will be activated randomly from the skill set with the specified ID.
 * [id]:List number of random activation skill settings in plugin parameters.
 * If no skill is selected randomly, the original skill will be used to attack.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 8/31/2024 Ver.1.0.3
 * Fixed an issue where payment for the cost of the original skill was consumed as the cost of the activated skill.
 * Fixed some plugin conflicts.
 * 8/17/2024 Ver.1.0.2
 * Fixed an issue that caused skills to not activate under certain conditions.
 * Fixed an issue that allowed commands to be selected again.
 * 8/3/2023 Ver.1.0.1
 * Processing fixes.
 * 7/23/2023 Ver.1.0.0
 * First edition.
 * 
 * @param RandomSkillSetting
 * @desc Set the random activation skill.
 * @text Random activation skill setting
 * @type struct<RandomSkills>[]
 * @default 
 * 
 */
/*~struct~RandomSkills:
 * 
 * @param RandomSkillList
 * @desc Specifies the skill to activate randomly.
 * @text Random skill
 * @type struct<SkillList>[]
 * @default 
 * 
 * @param RandomSkillCost
 * @desc Consumed at the cost of randomly activated skills.
 * @text Random skill cost consumption
 * @type boolean
 * @default false
 * 
 * @param RandomSkillMessage
 * @desc Display the message of the randomly activated skill.
 * @text Random skill message display
 * @type boolean
 * @default false
 * 
 */
/*~struct~SkillList:
 * 
 * @param RandomSkill
 * @desc Specify skills.
 * @text Skill
 * @type skill
 * @default 
 * 
 * @param RandomSkillRate
 * @desc Specifies the probability that the skill will be selected.
 * @text Trigger probability
 * @type number
 * @default 100
 * 
 * @param RandomSkillCond
 * @desc Specify the conditions for skill selection in Javascript.
 * @text Conditions.
 * @type combo
 * @option '$gameVariables.value(0);//game variable'
 * @default 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc ランダム発動スキル
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.3
 * 
 * @help
 * 発動するスキルがランダムに発動出来るスキルを設定できます。
 * 
 * スキルのメモ欄
 * <RandomSkill:[id]> 指定IDで設定したスキルからランダムに発動するスキルを設定します。
 * [id]:プラグインパラメータのランダム発動スキル設定のリスト番号。
 * ランダム抽選でスキルが選ばれなかった場合、元のスキルで攻撃します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/8/31 Ver.1.0.3
 * 元のスキルでのコストでの支払いが発動したスキルのコストで消費していた問題を修正。
 * 一部プラグインの競合対応。
 * 2024/8/17 Ver.1.0.2
 * 条件によってはスキルが発動しない問題を修正。
 * コマンドが再度選択できてしまう問題を修正。
 * 2023/8/3 Ver.1.0.1
 * 処理の修正。
 * 2023/7/23 Ver.1.0.0
 * 初版
 * 
 * @param RandomSkillSetting
 * @desc ランダム発動スキルの設定をします。
 * @text ランダム発動スキル設定
 * @type struct<RandomSkills>[]
 * @default 
 * 
 */
/*~struct~RandomSkills:ja
 * 
 * @param RandomSkillList
 * @desc ランダムに発動させるスキルを指定します。
 * @text ランダム発動スキル
 * @type struct<SkillList>[]
 * @default 
 * 
 * @param RandomSkillCost
 * @desc ランダム発動したスキルのコストで消費。
 * @text ランダムスキルコスト消費
 * @type boolean
 * @default false
 * 
 * @param RandomSkillMessage
 * @desc ランダム発動したスキルのメッセージを表示。
 * @text ランダムスキルメッセージ表示
 * @type boolean
 * @default false
 * 
 */
/*~struct~SkillList:ja
 * 
 * @param RandomSkill
 * @desc スキルを指定します。
 * @text スキル
 * @type skill
 * @default 
 * 
 * @param RandomSkillRate
 * @desc スキルが選択される確率を指定します。
 * @text 発動確率
 * @type number
 * @default 100
 * 
 * @param RandomSkillCond
 * @desc スキルが選択される条件をJavascriptで指定します。
 * @text 条件
 * @type combo
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @default 
 * 
 */

var Imported = Imported || {};
Imported.NUUN_RandomSkill = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const parameters = PluginManager.parameters('NUUN_RandomSkill');

    const _BattleManager_startAction = BattleManager.startAction;
    BattleManager.startAction = function() {
        this.setRandomSkill();
        _BattleManager_startAction.apply(this, arguments);
    };

    BattleManager.setRandomSkill = function() {
        const subject = this._subject;
        const action = subject.currentAction();
        action.setRandomSkill();
    };

    const _Game_Action_clear = Game_Action.prototype.clear;
    Game_Action.prototype.clear = function() {
        _Game_Action_clear.call(this);
        this.randomSkillId = -1;
        this.randomCostSkillId = -1;
    };

    Game_Action.prototype.setRandomSkill = function() {
        const skill = this.item();
        const ramdomSkill = _getRandomSkillData(skill.id);
        if (ramdomSkill) {
            const skillList = ramdomSkill.RandomSkillList.filter(data => isRandomSkillCond(data) && isRandomSkillRate(data) && this.subject().isRandomSkillCost(ramdomSkill.RandomSkillCost, data)).map(data => data.RandomSkill);
            if (skillList && skillList.length > 0) {
                this.randomSkillId = skill.id;
                const randomSkillId = skillList[Math.randomInt(skillList.length)];
                this.randomCostSkillId = ramdomSkill.RandomSkillCost ? randomSkillId : skill.id;
                this.setSkill(randomSkillId);
            }
        }
    };

    Game_Action.prototype.isRandomSkill = function() {
        return this.randomSkillId >= 0;
    };


    const _Game_BattlerBase_canPaySkillCost = Game_BattlerBase.prototype.canPaySkillCost;
    Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
        skill = this.canRandomSkillCost(skill);
        return _Game_BattlerBase_canPaySkillCost.apply(this, arguments);
    };

    const _Game_BattlerBase_paySkillCost = Game_BattlerBase.prototype.paySkillCost;
    Game_BattlerBase.prototype.paySkillCost = function(skill) {
        skill = this.canRandomSkillCost(skill);
        _Game_BattlerBase_paySkillCost.apply(this, arguments);
    };

    const _Game_Battler_consumeItem = Game_Battler.prototype.consumeItem;
    Game_Battler.prototype.consumeItem = function(item) {
        item = this.canRandomSkillCost(item);
        _Game_Battler_consumeItem.apply(this, arguments);
    };

    Game_Battler.prototype.isRandomSkillCost = function(mode, data) {
        return mode ? this.canPaySkillCost($dataSkills[data.RandomSkill]) : true;
    };

    Game_Battler.prototype.canRandomSkillCost = function(skill) {
        const action = this.currentAction();
        if (action && action.isRandomSkill()) {
            return $dataSkills[action.randomCostSkillId];
        }
        return skill;
    };

    Game_Battler.prototype.getRandomOriginalSkill = function(skill) {
        const action = this.currentAction();
        if (action && action.isRandomSkill()) {
            return $dataSkills[action.randomSkillId];
        }
        return skill;
    };

    const _Game_Battler_useItem = Game_Battler.prototype.useItem;
    Game_Battler.prototype.useItem = function(item) {
        const _item = this.getRandomOriginalSkill(item);//元のスキルに戻す
        _Game_Battler_useItem.call(this, _item);
    };


    const _Window_BattleLog_displayAction = Window_BattleLog.prototype.displayAction;
    Window_BattleLog.prototype.displayAction = function(subject, item) {
        item = this.getRandomSkillMessage(subject, item);
        _Window_BattleLog_displayAction.call(this, subject, item);
    };

    Window_BattleLog.prototype.getRandomSkillMessage = function(subject, item) {
        if (DataManager.isSkill(item)) {
            const action = subject.currentAction();
            const ramdomSkill = _getRandomSkillData(action.randomSkillId);
            if (ramdomSkill && !ramdomSkill.RandomSkillMessage) {
                item = $dataSkills[action.randomSkillId];
            }
        }
        return item;
    };

    function _getRandomSkillData(skillId) {
        const id = $dataSkills[skillId] && $dataSkills[skillId].meta.RandomSkill ? Number($dataSkills[skillId].meta.RandomSkill) : -1;
        return params.RandomSkillSetting[id - 1];
    };

    function isRandomSkillCond(data) {
        return !!data.RandomSkillCond ? eval(data.RandomSkillCond) : true;
    };

    function isRandomSkillRate(data) {
        return Math.randomInt(100) < (data.RandomSkillRate || 100);
    };
    
})();