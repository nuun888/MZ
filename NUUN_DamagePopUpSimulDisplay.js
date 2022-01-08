/*:-----------------------------------------------------------------------------------
 * NUUN_DamagePopUpSimulDisplay.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc ダメージポップアップ同時表示
 * @author NUUN
 * @version 1.0.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * 通常ダメージ対象はHP、MPのどちらかしか選択できません。
 * しかし、プラグインでHP、MPの両方のダメージを受けるとHPのポップアップしか表示されません。
 * このプラグインでは両方ダメージを受けてもHP、MP同時に表示させます。
 * TPダメージのポップアップも表示できます。
 * 
 * 更新履歴
 * 2022/1/8 Ver.1.0.0
 * 初版
 * 
 * @param TPDamageColor
 * @desc TPダメージの色。（システムカラー　※テキストタブでカラーコード入力可能）
 * @text TPダメージ色
 * @type number
 * @default 0
 * @min 0
 * 
 * @param TPRecoveryColor
 * @desc TP回復の色。（システムカラー　※テキストタブでカラーコード入力可能）
 * @text TP回復色
 * @type number
 * @default 0
 * @min 0
 * 
 * @param UpdateFlame
 * @desc ポップアップを表示する間隔。
 * @text ポップアップ間隔
 * @type number
 * @default 30
 * @min 0
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_DamagePopUpSimulDisplay = true;

(() => {
const parameters = PluginManager.parameters('NUUN_DamagePopUpSimulDisplay');
const TPDamageColor = DataManager.nuun_structureData(parameters['TPDamageColor']);
const TPRecoveryColor = DataManager.nuun_structureData(parameters['TPRecoveryColor']);
const UpdateFlame = Number(parameters['UpdateFlame'] || 30);
let mpPopup = false;
let tpPopup = false;


const _Sprite_Battler_createDamageSprite = Sprite_Battler.prototype.createDamageSprite;
Sprite_Battler.prototype.createDamageSprite = function() {
    mpPopup = false;
    tpPopup = false;
    _Sprite_Battler_createDamageSprite.call(this);
    const result = this._battler.result();
    if (!(result.missed || result.evaded)) {
        let _hpAffected = true;
        let _mpDamage = 0;
        if (!mpPopup && result.mpDamage !== 0 && result.hpAffected) {
            _hpAffected = result.hpAffected;
            result.hpAffected = false;
            _Sprite_Battler_createDamageSprite.call(this);
            this._damages[this._damages.length - 1].setDelay((this._damages.length - 1) * UpdateFlame);
        }
        if (!tpPopup && result.tpDamage !== 0) {
            if (result.hpAffected) {
                _hpAffected = result.hpAffected;
                result.hpAffected = false;
            }
            _mpDamage = result.mpDamage;
            result.mpDamage = 0;
            _Sprite_Battler_createDamageSprite.call(this);
            this._damages[this._damages.length - 1].setDelay((this._damages.length - 1) * UpdateFlame);
        }
        result.hpAffected = _hpAffected;
        result.mpDamage = _mpDamage;
    }
};

const _Sprite_Damage_initialize = Sprite_Damage.prototype.initialize;
Sprite_Damage.prototype.initialize = function() {
    _Sprite_Damage_initialize.call(this);
    this._onPopup = false;
};

const _Sprite_Damage_setup = Sprite_Damage.prototype.setup;
Sprite_Damage.prototype.setup = function(target) {
    _Sprite_Damage_setup.call(this, target);
    if (!this._onPopup) {
        const result = target.result();
        if (result.mpDamage !== 0) {
            this._colorType = result.mpDamage >= 0 ? 2 : 3;
            this.createDigits(result.mpDamage);
            mpPopup = true;
        } else if (result.tpDamage !== 0) {
            this._colorType = result.tpDamage >= 0 ? 100 : 101;
            this.createDigits(result.tpDamage);
            tpPopup = true;
        }
    }
};

Sprite_Damage.prototype.setDelay = function(delay) {
    this.delay = delay;
};

const _Sprite_Damage_update = Sprite_Damage.prototype.update;
Sprite_Damage.prototype.update = function() {
    if (this.delay > 0) {
        this.delay--;
        this.opacity = this.delay === 0 ? 255 : 0;
        return;
    }
    _Sprite_Damage_update.call(this);
};

const _Sprite_Damage_createMiss = Sprite_Damage.prototype.createMiss;
Sprite_Damage.prototype.createMiss = function() {
    _Sprite_Damage_createMiss.call(this);
    this._onPopup = true;
};

const _Sprite_Damage_createDigits = Sprite_Damage.prototype.createDigits;
Sprite_Damage.prototype.createDigits = function(value) {
    _Sprite_Damage_createDigits.call(this, value)
    this._onPopup = true;
};

const _Game_Battler_shouldPopupDamage = Game_Battler.prototype.shouldPopupDamage;
Game_Battler.prototype.shouldPopupDamage = function() {
    return _Game_Battler_shouldPopupDamage.call(this) || this._result.tpDamage;
};

const _ColorManager_damageColor = ColorManager.damageColor;
ColorManager.damageColor = function(colorType) {
    switch (colorType) {
        case 100:
            return NuunManager.getColorCode(TPDamageColor);
        case 101:
            return NuunManager.getColorCode(TPRecoveryColor);
        default:
            return _ColorManager_damageColor.call(this, colorType);
    }
};

})();