/*:-----------------------------------------------------------------------------------
 * NUUN_StateTurnCount.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc ステート経過ターンカウント
 * @author NUUN
 * @version 1.1.1
 * 
 * @help
 * ステートの現在の経過ターンを取得できるようにします。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/2/16 Ver.1.1.1
 * ゲームをロードした後にエラーが出る問題を修正。
 * ステートを付与したときにエラーが出る問題を修正。
 * 2022/1/21 Ver.1.1.0
 * バフの経過ターン処理を追加。
 * 2022/1/16 Ver.1.0.0
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
Imported.NUUN_StateTurnCount = true;

(() => {
const parameters = PluginManager.parameters('NUUN_StateTurnCount');
const StateTurnReset = eval(parameters['StateTurnReset'] || "false");

const _Game_BattlerBase_clearStates = Game_BattlerBase.prototype.clearStates;
Game_BattlerBase.prototype.clearStates = function() {
    _Game_BattlerBase_clearStates.call(this);
    this._stateNowTurns = [];
};

Game_BattlerBase.prototype.clearStateNowTurns = function() {
    if (!this._stateNowTurns) {
        this._stateNowTurns = [];
    }
};

const _Game_BattlerBase_eraseState = Game_BattlerBase.prototype.eraseState;
Game_BattlerBase.prototype.eraseState = function(stateId) {
    _Game_BattlerBase_eraseState.call(this, stateId);
    this.clearStateNowTurns();
    delete this._stateNowTurns[stateId];
};

const _Game_BattlerBase_updateStateTurns = Game_BattlerBase.prototype.updateStateTurns;
Game_BattlerBase.prototype.updateStateTurns = function() {
    _Game_BattlerBase_updateStateTurns.call(this);
    this.clearStateNowTurns();
    for (const stateId of this._states) {
        if (stateId > 0) {  
            this._stateNowTurns[stateId]++;
        }
    }
};

Game_BattlerBase.prototype.setStateNowTurn = function(stateId, turn) {
    this.clearStateNowTurns();
    this._stateNowTurns[stateId] = turn;
};

Game_BattlerBase.prototype.getStateNowTurn = function(stateId) {
    this.clearStateNowTurns();
    return this._stateNowTurns[stateId];
};

const _Game_BattlerBase_resetStateCounts = Game_BattlerBase.prototype.resetStateCounts;
Game_BattlerBase.prototype.resetStateCounts = function(stateId) {
    _Game_BattlerBase_resetStateCounts.call(this, stateId);
    if (StateTurnReset || !this.getStateNowTurn(stateId)) {
        this.setStateNowTurn(stateId, 1);
    }
};

const _Game_BattlerBase_clearBuffs = Game_BattlerBase.prototype.clearBuffs;
Game_BattlerBase.prototype.clearBuffs = function() {
    _Game_BattlerBase_clearBuffs.call(this);
    this._buffNowTurns = [0, 0, 0, 0, 0, 0, 0, 0];
    this._debuffNowTurns = [0, 0, 0, 0, 0, 0, 0, 0];
};

Game_BattlerBase.prototype.clearBuffNowTurns = function() {
    if (!this._buffNowTurns) {
        this._buffNowTurns = [0, 0, 0, 0, 0, 0, 0, 0];
    }
};

Game_BattlerBase.prototype.clearDebuffNowTurns = function() {
    if (!this._debuffNowTurns) {
        this._debuffNowTurns = [0, 0, 0, 0, 0, 0, 0, 0];
    }
};

Game_BattlerBase.prototype.setBuffNowTurn = function(buffId, turn) {
    this.clearBuffNowTurns();
    this._buffNowTurns[buffId] = turn;
};

Game_BattlerBase.prototype.setDebuffNowTurn = function(buffId, turn) {
    this.clearDebuffNowTurns();
    this._debuffNowTurns[buffId] = turn;
};


const _Game_BattlerBase_eraseBuff = Game_BattlerBase.prototype.eraseBuff;
Game_BattlerBase.prototype.eraseBuff = function(paramId) {
    _Game_BattlerBase_eraseBuff.call(this, paramId);
    this.setBuffNowTurn(paramId, 0);
    this.setDebuffNowTurn(paramId, 0);
};

const _Game_BattlerBase_updateBuffTurns = Game_BattlerBase.prototype.updateBuffTurns;
Game_BattlerBase.prototype.updateBuffTurns = function() {
    _Game_BattlerBase_updateBuffTurns.call(this);
    this.clearBuffNowTurns();
    this.clearDebuffNowTurns();
    for (let i = 0; i < this._buffTurns.length; i++) {
        if (this._buffs[i] !== 0) {
            this.isBuffAffected(i) ? this._buffNowTurns[i]++ : this._debuffNowTurns[i]++;
        }
    }
};

const _Game_BattlerBase_overwriteBuffTurns = Game_BattlerBase.prototype.overwriteBuffTurns;
Game_BattlerBase.prototype.overwriteBuffTurns = function(paramId, turns) {
    const result = this._buffTurns[paramId] < turns;
    _Game_BattlerBase_overwriteBuffTurns.call(this, paramId, turns);
    if ((StateTurnReset || !this.getBuffNowTurn(paramId)) && result) {
        this.isBuffAffected(paramId) ? this.resetBuffNowTurn(paramId) : this.resetDebuffNowTurn(paramId);
    }
};

Game_BattlerBase.prototype.isBuffNowTurn = function(paramId) {
    this.clearBuffNowTurns();
    return this._buffNowTurns[paramId];
};

Game_BattlerBase.prototype.isDeBuffNowTurn = function(paramId) {
    this.clearDebuffNowTurns();
    return this._debuffNowTurns[paramId];
};

Game_BattlerBase.prototype.resetBuffNowTurn = function(paramId) {
    this.setBuffNowTurn(paramId, 1);
    this.setDebuffNowTurn(paramId, 0);
};

Game_BattlerBase.prototype.resetDebuffNowTurn = function(paramId) {
    this.setBuffNowTurn(paramId, 0);
    this.setDebuffNowTurn(paramId, 1);
};

Game_BattlerBase.prototype.getBuffNowTurn = function(paramId) {
    return this.isBuffAffected(paramId) ? this.isBuffNowTurn(paramId) : this.isDeBuffNowTurn(paramId);
};

})();