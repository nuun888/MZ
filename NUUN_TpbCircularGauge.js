/*:-----------------------------------------------------------------------------------
 * NUUN_TpbCircularGauge.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc TPB円形ゲージプラグイン
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * TPBゲージを円形にします。
 * バトルスタイル拡張プラグインと併用する場合はこのプラグインを「NUUN_BattleStyleEX_Base」より下に配置してください。
 * 
 * 更新履歴
 * 2021/4/25 Ver.1.0.0
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
 * @text ゲージ半径
 * @type number
 * @default 25
 * @min 0
 * 
 * @param GaugeHeight
 * @desc ゲージの縦幅を指定します。
 * @text ゲージ縦幅
 * @type number
 * @default 10
 * @min 0
 * 
 * @param StartAngle
 * @desc ゲージの開始角度を指定します。
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
 * 
 */
var Imported = Imported || {};
Imported.NUUN_TpbCircularGauge = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_TpbCircularGauge');
  const GaugeX = Number(parameters['GaugeX'] || 25);
  const GaugeY = Number(parameters['GaugeY'] || 25);
  const OnGaugePosition = Number(parameters['OnGaugePosition'] || 0);
  const GaugeRadius = Number(parameters['GaugeRadius'] || 25);
  const GaugeHeight = Number(parameters['GaugeHeight'] || 10);
  const StartAngle = Number(parameters['StartAngle'] || -90);
  const EndAngle = Number(parameters['EndAngle'] || 270);


function Sprite_TPBCircularGauge() {
  this.initialize(...arguments);
}

Sprite_TPBCircularGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_TPBCircularGauge.prototype.constructor = Sprite_TPBCircularGauge;

Sprite_TPBCircularGauge.prototype.initialize = function() {
  Sprite_Gauge.prototype.initialize.call(this);
};

Sprite_TPBCircularGauge.prototype.initMembers = function() {
  Sprite_Gauge.prototype.initMembers.call(this)
  this._startAngle = this.startAngle();
  this._sweepAngle = this.sweepAngle();
  this._startTPBAngle = this.startTPAngle();
  this._sweepTPBAngle = this.sweepTPAngle();
};

Sprite_TPBCircularGauge.prototype.bitmapWidth = function() {
  return this.radius() * 2 + this.gaugeHeight() * 2;
};

Sprite_TPBCircularGauge.prototype.bitmapHeight = function() {
  return this.radius() * 2 + this.gaugeHeight() * 2;
};

Sprite_TPBCircularGauge.prototype.gaugeHeight = function() {
  return GaugeHeight;
};

Sprite_TPBCircularGauge.prototype.radius = function() {
  return GaugeRadius;
};

Sprite_TPBCircularGauge.prototype.startAngle = function() {
  return StartAngle * Math.PI / 180;
};

Sprite_TPBCircularGauge.prototype.sweepAngle = function() {
  return EndAngle * Math.PI / 180;
};

Sprite_TPBCircularGauge.prototype.startTPAngle = function() {
  return (StartAngle + (this.circumference() < 360 ? 2 : 0)) * Math.PI / 180;
};

Sprite_TPBCircularGauge.prototype.sweepTPAngle = function() {
  return (EndAngle - (this.circumference() < 360 ? 2 : 0)) * Math.PI / 180;
};

Sprite_TPBCircularGauge.prototype.circumference = function() {
  return EndAngle - StartAngle;
};

Sprite_TPBCircularGauge.prototype.drawGauge = function() {
  const gaugeX = this.radius() + this.gaugeHeight();
  const gaugeY = this.radius() + this.gaugeHeight();
  this.arcGaugeBackRect(gaugeX, gaugeY);
  this.arcGaugeRect(gaugeX, gaugeY);
};

Sprite_TPBCircularGauge.prototype.drawLabel = function() {
  const label = this.label();
  const x = this.labelOutlineWidth() / 2;
  const y = this.labelY() - 15;
  const width = this.bitmapWidth();
  const height = this.bitmapHeight();
  this.setupLabelFont();
  this.bitmap.paintOpacity = this.labelOpacity();
  this.bitmap.drawText(label, x, y, width, height, "center");
  this.bitmap.paintOpacity = 255;
};

Sprite_TPBCircularGauge.prototype.arcGaugeRect = function(x, y) {
  const context = this.bitmap.context;
  context.save();
  context.beginPath();
  context.lineWidth = this.gaugeHeight() - 2;
  context.strokeStyle = this.gaugeColor1();
  const rate = (this._sweepTPBAngle - this._startTPBAngle) * this.gaugeRate() + this._startTPBAngle;
  context.arc(x, y, this.radius(), this._startTPBAngle, rate, false);
  context.stroke();
  this.bitmap._baseTexture.update();
};

Sprite_TPBCircularGauge.prototype.arcGaugeBackRect = function(x, y) {
  const context = this.bitmap.context;
  context.save();
  context.beginPath();
  context.lineWidth = this.gaugeHeight();
  context.strokeStyle = this.gaugeBackColor();
  context.arc(x, y, this.radius(), this._startAngle, this._sweepAngle, false);
  context.stroke();
  this.bitmap._baseTexture.update();
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

const _Window_StatusBase_placeTimeGauge = Window_StatusBase.prototype.placeTimeGauge;
Window_StatusBase.prototype.placeTimeGauge = function(actor, x, y) {
  if (BattleManager.isTpb()) {
    if (Imported.NUUN_BattleStyleEX_Base && OnGaugePosition === 10) {
    } else {
      x = OnGaugePosition === 1 ? GaugeX + this.rect.x : this.rect.x + this.rect.width - (sprite.radius() * 2 + 18);
      y = OnGaugePosition === 2 ? GaugeY + this.rect.y : this.rect.y + this.gaugeLineHeight() * 1.8;
    }
    _Window_StatusBase_placeTimeGauge.call(this, actor, x, y);
  }
};

const _Window_BattleStatus_placeGauge = Window_BattleStatus.prototype.placeGauge;
Window_BattleStatus.prototype.placeGauge = function(actor, type, x, y) {
  if (type === 'time') {
    const key = "actor%1-gauge-%2".format(actor.actorId(), type);
    const sprite = this.createInnerSprite(key, Sprite_TPBCircularGauge);
    if (Imported.NUUN_BattleStyleEX_Base && OnGaugePosition === 10) {
    } else {
      x = OnGaugePosition === 1 ? GaugeX + this.rect.x : this.rect.x + this.rect.width - (sprite.radius() * 2 + 18);
      y = OnGaugePosition === 2 ? GaugeY + this.rect.y : this.rect.y + this.gaugeLineHeight() * 1.8;
    }
    sprite.setup(actor, type);
    sprite.move(x, y);
    sprite.show();
  } else {
    _Window_BattleStatus_placeGauge.call(this, actor, type, x, y);
  }
};

})();