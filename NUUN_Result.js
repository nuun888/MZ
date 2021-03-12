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
 * @version 1.6.0
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
 * 仕様
 * ウィンドウ画面のX座標は画面の中央になるよう設定されていますが、Y座標は上よりに表示されるようになっています。Y座標を変更するには「ウィンドウY座標」で設定してください。
 * 入手アイテム、習得アイテムは表示範囲が自動で計算されます。
 * レベルアップ表示位置で「アクターの上」を指定の場合、「顔グラ、キャラチップの表示横幅」の表示サイズの中央からの座標となります。また「顔グラ、キャラチップの表示横幅」の
 * サイズにより調整されます。
 * レベルアップ表示位置で「獲得経験値の右」を指定の場合、獲得経験値の右側からの座標となります。獲得経験値の表示を非表示にしている場合はレベルアップの実表示されます。文字の表示幅の調整
 * はされません。
 * レベルアップ表示位置で「座標指定」を指定の場合は、各アクター表示位置左上カラの座標となります。文字の表示幅の調整は行われません。
 * 
 * 
 * アクターの参照変数（レベルアップ画面の独自パラメータ）
 * actor アクターのデータベースデータ　メタデータを取得する場合はこちらから
 * this._actor アクターのゲームデータ
 * 
 * アイテム、スキルのメモ欄
 * <ResultItemColor:[カラーインデックス]> 取得したアイテム、習得したスキルの文字色に色を付けることが出来ます。
 * <ResultItemColor:2> 文字色がカラーインデックス2番の色に変更されます。
 * ※この機能を有効にするには新規獲得アイテムの色を変更するには「アイテム、スキル欄文字色個別変」プラグイン Ver.1.0.2以降が必要となります。
 * 「アイテム、スキル欄文字色個別変」のタグで設定した色変更でも反映されますが、アイテム、スキル欄に表示する色とリザルトでは別の色を設定したい場合などに使用してください。
 * 
 * 獲得金額に金額アイコンを表示させる場合は「所持金拡張プラグイン」のアイコンの表示クラスに"Window_Result"を記入してください。（必ず'及び"で囲む）
 * 
 * プラグインコマンド
 * 「レベルアップ画面表示許可」
 * レベルアップ画面の表示の許可を設定できます。(注：このプラグインコマンドを実行後レベルアップ画面表示の設定が無効化されます）
 * 「勝利BGMの再生許可」
 * 勝利BGMの再生の許可を設定できます。
 * 「勝利BGMの変更」
 * 勝利BGMを変更することが出来ます。BGMに何も指定しないことでプラグインコマンドで指定したBGMは再生されなくなります。
 * 「レベルアップSEの変更」
 * レベルアップSEを変更することが出来ます。BGMに何も指定しないことでプラグインコマンドで指定したBGMは再生されなくなります。
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
 * 2021/3/12 Ver.1.6.0
 * レベルアップ画面に立ち絵を表示する機能を追加。
 * 2021/3/11 Ver.1.5.1
 * 獲得経験値を非表示にできる機能を追加。
 * レベルアップの位置を指定、調整できる機能を追加。(座標指定チェックのみ)
 * プラグインコマンドでレベルアップSEを変更できる機能を追加。
 * 拡大率による高さ調整が顔グラモードではなくキャラチップモードで反映されていた問題を修正。
 * 入手画面のアクター表示（アクター画像、アクター名、レベル、EXP）のY座標を調整できる機能を追加。
 * 2021/3/9 Ver.1.5.0
 * 獲得金額、独自パラメータの設定方法を変更。
 * 戦闘結果の文字の表示位置を左、中央、右から選択し表示できる機能を追加。
 * 2021/3/8 Ver.1.4.7
 * リザルトウィンドウのY座標を変更したとき、ウィンドウがサイズ変更してしまう問題を修正。
 * アクター名・レベル・経験値のフォントサイズで負の数値を入力できなかった問題を修正。
 * ゲージ現在値のフォントサイズの計算が間違っていたので修正。
 * 2021/3/7 Ver.1.4.6
 * ドロップアイテム、習得スキルに色を付ける機能を追加。
 * 入手画面のアクター名、レベル、獲得経験値のフォントサイスを変更できるように変更。
 * 入手画面の獲得経験値、EXPゲージのY位置を指定できる機能を追加。
 * プラグインパラメータ「勝利BGM」に勝利MEを再生させない機能を追加。
 * 入手画面の経験値バーの現在値にフォントサイズを指定できるように変更。
 * タッチUIがOFFの時にウィンドウの表示範囲を上に詰める機能を追加。
 * リザルトウィンドウY座標を調整できる機能を追加。
 * 線の色を変えられる機能を追加。
 * 2021/3/6 Ver.1.4.5
 * 獲得経験率に変化があった時、EXPゲージ、数値の更新フレームが正常に動作していない問題を修正。
 * 拡大率を顔グラモード以外適用しないように修正。
 * レベルアップ画面のステータス差分で差がなかった数値の色がシステムカラーになっていた問題を修正。
 * 2021/3/5 Ver.1.4.4
 * レベルアップ、レベルアップした時のレベル、レベルアップ後のレベル、ステータスの色を指定できる機能を追加。
 * 獲得経験率により通常の獲得経験値よりも多い又は少ない時に、数値に色付け出来る機能を追加。
 * 戦闘不能アクターの名前を赤く表示するように変更。
 * リザルト画面を開いた後、次のページを切り替えるまでの待機フレームを設定する機能を追加。
 * 背景画像がボタンの前面に表示されてしまう問題を修正。
 * 2021/3/4 Ver.1.4.3
 * 獲得経験値が0の時にレベルが表示されない問題を修正。
 * 獲得金額が0の時に金額が表示されない問題を修正。
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
 * @param CommonSetting
 * @text 共通設定
 * 
 * @param WindowSetting
 * @text ウィンドウ設定
 * @parent CommonSetting
 * 
 * @param ResultWidth
 * @desc ウィンドウの横幅。(0でUI横幅)デフォルト:808
 * @text ウィンドウ横幅
 * @type number
 * @default 808
 * @min 0
 * @parent WindowSetting
 * 
 * @param ResultHeight
 * @desc ウィンドウの縦幅。(0でUI縦幅)デフォルト:616
 * @text ウィンドウ縦幅
 * @type number
 * @default 616
 * @min 0
 * @parent WindowSetting
 * 
 * @param ResultWindow_Y
 * @desc ウィンドウのY座標。
 * @text ウィンドウY座標
 * @type number
 * @default 0
 * @min -999999
 * @parent WindowSetting
 * 
 * @param NoTouchUIWindow
 * @type boolean
 * @default false
 * @text タッチUI OFF時ウィンドウ上詰め
 * @desc タッチUIがOFFの時ウィンドウを上に詰めます。
 * @parent WindowSetting
 * 
 * @param BackUiWidth
 * @text 背景サイズをウィンドウサイズに合わせる
 * @desc 背景サイズをウィンドウサイズに合わせる。
 * @type boolean
 * @default true
 * @parent WindowSetting
 * 
 * @param ResultTextPosition
 * @desc 戦闘結果の文字の表示位置を指定します。
 * @text 戦闘結果文字の位置
 * @type select
 * @option 左
 * @value "left"
 * @option 中央
 * @value "center"
 * @option 右
 * @value "right"
 * @default center
 * @parent WindowSetting
 * 
 * @param LineColor
 * @desc ライン（線）の色。
 * @text ライン（線）の色
 * @type number
 * @default 0
 * @parent CommonSetting
 * 
 * @param Decimal
 * @text 小数点桁数
 * @desc 表示出来る小数点桁数。
 * @type number
 * @default 0
 * @min 0
 * @parent CommonSetting
 * 
 * @param DecimalMode
 * @text 端数処理四捨五入
 * @desc 表示外小数点を四捨五入で丸める。（falseで切り捨て）
 * @type boolean
 * @default true
 * @parent CommonSetting
 * 
 * @param GetPage
 * @text 入手画面設定
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
 * @text 顔グラ、キャラチップの表示横幅
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
 * @param ActorResult_Y
 * @desc アクター表示のY座標。
 * @text アクター表示Y座標
 * @type number
 * @default 0
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
 * @text 高さ調整拡大率考慮
 * @desc １キャラ当たりの縦幅を、顔グラの拡大率に合わせて高さ調整します。
 * @parent GetPage
 * 
 * @param LavelUpPosition
 * @desc レベルアップの位置を指定します。
 * @text レベルアップ表示位置
 * @type select
 * @option アクター画像の上
 * @value 1
 * @option 獲得経験値の右
 * @value 2
 * @option 座標指定
 * @value 10
 * @default 1
 * @parent GetPage
 * 
 * @param LevelUp_X
 * @desc レベルアップのX座標
 * @text レベルアップX座標
 * @type number
 * @default 0
 * @parent GetPage
 * 
 * @param LevelUp_Y
 * @desc レベルアップのY座標
 * @text レベルアップY座標
 * @type number
 * @default 0
 * @parent GetPage
 * 
 * @param FontColor
 * @text 文字色設定
 * @parent GetPage
 * 
 * @param LevelUpNameColor
 * @desc レベルアップの文字色
 * @text レベルアップ文字色
 * @type number
 * @default 17
 * @parent FontColor
 * 
 * @param LevelUpValueColor
 * @desc レベルアップした時のレベルの数値の色
 * @text レベルアップ時の数値色
 * @type number
 * @default 17
 * @parent FontColor
 * 
 * @param EXPBoostValueColor
 * @desc 獲得経験値が通常より多い時の数値の色
 * @text 獲得経験値ブースト時数値色
 * @type number
 * @default 0
 * @parent FontColor
 * 
 * @param EXPResistValueColor
 * @desc 獲得経験値が通常よりも少ない時の数値の色
 * @text 獲得経験値レジスト時数値色
 * @type number
 * @default 0
 * @parent FontColor
 * 
 * @param FontSize
 * @text フォントサイズ設定
 * @parent GetPage
 * 
 * @param ActorNameFontSize
 * @desc アクター名のフォントサイズ（メインフォントサイズからの差）
 * @text アクター名フォントサイズ
 * @type number
 * @default 0
 * @parent FontSize
 * @min -99
 * 
 * @param LevelFontSize
 * @desc レベルのフォントサイズ（メインフォントサイズからの差）
 * @text レベルフォントサイズ
 * @type number
 * @default 0
 * @parent FontSize
 * @min -99
 * 
 * @param EXPFontSize
 * @desc 獲得経験値のフォントサイズ（メインフォントサイズからの差）
 * @text 獲得経験値フォントサイズ
 * @type number
 * @default -4
 * @parent FontSize
 * @min -99
 * 
 * @param LevelUpFontSize
 * @desc レベルアップのフォントサイズ（メインフォントサイズからの差）
 * @text レベルアップフォントサイズ
 * @type number
 * @default 0
 * @parent FontSize
 * @min -99
 * 
 * @param ExpSetting
 * @text ゲージ設定
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
 * @parent ExpSetting
 * 
 * @param GainEXPVisible
 * @type boolean
 * @default true
 * @text 獲得経験値を表示する
 * @desc 獲得経験値を表示します。
 * @parent ExpSetting
 * 
 * @param EXP_Y
 * @desc 獲得経験値のY座標（デフォルト:30）
 * @text 獲得経験値Y座標
 * @type number
 * @default 30
 * @min -999
 * @parent ExpSetting
 * 
 * @param Gauge_Margin
 * @desc EXPゲージの余白範囲
 * @text EXPゲージ余白範囲
 * @type number
 * @default 40
 * @parent ExpSetting
 * 
 * @param GaugeRefreshFrame
 * @desc EXPゲージの更新フレーム
 * @text EXPゲージ更新フレーム
 * @type number
 * @default 100
 * @min 0
 * @parent ExpSetting
 * 
 * @param GaugeValueFontSize
 * @desc ゲージ現在値数値のフォントサイズ。（メインフォントサイズからの差）
 * @text ゲージ現在値数値のフォントサイズ
 * @type number
 * @default -6
 * @min -100
 * @parent ExpSetting
 * 
 * @param GaugeMaxValueFontSize
 * @desc ゲージ最大値数値のフォントサイズ。（メインフォントサイズからの差）
 * @text ゲージ最大値数値のフォントサイズ
 * @type number
 * @default -6
 * @min -100
 * @parent ExpSetting
 * 
 * @param GaugeMaxValueY
 * @type number
 * @default 0
 * @text ゲージ最大値Y座標調整
 * @desc ゲージ最大値のY座標を調整します。（表示位置からの相対座標）
 * @parent ExpSetting
 * 
 * @param GainParam
 * @text 入手項目の設定
 * @desc 入手項目の設定。
 * @default ["{\"GainParamName\":\"獲得金額\",\"GainParamDate\":\"1\",\"GainParamEval\":\"\"}","{\"GainParamName\":\"\",\"GainParamDate\":\"20\",\"GainParamEval\":\"\"}"]
 * @type struct<GainParamList>[]
 * @parent GetPage
 * 
 * @param DropItem_Y
 * @desc 入手アイテムのY座標調整。(表示位置からの相対座標)
 * @text 入手アイテムのY座標調整
 * @type number
 * @default 0
 * @min -999
 * @parent GetPage
 * 
 * @param PartyPageRefreshFrame
 * @desc ページ切り替えまでの待機フレーム
 * @text 待機フレーム
 * @type number
 * @default 0
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
 * @param ActorImg
 * @text アクター画像設定
 * @parent LevelUpPage
 * 
 * @param ButlerActors
 * @text 表示アクター設定
 * @desc 画像を表示するアクターを指定します。
 * @type struct<ActorButlerList>[]
 * @parent ActorImg
 * 
 * @param ActorPosition
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
 * @param LavelUpWindowShow
 * @type boolean
 * @default true
 * @text レベルアップ画面表示
 * @desc レベルアップ画面表示します。falseでレベルアップ後のステータス差分、習得スキル演出をカットします。
 * @parent LevelUpPage
 * 
 * @param DifferenceStatusColor
 * @desc レベルアップ後のステータスの数値の色
 * @text レベルアップ後ステータス数値色
 * @type number
 * @default 24
 * @parent LevelUpPage
 * 
 * @param ActorOriginalSetting
 * @text 独自パラメータ設定
 * @parent LevelUpPage
 * 
 * @param ActorOriginalParamName
 * @text 独自パラメータ名称
 * @desc レベルアップ画面に表示する独自パラメータの名称を設定します。
 * @type string
 * @default
 * @parent ActorOriginalSetting
 * 
 * @param ActorOriginalParam
 * @text 独自パラメータ評価式
 * @desc レベルアップ画面に表示する独自パラメータの評価式を設定します。
 * @type string
 * @default
 * @parent ActorOriginalSetting
 * 
 * @param ActorOriginalParamName2
 * @text 独自パラメータ名称２
 * @desc レベルアップ画面に表示する独自パラメータの名称を設定します。
 * @type string
 * @default
 * @parent ActorOriginalSetting
 * 
 * @param ActorOriginalParam2
 * @text 独自パラメータ評価式２
 * @desc レベルアップ画面に表示する独自パラメータの評価式を設定します。
 * @type string
 * @default
 * @parent ActorOriginalSetting
 * 
 * @param ActorPageRefreshFrame
 * @desc ページ切り替えまでの待機フレーム
 * @text 待機フレーム
 * @type number
 * @default 0
 * @parent LevelUpPage
 * 
 * @param ActorBackGroundImg
 * @desc 背景画像ファイル名を指定します。
 * @text 背景画像
 * @type file
 * @dir img/pictures
 * @parent LevelUpPage
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
 * @text BGMの音量
 * @desc BGMを音量を設定します。
 * @default 90
 * @parent BGMSetting
 * @min 0
 * 
 * @param VictoryPitch
 * @text BGMのピッチ
 * @desc BGMをピッチを設定します。
 * @default 100
 * @parent BGMSetting
 * 
 * @param VictoryPan
 * @text BGMの位相
 * @desc BGMを位相を設定します。
 * @default 0
 * @parent BGMSetting
 * 
 * 
 * 
 * @command LevelUP_SESelect
 * @desc レベルアップ時のSEを変更します。
 * @text レベルアップSEの変更
 * 
 * @arg LevelUP_SE
 * @text レベルアップSE
 * @desc レベルアップSEを指定します。何も指定しないことでMEが初期化されます。
 * @type file
 * @dir audio/se
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
 * @command VictoryBGM
 * @desc 勝利BGMの再生の許可を変更します。
 * @text 勝利BGM再生許可
 * 
 * @arg VictoryBGMEnable
 * @type boolean
 * @default true
 * @desc 勝利BGMの再生の許可します。
 * @text 勝利BGMの再生の許可
 * 
 * 
 * @command VictoryBGMSelect
 * @desc 勝利BGMを変更します。
 * @text 勝利BGMの変更
 * 
 * @arg _BGM
 * @text 勝利BGM
 * @desc 勝利BGMを変更します。何も指定しないことでBGMが初期化されます。
 * @type file
 * @dir audio/bgm
 * 
 * @arg Volume
 * @text BGMの音量
 * @desc BGMを音量を設定します。
 * @default 90
 * 
 * @arg Pitch
 * @text BGMのピッチ
 * @desc BGMをピッチを設定します。
 * @default 100
 * 
 * @arg Pan
 * @text BGMの位相
 * @desc BGMを位相を設定します。
 * @default 0
 * 
 * @arg NoVictoryME
 * @type boolean
 * @default false
 * @text 勝利ME再生なし
 * @desc 勝利MEを再生しません。
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
/*~struct~GainParamList:

 * @param GainParamName
 * @text 名称
 * @desc 表示名称を設定します。
 * @default 
 * @type string
 * 
 * @param GainParamDate
 * @text 表示項目
 * @desc 表示項目を指定します。
 * @type select
 * @option 表示なし
 * @value 0
 * @option 獲得金額
 * @value 1
 * @option 獲得経験値
 * @value 2
 * @option 評価式
 * @value 10
 * @option 線
 * @value 20
 * @default 0
 * 
 * @param GainParamEval
 * @text 評価式
 * @desc 評価式を記入します。
 * @default
 * @type string
 * 
 */
/*~struct~ActorButlerList:
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

var Imported = Imported || {};
Imported.NUUN_Result = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_Result');
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

param.GainParam = param.GainParam || [];
let gaugeWidth = 300;

const pluginName = "NUUN_Result";

PluginManager.registerCommand(pluginName, 'LevelUP_SESelect', args => {
  BattleManager.levelUpSeSelect(args);
});

PluginManager.registerCommand(pluginName, 'VictoryBGM', args => {
  BattleManager.victoryBGMEnable(eval(args.VictoryBGMEnable));
});

PluginManager.registerCommand(pluginName, 'VictoryBGMSelect', args => {
  BattleManager.victoryBGMSelect(args);
});

PluginManager.registerCommand(pluginName, 'LevelUpPage', args => {
  BattleManager.levelUpPageEnable(eval(args.LevelUpPageEnable));
});

const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
  _Game_Actor_initMembers.call(this);
  this.resultActorImg = null;
  this.resultActorBitmap = null;
};

const _Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
  _Game_Actor_setup.call(this, actorId);
  this.initResultActorImg(actorId);
};

Game_Actor.prototype.initResultActorImg = function(id) {
  const list = param.ButlerActors.find(actors => actors.actorId === id);console.log(list)
  if (list) {
    this.resultActorImg = list || [];
    this.resultActorBitmap = list.ActorImg;
  }
};


const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
  _Scene_Battle_createAllWindows.call(this);
  this.createResultBaseSprite();
  this.createResultHelpWindow();
  this.createResultWindow();
  this.createResultDropItemWindow();
  this.createResultButtons();
};

Scene_Battle.prototype.createResultBaseSprite = function() {
  this._resultBaseSprite = null;
  if (param.PartyBackGroundImg || param.ActorBackGroundImg) {
    const sprite = new Sprite();
    this._resultBaseSprite = sprite;
    this.addChild(sprite);
    this.createResultBackGround();
  }
};

Scene_Battle.prototype.createResultBackGround = function() {
  if (this._resultBaseSprite) {
    if (param.PartyBackGroundImg) {
      const partySprite = new Sprite();
      this._resultBaseSprite.addChild(partySprite);
      partySprite.bitmap = ImageManager.loadPicture(param.PartyBackGroundImg);
      this._backGroundPartySprite = partySprite;
      partySprite.hide();
      if (partySprite.bitmap && !partySprite.bitmap.isReady()) {
        partySprite.bitmap.addLoadListener(this.resultBackGround.bind(this, partySprite));
      } else {
        this.resultBackGround(partySprite);
      }
    }
    if (param.ActorBackGroundImg) {
      const actorSprite = new Sprite();
      this._resultBaseSprite.addChild(actorSprite);
      actorSprite.bitmap = ImageManager.loadPicture(param.ActorBackGroundImg);
      this._backGroundActorSprite = actorSprite;
      actorSprite.hide();
      if (actorSprite.bitmap && !actorSprite.bitmap.isReady()) {
        actorSprite.bitmap.addLoadListener(this.resultBackGround.bind(this, actorSprite));
      } else {
        this.resultBackGround(actorSprite);
      }
    }
  } 
};

Scene_Battle.prototype.resultBackGround = function(sprite) {
  if(param.BackUiWidth) {
    sprite.x = (Graphics.width - (Graphics.boxWidth + 8)) / 2 + (param.ResultWidth > 0 ? (Graphics.boxWidth - param.ResultWidth) / 2 : 0);
    sprite.y = (Graphics.height - (Graphics.boxHeight + 8)) / 2;
    const width = (param.ResultWidth > 0 ? param.ResultWidth : Graphics.boxWidth) + 8;
    const height = (param.ResultHeight > 0 ? param.ResultHeight : Graphics.boxHeight) + 8;
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
  const wx = (param.ResultWidth > 0 ? (Graphics.boxWidth - param.ResultWidth) / 2 : 0);
  const wy = this.resultHelpAreaTop();
  const ww = param.ResultWidth > 0 ? param.ResultWidth : Graphics.boxWidth;
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
  const wx = (param.ResultWidth > 0 ? (Graphics.boxWidth - param.ResultWidth) / 2 : 0);
  const wy = this.resultHelpAreaTop() + this.resultHelpAreaHeight();
  const ww = param.ResultWidth > 0 ? param.ResultWidth : Graphics.boxWidth;
  const wh = (param.ResultHeight > 0 ? param.ResultHeight : Graphics.boxHeight) - wy + param.ResultWindow_Y;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.createResultDropItemWindow = function() {
  const rect = this.resultDropItemWindowRect();
  this._resultDropItemWindow = new Window_ResultDropItem(rect);
  this._resultDropItemWindow.hide();
  if (this._resultBaseSprite) {
    this._resultBaseSprite.addChild(this._resultDropItemWindow);
  } else {
    this.addChild(this._resultDropItemWindow);
  }
  this._resultDropItemWindow.setWindowResult(this._resultWindow);
};

Scene_Battle.prototype.resultDropItemWindowRect = function() {
  const wx = (Graphics.width - Graphics.boxWidth) / 2 + (param.ResultWidth > 0 ? (Graphics.boxWidth - param.ResultWidth) / 2 : 0);
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
  this._okResultButton = new Sprite_Button("ok");(param.ResultWidth > 0 ? (Graphics.boxWidth - param.ResultWidth) / 2 : 0)
  this._okResultButton.x = (param.ResultWidth > 0 ? (Graphics.boxWidth - param.ResultWidth) / 2 + param.ResultWidth: Graphics.boxWidth) - this._okResultButton.width - 4;
  this._okResultButton.y = this.resultbuttonY();
  this._downResultButton = new Sprite_Button("pagedown");
  this._downResultButton.x = this._okResultButton.x - (24 + this._downResultButton.width);
  this._downResultButton.y = this.resultbuttonY();
  this._upResultButton = new Sprite_Button("pageup");
  this._upResultButton.x = this._downResultButton.x - this._downResultButton.width - 4;
  this._upResultButton.y = this.resultbuttonY();
  if (this._resultBaseSprite) {
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
  const y = param.ResultWindow_Y;
  if (param.NoTouchUIWindow && !ConfigManager.touchUI) {
    return y;
  }
  return y + this.buttonAreaHeight();
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
    BattleManager.resultRefresh = param.ActorPageRefreshFrame;
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
  BattleManager.resultRefresh = param.PartyPageRefreshFrame;
};

Scene_Battle.prototype.backGroundPartyShow = function() {
  if (this._backGroundPartySprite) {
    this._resultHelpWindow.opacity = 0;
    this._resultHelpWindow.frameVisible = false;
    this._resultWindow.opacity = 0;
    this._resultWindow.frameVisible = false;
    this._backGroundPartySprite.show();
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
  if (BattleManager.resultRefresh > 0) {
    BattleManager.resultRefresh--;
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
  this.drawText(param.ResultName, rect.x, rect.y, rect.width, param.ResultTextPosition);
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
  const scale = param.ActorShow === 1 ? param.FaceScale / 100 : 1;
  const rect = this.itemRect(0);
  const lineHeight = this.lineHeight();
  const itemPadding = this.itemPadding();
  if (this.page === 0) {
    const height = param.FaceScaleHeight ? Math.floor(param.FaceHeight * scale) : param.FaceHeight;
    const faceArea = rect.x + Math.floor(param.FaceWidth * scale) + itemPadding;
    const x2 = rect.x + (rect.width - Math.floor(rect.width / 2.6));
    gaugeWidth = rect.width - Math.floor(rect.width / 2.6) - faceArea - 30;
    for (let i = 0; this.actorMembers() > i; i++) {
      this._actor = this.actor(i);
      this._actor._learnSkill = [];
      this._actor._oldStatus = [];
      let y = i * height + rect.y + param.ActorResult_Y;
      if (param.ActorShow === 2) {
        this.drawActorCharacter(rect.x + Math.floor(param.FaceWidth / 2), y + 60);
      } else if (param.ActorShow === 1) {
        this.drawActorFace(rect.x, y, param.FaceWidth, param.FaceHeight);
      }
      this.drawActorName(rect.x + faceArea, y, rect.width - (rect.width - x2) - faceArea - 112);
      this.drawActorLevel(rect.x + x2 - 100, y);
      if (param.LavelUpPosition === 1) {
        this.drawLevelUp(rect.x + param.LevelUp_X, y + param.LevelUp_Y, Math.floor(param.FaceWidth * scale));
      } else if (param.LavelUpPosition === 10) {
        this.drawLevelUp(rect.x + param.LevelUp_X , y + param.LevelUp_Y, rect.width);
      }
      //this.drawExpGauge(rect.x + x2 - (gaugeWidth + param.Gauge_Margin), y + param.EXP_Y + 18);
      this.drawExpGauge(rect.x + x2 - gaugeWidth - 30, y + param.EXP_Y + 18);
      this.drawGetEXP(rect.x + faceArea, y + param.EXP_Y, rect.width);
    }
    this.drawGainList(x2, rect.y, rect.width - x2);
  } else {
    for (let i = 0; this.actorMembers() > i; i++) {
      this.removeExpGauge(this.actor(i));
    }
    this._actor = this.actorLevelUp[this.page - 1];
    const x = rect.x + Math.floor(rect.width / 2) + itemPadding;
    this.drawActorImg();
    this.drawActorFace(rect.x, rect.y, ImageManager.faceWidth, ImageManager.faceHeight);
    this.drawActorStatusName(rect.x + 152, rect.y, rect.width - x - 152);
    this.drawActorStatusLevel(x, rect.y);
    this.drawActorOriginalParam(rect.x + 152, rect.y + lineHeight, rect.width - x - 152);
    //this.drawHorzLine(rect.x + 152, rect.y + lineHeight * 3.5, rect.width - 152);
    this.drawActorStatus(rect.x, rect.y + lineHeight * 3.5, Math.floor(rect.width / 2) - itemPadding);
  }
};

Window_Result.prototype.drawGainList = function(x, y, width) {
  let y2 = y;
  const lineHeight = this.lineHeight();
  const list = param.GainParam;
    for (const date of list) {
      switch (date.GainParamDate) {
        case 0:
          y2 += lineHeight;
          break;
        case 1:
          this.drawGainGold(date, x, y2, width)
          y2 += lineHeight;
          break;
        case 2:
          this.drawGainExp(date, x, y2, width)
          y2 += lineHeight;
          break;
        case 10:
          this.drawPartyOriginalParam(date, x, y2, width)
          y2 += lineHeight;
          break;
        case 20:
          this.drawHorzLine(x, y2, width);
          y2 += lineHeight;
          break;
      }
    }
};

Window_Result.prototype.drawActorImg = function() {
  if (this._actor.resultActorBitmap) {
    const bitmap = ImageManager.loadPicture(this._actor.resultActorBitmap);
    console.log(bitmap)
    if (bitmap && !bitmap.isReady()) {
      bitmap.defaultBitmap.addLoadListener(this.actorImgRefresh.bind(this, bitmap));
    } else {
      this.actorImgRefresh(bitmap);
    }
  }
};

Window_Result.prototype.actorImgRefresh = function(bitmap) {
  const date = this._actor.resultActorImg;
  let x = date.Actor_X;
  const scale = (date.Actor_Scale || 100) / 100;
  if(param.ActorPosition === 0) {
    x += 0;
  } else if (param.ActorPosition === 1) {
    x += Math.floor(this.width / 2 - ((bitmap.width * scale) / 2));
  } else {
    x += this.width - (bitmap.width * scale) - 24;
  }
  const dw = bitmap.width * scale;
  const dh = bitmap.height * scale;
  const y = date.Actor_Y + (this.height - (bitmap.height * scale)) - 24;
  this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, dw, dh);
};

Window_Result.prototype.drawActorFace = function(x, y, width, height) {
  this.drawFace(this._actor.faceName(), this._actor.faceIndex(), x, y, width, height);
};

Window_Result.prototype.drawExpGauge = function(x, y) {
  this.placeExpGauge(this._actor, x, y);
};

Window_Result.prototype.drawActorName = function(x, y, width) {
  if (!this._actor.isAlive()) {
    this.changeTextColor(ColorManager.deathColor());
  }
  this.contents.fontSize = $gameSystem.mainFontSize() + param.ActorNameFontSize;
  this.drawText(this._actor.name(), x, y, width);
  this.contents.fontSize = $gameSystem.mainFontSize();
  this.resetTextColor();
};

Window_Result.prototype.drawActorStatusName = function(x, y, width) {
  if (!this._actor.isAlive()) {
    this.changeTextColor(ColorManager.deathColor());
  }
  this.drawText(this._actor.name(), x, y, width);
  this.resetTextColor();
};

Window_Result.prototype.drawActorLevel = function(x, y) {
  const exp = BattleManager._rewards.exp;
  const actor = this._actor;
  if (!isNaN(exp)) {
    const level = actor.resultGainExp(exp);
    const oldStatus = [];
    this.contents.fontSize = $gameSystem.mainFontSize() + param.LevelFontSize;
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(TextManager.levelA, x, y, 48);
    if (level > actor._level) {
      this._levelUp = true;
      BattleManager._levelUpPageEnable = BattleManager._levelUpPageEnable === undefined || BattleManager._levelUpPageEnable === null ? param.LavelUpWindowShow : BattleManager._levelUpPageEnable;
      for (let i = 0; i < 8; i++) {
        oldStatus[i] = actor.param(i);
      }
      oldStatus.push(actor._level);
      this.actorOldStatus.push(oldStatus);
      this.changeTextColor(ColorManager.textColor(param.LevelUpValueColor));
      if (BattleManager._levelUpPageEnable) {
        this.actorLevelUp.push(actor);
        ImageManager.loadPicture(actor.resultActorBitmap);
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
    this.changeTextColor(ColorManager.textColor(param.LevelUpNameColor));
    this.contents.fontSize = $gameSystem.mainFontSize() + param.LevelUpFontSize;
    const position = param.LavelUpPosition === 1 ? "center" : "left";
    this.drawText(param.LevelUpName, x, y, width, position);
    this.resetTextColor();
    this.contents.fontSize = $gameSystem.mainFontSize();
    this._levelUp = false;
  }
};

Window_Result.prototype.drawGetItems = function(x, y, width) {
  const items = BattleManager._rewards.items;
  const lineHeight = this.lineHeight();
  this.drawText(param.GetItemName, x, y, width, "left");
  if (items) {
    for (let i = 0; items.length > i; i++) {
      let y2 = y + lineHeight * (i + 1);
      this.drawItemName(items[i], x, y2, width);
    }
  }
};

Window_Result.prototype.drawGainGold = function(date, x, y, width) {
  if (!isNaN(BattleManager._rewards.gold)) {
    const gold = date.GainParamEval ? eval(date.GainParamEval) : BattleManager._rewards.gold;
    this.changeTextColor(ColorManager.systemColor());
    if (date.GainParamName) {
      this.drawText(date.GainParamName, x, y, 120, "left");
    }
    this.resetTextColor();
    this.drawCurrencyValue(gold, this.currencyUnit(), x + 120, y, width - 120);
    this.resetTextColor();
  }
};

Window_Result.prototype.drawGainExp = function(date, x, y, width) {
  if (!isNaN(BattleManager._rewards.exp)) {
    const exp = date.GainParamEval ? eval(date.GainParamEval) : BattleManager._rewards.exp;
    this.changeTextColor(ColorManager.systemColor());
    if (date.GainParamName) {
      this.drawText(date.GainParamName, x, y, 120, "left");
    }
    this.resetTextColor();
    this.drawText(exp, x + 120, y,  width - 120, "right");
  }
};

Window_Result.prototype.drawPartyOriginalParam = function(date, x, y, width) {
  if (!isNaN(BattleManager._rewards.exp)) {
    const result = eval(date.GainParamEval);
    this.changeTextColor(ColorManager.systemColor());
    if (date.GainParamName) {
      this.drawText(date.GainParamName, x, y, 120, "left");
    }
    this.resetTextColor();
    this.drawText(result, x + 120, y,  width - 120, "right");
  }
};

Window_Result.prototype.drawActorOriginalParam = function(x, y, width) {
  const actor = this._actor.actor();
  const lineHeight = this.lineHeight();
  if (param.ActorOriginalParam) {
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(param.ActorOriginalParamName, x, y, 120, "left");
    this.resetTextColor();
    this.drawText(eval(param.ActorOriginalParam), x + 120, y, width - 120, "right");
  }
  if (param.ActorOriginalParam2) {
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(param.ActorOriginalParamName2, x, y + lineHeight, 120, "left");
    this.resetTextColor();
    this.drawText(eval(param.ActorOriginalParam2), x + 120, y + lineHeight, width - 120, "right");
  }
};

Window_Result.prototype.drawGetEXP = function(x, y, width) {
  const exp = BattleManager._rewards.exp;
  if (!isNaN(exp)) {
    let x2 = x;
    if (param.GainEXPVisible) {
      const finalExp = Math.round(exp * this._actor.finalExpRate());
      this.contents.fontSize = $gameSystem.mainFontSize() + param.EXPFontSize;
      const textWidth = this.textWidth(param.GetEXPName);
      this.changeTextColor(ColorManager.systemColor());
      this.drawText(param.GetEXPName, x, y, width, "left");
      if (exp > finalExp && finalExp > 0) {
        this.changeTextColor(ColorManager.textColor(param.EXPResistValueColor));
      } else if (exp < finalExp) {
        this.changeTextColor(ColorManager.textColor(param.EXPBoostValueColor));
      } else {
        this.resetTextColor();
      }
      const text = "+"+ finalExp;
      x2 += param.LavelUpPosition === 2 ? Math.min(this.textWidth(text), width - x - 190) + textWidth + (this.itemPadding() * 2) : 0;
      this.drawText(text, x + textWidth + this.itemPadding(), y, width - x - 190, "left");
      this.resetTextColor();
      this.contents.fontSize = $gameSystem.mainFontSize();
    }
    if (param.LavelUpPosition === 2) {
      this.drawLevelUp(x2 + param.LevelUp_X, y + param.LevelUp_Y, width);
    }
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
  this.changeTextColor(ColorManager.textColor(param.DifferenceStatusColor));
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
      this.changeTextColor(ColorManager.textColor(param.DifferenceStatusColor));
    } else {
      this.resetTextColor();
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
  const scale = this.page === 0 ? param.FaceScale / 100 : 1;
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
  this.contents.fillRect(x, lineY, width, 2, ColorManager.textColor(param.LineColor));
  this.contents.paintOpacity = 255;
};

Window_Result.prototype.onTouchCancel = function() {
  if (this.isCancelEnabled()) {
      this.processOk();
  }
};

Window_Result.prototype.processOk = function() {
  if (BattleManager.resultRefresh === 0) {
    Window_StatusBase.prototype.processOk.call(this);
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
  this.dropItemRows = Math.floor((this.innerHeight - this.lineHeight() * (this.gainParamLength() + 1)) / this.lineHeight());
  this.skillRows = Math.floor((this.innerHeight - this.lineHeight() * 5.5) / this.lineHeight());
  this.opacity = 0;
  this.frameVisible = false;
};

Window_ResultDropItem.prototype.gainParamLength = function() {
  return param.GainParam.length;
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
    this.drawGetItems(x, rect.y, rect.width - x);
  }
};

Window_ResultDropItem.prototype.drawGetItems = function(x, y, width) {
  const items = BattleManager._rewards.items;
  const lineHeight = this.lineHeight();
  const maxPage = this.maxPages();
  y += this.gainParamLength() * lineHeight + param.DropItem_Y;
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(param.GetItemName, x, y, width - 48, "left");
  this.resetTextColor();
  if (items) {
    const index = this.dropItemRows * this.page;
    const maxItems = Math.min(this.dropItemRows, items.length - index);
    if (maxPage > 1) {
      this.drawText(this.page + 1 +"/"+maxPage, x, y, width, "right");
    }
    for (let i = 0; maxItems > i; i++) {
      let y2 = y + lineHeight * (i + 1);
      this.resetTextColor();
      this.drawItemName(items[i + index], x, y2, width);
    }
  }
};

Window_ResultDropItem.prototype.drawItemName = function(item, x, y, width) {
  if (Imported.NUUN_ItemNameColor && item.meta.ResultItemColor) {
    this.nameColor = ColorManager.textColor(Number(item.meta.ResultItemColor))
  }
  Window_Base.prototype.drawItemName.call(this, item, x, y, width);
};

Window_ResultDropItem.prototype.drawLearnSkill = function(actor, x, y, width) {
  const lineHeight = this.lineHeight();
  const learnSkill = actor._learnSkill;
  const maxPage = this.maxPages();
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(param.learnSkillName, x, y, width - 48, "left");
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
  this._maxValueY = param.GaugeMaxValueY;
};

Sprite_ResultExpGauge.prototype.bitmapWidth = function() {
  return gaugeWidth;
};


Sprite_ResultExpGauge.prototype.gaugeX = function() {
  return param.Gauge_Margin;
};

Sprite_ResultExpGauge.prototype.valueFontSize = function() {
  return $gameSystem.mainFontSize() + param.GaugeValueFontSize;
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
    this._resultExpMoveMode = param.GaugeRefreshFrame > 0 && param.GaugeValueShow ? true : false;
    let expValue = this.currentValue();
    if (param.GaugeValueShow > 0) {
      this.setupValueFont();
      if (param.GaugeValueShow === 1) {
        expValue = this.maxLavel() ? "----------" : expValue;
        this.bitmap.drawText(expValue, width - 100, 0, 100, height, "right");
      } else if (param.GaugeValueShow === 2) {
        expValue = this.maxLavel() ? "----------" : expValue;
        if (!this.maxLavel()) {
          this.bitmap.fontSize = $gameSystem.mainFontSize() + param.GaugeMaxValueFontSize;
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
    this._resultExpMoveDelay = (currentValue - this._resultExpMoveValue) / (param.GaugeRefreshFrame > 0 ? this.smoothness() : 1);
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
    if (BattleManager._levelUpSeDate) {
      AudioManager.playSe(BattleManager._levelUpSeDate);
    } else {
      AudioManager.playSe({"name":param.LevelUpSe,"volume":param.volume,"pitch":param.pitch,"pan":param.pan});
    }
  }
};

Sprite_ResultExpGauge.prototype.smoothSpeed = function() {
  return (this.currentValue() - this._startCurrentExp) / (BattleManager._rewards.exp * this._battler.finalExpRate());
};

Sprite_ResultExpGauge.prototype.smoothness = function() {
  return Math.max(Math.floor(Sprite_Gauge.prototype.smoothness.call(this) * this.smoothSpeed()), 1);
};

const _Sprite_Gauge_smoothness = Sprite_Gauge.prototype.smoothness;
Sprite_Gauge.prototype.smoothness = function() {
  return this._statusType === "result_exp" ? param.GaugeRefreshFrame : _Sprite_Gauge_smoothness.call(this);
};

Sprite_ResultExpGauge.prototype.currentDecimal = function(val) {
  if (param.DecimalMode) {
    return Math.round(val * (param.Decimal > 0 ? Math.pow(10, param.Decimal) : 1)) / (param.Decimal > 0 ? Math.pow(10, param.Decimal) : 1);
  } else {
    return Math.floor(val * (param.Decimal > 0 ? Math.pow(10, param.Decimal) : 1)) / (param.Decimal > 0 ? Math.pow(10, param.Decimal) : 1);
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
  this.resultRefresh = 0;
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
    } else if (param.VictoryBGM) {
      AudioManager.playBgm(this.playVictoryBgm());
      this._victoryBGMOn = true;
      return;
    }
  }
  _BattleManager_replayBgmAndBgs.call(this);
};

BattleManager.playVictoryBgm = function() {
  const _victoryBgm = {};
  _victoryBgm.name = param.VictoryBGM;
  _victoryBgm.volume = param.VictoryVolume;
  _victoryBgm.pitch = param.VictoryPitch;
  _victoryBgm.pan = param.VictoryPan;
  return _victoryBgm;
};

BattleManager.victoryBGMSelect = function(bgmDate) {
  if (!bgmDate._BGM) {
    this._victoryBgmDate = {};
    this._noVictoryME = false;
    return;
  }
  this._victoryBgmDate = {};
  this._victoryBgmDate.name = String(bgmDate._BGM);
  this._victoryBgmDate.volume = Number(bgmDate.Volume);
  this._victoryBgmDate.pitch = Number(bgmDate.Pitch);
  this._victoryBgmDate.pan = Number(bgmDate.Pan);
  this._noVictoryME = eval(bgmDate.NoVictoryME);
};

BattleManager.levelUpSeSelect = function(bgmSe) {
  if (!bgmSe.LevelUP_SE) {
    this._levelUpSeDate = {};
    return;
  }
  this._levelUpSeDate = {};
  this._levelUpSeDate.name = String(bgmSe.LevelUP_SE);
  this._levelUpSeDate.volume = Number(bgmSe.Volume);
  this._levelUpSeDate.pitch = Number(bgmSe.Pitch);
  this._levelUpSeDate.pan = Number(bgmSe.Pan);
};

const _BattleManager_playVictoryMe = BattleManager.playVictoryMe;
BattleManager.playVictoryMe = function() {
  if (!this._noVictoryME) {
    _BattleManager_playVictoryMe.call(this);
  }
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