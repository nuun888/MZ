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
 * @version 1.1.2
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @orderBefore NUUN_DamagePopUpSimulDisplay
 *            
 * @help
 * Change the damage popup to the same specifications as Maker MV. (Displays images instead of text)
 * The material standard must be a height that is divisible by the number set for the vertical divisions. There is no specification for the width.
 * If adding a TP popup (for damage, recovery), set the vertical divisions to 7.
 * Image index numbers start at 0 from the top.
 * Note that in order to use the Maker MV damage popup image "Damage.png", you must be a registered user of Maker MV.
 * 
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * log
 * 5/24/2025 Ver.1.1.2
 * Change display language other than Japanese to English.
 * 3/27/2022 Ver.1.1.1
 * Fixed an issue where the image index of the damage popup was misaligned.
 * 1/8/2022 Ver.1.1.0
 * Modified to allow more types of images to be assigned.
 * Modified to allow specifying the index number of each popup image.
 * 7/22/2021 Ver.1.0.0
 * First Edition
 * 
 * @param PopUpDamageImg
 * @desc Specify the file name of the damage image.
 * @text Damage image
 * @type file[]
 * @dir img/
 * @default 
 * 
 * @param BitmapBaseRows
 * @desc Number of vertical divisions of the image
 * @text Number of vertical divisions
 * @type number
 * @default 5
 * @min 1
 * 
 * @param HPDamageBaseRow
 * @desc HP Damage Popup Image Index
 * @text HP Damage Image Index
 * @type number
 * @default 0
 * @min 0
 * 
 * @param HPRecoveryBaseRow
 * @desc HP Damage Popup Image Index
 * @text HP Recovery Image Index
 * @type number
 * @default 1
 * @min 0
 * 
 * @param MPDamageBaseRow
 * @desc MP Damage Popup Image Index
 * @text MP Damage Image Index
 * @type number
 * @default 2
 * @min 0
 * 
 * @param MPRecoveryBaseRow
 * @desc MP recovery popup image index
 * @text MP Recovery Image Index
 * @type number
 * @default 3
 * @min 0
 * 
 * @param TPDamageBaseRow
 * @desc TP Damage Popup Image Index
 * @text TP Damage Image Index
 * @type number
 * @default 0
 * @min 0
 * 
 * @param TPRecoveryBaseRow
 * @desc TP recovery popup image index
 * @text TP Recovery Image Index
 * @type number
 * @default 1
 * @min 0
 * 
 * @param MissBaseRow
 * @desc Image index for failure popup
 * @text Image index on failure
 * @type number
 * @default 4
 * @min 0
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc ダメージポップアップ画像化
 * @author NUUN
 * @version 1.1.2
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @orderBefore NUUN_DamagePopUpSimulDisplay
 *            
 * @help
 * ダメージポップアップをツクールMVと同じ仕様に変更します。（文字ではなく画像で表示）
 * 素材規格は縦分割数で設定した数値で割り切れる高さにしてください。横幅は指定はありません。
 * TP用のポップアップ（ダメージ用、回復用）を追加する場合は縦分割数を7にしてください。
 * 画像のインデックス番号は一番上から0で始まります。
 * なおツクールMVのダメージポップアップ画像「Damage.png」を使用するにはのツクールMVのユーザ登録が必要です。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2025/5/24 Ver 1.1.2
 * 英語対応。
 * 2022/3/27 Ver 1.1.1
 * ダメージポップアップのイメージインデックスがずれる問題を修正。
 * 2022/1/8 Ver 1.1.0
 * 割り当てられる画像の種類を増やせるように修正。
 * 各ポップアップ画像のインデックス番号を指定できるように修正。
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
 * @param BitmapBaseRows
 * @desc 画像の縦の分割数
 * @text 縦分割数
 * @type number
 * @default 5
 * @min 1
 * 
 * @param HPDamageBaseRow
 * @desc HPダメージのポップアップの画像インデックス
 * @text HPダメージ画像インデックス
 * @type number
 * @default 0
 * @min 0
 * 
 * @param HPRecoveryBaseRow
 * @desc HP回復のポップアップの画像インデックス
 * @text HP回復画像インデックス
 * @type number
 * @default 1
 * @min 0
 * 
 * @param MPDamageBaseRow
 * @desc MPダメージのポップアップの画像インデックス
 * @text MPダメージ画像インデックス
 * @type number
 * @default 2
 * @min 0
 * 
 * @param MPRecoveryBaseRow
 * @desc MP回復のポップアップの画像インデックス
 * @text MP回復画像インデックス
 * @type number
 * @default 3
 * @min 0
 * 
 * @param TPDamageBaseRow
 * @desc TPダメージのポップアップの画像インデックス
 * @text TPダメージ画像インデックス
 * @type number
 * @default 0
 * @min 0
 * 
 * @param TPRecoveryBaseRow
 * @desc TP回復のポップアップの画像インデックス
 * @text TP回復画像インデックス
 * @type number
 * @default 1
 * @min 0
 * 
 * @param MissBaseRow
 * @desc 失敗時のポップアップの画像インデックス
 * @text 失敗時画像インデックス
 * @type number
 * @default 4
 * @min 0
 * 
 */

