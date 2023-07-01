/*:-----------------------------------------------------------------------------------
 * NUUN_ElementAbsorb.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Element absorption feature
 * @author NUUN
 * @version 2.0.0
 * 
 * @help
 * You can set traits that absorb attributes.
 * 
 * Identical Element Effectiveness Processing Settings
 * Absolute maximum priority
 * The higher absolute value of the normal element and the absorbing element applies.
 * Prioritize absorption
 * If there is an absorbing element, the element with the lowest (highest absorbing effect rate) will be applied.
 * Sum
 * Applied with the difference between normal element and (absorbing element -100%).
 * 
 * Notes with features
 * <absorbElement[elementId]:[rate]> Sets the element to absorb.
 * [elementId]:ElementId
 * [rate]:Effectiveness (specified as an integer greater than or equal to 1)
 * 
 * <absorbElementBoost[elementId]:[rate]> Set the absorption effect rate.
 * [elementId]:ElementId  If omitted, it applies to all attributes.
 * [rate]:Increases or decreases the absorbency of an element. (Specify with an integer greater than or equal to 1) 
 * Multiplication processing
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 7/1/2023 Ver.2.0.0
 * Changed how to set absorption elements.
 * Added Absorption Effective Rate function.
 * 8/9/2021 Ver.1.0.1
 * Fixed the problem that an error occurs when specifying an ID that is not listed as an attribute to be absorbed.
 * 8/9/2021 Ver.1.0.0
 * First edition.
 * 
 * 
 * @param AbsorbCalculation
 * @text Specifies the calculation method for the absorption element effectiveness.
 * @desc Absorbing element effectiveness calculation method
 * @type select
 * @option Multiplication
 * @value 'Multiplication'
 * @option Sum
 * @value 'Sum'
 * @default 'Multiplication'
 * 
 * @param AbsorbSetting
 * @text Identical Element Effectiveness Processing Settings
 * @desc Element effectiveness of the same element and processing method with absorbing element
 * @type select
 * @option Absolute maximum priority
 * @value 'MaxValue'
 * @option Prioritize absorption
 * @value 'Absorb'
 * @option Sum
 * @value 'Sum'
 * @default 'Absorb'
 * 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 属性吸収特徴
 * @author NUUN
 * @version 2.0.0
 * 
 * @help
 * 属性を吸収する特徴を設定できます。
 * 
 * 同一属性属性有効度処理設定
 * 絶対値最大値優先
 * 通常の属性と吸収属性の絶対値が高いほうが適用されます。
 * 吸収優先
 * 吸収属性があれば一番低い(吸収効果率の高い)属性が適用されます。
 * 加算
 * 通常の属性と(吸収属性-100%)との差で適用されます。
 * 
 * 特徴を有するメモ欄
 * <absorbElement[elementId]:[rate]> 吸収する属性を設定します。
 * [elementId]:属性ID
 * [rate]:有効度(1以上整数で指定)
 * 
 * <absorbElementBoost[elementId]:[rate]> 吸収効果率を設定します。
 * [elementId]:属性ID 省略した場合、全ての属性で適用されます。
 * [rate]:属性の吸収率を増減させます。(1以上で整数で指定) 乗算処理
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 7/1/2023 Ver.2.0.0
 * 吸収属性の設定方法を変更。
 * 吸収効果率の機能を追加。
 * 2021/8/9 Ver.1.0.1
 * 吸収する属性にリスト設定していないIDを指定した場合エラーが出る問題を修正。
 * 2021/8/9 Ver.1.0.0
 * 初版
 * 
 * @param AbsorbCalculation
 * @text 吸収属性有効度の計算方式を指定します。
 * @desc 吸収属性有効度計算方式
 * @type select
 * @option 乗算
 * @value 'Multiplication'
 * @option 加算
 * @value 'Sum'
 * @default 'Multiplication'
 * 
 * @param AbsorbSetting
 * @text 同一属性属性有効度処理設定
 * @desc 同一属性の属性有効度と吸収属性度との処理方法
 * @type select
 * @option 絶対値最大値優先
 * @value 'MaxValue'
 * @option 吸収優先
 * @value 'Absorb'
 * @option 加算
 * @value 'Sum'
 * @default 'Absorb'
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_ElementAbsorb = true;
let onAbsorb = false;
let absorbRates = null;

(() => {
const parameters = PluginManager.parameters('NUUN_ElementAbsorb');
const AbsorbCalculation = eval(parameters['AbsorbCalculation'] || 'Multiplication');
const AbsorbSetting = eval(parameters['AbsorbSetting'] || 'Sum');

const _Game_Action_elementsMaxRate = Game_Action.prototype.elementsMaxRate;
Game_Action.prototype.elementsMaxRate = function(target, elements) {
    absorbRates = [];
    const rate = _Game_Action_elementsMaxRate.call(this, target, elements);
    if (elements.length > 0 && absorbRates.length > 0) {
        const absorb = Math.min(...absorbRates);
        absorbRates = null;
        return absorb >= 0 ? rate : absorb;
    } else {
        absorbRates = null;
        return rate;
    } 
};

const _Game_BattlerBase_elementRate = Game_BattlerBase.prototype.elementRate;
Game_BattlerBase.prototype.elementRate = function(elementId) {
    onAbsorb = false;
    const absorb = this.absorbElementRate(elementId);
    if (absorb > 0) {
        let rate = 0;
        if (AbsorbSetting === 'MaxValue') {
            if (Math.abs(_Game_BattlerBase_elementRate.call(this, elementId)) > Math.abs(absorb)) {
                rate = _Game_BattlerBase_elementRate.call(this, elementId);
            } else {
                rate = absorb * -1;
            }
        } else if (AbsorbSetting === 'Sum') {
            rate = _Game_BattlerBase_elementRate.call(this, elementId) + ((absorb + 1) * -1);
        } else {
            rate = onAbsorb ? absorb * -1 : _Game_BattlerBase_elementRate.call(this, elementId);
        }
        if (absorbRates && onAbsorb) {
            absorbRates.push(rate);
        }
        return rate;
    } else {
        return _Game_BattlerBase_elementRate.call(this, elementId);
    }
};

Game_BattlerBase.prototype.absorbElementRate = function(elementId) {
    const tag = "absorbElement" + elementId;
    const boostTag = "absorbElementBoost" + elementId;
    let rate = 0;
    if (AbsorbCalculation === "Multiplication") {
        rate = this.getAbsorbElementPi(tag);
    } else {
        rate = this.getAbsorbElementSum(tag);
    }
    return onAbsorb ? rate * this.getAbsorbElementBoost(boostTag) : 0;
};

Game_BattlerBase.prototype.getAbsorbElementPi = function(tag) {
    return this.traitObjects().reduce((r, trait) => {
        const rate = trait.meta[tag] ? Number(trait.meta[tag]) : 0;
        if (rate && rate > 0) {
            r *= rate / 100;
            onAbsorb = true;
        }
        return r;
    }, 1);
};

Game_BattlerBase.prototype.getAbsorbElementSum = function(tag) {
    return this.traitObjects().reduce((r, trait) => {
        const rate = trait.meta[tag] ? Number(trait.meta[tag]) : 0;
        if (rate && rate > 0) {
            r += rate / 100;
            onAbsorb = true;
        }
        return r;
    }, 0);
};

Game_BattlerBase.prototype.getAbsorbElementBoost = function(tag) {
    return this.traitObjects().reduce((r, trait) => {
        const rate = getAbsorbElementBoostTag(trait, tag);
        if (rate && rate > 0) {
            r *= rate / 100;
        }
        return r;
    }, 1);
};

function getAbsorbElementBoostTag(trait, tag) {
    if (trait.meta[tag]) {
        return Number(trait.meta[tag]);
    } else if (trait.meta.absorbElementBoost) {
        return Number(trait.meta.absorbElementBoost);
    } else {
        return 0;
    }
};

})();