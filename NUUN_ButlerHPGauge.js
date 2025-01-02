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
 * @base NUUN_Base
 * @base NUUN_BattlerOverlayBase
 * @version 1.7.7
 * @orderAfter NUUN_Base
 * 
 * @help
 * 敵またはSVアクターのバトラー上にHPゲージを表示します。
 * 
 * 敵キャラまたはアクターのメモ欄
 * <HPGaugeX:[position]> HPゲージのX座標を調整します。（相対座標）
 * <HPGaugeY:[position]> HPゲージのY座標を調整します。（相対座標）
 * 
 * 敵キャラのメモ欄
 * <NoHPGauge> HPゲージを表示しません。
 * <HPGaugeLength:[width], [height]> HPゲージの幅を指定します。
 * [position]:座標
 * [width]:ゲージ横幅
 * [height]:ゲージ縦幅
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
 * 初期HPゲージ表示
 * <HPGaugeVisible>の特徴を持つアクターが戦闘メンバーにいるとき、または図鑑登録と連動している際に登録済みなら表示されます。
 * 上記の特徴を使用する場合は初期HPゲージ表示を非表示に設定してください。
 * 
 * バトラーオーバーレイベースは必ず最新版にしてください。
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
 * 2025/1/2 Ver.1.7.7
 * 変身後のモンスターのゲージが非表示に設定されている場合、ゲージが表示がされたままになる問題を修正。
 * 2024/9/11 Ver.1.7.6
 * 特定のスクリプトを記入した場合、スタックエラーが起きる問題を修正。
 * 2023/11/4 Ver.1.7.5
 * <HPGaugeVisible>が機能していなかった問題を修正。
 * 2023/8/3 Ver.1.7.4
 * 一部のプラグインにてNoHPGaugeが機能していなかった問題を修正。
 * 2023/6/23 Ver.1.7.3
 * NoHPGaugeが機能していなかった問題を修正。
 * 2023/6/2 Ver.1.7.2
 * 処理の修正。
 * 2023/5/28 Ver.1.7.1
 * 処理の修正。
 * 2023/5/28 Ver.1.7.0
 * SVアクターにゲージを表示する機能を追加。
 * 2023/5/6 Ver.1.6.1
 * HPゲージの表示をフェードアウト、フェードインさせるように修正。
 * 2022/9/17 Ver.1.6.0
 * 敵キャラ毎にHPゲージの横幅、縦幅を指定できる機能を追加。
 * 2022/5/14 Ver.1.5.0
 * バトラーの表示処理の定義大幅変更に関する定義変更。
 * 2022/1/10 Ver.1.4.2
 * 再修正。
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
 * @param HPPosition
 * @desc 敵キャラのHPゲージ位置
 * @text 敵HPゲージ位置
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
 * @param HPVisible
 * @desc 敵のHPゲージの表示タイミング
 * @text 敵HPゲージ表示タイミング
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
 * @parent EnemyVisibleSetting
 * 
 * @param GaugeSetting
 * @text 敵ゲージ設定
 * @default ------------------------------
 * @parent EnemySetting
 * 
 * @param GaugeWidth
 * @desc 敵のゲージの横幅を指定します。
 * @text ゲージ横幅
 * @type number
 * @default 128
 * @min 0
 * @parent GaugeSetting
 * 
 * @param GaugeHeight
 * @desc 敵のゲージの縦幅を指定します。
 * @text ゲージ縦幅
 * @type number
 * @default 12
 * @min 0
 * @parent GaugeSetting
 * 
 * @param Gauge_X
 * @desc 敵のゲージのX座標（相対座標）指定します。
 * @text ゲージX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent GaugeSetting
 * 
 * @param Gauge_Y
 * @desc 敵のゲージのY座標（相対座標）指定します。
 * @text ゲージY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent GaugeSetting
 * 
 * @param HPLabelVisible
 * @text HPラベル表示
 * @desc 敵のHPラベルを表示する。
 * @type boolean
 * @default true
 * @parent GaugeSetting
 * 
 * @param HPValueVisible
 * @text HP数値表示
 * @desc HP数値を表示する。
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
 * @desc HPの数値を隠す時の文字。
 * @text HPの数値を隠す時の文字
 * @type string
 * @default ????
 * @parent GaugeSetting
 * 
 * @param SpecialSetting
 * @text 特殊設定
 * @default ------------------------------
 * @parent GaugeSetting
 * 
 * @param HPVisibleMode
 * @desc 初期状態でのHPゲージの表示。特徴によってやHPゲージの表示タイミングによって表示されるようになります。
 * @text 初期HPゲージ表示
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
 * @parent EnemyBookSetting
 * 
 *  @param ActorSetting
 * @text アクター設定
 * @default ------------------------------
 * 
 * @param ActorVisibleSetting
 * @text 表示設定
 * @default ------------------------------
 * @parent ActorSetting
 * 
 * @param ActorHPPosition
 * @desc アクターのHPゲージ位置
 * @text HPゲージ位置
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
 * @param ActorHPVisible
 * @desc アクターのHPゲージの表示タイミング
 * @text アクターHPゲージ表示タイミング
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
 * @param ActorHPLabelVisible
 * @text HPラベル表示
 * @desc アクターのHPラベルを表示する。
 * @type boolean
 * @default true
 * @parent ActorGaugeSetting
 * 
 * @param ActorHPValueVisible
 * @text HP数値表示
 * @desc アクターのHP数値を表示する。
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
Imported.NUUN_ButlerHPGauge = true;

