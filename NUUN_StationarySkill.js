/*:-----------------------------------------------------------------------------------
 * NUUN_StationarySkill.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Stationary skill
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.1.2
 * 
 * @help
 * Activate the skill for the battler who has released the state with the passage of the turn.
 * The skill status will be the battler status with the installed skill status added.
 * 
 * State Notes
 * <StationarySkill:[id]> The skill with the specified ID will be activated when the state is released after the turn has passed.
 * [id]:The ID of the plugin parameter "Stationary skill setting".
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 1/2/2024 Ver.1.1.2
 * Fixed an issue where an error would occur when selecting a command when a set skill is activated.
 * 6/17/2023 Ver.1.1.1
 * Fixed an issue where end-of-turn processing could not be executed in a turn-based mode when adding a state with an installed skill.
 * Fixed an issue where the TPB gauge would be consumed when activating installed skills in the TPB system.
 * 6/17/2023 Ver.1.1.0
 * In addition to the normal skill activation message, added a function that allows you to set the activation message that can also set the target name.
 * Modified not to consider counters and reflections.
 * 6/15/2023 Ver.1.0.0
 * First edition.
 * 
 * @param StationarySkillData
 * @desc Set the installation type skill.
 * @text Stationary skill setting
 * @type struct<StationarySkillDataList>[]
 * @default 
 * 
 */
/*~struct~StationarySkillDataList:
 * 
 * @param StationarySkillName
 * @desc Stationary skill identifier.
 * @text Stationary skill identifier.
 * @type string
 * @default
 * 
 * @param StationarySkills
 * @desc Set the skill to be performed when the state is released. (Multiple settings possible)
 * @text Stationary skill list
 * @type struct<StationarySkillList>[]
 * @default 
 * 
 * 
 */
/*~struct~StationarySkillList:
 * 
 * @param StationarySkill
 * @desc Specify skills.
 * @text Skill
 * @type skill
 * @default
 * 
 * @param StationarySkillMessage
 * @desc Message when setting type skill is activated. %1: subject name %2: target name %3: skill name
 * @text Stationary skill message
 * @type string
 * @default
 * 
 * @param CondStationary
 * @desc Enter the trigger condition with javascript. a: Actor game data
 * @text Trigger condition evaluation formula
 * @type combo
 * @option "a.actor()"
 * @option "$gameVariables.value(0);//game variable"
 * @option "$gameSwitches.value(0);//game switch"
 * @default 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 設置型スキル
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.1.2
 * 
 * @help
 * ステートをターン経過で解除したバトラーに対し、スキルを発動します。
 * スキルのステータスは設置型スキルのステートを付加させたバトラーのステータスになります。
 * 
 * ステートのメモ欄
 * <StationarySkill:[id]> ステートのターン経過による解除で指定のIDのスキルを発動します。
 * [id]:プラグインパラメータの設置型スキル設定のID。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/1/2 Ver.1.1.2
 * 設置型スキルが発動したときにコマンドを選択するとエラーが出る問題を修正。
 * 2023/6/17 Ver.1.1.1
 * 設置型スキルでステートを付加させたときに、ターン制でターン終了処理を実行できない問題を修正。
 * TPB制で設置型スキル発動時にTPBゲージが消費されてしまう問題を修正。
 * 2023/6/17 Ver.1.1.0
 * 通常のスキル発動メッセージとは別に、対象名も設定できる発動時のメッセージを設定できる機能を追加。
 * カウンター、反射を考慮しないように修正。
 * 2023/6/15 Ver.1.0.0
 * 初版。
 * 
 * @param StationarySkillData
 * @desc 設置型スキルを設定をします。
 * @text 設置型スキル設定
 * @type struct<StationarySkillDataList>[]
 * @default 
 * 
 */
/*~struct~StationarySkillDataList:ja
 * 
 * @param StationarySkillName
 * @desc 設置型スキル識別名。
 * @text 設置型スキル識別名
 * @type string
 * @default
 * 
 * @param StationarySkills
 * @desc ステート解除時に行うスキルを設定します。(複数設定可能)
 * @text 設置型スキルリスト
 * @type struct<StationarySkillList>[]
 * @default 
 * 
 * 
 */
