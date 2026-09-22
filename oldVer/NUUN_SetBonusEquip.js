/*:-----------------------------------------------------------------------------------
 * NUUN_SetBonusEquip.js
 * 
 * Copyright (C) 2022 NUUN
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Equip set bonus
 * @author NUUN
 * @version 1.3.5
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * Activates a set bonus when equipped with specific equipment.
 * 
 * The set bonus parameter to apply creates the data for the set bonus in the weapon or armor in the database.
 * If you set both weapons and armor, the data set for the weapon will take precedence. Armor is applied if the weapon ID is 0.
 * 
 * Set the set bonus in the set bonus setting in the plugin parameters.
 * Set the equipment to be applied in the set bonus equipment setting
 * Specify the equipment to which this ID's bonus applies in the set bonus equipment settings. 
 * In this case, it will be applied if the specified equipment is equipped and the conditions are met.
 * Please fill in the "SetBonus" tag in all memo fields of the specified equipment items.
 * 
 * Set bonus equipment setting is blank.
 * Applies if equipment with the "SetBonus" tag is equipped and the conditions are met.
 * 
 * Weapon and armor notes
 * <SetBonus:[id], [id]...> Apply set bonuses.
 * [id]:Set bonus setting list number or set bonus name.
 * The set bonus will be applied if the set bonus with the same ID is equipped for the number of bonus applications.
 * Multiple set bonuses can be specified for one piece of equipment.
 * 
 * Partial set bonus
 * You can set the set bonus to apply if the number of sets of the corresponding equipment meets the conditions.
 * If you have 4 pieces of equipment that require set bonuses, you can set the bonuses to apply to 2 or more of them, and 3 or more of them.
 * Weapons and armor for parameters to apply are specified separately.
 * 
 * Set bonus display settings
 * Display text and display bonus parameter text require "NUUN_SetBonusWindow" and "NUUN_EquipStatusEX" separately.
 * Display text example:BONUS(2SET)
 * Display bonus parameter text example: scapegoat 30%. You can set more than one in the list.
 * 
 * Explanation
 * https://github.com/nuun888/MZ/blob/master/README/SetBonusEquip.md
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
 * 3/18/2023 Ver.1.3.5
 * Fixed not to process when invalid ID is specified.
 * 11/17/2022 Ver.1.3.4
 * Changed the specification of the display parameter text of the set bonus. (Reset required)
 * 11/15/2022 Ver.1.3.3
 * Fixed an issue where non-overlapping equipment referenced weapons and armor without distinguishing between them.
 * 11/14/2022 Ver.1.3.2
 * Fixed an issue where partial set bonuses were not applying properly.
 * Changed the display in languages other than Japanese to English.
 * 10/8/2022 Ver.1.3.1
 * Fixed the set bonus setting so that it can only be set from the memo tag of weapons and armor.
 * 9/23/2022 Ver.1.3.0
 * Added a function to determine whether the specified set bonus has been applied.
 * 7/7/2022 Ver.1.2.0
 * Processing for tool tip window display, plug-in parameter added.
 * 2/4/2022 Ver.1.1.2
 * Correction of processing.
 * 1/28/2022 Ver.1.1.1
 * Changed the parameter that sets the set bonus so that it can be applied not only from weapons but also from armor.
 * Fixed incorrect parameter names in additional bonus weapon settings.
 * 1/27/2022 Ver.1.1.0
 * Added a function that activates with a certain number of equipment.
 * 1/22/2022 Ver.1.0.0
 * first edition.
 * 
 * @param SetBonus
 * @text set bonus settings
 * @desc Set the set bonus.
 * @type struct<SetBonusList>[]
 * @default []
 * 
 * 
 * @command IsSetBonus
 * @desc Assigns whether the specified set bonus has been applied to the specified switch.
 * @text Set bonus application judgment
 * 
 * @arg ActorId
 * @text Actor ID
 * @desc Specifies the target actor.
 * @type actor
 * @default 0
 * 
 * @arg SwitchId
 * @text Result assignment switch
 * @desc Specifies the switch ID for storing judgment results.
 * @type switch
 * @default 0
 * 
 * @arg Id
 * @text Specified set bonus ID
 * @desc Set bonus ID to determine whether it is applied.
 * @type number
 * @default 0
 * 
 * @arg Name
 * @text Specified set bonus name
 * @desc Set bonus name to determine if it is applied. This will take precedence if it is entered.
 * @type string
 * @default 
 * 
 */
