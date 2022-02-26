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
 * @plugindesc 装備時ステート
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * 装備している時のみに適用するステートを設定できます。
 * 
 * 特徴を有するメモ欄
 * <EquipState:[id],[id],[id]...> 現在付与されているステートの残りターンを全て増減させます。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
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
    this.equipsAddState();
};

Game_Actor.prototype.equipsAddState = function() {
    const equips = this.equips();
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
            }
        }
    }
};

Game_Actor.prototype.setEquipsAddState = function() {
    const states = this._equipsStateId;
    for (const id of states) {
        if (id > 0) {
            this.addState(id);
        }
    }
};

const _Game_BattlerBase_recoverAll = Game_BattlerBase.prototype.recoverAll;
Game_BattlerBase.prototype.recoverAll = function() {
    _Game_BattlerBase_recoverAll.call(this);
    if (this._equipsStateId && this._equipsStateId.length > 0) {
        this.setEquipsAddState();
    }
};

})();
