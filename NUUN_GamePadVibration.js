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
 * @version 1.1.0
 * 
 * @help
 * This is a plugin for vibrating the gamepad on X Input.
 * 
 * Text　code
 * \VG[id]:Vibrate the gamepad.
 * [id]:Specify the ID in the "VibrationSetting" list number of the plug-in parameter.
 * 
 * Specified from script
 * NuunManager.sprictGamePadVibration(StartDelay, Duration, WeakMagnitude, StrongMagnitude)
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
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
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.1.0
 * 
 * @help
 * X Inputでのゲームパッドを振動させるためのプラグインです。
 * 
 * 制御文字
 * \VG[id]:ゲームパッドを振動させます。
 * [id]:プラグインパラメータの振動設定リスト番号内のIDを指定します。
 * 
 * スクリプトから指定
 * NuunManager.sprictGamePadVibration(StartDelay, Duration, WeakMagnitude, StrongMagnitude)
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
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
    const parameters = PluginManager.parameters('NUUN_GamePadVibration');
    const OptionGamePadVibrationName = String(parameters['OptionGamePadVibrationName'] || "ゲームパッド振動");
    const VibrationSetting = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['VibrationSetting'])) : [];

    const pluginName = "NUUN_GamePadVibration";
    let _onGamepad = false;

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
//
    function _0x2ef6(){const _0x12f76c=['175490dinPHh','sprictGamePadVibration','465156lTqdHt','actuatorDelay','118465ksQmcy','actuatorDuration','vibrationActuator','StrongMagnitude','14031bwYvni','type','_actuatorData','connected','setupGamePadVibration','37932WakRdc','StartDelay','9896BZWoGN','611208yYgoVc','1161fmBLYK','setVibration','44hfpGEC','Duration','WeakMagnitude','getGamepads','playEffect'];_0x2ef6=function(){return _0x12f76c;};return _0x2ef6();}const _0x352c1c=_0x29d6;function _0x29d6(_0x183981,_0x1deead){const _0x2ef659=_0x2ef6();return _0x29d6=function(_0x29d6bf,_0x5bc2e1){_0x29d6bf=_0x29d6bf-0x1c9;let _0x1990e8=_0x2ef659[_0x29d6bf];return _0x1990e8;},_0x29d6(_0x183981,_0x1deead);}(function(_0xd91a6e,_0x2adbd7){const _0x3c7907=_0x29d6,_0x4d8a70=_0xd91a6e();while(!![]){try{const _0x139cfc=parseInt(_0x3c7907(0x1d0))/0x1+-parseInt(_0x3c7907(0x1d6))/0x2*(-parseInt(_0x3c7907(0x1cb))/0x3)+-parseInt(_0x3c7907(0x1d3))/0x4+parseInt(_0x3c7907(0x1df))/0x5+-parseInt(_0x3c7907(0x1dd))/0x6+parseInt(_0x3c7907(0x1db))/0x7+parseInt(_0x3c7907(0x1d2))/0x8*(parseInt(_0x3c7907(0x1d4))/0x9);if(_0x139cfc===_0x2adbd7)break;else _0x4d8a70['push'](_0x4d8a70['shift']());}catch(_0x3c33b8){_0x4d8a70['push'](_0x4d8a70['shift']());}}}(_0x2ef6,0x1d032),NuunManager[_0x352c1c(0x1dc)]=function(_0x12a53f,_0x1b20c3,_0x4a6d1b,_0x5ee595){const _0x5e38e6=_0x352c1c,_0x34f65a={};_0x34f65a[_0x5e38e6(0x1d1)]=Number(_0x12a53f),_0x34f65a[_0x5e38e6(0x1d7)]=Number(_0x1b20c3),_0x34f65a[_0x5e38e6(0x1d8)]=Number(_0x4a6d1b),_0x34f65a[_0x5e38e6(0x1ca)]=Number(_0x5ee595),this[_0x5e38e6(0x1cf)](_0x34f65a);},NuunManager[_0x352c1c(0x1cf)]=function(_0x3f9526){const _0x552194=_0x352c1c;if(navigator[_0x552194(0x1d9)]&&ConfigManager['gamePadVibration']){const _0x470f7e=navigator[_0x552194(0x1d9)]()[0x0];_0x470f7e&&_0x470f7e[_0x552194(0x1c9)]&&this[_0x552194(0x1d5)](_0x3f9526);}},NuunManager[_0x352c1c(0x1d5)]=function(_0x255783){const _0x4256fd=_0x352c1c;_0x255783[_0x4256fd(0x1d7)]>this[_0x4256fd(0x1e0)]&&(this[_0x4256fd(0x1de)]=_0x255783[_0x4256fd(0x1d1)],this[_0x4256fd(0x1cd)]=_0x255783,this[_0x4256fd(0x1e0)]=_0x255783[_0x4256fd(0x1d7)]);},NuunManager['updateVibration']=function(){const _0x53383e=_0x352c1c;this[_0x53383e(0x1de)]>0x0&&this[_0x53383e(0x1de)]--;if(this[_0x53383e(0x1de)]===0x0&&this[_0x53383e(0x1e0)]>0x0){const _0x21f172=navigator['getGamepads']();for(const _0x4de004 of _0x21f172){if(_0x4de004&&_0x4de004[_0x53383e(0x1ce)]){const _0xc48f12=_0x4de004[_0x53383e(0x1c9)];_0xc48f12&&_0xc48f12[_0x53383e(0x1da)](_0xc48f12[_0x53383e(0x1cc)],{'startDelay':0x0,'duration':0x14,'weakMagnitude':this[_0x53383e(0x1cd)][_0x53383e(0x1d8)],'strongMagnitude':this['_actuatorData'][_0x53383e(0x1ca)]});}}this['actuatorDuration']--;}});

//
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
        const data = VibrationSetting[state -1];
        if (data) {
            NuunManager.setupGamePadVibration(data);
        }
    };


    const _Scene_Options_initialize = Scene_Options.prototype.initialize;
    Scene_Options.prototype.initialize = function() {
        _Scene_Options_initialize.call(this);
        _onGamepad = !!navigator.getGamepads()[0];
    };

    const _Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
    Scene_Options.prototype.maxCommands = function() {
        return _Scene_Options_maxCommands.call(this) + (_onGamepad ? 1 : 0);
    };

    const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function() {
        _Window_Options_addGeneralOptions.call(this);
        if (_onGamepad) {
            this.addCommand(OptionGamePadVibrationName, "gamePadVibration");
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