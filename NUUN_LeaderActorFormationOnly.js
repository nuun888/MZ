/*:-----------------------------------------------------------------------------------
 * NUUN_LeaderActorFormationOnly.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Only the leader can be freely replaced
 * @author NUUN
 * @base NUUN_SceneBattleFormation
 * @orderAfter NUUN_SceneBattleFormation
 * @version 1.0.1
 * 
 * @help
 * When rearranging characters using actor commands during battle, the designated character will be able to swap all characters, and all other members will only be able to swap themselves.
 * This plugin is an extension plugin of "NUUN_SceneFormation"(Ver.2.0.1 or later).
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 6/23/2024 Ver.1.0.1
 * Fixed to accommodate leader changes.
 * 8/6/2023 Ver.1.0.0
 * First edition.
 * 
 * @param ChangeLeaderActor
 * @text Leader Actor
 * @desc Specify an actor that can freely organize members. 0 is the leader
 * @type actor
 * @default 0
 * 
 */
/*:
 * @target MZ
 * @plugindesc リーダのみ自由編成可能
 * @author NUUN
 * @base NUUN_SceneBattleFormation
 * @orderAfter NUUN_SceneBattleFormation
 * @version 1.0.1
 * 
 * @help
 * 戦闘中でアクターコマンドから並び替えを行う時に、指定のキャラクターのみ全てのキャラクターを入れ替えを出来るようにし、
 * それ以外のメンバーは自分のみ入れ替えを行えるようにします。
 * このプラグインはメンバー変更画面(Ver.2.0.1以降)の拡張プラグインです。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/6/23 Ver.1.0.1
 * リーダーの変更にも対応できるように修正。
 * 2023/8/6 Ver.1.0.0
 * 初版
 * 
 * 
 * @param ChangeLeaderActor
 * @text リーダーアクター
 * @desc メンバーを自由に編成可能なアクターを指定します。0でリーダー
 * @type actor
 * @default 0
 * 
 */

var Imported = Imported || {};
Imported.NUUN_LeaderActorFormationOnly = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const parameters = PluginManager.parameters('NUUN_LeaderActorFormationOnly');

    const _NuunManager_isBattleFixedActor = NuunManager.isBattleFixedActor;
    NuunManager.isBattleFixedActor = function(actor) {
        if (params.ChangeLeaderActor > 0) {
            return actor.actorId() === params.ChangeLeaderActor;
        } else {
            return _NuunManager_isBattleFixedActor.apply(this, arguments);
        }
    };

    NuunManager.isBattleFixedActorCommand = function() {
        return BattleManager.actor() === Window_StatusBase.prototype.getFormationSelectActor.apply(this, arguments);
    };

    const _Window_StatusBase_getFormationSelectActor = Window_StatusBase.prototype.getFormationSelectActor;
    Window_StatusBase.prototype.getFormationSelectActor = function() {
        return params.ChangeLeaderActor > 0 ? $gameParty.allMembers().find(member => member.actorId() === params.ChangeLeaderActor) : _Window_StatusBase_getFormationSelectActor.apply(this, arguments);
    };

    Window_FormationBattleMember.prototype.isFormationChangeActorEnabled = function(actor, pendingActor) {
        return this.isChangeActorLeader(actor, pendingActor);
    };
    
    Window_FormationMember.prototype.isFormationChangeActorEnabled = function(actor, pendingActor) {
        return this.isChangeActorLeader(actor, pendingActor);
    };

    Window_StatusBase.prototype.isChangeActorLeader = function(actor, pendingActor) {
        if ($gameParty.inBattle() && !!BattleManager.formationCommandActor) {
            const subject = BattleManager.formationCommandActor;
            const leader = this.getFormationSelectActor();
            if (subject === leader) {
                return true;
            } else if (subject === actor || subject === pendingActor) {
                return !actor || !pendingActor;
            } else {
                return false;
            }
        } else {
            return true;
        }
    };

})();