/*:-----------------------------------------------------------------------------------
 * NUUN_GaugeValueEX.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc ゲージ表示拡張
 * @author NUUN
 * @version 1.2.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * ゲージの表示を拡張します。
 * 
 * このプラグインでは以下の機能を拡張します。
 * ゲージの非表示
 * 数値の表示方法
 * 数値、ラベルの座標変更
 * 最大時、特定の割合以下でのゲージの色変更
 * 
 * ゲージ数値表示形式の仕様
 * timeは数値が表示されません。
 * 
 * ゲージ数値設定の適用優先度は上に設定が優先されます。対象を'all'の設定は一番下に設定してください。
 * 
 * Ver.1.2.0での変更点
 * フォントサイズをメインフォントサイズ+デフォルトフォントサイズ+個別フォントサイズに変更しました。
 * 数値の表示処理を変更しました。
 * ダメージ可視化機能は別プラグイン化しました。
 * ゲージ数値設定で設定していないゲージはデフォルトの表示のまま表示されるようになりました。
 * 全てのゲージに適用する場合は対象を'all'を選択してください。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/7/18 Ver.1.2.0
 * 表示するクラスを指定できる機能を追加。
 * フォントサイズの仕様を変更。
 * 数値表示の処理の変更。
 * 数値の左揃え、右揃えを指定できる機能を追加。
 * ダメージ可視化機能は別プラグイン化。
 * 2022/1/3 Ver.1.1.1
 * 現在値、/、最大値の座標変更をそれぞれ変更できるように変更。
 * ダメージ可視化機能をルルの協会様LL_ExGaugeDrawingの「ゲージに立体感をつける」への対応。
 * 現在値のフォントカラーを設定する機能を廃止。
 * 2022/1/1 Ver.1.1.0
 * ダメージを可視化するゲージを表示する機能を追加。
 * 2021/12/12 Ver.1.0.3
 * 一部プラグインと関数が重複したため変更。
 * 2021/12/5 Ver.1.0.2
 * ゲージの非表示が適用されていなかった問題を修正。
 * 2021/12/5 Ver.1.0.1
 * 現在値/最大値が右揃えになるように修正。
 * HP以外の特定割合以下でのゲージが適用されていなかった問題を修正。
 * 最大時、特定割合以下での数値の色が適用されていなかった問題を修正。
 * ラベルのX座標が適用されていなかった問題を修正。
 * 一部の処理を修正。
 * 2021/12/4 Ver.1.0.0
 * 初版
 * 
 * @param CommonSetting
 * @text 共通設定
 * @default ------------------------------
 * 
 * @param GaugeValueSetting
 * @text ゲージ数値設定
 * @desc ゲージ数値設定
 * @type struct<ValueGauge>[]
 * @default ["{\"Type\":\"'hp'\",\"ValueVisible\":\"'Value'\",\"ValueAlign\":\"'default'\",\"GaugeVisible\":\"true\",\"ValueDigits\":\"\",\"FilteringClass\":\"\",\"CoordinateSetting\":\"------------------------------\",\"ValueWidth\":\"0\",\"GaugeAbsoluteCoordinates\":\"false\",\"GaugeX\":\"-1\",\"GaugeY\":\"0\",\"ValueAbsoluteCoordinates\":\"false\",\"ValueX\":\"0\",\"ValueY\":\"0\",\"MaxValueX\":\"0\",\"MaxValueY\":\"0\",\"SeparationX\":\"0\",\"SeparationY\":\"0\",\"LabelAbsoluteCoordinates\":\"false\",\"LabelX\":\"0\",\"LabelY\":\"3\",\"ValueSpaceMargin\":\"0\",\"ValueMargin\":\"0\",\"FontSetting\":\"------------------------------\",\"ValueFontSize\":\"-6\",\"MaxValueFontSize\":\"-6\",\"SeparationFontSize\":\"-6\",\"LabelFontSize\":\"-2\",\"ColorSetting\":\"------------------------------\",\"MaxValueColor\":\"0\",\"SeparationColor\":\"0\",\"LabelColor\":\"16\",\"GaugeColorSetting\":\"------------------------------\",\"GaugeColor1\":\"0\",\"GaugeColor2\":\"0\",\"GaugeColorMaxSetting\":\"------------------------------\",\"GaugeColorMaxApply\":\"false\",\"MaxGaugeColor1\":\"0\",\"MaxGaugeColor2\":\"0\",\"GaugeColorRatioSetting\":\"------------------------------\",\"GaugeColorRatioApply\":\"false\",\"RatioGauge\":\"0\",\"RatioGaugeColor1\":\"0\",\"RatioGaugeColor2\":\"0\"}","{\"Type\":\"'mp'\",\"ValueVisible\":\"'Value'\",\"ValueAlign\":\"'default'\",\"GaugeVisible\":\"true\",\"ValueDigits\":\"\",\"FilteringClass\":\"\",\"CoordinateSetting\":\"------------------------------\",\"ValueWidth\":\"0\",\"GaugeAbsoluteCoordinates\":\"false\",\"GaugeX\":\"-1\",\"GaugeY\":\"0\",\"ValueAbsoluteCoordinates\":\"false\",\"ValueX\":\"0\",\"ValueY\":\"0\",\"MaxValueX\":\"0\",\"MaxValueY\":\"0\",\"SeparationX\":\"0\",\"SeparationY\":\"0\",\"LabelAbsoluteCoordinates\":\"false\",\"LabelX\":\"0\",\"LabelY\":\"3\",\"ValueSpaceMargin\":\"0\",\"ValueMargin\":\"0\",\"FontSetting\":\"------------------------------\",\"ValueFontSize\":\"-6\",\"MaxValueFontSize\":\"-6\",\"SeparationFontSize\":\"-6\",\"LabelFontSize\":\"-2\",\"ColorSetting\":\"------------------------------\",\"MaxValueColor\":\"0\",\"SeparationColor\":\"0\",\"LabelColor\":\"16\",\"GaugeColorSetting\":\"------------------------------\",\"GaugeColor1\":\"0\",\"GaugeColor2\":\"0\",\"GaugeColorMaxSetting\":\"------------------------------\",\"GaugeColorMaxApply\":\"false\",\"MaxGaugeColor1\":\"0\",\"MaxGaugeColor2\":\"0\",\"GaugeColorRatioSetting\":\"------------------------------\",\"GaugeColorRatioApply\":\"false\",\"RatioGauge\":\"0\",\"RatioGaugeColor1\":\"0\",\"RatioGaugeColor2\":\"0\"}","{\"Type\":\"'tp'\",\"ValueVisible\":\"'Value'\",\"ValueAlign\":\"'default'\",\"GaugeVisible\":\"true\",\"ValueDigits\":\"\",\"FilteringClass\":\"\",\"CoordinateSetting\":\"------------------------------\",\"ValueWidth\":\"0\",\"GaugeAbsoluteCoordinates\":\"false\",\"GaugeX\":\"-1\",\"GaugeY\":\"0\",\"ValueAbsoluteCoordinates\":\"false\",\"ValueX\":\"0\",\"ValueY\":\"0\",\"MaxValueX\":\"0\",\"MaxValueY\":\"0\",\"SeparationX\":\"0\",\"SeparationY\":\"0\",\"LabelAbsoluteCoordinates\":\"false\",\"LabelX\":\"0\",\"LabelY\":\"3\",\"ValueSpaceMargin\":\"0\",\"ValueMargin\":\"0\",\"FontSetting\":\"------------------------------\",\"ValueFontSize\":\"-6\",\"MaxValueFontSize\":\"-6\",\"SeparationFontSize\":\"-6\",\"LabelFontSize\":\"-2\",\"ColorSetting\":\"------------------------------\",\"MaxValueColor\":\"0\",\"SeparationColor\":\"0\",\"LabelColor\":\"16\",\"GaugeColorSetting\":\"------------------------------\",\"GaugeColor1\":\"0\",\"GaugeColor2\":\"0\",\"GaugeColorMaxSetting\":\"------------------------------\",\"GaugeColorMaxApply\":\"false\",\"MaxGaugeColor1\":\"0\",\"MaxGaugeColor2\":\"0\",\"GaugeColorRatioSetting\":\"------------------------------\",\"GaugeColorRatioApply\":\"false\",\"RatioGauge\":\"0\",\"RatioGaugeColor1\":\"0\",\"RatioGaugeColor2\":\"0\"}"]
 * @parent CommonSetting
 * 
 * @param ValueAlign
 * @desc デフォルトの数値の位置を指定します。
 * @text デフォルト数値位置
 * @type select
 * @option 左揃え
 * @value 'left'
 * @option 右揃え
 * @value 'right'
 * @default 'right'
 * 
 * @param ValueDigits
 * @desc デフォルトのゲージ数値表示形式が現在値/最大値の数値の表示幅。
 * @text デフォルト数値の表示幅
 * @type string
 * @default '0000'
 * @parent CommonSetting
 * 
 * @param GaugeHeight
 * @desc ゲージの高さ範囲。0でデフォルト値 ※ゲージ数値設定で指定していなくても適用されます。
 * @text ゲージの高さ範囲
 * @type number
 * @default 0
 * @parent CommonSetting
 * 
 */
