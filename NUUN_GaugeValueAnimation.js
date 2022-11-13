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
 * @plugindesc Gauge numerical update animation
 * @author NUUN
 * @version 1.2.2
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_GaugeValueEX
 * 
 * 
 * @help
 * When the numbers displayed in gauges such as damage, recovery, and consumption change, by default they change to the numbers after the change in an instant.
 * In this plug-in, the numerical value of the gauge is displayed by increasing or decreasing with animation. By default, the value is gradually changed over 20 frames.
 * Also, on the map, the gauge will change without animation, but with this plug-in, both the gauge and the numerical value will change gradually.
 * If you do not want to animate the numerical value of the gauge, set the value of "OnUpdateValue" (numerical change animation) of the corresponding plug-in parameter to false.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 11/13/2022 Ver.1.2.2
 * Fixed an issue where gauges would not switch with some plugins.
 * Changed the display in languages other than Japanese to English.
 * 6/12/2022 Ver.1.2.1
 * Fixed an issue where the default settings for Gauge and Numerical Update Frame Settings were not applied correctly.
 * 1/1/2022 Ver.1.2.0
 * Combo box for setting of status type to apply.
 * Processing refactoring.
 * 3/27/2021 Ver.1.1.2
 * Fixed the problem that the numerical animation does not stop when the change value is reversed during the numerical animation.
 * 3/1/2021 Ver.1.1.1
 * Fixed update processing of gauge numbers.
 * 2/19/2021 Ver.1.1.0
 * Added a feature that does not animate certain gauge values.
 * 1/26/2021 Ver.1.0.1
 * Changed the method of plug-in parameters.
 * Added a function that allows you to set the animation time of the gauge and numerical value separately.
 * 1/26/2021 Ver.1.0.0
 * first edition.
 * 
 * @param UpdateFlameValue
 * @text Gauge and numerical update frame settings
 * @desc Specifies the number of update frames for gauges and numerical changes. (1 second at 60)
 * @default ["{\"StatusType\":\"'hp'\",\"UpdateFlame\":\"20\",\"OnUpdateValue\":\"true\"}","{\"StatusType\":\"'mp'\",\"UpdateFlame\":\"20\",\"OnUpdateValue\":\"true\"}","{\"StatusType\":\"'tp'\",\"UpdateFlame\":\"60\",\"OnUpdateValue\":\"true\"}"]
 * @type struct<UpdateFlameValueDate>[]
 *
 */
/*~struct~UpdateFlameValueDate:
 * 
 * @param StatusType
 * @text Status type
 * @desc Status type to apply.
 * @type combo
 * @option 'hp'
 * @option 'mp'
 * @option 'tp'
 * @default 
 * 
 * @param UpdateFlame
 * @desc Specifies the number of update frames for gauges and numerical changes. (1 second for 60 frames) 0 or no input will be the default setting value.
 * @text Gauge and numerical update frame
 * @type number
 * @default 20
 * 
 * @param OnUpdateValue
 * @desc Enable animation of numeric change.
 * @text Numeric change animation
 * @type boolean
 * @default true
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc ゲージの数値更新アニメーション
 * @author NUUN
 * @version 1.2.2
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_GaugeValueEX
 * 
 * 
 * @help
 * ダメージや回復、消費などのゲージに表示されている数値が変化する時、デフォルトでは一瞬で変化後の数値に変化します。
 * このプラグインではゲージの数値でアニメーションで増減させて表示させます。デフォルトでは２０フレームかけて数値を徐々に変化させます。
 * またマップ上ではゲージの変化はアニメーションをせずに変化してしまいますが、このプラグインではゲージ、数値ともに徐々に変化するようになります。
 * ゲージの数値のアニメーションをさせない場合は、該当のプラグインパラメータの「OnUpdateValue」（数値変化アニメーショ）の値をfalseに設定してください。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/11/13 Ver.1.2.2
 * 一部のプラグインでゲージが切り替わらない問題を修正。
 * 日本語以外での表示を英語表示に変更。
 * 2022/6/12 Ver.1.2.1
 * ゲージ及び数値更新フレーム設定のデフォルト設定で正常に適用されなかった問題を修正。
 * 2022/1/1 Ver.1.2.0
 * 適用するステータスタイプの設定をコンボボックス化。
 * 処理のリファクタリング。
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
 * @desc ゲージ及び数値変化の更新フレーム数を指定します。（60で１秒）
 * @text ゲージ及び数値更新フレーム設定
 * @default ["{\"StatusType\":\"'hp'\",\"UpdateFlame\":\"20\",\"OnUpdateValue\":\"true\"}","{\"StatusType\":\"'mp'\",\"UpdateFlame\":\"20\",\"OnUpdateValue\":\"true\"}","{\"StatusType\":\"'tp'\",\"UpdateFlame\":\"60\",\"OnUpdateValue\":\"true\"}"]
 * @type struct<UpdateFlameValueDate>[]
 *
 */
/*~struct~UpdateFlameValueDate:ja
 * 
 * @param StatusType
 * @text ステータスタイプ
 * @desc 適用するステータスタイプ。
 * @type combo
 * @option 'hp'
 * @option 'mp'
 * @option 'tp'
 * @default 
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
  const UpdateFlameValue = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['UpdateFlameValue'])) : null) || [];

  const _Sprite_Gauge_initMembers = Sprite_Gauge.prototype.initMembers;
  Sprite_Gauge.prototype.initMembers = function() {
    _Sprite_Gauge_initMembers.call(this);
    this._smoothnessMode = null;
    this._moveMode = false;
  };

  const _Sprite_Gauge_setup = Sprite_Gauge.prototype.setup;
  Sprite_Gauge.prototype.setup = function(battler, statusType) {
    if (!this._smoothnessMode || this._battler !== battler) {
      this._smoothnessMode = false;
      _Sprite_Gauge_setup.call(this, battler, statusType);
      this._smoothnessMode = this.getFlameStatus();
    }
  };

  const _Sprite_Gauge_drawValue = Sprite_Gauge.prototype.drawValue;
  Sprite_Gauge.prototype.drawValue = function() {
    this._moveMode = this._smoothnessMode && this._smoothnessMode.OnUpdateValue;
    _Sprite_Gauge_drawValue.call(this);
  };

  const _Sprite_Gauge_currentValue = Sprite_Gauge.prototype.currentValue;
  Sprite_Gauge.prototype.currentValue = function() {
    if (this._battler && this._moveMode) {
      this._moveMode = false;
      return Math.round(this._value);
    }
    return _Sprite_Gauge_currentValue.call(this);
  };

  Sprite_Gauge.prototype.getFlameStatus = function() {
    return UpdateFlameValue ? UpdateFlameValue.find(value => (this._statusType === value.StatusType)) : null;
  };

  const _Sprite_Gauge_smoothness = Sprite_Gauge.prototype.smoothness;
  Sprite_Gauge.prototype.smoothness = function() {
    return this._smoothnessMode ? this._smoothnessMode.UpdateFlame : _Sprite_Gauge_smoothness.call(this);
  };
  
})();