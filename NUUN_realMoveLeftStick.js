/*:-----------------------------------------------------------------------------------
 * NUUN_realMoveLeftStick.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Left stick axis change amount proportional movement
 * @author NUUN
 * @base NUUN_UserKey
 * @orderAfter NUUN_UserKey
 * @version 1.0.1
 * 
 * @help
 * Change the movement speed of the player depending on how hard the left stick of the gamepad is pushed down.
 * This plugin requires "NUUN_UserKey"(Ver.1.2.1 or later).
 * https://github.com/nuun888/MZ/blob/master/README/UserKey.md
 * *Recommended to use with a plug-in that can move in dot units.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 3/8/2023 Ver.1.0.1
 * Fixed an issue where player movement speed changes were not being applied.
 * 3/7/2023 Ver.1.0.0
 * First edition.
 * 
 * @param GamepadLeftStickMaxSpeed
 * @desc Maximum movement speed for left axis movement change.
 * @text Maximum movement speed for left axis movement change
 * @type number
 * @default 5
 * @min 1
 * 
 * @param DashSpeed
 * @desc Movement speed to recognize as dash of left axis movement change at standard speed. (0.0～)
 * @text Left axis movement change dash recognition movement speed
 * @type string
 * @default 4.5
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 左スティック軸変化量比例移動
 * @author NUUN
 * @base NUUN_UserKey
 * @orderAfter NUUN_UserKey
 * @version 1.0.1
 * 
 * @help
 * ゲームパッドの左スティックの倒した強さによりプレイヤーの移動速度を変化させるように変更します。
 * このプラグインはキーボタン割り当てプラグイン(Ver.1.2.1以降)が必要となります。
 * https://github.com/nuun888/MZ/blob/master/README/UserKey.md
 * ※ドット単位で移動できるプラグインとの併用推奨。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/3/8 Ver.1.0.1
 * プレイヤーの移動速度の変更が適用されていなかった問題を修正。
 * 2023/3/7 Ver.1.0.0
 * 初版。
 * 
 * @param GamepadLeftStickMaxSpeed
 * @desc 左軸移動変化の最大移動速度
 * @text 左軸移動変化最大移動速度
 * @type number
 * @default 5
 * @min 1
 * 
 * @param DashSpeed
 * @desc 標準速度時の左軸移動変化のダッシュと認識させる移動速度。(0.0～)
 * @text 左軸移動変化ダッシュ認識移動速度
 * @type string
 * @default 4.5
 * 
 */

var Imported = Imported || {};
Imported.NUUN_realMoveLeftStick = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_realMoveLeftStick');
    const GamepadLeftStickMaxSpeed = Number(parameters['GamepadLeftStickMaxSpeed'] || 5);
    const DashSpeed = Number(parameters['DashSpeed'] || 4.5);

    const _Input_updateGamepadState = Input._updateGamepadState;
    Input._updateGamepadState = function(gamepad) {
        _Input_updateGamepadState.call(this, gamepad);
        this._gamepadStickRealMove();
    };

    Input._gamepadStickRealMove = function() {
        this._stickDashing = !$gameMap.isDashDisabled() && (this._stickMoveing >= (DashSpeed / GamepadLeftStickMaxSpeed) - 0.5);
    };

    Input.gamepadLeftStickMaxDash = function() {
        //無効化
    };

    Input.isStickMoveSpeed = function() {
        return this._stickMoveing;
    };

    Game_Player.prototype.realMoveSpeed = function() {
        return (Input.isStickMoveSpeed() > 0 ? Input.isStickMoveSpeed() * (!$gameMap.isDashDisabled() ? GamepadLeftStickMaxSpeed + (this.moveSpeed() - 4) : this.moveSpeed()) * 2 : Game_CharacterBase.prototype.realMoveSpeed.call(this));
    };

})();