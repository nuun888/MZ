/*:-----------------------------------------------------------------------------------
 * NUUN_DamageGauge.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Damage amount gauge visualization
 * @author NUUN
 * @version 1.0.2
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * Visualizes the amount of damage reduced when taking damage.
 * 
 * The visualization function at the time of damage cannot be set with the TPB gauge.
 * 
 * FilteringClass
 * Enter the applicable window class or gauge class, identification name, or identifier.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 4/16/2022 Ver.1.0.2
 * Modified filtering class processing to support "ExtraGauge" and "SceneCustomMenu".
 * 12/6/2022 Ver.1.0.1
 * Changed the Type of color specification plug-in parameter to color. (Core script Ver.1.6.0 or later)
 * Changed the display in languages other than Japanese to English.
 * 7/18/2022 Ver.1.0.0
 * First edition.
 * 
 * @param DamageGaugeSetting
 * @text Visualization gauge settings
 * @desc Visualization gauge settings.
 * @type struct<DamageGauge>[]
 * @default ["{\"Type\":\"'hp'\",\"FilteringClass\":\"\",\"DamageGaugeSetting\":\"------------------------------\",\"DamageValueWait\":\"60\",\"DamageDuration\":\"20\",\"DamageColor1\":\"18\",\"DamageColor2\":\"18\"}"]
 * @parent CommonSetting
 * 
 */
/*~struct~DamageGauge:
 * 
 * @param Type
 * @text Status type
 * @desc Status type
 * @type combo
 * @option 'all'
 * @option 'hp'
 * @option 'mp'
 * @option 'tp'
 * @default 
 * 
 * @param FilteringClass
 * @text Filtering class setting
 * @desc Window class to apply. If not specified, applies to all windows. (multiple selection possible)
 * @type combo[]
 * @option 'Window_MenuStatus'
 * @option 'Window_MenuActor'
 * @option 'Window_Status'
 * @option 'Window_BattleStatus'
 * @option 'Window_BattleActor'
 * @option 'Window_BattleActorStatus'
 * @option 'Window_Result'
 * @option 'Window_FormationStatus'
 * @option 'Sprite_Enemy'
 * @option 'Window_CustomMenuDataList'
 * @default
 * 
 * @param DamageGaugeSetting
 * @text Damage amount visualization gauge setting
 * @default ------------------------------
 * 
 * @param DamageValueWait
 * @desc The number of frames to wait for the gauge to update when damaged.
 * @text Number of frames waiting for damage update
 * @type number
 * @default 60
 * @min 0
 * @parent DamageGaugeSetting
 * 
 * @param DamageDuration
 * @desc The number of gauge update frames during damage.
 * @text Gauge update frames when damaged
 * @type number
 * @default 20
 * @min 0
 * @parent DamageGaugeSetting
 * 
 * @param DamageColor1
 * @desc Gauge color left (system color or color index (text tab))
 * @text Gauge color left
 * @type color
 * @default 18
 * @min 0
 * @parent DamageGaugeSetting
 * 
 * @param DamageColor2
 * @desc Gauge color Right (System Color or Color Index (Text tab))
 * @text Gauge color right
 * @type color
 * @default 18
 * @min 0
 * @parent DamageGaugeSetting
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc ダメージ量ゲージ可視化
 * @author NUUN
 * @version 1.0.2
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * ダメージ時に減ったダメージ量を可視化します。
 * 
 * ダメージ時の可視化機能はTPBゲージでは設定できません。
 * 
 * フィルタリングクラス設定
 * 適用させるウィンドウクラスまたはゲージクラスまたは識別名、識別子を記入します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/4/16 Ver.1.0.2
 * フィルタリングクラスの処理を汎用ゲージ追加プラグイン、カスタムメニュー作成プラグインに対応できるよう修正。
 * 2022/12/6 Ver.1.0.1
 * カラー指定のプラグインパラメータのTypeをcolorに変更。(コアスクリプトVer.1.6.0以降)
 * 日本語以外での表示を英語表示に変更。
 * 2022/7/18 Ver.1.0.0
 * 初版
 * 
 * @param DamageGaugeSetting
 * @text 可視化ゲージ設定
 * @desc 可視化ゲージ設定
 * @type struct<DamageGauge>[]
 * @default ["{\"Type\":\"'hp'\",\"FilteringClass\":\"\",\"DamageGaugeSetting\":\"------------------------------\",\"DamageValueWait\":\"60\",\"DamageDuration\":\"20\",\"DamageColor1\":\"18\",\"DamageColor2\":\"18\"}"]
 * @parent CommonSetting
 * 
 */
