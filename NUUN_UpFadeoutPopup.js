/*:-----------------------------------------------------------------------------------
 * NUUN_UpFadeoutPopup.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Up Fadeout Popup
 * @author NUUN
 * @version 1.1.0
 * @orderAfter NUUN_PopupEx
 * @orderAfter NUUN_popUp
 * 
 * @help
 * Change the behavior of the popup to rise to the top and fade out.
 * 
 * Applicable class setting
 * Sprite_Damage:Default damage popup
 * Sprite_PopUpEX:NUUN_popUp.js
 * Sprite_PopupMessage:BattleEffectPopup.js
 * Please fill in classes not listed above directly in the text tab.
 * 
 * Terms of Use
 * Credit: Optional
 * Commercial use: Possible
 * Modifications: Possible
 * Redistribution: Possible
 * Support is not available for modified versions or downloads from sources other than https://github.com/nuun888/MZ, the official forum, or authorized retailers.
 * 
 * Log
 * 10/17/2026 Ver.1.1.0
 * Changed the specifications to allow the plugin to run without NUUN_Base.
 * Fixed an issue where multiple popup plugins were applied simultaneously.
 * 12/5/2022 Ver.1.0.2
 * Definition correction by "NUUN_popUp" update.
 * Fixed description of apply popup setting.
 * 6/19/2022 Ver.1.0.1
 * Added a function that allows you to specify the number of display frames and the number of fade-out frames.
 * 6/18/2022 Ver.1.0.0
 * First edition.
 * 
 * @param PopupClass
 * @text Applicable class
 * @desc Set the class to apply.
 * @default ["{\"ClassName\":\"'Sprite_Damage'\"}"]
 * @type struct<ClassList>[]
 * 
 * @param PopUpDuration 
 * @desc The number of popup display frames (default 90)
 * @text Popup display frame count
 * @type number
 * @default 90
 * 
 * @param FadeoutFlame
 * @desc Number of fade-out display frames (default 20)
 * @text Number of fade-out display frames
 * @type number
 * @default 20
 * 
 */
/*~struct~ClassList:
 * 
 * @param ClassName
 * @text Apply Popup Settings
 * @desc Specifies the popup sprite class to apply. Enter the class directly if the class is not on the list.
 * @type combo
 * @option 'Sprite_Damage'
 * @option 'Sprite_PopUpEX'
 * @option 'Sprite_PopupMessage'
 * @default
 * 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc アップフェードアウトポップアップ
 * @author NUUN
 * @version 1.1.0
 * @orderAfter NUUN_PopupEx
 * @orderAfter NUUN_popUp
 * 
 * @help
 * ポップアップの動作を上に上昇してフェードアウトするように変更します。
 * 
 * ※初期設定ではクラス指定していません。適用するクラスを選択し設定してください。
 * Sprite_Damage:ダメージポップアップ
 * Sprite_PopUpEX:ポップアッププラグイン
 * Sprite_PopupMessage:戦闘行動結果ポップアッププラグイン
 * 上記にないクラスはテキストタブで直接記入してください。
 * 空白または設定がない場合はすべてのクラスで表示されます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2026/10/17 Ver.1.1.0
 * NUUN_Baseなしで実行できるように仕様を変更。
 * 他ポップアッププラグインでの重複適用を修正。
 * 2022/12/5 Ver.1.1.2
 * ポップアッププラグイン更新による定義修正。
 * 適用ポップアップ設定の説明文を修正。
 * 2022/6/19 Ver.1.0.1
 * 表示フレーム数、フェードアウトフレーム数を指定できる機能を追加。
 * 2022/6/18 Ver.1.0.0
 * 初版
 * 
 * @param PopupClass
 * @text 適用クラス
 * @desc 適用させるクラスを設定をします。
 * @default ["{\"ClassName\":\"'Sprite_Damage'\"}"]
 * @type struct<ClassList>[]
 * 
 * @param PopUpDuration 
 * @desc ポップアップ表示フレーム数(デフォルト90)
 * @text ポップアップ表示フレーム数
 * @type number
 * @default 90
 * 
 * @param FadeoutFlame
 * @desc フェードアウト表示フレーム数(デフォルト20)
 * @text フェードアウト表示フレーム数
 * @type number
 * @default 20
 * 
 */
