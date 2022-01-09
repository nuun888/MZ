/*:-----------------------------------------------------------------------------------
 * NUUN_MenuScreen_2.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc メニュー画面タイプ２
 * @author NUUN
 * @version 1.1.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * メニュー画面の表示を変更、拡張します。
 * メニュー画面に表示できる項目はカスタマイズすることができます。
 * 
 * 当プラグインは、立ち絵、顔グラ表示EXに対応しています。
 * 立ち絵表示EX用画像設定で設定しなくても立ち絵は表示されます。
 * 立ち絵表示EX適用をOFFにすることで立ち絵、顔グラ表示EX導入時でも、このプラグインの立ち絵設定が適用されます。
 * 
 * 顔グラの座標設定はアクターの画像設定または立ち絵表示EX用画像設定（立ち絵、顔グラ表示EX導入時）で設定してください。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * Ver.1.1.0以降ではNUUN_Base Ver.1.4.1以降が必要となります。
 * 
 * 更新履歴
 * 2022/1/9 Ver.1.1.0
 * ステータス項目の表示の文字揃えを指定できる機能を追加。
 * ステータス項目に経験値を追加。
 * インフォウィンドウの文字サイズを指定できる機能を追加。
 * 2021/12/29 Ver.1.0.0
 * 初版
 * 
 * @param Setting
 * @text 共通設定
 * @default ------------------------------
 * 
 * @param MenuCols
 * @text アクターの表示列
 * @desc アクターの表示する列。
 * @type number
 * @default 4
 * @min 1
 * @parent Setting
 * 
 * @param MenuRows
 * @text アクターの表示行
 * @desc アクターの表示する行。
 * @type number
 * @default 1
 * @min 1
 * @parent Setting
 * 
 * @param CommandCols
 * @text メニューコマンドの表示列
 * @desc メニューコマンドの表示する列。
 * @type number
 * @default 4
 * @min 1
 * @parent Setting
 * 
 * @param CommandRows
 * @text メニューコマンドの表示行
 * @desc メニューコマンドの表示する行。
 * @type number
 * @default 2
 * @min 1
 * @parent Setting
 * 
 * @param WindowVisible
 * @text ウィンドウ表示
 * @desc ウィンドウを表示する。
 * @type boolean
 * @default true
 * @parent Setting
 * 
 * @param ExpDisplayMode
 * @text 経験値の表示
 * @desc 経験値の表示を指定します。
 * @type select
 * @option 表示なし
 * @value 0
 * @option 次のレベルまでの必要経験値
 * @value 1
 * @option 現在の獲得経験値
 * @value 2
 * @option 現在の獲得経験値の百分率表示
 * @value 3
 * @default 1
 * @parent Setting
 * 
 * @param BackGroundSetting
 * @text 背景設定
 * @default ------------------------------
 * 
 * @param BackGroundImg
 * @desc 背景画像ファイル名を指定します。
 * @text 背景画像
 * @type file[]
 * @dir img/
 * @default 
 * @parent BackGroundSetting
 * 
 * @param BackUiWidth
 * @text 背景サイズをUIに合わせる
 * @desc 背景サイズをUIに合わせる。
 * @type boolean
 * @default true
 * @parent BackGroundSetting
 * 
 * @param StatusSetting
 * @text ステータス設定
 * @default ------------------------------
 * 
 * @param StatusList
 * @desc ステータス項目設定
 * @text ステータス項目設定
 * @type struct<StatusListData>[]
 * @default ["{\"DateSelect\":\"1\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\"}","{\"DateSelect\":\"4\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"128\",\"Align\":\"'left'\",\"DetaEval\":\"\"}","{\"DateSelect\":\"5\",\"X_Position\":\"1\",\"Y_Position\":\"3\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"10\",\"ItemWidth\":\"0\"}","{\"DateSelect\":\"3\",\"X_Position\":\"1\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"-24\",\"ItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\"}","{\"DateSelect\":\"11\",\"X_Position\":\"1\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"14\",\"ItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\"}","{\"DateSelect\":\"12\",\"X_Position\":\"1\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"42\",\"ItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\"}","{\"DateSelect\":\"13\",\"X_Position\":\"1\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"70\",\"ItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\"}"]
 * @parent StatusSetting
 * 
 * @param HPGaugeWidth
 * @text HPゲージ横幅
 * @desc HPゲージの横幅を指定します。
 * @type number
 * @default 128
 * @min 0
 * @parent StatusSetting
 * 
 * @param MPGaugeWidth
 * @text MPゲージ横幅
 * @desc MPゲージの横幅を指定します。
 * @type number
 * @default 128
 * @min 0
 * @parent StatusSetting
 * 
 * @param TPGaugeWidth
 * @text TPゲージ横幅
 * @desc TPゲージの横幅を指定します。
 * @type number
 * @default 128
 * @min 0
 * @parent StatusSetting
 * 
 * @param Expgauge
 * @text 経験値ゲージ設定
 * @default ------------------------------
 * 
 * @param ExpGaugeWidth
 * @text Expゲージ横幅
 * @desc Expゲージの横幅を指定します。
 * @type number
 * @default 128
 * @min 0
 * @parent Expgauge
 * 
 * @param ExpGaugeColor1
 * @desc 経験値のゲージの色１（左）
 * @text 経験値ゲージ色１
 * @type number
 * @default 17
 * @min 0
 * @parent Expgauge
 * 
 * @param ExpGaugeColor2
 * @desc 経験値のゲージの色２（右）
 * @text 経験値ゲージ色２
 * @type number
 * @default 6
 * @min 0
 * @parent Expgauge
 * 
 * @param LabelShow
 * @text ラベル表示
 * @desc ラベルを表示します
 * @type boolean
 * @default true
 * @parent Expgauge
 * 
 * @param EXPDecimal
 * @text 小数点桁数
 * @desc 表示出来る小数点桁数。
 * @type number
 * @default 2
 * @min 0
 * @max 99
 * @parent Expgauge
 * 
 * 
 * @param InfoSetting
 * @text インフォ設定
 * @default ------------------------------
 * 
 * @param InfoList
 * @desc インフォ項目設定
 * @text インフォ項目設定
 * @type struct<InfoListData>[]
 * @default ["{\"DateSelect\":\"2\",\"X_Position\":\"3\",\"Y_Position\":\"1\",\"X_Coordinate\":\"73\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"180\",\"SystemItemWidth\":\"0\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"Align\":\"'right'\",\"InfoIcon\":\"0\"}","{\"DateSelect\":\"3\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"318\",\"SystemItemWidth\":\"0\",\"NameColor\":\"16\",\"ParamName\":\"現在値:\",\"DetaEval\":\"\",\"Align\":\"'left'\",\"InfoIcon\":\"0\"}","{\"DateSelect\":\"1\",\"X_Position\":\"2\",\"Y_Position\":\"1\",\"X_Coordinate\":\"73\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"NameColor\":\"16\",\"ParamName\":\"プレイ時間:\",\"DetaEval\":\"\",\"Align\":\"'left'\",\"InfoIcon\":\"0\"}"]
 * @parent InfoSetting
 * 
 * @param InfoCols
 * @text インフォの表示列
 * @desc インフォの表示する列。
 * @type number
 * @default 3
 * @min 1
 * @parent InfoSetting
 * 
 * @param InfoRows
 * @text インフォの表示行
 * @desc インフォの表示する行。
 * @type number
 * @default 1
 * @min 1
 * @parent InfoSetting
 * 
 * @param InfoFontSize
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ
 * @type number
 * @default 0
 * @min -99
 * @parent InfoSetting
 * 
 * @param HelpList
 * @desc ヘルプ項目設定
 * @text ヘルプ項目設定
 * @type struct<HelpListData>[]
 * @default ["{\"HelpCommandName\":\"[\\\"'アイテム'\\\"]\",\"HelpCommandText\":\"アイテムを使用します。\"}","{\"HelpCommandName\":\"[\\\"'スキル'\\\"]\",\"HelpCommandText\":\"スキルを表示します。\"}","{\"HelpCommandName\":\"[\\\"'装備'\\\"]\",\"HelpCommandText\":\"装備を変更します。\"}","{\"HelpCommandName\":\"[\\\"'ステータス'\\\"]\",\"HelpCommandText\":\"アクターのステータスを表示します。\"}","{\"HelpCommandName\":\"[\\\"'オプション'\\\"]\",\"HelpCommandText\":\"ゲームの設定を変更します。\"}","{\"HelpCommandName\":\"[\\\"'並び替え'\\\"]\",\"HelpCommandText\":\"メンバーの並び替えを行います。\"}","{\"HelpCommandName\":\"[\\\"'セーブ'\\\"]\",\"HelpCommandText\":\"データを記録します。\"}","{\"HelpCommandName\":\"[\\\"'ゲーム終了'\\\"]\",\"HelpCommandText\":\"ゲームを終了します。\"}"]
 * @parent InfoSetting
 * 
 * @param ActorSetting
 * @text アクター設定
 * @default ------------------------------
 * 
 * @param ActorsImgList
 * @text 画像設定
 * @desc アクターの画像設定
 * @default []
 * @type struct<actorImgList>[]
 * @parent ActorSetting
 * 
 * @param ActorPictureData
 * @text 立ち絵表示EX用画像設定
 * @desc 立ち絵表示EXでのアクターの画像設定
 * @default []
 * @type struct<ActorPictureDataList>[]
 * @parent ActorSetting
 * 
 * @param ActorPictureEXApp
 * @text 立ち絵表示EX適用
 * @desc 立ち絵表示EXの画像変更を適用します。OFFにした場合はこのプラグインでの設定が適用されます。
 * @type boolean
 * @default true
 * @parent ActorSetting
 * 
 */
