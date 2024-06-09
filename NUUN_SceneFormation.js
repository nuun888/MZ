/*:-----------------------------------------------------------------------------------
 * NUUN_SceneFormation.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc メンバー変更画面
 * @author NUUN
 * @version 1.7.10
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * メンバーを並び変える画面を追加します。
 * メニューコマンドの並び替えを選択するとメンバーチェンジ画面が表示されるようになります。
 * 戦闘メンバー、待機メンバーの画像はキャラチップ、顔グラから選択できます。（デフォルトではキャラチップ）
 * 
 * 戦闘不能のキャラはデフォルト設定では背景が赤く表示されます。
 * 
 * 選択中のアクターのステータスはカスタマイズ可能です。
 * 
 * ウィンドウ基準0をONにした場合、ウィンドウの基準座標を0,0にします。
 * なおウィンドウ中央自動調整をONにしている場合、X座標だけ中央になるよう自動調整され
 * てしまいますのでX座標を調整する場合はOFFにしてください。
 * ステータスウィンドウの高さは244です。（プラグインにより異なる場合があります）
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/6/9 Ver.1.7.10
 * 処理の修正。
 * 2024/5/25 Ver.1.7.9
 * ターン制でメンバー変更画面を閉じた時に、行動回数が再設定される問題を修正。
 * 2023/8/6 Ver.1.7.8
 * 処理の修正。
 * 2023/7/24 Ver.1.7.7
 * 処理の修正。
 * 2022/11/20 Ver.1.7.6
 * 初回表示時にアクターのステータスが表示されない問題を修正。
 * デフォルトの立ち絵切り替えが機能していなかった問題を修正。
 * 2022/10/28 Ver.1.7.5
 * アクター固定化プラグインの固定アクター戦闘メンバーへの移動可をOFFにしたときに固定アクターが移動できてしまう問題を修正。
 * 2022/9/22 Ver.1.7.4
 * アクターステータスウィンドウのコンテンツ背景をONにするとエラーが出る問題を修正。
 * 2022/7/30 Ver.1.7.3
 * 戦闘中に無限ループを起こしゲームが停止してしまう問題を修正。
 * 2022/7/26 Ver.1.7.2
 * 最大メンバー増減が正常に機能しない場合がある問題を修正。
 * 最大メンバー増減後にフォロワーの表示が正常に表示されない問題を修正。
 * 2022/6/15 Ver.1.7.1
 * 微修正。
 * 2022/3/30 Ver.1.7.0
 * 戦闘メンバー、待機メンバーの画像に顔グラを選択できる機能を追加。
 * 戦闘メンバーの表示列、行数を設定できる機能を追加。
 * Ver.1.6.0以降でのサポートアクター対応。
 * 2022/2/26 Ver.1.6.3
 * 戦闘中に画面を閉じるとアクター選択コマンドがキャンセル扱いにされる問題を修正。
 * メンバー入れ替え時のカーソルの処理を変更。
 * 2022/2/25 Ver.1.6.2
 * TPBが溜まっているアクターを交換するとアクターウィンドウがアクティブになる問題を修正。
 * 戦闘中にアクターを入れ替えて再度画面を開いてアクターを選択するとカーソルの表示がおかしくなる問題を修正。
 * 2022/2/23 Ver.1.6.1
 * 固定アクター対応により処理修正。
 * 2022/2/23 Ver.1.6.0
 * 戦闘メンバー人数の可変対応。
 * 2021/12/26 Ver.1.5.2
 * 立ち絵、顔グラ表示EX用の立ち絵設定が設定できなかった問題を修正。
 * 2021/12/14 Ver.1.5.1
 * 立ち絵、顔グラ表示EXを入れてない状態で開くとエラーが出る問題を修正。
 * 2021/12/11 Ver.1.5.0
 * 立ち絵、顔グラ表示EXに対応。
 * 2021/11/27 Ver.1.4.1
 * Ver.1.4.0（当プラグイン）アップデート後、ゲーム開始時にエラーが出る問題を修正。
 * 2021/11/27 Ver.1.4.0
 * 立ち絵を表示できる機能を追加。
 * 立ち絵を切り替えられるプラグインコマンドを追加。
 * 顔グラが表示されない問題を修正。
 * 一部の項目で名称が適用されない問題を修正。
 * オリジナルパラメータにも小数点を指定できるように変更。
 * 2021/11/15 Ver.1.3.0
 * ウィンドウの配置を戦闘用と別々に設定できるように変更。
 * 控えメンバーのウィンドウのX座標がある程度の座標で止まる問題を修正。
 * 2021/9/23 Ver.1.2.5
 * 固定アクターが待機メンバーの最後のキャラと入れ替えた時に入れ替えが出来てしまう問題を修正。
 * 2021/9/22 Ver.1.2.4
 * アクター並び替え固定プラグインの固定アクターの移動が正常に行えていなかった問題を修正。
 * 2021/9/21 Ver.1.2.3
 * アクター並び替え固定プラグインの固定アクター戦闘メンバーへの移動可対応。
 * 2021/9/18 Ver.1.2.2
 * アクター並び替え固定プラグインとの併用時にエラーが出る問題を修正。
 * 2021/9/17 Ver.1.2.1
 * 戦闘メンバーから控えメンバーにカーソルが移るときに空白にカーソルが選択してしまう問題を修正。
 * 2021/9/4 Ver.1.2.0
 * 表示できるステータスに経験値を追加。
 * 戦闘メンバー、待機メンバーにレベルを表示する機能を追加。
 * 2021/8/25 Ver.1.1.1
 * アクター並び替え固定プラグインの待機固定アクター移動可に対応。
 * 固定アクターの背景色を変更できる機能を追加。
 * 2021/8/24 Ver.1.1.0
 * ステータスウィンドウ以外を中央（待機メンバーウィンドウ基準）揃えにする機能を追加。（戦闘時共通）
 * Y座標を指定できる機能を追加。（戦闘時共通）
 * 2021/8/18 Ver.1.0.2
 * 戦闘メンバーが最大戦闘メンバー未満の時にエラーが起きる問題を修正。
 * 2021/8/17 Ver.1.0.1
 * サポートアクターに対応。
 * 2021/8/15 Ver.1.0.0
 * 初版
 * 
 * @command ChangeFormationActorImg
 * @desc メンバー変更画面のアクター画像を変更します。
 * @text メンバー変更画面アクター画像変更
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
 * @desc 変更する立ち絵のIDを指定します。立ち絵設定の画像設定のリスト番号を指定します。
 * @text 立ち絵ID
 * 
 * @command SceneFormationOpen
 * @desc メンバー変更画面を開きます。
 * @text メンバー変更画面を開く
 * 
 * 
 * @param BasicSetting
 * @text 基本設定
 * @default ------------------------------
 * 
 * @param VariableBattleMember
 * @text 戦闘メンバー数可変
 * @desc 戦闘メンバー数。
 * @type boolean
 * @default false
 * @parent BasicSetting
 * 
 * @param CharacterMode
 * @text メンバー画像
 * @desc 表示するメンバー画像の表示形式を選択します。
 * @type select
 * @option キャラチップ
 * @value 'chip'
 * @option 顔グラフィック
 * @value 'face'
 * @default 'chip'
 * @parent BasicSetting
 * 
 * @param WindowCenter
 * @text ウィンドウ中央自動調整
 * @desc ウィンドウを中央に自動調整します。待機メンバーウィンドウの横幅で調整されます。(メニュー)
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param WindowZero
 * @text ウィンドウ基準0
 * @desc すべてのウィンドウの座標基準を0,0にします。独自にレイアウトを変更したい場合に使用してください。(メニュー)
 * @type boolean
 * @default false
 * @parent BasicSetting
 * 
 * @param DeadActorColor
 * @text 戦闘不能アクター背景色
 * @desc 戦闘不能アクターの背景色。(メニュー、戦闘共通)
 * @type number
 * @default 18
 * @min -1
 * @parent BasicSetting
 * 
 * @param DecimalMode
 * @text 端数処理四捨五入
 * @desc 表示外小数点を四捨五入で丸める。（falseで切り捨て）(メニュー、戦闘共通)
 * @type boolean
 * @default true
 * @parent Setting
 * @parent BasicSetting
 * 
 * @param MemberHeight
 * @text メンバー表示高さ
 * @desc メンバーの表示高さ。
 * @type number
 * @default 48
 * @min -9999
 * @parent BasicSetting
 * 
 * @param LavelVisible
 * @text レベル表示
 * @desc 戦闘メンバー及び待機メンバーのアクターにレベルを表示。(メニュー、戦闘共通)
 * @type boolean
 * @default false
 * @parent BasicSetting
 * 
 * @param LevelFontSize
 * @desc レベルのフォントサイズ。(メインフォントからの差)
 * @text レベルフォントサイズ
 * @type number
 * @default -10
 * @min 99
 * @parent BasicSetting
 * 
 * @param BattleMemberNameSetting
 * @text 戦闘メンバー名称ウィンドウ設定
 * @default ------------------------------
 * 
 * @param BattleMemberName
 * @text 戦闘メンバー名称
 * @desc 戦闘メンバー名称(メニュー、戦闘共通)
 * @type string
 * @default 戦闘メンバー
 * @parent BattleMemberNameSetting
 * 
 * @param BattleMemberName_X
 * @text 戦闘メンバー名称ウィンドウX座標
 * @desc 戦闘メンバー名称ウィンドウX座標(メニュー)
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleMemberNameSetting
 * 
 * @param BattleMemberName_Y
 * @text 戦闘メンバー名称ウィンドウY座標（相対）
 * @desc 戦闘メンバー名称ウィンドウY座標（相対）(メニュー)
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleMemberNameSetting
 * 
 * @param MemberNameSetting
 * @text 待機メンバー名称ウィンドウ設定設定
 * @default ------------------------------
 * 
 * @param MemberName
 * @text 待機メンバー名称
 * @desc 待機メンバー名称(メニュー、戦闘共通)
 * @type string
 * @default 待機メンバー
 * @parent MemberNameSetting
 * 
 * @param MemberName_X
 * @text 待機メンバー名称ウィンドウX座標
 * @desc 待機メンバー名称ウィンドウX座標(メニュー)
 * @type number
 * @default 0
 * @min -9999
 * @parent MemberNameSetting
 * 
 * @param MemberName_Y
 * @text 待機メンバー名称ウィンドウY座標（相対）
 * @desc 待機メンバー名称ウィンドウY座標（相対）(メニュー)
 * @type number
 * @default 0
 * @min -9999
 * @parent MemberNameSetting
 * 
 * @param BattleMemberSetting
 * @text 戦闘メンバーウィンドウ設定
 * @default ------------------------------
 * 
 * @param BattleMember_Cols
 * @text 戦闘メンバー横表示数
 * @desc 戦闘メンバー横表示数(メニュー) 0で最大メンバー数に応じて表示幅が変わります。
 * @type number
 * @default 0
 * @min 0
 * @parent BattleMemberSetting
 * 
 * @param BattleMember_Rows
 * @text 戦闘メンバー縦表示数
 * @desc 戦闘メンバー縦表示数(メニュー)
 * @type number
 * @default 1
 * @min 1
 * @parent BattleMemberSetting
 * 
 * @param BattleMember_X
 * @text 戦闘メンバーウィンドウX座標
 * @desc 戦闘メンバーウィンドウX座標(メニュー)
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleMemberSetting
 * 
 * @param BattleMember_Y
 * @text 戦闘メンバーウィンドウY座標（相対）
 * @desc 戦闘メンバーウィンドウY座標（相対）(メニュー)
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleMemberSetting
 * 
 * @param MemberSetting
 * @text 待機メンバーウィンドウ設定
 * @default ------------------------------
 * 
 * @param Member_Cols
 * @text 待機メンバー横表示数
 * @desc 待機メンバー横表示数(メニュー)
 * @type number
 * @default 10
 * @min 0
 * @parent MemberSetting
 * 
 * @param Member_Rows
 * @text 待機メンバー縦表示数
 * @desc 待機メンバー縦表示数(メニュー)
 * @type number
 * @default 1
 * @parent MemberSetting
 * 
 * @param Member_X
 * @text 待機メンバーウィンドウX座標
 * @desc 待機メンバーウィンドウX座標(メニュー)
 * @type number
 * @default 0
 * @min -9999
 * @parent MemberSetting
 * 
 * @param Member_Y
 * @text 待機メンバーウィンドウY座標（相対）(メニュー)
 * @desc 待機メンバーウィンドウY座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @parent MemberSetting
 * 
 * @param StatusSetting
 * @text ステータスウィンドウ設定
 * @default ------------------------------
 * 
 * @param ActorStatus
 * @text 表示ステータス設定
 * @desc アクターの表示ステータス設定(メニュー、戦闘共通)
 * @default ["{\"DateSelect\":\"1\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}","{\"DateSelect\":\"100\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}","{\"DateSelect\":\"4\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"2\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"100\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}","{\"DateSelect\":\"3\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"3\",\"Y_Position\":\"1\",\"X_Coordinate\":\"-50\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}","{\"DateSelect\":\"5\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"144\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}","{\"DateSelect\":\"10\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"5\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"20\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}","{\"DateSelect\":\"11\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"6\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"10\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}","{\"DateSelect\":\"60\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"4\",\"Y_Position\":\"1\",\"X_Coordinate\":\"-50\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"240\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}","{\"DateSelect\":\"12\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"2\",\"Y_Position\":\"2\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}","{\"DateSelect\":\"13\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"2\",\"Y_Position\":\"3\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}","{\"DateSelect\":\"14\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"2\",\"Y_Position\":\"4\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}","{\"DateSelect\":\"15\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"3\",\"Y_Position\":\"2\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}","{\"DateSelect\":\"16\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"3\",\"Y_Position\":\"3\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}","{\"DateSelect\":\"17\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"3\",\"Y_Position\":\"4\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}","{\"DateSelect\":\"40\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"2\",\"Y_Position\":\"5\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"380\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}","{\"DateSelect\":\"41\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"2\",\"Y_Position\":\"6\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"380\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}"]
 * @type struct<ActorStatusList>[]
 * @parent StatusSetting
 * 
 * @param EquipNameVisible
 * @text 装備部位名表示
 * @desc 表示する装備部位名を指定します。(メニュー、戦闘共通)
 * @type select
 * @option なし
 * @value 0
 * @option 部位のみ
 * @value 1
 * @option アイコンのみ
 * @value 2
 * @option アイコン、部位
 * @value 3
 * @default 0
 * @parent StatusSetting
 * 
 * @param EquipIcons
 * @type struct<EquipIconsData>[]
 * @text 装備アイコン
 * @desc 装備アイコンを設定します。IDは装備スロットの番号と同じです。(メニュー、戦闘共通)
 * @default []
 * @parent StatusSetting
 * 
 * @param Status_X
 * @text ステータスウィンドウX座標
 * @desc ステータスウィンドウX座標(メニュー)
 * @type number
 * @default 0
 * @min -9999
 * @parent StatusSetting
 * 
 * @param Status_Y
 * @text ステータスウィンドウY座標（相対）
 * @desc ステータスウィンドウY座標（相対）(メニュー)
 * @type number
 * @default 0
 * @min -9999
 * @parent StatusSetting
 * 
 * @param ActorImgSetting
 * @text 立ち絵設定
 * @default ------------------------------
 *
 * @param ActorsImgList
 * @text 画像設定
 * @desc アクターの画像設定
 * @default []
 * @type struct<actorImgList>[]
 * @parent ActorImgSetting
 * 
 * @param ActorPictureData
 * @text 立ち絵表示EX用画像設定
 * @desc 立ち絵表示EXでのアクターの画像設定
 * @default []
 * @type struct<ActorPictureDataList>[]
 * @parent ActorImgSetting
 * 
 * @param ActorPictureEXApp
 * @text 立ち絵表示EX適用
 * @desc 立ち絵表示EXの画像変更を適用します。OFFにした場合はこのプラグインでの設定が適用されます。
 * @type boolean
 * @default true
 * @parent ActorImgSetting
 * 
 * @param DynamicFace
 * @desc メンバー画像が顔グラまたは立ち絵指定時の戦闘メンバー、待機メンバーの顔グラを条件による変化させます。（要立ち絵、顔グラ表示EX）
 * @text 条件顔グラ、立ち絵変化
 * @type boolean
 * @default false
 * @parent ActorImgSetting
 * 
 * @param BackActorPicture
 * @desc 背後に表示されるアクター立ち絵を表示させません。メンバーウィンドウは表示されます。(メンバー表示が立ち絵の時などに)
 * @text 背後立ち絵非表示
 * @type boolean
 * @default false
 * @parent ActorImgSetting
 * 
 * @param ActorFixedSetting
 * @text アクター並び替え固定設定(要Imported.NUUN_ActorFixed)
 * @default ------------------------------
 * 
 * @param FixedActorBackColor
 * @text 固定アクター背景色
 * @desc 固定アクターの背景色。(メニュー、戦闘共通)
 * @type number
 * @default 3
 * @min -1
 * @parent ActorFixedSetting
 *  
 */
