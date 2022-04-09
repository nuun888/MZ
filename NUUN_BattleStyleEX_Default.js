/*:-----------------------------------------------------------------------------------
 * NUUN_BattleStyleEX_Default.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc バトルスタイル拡張デフォルト設定用
 * @author NUUN
 * @base NUUN_BattleStyleEX
 * @orderBefore NUUN_BattleStyleEX
 * @version 1.1.0
 * 
 * @help
 * 戦闘画面を拡張します。
 * このプラグインでは他に以下の機能を実装します。
 * フロントビューでのアクターへのアニメーション
 * 立ち絵表示
 * 条件付き立ち絵切り替え
 * ステータスパラメータの表示座標変更
 * 各ウィンドウの背景画像指定
 * コマンドの表示変更
 * 
 * アクターの顔グラを立ち絵にする場合は、プラグインパラメータのデフォルトアクター画像設定またはアクター画像座標拡大率設定で
 * アクターの画像モードを画像に設定してください。
 * アクター画像座標拡大率設定を設定してない場合はのデフォルトアクター画像設定の設定が適用されます。
 * 
 * アクターの画像設定で条件で顔グラまたは立ち絵を切り替える事ができます。また立ち絵、顔グラ表示EXに対応していますが、プラグインパラメータの
 * 立ち絵表示EX適用をONにしてください。
 * 条件の優先度は上から順に一致した条件が適用されます。通常時に適用される画像は一番下に設定してください。
 * 
 * 各ステータスの座標位置を変更したい場合は、各項目の「〇〇の座標変更」をtureにしてください。
 * 
 * 敵キャラのメモ欄
 * <AttackAnimation:11>
 * 敵キャラの通常攻撃時、11番のアニメーションが再生されます。指定がない場合はプラグインパラメータのデフォルト値が適用されます。
 * 
 * 木星ペンギン氏作疑似３Dバトルプラグインと併用して、フロントビューで味方にアニメーションを表示させる場合は
 * 別途バトルスタイル拡張疑似３Dバトル併用パッチを導入してください。
 * 
 * ケケー氏作スピードスターバトルプラグインと併用して、フロントビューで味方にアニメーションを表示させる場合は
 * 別途バトルスタイル拡張スピードスターバトル併用を導入してください。
 * 
 * 更新履歴
 * 2022/4/10 Ver.1.1.0
 * アクター画像設定のスイッチ、武器、防具、ステートの条件に複数指定できるように変更。
 * アクター画像設定に残りHPの条件を追加。 
 * アクター画像設定の職業でリストが表示されなかった問題を修正。
 * アクター画像設定のスキル、アイテム条件が適用されていなかった問題を修正。
 * 2022/4/1 Ver.1.0.5
 * アクターコマンドの項目の表示位置を中央寄りにする機能を追加。
 * 2022/3/29 Ver.1.0.4
 * アクターコマンドを各アクターの上指定時のサポートアクターのコマンド座標を設定できる機能を追加。
 * 敵選択、アイテム、スキル、ヘルプウィンドウ画像表示の説明文を変更。
 * 2022/3/26 Ver.1.0.3
 * アクターウィンドウステータスのアクター配置を表示範囲可変表示にする機能を追加。
 * 2022/3/26 Ver.1.0.2
 * 敵選択ウィンドウのスキン非表示を設定する項目がなかった問題を修正。
 * 2022/3/25 Ver.1.0.1
 * 立ち絵切り替え条件にスイッチ、武器、防具装備時、特定の職業を追加。
 * 2022/3/24 Ver.1.0.0
 * 初版
 * 
 * @param Setting
 * @text 共通設定
 * @default ////////////////////////////////
 * 
 * @param PartyCommand
 * @text パーティコマンド設定
 * @default ////////////////////////////////
 * 
 * @param PartyCommandPosition
 * @text コマンドの表示位置
 * @desc カスタム選択時のパーティコマンドの表示位置を指定します。
 * @type select
 * @option 上部
 * @value 'top'
 * @option 中間
 * @value 'middle'
 * @option アクターステータスウィンドウの上
 * @value 'under'
 * @option カスタム
 * @value 'custom'
 * @option デフォルト(座標は固定です)
 * @value 'default'
 * @default 'default'
 * @parent PartyCommand
 * 
 * @param PartyCommandMaxCol
 * @desc 表示するコマンド列数。
 * @text 表示コマンド列数
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * @parent PartyCommand
 * 
 * @param PartyCommandMaxRow
 * @desc 表示するコマンド行数。
 * @text 表示コマンド行数
 * @type number
 * @default 4
 * @min 1
 * @max 99
 * @parent PartyCommand
 * 
 * @param PartyCommandWindow
 * @text パーティコマンドウィンドウ設定
 * @default ------------------------------
 * @parent PartyCommand
 * 
 * @param PartyCommandWindowShow
 * @desc ウィンドウ画像を表示する。背景指定時はOFFにしてください。(OFFでコマンドのみ表示されます。)
 * @text ウィンドウ画像表示
 * @type boolean
 * @default true
 * @parent PartyCommandWindow
 * 
 * @param PartyCommand_X
 * @desc パーティコマンドウィンドウのX座標を指定します。
 * @text コマンドウィンドウX座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent PartyCommandWindow
 * 
 * @param PartyCommand_Y
 * @desc パーティコマンドウィンドウのY座標を指定します。
 * @text コマンドウィンドウY座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent PartyCommandWindow
 * 
 * @param PartyCommand_Width
 * @desc パーティコマンドウィンドウの横幅を指定します。0でUI幅
 * @text コマンドウィンドウの横幅
 * @type number
 * @default 0
 * @max 9999
 * @min 0
 * @parent PartyCommandWindow
 * 
 * @param PartyCommandBackGround
 * @text パーティコマンド背景設定
 * @default ------------------------------
 * @parent PartyCommand
 * 
 * @param PartyCommandBackgroundImg
 * @desc パーティコマンドの背景画像ウィンドウを指定する。
 * @text パーティコマンド背景画像ウィンドウ
 * @type file
 * @dir img/
 * @default 
 * @parent PartyCommandBackGround
 * 
 * @param PartyBackground_X
 * @desc パーティコマンドの背景画像X座標（相対）。
 * @text 背景画像X座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent PartyCommandBackGround
 * 
 * @param PartyBackground_Y
 * @desc パーティコマンドの背景画像Y座標（相対）。
 * @text 背景画像Y座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent PartyCommandBackGround
 * 
 * @param PartyCommandOption
 * @text パーティコマンドオプション
 * @default ------------------------------
 * @parent PartyCommand
 * 
 * @param PartyCommandWindowCenter
 * @text ウィンドウ座標中央表示
 * @desc ウィンドウを中央に表示させます。(デフォルト以外)
 * @type boolean
 * @default false
 * @parent PartyCommandOption
 * 
 * @param PartyCommandMode
 * @desc パーティコマンドの項目を中央寄りに表示させます。
 * @text コマンド表示中央寄り
 * @type boolean
 * @default false
 * @parent PartyCommandOption
 * 
 * @param ActorCommand
 * @text アクターコマンド設定
 * @default ////////////////////////////////
 * 
 * @param ActorCommandWindowShow
 * @desc ウィンドウ画像を表示する。背景指定時はOFFにしてください。(OFFでコマンドのみ表示されます。)
 * @text ウィンドウ画像表示
 * @type boolean
 * @default true
 * @parent ActorCommand
 * 
 * @param ActorCommandPosition
 * @text アクターコマンドの表示方法
 * @desc アクターコマンドの表示方法を選択します。
 * @type select
 * @option デフォルト(座標は固定です)
 * @value 'default'
 * @option 各アクターの上
 * @value 'actor'
 * @option 上部
 * @value 'top'
 * @option 中間
 * @value 'middle'
 * @option アクターステータスウィンドウの上
 * @value 'under'
 * @option 各SVアクターの上（SV推奨）
 * @value 'svtop'
 * @option 各SVアクターの左（SV推奨）
 * @value 'svleft'
 * @option 各SVアクターの右（SV推奨）
 * @value 'svright'
 * @option カスタム
 * @value 'custom'
 * @default 'default'
 * @parent ActorCommand
 * 
 * @param ActorCommandMaxRow
 * @desc 表示できる最大コマンド行数。コマンド可変表示をOFFの場合はこの設定の値が適用されます。
 * @text 最大表示コマンド行数
 * @type number
 * @default 10
 * @min 1
 * @max 99
 * @parent ActorCommand
 * 
 * @param ActorCommandMinRow
 * @desc 表示する最低コマンド行数。
 * @text コマンド可変表示時の表示最低コマンド行数
 * @type number
 * @default 4
 * @min 1
 * @max 99
 * @parent ActorCommand
 * 
 * @param ActorCommandMaxCol
 * @desc 表示するコマンド列数。
 * @text 表示コマンド列数
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * @parent ActorCommand
 * 
 * @param ActorCommandVariable
 * @desc アクターコマンドの表示数をコマンド数分表示します。（最大表示コマンド行数まで表示）
 * @text コマンド可変表示
 * @type boolean
 * @default true
 * @parent ActorCommand
 * 
 * @param ActorCommandWindow
 * @text アクターコマンドウィンドウ設定
 * @default ------------------------------
 * @parent ActorCommand
 * 
 * @param ActorCommand_X
 * @desc アクターコマンドウィンドウのX座標を指定します。
 * @text コマンドウィンドウX座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent ActorCommandWindow
 * 
 * @param ActorCommand_Y
 * @desc アクターコマンドウィンドウのY座標を指定します。
 * @text コマンドウィンドウY座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent ActorCommandWindow
 * 
 * @param ActorCommand_Width
 * @desc アクターコマンドウィンドウの横幅を指定します。
 * @text コマンドウィンドウの横幅
 * @type number
 * @default 192
 * @max 9999
 * @min 0
 * @parent ActorCommandWindow
 * 
 * @param ActorCommandBackground
 * @text パーティコマンド背景設定
 * @default ------------------------------
 * @parent ActorCommand
 * 
 * @param ActorCommandBackgroundImg
 * @desc アクターコマンドの背景画像ウィンドウを指定する。
 * @text アクターコマンド背景画像ウィンドウ
 * @type file
 * @dir img/
 * @default 
 * @parent ActorCommandBackground
 * 
 * @param ActorBackground_X
 * @desc アクターコマンドの背景画像X座標（相対）。
 * @text 背景画像X座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorCommandBackground
 * 
 * @param ActorBackground_Y
 * @desc アクターコマンドの背景画像Y座標（相対）。
 * @text 背景画像Y座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorCommandBackground
 * 
 * @param ActorCommandOption
 * @text アクターコマンドオプション
 * @default ------------------------------
 * @parent ActorCommand
 * 
 * @param ActorCommandWindowCenter
 * @text ウィンドウ座標中央表示
 * @desc ウィンドウを中央に表示させます。(上部、中間、アクターステータスの上、カスタムのみ)
 * @type boolean
 * @default true
 * @parent ActorCommandOption
 * 
 * @param ActorCommandMode
 * @desc アクターコマンドの項目を中央寄りに表示させます。
 * @text コマンド表示中央寄り
 * @type boolean
 * @default true
 * @parent ActorCommandOption
 * 
 * 
 * @param ActorStatus
 * @text アクターステータス設定
 * @default ////////////////////////////////
 * 
 * @param ActorStatusVariable
 * @desc アクターの表示範囲可変表示。（メンバー数によってアクターの表示領域が変化します）
 * @text アクター表示範囲可変表示
 * @type boolean
 * @default false
 * @parent ActorStatus
 * 
 * @param ActorMaxCol
 * @desc 横に並べるアクター数。
 * @text 横アクター数
 * @type number
 * @default 4
 * @min 1
 * @max 99
 * @parent ActorStatus
 * 
 * @param ActorMaxRow
 * @desc 縦に並べるアクター数。
 * @text 縦アクター数
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * @parent ActorStatus
 * 
 * @param ActorStatusMode
 * @text アクターステータス表示方法
 * @desc アクターステータスの表示方法を選択します。
 * @type select
 * @option 左寄り
 * @value 'left'
 * @option 中央
 * @value 'center'
 * @option 右寄り
 * @value 'right'
 * @default 'center'
 * @parent ActorStatus
 * 
 * @param EnemyWindow
 * @text 敵キャラ選択設定
 * @default ------------------------------
 * 
 * @param EnemyWindowShow
 * @desc ウィンドウ画像を表示する。OFFにするとコマンド背後のウィンドウが表示されません。
 * @text ウィンドウ画像表示
 * @type boolean
 * @default true
 * @parent EnemyWindow
 * 
 * @param EnemyMaxRow
 * @desc 表示する行数。
 * @text 行数
 * @type number
 * @default 4
 * @min 1
 * @max 99
 * @parent EnemyWindow
 * 
 * @param EnemyMaxCol
 * @desc 表示する列数。
 * @text 列数
 * @type number
 * @default 2
 * @min 1
 * @max 99
 * @parent EnemyWindow
 * 
 * @param EnemyWindow_X
 * @desc 敵キャラウィンドウのX座標を指定します。
 * @text ウィンドウX座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent EnemyWindow
 * 
 * @param EnemyWindow_Y
 * @desc 敵キャラウィンドウのY座標を指定します。
 * @text ウィンドウY座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent EnemyWindow
 * 
 * @param EnemyWindow_Width
 * @desc 敵キャラウィンドウの横幅を指定します。0でUIサイズ 画面より大きい値にすると自動的に画面の横幅になります。
 * @text ウィンドウの横幅
 * @type number
 * @default 0
 * @max 9999
 * @min 0
 * @parent EnemyWindow
 * 
 * @param EnemyWindowOpacity
 * @desc 敵キャラ選択時のアクターステータスウィンドウの不透明度（0で非表示）
 * @text 選択時ウィンドウ不透明度
 * @type number
 * @default 255
 * @max 255
 * @min 0
 * @parent EnemyWindow
 * 
 * @param EnemyWindowOption
 * @text 敵キャラ選択ウィンドウオプション
 * @default ------------------------------
 * @parent EnemyWindow
 * 
 * @param EnemyWindowMode
 * @desc 敵キャラウィンドウの設定座標モード。(ON：デフォルトの表示位置からの相対座標 OFF:画面左上からの絶対座標)
 * @text 設定座標モード
 * @type boolean
 * @default true
 * @parent EnemyWindowOption
 * 
 * @param EnemyWindowBackGround
 * @text 背景画像ウィンドウ背景設定
 * @default ------------------------------
 * @parent EnemyWindow
 * 
 * @param EnemyWindowBackgroundImg
 * @desc 背景画像ウィンドウを指定する。
 * @text 背景画像ウィンドウ
 * @type file
 * @dir img/
 * @default 
 * @parent EnemyWindowBackGround
 * 
 * @param EnemyWindowBackground_X
 * @desc アクターステータスウィンドウの背景画像X座標（相対）。
 * @text 背景画像X座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent EnemyWindowBackGround
 * 
 * @param EnemyWindowBackground_Y
 * @desc アクターステータスウィンドウの背景画像Y座標（相対）。
 * @text 背景画像Y座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent EnemyWindowBackGround
 * 
 * @param ActorStatusWindow
 * @text アクターステータウィンドウ設定
 * @default ------------------------------
 * @parent ActorStatus
 * 
 * @param ActorStatusWindowLock
 * @desc コマンド選択時にアクターステータスウィンドウを固定します。
 * @text アクターステータスウィンドウ固定
 * @type boolean
 * @default false
 * @parent ActorStatusWindow
 * 
 * @param ActorStatusWindowPosition
 * @text ウィンドウ基準表示位置
 * @desc アクターステータスウィンドウの基準表示位置
 * @type select
 * @option UI画面下
 * @value 'ui_under'
 * @option 画面下
 * @value 'under'
 * @option カスタム
 * @value 'custom'
 * @default 'ui_under'
 * @parent ActorStatusWindow
 * 
 * @param ActorStatusWindow_X
 * @desc アクターステータスウィンドウのX座標（相対座標）を指定します。
 * @text ウィンドウのX座標（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorStatusWindow
 * 
 * @param ActorStatusWindow_Y
 * @desc アクターステータスウィンドウのY座標（相対座標）を指定します。座標は「ウィンドウ基準表示位置」からの相対座標です。
 * @text ウィンドウのY座標（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorStatusWindow
 * 
 * @param ActorStatusWindow_Width
 * @desc アクターステータスウィンドウの横幅を指定します。コマンドの表示位置がデフォルトの時はコマンド幅も含みます。 0でデフォルト値
 * @text ウィンドウの横幅
 * @type number
 * @default 0
 * @max 9999
 * @min 0
 * @parent ActorStatusWindow
 * 
 * @param ActorStatusWindow_Height
 * @desc アクターウィンドウ座標変更許可時のアクターステータスウィンドウの縦幅を指定します。0でデフォルト値
 * @text ウィンドウの縦幅
 * @type number
 * @default 0
 * @max 9999
 * @min 0
 * @parent ActorStatusWindow
 * 
 * @param WidthWithCommand
 * @desc アクターステータスウィンドウの横幅からアクターコマンドの横幅分サイズを調整します。
 * @text 横幅分サイズ調整
 * @type boolean
 * @default true
 * @parent ActorStatusWindow
 * 
 * @param WindowShow
 * @desc アクターステータスウィンドウ画像を表示する。
 * @text アクターステータスウィンドウ画像表示
 * @type boolean
 * @default true
 * @parent ActorStatusWindow
 * 
 * @param WindowFrameShow
 * @desc アクターステータスウィンドウ枠を表示する。
 * @text アクターステータスウィンドウ枠表示
 * @type boolean
 * @default false
 * @parent ActorStatusWindow
 * 
 * @param CursorBackShow
 * @desc アクターステータスウィンドウ背景を表示する。
 * @text アクターステータスウィンドウ背景表示
 * @type boolean
 * @default true
 * @parent ActorStatusWindow
 * 
 * @param ActorWindowBackGround
 * @text 背景画像ウィンドウ背景設定
 * @default ------------------------------
 * @parent ActorStatus
 * 
 * @param WindowBackground
 * @desc 背景画像ウィンドウを指定する。
 * @text 背景画像ウィンドウ
 * @type file
 * @dir img/
 * @default 
 * @parent ActorWindowBackGround
 * 
 * @param WindowBackground_X
 * @desc アクターステータスウィンドウの背景画像X座標（相対）。
 * @text 背景画像X座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorWindowBackGround
 * 
 * @param WindowBackground_Y
 * @desc アクターステータスウィンドウの背景画像Y座標（相対）。
 * @text 背景画像Y座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorWindowBackGround
 * 
 * 
 * @param ActorStatusOption
 * @text アクターステータスウィンドウオプション
 * @default ------------------------------
 * @parent ActorStatus
 * 
 * @param ActorStatusWindowCenter
 * @text ウィンドウ座標中央表示
 * @desc ウィンドウを中央に表示させます。
 * @type boolean
 * @default true
 * @parent ActorStatusOption
 * 
 * 
 * @param ActorSetting
 * @text アクター設定
 * @default ////////////////////////////////
 * 
 * @param DefaultStatusPositionData
 * @text デフォルトステータス座標表示設定
 * @desc デフォルトのステータスの座標、表示設定の設定を行います。
 * @default {"ActorNameChangePosition":"","NameChangePosition":"false","ActorName_X":"0","ActorName_Y":"88","ActorHPChangePosition":"------------------------------","HPGaugeWidth":"128","HPGaugeHeight":"12","HPChangePosition":"false","ActorHP_X":"0","ActorHP_Y":"112","ActorMPChangePosition":"------------------------------","MPGaugeWidth":"128","MPGaugeHeight":"12","MPChangePosition":"false","ActorMP_X":"0","ActorMP_Y":"136","ActorTPChangePosition":"------------------------------","TPGaugeWidth":"128","TPGaugeHeight":"12","TPChangePosition":"false","ActorTP_X":"0","ActorTP_Y":"160","ActorTPBChangePosition":"------------------------------","TPBGaugeWidth":"128","TPBGaugeHeight":"12","TPBChangePosition":"false","ActorTPB_X":"0","ActorTPB_Y":"88","ActorStateChangePosition":"------------------------------","StateChangePosition":"false","ActorState_X":"4","ActorState_Y":"20","OutsideWindowVisible":"false","ActorImgChangePosition":"------------------------------","ImgChangePosition":"false","ActorImg_X":"0","ActorImg_Y":"0","Background":"------------------------------","ActorBackground":"","ActorFrontBackground":""}
 * @type struct<StatusPositionData>
 * @parent ActorSetting
 * 
 * @param DefaultActorImgData
 * @text デフォルトアクター画像設定
 * @desc デフォルトのアクター画像の設定を行います。
 * @default {"ActorImgMode":"'face'","Actor_X":"0","Actor_Y":"0","Img_SX":"0","Img_SY":"0","Actor_Scale":"100"}
 * @type struct<ActorImgList>
 * @parent ActorSetting
 * 
 * @param ActorData
 * @text アクター座標、画像設定
 * @desc アクターの個別の座標、画像設定を行います。
 * @default []
 * @type struct<ActorDataList>[]
 * @parent ActorSetting
 * 
 * @param OnActorPictureEX
 * @desc 立ち絵表示EXでの設定を適用します。
 * @text 立ち絵表示EX適用
 * @type boolean
 * @default false
 * @parent ActorSetting
 * 
 * @param Img_SW
 * @desc アクター画像の表示横幅。
 * @text アクター画像表示横幅
 * @type number
 * @default 0
 * @min 0
 * @max 9999
 * @parent ActorSetting
 * 
 * @param Img_SH
 * @desc アクター画像の表示縦幅。
 * @text アクター画像表示横幅
 * @type number
 * @default 0
 * @min 0
 * @max 9999
 * @parent ActorSetting
 * 
 * @param SelectBackShow
 * @desc アクターの行動選択時に表示されるアクター背景を表示する。
 * @text アクター行動時背景表示
 * @type boolean
 * @default true
 * @parent ActorSetting
 * 
 * @param ActorSelectBackShow
 * @desc アクターの対象選択時に表示されるアクター背景を表示する。
 * @text アクターの対象選択時背景表示
 * @type boolean
 * @default true
 * @parent ActorSetting
 * 
 * @param ActorStatusParamOption
 * @text アクターステータスウィンドウステータスオプション
 * @default ------------------------------
 * @parent ActorSetting
 * 
 * @param NameShow
 * @desc 名前を表示します。
 * @text 名前表示
 * @type boolean
 * @default true
 * @parent ActorStatusParamOption
 * 
 * @param TPBShow
 * @desc TPBゲージを表示します。外部プラグインで別の場所にTPBゲージを表示するときに設定します。
 * @text TPBゲージ表示
 * @type boolean
 * @default true
 * @parent ActorStatusParamOption
 * 
 * @param OutsideWindowVisible
 * @desc アイコンの表示をウィンドウ枠外でも表示させます。(アクター画像の上に表示されます)
 * @text アイコンウィンドウ枠外表示
 * @type boolean
 * @default false
 * @parent ActorStatusParamOption
 * 
 * @param StateVisible
 * @desc アイコンを表示させます。外部プラグインで別の場所にステートアイコンを表示するときに設定します。
 * @text ステートアイコン表示
 * @type boolean
 * @default true
 * @parent ActorStatusParamOption
 * 
 * @param FaceHeight
 * @desc 顔グラの縦幅を指定します。（0でデフォルト）
 * @text 顔グラ縦幅
 * @type number
 * @default 0
 * @min 0
 * @max 9999
 * @parent ActorStatusParamOption
 * 
 * @param FaceHeightOnWindow
 * @desc 画像の高さ範囲をウィンドウ内に納めます。
 * @text 画像ウィンドウ内表示
 * @type boolean
 * @default false
 * @parent ActorStatusParamOption
 * 
 * @param ActorEffect
 * @text アクターアニメーションエフェクト設定
 * @default ////////////////////////////////
 * 
 * @param ActorEffectShow
 * @desc フロントビューでもアニメーションエフェクトを表示。
 * @text フロントビューエフェクト表示
 * @type boolean
 * @default true
 * @parent ActorEffect
 * 
 * @param ActorEffect_X
 * @desc アニメーションエフェクトのX座標（相対座標）。
 * @text アニメーションエフェクトX座標（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorEffect
 * 
 * @param ActorEffect_Y
 * @desc アニメーションエフェクトのY座標（相対座標）。
 * @text アニメーションエフェクトY座標（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorEffect
 * 
 * @param ActorDamage_X
 * @desc ダメージエフェクトのX座標。（相対座標）
 * @text ダメージエフェクトX座標（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorEffect
 * 
 * @param ActorDamage_Y
 * @desc ダメージエフェクトのY座標。（相対座標）
 * @text ダメージエフェクトY座標（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorEffect
 * 
 * @param ActorsMirror
 * @desc アクターのアニメーションを反転します。
 * @text アクターアニメーション反転
 * @type boolean
 * @default true
 * @parent ActorEffect
 * 
 * 
 * @param ActorImgEffect
 * @text アクターグラフィックエフェクト設定
 * @default ////////////////////////////////
 * 
 * @param DamageImgFrame
 * @desc ダメージ、回復時の画像変化フレーム。
 * @text ダメージ、回復時変化フレーム
 * @type number
 * @default 30
 * @min 1
 * @max 9999
 * @parent ActorImgEffect
 * 
 * @param OnActorShake
 * @desc ダメージ時のシェイクを有効にする。
 * @text ダメージシェイク有効
 * @type boolean
 * @default true
 * @parent ActorImgEffect
 * 
 * @param ActorShakeFlame
 * @desc ダメージ時のシェイクフレーム。（デフォルト36）
 * @text シェイクフレーム
 * @type number
 * @default 36
 * @min 0
 * @parent ActorImgEffect
 * 
 * @param ActorShakePower
 * @desc ダメージ時のシェイクの大きさ。（デフォルト2）
 * @text シェイクの大きさ
 * @type number
 * @default 2
 * @min 0
 * @parent ActorImgEffect
 * 
 * @param ActorShakeSpeed
 * @desc ダメージ時のシェイクのスピード。（デフォルト20）
 * @text シェイクスピード
 * @type number
 * @default 20
 * @min 0
 * @parent ActorImgEffect
 * 
 * @param OnActionZoom
 * @desc 行動時のエフェクトを有効にする。
 * @text 行動時エフェクト有効
 * @type boolean
 * @default true
 * @parent ActorImgEffect
 * 
 * @param ActionZoomDuration
 * @desc 行動時のエフェクトフレーム
 * @text 行動時エフェクトフレーム
 * @type number
 * @default 60
 * @min 0
 * @parent ActorImgEffect
 * 
 * @param ActorFlash
 * @desc アクター対象選択時にアクター画像を点滅させます。
 * @text 選択時アクター画像点滅
 * @type boolean
 * @default true
 * @parent ActorImgEffect
 * 
 * @param ImgDeathHide
 * @desc 戦闘不能になった場合、アクター画像（顔グラ）を非表示にします。
 * @text 戦闘不能時アクター画像非表示
 * @type boolean
 * @default true
 * @parent ActorImgEffect
 * 
 * @param EnemyAnimation
 * @text 敵キャラアニメーション設定
 * @default ////////////////////////////////
 * 
 * @param EnemySkillAnimation
 * @desc 敵キャラのデフォルトの通常攻撃時のアニメーションID
 * @text 通常攻撃アニメーションID
 * @type animation
 * @default 1
 * @min 0
 * @parent EnemyAnimation
 * 
 * @param EnemyAppearWindow
 * @text モンスター出現ウィンドウ
 * @default ////////////////////////////////
 * 
 * @param AppearWindowVisible
 * @desc モンスターが出現したときのメッセージを表示しません。
 * @text モンスター出現メッセージ非表示
 * @type boolean
 * @default false
 * @parent EnemyAppearWindow
 * 
 * @param AppearWindowAnchorMode
 * @text 出現ウィンドウ表示位置
 * @desc 出現ウィンドウの表示位置。
 * @type select
 * @option 上
 * @value 'top'
 * @option 下
 * @value 'under'
 * @default 'under'
 * @parent EnemyAppearWindow
 * 
 * @param AppearWindowOpacity
 * @desc 敵出現メッセージ表示時のアクターステータスウィンドウの不透明度（0で非表示）
 * @text 敵出現メッセージ表示時ウィンドウ不透明度
 * @type number
 * @default 255
 * @max 255
 * @min 0
 * @parent EnemyAppearWindow
 * 
 * @param AppearWindowBackGround
 * @text 敵出現メッセージ背景画像ウィンドウ背景設定
 * @default ------------------------------
 * @parent EnemyAppearWindow
 * 
 * @param AppearBackgroundImg
 * @desc 敵出現メッセージの背景画像ウィンドウを指定する。
 * @text 敵出現背景画像ウィンドウ
 * @type file
 * @dir img/
 * @default 
 * @parent AppearWindowBackGround
 * 
 * @param AppearWindowBackground_X
 * @desc 敵出現メッセージの背景画像X座標（相対）。
 * @text 敵出現背景画像X座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent AppearWindowBackGround
 * 
 * @param AppearWindowBackground_Y
 * @desc 敵出現メッセージの背景画像Y座標（相対）。
 * @text 敵出現背景画像Y座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent AppearWindowBackGround
 * 
 * @param ItemWindow
 * @text アイテム選択ウィンドウ
 * @default ////////////////////////////////
 * 
 * @param ItemWindowShow
 * @desc ウィンドウ画像を表示する。OFFにするとコマンド背後のウィンドウが表示されません。
 * @text ウィンドウ画像表示
 * @type boolean
 * @default true
 * @parent ItemWindow
 * 
 * @param ItemWindowOpacity
 * @desc アイテムウィンドウ表示時のアクターステータスウィンドウの不透明度（0で非表示）
 * @text アイテムウィンドウ表示時ウィンドウ不透明度
 * @type number
 * @default 255
 * @max 255
 * @min 0
 * @parent ItemWindow
 * 
 * @param ItemWindowBackGround
 * @text 背景画像ウィンドウ背景設定
 * @default ------------------------------
 * @parent ItemWindow
 * 
 * @param ItemWindowBackgroundImg
 * @desc 背景画像ウィンドウを指定する。
 * @text 背景画像ウィンドウ
 * @type file
 * @dir img/
 * @default 
 * @parent ItemWindowBackGround
 * 
 * @param ItemWindowBackground_X
 * @desc アイテムウィンドウの背景画像X座標（相対）。
 * @text 背景画像X座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ItemWindowBackGround
 * 
 * @param ItemWindowBackground_Y
 * @desc アイテムウィンドウの背景画像Y座標（相対）。
 * @text 背景画像Y座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ItemWindowBackGround
 * 
 * @param SkillWindow
 * @text スキル選択ウィンドウ
 * @default ////////////////////////////////
 * 
 * @param SkillWindowShow
 * @desc ウィンドウ画像を表示する。OFFにするとコマンド背後のウィンドウが表示されません。
 * @text ウィンドウ画像表示
 * @type boolean
 * @default true
 * @parent SkillWindow
 * 
 * @param SkillWindowOpacity
 * @desc スキルウィンドウ表示時のアクターステータスウィンドウの不透明度（0で非表示）
 * @text スキルウィンドウ表示時ウィンドウ不透明度
 * @type number
 * @default 255
 * @max 255
 * @min 0
 * @parent SkillWindow
 * 
 * @param SkillWindowBackGround
 * @text 背景画像ウィンドウ背景設定
 * @default ------------------------------
 * @parent SkillWindow
 * 
 * @param SkillWindowBackgroundImg
 * @desc 背景画像ウィンドウを指定する。
 * @text 背景画像ウィンドウ
 * @type file
 * @dir img/
 * @default 
 * @parent SkillWindowBackGround
 * 
 * @param SkillBackground_X
 * @desc スキルウィンドウの背景画像X座標（相対）。
 * @text 背景画像X座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent SkillWindowBackGround
 * 
 * @param SkillBackground_Y
 * @desc スキルウィンドウの背景画像Y座標（相対）。
 * @text 背景画像Y座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent SkillWindowBackGround
 * 
 * @param HelpWindow
 * @text ヘルプウィンドウ
 * @default ////////////////////////////////
 * 
 * @param HelpWindowShow
 * @desc ウィンドウ画像を表示する。OFFにするとコマンド背後のウィンドウが表示されません。
 * @text ウィンドウ画像表示
 * @type boolean
 * @default true
 * @parent HelpWindow
 * 
 * @param HelpWindowBackGround
 * @text 背景画像ウィンドウ背景設定
 * @default ------------------------------
 * @parent HelpWindow
 * 
 * @param HelpWindowBackgroundImg
 * @desc 背景画像ウィンドウを指定する。
 * @text 背景画像ウィンドウ
 * @type file
 * @dir img/
 * @default 
 * @parent HelpWindowBackGround
 * 
 * @param HelpBackground_X
 * @desc ヘルプウィンドウの背景画像X座標（相対）。
 * @text 背景画像X座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent HelpWindowBackGround
 * 
 * @param HelpBackground_Y
 * @desc ヘルプウィンドウの背景画像Y座標（相対）。
 * @text 背景画像Y座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent HelpWindowBackGround
 * 
 * @param VictoryWindow
 * @text 勝利時ウィンドウ
 * @default ////////////////////////////////
 * 
 * @param VictoryWindowAnchorMode
 * @text 勝利ウィンドウ表示位置
 * @desc 勝利ウィンドウの表示位置。
 * @type select
 * @option 上
 * @value 'top'
 * @option 下
 * @value 'under'
 * @default 'under'
 * @parent VictoryWindow
 * 
 * @param VictoryWindowOpacity
 * @desc 勝利時ウィンドウ表示時のアクターステータスウィンドウの不透明度（0で非表示）
 * @text 勝利時ウィンドウ表示時ウィンドウ不透明度
 * @type number
 * @default 255
 * @max 255
 * @min 0
 * @parent VictoryWindow
 * 
 * @param VictoryWindowBackGround
 * @text 背景画像ウィンドウ背景設定
 * @default ------------------------------
 * @parent VictoryWindow
 * 
 * @param VictoryBackgroundImg
 * @desc 背景画像ウィンドウを指定する。
 * @text 背景画像ウィンドウ
 * @type file
 * @dir img/
 * @default 
 * @parent VictoryWindowBackGround
 * 
 * @param VictoryBackground_X
 * @desc リザルトウィンドウの背景画像X座標（相対）。
 * @text 背景画像X座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent VictoryWindowBackGround
 * 
 * @param VictoryBackground_Y
 * @desc リザルトステータスウィンドウの背景画像Y座標（相対）。
 * @text 背景画像Y座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent VictoryWindowBackGround
 * 
 * @param LoseWindow
 * @text 敗北時ウィンドウ
 * @default ////////////////////////////////
 * 
 * @param LoseWindowAnchorMode
 * @text 敗北時ウィンドウ表示位置
 * @desc 敗北時ウィンドウの表示位置。
 * @type select
 * @option 上
 * @value 'top'
 * @option 下
 * @value 'under'
 * @default 'under'
 * @parent LoseWindow
 * 
 * @param LoseWindowOpacity
 * @desc 敗北時ウィンドウ表示時のアクターステータスウィンドウの不透明度（0で非表示）
 * @text 敗北時ウィンドウ表示時ウィンドウ不透明度
 * @type number
 * @default 255
 * @max 255
 * @min 0
 * @parent LoseWindow
 * 
 * @param LoseWindowBackGround
 * @text 背景画像ウィンドウ背景設定
 * @default ------------------------------
 * @parent LoseyWindow
 * 
 * @param LoseBackgroundImg
 * @desc 背景画像ウィンドウを指定する。
 * @text 背景画像ウィンドウ
 * @type file
 * @dir img/
 * @default 
 * @parent LoseWindowBackGround
 * 
 * @param LoseBackground_X
 * @desc 敗北時の背景画像X座標（相対）。
 * @text 背景画像X座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent LoseWindowBackGround
 * 
 * @param LoseBackground_Y
 * @desc 敗北時の背景画像Y座標（相対）。
 * @text 背景画像Y座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent LoseWindowBackGround
 * 
 * @param EscapeWindow
 * @text 逃走時ウィンドウ
 * @default ////////////////////////////////
 * 
 * @param EscapeWindowAnchorMode
 * @text 逃走時ウィンドウ表示位置
 * @desc 逃走時ウィンドウの表示位置。
 * @type select
 * @option 上
 * @value 'top'
 * @option 下
 * @value 'under'
 * @default 'under'
 * @parent EscapeWindow
 * 
 * @param EscapeWindowOpacity
 * @desc 逃走時ウィンドウ表示時のアクターステータスウィンドウの不透明度（0で非表示）
 * @text 逃走時ウィンドウ表示時ウィンドウ不透明度
 * @type number
 * @default 255
 * @max 255
 * @min 0
 * @parent EscapeWindow
 * 
 * @param EscapeWindowBackGround
 * @text 背景画像ウィンドウ背景設定
 * @default ------------------------------
 * @parent EscapeWindow
 * 
 * @param EscapeBackgroundImg
 * @desc 逃走成功時の背景画像ウィンドウを指定する。
 * @text 逃走成功時背景画像ウィンドウ
 * @type file
 * @dir img/
 * @default 
 * @parent EscapeWindowBackGround
 * 
 * @param EscapeBackground_X
 * @desc 逃走成功時の背景画像X座標（相対）。
 * @text 逃走成功時背景画像X座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent EscapeWindowBackGround
 * 
 * @param EscapeBackground_Y
 * @desc 逃走成功時の背景画像Y座標（相対）。
 * @text 逃走成功時背景画像Y座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent EscapeWindowBackGround
 * 
 * @param EscapeFailureBackgroundImg
 * @desc 逃走成功時の背景画像ウィンドウを指定する。
 * @text 逃走成功時背景画像ウィンドウ
 * @type file
 * @dir img/
 * @default 
 * @parent EscapeWindowBackGround
 * 
 * @param EscapeFailureBackground_X
 * @desc 逃走成功時の背景画像X座標（相対）。
 * @text 逃走成功時背景画像X座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent EscapeWindowBackGround
 * 
 * @param EscapeFailureBackground_Y
 * @desc 逃走成功時の背景画像Y座標（相対）。
 * @text 逃走成功時背景画像Y座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent EscapeWindowBackGround
 * 
 * @param MessageWindow
 * @text メッセージウィンドウ
 * @default ////////////////////////////////
 * 
 * @param MessageWindowOpacity
 * @desc メッセージウィンドウが下側に表示時のアクターステータスウィンドウの不透明度（0で非表示）
 * @text メッセージウィンドウ表示時ウィンドウ不透明度
 * @type number
 * @default 255
 * @max 255
 * @min 0
 * @parent MessageWindow
 * 
 * @param SupportActorCommand
 * @text サポートアクター設定
 * @default ////////////////////////////////
 * 
 * @param SupportActorCommand_X
 * @desc サポートアクター用アクターコマンドX座標。（アクターコマンドが各アクターの上設定時）
 * @text サポートアクターコマンドX座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent SupportActorCommand
 * 
 * @param SupportActorCommand_Y
 * @desc サポートアクター用アクターコマンドY座標。（アクターコマンドが各アクターの上設定時）
 * @text サポートアクターコマンドY座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent SupportActorCommand
 * 
 */
