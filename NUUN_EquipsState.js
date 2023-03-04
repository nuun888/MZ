/*:-----------------------------------------------------------------------------------
 * NUUN_EquipsState.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc Equipped state
 * @author NUUN
 * @version 1.0.2
 * 
 * @help
 * You can set a state that applies only when equipped.
 * 
 * Weapon and Armor notes
 * <EquipState:[id],[id],[id]...> Give a status.
 * <EquipState:4> 装備している間、State number 4 will be granted.
 * <EquipState:4,10> While equipped, states 4 and 10 will be granted.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 3/4/2023 Ver.1.0.2
 * Changed the display in languages other than Japanese to English.
 * Fixed not to display the message when the state is disabled or released.
 * 2/27/2022 Ver.1.0.1
 * Fixed an issue where states would not clear when unequipping.
 * 2/26/2022 Ver.1.0.0
 * First edition/
 * 
 * @param EquipsStateAppliEval
 * @desc Defining acquisition of equipment objects by external plugins. 
 * @text Equipment object acquisition definition
 * @type combo[]
 * @option this.getSetBonus();//NUUN_SetBonusEquip
 * @option this.passiveObject();//NUUN_PassiveSkill
 * @option this.passiveSkills();//SimplePassiveSkillMZ
 * @default
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 装備時ステート
 * @author NUUN
 * @version 1.0.2
 * 
 * @help
 * 装備している時のみに適用するステートを設定できます。
 * 
 * 武器、防具のメモ欄
 * <EquipState:[id],[id],[id]...> ステートを付与させます。
 * <EquipState:4> 装備している間、ステート4番のステートが付与されます。
 * <EquipState:4,10> 装備している間、ステート4番、10番のステートが付与されます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/3/4 Ver.1.0.2
 * ステート不可、解除時のメッセージを表示しないように修正。
 * 2022/2/27 Ver.1.0.1
 * 装備解除時にステートが解除されない問題を修正。
 * 2022/2/26 Ver.1.0.0
 * 初版
 * 
 * @param EquipsStateAppliEval
 * @desc 外部プラグインによる装備オブジェクトの取得定義。
 * @text 装備オブジェクト取得定義
 * @type combo[]
 * @option this.getSetBonus();//装備セットボーナス
 * @option this.passiveObject();//条件付きパッシブスキル
 * @option this.passiveSkills();//SimplePassiveSkillMZ
 * @default
 * 
 */
var Imported = Imported || {};
Imported.NUUN_EquipsState = true;

(() => {
const parameters = PluginManager.parameters('NUUN_EquipsState');
const EquipsStateAppliEval = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['EquipsStateAppliEval'])) : null) || [];

const _Game_Battler_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
    _Game_Battler_initMembers.call(this);
    this._equipsStateId = [];
};

const _Game_Actor_refresh = Game_Actor.prototype.refresh;
Game_Actor.prototype.refresh = function() {
    _Game_Actor_refresh.call(this);
    this.equipAddState();
};

Game_Actor.prototype.equipAddState = function() {
    const equips = this.equips();
    const oldStates = this._equipsStateId || [];
    this._equipsStateId = [];
    for (const data of EquipsStateAppliEval) {
        const addEquips = eval(data);
        if (addEquips) {
            Array.prototype.push.apply(equips, addEquips);
        }
    }
    for (const equip of equips) {
        const stateList = equip && equip.meta.EquipState ? equip.meta.EquipState.split(',').map(Number) : [];
        Array.prototype.push.apply(this._equipsStateId, stateList);
        for (const id of stateList) {
            if (id > 0) {
                this.addState(id);
                this._result.addedStates.pop();
            }
        }
    }
    const removeEquipState = oldStates.filter(state => state > 0 && this._equipsStateId.indexOf(state) < 0);
    for (const state of removeEquipState) {
        if (this.isStateAffected(state)) {
            this.removeState(state);
            this._result.removedStates.pop();
        }
    }
};

Game_Actor.prototype.setEquipsAddState = function() {
    const states = this._equipsStateId;
    for (const id of states) {
        if (id > 0) {
            this.addState(id);
            this._result.addedStates.pop();
        }
    }
};

const _Game_BattlerBase_recoverAll = Game_BattlerBase.prototype.recoverAll;
Game_BattlerBase.prototype.recoverAll = function() {
    _Game_BattlerBase_recoverAll.call(this);
    if (this._equipsStateId && this._equipsStateId.length > 0) {//消えたステートを再付加
        this.setEquipsAddState();
    }
};

})();