/*~struct~ClassList:ja
 * 
 * @param ClassName
 * @text 適用ポップアップ設定
 * @desc 適用するポップアップスプライトクラスを指定します。リストにないクラスは直接該当するクラスを記入してください。
 * @type combo
 * @option 'Sprite_Damage'
 * @option 'Sprite_PopUpEX'
 * @option 'Sprite_PopupMessage'
 * @default
 * 
 * 
 */

var Imported = Imported || {};
Imported.NUUN_UpFadeoutPopup = true;

(() => {
    class Nuun_PluginParams_UpFadeoutPopup {
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

    const params = Nuun_PluginParams_UpFadeoutPopup.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;

    function Nuun_UpFadeoutPopupManager() {
        throw new Error("This is a static class");
    }

    Nuun_UpFadeoutPopupManager.upFadeoutParams = function(code) {
        switch (code) {
            case 0:
                return params.PopupClass || [];
            case 1:
                return params.PopUpDuration || 90;
            case 2:
                return params.FadeoutFlame  || 20;
        }
    };

    Nuun_UpFadeoutPopupManager.upFadeoutPopupSprite = function(className) {
        const list = this.upFadeoutParams(0);
        if (!list || list.length === 0) return true;
        return list.some(_class => _class.ClassName === className);
    };

    const _Sprite_Damage_initialize = Sprite_Damage.prototype.initialize;
    Sprite_Damage.prototype.initialize = function() {
        _Sprite_Damage_initialize.apply(this, arguments);
        this._upFadeoutPopupClass = this.isUpFadeoutApplyPopup();
        if (this._upFadeoutPopupClass) {
            this._duration = Nuun_UpFadeoutPopupManager.upFadeoutParams(1);
        }
    };

    Sprite_Damage.prototype.isUpFadeoutApplyPopup = function() {
        return this._popupMode === 3 || (!!Nuun_UpFadeoutPopupManager.upFadeoutPopupSprite(String(this.constructor.name)) && this.otherUpFadeoutPopupCheck());
    };

    Sprite_Damage.prototype.otherUpFadeoutPopupCheck = function() {
        return !this._slideFadeoutPopupClass && !this._damageClass && (!!this._popupMode ? this._popupMode === 3 : true);
    };

    const _Sprite_Damage_updateChild = Sprite_Damage.prototype.updateChild;
    Sprite_Damage.prototype.updateChild = function(sprite) {
        if (this._upFadeoutPopupClass) {
            sprite.dy = -1;
            sprite.ry += sprite.dy;
            sprite.y = Math.round(sprite.ry);
            sprite.setBlendColor(this._flashColor);
        } else {
            _Sprite_Damage_updateChild.call(this, sprite);
        }
    };

    const _Sprite_Damage_updateOpacity = Sprite_Damage.prototype.updateOpacity;
    Sprite_Damage.prototype.updateOpacity = function() {
        if (this._upFadeoutPopupClass) {
            if (this._duration < Nuun_UpFadeoutPopupManager.upFadeoutParams(2)) {
                this.opacity = (this.getUpFadeoutOpacity() * this._duration) / Nuun_UpFadeoutPopupManager.upFadeoutParams(2);
            }
        } else {
            _Sprite_Damage_updateOpacity.apply(this, arguments);
        }
    };

    Sprite_Damage.prototype.getUpFadeoutOpacity = function() {
        if (!this._upFadeoutOpacity) {
            this._upFadeoutOpacity = this.opacity;
        }
        return this._upFadeoutOpacity;
    };

})();