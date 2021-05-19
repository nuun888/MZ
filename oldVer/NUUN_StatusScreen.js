/*:-----------------------------------------------------------------------------------
 * NUUN_StatusScreen.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc ステータス画面表示拡張
 * @author NUUN
 * @version 1.3.6
 * 
 * @help
 * ステータス画面に追加能力値、特殊能力値、属性有効度、ステート有効度、独自のパラメータを表示させます。
 * 
 * デフォルト設定では１ページ目に基本能力値、装備
 * ２ページ目に追加能力値、特殊能力値
 * ３ページ目に属性有効度、ステート有効度となっています。
 * 
 * 追加パラメータ
 * 0:命中 1:回避 2:会心 3:会心回避 4:魔法回避 5:魔法反射 6:反撃 7:HP再生 8:MP再生 9:TP再生
 * 上記の数値以外を記入することで独自のパラメータを表示できます。なお「XparamEval」に記入している場合は評価式が優先されます。
 * 
 * 特殊パラメータ
 * 0:狙われ率 1:防御効果率 2:回復効果率 3:薬の知識 4:MP消費率 5:TPチャージ率 6:物理ダメージ率 7:魔法ダメージ率 8:床ダメージ率 9:経験獲得値率
 * 上記の数値以外を記入することで独自のパラメータを表示できます。なお「SparamEval」に記入している場合は評価式が優先されます。
 * 
 * 独自のパラメータ
 * this._actor 表示中のアクターのゲームデータ
 * actor 表示中のアクターのデータベース
 * 
 * キーボード操作
 * QWキー　キャラ切り替え
 * ←→キー　ページ切り替え
 * 
 * タッチ操作
 * <>ボタン　キャラ切り替え
 * ΛVボタン　ページ切り替え
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/2/28 Ver.1.3.7
 * 「背景サイズをUIに合わせる」をfalseに設定時UIの左上基準に表示されてしまう問題を修正。
 * 2021/2/27 Ver.1.3.6
 * ステート有効度のステート無効化が反映されていなかった問題を修正。
 * 2021/2/23 Ver.1.3.5
 * プロフィール欄を表示させない機能を追加。
 * 2021/2/21 Ver.1.3.4
 * 追加パラメータ、特殊パラメータ、独自パラメータに任意の単位を付けられるように変更。
 * 2021/2/20 Ver.1.3.3
 * 追加パラメータ、特殊パラメータに任意のパラメータを追加できる機能を追加。
 * 2021/2/17 Ver.1.3.2
 * アクター立ち絵の拡大率が100以外の時に画像X座標がずれいてた問題を修正。
 * 2021/2/16 Ver.1.3.1
 * Scene_Base.prototype.isBottomButtonModeで設定を変更した際、ウィンドウがずれる問題を修正。
 * アクター立ち絵の拡大率が100以外の時に画像座標が下基準になっていなかったのを修正。
 * 2021/1/24 Ver.1.3.0
 * 独自パラメータを表示できる機能を追加。
 * 2021/1/9 Ver.1.2.0
 * 各項目の設定方法を変更。
 * 2020/12/28 Ver.1.1.2
 * 立ち絵の座標処理を修正。
 * 2020/12/8 Ver.1.1.1
 * 最大レベル時の次のレベルまでの経験値表示のゲージMAXで100％で表示するように修正。
 * 2020/12/7 Ver.1.1.0
 * 次のレベルまでの経験値表示を百分率表示に出来るよう対応。
 * 2020/11/26 Ver.1.0.7
 * 特殊パラメータでSparamIdを3に設定し、SparamNameを空欄の状態でステータス画面を開くと
 * 本来「薬の知識」が出るところ「回復効果率」と表示されてしまう問題を修正。
 * 2020/11/23 Ver.1.0.6
 * 立ち絵を表示位置を左、中央、右から選択し配置出来る機能を追加。
 * 2020/11/22 Ver.1.0.5
 * 背景画像を指定できる機能を追加。
 * 2020/11/19 Ver.1.0.4
 * 解像度とUIのサイズが違う場合に、ステータス詳細項目がウィンドウ外にずれる問題や、他のステータス項目と
 * 表示が被る問題を修正。
 * 2020/11/18 Ver.1.0.3
 * ステータス詳細項目が画面からはみ出た際、項目名が正常に表示されない問題を修正。
 * 一部処理を変更。
 * 2020/11/18 Ver.1.0.2
 * 表示外の少数点を四捨五入か切り捨てで丸める機能を追加。
 * 2020/11/17 Ver.1.0.1 
 * 追加能力値、特殊能力値、属性有効度、ステート有効度の表示できる小数点の桁数を指定できる機能を追加。
 * ページの切り替えをタッチ操作でも行えるように対応。
 * 2020/11/16 Ver.1.0.0
 * 初版
 * 
 * @param Window
 * @text ウィンドウ設定
 * 
 * @param ContentWidth
 * @text 項目の表示横幅
 * @desc ページ内の項目の表示横幅。(0で自動調整)
 * @type number
 * @default 0
 * @min 0
 * @max 9999
 * @parent Window
 * 
 * @param ProfileShow
 * @text プロフィールの表示
 * @desc 画面下のプロフィールを表示します。
 * @type boolean
 * @default true
 * @parent Window
 * 
 * @param BackShow
 * @text ステータス項目背景表示
 * @desc ステータス項目の背景画像の表示を設定します。
 * @type boolean
 * @default true
 * @parent Window
 * 
 * @param Decimal
 * @text 小数点桁数
 * @desc 表示出来る小数点桁数。
 * @type number
 * @default 2
 * @min 0
 * @max 99
 * @parent Window
 * 
 * @param DecimalMode
 * @text 端数処理四捨五入
 * @desc 表示外小数点を四捨五入で丸める。（falseで切り捨て）
 * @type boolean
 * @default true
 * @parent Window
 * 
 * @param ExpPercent
 * @text 経験値百分率表示
 * @desc 経験値を百分率で表示
 * @type boolean
 * @default false
 * @parent Window
 * 
 * @param BackGroundImg
 * @desc 背景画像ファイル名を指定します。
 * @text 背景画像
 * @type file
 * @dir img/pictures
 * @parent Window
 * 
 * @param BackUiWidth
 * @text 背景サイズをUIに合わせる
 * @desc 背景サイズをUIに合わせる。
 * @type boolean
 * @default true
 * @parent Window
 * 
 * @param Pages
 * @text ページ設定
 * 
 * @param 2Pages
 * @text ２ページ目設定
 * @parent Pages
 * 
 * @param Page2Left
 * @desc 左側に表示する項目。
 * @text 左側表示項目
 * @type select
 * @option なし
 * @value -1
 * @option 追加能力値
 * @value 2
 * @option 特殊能力値
 * @value 3
 * @option 属性有効度
 * @value 4
 * @option ステート有効度
 * @value 5
 * @option 独自パラメータ１
 * @value 10
 * @option 独自パラメータ２
 * @value 11
 * @parent 2Pages
 * @default 2
 * 
 * @param Page2Right
 * @desc 右側に表示する項目。
 * @text 右側表示項目
 * @type select
 * @option なし
 * @value -1
 * @option 追加能力値
 * @value 2
 * @option 特殊能力値
 * @value 3
 * @option 属性有効度
 * @value 4
 * @option ステート有効度
 * @value 5
 * @option 独自パラメータ１
 * @value 10
 * @option 独自パラメータ２
 * @value 11
 * @parent 2Pages
 * @default 3
 * 
 * @param 3Pages
 * @text ３ページ目設定
 * @parent Pages
 * 
 * @param Page3Left
 * @desc 左側に表示する項目。
 * @text 左側表示項目
 * @type select
 * @option なし
 * @value -1
 * @option 追加能力値
 * @value 2
 * @option 特殊能力値
 * @value 3
 * @option 属性有効度
 * @value 4
 * @option ステート有効度
 * @value 5
 * @option 独自パラメータ１
 * @value 10
 * @option 独自パラメータ２
 * @value 11
 * @parent 3Pages
 * @default 4
 * 
 * @param Page3Right
 * @desc 右側に表示する項目。
 * @text 右側表示項目
 * @type select
 * @option なし
 * @value -1
 * @option 追加能力値
 * @value 2
 * @option 特殊能力値
 * @value 3
 * @option 属性有効度
 * @value 4
 * @option ステート有効度
 * @value 5
 * @option 独自パラメータ１
 * @value 10
 * @option 独自パラメータ２
 * @value 11
 * @parent 3Pages
 * @default 5
 * 
 * @param 4Pages
 * @text ４ページ目設定
 * @parent Pages
 * 
 * @param Page4Left
 * @desc 左側に表示する項目。
 * @text 左側表示項目
 * @type select
 * @option なし
 * @value -1
 * @option 追加能力値
 * @value 2
 * @option 特殊能力値
 * @value 3
 * @option 属性有効度
 * @value 4
 * @option ステート有効度
 * @value 5
 * @option 独自パラメータ１
 * @value 10
 * @option 独自パラメータ２
 * @value 11
 * @parent 4Pages
 * @default -1
 * 
 * @param Page4Right
 * @desc 右側に表示する項目。
 * @text 右側表示項目
 * @type select
 * @option なし
 * @value -1
 * @option 追加能力値
 * @value 2
 * @option 特殊能力値
 * @value 3
 * @option 属性有効度
 * @value 4
 * @option ステート有効度
 * @value 5
 * @option 独自パラメータ１
 * @value 10
 * @option 独自パラメータ２
 * @value 11
 * @parent 4Pages
 * @default -1
 * 
 * @param DateName
 * @text 名称設定 
 * 
 * @param ParamName
 * @text 能力値の名称
 * @desc 能力値の名称を設定します。
 * @type string
 * @default 能力値
 * @parent DateName
 * 
 * @param EquipsName
 * @text 装備の名称
 * @desc 装備の名称を設定します。
 * @type string
 * @default 装備
 * @parent DateName
 * 
 * @param XParamName
 * @text 追加能力値の名称
 * @desc 追加能力値の名称を設定します。
 * @type string
 * @default 追加能力値
 * @parent DateName
 * 
 * @param SParamName
 * @text 特殊能力値の名称
 * @desc 特殊能力値の名称を設定します。
 * @type string
 * @default 特殊能力値
 * @parent DateName
 * 
 * @param ElementName
 * @text 属性有効度の名称
 * @desc 属性有効度の名称を設定します。
 * @type string
 * @default 属性有効度
 * @parent DateName
 * 
 * @param StateName
 * @text ステート有効度の名称
 * @desc ステート有効度の名称を設定します。
 * @type string
 * @default ステート有効度
 * @parent DateName
 * 
 * @param ActorImg
 * @text 立ち絵設定
 * 
 * @param ActorsImgList
 * @text 画像設定
 * @desc アクターの画像設定
 * @default []
 * @type struct<actorImgList>[]
 * @parent ActorImg
 * 
 * @param actorPosition
 * @text 立ち絵表示位置
 * @desc 立ち絵の表示位置を指定します
 * @type select
 * @option 左
 * @value 0
 * @option 中央
 * @value 1
 * @option 右
 * @value 2
 * @default 2
 * @parent ActorImg
 * 
 * @param ParamDate
 * @text パラメータ設定
 * 
 * @param Xparam
 * @type struct<XparamData>[]
 * @text 追加能力値
 * @default ["{\"XparamName\":\"\",\"XparamId\":\"0\",\"XparamEval\":\"\",\"XparamUnit\":\"%\"}","{\"XparamName\":\"\",\"XparamId\":\"1\",\"XparamEval\":\"\",\"XparamUnit\":\"%\"}","{\"XparamName\":\"\",\"XparamId\":\"2\",\"XparamEval\":\"\",\"XparamUnit\":\"%\"}","{\"XparamName\":\"\",\"XparamId\":\"3\",\"XparamEval\":\"\",\"XparamUnit\":\"%\"}","{\"XparamName\":\"\",\"XparamId\":\"4\",\"XparamEval\":\"\",\"XparamUnit\":\"%\"}","{\"XparamName\":\"\",\"XparamId\":\"5\",\"XparamEval\":\"\",\"XparamUnit\":\"%\"}","{\"XparamName\":\"\",\"XparamId\":\"6\",\"XparamEval\":\"\",\"XparamUnit\":\"%\"}","{\"XparamName\":\"\",\"XparamId\":\"7\",\"XparamEval\":\"\",\"XparamUnit\":\"%\"}","{\"XparamName\":\"\",\"XparamId\":\"8\",\"XparamEval\":\"\",\"XparamUnit\":\"%\"}","{\"XparamName\":\"\",\"XparamId\":\"9\",\"XparamEval\":\"\",\"XparamUnit\":\"%\"}"]
 * @parent ParamDate
 * 
 * @param Sparam
 * @type struct<SparamData>[]
 * @text 特殊能力値
 * @default ["{\"SparamName\":\"\",\"SparamId\":\"0\",\"SparamEval\":\"\",\"SparamUnit\":\"%\"}","{\"SparamName\":\"\",\"SparamId\":\"1\",\"SparamEval\":\"\",\"SparamUnit\":\"%\"}","{\"SparamName\":\"\",\"SparamId\":\"2\",\"SparamEval\":\"\",\"SparamUnit\":\"%\"}","{\"SparamName\":\"\",\"SparamId\":\"3\",\"SparamEval\":\"\",\"SparamUnit\":\"%\"}","{\"SparamName\":\"\",\"SparamId\":\"4\",\"SparamEval\":\"\",\"SparamUnit\":\"%\"}","{\"SparamName\":\"\",\"SparamId\":\"5\",\"SparamEval\":\"\",\"SparamUnit\":\"%\"}","{\"SparamName\":\"\",\"SparamId\":\"6\",\"SparamEval\":\"\",\"SparamUnit\":\"%\"}","{\"SparamName\":\"\",\"SparamId\":\"7\",\"SparamEval\":\"\",\"SparamUnit\":\"%\"}","{\"SparamName\":\"\",\"SparamId\":\"8\",\"SparamEval\":\"\",\"SparamUnit\":\"%\"}","{\"SparamName\":\"\",\"SparamId\":\"9\",\"SparamEval\":\"\",\"SparamUnit\":\"%\"}"]
 * @parent ParamDate
 * 
 * @param ElementResist
 * @type struct<ElementData>[]
 * @text 属性耐性
 * @default ["{\"ElementNo\":\"1\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"2\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"3\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"4\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"5\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"6\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"7\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"8\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"9\",\"ElementIconId\":\"\"}"]
 * @parent ParamDate
 * 
 * @param StateResist
 * @type struct<StateData>[]
 * @text 状態耐性
 * @default ["{\"StateNo\":\"4\"}","{\"StateNo\":\"5\"}","{\"StateNo\":\"6\"}","{\"StateNo\":\"7\"}","{\"StateNo\":\"8\"}","{\"StateNo\":\"9\"}","{\"StateNo\":\"10\"}","{\"StateNo\":\"12\"}","{\"StateNo\":\"13\"}"]
 * @parent ParamDate
 * 
 * @param StateResistText
 * @text 有効度ステート名表示
 * @desc ステート有効度のステートアイコンをステート名で表示させます。
 * @type boolean
 * @default false
 * @parent ParamDate
 * 
 * @param OriginalParam1
 * @type struct<OriginalParamData>[]
 * @text 独自表示項目1
 * @default
 * @parent ParamDate
 * 
 * @param OriginalParam1Name
 * @desc 独自パラメータ１の名称。
 * @text 独自パラメータ１名称
 * @type string
 * @parent ParamDate
 * 
 * @param OriginalParam2
 * @type struct<OriginalParamData>[]
 * @text 独自表示項目2
 * @default
 * @parent ParamDate
 * 
 * @param OriginalParam2Name
 * @desc 独自パラメータ２の名称。
 * @text 独自パラメータ２名称
 * @type string
 * @parent ParamDate
 * 
 * @param GaugeWidth
 * @text ゲージ横幅
 * @desc HP,MP,TPゲージの横幅を指定します。
 * @type number
 * @default 200
 * @min 0
 * @max 9999
 * @parent ParamDate
 */
