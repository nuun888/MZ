/*:-----------------------------------------------------------------------------------
 * NUUN_UniqueEnemy.js
 * Copyright (C) 2022 NUUN
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Unique Enemy
 * @author NUUN
 * @version 1.1.0
 * 
 * @help
 * You can set a monster whose status will be maintained until it is defeated even after the battle ends.
 * If you fight the same monster again even if the battle ends halfway due to escape, etc., you will start with the status at the end of the battle.
 * 
 * Specification
 * If the same unique monster exists at the end of the battle, the stats of the enemy member's last monster will be saved.
 * If the same unique monster appears at the start of battle, the saved unique monster status will be applied to all.
 * If defeated, the status will be reset.
 * 
 * Terms of Use
 * Credit: Optional
 * Commercial use: Possible
 * Modifications: Possible
 * Redistribution: Possible
 * Support is not available for modified versions or downloads from sources other than https://github.com/nuun888/MZ, the official forum, or authorized retailers.
 * 
 * Log
 * 11/8/2026 Ver.1.1.0
 * Added a feature to reset states and buffs when rematching.
 * Changed the defeated switch trigger from when HP reaches 0 to when the enemy collapses.
 * 11/12/2022 Ver.1.0.2
 * Changed the display in languages other than Japanese to English.
 * 6/5/2022 Ver.1.0.1
 * Fixed an issue where states and buffs were not carried over when rematching.
 * Fixed an issue where an error would occur when defeating non-unique monsters.
 * 6/4/2022 Ver.1.0.0
 * first edition.
 * 
 * @param UniqueEnemy
 * @text Unique Enemy
 * @desc Set unique enemies.
 * @default []
 * @type struct<UniqueEnemyList>[]
 * 
 * @param ResetStatesAndBuffsOnRematch
 * @text Reset States and Buffs on Rematch
 * @desc Resets states and buffs when rematching a unique enemy.
 * @type boolean
 * @default false
 * 
 */
/*~struct~UniqueEnemyList:
 * 
 * @param EnemyId
 * @text Enemy
 * @desc Specifies a enemy.
 * @type enemy
 * @default 0
 * 
 * @param DefeatSwitch
 * @text Defeated determination switch ID
 * @desc Switch ID to determine after defeating.
 * @type switch
 * @default 0
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc ユニークモンスター
 * @author NUUN
 * @version 1.1.0
 * 
 * @help
 * 戦闘終了しても倒すまでステータスが維持するモンスターを設定できます。
 * 逃走等で戦闘が途中終了しても再度同じモンスターと戦闘した場合、戦闘終了時のステータスで開始されます。
 * 
 * 仕様
 * 同じユニークモンスターが戦闘終了時にいた場合は敵メンバーの最後のモンスターのステータスが保存されます。
 * 戦闘開始時に同じユニークモンスターが出現した場合は、全てに保存されたユニークモンスターのステータスが適用されます。
 * 撃破した場合はステータスがリセットされます。
 * 
 * 利用規約
 * クレジット表記：任意
 * 商業利用：可能
 * 改変：可能
 * 再配布：可能
 * https://github.com/nuun888/MZ、公式フォーラム、正規販売サイト以外からのダウンロード、改変済みの場合はサポートは対象外となります。
 * 
 * 更新履歴
 * 2026/11/8 Ver.1.1.0
 * 再戦闘時にステート、バフをリセットする機能を追加。
 * 戦闘不能時の撃破済みスイッチの処理方法をHP0時から戦闘不能時に変更。
 * 2022/11/12 Ver.1.0.2
 * 日本語以外での表示を英語表示に変更。
 * 2022/6/5 Ver.1.0.1
 * 再戦時にステート、バフが引き継がれない問題を修正。
 * ユニークモンスターではないモンスターを倒すとエラーが出る問題を修正。
 * 2022/6/4 Ver.1.0.0
 * 初版
 * 
 * @param UniqueEnemy
 * @text ユニークモンスター
 * @desc ユニークモンスターの設定を行います。
 * @default []
 * @type struct<UniqueEnemyList>[]
 * 
 * @param ResetStatesAndBuffsOnRematch
 * @desc 再戦闘時にステート、バフをリセットします。
 * @text 再戦闘時ステート、バフリセット
 * @type boolean
 * @default false
 * 
 */
/*~struct~UniqueEnemyList:ja
 * 
 * @param EnemyId
 * @text モンスター
 * @desc モンスターを指定します。
 * @type enemy
 * @default 0
 * 
 * @param DefeatSwitch
 * @text 撃破済み判定用スイッチID
 * @desc 撃破後と判定するスイッチID。
 * @type switch
 * @default 0
 * 
 */

var Imported = Imported || {};
Imported.NUUN_UniqueEnemy = true;

