/*:-----------------------------------------------------------------------------------
 * NUUN_BattlerTpbGauge.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc  バトラーTPBゲージ
 * @author NUUN
 * @version 1.5.1
 * @base NUUN_Base
 * @base NUUN_BattlerOverlayBase
 * @orderAfter NUUN_Base
 * 
 * @help
 * 戦闘中の敵及びSVアクターにTPBゲージを表示します。
 * 
 * 敵キャラまたはアクターのメモ欄
 * <TPBGaugeX:[position]> TPBゲージのX座標を調整します。（相対座標）
 * <TPBGaugeY:[position]> TPBゲージのY座標を調整します。（相対座標）
 * [position]:座標
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
 * バトラーオーバーレイベースは必ず最新版にしてください。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/6/2 Ver.1.5.1
 * 処理の修正。
 * 2023/5/28 Ver.1.5.0
 * TPBゲージをアクターにも表示できるように対応。
 * 2022/5/14 Ver.1.4.0
 * バトラーの表示処理の定義大幅変更に関する定義変更。
 * 2021/12/19 Ver.1.3.0
 * ゲージ画像化に対応。
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
 * @param EnemySetting
 * @text 敵設定
 * @default ------------------------------
 * 
 * @param EnemyVisibleSetting
 * @text 表示設定
 * @default ------------------------------
 * @parent EnemySetting
 * 
 * @param TpbPosition
 * @desc エネミーのTPBゲージ位置
 * @text TPBゲージ位置
 * @type select
 * @option 表示なし
 * @value -1
 * @option 敵画像の上
 * @value 0
 * @option 敵画像の下
 * @value 1
 * @option 敵画像の中心
 * @value 2
 * @default 0
 * @parent EnemyVisibleSetting
 * 
 * @param GaugeSetting
 * @text 敵ゲージ設定
 * @default ------------------------------
 * @parent EnemySetting
 * 
 * @param GaugeWidth
 * @desc TPBゲージの横幅を指定します。
 * @text TPBゲージ横幅
 * @type number
 * @default 128
 * @min 0
 * @parent GaugeSetting
 * 
 * @param GaugeHeight
 * @desc TPBゲージの縦幅を指定します。
 * @text TPBゲージ縦幅
 * @type number
 * @default 12
 * @min 0
 * @parent GaugeSetting
 * 
 * @param Gauge_X
 * @desc TPBゲージのX座標（相対座標）指定します。
 * @text TPBゲージX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent GaugeSetting
 * 
 * @param Gauge_Y
 * @desc TPBゲージのY座標（相対座標）指定します。
 * @text TPBゲージY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent GaugeSetting
 * 
 * 
 * @param ActorSetting
 * @text アクター設定
 * @default ------------------------------
 * 
 * @param ActorVisibleSetting
 * @text 表示設定
 * @default ------------------------------
 * @parent ActorSetting
 * 
 * @param ActorTpbPosition
 * @desc アクターのTPBゲージ位置
 * @text TPBゲージ位置
 * @type select
 * @option 表示なし
 * @value -1
 * @option SVアクター画像の上
 * @value 0
 * @option SVアクター画像の下
 * @value 1
 * @default -1
 * @parent ActorVisibleSetting
 * 
 * @param ActorGaugeSetting
 * @text アクターゲージ設定
 * @default ------------------------------
 * @parent ActorSetting
 * 
 * @param ActorGaugeWidth
 * @desc アクターのTPBゲージの横幅を指定します。
 * @text TPBゲージ横幅
 * @type number
 * @default 128
 * @min 0
 * @parent ActorGaugeSetting
 * 
 * @param ActorGaugeHeight
 * @desc アクターのTPBゲージの縦幅を指定します。
 * @text TPBゲージ縦幅
 * @type number
 * @default 12
 * @min 0
 * @parent ActorGaugeSetting
 * 
 * @param ActorGauge_X
 * @desc アクターのTPBゲージのX座標（相対座標）指定します。
 * @text TPBゲージX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorGaugeSetting
 * 
 * @param ActorGauge_Y
 * @desc アクターのTPBゲージのY座標（相対座標）指定します。
 * @text TPBゲージY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorGaugeSetting
 * 
 */
