/*:-----------------------------------------------------------------------------------
 * NUUN_SetBonusEquip.js
 * 
 * Copyright (C) 2026 NUUN
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Equip set bonus
 * @author NUUN
 * @version 2.0.0
 * 
 * @help
 * Activates set bonuses when specific equipment is equipped together.
 * 
 * 【Set bonus settings】
 * Weapon and armor note tags:
 * <SetBonus:[id]...> Specifies the set bonus that the equipment belongs to.
 * [id]: Specify the list ID or identifier from the "Set bonus settings" plugin parameter.
 * To specify multiple set bonuses, separate them with commas (,).
 * Examples:
 * <SetBonus:1>
 * <SetBonus:1,5>
 * <SetBonus:maidSetBonus>
 * 
 * 【Partial set bonuses】
 * A partial set bonus can be applied when the number of equipped items belonging to the set reaches the specified amount.
 * 
 * For example, for a set consisting of 4 pieces of equipment, you can set separate bonuses to apply when 2 or more and 3 or more pieces are equipped.
 * 
 * Set the parameters and traits applied by the set bonus on the weapon or armor used for parameter settings.
 * 
 * 【Set bonus type】
 * If a set bonus type is specified, multiple set bonuses of the same type cannot be applied at the same time, even if their conditions are met.
 * If no set bonus type is specified, the set bonus can be applied together with other set bonuses.
 * If multiple set bonuses of the same set bonus type meet their activation conditions, the set bonus listed higher in the "Set bonus settings" plugin parameter takes priority.
 * 
 * 【Identifier】
 * You can assign an optional identifier to each set bonus.
 * The identifier can be used instead of the list ID in fields that specify a list ID.
 * 
 * 【Set bonus display settings】
 * NUUN_EquipSetBonusTooltipsWindow or NUUN_EquipStatusEX is required to display set bonus text and bonus parameter text.
 * 
 * Display text example: BONUS(2SET)
 * Bonus parameter text example: Substitute 30%
 * Multiple bonus parameter text entries can be specified.
 * 
 * 【Achievement settings】
 * Checks the specified achievement when an equipment set bonus is applied.
 * This feature requires the Achievement System plugin (NUUN_AchievementSystem).
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
 * 9/23/2026 Ver.2.0.0
 * Renewed and updated.
 * 
 * @command IsSetBonus
 * @desc Stores whether the specified set bonus is applied in the specified switch.
 * @text Check set bonus
 * 
 * @arg ActorId
 * @text Actor ID
 * @desc Specifies the target actor.
 * @type actor
 * @default 0
 * 
 * @arg SwitchId
 * @text Result switch
 * @desc Specifies the switch that stores the result.
 * @type switch
 * @default 0
 * 
 * @arg Id
 * @text Set bonus ID
 * @desc Specifies the list ID or identifier of the set bonus to check.
 * @type string
 * @default 0
 * 
 * 
 * @param SetBonus
 * @text Set bonus settings
 * @desc Configures the set bonuses.
 * @type struct<SetBonusList>[]
 * @default []
 * 
 * @param SetBonusIconSize
 * @text Applied icon size
 * @desc Specifies the size of the icon displayed for an applied set bonus.
 * @type number
 * @default 16
 * @min 0
 * 
 * @param SetBonusTotalVariables
 * @text Total applied set bonuses variable
 * @desc Stores the total number of different set bonuses applied so far in the specified variable.
 * @type variable
 * @default 0
 * 
 */