/*~struct~ValueGauge:
 * 
 * @param Type
 * @text 対象
 * @desc 表示ステータスタイプ対象
 * @type combo
 * @option 'all'
 * @option 'hp'
 * @option 'mp'
 * @option 'tp'
 * @option 'time'
 * @option 'limit'
 * @default 
 * 
 * @param ValueVisible
 * @desc ゲージ数値表示形式を指定します。
 * @text ゲージ数値表示形式
 * @type select
 * @option 現在値のみ
 * @value 'Value'
 * @option 現在値/最大値
 * @value 'ValueMaxValue'
 * @option 表示なし
 * @value 'NoValue'
 * @default 'Value'
 * 
 * @param ValueAlign
 * @desc ゲージ数値表示形式を指定します。
 * @text ゲージ数値表示形式
 * @type select
 * @option 左揃え
 * @value 'left'
 * @option 右揃え
 * @value 'right'
 * @option デフォルト
 * @value 'default'
 * @default 'default'
 * 
 * @param GaugeVisible
 * @desc ゲージを表示する。
 * @text ゲージ表示
 * @type boolean
 * @default true
 * 
 * @param ValueDigits
 * @desc ゲージ数値表示形式が現在値/最大値の数値の表示幅。
 * @text 数値の表示幅
 * @type string
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
 * @param CoordinateSetting
 * @text 座標設定
 * @default ------------------------------
 * 
 * @param ValueWidth
 * @desc 数値の表示範囲
 * @text 数値表示範囲
 * @type number
 * @default 0
 * @min 0
 * @parent CoordinateSetting
 * 
 * @param GaugeAbsoluteCoordinates
 * @desc ゲージ座標(現在値、最大値、/)を絶対座標にする。(OFF相対座標)
 * @text ゲージ座標絶対座標
 * @type boolean
 * @default false
 * @parent CoordinateSetting
 * 
 * @param GaugeX
 * @desc ゲージの左端の開始X座標。(-1でラベル分シフトします)
 * @text ゲージ開始X座標
 * @type number
 * @default -1
 * @min -1
 * @parent CoordinateSetting
 * 
 * @param GaugeY
 * @desc ゲージのY座標。
 * @text ゲージY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent CoordinateSetting
 * 
 * @param ValueAbsoluteCoordinates
 * @desc 数値座標(現在値、最大値、/)を絶対座標にする。(OFF相対座標)
 * @text 数値座標絶対座標
 * @type boolean
 * @default false
 * @parent CoordinateSetting
 * 
 * @param ValueX
 * @desc 現在値のX座標を調整します。
 * @text 現在値X座標
 * @type number
 * @default 0
 * @min -9999
 * @parent CoordinateSetting
 * 
 * @param ValueY
 * @desc 現在値のY座標を調整します。
 * @text 現在値Y座標
 * @type number
 * @default 0
 * @min -9999
 * @parent CoordinateSetting
 * 
 * @param MaxValueX
 * @desc 最大値のX座標を調整します。
 * @text 最大値X座標
 * @type number
 * @default 0
 * @min -9999
 * @parent CoordinateSetting
 * 
 * @param MaxValueY
 * @desc 最大値のY座標を調整します。
 * @text 最大値Y座標
 * @type number
 * @default 0
 * @min -9999
 * @parent CoordinateSetting
 * 
 * @param SeparationX
 * @desc /のX座標を調整します。
 * @text /X座標
 * @type number
 * @default 0
 * @min -9999
 * @parent CoordinateSetting
 * 
 * @param SeparationY
 * @desc /のY座標を調整します。
 * @text /Y座標
 * @type number
 * @default 0
 * @min -9999
 * @parent CoordinateSetting
 * 
 * @param LabelAbsoluteCoordinates
 * @desc ラベル座標(現在値、最大値、/)を絶対座標にする。(OFF相対座標)
 * @text ラベル座標絶対座標
 * @type boolean
 * @default false
 * @parent CoordinateSetting
 * 
 * @param LabelX
 * @desc ラベルのX座標。
 * @text ラベルX座標
 * @type number
 * @default 0
 * @min 0
 * @parent CoordinateSetting
 * 
 * @param LabelY
 * @desc ラベルのY座標。
 * @text ラベルY座標
 * @type number
 * @default 3
 * @min -9999
 * @parent CoordinateSetting
 * 
 * @param ValueSpaceMargin
 * @desc /と数値の余白を指定します。
 * @text /数値間の余白
 * @type number
 * @default 0
 * @min 0
 * @parent CoordinateSetting
 * 
 * @param ValueMargin
 * @desc 左側の数値の余白を指定します。ゲージの表示横幅は余白分差し引かれます。
 * @text 数値の余白
 * @type number
 * @default 0
 * @min 0
 * @parent CoordinateSetting
 * 
 * @param FontSetting
 * @text フォント設定
 * @default ------------------------------
 * 
 * @param ValueFontSize
 * @desc 現在数値のフォントサイズ。（メインフォントサイズ+デフォルト現在数値フォントサイズ）
 * @text 現在数値フォントサイズ
 * @type number
 * @default -6
 * @min -9999
 * @parent FontSetting
 * 
 * @param MaxValueFontSize
 * @desc 最大値のフォントサイズ。（メインフォントサイズ+デフォルト最大値フォントサイズからの差）
 * @text 最大値フォントサイズ
 * @type number
 * @default -6
 * @min -9999
 * @parent FontSetting
 * 
 * @param SeparationFontSize
 * @desc /のフォントサイズ。（メインフォントサイズ+デフォルト/フォントサイズからの差）
 * @text /フォントサイズ
 * @type number
 * @default -6
 * @min -9999
 * @parent FontSetting
 * 
 * @param LabelFontSize
 * @desc デフォルトのラベルのフォントサイズ。（メインフォントサイズ+デフォルトラベルフォントサイズからの差）
 * @text デフォルトラベルフォントサイズ
 * @type number
 * @default -2
 * @min -9999
 * @parent FontSetting
 * 
 * @param ColorSetting
 * @text カラー設定
 * @default ------------------------------
 * 
 * @param MaxValueColor
 * @desc 最大値の色。(システムカラーまたはカラーインデックス(テキストタブ)) -1で現在値と同色
 * @text 最大値色
 * @type number
 * @default 0
 * @min -1
 * @parent ColorSetting
 * 
 * @param SeparationColor
 * @desc /の色。(システムカラーまたはカラーインデックス(テキストタブ)) -1で現在値と同色
 * @text /色
 * @type number
 * @default 0
 * @min -1
 * @parent ColorSetting
 * 
 * @param LabelColor
 * @desc ラベルの色。(システムカラーまたはカラーインデックス(テキストタブ))
 * @text ラベル色
 * @type number
 * @default 16
 * @min 0
 * @parent ColorSetting
 * 
 * @param GaugeColorSetting
 * @text ゲージ設定
 * @default ------------------------------
 * 
 * @param GaugeColor1
 * @desc ゲージの色左(システムカラーまたはカラーインデックス(テキストタブ))
 * @text ゲージ色左
 * @type number
 * @default 0
 * @min 0
 * @parent GaugeColorSetting
 * 
 * @param GaugeColor2
 * @desc ゲージの色右(システムカラーまたはカラーインデックス(テキストタブ))
 * @text ゲージ色右
 * @type number
 * @default 0
 * @min 0
 * @parent GaugeColorSetting
 * 
 * @param GaugeColorMaxSetting
 * @text 最大時ゲージ設定
 * @default ------------------------------
 * 
 * @param GaugeColorMaxApply
 * @desc 最大時のゲージ、数値の色変更を適用する。
 * @text 最大時ゲージ、数値色変更適用
 * @type boolean
 * @default false
 * @parent GaugeColorMaxSetting
 * 
 * @param MaxGaugeColor1
 * @desc 最大時のゲージの色左(システムカラーまたはカラーインデックス(テキストタブ))
 * @text 最大時ゲージ色左
 * @type number
 * @default 0
 * @min 0
 * @parent GaugeColorMaxSetting
 * 
 * @param MaxGaugeColor2
 * @desc 最大時のゲージの色右(システムカラーまたはカラーインデックス(テキストタブ))
 * @text 最大時ゲージ色右
 * @type number
 * @default 0
 * @min 0
 * @parent GaugeColorMaxSetting
 * 
 * @param GaugeColorRatioSetting
 * @text 特定割合以下時ゲージ設定
 * @default ------------------------------
 * 
 * @param GaugeColorRatioApply
 * @desc 変化する残り割合時のゲージ、数値の色変更を適用する。
 * @text 変化残り割合時ゲージ、数値色変更適用
 * @type boolean
 * @default false
 * @parent GaugeColorRatioSetting
 * 
 * @param RatioGauge
 * @desc 変化する残り割合を百分率で指定します。HPの場合0を指定することで瀕死時に適用されます。
 * @text 変化残り割合%
 * @type number
 * @default 0
 * @min 0
 * @parent GaugeColorRatioSetting
 * 
 * @param RatioGaugeColor1
 * @desc 特定割合以下のゲージの色左。(システムカラーまたはカラーインデックス(テキストタブ))
 * @text 特定割合以下ゲージ色左
 * @type number
 * @default 0
 * @min 0
 * @parent GaugeColorRatioSetting
 * 
 * @param RatioGaugeColor2
 * @desc 特定割合以下のゲージの色右。(システムカラーまたはカラーインデックス(テキストタブ))
 * @text 特定割合以下ゲージ色右
 * @type number
 * @default 0
 * @min 0
 * @parent GaugeColorRatioSetting
 * 
 */
