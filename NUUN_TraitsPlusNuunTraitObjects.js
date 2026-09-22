/*:-----------------------------------------------------------------------------------
 * NUUN_TraitsPlusNuunTraitObjects.js
 * 
 * Copyright (C) 2025 NUUN
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc NRP_TraitsPlus Apply ability value traits
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @orderAfter NRP_TraitsPlus
 * @version 1.0.1
 * 
 * @help
 * This is a plugin for applying ability parameters based on NRP_TraitsPlus and unique characteristics.
 * 
 * Compatible plugins
 * Conditional passive skills (NUUN_PassiveSkill)
 * Equipment set bonus (NUUN_SetBonusEquip)
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
 * 11/30/2025 Ver.1.0.1
 * Fixed an issue that caused an error to occur in Ver.1.5.9 and later.
 * Fixed so that passive skills can be applied to enemies as well.
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
 * @version 1.0.1
 * 
 * @help
 * NRP_TraitsPlusと独自の特徴による能力値のパラメータを適用させるためのプラグインです。
 * 
 * 対応プラグイン
 * 条件パッシブスキル(NUUN_PassiveSkill)
 * 装備セットボーナス(NUUN_SetBonusEquip)
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
 * 2025/11/30 Ver.1.0.1
 * Ver.1.5.9以降エラーが出る問題を修正。
 * 敵にもパッシブスキルが適用できるように修正。
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
            Array.prototype.push.apply(objects, this.traitBattlerPassiveObject());
        }
        if (Imported.NUUN_SetBonusEquip) {//セットボーナス
            Array.prototype.push.apply(objects, this.setBonusObject());
        }
        return objects;
    };

    const _Game_Enemy_traitBattlerObjects = Game_Enemy.prototype.traitBattlerObjects;
    Game_Enemy.prototype.traitBattlerObjects = function() {
        let objects = _Game_Enemy_traitBattlerObjects.apply(this, arguments);
        if (Imported.NUUN_PassiveSkill) {//条件パッシブスキル
            Array.prototype.push.apply(objects, this.traitBattlerPassiveObject());
        }
        return objects;
    };

    Game_Battler.prototype.traitBattlerPassiveObject = function() {
        if (!!this.passiveObject) {
            return this.passiveObject();
        } else {
            return this.passiveSkillObject();
        }
    };
    
})();