(() => {
const parameters = PluginManager.parameters('NUUN_ButlerHPGauge');
const HPPosition = Number(parameters['HPPosition'] || 0);
const ActorHPPosition = Number(parameters['ActorHPPosition'] || 0);
const ActorHPVisible = Number(parameters['ActorHPVisible'] || -1);
const HPVisible = Number(parameters['HPVisible'] || 0);
const HPVisibleMode = Number(parameters['HPVisibleMode'] || 0);
const HPEnemyBookVisible = Number(parameters['HPEnemyBookVisible'] || 0);
const ActorGaugeWidth = Number(parameters['ActorGaugeWidth'] || 128);
const ActorGaugeHeight = Number(parameters['ActorGaugeHeight'] || 12);
const GaugeWidth = Number(parameters['GaugeWidth'] || 128);
const GaugeHeight = Number(parameters['GaugeHeight'] || 12);
const ActorGauge_X = Number(parameters['ActorGauge_X'] || 0);
const ActorGauge_Y = Number(parameters['ActorGauge_Y'] || 0);
const Gauge_X = Number(parameters['Gauge_X'] || 0);
const Gauge_Y = Number(parameters['Gauge_Y'] || 0);
const ActorHPLabelVisible = eval(parameters['ActorHPLabelVisible'] || 'true');
const ActorHPValueVisible = eval(parameters['ActorHPValueVisible'] || 'true');
const HPLabelVisible = eval(parameters['HPLabelVisible'] || 'true');
const HPValueVisible = eval(parameters['HPValueVisible'] || 'true');
const ValueFontSize = Number(parameters['ValueFontSize'] || -6);
const ActorLabelFontSize = Number(parameters['ActorLabelFontSize'] || -2);
const ActorValueFontSize = Number(parameters['ActorValueFontSize'] || -6);
const LabelFontSize = Number(parameters['LabelFontSize'] || -2);
const MaskValueName = String(parameters['MaskValueName'] || '????');
let enemyHPGaugeLength = null;

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

const _Sprite_Actor_update = Sprite_Actor.prototype.update;
Sprite_Actor.prototype.update = function() {
    _Sprite_Actor_update.call(this);
    this.updateHpGauge();
};

const _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
Sprite_Enemy.prototype.update = function() {
    _Sprite_Enemy_update.call(this);
    this.updateHpGauge();
};

Sprite_Battler.prototype.updateHpGauge = function() {
    if (!this._battler || this.noHpGaugePosition() || this.noHpGauge()) {
        return;
    }
    if (this.battlerOverlay && !this._battlerHp) {
        this.createHPGauge();
    }

    this.setHpGaugePosition();
};

Sprite_Enemy.prototype.noHpGaugePosition = function() {
    return HPPosition < 0;
};

Sprite_Actor.prototype.noHpGauge = function() {
    return this._battler.isEnemy() ? this._battler.enemy().meta.NoHPGauge : false;
};

Sprite_Enemy.prototype.noHpGauge = function() {
    return this._enemy.enemy().meta.NoHPGauge;
};

Sprite_Actor.prototype.noHpGaugePosition = function() {
    return (this._battler.isEnemy() ? HPPosition : ActorHPPosition) < 0;
};

Sprite_Enemy.prototype.setHpGaugePosition = function() {
    if (this._battlerHp) {
        const enemy = this._enemy.enemy();
        const x = (enemy.meta.HPGaugeX ? Number(enemy.meta.HPGaugeX) : 0) + Gauge_X + this._enemy.getHPGaugePositionX();
        const y = (enemy.meta.HPGaugeY ? Number(enemy.meta.HPGaugeY) : 0) + Gauge_Y + this._enemy.getHPGaugePositionY();
        this._battlerHp.x = x;
        this._battlerHp.y = y - this.getBattlerHpPosition();
    }
};

Sprite_Actor.prototype.setHpGaugePosition = function() {
    if (this._battler.isEnemy()) {
        Sprite_Enemy.prototype.setHpGaugePosition.call(this);
    } else if (this._battlerHp) {
        const actor = this._actor.actor();
        const x = (actor.meta.HPGaugeX ? Number(actor.meta.HPGaugeX) : 0) + ActorGauge_X;
        const y = (actor.meta.HPGaugeY ? Number(actor.meta.HPGaugeY) : 0) + ActorGauge_Y;
        this._battlerHp.x = x;
        this._battlerHp.y = y - this.getBattlerHpSVPosition();
      }
};

Sprite_Battler.prototype.getBattlerHpPosition = function() {
    const scale = this.getBattlerOverlayConflict();
    if (HPPosition === 0) {
        return this.getBattlerOverlayHeight() * scale;
    } else if (HPPosition === 2) {
        return Math.floor((this.getBattlerOverlayHeight() * scale) / 2);
    } else {
        return 0;
    }
};

Sprite_Actor.prototype.getBattlerHpSVPosition = function() {
    const scale = this.battlerOverlay.battlerSpriteScale_y;
    if (ActorHPPosition === 0) {
      return this.getSVBattlerHeight() * scale;
    } else if (ActorHPPosition === 2) {
      return Math.floor((this.getSVBattlerHeight() * scale) / 2);
    } else {
      return 0;
    }
};

Sprite_Enemy.prototype.createHPGauge = function() {
    enemyHPGaugeLength = getSplit(this._enemy.enemy().meta.HPGaugeLength);
    const sprite = new Sprite_EnemyHPGauge();
    this.battlerOverlay.addChild(sprite);
    this._battlerHp = sprite;
    sprite.setup(this._enemy, "hp");
    sprite.show();
    sprite.move(0, 0);
    $gameTemp.enemyHPGaugeRefresh = true;
};

Sprite_Actor.prototype.createHPGauge = function() {
    if (this._battler.isEnemy()) {
        Sprite_Enemy.prototype.createHPGauge.call(this);
        return;
    }
    enemyHPGaugeLength = null;
    const sprite = new Sprite_BattlerHPGauge();
    this.battlerOverlay.addChild(sprite);
    this._battlerHp = sprite;
    sprite.setup(this._actor, "hp");
    sprite.show();
    sprite.move(0, 0);
    $gameTemp.enemyHPGaugeRefresh = true;
};


function Sprite_BattlerHPGauge() {
    this.initialize(...arguments);
}
  
Sprite_BattlerHPGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_BattlerHPGauge.prototype.constructor = Sprite_BattlerHPGauge;

Sprite_BattlerHPGauge.prototype.initialize = function() {
    Sprite_Gauge.prototype.initialize.call(this);
    this._gaugeDuration = 0;
    this._startVisible = true;
    this.anchor.x = 0.5;
    this.anchor.y = 1;
};

Sprite_BattlerHPGauge.prototype.bitmapWidth = function() {
    return ActorGaugeWidth > 0 ? ActorGaugeWidth : 128;
};
  
Sprite_BattlerHPGauge.prototype.gaugeHeight = function() {
    return ActorGaugeHeight > 0 ? ActorGaugeHeight : 12;
};

Sprite_BattlerHPGauge.prototype.labelFontSize = function() {
    return this._gaugeData ? Sprite_Gauge.prototype.labelFontSize.call(this) : $gameSystem.mainFontSize() + ActorLabelFontSize;
};
  
Sprite_BattlerHPGauge.prototype.valueFontSize = function() {
    return this._gaugeData ? Sprite_Gauge.prototype.valueFontSize.call(this) : $gameSystem.mainFontSize() + ActorValueFontSize;
};

Sprite_BattlerHPGauge.prototype.drawLabel = function() {
    if (this.isHPLabelVisible()) {
        Sprite_Gauge.prototype.drawLabel.call(this);
    }
};

Sprite_BattlerHPGauge.prototype.isHPLabelVisible = function() {
    return ActorHPLabelVisible;
};

Sprite_BattlerHPGauge.prototype.isHPValueVisible = function() {
    return ActorHPValueVisible;
};

Sprite_BattlerHPGauge.prototype.getHPVisible = function() {
    return ActorHPVisible;
};

Sprite_BattlerHPGauge.prototype.noHpGauge = function() {
    return this._battler.isEnemy() ? this._battler.enemy().meta.NoHPGauge : false;
};

Sprite_BattlerHPGauge.prototype.setup = function(battler, type) {
    Sprite_Gauge.prototype.setup.call(this, battler, type);
    this.opacity = (this.gaugeVisibleResult() && (this.gaugeVisibleInDamage() || this.gaugeVisibleInSelect())) ? 255 : 0;
};

Sprite_BattlerHPGauge.prototype.gaugeX = function() {
    if (!this.isHPLabelVisible()) {
      return 0;
    } else {
      return Sprite_Gauge.prototype.gaugeX.call(this);
    }
};

Sprite_BattlerHPGauge.prototype.drawValue = function() {
    if (this.isHPValueVisible()) {
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

Sprite_BattlerHPGauge.prototype.isVisibleValue = function() {
    return false;
};

Sprite_BattlerHPGauge.prototype.updateBitmap = function() {
    Sprite_Gauge.prototype.updateBitmap.call(this);
    this.gaugeVisible();
};

Sprite_BattlerHPGauge.prototype.gaugeVisible = function() {
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

Sprite_BattlerHPGauge.prototype.gaugeVisibleResult = function() {
    return !this.noHpGauge();
};

Sprite_BattlerHPGauge.prototype.updateTargetValue = function(value, maxValue) {
    if (!this._startVisible && !isNaN(this._value) && this.getHPVisible() >= 2) {
        this._gaugeDuration = 60;
    } else if (this._startVisible) {
        this._startVisible = false;
    }
    Sprite_Gauge.prototype.updateTargetValue.call(this, value, maxValue);
};

Sprite_BattlerHPGauge.prototype.updateGaugeAnimation = function() {
    if (this._gaugeDuration > 0) {
        this._gaugeDuration--;
    }
    Sprite_Gauge.prototype.updateGaugeAnimation.call(this);
};

Sprite_BattlerHPGauge.prototype.gaugeVisibleInDamage = function() {
    if (this.getHPVisible() >= 2) {
        return this._gaugeDuration > 0;
    } else if (this.getHPVisible() === 1) {
        return false;
    }
    return true;
};

Sprite_BattlerHPGauge.prototype.gaugeVisibleInSelect = function() {
    if (this.getHPVisible() === 1 || this.getHPVisible() === 3) {
        return this._battler.isSelected();
    } else if (this.getHPVisible() === 2) {
        return false;
    }
    return true;
};


function Sprite_EnemyHPGauge() {
    this.initialize(...arguments);
}

Sprite_EnemyHPGauge.prototype = Object.create(Sprite_BattlerHPGauge.prototype);
Sprite_EnemyHPGauge.prototype.constructor = Sprite_EnemyHPGauge;

Sprite_EnemyHPGauge.prototype.initialize = function() {
    this._enemyGaugeWidth = enemyHPGaugeLength ? (Number(enemyHPGaugeLength[0]) || 0) : 0;
    this._enemyGaugeHeight = enemyHPGaugeLength ? (Number(enemyHPGaugeLength[1]) || 0) : 0;
    Sprite_BattlerHPGauge.prototype.initialize.call(this);
};

Sprite_EnemyHPGauge.prototype.bitmapWidth = function() {
    return this._enemyGaugeWidth > 0 ? this._enemyGaugeWidth : (GaugeWidth > 0 ? GaugeWidth : 128);
};

Sprite_EnemyHPGauge.prototype.gaugeHeight = function() {
    return this._enemyGaugeHeight > 0 ? this._enemyGaugeHeight : (GaugeHeight > 0 ? GaugeHeight : 12);
};

Sprite_EnemyHPGauge.prototype.labelFontSize = function() {
    return this._gaugeData ? Sprite_Gauge.prototype.labelFontSize.call(this) : $gameSystem.mainFontSize() + LabelFontSize;
};

Sprite_EnemyHPGauge.prototype.valueFontSize = function() {
    return this._gaugeData ? Sprite_Gauge.prototype.valueFontSize.call(this) : $gameSystem.mainFontSize() + ValueFontSize;
};

Sprite_EnemyHPGauge.prototype.isHPLabelVisible = function() {
    return HPLabelVisible;
};

Sprite_EnemyHPGauge.prototype.isHPValueVisible = function() {
    return HPValueVisible;
};

Sprite_EnemyHPGauge.prototype.getHPVisible = function() {
    return HPVisible;
};

Sprite_EnemyHPGauge.prototype.isVisibleValue = function() {
    return this._battler._HPGaugeValueVisible && !this._battler._HPGaugeMask;
};

Sprite_EnemyHPGauge.prototype.gaugeVisibleResult = function() {
    if (this.noHpGauge()) {
        return false;
    } else if (HPVisibleMode === 1) {
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
  return $gameParty.getHpGaugeVisible() || this._battler._visibleHpGauge;
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


const _Spriteset_Battle_updateBattlerOverlay = Spriteset_Battle.prototype.updateBattlerOverlay;
Spriteset_Battle.prototype.updateBattlerOverlay = function() {
    _Spriteset_Battle_updateBattlerOverlay.call(this);
    if ($gameTemp.enemyHPGaugeRefresh) {
        this.setHPGaugePosition();
        $gameTemp.enemyHPGaugeRefresh = false;
    }
};

Spriteset_Battle.prototype.setHPGaugePosition = function() {
  const hpGaugePositionList = getEnemyGaugePosition($gameTroop.troop());
  for (const data of hpGaugePositionList) {
    const enemy = $gameTroop.members()[data[0] - 1];
    if (enemy) {
      enemy.setHPGaugePosition(data[1], data[2]);
    }
  }
};

Game_Actor.prototype.HpGaugeVisibleTrait = function(){
    return this.traitObjects().some(traitObject => traitObject.meta.HPGaugeVisible);
};

Game_Actor.prototype.HpGaugeVisible = function(){
    this._visibleHpGauge = this.HpGaugeVisibleTrait();
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
    this._battlerHpPositionX = 0;
    this._battlerHpPositionY = 0;
};

const _Game_Enemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
    _Game_Enemy_setup.call(this, enemyId, x, y);
    this._HPGaugeValueVisible = this.enemy().meta.HPGaugeMask ? true : false;
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
    this._battlerHpPositionX = x;
    this._battlerHpPositionY = y;
};

Game_Enemy.prototype.getHPGaugePositionX = function(){
    return this._battlerHpPositionX;
};

Game_Enemy.prototype.getHPGaugePositionY = function(){
    return this._battlerHpPositionY;
};


Game_Party.prototype.getHpGaugeVisible = function(){
    return this.battleMembers().some(actor => actor._visibleHpGauge);
};

function getSplit(tag) {
    return tag ? tag.split(',') : null;
}

})();