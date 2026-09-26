/*:-----------------------------------------------------------------------------------
 * NUUN_GamePadVibration.js
 * 
 * Copyright (C) 2023 NUUN
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Gamepad Vibration
 * @author NUUN
 * @version 1.2.0
 * 
 * @help
 * This is a plugin for vibrating the gamepad on X Input.
 * 
 * Control character
 * \VG[id]:Vibrate the gamepad.
 * [id]:Specify the ID in the "VibrationSetting" list number of the plug-in parameter.
 * 
 * Specified from script
 * NuunGamePadVibrationManager.sprictGamePadVibration(StartDelay, Duration, WeakMagnitude, StrongMagnitude)
 * 
 * Terms of Use
 * Credit: Optional
 * Commercial use: Possible
 * Modifications: Possible
 * Redistribution: Possible
 * Support is not available for modified versions or downloads from sources other than https://github.com/nuun888/MZ, the official forum, or authorized retailers.
 * 
 * Log
 * 9/26/2026 Ver.1.2.0
 * Changed the specifications so that the plugin can run without NUUN_Base.
 * 4/2/2023 Ver.1.1.0
 * Added function to vibrate gamepad from text code.
 * 3/16/2023 Ver.1.0.2
 * Fixed not to display in the option if the game pad is not recognized.
 * 3/12/2023 Ver.1.0.1
 * Changed the vibration start setting from milliseconds to frames.
 * Supported so that it can be easily specified from the script.
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
 * 
 * @param OptionGamePadVibrationName
 * @desc Set the name of the gamepad vibration enable to be displayed in the option.
 * @text Gamepad vibration enabled
 * @type string
 * @default Gamepad vibration enabled
 * 
 * @param VibrationSetting
 * @type struct<VibrationData>[]
 * @default []
 * @text Vibration settings
 * @desc Set vibration.
 * 
 */
/*~struct~VibrationData:
 * 
 * @param StartDelay
 * @desc Number of delay frames before vibration starts.
 * @text Start delay frame
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
 * @version 1.2.0
 * 
 * @help
 * XInputでのゲームパッドを振動させるためのプラグインです。
 * 
 * 制御文字
 * \VG[id]:ゲームパッドを振動させます。
 * [id]:プラグインパラメータの振動設定リスト番号内のIDを指定します。
 * 
 * スクリプトから指定
 * NuunGamePadVibrationManager.sprictGamePadVibration(StartDelay, Duration, WeakMagnitude, StrongMagnitude)
 * 
 * 利用規約
 * クレジット表記：任意
 * 商業利用：可能
 * 改変：可能
 * 再配布：可能
 * https://github.com/nuun888/MZ、公式フォーラム、正規販売サイト以外からのダウンロード、改変済みの場合はサポートは対象外となります。
 * 
 * 更新履歴
 * 2026/9/26 Ver.1.2.0
 * NUUN_Baseなしで実行できるように仕様を変更。
 * 2023/4/2 Ver.1.1.0
 * 制御文字からゲームパッドを振動させる機能を追加。
 * 2023/3/16 Ver.1.0.2
 * ゲームパッドを認識してない場合はオプションに表示しないように修正。
 * 2023/3/12 Ver.1.0.1
 * 振動を開始する設定をミリ秒からフレーム数に変更。
 * スクリプトから容易に指定できるように対応。
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
 * @param VibrationSetting
 * @type struct<VibrationData>[]
 * @default []
 * @text 振動設定
 * @desc 振動の設定を行います。
 * 
 */
