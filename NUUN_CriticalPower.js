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
 * @version 1.0.0
 * 
 * @help
 * Implemented critical hit rate.
 * It is multiplied by the normal critical attack multiplier.
 * 
 * Features of Notes
 * <CreEffectRate:[rate]> 
 * [rate]:Critical hit rate
 * 
 * Acquisition parameters
 * Game_BattlerBase
 * crp
 * 
 * The formula for the critical multiplier is blank and it is "normal calculation * critical power".
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 9/17/2024 Ver.1.0.0
 * First edition. 
 * 
 * @param CriticalMultiplierFormula
 * @text Critical multiplier formula
 * @desc Enter the calculation formula for critical hits. Enter the calculation formula for critical hits. damage: Damage this.subject(): Attacker
 * @type combo
 * @option damage * (3 * this.subject().crp)
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
 * 
 * 特徴を有するメモ欄
 * <CreEffectRate:[rate]> 
 * [rate]:会心効果率
 * 
 * 取得パラメータ
 * Game_BattlerBase
 * crp
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/9/17 Ver.1.0.0
 * 初版
 * 
 * @param CriticalMultiplierFormula
 * @text クリティカル倍率計算式
 * @desc クリティカル時の計算式を記入します。damage:ダメージ this.subject():攻撃者 空白で通常の計算 * 会心力
 * @type combo
 * @option damage * (3 * this.subject().crp)
 * @default 
 * 
 */

var Imported = Imported || {};
Imported.NUUN_CriticalPower = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    const parameters = PluginManager.parameters('NUUN_CriticalPower');

    Object.defineProperties(Game_BattlerBase.prototype, {
        crp: {
            get: function() {
                return this.nuunCriticalEffectRate("Crp");
            },
            configurable: true
        }
    });

    const _Game_Action_applyCritical = Game_Action.prototype.applyCritical;
    Game_Action.prototype.applyCritical = function(damage) {
        return params.CriticalMultiplierFormula ? eval(params.CriticalMultiplierFormula) : (_Game_Action_applyCritical.apply(this, arguments) * this.subject().crp);
    };

    Game_BattlerBase.prototype.nuunCriticalEffectRate = function(paramId) {
        const tag = paramId +"EffectRate";
        return this.traitObjects().reduce((r, trait) => {
            return r * (trait.meta[tag] ? Number(trait.meta[tag]) / 100 : 1.0);
        }, 1.0);
    };
    
})();