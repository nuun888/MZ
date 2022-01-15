/*:-----------------------------------------------------------------------------------
 * NUUN_AddStateRateBoost.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc ステート付与率増減特徴
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * ステート付加率を増減する特徴を設定できます。
 * 特徴を持つメモ欄
 * <AddStateRate:[rate]> この特徴を持つ場合、ステートの付与率が[rate]%増減します。
 * <AddStateRate[stateId]:[rate]> この特徴を持ち[stateId]のステートが付加されるとき、付与率が[rate]%増減します。
 * [rate]:確率（百分率）　複数存在する場合は加算されます。
 * [stateId]:ステートID
 * 
 * 更新履歴
 * 2022/1/16 Ver.1.0.0
 * 初版
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_AddStateRateBoost = true;

(() => {
const parameters = PluginManager.parameters('NUUN_AddStateRateBoost');

Game_BattlerBase.prototype.getAddStateRate = function(stateId) {
    return this.traitObjects().reduce((r, trait) => {
        const tag = 'AddStateRate' + stateId;
        let rate = 0.0;
        if (trait.meta[tag]) {
            rate += Number(trait.meta[tag]) / 100;
        }
        if (trait.meta.AddStateRate) {
            rate += Number(trait.meta.AddStateRate) / 100;
        }
        return rate > 0 ? r + rate : r;
    }, 1.0);
};

const _Game_BattlerBase_attackStatesRate = Game_BattlerBase.prototype.attackStatesRate;
Game_BattlerBase.prototype.attackStatesRate = function(stateId) {
    return _Game_BattlerBase_attackStatesRate.call(this, stateId) * this.getAddStateRate(stateId);
};

const _Game_Action_itemEffectAddNormalState = Game_Action.prototype.itemEffectAddNormalState;
Game_Action.prototype.itemEffectAddNormalState = function(target, effect) {
    const orgChance = effect.value1;
    effect.value1 *= this.subject().getAddStateRate(effect.dataId);
    _Game_Action_itemEffectAddNormalState.call(this, target, effect);
    effect.value1 = orgChance;
};

})();