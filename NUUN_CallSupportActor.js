/*:-----------------------------------------------------------------------------------
 * NUUN_CallSupportActor.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc Calling Support Actors
 * @author NUUN
 * @version 1.1.0
 * @base NUUN_SupportActor
 * @orderAfter NUUN_SupportActor
 * 
 * @help
 * You can set skills and items to call support actors.
 *
 * Skill and item notes
 * <CallSupportActor:[actorId],[turn],[deadCallActor]> Call support actors.
 * [actorId]:Actor id
 * [turn]:Number of turns from calling to leaving
 * -1 Unlimited -2 ​​Until the end of the battle 1 or more: Joining turn
 * [deadCallActor]:1 If the caller is incapacitated, the support actor will leave the battle at the end of the turn. 0 Unspecified
 * 
 * <CallSupportActorId:[id]> Call support actors.
 * [id]:The ID or identification name of the configuration list for the plugin parameter.
 * 
 * The range must be set by the user.
 * 
 * Log
 * 12/8/2024 Ver.1.1.0
 * Fixed by Support Actors 2.0.0 update.
 * 3/29/2022 Ver.1.0.2
 * Fixed some duplication of functions.
 * 3/28/2022 Ver.1.0.1
 * Definition changed due to support actor plugin update.
 * 12/24/2021 Ver.1.0.0
 * First edition.
 * 
 * @param CallSupportActorList
 * @desc A configured list of supporting actors to call.
 * @text Settings List
 * @type struct<CallSupportActorData>[]
 * @default []
 * 
 * @param SupportActorSuccessMessage
 * @text Message when calling support actor
 * @desc Message displayed when support actor is successfully called. %1: User %2: Called actor
 * @type string
 * @default 
 * 
 * @param SupportActorMissMessage
 * @text Message when support actor call fails
 * @desc Message displayed when support actor call fails. %1: User %2: Called actor
 * @type string
 * @default 
 * 
 * @param SupportActorRemoveMessage
 * @text Support actor call Actor disappearance message
 * @desc Message when calling a support actor and the actor is destroyed. %1: Called actor
 * @type string
 * @default 
 * 
 */
/*~struct~CallSupportActorData:
 *
 * @param Name
 * @desc Identification name.
 * @text Identification name
 * @type string
 * @default 
 * 
 * @param CallActors
 * @desc A list to call support actors. If there are multiple, they will be selected randomly.
 * @text Support actor list
 * @type actor[]
 * @default []
 * 
 * @param CallTurn
 * @desc The number of turns from calling to leaving. -1 Unlimited -2 ​​Until the end of the battle 1 or more: Joining turn
 * @text Call Turn
 * @type number
 * @min -2
 * @default 0
 * 
 * @param DeadCallActor
 * @text Leaves at the end of the turn after being unable to fight
 * @desc If the person who called the support actor becomes incapacitated, they will leave the battle at the end of their turn.
 * @type boolean
 * @default false
 * 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc サポートアクター呼び出し
 * @author NUUN
 * @version 1.1.0
 * @base NUUN_SupportActor
 * @orderAfter NUUN_SupportActor
 * 
 * @help
 * サポートアクターを呼び出すスキル、アイテムを設定できます。
 *
 * スキル、アイテムのメモ欄
 * <CallSupportActor:[actorId],[turn],[deadCallActor]> サポートアクターを呼び出します。
 * [actorId]:アクターID
 * [turn]:呼び出してから離脱するまでのターン -1 無制限 -2 戦闘終了まで 1以上:参加ターン
 * [deadCallActor]:1 呼び出し者が戦闘不能になった場合、ターン終了時に戦闘から離脱します。0 指定なし
 * 
 * <CallSupportActorId:[id]> サポートアクターを呼び出します。
 * [id]:プラグインパラメータの設定リストのIDまたは識別名
 * 
 * 範囲は使用者に設定してください。
 * 
 * 更新履歴
 * 2024/12/8 Ver.1.1.0
 * サポートアクター2.0.0更新による修正。
 * 2022/3/29 Ver.1.0.2
 * 一部の関数が重複していたため修正。
 * 2022/3/28 Ver.1.0.1
 * サポートアクター更新により定義変更。
 * 2021/12/25 Ver.1.0.0
 * 初版
 * 
 * @param CallSupportActorList
 * @desc 呼び出すサポートアクターの設定リスト。
 * @text 設定リスト
 * @type struct<CallSupportActorData>[]
 * @default []
 * 
 * @param SupportActorSuccessMessage
 * @text サポートアクター呼び出し時メッセージ
 * @desc サポートアクター呼び出しに成功した時のメッセージ。%1:使用者 %2:呼び出したアクター
 * @type string
 * @default 
 * 
 * @param SupportActorMissMessage
 * @text サポートアクター呼び出し失敗時メッセージ
 * @desc サポートアクター呼び出しに失敗した時のメッセージ。%1:使用者 %2:呼び出したアクター
 * @type string
 * @default 
 * 
 * @param SupportActorRemoveMessage
 * @text サポートアクター呼び出しアクター消滅時メッセージ
 * @desc サポートアクター呼び出しアクター消滅時のメッセージ。%1:呼び出したアクター
 * @type string
 * @default 
 * 
 */
