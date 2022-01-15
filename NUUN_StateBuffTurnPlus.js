/*:-----------------------------------------------------------------------------------
 * NUUN_StateBuffTurnPlus.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc ステート、バフターン数増減特徴
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * ステート、バフの効果ターンが増加、減少する特徴を設定できます。
 * 特徴を持つメモ欄
 * <StateTurn[stateId]:[turn]> 指定のステートのターンが[Turn]増加します。
 * <BuffTurn[BuffId]:[turn]> 指定のバフのターンが[Turn]増加します。
 * <DebuffTurn[BuffId]:[turn]> 指定のデバフのターンが[Turn]増加します。
 * [stateId]:ステートID
 * [BuffId]:バフID 0:HP 1:MP 2:攻撃力 3:防御力 4:魔法力 5:魔法防御 6:敏捷性 7:運
 * [turn]:±ターン数
 * <StateTurn4:2> ステート４番のターンが２ターン増加します。
 * <BuffTurn3:3> 攻撃力上昇のバフの効果が３ターン増加します。
 * <DebuffTurn5:-2> 魔法力低下のデバフの効果が２ターン減少します。
 * 加算ターンと付与するターンのターンが0を下回った場合は最低１ターン効果が適用されます。
 * 　
 * 更新履歴
 * 2022/1/15 Ver.1.0.0
 * 初版
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_StateBuffTurnPlus = true;

(() => {
const parameters = PluginManager.parameters('NUUN_StateBuffTurnPlus');

Game_BattlerBase.prototype.getStateTurnPlus = function(stateId) {
    return this.traitObjects().reduce((r, trait) => {
        const tag = 'StateTurn' + stateId;
        const data = trait.meta[tag];
        return r + (data && data !== 0 ? Number(data) : 0);
    }, 0);
};

Game_BattlerBase.prototype.getBuffTurnPlus = function(buffId) {
    return this.traitObjects().reduce((r, trait) => {
        const tag = 'BuffTurn' + buffId;
        const data = trait.meta[tag];
        return r + (data && data !== 0 ? Number(data) : 0);
    }, 0);
};

Game_BattlerBase.prototype.getDebuffTurnPlus = function(buffId) {
    return this.traitObjects().reduce((r, trait) => {
        const tag = 'DebuffTurn' + buffId;
        const data = trait.meta[tag];
        return r + (data && data !== 0 ? Number(data) : 0);
    }, 0);
};

const _Game_BattlerBase_resetStateCounts = Game_BattlerBase.prototype.resetStateCounts;
Game_BattlerBase.prototype.resetStateCounts = function(stateId) {
    _Game_BattlerBase_resetStateCounts.call(this, stateId);
    this._stateTurns[stateId] = Math.max(this._stateTurns[stateId] + this.getStateTurnPlus(stateId), 1);
};

const _Game_BattlerBase_overwriteBuffTurns = Game_BattlerBase.prototype.overwriteBuffTurns;
Game_BattlerBase.prototype.overwriteBuffTurns = function(paramId, turns) {
    const newTurn = Math.max(turns + (this.isBuffAffected(paramId) ? this.getBuffTurnPlus(paramId) : this.getDebuffTurnPlus(paramId)), 1);
    _Game_BattlerBase_overwriteBuffTurns.call(this, paramId, newTurn);
};

})();
