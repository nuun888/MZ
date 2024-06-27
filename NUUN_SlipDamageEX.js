/*:-----------------------------------------------------------------------------------
 * NUUN_SlipDamageEX.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc Slip Damage Ex
 * @author NUUN
 * @version 1.2.0
 * @base NUUN_Base
 * @base NUUN_StateTurnCount
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_StateTurnCount
 * 
 * @help
 * Expands slip damage functionality.
 * You can set the sound effect or flash color when slip damage occurs while moving, or disable it.
 * You can define your own formula for slip damage.
 * The expression must result in a percentage value.
 * 
 * State Notes
 * <SlipDamageHP:[eval]> Sets the HP slip damage.
 * <SlipDamageMP:[eval]> Sets the MP slip damage.
 * <SlipDamageTP:[eval]> Sets the TP slip damage.
 * <SlipDamageFixedHP:[eval]> Sets the HP slip damage to a fixed value.
 * <SlipDamageFixedMP:[eval]> Sets the MP slip damage to a fixed value.
 * <SlipDamageFixedTP:[eval]> Sets the TP slip damage to a fixed value.
 * [eval]:Evaluation formula
 * b:Battler game data
 * db:Battler's Database Data
 * st:State Turn
 * Example
 * <SlipDamageHP:-10 * st> Each turn, you will receive 10% additional damage.
 * <SlipDamageMP:10 * st> It recovers at an increased rate of 10% each turn.
 * <SlipDamageHP:Math.pow(3, st) * -1> Slip damage doubles by 3% every turn.
 * <SlipDamageFixedHP:-10> You will take 10 slip damage each turn.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 6/28/2024 Ver.1.2.0
 * Added a feature to play sound effects when slip damage occurs while moving.
 * Added a feature to specify the color of the flash when slip damage occurs while moving, and to disable playing the flash.
 * 2/19/2022 Ver.1.1.1
 * Fixed an issue where an error occurred while moving in Ver.1.0.1 and later.
 * 1/29/2022 Ver.1.1.0
 * Added the ability to set a fixed value for slip damage.
 * 1/16/2022 Ver.1.0.1
 * Processing of elapsed turns has been made into a separate plugin.
 * 1/11/2022 Ver.1.0.0
 * First edition.
 * 
 * @param SlipSeSetting
 * @text SE Settings
 * @default ------------------------------
 * 
 * @param SlipDamageSe
 * @text Slip damage sound effect when moving
 * @desc Sets the sound effects for slip damage when moving.
 * @type struct<SlipSeSetting>
 * @default
 * @parent SlipSeSetting
 * 
 * @param FlashSetting
 * @text Moving Flash Settings
 * @default ------------------------------
 * 
 * @param SlipDamageFlashColor
 * @text Flash Color
 * @desc The color of the flash when slip damage occurs during movement. No flash by setting the number of frames to 0.
 * @type struct<FlashColorSetting>
 * @default {"red":"255","green":"0","blue":"0","gray":"128","flame":"8"}
 * @parent FlashSetting
 * 
 */
/*~struct~FlashColorSetting:
 * 
 * @param red
 * @text Red
 * @desc Red
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * 
 * @param green
 * @text Green
 * @desc Green
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * 
 * @param blue
 * @text Blue
 * @desc Blue
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * 
 * @param gray
 * @text Gray
 * @desc Gray
 * @type number
 * @min 0
 * @max 255
 * @default 128
 * 
 * @param flame
 * @text Number of frames
 * @desc Number of frames
 * @type number
 * @min 0
 * @max 9999
 * @default 8
 * 
 * 
 */
