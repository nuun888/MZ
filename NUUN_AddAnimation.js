/*:-----------------------------------------------------------------------------------
 * NUUN_AddAnimation.js
 * 
 * Copyright (C) 2023 NUUN
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Additional animation display
 * @author NUUN
 * @version 1.3.0
 * 
 * @help
 * Play multiple or additional item/skill animations.
 * 
 * Skill and item notes
 * <AddAnimation:[id]> The set animation will be played continuously.
 * [id]:Plugin parameter "Additional animation settings" list ID or identifier.
 * 
 * Play after animation ends
 * Plays after all currently playing animations have finished.
 * Subsequent animations will have a wait time based on the animation that is set to play after the animation ends.
 * 
 * The old settings have been discontinued. Please use a version earlier than Ver.1.2.0.
 * 
 * Terms of Use
 * Credit: Optional
 * Commercial use: Possible
 * Adult content: Possible
 * Modifications: Possible
 * Redistribution: Possible
 * Support is not available for modified versions or downloads from sources other than https://github.com/nuun888/MZ, the official forum, or authorized retailers.
 * 
 * Log
 * 9/24/2026 Ver.1.3.0
 * Changed the specifications so that the plugin can run without NUUN_Base.
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
 * @default ["{\"IdentifierName\":\"\",\"AddAnimation\":\"[]\"}"]
 * @type struct<AnimationList>[]
 * 
 */
/*~struct~AnimationList:
 * 
 * @param IdentifierName
 * @text Identifier
 * @desc Specify an optional identifier. Make sure it does not duplicate any other animation setting identifier.
 * @type string
 * @default 
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
 * @text Wait
 * @desc Specifies the delay before the animation plays. Enter -1 to wait until it finishes.
 * @default 0
 * @min -1
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
 * @version 1.3.0
 * 
 * @help
 * アイテム、スキルのアニメーションを複数または追加で再生させます。
 * 
 * スキル、アイテムのメモ欄
 * <AddAnimation:[id]> 設定したアニメーションを連続再生します。
 * [id]:プラグインパラメータの追加アニメーション設定のリストIDまたは識別名
 * 
 * アニメーション終了後再生
 * 再生している全てのアニメーションが終了後に再生します。
 * それ以降のアニメーションはアニメーション終了後再生を設定しているアニメーション基準にウェイトが発生します。
 * 
 * 旧設定は廃止となりました。Ver.1.2.0以前のバージョンをご使用ください。
 * 
 * 利用規約
 * クレジット表記：任意
 * 商業利用：可能
 * 成人向け：可能
 * 改変：可能
 * 再配布：可能
 * https://github.com/nuun888/MZ、公式フォーラム、正規販売サイト以外からのダウンロード、改変済みの場合はサポートは対象外となります。
 * 
 * 更新履歴
 * 2026/9/24 Ver 1.3.0
 * NUUN_Baseなしで実行できるように仕様を変更。
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
 * @default ["{\"IdentifierName\":\"\",\"AddAnimation\":\"[]\"}"]
 * @type struct<AnimationList>[]
 * 
 */
