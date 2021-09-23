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
 * @version 1.2.0
 * @base NUUN_Base
 * 
 * @help
 * ゲージを画像化します。
 * 
 * 前面画像、メインゲージ画像、特定条件ゲージ画像は画像設定していない場合は、背景画像設定のゲージ画像の画像が参照されます。
 * ラベル画像に関してはラベル画像で画像設定していない場合は元の処理が適用されます。
 * トリミングが指定されていない場合は画像の左上基準、画像のサイズで適用されます。
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
 * ゲージの画像化を戦闘中のみ反映させる場合はフィルタリングクラス設定で'Window_BattleStatus'、'Window_BattleActor'を設定してください。
 * 
 * 仕様
 * このプラグインはコアスクリプトVer.1.3.3以降でみ対応です。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/9/24 Ver.1.2.0
 * ラベルを画像化する機能を追加。
 * 画像を１枚にまとめなくとも表示できるように修正。
 * 画像が重複して表示されてしまう問題を修正。
 * 2021/9/22 Ver.1.1.1
 * メインゲージが正常に表示されない問題を修正。
 * 2021/9/20 Ver.1.1.0
 * フィルタリング機能を追加。
 * ゲージの前面に画像を表示出来る機能を追加。
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
 * @param GaugeImgVariable
 * @text ゲージ幅引き伸ばし
 * @desc ゲージを横幅に合わせ拡大縮小します。
 * @type boolean
 * @default false
 * 
 * @param GaugeImgScale
 * @text 画像拡大率
 * @desc 画像を拡大率を指定。
 * @type number
 * @default 100
 * 
 * @param GaugeOffSetX
 * @desc 全ゲージ画像のオフセット座標X
 * @text 全ゲージ画像オフセット座標X
 * @type number
 * @default 0
 * @min -999
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
 * @param BackImg
 * @text 背景画像設定
 * @default ------------------------------
 * 
 * @param GaugeImg
 * @desc ゲージ画像ファイル名を指定します。各画像設定で指定がない場合はこの画像が設定されます。
 * @text ゲージ画像
 * @type file[]
 * @dir img/
 * @default []
 * 
 * @param GaugeX
 * @desc 背景画像の表示オフセット位置X
 * @text 背景画像表示オフセット位置X
 * @type number
 * @default 0
 * @min -999
 * 
 * @param GaugeY
 * @desc 背景画像の表示オフセット位置Y
 * @text 背景画像表示オフセット位置Y
 * @type number
 * @default 0
 * @min -999
 * 
 * @param GaugeCorrectionWidth
 * @desc 背景画像の補正幅（表示幅からの差）
 * @text 背景画像補正幅
 * @type number
 * @default 0
 * @min -999
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
 * @param FrontImg
 * @text 前面画像設定
 * @default ------------------------------
 * 
 * @param FrontGaugeImg
 * @desc 前面画像ファイル名を指定します。
 * @text 前面画像
 * @type file[]
 * @dir img/
 * @default []
 * 
 * @param FrontGaugeX
 * @desc 前面画像の表示オフセット位置X
 * @text 前面画像表示オフセット位置X
 * @type number
 * @default 0
 * @min -999
 * 
 * @param FrontGaugeY
 * @desc 前面画像の表示オフセット位置Y
 * @text 前面画像表示オフセット位置Y
 * @type number
 * @default 0
 * @min -999
 * 
 * @param FrontGaugeWidth
 * @desc 前面ゲージ画像のトリミング横幅
 * @text 前面ゲージ画像トリミング横幅
 * @type number
 * @default 0
 * @min 0
 * 
 * @param FrontGaugeHeight
 * @desc 前面ゲージ画像のトリミング高さ
 * @text 前面ゲージ画像トリミング高さ
 * @type number
 * @default 0
 * 
 * @param FrontGaugeSX
 * @desc 前面ゲージ画像のトリミング座標X
 * @text 前面ゲージ画像トリミング座標X
 * @type number
 * @default 0
 * 
 * @param FrontGaugeSY
 * @desc 前面ゲージ画像のトリミング座標Y
 * @text 前面ゲージ画像トリミング座標Y
 * @type number
 * @default 0
 * 
 * @param MainImg
 * @text ゲージ画像設定
 * @default ------------------------------
 * 
 * @param MainGaugeImg
 * @desc メインゲージファイル名を指定します。
 * @text メインゲージ画像
 * @type file[]
 * @dir img/
 * @default []
 * 
 * @param MainGaugeX
 * @desc メインゲージの表示オフセット位置X
 * @text メインゲージ表示オフセット位置X
 * @type number
 * @default 0
 * @min -999
 * 
 * @param MainGaugeY
 * @desc メインゲージの表示オフセット位置Y
 * @text メインゲージ表示オフセット位置Y
 * @type number
 * @default 0
 * @min -999
 * 
 * @param MainGaugeCorrectionWidth
 * @desc メインゲージの補正幅（表示幅からの差）
 * @text メインゲージ補正幅
 * @type number
 * @default 0
 * @min -999
 * 
 * @param MainGaugeWidth
 * @desc メインゲージ画像のトリミング横幅
 * @text メインゲージ画像トリミング横幅
 * @type number
 * @default 0
 * @min 0
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
 * @param MainGaugeImg2
 * @desc 特定条件下でのメインゲージファイル名を指定します。
 * @text 特定条件メインゲージ画像
 * @type file[]
 * @dir img/
 * @default []
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
 * @param LabelImg
 * @text ラベル画像設定
 * @default ------------------------------
 * 
 * @param LabelGaugeImg
 * @desc ラベル画像ファイル名を指定します。
 * @text ラベル画像
 * @type file[]
 * @dir img/
 * @default []
 * 
 * @param LabelGaugeX
 * @desc 背景画像の表示オフセット位置X
 * @text 背景画像表示オフセット位置X
 * @type number
 * @default 0
 * @min -999
 * 
 * @param LabelGaugeY
 * @desc 背景画像の表示オフセット位置Y
 * @text 背景画像表示オフセット位置Y
 * @type number
 * @default 0
 * @min -999
 * 
 * @param LabelGaugeWidth
 * @desc 背景ゲージ画像のトリミング横幅
 * @text 背景ゲージ画像トリミング横幅
 * @type number
 * @default 0
 * @min 0
 * 
 * @param LabelGaugeHeight
 * @desc 背景ゲージ画像のトリミング高さ
 * @text 背景ゲージ画像トリミング高さ
 * @type number
 * @default 0
 * 
 * @param LabelGaugeSX
 * @desc 背景ゲージ画像のトリミング座標X
 * @text 背景ゲージ画像トリミング座標X
 * @type number
 * @default 0
 * 
 * @param LabelGaugeSY
 * @desc 背景ゲージ画像のトリミング座標Y
 * @text 背景ゲージ画像トリミング座標Y
 * @type number
 * @default 0
 * 
 * @param FilteringClass
 * @text フィルタリングクラス設定
 * @desc 適用するウィンドウクラスを指定します。無指定の場合は全てのウィンドウで反映されます。(複数指定可)
 * @type combo[]
 * @option 'Window_MenuStatus'
 * @option 'Window_MenuActor'
 * @option 'Window_Status'
 * @option 'Window_BattleStatus'
 * @option 'Window_BattleActor'
 * @option 'Window_BattleActorStatus'
 * @option 'Window_Result'
 * @option 'Window_FormationStatus'
 * @default
 * 
 */
