/*:-----------------------------------------------------------------------------------
 * NUUN_BattlerMPGauge.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc  バトラーMPゲージ
 * @author NUUN
 * @base NUUN_Base
 * @version 1.2.5
 * @orderAfter NUUN_Base
 * 
 * @help
 * 敵またはSVアクターのバトラー上にMPゲージを表示します。
 * 
 * 敵キャラまたはアクターのメモ欄
 * <MPGaugeX:[position]> MPゲージのX座標を調整します。（相対座標）
 * <MPGaugeY:[position]> MPゲージのY座標を調整します。（相対座標）
 * [position]:座標
 * 
 * 敵キャラのメモ欄
 * <NoMPGauge> MPゲージを表示しません。
 * <MPGaugeLength:[width], [height]> MPゲージの幅を指定します。
 * [width]:ゲージ横幅
 * [height]:ゲージ縦幅
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
 * 初期MPゲージ表示
 * <MPGaugeVisible>の特徴を持つアクターが戦闘メンバーにいるとき、または図鑑登録と連動している際に登録済みなら表示されます。
 * 上記の特徴を使用する場合は初期MPゲージ表示を非表示に設定してください。
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
 * 2025/1/3 Ver.1.2.5
 * 変身後のモンスターのゲージが非表示に設定されている場合、ゲージが表示がされたままになる問題を修正。
 * 2023/8/3 Ver.1.2.4
 * 一部のプラグインにてNoMPGaugeが機能していなかった問題を修正。
 * 2023/7/7 Ver.1.2.3
 * 一部プラグインで表示した敵キャラにゲージを表示されるとエラーが出る問題を修正。
 * 2023/6/23 Ver.1.2.2
 * NoMPGaugeが機能していなかった問題を修正。
 * 2023/6/2 Ver.1.2.1
 * 不具合の修正。
 * 2023/6/2 Ver.1.2.0
 * SVアクターにゲージを表示する機能を追加。
 * 敵キャラ毎にHPゲージの横幅、縦幅を指定できる機能を追加。
 * 2023/5/7 Ver.1.1.1
 * MPゲージの表示をフェードアウト、フェードインさせるように修正。
 * 2022/5/14 Ver.1.1.0
 * バトラーの表示処理の定義大幅変更に関する定義変更。
 * 2022/1/10 Ver.1.0.2
 * 再修正。
 * 2022/1/10 Ver.1.0.1
 * ゲージがラベル表示でも座標0から表示されてしまう問題を修正。
 * 2022/1/12 Ver.1.0.0
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
 * @parent EnemyVisibleSetting
 * 
 * @param MPVisible
 * @desc MPゲージの表示タイミング
 * @text MPゲージ表示タイミング
 * @type select
 * @option 常に表示
 * @value 0
 * @option 選択時
 * @value 1
 * @option MP変動時
 * @value 2
 * @option 選択時、MP変動時
 * @value 3
 * @default 0
 * @parent EnemyVisibleSetting
 * 
 * @param GaugeSetting
 * @text ゲージ設定
 * @default ------------------------------
 * @parent EnemySetting
 * 
 * @param GaugeWidth
 * @desc ゲージの横幅を指定します。
 * @text ゲージ横幅
 * @type number
 * @default 128
 * @min 0
 * @parent GaugeSetting
 * 
 * @param GaugeHeight
 * @desc ゲージの縦幅を指定します。
 * @text ゲージ縦幅
 * @type number
 * @default 12
 * @min 0
 * @parent GaugeSetting
 * 
 * @param Gauge_X
 * @desc ゲージのX座標（相対座標）指定します。
 * @text ゲージX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent GaugeSetting
 * 
 * @param Gauge_Y
 * @desc ゲージのY座標（相対座標）指定します。
 * @text ゲージY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent GaugeSetting
 * 
 * @param MPLabelVisible
 * @text MPラベル表示
 * @desc MPラベルを表示する。
 * @type boolean
 * @default true
 * @parent GaugeSetting
 * 
 * @param MPValueVisible
 * @text MP数値表示
 * @desc MP数値を表示する。
 * @type boolean
 * @default true
 * @parent GaugeSetting
 * 
 * @param ValueFontSize
 * @desc 数値のフォントサイズ。（メインフォントサイズから）
 * @text 数値フォントサイズ
 * @type number
 * @default -6
 * @min -9999
 * @parent GaugeSetting
 * 
 * @param LabelFontSize
 * @desc ラベルのフォントサイズ。（メインフォントサイズから）
 * @text ラベルフォントサイズ
 * @type number
 * @default -2
 * @min -9999
 * @parent GaugeSetting
 * 
 * @param MaskValueName
 * @desc MPの数値を隠す時の文字。
 * @text MPの数値を隠す時の文字
 * @type string
 * @default ????
 * @parent GaugeSetting
 * 
 * @param SpecialSetting
 * @text 特殊設定
 * @default ------------------------------
 * @parent GaugeSetting
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
 * @parent SpecialSetting
 * 
 * @param EnemyBookSetting
 * @text 図鑑連動設定
 * @default ------------------------------
 * @parent GaugeSetting
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
 * @parent EnemyBookSetting
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
 * @param ActorMPPosition
 * @desc アクターのMPゲージ位置
 * @text MPゲージ位置
 * @type select
 * @option 表示なし
 * @value -1
 * @option SV画像の上
 * @value 0
 * @option SV画像の下
 * @value 1
 * @default -1
 * @parent ActorVisibleSetting
 * 
 * @param ActorMPVisible
 * @desc MPゲージの表示タイミング
 * @text MPゲージ表示タイミング
 * @type select
 * @option 常に表示
 * @value 0
 * @option 選択時
 * @value 1
 * @option MP変動時
 * @value 2
 * @option 選択時、MP変動時
 * @value 3
 * @default 0
 * @parent ActorVisibleSetting
 * 
 * @param ActorGaugeSetting
 * @text アクターゲージ設定
 * @default ------------------------------
 * @parent ActorSetting
 * 
 * @param ActorGaugeWidth
 * @desc アクターのゲージの横幅を指定します。
 * @text ゲージ横幅
 * @type number
 * @default 128
 * @min 0
 * @parent ActorGaugeSetting
 * 
 * @param ActorGaugeHeight
 * @desc アクターのゲージの縦幅を指定します。
 * @text ゲージ縦幅
 * @type number
 * @default 12
 * @min 0
 * @parent ActorGaugeSetting
 * 
 * @param ActorGauge_X
 * @desc アクターのゲージのX座標（相対座標）指定します。
 * @text ゲージX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorGaugeSetting
 * 
 * @param ActorGauge_Y
 * @desc アクターのゲージのY座標（相対座標）指定します。
 * @text ゲージY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorGaugeSetting
 * 
 * @param ActorMPLabelVisible
 * @text MPラベル表示
 * @desc アクターのMPラベルを表示する。
 * @type boolean
 * @default true
 * @parent ActorGaugeSetting
 * 
 * @param ActorMPValueVisible
 * @text MP数値表示
 * @desc アクターのMP数値を表示する。
 * @type boolean
 * @default true
 * @parent ActorGaugeSetting
 * 
 * @param ActorValueFontSize
 * @desc アクターの数値のフォントサイズ。（メインフォントサイズから）
 * @text 数値フォントサイズ
 * @type number
 * @default -6
 * @min -9999
 * @parent ActorGaugeSetting
 * 
 * @param ActorLabelFontSize
 * @desc アクターの ラベルのフォントサイズ。（メインフォントサイズから）
 * @text ラベルフォントサイズ
 * @type number
 * @default -2
 * @min -9999
 * @parent ActorGaugeSetting
 * 
 */
