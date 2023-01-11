/*:-----------------------------------------------------------------------------------
 * NUUN_AddStateDeviation.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */
/*:
 * @target MZ
 * @plugindesc Specification change of state assignment
 * @author NUUN
 * @version 1.0.3
 * 
 * @help
 * In the sure hit attack, when giving a state, it will be given without ignoring effectiveness and luck.
 * This plug-in will be changed to consider the effectiveness and luck even for hit hits.
 * 
 * Skill and Item notes
 * <NoLukStateSkill> The state granted by this skill ignores luck.
 * 
 * State notes
 * <NoLukState> This state is not affected by luck.
 * 
 * Skill notes
 * <CertainStateSkill> The state received by this skill ignores the effectiveness and luck.
 * <CertainState:[id],[id]....> The state of state [id] will be given regardless of effectiveness and luck.
 * [id]:State id
 * <CertainState:4,6> State 4 and 6 received by this skill are given regardless of effectiveness and luck.
 * 
 * When giving a state to an ally, luck is taken into account even if it is absolutely necessary, so you can ignore luck by entering <NoLukState> in the Note field of the state.
 * If the state invalidation is set, the state will be invalidated even if the attack ignores the effectiveness.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 1/11/2023 Ver.1.0.3
 * Help fix.
 * 11/25/2022 Ver.1.0.2
 * Changed the display in languages other than Japanese to English.
 * 1/16/2022 Ver.1.0.1
 * Fixed an issue where attack state chances for ignoring resistances were not being applied.
 * 12/17/2020 Ver.1.0.0
 * First edition.
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc ステート付与の仕様変更
 * @author NUUN
 * @version 1.0.3
 * 
 * @help
 * 必中攻撃ではステートを付与する際に有効度、運を無視して付与されてしまいます。
 * このプラグインでは必中攻撃でも有効度、運を考慮するように変更します。
 * 
 * スキル、アイテムのメモ欄
 * <NoLukStateSkill> このスキルで付与するステートは運を影響を無視します。
 * 
 * ステートのメモ欄
 * <NoLukState> このステートは運の影響を受けません。
 * 
 * スキルのメモ欄
 * <CertainStateSkill> このスキルで受けるステートは有効度、運を無視して付与します。
 * <CertainState:[id],[id]....> ステート[id]のステートは有効度、運を無視して付与します。
 * [id]:ステートID
 * <CertainState:4,6> このスキルで受けるステート4,6は有効度、運を無視して付与します。
 * 
 * 味方にステートを付与させる場合は必中にしても運を考慮してしまうためステートのメモ欄に<NoLukState>を記入することで運を無視して付与させることが出来ます。
 * ステート無効化を設定している場合、有効度を無視する攻撃をしてもステートは無効化されます。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/1/11 Ver.1.0.3
 * ヘルプ修正。
 * 2022/11/25 Ver.1.0.2
 * 日本語以外での表示を英語表示に変更。
 * 2022/1/16 Ver.1.0.1
 * 耐性無視時の攻撃時ステートの確率が適用されていなかった問題を修正。
 * 2020/12/17 Ver.1.0.0
 * 初版
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
    chance *= this.subject().attackStatesRate(stateId);
    if(!this.certainState(stateId)) {
      chance *= target.stateRate(stateId);
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
  if (!this.certainState(effect.dataId)) {
    chance *= target.stateRate(effect.dataId);
    chance *= this.noLukState(effect.dataId) ? 1.0 : this.lukEffectRate(target);
  }
  if (Math.random() < chance) {
      target.addState(effect.dataId);
      this.makeSuccess(target);
  }
};
})();