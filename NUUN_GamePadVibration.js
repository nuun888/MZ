/*:-----------------------------------------------------------------------------------
 * NUUN_GamePadVibration.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Gamepad Vibration
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * This is a plugin for vibrating the gamepad on X Input.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 2/26/2023 Ver.1.0.0
 * First edition.
 * 
 * @command OnVibration
 * @desc Perform gamepad vibration.
 * @text Gamepad vibration
 * 
 * @arg VibrationSetting
 * @type struct<VibrationData>
 * @default 
 * @text Vibration settings
 * @desc Set vibration.
 * 
 */
/*~struct~VibrationData:
 * 
 * @param StartDelay
 * @desc Delay (in milliseconds) before vibration starts.
 * @text Start delay
 * @type number
 * @default 0
 * @min 0
 * 
 * @param Duration
 * @desc Number of vibration frames.
 * @text Number of vibration frames
 * @type number
 * @default 120
 * 
 * @param WeakMagnitude
 * @desc The rumble strength of the high frequency (weak) rumble motor.
 * @text High frequency rumble intensity
 * @type string
 * @default 1.0
 * 
 * @param StrongMagnitude
 * @desc The rumble strength of the low frequency (strong) rumble motor.
 * @text Low frequency rumble strength
 * @type string
 * @default 1.0
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc ゲームパッド振動
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * X Inputでのゲームパッドを振動させるためのプラグインです。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/2/26 Ver.1.0.0
 * 初版。
 * 
 * @command OnVibration
 * @desc ゲームパッドの振動を実行します。
 * @text ゲームパッド振動
 * 
 * @arg VibrationSetting
 * @type struct<VibrationData>
 * @default 
 * @text 振動設定
 * @desc 振動の設定を行います。
 * 
 * 
 * @param OptionGamePadVibrationName
 * @desc オプションに表示するゲームパッド振動有効の名称を設定します。
 * @text ゲームパッド振動有効
 * @type string
 * @default ゲームパッド振動
 * 
 */
/*~struct~VibrationData:ja
 * 
 * @param StartDelay
 * @desc 振動を開始するまでのディレイ(ミリ秒)
 * @text 開始ディレイ
 * @type number
 * @default 0
 * @min 0
 * 
 * @param Duration
 * @desc 振動フレーム数
 * @text 振動フレーム数
 * @type number
 * @default 120
 * 
 * @param WeakMagnitude
 * @desc 高周波 (弱い) ランブル モーターのランブル強度。
 * @text 高周波ランブル強度
 * @type string
 * @default 1.0
 * 
 * @param StrongMagnitude
 * @desc 低周波 (強い) ランブル モーターのランブル強度。
 * @text 低周波ランブル強度
 * @type string
 * @default 1.0
 * 
 */

var Imported = Imported || {};
Imported.NUUN_GamePadVibration = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_GamePadVibration');
    const OptionGamePadVibrationName = String(parameters['OptionGamePadVibrationName'] || "ゲームパッド振動");
    const pluginName = "NUUN_GamePadVibration";

    PluginManager.registerCommand(pluginName, 'OnVibration', args => {
        if (args.VibrationSetting) {
            const data = DataManager.nuun_structureData(args.VibrationSetting);
            NuunManager.setupGamePadVibration(data);
        }
    });

    const _Scene_Base_initialize = Scene_Base.prototype.initialize;
    Scene_Base.prototype.initialize = function() {
        _Scene_Base_initialize.call(this);
        NuunManager.actuatorDuration = 0;
    };

    const _Scene_Base_update = Scene_Base.prototype.update;
    Scene_Base.prototype.update = function() {
        _Scene_Base_update.call(this);
        NuunManager.updateVibration();
    };
    

    NuunManager.setupGamePadVibration = function(data) {
        if (navigator.getGamepads && ConfigManager.gamePadVibration) {
            const gamepad = navigator.getGamepads()[0];
            if (gamepad && gamepad.vibrationActuator) {
                this.setVibration(data);
            }
        }
    };
    
    NuunManager.setVibration = function(data) {
        if (data.Duration > this.actuatorDuration) {
            this._actuatorData = data;
            this.actuatorDuration = data.Duration;
        }
    };

    NuunManager.updateVibration = function() {
        if (this.actuatorDuration > 0) {
            const gamepads = navigator.getGamepads();
            for (const gamepad of gamepads) {
                if (gamepad && gamepad.connected) {
                    const actuator = gamepad.vibrationActuator;
                    if (actuator) {
                        actuator.playEffect(actuator.type, {
                            startDelay: this._actuatorData.StartDelay,
                            duration: 20,
                            weakMagnitude: this._actuatorData.WeakMagnitude,
                            strongMagnitude: this._actuatorData.StrongMagnitude,
                        });
                    }
                }
            }
            this.actuatorDuration--;
        }
    };


    const _Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
    Scene_Options.prototype.maxCommands = function() {
        return _Scene_Options_maxCommands.call(this) + 1;
    };


    const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function() {
        _Window_Options_addGeneralOptions.call(this);
        this.addCommand(OptionGamePadVibrationName, "gamePadVibration");
    };

    ConfigManager.gamePadVibration = true;

    const _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        const config = _ConfigManager_makeData.call(this);
        config.gamePadVibration = this.gamePadVibration;
        return config;
    };

    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.call(this, config);
        this.gamePadVibration = this.readFlag(config, "gamePadVibration", true);
    };
    
})();