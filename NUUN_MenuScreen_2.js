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
 * @version 1.6.3
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * メニュー画面の表示を変更、拡張します。
 * メニューコマンドの表示を上部に配置しアクターの表示を横一列にします。
 * 
 * メニュー画面に表示できる項目はカスタマイズすることができます。
 * 
 * 当プラグインは、立ち絵、顔グラ表示EXに対応しています。
 * 立ち絵表示EX用画像設定で設定しなくても立ち絵は表示されます。
 * 立ち絵表示EX適用をOFFにすることで立ち絵、顔グラ表示EX導入時でも、このプラグインの立ち絵設定が適用されます。
 * アクターの顔グラ、立ち絵、キャラチップはアクター画像基本X座標、アクター画像基本Y座標で設定できます。
 * また個別に設定する場合は各アクター画像設定の画像X座標、画像Y座標で設定します。
 * 画像のアクターが表示されている部分を中央に表示させたい場合は各アクター画像設定の画像表示開始座標X、画像表示開始座標Y
 * で設定します。
 * 
 * 表示ステータスの取得パラメータ
 * actor:アクターのゲームデータ
 * 
 * 独自ゲージ
 * 現在値：評価式で設定
 * 最大値：最大値評価式で設定
 * ゲージ横幅：項目、ゲージ横幅で設定
 * ゲージの識別IDは必ず設定してください。IDは任意の文字列を入力します。重複しないよう注意してください。
 * 
 * 背景画像1
 * IDはマップのタグまたはプラグインコマンドで設定します。
 * マップの設定のメモ欄
 * <MenuBackgroundId:[id]> メニュー背景を背景画像リスト[id]番の画像を表示します。
 * <MenuBackground:[url]> メニュー背景を[url]の画像を表示します。パスはimg/[url].pngです。
 * 例：<MenuBackground:titles1/Bigtree>
 * なお上記のタグよりもプラグインパラメータで設定した背景が優先されます。0番指定の時はデフォルトの背景が表示されます。
 * タグの[id]、[url]は[]ごと数値または文字列に置き換えてください。
 * 
 * 背景画像2
 * 背景画像1の手前に重ねて表示されます。
 * メニューUIの背景として使用します。
 * ゲーム中、背景画像1を変更しない場合は、メニュー背景を背景画像2で設定しても問題ありません。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * Ver.1.1.0以降ではNUUN_Base Ver.1.4.1以降が必要となります。
 * 
 * 更新履歴
 * 2022/6/10 Ver.1.2.3
 * ステータス独自パラメータで名称を無記入した場合、パラメータが右にずれる問題を修正。
 * 2022/6/7 Ver.1.6.2
 * 一部プラグインでの競合対策。
 * 2022/6/5 Ver.1.6.1
 * ステータスの独自パラメータの名称の座標が正常に適用されていなかった問題を修正。
 * 2022/6/4 Ver.1.6.0
 * 行動目標を表示できる機能を追加。（要メニュー画面行動目標表示プラグイン）
 * 2022/5/29 Ver.1.5.1
 * マップごとに背景を変更できる機能を追加。
 * 背景画像を変更するプラグインコマンドを追加。
 * 背景画像を２層構造に変更。
 * 2022/5/28 Ver.1.5.0
 * 表示できるステータスに独自のゲージを追加できる機能を追加。
 * 2022/5/22 Ver.1.4.1
 * ステータスの独自パラメータが適用されない問題を修正。
 * ステータスに経験値（ゲージなし）を追加。
 * 2022/5/17 Ver.1.4.0
 * キャラチップを表示できる機能を追加。
 * アクターの画像を顔グラ、キャラチップ、画像から選択する方式に変更。
 * 2022/5/11 Ver.1.3.0
 * ステータス欄の各項目にフォントサイズを設定できる機能を追加。
 * インフォウィンドウにフリーテキストを追加。
 * 2022/4/10 Ver.1.2.1
 * 誤字修正。
 * 2022/4/10 Ver.1.2.0
 * アクター表示の項目に通常能力値、追加能力値、特殊能力値を設定できる機能を追加。
 * 顔グラモードでアクター前面画像が表示されない問題を修正。
 * アクター表示画像表示関係の処理を修正。
 * 画面上、コマンド下にインフォウィンドウを表示できる機能を追加。
 * 各アクターの表示領域内に項目表示が収まるように修正。
 * アイテム、スキルで味方選択時の画面をメニュー画面の表示と同じになるように修正。
 * バージョンアップによりプリセットを変更。
 * 2022/1/23 Ver.1.1.1
 * 立ち絵、顔グラEXを導入せず、顔グラを表示させるとエラーが出る問題を修正。
 * 顔グラの座標設定の仕様を変更。
 * 2022/1/9 Ver.1.1.0
 * ステータス項目の表示の文字揃えを指定できる機能を追加。
 * ステータス項目に経験値を追加。
 * インフォウィンドウの文字サイズを指定できる機能を追加。
 * 2021/12/29 Ver.1.0.0
 * 初版
 * 
 * @command ChangeBackgroundId
 * @desc メニュー画面の背景画像IDを変更します。0でデフォルトの背景が表示されます。
 * @text 背景画像ID変更
 * 
 * @arg backgroundId
 * @type number
 * @default 0
 * @text 背景画像リストID
 * @desc 背景画像リストを指定します。0でデフォルトの画像が表示されます。
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
 * @param DecimalMode
 * @text 端数処理四捨五入
 * @desc 表示外小数点を四捨五入で丸める。（falseで切り捨て）
 * @type boolean
 * @default true
 * @parent Setting
 * 
 * @param BackGroundSetting
 * @text 背景設定
 * @default ------------------------------
 * 
 * @param BackGroundImges
 * @desc 背景画像ファイル名を指定します。
 * @text 背景画像１
 * @type file[]
 * @dir img/
 * @default 
 * @parent BackGroundSetting
 * 
 * @param BackUiWidth1
 * @text 背景画像１背景サイズをUIに合わせる
 * @desc 背景画像１の背景サイズをUIに合わせる。
 * @type boolean
 * @default true
 * @parent BackGroundSetting
 * 
 * @param BackGroundImg
 * @desc 背景画像１の手前に表示する背景画像ファイル名を指定します。
 * @text 背景画像２
 * @type file
 * @dir img/
 * @default 
 * @parent BackGroundSetting
 * 
 * @param BackUiWidth
 * @text 背景画像２背景サイズをUIに合わせる
 * @desc 背景画像２の背景サイズをUIに合わせる。
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
 * @default ["{\"DateSelect\":\"1\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\"}","{\"DateSelect\":\"4\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"128\",\"Align\":\"'left'\",\"DetaEval\":\"\"}","{\"DateSelect\":\"5\",\"X_Position\":\"1\",\"Y_Position\":\"3\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"10\",\"ItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\"}","{\"DateSelect\":\"3\",\"NameColor\":\"16\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"6\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"14\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\"}","{\"DateSelect\":\"11\",\"NameColor\":\"16\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"9\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"-56\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\"}","{\"DateSelect\":\"12\",\"NameColor\":\"16\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"9\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"-28\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\"}","{\"DateSelect\":\"13\",\"NameColor\":\"16\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"9\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\"}"]
 * @parent StatusSetting
 * 
 * @param HPGaugeWidth
 * @text HPゲージ横幅
 * @desc HPゲージの横幅を指定します。
 * @type number
 * @default 200
 * @min 0
 * @parent StatusSetting
 * 
 * @param MPGaugeWidth
 * @text MPゲージ横幅
 * @desc MPゲージの横幅を指定します。
 * @type number
 * @default 200
 * @min 0
 * @parent StatusSetting
 * 
 * @param TPGaugeWidth
 * @text TPゲージ横幅
 * @desc TPゲージの横幅を指定します。
 * @type number
 * @default 200
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
 * @default 200
 * @min 0
 * @parent Expgauge
 * 
 * @param ExpGaugeColor1
 * @desc 経験値のゲージのシステムカラーID１（左）
 * @text 経験値ゲージ色１
 * @type number
 * @default 17
 * @min 0
 * @parent Expgauge
 * 
 * @param ExpGaugeColor2
 * @desc 経験値のゲージのシステムカラーID２（右）
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
 * @param HelpList
 * @desc ヘルプ項目設定
 * @text ヘルプ項目設定
 * @type struct<HelpListData>[]
 * @default ["{\"HelpCommandName\":\"'アイテム'\",\"HelpCommandText\":\"所持しているアイテムを表示します。\"}","{\"HelpCommandName\":\"'スキル'\",\"HelpCommandText\":\"スキルを表示します。\"}","{\"HelpCommandName\":\"'装備'\",\"HelpCommandText\":\"装備を変更します。\"}","{\"HelpCommandName\":\"'ステータス'\",\"HelpCommandText\":\"アクターのステータスを表示します。\"}","{\"HelpCommandName\":\"'オプション'\",\"HelpCommandText\":\"ゲームの設定を変更します。\"}","{\"HelpCommandName\":\"'並び替え'\",\"HelpCommandText\":\"メンバーの並び替えを行います。\"}","{\"HelpCommandName\":\"'セーブ'\",\"HelpCommandText\":\"データを記録します。\"}","{\"HelpCommandName\":\"'ゲーム終了'\",\"HelpCommandText\":\"ゲームを終了します。\"}"]
 * @parent InfoSetting
 * 
 * @param InfoHeaderSetting1
 * @text ヘッターインフォ設定
 * @default ------------------------------
 * @parent InfoSetting
 * 
 * @param InfoHeaderShow1
 * @text ヘッターインフォ表示
 * @desc 画面上にインフォウィンドウを表示します。
 * @type boolean
 * @default false
 * @parent InfoHeaderSetting1
 * 
 * @param InfoHeaderList1
 * @desc インフォ項目設定
 * @text インフォ項目設定
 * @type struct<InfoListData>[]
 * @default []
 * @parent InfoHeaderSetting1
 * 
 * @param InfoHeaderCols1
 * @text インフォの表示列
 * @desc インフォの表示する列。
 * @type number
 * @default 3
 * @min 1
 * @parent InfoHeaderSetting1
 * 
 * @param InfoHeaderRows1
 * @text インフォの表示行
 * @desc インフォの表示する行。
 * @type number
 * @default 1
 * @min 1
 * @parent InfoHeaderSetting1
 * 
 * @param InfoHeaderFontSize1
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ
 * @type number
 * @default 0
 * @min -99
 * @parent InfoHeaderSetting1
 * 
 * @param InfoHeaderSetting2
 * @text ヘッターインフォ設定
 * @default ------------------------------
 * @parent InfoSetting
 * 
 * @param InfoHeaderShow2
 * @text ヘッターインフォ表示
 * @desc メニューコマンド下にインフォウィンドウを表示します。
 * @type boolean
 * @default false
 * @parent InfoHeaderSetting2
 * 
 * @param InfoHeaderList2
 * @desc インフォ項目設定
 * @text インフォ項目設定
 * @type struct<InfoListData>[]
 * @default []
 * @parent InfoHeaderSetting2
 * 
 * @param InfoHeaderCols2
 * @text インフォの表示列
 * @desc インフォの表示する列。
 * @type number
 * @default 3
 * @min 1
 * @parent InfoHeaderSetting2
 * 
 * @param InfoHeaderRows2
 * @text インフォの表示行
 * @desc インフォの表示する行。
 * @type number
 * @default 1
 * @min 1
 * @parent InfoHeaderSetting2
 * 
 * @param InfoHeaderFontSize2
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ
 * @type number
 * @default 0
 * @min -99
 * @parent InfoHeaderSetting2
 * 
 * @param InfoFooterSetting
 * @text フッターインフォ設定
 * @default ------------------------------
 * @parent InfoSetting
 * 
 * @param InfoFooterShow
 * @text フッターインフォ表示
 * @desc 画面下にインフォウィンドウを表示します。
 * @type boolean
 * @default true
 * @parent InfoFooterSetting
 * 
 * @param InfoList
 * @desc インフォ項目設定
 * @text インフォ項目設定
 * @type struct<InfoListData>[]
 * @default ["{\"DateSelect\":\"3\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"NameColor\":\"16\",\"ParamName\":\"現在地\",\"DetaEval\":\"\",\"Align\":\"'right'\",\"InfoIcon\":\"0\"}","{\"DateSelect\":\"1\",\"X_Position\":\"2\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"NameColor\":\"16\",\"ParamName\":\"プレイ時間\",\"DetaEval\":\"\",\"Align\":\"'right'\",\"InfoIcon\":\"0\"}","{\"DateSelect\":\"6\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"Align\":\"'right'\",\"InfoIcon\":\"0\"}"]
 * @parent InfoFooterSetting
 * 
 * @param InfoCols
 * @text インフォの表示列
 * @desc インフォの表示する列。
 * @type number
 * @default 2
 * @min 1
 * @parent InfoFooterSetting
 * 
 * @param InfoRows
 * @text インフォの表示行
 * @desc インフォの表示する行。
 * @type number
 * @default 2
 * @min 1
 * @parent InfoFooterSetting
 * 
 * @param InfoFontSize
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ
 * @type number
 * @default -2
 * @min -99
 * @parent InfoFooterSetting
 * 
 * @param InfoSideSetting
 * @text サイド設定
 * @default ------------------------------
 * @parent InfoSetting
 * 
 * @param InfoSideShow
 * @text フッターインフォ表示
 * @desc 画面下にインフォウィンドウを表示します。フッターインフォ表示時のみ表示されます。
 * @type boolean
 * @default true
 * @parent InfoSideSetting
 * 
 * @param InfoSideList
 * @desc インフォ項目設定
 * @text インフォ項目設定
 * @type struct<InfoListData>[]
 * @default ["{\"DateSelect\":\"5\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"NameColor\":\"16\",\"ParamName\":\"所持金\",\"DetaEval\":\"\",\"Align\":\"'left'\",\"InfoIcon\":\"0\"}","{\"DateSelect\":\"2\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"1\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"Align\":\"'right'\",\"InfoIcon\":\"0\"}"]
 * @parent InfoSideSetting
 * 
 * @param InfoSideFontSize
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ
 * @type number
 * @default 0
 * @min -99
 * @parent InfoSideSetting
 * 
 * @param ActorSetting
 * @text アクター設定
 * @default ------------------------------
 * 
 * @param GraphicMode
 * @desc 表示するアクター画像を指定します。
 * @text 表示アクター画像
 * @type select
 * @option 顔グラ
 * @value 'face'
 * @option 画像
 * @value 'img'
 * @option キャラチップ
 * @value 'charachip'
 * @default 'face'
 * @parent ActorSetting
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
 * @param ActorImg_X
 * @text アクター画像基本X座標
 * @desc アクター画像の基本X座標(顔グラのみ)
 * @type number
 * @max 9999
 * @min -9999
 * @default 0
 * @parent ActorSetting
 * 
 * @param ActorImg_Y
 * @text アクター画像基本Y座標
 * @desc アクター画像の基本Y座標(顔グラのみ)
 * @type number
 * @max 9999
 * @min -9999
 * @default 0
 * @parent ActorSetting
 * 
 */
