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
    
    const _0x1c91a4=_0x2b42;function _0x1c91(){const _0x3cfd4a=['DBCQC','ude','actuatorDa','Duration','CcTDG','6CsGoLe','actuatorDe','WeakMagnit','StrongMagn','StartDelay','ZtgSN','setVibrati','pqWwg','updateVibr','ation','uEHKy','TPWoK','ration','ctuator','AoAXW','jgGfn','990688paRqmE','1198728NjHXFM','xZsSV','10KDTwoL','981101wPezMS','connected','uxpSl','lay','cEalA','vibrationA','type','9480690buwfSt','Nfout','itude','getGamepad','min','rFKNb','actuatorDu','2820520MaFmQR','4644661KMsUmO','playEffect','BOCgj','637047wuoAsu'];_0x1c91=function(){return _0x3cfd4a;};return _0x1c91();}function _0x2b42(_0xa41fe1,_0x277b1a){const _0xa5ea6b=_0x1c91();return _0x2b42=function(_0xcc30d6,_0x2b37b4){_0xcc30d6=_0xcc30d6-(0x1856+-0x25b9+-0x1*-0xe1d);let _0x1ada24=_0xa5ea6b[_0xcc30d6];return _0x1ada24;},_0x2b42(_0xa41fe1,_0x277b1a);}(function(_0x4e6366,_0x2d8549){const _0x33b146={_0x5acbf2:0xd1,_0x3c54d4:0xcd,_0x1a4eee:0xd7,_0x2d9861:0xc6},_0x5e6d49=_0x2b42,_0x4027de=_0x4e6366();while(!![]){try{const _0x338b2e=-parseInt(_0x5e6d49(0xbf))/(-0x119+-0x2590+-0x1*-0x26aa)+-parseInt(_0x5e6d49(0xbe))/(0x26*0x7f+-0x1dc+-0x10fc)*(-parseInt(_0x5e6d49(_0x33b146._0x5acbf2))/(-0x120b+0xba8+0x27*0x2a))+-parseInt(_0x5e6d49(0xbb))/(-0x16a9+-0xa*0x135+-0x1*-0x22bf)+parseInt(_0x5e6d49(_0x33b146._0x3c54d4))/(0xe1d+0x1f17+-0x2d2f)+parseInt(_0x5e6d49(_0x33b146._0x1a4eee))/(-0x3*-0x467+-0x4*-0x463+-0x1ebb)*(-parseInt(_0x5e6d49(0xce))/(0x4*-0x40e+-0x9a*-0x6+0xca3))+-parseInt(_0x5e6d49(0xbc))/(0x1ba1*-0x1+0x1*0x1e9d+-0x2f4)+parseInt(_0x5e6d49(_0x33b146._0x2d9861))/(0x11*0x179+-0xa8c+0xe74*-0x1);if(_0x338b2e===_0x2d8549)break;else _0x4027de['push'](_0x4027de['shift']());}catch(_0x2c89ad){_0x4027de['push'](_0x4027de['shift']());}}}(_0x1c91,-0xbe164+-0x62*0x4eb+0x177c1c),NuunGamePadVibrationManager[_0x1c91a4(0xdd)+'on']=function(_0x4fd519){const _0x170b80={_0x1fc084:0xd6,_0x348981:0xc1,_0x505688:0xd5,_0x258b64:0xe3,_0x2990e1:0xba,_0x219ff0:0xc2,_0x1f8208:0xdb,_0x57e0ce:0xd4},_0x58490c=_0x1c91a4,_0x483db6={'uxpSl':function(_0x5501e3,_0x3ae6d5){return _0x5501e3>_0x3ae6d5;},'cEalA':function(_0x22ed7d,_0x2cc5f8){return _0x22ed7d!==_0x2cc5f8;},'jgGfn':_0x58490c(_0x170b80._0x1fc084)};_0x483db6[_0x58490c(_0x170b80._0x348981)](_0x4fd519[_0x58490c(_0x170b80._0x505688)],this[_0x58490c(0xcc)+_0x58490c(_0x170b80._0x258b64)])&&(_0x483db6[_0x58490c(0xc3)](_0x483db6[_0x58490c(0xba)],_0x483db6[_0x58490c(_0x170b80._0x2990e1)])?this[_0x58490c(0xd8)+_0x58490c(0xc2)]--:(this[_0x58490c(0xd8)+_0x58490c(_0x170b80._0x219ff0)]=_0x4fd519[_0x58490c(_0x170b80._0x1f8208)],this[_0x58490c(_0x170b80._0x57e0ce)+'ta']=_0x4fd519,this[_0x58490c(0xcc)+_0x58490c(0xe3)]=Math[_0x58490c(0xca)](_0x4fd519[_0x58490c(_0x170b80._0x505688)],0x2*-0x170+0xd87*0x1+0x329*-0x3)));},NuunGamePadVibrationManager[_0x1c91a4(0xdf)+_0x1c91a4(0xe0)]=function(){const _0x3e8c98={_0x19c9e6:0xc2,_0x28659e:0xde,_0xb69117:0xd0,_0x148404:0xcc,_0x18952e:0xc9,_0x446a9c:0xcb,_0x76f3da:0xe5,_0x5e2fbb:0xc9,_0x2a90f9:0xc0,_0x1c9b92:0xc5,_0x3ae2e2:0xca,_0x1585bd:0xd9,_0x798523:0xca,_0x3d70ce:0xd4,_0x113b05:0xc8,_0x33544b:0xcc,_0x2b2f34:0xe3,_0x1b2bcb:0xe2,_0x591c93:0xe2,_0x1b89cd:0xcf,_0x18cb39:0xd3,_0x538b91:0xd4,_0x4bdb09:0xda,_0x333b29:0xcf,_0xecf6c9:0xda,_0x7b1a64:0xe4,_0x5ad07d:0xcf,_0x1c2aca:0xc5,_0xdc5efb:0xda,_0x46ae81:0xc8,_0xe2344e:0xe3},_0x74467d=_0x1c91a4,_0x39b5ea={'BOCgj':function(_0xcb99f,_0x11c6b2){return _0xcb99f>_0x11c6b2;},'pqWwg':function(_0x11a789,_0x46637a){return _0x11a789===_0x46637a;},'rFKNb':function(_0x4b193b,_0x547f58){return _0x4b193b!==_0x547f58;},'AoAXW':_0x74467d(0xdc),'TPWoK':_0x74467d(0xe1),'xZsSV':function(_0x11992e,_0x41319a){return _0x11992e!==_0x41319a;},'Nfout':_0x74467d(0xd2)};_0x39b5ea[_0x74467d(0xd0)](this[_0x74467d(0xd8)+_0x74467d(_0x3e8c98._0x19c9e6)],-0x126d+-0x1e9*-0x7+0x2*0x287)&&this[_0x74467d(0xd8)+_0x74467d(0xc2)]--;if(_0x39b5ea[_0x74467d(_0x3e8c98._0x28659e)](this[_0x74467d(0xd8)+_0x74467d(_0x3e8c98._0x19c9e6)],-0x2035+-0xcc9+-0x167f*-0x2)&&_0x39b5ea[_0x74467d(_0x3e8c98._0xb69117)](this[_0x74467d(_0x3e8c98._0x148404)+_0x74467d(0xe3)],-0x8fd*-0x4+-0x1*0x1177+-0x127d)){const _0x37c7cd=navigator[_0x74467d(_0x3e8c98._0x18952e)+'s']();for(const _0x4474df of _0x37c7cd){if(_0x39b5ea[_0x74467d(_0x3e8c98._0x446a9c)](_0x39b5ea[_0x74467d(_0x3e8c98._0x76f3da)],_0x39b5ea[_0x74467d(0xe5)])){const _0x5a2081=_0x8c3c75[_0x74467d(_0x3e8c98._0x5e2fbb)+'s']();for(const _0x482b12 of _0x5a2081){if(_0x482b12&&_0x482b12[_0x74467d(_0x3e8c98._0x2a90f9)]){const _0x56cf1d=_0x482b12[_0x74467d(0xc4)+_0x74467d(0xe4)];_0x56cf1d&&_0x56cf1d[_0x74467d(0xcf)](_0x56cf1d[_0x74467d(_0x3e8c98._0x1c9b92)],{'startDelay':0x0,'duration':0x14,'weakMagnitude':_0x2bd76c[_0x74467d(_0x3e8c98._0x3ae2e2)](-0x1*0x1891+0x1335+0x55d,this[_0x74467d(0xd4)+'ta'][_0x74467d(_0x3e8c98._0x1585bd)+_0x74467d(0xd3)]),'strongMagnitude':_0x980d05[_0x74467d(_0x3e8c98._0x798523)](-0xe68+-0x187b+0x26e4,this[_0x74467d(_0x3e8c98._0x3d70ce)+'ta'][_0x74467d(0xda)+_0x74467d(_0x3e8c98._0x113b05)])});}}this[_0x74467d(_0x3e8c98._0x33544b)+_0x74467d(_0x3e8c98._0x2b2f34)]--;}else{if(_0x4474df&&_0x4474df[_0x74467d(0xc0)]){if(_0x39b5ea[_0x74467d(_0x3e8c98._0x28659e)](_0x39b5ea[_0x74467d(_0x3e8c98._0x1b2bcb)],_0x39b5ea[_0x74467d(_0x3e8c98._0x591c93)])){const _0x27f83e=_0x4474df[_0x74467d(0xc4)+_0x74467d(0xe4)];_0x27f83e&&(_0x39b5ea[_0x74467d(0xbd)](_0x39b5ea[_0x74467d(0xc7)],_0x39b5ea[_0x74467d(0xc7)])?_0xaff4ac[_0x74467d(_0x3e8c98._0x1b89cd)](_0x204dd3[_0x74467d(0xc5)],{'startDelay':0x0,'duration':0x14,'weakMagnitude':_0x5d3bd5[_0x74467d(0xca)](0x2b+0x23d5+-0x23ff,this[_0x74467d(0xd4)+'ta'][_0x74467d(0xd9)+_0x74467d(_0x3e8c98._0x18cb39)]),'strongMagnitude':_0x25f64a[_0x74467d(0xca)](0xaa0+0x2582+-0x3021,this[_0x74467d(_0x3e8c98._0x538b91)+'ta'][_0x74467d(_0x3e8c98._0x4bdb09)+_0x74467d(0xc8)])}):_0x27f83e[_0x74467d(_0x3e8c98._0x333b29)](_0x27f83e[_0x74467d(_0x3e8c98._0x1c9b92)],{'startDelay':0x0,'duration':0x14,'weakMagnitude':Math[_0x74467d(0xca)](0x101*0x7+-0xc69*0x1+0x563,this[_0x74467d(0xd4)+'ta'][_0x74467d(0xd9)+_0x74467d(0xd3)]),'strongMagnitude':Math[_0x74467d(_0x3e8c98._0x798523)](0xa3f+0x12d*-0x19+0x1327,this[_0x74467d(_0x3e8c98._0x538b91)+'ta'][_0x74467d(_0x3e8c98._0xecf6c9)+_0x74467d(_0x3e8c98._0x113b05)])}));}else{const _0x295e52=_0x5bfc86[_0x74467d(0xc4)+_0x74467d(_0x3e8c98._0x7b1a64)];_0x295e52&&_0x295e52[_0x74467d(_0x3e8c98._0x5ad07d)](_0x295e52[_0x74467d(_0x3e8c98._0x1c2aca)],{'startDelay':0x0,'duration':0x14,'weakMagnitude':_0x1bdc41[_0x74467d(_0x3e8c98._0x3ae2e2)](0x2320+-0x7*-0x539+-0x47ae,this[_0x74467d(0xd4)+'ta'][_0x74467d(0xd9)+_0x74467d(0xd3)]),'strongMagnitude':_0x4a1ff1[_0x74467d(_0x3e8c98._0x3ae2e2)](-0x9a3+0x206f+-0xf*0x185,this[_0x74467d(0xd4)+'ta'][_0x74467d(_0x3e8c98._0xdc5efb)+_0x74467d(_0x3e8c98._0x46ae81)])});}}}}this[_0x74467d(_0x3e8c98._0x33544b)+_0x74467d(_0x3e8c98._0xe2344e)]--;}});

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