/*~struct~StationarySkillList:ja
 * 
 * @param StationarySkill
 * @desc スキルを指定します。
 * @text スキル
 * @type skill
 * @default
 * 
 * @param StationarySkillMessage
 * @desc 設置型スキル発動時のメッセージ。%1:発動者名 %2:ターゲット名 %3:発動スキル名
 * @text 設置型スキルメッセージ
 * @type string
 * @default
 * 
 * @param CondStationary
 * @desc 発動条件をjavascriptで記入します。a:アクターゲームデータ
 * @text 発動条件評価式
 * @type combo
 * @option "a.actor()"
 * @option "$gameVariables.value(0);//ゲーム変数"
 * @option "$gameSwitches.value(0);//スイッチ"
 * @default 
 * 
 */

var Imported = Imported || {};
Imported.NUUN_StationarySkill = true;
//戦闘終了後に行動リスト消去
//Tiananmen Incident
(() => {
    const parameters = PluginManager.parameters('NUUN_StationarySkill');
    const StationarySkillData = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['StationarySkillData'])) : [];


    class StationarySkill {
        constructor(stateId, data, battler) {
            this._stateId = stateId
            this._data = data;
            this._battler = battler;
        }

        getStateId() {
            return this._stateId;
        }

        getBattler() {
            return this._battler;
        }

        getSkills() {
            return this._data.StationarySkills;
        }
    };

    class Game_StationaryAction extends Game_Action {
        constructor(subject, forcing) {
            super(subject, forcing);
            this.stationaryAction = true;
            this.stationaryFmt = '';
        }

        setStationaryFmt (fmt) {
            this.stationaryFmt = fmt;
        }

        getStationaryFmt () {
            return this.stationaryFmt;
        }
    };


    const _Game_Action_itemEffectAddState = Game_Action.prototype.itemEffectAddState;
    Game_Action.prototype.itemEffectAddState = function(target, effect) {
        $gameTemp.stationaryActor = this.subject();
        _Game_Action_itemEffectAddState.call(this, target, effect);
    };


    const _Game_Battler_initMembers = Game_Battler.prototype.initMembers;
    Game_Battler.prototype.initMembers = function() {
        _Game_Battler_initMembers.call(this);
        this.onStationaryAction = false;
        this.initStationaryActions();
        this.initStationarySkill();
    };

    Game_Battler.prototype.initStationarySkill = function() {
        if (!this._stationarySkillList) {
            this._stationarySkillList = [];
        }
    };

    Game_Battler.prototype.initStationaryActions = function() {
        if (!this._stationaryActions) {
            this._stationaryActions = [];
        }
    };

    Game_Battler.prototype.isStationaryState = function(state) {
        return state.meta.StationarySkill;
    };

    const _Game_BattlerBase_addNewState = Game_BattlerBase.prototype.addNewState;
    Game_BattlerBase.prototype.addNewState = function(stateId) {
        _Game_BattlerBase_addNewState.call(this, stateId);
        if (this.isStationaryState($dataStates[stateId])) {
            this.setStationaryState($dataStates[stateId]);
        }
    };

    const _Game_BattlerBase_resetStateCounts = Game_BattlerBase.prototype.resetStateCounts;
    Game_BattlerBase.prototype.resetStateCounts = function(stateId) {
        _Game_BattlerBase_resetStateCounts.call(this, stateId);
        //if (this.isStationaryActor()) {
            //this._stateTurns[stateId]--;
        //}
    };

    Game_BattlerBase.prototype.isStationaryActor = function() {
        return BattleManager.onStationarySkill && (BattleManager._subject === this)
    };

    const _Game_Battler_removeStatesAuto = Game_Battler.prototype.removeStatesAuto;
    Game_Battler.prototype.removeStatesAuto = function(timing) {
        for (const state of this.states()) {
            if (this.isStationaryState(state) && this.isStateExpired(state.id) && state.autoRemovalTiming === timing) {
                this.setupStationarySkill(state.id);
                this.removeStationarySkill(state.id);
            }
        }
        _Game_Battler_removeStatesAuto.call(this, timing);
    };

    Game_Battler.prototype.setStationaryState = function(state) {
        this.initStationarySkill();
        const data = StationarySkillData[Number(state.meta.StationarySkill) - 1];
        this._stationarySkillList.push(new StationarySkill(state.id, data, $gameTemp.stationaryActor));
    };

    Game_Battler.prototype.getStationarySkillList = function(stateId) {
        this.initStationarySkill();
        return this._stationarySkillList.find(data => {
            return data.getStateId() === stateId;
        });
    };
