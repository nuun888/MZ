/*:-----------------------------------------------------------------------------------
 * NUUN_EnemyTPGauge.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc  敵TPゲージ
 * @author NUUN
 * @base NUUN_Base
 * @version 1.1.0
 * @orderAfter NUUN_Base
 * 
 * @help
 * 敵のバトラー上にTPゲージを表示します。
 * 
 * 敵キャラのメモ欄
 * <TPGaugeX:[position]> TPゲージのX座標を調整します。（相対座標）
 * <TPGaugeY:[position]> TPゲージのY座標を調整します。（相対座標）
 * <NoTPGauge> TPゲージを表示しません。
 * 
 * バトルイベントの注釈
 * <TPGaugePosition:[Id],[x],[y]> 敵グループの[Id]番目のモンスターのゲージの位置を調整します。（相対座標）
 * [Id]：表示順番号
 * [x]：X座標
 * [y]：Y座標
 * [id]は敵グループ設定で配置した順番のIDで指定します。モンスター画像の左上に番号が表示されますのでその番号を記入します。
 * 
 * 特徴を有するメモ欄
 * <TPGaugeVisible> この特徴を持つアクターが存在すれば、敵のTPゲージが表示されます。
 * <EnemyTPGaugeVisible> この特徴を持つ敵はTPゲージが表示されます。
 * 敵のメモ欄
 * <TPGaugeMask:[eval]> 条件に一致しなければTP値の表示を？？？にします。
 * this 敵データ
 * this.enemy() 敵のデータベースデータ
 * 例　<TPGaugeMask:this.tp >= this.maxTp() * 0.5>
 * 敵のTPが５０％以上の時にTP値を表示します。
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
 * 2022/5/14 Ver.1.1.0
 * バトラーの表示処理の定義大幅変更に関する定義変更。
 * 2022/2/12 Ver.1.0.3
 * ダメージ時に表示を指定の時に戦闘開始時にゲージが表示されてしまう問題を修正。
 * 2022/1/10 Ver.1.0.2
 * 再修正。
 * 2022/1/10 Ver.1.0.1
 * ゲージがラベル表示でも座標0から表示されてしまう問題を修正。
 * 2022/1/12 Ver.1.0.0
 * 初版
 * 
 * @param CommonSetting
 * @text 共通設定
 * @default ------------------------------
 * 
 * @param TPPosition
 * @desc 敵のTPゲージ位置
 * @text TPゲージ位置
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
 * @param TPVisible
 * @desc TPゲージの表示タイミング
 * @text TPゲージ表示タイミング
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
 * @param TPVisibleMode
 * @desc 初期状態でのTPゲージの表示。特徴によってやTPゲージの表示タイミングによって表示されるようになります。
 * @text TPゲージ表示
 * @type select
 * @option 表示
 * @value 0
 * @option 非表示
 * @value 1
 * @default 0
 * 
 * @param TPEnemyBookVisible
 * @desc TPゲージの表示タイミング（モンスター図鑑）
 * @text TPゲージ表示タイミング（モンスター図鑑）
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
 * @param TPLabelVisible
 * @text TPラベル表示
 * @desc TPラベルを表示する。
 * @type boolean
 * @default true
 * 
 * @param TPValueVisible
 * @text TP数値表示
 * @desc TP数値を表示する。
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
 * @desc TPの数値を隠す時の文字。
 * @text TPの数値を隠す時の文字
 * @type string
 * @default ????
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_EnemyTPGauge = true;

(() => {
const parameters = PluginManager.parameters('NUUN_EnemyTPGauge');
const TPPosition = Number(parameters['TPPosition'] || 0);
const TPVisible = Number(parameters['TPVisible'] || 0);
const TPVisibleMode = Number(parameters['TPVisibleMode'] || 0);
const TPEnemyBookVisible = Number(parameters['TPEnemyBookVisible'] || 0);
const GaugeWidth = Number(parameters['GaugeWidth'] || 128);
const GaugeHeight = Number(parameters['GaugeHeight'] || 12);
const Gauge_X = Number(parameters['Gauge_X'] || 0);
const Gauge_Y = Number(parameters['Gauge_Y'] || 0);
const TPLabelVisible = eval(parameters['TPLabelVisible'] || 'true');
const TPValueVisible = eval(parameters['TPValueVisible'] || 'true');
const ValueFontSize = Number(parameters['ValueFontSize'] || -6);
const LabelFontSize = Number(parameters['LabelFontSize'] || -2);
const MaskValueName = String(parameters['MaskValueName'] || '????');

function getEnemyTpGaugePosition(troop) {
  const pages = troop.pages[0];
  list = [];
  const re = /<(?:TPGaugePosition):\s*(.*)>/;
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

const _Sprite_Enemy_initMembers = Sprite_Enemy.prototype.initMembers;
Sprite_Enemy.prototype.initMembers = function() {
  _Sprite_Enemy_initMembers.call(this);
};

const _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
Sprite_Enemy.prototype.update = function() {
  _Sprite_Enemy_update.call(this);
  this.updateTpGauge();
};

Sprite_Enemy.prototype.updateTpGauge = function() {
  if (TPPosition < 0) {
    return;
  }
  if (this.battlerOverlay && !this._butlerTp) {
    this.createTpGauge();
  }
  if (this._butlerTp) {
    const enemy = this._enemy.enemy();
    const x = (enemy.meta.TPGaugeX ? Number(enemy.meta.TPGaugeX) : 0) + Gauge_X + this._enemy.getTpGaugePositionX();
    const y = (enemy.meta.TPGaugeY ? Number(enemy.meta.TPGaugeY) : 0) + Gauge_Y + this._enemy.getTpGaugePositionY();
    this._butlerTp.x = x;
    this._butlerTp.y = y - this.getButlerTpPosition();
  }
};

Sprite_Enemy.prototype.getButlerTpPosition = function() {
  const scale = this.getButlerOverlayConflict();
  if (TPPosition === 0) {
    return this.getButlerOverlayHeight() * scale;
  } else if (TPPosition === 2) {
    return Math.floor((this.getButlerOverlayHeight() * scale) / 2);
  } else {
    return 0;
  }
};

Sprite_Enemy.prototype.createTpGauge = function() {
  const sprite = new Sprite_EnemyTPGauge();
  this.battlerOverlay.addChild(sprite);
  this._butlerTp = sprite;
  sprite.setup(this._enemy, "tp");
  sprite.show();
  sprite.move(0, 0);
  $gameTemp.enemyTpGaugeRefresh = true;
};


function Sprite_EnemyTPGauge() {
  this.initialize(...arguments);
}

Sprite_EnemyTPGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_EnemyTPGauge.prototype.constructor = Sprite_EnemyTPGauge;

Sprite_EnemyTPGauge.prototype.initialize = function() {
  this._gaugeDuration = 0;
  this._startVisible = TPVisible >= 2;
  Sprite_Gauge.prototype.initialize.call(this);
  this.anchor.x = 0.5;
  this.anchor.y = 1;
};

Sprite_EnemyTPGauge.prototype.bitmapWidth = function() {
  return GaugeWidth > 0 ? GaugeWidth : 128;
};

Sprite_EnemyTPGauge.prototype.gaugeHeight = function() {
  return GaugeHeight > 0 ? GaugeHeight : 12;
};

Sprite_EnemyTPGauge.prototype.labelFontSize = function() {
  return this._gaugeData ? Sprite_Gauge.prototype.labelFontSize.call(this) : $gameSystem.mainFontSize() + LabelFontSize;
};

Sprite_EnemyTPGauge.prototype.valueFontSize = function() {
  return this._gaugeData ? Sprite_Gauge.prototype.valueFontSize.call(this) : $gameSystem.mainFontSize() + ValueFontSize;
};

Sprite_EnemyTPGauge.prototype.drawLabel = function() {
  if (TPLabelVisible) {
    Sprite_Gauge.prototype.drawLabel.call(this);
  }
};

Sprite_EnemyTPGauge.prototype.gaugeX = function() {
  if (!TPLabelVisible) {
    return 0;
  } else {
    return Sprite_Gauge.prototype.gaugeX.call(this);
  }
};

Sprite_EnemyTPGauge.prototype.drawValue = function() {
  if (TPValueVisible) {
    if (this._battler._TPGaugeValueVisible && !this._battler._TPGaugeMask) {
      const width = this.bitmapWidth();
      const height = this.bitmapHeight();
      this.setupValueFont();
      this.bitmap.drawText(MaskValueName, 0, 0, width, height, "right");
    } else {
      Sprite_Gauge.prototype.drawValue.call(this);
    }
  }
};

const _Sprite_EnemyTPGauge_updateBitmap = Sprite_EnemyTPGauge.prototype.updateBitmap;
Sprite_EnemyTPGauge.prototype.updateBitmap = function() {
  _Sprite_EnemyTPGauge_updateBitmap.call(this);
  this.gaugeVisible();
};

Sprite_EnemyTPGauge.prototype.gaugeVisible = function() {
  this.visible = this.gaugeVisibleResult() && (this.gaugeVisibleInDamage() || this.gaugeVisibleInSelect());
};

Sprite_EnemyTPGauge.prototype.gaugeVisibleResult = function() {
  if (TPVisibleMode === 1) {
    const result = this.gaugeVisibleBattler();
    if (TPEnemyBookVisible === 0) {
      return result;
    }
    return result || this.gaugeEnemyBookVisible();
  } else {
    return true;
  }
};

Sprite_EnemyTPGauge.prototype.gaugeVisibleBattler = function() {
  return BattleManager.visibleTpGauge || this._battler._visibleTpGauge;
};

Sprite_EnemyTPGauge.prototype.gaugeEnemyBookVisible = function() {
  if (Imported.NUUN_EnemyBook) {
    if (TPEnemyBookVisible === 1) {
      return $gameSystem.isInEnemyBook(this._battler.enemy());
    } else if (TPEnemyBookVisible === 2) {
      return $gameSystem.isInEnemyBookStatus(this._battler.enemy());
    }
  }
  return true;
};

Sprite_EnemyTPGauge.prototype.updateTargetValue = function(value, maxValue) {
  if (!this._startVisible && TPVisible >= 2) {
    this._gaugeDuration = 60;
  }
  if (this._startVisible && !isNaN(this._targetValue)) {
    this._startVisible = false;
  }
  Sprite_Gauge.prototype.updateTargetValue.call(this, value, maxValue);
};

const _Sprite_EnemyTPGauge_updateGaugeAnimation  = Sprite_EnemyTPGauge.prototype.updateGaugeAnimation;
Sprite_EnemyTPGauge.prototype.updateGaugeAnimation = function() {
  if (this._gaugeDuration > 0) {
    this._gaugeDuration--;
  }
  _Sprite_EnemyTPGauge_updateGaugeAnimation.call(this);
};

Sprite_EnemyTPGauge.prototype.gaugeVisibleInDamage = function() {
  if (TPVisible >= 2) {
    return this._gaugeDuration > 0;
  } else if (TPVisible === 1) {
    return false;
  }
  return true;
};

Sprite_EnemyTPGauge.prototype.gaugeVisibleInSelect = function() {
  if (TPVisible === 1 || TPVisible === 3) {
    return this._battler.isSelected();
  } else if (TPVisible === 2) {
    return false;
  }
  return true;
};


const _Spriteset_Battle_updateButlerOverlay = Spriteset_Battle.prototype.updateButlerOverlay;
Spriteset_Battle.prototype.updateButlerOverlay = function() {
  _Spriteset_Battle_updateButlerOverlay.call(this);
  if ($gameTemp.enemyTpGaugeRefresh) {
    this.setTpGaugePosition();
    $gameTemp.enemyTpGaugeRefresh = false;
  }
};

Spriteset_Battle.prototype.setTpGaugePosition = function() {
  const tpGaugePositionList = getEnemyTpGaugePosition($gameTroop.troop());
  for (const data of tpGaugePositionList) {
    const enemy = $gameTroop.members()[data[0] - 1];
    if (enemy) {
      enemy.setTpGaugePosition(data[1], data[2]);
    }
  }
};

const _Game_Enemy_initMembers = Game_Enemy.prototype.initMembers;
Game_Enemy.prototype.initMembers = function() {
  _Game_Enemy_initMembers.call(this);
  this._visibleTpGauge = false;
  this._TPGaugeMask = false;
  this._butlerTpPositionX = 0;
  this._butlerTpPositionY = 0;
};

const _Game_Enemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
  _Game_Enemy_setup.call(this, enemyId, x, y);
  this._TPGaugeValueVisible = this.enemy().meta.TPGaugeMask ? true : false;
  this.showTpGauge = !this.enemy().meta.NoTPGauge;
};

const _Game_Battler_refresh = Game_Battler.prototype.refresh;
Game_Battler.prototype.refresh = function() {
  _Game_Battler_refresh.call(this);
  if (this.isEnemy()) {
    this.TpGaugeVisible();
    this.TpGaugeMask();
  }
};

Game_Enemy.prototype.TpGaugeVisibleTrait = function(){
  return this.traitObjects().some(traitObject => traitObject.meta.EnemyTPGaugeVisible);
};

Game_Enemy.prototype.TpGaugeVisible = function(){
  this._visibleTpGauge = this.TpGaugeVisibleTrait();
};

Game_Enemy.prototype.TpGaugeMask = function(){
  if (this._TPGaugeValueVisible) {
    this._TPGaugeMask = eval(this.enemy().meta.TPGaugeMask);
  }
};

Game_Enemy.prototype.setTpGaugePosition = function(x, y){
  this._butlerTpPositionX = x;
  this._butlerTpPositionY = y;
};

Game_Enemy.prototype.getTpGaugePositionX = function(){
  return this._butlerTpPositionX;
};

Game_Enemy.prototype.getTpGaugePositionY = function(){
  return this._butlerTpPositionY;
};

})();