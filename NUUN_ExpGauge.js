/*:-----------------------------------------------------------------------------------
 * NUUN_ExpGauge.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc 経験値ゲージ
 * @author NUUN
 * @version 1.0.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * 外部プラグインで経験値ゲージを表示させるためのプラグインです。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/7/17 Ver.1.0.0
 * 初版
 * 
 * @param ExpName
 * @text 識別名
 * @desc 識別名(ゲージ画像化等で指定する場合は、このプラグインパラメータでのパラメータ名を指定してください)
 * @type string
 * @default exp
 * 
 * @param ExpPercent
 * @text 経験値百分率表示
 * @desc 経験値を百分率で表示
 * @type boolean
 * @default false
 * 
 * @param EXPGaugeColor1
 * @text 経験値ゲージ色１
 * @desc 経験値ゲージの色１(システムカラーまたはカラーインデックス(テキストタブ))
 * @type number
 * @default 17
 * 
 * @param EXPGaugeColor2
 * @text 経験値ゲージ色２
 * @desc 経験値ゲージの色２(システムカラーまたはカラーインデックス(テキストタブ))
 * @type number
 * @default 6
 * 
 * @param EXPGaugeX
 * @text EXPゲージX座標
 * @desc EXPゲージのX座標（相対）
 * @type number
 * @default 0
 * 
 * @param EXPGaugeY
 * @text EXPゲージY座標
 * @desc EXPゲージのY座標（相対）
 * @type number
 * @default 0
 * 
 * @param EXPGaugeWidth
 * @text EXPゲージ横幅
 * @desc EXPゲージの横幅を指定します。
 * @type number
 * @default 300
 * 
 * @param EXPGaugeHeight
 * @text EXPゲージ縦幅
 * @desc EXPゲージの横幅縦を指定します。
 * @type number
 * @default 12
 * 
 * @param DecimalMode
 * @text 端数処理四捨五入
 * @desc 表示外小数点を四捨五入で丸める。（falseで切り捨て）
 * @type boolean
 * @default true
 * 
 * @param EXPDecimal
 * @text 小数点桁数
 * @desc 表示出来る小数点桁数。
 * @type number
 * @default 2
 * @min 0
 * @max 99
 * 
 */


var Imported = Imported || {};
Imported.NUUN_ExpGauge = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_ExpGauge');
    const ExpName = String(parameters['ExpName'] || 'exp');
    const EXPGaugeWidth = Number(parameters['EXPGaugeWidth'] || 300);
    const EXPGaugeHeight = Number(parameters['EXPGaugeHeight'] || 12);
    const EXPGaugeX = Number(parameters['EXPGaugeX'] || 0);
    const EXPGaugeY = Number(parameters['EXPGaugeY'] || 0);
    const EXPGaugeColor1 = (DataManager.nuun_structureData(parameters['EXPGaugeColor1'])) || 17;
    const EXPGaugeColor2 = (DataManager.nuun_structureData(parameters['EXPGaugeColor2'])) || 6;
    const EXPDecimal = Number(parameters['EXPDecimal'] || 2);
    const DecimalMode = eval(parameters['DecimalMode'] || "true");
    const ExpPercent = eval(parameters['ExpPercent'] || "false");

    Window_StatusBase.prototype.nuun_placeExpGauge = function(actor, x, y) {
        const type = ExpName;
        const key = "actor%1-gauge-%2".format(actor.actorId(), type);
        const sprite = this.createInnerSprite(key, Sprite_NuunExpGauge);
        sprite.setup(actor, type);
        sprite.move(x + EXPGaugeX, y + EXPGaugeY);
        sprite.show();
    };
    

    function Sprite_NuunExpGauge() {
        this.initialize(...arguments);
    }
      
    Sprite_NuunExpGauge.prototype = Object.create(Sprite_Gauge.prototype);
    Sprite_NuunExpGauge.prototype.constructor = Sprite_NuunExpGauge;

    Sprite_NuunExpGauge.prototype.initialize = function() {
        Sprite_Gauge.prototype.initialize.call(this);
    };
      
    Sprite_NuunExpGauge.prototype.bitmapWidth = function() {
        return EXPGaugeWidth;
    };
      
    Sprite_NuunExpGauge.prototype.gaugeHeight = function() {
        return EXPGaugeHeight;
    };
      
    Sprite_NuunExpGauge.prototype.drawValue = function() {
        let currentValue = 0;
        const width = this.bitmapWidth();
        const height = typeof this.textHeight === 'function' ? this.textHeight() : this.bitmapHeight();
        this.setupValueFont();
        if (ExpPercent) {
          currentValue = this._battler.isMaxLevel() ? "100%" : this.numPercentage(this.currentPercent(), EXPDecimal, DecimalMode) +"%";
        } else {
          currentValue = this._battler.isMaxLevel() ? "-------" : this._battler.nextRequiredExp();
        }
        this.bitmap.drawText(currentValue, 0, 0, width, height, "right");
    };

    Sprite_NuunExpGauge.prototype.numPercentage = function(num, digits, mode) {
        if (isNaN(num)) { return num }
        return (mode ? Math.round(num * Math.pow(10, digits + 2)) : Math.floor(num * Math.pow(10, digits + 2))) / Math.pow(10, digits + 0);
    };
      
    Sprite_NuunExpGauge.prototype.currentPercent = function() {
        return (this._battler.currentExp() - this._battler.currentLevelExp()) / (this._battler.nextLevelExp() - this._battler.currentLevelExp());
    };
      
    Sprite_NuunExpGauge.prototype.currentValue = function() {
        if (this._battler) {
            return this._battler.isMaxLevel() ? this.currentMaxValue() : this._battler.currentExp() - this._battler.currentLevelExp();
        }
    };
      
    Sprite_NuunExpGauge.prototype.currentMaxValue = function() {
        if (this._battler) {
            return this._battler.nextLevelExp() - this._battler.currentLevelExp();
        }
    };
      
    Sprite_NuunExpGauge.prototype.gaugeColor1 = function() {
        return NuunManager.getColorCode(EXPGaugeColor1);
    };
      
    Sprite_NuunExpGauge.prototype.gaugeColor2 = function() {
        return NuunManager.getColorCode(EXPGaugeColor2);
    };

})();