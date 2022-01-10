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
 * @plugindesc  敵HPゲージ
 * @author NUUN
 * @base NUUN_Base
 * @version 1.4.1
 * @orderAfter NUUN_Base
 * 
 * @help
 * 敵のバトラー上にHP、MP、TPゲージを表示します。
 * 
 * 敵キャラのメモ欄
 * <HPGaugeX:[position]> HPゲージのX座標を調整します。（相対座標）
 * <HPGaugeY:[position]> HPゲージのY座標を調整します。（相対座標）
 * <NoHPGauge> HPゲージを表示しません。
 * 
 * バトルイベントの注釈
 * <HPGaugePosition:[Id],[x],[y]> 敵グループの[Id]番目のモンスターのゲージの位置を調整します。（相対座標）
 * [Id]：表示順番号
 * [x]：X座標
 * [y]：Y座標
 * [id]は敵グループ設定で配置した順番のIDで指定します。モンスター画像の左上に番号が表示されますのでその番号を記入します。
 * 
 * 特徴を有するメモ欄
 * <HPGaugeVisible> この特徴を持つアクターが存在すれば、敵のHPゲージが表示されます。
 * <EnemyHPGaugeVisible> この特徴を持つ敵はHPゲージが表示されます。
 * 敵のメモ欄
 * <HPGaugeMask:[eval]> 条件に一致しなければHP値の表示を？？？にします。
 * this 敵データ
 * this.enemy() 敵のデータベースデータ
 * 例　<HPGaugeMask:this.hp < this.mhp * 0.3>
 * 敵のHPが３０％未満の時のみHP値を表示します。
 * 
 * このプラグインはNUUN_Base Ver.1.2.0以降が必要です。
 * 
 * 疑似３Dバトルを入れている場合はこのプラグインを疑似３Dバトルを下に配置してください。
 * ゲージ表示拡張プラグインで該当のゲージを設定している場合は、フォントサイズの設定はゲージ表示拡張プラグインで設定してください。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/1/10 Ver.1.4.1
 * ゲージがラベル表示でも座標0から表示されてしまう問題を修正。
 * 2021/12/19 Ver.1.4.0
 * ゲージ画像化対応。
 * 2021/11/8 Ver.1.3.3
 * 敵グループの座標変更の設定方法を変更。
 * 2021/11/6 Ver.1.3.2
 * 不要な処理を削除。
 * 2021/11/5 Ver.1.3.1
 * 敵グループからゲージ座標するタグの名前が不自然だったのを変更。
 * 2021/11/5 Ver.1.3.0
 * 敵グループのモンスター毎にゲージの座標を調整できる機能を追加。
 * 2021/9/2 Ver.1.2.7
 * 中心に表示する機能を追加。
 * 2021/8/31 Ver.1.2.6
 * HPラベルが非表示の時にラベル分の余白が空いてしまう問題を修正。
 * 2021/8/29 Ver.1.2.5
 * 一部プラグインとの競合対策。
 * 2021/7/15 Ver.1.2.4
 * 処理の最適化により一部処理をNUUN_Baseに移行。
 * 2021/7/13 Ver.1.2.3
 * エネミー画像を消去する及び新たにエネミー画像を追加表示するプラグインとの競合対策。
 * 2021/6/28 Ver.1.2.2
 * 一部が機能しなくなっていたので処理修正
 * 2021/6/28 Ver.1.2.1
 * 条件によりHPを隠す機能を追加。
 * 2021/6/26 Ver.1.2.0
 * 状況によってHPゲージを表示する機能を追加。
 * 2021/6/20 Ver.1.1.1
 * モンスター図鑑（NUUN_EnemyBook）の登録により表示する機能を追加。
 * 2021/6/19 Ver.1.1.0
 * HPゲージの表示タイミングを設定できる機能を追加。
 * 2021/6/19 Ver.1.0.3
 * 疑似3DバトルVer.1.1対応のため一部の処理を変更。
 * 2021/5/24 Ver.1.0.2
 * HPラベル、数値を表示させない機能を追加。
 * 2021/5/24 Ver.1.0.1
 * HPゲージを表示させない機能を追加。
 * 2021/5/24 Ver.1.0.0
 * 初版
 * 
 * @param CommonSetting
 * @text 共通設定
 * @default ------------------------------
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
 * @option 敵画像の中心
 * @value 2
 * @default 0
 * 
 * @param HPVisible
 * @desc HPゲージの表示タイミング
 * @text HPゲージ表示タイミング
 * @type select
 * @option 常に表示
 * @value 0
 * @option 選択時
 * @value 1
 * @option ダメージ時
 * @value 2
 * @option 選択時、ダメージ時
 * @value 3
 * @default 0
 * 
 * @param HPVisibleMode
 * @desc 初期状態でのHPゲージの表示。特徴によってやHPゲージの表示タイミングによって表示されるようになります。
 * @text HPゲージ表示
 * @type select
 * @option 表示
 * @value 0
 * @option 非表示
 * @value 1
 * @default 0
 * 
 * @param HPEnemyBookVisible
 * @desc HPゲージの表示タイミング（モンスター図鑑）
 * @text HPゲージ表示タイミング（モンスター図鑑）
 * @type select
 * @option 指定なし
 * @value 0
 * @option 図鑑登録後に表示
 * @value 1
 * @option 図鑑情報登録後に表示
 * @value 2
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
 * @param HPLabelVisible
 * @text HPラベル表示
 * @desc HPラベルを表示する。
 * @type boolean
 * @default true
 * 
 * @param HPValueVisible
 * @text HP数値表示
 * @desc HP数値を表示する。
 * @type boolean
 * @default true
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
 * @param MaskValueName
 * @desc HPの数値を隠す時の文字。
 * @text HPの数値を隠す時の文字
 * @type string
 * @default ????
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
Imported.NUUN_ButlerHPGauge = true;

