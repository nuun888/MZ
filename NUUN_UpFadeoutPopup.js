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
 * @plugindesc アップフェードアウトポップアップ
 * @author NUUN
 * @version 1.0.0
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
 * 2022/6/18 Ver.1.0.0
 * 初版
 * 
 * @param PopupClass
 * @text 適用クラス
 * @desc 適用させるクラスを設定をします。
 * @default []
 * @type struct<ClassList>[]
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
Imported.NUUN_UpFadeoutPopup = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_UpFadeoutPopup');
    const PopupClass = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PopupClass'])) : null) || [];

    function upFadeoutPopupSprite(className) {
        return PopupClass.find(_class => _class.ClassName === className);
    }

    const _Sprite_Damage_initialize = Sprite_Damage.prototype.initialize;
    Sprite_Damage.prototype.initialize = function() {
        _Sprite_Damage_initialize.call(this);
        this._upFadeoutPopupClass = !!upFadeoutPopupSprite(String(this.constructor.name));
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
            if (this._duration < 10) {
                this.opacity = (this.getUpFadeoutOpacity() * this._duration) / 10;
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