/*~struct~ActorStatusList:
 *
 * @param DateSelect
 * @text 表示するステータス
 * @desc 表示するステータスを指定します。
 * @type select
 * @option なし
 * @value 0
 * @option アクター名(4)(5)(6)(7)(8)
 * @value 1
 * @option 二つ名(4)(5)(6)(7)(8)
 * @value 2
 * @option 職業(4)(5)(6)(7)(8)
 * @value 3
 * @option レベル(4)(5)(6)(7)(8)
 * @value 4
 * @option ステート(4)(5)(6)(7)(8)
 * @value 5
 * @option ＨＰ(4)(5)(6)(7)(8)
 * @value 10
 * @option ＭＰ(4)(5)(6)(7)(8)
 * @value 11
 * @option 攻撃力(1)～(9)(13)
 * @value 12
 * @option 防御力(1)～(9)(13)
 * @value 13
 * @option 魔力(1)～(9)(13)
 * @value 14
 * @option 魔法防御(1)～(9)(13)
 * @value 15
 * @option 敏捷性(1)～(9)(13)
 * @value 16
 * @option 運(1)～(9)(13)
 * @value 17
 * @option ＴＰ(4)(5)(6)(7)(8)
 * @value 19
 * @option 命中率(1)～(11)(13)
 * @value 20
 * @option 回避率(1)～(11)(13)
 * @value 21
 * @option 会心率(1)～(11)(13)
 * @value 22
 * @option 会心回避率(1)～(11)(13)
 * @value 23
 * @option 魔法回避率(1)～(11)(13)
 * @value 24
 * @option 魔法反射率(1)～(11)(13)
 * @value 25
 * @option 反撃率(1)～(11)(13)
 * @value 26
 * @option HP再生率(1)～(11)(13)
 * @value 27
 * @option MP再生率(1)～(11)(13)
 * @value 28
 * @option TP再生率(1)～(11)(13)
 * @value 29
 * @option 狙われ率(1)～(11)(13)
 * @value 30
 * @option 防御効果率(1)～(11)(13)
 * @value 31
 * @option 回復効果率(1)～(11)(13)
 * @value 32
 * @option 薬の知識(1)～(11)(13)
 * @value 33
 * @option MP消費率(1)～(11)(13)
 * @value 34
 * @option TPチャージ率(1)～(11)(13)
 * @value 35
 * @option 物理ダメージ率(1)～(11)(13)
 * @value 36
 * @option 魔法ダメージ率(1)～(11)(13)
 * @value 37
 * @option 床ダメージ率(1)～(11)(13)
 * @value 38
 * @option 獲得経験値率(1)～(11)(12)
 * @value 39
 * @option 現在の経験値(1)(4)(5)(6)(7)(8)(9)
 * @value 40
 * @option 次のレベルまでの経験値(1)(4)(5)(6)(7)(8)(9)
 * @value 41
 * @option 次のレベルまでの経験パーセント(1)(4)(5)(6)(7)(8)(9)(10)(11)
 * @value 42
 * @option オリジナルパラメータ(1)(2)(3)(4)(5)(6)(7)(8)(9)(11)
 * @value 50
 * @option 名称のみ(1)(2)(4)(5)(6)(7)(8)
 * @value 51
 * @option 装備(1)(4)(5)(6)(7)(8)(9)(13)(14)(15)
 * @value 60
 * @option 記述欄(1)(4)(5)(6)(7)(8)(12)
 * @value 70
 * @option 顔グラフィック(4)(5)(6)(7)
 * @value 100
 * @option キャラチップ（未実装）
 * @value 101
 * @option ライン(1)(3)(4)(5)(6)(7)(8)
 * @value 1000
 * @default 0
 * 
 * @param NameColor
 * @desc システム項目の文字色。
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
 * @desc 評価式。
 * @text 評価式(javaScript)(3)
 * @type 
 * @default
 * 
 * @param X_Position
 * @text X表示列位置(4)
 * @desc X表示列位置
 * @type number
 * @default 1
 * @min 1
 * @max 5
 * 
 * @param Y_Position
 * @desc Y表示行位置
 * @text Y表示行位置(5)
 * @type number
 * @default 1
 * @max 9999
 * @min 1
 * 
 * @param X_Coordinate
 * @text X座標（相対）(6)
 * @desc X座標（X表示列位置からの相対座標）
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param Y_Coordinate
 * @text Y座標（相対）(7)
 * @desc Y座標（Y表示列位置からの相対座標）
 * @type number
 * @default 0
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
 * @param paramUnit
 * @desc 単位を設定します。
 * @text 単位(10)
 * @type string
 * @default 
 * 
 * @param Decimal
 * @text 小数点桁数(11)
 * @desc 表示出来る小数点桁数。
 * @type number
 * @default 0
 * @min 0
 * @max 99
 * 
 * @param textMethod
 * @desc 記述欄に紐づけするタグ名
 * @text 記述欄タグ名(12)
 * @type string
 * @default 
 * 
 * @param Back
 * @text コンテンツ背景表示(13)
 * @desc コンテンツ背景を表示させます。
 * @type boolean
 * @default false
 * 
 * @param EquipSetting
 * @text 装備設定
 * @default ------------------------------
 * 
 * @param EquipStartIndex
 * @text 開始インデックス(14)
 * @desc 装備欄の開始インデックスを指定します。
 * @type number
 * @default 0
 * @max 999999
 * @parent EquipSetting
 * 
 * @param EquipNum
 * @text 表示装備数(15)
 * @desc 装備欄の表示を指定します。(0で制限なし)
 * @type number
 * @default 0
 * @parent EquipSetting
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
 * @default []
 * 
 * @param BackActorImgSetting
 * @text 背後画像設定
 * @default ------------------------------
 * 
 * @param Actor_X
 * @desc 画像の表示位置X座標。
 * @text 画像表示位置X座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent BackActorImgSetting
 * 
 * @param Actor_Y
 * @desc 画像の表示位置Y座標。
 * @text 画像表示位置Y座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent BackActorImgSetting
 * 
 * @param Actor_Scale
 * @desc 画像の拡大率。
 * @text 画像拡大率
 * @type number
 * @default 100
 * @min 0
 * @max 999
 * @parent BackActorImgSetting
 * 
 * @param WindowSetting
 * @text メンバーウィンドウ画像設定
 * @default ------------------------------
 * 
 * @param wActor_X
 * @desc 画像の表示位置X座標。
 * @text 画像表示位置X座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent WindowSetting
 * 
 * @param wActor_Y
 * @desc 画像の表示位置Y座標。
 * @text 画像表示位置Y座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent WindowSetting
 * 
 * @param wImg_SX
 * @desc 画像の表示開始座標X。
 * @text 画像表示開始座標X
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent WindowSetting
 * 
 * @param wImg_SY
 * @desc 画像の表示開始座標Y
 * @text 画像表示開始座標Y
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent WindowSetting
 * 
 * @param wActor_Scale
 * @desc 画像の拡大率。
 * @text 画像拡大率
 * @type number
 * @default 100
 * @min 0
 * @max 999
 * @parent WindowSetting
 *  
 */
