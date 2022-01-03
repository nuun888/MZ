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
 * @version 1.4.3
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * ゲージを画像化します。
 * 
 * 前面画像、メインゲージ画像、特定条件ゲージ画像は画像設定していない場合は、背景画像設定のゲージ画像の画像が参照されます。
 * ラベル画像に関してはラベル画像で画像設定していない場合は元の処理が適用されます。
 * トリミングが指定されていない場合は画像の左上基準、画像のサイズで適用されます。
 * 
 * 特定条件：HPが瀕死の時に設定した画像に切り替わります。
 *          TPBがキャストタイム中なら設定した画像に切り替わります。(別途キャストタイムを可視化できるプラグインが必要です)
 * 
 * 'result_exp'　リザルト獲得経験値ゲージ
 * 'exp' ステータス画面経験値ゲージ
 * 'limit' パーティリミットゲージ画像
 * 
 * 後面画像：一番後ろに表示される画像です。
 * 前面画像：一番手前に表示される装飾用の画像です。
 * メイン画像：ゲージの画像です。
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
 * 2022/1/3 Ver.1.4.3
 * ゲージ表示拡張プラグインのダメージ量可視化に対応。
 * 前面ゲージの表示がずれる問題を修正。
 * 2021/12/20 Ver.1.4.2
 * パーティゲージの画像化に対応。
 * 前面ゲージ画像を可変表示させない範囲を設定できる機能を追加。
 * 2021/12/19 Ver.1.4.1
 * フィルタリングクラスが正常に適用されていなかった問題を修正。
 * 2021/12/19 Ver.1.4.0
 * ゲージプラグイン対応による処理追加。
 * ゲージの画像設定を変更。
 * 2021/10/4 Ver.1.3.0
 * 最大時の画像を設定できる機能を追加。
 * 溺死、キャストタイム中のゲージの画像が、特定条件の画像設定をしていなかった場合反映しなかった問題を修正。
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
 * @option 'limit'
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
 * @param MainImg
 * @text ゲージ画像設定
 * @default ------------------------------
 * 
 * @param MainGaugeImg
 * @desc メインゲージファイル名を指定します。各画像設定で指定がない場合はこの画像が設定されます。
 * @text メインゲージ画像
 * @type file[]
 * @dir img/
 * @default []
 * 
 * @param MainGaugeX
 * @desc メインゲージのX座標を調整します。
 * @text メインゲージ表示オフセット位置X
 * @type number
 * @default 0
 * @min -999
 * 
 * @param MainGaugeY
 * @desc メインゲージのY座標を調整します。
 * @text メインゲージ表示オフセット位置Y
 * @type number
 * @default 0
 * @min -999
 * 
 * @param MainGaugeWidth
 * @desc メインゲージ画像を表示する範囲横幅を指定します。
 * @text メインゲージ画像トリミング横幅
 * @type number
 * @default 0
 * @min 0
 * 
 * @param MainGaugeHeight
 * @desc メインゲージ画像を表示する範囲高さを指定します。
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
 * @param MainGaugeCorrectionWidth
 * @desc メインゲージの補正幅（表示幅からの差）
 * @text メインゲージ補正幅
 * @type number
 * @default 0
 * @min -999
 * 
 * @param MainMaxGaugeVariable
 * @text 満タン時ゲージ画像切り替え
 * @desc 満タン時にゲージ画像を切り替えます。
 * @type boolean
 * @default false
 * 
 * @param MainMaxGaugeImg
 * @desc 満タン時でのメインゲージファイル名を指定します。
 * @text 満タン時メインゲージ画像
 * @type file[]
 * @dir img/
 * @default []
 * 
 * @param MainMaxGaugeWidth
 * @desc 満タン時でのメインゲージ画像のトリミング横幅
 * @text 満タン時メインゲージ画像トリミング横幅
 * @type number
 * @default 0
 * 
 * @param MainMaxGaugeHeight
 * @desc 満タン時メインゲージ画像のトリミング高さ
 * @text 満タン時メインゲージ画像トリミング高さ
 * @type number
 * @default 0
 * 
 * @param MainMaxGaugeSX
 * @desc 満タン時メインゲージ画像のトリミング座標X
 * @text 満タン時２メインゲージ画像トリミング座標X
 * @type number
 * @default 0
 * 
 * @param MainMaxGaugeSY
 * @desc 満タン時メインゲージ画像のトリミング座標Y
 * @text 満タン時メインゲージ画像トリミング座標Y
 * @type number
 * @default 0
 * 
 * 
 * @param MainGauge2Variable
 * @text 特定条件下ゲージ画像切り替え
 * @desc 特定条件下にゲージ画像を切り替えます。
 * @type boolean
 * @default false
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
 * @param BackImg
 * @text 背後画像設定
 * @default ------------------------------
 * 
 * @param BackGaugeImgVariable
 * @text 背後ゲージ画像表示
 * @desc 背後ゲージ画像を表示します。未指定の場合はメインゲージ画像で設定した画像が参照されます。
 * @type boolean
 * @default true
 * 
 * @param GaugeImg
 * @desc 背後ゲージ画像ファイル名を指定します。
 * @text 背後ゲージ画像
 * @type file[]
 * @dir img/
 * @default []
 * 
 * @param GaugeX
 * @desc 背後画像の表示オフセット位置X
 * @text 背後画像表示オフセット位置X
 * @type number
 * @default 0
 * @min -999
 * 
 * @param GaugeY
 * @desc 背後画像の表示オフセット位置Y
 * @text 背後画像表示オフセット位置Y
 * @type number
 * @default 0
 * @min -999
 * 
 * @param GaugeCorrectionWidth
 * @desc 背後画像の補正幅（表示幅からの差）
 * @text 背後画像補正幅
 * @type number
 * @default 0
 * @min -999
 * 
 * @param GaugeWidth
 * @desc 背後ゲージ画像のトリミング横幅
 * @text 背後ゲージ画像トリミング横幅
 * @type number
 * @default 0
 * @min 0
 * 
 * @param GaugeHeight
 * @desc 背後ゲージ画像のトリミング高さ
 * @text 背後ゲージ画像トリミング高さ
 * @type number
 * @default 0
 * 
 * @param GaugeSX
 * @desc 背後ゲージ画像のトリミング座標X
 * @text 背後ゲージ画像トリミング座標X
 * @type number
 * @default 0
 * 
 * @param GaugeSY
 * @desc 背後ゲージ画像のトリミング座標Y
 * @text 背後ゲージ画像トリミング座標Y
 * @type number
 * @default 0
 * 
 * @param FrontImg
 * @text 前面画像設定
 * @default ------------------------------
 * 
 * @param FrontGaugeImgVariable
 * @text 前面ゲージ画像表示
 * @desc 前面ゲージ画像を表示します。
 * @type boolean
 * @default true
 * 
 * @param FrontGaugeImg
 * @desc 前面画像ファイル名を指定します。未指定の場合はメインゲージ画像で設定した画像が参照されます。
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
 * @param FrontGaugeLeftWidth
 * @desc 前面ゲージ画像の左側の可変させない横幅。（可変モードのみ）
 * @text 前面ゲージ画像左側非可変横幅
 * @type number
 * @default 0
 * 
 * @param FrontGaugeRightWidth
 * @desc 前面ゲージ画像の右側の可変させない横幅。（可変モードのみ）
 * @text 前面ゲージ画像右側非可変横幅
 * @type number
 * @default 0
 * 
 * @param DamageImg
 * @text ダメージ量可視化画像設定
 * @default ------------------------------
 * 
 * @param DamageGaugeImgVariable
 * @text ダメージ量可視化ゲージ画像表示
 * @desc ダメージ量可視化ゲージ画像を表示します。
 * @type boolean
 * @default true
 * 
 * @param DamageGaugeImg
 * @desc ダメージ量可視化画像ファイル名を指定します。未指定の場合はメインゲージ画像で設定した画像が参照されます。
 * @text ダメージ量可視化画像
 * @type file[]
 * @dir img/
 * @default []
 * 
 * @param DamageGaugeX
 * @desc ダメージ量可視化画像の表示オフセット位置X
 * @text ダメージ量可視化画像表示オフセット位置X
 * @type number
 * @default 0
 * @min -999
 * 
 * @param DamageGaugeY
 * @desc ダメージ量可視化画像の表示オフセット位置Y
 * @text ダメージ量可視化画像表示オフセット位置Y
 * @type number
 * @default 0
 * @min -999
 * 
 * @param DamageGaugeWidth
 * @desc ダメージ量可視化ゲージ画像のトリミング横幅
 * @text ダメージ量可視化ゲージ画像トリミング横幅
 * @type number
 * @default 0
 * @min 0
 * 
 * @param DamageGaugeHeight
 * @desc ダメージ量可視化ゲージ画像のトリミング高さ
 * @text ダメージ量可視化ゲージ画像トリミング高さ
 * @type number
 * @default 0
 * 
 * @param DamageGaugeSX
 * @desc ダメージ量可視化ゲージ画像のトリミング座標X
 * @text ダメージ量可視化ゲージ画像トリミング座標X
 * @type number
 * @default 0
 * 
 * @param DamageGaugeSY
 * @desc ダメージ量可視化ゲージ画像のトリミング座標Y
 * @text ダメージ量可視化ゲージ画像トリミング座標Y
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
 * @desc ラベル画像の表示オフセット位置X
 * @text ラベル画像表示オフセット位置X
 * @type number
 * @default 0
 * @min -999
 * 
 * @param LabelGaugeY
 * @desc ラベル画像の表示オフセット位置Y
 * @text ラベル画像表示オフセット位置Y
 * @type number
 * @default 0
 * @min -999
 * 
 * @param LabelGaugeWidth
 * @desc ラベルゲージ画像のトリミング横幅
 * @text ラベルゲージ画像トリミング横幅
 * @type number
 * @default 0
 * @min 0
 * 
 * @param LabelGaugeHeight
 * @desc ラベルゲージ画像のトリミング高さ
 * @text ラベルゲージ画像トリミング高さ
 * @type number
 * @default 0
 * 
 * @param LabelGaugeSX
 * @desc ラベルゲージ画像のトリミング座標X
 * @text ラベルゲージ画像トリミング座標X
 * @type number
 * @default 0
 * 
 * @param LabelGaugeSY
 * @desc ラベルゲージ画像のトリミング座標Y
 * @text ラベルゲージ画像トリミング座標Y
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
 * @option 'Sprite_Enemy'
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
      ImageManager.nuun_LoadPictures(data.GaugeImg[0]);
    }
    if (data.FrontGaugeImg && data.FrontGaugeImg[0]) {
      ImageManager.nuun_LoadPictures(data.FrontGaugeImg[0]);
    }
    if (data.MainGaugeImg && data.MainGaugeImg[0]) {
      ImageManager.nuun_LoadPictures(data.MainGaugeImg[0]);
    }
    if (data.MainGauge2Variable && data.MainGaugeImg2 && data.MainGaugeImg2[0]) {
      ImageManager.nuun_LoadPictures(data.MainGaugeImg2[0]);
    }
    if (data.MainMaxGaugeVariable && data.MainMaxGaugeImg && data.MainMaxGaugeImg[0]) {
      ImageManager.nuun_LoadPictures(data.MainMaxGaugeImg[0]);
    }
    if (data.DamageGaugeImgVariable && data.DamageGaugeImg && data.DamageGaugeImg[0]) {
      ImageManager.nuun_LoadPictures(data.DamageGaugeImg[0]);
    }
    if (data.LabelGaugeImg && data.LabelGaugeImg[0]) {
      ImageManager.nuun_LoadPictures(data.LabelGaugeImg[0]);
    }
  })

  function isGaugeImage(statusType, className) {
    return GaugeImgList.find(data => data.Type[0] === statusType && data.MainGaugeImg && data.MainGaugeImg[0] && filteringClass(data, className));
  };

  function filteringClass(data, className) {
    if (!data.FilteringClass || data.FilteringClass.length === 0) {
      return true;
    }
    return data.FilteringClass.some(filterClass => filterClass === className);
  };

  function getFrontImgData (imgData) {
    return (imgData.FrontGaugeImg && imgData.FrontGaugeImg[0]) ? true : imgData.FrontGaugeWidth > 0;
  }

  function getDamageImgData (imgData) {
    return (imgData.DamageGaugeImg && imgData.DamageGaugeImg[0]) ? true : imgData.DamageGaugeWidth > 0;
  }

  const _Window_StatusBase_placeGauge = Window_StatusBase.prototype.placeGauge;
  Window_StatusBase.prototype.placeGauge = function(actor, type, x, y) {
    this.placeGaugeImg(actor, type, x, y);
    _Window_StatusBase_placeGauge.call(this, actor, type, x, y);
  };

  Window_StatusBase.prototype.placeGaugeImg = function(battler, type, x, y) {
    imgSprite = null;
    const className = String(this.constructor.name);
    const find = isGaugeImage(type, className);
    if (find) {
      let key = null;
      if (battler.isActor()) {
        key = "actor%1-gaugeImg-%2".format(battler.actorId(), type);
      } else {
        key = "enemy%1-gaugeImg-%2".format(battler.enemyId(), type);
      }
      const sprite = this.createInnerSprite(key, Sprite_GaugeImg);
      imgSprite = sprite;
      sprite.setup(type, find);
      sprite.move(x, y);
      sprite.show();
    }
  };

  Sprite.prototype.createSpriteGauge = function(base, type, x, y) {
    imgSprite = null;
    const className = String(this.constructor.name);
    const find = isGaugeImage(type, className);
    if (find) {
      const sprite = new Sprite_GaugeImg();
      base.addChild(sprite);
      imgSprite = sprite;
      sprite.setup(type, find);
      sprite.move(0, 0);
      sprite.show();
      sprite.enemySpriteId = this.spriteId;
    }
  };

  Sprite.prototype.isGaugeImage = function(statusType) {
    return GaugeImgList.find(data => data.Type[0] === statusType && data.MainGaugeImg && data.MainGaugeImg[0]);
  };

  Scene_Base.prototype.createSpriteGauge = function(base, type, x, y) {
    imgSprite = null;
    const className = String(this.constructor.name);
    const find = isGaugeImage(type, className);
    if (find) {
      const sprite = new Sprite_GaugeImg();
      base.addChild(sprite);
      imgSprite = sprite;
      sprite.setup(type, find);
      sprite.move(x, y);
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
    return this._gaugeImgData.GaugeBaseWidth;
  };

  Sprite_GaugeImg.prototype.bitmapHeight = function() {
    return 70;
  };

  Sprite_GaugeImg.prototype.setup = function(statusType, data) {
    this._statusType = statusType;
    this._gaugeImgData = data;
    this.createBitmap();
    this.createGaugeBitmap();
  };

  Sprite_GaugeImg.prototype.createGaugeBitmap = function() {
    const width = this.bitmapWidth();
    const height = this.bitmapHeight();
    this.createGaugeImges(width, height);
    this.createDamageGaugeImges(width, height);
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

  Sprite_GaugeImg.prototype.createDamageGaugeImges = function(width, height) {
    if (!this._damageGaugeSprite && getDamageImgData(this._gaugeImgData)) {
      const sprite = new Sprite();
      this.addChild(sprite);
      sprite.bitmap = new Bitmap(width, height);
      this._damageGaugeSprite = sprite;
    }
  };


  const _Sprite_Gauge_initMembers = Sprite_Gauge.prototype.initMembers;
  Sprite_Gauge.prototype.initMembers = function() {
    _Sprite_Gauge_initMembers.call(this);
    this._gaugeImgSprite = null;
    this._baseGaugeSprite = null;
    this._damageGaugeSprite = null;
    this._mainGaugeSprite = null;
    this._frontGaugeSprite = null;
    this._gaugeBitmap = null;
    this._frontBitmap = null;
    this._damageBitmap = null;
    this._mainBitmap = null;
    this._mainBitmap2 = null;
    this._mainMaxBitmap = null;
    this._labelBitmap = null;
    this._mainGaugeSX = 0;
    this._mainGaugeSY = 0;
    this._mainGaugeWidth = 0;
    this._mainGaugeHeight = 0;
  };

  const _Sprite_Gauge_setup = Sprite_Gauge.prototype.setup;
  Sprite_Gauge.prototype.setup = function(battler, statusType) {
    this._gaugeImgData = imgSprite ? imgSprite._gaugeImgData : null;
    if (this._gaugeImgData && !this._gaugeImgSprite) {
      this._statusType = statusType;
      this.setGaugeImg();
      this.defaultGaugeImg();
    }
    imgSprite = null;
    _Sprite_Gauge_setup.call(this, battler, statusType);
  };

  Sprite_Gauge.prototype.setGaugeImg = function() {
    if (imgSprite) {
      this._gaugeImgSprite = imgSprite;
      this._baseGaugeSprite = imgSprite._baseGaugeSprite;
      this._damageGaugeSprite = imgSprite._damageGaugeSprite;
      this._mainGaugeSprite = imgSprite._mainGaugeSprite;
      this._frontGaugeSprite = imgSprite._frontGaugeSprite;
      this.createGaugeBitmap();
    }
  };
  
  Sprite_Gauge.prototype.createGaugeBitmap = function() {
    if (this._gaugeImgSprite) {
      const data = this._gaugeImgData;
      const mainBitmap = ImageManager.nuun_LoadPictures(data.MainGaugeImg[0]);
      if (data.FrontGaugeImgVariable) {
        this._frontBitmap = data.FrontGaugeImg && data.FrontGaugeImg[0] ? ImageManager.nuun_LoadPictures(data.FrontGaugeImg[0]) : mainBitmap;
      }
      if (data.BackGaugeImgVariable) {
        this._gaugeBitmap = data.GaugeImg && data.GaugeImg[0] ? ImageManager.nuun_LoadPictures(data.GaugeImg[0]) : mainBitmap;
      }
      if (data.MainGauge2Variable) {
        this._mainBitmap2 = data.MainGaugeImg2 && data.MainGaugeImg2[0] ? ImageManager.nuun_LoadPictures(data.MainGaugeImg2[0]) : mainBitmap;
      }
      if (data.MainMaxGaugeVariable) {
        this._mainMaxBitmap = data.MainMaxGaugeImg && data.MainMaxGaugeImg[0] ? ImageManager.nuun_LoadPictures(data.MainMaxGaugeImg[0]) : mainBitmap;
      }
      if (data.DamageGaugeImgVariable) {
        this._damageBitmap = data.DamageGaugeImg && data.DamageGaugeImg[0] ? ImageManager.nuun_LoadPictures(data.DamageGaugeImg[0]) : mainBitmap;
      }
      this._labelBitmap = data.LabelGaugeImg && data.LabelGaugeImg[0] ? ImageManager.nuun_LoadPictures(data.LabelGaugeImg[0]) : null;
      this._mainBitmap = mainBitmap;
      const bitmap = this._gaugeBitmap;
      if (bitmap && !bitmap.isReady()) {
        bitmap.addLoadListener(this.baseGaugeSetup.bind(this, data, bitmap));
      } else if (bitmap) {
        this.baseGaugeSetup(data, bitmap);
      }
    }
  };

  Sprite_Gauge.prototype.baseGaugeSetup  = function(data, bitmap) {
    const scale = (data.GaugeImgScale || 100) / 100;
    const correctionWidth = data.GaugeCorrectionWidth || 0;
    const context = this._baseGaugeSprite.bitmap.context;
    context.setTransform(1, 0, this.gaugeInclinedRate(data), 1, 0, 0);
    const sx = data.GaugeSX || 0;
    const sy = data.GaugeSY || 0;
    const sw = data.GaugeWidth || bitmap.width;
    const sh = data.GaugeHeight || bitmap.height;
    const x = this.gaugeX() + data.GaugeX + data.GaugeOffSetX;
    const y = this.textHeight() - (sh * scale) + data.GaugeY;
    const gaugewidth = data.GaugeImgVariable ? this.bitmapWidth() - x + correctionWidth : Math.floor(sw * scale + correctionWidth);
    this._baseGaugeSprite.bitmap.blt(bitmap, sx, sy, sw, sh, x, y, gaugewidth, sh * scale);
    this.createFrontGaugeBitmap(data);
  };

  Sprite_Gauge.prototype.frontGaugeSetup  = function(data) {
    if (this._frontGaugeSprite) {
      const context = this._frontGaugeSprite.bitmap.context;
      const bitmap = this._frontBitmap;
      context.setTransform(1, 0, this.gaugeInclinedRate(data), 1, 0, 0);
      if (data.GaugeImgVariable && data.FrontGaugeLeftWidth > 0) {
        this.frontGaugeSideLeft(data, bitmap)
      }
      if (data.GaugeImgVariable && data.FrontGaugeRightWidth > 0) {
        this.frontGaugeSideRight(data, bitmap)
      }
      if (data.GaugeImgVariable && (data.FrontGaugeLeftWidth > 0 || data.FrontGaugeRightWidth > 0)) {
        this.frontGaugeSideCenter(data, bitmap);
      } else {
        const scale = (data.GaugeImgScale || 100) / 100;
        const sx = data.FrontGaugeSX || 0;
        const sy = data.FrontGaugeSY || 0;
        const sw = data.FrontGaugeWidth - sx || bitmap.width;
        const sh = data.FrontGaugeHeight || bitmap.height;
        const x = this.gaugeX() + data.FrontGaugeX + data.GaugeOffSetX;
        const y = this.textHeight() - (sh * scale) + data.FrontGaugeY;
        const gaugewidth = data.GaugeImgVariable ? this.bitmapWidth() - x : sw * scale;
        this._frontGaugeSprite.bitmap.blt(bitmap, sx, sy, sw, sh, x, y, gaugewidth ,sh * scale);
      }
    }
  };

  Sprite_Gauge.prototype.frontGaugeSideLeft = function(data, bitmap) {
    const scale = (data.GaugeImgScale || 100) / 100;
    const sx = data.FrontGaugeSX || 0;
    const sy = data.FrontGaugeSY || 0;
    const sw = data.FrontGaugeLeftWidth;
    const sh = data.FrontGaugeHeight || bitmap.height;
    const gaugewidth = sw * scale;
    const x = this.gaugeX() + data.FrontGaugeX + data.GaugeOffSetX;
    const y = this.textHeight() - (sh * scale) + data.FrontGaugeY;
    this._frontGaugeSprite.bitmap.blt(bitmap, sx, sy, sw, sh, x, y, gaugewidth ,sh * scale);
  };

  Sprite_Gauge.prototype.frontGaugeSideRight = function(data, bitmap) {
    const scale = (data.GaugeImgScale || 100) / 100;
    const sx = data.FrontGaugeSX + bitmap.width - data.FrontGaugeLeftWidth;
    const sy = data.FrontGaugeSY || 0;
    const sw = data.FrontGaugeRightWidth;
    const sh = data.FrontGaugeHeight || bitmap.height;
    const gaugewidth = sw * scale;
    const x = this.bitmapWidth() - (data.FrontGaugeX + data.GaugeOffSetX) - sw * scale;
    const y = this.textHeight() - (sh * scale) + data.FrontGaugeY;
    this._frontGaugeSprite.bitmap.blt(bitmap, sx, sy, sw, sh, x, y, gaugewidth ,sh * scale);
  };

  Sprite_Gauge.prototype.frontGaugeSideCenter = function(data, bitmap) {
    const scale = (data.GaugeImgScale || 100) / 100;
    const sx = data.FrontGaugeSX + data.FrontGaugeLeftWidth;
    const sy = data.FrontGaugeSY || 0;
    const sw = (data.GaugeWidth || bitmap.width) - sx - data.FrontGaugeRightWidth;
    const sh = data.FrontGaugeHeight || bitmap.height;
    const gaugewidth = this.bitmapWidth() - this.gaugeX() - (data.FrontGaugeLeftWidth * scale) - (data.FrontGaugeRightWidth * scale);
    const x = this.gaugeX() + data.FrontGaugeX + data.GaugeOffSetX + data.FrontGaugeLeftWidth * scale;
    const y = this.textHeight() - (sh * scale) + data.FrontGaugeY;
    this._frontGaugeSprite.bitmap.blt(bitmap, sx, sy, sw, sh, x, y, gaugewidth ,sh * scale);
  };

  Sprite_Gauge.prototype.createFrontGaugeBitmap  = function(data) {
    const bitmap = this._frontBitmap;
    if (bitmap && bitmap.isReady()) {
      bitmap.addLoadListener(this.frontGaugeSetup.bind(this, data));
    } else if (bitmap) {
      this.frontGaugeSetup(data);
    }
  };

  const _Sprite_Gauge_drawGaugeRect = Sprite_Gauge.prototype.drawGaugeRect;
  Sprite_Gauge.prototype.drawGaugeRect = function(x, y, width, height) {
    if (this._gaugeImgSprite && this._mainGaugeImg) {
      if (Imported.NUUN_GaugeValueEX && this.gaugeDamageVisualization() && this._damageBitmap) {
        this.drawGaugeRectImg(x, y, width, height);
      } else {
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
        const gaugeWidth = Math.floor(sw * rate);
        x = gaugeX + data.MainGaugeX + data.GaugeOffSetX;
        y = Math.floor(this.textHeight() - (sh * scale)) + data.MainGaugeY;//Ver.1.3.3以降;
        const w = data.GaugeImgVariable ? Math.floor((this.bitmapWidth() - x + correctionWidth) * rate) : Math.floor(gaugeWidth * scale + correctionWidth);
        this._mainGaugeSprite.bitmap.blt(bitmap, sx, sy, gaugeWidth, sh, x, y, w, sh * scale);
      }
    } else {
      _Sprite_Gauge_drawGaugeRect.call(this, x, y, width, height);
    }
  };

  Sprite_Gauge.prototype.drawGaugeRectImg = function(x, y, width, height) {
    this._drawGaugeMode = 1;//ダメージゲージ
    this._damageGaugeSprite.bitmap.clear();
    this._mainGaugeSprite.bitmap.clear();
    const data = this._gaugeImgData;
    const scale = (data.GaugeImgScale || 100) / 100;
    let bitmap = this._damageBitmap;
    const correctionWidth = data.MainGaugeCorrectionWidth || 0;
    const gaugeX = this.gaugeX();
    const sx = this._mainGaugeSX || 0;
    const sy = this._mainGaugeSY || 0;
    const sw = this._mainGaugeWidth || bitmap.width;
    const sh = this._mainGaugeHeight || bitmap.height;
    let rate = this.gaugeRate();
    let gaugeWidth = Math.floor(sw * rate);
    x = gaugeX + data.MainGaugeX + data.GaugeOffSetX;
    y = Math.floor(this.textHeight() - (sh * scale)) + data.MainGaugeY;//Ver.1.3.3以降;
    let w = data.GaugeImgVariable ? Math.floor((this.bitmapWidth() - x + correctionWidth) * rate) : Math.floor(gaugeWidth * scale + correctionWidth);
    this._damageGaugeSprite.bitmap.blt(bitmap, sx, sy, gaugeWidth, sh, x, y, w, sh * scale);
    this._drawGaugeMode = 0;//通常のゲージ
    bitmap = this._mainGaugeImg;
    rate = this.gaugeRate();
    gaugeWidth = Math.floor(sw * rate);
    w = data.GaugeImgVariable ? Math.floor((this.bitmapWidth() - x + correctionWidth) * rate) : Math.floor(gaugeWidth * scale + correctionWidth);
    this._mainGaugeSprite.bitmap.blt(bitmap, sx, sy, gaugeWidth, sh, x, y, w, sh * scale);
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
      if (this._mainBitmap2 && this._statusType == 'hp' && this._battler.isDying()) {
        this.changeGaugeImg();
      } else if (this._mainBitmap2 && (this._statusType == 'time'  || this._statusType == 'cast') && this._battler.isTpbCast()) {
        this.changeGaugeImg();
      } else if (this.isMaxValue()) {
        this.maxGaugeImg();
      } else {
        this.defaultGaugeImg();
      }
    }
  };

  Sprite_Gauge.prototype.changeGaugeImg  = function() {
    const data = this._gaugeImgData;
    this._mainGaugeSX = data.MainGaugeSX2;
    this._mainGaugeSY = data.MainGaugeSY2;
    this._mainGaugeWidth = data.MainGaugeWidth2;
    this._mainGaugeHeight = data.MainGaugeHeight2;
    this._mainGaugeImg = this._mainBitmap2;
  };

  Sprite_Gauge.prototype.defaultGaugeImg  = function() {
    const data = this._gaugeImgData;
    this._mainGaugeSX = data.MainGaugeSX;
    this._mainGaugeSY = data.MainGaugeSY;
    this._mainGaugeWidth = data.MainGaugeWidth;
    this._mainGaugeHeight = data.MainGaugeHeight;
    this._mainGaugeImg = this._mainBitmap;
  };

  Sprite_Gauge.prototype.maxGaugeImg  = function() {
    const data = this._gaugeImgData;
    this._mainGaugeSX = data.MainMaxGaugeSX;
    this._mainGaugeSY = data.MainMaxGaugeSY;
    this._mainGaugeWidth = data.MainMaxGaugeWidth;
    this._mainGaugeHeight = data.MainMaxGaugeHeight;
    this._mainGaugeImg = this._mainMaxBitmap;
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

  Sprite_Gauge.prototype.isMaxValue = function() {
    return this._mainMaxBitmap && this.currentValue() >= this.currentMaxValue();
  };

  Game_Battler.prototype.isTpbCast = function() {
    return this._tpbState === "casting" && this.tpbRequiredCastTime() > 0 || this.isActing() || this._tpbState === "ready";
  };

})();