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
 * @version 1.0.2
 * @base NUUN_Base
 * @orderAfter NUUN_Base
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
 * This plugin is distributed under the MIT license.
 * 
 * Log
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
 * @default []
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
 * @version 1.0.2
 * @base NUUN_Base
 * @orderAfter NUUN_Base
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
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
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
 * @default []
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
    const parameters = PluginManager.parameters('NUUN_UpFadeoutPopup');
    const PopupClass = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PopupClass'])) : null) || [];
    const PopUpDuration = Number(parameters['PopUpDuration'] || 90);
    const FadeoutFlame = Number(parameters['FadeoutFlame'] || 20);

    function upFadeoutPopupSprite(className) {
        return PopupClass.find(_class => _class.ClassName === className);
    }

    const _Sprite_Damage_initialize = Sprite_Damage.prototype.initialize;
    Sprite_Damage.prototype.initialize = function() {
        _Sprite_Damage_initialize.call(this);
        this._upFadeoutPopupClass = !!upFadeoutPopupSprite(String(this.constructor.name)) || this._popupMode === 3;
        if (this._upFadeoutPopupClass) {
            this._duration = PopUpDuration;
        }
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
            if (this._duration < FadeoutFlame) {
                this.opacity = (this.getUpFadeoutOpacity() * this._duration) / FadeoutFlame;
            }
        } else {
            _Sprite_Damage_updateOpacity.call(this);
        }
    };

    Sprite_Damage.prototype.getUpFadeoutOpacity = function() {
        if (!this._upFadeoutOpacity) {
            this._upFadeoutOpacity = this.opacity;
        }
        return this._upFadeoutOpacity;
    };

})();