/*:-----------------------------------------------------------------------------------
 * NUUN_EnemyBookOrderEx.js
 * 
 * Copyright (C) 2024 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Enemy book display order ex
 * @author NUUN
 * @base NUUN_EnemyBook
 * @orderAfter NUUN_EnemyBook
 * @version 1.0.0
 * 
 * @help
 * Extends the display order of the enemy book.
 * Use game variables to change the display order.
 * 
 * If the following tags are not present, the enemy name will be compared.
 * 
 * Enemy notes
 * <EnemyOrder:[name]>
 * [name]:How to read
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 6/16/2024 Ver.1.0.0
 * First edition.
 * 
 * 
 * @param EnemyBookOrderList
 * @desc Set the display order list for the enemy book.
 * @text Enemy book display order list
 * @type struct<EnemyOrderList>[]
 * @default []
 * 
 * @param EnemyBookOrderVar
 * @text Display Number Variable
 * @desc Variable that stores the display number.
 * @default 0
 * @type variable
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc モンスター図鑑表示順拡張
 * @author NUUN
 * @base NUUN_EnemyBook
 * @orderAfter NUUN_EnemyBook
 * @version 1.0.0
 * 
 * @help
 * モンスター図鑑の表示順を拡張します。
 * 表示順の変更はゲーム変数を使用します。
 * 
 * 以下のタグがない場合はモンスター名で比較されます。
 * 漢字がある場合、EnemyOrderで読み方を設定してください。
 * 
 * 敵キャラのメモ欄
 * <EnemyOrder:[name]>
 * [name]:読み方
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/6/16 Ver.1.0.0
 * 初版
 * 
 * 
 * 
 * @param EnemyBookOrderList
 * @desc モンスター図鑑の表示順リストを設定します。
 * @text モンスター図鑑表示順リスト
 * @type struct<EnemyOrderList>[]
 * @default []
 * 
 * @param EnemyBookOrderVar
 * @text 表示番号変数
 * @desc 表示番号を格納する変数。
 * @default 0
 * @type variable
 * 
 * 
 */
/*~struct~EnemyOrderList:ja
 * 
 * @param OrderName
 * @desc 表示順名称。
 * @text 表示順名称
 * @type string
 * @default 
 * 
 * @param OrderParam
 * @desc 表示モード。
 * @text 表示モード
 * @type select
 * @option 番号順
 * @value 'id'
 * @option 名前順
 * @value 'name'
 * @default 
 * 
 * 
 */
/*~struct~EnemyOrderList:
 * 
 * @param OrderName
 * @desc Display order name.
 * @text Display order name
 * @type string
 * @default 
 * 
 * @param OrderParam
 * @desc Display mode.
 * @text Display mode
 * @type select
 * @option Number order
 * @value 'id'
 * @option Name order
 * @value 'name'
 * @default 
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_EnemyBookOrderEx = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    const parameters = PluginManager.parameters('NUUN_EnemyBookOrderEx');

    if (checkClass("Window_EnemyBook_Index")) {
        const _Window_EnemyBook_Index_makeEnemyList = Window_EnemyBook_Index.prototype.makeEnemyList;
        Window_EnemyBook_Index.prototype.makeEnemyList = function() {
            _Window_EnemyBook_Index_makeEnemyList.apply(this, arguments);
            this.nuun_sortList();
        };
    }

    Window_EnemyBook_Index.prototype.nuun_sortList = function() {
        if (this._data && this._data.length > 1) {
            const data = params.EnemyBookOrderList[$gameVariables.value(params.EnemyBookOrderVar)];
            if (data) {
                switch (data.OrderParam) {
                    case "id":
                        return;
                    case "name":
                        this.itemListNameOrder();
                        return;
                    case "nameOrder":
                        this._data.sort();//英語版のみ
                        return;
                    default:
                        return;
                }
            }
        }
    };

    Window_EnemyBook_Index.prototype.itemListNameOrder = function() {
        if (this._data && this._data.length > 1) {
            if ($gameSystem.isJapanese()) {
                this._data.sort(_itemListJaOrder.bind(this));
            } else if ($gameSystem.isChinese()) {
                this._data.sort(_itemListZhOrder.bind(this));
            } else if ($gameSystem.isKorean()) {
                this._data.sort(_itemListKoOrder.bind(this));
            } else {
                this._data.sort(_itemListLocaleOrder.bind(this));
            }
        }
    };

    function _itemListJaOrder(a, b) {
        const a_order = a.meta.EnemyOrder ? a.meta.EnemyOrder : a.name;
        const b_order = b.meta.EnemyOrder ? b.meta.EnemyOrder : b.name;
        return a_order.localeCompare(b_order, 'ja');
    };

    function _itemListZhOrder(a, b) {
        const a_order = a.meta.EnemyOrder ? a.meta.EnemyOrder : a.name;
        const b_order = b.meta.EnemyOrder ? b.meta.EnemyOrder : b.name;
        return a_order.localeCompare(b_order, 'zh');
    };

    function _itemListKoOrder(a, b) {
        const a_order = a.meta.EnemyOrder ? a.meta.EnemyOrder : a.name;
        const b_order = b.meta.EnemyOrder ? b.meta.EnemyOrder : b.name;
        return a_order.localeCompare(b_order, 'ko');
    };

    function _itemListLocaleOrder(a, b) {
        const a_order = a.meta.EnemyOrder ? a.meta.EnemyOrder : a.name;
        const b_order = b.meta.EnemyOrder ? b.meta.EnemyOrder : b.name;
        return a_order.localeCompare(b_order, 'en');
    };

    function _itemListOrder(a, b) {
        if (a[_orderParam] !== b[_orderParam]) {
            return a[_orderParam] - b[_orderParam];
        } else {
            return a.id - b.id;
        }
    };

    function checkClass(className) {
        try {
            return !!window[className];
        } catch (error) {
            return false;
        }
    };
   
   
})();