/*~struct~actorImgList:
 * 
 * @param actorId
 * @text アクター
 * @desc アクターを指定します。
 * @type actor
 * 
 * @param ActorImg
 * @text アクター画像
 * @desc アクターの画像を表示します。
 * @type file
 * @dir img/pictures
 * 
 * @param Actor_X
 * @desc 画像の表示位置X座標。
 * @text 画像表示位置X座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Actor_Y
 * @desc 画像の表示位置Y座標。
 * @text 画像表示位置Y座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Actor_Scale
 * @desc 画像の拡大率。
 * @text 画像拡大率
 * @type number
 * @default 100
 * @min 0
 * @max 999
 *  
 */
/*~struct~XparamData:
 *
 * @param XparamName
 * @desc 追加能力値の設定します。
 * @type string
 *
 * @param XparamId
 * @desc 0:命中 1:回避 2:会心 3:会心回避 4:魔法回避 5:魔法反射 6:反撃 7:HP再生 8:MP再生 9:TP再生
 * @type number
 * 
 * @param XparamEval
 * @desc 追加パラメータを評価式で表示します。
 * @text 追加パラメータ評価式
 * @type string
 * @default
 * 
 * @param XparamUnit
 * @desc 単位を設定します。
 * @text 単位
 * @type string
 * @default  %
 */
