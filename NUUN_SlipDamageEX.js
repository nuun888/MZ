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
 * @version 1.0.0
 * 
 * @help
 * スリップダメージに独自の式を定義できます。
 * 式は割合値になるように指定してください。
 * 
 * ステートのメモ欄
 * <SlipDamageHP:[eval]> HPのスリップダメージを設定します。
 * <SlipDamageMP:[eval]> MPのスリップダメージを設定します。
 * <SlipDamageTP:[eval]> TPのスリップダメージを設定します。
 * [eval]:評価式
 * b:バトラーゲームデータ
 * db:バトラーのデータベースデータ
 * st:ステートのターン
 * 例
 * <SlipDamageHP:-10 * st> 毎ターンごとに10%加算した割合のダメージを受けます。
 * <SlipDamageMP:10 * st> 毎ターンごとに10%加算した割合で回復します。
 * <SlipDamageHP:Math.pow(3, st) * -1> 毎ターンごとに3%ずつスリップダメージが倍化します。
 * 
 * 更新履歴
 * 2022/1/11 Ver.1.0.0
 * 初版
 * 
 * @param StateTurnReset
 * @desc ステートを再度付与際にターンをリセットする。
 * @text 付与ターンリセット
 * @type boolean
 * @default false
 * 
 */
var Imported = Imported || {};
Imported.NUUN_SlipDamageEX = true;

(() => {
const parameters = PluginManager.parameters('NUUN_SlipDamageEX');
const StateTurnReset = eval(parameters['StateTurnReset'] || "false");

const _Game_BattlerBase_clearStates = Game_BattlerBase.prototype.clearStates;
Game_BattlerBase.prototype.clearStates = function() {
    _Game_BattlerBase_clearStates.call(this);
    this._stateNowTurns = [];
};

const _Game_BattlerBase_eraseState = Game_BattlerBase.prototype.eraseState;
Game_BattlerBase.prototype.eraseState = function(stateId) {
    _Game_BattlerBase_eraseState.call(this, stateId)
    delete this._stateNowTurns[stateId];
};

const _Game_BattlerBase_updateStateTurns = Game_BattlerBase.prototype.updateStateTurns;
Game_BattlerBase.prototype.updateStateTurns = function() {
    _Game_BattlerBase_updateStateTurns.call(this);
    for (const stateId of this._states) {
        if (stateId > 0) {
            this._stateNowTurns[stateId]++;
        }
    }
};

Game_BattlerBase.prototype.isStateNowTurn = function(stateId) {
    return this._stateNowTurns[stateId];
};

const _Game_BattlerBase_resetStateCounts = Game_BattlerBase.prototype.resetStateCounts;
Game_BattlerBase.prototype.resetStateCounts = function(stateId) {
    _Game_BattlerBase_resetStateCounts.call(this, stateId);
    if (StateTurnReset || !this._stateNowTurns[stateId]) {
        this._stateNowTurns[stateId] = 1;
    }
};

Game_Battler.prototype.slipDamageEX = function(type) {
    let slipDamage = 0;
    const tag = 'SlipDamage' + type;
    const b = this;
    const db = this.isActor() ? this.actor() : this.enemy();
    for (const stateId of this._states) {
        const data = $dataStates[stateId].meta[tag];
        if (data) {
            const st = this.isStateNowTurn(stateId);
            slipDamage += eval(data) / 100;
        }
    }
    return slipDamage;
};

const _Game_Battler_regenerateHp = Game_Battler.prototype.regenerateHp;
Game_Battler.prototype.regenerateHp = function() {
    _Game_Battler_regenerateHp.call(this);
    const minRecover = -this.maxSlipDamage();
    const hpDamage = this._result.hpDamage;
    const value = Math.max(Math.floor(this.mhp * this.slipDamageEX('HP')), minRecover);
    if (value !== 0) {
        this.gainHp(value);
        this._result.hpDamage += hpDamage;
    }
};

const _Game_Battler_regenerateMp = Game_Battler.prototype.regenerateMp;
Game_Battler.prototype.regenerateMp = function() {
    _Game_Battler_regenerateMp.call(this);
    const mpDamage = this._result.mpDamage;
    const value = Math.floor(this.mmp * this.slipDamageEX('MP'));
    if (value !== 0) {
        this.gainMp(value);
        this._result.mpDamage += mpDamage;
    }
};

const _Game_Battler_regenerateTp = Game_Battler.prototype.regenerateTp;
Game_Battler.prototype.regenerateTp = function() {
    _Game_Battler_regenerateTp.call(this);
    const tpDamage = this._result.tpDamage;
    const value = Math.floor(100 * this.slipDamageEX('TP'));
    if (value !== 0) {
        this.gainSilentTp(value);
        this._result.tpDamage += tpDamage;
    }
};

})();