/*~struct~SetBonusList:
 * 
 * @param SetBonusName
 * @text Set bonus name
 * @desc Name of set bonus.
 * @type string
 * @default
 * 
 * @param SameItemDuplication
 * @desc Disables duplicate application of the same equipment.
 * @text No duplication of the same equipment
 * @type boolean
 * @default true
 * 
 * @param SetBonusEquip
 * @text Set bonus equipment settings
 * @desc Specifies the equipment for the set bonus.
 * @type struct<SetBonusEquips>[]
 * @default []
 * 
 * @param AllSetBonusSetting
 * @text Set bonus setting for all equipment
 * @default ------------------------------
 * 
 * @param SetBonusWeaponData
 * @text Weapon ID for parameter setting when all equipped
 * @desc Weapon ID to set parameters for set bonus when set bonus is max number
 * @type weapon
 * @default 0
 * @parent AllSetBonusSetting
 * 
 * @param SetBonusArmorData
 * @text Armor ID for parameter setting when all equipped
 * @desc The armor ID that sets the parameters for the set bonus when the set bonus is max.
 * @type armor
 * @default 0
 * @parent AllSetBonusSetting
 * 
 * @param SetBonusSetting
 * @text Partial set bonus settings
 * @default ------------------------------
 * 
 * @param SetBonusNumberEquipment
 * @text Setting the number of partial sets equipped
 * @desc Set partial set equipment.
 * @type struct<NumberEquipment>[]
 * @default []
 * @parent SetBonusSetting
 * 
 * @param SetBonusDisplaySetting
 * @text Set bonus display settings
 * @default ------------------------------
 * 
 * @param SetBonusText
 * @text Display text when fully equipped
 * @desc The text to display when the set bonus is at its maximum. 
 * @type string
 * @default
 * @parent SetBonusDisplaySetting
 * 
 * @param SetBonusParamText
 * @text Bonus parameter text displayed when fully equipped
 * @desc Bonus parameter text to display when equipped when set bonus is max. Please add it to the applicable effect list.
 * @type string
 * @default []
 * @parent SetBonusDisplaySetting
 * 
 */
/*~struct~NumberEquipment:
 * 
 * @param SetNumberEquip
 * @text Set Count
 * @desc The number of equipment in the set.
 * @type number
 * @default 1
 * 
 * @param SetNumberEquipWeaponData
 * @text Weapon ID for setting parameters
 * @desc Weapon ID that sets the parameters of the set bonus to apply.
 * @type weapon
 * @default 0
 * 
 * @param SetNumberEquipArmorData
 * @text Armor ID for setting parameters
 * @desc An armor ID that sets parameters for the set bonus to apply.
 * @type armor
 * @default 0
 * 
 * @param PartialSetBonusDisplaySetting
 * @text Set bonus display settings
 * @default ------------------------------
 * 
 * @param SetBonusText
 * @text Display text
 * @desc Text to display.
 * @type string
 * @default 
 * @parent PartialSetBonusDisplaySetting
 * 
 * @param SetBonusParamText
 * @text Display bonus parameter text
 * @desc Bonus parameter text to display. Please add it to the applicable effect list.
 * @type string []
 * @default 
 * @parent PartialSetBonusDisplaySetting
 * 
 */