/*~struct~ActorPictureDataList:
 * 
 * @param actorId
 * @text アクター
 * @desc アクターを指定します。
 * @type actor
 * 
 * @param BackActorImgSetting
 * @text 背後画像設定
 * @default ------------------------------
 * 
 * @param Actor_X
 * @desc 画像の表示位置X座標。
 * @text 画像表示位置X座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent BackActorImgSetting
 * 
 * @param Actor_Y
 * @desc 画像の表示位置Y座標。
 * @text 画像表示位置Y座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent BackActorImgSetting
 * 
 * @param Actor_Scale
 * @desc 画像の拡大率。
 * @text 画像拡大率
 * @type number
 * @default 100
 * @min 0
 * @max 999
 * @parent BackActorImgSetting
 * 
 * @param WindowSetting
 * @text メンバーウィンドウ画像設定
 * @default ------------------------------
 * 
 * @param wActor_X
 * @desc 画像の表示位置X座標。
 * @text 画像表示位置X座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent WindowSetting
 * 
 * @param wActor_Y
 * @desc 画像の表示位置Y座標。
 * @text 画像表示位置Y座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent WindowSetting
 * 
 * @param wImg_SX
 * @desc 画像の表示開始座標X。
 * @text 画像表示開始座標X
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent WindowSetting
 * 
 * @param wImg_SY
 * @desc 画像の表示開始座標Y
 * @text 画像表示開始座標Y
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent WindowSetting
 * 
 * @param wActor_Scale
 * @desc 画像の拡大率。
 * @text 画像拡大率
 * @type number
 * @default 100
 * @min 0
 * @max 999
 * @parent WindowSetting
 *  
 */
var Imported = Imported || {};
Imported.NUUN_SceneFormation = true;


(() => {
const parameters = PluginManager.parameters('NUUN_SceneFormation');
const parameters2 = PluginManager.parameters('NUUN_SceneBattleFormation');
const parameters3 = PluginManager.parameters('NUUN_SceneFormation_SupportActor');
const param = {};
const VariableBattleMember = eval(parameters['VariableBattleMember'] || "true");
const CharacterMode = eval(parameters['CharacterMode']) || 'chip';
const BattleMemberName = String(parameters['BattleMemberName'] || "戦闘メンバー");
const MemberName = String(parameters['MemberName'] || "待機メンバー");
param.LevelFontSize = Number(parameters['LevelFontSize'] || -10);
param.MemberHeight = Number(parameters['MemberHeight'] || 48);
param.BattleMemberName_X = Number(parameters['BattleMemberName_X'] || 0);
param.BattleMemberName_Y = Number(parameters['BattleMemberName_Y'] || 0);
param.MemberName_X = Number(parameters['MemberName_X'] || 0);
param.MemberName_Y = Number(parameters['MemberName_Y'] || 0);
param.BattleMember_Cols = Number(parameters['BattleMember_Cols'] || 0);
param.BattleMember_Rows = Number(parameters['BattleMember_Rows'] || 1);
param.BattleMember_X = Number(parameters['BattleMember_X'] || 0);
param.BattleMember_Y = Number(parameters['BattleMember_Y'] || 0);
param.Member_X = Number(parameters['Member_X'] || 0);
param.Member_Y = Number(parameters['Member_Y'] || 0);
param.BattleMemberWindowWidth = Number(parameters['BattleMemberWindowWidth'] || 0);
param.BattleMemberWindowHeight = Number(parameters['BattleMemberWindowHeight'] || 0);
param.MemberWindowWidth = Number(parameters['MemberWindowWidth'] || 0);
param.MemberWindowHeight = Number(parameters['MemberWindowHeight'] || 0);
param.Status_X = Number(parameters['Status_X'] || 0);
param.Status_Y = Number(parameters['Status_Y'] || 0);
param.WindowZero = eval(parameters['WindowZero'] || "false");
param.Member_Cols = Number(parameters['Member_Cols'] || 10);
param.Member_Rows = Number(parameters['Member_Rows'] || 1);
param.WindowCenter = eval(parameters['WindowCenter'] || "true");
const ActorStatus = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ActorStatus'])) : [];
const DecimalMode = eval(parameters['DecimalMode'] || "true");
const EquipIcons = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['EquipIcons'])) : [];
const EquipNameVisible = Number(parameters['EquipNameVisible'] || 1);
const DeadActorColor = (DataManager.nuun_structureData(parameters['DeadActorColor'])) || 18;
const FixedActorBackColor =(DataManager.nuun_structureData(parameters['FixedActorBackColor'])) || 3;
const LavelVisible = eval(parameters['LavelVisible'] || "false");
const ActorsImgList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ActorsImgList'])) : null) || [];
const ActorPictureData = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ActorPictureData'])) : null) || [];
const ActorPictureEXApp = eval(parameters['ActorPictureEXApp'] || "true");
const CommandShowMode = eval(parameters2['CommandShowMode']) || 'Party';
const SupportActorBackColor = (DataManager.nuun_structureData(parameters3['SupportActorBackColor'])) || 5;
const DynamicFace = eval(parameters['DynamicFace'] || "true");
const BackActorPicture = eval(parameters['BackActorPicture'] || "true");
const FormationCommandName = String(parameters['FormationCommandName'] || "");

let cursorMode = 'battle';
let pendingMode = null;
let formationIndex = -1;
let pendingIndex = -1;
let statusWindow = null;
let formationOldActor = null;

const pluginName = "NUUN_SceneFormation";

PluginManager.registerCommand(pluginName, 'SceneFormationOpen', args => {
  if (Imported.NUUN_SceneBattleFormation && $gameParty.inBattle()) {
    SceneManager._scene.commandFormation();
  } else {
    SceneManager.push(Scene_Formation);
  }
});

PluginManager.registerCommand(pluginName, 'ChangeFormationActorImg', args => {
  const actorId = Number(args.actorId)
  if ($gameActors.actor(actorId)) {
    $gameActors.actor(actorId).setFormationActorImgId(Number(args.ChangeActorImgId));
  }
});

function isbattleMembersDead(actor, withdrawalActor) {
  const members = $gameParty.battleMembers().filter(member => member !== withdrawalActor && member.isDead());
  return members.length + (actor && actor.isDead() ? 1 : 0);
};

const _Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
  _Game_Actor_setup.call(this, actorId);
  this.initFormationActorImg(actorId);
};

Game_Actor.prototype.initFormationActorImg = function() {
  this.formationActorImgIndex = 0;
};

Game_Actor.prototype.getFormationActorImgIndex = function() {
  if (!this.formationActorImgIndex) {
    this.initFormationActorImg(this.actorId());
  }
  return this.formationActorImgIndex;
};

Game_Actor.prototype.setFormationActorImgId = function(changeActorImgId) {
  if (!this.formationActorImgIndex) {
    this.initFormationActorImg(this.actorId());
  }
  if (changeActorImgId >= 0) {
    this.formationActorImgIndex = changeActorImgId - 1;
  }
};

Game_Actor.prototype.getFormationActorImgData = function() {
  const actorId = this.actorId();
  return ActorsImgList.find(actor => actor.actorId === actorId);
};

Game_Actor.prototype.getFormationActorImg = function(data) {
  const find = data ? data : this.getFormationActorImgData();
  return find ? find.ActorImg[this.getFormationActorImgIndex()] : null;
};

const _Game_Party_initialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
  this._formationBattleMembers = null;
  _Game_Party_initialize.call(this);
};

Game_Party.prototype.getFormationBattleMember = function() {
  return this._formationBattleMembers;
};

const _Game_Party_maxBattleMembers = Game_Party.prototype.maxBattleMembers;
Game_Party.prototype.maxBattleMembers = function() {
  if (this._formationBattleMembers) {
    return Math.min(this.getFormationBattleMember(), _Game_Party_maxBattleMembers.call(this));
  } else {
    this._formationBattleMembers = _Game_Party_maxBattleMembers.call(this);
    return this._formationBattleMembers;
  }
};

Game_Party.prototype.formationBattleMember = function() {
  const members = this.battleMembers();
  if (VariableBattleMember) {
    members.push(null);
  }
  return members;
};

Game_Party.prototype.formationMember = function() {
  const members = this.allStandByMembers();
  if (VariableBattleMember) {
    members.push(null);
  }
  return members;
};

Game_Party.prototype.allStandByMembers = function() {
  return this.allMembers().filter(member => member.isAppeared()).slice(this.maxBattleMembers());
};

Game_Party.prototype.checkFormationBattleMember = function(addActor, withdrawalActor) {
  let battleMember = this.battleMembers().filter(member => member !== withdrawalActor);
  if (addActor) {
    battleMember.push(addActor);
  }
  return !battleMember.every(member => member.isDead());
};

Game_Party.prototype.withdrawalOrder = function(index) {
  const withdrawalActor = this._actors.splice(index, 1);
  Array.prototype.push.apply(this._actors, [withdrawalActor]);
};

Game_Party.prototype.entryOrder = function(index) {
  const entryActor = this._actors[index];
  const members = this.formationBattleMember();
  index += index >= members.length ? 1 : 0;
  this._actors.splice(members.length - 1, 0, entryActor);
  this._actors.splice(index, 1);
};

Game_Party.prototype.changeWithdrawaBattleMember = function() {
  const members = this._formationBattleMembers - 1;
  this._formationBattleMembers = members.clamp(1, this.battleMembers().length - 1);
};

Game_Party.prototype.changeEntryBattleMember = function() {
  const members = this._formationBattleMembers + (this.battleMembers().length === this._formationBattleMembers ? 1 : 0);
  this._formationBattleMembers = members.clamp(1, _Game_Party_maxBattleMembers.call(this));
};

