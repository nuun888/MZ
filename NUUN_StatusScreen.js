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
 * @version 2.0.0
 * 
 * @help
 * ステータス画面を拡張します。
 * 以下の項目を自由に配置、設定できます。
 * アクター名
 * 二つ名
 * 職業
 * レベル
 * ステート
 * ＨＰ
 * ＭＰ
 * 攻撃力
 * 防御力
 * 魔法力
 * 魔法防御
 * 敏捷性
 * 運
 * ＴＰ
 * 命中率
 * 回避率
 * 会心率
 * 会心回避率
 * 魔法回避率
 * 魔法反射率
 * 反撃率
 * HP再生率
 * MP再生率
 * TP再生率
 * 狙われ率
 * 防御効果率
 * 回復効果率
 * 薬の知識
 * MP消費率
 * TPチャージ率
 * 物理ダメージ率
 * 魔法ダメージ率
 * 床ダメージ率
 * 獲得経験値率
 * 現在の経験値
 * 次のレベルまでの経験値
 * 任意ステータス
 * 名称のみ
 * 属性耐性
 * ステート耐性
 * 装備
 * 記述欄
 * プロフィール
 * 顔グラフィック
 * 
 * ページの各項目の設定
 * 
 * 各ページの項目は「ページ項目設定」から設定します。
 * ステータスに表示するには「ページ設定」の「ページ項目設定」から表示させるリストを選択してください。
 * 
 * 【名称の設定】
 * 能力値、追加能力値、特殊能力値、任意ステータス、装備、属性耐性、ステート耐性、名称のみ、記述欄、プロフィールで任意の名称を設定できます。
 * 
 * 【システム項目文字色の設定】
 * 名称及びシステム文字の文字色を指定します。
 * 
 * 【評価式の設定】
 * 評価式を記入します。オリジナルパラメータでは必ず記入してください。
 * 能力値、追加能力値、特殊能力値、任意ステータスで有効ですが無記入の場合は任意ステータス以外は自動的に参照されます。
 * 
 * 【記述欄設定】
 * 記述欄はプラグインパラメータ「記述欄タグ名」に任意の文字列を記入してください。一部文字列は使用できない場合も
 * ありますので注意してください。desc1と記入した場合はモンスターのメモ欄に<desc1:ああああ>と記入したとき、記述欄タグ名にdesc1と
 * 記入した項目に「ああああ」と表示されます。
 * 
 * 【X表示位置】
 * 表示する列を指定します。
 * 
 * 【Y表示位置】
 * 表示する行を指定します。
 * 
 * 【X座標】
 * 【X表示位置】からの相対座標。
 * 
 * 【Y座標】
 * 【Y表示位置】からの相対座標。
 * 
 * 【項目横幅】
 * コンテンツ表示範囲を設定します。
 * 
 * 【システム項目横幅】
 * システム文字の表示幅を指定します。。
 * 
 * 【ワイド表示モード】
 * 項目を複数列に跨いで表示します。
 * 
 * 【単位】
 * 追加能力値、特殊能力値、任意ステータス、属性耐性、ステート耐性で接尾につける単位を設定します。
 * 
 * 【コンテンツ背景表示】
 * 能力値、追加能力値、特殊能力値、任意ステータス、属性耐性、ステート耐性、装備で黒い背景（デフォルトの場合）を表示、表表示かを設定します。
 * 
 * アクターのメモ欄
 * <[tag]:[text]> 記述欄のテキスト
 * [tag]:記述欄タグ名
 * [text]:表示するテキスト。
 * 改行すれば何行でも表示可能ですので、独自の項目を追加することも可能です。
 * <desc1:ああああ> desc1とタグ付けされた項目に「ああああ」が表示されます。
 * 文章を表示させる場合は<desc1:ああああ>と記入してください。
 * 
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
 * 2021/5/20 Ver.2.0.0
 * 各項目を自由に設定、配置できるように変更。
 * アクター立ち絵を変更する機能を追加。
 * ウィンドウスキンを変更する機能を追加。
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
 * @param Setting
 * @text 共通設定
 * @default ------------------------------
 * 
 * @param Decimal
 * @text 小数点桁数
 * @desc 表示出来る小数点桁数。
 * @type number
 * @default 2
 * @min 0
 * @max 99
 * @parent Setting
 * 
 * @param DecimalMode
 * @text 端数処理四捨五入
 * @desc 表示外小数点を四捨五入で丸める。（falseで切り捨て）
 * @type boolean
 * @default true
 * @parent Setting
 * 
 * @param ExpPercent
 * @text 経験値百分率表示
 * @desc 経験値を百分率で表示
 * @type boolean
 * @default false
 * @parent Setting
 * 
 * @param HPGaugeWidth
 * @text HPゲージ横幅
 * @desc HPゲージの横幅を指定します。
 * @type number
 * @default 200
 * @parent Setting
 * 
 * @param HPGaugeHeight
 * @text HPゲージ縦幅
 * @desc HPゲージの横幅縦を指定します。
 * @type number
 * @default 12
 * @parent Setting
 * 
 * @param MPGaugeWidth
 * @text MPゲージ横幅
 * @desc MPゲージの横幅を指定します。
 * @type number
 * @default 200
 * @parent Setting
 * 
 * @param MPGaugeHeight
 * @text MPゲージ縦幅
 * @desc MPゲージの横幅縦を指定します。
 * @type number
 * @default 12
 * @parent Setting
 * 
 * @param TPGaugeWidth
 * @text TPゲージ横幅
 * @desc TPゲージの横幅を指定します。
 * @type number
 * @default 200
 * @parent Setting
 * 
 * @param TPGaugeHeight
 * @text TPゲージ縦幅
 * @desc TPゲージの横幅縦を指定します。
 * @type number
 * @default 12
 * @parent Setting
 * 
 * @param PageSetting
 * @text ページ設定
 * @default ------------------------------
 * 
 * @param PageList
 * @desc ページ項目設定
 * @text ページ項目設定
 * @type struct<PageListData>[]
 * @default ["{\"ParamList\":\"1\"}","{\"ParamList\":\"2\"}","{\"ParamList\":\"3\"}"]
 * @default @parent PageSetting
 * 
 * @param ParamList_1Page
 * @desc 表示する項目。
 * @text 表示ページ項目１
 * @type struct<ParamListData>[]
 * @default ["{\"DateSelect\":\"1\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"168\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"3\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"192\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"168\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"2\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"432\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"270\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"100\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"24\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"4\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"204\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"5\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"3\",\"X_Coordinate\":\"204\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"10\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"4\",\"X_Coordinate\":\"204\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"11\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"4\",\"X_Coordinate\":\"204\",\"Y_Coordinate\":\"24\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"19\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"4\",\"X_Coordinate\":\"204\",\"Y_Coordinate\":\"48\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"40\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"456\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"270\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"41\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"3\",\"X_Coordinate\":\"456\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"270\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"1000\",\"NameColor\":\"0\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"6\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"true\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"12\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"7\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"260\",\"SystemItemWidth\":\"100\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"true\"}","{\"DateSelect\":\"13\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"260\",\"SystemItemWidth\":\"100\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"true\"}","{\"DateSelect\":\"14\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"9\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"260\",\"SystemItemWidth\":\"100\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"true\"}","{\"DateSelect\":\"15\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"10\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"260\",\"SystemItemWidth\":\"100\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"true\"}","{\"DateSelect\":\"16\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"11\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"260\",\"SystemItemWidth\":\"100\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"true\"}","{\"DateSelect\":\"17\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"12\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"260\",\"SystemItemWidth\":\"100\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"true\"}","{\"DateSelect\":\"62\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"7\",\"X_Coordinate\":\"300\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"474\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"true\"}","{\"DateSelect\":\"1000\",\"NameColor\":\"0\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"13\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"true\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"90\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"14\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"true\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}"]
 * @parent PageSetting
 * 
 * @param ParamList_2Page
 * @desc 表示する項目。
 * @text 表示ページ項目２
 * @type struct<ParamListData>[]
 * @default ["{\"DateSelect\":\"1\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"168\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"3\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"192\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"168\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"2\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"432\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"270\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"100\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"24\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"4\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"204\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"5\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"3\",\"X_Coordinate\":\"204\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"10\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"4\",\"X_Coordinate\":\"204\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"11\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"4\",\"X_Coordinate\":\"204\",\"Y_Coordinate\":\"24\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"19\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"4\",\"X_Coordinate\":\"204\",\"Y_Coordinate\":\"48\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"40\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"456\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"270\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"41\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"3\",\"X_Coordinate\":\"456\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"270\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"1000\",\"NameColor\":\"0\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"6\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"true\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"20\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"180\",\"SystemItemWidth\":\"80\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"true\"}","{\"DateSelect\":\"21\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"8\",\"X_Coordinate\":\"188\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"180\",\"SystemItemWidth\":\"80\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"true\"}","{\"DateSelect\":\"22\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"9\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"180\",\"SystemItemWidth\":\"80\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"true\"}","{\"DateSelect\":\"23\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"9\",\"X_Coordinate\":\"188\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"180\",\"SystemItemWidth\":\"80\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"true\"}","{\"DateSelect\":\"24\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"10\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"180\",\"SystemItemWidth\":\"80\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"true\"}","{\"DateSelect\":\"25\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"10\",\"X_Coordinate\":\"188\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"180\",\"SystemItemWidth\":\"80\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"true\"}","{\"DateSelect\":\"26\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"11\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"180\",\"SystemItemWidth\":\"80\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"true\"}","{\"DateSelect\":\"27\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"11\",\"X_Coordinate\":\"188\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"180\",\"SystemItemWidth\":\"80\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"true\"}","{\"DateSelect\":\"28\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"12\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"180\",\"SystemItemWidth\":\"80\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"true\"}","{\"DateSelect\":\"29\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"12\",\"X_Coordinate\":\"188\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"180\",\"SystemItemWidth\":\"80\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"true\"}","{\"DateSelect\":\"30\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"2\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"180\",\"SystemItemWidth\":\"80\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"true\"}","{\"DateSelect\":\"31\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"2\",\"Y_Position\":\"8\",\"X_Coordinate\":\"188\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"180\",\"SystemItemWidth\":\"80\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"true\"}","{\"DateSelect\":\"32\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"2\",\"Y_Position\":\"9\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"180\",\"SystemItemWidth\":\"80\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"true\"}","{\"DateSelect\":\"33\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"2\",\"Y_Position\":\"9\",\"X_Coordinate\":\"188\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"180\",\"SystemItemWidth\":\"80\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"true\"}","{\"DateSelect\":\"34\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"2\",\"Y_Position\":\"10\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"180\",\"SystemItemWidth\":\"80\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"true\"}","{\"DateSelect\":\"35\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"2\",\"Y_Position\":\"10\",\"X_Coordinate\":\"188\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"180\",\"SystemItemWidth\":\"80\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"true\"}","{\"DateSelect\":\"36\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"2\",\"Y_Position\":\"11\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"180\",\"SystemItemWidth\":\"80\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"true\"}","{\"DateSelect\":\"37\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"2\",\"Y_Position\":\"11\",\"X_Coordinate\":\"188\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"180\",\"SystemItemWidth\":\"80\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"true\"}","{\"DateSelect\":\"38\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"2\",\"Y_Position\":\"12\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"180\",\"SystemItemWidth\":\"80\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"true\"}","{\"DateSelect\":\"39\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"2\",\"Y_Position\":\"12\",\"X_Coordinate\":\"188\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"180\",\"SystemItemWidth\":\"80\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"true\"}","{\"DateSelect\":\"51\",\"NameColor\":\"1\",\"ParamName\":\"追加ステータス\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"7\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"51\",\"NameColor\":\"1\",\"ParamName\":\"特殊ステータス\",\"DetaEval\":\"\",\"X_Position\":\"2\",\"Y_Position\":\"7\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}"]
 * @param ParamList_3Page
 * 
 * @desc 表示する項目。
 * @text 表示ページ項目３
 * @type struct<ParamListData>[]
 * @default ["{\"DateSelect\":\"1\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"168\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"3\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"192\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"168\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"2\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"432\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"270\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"100\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"24\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"4\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"204\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"5\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"3\",\"X_Coordinate\":\"204\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"10\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"4\",\"X_Coordinate\":\"204\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"11\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"4\",\"X_Coordinate\":\"204\",\"Y_Coordinate\":\"24\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"19\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"4\",\"X_Coordinate\":\"204\",\"Y_Coordinate\":\"48\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"40\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"456\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"270\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"41\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"3\",\"X_Coordinate\":\"456\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"270\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"1000\",\"NameColor\":\"0\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"6\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"true\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"51\",\"NameColor\":\"2\",\"ParamName\":\"属性耐性\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"7\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"51\",\"NameColor\":\"2\",\"ParamName\":\"ステート耐性\",\"DetaEval\":\"\",\"X_Position\":\"2\",\"Y_Position\":\"7\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"false\"}","{\"DateSelect\":\"60\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"368\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"true\"}","{\"DateSelect\":\"61\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"2\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"368\",\"SystemItemWidth\":\"0\",\"WideMode\":\"false\",\"paramUnit\":\"\",\"textMethod\":\"\",\"Back\":\"true\"}"]
 * @parent PageSetting
 * 
 * @param ParamList_4Page
 * @desc 表示する項目。
 * @text 表示ページ項目４
 * @type struct<ParamListData>[]
 * @default []
 * @parent PageSetting
 * 
 * @param ParamList_5Page
 * @desc 表示する項目。
 * @text 表示ページ項目５
 * @type struct<ParamListData>[]
 * @default []
 * @parent PageSetting
 * 
 * @param BackGroundSetting
 * @text 背景画像設定
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
 * @param StatusWindowsSkin
 * @desc ステータスウィンドウのウィンドウスキンを指定します。
 * @text ステータスウィンドウスキン
 * @type file
 * @dir img/system
 * @default 
 * @parent BackGroundSetting
 * 
 * @param ActorImgSetting
 * @text アクター設定
 * @default ------------------------------
 * 
 * @param ActorsImgList
 * @text 画像設定
 * @desc アクターの画像設定
 * @default []
 * @type struct<actorImgList>[]
 * @parent ActorImgSetting
 * 
 * @param actorPosition
 * @text 立ち絵表示位置
 * @desc 立ち絵の表示位置を指定します。
 * @type select
 * @option 左
 * @value 0
 * @option 中央
 * @value 1
 * @option 右
 * @value 2
 * @default 2
 * @parent ActorImgSetting
 * 
 * @param EquipSetting
 * @text 装備設定
 * @default ------------------------------
 * 
 * @param EquipNameVisible
 * @text 装備部位名表示
 * @desc 表示する装備部位名を指定します。
 * @type select
 * @option なし
 * @value 0
 * @option 部位のみ
 * @value 1
 * @option アイコンのみ
 * @value 2
 * @option アイコン、部位
 * @value 3
 * @default 1
 * @parent EquipSetting
 * 
 * @param EquipIcons
 * @type struct<EquipIconsData>[]
 * @text 装備アイコン
 * @desc 装備アイコンを設定します。
 * @default []
 * @parent EquipSetting
 * 
 * @param EXPSetting
 * @text 経験値設定
 * @default ------------------------------
 * 
 * @param EXPGaugeVisible
 * @text 経験値ゲージ表示
 * @desc 経験値ゲージを表示する。
 * @type boolean
 * @default true
 * @parent EXPSetting
 * 
 * @param EXPGaugeColor1
 * @text 経験値ゲージ色１
 * @desc 経験値ゲージの色１
 * @type number
 * @default 17
 * @parent EXPSetting
 * 
 * @param EXPGaugeColor2
 * @text 経験値ゲージ色２
 * @desc 経験値ゲージの色２
 * @type number
 * @default 6
 * @parent EXPSetting
 * 
 * @param EXPGaugeX
 * @text EXPゲージX座標
 * @desc EXPゲージのX座標（相対）
 * @type number
 * @default 0
 * @parent EXPSetting
 * 
 * @param EXPGaugeY
 * @text EXPゲージY座標
 * @desc EXPゲージのY座標（相対）
 * @type number
 * @default 0
 * @parent EXPSetting
 * 
 * @param EXPGaugeWidth
 * @text EXPゲージ横幅
 * @desc EXPゲージの横幅を指定します。
 * @type number
 * @default 300
 * @parent EXPSetting
 * 
 * @param EXPGaugeHeight
 * @text EXPゲージ縦幅
 * @desc EXPゲージの横幅縦を指定します。
 * @type number
 * @default 12
 * @parent EXPSetting
 * 
 * @param ElementStateSetting
 * @text 表示属性、ステート設定
 * @default ------------------------------
 * 
 * @param ElementResist
 * @type struct<ElementData>[]
 * @text 属性耐性
 * @default ["{\"ElementNo\":\"1\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"2\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"3\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"4\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"5\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"6\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"7\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"8\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"9\",\"ElementIconId\":\"\"}"]
 * @parent ElementStateSetting
 * 
 * @param StateResist
 * @type struct<StateData>[]
 * @text 状態耐性
 * @default ["{\"StateNo\":\"4\"}","{\"StateNo\":\"5\"}","{\"StateNo\":\"6\"}","{\"StateNo\":\"7\"}","{\"StateNo\":\"8\"}","{\"StateNo\":\"9\"}","{\"StateNo\":\"10\"}","{\"StateNo\":\"12\"}","{\"StateNo\":\"13\"}"]
 * @parent ElementStateSetting
 * 
 * @param ElementResistText
 * @text 属性有効度名前表示
 * @desc 属性有効度の属性を名前で表示させます。
 * @type boolean
 * @default false
 * @parent ElementStateSetting
 * 
 * @param StateResistText
 * @text ステート有効度名前表示
 * @desc ステート有効度のステートを名前で表示させます。
 * @type boolean
 * @default false
 * @parent ElementStateSetting
 * 
 * @param ElementResistCol
 * @text 属性有効度の表示列数
 * @desc 属性有効度の表示列数を設定します。
 * @type number
 * @default 2
 * @parent ElementStateSetting
 * 
 * @param StateResistCol
 * @text ステート有効度の表示列数
 * @desc ステート有効度の表示列数を設定します。
 * @type number
 * @default 2
 * @parent ElementStateSetting
 * 
 * 
 *  プラグインコマンド
 * 
 * @command ChangeStatusActorImg
 * @desc ステータス画面のアクター画像を変更します。
 * @text ステータス画面アクター画像変更
 * 
 * @arg actorId
 * @type actor
 * @default 0
 * @desc アクターを指定します。
 * @text アクターID
 * 
 * @arg ChangeActorImgId
 * @type number
 * @default 1
 * @min 1
 * @desc 変更する立ち絵のIDを指定します。
 * @text 立ち絵ID
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
 * @desc アクターの画像を表示します。
 * @type file[]
 * @dir img/
 * @default 
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
/*~struct~ElementData:
 *
 * @param ElementNo
 * @text 属性ID
 * @desc 表示する属性番号を指定します。
 * @type number
 *
 * @param ElementIconId
 * @text アイコンID
 * @desc アイコンのIDを指定します。
 * @type number
 * @default 0
 */