(() => {
    class Nuun_PluginParams_UniqueEnemy {
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

    window.Nuun_PluginParams_UniqueEnemy = Nuun_PluginParams_UniqueEnemy;

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

    const params = Nuun_PluginParams_UniqueEnemy.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;

    function NuunUniqueEnemyManager() {
        throw new Error("This is a static class");
    }

    window.NuunUniqueEnemyManager = NuunUniqueEnemyManager;


    NuunUniqueEnemyManager.uniqueEnemyParams = function(code) {
        switch (code) {
            case 0:
                return params.UniqueEnemy || [];
            case 1:
                return params.ResetStatesAndBuffsOnRematch;
        }
    };

    NuunUniqueEnemyManager.getUniqueEnemyData = function(enemy) {
        return this.uniqueEnemyParams(0).findIndex(data => data.EnemyId === enemy.enemyId());
    };

    NuunUniqueEnemyManager.isResetStatesAndBuffsOnRematch = function() {
        return !!this.uniqueEnemyParams(1);
    };

    Game_System.prototype.setUniqueEnemy = function(enemy, id) {
        this.initUniqueEnemy();
        this._uniqueEnemy[id] = enemy;
    };

    Game_System.prototype.getUniqueEnemy = function(id) {
        this.initUniqueEnemy();
        return this._uniqueEnemy[id];
    };

    Game_System.prototype.initUniqueEnemy = function() {
        if (!this._uniqueEnemy) {
            this._uniqueEnemy = [];
        }
    };

    Game_System.prototype.setDefeatUniqueEnemy = function(id) {
        $gameSwitches.setValue(NuunUniqueEnemyManager.uniqueEnemyParams(0)[id].DefeatSwitch, true);
    };

    const _Game_Enemy_performCollapse = Game_Enemy.prototype.performCollapse;
    Game_Enemy.prototype.performCollapse = function() {
        _Game_Enemy_performCollapse.apply(this, arguments);
        if (this.isEnemy() && this.getUniqueEnemyId() >= 0) {
            $gameSystem.setDefeatUniqueEnemy(this.getUniqueEnemyId())
        }
    };

    const _Game_Battler_escape = Game_Battler.prototype.escape;
    Game_Battler.prototype.escape = function() {
        if (this.isEnemy() && this.getUniqueEnemyId() >= 0) {
            this.uniqueEnemyState();
        }
        _Game_Battler_escape.apply(this, arguments);
    };

    const _Game_Enemy_initMembers = Game_Enemy.prototype.initMembers;
    Game_Enemy.prototype.initMembers = function() {
        _Game_Enemy_initMembers.call(this);
        this.initUniqueEnemyState();
    };

    Game_Enemy.prototype.initUniqueEnemyState = function() {
        this.uniqueEnemyStates = null;
        this.uniqueEnemyStateTurns = null;
        this.uniqueEnemyBuffs = null;
        this.uniqueEnemyBuffTurns = null;
    };

    Game_Enemy.prototype.uniqueEnemyState = function() {
        if (NuunUniqueEnemyManager.isResetStatesAndBuffsOnRematch()) return;
        if (!this.uniqueEnemyStates) {
            this.uniqueEnemyStates = [];
            this.uniqueEnemyStateTurns = {};
            this._states.forEach(state => {
                this.uniqueEnemyStates.push(state);
                this.uniqueEnemyStateTurns[state] = this._stateTurns[state];
            });
        }
        if (!this.uniqueEnemyBuffs) {
            this.uniqueEnemyBuffs = [];
            this.uniqueEnemyBuffTurns = [];
            this._buffs.forEach((id, i) => {
                this.uniqueEnemyBuffs[i] = id;
                this.uniqueEnemyBuffTurns[i] = this._buffTurns[i];
            });
        }
    };

    Game_Enemy.prototype.setUniqueEnemyId = function(id) {
        this._uniqueEnemyId = id;
    };

    Game_Enemy.prototype.getUniqueEnemyId = function() {
        return this._uniqueEnemyId;
    };

    Game_Enemy.prototype.setUniqueEnemyStates = function() {
        if (NuunUniqueEnemyManager.isResetStatesAndBuffsOnRematch()) {
            this.clearStates();
            this.clearBuffs();
            this.initUniqueEnemyState();
            return;
        }
        if (this.uniqueEnemyStates) {
            this._states = this.uniqueEnemyStates;
            this._stateTurns = this.uniqueEnemyStateTurns;
            this.uniqueEnemyStates = null;
            this.uniqueEnemyStateTurns = null;
        }
        if (this.uniqueEnemyBuffs) {
            this._buffs = this.uniqueEnemyBuffs;
            this._buffTurns = this.uniqueEnemyBuffTurns;
            this.uniqueEnemyBuffs = null;
            this.uniqueEnemyBuffTurns = null;
        }
    };

    Game_Enemy.prototype.setBattleUniqueEnemy = function() {
        if (this.getUniqueEnemyId() >= 0) {
            if (this.isDead()) {
                $gameSystem.setUniqueEnemy(null, this.getUniqueEnemyId());
            } else {
                $gameSystem.setUniqueEnemy(this, this.getUniqueEnemyId());
            }
        }
    };

    const _Game_Battler_onBattleEnd = Game_Battler.prototype.onBattleEnd;
    Game_Battler.prototype.onBattleEnd = function() {
        if (this.isEnemy() && this.getUniqueEnemyId() >= 0) {
            this.uniqueEnemyState();
            this.setBattleUniqueEnemy();
        }
        _Game_Battler_onBattleEnd.apply(this, arguments);
    };


    const _Game_Troop_setup = Game_Troop.prototype.setup;
    Game_Troop.prototype.setup = function(troopId) {
        _Game_Troop_setup.apply(this, arguments);
        this.setBattleUniqueEnemy();
    };

    Game_Troop.prototype.setBattleUniqueEnemy = function() {
        const troop = this.members();
        troop.forEach((enemy, i)=> {
            enemy.setUniqueEnemyId(NuunUniqueEnemyManager.getUniqueEnemyData(enemy));
            const uniqueEnemy = $gameSystem.getUniqueEnemy(enemy.getUniqueEnemyId());
            if (uniqueEnemy && enemy.getUniqueEnemyId() >= 0) {
                troop[i] = uniqueEnemy;
                troop[i].setUniqueEnemyStates();
                //座標を再調整
                uniqueEnemy._screenX = enemy.screenX();
                uniqueEnemy._screenY = enemy.screenY();
            }
        });
    };
    

})();