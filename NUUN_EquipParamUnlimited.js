/*:-----------------------------------------------------------------------------------
 * NUUN_EquipParamUnlimited.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc 装備能力値変化量上限突破
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * データベース上では装備の能力値変化量は0～500(最大HP、MPは5000)までしか設定できませんがこのプラグインでは上限を超えて設定する事ができます。
 * 
 * <EquipParamExMHP:[param]> 最大HPの能力値変化量を設定します。
 * <EquipParamExMMP:[param]> 最大MPの能力値変化量を設定します。
 * <EquipParamExATK:[param]> 攻撃力の能力値変化量を設定します。
 * <EquipParamExDEF:[param]> 防御力の能力値変化量を設定します。
 * <EquipParamExMAT:[param]> 魔力の能力値変化量を設定します。
 * <EquipParamExMDF:[param]> 魔法防御の能力値変化量を設定します。
 * <EquipParamExAGI:[param]> 敏捷性の能力値変化量を設定します。
 * <EquipParamExLUK:[param]> 運の能力値変化量を設定します。
 * 
 * [param]:変化量(整数)
 * ※[param]は[]を付けずに数値のみ記入してください。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/4/10 Ver.1.0.0
 * 初版
 * 
 */
var Imported = Imported || {};
Imported.NUUN_EquipParamUnlimited = true;

(() => {
const parameters = PluginManager.parameters('NUUN_EquipParamUnlimited');

const _Game_Actor_paramPlus = Game_Actor.prototype.paramPlus;
Game_Actor.prototype.paramPlus = function(paramId) {
    let value = _Game_Actor_paramPlus.call(this, paramId);
    const paramName = getParamData(paramId);
    const tagText = "EquipParamEx" + paramName;
    for (const item of this.equips()) {
        if (item && paramName) {
            value += item.meta[tagText] ? Number(item.meta[tagText]) : 0;
        }
    }
    return value;
};

function getParamData(paramId) {
    switch (paramId) {
        case 0:
            return 'MHP'
        case 1:
            return 'MMP'
        case 2:
            return 'ATK'
        case 3:
            return 'DEF'
        case 4:
            return 'MAT'
        case 5:
            return 'MDF'
        case 6:
            return 'AGI'
        case 7:
            return 'LUK'
        default:
            return null;
    }

}
})();