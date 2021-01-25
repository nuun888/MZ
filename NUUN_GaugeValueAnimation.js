/*:-----------------------------------------------------------------------------------
 * NUUN_GaugeValueAnimation.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 更新履歴
 * 2021/1/26 Ver.1.0.0
 * 初版
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc ゲージの数値増減アニメーション
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * ゲージの数値の増減をアニメーションさせます。
 * 例えば３００のダメージを受けた場合、数値変化の更新フレームが６０の場合
 * １フレームごとに５ずつ数値が減りながら表示されます。
 * 
 * 通常マップ上ではゲージはアニメーションせずに増減しますが、このプラグインではマップ上でもゲージの増減をアニメーションさせます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * @param UpdateFlame
 * @desc ゲージ及び数値変化の更新フレーム数を指定します。（60で１秒）
 * @text ゲージ及び数値更新フレーム
 * @type number
 * @default 20
 * @min 0
 * 
 * @param UpdateFlameValue
 * @desc ゲージ更新対象。（カンマ区切り）競合対策
 * @text ゲージ更新対象
 * @type string
 * @default hp,mp,tp
 *
 */
var Imported = Imported || {};
Imported.NUUN_GaugeValueAnimation = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_GaugeValueAnimation');
  const UpdateFlame = Number(parameters['UpdateFlame'] || 60);
  const UpdateFlameValue = String(parameters['UpdateFlameValue'] || "hp,mp,tp").split(',');

  const _Sprite_Gauge_initMembers = Sprite_Gauge.prototype.initMembers;
  Sprite_Gauge.prototype.initMembers = function() {
    _Sprite_Gauge_initMembers.call(this);
    this._moveMode = false;
    this._moveDelay = 0;
    this._moveValue = NaN;
  };

  Sprite_Gauge.prototype.setup = function(battler, statusType) {
    this._battler = battler;
    this._statusType = statusType;
    this._value = isNaN(this._value) ? this.currentValue() : this._value;
    this._maxValue = isNaN(this._maxValue) ? this.currentMaxValue() : this._maxValue;
    this._moveMode = false;
    this._moveDelay = 0;
    this._moveValue = isNaN(this._moveValue) ? this.currentValue() : this._moveValue;
    this.updateBitmap();
  };

  const _Sprite_Gauge_updateBitmap = Sprite_Gauge.prototype.updateBitmap;
  Sprite_Gauge.prototype.updateBitmap = function() {
    _Sprite_Gauge_updateBitmap.call(this);
    const value = this.currentValue();
    if (this._moveValue !== value) {
      this.valueRedraw();
    }
  };

  Sprite_Gauge.prototype.valueRedraw = function() {
    this.currentValueMove(this.currentValue());
    Sprite_Gauge.prototype.redraw.call(this);
  };

  Sprite_Gauge.prototype.currentValueMove = function(currentValue) {
    if (this._moveDelay === 0) {
      this._moveDelay = (currentValue - this._moveValue) / UpdateFlame;
    }
    if (this._moveValue > currentValue) {
      this._moveValue += this._moveDelay;
      if (this._moveValue <= currentValue) {
        this._moveValue = currentValue;
        this._moveDelay = 0;
      }
    } else if (this._moveValue < currentValue) {
        this._moveValue += this._moveDelay;
      if (this._moveValue >= currentValue) {
        this._moveValue = currentValue;
        this._moveDelay = 0;
      }
    }
  };

  const _Sprite_Gauge_currentValue = Sprite_Gauge.prototype.currentValue;
  Sprite_Gauge.prototype.currentValue = function() {
    if (this._battler && this._moveMode) {
      this._moveMode = false;
      return Math.round(this._moveValue);
    }
    return _Sprite_Gauge_currentValue.call(this);
  };

  const _Sprite_Gauge_drawValue = Sprite_Gauge.prototype.drawValue;
  Sprite_Gauge.prototype.drawValue = function() {
    this._moveMode = true;
    _Sprite_Gauge_drawValue.call(this);
  };

  const _Sprite_Gauge_smoothness = Sprite_Gauge.prototype.smoothness;
  Sprite_Gauge.prototype.smoothness = function() {
    const find = UpdateFlameValue.find(value => (this._statusType === value));
    if (find) {
      return UpdateFlame;
    }
    return _Sprite_Gauge_smoothness.call(this);
  };

})();