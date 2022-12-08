/*:-----------------------------------------------------------------------------------
 * NUUN_BuffBoost.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Buff, debuff multiplier effect rate increase/decrease characteristics
 * @author NUUN
 * @version 1.0.1
 * 
 * @help
 * You can set the characteristics that increase or decrease the effect rate of the buff and debuff magnification.
 * Normal buff and debuff multipliers are 25% per stage, but the multiplier can be increased or decreased depending on the characteristics.
 * When the multiplier is 1.2x, the buff or debuff multiplier is 30%(25%*1.2).
 * 
 * Notes with characteristics
 * <BuffBoost[BuffId]:[rate]>
 * [BuffId]:BuffID 0:HP 1:MP 2:ATK 3:DEF 4:MAT 5:MDF 6:AGI 7:LUK
 * [rate]: Magnification (positive number) 1.0x at 100, 1.2x at buff at 120
 * 
 * <DebuffBoost[BuffId]:[rate]>
 * [BuffId]:DebuffID 0:HP 1:MP 2:ATK 3:DEF 4:MAT 5:MDF 6:AGI 7:LUK
 * [rate]: Magnification (positive number) 1.0x at 100, 0.8x at buff at 80
 * 
 * Log
 * 12/8/2022 Ver.1.0.1
 * Changed the display in languages other than Japanese to English.
 * 2/12/2022 Ver.1.0.0
 * First edition.
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc バフ、デバフ倍率効果率増減特徴
 * @author NUUN
 * @version 1.0.1
 * 
 * @help
 * バフ、デバフの倍率の効果率を増減する特徴を設定できます。
 * 通常のバフ、デバフの倍率は1段階につき25%になっていますが、特徴によって倍率を増減させます。
 * 倍率が1.2倍の時はバフまたはデバフの倍率が30%(25%*1.2)になります。
 * 
 * 特徴を有するメモ欄
 * <BuffBoost[BuffId]:[rate]>
 * [BuffId]:バフID 0:HP 1:MP 2:攻撃力 3:防御力 4:魔法力 5:魔法防御 6:敏捷性 7:運
 * [rate]:倍率(正数)　100で1.0倍 120ならバフ時に1.2倍
 * 
 * <DebuffBoost[BuffId]:[rate]>
 * [BuffId]:デバフID 0:HP 1:MP 2:攻撃力 3:防御力 4:魔法力 5:魔法防御 6:敏捷性 7:運
 * [rate]:倍率(正数)　100で1.0倍 80ならバフ時に0.8倍
 * 
 * 更新履歴
 * 2022/12/8 Ver.1.0.1
 * 日本語以外での表示を英語表示に変更。
 * 2022/2/12 Ver.1.0.0
 * 初版
 * 
 */
var Imported = Imported || {};
Imported.NUUN_BuffBoost = true;

(() => {
const parameters = PluginManager.parameters('NUUN_BuffBoost');

const _Game_BattlerBase_paramBuffRate = Game_BattlerBase.prototype.paramBuffRate;
Game_BattlerBase.prototype.paramBuffRate = function(paramId) {
    return ((_Game_BattlerBase_paramBuffRate.call(this, paramId) - 1.0) * this.buffBoostRate(paramId)) + 1.0;
};

Game_BattlerBase.prototype.buffBoostRate = function(paramId) {
    if (this._buffs[paramId] !== 0) {
        let tag = '';
        tag = this._buffs[paramId] > 0 ? 'BuffBoost' : 'DebuffBoost';
        return this.traitObjects().reduce((r, trait) => {
            if (trait.meta[tag + paramId]) {
                return r * Number(trait.meta[tag + paramId]) / 100;
            } else {
                return r;
            }
        }, 1.0);
    }
    return 1.0;
};

})();