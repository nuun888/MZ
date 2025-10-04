/*:-----------------------------------------------------------------------------------
 * NUUN_LateralBoundPopUp.js
 * 
 * Copyright (C) 2022 NUUN
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Bound popup
 * @author NUUN
 * @version 1.1.4
 * @orderBefore BattleEffectPopup
 * 
 * @help
 * Makes the popup display appear while bouncing upwards.
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
 * Adult content: Possible
 * Modifications: Possible
 * Redistribution: Possible
 * Support is not available for modified versions or downloads from sources other than https://github.com/nuun888/MZ, the official forum, or authorized retailers.
 * 
 * Log
 * 10/4/2025 Ver.1.1.4
 * Bound handling correction.
 * 2/2/2025 Ver.1.1.3
 * Fixed a possible conflict.
 * 12/5/2022 Ver.1.1.2
 * Definition correction by "NUUN_popUp" update.
 * 12/4/2022 Ver.1.1.1
 * Fixed description of apply popup setting.
 * 11/26/2022 Ver.1.1.0
 * Added a function that allows you to specify the coefficient of bounce.
 * Changed the display in languages other than Japanese to English.
 * 6/18/2022 Ver.1.0.3
 * Added a function that can be applied to each class.
 * 5/2/2022 Ver.1.0.2
 * Modified the definition by supporting horizontal binding with other plug-ins.
 * 5/2/2022 Ver.1.0.1
 * Minor fix.
 * 5/1/2022 Ver.1.0.0
 * First edition.
 * 
 * 
 * @param PopupClass
 * @text Applicable class
 * @desc Set the class to apply.
 * @default ["{\"ClassName\":\"'Sprite_Damage'\"}"]
 * @type struct<ClassList>[]
 * 
 * @param PopUpDuration 
 * @desc Number of popup display frames. (default 120)
 * @text Number of popup display frames
 * @type number
 * @default 120
 * 
 * @param BoundHeight
 * @desc Bouncy height of the bounce. The higher you set it, the higher it will bounce.(default 8)
 * @text Bounce height(default 8)
 * @type number
 * @default 8
 * 
 * @param BoundGravity
 * @desc bounce momentum. The higher it is, the less it bounces. (decimal)(default 0.21)
 * @text Bounce momentum
 * @type string
 * @default 0.21
 * 
 * @param BoundRepulsion
 * @desc Degree of repulsion. The higher the value, the greater the momentum gradually. (decimal, default 0.7)
 * @text Degree of repulsion
 * @type string
 * @default 0.7
 * 
 * @param BoundRange
 * @desc The amount of horizontal bind movement. (decimal) (default 2.2)
 * @text Lateral movement
 * @type string
 * @default 2.2
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
 * @plugindesc バウンドポップアップ
 * @author NUUN
 * @version 1.1.4
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
 * クレジット表記：任意
 * 商業利用：可能
 * 成人向け：可能
 * 改変：可能
 * 再配布：可能
 * https://github.com/nuun888/MZ、公式フォーラム、正規販売サイト以外からのダウンロード、改変済みの場合はサポートは対象外となります。
 * 
 * 更新履歴
 * 2025/10/4 Ver.1.1.4
 * バウンドの処理の修正。
 * 2025/2/2 Ver.1.1.3
 * 競合が起きる可能性がある処理を修正。
 * 2022/12/5 Ver.1.1.2
 * ポップアッププラグイン更新による定義修正。
 * 2022/12/4 Ver.1.1.1
 * 適用ポップアップ設定の説明文を修正。
 * 2022/11/26 Ver.1.1.0
 * バウンドの係数を指定できる機能を追加。
 * 日本語以外での表示を英語表示に変更。
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
 * @param BoundHeight
 * @desc バウンドの弾み高さ。高くするほど高く弾みます。(デフォルト8)
 * @text バウンドの弾み高さ
 * @type number
 * @default 8
 * 
 * @param BoundGravity
 * @desc バウンド弾み度。高くするほど弾みません。(小数)(デフォルト0.21)
 * @text バウンド弾み度
 * @type string
 * @default 0.21
 * 
 * @param BoundRepulsion
 * @desc 反発度。高いほど弾みが徐々に大きくなります。(小数)(デフォルト0.7)
 * @text 反発度
 * @type string
 * @default 0.7
 * 
 * @param BoundRange
 * @desc 横バウンド範囲の最大移動量。(小数)(デフォルト2.2)
 * @text 横移動量
 * @type string
 * @default 2.2
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
Imported.NUUN_LateralBoundPopUp = true;

(() => {
const parameters = PluginManager.parameters('NUUN_LateralBoundPopUp');
const PopupClass = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PopupClass'])) : null) || [];
const PopUpDuration = Number(parameters['PopUpDuration'] || 120);
const BoundHeight = Number(parameters['BoundHeight'] || 8);
const BoundGravity = Number.parseFloat(parameters['BoundGravity']) || 0.21;
const BoundRepulsion = Number.parseFloat(parameters['BoundRepulsion']) || 0.7;
const BoundRange = Number.parseFloat(parameters['BoundRange']) || 2.2;
const BoundRange_c = BoundRange / 2;

function LateralBoundPupupSprite(className) {
    return PopupClass.some(_class => _class.ClassName === className);
}



const _Sprite_Battler_createDamageSprite = Sprite_Battler.prototype.createDamageSprite;
Sprite_Battler.prototype.createDamageSprite = function() {
    _Sprite_Battler_createDamageSprite.call(this);
    if (this._damages[this._damages.length - 1]) {
        this._damages[this._damages.length - 1].setupPosition(this.x + this.damageOffsetX(), this.y + this.damageOffsetY());
    }
};


const _Sprite_Damage_initialize = Sprite_Damage.prototype.initialize;
Sprite_Damage.prototype.initialize = function() {
    _Sprite_Damage_initialize.call(this);
    this._damageClass = !!LateralBoundPupupSprite(String(this.constructor.name)) || this._popupMode === 1;
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
    this.MoveX = Math.random() * BoundRange - BoundRange_c;
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
        child.dy = BoundHeight;
    }
};

const _Sprite_Damage_updateChild = Sprite_Damage.prototype.updateChild;
Sprite_Damage.prototype.updateChild = function(sprite) {
    if (this._damageClass) {
        if (!sprite.dy) {
            sprite.dy = BoundHeight;
        }
        sprite.dy += BoundGravity;//0.21;
        sprite.ry += sprite.dy;
        if (sprite.ry >= 0) {
            sprite.ry = 0;
            sprite.dy *= -BoundRepulsion;//-0.7;
            this.setRondomMoveX();
        }
        sprite.y = Math.round(sprite.ry);
        sprite.x += sprite.y < 0 ? this.MoveX : 0;
        sprite.setBlendColor(this._flashColor);
    } else {
        _Sprite_Damage_updateChild.call(this, sprite);
    }
};

})();