var Imported = Imported || {};
Imported.NUUN_BattlerTpbGauge = true;

(() => {
const parameters = PluginManager.parameters('NUUN_BattlerTpbGauge');
const ActorTpbPosition = Number(parameters['ActorTpbPosition'] || -1);
const ActorGaugeWidth = Number(parameters['ActorGaugeWidth'] || 128);
const ActorGaugeHeight = Number(parameters['ActorGaugeHeight'] || 12);
const ActorGauge_X = Number(parameters['ActorGauge_X'] || 0);
const ActorGauge_Y = Number(parameters['ActorGauge_Y'] || 0);
const TpbPosition = Number(parameters['TpbPosition'] || 0);
const GaugeWidth = Number(parameters['GaugeWidth'] || 128);
const GaugeHeight = Number(parameters['GaugeHeight'] || 12);
const Gauge_X = Number(parameters['Gauge_X'] || 0);
const Gauge_Y = Number(parameters['Gauge_Y'] || 0);

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


const _Sprite_Actor_update = Sprite_Actor.prototype.update;
Sprite_Actor.prototype.update = function() {
  _Sprite_Actor_update.call(this);
  this.updateTpbGauge();
};

const _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
Sprite_Enemy.prototype.update = function() {
  _Sprite_Enemy_update.call(this);
  this.updateTpbGauge();
};

Sprite_Battler.prototype.updateTpbGauge = function() {
    if (!this._battler || !BattleManager.isTpb() || this.noTpbGaugePosition()) {
        return;
    }
    if (this.battlerOverlay && !this._battlerTpb) {
        this.createTpbGauge();
    }
    this.setTpbGaugePosition();
};

Sprite_Enemy.prototype.noTpbGaugePosition = function() {
    return TpbPosition < 0;
};

Sprite_Actor.prototype.noTpbGaugePosition = function() {
    return (this._battler.isEnemy() ? TpbPosition : ActorTpbPosition) < 0;
};

Sprite_Enemy.prototype.setTpbGaugePosition = function() {
    if (this._battlerTpb) {
        const enemy = this._enemy.enemy();
        const x = (enemy.meta.TPBGaugeX ? Number(enemy.meta.TPBGaugeX) : 0) + Gauge_X + this._enemy.getTpbGaugePositionX();
        const y = (enemy.meta.TPBGaugeY ? Number(enemy.meta.TPBGaugeY) : 0) + Gauge_Y + this._enemy.getTpbGaugePositionY();
        this._battlerTpb.x = x;
        this._battlerTpb.y = y - this.getBattlerTpbPosition();
      }
};

Sprite_Actor.prototype.setTpbGaugePosition = function() {
    if (this._battler.isEnemy()) {
        Sprite_Enemy.prototype.setTpbGaugePosition.call(this);
    } else if (this._battlerTpb) {
        const actor = this._actor.actor();
        const x = (actor.meta.TPBGaugeX ? Number(actor.meta.TPBGaugeX) : 0) + ActorGauge_X;
        const y = (actor.meta.TPBGaugeY ? Number(actor.meta.TPBGaugeY) : 0) + ActorGauge_Y;
        this._battlerTpb.x = x;
        this._battlerTpb.y = y - this.getBattlerTpbSVPosition();
      }
};

Sprite_Battler.prototype.getBattlerTpbPosition = function() {
    const scale = this.getBattlerOverlayConflict();
    if (TpbPosition === 0) {
        return this.getBattlerOverlayHeight() * scale;
    } else if (TpbPosition === 2) {
        return Math.floor((this.getBattlerOverlayHeight() * scale) / 2);
    } else {
        return 0;
    }
};

Sprite_Actor.prototype.getBattlerTpbSVPosition = function() {
    const scale = this.battlerOverlay.battlerSpriteScale_y;
    if (ActorTpbPosition === 0) {
      return this.getSVBattlerHeight() * scale;
    } else if (ActorTpbPosition === 2) {
      return Math.floor((this.getSVBattlerHeight() * scale) / 2);
    } else {
      return 0;
    }
};

Sprite_Enemy.prototype.createTpbGauge = function() {
    const sprite = new Sprite_EnemyTPBGauge();
    this.battlerOverlay.addChild(sprite);
    this._battlerTpb = sprite;
    sprite.setup(this._enemy, "time");
    sprite.show();
    sprite.move(0, 0);
    $gameTemp.battlerTpbGaugeRefresh = true;
};
  
Sprite_Actor.prototype.createTpbGauge = function() {
    if (this._battler.isEnemy()) {
        Sprite_Enemy.prototype.createTpbGauge.call(this);
        return;
    }
    const sprite = new Sprite_BattlerTPBGauge();
    this.battlerOverlay.addChild(sprite);
    this._battlerTpb = sprite;
    sprite.setup(this._actor, "time");
    sprite.show();
    sprite.move(0, 0);
    $gameTemp.battlerTpbGaugeRefresh = true;
};


function Sprite_BattlerTPBGauge() {
    this.initialize(...arguments);
}
  
Sprite_BattlerTPBGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_BattlerTPBGauge.prototype.constructor = Sprite_BattlerTPBGauge;
  
Sprite_BattlerTPBGauge.prototype.initialize = function() {
    Sprite_Gauge.prototype.initialize.call(this);
    this.anchor.x = 0.5;
    this.anchor.y = 1;
};

Sprite_BattlerTPBGauge.prototype.bitmapWidth = function() {
    return ActorGaugeWidth > 0 ? ActorGaugeWidth : 128;
};
  
Sprite_BattlerTPBGauge.prototype.gaugeHeight = function() {
    return ActorGaugeHeight > 0 ? ActorGaugeHeight : 12;
};

function Sprite_EnemyTPBGauge() {
  this.initialize(...arguments);
}

Sprite_EnemyTPBGauge.prototype = Object.create(Sprite_BattlerTPBGauge.prototype);
Sprite_EnemyTPBGauge.prototype.constructor = Sprite_EnemyTPBGauge;

Sprite_EnemyTPBGauge.prototype.initialize = function() {
  Sprite_Gauge.prototype.initialize.call(this);
  this.anchor.x = 0.5;
  this.anchor.y = 1;
};

Sprite_EnemyTPBGauge.prototype.bitmapWidth = function() {
  return GaugeWidth > 0 ? GaugeWidth : 128;
};

Sprite_EnemyTPBGauge.prototype.gaugeHeight = function() {
  return GaugeHeight > 0 ? GaugeHeight : 12;
};


const _Spriteset_Battle_updateBattlerOverlay = Spriteset_Battle.prototype.updateBattlerOverlay;
Spriteset_Battle.prototype.updateBattlerOverlay = function() {
  _Spriteset_Battle_updateBattlerOverlay.call(this);
  if ($gameTemp.battlerTpbGaugeRefresh) {
    this.setTpbGaugePosition();
    $gameTemp.battlerTpbGaugeRefresh = false;
  }
};

Spriteset_Battle.prototype.setTpbGaugePosition = function() {
  if (BattleManager.isTpb()) {
    const tpbGaugePositionList = getEnemyTpbGaugePosition($gameTroop.troop());
    for (const data of tpbGaugePositionList) {
      const enemy = $gameTroop.members()[data[0] - 1];
      if (enemy) {
        enemy.setTpbGaugePosition(data[1], data[2]);
      }
    }
  }
};


const _Game_Enemy_initMembers = Game_Enemy.prototype.initMembers;
Game_Enemy.prototype.initMembers = function() {
  _Game_Enemy_initMembers.call(this);
  this._battlerTpbPositionX = 0;
  this._battlerTpbPositionY = 0;
};

Game_Enemy.prototype.setTpbGaugePosition = function(x, y){
  this._battlerTpbPositionX = x;
  this._battlerTpbPositionY = y;
};

Game_Enemy.prototype.getTpbGaugePositionX = function(){
  return this._battlerTpbPositionX;
};

Game_Enemy.prototype.getTpbGaugePositionY = function(){
  return this._battlerTpbPositionY;
};

})();