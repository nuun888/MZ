/*:-----------------------------------------------------------------------------------
 * NUUN_BankSystem.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Key button assignment
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * Set keyboard keys and gamepad button assignments.
 * 
 * 
 * Game pad
 * XInput
 * 0:A
 * 1:B
 * 2:X
 * 3:Y
 * 4:LB
 * 5:RB
 * 6:LT
 * 7:RT
 * 8:Back
 * 9:Start
 * 10:Left stick push
 * 11:Right stick push
 * 12:↑
 * 13:↓
 * 14:←
 * 15:→
 * 16:
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * @param UserKey
 * @type struct<UserKeyList>[]
 * @text Key setting
 * @desc Key setting.
 * @default ["{\"UserKey\":\"{\\\"KeyCode\\\":\\\"65\\\",\\\"GamePadCode\\\":\\\"6\\\",\\\"KeyName\\\":\\\"\\\\\\\"pagedown2\\\\\\\"\\\",\\\"KeySprict\\\":\\\"\\\"}\"}","{\"UserKey\":\"{\\\"KeyCode\\\":\\\"83\\\",\\\"GamePadCode\\\":\\\"7\\\",\\\"KeyName\\\":\\\"\\\\\\\"pageup2\\\\\\\"\\\",\\\"KeySprict\\\":\\\"\\\"}\"}","{\"UserKey\":\"{\\\"KeyCode\\\":\\\"-1\\\",\\\"GamePadCode\\\":\\\"10\\\",\\\"KeyName\\\":\\\"\\\\\\\"leftstick\\\\\\\"\\\",\\\"KeySprict\\\":\\\"\\\"}\"}","{\"UserKey\":\"{\\\"KeyCode\\\":\\\"-1\\\",\\\"GamePadCode\\\":\\\"11\\\",\\\"KeyName\\\":\\\"\\\\\\\"rightstick\\\\\\\"\\\",\\\"KeySprict\\\":\\\"\\\"}\"}"]
 * 
 * 
 */
/*~struct~UserKeyList:
 * 
 * @param UserKey
 * @type struct<UserKeyData>
 * @text Key setting
 * @desc Key setting.
 * @default 
 * 
 */
/*~struct~UserKeyData:
 * 
 * @param KeyCode
 * @desc Key code.
 * @text Key code
 * @type number
 * @default -1
 * @min -1
 * 
 * @param GamePadCode
 * @desc Gamepad code.
 * @text Gamepad code
 * @type number
 * @default -1
 * @min -1
 * 
 * @param KeyName
 * @desc Any symbolic name. Enclose the string with ' or ".
 * @text Symbol name
 * @type string
 * @default
 * 
 * @param KeySprict
 * @desc Any script.
 * @text Any script
 * @type combo
 * @default
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc キーボタン割り当て
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * キーボードのキー及び、ゲームパッドのボタン割り当てを設定します。
 * 
 * 
 * ゲームパッド
 * XInput
 * 0:A
 * 1:B
 * 2:X
 * 3:Y
 * 4:LB
 * 5:RB
 * 6:LT
 * 7:RT
 * 8:Back
 * 9:Start
 * 10:左スティック押し
 * 11:右スティック押し
 * 12:↑
 * 13:↓
 * 14:←
 * 15:→
 * 16:
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * @param UserKey
 * @type struct<UserKeyList>[]
 * @text キーの設定
 * @desc キーの設定。
 * @default ["{\"UserKey\":\"{\\\"KeyCode\\\":\\\"65\\\",\\\"GamePadCode\\\":\\\"6\\\",\\\"KeyName\\\":\\\"\\\\\\\"pagedown2\\\\\\\"\\\",\\\"KeySprict\\\":\\\"\\\"}\"}","{\"UserKey\":\"{\\\"KeyCode\\\":\\\"83\\\",\\\"GamePadCode\\\":\\\"7\\\",\\\"KeyName\\\":\\\"\\\\\\\"pageup2\\\\\\\"\\\",\\\"KeySprict\\\":\\\"\\\"}\"}","{\"UserKey\":\"{\\\"KeyCode\\\":\\\"-1\\\",\\\"GamePadCode\\\":\\\"10\\\",\\\"KeyName\\\":\\\"\\\\\\\"leftstick\\\\\\\"\\\",\\\"KeySprict\\\":\\\"\\\"}\"}","{\"UserKey\":\"{\\\"KeyCode\\\":\\\"-1\\\",\\\"GamePadCode\\\":\\\"11\\\",\\\"KeyName\\\":\\\"\\\\\\\"rightstick\\\\\\\"\\\",\\\"KeySprict\\\":\\\"\\\"}\"}"]
 * 
 * 
 */
