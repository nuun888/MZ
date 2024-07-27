/*:-----------------------------------------------------------------------------------
 * NUUN_ContinuationItemWindowCommon.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Item, skill use effect common event execution screen continuation
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.1.0
 * 
 * @help
 * Items that perform common events with use effects, prevent the screen from closing when using skills.
 * Set the common event ID that does not close the screen with the use effect in "Screen continuation common event" of the plug-in parameter. Multiple common events can be set.
 * When a common event not on the list is executed with a use effect, the screen closes normally.
 * 
 * Item Notes
 * <CommonContinuation>: This item will not close the window even if a common event is executed.
 * 
 * Specification
 * Waiting for event commands is not supported.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 7/27/2024 Ver.1.1.0
 * Added a function that allows you to set an item that will not close the menu even when a common event is executed from a specified item.
 * 7/11/2023 Ver.1.0.1
 * Processing fixes.
 * 7/9/2023 Ver.1.0.0
 * First edition.
 * 
 * @param SceneContinuationCommonEvent
 * @desc Specifies the ID of the common event that does not close the screen.
 * @text Screen continuation common event
 * @type common_event[]
 * @default 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc アイテム、スキルの使用効果でコモンイベント実行で画面を閉じない
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.1.0
 * 
 * @help
 * 使用効果でコモンイベントを実行するアイテム、スキルを使用したときに画面を閉じないようにします。
 * プラグインパラメータの画面継続コモンイベントで使用効果で画面を閉じないコモンイベントIDを設定します。コモンイベントは複数設定できます。
 * リストにないコモンイベントが使用効果で実行されたときは、通常通り画面が閉じます。
 * 
 * アイテムのメモ欄
 * <CommonContinuation>:このアイテムはコモンイベントを実行してもウィンドウが閉じなくなります。
 * 
 * 仕様
 * イベントコマンドのウエイトは非対応です。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/7/27 Ver.1.1.0
 * 指定のアイテムから実行したコモンイベントでもメニューを閉じないアイテムを設定できる機能を追加。
 * 2023/7/11 Ver.1.0.1
 * 処理の修正。
 * 2023/7/9 Ver.1.0.0
 * 初版
 * 
 * @param SceneContinuationCommonEvent
 * @desc 画面を閉じないコモンイベントのIDを指定します。
 * @text 画面継続コモンイベント
 * @type common_event[]
 * @default 
 * 
 */

var Imported = Imported || {};
Imported.NUUN_ContinuationItemWindowCommon = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_ContinuationItemWindowCommon');
    const SceneContinuationCommonEvent = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['SceneContinuationCommonEvent'])) : [];

    const _Scene_ItemBase_checkCommonEvent = Scene_ItemBase.prototype.checkCommonEvent;
    Scene_ItemBase.prototype.checkCommonEvent = function() {
        if ($gameTemp.isCommonEventReserved()) {
            $gameTemp._commonEventQueue.forEach((commonEventId, index) => {
                if (this.isContinuationCommonEvent(commonEventId)) {
                    this.continuationCommonEvent(commonEventId, index);
                }
            });
            this._itemInterpreter = null;
        }
        _Scene_ItemBase_checkCommonEvent.call(this);
    };

    Scene_ItemBase.prototype.continuationCommonEvent = function(commonEventId, index) {
        if (!this._itemInterpreter) {
            this._itemInterpreter = new Game_Interpreter();
        }
        $gameTemp._commonEventQueue.splice(index, 1);
        const commonEvent = $dataCommonEvents[commonEventId];
        if (commonEvent) {
            this._itemInterpreter.setup(commonEvent.list);
            this._itemInterpreter.update();
        }
    };

    Scene_ItemBase.prototype.isContinuationCommonEvent = function(commonEventId) {
        const item = this.item();
        return (item && item.meta.CommonContinuation) || SceneContinuationCommonEvent.some(id => id === commonEventId);
    };

})();