/*~struct~SetBonusList:
 * 
 * @param IdentifierName
 * @text Identifier
 * @desc Sets an optional identifier. The identifier can be used instead of the list ID in fields that specify an ID.
 * @type string
 * @default 
 * 
 * @param SetBonusType
 * @text Set bonus type
 * @desc Sets the set bonus type. Set bonuses of the same type cannot be applied at the same time.
 * @type string
 * @default
 * 
 * @param SetBonusName
 * @text Set bonus name
 * @desc Sets the name of the set bonus.
 * @type string
 * @default
 * 
 * @param ActorId
 * @text Applicable actors
 * @desc Specifies the actors to which the set bonus applies. If not specified, it applies to all actors.
 * @type actor[]
 * @default []
 * 
 * @param SameItemDuplication
 * @text Exclude duplicate equipment
 * @desc Duplicate copies of the same equipment are not counted.
 * @type boolean
 * @default true
 * 
 * @param AllSetBonusSetting
 * @text Full set bonus settings
 * @default ------------------------------
 * 
 * @param SetBonusEquipMaxNum
 * @text Required equipment count
 * @desc Specifies the number of equipment required to apply the full set bonus.
 * @type number
 * @min 2
 * @default 4
 * @parent AllSetBonusSetting
 * 
 * @param SetBonusWeaponData
 * @text Full set bonus weapon
 * @desc Specifies the weapon containing the parameters for the full set bonus.
 * @type weapon
 * @default 0
 * @parent AllSetBonusSetting
 * 
 * @param SetBonusArmorData
 * @text Full set bonus armor
 * @desc Specifies the armor containing the parameters for the full set bonus.
 * @type armor
 * @default 0
 * @parent AllSetBonusSetting
 * 
 * @param SetBonusSetting
 * @text Partial set bonus settings
 * @default ------------------------------
 * 
 * @param SetBonusNumberEquipment
 * @text Partial set bonus settings
 * @desc Sets the partial set bonuses applied when the required equipment count is met.
 * @type struct<NumberEquipment>[]
 * @default []
 * @parent SetBonusSetting
 * 
 * @param SetBonusDisplaySetting
 * @text Set bonus display settings
 * @default ------------------------------
 * 
 * @param SetBonusText
 * @text Full set display text
 * @desc Sets the text displayed when the full set bonus is applied.
 * @type string
 * @default
 * @parent SetBonusDisplaySetting
 * 
 * @param SetBonusParamText
 * @text Full set bonus parameter text
 * @desc Sets the bonus parameter text displayed when the full set bonus is applied. Add an entry for each effect.
 * @type string[]
 * @default
 * @parent SetBonusDisplaySetting
 * 
 * @param AchievementSetting
 * @text Achievement settings(Requires NUUN_AchievementSystem)
 * @default ------------------------------
 * 
 * @param AchievementSetBonus
 * @text Achievement check on application
 * @desc Specifies the list ID or identifier of the achievement to check when the set bonus is applied.
 * @type string
 * @default 
 * @parent AchievementSetting
 * 
 */