//
    Game_Battler.prototype.setupStationarySkill = function(stateId) {
        const data = this.getStationarySkillList(stateId);
        const actionBattler = data.getBattler();
        const action = new Game_StationaryAction(actionBattler, true);
        const skill = this.makeStationaryActions(data);
        if (skill) {
            action.setTarget(this.index());
            action.setSkill(skill.StationarySkill);
            action.setStationaryFmt(skill.StationarySkillMessage);
            actionBattler._stationaryActions.push(action);
            BattleManager.setStationarySkill(actionBattler);
        }
    };
//
    Game_Battler.prototype.removeStationarySkill = function(stateId) {
        this.initStationarySkill();
        const removeStationaryId = this._stationarySkillList.findIndex(data => {
            data.getStateId() === stateId;
        });
        this._stationarySkillList.splice(removeStationaryId, 1);
    };

    Game_Battler.prototype.makeStationaryActions = function(data) {
        const a = this;
        const list = data.getSkills().filter(skill => (skill.CondStationary ? eval(skill.CondStationary) : true));
        const id = Math.floor(Math.random() * list.length);
        return list[id];
    };

    Game_Battler.prototype.numStationaryActions = function() {
        return this._stationaryActions.length;
    };

    const _Game_Battler_currentAction = Game_Battler.prototype.currentAction;
    Game_Battler.prototype.currentAction = function() {
        return this.isStationaryAction() ? this._stationaryActions[0] : _Game_Battler_currentAction.call(this);
    };
    
    const _Game_Battler_removeCurrentAction = Game_Battler.prototype.removeCurrentAction;
    Game_Battler.prototype.removeCurrentAction = function() {
        if (this.isStationaryAction()) {
            this._stationaryActions.shift();
        } else {
            _Game_Battler_removeCurrentAction.call(this);
        }
    };

    Game_Battler.prototype.isStationaryAction = function() {
        return !!this._stationaryActions[0];
    };


    const _BattleManager_initMembers = BattleManager.initMembers;
    BattleManager.initMembers = function() {
      _BattleManager_initMembers.call(this);
      this.onStationarySkill = false;
      this._stationaryActionList = [];
    };

    BattleManager.setStationarySkill = function(subject) {
        this._stationaryActionList.push(subject);
        if (!this._stationaryActionList[1]) {
            this.forceStationaryAction(subject);
        }
    };

    BattleManager.forceStationaryAction = function(battler) {
        if (battler.numStationaryActions() > 0) {
            this._actionForcedBattler = battler;
            this._actionBattlers.remove(battler);
        }
    };

    const _BattleManager_processForcedAction = BattleManager.processForcedAction;
    BattleManager.processForcedAction = function() {
        _BattleManager_processForcedAction.call(this);
        if (this._stationaryActionList.length > 0) {
            this.onStationarySkill = true;
            this.resetStationaryAction(this._subject);
        }
    };

    BattleManager.resetStationaryAction = function(subject) {
        if (subject._stationaryActions[0]) {
            this.forceStationaryAction(subject);
        } else {
            this.removeStationaryAction();
            if (!!this._stationaryActionList[0]) {
                this.forceStationaryAction(this._stationaryActionList[0]);
            }
        }
    };

    BattleManager.removeStationaryAction = function() {
        this._stationaryActionList.shift();
    };

    const _BattleManager_endBattlerActions = BattleManager.endBattlerActions;
    BattleManager.endBattlerActions = function(battler) {
        const d = [battler._tpbState, battler._tpbChargeTime];
        _BattleManager_endBattlerActions.call(this, battler);
        if (this.onStationarySkill) {
            battler._tpbState = d[0];
            battler._tpbChargeTime = d[1];
        }
        this.onStationarySkill = false;
    };

    const _BattleManager_endAction = BattleManager.endAction;
    BattleManager.endAction = function() {
        _BattleManager_endAction.call(this);
        if (this.onStationarySkill && (this.actor() && this._subject)) {
            this.endBattlerActions(this._subject);
            this._subject = null;
        }
    };


    const _Window_BattleLog_performActionStart = Window_BattleLog.prototype.performActionStart;
    Window_BattleLog.prototype.performActionStart = function(subject, action) {
        if (!action.stationaryAction) {//設置型スキルはモーションを行わない。
            _Window_BattleLog_performActionStart.call(this, subject, action);
        }
    };

    Window_BattleLog.prototype.displayActionStationary = function(action, target, subject, item) {
        const fmt = action.getStationaryFmt();
        if (fmt) {
            this.push("addText", fmt.format(subject.name(), target.name(), item.name));
        }
    };

})();