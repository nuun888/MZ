/*:-----------------------------------------------------------------------------------
 * NUUN_TraitsPlusNuunTraitObjects.js
 * 
 * Copyright (C) 2025 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc NRP_TraitsPlus Apply ability value traits
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @orderAfter NRP_TraitsPlus
 * @version 1.0.0
 * 
 * @help
 * This is a plugin for applying ability parameters based on NRP_TraitsPlus and unique characteristics.
 * 
 * Compatible plugins
 * Conditional passive skills (NUUN_PassiveSkill)
 * Equipment set bonus (NUUN_SetBonusEquip)
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 1/31/2025 Ver.1.0.0
 * First edition.
 * 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc NRP_TraitsPlus能力値特徴適用
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @orderAfter NRP_TraitsPlus
 * @version 1.0.0
 * 
 * @help
 * NRP_TraitsPlusと独自の特徴による能力値のパラメータを適用させるためのプラグインです。
 * 
 * 対応プラグイン
 * 条件パッシブスキル(NUUN_PassiveSkill)
 * 装備セットボーナス(NUUN_SetBonusEquip)
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2025/1/31 Ver.1.0.0
 * 初版
 * 
 */

var Imported = Imported || {};
Imported.NUUN_TraitsPlusNuunTraitObjects = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    const _Game_Actor_traitBattlerObjects = Game_Actor.prototype.traitBattlerObjects;
    Game_Actor.prototype.traitBattlerObjects = function() {
        let objects = _Game_Actor_traitBattlerObjects.apply(this, arguments);
        if (Imported.NUUN_PassiveSkill) {//条件パッシブスキル
            Array.prototype.push.apply(objects, this.passiveObject());
        }
        if (Imported.NUUN_SetBonusEquip) {//セットボーナス
            Array.prototype.push.apply(objects, this.setBonusObject());
        }
        return objects;
    };
    
})();