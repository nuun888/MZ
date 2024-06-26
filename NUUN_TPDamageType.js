/*:-----------------------------------------------------------------------------------
 * NUUN_TPDamageType.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Damage type TP added
 * @author NUUN
 * @version 1.1.0
 * 
 * @help
 * Adds TP to damage types.
 * Skill and item Notes
 * <DamageTypeTP> This skill and item are damage type "TP damage".
 * <DamageTypeTPR> This skill and item are damage type "TP recovery".
 * <DamageTypeTPA> This skill and item will be damage type "TP Absorption".
 * 
 * <UseEffectTP:[value]> Increases or decreases TP. Negative values are also allowed.
 * [value]:Increase/decrease value
 * 
 * Set the damage type to something other than None.
 * If there is the above tag, the damage type will be the corresponding type. (Settings on the database are not applied)
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 8/24/2023 Ver.1.1.0
 * Added a function that can increase or decrease TP with the effect of use.
 * 11/26/2022 Ver.1.0.3
 * Minor fix.
 * 11/24/2022 Ver.1.0.2
 * Changed the display in languages other than Japanese to English.
 * 2/27/2022 Ver.1.0.1
 * Fixed an issue where TP would decrease when the damage type was TP recovery.
 * 1/16/2022 Ver.1.0.0
 * First edition.
 * 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc ダメージタイプTP追加
 * @author NUUN
 * @version 1.1.0
 * 
 * @help
 * ダメージタイプにTPを追加します。
 * スキル、アイテムのメモ欄
 * <DamageTypeTP> このスキル、アイテムはダメージタイプ「TPダメージ」となります。
 * <DamageTypeTPR> このスキル、アイテムはダメージタイプ「TP回復」となります。
 * <DamageTypeTPA> このスキル、アイテムはダメージタイプ「TP吸収」となります。
 * 
 * <UseEffectTP:[value]> TPを増減させます。マイナスの値も設定できます。
 * [value]:増減値
 * 
 * ダメージタイプはなし以外に設定してください。
 * 上記のタグがある場合ダメージタイプは該当のタイプになります。（データベース上の設定は適用されません）
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/8/24 Ver.1.1.0
 * 使用効果でTPを増減できる機能を追加。
 * 2022/11/26 Ver.1.0.3
 * 微修正。
 * 2022/11/24 Ver.1.0.2
 * 日本語以外での表示を英語表示に変更。
 * 2022/2/27 Ver.1.0.1
 * ダメージタイプがTP回復の時に、TPが減ってしまう問題を修正。
 * 2022/1/16 Ver.1.0.0
 * 初版
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_TPDamageType = true;

(() => {
const parameters = PluginManager.parameters('NUUN_TPDamageType');

const _Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    const damageType = this.item().damage.type;
    this.item().damage.type = this.damageTypeEX(this.item(), damageType);
    _Game_Action_apply.call(this, target);
    this.item().damage.type = damageType;
};

const _Game_Action_executeDamage = Game_Action.prototype.executeDamage;
Game_Action.prototype.executeDamage = function(target, value) {
    _Game_Action_executeDamage.call(this, target, value);
    if (this.isTpEffect()) {
        this.executeTpDamage(target, value);
    }
};

Game_Action.prototype.executeTpDamage = function(target, value) {
    value *= this.isTpRecovery();
    if (this.isDrain()) {
        value = Math.min(target.tp, value);
    }
    if (value !== 0) {
        this.makeSuccess(target);
    }
    target.gainTp(-value);
    this.gainDrainedTp(value);
};

Game_Action.prototype.gainDrainedTp = function(value) {
    if (this.isDrain()) {
        let gainTarget = this.subject();
        if (this._reflectionTarget) {
            gainTarget = this._reflectionTarget;
        }
        gainTarget.gainTp(value);
    }
};

Game_Action.prototype.isTpEffect = function() {
    return this.checkDamageType([10, 11, 12]);
};

Game_Action.prototype.isTpRecovery = function() {
    return [11].includes(this.item().damage.type) ? -1 : 1;
};

const _Game_Action_isDamage = Game_Action.prototype.isDamage;
Game_Action.prototype.isDamage = function() {
    return _Game_Action_isDamage.call(this) || this.checkDamageType([10]);
};

const _Game_Action_isRecover = Game_Action.prototype.isRecover;
Game_Action.prototype.isRecover = function() {
    return _Game_Action_isRecover.call(this) || this.checkDamageType([11]);
};

const _Game_Action_isDrain = Game_Action.prototype.isDrain;
Game_Action.prototype.isDrain = function() {
    return _Game_Action_isDrain.call(this) || this.checkDamageType([12]);
};

Game_Action.prototype.damageTypeEX = function(item, type) {
    if (item.meta.DamageTypeTP) {
        return 10;
    } else if (item.meta.DamageTypeTPR) {
        return 11;
    } else if (item.meta.DamageTypeTPA) {
        return 12;
    } else {
        return type;
    }
};

const _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    this.itemEffectGainTpEx(target, this.item())
    _Game_Action_applyItemUserEffect.call(this, target);
};

Game_Action.prototype.itemEffectGainTpEx = function(target, item) {
    const value = item.meta.UseEffectTP ? Math.floor(Number(item.meta.UseEffectTP)) : 0;
    if (value !== 0) {
        target.gainTp(value);
        this.makeSuccess(target);
    }
};

})();