/*~struct~HelpListData:
 * 
 * @param HelpCommandName
 * @text コマンド名
 * @desc コマンド名を設定します。リストにない場合は直接記入します。
 * @type combo
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
 * @desc コマンドの説明文を設定します。制御文字使用可能です。
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
 * @option アクター名(1)(3)(4)(5)(6)(7)(9)(13)
 * @value 1
 * @option 二つ名(1)(3)(4)(5)(6)(7)(9)(13)
 * @value 2
 * @option 職業(1)(3)(4)(5)(6)(7)(9)(13)
 * @value 3
 * @option レベル(1)(3)(4)(5)(6)(7)(13)
 * @value 4
 * @option ステート(3)(4)(5)(6)(7)
 * @value 5
 * @option 独自パラメータ(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)
 * @value 6
 * @option ＨＰ(3)(4)(5)(6)(7)(21)
 * @value 11
 * @option ＭＰ(3)(4)(5)(6)(7)(21)
 * @value 12
 * @option ＴＰ(3)(4)(5)(6)(7)(21)
 * @value 13
 * @option 経験値(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)
 * @value 14
 * @option 経験値（ゲージあり）(1)(2)(3)(4)(5)(6)(7)(21)
 * @value 15
 * @option 攻撃力(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)
 * @value 22
 * @option 防御力(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)
 * @value 23
 * @option 魔法力(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)
 * @value 24
 * @option 魔法防御(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)
 * @value 25
 * @option 敏捷性(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)
 * @value 26
 * @option 運(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)
 * @value 27
 * @option 命中率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 30
 * @option 回避率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 31
 * @option 会心率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 32
 * @option 会心回避率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 33
 * @option 魔法回避率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 34
 * @option 魔法反射率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 35
 * @option 反撃率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 36
 * @option HP再生率(1)(2)(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 37
 * @option MP再生率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 38
 * @option TP再生率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 39
 * @option 狙われ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 40
 * @option 防御効果率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 41
 * @option 回復効果率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 42
 * @option 薬の知識(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 43
 * @option MP消費率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 44
 * @option TPチャージ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 45
 * @option 物理ダメージ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 46
 * @option 魔法ダメージ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 47
 * @option 床ダメージ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 48
 * @option 獲得経験値率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 49
 * @option 独自ゲージ(3)(4)(5)(6)(7)(10)(20)(21)(22)(23)(24)
 * @value 100
 * @option ライン(1)(2)(3)(4)(5)(6)(7)
 * @value 1000
 * @default 0
 * 
 * @param NameColor
 * @desc システム項目のシステムカラーID。テキストタブでカラーコードを入力できます。
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
 * @param X_Position
 * @text X表示列位置(3)
 * @desc X表示列位置
 * @type number
 * @default 1
 * @min 1
 * @max 1
 * 
 * @param Y_Position
 * @desc Y表示行位置
 * @text Y表示行位置(4)
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * 
 * @param X_Coordinate
 * @text X座標（相対）(5)
 * @desc X座標（X表示列位置からの相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param Y_Coordinate
 * @text Y座標（相対）(6)
 * @desc Y座標（Y表示列位置からの相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param ItemWidth
 * @desc 項目、ゲージ横幅（0でデフォルト幅）
 * @text 項目、ゲージ横幅(7)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param SystemItemWidth
 * @desc システム項目の横幅（0でデフォルト幅）
 * @text システム項目横幅(8)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param Align
 * @desc 文字揃え。
 * @text 文字揃え(9)
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
 * @text 評価式(javaScript)(10)
 * @type combo
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option 'actor;//アクターのゲームデータ'
 * @option 'actor.actor();//アクターのシステムデータ'
 * @default 
 * 
 * @param paramUnit
 * @desc 単位を設定します。
 * @text 単位(11)
 * @type string
 * @default 
 * 
 * @param Decimal
 * @text 小数点桁数(12)
 * @desc 表示出来る小数点桁数。
 * @type number
 * @default 0
 * @min 0
 * @max 99
 * 
 * @param FontSize
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ(13)
 * @type number
 * @default 0
 * @min -99
 * 
 * @param GaugeSetting
 * @text ゲージ設定
 * @default ------------------------------
 * 
 * @param GaugeID
 * @desc 独自ゲージ識別ID。
 * @text 識別ID(20)
 * @type string
 * @default 
 * @parent GaugeSetting
 * 
 * @param GaugeHeight
 * @desc ゲージの縦幅を指定します。
 * @text ゲージの縦幅(21)
 * @type number
 * @default 12
 * @min 0
 * @max 24
 * @parent GaugeSetting
 * 
 * @param DetaEval2
 * @desc 最大値の評価式。
 * @text 最大値評価式(javaScript)(22)
 * @type combo
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option 'actor;//アクターのゲームデータ'
 * @option 'actor.actor();//アクターのシステムデータ'
 * @default 
 * @parent GaugeSetting
 * 
 * @param Color1
 * @desc ゲージのシステムカラーID(左)。テキストタブでカラーコードを入力できます。
 * @text ゲージカラー(左)(23)
 * @type number
 * @default 0
 * @min 0
 * @parent GaugeSetting
 * 
 * @param Color2
 * @desc ゲージのシステムカラーID(右)。テキストタブでカラーコードを入力できます。
 * @text ゲージカラー(右)(24)
 * @type number
 * @default 0
 * @min 0
 * @parent GaugeSetting
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
 * @option フリーテキスト(1)(2)(3)(4)(12)
 * @value 10
 * @option 行動目標（要メニュー画面行動目標表示）(1)(2)(3)(4)(6)(7)(8)(11)
 * @value 11
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
 * @type combo
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
 * @param Text
 * @desc フリーテキストのテキストを記入します。(制御文字使用可能)
 * @text フリーテキストのテキスト(12)
 * @type multiline_string
 * @default
 *
 */