/*~struct~StateData:
 *
 * @param StateNo
 * @text ステート
 * @desc 表示するステートを指定します。
 * @type state
 * @default 0
 *
 */
/*~struct~EquipIconsData:
 *
 * @param EquipIconId
 * @text アイコンID
 * @desc 表示するステート装備アイコンを指定します。データベースの「タイプ」の「装備タイプ」のIDと同じリストIDのアイコンが表示されます。
 * @type number
 * @default 0
 *
 */
/*~struct~PageListData:
 * 
 * @param ParamLists
 * @desc 表示するページ。
 * @text 表示するページを指定します。
 * @type select
 * @option なし
 * @value 0
 * @option 表示ページ項目１
 * @value 1
 * @option 表示ページ項目２
 * @value 2
 * @option 表示ページ項目３
 * @value 3
 * @option 表示ページ項目４
 * @value 4
 * @option 表示ページ項目５
 * @value 5
 * @default 0
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

/*~struct~ParamListData:
 *
 * @param DateSelect
 * @text 表示するステータス
 * @desc 表示するステータスを指定します。
 * @type select
 * @option なし
 * @value 0
 * @option アクター名
 * @value 1
 * @option 二つ名
 * @value 2
 * @option 職業
 * @value 3
 * @option レベル
 * @value 4
 * @option ステート
 * @value 5
 * @option ＨＰ
 * @value 10
 * @option ＭＰ
 * @value 11
 * @option 攻撃力
 * @value 12
 * @option 防御力
 * @value 13
 * @option 魔力
 * @value 14
 * @option 魔法防御
 * @value 15
 * @option 敏捷性
 * @value 16
 * @option 運
 * @value 17
 * @option ＴＰ
 * @value 19
 * @option 命中率
 * @value 20
 * @option 回避率
 * @value 21
 * @option 会心率
 * @value 22
 * @option 会心回避率
 * @value 23
 * @option 魔法回避率
 * @value 24
 * @option 魔法反射率
 * @value 25
 * @option 反撃率
 * @value 26
 * @option HP再生率
 * @value 27
 * @option MP再生率
 * @value 28
 * @option TP再生率
 * @value 29
 * @option 狙われ率
 * @value 30
 * @option 防御効果率
 * @value 31
 * @option 回復効果率
 * @value 32
 * @option 薬の知識
 * @value 33
 * @option MP消費率
 * @value 34
 * @option TPチャージ率
 * @value 35
 * @option 物理ダメージ率
 * @value 36
 * @option 魔法ダメージ率
 * @value 37
 * @option 床ダメージ率
 * @value 38
 * @option 獲得経験値率
 * @value 39
 * @option 現在の経験値
 * @value 40
 * @option 次のレベルまでの経験値
 * @value 41
 * @option 任意ステータス
 * @value 50
 * @option 名称のみ
 * @value 51
 * @option 属性耐性
 * @value 60
 * @option ステート耐性
 * @value 61
 * @option 装備
 * @value 62
 * @option 記述欄
 * @value 70
 * @option プロフィール
 * @value 90
 * @option 顔グラフィック
 * @value 100
 * @option キャラチップ（未実装）
 * @value 101
 * @option サイドビューアクター画像（未実装）
 * @value 102
 * @option 画像（未実装）
 * @value 103
 * @option ステータスレーダーチャート（未実装）
 * @value 200
 * @option 属性耐性レーダーチャート（未実装）
 * @value 201
 * @option ステート耐性レーダーチャート（未実装）
 * @value 202
 * @option ライン
 * @value 1000
 * @default 0
 * 
 * @param NameColor
 * @desc システム項目の文字色。
 * @text システム項目文字色
 * @type number
 * @default 16
 * @min 0
 * 
 * @param ParamName
 * @desc 項目の名称を設定します。
 * @text 名称
 * @type string
 * @default
 * 
 * @param DetaEval
 * @desc 評価式。
 * @text 評価式
 * @type 
 * @default
 * 
 * @param X_Position
 * @text X表示列位置
 * @desc X表示列位置
 * @type number
 * @default 1
 * @min 1
 * @max 3
 * 
 * @param Y_Position
 * @desc Y表示行位置
 * @text Y表示行位置
 * @type number
 * @default 1
 * @min 1
 * 
 * @param X_Coordinate
 * @text X座標（相対）
 * @desc X座標（X表示列位置からの相対座標）
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param Y_Coordinate
 * @text Y座標（相対）
 * @desc Y座標（Y表示列位置からの相対座標）
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param ItemWidth
 * @desc 項目横幅（0でデフォルト幅）
 * @text 項目横幅
 * @type number
 * @default 0
 * @min 0
 * 
 * @param SystemItemWidth
 * @desc システム項目の横幅（0でデフォルト幅）
 * @text システム項目横幅
 * @type number
 * @default 0
 * @min 0
 * 
 * @param WideMode
 * @desc ワイド表示モード
 * @text ワイド表示モード
 * @type boolean
 * @default false
 * 
 * @param paramUnit
 * @desc 単位を設定します。
 * @text 単位
 * @type string
 * @default 
 * 
 * @param textMethod
 * @desc 記述欄に紐づけするタグ名
 * @text 記述欄タグ名
 * @type string
 * @default 
 * 
 * @param Back
 * @text コンテンツ背景表示
 * @desc コンテンツ背景を表示させます。
 * @type boolean
 * @default false
 * 
 *
 */