Game_Party.prototype.useFormation = function() {
  return true;
};

Game_Party.prototype.checkSwap = function(index) {
  return true;
};


Scene_Base.prototype.setNuun_Formation = function(mode) {
  return new Nuun_Formation(this, mode);
};

Scene_Menu.prototype.commandFormation = function() {//再定義
  SceneManager.push(Scene_Formation);
};


function Scene_Formation() {
  this.initialize(...arguments);
}

Scene_Formation.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Formation.prototype.constructor = Scene_Formation;

Scene_Formation.prototype.initialize = function() {
  Scene_MenuBase.prototype.initialize.call(this);
  this._formation = this.setNuun_Formation(false);
};

Scene_Formation.prototype.create = function() {
  Scene_MenuBase.prototype.create.call(this);
  this._formation.create();
};

Scene_Formation.prototype.createWindowLayer = function() {
  this._formation.createBattleMemberActor();
  Scene_MenuBase.prototype.createWindowLayer.call(this);
};

const _Scene_Formation_update = Scene_Formation.prototype.update;
Scene_Formation.prototype.update = function() {
  _Scene_Formation_update.call(this);
  this._formation.update();
};


class Nuun_Formation {
  constructor(scene, mode) {
    this._scene = scene;
    this._selectIndex = 0;
    this._bmSselectIndex = 0;
    this._mSelectIndex = 0;
    this._isBattle = mode;
    this._commandWindow = null;
    $gameTemp.changeCursor = false;
    $gameTemp.changeTouch = false;
    statusWindow = null;
    cursorMode = 'battle';
    pendingMode = null;
    if (mode) {
      this.setBattleParamData();
    } else {
      this.setParamData();
    }
  }

  setBattleParamData() {
    param.BattleMemberName_X = Number(parameters2['BattleMemberName_X'] || 0);
    param.BattleMemberName_Y = Number(parameters2['BattleMemberName_Y'] || 0);
    param.MemberName_X = Number(parameters2['MemberName_X'] || 0);
    param.MemberName_Y = Number(parameters2['MemberName_Y'] || 0);
    param.BattleMember_X = Number(parameters2['BattleMember_X'] || 0);
    param.BattleMember_Y = Number(parameters2['BattleMember_Y'] || 0);
    param.Member_X = Number(parameters2['Member_X'] || 0);
    param.Member_Y = Number(parameters2['Member_Y'] || 0);
    param.Status_X = Number(parameters2['Status_X'] || 0);
    param.Status_Y = Number(parameters2['Status_Y'] || 0);
    param.WindowZero = eval(parameters2['WindowZero'] || "false");
    param.BattleMember_Cols = Number(parameters2['BattleMember_Cols'] || 4);
    param.BattleMember_Rows = Number(parameters2['BattleMember_Rows'] || 1);
    param.Member_Cols = Number(parameters2['Member_Cols'] || 10);
    param.Member_Rows = Number(parameters2['Member_Rows'] || 1);
    param.WindowCenter = eval(parameters2['WindowCenter'] || "true");
    param.BattleMemberWindowWidth = Number(parameters['BattleMemberWindowWidth'] || 0);//一時
    param.BattleMemberWindowHeight = Number(parameters['BattleMemberWindowHeight'] || 0);//一時
    param.MemberWindowWidth = Number(parameters['MemberWindowWidth'] || 0);//一時
    param.MemberWindowHeight = Number(parameters['MemberWindowHeight'] || 0);//一時
    param.MemberHeight = Number(parameters['MemberHeight'] || 48);//一時
    param.LevelFontSize = Number(parameters['LevelFontSize'] || -10);//一時
  };

  setParamData() {
    param.BattleMemberName_X = Number(parameters['BattleMemberName_X'] || 0);
    param.BattleMemberName_Y = Number(parameters['BattleMemberName_Y'] || 0);
    param.MemberName_X = Number(parameters['MemberName_X'] || 0);
    param.MemberName_Y = Number(parameters['MemberName_Y'] || 0);
    param.BattleMember_Cols = Number(parameters['BattleMember_Cols'] || 4);
    param.BattleMember_Rows = Number(parameters['BattleMember_Rows'] || 1);
    param.BattleMember_X = Number(parameters['BattleMember_X'] || 0);
    param.BattleMember_Y = Number(parameters['BattleMember_Y'] || 0);
    param.Member_X = Number(parameters['Member_X'] || 0);
    param.Member_Y = Number(parameters['Member_Y'] || 0);
    param.Status_X = Number(parameters['Status_X'] || 0);
    param.Status_Y = Number(parameters['Status_Y'] || 0);
    param.WindowZero = eval(parameters['WindowZero'] || "false");
    param.Member_Cols = Number(parameters['Member_Cols'] || 10);
    param.Member_Rows = Number(parameters['Member_Rows'] || 1);
    param.WindowCenter = eval(parameters['WindowCenter'] || "true");
    param.BattleMemberWindowWidth = Number(parameters['BattleMemberWindowWidth'] || 0);
    param.BattleMemberWindowHeight = Number(parameters['BattleMemberWindowHeight'] || 0);
    param.MemberWindowWidth = Number(parameters['MemberWindowWidth'] || 0);
    param.MemberWindowHeight = Number(parameters['MemberWindowHeight'] || 0);
    param.MemberHeight = Number(parameters['MemberHeight'] || 48);
    param.LevelFontSize = Number(parameters['LevelFontSize'] || -10);
  };

  create() {
    this.createBattleMemberWindow();
    this.createBattleMemberNameWindow();
    this.createMemberWindow();
    this.createMemberNameWindow();
    this.createMemberStatusWindow();
    this.initSelect();
  };

  createBattleMemberActor() {
    const sprite = new Sprite_FormationActor();
    this._scene.addChild(sprite);
    this._spriteActor = sprite;
    sprite.x = (Graphics.width - Graphics.boxWidth) / 2;
    sprite.y = (Graphics.height - Graphics.boxHeight) / 2;
  };

  createBattleMemberWindow() {
    const scene = this._scene;
    const rect = this.battleMemberWindowRect();
    const battleMemberWindow = new Window_FormationBattleMember(rect);
    battleMemberWindow.setHandler("ok", this.onBattleMemberOk.bind(this));
    battleMemberWindow.setHandler("cancel", this.onCancel.bind(this));
    battleMemberWindow.setSpriteActor(this._spriteActor);
    scene.addWindow(battleMemberWindow);
    if (!this._isBattle) {
      battleMemberWindow.activate();
    }
    this._battleMemberWindow = battleMemberWindow;
    if (this._isBattle) {
      battleMemberWindow.openness = 0;
    }
  };

  createBattleMemberNameWindow() {
    const rect = this.battleMemberNameWindowRect();
    const battleMemberNameWindow = new Window_FormationBattleMemberName(rect);
    this._scene.addWindow(battleMemberNameWindow);
    this._battleMemberNameWindow = battleMemberNameWindow;
    if (this._isBattle) {
      battleMemberNameWindow.openness = 0;
    }
  };

  createMemberWindow() {
    const scene = this._scene;
    const rect = this.memberWindowRect();
    const memberWindow = new Window_FormationMember(rect);
    memberWindow.setHandler("ok", this.onBattleMemberOk.bind(this));
    memberWindow.setHandler("cancel", this.onCancel.bind(this));
    memberWindow.setSpriteActor(this._spriteActor);
    scene.addWindow(memberWindow);
    this._memberWindow = memberWindow;
    if (this._isBattle) {
      memberWindow.openness = 0;
    }
  };
  
  createMemberNameWindow() {
    const rect = this.memberNameWindowRect();
    const memberNameWindow = new Window_FormationMemberName(rect);
    this._scene.addWindow(memberNameWindow);
    this._memberNameWindow = memberNameWindow;
    if (this._isBattle) {
      memberNameWindow.openness = 0;
    }
  };
  
  createMemberStatusWindow() {
    const scene = this._scene;
    const rect = this.memberStatusWindowRect();
    const memberStatusWindow = new Window_FormationStatus(rect);
    scene.addWindow(memberStatusWindow);
    this._memberStatusWindow = memberStatusWindow;
    statusWindow = memberStatusWindow;
    if (this._isBattle) {
      memberStatusWindow.openness = 0;
    }
  };

  battleMemberNameWindowRect() {
    const wx = param.BattleMemberName_X + (param.WindowCenter ? (Graphics.boxWidth - this.memberWindowWidth()) / 2 : 0);
    const wy = param.BattleMemberName_Y;
    const ww = this.nameWidth();
    const wh = this._scene.calcWindowHeight(1, true);
    return new Rectangle(wx, wy, ww, wh);
  };
  
  memberNameWindowRect() {
    const wx = param.MemberName_X + (param.WindowCenter ? (Graphics.boxWidth - this.memberWindowWidth()) / 2 : 0);
    const wy = param.MemberName_Y + (param.WindowZero ? 0 : this.memberY());
    const ww = this.nameWidth();
    const wh = this._scene.calcWindowHeight(1, true);
    return new Rectangle(wx, wy, ww, wh);
  };
  
  battleMemberWindowRect() {
    const ww = param.BattleMemberWindowWidth > 0 ? param.BattleMemberWindowWidth : ($gameSystem.windowPadding() * 2 + this.battleMemberWindowWidth());
    const wx = param.BattleMember_X + (param.WindowCenter ? (Graphics.boxWidth - this.memberWindowWidth()) / 2 : 0);
    const wy = param.BattleMember_Y + (param.WindowZero ? 0 : this._scene.calcWindowHeight(1, true));
    const wh = param.BattleMemberWindowHeight > 0 ? param.BattleMemberWindowHeight : (32 + param.BattleMember_Rows * (param.MemberHeight));
    return new Rectangle(wx, wy, ww, wh);
  };
  
  memberWindowRect() {
    const ww = param.MemberWindowWidth > 0 ? param.MemberWindowWidth : this.memberWindowWidth();
    const wx = param.Member_X + (param.WindowCenter ? (Graphics.boxWidth - ww) / 2 : 0);
    const wy = param.Member_Y + (param.WindowZero ? 0 : this.memberY() + this._scene.calcWindowHeight(1, true));
    const wh = param.MemberWindowHeight > 0 ? param.MemberWindowHeight : (32 + (param.Member_Rows) * param.MemberHeight);
    return new Rectangle(wx, wy, ww, wh);
  };
  
  memberStatusWindowRect() {
    const wx = param.Status_X;
    const wh = this._scene.calcWindowHeight(5, true);
    const wy = param.Status_Y + (param.WindowZero ? 0 : Graphics.boxHeight - wh);
    const ww = Graphics.boxWidth;
    return new Rectangle(wx, wy, ww, wh);
  };

  initSelect() {
    this._battleMemberWindow.select(0);
    this._memberWindow.setPendingIndex(-1);
    this._battleMemberWindow.setPendingIndex(-1);
    cursorMode = 'battle';
    pendingMode = null;
  };

  setCommand(command) {
    this._commandWindow = command;
  };

  update() {
    if ($gameTemp.changeCursor || $gameTemp.changeTouch) {
      if (cursorMode === 'battle') {
        this.onChangeBattleMemberOk();
      } else if (cursorMode === 'member') {
        this.onChangeMemberOk();
      }
    }
  };