/*~struct~NumberEquipment:
 * 
 * @param SetNumberEquip
 * @text Required equipment count
 * @desc Specifies the number of equipment required to apply the partial set bonus.
 * @type number
 * @default 1
 * 
 * @param SetNumberEquipWeaponData
 * @text Parameter weapon
 * @desc Specifies the weapon containing the parameters for the partial set bonus.
 * @type weapon
 * @default 0
 * 
 * @param SetNumberEquipArmorData
 * @text Parameter armor
 * @desc Specifies the armor containing the parameters for the partial set bonus.
 * @type armor
 * @default 0
 * 
 * @param PartialSetBonusDisplaySetting
 * @text Set bonus display settings
 * @default ------------------------------
 * 
 * @param SetBonusText
 * @text Display text
 * @desc Sets the text to display.
 * @type string
 * @default 
 * @parent PartialSetBonusDisplaySetting
 * 
 * @param SetBonusParamText
 * @text Bonus parameter text
 * @desc Bonus parameter text to display. Add an entry for each applied effect.
 * @type string[]
 * @default 
 * @parent PartialSetBonusDisplaySetting
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 装備セットボーナス
 * @author NUUN
 * @version 2.0.0
 * 
 * @help
 * 特定の装備を同時に装備したときに、セットボーナスを発動させます。
 * 
 * 【セットボーナスの設定】
 * 武器、防具のメモ欄
 * <SetBonus:[id]...> 装備が属するセットボーナスを指定します。
 * [id]:プラグインパラメータ「セットボーナス設定」のリストIDまたは識別名を指定します。
 * 複数のセットボーナスを指定する場合は、カンマ（,）で区切って指定してください。
 * 例：
 * <SetBonus:1>
 * <SetBonus:1,5>
 * <SetBonus:maidSetBonus>
 * 
 * 【部分セットボーナス】
 * セットボーナスに該当する装備数が指定した数以上になったときに、部分セットボーナスを適用できます。
 * 
 * 例えば、4つの装備で構成されるセットの場合、2つ以上装備したとき、3つ以上装備したときに適用するセットボーナスをそれぞれ設定できます。
 * 
 * セットボーナスとして適用するパラメータや特徴は、パラメータ設定用の武器または防具に設定してください。
 * 
 * 【セットボーナスタイプ】
 * セットボーナスタイプを設定すると、同じタイプのセットボーナスが複数適用条件を満たしている場合でも、重複して適用されません。
 * セットボーナスタイプが未設定の場合は、他のセットボーナスと重複して適用できます。
 * 同じセットボーナスタイプの適用条件を複数満たしている場合、プラグインパラメータ「セットボーナス設定」の上に設定されているセットボーナスが優先して適用されます。
 * 
 * 【識別名】
 * セットボーナスには任意の識別名を設定できます。
 * 識別名を設定すると、リストIDを指定する項目でリストIDの代わりに識別名を指定できます。
 * 
 * 【セットボーナス表示設定】
 * セットボーナスの表示テキストおよびボーナスパラメータテキストを
 * 表示するには、別途NUUN_EquipSetBonusTooltipsWindowまたはNUUN_EquipStatusEXが必要です。
 * 
 * 表示テキスト例：BONUS(2SET)
 * 表示ボーナスパラメータテキスト例：身代わり30％
 * ボーナスパラメータテキストは複数設定できます。
 * 
 * 【実績設定】
 * 装備セットボーナス適用時に指定の実績IDの実績判定を実行します。
 * この機能を実行するには別途実績システムプラグイン（NUUN_AchievementSystem）が必要です。
 * 
 * 
 * 利用規約
 * クレジット表記：任意
 * 商業利用：可能
 * 成人向け：可能
 * 改変：可能
 * 再配布：可能
 * ※https://github.com/nuun888/MZ、公式フォーラム、正規販売サイト以外からのダウンロード、改変済みの場合はサポートは対象外となります。
 * 
 * 更新履歴
 * 2026/9/23 Ver.2.0.0
 * リニューアル更新
 * 
 * 
 * @command IsSetBonus
 * @desc 指定のセットボーナスが適用済みかを指定のスイッチに代入します。
 * @text セットボーナス適用判定
 * 
 * @arg ActorId
 * @text アクターID
 * @desc 対象のアクターを指定します。
 * @type actor
 * @default 0
 * 
 * @arg SwitchId
 * @text 結果代入スイッチ
 * @desc 判定結果を格納するためのスイッチIDを指定します。
 * @type switch
 * @default 0
 * 
 * @arg Id
 * @text 指定セットボーナスID
 * @desc 適用されているか判定するセットボーナスIDまたは識別名。
 * @type string
 * @default 0
 * 
 * 
 * @param SetBonus
 * @text セットボーナス設定
 * @desc セットボーナスの設定を行います。
 * @type struct<SetBonusList>[]
 * @default []
 * 
 * @param SetBonusIconSize
 * @text 適用中アイコンサイズ
 * @desc セットボーナス適用中の表示アイコンのサイズを指定します。
 * @type number
 * @default 16
 * @min 0
 * 
 * @param SetBonusTotalVariables
 * @text 累計適用セットボーナス数変数
 * @desc 指定した変数に、これまでに適用したセットボーナスの種類数を格納します。
 * @type variable
 * @default 0
 * 
 */
