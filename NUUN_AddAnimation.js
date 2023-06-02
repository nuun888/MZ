/*:-----------------------------------------------------------------------------------
 * NUUN_AddAnimation.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Additional animation display
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * Play multiple or additional item/skill animations.
 * 
 * Skill and item notes
 * <AddAnimation:[id],[id]...>
 * Play multiple animations simultaneously.
 * 
 * <WaitAddAnimation:[id],[id]...>
 * Plays the next animation after one animation finishes.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 6/3/2023 Ver.1.0.0
 * First edition.
 * 
 */
/*:
 * @target MZ
 * @plugindesc 追加アニメーション表示
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * アイテム、スキルのアニメーションを複数または追加で再生させます。
 * 
 * スキル、アイテムのメモ欄
 * <AddAnimation:[id],[id]...>
 * 複数のアニメーションを同時に再生します。
 * 
 * <WaitAddAnimation:[id],[id]...>
 * 一つのアニメーションが終わった後に次のアニメーションを再生します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/6/3 Ver 1.0.0
 * 初版
 * 
 */


var Imported = Imported || {};
Imported.NUUN_AddAnimation = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_AddAnimation');

    const _Window_BattleLog_startAction = Window_BattleLog.prototype.startAction;
    Window_BattleLog.prototype.startAction = function(subject, action, targets) {
        this.setAddAnimationList(action.item(), subject, targets);
        _Window_BattleLog_startAction.call(this, subject, action, targets);
    };

    const _Window_BattleLog_displayAction = Window_BattleLog.prototype.displayAction;
    Window_BattleLog.prototype.displayAction = function(subject, item) {   
        _Window_BattleLog_displayAction.call(this, subject, item);
        this.pushAddAnimationList();
    };

    const _Window_BattleLog_clear = Window_BattleLog.prototype.clear;
    Window_BattleLog.prototype.clear = function() {
        $gameTemp.addAnimation = false;
        _Window_BattleLog_clear.call(this);
    };

    Window_BattleLog.prototype.pushAddAnimationList = function() {
        if (this._addAnimationList && this._addAnimationList.length > 0) {
            for (const data of this._addAnimationList) {
                if (data.mode === 1) {
                    this.push("waitAnimation");
                }
                this.push("showAnimation", data.subject, data.target, data.id);
            }
        }
    };

    Window_BattleLog.prototype.waitAnimation = function() {
        this._waitCount = 1;
        $gameTemp.addAnimation = true;
    };

    Window_BattleLog.prototype.isWaitAnimation = function() {
        return $gameTemp.addAnimation && this._spriteset.isAnimationPlaying();
    };

    const _Window_BattleLog_updateWait = Window_BattleLog.prototype.updateWait;
    Window_BattleLog.prototype.updateWait = function() {
        return _Window_BattleLog_updateWait.call(this) || this.isWaitAnimation();
    };

    Window_BattleLog.prototype.setAddAnimationList = function(item, subject, targets) {
        this._addAnimationList = [];
        let i = 0;
        getAddAnimationList(item).forEach(animationId => {
            this._addAnimationList.push({id: animationId, subject: subject, target: targets.clone(), mode: 0});
        });
        getWaitAddAnimationList(item).forEach(animationId => {
            this._addAnimationList.push({id: animationId, subject: subject, target: targets.clone(), mode: 1});
        });
    };

    function getWaitAddAnimationList(item) {
        return item.meta.WaitAddAnimation ? item.meta.WaitAddAnimation.split(",").map(Number) : [];
    };

    function getAddAnimationList(item) {
        return item.meta.AddAnimation ? item.meta.AddAnimation.split(",").map(Number) : [];
    };

    
})();