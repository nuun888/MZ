/*:-----------------------------------------------------------------------------------
 * NUUN_GaugeValueAnimation.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc ゲージの数値更新アニメーション
 * @author NUUN
 * @version 1.0.2
 * 
 * @help
 * ダメージや回復、消費などのゲージに表示されている数値が変化する時、デフォルトでは一瞬で変化後の
 * 数値に変化します。
 * このプラグインではゲージの数値でアニメーションで増減させて表示させます。デフォルトでは２０フレームかけて数値を徐々に変化させます。
 * またマップ上ではゲージの変化はアニメーションをせずに変化してしまいますが、このプラグインではゲージ、数値ともに徐々に変化するようになります。
 * ゲージの数値のアニメーションをさせない場合は、該当のプラグインパラメータの「OnUpdateValue」（数値変化アニメーショ）の値をfalseに設定してください。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/3/27 Ver.1.1.2
 * 数値アニメーション中に変動値が正負逆になった時、数値アニメーションが止まらなくなる問題を修正。
 * 2021/3/1 Ver.1.1.1
 * ゲージ数値の更新処理を修正。
 * 2021/2/19 Ver.1.1.0
 * 特定のゲージの数値をアニメーションさせない機能を追加。
 * 2021/1/26 Ver.1.0.1
 * プラグインパラメータの方式を変更。
 * ゲージ、数値のアニメーション時間を個別に設定できるよ機能を追加。
 * 2021/1/26 Ver.1.0.0
 * 初版
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
 * @param OnUpdateValue
 * @desc 数値変化のアニメーションを有効にします。
 * @text 数値変化アニメーション
 * @type boolean
 * @default true
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
    this._smoothnessMode = this.getFlameStatus();
    this._value = isNaN(this._value) ? this.currentValue() : this._value;
    this._maxValue = isNaN(this._maxValue) ? this.currentMaxValue() : this._maxValue;
    this._moveMode = false;
    this._moveDelay = 0;
    this._moveValue = isNaN(this._moveValue) ? this.currentValue() : this._moveValue;
    this.updateBitmap();
  };

  const _Sprite_Gauge_updateTargetValue = Sprite_Gauge.prototype.updateTargetValue;
  Sprite_Gauge.prototype.updateTargetValue = function(value, maxValue) {
    if (this._moveDelay !== 0) {
      this._moveDelay = 0;
    }
    _Sprite_Gauge_updateTargetValue.call(this, value, maxValue)
  };

  const _Sprite_Gauge_updateBitmap = Sprite_Gauge.prototype.updateBitmap;
  Sprite_Gauge.prototype.updateBitmap = function() {
    _Sprite_Gauge_updateBitmap.call(this);
    const value = this.currentValue();
    if (this._moveValue !== value && this._smoothnessMode) {
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
      this._moveDelay = (currentValue - this._moveValue) / (this._smoothnessMode && this._smoothnessMode.OnUpdateValue ? this.smoothness() : 1);
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
    if (this._smoothnessMode && this._smoothnessMode.UpdateFlame) {
      return this._smoothnessMode.UpdateFlame;
    }
    return _Sprite_Gauge_smoothness.call(this);
  };

  Sprite_Gauge.prototype.getFlameStatus = function() {
    return param.UpdateFlameValue ? param.UpdateFlameValue.find(value => (this._statusType === value.StatusType)) : null;
  };
})();