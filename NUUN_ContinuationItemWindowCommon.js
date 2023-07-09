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
 * @version 1.0.0
 * 
 * @help
 * Items that perform common events with use effects, prevent the screen from closing when using skills.
 * Set the common event ID that does not close the screen with the use effect in "Screen continuation common event" of the plug-in parameter. Multiple common events can be set.
 * When a common event not on the list is executed with a use effect, the screen closes normally.
 * 
 * Specification
 * Waiting for event commands is not supported.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
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
 * @version 1.0.0
 * 
 * @help
 * 使用効果でコモンイベントを実行するアイテム、スキルを使用したときに画面を閉じないようにします。
 * プラグインパラメータの画面継続コモンイベントで使用効果で画面を閉じないコモンイベントIDを設定します。コモンイベントは複数設定できます。
 * リストにないコモンイベントが使用効果で実行されたときは、通常通り画面が閉じます。
 * 
 * 仕様
 * イベントコマンドのウエイトは非対応です。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
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

    Game_Action.prototype.applyGlobal = function() {//再定義
        for (const effect of this.item().effects) {
            if (effect.code === Game_Action.EFFECT_COMMON_EVENT) {
                if (isContinuationCommonEvent(effect.dataId)) {
                    this.continuationCommonEvent(effect.dataId);
                } else {
                    $gameTemp.reserveCommonEvent(effect.dataId);
                }
            }
        }
        this.updateLastUsed();
        this.updateLastSubject();
    };

    Game_Action.prototype.continuationCommonEvent = function(commonEventId) {
        const interpreter = new Game_Interpreter();
        const commonEvent = $dataCommonEvents[commonEventId];
        if (commonEvent) {
            interpreter.setup(commonEvent.list);
            interpreter.update();
        }
    };

    function isContinuationCommonEvent(commonEventId) {
        return SceneContinuationCommonEvent.some(id => id === commonEventId);
    }
    
})();