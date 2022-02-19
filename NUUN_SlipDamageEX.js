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
 * @plugindesc スリップダメージ拡張
 * @author NUUN
 * @version 1.1.1
 * @base NUUN_StateTurnCount
 * @orderAfter NUUN_StateTurnCount
 * 
 * @help
 * スリップダメージに独自の式を定義できます。
 * 式は割合値になるように指定してください。
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
 * 2022/2/19 Ver.1.1.1
 * Ver.1.0.1以降で移動中にエラーが出る問題を修正。
 * 2022/1/29 Ver.1.1.0
 * スリップダメージに固定値を設定できる機能を追加。
 * 2022/1/16 Ver.1.0.1
 * 経過ターンの処理を別プラグイン化。
 * 2022/1/11 Ver.1.0.0
 * 初版
 * 
 */
var Imported = Imported || {};
Imported.NUUN_SlipDamageEX = true;

(() => {
const parameters = PluginManager.parameters('NUUN_SlipDamageEX');

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

})();