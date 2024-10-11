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
 * @version 1.3.0
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
 * Experience value animation
 * Experience value animation only supports the currently acquired experience value.
 * Only compatible with NUUN plugins.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 9/28/2024 Ver.1.3.0
 * Supports gauge loop processing.
 * 9/28/2024 Ver.1.2.3
 * Processing fixes.
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
 * @option 'menuexp'
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
 * @version 1.3.0
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
 * 経験値の数値アニメーション
 * 経験値の数値アニメーションの対象は現在の獲得経験値のみ対応しています。
 * NUUN系プラグインのみの対応です。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/10/12 Ver.1.3.0
 * ゲージのループ処理に対応。
 * 2024/9/28 Ver.1.2.3
 * 処理の修正。
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
 * @option 'menuexp'
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

    function _clone(param) {
        return JSON.parse(JSON.stringify(param));
    };

    const _Sprite_Gauge_initMembers = Sprite_Gauge.prototype.initMembers;
    Sprite_Gauge.prototype.initMembers = function() {
        this._looping = this.isLoopingGauge();
        _Sprite_Gauge_initMembers.call(this);
        this._smoothnessMode = null;
        this._valueDelay = 0;
        this._moveMode = false;
        if (this._looping) {
            this.initLoopingGauge();
        }
    };

    Sprite_Gauge.prototype.initLoopingGauge = function() {
        this._nowLevel = 0;
        this._instant = 0;
        this._gainValue = 0;
        this._loopingMoveDelay = 0;
        this._currentMoveValue = 0;
        this._startCurrentValue = 0;
        this._endCurrentValue = 0;
        this._startCurrentMoveValue = 0;
        this._loopingMoveValue = NaN;
    };

    Sprite_Gauge.prototype.isLoopingGauge = function() {
        if (this._statusType === undefined) return NaN;
        switch (this._statusType) {
            case "menuexp":
                return true;
            default:
                return false;
        }
    };

    const _Sprite_Gauge_setup = Sprite_Gauge.prototype.setup;
    Sprite_Gauge.prototype.setup = function(battler, statusType) {
        if (!this._smoothnessMode || this._battler !== battler) {
            this._smoothnessMode = false;
            _Sprite_Gauge_setup.call(this, battler, statusType);
            this._smoothnessMode = this.getFlameStatus();
            if (isNaN(this._looping)) {
                this._looping = this.isLoopingGauge();
                if (this._looping) {
                    this.initLoopingGauge();
                }
            }
            if (this._looping) {
                this.loopingSetup();
            }
        }
    };

    Sprite_Gauge.prototype.loopingSetup = function() {
        this._instant = 0;
        this._nowLevel = _clone(this.getLoopingLevel());
        this._gainValue = this.getLoopingValue();
        this._startCurrentValue = this.getLoopingValue() - this.getLoopingEndValue();
        this._endCurrentValue = this._startCurrentValue;
        this._currentMoveValue = this._gainValue;
        this._loopingMoveValue = isNaN(this._loopingMoveValue) ? this.currentValue() : this._loopingMoveValue;
        this._startCurrentMoveValue = this._gainValue;
        this._loopingMoveDelay = 0;
    };

    const _Sprite_Gauge_updateBitmap = Sprite_Gauge.prototype.updateBitmap;
    Sprite_Gauge.prototype.updateBitmap = function() {
        if (this._looping) {
            this.updateTargetLoopingValue();
        }
        _Sprite_Gauge_updateBitmap.call(this);
        if (this._looping) {
            const value = this.currentValue();
            if (this._loopingMoveValue !== value) {
                if (isNaN(this._loopingMoveValue)) {
                    this._loopingMoveValue = value;
                }
                this.valueLoopingRedraw();
            }
        }
    };

    Sprite_Gauge.prototype.updateTargetLoopingValue = function() {
        const value = this.getLoopingValue();
        if (this._currentMoveValue !== value) {
            if (this._duration === 0) {
                this._startCurrentMoveValue = this._currentMoveValue;
            }
            this._gainValue = value - Math.floor(this._startCurrentMoveValue);
            this._currentMoveValue = value;
            this._startCurrentValue = this._duration > 0 ? this._loopingMoveValue : this._endCurrentValue;
            this._endCurrentValue = value - this.getLoopingEndValue();
            this._loopingMoveValue = isNaN(this._loopingMoveValue) ? this.currentValue() : this._loopingMoveValue;
            this._loopingMoveDelay = 0;
            this.valueLoopingRedraw();       
        }
    };

    const _Sprite_Gauge_updateGaugeAnimation = Sprite_Gauge.prototype.updateGaugeAnimation;
    Sprite_Gauge.prototype.updateGaugeAnimation = function() {
        if (this._looping && this._instant !== 0) {
            this._value = this.maxLavel() || (this._instant < 0 && this._nowLevel > 1) ? this._targetMaxValue : 0;
            this._maxValue = this._targetMaxValue;
            this.redraw();
            this._instant = 0;
        } else {
            _Sprite_Gauge_updateGaugeAnimation.call(this);
        }
        if (this._looping && this.isLoopingNextLevel() && this._duration === 0) {
            this._nowLevel++;
            this._instant = 1;
            this._loopingMoveValue = 0;
            this._startCurrentMoveValue = Math.floor(this._startCurrentMoveValue);
            this._startCurrentValue = 0;
        } else if (this._looping && this.isLoopingDownLevel() && this._duration === 0) {
            this._nowLevel--;
            this._instant = -1;
            this._loopingMoveValue = this._battler.expForLevel(this._nowLevel);
            this._startCurrentMoveValue = Math.ceil(this._startCurrentMoveValue);
            this._startCurrentValue = this._loopingMoveValue;
        }
    };

    Sprite_Gauge.prototype.getFlameStatus = function() {
        return UpdateFlameValue ? UpdateFlameValue.find(value => (this._statusType === value.StatusType)) : null;
    };

    Sprite_Gauge.prototype.valueLoopingRedraw = function() {
        this.currentLoopingValueMove(this.currentValue());
        Sprite_Gauge.prototype.redraw.call(this);
    };

    Sprite_Gauge.prototype.currentLoopingValueMove = function(currentValue) {
        if (this._loopingMoveDelay === 0) {
            this._loopingMoveDelay = (currentValue - this._loopingMoveValue) / (this._smoothnessMode.UpdateFlame > 0 ? this.smoothness() : 1);
        }
        if (this._loopingMoveValue > currentValue) {
            this._loopingMoveValue += this._loopingMoveDelay;
            this._startCurrentMoveValue += this._loopingMoveDelay;
            if (this._loopingMoveValue <= currentValue) {
                this._loopingMoveValue = currentValue;
                this._loopingMoveDelay = 0;
            }
        } else if (this._loopingMoveValue < currentValue) {
            this._loopingMoveValue += this._loopingMoveDelay;
            this._startCurrentMoveValue += this._loopingMoveDelay;
            if (this._loopingMoveValue >= currentValue) {
                this._loopingMoveValue = currentValue;
                this._loopingMoveDelay = 0;
            }
        }
    };

    const _Sprite_Gauge_drawValue = Sprite_Gauge.prototype.drawValue;
    Sprite_Gauge.prototype.drawValue = function() {
        this.setMoveMode();
        _Sprite_Gauge_drawValue.call(this);
    };

    Sprite_Gauge.prototype.setMoveMode = function() {
        this._moveMode = this._smoothnessMode && this._smoothnessMode.OnUpdateValue;
    };

    const _Sprite_Gauge_currentValue = Sprite_Gauge.prototype.currentValue;
    Sprite_Gauge.prototype.currentValue = function() {
        if (this._battler && this._looping) {
            return this.currentLoopingValue();
        } else {
            if (this._battler && this._moveMode) {
                this._moveMode = false;
                return Math.round(this.getValue());
            }
            return _Sprite_Gauge_currentValue.call(this);
        }
    };

    Sprite_Gauge.prototype.currentLoopingValue = function() {
        if (this._battler && this._moveMode) {
            this._moveMode = false;
            return Math.round(this.getValue());
        }
        switch (this._statusType) {
            case "menuexp":
                return this.currentExpValue();
            default:
                return 0;
        }
    };

    Sprite_Gauge.prototype.currentExpValue = function() {
        if (this._battler && this._moveMode) {
            this._moveMode = false;
            return Math.round(this.getValue());
        }
        if (this.getLoopingLevel() > this._nowLevel) {
            return this.maxLavel() ? this.currentMaxValue() : Math.min(this._battler.currentExp() - this._battler.expForLevel(this._nowLevel), this.currentMaxValue())
        } else {
            return Math.max(this._battler.currentExp() - this._battler.expForLevel(this._nowLevel), 0);
        }
    };

    Sprite_Gauge.prototype.getValue = function() {
        return this._looping ? this._loopingMoveValue : this._value;
    };

    const _Sprite_Gauge_currentMaxValue = Sprite_Gauge.prototype.currentMaxValue;
    Sprite_Gauge.prototype.currentMaxValue = function() {
        return this._battler && this._looping ? this.currentLoopingMaxValue() : _Sprite_Gauge_currentMaxValue.call(this);
    };

    Sprite_Gauge.prototype.currentLoopingMaxValue = function() {
        switch (this._statusType) {
            case "menuexp":
                return this.currentExpMaxValue();
            default:
                return 0;
        }
    };

    Sprite_Gauge.prototype.currentExpMaxValue = function() {
        return this._battler.expForLevel(this._nowLevel + 1) - this._battler.expForLevel(this._nowLevel);
    };

    const _Sprite_Gauge_smoothness = Sprite_Gauge.prototype.smoothness;
    Sprite_Gauge.prototype.smoothness = function() {
        if (this._looping) {
            return this._smoothnessMode ? this.loopingSmoothness() : _Sprite_Gauge_smoothness.call(this);
        } else {
            return this._smoothnessMode ? this._smoothnessMode.UpdateFlame : _Sprite_Gauge_smoothness.call(this);
        }
    };

    Sprite_Gauge.prototype.loopingSmoothness = function() {
        return Math.max(Math.floor(this._smoothnessMode.UpdateFlame * this.smoothSpeed()), 1);
    };

    Sprite_Gauge.prototype.smoothSpeed = function() {
        switch (this._statusType) {
            case "menuexp":
                return (this.currentValue() - this._startCurrentValue) / (this._gainValue * this._battler.finalExpRate());
            default:
                return 0;
        }
    };

    Sprite_Gauge.prototype.maxLavel = function() {
        return this._nowLevel >= this._battler.maxLevel();
    };

    Sprite_Gauge.prototype.getLoopingLevel = function() {
        switch (this._statusType) {
            case "menuexp":
                return this._battler._level;
            default:
                return 0;
        }
    };

    Sprite_Gauge.prototype.getLoopingValue = function() {
        switch (this._statusType) {
            case "menuexp":
                return this._battler.currentExp();
            default:
                return false;
        }
    };

    Sprite_Gauge.prototype.isLoopingNextLevel = function() {
        switch (this._statusType) {
            case "menuexp":
                return this._nowLevel < this._battler._level;
            default:
                return false;
        }
    };

    Sprite_Gauge.prototype.isLoopingDownLevel = function() {
        switch (this._statusType) {
            case "menuexp":
                return this._nowLevel > this._battler._level;
            default:
                return false;
        }
    };

    Sprite_Gauge.prototype.getLoopingEndValue = function() {
        switch (this._statusType) {
            case "menuexp":
                return this._battler.currentLevelExp();
            default:
                return false;
        }
    };

})();