/*~struct~StatusPositionData:
 * 
 * @param ActorNameChangePosition
 * @text アクター名位置設定（相対座標）
 * @desc 座標はアクターステータス(0, 0)からの相対座標です。
 * 
 * @param NameChangePosition
 * @desc 名前の座標変更を許可する。
 * @text 名前の座標変更
 * @type boolean
 * @default false
 * @parent ActorNameChangePosition
 * 
 * @param ActorName_X
 * @desc 名前の座標変更がONの時に、名前のX座標を設定します。
 * @text 名前X座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorNameChangePosition
 * 
 * @param ActorName_Y
 * @desc 名前の座標変更がONの時に、名前のY座標を設定します。
 * @text 名前Y座標
 * @type number
 * @default 88
 * @min -9999
 * @max 9999
 * @parent ActorNameChangePosition
 * 
 * @param ActorHPChangePosition
 * @text HP位置設定
 * @default ------------------------------
 * 
 * @param HPGaugeWidth
 * @desc HPゲージの横幅を指定します。（デフォルト128）
 * @text HPゲージ横幅
 * @type number
 * @default 128
 * @min 0
 * @max 999
 * @parent ActorHPChangePosition
 * 
 * @param HPGaugeHeight
 * @desc HPゲージの縦幅を指定します。（デフォルト12）
 * @text HPゲージ縦幅
 * @type number
 * @default 12
 * @min 0
 * @max 24
 * @parent ActorHPChangePosition
 * 
 * @param HPChangePosition
 * @desc HPの座標変更を許可します。
 * @text HPの座標変更
 * @type boolean
 * @default false
 * @parent ActorHPChangePosition
 * 
 * @param ActorHP_X
 * @desc HPの座標変更がONの時に、HPのX座標を設定します。
 * @text HP_X座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorHPChangePosition
 * 
 * @param ActorHP_Y
 * @desc HPの座標変更がONの時に、HPのY座標を設定します。
 * @text HP_Y座標
 * @type number
 * @default 112
 * @min -9999
 * @max 9999
 * @parent ActorHPChangePosition
 * 
 * @param ActorMPChangePosition
 * @text MP位置設定
 * @default ------------------------------
 * 
 * @param MPGaugeWidth
 * @desc MPゲージの横幅を指定します。（デフォルト128）
 * @text MPゲージ横幅
 * @type number
 * @default 128
 * @min 0
 * @max 999
 * @parent ActorMPChangePosition
 * 
 * @param MPGaugeHeight
 * @desc MPゲージの縦幅を指定します。（デフォルト12）
 * @text MPゲージ縦幅
 * @type number
 * @default 12
 * @min 0
 * @max 24
 * @parent ActorMPChangePosition
 * 
 * @param MPChangePosition
 * @desc MPの座標変更を許可します。
 * @text MPの座標変更
 * @type boolean
 * @default false
 * @parent ActorMPChangePosition
 * 
 * @param ActorMP_X
 * @desc MPの座標変更がONの時に、MPのX座標を設定します。
 * @text MP_X座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorMPChangePosition
 * 
 * @param ActorMP_Y
 * @desc MPの座標変更がONの時に、MPのY座標を設定します。
 * @text MP_Y座標
 * @type number
 * @default 136
 * @max 9999
 * @parent ActorMPChangePosition
 * 
 * @param ActorTPChangePosition
 * @text TP位置設定
 * @default ------------------------------
 * 
 * @param TPGaugeWidth
 * @desc TPゲージの横幅を指定します。（デフォルト128）
 * @text TPゲージ横幅
 * @type number
 * @default 128
 * @min 0
 * @max 999
 * @parent ActorTPChangePosition
 * 
 * @param TPGaugeHeight
 * @desc TPゲージの縦幅を指定します。（デフォルト12）
 * @text TPゲージ縦幅
 * @type number
 * @default 12
 * @min 0
 * @max 24
 * @parent ActorTPChangePosition
 * 
 * @param TPChangePosition
 * @desc TPの座標変更を許可します。
 * @text TPの座標変更
 * @type boolean
 * @default false
 * @parent ActorTPChangePosition
 * 
 * @param ActorTP_X
 * @desc TPの座標変更がONの時に、TPのX座標を設定します。
 * @text TP_X座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorTPChangePosition
 * 
 * @param ActorTP_Y
 * @desc TPの座標変更がONの時に、TPのY座標を設定します。
 * @text TP_Y座標
 * @type number
 * @default 160
 * @min -9999
 * @max 9999
 * @parent ActorTPChangePosition
 * 
 * @param ActorTPBChangePosition
 * @text TPB位置設定
 * @default ------------------------------
 * 
 * @param TPBGaugeWidth
 * @desc TPBゲージの横幅を指定します。
 * @text TPBゲージ横幅
 * @type number
 * @default 128
 * @min 0
 * @max 999
 * @parent ActorTPBChangePosition
 * 
 * @param TPBGaugeHeight
 * @desc TPBゲージの縦幅を指定します。（デフォルト12）
 * @text TPBゲージ縦幅
 * @type number
 * @default 12
 * @min 0
 * @max 24
 * @parent ActorTPBChangePosition
 * 
 * @param TPBChangePosition
 * @desc TPBの座標変更を許可します。
 * @text TPBの座標変更
 * @type boolean
 * @default false
 * @parent ActorTPBChangePosition
 * 
 * @param ActorTPB_X
 * @desc TPBの座標変更がONの時に、TPBのX座標を設定します。
 * @text TPB_X座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorTPBChangePosition
 * 
 * @param ActorTPB_Y
 * @desc TPBの座標変更がONの時に、TPBのY座標を設定します。
 * @text TPB_Y座標
 * @type number
 * @default 88
 * @min -9999
 * @max 9999
 * @parent ActorTPBChangePosition
 * 
 * @param ActorStateChangePosition
 * @text ステート位置設定
 * @default ------------------------------
 * 
 * @param StateChangePosition
 * @desc ステートの座標変更を許可します。
 * @text ステートの座標変更
 * @type boolean
 * @default false
 * @parent ActorStateChangePosition
 * 
 * @param ActorState_X
 * @desc ステートの座標変更がONの時に、ステートのX座標を設定します。
 * @text ステートX座標
 * @type number
 * @default 4
 * @min -9999
 * @max 9999
 * @parent ActorStateChangePosition
 * 
 * @param ActorState_Y
 * @desc ステートの座標変更がONの時に、ステートのY座標を設定します。
 * @text ステートY座標
 * @type number
 * @default 20
 * @min -9999
 * @max 9999
 * @parent ActorStateChangePosition
 * 
 * @param OutsideWindowVisible
 * @desc アイコンの表示をウィンドウ枠外でも表示させます。(アクター画像の上に表示されます)
 * @text アイコンウィンドウ枠外表示
 * @type boolean
 * @default false
 * @parent ActorStateChangePosition
 * 
 * @param ActorImgChangePosition
 * @text アクター画像位置設定
 * @default ------------------------------
 * 
 * @param ImgChangePosition
 * @desc 顔グラフィック及びアクター画像の座標変更を許可します。
 * @text 画像座標変更
 * @type boolean
 * @default false
 * @parent ActorImgChangePosition
 * 
 * @param ActorImg_X
 * @desc 顔グラフィック及びアクター画像のX座標を設定します。
 * @text 画像X座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorImgChangePosition
 * 
 * @param ActorImg_Y
 * @desc 顔グラフィック及びアクター画像のY座標を設定します。
 * @text 画像Y座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorImgChangePosition
 * 
 * @param Background
 * @text アクター画像位置設定
 * @default ------------------------------
 * 
 * @param ActorBackground
 * @desc アクターの背景画像を指定します。
 * @text アクター背景画像
 * @type file
 * @default 
 * @dir img/
 * @parent Background
 * 
 * @param ActorFrontBackground
 * @desc ステータス背後の背景画像を指定する。（アクターグラフィックとステータスの間に表示）
 * @text ステータス背後背景画像
 * @type file
 * @dir img/
 * @default 
 * @parent Background
 * 
 */
