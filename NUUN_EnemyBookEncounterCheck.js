/*:-----------------------------------------------------------------------------------
 * NUUN_EnemyBookEncounterCheck.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Monster Encyclopedia Map Encounter Check
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_EnemyBook
 * @orderAfter NUUN_Base
 * @version 1.0.1
 * 
 * @help
 * Get the number of monsters that are not registered in the monster encyclopedia or whose information is not registered on the current map.
 * Returns -1 if there are no encounters on the map.
 * This plug-in is an expansion plug-in for the Monster Encyclopedia (NUUN_EnemyBook).
 * 
 * It is automatically determined from the enemy group of the current map.
 * In addition, if you want to encounter from the event command, you need to set it manually.
 * Enemy group designation can be set with the following tags.
 * 
 * Event notes
 * <EncTroop:[id],[id]...> Enter the Enemy Group ID. 
 * Multiple entries are allowed. 
 * It is used when processing battles with event commands and encountering other than the same as random encounters. If it is the same as a random encounter, it will be automatically determined.
 * [id]:Troop ID
 * 
 * If there is a tag "EncountEnemiesList" in the map enemy encounter list of the Monster Encyclopedia (NUUN_EnemyBook) or in the memo column of the map, that setting will be applied.
 * Priority is "EncountEnemiesList" > "Map Enemies Encounter List" > "Default"
 * 
 * Get variable
 * NuunManager.getNotEncounterEnemies([mode], [commonEventID]);
 * [mode]:
 * 'Enc'    Never encountered
 * 'Status' Nformation not registered
 * [commonEventID]:Common event ID. 0 if not specified
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 6/2/2023 Ver.1.0.1
 * Fixed application of map enemy encounter list settings for "NUUN_EnemyBook".
 * Fixed an issue where the second and subsequent monsters in the enemy group were not being applied.
 * 4/3/2023 Ver.1.0.0
 * First edition.
 * 
 * @command EncounterCheck
 * @desc Gets the total number of unencountered monsters in the current map.
 * @text Total number of unencountered monsters
 * 
 * @arg EncounterCheckVariable
 * @desc Variable
 * @text Variable
 * @type variable
 * @default 0
 * 
 * @arg EncounterCheckCommonEvent
 * @desc Common event
 * @text Common event
 * @type common_event
 * @default 0
 * 
 * @command EncounterStatusCheck
 * @desc Get the total number of unregistered monsters on the current map.
 * @text Total number of unregistered monsters
 * 
 * @arg EncounterCheckVariable
 * @desc Variable
 * @text Variable
 * @type variable
 * @default 0
 * 
 * @arg EncounterCheckCommonEvent
 * @desc Common event
 * @text Common event
 * @type common_event
 * @default 0
 * 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc モンスター図鑑マップ遭遇チェック
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_EnemyBook
 * @orderAfter NUUN_Base
 * @version 1.0.1
 * 
 * @help
 * 現在のマップでモンスター図鑑に登録または、情報登録されていないモンスター数を取得します。
 * マップ上でエンカウントがない場合は-1を返します。
 * このプラグインはモンスター図鑑(NUUN_EnemyBook)の拡張プラグインです。

 * 現在のマップの敵グループから自動で判定されます。
 * なお、イベントコマンドからエンカウントする場合は手動で設定する必要があります。
 * 敵グループの指定は以下のタグで設定できます。
 * 
 * イベントのメモ欄
 * <EncTroop:[id],[id]...> 敵グループIDを記入します。複数入力できます。イベントコマンドで戦闘の処理を行う場合で、ランダムエンカウントと同じ
 * 以外でエンカウントさせる場合に使用します。ランダムエンカウントと同じ場合は自動で判別されます。
 * [id]:敵グループID
 * 
 * モンスター図鑑(NUUN_EnemyBook)のマップ敵エンカウントリストまたは、マップのメモ欄にEncountEnemiesListのタグがある場合は、そのの設定が適用されます。
 * 優先順位は EncountEnemiesList > マップ敵エンカウントリスト > デフォルト
 * 
 * 取得変数
 * NuunManager.getNotEncounterEnemies([mode], [commonEventID]);
 * [mode]:
 * 'Enc'    未遭遇
 * 'Status' 情報未登録
 * [commonEventID]:コモンイベントID 指定しない場合は0
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/6/2 Ver.1.0.1
 * モンスター図鑑プラグインのマップ敵エンカウントリストの設定適用に関する修正。
 * 敵グループの２番目以降の別モンスターが、適用されていなかった問題を修正。
 * 2023/4/3 Ver.1.0.0
 * 初版
 * 
 * @command EncounterCheck
 * @desc 現在のマップの遭遇していないモンスターの総数を取得します。
 * @text 未遭遇モンスター総数
 * 
 * @arg EncounterCheckVariable
 * @desc 変数
 * @text 変数
 * @type variable
 * @default 0
 * 
 * @arg EncounterCheckCommonEvent
 * @desc コモンイベント
 * @text コモンイベント
 * @type common_event
 * @default 0
 * 
 * @command EncounterStatusCheck
 * @desc 現在のマップの情報が未登録のモンスターの総数を取得します。
 * @text 未登録モンスター総数
 * 
 * @arg EncounterCheckVariable
 * @desc 変数
 * @text 変数
 * @type variable
 * @default 0
 * 
 * @arg EncounterCheckCommonEvent
 * @desc コモンイベント
 * @text コモンイベント
 * @type common_event
 * @default 0
 * 
 * 
 */

