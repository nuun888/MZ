/*:-----------------------------------------------------------------------------------
 * NUUN_ItemOverallEffect.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Item Effect Overall Feature
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * You can create traits that target a single item's area of effect to the whole.
 * 
 * Notes with features
 * <ItemOverallEffect> Makes the range whole when using the item.
 * 
 * Item notes
 * <[tag]> Enables the overall effect for this item, if the overall effect tag is set.
 * [tag]:Tag name entered in the overall effect tag
 * If the tag entered in the overall effect tag is not entered, the effect of all single target items will be the target of the overall effect.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 7/8/2023 Ver.1.0.0
 * first edition.
 * 
 * @param OverallEffectTag
 * @desc Enter the tag name to apply the overall effect. If nothing is specified, all items are eligible.
 * @text Overall effect tag
 * @type string
 * @default 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc アイテム全体化特徴
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * 対象が単体のアイテムの範囲を全体化する特徴を作ることができます。
 * 
 * 特徴を有するメモ欄
 * <ItemOverallEffect> アイテム使用時に範囲を全体化します。
 * 
 * アイテムのメモ欄
 * <[tag]> 全体化タグが設定されている場合、このアイテムの全体化を有効にします。
 * [tag]:全体化タグで記入したタグ名
 * 全体化タグで記入したタグが記入されていない場合は、全ての単体対象アイテムの効果が全体化の対象になります。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/7/8 Ver.1.0.0
 * 初版
 * 
 * @param OverallEffectTag
 * @desc 全体化を適用するタグ名を記入します。無記入の場合は全てのアイテムが対象です。
 * @text 全体化タグ
 * @type string
 * @default 
 * 
 */

var Imported = Imported || {};
Imported.NUUN_ItemOverallEffect = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_ItemOverallEffect');
    const OverallEffectTag = String(parameters['OverallEffectTag']);

    const _Game_Action_makeTargets = Game_Action.prototype.makeTargets;
    Game_Action.prototype.makeTargets = function() {
        const repeatTargets = _Game_Action_makeTargets.call(this);
        if (this.isOverallEffectItem()) {
            const targets = [];
            if (this.isForOpponent()) {
                targets.push(...this.targetsForOverallEffectOpponents());
            } else if (this.isForFriend()) {
                targets.push(...this.targetsForOverallEffectFriends());
            }
            return this.repeatTargets(targets);
        }
        return repeatTargets;
    };

    Game_Action.prototype.isOverallEffectItem = function() {
        return this.isItem() && this.isForOne() && this.isForAllOverallEffect();
    };

    Game_Action.prototype.isForAllOverallEffect = function() {
        if (this.isItem() && isItemOverallEffect(this.item())) {
            return this.subject().isItemOverallEffect();
        } else {
            return false;
        }
    };

    Game_Action.prototype.targetsForOverallEffectOpponents = function() {
        const unit = this.opponentsUnit();
        return unit.aliveMembers();
    };

    Game_Action.prototype.targetsForOverallEffectFriends = function() {
        const unit = this.friendsUnit();
        return unit.aliveMembers();
    };

    Game_Battler.prototype.isItemOverallEffect = function() {
        return this.traitObjects().some(trait => isOverallEffect(trait));
    };

    function isItemOverallEffect(item) {
        return !!OverallEffectTag ? item.meta[OverallEffectTag] : true;
    };
    
    function isOverallEffect(trait) {
        return trait.meta.ItemOverallEffect;
    };
    
    
})();