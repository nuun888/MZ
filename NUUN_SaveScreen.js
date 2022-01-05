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
 * @version 1.8.2
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * セーブ画面にいくつかの項目を追加します。
 * 顔グラ、サイドビューアクターを表示できます。
 * キャラクター上にレベルを表示できます。
 * 現在の章などの文字を表示可能。
 * プレイ時間、現在地、所持金、任意、セーブ時刻の項目が表示可能です。
 * スナップショットを表示可能。
 * 
 * ファイル名横の表示文字の評価式
 * info.AnyName:表示文字列
 * info.title:ゲームタイトル名
 * 
 * 背景画像の変更
 * ゲームの進行によって背景画像を変更出来ます。
 * 初期設定ではプラグインコマンド「背景画像変更」で変更したたびに背景IDが変更されます。
 * 背景IDはロード画面でIDの一番高いセーブデータの背景が表示されます。
 * 
 * オリジナルパラメータ
 * オリジナルパラメータを設定するにはインフォオリジナルパラメータデータで取得するデータを設定する必要があります。
 * 表示項目の評価式で表示したいパラメータの配列番号（インフォオリジナルパラメータデータリスト番号）を記入します。
 * info.orgParam[id - 1]
 * 例
 * リスト1番ならinfo.orgParam[0]
 * 
 * スナップショットを表示するとセーブ容量が大きります。
 * アツマールで公開する場合は最大セーブ数を減らすこと推奨いたします。
 * 
 * Ver.1.3.0からNUUN_Base Ver.1.1.3以降が必要となります。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/1/5 Ver.1.8.2
 * 名称が取得できない問題を修正。
 * オリジナルパラメータの設定方法を変更。
 * 2021/12/30 Ver.1.8.1
 * コンテンツ背景を独自の画像を設定できる機能を追加。
 * 2021/12/12 Ver.1.8.0
 * コンテンツの表示設定を変更。
 * プラグインコマンドが適用されていなかった問題を修正。
 * ファイル名横の表示する文字の設定方法を変更。
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
 * @command SetAnyName
 * @desc ファイル名横に表示される文字列を設定します。取得パラメータはinfo.AnyNameで取得できます。
 * @text ファイル名横表示文字列
 * 
 * @arg AnyName
 * @text 表示文字列
 * @desc 表示文字列を記入します。現在のキャプターを表示したい時に設定します。。
 * @type string
 * @default 
 * 
 * 
 * @param BasicSetting
 * @text 基本設定
 * @default ------------------------------
 * 
 * @param NumSaveRows
 * @desc 画面に表示するセーブ数
 * @text 表示セーブ数
 * @type number
 * @default 5
 * @parent BasicSetting
 * 
 * @param MaxSave
 * @desc 最大セーブ数
 * @text 最大セーブ数
 * @type number
 * @default 20
 * @parent BasicSetting
 * 
 * @param OrgParamList
 * @desc オリジナルパラメータをセーブインフォに格納します。（複数指定可能）info.orgParam[id - 1]で取得できます。
 * @text インフォオリジナルパラメータデータ
 * @type combo[]
 * @option '$gameParty.steps();//歩数'
 * @option '$gameSystem.battleCount();//戦闘回数'
 * @option '$gameSystem.escapeCount();//逃走回数'
 * @option '$gameSystem.saveCount();//セーブ回数'
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option '$gameSystem.chronus().getDateFormat(1);//ゲーム内時間の導入プラグイン日時フォーマット1'
 * @option '$gameSystem.chronus().getDateFormat(2);//ゲーム内時間の導入プラグイン日時フォーマット2'
 * @default 
 * @parent BasicSetting
 * 
 * @param Font
 * @text フォント設定
 * @default ------------------------------
 * 
 * @param MainFontSizeMainFontSize
 * @desc ファイルタイトル、ファイル名横文字列のフォントサイズ
 * @text ファイルタイトル、ファイル名横文字列フォントサイズ
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
 * @desc ファイル名横文字列変数番号。プラグインコマンド「ファイル名横表示文字列」で設定している場合は表示されません。
 * @text ファイル名横文字列表示変数番号
 * @type variable
 * @default 0
 * @parent AnyName
 * 
 * @param AnyNameEval
 * @desc ファイル名横文字列表示評価式。
 * @text ファイル名横文字列表示評価式
 * @type string
 * @default info.AnyName ? info.AnyName : info.title
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
 * @param ContentsBackGroundImg
 * @desc コンテンツ背景画像ファイル名を指定します。
 * @text コンテンツ背景画像
 * @type file[]
 * @dir img/
 * @default []
 * @parent BackGround
 * 
 * @param Contents
 * @text 各コンテンツ設定
 * @default ------------------------------
 * 
 * @param ContentsList
 * @desc 表示する項目。
 * @text 表示項目
 * @type struct<ContentsListData>[]
 * @default ["{\"DateSelect\":\"3\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"true\"}","{\"DateSelect\":\"1\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\"}","{\"DateSelect\":\"4\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"2\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\"}"]
 * @parent Contents
 * 
 * @param ContentsX
 * @desc コンテンツエリアのX座標
 * @text コンテンツエリアX座標
 * @type number
 * @default 220
 * @min 0
 * @parent Contents
 * 
 * @param ContentsWidth
 * @desc コンテンツエリアの横幅（0でデフォルト幅）
 * @text コンテンツエリア横幅
 * @type number
 * @default 0
 * @min 0
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
 * @param SaveSnapSetting
 * @text セーブスナップショット設定
 * @default ------------------------------
 * 
 * @param InfoSaveSnap
 * @text スナップショット有効化
 * @desc スナップショットを有効にします。
 * @type boolean
 * @default false
 * @parent SaveSnapSetting
 * 
 * @param SaveSnapQuality
 * @desc スナップショットの画質。(デフォルト値0.92)
 * @text スナップショット画質
 * @type string
 * @default 0.92
 * @max 1
 * @parent SaveSnapSetting
 * 
 * @param SaveSnapX
 * @desc スナップショットのX座標
 * @text スナップショットX座標
 * @type number
 * @default 650
 * @parent SaveSnapSetting
 * 
 * @param SaveSnapY
 * @desc スナップショットのY座標
 * @text スナップショットY座標
 * @type number
 * @default 8
 * @parent SaveSnapSetting
 * 
 * @param SaveSnapScale
 * @desc スナップショットの拡大率（％）
 * @text スナップショット拡大率（％）
 * @type number
 * @default 12
 * @min 0
 * @parent SaveSnapSetting
 * 
 */
