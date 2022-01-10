/*:-----------------------------------------------------------------------------------
 * NUUN_EnemyMPGauge.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc  敵MPゲージ
 * @author NUUN
 * @base NUUN_Base
 * @version 1.0.1
 * @orderAfter NUUN_Base
 * 
 * @help
 * 敵のバトラー上にMPゲージを表示します。
 * 
 * 敵キャラのメモ欄
 * <MPGaugeX:[position]> MPゲージのX座標を調整します。（相対座標）
 * <MPGaugeY:[position]> MPゲージのY座標を調整します。（相対座標）
 * <NoMPGauge> MPゲージを表示しません。
 * 
 * バトルイベントの注釈
 * <MPGaugePosition:[Id],[x],[y]> 敵グループの[Id]番目のモンスターのゲージの位置を調整します。（相対座標）
 * [Id]：表示順番号
 * [x]：X座標
 * [y]：Y座標
 * [id]は敵グループ設定で配置した順番のIDで指定します。モンスター画像の左上に番号が表示されますのでその番号を記入します。
 * 
 * 特徴を有するメモ欄
 * <MPGaugeVisible> この特徴を持つアクターが存在すれば、敵のMPゲージが表示されます。
 * <EnemyMPGaugeVisible> この特徴を持つ敵はMPゲージが表示されます。
 * 敵のメモ欄
 * <MPGaugeMask:[eval]> 条件に一致しなければMP値の表示を？？？にします。
 * this 敵データ
 * this.enemy() 敵のデータベースデータ
 * 例　<MPGaugeMask:this.mp < this.mmp * 0.3>
 * 敵のMPが３０％未満の時にMP値を表示します。
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
 * 2022/1/10 Ver.1.0.1
 * ゲージがラベル表示でも座標0から表示されてしまう問題を修正。
 * 2022/1/12 Ver.1.0.0
 * 初版
 * 
 * @param CommonSetting
 * @text 共通設定
 * @default ------------------------------
 * 
 * @param MPPosition
 * @desc 敵のMPゲージ位置
 * @text MPゲージ位置
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
 * @param MPVisible
 * @desc MPゲージの表示タイミング
 * @text MPゲージ表示タイミング
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
 * @param MPVisibleMode
 * @desc 初期状態でのMPゲージの表示。特徴によってやMPゲージの表示タイミングによって表示されるようになります。
 * @text MPゲージ表示
 * @type select
 * @option 表示
 * @value 0
 * @option 非表示
 * @value 1
 * @default 0
 * 
 * @param MPEnemyBookVisible
 * @desc MPゲージの表示タイミング（モンスター図鑑）
 * @text MPゲージ表示タイミング（モンスター図鑑）
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
 * @param MPLabelVisible
 * @text MPラベル表示
 * @desc MPラベルを表示する。
 * @type boolean
 * @default true
 * 
 * @param MPValueVisible
 * @text MP数値表示
 * @desc MP数値を表示する。
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
 * @desc MPの数値を隠す時の文字。
 * @text MPの数値を隠す時の文字
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
Imported.NUUN_EnemyMPGauge = true;

(() => {
const parameters = PluginManager.parameters('NUUN_EnemyMPGauge');
const MPPosition = Number(parameters['MPPosition'] || 0);
const MPVisible = Number(parameters['MPVisible'] || 0);
const MPVisibleMode = Number(parameters['MPVisibleMode'] || 0);
const MPEnemyBookVisible = Number(parameters['MPEnemyBookVisible'] || 0);
const GaugeWidth = Number(parameters['GaugeWidth'] || 128);
const GaugeHeight = Number(parameters['GaugeHeight'] || 12);
const Gauge_X = Number(parameters['Gauge_X'] || 0);
const Gauge_Y = Number(parameters['Gauge_Y'] || 0);
const MPLabelVisible = eval(parameters['MPLabelVisible'] || 'true');
const MPValueVisible = eval(parameters['MPValueVisible'] || 'true');
const ValueFontSize = Number(parameters['ValueFontSize'] || -6);
const LabelFontSize = Number(parameters['LabelFontSize'] || -2);
const ConflictScale = Number(parameters['ConflictScale'] || 0);
const MaskValueName = String(parameters['MaskValueName'] || '????');
let mpGaugePositionList = [];

const _Sprite_Enemy_initMembers = Sprite_Enemy.prototype.initMembers;
Sprite_Enemy.prototype.initMembers = function() {
  _Sprite_Enemy_initMembers.call(this);
};

const _Sprite_Enemy_updateBitmap = Sprite_Enemy.prototype.updateBitmap;
Sprite_Enemy.prototype.updateBitmap = function() {
  _Sprite_Enemy_updateBitmap.call(this);
};

Sprite_Enemy.prototype.updateMpGauge = function() {
  if (BattleManager.gaugeBaseSprite) {
    if (!this._butlerMp) {
      $gameTemp.enemyMPGaugeRefresh = true;
      this.enemyMPGauge();
    }
    this._butlerMp.x = this.mpGaugeOffsetX + (this.x - this._butlerMp.width / 2);
    this._butlerMp.y = this.mpGaugeOffsetY + this.y - 40;
    if (this.getButlerMpPosition() === 0) {
      this._butlerMp.y -= this.getButlerMpHeight();
    } else if (this.getButlerMpPosition() === 2) {
      this._butlerMp.y -= Math.floor(this.getButlerMpHeight() / 2);
    }
    this.mpGaugeOpacity();
    if (this._butlerMp._gaugeImgSprite) {
      this._butlerMp._gaugeImgSprite.x = this._butlerMp.x;
      this._butlerMp._gaugeImgSprite.y = this._butlerMp.y;
    }
  }
};

Sprite_Enemy.prototype.enemyMPGauge = function() {
  const butlerGaugeBase = BattleManager.gaugeBaseSprite;
  if (this._enemy.showMpGauge) {
    if (Imported.NUUN_GaugeImage) {
      this.createSpriteGauge(butlerGaugeBase, 'mp');
    }
    const sprite = new Sprite_EnemyMPGauge();
    butlerGaugeBase.addChild(sprite);
    sprite.setup(this._enemy, "mp");
    sprite.show();
    sprite.move(0, 0);
    this._butlerMp = sprite;
    sprite.enemySpriteId = this.spriteId;
    this.mpGaugeOffsetX = this._enemy.getMPGaugePositionX() + (this._enemy.enemy().meta.MPGaugeX ? Number(this._enemy.enemy().meta.MPGaugeX) : 0) + (Graphics.width - Graphics.boxWidth) / 2 + Gauge_X;
    this.mpGaugeOffsetY = this._enemy.getMPGaugePositionY() + (this._enemy.enemy().meta.MPGaugeY ? Number(this._enemy.enemy().meta.MPGaugeY) : 0) + Gauge_Y + (Graphics.height - Graphics.boxHeight) / 2;
  }
};

Sprite_Enemy.prototype.getButlerMpHeight = function() {
  const scale = this.getButlerMPConflict();
  if (this._SVBattlername) {
    return Math.floor(((this._mainSprite.bitmap.height / 6) + 30) * 0.9);
  } else if (this._svBattlerSprite) {
    return Math.floor((this.height + 30) * 0.9);
  } else {
    return Math.floor(((this.bitmap.height + 70) * 0.9) * scale);
  }
};

Sprite_Enemy.prototype.getButlerMPConflict = function() {
  if (ConflictScale === 1) {
    return this.scale.y;
  } else if (ConflictScale === 2) {
    return this._baseScale.y;
  } else {
    return 1;
  }
};

Sprite_Enemy.prototype.getButlerMpPosition = function() {
  return MPPosition;
};

Sprite_Enemy.prototype.mpGaugeOpacity = function() {
  if (this._effectType !== "blink") {
    this._butlerMp.opacity = this.opacity;
    if (this._butlerMp._gaugeImgSprite) {
      this._butlerMp._gaugeImgSprite.opacity = this.opacity;
    }
  }
};


const _Spriteset_Battle_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
  _Spriteset_Battle_update.call(this);
  if ($gameTemp.enemyMPGaugeRefresh) {
    this.setMPGaugePosition();
    $gameTemp.enemyMPGaugeRefresh = false;
  }
  for (const sprite of this._enemySprites) {
    if (sprite._enemy && sprite._enemy.showMpGauge && MPPosition >= 0)
    sprite.updateMpGauge();
  }
};

const _Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
  _Spriteset_Battle_createLowerLayer.call(this);
  this.createEnemyMpGauge();
};

Spriteset_Battle.prototype.createEnemyMpGauge = function() {
  if (MPPosition >= 0) {
    mpGaugePositionList = getEnemyGaugePosition($gameTroop.troop());
    this.setMPGaugePosition();
    for (const sprite of this._enemySprites) {
      this.enemyMPGauge(sprite);
    }
  }
};

Spriteset_Battle.prototype.enemyMPGauge = function(sprite) {
  sprite.enemyMPGauge();
};

Spriteset_Battle.prototype.setMPGaugePosition = function() {
  for (const data of mpGaugePositionList) {
    const enemy = $gameTroop.members()[data[0] - 1];
    if (enemy) {
      enemy.setMPGaugePosition(data[1], data[2]);
    }
  }
};

function Sprite_EnemyMPGauge() {
  this.initialize(...arguments);
}

Sprite_EnemyMPGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_EnemyMPGauge.prototype.constructor = Sprite_EnemyMPGauge;

Sprite_EnemyMPGauge.prototype.initialize = function() {
  Sprite_Gauge.prototype.initialize.call(this);
  this._gaugeDuration = 0;
  this._startVisible = true;
};

Sprite_EnemyMPGauge.prototype.bitmapWidth = function() {
  return GaugeWidth > 0 ? GaugeWidth : 128;
};

Sprite_EnemyMPGauge.prototype.gaugeHeight = function() {
  return GaugeHeight > 0 ? GaugeHeight : 12;
};

Sprite_EnemyMPGauge.prototype.labelFontSize = function() {
  return this._gaugeData ? Sprite_Gauge.prototype.labelFontSize.call(this) : $gameSystem.mainFontSize() + LabelFontSize;
};

Sprite_EnemyMPGauge.prototype.valueFontSize = function() {
  return this._gaugeData ? Sprite_Gauge.prototype.valueFontSize.call(this) : $gameSystem.mainFontSize() + ValueFontSize;
};

Sprite_EnemyMPGauge.prototype.drawLabel = function() {
  if (MPLabelVisible) {
    Sprite_Gauge.prototype.drawLabel.call(this);
  }
};

Sprite_EnemyMPGauge.prototype.gaugeX = function() {
  if (!MPLabelVisible && !this._isGaugeData) {
    return 0;
  } else {
    return Sprite_Gauge.prototype.gaugeX.call(this);
  }
};

Sprite_EnemyMPGauge.prototype.drawValue = function() {
  if (MPValueVisible) {
    if (this._battler._MPGaugeValueVisible && !this._battler._MPGaugeMask) {
      const width = this.bitmapWidth();
      const height = this.bitmapHeight();
      this.setupValueFont();
      this.bitmap.drawText(MaskValueName, 0, 0, width, height, "right");
    } else {
      Sprite_Gauge.prototype.drawValue.call(this);
    }
  }
};

const _Sprite_EnemyMPGauge_updateBitmap = Sprite_EnemyMPGauge.prototype.updateBitmap;
Sprite_EnemyMPGauge.prototype.updateBitmap = function() {
  _Sprite_EnemyMPGauge_updateBitmap.call(this);
  this.gaugeVisible();
};

Sprite_EnemyMPGauge.prototype.gaugeVisible = function() {
  this.visible = this.gaugeVisibleResult() && (this.gaugeVisibleInDamage() || this.gaugeVisibleInSelect());
};

Sprite_EnemyMPGauge.prototype.gaugeVisibleResult = function() {
  if (MPVisibleMode === 1) {
    const result = this.gaugeVisibleBattler();
    if (MPEnemyBookVisible === 0) {
      return result;
    }
    return result || this.gaugeEnemyBookVisible();
  } else {
    return true;
  }
};

Sprite_EnemyMPGauge.prototype.gaugeVisibleBattler = function() {
  return BattleManager.visibleMpGauge || this._battler._visibleMpGauge;
};

Sprite_EnemyMPGauge.prototype.gaugeEnemyBookVisible = function() {
  if (Imported.NUUN_EnemyBook) {
    if (MPEnemyBookVisible === 1) {
      return $gameSystem.isInEnemyBook(this._battler.enemy());
    } else if (MPEnemyBookVisible === 2) {
      return $gameSystem.isInEnemyBookStatus(this._battler.enemy());
    }
  }
  return true;
};

const _Sprite_EnemyMPGauge_updateTargetValue = Sprite_EnemyMPGauge.prototype.updateTargetValue;
Sprite_EnemyMPGauge.prototype.updateTargetValue = function(value, maxValue) {
  if (!this._startVisible && !isNaN(this._value) && MPVisible >= 2) {
    this._gaugeDuration = 60;
  } else if (this._startVisible) {
    this._startVisible = false;
  }
  _Sprite_EnemyMPGauge_updateTargetValue.call(this, value, maxValue);
};

const _Sprite_EnemyMPGauge_updateGaugeAnimation  = Sprite_EnemyMPGauge.prototype.updateGaugeAnimation;
Sprite_EnemyMPGauge.prototype.updateGaugeAnimation = function() {
  if (this._gaugeDuration > 0) {
    this._gaugeDuration--;
  }
  _Sprite_EnemyMPGauge_updateGaugeAnimation.call(this);
};

Sprite_EnemyMPGauge.prototype.gaugeVisibleInDamage = function() {
  if (MPVisible >= 2) {
    return this._gaugeDuration > 0;
  } else if (MPVisible === 1) {
    return false;
  }
  return true;
};

Sprite_EnemyMPGauge.prototype.gaugeVisibleInSelect = function() {
  if (MPVisible === 1 || MPVisible === 3) {
    return this._battler.isSelected();
  } else if (MPVisible === 2) {
    return false;
  }
  return true;
};

Game_Actor.prototype.MpGaugeVisibleTrait = function(){
  return this.traitObjects().some(traitObject => traitObject.meta.MPGaugeVisible);
};

Game_Actor.prototype.MpGaugeVisible = function(){
  this._visibleMpGauge = this.MpGaugeVisibleTrait();
  BattleManager.mpGaugeVisible();
};

Game_Actor.prototype.MpGaugeMask = function(){
  this._MPGaugeMask = false;
};

const _Game_Battler_refresh = Game_Battler.prototype.refresh;
Game_Battler.prototype.refresh = function() {
  _Game_Battler_refresh.call(this);
  this.MpGaugeVisible();
  this.MpGaugeMask();
};

const _Game_Enemy_initMembers = Game_Enemy.prototype.initMembers;
Game_Enemy.prototype.initMembers = function() {
  _Game_Enemy_initMembers.call(this);
  this._visibleMpGauge = false;
  this._MPGaugeMask = false;
  this._butlerMpPositionX = 0;
  this._butlerMpPositionY = 0;
};

const _Game_Enemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
  _Game_Enemy_setup.call(this, enemyId, x, y);
  this._MPGaugeValueVisible = this.enemy().meta.MPGaugeMask ? true : false;
  this.showMpGauge = !this.enemy().meta.NoMPGauge;
};

Game_Enemy.prototype.MpGaugeVisibleTrait = function(){
  return this.traitObjects().some(traitObject => traitObject.meta.EnemyMPGaugeVisible);
};

Game_Enemy.prototype.MpGaugeVisible = function(){
  this._visibleMpGauge = this.MpGaugeVisibleTrait();
};

Game_Enemy.prototype.MpGaugeMask = function(){
  if (this._MPGaugeValueVisible) {
    this._MPGaugeMask = eval(this.enemy().meta.MPGaugeMask);
  }
};

Game_Enemy.prototype.setMPGaugePosition = function(x, y){
  this._butlerMpPositionX = x;
  this._butlerMpPositionY = y;
};

Game_Enemy.prototype.getMPGaugePositionX = function(){
  return this._butlerMpPositionX;
};

Game_Enemy.prototype.getMPGaugePositionY = function(){
  return this._butlerMpPositionY;
};


BattleManager.mpGaugeVisible = function() {
  this.visibleMpGauge = $gameParty.battleMembers().some(actor => actor._visibleMpGauge);
};

function getEnemyGaugePosition(troop) {
  const pages = troop.pages[0];
  list = [];
  const re = /<(?:MPGaugePosition):\s*(.*)>/;
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