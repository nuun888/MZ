/*:-----------------------------------------------------------------------------------
 * NUUN_RangeTransfer.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Location range move
 * @author NUUN
 * @version 1.0.2
 * @base NUUN_EventRange
 * 
 * @help
 * When the location is moved by the event contact judgment expansion, the map is moved according to the coordinates of the destination.
 * Allows you to move more than 2 spaces in one event.
 * To apply range movement when moving the map, turn on the range movement permission switch ID set in the plug-in parameter.
 * 
 * This plug-in is an expansion plug-in of "NUUN_EventRange" (Ver.1.2.0 or later).
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 2/12/2023 Ver.1.0.2
 * Added plugin parameter to initialize switch after move.
 * 11/27/2022 Ver.1.0.1
 * Changed the display in languages other than Japanese to English.
 * 7/14/2022 Ver.1.0.0
 * First edition
 * 
 * @param RangeTransferModeSwitchId
 * @text Range movement permission switch ID
 * @desc Set a switch that allows range movement when you move to an event with expanded event contact judgment.
 * @type switch
 * @default 0
 * 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 場所範囲移動
 * @author NUUN
 * @version 1.0.2
 * @base NUUN_EventRange
 * 
 * @help
 * イベント接触判定拡張にて場所移動を行った際、移動先の座標に応じてマップ移動を行います。
 * 一つのイベントで2マス以上の場所移動を可能にします。
 * マップ移動時の範囲移動を適用するにはプラグインパラメータで設定した範囲移動許可スイッチIDのスイッチをONにしてください。
 * 
 * このプラグインはイベント接触判定拡張(Ver.1.2.0以降)の拡張プラグインです。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/2/12 Ver.1.0.2
 * 移動後にスイッチを初期化するプラグインパラメータを追加。
 * 2022/11/27 Ver.1.0.1
 * 日本語以外での表示を英語表示に変更。
 * 2022/7/14 Ver.1.0.0
 * 初版
 * 
 * @param RangeTransferModeSwitchId
 * @text 範囲移動許可スイッチID
 * @desc イベント接触判定拡張したイベントで場所移動を行ったときに範囲移動を許可するスイッチを設定します。
 * @type switch
 * @default 0
 * 
 * @param EndInitializeSwitchId
 * @text 移動後スイッチ初期化
 * @desc 移動後にスイッチを初期化します。
 * @type boolean
 * @default false
 * 
 */


var Imported = Imported || {};
Imported.NUUN_RangeTransfer = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_RangeTransfer');
    const RangeTransferModeSwitchId = Number(parameters['RangeTransferModeSwitchId'] || 0);
    const EndInitializeSwitchId = eval(parameters['EndInitializeSwitchId'] || "false");

    const _Game_Player_performTransfer = Game_Player.prototype.performTransfer;
    Game_Player.prototype.performTransfer = function() {
        if (this.isTransferring() && $gameSwitches.value(RangeTransferModeSwitchId)) {
            if (this._distanceFromX !== 0) {
                this._newX += this._distanceFromX;
                this._newX = this._newX.clamp(0, $dataMap.width);
            }
            if (this._distanceFromY !== 0) {
                this._newY += this._distanceFromY;
                this._newY = this._newY.clamp(0, $dataMap.height);
            }
        }
        _Game_Player_performTransfer.call(this);
        setEndInitializeSwitchId();
    };

    function setEndInitializeSwitchId() {
        if (EndInitializeSwitchId && RangeTransferModeSwitchId > 0) {
            $gameSwitches.setValue(RangeTransferModeSwitchId, false);
        }
    };

})();