var Imported = Imported || {};
Imported.NUUN_StatusScreen = true;

(() => {
const parameters = PluginManager.parameters('NUUN_StatusScreen');
const Decimal = Number(parameters['Decimal'] || 2);
const DecimalMode = eval(parameters['DecimalMode'] || "true");
const ExpPercent = eval(parameters['ExpPercent'] || "false");
const HPGaugeWidth = Number(parameters['HPGaugeWidth'] || 200);
const HPGaugeHeight = Number(parameters['HPGaugeHeight'] || 12);
const MPGaugeWidth = Number(parameters['MPGaugeWidth'] || 200);
const MPGaugeHeight = Number(parameters['MPGaugeHeight'] || 12);
const TPGaugeWidth = Number(parameters['TPGaugeWidth'] || 200);
const TPGaugeHeight = Number(parameters['TPGaugeHeight'] || 12);
const EXPGaugeWidth = Number(parameters['EXPGaugeWidth'] || 300);
const EXPGaugeHeight = Number(parameters['EXPGaugeHeight'] || 12);
const EXPGaugeX = Number(parameters['EXPGaugeX'] || 0);
const EXPGaugeY = Number(parameters['EXPGaugeY'] || 0);
const PageList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList'])) : null) || [];
const ParamList_1Page = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ParamList_1Page'])) : null) || [];
const ParamList_2Page = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ParamList_2Page'])) : null) || [];
const ParamList_3Page = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ParamList_3Page'])) : null) || [];
const ParamList_4Page = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ParamList_4Page'])) : null) || [];
const ParamList_5Page = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ParamList_5Page'])) : null) || [];
const BackGroundImg = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['BackGroundImg']))[0] : null);
const BackUiWidth = eval(parameters['BackUiWidth'] || "true");
const StatusWindowsSkin = (String(parameters['StatusWindowsSkin'])) || null;
const EquipNameVisible = Number(parameters['EquipNameVisible'] || 1);
const EXPGaugeVisible = eval(parameters['EXPGaugeVisible'] || "true");
const EXPGaugeColor1 = Number(parameters['EXPGaugeColor1'] || 17);
const EXPGaugeColor2 = Number(parameters['EXPGaugeColor2'] || 6);
const ActorsImgList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ActorsImgList'])) : null) || [];
const actorPosition = Number(parameters['actorPosition'] || 2);
const ElementResistText = eval(parameters['ElementResistText'] || "false");
const StateResistText = eval(parameters['StateResistText'] || "false");
const ElementResist = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ElementResist'])) : [];
const StateResist = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['StateResist'])) : [];
const ElementResistCol = Number(parameters['ElementResistCol'] || 2);
const StateResistCol = Number(parameters['StateResistCol'] || 2);
const EquipIcons = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['EquipIcons'])) : [];

