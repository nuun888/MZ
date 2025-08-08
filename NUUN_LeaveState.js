/*:-----------------------------------------------------------------------------------
 * NUUN_LeaveState.js
 * 
 * Copyright (C) 2025 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Leave state
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * You can create a state where members leave the battle.
 * 
 * Specification
 * You cannot force enemies to leave.
 * The leaver list will be the same for multiple leave states.
 * If you leave the party in any state other than the leaving state, you will not be able to return to the party.
 * 
 * State Note's
 * <LeaveState:[SE]> Sets the leave state.
 * 
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 8/8/2025 Ver.1.0.0
 * First edition.
 * 
 * @param LeaveActionSwitches
 * @text Enemy action condition settings
 * @desc Set the conditions for enemy actions.
 * @type struct<LeaveActionSwitchList>[]
 * @default []
 * 
 * @param LeaveSESetting
 * @text SE when leaving
 * @desc Plays the sound effect when leaving.
 * @type struct<LeaveSE>[]
 * @default []
 * 
 * @command ResetLeave
 * @desc Reinstates the leaving actor as a member.
 * @text Leave actor returns
 * 
 */
/*~struct~LeaveActionSwitchList:
 * 
 * @param SwitchId
 * @text Switch
 * @desc Specifies the switch.
 * @type switch
 * @default 0
 * 
 * @param LeaveFormat
 * @text Skill Action Conditions
 * @desc Enter the enemy's action conditions in Javascript.this:$gameEnemy
 * @type combo
 * @option !$gameParty.isLeaveMembers(1);//no leave
 * @option $gameParty.isLeaveMembers(1);//There is 1 or more leavers
 * @default 
 * 
 */
/*~struct~LeaveSE:
 * 
 * @param LeaveSE
 * @text Sound effect when leaving
 * @desc Sound effect when leaving.
 * @type file
 * @dir audio/se/
 * 
 * @param volume
 * @text SE volume
 * @desc Set the SE volume.
 * @type number
 * @default 90
 * @min 0
 * 
 * @param pitch
 * @text SE Pitch
 * @desc Sets the pitch of SE.
 * @type number
 * @default 100
 * 
 * @param pan
 * @text SE pan
 * @desc Set the pan to SE.
 * @type number
 * @default 0
 * @max 100
 * @min -100
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 離脱ステート
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * 見方が戦闘から離脱するステートを制作できます。
 * 
 * 仕様
 * 敵に対して離脱させることは出来ません。
 * 複数の離脱ステートに対して離脱者リストは同一になります。
 * 離脱ステート以外で離脱した場合、パーティの復帰は出来ません。
 * 
 * ステートのメモ欄
 * <LeaveState:[SE]> 離脱ステートを設定します。
 * [SE]:離脱時SEのID
 * 
 * スキル、アイテムのメモ欄
 * <ComebackSkill> 離脱したバトラーを呼び戻します。
 * 
 * 敵キャラのメモ欄
 * <LeaveActionCond[id]:[cond]> 指定のスイッチIDに対応する敵の行動条件設定を設定します。
 * [id]:敵の行動条件設定で設定しているスイッチID
 * [cond]:行動条件 この条件が優先されます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2025/8/8 Ver.1.0.0
 * 初版
 * 
 * @param LeaveActionSwitches
 * @text 敵の行動条件設定
 * @desc 敵の行動条件を設定します。
 * @type struct<LeaveActionSwitchList>[]
 * @default []
 * 
 * @param LeaveSESetting
 * @text 離脱時SE
 * @desc 離脱時のSEを再生します。
 * @type struct<LeaveSE>[]
 * @default []
 * 
 * @command ResetLeave
 * @desc 離脱アクターをメンバーに復帰させます。
 * @text 離脱アクター復帰
 * 
 */
/*~struct~LeaveActionSwitchList:ja
 * 
 * @param SwitchId
 * @text スイッチ
 * @desc スイッチを指定します。
 * @type switch
 * @default 0
 * 
 * @param LeaveFormat
 * @text スキル行動条件
 * @desc 敵の行動条件をJavascriptで記入します。this:$gameEnemy
 * @type combo
 * @option !$gameParty.isLeaveMembers(1);//離脱無
 * @option $gameParty.isLeaveMembers(1);//1以上の離脱有
 * @default 
 * 
 */
/*~struct~LeaveSE:ja
 * 
 * @param LeaveSE
 * @text 離脱時SE
 * @desc 離脱時のSE
 * @type file
 * @dir audio/se/
 * 
 * @param volume
 * @text 音量
 * @desc 音量。
 * @type number
 * @default 90
 * 
 * @param pitch
 * @text ピッチ
 * @desc ピッチ。
 * @type number
 * @default 100
 * 
 * @param pan
 * @text 位相
 * @desc 位相。
 * @type number
 * @default 0
 * @max 100
 * @min -100
 * 
 */

