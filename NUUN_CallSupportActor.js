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
 * @plugindesc サポートアクター呼び出し
 * @author NUUN
 * @version 1.0.2
 * @base NUUN_SupportActor
 * @orderAfter NUUN_SupportActor
 * 
 * @help
 * サポートアクターを呼び出すスキル、アイテムを設定できます。
 *
 * スキル、アイテムのメモ欄
 * <CallSupportActor:[actorId],[turn],[deadCallActor]> サポートアクターを呼び出します。
 * [actorId]:アクターID
 * [turn]:呼び出してから離脱するまでのターン　-1 無制限　-2 戦闘終了まで 1以上:参加ターン
 * [deadCallActor]:1 呼び出し者が戦闘不能になった場合、ターン終了時に戦闘から離脱します。0 指定なし
 * 
 * 範囲は使用者に設定してください。
 * 
 * 更新履歴
 * 2022/3/29 Ver.1.0.2
 * 一部の関数が重複していたため修正。
 * 2022/3/28 Ver.1.0.1
 * サポートアクター更新により定義変更。
 * 2021/12/25 Ver.1.0.0
 * 初版
 * 
 * @param SupportActorSuccessMessage
 * @text サポートアクター呼び出し時メッセージ
 * @desc サポートアクター呼び出しに成功した時のメッセージ。%1：使用者　%2：呼び出したアクター
 * @default 
 * 
 * @param SupportActorMissMessage
 * @text サポートアクター呼び出し失敗時メッセージ
 * @desc サポートアクター呼び出しに失敗した時のメッセージ。%1：使用者　%2：呼び出したアクター
 * @default 
 * 
 * @param SupportActorRemoveMessage
 * @text サポートアクター呼び出しアクター消滅時メッセージ
 * @desc サポートアクター呼び出しアクター消滅時のメッセージ。%1：呼び出したアクター
 * @default 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_CallSupportActor = true;

(() => {
const parameters = PluginManager.parameters('NUUN_CallSupportActor');
const SupportActorSuccessMessage = String(parameters['SupportActorSuccessMessage'] || '');
const SupportActorMissMessage = String(parameters['SupportActorMissMessage'] || '');
const SupportActorRemoveMessage = String(parameters['SupportActorRemoveMessage'] || '');

const _Game_ActionResult_clear = Game_ActionResult.prototype.clear;
Game_ActionResult.prototype.clear = function() {
  _Game_ActionResult_clear.call(this);
  this.supportActorText = null;
};

const _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    _Game_Action_applyItemUserEffect.call(this, target);   
    if (this.item().meta.CallSupportActor) {
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
    const data = this.item().meta.CallSupportActor.split(',').map(Number);
    if (data[0] > 0) {
        const subject = this.subject();
        const actor = $gameActors.actor(data[0]);
        if (actor && actor.isBattleMember()) {
            if (SupportActorMissMessage) {
                subject.result().supportActorText = SupportActorMissMessage.format(subject.name(), actor.name());
                this.makeSuccess(subject);
            }
            return;
        } else if (!actor) {
            return;
        }
        const turn = BattleManager.isTpb() ? data[1] : data[1] + 1;
        actor.setSupportActorTurn(turn);
        actor.setSupportActorCallActor(subject.actorId());
        actor.setSupportActorDeahCall(data[2]);
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

})();