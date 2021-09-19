/*:-----------------------------------------------------------------------------------
 * NUUN_GaugeImage.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc ゲージ画像化
 * @author NUUN
 * @version 1.0.1
 * @base NUUN_Base
 * 
 * @help
 * ゲージを画像化します。
 * 
 * 画像表示幅：画像の表示範囲高さエリア
 * 画像表示高さ：画像の表示範囲高さエリア
 * 画像表示座標X：画像の表示されるX位置
 * 画像表示座標Y：画像の表示されるY位置
 * メインゲージの表示座標X：メインゲージのX座標（相対）
 * メインゲージの表示座標Y：メインゲージのY座標（相対）
 * 特定条件：HPが瀕死の時に設定した画像に切り替わります。
 *          TPBがキャストタイム中なら設定した画像に切り替わります。(別途キャストタイムを可視化できるプラグインが必要です)
 * 
 * 'result_exp'　リザルト獲得経験値ゲージ
 * 'exp' ステータス画面経験値ゲージ
 * 
 * このプラグインはコアスクリプトVer.1.3.3以降でみ対応です。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/9/20 Ver.1.0.1
 * 当プラグインに対応していないゲージで、ゲージが表示されない問題を修正。
 * 2021/9/20 Ver.1.0.0
 * 初版
 * 
 * 
 * @param GaugeImgList
 * @text ゲージ画像設定
 * @desc ゲージ画像設定
 * @type struct<GaugeImg>[]
 * @default []
 * 
 */
/*~struct~GaugeImg:
 * 
 * @param Type
 * @text 表示対象
 * @desc 表示対象
 * @type combo[]
 * @option 'hp'
 * @option 'mp'
 * @option 'tp'
 * @option 'time'
 * @option 'result_exp'
 * @option 'exp'
 * @default 
 * 
 * @param GaugeImg
 * @desc ゲージファイル名を指定します。
 * @text ゲージ画像
 * @type file[]
 * @dir img/
 * @default []
 * 
 * @param GaugeImgVariable
 * @text 画像拡大縮小
 * @desc 画像を拡大縮小します。
 * @type boolean
 * @default true
 * 
 * @param GaugeOffSetX
 * @desc 全ゲージ画像のオフセット座標X
 * @text 全ゲージ画像オフセット座標X
 * @type number
 * @default 0
 * 
 * @param GaugeBaseWidth
 * @desc ゲージの表示横幅
 * @text ゲージ表示横幅
 * @type number
 * @default 128
 * @min 0
 * 
 * @param GaugeInclined
 * @desc 傾斜率
 * @text 傾斜率
 * @type number
 * @default 0
 * @min -99
 * 
 * @param GaugeWidth
 * @desc 背景ゲージ画像のトリミング横幅
 * @text 背景ゲージ画像トリミング横幅
 * @type number
 * @default 0
 * @min 0
 * 
 * @param GaugeHeight
 * @desc 背景ゲージ画像のトリミング高さ
 * @text 背景ゲージ画像トリミング高さ
 * @type number
 * @default 0
 * 
 * @param GaugeSX
 * @desc 背景ゲージ画像のトリミング座標X
 * @text 背景ゲージ画像トリミング座標X
 * @type number
 * @default 0
 * 
 * @param GaugeSY
 * @desc 背景ゲージ画像のトリミング座標Y
 * @text 背景ゲージ画像トリミング座標Y
 * @type number
 * @default 0
 * 
 * @param GaugeX
 * @desc メインゲージの表示座標X
 * @text メインゲージの表示座標X
 * @type number
 * @default 0
 * 
 * @param GaugeY
 * @desc メインゲージの表示座標Y
 * @text メインゲージの表示座標Y
 * @type number
 * @default 0
 * 
 * @param MainGaugeWidth
 * @desc メインゲージ画像のトリミング横幅
 * @text メインゲージ画像トリミング横幅
 * @type number
 * @default 0
 * 
 * @param MainGaugeHeight
 * @desc メインゲージ画像のトリミング高さ
 * @text メインゲージ画像トリミング高さ
 * @type number
 * @default 0
 * 
 * @param MainGaugeSX
 * @desc メインゲージ画像のトリミング座標X
 * @text メインゲージ画像トリミング座標X
 * @type number
 * @default 0
 * 
 * @param MainGaugeSY
 * @desc メインゲージ画像のトリミング座標Y
 * @text メインゲージ画像トリミング座標Y
 * @type number
 * @default 0
 * 
 * @param MainGaugeWidth2
 * @desc 特定条件下でのメインゲージ画像のトリミング横幅
 * @text 特定条件メインゲージ画像トリミング横幅
 * @type number
 * @default 0
 * 
 * @param MainGaugeHeight2
 * @desc 特定条件下メインゲージ画像のトリミング高さ
 * @text 特定条件メインゲージ画像トリミング高さ
 * @type number
 * @default 0
 * 
 * @param MainGaugeSX2
 * @desc 特定条件下メインゲージ画像のトリミング座標X
 * @text 特定条件メインゲージ画像トリミング座標X
 * @type number
 * @default 0
 * 
 * @param MainGaugeSY2
 * @desc 特定条件下メインゲージ画像のトリミング座標Y
 * @text 特定条件メインゲージ画像トリミング座標Y
 * @type number
 * @default 0
 * 
 */