/*~struct~ActorImgList:
 * 
 * @param ActorImgMode
 * @text アクターの画像モード
 * @desc アクターステータスに表示するアクターの画像。
 * @type select
 * @option なし
 * @value 'none'
 * @option 顔グラ
 * @value 'face'
 * @option 画像
 * @value 'imges'
 * @default 'face'
 * @parent ActorImgList
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
/*~struct~ActorDataList:
 * 
 * @param actorId
 * @text アクター
 * @desc アクターを指定します。0指定の場合はデフォルトの設定となります。
 * @type actor
 * 
 * @param ActorPosition
 * @text アクター座標設定
 * @default ////////////////////////////////
 * 
 * @param DefaultStatusPosition
 * @desc デフォルトステータス座標表示設定での座標、表示設定を有効にします。
 * @text デフォルトステータス座標表示設定有効
 * @type boolean
 * @default true
 * @parent ActorPosition
 * 
 * @param StatusPositionData
 * @text ステータス座標表示設定
 * @desc ステータスの座標、表示設定の設定を行います。
 * @default {"ActorNameChangePosition":"","NameChangePosition":"false","ActorName_X":"0","ActorName_Y":"88","ActorHPChangePosition":"------------------------------","HPGaugeWidth":"128","HPGaugeHeight":"12","HPChangePosition":"false","ActorHP_X":"0","ActorHP_Y":"112","ActorMPChangePosition":"------------------------------","MPGaugeWidth":"128","MPGaugeHeight":"12","MPChangePosition":"false","ActorMP_X":"0","ActorMP_Y":"136","ActorTPChangePosition":"------------------------------","TPGaugeWidth":"128","TPGaugeHeight":"12","TPChangePosition":"false","ActorTP_X":"0","ActorTP_Y":"160","ActorTPBChangePosition":"------------------------------","TPBGaugeWidth":"128","TPBGaugeHeight":"12","TPBChangePosition":"false","ActorTPB_X":"0","ActorTPB_Y":"88","ActorStateChangePosition":"------------------------------","StateChangePosition":"false","ActorState_X":"4","ActorState_Y":"20","OutsideWindowVisible":"false","ActorImgChangePosition":"------------------------------","ImgChangePosition":"false","ActorImg_X":"0","ActorImg_Y":"0","Background":"------------------------------","ActorBackground":"","ActorFrontBackground":""}
 * @type struct<StatusPositionData>
 * @parent ActorPosition
 * 
 * @param ActorImges
 * @text アクター画像設定
 * @default ////////////////////////////////
 * 
 * @param ActorImgSetting
 * @text アクター画像座標拡大率設定
 * @desc アクター画像の座標、拡大率の設定を行います。空白の場合はデフォルトアクター画像設定の値が設定されます。
 * @default {"ActorImgMode":"'face'","Actor_X":"0","Actor_Y":"0","Img_SX":"0","Img_SY":"0","Actor_Scale":"100"}
 * @type struct<ActorImgList>
 * @parent ActorImges
 * 
 * @param ButlerActorImg
 * @text アクター画像設定
 * @desc アクター画像の設定を行います。
 * @default []
 * @type struct<ActorButlerImgList>[]
 * @parent ActorImges
 * 
 */
