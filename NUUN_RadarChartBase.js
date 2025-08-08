/*:-----------------------------------------------------------------------------------
 * NUUN_RadarChartBase.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc Radar Chart Base
 * @author NUUN
 * @version 1.2.2
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * This is the base plugin for implementing radar charts.
 * 
 * Class notes
 * <ChartStatusId:[id]> Specifies the ID of the maximum status setting.
 * The radar chart status is displayed based on the status closest to the maximum display value.
 * If not specified, the topmost ID setting in the plugin parameter "ChartMaxStatusParams" will be applied.
 * [id]: ID of "ChartMaxStatusParams"
 * 
 * reference
 * TOMY (Kamesoft)
 * 
 * 
 * log
 * 8/8/2025 Ver.1.2.2
 * Fixed so that both the icon and the parameter name can be displayed.
 * 8/2/2025 Ver.1.2.1
 * Fixed so that evaluation formulas can be applied to numerical values.
 * Fixed so that the text color for resistances and weaknesses can be changed for attribute and state resistance rates.
 * 7/20/2025 Ver.1.2.0
 * Added a status radar chart feature.
 * Added the ability to set the maximum display value for the radar chart.
 * Fixed the display of resistance values.
 * 6/5/2025 Ver.1.1.0
 * Added the function to display numerical values.
 * 2/6/2022 Ver.1.0.2
 * Add definition by specifying color code.
 * 1/12/2022 Ver.1.0.1
 * This has been corrected to prevent the display from looking unnatural when the value is negative.
 * 7/18/2021 Ver.1.0.0
 * First edition.
 * 
 * 
 * @param ChartBaseWidth
 * @desc Radar chart display area.
 * @text Radar chart display area
 * @type number
 * @default 300
 * @min 0
 * 
 * @param ChartInsideLineNum
 * @desc The number of inner borders for the radar chart.
 * @text Radar chart inner border number
 * @type number
 * @default 4
 * @min 0
 * 
 * @param ChartMaxElementsParam
 * @desc Specifies the maximum resistance value of the attribute as an integer.
 * @text Maximum element resistance
 * @type number
 * @default 200
 * @min 0
 * 
 * @param ChartMaxStateParam
 * @desc Specifies the maximum resistance value of the state as an integer.
 * @text Maximum state resistance
 * @type number
 * @default 200
 * @min 0
 * 
 * @param ChartMaxStatusParams
 * @desc Set the maximum number of statuses to display.
 * @text Status maximum value setting
 * @type struct<StatusParams>[]
 * @default ["{\"ChartMaxHPParam\":\"9999\",\"ChartMaxMPParam\":\"2000\",\"ChartMaxAtkParam\":\"999\",\"ChartMaxDefParam\":\"999\",\"ChartMaxMatParam\":\"999\",\"ChartMaxMdfParam\":\"999\",\"ChartMaxAgiParam\":\"999\",\"ChartMaxLukParam\":\"999\"}"]
 * 
 * 
 */