/*~struct~UserKeyList:ja
 * 
 * @param UserKey
 * @type struct<UserKeyData>
 * @text キー設定
 * @desc キー設定。
 * @default 
 * 
 */
/*~struct~UserKeyData:ja
 * 
 * @param KeyCode
 * @desc キーコード
 * @text キーコード
 * @type number
 * @default -1
 * @min -1
 * 
 * @param GamePadCode
 * @desc ゲームパッドコード
 * @text ゲームパッドコード
 * @type number
 * @default -1
 * @min -1
 * 
 * @param KeyName
 * @desc 任意のシンボル名。文字列を'または"で囲ってください。
 * @text シンボル名
 * @type string
 * @default
 * 
 * @param KeySprict
 * @desc 任意のスクリプト
 * @text 任意スクリプト
 * @type combo
 * @default
 * 
 */

var Imported = Imported || {};
Imported.NUUN_BankSystem = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_UserKey');
    const UserKey = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['UserKey'])) : null) || [];
    
    const keyMapper = Input.keyMapper;
    const gamepadMapper = Input.gamepadMapper;

    for (const data of UserKey) {
        if (data.UserKey) {
            if (data.UserKey.KeyCode >= 0) {
                keyMapper[String(data.UserKey.KeyCode)] = data.UserKey.KeyName;
            }
            if (data.UserKey.GamePadCode >= 0) {
                gamepadMapper[String(data.UserKey.GamePadCode)] = data.UserKey.KeyName;
            }
        }
    }

    const _Window_Selectable_processHandling = Window_Selectable.prototype.processHandling;
    Window_Selectable.prototype.processHandling = function() {
        const result = _Window_Selectable_processHandling.call(this);
        if (result) {
            return result;
        }
        if (this.isOpenAndActive()) {
            for (const data of UserKey) {
                if (data.UserKey && data.UserKey.KeyCode >= 0 || data.UserKey.GamePadCode >= 0) {
                    const keyName = data.UserKey.KeyName;
                    if (this.isHandled(keyName) && Input.isTriggered(keyName)) {
                        return this.processUserKey(keyName);
                    }
                }
            }
        }
    };

    Window_Selectable.prototype.processUserKey = function(name, _eval) {
        this.updateInputData();
        this.deactivate();
        if (!!_eval) {
            eval(_eval);
        } else {
            this.callHandler(name);
        }
    };

    const _Scene_Map_updateScene = Scene_Map.prototype.updateScene;
    Scene_Map.prototype.updateScene = function() {
        _Scene_Map_updateScene.call(this);
        if (!SceneManager.isSceneChanging()) {
            this.updateUserKey();
        }
    };

    Scene_Map.prototype.updateUserKey = function() {
        for (const data of UserKey) {
            if (data.UserKey && !!data.UserKey.KeySprict && data.UserKey.KeyCode >= 0) {
                const keyName = data.UserKey.KeyName;
                if (Input.isTriggered(keyName)) {
                    this._userKeyCalling = true;
                }
                if (this._userKeyCalling && !$gamePlayer.isMoving()) {
                    this.callUserKey(data.UserKey.KeySprict);
                    this._userKeyCalling = false;
                }
            }
        }
    };

    Scene_Map.prototype.callUserKey = function(keySprict) {
        eval(keySprict);
    };
    
})();