  onChangeBattleMemberOk() {
    const index = Math.min(formationIndex % (this._battleMemberWindow.maxCols()), $gameParty.formationMember().length - 1, param.Member_Cols);
    this._battleMemberWindow.deselect();
    this._battleMemberWindow.deactivate();
    this._memberWindow.activate();
    if ($gameTemp.changeCursor) {
      this._memberWindow.select(index);
    }
    $gameTemp.changeCursor = false;
    $gameTemp.changeTouch = false;
    cursorMode = 'member';
  };

  onChangeMemberOk() {
    const cols = this._battleMemberWindow.maxCols();
    const maxItem = this._battleMemberWindow.maxItems();
    const rows = Math.ceil(maxItem / cols);
    const value = Math.max((rows * cols) - cols, 0) + formationIndex;
    const index = Math.min((value >= maxItem ? (rows > 1 ? value - cols : maxItem - 1) : value), maxItem - 1);
    this._memberWindow.deselect();
    this._memberWindow.deactivate();
    this._battleMemberWindow.activate();
    if ($gameTemp.changeCursor) {
      this._battleMemberWindow.select(index);
    }
    $gameTemp.changeCursor = false;
    $gameTemp.changeTouch = false;
    cursorMode = 'battle';
  };

  onBattleMemberOk() {
    if (pendingIndex >= 0) {
      this.onFormationOk();
    } else {
      if (cursorMode === 'battle') {
        this._memberWindow.setPendingIndex(-1);
        this._battleMemberWindow.setPendingIndex(formationIndex);
      } else {
        this._battleMemberWindow.setPendingIndex(-1);
        this._memberWindow.setPendingIndex(formationIndex);
      }
    }
    if (cursorMode === 'battle') {
      this._battleMemberWindow.activate();
    } else {
      this._memberWindow.activate();
    }
  };

  onFormationOk() {
    const index = this.getActorIndex();
    const p_Index = this.getPendingActorIndex();
    if (index >= 0 && p_Index >= 0) {
      $gameParty.swapOrder(index, p_Index);
      this.formationActorRefresh();
    } else if (index < 0) {
      this.selectOrder(p_Index);
    } else if (p_Index < 0) {
      this.pendingOrder(index);
    }
    this._battleMemberWindow.setPendingIndex(-1);
    this._memberWindow.setPendingIndex(-1);
    this._battleMemberWindow.refresh();
    this._memberWindow.refresh();
    pendingMode = null;
    if (this._isBattle && CommandShowMode === "Actor") {
      $gameTemp.formationRefresh = true;
    }
  };

  selectOrder(index) {
    const check = $gameParty.checkSwap(index);
    if (cursorMode === 'battle') {
      $gameParty.entryOrder(index);
      if (pendingMode === 'member' && check) {
        $gameParty.changeEntryBattleMember();
      }
      $gamePlayer.refresh();
    } else {
      $gameParty.withdrawalOrder(index);
      if (pendingMode === 'battle' && check) {
        $gameParty.changeWithdrawaBattleMember();
      }
      $gamePlayer.refresh();
    }
  };

  pendingOrder(index) {
    const check = $gameParty.checkSwap(index);
    if (pendingMode === 'battle') {
      $gameParty.entryOrder(index);
      if (cursorMode === 'member' && check) {
        $gameParty.changeEntryBattleMember();
      }
      $gamePlayer.refresh();
    } else {
      $gameParty.withdrawalOrder(index);
      if (cursorMode === 'battle' && check) {
        $gameParty.changeWithdrawaBattleMember();
      }
      $gamePlayer.refresh();
    }
  };

  formationActorRefresh() {
    if (cursorMode === 'battle') {
      this._battleMemberWindow.redrawItem(formationIndex);
    } else {
      this._memberWindow.redrawItem(formationIndex);
    }
    if (pendingMode === 'battle') {
      this._battleMemberWindow.redrawItem(this._battleMemberWindow.pendingIndex());
    } else {
      this._memberWindow.redrawItem(this._memberWindow.pendingIndex());
    }
  }

  getActorIndex() {
    let actor = null;
    if (cursorMode === 'battle') {
      actor = $gameParty.formationBattleMember()[formationIndex];
    } else {
      actor = $gameParty.formationMember()[formationIndex];
    }
    if (actor) {
      return $gameParty.allMembers().indexOf(actor);
    }
    return -1;
  };

  getPendingActorIndex() {
    let actor = null;
    if (pendingMode === 'battle') {
      actor = $gameParty.formationBattleMember()[this._battleMemberWindow.pendingIndex()];
    } else {
      actor = $gameParty.formationMember()[this._memberWindow.pendingIndex()];
    }
    if (actor) {
      return $gameParty.allMembers().indexOf(actor);
    }
    return -1;
  };

  onCancel() {
    if (pendingIndex >= 0) {
      if (cursorMode === 'battle') {
        this.onBattleMemberCancel();
      } else {
        this.onMemberCancel();
      }
    } else {
      if (this._isBattle) {
        this.close();
        BattleManager.battleCommandRefresh();
      } else {
        this._scene.popScene();
      }
    }
  };

  onBattleMemberCancel() {
    this._memberWindow.setPendingIndex(-1);
    this._battleMemberWindow.setPendingIndex(-1);
    this._battleMemberWindow.activate();
    pendingMode = null;
  };

  onMemberCancel() {
    this._memberWindow.setPendingIndex(-1);
    this._battleMemberWindow.setPendingIndex(-1);
    this._memberWindow.activate();
    pendingMode = null;
  };

  memberWindowWidth() {
    return $gameSystem.windowPadding() * 2 + param.Member_Cols * (CharacterMode === 'face' ? 152 : 56);
  };
  
  nameWidth() {
    return 240;
  };
  
  memberY() {
    return this._battleMemberWindow.y + this._battleMemberWindow.height + 12;
  };

  battleMemberWindowWidth() {
    return (param.BattleMember_Cols > 0 ? param.BattleMember_Cols : _Game_Party_maxBattleMembers.call($gameParty)) * (Imported.NUUN_SceneFormation_SupportActor && param.BattleMember_Rows === 1 ? 2 : 1) * (CharacterMode === 'face' ? 152 : 56);
  };

  open() {
    BattleManager.formationCommandActor = BattleManager.actor();
    this._battleMemberNameWindow.open();
    this._memberNameWindow.open();
    this._battleMemberWindow.open();
    this._memberWindow.open();
    this._memberStatusWindow.open();
    this._battleMemberNameWindow.show();
    this._memberNameWindow.show();
    this._battleMemberWindow.show();
    this._memberWindow.show();
    this._memberStatusWindow.show();
    this._battleMemberWindow.refresh();
    this._memberWindow.refresh();
    this._battleMemberWindow.activate();
    this._commandWindow.hide();
    this.initSelect();
  };

  close() {
    $gameTemp.requestBattleRefresh();
    if (!BattleManager.isTpb()) {
        $gameParty.formationMakeActions();
    }
    this._battleMemberNameWindow.close();
    this._memberNameWindow.close();
    this._battleMemberWindow.close();
    this._memberWindow.close();
    this._memberStatusWindow.close();
    this._battleMemberWindow.deselect();
    this._memberWindow.deselect();
    this._commandWindow.show();
    this._commandWindow.open();
    this._commandWindow.activate();
  };
};

Window_StatusBase.prototype.drawBackGroundActor = function(index) {
  const actor = this.actor(index);
  if (index !== this._pendingIndex) {
    const rect = this.itemRect(index);
    const height = param.MemberHeight;
    const y = rect.y + (this.itemHeight() - this.rowSpacing() - height);
    this.contentsBack.paintOpacity = 128;
    if (actor && DeadActorColor >= 0 && actor.isDead()) {
      const deadcolor = NuunManager.getColorCode(DeadActorColor);
      this.contentsBack.fillRect(rect.x, y, rect.width, height, deadcolor);
    } else if (Imported.NUUN_ActorFixed && actor && FixedActorBackColor >= 0 && actor.isFixed()) {
      const fixedcColor = NuunManager.getColorCode(FixedActorBackColor);
      this.contentsBack.fillRect(rect.x, y, rect.width, height, fixedcColor);
    } else if (Imported.NUUN_SceneFormation_SupportActor && SupportActorBackColor >= 0 && actor && actor.getSupportActor()) {
      const supportcolor = NuunManager.getColorCode(SupportActorBackColor);
      this.contentsBack.fillRect(rect.x, y, rect.width, height, supportcolor);
    }
    this.contentsBack.paintOpacity = 255;
  }
};

Window_StatusBase.prototype.battlreFormationPicture = function(id) {
  const actors = ActorPictureData;
  const find = actors.find(actor => actor.actorId === id);
  if (!find) {
    return {wActor_X: 0, wActor_Y: 0, wImg_SX: 0, wImg_SY: 0, wActor_Scale: 100};
  }
  return find;
};

Window_StatusBase.prototype.drawFormationImg = function(data, actor, bitmap, x, y, width, height) {
  if (data) {
    width = Math.min(width - 2, bitmap.width);
    height = Math.min(height - 2, bitmap.height);
    const scale = (data.wActor_Scale || 100) / 100;
    const sw = width * scale;
    const sh = height * scale;
    const sx = data.wImg_SX || 0;
    const sy = data.wImg_SY || 0;
    const x2 = x + 1 + (data.wActor_X || 0);// + ActorImg_X;
    const y2 = y + 1 + (data.wActor_Y || 0);// + ActorImg_Y;
    this.contents.blt(bitmap, sx, sy, width + (width - sw), height + (height - sh), x2, y2, width, height);
  }
  this.drawLavel(actor, x, y, width);
};

Window_StatusBase.prototype.setActorFormationStatus = function(index) {
  const actor = this.actor(index);
  if (statusWindow && actor !== formationOldActor) {
    statusWindow.setStatus(actor);
    if (this._spriteActor) {
      this._spriteActor.setup(actor);
    }
    formationOldActor = actor;
  }
};

Window_StatusBase.prototype.getFormationSelectActor = function() {
    return $gameParty.leader();
};

//戦闘メンバー名称
function Window_FormationBattleMemberName() {
    this.initialize(...arguments);
}
  
Window_FormationBattleMemberName.prototype = Object.create(Window_StatusBase.prototype);
Window_FormationBattleMemberName.prototype.constructor = Window_FormationBattleMemberName;

Window_FormationBattleMemberName.prototype.initialize = function(rect) {
  Window_StatusBase.prototype.initialize.call(this, rect);
  this.refresh();
};

Window_FormationBattleMemberName.prototype.refresh = function() {
  const rect = this.itemLineRect(0);
  this.drawContentsName(rect.x, rect.y, rect.width);
};

Window_FormationBattleMemberName.prototype.drawContentsName = function(x, y, width) {
  this.drawText(BattleMemberName, x, y, width);
};

window.FormationBattleMemberName = Window_FormationBattleMemberName;

//待機メンバー名称
function Window_FormationMemberName() {
    this.initialize(...arguments);
}
  
Window_FormationMemberName.prototype = Object.create(Window_StatusBase.prototype);
Window_FormationMemberName.prototype.constructor = Window_FormationMemberName;

Window_FormationMemberName.prototype.initialize = function(rect) {
  Window_StatusBase.prototype.initialize.call(this, rect);
  this.refresh();
};

