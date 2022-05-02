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
 * @version 1.0.2
 * @orderBefore BattleEffectPopup
 * 
 * @help
 * ポップアップの表示を上にバウンドから左右にバウンドさせながら表示させます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/5/2 Ver.1.0.2
 * 他プラグインでの横バインド化対応による定義修正。
 * 2022/5/2 Ver.1.0.1
 * 微修正。
 * 2022/5/1 Ver.1.0.0
 * 初版
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_LateralBoundPopUp = true;

(() => {
const parameters = PluginManager.parameters('NUUN_LateralBoundPopUp');

Sprite_Battler.prototype.createDamageSprite = function() {//再定義
    const last = this._damages[this._damages.length - 1];
    const sprite = new Sprite_Damage();
    sprite.x = this.x + this.damageOffsetX();
    sprite.y = this.y + this.damageOffsetY();
    sprite.setup(this._battler);
    this._damages.push(sprite);
    this.parent.addChild(sprite);
};

const _Sprite_Damage_initialize = Sprite_Damage.prototype.initialize;
Sprite_Damage.prototype.initialize = function() {
    _Sprite_Damage_initialize.call(this);
    this._damageClass = !!(String(this.constructor.name) === 'Sprite_Damage');
    this.setRondomMoveX();
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
    this._duration = 120;
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