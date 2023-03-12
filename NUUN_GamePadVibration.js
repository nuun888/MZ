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
 * @version 1.0.1
 * 
 * @help
 * This is a plugin for vibrating the gamepad on X Input.
 * 
 * Specified from script
 * NuunManager.sprictGamePadVibration(StartDelay, Duration, WeakMagnitude, StrongMagnitude)
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
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
 * @version 1.0.1
 * 
 * @help
 * X Inputでのゲームパッドを振動させるためのプラグインです。
 * 
 * スクリプトから指定
 * NuunManager.sprictGamePadVibration(StartDelay, Duration, WeakMagnitude, StrongMagnitude)
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
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

    function _0x540d(){const _0x5173d4=['WeakMagnitude','_actuatorData','12FsiOtk','updateVibration','44554sTURHo','setVibration','4188008zekfAR','505526atlfGh','sprictGamePadVibration','32383350DrfPjU','connected','566235YluxLT','11005353jyvICh','Duration','StrongMagnitude','StartDelay','42bcHFhr','vibrationActuator','35UPnIQp','setupGamePadVibration','actuatorDelay','getGamepads','443188EpDUZr','actuatorDuration'];_0x540d=function(){return _0x5173d4;};return _0x540d();}function _0x5712(_0x5c7638,_0x52463d){const _0x540dd9=_0x540d();return _0x5712=function(_0x5712e4,_0x57060f){_0x5712e4=_0x5712e4-0x148;let _0x3a214c=_0x540dd9[_0x5712e4];return _0x3a214c;},_0x5712(_0x5c7638,_0x52463d);}const _0x298a74=_0x5712;(function(_0x530941,_0x502d46){const _0x104cdb=_0x5712,_0x263558=_0x530941();while(!![]){try{const _0x4f58fe=parseInt(_0x104cdb(0x14a))/0x1+-parseInt(_0x104cdb(0x15b))/0x2*(parseInt(_0x104cdb(0x159))/0x3)+-parseInt(_0x104cdb(0x155))/0x4*(parseInt(_0x104cdb(0x151))/0x5)+-parseInt(_0x104cdb(0x14f))/0x6*(parseInt(_0x104cdb(0x15e))/0x7)+-parseInt(_0x104cdb(0x15d))/0x8+-parseInt(_0x104cdb(0x14b))/0x9+parseInt(_0x104cdb(0x148))/0xa;if(_0x4f58fe===_0x502d46)break;else _0x263558['push'](_0x263558['shift']());}catch(_0x1f4caa){_0x263558['push'](_0x263558['shift']());}}}(_0x540d,0xa7fa7),NuunManager[_0x298a74(0x15f)]=function(_0x481ea6,_0x58a439,_0x4f023e,_0x50fffc){const _0x2cad23=_0x298a74,_0x152a91={};_0x152a91[_0x2cad23(0x14e)]=Number(_0x481ea6),_0x152a91[_0x2cad23(0x14c)]=Number(_0x58a439),_0x152a91['WeakMagnitude']=Number(_0x4f023e),_0x152a91[_0x2cad23(0x14d)]=Number(_0x50fffc),this[_0x2cad23(0x152)](_0x152a91);},NuunManager[_0x298a74(0x152)]=function(_0x546cd5){const _0x30f2f0=_0x298a74;if(navigator['getGamepads']&&ConfigManager['gamePadVibration']){const _0x3c85bb=navigator[_0x30f2f0(0x154)]()[0x0];_0x3c85bb&&_0x3c85bb[_0x30f2f0(0x150)]&&this[_0x30f2f0(0x15c)](_0x546cd5);}},NuunManager[_0x298a74(0x15c)]=function(_0xa20492){const _0x37cf60=_0x298a74;_0xa20492['Duration']>this[_0x37cf60(0x156)]&&(this['actuatorDelay']=_0xa20492[_0x37cf60(0x14e)],this['_actuatorData']=_0xa20492,this[_0x37cf60(0x156)]=_0xa20492[_0x37cf60(0x14c)]);},NuunManager[_0x298a74(0x15a)]=function(){const _0x313e7e=_0x298a74;this[_0x313e7e(0x153)]>0x0&&this[_0x313e7e(0x153)]--;if(this[_0x313e7e(0x153)]===0x0&&this[_0x313e7e(0x156)]>0x0){const _0x28f36b=navigator[_0x313e7e(0x154)]();for(const _0x3cf18e of _0x28f36b){if(_0x3cf18e&&_0x3cf18e[_0x313e7e(0x149)]){const _0x21d227=_0x3cf18e[_0x313e7e(0x150)];_0x21d227&&_0x21d227['playEffect'](_0x21d227['type'],{'startDelay':0x0,'duration':0x14,'weakMagnitude':this[_0x313e7e(0x158)][_0x313e7e(0x157)],'strongMagnitude':this[_0x313e7e(0x158)][_0x313e7e(0x14d)]});}}this[_0x313e7e(0x156)]--;}});

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