/*~struct~SlipSeSetting:
 * 
 * @param SlipDamageSE
 * @text SE during slip damage
 * @desc SE during slip damage.
 * @type file
 * @dir audio/se/
 * 
 * @param volume
 * @text Volume
 * @desc Volume.
 * @type number
 * @default 90
 * @min 0
 * @max 9999
 * 
 * @param pitch
 * @text Pitch
 * @desc Pitch.
 * @type number
 * @default 100
 * 
 * @param pan
 * @text Pan
 * @desc Pan。
 * @type number
 * @default 0
 * @max 100
 * @min -100
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc スリップダメージ拡張
 * @author NUUN
 * @version 1.2.0
 * @base NUUN_Base
 * @base NUUN_StateTurnCount
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_StateTurnCount
 * 
 * @help
 * スリップダメージの機能を拡張します。
 * 移動時のスリップダメージ時にSE、またはフラッシュの色、無効の設定を行うことができます。
 * スリップダメージに独自の式を定義できます。
 * 式は割合値になるように指定してください。
 * 
 * 
 * ステートのメモ欄
 * <SlipDamageHP:[eval]> HPのスリップダメージを設定します。
 * <SlipDamageMP:[eval]> MPのスリップダメージを設定します。
 * <SlipDamageTP:[eval]> TPのスリップダメージを設定します。
 * <SlipDamageFixedHP:[eval]> HPのスリップダメージを固定値で設定します。
 * <SlipDamageFixedMP:[eval]> MPのスリップダメージを固定値で設定します。
 * <SlipDamageFixedTP:[eval]> TPのスリップダメージを固定値で設定します。
 * [eval]:評価式
 * b:バトラーゲームデータ
 * db:バトラーのデータベースデータ
 * st:ステートのターン
 * 例
 * <SlipDamageHP:-10 * st> 毎ターンごとに10%加算した割合のダメージを受けます。
 * <SlipDamageMP:10 * st> 毎ターンごとに10%加算した割合で回復します。
 * <SlipDamageHP:Math.pow(3, st) * -1> 毎ターンごとに3%ずつスリップダメージが倍化します。
 * <SlipDamageFixedHP:-10> 毎ターンごとに１０のスリップダメージを受けます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/6/28 Ver.1.2.0
 * 移動時のスリップダメージ時にSEを再生する機能を追加。
 * 移動時のスリップダメージ時のフラッシュの色を指定、フラッシュの再生を無効にする機能を追加。
 * 2022/2/19 Ver.1.1.1
 * Ver.1.0.1以降で移動中にエラーが出る問題を修正。
 * 2022/1/29 Ver.1.1.0
 * スリップダメージに固定値を設定できる機能を追加。
 * 2022/1/16 Ver.1.0.1
 * 経過ターンの処理を別プラグイン化。
 * 2022/1/11 Ver.1.0.0
 * 初版
 * 
 * @param SlipSeSetting
 * @text SE設定
 * @default ------------------------------
 * 
 * @param SlipDamageSe
 * @text 移動時スリップダメージSE
 * @desc 移動時のスリップダメージのSEを設定します。
 * @type struct<SlipSeSetting>
 * @default
 * @parent SlipSeSetting
 * 
 * @param FlashSetting
 * @text 移動時フラッシュ設定
 * @default ------------------------------
 * 
 * @param SlipDamageFlashColor
 * @text フラッシュ色
 * @desc 移動時のスリップダメージ時のフラッシュの色。フレーム数を0にすることでフラッシュしません。
 * @type struct<FlashColorSetting>
 * @default {"red":"255","green":"0","blue":"0","gray":"128","flame":"8"}
 * @parent FlashSetting
 * 
 */
/*~struct~FlashColorSetting:ja
 * 
 * @param red
 * @text 赤
 * @desc 赤
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * 
 * @param green
 * @text 緑
 * @desc 緑
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * 
 * @param blue
 * @text 青
 * @desc 青
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * 
 * @param gray
 * @text グレー
 * @desc グレー
 * @type number
 * @min 0
 * @max 255
 * @default 128
 * 
 * @param flame
 * @text フレーム数
 * @desc フレーム数
 * @type number
 * @min 0
 * @max 9999
 * @default 8
 * 
 * 
 */
