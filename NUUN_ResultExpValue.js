/*:-----------------------------------------------------------------------------------
 * NUUN_ResultExpValue.js
 * 
 * Copyright (C) 2025 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Numerical imaging of acquired experience points
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_Result
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_Result
 * @version 1.0.0
 * 
 * @help
 * The experience points gained will be displayed as an image.
 * This plugin is an extension plugin of "NUUN_Result".
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 4/13/2025 Ver.1.0.0
 * First edition.
 * 
 * @param ValueImg
 * @desc Specify the numeric image file name.
 * @text Digital Image
 * @type file
 * @dir img/
 * @default 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 獲得経験値数値画像化
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_Result
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_Result
 * @version 1.0.0
 * 
 * @help
 * 獲得経験値の数値を画像にします。
 * このプラグインはNUUN_Resultの拡張プラグインです。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2025/4/13 Ver.1.0.0
 * 初版。
 * 
 * @param ValueImg
 * @desc 数値画像ファイル名を指定します。
 * @text 数値画像
 * @type file
 * @dir img/
 * @default 
 * 
 */


var Imported = Imported || {};
Imported.NUUN_ResultExpValue = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;
    ImageManager.nuun_LoadPictures(params.ValueImg);

    const _Sprite_ResultExpValue_initMembers =Sprite_ResultExpValue.prototype.initMembers;
    Sprite_ResultExpValue.prototype.initMembers = function() {
        _Sprite_ResultExpValue_initMembers.apply(this, arguments);
        this._digitSprite = null;
        this._valueImgBitmap = null;
        this._Digit = [];
    };

    const _Sprite_ResultExpValue_setup = Sprite_ResultExpValue.prototype.setup;
    Sprite_ResultExpValue.prototype.setup = function(battler, data) {
        this.createVauleImg();
        _Sprite_ResultExpValue_setup.apply(this, arguments);
    };

    Sprite_ResultExpValue.prototype.createVauleImg = function() {
        if (!!params.ValueImg) {
            this._digitSprite = new Sprite();
            this.addChild(this._digitSprite);
            this._digitSprite.bitmap = new Bitmap(this.bitmapWidth(), this.bitmapHeight());
            this._valueImgBitmap = ImageManager.nuun_LoadPictures(params.ValueImg);
        } else {
            this._valueImgBitmap = null;
        }
    };

    const _Sprite_ResultExpValue_redraw = Sprite_ResultExpValue.prototype.redraw;
    Sprite_ResultExpValue.prototype.redraw = function() {
        if (!!this._valueImgBitmap) {
            const data = this._data;
            const exp = this.maxLavel() ? 0 : this.expValue();
            const width = this.bitmapWidth();
            const height = this.bitmapHeight();
            this.setupFont();
            this.bitmap.clear();
            const systemWidth = data.SystemItemWidth || 60;
            this.bitmap.drawText(data.ParamName || '', 0, 0, systemWidth, height, "left");
            this.setupValueFont();
            this.bitmap.drawText('+', systemWidth + 8, 0, width - systemWidth - 8, height, "left");
            this.createDigits(exp);
        } else {
            _Sprite_ResultExpValue_redraw.apply(this, arguments);
        }
    };

    Sprite_ResultExpValue.prototype.createDigits = function(value) {
        for (const sprite of this._Digit) {
            if (sprite) {
                sprite.bitmap = null;
            }
        }
        const string = Math.abs(value).toString();
        const w = this.nuun_DigitWidth();
        const h = this.nuun_DigitHeight();
        const data = this._data;
        const systemWidth = data.SystemItemWidth || 60;
        for (let i = 0; i < string.length; i++) {
            const n = Number(string[i]);
            const sprite = this._Digit[i] ? this._Digit[i] : this.createChildSprite(w, h);
            sprite.bitmap = this._valueImgBitmap;
            sprite.setFrame(n * w, 0, w, h);
            sprite.x = this.drawValuePositionImg(w * (string.length - 1)) + i * w + (systemWidth + 24);
            sprite.y = 0;
            this._Digit[i] = sprite;
        }
    };

    Sprite_ResultExpValue.prototype.createChildSprite = function(width, height) {
        const sprite = new Sprite();
        sprite.bitmap = new Bitmap(width, height);
        sprite.anchor.x = 0.0;
        sprite.anchor.y = 0.0;
        sprite.y = 0;
        this._digitSprite.addChild(sprite);
        return sprite;
    };

    Sprite_ResultExpValue.prototype.drawValuePositionImg = function(width) {
        return 0;
    };

    Sprite_ResultExpValue.prototype.nuun_DigitWidth = function() {
        return this._valueImgBitmap.width / 10;
    };
    
    Sprite_ResultExpValue.prototype.nuun_DigitHeight = function() {
        return this._valueImgBitmap.height;
    };

    
})();