/*:-----------------------------------------------------------------------------------
 * NUUN_UniqueEnemy.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc ユニークモンスター
 * @author NUUN
 * @version 1.0.0
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
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
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
/*~struct~UniqueEnemyList:
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
        _Game_BattlerBase_die.call(this);
        if (this.isEnemy()) {
            $gameSystem.setDefeatUniqueEnemy(this.getUniqueEnemyId())
        }
    };


    Game_Enemy.prototype.setUniqueEnemyId = function(id) {
        this._uniqueEnemyId = id;
    };

    Game_Enemy.prototype.getUniqueEnemyId = function() {
        return this._uniqueEnemyId;
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
            }
        });
    };

    Game_Troop.prototype.setUniqueEnemy = function() {
        return this.members().forEach(enemy => {
            if (enemy.getUniqueEnemyId() >= 0) {
                if (enemy.isDead()) {
                    $gameSystem.setUniqueEnemy(null, enemy.getUniqueEnemyId());
                } else {
                    $gameSystem.setUniqueEnemy(enemy, enemy.getUniqueEnemyId());
                }
            }
        });
    };

    const _BattleManager_endBattle = BattleManager.endBattle;
    BattleManager.endBattle = function(result) {
        _BattleManager_endBattle.call(this, result);
        $gameTroop.setUniqueEnemy();
    };

})();