/*:-----------------------------------------------------------------------------------
 * NUUN_EnemyTpbGauge.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc  エネミーTPBゲージ
 * @author NUUN
 * @version 1.1.7
 * @base NUUN_Base
 * 
 * @help
 * エネミーにもTPBゲージを表示します。
 * 
 * 敵キャラのメモ欄
 * <TPBGaugeX:[position]> TPBゲージのX座標を調整します。（相対座標）
 * <TPBGaugeY:[position]> TPBゲージのY座標を調整します。（相対座標）
 * 
 * このプラグインはNUUN_Base Ver.1.2.0以降が必要です。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/7/15 Ver.1.1.7
 * 処理の最適化により一部処理をNUUN_Baseに移行。
 * 2021/7/14 Ver.1.1.6
 * エネミー画像を消去する及び新たにエネミー画像を追加表示するプラグインとの競合対策。
 * 2021/6/19 Ver.1.1.5
 * 疑似3DバトルVer.1.1対応のため一部の処理を変更。
 * 2021/5/24 Ver.1.1.4
 * 処理の一部を修正。
 * 2021/4/11 Ver.1.1.3
 * モンスターにサイドビューアクター表示系のプラグインに対応。
 * サイドビューアクターを指定したモンスターと戦闘を開始したときにエラーが出る問題を修正。
 * 2021/1/28 Ver.1.1.2
 * エネミーごとにX座標を調整できるように変更。
 * 2021/1/20 Ver.1.1.1
 * X座標を調整できるように変更。
 * エネミーごとにY座標を調整できるように変更。
 * 2021/1/17 Ver.1.1.0
 * Y座標を調整できる機能を追加。
 * エネミーのステート表示が被る問題を修正。
 * 2021/1/17 Ver.1.0.1
 * 少し修正。
 * 2021/1/16 Ver.1.0.0
 * 初版
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
 * @param ConflictScale
 * @desc 敵画像の上設定時の拡大率の考慮
 * @text 拡大率の考慮
 * @type select
 * @option 元のサイズ基準
 * @value 0
 * @option 現在のサイズ基準
 * @value 1
 * @option 元のサイズ基準（MNKR_TMBattlerExMZ併用時）
 * @value 2
 * @default 0
 * 
 */
var Imported = Imported || {};
Imported.NUUN_EnemyTpbGauge = true;

(() => {
const parameters = PluginManager.parameters('NUUN_EnemyTpbGauge');
const TpbPosition = Number(parameters['TpbPosition'] || 0);
const GaugeWidth = Number(parameters['GaugeWidth'] || 128);
const GaugeHeight = Number(parameters['GaugeHeight'] || 12);
const Gauge_X = Number(parameters['Gauge_X'] || 0);
const Gauge_Y = Number(parameters['Gauge_Y'] || 0);
const ConflictScale = Number(parameters['ConflictScale'] || 0);

const _Sprite_Enemy_updateBitmap = Sprite_Enemy.prototype.updateBitmap;
Sprite_Enemy.prototype.updateBitmap = function() {
  _Sprite_Enemy_updateBitmap.call(this);
  if (this._enemy && BattleManager.isTpb()) {
    this.updateTpbGauge();
  }
};

Sprite_Enemy.prototype.updateTpbGauge = function() {
  if (!this._enemyTpb) {
    this.enemyTpbGauge();
  }
  this._enemyTpb.x = this.tpbGaugeOffsetX + (this.x - this._enemyTpb.width / 2);
  this._enemyTpb.y = this.tpbGaugeOffsetY + this.y - 40;
  if (this.getButlerTpbPosition() === 0) {
    this._enemyTpb.y -= this.getButlerTpbPosition();
  }
  if (this._enemyTpb.y < 0) {
      this._enemyTpb.y = 30;
  } else if (this._enemyTpb.y + 40 > Graphics.height) {
    this._enemyTpb.y = Graphics.height - 40;
  }
  this.tpbGaugeOpacity();
};

Sprite_Enemy.prototype.enemyTpbGauge = function() {
  const butlerGaugeBase = BattleManager.gaugeBaseSprite;
  const sprite = new Sprite_EnemyTPBGauge();
  butlerGaugeBase.addChild(sprite);
  sprite.setup(this._enemy, "time");
  sprite.show();
  sprite.move(0, 0);
  this._enemyTpb = sprite;
  sprite.enemySpriteId = this.spriteId;
  this.tpbGaugeOffsetX = (this._enemy.enemy().meta.TPBGaugeX ? Number(this._enemy.enemy().meta.TPBGaugeX) : 0) + (Graphics.width - Graphics.boxWidth) / 2 + Gauge_X;
  this.tpbGaugeOffsetY = (this._enemy.enemy().meta.TPBGaugeY ? Number(this._enemy.enemy().meta.TPBGaugeY) : 0) + Gauge_Y + (Graphics.height - Graphics.boxHeight) / 2;
};


Sprite_Enemy.prototype.getButlerTpbHeight = function() {
  const scale = this.getButlerTpbConflict();
  if (this._SVBattlername) {
    return Math.floor(((this._mainSprite.bitmap.height / 6) + 30) * 0.9);
  } else if (this._svBattlerSprite) {
    return Math.floor((this.height + 30) * 0.9);
  } else {
    return Math.floor(((this.bitmap.height + 70) * 0.9) * scale);
  }
};

Sprite_Enemy.prototype.getButlerTpbConflict = function() {
  if (ConflictScale === 1) {
    return this.scale.y;
  } else if (ConflictScale === 2) {
    return this._baseScale.y;
  } else {
    return 1;
  }
};

Sprite_Enemy.prototype.getButlerTpbPosition = function() {
  return TpbPosition;
};

Sprite_Enemy.prototype.tpbGaugeOpacity = function() {
  if (this._effectType !== "blink") {
    this._enemyTpb.opacity = this.opacity;
  }
};

const _Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
  _Spriteset_Battle_createLowerLayer.call(this);
  this.createEnemyTpbGauge();
};

Spriteset_Battle.prototype.createEnemyTpbGauge = function() {
  if (BattleManager.isTpb()) {
    for (const sprites of this._enemySprites) {
      this.enemyTpbGauge(sprites);
    }
  }
};

Spriteset_Battle.prototype.enemyTpbGauge = function(sprites) {
  sprites.enemyTpbGauge();
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