/*~struct~actorImgList:
 * 
 * @param actorId
 * @text アクター
 * @desc アクターを指定します。
 * @type actor
 * 
 * @param GraphicMode
 * @desc 表示するアクター画像を指定します。
 * @text 個別表示アクター画像
 * @type select
 * @option 顔グラ
 * @value 'face'
 * @option 画像
 * @value 'img'
 * @option キャラチップ
 * @value 'charachip'
 * @option 表示アクター画像での設定
 * @value 'default'
 * @default 'default'
 * 
 * @param ActorImg
 * @text アクター画像
 * @desc アクターの画像を表示します。立ち絵を切り替える場合はリストに画像を設定してください。(顔グラ表示OFF)
 * @type file
 * @dir img/
 * @default 
 * 
 * @param FaceImg
 * @text 顔グラ画像
 * @desc 顔グラ画像のスプライトシートを設定します。(顔グラ表示ON)
 * @type file
 * @dir img/faces
 * 
 * @param FaceIndex
 * @desc 顔グラのインデックスID。
 * @text 顔グラインデックスID
 * @type number
 * @default -1
 * @min -1
 * @max 9999
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
 * @type file
 * @dir img/
 * @default 
 * 
 * @param ActorFrontImg
 * @desc アクターの前面画像ファイル名を指定します。
 * @text アクターの前面画像
 * @type file
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
 * @param GraphicMode
 * @desc 表示するアクター画像を指定します。
 * @text 個別表示アクター画像
 * @type select
 * @option 顔グラ
 * @value 'face'
 * @option 画像
 * @value 'img'
 * @option キャラチップ
 * @value 'charachip'
 * @option 表示アクター画像での設定
 * @value 'default'
 * @default 'default'
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
 * @type file
 * @dir img/
 * @default 
 * 
 * @param ActorFrontImg
 * @desc アクターの前面画像ファイル名を指定します。
 * @text アクターの前面画像
 * @type file
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
const ExpDisplayMode = Number(parameters['ExpDisplayMode'] || 1);
const DecimalMode = eval(parameters['DecimalMode'] || "true");
const BackGroundImg = String(parameters['BackGroundImg']);
const BackGroundImges = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['BackGroundImges'])) : null) || [];
const BackUiWidth1 = eval(parameters['BackUiWidth1'] || "true");
const BackUiWidth = eval(parameters['BackUiWidth'] || "true");
const WindowVisible = eval(parameters['WindowVisible'] || "true");
const ActorPictureEXApp = eval(parameters['ActorPictureEXApp'] || "true");
const LabelShow = eval(parameters['LabelShow'] || "true");
const OrgHPGaugeWidth = Number(parameters['HPGaugeWidth'] || 200);
const OrgMPGaugeWidth = Number(parameters['MPGaugeWidth'] || 200);
const OrgTPGaugeWidth = Number(parameters['TPGaugeWidth'] || 200);
const OrgExpGaugeWidth = Number(parameters['ExpGaugeWidth'] || 200);
const EXPDecimal = Number(parameters['EXPDecimal'] || 2);
const ActorImg_X = Number(parameters['ActorImg_X'] || 0);
const ActorImg_Y = Number(parameters['ActorImg_Y'] || 0);
const ExpGaugeColor1 = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ExpGaugeColor1'])) : 18);
const ExpGaugeColor2 = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ExpGaugeColor2'])) : 18);
const StatusList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['StatusList'])) : null) || [];
const ActorsImgList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ActorsImgList'])) : null) || [];
const ActorPictureData = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ActorPictureData'])) : null) || [];
const GraphicMode = eval(parameters['GraphicMode']) || 'face';

const HelpList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['HelpList'])) : null) || [];
const InfoHeaderShow1 = eval(parameters['InfoHeaderShow1'] || "false");
const InfoHeaderList1 = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['InfoHeaderList1'])) : null) || [];
const InfoHeaderCols1 = Number(parameters['InfoHeaderCols1'] || 1);
const InfoHeaderRows1 = Number(parameters['InfoHeaderRows1'] || 1);
const InfoHeaderFontSize1 = Number(parameters['InfoHeaderFontSize1'] || 0);

const InfoHeaderShow2 = eval(parameters['InfoHeaderShow2'] || "false");
const InfoHeaderList2 = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['InfoHeaderList2'])) : null) || [];
const InfoHeaderCols2 = Number(parameters['InfoHeaderCols2'] || 1);
const InfoHeaderRows2 = Number(parameters['InfoHeaderRows2'] || 1);
const InfoHeaderFontSize2 = Number(parameters['InfoHeaderFontSize2'] || 0);

const InfoFooterShow = eval(parameters['InfoFooterShow'] || "true");
const InfoList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['InfoList'])) : null) || [];
const InfoCols = Number(parameters['InfoCols'] || 3);
const InfoRows = Number(parameters['InfoRows'] || 2);
const InfoFontSize = Number(parameters['InfoFontSize'] || 0);

const InfoSideShow = eval(parameters['InfoSideShow'] || "false");
const InfoSideList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['InfoSideList'])) : null) || [];

let HPGaugeWidth = OrgHPGaugeWidth;
let MPGaugeWidth = OrgMPGaugeWidth;
let TPGaugeWidth = OrgTPGaugeWidth;
let ExpGaugeWidth = OrgExpGaugeWidth;

const InfoSideFontSize = Number(parameters['InfoSideFontSize'] || 0);

let menuTextMode = null;
let menuAlign = null;

const pluginName = "NUUN_MenuScreen_2";

PluginManager.registerCommand(pluginName, 'ChangeBackgroundId', args => {
    $gameSystem.menuBackgroundId = Number(args.backgroundId);
});

Scene_ItemBase.prototype.actorWindowRect = function() {//再定義
    return Scene_Menu.prototype.statusWindowRect(this);//今後のバージョンアップで独自の画面に編集可能
};

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
    const wy = this.mainAreaTop() + (InfoHeaderShow1 ? this.infoAreaHeight(InfoHeaderRows1) : 0);
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
    if (InfoHeaderShow1) {
        this.createInfoHeader1Window();
    }
    if (InfoHeaderShow2) {
        this.createInfoHeader2Window();
    }
    if (InfoFooterShow) {
        this.createInfoFooterWindow();
    }
    if (InfoFooterShow && InfoSideShow) {
        this.createInfoSideWindow();
    }
};

Scene_Menu.prototype.createInfoHeader1Window = function() {
    const rect = this.infoWindowHeader1Rect();
    this._infoHeader1MenuWindow = new Window_InfoHeader1(rect);
    this.addWindow(this._infoHeader1MenuWindow);
    if (!WindowVisible) {
        this._infoHeader1MenuWindow.opacity = 0;
    }
};

Scene_Menu.prototype.createInfoHeader2Window = function() {
    const rect = this.infoWindowHeader2Rect();
    this._infoHeader2MenuWindow = new Window_InfoHeader2(rect);
    this.addWindow(this._infoHeader2MenuWindow);
    if (!WindowVisible) {
        this._infoHeader2MenuWindow.opacity = 0;
    }
};

Scene_Menu.prototype.createInfoFooterWindow = function() {
    const rect = this.infoWindowRect();
    this._infoMenuWindow = new Window_InfoFooter(rect);
    this.addWindow(this._infoMenuWindow);
    if (!WindowVisible) {
        this._infoMenuWindow.opacity = 0;
    }
};

Scene_Menu.prototype.createInfoSideWindow = function() {
    const rect = this.infoWindowSideRect();
    this._infoSideMenuWindow = new Window_InfoSide(rect);
    this.addWindow(this._infoSideMenuWindow);
    if (!WindowVisible) {
        this._infoSideMenuWindow.opacity = 0;
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
    const headerHeight = (InfoHeaderShow1 ? this.infoAreaHeight(InfoHeaderRows1) : 0) + (InfoHeaderShow2 ? this.infoAreaHeight(InfoHeaderRows2) : 0);
    const ww = this.mainCommandWidth();
    const wh = this.mainAreaHeight() - this.mainCommandAreaHeight() - headerHeight - (InfoFooterShow ? this.infoAreaHeight(InfoRows) : 0);
    const wx = 0;
    const wy = this.menuHelpAreaHeight() + this.mainCommandAreaHeight() + headerHeight;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Menu.prototype.infoWindowHeader1Rect = function() {
    const wx = 0;
    const wy = this.menuHelpAreaHeight();
    const ww = Graphics.boxWidth;
    const wh = this.infoAreaHeight(InfoHeaderRows1);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Menu.prototype.infoWindowHeader2Rect = function() {
    const wx = 0;
    const wy = this.menuHelpAreaHeight() + this.mainCommandAreaHeight() + (InfoHeaderShow1 ? this._infoHeader1MenuWindow.height : 0);
    const ww = Graphics.boxWidth;
    const wh = this.infoAreaHeight(InfoHeaderRows2);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Menu.prototype.infoWindowRect = function() {
    const wx = 0;
    const wh = this.infoAreaHeight(InfoRows);
    const wy = Graphics.boxHeight - wh;
    const ww = Graphics.boxWidth - (InfoSideShow ? 240 : 0);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Menu.prototype.infoWindowSideRect = function() {
    const ww = 240;
    const wh = this.infoAreaHeight(InfoRows);
    const wx = Graphics.boxWidth - ww;
    const wy = Graphics.boxHeight - wh;
    return new Rectangle(wx, wy, ww, wh);
};

const _Scene_Menu_createBackground = Scene_Menu.prototype.createBackground;
Scene_Menu.prototype.createBackground = function() {
    _Scene_Menu_createBackground.call(this);
    if (!$gameSystem.menuBackgroundId) {
        $gameSystem.menuBackgroundId = 0;
    }
    const data = $dataMap;
    const backgroundId = $gameSystem.menuBackgroundId > 0 ? $gameSystem.menuBackgroundId : ($dataMap && $dataMap.meta.MenuBackgroundId ? Number(data.meta.MenuBackgroundId) : $gameSystem.menuBackgroundId);
    const img = BackGroundImges ? BackGroundImges[backgroundId - 1] : null;
    if (img) {
        const sprite = new Sprite();
        sprite.bitmap = ImageManager.nuun_LoadPictures(img);
        this.addChild(sprite);
        if (sprite.bitmap && !sprite.bitmap.isReady()) {
            sprite.bitmap.addLoadListener(this.setBackGround.bind(this, sprite));
        } else {
            this.setBackGround(sprite, BackUiWidth1);
        }
    }
    if (BackGroundImg) {
        const sprite = new Sprite();
        sprite.bitmap = ImageManager.nuun_LoadPictures(BackGroundImg);
        this.addChild(sprite);
        if (sprite.bitmap && !sprite.bitmap.isReady()) {
            sprite.bitmap.addLoadListener(this.setBackGround.bind(this, sprite));
        } else {
            this.setBackGround(sprite, BackUiWidth);
        }
    }
};

Scene_Menu.prototype.setBackGround = function(sprite, mode) {
    if (mode) {
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

Scene_Menu.prototype.infoAreaHeight = function(rows) {
    return this.calcWindowHeight(rows, (rows === 1));
};

Scene_Menu.prototype.menuHelpAreaHeight = function() {
    return this.mainAreaTop();
};

const _Scene_Menu_update = Scene_Menu.prototype.update;
Scene_Menu.prototype.update = function() {
	_Scene_Menu_update.call(this);
    const find = HelpList.find(data => data.HelpCommandName === this._commandWindow.currentData().name);
    const text = find && find.HelpCommandText ? find.HelpCommandText : "";
    if (InfoHeaderShow1) {
        this._infoHeader1MenuWindow.setText(text)
    }
    if (InfoHeaderShow2) {
        this._infoHeader2MenuWindow.setText(text)
    }
    if (InfoFooterShow) {
        this._infoMenuWindow.setText(text);
    }
    if (InfoFooterShow && InfoSideShow) {
        this._infoSideMenuWindow.setText(text);
    }
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
    this.loadActorImages();
    this.setGaugeWidth();
};

Window_MenuStatus.prototype.setGaugeWidth = function() {
    const width = this.itemRect(0).width;
    HPGaugeWidth = Math.min(OrgHPGaugeWidth, width - this.itemPadding() * 2);
    MPGaugeWidth = Math.min(OrgMPGaugeWidth, width - this.itemPadding() * 2);
    TPGaugeWidth = Math.min(OrgTPGaugeWidth, width - this.itemPadding() * 2);
    ExpGaugeWidth = Math.min(OrgExpGaugeWidth, width - this.itemPadding() * 2);
};

Window_MenuStatus.prototype.loadActorImages = function() {
    for (const actor of $gameParty.members()) {
        let data = null;
        if (Imported.NUUN_ActorPicture && ActorPictureEXApp) {
            actor.resetImgId();
            data = this.battlreActorPicture(actor.actorId());
            if (data.GraphicMode === 'img') {
                actor.loadActorGraphic();
            } else if (data.GraphicMode === 'charachip') {
                ImageManager.loadCharacter(actor.characterName());
            } else {
                actor.loadActorFace();
            }
        } else {
            data = this.getActorImgData(actor.actorId());
            if (data.GraphicMode === 'img') {
                ImageManager.nuun_LoadPictures(data.ActorImg);
            } else if (data.GraphicMode === 'charachip') {
                ImageManager.loadCharacter(actor.characterName());
            } else {
                ImageManager.loadFace(data.FaceImg);
            }
        }
        if (data && data.ActorBackImg) {
            ImageManager.nuun_LoadPictures(data.ActorBackImg);
        }
        if (data && data.ActorFrontImg) {
            ImageManager.nuun_LoadPictures(data.ActorFrontImg);
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
    const data = Imported.NUUN_ActorPicture && ActorPictureEXApp ? this.battlreActorPicture(actor.actorId()) : this.getActorImgData(actor.actorId());
    if (data && data.ActorBackImg) {
        const bitmap = ImageManager.nuun_LoadPictures(data.ActorBackImg);
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
      const contentsY = rect.y + lineHeight * (data.Y_Position - 1) + data.Y_Coordinate + this.itemPadding();
      width2 = data.ItemWidth && data.ItemWidth > 0 ? Math.min(data.ItemWidth, itemWidth) : itemWidth;
      this.drawContentsBase(data, contentsX, contentsY, width2 - colSpacing / 2, actor);
    }
};

const _Window_MenuStatus_drawItemImage = Window_MenuStatus.prototype.drawItemImage;
Window_MenuStatus.prototype.drawItemImage = function(index) {
    const actor = this.actor(index);
    const bitmap = this.getActorLoadBitmap(actor);
    if (bitmap && !bitmap.isReady()) {
        bitmap.addLoadListener(this.drawActorGraphic.bind(this, actor, bitmap, index));
    } else {
        this.drawActorGraphic(actor, bitmap, index);
    }
};

Window_MenuStatus.prototype.drawActorGraphic = function(actor, bitmap, index) {
    const data = this.getActorData(actor);
    const rect = this.itemRect(index);
    this.changePaintOpacity(actor.isBattleMember());
    if (!data || data.GraphicMode === 'face') {
        this.contentsDrawActorFace(actor, rect.x, rect.y, rect.width, rect.height);
    } else if (data.GraphicMode === 'charachip') {
        this.contentsDrawActorChip(actor, rect.x + data.Actor_X + ActorImg_X, rect.y + data.Actor_Y + ActorImg_Y, rect.width, rect.height);
    } else {
        this.contentsDrawActorGraphic(actor, data, bitmap, rect.x, rect.y, rect.width, rect.height);
    }
    this.changePaintOpacity(true);
    const frontBitmapImg = data ? data.ActorFrontImg : null;
    if (frontBitmapImg) {
        const frontBitmap = ImageManager.nuun_LoadPictures(frontBitmapImg);
        if (!frontBitmap.isReady()) {
            frontBitmap.addLoadListener(this.drawActorFront.bind(this, frontBitmap, rect.x, rect.y, rect.width, rect.height));
        } else {
            this.drawActorFront(frontBitmap, rect.x, rect.y, rect.width, rect.height);
        }
    }
};

Window_MenuStatus.prototype.contentsDrawActorFace = function(actor, x, y, width, height) {
    width = Math.min(width - 2, ImageManager.faceWidth);
    height = height - 2;
    this.drawActorFace(actor, x, y, width, height);
};

Window_MenuStatus.prototype.contentsDrawActorGraphic = function(actor, data, bitmap, x, y, width, height) {
    width = Math.min(width - 2, bitmap.width);
    height = Math.min(height - 2, bitmap.height);
    const scale = (data.Actor_Scale || 100) / 100;
    const sw = width * scale;
    const sh = height * scale;
    const sx = data.Img_SX || 0;
    const sy = data.Img_SY || 0;
    x += 1 + data.Actor_X + ActorImg_X;
    y += 1 + data.Actor_Y + ActorImg_Y;
    this.contents.blt(bitmap, sx, sy, width + (width - sw), height + (height - sh), x, y, width, height);
};

Window_MenuStatus.prototype.drawActorFace = function(actor, x, y, width, height, data) {
    x += (data ? data.Actor_X : 0) + ActorImg_X + 1;
    y += (data ? data.Actor_Y : 0) + ActorImg_Y + 1;
    if (Imported.NUUN_ActorPicture && ActorPictureEXApp) {
        this.drawFace(actor.getActorGraphicFace(), actor.getActorGraphicFaceIndex(), x, y, width, height);
    } else {
        let bitmap = null;
        if (data && data.FaceImg) {
            bitmap = data.FaceImg;
        } else {
            bitmap = actor.faceName();
        }
        const faceIndex = data && data.FaceIndex >= 0 ? data.FaceIndex : actor.faceIndex();
        this.drawFace(bitmap, faceIndex, x, y, width, height);
    }
};

Window_MenuStatus.prototype.drawActorFront = function(bitmap, x, y, width, height) {
    this.contents.blt(bitmap, 0, 0, width, height, x, y);
};

Window_MenuStatus.prototype.contentsDrawActorChip = function(actor, x, y, width, height) {
    this.drawActorCharacter(actor, x + 24, y + 48);
};

Window_MenuStatus.prototype.getActorImgData = function(actorId) {
    const actors = ActorsImgList;
    const find = actors.find(actor => actor.actorId === actorId);
    if (!find) {
      return {Actor_X: 0, Actor_Y: 0, Img_SX: 0, Img_SY: 0, Actor_Scale: 100, ActorBackImg: null,ActorFrontImg: null, GraphicMode: GraphicMode, FaceIndex : -1};
    } if (find.GraphicMode === 'default' || !find.GraphicMode) {
        find.GraphicMode = GraphicMode;
    }
    return find;
    //return ActorsImgList.find(actorImg => actorImg.actorId === actorId);
};

Window_MenuStatus.prototype.battlreActorPicture = function(id) {
    const actors = ActorPictureData;
    const find = actors.find(actor => actor.actorId === id);
    if (!find) {
        return {Actor_X: 0, Actor_Y: 0, Img_SX: 0, Img_SY: 0, Actor_Scale: 100, ActorBackImg: null,ActorFrontImg: null, GraphicMode: GraphicMode, FaceIndex : -1};
      } else if (find.GraphicMode === 'default' || !find.GraphicMode) {
          find.GraphicMode = GraphicMode;
      }
    return find;
};

Window_MenuStatus.prototype.getActorData = function(actor) {
    return Imported.NUUN_ActorPicture && ActorPictureEXApp ? this.battlreActorPicture(actor.actorId()) : this.getActorImgData(actor.actorId());
};

Window_MenuStatus.prototype.getActorLoadBitmap = function(actor) {
    const data = this.getActorData(actor);
    if (data) {
        if (Imported.NUUN_ActorPicture && ActorPictureEXApp) {
            if (data.GraphicMode === 'face') {
                return actor.loadActorFace();
            } else if (data.GraphicMode === 'img') {
                return actor.loadActorGraphic();
            }
            return null;
        } else {
            if (data.GraphicMode === 'face') {
                const imges = data.FaceImg ? data.FaceImg : actor.faceName();
                return ImageManager.loadFace(imges);
            } else if (data.GraphicMode === 'img') {
                return ImageManager.nuun_LoadPictures(data.ActorImg);
            }
            return null;
        }
    } else {
        return ImageManager.loadFace(actor.faceName());
    }
};

Window_MenuStatus.prototype.drawContentsBase = function(data, x, y, width, actor) {
    $gameTemp.menuParam = null;
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
        $gameTemp.menuParam = data;
        this.placeHpGauge(x, y, actor);
        break;
    case 12:
        $gameTemp.menuParam = data;
        this.placeMpGauge(x, y, actor);
        break;
    case 13:
        $gameTemp.menuParam = data;
        this.placeTpGauge(x, y, actor);
        break;
    case 14:
        this.drawExp(data, x, y, width, actor);
        break;
    case 15:
        $gameTemp.menuParam = data;
        this.placeExpGauge(x, y, actor);
        break;
    case 22:
    case 23:
    case 24:
    case 25:
    case 26:
    case 27:
        this.drawParams(data, data.DateSelect, x, y, width, actor);
        break;
    case 30:
    case 31:
    case 32:
    case 33:
    case 34:
    case 35:
    case 36:
    case 37:
    case 38:
    case 39:
        this.drawXParams(data, data.DateSelect, x, y, width, actor);
        break;
    case 40:
    case 41:
    case 42:
    case 43:
    case 44:
    case 45:
    case 46:
    case 47:
    case 48:
    case 49:
        this.drawSParams(data, data.DateSelect, x, y, width, actor);
        break;
    case 100:
        $gameTemp.menuParam = data;
        this.placeUserGauge(data, x, y, actor);
        break;
    case 101:
        break;
    case 102:
        break;
    case 1000:
        this.horzLine(x, y, width, actor);
        break;
    }
};

Window_MenuStatus.prototype.paramNameData = function(data, actor, params) {
    if (data.ParamName) {
      return data.ParamName;
    }
    switch (params) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        return TextManager.param(params);
      case 10:
      case 11:
        return TextManager.param(params - 2);
      case 12:
        return "会心率";
      case 13:
        return "会心回避率";
      case 14:
        return "魔法回避率";
      case 15:
        return "魔法反射率";
      case 16:
        return "反撃率";
      case 17:
        return "HP再生率";
      case 18:
        return "MP再生率";
      case 19:
        return "TP再生率";
      case 20:
        return "狙われ率";
      case 21:
        return "防御効果率";
      case 22:
        return "回復効果率";
      case 23:
        return "薬の知識";
      case 24:
        return "MP消費率";
      case 25:
        return "TPチャージ率";
      case 26:
        return "物理ダメージ率";
      case 27:
        return "魔法ダメージ率";
      case 28:
        return "床ダメージ率";
      case 29:
        return "獲得経験率";
      case 42:
        return TextManager.param(0);
      case 43:
        return TextManager.param(1);
      default:
        return null;
    }
  };
  
  Window_MenuStatus.prototype.paramData = function(data, actor, params) {
    switch (params) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        return actor.param(params);
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
        return actor.xparam(params - 10) * 100;
      case 20:
      case 21:
      case 22:
      case 23:
      case 24:
      case 25:
      case 26:
      case 27:
      case 28:
      case 29:
        return actor.sparam(params - 20) * 100;
      default:
        return null;
    }
};

Window_MenuStatus.prototype.drawParams = function(data, param, x, y, width, actor) {
    this.changeTextColor(NuunManager.getColorCode(data.NameColor));
    const nameText = this.paramNameData(data, actor, param - 20);
    this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
    const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? this.textWidth(nameText) : this.systemWidth(data.SystemItemWidth, width);
    this.drawText(nameText, x, y, textWidth);
    this.resetTextColor();
    const textParam = (data.DetaEval ? eval(data.DetaEval) : this.paramData(data, actor, param - 20)) + (data.paramUnit ? String(data.paramUnit) : "");
    this.drawText(textParam, x + textWidth + 8, y, width - (textWidth + 8), data.Align);
    this.contents.fontSize = $gameSystem.mainFontSize();
};

Window_MenuStatus.prototype.drawXParams = function(data, param, x, y, width, actor) {
    this.changeTextColor(NuunManager.getColorCode(data.NameColor));
    const nameText = this.paramNameData(data, actor, param - 20);
    this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
    const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? this.textWidth(nameText) : this.systemWidth(data.SystemItemWidth, width);
    this.drawText(nameText, x, y, textWidth);
    this.resetTextColor();
    let textParam = (data.DetaEval ? eval(data.DetaEval) : this.paramData(data, actor, param - 20));
    textParam = NuunManager.numPercentage(textParam, (data.Decimal - 2) || 0, DecimalMode);
    textParam += (data.paramUnit ? String(data.paramUnit) : "");
    this.drawText(textParam, x + textWidth + 8, y, width - (textWidth + 8), data.Align);
    this.contents.fontSize = $gameSystem.mainFontSize();
};

Window_MenuStatus.prototype.drawSParams = function(data, param, x, y, width, actor) {
    this.changeTextColor(NuunManager.getColorCode(data.NameColor));
    const nameText = this.paramNameData(data, actor, param - 20);
    this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
    const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? this.textWidth(nameText) : this.systemWidth(data.SystemItemWidth, width);
    this.drawText(nameText, x, y, textWidth);
    this.resetTextColor();
    let textParam = (data.DetaEval ? eval(data.DetaEval) : this.paramData(data, actor, param - 20));
    textParam = NuunManager.numPercentage(textParam, (data.Decimal - 2) || 0, DecimalMode);
    textParam += (data.paramUnit ? String(data.paramUnit) : "");
    this.drawText(textParam, x + textWidth + 8, y, width - (textWidth + 8), data.Align);
    this.contents.fontSize = $gameSystem.mainFontSize();
};

Window_MenuStatus.prototype.drawActorName = function(data, x, y, width, actor) {
    this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
    menuTextMode = 'name';
    menuAlign = data.Align;
    Window_StatusBase.prototype.drawActorName.call(this, actor, x, y, width);
    //this.changeTextColor(ColorManager.hpColor(actor));
    //this.drawText(actor.name(), x, y, width, data.Align);
    this.contents.fontSize = $gameSystem.mainFontSize();
};

Window_MenuStatus.prototype.drawText = function(text, x, y, maxWidth, align) {
    if (menuTextMode === 'name') {
        align = menuAlign;
        menuTextMode = null;
    }
    Window_Base.prototype.drawText.call(this, text, x, y, maxWidth, align);
};

Window_MenuStatus.prototype.drawActorClass = function(data, x, y, width, actor) {
    this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
    this.resetTextColor();
    this.drawText(actor.currentClass().name, x, y, width, data.Align);
    this.contents.fontSize = $gameSystem.mainFontSize();
};

Window_MenuStatus.prototype.drawActorNickname = function(data, x, y, width, actor) {
    this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
    this.resetTextColor();
    this.drawText(actor.nickname(), x, y, width, data.Align);
    this.contents.fontSize = $gameSystem.mainFontSize();
};

Window_MenuStatus.prototype.drawActorLevel = function(data, x, y, width, actor) {
    this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(TextManager.levelA, x, y, 48);
    this.resetTextColor();
    this.drawText(actor.level, x + 60, y, width - 60, "right");
    this.contents.fontSize = $gameSystem.mainFontSize();
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

Window_MenuStatus.prototype.drawParam = function(data, x, y, width, actor) {
    this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
    this.changeTextColor(NuunManager.getColorCode(data.NameColor));
    const nameText = data.ParamName ? data.ParamName : '';
    const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? this.textWidth(nameText) : this.systemWidth(data.SystemItemWidth, width);
    this.drawText(nameText, x + textWidth, y, textWidth);
    this.resetTextColor();
    if (data.DetaEval) {
        const padding = textWidth > 0 ? 8 : 0;
        this.drawText(eval(data.DetaEval), x + textWidth + padding, y, width - (textWidth + padding), data.Align);
    }
    this.contents.fontSize = $gameSystem.mainFontSize();
};

Window_MenuStatus.prototype.drawExp = function(data, x, y, width, actor) {
    this.changeTextColor(NuunManager.getColorCode(data.NameColor));
    const nameText = data.ParamName ? data.ParamName : 'NextLv';
    this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
    const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? this.textWidth(nameText) : this.systemWidth(data.SystemItemWidth, width);
    this.drawText(nameText, x + textWidth, y, textWidth);
    this.resetTextColor();
    let textParam = (data.DetaEval ? eval(data.DetaEval) : actor.nextLevelExp() - actor.currentLevelExp());
    this.drawText(textParam, x + textWidth + 8, y, width - (textWidth + 8), data.Align);
    this.contents.fontSize = $gameSystem.mainFontSize();
};

Window_MenuStatus.prototype.systemWidth = function(swidth, width) {
    return swidth > 0 ? swidth : Math.floor(width / 3);
};

Window_MenuStatus.prototype.placeHpGauge = function(x, y, actor) {
    $gameTemp.menuGaugeType = "hp";
    this.placeGauge(actor, "hp", x, y);
};

Window_MenuStatus.prototype.placeMpGauge = function(x, y, actor) {
    $gameTemp.menuGaugeType = "mp";
    this.placeGauge(actor, "mp", x, y);
};

Window_MenuStatus.prototype.placeTpGauge = function(x, y, actor) {
    if ($dataSystem.optDisplayTp) {
        $gameTemp.menuGaugeType = "tp";
        this.placeGauge(actor, "tp", x, y);
    }
};

Window_MenuStatus.prototype.placeExpGauge = function(x, y, actor) {
    $gameTemp.menuGaugeType = "menuexp";
    this.placeGauge(actor, "menuexp", x, y);
};

Window_MenuStatus.prototype.placeUserGauge = function(data, x, y, actor) {
    $gameTemp.menuGaugeType = data.GaugeID;
    this.placeGauge(actor, data.GaugeID, x, y);
};

Window_MenuStatus.prototype.placeGauge = function(actor, type, x, y) {
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

Window_InfoMenu.prototype.refresh = function() {
    this.contents.clear();
    const list = this.getInfoList();
    const lineHeight = this.lineHeight();
    this.contents.fontSize = $gameSystem.mainFontSize() + this.getFontSize();
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
    case 10:
        this.drawFreeText(data, x, y, width);
        break;
    case 11:
        this.drawDestination(data, x, y, width);
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
    const text = $gameMap.mapId() > 0 ? $gameMap.displayName() : '';
    this.drawText(text, x + textWidth + 8 + iconWidth, y, width - (textWidth + 8 + iconWidth), data.Align);
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
    if (data.DetaEval) {
        this.drawText(eval(data.DetaEval), x + textWidth + 8 + iconWidth, y, width - (textWidth + 8 + iconWidth), data.Align);
    }
};

Window_InfoMenu.prototype.drawCommandExplanation = function(data, x, y, width) {
    this.drawTextEx(this._text, x, y, width);
};

Window_InfoMenu.prototype.drawFreeText = function(data, x, y, width) {
    this.drawTextEx(data.Text, x, y, width);
};

Window_InfoMenu.prototype.drawDestination = function(data, x, y, width) {
    if (!Imported.NUUN_Destination) {
        return;
    }
    let iconWidth = 0;
    let textWidth = 0;
    if (data.InfoIcon > 0) {
        this.drawIcon(data.InfoIcon, x, y + 2);
        iconWidth = ImageManager.iconWidth + 6;
    }
    if (data.ParamName) {
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        const nameText = data.ParamName ? data.ParamName : '';
        this.drawText(nameText, x + iconWidth, y, textWidth);
        textWidth = this.systemWidth(data.SystemItemWidth, width);
    }
    this.resetTextColor();
    const text = this.getDestinationList();
    if (text) {
        this.drawTextEx(text, x + iconWidth + textWidth, y, width - textWidth - iconWidth);
    }
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


function Window_InfoHeader1() {
    this.initialize(...arguments);
}

Window_InfoHeader1.prototype = Object.create(Window_InfoMenu.prototype);
Window_InfoHeader1.prototype.constructor = Window_InfoHeader1;

Window_InfoHeader1.prototype.initialize = function(rect) {
    Window_InfoMenu.prototype.initialize.call(this, rect);
};

Window_InfoHeader1.prototype.maxCols = function() {
    return InfoHeaderCols1;
};

Window_InfoHeader1.prototype.getInfoList = function() {
    return InfoHeaderList1;
};

Window_InfoHeader1.prototype.getFontSize = function() {
    return InfoHeaderFontSize1;
};


function Window_InfoHeader2() {
    this.initialize(...arguments);
}

Window_InfoHeader2.prototype = Object.create(Window_InfoMenu.prototype);
Window_InfoHeader2.prototype.constructor = Window_InfoHeader2;

Window_InfoHeader2.prototype.initialize = function(rect) {
    Window_InfoMenu.prototype.initialize.call(this, rect);
};

Window_InfoHeader2.prototype.maxCols = function() {
    return InfoHeaderCols2;
};

Window_InfoHeader2.prototype.getInfoList = function() {
    return InfoHeaderList2;
};

Window_InfoHeader2.prototype.getFontSize = function() {
    return InfoHeaderFontSize2;
};


function Window_InfoFooter() {
    this.initialize(...arguments);
}

Window_InfoFooter.prototype = Object.create(Window_InfoMenu.prototype);
Window_InfoFooter.prototype.constructor = Window_InfoFooter;

Window_InfoFooter.prototype.initialize = function(rect) {
    Window_InfoMenu.prototype.initialize.call(this, rect);
};

Window_InfoFooter.prototype.maxCols = function() {
    return InfoCols;
};

Window_InfoFooter.prototype.getInfoList = function() {
    return InfoList;
};

Window_InfoFooter.prototype.getFontSize = function() {
    return InfoFontSize;
};


function Window_InfoSide() {
    this.initialize(...arguments);
}

Window_InfoSide.prototype = Object.create(Window_InfoMenu.prototype);
Window_InfoSide.prototype.constructor = Window_InfoSide;

Window_InfoSide.prototype.initialize = function(rect) {
    Window_InfoMenu.prototype.initialize.call(this, rect);
};

Window_InfoSide.prototype.maxCols = function() {
    return 1;
};

Window_InfoSide.prototype.getInfoList = function() {
    return InfoSideList;
};

Window_InfoSide.prototype.getFontSize = function() {
    return InfoSideFontSize;
};


function Sprite_MenuGauge() {
    this.initialize(...arguments);
}
  
Sprite_MenuGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_MenuGauge.prototype.constructor = Sprite_MenuGauge;
  
Sprite_MenuGauge.prototype.initialize = function() {
    this._statusType = $gameTemp.menuGaugeType;
    this.menuParam = $gameTemp.menuParam;
    this._gaugeWidth = this.getMenuGaugeWidth();
    this._gaugeHeight = this.getMenuGaugeHeight();
    Sprite_Gauge.prototype.initialize.call(this);
};

Sprite_MenuGauge.prototype.bitmapWidth = function() {
    return this._gaugeWidth;
};
  
Sprite_MenuGauge.prototype.gaugeHeight = function() {
    return this._gaugeHeight;
};

Sprite_MenuGauge.prototype.getMenuGaugeWidth = function() {
    switch (this._statusType) {
      case 'hp':
        return this.menuParam.ItemWidth > 0 ? this.menuParam.ItemWidth : HPGaugeWidth;
      case 'mp':
        return this.menuParam.ItemWidth > 0 ? this.menuParam.ItemWidth : MPGaugeWidth;
      case 'tp':
        return this.menuParam.ItemWidth > 0 ? this.menuParam.ItemWidth : TPGaugeWidth;
      case 'menuexp':
        return this.menuParam.ItemWidth > 0 ? this.menuParam.ItemWidth : ExpGaugeWidth;
      default:
        return this.menuParam.ItemWidth > 0 ? this.menuParam.ItemWidth : 128;
    }
};
  
Sprite_MenuGauge.prototype.getMenuGaugeHeight = function() {
    switch (this._statusType) {
        case 'hp':
          return this.menuParam.GaugeHeight > 0 ? this.menuParam.GaugeHeight : 12;
        case 'mp':
          return this.menuParam.GaugeHeight > 0 ? this.menuParam.GaugeHeight : 12;
        case 'tp':
          return this.menuParam.GaugeHeight > 0 ? this.menuParam.GaugeHeight : 12;
        case 'menuexp':
          return this.menuParam.GaugeHeight > 0 ? this.menuParam.GaugeHeight : 12;
        default:
          return this.menuParam.GaugeHeight > 0 ? this.menuParam.GaugeHeight : 128;
      }
};

Sprite_MenuGauge.prototype.gaugeColor1 = function() {
    if (this._battler && this.menuParam) {
      switch (this._statusType) {
        case "hp":
        case "mp":
        case "tp":
        case "time":
            return Sprite_Gauge.prototype.gaugeColor1.call(this);
        case "menuexp":
            return NuunManager.getColorCode(ExpGaugeColor1);
        default:
          return NuunManager.getColorCode(this.menuParam.Color1);
      }
    } else {
      return Sprite_Gauge.prototype.gaugeColor1.call(this);
    }
};
  
Sprite_MenuGauge.prototype.gaugeColor2 = function() {
    if (this._battler && this.menuParam) {
      switch (this._statusType) {
        case "hp":
        case "mp":
        case "tp":
        case "time":
            return Sprite_Gauge.prototype.gaugeColor2.call(this);
        case "menuexp":
            return NuunManager.getColorCode(ExpGaugeColor2);
        default:
          return NuunManager.getColorCode(this.menuParam.Color2);
      }
    } else {
      return Sprite_Gauge.prototype.gaugeColor2.call(this);
    }
};

Sprite_MenuGauge.prototype.displyaExp = function() {
    if (ExpDisplayMode === 1) {
        return this.currentMaxValue() - this.currentValue();
    } else if (ExpDisplayMode === 2) {
        return this.currentValue();
    } else if (ExpDisplayMode === 3) {
        return NuunManager.numPercentage(this.currentValue() / this.currentMaxValue(), EXPDecimal, DecimalMode) * 100;
    }
    return this._battler.currentExp() - this._battler.currentLevelExp();
};

Sprite_MenuGauge.prototype.displyaMaxExp = function() {
    return this._battler.nextLevelExp() - this._battler.currentLevelExp();
};

Sprite_MenuGauge.prototype.currentValue = function() {
    if (this._battler && this.menuParam) {
    switch (this._statusType) {
        case "hp":
        case "mp":
        case "tp":
        case "time":
            return Sprite_Gauge.prototype.currentValue.call(this);
        case "menuexp":
            return this._battler.currentExp() - this._battler.currentLevelExp();
        default:
            const actor = this._battler;
            return eval(this.menuParam.DetaEval);
      }
    } else {
      return Sprite_Gauge.prototype.currentValue.call(this);
    }
};
  
Sprite_MenuGauge.prototype.currentMaxValue = function() {
    if (this._battler && this.menuParam) {
    switch (this._statusType) {
        case "hp":
        case "mp":
        case "tp":
        case "time":
            return Sprite_Gauge.prototype.currentMaxValue.call(this);
        case "menuexp":
            return this._battler.nextLevelExp() - this._battler.currentLevelExp();
        default:
            const actor = this._battler;
            return eval(this.menuParam.DetaEval2);
        }
    } else {
      return Sprite_Gauge.prototype.currentMaxValue.call(this);
    }
};

Sprite_MenuGauge.prototype.label = function() {
    if (this._battler && this.menuParam) {
        switch (this._statusType) {
        case "hp":
        case "mp":
        case "tp":
        case "time":
            return Sprite_Gauge.prototype.label.call(this);
        case "menuexp":
            return LabelShow ? TextManager.expA : '';
        default:
          return this.menuParam.ParamName;
        }
    } else {
      return Sprite_Gauge.prototype.label.call(this);
    }
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