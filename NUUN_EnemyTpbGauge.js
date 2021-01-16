/*:-----------------------------------------------------------------------------------
 * NUUN_EnemyTpbGauge.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 更新履歴
 * 2021/1/16 Ver.1.0.0
 * 初版
 */ 
/*:
 * @target MZ
 * @plugindesc  エネミーTPBゲージ
 * @author NUUN
 * 
 * @help
 * エネミーにもTPBゲージを表示します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * @param TpbPosition
 * @desc エネミーのTPBゲージ位置
 * @text TPBゲージ位置
 * @type select
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
 * @min 1
 * 
 * @param GaugeHeight
 * @desc ゲージの縦幅を指定します。
 * @text ゲージ縦幅
 * @type number
 * @default 12
 * @min 1
 * 
 */
var Imported = Imported || {};
Imported.NUUN_EnemyTpbGauge = true;

(() => {
const parameters = PluginManager.parameters('NUUN_EnemyTpbGauge');
const TpbPosition = Number(parameters['TpbPosition'] || 0);
const GaugeWidth = Number(parameters['GaugeWidth'] || 128);
const GaugeHeight = Number(parameters['GaugeHeight'] || 12);

const _Sprite_Enemy_initVisibility = Sprite_Enemy.prototype.initVisibility;
Sprite_Enemy.prototype.initVisibility = function() {
  _Sprite_Enemy_initVisibility.call(this);
  if (!this._appeared) {
    this._enemyTpb.opacity = 0;
  }
};

const _Sprite_Enemy_revertToNormal = Sprite_Enemy.prototype.revertToNormal;
Sprite_Enemy.prototype.revertToNormal = function() {
  _Sprite_Enemy_revertToNormal.call(this);
  this._enemyTpb.opacity = 255;
};

const _Sprite_Enemy_updateCollapse = Sprite_Enemy.prototype.updateCollapse;
Sprite_Enemy.prototype.updateCollapse = function() {
  _Sprite_Enemy_updateCollapse.call(this);
  this.collapseTpbGauge();
};

const _Sprite_Enemy_updateBossCollapse = Sprite_Enemy.prototype.updateBossCollapse;
Sprite_Enemy.prototype.updateBossCollapse = function() {
  _Sprite_Enemy_updateBossCollapse.call(this);
  this.collapseTpbGauge();
};

Sprite_Enemy.prototype.collapseTpbGauge = function() {
  this._enemyTpb.opacity *= this._effectDuration / (this._effectDuration + 1);
};

const _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
Sprite_Enemy.prototype.update = function() {
  _Sprite_Enemy_update.call(this);
  if (this._enemy) {
      this.updateTpbGauge();
  }
};

Sprite_Enemy.prototype.updateTpbGauge = function() {
  this._enemyTpb.x = (Graphics.width - Graphics.boxWidth) / 2 + this.x - this._enemyTpb.width / 2;
  this._enemyTpb.y = (Graphics.height - Graphics.boxHeight) / 2 + this.y - 40;
  if (TpbPosition === 0) {
    this._enemyTpb.y -= Math.round((this.bitmap.height + 40) * 0.9);
  }
  if (this._enemyTpb.y < 0) {
      this._enemyTpb.y = 0;
  } else if (this._enemyTpb.y + 40 > Graphics.height) {
    this._enemyTpb.y = Graphics.height - 40;
  }
};

const _Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
  _Spriteset_Battle_createLowerLayer.call(this);
  this.createEnemyTpbGauge();
};

Spriteset_Battle.prototype.createEnemyTpbGauge = function() {
  this._enemyTpb = new Sprite();
  this.addChild(this._enemyTpb);
  for (const sprites of this._enemySprites) {
    this.enemyTpbGauge(sprites);
  }
};

Spriteset_Battle.prototype.enemyTpbGauge = function(sprites) {
  const sprite = new Sprite_EnemyTPBGauge();
  this._enemyTpb.addChild(sprite);
  sprite.setup(sprites._battler, "time");
  sprite.show();
  sprite.move(0, 0);console.log(sprite)
  sprites._enemyTpb = sprite;
};

function Sprite_EnemyTPBGauge() {
  this.initialize(...arguments);
}

Sprite_EnemyTPBGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_EnemyTPBGauge.prototype.constructor = Sprite_EnemyTPBGauge;

Sprite_EnemyTPBGauge.prototype.initialize = function() {
  Sprite_Gauge.prototype.initialize.call(this);
};

Sprite_EnemyTPBGauge.prototype.bitmapWidth = function() {
  return GaugeWidth > 0 ? GaugeWidth : 128;
};

Sprite_EnemyTPBGauge.prototype.gaugeHeight = function() {
  return GaugeHeight > 0 ? GaugeHeight : 12;
};

})();