/*~struct~DamageGauge:ja
 * 
 * @param Type
 * @text 対象
 * @desc 表示ステータスタイプ対象
 * @type combo
 * @option 'all'
 * @option 'hp'
 * @option 'mp'
 * @option 'tp'
 * @default 
 * 
 * @param FilteringClass
 * @text フィルタリングクラス設定
 * @desc 適用するウィンドウクラスを指定します。無指定の場合は全てのウィンドウで反映されます。(複数指定可)
 * @type combo[]
 * @option 'Window_MenuStatus'
 * @option 'Window_MenuActor'
 * @option 'Window_Status'
 * @option 'Window_BattleStatus'
 * @option 'Window_BattleActor'
 * @option 'Window_BattleActorStatus'
 * @option 'Window_Result'
 * @option 'Window_FormationStatus'
 * @option 'Sprite_Enemy'
 * @option 'Window_CustomMenuDataList'
 * @default
 * 
 * @param DamageGaugeSetting
 * @text ダメージ量可視化ゲージ設定
 * @default ------------------------------
 * 
 * @param DamageValueWait
 * @desc ダメージ時のゲージ更新待ちのフレーム数。
 * @text ダメージ時ゲージ更新待ちフレーム数
 * @type number
 * @default 60
 * @min 0
 * @parent DamageGaugeSetting
 * 
 * @param DamageDuration
 * @desc ダメージ時のゲージ更新フレーム。
 * @text ダメージ時ゲージ更新フレーム
 * @type number
 * @default 20
 * @min 0
 * @parent DamageGaugeSetting
 * 
 * @param DamageColor1
 * @desc ゲージの色左(システムカラーまたはカラーインデックス(テキストタブ))
 * @text ゲージ色左
 * @type color
 * @default 18
 * @min 0
 * @parent DamageGaugeSetting
 * 
 * @param DamageColor2
 * @desc ゲージの色右(システムカラーまたはカラーインデックス(テキストタブ))
 * @text ゲージ色右
 * @type color
 * @default 18
 * @min 0
 * @parent DamageGaugeSetting
 * 
 */

