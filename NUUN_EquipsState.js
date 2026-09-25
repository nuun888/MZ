/*:-----------------------------------------------------------------------------------
 * NUUN_EquipsState.js
 * 
 * Copyright (C) 2022 NUUN
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc Equipped state
 * @author NUUN
 * @version 1.1.0
 * 
 * @help
 * You can set a state that applies only when equipped.
 * 
 * Weapon and Armor notes
 * <EquipState:[id],[id],[id]...> Give a status.
 * <EquipState:4> State 4 is applied while equipped.
 * <EquipState:4,10> While equipped, states 4 and 10 will be granted.
 * 
 * Evaluation formula for getting the equipment object
 * actor: Actor
 * 
 * Terms of Use
 * Credit: Optional
 * Commercial use: Possible
 * Modifications: Possible
 * Redistribution: Possible
 * Support is not available for modified versions or downloads from sources other than https://github.com/nuun888/MZ, the official forum, or authorized retailers.
 * 
 * Log
 * 9/26/2026 Ver.1.1.0
 * Changed the specifications so that the plugin can run without NUUN_Base.
 * Changed how the equipment object retrieval definition is specified.
 * 3/4/2023 Ver.1.0.2
 * Changed the display in languages other than Japanese to English.
 * Fixed not to display the message when the state is disabled or released.
 * 2/27/2022 Ver.1.0.1
 * Fixed an issue where states would not clear when unequipping.
 * 2/26/2022 Ver.1.0.0
 * First edition/
 * 
 * @param EquipsStateAppliEval
 * @desc Defines equipment objects from external plugins. Game_Actor functions can be referenced by function name only.
 * @text Equipment object acquisition definition
 * @type combo[]
 * @option setBonusObject//NUUN_SetBonusEquip
 * @option passiveObject//NUUN_PassiveSkill
 * @option passiveSkills//SimplePassiveSkillMZ
 * @default
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 装備時ステート
 * @author NUUN
 * @version 1.1.0
 * 
 * @help
 * 装備している時のみに適用するステートを設定できます。
 * 
 * 武器、防具のメモ欄
 * <EquipState:[id],[id],[id]...> ステートを付与させます。
 * <EquipState:4> 装備している間、ステート4番のステートが付与されます。
 * <EquipState:4,10> 装備している間、ステート4番、10番のステートが付与されます。
 * 
 * 装備オブジェクト取得定義の評価式
 * actor:アクター
 * 
 * 利用規約
 * クレジット表記：任意
 * 商業利用：可能
 * 改変：可能
 * 再配布：可能
 * ※https://github.com/nuun888/MZ、公式フォーラム、正規販売サイト以外からのダウンロード、改変済みの場合はサポートは対象外となります。
 * 
 * 更新履歴
 * 2026/9/26 Ver.1.1.0
 * NUUN_Baseなしで実行できるように仕様を変更。
 * 装備オブジェクト取得定義の指定方法を変更。
 * 2023/3/4 Ver.1.0.2
 * ステート不可、解除時のメッセージを表示しないように修正。
 * 2022/2/27 Ver.1.0.1
 * 装備解除時にステートが解除されない問題を修正。
 * 2022/2/26 Ver.1.0.0
 * 初版
 * 
 * @param EquipsStateAppliEval
 * @desc 外部プラグインによる装備オブジェクトの取得定義。Game_Actor内の関数なら関数名のみで参照できます。
 * @text 装備オブジェクト取得定義
 * @type combo[]
 * @option setBonusObject//装備セットボーナス
 * @option passiveObject//条件付きパッシブスキル
 * @option passiveSkills//SimplePassiveSkillMZ
 * @default
 * 
 */
var Imported = Imported || {};
Imported.NUUN_EquipsState = true;