/*~struct~HelpListData:
 * 
 * @param HelpCommandName
 * @text コマンド名
 * @desc コマンド名を設定します。リストにない場合は直接記入します。（リスト1のみ）
 * @type combo[]
 * @option 'アイテム'
 * @option 'スキル'
 * @option '装備'
 * @option 'ステータス'
 * @option 'オプション'
 * @option '並び替え'
 * @option 'セーブ'
 * @option 'ゲーム終了'
 * @default
 * 
 * @param HelpCommandText
 * @text コマンドの説明文
 * @desc コマンドの説明文を設定します。
 * @type string
 * @default 
 * 
 */
/*~struct~StatusListData:
 *
 * @param DateSelect
 * @text 表示するステータス
 * @desc 表示するステータスを指定します。
 * @type select
 * @option なし
 * @value 0
 * @option アクター名(1)(2)(3)(4)(5)(6)
 * @value 1
 * @option 二つ名(1)(2)(3)(4)(5)(6)
 * @value 2
 * @option 職業(1)(2)(3)(4)(5)(6)
 * @value 3
 * @option レベル(1)(2)(3)(4)(5)
 * @value 4
 * @option ステート(1)(2)(3)(4)(5)
 * @value 5
 * @option 独自パラメータ(1)(2)(3)(4)(5)(6)(7)
 * @value 6
 * @option ＨＰ(1)(2)(3)(4)
 * @value 11
 * @option ＭＰ(1)(2)(3)(4)
 * @value 12
 * @option ＴＰ(1)(2)(3)(4)
 * @value 13
 * @option 経験値(1)(2)(3)(4)
 * @value 15
 * @option ライン(1)(2)(3)(4)(5)
 * @value 1000
 * @default 0
 * 
 * @param X_Position
 * @text X表示列位置(1)
 * @desc X表示列位置
 * @type number
 * @default 1
 * @min 1
 * @max 1
 * 
 * @param Y_Position
 * @desc Y表示行位置
 * @text Y表示行位置(2)
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * 
 * @param X_Coordinate
 * @text X座標（相対）(3)
 * @desc X座標（X表示列位置からの相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param Y_Coordinate
 * @text Y座標（相対）(4)
 * @desc Y座標（Y表示列位置からの相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param ItemWidth
 * @desc 項目横幅（0でデフォルト幅）
 * @text 項目横幅(5)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param Align
 * @desc 文字揃え。
 * @text 文字揃え(6)
 * @type select
 * @option 左
 * @value 'left'
 * @option 右
 * @value 'right'
 * @option 中央
 * @value 'center'
 * @default 'left'
 * 
 * @param DetaEval
 * @desc 評価式。
 * @text 評価式(javaScript)(7)
 * @type combo[]
 * @option 
 * @default 
 *
 */
