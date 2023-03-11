/*:-----------------------------------------------------------------------------------
 * NUUN_UserKey.js
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
 * @version 1.2.3
 * 
 * @help
 * You can change keyboard keys and gamepad button assignments or set new ones.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * The button layout of the gamepad is based on the Xbox360 controller.
 * If the keyboard or gamepad code is set to -1, the original value is set.
 * 
 * Log
 * 3/12/2023 Ver.1.2.3
 * Added a function that can specify common events for key button triggers on the scene.
 * 3/11/2023 Ver.1.2.2
 * Added definition by updating “NUUN_realMoveLeftStick”.
 * 3/7/2023 Ver.1.2.1
 * Modified the definition by supporting the left stick axis change amount proportional movement plug-in.
 * 3/7/2023 Ver.1.2.0
 * Added the ability to dash when the left stick is pushed all the way down.
 * 3/6/2023 Ver.1.1.1
 * Fixed an issue where the gamepad code was not recognized in the scene key and button settings.
 * 3/5/2023 Ver.1.1.0
 * Compatible with right stick.
 * 3/4/2023 Ver.1.0.1
 * Added repeat feature.
 * Fixed so that the set keys and buttons work even in battle.
 * 2/28/2023 Ver.1.0.0
 * First edition.
 * 
 * @param UserKey
 * @type struct<UserKeyList>[]
 * @text Key setting
 * @desc Key setting.
 * @default ["{\"UserKey\":\"{\\\"KeyCode\\\":\\\"65\\\",\\\"GamePadCode\\\":\\\"6\\\",\\\"KeyName\\\":\\\"\\\\\\\"pagedown2\\\\\\\"\\\",\\\"Repeated\\\":\\\"true\\\",\\\"KeySprict\\\":\\\"\\\",\\\"MapValid\\\":\\\"true\\\",\\\"BattleValid\\\":\\\"false\\\"}\"}","{\"UserKey\":\"{\\\"KeyCode\\\":\\\"83\\\",\\\"GamePadCode\\\":\\\"7\\\",\\\"KeyName\\\":\\\"\\\\\\\"pageup2\\\\\\\"\\\",\\\"Repeated\\\":\\\"true\\\",\\\"KeySprict\\\":\\\"\\\",\\\"MapValid\\\":\\\"true\\\",\\\"BattleValid\\\":\\\"false\\\"}\"}","{\"UserKey\":\"{\\\"KeyCode\\\":\\\"-1\\\",\\\"GamePadCode\\\":\\\"10\\\",\\\"KeyName\\\":\\\"\\\\\\\"leftstick\\\\\\\"\\\",\\\"Repeated\\\":\\\"false\\\",\\\"KeySprict\\\":\\\"\\\",\\\"MapValid\\\":\\\"true\\\",\\\"BattleValid\\\":\\\"false\\\"}\"}","{\"UserKey\":\"{\\\"KeyCode\\\":\\\"-1\\\",\\\"GamePadCode\\\":\\\"11\\\",\\\"KeyName\\\":\\\"\\\\\\\"rightstick\\\\\\\"\\\",\\\"Repeated\\\":\\\"false\\\",\\\"KeySprict\\\":\\\"\\\",\\\"MapValid\\\":\\\"true\\\",\\\"BattleValid\\\":\\\"false\\\"}\"}"]
 * 
 * @param GamepadSetting
 * @text Gamepad settings
 * @default ------------------------------
 * 
 * @param GamepadLeftStickMaxDash
 * @desc Push the left stick to the maximum axis to dash.
 * @text Left axis maximum dash
 * @type boolean
 * @default true
 * @parent GamepadSetting
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
 * @type select
 * @option None
 * @value -1
 * @option A(Down button)
 * @value 0
 * @option B(Right button)
 * @value 1
 * @option X(Left button)
 * @value 2
 * @option Y(Up button)
 * @value 3
 * @option LB
 * @value 4
 * @option RB
 * @value 5
 * @option LT
 * @value 6
 * @option RT
 * @value 7
 * @option Back
 * @value 8
 * @option Start
 * @value 9
 * @option Left stick push
 * @value 10
 * @option Right stick push
 * @value 11
 * @option Left stick ↑
 * @value 12
 * @option Left stick ↓
 * @value 13
 * @option Left stick ←
 * @value 14
 * @option Left stick →
 * @value 15
 * @option 
 * @value 16
 * @option Right stick ↑
 * @value 21
 * @option Right stick ↓
 * @value 22
 * @option Right stick ←
 * @value 23
 * @option Right stick →
 * @value 24
 * @default -1
 * @min -1
 * 
 * @param KeyName
 * @desc Any symbolic name. Enclose the string with ' or ".
 * @text Symbol name
 * @type string
 * @default
 * 
 * @param Repeated
 * @desc Repeat enabled.
 * @text Repeat enabled
 * @type boolean
 * @default false
 * 
 * @param SceneKeyAndButtonSetting
 * @text On-scene key and button setting
 * @default ------------------------------
 * 
 * @param KeySprict
 * @desc Any script.(not valid from handler)
 * @text Any script
 * @type combo
 * @default
 * @parent SceneKeyAndButtonSetting
 * 
 * @param KeyCommonEvent
 * @desc Any common event.
 * @text Any common event
 * @type common_event
 * @default 0
 * @parent SceneKeyAndButtonSetting
 * 
 * @param MapValid
 * @desc Valid on the map.
 * @text Map Valid
 * @type boolean
 * @default true
 * @parent SceneKeyAndButtonSetting
 * 
 * @param BattleValid
 * @desc Valid in battle.
 * @text Battle valid
 * @type boolean
 * @default false
 * @parent SceneKeyAndButtonSetting
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc キーボタン割り当て
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.2.3
 * 
 * @help
 * キーボードのキー及び、ゲームパッドのボタン割り当てを変更したり新規に設定したり出来ます。
 * ゲームパッドのボタン配置はXbox360コントローラ基準になっております。
 * キーボード、ゲームパッドのコードが-1に設定されている場合は元の値が設定されます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/3/12 Ver.1.2.3
 * シーン上でのキーボタントリガーにコモンイベントを指定できる機能を追加。
 * 2023/3/11 Ver.1.2.2
 * 左スティック軸変化量比例移動更新による定義追加。
 * 2023/3/7 Ver.1.2.1
 * 左スティック軸変化量比例移動プラグイン対応による定義修正。
 * 2023/3/7 Ver.1.2.0
 * 左スティックを最大に倒すとダッシュする機能を追加。
 * 2023/3/6 Ver.1.1.1
 * シーン上キー、ボタン設定でゲームパッドコードが認識しない問題を修正。
 * 2023/3/5 Ver.1.1.0
 * 右スティックに対応。
 * 2023/3/4 Ver.1.0.1
 * リピート機能を追加。
 * 戦闘中でも設定したキー、ボタンが動作するように修正。
 * 2023/2/28 Ver.1.0.0
 * 初版
 * 
 * @param UserKey
 * @type struct<UserKeyList>[]
 * @text キーの設定
 * @desc キーの設定。
 * @default ["{\"UserKey\":\"{\\\"KeyCode\\\":\\\"65\\\",\\\"GamePadCode\\\":\\\"6\\\",\\\"KeyName\\\":\\\"\\\\\\\"pagedown2\\\\\\\"\\\",\\\"Repeated\\\":\\\"true\\\",\\\"KeySprict\\\":\\\"\\\",\\\"MapValid\\\":\\\"true\\\",\\\"BattleValid\\\":\\\"false\\\"}\"}","{\"UserKey\":\"{\\\"KeyCode\\\":\\\"83\\\",\\\"GamePadCode\\\":\\\"7\\\",\\\"KeyName\\\":\\\"\\\\\\\"pageup2\\\\\\\"\\\",\\\"Repeated\\\":\\\"true\\\",\\\"KeySprict\\\":\\\"\\\",\\\"MapValid\\\":\\\"true\\\",\\\"BattleValid\\\":\\\"false\\\"}\"}","{\"UserKey\":\"{\\\"KeyCode\\\":\\\"-1\\\",\\\"GamePadCode\\\":\\\"10\\\",\\\"KeyName\\\":\\\"\\\\\\\"leftstick\\\\\\\"\\\",\\\"Repeated\\\":\\\"false\\\",\\\"KeySprict\\\":\\\"\\\",\\\"MapValid\\\":\\\"true\\\",\\\"BattleValid\\\":\\\"false\\\"}\"}","{\"UserKey\":\"{\\\"KeyCode\\\":\\\"-1\\\",\\\"GamePadCode\\\":\\\"11\\\",\\\"KeyName\\\":\\\"\\\\\\\"rightstick\\\\\\\"\\\",\\\"Repeated\\\":\\\"false\\\",\\\"KeySprict\\\":\\\"\\\",\\\"MapValid\\\":\\\"true\\\",\\\"BattleValid\\\":\\\"false\\\"}\"}"]
 * 
 * 
 * @param GamepadSetting
 * @text ゲームパッド設定
 * @default ------------------------------
 * 
 * @param GamepadLeftStickMaxDash
 * @desc 左スティックの軸の最大に倒すとダッシュします。
 * @text 左軸最大ダッシュ
 * @type boolean
 * @default true
 * @parent GamepadSetting
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
 * @type select
 * @option None
 * @value -1
 * @option A(下ボタン)
 * @value 0
 * @option B(右ボタン)
 * @value 1
 * @option X(左ボタン)
 * @value 2
 * @option Y(上ボタン)
 * @value 3
 * @option LB
 * @value 4
 * @option RB
 * @value 5
 * @option LT
 * @value 6
 * @option RT
 * @value 7
 * @option Back
 * @value 8
 * @option Start
 * @value 9
 * @option Left stick push
 * @value 10
 * @option Right stick push
 * @value 11
 * @option Left stick ↑
 * @value 12
 * @option Left stick ↓
 * @value 13
 * @option Left stick ←
 * @value 14
 * @option Left stick →
 * @value 15
 * @option 
 * @value 16
 * @option Right stick ↑
 * @value 21
 * @option Right stick ↓
 * @value 22
 * @option Right stick ←
 * @value 23
 * @option Right stick →
 * @value 24
 * @default -1
 * @min -1
 * 
 * @param KeyName
 * @desc 任意のシンボル名。文字列を'または"で囲ってください。
 * @text シンボル名
 * @type string
 * @default
 * 
 * @param Repeated
 * @desc リピート有効
 * @text リピート有効
 * @type boolean
 * @default false
 * 
 * @param SceneKeyAndButtonSetting
 * @text シーン上キー、ボタン設定
 * @default ------------------------------
 * 
 * @param KeySprict
 * @desc 任意のスクリプト(ハンドラからは無効)
 * @text 任意スクリプト
 * @type combo
 * @default
 * @parent SceneKeyAndButtonSetting
 * 
 * @param KeyCommonEvent
 * @desc 任意のコモンイベント
 * @text 任意コモンイベント
 * @type common_event
 * @default 0
 * @parent SceneKeyAndButtonSetting
 * 
 * @param MapValid
 * @desc マップ上で有効
 * @text マップ上有効
 * @type boolean
 * @default true
 * @parent SceneKeyAndButtonSetting
 * 
 * @param BattleValid
 * @desc バトル中で有効
 * @text バトル中有効
 * @type boolean
 * @default false
 * @parent SceneKeyAndButtonSetting
 * 
 */

