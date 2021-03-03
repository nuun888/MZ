/*:-----------------------------------------------------------------------------------
 * NUUN_Result.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc  リザルト
 * @author NUUN
 * @version 1.4.2
 * 
 * @help
 * 戦闘終了時にリザルト画面を表示します。
 * デフォルトのリザルトはメッセージウィンドウで表示されますが、入手EXP、獲得金額、ドロップアイテムを１画面にし、レベルアップしたアクターがいない場合は決定キー（ボタン）を
 * １回押しただけでリザルトが終了します。
 * 
 * 入手画面では顔グラ又はキャラチップ、レベルアップ後のレベル、獲得金額、入手EXP、ドロップアイテムが表示されます。
 * レベルアップ画面ではレベル差分、ステータス差分、習得スキルが表示されます。
 * レベルアップ画面はレベルアップしたアクターのみ表示されます。
 * 
 * 戦闘勝利後に任意のBGMを再生できます。MEが指定してある場合はME再生終了後に再生されます。
 * 
 * 
 * アクターの独自パラメータ
 * actor アクターのデータベースデータ　メタデータを取得する場合はこちらから
 * this._actor アクターのゲームデータ
 * 
 * 獲得金額に金額アイコンを表示させる場合は「所持金拡張プラグイン」のアイコンの表示クラスに"Window_Result"を記入してください。（必ず'及び"で囲む）
 * 
 * プラグインコマンド
 * レベルアップ画面の表示の許可を設定できます。(注：このプラグインコマンドを実行後レベルアップ画面表示の設定が無効化されます）
 * 戦闘勝利後のBGMの再生の許可を設定できます。
 * 戦闘勝利後のBGMを指定することが出来ます。BGMに何も指定しないことでプラグインコマンドで指定したBGMは再生されなくなります。
 * 
 * 
 * 操作
 * エンター　切り替え、画面を閉じる 右クリック
 * ←→　ドロップアイテム、習得スキルページ切り替え
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/3/4 Ver.1.4.2
 * 獲得経験値が0の時に獲得経験値が表示されない問題を修正。
 * 獲得経験値が0の時に現在経験値の数値にNaNが表示される問題を修正。
 * 次のレベルまでの必要経験値のY座標計算に問題が生じたためユーザー側がY座標を調整できるように変更。
 * 2021/3/3 Ver.1.4.1
 * 決定キーを押しっぱなしで戦闘を終了するとリザルトウィンドウがすぐに閉じてしまう問題を修正。
 * ドロップアイテム、習得スキルのページ切り替えを押しっぱなしで切り替えられるように修正。
 * 2021/3/2 Ver.1.4.0
 * 背景画像を表示できる機能を追加。
 * ウィンドウ幅を0以外にしたときにドロップアイテム、習得スキルの表示位置がずれる問題を修正。
 * ウィンドウ幅を0以外にしたときにボタンが右端に来るよう修正。
 * 2021/3/1 Ver.1.3.1
 * 戦闘勝利後のBGMを設定できるプラグインコマンドを追加。
 * 2021/3/1 Ver.1.3.0
 * 勝利ME後に任意のBGMを再生する機能を追加。
 * プラグインコマンドでレベルアップ画面を表示を許可する機能を追加。(注：このプラグインコマンドを実行後レベルアップ画面表示の設定が無効化されます）
 * 2021/3/1 Ver.1.2.1
 * EXPゲージの数値を百分率表記にする機能を追加。
 * 最大レベルの時にゲージがMAXになるよう修正。
 * 2021/3/1 Ver.1.2.0
 * EXPゲージに数値を表示する機能を追加。
 * 2021/2/28 Ver.1.1.1
 * フォントサイズを変更したとき、経験値名称と獲得経験値の文字が被る問題を修正。
 * 入手画面のアクター名、レベル、経験値のフォントサイズが２２未満の時反映されるように変更。
 * 2021/2/28 Ver.1.1.0
 * 獲得金額の下に独自パラメータを表示する機能を追加。
 * レベルアップ画面に独自パラメータを表示する機能を追加。
 * レベルアップした時に表示するレベルアップ画面をカットする機能を追加。
 * レベルアップ画面のレベルのレベルアップ後の数値を色付け。
 * ドロップアイテムリストの表示が若干早く表示されていた問題を修正。
 * レベルアップ表示で表示横幅のアクター表示拡大率を考慮されていなかった問題を修正。
 * 2021/2/28 Ver.1.0.2
 * アクター画像の設置方法を変更。
 * レベルアップ画面のアクター名がシステムカラーになっていたので修正。
 * ゲージの更新フレーム時間を設定できる機能を追加。
 * 2021/2/27 Ver.1.0.1
 * レベルの表示幅を修正。
 * レベルアップステータスのレベルアップ後のステータスに色付け。
 * 右クリックでページ送りを出来るように変更。
 * 2021/2/27 Ver.1.0.0
 * 初版。
 * 
 * 
 * @param GetPage
 * @text 入手画面設定
 * 
 * @param ResultWidth
 * @desc ウィンドウの横幅。(0でUI横幅)デフォルト:808
 * @text ウィンドウ横幅
 * @type number
 * @default 808
 * @min 0
 * @parent GetPage
 * 
 * @param ResultHeight
 * @desc ウィンドウの縦幅。(0でUI縦幅)デフォルト:616
 * @text ウィンドウ縦幅
 * @type number
 * @default 616
 * @min 0
 * @parent GetPage
 * 
 * @param ActorShow
 * @desc アクターの画像を表示します。
 * @text アクター表示形式
 * @type select
 * @option 表示なし
 * @value 0
 * @option 顔グラを表示
 * @value 1
 * @option キャラチップを表示
 * @value 2
 * @default 1
 * @parent GetPage
 * 
 * @param FaceWidth
 * @desc 顔グラ、キャラチップ表示の横幅。
 * @text 顔グラの横幅
 * @type number
 * @default 144
 * @parent GetPage
 * 
 * @param FaceHeight
 * @desc １キャラ当たりの縦幅。
 * @text １キャラ当たりの縦幅
 * @type number
 * @default 120
 * @parent GetPage
 * 
 * @param FaceScale
 * @desc 顔グラの拡大率。（顔グラのみ）
 * @text 拡大率
 * @type number
 * @default 100
 * @parent GetPage
 * 
 * @param FaceScaleHeight
 * @type boolean
 * @default true
 * @text 高さ調整
 * @desc １キャラ当たりの縦幅を、顔グラの拡大率に合わせて高さ調整します。
 * @parent GetPage
 * 
 * @param GaugeValueShow
 * @desc EXPゲージの数値を表示する。
 * @text EXPゲージ数値表示
 * @type select
 * @option 表示なし
 * @value 0
 * @option 現在の経験値を表示
 * @value 1
 * @option 最大値と現在値を表示
 * @value 2
 * @option 百分率で表示
 * @value 3
 * @default 1
 * @parent GetPage
 * 
 * @param Decimal
 * @text 小数点桁数
 * @desc 表示出来る小数点桁数。
 * @type number
 * @default 0
 * @min 0
 * @parent GetPage
 * 
 * @param DecimalMode
 * @text 端数処理四捨五入
 * @desc 表示外小数点を四捨五入で丸める。（falseで切り捨て）
 * @type boolean
 * @default true
 * @parent GetPage
 * 
 * @param GaugeRefreshFrame
 * @desc EXPゲージの更新フレーム
 * @text EXPゲージ更新フレーム
 * @type number
 * @default 100
 * @parent GetPage
 * 
 * @param GaugeMaxValueFontSize
 * @desc ゲージ最大値数値のフォントサイズ。基本フォントサイズからの差
 * @text ゲージ最大値数値のフォントサイズ
 * @type number
 * @default -6
 * @min -100
 * @parent GetPage
 * 
 * @param GaugeMaxValueY
 * @type number
 * @default 0
 * @text ゲージ最大値Y座標調整
 * @desc ゲージ最大値のY座標を調整します。（相対座標）
 * @parent GetPage
 * 
 * @param PartyOriginalParamName
 * @text 独自パラメータ名称
 * @desc 獲得金額の下に表示する独自パラメータの名称を設定します。
 * @type string
 * @default
 * @parent GetPage
 * 
 * @param PartyOriginalParam
 * @text 独自パラメータ評価式
 * @desc 獲得金額の下に表示する独自パラメータの評価式を設定します。
 * @type string
 * @default
 * @parent GetPage
 * 
 * @param PartyOriginalParamName2
 * @text 独自パラメータ名称２
 * @desc 獲得金額の下に表示する独自パラメータの名称を設定します。
 * @type string
 * @default
 * @parent GetPage
 * 
 * @param PartyOriginalParam2
 * @text 独自パラメータ評価式２
 * @desc 獲得金額の下に表示する独自パラメータの評価式を設定します。
 * @type string
 * @default
 * @parent GetPage
 * 
 * @param PartyBackGroundImg
 * @desc 背景画像ファイル名を指定します。
 * @text 背景画像
 * @type file
 * @dir img/pictures
 * @parent GetPage
 * 
 * @param LevelUpPage
 * @text レベルアップ画面設定
 * 
 * @param LavelUpWindowShow
 * @type boolean
 * @default true
 * @text レベルアップ画面表示
 * @desc レベルアップ画面表示します。falseでレベルアップ後のステータス差分、習得スキル演出をカットします。
 * @parent LevelUpPage
 * 
 * @param ActorOriginalParamName
 * @text 独自パラメータ名称
 * @desc レベルアップ画面に表示する独自パラメータの名称を設定します。
 * @type string
 * @default
 * @parent LevelUpPage
 * 
 * @param ActorOriginalParam
 * @text 独自パラメータ評価式
 * @desc レベルアップ画面に表示する独自パラメータの評価式を設定します。
 * @type string
 * @default
 * @parent LevelUpPage
 * 
 * @param ActorOriginalParamName2
 * @text 独自パラメータ名称２
 * @desc レベルアップ画面に表示する独自パラメータの名称を設定します。
 * @type string
 * @default
 * @parent LevelUpPage
 * 
 * @param ActorOriginalParam2
 * @text 独自パラメータ評価式２
 * @desc レベルアップ画面に表示する独自パラメータの評価式を設定します。
 * @type string
 * @default
 * @parent LevelUpPage
 * 
 * @param ActorBackGroundImg
 * @desc 背景画像ファイル名を指定します。
 * @text 背景画像
 * @type file
 * @dir img/pictures
 * @parent LevelUpPage
 * 
 * @param CommonSetting
 * @text 共通設定
 * 
 * @param BackUiWidth
 * @text 背景サイズをウィンドウサイズに合わせる
 * @desc 背景サイズをウィンドウサイズに合わせる。
 * @type boolean
 * @default true
 * @parent CommonSetting
 * 
 * @param NameSetting
 * @text 名称設定
 * 
 * @param ResultName
 * @text 戦闘結果の名称
 * @desc 戦闘結果の名称を設定します。
 * @type string
 * @default 戦闘結果
 * @parent NameSetting
 * 
 * @param GetGoldName
 * @text 獲得金額の名称
 * @desc 獲得金額の名称を設定します。
 * @type string
 * @default 獲得金額
 * @parent NameSetting
 * 
 * @param GetEXPName
 * @text 獲得経験値の名称
 * @desc 獲得経験値の名称を設定します。
 * @type string
 * @default 経験値
 * @parent NameSetting
 * 
 * @param GetItemName
 * @text 入手アイテムの名称
 * @desc 入手アイテムの名称を設定します。
 * @type string
 * @default 入手アイテム
 * @parent NameSetting
 * 
 * @param LevelUpName
 * @text レベルアップの名称
 * @desc レベルアップの名称を設定します。
 * @type string
 * @default LEVEL UP
 * @parent NameSetting
 * 
 * @param learnSkillName
 * @text 習得スキル名称
 * @desc 習得スキルの名称を設定します。
 * @type string
 * @default 習得スキル
 * @parent NameSetting
 * 
 * @param SESetting
 * @text レベルアップSE設定
 * 
 * @param LevelUpSe
 * @text レベルアップ時のSE
 * @desc レベルアップ時のSEを指定します。
 * @type file
 * @dir audio/se
 * @parent SESetting
 * 
 * @param volume
 * @text SEの音量
 * @desc SEを音量を設定します。
 * @default 90
 * @parent SESetting
 * @min 0
 * 
 * @param pitch
 * @text SEのピッチ
 * @desc SEをピッチを設定します。
 * @default 100
 * @parent SESetting
 * 
 * @param pan
 * @text SEの位相
 * @desc SEを位相を設定します。
 * @default 0
 * @parent SESetting
 * 
 * @param BGMSetting
 * @text 戦闘勝利BGM設定
 * 
 * @param VictoryBGM
 * @text 戦闘勝利のBGM
 * @desc 戦闘勝利のBGMを指定します。
 * @type file
 * @dir audio/bgm
 * @parent BGMSetting
 * 
 * @param VictoryVolume
 * @text SEの音量
 * @desc SEを音量を設定します。
 * @default 90
 * @parent BGMSetting
 * @min 0
 * 
 * @param VictoryPitch
 * @text SEのピッチ
 * @desc SEをピッチを設定します。
 * @default 100
 * @parent BGMSetting
 * 
 * @param VictoryPan
 * @text SEの位相
 * @desc SEを位相を設定します。
 * @default 0
 * @parent BGMSetting
 * 
 * 
 * 
 * @command VictoryBGM
 * @desc 戦闘ME後のBGMの再生の許可を変更します。
 * @text 戦闘ME後のBGM再生許可
 * 
 * @arg VictoryBGMEnable
 * @type boolean
 * @default true
 * @desc 戦闘ME後のBGMの再生の許可します。
 * @text 戦闘ME後のBGMの再生の許可
 * 
 * 
 * @command VictoryBGMSelect
 * @desc 戦闘勝利後のBGMを設定します。
 * @text 戦闘勝利後BGM
 * 
 * @arg _BGM
 * @text 勝利ME後のBGM
 * @desc 勝利ME後のBGMを指定します。何も指定しないことでBGMが初期化されます。
 * @type file
 * @dir audio/bgm
 * 
 * @arg Volume
 * @text SEの音量
 * @desc SEを音量を設定します。
 * @default 90
 * 
 * @arg Pitch
 * @text SEのピッチ
 * @desc SEをピッチを設定します。
 * @default 100
 * 
 * @arg Pan
 * @text SEの位相
 * @desc SEを位相を設定します。
 * @default 0
 * 
 * 
 * @command LevelUpPage
 * @desc レベルアップ画面の表示を許可を変更します。
 * @text レベルアップ画面表示許可
 * 
 * @arg LevelUpPageEnable
 * @type boolean
 * @default true
 * @desc レベルアップ画面の表示を許可します。(このプラグインコマンドを実行後レベルアップ画面表示の設定が無効化されます）
 * @text レベルアップ画面表示許可
 * 
 */