/*~struct~GaugeHeightList:
 * 
 * @param GaugeHeight
 * @desc ゲージの高さ範囲。(ゲージの高さではなく表示範囲です)
 * @text ゲージの高さ範囲
 * @type number
 * @default 0
 * @min 0
 * 
 */

var Imported = Imported || {};
Imported.NUUN_GaugeValueEX = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_GaugeValueEX');
    const ValueDigits = String(parameters['ValueDigits']);
    const GaugeValueSetting = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['GaugeValueSetting'])) : null) || [];
    const ValueAlign = eval(parameters['ValueAlign']) || 'right';
    const GaugeHeight = Number(parameters['GaugeHeight'] || 0);

    const _Sprite_Gauge_initMembers = Sprite_Gauge.prototype.initMembers;
    Sprite_Gauge.prototype.initMembers = function() {
        this._gaugeData = null;
        _Sprite_Gauge_initMembers.call(this);
    };

    const _Sprite_Gauge_setup = Sprite_Gauge.prototype.setup;
    Sprite_Gauge.prototype.setup = function(battler, statusType) {
        this.initGaugeData(statusType);
        _Sprite_Gauge_setup.call(this, battler, statusType);
    };

    Sprite_Gauge.prototype.initGaugeData = function(statusType) {
        this._gaugeData = this.getFindGaugeData(statusType);
    };

    Sprite_Gauge.prototype.filteringGaugeDataClass = function(data) {
        const className = this.className ? this.className : String(this.constructor.name);
        if (data.FilteringClass && data.FilteringClass.length > 0) {
            return data.FilteringClass.some(filterClass => filterClass === className);
        } else {
            return true;
        }
    };

    Sprite_Gauge.prototype.getFindGaugeData = function(statusType) {
        return GaugeValueSetting.find(data => (data.Type === statusType || data.Type === 'all') && this.filteringGaugeDataClass(data));
    };

    Sprite_Gauge.prototype.valueWidth = function() {
        return (this._gaugeData.ValueWidth && this._gaugeData.ValueWidth > 0 ? Math.min(this._gaugeData.ValueWidth, this.bitmapWidth() - this.gaugeX()) : this.bitmapWidth() - this.gaugeX()) - this.valueMargin();
    };

    Sprite_Gauge.prototype.drawGaugeVisible = function() {
        return this._gaugeData ? this._gaugeData.GaugeVisible : true;
    };

    const _Sprite_Gauge_bitmapHeight = Sprite_Gauge.prototype.bitmapHeight;
    Sprite_Gauge.prototype.bitmapHeight = function() {
        if (GaugeHeight > 0) {
            return GaugeHeight;
        } else {
            return _Sprite_Gauge_bitmapHeight.call(this);
        }
    };

    const _Sprite_Gauge_gaugeX = Sprite_Gauge.prototype.gaugeX;
    Sprite_Gauge.prototype.gaugeX = function() {
        return this._gaugeData && this._gaugeData.GaugeX >= 0 ? this._gaugeData.GaugeX : _Sprite_Gauge_gaugeX.call(this);
    };

    Sprite_Gauge.prototype.gaugeY = function() {
        return this._gaugeData.GaugeY || 0;
    };

    Sprite_Gauge.prototype.valueX = function() {
        return this._gaugeData.ValueX || 0;
    };
    
    Sprite_Gauge.prototype.valueY = function() {
        return this._gaugeData.ValueY || 0;
    };

    Sprite_Gauge.prototype.maxValueX = function() {
        return this._gaugeData.MaxValueX || 0;
    };
    
    Sprite_Gauge.prototype.maxValueY = function() {
        return this._gaugeData.MaxValueY || 0;
    };
    
    Sprite_Gauge.prototype.separationX = function() {
        return this._gaugeData.SeparationX || 0;
    };
    
    Sprite_Gauge.prototype.separationY = function() {
        return this._gaugeData.SeparationY || 0;
    };

    Sprite_Gauge.prototype.labelX = function() {
        return this._gaugeData.LabelX || 0;
    };
    
    const _Sprite_Gauge_labelY = Sprite_Gauge.prototype.labelY;
    Sprite_Gauge.prototype.labelY = function() {
        return this._gaugeData ? (this._gaugeData.LabelY || 0) : _Sprite_Gauge_labelY.call(this);
    };

    Sprite_Gauge.prototype.valueDigits = function() {
        return this._gaugeData.ValueDigits ? this._gaugeData.ValueDigits : ValueDigits;
    };

    Sprite_Gauge.prototype.valueSpaceMargin = function() {
        return this._gaugeData.ValueSpaceMargin || 0
    };

    Sprite_Gauge.prototype.valueMargin = function() {
        return this._gaugeData.ValueMargin || 0
    };

    Sprite_Gauge.prototype.valueAlign = function() {
        return this._gaugeData.ValueAlign && this._gaugeData.ValueAlign !== 'default' ? this._gaugeData.ValueAlign : ValueAlign;
    };

    Sprite_Gauge.prototype.valueAbsoluteCoordinates = function() {
        return this._gaugeData.ValueAbsoluteCoordinates;
    };

    Sprite_Gauge.prototype.labelAbsoluteCoordinates = function() {
        return this._gaugeData.LabelAbsoluteCoordinates;
    };
    
    Sprite_Gauge.prototype.gaugeAbsoluteCoordinates = function() {
        return this._gaugeData.gaugeAbsoluteCoordinates;
    };

    const _Sprite_Gauge_valueFontSize = Sprite_Gauge.prototype.valueFontSize;
    Sprite_Gauge.prototype.valueFontSize  = function() {
        return this._gaugeData ? $gameSystem.mainFontSize() + (this._gaugeData.ValueFontSize || 0) : _Sprite_Gauge_valueFontSize.call(this);
    };
    
    Sprite_Gauge.prototype.maxValueFontSize  = function() {
        return $gameSystem.mainFontSize() + (this._gaugeData ? (this._gaugeData.MaxValueFontSize || 0) : -6);
    };
    
    Sprite_Gauge.prototype.separationFontSize  = function() {
        return $gameSystem.mainFontSize() + (this._gaugeData ? (this._gaugeData.SeparationFontSize || 0) : -6);
    };

    const _Sprite_Gauge_labelFontSize = Sprite_Gauge.prototype.labelFontSize;
    Sprite_Gauge.prototype.labelFontSize = function() {
        return this._gaugeData ? $gameSystem.mainFontSize() + (this._gaugeData.LabelFontSize || 0) : _Sprite_Gauge_labelFontSize.call(this);
    };

    const _Sprite_Gauge_labelColor = Sprite_Gauge.prototype.labelColor;
    Sprite_Gauge.prototype.labelColor = function() {
        return this._gaugeData ? NuunManager.getColorCode(this._gaugeData.LabelColor || 16) : _Sprite_Gauge_labelColor.call(this);
    };

    Sprite_Gauge.prototype.maxValueColor  = function() {
        return this._gaugeData ? (this._gaugeData.MaxValueColor === -1 ? this.valueColor() : NuunManager.getColorCode(this._gaugeData.MaxValueColor || 0)) : ColorManager.textColor(0);
    };
    
    Sprite_Gauge.prototype.separationColor  = function() {
        return this._gaugeData ? (this._gaugeData.SeparationColor === -1 ? this.valueColor() : NuunManager.getColorCode(this._gaugeData.SeparationColor || 0)) : ColorManager.textColor(0);
    };

    const _Sprite_Gauge_gaugeColor1 = Sprite_Gauge.prototype.gaugeColor1;
    Sprite_Gauge.prototype.gaugeColor1 = function() {
        if (this._gaugeData) {
            return NuunManager.getColorCode(this.changeGaugeColor1());
        }
        return _Sprite_Gauge_gaugeColor1.call(this);
    };

    const _Sprite_Gauge_gaugeColor2 = Sprite_Gauge.prototype.gaugeColor2;
    Sprite_Gauge.prototype.gaugeColor2 = function() {
        if (this._gaugeData) {
            return NuunManager.getColorCode(this.changeGaugeColor2());
        }
        return _Sprite_Gauge_gaugeColor2.call(this);
    };

    Sprite_Gauge.prototype.getGaugeHpRatio = function() {
        if (this._gaugeData.RatioGauge === 0) {
          return this._battler.isDying();
        } else {
          return this.isRatioGauge();
        }
    };

    Sprite_Gauge.prototype.changeGaugeColor1 = function() {
        if (this._gaugeData.GaugeColorMaxApply && this.currentMaxValue() === this.currentValue()) {
            return this._gaugeData.MaxGaugeColor1 || 0;
        } else if (this._gaugeData.GaugeColorRatioApply && this._statusType === 'hp' && this.getGaugeHpRatio()) {
            return this._gaugeData.RatioGaugeColor1 || 0;
        } else if (this._gaugeData.GaugeColorRatioApply && this.isRatioGauge()) {
            return this._gaugeData.RatioGaugeColor1 || 0;
        }
        return _Sprite_Gauge_gaugeColor1.call(this);
    };
    
      Sprite_Gauge.prototype.changeGaugeColor2 = function() {
        if (this._gaugeData.GaugeColorMaxApply && this.currentMaxValue() === this.currentValue()) {
            return this._gaugeData.MaxGaugeColor2 || 0;
        } else if (this._gaugeData.GaugeColorRatioApply && this._statusType === 'hp' && this.getGaugeHpRatio()) {
            return this._gaugeData.RatioGaugeColor2 || 0;
        } else if (this._gaugeData.GaugeColorRatioApply && this.isRatioGauge()) {
            return this._gaugeData.RatioGaugeColor1 || 0;
        }
        return _Sprite_Gauge_gaugeColor2.call(this);
    };

    const _Sprite_Gauge_drawValue = Sprite_Gauge.prototype.drawValue;
    Sprite_Gauge.prototype.drawValue = function() {
        if (this._gaugeData) {
            if (this._gaugeData.ValueVisible === 'ValueMaxValue') {
                this.drawValueMaxValue();
              } else if (this._gaugeData.ValueVisible === 'Value') {
                this.drawValue2(); 
              } else if (this._gaugeData.ValueVisible === 'NoValue') {
        
              }
        } else {
            _Sprite_Gauge_drawValue.call(this);
        }
    };

    Sprite_Gauge.prototype.valueXPosition = function(x, width, valueWidth, maxValueWidth, valueMarginX) {
        if (this.valueAbsoluteCoordinates()) {
            return this.valueMargin();
        }
        switch (this.valueAlign()) {
            case 'left':
                return x;
            case 'center':
                return x;
            case 'right':
                return x + width - (maxValueWidth + (valueMarginX * 2) + valueWidth + 12);
            default:
                return x;
        }
    };

    Sprite_Gauge.prototype.maxValueXPosition = function(x, width, valueWidth, maxValueWidth, valueMarginX) {
        if (this.valueAbsoluteCoordinates()) {
            return this.valueMargin();
        }
        switch (this.valueAlign()) {
            case 'left':
                return x + (valueMarginX * 2) + valueWidth + 12;
            case 'center':
                return x;
            case 'right':
                return x + (width - maxValueWidth);
            default:
                return x;
        }
    };

    Sprite_Gauge.prototype.separationXPosition = function(x, width, valueWidth, maxValueWidth, valueMarginX) {
        if (this.valueAbsoluteCoordinates()) {
            return this.valueMargin();
        }
        switch (this.valueAlign()) {
            case 'left':
                return x + valueWidth + valueMarginX;
            case 'center':
                return x;
            case 'right':
                return x + width - maxValueWidth - valueMarginX - 12;
            default:
                return x;
        }
    };

    Sprite_Gauge.prototype.getValueTextWidth = function() {
        return this.bitmap.measureTextWidth(this.valueDigits());
    };

    const _Sprite_Gauge_drawGauge = Sprite_Gauge.prototype.drawGauge;
    Sprite_Gauge.prototype.drawGauge = function() {//再定義
        if (this._gaugeData) {
            this.drawGaugeGaugeValueEX()
        } else {
            _Sprite_Gauge_drawGauge.call(this);
        }
    };

    Sprite_Gauge.prototype.drawGaugeGaugeValueEX = function() {
        if (this.drawGaugeVisible()) {
            const gaugeX = this.gaugeX();
            const gaugeY = (this.gaugeAbsoluteCoordinates() ? 0 : this.textHeight() - this.gaugeHeight()) + this.gaugeY();
            const gaugewidth = this.bitmapWidth() - gaugeX;
            const gaugeHeight = this.gaugeHeight();
            this.drawGaugeRect(gaugeX, gaugeY, gaugewidth, gaugeHeight);
        }
    };

    Sprite_Gauge.prototype.drawValue2 = function() {
        const currentValue = this.currentValue();
        const width = this.bitmapWidth() - this.gaugeX() - this.valueMargin();
        const height = this.textHeight();
        const x = (this.valueAbsoluteCoordinates() ? 0 : this.gaugeX()) + this.valueX() + this.valueMargin();
        const y = this.valueY();
        this.setupValueFont();
        this.bitmap.drawText(currentValue, x, y, width, height, this.valueAlign());
    };

    Sprite_Gauge.prototype.drawValueMaxValue = function() {
        const valueDigits = this.valueDigits();
        const currentValue = this.currentValue();
        const currentMaxValue = this.currentMaxValue();
        const bitmapWidth = this.valueWidth();
        const ValueMarginX = this.valueSpaceMargin();
        const width = Math.floor((bitmapWidth - ValueMarginX * 2 - 12) / 2);
        const height = this.textHeight();
        const x = this.gaugeX() + this.valueMargin();
        this.setupValueFont();
        const valueWidth = valueDigits ? Math.min(this.getValueTextWidth(), width) : Math.min(this.bitmap.measureTextWidth(currentValue), width);
        this.bitmap.fontSize = this.maxValueFontSize();
        const maxValueWidth = valueDigits ? Math.min(this.getValueTextWidth(), width) : Math.min(this.bitmap.measureTextWidth(currentMaxValue), width);
        this.setupValueFont();
        this.bitmap.drawText(currentValue, this.valueXPosition(x, bitmapWidth, valueWidth, maxValueWidth, ValueMarginX) + this.valueX(), this.valueY(), valueWidth, height, this.valueAlign());
        this.bitmap.fontSize = this.separationFontSize();
        this.bitmap.textColor = this.separationColor();
        this.bitmap.drawText('/', this.separationX() + this.separationXPosition(x, bitmapWidth, valueWidth, maxValueWidth, ValueMarginX), this.separationY(), 12, height, "center");
        this.bitmap.fontSize = this.maxValueFontSize();
        this.bitmap.textColor = this.maxValueColor();
        this.bitmap.drawText(currentMaxValue, this.maxValueXPosition(x, bitmapWidth, valueWidth, maxValueWidth, ValueMarginX) + this.maxValueX(), this.maxValueY(), maxValueWidth, height, this.valueAlign());
    };

    const _Sprite_Gauge_drawLabel = Sprite_Gauge.prototype.drawLabel;
    Sprite_Gauge.prototype.drawLabel = function() {
        if (this._gaugeData && !this.isGaugeImageLabel()) {
            this.drawLabel2();
        } else {
            _Sprite_Gauge_drawLabel.call(this);
        }
    };

    Sprite_Gauge.prototype.drawLabel2 = function() {
        const label = this.label();
        const x = (this.labelAbsoluteCoordinates() ? 0 : this.labelOutlineWidth() / 2) + this.labelX();
        const y = this.labelY();
        const width = this.bitmapWidth();
        const height = this.textHeight();
        this.setupLabelFont();
        this.bitmap.paintOpacity = this.labelOpacity();
        this.bitmap.drawText(label, x, y, width, height, "left");
        this.bitmap.paintOpacity = 255;
    };

    Sprite_Gauge.prototype.isGaugeImageLabel = function() {
        return Imported.NUUN_GaugeImage && this._gaugeImgData && this._gaugeImgData.LabelGaugeImg && this._gaugeImgData.LabelGaugeImg.Gaugeimage;
    };

    Sprite_Gauge.prototype.isGaugeImageValue = function() {
        return Imported.NUUN_GaugeImage && this._gaugeImgData;
    };

})();