/*~struct~SetBonusList:ja
 * 
 * @param IdentifierName
 * @text 識別名
 * @desc 任意の識別名を設定します。IDを指定する項目で、リストIDの代わりに識別名を指定できます。
 * @type string
 * @default 
 * 
 * @param SetBonusType
 * @text セットボーナスタイプ
 * @desc セットボーナスのタイプを設定します。同じタイプのセットボーナスは重複して適用されません。
 * @type string
 * @default
 * 
 * @param SetBonusName
 * @text セットボーナス名称
 * @desc セットボーナスの名称を設定します。
 * @type string
 * @default
 * 
 * @param ActorId
 * @text 適用アクター
 * @desc 適用するアクターを指定します。未設定の場合は全てのアクターに適用されます。
 * @type actor[]
 * @default []
 * 
 * @param SameItemDuplication
 * @text 同一装備重複適用なし
 * @desc 同じ装備を複数装備している場合、2個目以降をセットボーナスの必要装備数に含めません。
 * @type boolean
 * @default true
 * 
 * @param AllSetBonusSetting
 * @text 全装備時セットボーナス設定
 * @default ------------------------------
 * 
 * @param SetBonusEquipMaxNum
 * @text 最大装備数
 * @desc 全装備時のセットボーナスを適用するために必要な装備数を指定します。
 * @type number
 * @min 2
 * @default 4
 * @parent AllSetBonusSetting
 * 
 * @param SetBonusWeaponData
 * @text 全装備時パラメータ設定用武器ID
 * @desc 全装備時に適用するセットボーナスのパラメータを設定した武器を指定します。
 * @type weapon
 * @default 0
 * @parent AllSetBonusSetting
 * 
 * @param SetBonusArmorData
 * @text 全装備時パラメータ設定用防具ID
 * @desc 全装備時に適用するセットボーナスのパラメータを設定した防具を指定します。
 * @type armor
 * @default 0
 * @parent AllSetBonusSetting
 * 
 * @param SetBonusSetting
 * @text 部分セットボーナス設定
 * @default ------------------------------
 * 
 * @param SetBonusNumberEquipment
 * @text 部分セット装備数設定
 * @desc 必要装備数を満たしたときに適用する部分セットボーナスを設定します。
 * @type struct<NumberEquipment>[]
 * @default []
 * @parent SetBonusSetting
 * 
 * @param SetBonusDisplaySetting
 * @text セットボーナス表示設定
 * @default ------------------------------
 * 
 * @param SetBonusText
 * @text 全装備時表示テキスト
 * @desc セットボーナスが最大数時の表示するテキスト。
 * @type string
 * @default
 * @parent SetBonusDisplaySetting
 * 
 * @param SetBonusParamText
 * @text 全装備時表示ボーナスパラメータテキスト
 * @desc セットボーナスが最大数時の装備時の表示するボーナスパラメータテキスト。適用効果分リストに追加してください。
 * @type string[]
 * @default
 * @parent SetBonusDisplaySetting
 * 
 * @param AchievementSetting
 * @text 実績設定(要NUUN_AchievementSystem)
 * @default ------------------------------
 * 
 * @param AchievementSetBonus
 * @text 適用時実績解除判定
 * @desc セットボーナス適用時に獲得判定を行う実績のリストIDまたは識別名を指定します。
 * @type string
 * @default 
 * @parent AchievementSetting
 * 
 */
/*~struct~NumberEquipment:ja
 * 
 * @param SetNumberEquip
 * @text セット装備数
 * @desc 部分セットボーナスを適用するために必要な装備数を指定します。
 * @type number
 * @default 1
 * 
 * @param SetNumberEquipWeaponData
 * @text パラメータ設定用武器ID
 * @desc 部分セットボーナスとして適用するパラメータを設定した武器を指定します。
 * @type weapon
 * @default 0
 * 
 * @param SetNumberEquipArmorData
 * @text パラメータ設定用防具ID
 * @desc 部分セットボーナスとして適用するパラメータを設定した防具を指定します。
 * @type armor
 * @default 0
 * 
 * @param PartialSetBonusDisplaySetting
 * @text セットボーナス表示設定
 * @default ------------------------------
 * 
 * @param SetBonusText
 * @text 表示テキスト
 * @desc 表示するテキスト。
 * @type string
 * @default 
 * @parent PartialSetBonusDisplaySetting
 * 
 * @param SetBonusParamText
 * @text 表示ボーナスパラメータテキスト
 * @desc 表示するボーナスパラメータテキスト。適用効果分リストに追加してください。
 * @type string[]
 * @default 
 * @parent PartialSetBonusDisplaySetting
 * 
 */

var Imported = Imported || {};
Imported.NUUN_SetBonusEquip = true;
//こちらが最新