/*~struct~ContentsListData:
 * 
 * @param DateSelect
 * @text 表示するステータス
 * @desc 表示するステータスを指定します。
 * @type select
 * @option なし
 * @value 0
 * @option プレイ時間(1)(2)(4)(5)(6)(7)(8)(9)(10)
 * @value 1
 * @option セーブ時刻(1)(2)(4)(5)(6)(7)(8)(9)(10)
 * @value 2
 * @option 現在地(1)(2)(4)(5)(6)(7)(8)(9)(10)
 * @value 3
 * @option 所持金(1)(2)(4)(5)(6)(7)(8)(9)(10)
 * @value 4
 * @option オリジナル項目(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)
 * @value 5
 * @option ライン(1)(4)(5)(6)(7)(8)(10)
 * @value 100
 * @default 0
 * 
 * @param NameColor
 * @desc システム項目の文字色。テキストタブでカラーコードを入力できます。
 * @text システム項目文字色(1)
 * @type number
 * @default 16
 * @min 0
 * 
 * @param ParamName
 * @desc 項目の名称を設定します。
 * @text 名称(2)
 * @type string
 * @default
 * 
 * @param DetaEval
 * @desc 評価式。（リスト1のみ）
 * @text 評価式(javaScript)(3)
 * @type combo[]
 * @option 'info.orgParam[0]'
 * @option 'info.orgParam? info.orgParam[0] : 0'
 * @default 
 * 
 * @param X_Position
 * @text X表示列位置(4)
 * @desc X表示列位置
 * @type number
 * @default 1
 * @min 1
 * @max 3
 * 
 * @param Y_Position
 * @desc Y表示行位置
 * @text Y表示行位置(5)
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * 
 * @param X_Coordinate
 * @text X座標（相対）(6)
 * @desc X座標（X表示列位置からの相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param Y_Coordinate
 * @text Y座標（相対）(7)
 * @desc Y座標（Y表示列位置からの相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param ItemWidth
 * @desc 項目横幅（0でデフォルト幅）
 * @text 項目横幅(8)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param SystemItemWidth
 * @desc システム項目の横幅（0でデフォルト幅）
 * @text システム項目横幅(9)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param WideMode
 * @desc ワイド表示モード
 * @text ワイド表示モード(10)
 * @type boolean
 * @default false
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
  const AnyNameEval = String(parameters['AnyNameEval'] || "");
  const OrgParamList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['OrgParamList'])) : null) || [];
  const InfoSaveSnap = eval(parameters['InfoSaveSnap'] || "true");
  const SaveSnapQuality = eval(parameters['SaveSnapQuality'] || 0.92);
  const SaveSnapX = Number(parameters['SaveSnapX'] || 0);
  const SaveSnapY = Number(parameters['SaveSnapY'] || 0);
  const SaveSnapScale = Number(parameters['SaveSnapScale'] || 15);
  const DayTime = String(parameters['DayTime']);
  const ContentsList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ContentsList'])) : null) || [];
  const BackGroundImg = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['BackGroundImg'])[0]) : null;
  const ContentsBackGroundImg = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ContentsBackGroundImg'])[0]) : null;

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

  PluginManager.registerCommand(pluginName, 'SetAnyName', args => {
    $gameSystem.saveAnyName = args.AnyName;
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
    info.AnyName = $gameSystem.saveAnyName ? $gameSystem.saveAnyName : $gameVariables.value(AnyNameVariable);
    info.mapname = $gameMap.displayName();
    info.gold = $gameParty._gold;
    info.levelActor = $gameParty.actorLevelForSavefile();
    info.background = $gameSystem.saveBuckgroundImg;
    info.orgParam = this.getOrgParams();
    if ($gameSystem.onSnap) {
      DataManager.urlBitmapData();
      info.snap = this.urlBitmap;
    } else {
      info.snap = null;
    }
    return info;
  };

  DataManager.getOrgParams = function() {
    return OrgParamList.map(data => eval(data));
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

  Window_SavefileList.prototype.maxContentsCols = function() {
    return 2;
  };

  const _Window_SavefileList_numVisibleRows = Window_SavefileList.prototype.numVisibleRows;
  Window_SavefileList.prototype.numVisibleRows = function() {
    return NumSaveRows ? NumSaveRows : _Window_SavefileList_numVisibleRows.call(this);
  };

  const _Window_SavefileList_drawItemBackground = Window_SavefileList.prototype.drawItemBackground;
  Window_SavefileList.prototype.drawItemBackground = function(index) {
    if (ContentsBackGroundImg) {
      const bitmap = ImageManager.nuun_LoadPictures(ContentsBackGroundImg);
      if (bitmap && !bitmap.isReady()) {
        bitmap.addLoadListener(this.drawContentsBack.bind(this, bitmap, index));
      } else {
        this.drawContentsBack(bitmap, index);
      }
    } else {
      _Window_SavefileList_drawItemBackground.call(this, index);
    }
  };

  Window_SavefileList.prototype.drawContentsBack = function(bitmap, index) {
    const rect = this.itemRect(index);
    this.contentsBack.blt(bitmap, 0, 0, rect.width, rect.height, rect.x + 1, rect.y + 1, rect.width - 2, rect.height - 2);
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

  Window_SavefileList.prototype.drawActors = function(info, x, y, width, height) {
    if (width >= 420) {
      this._maxHeight = height - 4;
      let x2 = ActorX + x;
      let w = 0;
      let h = 0;
      if (ActorGraphicMode === 2) {
        let y2 = ActorY + y + 2;
        const scale = FaceScale / 100;
        w = FaceWidth > 0 ? FaceWidth : ImageManager.faceWidth;
        h = FaceHeight > 0 ? FaceHeight : ImageManager.faceHeight;
        const heightScale = h * scale;
        let scaleMode = 0;
        if (heightScale === h) {
          h = Math.min(h, this._maxHeight);
          scaleMode = 0;
        } else if (heightScale > this._maxHeight){
          scaleMode = 1;
        }
        this.drawPartyFace(info, x2, y2, w, h, scaleMode);
      } else if (ActorGraphicMode === 1) {
        const bottom = y + height + ActorY;
        this.drawPartyCharacters(info, x2, bottom - 8);
      } else if (ActorGraphicMode === 3) {
        const bottom = y + height + ActorY;
        this.drawPartySvActors(info, x2, bottom - 8);
      }
    }
    this._FaceOn = true;
  };

  Window_SavefileList.prototype.drawContents = function(info, rect) {
    const width = Math.floor(rect.width / this.maxContentsCols()) - this.colSpacing();
    this.drawSnapBitmap(info, rect.x + SaveSnapX, rect.y + SaveSnapY);
    this.drawActors(info, rect.x, rect.y, rect.width, rect.height);
    this.drawContentsData(info, rect.x + ContentsX, rect.y, rect.width, rect.height);
    this.drawAnyName(info, rect.x + 200, rect.y + 2, rect.width - 200);
  };

  Window_SavefileList.prototype.drawContentsData = function(info, x, y, width) {
    const CWidth = (_ContentsWidth > 0 ? _ContentsWidth : width);
    width = Math.min(CWidth, width - ContentsX);
    const itemWidth = this.itemContentsWidth(width);
    const list = ContentsList;
    const lineHeight = ContentsFontSizeMainFontSize + 4;
    const colSpacing = this.colSpacing();
    y += MainFontSizeMainFontSize + 4;
    for (const data of list) {
      const x_Position = data.X_Position;
      const position = Math.min(x_Position, this.maxContentsCols());
      const contentsX = x + (itemWidth + colSpacing) * (position - 1) + data.X_Coordinate;
      const contentsY = y + lineHeight * (data.Y_Position - 1) + data.Y_Coordinate;
      width2 = data.ItemWidth && data.ItemWidth > 0 ? data.ItemWidth : this.widthMode(data.WideMode, itemWidth);
      this.drawContentsBase(info, contentsX, contentsY, width2 - colSpacing / 2, data);
    }
  };

  Window_SavefileList.prototype.widthMode = function(mode, width) {
    if (mode) {
      width = width * 2 + this.colSpacing();
    }
    return width;
  };

  Window_SavefileList.prototype.itemContentsWidth = function(width) {
    return Math.floor(width / 2) - this.colSpacing();
  };

  Window_SavefileList.prototype.drawContentsBase = function(info, x, y, width, data) {
    switch (data.DateSelect) {
      case 0:
        break;
      case 1:
        this.drawPlaytime(info, x, y, width, data);
        break;
      case 2:
        this.drawDayTime(info, x, y, width, data);
        break;
      case 3:
        this.drawMapName(info, x, y, width, data);
        break;
      case 4:
        this.drawGold(info, x, y, width, data);
        break;
      case 5:
        this.drawOriginal(info, x, y, width, data);
        break;
      case 100:
        this.horzLine(info, x, y, width, data);
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

  Window_SavefileList.prototype.drawPartyFace = function(info, x, y, width, height, scaleMode) {
    if (info.faces) {
        let characterX = x;
        const faceWidth = this._scaleMode === 1 ? this._maxHeight : Math.floor(width * FaceScale / 100);
        for (const data of info.faces) {
          this.drawFace(data[0], data[1], characterX, y, width, height, scaleMode);
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
    this.resetTextColor();
    const anyName = eval(AnyNameEval);
    if (anyName) {
      this.drawText(anyName , x, y, width, "left");
    }
    this.contents.fontSize = $gameSystem.mainFontSize();
  };

  const _Window_SavefileList_drawPlaytime = Window_SavefileList.prototype.drawPlaytime;
  Window_SavefileList.prototype.drawPlaytime = function(info, x, y, width, data) {
    const text = data.ParamName || 'プレイ時間';
    const textWidth = this.systemWidth(data.SystemItemWidth, width);
    this.contents.fontSize = ContentsFontSizeMainFontSize;
    this.changeTextColor(getColorCode(data.NameColor));
    this.drawText(text, x, y, textWidth);
    this.resetTextColor();
    _Window_SavefileList_drawPlaytime.call(this, info, x + textWidth, y, width - textWidth);
    this.contents.fontSize = $gameSystem.mainFontSize();
  };

  Window_SavefileList.prototype.drawDayTime = function(info, x, y, width, data) {
    this.resetTextColor();
    if (info.timestamp) {
      this.contents.fontSize = ContentsFontSizeMainFontSize;
      const _dayTime = new Date(info.timestamp);
      const format = _dayTime.toLocaleString(eval(DayTime));
      this.drawText(format, x, y, width, "right");
    }
    this.contents.fontSize = $gameSystem.mainFontSize();
  };

  Window_SavefileList.prototype.drawMapName = function(info, x, y, width, data) {
    const text = data.ParamName || '現在地';
    const textWidth = this.systemWidth(data.SystemItemWidth, width);
    this.contents.fontSize = ContentsFontSizeMainFontSize;
    this.changeTextColor(getColorCode(data.NameColor));
    this.drawText(text, x, y, textWidth);
    this.resetTextColor();
    if (info.mapname) {
      this.drawText(info.mapname, x + textWidth, y, width - textWidth, "right");
    }
  };

  Window_SavefileList.prototype.drawGold = function(info, x, y, width, data) {
    const text = data.ParamName || '所持金';
    const textWidth = this.systemWidth(data.SystemItemWidth, width);
    this.contents.fontSize = ContentsFontSizeMainFontSize;
    this.changeTextColor(getColorCode(data.NameColor));
    this.drawText(text, x, y, textWidth);
    this.resetTextColor();
    if (info.gold !== undefined) {
      const unit = TextManager.currencyUnit;
      this.drawCurrencyValue(info.gold, unit, x + textWidth, y, width - textWidth)
    }
    this.contents.fontSize = $gameSystem.mainFontSize();
  };

  Window_SavefileList.prototype.drawOriginal = function(info, x, y, width, data) {
    const text = data.ParamName;
    let textWidth = 0;
    if (text) {
      textWidth = this.systemWidth(data.SystemItemWidth, width);
      this.contents.fontSize = ContentsFontSizeMainFontSize;
      this.changeTextColor(getColorCode(data.NameColor));
      this.drawText(text, x, y, textWidth);
    }
    this.resetTextColor();
    if (data.DetaEval && data.DetaEval[0]) {
      this.drawText(eval(data.DetaEval[0]), x + textWidth, y, width - textWidth, "right");
    }
    this.contents.fontSize = $gameSystem.mainFontSize();
  };

  Window_SavefileList.prototype.drawFace = function(faceName, faceIndex, x, y, width, height, scaleMode) {
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
    const dw = scaleMode === 1 ? this._maxHeight : Math.floor(sw * scale);
    const dh = scaleMode === 1 ? this._maxHeight : Math.floor(sh * scale);
    this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
  };

  Window_SavefileList.prototype.systemWidth = function(swidth, width) {
    return swidth > 0 ? swidth : Math.floor(width / 2);
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

  function getColorCode(color) {
    if (typeof(color) === "string") {
      return color;
    }
    return ColorManager.textColor(color);
  };
})();