Window_FormationMemberName.prototype.refresh = function() {
  const rect = this.itemLineRect(0);
  this.drawContentsName(rect.x, rect.y, rect.width);
};

Window_FormationMemberName.prototype.drawContentsName = function(x, y, width) {
  this.drawText(MemberName, x, y, width);
};

window.Window_FormationMemberName = Window_FormationMemberName;

//戦闘メンバー
function Window_FormationBattleMember() {
    this.initialize(...arguments);
}
  
Window_FormationBattleMember.prototype = Object.create(Window_StatusBase.prototype);
Window_FormationBattleMember.prototype.constructor = Window_FormationBattleMember;

Window_FormationBattleMember.prototype.initialize = function(rect) {
  this._members = $gameParty.formationBattleMember();
  Window_StatusBase.prototype.initialize.call(this, rect);
  this._formationMode = true;
  this._oldActor = null;
  this._leader = this.getFormationSelectActor();
  this.refresh();
};

Window_FormationBattleMember.prototype.refresh = function() {
  this._members = $gameParty.formationBattleMember();
  Window_StatusBase.prototype.refresh.call(this);
};

Window_FormationBattleMember.prototype.maxItems = function() {
  return Math.min(this._members.length, _Game_Party_maxBattleMembers.call($gameParty) + (Imported.NUUN_SceneFormation_SupportActor ? $gameParty.membersInSupportActorNum(this._members) : 0));
};

Window_FormationBattleMember.prototype.maxCols = function() {
  return param.BattleMember_Cols > 0 ? param.BattleMember_Cols : _Game_Party_maxBattleMembers.call($gameParty);
};

Window_FormationBattleMember.prototype.getParamBattleMember_Rows = function() {
  return param.BattleMember_Rows;
};

Window_FormationBattleMember.prototype.itemHeight = function() {
  return Math.floor(this.innerHeight / param.BattleMember_Rows);
};

Window_FormationBattleMember.prototype.actor = function(index) {
  return this._members[index];
};

Window_FormationBattleMember.prototype.processOk = function() {
  this.setSelectIndex(this.index());
  Window_StatusBase.prototype.processOk.call(this);
};

Window_FormationBattleMember.prototype.isCurrentItemEnabled = function() {
    const actor = this.actor(this.index());
    const pendingActor = pendingMode === 'battle' ? this.actor(pendingIndex) : $gameParty.formationMember()[pendingIndex];
    if (pendingActor) {
        return !this.isFormationMembersDead(actor, pendingActor) && this.isChangeActorEnabled(actor, pendingActor) && this.isFormationChangeActorEnabled(actor, pendingActor);
    } else if (actor) {
        return this.isChangeActorEnabled(actor) && this.isFormationChangeActorEnabled(actor, pendingActor);
    } else if (pendingMode && !actor && !pendingActor) {
        return false;
    } else {
        return true;
    }
};

Window_FormationBattleMember.prototype.isFormationMembersDead = function(actor, pendingActor) {
    const battleMember = $gameParty.battleMembers();
    const members = battleMember.filter(member => {
        if (pendingActor.isBattleMember()) {
            return true;
        } else {
            return member !== actor;
        }
    });
    if (!pendingActor.isBattleMember()) {
        Array.prototype.push.apply(members , [pendingActor]);
    }
    return members.every(member => member.isDead());
};

Window_FormationBattleMember.prototype.isChangeActorEnabled = function(actor) {
    return actor ? actor.isFormationChangeOk() : true;
};

Window_FormationBattleMember.prototype.isFormationChangeActorEnabled = function(actor, pendingActor) {
    return true;
};


Window_FormationBattleMember.prototype.select = function(index) {
  Window_Selectable.prototype.select.call(this, index);
  this.setActorFormationStatus(index);
};


const _Window_FormationBattleMember_processTouch = Window_FormationBattleMember.prototype.processTouch;
Window_FormationBattleMember.prototype.processTouch = function() {
  this.onTouchSelectActive();
  _Window_FormationBattleMember_processTouch.call(this);
};

Window_FormationBattleMember.prototype.drawItem = function(index) {
  const rect = this.itemRect(index);
  const actor = this.actor(index);
  this.drawBackGroundActor(index);
  this.drawPendingItemBackground(index);
  let data = null;
  if (!actor) {
    const y = rect.y + this.itemHeight() - this.rowSpacing() - 48;
    this.drawText('-', rect.x, y + 4, rect.width, "center");
  } else {
    let bitmap = null;
    if (CharacterMode === 'img') {
      if (Imported.NUUN_ActorPicture && ActorPictureEXApp) {
        actor.resetImgId();
        data = this.battlreFormationPicture(actor.actorId());
      } else {
        data = actor.getFormationActorImgData();
      }
      const imges = Imported.NUUN_ActorPicture && ActorPictureEXApp ? actor.getActorGraphicImg() : actor.getFormationActorImg(data);
      bitmap = ImageManager.nuun_LoadPictures(imges);
    } else if (CharacterMode === 'chip') {
      bitmap = ImageManager.loadCharacter(actor.characterName());
    } else {
      if (Imported.NUUN_ActorPicture && DynamicFace) {
        actor.resetImgId();
        bitmap = ImageManager.loadFace(actor.getActorGraphicFace());
      } else {
        bitmap = ImageManager.loadFace(actor.faceName());
      }
    }
    if (CharacterMode === 'img') {
      bitmap.addLoadListener(function() {
        this.drawFormationImg(data, actor, bitmap, rect.x, rect.y, rect.width, rect.height);
      }.bind(this));
    } else {
      bitmap.addLoadListener(function() {
        this.drawContents(actor, rect.x, rect.y, rect.width, rect.height);
      }.bind(this));
    }
  }
};

Window_FormationBattleMember.prototype.drawContents = function(actor, x, y, width, height) {
  if (CharacterMode === 'chip') {
    this.drawFormationCharacter(actor, x, y, width);
  } else {
    this.drawFormationFace(actor, x, y, width, height);
  }
};

Window_FormationBattleMember.prototype.drawFormationCharacter = function(actor, x, y, width) {
  let x2 = x + Math.floor(width / 2);
  let y2 = y +  + this.itemHeight() - this.rowSpacing();
  this.drawCharacter(actor.characterName(), actor.characterIndex(), x2, y2);
  this.drawLavel(actor, x, y, width);
};

Window_FormationBattleMember.prototype.drawFormationFace = function(actor, x, y, width, height) {
  if (Imported.NUUN_ActorPicture && DynamicFace) {
    this.drawFace(actor.getActorGraphicFace(), actor.getActorGraphicFaceIndex(), x + 1, y + 1, ImageManager.faceWidth - 2, height - 2);
  } else {
    Window_StatusBase.prototype.drawActorFace.call(this, actor, x + 1, y + 1, ImageManager.faceWidth - 2, height - 2);
  }
  this.drawLavel(actor, x, y, width);
};

Window_FormationBattleMember.prototype.drawLavel = function(actor, x, y, width) {
  if (LavelVisible) {
    const padding = Math.floor(this.itemPadding() / 2);
    y += this.itemHeight() - 32;
    x += padding;
    width = Math.min(width - padding, 60);
    const textWidth = this.textWidth(TextManager.levelA);
    this.contents.fontSize = $gameSystem.mainFontSize() + param.LevelFontSize;
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(TextManager.levelA, x, y, width);
    this.resetTextColor();
    this.drawText(actor.level, x + textWidth, y, width - textWidth - padding, "right");
    this.contents.fontSize = $gameSystem.mainFontSize();
  }
};

const _Window_FormationBattleMember_setCursorRect = Window_FormationBattleMember.prototype.setCursorRect;
Window_FormationBattleMember.prototype.setCursorRect = function(x, y, width, height) {
  height = Math.min(param.MemberHeight, height);
  y +=this.itemHeight() - this.rowSpacing() - height;
  _Window_FormationBattleMember_setCursorRect.call(this, x, y, width, height);
};

const _Window_FormationBattleMember_drawBackgroundRect = Window_FormationBattleMember.prototype.drawBackgroundRect;
Window_FormationBattleMember.prototype.drawBackgroundRect = function(rect) {
  rect.height = param.MemberHeight;
  rect.y += this.itemHeight() - this.rowSpacing() - rect.height;
  _Window_FormationBattleMember_drawBackgroundRect.call(this, rect);
};

Window_FormationBattleMember.prototype.drawPendingItemBackground = function(index) {
  if (index === this._pendingIndex) {
      const rect = this.itemRect(index);
      const color = ColorManager.pendingColor();
      const height = param.MemberHeight;
      const y = rect.y + (this.itemHeight() - this.rowSpacing() - height);
      this.changePaintOpacity(false);
      this.contents.fillRect(rect.x, y, rect.width, height, color);
      this.changePaintOpacity(true);
  }
};

const _Window_FormationBattleMember_cursorDown = Window_FormationBattleMember.prototype.cursorDown;
Window_FormationBattleMember.prototype.cursorDown = function(wrap) {
  const index = this.index();
  const cols = this.maxCols();
  const maxItem = this.maxItems()
  const rowIndex = Math.max(cols * (Math.ceil(maxItem / cols) - 2) + (maxItem % cols), 0);
  _Window_FormationBattleMember_cursorDown.call(this, wrap);
  if ($gameParty.formationMember().length > 0 && index >= rowIndex) {
    this.changeFormationCursor();
  }
};

Window_FormationBattleMember.prototype.onTouchSelectActive = function() {
  if (this.isHoverEnabled() && cursorMode === 'member') {
    const hitIndex = this.hitIndex();
    if (hitIndex >= 0) {
      this.activate();
      $gameTemp.changeTouch = true;
    }
  }
};

Window_FormationBattleMember.prototype.changeFormationCursor = function() {
  this.setSelectIndex(this.index());
  $gameTemp.changeCursor = true;
  this.playCursorSound();
};

Window_FormationBattleMember.prototype.playOkSound = function() {
  SoundManager.playOk();
};

Window_FormationBattleMember.prototype.setSelectIndex = function(index) {
  formationIndex = index;
};

Window_FormationBattleMember.prototype.getPendingMode = function() {
  return pendingMode;
};

Window_FormationBattleMember.prototype.getCursorMode = function() {
  return cursorMode;
};

Window_FormationBattleMember.prototype.pendingIndex = function() {
  return this._pendingIndex;
};

Window_FormationBattleMember.prototype.formationPendingIndex = function() {
  return pendingIndex;
};

Window_FormationBattleMember.prototype.setPendingIndex = function(index) {
  const lastPendingIndex = this._pendingIndex;
  this._pendingIndex = index;
  pendingIndex = index;
  pendingMode = 'battle';
  this.redrawItem(this._pendingIndex);
  this.redrawItem(lastPendingIndex);
};

Window_FormationBattleMember.prototype.setSpriteActor = function(sprite) {
  this._spriteActor = sprite;
};

window.Window_FormationBattleMember = Window_FormationBattleMember;

//待機メンバー
function Window_FormationMember() {
    this.initialize(...arguments);
}
  
Window_FormationMember.prototype = Object.create(Window_StatusBase.prototype);
Window_FormationMember.prototype.constructor = Window_FormationMember;