/*~struct~InfoListData:
 *
 * @param DateSelect
 * @text 表示する項目
 * @desc 表示する項目を指定します。
 * @type select
 * @option なし
 * @value 0
 * @option プレイ時間(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)
 * @value 1
 * @option 所持金(1)(2)(3)(4)(5)(6)(7)(8)(11)
 * @value 2
 * @option 現在地(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)
 * @value 3
 * @option 独自パラメータ(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)
 * @value 4
 * @option 名称のみ(1)(2)(3)(4)(5)(7)(8)(10)(11)
 * @value 5
 * @option メニューコマンド説明(1)(2)(3)(4)(5)(7)(8)
 * @value 6
 * @default 0
 * 
 * @param X_Position
 * @text X表示列位置(1)
 * @desc X表示列位置
 * @type number
 * @default 1
 * @min 1
 * @max 4
 * 
 * @param Y_Position
 * @desc Y表示行位置
 * @text Y表示行位置(2)
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * 
 * @param X_Coordinate
 * @text X座標（相対）(3)
 * @desc X座標（X表示列位置からの相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param Y_Coordinate
 * @text Y座標（相対）(4)
 * @desc Y座標（Y表示列位置からの相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param ItemWidth
 * @desc 項目横幅（0でデフォルト幅）
 * @text 項目横幅(5)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param SystemItemWidth
 * @desc システム項目の横幅（0でデフォルト幅）
 * @text システム項目横幅(6)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param NameColor
 * @desc システム項目の文字色。テキストタブでカラーコードを入力できます。
 * @text システム項目文字色(7)
 * @type number
 * @default 16
 * @min 0
 * 
 * @param ParamName
 * @desc 項目の名称を設定します。
 * @text 名称(8)
 * @type string
 * @default
 * 
 * @param DetaEval
 * @desc 評価式。
 * @text 評価式(javaScript)(9)
 * @type combo[]
 * @option '$gameParty.steps();//歩数'
 * @option '$gameSystem.battleCount();//戦闘回数'
 * @option '$gameSystem.escapeCount();//逃走回数'
 * @option '$gameSystem.saveCount();//セーブ回数'
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option '$gameSystem.chronus().getDateFormat(1);//ゲーム内時間の導入プラグイン日時フォーマット1'
 * @option '$gameSystem.chronus().getDateFormat(2);//ゲーム内時間の導入プラグイン日時フォーマット2'
 * @default 
 * 
 * @param Align
 * @desc 文字揃え。
 * @text 文字揃え(10)
 * @type select
 * @option 左
 * @value 'left'
 * @option 右
 * @value 'right'
 * @option 中央
 * @value 'center'
 * @default 'right'
 * 
 * @param InfoIcon
 * @text アイコンID(11)
 * @desc アイコンID
 * @type number
 * @default 0
 * @max 999999
 * @min 0
 * 
 *
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
 * @desc アクターの画像を表示します。立ち絵を切り替える場合はリストに画像を設定してください。
 * @type file[]
 * @dir img/
 * @default 
 * 
 * @param Actor_X
 * @desc 画像のX座標。
 * @text 画像X座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Actor_Y
 * @desc 画像のY座標。
 * @text 画像Y座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Img_SX
 * @desc 画像の表示開始座標X。
 * @text 画像表示開始座標X
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Img_SY
 * @desc 画像の表示開始座標Y
 * @text 画像表示開始座標Y
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
 * @param ActorBackImg
 * @desc アクターの背景画像ファイル名を指定します。
 * @text アクターの背景画像
 * @type file[]
 * @dir img/
 * @default 
 * 
 * @param ActorFrontImg
 * @desc アクターの前面画像ファイル名を指定します。
 * @text アクターの前面画像
 * @type file[]
 * @dir img/
 * @default 
 * 
 */
