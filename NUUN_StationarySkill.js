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
 * @version 1.0.0
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
 */
/*:ja
 * @target MZ
 * @plugindesc 設置型スキル
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
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
 */

var Imported = Imported || {};
Imported.NUUN_StationarySkill = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_StationarySkill');
    const StationarySkillData = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['StationarySkillData'])) : [];

    const _Game_Action_itemEffectAddState = Game_Action.prototype.itemEffectAddState;
    Game_Action.prototype.itemEffectAddState = function(target, effect) {
        $gameTemp.stationarActor = this.subject();
        _Game_Action_itemEffectAddState.call(this, target, effect);
    };
    

    const _Game_BattlerBase_initMembers = Game_BattlerBase.prototype.initMembers;
    Game_BattlerBase.prototype.initMembers = function() {
        _Game_BattlerBase_initMembers.call(this);
        this.onStationarActio = false;
        this.initStationarySkill();
        this.initStationarActions();
    };

    Game_Battler.prototype.initStationarySkill = function() {
        if (!this._stationarySkillList) {
            this._stationarySkillList = [];
        }
    };

    Game_Battler.prototype.initStationarActions = function() {
        if (!this._stationarActions) {
            this._stationarActions = [];
        }
    };

    const _Game_BattlerBase_addNewState = Game_BattlerBase.prototype.addNewState;
    Game_BattlerBase.prototype.addNewState = function(stateId) {
        _Game_BattlerBase_addNewState.call(this, stateId);
        if (this.isStationaryState($dataStates[stateId])) {
            this.setStationaryState($dataStates[stateId]);
        }
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

    Game_Battler.prototype.isStationaryState = function(state) {
        return state.meta.StationarySkill;
    };

    Game_Battler.prototype.setStationaryState = function(state) {
        this.initStationarySkill();
        const data = StationarySkillData[Number(state.meta.StationarySkill) - 1];
        this._stationarySkillList.push(new StationarySkill(state.id, data, $gameTemp.stationarActor));
    };

    Game_Battler.prototype.getStationarySkillList = function(stateId) {
        this.initStationarySkill();
        return this._stationarySkillList.find(data => {
            return data.getStateId() ===stateId;
        });
    };

    Game_Battler.prototype.removeStationarySkill = function(stateId) {
        this.initStationarySkill();
        const removeStationaryId = this._stationarySkillList.findIndex(data => {
            data.getStateId() === stateId;
        });
        this._stationarySkillList.splice(removeStationaryId, 1);
    };

    Game_Battler.prototype.setupStationarySkill = function(stateId) {
        this.initStationarActions();
        const data = this.getStationarySkillList(stateId);
        const actionBattler = data.getBattler();
        const action = new Game_StationaryAction(actionBattler);
        action.setTarget(this.index());
        action.setSkill(this.makeStationaryActions(data));
        actionBattler._stationarActions.push(action);
    };

    Game_Battler.prototype.makeStationaryActions = function(data) {
        const list = data.getSkills();
        const id = Math.floor(Math.random() * list.length);
        return list[id].StationarySkill;
    };

    Game_Battler.prototype.currentStationaryAction = function() {
        return this._stationarActions ? this._stationarActions[0] : null;
    };

    Game_Battler.prototype.removeStationaryAction = function() {
        this._stationarActions.shift();
    };

    const _Game_Battler_onTurnEnd = Game_Battler.prototype.onTurnEnd;
    Game_Battler.prototype.onTurnEnd = function() {
        if (this.onStationarAction) {
            this.onStationarAction = false;
        } else {
            _Game_Battler_onTurnEnd.call(this);
        }
    };


    const _BattleManager_initMembers = BattleManager.initMembers;
    BattleManager.initMembers = function() {
        _BattleManager_initMembers.call(this);
        this._stationarActionBattlers = [];
    };

    const _BattleManager_getNextSubject = BattleManager.getNextSubject;
    BattleManager.getNextSubject = function() {
        for (const member of this.allBattleMembers()) {
            if (member.currentStationaryAction()) {
                return member;
            }
        }
        return _BattleManager_getNextSubject.call(this);
    };

    const _BattleManager_processTurn =  BattleManager.processTurn;
    BattleManager.processTurn = function() {
        if (this._subject.currentStationaryAction()) {
            const subject = this._subject;
            const action = subject.currentStationaryAction();
            action.prepare();
            if (action.isStationaryValid()) {
                this.startStationarAction(action, subject);
            }
            subject.removeStationaryAction();
        } else {
            _BattleManager_processTurn.call(this);
        }
    };

    Game_Action.prototype.isStationaryValid = function() {
        return this.subject().currentStationaryAction();
    };

    const _BattleManager_updateTurnEnd = BattleManager.updateTurnEnd;
    BattleManager.updateTurnEnd = function() {
        _BattleManager_updateTurnEnd.call(this);
        if (!this.isTpb() && this.isStationarActionMembers()) {
            this._phase = "turn";
        }
    };

    BattleManager.isStationarActionMembers = function() {
        let result = false;
        for (const member of this.allBattleMembers()) {
            if (member.currentStationaryAction()) {
                member.onStationarAction = true;
                result = true;
            }
        }
        return result;
    };

    BattleManager.startStationarAction = function(action, subject) {
        this._subject = subject;
        const targets = action.makeTargets();
        this._phase = "action";
        this._action = action;
        this._targets = targets;
        subject.cancelMotionRefresh();
        this._action.applyGlobal();
        this._logWindow.startAction(subject, action, targets);
    };

    const _Window_BattleLog_performActionStart = Window_BattleLog.prototype.performActionStart;
    Window_BattleLog.prototype.performActionStart = function(subject, action) {
        if (!action.stationaryAction) {//設置型スキルはモーションを行わない。
            _Window_BattleLog_performActionStart.call(this, subject, action);
        }
    };  

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
        constructor(subject) {
            super(subject, false);
            this.stationaryAction = true;
        }
    };


})();