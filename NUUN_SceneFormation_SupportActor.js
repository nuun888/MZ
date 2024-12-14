/*:-----------------------------------------------------------------------------------
 * NUUN_SceneFormation_SupportActor.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Member change screen (reflects support actors)
 * @author NUUN
 * @version 1.2.0
 * @base NUUN_SceneFormation
 * @base NUUN_SupportActor
 * @orderAfter NUUN_SceneFormation
 * @orderAfter NUUN_ActorFixed
 * 
 * @help
 * The functionality of the support actor (NUUN_SupportActor) will be reflected on the member change screen.
 * This plugin is an extension of the member change screen (NUUN_SceneFormation) and support actor (NUUN_SupportActor).
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 12/15/2024 Ver.1.2.0
 * Fixed by Support Actors 2.0.0 update.
 * 3/30/2022 Ver.1.1.1
 * Fixed by adding processing for member change plugin.
 * 3/30/2022 Ver.1.1.0
 * Member change screen, definition changes due to review of support actor processing.
 * 8/19/2021 Ver.1.0.2
 * Fixed an issue where a team would lose a battle when all battle members were support members.
 * 8/18/2021 Ver.1.0.1
 * Fixed an issue where an error would occur when the number of battle members was less than the maximum number of battle members.
 * 8/17/2021 Ver.1.0.0
 * First edition.
 * 
 * @param SupportActorBackColor
 * @text Support actor background color
 * @desc Background color for supporting actors.
 * @type color
 * @default 5
 * @min -1
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc メンバー変更画面(サポートアクター反映)
 * @author NUUN
 * @version 1.2.0
 * @base NUUN_SceneFormation
 * @base NUUN_SupportActor
 * @orderAfter NUUN_SceneFormation
 * @orderAfter NUUN_ActorFixed
 * 
 * @help
 * メンバー変更画面にサポートアクター（NUUN_SupportActor）の機能を反映できるようにします。
 * このプラグインはメンバー変更画面（NUUN_SceneFormation）及びサポートアクター（NUUN_SupportActor）の拡張機能です。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/12/15 Ver.1.2.0
 * サポートアクター2.0.0更新による修正。
 * 2022/3/30 Ver.1.1.1
 * メンバー変更プラグインの処理追加による修正。
 * 2022/3/30 Ver.1.1.0
 * メンバー変更画面、サポートアクター処理見直しによる定義変更。
 * 2021/8/19 Ver.1.0.2
 * 戦闘メンバーを全てサポートメンバーにしたときに戦闘に敗北してしまう問題を修正。
 * 2021/8/18 Ver.1.0.1
 * 戦闘メンバーが最大戦闘メンバー未満の時にエラーが起きる問題による処理の修正。
 * 2021/8/17 Ver.1.0.0
 * 初版
 * 
 * @param SupportActorBackColor
 * @text サポートアクター背景色
 * @desc サポートアクターの背景色。
 * @type color
 * @default 5
 * @min -1
 * 
 */
var Imported = Imported || {};
Imported.NUUN_SceneFormation_SupportActor = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;

    const _Window_FormationBattleMember_originalMaxBattleMembers = Window_FormationBattleMember.prototype.originalMaxBattleMembers;
    Window_FormationBattleMember.prototype.originalMaxBattleMembers = function() {
        return _Window_FormationBattleMember_originalMaxBattleMembers.apply(this, arguments) + Math.min($gameParty.maxSupportActor(), $gameParty.supportActorWithinMembers().length);
    };

    const _Window_FormationBattleMember_maxCols = Window_FormationBattleMember.prototype.maxCols;
    Window_FormationBattleMember.prototype.maxCols = function() {
        return _Window_FormationBattleMember_maxCols.apply(this, arguments) + Math.ceil(Math.min($gameParty.maxSupportActor(), $gameParty.supportActorMembers().length) / this.getParamBattleMember_Rows());
    };

    Scene_Base.prototype.exFormationMembers = function() {
        return Math.ceil(Math.min($gameParty.maxSupportActor(), $gameParty.supportActorMembers().length) / this.getParamBattleMember_Rows());
    };

    const _Game_Party_checkSwap = Game_Party.prototype.checkSwap;
    Game_Party.prototype.checkSwap = function(index) {
        const actor = this.allMembers()[index];
        return actor && !actor.getSupportActor() && _Game_Party_checkSwap.apply(this, arguments);
    };

    const _Game_Party_changeEntryBattleMember = Game_Party.prototype.changeEntryBattleMember;
    Game_Party.prototype.changeEntryBattleMember = function() {
        $gameTemp.omitSupportMember = true;
        _Game_Party_changeEntryBattleMember.apply(this, arguments);
    };

    const _Window_FormationBattleMember_isChangeActorEnabled = Window_FormationBattleMember.prototype.isChangeActorEnabled;
    Window_FormationBattleMember.prototype.isChangeActorEnabled = function(actor, pendingActor) {
        return this.isChangeSupportActor(actor, pendingActor) && _Window_FormationBattleMember_isChangeActorEnabled.apply(this, arguments);
    };

    Window_FormationBattleMember.prototype.isChangeSupportActor = function(actor, pendingActor) {
        const num = $gameParty.battleMembers().length;
        const index = (this._formation.isPendingMemberMode() ? num : 0) + this.getPendingIndex();
        if (!!pendingActor && pendingActor.getSupportActor()) {
            if (!!actor && !actor.getSupportActor() && index < num) {
                return true;
            } else if (!!actor && !actor.getSupportActor() && this.isMaxSupportActor() || actor && actor.getSupportActor()) {
                return true;
            } else if (!this.actor(this.index()) && this.isMaxSupportActor()) {
                return true;
            }
            return false;
        } else if (!!pendingActor && !pendingActor.getSupportActor()) {
            if (!!actor && !actor.getSupportActor()) {
                return true;
            } else if (!!actor && !actor.getSupportActor() && this.isMaxSupportActor() || actor && actor.getSupportActor()) {
                return true;
            }
            return false;
        }
        return true;
    };

    const _Window_FormationMember_isChangeActorEnabled = Window_FormationMember.prototype.isChangeActorEnabled;
    Window_FormationMember.prototype.isChangeActorEnabled = function(actor, pendingActor) {
        return this.isChangeSupportActor(actor, pendingActor) && _Window_FormationMember_isChangeActorEnabled.apply(this, arguments);
    };

    Window_FormationMember.prototype.isChangeSupportActor = function(actor, pendingActor) {
        if (!!pendingActor && !pendingActor.getSupportActor()) {
            if (!!actor && actor.getSupportActor()) {
                return this.isMaxSupportActor();
            } else if (!actor || !!actor && !actor.getSupportActor()) {
                return true;
            }
            return false;
        }
        return true;
    };

})();