var Imported = Imported || {};
Imported.NUUN_BankSystem = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_UserKey');
    const UserKey = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['UserKey'])) : null) || [];
    const GamepadLeftStickMaxDash = eval(parameters['GamepadLeftStickMaxDash'] || "true");

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
                    if (this.isHandled(keyName) && isRepeated(data.UserKey.Repeated, keyName)) {
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
            this.updateUserKey('MapValid');
        }
    };

    const _Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        _Scene_Battle_update.call(this);
        if (this.isActive() && !this.isBusy()) {
            this.updateUserKey('BattleValid');
        }
    };
    
    Scene_Base.prototype.updateUserKey = function(valid) {
        for (const data of UserKey) {
            if (data.UserKey && data.UserKey[valid] && (!!data.UserKey.KeySprict || data.UserKey.KeyCommonEvent > 0) && (data.UserKey.KeyCode >= 0 || data.UserKey.GamePadCode >= 0)) {
                const keyName = data.UserKey.KeyName;
                if (isRepeated(data.UserKey.Repeated, keyName)) {
                    this._userKeyCalling = true;
                }
                if (this._userKeyCalling && !$gamePlayer.isMoving()) {
                    if (data.UserKey.KeyCommonEvent > 0) {
                        $gameTemp.reserveCommonEvent(data.UserKey.KeyCommonEvent);
                    } else if (!!data.UserKey.KeySprict) {
                        this.callUserKey(data.UserKey.KeySprict);
                    }
                    this._userKeyCalling = false;
                }
            }
        }
    };

    Scene_Base.prototype.callUserKey = function(keySprict) {
        eval(keySprict);
    };

    const _Input_clear = Input.clear;
    Input.clear = function() {
        _Input_clear.call(this);
        this._stickDashing = false;
        this._stickMoveing = 0.0;
        this._stickMoveHistory = [];
    };

    const _Input_updateGamepadState = Input._updateGamepadState;
    Input._updateGamepadState = function(gamepad) {
        const lastState = this._gamepadStates[gamepad.index] || [];
        _Input_updateGamepadState.call(this, gamepad);
        this._gamepadAddButton(gamepad, lastState);
    };

    Input._gamepadAddButton = function(gamepad, lastState) {
        const newState = this._gamepadStates[gamepad.index];
        const buttons = gamepad.buttons;
        const axes = gamepad.axes;
        const threshold = 0.5;
        newState[21] = false;
        newState[22] = false;
        newState[23] = false;
        newState[24] = false;
        if (axes[3] < -threshold) {
            newState[21] = true;
        } else if (axes[3] > threshold) {
            newState[22] = true;
        }
        if (axes[2] < -threshold) {
            newState[23] = true;
        } else if (axes[2] > threshold) {
            newState[24] = true;
        }
        const move = Math.max(Math.abs(axes[0]), Math.abs(axes[1])) - 0.5;
        if (move > 0) {
            this._stickMoveHistory.push(Math.abs(this._stickMoveing));
            if (this._stickMoveHistory.length > 2) {
                this._stickMoveHistory.shift();
            }
            this._stickMoveing = move;
            this._onStickMoveing = true;
        } else if ($gamePlayer && !$gamePlayer.isMoving()) {
            this._stickMoveHistory = [0];
            this._stickMoveing = move;
        } else {
            this._onStickMoveing = false;
        }
        if (GamepadLeftStickMaxDash) {
            this.gamepadLeftStickMaxDash();
        }
        for (let j = 21; j < newState.length; j++) {
            if (newState[j] !== lastState[j]) {
                const buttonName = this.gamepadMapper[j];
                if (buttonName) {
                    this._currentState[buttonName] = newState[j];
                }
            }
        }
    };

    Input.gamepadLeftStickMaxDash = function() {
        this._stickDashing = this._stickMoveing >= 0.5;
    };

    Input.isStickDashing = function() {
        return this._stickDashing;
    };

    function isRepeated(repeat, name) {
        return repeat ? Input.isRepeated(name) : Input.isTriggered(name);
    };

    const _Game_Player_isDashButtonPressed = Game_Player.prototype.isDashButtonPressed;
    Game_Player.prototype.isDashButtonPressed = function() {
        if (Input.isStickDashing()) {
            return true;
        }
        return _Game_Player_isDashButtonPressed.call(this);
    };

})();