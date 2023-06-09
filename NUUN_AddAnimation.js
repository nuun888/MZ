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
 * @version 1.1.0
 * 
 * @help
 * Play multiple or additional item/skill animations.
 * 
 * Skill and item notes
 * <AddAnimation:[id],[id]...>
 * Play multiple animations simultaneously.
 * [id]: Animation ID
 * [Number]: Identification ID (integer) Omit the number in the first tag. Enter 2 for the second and subsequent items.
 * 
 * <AddAnimationWaitFrame[Number]:[WaitFrame]> 
 * Delay playback of the above animation by the specified number of frames.
 * [WaitFrame]; number of frames to delay If you enter -1, wait until the animation finishes playing.
 * [Number]: Identification ID (integer) Omit the number in the first tag. Enter 2 for the second and subsequent items.
 * 
 * Example
 * <AddAnimation:13>
 * <AddAnimation2:14>
 * <AddAnimationWaitFrame:30>
 * <AddAnimationWaitFrame2:45>
 * Animation ID 13 will be played 30 frames after the first animation is played, and animation ID 14 will be played after 45 frames.
 * 
 * <WaitAddAnimation:[id],[id]...>
 * Plays the next animation after one animation finishes.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 6/4/2023 Ver.1.1.0
 * Added a function to delay playback by a specified number of frames.
 * 6/3/2023 Ver.1.0.0
 * First edition.
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 追加アニメーション表示
 * @author NUUN
 * @version 1.1.0
 * 
 * @help
 * アイテム、スキルのアニメーションを複数または追加で再生させます。
 * 
 * スキル、アイテムのメモ欄
 * 
 * <AddAnimation[Number]:[id],[id]...>
 * 複数のアニメーションを同時に再生します。
 * [id]:アニメーションID
 * [Number]:識別ID(整数) 最初のタグは数字を省略します。２番目以降は2と記入します。
 * <AddAnimationWaitFrame[Number]:[WaitFrame]>　上記のアニメーションの再生を指定のフレーム数遅延再生します。
 * [WaitFrame];遅延フレーム数 -1と記入した場合は、アニメーションが再生し終わるまで待ちます。
 * [Number]:識別ID(整数) 最初のタグは数字を省略します。２番目以降は2と記入します。
 * 例
 * <AddAnimation:13>
 * <AddAnimation2:14>
 * <AddAnimationWaitFrame:30>
 * <AddAnimationWaitFrame2:45>
 * 最初のアニメーションが再生されて３０フレーム後にアニメーションID13が再生され、４５フレーム後にアニメーションID14番が再生されます。
 * 
 * <WaitAddAnimation:[id],[id]...>
 * 一つのアニメーションが終わった後に次のアニメーションを再生します。
 * [id]:アニメーションID
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/6/4 Ver 1.1.0
 * 指定のフレーム数遅延して再生できる機能を追加。
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
                    this.push("waitAnimation", 1, true);
                } else if (data.mode === 0) {
                    this.push("waitAnimation", data.wait, false);
                }
                this.push("showAnimation", data.subject, data.target, data.id);
            }
        }
    };

    Window_BattleLog.prototype.waitAnimation = function(wait, mode) {
        this._waitCount = wait < 0 ? 1 : wait;
        if (mode || wait < 0) {
            $gameTemp.addAnimation = true;
        }
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
        while (true) {
            const tag = i === 0 ? "AddAnimation" : "AddAnimation" + (i + 1);
            const tag2 = i === 0 ? "AddAnimationWaitFrame" : "AddAnimationWaitFrame" + (i + 1);
            if (i === 0 && item.meta[tag]) {
                getAddAnimationList(item, tag).forEach(animationId => {
                    this._addAnimationList.push({id: animationId, subject: subject, target: targets.clone(), mode: 0, wait: getAddAnimationWaitFrame(item, tag2)});
                });
            } else if (item.meta[tag]) {
                getAddAnimationList(item, tag).forEach(animationId => {
                    this._addAnimationList.push({id: animationId, subject: subject, target: targets.clone(), mode: 0, wait: getAddAnimationWaitFrame(item, tag2)});
                });
            } else {
                break;
            }
            i++;
        }
        getWaitAddAnimationList(item).forEach(animationId => {
            this._addAnimationList.push({id: animationId, subject: subject, target: targets.clone(), mode: 1, wait: 0});
        });
    };

    function getWaitAddAnimationList(item) {
        return item.meta.WaitAddAnimation ? item.meta.WaitAddAnimation.split(",").map(Number) : [];
    };

    function getAddAnimationList(item, tag) {
        return item.meta[tag] ? item.meta[tag].split(",").map(Number) : [];
    };

    function getAddAnimationWaitFrame(item, tag) {
        return item.meta[tag] ? item.meta[tag] : 0;
    };

})();