/*~struct~SlipSeSetting:ja
 * 
 * @param SlipDamageSE
 * @text スリップダメージ時SE
 * @desc スリップダメージ時のSE
 * @type file
 * @dir audio/se/
 * 
 * @param volume
 * @text 音量
 * @desc 音量。
 * @type number
 * @default 90
 * @min 0
 * @max 9999
 * 
 * @param pitch
 * @text ピッチ
 * @desc ピッチ。
 * @type number
 * @default 100
 * 
 * @param pan
 * @text 位相
 * @desc 位相。
 * @type number
 * @default 0
 * @max 100
 * @min -100
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_SlipDamageEX = true;

(() => {
const params = Nuun_PluginParams.getPluginParams(document.currentScript);
const parameters = PluginManager.parameters('NUUN_SlipDamageEX');
let _onMapSlipDamage = false;

Game_Battler.prototype.slipDamageEX = function(type) {
    let slipDamage = 0;
    const tag = 'SlipDamage' + type;
    const b = this;
    const db = this.isActor() ? this.actor() : this.enemy();
    for (const stateId of this._states) {
        const data = $dataStates[stateId].meta[tag];
        if (data) {
            const st = this.getStateNowTurn(stateId);
            slipDamage += eval(data) / 100;
        }
    }
    return slipDamage;
};

Game_Battler.prototype.slipDamageFixedEX = function(type) {
    let slipDamage = 0;
    const tag = 'SlipDamageFixed' + type;
    const b = this;
    const db = this.isActor() ? this.actor() : this.enemy();
    for (const stateId of this._states) {
        const data = $dataStates[stateId].meta[tag];
        if (data) {
            const st = this.getStateNowTurn(stateId);
            slipDamage += eval(data);
        }
    }
    return slipDamage;
};

const _Game_Battler_regenerateHp = Game_Battler.prototype.regenerateHp;
Game_Battler.prototype.regenerateHp = function() {
    _Game_Battler_regenerateHp.call(this);
    const minRecover = -this.maxSlipDamage();
    const hpDamage = this._result.hpDamage;
    const value = Math.max(Math.floor(this.mhp * this.slipDamageEX('HP')) + this.slipDamageFixedEX('HP'), minRecover);
    if (value !== 0) {
        this.gainHp(value);
        this._result.hpDamage += hpDamage;
    }
};

const _Game_Battler_regenerateMp = Game_Battler.prototype.regenerateMp;
Game_Battler.prototype.regenerateMp = function() {
    _Game_Battler_regenerateMp.call(this);
    const mpDamage = this._result.mpDamage;
    const value = Math.floor(this.mmp * this.slipDamageEX('MP') + this.slipDamageFixedEX('MP'));
    if (value !== 0) {
        this.gainMp(value);
        this._result.mpDamage += mpDamage;
    }
};

const _Game_Battler_regenerateTp = Game_Battler.prototype.regenerateTp;
Game_Battler.prototype.regenerateTp = function() {
    _Game_Battler_regenerateTp.call(this);
    const tpDamage = this._result.tpDamage;
    const value = Math.floor(100 * this.slipDamageEX('TP') + this.slipDamageFixedEX('TP'));
    if (value !== 0) {
        this.gainSilentTp(value);
        this._result.tpDamage += tpDamage;
    }
};

const _Game_Actor_turnEndOnMap = Game_Actor.prototype.turnEndOnMap;
Game_Actor.prototype.turnEndOnMap = function() {
    _onMapSlipDamage = true;
    _Game_Actor_turnEndOnMap.apply(this, arguments);
    _onMapSlipDamage = false;
};

const _Game_Actor_performMapDamage = Game_Actor.prototype.performMapDamage;
Game_Actor.prototype.performMapDamage = function() {
    const slipDamage = _onMapSlipDamage;
    _Game_Actor_performMapDamage.apply(this, arguments);
    this.exSlipDamage(slipDamage);
};

Game_Actor.prototype.exSlipDamage = function(mode) {
    if (mode) {
        this.slipDamagePlaySe();
    }
};

Game_Actor.prototype.slipDamagePlaySe = function() {
    if (params.SlipDamageSe && params.SlipDamageSe.SlipDamageSE) {
        AudioManager.playSe({"name":params.SlipDamageSe.SlipDamageSE,"volume":params.SlipDamageSe.volume,"pitch":params.SlipDamageSe.pitch,"pan":params.SlipDamageSe.pan});
    }
};


const _Game_Screen_startFlashForDamage = Game_Screen.prototype.startFlashForDamage;
Game_Screen.prototype.startFlashForDamage = function() {
    if (_onMapSlipDamage) {
        this.startFlashSlipDamage();
    } else {
        _Game_Screen_startFlashForDamage.apply(this, arguments);
    }
};

Game_Screen.prototype.startFlashSlipDamage = function() {
    const flashColor = params.SlipDamageFlashColor;
    if (!flashColor) {
        _Game_Screen_startFlashForDamage.apply(this, arguments);
        return 
    }
    if (flashColor.flame > 0) {
        this.startFlash([flashColor.red, flashColor.green, flashColor.blue, flashColor.gray], flashColor.flame);
    }
};

})();