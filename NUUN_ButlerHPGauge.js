/*:-----------------------------------------------------------------------------------
 * NUUN_ButlerHPGauge.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc  バトラーHPゲージ
 * @author NUUN
 * @version 1.0.1
 * 
 * @help
 * 敵のバトラー上にHPゲージを表示します。
 * 
 * エネミーのメモ欄
 * <HPGaugeX:[position]> HPゲージのX座標を調整します。（相対座標）
 * <HPGaugeY:[position]> HPゲージのY座標を調整します。（相対座標）
 * <NoHPGauge> HPゲージを表示しません。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/5/24 Ver.1.0.1
 * HPゲージを表示させない機能を追加。
 * 2021/5/24 Ver.1.0.0
 * 初版
 * 
 * @param HPPosition
 * @desc エネミーのHPゲージ位置
 * @text HPゲージ位置
 * @type select
 * @option 表示なし
 * @value -1
 * @option 敵画像の上
 * @value 0
 * @option 敵画像の下
 * @value 1
 * @default 0
 * 
 * @param GaugeWidth
 * @desc ゲージの横幅を指定します。
 * @text ゲージ横幅
 * @type number
 * @default 128
 * @min 0
 * 
 * @param GaugeHeight
 * @desc ゲージの縦幅を指定します。
 * @text ゲージ縦幅
 * @type number
 * @default 12
 * @min 0
 * 
 * @param Gauge_X
 * @desc ゲージのX座標（相対座標）指定します。
 * @text ゲージX座標
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param Gauge_Y
 * @desc ゲージのY座標（相対座標）指定します。
 * @text ゲージY座標
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param ValueFontSize
 * @desc 数値のフォントサイズ。（メインフォントサイズから）
 * @text 数値フォントサイズ
 * @type number
 * @default -6
 * @min -9999
 * 
 * @param LabelFontSize
 * @desc ラベルのフォントサイズ。（メインフォントサイズから）
 * @text ラベルフォントサイズ
 * @type number
 * @default -2
 * @min -9999
 * 
 */
var Imported = Imported || {};
Imported.NUUN_ButlerHPGauge = true;

(() => {
const parameters = PluginManager.parameters('NUUN_ButlerHPGauge');
const HPPosition = Number(parameters['HPPosition'] || 0);
const GaugeWidth = Number(parameters['GaugeWidth'] || 128);
const GaugeHeight = Number(parameters['GaugeHeight'] || 12);
const Gauge_X = Number(parameters['Gauge_X'] || 0);
const Gauge_Y = Number(parameters['Gauge_Y'] || 0);
const ValueFontSize = Number(parameters['ValueFontSize'] || -6);
const LabelFontSize = Number(parameters['LabelFontSize'] || -2);

const _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
Sprite_Enemy.prototype.update = function() {
  _Sprite_Enemy_update.call(this);
  if (this._enemy && this.showHpGauge && HPPosition >= 0) {
      this.updateHpGauge();
  }
};

Sprite_Enemy.prototype.updateHpGauge = function() {
  this._butlerHp.x = this.hpGaugeOffsetX + (this.x - this._butlerHp.width / 2);
  this._butlerHp.y = this.hpGaugeOffsetY + this.y - 40;
  if (HPPosition === 0) {
    if (this._SVBattlername) {
      this._butlerHp.y -= Math.round(((this._mainSprite.bitmap.height / 6) + 30) * 0.9);
    } else if (this._svBattlerSprite) {
      this._butlerHp.y -= Math.round((this.height + 30) * 0.9);
    } else {
      this._butlerHp.y -= Math.round((this.bitmap.height + 70) * 0.9);
    }
  }
  this.hpGaugeOpacity();
};

Sprite_Enemy.prototype.hpGaugeOpacity = function() {
  if (this._effectType !== "blink") {
    this._butlerHp.opacity = this.opacity;
  }
};


const _Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
  _Spriteset_Battle_createLowerLayer.call(this);
  this.createEnemyHpGauge();
};

Spriteset_Battle.prototype.createEnemyHpGauge = function() {
  if (HPPosition >= 0) {
    if (!this._enemyGaugeBase) {
      const sprite = new Sprite();
      this.addChild(sprite);
      this._enemyGaugeBase = sprite;
    }
    for (const sprites of this._enemySprites) {
      this.enemyHPGauge(sprites);
    }
  }
};

Spriteset_Battle.prototype.enemyHPGauge = function(sprites) {
  sprites.showHpGauge = !sprites._battler.enemy().meta.NoHPGauge;
  if (sprites.showHpGauge) {
    const sprite = new Sprite_EnemyHPGauge();
    this._enemyGaugeBase.addChild(sprite);
    sprite.setup(sprites._battler, "hp");
    sprite.show();
    sprite.move(0, 0);
    sprites._butlerHp = sprite;
    sprites.hpGaugeOffsetX = (sprites._enemy.enemy().meta.HPGaugeX ? Number(sprites._enemy.enemy().meta.HPGaugeX) : 0) + (Graphics.width - Graphics.boxWidth) / 2 + Gauge_X;
    sprites.hpGaugeOffsetY = (sprites._enemy.enemy().meta.HPGaugeY ? Number(sprites._enemy.enemy().meta.HPGaugeY) : 0) + Gauge_Y + (Graphics.height - Graphics.boxHeight) / 2;
  }
};

function Sprite_EnemyHPGauge() {
  this.initialize(...arguments);
}

Sprite_EnemyHPGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_EnemyHPGauge.prototype.constructor = Sprite_EnemyHPGauge;

Sprite_EnemyHPGauge.prototype.initialize = function() {
  Sprite_Gauge.prototype.initialize.call(this);
};

Sprite_EnemyHPGauge.prototype.bitmapWidth = function() {
  return GaugeWidth > 0 ? GaugeWidth : 128;
};

Sprite_EnemyHPGauge.prototype.gaugeHeight = function() {
  return GaugeHeight > 0 ? GaugeHeight : 12;
};

Sprite_EnemyHPGauge.prototype.labelFontSize = function() {
  return $gameSystem.mainFontSize() + LabelFontSize;
};

Sprite_EnemyHPGauge.prototype.valueFontSize = function() {
  return $gameSystem.mainFontSize() + ValueFontSize;
};

})();