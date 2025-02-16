/*:-----------------------------------------------------------------------------------
 * NUUN_CriticalPower.js
 * 
 * Copyright (C) 2024 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Critical Power
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.1.0
 * 
 * @help
 * Implemented critical hit rate.
 * It is multiplied by the normal critical attack multiplier.
 * 
 * Features of Notes
 * <CrpEffectRate:[rate]> 
 * [rate]:Critical hit rate (Integer) 200 is 200%
 * <CrdEffectRate:[rate]> 
 * [rate]:Critical fefense rate (Integer) 50 is 50%
 * 
 * Acquisition parameters
 * Game_BattlerBase
 * damage:Damage
 * subject:Attacker
 * target:Target
 * crp:Critical hit rate
 * crd:Critical hit defense rate
 * 
 * Skill and item notes
 * <CrpDamageFormula:[Formula]> Sets the critical damage formula for each item or skill.
 * 
 * The formula for the critical multiplier is blank and it is "normal calculation * critical power".
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 2/16/2025 Ver.1.1.0
 * Added the ability to set the critical damage formula for each item and skill.
 * Added critical defense rate.
 * Fixed a misprint in the critical effect rate tag description.
 * 9/17/2024 Ver.1.0.0
 * First edition. 
 * 
 * @param CriticalMultiplierFormula
 * @text Critical multiplier formula
 * @desc Enter the calculation formula for critical hits. Enter the calculation formula for critical hits. damage: Damage subject: Attacker
 * @type combo
 * @option damage * (3 * subject.crp * target.crd)
 * @default 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 会心力
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * 会心力を実装します。
 * 通常の会心攻撃の倍率に乗算されます。
 * 会心効果率、会心防御率はいずれも乗算で計算されます。
 * 
 * 特徴を有するメモ欄
 * <CrpEffectRate:[rate]> 
 * [rate]:会心効果率(整数) 200なら200%
 * <CrdEffectRate:[rate]> 
 * [rate]:会心防御率(整数) 50なら50%
 * 
 * スキル、アイテムのメモ欄
 * <CrpDamageFormula:[Formula]> アイテム、スキルごとの会心ダメージの式を設定します。
 * 
 * 取得パラメータ
 * Game_BattlerBase
 * damage:ダメージ
 * subject:攻撃実行者
 * target:対象
 * crp:会心効果率
 * crd:会心防御率
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2025/2/16 Ver.1.1.0
 * アイテム、スキルごとに会心ダメージの式を設定できる機能を追加。
 * 会心防御率を追加。
 * 会心効果率のタグ説明の誤表記を修正。
 * 2024/9/17 Ver.1.0.0
 * 初版
 * 
 * @param CriticalMultiplierFormula
 * @text クリティカル倍率計算式
 * @desc クリティカル時の計算式を記入します。damage:ダメージ subject:攻撃者 空白で通常の計算 * 会心力
 * @type combo
 * @option damage * (3 * subject.crp * target.crd)
 * @default 
 * 
 */

var Imported = Imported || {};
Imported.NUUN_CriticalPower = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    let _target = null;

    Object.defineProperties(Game_BattlerBase.prototype, {
        crp: {
            get: function() {
                return this.nuunCriticalEffectRate("Crp");
            },
            configurable: true
        }
    });

    Object.defineProperties(Game_BattlerBase.prototype, {
        crd: {
            get: function() {
                return this.nuunCriticalEffectRate("Crd");
            },
            configurable: true
        }
    });


    const _Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;
    Game_Action.prototype.makeDamageValue = function(target, critical) {
        _target = target;
        return _Game_Action_makeDamageValue.apply(this, arguments)
    };

    const _Game_Action_applyCritical = Game_Action.prototype.applyCritical;
    Game_Action.prototype.applyCritical = function(damage) {
        const subject = this.subject();
        const target = _target;
        const formula = this.getCriticalFormula();
        return formula ? eval(formula) : (_Game_Action_applyCritical.apply(this, arguments) * (subject.crp * target.crd));
    };

    Game_Action.prototype.getCriticalFormula = function() {
        const item = this.item();
        return item && item.meta.CrpDamageFormula ? item.meta.CrpDamageFormula : params.CriticalMultiplierFormula;
    };

    Game_BattlerBase.prototype.nuunCriticalEffectRate = function(paramId) {
        const tag = paramId +"EffectRate";
        return this.traitObjects().reduce((r, trait) => {
            return r * (trait.meta[tag] ? Number(trait.meta[tag]) / 100 : 1.0);
        }, 1.0);
    };
    
})();