Window_FormationMember.prototype.initialize = function(rect) {
  this._members = $gameParty.formationMember();
  Window_StatusBase.prototype.initialize.call(this, rect);
  this._formationMode = true;
  this._oldActor = null;
  this._leader = this.getFormationSelectActor();
  this.refresh();
};

Window_FormationMember.prototype.refresh = function() {
  this._members = $gameParty.formationMember();
  Window_StatusBase.prototype.refresh.call(this);
};

Window_FormationMember.prototype.maxItems = function() {
  return this._members.length;
};

Window_FormationMember.prototype.maxCols = function() {
  return param.Member_Cols;
};

Window_FormationMember.prototype.itemHeight = function() {
  return Math.floor(this.innerHeight / param.Member_Rows);
};

Window_FormationMember.prototype.actor = function(index) {
  return this._members[index];
};

Window_FormationMember.prototype.processOk = function() {
  this.setSelectIndex(this.index());
  Window_StatusBase.prototype.processOk.call(this);
};

Window_FormationMember.prototype.isCurrentItemEnabled = function() {
    const actor = this.actor(this.index());
    const pendingActor = pendingMode === 'battle' ? $gameParty.formationBattleMember()[pendingIndex] : this.actor(pendingIndex);
    if (pendingActor) {
        return !this.isFormationMembersDead(actor, pendingActor) && this.isChangeActorEnabled(actor, pendingActor) && this.isFormationChangeActorEnabled(actor, pendingActor);
    } else if (actor) {
        return !this.isFormationMembersDead(actor, pendingActor) && this.isChangeActorEnabled(actor) && this.isFormationChangeActorEnabled(actor, pendingActor);
    } else if (pendingMode && !actor && !pendingActor) {
        return false;
    } else {
        return true;
    }
};

Window_FormationMember.prototype.isFormationMembersDead = function(actor, pendingActor) {
    const battleMember = $gameParty.battleMembers();
    const members = battleMember.filter(member => {
        if (pendingActor && pendingActor.isBattleMember() && member === pendingActor) {
            return false;
        }
        return true;
    });
    if (actor && pendingActor && pendingActor.isBattleMember()) {
        Array.prototype.push.apply(members, [actor]);
    }
    return members.every(member => member.isDead());
};

Window_FormationMember.prototype.isChangeActorEnabled = function(actor) {
  return actor ? actor.isFormationChangeOk() : true;
};

Window_FormationMember.prototype.isFormationChangeActorEnabled = function(actor, pendingActor) {
    return true;
};

Window_FormationMember.prototype.select = function(index) {
  Window_Selectable.prototype.select.call(this, index);
  this.setActorFormationStatus(index);
};

const _Window_FormationMember_processTouch = Window_FormationMember.prototype.processTouch;
Window_FormationMember.prototype.processTouch = function() {
  this.onTouchSelectActive();
  _Window_FormationMember_processTouch.call(this);
};

Window_FormationMember.prototype.drawItem = function(index) {
  const rect = this.itemRect(index);
  const actor = this.actor(index);
  this.drawBackGroundActor(index);
  this.drawPendingItemBackground(index);
  let data = null;
  if (!actor) {
    const y = rect.y + this.itemHeight() - this.rowSpacing() - 48;
    this.drawText('-', rect.x, y + 4, rect.width, 'center');
  } else {
    let bitmap = null;
    if (CharacterMode === 'img') {
      data = Imported.NUUN_ActorPicture && ActorPictureEXApp ? this.battlreFormationPicture(actor.actorId()) : actor.getFormationActorImgData();
      const imges = Imported.NUUN_ActorPicture && ActorPictureEXApp ? actor.getActorGraphicImg() : actor.getFormationActorImg(data);
      bitmap = ImageManager.nuun_LoadPictures(imges);
    } else if (CharacterMode === 'chip') {
      bitmap = ImageManager.loadCharacter(actor.characterName());
    } else {
      if (Imported.NUUN_ActorPicture && DynamicFace) {
        actor.resetImgId();
        bitmap = ImageManager.loadFace(actor.getActorGraphicFace());
      } else {
        bitmap = ImageManager.loadFace(actor.faceName());
      }
    }
    if (CharacterMode === 'img') {
      bitmap.addLoadListener(function() {
        this.drawFormationImg(data, actor, bitmap, rect.x, rect.y, rect.width, rect.height);
      }.bind(this));
    } else {
      bitmap.addLoadListener(function() {
        this.drawContents(actor, rect.x, rect.y, rect.width, rect.height);
      }.bind(this));
    }
  }
};

Window_FormationMember.prototype.drawContents = function(actor, x, y, width, height) {
  if (CharacterMode === 'chip') {
    this.drawFormationCharacter(actor, x, y, width);
  } else {
    this.drawFormationFace(actor, x, y, width, height);
  }
};

Window_FormationMember.prototype.drawFormationCharacter = function(actor, x, y, width) {
  let x2 = x + Math.floor(width / 2);
  let y2 = y + this.itemHeight() - this.rowSpacing();
  this.drawCharacter(actor.characterName(), actor.characterIndex(), x2, y2);
  this.drawLavel(actor, x, y, width);
};

Window_FormationMember.prototype.drawFormationFace = function(actor, x, y, width, height) {
  if (Imported.NUUN_ActorPicture && DynamicFace) {
    this.drawFace(actor.getActorGraphicFace(), actor.getActorGraphicFaceIndex(), x + 1, y + 1, ImageManager.faceWidth - 2, height - 2);
  } else {
    Window_StatusBase.prototype.drawActorFace.call(this, actor, x + 1, y + 1, ImageManager.faceWidth - 2, height - 2);
  }
  this.drawLavel(actor, x, y, width);
};

Window_FormationMember.prototype.drawLavel = function(actor, x, y, width) {
  if (LavelVisible) {
    const padding = Math.floor(this.itemPadding() / 2);
    y += this.itemHeight() - 32;
    x += padding;
    width = Math.min(width - padding, 60);
    const textWidth = this.textWidth(TextManager.levelA);
    this.contents.fontSize = $gameSystem.mainFontSize() + param.LevelFontSize;
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(TextManager.levelA, x, y, width);
    this.resetTextColor();
    this.drawText(actor.level, x + textWidth, y, width - textWidth - padding, "right");
    this.contents.fontSize = $gameSystem.mainFontSize();
  }
};

const _Window_FormationMember_setCursorRect = Window_FormationMember.prototype.setCursorRect;
Window_FormationMember.prototype.setCursorRect = function(x, y, width, height) {
  height = Math.min(param.MemberHeight, height);
  y += this.itemHeight() - this.rowSpacing() - height;
  _Window_FormationMember_setCursorRect.call(this, x, y, width, height);
};

const _Window_FormationMember_drawBackgroundRect = Window_FormationMember.prototype.drawBackgroundRect;
Window_FormationMember.prototype.drawBackgroundRect = function(rect) {
  rect.height = param.MemberHeight;
  rect.y += this.itemHeight() - this.rowSpacing() - rect.height;
  _Window_FormationMember_drawBackgroundRect.call(this, rect);
};

Window_FormationMember.prototype.drawPendingItemBackground = function(index) {
  if (index === this._pendingIndex) {
      const rect = this.itemRect(index);
      const color = ColorManager.pendingColor();
      this.changePaintOpacity(false);
      const height = param.MemberHeight;
      const y = rect.y + (this.itemHeight() - this.rowSpacing() - height);
      this.contents.fillRect(rect.x, y, rect.width, height, color);
      this.changePaintOpacity(true);
  }
};

const _Window_FormationMember_cursorUp = Window_FormationMember.prototype.cursorUp;
Window_FormationMember.prototype.cursorUp = function(wrap) {
  const index = this.index();
  _Window_FormationMember_cursorUp.call(this, wrap);
  if (index < this.maxCols()) {
    this.changeFormationCursor();
  }
};

Window_FormationMember.prototype.onTouchSelectActive = function() {
  if (this.isHoverEnabled() && cursorMode === 'battle') {
    const hitIndex = this.hitIndex();
    if (hitIndex >= 0) {
      $gameTemp.changeTouch = true;
      this.activate();
    }
  }
};

Window_FormationMember.prototype.changeFormationCursor = function() {
  this.setSelectIndex(this.index());
  $gameTemp.changeCursor = true;
  this.playCursorSound();
};

Window_FormationMember.prototype.playOkSound = function() {
  SoundManager.playOk();
};

Window_FormationMember.prototype.setSelectIndex = function(index) {
  formationIndex = index;
};

Window_FormationMember.prototype.setPendingIndex = function(index) {
  const lastPendingIndex = this._pendingIndex;
  this._pendingIndex = index;
  pendingIndex = index;
  pendingMode = 'member';
  this.redrawItem(this._pendingIndex);
  this.redrawItem(lastPendingIndex);
};

Window_FormationMember.prototype.pendingIndex = function() {
  return this._pendingIndex;
};

Window_FormationMember.prototype.formationPendingIndex = function() {
  return pendingIndex;
};

Window_FormationMember.prototype.getPendingMode = function() {
  return pendingMode;
};

Window_FormationMember.prototype.getCursorMode = function() {
  return cursorMode;
};

Window_FormationMember.prototype.setSpriteActor = function(sprite) {
  this._spriteActor = sprite;
};

window.Window_FormationMember = Window_FormationMember;

//ステータス
function Window_FormationStatus() {
    this.initialize(...arguments);
}
  
Window_FormationStatus.prototype = Object.create(Window_StatusBase.prototype);
Window_FormationStatus.prototype.constructor = Window_FormationStatus;

Window_FormationStatus.prototype.initialize = function(rect) {
  Window_StatusBase.prototype.initialize.call(this, rect);
  this._actor = null;
  this.refresh();
};

Window_FormationStatus.prototype.setStatus = function(actor) {
  this._actor = actor;
  this.refresh();
};

Window_FormationStatus.prototype.maxCols = function() {
  return 4;
};

Window_FormationStatus.prototype.refresh = function() {
    Window_StatusBase.prototype.refresh.call(this);
    const actor = this._actor;
    if (!actor) {
        return;
    }
    let bitmap = null;
    if (Imported.NUUN_ActorPicture && ActorPictureEXApp) {
        actor.resetImgId();
        bitmap = ImageManager.loadFace(actor.getActorGraphicFace());
    } else {
        bitmap = ImageManager.loadFace(actor.faceName());
    }
    if (!bitmap.isReady()) {
        bitmap.addLoadListener(this.drawData.bind(this));
    } else {
        this.drawData();
    }
};

Window_FormationStatus.prototype.drawData = function() {
    const list = ActorStatus;
    const lineHeight = this.lineHeight();
    for (const data of list) {
        const x_Position = data.X_Position;
        const position = Math.min(x_Position, this.maxCols());
        const rect = this.itemRect(position - 1);
        const x = rect.x + (data.X_Coordinate + data.X_Position);
        const y = (data.Y_Position - 1) * lineHeight + rect.y + data.Y_Coordinate;
        const width = data.ItemWidth && data.ItemWidth > 0 ? data.ItemWidth : rect.width;
        this.dateDisplay(data, x, y, width);
    }
};