/*~struct~ActorPictureDataList:
 * 
 * @param actorId
 * @text アクター
 * @desc アクターを指定します。
 * @type actor
 * 
 * @param Actor_X
 * @desc 画像のX座標。
 * @text 画像X座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Actor_Y
 * @desc 画像のY座標。
 * @text 画像Y座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Img_SX
 * @desc 画像の表示開始座標X。
 * @text 画像表示開始座標X
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Img_SY
 * @desc 画像の表示開始座標Y
 * @text 画像表示開始座標Y
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
 * @param ActorBackImg
 * @desc アクターの背景画像ファイル名を指定します。
 * @text アクターの背景画像
 * @type file[]
 * @dir img/
 * @default 
 * 
 * @param ActorFrontImg
 * @desc アクターの前面画像ファイル名を指定します。
 * @text アクターの前面画像
 * @type file[]
 * @dir img/
 * @default 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_MenuScreen_2 = true;

(() => {
const parameters = PluginManager.parameters('NUUN_MenuScreen_2');
const MenuCols = Number(parameters['MenuCols'] || 4);
const MenuRows = Number(parameters['MenuRows'] || 1);
const CommandCols = Number(parameters['CommandCols'] || 4);
const CommandRows = Number(parameters['CommandRows'] || 2);
const InfoCols = Number(parameters['InfoCols'] || 3);
const InfoRows = Number(parameters['InfoRows'] || 2);
const ExpDisplayMode = Number(parameters['ExpDisplayMode'] || 1);
const BackGroundImg = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['BackGroundImg'])) : null);
const BackUiWidth = eval(parameters['BackUiWidth'] || "true");
const WindowVisible = eval(parameters['WindowVisible'] || "true");
const ActorPictureEXApp = eval(parameters['ActorPictureEXApp'] || "true");
const LabelShow = eval(parameters['LabelShow'] || "true");
const HPGaugeWidth = Number(parameters['HPGaugeWidth'] || 128);
const MPGaugeWidth = Number(parameters['MPGaugeWidth'] || 128);
const TPGaugeWidth = Number(parameters['TPGaugeWidth'] || 128);
const ExpGaugeWidth = Number(parameters['ExpGaugeWidth'] || 128);
const EXPDecimal = Number(parameters['EXPDecimal'] || 2);
const InfoFontSize = Number(parameters['InfoFontSize'] || 0);
const ExpGaugeColor1 = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ExpGaugeColor1'])) : 18);
const ExpGaugeColor2 = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ExpGaugeColor2'])) : 18);
const StatusList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['StatusList'])) : null) || [];
const InfoList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['InfoList'])) : null) || [];
const HelpList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['HelpList'])) : null) || [];
const ActorsImgList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ActorsImgList'])) : null) || [];
const ActorPictureData = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ActorPictureData'])) : null) || [];
let gaugeType = null;

Scene_Menu.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();
    this.createStatusWindow();
    this.createInfoWindow();
};

Scene_Menu.prototype.commandWindowRect = function() {
    const ww = this.mainCommandWidth();
    const wh = this.mainCommandAreaHeight();
    const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
    const wy = this.mainAreaTop();
    return new Rectangle(wx, wy, ww, wh);
};

const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    _Scene_Menu_createCommandWindow.call(this);
    if (!WindowVisible) {
        this._commandWindow.opacity = 0;
    }
};

Scene_Menu.prototype.createInfoWindow = function() {
    const rect = this.infoWindowRect();
    this._infoMenuWindow = new Window_InfoMenu(rect);
    this.addWindow(this._infoMenuWindow);
    if (!WindowVisible) {
        this._infoMenuWindow.opacity = 0;
    }
};

const _Scene_Menu_createStatusWindow = Scene_Menu.prototype.createStatusWindow;
Scene_Menu.prototype.createStatusWindow = function() {
    _Scene_Menu_createStatusWindow.call(this);
    if (!WindowVisible) {
        this._statusWindow.opacity = 0;
    }
};

Scene_Menu.prototype.statusWindowRect = function() {
    const ww = this.mainCommandWidth();
    const wh = this.mainAreaHeight() - this.infoAreaHeight() - this.mainCommandAreaHeight();
    const wx = 0;
    const wy = this.menuHelpAreaHeight() + this.mainCommandAreaHeight();
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Menu.prototype.infoWindowRect = function() {
    const wx = 0;
    const wy = this._statusWindow.height + this._statusWindow.y;
    const ww = Graphics.boxWidth;
    const wh = this.infoAreaHeight();
    return new Rectangle(wx, wy, ww, wh);
};

const _Scene_Menu_createBackground = Scene_Menu.prototype.createBackground;
Scene_Menu.prototype.createBackground = function() {
  _Scene_Menu_createBackground.call(this);
  if (BackGroundImg[0]) {
    const sprite = new Sprite();
    sprite.bitmap = ImageManager.nuun_LoadPictures(BackGroundImg[0]);
    this.addChild(sprite);
    if (sprite.bitmap && !sprite.bitmap.isReady()) {
      sprite.bitmap.addLoadListener(this.setBackGround.bind(this, sprite));
    } else {
      this.setBackGround(sprite);
    }
  }
};

Scene_Menu.prototype.setBackGround = function(sprite) {
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

Scene_Menu.prototype.mainCommandWidth = function() {
    return Graphics.boxWidth;
};

Scene_Menu.prototype.mainCommandAreaHeight = function() {
    return this.calcWindowHeight(CommandRows, true);
};

Scene_Menu.prototype.infoAreaHeight = function() {
    return this.calcWindowHeight(InfoRows, (InfoRows === 1));
};

Scene_Menu.prototype.menuHelpAreaHeight = function() {
    return this.mainAreaTop();
};

const _Scene_Menu_update = Scene_Menu.prototype.update;
Scene_Menu.prototype.update = function() {
	_Scene_Menu_update.call(this);
    const find = HelpList.find(data => data.HelpCommandName[0] === this._commandWindow.currentData().name);
    const text = find && find.HelpCommandText ? find.HelpCommandText : "";
    this._infoMenuWindow.setText(text);
};


Window_MenuCommand.prototype.numVisibleRows = function() {
    return CommandRows;
};

Window_MenuCommand.prototype.maxCols = function() {
    return CommandCols;
};


const _Window_MenuStatus_initialize = Window_MenuStatus.prototype.initialize;
Window_MenuStatus.prototype.initialize = function(rect) {
    _Window_MenuStatus_initialize.call(this, rect);
    this.loadActorImages()
};

Window_MenuStatus.prototype.loadActorImages = function() {
    for (const actor of $gameParty.members()) {
        if (Imported.NUUN_ActorPicture && ActorPictureEXApp) {
            actor.resetImgId();
            actor.loadActorGraphic();
            actor.loadActorFace();
            const data = this.battlreActorPicture(actor.actorId());
            if (data.ActorBackImg && data.ActorBackImg[0]) {
                ImageManager.nuun_LoadPictures(data.ActorBackImg[0]);
            }
            if (data.ActorFrontImg && data.ActorFrontImg[0]) {
                ImageManager.nuun_LoadPictures(data.ActorFrontImg[0]);
            }
        }
    }
};

Window_MenuStatus.prototype.numVisibleRows = function() {
    return MenuRows;
};

Window_MenuStatus.prototype.maxCols = function() {
    return MenuCols;
};

Window_MenuStatus.prototype.maxContentsCols = function() {
    return 1;
};

Window_MenuStatus.prototype.itemContentsWidth = function(width) {
    return Math.floor(width / this.maxContentsCols()) - this.colSpacing() - 4;
};

Window_MenuStatus.prototype.drawItemBackground = function(index) {
    const actor = this.actor(index);
    const data = Imported.NUUN_ActorPicture && ActorPictureEXApp ? this.battlreActorPicture(actor.actorId()) : this.getActorImgData(actor);
    if (data && data.ActorBackImg && data.ActorBackImg[0]) {
        const bitmap = ImageManager.nuun_LoadPictures(data.ActorBackImg[0]);
        if (bitmap && !bitmap.isReady()) {
            bitmap.addLoadListener(this.drawActorBack.bind(this, bitmap, index));
        } else {
            this.drawActorBack(bitmap, index);
        }
    } else {
        Window_Selectable.prototype.drawItemBackground.call(this, index);
    }
};

Window_MenuStatus.prototype.drawActorBack = function(bitmap, index) {
    const rect = this.itemRect(index);
    this.contentsBack.blt(bitmap, 0, 0, rect.width, rect.height, rect.x + 1, rect.y + 1, rect.width - 2, rect.height - 2);
};

const _Window_MenuStatus_drawItemImage = Window_MenuStatus.prototype.drawItemImage;
Window_MenuStatus.prototype.drawItemImage = function(index) {
    const actor = this.actor(index);
    let data = null;
    if (Imported.NUUN_ActorPicture && ActorPictureEXApp) {
        bitmap = actor.getActorGraphicData() ? ImageManager.nuun_LoadPictures(actor.getActorGraphicImg()) : null;
        data = this.battlreActorPicture(actor.actorId());
    } else {
        data = this.getActorImgData(actor);
        bitmap = data && data.ActorImg && data.ActorImg[0] ? ImageManager.nuun_LoadPictures(data.ActorImg[0]) : null;
    }
    if (bitmap) {
        if (!bitmap.isReady()) {
            bitmap.addLoadListener(this.drawActorGraphic.bind(this, actor, data, bitmap, index));
        } else {
            this.drawActorGraphic(actor, data, bitmap, index);
        }
    } else {
        _Window_MenuStatus_drawItemImage.call(this, index);
    }
};

Window_MenuStatus.prototype.drawActorFace = function(actor, x, y, width, height) {
    let data = null;
    if (Imported.NUUN_ActorPicture && ActorPictureEXApp) {
        data = this.battlreActorPicture(actor.actorId());
        this.drawFace(actor.getActorGraphicFace(), actor.getActorGraphicFaceIndex(), x + data.Actor_X, y + data.Actor_Y, width, height);
    } else {
        data = this.getActorImgData(actor);
        Window_StatusBase.prototype.drawActorFace.call(this, actor, x + data.Actor_X, y + data.Actor_Y, width, height)
    }
};

Window_MenuStatus.prototype.drawActorFace = function(actor, x, y, width, height) {
    if (Imported.NUUN_ActorPicture && ActorPictureEXApp) {
        this.drawFace(actor.getActorGraphicFace(), actor.getActorGraphicFaceIndex(), x, y, width, height);
    } else {
        _Window_StatusBase_drawActorFace.call(this, actor, x, y, width, height);
    }
};

Window_MenuStatus.prototype.getActorImgData = function(actor) {
    return ActorsImgList.find(actorImg => actorImg.actorId === actor.actorId());
};

Window_MenuStatus.prototype.drawItemStatus = function(index) {
    const actor = this.actor(index);
    const rect = this.itemRect(index);
    const itemWidth = this.itemContentsWidth(rect.width);
    const lineHeight = this.lineHeight();
    const colSpacing = this.colSpacing();
    for (const data of StatusList) {
      const x_Position = data.X_Position;
      const position = Math.min(x_Position, this.maxContentsCols());
      const contentsX = rect.x + (itemWidth + colSpacing) * (position - 1) + data.X_Coordinate + colSpacing;
      const contentsY = rect.y + lineHeight * (data.Y_Position - 1) + data.Y_Coordinate;
      width2 = data.ItemWidth && data.ItemWidth > 0 ? data.ItemWidth : itemWidth;
      this.drawContentsBase(data, contentsX, contentsY, width2 - colSpacing / 2, actor);
    }
};

Window_MenuStatus.prototype.drawActorGraphic = function(actor, data, bitmap, index) {
    this.changePaintOpacity(actor.isBattleMember());
    const rect = this.itemRect(index);
    let x = data.Actor_X + rect.x;
    const sx = data.Img_SX || 0;
    const sy = data.Img_SY || 0;
    const scale = (data.Actor_Scale || 100) / 100;
    const scale2 = 1.0 + (1.0 - scale);
    const dw = Math.floor(rect.width * scale2);
    const dh = Math.floor(rect.height * scale2);
    const y = data.Actor_Y + Math.max(rect.height - Math.floor(bitmap.height * scale), 0) + rect.y;
    this.contents.blt(bitmap, sx, sy, dw, dh, x + 1, y + 1, rect.width - 2, rect.height - 2);
    this.changePaintOpacity(true);
    const frontBitmap = data.ActorFrontImg && data.ActorFrontImg[0] ? ImageManager.nuun_LoadPictures(data.ActorFrontImg[0]) : null;
    if (frontBitmap && !frontBitmap.isReady()) {
        frontBitmap.addLoadListener(this.drawActorFront.bind(this, frontBitmap, rect.x, rect.y, rect.width, rect.height));
    } else {
        this.drawActorFront(frontBitmap, x, y, rect.width, rect.height);
    }
};

Window_MenuStatus.prototype.drawActorFront = function(bitmap, x, y, width, height) {
    this.contents.blt(bitmap, 0, 0, width, height, x, y);
};


Window_MenuStatus.prototype.battlreActorPicture = function(id) {
    const actors = ActorPictureData;
    const find = actors.find(actor => actor.actorId === id);
    if (!find) {
      return {Actor_X: 0, Actor_Y: 0, Img_SX: 0, Img_SY: 0, Actor_Scale: 100, ActorBackImg: [],ActorFrontImg: []};
    }
    return find;
};

Window_MenuStatus.prototype.drawContentsBase = function(data, x, y, width, actor) {
    switch (data.DateSelect) {
    case 0:
        break;
    case 1:
        this.drawActorName(data, x, y, width, actor);
        break;
    case 2:
        this.drawActorNickname(data, x, y, width, actor);
        break;
    case 3:
        this.drawActorClass(data, x, y, width, actor);
        break;
    case 4:
        this.drawActorLevel(data, x, y, width, actor);
        break;
    case 5:
        this.drawActorIcons(x, y, width, actor);
        break;
    case 6:
        this.drawParam(data, x, y, width, actor);
        break;
    case 11:
        this.placeHpGauge(x, y, actor);
        break;
    case 12:
        this.placeMpGauge(x, y, actor);
        break;
    case 13:
        this.placeTpGauge(x, y, actor);
        break;
    case 15:
        this.placeExpGauge(x, y, actor);
        break;
    case 1000:
        this.horzLine(x, y, width, actor);
        break;
    }
};

Window_MenuStatus.prototype.drawActorName = function(data, x, y, width, actor) {
    this.changeTextColor(ColorManager.hpColor(actor));
    this.drawText(actor.name(), x, y, width, data.Align);
};

Window_MenuStatus.prototype.drawActorClass = function(data, x, y, width, actor) {
    this.resetTextColor();
    this.drawText(actor.currentClass().name, x, y, width, data.Align);
};

Window_MenuStatus.prototype.drawActorNickname = function(data, x, y, width, actor) {
    this.resetTextColor();
    this.drawText(actor.nickname(), x, y, width, data.Align);
};

Window_MenuStatus.prototype.drawActorLevel = function(data, x, y, width, actor) {
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(TextManager.levelA, x, y, 48);
    this.resetTextColor();
    this.drawText(actor.level, x + 60, y, width - 60, "right");
};

Window_MenuStatus.prototype.drawActorIcons = function(x, y, width, actor) {
    const iconWidth = ImageManager.iconWidth;
    const icons = actor.allIcons().slice(0, Math.floor(width / iconWidth));
    let iconX = x;
    for (const icon of icons) {
        this.drawIcon(icon, iconX, y + 2);
        iconX += iconWidth;
    }
};

Window_InfoMenu.prototype.drawParam = function(data, x, y, width, actor) {
    this.changeTextColor(NuunManager.getColorCode(data.NameColor));
    const nameText = data.ParamName ? data.ParamName : '';
    const textWidth = data.Align === 'left' && data.SystemItemWidth === 0? this.textWidth(nameText) : this.systemWidth(data.SystemItemWidth, width);
    this.drawText(nameText, x + iconWidth, y, textWidth);
    this.resetTextColor();
    if (data.DetaEval[0]) {
        this.drawText(eval(data.DetaEval[0]), x + textWidth + 8 + iconWidth, y, width - (textWidth + 8 + iconWidth), data.Align);
    }
};

Window_MenuStatus.prototype.placeHpGauge = function(x, y, actor) {
    this.placeGauge(actor, "hp", x, y);
};

Window_MenuStatus.prototype.placeMpGauge = function(x, y, actor) {
    this.placeGauge(actor, "mp", x, y);
};

Window_MenuStatus.prototype.placeTpGauge = function(x, y, actor) {
    if ($dataSystem.optDisplayTp) {
        this.placeGauge(actor, "tp", x, y);
    }
};

Window_MenuStatus.prototype.placeExpGauge = function(x, y, actor) {
    this.placeGauge(actor, "menuexp", x, y);
};

Window_MenuStatus.prototype.placeGauge = function(actor, type, x, y) {
    gaugeType = type;
    if (Imported.NUUN_GaugeImage) {
        this.placeGaugeImg(actor, type, x, y);
    }
    const key = "actor%1-gauge-%2".format(actor.actorId(), type);
    const sprite = this.createInnerSprite(key, Sprite_MenuGauge);
    sprite.setup(actor, type);
    sprite.move(x, y);
    sprite.show();
};


function Window_InfoMenu() {
    this.initialize(...arguments);
}

Window_InfoMenu.prototype = Object.create(Window_Selectable.prototype);
Window_InfoMenu.prototype.constructor = Window_InfoMenu;

Window_InfoMenu.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._text = '';
    this.refresh();
};

Window_InfoMenu.prototype.maxCols = function() {
    return InfoCols;
};

Window_InfoMenu.prototype.refresh = function() {
    this.contents.clear();
    const list = InfoList;
    const lineHeight = this.lineHeight();
    this.contents.fontSize = $gameSystem.mainFontSize() + InfoFontSize;
    for (const data of list) {
        const x_Position = data.X_Position;
        const position = Math.min(x_Position, this.maxCols());
        const rect = this.itemRect(position - 1);
        const x = rect.x + (data.X_Coordinate + data.X_Position);
        const y = (data.Y_Position - 1) * lineHeight + rect.y + data.Y_Coordinate;
        const width = data.ItemWidth && data.ItemWidth > 0 ? data.ItemWidth : rect.width;
        this.dateDisplay(data, x, y, width);
    }
    this.contents.fontSize = $gameSystem.mainFontSize();
};

Window_InfoMenu.prototype.dateDisplay = function(data, x, y, width) {
    switch (data.DateSelect) {
    case 0:
        break;
    case 1:
        this.drawPlayTime(data, x, y, width);
        break;
    case 2:
        this.drawGold(data, x, y, width);
        break;
    case 3:
        this.drawLocation(data, x, y, width);
        break;
    case 4:
        this.drawParam(data, x, y, width);
        break;
    case 5:
        this.drawName(data, x, y, width);
        break;
    case 6:
        this.drawCommandExplanation(data, x, y, width);
        break;
      default:
        break;
    }
};

Window_InfoMenu.prototype.drawGold = function(data, x, y, width) {
    let iconWidth = 0;
    if (data.InfoIcon > 0) {
        this.drawIcon(data.InfoIcon, x, y + 2);
        iconWidth = ImageManager.iconWidth + 6;
    }
    this.changeTextColor(this.getColorCode(data.NameColor));
    const nameText = data.ParamName ? data.ParamName : '';
    const textWidth = data.SystemItemWidth === 0? this.textWidth(nameText) : this.systemWidth(data.SystemItemWidth, width);
    this.drawText(nameText, x + iconWidth, y, textWidth);
    this.resetTextColor();
    this.drawCurrencyValue(this.value(), this.currencyUnit(), x + textWidth + 8 + iconWidth, y, width - (textWidth + 8 + iconWidth));
};

Window_InfoMenu.prototype.drawPlayTime = function(data, x, y, width) {
    let iconWidth = 0;
    if (data.InfoIcon > 0) {
        this.drawIcon(data.InfoIcon, x, y + 2);
        iconWidth = ImageManager.iconWidth + 6;
    }
    this.changeTextColor(this.getColorCode(data.NameColor));
    const nameText = data.ParamName ? data.ParamName : '';
    const textWidth = data.Align === 'left' && data.SystemItemWidth === 0? this.textWidth(nameText) : this.systemWidth(data.SystemItemWidth, width);
    this.drawText(nameText, x + iconWidth, y, textWidth);
    this.resetTextColor();
    this.drawText($gameSystem.playtimeText(), x + textWidth + 8 + iconWidth, y, width - (textWidth + 8 + iconWidth), data.Align);
};

Window_InfoMenu.prototype.drawLocation = function(data, x, y, width) {
    let iconWidth = 0;
    if (data.InfoIcon > 0) {
        this.drawIcon(data.InfoIcon, x, y + 2);
        iconWidth = ImageManager.iconWidth + 6;
    }
    this.changeTextColor(this.getColorCode(data.NameColor));
    const nameText = data.ParamName ? data.ParamName : '';
    const textWidth = data.Align === 'left' && data.SystemItemWidth === 0? this.textWidth(nameText) : this.systemWidth(data.SystemItemWidth, width);
    this.drawText(nameText, x + iconWidth, y, textWidth);
    this.resetTextColor();
    this.drawText($gameMap.displayName(), x + textWidth + 8 + iconWidth, y, width - (textWidth + 8 + iconWidth), data.Align);
};

Window_InfoMenu.prototype.drawParam = function(data, x, y, width) {
    let iconWidth = 0;
    if (data.InfoIcon > 0) {
        this.drawIcon(data.InfoIcon, x, y + 2);
        iconWidth = ImageManager.iconWidth + 6;
    }
    this.changeTextColor(this.getColorCode(data.NameColor));
    const nameText = data.ParamName ? data.ParamName : '';
    const textWidth = data.Align === 'left' && data.SystemItemWidth === 0? this.textWidth(nameText) : this.systemWidth(data.SystemItemWidth, width);
    this.drawText(nameText, x + iconWidth, y, textWidth);
    this.resetTextColor();
    if (data.DetaEval[0]) {
        this.drawText(eval(data.DetaEval[0]), x + textWidth + 8 + iconWidth, y, width - (textWidth + 8 + iconWidth), data.Align);
    }
};

Window_InfoMenu.prototype.drawCommandExplanation = function(data, x, y, width) {
    this.drawTextEx(this._text, x, y, width);
};

Window_InfoMenu.prototype.drawName = function(data, x, y, width) {
    this.changeTextColor(this.getColorCode(data.NameColor));
    const nameText = data.ParamName ? data.ParamName : '';
    this.drawText(nameText, x, y, width, data.Align);
};

Window_InfoMenu.prototype.systemWidth = function(swidth, width) {
    return swidth > 0 ? swidth : 120;
};

Window_InfoMenu.prototype.getColorCode = function(color) {
    if (typeof(color) === "string") {
      return color;
    }
    return ColorManager.textColor(color);
};

Window_InfoMenu.prototype.value = function() {
    return $gameParty.gold();
};

Window_InfoMenu.prototype.currencyUnit = function() {
    return TextManager.currencyUnit;
};

Window_InfoMenu.prototype.setText = function(str) {
    this._text = str;
    this.refresh();
};

function Sprite_MenuGauge() {
    this.initialize(...arguments);
}

Sprite_MenuGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_MenuGauge.prototype.constructor = Sprite_MenuGauge;
  
Sprite_MenuGauge.prototype.initialize = function() {
    Sprite_Gauge.prototype.initialize.call(this);
};
  
Sprite_MenuGauge.prototype.bitmapWidth = function() {
    this._statusType = this._statusType || gaugeType;
    if (this._statusType === 'hp') {
        return HPGaugeWidth;
    } else if (this._statusType === 'mp') {
        return MPGaugeWidth;
    } else if (this._statusType === 'tp') {
        return TPGaugeWidth;
    } else if (this._statusType === 'menuexp') {
        return ExpGaugeWidth;
    }
};

Sprite_MenuGauge.prototype.gaugeColor1 = function() {
    switch (this._statusType) {
        case "menuexp":
            return NuunManager.getColorCode(ExpGaugeColor1);
        default:
            return Sprite_Gauge.prototype.gaugeColor1.call(this);
    }
};

Sprite_MenuGauge.prototype.gaugeColor2 = function() {
    switch (this._statusType) {
        case "menuexp":
            return NuunManager.getColorCode(ExpGaugeColor2);
        default:
            return Sprite_Gauge.prototype.gaugeColor2.call(this);
    }
};

Sprite_MenuGauge.prototype.displyaExp = function() {
    if (ExpDisplayMode === 1) {
        return this.currentMaxValue() - this.currentValue();
    } else if (ExpDisplayMode === 2) {
        return this.currentValue();
    } else if (ExpDisplayMode === 3) {
        return NuunManager.numPercentage(this.currentValue() / this.currentMaxValue(), EXPDecimal, true) * 100;
    }
    return this._battler.currentExp() - this._battler.currentLevelExp();
};

Sprite_MenuGauge.prototype.displyaMaxExp = function() {
    return this._battler.nextLevelExp() - this._battler.currentLevelExp();
};

const _Sprite_Gauge_currentValue = Sprite_Gauge.prototype.currentValue;
Sprite_Gauge.prototype.currentValue = function() {
    if (this._battler && this._statusType === "menuexp") {
        return this._battler.currentExp() - this._battler.currentLevelExp();
    }
    return  _Sprite_Gauge_currentValue.call(this);
};

const _Sprite_Gauge_currentMaxValue = Sprite_Gauge.prototype.currentMaxValue;
Sprite_Gauge.prototype.currentMaxValue = function() {
    if (this._battler && this._statusType === "menuexp") {
        return this._battler.nextLevelExp() - this._battler.currentLevelExp();
    }
    return _Sprite_Gauge_currentMaxValue.call(this);
};

const _Sprite_Gauge_label = Sprite_Gauge.prototype.label;
Sprite_Gauge.prototype.label = function() {
    if (this._statusType === "menuexp") {
        return LabelShow ? TextManager.expA : '';
    }
    return _Sprite_Gauge_label.call(this);
};

Sprite_MenuGauge.prototype.drawValue = function() {
    if (this._statusType === "menuexp" && ExpDisplayMode !== 0) {
        let text = this.displyaExp();
        if (ExpDisplayMode === 3) {
            text += '%';
        }
        const width = this.bitmapWidth();
        const height = this.textHeight();
        this.setupValueFont();
        this.bitmap.drawText(text, 0, 0, width, height, "right");
    } else {
        Sprite_Gauge.prototype.drawValue.call(this);
    }
};

})();