(() => {
const parameters = PluginManager.parameters('NUUN_ButlerHPGauge');
const HPPosition = Number(parameters['HPPosition'] || 0);
const HPVisible = Number(parameters['HPVisible'] || 0);
const HPVisibleMode = Number(parameters['HPVisibleMode'] || 0);
const HPEnemyBookVisible = Number(parameters['HPEnemyBookVisible'] || 0);
const GaugeWidth = Number(parameters['GaugeWidth'] || 128);
const GaugeHeight = Number(parameters['GaugeHeight'] || 12);
const Gauge_X = Number(parameters['Gauge_X'] || 0);
const Gauge_Y = Number(parameters['Gauge_Y'] || 0);
const HPLabelVisible = eval(parameters['HPLabelVisible'] || 'true');
const HPValueVisible = eval(parameters['HPValueVisible'] || 'true');
const ValueFontSize = Number(parameters['ValueFontSize'] || -6);
const LabelFontSize = Number(parameters['LabelFontSize'] || -2);
const ConflictScale = Number(parameters['ConflictScale'] || 0);
const MaskValueName = String(parameters['MaskValueName'] || '????');
let hpGaugePositionList = [];

const _Sprite_Enemy_initMembers = Sprite_Enemy.prototype.initMembers;
Sprite_Enemy.prototype.initMembers = function() {
  _Sprite_Enemy_initMembers.call(this);
};

const _Sprite_Enemy_updateBitmap = Sprite_Enemy.prototype.updateBitmap;
Sprite_Enemy.prototype.updateBitmap = function() {
  _Sprite_Enemy_updateBitmap.call(this);
};

Sprite_Enemy.prototype.updateHpGauge = function() {
  if (BattleManager.gaugeBaseSprite) {
    if (!this._butlerHp) {
      $gameTemp.enemyHPGaugeRefresh = true;
      this.enemyHPGauge();
    }
    this._butlerHp.x = this.hpGaugeOffsetX + (this.x - this._butlerHp.width / 2);
    this._butlerHp.y = this.hpGaugeOffsetY + this.y - 40;
    if (this.getButlerHpPosition() === 0) {
      this._butlerHp.y -= this.getButlerHpHeight();
    } else if (this.getButlerHpPosition() === 2) {
      this._butlerHp.y -= Math.floor(this.getButlerHpHeight() / 2);
    }
    this.hpGaugeOpacity();
    if (this._butlerHp._gaugeImgSprite) {
      this._butlerHp._gaugeImgSprite.x = this._butlerHp.x;
      this._butlerHp._gaugeImgSprite.y = this._butlerHp.y;
    }
  }
};

Sprite_Enemy.prototype.enemyHPGauge = function() {
  const butlerGaugeBase = BattleManager.gaugeBaseSprite;
  if (this._enemy.showHpGauge) {
    if (Imported.NUUN_GaugeImage) {
      this.createSpriteGauge(butlerGaugeBase, 'hp');
    }
    const sprite = new Sprite_EnemyHPGauge();
    butlerGaugeBase.addChild(sprite);
    sprite.setup(this._enemy, "hp");
    sprite.show();
    sprite.move(0, 0);
    this._butlerHp = sprite;
    sprite.enemySpriteId = this.spriteId;
    this.hpGaugeOffsetX = this._enemy.getHPGaugePositionX() + (this._enemy.enemy().meta.HPGaugeX ? Number(this._enemy.enemy().meta.HPGaugeX) : 0) + (Graphics.width - Graphics.boxWidth) / 2 + Gauge_X;
    this.hpGaugeOffsetY = this._enemy.getHPGaugePositionY() + (this._enemy.enemy().meta.HPGaugeY ? Number(this._enemy.enemy().meta.HPGaugeY) : 0) + Gauge_Y + (Graphics.height - Graphics.boxHeight) / 2;
  }
};

Sprite_Enemy.prototype.getButlerHpHeight = function() {
  const scale = this.getButlerHPConflict();
  if (this._SVBattlername) {
    return Math.floor(((this._mainSprite.bitmap.height / 6) + 30) * 0.9);
  } else if (this._svBattlerSprite) {
    return Math.floor((this.height + 30) * 0.9);
  } else {
    return Math.floor(((this.bitmap.height + 70) * 0.9) * scale);
  }
};

Sprite_Enemy.prototype.getButlerHPConflict = function() {
  if (ConflictScale === 1) {
    return this.scale.y;
  } else if (ConflictScale === 2) {
    return this._baseScale.y;
  } else {
    return 1;
  }
};

Sprite_Enemy.prototype.getButlerHpPosition = function() {
  return HPPosition;
};

Sprite_Enemy.prototype.hpGaugeOpacity = function() {
  if (this._effectType !== "blink") {
    this._butlerHp.opacity = this.opacity;
    if (this._butlerHp._gaugeImgSprite) {
      this._butlerHp._gaugeImgSprite.opacity = this.opacity;
    }
  }
};


const _Spriteset_Battle_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
  _Spriteset_Battle_update.call(this);
  if ($gameTemp.enemyHPGaugeRefresh) {
    this.setHPGaugePosition();
    $gameTemp.enemyHPGaugeRefresh = false;
  }
  for (const sprite of this._enemySprites) {
    if (sprite._enemy && sprite._enemy.showHpGauge && HPPosition >= 0)
    sprite.updateHpGauge();
  }
};

const _Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
  _Spriteset_Battle_createLowerLayer.call(this);
  this.createEnemyHpGauge();
};

