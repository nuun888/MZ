/*:-----------------------------------------------------------------------------------
 * NUUN_EnemyBookSpecifiedOrder.js
 * 
 * Copyright (C) 2024 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc モンスター図鑑指定表示順
 * @author NUUN
 * @base NUUN_EnemyBook
 * @orderAfter NUUN_EnemyBook
 * @version 1.0.0
 * 
 * @help
 * モンスター図鑑に特定のモンスターの表示ナンバーを指定するプラグインです。
 * 同一ナンバーを指定することはできません。
 * 
 * <EnemyId:[id]>
 * [id]:表示ナンバー
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/6/16 Ver.1.0.0
 * 初版
 * 
 */

var Imported = Imported || {};
Imported.NUUN_EnemyBookSpecifiedOrder = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    const parameters = PluginManager.parameters('NUUN_EnemyBookSpecifiedOrder');

    const _NuunManager_sortBookIndex = NuunManager.sortBookIndex;
    NuunManager.sortBookIndex = function(list) {
        _NuunManager_sortBookIndex.apply(this, arguments);
        const newList = [];
        list.forEach((enemy, index) => {
            if (enemy.meta.EnemyId && Number(enemy.meta.EnemyId > 0)) {
                if (!!newList[Number(enemy.meta.EnemyId) - 1]) {
                    throw ["DataError", "指定IDが別のモンスターの指定IDと重複しています。 ID" + Number(enemy.meta.EnemyId)];
                }
                newList[Number(enemy.meta.EnemyId) - 1] = enemy;
                list[index] = null;
            }  
        });
        list.forEach(enemy => {
            if (!!enemy) {
                let index = 0;
                while (true) {
                    if (!newList[index]) {
                        newList[index] = enemy;
                        break;
                    }
                    index++;
                }
            }
        });
        return newList;
    };
   
})();