const pluginName = "NUUN_StatusScreen";
PluginManager.registerCommand(pluginName, 'ChangeStatusActorImg', args => {
  if ($gameActors._data[args.actorId]) {
    $gameActors._data[args.actorId].setStatusActorImgId(args.ChangeActorImgId);
  }
});

const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
  _Game_Actor_initMembers.call(this);
  this.statusActorImgIndex = -1;
};

const _Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
  _Game_Actor_setup.call(this, actorId);
  this.initStatusActorImg(actorId);
};

Game_Actor.prototype.initStatusActorImg = function(id) {
  this.statusActorImgIndex = (ActorsImgList.findIndex(actors => actors.actorId === id));
  if (this.statusActorImgIndex >= 0) {
    this.statusImgId = (this.statusImgId === undefined ? 0 : this.statusImgId);
    if (!ActorsImgList[this.statusActorImgIndex].ActorImg) {
      ActorsImgList[this.statusActorImgIndex].ActorImg = [];
    }
  }
};

Game_Actor.prototype.setStatusActorImgId = function(changeActorImgId) {
  if (!this.statusActorImgIndex) {
    this.initStatusActorImg(this.actorId());
  }
  if (this.statusActorImgIndex >= 0) {
    this.statusImgId = Number(changeActorImgId) - 1;
  }
};