/*~struct~StatusParams:
 * 
 * @param ChartMaxHPParam
 * @desc Specify the maximum HP value as an integer.
 * @text Max HP
 * @type number
 * @default 9999
 * @min 0
 * 
 * @param ChartMaxMPParam
 * @desc Specify the maximum MP value as an integer.
 * @text Max MP
 * @type number
 * @default 9999
 * @min 0
 * 
 * @param ChartMaxAtkParam
 * @desc Specifies the maximum attack power as an integer.
 * @text Maximum attack
 * @type number
 * @default 999
 * @min 0
 * 
 * @param ChartMaxDefParam
 * @desc Specifies the maximum defense value as an integer.
 * @text Maximum defense power
 * @type number
 * @default 999
 * @min 0
 * 
 * @param ChartMaxMatParam
 * @desc Specifies the maximum magic power as an integer.
 * @text Maximum magic power
 * @type number
 * @default 999
 * @min 0
 * 
 * @param ChartMaxMdfParam
 * @desc Specifies the maximum magic defense value as an integer.
 * @text Max magic defense
 * @type number
 * @default 999
 * @min 0
 * 
 * @param ChartMaxAgiParam
 * @desc Specifies the maximum agility value as an integer.
 * @text Maximum agility
 * @type number
 * @default 999
 * @min 0
 * 
 * @param ChartMaxLukParam
 * @desc Specifies the maximum luck value as an integer.
 * @text Maximum luck
 * @type number
 * @default 999
 * @min 0
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc レーダーチャートベース
 * @author NUUN
 * @version 1.2.1
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * レーダーチャートを実装するためのベースプラグインです。
 * 
 * 職業のメモ欄
 * <ChartStatusId:[id]> ステータス最大値設定のIDを指定します。レーダーチャートのステータスは表示最大値から一番近いステータスを元に表示されます。
 * 指定がない場合はプラグインパラメータ「ステータス最大値設定」の一番上のIDの設定が適用されます。
 * [id]:ステータス最大値設定のID
 * 
 * 参考
 * TOMY (Kamesoft) 様
 * 
 * 
 * 更新履歴
 * 2025/8/8 Ver.1.2.2
 * アイコン、パラメータ名を両方表示できるように修正。
 * 2025/8/2 Ver.1.2.1
 * 数値に評価式を適用できるように修正。
 * 属性、ステートの耐性率に耐性、弱点による文字色を変更できるように修正。
 * 2025/7/20 Ver.1.2.0
 * ステータスのレーダーチャート機能を追加。
 * レーダーチャートの最大表示値を設定できる機能を追加。
 * 耐性値の表示を修正。
 * 2025/6/5 Ver.1.1.0
 * 数値を表示する機能を追加。
 * 2022/2/6 Ver.1.0.2
 * カラーコード指定により定義追加。
 * 2022/1/12 Ver.1.0.1
 * マイナスになると表示が不自然になるため修正。
 * 2021/7/18 Ver.1.0.0
 * 初版
 * 
 * 
 * @param ChartBaseWidth
 * @desc レーダーチャートの表示エリア。
 * @text レーダーチャート表示エリア
 * @type number
 * @default 300
 * @min 0
 * 
 * @param ChartInsideLineNum
 * @desc レーダーチャートの内側の枠線の数。
 * @text レーダーチャート内側枠線数
 * @type number
 * @default 4
 * @min 0
 * 
 * @param ChartMaxElementsParam
 * @desc 属性の最大耐性値を整数で指定します。
 * @text 属性の最大耐性値
 * @type number
 * @default 200
 * @min 0
 * 
 * @param ChartMaxStateParam
 * @desc ステートの最大耐性値を整数で指定します。
 * @text ステートの最大耐性値
 * @type number
 * @default 200
 * @min 0
 * 
 * @param ChartMaxStatusParams
 * @desc 表示するステータスの最大値を設定します。
 * @text ステータス最大値設定
 * @type struct<StatusParams>[]
 * @default ["{\"ChartMaxHPParam\":\"9999\",\"ChartMaxMPParam\":\"2000\",\"ChartMaxAtkParam\":\"999\",\"ChartMaxDefParam\":\"999\",\"ChartMaxMatParam\":\"999\",\"ChartMaxMdfParam\":\"999\",\"ChartMaxAgiParam\":\"999\",\"ChartMaxLukParam\":\"999\"}"]
 * 
 */
