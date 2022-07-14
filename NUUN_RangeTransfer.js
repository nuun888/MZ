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
 * @plugindesc 場所範囲移動
 * @author NUUN
 * @version 1.0.0
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
 * 2022/7/14 Ver.1.0.0
 * 初版
 * 
 * @param RangeTransferModeSwitchId
 * @text 範囲移動許可スイッチID
 * @desc イベント接触判定拡張したイベントで場所移動を行ったときに範囲移動を許可するスイッチを設定します。
 * @type switch
 * @default 0
 * 
 * 
 */


var Imported = Imported || {};
Imported.NUUN_RangeTransfer = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_RangeTransfer');
    const RangeTransferModeSwitchId = Number(parameters['RangeTransferModeSwitchId'] || 0);

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
    };

})();