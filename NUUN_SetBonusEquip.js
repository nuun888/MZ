/*:-----------------------------------------------------------------------------------
 * NUUN_SetBonusEquip.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc 装備セットボーナス
 * @author NUUN
 * @version 1.3.1
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
 * 
 * 表示テキスト及び表示ボーナスパラメータテキストは別途NUUN_SetBonusWindowが必要となります。
 * 表示テキスト例:BONUS(2SET)
 * 表示ボーナスパラメータテキスト例：身代わり30％　※通常能力値は自動で表示されます。
 * 
 * 説明
 * https://github.com/nuun888/MZ/blob/master/README/SetBonusEquip.md
 * 
 * 更新履歴
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
/*~struct~SetBonusList:
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
 * @desc セットボーナスが最大数時の表示するテキスト(別途表示するプラグインが必要です)
 * @type string
 * @default
 * @parent SetBonusDisplaySetting
 * 
 * @param SetBonusParamText
 * @text 全装備時表示ボーナスパラメータテキスト
 * @desc セットボーナスが最大数時の装備時の表示するボーナスパラメータテキスト(別途表示するプラグインが必要です)
 * @type string
 * @default
 * @parent SetBonusDisplaySetting
 * 
 */
/*~struct~NumberEquipment:
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
 * @param SetBonusText
 * @text 表示テキスト
 * @desc 表示するテキスト(別途表示するプラグインが必要です)
 * @type string
 * @default 
 * 
 * @param SetBonusParamText
 * @text 表示ボーナスパラメータテキスト
 * @desc 表示するボーナスパラメータテキスト(別途表示するプラグインが必要です)
 * @type string
 * @default 
 * 
 */
/*~struct~SetBonusEquips:
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
                if (id >= 0 && SetBonusData[id] === setBonus && this.isEquipInSetBonus(SetBonusData[id], equip.id)) {
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

Game_Actor.prototype.getSetBonus = function() {
    const equips = this.equips();
    const setBonusIds = [];
    let setBonusEquipList = [];
    equips.forEach((equip, r) => {
        const list = this.getSetBonusData(equip);
        if (list) {
            list.forEach(data => {
                const id = isNaN(data) ? SetBonusData.findIndex(bonusData => bonusData.SetBonusName === data) : Number(data) - 1;
                if (id >= 0 && this.isEquipInSetBonus(SetBonusData[id], equip.id)) {
                    if (!setBonusIds[id]) {
                        setBonusIds[id] = {sum:id, equipId:[]};
                    }
                    if (!SetBonusData[id].SameItemDuplication || (SetBonusData[id].SameItemDuplication && setBonusIds[id].equipId.indexOf(equip.id) < 0)) {
                        setBonusIds[id].sum++;
                        setBonusIds[id].equipId.push(equip.id);
                    }
                }
            });
        }
    });
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