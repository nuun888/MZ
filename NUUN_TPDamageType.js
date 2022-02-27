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
 * @plugindesc ダメージタイプTP追加
 * @author NUUN
 * @version 1.0.1
 * 
 * @help
 * ダメージタイプにTPを追加します。
 * スキル、アイテムのメモ欄
 * <DamageTypeTP> このスキル、アイテムはダメージタイプ「TPダメージ」となります。
 * <DamageTypeTPR> このスキル、アイテムはダメージタイプ「TP回復」となります。
 * <DamageTypeTPA> このスキル、アイテムはダメージタイプ「TP吸収」となります。
 * 
 * ダメージタイプはなし以外に設定してください。
 * 上記のタグがある場合ダメージタイプは該当のタイプになります。（データベース上の設定は適用されません）
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
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
    this.item().damage.type = this.damageTypeEX(this.item());
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

Game_Action.prototype.damageTypeEX = function(item) {
    if (item.meta.DamageTypeTP) {
        return 10;
    } else if (item.meta.DamageTypeTPR) {
        return 11;
    } else if (item.meta.DamageTypeTPA) {
        return 12;
    } else {
        return item.damage.type;
    }
};
})();