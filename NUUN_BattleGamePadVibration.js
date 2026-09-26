/*:-----------------------------------------------------------------------------------
 * NUUN_BattleGamePadVibration.js
 * 
 * Copyright (C) 2026 NUUN
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Battle Gamepad Vibration
 * @author NUUN
 * @base NUUN_GamePadVibration
 * @orderAfter NUUN_GamePadVibration
 * @version 1.0.0
 * 
 * @help
 * Vibrates the gamepad when an ally takes damage during battle or when a boss is defeated.
 * This plugin is an extension plugin for NUUN_GamePadVibration.
 * 
 * Terms of Use
 * Credit: Optional
 * Commercial use: Possible
 * Modifications: Possible
 * Redistribution: Possible
 * Support is not available for modified versions or downloads from sources other than https://github.com/nuun888/MZ, the official forum, or authorized retailers.
 * 
 * Log
 * 9/26/2026 Ver.1.0.0
 * First edition.
 * 
 * @param DamageVibration
 * @desc Enables gamepad vibration when an ally takes damage.
 * @text Vibration on Ally Damage
 * @type boolean
 * @default false
 * 
 * @param DamageVibrationSetting
 * @text Damage Vibration Settings
 * @desc Configures the vibration when an ally takes damage.
 * @type struct<VibrationData>
 * @default {"StartDelay":"0","Duration":"20","WeakMagnitude":"1.0","StrongMagnitude":"1.0"}
 * 
 * @param CriticalVibration
 * @text Vibration on Ally Critical Damage
 * @desc Enables gamepad vibration when an ally takes critical damage.
 * @type boolean
 * @default false
 * 
 * @param CriticalVibrationSetting
 * @text Critical Damage Vibration Settings
 * @desc Configures the vibration when an ally takes critical damage.
 * @type struct<VibrationData>
 * @default {"StartDelay":"0","Duration":"20","WeakMagnitude":"1.0","StrongMagnitude":"1.0"}
 * 
 * @param BossCollapseVibration
 * @desc Enables gamepad vibration during the boss collapse effect.
 * @text Vibration on Boss Collapse
 * @type boolean
 * @default false
 * 
 * @param BossCollapseVibrationSetting
 * @text Boss Collapse Vibration Settings
 * @desc Configures the vibration during the boss collapse effect. The vibration duration does not need to be specified.
 * @type struct<VibrationData>
 * @default {"StartDelay":"0","Duration":"0","WeakMagnitude":"1.0","StrongMagnitude":"1.0"}
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
 * @plugindesc 戦闘時ゲームパッド振動
 * @author NUUN
 * @base NUUN_GamePadVibration
 * @orderAfter NUUN_GamePadVibration
 * @version 1.0.0
 * 
 * @help
 * 戦闘中に味方がダメージを受けたときや、ボスが消滅するときにゲームパッドを振動させます。
 * このプラグインはNUUN_GamePadVibrationの拡張プラグインです。
 * 
 * 利用規約
 * クレジット表記：任意
 * 商業利用：可能
 * 改変：可能
 * 再配布：可能
 * https://github.com/nuun888/MZ、公式フォーラム、正規販売サイト以外からのダウンロード、改変済みの場合はサポートは対象外となります。
 * 
 * 更新履歴
 * 2026/9/26 Ver.1.0.0
 * 初版。
 * 
 * @param DamageVibration
 * @desc 味方ダメージ時のゲームパッドの振動を有効にします。
 * @text 味方ダメージ時振動有効
 * @type boolean
 * @default false
 * 
 * @param DamageVibrationSetting
 * @text ダメージ時振動設定
 * @desc ダメージ時の振動の設定を行います。
 * @type struct<VibrationData>
 * @default {"StartDelay":"0","Duration":"20","WeakMagnitude":"1.0","StrongMagnitude":"1.0"}
 * 
 * @param CriticalVibration
 * @desc 味方クリティカルダメージ時のゲームパッドの振動を有効にします。
 * @text 味方クリティカルダメージ時振動有効
 * @type boolean
 * @default false
 * 
 * @param CriticalVibrationSetting
 * @text クリティカルダメージ時振動設定
 * @desc クリティカルダメージ時の振動を設定します。
 * @type struct<VibrationData>
 * @default {"StartDelay":"0","Duration":"20","WeakMagnitude":"1.0","StrongMagnitude":"1.0"}
 * 
 * @param BossCollapseVibration
 * @desc ボス消滅エフェクト時のゲームパッドの振動を有効にします。
 * @text ボス消滅時振動有効
 * @type boolean
 * @default false
 * 
 * @param BossCollapseVibrationSetting
 * @text ボス消滅時振動設定
 * @desc ボス消滅エフェクト時の振動の設定を行います。振動フレーム数は入力しません。
 * @type struct<VibrationData>
 * @default {"StartDelay":"0","Duration":"0","WeakMagnitude":"1.0","StrongMagnitude":"1.0"}
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
Imported.NUUN_BattleGamePadVibration = true;

(() => {
    const params = Nuun_PluginParams_GamePadVibration.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;

    NuunGamePadVibrationManager.battleGamePadVibrationParams = function(code) {
        switch (code) {
            case 0:
                return params.DamageVibration;
            case 1:
                return params.DamageVibrationSetting;
            case 2:
                return params.CriticalVibration;
            case 3:
                return params.CriticalVibrationSetting;
            case 4:
                return params.BossCollapseVibration;
            case 5:
                return params.BossCollapseVibrationSetting;
        }
    };

    const _Window_BattleLog_displayHpDamage = Window_BattleLog.prototype.displayHpDamage;
    Window_BattleLog.prototype.displayHpDamage = function(target) {
        if (target.isActor() && target.result().hpAffected && target.result().hpDamage > 0 && !target.result().drain) {
            this.push("performVibration", target, target.result().critical);
        }
        _Window_BattleLog_displayHpDamage.call(this, target);
    };
        
    Window_BattleLog.prototype.performVibration = function(target, mode) {
        target.performVibration(mode);
    };
    
    Game_Actor.prototype.performVibration = function(critical) {
        if (critical && NuunGamePadVibrationManager.battleGamePadVibrationParams(2)) {
            NuunGamePadVibrationManager.setupGamePadVibration(NuunGamePadVibrationManager.battleGamePadVibrationParams(3));
        } else if (NuunGamePadVibrationManager.battleGamePadVibrationParams(0)) {
            NuunGamePadVibrationManager.setupGamePadVibration(NuunGamePadVibrationManager.battleGamePadVibrationParams(1));
        }
    };
    
    const _Sprite_Enemy_startBossCollapse = Sprite_Enemy.prototype.startBossCollapse;
    Sprite_Enemy.prototype.startBossCollapse = function() {
        _Sprite_Enemy_startBossCollapse.call(this);
        if (NuunGamePadVibrationManager.battleGamePadVibrationParams(4)) {
            const vibration = NuunGamePadVibrationManager.battleGamePadVibrationParams(5);
            if (!vibration) return;
            const cloneVibration = {...vibration};
            cloneVibration.Duration = this.bitmap.height;
            NuunGamePadVibrationManager.setupGamePadVibration(cloneVibration);
        }
    };


    
})();