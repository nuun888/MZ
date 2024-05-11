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
 * @version 1.1.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * When applying a state to a hit attack, effectiveness and luck are ignored.
 * This plug-in changes the ability to take into account effectiveness and luck even for certain attacks, or changes it to specifications up to Ace (taking into account effectiveness and luck only in hostile relationships).
 * 
 * By writing <NoLukStateSkill> in the notes of a skill or item, this skill or item will not be affected by luck when adding a state.
 * 
 * skill/item Notes
 * <NoLukStateSkill> The state granted by this skill or item ignores the influence of luck.
 * 
 * By entering <CertainStateSkill> in the notes of a skill or item, the state given by this skill or item will be given regardless of effectiveness or luck.
 * This is the original must-have specification.
 * skill/item Notes
 * <CertainStateSkill> The state received by this skill or item is given ignoring effectiveness and luck.
 * 
 * Add to this skill or item by entering <CertainState:[id]> in the Notes of the skill or item.
 * The state of state [id] is given ignoring effectiveness and luck.
 * skill/item Notes
 * <CertainState:[id],[id]....> The state [id] received by this skill or item is given ignoring effectiveness and luck.
 * <CertainState:4,6> States 4 and 6 received by this skill and item are given ignoring effectiveness and luck.
 * [id]: State ID (please remove [])
 * 
 * <AddCertainState:[id],[id]....> If a specific state has been granted, it will be granted ignoring effectiveness and luck.
 * <AddCertainState:4,6> If states 4 and 6 are given, effectiveness and luck will be ignored and given.
 * 
 * 
 * By writing <NoLukState> in the state's Notes, this state will not be affected by luck.
 * State Notes
 * <NoLukState> This state is not affected by luck.
 * 
 * When adding a normal state, if you want to give a state to an ally, luck will be taken into account even if it is guaranteed, so by writing <NoLukState> in the notes of the state, you can have it be given while ignoring luck. (If "When CertainHit, effectiveness and luck are enabled")
 * "Enemy relationship effectiveness Luck effective" is only effective if the relationship is hostile.
 * 
 * If the state invalidation is set, the state will be invalidated even if the attack ignores the effectiveness.
 * The above tags can also be applied to physical attacks and magical attacks.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 5/11/2024 Ver.1.1.0
 * Addition of append mode
 * Added a function that allows you to set a state to be forcibly added when the state is suspended in a specific state.
 * 11/25/2022 Ver.1.0.2
 * Changed the display in languages other than Japanese to English.
 * 1/16/2022 Ver.1.0.1
 * Fixed an issue where attack state chances for ignoring resistances were not being applied.
 * 12/17/2020 Ver.1.0.0
 * First edition.
 * 
 * @param AddNormalStateMode
 * @desc Normal state addition mode.
 * @text Normal state addition mode
 * @type select
 * @option When CertainHit, effectiveness and luck are enabled
 * @value 0
 * @option Enemy relationship effectiveness Luck effective
 * @value 1
 * @default 0
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc ステート付与の仕様変更、拡張
 * @author NUUN
 * @version 1.1.0
 * 
 * @help
 * 必中攻撃ではステートを付与する際に有効度、運を無視して付与されてしまいます。
 * このプラグインでは必中攻撃でも有効度、運を考慮するように変更または、Aceまでの仕様(敵対関係のみ有効度、運を考慮)にします。
 * 
 * スキル、アイテムのメモ欄に<NoLukStateSkill>を記入することでこのスキル、アイテムは、ステートを付与する時に運の影響をうけません。
 * スキル、アイテムのメモ欄
 * <NoLukStateSkill>  このスキル、アイテムで付与するステートは運を影響を無視します。
 * 
 * スキル、アイテムのメモ欄に<CertainStateSkill>を記入することで、このスキル、アイテムで付与するステートは有効度、運を無視して付与されます。
 * 本来の必中の仕様になります。
 * スキル、アイテムのメモ欄
 * <CertainStateSkill>  このスキル、アイテムで受けるステートは有効度、運を無視して付与します。
 * 
 * スキル、アイテムのメモ欄に<CertainState:[id]> を記入することで、このスキル、アイテムに付与する
 * ステート[id]のステートは有効度、運を無視して付与します。
 * スキル、アイテムのメモ欄
 * <CertainState:[id],[id]....> このスキル、アイテムで受けるステート[id]は有効度、運を無視して付与します。
 * <CertainState:4,6> このスキル、アイテムで受けるステート4,6は有効度、運を無視して付与します。
 * [id]:ステートID([]は外してください)
 * 
 * <AddCertainState:[id],[id]....> 特定のステートが付与されていた場合、有効度、運を無視して付与します。
 * <AddCertainState:4,6> ステート4,6が付与されていた場合は有効度、運を無視して付与します。
 * 
 * ステートのメモ欄に<NoLukState>を記入する事で、このステートは運の影響を受けません。
 * ステートのメモ欄
 * <NoLukState> このステートは運の影響をうけません。
 * 
 * 
 * 通常ステート付加時、味方にステートを付与させる場合は必中にしても運を考慮してしまうためステートのメモ欄に<NoLukState>を記入することで運を無視して付与させることが出来ます。(必中時有効度運有効の場合)
 * 敵対関係有効度運有効の場合、敵対関係の場合のみ有効となります。
 * 
 * ステート無効化を設定している場合、有効度を無視する攻撃をしてもステートは無効化されます。
 * 上記のタグは物理攻撃、魔法攻撃にも適用可能です。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/5/11 Ver.1.1.0
 * 付加モードの追加
 * 特定のステートに掛かっている場合に強制付加するステートを設定できる機能を追加。
 * 2023/1/11 Ver.1.0.3
 * ヘルプ修正。
 * 2022/11/25 Ver.1.0.2
 * 日本語以外での表示を英語表示に変更。
 * 2022/1/16 Ver.1.0.1
 * 耐性無視時の攻撃時ステートの確率が適用されていなかった問題を修正。
 * 2020/12/17 Ver.1.0.0
 * 初版
 * 
 * @param AddNormalStateMode
 * @desc 通常ステート付加時のモード。
 * @text 通常ステート付加モード
 * @type select
 * @option 必中時有効度運有効
 * @value 0
 * @option 敵対関係有効度運有効
 * @value 1
 * @default 0
 * 
 */
