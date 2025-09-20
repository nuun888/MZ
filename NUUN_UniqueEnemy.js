/*:-----------------------------------------------------------------------------------
 * NUUN_UniqueEnemy.js
 * 
 * Copyright (C) 2022 NUUN
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Unique Enemy
 * @author NUUN
 * @version 1.0.2
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
 * Adult content: Possible
 * Modifications: Possible
 * Redistribution: Possible
 * Support is not available for modified versions or downloads from sources other than https://github.com/nuun888/MZ, the official forum, or authorized retailers.
 * 
 * Log
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
 */
/*~struct~UniqueEnemyList:
 * 
 * @param EnemyId
 * @text Enemy
 * @desc Specifies a enemy.
 * @type enemy
 * 
 * @param DefeatSwitch
 * @text Defeated determination switch ID
 * @desc Switch ID to determine after defeating.
 * @type switch
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc ユニークモンスター
 * @author NUUN
 * @version 1.0.2
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
 * 成人向け：可能
 * 改変：可能
 * 再配布：可能
 * https://github.com/nuun888/MZ、公式フォーラム、正規販売サイト以外からのダウンロード、改変済みの場合はサポートは対象外となります。
 * 
 * 更新履歴
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
 */
/*~struct~UniqueEnemyList:ja
 * 
 * @param EnemyId
 * @text モンスター
 * @desc モンスターを指定します。
 * @type enemy
 * 
 * @param DefeatSwitch
 * @text 撃破済み判定用スイッチID
 * @desc 撃破後と判定するスイッチID。
 * @type switch
 * 
 */

var Imported = Imported || {};
Imported.NUUN_UniqueEnemy = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_UniqueEnemy');
    const UniqueEnemy= (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['UniqueEnemy'])) : null) || [];

    function getUniqueEnemyData(enemy) {
        return UniqueEnemy.findIndex(data => data.EnemyId === enemy.enemyId());
    }
    
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
        $gameSwitches.setValue(UniqueEnemy[id].DefeatSwitch, true);
    };


    const _Game_BattlerBase_die = Game_BattlerBase.prototype.die;
    Game_BattlerBase.prototype.die = function() {
        if (this.isEnemy() && this.getUniqueEnemyId() >= 0) {
            $gameSystem.setDefeatUniqueEnemy(this.getUniqueEnemyId())
        }
        _Game_BattlerBase_die.call(this);
    };

    const _Game_Battler_escape = Game_Battler.prototype.escape;
    Game_Battler.prototype.escape = function() {
        if (this.isEnemy() && this.getUniqueEnemyId() >= 0) {
            this.uniqueEnemyState();
        }
        _Game_Battler_escape.call(this);
    };

    const _Game_Enemy_initMembers = Game_Enemy.prototype.initMembers;
    Game_Enemy.prototype.initMembers = function() {
        _Game_Enemy_initMembers.call(this);
        this.uniqueEnemyStates = null;
        this.uniqueEnemyStateTurns = null;
        this.uniqueEnemyBuffs = null;
        this.uniqueEnemyBuffTurns = null;
    };

    Game_Enemy.prototype.uniqueEnemyState = function() {
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
        _Game_Battler_onBattleEnd.call(this);
    };


    const _Game_Troop_setup = Game_Troop.prototype.setup;
    Game_Troop.prototype.setup = function(troopId) {
        _Game_Troop_setup.call(this, troopId);
        this.setBattleUniqueEnemy();
    };

    Game_Troop.prototype.setBattleUniqueEnemy = function() {
        const troop = this.members();
        troop.forEach((enemy, i)=> {
            enemy.setUniqueEnemyId(getUniqueEnemyData(enemy));
            const uniqueEnemy = $gameSystem.getUniqueEnemy(enemy.getUniqueEnemyId());
            if (uniqueEnemy && enemy.getUniqueEnemyId() >= 0) {
                troop[i] = uniqueEnemy;
                troop[i].setUniqueEnemyStates();
            }
        });
    };

})();