/*~struct~ActorButlerImgList:
 * 
 * @param GraphicImg
 * @text アクター画像
 * @desc アクターの画像を設定します。
 * @type file
 * @dir img/
 * 
 * @param FaceImg
 * @text 顔グラ画像
 * @desc 顔グラ画像のスプライトシートを設定します。
 * @type file
 * @dir img/faces
 * 
 * @param ImgIndex
 * @text 顔グラのインデックスID
 * @desc 顔グラのインデックスID。
 * @type number
 * @default -1
 * @min -1
 * 
 * @param AllMatch
 * @text 全条件一致
 * @default ------------------------------
 * 
 * @param ChangeGraphicScenes
 * @text 変化シーン
 * @desc グラフィックの変化シーンを選択します。
 * @type select
 * @option 通常
 * @value 'default'
 * @option 戦闘不能
 * @value 'death'
 * @option 瀕死
 * @value 'dying'
 * @option ダメージ時
 * @value 'damage'
 * @option 回復時
 * @value 'recovery'
 * @option 攻撃スキル使用時(1)
 * @value 'attack'
 * @option 回復スキル使用時(1)
 * @value 'recoverySkill'
 * @option アイテム使用時(2)
 * @value 'item'
 * @option 詠唱時
 * @value 'chant'
 * @option 勝利時
 * @value 'victory'
 * @option 被ステート(3)
 * @value 'state'
 * @default 'default'
 * @parent AllMatch
 * 
 * @param ImgHP
 * @text 残りHP
 * @desc 残りHPが指定の範囲内または数値の時に変化します。
 * @type struct<CondValue>
 * @default {"CondValid":"false","UpLimit":"0","DwLimit":"0"}
 * @parent AllMatch
 * 
 * @param ImgSwitch
 * @text スイッチ
 * @desc 指定したスイッチが全てONの時に変化します。
 * @type switch[]
 * @default
 * @parent AllMatch
 * 
 * @param ImgWeapon
 * @text 武器
 * @desc 指定した武器を全て装備している時に条件を満たします。
 * @type weapon[]
 * @default 
 * @parent AllMatch
 * 
 * @param ImgArmor
 * @text 防具
 * @desc 指定した防具を全て装備している時に条件を満たします。
 * @type armor[]
 * @default 
 * @parent AllMatch
 * 
 * @param ImgClass
 * @text 職業
 * @desc 特定の職業なら条件を満たします。
 * @type class
 * @default 0
 * @parent AllMatch
 * 
 * @param ImgStateAll
 * @text ステート。
 * @desc 指定したステートに全てかかっている時に条件を満たします。
 * @type state[]
 * @default 
 * @parent AllMatch
 * 
 * @param CondSetting
 * @text 条件設定
 * @default ------------------------------
 * 
 * @param Skill
 * @text スキル(1)
 * @desc スキルを選択します。いずれかのスキル使用時に適用します。空白の場合は全てのスキルが対象です。スキルID0は通常攻撃です。
 * @type skill[]
 * @default
 * @parent CondSetting
 * 
 * @param Item
 * @text アイテム(2)
 * @desc アイテムを選択します。いずれかのアイテム使用時に適用します。空白の場合は全てのアイテムが対象です。
 * @type item[]
 * @default
 * @parent CondSetting
 * 
 * @param stateId
 * @text 被ステート(3)
 * @desc ステートを選択します。全てのステートにかかっている時に適用します。
 * @type state[]
 * @default 
 * @parent CondSetting
 */