Spriteset_Battle.prototype.createEnemyHpGauge = function() {
  if (HPPosition >= 0) {
    hpGaugePositionList = getEnemyGaugePosition($gameTroop.troop());
    this.setHPGaugePosition();
    for (const sprite of this._enemySprites) {
      this.enemyHPGauge(sprite);
    }
  }
};

Spriteset_Battle.prototype.enemyHPGauge = function(sprite) {
  sprite.enemyHPGauge();
};

Spriteset_Battle.prototype.setHPGaugePosition = function() {
  for (const data of hpGaugePositionList) {
    const enemy = $gameTroop.members()[data[0] - 1];
    if (enemy) {
      enemy.setHPGaugePosition(data[1], data[2]);
    }
  }
};

function Sprite_EnemyHPGauge() {
  this.initialize(...arguments);
}

Sprite_EnemyHPGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_EnemyHPGauge.prototype.constructor = Sprite_EnemyHPGauge;

Sprite_EnemyHPGauge.prototype.initialize = function() {
  Sprite_Gauge.prototype.initialize.call(this);
  this._gaugeDuration = 0;
  this._startVisible = true;
};

Sprite_EnemyHPGauge.prototype.bitmapWidth = function() {
  return GaugeWidth > 0 ? GaugeWidth : 128;
};

