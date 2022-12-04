/*:-----------------------------------------------------------------------------------
 * NUUN_SlideFadeoutPopup.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Slide Fadeout Popup
 * @author NUUN
 * @version 1.0.1
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_popUp
 * 
 * @help
 * Change the behavior of the popup to slide sideways and fade out.
 * 
 * Applicable class setting
 * Sprite_Damage:Default damage popup
 * Sprite_PopUpEX:NUUN_popUp.js
 * Sprite_PopupMessage:BattleEffectPopup.js
 * Please fill in classes not listed above directly in the text tab.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 12/5/2022 Ver.1.0.1
 * Definition correction by "NUUN_popUp" update.
 * Fixed description of apply popup setting.
 * 6/19/2022 Ver.1.0.0
 * First edition.
 * 
 * @param PopupClass
 * @text Applicable class
 * @desc Set the class to apply.
 * @default ["{\"ClassName\":\"'Sprite_Damage'\"}"]
 * @type struct<ClassList>[]
 * 
 * @param PopUpDuration 
 * @desc The number of popup display frames (default 120)
 * @text Popup display frame count
 * @type number
 * @default 120
 * 
 * @param FadeoutFlame
 * @desc Number of fade-out display frames (default 20)
 * @text Number of fade-out display frames
 * @type number
 * @default 20
 * 
 * @param SlideDirection
 * @desc Direction to slide.
 * @text Slide direction
 * @type select
 * @option Left
 * @value "left"
 * @option Right
 * @value "right"
 * @default "right"
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
 * @plugindesc スライドフェードアウトポップアップ
 * @author NUUN
 * @version 1.0.1
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_popUp
 * 
 * @help
 * ポップアップの動作を横にスライドしてフェードアウトするように変更します。
 * 
 * 適用クラス設定
 * Sprite_Damage:ダメージポップアップ
 * Sprite_PopUpEX:ポップアッププラグイン
 * Sprite_PopupMessage:戦闘行動結果ポップアッププラグイン
 * 上記にないクラスはテキストタブで直接記入してください。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/12/5 Ver.1.0.1
 * ポップアッププラグイン更新による定義修正。
 * 適用ポップアップ設定の説明文を修正。
 * 2022/6/19 Ver.1.0.0
 * 初版
 * 
 * @param PopupClass
 * @text 適用クラス
 * @desc 適用させるクラスを設定をします。
 * @default ["{\"ClassName\":\"'Sprite_Damage'\"}"]
 * @type struct<ClassList>[]
 * 
 * @param PopUpDuration 
 * @desc ポップアップ表示フレーム数(デフォルト120)
 * @text ポップアップ表示フレーム数
 * @type number
 * @default 120
 * 
 * @param FadeoutFlame
 * @desc フェードアウト表示フレーム数(デフォルト20)
 * @text フェードアウト表示フレーム数
 * @type number
 * @default 20
 * 
 * @param SlideDirection
 * @desc スライドする方向。
 * @text スライド方向
 * @type select
 * @option 左方向
 * @value "left"
 * @option 右方向
 * @value "right"
 * @default "right"
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
Imported.NUUN_SlideFadeoutPopup = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_SlideFadeoutPopup');
    const PopupClass = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PopupClass'])) : null) || [];
    const SlideDirection = eval(parameters['SlideDirection']) || 'right';
    const PopUpDuration = Number(parameters['PopUpDuration'] || 120);
    const FadeoutFlame = Number(parameters['FadeoutFlame'] || 20);

    function SlideFadeoutPupupSprite(className) {
        return PopupClass.find(_class => _class.ClassName === className);
    }

    const _Sprite_Damage_initialize = Sprite_Damage.prototype.initialize;
    Sprite_Damage.prototype.initialize = function() {
        _Sprite_Damage_initialize.call(this);
        this._slideFadeoutPopupClass = SlideFadeoutPupupSprite(String(this.constructor.name)) || this._popupMode === 2;
        if (this._slideFadeoutPopupClass) {
            this._duration = PopUpDuration;
        }
    };

    const _Sprite_Damage_updateOpacity = Sprite_Damage.prototype.updateOpacity;
    Sprite_Damage.prototype.updateOpacity = function() {
        if (this._slideFadeoutPopupClass) {
            if (this._duration < FadeoutFlame) {
                this.opacity = (this.getSlideFadeoutOpacity() * this._duration) / FadeoutFlame;
                this.x += (SlideDirection === 'right' ? 1 : -1);
            }
        } else {
            _Sprite_Damage_updateOpacity.call(this);
        }
    };

    Sprite_Damage.prototype.getSlideFadeoutOpacity = function() {
        if (!this._slideFadeoutOpacity) {
            this._slideFadeoutOpacity = this.opacity;
        }
        return this._slideFadeoutOpacity;
    };

})();