/*:-----------------------------------------------------------------------------------
 * NUUN_TpCircularGauge.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc TP円形ゲージプラグイン
 * @author NUUN
 * @version 1.1.1
 * 
 * @help
 * TPゲージを円形にします。
 * バトルスタイル拡張プラグインと併用する場合はこのプラグインを「NUUN_BattleStyleEX_Base」より下に配置してください。
 * 
 * 更新履歴
 * 2022/5/19 Ver.1.1.1
 * ゲージ更新時に前の画像が残ってしまう問題を修正。
 * 2022/5/18 Ver.1.1.0
 * 画像対応。
 * バトルスタイル拡張Ver.3.0.0以降で座標の変更ができなかった問題を修正。
 * 2021/5/3 Ver.1.0.4
 * Y座標の変更が機能していなかった問題を修正。
 * 2021/5/2 Ver.1.0.3
 * 処理ミスがあったため修正。
 * 2021/5/1 Ver.1.0.2
 * LL_ExGaugeDrawingの一部機能に対応。
 * 2021/4/27 Ver.1.0.1
 * アクターステータスにのみ表示するように修正。
 * 2021/4/25 Ver.1.0.0
 * 初版
 * 
 * @param TPFontSize
 * @desc TPのフォントサイズ（メインフォントサイズからの差）
 * @text TPフォントサイズ
 * @type number
 * @default -6
 * @parent FontSize
 * @min -99
 * 
 * @param TPValueFontSize
 * @desc TPの値のフォントサイズ（メインフォントサイズからの差）
 * @text TP値フォントサイズ
 * @type number
 * @default -6
 * @parent FontSize
 * @min -99
 * 
 * @param OnGaugePosition
 * @desc ゲージの座標変更を許可します。
 * @text ゲージ座標変更許可
 * @type select
 * @option 許可しない
 * @value 0
 * @option 許可する
 * @value 1
 * @option バトルスタイル拡張プラグインの設定を反映する。
 * @value 10
 * @default 0
 * 
 * @param GaugeX
 * @desc ゲージのX座標を指定します。
 * @text ゲージX座標
 * @type number
 * @default 0
 * @min -999
 * 
 * @param GaugeY
 * @desc ゲージのY座標を指定します。
 * @text ゲージY座標
 * @type number
 * @default 0
 * @min -999
 * 
 * @param GaugeRadius
 * @desc ゲージの半径を指定します。
 * @text ゲージ半径(画像未指定時)
 * @type number
 * @default 25
 * @min 0
 * 
 * @param GaugeHeight
 * @desc ゲージの縦幅を指定します。
 * @text ゲージ縦幅(画像未指定時)
 * @type number
 * @default 10
 * @min 0
 * 
 * @param StartAngle
 * @desc ゲージの開始角度を指定します。（１２時の位置が-90で３時の位置が0です）
 * @text ゲージ開始角度
 * @type number
 * @default -90
 * @max 360
 * @min -360
 * 
 * @param EndAngle
 * @desc ゲージの終了角度を指定します。
 * @text ゲージ終了角度
 * @type number
 * @default 270
 * @max 360
 * @min -360
 *
 * @param ImgSetting
 * @text 画像設定
 * @default ------------------------------
 * 
 * @param GaugeBackImg
 * @desc ゲージの背景画像ファイル名を指定します。
 * @text ゲージ背景画像
 * @type file
 * @dir img/
 * @default 
 * 
 * @param GaugeImg
 * @desc ゲージの画像ファイル名を指定します。
 * @text ゲージ画像
 * @type file
 * @dir img/
 * @default 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_TpCircularGauge = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_TpCircularGauge');
  const TPFontSize = Number(parameters['TPFontSize'] || -6);
  const TPValueFontSize = Number(parameters['TPValueFontSize'] || -6);
  const GaugeX = Number(parameters['GaugeX'] || 25);
  const GaugeY = Number(parameters['GaugeY'] || 25);
  const OnGaugePosition = Number(parameters['OnGaugePosition'] || 0);
  const GaugeRadius = Number(parameters['GaugeRadius'] || 25);
  const GaugeHeight = Number(parameters['GaugeHeight'] || 10);
  const StartAngle = Number(parameters['StartAngle'] || -90);
  const EndAngle = Number(parameters['EndAngle'] || 270);
  const LL_parameters = PluginManager.parameters('LL_ExGaugeDrawing');
  const GaugeBackImg = String(parameters['GaugeBackImg']);
  const GaugeImg = String(parameters['GaugeImg']);
  const _bitmap = ImageManager.nuun_LoadPictures(GaugeImg);


function Sprite_CircularGauge() {
  this.initialize(...arguments);
}

Sprite_CircularGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_CircularGauge.prototype.constructor = Sprite_CircularGauge;

Sprite_CircularGauge.prototype.initialize = function() {
  Sprite_Gauge.prototype.initialize.call(this);
};

Sprite_CircularGauge.prototype.initMembers = function() {
  Sprite_Gauge.prototype.initMembers.call(this)
  this._startAngle = this.startAngle();
  this._sweepAngle = this.sweepAngle();
  this._startTPAngle = this.startTPAngle();
  this._sweepTPAngle = this.sweepTPAngle();
  if (!this.circularSprite && GaugeBackImg && GaugeImg) {
    this.createGaugeBackImg();
    this.createGaugeImg();
  }
};

Sprite_CircularGauge.prototype.createGaugeBackImg = function() {
  const bitmap = ImageManager.nuun_LoadPictures(GaugeBackImg);
  const sprite = new Sprite(bitmap);
  this.addChild(sprite);
};

Sprite_CircularGauge.prototype.createBitmap = function() {
  const sprite = new Sprite();
  this.addChild(sprite);
  this.textSprite = sprite;
  const width = this.bitmapWidth();
  const height = this.bitmapHeight();
  this.textSprite.bitmap = new Bitmap(width, height);
  this.bitmap = this.textSprite.bitmap;
};

Sprite_CircularGauge.prototype.createGaugeImg = function() {
  this._circularBitmap = ImageManager.nuun_LoadPictures(GaugeImg);
  const sprite = new Sprite();
  this.circularSprite = sprite;
  this.addChild(sprite);
  this.createCircularSpriteBitmap();
  this.setCreatePattern(this._circularBitmap);
};

Sprite_Gauge.prototype.setCreatePattern = function(bitmap) {
  const context = this.circularSprite.bitmap.context;
  this._pattern = context.createPattern(bitmap._image, "no-repeat");
};

Sprite_Gauge.prototype.createCircularSpriteBitmap = function() {
  const width = _bitmap.width;
  const height = _bitmap.height;
  this.circularSprite.bitmap = new Bitmap(width, height);
};

Sprite_CircularGauge.prototype.bitmapWidth = function() {
  return this.radius() * 2 + this.gaugeHeight() * 2;
};

Sprite_CircularGauge.prototype.bitmapHeight = function() {
  return this.radius() * 2 + this.gaugeHeight() * 2;
};

Sprite_CircularGauge.prototype.gaugeHeight = function() {
  return GaugeHeight;
};

Sprite_CircularGauge.prototype.radius = function() {
  return GaugeRadius;
};

Sprite_CircularGauge.prototype.startAngle = function() {
  return StartAngle * Math.PI / 180;
};

Sprite_CircularGauge.prototype.sweepAngle = function() {
  return EndAngle * Math.PI / 180;
};

Sprite_CircularGauge.prototype.startTPAngle = function() {
  return (StartAngle + (this.circumference() < 360 ? 2 : 0)) * Math.PI / 180;
};

Sprite_CircularGauge.prototype.sweepTPAngle = function() {
  return (EndAngle - (this.circumference() < 360 ? 2 : 0)) * Math.PI / 180;
};

Sprite_CircularGauge.prototype.circumference = function() {
  return EndAngle - StartAngle;
};

Sprite_CircularGauge.prototype.labelFontSize = function() {
  return $gameSystem.mainFontSize() + TPFontSize;
};

Sprite_CircularGauge.prototype.valueFontSize = function() {
  return $gameSystem.mainFontSize() + TPValueFontSize;
};

Sprite_CircularGauge.prototype.drawLabel = function() {
  if (this._battler.isActor()) {
    const label = this.label();
    const x = this.labelOutlineWidth() / 2;
    const y = this.labelY() - 15;
    const width = this.circularSprite ? this._circularBitmap.width : this.bitmapWidth();
    const height = this.circularSprite ? this._circularBitmap.height : this.bitmapHeight();
    this.setupLabelFont();
    this.bitmap.paintOpacity = this.labelOpacity();
    this.bitmap.drawText(label, x, y, width, height, "center");
    this.bitmap.paintOpacity = 255;
  } else {
    Sprite_Gauge.prototype.drawLabel.call(this);
  }
};

Sprite_CircularGauge.prototype.drawValue = function() {
  if (Imported.NUUN_GaugeValueAnimation) {
    this._moveMode = true;
  }
  const currentValue = this.currentValue();
  const width = this.circularSprite ? this._circularBitmap.width : this.bitmapWidth();
  const height = this.circularSprite ? this._circularBitmap.height : this.bitmapHeight();
  this.setupValueFont();
  this.bitmap.drawText(currentValue, 0, 6, width, height, "center");
};

Sprite_CircularGauge.prototype.drawGauge = function() {
  if (this.circularSprite) {
    this.arcGaugeImgRect(false);
  } else {
    const gaugeX = this.radius() + this.gaugeHeight();
    const gaugeY = this.radius() + this.gaugeHeight();
    const gaugeHeight = this.gaugeHeight() - 2;
    if (LL_parameters.gaugeOutlineColor) {//LL
      this.arcGaugeBackRect(gaugeX, gaugeY, this.gaugeHeight(), this.gaugeOutlineColor());
      this.arcGaugeBackRect(gaugeX, gaugeY, gaugeHeight, this.gaugeBackColor());
    } else {
      this.arcGaugeBackRect(gaugeX, gaugeY, this.gaugeHeight(), this.gaugeBackColor());
    }
  this.arcGaugeRect(gaugeX, gaugeY, gaugeHeight, this.gaugeColor1(), false);
  }
};

Sprite_CircularGauge.prototype.arcGaugeRect = function(x, y, width, color, option) {
  const context = this.bitmap.context;
  context.save();
  context.beginPath();
  context.lineWidth = width;
  context.strokeStyle = color;
  const rate = (this._sweepTPAngle - this._startTPAngle) * this.gaugeRate() + this._startTPAngle;
  context.arc(x, y, this.radius(), this._startTPAngle, rate, option);
  context.stroke();
  this.bitmap._baseTexture.update();
};

Sprite_CircularGauge.prototype.arcGaugeBackRect = function(x, y, width, color) {
  const context = this.bitmap.context;
  context.save();
  context.beginPath();
  context.lineWidth = width;
  context.strokeStyle = color;
  context.arc(x, y, this.radius(), this._startAngle, this._sweepAngle, false);
  context.stroke();
  this.bitmap._baseTexture.update();
};

Sprite_CircularGauge.prototype.arcGaugeImgRect = function(option) {
  const bitmap = this.circularSprite.bitmap;
  bitmap.clear();
  const x = this._circularBitmap.width / 2;
  const y = this._circularBitmap.height / 2;
  const context = bitmap.context;
  context.save();
  context.beginPath();
  context.lineWidth = this._circularBitmap.width / 2;
  context.strokeStyle = this._pattern;
  const rate = (this._sweepTPAngle - this._startTPAngle) * this.gaugeRate() + this._startTPAngle;
  context.arc(x, y, this.radius(), this._startTPAngle, rate, option);
  context.stroke();
  bitmap._baseTexture.update();
};

const _Window_BattleStatus_drawItemStatus = Window_BattleStatus.prototype.drawItemStatus;
Window_BattleStatus.prototype.drawItemStatus = function(index) {
  this.rect = this.itemRectWithPadding(index);
  _Window_BattleStatus_drawItemStatus.call(this, index);
};

Window_BattleStatus.prototype.basicGaugesY = function(rect) {
  const bottom = rect.y + rect.height - this.extraHeight();
  return bottom - this.gaugeLineHeight() * 2;
};

const _Window_BattleStatus_placeGauge = Window_BattleStatus.prototype.placeGauge;
Window_BattleStatus.prototype.placeGauge = function(actor, type, x, y) {
  if (type === 'tp') {
    const key = "actor%1-gauge-%2".format(actor.actorId(), type);
    const sprite = this.createInnerSprite(key, Sprite_CircularGauge);
    if ((Imported.NUUN_BattleStyleEX || Imported.NUUN_BattleStyleEX_Base) && OnGaugePosition === 10) {
    } else {
      x = OnGaugePosition === 1 ? GaugeX + this.rect.x : this.rect.x + this.rect.width - (sprite.radius() * 2 + 18);
      y = OnGaugePosition === 1 ? GaugeY + this.rect.y : this.rect.y + this.gaugeLineHeight() * 1.8;
    }
    sprite.setup(actor, type);
    sprite.move(x, y);
    sprite.show();
  } else {
    _Window_BattleStatus_placeGauge.call(this, actor, type, x, y);
  }
};

})();
