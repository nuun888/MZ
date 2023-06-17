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
 * @version 1.1.0
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
 * @version 1.1.0
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
(() => {
    const parameters = PluginManager.parameters('NUUN_StationarySkill');
    const StationarySkillData = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['StationarySkillData'])) : [];

    const _Game_Action_itemEffectAddState = Game_Action.prototype.itemEffectAddState;
    Game_Action.prototype.itemEffectAddState = function(target, effect) {
        $gameTemp.stationarActor = this.subject();
        _Game_Action_itemEffectAddState.call(this, target, effect);
    };

    Game_Action.prototype.isStationaryValid = function() {
        return this.subject().currentStationaryAction();
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
        if (!this._stationaryActions) {
            this._stationaryActions = [];
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
                BattleManager.onStationarySkill = true;
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
        const skill = this.makeStationaryActions(data);
        if (skill) {
            action.setTarget(this.index());
            action.setSkill(skill.StationarySkill);
            action.setStationaryFmt(skill.StationarySkillMessage);
            actionBattler._stationaryActions.push(action);
        }
    };

    Game_Battler.prototype.makeStationaryActions = function(data) {
        const a = this;
        const list = data.getSkills().filter(skill => (skill.CondStationary ? eval(skill.CondStationary) : true));
        const id = Math.floor(Math.random() * list.length);
        return list[id];
    };

    Game_Battler.prototype.currentStationaryAction = function() {
        return this._stationaryActions ? this._stationaryActions[0] : null;
    };

    Game_Battler.prototype.removeStationaryAction = function() {
        this._stationaryActions.shift();
    };

    Game_Battler.prototype.clearStationaryActions = function() {
        this._stationaryActions = [];
        this._stationarySkillList = [];
        this.onStationaryAction = false;
    };

    const _Game_Battler_onTurnEnd = Game_Battler.prototype.onTurnEnd;
    Game_Battler.prototype.onTurnEnd = function() {
        if (this.onStationaryAction) {
            this.onStationaryAction = false;
        } else {
            _Game_Battler_onTurnEnd.call(this);
        }
    };

    const _Game_Battler_escape = Game_Battler.prototype.escape;
    Game_Battler.prototype.escape = function() {
        _Game_Battler_escape.call(this);
        this.clearStationaryActions();
    };

    const _Game_Battler_onBattleEnd = Game_Battler.prototype.onBattleEnd
    Game_Battler.prototype.onBattleEnd = function() {
        _Game_Battler_onBattleEnd.call(this);
        this.clearStationaryActions();
    };


    const _BattleManager_initMembers = BattleManager.initMembers;
    BattleManager.initMembers = function() {
        _BattleManager_initMembers.call(this);
        this._stationarActionBattlers = [];
        this.onStationarySkill = false;
    };

    const _BattleManager_getNextSubject = BattleManager.getNextSubject;
    BattleManager.getNextSubject = function() {
        if (this.onStationarySkill) {
            for (const member of this.allBattleMembers()) {
                if (member.currentStationaryAction()) {
                    return member;
                }
            }
            this.onStationarySkill = false;
        }
        return _BattleManager_getNextSubject.call(this);
    };

    const _BattleManager_processTurn = BattleManager.processTurn;
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

    const _BattleManager_updateAction = BattleManager.updateAction;
    BattleManager.updateAction = function() {
        if (this._action.stationaryAction) {
            const target = this._targets.shift();
            if (target) {
                this.invokeStationaryAction(this._subject, target);
            } else {
                this.endAction();
            }
        } else {
            _BattleManager_updateAction.call(this);
        }
    };

    const _BattleManager_updateTurnEnd = BattleManager.updateTurnEnd;
    BattleManager.updateTurnEnd = function() {
        _BattleManager_updateTurnEnd.call(this);
        if (!this.isTpb() && this.isStationarActionMembers()) {
            this._phase = "turn";
        }
    };

    BattleManager.invokeStationaryAction = function(subject, target) {
        this._logWindow.push("pushBaseLine");
        subject.setLastTarget(target);
        this.invokeNormalAction(subject, target);
        this._logWindow.push("popBaseLine");
    };

    const _BattleManager_invokeNormalAction = BattleManager.invokeNormalAction;
    BattleManager.invokeNormalAction = function(subject, target) {
        if (this._action.stationaryAction) {
            this._logWindow.displayActionStationary(this._action, target, subject, this._action.item());
        }
        _BattleManager_invokeNormalAction.call(this, subject, target);
    };

    BattleManager.isStationarActionMembers = function() {
        let result = false;
        for (const member of this.allBattleMembers()) {
            if (member.currentStationaryAction()) {
                member.onStationaryAction = true;
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

    Window_BattleLog.prototype.displayActionStationary = function(action, target, subject, item) {
        const fmt = action.getStationaryFmt();
        if (fmt) {
            this.push("addText", fmt.format(subject.name(), target.name(), item.name));
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
            this.stationaryFmt = '';
        }

        setStationaryFmt (fmt) {
            this.stationaryFmt = fmt;
        }

        getStationaryFmt () {
            return this.stationaryFmt;
        }
    };


})();