/*~struct~SparamData:
 *
 * @param SparamName
 * @desc 特殊能力値の用語を設定します。
 * @type string
 *
 * @param SparamId
 * @desc 0:狙われ 1:防御効果 2:回復効果 3:薬知識 4:MP消費 5:TPチャージ 6:物理ダメージ 7:魔法ダメージ 8:床ダメージ 9:経験獲得
 * @type number
 * 
 * @param SparamEval
 * @desc パラメータを評価式で表示します。
 * @text 特殊パラメータ評価式
 * @type string
 * @default
 * 
 * @param SparamUnit
 * @desc 単位を設定します。
 * @text 単位
 * @type string
 * @default  %
 */
/*~struct~ElementData:
 *
 * @param ElementNo
 * @desc 表示する属性番号を指定します。
 * @type number
 *
 * @param ElementIconId
 * @desc アイコンのIDを指定します。
 * @type number
 */
/*~struct~StateData:
 *
 * @param StateNo
 * @desc 表示するステートを指定します。
 * @type state
 *
 */
/*~struct~OriginalParamData:
 *
 * @param paramName
 * @desc 表示する名称。
 * @text 名称
 * @type string
 * 
 * @param paramValue
 * @desc 表示する評価式。
 * @text パラメータ
 * @type string
 * 
 * @param paramUnit
 * @desc 単位を設定します。
 * @text 単位
 * @type string
 * @default
 *
 */

var Imported = Imported || {};
Imported.NUUN_StatusScreen = true;