/*~struct~SetBonusEquips:
 * 
 * @param SetBonusWeapon
 * @text Weapon
 * @desc Weapon.
 * @type weapon
 * @default 0
 * 
 * @param SetBonusArmor
 * @text Armor
 * @desc Armor.
 * @type armor
 * @default 0
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 装備セットボーナス
 * @author NUUN
 * @version 1.3.5
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * 特定の装備と同時に装備したときにセットボーナスを発動させます。
 * 
 * 適用するセットボーナスのパラメータはデータベースの武器または防具でセットボーナス用のデータを作成します。
 * 武器、防具両方で設定した場合は、武器で設定したデータが優先されます。武器IDが0の場合は防具が適用されます。
 * 
 * プラグインパラメータのセットボーナス設定でセットボーナスを設定します。
 * セットボーナス装備設定で適用させる装備を設定
 * セットボーナス装備設定でこのIDのボーナスを適用する装備を指定します。この場合、指定した装備が装備され、条件を満たしていれば適用になります。
 * 指定した装備アイテムのメモ欄全てにSetBonusのタグを記入してください。
 * 
 * セットボーナス装備設定が空白
 * SetBonusタグがある装備が装備されており、条件を満たしていれば適用されます。
 * 
 * 武器、防具のメモ欄
 * <SetBonus:[id], [id]...> セットボーナスを適用します。
 * [id]:セットボーナス設定のリスト番号またはセットボーナス名称
 * 同一IDのセットボーナスがボーナス適用数分装備していればセットボーナスが適用されます。
 * 一つの装備に複数のセットボーナスを指定できます。
 * 
 * 部分セットボーナス
 * 該当する装備のセット数が条件を満たしていれば適用するセットボーナスを設定できます。
 * セットボーナスが必要な装備が４つなら、そのうち2つ以上、3つ以上なら適用するボーナスをそれぞれ設定できます。
 * 適用するパラメータ用の武器、防具は別々に指定します。
 * 
 * セットボーナス表示設定
 * 表示テキスト及び表示ボーナスパラメータテキストは別途NUUN_SetBonusWindow及びNUUN_EquipStatusEXが必要となります。
 * 表示テキスト例:BONUS(2SET)
 * 表示ボーナスパラメータテキスト例：身代わり30％。リストに複数設定できます。
 * 
 * 説明
 * https://github.com/nuun888/MZ/blob/master/README/SetBonusEquip.md
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
 * 2023/3/18 Ver.1.3.5
 * 無効なIDを指定したときに処理しないように修正。
 * 2022/11/17 Ver.1.3.4
 * セットボーナスの表示パラメータテキストの仕様を変更。(要再設定)
 * 日本語以外での表示を英語表示に変更。
 * 2022/11/15 Ver.1.3.3
 * 重複しない装備が武器、防具を区別せずに参照していた問題を修正。
 * 2022/11/14 Ver.1.3.2
 * 部分セットボーナスが正常に適用されていなかった問題を修正。
 * 日本語以外での表示を英語表示に変更。
 * 2022/10/8 Ver.1.3.1
 * セットボーナスの設定を武器、防具のメモタグからのみ設定できるように修正。
 * 2022/9/23 Ver.1.3.0
 * 指定のセットボーナスが適用済みか判定する機能を追加。
 * 2022/7/7 Ver.1.2.0
 * ツールチップウィンドウ表示のための処理、プラグインパラメータ追加。
 * 2022/2/4 Ver.1.1.2
 * 処理の修正。
 * 2022/1/28 Ver.1.1.1
 * セットボーナスを設定するパラメータを武器以外に防具からでも適用できるように変更。
 * 追加ボーナスの武器設定のパラメータ名が不自然だったのを修正。(要再設定)
 * 2022/1/27 Ver.1.1.0
 * 一定装備数によって発動する機能を追加。
 * 2022/1/22 Ver.1.0.0
 * 初版
 * 
 * @param SetBonus
 * @text セットボーナス設定
 * @desc セットボーナスの設定を行います。
 * @type struct<SetBonusList>[]
 * @default []
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
 * @desc 適用されているか判定するセットボーナスID。
 * @type number
 * @default 0
 * 
 * @arg Name
 * @text 指定セットボーナス名
 * @desc 適用されているか判定するセットボーナス名。記入されている場合はこちらが優先されます。
 * @type string
 * @default 
 * 
 */