/*~struct~CallSupportActorData:ja
 *
 * @param Name
 * @desc 識別名。
 * @text 識別名
 * @type string
 * @default 
 * 
 * @param CallActors
 * @desc サポートアクターを呼ぶアクターリスト。複数指定の場合はランダムに選択されます。
 * @text サポートアクターリスト
 * @type actor[]
 * @default []
 * 
 * @param CallTurn
 * @desc 呼び出してから離脱するまでのターン。 -1 無制限 -2 戦闘終了まで 1以上:参加ターン
 * @text 呼び出しターン
 * @type number
 * @min -2
 * @default 0
 * 
 * @param DeadCallActor
 * @text 戦闘不能ターン離脱
 * @desc サポートアクターを呼び出し者が戦闘不能になった場合、ターン終了時に戦闘から離脱します。
 * @type boolean
 * @default false
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_CallSupportActor = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;

    const SupportActorSuccessMessage = params.SupportActorSuccessMessage;
    const SupportActorMissMessage = params.SupportActorMissMessage;
    const SupportActorRemoveMessage = params.SupportActorRemoveMessage;

    const _Game_ActionResult_clear = Game_ActionResult.prototype.clear;
    Game_ActionResult.prototype.clear = function() {
        _Game_ActionResult_clear.call(this);
        this.supportActorText = null;
    };

    const _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
    Game_Action.prototype.applyItemUserEffect = function(target) {
        _Game_Action_applyItemUserEffect.call(this, target);   
        if (this.item().meta.CallSupportActor || this.item().meta.CallSupportActorId) {
            this.setCallSupportActor();
        }
    };

    const _Game_Actor_removeSupportActor = Game_Actor.prototype.removeSupportActor;
    Game_Actor.prototype.removeSupportActor = function() {
        if (!this._summonActor) {
            this.result().supportActorText = SupportActorRemoveMessage.format(this.name());
        }
        _Game_Actor_removeSupportActor.call(this);
    };

    Game_Action.prototype.setCallSupportActor = function() {
        let actorsId = 0;
        let callTurn = 0;
        let deadCallActor = 0;
        if (this.item().meta.CallSupportActor) {
            const data = NuunManager.getMetaCodeList(this.item(), "CallSupportActor");
            actorsId = [Number(data[0])];
            callTurn = Number(data[1]);
            deadCallActor = Number(data[2]) ? true : false;
        } else {
            const data = params.CallSupportActorList[_getCallSupportActorData(NuunManager.getMetaCode(this.item(), "CallSupportActorId"))];
            actorsId = data.CallActors || [];
            callTurn = data.CallTurn;
            deadCallActor = data.DeadCallActor;
        }
        const actorId = actorsId[Math.randomInt(actorsId.length)];
        if (!!actorId && actorId > 0) {
            const subject = this.subject();
            const actor = $gameActors.actor(actorId);
            if (!$gameParty.isAddSupportActor() && actor && actor.isBattleMember()) {
                if (SupportActorMissMessage) {
                    subject.result().supportActorText = SupportActorMissMessage.format(subject.name(), actor.name());
                    this.makeSuccess(subject);
                }
                return;
            } else if (!actor) {
                return;
            }
            const turn = BattleManager.isTpb() ? callTurn : callTurn + 1;
            actor.setSupportActorTurn(turn);
            actor.setSupportActorCallActor(subject.actorId());
            actor.setSupportActorDeahCall(deadCallActor);
            if (!actor.getSupportActor()) {
                actor.setSupportActor(true);
            }
            $gameParty.addActor(actor.actorId());
            subject.result().supportActorText = SupportActorSuccessMessage.format(subject.name(), actor.name());
            this.makeSuccess(subject);
        }
    };

    const _Window_BattleLog_displayActionResults = Window_BattleLog.prototype.displayActionResults;
    Window_BattleLog.prototype.displayActionResults = function(subject, target) {
        _Window_BattleLog_displayActionResults.call(this, subject, target);
        if (subject.result().supportActorText) {
            this.push("pushBaseLine");
            this.displayCallSupportActor(subject, target);
        }
    };

    Window_BattleLog.prototype.displayCallSupportActor = function(subject, target) {
        this.push("addText", subject.result().supportActorText);
    };

    function _getCallSupportActorData(id) {
        if (isNaN(id)) {
            return params.CallSupportActorList.findIndex(data => data.Name === id);
        }
        return Number(id) - 1;
    };

})();