/*~struct~StatusParams:ja
 * 
 * @param ChartMaxHPParam
 * @desc HPの最大値を整数で指定します。
 * @text HPの最大値
 * @type number
 * @default 9999
 * @min 0
 * 
 * @param ChartMaxMPParam
 * @desc MPの最大値を整数で指定します。
 * @text MPの最大値
 * @type number
 * @default 9999
 * @min 0
 * 
 * @param ChartMaxAtkParam
 * @desc 攻撃力の最大値を整数で指定します。
 * @text 攻撃力の最大値
 * @type number
 * @default 999
 * @min 0
 * 
 * @param ChartMaxDefParam
 * @desc 防御力の最大値を整数で指定します。
 * @text 防御力の最大値
 * @type number
 * @default 999
 * @min 0
 * 
 * @param ChartMaxMatParam
 * @desc 魔法力の最大値を整数で指定します。
 * @text 魔法力の最大値
 * @type number
 * @default 999
 * @min 0
 * 
 * @param ChartMaxMdfParam
 * @desc 魔法防御の最大値を整数で指定します。
 * @text 魔法防御の最大値
 * @type number
 * @default 999
 * @min 0
 * 
 * @param ChartMaxAgiParam
 * @desc 敏捷性の最大値を整数で指定します。
 * @text 敏捷性の最大値
 * @type number
 * @default 999
 * @min 0
 * 
 * @param ChartMaxLukParam
 * @desc 運の最大値を整数で指定します。
 * @text 運の最大値
 * @type number
 * @default 999
 * @min 0
 * 
 */

