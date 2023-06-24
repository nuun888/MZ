/*:-----------------------------------------------------------------------------------
 * NUUN_RobPresentState.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc state rob & present
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * Removes the target's specified state and attaches it to itself.
 * Cancels the specified state and attaches it to the target.
 * 
 * Skill and item notes
 * <RobState:[id],[id]...> Steal the opponent's state.
 * [id]:State ID
 * 
 * <PresentState:[id],[id]...> Makes you present your state to the other party.
 * [id]:State ID
 * 
 * State notes
 * <RobStateRate:[rate]> Specifies the probability of a state being stolen.
 * [rate]:Rate
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 6/24/2023 Ver.1.0.0
 * first edition.
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc ステート強奪献上
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * 対象の指定したステートを解除し、自身に付加または、自身の指定したステートを解除し、対象に付加させます。
 * 
 * スキル、アイテムのメモ欄
 * <RobState:[id],[id]...> 相手のステートを強奪します。
 * [id]:ステートID
 * 
 * <PresentState:[id],[id]...> 自身のステートを相手に献上させます。
 * [id]:ステートID
 * 
 * ステートのメモ欄
 * <RobStateRate:[rate]> ステートを奪われる確率を指定します。
 * [rate]:確率
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/6/24 Ver.1.0.0
 * 初版。
 * 
 */

var Imported = Imported || {};
Imported.NUUN_RobPresentState = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_RobPresentState');

    const _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
    Game_Action.prototype.applyItemUserEffect = function(target) {
        _Game_Action_applyItemUserEffect.call(this, target);
        this.robState(target);
        this.presentState(target);
    };

    Game_Action.prototype.robState = function(target) {
        const item = this.item();
        if (item.meta.RobState) {
            const list = item.meta.RobState.split(',').map(Number);
            if (list.length > 0) {
                list.forEach(id => {
                    if (target.isStateAffected(id) && this.robStateRate($dataStates[id])) {
                        target.removeState(id);
                        this.subject().addState(id);
                    }
                });
            }
        }
    };

    Game_Action.prototype.presentState = function(target) {
        const item = this.item();
        const subject = this.subject();
        if (item.meta.PresentState) {
            const list = item.meta.PresentState.split(',').map(Number);
            if (list.length > 0) {
                list.forEach(id => {
                    if (subject.isStateAffected(id)) {
                        subject.removeState(id);
                        target.addState(id);
                    }
                });
            }
        }
    };

    Game_Action.prototype.robStateRate = function(state) {
        if (state.meta.RobStateRate) {
            return Number(state.meta.RobStateRate) > Math.randomInt(100);
        } else {
            return true;
        }
    };
    
})();