Sprite_EnemyHPGauge.prototype.gaugeHeight = function() {
  return GaugeHeight > 0 ? GaugeHeight : 12;
};

Sprite_EnemyHPGauge.prototype.labelFontSize = function() {
  return this._gaugeData ? Sprite_Gauge.prototype.labelFontSize.call(this) : $gameSystem.mainFontSize() + LabelFontSize;
};

Sprite_EnemyHPGauge.prototype.valueFontSize = function() {
  return this._gaugeData ? Sprite_Gauge.prototype.valueFontSize.call(this) : $gameSystem.mainFontSize() + ValueFontSize;
};

Sprite_EnemyHPGauge.prototype.drawLabel = function() {
  if (HPLabelVisible) {
    Sprite_Gauge.prototype.drawLabel.call(this);
  }
};

Sprite_EnemyHPGauge.prototype.gaugeX = function() {
  if (!HPLabelVisible && !this._isGaugeData) {
    return 0;
  } else {
    return Sprite_Gauge.prototype.gaugeX.call(this);
  }
};

Sprite_EnemyHPGauge.prototype.drawValue = function() {
  if (HPValueVisible) {
    if (this._battler._HPGaugeValueVisible && !this._battler._HPGaugeMask) {
      const width = this.bitmapWidth();
      const height = this.bitmapHeight();
      this.setupValueFont();
      this.bitmap.drawText(MaskValueName, 0, 0, width, height, "right");
    } else {
      Sprite_Gauge.prototype.drawValue.call(this);
    }
  }
};

const _Sprite_EnemyHPGauge_updateBitmap = Sprite_EnemyHPGauge.prototype.updateBitmap;
Sprite_EnemyHPGauge.prototype.updateBitmap = function() {
  _Sprite_EnemyHPGauge_updateBitmap.call(this);
  this.gaugeVisible();
};

Sprite_EnemyHPGauge.prototype.gaugeVisible = function() {
  this.visible = this.gaugeVisibleResult() && (this.gaugeVisibleInDamage() || this.gaugeVisibleInSelect());
};

Sprite_EnemyHPGauge.prototype.gaugeVisibleResult = function() {
  if (HPVisibleMode === 1) {
    const result = this.gaugeVisibleBattler();
    if (HPEnemyBookVisible === 0) {
      return result;
    }
    return result || this.gaugeEnemyBookVisible();
  } else {
    return true;
  }
};

Sprite_EnemyHPGauge.prototype.gaugeVisibleBattler = function() {
  return BattleManager.visibleHpGauge || this._battler._visibleHpGauge;
};

Sprite_EnemyHPGauge.prototype.gaugeEnemyBookVisible = function() {
  if (Imported.NUUN_EnemyBook) {
    if (HPEnemyBookVisible === 1) {
      return $gameSystem.isInEnemyBook(this._battler.enemy());
    } else if (HPEnemyBookVisible === 2) {
      return $gameSystem.isInEnemyBookStatus(this._battler.enemy());
    }
  }
  return true;
};