/*~struct~CondValue:
 * 
 * @param CondValid
 * @desc HP条件を有効にします。
 * @text HP条件有効
 * @type boolean
 * @default false
 * 
 * @param UpLimit
 * @text 上限値
 * @desc 上限値
 * @type number
 * @default 0
 * 
 * @param DwLimit
 * @text 下限値
 * @desc 下限値
 * @type number
 * @default 0
 * 
 */

var Imported = Imported || {};
Imported.NUUN_BattleStyleEX_Default = true;

(() => {

const parameters = PluginManager.parameters('NUUN_BattleStyleEX_Default');
const params = {};

params.bsMode = 'Default';

params.PartyCommandPosition = eval(parameters['PartyCommandPosition']) || 'default';
params.PartyCommandMaxCol = Number(parameters['PartyCommandMaxCol'] || 1);
params.PartyCommandMaxRow = Number(parameters['PartyCommandMaxRow'] || 4);
params.PartyCommand_X = Number(parameters['PartyCommand_X'] || 0);
params.PartyCommand_Y = Number(parameters['PartyCommand_Y'] || 0);
params.PartyCommand_Width = Number(parameters['PartyCommand_Width'] || 192);
params.PartyCommandMode = eval(parameters['PartyCommandMode'] || "false");
params.PartyCommandWindowShow = eval(parameters['PartyCommandWindowShow'] || "true");
params.PartyCommandWindowCenter = eval(parameters['PartyCommandWindowCenter'] || "false");
params.PartyCommandBackgroundImg = String(parameters['PartyCommandBackgroundImg']);
params.PartyBackground_X = Number(parameters['PartyBackground_X'] || 0);
params.PartyBackground_Y = Number(parameters['PartyBackground_Y'] || 0);

params.ActorCommandPosition = eval(parameters['ActorCommandPosition']) || 'default';
params.ActorCommand_Width = Number(parameters['ActorCommand_Width'] || 192);
params.ActorCommandVariable = eval(parameters['ActorCommandVariable'] || "true");
params.ActorCommandMaxRow = Number(parameters['ActorCommandMaxRow'] || 10);
params.ActorCommandMinRow = Number(parameters['ActorCommandMinRow'] || 4);
params.ActorCommandMaxCol = Number(parameters['ActorCommandMaxCol'] || 1);
params.ActorCommandMode = eval(parameters['ActorCommandMode'] || "false");
params.ActorCommand_X = Number(parameters['ActorCommand_X'] || 0);
params.ActorCommand_Y = Number(parameters['ActorCommand_Y'] || 0);
params.ActorCommandWindowShow = eval(parameters['ActorCommandWindowShow'] || "true");
params.ActorCommandWindowCenter = eval(parameters['ActorCommandWindowCenter'] || "true");
params.ActorCommandBackgroundImg = String(parameters['ActorCommandBackgroundImg']);
params.ActorBackground_X = Number(parameters['ActorBackground_X'] || 0);
params.ActorBackground_Y = Number(parameters['ActorBackground_Y'] || 0);
params.WidthWithCommand = eval(parameters['WidthWithCommand'] || "true");

params.EnemyWindowShow = eval(parameters['EnemyWindowShow'] || "true");
params.EnemyMaxRow = Number(parameters['EnemyMaxRow'] || 4);
params.EnemyMaxCol = Number(parameters['EnemyMaxCol'] || 1);
params.EnemyWindow_X = Number(parameters['EnemyWindow_X'] || 0);
params.EnemyWindow_Y = Number(parameters['EnemyWindow_Y'] || 0);
params.EnemyWindow_Width = Number(parameters['EnemyWindow_Width'] || 0);
params.EnemyWindowMode = eval(parameters['EnemyWindowMode'] || "true");
params.EnemyWindowOpacity = Number(parameters['EnemyWindowOpacity'] || 255);
params.EnemyWindowBackgroundImg = String(parameters['EnemyWindowBackgroundImg']);
params.EnemyWindowBackground_X = Number(parameters['EnemyWindowBackground_X'] || 0);
params.EnemyWindowBackground_Y = Number(parameters['EnemyWindowBackground_Y'] || 0);

params.ActorStatusVariable = eval(parameters['ActorStatusVariable'] || "false");
params.ActorMaxCol = Number(parameters['ActorMaxCol'] || 4);
params.ActorMaxRow = Number(parameters['ActorMaxRow'] || 1);
params.ActorStatusMode = eval(parameters['ActorStatusMode']) || "center";
params.ActorStatusWindowPosition = eval(parameters['ActorStatusWindowPosition']) || 'under';
params.ActorStatusWindow_X = Number(parameters['ActorStatusWindow_X'] || 0);
params.ActorStatusWindow_Y = Number(parameters['ActorStatusWindow_Y'] || 0);
params.ActorStatusWindow_Width = Number(parameters['ActorStatusWindow_Width'] || 0);
params.ActorStatusWindow_Height = Number(parameters['ActorStatusWindow_Height'] || 0);
params.ActorStatusWindowCenter = eval(parameters['ActorStatusWindowCenter'] || "false");
params.WindowBackground = String(parameters['WindowBackground']);
params.WindowBackground_X = Number(parameters['WindowBackground_X'] || 0);
params.WindowBackground_Y = Number(parameters['WindowBackground_Y'] || 0);
params.ActorStatusWindowLock = eval(parameters['ActorStatusWindowLock'] || "false");
params.WindowShow = eval(parameters['WindowShow'] || "true");
params.WindowFrameShow = eval(parameters['WindowFrameShow'] || "false");
params.CursorBackShow = eval(parameters['CursorBackShow'] || "true");

params.ActorEffectShow = eval(parameters['ActorEffectShow'] || "true");
params.ActorEffect_X = Number(parameters['ActorEffect_X'] || 0);
params.ActorEffect_Y = Number(parameters['ActorEffect_Y'] || 0);
params.ActorDamage_X = Number(parameters['ActorDamage_X'] || 0);
params.ActorDamage_Y = Number(parameters['ActorDamage_Y'] || 0);
params.AnimationY = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['AnimationY'])) : null) || [];//仮

