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
 * Modifications: Possible(Obfuscated sections may not be modified.)
 * Redistribution: Possible
 * Support is not available for modified versions or downloads from sources other than https://github.com/nuun888/MZ, the official forum, or authorized retailers.
 * 
 * Log
 * 9/27/2026 Ver.1.2.1
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
 * @max 300
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
 * 改変：可能(難読化されている部分は改変不可)
 * 再配布：可能
 * https://github.com/nuun888/MZ、公式フォーラム、正規販売サイト以外からのダウンロード、改変済みの場合はサポートは対象外となります。
 * 
 * 更新履歴
 * 2026/9/27 Ver.1.2.1
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
    
    const _0x3b492d=_0xb7aa;function _0xb7aa(_0x3dd2fd,_0x54ff93){const _0x19ee5f=_0x3821();return _0xb7aa=function(_0x146729,_0x22e28a){_0x146729=_0x146729-(-0x1c4*-0x2+0xa1f*0x1+0xcd1*-0x1);let _0xdfcfe1=_0x19ee5f[_0x146729];return _0xdfcfe1;},_0xb7aa(_0x3dd2fd,_0x54ff93);}(function(_0x54d48b,_0x51bc0d){const _0x481f6c={_0x65f5c7:0xf3,_0xaadb19:0xdd,_0x46f56c:0xf6},_0x3cc780=_0xb7aa,_0x21081e=_0x54d48b();while(!![]){try{const _0x288034=parseInt(_0x3cc780(_0x481f6c._0x65f5c7))/(0x650+0x1*-0x5b+0x5f4*-0x1)+parseInt(_0x3cc780(0xf4))/(-0x4a3+-0x6b5+0xb5a)+parseInt(_0x3cc780(0xea))/(0xc87+0x2*-0x6a6+0xc8)+parseInt(_0x3cc780(0xe4))/(-0x1c7e+-0x42a+0x44*0x7b)*(-parseInt(_0x3cc780(0xff))/(0x1*0x1e29+0x11*-0x15+-0x1cbf))+parseInt(_0x3cc780(0xfd))/(-0xc4e+-0x2*0x10b2+-0x58*-0x85)*(-parseInt(_0x3cc780(0xf2))/(0x4*-0x94f+-0xe0c+0xb9*0x47))+parseInt(_0x3cc780(_0x481f6c._0xaadb19))/(-0xf7*-0x20+-0xd45*0x2+-0x44e)*(parseInt(_0x3cc780(_0x481f6c._0x46f56c))/(0x1798+0x1a*-0x9e+-0x281*0x3))+parseInt(_0x3cc780(0xe0))/(0x1*-0x10bb+-0x1*-0xccf+0x3f6);if(_0x288034===_0x51bc0d)break;else _0x21081e['push'](_0x21081e['shift']());}catch(_0x3d8962){_0x21081e['push'](_0x21081e['shift']());}}}(_0x3821,0xfb24f+0x1*0x17be46+-0xac2a*0x26),NuunGamePadVibrationManager[_0x3b492d(0xfc)+'on']=function(_0x171a08){const _0x513d3d={_0x27da7f:0xe8,_0x4ece54:0xef,_0x30a28e:0x101,_0x48725f:0xfe,_0x4592e8:0xf0,_0x30c02e:0xe3,_0x5027a4:0xda,_0x452216:0xe1,_0x275624:0xe6,_0x5d4e29:0xf9,_0x498e2f:0xf8,_0x1bb9c3:0xef},_0x40c949=_0x3b492d,_0x23eb21={'OZfjz':_0x40c949(0xe2)+'e','XxQmA':function(_0x4d89b7,_0xc7c34e){return _0x4d89b7>_0xc7c34e;},'GzQMk':function(_0x52a3c3,_0x5000cf){return _0x52a3c3!==_0x5000cf;},'NjNfy':_0x40c949(0xe7)};if(_0x23eb21[_0x40c949(_0x513d3d._0x27da7f)](_0x171a08[_0x40c949(0xde)],this[_0x40c949(_0x513d3d._0x4ece54)+_0x40c949(0xd9)])){if(_0x23eb21[_0x40c949(_0x513d3d._0x30a28e)](_0x23eb21[_0x40c949(_0x513d3d._0x48725f)],_0x23eb21[_0x40c949(_0x513d3d._0x48725f)])){if(_0x331912&&_0x574d4f[_0x40c949(0xe5)]){const _0x1cab4b=_0x5026b6[_0x40c949(_0x513d3d._0x4592e8)+_0x40c949(0x102)];_0x1cab4b&&_0x1cab4b[_0x40c949(0xfa)](_0x23eb21[_0x40c949(_0x513d3d._0x30c02e)],{'startDelay':0x0,'duration':0x14,'weakMagnitude':this[_0x40c949(_0x513d3d._0x5027a4)+'ta'][_0x40c949(_0x513d3d._0x452216)+_0x40c949(_0x513d3d._0x275624)],'strongMagnitude':this[_0x40c949(0xda)+'ta'][_0x40c949(0xee)+_0x40c949(0xdc)]});}}else this[_0x40c949(_0x513d3d._0x5d4e29)+_0x40c949(0xd6)]=_0x171a08[_0x40c949(_0x513d3d._0x498e2f)],this[_0x40c949(0xda)+'ta']=_0x171a08,this[_0x40c949(_0x513d3d._0x1bb9c3)+_0x40c949(0xd9)]=Math[_0x40c949(0xfb)](_0x171a08[_0x40c949(0xde)],0x1f56+-0xc5*0x25+-0x1b1);}},NuunGamePadVibrationManager[_0x3b492d(0xf5)+_0x3b492d(0xeb)]=function(){const _0x519353={_0x9d19c8:0xd7,_0x54c8c6:0xed,_0x1af392:0xe2,_0x289144:0xf1,_0x67eb8c:0xf7,_0x8e3aef:0xdf,_0x31cd89:0xf9,_0x183a2c:0xd6,_0x1e6f2a:0xf8,_0x46124e:0xda,_0x1025ff:0xef,_0x36c857:0xd9,_0x5604cb:0xfb,_0x26a6d8:0xde,_0x1c18c9:0xec,_0xdd41d8:0xf0,_0x1890c3:0x102,_0xac3e3:0xd8,_0x3ffdec:0xe9,_0x3c9bb4:0xe9,_0x2a5a2e:0xf9,_0x2b2154:0xfa,_0x2873b1:0x100,_0x1393a1:0xda,_0x2e3188:0xe1,_0x98a649:0xe6,_0xc7c9c8:0xef},_0x4870cd=_0x3b492d,_0x32cdad={'IKDNx':function(_0x4419d3,_0x42966e){return _0x4419d3>_0x42966e;},'JQCTv':function(_0x2d582e,_0x4fa98d){return _0x2d582e===_0x4fa98d;},'KaNBN':_0x4870cd(_0x519353._0x9d19c8),'mcrlF':function(_0xf2bbcf,_0x85dcb8){return _0xf2bbcf===_0x85dcb8;},'JUdCm':function(_0x5528dd,_0x333cc9){return _0x5528dd!==_0x333cc9;},'MoQyj':_0x4870cd(_0x519353._0x54c8c6),'TWboq':_0x4870cd(_0x519353._0x1af392)+'e'};_0x32cdad[_0x4870cd(_0x519353._0x289144)](this[_0x4870cd(0xf9)+_0x4870cd(0xd6)],-0x1ecf+0x1e81+0x4e)&&(_0x32cdad[_0x4870cd(_0x519353._0x67eb8c)](_0x32cdad[_0x4870cd(0xdf)],_0x32cdad[_0x4870cd(_0x519353._0x8e3aef)])?this[_0x4870cd(0xf9)+_0x4870cd(0xd6)]--:(this[_0x4870cd(_0x519353._0x31cd89)+_0x4870cd(_0x519353._0x183a2c)]=_0xb933f0[_0x4870cd(_0x519353._0x1e6f2a)],this[_0x4870cd(_0x519353._0x46124e)+'ta']=_0x33e0e9,this[_0x4870cd(_0x519353._0x1025ff)+_0x4870cd(_0x519353._0x36c857)]=_0x19ae9d[_0x4870cd(_0x519353._0x5604cb)](_0x2f70f8[_0x4870cd(_0x519353._0x26a6d8)],-0x207+-0xd7*-0x5+-0x100)));if(_0x32cdad[_0x4870cd(0xdb)](this[_0x4870cd(_0x519353._0x31cd89)+_0x4870cd(_0x519353._0x183a2c)],0x27f*-0xf+0x16a2+-0x1*-0xecf)&&_0x32cdad[_0x4870cd(_0x519353._0x289144)](this[_0x4870cd(0xef)+_0x4870cd(_0x519353._0x36c857)],-0x7*0x33d+0x2581+-0xed6)){const _0x2ce377=navigator[_0x4870cd(_0x519353._0x1c18c9)+'s']();for(const _0x2941f3 of _0x2ce377){if(_0x2941f3&&_0x2941f3[_0x4870cd(0xe5)]){const _0x5cd0b9=_0x2941f3[_0x4870cd(_0x519353._0xdd41d8)+_0x4870cd(_0x519353._0x1890c3)];_0x5cd0b9&&(_0x32cdad[_0x4870cd(_0x519353._0xac3e3)](_0x32cdad[_0x4870cd(_0x519353._0x3ffdec)],_0x32cdad[_0x4870cd(_0x519353._0x3c9bb4)])?this[_0x4870cd(_0x519353._0x2a5a2e)+_0x4870cd(0xd6)]--:_0x5cd0b9[_0x4870cd(_0x519353._0x2b2154)](_0x32cdad[_0x4870cd(_0x519353._0x2873b1)],{'startDelay':0x0,'duration':0x14,'weakMagnitude':this[_0x4870cd(_0x519353._0x1393a1)+'ta'][_0x4870cd(_0x519353._0x2e3188)+_0x4870cd(_0x519353._0x98a649)],'strongMagnitude':this[_0x4870cd(0xda)+'ta'][_0x4870cd(0xee)+_0x4870cd(0xdc)]}));}}this[_0x4870cd(_0x519353._0xc7c9c8)+_0x4870cd(0xd9)]--;}});function _0x3821(){const _0x278bbb=['1595324uuwEre','updateVibr','9NkjCJO','JQCTv','StartDelay','actuatorDe','playEffect','min','setVibrati','1266882oITsVM','NjNfy','6545970eurDoh','TWboq','GzQMk','ctuator','lay','eradd','JUdCm','ration','actuatorDa','mcrlF','itude','4890376LQPdAS','Duration','KaNBN','776240YPkyYC','WeakMagnit','dual-rumbl','OZfjz','4RMWHWS','connected','ude','Qujzk','XxQmA','MoQyj','3344397mHXOth','ation','getGamepad','XWPTn','StrongMagn','actuatorDu','vibrationA','IKDNx','14mFeOhT','40019lqooJf'];_0x3821=function(){return _0x278bbb;};return _0x3821();}

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