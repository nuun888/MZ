/*:-----------------------------------------------------------------------------------
 * NUUN_LateralBoundPopUp.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc 横バウンドポップアップ
 * @author NUUN
 * @version 1.0.3
 * @orderBefore BattleEffectPopup
 * 
 * @help
 * ポップアップの表示を上にバウンドから左右にバウンドさせながら表示させます。
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
 * 2022/6/18 Ver.1.0.3
 * クラス毎に適用できる機能を追加。
 * 2022/5/2 Ver.1.0.2
 * 他プラグインでの横バインド化対応による定義修正。
 * 2022/5/2 Ver.1.0.1
 * 微修正。
 * 2022/5/1 Ver.1.0.0
 * 初版
 * 
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
Imported.NUUN_LateralBoundPopUp = true;

(() => {
const parameters = PluginManager.parameters('NUUN_LateralBoundPopUp');
const PopupClass = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PopupClass'])) : null) || [];
const PopUpDuration = Number(parameters['PopUpDuration'] || 120);

function LateralBoundPupupSprite(className) {
    return PopupClass.some(_class => _class.ClassName === className);
}

const _Sprite_Battler_createDamageSprite = Sprite_Battler.prototype.createDamageSprite;
Sprite_Battler.prototype.createDamageSprite = function() {
    _Sprite_Battler_createDamageSprite.call(this);
    this._damages[this._damages.length - 1].setupPosition(this.x + this.damageOffsetX(), this.y + this.damageOffsetY());
};


const _Sprite_Damage_initialize = Sprite_Damage.prototype.initialize;
Sprite_Damage.prototype.initialize = function() {
    _Sprite_Damage_initialize.call(this);
    this._damageClass = !!LateralBoundPupupSprite(String(this.constructor.name));
    if (this._damageClass) {
        this._duration = PopUpDuration;
        this.setRondomMoveX();
    }
};

Sprite_Damage.prototype.setupPosition = function(x, y) {
    if (this._damageClass) {
        this.x = x;
        this.y = y;
    }
};

Sprite_Damage.prototype.setRondomMoveX = function() {
    this.MoveX = Math.random() * 2.2 - 1.1;
};

const _Sprite_Damage_setup = Sprite_Damage.prototype.setup;
Sprite_Damage.prototype.setup = function(target) {
    _Sprite_Damage_setup.call(this, target);
    if (this._damageClass) {
        this.setLateralBoundPopUp();
    }
};

Sprite_Damage.prototype.setLateralBoundPopUp = function() {
    this.popup_dy();
};

Sprite_Damage.prototype.popup_dy = function() {
    for (const child of this.children) {
        child.dy = 8;
    }
};

const _Sprite_Damage_updateChild = Sprite_Damage.prototype.updateChild;
Sprite_Damage.prototype.updateChild = function(sprite) {
    if (this._damageClass) {
        if (!sprite.dy) {
            sprite.dy = 8;
        }
        sprite.dy += 0.21;
        sprite.ry += sprite.dy;
        if (sprite.ry >= 0) {
            sprite.ry = 0;
            sprite.dy *= -0.7;
            this.setRondomMoveX();
        }
        sprite.x += this.MoveX;
        sprite.y = Math.round(sprite.ry);
        sprite.setBlendColor(this._flashColor);
    } else {
        _Sprite_Damage_updateChild.call(this, sprite);
    }
};

})();