params.DamageImgFrame = Number(parameters['DamageImgFrame'] || 30);
params.ActorShakeFlame = Number(parameters['ActorShakeFlame'] || 36);
params.ActorShakePower = Number(parameters['ActorShakePower'] || 2);
params.ActorShakeSpeed = Number(parameters['ActorShakeSpeed'] || 20);
params.ActionZoomDuration = Number(parameters['ActionZoomDuration'] || 60);
params.ActorFlash = eval(parameters['ActorFlash'] || "true");
params.OnActionZoom = eval(parameters['OnActionZoom'] || "true");
params.OnActorShake = eval(parameters['OnActorShake'] || "true");

params.DefaultStatusPositionData = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['DefaultStatusPositionData'])) : null) || {};
params.DefaultActorImgData = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['DefaultActorImgData'])) : null) || {};
params.ActorData = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ActorData'])) : null) || [];
params.OnActorPictureEX = eval(parameters['OnActorPictureEX'] || "false");
params.Img_SW = Number(parameters['Img_SW'] || 0);
params.Img_SH = Number(parameters['Img_SH'] || 0);
params.FaceHeight = Number(parameters['FaceHeight'] || 0);
params.NameShow = eval(parameters['NameShow'] || "true");
params.TPBShow = eval(parameters['TPBShow'] || "true");
params.StateVisible = eval(parameters['StateVisible'] || "true");
params.OutsideWindowVisible = eval(parameters['OutsideWindowVisible'] || "false");
params.SelectBackShow = eval(parameters['SelectBackShow'] || "true");
params.ActorSelectBackShow = eval(parameters['ActorSelectBackShow'] || "true");
params.ImgDeathHide = eval(parameters['ImgDeathHide'] || "true");
params.FaceHeightOnWindow = eval(parameters['FaceHeightOnWindow'] || "false");

