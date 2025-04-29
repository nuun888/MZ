/*:-----------------------------------------------------------------------------------
 * NUUN_AutoDeadMemberChange.js
 * 
 * Copyright (C) 2025 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Automatic replacement of deceased members
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * When a member becomes incapacitated, they will be automatically replaced.
 * By default, replacements are set when all members are killed, so if you want to replace members every time they are incapacitated, set "Members are replaced every time a death occurs" to true and specify the specified switch ID.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 4/29/2025 Ver.1.0.0
 * First edition.
 * 
 * @param AutoDeadMemberChangeSwitch
 * @desc Switch ID to disable automatic replacement when incapacitated. 0 is always enabled
 * @text Automation rotation disable switch ID
 * @type switch
 * @default 0
 * 
 * @param AutoDeadMemberChangeModeSwitch
 * @desc Whenever a battle incapacity occurs, the battle members are replaced. If false, the battle members are all killed.
 * @text Members are replaced every time a death occurs
 * @type switch
 * @default 0
 * 
 * @param ExcludedActors
 * @desc Enter the evaluation formula for the target to be excluded from the battle members to be replaced. actor: Actor's game data
 * @text Substitution excluded actors
 * @type combo[]
 * @option 'actor.isFixed();//Fixed actor exclusion'
 * @option 'actor.isBattleFixed();//Combat Actors Excluded'
 * @default 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 戦闘不能メンバー自動交代
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * メンバーが戦闘不能になった時に自動でメンバーを交代します。
 * デフォルトでは全滅時に交代になっておりますので戦闘不能毎に交代する場合は、戦闘不能毎に交代に指定のスイッチIDを指定してtureに設定してください。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2025/4/29 Ver.1.0.0
 * 初版
 * 
 * @param AutoDeadMemberChangeSwitch
 * @desc 戦闘不能時の自動化交代が無効化するスイッチID。0で常に有効
 * @text 自動化交代無効化スイッチID
 * @type switch
 * @default 0
 * 
 * @param AutoDeadMemberChangeModeSwitch
 * @desc 戦闘不能が発生した毎に交代します。falseの場合はバトルメンバーが全滅時
 * @text 戦闘不能毎に交代
 * @type switch
 * @default 0
 * 
 * @param ExcludedActors
 * @desc 交代する戦闘メンバーから除外する対象の評価式を記入します。actor:アクターのゲームデータ
 * @text 交代除外アクター
 * @type combo[]
 * @option 'actor.isFixed();//固定アクター除外'
 * @option 'actor.isBattleFixed();//戦闘アクター除外'
 * @default 
 * 
 * 
 */

var Imported = Imported || {};
Imported.NUUN_AutoDeadMemberChange = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    const _BattleManager_checkBattleEnd = BattleManager.checkBattleEnd;
    BattleManager.checkBattleEnd = function() {
        if (this._phase && _isAutoDeadMemberChange()) {
            if (params.AutoDeadMemberChangeModeSwitch > 0 && $gameSwitches.value(params.AutoDeadMemberChangeModeSwitch)) {
                if ($gameParty.notAllDeadMemberChange()) {
                    $gameParty.autoDeadMemberChange();
                }
            } else {
                if ($gameParty.isAllDead() && $gameParty.notAllDeadMemberChange()) {
                    $gameParty.deadMemberChange();
                }
            }
        }
        return _BattleManager_checkBattleEnd.apply(this, arguments);
    };

    Game_Party.prototype.notAllDeadMemberChange = function() {
        return !this.isAllPartyDead();
    };

    Game_Party.prototype.isAllPartyDead = function() {
        return this.allMembers().every(member => member.isDead());
    };

    Game_Party.prototype.isAutoDeadMember = function() {
        return this.deadMembers().length > 0;
    };

    Game_Party.prototype.subAliveMembers = function() {
        return this.allMembers().slice(this.maxBattleMembers()).filter(member => member.isAlive());
    };

    Game_Party.prototype.deadMemberChange = function() {
        const subAliveMembers = $gameParty.subAliveMembers().map(actor => actor.actorId());
        const deadMembers = this.deadMembers().filter(actor => this.isDeadChangeFixed(actor)).map(actor => actor.actorId()).slice(0, subAliveMembers.length);
        if (deadMembers.length === 0) return;
        for (let i = 0; i < deadMembers.length; i++) {
            const actor = this._actors.splice(this._actors.indexOf(subAliveMembers[i]), 1);
            const deadActor = this._actors.splice(this._actors.indexOf(deadMembers[i]), 1);
            this._actors.splice(i, 0, actor[0]);
            this._actors.push(deadActor[0]);
        }
        $gameTemp.requestBattleRefresh();
        $gamePlayer.refresh();
    };

    Game_Party.prototype.autoDeadMemberChange = function() {
        const subAliveMembers = $gameParty.subAliveMembers().map(actor => actor.actorId());
        const deadMembers = this.deadMembers().filter(actor => this.isDeadChangeFixed(actor)).map(actor => actor.actorId()).slice(0, subAliveMembers.length);
        if (deadMembers.length === 0) return;
        for (let i = 0; i < deadMembers.length; i++) {
            const index = this._actors.indexOf(deadMembers[i]);
            if (index >= 0) {
                const deadActor = this._actors.splice(index, 1);
                const actor = this._actors.splice(this._actors.indexOf(subAliveMembers[i]), 1);
                this._actors.splice(index, 0, actor[0]);
                this._actors.push(deadActor[0]);
            }
        }
        $gameTemp.requestBattleRefresh();
        $gamePlayer.refresh();
    };

    Game_Party.prototype.isDeadChangeFixed = function(actor) {
        if (!params.ExcludedActors) return true;
        return !params.ExcludedActors.some(code => eval(code));
    };

    function _isAutoDeadMemberChange() {
        return params.AutoDeadMemberChangeSwitch === 0 || !$gameSwitches.value(params.AutoDeadMemberChangeSwitch);
    }
    
    
})();