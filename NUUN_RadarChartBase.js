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
 * @plugindesc レーダーチャートベース
 * @author NUUN
 * @version 1.0.2
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * レーダーチャートを実装するためのベースプラグインです。
 * 
 * 参考
 * TOMY (Kamesoft)　様
 * 
 * 
 * 更新履歴
 * 2022/2/6 Ver.1.0.2
 * カラーコード指定により定義追加。
 * 2022/1/12 Ver.1.0.1
 * マイナスになると表示が不自然になるため修正。
 * 2021/7/18 Ver.1.0.0
 * 初版
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
 */
var Imported = Imported || {};
Imported.NUUN_RadarChartBase = true;

function Sprite_NUUN_RadarChart() {
  this.initialize(...arguments);
}

Sprite_NUUN_RadarChart.prototype = Object.create(Sprite.prototype);
Sprite_NUUN_RadarChart.prototype.constructor = Sprite_NUUN_RadarChart;

(() => {
  const parameters = PluginManager.parameters('NUUN_RadarChartBase');
  const ChartBaseWidth = Number(parameters['ChartBaseWidth'] || 300);
  const ChartInsideLineNum = Number(parameters['ChartInsideLineNum'] || 4);

  Window_Base.prototype.setRadarChart = function(name, rate, iconId) {
    return {name: name, rate: rate, iconId : iconId};
  };

  Sprite_NUUN_RadarChart.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.radarChartWidth = 100;
    this.overMode = false;
    this.createBitmap();
  };

  Sprite_NUUN_RadarChart.prototype.setup = function(battler, chartType, data, radius, offsetX, offsetY, fontSize) {
    this._battler = battler;
    this._chartType = chartType;
    this._dataList = data;//データはname:名称 rate:割合100%の場合は1 iconId:アイコンインデックス
    this._mainFontSize = fontSize;//フォントサイズ
    this.radarChartRadius = radius;//半径
    this.offsetX = offsetX || 0;
    this.offsetY = offsetY || 0;
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

  Sprite_NUUN_RadarChart.prototype.radius = function() {
    return this.radarChartRadius;
  };

  Sprite_NUUN_RadarChart.prototype.radiusRate = function(param) {
    return (this.radarChartRadius * 0.5) * Math.min(param, 2);
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

  Sprite_NUUN_RadarChart.prototype.chartStatusPointX = function(position, angle, param) {
    return (position + Math.cos(angle) * this.radiusRate(param)) + this.chartX();
  };

  Sprite_NUUN_RadarChart.prototype.chartStatusPointY = function(position, angle, param) {
    return (position + Math.sin(angle) * this.radiusRate(param)) + this.chartY();
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

  Sprite_NUUN_RadarChart.prototype.drawRadarChartMain = function(data, x, y, width, radius) {
    const dataPoint = [];
    data.forEach((a, i) => {
      //const rate = Math.abs(a.rate);
      const rate = Math.max(a.rate, 0);
      const angle = this.getAngle(i, data);
      dataPoint.push(new Point(this.chartStatusPointX(x, angle, rate), this.chartStatusPointY(y, angle, rate)));
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
    });
  };

  Sprite_NUUN_RadarChart.prototype.drawName = function(x, y, data) {
    if (data.iconId > 0) {
      this.drawIcon(x, y, data.iconId);
    } else if (data.name) {
      this.bitmap.fontSize = this.fontSize();
      this.bitmap.drawText(data.name, x - 32, y - 16, 64, 32, 'center');
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
};

})();