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
 * @plugindesc セットボーナス
 * @author NUUN
 * @version 1.0.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * 特定の装備と同時に装備したときにセットボーナスを発動させます。
 * 該当する全ての装備を装備している時に効果が適用されます。
 * 
 * 適用するセットボーナスのパラメータはデータベースの武器でセットボーナス用のデータを作成します。
 * 
 * 武器、防具のメモ欄
 * <SetBonus:[id], [id]...> セットボーナスを適用します。
 * [id]:セットボーナス設定のリスト番号
 * 
 * 仕様
 * 同じ装備のセットボーナスまたは、同じセットボーナスIDは１つまでとなっています。
 * 
 * 更新履歴
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
 * @text セットボーナスのパラメータを設定する武器ID
 * @desc パラメータ設定用武器ID
 * @type weapon
 * @default 0
 * 
 * @param SetBonusEquip
 * @text セットボーナス装備設定
 * @desc セットボーナス対象の装備を設定します。
 * @type struct<SetBonusEquipList>[]
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
var Imported = Imported || {};
Imported.NUUN_SetBonusEquip = true;

(() => {
const parameters = PluginManager.parameters('NUUN_SetBonusEquip');
const SetBonusData = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['SetBonus'])) : null) || [];

Game_Actor.prototype.getSetBonus = function() {
    const equips = this.equips();
    let setBonusList = [];
    let setBonusEquip = [];
    equips.forEach((equip, r) => {
        const list = this.getSetBonusData(equip);
        setBonusEquip[r] = 0;
        if (list && !this.isSetBonusId(setBonusEquip, equip.id)) {
            list.forEach(setBonusId => {
                const data = SetBonusData[setBonusId - 1];
                const result = data.SetBonusEquip.every(equip => {
                    if (this.isSetBonusDuplicateId(setBonusList, data.SetBonusWeaponData)) {
                      return false;
                    } else if (this.hasWeapon($dataWeapons[equip.SetBonusWeapon])) {
                        return true;
                    } else if (this.hasArmor($dataArmors[equip.SetBonusArmor])) {
                        return true;
                    }
                    return false;
                });
                if (result) {
                    setBonusList.push($dataWeapons[data.SetBonusWeaponData]);
                    setBonusEquip[r] = equips.id;
                }
            })
        }
    });
    return setBonusList;
};

Game_Actor.prototype.isSetBonusId = function(setBonusEquip, equipId) {
    return setBonusEquip.some(id => id === equipId);
};

Game_Actor.prototype.isSetBonusDuplicateId = function(setBonusList, equipId) {
  return setBonusList.some(equip => equip.id === equipId);
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
  return objects.concat(this.setBonusObject());
};

Game_Actor.prototype.setBonusObject = function() {
    return this.getSetBonus();
};

})();