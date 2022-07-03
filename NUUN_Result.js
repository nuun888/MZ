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
 * @plugindesc リザルト
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.15.1
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
 * 背景画像を設定して「背景サイズをウィンドウサイズに合わせる」をfalseに設定した時の仕様について
 * レベルアップ画面のアクター画像はUIサイズ、リザルト画面ウィンドウのサイズではなく、ゲーム画面サイズに合わせて表示されます。
 * このモードのみボタンの表示位置を変更可能です。ボタン設定での座標指定はゲーム画面左上からの絶対座標となっています。-1を指定することでリザルトウィンドウサイズに合わせます。
 * 
 * 背景画像はいずれもプラグインパラメータのリストの１番目のみ反映されます。
 * アクターの立ち絵はプラグインパラメータのリストに複数設定可能です。（初期設定では1番目の立ち絵が表示されます）
 * 立ち絵はプラグインコマンドで変更できます。
 * 
 * 背景画像、アクター画像（立ち絵）を表示するにはNUUN_Baseが必要です。
 * 
 * アクターの参照変数（レベルアップ画面の独自パラメータ）
 * actor アクターのデータベースデータ　メタデータを取得する場合はこちらから
 * this._actorまたはdactor アクターのゲームデータ
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
 * 「レベルアップ画面アクター画像変更」
 * 立ち絵の画像を変更します。
 * 
 * 操作
 * エンター　切り替え、画面を閉じる 右クリック
 * ←→　ドロップアイテム、習得スキルページ切り替え
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/7/3 Ver.1.15.1
 * レベルアップ時の差分処理を修正。
 * レベルアップ差分ステータスに装備補正等なしのパラメータを指定できる機能を追加。
 * 2022/7/2 Ver.1.15.0
 * 盗んだアイテムを表示する機能を追加。
 * EXPゲージがはみ出る問題を修正。
 * 獲得経験値ゲージX座標の仕様変更。(下限0)
 * 2022/5/12 Ver.1.14.6
 * レベルアップ画面表示時戦闘結果テキストを空白指定しなときに何も表示しないように変更。
 * 2022/5/3 Ver.1.14.5
 * スキル習得一覧とレベルアップ差分表示が重なってしまう問題を修正。
 * 2022/5/1 Ver.1.14.4
 * EXP獲得ゲージの座標を調整できる機能を追加。
 * 2022/4/26 Ver.1.14.3
 * レベルアップ画面のレベルの差分表示の幅を指定できる機能を追加。
 * 2022/1/1 Ver.1.14.2
 * 一部処理を修正。
 * 2021/12/17 Ver.1.14.1
 * 立ち絵、顔グラEXで画像表示時の画像開始地点を設定できる機能を追加。
 * 入手項目の設定でオリジナル項目が表示しない問題を修正。
 * 2021/12/15 Ver.1.14.0
 * ドロップアイテムを個数表示に表示できる機能を追加。
 * 立ち絵、顔グラ表示EXに対応。
 * 2021/11/26 Ver.1.13.1
 * 背景画像を設定するとレベルアップ画面で操作ができなくなる問題を修正。
 * レベルアップ画面のメインウィンドウにスキンを設定できる機能を追加。
 * 2021/11/6 Ver.1.13.0
 * レベルアップ画面のヘルプウィンドウにレベルアップ時のテキストを表示させる機能を追加。
 * 2021/9/19 Ver.1.12.4
 * コアスクリプトVer.1.3.3による修正。
 * 2021/8/9 Ver.1.12.3
 * サポートアクターを表示するように修正。
 * 2021/8/7 Ver.1.12.2
 * 控えメンバーを表示する機能を追加。
 * 2021/7/31 Ver.1.12.1
 * 競合対策
 * 2021/7/10 Ver.1.12.0
 * ウィンドウの処理を変更。（レベルアップ画面では戦闘結果ウィンドウを表示しないように変更しました）
 * レベルアップ時のアクター毎にウィンドウスキン又は背景画像を指定できる機能を追加。
 * 画像ロードの処理を修正。
 * 左クリックでのページ送りを廃止。
 * 2021/7/4 Ver.1.11.1
 * 戦闘終了時にコマンド選択中のアクターのモーションが正常に表示されない問題を修正。
 * 2021/7/2 Ver.1.11.0
 * 戦闘結果の設定を空白にしたときにundefinedと表示されてしまう問題を修正。
 * レベルアップのアクター切り替え時にSEを指定できる機能を追加。
 * リザルト画面表示までの待機フレーム中のサイドビューアクターの処理を変更。
 * リザルト画面をフェードインさせて表示する機能を追加。
 * 背景画像をフェードインさせて表示させるように変更。
 * 2021/6/29 Ver.1.10.3
 * アクターを複数列に設定したとき２列目以降のアクターの獲得経験値が表示されない問題を修正。
 * アクターを複数列に設定したときにアクターの表示枠の高さに列数が考慮していなかった問題を修正。
 * 2021/6/27 Ver.1.10.2
 * 入手画面のアクターを複数列に表示する機能を追加。
 * 2021/6/13 Ver.1.10.1
 * 入手アイテムの文字が枠内からはみ出てしまう問題を修正。
 * 2021/6/13 Ver.1.10.0
 * アクターの獲得経験値表示を表示しない機能を追加。
 * メンバーによってアクターの獲得経験値表示の縦幅を調整する機能を追加。
 * 2021/6/6 Ver.1.9.2
 * 顔グラ以外でアクター画像の表示横幅が反映されていなかった問題を修正。
 * 2021/6/6 Ver.1.9.1
 * アクター画像に合わせてアクター名、獲得経験値の座標を調整するように修正。
 * キャラ画像が表示されない問題を修正。
 * 2021/6/5 Ver.1.9.0
 * サイドビューアクターを表示できる機能を追加。
 * 戦闘終了後からリザルト表示までコマンドなどのウィンドウを閉じるように修正。
 * 2021/5/18 Ver.1.8.1
 * 戦闘中にメンバーチェンジをした際、交代前メンバーのEXPゲージが残ってしまう問題を修正。
 * 2021/5/15 Ver.1.8.0
 * リザルトの表示を遅延させる機能を追加。
 * 各ウィンドウ毎にスキンを設定できる機能を追加。
 * 2021/5/4 Ver.1.7.5
 * 旧バージョンからアップデートした後にリザルト画面が表示されるとエラーが出る問題を修正。
 * 2021/5/4 Ver.1.7.4
 * レベルアップ画面で顔グラを非表示にした際に、線を非表示にする機能を追加。
 * 2021/5/3 Ver.1.7.3
 * 背景画像を指定して立ち絵を設定していないアクターがレベルアップしたときにエラーが出る問題を修正。
 * 背景画像を指定してレベルアップするとアクター立ち絵がキャラ切り替えのたびにサイズがおかしくなってしてしまう問題を修正。
 * 2021/4/24 Ver.1.7.2
 * Ver.1.7.1以前のバージョンから立ち絵を設定した状態でアップデートすると戦闘終了時にエラーが出る問題を修正。
 * 2021/4/23 Ver.1.7.1
 * プラグインコマンドでアクター立ち絵を変更できる機能を追加。
 * 背景画像、アクター画像のフォルダーを指定できるように変更。
 * レベルアップ画面のアクター画像を設定してリザルト表示後すぐにレベルアップ画面に移行するとエラーが出る問題を修正。
 * 2021/4/11 Ver.1.7.0
 * レベルアップ画面のステータスを任意に表示できるように変更。
 * レベルアップ画面のステータスとオリジナルパラメータの表示を統合。
 * 2021/3/25 Ver.1.6.8
 * ウィンドウのX座標をマイナスに設定できるように変更。
 * レベルアップ画面の背景画像が参照されないエラーを修正。
 * 2021/3/24 Ver.1.6.7
 * 「共通処理」(NUUN_Base)を導入していないとエラーが出る問題を修正。
 * 2021/3/19 Ver.1.6.6
 * リザルト表示時のアクターステータスウィンドウを閉じる選択項目を追加。
 * 2021/3/17 Ver.1.6.5
 * アクター画像の参照先が変更されていなかった問題を修正。
 * 2021/3/14 Ver.1.6.4
 * 背景画像設定時の立ち絵の表示方法を変更。
 * リザルト画面のX座標を調整できる機能を追加。
 * ウィンドウのY座標を変更したときにボタンの表示位置も移動しない問題を修正。
 * フォルダーの参照先を変更。
 * 2021/3/13 Ver.1.6.3
 * 表示アクター設定を未入力の状態でゲームを開始するとエラーが出る問題を修正。
 * 2021/3/13 Ver.1.6.2
 * 立ち絵を変更した後にセーブしたデータをロードをロードすると変更した画像が反映されない問題を修正。
 * 2021/3/12 Ver.1.6.1
 * 立ち絵を新規に設定した後にセーブしたデータをロードすると画像が表示されない問題を修正。
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
 * @default ------------------------------
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
 * @param ResultVisibleFrame
 * @desc 勝利後リザルト画面が表示されるまでのフレーム数
 * @text 勝利後リザルト画面遅延フレーム数
 * @type number
 * @default 0
 * @min 0
 * @parent CommonSetting
 * 
 * @param ResultFadein
 * @type boolean
 * @default false
 * @text フェードイン表示
 * @desc リザルト画面をフェードインで表示する。
 * @parent CommonSetting
 * 
 * 
 * @param WindowSetting
 * @text ウィンドウ設定
 * @default ------------------------------
 * 
 * @param ResultWindowCenter
 * @type boolean
 * @default true
 * @text ウィンドウを中央表示
 * @desc ウィンドウを中央に表示します。ウィンドウのX座標はウィンドウ表示位置からの相対座標になります。
 * @parent WindowSetting
 * 
 * @param CloseActorStatusWindow
 * @type boolean
 * @default false
 * @text 表示時アクターウィンドウ非表示
 * @desc リザルト画面表示時にアクターステータスウィンドウを非表示にします。
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
 * @param GetWindowSetting
 * @text 入手ウィンドウ設定
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param ResultWidth
 * @desc ウィンドウの横幅。(0でUI横幅)
 * @text ウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent GetWindowSetting
 * 
 * @param ResultHeight
 * @desc ウィンドウの縦幅。(0でUI縦幅)デフォルト:616
 * @text ウィンドウ縦幅
 * @type number
 * @default 616
 * @min 0
 * @parent GetWindowSetting
 * 
 * @param ResultWindow_X
 * @desc ウィンドウのX座標。
 * @text ウィンドウX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent GetWindowSetting
 * 
 * @param ResultWindow_Y
 * @desc ウィンドウのY座標。
 * @text ウィンドウY座標
 * @type number
 * @default 0
 * @min -999999
 * @parent GetWindowSetting
 * 
 * @param LevelUpWindowSetting
 * @text レベルアップウィンドウ設定
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param LevelUpResultWidth
 * @desc ウィンドウの横幅。(0でUI横幅)
 * @text ウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent LevelUpWindowSetting
 * 
 * @param LevelUpResultHeight
 * @desc ウィンドウの縦幅。(0でUI縦幅)デフォルト:616
 * @text ウィンドウ縦幅
 * @type number
 * @default 616
 * @min 0
 * @parent LevelUpWindowSetting
 * 
 * @param LevelUpResultWindow_X
 * @desc ウィンドウのX座標。
 * @text ウィンドウX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent LevelUpWindowSetting
 * 
 * @param LevelUpResultWindow_Y
 * @desc ウィンドウのY座標。
 * @text ウィンドウY座標
 * @type number
 * @default 0
 * @min -999999
 * @parent LevelUpWindowSetting
 * 
 * 
 * @param HelpWindowSetting
 * @text 戦闘結果ウィンドウ設定
 * @default ------------------------------
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
 * @default 'center'
 * @parent HelpWindowSetting
 * 
 * @param LevelUpResultTextPosition
 * @desc レベルアップ画面の戦闘結果の文字の表示位置を指定します。
 * @text レベルアップ画面戦闘結果文字の位置
 * @type select
 * @option 制御文字使用可(左揃え)
 * @value "TextEx"
 * @option 左
 * @value "left"
 * @option 中央
 * @value "center"
 * @option 右
 * @value "right"
 * @default "TextEx"
 * @parent HelpWindowSetting
 * 
 * @param SkinSetting
 * @text ウィンドウスキン設定
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param ResultWindowsSkin
 * @desc リザルト結果ウィンドウ（上部）のウィンドウスキンを指定します。
 * @text リザルト結果ウィンドウのスキン
 * @type file
 * @dir img/system
 * @default 
 * @parent SkinSetting
 * 
 * @param ResultMainWindowsSkin
 * @desc 最初のページのリザルトメインのウィンドウのウィンドウスキンを指定します。
 * @text 最初ページリザルトウィンドウのスキン
 * @type file
 * @dir img/system
 * @default 
 * @parent SkinSetting
 * 
 * @param ResultLevelWindowsSkin
 * @desc レベルアップページのリザルトメインのウィンドウのウィンドウスキンを指定します。
 * @text レベルアップリザルトウィンドウのスキン
 * @type file
 * @dir img/system
 * @default 
 * @parent SkinSetting
 * 
 * @param ButtonSetting
 * @text ボタン設定
 * @desc この設定は「背景サイズをウィンドウサイズに合わせる」をfalseに設定した時のみ有効になります。
 * @default ------------------------------
 * @parent CommonSetting
 * 
 * @param ResultButton_X
 * @desc ボタンのX座標。(背景サイズをウィンドウサイズに合わせるをfalseに設定した時のみ、-1でリザルト画面に合わせます)
 * @text ボタンX座標
 * @type number
 * @default -1
 * @min -1
 * @parent ButtonSetting
 * 
 * @param GetPage
 * @text 入手画面設定
 * @default ------------------------------
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
 * @option サイドビューアクターを表示
 * @value 3
 * @default 1
 * @parent GetPage
 * 
 * @param ReserveMembers
 * @type boolean
 * @default false
 * @text 控えメンバー表示
 * @desc 控えメンバー表示。
 * @parent GetPage
 * 
 * @param FaceWidth
 * @desc アクター画像の表示の横幅。(0で自動調整します)
 * @text アクター画像の表示横幅
 * @type number
 * @default 144
 * @parent GetPage
 * 
 * @param FaceHeight
 * @desc １キャラ当たりの縦幅。(0で自動調整)
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
 * @param ResultActorWidth
 * @desc 経験値獲得時アクター表示の表示横幅。(-1で自動)
 * @text 経験値獲得時アクター表示横幅
 * @type number
 * @default -1
 * @min -1
 * @parent GetPage
 * 
 * @param ResultActorVisible
 * @type boolean
 * @default true
 * @text 経験値獲得時アクター表示
 * @desc 経験値獲得時のアクターを表示します。
 * @parent GetPage
 * 
 * @param ResultActorDefaultAutoSize
 * @type boolean
 * @default false
 * @text アクター数縦幅自動調整
 * @desc デフォルト表示数と同じ時にアクター表示縦幅を自動調整します。OFFの場合は「１キャラ当たりの縦幅」が適用されます。
 * @parent GetPage
 * 
 * @param ResultActorLessThanSize
 * @type boolean
 * @default false
 * @text アクター数縦幅自動調整（未満）
 * @desc デフォルト表示数未満時にアクター表示縦幅を自動調整します。
 * @parent GetPage
 * 
 * @param ResultActorAutoSize
 * @type boolean
 * @default false
 * @text アクター数縦幅自動調整（より大きい）
 * @desc デフォルト表示数より大きいの時にアクター表示縦幅を自動調整します。
 * @parent GetPage
 * 
 * @param DefaultActorVisible
 * @desc 経験値獲得時アクターのデフォルト表示数
 * @text デフォルトアクター表示数
 * @type number
 * @default 4
 * @min 0
 * @parent GetPage
 * 
 * @param ActorCols
 * @desc アクターの表示列数
 * @text アクター表示列数
 * @type number
 * @default 1
 * @min 1
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
 * @param PartyBackGroundImg
 * @desc 背景画像ファイル名を指定します。
 * @text 背景画像
 * @type file[]
 * @dir img/
 * @default []
 * @parent GetPage
 * 
 * @param FontColor
 * @text 文字色設定
 * @default ------------------------------
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
 * @default ------------------------------
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
 * @default ------------------------------
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
 * @param Gauge_Width
 * @desc EXPゲージ横幅(0で300)
 * @text EXPゲージ横幅
 * @type number
 * @default 0
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
 * @param EXPGauge_X
 * @desc 獲得経験値ゲージのX座標
 * @text 獲得経験値ゲージX座標
 * @type number
 * @default 0
 * @min 0
 * @parent ExpSetting
 * 
 * @param EXPGauge_Y
 * @desc 獲得経験値ゲージのY座標（デフォルト:18）
 * @text 獲得経験値ゲージY座標
 * @type number
 * @default 18
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
 * @param DropItemSetting
 * @text ドロップアイテム設定
 * @default ------------------------------
 * @parent GetPage
 * 
 * @param DropItemRows
 * @desc ドロップアイテムの表示行（0で下まで）
 * @text ドロップアイテム表示行
 * @type number
 * @default 0
 * @parent DropItemSetting
 * 
 * @param DropItemNumVisible
 * @type boolean
 * @default false
 * @text ドロップアイテム個数表示
 * @desc ドロップアイテムを個数表示します。OFFで個別表示
 * @parent DropItemSetting
 * 
 * @param DropItemNumx
 * @desc ドロップアイテムの個数左の文字
 * @text 個数左の文字
 * @type string
 * @default x 
 * @parent DropItemSetting
 * 
 * @param StealItemSetting
 * @text 盗みアイテム設定（要NUUN_StealableItems）
 * @default ------------------------------
 * @parent GetPage
 * 
 * @param StealItemVisible
 * @type boolean
 * @default false
 * @text 盗んだアイテム表示
 * @desc 盗んだアイテムを表示します。
 * @parent StealItemSetting
 * 
 * @param StealItemNumVisible
 * @type boolean
 * @default false
 * @text 盗んだアイテム個数表示
 * @desc 盗んだアイテムを個数表示します。OFFで個別表示
 * @parent StealItemSetting
 * 
 * @param StealItemNumx
 * @desc 盗んだアイテムの個数左の文字
 * @text 個数左の文字
 * @type string
 * @default x 
 * @parent StealItemSetting
 * 
 * @param LevelUpPage
 * @text レベルアップ画面設定
 * @default ------------------------------
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
 * @type file[]
 * @dir img/
 * @default []
 * @parent LevelUpPage
 * 
 * @param ActorImg
 * @text アクター画像設定
 * @default ------------------------------
 * @parent LevelUpPage
 * 
 * @param FaceVisible
 * @type boolean
 * @default true
 * @text 顔グラ表示
 * @desc 顔グラを表示します。
 * @parent ActorImg
 * 
 * @param LineVisible
 * @type boolean
 * @default true
 * @text 顔グラ非表示線表示
 * @desc 顔グラ非表示の時アクター名、レベルとステータス、習得スキルの間にある線を表示します。
 * @parent ActorImg
 * 
 * @param ButlerActors
 * @text 表示アクター設定
 * @desc 画像を表示するアクターを指定します。
 * @type struct<ActorButlerList>[]
 * @default []
 * @parent ActorImg
 * 
 * @param ActorPictureData
 * @text 立ち絵表示EX用画像設定
 * @desc 立ち絵表示EXでのアクターの画像設定
 * @default []
 * @type struct<ActorPictureDataList>[]
 * @parent ActorImg
 * 
 * @param ActorPictureEXApp
 * @text 立ち絵表示EX適用
 * @desc 立ち絵表示EXの画像変更を適用します。OFFにした場合はこのプラグインでの設定が適用されます。
 * @type boolean
 * @default true
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
 * @param LevelUpWidth
 * @desc レベルアップの差分表示の表示範囲幅
 * @text レベルアップ表示範囲幅
 * @type number
 * @default 100
 * @parent LevelUpPage
 * 
 * @param DifferenceStatusColor
 * @desc レベルアップ後のステータスの数値の色
 * @text レベルアップ後ステータス数値色
 * @type number
 * @default 24
 * @parent LevelUpPage
 * 
 * @param VisibleStatus
 * @text ステータスの設定
 * @desc ステータスの設定。
 * @default ["{\"StatusParamDate\":\"0\",\"DifferenceVisible\":\"true\",\"OriginalParamName\":\"\",\"OriginalParamEval\":\"\"}","{\"StatusParamDate\":\"1\",\"DifferenceVisible\":\"true\",\"OriginalParamName\":\"\",\"OriginalParamEval\":\"\"}","{\"StatusParamDate\":\"2\",\"DifferenceVisible\":\"true\",\"OriginalParamName\":\"\",\"OriginalParamEval\":\"\"}","{\"StatusParamDate\":\"3\",\"DifferenceVisible\":\"true\",\"OriginalParamName\":\"\",\"OriginalParamEval\":\"\"}","{\"StatusParamDate\":\"4\",\"DifferenceVisible\":\"true\",\"OriginalParamName\":\"\",\"OriginalParamEval\":\"\"}","{\"StatusParamDate\":\"5\",\"DifferenceVisible\":\"true\",\"OriginalParamName\":\"\",\"OriginalParamEval\":\"\"}","{\"StatusParamDate\":\"6\",\"DifferenceVisible\":\"true\",\"OriginalParamName\":\"\",\"OriginalParamEval\":\"\"}","{\"StatusParamDate\":\"7\",\"DifferenceVisible\":\"true\",\"OriginalParamName\":\"\",\"OriginalParamEval\":\"\"}"]
 * @type struct<VisibleStatusList>[]
 * @parent LevelUpPage
 * 
 * @param StatusFontSize
 * @desc レベルアップステータスのフォントサイズ。（メインフォントサイズからの差）
 * @text レベルアップステータスフォントサイズ
 * @type number
 * @default 0
 * @min -100
 * @parent LevelUpPage
 * 
 * @param LevelUpActorSeSetting
 * @text レベルアップ時のアクター切り替え時のSE設定
 * @default ------------------------------
 * @parent LevelUpPage
 * 
 * @param LevelUpActorSe
 * @text アクター切り替え時SE
 * @desc レベルアップ時のアクター切り替え時のSE。
 * @type file
 * @dir audio/se
 * @parent LevelUpActorSeSetting
 * 
 * @param LevelUpActorVolume
 * @text SEの音量
 * @desc SEを音量を設定します。
 * @default 90
 * @parent LevelUpActorSeSetting
 * @min 0
 * 
 * @param LevelUpActorPitch
 * @text SEのピッチ
 * @desc SEをピッチを設定します。
 * @default 100
 * @parent LevelUpActorSeSetting
 * 
 * @param LevelUpActorPan
 * @text SEの位相
 * @desc SEを位相を設定します。
 * @default 0
 * @parent LevelUpActorSeSetting
 * 
 * @param NameSetting
 * @text 名称設定
 * @default ------------------------------
 * 
 * @param ResultName
 * @text 戦闘結果の名称
 * @desc 戦闘結果の名称を設定します。
 * @type string
 * @default 戦闘結果
 * @parent NameSetting
 * 
 * @param LevelUpResultHelpName
 * @desc レベルアップ画面表示時の戦闘結果のテキストを設定します。%1:アクター名　%2:レベル
 * @text レベルアップ画面表示時戦闘結果テキスト
 * @type string
 * @default %1は\c[16]レベル\c[17]%2\c[0]に上がった！
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
 * @param GetStealItemName
 * @text 盗んだアイテムの名称
 * @desc 盗んだアイテムの名称を設定します。（要NUUN_StealableItems）
 * @type string
 * @default 盗んだアイテム
 * @parent NameSetting
 * 
 * @param SESetting
 * @text レベルアップSE設定
 * @default ------------------------------
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
 * @default ------------------------------
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
 * @command ChangeActorImg
 * @desc レベルアップ画面のアクター画像を変更します。
 * @text レベルアップ画面アクター画像変更
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
 * @type file[]
 * @dir img/
 * @default ["{\"actorId\":\"0\",\"ActorImg\":\"[\\\"pictures\\\"]\",\"Actor_X\":\"0\",\"Actor_Y\":\"0\",\"Actor_Scale\":\"100\"}"]
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
/*~struct~VisibleStatusList:
 * 
 * @param StatusParamDate
 * @text 表示項目
 * @desc 表示項目を指定します。
 * @type select
 * @option HP
 * @value 0
 * @option MP
 * @value 1
 * @option 攻撃力
 * @value 2
 * @option 防御力
 * @value 3
 * @option 魔法力
 * @value 4
 * @option 魔法防御
 * @value 5
 * @option 敏捷性
 * @value 6
 * @option 運
 * @value 7
 * @option HP(装備補正等なし)
 * @value 10
 * @option MP(装備補正等なし)
 * @value 11
 * @option 攻撃力(装備補正等なし)
 * @value 12
 * @option 防御力(装備補正等なし)
 * @value 13
 * @option 魔法力(装備補正等なし)
 * @value 14
 * @option 魔法防御(装備補正等なし)
 * @value 15
 * @option 敏捷性(装備補正等なし)
 * @value 16
 * @option 運(装備補正等なし)
 * @value 17
 * @option オリジナルパラメータ
 * @value 20
 * @default 0
 * 
 * @param DifferenceVisible
 * @type boolean
 * @default true
 * @text 差分表示
 * @desc 差分を表示します。
 * 
 * @param OriginalParamName
 * @text オリジナルパラメータ名称
 * @desc オリジナルパラメータの名称を設定します。
 * @default
 * @type string
 * 
 * @param OriginalParamEval
 * @text オリジナルパラメータ評価式
 * @desc オリジナルパラメータの評価式を記入します。actor:アクターのゲームデータ dactor:アクターのシステムデータ
 * @default
 * @type string
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
 * @min 0
 * @max 9999
 * 
 * @param Img_SY
 * @desc 画像の表示開始座標Y
 * @text 画像表示開始座標Y
 * @type number
 * @default 0
 * @min 0
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
param.ButlerActors = param.ButlerActors || [];
param.ActorBackGroundImg = param.ActorBackGroundImg && param.ActorBackGroundImg.length > 0 ? param.ActorBackGroundImg[0] : null;
param.PartyBackGroundImg = param.PartyBackGroundImg && param.PartyBackGroundImg.length > 0 ? param.PartyBackGroundImg[0] : null;
const LevelUpActorSeData = param.LevelUpActorSe ? {name: param.LevelUpActorSe, volume: param.LevelUpActorVolume, pitch: param.LevelUpActorPitch, pan: param.LevelUpActorPan} : null;
let gaugeWidth = param.Gauge_Width > 0 ? param.Gauge_Width : 300;
param.EXPGauge_X = Math.max(param.EXPGauge_X, 0);

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

PluginManager.registerCommand(pluginName, 'ChangeActorImg', args => {
  if ($gameActors._data[args.actorId]) {
    $gameActors._data[args.actorId].setResultActorImgId(args.ChangeActorImgId);
  }
});


const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
  _Game_Actor_initMembers.call(this);
};

const _Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
  _Game_Actor_setup.call(this, actorId);
  this.initResultActorImg();
};

Game_Actor.prototype.initResultActorImg = function() {
  if (this.resultImgId === undefined) {
    this.resultImgId = 0;
  }
};

Game_Actor.prototype.setResultActorImgId = function(changeActorImgId) {
  this.resultImgId = Number(changeActorImgId) - 1;
};

Game_Actor.prototype.getResultActorImg = function(id) {
  this.initResultActorImg();
  const find = param.ButlerActors.find(actors => actors.actorId === id && actors.ActorImg);
  return find ? find.ActorImg[this.resultImgId] : null;
};

Game_Actor.prototype.getResultActorData = function(id) {
  this.initResultActorImg();
  return param.ButlerActors.find(actors => actors.actorId === id);
};

const _Game_Actor_requestMotionRefresh = Game_Actor.prototype.requestMotionRefresh;
Game_Actor.prototype.requestMotionRefresh = function() {
  if (!BattleManager._victoryOn) {
    _Game_Actor_requestMotionRefresh.call(this);
  }
};

const _Game_Party_performVictory = Game_Party.prototype.performVictory;
Game_Party.prototype.performVictory = function() {
  if (!BattleManager._victoryStart) {
    _Game_Party_performVictory.call(this)
  }
};


const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
  _Scene_Battle_createAllWindows.call(this);
  this.createResultBaseSprite();
  this.createResultHelpWindow();
  this.createResultWindow();
  this.createActorResultWindow();
  this.createResultDropItemWindow();
  this.createResultLearnSkillWindow();
  this.createResultButtons();
};

Scene_Battle.prototype.createResultBaseSprite = function() {
  this._resultBaseSprite = null;
  if (Imported.NUUN_Base && (param.PartyBackGroundImg || param.ActorBackGroundImg)) {
    const sprite = new Sprite();
    this._resultBaseSprite = sprite;
    this.addChild(sprite);
    this.createResultBackGround();
    this.createResultActorImg();
  }
};

Scene_Battle.prototype.createResultBackGround = function() {
  if (this._resultBaseSprite) {
    if (param.PartyBackGroundImg) {
      const partySprite = new Sprite(ImageManager.nuun_LoadPictures(param.PartyBackGroundImg));
      this._resultBaseSprite.addChild(partySprite);
      this._backGroundPartySprite = partySprite;
      partySprite.hide();
      this.resultBackGround(partySprite);
      if (partySprite.bitmap && !partySprite.bitmap.isReady()) {
        partySprite.bitmap.addLoadListener(this.resultBackGround.bind(this, partySprite));
      } else {
        this.resultBackGround(partySprite);
      }
    }
    if (param.ActorBackGroundImg) {
      const actorSprite = new Sprite(ImageManager.nuun_LoadPictures(param.ActorBackGroundImg));
      this._resultBaseSprite.addChild(actorSprite);
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
    sprite.x = (param.ResultWindowCenter ? (Graphics.width - (Graphics.boxWidth + 8)) / 2 + (param.ResultWidth > 0 ? (Graphics.boxWidth - param.ResultWidth) / 2 : 0) :
                0) + param.ResultWindow_X;
    sprite.y = (Graphics.height - (Graphics.boxHeight + 8)) / 2 + param.ResultWindow_Y;
    const width = (param.ResultWidth > 0 ? param.ResultWidth : Graphics.boxWidth) + 8;
    const height = (param.ResultHeight > 0 ? param.ResultHeight : Graphics.boxHeight) + 8;
    sprite.scale.x = (width !== sprite.bitmap.width ? width / sprite.bitmap.width : 1);
    sprite.scale.y = (height !== sprite.bitmap.height ? height / sprite.bitmap.height : 1);
  } else {
    sprite.scale.x = (Graphics.width !== sprite.bitmap.width ? Graphics.width / sprite.bitmap.width : 1);
    sprite.scale.y = (Graphics.height !== sprite.bitmap.height ? Graphics.height / sprite.bitmap.height : 1);
  }
};

Scene_Battle.prototype.createResultActorImg = function() {
  const rect = this.resultActorImgWindowRect();
  this._resultActorImgWindow = new Window_ResultActorImg(rect);
  this._resultActorImgWindow.hide();
  this._resultBaseSprite.addChild(this._resultActorImgWindow);
};

Scene_Battle.prototype.resultActorImgWindowRect = function() {
  const wx = param.BackUiWidth ? (param.ResultWindowCenter ? (Graphics.width - (Graphics.boxWidth + 8)) / 2 + (param.ResultWidth > 0 ? (Graphics.boxWidth - param.ResultWidth) / 2 : 0) : 0) + param.ResultWindow_X : 0;
  const wy = param.BackUiWidth ? (Graphics.height - (Graphics.boxHeight + 8)) / 2 + param.ResultWindow_Y : 0;
  const ww = param.BackUiWidth ? (param.ResultWidth > 0 ? param.ResultWidth : Graphics.boxWidth) + 8 : Graphics.width;
  const wh = param.BackUiWidth ? (param.ResultHeight > 0 ? param.ResultHeight : Graphics.boxHeight + param.ResultWindow_Y) + 8 : Graphics.height;
  return new Rectangle(wx, wy, ww, wh);
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
  const wx = (param.ResultWindowCenter ? (param.ResultWidth > 0 ? (Graphics.boxWidth - param.ResultWidth) / 2 : 0) : (Graphics.boxWidth - Graphics.width) / 2) + param.ResultWindow_X;
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
    this.setResultBuckground(this._resultBaseSprite);
  } else {
    this.addWindow(this._resultWindow);
  }
};

Scene_Battle.prototype.resultWindowRect = function() {
  const wx = (param.ResultWindowCenter ? (param.ResultWidth > 0 ? (Graphics.boxWidth - param.ResultWidth) / 2 : 0) : (Graphics.boxWidth - Graphics.width) / 2) + param.ResultWindow_X;
  const wy = this.resultHelpAreaTop() + this.resultHelpAreaHeight();
  const ww = param.ResultWidth > 0 ? param.ResultWidth : Graphics.boxWidth;
  const wh = (param.ResultHeight > 0 ? param.ResultHeight : Graphics.boxHeight) - wy + param.ResultWindow_Y;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.createActorResultWindow = function() {
  const rect = this.actorResultWindowRect();
  this._actorResultWindow = new Window_ActorResult(rect);
  this._actorResultWindow.setHandler("ok", this.onResultOk.bind(this));
  this._actorResultWindow.setHandler("cancel", this.onResultOk.bind(this));
  this._actorResultWindow.hide();
  if (this._resultBaseSprite) {
    this._resultBaseSprite.addChild(this._actorResultWindow);
    this._actorResultWindow.x += (Graphics.width - Graphics.boxWidth) / 2;
    this._actorResultWindow.y += (Graphics.height - Graphics.boxHeight) / 2;
  } else {
    this.addWindow(this._actorResultWindow);
  }
  this._resultWindow.setActorResultWindow(this._actorResultWindow);
};

Scene_Battle.prototype.actorResultWindowRect = function() {
  const wx = (param.ResultWindowCenter ? (param.LevelUpResultWidth > 0 ? (Graphics.boxWidth - param.LevelUpResultWidth) / 2 : 0) : (Graphics.boxWidth - Graphics.width) / 2) + param.LevelUpResultWindow_X;
  const wy = this.resultHelpAreaTop() + this.resultHelpAreaHeight();
  const ww = param.LevelUpResultWidth > 0 ? param.LevelUpResultWidth : Graphics.boxWidth;
  const wh = (param.LevelUpResultHeight > 0 ? param.LevelUpResultHeight : Graphics.boxHeight) - wy + param.LevelUpResultWindow_Y;
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
  const wx = (param.ResultWindowCenter ? (Graphics.width - Graphics.boxWidth) / 2 + (param.ResultWidth > 0 ? (Graphics.boxWidth - param.ResultWidth) / 2 : 0) : 0) + param.ResultWindow_X;
  const wy = (Graphics.height - Graphics.boxHeight) / 2 + this.resultHelpAreaTop() + this.resultHelpAreaHeight();
  const ww = this._resultWindow.width;
  const wh = this._resultWindow.height;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.createResultLearnSkillWindow = function() {
  const rect = this.resultResultLearnSkillWindowRect();
  this._resultLearnSkillWindow = new Window_ResultLearnSkill(rect);
  this._resultLearnSkillWindow.hide();
  if (this._resultBaseSprite) {
    this._resultBaseSprite.addChild(this._resultLearnSkillWindow);
  } else {
    this.addChild(this._resultLearnSkillWindow);
  }
  this._resultLearnSkillWindow.setWindowActorResult(this._actorResultWindow);
};

Scene_Battle.prototype.resultResultLearnSkillWindowRect = function() {
  const wx = (param.ResultWindowCenter ? (Graphics.width - Graphics.boxWidth) / 2 + (param.LevelUpResultWidth > 0 ? (Graphics.boxWidth - param.LevelUpResultWidth) / 2 : 0) : 0) + param.LevelUpResultWindow_X;
  const wy = (Graphics.height - Graphics.boxHeight) / 2 + this.resultHelpAreaTop() + this.resultHelpAreaHeight();;
  const ww = this._actorResultWindow.width;
  const wh = this._actorResultWindow.height;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.createResultButtons = function() {
  if (ConfigManager.touchUI) {
      this.createResultButton();
  }
};

Scene_Battle.prototype.createResultButton = function() {
  this._okResultButton = new Sprite_Button("ok");
  if (!this._resultBaseSprite || param.BackUiWidth || param.ResultButton_X < 0) {
    this._okResultButton.x = (param.ResultWindowCenter ? (param.ResultWidth > 0 ? (Graphics.boxWidth - param.ResultWidth) / 2 : 0) : (Graphics.boxWidth - Graphics.width) / 2)
    + this._resultWindow.width - this._okResultButton.width - 4 + param.ResultWindow_X;
  } else {
    this._okResultButton.x = Math.min(param.ResultButton_X, Graphics.width - this._okResultButton.width - 4) + (Graphics.boxWidth - Graphics.width) / 2;
  }
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
  this._upResultButton.setClickHandler(this.updatePageupButton.bind(this));
  this._downResultButton.setClickHandler(this.updatePagedownButton.bind(this));
};

Scene_Battle.prototype.resultHelpAreaHeight = function() {
  return this.calcWindowHeight(1, false);
};

Scene_Battle.prototype.resultWindowAreaX = function() {
  return param.ResultWindow_X >= 0 ? (Graphics.boxWidth - Graphics.width) / 2 + param.ResultWindow_X :
            (param.ResultWidth > 0 ? (Graphics.boxWidth - param.ResultWidth) / 2 : 0);
};

Scene_Battle.prototype.resultHelpAreaTop = function() {
  const y = param.ResultWindow_Y;
  if (param.NoTouchUIWindow && !ConfigManager.touchUI) {
    return y;
  }
  return y + this.buttonAreaHeight();
};

Scene_Battle.prototype.onResultOk = function() {
  if (this._actorResultWindow.actorLevelUp.length > 0 && BattleManager.resultPage < this._actorResultWindow.actorLevelUp.length) {
    this.backGroundPartyHide();
    this.backGroundActorShow();
    BattleManager.resultPage++;
    this._resultDropItemWindow.page = 0;
    //this._resultHelpWindow.hide();
    this._resultWindow.hide();
    this._resultDropItemWindow.hide();
    this._resultLearnSkillWindow.show();
    this._actorResultWindow.show();
    this._actorResultWindow.refresh();
    this._resultHelpWindow.onLevelUpText();
    this._resultHelpWindow.setLavelUpText(this._actorResultWindow._actor);
    this._resultLearnSkillWindow.refresh();
    this._actorResultWindow.activate();
    BattleManager.resultRefresh = param.ActorPageRefreshFrame;
  } else {
    this._resultHelpWindow.close();
    this._actorResultWindow.close();
    this._resultWindow.close();
    this._resultDropItemWindow.close();
    this._resultLearnSkillWindow.close();
    this.backGroundPartyHide();
    this.backGroundActorHide();
    BattleManager.playMapBgm();
  }
};

Scene_Battle.prototype.resultOpen = function() {
  this.closeStatusWindow();
  this.backGroundPartyShow();
  this._resultWindow.activate();
  this._resultHelpWindow.setText(param.ResultName)
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
    this._actorResultWindow.opacity = 0;
    this._actorResultWindow.frameVisible = false;
    this._backGroundActorSprite.show();
  }
  if (this._resultBaseSprite) {
    this._resultActorImgWindow.show();
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
  if (this._resultBaseSprite) {
    this._resultActorImgWindow.hide();
  }
};

Scene_Battle.prototype.updatePageupButton = function() {
  if (this._resultWindow.active) {
    this.updateDorpItemPageup();
  } else if (this._actorResultWindow.active) {
    this.updateLearnSkillPageup();
  }
};

Scene_Battle.prototype.updatePagedownButton = function() {
  if (this._resultWindow.active) {
    this.updateDorpItemPagedown();
  } else if (this._actorResultWindow.active) {
    this.updateLearnSkillPagedown();
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
  } else if (this._actorResultWindow.active) {
    if (Input.isRepeated('left')) {
      this.updateLearnSkillPageup();
    } else if (Input.isRepeated('right')){
      this.updateLearnSkillPagedown();
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

Scene_Battle.prototype.updateLearnSkillPagedown = function() {
  const maxPage = this._resultLearnSkillWindow.maxPages();
  if (maxPage > 1) {
    SoundManager.playCursor();
    this._resultLearnSkillWindow.page = (this._resultLearnSkillWindow.page + 1) % maxPage;
    this._resultLearnSkillWindow.refresh();
    this._actorResultWindow.activate();
  }
};

Scene_Battle.prototype.updateLearnSkillPageup = function() {
  const maxPage = this._resultLearnSkillWindow.maxPages();
  if (maxPage > 1) {
    SoundManager.playCursor();
    this._resultLearnSkillWindow.page = (this._resultLearnSkillWindow.page + (maxPage - 1)) % maxPage;
    this._resultLearnSkillWindow.refresh();
    this._actorResultWindow.activate();
  }
};

const _Scene_Battle_updateVisibility = Scene_Battle.prototype.updateVisibility;
Scene_Battle.prototype.updateVisibility = function() {
  _Scene_Battle_updateVisibility.call(this);
  this.updateResultButton();
};

const _Scene_Battle_updateInputWindowVisibility = Scene_Battle.prototype.updateInputWindowVisibility;
Scene_Battle.prototype.updateInputWindowVisibility = function() {
  _Scene_Battle_updateInputWindowVisibility.call(this);
  if (BattleManager._victoryOn) {
      this.closeCommandWindows();
      this.hideSubInputWindows();
  }
};

Scene_Battle.prototype.updateResultButton = function() {
  if (this._okResultButton) {
      this._okResultButton.visible = (this._resultWindow.active || this._actorResultWindow.active);
  }
  if (this._upResultButton && this._downResultButton) {
    this._upResultButton.visible = (this._resultWindow.active && this._resultDropItemWindow.maxPages() > 1) ||
    (this._actorResultWindow.active && this._resultLearnSkillWindow.maxPages() > 1);
    this._downResultButton.visible = (this._resultWindow.active && this._resultDropItemWindow.maxPages() > 1) ||
    (this._actorResultWindow.active && this._resultLearnSkillWindow.maxPages() > 1);
  }
};

Scene_Battle.prototype.resultbuttonY = function() {
  const y = Scene_Battle.prototype.buttonY.call(this);
  return y - this._helpWindow.height + param.ResultWindow_Y;
};

Scene_Battle.prototype.closeStatusWindow = function() {
  if (param.CloseActorStatusWindow) {
    this._statusWindow.close();
  }
};

Scene_Battle.prototype.setResultBuckground = function(sprite) {
  this._resultWindow.resultBuckgroundSprite = sprite;
};

function Window_ResultActorImg() {
  this.initialize(...arguments);
}

Window_ResultActorImg.prototype = Object.create(Window_StatusBase.prototype);
Window_ResultActorImg.prototype.constructor = Window_ResultActorImg;

Window_ResultActorImg.prototype.initialize = function(rect) {
  Window_StatusBase.prototype.initialize.call(this, rect);
  this._actor = null;
  this._actorSprite = null;
  this.opacity = 0;
  this.frameVisible = false;
};

Window_ResultActorImg.prototype.setActor = function(actor) {
  this._actor = actor;
};

Window_ResultActorImg.prototype.refresh = function() {
  this.drawActorImg(this._actor);
};

Window_ResultActorImg.prototype.loadActorImg = function(actor) {
  let bitmap = null;
  if (Imported.NUUN_ActorPicture && param.ActorPictureEXApp) {
    bitmap = actor.getActorGraphicImg();
  } else {
    bitmap = actor.getResultActorImg(actor.actorId());
  }
  if (bitmap) {
    ImageManager.nuun_LoadPictures(bitmap);
  }
};

Window_ResultActorImg.prototype.drawActorImg = function(actor) {
  let bitmap = null;
  if (Imported.NUUN_ActorPicture && param.ActorPictureEXApp) {
    bitmap = actor.getActorGraphicImg();
  } else {
    bitmap = actor.getResultActorImg(actor.actorId());
  }
  if (bitmap) {
    bitmap = ImageManager.nuun_LoadPictures(bitmap);
    if (bitmap && !bitmap.isReady()) {
      bitmap.addLoadListener(this.actorImgRefresh.bind(this, bitmap, actor));
    } else if (bitmap) {
      this.actorImgRefresh(bitmap, actor);
    }
  } else if (this._actorSprite && this._actorSprite.bitmap){
    this._actorSprite.bitmap = null;
  }
};

Window_ResultActorImg.prototype.actorImgRefresh = function(bitmap, actor) {
  const data = Imported.NUUN_ActorPicture && param.ActorPictureEXApp ? battlreActorPicture(actor.actorId()) : actor.getResultActorData(actor.actorId());
  let x = data.Actor_X;
  const sx = data.Img_SX || 0;
  const sy = data.Img_SY || 0;
  const scale = (data.Actor_Scale || 100) / 100;
  if(param.ActorPosition === 0) {
    x += 0;
  } else if (param.ActorPosition === 1) {
    x += Math.floor(this.width / 2 - ((bitmap.width * scale) / 2));
  } else {
    x += this.width - (bitmap.width * scale) - 24;
  }
  const y = data.Actor_Y + (this.height - (bitmap.height * scale));
  this.placeResultActorImg(this._actor, x, y, bitmap, scale);
  this._actorSprite.setFrame(sx, sy, bitmap.width, bitmap.height);
};

Window_ResultActorImg.prototype.placeResultActorImg = function(actor, x, y, bitmap, scale) {
  const key = "actor-result".format();
  const sprite = this.createActorImgSprite(key, Sprite_ResultActor);
  if (sprite._battler !== actor) {
    sprite.setup(actor, bitmap, scale);
    sprite.move(x, y);
    sprite.show();
    this._actorSprite = sprite;
  }
};

Window_ResultActorImg.prototype.createActorImgSprite = function(key, spriteClass) {
  const dict = this._additionalSprites;
  if (dict[key]) {
    return dict[key];
  } else {
    const sprite = new spriteClass();
    dict[key] = sprite;
    this.addChild(sprite);
    return sprite;
  }
};

function Window_ResultHelp() {
  this.initialize(...arguments);
}

Window_ResultHelp.prototype = Object.create(Window_Help.prototype);
Window_ResultHelp.prototype.constructor = Window_ResultHelp;

Window_ResultHelp.prototype.initialize = function(rect) {
  this._userWindowSkin = param.ResultWindowsSkin;
  Window_Help.prototype.initialize.call(this, rect);
  this.openness = 0;
  this.openOpacity = 0;
  this.resultFadein = false;
  this._mode = 0;
  this.refresh();
};

const _Window_ResultHelp_updateOpen = Window_ResultHelp.prototype.updateOpen;
Window_ResultHelp.prototype.updateOpen = function() {
  if (param.ResultFadein && this.resultFadein) {
    this.openness = 255;
    this.openOpacity += 32;
    if (!param.PartyBackGroundImg && !param.ActorBackGroundImg) {
      this.opacity = this.openOpacity;
    }
    if (this.isResultFadein()) {
      this.resultFadein = false;
    }
  }
  _Window_ResultHelp_updateOpen.call(this);
};

const _Window_ResultHelp_isOpen = Window_ResultHelp.prototype.isOpen;
Window_ResultHelp.prototype.isOpenAndActive = function() {
  return this.isFadein() ? this.isResultFadein() && _Window_ResultHelp_isOpen.call(this) : 
  _Window_ResultHelp_isOpen.call(this);
};

Window_ResultHelp.prototype.isResultFadein = function() {
  return this.openOpacity >= 255;
};

const _Window_ResultHelp_open = Window_ResultHelp.prototype.open;
Window_ResultHelp.prototype.open = function() {
  _Window_ResultHelp_open.call(this);
  if (this.isFadein() && !this.resultFadein) {
    this.resultFadein = true;
  }
};

Window_ResultHelp.prototype.isFadein = function() {
  return param.ResultFadein || param.PartyBackGroundImg || param.ActorBackGroundImg;
};

Window_ResultHelp.prototype.refresh = function() {
  const rect = this.baseTextRect();
  this.contents.clear();
  if (this._mode === 0) {
    this.drawText(this._text, rect.x, rect.y, rect.width, param.ResultTextPosition);
  } else {
    if (param.LevelUpResultTextPosition === 'TextEx') {
      this.drawTextEx(this._text, rect.x, rect.y, rect.width);
    } else {
      this.drawText(this._text, rect.x, rect.y, rect.width, param.LevelUpResultTextPosition);
    }
  }
};

Window_ResultHelp.prototype.setLavelUpText = function(actor) {
  let text = '';
  if (param.LevelUpResultHelpName) {
    text = param.LevelUpResultHelpName.format(actor.name(), actor._level);
  } else {
    text = ''
  }
  this.setText(text);
};

Window_ResultHelp.prototype.onLevelUpText = function() {
  this._mode = 1;
};


function Window_Result() {
  this.initialize(...arguments);
}

Window_Result.prototype = Object.create(Window_StatusBase.prototype);
Window_Result.prototype.constructor = Window_Result;

Window_Result.prototype.initialize = function(rect) {
  this._userWindowSkin = this.resultSkin();
  Window_StatusBase.prototype.initialize.call(this, rect);
  this._levelUp = false;
  this.openness = 0;
  this._actor = null;
  this._canRepeat = false;
  this.openOpacity = 0;
  this.resultFadein = false;
  this.loadImages();
};

Window_Result.prototype.resultSkin = function() {
  return param.ResultMainWindowsSkin;
};

Window_Result.prototype.loadImages = function() {
  for (const actor of $gameParty.members()) {
    if (param.ActorShow === 1) {
      const faceName = Imported.NUUN_ActorPicture && param.ActorPictureEXApp ? actor.getActorGraphicFace() : actor.faceName();
      ImageManager.loadFace(faceName);
    } else if (param.ActorShow === 2) {
      ImageManager.loadCharacter(actor.characterName());
    } else if (param.ActorShow === 3) {
      ImageManager.loadSvEnemy(actor.battlerName());
    }
  }
};

Window_Result.prototype.actorContentHeight = function(scale) {
  const itemPadding = this.itemPadding();
  const showMembers = Math.ceil(this.actorMembers() / param.ActorCols);
  if (param.ResultActorAutoSize && param.DefaultActorVisible < showMembers) {
    return Math.floor((this.height - itemPadding * 2) / showMembers);
  } else if (param.ResultActorLessThanSize && param.DefaultActorVisible > this.actorMembers() / param.ActorCols) {
    return Math.floor((this.height - itemPadding * 2) / showMembers);
  } else {
    if (!param.ResultActorDefaultAutoSize && param.FaceHeight > 0) {
      return (param.ActorShow === 1 && param.FaceScaleHeight) ? Math.floor(param.FaceHeight * scale) : param.FaceHeight;
    }
    return Math.floor((this.height - itemPadding * 2) / param.DefaultActorVisible);
  }
};

Window_Result.prototype.actor = function(index) {
  return this.members()[index];
};

Window_Result.prototype.actorMembers = function() {
  return this.members().length;
};

Window_Result.prototype.members = function() {
  if (param.ReserveMembers) {
    return $gameParty.allMembers();
  } else {
    if (Imported.NUUN_SupportActor) {
      $gameParty.membersMode = true;
    }
    return $gameParty.battleMembers();
  }
};

Window_Result.prototype.actorAreaWidth = function(scale) {
  if (param.FaceWidth > 0) {
    return param.FaceWidth;
  }
  if (param.ActorShow === 0) {
    return 0;
  } else if (param.ActorShow === 1) {
    return Math.floor(ImageManager.faceWidth * scale) + this.itemPadding();
  } else if (param.ActorShow === 2) {
    return 60 + this.itemPadding();
  } else {
    return 64 + this.itemPadding();
  }
};

Window_Result.prototype.actorContentWidth = function(rect) {
  return param.ResultActorWidth < 0 ? (rect.width - Math.floor(rect.width / 2.6)) : param.ResultActorWidth;
};

Window_Result.prototype.refresh = function() {
  this.contents.clear();
  const scale = param.ActorShow === 1 ? param.FaceScale / 100 : 1;
  const rect = this.itemRect(0);
  const lineHeight = this.lineHeight();
  const itemPadding = this.itemPadding();
  const height = this.actorContentHeight(scale);
  const contentWidth = this.actorContentWidth(rect);
  const width = Math.floor(contentWidth / param.ActorCols);
  const faceArea = rect.x + this.actorAreaWidth(scale);
  const x2 = rect.x + width;
  gaugeWidth = Math.min(gaugeWidth, width - (faceArea + param.EXPGauge_X + 30));
  for (let i = 0; this.actorMembers() > i; i++) {
    this._actor = this.actor(i);
    this._actor._learnSkill = [];
    this._actor._oldStatus = [];
    let x = Math.floor(i % param.ActorCols) * width + rect.x;
    let y = Math.floor(i / param.ActorCols) * height + rect.y + param.ActorResult_Y;
    if (param.ActorShow === 2) {
      this.drawActorCharacter(x + Math.floor(this.actorAreaWidth() / 2), y + 60, param.ResultActorVisible);
    } else if (param.ActorShow === 1) {
      this.drawActorFace(x, y, param.FaceWidth, param.FaceHeight, param.ResultActorVisible);
    } else if (param.ActorShow === 3) {
      this.drawSvActor(x, y + (height / 2), param.ResultActorVisible);
    }
    this.drawActorName(x + faceArea, y, width - faceArea - 112, param.ResultActorVisible);
    this.drawActorLevel(x + x2 - 100, y, param.ResultActorVisible);
    if (param.LavelUpPosition === 1) {
      this.drawLevelUp(x + param.LevelUp_X, y + param.LevelUp_Y, Math.floor(this.actorAreaWidth(scale)), param.ResultActorVisible);
    } else if (param.LavelUpPosition === 10) {
      this.drawLevelUp(x + param.LevelUp_X , y + param.LevelUp_Y, width, param.ResultActorVisible);
    }
    this.drawExpGauge(x + faceArea + param.EXPGauge_X, y + param.EXP_Y + param.EXPGauge_Y, param.ResultActorVisible);
    this.drawGetEXP(x + faceArea, y + param.EXP_Y, width, param.ResultActorVisible);
  }
  this.drawGainList(rect.x + contentWidth, rect.y, rect.width - contentWidth);
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

Window_Result.prototype.loadActorImg = function(actor) {
  let bitmap = null;
  if (Imported.NUUN_ActorPicture && param.ActorPictureEXApp) {
    bitmap = actor.getActorGraphicImg();
  } else {
    bitmap = actor.getResultActorImg(actor.actorId());
  }
  if (bitmap) {
    ImageManager.nuun_LoadPictures(bitmap);
  }
};

Window_Result.prototype.drawActorImg = function(actor) {
  let bitmap = null;
  if (this._resultActorImgWindow) {
    this._resultActorImgWindow.setActor(actor);
    this._resultActorImgWindow.refresh();
  } else {
    if (Imported.NUUN_ActorPicture && param.ActorPictureEXApp) {
      bitmap = actor.getActorGraphicImg();
    } else {
      bitmap = actor.getResultActorImg(actor.actorId());
    }
    if (bitmap) {
      bitmap = ImageManager.nuun_LoadPictures(bitmap);
      if (bitmap && !bitmap.isReady()) {
        bitmap.addLoadListener(this.actorImgRefresh.bind(this, bitmap, actor));
      } else if (bitmap) {
        this.actorImgRefresh(bitmap, actor);
      }
    }
  }
};

Window_Result.prototype.actorImgRefresh = function(bitmap, actor) {
  const data = Imported.NUUN_ActorPicture && param.ActorPictureEXApp ? battlreActorPicture(actor.actorId()) : actor.getResultActorData(actor.actorId());
  let x = data.Actor_X;
  const sx = data.Img_SX || 0;
  const sy = data.Img_SY || 0;
  const scale = (data.Actor_Scale || 100) / 100;
  if(param.ActorPosition === 0) {
    x += 0;
  } else if (param.ActorPosition === 1) {
    x += Math.floor(this.width / 2 - ((bitmap.width * scale) / 2));
  } else {
    x += this.width - (bitmap.width * scale) - 24;
  }
  const dw = bitmap.width * scale;
  const dh = bitmap.height * scale;
  const y = data.Actor_Y + (this.height - (bitmap.height * scale)) - 24;
  this.contents.blt(bitmap, sx, sy, bitmap.width, bitmap.height, x, y, dw, dh);
};

Window_Result.prototype.drawActorFace = function(x, y, width, height, mode) {
  const actor = this._actor;
  if (mode || BattleManager.resultPage > 0) {
    if (Imported.NUUN_ActorPicture && param.ActorPictureEXApp) {
      this.drawFace(actor.getActorGraphicFace(), actor.getActorGraphicFaceIndex(), x, y, width, height);
    } else {
      this.drawFace(actor.faceName(), actor.faceIndex(), x, y, width, height);
    }
  }
};

Window_Result.prototype.drawSvActor = function(x, y, mode) {
  if (mode) {
    const bitmap = ImageManager.loadSvActor(this._actor.battlerName());
    if (bitmap && !bitmap.isReady()) {
      bitmap.addLoadListener(this.drawSvActorImg.bind(this, bitmap, x, y));
    } else {
      this.drawSvActorImg(bitmap, x, y);
    }
  }
};

Window_Result.prototype.drawSvActorImg = function(bitmap, x, y) {
    const motionIndex = 0;
    const pw = Math.floor(bitmap.width / 9);
    const ph = Math.floor(bitmap.height / 6);
    const sx = Math.floor(motionIndex / 6) * 3;
    const sy = motionIndex % 6;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y - ph);
};

Window_Result.prototype.drawExpGauge = function(x, y, mode) {
  if (mode) {
    this.placeExpGauge(this._actor, x, y);
  }
};

Window_Result.prototype.drawActorName = function(x, y, width, mode) {
  if (mode) {
    if (!this._actor.isAlive()) {
      this.changeTextColor(ColorManager.deathColor());
    }
    this.contents.fontSize = $gameSystem.mainFontSize() + param.ActorNameFontSize;
    this.drawText(this._actor.name(), x, y, width);
    this.contents.fontSize = $gameSystem.mainFontSize();
    this.resetTextColor();
  }
};

Window_Result.prototype.drawActorLevel = function(x, y, mode) {
  const exp = BattleManager._rewards.exp;
  const actor = this._actor;
  if (!isNaN(exp)) {
    const level = actor.resultGainExp(exp);
    const oldStatus = [];
    if (mode) {
      this.contents.fontSize = $gameSystem.mainFontSize() + param.LevelFontSize;
      this.changeTextColor(ColorManager.systemColor());
      this.drawText(TextManager.levelA, x, y, 48);
    }
    if (level > actor._level) {
      this._levelUp = true;
      BattleManager._levelUpPageEnable = BattleManager._levelUpPageEnable === undefined || BattleManager._levelUpPageEnable === null ? param.LavelUpWindowShow : BattleManager._levelUpPageEnable;
      for (const data of param.VisibleStatus) {
        oldStatus.push(this.getVisibleStatus(actor, data, true));
      }
      oldStatus.push(actor._level);
      this._actorResultWindow.actorOldStatus.push(oldStatus);
      this.changeTextColor(ColorManager.textColor(param.LevelUpValueColor));
      if (BattleManager._levelUpPageEnable) {
        this._actorResultWindow.actorLevelUp.push(actor);
        if (this._resultActorImgWindow) {
          this._resultActorImgWindow.loadActorImg(actor);
        } else {
          this.loadActorImg(actor);
        }
      }
    } else {
      this.resetTextColor();
    }
    if (mode) {
    this.drawText(level, x + 30, y, 70 - 30, "right");
    }
    this.contents.fontSize = $gameSystem.mainFontSize();
    this.resetTextColor();
  }
};

Window_Result.prototype.drawLevelUp = function(x, y, width, mode) {
  if (this._levelUp) {
    if (mode) {
      this.changeTextColor(ColorManager.textColor(param.LevelUpNameColor));
      this.contents.fontSize = $gameSystem.mainFontSize() + param.LevelUpFontSize;
      const position = param.LavelUpPosition === 1 ? "center" : "left";
      this.drawText(param.LevelUpName, x, y, width, position);
      this.resetTextColor();
      this.contents.fontSize = $gameSystem.mainFontSize();
    }
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

Window_Result.prototype.drawGetStealItems = function(x, y, width) {
  const items = BattleManager._rewards.stealItems;
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
      this.drawText(date.GainParamName, x, y, 80, "left");
    }
    this.resetTextColor();
    this.drawCurrencyValue(gold, this.currencyUnit(), x + 80, y, width - 80);
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
  const rewards = BattleManager._rewards;
  if (rewards) {
    const result = eval(date.GainParamEval);
    this.changeTextColor(ColorManager.systemColor());
    if (date.GainParamName) {
      this.drawText(date.GainParamName, x, y, 120, "left");
    }
    this.resetTextColor();
    this.drawText(result, x + 120, y,  width - 120, "right");
  }
};

Window_Result.prototype.drawGetEXP = function(x, y, width, mode) {
  if (mode) {
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
        this.drawText(text, x + textWidth + this.itemPadding(), y, width - textWidth - 190, "left");
        this.resetTextColor();
        this.contents.fontSize = $gameSystem.mainFontSize();
      }
      if (param.LavelUpPosition === 2) {
        this.drawLevelUp(x2 + param.LevelUp_X, y + param.LevelUp_Y, width);
      }
    }
  }
};

Window_Result.prototype.currencyUnit = function() {
  return TextManager.currencyUnit;
};

Window_Result.prototype.drawFace = function(faceName, faceIndex, x, y, width, height) {
  const scale = BattleManager.resultPage === 0 ? param.FaceScale / 100 : 1;
  width = width || ImageManager.faceWidth;
  height = height || ImageManager.faceHeight;
  const bitmap = ImageManager.loadFace(faceName);
  if (BattleManager.resultPage === 0) {
    const contentsHeight = this.actorContentHeight(scale);
    if (param.ResultActorAutoSize) {
      if (height * scale > contentsHeight) {
        height = Math.floor((contentsHeight / (contentsHeight * scale)) * contentsHeight);
      }
    }
    var pw = ImageManager.faceWidth;
    var ph = ImageManager.faceHeight;
    var sw = Math.min(width, pw);
    var sh = Math.min(height, ph);
    var dy = Math.floor(y + Math.max(height - ph, 0) / 2);
    var sx = Math.floor((faceIndex % 4) * pw + (pw - sw) / 2);
    var sy = Math.floor(Math.floor(faceIndex / 4) * ph + (ph - sh) / 2);
    var dw = Math.floor(sw * scale);
    var dh = Math.floor(sh * scale);
  } else {
    var pw = ImageManager.faceWidth;
    var ph = ImageManager.faceHeight;
    var sw = Math.min(width, pw);
    var sh = Math.min(height, ph);
    var dy = Math.floor(y + Math.max(height - ph, 0) / 2);
    var sx = Math.floor((faceIndex % 4) * pw + (pw - sw) / 2);
    var sy = Math.floor(Math.floor(faceIndex / 4) * ph + (ph - sh) / 2);
    var dw = Math.floor(sw * scale);
    var dh = Math.floor(sh * scale);
  }
  this.contents.blt(bitmap, sx, sy, sw, sh, x, dy, dw, dh);
};

Window_Result.prototype.drawActorCharacter = function(x, y, mode) {
  if (mode) {
    this.drawCharacter(this._actor.characterName(), this._actor.characterIndex(), x, y);
  }
};

Window_Result.prototype.placeExpGauge = function(actor, x, y) {
  const type = 'result_exp'
  if (Imported.NUUN_GaugeImage) {
    this.placeGaugeImg(actor, type, x, y);
  }
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

Window_Result.prototype.processCancel = function() {
  this.processOk();
};

Window_Result.prototype.playOkSound = function() {
  this.changeActorSound();
};

Window_Result.prototype.changeActorSound = function() {
  const dataLength = this._actorResultWindow.actorLevelUp.length;
  if (LevelUpActorSeData && dataLength > 0 && dataLength - 1 >= BattleManager.resultPage) {
    AudioManager.playStaticSe(LevelUpActorSeData);
  } else {
    SoundManager.playOk();
  }
};

Window_Result.prototype.setActorImgWindow = function(resultActorImgWindow) {
  this._resultActorImgWindow = resultActorImgWindow;
};

Window_Result.prototype.paramName = function(params, option) {
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
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
      return TextManager.param(params - 10);
    case 20:
      return option;
    default:
      return null;
  }
};

Window_Result.prototype.paramOld = function(i, oldStatus) {
  return oldStatus[i];
};

Window_Result.prototype.paramValue = function(params, option) {
  switch (params) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
      return this._actor.param(params);
    case 20:
      const actor = this._actor.actor();
      return eval(option)
    default:
      return null;
  }
};

Window_Result.prototype.getVisibleStatus = function(actor, data, mode) {
  if (mode && !data.DifferenceVisible) {
    return 0;
  }
  switch (data.StatusParamDate) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
      return actor.param(data.StatusParamDate);
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
      return actor.paramBase(data.StatusParamDate - 10);
    case 20:
      const dactor = actor.actor();
      return eval(data.OriginalParamEval);
    default:
      return 0;
  }
};

const _Window_Result_updateOpen = Window_Result.prototype.updateOpen;
Window_Result.prototype.updateOpen = function() {
  if ((param.PartyBackGroundImg || param.ActorBackGroundImg || param.ResultFadein) && this.resultFadein) {
    this.openness = 255;
    this.openOpacity += 32;
    if (param.PartyBackGroundImg || param.ActorBackGroundImg) {
      this.resultBuckgroundSprite.opacity = this.openOpacity;
    } else if (!param.PartyBackGroundImg && !param.ActorBackGroundImg) {
      this.opacity = this.openOpacity;
    }
    if (this.isResultFadein()) {
      this.resultFadein = false;
    }
  }
  _Window_Result_updateOpen.call(this);
};

const _Window_Result_isOpen = Window_Result.prototype.isOpen;
Window_Result.prototype.isOpen = function() {
  return this.isFadein() ? this.isResultFadein() && _Window_Result_isOpen.call(this) : _Window_Result_isOpen.call(this);
};

Window_Result.prototype.isResultFadein = function() {
  return this.openOpacity >= 255;
};

Window_Result.prototype.setActorResultWindow = function(actorResultWindow) {
  this._actorResultWindow = actorResultWindow;
};

const _Window_Result_open = Window_Result.prototype.open;
Window_Result.prototype.open = function() {
  _Window_Result_open.call(this);
  if (this.isFadein() && !this.resultFadein) {
    this.resultFadein = true;
  }
};

Window_Result.prototype.isFadein = function() {
  return param.ResultFadein || param.PartyBackGroundImg || param.ActorBackGroundImg;
};

function Window_ActorResult() {
  this.initialize(...arguments);
}

Window_ActorResult.prototype = Object.create(Window_Result.prototype);
Window_ActorResult.prototype.constructor = Window_ActorResult;

Window_ActorResult.prototype.initialize = function(rect) {
  Window_Result.prototype.initialize.call(this, rect);
  this.actorLevelUp = [];
  this.actorOldStatus = [];
  this.openness = 255;
};

Window_ActorResult.prototype.resultSkin = function() {
  return param.ResultLevelWindowsSkin;
};

Window_ActorResult.prototype.refresh = function() {
  this.contents.clear();
  const rect = this.itemRect(0);
  const lineHeight = this.lineHeight();
  const itemPadding = this.itemPadding();
  for (let i = 0; this.actorMembers() > i; i++) {
    this.removeExpGauge(this.actor(i));
  }
  this._actor = this.actorLevelUp[BattleManager.resultPage - 1];
  const x = rect.x + Math.floor(rect.width / 2) + itemPadding;
  this.drawActorImg(this._actor);
  let NoFaceX = 0;
  let NoFaceY = lineHeight;
  if (param.FaceVisible) {
    this.drawActorFace(rect.x, rect.y, ImageManager.faceWidth, ImageManager.faceHeight);
    NoFaceX += 152
    NoFaceY += lineHeight * 3.5;
  } else {
    if (param.LineVisible) {
      this.drawHorzLine(rect.x, rect.y + lineHeight, rect.width);
    }
    NoFaceY += lineHeight;
  }
  this.drawActorStatusLevel(x, rect.y);
  this.drawActorStatusName(rect.x + NoFaceX, rect.y, rect.width - x - NoFaceX);
  this.drawActorStatus(rect.x, rect.y + NoFaceY, Math.floor(rect.width / 2) - itemPadding);
};

Window_ActorResult.prototype.drawActorStatusLevel = function(x, y) {
  const oldStatus = this.actorOldStatus[BattleManager.resultPage - 1];
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(TextManager.levelA, x, y, 48);
  this.resetTextColor();
  this.drawText(oldStatus[oldStatus.length - 1], x + 48, y, param.LevelUpWidth, "left");
  this.changeTextColor(ColorManager.systemColor());
  this.drawText("→", x + 48, y, param.LevelUpWidth, "center");
  this.changeTextColor(ColorManager.textColor(param.DifferenceStatusColor));
  this.drawText(this._actor._level, x + 48, y, param.LevelUpWidth, "right");
  this.resetTextColor();
};

Window_ActorResult.prototype.drawActorStatus = function(x, y, width) {
  let y2 = y
  const visibleStatus = param.VisibleStatus;
  const lineHeight = this.lineHeight() + param.StatusFontSize;
  this.contents.fontSize = $gameSystem.mainFontSize() + param.StatusFontSize;
  const oldStatus = this.actorOldStatus[BattleManager.resultPage - 1];
  visibleStatus.forEach((status, i) => {
    const name = this.paramName(status.StatusParamDate, status.OriginalParamName);
    const oldValue = this.paramOld(i, oldStatus);
    const value = this.getVisibleStatus(this._actor, status, false);
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(name, x, y2, width - 200);
    this.resetTextColor();
    if (status.DifferenceVisible && oldValue !== 0) {
      this.drawText(oldValue, x + (width - 200), y2, 60, "left");
      this.changeTextColor(ColorManager.systemColor());
      this.drawText("\u2192", x + (width - 110), y2, width - 160, "left");
      if (oldValue < value) {
        this.changeTextColor(ColorManager.textColor(param.DifferenceStatusColor));
      } else {
        this.resetTextColor();
      }
    }
    this.drawText(value, x + width - 60, y2, 60, "right");
    this.resetTextColor();
    y2 += lineHeight;
  });
  this.contents.fontSize = $gameSystem.mainFontSize();
};

Window_ActorResult.prototype.drawActorStatusName = function(x, y, width) {
  if (!this._actor.isAlive()) {
    this.changeTextColor(ColorManager.deathColor());
  }
  this.drawText(this._actor.name(), x, y, width);
  this.resetTextColor();
};

Window_ActorResult.prototype.changeActorSound = function() {
  const dataLength = this.actorLevelUp.length;
  if (LevelUpActorSeData && dataLength > 0 && dataLength - 1 >= BattleManager.resultPage) {
    AudioManager.playStaticSe(LevelUpActorSeData);
  } else {
    SoundManager.playOk();
  }
};

Window_ActorResult.prototype.isOpen = function() {
  return Window_StatusBase.prototype.isOpen.call(this);
};

Window_ActorResult.prototype.updateOpen = function() {
  Window_StatusBase.prototype.updateOpen.call(this);
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
  this.dropItemRows = param.DropItemRows > 0 ? param.DropItemRows : this.getDropItemRows();
  this.dropStealItemRows = this.getDropItemRows() - this.dropItemRows - 1;
  this.opacity = 0;
  this.frameVisible = false;
  this.dropList = [];
  this.stealList = [];
};

Window_ResultDropItem.prototype.getDropItemRows = function() {
  return Math.floor((this.innerHeight - this.lineHeight() * (this.gainParamLength() + 1)) / this.lineHeight());
};

Window_ResultDropItem.prototype.actorContentWidth = function(rect) {
  return param.ResultActorWidth < 0 ? (rect.width - Math.floor(rect.width / 2.6)) : param.ResultActorWidth;
};

Window_ResultDropItem.prototype.gainParamLength = function() {
  return param.GainParam.length;
};

Window_ResultDropItem.prototype.setWindowResult = function(windowResult) {
  this._windowResult = windowResult;
};

Window_ResultDropItem.prototype.maxPages = function() {
  if (param.StealItemVisible && Imported.NUUN_StealableItems) {
    return Math.max(this.maxDropPages(), this.maxStealPages());
  } else {
    return this.maxDropPages();
  }
};

Window_ResultDropItem.prototype.maxDropPages = function() {
  return Math.ceil(this.dropList.length / this.dropItemRows);
};

Window_ResultDropItem.prototype.maxStealPages = function() {
  return Math.ceil(this.stealList.length / this.dropStealItemRows);
};

Window_ResultDropItem.prototype.refresh = function() {
  this.contents.clear();
  this.getItemDropList();
  const rect = this.itemRect(0);
  const lineHeight = this.lineHeight();
  const itemPadding = this.itemPadding();
  const width = this.actorContentWidth(rect);
  this.drawGetItems(rect.x + width, rect.y, rect.width - width - rect.x);
  if (param.StealItemVisible && Imported.NUUN_StealableItems) {
    this.getItemStealList();
    this.drawGetStealItems(rect.x + width, rect.y + lineHeight * (this.dropItemRows + 1), rect.width - width - rect.x);
  }
};

Window_ResultDropItem.prototype.drawGetItems = function(x, y, width) {
  const items = this.dropList;
  const lineHeight = this.lineHeight();
  const maxPage = this.maxDropPages();
  y += this.gainParamLength() * lineHeight + param.DropItem_Y;
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(param.GetItemName, x, y, width - 48, "left");
  this.resetTextColor();
  if (items.length > 0) {
    const index = this.dropItemRows * Math.min(this.page, maxPage - 1);
    const maxItems = Math.min(this.dropItemRows, items.length - index);
    if (maxPage > 1) {
      this.drawText(this.page + 1 +"/"+maxPage, x, y, width, "right");
    }
    for (let i = 0; maxItems > i; i++) {
      let y2 = y + lineHeight * (i + 1);
      this.resetTextColor();
      if (param.DropItemNumVisible) {
        const num = String(param.DropItemNumx + items[i + index].num);
        const textWidth = this.textWidth(num) + this.itemPadding();
        this.drawItemName(items[i + index].item, x, y2, width - textWidth);
        this.drawText(num, x + textWidth, y2, width - textWidth, 'right');
      } else {
        this.drawItemName(items[i + index].item, x, y2, width);
      }
    }
  }
};

Window_ResultDropItem.prototype.drawGetStealItems = function(x, y, width) {
  const items = this.stealList;
  const lineHeight = this.lineHeight();
  const maxPage = this.maxStealPages();
  y += this.gainParamLength() * lineHeight + param.DropItem_Y;
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(param.GetStealItemName, x, y, width - 48, "left");
  this.resetTextColor();
  if (items.length > 0) {
    const index = this.dropStealItemRows * Math.min(this.page, maxPage - 1);
    const maxItems = Math.min(this.dropStealItemRows, items.length - index);
    if (maxPage > 1) {
      this.drawText(this.page + 1 +"/"+maxPage, x, y, width, "right");
    }
    for (let i = 0; maxItems > i; i++) {
      let y2 = y + lineHeight * (i + 1);
      this.resetTextColor();
      if (param.StealItemNumVisible) {
        if (items[i + index].type === 'gold') {
          this.drawCurrencyValue(items[i + index].item, TextManager.currencyUnit, x, y2, width);
        } else {
          const num = String(param.StealItemNumx + items[i + index].num);
          const textWidth = this.textWidth(num) + this.itemPadding();
          this.drawItemName(items[i + index].item, x, y2, width - textWidth);
          this.drawText(num, x + textWidth, y2, width - textWidth, 'right');
        }
      } else {
        if (items[i + index].type === 'gold') {
          this.drawCurrencyValue(items[i + index].item, TextManager.currencyUnit, x, y2, width);
        } else {
          this.drawItemName(items[i + index].item, x, y2, width);
        }
      }
    }
  }
};

Window_ResultDropItem.prototype.getItemDropList = function() {
  const drop = BattleManager._rewards.items;
  const dropList = [];
  drop.forEach(item => {
    const index = dropList.findIndex(ditem => item.id === ditem.item.id);
    if (param.DropItemNumVisible && index >= 0) {
      dropList[index].num++;
    } else {
      dropList.push({item: item, num: 1});
    }
  });
  this.dropList = dropList;
};

Window_ResultDropItem.prototype.getItemStealList = function() {
  const steal = BattleManager._rewards.stealItems;
  const stealList = [];
  steal.forEach(item => {
    if (item.money) {
      const index = stealList.findIndex(sitem => sitem.type === 'gold');
      if (param.StealItemNumVisible && index >= 0) {
        stealList[index].item += item.money;
      } else {
        stealList.push({item: item.money, type:'gold'});
      }
    } else {
      const index = stealList.findIndex(sitem => item.id === sitem.item.id);
      if (param.StealItemNumVisible && index >= 0) {
        stealList[index].num++;
      } else {
        stealList.push({item: item, num: 1, type:'item'});
      }
    }
  });
  this.stealList = stealList;
};

Window_ResultDropItem.prototype.drawItemName = function(item, x, y, width) {
  if (Imported.NUUN_ItemNameColor && item.meta.ResultItemColor) {
    this.nameColor = ColorManager.textColor(Number(item.meta.ResultItemColor))
  }
  Window_Base.prototype.drawItemName.call(this, item, x, y, width);
};

Window_ResultDropItem.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
  const unitWidth = Math.min(80, this.textWidth(unit));
  const valueWidth = this.textWidth(value);
  this.resetTextColor();
  this.drawText(value, x, y, width - unitWidth - 6, "left");
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(unit, x + valueWidth, y, unitWidth, "left");
};



function Window_ResultLearnSkill() {
  this.initialize(...arguments);
}

Window_ResultLearnSkill.prototype = Object.create(Window_StatusBase.prototype);
Window_ResultLearnSkill.prototype.constructor = Window_ResultLearnSkill;

Window_ResultLearnSkill.prototype.initialize = function(rect) {
  Window_StatusBase.prototype.initialize.call(this, rect);
  this.openness = 255;
  this.page = 0;
  this.maxPage = 0;
  this.skillRows = Math.floor((this.innerHeight - this.lineHeight() * (this.skillTop() + 1)) / this.lineHeight());
  this.opacity = 0;
  this.frameVisible = false;
};

Window_ResultLearnSkill.prototype.setWindowActorResult = function(windowActorResult) {
  this._windowActorResult = windowActorResult;
};

Window_ResultLearnSkill.prototype.maxPages = function() {
  return Math.ceil(this._windowActorResult._actor._learnSkill.length / this.skillRows)
};

Window_ResultLearnSkill.prototype.refresh = function() {
  this.contents.clear();
  const rect = this.itemRect(0);
  const lineHeight = this.lineHeight();
  const itemPadding = this.itemPadding();
  const actor = this._windowActorResult._actor;
  this.drawLearnSkill(actor, rect.x + rect.width / 2 + itemPadding, rect.y + lineHeight * this.skillTop(), rect.width / 2 - itemPadding);
};

Window_ResultLearnSkill.prototype.drawLearnSkill = function(actor, x, y, width) {
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

Window_ResultLearnSkill.prototype.skillTop = function() {
  return param.FaceVisible ? 4.5 : 2;
};

Window_ResultLearnSkill.prototype.gainParamLength = function() {
  return param.GainParam.length;
};

Window_ResultLearnSkill.prototype.drawItemName = function(item, x, y, width) {
  if (Imported.NUUN_ItemNameColor && item.meta.ResultItemColor) {
    this.nameColor = ColorManager.textColor(Number(item.meta.ResultItemColor))
  }
  Window_Base.prototype.drawItemName.call(this, item, x, y, width);
};


function Sprite_ResultActor() {
  this.initialize(...arguments);
}

Sprite_ResultActor.prototype = Object.create(Sprite.prototype);
Sprite_ResultActor.prototype.constructor = Sprite_ResultActor;

Sprite_ResultActor.prototype.initialize = function() {
  Sprite.prototype.initialize.call(this);
  this.initMembers();
};

Sprite_ResultActor.prototype.initMembers = function() {
  this._battler = null;
};

Sprite_ResultActor.prototype.setup = function(battler, bitmap, scale) {
  if (this._battler !== battler) {
    this.scale.x = 1.0;
    this.scale.y = 1.0;
  }
  this._battler = battler;
  this.bitmap = bitmap;
  this.scale.x *= scale;
  this.scale.y *= scale;
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
    const height = typeof this.textHeight === 'function' ? this.textHeight() : this.bitmapHeight();
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
  return Math.max(Math.floor(param.GaugeRefreshFrame * this.smoothSpeed()), 1);
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
  this._victoryStart = false;
  this.resultRefresh = 0;
  this.resultBusy = this.setResultBusy();
  this.resultPage = 0;
};

const _BattleManager_update = BattleManager.update;
BattleManager.update = function(timeActive) {
  _BattleManager_update.call(this, timeActive);
  if (this.resultRefresh > 0) {
    this.resultRefresh--;
  }
};

BattleManager.setResultBusy = function() {
  return this.resultBusy = param.ResultVisibleFrame || 0;
};

BattleManager.startResultBusy = function() {
  return this.resultBusy === param.ResultVisibleFrame || 0;
};

const _BattleManager_processVictory = BattleManager.processVictory;
BattleManager.processVictory = function() {
  if (this.startResultBusy()) {
    this._victoryOn = true;
    if (this.resultBusy === 0) {
      _BattleManager_processVictory.call(this);
      return;
    }
    this.displayVictoryNoBusy();
  }
  if (this.resultBusy > 0) {
    this.resultBusy--;
  }
  if (this.resultBusy === 0) {
    _BattleManager_processVictory.call(this);
    this.displayVictoryOnBusy();
  }
};

BattleManager.displayVictoryNoBusy = function() {
  $gameParty.removeBattleStates();
  $gameParty.performVictory();
  this.playVictoryMe();
  this.replayBgmAndBgs();
  this.makeRewards();
  this._victoryStart = true;
};

BattleManager.displayVictoryOnBusy = function() {
  this._victoryStart = false;
};

const _BattleManager_makeRewards = BattleManager.makeRewards;
BattleManager.makeRewards = function() {
  if (!this._victoryStart) {
    _BattleManager_makeRewards.call(this);
    if (param.StealItemVisible && Imported.NUUN_StealableItems) {
      this._rewards.stealItems = $gameTroop.getStealItems();
    }
  }
};

BattleManager.displayVictoryMessage = function() {
  //メッセージは表示しない。
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
  return SceneManager._scene._resultWindow.active || SceneManager._scene._actorResultWindow.active || _BattleManager_isBusy.call(this);
};

const _BattleManager_replayBgmAndBgs = BattleManager.replayBgmAndBgs;
BattleManager.replayBgmAndBgs = function() {
  if (this._victoryStart) {
    return;
  }
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
  if (this._victoryStart) {
    return;
  }
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

const _BattleManager_isBattleEnd = BattleManager.isBattleEnd;
BattleManager.isBattleEnd = function() {
  return _BattleManager_isBattleEnd.call(this) || this._victoryOn;
};

function battlreActorPicture(id) {//立ち絵表示EX用
  const actors = param.ActorPictureData;
  const find = actors.find(actor => actor.actorId === id);
  if (!find) {
    return {Actor_X: 0, Actor_Y: 0, Img_SX: 0, Img_SY: 0, Actor_Scale: 100};
  }
  return find;
};

})();