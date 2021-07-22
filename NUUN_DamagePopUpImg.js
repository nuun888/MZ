/*:-----------------------------------------------------------------------------------
 * NUUN_DamagePopUpImg.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc ダメージポップアップ画像化
 * @author NUUN
 * @version 1.0.0
 *            
 * @help
 * ダメージポップアップをツクールMVと同じ仕様に変更します。（文字ではなく画像で表示）
 * ダメージ画像の規格はツクールMVと同じです。
 * なおツクールMVのダメージポップアップ画像「Damage.png」を使用するにはのツクールMVのユーザ登録が必要です。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/7/22 Ver 1.0.0
 * 初版
 * 
 * @param PopUpDamageImg
 * @desc ダメージ画像のファイル名を指定します。
 * @text ダメージ画像
 * @type file[]
 * @dir img/
 * @default 
 * 
 * 
 */

var Imported = Imported || {};
Imported.NUUN_DamagePopUpImg = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_DamagePopUpImg');
  const PopUpDamageImg = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PopUpDamageImg'])) : null) || [];

  const _Scene_Boot_loadSystemImages = Scene_Boot.prototype.loadSystemImages;
  Scene_Boot.prototype.loadSystemImages = function() {
    _Scene_Boot_loadSystemImages.call(this);
    if (PopUpDamageImg && PopUpDamageImg[0]) {
      ImageManager.nuun_LoadPictures(PopUpDamageImg[0]);
    }
  };


  const _Sprite_Damage_initialize = Sprite_Damage.prototype.initialize;
  Sprite_Damage.prototype.initialize = function() {
    _Sprite_Damage_initialize.call(this);
    if (this.constructor === Sprite_Damage) {
      this._damageBitmap = (PopUpDamageImg && PopUpDamageImg[0]) ? ImageManager.nuun_LoadPictures(PopUpDamageImg[0]) : null;
    }
    this._baseRow = 0;
  };

  Sprite_Damage.prototype.digitWidth = function() {
    return this._damageBitmap ? this._damageBitmap.width / 10 : 0;
  };

  Sprite_Damage.prototype.digitHeight = function() {
    return this._damageBitmap ? this._damageBitmap.height / 5 : 0;
  };
  
  const _Sprite_Damage_createBitmap = Sprite_Damage.prototype.createBitmap;
  Sprite_Damage.prototype.createBitmap = function(width, height) {
    if (this._damageBitmap) {
      return ImageManager.nuun_LoadPictures(PopUpDamageImg[0]);
    } else {
      return _Sprite_Damage_createBitmap.call(this, width, height);
    }
  };

  Sprite_Damage.prototype.destroy = function(options) {//再定義
    for (const child of this.children) {
      if (child.bitmap && !child.bitmap._image) {
          child.bitmap.destroy();
      }
    }
    Sprite.prototype.destroy.call(this, options);
  };

  const _Sprite_Damage_createMiss = Sprite_Damage.prototype.createMiss;
  Sprite_Damage.prototype.createMiss = function() {
    if (this._damageBitmap) {
      const w = this.digitWidth();
      const h = this.digitHeight();
      const sprite = this.createChildSprite();
      sprite.setFrame(0, 4 * h, 4 * w, h);
      sprite.dy = 0;
    } else {
      _Sprite_Damage_createMiss.call(this);
    }
  };

  const _Sprite_Damage_createDigits = Sprite_Damage.prototype.createDigits;
  Sprite_Damage.prototype.createDigits = function(value) {
    if (this._damageBitmap) {
      const string = Math.abs(value).toString();
      const row = this._baseRow + (value < 0 ? 1 : 0);
      const w = this.digitWidth();
      const h = this.digitHeight();
      for (var i = 0; i < string.length; i++) {
        const sprite = this.createChildSprite();
        const n = Number(string[i]);
        sprite.setFrame(n * w, row * h, w, h);
        sprite.x = (i - (string.length - 1) / 2) * w;
        sprite.dy = -i;
      }
    } else {
      _Sprite_Damage_createDigits.call(this, value);
    }
  };

  const _Sprite_Damage_setup = Sprite_Damage.prototype.setup;
  Sprite_Damage.prototype.setup = function(target) {
    const result = target.result();
    if (target.isAlive() && result.mpDamage !== 0) {
      this._baseRow = 2;
    }
    _Sprite_Damage_setup.call(this, target);
  };

})();