params.EnemySkillAnimation = Number(parameters['EnemySkillAnimation'] || 1);

params.AppearWindowVisible = eval(parameters['AppearWindowVisible'] || "false");
params.AppearWindowOpacity = Number(parameters['AppearWindowOpacity'] || 255);
params.AppearWindowAnchorMode = eval(parameters['AppearWindowAnchorMode']) || 'under';
params.AppearBackgroundImg = String(parameters['AppearBackgroundImg']);
params.AppearBackground_X = Number(parameters['AppearBackground_X'] || 0);
params.AppearBackground_Y = Number(parameters['AppearBackground_Y'] || 0);

params.ItemWindowShow = eval(parameters['ItemWindowShow'] || "true");
params.ItemWindowOpacity = Number(parameters['ItemWindowOpacity'] || 255);
params.ItemWindowBackgroundImg = String(parameters['ItemWindowBackgroundImg']);
params.ItemBackground_X = Number(parameters['ItemBackground_X'] || 0);
params.ItemBackground_Y = Number(parameters['ItemBackground_Y'] || 0);

params.SkillWindowShow = eval(parameters['SkillWindowShow'] || "true");
params.SkillWindowOpacity = Number(parameters['SkillWindowOpacity'] || 255);
params.SkillWindowBackgroundImg = String(parameters['SkillWindowBackgroundImg']);
params.SkillBackground_X = Number(parameters['SkillBackground_X'] || 0);
params.SkillBackground_Y = Number(parameters['SkillBackground_Y'] || 0);

