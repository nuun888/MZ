/*:-----------------------------------------------------------------------------------
 * NUUN_BattlerTPGauge.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc  バトラーTPゲージ
 * @author NUUN
 * @base NUUN_Base
 * @version 1.2.4
 * @orderAfter NUUN_Base
 * 
 * @help
 * 戦闘中の敵及びSVアクターにTPゲージを表示します。
 * 
 * 敵キャラまたはアクターのメモ欄
 * <TPGaugeX:[position]> TPゲージのX座標を調整します。（相対座標）
 * <TPGaugeY:[position]> TPゲージのY座標を調整します。（相対座標）
 * 
 * 敵キャラのメモ欄
 * <NoTPGauge> TPゲージを表示しません。
 * <TPGaugeLength:[width], [height]> TPゲージの幅を指定します。
 * [width]:ゲージ横幅
 * [height]:ゲージ縦幅
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
 * 初期TPゲージ表示
 * <TPGaugeVisible>の特徴を持つアクターが戦闘メンバーにいるとき、または図鑑登録と連動している際に登録済みなら表示されます。
 * 上記の特徴を使用する場合は初期TPゲージ表示を非表示に設定してください。
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
 * 2025/1/3 Ver.1.2.4
 * 変身後のモンスターのゲージが非表示に設定されている場合、ゲージが表示がされたままになる問題を修正。
 * 2023/8/3 Ver.1.2.3
 * 一部のプラグインにてNoTPGaugeが機能していなかった問題を修正。
 * 2023/7/7 Ver.1.2.2
 * 一部プラグインで表示した敵キャラにゲージを表示されるとエラーが出る問題を修正。
 * 2023/6/23 Ver.1.2.1
 * NoTPGaugeが機能していなかった問題を修正。
 * 2023/6/2 Ver.1.2.0
 * SVアクターにゲージを表示する機能を追加。
 * 敵キャラ毎にHPゲージの横幅、縦幅を指定できる機能を追加。
 * 2023/5/7 Ver.1.1.1
 * TPゲージの表示をフェードアウト、フェードインさせるように修正。
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
 * @param EnemySetting
 * 
 * @param TPVisible
 * @desc TPゲージの表示タイミング
 * @text TPゲージ表示タイミング
 * @type select
 * @option 常に表示
 * @value 0
 * @option 選択時
 * @value 1
 * @option TP変動時
 * @value 2
 * @option 選択時、TP変動時
 * @value 3
 * @default 0
 * @param EnemySetting
 * 
 * @param GaugeSetting
 * @text ゲージ設定
 * @default ------------------------------
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
 * @param TPLabelVisible
 * @text TPラベル表示
 * @desc TPラベルを表示する。
 * @type boolean
 * @default true
 * @parent GaugeSetting
 * 
 * @param TPValueVisible
 * @text TP数値表示
 * @desc TP数値を表示する。
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
 * @desc TPの数値を隠す時の文字。
 * @text TPの数値を隠す時の文字
 * @type string
 * @default ????
 * @parent GaugeSetting
 * 
 * @param SpecialSetting
 * @text 特殊設定
 * @default ------------------------------
 * @parent GaugeSetting
 * 
 * @param TPVisibleMode
 * @desc 初期状態でのTPゲージの表示。特徴によってやTPゲージの表示タイミングによって表示されるようになります。
 * @text 初期TPゲージ表示
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
 * @parent SpecialSetting
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
 * @param ActorTPPosition
 * @desc アクターのTPゲージ位置
 * @text TPゲージ位置
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
 * @param ActorTPVisible
 * @desc TPゲージの表示タイミング
 * @text TPゲージ表示タイミング
 * @type select
 * @option 常に表示
 * @value 0
 * @option 選択時
 * @value 1
 * @option TP変動時
 * @value 2
 * @option 選択時、TP変動時
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
 * @param ActorTPLabelVisible
 * @text TPラベル表示
 * @desc アクターのTPラベルを表示する。
 * @type boolean
 * @default true
 * @parent ActorGaugeSetting
 * 
 * @param ActorTPValueVisible
 * @text TP数値表示
 * @desc アクターのTP数値を表示する。
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
 * 
 */
var Imported = Imported || {};
Imported.NUUN_BattlerTPGauge = true;