(() => {
    class Nuun_PluginParams_EquipSetBonus {
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

    window.Nuun_PluginParams_EquipSetBonus = Nuun_PluginParams_EquipSetBonus;

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

    const params = Nuun_PluginParams_EquipSetBonus.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;

    function NuunEquipSetBonusManager() {
        throw new Error("This is a static class");
    }

    window.NuunEquipSetBonusManager = NuunEquipSetBonusManager;

    NuunEquipSetBonusManager.getEvalCode = function(code) {
        if (isNaN(code)) {
            if (!code) {
                return null;
            }
            return this.stringCode(code);
        } else {
            return String(code);
        }
    };

    NuunEquipSetBonusManager.getMetaCode = function(object, method) {
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

    NuunEquipSetBonusManager.getMetaCodeList = function(object, method) {
        const meta = object.meta[method];
        if (!meta || meta === true) return null;
        if (meta.indexOf('[') >= 0) {
            const log = ($gameSystem.isJapanese() ? "パラメータに[]が含まれています。[]を外して記入して下さい。" : "The parameter contains []. Please remove the [] and enter it.");
            throw ["ParameterError", log];
        }
        return meta.split(',');
    };

    NuunEquipSetBonusManager.getMetaNumberCode = function(index, object, method) {
        let tag = method;
        if (index === 0) {

        } else {
            tag = String(tag + index);
        }
        const meta = object.meta[method];
        if (!meta) return null;
        if (meta.indexOf('[') >= 0) {
            const log = ($gameSystem.isJapanese() ? "パラメータに[]が含まれています。[]を外して記入して下さい。" : "The parameter contains []. Please remove the [] and enter it.");
            throw ["ParameterError", log];
        }
        return meta;
    };

    NuunEquipSetBonusManager.getSetBonusData = function(id) {
        return NuunEquipSetBonusManager.equipSetBonusParams(0)[id- 1];
    };

    NuunEquipSetBonusManager.getSetBonusDataName = function(name) {
        return NuunEquipSetBonusManager.equipSetBonusParams(0).find(data => data.IdentifierName === name);
    };

    NuunEquipSetBonusManager.getSetBonusDataNameIndex = function(name) {
        return NuunEquipSetBonusManager.equipSetBonusParams(0).findIndex(data => data.IdentifierName === name);
    };

    NuunEquipSetBonusManager.getColorCode = function(color) {
        if (typeof(color) === "string" && color.indexOf('#') === 0) {
            return color;
        }
        return ColorManager.textColor(color);
    };

    NuunEquipSetBonusManager.equipSetBonusParams = function(code) {
        switch (code) {
            case 0:
                return params.SetBonus || [];
            case 1:
                return params.SetBonusIconSize || 16;
            case 2:
                return params.SetBonusTotalVariables || 0;
        }
    };

    NuunEquipSetBonusManager.getParamsIndex = function(id) {
        if (isNaN(id)) {
            return this.getSetBonusDataNameIndex(id);
        } else {
            return NuunEquipSetBonusManager.equipSetBonusParams(0)[id - 1] ? (id - 1) : -1;
        }
    };

    NuunEquipSetBonusManager.getParams = function(id) {
        if (isNaN(id)) {
            return this.getSetBonusDataName(id);
        } else {
            return NuunEquipSetBonusManager.equipSetBonusParams(0)[id - 1];
        }
    };

    NuunEquipSetBonusManager.getSetBonusEquip = function(weaponId, armorId) {
        if (weaponId > 0) {
            return $dataWeapons[weaponId];
        } else if (armorId > 0) {
            return $dataArmors[armorId];
        } else {
            return null;
        }
    };

    NuunEquipSetBonusManager.getSetBonusEquipMaxNum = function(data) {
        return data.SetBonusEquipMaxNum || 2;//旧版ではないため
    };


    PluginManager.registerCommand(pluginName, 'IsSetBonus', args => {
        if (Number(args.SwitchId) === 0) return;
        const actor = $gameActors.actor(Number(args.ActorId));
        const data = NuunEquipSetBonusManager.getParams(args.Id);
        if (!actor || !data) return;
        let result = false;
        if (actor && data) {
            result = actor.isSetBonus(data);
        }
        $gameSwitches.setValue(Number(args.SwitchId), result);
    });


    class SetBonusData {
        constructor(data, index) {
            this._equips = [];
            this._data = data;
            this._id = index;
        }

        pushEquip(id) {
            this._equips.push(id);
        }

        getData() {
            return this._data;
        }

        getId() {
            return this._id;
        }

        getEquipsNum() {
            return this._equips.length;
        }

        includes(equipId) {
            return this._equips.includes(equipId);
        }

        isSetBonusItem(item) {
            return this._equips.some(id => {
                if ($dataWeapons[item.id] === item) {
                    return (id > 0 ? id : 0) === item.id;
                } else if ($dataArmors[item.id] === item) {
                    return (id > 0 ? 0 : Math.abs(id)) === item.id;
                }
            })
        }

        getSetBonusIconIndex() {
            let iconIndex = 0;
            for (const e of (this._data.SetBonusNumberEquipment || [])) {
                if (e.SetNumberEquip <= this.getEquipsNum()) {
                    const id = e.SetNumberEquipWeaponData > 0 ? e.SetNumberEquipWeaponData : e.SetNumberEquipArmorData * -1;
                    const object = id > 0 ? $dataWeapons[id] : $dataArmors[Math.abs(id)];
                    if (!!object) {
                        iconIndex = object.iconIndex;
                    }
                }
            }
            if (NuunEquipSetBonusManager.getSetBonusEquipMaxNum(this._data) <= this.getEquipsNum()) {
                const id = this.getEquipId();
                const object = id > 0 ? $dataWeapons[id] : $dataArmors[Math.abs(id)];
                if (!!object) {
                    iconIndex = object.iconIndex;
                }
            }
            return iconIndex;
        }

        getEquipId() {
            return this._data.SetBonusWeaponData > 0 ? this._data.SetBonusWeaponData : this._data.SetBonusArmorData * -1;
        }

    };


    const _Game_Actor_paramPlus = Game_Actor.prototype.paramPlus;
    Game_Actor.prototype.paramPlus = function(paramId) {
        return _Game_Actor_paramPlus.apply(this, arguments) + this.setBonusParam(paramId);
    };

    const _Game_Actor_traitObjects = Game_Actor.prototype.traitObjects;
    Game_Actor.prototype.traitObjects = function() {
        let objects = _Game_Actor_traitObjects.apply(this, arguments);
        Array.prototype.push.apply(objects, this.setBonusObject());
        return objects;
    };

    Game_Actor.prototype.setBonusObject = function() {
        const list = this._setBonus || [];
        return list.map(e => e > 0 ? $dataWeapons[e] : $dataArmors[Math.abs(e)]).filter(object => !!object);
    };

    Game_Actor.prototype.setBonusParam = function(paramId) {
        const list = this._setBonus || [];
        return list.reduce((r, e) => {
            const object = e > 0 ? $dataWeapons[e] : $dataArmors[Math.abs(e)];
            if (!!object) {
                return r + object.params[paramId];
            }
            return r;
        }, 0);
    };

    const _Game_Actor_releaseUnequippableItems = Game_Actor.prototype.releaseUnequippableItems;
    Game_Actor.prototype.releaseUnequippableItems = function(forcing) {
        _Game_Actor_releaseUnequippableItems.apply(this, arguments);
        if (!forcing) {
            this.setSetBonusList();
        }
    };

    Game_Battler.prototype.setSetBonusList = function() {
        this._setBonus = this.getAppliedSetBonusList();
    };

    Game_Battler.prototype.getAppliedSetBonusList = function(isData) {
        const list = this.getSetBonusList();
        const setBonusIds = [];
        const appliedSetBonus = [];
        for (const setBonus of list) {
            const data = !!setBonus ? setBonus.getData() : null;
            if (!data) continue;
            if (!!data.SetBonusType && appliedSetBonus.some(setBonus => setBonus.SetBonusType === data.SetBonusType)) continue;
            for (const e of (data.SetBonusNumberEquipment || [])) {//部分セットボーナスの適用
                if (e.SetNumberEquip <= setBonus.getEquipsNum()) {
                    const id = e.SetNumberEquipWeaponData > 0 ? e.SetNumberEquipWeaponData : e.SetNumberEquipArmorData * -1;
                    Array.prototype.push.apply(setBonusIds, [id]);
                    if (!appliedSetBonus.includes(data)) {
                        appliedSetBonus.push(data);
                    }
                }
            }
            if (NuunEquipSetBonusManager.getSetBonusEquipMaxNum(data) <= setBonus.getEquipsNum()) {
                const id = data.SetBonusWeaponData > 0 ? data.SetBonusWeaponData : data.SetBonusArmorData * -1;
                Array.prototype.push.apply(setBonusIds, [id]);
                if (!appliedSetBonus.includes(data)) {
                    appliedSetBonus.push(data);
                }
                if (Imported.NUUN_AchievementSystem && !!data.AchievementSetBonus) {
                    NuunAchievementSystemManager.achievementUnlockId(data.AchievementSetBonus);
                }
                $gameParty.setAppliedSetBonus(data.IdentifierName);
            }
        }
        return isData ? appliedSetBonus : setBonusIds;//-は防具
    };

    Game_Actor.prototype.getSetBonusList = function() {//適用するセットボーナスの更新
        const setBonusDatas = [];
        const equips = this.equips();
        equips.forEach(equip => {
            if (!equip || !equip.meta.SetBonus) return;
            const list = NuunEquipSetBonusManager.getMetaCodeList(equip, "SetBonus");
            if (!list || list.length === 0) return;
            for (const id of list) {
                const index = NuunEquipSetBonusManager.getParamsIndex(id);
                if (index >= 0) {
                    const data = NuunEquipSetBonusManager.equipSetBonusParams(0)[index];
                    const equipId = equip.id * (DataManager.isWeapon(equip) ? 1 : -1);//防具なら-
                    if (!!data && this.isSetBonusActor(data) && (!data.SameItemDuplication || !setBonusDatas[index] || !setBonusDatas[index].includes(equipId))) {
                        if (!setBonusDatas[index]) {
                            setBonusDatas[index] = new SetBonusData(data, index);
                        }
                        setBonusDatas[index].pushEquip(equipId);
                    }
                }
            }
        });
        return setBonusDatas;
    };

    Game_Actor.prototype.isSetBonus = function(data) {
        return this.getAppliedSetBonusList(true).includes(data);
    };

    Game_Actor.prototype.getSetBonus = function() {
        return (this._setBonus || []);//セットボーナスの適用武器、防具のリストを取得
    };

    Game_Actor.prototype.isSetBonusWeaponImg = function(id) {
        return this.getSetBonus().some(e => e === id);
    };

    Game_Actor.prototype.isSetBonusArmorImg = function(id) {
        return this.getSetBonus().some(e => Math.abs(e) === id);
    };

    Game_Actor.prototype.isSetBonusActor = function(data) {
        return !data.ActorId || data.ActorId.length === 0 || data.ActorId.some(id => id === this.actorId());
    };


    const _Game_Party_initialize = Game_Party.prototype.initialize;
    Game_Party.prototype.initialize = function() {
        _Game_Party_initialize.apply(this, arguments);
        this._appliedSetBonus = {};
    };

    Game_Party.prototype.setAppliedSetBonus = function(id) {
        if (!id) return;
        if (!this._appliedSetBonus) {
            this._appliedSetBonus = {};
        }
        if (!this._appliedSetBonus[id]) {
            this._appliedSetBonus[id] = true;
            if (NuunEquipSetBonusManager.equipSetBonusParams(2) > 0) {
                $gameVariables.setValue(NuunEquipSetBonusManager.equipSetBonusParams(2), this.getAppliedSetBonus());
            }
        }
    };

    Game_Party.prototype.getAppliedSetBonus = function() {
        if (!this._appliedSetBonus) return 0;
        return Object.values(this._appliedSetBonus).filter(d => !!d).length;
    };


    if (Window_EquipSlot.prototype.refresh == Window_StatusBase.prototype.refresh) {
        Window_EquipSlot.prototype.refresh = function() {
            return Window_StatusBase.prototype.refresh.apply(this, arguments);
        };
    }

    const _Window_EquipSlot_refresh = Window_EquipSlot.prototype.refresh;
    Window_EquipSlot.prototype.refresh = function() {
        this._setBonus = null;//セットボーナスのリスト
        this._setBonusEquip = {};
        if (this._actor) {
            this._setBonus = this._actor.getSetBonusList();
        }
        _Window_EquipSlot_refresh.apply(this, arguments);
    };

    const _Window_EquipSlot_drawItem = Window_EquipSlot.prototype.drawItem;
    Window_EquipSlot.prototype.drawItem = function(index) {
        _Window_EquipSlot_drawItem.apply(this, arguments);
        if (this._actor) {
            this.drawSetBonusIcon(index);
        }
    };

    Window_EquipSlot.prototype.drawSetBonusIcon = function(index) {
        const item = this.itemAt(index);
        if (!this._setBonus || !item) return;
        const rect = this.itemLineRect(index);
        const x = rect.x + this.slotNameWidth() - 32;
        const y = rect.y;
        const tag = String(index);
        if (!this._setBonusEquip[tag]) {
            this._setBonusEquip[tag] = 0;
        }
        this._setBonus.filter(setBonus => !!setBonus).forEach((setBonus, index) => {
            const data = !!setBonus ? setBonus.getData() : null;
            if (!data) return;
            if (setBonus.isSetBonusItem(item)) {
                const iconIndex = setBonus.getSetBonusIconIndex();
                if (iconIndex > 0) {
                    const bitmap = ImageManager.loadSystem("IconSet");
                    const pw = ImageManager.iconWidth;
                    const ph = ImageManager.iconHeight;
                    const sx = (iconIndex % 16) * pw;
                    const sy = Math.floor(iconIndex / 16) * ph;
                    const w = NuunEquipSetBonusManager.equipSetBonusParams(1) || pw;
                    const h = NuunEquipSetBonusManager.equipSetBonusParams(1) || ph;
                    this.contents.blt(bitmap, sx, sy, pw, ph, x + (this._setBonusEquip[tag] * w), y, w, h);
                    this._setBonusEquip[tag]++;
                }
            }
        });
    };

    Window_EquipStatus.prototype.drawSetBonus_r = function(data, actor, x, y, width) {
        const lineHeight = this.getSetBonusLineHeight();
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        this.changeTextColor(NuunEquipSetBonusManager.getColorCode(data.NameColor));
        const name = data.ParamName ? data.ParamName : null;
        if (name) {
            this.drawText(name, x, y, data.SystemItemWidth);
            y += lineHeight;
        }
        const textList = this.getSetBonusList_r(actor, data, width);
        const tempList = this._tempActor ? this.getSetBonusList_r(this._tempActor, data, width) : [];
        this.drawTextList(textList, tempList, x, y, width, lineHeight);
    };

    Window_EquipStatus.prototype.getSetBonusList_r = function(actor, data, width) {
        const textList = [];
        const list = actor.getSetBonusList();
        let tag = null;
        for (const setBonus of list) {
            const d = !!setBonus ? setBonus.getData() : null;
            if (!d) continue;
            tag = d.SetBonusName +"_"+ setBonus.getId();
            if (setBonus.getEquipsNum() >= 2) {
                textList.push({text:d.SetBonusName, color:NuunEquipSetBonusManager.getColorCode(data.NameColor), row:1, mode:"headline", tag: tag});
                textList.push({text:"this.horzLine", row:1, tag: tag +"_Line"});
            }
            for (const e of d.SetBonusNumberEquipment || []) {
                if (NuunEquipSetBonusManager.getSetBonusEquipMaxNum(d) > 1 && e.SetNumberEquip <= setBonus.getEquipsNum()) {
                    const equip = NuunEquipSetBonusManager.getSetBonusEquip(e.SetNumberEquipWeaponData, e.SetNumberEquipArmorData);
                    this.drawSetBonusEquipment(textList, equip, tag, data, e, width);
                }
            }
            if (NuunEquipSetBonusManager.getSetBonusEquipMaxNum(d) > 1 && NuunEquipSetBonusManager.getSetBonusEquipMaxNum(d) === setBonus.getEquipsNum()) {
                const equip = NuunEquipSetBonusManager.getSetBonusEquip(d.SetBonusWeaponData, d.SetBonusArmorData);
                this.drawSetBonusEquipment(textList, equip, tag, data, d, width);
            }
        }
        return textList;
    };

    Window_EquipStatus.prototype.drawSetBonusEquipment = function(textList, equip, tag, data, numberEquip, width) {
        if (equip) {
            let text = '';
            let textWidth = 0;
            if (numberEquip.SetBonusText) {
                textList.push({text:numberEquip.SetBonusText, color:NuunEquipSetBonusManager.getColorCode(data.NameColor), row:0, mode:"headline", tag: tag + numberEquip.SetBonusText});
                textWidth = this.textWidth(numberEquip.SetBonusText) + this.itemPadding();
            }
            const setBonusParamText = numberEquip.SetBonusParamText || [];
            for (const textData of setBonusParamText) {
                const statusWidth = this.textWidth(textData) + textWidth;
                if (statusWidth > width && !!text) {
                    textList.push({text: text, row: 1, width: textWidth, tag: tag + text});
                    text = '';
                    textWidth = 0;
                }
                if (!!textData) {
                    text += text ? ','+ textData : textData;
                }
            }
            if (!!text) {
                textList.push({text: text, row: 1, width: textWidth, tag: tag + text});
            }
        }
    };

            
})();