var Imported = Imported || {};
Imported.NUUN_DamageGauge = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_DamageGauge');
    const DamageGaugeSetting = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['DamageGaugeSetting'])) : null) || [];
    const LLparameters = PluginManager._parameters['LL_ExGaugeDrawing'];
    const LLSolidGradation = LLparameters ? eval(LLparameters["solidGradation"] || "true") : null;

    const _Sprite_Gauge_initMembers = Sprite_Gauge.prototype.initMembers;
    Sprite_Gauge.prototype.initMembers = function() {
        _Sprite_Gauge_initMembers.call(this);
        this._gaugeDamageData = null;
        this._damageValue = NaN;
        this._damageValueWait = 0;
        this._damageDuration = 0;
        this._drawGaugeMode = 0;
    };

    const _Sprite_Gauge_setup = Sprite_Gauge.prototype.setup;
    Sprite_Gauge.prototype.setup = function(battler, statusType) {
        this.initGaugeDamageData(statusType);
        _Sprite_Gauge_setup.call(this, battler, statusType);
        this._damageValue = this.currentValue();
    };

    Sprite_Gauge.prototype.initGaugeDamageData = function(statusType) {
        this._gaugeDamageData = this.getFindGaugeDamageData(statusType);
    };

    Sprite_Gauge.prototype.filteringGaugeDamageDataClass = function(data) {
        const className = this.className ? this.className : NuunManager.isFilterClass(this);
        if (data.FilteringClass && data.FilteringClass.length > 0) {
            return data.FilteringClass.some(filterClass => filterClass === className);
        } else {
            return true;
        }
    };

    Sprite_Gauge.prototype.getFindGaugeDamageData = function(statusType) {
        return DamageGaugeSetting.find(data => (data.Type === statusType || data.Type === 'all') && this.filteringGaugeDamageDataClass(data));
    };

    const _Sprite_Gauge_updateBitmap = Sprite_Gauge.prototype.updateBitmap;
    Sprite_Gauge.prototype.updateBitmap = function() {
        const value = this.currentValue();
        if (value !== this._targetValue) {
            this.updateDamageValue(value);
        }
        _Sprite_Gauge_updateBitmap.call(this);
    };

    const _Sprite_Gauge_updateTargetValue = Sprite_Gauge.prototype.updateTargetValue;
    Sprite_Gauge.prototype.updateTargetValue = function(value, maxValue) {
        if (!isNaN(this._value) && this.gaugeDamageVisualization()) {
        this._damageValueWait = this.getDamageValueWait();
        }
        _Sprite_Gauge_updateTargetValue.call(this, value, maxValue);
    };

    Sprite_Gauge.prototype.updateDamageValue = function(value) {
        if (isNaN(this._damageValue)) {
            this._damageValue = value;
        } else {
            this._damageDuration = this.damageSmoothness();
        }
    };

    Sprite_Gauge.prototype.damageSmoothness = function() {
        return this.gaugeDamageVisualization() ? this.getDamageDuration() : 0;
    };

    Sprite_Gauge.prototype.gaugeDamageVisualization = function() {
        return !!this._gaugeDamageData && this._statusType !== "time";
    };

    Sprite_Gauge.prototype.getDamageValueWait = function() {
        return this._gaugeDamageData.DamageValueWait;
    };

    Sprite_Gauge.prototype.getDamageDuration = function() {
        return this._gaugeDamageData.DamageDuration;
    };

    const _Sprite_Gauge_updateGaugeAnimation = Sprite_Gauge.prototype.updateGaugeAnimation;
    Sprite_Gauge.prototype.updateGaugeAnimation = function() {
        _Sprite_Gauge_updateGaugeAnimation.call(this);
        if (this._damageValueWait > 0) {
            this._damageValueWait--;
        } else if (this._damageDuration > 0) {
            const d = this._damageDuration;
            this._damageValue = (this._damageValue * (d - 1) + this._targetValue) / d;
            this._damageDuration--;
            this.redraw();
        }
    };

    Sprite_Gauge.prototype.gaugeDamageColor1 = function() {
        return NuunManager.getColorCode(this._gaugeDamageData.DamageColor1);
    };
    
    Sprite_Gauge.prototype.gaugeDamageColor2 = function() {
        return NuunManager.getColorCode(this._gaugeDamageData.DamageColor2);
    };

    const _Sprite_Gauge_gaugeRate = Sprite_Gauge.prototype.gaugeRate;
    Sprite_Gauge.prototype.gaugeRate = function() {
        if (this._drawGaugeMode === 0) {
            return _Sprite_Gauge_gaugeRate.call(this);
        } else if (this._drawGaugeMode === 1) {
            if (this.isValid() && !isNaN(this._damageValue)) {
                const value = this._damageValue;
                const maxValue = this._maxValue;
                return maxValue > 0 ? value / maxValue : 0;
            } else {
                return 0;
            }
        }
    };

    const _Sprite_Gauge_drawGaugeRect = Sprite_Gauge.prototype.drawGaugeRect;
    Sprite_Gauge.prototype.drawGaugeRect = function(x, y, width, height) {
        if (this.gaugeDamageVisualization() && !(Imported.NUUN_GaugeImage && this._gaugeImgData)) {
            this._drawGaugeMode = 1;
            const drate = this.gaugeRate();
            this._drawGaugeMode = 0;
            const rate = this.gaugeRate();
            const fillW = Math.floor((width - 2) * rate);
            const dfillW = Math.floor((width - 2) * drate);
            const fillH = height - 2;
            const color0 = this.gaugeBackColor();
            const color1 = this.gaugeColor1();
            const color2 = this.gaugeColor2();
            const dcolor1 = this.gaugeDamageColor1();
            const dcolor2 = this.gaugeDamageColor2();
            this.bitmap.fillRect(x, y, width, height, color0);
            this.bitmap.gradientFillRect(x + 1, y + 1, dfillW, fillH, dcolor1, dcolor2);
            this.bitmap.gradientFillRect(x + 1, y + 1, fillW, fillH, color1, color2);
            if (LLparameters && LLSolidGradation) {//if内はルルの協会様のコードをお借りしています。
                this.bitmap.gradientFillRect(x + 1, y + 1, fillW, fillH / 3, "rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.7)", true);//LL
                this.bitmap.gradientFillRect(x + 1, y + fillH / 3 + 1, fillW, fillH / 2, "rgba(0, 0, 0, 0.2)", "rgba(0, 0, 0, 0)", true);//LL
            }
        } else {
            this._drawGaugeMode = 0;
            _Sprite_Gauge_drawGaugeRect.call(this, x, y, width, height);
        }
    };
    
})();