(() => {
const parameters = PluginManager.parameters('NUUN_StatusScreen');
const param = JSON.parse(JSON.stringify(parameters, function(key, value) {
  try {
      return JSON.parse(value);
  } catch (e) {
      try {
          return eval(value);
      } catch (e) {
          return value;
      }
  }
}));

function dateCheck(mode) {
  if (param.Page2Left === mode || aram.Page2Right === mode || param.Page3Left === mode || param.Page3Right == mode) {
    return true;
  }
  return false;
};

function maxPages() {
  let maxPages = 1;
  maxPages += param.Page2Left >= 0 || param.Page2Right >= 0 ? 1 : 0;
  maxPages += param.Page3Left >= 0 || param.Page3Right >= 0 ? 1 : 0;
  maxPages += param.Page4Left >= 0 || param.Page4Right >= 0 ? 1 : 0;
  return maxPages;
};


const _Scene_Status_initialize = Scene_Status.prototype.initialize;
Scene_Status.prototype.initialize = function() {
  _Scene_Status_initialize.call(this);
  this._pageMode = 0;
};


Scene_Status.prototype.create = function() {
  Scene_MenuBase.prototype.create.call(this);
  this.createStatusWindow();
  this.createStatusBasicWindow();
  this.createStatusContentWindow();
  this.createProfileWindow();
  this.createStatusButton();
};

const _Scene_Status_createStatusWindow = Scene_Status.prototype.createStatusWindow;
Scene_Status.prototype.createStatusWindow = function() {
  _Scene_Status_createStatusWindow.call(this);
  if (param.BackGroundImg) {
    this._statusWindow.opacity = 0;
    this._statusWindow.frameVisible = false;
  }
  this.maxPage = maxPages();
};

Scene_Status.prototype.createStatusBasicWindow = function() {
  const rect = this.statusWindowRect();
  this._basicWindow = new Window_Basic(rect);
  this._basicWindow.x += (Graphics.width - Graphics.boxWidth) / 2;
  this._basicWindow.y += (Graphics.height - Graphics.boxHeight) / 2;
  this.addChild(this._basicWindow);
};

Scene_Status.prototype.createStatusContentWindow = function() {
  let rect = this.leftContentWindowRect();
  this._leftContentWindow = new Window_LeftContent(rect);
  this.addChild(this._leftContentWindow);
  rect = this.rightContentWindowRect();
  this._rightContentWindow = new Window_RightContent(rect);
  this.addChild(this._rightContentWindow);
};

Scene_Status.prototype.statusWindowRect = function() {
  const wx = 0;
  const wy = this.mainAreaTop();
  const ww = Graphics.boxWidth;
  const wh = this.mainAreaHeight();
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Status.prototype.createProfileWindow = function() {
  const rect = this.profileWindowRect();
  this._profileWindow = new Window_Help(rect);
  if (param.ProfileShow) {
    this.addChild(this._profileWindow);
  }
  this._profileWindow.opacity = 0;
  this._profileWindow.frameVisible = false;
};

Scene_Status.prototype.profileWindowRect = function() {
  const ww = Graphics.boxWidth;
  const wh = this.profileHeight();
  const wx = (Graphics.width - Graphics.boxWidth) / 2;
  const wy = (Graphics.height - Graphics.boxHeight) / 2 + this.mainAreaBottom() - wh;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Status.prototype.leftContentWindowRect = function() {
  const ww = this.statusContenWidth();
  const wh = this.statusParamsHeight();
  const wx = (Graphics.width - Graphics.boxWidth) / 2;
  const wy = (Graphics.height - Graphics.boxHeight) / 2 + this.mainAreaTop() + this.statusHeight();
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Status.prototype.rightContentWindowRect = function() {
  const ww = this.statusContenWidth() + 100;
  const wh = this.statusParamsHeight();
  const wx = (Graphics.width - Graphics.boxWidth) / 2 + ww;
  const wy = (Graphics.height - Graphics.boxHeight) / 2 + this.mainAreaTop() + this.statusHeight();
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Status.prototype.createStatusButton = function() {
  if(this.maxPage > 1 && ConfigManager.touchUI) {
    this._statusupButton = new Sprite_Button("up");
    this._statusupButton.x = 24 + this._pageupButton.width + this._pagedownButton.width;
    this._statusupButton.y = this.buttonY();
    const statusupRight = this._statusupButton.x + this._statusupButton.width;
    this._statusdownButton = new Sprite_Button("down");
    this._statusdownButton.x = statusupRight + 4;
    this._statusdownButton.y = this.buttonY();
    this.addWindow(this._statusupButton);
    this.addWindow(this._statusdownButton);
    this._statusupButton.setClickHandler(this.updateContentsPageup.bind(this));
    this._statusdownButton.setClickHandler(this.updateContentsPagedown.bind(this));
  }
};

const _Scene_Status_createBackground = Scene_Status.prototype.createBackground;
Scene_Status.prototype.createBackground = function() {
  _Scene_Status_createBackground.call(this);
	if (param.BackGroundImg) {
		const sprite = new Sprite();
    sprite.bitmap = ImageManager.loadPicture(param.BackGroundImg);
    sprite.x = param.BackUiWidth ? (Graphics.width - (Graphics.boxWidth + 8)) / 2 : 0;
    sprite.y = param.BackUiWidth ? (Graphics.height - (Graphics.boxHeight + 8)) / 2 : 0;
    this.addChild(sprite);
    this._backGroundImg = sprite;
  }
};

const _Scene_Status_profileHeight = Scene_Status.prototype.profileHeight;
Scene_Status.prototype.profileHeight = function() {
  return param.ProfileShow ? _Scene_Status_profileHeight.call(this) : 0;
};

Scene_Status.prototype.statusHeight = function() {
  const row = Math.floor((this.mainAreaHeight() - 564) / 60).clamp(0, 1);
  return this.calcWindowHeight(5 + row, false) + 4;
};

Scene_Status.prototype.statusParamsHeight = function() {
  const height = this.mainAreaHeight() - (this.statusHeight() + this.profileHeight());
  const row = Math.floor(height / 36);
  return this.calcWindowHeight(row, false);
};

Scene_Status.prototype.statusContenWidth = function() {
  return (param.ContentWidth > 0 ? param.ContentWidth - 8 : Graphics.boxWidth) / 2;
};

Scene_Status.prototype.refreshActor = function() {
  const actor = this.actor();
  this._profileWindow.setText(actor.profile());
  this._basicWindow.setActor(actor);
  this._leftContentWindow.setActor(actor);
  this._rightContentWindow.setActor(actor);
  this.updatePage();
};

Scene_Status.prototype.updateContentsPagedown = function() {
	const maxPage = this.maxPage;
  this._pageMode = (this._pageMode + 1) % maxPage;
  SoundManager.playCursor();
  this.updatePage();
};

Scene_Status.prototype.updateContentsPageup = function() {
	const maxPage = this.maxPage;
  this._pageMode = (this._pageMode + (maxPage - 1)) % maxPage;
  SoundManager.playCursor();
  this.updatePage();
};

Scene_Status.prototype.updatePage = function() {
  this._basicWindow.contents.clear();
  this._basicWindow.refresh();
  this.refreshPage();
};

Scene_Status.prototype.refreshPage = function() {
  this._leftContentWindow.contents.clear();
  this._rightContentWindow.contents.clear();
  if (this._pageMode === 0) {
    this._leftContentWindow.contentShow = 0;
    this._rightContentWindow.contentShow = 1;
  } else if(this._pageMode === 1) {
    this._leftContentWindow.contentShow = param.Page2Left;
    this._rightContentWindow.contentShow = param.Page2Right;
  } else if(this._pageMode === 2) {
    this._leftContentWindow.contentShow = param.Page3Left;
    this._rightContentWindow.contentShow = param.Page3Right;
  } else if (this._pageMode === 3) {
    this._leftContentWindow.contentShow = param.Page4Left;
    this._rightContentWindow.contentShow = param.Page4Right;
  }
  this.contentsWindowRefresh();
  this._leftContentWindow.refresh();
  this._rightContentWindow.refresh();
};

Scene_Status.prototype.contentsWindowRefresh = function() {
  if (this._pageMode === 0) {
    this._leftContentWindow.width = this.statusContenWidth() - 100;
    this._rightContentWindow.width = this.statusContenWidth() + 100;
  } else {
    this._leftContentWindow.width = this.statusContenWidth();
    this._rightContentWindow.width = this.statusContenWidth();
  }
  this._rightContentWindow.x = (Graphics.width - Graphics.boxWidth) / 2 + this._leftContentWindow.width;
};


const _Scene_Status_update = Scene_Status.prototype.update;
Scene_Status.prototype.update = function() {
  _Scene_Status_update.call(this);
  if (param.BackGroundImg) {
    const sprite = this._backGroundImg;
    if(param.BackUiWidth) {
      sprite.scale.x = (Graphics.boxWidth + 8 !== sprite.bitmap.width ? (Graphics.boxWidth + 8) / sprite.bitmap.width : 1);
      sprite.scale.y = (Graphics.boxHeight + 8!== sprite.bitmap.height ? (Graphics.boxHeight + 8) / sprite.bitmap.height : 1);
    } else {
      sprite.scale.x = (Graphics.width !== sprite.bitmap.width ? Graphics.width / sprite.bitmap.width : 1);
      sprite.scale.y = (Graphics.height !== sprite.bitmap.height ? Graphics.height / sprite.bitmap.height : 1);
    }
	}
	if (Input.isTriggered('left') && this.maxPage > 1) {
		this.updateContentsPageup();
	} else if (Input.isTriggered('right') && this.maxPage > 1){
		this.updateContentsPagedown();
  }
};


Window_StatusBase.prototype.statusParamDecimal = function(val) {
  if (param.DecimalMode) {
    return Math.round(val * (param.Decimal > 0 ? Math.pow(10, param.Decimal) : 1)) / (param.Decimal > 0 ? Math.pow(10, param.Decimal) : 1);
  } else {
    return Math.floor(val * (param.Decimal > 0 ? Math.pow(10, param.Decimal) : 1)) / (param.Decimal > 0 ? Math.pow(10, param.Decimal) : 1);
  }
};

Window_StatusBase.prototype.nuun_drawHorzLine = function(y) {
  const lineY = y + this.lineHeight() / 2 - 1;
  this.contents.paintOpacity = 48;
  this.contents.fillRect(0, lineY, this.contentsWidth(), 2, ColorManager.normalColor());
  this.contents.paintOpacity = 255;
};

Window_Status.prototype.refresh = function() {
  Window_StatusBase.prototype.refresh.call(this);

};

Window_Status.prototype.drawBlocks = function() {
  this.actorImg();
  this.drawBlock1();
  this.drawBlock2();
};

Window_Status.prototype.actorImg = function() {
  if(this._imgDate && this.bitmap._url) {
    const date = this._imgDate;
    let x = date.Actor_X;
    const scale = (date.Actor_Scale || 100) / 100;
    if(param.actorPosition === 0) {
      x += 0;
    } else if (param.actorPosition === 1) {
      x += Math.floor(this.width / 2 - ((this.bitmap.width * scale) / 2));
    } else {
      x += this.width - (this.bitmap.width * scale) - 24;
    }
    const dw = this.bitmap.width * scale;
    const dh = this.bitmap.height * scale;
    const y = date.Actor_Y + (this.height - (this.bitmap.height * scale)) - 24;
    this.contents.blt(this.bitmap, 0, 0, this.bitmap.width, this.bitmap.height, x, y, dw, dh);
  }
};

const _Window_Status_loadFaceImages = Window_Status.prototype.loadFaceImages;
Window_Status.prototype.loadFaceImages = function() {
  _Window_Status_loadFaceImages.call(this);
  this._actorImgDate = [];
  for (const actor of $gameParty.members()) {
    const date = this.actorImgesDate(actor.actorId());
    if (date) {
      date.bitmap = ImageManager.loadPicture(date.ActorImg);
      this._actorImgDate.push(date);
    }
  }
};

Window_Status.prototype.actorImgesDate = function(id) {
  const actors = param.ActorsImgList;
  const date = actors.find(actor => actor.actorId === id);
  return date ? date : this.undefinedDate(id, date);
};

Window_Status.prototype.undefinedDate = function(id, date) {
  return null;
};

Window_Status.prototype.block2Y = function() {
  const lineHeight = this.lineHeight();
  const min = lineHeight;
  const max = this.innerHeight - lineHeight * 4;
  const a = Math.min(1.4 * this.height / 564, 2);
  return Math.floor((lineHeight * a).clamp(min, max));
};

Window_Status.prototype.drawBlock2 = function() {
  const lineHeight = this.lineHeight();
  const y = this.block2Y();
  //this.nuun_drawHorzLine(Math.floor(Math.max(y - lineHeight, lineHeight * 0.6)));
  this.drawActorFace(this._actor, 12, y);
  this.drawBasicInfo(204, y);
  this.drawExpInfo(456, y);
  //this.nuun_drawHorzLine(Math.floor(y + lineHeight * (3.8 * this.height / 564).clamp(3.8, 4.2)));
  //this.nuun_drawHorzLine(this.height - lineHeight * 3.3 + (1 * this.height / 564).clamp(1, 1.5));
};

Window_Status.prototype.drawExpInfo = function(x, y) {
  const lineHeight = this.lineHeight();
  const expTotal = TextManager.expTotal.format(TextManager.exp);
  const expNext = TextManager.expNext.format(TextManager.level);
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(expTotal, x, y + lineHeight * 0, 270);
  this.drawText(expNext, x, y + lineHeight * 2, 270);
  this.resetTextColor();
  this.drawText(this.expTotalValue(), x, y + lineHeight * 1, 270, "right");
  this.placeExpGauge(this._actor, x - 30, y + lineHeight * 3.32);
};

Window_Status.prototype.placeExpGauge = function(actor, x, y) {
  const type = 'exp'
  const key = "actor%1-gauge-%2".format(actor.actorId(), type);
  const sprite = this.createInnerSprite(key, Sprite_StatusExpGauge);
  sprite.setup(actor, type);
  sprite.move(x, y);
  sprite.show();
};

Window_Status.prototype.placeGauge = function(actor, type, x, y) {
  const key = "actor%1-gauge-%2".format(actor.actorId(), type);
  const sprite = this.createInnerSprite(key, Sprite_StatusGauge);
  sprite.setup(actor, type);
  sprite.move(x, y);
  sprite.show();
};

Window_Status.prototype.characterSwitchingHelp = function(x, y) {
  const lineHeight = this.lineHeight();console.log(y)
  this.changeTextColor(ColorManager.textColor(6));
  this.contents.fontSize = 18;
  let text = ConfigManager.touchUI ? "ΛVボタン / " : "";
  this.drawText(text +"QWキー:キャラの切替", x, y ,300,'right');
  text = ConfigManager.touchUI ? "<>ボタン / " : "";
	this.drawText(text +"←→キー:項目の切替", x, y + lineHeight, 300,'right');
	this.resetTextColor();
	this.contents.fontSize = $gameSystem.mainFontSize();
};

function Window_Basic() {
  this.initialize(...arguments);
}

Window_Basic.prototype = Object.create(Window_Status.prototype);
Window_Basic.prototype.constructor = Window_Basic;

Window_Basic.prototype.initialize = function(rect) {
  Window_Status.prototype.initialize.call(this, rect);
  this.opacity = 0;
  this.frameVisible = false;
};

Window_Basic.prototype.refresh = function() {
  Window_StatusBase.prototype.refresh.call(this);
  if (this._actor) {
    const index = this._actor.index();
    this._imgDate = this._actorImgDate[index];
    this.bitmap = this._imgDate ? this._imgDate.bitmap : null;
    if ((this._imgDate && this.bitmap._url) && !this.bitmap.isReady()) {
      this.bitmap.addLoadListener(this.drawBlocks.bind(this));
    } else {
      this.drawBlocks();
    }
  }
};


function Window_Content() {
  this.initialize(...arguments);
}

Window_Content.prototype = Object.create(Window_StatusBase.prototype);
Window_Content.prototype.constructor = Window_Content;

Window_Content.prototype.initialize = function(rect) {
  Window_StatusBase.prototype.initialize.call(this, rect);
  this._actor = null;
  this.opacity = 0;
  this.frameVisible = false;
};

Window_Content.prototype.setActor = function(actor) {
  if (this._actor !== actor) {
      this._actor = actor;
      this.refresh();
  }
};

Window_Content.prototype.itemHeight = function() {
  return this.lineHeight();
};

Window_Content.prototype.maxCols = function() {
  if (this.contentShow === 0) {
    return 1;
  } else if (this.contentShow === 1) {
    return 1;
  } else if (this.contentShow === 10) {
    return 1;
  } else if (this.contentShow === 11) {
    return 1;
  }
  return 2;
};



Window_Content.prototype.refresh = function() {
  this.pageRefresh();
};

Window_Content.prototype.drawParams = function(rect) {
  const lineHeight = this.lineHeight();
  const sw = 160;
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(param.ParamName, rect.x, rect.y, rect.width);
  this.resetTextColor();
  for (let i = 0; i < 6; i++) {
    let itemRect = this.itemLineRect(i);
    itemRect.y += lineHeight;
    const paramId = i + 2;
    const name = TextManager.param(paramId);
    const value = this._actor.param(paramId);
    this.drawItemBackground(i);
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(name, itemRect.x, itemRect.y, 152);
    this.resetTextColor();
    this.drawText(value, itemRect.x + 160, itemRect.y, itemRect.width - 160, "right");
  }
};

Window_Content.prototype.drawEquip = function(rect) {
  const lineHeight = this.lineHeight();
  const equips = this._actor.equips();
  const sw = 138;
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(param.EquipsName, rect.x, rect.y, rect.width);
  this.resetTextColor();
  for (let i = 0; i < equips.length; i++) {
    let itemRect = this.itemLineRect(i);
    itemRect.y += lineHeight;
    let slotName = this.actorSlotName(this._actor, i);
    let item = equips[i];
    this.drawItemBackground(i);
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(slotName, itemRect.x, itemRect.y, sw, itemRect.height);
    this.drawItemName(item, itemRect.x + sw, itemRect.y, itemRect.width - sw);
  }
};

Window_Content.prototype.drawXParams = function(rect) {//XparamUnit
  const lineHeight = this.lineHeight();
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(param.XParamName, rect.x, rect.y, rect.width);
  this.resetTextColor();
  for (let i = 0; i < param.Xparam.length; i++) {
    let itemRect = this.itemLineRect(i);
    itemRect.y += lineHeight;
    let paramId = param.Xparam[i].XparamId;
    let name = this.XparamName(i);
    let value = (param.Xparam[i].XparamEval ? eval(param.Xparam[i].XparamEval) : this._actor.xparam(paramId) * 100);
    let unit = param.Xparam[i].XparamUnit || "";
    value = this.statusParamDecimal(value);
    this.drawItemBackground(i);
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(name, itemRect.x, itemRect.y, 92);
    this.resetTextColor();
    this.drawText(String(value) + unit, itemRect.x + 100, itemRect.y, itemRect.width - 100, "right");
  }
};

Window_Content.prototype.XparamName = function(index) {
  switch (param.Xparam[index].XparamId) {
    case 0:
      return param.Xparam[index].XparamName ? param.Xparam[index].XparamName : TextManager.param(8);
    case 1:
      return param.Xparam[index].XparamName ? param.Xparam[index].XparamName : TextManager.param(9);
    case 2:
      return param.Xparam[index].XparamName ? param.Xparam[index].XparamName : "会心率";
    case 3:
      return param.Xparam[index].XparamName ? param.Xparam[index].XparamName : "会心回避率";
    case 4:
      return param.Xparam[index].XparamName ? param.Xparam[index].XparamName : "魔法回避率";
    case 5:
      return param.Xparam[index].XparamName ? param.Xparam[index].XparamName : "魔法反射率";
    case 6:
      return param.Xparam[index].XparamName ? param.Xparam[index].XparamName : "反撃率";
    case 7:
      return param.Xparam[index].XparamName ? param.Xparam[index].XparamName : "ＨＰ再生率";
    case 8:
      return param.Xparam[index].XparamName ? param.Xparam[index].XparamName : "ＭＰ再生率";
    case 9:
      return param.Xparam[index].XparamName ? param.Xparam[index].XparamName : "ＴＰ再生率";
    default :
      return param.Xparam[index].XparamName ? param.Xparam[index].XparamName : null;
  }
};

Window_Content.prototype.drawSParams = function(rect) {
  const lineHeight = this.lineHeight();
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(param.SParamName, rect.x, rect.y, rect.width);
  this.resetTextColor();
  for (let i = 0; i < param.Sparam.length; i++) {
    let itemRect = this.itemLineRect(i);
    itemRect.y += lineHeight;
    let paramId = param.Sparam[i].SparamId;
    let name = this.SparamName(i);
    let value = (param.Sparam[i].SparamEval ? eval(param.Sparam[i].SparamEval) : this._actor.sparam(paramId) * 100);
    let unit = param.Sparam[i].SparamUnit || "";
    value = this.statusParamDecimal(value);
    this.drawItemBackground(i);
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(name, itemRect.x, itemRect.y, 92);
    this.resetTextColor();
    this.drawText(String(value) + unit, itemRect.x + 100, itemRect.y, itemRect.width - 100, "right");
  }
};

Window_Content.prototype.SparamName = function(index) {
  switch (param.Sparam[index].SparamId) {
    case 0:
      return param.Sparam[index].SparamName ? param.Sparam[index].SparamName : "狙われ率";
    case 1:
      return param.Sparam[index].SparamName ? param.Sparam[index].SparamName : "防御効果率";
    case 2:
      return param.Sparam[index].SparamName ? param.Sparam[index].SparamName : "回復効果率";
    case 3:
      return param.Sparam[index].SparamName ? param.Sparam[index].SparamName : "薬の知識";
    case 4:
      return param.Sparam[index].SparamName ? param.Sparam[index].SparamName : "ＭＰ消費率";
    case 5:
      return param.Sparam[index].SparamName ? param.Sparam[index].SparamName : "ＴＰチャージ率";
    case 6:
      return param.Sparam[index].SparamName ? param.Sparam[index].SparamName : "物理ダメージ率";
    case 7:
      return param.Sparam[index].SparamName ? param.Sparam[index].SparamName : "魔法ダメージ率";
    case 8:
      return param.Sparam[index].SparamName ? param.Sparam[index].SparamName : "床ダメージ率";
    case 9:
      return param.Sparam[index].SparamName ? param.Sparam[index].SparamName : "経験獲得率";
    default :
      return param.Sparam[index].SparamName ? param.Sparam[index].SparamName : null;
  }
};

Window_Content.prototype.drawElement = function(rect) {
  const lineHeight = this.lineHeight();
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(param.ElementName, rect.x, rect.y, rect.width);
  this.resetTextColor();
  if (param.ElementResist) {
    for (let i = 0; i < param.ElementResist.length; i++) {
      let itemRect = this.itemLineRect(i);
      itemRect.y += lineHeight;
      let elementId = param.ElementResist[i].ElementNo;
      if(elementId > 0) {
        this.drawItemBackground(i);
        let iconId = param.ElementResist[i].ElementIconId;
        if(iconId > 0) {
          this.drawIcon(iconId, itemRect.x, itemRect.y + 2);
        } else {
          const name = $dataSystem.elements[elementId];
          this.changeTextColor(ColorManager.systemColor());
          this.drawText(name, itemRect.x, itemRect.y, 92);
        }
        let rate = this._actor.elementRate(elementId) * 100;
        rate = this.statusParamDecimal(rate);
        this.resetTextColor();
        this.drawText(rate +"%", itemRect.x + 100, itemRect.y, itemRect.width - 100, "right");
      }
    }
  }
};

Window_Content.prototype.drawState = function(rect) {
  const lineHeight = this.lineHeight();
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(param.StateName, rect.x, rect.y, rect.width);
  this.resetTextColor();
  if (param.StateResist) {
    for (let i = 0; i < param.StateResist.length; i++) {
      let itemRect = this.itemLineRect(i);
      itemRect.y += lineHeight;
      const stateId = param.StateResist[i].StateNo;
      if(stateId > 0) {
        this.drawItemBackground(i);
        const iconId = $dataStates[stateId].iconIndex;
        if(iconId > 0 && !param.StateResistText) {
          this.drawIcon(iconId, itemRect.x, itemRect.y + 2);
        } else {
          const name = $dataStates[stateId].name;
          this.changeTextColor(ColorManager.systemColor());
          this.drawText(name, itemRect.x, itemRect.y, 92);
        }
        let rate = this._actor.stateRate(stateId) * 100 * (this._actor.isStateResist(stateId) ? 0 : 1);
        rate = this.statusParamDecimal(rate);
        this.resetTextColor();
        this.drawText(rate +"%", itemRect.x + 100, itemRect.y, itemRect.width - 100, "right");
      }
    }
  }
};

Window_Content.prototype.OriginalParam1 = function(rect) {
  const actor = this._actor.actor();
  const lineHeight = this.lineHeight();
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(param.OriginalParam1Name, rect.x, rect.y, rect.width);
  this.resetTextColor();
  if (param.OriginalParam1) {
    const date = param.OriginalParam1;
    for (let i = 0; i < param.OriginalParam1.length; i++) {
      let itemRect = this.itemLineRect(i);
      itemRect.y += lineHeight;
      let name = date[i].paramName;
      let param = eval(date[i].paramValue) || 0;
      let unit = date[i].paramUnit || "";
      this.drawItemBackground(i);
      this.changeTextColor(ColorManager.systemColor());
      this.drawText(name, itemRect.x, itemRect.y, 192);
      this.resetTextColor();
      this.drawText(param + unit, itemRect.x + 200, itemRect.y, itemRect.width - 200, "right");
    }
  }
};

Window_Content.prototype.OriginalParam2 = function(rect) {
  const actor = this._actor.actor();
  const lineHeight = this.lineHeight();
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(param.OriginalParam2Name, rect.x, rect.y, rect.width);
  this.resetTextColor();
  if (param.OriginalParam2) {
    const date = param.OriginalParam2;
    for (let i = 0; i < param.OriginalParam2.length; i++) {
      let itemRect = this.itemLineRect(i);
      itemRect.y += lineHeight;
      let name = date[i].paramName;
      let param = eval(date[i].paramValue) || 0;
      let unit = date[i].paramUnit || "";
      this.drawItemBackground(i);
      this.changeTextColor(ColorManager.systemColor());
      this.drawText(name, itemRect.x, itemRect.y, 192);
      this.resetTextColor();
      this.drawText(param + unit, itemRect.x + 200, itemRect.y, itemRect.width - 200, "right");
    }
  }
};

Window_Content.prototype.drawElementRadarChart = function(rect) {

  
};

Window_Content.prototype.drawStateRadarChart = function(rect) {

  
};

const _Window_Content_drawItemBackground = Window_Content.prototype.drawItemBackground;
Window_Content.prototype.drawItemBackground = function(index) {
  if (param.BackShow) {
    _Window_Content_drawItemBackground.call(this, index)
  }
};


const _Window_Content_drawBackgroundRect  = Window_Content.prototype.drawBackgroundRect ;
Window_Content.prototype.drawBackgroundRect = function(rect) {
  rect.y += this.lineHeight();
  _Window_Content_drawBackgroundRect.call(this, rect);
};


function Window_LeftContent() {
  this.initialize(...arguments);
}

Window_LeftContent.prototype = Object.create(Window_Content.prototype);
Window_LeftContent.prototype.constructor = Window_LeftContent;

Window_LeftContent.prototype.initialize = function(rect) {
  Window_Content.prototype.initialize.call(this, rect);
};

Window_LeftContent.prototype.pageRefresh = function() {
  this.contentsBack.clear();
  if (this.contentShow >= 0) {
    const rect = this.itemRect(0);
    switch (this.contentShow) {
      case 0:
        this.drawParams(rect);
        break;
      case 1:
        this.drawEquip(rect);
        break;
      case 2:
        this.drawXParams(rect);
        break;
      case 3:
        this.drawSParams(rect);
        break;
      case 4:
        this.drawElement(rect);
        break;
      case 5:
        this.drawState(rect);
        break;
      case 10:
        this.OriginalParam1(rect);
        break;
      case 11:
        this.OriginalParam2(rect);
        break;
    }
  }
};


function Window_RightContent() {
  this.initialize(...arguments);
}

Window_RightContent.prototype = Object.create(Window_Content.prototype);
Window_RightContent.prototype.constructor = Window_RightContent;

Window_RightContent.prototype.initialize = function(rect) {
  Window_Content.prototype.initialize.call(this, rect);
};

Window_RightContent.prototype.pageRefresh = function() {
  this.contentsBack.clear();
  if (this.contentShow >= 0) {
    const rect = this.itemRect(0);
    switch (this.contentShow) {
      case 0:
        this.drawParams(rect);
        break;
      case 1:
        this.drawEquip(rect);
        break;
      case 2:
        this.drawXParams(rect);
        break;
      case 3:
        this.drawSParams(rect);
        break;
      case 4:
        this.drawElement(rect);
        break;
      case 5:
        this.drawState(rect);
        break;
      case 10:
        this.OriginalParam1(rect);
        break;
      case 11:
        this.OriginalParam2(rect);
        break;
    }
  }
};


function Sprite_StatusGauge() {
  this.initialize(...arguments);
}

Sprite_StatusGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_StatusGauge.prototype.constructor = Sprite_StatusGauge;

Sprite_StatusGauge.prototype.initialize = function() {
  Sprite_Gauge.prototype.initialize.call(this);
};

Sprite_StatusGauge.prototype.bitmapWidth = function() {
  return param.GaugeWidth;
};


function Sprite_StatusExpGauge() {
  this.initialize(...arguments);
}

Sprite_StatusExpGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_StatusExpGauge.prototype.constructor = Sprite_StatusExpGauge;

Sprite_StatusExpGauge.prototype.initialize = function() {
  Sprite_Gauge.prototype.initialize.call(this);
};

Sprite_StatusExpGauge.prototype.bitmapWidth = function() {
  return 300;
};

Sprite_StatusExpGauge.prototype.drawValue = function() {
  let currentValue = 0;
  const width = this.bitmapWidth();
  const height = this.bitmapHeight();
  this.setupValueFont();
  if (param.ExpPercent) {
    currentValue = this._battler.isMaxLevel() ? "100%" : this.currentDecimal(this.currentPercent()) +"%";
  } else {
    currentValue = this._battler.isMaxLevel() ? "-------" : this._battler.nextRequiredExp();
  }
  this.bitmap.drawText(currentValue, 0, 0, width, height, "right");
};

Sprite_StatusExpGauge.prototype.currentPercent = function() {
  return (this._battler.currentExp() - this._battler.currentLevelExp()) / (this._battler.nextLevelExp() - this._battler.currentLevelExp()) * 100;
};

Sprite_StatusExpGauge.prototype.currentDecimal = function(val) {
  if (param.DecimalMode) {
    return Math.round(val * (param.Decimal > 0 ? Math.pow(10, param.Decimal) : 1)) / (param.Decimal > 0 ? Math.pow(10, param.Decimal) : 1);
  } else {
    return Math.floor(val * (param.Decimal > 0 ? Math.pow(10, param.Decimal) : 1)) / (param.Decimal > 0 ? Math.pow(10, param.Decimal) : 1);
  }
};

Sprite_StatusExpGauge.prototype.currentValue = function() {
  if (this._battler) {
    return this._battler.isMaxLevel() ? this.currentMaxValue() : this._battler.currentExp() - this._battler.currentLevelExp();
  }
};

Sprite_StatusExpGauge.prototype.currentMaxValue = function() {
  if (this._battler) {
    return this._battler.nextLevelExp() - this._battler.currentLevelExp();
  }
};

Sprite_StatusExpGauge.prototype.gaugeColor1 = function() {
  return ColorManager.expGaugeColor1();
};

Sprite_StatusExpGauge.prototype.gaugeColor2 = function() {
  return ColorManager.expGaugeColor2();
};

ColorManager.expGaugeColor1 = function() {
  return this.textColor(17);
};

ColorManager.expGaugeColor2 = function() {
  return this.textColor(6);
};

})();