(() => {
const parameters = PluginManager.parameters('NUUN_BattlerTPGauge');
const TPPosition = Number(parameters['TPPosition'] || 0);
const TPVisible = Number(parameters['TPVisible'] || 0);
const TPVisibleMode = Number(parameters['TPVisibleMode'] || 0);
const ActorTPPosition = Number(parameters['ActorTPPosition'] || 0);
const ActorTPVisible = Number(parameters['ActorTPVisible'] || -1);
const TPEnemyBookVisible = Number(parameters['TPEnemyBookVisible'] || 0);
const GaugeWidth = Number(parameters['GaugeWidth'] || 128);
const GaugeHeight = Number(parameters['GaugeHeight'] || 12);
const Gauge_X = Number(parameters['Gauge_X'] || 0);
const Gauge_Y = Number(parameters['Gauge_Y'] || 0);
const ActorGaugeWidth = Number(parameters['ActorGaugeWidth'] || 128);
const ActorGaugeHeight = Number(parameters['ActorGaugeHeight'] || 12);
const ActorGauge_X = Number(parameters['ActorGauge_X'] || 0);
const ActorGauge_Y = Number(parameters['ActorGauge_Y'] || 0);
const ActorTPLabelVisible = eval(parameters['ActorTPLabelVisible'] || 'true');
const ActorTPValueVisible = eval(parameters['ActorTPValueVisible'] || 'true');
const TPLabelVisible = eval(parameters['TPLabelVisible'] || 'true');
const TPValueVisible = eval(parameters['TPValueVisible'] || 'true');
const ValueFontSize = Number(parameters['ValueFontSize'] || -6);
const LabelFontSize = Number(parameters['LabelFontSize'] || -2);
const ActorLabelFontSize = Number(parameters['ActorLabelFontSize'] || -2);
const ActorValueFontSize = Number(parameters['ActorValueFontSize'] || -6);
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

const _Sprite_Actor_update = Sprite_Actor.prototype.update;
Sprite_Actor.prototype.update = function() {
  _Sprite_Actor_update.call(this);
  this.updateTpGauge();
};

const _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
Sprite_Enemy.prototype.update = function() {
  _Sprite_Enemy_update.call(this);
  this.updateTpGauge();
};

Sprite_Enemy.prototype.noTpGaugePosition = function() {
    return TPPosition < 0;
};

Sprite_Actor.prototype.noTpGaugePosition = function() {
    return (this._battler.isEnemy() ? TPPosition : ActorTPPosition) < 0;
};

Sprite_Actor.prototype.noTpGauge = function() {
    return this._battler.isEnemy() ? this._battler.enemy().meta.NoTPGauge : false;
};

Sprite_Enemy.prototype.noTpGauge = function() {
    return this._enemy.enemy().meta.NoTPGauge;
};

Sprite_Battler.prototype.updateTpGauge = function() {
    if (!this._battler || this.noTpGaugePosition() || this.noTpGauge()) {
        return;
    }
    if (this.battlerOverlay && !this._battlerTp) {
        this.createTpGauge();
    }
    this.setTpGaugePosition();
};

Sprite_Enemy.prototype.setTpGaugePosition = function() {
    if (this._battlerTp) {
        const enemy = this._enemy.enemy();
        const x = (enemy.meta.TPGaugeX ? Number(enemy.meta.TPGaugeX) : 0) + Gauge_X + this._enemy.getTpGaugePositionX();
        const y = (enemy.meta.TPGaugeY ? Number(enemy.meta.TPGaugeY) : 0) + Gauge_Y + this._enemy.getTpGaugePositionY();
        this._battlerTp.x = x;
        this._battlerTp.y = y - this.getBattlerTpPosition();
      }
};

Sprite_Actor.prototype.setTpGaugePosition = function() {
    if (this._battler.isEnemy()) {
        Sprite_Enemy.prototype.setTpGaugePosition.call(this);
    } else if (this._battlerTp) {
        const actor = this._actor.actor();
        const x = (actor.meta.TPGaugeX ? Number(actor.meta.TPGaugeX) : 0) + ActorGauge_X;
        const y = (actor.meta.TPGaugeY ? Number(actor.meta.TPGaugeY) : 0) + ActorGauge_Y;
        this._battlerTp.x = x;
        this._battlerTp.y = y - this.getBattlerTpSVPosition();
    }
};

Sprite_Battler.prototype.getBattlerTpPosition = function() {
    const scale = this.getBattlerOverlayConflict();
    if (TPPosition === 0) {
        return this.getBattlerOverlayHeight() * scale;
    } else if (TPPosition === 2) {
        return Math.floor((this.getBattlerOverlayHeight() * scale) / 2);
    } else {
        return 0;
    }
};

Sprite_Actor.prototype.getBattlerTpSVPosition = function() {
    const scale = this.battlerOverlay.battlerSpriteScale_y;
    if (ActorTPPosition === 0) {
      return this.getSVBattlerHeight() * scale;
    } else if (ActorTPPosition === 2) {
      return Math.floor((this.getSVBattlerHeight() * scale) / 2);
    } else {
      return 0;
    }
};

Sprite_Enemy.prototype.createTpGauge = function() {
    enemyTPGaugeLength = getSplit(this._enemy.enemy().meta.TPGaugeLength);
    const sprite = new Sprite_EnemyTPGauge();
    this.battlerOverlay.addChild(sprite);
    this._battlerTp = sprite;
    sprite.setup(this._enemy, "tp");
    sprite.show();
    sprite.move(0, 0);
    $gameTemp.enemyTpGaugeRefresh = true;
};
  
Sprite_Actor.prototype.createTpGauge = function() {
    if (this._battler.isEnemy()) {
        Sprite_Enemy.prototype.createTpGauge.call(this);
        return;
    }
    enemyTPGaugeLength = null;
    const sprite = new Sprite_BattlerTPGauge();
    this.battlerOverlay.addChild(sprite);
    this._battlerTp = sprite;
    sprite.setup(this._actor, "tp");
    sprite.show();
    sprite.move(0, 0);
    $gameTemp.enemyTpGaugeRefresh = true;
};


function Sprite_BattlerTPGauge() {
    this.initialize(...arguments);
}
  
Sprite_BattlerTPGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_BattlerTPGauge.prototype.constructor = Sprite_BattlerTPGauge;
  
Sprite_BattlerTPGauge.prototype.initialize = function() {
    Sprite_Gauge.prototype.initialize.call(this);
    this._gaugeDuration = 0;
    this._startVisible = true;
    this.anchor.x = 0.5;
    this.anchor.y = 1;
};

Sprite_BattlerTPGauge.prototype.bitmapWidth = function() {
    return ActorGaugeWidth > 0 ? ActorGaugeWidth : 128;
};
  
Sprite_BattlerTPGauge.prototype.gaugeHeight = function() {
    return ActorGaugeHeight > 0 ? ActorGaugeHeight : 12;
};

Sprite_BattlerTPGauge.prototype.labelFontSize = function() {
    return this._gaugeData ? Sprite_Gauge.prototype.labelFontSize.call(this) : $gameSystem.mainFontSize() + ActorLabelFontSize;
};
  
Sprite_BattlerTPGauge.prototype.valueFontSize = function() {
    return this._gaugeData ? Sprite_Gauge.prototype.valueFontSize.call(this) : $gameSystem.mainFontSize() + ActorValueFontSize;
};

Sprite_BattlerTPGauge.prototype.drawLabel = function() {
    if (this.isTPLabelVisible()) {
        Sprite_Gauge.prototype.drawLabel.call(this);
    }
};

Sprite_BattlerTPGauge.prototype.isTPLabelVisible = function() {
    return ActorTPLabelVisible;
};

Sprite_BattlerTPGauge.prototype.isTPValueVisible = function() {
    return ActorTPValueVisible;
};

Sprite_BattlerTPGauge.prototype.getTPVisible = function() {
    return ActorTPVisible;
};

Sprite_BattlerTPGauge.prototype.noTpGauge = function() {
    return this._battler.isEnemy() ? this._battler.enemy().meta.NoTPGauge : false;
};

Sprite_BattlerTPGauge.prototype.setup = function(battler, type) {
    Sprite_Gauge.prototype.setup.call(this, battler, type);
    this.opacity = (this.gaugeVisibleResult() && (this.gaugeVisibleInDamage() || this.gaugeVisibleInSelect())) ? 255 : 0;
};

Sprite_BattlerTPGauge.prototype.gaugeX = function() {
    if (!this.isTPLabelVisible()) {
      return 0;
    } else {
      return Sprite_Gauge.prototype.gaugeX.call(this);
    }
};

Sprite_BattlerTPGauge.prototype.drawValue = function() {
    if (this.isTPValueVisible()) {
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

Sprite_BattlerTPGauge.prototype.isVisibleValue = function() {
    return false;
};

Sprite_BattlerTPGauge.prototype.updateBitmap = function() {
    Sprite_Gauge.prototype.updateBitmap.call(this);
    this.gaugeVisible();
};

Sprite_BattlerTPGauge.prototype.gaugeVisible = function() {
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

Sprite_BattlerTPGauge.prototype.gaugeVisibleResult = function() {
    return !this.noTpGauge();
};

Sprite_BattlerTPGauge.prototype.updateTargetValue = function(value, maxValue) {
    if (!this._startVisible && !isNaN(this._value) && this.getTPVisible() >= 2) {
        this._gaugeDuration = 60;
    } else if (this._startVisible) {
        this._startVisible = false;
    }
    Sprite_Gauge.prototype.updateTargetValue.call(this, value, maxValue);
};
  
Sprite_BattlerTPGauge.prototype.updateGaugeAnimation = function() {
    if (this._gaugeDuration > 0) {
        this._gaugeDuration--;
    }
    Sprite_Gauge.prototype.updateGaugeAnimation.call(this);
};
  
Sprite_BattlerTPGauge.prototype.gaugeVisibleInDamage = function() {
    if (this.getTPVisible() >= 2) {
        return this._gaugeDuration > 0;
    } else if (this.getTPVisible() === 1) {
        return false;
    }
    return true;
};
  
Sprite_BattlerTPGauge.prototype.gaugeVisibleInSelect = function() {
    if (this.getTPVisible() === 1 || this.getTPVisible() === 3) {
      return this._battler.isSelected();
    } else if (this.getTPVisible() === 2) {
      return false;
    }
    return true;
};

function Sprite_EnemyTPGauge() {
  this.initialize(...arguments);
}

Sprite_EnemyTPGauge.prototype = Object.create(Sprite_BattlerTPGauge.prototype);
Sprite_EnemyTPGauge.prototype.constructor = Sprite_EnemyTPGauge;

Sprite_EnemyTPGauge.prototype.initialize = function() {
    this._enemyGaugeWidth = enemyTPGaugeLength ? (Number(enemyTPGaugeLength[0]) || 0) : 0;
    this._enemyGaugeHeight = enemyTPGaugeLength ? (Number(enemyTPGaugeLength[1]) || 0) : 0;
    Sprite_BattlerTPGauge.prototype.initialize.call(this);
    this._startVisible = TPVisible >= 2;
};

Sprite_EnemyTPGauge.prototype.bitmapWidth = function() {
    return this._enemyGaugeWidth > 0 ? this._enemyGaugeWidth : (GaugeWidth > 0 ? GaugeWidth : 128);
};
  
Sprite_EnemyTPGauge.prototype.gaugeHeight = function() {
    return this._enemyGaugeHeight > 0 ? this._enemyGaugeHeight : (GaugeHeight > 0 ? GaugeHeight : 12);
};
  
Sprite_EnemyTPGauge.prototype.labelFontSize = function() {
    return this._gaugeData ? Sprite_Gauge.prototype.labelFontSize.call(this) : $gameSystem.mainFontSize() + LabelFontSize;
};
  
Sprite_EnemyTPGauge.prototype.valueFontSize = function() {
    return this._gaugeData ? Sprite_Gauge.prototype.valueFontSize.call(this) : $gameSystem.mainFontSize() + ValueFontSize;
};
  
Sprite_EnemyTPGauge.prototype.isTPLabelVisible = function() {
    return TPLabelVisible;
};

Sprite_EnemyTPGauge.prototype.isTPValueVisible = function() {
    return TPValueVisible;
};

Sprite_EnemyTPGauge.prototype.getTPVisible = function() {
    return TPVisible;
};


  
Sprite_EnemyTPGauge.prototype.isVisibleValue = function() {
    return this._battler._TPGaugeValueVisible && !this._battler._TPGaugeMask;
};

Sprite_EnemyTPGauge.prototype.gaugeVisibleResult = function() {
    if (this.noTpGauge()) {
        return false;
    } else if (TPVisibleMode === 1) {
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


const _Spriteset_Battle_updateBattlerOverlay = Spriteset_Battle.prototype.updateBattlerOverlay;
Spriteset_Battle.prototype.updateBattlerOverlay = function() {
  _Spriteset_Battle_updateBattlerOverlay.call(this);
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
  this._battlerTpPositionX = 0;
  this._battlerTpPositionY = 0;
};

const _Game_Enemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
  _Game_Enemy_setup.call(this, enemyId, x, y);
  this._TPGaugeValueVisible = this.enemy().meta.TPGaugeMask ? true : false;
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
  this._battlerTpPositionX = x;
  this._battlerTpPositionY = y;
};

Game_Enemy.prototype.getTpGaugePositionX = function(){
  return this._battlerTpPositionX;
};

Game_Enemy.prototype.getTpGaugePositionY = function(){
  return this._battlerTpPositionY;
};

function getSplit(tag) {
    return tag ? tag.split(',') : null;
};

})();