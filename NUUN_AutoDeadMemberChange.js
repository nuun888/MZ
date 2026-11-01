/*:-----------------------------------------------------------------------------------
 * NUUN_AutoDeadMemberChange.js
 * Copyright (C) 2025 NUUN
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Automatic Replacement of Incapacitated Battle Members
 * @author NUUN
 * @version 1.1.0
 * 
 * @help
 * Automatically replaces battle members when they become incapacitated.
 * By default, members are replaced only when all battle members are incapacitated.
 * To replace members each time a battle member becomes incapacitated, specify a switch ID in "Replace Members on Each Incapacitation" and turn the switch ON.
 * 
 * Terms of Use
 * Credit: Optional
 * Commercial use: Possible
 * Modifications: Possible
 * Redistribution: Possible
 * Support is not available for modified versions or downloads from sources other than https://github.com/nuun888/MZ, the official forum, or authorized retailers.
 * 
 * Log
 * 11/1/2026 Ver.1.1.0
 * Changed the specifications so that the plugin can run without NUUN_Base.
 * 4/29/2025 Ver.1.0.0
 * First edition.
 * 
 * @param AutoDeadMemberChangeSwitch
 * @desc Switch ID to disable auto replacement. 0: Always enabled.
 * @text Disable automatic replacement switch ID
 * @type switch
 * @default 0
 * 
 * @param AutoDeadMemberChangeModeSwitch
 * @desc Replaces members on each incapacitation. If false, only when all battle members are incapacitated.
 * @text Replace members on each incapacitation
 * @type switch
 * @default 0
 * 
 * @param ExcludedActors
 * @desc Enter an evaluation formula to exclude actors from replacement. actor: Actor game data.
 * @text Excluded actors
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
 * @version 1.1.0
 * 
 * @help
 * メンバーが戦闘不能になった時に自動でメンバーを交代します。
 * デフォルトでは全滅時に交代になっておりますので戦闘不能毎に交代する場合は、戦闘不能毎に交代に指定のスイッチIDを指定してtureに設定してください。
 * 
 * 利用規約
 * クレジット表記：任意
 * 商業利用：可能
 * 改変：可能
 * 再配布：可能
 * https://github.com/nuun888/MZ、公式フォーラム、正規販売サイト以外からのダウンロード、改変済みの場合はサポートは対象外となります。
 * 
 * 更新履歴
 * 2026/11/1 Ver.1.1.0
 * NUUN_Baseなしで実行できるように仕様を変更。
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
    class Nuun_PluginParams_AutoDeadMemberChange {
        static getPluginParams(text) {//document.currentScript
            try {
                const name = String(Utils.extractFileName(text.src).split('.').shift());
                const params = PluginManager.parameters(name);
                if (params) {
                    const pluginParam = new Nuun_PluginParamData(params);
                    pluginParam.setPluginName(name);
                    return pluginParam.getParameters();
                }
                return {pluginName: name};
            } catch (error) {
                const log = ($gameSystem.isJapanese() ? "コアスクリプトをVer.1.3.2以降に更新してください。" : "Please update the core script to version 1.3.2 or later.");
                throw ["ParameterError", log];
            }
        }
    };

    window.Nuun_PluginParams_AutoDeadMemberChange = Nuun_PluginParams_AutoDeadMemberChange;

    class Nuun_PluginParamData {
        constructor(text) {
            this._parameters = JSON.parse(JSON.stringify(text, this._convertParams)) || {};
        }

        _convertParams(key, code) {
            try {
                return JSON.parse(code);
            } catch (e) {
                if (isNaN(code)) {
                    if (!code) {
                        return null;
                    }
                    try {
                        if (code.indexOf("'") === 0 || code.indexOf('"') === 0) {
                            return eval(code);//'または"を外す。
                        }
                        return !!code ? String(code) : null;
                    } catch (e) {
                        if (typeof {} === "object") {
                            return code;
                        }
                        return !!code ? String(code) : null;
                    }
                } else {
                    return String(code);
                }
            }
        }

        getParameters() {
            return this._parameters;
        }

        setPluginName(name) {
            this._parameters.pluginName = name;
        }


        getMetaTag(object, code) {
            const data = object.meta[code];
            let list = [];
            if (data !== undefined) {
                try {
                    list = data.split(',');
                } catch (error) {
                    return this.getTextCodeMeta(data);
                }
                return list.map(a => this.getTextCodeMeta(a));
            } else {
                return undefined;
            }
        }

        getTextCodeMeta(text) {
            if (isNaN(text)) {
                return text;
            } else {
                return Number(text);
            }
        }
        
    };

    const params = Nuun_PluginParams_AutoDeadMemberChange.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;

    function NuunAutoDeadMemberChangeManager() {
        throw new Error("This is a static class");
    }

    window.NuunAutoDeadMemberChangeManager = NuunAutoDeadMemberChangeManager;

    NuunAutoDeadMemberChangeManager.autoDeadMemberChangeParams = function(code) {
        switch (code) {
            case 0:
                return params.AutoDeadMemberChangeSwitch;
            case 1:
                return params.AutoDeadMemberChangeModeSwitch;
            case 2:
                return params.ExcludedActors;
        }
    };

    NuunAutoDeadMemberChangeManager.isAutoDeadMemberChangeModeSwitch = function() {
        return this.autoDeadMemberChangeParams(1) > 0;
    };

    NuunAutoDeadMemberChangeManager.isAutoDeadMemberChangeSwitch = function() {
        return this.autoDeadMemberChangeParams(0) > 0;
    };

    NuunAutoDeadMemberChangeManager.isAutoDeadMemberChange = function() {
        return !this.isAutoDeadMemberChangeSwitch() || !$gameSwitches.value(this.autoDeadMemberChangeParams(0));
    };

    const _BattleManager_checkBattleEnd = BattleManager.checkBattleEnd;
    BattleManager.checkBattleEnd = function() {
        if (this._phase && NuunAutoDeadMemberChangeManager.isAutoDeadMemberChange()) {
            if (NuunAutoDeadMemberChangeManager.isAutoDeadMemberChangeModeSwitch() && $gameSwitches.value(NuunAutoDeadMemberChangeManager.autoDeadMemberChangeParams(1))) {
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
        const subAliveMembers = this.subAliveMembers().map(actor => actor.actorId());
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
        const subAliveMembers = this.subAliveMembers().map(actor => actor.actorId());
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
        const list = NuunAutoDeadMemberChangeManager.autoDeadMemberChangeParams(2);
        if (!list) return true;
        return !list.some(code => eval(code));
    };
    
})();