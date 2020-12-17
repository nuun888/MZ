/*:-----------------------------------------------------------------------------------
 * NUUN_AddStateDeviation.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 更新履歴
 * 2020/12/17 Ver.1.0.0
 */ 
/*:
 * @target MZ
 * @plugindesc ステート付与の仕様変更
 * @author NUUN
 * 
 * @help
 * 必中攻撃ではステートを付与する際に有効度、運を無視して付与されてしまいます。
 * このプラグインでは必中攻撃でも有効度、運を考慮するように変更します。
 * また、スキル、アイテムのメモ欄に<NoLukStateSkill>を記入することで
 * このスキルは、ステートを付与する時に運の影響をうけません。
 * ステートのメモ欄に<NoLukState>を記入する事で、このステートは運の影響を受けません。
 * 
 * <NoLukStateSkill>  このスキルで付与するステートは運を影響を無視します。
 * <NoLukState> このステートは運の影響をうけません。
 * 
 * スキルのメモ欄に<CertainStateSkill>を記入することで、このスキルで付与する
 * ステートは有効度、運を無視して付与されます。
 * スキルのメモ欄に<CertainState:[id]> を記入することで、このスキルに付与する
 * ステート[id]のステートは有効度、運を無視して付与します。[id]:ステート番号
 * 
 * <CertainStateSkill>  このスキルで受けるステートは有効度、運を無視して付与します。
 * <CertainState:4,6> このスキルで受けるステート4,6は有効度、運を無視して付与します。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 */
var Imported = Imported || {};
Imported.NUUN_AddStateDeviation = true;

(() => {
const parameters = PluginManager.parameters('NUUN_AddStateDeviation');

Game_Action.prototype.certainState = function(id){
  if(this.item().meta.CertainState) {
    const certainState = this.item().meta.CertainState.split(",").map(Number);
    const isCertain = certainState.find(State => State === id);
    if(isCertain) {
      return true;
    }
  }
  return this.item().meta.CertainStateSkill;
};

Game_Action.prototype.noLukState = function(id){
  return $dataStates[id].meta.NoLukState || this.item().meta.NoLukStateSkill;
};

Game_Action.prototype.itemEffectAddAttackState = function(target, effect) {
  for (const stateId of this.subject().attackStates()) {
      let chance = effect.value1;
      if(!this.certainState(stateId)) {
        chance *= target.stateRate(stateId);
        chance *= this.subject().attackStatesRate(stateId);
        chance *= this.noLukState(stateId) ? 1.0 : this.lukEffectRate(target);
      }
      if (Math.random() < chance) {
          target.addState(stateId);
          this.makeSuccess(target);
      }
  }
};

Game_Action.prototype.itemEffectAddNormalState = function(target, effect) {
  let chance = effect.value1;
  if(!this.certainState(effect.dataId)){
    chance *= target.stateRate(effect.dataId);
    chance *= this.noLukState(effect.dataId) ? 1.0 : this.lukEffectRate(target);
  }console.log(this.noLukState(effect.dataId) ? 1.0 : this.lukEffectRate(target))
  if (Math.random() < chance) {
    target.addState(effect.dataId);
    this.makeSuccess(target);
  }
};
})();