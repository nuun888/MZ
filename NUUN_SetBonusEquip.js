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
 * @version 1.1.2
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * 特定の装備と同時に装備したときにセットボーナスを発動させます。
 * 該当する全ての装備または一定装備数を装備している時に効果が適用されます。
 * 
 * 適用するセットボーナスのパラメータはデータベースの武器または防具でセットボーナス用のデータを作成します。
 * 武器で設定したデータが優先されます。武器IDが0の場合は防具が適用されます。
 * 
 * 武器、防具のメモ欄
 * <SetBonus:[id], [id]...> セットボーナスを適用します。
 * [id]:セットボーナス設定のリスト番号
 * 
 * セットボーナスと設定はプラグインパラメータから行います。
 * セットボーナスを適用させる装備は必ず装備元の装備も設定してください。
 * 
 * 仕様
 * 同じセットボーナスIDの効果は重複して適用されません。
 * 
 * 更新履歴
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
 */
/*~struct~SetBonusList:
 * 
 * @param SetBonusName
 * @text セットボーナス名称
 * @desc セットボーナスを区別するための名称。
 * @type string
 * @default
 * 
 * @param SetBonusWeaponData
 * @text パラメータ設定用武器ID
 * @desc セットボーナスのパラメータを設定する武器ID
 * @type weapon
 * @default 0
 * 
 * @param SetBonusArmorData
 * @text パラメータ設定用防具ID
 * @desc セットボーナスのパラメータを設定する防具ID
 * @type armor
 * @default 0
 * 
 * @param SetBonusEquip
 * @text セットボーナス装備設定
 * @desc セットボーナス対象の装備を設定します。
 * @type struct<SetBonusEquipList>[]
 * @default []
 * 
 * @param SetBonusNumberEquipment
 * @text セット装備数設定
 * @desc セット装備数を設定します。
 * @type struct<NumberEquipment>[]
 * @default []
 * 
 */
/*~struct~SetBonusEquipList:
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
 */
var Imported = Imported || {};
Imported.NUUN_SetBonusEquip = true;

(() => {
const parameters = PluginManager.parameters('NUUN_SetBonusEquip');
const SetBonusData = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['SetBonus'])) : null) || [];

NuunManager.getSetBonusParams = function() {
    return parameters;
};

Game_Actor.prototype.getSetBonus = function() {
    const equips = this.equips();
    let setBonusEquipList = [];
    let setBonusList = [];
    equips.forEach((equip, r) => {
        const list = this.getSetBonusData(equip);
        if (list) {
            list.forEach(setBonusId => {
                const data = SetBonusData[setBonusId - 1];
                let set = 0;
                data.SetBonusEquip.forEach(equip => {
                    if (this.hasWeapon($dataWeapons[equip.SetBonusWeapon])) {
                        set++;
                    } else if (this.hasArmor($dataArmors[equip.SetBonusArmor])) {
                        set++;
                    }
                });
                if (set === data.SetBonusEquip.length) {
                    if (!setBonusList[setBonusId]) {
                        setBonusList[setBonusId] = {setBonus: false, numBonus: []};
                    }
                    if (!setBonusList[setBonusId].setBonus) {
                        Array.prototype.push.apply(setBonusEquipList, [this.getEquipSetBonus(data)]);
                        //setBonusEquipList.push(this.getEquipSetBonus(data));
                        setBonusList[setBonusId].setBonus = true;
                    }
                }
                if (set > 1) {
                    data.SetBonusNumberEquipment.forEach((list, r) => {
                        if (list.SetNumberEquip <= set) {
                            if (!setBonusList[setBonusId]) {
                                setBonusList[setBonusId] = {setBonus: false, numBonus: []};
                            }
                            if (!setBonusList[setBonusId].numBonus[r]) {
                                setBonusList[setBonusId].numBonus[r] = true;
                                Array.prototype.push.apply(setBonusEquipList, [this.getEquipAddSetBonus(list)]);
                                //setBonusEquipList.push(this.getEquipAddSetBonus(list));
                            }
                        }
                    });
                }
            });
        }
    });
    return setBonusEquipList;
};

Game_Actor.prototype.getEquipSetBonus = function(data) {
    return data.SetBonusWeaponData > 0 ? $dataWeapons[data.SetBonusWeaponData] : $dataArmors[data.SetBonusArmorData];
};

Game_Actor.prototype.getEquipAddSetBonus = function(data) {
    return data.SetNumberEquipWeaponData > 0 ? $dataWeapons[data.SetNumberEquipWeaponData] : $dataArmors[data.SetNumberEquipArmorData];
};

Game_Actor.prototype.getSetBonusData = function(equip) {
    return equip && equip.meta.SetBonus ? equip.meta.SetBonus.split(',').map(Number) : null;
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