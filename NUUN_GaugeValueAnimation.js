/*:-----------------------------------------------------------------------------------
 * NUUN_GaugeValueAnimation.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 更新履歴
 * 2021/1/26 Ver.1.0.1
 * プラグインパラメータの方式を変更。
 * ゲージ、数値のアニメーション時間を個別に設定できるよ機能を追加。
 * 初版
 * 2021/1/26 Ver.1.0.0
 * 初版
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc ゲージの数値更新アニメーション
 * @author NUUN
 * @version 1.0.1
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
 * @param UpdateFlameValue
 * @text ゲージ及び数値変化の更新フレーム数を指定します。（60で１秒）
 * @desc ゲージ及び数値更新フレーム設定
 * @default ["{\"StatusType\":\"hp\",\"UpdateFlame\":\"20\"}","{\"StatusType\":\"mp\",\"UpdateFlame\":\"20\"}","{\"StatusType\":\"tp\",\"UpdateFlame\":\"60\"}"]
 * @type struct<UpdateFlameValueDate>[]
 *
 */
/*~struct~UpdateFlameValueDate:
 * 
 * @param StatusType
 * @text ステータス
 * @desc ステータス。
 * @type string
 * 
 * @param UpdateFlame
 * @desc ゲージ及び数値変化の更新フレーム数を指定します。（60で１秒）0または入力なしでデフォルト設定値となります。
 * @text ゲージ及び数値更新フレーム
 * @type number
 * @default 20
 * 
 */

var Imported = Imported || {};
Imported.NUUN_GaugeValueAnimation = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_GaugeValueAnimation');
  const param = JSON.parse(JSON.stringify(parameters, function(key, value) {
    try {
        return JSON.parse(value);
    } catch (e) {
        try {
            return eval(value);
        } catch (e) {
            return value;
        }
    }
  }));

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

  Sprite_Gauge.prototype.currentValueMove = function(currentValue) {
    if (this._moveDelay === 0) {
      this._moveDelay = (currentValue - this._moveValue) / this.smoothness();
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
  
  const _Sprite_Gauge_smoothness = Sprite_Gauge.prototype.smoothness;
  Sprite_Gauge.prototype.smoothness = function() {
    const find = this.getFlameStatus();
    if (find && find.UpdateFlame) {
      return find.UpdateFlame;
    }
    return _Sprite_Gauge_smoothness.call(this);
  };

  Sprite_Gauge.prototype.getFlameStatus = function() {
    return param.UpdateFlameValue ? param.UpdateFlameValue.find(value => (this._statusType === value.StatusType)) : null;
  };
})();