params.HelpWindowShow = eval(parameters['HelpWindowShow'] || "true");
params.HelpWindowBackgroundImg = String(parameters['HelpWindowBackgroundImg']);
params.HelpBackground_X = Number(parameters['HelpBackground_X'] || 0);
params.HelpBackground_Y = Number(parameters['HelpBackground_Y'] || 0);

params.VictoryWindowAnchorMode = eval(parameters['VictoryWindowAnchorMode']) || 'under';
params.VictoryWindowOpacity = Number(parameters['VictoryWindowOpacity'] || 255);
params.VictoryBackgroundImg = String(parameters['VictoryBackgroundImg']);
params.VictoryBackground_X = Number(parameters['VictoryBackground_X'] || 0);
params.VictoryBackground_Y = Number(parameters['VictoryBackground_Y'] || 0);

params.LoseWindowAnchorMode = eval(parameters['LoseWindowAnchorMode']) || 'under';
params.LoseWindowOpacity = Number(parameters['LoseWindowOpacity'] || 255);
params.LoseBackgroundImg = String(parameters['LoseBackgroundImg']);
params.LoseBackground_X = Number(parameters['LoseBackground_X'] || 0);
params.LoseBackground_Y = Number(parameters['LoseBackground_Y'] || 0);

params.EscapeWindowAnchorMode = eval(parameters['EscapeWindowAnchorMode']) || 'under';
params.EscapeWindowOpacity = Number(parameters['EscapeWindowOpacity'] || 255);
params.EscapeBackgroundImg = String(parameters['EscapeBackgroundImg']);
params.EscapeBackground_X = Number(parameters['EscapeBackground_X'] || 0);
params.EscapeBackground_Y = Number(parameters['EscapeBackground_Y'] || 0);
params.EscapeFailureBackgroundImg = String(parameters['EscapeFailureBackgroundImg']);
params.EscapeFailureBackground_X = Number(parameters['EscapeFailureBackground_X'] || 0);
params.EscapeFailureBackground_Y = Number(parameters['EscapeFailureBackground_Y'] || 0);

params.MessageWindowOpacity = Number(parameters['MessageWindowOpacity'] || 255);

params.SupportActorCommand_X = Number(parameters['ESupportActorCommand_X'] || 0);
params.SupportActorCommand_Y = Number(parameters['SupportActorCommand_Y'] || 0);

NuunManager.getBattleStyleParams = function() {
    return params;
};

})();