(() => {

    class Nuun_PluginParams_EquipsState {
        static getPluginParams(text) {//document.currentScript
            try {
                const name = String(Utils.extractFileName(text.src).split('.').shift());
                const params = PluginManager.parameters(name);
                if (params) {
                    const pluginParam = new Nuun_PluginParamData(params);
                    pluginParam.setPluginName(name);
                    return pluginParam.getParameters();
                }
                return {pluginName: name};
            } catch (error) {
                const log = ($gameSystem.isJapanese() ? "コアスクリプトをVer.1.3.2以降に更新してください。" : "Please update the core script to version 1.3.2 or later.");
                throw ["ParameterError", log];
            }
        }
    };

    window.Nuun_PluginParams_EquipsState = Nuun_PluginParams_EquipsState;

    class Nuun_PluginParamData {
        constructor(text) {
            this._parameters = JSON.parse(JSON.stringify(text, this._convertParams)) || {};
        }

        _convertParams(key, code) {
            try {
                return JSON.parse(code);
            } catch (e) {
                if (isNaN(code)) {
                    if (!code) {
                        return null;
                    }
                    try {
                        if (code.indexOf("'") === 0 || code.indexOf('"') === 0) {
                            return eval(code);//'または"を外す。
                        }
                        return !!code ? String(code) : null;
                    } catch (e) {
                        if (typeof {} === "object") {
                            return code;
                        }
                        return !!code ? String(code) : null;
                    }
                } else {
                    return String(code);
                }
            }
        }

        getParameters() {
            return this._parameters;
        }

        setPluginName(name) {
            this._parameters.pluginName = name;
        }


        getMetaTag(object, code) {
            const data = object.meta[code];
            let list = [];
            if (data !== undefined) {
                try {
                    list = data.split(',');
                } catch (error) {
                    return this.getTextCodeMeta(data);
                }
                list = list.map(a => this.getTextCodeMeta(a));
                return list;
            } else {
                return undefined;
            }
        }

        getTextCodeMeta(text) {
            if (isNaN(text)) {
                return text;
            } else {
                return Number(text);
            }
        }
    };

    const params = Nuun_PluginParams_EquipsState.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;

    function NuunEquipsStateManager() {
        throw new Error("This is a static class");
    }

    window.NuunEquipsStateManager = NuunEquipsStateManager;

    NuunEquipsStateManager.getEvalCode = function(code) {
        if (isNaN(code)) {
            if (!code) {
                return null;
            }
            return this.stringCode(code);
        } else {
            return String(code);
        }
    };

    NuunEquipsStateManager.stringCode = function(code){
        try {
            if (code.indexOf("'") === 0 || code.indexOf('"') === 0) {
                return eval(code);//'または"を外す。
            }
            return !!code ? String(code) : null;
        } catch (e) {
            return code;
        }
    };

    NuunEquipsStateManager.getMetaCodeList = function(object, method) {
        const meta = object.meta[method];
        if (!meta || meta === true) return null;
        if (meta.indexOf('[') >= 0) {
            const log = ($gameSystem.isJapanese() ? "パラメータに[]が含まれています。[]を外して記入して下さい。" : "The parameter contains []. Please remove the [] and enter it.");
            throw ["ParameterError", log];
        }
        return meta.split(',');
    };

    NuunEquipsStateManager.equipsStatParams = function(code) {
        switch (code) {
            case 0:
                return params.EquipsStateAppliEval || [];
        }
    };

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
        for (const data of NuunEquipsStateManager.equipsStatParams(0)) {
            const addEquips = this.getEquipsStateEvalParam(data);
            if (addEquips) {
                Array.prototype.push.apply(equips, addEquips);
            }
        }
        for (const equip of equips) {
            const stateList = equip && equip.meta.EquipState ? (NuunEquipsStateManager.getMetaCodeList(equip, "EquipState") || []).map(Number) : [];
            Array.prototype.push.apply(this._equipsStateId, stateList);
            for (const id of stateList) {
                if (id > 0) {
                    const length = this._result.addedStates.length;
                    this.addState(id);
                    if (this._result.addedStates.length > length) {
                        this._result.addedStates.pop();
                    }
                }
            }
        }
        const removeEquipState = oldStates.filter(state => state > 0 && this._equipsStateId.indexOf(state) < 0);
        for (const state of removeEquipState) {
            if (this.isStateAffected(state)) {
                const length = this._result.removedStates.length;
                this.removeState(state);
                if (this._result.removedStates.length > length) {
                    this._result.removedStates.pop();
                }
            }
        }
    };

    Game_Actor.prototype.getEquipsStateEvalParam = function(param) {
        const actor = this;
        try {
            if (typeof this[param] === "function") {
                return this[param].call(this);
            } else {
                return eval(param);
            }
        } catch (error) {
            return null;
        }
    };

    Game_Actor.prototype.setEquipsAddState = function() {
        const states = this._equipsStateId;
        for (const id of states) {
            if (id > 0) {
                const length = this._result.addedStates.length;
                this.addState(id);
                if (this._result.addedStates.length > length) {
                    this._result.addedStates.pop();
                }
            }
        }
    };

    const _Game_BattlerBase_recoverAll = Game_BattlerBase.prototype.recoverAll;
    Game_BattlerBase.prototype.recoverAll = function() {
        _Game_BattlerBase_recoverAll.call(this);
        if (this.isActor() && this._equipsStateId && this._equipsStateId.length > 0) {//消えたステートを再付加
            this.setEquipsAddState();
        }
    };

})();