const _Scene_Status_initialize = Scene_Status.prototype.initialize;
Scene_Status.prototype.initialize = function() {
  _Scene_Status_initialize.call(this);
  this._page = 0;
};

Scene_Status.prototype.create = function() {
  Scene_MenuBase.prototype.create.call(this);
  this.createPageStatusWindow();
  this.createStatusWindow();
  this.createStatusButton();
};

const _Scene_Status_createBackground = Scene_Status.prototype.createBackground;
Scene_Status.prototype.createBackground = function() {
  _Scene_Status_createBackground.call(this);
  if (BackGroundImg) {
    const sprite = new Sprite();
    sprite.bitmap = ImageManager.nuun_LoadPictures(BackGroundImg);
    this.addChild(sprite);
    if (sprite.bitmap && !sprite.bitmap.isReady()) {
      sprite.bitmap.addLoadListener(this.setBackGround.bind(this, sprite));
    } else {
      this.setBackGround(sprite);
    }
  }
};

Scene_Status.prototype.setBackGround = function(sprite) {
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

Scene_Status.prototype.statusWindowRect = function() {
  const wx = 0;
  //const wy = this.mainAreaTop() + this.isPage() ? this._statusPageWindow.height : 0;
  const wy = this.mainAreaTop() + this.isPage() ? 0 : 0;
  const ww = Graphics.boxWidth;
  const wh = Graphics.boxHeight - wy;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Status.prototype.createPageStatusWindow = function() {
  if (this.isPage()) {
    //const rect = this.statusPageWindowRect();
    //this._statusPageWindow = new Window_StatusPage(rect);
    //this.addWindow(this._statusPageWindow);
  }
};

Scene_Status.prototype.statusWindowRect = function() {
  const wx = 0;
  const wy = this.mainAreaTop();
  const ww = Graphics.boxWidth;
  const wh = Graphics.boxHeight - wy;
  return new Rectangle(wx, wy, ww, wh);
};

const _Scene_Status_createStatusWindow  = Scene_Status.prototype.createStatusWindow;
Scene_Status.prototype.createStatusWindow = function() {
  _Scene_Status_createStatusWindow.call(this);
  if (BackGroundImg) {
    this._statusWindow.opacity = 0;
  }
};

Scene_Status.prototype.createStatusButton = function() {
  if(this.maxPage() > 1 && ConfigManager.touchUI) {
    this._statusupButton = new Sprite_Button("up");
    this._statusupButton.x = 24 + this._pageupButton.width + this._pagedownButton.width;
    this._statusupButton.y = this.buttonY();
    const statusupRight = this._statusupButton.x + this._statusupButton.width;
    this._statusdownButton = new Sprite_Button("down");
    this._statusdownButton.x = statusupRight + 4;
    this._statusdownButton.y = this.buttonY();
    this.addWindow(this._statusupButton);
    this.addWindow(this._statusdownButton);
    this._statusupButton.setClickHandler(this.updateStatusPageup.bind(this));
    this._statusdownButton.setClickHandler(this.updateStatusPagedown.bind(this));
  }
};

Scene_Status.prototype.refreshActor = function() {
  const actor = this.actor();
  this._statusWindow.setActor(actor);
};

const _Scene_Status_onActorChange = Scene_Status.prototype.onActorChange;
Scene_Status.prototype.onActorChange = function() {
  this.setPage(this._page);
  _Scene_Status_onActorChange.call(this);
};

Scene_Status.prototype.isPage = function() {
  return PageList && PageList.length > 1;
};

Scene_Status.prototype.maxPage = function() {
  return PageList ? PageList.length : 1;
};

Scene_Status.prototype.updateStatusPagedown = function() {
	const maxPage = this.maxPage();
  if (maxPage > 1) {
    this._page = (this._page + 1) % maxPage;
    SoundManager.playCursor();
    this.updatePage();
  }
};

Scene_Status.prototype.updateStatusPageup = function() {
	const maxPage = this.maxPage();
  if (maxPage > 1) {
    this._page = (this._page + (maxPage - 1)) % maxPage;
    SoundManager.playCursor();
    this.updatePage();
  }
};

Scene_Status.prototype.updatePage = function() {
  this.setPage(this._page);
  this._statusWindow.refresh()
};

Scene_Status.prototype.setPage = function() {
  this._statusWindow.setPage(this._page);
};

const _Scene_Status_update = Scene_Status.prototype.update;
Scene_Status.prototype.update = function() {
  _Scene_Status_update.call(this);
	if (Input.isRepeated('left') && this.maxPage() > 1) {
		this.updateStatusPageup();
	} else if (Input.isRepeated('right') && this.maxPage() > 1){
		this.updateStatusPagedown();
  }
};

const _Window_Status_initialize = Window_Status.prototype.initialize;
Window_Status.prototype.initialize = function(rect) {
  this._userWindowSkin = StatusWindowsSkin;
  _Window_Status_initialize.call(this, rect);
  this._page = 0;
};

Window_Status.prototype.refresh = function() {
  Window_StatusBase.prototype.refresh.call(this);
  if (this._actor) {
    this.actorImg();
    this.drawBlock();
  }
};

const _Window_Status_loadFaceImages = Window_Status.prototype.loadFaceImages;
Window_Status.prototype.loadFaceImages = function() {
  _Window_Status_loadFaceImages.call(this);
  for (const actor of $gameParty.members()) {
    if (actor.statusActorImgIndex < 0) {
      actor.initStatusActorImg(actor.actorId());
    }
    if (ActorsImgList[actor.statusActorImgIndex] && actor.statusActorImgIndex >= 0) {
      const actorImges = ActorsImgList[actor.statusActorImgIndex].ActorImg[actor.statusImgId];
      ImageManager.nuun_LoadPictures(actorImges);
    }
  }
};

Window_Status.prototype.actorImg = function() {
  const actor = this._actor;
  if (ActorsImgList[actor.statusActorImgIndex] && actor.statusActorImgIndex >= 0) {
    const actorImges = ActorsImgList[actor.statusActorImgIndex].ActorImg[actor.statusImgId];
    if (actorImges) {
      const bitmap = ImageManager.nuun_LoadPictures(actorImges);
      if (bitmap && !bitmap.isReady()) {
        bitmap.addLoadListener(this.actorImgRefresh.bind(this, actor, bitmap));
      } else {
        this.actorImgRefresh(actor, bitmap);
      }
    }
  }
};

Window_Status.prototype.actorImgRefresh = function(actor, bitmap) {
  const data = ActorsImgList[actor.statusActorImgIndex];
  let x = data.Actor_X;
  const scale = (data.Actor_Scale || 100) / 100;
  if(actorPosition === 0) {
    x += 0;
  } else if (actorPosition === 1) {
    x += Math.floor(this.width / 2 - ((bitmap.width * scale) / 2));
  } else {
    x += this.width - (bitmap.width * scale) - 24;
  }
  const dw = bitmap.width * scale;
  const dh = bitmap.height * scale;
  const y = data.Actor_Y + (this.height - (bitmap.height * scale)) - 24;
  this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, dw, dh);
};

Window_Status.prototype.maxCols = function() {
  return 2;
};

Window_Status.prototype.drawContentsBackground = function(back, x, y, width) {
  if (back) {
    const rect = this.contentsRect(x, y, width);
    this.drawContentsBackgroundRect(rect);
  }
};

Window_Status.prototype.drawContentsBackgroundRect = function(rect) {
    const c1 = ColorManager.itemBackColor1();
    const c2 = ColorManager.itemBackColor2();
    const x = rect.x;
    const y = rect.y;
    const w = rect.width;
    const h = rect.height;
    this.contents.gradientFillRect(x, y, w, h, c1, c2, true);
    this.contents.strokeRect(x, y, w, h, c1);
};

Window_Status.prototype.contentsRect = function(x, y, width) {
  const height = this.lineHeight() - this.rowSpacing();
  return new Rectangle(x, y + 2, width, height);
};

Window_Status.prototype.contensHeight = function() {
  return this.lineHeight();
};

Window_Status.prototype.setPage = function(page) {
  this._page = page;
};

Window_Status.prototype.contensX = function(x) {
  return x + (this.itemPadding() / 2);
};

Window_Status.prototype.contensWidth = function(width) {
  return width - this.itemPadding();
};

Window_Status.prototype.systemWidth = function(swidth, width) {
  return swidth > 0 ? swidth : Math.floor(width / 3);
};

Window_Status.prototype.drawBlock = function() {
  const list = this.listDate();
  const lineHeight = this.lineHeight();
  for (const data of list) {
    const x_Position = data.X_Position;
    const position = Math.min(x_Position, this.maxCols());
    const rect = this.itemRect(position - 1);
    const x = rect.x + (data.X_Coordinate + data.X_Position);
    const y = (data.Y_Position - 1) * lineHeight + rect.y + data.Y_Coordinate;
    const width = data.ItemWidth && data.ItemWidth > 0 ? data.ItemWidth : this.widthMode(data.WideMode, rect);
    this.dateDisplay(data, x, y, width);
  }
};

Window_Status.prototype.widthMode = function(mode, rect) {
  if (mode) {
    rect.width = rect.width * 2 + this.colSpacing();
  }
  return rect.width;
};

Window_Status.prototype.listDate = function() {
  switch (this._page) {
    case 0:
      return ParamList_1Page;
    case 1:
      return ParamList_2Page;
    case 2:
      return ParamList_3Page;
    case 3:
      return ParamList_4Page;
    case 4:
      return ParamList_5Page;
    default:
      return null;
  }
};

Window_Status.prototype.dateDisplay = function(list, x, y, width) {
  switch (list.DateSelect) {
    case 0:
      break;
    case 1:
      this.drawActorName(this._actor, x, y, width);
      break;
    case 2:
      this.drawActorNickname(this._actor, x, y, width);
      break;
    case 3:
      this.drawActorClass(this._actor, x, y, width);
      break;
    case 4:
      this.drawActorLevel(this._actor, x, y, width);
      break;
    case 5:
      this.drawActorIcons(this._actor, x, y, width);
      break;
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
      this.drawParams(list, this._actor, x, y, width, list.DateSelect - 10);
      break;
    case 19:
      this.drawParams(list, this._actor, x, y, width, list.DateSelect - 10);
      break;
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
      this.drawParams(list, this._actor, x, y, width, list.DateSelect - 10);
      break;
    case 40:
      this.drawExpInfo(list, this._actor, x, y, width);
      break;
    case 41:
      this.drawExpGaugeInfo(list, this._actor, x, y, width);
      break;
    case 50:
      this.drawOriginalStatus(list, this._actor, x, y, width);
      break;
    case 51:
      this.drawName(list, x, y, width);
      break;
    case 60:
      this.drawElement(list, this._actor, x, y, width);
      break;
    case 61:
      this.drawStates(list, this._actor, x, y, width);
      break;
    case 62:
      this.drawEquip(list, this._actor, x, y, width);
      break;
    case 70:
      this.drawDesc(list, this._actor, x, y, width);
      break;
    case 90:
      this.drawProfile(list, this._actor, x, y, width);
      break;
    case 100:
      this.drawActorFace(this._actor, x, y);
      break;
    case 101:
      break;
    case 102:
      break;
    case 1000:
      this.horzLine(list, x, y, width);
      break;
    default:
      break;
  }
};

Window_Status.prototype.paramNameShow = function(list, actor, params) {
  if (list.paramName) {
    return list.paramName
  }
  switch (params) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      return TextManager.param(params);
    case 9:
      return TextManager.basic(6);
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
    default:
      return null;
  }
};