var Imported = Imported || {};
Imported.NUUN_BattlerMPGauge = true;

(() => {
const parameters = PluginManager.parameters('NUUN_BattlerMPGauge');
const MPPosition = Number(parameters['MPPosition'] || 0);
const MPVisible = Number(parameters['MPVisible'] || 0);
const ActorMPPosition = Number(parameters['ActorMPPosition'] || 0);
const ActorMPVisible = Number(parameters['ActorMPVisible'] || -1);
const MPVisibleMode = Number(parameters['MPVisibleMode'] || 0);
const MPEnemyBookVisible = Number(parameters['MPEnemyBookVisible'] || 0);
const GaugeWidth = Number(parameters['GaugeWidth'] || 128);
const GaugeHeight = Number(parameters['GaugeHeight'] || 12);
const Gauge_X = Number(parameters['Gauge_X'] || 0);
const Gauge_Y = Number(parameters['Gauge_Y'] || 0);
const ActorGaugeWidth = Number(parameters['ActorGaugeWidth'] || 128);
const ActorGaugeHeight = Number(parameters['ActorGaugeHeight'] || 12);
const ActorGauge_X = Number(parameters['ActorGauge_X'] || 0);
const ActorGauge_Y = Number(parameters['ActorGauge_Y'] || 0);
const ActorMPLabelVisible = eval(parameters['ActorMPLabelVisible'] || 'true');
const ActorMPValueVisible = eval(parameters['ActorMPValueVisible'] || 'true');
const MPLabelVisible = eval(parameters['MPLabelVisible'] || 'true');
const MPValueVisible = eval(parameters['MPValueVisible'] || 'true');
const ValueFontSize = Number(parameters['ValueFontSize'] || -6);
const LabelFontSize = Number(parameters['LabelFontSize'] || -2);
const ActorLabelFontSize = Number(parameters['ActorLabelFontSize'] || -2);
const ActorValueFontSize = Number(parameters['ActorValueFontSize'] || -6);
const MaskValueName = String(parameters['MaskValueName'] || '????');
let enemyMPGaugeLength = null;

function getEnemyMpGaugePosition(troop) {
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

const _Sprite_Actor_update = Sprite_Actor.prototype.update;
Sprite_Actor.prototype.update = function() {
  _Sprite_Actor_update.call(this);
  this.updateMpGauge();
};

const _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
Sprite_Enemy.prototype.update = function() {
  _Sprite_Enemy_update.call(this);
  this.updateMpGauge();
};

Sprite_Enemy.prototype.noMpGaugePosition = function() {
    return MPPosition < 0;
};

Sprite_Actor.prototype.noMpGaugePosition = function() {
    return (this._battler.isEnemy() ? MPPosition : ActorMPPosition) < 0;
};

Sprite_Actor.prototype.noMpGauge = function() {
    return this._battler.isEnemy() ? this._battler.enemy().meta.NoMPGauge : false;
};

Sprite_Enemy.prototype.noMpGauge = function() {
    return this._enemy.enemy().meta.NoMPGauge;
};

Sprite_Battler.prototype.updateMpGauge = function() {
    if (!this._battler || this.noMpGaugePosition() || this.noMpGauge()) {
        return;
    }
    if (this.battlerOverlay && !this._battlerMp) {
        this.createMpGauge();
    }
    this.setMpGaugePosition();
};

Sprite_Enemy.prototype.setMpGaugePosition = function() {
    if (this._battlerMp) {
        const enemy = this._enemy.enemy();
        const x = (enemy.meta.MPGaugeX ? Number(enemy.meta.MPGaugeX) : 0) + Gauge_X + this._enemy.getMpGaugePositionX();
        const y = (enemy.meta.MPGaugeY ? Number(enemy.meta.MPGaugeY) : 0) + Gauge_Y + this._enemy.getMpGaugePositionY();
        this._battlerMp.x = x;
        this._battlerMp.y = y - this.getBattlerMpPosition();
    }
};

Sprite_Actor.prototype.setMpGaugePosition = function() {
    if (this._battler.isEnemy()) {
        Sprite_Enemy.prototype.setMpGaugePosition.call(this);
    } else if (this._battlerMp) {
        const actor = this._actor.actor();
        const x = (actor.meta.MPGaugeX ? Number(actor.meta.MPGaugeX) : 0) + ActorGauge_X;
        const y = (actor.meta.MPGaugeY ? Number(actor.meta.MPGaugeY) : 0) + ActorGauge_Y;
        this._battlerMP.x = x;
        this._battlerMP.y = y - this.getBattlerMpSVPosition();
    }
};

Sprite_Battler.prototype.getBattlerMpPosition = function() {
    const scale = this.getBattlerOverlayConflict();
    if (MPPosition === 0) {
        return this.getBattlerOverlayHeight() * scale;
    } else if (MPPosition === 2) {
        return Math.floor((this.getBattlerOverlayHeight() * scale) / 2);
    } else {
        return 0;
    }
};

Sprite_Actor.prototype.getBattlerMpSVPosition = function() {
    const scale = this.battlerOverlay.battlerSpriteScale_y;
    if (ActorMPPosition === 0) {
      return this.getSVBattlerHeight() * scale;
    } else if (ActorMPPosition === 2) {
      return Math.floor((this.getSVBattlerHeight() * scale) / 2);
    } else {
      return 0;
    }
};

Sprite_Enemy.prototype.createMpGauge = function() {
    enemyMPGaugeLength = getSplit(this._enemy.enemy().meta.MPGaugeLength);
    const sprite = new Sprite_EnemyMPGauge();
    this.battlerOverlay.addChild(sprite);
    this._battlerMp = sprite;
    sprite.setup(this._enemy, "mp");
    sprite.show();
    sprite.move(0, 0);
    $gameTemp.enemyMpGaugeRefresh = true;
};
  
Sprite_Actor.prototype.createMpGauge = function() {
    if (this._battler.isEnemy()) {
        Sprite_Enemy.prototype.createMpGauge.call(this);
        return;
    }
    enemyMPGaugeLength = null;
    const sprite = new Sprite_BattlerMPGauge();
    this.battlerOverlay.addChild(sprite);
    this._battlerMp = sprite;
    sprite.setup(this._actor, "mp");
    sprite.show();
    sprite.move(0, 0);
    $gameTemp.enemyMpGaugeRefresh = true;
};

function Sprite_BattlerMPGauge() {
    this.initialize(...arguments);
}
  
Sprite_BattlerMPGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_BattlerMPGauge.prototype.constructor = Sprite_BattlerMPGauge;
  
Sprite_BattlerMPGauge.prototype.initialize = function() {
    Sprite_Gauge.prototype.initialize.call(this);
    this._gaugeDuration = 0;
    this._startVisible = true;
    this.anchor.x = 0.5;
    this.anchor.y = 1;
};

Sprite_BattlerMPGauge.prototype.bitmapWidth = function() {
    return ActorGaugeWidth > 0 ? ActorGaugeWidth : 128;
};
  
Sprite_BattlerMPGauge.prototype.gaugeHeight = function() {
    return ActorGaugeHeight > 0 ? ActorGaugeHeight : 12;
};

Sprite_BattlerMPGauge.prototype.labelFontSize = function() {
    return this._gaugeData ? Sprite_Gauge.prototype.labelFontSize.call(this) : $gameSystem.mainFontSize() + ActorLabelFontSize;
};
  
Sprite_BattlerMPGauge.prototype.valueFontSize = function() {
    return this._gaugeData ? Sprite_Gauge.prototype.valueFontSize.call(this) : $gameSystem.mainFontSize() + ActorValueFontSize;
};

Sprite_BattlerMPGauge.prototype.drawLabel = function() {
    if (this.isMPLabelVisible()) {
        Sprite_Gauge.prototype.drawLabel.call(this);
    }
};

Sprite_BattlerMPGauge.prototype.isMPLabelVisible = function() {
    return ActorMPLabelVisible;
};

Sprite_BattlerMPGauge.prototype.isMPValueVisible = function() {
    return ActorMPValueVisible;
};

Sprite_BattlerMPGauge.prototype.getMPVisible = function() {
    return ActorMPVisible;
};

Sprite_BattlerMPGauge.prototype.noMpGauge = function() {
    return this._battler.isEnemy() ? this._battler.enemy().meta.NoMPGauge : false;
};

Sprite_BattlerMPGauge.prototype.setup = function(battler, type) {
    Sprite_Gauge.prototype.setup.call(this, battler, type);
    this.opacity = (this.gaugeVisibleResult() && (this.gaugeVisibleInDamage() || this.gaugeVisibleInSelect())) ? 255 : 0;
};

Sprite_BattlerMPGauge.prototype.gaugeX = function() {
    if (!this.isMPLabelVisible()) {
      return 0;
    } else {
      return Sprite_Gauge.prototype.gaugeX.call(this);
    }
};

Sprite_BattlerMPGauge.prototype.drawValue = function() {
    if (this.isMPValueVisible()) {
        if (this.isVisibleValue()) {
            const width = this.bitmapWidth();
            const height = this.bitmapHeight();
            this.setupValueFont();
            this.bitmap.drawText(MaskValueName, 0, 0, width, height, "right");
        } else {
            Sprite_Gauge.prototype.drawValue.call(this);
        }
    }
};

Sprite_BattlerMPGauge.prototype.isVisibleValue = function() {
    return false;
};

Sprite_BattlerMPGauge.prototype.updateBitmap = function() {
    Sprite_Gauge.prototype.updateBitmap.call(this);
    this.gaugeVisible();
};

Sprite_BattlerMPGauge.prototype.gaugeVisible = function() {
    const _visible = this.gaugeVisibleResult() && (this.gaugeVisibleInDamage() || this.gaugeVisibleInSelect());
    if (_visible && this.opacity < 255) {
        this.opacity += 25;
        this.opacity = this.opacity.clamp(0, 255);
    } else if (!_visible && this.opacity > 0) {
        this.opacity -= 25;
        this.opacity = this.opacity.clamp(0, 255);
    }
    if (this.opacity > 0) {
        this.visible = true;
    } else {
        this.visible = false;
    }
};

Sprite_BattlerMPGauge.prototype.gaugeVisibleResult = function() {
    return !this.noMpGauge();
};

Sprite_BattlerMPGauge.prototype.updateTargetValue = function(value, maxValue) {
    if (!this._startVisible && !isNaN(this._value) && this.getMPVisible() >= 2) {
        this._gaugeDuration = 60;
    } else if (this._startVisible) {
        this._startVisible = false;
    }
    Sprite_Gauge.prototype.updateTargetValue.call(this, value, maxValue);
};
  
Sprite_BattlerMPGauge.prototype.updateGaugeAnimation = function() {
    if (this._gaugeDuration > 0) {
        this._gaugeDuration--;
    }
    Sprite_Gauge.prototype.updateGaugeAnimation.call(this);
};


Sprite_BattlerMPGauge.prototype.gaugeVisibleInDamage = function() {
    if (this.getMPVisible() >= 2) {
        return this._gaugeDuration > 0;
    } else if (this.getMPVisible() === 1) {
        return false;
    }
    return true;
};
  
Sprite_BattlerMPGauge.prototype.gaugeVisibleInSelect = function() {
    if (this.getMPVisible() === 1 || this.getMPVisible() === 3) {
        return this._battler.isSelected();
    } else if (this.getMPVisible() === 2) {
        return false;
    }
    return true;
};

function Sprite_EnemyMPGauge() {
  this.initialize(...arguments);
}

Sprite_EnemyMPGauge.prototype = Object.create(Sprite_BattlerMPGauge.prototype);
Sprite_EnemyMPGauge.prototype.constructor = Sprite_EnemyMPGauge;

Sprite_EnemyMPGauge.prototype.initialize = function() {
    this._enemyGaugeWidth = enemyMPGaugeLength ? (Number(enemyMPGaugeLength[0]) || 0) : 0;
    this._enemyGaugeHeight = enemyMPGaugeLength ? (Number(enemyMPGaugeLength[1]) || 0) : 0;
    Sprite_BattlerMPGauge.prototype.initialize.call(this);
};

Sprite_EnemyMPGauge.prototype.bitmapWidth = function() {
  return this._enemyGaugeWidth > 0 ? this._enemyGaugeWidth : (GaugeWidth > 0 ? GaugeWidth : 128);
};

Sprite_EnemyMPGauge.prototype.gaugeHeight = function() {
  return this._enemyGaugeHeight > 0 ? this._enemyGaugeHeight : (GaugeHeight > 0 ? GaugeHeight : 12);
};

Sprite_EnemyMPGauge.prototype.labelFontSize = function() {
  return this._gaugeData ? Sprite_Gauge.prototype.labelFontSize.call(this) : $gameSystem.mainFontSize() + LabelFontSize;
};

Sprite_EnemyMPGauge.prototype.valueFontSize = function() {
  return this._gaugeData ? Sprite_Gauge.prototype.valueFontSize.call(this) : $gameSystem.mainFontSize() + ValueFontSize;
};

Sprite_EnemyMPGauge.prototype.isMPLabelVisible = function() {
    return MPLabelVisible;
};

Sprite_EnemyMPGauge.prototype.isMPValueVisible = function() {
    return MPValueVisible;
};

Sprite_EnemyMPGauge.prototype.getMPVisible = function() {
    return MPVisible;
};

Sprite_EnemyMPGauge.prototype.isVisibleValue = function() {
    return this._battler._MPGaugeValueVisible && !this._battler._MPGaugeMask;
};

Sprite_EnemyMPGauge.prototype.gaugeVisibleResult = function() {
    if (this.noMpGauge()) {
        return false;
    } else if (MPVisibleMode === 1) {
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


const _Spriteset_Battle_updateBattlerOverlay = Spriteset_Battle.prototype.updateBattlerOverlay;
Spriteset_Battle.prototype.updateBattlerOverlay = function() {
  _Spriteset_Battle_updateBattlerOverlay.call(this);
  if ($gameTemp.enemyMpGaugeRefresh) {
    this.setMpGaugePosition();
    $gameTemp.enemyMpGaugeRefresh = false;
  }
};

Spriteset_Battle.prototype.setMpGaugePosition = function() {
  const mpGaugePositionList = getEnemyMpGaugePosition($gameTroop.troop());
  for (const data of mpGaugePositionList) {
    const enemy = $gameTroop.members()[data[0] - 1];
    if (enemy) {
      enemy.setMpGaugePosition(data[1], data[2]);
    }
  }
};


const _Game_Battler_refresh = Game_Battler.prototype.refresh;
Game_Battler.prototype.refresh = function() {
  _Game_Battler_refresh.call(this);
  if (this.isEnemy()) {
    this.MpGaugeVisible();
    this.MpGaugeMask();
  }
};

const _Game_Enemy_initMembers = Game_Enemy.prototype.initMembers;
Game_Enemy.prototype.initMembers = function() {
  _Game_Enemy_initMembers.call(this);
  this._visibleMpGauge = false;
  this._MPGaugeMask = false;
  this._battlerMpPositionX = 0;
  this._battlerMpPositionY = 0;
};

const _Game_Enemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
  _Game_Enemy_setup.call(this, enemyId, x, y);
  this._MPGaugeValueVisible = this.enemy().meta.MPGaugeMask ? true : false;
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

Game_Enemy.prototype.setMpGaugePosition = function(x, y){
  this._battlerMpPositionX = x;
  this._battlerMpPositionY = y;
};

Game_Enemy.prototype.getMpGaugePositionX = function(){
  return this._battlerMpPositionX;
};

Game_Enemy.prototype.getMpGaugePositionY = function(){
  return this._battlerMpPositionY;
};

function getSplit(tag) {
    return tag ? tag.split(',') : null;
};

})();