const _Sprite_EnemyHPGauge_updateTargetValue = Sprite_EnemyHPGauge.prototype.updateTargetValue;
Sprite_EnemyHPGauge.prototype.updateTargetValue = function(value, maxValue) {
  if (!this._startVisible && !isNaN(this._value) && HPVisible >= 2) {
    this._gaugeDuration = 60;
  } else if (this._startVisible) {
    this._startVisible = false;
  }
  _Sprite_EnemyHPGauge_updateTargetValue.call(this, value, maxValue);
};

const _Sprite_EnemyHPGauge_updateGaugeAnimation  = Sprite_EnemyHPGauge.prototype.updateGaugeAnimation;
Sprite_EnemyHPGauge.prototype.updateGaugeAnimation = function() {
  if (this._gaugeDuration > 0) {
    this._gaugeDuration--;
  }
  _Sprite_EnemyHPGauge_updateGaugeAnimation.call(this);
};

Sprite_EnemyHPGauge.prototype.gaugeVisibleInDamage = function() {
  if (HPVisible >= 2) {
    return this._gaugeDuration > 0;
  } else if (HPVisible === 1) {
    return false;
  }
  return true;
};

Sprite_EnemyHPGauge.prototype.gaugeVisibleInSelect = function() {
  if (HPVisible === 1 || HPVisible === 3) {
    return this._battler.isSelected();
  } else if (HPVisible === 2) {
    return false;
  }
  return true;
};

Game_Actor.prototype.HpGaugeVisibleTrait = function(){
  return this.traitObjects().some(traitObject => traitObject.meta.HPGaugeVisible);
};

Game_Actor.prototype.HpGaugeVisible = function(){
  this._visibleHpGauge = this.HpGaugeVisibleTrait();
  BattleManager.hpGaugeVisible();
};

Game_Actor.prototype.HpGaugeMask = function(){
  this._HPGaugeMask = false;
};

const _Game_Battler_refresh = Game_Battler.prototype.refresh;
Game_Battler.prototype.refresh = function() {
  _Game_Battler_refresh.call(this);
  this.HpGaugeVisible();
  this.HpGaugeMask();
};

const _Game_Enemy_initMembers = Game_Enemy.prototype.initMembers;
Game_Enemy.prototype.initMembers = function() {
  _Game_Enemy_initMembers.call(this);
  this._visibleHpGauge = false;
  this._HPGaugeMask = false;
  this._butlerHpPositionX = 0;
  this._butlerHpPositionY = 0;
};

const _Game_Enemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
  _Game_Enemy_setup.call(this, enemyId, x, y);
  this._HPGaugeValueVisible = this.enemy().meta.HPGaugeMask ? true : false;
  this.showHpGauge = !this.enemy().meta.NoHPGauge;
};

Game_Enemy.prototype.HpGaugeVisibleTrait = function(){
  return this.traitObjects().some(traitObject => traitObject.meta.EnemyHPGaugeVisible);
};

Game_Enemy.prototype.HpGaugeVisible = function(){
  this._visibleHpGauge = this.HpGaugeVisibleTrait();
};

Game_Enemy.prototype.HpGaugeMask = function(){
  if (this._HPGaugeValueVisible) {
    this._HPGaugeMask = eval(this.enemy().meta.HPGaugeMask);
  }
};

Game_Enemy.prototype.setHPGaugePosition = function(x, y){
  this._butlerHpPositionX = x;
  this._butlerHpPositionY = y;
};

Game_Enemy.prototype.getHPGaugePositionX = function(){
  return this._butlerHpPositionX;
};

Game_Enemy.prototype.getHPGaugePositionY = function(){
  return this._butlerHpPositionY;
};


BattleManager.hpGaugeVisible = function() {
  this.visibleHpGauge = $gameParty.battleMembers().some(actor => actor._visibleHpGauge);
};

function getEnemyGaugePosition(troop) {
  const pages = troop.pages[0];
  list = [];
  const re = /<(?:HPGaugePosition):\s*(.*)>/;
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