var Imported = Imported || {};
Imported.NUUN_GaugeImage = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_GaugeImage');
  const GaugeImgList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['GaugeImgList'])) : null) || [];
  let imgSprite = null;

  GaugeImgList.forEach(data => {
    if (data.GaugeImg && data.GaugeImg[0]) {
      ImageManager.nuun_LoadPictures(data.GaugeImg[0])
    }
    if (data.FrontGaugeImg && data.FrontGaugeImg[0]) {
      ImageManager.nuun_LoadPictures(data.FrontGaugeImg[0])
    }
    if (data.MainGaugeImg && data.MainGaugeImg[0]) {
      ImageManager.nuun_LoadPictures(data.MainGaugeImg[0])
    }
    if (data.MainGaugeImg2 && data.MainGaugeImg2[0]) {
      ImageManager.nuun_LoadPictures(data.MainGaugeImg2[0])
    }
    if (data.LabelGaugeImg && data.LabelGaugeImg[0]) {
      ImageManager.nuun_LoadPictures(data.LabelGaugeImg[0])
    }
  })

  function isGaugeImage(statusType, className) {
    return GaugeImgList.find(data => data.Type[0] === statusType && data.GaugeImg && data.GaugeImg[0] && filteringClass(data, className));
  };

  function filteringClass(data, className) {
    if (!data.FilteringClass) {
      return true;
    }
    return data.FilteringClass.find(filterClass => filterClass === className);
  };

  const _Window_StatusBase_placeGauge = Window_StatusBase.prototype.placeGauge;
  Window_StatusBase.prototype.placeGauge = function(actor, type, x, y) {
    this.placeGaugeImg(actor, type, x, y);
    _Window_StatusBase_placeGauge.call(this, actor, type, x, y);
  };

  Window_StatusBase.prototype.placeGaugeImg = function(actor, type, x, y) {
    imgSprite = null;
    const className = String(this.constructor.name);
    if (isGaugeImage(type, className)) {
      const key = "actor%1-gaugeImg-%2".format(actor.actorId(), type);
      const sprite = this.createInnerSprite(key, Sprite_GaugeImg);
      imgSprite = sprite;
      sprite.setup(type, className);
      sprite.move(x, y);
      sprite.show();
    }
  };


  Sprite.prototype.isGaugeImage = function(statusType) {
    return GaugeImgList.find(data => data.Type[0] === statusType && data.GaugeImg && data.GaugeImg[0]);
  };

  Sprite.prototype.createGaugeImg = function(base, type) {
    const className = String(this.constructor.name);
    if (isGaugeImage(type, className)) {
      const sprite = new Sprite_GaugeImg();
      base.addChild(sprite);
      imgSprite = sprite;
      sprite.setup(type);
      sprite.move(0, 0);
      sprite.show();
    }
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
    this.createFrontGaugeImges(width, height);
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

  Sprite_GaugeImg.prototype.createFrontGaugeImges = function(width, height) {
    if (!this._frontGaugeSprite && getFrontImgData(this._gaugeImgData)) {
      const sprite = new Sprite();
      this.addChild(sprite);
      sprite.bitmap = new Bitmap(width, height);
      this._frontGaugeSprite = sprite;
    }
  };

  function getFrontImgData (imgData) {
    return (imgData.FrontGaugeImg && imgData.FrontGaugeImg[0]) ? true : imgData.FrontGaugeWidth > 0;
  }

  const _Sprite_Gauge_setup = Sprite_Gauge.prototype.setup;
  Sprite_Gauge.prototype.setup = function(battler, statusType) {
    this._gaugeImgData = imgSprite ? this.isGaugeImage(statusType) : null;
    if (this._gaugeImgData && !this._gaugeImgSprite) {
      this._statusType = statusType;
      this.defaultGaugeImg();
      this.setGaugeImg();
    }
    imgSprite = null;
    _Sprite_Gauge_setup.call(this, battler, statusType);
  };

  Sprite_Gauge.prototype.setGaugeImg = function() {
    if (imgSprite) {
      this._gaugeImgSprite = imgSprite;
      this._baseGaugeSprite = imgSprite._baseGaugeSprite;
      this._mainGaugeSprite = imgSprite._mainGaugeSprite;
      this._frontGaugeSprite = imgSprite._frontGaugeSprite;
      this.createGaugeBitmap();
    }
  };

  Sprite_Gauge.prototype.createGaugeBitmap = function() {;
    if (this._gaugeImgSprite) {
      const data = this._gaugeImgData;
      const bitmap = ImageManager.nuun_LoadPictures(data.GaugeImg[0]);
      this._gaugeBitmap = bitmap;
      this._frontBitmap = data.FrontGaugeImg && data.FrontGaugeImg[0] ? ImageManager.nuun_LoadPictures(data.FrontGaugeImg[0]) : bitmap;
      this._mainBitmap = data.MainGaugeImg && data.MainGaugeImg[0] ? ImageManager.nuun_LoadPictures(data.MainGaugeImg[0]) : bitmap;
      this._mainBitmap2 = data.MainGaugeImg2 && data.MainGaugeImg2[0] ? ImageManager.nuun_LoadPictures(data.MainGaugeImg2[0]) : bitmap;
      this._labelBitmap = data.LabelGaugeImg && data.LabelGaugeImg[0] ? ImageManager.nuun_LoadPictures(data.LabelGaugeImg[0]) : null;
      if (!bitmap.isReady()) {
        bitmap.addLoadListener(this.baseGaugeSetup.bind(this, bitmap, data));
      } else if (!this._frontBitmap.isReady()) {
        this._frontBitmap.addLoadListener(this.baseGaugeSetup.bind(this, bitmap, data));
      } else {
        this.baseGaugeSetup(bitmap, data);
      }
    }
  };

  Sprite_Gauge.prototype.baseGaugeSetup  = function(bitmap, data) {
    const scale = (data.GaugeImgScale || 100) / 100;
    const correctionWidth = data.GaugeCorrectionWidth || 0;
    const context = this._baseGaugeSprite.bitmap.context;
    context.setTransform(1, 0, this.gaugeInclinedRate(data), 1, 0, 0);
    const sx = data.GaugeSX || 0;
    const sy = data.GaugeSY || 0;
    const sw = data.GaugeWidth || bitmap.width;
    const sh = data.GaugeHeight || bitmap.height;
    const x = this.gaugeX() + data.GaugeX + data.GaugeOffSetX;
    const y = this.textHeight() - (sh * scale) + data.GaugeY;//Ver.1.3.3以降
    const gaugewidth = data.GaugeImgVariable ? this.bitmapWidth() - x + correctionWidth : Math.floor(sw * scale + correctionWidth);
    this._baseGaugeSprite.bitmap.blt(bitmap, sx, sy, sw, sh, x, y, gaugewidth, sh * scale);
    this.mainGaugeSetup(data);
  };

  Sprite_Gauge.prototype.frontGaugeSetup  = function(bitmap, data) {
    if (this._frontGaugeSprite) {
      const scale = (data.GaugeImgScale || 100) / 100;
      const context = this._frontGaugeSprite.bitmap.context;
      context.setTransform(1, 0, this.gaugeInclinedRate(data), 1, 0, 0);
      const sx = data.FrontGaugeSX || 0;
      const sy = data.FrontGaugeSY || 0;
      const sw = data.FrontGaugeWidth || bitmap.width;
      const sh = data.FrontGaugeHeight || bitmap.height;
      const x = this.gaugeX() + data.FrontGaugeX + data.GaugeOffSetX;
      const y = this.textHeight() - (sh * scale) + data.FrontGaugeY;//Ver.1.3.3以降
      const gaugewidth = data.GaugeImgVariable ? this.bitmapWidth() - x : sw * scale;
      this._frontGaugeSprite.bitmap.blt(bitmap, sx, sy, sw, sh, x, y, gaugewidth ,sh * scale);
    }
  };

  Sprite_Gauge.prototype.mainGaugeSetup  = function(data) {
    const context = this._mainGaugeSprite.bitmap.context;
    context.setTransform(1, 0, this.gaugeInclinedRate(data), 1, 0, 0);
    this.frontGaugeSetup(this._frontBitmap, data);
  };

  const _Sprite_Gauge_drawGaugeRect = Sprite_Gauge.prototype.drawGaugeRect;
  Sprite_Gauge.prototype.drawGaugeRect = function(x, y, width, height) {
    if (this._gaugeImgSprite && this._mainGaugeImg) {
      this._mainGaugeSprite.bitmap.clear();
      const data = this._gaugeImgData;
      const scale = (data.GaugeImgScale || 100) / 100;
      const bitmap = this._mainGaugeImg;
      const correctionWidth = data.MainGaugeCorrectionWidth || 0;
      const gaugeX = this.gaugeX();
      const sx = this._mainGaugeSX || 0;
      const sy = this._mainGaugeSY || 0;
      const sw = this._mainGaugeWidth || bitmap.width;
      const sh = this._mainGaugeHeight || bitmap.height;
      const rate = this.gaugeRate();
      const dw = Math.floor((data.GaugeWidth - sw) / 2 * rate);
      const gaugeWidth = Math.floor(sw * rate);
      const x = gaugeX + data.MainGaugeX + data.GaugeOffSetX;
      const y = this.textHeight() - (sh * scale) + data.MainGaugeY;//Ver.1.3.3以降;
      const w = data.GaugeImgVariable ? (this.bitmapWidth() - x - dw + correctionWidth) * rate : gaugeWidth * scale + correctionWidth;
      this._mainGaugeSprite.bitmap.blt(bitmap, sx, sy, gaugeWidth, sh, x, y, w, sh * scale);
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
    if (data.MainGaugeImg2 && data.MainGaugeImg2[0]) {
      this._mainGaugeSX = data.MainGaugeSX2;
      this._mainGaugeSY = data.MainGaugeSY2;
      this._mainGaugeWidth = data.MainGaugeWidth2;
      this._mainGaugeHeight = data.MainGaugeHeight2;
      this._mainGaugeImg = this._mainBitmap2;
    }
  };

  Sprite_Gauge.prototype.defaultGaugeImg  = function() {
    const data = this._gaugeImgData;
    this._mainGaugeSX = data.MainGaugeSX;
    this._mainGaugeSY = data.MainGaugeSY;
    this._mainGaugeWidth = data.MainGaugeWidth;
    this._mainGaugeHeight = data.MainGaugeHeight;
    this._mainGaugeImg = this._mainBitmap;
  };

  const _Sprite_Gauge_drawLabel = Sprite_Gauge.prototype.drawLabel;
  Sprite_Gauge.prototype.drawLabel = function() {
    const data = this._gaugeImgData;
    const bitmap = this._labelBitmap;
    if (bitmap) {
      const sx = data.LabelGaugeSX || 0;
      const sy = data.LabelGaugeSY || 0;
      const sw = data.LabelGaugeWidth || bitmap.width;
      const sh = data.LabelGaugeHeight || bitmap.height;
      const x = data.LabelGaugeX;
      const y = data.LabelGaugeY;
      this.bitmap.paintOpacity = this.labelOpacity();
      this.bitmap.blt(bitmap, sx, sy, sw, sh, x, y);
      this.bitmap.paintOpacity = 255;
    } else {
      _Sprite_Gauge_drawLabel.call(this);
    }
  };

  Game_Battler.prototype.isTpbCast = function() {
    return this._tpbState === "casting" && this.tpbRequiredCastTime() > 0 || this.isActing() || this._tpbState === "ready";
  };


})();