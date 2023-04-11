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
 * @version 1.0.0
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
            if (BattleManager.isOnActorPictureEX()) {
                subject.onImgId = 32;
                subject.imgRefresh();
            } else {
                subject.setBattleImgId(32, counter.Id);
                subject.battleStyleImgRefresh();
            }
        }
        _BattleManager_invokeCounterAction.call(this, subject, target, counterAction);
    };
    
})();