/*~struct~SetBonusList:ja
 * 
 * @param SetBonusName
 * @text セットボーナス名称
 * @desc セットボーナスの名称。
 * @type string
 * @default
 * 
 * @param SameItemDuplication
 * @desc 同一装備の重複適用を無効にします。
 * @text 同一装備重複適用なし
 * @type boolean
 * @default true
 * 
 * @param SetBonusEquip
 * @text セットボーナス装備設定
 * @desc セットボーナス対象の装備を指定します。
 * @type struct<SetBonusEquips>[]
 * @default []
 * 
 * @param AllSetBonusSetting
 * @text 全装備時セットボーナス設定
 * @default ------------------------------
 * 
 * @param SetBonusWeaponData
 * @text 全装備時パラメータ設定用武器ID
 * @desc セットボーナスが最大数時のセットボーナスのパラメータを設定する武器ID
 * @type weapon
 * @default 0
 * @parent AllSetBonusSetting
 * 
 * @param SetBonusArmorData
 * @text 全装備時パラメータ設定用防具ID
 * @desc セットボーナスが最大数時のセットボーナスのパラメータを設定する防具ID
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
 * @desc 部分セット装備を設定します。
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
 */
/*~struct~NumberEquipment:ja
 * 
 * @param SetNumberEquip
 * @text セット数
 * @desc セットの装備数
 * @type number
 * @default 1
 * 
 * @param SetNumberEquipWeaponData
 * @text パラメータ設定用武器ID
 * @desc 適用するセットボーナスのパラメータを設定する武器ID
 * @type weapon
 * @default 0
 * 
 * @param SetNumberEquipArmorData
 * @text パラメータ設定用防具ID
 * @desc 適用するセットボーナスのパラメータを設定する防具ID
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
/*~struct~SetBonusEquips:ja
 * 
 * @param SetBonusWeapon
 * @text 武器
 * @desc 武器
 * @type weapon
 * @default 0
 * 
 * @param SetBonusArmor
 * @text 防具
 * @desc 防具
 * @type armor
 * @default 0
 * 
 */
var Imported = Imported || {};
Imported.NUUN_SetBonusEquip = true;

(() => {
const parameters = PluginManager.parameters('NUUN_SetBonusEquip');
const SetBonusData = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['SetBonus'])) : null) || [];

const pluginName = "NUUN_SetBonusEquip";

PluginManager.registerCommand(pluginName, 'IsSetBonus', args => {
    const actor = $gameActors.actor(Number(args.ActorId));
    const data = !!args.Name ? NuunManager.getSetBonusDataName(args.Name) : NuunManager.getSetBonusData(Number(args.Id));
    let result = false;
    if (actor && data) {
        result = actor.isSetBonus(data);
    }
    $gameSwitches.setValue(Number(args.SwitchId), result);
});

NuunManager.getSetBonusParams = function() {
    return parameters;
};

NuunManager.getSetBonusData = function(id) {
    return SetBonusData[id- 1];
};

NuunManager.getSetBonusDataName = function(name) {
    return SetBonusData.find(data => data.SetBonusName === name);
};

Game_Actor.prototype.isSetBonus = function(data) {
    const sum = this.getTotalSetBonus(data);
    if (data.SetBonusEquip && data.SetBonusEquip.length > 1 && data.SetBonusEquip.length === sum) {
        return  true;
    } else if (sum > 1) {
        return data.SetBonusNumberEquipment.some(list => {
            return sum >= list.SetNumberEquip;
        });
    }
};

Game_Actor.prototype.getTotalSetBonus = function(setBonus) {
    const setBonusIds = [];
    const equips = this.equips();
    return equips.reduce((r, equip) => {
        const list = this.getSetBonusData(equip);
        if (list) {
            const result = list.some(data => {
                const id = isNaN(data) ? SetBonusData.findIndex(bonusData => bonusData.SetBonusName === data) : Number(data) - 1;
                if (!!SetBonusData[id] && SetBonusData[id] === setBonus && this.isEquipInSetBonus(SetBonusData[id], equip.id)) {
                    if (!setBonusIds[id]) {
                        setBonusIds[id] = [];
                    }
                    if (!SetBonusData[id].SameItemDuplication || (SetBonusData[id].SameItemDuplication && setBonusIds[id].indexOf(equip.id) < 0)) {
                        setBonusIds[id].push(equip.id);
                    }
                    return true;
                }
                return false;
            });
            return result ? r + 1 : r;
        }
        return r;
    }, 0);
};