var Imported = Imported || {};
Imported.NUUN_GaugeImage = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_GaugeImage');
  const GaugeImgList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['GaugeImgList'])) : null) || [];
  let imgSprite = null;

  function isGaugeImage(statusType) {
    return GaugeImgList.find(data => data.Type[0] === statusType && data.GaugeImg && data.GaugeImg[0]);
  };

  const _Window_StatusBase_placeGauge = Window_StatusBase.prototype.placeGauge;
  Window_StatusBase.prototype.placeGauge = function(actor, type, x, y) {
    this.placeGaugeImg(actor, type, x, y);
    _Window_StatusBase_placeGauge.call(this, actor, type, x, y);
  };

  Window_StatusBase.prototype.placeGaugeImg = function(actor, type, x, y) {
    imgSprite = null;
    if (isGaugeImage(type)) {
      const key = "actor%1-gaugeImg-%2".format(actor.actorId(), type);
      const sprite = this.createInnerSprite(key, Sprite_GaugeImg);
      imgSprite = sprite;
      sprite.setup(type);
      sprite.move(x, y);
      sprite.show();
    }
  };


  Sprite.prototype.isGaugeImage = function(statusType) {
    return GaugeImgList.find(data => data.Type[0] === statusType && data.GaugeImg && data.GaugeImg[0]);
  };


  function Sprite_GaugeImg() {
    this.initialize(...arguments);
  }

  Sprite_GaugeImg.prototype = Object.create(Sprite.prototype);
  Sprite_GaugeImg.prototype.constructor = Sprite_Gauge;

  Sprite_GaugeImg.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
  };

  Sprite_GaugeImg.prototype.createBitmap = function() {
    const width = this.bitmapWidth();
    const height = this.bitmapHeight();
    this.bitmap = new Bitmap(width, height);
  };

  Sprite_GaugeImg.prototype.bitmapWidth = function() {
    return this._gaugeImgData.GaugeBaseWidth || 128;
  };

  Sprite_GaugeImg.prototype.bitmapHeight = function() {
    return 32;
  };

  Sprite_GaugeImg.prototype.setup = function(statusType) {
    this._statusType = statusType;
    this._gaugeImgData = this.isGaugeImage(statusType);
    this.createBitmap();
    this.createGaugeBitmap();
  };

  Sprite_GaugeImg.prototype.createGaugeBitmap = function() {
    const width = this.bitmapWidth();
    const height = this.bitmapHeight();
    this.createGaugeImges(width, height);
    this.createMainGaugeImges(width, height);
  };

  Sprite_GaugeImg.prototype.createGaugeImges = function(width, height) {
    if (!this._baseGaugeSprite) {
      const sprite = new Sprite();
      this.addChild(sprite);
      sprite.bitmap = new Bitmap(width, height);
      this._baseGaugeSprite = sprite;
    }
  };

  Sprite_GaugeImg.prototype.createMainGaugeImges = function(width, height) {
    if (!this._mainGaugeSprite) {
      const sprite = new Sprite();
      this.addChild(sprite);
      sprite.bitmap = new Bitmap(width, height);
      this._mainGaugeSprite = sprite;
    }
  };


  const _Sprite_Gauge_setup = Sprite_Gauge.prototype.setup;
  Sprite_Gauge.prototype.setup = function(battler, statusType) {
    this._gaugeImgData = imgSprite ? this.isGaugeImage(statusType) : null;
    if (this._gaugeImgData) {
      this.defaultGaugeImg();
      this.setGaugeImg();
      imgSprite = null;
    }
    _Sprite_Gauge_setup.call(this, battler, statusType);
  };

  Sprite_Gauge.prototype.setGaugeImg = function() {
    if (imgSprite) {
      this._gaugeImgSprite = imgSprite;
      this._baseGaugeSprite = imgSprite._baseGaugeSprite;
      this._mainGaugeSprite = imgSprite._mainGaugeSprite;
      this.createGaugeBitmap();
    }
  };

  Sprite_Gauge.prototype.createGaugeBitmap = function() {;
    if (this._gaugeImgSprite) {
      const data = this._gaugeImgData;
      const bitmap = ImageManager.nuun_LoadPictures(data.GaugeImg[0]);
      this._gaugeBitmap = bitmap;
      if (!bitmap.isReady()) {
        bitmap.addLoadListener(this.baseGaugeSetup.bind(this, bitmap, data));
      } else {
        this.baseGaugeSetup(bitmap, data);
      }
    }
  };

  Sprite_Gauge.prototype.baseGaugeSetup  = function(bitmap, data) {
    const sx = data.GaugeSX;
    const sy = data.GaugeSY;
    const sw = data.GaugeWidth;
    const sh = data.GaugeHeight;
    const x = this.gaugeX() + data.GaugeOffSetX;
    const y = this.textHeight() - data.GaugeHeight;//Ver.1.3.3以降
    const gaugewidth = data.GaugeImgVariable ? this.bitmapWidth() - x : sw;
    const context = this._baseGaugeSprite.bitmap.context;
    context.setTransform(1, 0, this.gaugeInclinedRate(data), 1, 0, 0);
    this._baseGaugeSprite.bitmap.blt(bitmap, sx, sy, sw, sh, x, y, gaugewidth);
    this.mainGaugeSetup(bitmap, data);
  };

  Sprite_Gauge.prototype.mainGaugeSetup  = function(bitmap, data) {
    const context = this._mainGaugeSprite.bitmap.context;
    context.setTransform(1, 0, this.gaugeInclinedRate(data), 1, 0, 0);
  };

  const _Sprite_Gauge_drawGaugeRect = Sprite_Gauge.prototype.drawGaugeRect;
  Sprite_Gauge.prototype.drawGaugeRect = function(x, y, width, height) {
    if (this._gaugeImgSprite) {
      this._mainGaugeSprite.bitmap.clear();
      const data = this._gaugeImgData;
      const gaugeX = this.gaugeX();
      const sx = this._mainGaugeSX;
      const sy = this._mainGaugeSY;
      const sw = this._mainGaugeWidth;
      const sh = this._mainGaugeHeight;
      const rate = this.gaugeRate();
      const dw = Math.floor((data.GaugeWidth - sw) / 2 * rate);
      const gaugeWidth = Math.floor(sw * rate);
      const x = gaugeX + data.GaugeX + data.GaugeOffSetX;
      const y = this.textHeight() - sh + data.GaugeY;//Ver.1.3.3以降;
      const w = data.GaugeImgVariable ? (width - dw - data.GaugeOffSetX) * rate : gaugeWidth;
      this._mainGaugeSprite.bitmap.blt(this._gaugeBitmap, sx, sy, gaugeWidth, sh, x, y, w);
    } else {
      _Sprite_Gauge_drawGaugeRect.call(this, x, y, width, height);
    }
  };

  Sprite_Gauge.prototype.gaugeInclinedRate  = function(data) {
    return data.GaugeInclined / 100;
  };

  const _Sprite_Gauge_updateBitmap = Sprite_Gauge.prototype.updateBitmap;
  Sprite_Gauge.prototype.updateBitmap = function() {
    _Sprite_Gauge_updateBitmap.call(this);
    this.updateGaugeImg();
  };

  Sprite_Gauge.prototype.updateGaugeImg  = function() {
    if (this._gaugeImgSprite) {
      if (this._statusType == 'hp' && this._battler.isDying()) {
        this.changeGaugeImg();
      } else if ((this._statusType == 'time'  || this._statusType == 'cast') && this._battler.isTpbCast()) {
        this.changeGaugeImg();
      } else {
        this.defaultGaugeImg();
      }
    }
  };

  Sprite_Gauge.prototype.changeGaugeImg  = function() {
    const data = this._gaugeImgData;
    if (data.MainGaugeWidth2 > 0 && data.MainGaugeHeight2 > 0) {
      this._mainGaugeSX = data.MainGaugeSX2;
      this._mainGaugeSY = data.MainGaugeSY2;
      this._mainGaugeWidth = data.MainGaugeWidth2;
      this._mainGaugeHeight = data.MainGaugeHeight2;
    }
  };

  Sprite_Gauge.prototype.defaultGaugeImg  = function() {
    const data = this._gaugeImgData;
    this._mainGaugeSX = data.MainGaugeSX;
    this._mainGaugeSY = data.MainGaugeSY;
    this._mainGaugeWidth = data.MainGaugeWidth;
    this._mainGaugeHeight = data.MainGaugeHeight;
  };

  Game_Battler.prototype.isTpbCast = function() {
    return this._tpbState === "casting" && this.tpbRequiredCastTime() > 0 || this.isActing() || this._tpbState === "ready";
  };


})();