var Imported = Imported || {};
Imported.NUUN_AddStateDeviation = true;

(() => {
const parameters = PluginManager.parameters('NUUN_AddStateDeviation');
const params = Nuun_PluginParams.getPluginParams(document.currentScript);


    Game_Action.prototype.certainState = function(target, id){
        if (this.item().AddCertainState) {
            if (this.isAddCertainState(target)) {
                return true;
            }
        }
        if(this.item().meta.CertainState) {
            if(this.isCertainState(id)) {
                return true;
            }
        }
        return this.isCertainStateSkill();
    };

    Game_Action.prototype.isAddCertainState = function(target){
        const addCertainState = this.item().meta.AddCertainState.split(",").map(Number);
        return addCertainState.some(state => target.isStateAffected(state));
    };

    Game_Action.prototype.isCertainState = function(id){
        const certainState = this.item().meta.CertainState.split(",").map(Number);
        return certainState.some(state => state === id);
    };

    Game_Action.prototype.isCertainStateSkill = function(){
        return !!this.item().meta.CertainStateSkill;
    };

    Game_Action.prototype.noLukState = function(id){
        return $dataStates[id].meta.NoLukState || this.item().meta.NoLukStateSkill;
    };

    Game_Action.prototype.noLukState = function(id){
        return $dataStates[id].meta.NoLukState || this.item().meta.NoLukStateSkill;
    };

    Game_Action.prototype.isOpposite = function(target) {
        return this.subject().isActor() !== target.isActor();
    };

    Game_Action.prototype.itemEffectAddAttackState = function(target, effect) {
        for (const stateId of this.subject().attackStates()) {
            let chance = effect.value1;
            chance *= this.subject().attackStatesRate(stateId);
            if(!this.certainState(target, stateId)) {
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
        if (this.isAddNormalStateMode(target) && !this.certainState(target, effect.dataId)) {
            chance *= target.stateRate(effect.dataId);
            chance *= this.noLukState(effect.dataId) ? 1.0 : this.lukEffectRate(target);
        }
        if (Math.random() < chance) {
            target.addState(effect.dataId);
            this.makeSuccess(target);
        }
    };

    Game_Action.prototype.isAddNormalStateMode = function(target) {
        if (params.AddNormalStateMode === 0) {
            return true;
        } else {
            return this.isOpposite(target);
        }
    };
})();