/*~struct~VibrationData:ja
 * 
 * @param StartDelay
 * @desc 振動を開始するまでのディレイフレーム数
 * @text 開始ディレイフレーム
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
    class Nuun_PluginParams_GamePadVibration {
        static getPluginParams(text) {//document.currentScript
            try {
                const name = String(Utils.extractFileName(text.src).split('.').shift());
                const params = PluginManager.parameters(name);
                if (params) {
                    const pluginParam = new Nuun_PluginParamData(params);
                    pluginParam.setPluginName(name);
                    return pluginParam.getParameters();
                }
                return {pluginName: name};
            } catch (error) {
                const log = ($gameSystem.isJapanese() ? "コアスクリプトをVer.1.3.2以降に更新してください。" : "Please update the core script to version 1.3.2 or later.");
                throw ["ParameterError", log];
            }
        }
    };

    window.Nuun_PluginParams_GamePadVibration = Nuun_PluginParams_GamePadVibration;

    class Nuun_PluginParamData {
        constructor(text) {
            this._parameters = JSON.parse(JSON.stringify(text, this._convertParams)) || {};
        }

        _convertParams(key, code) {
            try {
                return JSON.parse(code);
            } catch (e) {
                if (isNaN(code)) {
                    if (!code) {
                        return null;
                    }
                    try {
                        if (code.indexOf("'") === 0 || code.indexOf('"') === 0) {
                            return eval(code);//'または"を外す。
                        }
                        return !!code ? String(code) : null;
                    } catch (e) {
                        if (typeof {} === "object") {
                            return code;
                        }
                        return !!code ? String(code) : null;
                    }
                } else {
                    return String(code);
                }
            }
        }

        getParameters() {
            return this._parameters;
        }

        setPluginName(name) {
            this._parameters.pluginName = name;
        }


        getMetaTag(object, code) {
            const data = object.meta[code];
            let list = [];
            if (data !== undefined) {
                try {
                    list = data.split(',');
                } catch (error) {
                    return this.getTextCodeMeta(data);
                }
                return list.map(a => this.getTextCodeMeta(a));
            } else {
                return undefined;
            }
        }

        getTextCodeMeta(text) {
            if (isNaN(text)) {
                return text;
            } else {
                return Number(text);
            }
        }
    };

    const params = Nuun_PluginParams_GamePadVibration.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;

    PluginManager.registerCommand(pluginName, 'OnVibration', args => {
        if (args.VibrationSetting) {
            const data = NuunGamePadVibrationManager.structureData(args.VibrationSetting);
            NuunGamePadVibrationManager.setupGamePadVibration(data);
        }
    });

    function NuunGamePadVibrationManager() {
        throw new Error("This is a static class");
    }

    window.NuunGamePadVibrationManager = NuunGamePadVibrationManager;

    NuunGamePadVibrationManager.onGamepad = false;
    NuunGamePadVibrationManager.actuatorDuration = 0;
    NuunGamePadVibrationManager.actuatorDelay = 0;
    NuunGamePadVibrationManager.actuatorData = null;

    NuunGamePadVibrationManager.structureData = function(params){
        return JSON.parse(JSON.stringify(params, function(key, value) {
            try {
                return JSON.parse(value);
            } catch (e) {
                return NuunGamePadVibrationManager.getEvalCode(value);
            }
        }));
    };

    NuunGamePadVibrationManager.stringCode = function(code){
        try {
            if (code.indexOf("'") === 0 || code.indexOf('"') === 0) {
                return eval(code);//'または"を外す。
            }
            return !!code ? String(code) : null;
        } catch (e) {
            return code;
        }
    };

    NuunGamePadVibrationManager.getEvalCode = function(code) {
        if (isNaN(code)) {
            if (!code) {
                return null;
            }
            return this.stringCode(code);
        } else {
            return String(code);
        }
    };

    NuunGamePadVibrationManager.gamePadVibrationParams = function(code) {
        switch (code) {
            case 0:
                return params.OptionGamePadVibrationName || "ゲームパッド振動";
            case 1:
                return params.VibrationSetting || [];
        }
    };

    NuunGamePadVibrationManager.sprictGamePadVibration = function(data1, data2, data3, data4) {
        const vibration = {};
        vibration.StartDelay = Number(data1);
        vibration.Duration = Number(data2);
        vibration.WeakMagnitude = Number(data3);
        vibration.StrongMagnitude = Number(data4);
        this.setupGamePadVibration(vibration);
    };
    

    NuunGamePadVibrationManager.setupGamePadVibration = function(data) {
        if (!data) return;
        if (navigator.getGamepads && ConfigManager.gamePadVibration) {
            const gamepad = navigator.getGamepads()[0];
            if (gamepad && gamepad.vibrationActuator) {
                this.setVibration(data);
            }
        }
    };
    
    NuunGamePadVibrationManager.setVibration = function(data) {
        if (data.Duration > this.actuatorDuration) {
            this.actuatorDelay = data.StartDelay;
            this.actuatorData = data;
            this.actuatorDuration = data.Duration;
        }
    };

    NuunGamePadVibrationManager.updateVibration = function() {
        if (this.actuatorDelay > 0) {
            this.actuatorDelay--;
        }
        if (this.actuatorDelay === 0 && this.actuatorDuration > 0) {
            const gamepads = navigator.getGamepads();
            for (const gamepad of gamepads) {
                if (gamepad && gamepad.connected) {
                    const actuator = gamepad.vibrationActuator;
                    if (actuator) {
                        //const agent = window.navigator.userAgent.toLowerCase();
                        //if (agent.indexOf('firefox') >= 0) {//firefox
                            //actuator.pulse(this.actuatorData.WeakMagnitude, 20);
                        //} else {
                            actuator.playEffect(actuator.type, {
                                startDelay: 0,
                                duration: 20,
                                weakMagnitude: this.actuatorData.WeakMagnitude,
                                strongMagnitude: this.actuatorData.StrongMagnitude,
                            });
                        //}
                    }
                }
            }
            this.actuatorDuration--;
        }
    };

    //旧互換性
    if (typeof NuunManager !== "undefined") {
        NuunManager.sprictGamePadVibration = function(data1, data2, data3, data4) {
            NuunGamePadVibrationManager.sprictGamePadVibration(data1, data2, data3, data4);
        };
    }


    const _Scene_Base_initialize = Scene_Base.prototype.initialize;
    Scene_Base.prototype.initialize = function() {
        _Scene_Base_initialize.call(this);
        NuunGamePadVibrationManager.actuatorDuration = 0;
        NuunGamePadVibrationManager.actuatorDelay = 0;
        NuunGamePadVibrationManager.actuatorData = null;
    };

    const _Scene_Base_update = Scene_Base.prototype.update;
    Scene_Base.prototype.update = function() {
        _Scene_Base_update.call(this);
        NuunGamePadVibrationManager.updateVibration();
    };

    const _Window_Base_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
    Window_Base.prototype.processEscapeCharacter = function(code, textState) {
        switch (code) {
            case "VG":
                this.processGamepadVibration(this.obtainEscapeParam(textState));
                break;
            default:
                _Window_Base_processEscapeCharacter.call(this, code, textState);
                break;
        }
    };

    Window_Base.prototype.processGamepadVibration = function(state) {
        const data = NuunGamePadVibrationManager.gamePadVibrationParams(1)[state -1];
        if (data) {
            NuunGamePadVibrationManager.setupGamePadVibration(data);
        }
    };


    const _Scene_Options_initialize = Scene_Options.prototype.initialize;
    Scene_Options.prototype.initialize = function() {
        _Scene_Options_initialize.call(this);
        NuunGamePadVibrationManager.onGamepad = !!navigator.getGamepads()[0];
    };

    const _Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
    Scene_Options.prototype.maxCommands = function() {
        return _Scene_Options_maxCommands.call(this) + (NuunGamePadVibrationManager.onGamepad ? 1 : 0);
    };

    const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function() {
        _Window_Options_addGeneralOptions.call(this);
        if (NuunGamePadVibrationManager.onGamepad) {
            this.addCommand(NuunGamePadVibrationManager.gamePadVibrationParams(0), "gamePadVibration");
        }
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