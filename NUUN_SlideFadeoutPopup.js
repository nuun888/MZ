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
 * @plugindesc スライドフェードアウトポップアップ
 * @author NUUN
 * @version 1.0.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_popUp
 * 
 * @help
 * ポップアップの動作を横にスライドしてフェードアウトするように変更します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/6/19 Ver.1.0.0
 * 初版
 * 
 * @param PopupClass
 * @text クラス毎ウィンドウスキン
 * @desc クラス毎のウィンドウスキンの設定をします。
 * @default []
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
 * @desc 戦闘結果の文字の表示位置を指定します。
 * @text 戦闘結果文字の位置
 * @type select
 * @option 左方向
 * @value "left"
 * @option 右方向
 * @value "right"
 * @default "right"
 * 
 */
/*~struct~ClassList:
 * 
 * @param ClassName
 * @text 変更ウィンドウ設定
 * @desc 変更するウィンドウクラスを指定します。リストにないクラスは直接該当するクラスを記入してください。
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
        this._slideFadeoutPopupClass = SlideFadeoutPupupSprite(String(this.constructor.name));
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