/*:-----------------------------------------------------------------------------------
 * NUUN_SaveScreen.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc セーブ画面拡張
 * @author NUUN
 * @version 1.7.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * セーブ画面にいくつかの項目を追加します。
 * 顔グラを表示できます。
 * キャラクター上にレベルを表示できます。
 * メイン文章（章など）を表示可能。（設定しない場合はタイトルが表示されます。何も表示させたくない場合はスペースを入れてください）
 * 現在地、所持金、任意の項目が表示可能です。
 * 
 * 変数に文字列を入れる方法
 * イベントコマンドの変数操作でスクリプトに"又は'で括り任意の文字列を入力してください。例：'第一章　旅立ち'
 * 
 * 仕様
 * 拡大率は１００でセーブインフォ表示縦幅に関係なくデフォルトサイズで表示されます。
 * それ以外は画像の縦幅（表示縦幅ではない）がセーブインフォ表示縦幅を超えるようであればそれ以下にサイズ調整されます。
 *
 * 右側の表示項目をなしにすると左側の表示項目が広く表示されます。
 * 
 * コンテンツエリアX座標を-1にすることで右寄りに表示されます。
 * 
 * 背景画像の変更
 * ゲームの進行によって背景画像を変更出来ます。
 * 初期設定ではプラグインコマンド「背景画像変更」で変更したたびに背景IDが変更されます。
 * 背景IDはロード画面でIDの一番高いセーブデータの背景が表示されます。
 * 
 * Ver.1.3.0からNUUN_Base Ver.1.1.3以降が必要となります。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/7/16 Ver.1.7.0
 * セーブ日時を表示する機能を追加。
 * 2021/5/29 Ver.1.6.0
 * サイドビューアクターを表示する機能を追加。
 * 2021/5/27 Ver.1.5.2
 * スクリーンショットの処理を修正。
 * 一部プラグインコマンドを削除。
 * 2021/5/15 Ver.1.5.1
 * スクリーンショットの処理方法を変更。
 * 2021/5/14 Ver.1.5.0
 * セーブスクリーンショットを表示する機能を追加。
 * 2021/5/11 Ver.1.4.1
 * 前バージョンから引き継いだセーブデータがあるセーブ画面を開くとエラーが出る問題を修正。
 * 2021/5/11 Ver.1.4.0
 * ゲームの進行度に応じて背景画像を変更できる機能を追加。
 * 2021/5/8 Ver.1.3.0
 * 任意の背景画像を表示できる機能を追加。
 * アクター画像の表示の設定方法を変更。
 * レベルのYを調整できるように変更。
 * キャラチップ表示時のアクターY座標を相対座標に変更。
 * 表示できるセーブ数、セーブできる最大数を指定できる機能を追加。
 * 選択画面のコンテンツ背後に表示される黒い背景画像（デフォルトの場合）を非表示にする機能を追加。
 * 2021/1/30 Ver.1.2.1
 * コンテンツエリアX座標の設定方法を変更
 * 2021/1/29 Ver.1.2.0
 * 顔グラの横幅、縦幅、拡大率を指定できるように変更。
 * セーブインフォがないファイルでファイル名が表示されない問題を修正。
 * 2021/1/26 Ver.1.1.1
 * 顔グラを表示時、ファイルタイトルが隠れて表示されてしまう問題を修正。
 * 2021/1/26 Ver.1.1.0
 * 顔グラを表示できる機能を追加。
 * 2021/1/24 Ver.1.0.0
 * 初版
 * 
 * 
 * @param Font
 * @text フォント設定
 * @default ------------------------------
 * 
 * @param MainFontSizeMainFontSize
 * @desc ファイルタイトル、メイン文章のフォントサイズ
 * @text ファイルタイトル、メイン文章フォントサイズ
 * @type number
 * @default 24
 * @min 0
 * @parent Font
 * 
 * @param ContentsFontSizeMainFontSize
 * @desc 各コンテンツのフォントサイズ
 * @text 各コンテンツフォントサイズ
 * @type number
 * @default 22
 * @parent Font
 * 
 * @param AnyName
 * @text メイン文章
 * @default ------------------------------
 *
 * @param AnyNameVariable
 * @desc メイン文章変数番号
 * @text メイン文章表示変数番号
 * @type variable
 * @default 0
 * @parent AnyName
 * 
 * @param AnyDefaultName
 * @desc メイン文章デフォルト文字列。（スペースを入れると何も表示されません。空白の場合はタイトルが表示されます。）
 * @text メイン文章デフォルト文字列
 * @type string
 * @default
 * @parent AnyName
 * 
 * @param Actor
 * @text アクター設定
 * @default ------------------------------
 * 
 * @param ActorGraphicMode
 * @desc アクター画像の表示モード
 * @text 表示モード
 * @type select
 * @option 表示しない
 * @value 0
 * @option キャラチップ
 * @value 1
 * @option 顔グラ
 * @value 2
 * @option サイドビューアクター
 * @value 3
 * @default 1
 * @parent Actor
 * 
 * @param ActorX
 * @desc アクターのX座標（相対座標）デフォルト:40
 * @text アクターX座標
 * @type number
 * @default 40
 * @parent Actor
 * 
 * @param ActorY
 * @desc アクターのY座標（相対座標）
 * @text アクターY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent Actor
 * 
 * @param FaceWidth
 * @desc 顔グラの横幅
 * @text 顔グラの横幅
 * @type number
 * @default 144
 * @min 0
 * @parent Actor
 * 
 * @param FaceHeight
 * @desc 顔グラの縦幅
 * @text 顔グラの縦幅
 * @type number
 * @default 144
 * @parent Actor
 * 
 * @param FaceScale
 * @desc 顔グラの拡大率
 * @text 拡大率
 * @type number
 * @default 100
 * @parent Actor
 * 
 * @param LevelPosition
 * @desc レベルの表示位置。
 * @text レベル表示位置
 * @type select
 * @option 表示しない
 * @value 0
 * @option 下
 * @value 1
 * @option 上
 * @value 2
 * @default 1
 * @parent Actor
 * 
 * @param LevalY
 * @desc レベルのY座標（相対座標）
 * @text レベルY座標（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @parent Actor
 * 
 * @param BackGround
 * @text 背景、ウィンドウスキン設定
 * @default ------------------------------
 * 
 * @param BackGroundImg
 * @desc 背景画像ファイル名を指定します。
 * @text 背景画像
 * @type file[]
 * @dir img/
 * @default []
 * @parent BackGround
 * 
 * @param BackUiWidth
 * @text 背景サイズをウィンドウサイズに合わせる
 * @desc 背景サイズをウィンドウサイズに合わせる。
 * @type boolean
 * @default true
 * @parent BackGround
 * 
 * @param AutomaticSetting
 * @text 背景画像ID自動設定
 * @desc 背景画像IDを自動で設定します。背景画像を変更した際、IDの高いセーブデータの背景がロード画面で表示されます。
 * @type boolean
 * @default true
 * @parent BackGround
 * 
 * @param ContentsBackVisible
 * @text コンテンツ背景画像非表示
 * @desc コンテンツの背景画像を表示しない。(要NUUN_Base Ver.1.1.3以降)
 * @type boolean
 * @default false
 * @parent BackGround
 * 
 * @param Contents
 * @text 各コンテンツ設定
 * @default ------------------------------
 * 
 * @param NumSaveRows
 * @desc 画面に表示するセーブ数
 * @text 表示セーブ数
 * @type number
 * @default 5
 * @parent Contents
 * 
 * @param MaxSave
 * @desc 最大セーブ数
 * @text 最大セーブ数
 * @type number
 * @default 20
 * @parent Contents
 * 
 * @param ContentsRight
 * @text コンテンツエリアを右寄りに表示
 * @desc コンテンツエリア右寄り
 * @type boolean
 * @default true
 * @parent Contents
 * 
 * @param ContentsX
 * @desc コンテンツエリアのX座標
 * @text コンテンツエリアX座標
 * @type number
 * @default 0
 * @min 0
 * @parent Contents
 * 
 * @param ContentsWidth
 * @desc コンテンツエリアの横幅（０でデフォルト幅）
 * @text コンテンツエリア横幅
 * @type number
 * @default 0
 * @min 0
 * @parent Contents
 * 
 * @param PlaytimeName
 * @desc プレイ時間名称
 * @text プレイ時間名称
 * @type string
 * @default
 * @parent Contents
 * 
 * @param LocationName
 * @desc 現在地名称
 * @text 現在地名称
 * @type string
 * @default
 * @parent Contents
 * 
 * @param MoneyName
 * @desc 所持金名称
 * @text 所持金名称
 * @type string
 * @default
 * @parent Contents
 * 
 * @param DayTime
 * @desc 表示する日時フォーマット
 * @text 日時フォーマット
 * @type select
 * @option 標準（年/月/日 時：分：秒）
 * @value 
 * @option 英表記（日/月/年 時：分：秒）
 * @value 'en-GB'
 * @option 元号表記（日表記）
 * @value 'ja-JP-u-ca-japanese'
 * @default 
 * @parent Contents
 * 
 * @param T_Left
 * @desc 左上に表示する項目。
 * @text 左上表示項目
 * @type select
 * @option なし
 * @value 0
 * @option プレイ時間
 * @value 1
 * @option 現在値
 * @value 2
 * @option 所持金
 * @value 3
 * @option セーブ時刻
 * @value 4
 * @option 任意項目１
 * @value 10
 * @option 任意項目２
 * @value 11
 * @default 2
 * @parent Contents
 * 
 * @param T_Right
 * @desc 右上に表示する項目。
 * @text 右上表示項目
 * @type select
 * @option なし
 * @value 0
 * @option プレイ時間
 * @value 1
 * @option 現在値
 * @value 2
 * @option 所持金
 * @value 3
 * @option セーブ時刻
 * @value 4
 * @option 任意項目１
 * @value 10
 * @option 任意項目２
 * @value 11
 * @default 0
 * @parent Contents
 * 
 * @param B_Left
 * @desc 左下に表示する項目。
 * @text 左下表示項目
 * @type select
 * @option なし
 * @value 0
 * @option プレイ時間
 * @value 1
 * @option 現在値
 * @value 2
 * @option 所持金
 * @value 3
 * @option セーブ時刻
 * @value 4
 * @option 任意項目１
 * @value 10
 * @option 任意項目２
 * @value 11
 * @default 3
 * @parent Contents
 * 
 * @param B_Right
 * @desc 右下に表示する項目。
 * @text 右下表示項目
 * @type select
 * @option なし
 * @value 0
 * @option プレイ時間
 * @value 1
 * @option 現在値
 * @value 2
 * @option 所持金
 * @value 3
 * @option セーブ時刻
 * @value 4
 * @option 任意項目1
 * @value 10
 * @option 任意項目２
 * @value 11
 * @default 1
 * @parent Contents
 * 
 * @param OriginalName1
 * @desc 任意項目名１
 * @text 任意項目名１
 * @type string
 * @default
 * @parent Contents
 * 
 * @param OriginalEval1
 * @desc 評価式１
 * @text 評価式１
 * @type string
 * @default
 * @parent Contents
 * 
 * @param OriginalName2
 * @desc 任意項目名２
 * @text 任意項目名２
 * @type string
 * @default
 * @parent Contents
 * 
 * @param OriginalEval2
 * @desc 評価式２
 * @text 評価式２
 * @type string
 * @default
 * @parent Contents
 * 
 * @param SaveSnapSetting
 * @text セーブスクリーンショット設定
 * @default ------------------------------
 * 
 * @param InfoSaveSnap
 * @text スクリーンショット有効化
 * @desc スクリーンショットを有効にします。
 * @type boolean
 * @default false
 * @parent SaveSnapSetting
 * 
 * @param SaveSnapQuality
 * @desc スクリーンショットの画質。(デフォルト値0.92)
 * @text スクリーンショット画質
 * @type string
 * @default 0.92
 * @max 1
 * @parent SaveSnapSetting
 * 
 * @param SaveSnapX
 * @desc スクリーンショットのX座標
 * @text スクリーンショットX座標
 * @type number
 * @default 0
 * @parent SaveSnapSetting
 * 
 * @param SaveSnapY
 * @desc スクリーンショットのY座標
 * @text スクリーンショットY座標
 * @type number
 * @default 0
 * @parent SaveSnapSetting
 * 
 * @param SaveSnapScale
 * @desc スクリーンショットの拡大率（％）
 * @text スクリーンショット拡大率（％）
 * @type number
 * @default 12
 * @min 0
 * @parent SaveSnapSetting
 * 
 * @command ChangeBackground
 * @desc 背景画像を変更します。
 * @text 背景画像変更
 * 
 * @arg BackGroundImg
 * @desc 背景画像ファイル名を指定します。
 * @text 背景画像
 * @type file[]
 * @dir img/
 * @default []
 * 
 * @arg BackGroundId
 * @desc 背景画像IDを設定します。IDの高いセーブデータの背景がロード画面で表示されます。背景画像ID自動設定がOFFの時有効です。
 * @text 背景画像ID
 * @type number
 * @default 0
 * @min 0
 * 
 * @command UserAutoSave
 * @desc オートセーブをします。
 * @text オートセーブ
 * 
 * @arg OnSaveSnap
 * @text スクリーンショット許可
 * @desc オートセーブ時のスクリーンショットを許可します。
 * @type boolean
 * @default true
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_SaveScreen = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_SaveScreen');
  const BackUiWidth = eval(parameters['BackUiWidth'] || "true");
  const MainFontSizeMainFontSize = Number(parameters['MainFontSizeMainFontSize'] || 24);
  const ContentsFontSizeMainFontSize = Number(parameters['ContentsFontSizeMainFontSize'] || 22);
  const ContentsBackVisible = eval(parameters['ContentsBackVisible'] || "true");
  const AutomaticSetting = eval(parameters['AutomaticSetting'] || "true");
  const ActorGraphicMode = Number(parameters['ActorGraphicMode'] || 1);
  const ActorX = Number(parameters['ActorX'] || 40);
  const ActorY = Number(parameters['ActorY'] || 0);
  const LevalY = Number(parameters['LevalY'] || 0);
  const FaceWidth = Number(parameters['FaceWidth'] || 144);
  const FaceHeight = Number(parameters['FaceHeight'] || 144);
  const FaceScale = Number(parameters['FaceScale'] || 100);
  const LevelPosition = Number(parameters['LevelPosition'] || 1);
  const ContentsX = Number(parameters['ContentsX'] || 0);
  const NumSaveRows = Number(parameters['NumSaveRows'] || 5);
  const MaxSave = Number(parameters['MaxSave'] || 20);
  const ContentsRight = eval(parameters['ContentsRight'] || "true");
  const _ContentsWidth = Number(parameters['ContentsWidth'] || 0);
  const AnyNameVariable = Number(parameters['AnyNameVariable'] || 0);
  const AnyDefaultName = String(parameters['AnyDefaultName'] || "");
  const PlaytimeName = String(parameters['PlaytimeName'] || "プレイ時間");
  const LocationName = String(parameters['LocationName'] || "現在地");
  const MoneyName = String(parameters['MoneyName'] || "所持金");
  const T_Left = Number(parameters['T_Left'] || 1);
  const T_Right = Number(parameters['T_Right'] || 0);
  const B_Left = Number(parameters['B_Left'] || 3);
  const B_Right = Number(parameters['B_Right'] || 1);
  const OriginalName1 = String(parameters['OriginalName1'] || "");
  const OriginalName2 = String(parameters['OriginalName2'] || "");
  const OriginalEval1 = String(parameters['OriginalEval1'] || "");
  const OriginalEval2 = String(parameters['OriginalEval2'] || "");
  const InfoSaveSnap = eval(parameters['InfoSaveSnap'] || "true");
  const SaveSnapQuality = eval(parameters['SaveSnapQuality'] || 0.92);
  const SaveSnapX = Number(parameters['SaveSnapX'] || 0);
  const SaveSnapY = Number(parameters['SaveSnapY'] || 0);
  const SaveSnapScale = Number(parameters['SaveSnapScale'] || 15);
  const DayTime = String(parameters['DayTime']);
  const BackGroundImg = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['BackGroundImg'])[0]) : null;
  const ContentsBackGroundImg = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ContentsBackGroundImg'])) : null;

  const pluginName = "NUUN_SaveScreen";
  PluginManager.registerCommand(pluginName, 'ChangeBackground', args => {
    const data = DataManager.nuun_structureData(args.BackGroundImg)[0];
    if (data) {
      $gameSystem.setSaveBuckGround(data, Number(args.BackGroundId));
    }
  });

  PluginManager.registerCommand(pluginName, 'UserAutoSave', args => {
    SceneManager.snapSaveBitmap(eval(args.OnSaveSnap));
    SceneManager._scene.executeAutosave();
  });

  const _DataManager_loadSavefileImages = DataManager.loadSavefileImages;
  DataManager.loadSavefileImages = function(info) {
    _DataManager_loadSavefileImages.call(this, info);
    if (info.svActor && Symbol.iterator in info.svActor) {
      for (const character of info.svActor) {
        ImageManager.loadSvActor(character[0]);
      }
    }
    if (info.snap) {
      ImageManager.loadSaveSnapBitmap(info.snap);
    }
  };

  const _DataManager_makeSavefileInfo  = DataManager.makeSavefileInfo ;
  DataManager.makeSavefileInfo = function() {
    const info = _DataManager_makeSavefileInfo.call(this);
    info.svActor = $gameParty.svActorForSavefile();
    info.AnyName = $gameVariables.value(AnyNameVariable);
    info.mapname = $gameMap.displayName();
    info.gold = $gameParty._gold;
    info.levelActor = $gameParty.actorLevelForSavefile();
    info.OriginalDate1 = eval(OriginalEval1);
    info.OriginalDate2 = eval(OriginalEval2);
    info.background = $gameSystem.saveBuckgroundImg;
    if ($gameSystem.onSnap) {
      DataManager.urlBitmapData();
      info.snap = this.urlBitmap;
    } else {
      info.snap = null;
    }
    return info;
  };

  DataManager.loadBackground = function() {
    const globalInfo = this._globalInfo;
    const validInfo = globalInfo.slice(1).filter(x => x);
    const id = Math.max(...validInfo.map(x => this.backgroundId(x)));
    const index = globalInfo.findIndex(x => x && this.backgroundId(x) === id);
    return globalInfo[index].background ? globalInfo[index].background[0] : null;
  };

  DataManager.backgroundId = function(x) {
    return x.background ? x.background[1] : 0;
  };

  DataManager.snapBitmap = function() {
    return SceneManager.getSnapBitmap();
  };

  DataManager.urlBitmapData = function() {
    this.urlBitmap = this.toDataURL();
  };

  DataManager.toDataURL = function() {
    const png = this.svaeSnapBitmap()._canvas.toDataURL('image/png', SaveSnapQuality);
    const jpeg = this.svaeSnapBitmap()._canvas.toDataURL('image/jpeg', SaveSnapQuality);
    return (png.length < jpeg.length) ? png : jpeg;
  };

  DataManager.svaeSnapBitmap = function(){
    const bitmap = this.snapBitmap();
    if (bitmap) {
      const width = bitmap.width * SaveSnapScale / 100;
      const height = bitmap.height * SaveSnapScale / 100;
      const snapBitmap = new Bitmap(width, height);
      snapBitmap.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, snapBitmap.width, snapBitmap.height);
      return snapBitmap;
    }
    return null;
  };

  SceneManager.snapSaveBitmap = function(mode) {
    $gameSystem.onSnap = mode;
    if (mode) {
      if (this._snapBitmap) {
        this._snapBitmap.destroy();
      }
      this._snapBitmap = this.snap();
    }
  };

  SceneManager.getSnapBitmap = function() {
    return this._snapBitmap;
  };

  SceneManager.snapSaveBackground = function() {
    $gameSystem.onSnap = InfoSaveSnap;
    if (InfoSaveSnap) {
      if (this._snapBitmap) {
        this._snapBitmap.destroy();
      }
      this._snapBitmap = this._backgroundBitmap;
    }
  };

  const _SceneManager_snapForBackground = SceneManager.snapForBackground;
  SceneManager.snapForBackground = function() {
    _SceneManager_snapForBackground.call(this);
    this.snapSaveBackground();
  };

  ImageManager.loadSaveSnapBitmap = function(url) {
    const has = Utils.hasEncryptedImages();
    let bitmap = null;
    if (has) {
      Utils._hasEncryptedImages = false;
      bitmap = ImageManager.loadBitmapFromUrl(url);
      Utils._hasEncryptedImages = true;
    } else {
      bitmap = ImageManager.loadBitmapFromUrl(url);
    }
    return bitmap;
  };

  const _DataManager_maxSavefiles = DataManager.maxSavefiles;
  DataManager.maxSavefiles = function() {
    return MaxSave ? MaxSave : _DataManager_maxSavefiles.call(this);
  };

  const _Scene_File_create = Scene_File.prototype.create;
  Scene_File.prototype.create = function() {
    this.createBackground();
    _Scene_File_create.call(this);
  };

  const _Scene_File_createListWindow = Scene_File.prototype.createListWindow;
  Scene_File.prototype.createListWindow = function() {
    _Scene_File_createListWindow.call(this);
    if ($gameSystem.getSaveBuckGround()) {
      this._listWindow.opacity = 0;
    }
  };

  const _Scene_File_createHelpWindow = Scene_File.prototype.createHelpWindow;
  Scene_File.prototype.createHelpWindow = function() {
    _Scene_File_createHelpWindow.call(this);
    if ($gameSystem.getSaveBuckGround()) {
      this._helpWindow.opacity = 0;
    }
  };

  Scene_File.prototype.createBackground = function() {
    Scene_MenuBase.prototype.createBackground.call(this);
    if (BackGroundImg) {
      let data = null;
      if (this.mode() === 'save') {
        data = $gameSystem.getSaveBuckGround();
      } else {
        data = DataManager.loadBackground() || BackGroundImg;
      }
      if (data) {
        const sprite = new Sprite();
        sprite.bitmap = ImageManager.nuun_LoadPictures(data);
        if (data) {
          this.addChild(sprite);
          if (sprite.bitmap && !sprite.bitmap.isReady()) {
            sprite.bitmap.addLoadListener(this.setBackGround.bind(this, sprite));
          } else {
            this.setBackGround(sprite);
          }
        }
      }
    }
  };

  Scene_File.prototype.setBackGround = function(sprite) {
    if (BackUiWidth) {
      sprite.x = (Graphics.width - (Graphics.boxWidth + 8)) / 2;
      sprite.y = (Graphics.height - (Graphics.boxHeight + 8)) / 2;
      sprite.scale.x = (Graphics.boxWidth + 8 !== sprite.bitmap.width ? (Graphics.boxWidth + 8) / sprite.bitmap.width : 1);
      sprite.scale.y = (Graphics.boxHeight + 8 !== sprite.bitmap.height ? (Graphics.boxHeight + 8) / sprite.bitmap.height : 1);
    } else {
      sprite.scale.x = (Graphics.width !== sprite.bitmap.width ? Graphics.width / sprite.bitmap.width : 1);
      sprite.scale.y = (Graphics.height !== sprite.bitmap.height ? Graphics.height / sprite.bitmap.height : 1);
    }
  };

  const _Window_SavefileList_initialize = Window_SavefileList.prototype.initialize;
  Window_SavefileList.prototype.initialize = function(rect) {
    _Window_SavefileList_initialize.call(this, rect);
    this._contentsBackVisible = ContentsBackVisible;
  };

  const _Window_SavefileList_numVisibleRows = Window_SavefileList.prototype.numVisibleRows;
  Window_SavefileList.prototype.numVisibleRows = function() {
    return NumSaveRows ? NumSaveRows : _Window_SavefileList_numVisibleRows.call(this);
  };

  const _Window_SavefileList_drawItem = Window_SavefileList.prototype.drawItem;
  Window_SavefileList.prototype.drawItem = function(index) {
    this._FaceOn = false;
    _Window_SavefileList_drawItem.call(this, index);
    const savefileId = this.indexToSavefileId(index);
    if (!DataManager.savefileInfo(savefileId)) {
      this._FaceOn = true;
    }
    const rect = this.itemRectWithPadding(index);
    this.drawTitle(savefileId, rect.x, rect.y + 4);
  };

  const _Window_SavefileList_drawTitle = Window_SavefileList.prototype.drawTitle;
  Window_SavefileList.prototype.drawTitle = function(savefileId, x, y) {
    if (this._FaceOn) {
      this.contents.fontSize = MainFontSizeMainFontSize;
      _Window_SavefileList_drawTitle.call(this, savefileId, x, y - 4);
      this.contents.fontSize = $gameSystem.mainFontSize();
      this._FaceOn = false;
    }
  };

  Window_SavefileList.prototype.drawContents = function(info, rect) {
    //キャラクター
    if (rect.width >= 420) {
      this._maxHeight = rect.height - 4
      let x = ActorX + rect.x;
      let width = 0;
      let height = 0;
      if (ActorGraphicMode === 2) {
        let y = ActorY + rect.y + 2;
        const scale = FaceScale / 100;
        width = FaceWidth > 0 ? FaceWidth : ImageManager.faceWidth;
        height = FaceHeight > 0 ? FaceHeight : ImageManager.faceHeight;
        const heightScale = height * scale;
        this._scaleMode = 0;
        if (heightScale === height) {
          height = Math.min(height, this._maxHeight);
          this._scaleMode = 0;
        } else if (heightScale > this._maxHeight){
          this._scaleMode = 1;
        }
        this.drawPartyFace(info, x, y, width, height);
      } else if (ActorGraphicMode === 1) {
        const bottom = rect.y + rect.height + ActorY;
        this.drawPartyCharacters(info, x, bottom - 8);
      } else if (ActorGraphicMode === 3) {
        const bottom = rect.y + rect.height + ActorY;
        this.drawPartySvActors(info, x, bottom - 8);
      }
    }
    this._FaceOn = true;
    //任意の文字列
    this.drawAnyName(info, rect.x + 200, rect.y + 2, rect.width - 200);
    //フリーゾーン
    const padding = this.itemPadding();
    height = Math.floor(rect.height / 3);
    const sx = !ContentsRight ? ContentsX : (_ContentsWidth > 0 ? Graphics.boxWidth - _ContentsWidth - 48 : 240);
    let x2 = rect.x + sx;
    let y2 = (height) + rect.y - 2;_ContentsWidth
    width = (_ContentsWidth > 0 ? _ContentsWidth : rect.width - sx) / (T_Right === 0 ? 1 : 2);
    this.drawSnapBitmap(info, rect.x + SaveSnapX, rect.y + SaveSnapY);
    this.drawContentsBase(info, x2, y2, width - padding, T_Left);
    x2 += width;
    this.drawContentsBase(info, x2, y2, width - padding, T_Right);
    x2 = rect.x + sx;
    y2 += height - 2;
    width = (_ContentsWidth > 0 ? _ContentsWidth : rect.width - sx) / (B_Right === 0 ? 1 : 2);
    this.drawContentsBase(info, x2, y2, width - padding, B_Left);
    x2 += width;
    this.drawContentsBase(info, x2, y2, width - padding, B_Right);
  };

  Window_SavefileList.prototype.drawContentsBase = function(info, x, y, width, value) {
    switch (value) {
      case 0:
        break;
      case 1:
        this.drawPlaytime(info, x, y, width);
        break;
      case 2:
        this.drawMapName(info, x, y, width);
        break;
      case 3:
        this.drawGold(info, x, y, width);
        break;
      case 4:
        this.drawDayTime(info, x, y, width);
        break;
      case 10:
        this.drawOriginal_1(info, x, y, width);
        break;
      case 11:
        this.drawOriginal_2(info, x, y, width);
        break;
    }
  };

  const _Window_SavefileList_drawPartyCharacters = Window_SavefileList.prototype.drawPartyCharacters;
  Window_SavefileList.prototype.drawPartyCharacters = function(info, x, y) {
    _Window_SavefileList_drawPartyCharacters.call(this, info, x, y);
    if (info.characters) {
      this.drawPartyLeval(info, x - 21, y, 48, 0, 0);
    }
  };

  Window_SavefileList.prototype.drawPartySvActors = function(info, x, y) {
    if (info.svActor) {
      let characterX = x;
      for (const data of info.svActor) {
          this.drawSvActor(data[0], characterX, y);
          characterX += 64;
      }
      this.drawPartyLeval(info, x, y, 64, 0, 0);
    }
  };

  Window_SavefileList.prototype.drawPartyFace = function(info, x, y, width, height) {
    if (info.faces) {
        let characterX = x;
        const faceWidth = this._scaleMode === 1 ? this._maxHeight : Math.floor(width * FaceScale / 100);
        for (const data of info.faces) {
          this.drawFace(data[0], data[1], characterX, y, width, height);
          characterX += faceWidth;
        }
        this.drawPartyLeval(info, x + 8, y, faceWidth, height, 1);
    }
  };

  Window_SavefileList.prototype.drawSvActor = function(data, x, y) {
    if (data) {
      const motionIndex = 0;
      const bitmap = ImageManager.loadSvActor(data);
      const pw = Math.floor(bitmap.width / 9);
      const ph = Math.floor(bitmap.height / 6);
      const sx = Math.floor(motionIndex / 6) * 3;
      const sy = motionIndex % 6;
      this.contents.blt(bitmap, sx, sy, pw, ph, x, y - ph);
    }
  };

  Window_SavefileList.prototype.drawPartyLeval = function(info, x, y, width, height, mode) {
    this.contents.fontSize = mode === 0 ? 16 : ContentsFontSizeMainFontSize;
    if (info.levelActor && LevelPosition > 0) {
      let levelActorX = x;
      let textWidth = width;
      let y2 = y;
      if (mode === 0) {
        y2 = y2 - (LevelPosition === 2 ? Math.min(84 - MainFontSizeMainFontSize, 60) : 24);
        textWidth -= 6;
      } else {
        if (LevelPosition === 2) {
          y2 += Math.max(MainFontSizeMainFontSize - ActorY, 0) - 4;
        } else {
          y2 += this._maxHeight - ContentsFontSizeMainFontSize - 12 - ActorY;
        }
        textWidth = Math.max(width / 2, 72) - 8;
      }
      y2 += LevalY;
      for (const data of info.levelActor) {
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(TextManager.levelA, levelActorX, y2, textWidth);
        this.resetTextColor();
        this.drawText(data, levelActorX, y2, textWidth, "right");
        levelActorX += width;
      }
    }
    this.resetFontSettings();
  };

  Window_SavefileList.prototype.drawSnapBitmap = function(info, x, y) {
    if (info.snap) {
      const bitmap = ImageManager.loadSaveSnapBitmap(info.snap);
      this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y);
    }
  };

  Window_SavefileList.prototype.drawAnyName = function(info, x, y, width) {
    this.contents.fontSize = MainFontSizeMainFontSize;
    let anyName = info.AnyName;
    if (!anyName) {
      anyName = AnyDefaultName ? AnyDefaultName : info.title;
    }
    if (anyName ) {
      this.drawText(anyName , x, y, width, "left");
    }
    this.contents.fontSize = $gameSystem.mainFontSize();
  };


  const _Window_SavefileList_drawPlaytime = Window_SavefileList.prototype.drawPlaytime;
  Window_SavefileList.prototype.drawPlaytime = function(info, x, y, width) {
    const contentsWidth = this.textWidth(PlaytimeName);
    this.contents.fontSize = ContentsFontSizeMainFontSize;
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(PlaytimeName, x, y, contentsWidth);
    this.resetTextColor();
    _Window_SavefileList_drawPlaytime.call(this, info, x + contentsWidth, y, width - contentsWidth);
    this.contents.fontSize = $gameSystem.mainFontSize();
  };

  Window_SavefileList.prototype.drawDayTime = function(info, x, y, width) {
    this.resetTextColor();
    if (info.timestamp) {
      this.contents.fontSize = ContentsFontSizeMainFontSize;
      const _dayTime = new Date(info.timestamp);
      const format = _dayTime.toLocaleString(eval(DayTime));
      this.drawText(format, x, y, width, "right");
    }
    this.contents.fontSize = $gameSystem.mainFontSize();
  };

  Window_SavefileList.prototype.drawMapName = function(info, x, y, width) {
    const contentsWidth = this.textWidth(LocationName);
    this.contents.fontSize = ContentsFontSizeMainFontSize;
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(LocationName, x, y, contentsWidth);
    this.resetTextColor();
    if (info.mapname) {
      this.drawText(info.mapname, x + contentsWidth, y, width - contentsWidth, "right");
    }
    this.contents.fontSize = $gameSystem.mainFontSize();
  };

  Window_SavefileList.prototype.drawGold = function(info, x, y, width) {
    const contentsWidth = this.textWidth(MoneyName);
    this.contents.fontSize = ContentsFontSizeMainFontSize;
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(MoneyName, x, y, contentsWidth);
    this.resetTextColor();
    if (info.gold !== undefined) {
      const unit = TextManager.currencyUnit;
      this.drawCurrencyValue(info.gold, unit, x + contentsWidth, y, width - contentsWidth)
    }
    this.contents.fontSize = $gameSystem.mainFontSize();
  };

  Window_SavefileList.prototype.drawOriginal_1 = function(info, x, y, width) {
    const contentsWidth = this.textWidth(OriginalName1);
    this.contents.fontSize = ContentsFontSizeMainFontSize;
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(OriginalName1, x, y, contentsWidth);
    this.resetTextColor();
    if (info.OriginalDate1) {
      this.drawText(info.OriginalDate1, x + contentsWidth, y, width - contentsWidth, "right");
    }
    this.contents.fontSize = $gameSystem.mainFontSize();
  };

  Window_SavefileList.prototype.drawOriginal_2 = function(info, x, y, width) {
    const contentsWidth = this.textWidth(OriginalName2);
    this.contents.fontSize = ContentsFontSizeMainFontSize;
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(OriginalName2, x, y, contentsWidth);
    this.resetTextColor();
    if (info.OriginalDate2) {
      this.drawText(info.OriginalDate2, x + contentsWidth, y, width - contentsWidth, "right");
    }
    this.contents.fontSize = $gameSystem.mainFontSize();
  };

  Window_SavefileList.prototype.drawFace = function(faceName, faceIndex, x, y, width, height) {
    width = width || ImageManager.faceWidth;
    height = height || ImageManager.faceHeight;
    const scale = FaceScale / 100;
    const bitmap = ImageManager.loadFace(faceName);
    const pw = ImageManager.faceWidth;
    const ph = ImageManager.faceHeight;
    const sw = Math.min(width, pw);
    const sh = Math.min(height, ph);
    const dx = Math.floor(x + Math.max(width - pw, 0) / 2);
    const dy = Math.floor(y + Math.max(height - ph, 0) / 2);
    const sx = Math.floor((faceIndex % 4) * pw + (pw - sw) / 2);
    const sy = Math.floor(Math.floor(faceIndex / 4) * ph + (ph - sh) / 2);
    const dw = this._scaleMode === 1 ? this._maxHeight : Math.floor(sw * scale);
    const dh = this._scaleMode === 1 ? this._maxHeight : Math.floor(sh * scale);
    this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
  };

  const _Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    _Game_System_initialize.call(this);
    this.saveBuckgroundImg = [BackGroundImg, 0];
    this.onSnap = false;
  };

  Game_System.prototype.setSaveBuckGround = function(img, id) {
    const buckgroundId = AutomaticSetting ? (this.buckgroundId || 0) + 1 : id;
    this.saveBuckgroundImg = [img, buckgroundId];
  };

  Game_System.prototype.getSaveBuckGround = function() {
    this.saveBuckgroundImg = this.saveBuckgroundImg || [BackGroundImg, 0];
    return this.saveBuckgroundImg[0];
  };

  Game_System.prototype.getSaveBuckGroundId = function() {
    return this.saveBuckgroundImg[1] || 0;
  };

  Game_Party.prototype.actorLevelForSavefile = function() {
    return this.battleMembers().map(actor => [
        actor._level
    ]);
  };

  Game_Party.prototype.svActorForSavefile = function() {
    return this.battleMembers().map(actor => [
        actor.battlerName()
    ]);
  };

})();