var Imported = Imported || {};
Imported.NUUN_LeaveState = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;

    PluginManager.registerCommand(pluginName, 'ResetLeave', args => {
        $gameParty.comebackParty();
    });

    const _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
    Game_Action.prototype.applyItemUserEffect = function(target) {
        _Game_Action_applyItemUserEffect.apply(this, arguments);
        this.comebackMembersSkill(target);
    };

    Game_Action.prototype.comebackMembersSkill = function(target) {
        const item = this.item();
        if (item.meta.ComebackSkill) {
            $gameParty.comebackParty();
            this.makeSuccess(target);
        }
    };


    const _Game_Battler_refresh = Game_Battler.prototype.refresh;
    Game_Battler.prototype.refresh = function() {
        _Game_Battler_refresh.apply(this, arguments);
        if ($gameParty.inBattle() && this.isLeaveState()) {
            this.setLeaveBattler();
        }
    };

    Game_Battler.prototype.isLeaveState = function() {
        return this._states.some(id => !!$dataStates[id].meta.LeaveState);
    };

    Game_Enemy.prototype.isLeaveState = function() {
        return false;
    };

    Game_Battler.prototype.leaveStateId = function() {
        return this._states.find(id => !!$dataStates[id].meta.LeaveState);
    };

    Game_Battler.prototype.setLeaveBattler = function() {
        
    };

    Game_Battler.prototype.nuun_Leave = function(stateId) {
        if ($gameParty.inBattle()) {
            this.hide();
        }
        this.clearActions();
        this.leavePlaySE(stateId);
    };

    Game_Battler.prototype.leavePlaySE = function(stateId) {
        const id = NuunManager.getMetaCode($dataStates[stateId], "LeaveState");
        if (id >= 0) {
            const data = params.LeaveSESetting[id - 1];
            if (!!data && data.LeaveSE) {
                AudioManager.playSe({"name":data.LeaveSE,"volume":data.volume,"pitch":data.pitch,"pan":data.pan});
            }
        }
    };

    Game_Actor.prototype.setLeaveBattler = function() {
        const stateId = this.leaveStateId();
        $gameParty.setLeaveBattler(this.index(), this.actorId(), stateId);
        this.nuun_Leave(stateId);
    };

    const _Game_Enemy_meetsSwitchCondition = Game_Enemy.prototype.meetsSwitchCondition;
    Game_Enemy.prototype.meetsSwitchCondition = function(param) {
        if (this.condLeaveAction(param)) {
            return true;
        } else {
            return _Game_Enemy_meetsSwitchCondition.apply(this, arguments);
        }
    };

    Game_Enemy.prototype.condLeaveAction = function(param) {
        return !!params.LeaveActionSwitches && params.LeaveActionSwitches.some(s => s.SwitchId === param && this.condLeaveActionFormat(param, s));
    };

    Game_Enemy.prototype.condLeaveActionFormat = function(param, s) {
        const tag = "LeaveActionCond" + param;
        const a = this.enemy().meta[tag];
        return a === undefined ? eval(s.LeaveFormat) : eval(a);
    };
    

    const _Game_Unit_initialize = Game_Unit.prototype.initialize;
    Game_Unit.prototype.initialize = function() {
        _Game_Unit_initialize.apply(this, arguments);
        this.leaveBattler = [];
    };

    Game_Unit.prototype.setLeaveBattler = function(index, id, state) {
        if (!this.leaveBattler) {
            this.leaveBattler = [];
        }
        this.leaveBattler.push({id:id, index:index, state:state});
    };

    Game_Party.prototype.comebackParty = function() {
        if (!this.leaveBattler) return;
        const members = this.leaveBattler.reverse();
        while (members.length > 0) {
            const actor = members.shift();
            this.comebackActor(actor.index, actor.id);
            $gameActors.actor(actor.id).removeState(actor.state);
        }
        this.leaveBattler = [];
        $gamePlayer.refresh();
        $gameTemp.requestBattleRefresh();
    };

    Game_Party.prototype.leaveActor = function(index) {
        return this._actors.splice(index, 1);
    };

    Game_Party.prototype.comebackActor = function(index, id) {
        const actor = $gameActors.actor(id);
        actor.appear();
    };

    Game_Party.prototype.isLeaveMembers = function(num) {
        return !!this.leaveBattler && this.leaveBattler.length >= num;
    };


    const _BattleManager_endBattle = BattleManager.endBattle;
    BattleManager.endBattle = function(result) {
        _BattleManager_endBattle.apply(this, arguments);
        if (this._phase === "battleEnd") {
            $gameParty.comebackParty();
        }
    };
    
})();