var Imported = Imported || {};
Imported.NUUN_RadarChartBase = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const ChartBaseWidth = params.ChartBaseWidth || 300;
    const ChartInsideLineNum = params.ChartInsideLineNum || 0;

    function _getChartData(type) {
        if (!params.RadarChartSetting) return null;
        return params.RadarChartSetting.find(data => data.RadarChartType === type);
    };

    Window_Base.prototype.getRadarChartData = function(type) {
        return _getChartData(type);
    };

    Window_Base.prototype.setRadarChart = function(name, rate, iconId, value, x, y, decimal, mode) {
        return new RadarChart(name, rate, value, iconId, x, y, decimal, mode);
    };

    Window_Base.prototype.getRadarChartElementList = function() {
        return params.ElementList;
    };

    Window_Base.prototype.getRadarChartStateList = function() {
        return params.StateList;
    };

    class RadarChart {
        constructor(name, rate, value = null, iconId, x, y, decimal = 0, mode) {
            this._name = name;
            this._value = value !== null ? value : NuunManager.numPercentage((Number(rate * 100)), (decimal - 2) || 0, true);
            this._rate = rate;
            this._iconId = iconId;
            this._x = x;
            this._y = y;
            this._mode = iconId === 0 ? "param" : mode;
        }

        getName() {
            return this._name;
        }

        getValue() {
            return this._value;
        }

        getRate() {
            return this._rate;
        }

        getIconId() {
            return this._iconId;
        }

        getX() {
            return this._x;
        }

        getY() {
            return this._y;
        }

        getDisplayMode() {
            return this._mode;
        }

    }

    function Sprite_NUUN_RadarChart() {
        this.initialize(...arguments);
    }

    Sprite_NUUN_RadarChart.prototype = Object.create(Sprite.prototype);
    Sprite_NUUN_RadarChart.prototype.constructor = Sprite_NUUN_RadarChart;

    window.Sprite_NUUN_RadarChart = Sprite_NUUN_RadarChart;

    Sprite_NUUN_RadarChart.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);
        this.radarChartWidth = 100;
        this.overMode = false;
        this.createBitmap();
    };

    Sprite_NUUN_RadarChart.prototype.setup = function(battler, chartType, list, radius, offsetX, offsetY, fontSize, valueData, chartData) {
        this._valueData = valueData;
        this._battler = battler;
        this._chartType = chartType;
        this._chartId = this.getChartId();
        this._dataList = list;//データはname:名称 rate:割合100%の場合は1 iconId:アイコンインデックス
        this._mainFontSize = fontSize;//フォントサイズ
        this.radarChartRadius = radius;//半径
        this.offsetX = offsetX || 0;
        this.offsetY = offsetY || 0;
        this._maxParamRate = 1.0;
        if (chartData) {
            this._formula = chartData.formula;
            this._resistanceColor = chartData.resistanceColor;
            this._weaknessColor = chartData.weaknessColor;
            this._iconSize = chartData.iconSize;
        }
        this.updateBitmap();
    };

    Sprite_NUUN_RadarChart.prototype.setupColor = function(framecolor, lineColor, mainColor1, mainColor2) {
        this._frameColor = NuunManager.getColorCode(framecolor);
        this._lineColor = NuunManager.getColorCode(lineColor);
        const rgb1 = this.getColorRGB(NuunManager.getColorCode(mainColor1));
        const rgb2 = this.getColorRGB(NuunManager.getColorCode(mainColor2));
        this._mainFrameColor = ColorManager.textColor(mainColor2);
        this._mainColor1 = "rgba("+ rgb1.red +","+ rgb1.green +","+ rgb1.blue +",0.2)";
        this._mainColor2 = "rgba("+ rgb2.red +","+ rgb2.green +","+ rgb2.blue +",0.9)";
    };

    Sprite_NUUN_RadarChart.prototype.getChartId = function() {
        if (this._chartType === 'status' && this._battler.isActor()) {
            const _class = this._battler.currentClass();
            return NuunManager.getMetaCode(_class, "ChartStatusId") || 0;
        }
        return 0;
    };

    Sprite_NUUN_RadarChart.prototype.setupOption = function(overMode) {
        this.overMode = overMode;
    };

    Sprite_NUUN_RadarChart.prototype.fontSize = function() {
        return $gameSystem.mainFontSize() + this._mainFontSize;
    };

    Sprite_NUUN_RadarChart.prototype.createBitmap = function() {
        const width = this.bitmapWidth();
        const height = this.bitmapHeight();
        this.bitmap = new Bitmap(width, height);
        ImageManager.loadSystem("IconSet");
    };

    Sprite_NUUN_RadarChart.prototype.bitmapWidth = function() {
        return ChartBaseWidth;
    };

    Sprite_NUUN_RadarChart.prototype.bitmapHeight = function() {
        return ChartBaseWidth;
    };

    Sprite_NUUN_RadarChart.prototype.chartX = function() {
        return this.radius() + this.offsetX;
    };

    Sprite_NUUN_RadarChart.prototype.chartY = function() {
        return this.radius() + this.offsetY;
    };

    Sprite_NUUN_RadarChart.prototype.chartMaxParam = function() {
        switch (this._chartType) {
            case 'element':
                return params.ChartMaxElementsParam || 200;
            case 'state':
                return params.ChartMaxStateParam || 200;
        }
    };

    Sprite_NUUN_RadarChart.prototype.chartMaxStatusParam = function(param) {
        const data = params.ChartMaxStatusParams[this._chartId];
        switch (param) {
            case 0:
                return data.ChartMaxHPParam || 9999;
            case 1:
                return data.ChartMaxMPParam || 9999;
            case 2:
                return data.ChartMaxAtkParam || 999;
            case 3:
                return data.ChartMaxDefParam || 999;
            case 4:
                return data.ChartMaxMatParam || 999;
            case 5:
                return data.ChartMaxMdfParam || 999;
            case 6:
                return data.ChartMaxAgiParam || 999;
            case 7:
                return data.ChartMaxLukParam || 999;
        }
    };

    Sprite_NUUN_RadarChart.prototype.chartMaxStatusTag = function() {
        let id = 0;
        const re = /<(?:ChartStatusId):\s*(.*)>/;
        const battler = this._battler.actor();
        while(true) {
            const match = re.exec(battler.note);
            if (match) {
                const data = match[2].split(',');
                if (params.ChartMaxStatusParams[Number(data[0]) - 1]) {
                    if (!data[1]) {
                        id = params.ChartMaxStatusParams[Number(data[0]) - 1];
                        break;
                    } else if (!!data[1] && this._battler._level >= params.ChartMaxStatusParams[Number(data[1])]) {
                        id = params.ChartMaxStatusParams[Number(data[0]) - 1];
                        break;
                    }
                }
            }
        }
        return id;
    };

    Sprite_NUUN_RadarChart.prototype.chartCorrectionMaxStatusParam = function(param) {
        return this.chartMaxStatusParam(param) * this._maxParamRate;
    };

    Sprite_NUUN_RadarChart.prototype.getChartMaxParamRate = function(index) {
        return (this._chartType === 'status' ? this.chartCorrectionMaxStatusParam(index) : this.chartMaxParam()) / 100;
    };

    Sprite_NUUN_RadarChart.prototype.getChartMaxParamRatio = function(index) {
        return this._chartType === 'status' ? 1 : 1 / this.getChartMaxParamRate(index);
    };

    Sprite_NUUN_RadarChart.prototype.radius = function() {
        return this.radarChartRadius;
    };

    Sprite_NUUN_RadarChart.prototype.radiusRate = function(index, param) {
        return (this.radarChartRadius * this.getChartMaxParamRatio(index)) * Math.min(param, this.getChartMaxParamRate(index));
    };

    Sprite_NUUN_RadarChart.prototype.getAngle = function(index, list) {
        return index * Math.PI * 2 / list.length - Math.PI / 2;
    };

    Sprite_NUUN_RadarChart.prototype.chartFramePointX = function(position, radius, angle) {
        return (position + Math.cos(angle) * radius) + this.chartX();
    };

    Sprite_NUUN_RadarChart.prototype.chartFramePointY = function(position, radius, angle) {
        return (position + Math.sin(angle) * radius) + this.chartY();
    };

    Sprite_NUUN_RadarChart.prototype.chartStatusPointX = function(index, position, angle, param) {
        return (position + Math.cos(angle) * this.radiusRate(index, param)) + this.chartX();
    };

    Sprite_NUUN_RadarChart.prototype.chartStatusPointY = function(index, position, angle, param) {
        return (position + Math.sin(angle) * this.radiusRate(index, param)) + this.chartY();
    };

    Sprite_NUUN_RadarChart.prototype.isIcon = function(data) {
        return data.getIconId() > 0;
    };

    Sprite_NUUN_RadarChart.prototype.isShowValue = function() {
        return !!this._valueData && this._valueData.ShowValue;
    };

    Sprite_NUUN_RadarChart.prototype.getColorRGB = function(color) {
        rgbColor = {};
        rgbColor.red = parseInt(color.substring(1,3), 16);
        rgbColor.green = parseInt(color.substring(3,5), 16);
        rgbColor.blue = parseInt(color.substring(5,7), 16);
        return rgbColor;
    };

    Sprite_NUUN_RadarChart.prototype.drawElementRadarChart = function(x, y) {
        this.drawRadarChartFrame(this._dataList, x, y, 2, this.radius());
        const lineNum = 1 / (ChartInsideLineNum + 1);
        for (let i = 0; i < ChartInsideLineNum; i++) {
            this.drawRadarChartFrame(this._dataList, x, y, 1, this.radius() * (1 - lineNum * (i + 1)));
        }
        this.drawRadarChartLine(this._dataList, x, y, 1, this.radius());
        this.drawRadarChartMain(this._dataList, x, y, 2, this.radius());
    };

    Sprite_NUUN_RadarChart.prototype.getMaxParamRate = function(data) {
        if (this._chartType !== 'status') return 1.0;
        return Math.max(...data.map((a, index) => a.getValue() / this.chartMaxStatusParam(index)));
    };

    Sprite_NUUN_RadarChart.prototype.drawRadarChartMain = function(data, x, y, width, radius) {
        this._maxParamRate = this.getMaxParamRate(data);
        const dataPoint = [];
        data.forEach((a, i) => {
            const rate = this._chartType === 'status' ? (a.getValue() / this.chartCorrectionMaxStatusParam(i)) : Math.max(a.getRate(), 0);
            const angle = this.getAngle(i, data);
            dataPoint.push(new Point(this.chartStatusPointX(i, x, angle, rate), this.chartStatusPointY(i, y, angle, rate)));
        });
        this.drawMainRadaChart(dataPoint, width, this._mainColor1, this._mainColor2);
    };

    Sprite_NUUN_RadarChart.prototype.drawMainRadaChart = function(dataPoint, width, color1, color2) {
        const context = this.bitmap.context;
        context.save();
        context.beginPath();
        context.lineWidth = width;
        const x = this.chartX();
        const y = this.chartY();
        context.strokeStyle = this._mainFrameColor;
        const grad = context.createRadialGradient(x ,y, 1, x, y, this.radius());
        grad.addColorStop(0, color1);
        grad.addColorStop(1, color2);
        context.fillStyle = grad;
        context.moveTo(dataPoint[0].x, dataPoint[0].y);
        dataPoint.forEach((point, i) => {
            if (i > 0) {
                context.lineTo(point.x, point.y);
            }
        });
        context.closePath();
        context.fill();
        context.stroke();
        context.restore();
        this.bitmap._baseTexture.update();
    };

    Sprite_NUUN_RadarChart.prototype.drawRadarChartFrame = function(data, x, y, width, radius) {
        //背景枠
        const dataPoint = [];
        data.forEach((a, i) => {
            const angle = this.getAngle(i, data);
            dataPoint.push(new Point(this.chartFramePointX(x, radius, angle), this.chartFramePointY(y, radius, angle)));
        });
        this.drawRadaChart(dataPoint, width, this._frameColor);
    };

    Sprite_NUUN_RadarChart.prototype.drawRadarChartLine = function(data, x, y, width, radius) {
        data.forEach((a, i) => {
            const angle = this.getAngle(i, data);
            let point = new Point(this.chartFramePointX(x, radius, angle), this.chartFramePointY(y, radius, angle));
            this.drawLine(point.x, point.y, width, this._lineColor);
            point = new Point(this.chartFramePointX(x, radius * 1.22, angle), this.chartFramePointY(y, radius * 1.22, angle));
            this.drawName(point.x, point.y, a);
            if (this.isShowValue()) {
                this.drawValue(point.x, point.y, a);
            }
        });
    };

    Sprite_NUUN_RadarChart.prototype.drawName = function(x, y, data) {
        const mode = data.getDisplayMode();
        this.bitmap.textColor = ColorManager.normalColor();
        if (mode === "param") {
            this.bitmap.fontSize = this.fontSize();
            this.bitmap.drawText(data.getName(), x - 32, y - 16, 64, 32, 'center');
        } else if (mode === "iconparam") {
            this.drawNameIcon(x, y, data);
        } else if (mode === "icon" && this.isIcon(data)) {
            this.drawIcon(x, y, data.getIconId());
        }
    };

    Sprite_NUUN_RadarChart.prototype.drawNameIcon = function(x, y, data) {
        let margin = 0;
        this.bitmap.fontSize = this.fontSize();
        const textWidth = this.bitmap.measureTextWidth(data.getName());
        if (this.isIcon(data)) {
            margin = this.getIconSize() / 2 + 4;
            this.drawIcon(x - (textWidth / 2), y + this.getIconY(), data.getIconId());
        }
        this.bitmap.drawText(data.getName(), x + margin - (textWidth / 2), y - 16, 64, 32, 'left');
    };

    Sprite_NUUN_RadarChart.prototype.drawValue = function(x, y, data) {
        if (!!data && !!this._valueData) {
            x += -32 + this._valueData.ChartInsideValueX + data.getX();
            y += -16 + this._valueData.ChartInsideValueY + data.getY();
            const value = this._chartType !== 'status' ? data.getValue() : NuunManager.numPercentage(data.getValue(), (params.Decimal - 2) || 0, true);
            if (this._chartType !== 'status') {
                this.changeParamColor(value);
            } else {
                this.bitmap.textColor = ColorManager.normalColor();
            }
            this.nuun_DrawContentsParamUnitText(data, this.getFormulaValue(value), x, y, 64, this._valueData.UnitText);
        }
    };

    Sprite_NUUN_RadarChart.prototype.getFormulaValue = function(value) {
        const formula = this._formula;
        return formula ? eval(formula) : value;
    };


    Sprite_NUUN_RadarChart.prototype.nuun_DrawContentsParamUnitText = function(data, text, x, y, width, unit) {
        const padding = Window_Base.prototype.itemPadding.call(this);
        this.bitmap.fontSize = this.fontSize();
        const unitWidth = unit ? this.bitmap.measureTextWidth(unit) : 0;
        this.bitmap.drawText(text, x, y, width - unitWidth, 32, 'center');
        if (unit) {
            this.bitmap.textColor = NuunManager.getColorCode(this._valueData.SystemUnitColor);
            const textWidth = Math.min(this.bitmap.measureTextWidth(text), width - unitWidth - (padding / 2));
            this.bitmap.drawText(unit, x + Math.floor(width / 2) + Math.floor(textWidth / 2) - (padding / 2), y, width, 32);
        }
    };

    Sprite_NUUN_RadarChart.prototype.drawRadaChart = function(dataPoint, width, color) {
        const context = this.bitmap.context;
        context.save();
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = width;
        context.moveTo(dataPoint[0].x, dataPoint[0].y);
        dataPoint.forEach((point, i) => {
            if (i > 0) {
                context.lineTo(point.x, point.y);
            }
        });
        context.closePath();
        context.stroke();
        context.restore();
        this.bitmap._baseTexture.update();
    };

    Sprite_NUUN_RadarChart.prototype.drawLine = function(x, y, width, color) {
        const context = this.bitmap.context;
        context.save();
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = width;
        context.moveTo(this.chartX(), this.chartY());
        context.lineTo(x, y);
        context.closePath();
        context.stroke();
        context.restore();
        this.bitmap._baseTexture.update();
    };

    Sprite_NUUN_RadarChart.prototype.updateBitmap = function() {
        this.redraw();
    };

    Sprite_NUUN_RadarChart.prototype.redraw = function() {
        this.bitmap.clear();
        this.drawElementRadarChart(0, 0)
    };

    Sprite_NUUN_RadarChart.prototype.drawIcon = function(x, y, iconIndex) {
        const sprite = new Sprite(ImageManager.loadSystem("IconSet"));
        this.addChild(sprite);
        sprite.x = x - ImageManager.iconWidth / 2;
        sprite.y = y - ImageManager.iconHeight / 2;
        this.setIcon(sprite, iconIndex);
    };

    Sprite_NUUN_RadarChart.prototype.setIcon = function(sprite, iconIndex) {
        const pw = ImageManager.iconWidth;
        const ph = ImageManager.iconHeight;
        const sx = (iconIndex % 16) * pw;
        const sy = Math.floor(iconIndex / 16) * ph;
        sprite.setFrame(sx, sy, pw, ph); 
        const scale = NuunManager.numPercentage(this.getIconSize() / pw, 0 || 0, true);
        sprite.scale.x = scale;
        sprite.scale.y = scale;
    };

    Sprite_NUUN_RadarChart.prototype.getIconSize = function() {
        return this._iconSize || ImageManager.iconWidth;
    };

    Sprite_NUUN_RadarChart.prototype.getIconY = function() {
        const resize = this.getIconSize() / ImageManager.iconWidth * ImageManager.iconHeight;
        return Math.floor((ImageManager.iconHeight - resize) / 2);
    };

    Sprite_NUUN_RadarChart.prototype.changeParamColor = function(value) {
        if (value === 100) {
            this.bitmap.textColor = ColorManager.normalColor();
        } else if (this._weaknessColor !== undefined && value > 100) {
            this.bitmap.textColor = this._weaknessColor >= 0 ? NuunManager.getColorCode(this._weaknessColor) : ColorManager.powerDownColor();
        } else if (this._resistanceColor !== undefined) {
            this.bitmap.textColor = this._resistanceColor >= 0 ? NuunManager.getColorCode(this._resistanceColor) : ColorManager.powerUpColor();
        } else {
            this.bitmap.textColor = ColorManager.normalColor();
        }
    };

})();