Window_Status.prototype.paramShow = function(list, actor, params, detaEval) {
  if (detaEval) {
    return eval(detaEval);
  }
  switch (params) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      return actor.param(params);
    case 9:
      return actor._tp;
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

Window_Status.prototype.horzLine = function(list, x, y, width) {
  const lineY = y + this.lineHeight() / 2 - 1;
  this.contents.paintOpacity = 48;
  this.contents.fillRect(x, lineY, width, 2, ColorManager.textColor(list.NameColor));
  this.contents.paintOpacity = 255;
};

Window_Status.prototype.drawParams = function(list, actor, x, y, width, params) {
  if (params === 0) {
    this.placeGauge(actor, "hp", x, y);
  } else if (params === 1) {
    this.placeGauge(actor, "mp", x, y);
  } else if (params === 9) {
    this.placeGauge(actor, "tp", x, y);
  } else {
    this.drawContentsBackground(list.Back, x, y, width);
    x = this.contensX(x);
    width = this.contensWidth(width);
    let text = this.paramShow(list, actor, params, list.DetaEval);
    if (text !== undefined) {
      let nameText = this.paramNameShow(list, actor, params);
      let textWidth = this.systemWidth(list.SystemItemWidth, width);
      this.changeTextColor(ColorManager.textColor(list.NameColor));
      this.drawText(nameText, x, y, textWidth);
      this.resetTextColor();
      if (params >= 10) {
        text += list.paramUnit ? String(list.paramUnit) : " %";
      }
      this.drawText(text, x + textWidth + 8, y, width - (textWidth + 8), 'right');
      this.resetTextColor();
    }
  }
};

Window_Status.prototype.drawEquip = function(list, actor, x, y, width) {
  const lineHeight = this.lineHeight();
  const equips = this._actor.equips();
  const e1uipsLength = equips.length;
  let y2 = y;
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  const text = list.paramName;
  if (text) {
    this.drawText(text, x, y, width);
    y2 += lineHeight;
  }
  for (let i = 0; i < e1uipsLength; i++) {
    y = y2 + lineHeight * i;
    let sw = 0;
    let iconWidth = 0;
    const item = equips[i];
    this.drawContentsBackground(list.Back, x, y, width);
    x2 = this.contensX(x);
    width2 = this.contensWidth(width);
    if (EquipNameVisible > 1) {//アイコン表示
      const iconId = EquipIcons[i] ? EquipIcons[i].EquipIconId : 0;
      if (iconId > 0) {
        this.drawIcon(iconId, x2, y + 2);
      }
      iconWidth = ImageManager.iconWidth + (EquipNameVisible === 2 ? 24 : 4);
    }
    if (EquipNameVisible === 1 || EquipNameVisible === 3) {//デフォルト
      const slotName = this.actorSlotName(actor, i);
      sw += this.systemWidth(list.SystemItemWidth, width2);
      this.changeTextColor(ColorManager.textColor(list.NameColor));
      this.drawText(slotName, x2 + iconWidth, y, sw);
    }
    sw += iconWidth;
    this.resetTextColor();
    this.drawItemName(item, x2 + sw, y, width2 - sw);
  }
};

Window_Status.prototype.drawProfile = function(list, actor, x, y, width) {
  const text = list.paramName;
  if (text) {
    this.changeTextColor(ColorManager.textColor(list.NameColor));
    this.drawText(text, x, y, width);
    y += this.lineHeight();
  }
  const profileText = actor.profile();
  this.resetTextColor();
  this.drawTextEx(profileText, x, y, width);
};

Window_Status.prototype.drawDesc = function(list, actor, x, y, width) {
  const text = list.paramName;
  if (text) {
    this.changeTextColor(ColorManager.textColor(list.NameColor));
    this.drawText(text, x, y, width);
    y += this.lineHeight();
  }
  this.resetTextColor();
  const method = list.textMethod;
  if (actor.actor().meta[method]) {
    this.drawTextEx(actor.actor().meta[method], x, y, width);
  }
};

Window_Status.prototype.drawName = function(list, x, y, width) {
  const text = list.ParamName;
  if (text) {
    this.changeTextColor(ColorManager.textColor(list.NameColor));
    this.drawText(text, x, y, width);
  }
  this.resetTextColor();
};

Window_Status.prototype.drawOriginalStatus = function(list, actor, x, y, width) {
  const nameText = list.paramName;
  this.drawContentsBackground(list.Back, x, y, width);
  x = this.contensX(x);
  width = this.contensWidth(width);
  let textWidth = 0;
  if (nameText) {
    textWidth = this.systemWidth(list.SystemItemWidth, width);
    this.changeTextColor(ColorManager.textColor(list.NameColor));
    this.drawText(nameText , x, y, textWidth);
  }
  let text = eval(list.DetaEval);
  text += list.paramUnit; 
  this.resetTextColor();
  this.drawText(text + String(list.paramUnit), x + textWidth + 8, y, width - textWidth - 8, 'right');
};

Window_Status.prototype.drawElement = function(list, actor, x, y, width) {
  const lineHeight = this.lineHeight();
  const text = list.paramName;
  if (text) {
    this.changeTextColor(ColorManager.textColor(list.NameColor));
    this.drawText(text, x, y, width);
    y += this.lineHeight();
  }
  let x2 = x;
  let y2 = y;
  width = (width - this.colSpacing() * (ElementResistCol - 1)) / ElementResistCol;
  if (ElementResist) {
    const elementResistlength = ElementResist.length;
    for (let i = 0; i < elementResistlength; i++) {
      x2 = Math.floor(i % ElementResistCol) * (width + this.itemPadding()) + x;
      y2 = Math.floor(i / ElementResistCol) * lineHeight + y;
      let elementId = ElementResist[i].ElementNo;
      let textWidth = 0;
      if (elementId > 0) {
        this.drawContentsBackground(list.Back, x2, y2, width);
        x3 = this.contensX(x2);
        width2 = this.contensWidth(width);
        let iconId = ElementResist[i].ElementIconId;
        if (ElementResistText || !iconId) {
          const name = $dataSystem.elements[elementId];
          textWidth += this.systemWidth(list.SystemItemWidth, width2);
          this.changeTextColor(ColorManager.textColor(list.NameColor));
          this.drawText(name, x3, y2, textWidth);
        } else if (iconId > 0) {
          this.drawIcon(iconId, x3, y2 + 2);
          textWidth += ImageManager.iconWidth + 4;
        }
        let rate = actor.elementRate(elementId) * 100;
        rate = this.statusParamDecimal(rate);
        rate += list.paramUnit ? String(list.paramUnit) : " %";
        this.resetTextColor();
        this.drawText(rate, x3 + textWidth + 8, y2, width2 - textWidth - 8, "right");
      }
    }
  }
};

Window_Status.prototype.drawStates = function(list, actor, x, y, width) {
  const lineHeight = this.lineHeight();
  const text = list.paramName;
  if (text) {
    this.changeTextColor(ColorManager.textColor(list.NameColor));
    this.drawText(text, x, y, width);
    y += this.lineHeight();
  }
  let x2 = x;
  let y2 = y;
  width = (width - this.colSpacing() * (StateResistCol - 1)) / StateResistCol;
  if (StateResist) {
    const stateResistlength = StateResist.length;
    for (let i = 0; i < stateResistlength; i++) {
      x2 = Math.floor(i % StateResistCol) * (width + this.itemPadding()) + x;
      y2 = Math.floor(i / StateResistCol) * lineHeight + y;
      let stateId = StateResist[i].StateNo;
      let textWidth = 0;
      if (stateId > 0) {
        this.drawContentsBackground(list.Back, x2, y2, width);
        x3 = this.contensX(x2);
        width2 = this.contensWidth(width);
        let iconId = $dataStates[stateId].iconIndex;
        if (StateResistText || iconId === 0) {
          const name = $dataStates[stateId].name;
          textWidth += this.systemWidth(list.SystemItemWidth, width2);
          this.changeTextColor(ColorManager.textColor(list.NameColor));
          this.drawText(name, x3, y2, textWidth);
        } else if (iconId > 0) {
          this.drawIcon(iconId, x3, y2 + 2);
          textWidth += ImageManager.iconWidth + 4;
        }
        let rate = actor.stateRate(stateId) * 100 * (actor.isStateResist(stateId) ? 0 : 1);
        rate = this.statusParamDecimal(rate);
        rate += list.paramUnit ? String(list.paramUnit) : " %";
        this.resetTextColor();
        this.drawText(rate, x3 + textWidth + 8, y2, width2 - textWidth - 8, "right");
      }
    }
  }
};

Window_Status.prototype.drawExpInfo = function(list, actor, x, y, width) {
  const lineHeight = this.lineHeight();
  const expTotal = TextManager.expTotal.format(TextManager.exp);
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  this.drawText(expTotal, x, y, width);
  this.resetTextColor();
  this.drawText(this.expTotalValue(), x, y + lineHeight * 1, width, "right");
};

Window_Status.prototype.drawExpGaugeInfo = function(list, actor, x, y, width) {
  const lineHeight = this.lineHeight();
  const expNext = TextManager.expNext.format(TextManager.level);
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  this.drawText(expNext, x, y + lineHeight * 1, width);
  this.resetTextColor();
  if (EXPGaugeVisible) {
    this.placeExpGauge(this._actor, x - 30 + EXPGaugeX, y + lineHeight * 2 + EXPGaugeY);
  } else {
    this.drawText(this.expNextValue(), x, y + lineHeight * 2, width, "right");
  }
};

Window_Status.prototype.drawCharacterChip = function(list, actor, x, y, width) {
  
};

Window_Status.prototype.drawSideViewActor = function(list, actor, x, y, width) {

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
  let sprite;
  if (type === 'hp') {
    sprite = this.createInnerSprite(key, Sprite_StatusHPGauge);
  } else if (type === 'mp') {
    sprite = this.createInnerSprite(key, Sprite_StatusMPGauge);
  } else if (type === 'tp') {
    sprite = this.createInnerSprite(key, Sprite_StatusTPGauge);
  } else {
    sprite = this.createInnerSprite(key, Sprite_StatusGauge); 
  }
  sprite.setup(actor, type);
  sprite.move(x, y);
  sprite.show();
};

Window_Status.prototype.characterSwitchingHelp = function(list, x, y, width) {
  const lineHeight = this.lineHeight();
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  this.contents.fontSize = 18;
  let text = ConfigManager.touchUI ? "ΛVボタン / " : "";
  this.drawText(text +"QWキー:キャラの切替", x, y , width,'right');
  text = ConfigManager.touchUI ? "<>ボタン / " : "";
	this.drawText(text +"←→キー:項目の切替", x, y + lineHeight, width,'right');
	this.resetTextColor();
	this.contents.fontSize = $gameSystem.mainFontSize();
};

Window_Status.prototype.statusParamDecimal = function(val) {
  if (DecimalMode) {
    return Math.round(val * (Decimal > 0 ? Math.pow(10, Decimal) : 1)) / (Decimal > 0 ? Math.pow(10, Decimal) : 1);
  } else {
    return Math.floor(val * (Decimal > 0 ? Math.pow(10, Decimal) : 1)) / (Decimal > 0 ? Math.pow(10, Decimal) : 1);
  }
};

function Sprite_StatusHPGauge() {
  this.initialize(...arguments);
}

Sprite_StatusHPGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_StatusHPGauge.prototype.constructor = Sprite_StatusHPGauge;

Sprite_StatusHPGauge.prototype.initialize = function() {
  Sprite_Gauge.prototype.initialize.call(this);
};

Sprite_StatusHPGauge.prototype.bitmapWidth = function() {
  return HPGaugeWidth;
};

Sprite_StatusHPGauge.prototype.gaugeHeight = function() {
  return HPGaugeHeight;
};

function Sprite_StatusMPGauge() {
  this.initialize(...arguments);
}

Sprite_StatusMPGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_StatusMPGauge.prototype.constructor = Sprite_StatusMPGauge;

Sprite_StatusMPGauge.prototype.initialize = function() {
  Sprite_Gauge.prototype.initialize.call(this);
};

Sprite_StatusMPGauge.prototype.bitmapWidth = function() {
  return MPGaugeWidth;
};

Sprite_StatusMPGauge.prototype.gaugeHeight = function() {
  return MPGaugeHeight;
};

function Sprite_StatusTPGauge() {
  this.initialize(...arguments);
}

Sprite_StatusTPGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_StatusTPGauge.prototype.constructor = Sprite_StatusTPGauge;

Sprite_StatusTPGauge.prototype.initialize = function() {
  Sprite_Gauge.prototype.initialize.call(this);
};

Sprite_StatusTPGauge.prototype.bitmapWidth = function() {
  return TPGaugeWidth;
};

Sprite_StatusTPGauge.prototype.gaugeHeight = function() {
  return TPGaugeHeight;
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
  return EXPGaugeWidth;
};

Sprite_StatusExpGauge.prototype.gaugeHeight = function() {
  return EXPGaugeHeight;
};

Sprite_StatusExpGauge.prototype.drawValue = function() {
  let currentValue = 0;
  const width = this.bitmapWidth();
  const height = this.bitmapHeight();
  this.setupValueFont();
  if (ExpPercent) {
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
  if (DecimalMode) {
    return Math.round(val * (Decimal > 0 ? Math.pow(10, Decimal) : 1)) / (Decimal > 0 ? Math.pow(10, Decimal) : 1);
  } else {
    return Math.floor(val * (Decimal > 0 ? Math.pow(10, Decimal) : 1)) / (Decimal > 0 ? Math.pow(10, Decimal) : 1);
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
  return this.textColor(EXPGaugeColor1);
};

ColorManager.expGaugeColor2 = function() {
  return this.textColor(EXPGaugeColor2);
};
})();
