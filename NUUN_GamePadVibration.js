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
 * @version 1.2.1
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
 * 9/28/2026 Ver.1.2.1
 * Limited the vibration duration to a maximum of 300 frames as a safety measure.
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
 * @version 1.2.1
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
 * 2026/9/28 Ver.1.2.1
 * 安全策のため振動フレーム数を300フレームまでに制限。
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
 * @max 300
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
    
    function _0x1e19(){const _0x3007df=['33dHGaUM','playEffect','ration','WeakMagnit','StSxj','Gwybi','224410HyexKm','2826ZjuApo','setVibrati','1868629HqsXjQ','uCDDv','actuatorDe','6120yQzjSQ','99453LesYOu','connected','lay','StartDelay','actuatorDa','actuatorDu','dual-rumbl','tcqUg','32AjNpXe','getGamepad','min','818736TswJxq','DnwrU','2kmZgwK','vibrationA','ude','ation','Duration','StrongMagn','updateVibr','ctuator','7316zDOmow','8392cRhWoK','96RdOURn','itude'];_0x1e19=function(){return _0x3007df;};return _0x1e19();}function _0x4665(_0x2c44ca,_0x436093){const _0x3421b2=_0x1e19();return _0x4665=function(_0x598666,_0x138460){_0x598666=_0x598666-(0xeff+0x39*0x5b+-0x222d);let _0x13a30f=_0x3421b2[_0x598666];return _0x13a30f;},_0x4665(_0x2c44ca,_0x436093);}const _0x54925b=_0x4665;(function(_0x5b6fd6,_0x2e51cd){const _0x514525={_0x12ade7:0x117,_0x3ec42b:0x11f,_0x2238f9:0x130,_0x18a329:0x138,_0x2535e6:0x12f,_0x1d37ca:0x121,_0x4bfbae:0x120,_0x2a13e1:0x123},_0x5610cb=_0x4665,_0x5d7211=_0x5b6fd6();while(!![]){try{const _0x42d109=-parseInt(_0x5610cb(_0x514525._0x12ade7))/(0x1*0x1d93+0x26e2+-0x34*0x151)*(-parseInt(_0x5610cb(_0x514525._0x3ec42b))/(0x1244+-0xb*0x317+0xfbb*0x1))+parseInt(_0x5610cb(_0x514525._0x2238f9))/(0x1c78+0x9*-0x223+-0x49d*0x2)*(-parseInt(_0x5610cb(_0x514525._0x18a329))/(-0x1e13*0x1+0x107*0x26+-0x4f*0x1d))+-parseInt(_0x5610cb(_0x514525._0x2535e6))/(0x3*-0x499+0x593*0x5+-0xe0f)*(-parseInt(_0x5610cb(_0x514525._0x1d37ca))/(0x11d6*0x1+0x1c14+0x42*-0xb2))+parseInt(_0x5610cb(0x12c))/(-0x2*-0x11e8+0x1b6b+-0x3f34)+-parseInt(_0x5610cb(_0x514525._0x4bfbae))/(0x1dcf+0x4ff*0x3+-0x2cc4)*(-parseInt(_0x5610cb(0x12a))/(-0x373*-0x1+-0x2*0x34d+0x110*0x3))+parseInt(_0x5610cb(0x129))/(0x15d*0x5+0xde9*0x2+-0x2299)*(-parseInt(_0x5610cb(_0x514525._0x2a13e1))/(0x1d*-0x8b+0x16*-0x42+0x1*0x1576))+-parseInt(_0x5610cb(0x115))/(0x2*-0x300+-0x1*0x14f+0x10d*0x7);if(_0x42d109===_0x2e51cd)break;else _0x5d7211['push'](_0x5d7211['shift']());}catch(_0x562397){_0x5d7211['push'](_0x5d7211['shift']());}}}(_0x1e19,-0x33c95+0x338bc+0x368e3),NuunGamePadVibrationManager[_0x54925b(0x12b)+'on']=function(_0x4840c1){const _0x58ae9b={_0xac9390:0x11b,_0x3a7598:0x125,_0x339c93:0x12e,_0x45195d:0x135,_0x272866:0x13a},_0x5a9bbe=_0x54925b,_0x5be645={'Gwybi':function(_0xc333a3,_0x43121b){return _0xc333a3>_0x43121b;}};_0x5be645[_0x5a9bbe(0x128)](_0x4840c1[_0x5a9bbe(_0x58ae9b._0xac9390)],this[_0x5a9bbe(0x135)+_0x5a9bbe(_0x58ae9b._0x3a7598)])&&(this[_0x5a9bbe(_0x58ae9b._0x339c93)+_0x5a9bbe(0x132)]=_0x4840c1[_0x5a9bbe(0x133)],this[_0x5a9bbe(0x134)+'ta']=_0x4840c1,this[_0x5a9bbe(_0x58ae9b._0x45195d)+_0x5a9bbe(0x125)]=Math[_0x5a9bbe(_0x58ae9b._0x272866)](_0x4840c1[_0x5a9bbe(0x11b)],-0x1e7*-0x6+0x4*0x793+-0x1445*0x2));},NuunGamePadVibrationManager[_0x54925b(0x11d)+_0x54925b(0x11a)]=function(){const _0x481294={_0x96f7e1:0x127,_0x2bc4d0:0x12e,_0x50399d:0x132,_0x1a6010:0x12e,_0x43c92b:0x137,_0x593fe9:0x135,_0x451dce:0x125,_0x117533:0x139,_0x2927f1:0x11e,_0x24b760:0x124,_0x2d7eb1:0x116,_0x3ad0e9:0x13a,_0x55bcfa:0x135},_0xfe6d1=_0x54925b,_0x41c0b={'StSxj':function(_0x574c0e,_0x2051b4){return _0x574c0e>_0x2051b4;},'uCDDv':function(_0x54244a,_0x503394){return _0x54244a===_0x503394;},'tcqUg':function(_0x45bfa4,_0x32e5f9){return _0x45bfa4>_0x32e5f9;},'DnwrU':_0xfe6d1(0x136)+'e'};_0x41c0b[_0xfe6d1(_0x481294._0x96f7e1)](this[_0xfe6d1(_0x481294._0x2bc4d0)+_0xfe6d1(0x132)],-0x1f25+-0x1*0x1921+0x3846)&&this[_0xfe6d1(0x12e)+_0xfe6d1(_0x481294._0x50399d)]--;if(_0x41c0b[_0xfe6d1(0x12d)](this[_0xfe6d1(_0x481294._0x1a6010)+_0xfe6d1(_0x481294._0x50399d)],0x161f*-0x1+-0x1bf*0x6+0x2099)&&_0x41c0b[_0xfe6d1(_0x481294._0x43c92b)](this[_0xfe6d1(_0x481294._0x593fe9)+_0xfe6d1(_0x481294._0x451dce)],-0x90a+-0x101e+0x8c*0x2e)){const _0x180723=navigator[_0xfe6d1(_0x481294._0x117533)+'s']();for(const _0xaca22c of _0x180723){if(_0xaca22c&&_0xaca22c[_0xfe6d1(0x131)]){const _0x1e7c27=_0xaca22c[_0xfe6d1(0x118)+_0xfe6d1(_0x481294._0x2927f1)];_0x1e7c27&&_0x1e7c27[_0xfe6d1(_0x481294._0x24b760)](_0x41c0b[_0xfe6d1(_0x481294._0x2d7eb1)],{'startDelay':0x0,'duration':0x14,'weakMagnitude':Math[_0xfe6d1(_0x481294._0x3ad0e9)](-0x1483*-0x1+-0x15fe*0x1+0x17c,this[_0xfe6d1(0x134)+'ta'][_0xfe6d1(0x126)+_0xfe6d1(0x119)]),'strongMagnitude':Math[_0xfe6d1(_0x481294._0x3ad0e9)](-0xe74+-0xf3d*0x1+0x1db2*0x1,this[_0xfe6d1(0x134)+'ta'][_0xfe6d1(0x11c)+_0xfe6d1(0x122)])});}}this[_0xfe6d1(_0x481294._0x55bcfa)+_0xfe6d1(0x125)]--;}});

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