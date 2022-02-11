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
 * @plugindesc バフ、デバフ倍率効果率増減特徴
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * バフ、デバフの倍率の効果率を増減する特徴を設定できます。
 * 通常のバフ、デバフの倍率は1段階につき25%になっていますが、特徴によって倍率を増減させます。
 * 倍率が1.2倍の時はバフまたはデバフの倍率が30%になります。
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
