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
 * @version 1.0.0
 * 
 * @help
 * ステートの現在の経過ターンを取得できるようにします。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
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

})();