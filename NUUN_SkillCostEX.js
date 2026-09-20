/*:-----------------------------------------------------------------------------------
 * NUUN_SkillCostEX.js
 * 
 * Copyright (C) 2021 NUUN
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc Skill Cost Extension
 * @author NUUN
 * @version 1.4.1
 * 
 * @help
 * You can set various types of costs for skills.
 * 
 * Skill Note Tags
 * HP Cost Skills
 * <SkillHPCost:150> Consumes 150 HP as the skill cost.
 * <SkillHPCostMR:30> Consumes 30% of Max HP as the skill cost.
 * <SkillHPCostR:30> Consumes 30% of the current HP as the skill cost.
 * <HPCostDead> Allows the user to become incapacitated as a result of paying the HP cost.
 * 
 * MP Cost Skills
 * <SkillMPCost:150> Consumes 150 MP as the skill cost. Although the database only allows costs up to 9999, this tag allows you to set costs of 10000 or more.
 * <SkillMPCostMR:30> Consumes 30% of Max MP as the skill cost.
 * <SkillMPCostR:30> Consumes 30% of the current MP as the skill cost.
 * <MPCostNoMcr> Ignores the MP Cost Rate effect.
 * 
 * TP Cost Skills
 * <SkillTPCostR:50> Consumes 50% of the current TP as the skill cost.
 * 
 * Gold Cost Skills
 * <SkillGoldCost:1000> Consumes 1000 G as the skill cost.
 * <SkillGoldCostR:30> Consumes 30% of the party's current gold as the skill cost.
 * 
 * EXP Cost Skills
 * <SkillExpCost:300> Consumes 300 EXP as the skill cost.
 * <SkillLevelExpCost> Consumes EXP from the EXP gained toward the current level.
 * <SkillExpCostR:50> Consumes 50% of the EXP required to reach the next level.
 * 
 * Item Cost Skills
 * <SkillItemCost:[itemType],[itemId],[num],[mode]> Consumes items, weapons, or armor as the skill cost.
 * When multiple costs are specified, the skill can only be used if all required items are available.
 * [itemType]: Item type. I: Item, W: Weapon, A: Armor
 * [itemId]: Item, weapon, or armor ID
 * [num]: Number consumed
 * [mode]: Include equipped items. 0: Do not include, 1: Include
 * [mode] is valid when equipped items can be consumed. If the required item is not in the inventory, it will be consumed from equipped weapons or armor.
 * 
 * Equipment Cost Skills
 * <SkillEquipCost:[itemType],[itemId],[num],[eval]> Consumes equipped weapons or armor as the skill cost.
 * [itemType]: Item type. W: Weapon, A: Armor
 * [itemId]: Weapon or armor ID
 * [num]: 0: Do not consume, 1: Remove
 * [eval]: When [num] is 1, enter the condition under which the equipment is consumed. If the condition is not met, the equipment will not be removed. If omitted, the equipment is always consumed.
 * Example: <SkillEquipCost:W,53,1,$gameParty.numItems($dataItems[1]) === 0> Removes the equipped weapon with ID 53 when the party does not have item ID 1.
 * 
 * Game Variable Cost Skills
 * <SkillVarCost:[id],[cost],[Identifier]> Consumes a specified amount from the value stored in a game variable.
 * <SkillVarCost:6,3> Consumes 3 from the value of game variable 6.
 * [id]: Game variable ID
 * [cost]: Cost to consume
 * [Identifier]: Identifier ID (used by the SkillCostRateCustomize plugin(Triacontane)). Optional.
 * <SkillVarCostR:[id],[max],[rate]> Consumes [rate]% of [max] from the value stored in a game variable.
 * If [max] is 0, [rate]% of the current value is consumed.
 * <SkillVarCostR:5,0,30> Consumes 30% of the current value of game variable 5.
 * <SkillVarCostR:5,100,30> Consumes 30% of the maximum value (100) from game variable 5.
 * [id]: Game variable ID
 * [max]: Maximum value
 * [rate]: Percentage cost (%)
 * [Identifier]: Identifier ID (used by the SkillCostRateCustomize plugin(Triacontane)). Optional.
 * 
 * State Cost Skills
 * <SkillStateCost:[stateId]> Can only be used when the specified state is applied. The state is removed when the skill is used.
 * [stateId]: State ID
 * 
 * Evaluation Formulas
 * <SkillEvalCost:[eval]> Enter an evaluation formula used to determine whether the cost can be paid.
 * <SkillEvalCons:[eval]> Enter an evaluation formula used to consume the cost.
 * Do not include the [] brackets.
 * 
 * Available Parameters
 * this.consBHp: Stores the user's HP before paying the cost.
 * this.consBMp: Stores the user's MP before paying the cost.
 * this.consBTp: Stores the user's TP before paying the cost.
 * this.consBGold: Stores the user's gold before paying the cost.
 * this.consBExp: Stores the user's EXP gained toward the current level before paying the cost.
 * 
 * By entering the following in the skill's damage formula:
 * a.consBMp * 1.5
 * You can deal damage equal to 1.5 times the user's MP before paying the cost.
 * 
 * Note Tags for Objects with Traits
 * <NoConsumptionCost[id]:±[rate]> Specifies the chance that the cost will not be consumed.
 * [id]: 1: MP 2: TP 3: HP 4: Gold
 * [rate]: Consumption rate modifier (±). The default value is 0.
 * 
 * Terms of Use
 * Credit: Optional
 * Commercial use: Possible
 * Adult content: Possible
 * Modifications: Possible
 * Redistribution: Possible
 * Support is not available for modified versions or downloads from sources other than https://github.com/nuun888/MZ, the official forum, or authorized retailers.
 * 
 * Log
 * 9/21/2026 Ver.1.4.1
 * Added a feature that allows states to be set as skill costs.
 * Minor fixes.
 * 9/20/2026 Ver.1.4.0
 * Changed the specifications so that the plugin can run without NUUN_Base.
 * Fixed an issue where the cost rate from the SkillCostRateCustomize plugin was not applied correctly to variable costs.
 * 1/26/2025 Ver.1.3.3
 * Fixed an issue where if you had enabled incapacitation due to consumption when consuming HP cost, you couldn't use skills with a cost higher than the current HP.
 * Fixed an issue where enemy graphics would remain displayed when you were incapacitated due to consuming HP cost.
 * 1/13/2024 Ver.1.3.2
 * Supported SkillCostRateCustomize so that it functions other than MP and TP.
 * 7/23/2023 Ver.1.3.1
 * Fixed an issue where HP and Gold were not consumed.
 * 7/13/2023 Ver.1.3.0
 * Added a function that does not consume MP, TP, HP, and Gold with a probability.
 * 7/9/2023 Ver.1.2.4
 * Fixed an issue where skills could not be selected when HP was 0.
 * 2/19/2023 Ver.1.2.3
 * Added a function to disappear equipped weapons and armor if you don't have them by consuming items.
 * 2/15/2023 Ver.1.2.2
 * Added a function that allows you to set the cost to disappear the equipped equipment when the conditions are met.
 * 12/17/2022 Ver.1.2.1
 * Correction of processing.
 * 12/4/2022 Ver.1.2.0
 * Added a cost that can be consumed as a percentage from a game variable.
 * 11/25/2022 Ver.1.1.1
 * Added MP skill cost. (Cost can be set to 10000 or more)
 * Changed the display in languages other than Japanese to English.
 * 4/2/2022 Ver.1.1.0
 * Added a function that allows you to set skills to be activated by consuming equipped weapons and armor.
 * 12/5/2021 Ver.1.0.0
 * First edition.
 * 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc スキルコスト拡張
 * @author NUUN
 * @version 1.4.1
 * 
 * @help
 * スキルコストにさまざまなコストを設定できます。
 * 
 * スキルのメモ欄
 * HP消費スキル
 * <SkillHPCost:150> コストとしてHPを１５０消費します。
 * <SkillHPCostMR:30> コストとして最大HPの３０％を消費します。
 * <SkillHPCostR:30> コストとして残りHPの３０％を消費します。
 * <HPCostDead> 消費による戦闘不能を許可します。
 * 
 * MP消費スキル
 * <SkillMPCost:150> コストとしてMPを１５０消費します。データベース上では9999までしか設定できませんが10000以上のコストを設定できます。
 * <SkillMPCostMR:30> コストとして最大MPの３０％を消費します。
 * <SkillMPCostR:30> コストとして残りMPの３０％を消費します。
 * <MPCostNoMcr> ＭＰ消費率の効果を適用しません。
 * 
 * TP消費スキル
 * <SkillTPCostR:50> コストとして残りTPの５０％を消費します。
 * 
 * 所持金消費スキル
 * <SkillGoldCost:1000>　コストとして所持金を１０００G消費します。
 * <SkillGoldCostR:30> コストとして所持金の３０％を消費します。
 * 
 * 経験値消費スキル
 * <SkillExpCost:300>　コストとして経験値を３００失います。
 * <SkillLevelExpCost> 現在のレベルの獲得経験値から消費させます。
 * <SkillExpCostR:50> 次のレベルの経験値までの獲得経験値の５０％を消費します。
 * 
 * アイテム消費スキル
 * <SkillItemCost:[itemType],[itemId],[num],[mode]> コストとしてアイテム、武器、防具を消費します。
 * 複数指定する場合はすべてのアイテムがある場合、使用することができます。
 * [itemType]:アイテムタイプ　I アイテム　W 武器　A 防具
 * [itemId]:アイテム、武器、防具ID
 * [num]:消費個数
 * [mode]:装備品を含む　0:含まない 1:含む
 * [mode]は装備アイテムを装備する場合有効です。所持していない場合は装備している武器、防具から消費されます。
 * 
 * 装備品消費スキル
 * <SkillEquipCost:[itemType],[itemId],[num],[eval]> コストとして装備中の武器、防具を消費します。
 * [itemType]:アイテムタイプ　W 武器　A 防具
 * [itemId]:武器、防具ID
 * [num]:0で消費なし 1で消失
 * [eval]:[num]を1の場合、消費する条件式を記入します。条件不一致の場合は消失されません。省略時は常時消費します。
 * 例:<SkillEquipCost:W,53,1,$gameParty.numItems($dataItems[1]) === 0> アイテムID1番のアイテムがないときに武器ID53番の装備を消失します。
 * 
 * ゲーム変数消費スキル
 * <SkillVarCost:[id],[cost],[Identifier]> ゲーム変数に設定した数値から消費します。
 * <SkillVarCost:6,3> ゲーム変数6番の値から3消費します。
 * [id]:ゲーム変数ID
 * [cost]:消費コスト
 * [Identifier]:識別ID(SkillCostRateCustomizeプラグイン(トリアコンタン様)で使用) 省略可能
 * <SkillVarCostR:[id],[max],[rate]> ゲーム変数に設定した数値から[max]の[rate]%を消費します。
 * [max]が0の場合は、現在の値から[rate]%を消費します。
 * <SkillVarCostR:5,0,30> ゲーム変数5番の現在の値から30%消費します。
 * <SkillVarCostR:5,100,30> ゲーム変数5番の値から最大(100)の30%を消費します。
 * [id]:ゲーム変数ID
 * [max]:最大
 * [rate]:割合消費コスト(%)
 * [Identifier]:識別ID(SkillCostRateCustomizeプラグイン(トリアコンタン様)で使用) 省略可能
 * 
 * ステート消費スキル
 * <SkillStateCost:[stateId]> 特定のステートが付与されている場合に使用でき、スキル使用時にそのステートを解除します。
 * [stateId]:ステートID
 * 
 * 評価式
 * <SkillEvalCost:[eval]> 消費を判定するための評価式を記入します。
 * <SkillEvalCons:[eval]> 消費するための評価式を記入します。
 * ※[]は記入しないでください。
 * 
 * 取得パラメータ
 * this.consBHp:消費前の発動者のHPを格納します。
 * this.consBMp:消費前の発動者のMPを格納します。
 * this.consBTp:消費前の発動者のTPを格納します。
 * this.consBGold:消費前の発動者の所持金を格納します。
 * this.consBExp:消費前の発動者の現レベルの獲得経験値を格納します。
 * 
 * スキルのダメージの計算式に
 * a.consBMp * 1.5 と記入することで消費前のMPの1.5倍のダメージを与えることができます。
 * 
 * 特徴を有するメモ欄
 * <NoConsumptionCost[id]:±[rate]> 消費しない確率を指定します。
 * [id]:
 * 1:MP 2:TP 3:HP 4:Gold
 * [rate]:消費率(±)　初期値は0です。
 * 
 * 利用規約
 * クレジット表記：任意
 * 商業利用：可能
 * 成人向け：可能
 * 改変：可能
 * 再配布：可能
 * https://github.com/nuun888/MZ、公式フォーラム、正規販売サイト以外からのダウンロード、改変済みの場合はサポートは対象外となります。
 * 
 * 更新履歴
 * 2026/9/21 Ver.1.4.1
 * ステートをコストとして設定できる機能を追加。
 * 微細な修正。
 * 2026/9/20 Ver.1.4.0
 * NUUN_Baseなしで実行できるように仕様を変更。
 * 変数コストでSkillCostRateCustomizeプラグインでのコスト割合が正常に取得できていなかった問題を修正。
 * 2025/1/26 Ver.1.3.3
 * HPコスト消費時で消費による戦闘不能を有効にした場合で、現在のHPを超えるコストを持つスキルを使用できない問題を修正。
 * HPコスト消費で戦闘不能になった場合、敵のグラフィックが表示されたままになる問題を修正。
 * 2024/1/13 Ver.1.3.2
 * スキルコスト倍率調整プラグインでMP、TP以外でも機能するように対応。
 * 2023/7/23 Ver.1.3.1
 * HP、Goldが消費しない問題を修正。
 * 2023/7/13 Ver.1.3.0
 * MP、TP、HP、Goldを確率で消費しない機能を追加。
 * 2023/7/9 Ver.1.2.4
 * HPが0の時にスキルが選択できなくなる問題を修正。
 * 2023/2/19 Ver.1.2.3
 * アイテム消費で所持していない場合は装備している武器、防具を消失する機能を追加。
 * 2023/2/15 Ver.1.2.2
 * 条件一致で装備している装備を消失するコストを設定できる機能を追加。
 * 2022/12/17 Ver.1.2.1
 * 微修正
 * 2022/12/4 Ver.1.2.0
 * ゲーム変数から割合で消費できるコストを追加。
 * 2022/11/25 Ver.1.1.1
 * MPのスキルコストを追加。(コストを10000以上設定できます)
 * 日本語以外での表示を英語表示に変更。
 * 2022/4/2 Ver.1.1.0
 * 装備中の武器、防具を消費して発動するスキルを設定できる機能を追加。
 * 2021/12/5 Ver.1.0.0
 * 初版
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_SkillCostEX = true;

(() => {
    class Nuun_PluginParams_SkillCost {
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
                return list.map(a => this.getTextCodeMeta(a));
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

    const params = Nuun_PluginParams_SkillCost.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;

    window.Nuun_PluginParams_SkillCost = Nuun_PluginParams_SkillCost;

    function NuunSkillCostManager() {
        throw new Error("This is a static class");
    }

    window.NuunSkillCostManager = NuunSkillCostManager;

    NuunSkillCostManager.getEvalCode = function(code) {
        if (isNaN(code)) {
            if (!code) {
                return null;
            }
            return this.stringCode(code);
        } else {
            return String(code);
        }
    };

    NuunSkillCostManager.getMetaCode = function(object, method) {
        const meta = object.meta[method];
        if (!meta) return null;
        if (meta === true) {
            return null;
        }
        if (meta.indexOf('[') >= 0) {
            const log = ($gameSystem.isJapanese() ? "パラメータに[]が含まれています。[]を外して記入して下さい。" : "The parameter contains []. Please remove the [] and enter it.");
            throw ["ParameterError", log];
        }
        return meta;
    };

    NuunSkillCostManager.getMetaCodeList = function(object, method) {
        const meta = object.meta[method];
        if (!meta) return null;
        if (meta === true) {
            return null;
        }
        if (meta.indexOf('[') >= 0) {
            const log = ($gameSystem.isJapanese() ? "パラメータに[]が含まれています。[]を外して記入して下さい。" : "The parameter contains []. Please remove the [] and enter it.");
            throw ["ParameterError", log];
        }
        return meta.split(',');
    };

    NuunSkillCostManager.getColorCode = function(color) {
        if (typeof(color) === "string" && color.indexOf('#') === 0) {
            return color;
        }
        return ColorManager.textColor(color);
    };

    NuunSkillCostManager.LoadPictures = function(filename) {
        const bitmap = ImageManager.loadBitmap("img/", filename);
        return bitmap;
    };

    NuunSkillCostManager.getEvalParam = function(battler, param) {
        const v = $gameVariables._data;
        const actor = battler.isActor() ? battler : null;
        const enemy = battler.isEnemy() ? battler : null;
        try {
            if (!!actor && actor[param] !== undefined) {
                return actor[param];
            } else if (!!enemy && enemy[param] !== undefined) {
                return enemy[param];
            } else {
                return eval(param);
            }
        } catch (error) {
            return 0;
        }
    };

    NuunSkillCostManager.getCostItems = function(skill) {
        const list = [];
        if (skill.meta.SkillItemCost) {
            const re = /<(?:SkillItemCost):\s*(.*)>/g;
            while(true) {
                let match = re.exec(skill.note);
                if (match) {
                    let data = match[1].split(',');
                    switch (data[0]) {
                        case 'I':
                            list.push({item: $dataItems[parseInt(data[1])], quantity: parseInt(data[2]), mode:false});
                            break;
                        case 'W':
                            list.push({item: $dataWeapons[parseInt(data[1])], quantity: parseInt(data[2]), mode:parseInt(data[3])});
                            break;
                        case 'A':
                            list.push({item: $dataArmors[parseInt(data[1])], quantity: parseInt(data[2]), mode:parseInt(data[3])});
                            break;
                    }
                } else {
                    return list;
                }
            }
        }
        return list;
    };

    NuunSkillCostManager.getCostEquip = function(skill) {
        const list = [];
        if (skill.meta.SkillEquipCost) {
            const re = /<(?:SkillEquipCost):\s*(.*)>/g;
            while(true) {
                let match = re.exec(skill.note);
                if (match) {
                    let data = match[1].split(',');
                    switch (data[0]) {
                        case 'W':
                            list.push({item: $dataWeapons[parseInt(data[1])], quantity: parseInt(data[2]), cond: data[3]});
                            break;
                        case 'A':
                            list.push({item: $dataArmors[parseInt(data[1])], quantity: parseInt(data[2]), cond: data[3]});
                            break;
                    }
                } else {
                    return list;
                }
            }
        }
        return list;
    };


    const parameters = PluginManager.parameters('NUUN_SkillCostEX');

    const _Game_Battler_initMembers = Game_Battler.prototype.initMembers;
    Game_Battler.prototype.initMembers = function() {
        _Game_Battler_initMembers.call(this);
        this.consBHp = 0;
        this.consBMp = 0;
        this.consBTp = 0;
        this.consBGold = 0;
        this.consBExp = 0;
        this._canCost = true;
    };

    Game_Battler.prototype.setBCostParam = function() {
        this.consBHp = this._hp;
        this.consBMp = this._mp;
        this.consBTp = this._tp;
        if (this.isActor()) {
            this.consBGold = $gameParty.gold();
            this.consBExp = this.currentExp() - this.currentLevelExp();
        }
    };

    Game_BattlerBase.prototype.skillMpCost = function(skill) {//再定義
        let cost = skill.mpCost;
        cost += skill.meta.SkillMPCost ? Number(NuunSkillCostManager.getMetaCode(skill, "SkillMPCost")) : 0;
        cost += skill.meta.SkillMPCostMR ? Math.floor(this.mmp * Number(NuunSkillCostManager.getMetaCode(skill, "SkillMPCostMR")) / 100) : 0;
        cost += skill.meta.SkillMPCostR ? Math.floor(this._mp * Number(NuunSkillCostManager.getMetaCode(skill, "SkillMPCostR")) / 100) : 0;
        return skill.meta.MPCostNoMcr ? cost : Math.floor(cost * this.mcr);
    };

    Game_BattlerBase.prototype.skillHpCost = function(skill) {
        let cost = skill.meta.SkillHPCost ? Number(NuunSkillCostManager.getMetaCode(skill, "SkillHPCost")) : 0;
        cost += skill.meta.SkillHPCostMR ? Math.floor(this.mhp * Number(NuunSkillCostManager.getMetaCode(skill, "SkillHPCostMR")) / 100) : 0;
        cost += skill.meta.SkillHPCostR ? Math.floor(this._hp * Number(NuunSkillCostManager.getMetaCode(skill, "SkillHPCostR")) / 100) : 0;
        cost = this.skillCostRateCustomizeRateTriacontane(cost, 'Hp', skill);
        return cost;
    };

    Game_BattlerBase.prototype.skillTpCost = function(skill) {//再定義
        let cost = skill.tpCost;
        cost += skill.meta.SkillTPCostR ? Math.floor(this._tp * Number(NuunSkillCostManager.getMetaCode(skill, "SkillTPCostR")) / 100) : 0;
        return cost;
    };

    Game_BattlerBase.prototype.skillGoldCost = function(skill) {
        let cost = 0;
        if (!this.isEnemy()) {
            cost += skill.meta.SkillGoldCost ? Number(NuunSkillCostManager.getMetaCode(skill, "SkillGoldCost")) : 0;
            cost += skill.meta.SkillGoldCostR ? Math.floor($gameParty.gold() * Number(NuunSkillCostManager.getMetaCode(skill, "SkillGoldCostR")) / 100) : 0;
            cost = this.skillCostRateCustomizeRateTriacontane(cost, 'Gold', skill);
        }
        return cost;
    };

    Game_BattlerBase.prototype.skillVarCost = function(skill) {
        let cost = null;
        if (skill.meta.SkillVarCost) {
            cost = NuunSkillCostManager.getMetaCodeList(skill, "SkillVarCost");
            if (!cost) return cost;
            cost[1] = this.skillCostRateCustomizeRateTriacontane(Number(cost[1]), cost[2] || "Var", skill);
        }
        return !!cost ? cost.map(Number) : cost;
    };

    Game_BattlerBase.prototype.skillVarCostR = function(skill) {
        let cost = null;
        if (skill.meta.SkillVarCostR) {
            cost = NuunSkillCostManager.getMetaCodeList(skill, "SkillVarCostR");
            if (!cost) return cost;
            cost[2] = this.skillCostRateCustomizeRateTriacontane(Number(cost[2]), cost[3] || 'VarR', skill);
        }
        return !!cost ? cost.map(Number) : cost;
    };

    Game_BattlerBase.prototype.skillExpCost = function(skill) {
        let cost = 0;
        if (this.isActor()) {
            cost += skill.meta.SkillExpCost ? Number(NuunSkillCostManager.getMetaCode(skill, "SkillExpCost")) : 0;
            cost += skill.meta.SkillExpCostR ? (this.currentExp() - this.currentLevelExp()) * Number(NuunSkillCostManager.getMetaCode(skill, "SkillExpCostR")) / 100 : 0;
            cost = this.skillCostRateCustomizeRateTriacontane(cost, 'Exp', skill);
        }
        return cost;
    };

    Game_BattlerBase.prototype.skillItemCost = function(skill) {
        if (this.isActor() && skill) {
            return NuunSkillCostManager.getCostItems(skill);
        } else {
            return [];
        }
    };

    Game_BattlerBase.prototype.skillEquipCost = function(skill) {
        if (this.isActor() && skill) {
            return NuunSkillCostManager.getCostEquip(skill);
        } else {
            return [];
        }
    };

    Game_BattlerBase.prototype.skillStateCost = function(skill) {
        let stateId = 0;
        if (skill.meta.SkillStateCost) {
            stateId = Number(NuunSkillCostManager.getMetaCode(skill, "SkillStateCost"));
        }
        return stateId;
    };

    Game_BattlerBase.prototype.skillCostRateCustomizeRateTriacontane = function(result, type, skill) {
        if (!!this.applyCostRateCustomize) {
            return this.applyCostRateCustomize(result, type, skill);
        }
        return result;
    };

    const _Game_BattlerBase_canPaySkillCost = Game_BattlerBase.prototype.canPaySkillCost;
    Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
        return (
            _Game_BattlerBase_canPaySkillCost.apply(this, arguments) &&
            this.canSkillHpCost(skill) &&
            this.canSkillGoldCost(skill) &&
            this.canSkillExpCost(skill) &&
            this.canSkillItemCost(skill) &&
            this.canSkillEquipCost(skill) &&
            this.canSkillVarCost(skill) && 
            this.canSkillVarCostR(skill) &&
            this.canSkillEvalCost(skill) && 
            this.canSkillStateCost(skill)
        )
    };

    Game_BattlerBase.prototype.canSkillHpCost = function(skill) {
        const cost = this.skillHpCost(skill);
        if (skill.meta.HPCostDead) {
            return true;
        } else {
            return this._hp > cost || cost === 0;
        }
    };

    Game_BattlerBase.prototype.canSkillGoldCost = function(skill) {
        return $gameParty.gold() >= this.skillGoldCost(skill);
    };

    Game_BattlerBase.prototype.canSkillExpCost = function(skill) {
        if (this.isActor()) {
            if (skill.meta.SkillLevelExpCost || skill.meta.SkillLavelExpCost) {
                return this.currentExp() - this.skillExpCost(skill) >= this.currentLevelExp();
            } else {
                return this.currentExp() >= this.skillExpCost(skill);
            }
        }
        return true;
    };

    Game_BattlerBase.prototype.canSkillItemCost = function(skill) {
        const items = this.skillItemCost(skill);
        return items.every(cost => {
            const num = this.canSkillItemCostIncludeEquip(cost) ? 1 : 0;
            return $gameParty.numItems(cost.item) + num >= cost.quantity;
        });
    };

    Game_BattlerBase.prototype.canSkillEquipCost = function(skill) {//改良
        return this.skillEquipCost(skill).every(cost => {
            if (!cost.item) return false;
            if ($dataWeapons[cost.item.id] === cost.item) {
                return this.hasWeapon(cost.item);
            } else if ($dataArmors[cost.item.id] === cost.item) {
                return this.hasArmor(cost.item);
            } else {
                return false;
            }
        });
    };

    Game_BattlerBase.prototype.canSkillVarCost = function(skill) {
        const cost = this.skillVarCost(skill);
        return cost ? $gameVariables.value(cost[0]) >= cost[1] : true;
    };

    Game_BattlerBase.prototype.canSkillVarCostR = function(skill) {
        const cost = this.skillVarCostR(skill);
        if (cost) {
            if (cost[1] > 0) {
                return $gameVariables.value(cost[0]) >= Math.floor(cost[1] * cost[2] / 100);
            } else {
                return $gameVariables.value(cost[0]) >= Math.floor($gameVariables.value(cost[0]) * cost[2] / 100);
            }
        }
        return true;
    };

    Game_BattlerBase.prototype.canSkillEvalCost = function(skill) {
        return skill.meta.SkillEvalCost ? NuunSkillCostManager.getEvalParam(this, skill.meta.SkillEvalCost) : true;
    };

    Game_BattlerBase.prototype.canSkillStateCost = function(skill) {
        const stateId = this.skillStateCost(skill);
        return stateId > 0 ? this.isStateAffected(stateId) : true;
    };

    const _Game_BattlerBase_paySkillCost = Game_BattlerBase.prototype.paySkillCost;
    Game_BattlerBase.prototype.paySkillCost = function(skill) {
        this.setBCostParam();
        this.paySkillMpTpCost(skill);
        this.paySkillHpCost(skill);
        this.paySkillGoldCost(skill);
        this.paySkillExpCost(skill);
        this.paySkillItemCost(skill);
        this.paySkillVarCost(skill);
        this.paySkillVarCostR(skill);
        this.paySkillEquipCost(skill);
        this.paySkillEvalCost(skill);
        this.paySkillStateCost(skill);
    };

    Game_BattlerBase.prototype.paySkillMpTpCost = function(skill) {
        const mp = this._mp;
        const tp = this._tp;
        _Game_BattlerBase_paySkillCost.apply(this, arguments)
        if (mp > this._mp && this.isNoConsumptionRate(1)) {
            this._mp = mp;
            this._mp = this._mp.clamp(0, this.mmp);
        }
        if (tp > this._tp && this.isNoConsumptionRate(2)) {
            this._tp = tp;
            this._tp = this._tp.clamp(0, this.maxTp());
        }
    };

    Game_BattlerBase.prototype.paySkillHpCost = function(skill) {
        const cost = this.skillHpCost(skill);
        if (cost > 0 && !this.isNoConsumptionRate(3)) {
            this._hp -= cost;
            this._hp = this._hp.clamp(0, this.mhp);
            if (this.hp === 0) {
                this.addState(this.deathStateId());
            }
        }
        this._payCostKill = this.hp === 0;
    };

    Game_BattlerBase.prototype.paySkillGoldCost = function(skill) {
        const cost = this.skillGoldCost(skill);
        if (cost > 0 && !this.isNoConsumptionRate(4)) {
            $gameParty.loseGold(cost);
        }
    };

    Game_BattlerBase.prototype.paySkillExpCost = function(skill) {
        const cost = this.skillExpCost(skill);
        if (this.isActor() && cost !== 0) {
            this.changeExp(this.currentExp() - cost, this.shouldDisplayLevelUp());
        }
    };

    Game_BattlerBase.prototype.paySkillItemCost = function(skill) {
        const items = this.skillItemCost(skill);
        items.forEach(cost => {
            const itemNum = $gameParty.numItems(cost.item);
            if (itemNum > 0) {
                $gameParty.loseItem(cost.item, cost.quantity, false);
            }
            if (!!cost.mode && (itemNum - cost.quantity < 0)) {
                this.discardEquip(cost.item);
            }
        });
    };

    Game_BattlerBase.prototype.paySkillEquipCost = function(skill) {
        this.skillEquipCost(skill).forEach(cost => {
            if (cost.quantity > 0)  {
                if (!cost.cond || (cost.cond && eval(cost.cond))) {
                    this.discardEquip(cost.item);
                }
            }
        });
    };

    Game_BattlerBase.prototype.paySkillVarCost = function(skill) {
        const cost = this.skillVarCost(skill);
        if (cost) {
            const val = $gameVariables.value(cost[0]) - cost[1];
            $gameVariables.setValue(cost[0], val);
        }
    };

    Game_BattlerBase.prototype.paySkillVarCostR = function(skill) {
        const cost = this.skillVarCostR(skill);
        if (cost) {
            const val = $gameVariables.value(cost[0]) - this.getSkillVarCostR(skill);
            $gameVariables.setValue(cost[0], val);
        }
    };

    Game_BattlerBase.prototype.paySkillEvalCost = function(skill) {
        if (skill.meta.SkillEvalCons) {
            NuunSkillCostManager.getEvalParam(this, skill.meta.SkillEvalCons);
        }
    };

    Game_BattlerBase.prototype.paySkillStateCost = function(skill) {
        const stateId = this.skillStateCost(skill);
        if (stateId > 0) {
            this.removeState(stateId);
        }
    };

    Game_BattlerBase.prototype.getSkillVarCost = function(skill) {
        const cost = this.skillVarCost(skill);
        return cost ? cost[1] : 0;
    };

    Game_BattlerBase.prototype.getSkillVarCostR = function(skill) {
        const cost = this.skillVarCostR(skill);
        if (cost) {
            if (cost[1] > 0) {
                return Math.floor(cost[1] * cost[2] / 100);
            } else {
                return Math.floor($gameVariables.value(cost[0]) * cost[2] / 100);
            }
        }
        return 0;
    };

    Game_BattlerBase.prototype.canSkillItemCostIncludeEquip = function(cost) {
        if (!!cost.mode && cost.item) {
            if ($dataWeapons[cost.item.id] === cost.item) {
                return this.hasWeapon(cost.item);
            } else if ($dataArmors[cost.item.id] === cost.item) {
                return this.hasArmor(cost.item);
            }
        }
        return false;
    };


    Game_BattlerBase.prototype.getTraitNoConsumptionRate = function(id) {
        const tag = "NoConsumptionCost" + id;
        return this.traitObjects().reduce((r, trait) => {
            if (!!trait.meta[tag]) {
                r += Number(NuunSkillCostManager.getMetaCode(trait, String(tag)));
            }
            return r;
        }, 0);
    };

    Game_BattlerBase.prototype.isNoConsumptionRate = function(id) {
        return Math.randomInt(100) < this.getTraitNoConsumptionRate(id);
    };

    Game_BattlerBase.prototype.isPayCostKill = function() {
        return this._payCostKill;
    };

    const _Window_BattleLog_endAction = Window_BattleLog.prototype.endAction;
    Window_BattleLog.prototype.endAction = function(subject) {
        _Window_BattleLog_endAction.apply(this, arguments);
        this.displayPayCostKill(subject);
    };

    Window_BattleLog.prototype.displayPayCostKill = function(subject) {
        if (subject.isPayCostKill() && subject.isEnemy()) {
            this.push("performCollapse", subject);
        }
    };


})();