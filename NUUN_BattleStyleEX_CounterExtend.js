/*:-----------------------------------------------------------------------------------
 * NUUN_BattleStyleEX_CounterExtend.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc 条件バトラー反撃拡張プラグイン適用
 * @author NUUN
 * @base NUUN_BattleStyleEX
 * @orderAfter NUUN_BattleStyleEX
 * @orderAfter CounterExtend
 * @version 1.0.2
 * 
 * @help
 * トリアコンタン氏の反撃拡張プラグインで設定した反撃をバトルスタイル拡張プラグインでの条件バトラーに適用させるプラグインです。
 * バトルスタイル拡張プラグインまたは、立ち絵、顔グラ表示EXのプラグインパラメータのアクター画像の条件設定の変化シーンで、反撃時(CounterExtend)(4)を選択し
 * 識別タグ(4)で反撃拡張プラグインで設定した識別子を指定してください。識別子は複数設定可能です。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/6/26 Ver.1.0.2
 * カウンターの処理を修正。
 * 2023/4/11 Ver.1.0.1
 * カウンター時のスキル発動時のアクター画像切り替えを行うように修正。
 * 2023/4/11 Ver.1.0.0
 * 初版。
 * 
 */

var Imported = Imported || {};
Imported.NUUN_BattleStyleEX_CounterExtend = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_BattleStyleEX_CounterExtend');

    const _BattleManager_invokeCounterAction = BattleManager.invokeCounterAction;
    BattleManager.invokeCounterAction = function(subject, target, counterAction) {
        if (!subject.canMove() || subject.isDead()) {
            return;
        }
        const counter = counterAction.getCounter();
        if (subject.isActor()) {
            subject.result().counterExtend = true;
            if (counter.Id !== undefined) {
                this.nuun_bsUseItemId = counter.Id;
            }
            if (BattleManager.isOnActorPictureEX()) {
                subject.imgRefresh();
            } else {
                subject.battleStyleImgRefresh();
            };
        }
        _BattleManager_invokeCounterAction.call(this, subject, target, counterAction);
        
    };

    const _Game_Battler_performActionStart = Game_Battler.prototype.performActionStart;
    Game_Battler.prototype.performActionStart = function(action) {
        if (action.isCounter()) {
            this._counterAction = true;
        }
        _Game_Battler_performActionStart.call(this, action);
    };

    const _BattleManager_endBattlerActions = BattleManager.endBattlerActions;
    BattleManager.endBattlerActions = function(battler) {
        if (this._action && this._action.isCounter()) {
            battler._counterAction = false;
        }
        _BattleManager_endBattlerActions.call(this, battler);
    };

    Game_Actor.prototype.isCounterSkillAction = function() {
        return this._counterAction;
    };
})();