var Imported = Imported || {};
Imported.NUUN_EnemyBookEncounterCheck = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_EnemyBookEncounterCheck');
    const pluginName = "NUUN_EnemyBookEncounterCheck";

    PluginManager.registerCommand(pluginName, 'EncounterCheck', args => {
        $gameVariables.setValue(Number(args.EncounterCheckVariable), NuunManager.getNotEncounterEnemies('Enc', Number(args.EncounterCheckCommonEvent)));
    });

    PluginManager.registerCommand(pluginName, 'EncounterStatusCheck', args => {
        $gameVariables.setValue(Number(args.EncounterCheckVariable), NuunManager.getNotEncounterEnemies('Status', Number(args.EncounterCheckCommonEvent)));
    });

    NuunManager.getNotEncounterEnemies = function(mode, commonEventId) {
        $gameTemp.reserveCommonEvent(commonEventId);
        if (!$gameMap) {
            return -1;
        }
        try {
            if ($gameMap.data.EncountEnemiesList) {
                const enemyList = $gameMap.data.EncountEnemiesList.split(',').map(Number);
                return this.getNotEncountEnemy(enemyList);
            } else if(NuunManager.isMapEncountEnemList() && MapEncountEnemiesList[$gameMap.mapId()]) {
                const enemyList = NuunManager.getMapEncountEnemList()[$gameMap.mapId()].Enemy;
                return this.getNotEncountEnemy(enemyList);
            }
        } catch (error) {
            
        }
        const troopList = $gameMap.encounterTroopList();
        if (troopList.length < 1) {
            return -1;
        }
        if (mode === 'Enc') {
            return this.getNotEncounterEnemyList(troopList).length;
        } else if (mode === 'status') {
            return this.getNotStatusEnemyList(troopList).length;
        }
    };

    NuunManager.getNotEncounterEnemyList = function(troopList) {
        return troopList.reduce((r, id) => {
            const troop = $dataTroops[id];
            for (const enemy of troop.members) {
                const enemyData = $dataEnemies[enemy.enemyId];
                if ($gameSystem.isEnemyBook(enemyData) && !$gameSystem.isInEnemyBook(enemyData) && !r.includes(enemyData.id)) {
                    r.push(enemyData.id);
                }
            }
            return r;
        }, []);
    };

    NuunManager.getNotStatusEnemyList = function(troopList) {
        return troopList.reduce((r, id) => {
            const troop = $dataTroops[id];
            for (const enemy of troop.members) {
                const enemyData = $dataEnemies[enemy.enemyId];
                if ($gameSystem.isEnemyBook(enemyData) && !$gameSystem.isInEnemyBookStatus(enemyData) && !r.includes(enemyData.id)) {
                    r.push(enemyData.id);
                }
            }
            return r;
        }, []);
    };

    NuunManager.getNotEncounterEnemyList2 = function(list) {
        return list.reduce((r, enemy) => {
            const enemyData = $dataEnemies[enemy];
            if ($gameSystem.isEnemyBook(enemyData) && !$gameSystem.isInEnemyBook(enemyData)) {
                r.push(enemyData.id);
            }
            return r;
        }, []);
    };

    NuunManager.getNotStatusEnemyList2 = function(list) {
        return list.reduce((r, enemy) => {
            const enemyData = $dataEnemies[enemy];
            if ($gameSystem.isEnemyBook(enemyData) && !$gameSystem.isInEnemyBookStatus(enemyData)) {
                r.push(enemyData.id);
            }
            return r;
        }, []);
    };

    NuunManager.getNotEncountEnemy = function(list) {
        if (mode === 'Enc') {
            return this.getNotEncounterEnemyList2(list).length;
        } else if (mode === 'status') {
            return this.getNotStatusEnemyList2(list).length;
        }
    };

    NuunManager.getEncounterEnemyList = function() {
        const troopList = $gameMap.encounterTroopList();
        if (troopList.length < 1) {
            return [];
        }
        return troopList.reduce((r, id) => {
            const troop = $dataTroops[id];
            for (const enemy of troop.members) {
                const enemyData = $dataEnemies[enemy.enemyId];
                if (enemyData && !r.includes(enemyData.id)) {
                    r.push(enemyData.id);
                }
            }
            return r;
        }, []);
    };

    Game_Map.prototype.encounterTroopList = function() {
        const troopList = $gameMap.encounterList().map(troop => troop.troopId).concat(this.encounterEventTroopList());
        return troopList.reduce((r, id) => {
            if (!r.includes(id)) {
                r.push(id);
            }
            return r;
        }, []);
    };

    Game_Map.prototype.encounterEventTroopList = function() {
        const encList = this.events().filter(event => event.event().meta.EncTroop).map(event => event.event().meta.EncTroop);
        return encList.reduce((r, troop) => {
            const list = troop.split(',').map(Number);
            for (const id of list) {
                r.push(id);
            }
            return r;
        }, []);
    };

})();