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
 * @plugindesc  モンスターTPBゲージ
 * @author NUUN
 * @version 1.2.2
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * 戦闘中のモンスターにTPBゲージを表示します。
 * 
 * 敵キャラのメモ欄
 * <TPBGaugeX:[position]> TPBゲージのX座標を調整します。（相対座標）
 * <TPBGaugeY:[position]> TPBゲージのY座標を調整します。（相対座標）
 * 
 * バトルイベントの注釈
 * <TPBGaugePosition:[Id],[x],[y]> 敵グループの[Id]番目のモンスターのゲージの位置を調整します。（相対座標）
 * [Id]：表示順番号
 * [x]：X座標
 * [y]：Y座標
 * [id]は敵グループ設定で配置した順番のIDで指定します。配置ビューのモンスター画像の左上に番号が表示されますのでその番号を記入します。
 * 
 * このプラグインはNUUN_Base Ver.1.2.0以降が必要です。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/11/8 Ver.1.2.2
 * 敵グループの座標変更の設定方法を変更。
 * 2021/11/7 Ver.1.2.1
 * 一部処理を修正。
 * 2021/11/6 Ver.1.2.0
 * 敵グループのモンスター毎にゲージの座標を調整できる機能を追加。
 * 2021/9/2 Ver.1.1.9
 * 中心に表示する機能を追加。
 * TPBゲージの位置が反映しなかった問題を修正。
 * 2021/8/29 Ver.1.1.8
 * 競合対策のための処理追加。
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
 * @option 敵画像の中心
 * @value 2
 * @default 0
 * 
 * @param GaugeWidth
 * @desc TPBゲージの横幅を指定します。
 * @text TPBゲージ横幅
 * @type number
 * @default 128
 * @min 0
 * 
 * @param GaugeHeight
 * @desc TPBゲージの縦幅を指定します。
 * @text TPBゲージ縦幅
 * @type number
 * @default 12
 * @min 0
 * 
 * @param Gauge_X
 * @desc TPBゲージのX座標（相対座標）指定します。
 * @text TPBゲージX座標
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param Gauge_Y
 * @desc TPBゲージのY座標（相対座標）指定します。
 * @text TPBゲージY座標
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
let tpbGaugePositionList = [];

const _Sprite_Enemy_initMembers = Sprite_Enemy.prototype.initMembers;
Sprite_Enemy.prototype.initMembers = function() {
  _Sprite_Enemy_initMembers.call(this);
};

const _Sprite_Enemy_updateBitmap = Sprite_Enemy.prototype.updateBitmap;
Sprite_Enemy.prototype.updateBitmap = function() {
  _Sprite_Enemy_updateBitmap.call(this);
  //if (this._enemy && BattleManager.isTpb()) {
  //  this.updateTpbGauge();
  //}
};

Sprite_Enemy.prototype.updateTpbGauge = function() {
  if (BattleManager.gaugeBaseSprite) {
    if (!this._enemyTpb) {
      $gameTemp.enemyTPBGaugeRefresh = true;
      this.enemyTpbGauge();
    }
    this._enemyTpb.x = this.tpbGaugeOffsetX + (this.x - this._enemyTpb.width / 2);
    this._enemyTpb.y = this.tpbGaugeOffsetY + this.y - 40;
    if (this.getButlerTpbPosition() === 0) {
      this._enemyTpb.y -= this.getButlerTpbHeight();
    } else if (this.getButlerTpbPosition() === 2) {
      this._enemyTpb.y -= Math.floor(this.getButlerTpbHeight() / 2);
    }
    this.tpbGaugeOpacity();
  }
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
  this.tpbGaugeOffsetX = this._enemy.getTpbPositionX() + (this._enemy.enemy().meta.TPBGaugeX ? Number(this._enemy.enemy().meta.TPBGaugeX) : 0) + (Graphics.width - Graphics.boxWidth) / 2 + Gauge_X;
  this.tpbGaugeOffsetY = this._enemy.getTpbPositionY() + (this._enemy.enemy().meta.TPBGaugeY ? Number(this._enemy.enemy().meta.TPBGaugeY) : 0) + Gauge_Y + (Graphics.height - Graphics.boxHeight) / 2;
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


const _Spriteset_Battle_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
  _Spriteset_Battle_update.call(this);
  if ($gameTemp.enemyTPBGaugeRefresh) {
    this.setTpbGaugePosition();
    $gameTemp.enemyTPBGaugeRefresh = false;
  }
  for (const sprite of this._enemySprites) {
    if (sprite._enemy && BattleManager.isTpb())
    sprite.updateTpbGauge();
  }
};

const _Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
  _Spriteset_Battle_createLowerLayer.call(this);
  this.createEnemyTpbGauge();
};

Spriteset_Battle.prototype.createEnemyTpbGauge = function() {
  if (BattleManager.isTpb()) {
    tpbGaugePositionList = getEnemyTpbGaugePosition($gameTroop.troop());
    this.setTpbGaugePosition();
    for (const sprites of this._enemySprites) {
      this.enemyTpbGauge(sprites);
    }
  }
};

Spriteset_Battle.prototype.enemyTpbGauge = function(sprites) {
  sprites.enemyTpbGauge();
};

Spriteset_Battle.prototype.setTpbGaugePosition = function() {
  for (const data of tpbGaugePositionList) {
    const enemy = $gameTroop.members()[data[0] - 1];
    if (enemy) {
      enemy.setTpbGaugePosition(data[1], data[2]);
    }
  }
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


const _Game_Enemy_initMembers = Game_Enemy.prototype.initMembers;
Game_Enemy.prototype.initMembers = function() {
  _Game_Enemy_initMembers.call(this);
  this._butlerTpbPositionX = 0;
  this._butlerTpbPositionY = 0;
};

Game_Enemy.prototype.setTpbGaugePosition = function(x, y){
  this._butlerTpbPositionX = x;
  this._butlerTpbPositionY = y;
};

Game_Enemy.prototype.getTpbPositionX = function(){
  return this._butlerTpbPositionX;
};

Game_Enemy.prototype.getTpbPositionY = function(){
  return this._butlerTpbPositionY;
};

function getEnemyTpbGaugePosition(troop) {
  const pages = troop.pages[0];
  list = [];
  const re = /<(?:TPBGaugePosition):\s*(.*)>/;
  pages.list.forEach(tag => {
    if (tag.code === 108 || tag.code === 408) {
      let match = re.exec(tag.parameters[0]);
      if (match) {
        list.push(match[1].split(',').map(Number));
      }
    }
  });
  return list;
};

})();