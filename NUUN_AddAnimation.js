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
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.2.0
 * 
 * @help
 * Play multiple or additional item/skill animations.
 * 
 * Skill and item notes
 * <AddAnimation:[id]> The set animation will be played continuously.
 * [id]:Plug-in parameter "Animation setting" ID
 * 
 * Play after animation ends
 * Plays after all currently playing animations have finished.
 * Subsequent animations will have a wait time based on the animation that is set to play after the animation ends.
 * 
 * 
 * Old setting (not recommended)
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
 * 2/4/2025 Ver.1.2.0
 * The setting method has been changed to set using plugin parameters.
 * 6/4/2023 Ver.1.1.0
 * Added a function to delay playback by a specified number of frames.
 * 6/3/2023 Ver.1.0.0
 * First edition.
 * 
 * @param AnimationSetting
 * @text Animation setting
 * @desc Set up multiple animations to be played.
 * @default ["{\"Animation\":\"0\",\"AddAnimation\":\"\"}"]
 * @type struct<AnimationList>[]
 * 
 * @param OldAddAnimationValid
 * @desc The old setting method is enabled. The same items and skills cannot be used in conjunction with the new method.
 * @text Old setting method applied
 * @type boolean
 * @default false
 * 
 */
/*~struct~AnimationList:
 * 
 * @param AddAnimation
 * @text Additional animation settings
 * @desc Configure the animation you want to add.
 * @default {}
 * @type struct<AddAnimationList>[]
 * 
 * 
 */
/*~struct~AddAnimationList:
 * 
 * @param Animation
 * @desc Specifies the animation.
 * @text Animation
 * @type animation
 * @default 0
 * 
 * @param AddAnimationWait
 * @text Weight
 * @desc Specifies the frame number at which the animation will start playing. If you enter -1, it will wait until the animation finishes playing.
 * @default 0
 * @type number
 * 
 * @param EndAnimationPlay
 * @desc Plays after the animation finishes.
 * @text Play after animation ends
 * @type boolean
 * @default false
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 追加アニメーション表示
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.2.0
 * 
 * @help
 * アイテム、スキルのアニメーションを複数または追加で再生させます。
 * 
 * スキル、アイテムのメモ欄
 * <AddAnimation:[id]> 設定したアニメーションを連続再生します。
 * [id]:プラグインパラメータの追加アニメーション設定のID
 * 
 * アニメーション終了後再生
 * 再生している全てのアニメーションが終了後に再生します。
 * それ以降のアニメーションはアニメーション終了後再生を設定しているアニメーション基準にウェイトが発生します。
 * 
 * 旧設定(非推奨)
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
 * 2025/2/4 Ver 1.2.0
 * 設定方法をプラグインパラメータで設定する方式に変更。
 * 2023/6/4 Ver 1.1.0
 * 指定のフレーム数遅延して再生できる機能を追加。
 * 2023/6/3 Ver 1.0.0
 * 初版
 * 
 * @param AnimationSetting
 * @text アニメーション設定
 * @desc 複数再生するアニメーションの設定を行います。
 * @default ["{\"Animation\":\"0\",\"AddAnimation\":\"\"}"]
 * @type struct<AnimationList>[]
 * 
 * @param OldAddAnimationValid
 * @desc 旧設定の方式を有効にします。同じアイテム、スキルで新方式との併用は出来ません。
 * @text 旧設定方式適用
 * @type boolean
 * @default false
 * 
 */
/*~struct~AnimationList:ja
 * 
 * @param AddAnimation
 * @text 追加アニメーション設定
 * @desc 追加するアニメーションの設定を行います。
 * @default {}
 * @type struct<AddAnimationList>[]
 * 
 * 
 */
