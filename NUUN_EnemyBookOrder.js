/*:-----------------------------------------------------------------------------------
 * NUUN_EnemyBookOrder.js
 * 
 * Copyright (C) 2024 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Enemy book display order change
 * @author NUUN
 * @base NUUN_EnemyBook
 * @orderAfter NUUN_EnemyBook
 * @version 1.0.0
 * 
 * @help
 * Change the display order of the item and skill lists.
 * 
 * Enemy notes
 * <EnemyIdOrder:[id]>
 * [id]: Display number
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 6/16/2024 Ver.1.0.0
 * First edition.
 * 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc モンスター図鑑表示順変更
 * @author NUUN
 * @base NUUN_EnemyBook
 * @orderAfter NUUN_EnemyBook
 * @version 1.0.0
 * 
 * @help
 * モンスター図鑑の表示順を任意の順番で表示させます。
 * 図鑑ナンバーにも影響します。
 *  
 * 敵キャラのメモ欄
 * <EnemyIdOrder:[id]>
 * [id]:表示ナンバー
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/6/16 Ver.1.0.0
 * 初版
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_EnemyBookOrder = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    const parameters = PluginManager.parameters('NUUN_EnemyBookOrder');

    const _NuunManager_sortBookIndex = NuunManager.sortBookIndex;
    NuunManager.sortBookIndex = function(list) {
        list = _NuunManager_sortBookIndex.apply(this, arguments);
        list.sort(_orderBookIndex.bind(this));
        return list;
    };
    
    _orderBookIndex = function(a, b) {
        const a_order = a.meta.EnemyIdOrder ? Number(a.meta.EnemyIdOrder) : 0;
        const b_order = b.meta.EnemyIdOrder ? Number(b.meta.EnemyIdOrder) : 0;
        if (a_order !== b_order) {
            return a_order - b_order;
        } else {
            return a.id - b.id;
        }
    };

   
})();