var Imported = Imported || {};
Imported.NUUN_DamagePopUpImg = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_DamagePopUpImg');
  const PopUpDamageImg = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PopUpDamageImg'])) : null) || [];
  const HPDamageBaseRow = Number(parameters['HPDamageBaseRow'] || 0);
  const HPRecoveryBaseRow = Number(parameters['HPRecoveryBaseRow'] || 1);
  const MPDamageBaseRow = Number(parameters['MPDamageBaseRow'] || 2);
  const MPRecoveryBaseRow = Number(parameters['MPRecoveryBaseRow'] || 3);
  const TPDamageBaseRow = Number(parameters['TPDamageBaseRow'] || 0);
  const TPRecoveryBaseRow = Number(parameters['TPRecoveryBaseRow'] || 1);
  const MissBaseRow = Number(parameters['MissBaseRow'] || 4);

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
    this._statusType = null;
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

  const _Sprite_Damage_setup = Sprite_Damage.prototype.setup;
  Sprite_Damage.prototype.setup = function(target) {
    const result = target.result();
    this._statusType = null;
    if (result.missed || result.evaded) {
      this._statusType = 'miss';
    } else if (result.hpAffected) {
      this._statusType = 'hp';
    } else if (result.mpDamage !== 0) {
      this._statusType = 'mp';
    } else if (result.tpDamage !== 0) {
      this._statusType = 'tp';
    }
    _Sprite_Damage_setup.call(this, target);
  };

  const _Sprite_Damage_createMiss = Sprite_Damage.prototype.createMiss;
  Sprite_Damage.prototype.createMiss = function() {
    if (this._damageBitmap) {
      const w = this.digitWidth();
      const h = this.digitHeight();
      const sprite = this.createChildSprite();
      sprite.setFrame(0, MissBaseRow * h, 4 * w, h);
      sprite.dy = 0;
    } else {
      _Sprite_Damage_createMiss.call(this);
    }
  };

  const _Sprite_Damage_createDigits = Sprite_Damage.prototype.createDigits;
  Sprite_Damage.prototype.createDigits = function(value) {
    if (this._damageBitmap) {
      const string = Math.abs(value).toString();
      const row = this.getBaseRow(value);
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

  Sprite_Damage.prototype.getBaseRow = function(value) {
    if (this._statusType === 'hp') {
      return value > 0 ? HPDamageBaseRow : HPRecoveryBaseRow;
    } if (this._statusType === 'mp') {
      return value > 0 ? MPDamageBaseRow : MPRecoveryBaseRow;
    } else if (this._statusType === 'tp') {
      return value > 0 ? TPDamageBaseRow : TPRecoveryBaseRow;
    } else {
      return value > 0 ? 0 : 1;
    }
  };

})();