var Imported = Imported || {};
Imported.NUUN_Result = true;

(() => {
const parameters = PluginManager.parameters('NUUN_Result');
const ActorShow = Number(parameters['ActorShow'] || 1);
const ResultWidth = Number(parameters['ResultWidth'] || 808);
const ResultHeight = Number(parameters['ResultHeight'] || 616);
const FaceWidth = Number(parameters['FaceWidth'] || 144);
const FaceHeight = Number(parameters['FaceHeight'] || 120);
const FaceScale = Number(parameters['FaceScale'] || 100);
const FaceScaleHeight = eval(parameters['FaceScaleHeight'] || "true");
const LavelUpWindowShow = eval(parameters['LavelUpWindowShow'] || "true");
const GaugeValueShow = Number(parameters['GaugeValueShow'] || 0);
const GaugeRefreshFrame = Number(parameters['GaugeRefreshFrame'] || 100);
const GaugeMaxValueFontSize = Number(parameters['GaugeMaxValueFontSize'] || -6);
const GaugeMaxValueY = Number(parameters['GaugeMaxValueY'] || 0);
const PartyBackGroundImg = String(parameters['PartyBackGroundImg'] || "");
const ActorBackGroundImg = String(parameters['ActorBackGroundImg'] || "");
const BackUiWidth = eval(parameters['BackUiWidth'] || "true");
const Decimal = Number(parameters['Decimal'] || 0);
const DecimalMode = eval(parameters['DecimalMode'] || "true");
const ResultName = String(parameters['ResultName'] || "");
const GetGoldName = String(parameters['GetGoldName'] || "");
const GetEXPName = String(parameters['GetEXPName'] || "経験値");
const GetItemName = String(parameters['GetItemName'] || "");
const LevelUpName = String(parameters['LevelUpName'] || "LEVEL UP");
const learnSkillName = String(parameters['learnSkillName'] || "");
const PartyOriginalParamName = String(parameters['PartyOriginalParamName'] || "");
const PartyOriginalParam = String(parameters['PartyOriginalParam'] || "");
const PartyOriginalParamName2 = String(parameters['PartyOriginalParamName2'] || "");
const PartyOriginalParam2 = String(parameters['PartyOriginalParam2'] || "");
const ActorOriginalParamName = String(parameters['ActorOriginalParamName'] || "");
const ActorOriginalParam = String(parameters['ActorOriginalParam'] || "");
const ActorOriginalParamName2 = String(parameters['ActorOriginalParamName2'] || "");
const ActorOriginalParam2 = String(parameters['ActorOriginalParam2'] || "");
const LevelUpSe = String(parameters['LevelUpSe'] || "");
const volume = Number(parameters['volume'] || 90);
const pitch = Number(parameters['pitch'] || 100);
const pan = Number(parameters['pan'] || 0);
const VictoryBGM = String(parameters['VictoryBGM'] || "");
const VictoryVolume = Number(parameters['VictoryVolume'] || 90);
const VictoryPitch = Number(parameters['VictoryPitch'] || 100);
const VictoryPan = Number(parameters['VictoryPan'] || 0);
let gaugeWidth = 300;

const pluginName = "NUUN_Result";

PluginManager.registerCommand(pluginName, 'VictoryBGM', args => {
  BattleManager.victoryBGMEnable(eval(args.VictoryBGMEnable))
});

PluginManager.registerCommand(pluginName, 'VictoryBGMSelect', args => {
  BattleManager.victoryBGMSelect(args)
});

PluginManager.registerCommand(pluginName, 'LevelUpPage', args => {
  BattleManager.levelUpPageEnable(eval(args.LevelUpPageEnable))
});


const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
  _Scene_Battle_createAllWindows.call(this);
  this.createResultBaseSprite();
  this.createResultBackGround();
  this.createResultHelpWindow();
  this.createResultWindow();
  this.createResultDropItemWindow();
  this.createResultButtons();
};

Scene_Battle.prototype.createResultBaseSprite = function() {
  this._resultBaseSprite = null;
  if (PartyBackGroundImg || ActorBackGroundImg) {
    const sprite = new Sprite();
    this._resultBaseSprite = sprite;
    this.addChild(sprite);
  }
};

Scene_Battle.prototype.createResultBackGround = function() {
  if (this._resultBaseSprite) {
    if (PartyBackGroundImg) {
      let sprite = new Sprite();
      this._resultBaseSprite.addChild(sprite);
      sprite.bitmap= ImageManager.loadPicture(PartyBackGroundImg);
      this._backGroundPartySprite = sprite;
      sprite.hide();
      if (sprite.bitmap && !sprite.bitmap.isReady()) {
        sprite.bitmap.addLoadListener(this.resultBackGround.bind(this, sprite));
      } else {
        this.resultBackGround(sprite);
      }
    }
    if (ActorBackGroundImg) {
      sprite = new Sprite();
      this._resultBaseSprite.addChild(sprite);
      sprite.bitmap = ImageManager.loadPicture(ActorBackGroundImg);
      this._backGroundActorSprite = sprite;
      sprite.hide();
      if (sprite.bitmap && !sprite.bitmap.isReady()) {
        sprite.bitmap.addLoadListener(this.resultBackGround.bind(this, sprite));
      } else {
        this.resultBackGround(sprite);
      }
    }
  }
};

Scene_Battle.prototype.resultBackGround = function(sprite) {
  if(BackUiWidth) {
    sprite.x = (Graphics.width - (Graphics.boxWidth + 8)) / 2 + (ResultWidth > 0 ? (Graphics.boxWidth - ResultWidth) / 2 : 0);
    sprite.y = (Graphics.height - (Graphics.boxHeight + 8)) / 2;
    const width = (ResultWidth > 0 ? ResultWidth : Graphics.boxWidth) + 8;
    const height = (ResultHeight > 0 ? ResultHeight : Graphics.boxHeight) + 8;
    sprite.scale.x = (width !== sprite.bitmap.width ? width / sprite.bitmap.width : 1);
    sprite.scale.y = (height !== sprite.bitmap.height ? height / sprite.bitmap.height : 1);
  } else {
    sprite.scale.x = (Graphics.width !== sprite.bitmap.width ? Graphics.width / sprite.bitmap.width : 1);
    sprite.scale.y = (Graphics.height !== sprite.bitmap.height ? Graphics.height / sprite.bitmap.height : 1);
  }
};

Scene_Battle.prototype.createResultHelpWindow = function() {
  const rect = this.resultHelpWindowRect();
  this._resultHelpWindow = new Window_ResultHelp(rect);
  this._resultHelpWindow.hide();
  if (this._resultBaseSprite) {
    this._resultBaseSprite.addChild(this._resultHelpWindow);
    this._resultHelpWindow.x += (Graphics.width - Graphics.boxWidth) / 2;
    this._resultHelpWindow.y += (Graphics.height - Graphics.boxHeight) / 2;
  } else {
    this.addWindow(this._resultHelpWindow);
  }
};

Scene_Battle.prototype.resultHelpWindowRect = function() {
  const wx = (ResultWidth > 0 ? (Graphics.boxWidth - ResultWidth) / 2 : 0);
  const wy = this.resultHelpAreaTop();
  const ww = ResultWidth > 0 ? ResultWidth : Graphics.boxWidth;
  const wh = this.resultHelpAreaHeight();
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.createResultWindow = function() {
  const rect = this.resultWindowRect();
  this._resultWindow = new Window_Result(rect);
  this._resultWindow.setHandler("ok", this.onResultOk.bind(this));
  this._resultWindow.setHandler("cancel", this.onResultOk.bind(this));
  this._resultWindow.hide();
  if (this._resultBaseSprite) {
    this._resultBaseSprite.addChild(this._resultWindow);
    this._resultWindow.x += (Graphics.width - Graphics.boxWidth) / 2;
    this._resultWindow.y += (Graphics.height - Graphics.boxHeight) / 2;
  } else {
    this.addWindow(this._resultWindow);
  }
};

Scene_Battle.prototype.resultWindowRect = function() {
  const wx = (ResultWidth > 0 ? (Graphics.boxWidth - ResultWidth) / 2 : 0);
  const wy = this.resultHelpAreaTop() + this.resultHelpAreaHeight();
  const ww = ResultWidth > 0 ? ResultWidth : Graphics.boxWidth;
  const wh = (ResultHeight > 0 ? ResultHeight : Graphics.boxHeight) - wy;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.createResultDropItemWindow = function() {
  const rect = this.resultDropItemWindowRect();
  this._resultDropItemWindow = new Window_ResultDropItem(rect);
  this._resultDropItemWindow.hide();
  if (PartyBackGroundImg) {
    this._resultBaseSprite.addChild(this._resultDropItemWindow);
  } else {
    this.addChild(this._resultDropItemWindow);
  }
  this._resultDropItemWindow.setWindowResult(this._resultWindow);
};

Scene_Battle.prototype.resultDropItemWindowRect = function() {
  const wx = (Graphics.width - Graphics.boxWidth) / 2 + (ResultWidth > 0 ? (Graphics.boxWidth - ResultWidth) / 2 : 0);
  const wy = (Graphics.height - Graphics.boxHeight) / 2 + this.resultHelpAreaTop() + this.resultHelpAreaHeight();
  const ww = this._resultWindow.width;
  const wh = this._resultWindow.height;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.createResultButtons = function() {
  if (ConfigManager.touchUI) {
      this.createResultButton();
  }
};

Scene_Battle.prototype.createResultButton = function() {
  this._okResultButton = new Sprite_Button("ok");(ResultWidth > 0 ? (Graphics.boxWidth - ResultWidth) / 2 : 0)
  this._okResultButton.x = (ResultWidth > 0 ? (Graphics.boxWidth - ResultWidth) / 2 + ResultWidth: Graphics.boxWidth) - this._okResultButton.width - 4;
  this._okResultButton.y = this.resultbuttonY();
  this._downResultButton = new Sprite_Button("pagedown");
  this._downResultButton.x = this._okResultButton.x - (24 + this._downResultButton.width);
  this._downResultButton.y = this.resultbuttonY();
  this._upResultButton = new Sprite_Button("pageup");
  this._upResultButton.x = this._downResultButton.x - this._downResultButton.width - 4;
  this._upResultButton.y = this.resultbuttonY();
  if (PartyBackGroundImg) {
    this._resultBaseSprite.addChild(this._okResultButton);
    this._resultBaseSprite.addChild(this._upResultButton);
    this._resultBaseSprite.addChild(this._downResultButton);
    this._okResultButton.x += (Graphics.width - Graphics.boxWidth) / 2;
    this._okResultButton.y += (Graphics.height - Graphics.boxHeight) / 2;
    this._downResultButton.x += (Graphics.width - Graphics.boxWidth) / 2;
    this._downResultButton.y += (Graphics.height - Graphics.boxHeight) / 2;
    this._upResultButton.x += (Graphics.width - Graphics.boxWidth) / 2;
    this._upResultButton.y += (Graphics.height - Graphics.boxHeight) / 2;
  } else {
    this.addWindow(this._okResultButton);
    this.addWindow(this._upResultButton);
    this.addWindow(this._downResultButton);
  }
  this._upResultButton.setClickHandler(this.updateDorpItemPageup.bind(this));
  this._downResultButton.setClickHandler(this.updateDorpItemPagedown.bind(this));
};

Scene_Battle.prototype.resultHelpAreaHeight = function() {
  return this.calcWindowHeight(1, false);
};

Scene_Battle.prototype.resultHelpAreaTop = function() {
  return this.buttonAreaHeight();
};

Scene_Battle.prototype.onResultOk = function() {
  if (this._resultWindow.actorLevelUp.length > 0 && this._resultWindow.page < this._resultWindow.actorLevelUp.length) {
    this.backGroundPartyHide();
    this.backGroundActorShow();
    this._resultWindow.page++;
    this._resultDropItemWindow.page = 0;
    this._resultWindow.refresh();
    this._resultDropItemWindow.refresh();
    this._resultWindow.activate();
  } else {
    this._resultHelpWindow.close();
    this._resultWindow.close();
    this._resultDropItemWindow.close();
    this.backGroundPartyHide();
    this.backGroundActorHide();
    BattleManager.playMapBgm();
  }
};

Scene_Battle.prototype.resultOpen = function() {
  this.backGroundPartyShow();
  this._resultWindow.activate();
  this._resultHelpWindow.show();
  this._resultWindow.show();
  this._resultDropItemWindow.show();
  this._resultHelpWindow.open();
  this._resultWindow.open();
  this._resultDropItemWindow.open();
  this._resultWindow.refresh();
  this._resultDropItemWindow.refresh();
};

Scene_Battle.prototype.backGroundPartyShow = function() {
  if (this._backGroundPartySprite) {
    this._resultHelpWindow.opacity = 0;
    this._resultHelpWindow.frameVisible = false;
    this._resultWindow.opacity = 0;
    this._resultWindow.frameVisible = false;
    this._backGroundPartySprite.show();
  } else {
    this._resultHelpWindow.opacity = 255;
    this._resultHelpWindow.frameVisible = true;
    this._resultWindow.opacity = 255;
    this._resultWindow.frameVisible = true;
  }
};

Scene_Battle.prototype.backGroundActorShow = function() {
  if (this._backGroundActorSprite) {
    this._resultHelpWindow.opacity = 0;
    this._resultHelpWindow.frameVisible = false;
    this._resultWindow.opacity = 0;
    this._resultWindow.frameVisible = false;
    this._backGroundActorSprite.show();
  } else {
    this._resultHelpWindow.opacity = 255;
    this._resultHelpWindow.frameVisible = true;
    this._resultWindow.opacity = 255;
    this._resultWindow.frameVisible = true;
  }
};

Scene_Battle.prototype.backGroundPartyHide = function() {
  if (this._backGroundPartySprite) {
    this._backGroundPartySprite.hide();
  }
};

Scene_Battle.prototype.backGroundActorHide = function() {
  if (this._backGroundActorSprite) {
    this._backGroundActorSprite.hide();
  }
};

const _Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
  _Scene_Battle_update.call(this);
  if (this._resultWindow.active) {
    if (Input.isRepeated('left')) {
      this.updateDorpItemPageup();
    } else if (Input.isRepeated('right')){
      this.updateDorpItemPagedown();
    }
  }
};

Scene_Battle.prototype.updateDorpItemPagedown = function() {
  const maxPage = this._resultDropItemWindow.maxPages();
  if (maxPage > 1) {
    SoundManager.playCursor();
    this._resultDropItemWindow.page = (this._resultDropItemWindow.page + 1) % maxPage;
    this._resultDropItemWindow.refresh();
    this._resultWindow.activate();
  }
};

Scene_Battle.prototype.updateDorpItemPageup = function() {
  const maxPage = this._resultDropItemWindow.maxPages();
  if (maxPage > 1) {
    SoundManager.playCursor();
    this._resultDropItemWindow.page = (this._resultDropItemWindow.page + (maxPage - 1)) % maxPage;
    this._resultDropItemWindow.refresh();
    this._resultWindow.activate();
  }
};

const _Scene_Battle_updateVisibility = Scene_Battle.prototype.updateVisibility;
Scene_Battle.prototype.updateVisibility = function() {
  _Scene_Battle_updateVisibility.call(this);
  this.updateResultButton();
};

Scene_Battle.prototype.updateResultButton = function() {
  if (this._okResultButton) {
      this._okResultButton.visible = this._resultWindow.active;
  }
  if (this._upResultButton && this._downResultButton) {
    this._upResultButton.visible = this._resultWindow.active && this._resultDropItemWindow.maxPages() > 1;
    this._downResultButton.visible = this._resultWindow.active && this._resultDropItemWindow.maxPages() > 1;
  }
};

Scene_Battle.prototype.resultbuttonY = function() {
  const y = Scene_Battle.prototype.buttonY.call(this);
  return y - this._helpWindow.height;
};

function Window_ResultHelp() {
  this.initialize(...arguments);
}

Window_ResultHelp.prototype = Object.create(Window_Help.prototype);
Window_ResultHelp.prototype.constructor = Window_ResultHelp;

Window_ResultHelp.prototype.initialize = function(rect) {
  Window_Help.prototype.initialize.call(this, rect);
  this.openness = 0;
  this.refresh();
};

Window_ResultHelp.prototype.refresh = function() {
  const rect = this.baseTextRect();
  this.contents.clear();
  this.drawText(ResultName, rect.x, rect.y, rect.width,"center");
};

function Window_Result() {
  this.initialize(...arguments);
}

Window_Result.prototype = Object.create(Window_StatusBase.prototype);
Window_Result.prototype.constructor = Window_Result;

Window_Result.prototype.initialize = function(rect) {
  Window_StatusBase.prototype.initialize.call(this, rect);
  this._levelUp = false;
  this.openness = 0;
  this.actorLevelUp = [];
  this.actorOldStatus = [];
  this.page = 0;
  this._actor = null;
  this._canRepeat = false;
  this.refresh();
};

Window_Result.prototype.itemHeight = function() {
  return ImageManager.faceHeight;
};

Window_Result.prototype.actor = function(index) {
  return $gameParty.battleMembers()[index];
};

Window_Result.prototype.actorMembers = function() {
  return $gameParty.battleMembers().length;
};

Window_Result.prototype.refresh = function() {
  this.contents.clear();
  const scale = FaceScale / 100;
  const rect = this.itemRect(0);
  const lineHeight = this.lineHeight();
  const itemPadding = this.itemPadding();
  if (this.page === 0) {
    const height = FaceScaleHeight ? Math.floor(FaceHeight * scale) : FaceHeight;
    const faceArea = rect.x + Math.floor(FaceWidth * scale) + itemPadding;
    const x2 = rect.x + (rect.width - Math.floor(rect.width / 2.6));
    gaugeWidth = rect.width - Math.floor(rect.width / 2.6) - faceArea - 40;
    for (let i = 0; this.actorMembers() > i; i++) {
      this._actor = this.actor(i);
      this._actor._learnSkill = [];
      this._actor._oldStatus = [];
      let y = i * height + rect.y;
      if (ActorShow === 2) {
        this.drawActorCharacter(rect.x + FaceWidth / 2, y + 60);
      } else if (ActorShow === 1) {
        this.drawActorFace(rect.x, y, FaceWidth, FaceHeight);
      }
      this.drawActorName(rect.x + faceArea, y, rect.width - (rect.width - x2) - faceArea - 112);
      this.drawActorLevel(rect.x + x2 - 100, y);
      this.drawLevelUp(rect.x, y, Math.floor(FaceWidth * scale));
      this.drawExpGauge(rect.x + x2 - (gaugeWidth + 30), y + lineHeight * 1.3);
      this.drawGetEXP(rect.x + faceArea, y + lineHeight * 0.8);
    }
    y = rect.y;
    this.drawGetGold(x2, y, rect.width - x2);
    y += lineHeight;
    this.drawPartyOriginalParam(x2, y, rect.width - x2);
    y += (PartyOriginalParam ? lineHeight : 0) + (PartyOriginalParam2 ? lineHeight : 0);
    this.drawHorzLine(x2, y, rect.width - x2);
  } else {
    for (let i = 0; this.actorMembers() > i; i++) {
      this.removeExpGauge(this.actor(i));
    }
    this._actor = this.actorLevelUp[this.page - 1];
    const x = rect.x + rect.width / 2 + itemPadding;
    this.drawActorFace(rect.x, rect.y, ImageManager.faceWidth, ImageManager.faceHeight);
    this.drawActorStatusName(rect.x + 152, rect.y, rect.width - x - 152);
    this.drawActorStatusLevel(x, rect.y);
    this.drawActorOriginalParam(rect.x + 152, rect.y + lineHeight, rect.width - x - 152);
    //this.drawHorzLine(rect.x + 152, rect.y + lineHeight * 3.5, rect.width - 152);
    this.drawActorStatus(rect.x, rect.y + lineHeight * 3.5, rect.width / 2 - itemPadding);
  }
};

Window_Result.prototype.drawActorFace = function(x, y, width, height) {
  this.drawFace(this._actor.faceName(), this._actor.faceIndex(), x, y, width, height);
};

Window_Result.prototype.drawExpGauge = function(x, y) {
  this.placeExpGauge(this._actor, x, y);
};

Window_Result.prototype.drawActorName = function(x, y, width) {
  this.contents.fontSize = Math.min($gameSystem.mainFontSize(), 22);
  this.drawText(this._actor.name(), x, y, width);
  this.contents.fontSize = $gameSystem.mainFontSize();
};

Window_Result.prototype.drawActorStatusName = function(x, y, width) {
  this.drawText(this._actor.name(), x, y, width);
};

Window_Result.prototype.drawActorLevel = function(x, y) {
  const exp = BattleManager._rewards.exp;
  const actor = this._actor;
  if (exp) {
    const level = actor.resultGainExp(exp);
    const oldStatus = [];
    this.contents.fontSize = Math.min($gameSystem.mainFontSize(), 22);
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(TextManager.levelA, x, y, 48);
    if (level > actor._level) {
      this._levelUp = true;
      BattleManager._levelUpPageEnable = BattleManager._levelUpPageEnable === undefined || BattleManager._levelUpPageEnable === null ? LavelUpWindowShow : BattleManager._levelUpPageEnable;
      for (let i = 0; i < 8; i++) {
        oldStatus[i] = actor.param(i);
      }
      oldStatus.push(actor._level);
      this.actorOldStatus.push(oldStatus);
      this.changeTextColor(ColorManager.textColor(17));
      if (BattleManager._levelUpPageEnable) {
        this.actorLevelUp.push(actor);
      }
    } else {
      this.resetTextColor();
    }
    this.drawText(level, x + 30, y, 70 - 30, "right");
    this.contents.fontSize = $gameSystem.mainFontSize();
    this.resetTextColor();
  }
};

Window_Result.prototype.drawLevelUp = function(x, y, width) {
  if (this._levelUp) {
    this.changeTextColor(ColorManager.textColor(17));
    this.drawText(LevelUpName, x, y, width, "center");
    this.resetTextColor();
    this._levelUp = false;
  }
};

Window_Result.prototype.drawGetItems = function(x, y, width) {
  const items = BattleManager._rewards.items;
  const lineHeight = this.lineHeight();
  this.drawText(GetItemName, x, y, width, "left");
  if (items) {
    for (let i = 0; items.length > i; i++) {
      let y2 = y + lineHeight * (i + 1);
      this.drawItemName(items[i], x, y2, width);
    }
  }
};

Window_Result.prototype.drawGetGold = function(x, y, width) {
  const gold = BattleManager._rewards.gold;
  if (gold) {
    this.changeTextColor(ColorManager.systemColor());
    if (GetGoldName) {
      this.drawText(GetGoldName, x, y, 120, "left");
    }
    this.resetTextColor();
    this.drawCurrencyValue(gold, this.currencyUnit(), x + 120, y, width - 120);
    this.resetTextColor();
  }
};

Window_Result.prototype.drawPartyOriginalParam = function(x, y, width) {
  if (PartyOriginalParam) {
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(PartyOriginalParamName, x, y, 120, "left");
    this.resetTextColor();
    this.drawText(eval(PartyOriginalParam), x + 120, y, width - 120, "right");
  }
  if (PartyOriginalParam2) {
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(PartyOriginalParamName2, x, y + this.lineHeight(), 120, "left");
    this.resetTextColor();
    this.drawText(eval(PartyOriginalParam2), x + 120, y + this.lineHeight(), width - 120, "right");
  }
};

Window_Result.prototype.drawActorOriginalParam = function(x, y, width) {
  const actor = this._actor.actor();
  const lineHeight = this.lineHeight();
  if (ActorOriginalParam) {
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(ActorOriginalParamName, x, y, 120, "left");
    this.resetTextColor();
    this.drawText(eval(ActorOriginalParam), x + 120, y, width - 120, "right");
  }
  if (ActorOriginalParam2) {
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(ActorOriginalParamName2, x, y + lineHeight, 120, "left");
    this.resetTextColor();
    this.drawText(eval(ActorOriginalParam2), x + 120, y + lineHeight, width - 120, "right");
  }
};

Window_Result.prototype.drawGetEXP = function(x, y, width) {
  const exp = Math.round(BattleManager._rewards.exp * this._actor.finalExpRate());
  if (!isNaN(exp)) {
    this.contents.fontSize = Math.min($gameSystem.mainFontSize(), 22);
    const textWidth = this.textWidth(GetEXPName);
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(GetEXPName, x, y, width, "left");
    this.resetTextColor();
    this.drawText("+"+ exp, x + textWidth + this.itemPadding(), y, width - x - 190, "left");
    this.contents.fontSize = $gameSystem.mainFontSize();
  }
};

Window_Result.prototype.drawActorStatusLevel = function(x, y) {
  const oldStatus = this.actorOldStatus[this.page - 1];
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(TextManager.levelA, x, y, 48);
  this.resetTextColor();
  this.drawText(oldStatus[oldStatus.length - 1], x + 48, y, 100, "left");
  this.changeTextColor(ColorManager.systemColor());
  this.drawText("→", x + 48, y, 100, "center");
  this.changeTextColor(ColorManager.textColor(24));
  this.drawText(this._actor._level, x + 48, y, 100, "right");
  this.resetTextColor();
};

Window_Result.prototype.drawActorStatus = function(x, y, width) {
  const lineHeight = this.lineHeight();
  const oldStatus = this.actorOldStatus[this.page - 1];
  for (let i = 0; i < oldStatus.length - 1; i++) {
    y += lineHeight;
    const name = TextManager.param(i);
    const oldValue = oldStatus[i];
    const value = this._actor.param(i);
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(name, x, y, width - 200);
    this.resetTextColor();
    this.drawText(oldValue, x + (width - 200), y, 60, "left");
    this.changeTextColor(ColorManager.systemColor());
    this.drawText("→", x + (width - 110), y, width - 160, "left");
    if (oldValue < value) {
      this.changeTextColor(ColorManager.textColor(24));
    }
    this.drawText(value, x + width - 60, y, 60, "right");
    this.resetTextColor();
  }
};

Window_Result.prototype.currencyUnit = function() {
  return TextManager.currencyUnit;
};

Window_Result.prototype.drawFace = function(faceName, faceIndex, x, y, width, height) {
  width = width || ImageManager.faceWidth;
  height = height || ImageManager.faceHeight;
  const scale = this.page === 0 ? FaceScale / 100 : 1;
  const bitmap = ImageManager.loadFace(faceName);
  const pw = ImageManager.faceWidth;
  const ph = ImageManager.faceHeight;
  const sw = Math.min(width, pw);
  const sh = Math.min(height, ph);
  const dy = Math.floor(y + Math.max(height - ph, 0) / 2);
  const sx = Math.floor((faceIndex % 4) * pw + (pw - sw) / 2);
  const sy = Math.floor(Math.floor(faceIndex / 4) * ph + (ph - sh) / 2);
  const dw = Math.floor(sw * scale);
  const dh = Math.floor(sh * scale);
  this.contents.blt(bitmap, sx, sy, sw, sh, x, dy, dw, dh);
};

Window_Result.prototype.drawActorCharacter = function(x, y) {
  this.drawCharacter(this._actor.characterName(), this._actor.characterIndex(), x, y);
};

Window_Result.prototype.placeExpGauge = function(actor, x, y) {
  const type = 'result_exp'
  const key = "resultActor%1-gauge-%2".format(actor.actorId(), type);
  const sprite = this.createInnerSprite(key, Sprite_ResultExpGauge);
  sprite.setup(actor, type);
  sprite.move(x, y);
  sprite.show();
};

Window_Result.prototype.removeExpGauge = function(actor) {
  const type = 'result_exp'
  const key = "resultActor%1-gauge-%2".format(actor.actorId(), type);
  const dict = this._additionalSprites;
  if (dict[key]) {
    this._clientArea.removeChild(dict[key]);
    dict[key] = null;
  }
};

Window_Result.prototype.drawHorzLine = function(x, y, width) {
  const lineY = y + this.lineHeight() / 2 - 1;
  this.contents.paintOpacity = 48;
  this.contents.fillRect(x, lineY, width, 2, ColorManager.normalColor());
  this.contents.paintOpacity = 255;
};

Window_Result.prototype.onTouchCancel = function() {
  if (this.isCancelEnabled()) {
      this.processOk();
  }
};

function Window_ResultDropItem() {
  this.initialize(...arguments);
}

Window_ResultDropItem.prototype = Object.create(Window_StatusBase.prototype);
Window_ResultDropItem.prototype.constructor = Window_ResultDropItem;

Window_ResultDropItem.prototype.initialize = function(rect) {
  Window_StatusBase.prototype.initialize.call(this, rect);
  this.openness = 0;
  this.page = 0;
  this.maxPage = 0;
  this.dropItemRows = Math.floor((this.innerHeight - this.lineHeight() * this.partyOriginalParams()) / this.lineHeight());
  this.skillRows = Math.floor((this.innerHeight - this.lineHeight() * 5.5) / this.lineHeight());
  this.opacity = 0;
  this.frameVisible = false;
};

Window_ResultDropItem.prototype.partyOriginalParams = function() {
  return 3 + (PartyOriginalParam ? 1 : 0) + (PartyOriginalParam2 ? 1 : 0);
};

Window_ResultDropItem.prototype.setWindowResult = function(windowResult) {
  this._windowResult = windowResult;
};

Window_ResultDropItem.prototype.maxPages = function() {
  if (this._windowResult.page > 0) {
    return Math.ceil(this._windowResult._actor._learnSkill.length / this.skillRows)
  } else {
    return Math.ceil(BattleManager._rewards.items.length / this.dropItemRows);
  }
};

Window_ResultDropItem.prototype.refresh = function() {
  this.contents.clear();
  const rect = this.itemRect(0);
  const lineHeight = this.lineHeight();
  const itemPadding = this.itemPadding();
  const x = rect.x + (rect.width - Math.floor(rect.width / 2.6));
  if (this._windowResult.page > 0) {
    const actor = this._windowResult._actor;
    this.drawLearnSkill(actor, rect.x + rect.width / 2 + itemPadding, rect.y + lineHeight * 4.5, rect.width / 2 - itemPadding);
  } else {
    this.drawGetItems(x, rect.y + lineHeight * 2, rect.width - x);
  }
};

Window_ResultDropItem.prototype.drawGetItems = function(x, y, width) {
  const items = BattleManager._rewards.items;
  const lineHeight = this.lineHeight();
  const maxPage = this.maxPages();
  y += (PartyOriginalParam ? lineHeight : 0) + (PartyOriginalParam2 ? lineHeight : 0);
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(GetItemName, x, y, width - 48, "left");
  this.resetTextColor();
  if (items) {
    const index = this.dropItemRows * this.page;
    const maxItems = Math.min(this.dropItemRows, items.length - index);
    if (maxPage > 1) {
      this.drawText(this.page + 1 +"/"+maxPage, x, y, width, "right");
    }
    for (let i = 0; maxItems > i; i++) {
      let y2 = y + lineHeight * (i + 1);
      this.drawItemName(items[i + index], x, y2, width);
    }
  }
};

Window_ResultDropItem.prototype.drawLearnSkill = function(actor, x, y, width) {
  const lineHeight = this.lineHeight();
  const learnSkill = actor._learnSkill;
  const maxPage = this.maxPages();
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(learnSkillName, x, y, width - 48, "left");
  this.resetTextColor();
  if (learnSkill) {
    const index = this.skillRows * this.page;
    const maxItems = Math.min(this.skillRows, learnSkill.length - index);
    if (maxPage > 1) {
      this.drawText(this.page + 1 +"/"+maxPage, x, y, width, "right");
    }
    for (let i = 0; i < maxItems; i++) {
      let y2 = y + lineHeight * (i + 1);
      const skill =  $dataSkills[learnSkill[i + index]];
      this.drawItemName(skill, x, y2, width);
    }
  }
};

function Sprite_ResultExpGauge() {
  this.initialize(...arguments);
}

Sprite_ResultExpGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_ResultExpGauge.prototype.constructor = Sprite_ResultExpGauge;

Sprite_ResultExpGauge.prototype.initialize = function() {
  Sprite_Gauge.prototype.initialize.call(this);
  this._currentExp = 0;
  this._startCurrentExp = 0;
  this._resultExpMoveMode = false;
  this._resultExpMoveDelay = 0;
  this._resultExpMoveValue = NaN;
  this._maxValueY = GaugeMaxValueY;
};

Sprite_ResultExpGauge.prototype.bitmapWidth = function() {
  return gaugeWidth;
};

Sprite_ResultExpGauge.prototype.setup = function(battler, statusType) {
  this._nowLevel = battler._level;
  Sprite_Gauge.prototype.setup.call(this, battler, statusType);
  this._instant = false;
  this._startCurrentExp = battler.currentExp() - battler.currentLevelExp();
  this._resultExpMoveMode = false;
  this._resultExpMoveDelay = 0;
  this._resultExpMoveValue = isNaN(this._resultExpMoveValue) ? this.currentValue() : this._resultExpMoveValue;
};

Sprite_ResultExpGauge.prototype.updateBitmap = function() {
  Sprite_Gauge.prototype.updateBitmap.call(this);
  const value = this.currentValue();
  if (this._resultExpMoveValue !== value) {
    if (isNaN(this._resultExpMoveValue)) {
      this._resultExpMoveValue = this.currentValue();
    }
    this.valueRedraw();
  }
};

Sprite_ResultExpGauge.prototype.valueRedraw = function() {
  this.currentResultValueMove(this.currentValue());
  Sprite_Gauge.prototype.redraw.call(this);
};

const _Sprite_Gauge_drawValue = Sprite_Gauge.prototype.drawValue;
Sprite_Gauge.prototype.drawValue = function() {
  if (this._statusType === "result_exp") {
    const width = this.bitmapWidth();
    const height = this.bitmapHeight();
    this._resultExpMoveMode = GaugeRefreshFrame > 0 && GaugeValueShow ? true : false;
    let expValue = this.currentValue();
    if (GaugeValueShow > 0) {
      this.setupValueFont();
      if (GaugeValueShow === 1) {
        expValue = this.maxLavel() ? "----------" : expValue;
        this.bitmap.drawText(expValue, width - 100, 0, 100, height, "right");
      } else if (GaugeValueShow === 2) {
        expValue = this.maxLavel() ? "----------" : expValue;
        if (!this.maxLavel()) {
          this.bitmap.fontSize = $gameSystem.mainFontSize() + GaugeMaxValueFontSize;
          const textWidth = Math.min(this.bitmap.measureTextWidth(this.currentMaxValue()), 70);
          this.bitmap.drawText(this.currentMaxValue(), width - textWidth, this._maxValueY, textWidth, height, "right");
          this.bitmap.fontSize = this.valueFontSize();
          this.bitmap.drawText("/", width - (textWidth + 40), 0, 36, height, "right");
          this.bitmap.drawText(expValue, width - (textWidth + 90), 0, 70, height, "right");
        } else {
          this.bitmap.drawText(expValue, width - 100, 0, 100, height, "right");
        }
      } else {
        expValue = this.maxLavel() ? this.currentMaxValue() : expValue;
        const rate = this.currentDecimal(expValue / this.currentMaxValue() * 100);
        this.bitmap.drawText(rate +"%", width - 100, 0, 100, height, "right");
      }
    }
  } else {
    _Sprite_Gauge_drawValue.call(this);
  }
};

Sprite_ResultExpGauge.prototype.currentValue = function() {
  if (this._battler && this._resultExpMoveMode) {
    this._resultExpMoveMode = false;
    return Math.round(this._resultExpMoveValue);
  }
  return Sprite_Gauge.prototype.currentValue.call(this);
};

Sprite_ResultExpGauge.prototype.maxLavel = function() {
  return this._nowLevel >= this._battler.maxLevel();
};

const _Sprite_Gauge_currentValue = Sprite_Gauge.prototype.currentValue;
Sprite_Gauge.prototype.currentValue = function() {
  return this._battler && this._statusType === "result_exp" ? 
  this.maxLavel() ? this.currentMaxValue() : Math.min(this._battler.currentExp() - this._battler.expForLevel(this._nowLevel), this.currentMaxValue()) : _Sprite_Gauge_currentValue.call(this);
};

const _Sprite_Gauge_currentMaxValue = Sprite_Gauge.prototype.currentMaxValue;
Sprite_Gauge.prototype.currentMaxValue = function() {
  return this._battler && this._statusType === "result_exp" ? this._battler.expForLevel(this._nowLevel + 1) - this._battler.expForLevel(this._nowLevel) :
    _Sprite_Gauge_currentMaxValue.call(this);
};

Sprite_ResultExpGauge.prototype.currentResultValueMove = function(currentValue) {
  if (this._resultExpMoveDelay === 0) {
    this._resultExpMoveDelay = (currentValue - this._resultExpMoveValue) / (GaugeRefreshFrame > 0 ? this.smoothness() : 1);
  }
  if (this._resultExpMoveValue > currentValue) {
    if (this._resultExpMoveValue <= currentValue) {
      this._resultExpMoveValue = currentValue;
      this._resultExpMoveDelay = 0;
    }
  } else if (this._resultExpMoveValue < currentValue) {
      this._resultExpMoveValue += this._resultExpMoveDelay;
    if (this._resultExpMoveValue >= currentValue) {
      this._resultExpMoveValue = currentValue;
      this._resultExpMoveDelay = 0;
    }
  }
};

Sprite_ResultExpGauge.prototype.updateTargetValue = function(value, maxValue) {
  if (this._instant) {
    this._startCurrentExp = 0;
  }
  Sprite_Gauge.prototype.updateTargetValue.call(this, value, maxValue);
};

Sprite_ResultExpGauge.prototype.updateGaugeAnimation = function() {
  if (this._instant) {
    this._value = this.maxLavel() ? this._targetMaxValue : 0;
    this._maxValue = this._targetMaxValue;
    this.redraw();
    this._instant = false;
  } else {
    Sprite_Gauge.prototype.updateGaugeAnimation.call(this);
  }
  if (this._nowLevel < this._battler._level && this._duration === 0) {
    this._nowLevel++;
    this._instant = true;
    this._resultExpMoveValue = 0;
    AudioManager.playSe({"name":LevelUpSe,"volume":volume,"pitch":pitch,"pan":pan});
  }
};

Sprite_ResultExpGauge.prototype.smoothSpeed = function() {
  return (this.currentValue() - this._startCurrentExp) / BattleManager._rewards.exp;
};

Sprite_ResultExpGauge.prototype.smoothness = function() {
  return Math.max(Math.floor(Sprite_Gauge.prototype.smoothness.call(this) * this.smoothSpeed()), 1);
};

const _Sprite_Gauge_smoothness = Sprite_Gauge.prototype.smoothness;
Sprite_Gauge.prototype.smoothness = function() {
  return this._statusType === "result_exp" ? GaugeRefreshFrame : _Sprite_Gauge_smoothness.call(this);
};

Sprite_ResultExpGauge.prototype.currentDecimal = function(val) {
  if (DecimalMode) {
    return Math.round(val * (Decimal > 0 ? Math.pow(10, Decimal) : 1)) / (Decimal > 0 ? Math.pow(10, Decimal) : 1);
  } else {
    return Math.floor(val * (Decimal > 0 ? Math.pow(10, Decimal) : 1)) / (Decimal > 0 ? Math.pow(10, Decimal) : 1);
  }
};

const _Sprite_Gauge_gaugeColor1 = Sprite_Gauge.prototype.gaugeColor1;
Sprite_Gauge.prototype.gaugeColor1 = function() {
  return this._statusType === "result_exp" ? ColorManager.expGaugeColor1() : _Sprite_Gauge_gaugeColor1.call(this);
};

const _Sprite_Gauge_gaugeColor2 = Sprite_Gauge.prototype.gaugeColor2;
Sprite_Gauge.prototype.gaugeColor2 = function() {
  return this._statusType === "result_exp" ? ColorManager.expGaugeColor2() : _Sprite_Gauge_gaugeColor2.call(this);
};

Sprite_ResultExpGauge.prototype.gaugeColor1 = function() {
  return ColorManager.expGaugeColor1();
};

Sprite_ResultExpGauge.prototype.gaugeColor2 = function() {
  return ColorManager.expGaugeColor2();
};

ColorManager.expGaugeColor1 = function() {
  return this.textColor(17);
};

ColorManager.expGaugeColor2 = function() {
  return this.textColor(6);
};

Game_Actor.prototype.resultGainExp = function(exp) {
  const newExp = Math.max(this.currentExp() + Math.round(exp * this.finalExpRate()), 0);
  let level = this._level;
  while (!this.resultIsMaxLevel(level) && newExp >= this.resultNextLevelExp(level)) {
    level++;
  }
  return level;
};

Game_Actor.prototype.resultIsMaxLevel = function(level) {
  return level >= this.maxLevel();
};

Game_Actor.prototype.resultNextLevelExp = function(level) {
  return this.expForLevel(level + 1);
};

const _Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
Game_Actor.prototype.learnSkill = function(skillId) {
  if (!this.isLearnedSkill(skillId) && this._learnSkill && BattleManager.onResult) {
    this._learnSkill.push(skillId);
  }
  _Game_Actor_learnSkill.call(this, skillId);
};

const _Game_Actor_shouldDisplayLevelUp = Game_Actor.prototype.shouldDisplayLevelUp;
Game_Actor.prototype.shouldDisplayLevelUp = function() {
  return BattleManager.onResult ? false : _Game_Actor_shouldDisplayLevelUp.call(this);
};

const _BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
  _BattleManager_initMembers.call(this);
  this.onResult = false;
  this._victoryOn = false;
  this._victoryBGMOn = false;
};

const _BattleManager_processVictory = BattleManager.processVictory;
BattleManager.processVictory = function() {
  this._victoryOn = true;
  _BattleManager_processVictory.call(this);
};

BattleManager.displayVictoryMessage = function() {
};

BattleManager.displayRewards = function() {
  SceneManager._scene.resultOpen();
  this.onResult = true;
};

const _BattleManager_gainRewards = BattleManager.gainRewards;
BattleManager.gainRewards = function() {
  _BattleManager_gainRewards.call(this);
  this.onResult = false;
};

const _BattleManager_isBusy = BattleManager.isBusy;
BattleManager.isBusy = function() {
  return SceneManager._scene._resultWindow.active || _BattleManager_isBusy.call(this);
};

const _BattleManager_replayBgmAndBgs = BattleManager.replayBgmAndBgs;
BattleManager.replayBgmAndBgs = function() {
  this._victoryBGMEnable = (this._victoryBGMEnable === undefined || this._victoryBGMEnable === null) ? true : this._victoryBGMEnable;
  if (this._victoryBGMEnable && this._victoryOn) {
    if (this._victoryBgmDate && this._victoryBgmDate.name) {
      AudioManager.playBgm(this._victoryBgmDate);
      this._victoryBGMOn = true;
      return;
    } else if (VictoryBGM) {
      AudioManager.playBgm(this.playVictoryBgm());
      this._victoryBGMOn = true;
      return;
    }
  }
  _BattleManager_replayBgmAndBgs.call(this);
};

BattleManager.playVictoryBgm = function() {
  const _victoryBgm = {};
  _victoryBgm.name = VictoryBGM;
  _victoryBgm.volume = VictoryVolume;
  _victoryBgm.pitch = VictoryPitch;
  _victoryBgm.pan = VictoryPan;
  return _victoryBgm;
};

BattleManager.victoryBGMSelect = function(bgmDate) {
  if (!bgmDate._BGM) {
    this._victoryBgmDate = {};
    return;
  }
  this._victoryBgmDate = {};
  this._victoryBgmDate.name = String(bgmDate._BGM);
  this._victoryBgmDate.volume = Number(bgmDate.Volume);
  this._victoryBgmDate.pitch = Number(bgmDate.Pitch);
  this._victoryBgmDate.pan = Number(bgmDate.Pan);
};

BattleManager.playMapBgm = function() {
  if (!this._victoryBGMOn) {
    return;
  }
  if (this._mapBgm) {
    AudioManager.replayBgm(this._mapBgm);
  } else {
    AudioManager.stopBgm();
  }
  if (this._mapBgs) {
    AudioManager.replayBgs(this._mapBgs);
  }
};

BattleManager.victoryBGMEnable = function(enable) {
  this._victoryBGMEnable = enable;
};

BattleManager.levelUpPageEnable = function(enable) {
  this._levelUpPageEnable = enable;
};

})();