Game_Actor.prototype.getSetBonusIds = function() {
    const equips = this.equips();
    const setBonusIds = [];
    equips.forEach((equip, r) => {
        const list = this.getSetBonusData(equip);
        if (list) {
            list.forEach(data => {
                const id = isNaN(data) ? SetBonusData.findIndex(bonusData => bonusData.SetBonusName === data) : Number(data) - 1;
                if (!!SetBonusData[id] && this.isEquipInSetBonus(SetBonusData[id], equip.id)) {
                    if (!setBonusIds[id]) {
                        setBonusIds[id] = {id: id + 1, sum:0, wequipId:[], aequipId:[]};
                    }
                    if (DataManager.isWeapon(equip)) {
                        if (!SetBonusData[id].SameItemDuplication || (SetBonusData[id].SameItemDuplication && setBonusIds[id].wequipId.indexOf(equip.id) < 0)) {
                            setBonusIds[id].sum++;
                            setBonusIds[id].wequipId.push(equip.id);
                        }
                    } else if (DataManager.isArmor(equip)) {
                        if (!SetBonusData[id].SameItemDuplication || (SetBonusData[id].SameItemDuplication && setBonusIds[id].aequipId.indexOf(equip.id) < 0)) {
                            setBonusIds[id].sum++;
                            setBonusIds[id].aequipId.push(equip.id);
                        }
                    }
                }
            });
        }
    });
    return setBonusIds;
};

Game_Actor.prototype.getSetBonus = function() {
    let setBonusEquipList = [];
    const setBonusIds = this.getSetBonusIds();
    setBonusIds.forEach((bonus, i) => {
        if (!!bonus) {
            if (bonus.sum > 1) {
                const data = SetBonusData[i];
                if (data.SetBonusEquip && data.SetBonusEquip.length > 1 && data.SetBonusEquip.length <= bonus.sum) {
                    Array.prototype.push.apply(setBonusEquipList, [this.getEquipSetBonus(data)]);
                }
                data.SetBonusNumberEquipment.forEach((list, r) => {
                    if (data.SetBonusEquip && data.SetBonusEquip.length > 1 && list.SetNumberEquip <= bonus.sum) {
                        Array.prototype.push.apply(setBonusEquipList, [this.getEquipAddSetBonus(list)]);
                    } else if (!(data.SetBonusEquip && data.SetBonusEquip.length > 1) && list.SetNumberEquip <= bonus.sum) {
                        Array.prototype.push.apply(setBonusEquipList, [this.getEquipAddSetBonus(list)]);
                    }
                });
            }
        }
    });
    return setBonusEquipList;
};

Game_Actor.prototype.isEquipInSetBonus = function(setBonus, id) {
    return setBonus.SetBonusEquip && setBonus.SetBonusEquip.length > 1 ? setBonus.SetBonusEquip.some(data => data.SetBonusWeapon === id || data.SetBonusArmor === id) : true;
};

Game_Actor.prototype.getEquipSetBonus = function(data) {
    return data.SetBonusWeaponData > 0 ? $dataWeapons[data.SetBonusWeaponData] : $dataArmors[data.SetBonusArmorData];
};

Game_Actor.prototype.getEquipAddSetBonus = function(data) {
    return data.SetNumberEquipWeaponData > 0 ? $dataWeapons[data.SetNumberEquipWeaponData] : $dataArmors[data.SetNumberEquipArmorData];
};

Game_Actor.prototype.getSetBonusData = function(equip) {
    return equip && equip.meta.SetBonus ? equip.meta.SetBonus.split(',') : null;
};

const _Game_Actor_paramPlus = Game_Actor.prototype.paramPlus;
Game_Actor.prototype.paramPlus = function(paramId) {
    let value = _Game_Actor_paramPlus.call(this, paramId);
    return value + this.getSetBonus().reduce((r, setBonusEquip) => r + setBonusEquip.params[paramId], 0);
};

const _Game_Actor_traitObjects = Game_Actor.prototype.traitObjects;
Game_Actor.prototype.traitObjects = function() {
  let objects = _Game_Actor_traitObjects.call(this);
  Array.prototype.push.apply(objects, this.setBonusObject());
  return objects;
};

Game_Actor.prototype.setBonusObject = function() {
    return this.getSetBonus();
};

})();