/*~struct~AddAnimationList:ja
 * 
 * @param Animation
 * @desc アニメーションを指定します。
 * @text アニメーション
 * @type animation
 * @default 0
 * 
 * @param AddAnimationWait
 * @text ウェイト
 * @desc アニメーションを再生され始めるフレーム数を指定します。-1と記入した場合は、アニメーションが再生し終わるまで待ちます。
 * @default 0
 * @min -1
 * @type number
 * 
 * @param EndAnimationPlay
 * @desc アニメーション終了後に再生します。
 * @text アニメーション終了後再生
 * @type boolean
 * @default false
 * 
 */


var Imported = Imported || {};
Imported.NUUN_AddAnimation = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    const _Window_BattleLog_startAction = Window_BattleLog.prototype.startAction;
    Window_BattleLog.prototype.startAction = function(subject, action, targets) {
        this.setAddAnimationList(action.item(), subject, targets);
        _Window_BattleLog_startAction.call(this, subject, action, targets);
    };

    const _Window_BattleLog_displayAction = Window_BattleLog.prototype.displayAction;
    Window_BattleLog.prototype.displayAction = function(subject, item) {
        this.pushAddAnimationList();
        _Window_BattleLog_displayAction.call(this, subject, item);
    };

    const _Window_BattleLog_clear = Window_BattleLog.prototype.clear;
    Window_BattleLog.prototype.clear = function() {
        $gameTemp.addAnimation = false;
        _Window_BattleLog_clear.call(this);
    };

    Window_BattleLog.prototype.pushAddAnimationList = function() {
        if (this._addAnimationList && this._addAnimationList.length > 0) {
            for (const data of this._addAnimationList) {
                this.push("waitAnimation", data.wait, data.mode);
                this.push("showAddAnimation", data.id, data.target);
            }
        }
    };

    Window_BattleLog.prototype.showAddAnimation = function(animationId, targets) {
        this.showNormalAnimation(targets, animationId, false);
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

    const _Window_BattleLog_update = Window_BattleLog.prototype.update;
    Window_BattleLog.prototype.update = function() {
        if (!this._spriteset.isAnimationPlaying()) {
            $gameTemp.addAnimation = false;
        }
        _Window_BattleLog_update.apply(this, arguments);
    };

    const _Window_BattleLog_updateWait = Window_BattleLog.prototype.updateWait;
    Window_BattleLog.prototype.updateWait = function() {
        return _Window_BattleLog_updateWait.apply(this, arguments) || this.isWaitAnimation();
    };

    Window_BattleLog.prototype.setAddAnimationList = function(item, subject, targets) {
        this._addAnimationList = [];
        const animation = item.meta.AnimationAdd ? params.AnimationSetting[Number(item.meta.AnimationAdd) - 1] : 0;
        if (!!animation && !!animation.AddAnimation) {
            animation.AddAnimation.forEach(data => {
                this._addAnimationList.push({id: data.Animation, subject: subject, target: targets.clone(), mode: data.EndAnimationPlay, wait: data.AddAnimationWait});
            });
        }
        //旧仕様
        if (params.OldAddAnimationValid && this._addAnimationList.length === 0) {
            let i = 0;
            while (true) {
                const tag = i === 0 ? "AddAnimation" : "AddAnimation" + (i + 1);
                const tag2 = i === 0 ? "AddAnimationWaitFrame" : "AddAnimationWaitFrame" + (i + 1);
                if (i === 0 && item.meta[tag]) {
                    getAddAnimationList(item, tag).forEach(animationId => {
                        this._addAnimationList.push({id: animationId, subject: subject, target: targets.clone(), mode: false, wait: getAddAnimationWaitFrame(item, tag2)});
                    });
                } else if (item.meta[tag]) {
                    getAddAnimationList(item, tag).forEach(animationId => {
                        this._addAnimationList.push({id: animationId, subject: subject, target: targets.clone(), mode: false, wait: getAddAnimationWaitFrame(item, tag2)});
                    });
                } else {
                    break;
                }
                i++;
            }
            getWaitAddAnimationList(item).forEach(animationId => {
                this._addAnimationList.push({id: animationId, subject: subject, target: targets.clone(), mode: true, wait: 0});
            });
        }
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