/*~struct~AnimationList:ja
 * 
 * @param IdentifierName
 * @text 識別名
 * @desc 任意の識別名を設定します。必ず他のアニメーション設定と重複しない識別名を設定してください。
 * @type string
 * @default 
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
    class Nuun_PluginParams_AddAnimation {
        static getPluginParams(text) {//document.currentScript
            try {
                const name = String(Utils.extractFileName(text.src).split('.').shift());
                const params = PluginManager.parameters(name);
                if (params) {
                    const pluginParam = new Nuun_PluginParamData(params);
                    pluginParam.setPluginName(name);
                    return pluginParam.getParameters();
                }
                return {pluginName: name};
            } catch (error) {
                const log = ($gameSystem.isJapanese() ? "コアスクリプトをVer.1.3.2以降に更新してください。" : "Please update the core script to version 1.3.2 or later.");
                throw ["ParameterError", log];
            }
        }
    };

    window.Nuun_PluginParams_AddAnimation = Nuun_PluginParams_AddAnimation;

    class Nuun_PluginParamData {
        constructor(text) {
            this._parameters = JSON.parse(JSON.stringify(text, this._convertParams)) || {};
        }

        _convertParams(key, code) {
            try {
                return JSON.parse(code);
            } catch (e) {
                if (isNaN(code)) {
                    if (!code) {
                        return null;
                    }
                    try {
                        if (code.indexOf("'") === 0 || code.indexOf('"') === 0) {
                            return eval(code);//'または"を外す。
                        }
                        return !!code ? String(code) : null;
                    } catch (e) {
                        if (typeof {} === "object") {
                            return code;
                        }
                        return !!code ? String(code) : null;
                    }
                } else {
                    return String(code);
                }
            }
        }

        getParameters() {
            return this._parameters;
        }

        setPluginName(name) {
            this._parameters.pluginName = name;
        }


        getMetaTag(object, code) {
            const data = object.meta[code];
            let list = [];
            if (data !== undefined) {
                try {
                    list = data.split(',');
                } catch (error) {
                    return this.getTextCodeMeta(data);
                }
                list = list.map(a => this.getTextCodeMeta(a));
                return list;
            } else {
                return undefined;
            }
        }

        getTextCodeMeta(text) {
            if (isNaN(text)) {
                return text;
            } else {
                return Number(text);
            }
        }
    };

    const params = Nuun_PluginParams_AddAnimation.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;

    function NuunAddAnimationManager() {
        throw new Error("This is a static class");
    }

    window.NuunAddAnimationManager = NuunAddAnimationManager;

    NuunAddAnimationManager.getEvalCode = function(code) {
        if (isNaN(code)) {
            if (!code) {
                return null;
            }
            return this.stringCode(code);
        } else {
            return String(code);
        }
    };

    NuunAddAnimationManager.getMetaCode = function(object, method) {
        const meta = object.meta[method];
        if (!meta) return null;
        if (meta === true) {
            return null;
        }
        if (meta.indexOf('[') >= 0) {
            const log = ($gameSystem.isJapanese() ? "パラメータに[]が含まれています。[]を外して記入して下さい。" : "The parameter contains []. Please remove the [] and enter it.");
            throw ["ParameterError", log];
        }
        return meta;
    };

    NuunAddAnimationManager.getAddAnimation = function(id) {
        if (isNaN(id)) {
            return this.addAnimationParams(0).find(data => data.IdentifierName === id);
        } else {
            return this.addAnimationParams(0)[Number(id) - 1];
        }
    };

    NuunAddAnimationManager.addAnimationParams = function(code) {
        switch (code) {
            case 0:
                return params.AnimationSetting || [];
        }
    };

    const _Window_BattleLog_startAction = Window_BattleLog.prototype.startAction;
    Window_BattleLog.prototype.startAction = function(subject, action, targets) {
        this.setAddAnimationList(action.item(), subject, targets);
        _Window_BattleLog_startAction.apply(this, arguments);
    };

    const _Window_BattleLog_displayAction = Window_BattleLog.prototype.displayAction;
    Window_BattleLog.prototype.displayAction = function(subject, item) {
        this.pushAddAnimationList();
        _Window_BattleLog_displayAction.apply(this, arguments);
    };

    const _Window_BattleLog_clear = Window_BattleLog.prototype.clear;
    Window_BattleLog.prototype.clear = function() {
        $gameTemp.addAnimation = false;
        _Window_BattleLog_clear.apply(this, arguments);
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
        const animation = item.meta.AddAnimation ? NuunAddAnimationManager.getAddAnimation(NuunAddAnimationManager.getMetaCode(item, "AddAnimation") || 0) : 0;
        if (!!animation && !!animation.AddAnimation) {
            animation.AddAnimation.forEach(data => {
                this._addAnimationList.push({id: data.Animation, subject: subject, target: targets.clone(), mode: data.EndAnimationPlay, wait: data.AddAnimationWait});
            });
        }
    };

})();