Window_FormationStatus.prototype.dateDisplay = function(list, x, y, width) {
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
      this.drawState(list, this._actor, x, y, width);
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
      this.drawNextExpInfo(list, this._actor, x, y, width);
      break;
    case 42:
      this.drawNextExpPercent(list, this._actor, x, y, width);
      break;
    case 50:
      this.drawOriginalStatus(list, this._actor, x, y, width);
      break;
    case 51:
      this.drawName(list, x, y, width);
      break;
    case 60:
      this.drawEquip(list, this._actor, x, y, width);
      break;
    case 70:
      this.drawDesc(list, this._actor, x, y, width);
      break;
    case 80:
      this.drawState(list, this._actor, x, y, width);
      break;
    case 100:
      this.drawActorFace(this._actor, x, y, width);
      break;
    case 101:
      this.drawCharacterChip(list, this._actor, x, y);
      break;
    case 1000:
      this.horzLine(list, x, y, width);
      break;
    default:
      break;
  }
};

Window_FormationStatus.prototype.paramNameShow = function(list, actor, params) {
  const jaLanguage = $gameSystem.isJapanese();
  if (list.ParamName) {
    return list.ParamName;
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

Window_FormationStatus.prototype.paramShow = function(list, actor, params, detaEval) {
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

Window_FormationStatus.prototype.horzLine = function(list, x, y, width) {
  const lineY = y + this.lineHeight() / 2 - 1;
  this.contents.paintOpacity = 48;
  this.contents.fillRect(x, lineY, width, 2, ColorManager.textColor(list.NameColor));
  this.contents.paintOpacity = 255;
};

Window_FormationStatus.prototype.drawActorFace = function(actor, x, y, width, height) {
  if (Imported.NUUN_ActorPicture && ActorPictureEXApp) {
    this.drawFace(actor.getActorGraphicFace(), actor.getActorGraphicFaceIndex(), x, y, width, height);
  } else {
    Window_StatusBase.prototype.drawActorFace.call(this, actor, x, y, width, height);
  }
};

Window_FormationStatus.prototype.drawName = function(list, x, y, width) {
  const text = list.ParamName;
  if (text) {
    this.changeTextColor(ColorManager.textColor(list.NameColor));
    this.drawText(text, x, y, width);
  }
  this.resetTextColor();
};

Window_FormationStatus.prototype.drawDesc = function(list, actor, x, y, width) {
  const text = list.ParamName;
  if (text) {
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    this.drawText(text, x, y, width);
    y += this.lineHeight();
  }
  this.resetTextColor();
  const method = list.textMethod;
  if (actor.actor().meta[method]) {
    this.drawTextEx(actor.actor().meta[method], x, y, width);
  }
};

Window_FormationStatus.prototype.drawState = function(list, actor, x, y, width) {
  this.drawActorIcons(actor, x, y, width);
};

Window_FormationStatus.prototype.drawParams = function(list, actor, x, y, width, params) {
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
      text = NuunManager.numPercentage(text, (list.Decimal - 2) || 0, DecimalMode);
      let nameText = this.paramNameShow(list, actor, params);
      let textWidth = this.systemWidth(list.SystemItemWidth, width);
      this.changeTextColor(NuunManager.getColorCode(list.NameColor));;
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

Window_FormationStatus.prototype.drawOriginalStatus = function(list, actor, x, y, width) {
  const dactor = actor.actor();
  const nameText = list.ParamName;
  this.drawContentsBackground(list.Back, x, y, width);
  x = this.contensX(x);
  width = this.contensWidth(width);
  let textWidth = 0;
  if (nameText) {
    textWidth = this.systemWidth(list.SystemItemWidth, width);
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    this.drawText(nameText , x, y, textWidth);
  }
  let text = eval(list.DetaEval);
  if (text !== undefined) {
    if (typeof(text) === 'number') {
      text = NuunManager.numPercentage(text, (list.Decimal - 2) || 0, DecimalMode);
    }
    text += list.paramUnit ? String(list.paramUnit) : "";
    this.resetTextColor();
    this.drawText(text, x + textWidth + 8, y, width - textWidth - 8, 'right');
  }
};

Window_FormationStatus.prototype.drawEquip = function(list, actor, x, y, width) {
  const lineHeight = this.lineHeight();
  const equips = this._actor.equips();
  const e1uipsLength = list.EquipNum > 0 ? list.EquipNum : equips.length;
  for (let i = 0; i < e1uipsLength; i++) {
    const index = i + (list.EquipStartIndex || 0);
    let y2 = y + lineHeight * i;
    let sw = 0;
    let iconWidth = 0;
    const item = equips[index];
    this.drawContentsBackground(list.Back, x, y2, width);
    let x2 = this.contensX(x);
    let width2 = this.contensWidth(width);
    if (EquipNameVisible > 1) {//アイコン表示
      const iconId = EquipIcons[i] ? EquipIcons[i].EquipIconId : 0;
      if (iconId > 0) {
        this.drawIcon(iconId, x2, y2 + 2);
      }
      iconWidth = ImageManager.iconWidth + (EquipNameVisible === 2 ? 24 : 4);
    }
    if (EquipNameVisible === 1 || EquipNameVisible === 3) {//デフォルト
      const slotName = this.actorSlotName(actor, index);
      sw += this.systemWidth(list.SystemItemWidth, width2);
      this.changeTextColor(NuunManager.getColorCode(list.NameColor));
      this.drawText(slotName, x2 + iconWidth, y2, sw);
    }
    sw += iconWidth;
    this.resetTextColor();
    this.drawItemName(item, x2 + sw, y2, width2 - sw);
  }
};

Window_FormationStatus.prototype.drawExpInfo = function(list, actor, x, y, width) {
  const lineHeight = this.lineHeight();
  const expTotal = TextManager.expTotal.format(TextManager.exp);
  this.changeTextColor(NuunManager.getColorCode(list.NameColor));
  this.drawText(expTotal, x, y, width);
  this.resetTextColor();
  this.drawText(this.expTotalValue(), x, y, width, "right");
};

Window_FormationStatus.prototype.drawNextExpInfo = function(list, actor, x, y, width) {
  const lineHeight = this.lineHeight();
  const expNext = TextManager.expNext.format(TextManager.level);
  this.changeTextColor(NuunManager.getColorCode(list.NameColor));
  this.drawText(expNext, x, y, width);
  this.resetTextColor();
  this.drawText(this.expNextValue(), x, y, width, "right");
};

Window_FormationStatus.prototype.drawNextExpPercent = function(list, actor, x, y, width) {
  const lineHeight = this.lineHeight();
  const expNext = TextManager.expNext.format(TextManager.level);
  this.changeTextColor(NuunManager.getColorCode(list.NameColor));
  this.drawText(expNext, x, y, width);
  this.resetTextColor();
  this.drawText(this.expNextPercent(list), x, y, width, "right");
};

Window_FormationStatus.prototype.expTotalValue = function() {
  if (this._actor.isMaxLevel()) {
      return "-------";
  } else {
      return this._actor.currentExp();
  }
};

Window_FormationStatus.prototype.expNextValue = function() {
  if (this._actor.isMaxLevel()) {
      return "-------";
  } else {
      return this._actor.nextRequiredExp();
  }
};

Window_FormationStatus.prototype.expNextPercent = function(list) {
  if (this._actor.isMaxLevel()) {
      return "100" + (list.paramUnit || '%');
  } else {
      return NuunManager.numPercentage(this.expPercent(), (list.Decimal) || 0, DecimalMode) * 100 + String(list.paramUnit || '%');
  }
};

Window_FormationStatus.prototype.expPercent = function() {
  return (this._actor.currentExp() - this._actor.currentLevelExp()) / (this._actor.nextLevelExp() - this._actor.currentLevelExp());
};

Window_FormationStatus.prototype.statusParamDecimal = function(val, decimal) {
  if (isNaN(val)) { return val }
  decimal = decimal !== undefined ? Number(decimal) : 0;
  if (DecimalMode) {
    return Math.round(val * (decimal > 0 ? Math.pow(10, decimal) : 1)) / (decimal > 0 ? Math.pow(10, decimal) : 1);
  } else {
    return Math.floor(val * (decimal > 0 ? Math.pow(10, decimal) : 1)) / (decimal > 0 ? Math.pow(10, decimal) : 1);
  }
};

Window_FormationStatus.prototype.drawContentsBackground = function(back, x, y, width) {
  if (back) {
    const rect = this.contentsRect(x, y, width);
    this.drawContentsBackgroundRect(rect);
  }
};

Window_FormationStatus.prototype.contentsRect = function(x, y, width) {
  const height = this.lineHeight() - this.rowSpacing();
  return new Rectangle(x, y + 2, width, height);
};
  
Window_FormationStatus.prototype.drawContentsBackgroundRect = function(rect) {
  const c1 = ColorManager.itemBackColor1();
  const c2 = ColorManager.itemBackColor2();
  const x = rect.x;
  const y = rect.y;
  const w = rect.width;
  const h = rect.height;
  this.contents.gradientFillRect(x, y, w, h, c1, c2, true);
  this.contents.strokeRect(x, y, w, h, c1);
};

Window_FormationStatus.prototype.contensX = function(x) {
  return x + (this.itemPadding() / 2);
};

Window_FormationStatus.prototype.contensWidth = function(width) {
  return width - this.itemPadding();
};

Window_FormationStatus.prototype.systemWidth = function(swidth, width) {
  return swidth > 0 ? swidth : Math.floor(width / 3);
};

function Sprite_FormationActor() {
    this.initialize(...arguments);
}
  
Sprite_FormationActor.prototype = Object.create(Sprite.prototype);
Sprite_FormationActor.prototype.constructor = Sprite_FormationActor;

Sprite_FormationActor.prototype.initialize = function() {
  Sprite.prototype.initialize.call(this);
  this.initMembers();
  //this.createBitmap();
};

Sprite_FormationActor.prototype.initMembers = function() {
  this._actor = null;
  this.anchor.x = 0.5;
  this.anchor.y = 0.5;
};

Sprite_FormationActor.prototype.setup = function(actor) {
  this._actor = actor;
  if (!actor || BackActorPicture) {
    this.bitmap = null;
    return;
  }
  const data = Imported.NUUN_ActorPicture && ActorPictureEXApp ? this.battlreActorPicture(actor.actorId()) : actor.getFormationActorImgData();
  const imges = Imported.NUUN_ActorPicture && ActorPictureEXApp ? actor.getActorGraphicImg() : actor.getFormationActorImg(data);
  if (imges) {
    this.x = data.Actor_X;
    this.y = data.Actor_Y;
    const scale = data.Actor_Scale / 100;
    this.scale.x = scale;
    this.scale.y = scale;
    const bitmap = ImageManager.nuun_LoadPictures(imges);
    this.bitmap = bitmap;
    if (!bitmap.isReady()) {
      bitmap.addLoadListener(this.refresh.bind(this, data));
    } else {
      this.refresh(data);
    }
  } else {
    this.bitmap = null;
  }
};

Sprite_FormationActor.prototype.battlreActorPicture = function(id) {//立ち絵表示EX用
  const actors = ActorPictureData;
  const find = actors.find(actor => actor.actorId === id);
  if (!find) {
    return {Actor_X: 0, Actor_Y: 0, Img_SX: 0, Img_SY: 0, Actor_Scale: 100};
  }
  return find;
};

Sprite_FormationActor.prototype.refresh = function(data) {
  
};

})();

