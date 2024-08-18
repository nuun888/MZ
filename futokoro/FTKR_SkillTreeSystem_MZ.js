//=============================================================================
// ツリー型スキル習得システム(Tree-type Skill Learning System)
// FTKR_SkillTreeSystem.js
// プラグインNo : 7
// 作成者　　   : フトコロ(futokoro)
// 作成日　　   : 2017/02/25
// 最終更新日   : 2019/04/22
// バージョン   : v1.18.1
//=============================================================================
/*:
 * @target MZ
 * @plugindesc ツリー型スキル習得システム
 * @author フトコロ
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @url https://github.com/futokoro/RPGMaker/blob/master/FTKR_SkillTreeSystem.ja.md
 * @version 2.0.0
 * 
 * @help
 * 本プラグインは、ツリー型のスキル習得システムを実装するプラグインです。
 * 
 * 
 * 1.本プラグインにより、スキル習得システムの専用画面を表示し、
 *   視覚的にスキルを習得することができるようになります。
 * 
 *   専用画面は、以下の方法で表示できます。
 *   a. プラグインパラメータ<ShowSkillCommand>が ON の時に
 *      メニュー画面のコマンドから表示 
 *   b. プラグインコマンド<スキルツリー画面表示>を実行
 * 
 * 
 * 2.アクター毎にスキル習得時に使用できるスキルポイント(SP)を実装します。
 * 
 * 
 * プラグインの使い方は、以下のHPを参照してください。
 * https://github.com/futokoro/RPGMaker/blob/master/FTKR_SkillTreeSystem.ja.md
 * 
 * 設定方法/PluginManager Setting
 * 1. プラグインパラメータ<Skill Tree Id>に、スキルツリーを設定する
 *    武器タイプIDを設定してください。
 * 
 *    In the plugin parameter <Skill Tree Id>, Set weapon type ID for
 *    skill tree.
 * 
 * -----------------------------------------------------------------------------
 * 本プラグインのライセンスについて(License)
 *-----------------------------------------------------------------------------
 * 本プラグインはMITライセンスのもとで公開しています。
 * This plugin is released under the MIT License.
 * 
 * Copyright (c) 2017,2018 Futokoro
 * http://opensource.org/licenses/mit-license.php
 * 
 * 
 * プラグイン公開元
 * https://github.com/futokoro/RPGMaker/blob/master/README.md
 * 
 * -----------------------------------------------------------------------------
 * 
 * 本プラグインについて
 * 本プラグインはフトコロ様FTKR_SkillTreeSystemをMZ用に改変したプラグインです。
 * 原則、要望は受け付けておりません。
 * 
 * 更新履歴
 * 2024/8/18 Ver.2.0.0
 * 初版
 * 
 * 
 * @command STSOpen
 * @desc スキルツリー画面を表示します。
 * @text スキルツリー画面表示
 * 
 * @command STSADDSP
 * @desc 指定したアクターが、SPを取得します。
 * @text SP取得
 * 
 * @arg ActorId
 * @desc アクターを指定します。
 * @text アクター
 * @type actor
 * @default 0
 * @min 0
 * 
 * @arg AddSP
 * @desc 加算するSPを設定します。
 * @text 加算SP
 * @type number
 * @default 0
 * @min 0
 * 
 * @command STSGETSKILLCOUNT
 * @desc 指定したアクターがスキルを習得している回数を ゲーム内変数に格納します。
 * @text スキルの取得回数の取得
 * 
 * @arg VarId
 * @desc 格納する変数を指定します。
 * @text 変数
 * @type variable
 * @default 0
 * @min 0
 * 
 * @arg ActorId
 * @desc アクターを指定します。
 * @text アクター
 * @type actor
 * @default 0
 * @min 0
 * 
 * @arg Skill
 * @desc スキルを指定します。
 * @text スキル
 * @type skill
 * @default 0
 * @min 0
 * 
 * @command STSTREERESET
 * @desc 指定したアクターのスキルツリーを、すべてまたは指定した対象のみ リセットします。 リセットしたツリーに使用したコストはアクターに戻ります。
 * @text ツリーのリセット
 * 
 * @arg ActorId
 * @desc アクターを指定します。
 * @text アクター
 * @type actor
 * @default 0
 * @min 0
 * 
 * @arg TreeType
 * @desc ツリータイプIDを指定します。0で全て
 * @text ツリータイプID
 * @type weapon
 * @default 0
 * @min 0
 * 
 * @command STSCLEAR
 * @desc 指定したアクターのスキルツリーを、すべてまたは指定したツリーのみ 初期化します。 初期化したツリーに使用したコストはアクターに戻りません。
 * @text ツリーの初期化
 * 
 * @arg ActorId
 * @desc アクターを指定します。
 * @text アクター
 * @type actor
 * @default 0
 * @min 0
 * 
 * @arg TreeType
 * @desc ツリータイプIDを指定します。0で全て
 * @text ツリータイプID
 * @type number
 * @default weapon
 * @min 0
 * 
 * @command STSLEARNSKILL
 * @desc 指定したアクターが、指定したスキルを習得します。 
 * @text スキルを習得
 * 
 * @arg ActorId
 * @desc アクターを指定します。
 * @text アクター
 * @type actor
 * @default 0
 * @min 0
 * 
 * @arg Skill
 * @desc スキルを指定します。
 * @text スキル
 * @type skill
 * @default 0
 * @min 0
 * 
 * @command STSADDTREETYPE
 * @desc 指定したアクターに、指定したスキルツリーを追加します。
 * @text スキルツリーを追加する
 * 
 * @arg ActorId
 * @desc アクターを指定します。
 * @text アクター
 * @type actor
 * @default 0
 * @min 0
 * 
 * @arg TreeType
 * @desc ツリータイプIDを指定します。
 * @text ツリータイプID
 * @type weapon
 * @default 0
 * @min 0
 * 
 * @command STSREDUCETREETYPE
 * @desc 指定したアクターの、指定したスキルツリーを削除します。
 * @text スキルツリーを削除する
 * 
 * @arg ActorId
 * @desc アクターを指定します。
 * @text アクター
 * @type actor
 * @default 0
 * @min 0
 * 
 * @arg TreeType
 * @desc ツリータイプIDを指定します。
 * @text ツリータイプID
 * @type weapon
 * @default 0
 * @min 0
 * 
 * 
 * @param RequiredSetting
 * @text 必須設定
 * @default ------------------------------
 * 
 * @param SkillTreeId
 * @desc スキルツリーを設定した武器タイプIDを設定します。
 * @text スキルツリーID
 * @default 0
 * @type number
 * @parent RequiredSetting
 * 
 * @param ShowContentsBackground
 * @desc コンテンツ背景画像を表示する。
 * @text コンテンツ背景画像表示
 * @default true
 * @type boolean
 * @parent BasicSetting
 * 
 * @param BasicSetting
 * @text 基本設定
 * @default ------------------------------
 * 
 * @param ShowSkillCommand
 * @desc メニューにスキル習得コマンドを表示する。
 * @text メニュースキル習得表示
 * @default true
 * @type boolean
 * @parent BasicSetting
 * 
 * @param CommandName
 * @desc スキル習得コマンドのコマンド名を設定します。
 * @text スキル習得コマンド名
 * @default スキル習得
 * @type string
 * @parent BasicSetting
 * 
 * @param SkillMenuSwitchID
 * @desc メニュー欄の表示のON/OFFを制御するスイッチIDを指定します。
 * @text メニュー欄表示スイッチ
 * @default 0
 * @type switch
 * @parent BasicSetting
 *
 * @param EnableConfirmation
 * @desc スキル習得実行時に確認画面で実行確認する。
 * @text スキル習得時確認
 * @default true
 * @type boolean
 * @parent BasicSetting
 * 
 * @param ResetWhenForgottenSkill
 * @desc スキルを忘れた時にツリーをリセットする。
 * @text スキル忘却時ツリーリセット
 * @default true
 * @type boolean
 * @parent BasicSetting
 * 
 * @param LearnedActorVarID
 * @desc スキルを習得したアクターのIDを格納する変数IDを指定します。
 * @text スキル習得アクターID格納変数
 * @default 0
 * @type variable
 * @parent BasicSetting
 *
 * @param LearnedSkillVarID
 * @desc 習得したスキルのIDを格納する変数IDを指定します。
 * @text 習得スキルID格納変数
 * @default 0
 * @type variable
 * @parent BasicSetting
 * 
 * @param LearnedCountSetting
 * @text 習得回数の設定
 * @default ------------------------------
 * 
 * @param EnabledSkillCount
 * @desc スキルの複数回習得機能を有効にする。
 * @text スキル複数回習得有効
 * @default false
 * @type boolean
 * @parent LearnedCountSetting
 * 
 * @param DefaultMaxCount
 * @desc スキルのデフォルト最大習得回数
 * @text スキルデフォルト最大習得回数
 * @default 1
 * @type number
 * @parent LearnedCountSetting
 * 
 * @param SkillLearnedIcon
 * @desc 習得済のスキルを明示するアイコン
 * @text 習得済スキルアイコン
 * @default 87
 * @type icon
 * @parent LearnedCountSetting
 * 
 * @param SkillPointSetting
 * @text スキルポイントの設定
 * @default ------------------------------
 * 
 * @param SPDisplayName
 * @desc スキルポイントの表示名
 * @text スキルポイントSP
 * @default SP
 * @type string
 * @parent SkillPointSetting
 * 
 * @param DefaultMaxSP
 * @desc スキルポイントの最大値。 0 は最大値なし
 * @text スキルポイント最大値
 * @default 0
 * @type number
 * @min 0
 * @parent SkillPointSetting
 * 
 * @param DefaultRequiredSP
 * @desc スキル習得に必要なスキルポイント。(スキル毎に設定しない場合のデフォルト値)
 * @text スキル習得必要ポイント
 * @default 1
 * @type number
 * @parent SkillPointSetting
 * 
 * @param GetLevelUpSp
 * @desc レベルアップ時に入手するSP量
 * @text レベルアップ入手SP
 * @default 1
 * @type number
 * @parent SkillPointSetting
 * 
 * @param CostSpIcon
 * @desc コストをSPに設定した場合に表示するアイコンを指定します。
 * @text コストSPアイコン
 * @default 296
 * @type icon
 * @parent SkillPointSetting
 *
 * @param HideSpCost0
 * @desc SPコストが0の場合にコストウィンドウで非表示にする。
 * @text コスト0ウィンドウ非表示
 * @default false
 * @type boolean
 * @parent SkillPointSetting
 * 
 * @param DisplayGetSp
 * @desc 戦闘終了時のSP入手メッセージ。%1 - 獲得SP量, %2 - スキルポイント名
 * @text 戦闘終了時SP入手メッセージ
 * @default %1 の%2を獲得！
 * @type string
 * @parent SkillPointSetting
 * 
 * @param EnableClassSp
 * @desc アクター１人に対して職業毎に個別のSPを持たせるか
 * @text 職業毎個別SP
 * @type boolean
 * @default false
 * @parent SkillPointSetting
 * 
 * @param NonBattleMemberSpRate
 * @desc パーティー外メンバーの戦闘勝利時に入手するSP量の比率(%)
 * @text 戦闘メンバー外入手SP比率
 * @default 100
 * @min 0
 * @max 100
 * @type number
 * @parent SkillPointSetting
 * 
 * @param SkillFrameSetting
 * @text スキル枠の設定
 * @default ------------------------------
 * 
 * @param EnabledSkillFrame
 * @desc スキル枠を表示する。
 * @text スキル枠表示
 * @default true
 * @type boolean
 * @parent SkillFrameSetting
 * 
 * @param SkillFrameWidth
 * @desc スキル枠の幅
 * @text スキル枠横幅
 * @default 40
 * @type number
 * @parent SkillFrameSetting
 * 
 * @param SkillFrameHeight
 * @desc スキル枠の高さ
 * @text スキル枠高さ
 * @default 40
 * @type number
 * @parent SkillFrameSetting
 * 
 * @param SkillIconOffsetX
 * @desc スキル枠に対するアイコンのX座標の相対位置
 * @text スキル枠アイコンX座標
 * @default 4
 * @min -4096
 * @max 4096
 * @type number
 * @parent SkillFrameSetting
 * 
 * @param SkillIconOffsetY
 * @desc スキル枠に対するアイコンのY座標の相対位置
 * @text スキル枠アイコンY座標
 * @default 4
 * @min -4096
 * @max 4096
 * @type number
 * @parent SkillFrameSetting
 * 
 * @param SkillTextSetting
 * @text スキルテキストの設定
 * @default ------------------------------
 * 
 * @param SkillNameFormat
 * @desc スキル名の表示内容。%1 - スキル名
 * @text スキル名表示内容
 * @default 
 * @type string
 * @parent SkillTextSetting
 * 
 * @param SkillTextOffsetX
 * @desc スキル枠に対するスキル名のX座標の相対位置
 * @text スキル枠スキル名X座標
 * @default 38
 * @min -4096
 * @max 4096
 * @type number
 * @parent SkillTextSetting
 * 
 * @param SkillTextOffset Y
 * @desc スキル枠に対するスキル名のY座標の相対位置
 * @text スキル枠スキル名Y座標
 * @default 2
 * @min -4096
 * @max 4096
 * @type number
 * @parent SkillTextSetting
 * 
 * @param SkillFrameColorSetting
 * @text スキル枠の色の設定
 * @default ------------------------------
 * 
 * @param FrameColorisLearned
 * @desc 習得済みスキルの枠の色
 * @text 習得済みスキル枠色
 * @default 0
 * @type color
 * @parent SkillFrameColorSetting
 * 
 * @param FrameColorisLearnOK
 * @desc 習得可能なスキルの枠の色
 * @text 習得可能スキル枠色
 * @default 17
 * @type color
 * @parent SkillFrameColorSetting
 * 
 * @param FrameColorisReqSkillNG
 * @desc 必要スキル未修得のスキルの枠の色
 * @text 必要スキル未習得スキル枠色
 * @default 15
 * @type color
 * @parent SkillFrameColorSetting
 * 
 * @param FrameColorisRequiredNG
 * @desc 必要コストまたはパラメータ不足のスキルの枠の色
 * @text 必要コスト不足スキル枠色
 * @default 16
 * @type color
 * @parent SkillFrameColorSetting
 * 
 * @param SkillCountFrameSetting
 * @text 習得回数の表示設定
 * @default ------------------------------
 * 
 * @param DrawCountFrame
 * @desc スキルカウント枠を表示する。
 * @text スキルカウント枠表示
 * @default false
 * @type boolean
 * @parent SkillCountFrameSetting
 * 
 * @param CountFrameWidth
 * @desc スキルカウント枠の幅
 * @text スキルカウント枠幅
 * @default 20
 * @type number
 * @parent SkillCountFrameSetting
 * 
 * @param CountFrameHeight
 * @desc スキルカウント枠の高さ
 * @text スキルカウント枠高さ
 * @default 20
 * @type number
 * @parent SkillCountFrameSetting
 * 
 * @param CountFrameThick
 * @desc 枠線の太さ
 * @text 枠線太さ
 * @default 2
 * @type number
 * @parent SkillCountFrameSetting
 * 
 * @param CountFrameOffsetX
 * @desc スキル枠に対するカウント枠のX座標の相対位置。(カウント有効の場合は 10 がお勧め)
 * @text カウント枠X座標
 * @default -10
 * @min -4096
 * @max 4096
 * @type number
 * @parent SkillCountFrameSetting
 * 
 * @param CountFrameOffsetY
 * @desc スキル枠に対するカウント枠のY座標の相対位置。(カウント有効の場合は 0 がお勧め)
 * @text カウント枠Y座標
 * @default 25
 * @min -4096
 * @max 4096
 * @type number
 * @parent SkillCountFrameSetting
 * 
 * @param CountFrameFormat
 * @desc カウント枠に表示するスキルカウントの表示内容。%1 - スキルカウント値
 * @text カウント表示内容
 * @default \}\c[0]%1\{
 * @parent SkillCountFrameSetting
 * 
 * @param SkillCountOffsetX
 * @desc カウント枠に対するスキルカウントのX座標の相対位置
 * @text スキルカウントX座標
 * @default 5
 * @min -4096
 * @max 4096
 * @type number
 * @parent SkillCountFrameSetting
 * 
 * @param SkillCountOffsetY
 * @desc カウント枠に対するスキルカウントのY座標の相対位置
 * @text スキルカウントY座標
 * @default -10
 * @min -4096
 * @max 4096
 * @type number
 * @parent SkillCountFrameSetting
 * 
 * @param SkillTreeLayoutSetting
 * @text ツリーの表示設定
 * @default ------------------------------
 * 
 * @param DrawLineType
 * @desc ツリーのスキル間の線の引き方
 * @text 引き方
 * @default 1
 * @type select
 * @option 直線
 * @value 0
 * @option カギ線(A)
 * @value 1
 * @option カギ線(B)
 * @value 2
 * @option 線なし
 * @value 3
 * @parent SkillTreeLayoutSetting
 * 
 * @param TreeLineThick
 * @text ツリーの線の太さ
 * @desc ツリー線太さ
 * @default 2
 * @type number
 * @parent SkillTreeLayoutSetting
 * 
 * @param AddFrameToLine
 * @text ツリー線黒枠
 * @desc ツリーの線に黒枠を付けるか。
 * @default 0
 * @type select
 * @option 付けない
 * @value 0
 * @option 付ける
 * @value 1
 * @parent SkillTreeLayoutSetting
 * 
 * @param FitLineColorToFrame
 * @text スキル間線色モード
 * @desc スキル間の線の色を枠の色に合わせるか。
 * @default 1
 * @type select
 * @option 合わせない
 * @value 0
 * @option 合わせる
 * @value 1
 * @parent SkillTreeLayoutSetting
 * 
 * @param SkillTreeWindowSetting
 * @text スキルツリーウィンドウの設定
 * @default ------------------------------
 * 
 * @param SkillTreeMaxCols
 * @desc スキルを横に並べられる数
 * @text スキル列数
 * @default 5
 * @type number
 * @parent SkillTreeWindowSetting
 * 
 * @param SkillTreeHeightSpace
 * @desc スキルツリーの縦のスキル間隔
 * @text スキル縦スキル間隔
 * @default 24
 * @type number
 * @parent SkillTreeWindowSetting
 * 
 * @param SkillStatusWindowSetting
 * @text スキル説明ウィンドウの設定
 * @default ------------------------------
 * 
 * @param SkillStatusTitleFormat
 * @desc タイトルの表示内容を文字列で記述します。%1 - アクター名, %2 - スキル名
 * @text タイトル表示内容
 * @default \c[16][%2]のスキル情報
 * @parent SkillStatusWindowSetting
 * 
 * @param AdjustSkillDescWidth
 * @desc 説明文に制御文字が使えなくなる代わりに枠内に自動で納まるように調整する。
 * @text 説明文枠内表示
 * @default 0
 * @type select
 * @option 無効
 * @value 0
 * @option 有効
 * @value 1
 * @parent SkillStatusWindowSetting
 * 
 * @param CostWindowSetting
 * @text コストウィンドウの設定
 * @default ------------------------------
 * 
 * @param CostTitleFormat
 * @desc コストタイトルの表示内容を文字列で記述します。
 * @text コスト解いとる表示内容
 * @default \c[16]習得コスト：
 * @type string
 * @parent CostWindowSetting
 *
 * @param CostItemFormat
 * @desc コスト名の表示内容を文字列で記述します。%1 - コスト名
 * @text コスト名表示内容
 * @default %1
 * @type string
 * @parent CostWindowSetting
 *
 * @param CostNumberFormat
 * @desc コスト数値の表示内容を'色番号,文字列'で記述します。%1 - コスト数値, %2 - コストの手持ち量
 * @text コスト数値表示内容
 * @default 17,%1(%2)
 * @type string
 * @parent CostWindowSetting
 *
 * @param CostNumberWidth
 * @desc コスト数値の表示幅を指定します。(pixel単位) 0 - 指定しない
 * @text コスト数値表示幅
 * @default 0
 * @type number
 * @parent CostWindowSetting
 *
 * @param CostMaxCountFormat
 * @desc 最大習得回数に達した場合のコスト数値の表示内容を記述します。
 * @text 最大取得回数コスト数値表示内容
 * @default 
 * @type string
 * @parent CostWindowSetting
 * 
 * @param PreSkillWindowSetting
 * @text 前提スキルウィンドウの設定
 * @default ------------------------------
 * 
 * @param PreskillTitleFormat
 * @desc 前提スキルタイトルの表示内容を文字列で記述します。
 * @text 前提スキルタイトル表示内容
 * @default \c[16]前提スキル：
 * @type string
 * @parent PreSkillWindowSetting
 *
 * @param PreskillItemFormat
 * @desc 前提スキルの表示内容を文字列で記述します。%1 - 前提スキル名
 * @text 前提スキル表示内容
 * @default %1
 * @type string
 * @parent PreSkillWindowSetting
 * 
 * @param ConfirmationWindowSetting
 * @text 確認ウィンドウの設定
 * @default ------------------------------
 * 
 * @param ConfTitleFormat
 * @desc スキル習得実行時の確認内容を記述します。%1 - アクター名, %2 - スキル名
 * @text スキル習得実行時確認内容
 * @default スキル習得の確認
 * @type string
 * @parent ConfirmationWindowSetting
 * 
 * @param ConfirmationOkFormat
 * @desc 確認コマンドの「実行する」の表示内容を記述します。
 * @text 確認コマンド実行表示内容
 * @default 実行する
 * @type string
 * @parent ConfirmationWindowSetting
 *
 * @param ConfirmationCancelFormat
 * @desc 確認コマンドの「実行しない」の表示内容を記述します。
 * @text 確認コマンド非実行表示内容
 * @default 実行しない
 * @type string
 * @parent ConfirmationWindowSetting
 * 
 * @param LearnedSESetting
 * @text 習得時のSEの設定
 * @default ------------------------------
 * 
 * @param LearnSEName
 * @desc スキル習得実行時に鳴らすSEの名前を指定します。
 * @text スキル習得時SE
 * @default Sound2
 * @require 1
 * @type file
 * @dir audio/se
 * @parent LearnedSESetting
 *
 * @param LearnSEVolume
 * @desc スキル習得実行時に鳴らすSEの音量を指定します。
 * @text 音量
 * @default 90
 * @max 100
 * @type number
 * @parent LearnedSESetting
 *
 * @param LearnSEPitch
 * @desc スキル習得実行時に鳴らすSEのピッチを指定します。
 * @text ピッチ
 * @default 100
 * @min 50
 * @max 200
 * @type number
 * @parent LearnedSESetting
 *
 * @param LearnSEPan
 * @desc スキル習得実行時に鳴らすSEの位相を指定します。
 * @text 位相
 * @default 0
 * @min -100
 * @max 100
 * @type number
 * @parent LearnedSESetting
 * 
 * @param CostIconSetting
 * @text コストアイコンの設定
 * @default ------------------------------
 * 
 * @param CostGoldIcon
 * @desc コストをお金に設定した場合に表示するアイコンを指定します。
 * @text 金額コストアイコン
 * @default 297
 * @type icon
 * @parent CostIconSetting
 *
 * @param CostVariablesIcon
 * @desc コストを変数に設定した場合に表示するアイコンを指定します。
 * @text 変数コストアイコン
 * @default 294
 * @type icon
 * @parent CostIconSetting
 * 
 * @param ActorStatusLayout
 * @text ステータスの表示設定
 * @default ------------------------------
 * 
 * @param ActorStatusText1
 * @desc Text1部に表示するステータスを指定します。詳細はヘルプ参照
 * @text Text1部表示ステータス
 * @default face
 * @parent ActorStatusLayout
 * 
 * @param ActorStatusText2
 * @desc Text2部に表示するステータスを指定します。詳細はヘルプ参照
 * @text Text2部表示ステータス
 * @default name,level,sp
 * @parent ActorStatusLayout
 * 
 * @param ActorStatusText3
 * @desc Text3部に表示するステータスを指定します。詳細はヘルプ参照
 * @text Text3部表示ステータス
 * @default 
 * @parent ActorStatusLayout
 * 
 * @param ActorStatusSpace
 * @desc 各Textの間隔を指定します。
 * @text 各Text間隔
 * @default 0,0,0,0
 * @parent ActorStatusLayout
 * 
 * @param ActorStatusSpaceInText
 * @desc Text内で複数表示する場合の間隔を指定します。
 * @text Text内表示間隔
 * @default 0
 * @type number
 * @parent ActorStatusLayout
 * 
 * @param ActorStatusWidthRate
 * @desc Text1~Text3の表示幅の比率を指定します。
 * @text Text表示幅比率
 * 詳細はヘルプ参照
 * @default 3,2,0
 * @parent ActorStatusLayout
 * 
 * @param FrameSetting
 * @text 枠の表示設定
 * @default ------------------------------
 * 
 * @param SkillFrameType
 * @desc スキル枠の表示タイプを設定します。0 - 非表示, 1 ~ 7 - ヘルプ参照
 * @text スキル枠表示タイプ
 * @default 0
 * @type select
 * @option 非表示
 * @value 0
 * @option 単線
 * @value 1
 * @option 複線
 * @value 2
 * @option 画像
 * @value 3
 * @option 単線＋画像
 * @value 4
 * @option 複線＋画像
 * @value 5
 * @option 単線＋塗潰し
 * @value 6
 * @option 複線＋塗潰し
 * @value 7
 * @parent FrameSetting
 * 
 * @param CountFrameType
 * @desc スキルスキルカウント枠のタイプを設定します。0 - 非表示, 1 ~ 7 - ヘルプ参照
 * @text スキルスキルカウント枠タイプ
 * @default 0
 * @type select
 * @option 非表示
 * @value 0
 * @option 単線
 * @value 1
 * @option 複線
 * @value 2
 * @option 画像
 * @value 3
 * @option 単線＋画像
 * @value 4
 * @option 複線＋画像
 * @value 5
 * @option 単線＋塗潰し
 * @value 6
 * @option 複線＋塗潰し
 * @value 7
 * @parent FrameSetting
 * 
 * @param DefaultFrameImageIndex
 * @desc スキルスキルカウント枠に使用する画像番号を設定します。<Count Frame Type>で3～5に設定する必要有り
 * @text スキルスキルカウント枠画像番号
 * @default 
 * @type number
 * @parent FrameSetting
 * 
 * @param DisplayTreeTypeFrame
 * @desc ツリータイプに枠を表示するか
 * @text ツリータイプ枠表示
 * @default 0
 * @type select
 * @option 非表示
 * @value 0
 * @option 表示
 * @value 1
 * @parent FrameSetting
 * 
 * @param WhenToDisplayFrame
 * @desc コマンド枠を表示するタイミング
 * @text コマンド枠表示タイミング
 * @type select
 * @option 常時
 * @value 0
 * @option カーソルと重なる時
 * @value 1
 * @option カーソルと重ならない時
 * @value 2
 * @default 1
 * @parent FrameSetting
 * 
 * @param ChangeFrameOnCursor
 * @desc カーソルと重なった時に枠を変更する機能
 * @text フォーカス時枠変更
 * @type select
 * @option 無効
 * @value 0
 * @option 有効
 * @value 1
 * @default 1
 * @parent FrameSetting
 * 
 * @param HideCursor
 * @desc コマンドカーソルを非表示にする機能
 * @text コマンドカーソル非表示
 * @type select
 * @option 無効
 * @value 0
 * @option 有効
 * @value 1
 * @default 0
 * @parent FrameSetting
 * 
 * @param FrameLineSetting
 * @text 枠線設定
 * @default ------------------------------
 * @parent FrameSetting
 * 
 * @param DefaultLineColor
 * @desc 標準で枠線に使用する色番号
 * @text 標準枠線色番号
 * @type color
 * @default 0
 * @parent FrameLineSetting
 * 
 * @param LineColorOnCursor
 * @desc カーソルと重なった時に使用する色番号
 * @text フォーカス時色番号
 * @type color
 * @default 17
 * @parent FrameLineSetting
 * 
 * @param LineThick
 * @desc 枠線の太さ
 * @text 枠線太さ
 * @default 2
 * @type number
 * @parent FrameLineSetting
 * 
 * @param SubLineColor
 * @desc 複線時に使用する枠線の色番号
 * @text 複線時枠線色番号
 * @type color
 * @default 15
 * @parent FrameLineSetting
 * 
 * @param SubLineThick
 * @desc 複線時に使用する枠線の太さ
 * @text 複線時枠線太さ
 * @default 1
 * @type number
 * @parent FrameLineSetting
 * 
 * @param RectFrameSetting
 * @text 塗りつぶし設定
 * @default ------------------------------
 * @parent FrameSetting
 * 
 * @param DefaultRectColor
 * @desc 標準で枠内塗潰しに使用する色番号
 * @text 標準塗りつぶし色番号
 * @type color
 * @default 11
 * @parent RectFrameSetting
 * 
 * @param DefaultRectColor2
 * @desc 標準で枠内塗潰しに使用する色番号。(グラデーション表示用の2色目の色番号)
 * @text 標準塗りつぶし色番号2
 * @type color
 * @default 
 * @parent RectFrameSetting
 * 
 * @param RectColorOnCursor
 * @desc カーソルと重なった時に使用する色番号
 * @text フォーカス時色番号
 * @type color
 * @default 3
 * @parent RectFrameSetting
 * 
 * @param RectColorOnCursor2
 * @desc カーソルと重なった時に使用する色番号。(グラデーション表示用の2色目の色番号)
 * @text フォーカス時色番号2
 * @type color
 * @default 
 * @parent RectFrameSetting
 * 
 * @param RectColorOpacity
 * @desc 枠内塗潰し色の透明度 0 - 透明, 255 - 不透明
 * @text 透明度
 * @type number
 * @default 255
 * @parent RectFrameSetting
 * 
 * @param ImageFrameSetting
 * @text 画像設定
 * @default ------------------------------
 * @parent FrameSetting
 * 
 * @param ImageName
 * @desc 表示する枠の背景画像ファイル名を指定します。
 * @text 枠背景画像
 * @type file
 * @dir img/
 * @default 
 * @parent ImageFrameSetting
 * 
 * @param ImageWidth
 * @desc 枠画像の幅  注意：画像ファイルの幅ではありません
 * @text 枠画像幅
 * @default 
 * @parent ImageFrameSetting
 * 
 * @param ImageHeight
 * @desc 枠画像の高さ 注意：画像ファイルの高さではありません
 * @text 枠画像高さ
 * @default 
 * @parent ImageFrameSetting
 * 
 * @param EnabledChangeScale
 * @desc 枠画像とカーソルサイズが異なる時の自動サイズ調整機能
 * @text 枠画像サイズ調整
 * @type select
 * @option 無効
 * @value 0
 * @option 有効
 * @value 1
 * @default 1
 * @parent ImageFrameSetting
 * 
 * @param ImageOffsetX
 * @desc カーソル枠に対する枠画像のX方向のズレ
 * @text 画像X方向のズレ
 * @type number
 * @default 0
 * @parent ImageFrameSetting
 * 
 * @param ImageOffsetY
 * @desc カーソル枠に対する枠画像のY方向のズレ
 * @text 画像Y方向のズレ
 * @type number
 * @default 0
 * @parent ImageFrameSetting
 * 
 * @param ImageOffsetWidth
 * @desc カーソル枠に対する枠画像の幅の差
 * @text 画像幅の差
 * @type number
 * @default 0
 * @parent ImageFrameSetting
 * 
 * @param ImageOffsetHeight
 * @desc カーソル枠に対する枠画像の高さの差
 * @text 画像の高さの差
 * @type number
 * @default 0
 * @parent ImageFrameSetting
 * 
 * @param DefaultImageIndex
 * @desc 標準で表示する画像の番号
 * @text 標準画像番号
 * @type number
 * @default 0
 * @parent ImageFrameSetting
 * 
 * @param ImageIndexOnCursor
 * @desc カーソルと重なった時に表示する画像の番号
 * @text フォーカス時画像番号
 * @type number
 * @default 1
 * @parent ImageFrameSetting
 * 
 */


var Imported = Imported || {};
Imported.FTKR_SkillTreeSystem_MZ = true;

var FTKR = FTKR || {};
FTKR.STS = FTKR.STS || {};

function Window_TreeType() {
    this.initialize.apply(this, arguments);
};
  
function Window_SkillTree() {
    this.initialize.apply(this, arguments);
};
  
function Window_StsSkillStatus() {
    this.initialize.apply(this, arguments);
};
  
function Window_StsConfTitle() {
    this.initialize.apply(this, arguments);
};
  
function Window_StsConf() {
    this.initialize.apply(this, arguments);
};
  
function Window_StsCost() {
    this.initialize.apply(this, arguments);
};
  
function Window_StsPreskill() {
    this.initialize.apply(this, arguments);
};
  
function Window_StsActorStatus() {
    this.initialize.apply(this, arguments);
};

function Scene_STS() {
    this.initialize.apply(this, arguments);
};

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const parameters = PluginManager.parameters('FTKR_SkillTreeSystem_MZ');

    const pluginName = "FTKR_SkillTreeSystem_MZ";
    PluginManager.registerCommand(pluginName, 'STSOpen', args => {
        SceneManager.push(Scene_STS);
    });

    PluginManager.registerCommand(pluginName, 'STSADDSP', args => {
        const actor = Number(args.ActorId) > 0 ? $gameActors.actor(Number(args.ActorId)) : null;
        const value = Number(args.AddSP);
        if (actor) {
            actor.getSp(value);
        }
    });

    PluginManager.registerCommand(pluginName, 'STSGETSKILLCOUNT', args => {
        const actor = Number(args.ActorId) > 0 ? $gameActors.actor(Number(args.ActorId)) : null;
        const varId = Number(args.VarId) || 0;
        const skillId = Number(args.Skill) || 0;
        if (actor && varId > 0 && skill > 0) {
            const skill = actor.stsSkill(skillId);
            $gameVariables.setValue(varId, actor.stsCount(skill.id));
        }
    });

    PluginManager.registerCommand(pluginName, 'STSTREERESET', args => {
        const actor = Number(args.ActorId) > 0 ? $gameActors.actor(Number(args.ActorId)) : null;
        const treeId = Number(args.TreeType) || 0;
        if (!actor) return;
        if (treeId > 0) {
            actor.resetTree(1, treeId);
        } else {
            actor.resetAllTree(1);
        }
    });

    PluginManager.registerCommand(pluginName, 'STSCLEAR', args => {
        const actor = Number(args.ActorId) > 0 ? $gameActors.actor(Number(args.ActorId)) : null;
        const treeId = Number(args.TreeType) || 0;
        if (!actor) return;
        if (treeId > 0) {
            actor.resetTree(0, treeId);
        } else {
            actor.resetAllTree(0);
        }
    });

    PluginManager.registerCommand(pluginName, 'STSLEARNSKILL', args => {
        const actor = Number(args.ActorId) > 0 ? $gameActors.actor(Number(args.ActorId)) : null;
        const skillId = Number(args.Skill) || 0;
        if (!actor) return;
        if (skillId && actor.canStsLearnedSkill(skillId)) {
            actor.stsLearnSkill(skillId);
        }
    });

    PluginManager.registerCommand(pluginName, 'STSADDTREETYPE', args => {
        const actor = Number(args.ActorId) > 0 ? $gameActors.actor(Number(args.ActorId)) : null;
        const treeId = Number(args.TreeType) || 0;
        if (!actor) return;
        actor.reduceTreetype(treeId);
    });

    PluginManager.registerCommand(pluginName, 'STSREDUCETREETYPE', args => {
        const actor = Number(args.ActorId) > 0 ? $gameActors.actor(Number(args.ActorId)) : null;
        const treeId = Number(args.TreeType) || 0;
        if (!actor) return;
        actor.addTreetype(treeId);
    });

    FTKR.STS = {
        //必須設定
        skillTreeId       : params.SkillTreeId || 0,

        //基本設定
        showCommand       : params.ShowSkillCommand,
        commandName       : params.CommandName || 'スキル習得',
        menuSwitchId      : params.SkillMenuSwitchID || 0,
        enableConf        : params.EnableConfirmation,
        learnedActorVarID : params.LearnedActorVarID || 0,
        learnedSkillVarID : params.LearnedSkillVarID || 0,
        resetWhenForgottenSkill : params.ResetWhenForgottenSkill,

        //習得回数の設定
        enableSkillCount  : params.EnabledSkillCount,
        defaultMaxCount   : params.DefaultMaxCount || 0,
        skillLearnedIcon  : params.SkillLearnedIcon || 0
    };

    //スキルポイント関係
    FTKR.STS.sp = {
        dispName     : params.SPDisplayName || 'SP',
        defaultMaxSp : params.DefaultMaxSp || 0,
        defaultReq   : params.DefaultRequiredSP || '',
        getLevelUp   : params.GetLevelUpSp || '',
        icon         : params.CostSpIcon || 0,
        hideCost0    : params.HideSpCost0,
        format       : params.DisplayGetSp || '',
        enableClassSp: params.EnableClassSp || false,
        nonBattleSpRate: params.NonBattleMemberSpRate || 0,
    };

    //スキル枠
    FTKR.STS.sFrame = {
        type: params.SkillFrameType || 0,
        enabled: params.EnabledSkillFrame,
        width: params.SkillFrameWidth || 0,
        height: params.SkillFrameHeight || 0,
        whenToDisplay: params.WhenToDisplayFrame || 0,
        changeOnCursor: params.ChangeFrameOnCursor || 0,
        hideCursor: params.HideCursor || 0,
        icon:{
            offsetX: params.SkillIconOffsetX || 0,
            offsetY: params.SkillIconOffsetY || 0
        },
        text:{
            format: params.SkillNameFormat || '',
            offsetX: params.SkillTextOffsetX || 0,
            offsetY: params.SkillTextOffsetY || 0
        },
        color:{
            isLearned: params.FrameColorisLearned || 0,
            isLearnOk: params.FrameColorisLearnOK || 0,
            isReqSkillNg: params.FrameColorisReqSkillNG || 0,
            isReqNg: params.FrameColorisRequiredNG || 0
        },
        image:{
            name: params.ImageName,
            width     :params.ImageWidth || 0,
            height    :params.ImageHeight || 0,
            offsetX   :params.ImageOffsetX || 0,
            offsetY   :params.ImageOffsetY || 0,
            offsetW   :params.ImageOffsetWidth || 0,
            offsetH   :params.ImageOffsetHeight || 0,
            enabledScale:params.EnabledChangeScale || 0,
            defIndex  :params.DefaultImageIndex || 0,
            csrIndex  :params.ImageIndexOnCursor || 0,
        },
        line:{
            defColor  :params.DefaultLineColor || 0,
            csrColor  :params.LineColorOnCursor || 0,
            thick     :params.LineThick || 0,
            subColor  :params.SubLineColor || 0,
            subThick  :params.SubLineThick || 0,
        },
        //枠内塗りつぶしの設定
        fill:{
            defColor  :params.DefaultRectColor || 0,
            csrColor  :params.RectColorOnCursor || 0,
            defColor2 :params.DefaultRectColor2 || 0,
            csrColor2 :params.RectColorOnCursor2 || 0,
            opacity   :params.RectColorOpacity || 0,
        },

    
    };
    

    //スキルカウント枠
    FTKR.STS.cFrame = {
        type: params.CountFrameType || 0,
        defIndex: params.DefaultFrameImageIndex || 0,
        enabled: params.DrawCountFrame,
        width: params.CountFrameWidth || 0,
        height: params.CountFrameHeight || 0,
        thick: params.CountFrameThick || 0,
        offsetX: params.CountFrameOffsetX || 0,
        offsetY: params.CountFrameOffsetY || 0,
        format: params.CountFrameFormat || '',
        count:{
            offsetX: params.SkillCountOffsetX || 0,
            offsetY: params.SkillCountOffsetY || 0,
        },
    };

    //ツリーの設定
    FTKR.STS.drawStsLineType = params.DrawLineType || 0;
    FTKR.STS.treeLineThick = params.TreeLineThick || 0;
    FTKR.STS.addFrameToLine = params.AddFrameToLine || 0;
    FTKR.STS.lineColor = params.FitLineColorToFrame || 0;

    //アクターステータスウィンドウ設定
    FTKR.STS.actorStatus = {
        text1: params.ActorStatusText1 || '',
        text2: params.ActorStatusText2 || '',
        text3: params.ActorStatusText3 || '',
        space: params.ActorStatusSpace || '',
        spaceIn: params.ActorStatusSpaceInText || 0,
        widthRate: params.ActorStatusWidthRate || '',
    };
    //スキルステータスウィンドウ設定
    FTKR.STS.skillStatus = {
        titleFormat     : params.SkillStatusTitleFormat || '',
        adjustWidth     : params.AdjustSkillDescWidth || 0,
        //prioritizeDesc  :paramParse(parameters['Prioritize Skill Desc'] || false),
    };
    //ツリータイプウィンドウ設定
    FTKR.STS.treeTypes = {
        enabled: params.DisplayTreeTypeFrame || 0,
    };
    //コストウィンドウ設定
    FTKR.STS.cost = {
        titleFormat : params.CostTitleFormat || '',
        itemFormat  : params.CostItemFormat || '',
        numberFormat: params.CostNumberFormat || '',
        numberWidth : params.CostNumberWidth || 0,
        maxFormat   : params.CostMaxCountFormat || '',
    };
    //スキルツリーウィンドウ設定
    FTKR.STS.skillTree = {
        maxCols: params.SkillTreeMaxCols || 0,
        heightSpace: params.SkillTreeHeightSpace || 0,
    };
    //前提スキルウィンドウ設定
    FTKR.STS.preskill = {
        titleFormat: params.PreskillTitleFormat || '',
        itemFormat: params.PreskillItemFormat || '',
    };

    //確認ウィンドウ設定
    FTKR.STS.conf = {
      titleformat: params.ConfTitleFormat || '',
      okFormat: params.ConfirmationOkFormat || '',
      cancelFormat: params.ConfirmationCancelFormat || '',
    };

    //SE
    FTKR.STS.stsSe = {
      name: params.LearnSEName || 'Sound2',
      volume: params.LearnSEVolume || 0,
      pitch: params.LearnSEPitch || 100,
      pan: params.LearnSEPan || 0,
    };

    //コストアイコン
    FTKR.STS.icon = {
      gold: params.CostGoldIcon || 0,
      var: params.CostVariablesIcon || 0,
    };

    FTKR.STS.MAX_DEVSKILL_COUNT = 20;

    Game_Action.EFFECT_GET_SP = 999;
    Game_Action.EFFECT_RESET_TREE = 998;
    Game_Action.EFFECT_CLEAR_TREE = 997;

    //画像ファイル内に横に並べられる枠画像の数
    Window_Base.IMAGE_INDEX_COLS = 4;

    //枠画像の4隅の固定部分のサイズ(pixel)
    Window_Base.IMAGE_FIXED_SIZE = 6;

    function onSkillFrame() {
        return FTKR.STS.sFrame.type > 0;
    }

    const current = (function() {
        if (document.currentScript) {
            return document.currentScript.src;
        } else {
            const scripts = document.getElementsByTagName('script'),
            script = scripts[scripts.length-1];
            if (script.src) {
                return script.src;
            }
        }
    })();
    const filename = current ? current.substring(current.lastIndexOf('/')+1, current.length) : '';
    if (filename !== 'FTKR_SkillTreeSystem_MZ.js') {
        console.error('スキルツリープラグインのファイル名が間違っています。「FTKR_SkillTreeSystem_MZ.js」に直してください。');
        console.error('The file name of SkillTree-plugin is incorrect. Change to "FTKR_SkillTreeSystem_MZ.js".');
        return;
    }

    if (!FTKR.STS.skillTreeId) {
        console.error('プラグインパラメータ<SkillTreeId>を設定してください。');
        console.error('Set the plugin parameter <SkillTreeId>.');
        return;
    }
    
    //objのメモ欄から <metacode: x> の値を読み取って返す
    const readObjectMeta = function(obj, metacodes) {
        if (!obj) return false;
        let match = {};
        metacodes.some(function(metacode){
            const metaReg = new RegExp('<' + metacode + ':[ ]*(.+)>', 'i');
            match = metaReg.exec(obj.note);
            return match;
        }); 
        return match ? match[1] : '';
    };

    //引数の要素の中の重複部分を削除する。
    const duplicateDelete = function(list) {
        const newlist = list.filter( function(x, i, self) {
            return self.indexOf(x) === i;
        });
        return newlist;
    };



    FTKR.gameData = FTKR.gameData || {
        user   :null,
        target :null,
        item   :null,
        number :0,
    };

    if (!FTKR.setGameData) {
        FTKR.setGameData = function(user, target, item, number) {
            FTKR.gameData = {
                user   :user || null,
                target :target || null,
                item   :item || null,
                number :number || 0
            };
        };
    }

    if (!FTKR.evalFormula) {
        FTKR.evalFormula = function(formula, classObj) {
            const datas = FTKR.gameData;
            try {
                const s = $gameSwitches._data;
                const v = $gameVariables._data;
                const a = datas.user;
                const b = datas.target;
                const item   = datas.item;
                const number = datas.number;
                if (b) var result = b.result();
                let value = eval(formula);
                if (isNaN(value)) value = 0;
                return value;
            } catch (e) {
                console.error(e);
                return 0;
            }
        };
    }



    //座標(x1,y1)から座標(x2,y2)までの線を引く
    Bitmap.prototype.drawStsLine = function(x1, y1, x2, y2, color, thick) {
        const context = this._context;
        context.strokeStyle = color;
        context.lineWidth = thick;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.closePath();
        context.stroke();
        this._baseTexture.update();
    };

    //枠線を描く
    Bitmap.prototype.drawStsFrame = function(x, y, width, height, thick, color) {
        const context = this._context;
        context.strokeStyle = color;
        context.lineWidth = thick;
        context.strokeRect(x + thick/2, y + thick/2, width - thick, height - thick);
        this._baseTexture.update();
    };


    //枠線を描く
    Bitmap.prototype.drawDcfFrame = function(x, y, width, height, thick, color) {
        const context = this._context;
        context.strokeStyle = color;
        context.lineWidth = thick;
        context.strokeRect(x + thick/2, y + thick/2, width - thick, height - thick);
        this._baseTexture.update();
    };



    //重複した要素を除いて、Array配列にlist配列の要素を加える。
    Array.prototype.addExceptForDup = function(list) {
        list.forEach( function(item) {
            if (item === null || !this.contains(item)) this.push(item);
        },this);
    };




    /*--------------------------
    a,b 二つの値の大小を比較して、
    a > b なら +1
    a < b なら -1
    それ以外の結果なら 0 を返す
    --------------------------*/
    Math.code = function(a, b) {
        if (a > b) {
          return +1;
        } else if (a < b) {
          return -1;
        } else {
          return 0;
        }
    };



    const _STS_BattleManager_makeRewards = BattleManager.makeRewards;
    BattleManager.makeRewards = function() {
        _STS_BattleManager_makeRewards.call(this);
        this._rewards.stsSps = $gameTroop.stsSpTotal();
    };

    const _STS_BattleManager_gainRewards = BattleManager.gainRewards;
    BattleManager.gainRewards = function() {
        _STS_BattleManager_gainRewards.call(this);
        this.gainStsSp();
    };

    BattleManager.gainStsSp = function() {
        const sp = this._rewards.stsSps;
        $gameParty.allMembers().forEach(function(actor) {
            const rate = actor.isBattleMember() ? 100 : FTKR.STS.sp.nonBattleSpRate;
            const getSp = Math.floor(sp * rate / 100);
            actor.getSp(getSp);
        });
    };

    const _STS_BattleManager_displayRewards = BattleManager.displayRewards;
    BattleManager.displayRewards = function() {
        _STS_BattleManager_displayRewards.call(this);
        this.displayStsSp();
    };

    BattleManager.displayStsSp = function() {
        const sp = this._rewards.stsSps;
        if (sp > 0) {
            const text = FTKR.STS.sp.format.format(sp, FTKR.STS.sp.dispName);
            if (text) $gameMessage.add('\\.' + text);
        }
    };
    
    


    let _STS_DatabaseLoaded = false;
    const _STS_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!_STS_DataManager_isDatabaseLoaded.call(this)) return false;
        if (!_STS_DatabaseLoaded) {
            this.stsTreeListNotetags($dataActors);
            this.stsTreeListNotetags($dataClasses);
            this.stsItemGetSpNotetags($dataItems);
            this.stsTreeDataNotetags($dataWeapons);
            this.stsTreeDataNotetags($dataSkills);
            _STS_DatabaseLoaded = true;
        }
        return true;
    };

    DataManager.stsTreeListNotetags = function(group) {
        const note1a = /<(?:SET STS DATA)>/i;
        const note1b = /<\/(?:SET STS DATA)>/i;

        for (var n = 1; n < group.length; n++) {
            const obj = group[n];
            const notedata = obj.note.split(/[\r\n]+/);

            var setMode = 'none';
            obj.sts = {
                data:'',
                treeTypes:[],
                initsp:0,
                msp:0
            };
            for (let i = 0; i < notedata.length; i++) {
                const line = notedata[i];
                if (note1a.test(line)) {
                    var text = '';
                    setMode = 'data';
                } else if (note1b.test(line)) {
                    setMode = 'none';
                    obj.sts.data = text;
                } else if (setMode === 'data') {
                    text += line + ';';
                }
            }
            this.setStsActorData(obj);
        }
    };

    DataManager.setStsActorData = function(obj) {
        const stsdata = obj.sts.data;
        if (stsdata) {
            const case1 = /(?:INIT SP):[ ]*(\d+)/i;
            const case1j = /初期 SP:[ ]*(\d+)/i;
            const case2 = /(?:TREETYPE):[ ]*(\d+(?:\s*,\s*\d+)*)/i;
            const case2j = /ツリータイプ:[ ]*(\d+(?:\s*,\s*\d+)*)/i;
            const case3 = /(?:MAX SP):[ ]*(\d+)/i;
            const case3j = /最大 SP:[ ]*(\d+)/i;

            const datas = stsdata.split(';');
            for (let i = 0; i < datas.length; i++) {
                const data = datas[i];
                if(data.match(case1) || data.match(case1j)) {
                    obj.sts.initsp = Number(RegExp.$1);
                } else if(data.match(case2) || data.match(case2j)) {
                    const tTypeIds = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
                    tTypeIds.forEach( function(tTypeId) {
                        const item = $dataWeapons[tTypeId];
                        if (item && item.wtypeId === FTKR.STS.skillTreeId) {
                            obj.sts.treeTypes.push(tTypeId);
                        }
                    });
                } else if(data.match(case3) || data.match(case3j)) {
                    obj.sts.msp = Number(RegExp.$1);
                }
            }
            obj.sts.data = '';
        }
    };

    DataManager.stsItemGetSpNotetags = function(group) {
        const note1 = /<(?:STS GET SP):[ ]*(\d+)>/i;
        const note1j = /<STS SP 入手:[ ]*(\d+)>/i;
        const note2 = /<(?:STS RESET TREE)>/i;
        const note2j = /<STS 全スキルツリー リセット>/i;
        const note3 = /<(?:STS CLEAR TREE)>/i;
        const note3j = /<STS 全スキルツリー 初期化>/i;

        for (let n = 1; n < group.length; n++) {
            const obj = group[n];
            const notedata = obj.note.split(/[\r\n]+/);

            for (let i = 0; i < notedata.length; i++) {
                const line = notedata[i];
                if (line.match(note1) || note1j.test(line)) {
                    obj.effects.push(this.setEffect(Game_Action.EFFECT_GET_SP, 0, Number(RegExp.$1), 0));
                } else if (note2.test(line) || note2j.test(line)) {
                    obj.effects.push(this.setEffect(Game_Action.EFFECT_RESET_TREE, 0, 0, 0));
                } else if (note3.test(line) || note3j.test(line)) {
                    obj.effects.push(this.setEffect(Game_Action.EFFECT_CLEAR_TREE, 0, 0, 0));
                }
            }
        }
    };

    DataManager.setEffect = function(code, value1, value2, dataId) {
        return {code:code, value1:value1, value2:value2, dataId:dataId};
    };

    DataManager.stsTreeDataNotetags = function(group) {
        const note1a = /<(?:SET STS DATA)>/i;
        const note1b = /<\/(?:SET STS DATA)>/i;
        const note2a = /<(?:STS DESC)>/i;
        const note2b = /<\/(?:STS DESC)>/i;

        for (let n = 1; n < group.length; n++) {
            const obj = group[n];
            const notedata = obj.note.split(/[\r\n]+/);

            let setMode = 'none';
            obj.sts = {
                skillIds:[],
                tree:[{},],
                subtree:[],
                data:'',
                required:'',
                costs:[],
                maxCount:FTKR.STS.defaultMaxCount,
                pIndex:0,
                pCIndex:0,
                show:'',
                position:0,
                diffX:0,
                desc:'',
                forgetSkillIds:[],
            };
            obj.sts.costs.push(this.setCost('sp', 0, FTKR.STS.sp.defaultReq));

            for (let i = 0; i < notedata.length; i++) {
                const line = notedata[i];
                if (note1a.test(line)) {
                    var text = '';
                    setMode = 'data';
                } else if (note1b.test(line)) {
                    setMode = 'none';
                    obj.sts.data = text;
                } else if (note2a.test(line)) {
                    var text = '';
                    setMode = 'desc';
                } else if (note2b.test(line)) {
                    setMode = 'none';
                    obj.sts.desc = text;
                } else if (setMode === 'data') {
                    text += line + ';';
                  } else if (setMode === 'desc') {
                    text += line + '\n';
                }
            }
            this.setStsData(obj);
        }
    };

    DataManager.setCost = function(type, id, value) {
        return {type:type, id:Number(id), value:value};
    };

    DataManager.setStsData = function(obj) {
        const stsdata = obj.sts.data;
        if (stsdata) {
            const case1 = /(?:REQUIRED):[ ]*(.+)/i;
            const case1j = /習得条件:[ ]*(.+)/i;
            const case2 = /(?:COST SP):[ ]*(.+)/i;
            const case2j = /コスト SP:[ ]*(.+)/i;
            const case2a = /(?:FORGET_SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)/i;
            const case2aj = /削除スキル:[ ]*(\d+(?:\s*,\s*\d+)*)/i;
            const case2b = /LEARN_SKILL[ ]*(\d+)[ ]*:[ ]*(\d+)[ ]*(.*)/i;
            const case2bj = /習得スキル[ ]*(\d+)[ ]*:[ ]*(\d+)[ ]*(.*)/i;
            const case3a = /(?:TREE)[ ](\d+)[ ](?:SKILL):[ ]*(\d+(?:\s*,\s*\d+)*)/i;
            const case3aj = /ツリータイプ (\d+) スキル:[ ]*(\d+(?:\s*,\s*\d+)*)/i;
            const case3b = /(?:SKILL):[ ]*(\d+(?:\s*,\s*\d+)*)/i;
            const case3bj = /スキル:[ ]*(\d+(?:\s*,\s*\d+)*)/i;
            const case3c = /(?:SKILL)[ ](\d+):[ ]*(\d+(?:\s*,\s*\d+)*)/i;
            const case3cj = /スキル[ ](\d+):[ ]*(\d+(?:\s*,\s*\d+)*)/i;
            const case4 = /(?:COST ITEM\[)(\d+)\]:[ ]*(.+)/i;
            const case4j = /コスト アイテム\[(\d+)\]:[ ]*(.+)/i;
            const case4a = /(?:COST WEAPON\[)(\d+)\]:[ ]*(.+)/i;
            const case4aj = /コスト 武器\[(\d+)\]:[ ]*(.+)/i;
            const case4b = /(?:COST ARMOR\[)(\d+)\]:[ ]*(.+)/i;
            const case4bj = /コスト 防具\[(\d+)\]:[ ]*(.+)/i;
            const case5 = /(?:COST V\[)(\d+)\]:[ ]*(.+)/i;
            const case5j = /コスト V\[(\d+)\]:[ ]*(.+)/i;
            const case6 = /(?:COST GOLD):[ ]*(.+)/i;
            const case6j = /コスト 金:[ ]*(.+)/i;
            const case7 = /(?:MAX COUNT):[ ]*(\d+)/i;
            const case7j = /最大習得回数:[ ]*(\d+)/i;
            const case8 = /(?:Image INDEX):[ ]*(\d+)/i;
            const case8j = /枠画像番号:[ ]*(\d+)/i;
            const case9 = /(?:Image INDEX ON CURSOR):[ ]*(\d+)/i;
            const case9j = /カーソル枠画像番号:[ ]*(\d+)/i;
            const case10 = /(?:SHOW):[ ]*(.+)/i;
            const case10j = /表示条件:[ ]*(.+)/i;
            const case11 = /(?:POSITION):[ ]*(\d+(?:\s*,\s*\d+)*)/i;
            const case11j = /表示位置:[ ]*(\d+(?:\s*,\s*\d+)*)/i;

            const datas = stsdata.split(';');
            for (let i = 0; i < datas.length; i++) {
                const data = datas[i];
                if (data.match(case1) || data.match(case1j)) {
                    obj.sts.required = String(RegExp.$1);
                } else if(data.match(case2) || data.match(case2j)) {
                    obj.sts.costs[0].value = String(RegExp.$1);
                } else if (data.match(case2a) || data.match(case2aj)) {
                    obj.sts.forgetSkillIds = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
                } else if (data.match(case2b) || data.match(case2bj)) {
                    if (!obj.sts.learnSkillIds) obj.sts.learnSkillIds = [];
                    var count = Number(RegExp.$1);
                    var skillId1 = Number(RegExp.$2);
                    var forget = RegExp.$3;
                    var skillId2 = forget && forget.match(/-d[ ]*(\d+)/i) ? Number(RegExp.$1) : 0;
                    obj.sts.learnSkillIds[count] = {learn:skillId1,forget:skillId2};
                } else if(data.match(case3a) || data.match(case3aj)) {
                    var treeId = RegExp.$1;
                    var tree = this.readTree(obj, RegExp.$1, RegExp.$2);
                    tree.treeId === 0 ? obj.sts.tree[0] = tree : obj.sts.tree.push(tree);
                } else if(data.match(case3b) || data.match(case3bj)) {
                    var tree = this.readTree(obj, 0, RegExp.$1);
                    obj.sts.tree[0] = tree;
                    obj.sts.skillIds = tree.skillIds;
                } else if(data.match(case3c) || data.match(case3cj)) {
                    var line = Number(RegExp.$1);
                    var tree = this.readTree(obj, 0, RegExp.$2);
                    obj.sts.subtree[line] = tree.skillIds;
                } else if(data.match(case4) || data.match(case4j)) {
                    obj.sts.costs.push(this.setCost('item', RegExp.$1, RegExp.$2));
                } else if(data.match(case4a) || data.match(case4aj)) {
                    obj.sts.costs.push(this.setCost('weapon', RegExp.$1, RegExp.$2));
                } else if(data.match(case4b) || data.match(case4bj)) {
                    obj.sts.costs.push(this.setCost('armor', RegExp.$1, RegExp.$2));
                } else if(data.match(case5) || data.match(case5j)) {
                    obj.sts.costs.push(this.setCost('var', RegExp.$1, RegExp.$2));
                } else if(data.match(case6) || data.match(case6j)) {
                    obj.sts.costs.push(this.setCost('gold', 0, RegExp.$1));
                } else if(data.match(case7) || data.match(case7j)) {
                    obj.sts.maxCount = Number(RegExp.$1);
                } else if(data.match(case8) || data.match(case8j)) {
                    obj.sts.pIndex = Number(RegExp.$1);
                } else if(data.match(case9) || data.match(case9j)) {
                    obj.sts.pCIndex = Number(RegExp.$1);
                } else if (data.match(case10) || data.match(case10j)) {
                    obj.sts.show = String(RegExp.$1);
                } else if (data.match(case11) || data.match(case11j)) {
                    var posis = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
                    obj.sts.position = Number(posis[0]);
                    if (posis[1]) obj.sts.diffX = Number(posis[1]);
                }
            }
            obj.sts.data = '';
        }
    };

    DataManager.readTree = function(obj, treeId, regexp) {
        const tree = {
          treeId:Number(treeId),
          skillIds:[]
        };
        const objIds = JSON.parse('[' + regexp.match(/\d+/g) + ']');
        objIds.forEach( function(objId) {
            const item = $dataSkills[objId];
            if (!item || (obj.hasOwnProperty('stypeId') && obj.id === objId)) {
              tree.skillIds.push(null);
            } else {
              tree.skillIds.push(objId);
            }
        });
        return tree;
    };

    const _DCF_DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function(name, src) {
        _DCF_DataManager_loadDatabase.call(this, name, src);
        ImageManager.nuun_LoadPictures(FTKR.STS.sFrame.image.name);
    };
    





    const _STS_Game_Actor_initMembers = Game_Actor.prototype.initMembers;
    Game_Actor.prototype.initMembers = function() {
        _STS_Game_Actor_initMembers.call(this);
        this._stsSp = 0;
        this.checkInitSts();
    };

    Game_Actor.prototype.checkInitSts = function() {
        if (!this._stsCsp) this._stsCsp = [];
        if (!this._stsLearnSkills) this._stsLearnSkills = [];
        if (!this._stsTrees) this._stsTrees = [];
        if (!this._stsCount) this._stsCount = [];
        if (!this._stsUsedSp) this._stsUsedSp = [];
        if (!this._stsUsedCsp) this._stsUsedCsp = [];
        if (!this._stsUsedItem) this._stsUsedItem = [];
        if (!this._stsUsedWeapon) this._stsUsedWeapon = [];
        if (!this._stsUsedArmor) this._stsUsedArmor = [];
        if (!this._stsUsedVar) this._stsUsedVar = [];
        if (!this._stsUsedGold) this._stsUsedGold = [];
    };

    const _STS_Game_Actor_setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function(actorId) {
        _STS_Game_Actor_setup.call(this, actorId);
        if (FTKR.STS.sp.enableClassSp) {
            $dataClasses.forEach( function(dataClass){
                if (dataClass) this.setCsp(dataClass.id, dataClass.sts.initsp);
            },this);
        } else {
            this.setAsp(this.actor().sts.initsp);
        }
    };

    const _STS_Game_Actor_initSkills = Game_Actor.prototype.initSkills;
    Game_Actor.prototype.initSkills = function() {
        this._initStsFlag = true;
        _STS_Game_Actor_initSkills.call(this);
        this._initStsFlag = false;
    };

    const _STS_Game_Actor_levelUp = Game_Actor.prototype.levelUp;
    Game_Actor.prototype.levelUp = function() {
        _STS_Game_Actor_levelUp.call(this);
        FTKR.setGameData(this, null, null);
        this.getSp(this.evalStsFormula(FTKR.STS.sp.getLevelUp, 0, 0));
    };

    Game_Actor.prototype.learnCountSkill = function(skillId) {
        if (!this.isLearnedSkill(skillId)) {
            this._skills.push(skillId);
            this._skills.sort(function(a, b) {
                return a - b;
            });
        }
    };
    
    Game_Actor.prototype.forgetCountSkill = function(skillId) {
        const index = this._skills.indexOf(skillId);
        if (index >= 0) {
            this._skills.splice(index, 1);
        }
    };
    
    const _STS_Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
    Game_Actor.prototype.learnSkill = function(skillId) {
        if (!this.isStsLearnedSkill(skillId)) {
            this.setStsSkillCount(skillId, 0);
        }
        _STS_Game_Actor_learnSkill.call(this, skillId);
        this.checkInitSts();
        if (this.isLearnedSkill(skillId) && !this.stsCount(skillId)) {
            if (FTKR.STS.learnedActorVarID) $gameVariables.setValue(FTKR.STS.learnedActorVarID, this.actorId());
            if (FTKR.STS.learnedSkillVarID) $gameVariables.setValue(FTKR.STS.learnedSkillVarID, skillId);
            this.stsCountUp(skillId);
            this._stsLearnSkills[skillId] = true;
            this.checkStsForgetSkills(skillId);
        }
        if (this.stsSkill(skillId).sts.learnSkillIds) {
            var count = this.stsCount(skillId);
            var countSkillId = this.stsSkill(skillId).sts.learnSkillIds[count].learn;
            var forgetSkillId = this.stsSkill(skillId).sts.learnSkillIds[count].forget;
            if (countSkillId) {
                this.learnCountSkill(countSkillId);
            }
            if (forgetSkillId) {
                this.forgetCountSkill(forgetSkillId);
            }
        }
       if (this._initStsFlag) {
            this.stsUsedCost(skillId);
        }
    };

    Game_Actor.prototype.checkStsForgetSkills = function(skillId) {
        const skillIds = this.stsSkill(skillId).sts.forgetSkillIds;
        if (!skillIds || !skillIds.length) return;
        skillIds.forEach( function(id){
            if (!id) return;
            const sid = Number(id);
            if (FTKR.STS.enableSkillCount) {
                const skill = this.stsSkill(sid);
                this.setStsSkillCount(sid, skill.sts.maxCount);
            }
            _STS_Game_Actor_forgetSkill.call(this, sid);
        },this);
    };

    const _STS_Game_Actor_forgetSkill = Game_Actor.prototype.forgetSkill;
    Game_Actor.prototype.forgetSkill = function(skillId) {
        if (FTKR.STS.resetWhenForgottenSkill) {
            this.checkInitSts();
            this.resetStsSkill(skillId);
        }
        if (this.stsSkill(skillId).sts.learnSkillIds) {
            this.stsSkill(skillId).sts.learnSkillIds.forEach(function(forgetSkillId){
                if (forgetSkillId && forgetSkillId.learn) {
                    this.forgetCountSkill(forgetSkillId.learn);
                }
            },this);
        }
        _STS_Game_Actor_forgetSkill.call(this, skillId);
    };

    Game_Actor.prototype.resetStsSkill = function(skillId) {
        this.setStsSkillCount(skillId, 0);
        this._stsLearnSkills[skillId] = false;
    };

    Game_Actor.prototype.stsCount = function(skillId) {
        if (!this._stsCount) this._stsCount = [];
        return this._stsCount[skillId] || 0;
    };

    Game_Actor.prototype.isStsMaxCount = function(skillId) {
        return this.stsSkill(skillId) && this.stsCount(skillId) >= this.stsSkill(skillId).sts.maxCount;
    };

    Game_Actor.prototype.setStsSkillCount = function(skillId, value) {
        if (!this._stsCount) this._stsCount = [];
        this._stsCount[skillId] = value;
    };

    Game_Actor.prototype.stsCountUp = function(skillId) {
        if (FTKR.STS.enableSkillCount) {
            this.setStsSkillCount(skillId, this.stsCount(skillId) + 1);
        } else {
            this.setStsSkillCount(skillId, 1);
        }
    };

    Game_Actor.prototype.stsUsedCost = function(skillId) {
        const skill = this.stsSkill(skillId);
        FTKR.setGameData(this, null, skill);
        skill.sts.costs.forEach( function(cost){
            const value = this.evalStsFormula(cost.value,0,0);
            switch (cost.type) {
                case 'item':
                  this.addStsUsedItem(skill.id, cost.id, value);
                  break;
                case 'var':
                  this.addStsUsedVar(skill.id, cost.id, value);
                  break;
                case 'gold':
                  this.addStsUsedGold(skill.id, value);
                  break;
                case 'weapon':
                  this.addStsUsedWeapon(skill.id, cost.id, value);
                  break;
                case 'armor':
                  this.addStsUsedArmor(skill.id, cost.id, value);
                  break;
                case 'sp':
                  this.addStsUsedSp(skill.id, value);
                  break;
            }
        },this);
    };
    
    Game_Actor.prototype.setStsUsedCsp = function(classId, skillId, value) {
        if (!this._stsUsedCsp) this._stsUsedCsp = [];
        if (!this._stsUsedCsp[classId]) this._stsUsedCsp[classId] = [];
        this._stsUsedCsp[classId][skillId] = value;
    };

    Game_Actor.prototype.setStsUsedSp = function(skillId, value) {
        if (FTKR.STS.sp.enableClassSp) {
            this.setStsUsedCsp(this._classId, skillId, value);
        } else {
            if (!this._stsUsedSp) this._stsUsedSp = [];
            this._stsUsedSp[skillId] = value;
        }
    };

    Game_Actor.prototype.stsUsedCsp = function(classId, skillId) {
        if (!this._stsUsedCsp) this._stsUsedCsp = [];
        if (!this._stsUsedCsp[classId]) this._stsUsedCsp[classId] = [];
        return this._stsUsedCsp[classId][skillId] || 0;
    };

    Game_Actor.prototype.stsUsedSp = function(skillId) {
        if (FTKR.STS.sp.enableClassSp) {
            return this.stsUsedCsp(this._classId, skillId);
        } else {
            if (!this._stsUsedSp) this._stsUsedSp = [];
            return this._stsUsedSp[skillId] || 0;
        }
    };

    Game_Actor.prototype.addStsUsedCsp = function(classId, skillId, value) {
        this.setStsUsedCsp(classId, skillId, this.stsUsedCsp(classId, skillId) + value);
    };

    Game_Actor.prototype.addStsUsedSp = function(skillId, value) {
        this.setStsUsedSp(skillId, this.stsUsedSp(skillId) + value);
    };

    Game_Actor.prototype.setStsUsedGold = function(skillId, value) {
        if (!this._stsUsedGold) this._stsUsedGold = [];
        this._stsUsedGold[skillId] = value;
    };

    Game_Actor.prototype.stsUsedGold = function(skillId) {
        if (!this._stsUsedGold) this._stsUsedGold = [];
        return this._stsUsedGold[skillId] || 0;
    };

    Game_Actor.prototype.addStsUsedGold = function(skillId, value) {
        this.setStsUsedGold(skillId, this.stsUsedGold(skillId) + value);
    };

    Game_Actor.prototype.initStsUsedItem = function(skillId, itemId) {
        if (!this._stsUsedItem) this._stsUsedItem = [];
        if (skillId && !this._stsUsedItem[skillId]) this._stsUsedItem[skillId] = [];
        if (itemId && !this._stsUsedItem[skillId][itemId]) this._stsUsedItem[skillId][itemId] = 0;
    };

    Game_Actor.prototype.setStsUsedItem = function(skillId, itemId, value) {
        this.initStsUsedItem(skillId);
        this._stsUsedItem[skillId][itemId] = value;
    };

    Game_Actor.prototype.stsUsedItems = function(skillId) {
        this.initStsUsedItem(skillId);
        return this._stsUsedItem[skillId];
    };

    Game_Actor.prototype.addStsUsedItem = function(skillId, itemId, value) {
        this.initStsUsedItem(skillId, itemId);
        this.setStsUsedItem(skillId, itemId, this.stsUsedItems(skillId)[itemId] + value);
    };

    Game_Actor.prototype.initStsUsedWeapon = function(skillId, itemId) {
        if (!this._stsUsedWeapon) this._stsUsedWeapon = [];
        if (skillId && !this._stsUsedWeapon[skillId]) this._stsUsedWeapon[skillId] = [];
        if (itemId && !this._stsUsedWeapon[skillId][itemId]) this._stsUsedWeapon[skillId][itemId] = 0;
    };

    Game_Actor.prototype.setStsUsedWeapon = function(skillId, itemId, value) {
        this.initStsUsedWeapon(skillId);
        this._stsUsedWeapon[skillId][itemId] = value;
    };

    Game_Actor.prototype.stsUsedWeapons = function(skillId) {
        this.initStsUsedWeapon(skillId);
        return this._stsUsedWeapon[skillId];
    };

    Game_Actor.prototype.addStsUsedWeapon = function(skillId, itemId, value) {
        this.initStsUsedWeapon(skillId, itemId);
        this.setStsUsedWeapon(skillId, itemId, this.stsUsedWeapons(skillId)[itemId] + value);
    };

    Game_Actor.prototype.initStsUsedArmor = function(skillId, itemId) {
        if (!this._stsUsedArmor) this._stsUsedArmor = [];
        if (skillId && !this._stsUsedArmor[skillId]) this._stsUsedArmor[skillId] = [];
        if (itemId && !this._stsUsedArmor[skillId][itemId]) this._stsUsedArmor[skillId][itemId] = 0;
    };

    Game_Actor.prototype.setStsUsedArmor = function(skillId, itemId, value) {
        this.initStsUsedArmor(skillId);
        this._stsUsedArmor[skillId][itemId] = value;
    };

    Game_Actor.prototype.stsUsedArmors = function(skillId) {
        this.initStsUsedArmor(skillId);
        return this._stsUsedArmor[skillId];
    };

    Game_Actor.prototype.addStsUsedArmor = function(skillId, itemId, value) {
        this.initStsUsedArmor(skillId, itemId);
        this.setStsUsedArmor(skillId, itemId, this.stsUsedArmors(skillId)[itemId] + value);
    };

    Game_Actor.prototype.initStsUsedVar = function(skillId, varId) {
        if (!this._stsUsedVar) this._stsUsedVar = [];
        if (skillId && !this._stsUsedVar[skillId]) this._stsUsedVar[skillId] = [];
        if (varId && !this._stsUsedVar[skillId][varId]) this._stsUsedVar[skillId][varId] = 0;
    };

    Game_Actor.prototype.setStsUsedVar = function(skillId, varId, value) {
        this.initStsUsedVar(skillId);
        this._stsUsedVar[skillId][varId] = value;
    };

    Game_Actor.prototype.stsUsedVars = function(skillId) {
        this.initStsUsedVar(skillId);
        return this._stsUsedVar[skillId];
    };

    Game_Actor.prototype.addStsUsedVar = function(skillId, varId, value) {
        this.initStsUsedVar(skillId, varId);
        this.setStsUsedVar(skillId, varId, this.stsUsedVars(skillId)[varId] + value);
    };

    Game_Actor.prototype.evalStsFormula = function(formula, result1, result2) {
        if (!formula) return result1;
        var result = FTKR.evalFormula(formula);
        return Math.max(Math.floor(result), result2);
    };

    Game_Actor.prototype.payLearnedCost = function(skillId) {
        var skill = this.stsSkill(skillId);
        FTKR.setGameData(this, null, skill);
        this.payLearnedAnyCost(skill.sts.costs);
    };

    Game_Actor.prototype.payLearnedAnyCost = function(costs) {
        costs.forEach( function(cost){
            return this.payStsCost(cost);
        },this);
    };

    Game_Actor.prototype.payStsCost = function(cost) {
        const value = this.evalStsFormula(cost.value,0,0);
        switch (cost.type) {
            case 'item':
              this.addStsUsedItem(FTKR.gameData.item.id, cost.id, value);
              return $gameParty.loseItem($dataItems[cost.id], value);
            case 'var':
              this.addStsUsedVar(FTKR.gameData.item.id, cost.id, value);
              return $gameVariables.setValue(cost.id, $gameVariables.value(cost.id) - value);
            case 'gold':
              this.addStsUsedGold(FTKR.gameData.item.id, value);
              return $gameParty.loseGold(value);
            case 'weapon':
              this.addStsUsedWeapon(FTKR.gameData.item.id, cost.id, value);
              return $gameParty.loseItem($dataWeapons[cost.id], value);
            case 'armor':
              this.addStsUsedArmor(FTKR.gameData.item.id, cost.id, value);
              return $gameParty.loseItem($dataArmors[cost.id], value);
            case 'sp':
              this.addStsUsedSp(FTKR.gameData.item.id, value);
              return this.loseSp(value);
        }
    };

    Game_Actor.prototype.isPayCostNg = function(cost) {
        const value = this.evalStsFormula(cost.value, 0, 0);
        switch (cost.type) {
          case 'item':
            return $gameParty.numItems($dataItems[cost.id]) < value;
          case 'var':
            return $gameVariables.value(cost.id) < value;
          case 'gold':
            return $gameParty.gold() < value;
          case 'weapon':
            return $gameParty.numItems($dataWeapons[cost.id]) < value;
          case 'armor':
            return $gameParty.numItems($dataArmors[cost.id]) < value;
          case 'sp':
            return this.stsSp() < value;
        }
    };

    Game_Actor.prototype.getCsp = function(classId, value) {
        if(isNaN(value)) value = 0;
        if(isNaN(this._stsCsp[classId])) this._stsCsp[classId] = 0;
        this._stsCsp[classId] = Math.max(this._stsCsp[classId] + Number(value), 0);
        if ( this.maxCsp(classId)) {
            this._stsCsp[classId] = Math.min(this._stsCsp[classId], this.maxCsp(classId));
        }
    };

    Game_Actor.prototype.maxCsp = function(classId) {
        return $dataClasses[classId].sts.msp || FTKR.STS.sp.defaultMaxSp;
    };

    Game_Actor.prototype.getAsp = function(value) {
        if(isNaN(value)) value = 0;
        if(isNaN(this._stsSp)) this._stsSp = 0;
        this._stsSp = Math.max(this._stsSp + Number(value), 0);
        if (this.maxAsp()) {
            this._stsSp = Math.min(this._stsSp, this.maxAsp());
        }
    };

    Game_Actor.prototype.maxAsp = function() {
        return Math.max(this.actor().sts.msp, $dataClasses[this._classId].sts.msp) || FTKR.STS.sp.defaultMaxSp;
    };

    Game_Actor.prototype.getSp = function(value) {
        if (FTKR.STS.sp.enableClassSp) {
            this.getCsp(this._classId, value);
        } else {
            this.getAsp(value);
        }
    };

    Game_Actor.prototype.loseCsp = function(classId, value) {
        this.getCsp(classId, -value);
    };

    Game_Actor.prototype.loseSp = function(value) {
        this.getSp(-value);
    };

    Game_Actor.prototype.setCsp = function(classId, value) {
        if(isNaN(value)) value = 0;
        this._stsCsp[classId] = Math.max(Number(value), 0);
        if ( this.maxCsp(classId)) {
            this._stsCsp[classId] = Math.min(this._stsCsp[classId], this.maxCsp(classId));
        }
    };

    Game_Actor.prototype.setAsp = function(value) {
        if(isNaN(value)) value = 0;
        this._stsSp = Math.max(Number(value), 0);
        if (this.maxAsp()) {
            this._stsSp = Math.min(this._stsSp, this.maxAsp());
        }
    };

    const _Game_Actor_refresh = Game_Actor.prototype.refresh;
    Game_Actor.prototype.refresh = function() {
        _Game_Actor_refresh.call(this);
        if (FTKR.STS.sp.enableClassSp) {
            const classId = this._classId;
            if (this.maxCsp(classId)) {
                this._stsCsp[classId] = Math.min(this._stsCsp[classId], this.maxCsp(classId));
            }
        } else {
            if (this.maxAsp()) {
                this._stsSp = Math.min(this._stsSp, this.maxAsp());
            }
        }
    };

    Game_Actor.prototype.stsCsp = function(classId) {
        return this._stsCsp[classId] || 0;
    };

    Game_Actor.prototype.stsAsp = function() {
        return this._stsSp || 0;
    };

    Game_Actor.prototype.stsSp = function() {
        return FTKR.STS.sp.enableClassSp ? this.stsCsp(this._classId) : this.stsAsp();
    };

    Game_Actor.prototype.isStsLearnedSkill = function(skillId) {
        return this._stsLearnSkills[skillId];
    };

    Game_Actor.prototype.canStsLearnedSkill = function(skillId) {
        if (!$dataSkills[skillId]) return false;
        const reqSkillOk = this.getTreeTypes().filter( function(tTypeId) {
            return this.isReqSkillOk(skillId, tTypeId);
        },this).length;
        return reqSkillOk && this.isReqParamOk(skillId) && this.isPayCostOk(skillId) && this.isStsLearnedOk(skillId);
    };

    Game_Actor.prototype.isStsLearnedOk = function(skillId) {
      if (FTKR.STS.enableSkillCount) {
        const skill = this.stsSkill(skillId);
        return this.stsCount(skillId) < skill.sts.maxCount;
      } else {
        return !this.isStsLearnedSkill(skillId);
      }
    };

    Game_Actor.prototype.isPayCostOk = function(skillId) {
        const skill = this.stsSkill(skillId);
        FTKR.setGameData(this, null, skill);
        const costs = skill.sts.costs;
        if (!costs.length) return true;
        return !costs.filter( function(cost) {
            return this.isPayCostNg(cost);
        },this).length;
    };

    Game_Actor.prototype.isReqParamOk = function(skillId) {
        const skill = this.stsSkill(skillId);
        FTKR.setGameData(this, null, skill);
        return this.evalStsFormula(skill.sts.required, true, false);
    };

    Game_Actor.prototype.stsLearnSkill = function(skillId) {
        this.payLearnedCost(skillId);
        this.stsCountUp(skillId);
        this.learnSkill(skillId);
    };

    Game_Actor.prototype.stsSkill = function(skillId) {
      return Imported.FTKR_SEP ? this.getSkill(skillId) : $dataSkills[skillId];
    };

    Game_Actor.prototype.getTreeTypes = function() {
        const tTypes = this.actor().sts.treeTypes.concat(this.currentClass().sts.treeTypes, this._stsTrees);
      return !tTypes.length ? [] : duplicateDelete(tTypes);
    };

    Game_Actor.prototype.addTreetype = function(treeTypeId) {
        if (!this._stsTrees.contains(treeTypeId)) this._stsTrees.push(treeTypeId);
    };

    Game_Actor.prototype.reduceTreetype = function(treeTypeId) {
        const index = this._stsTrees.indexOf(treeTypeId);
        if (index > -1) this._stsTrees.splice(index, 1);
    };

    /*-------------------------------------------------------------
      スキルツリーのリセット処理
      flag : 1 - 消費したコストが戻る, 0 - 消費したコストは戻らない
    -------------------------------------------------------------*/
    Game_Actor.prototype.resetAllTree = function(flag) {
        this.getTreeTypes().forEach( function(tType) {
            this.resetTree(flag, tType);
        },this);
    };

    Game_Actor.prototype.resetTree = function(flag, treeType) {
        const totalSp = 0;
        const skillTree = this.getTreeDatas(treeType);
        if (!skillTree.length) return 0;
        skillTree.forEach( function(skill) {
            if (!skill) return;
            if (FTKR.STS.sp.enableClassSp) {
                $dataClasses.forEach( function(dataClass, i){
                    if (!dataClass) return;
                    if (flag) this.getCsp(i, this.stsUsedCsp(i, skill.id));
                    this.setStsUsedCsp(i, skill.id, 0);
                },this);
            } else {
                if (flag) this.getSp(this.stsUsedSp(skill.id));
                this.setStsUsedSp(skill.id, 0);
            }
            if (flag) $gameParty.gainGold(this.stsUsedGold(skill.id));
            this.setStsUsedGold(skill.id, 0);
            this.stsUsedItems(skill.id).forEach( function(itemNum, i){
                if (!itemNum) return;
                if (flag)$gameParty.gainItem($dataItems[i], itemNum);
                this.setStsUsedItem(skill.id, i, 0);
            },this);
            this.stsUsedWeapons(skill.id).forEach( function(itemNum, i){
                if (!itemNum) return;
                if (flag)$gameParty.gainItem($dataWeapons[i], itemNum);
                this.setStsUsedWeapon(skill.id, i, 0);
            },this);
            this.stsUsedArmors(skill.id).forEach( function(itemNum, i){
                if (!itemNum) return;
                if (flag)$gameParty.gainItem($dataArmors[i], itemNum);
                this.setStsUsedArmor(skill.id, i, 0);
            },this);
            this.stsUsedVars(skill.id).forEach( function(itemNum, i){
                if (!itemNum) return;
                if (flag)$gameVariables.setValue(i, itemNum + $gameVariables.value(i));
                this.setStsUsedVar(skill.id, i, 0);
            },this);
            this.forgetSkill(skill.id);
            this.resetStsSkill(skill.id);
        },this);
    };

    //-------------------------------------------------------------

    Game_Actor.prototype.getTreeDatas = function(treeType) {
        const tree = $dataWeapons[treeType];
        return tree ? this.getSkillTree(tree) : [false];
    };

    Game_Actor.prototype.isShowItem = function(item, tree) {
        FTKR.setGameData(this, null, item);
        return this.evalStsFormula(item.sts.show, true, false) &&
            this.getPreskillId(item.id, tree.id).every(function(skillId){
                var skill = this.stsSkill(skillId);
                FTKR.gameData.item = skill;
                return this.evalStsFormula(skill.sts.show, true, false);
            },this);
    };

    Game_Actor.prototype.getSkillTree = function(tree) {
        const results = [];
        let list = tree.sts.skillIds;
        const subtree = tree.sts.subtree;
        let nextlist = [];
        let count = 0;
        while (count < FTKR.STS.MAX_DEVSKILL_COUNT) {
            dupCount = 0;
            let text = '';
            if (subtree[count + 1]) {
              subtree[count + 1].forEach( function(sub, i){
                  if (sub) list[i] = sub;
              });
            }
            for (let i = 0; i < FTKR.STS.skillTree.maxCols - dupCount; i++) {
                const id = list[i];
                if (!id) {
                    results.push(null);
                } else {
                    const item = this.stsSkill(id);
                    if (item.sts.position > count + 1) {
                        results.forEach( function(result, t){
                            if (result && result.id === id) results.splice(t, 1, null);
                        });
                        results.push(null);
                        nextlist.addExceptForDup([id]);
                    } else {
                        const diffX = item.sts.diffX;
                        if (diffX) {
                            for (let d = 0; d < diffX; d++) {
                                results.push(null);
                                dupCount++;
                          }
                        }
                        FTKR.setGameData(this, null, item);
                        if (this.evalStsFormula(item.sts.show, true, false)) {
                            const skillIds = this.getDevSkillId(item, tree);
                            const data = { id:id, next:skillIds, x:i + dupCount, y:count };
                            results.forEach( function(result, t){
                                if (result && result.id === data.id) results.splice(t, 1, null);
                            });
                            results.push(data);
                            nextlist.addExceptForDup(data.next);
                        } else {
                            results.push(null);
                        }
                    }
                }
            }
            if (!nextlist.length && subtree.length - 1 < count + 1) break;
            list = nextlist;
            nextlist = [];
            count++;
        }
        return results;
    };

    //派生スキルのIDリストを取得
    Game_Actor.prototype.getDevSkillId = function(item, tree) {
        let skillIds = item.sts.skillIds;
        if (item.sts.tree.length > 1) {
            const derives = item.sts.tree.filter( function(treeType) {
                return treeType.treeId === tree.id;
            });
            if (derives.length) skillIds = derives[0].skillIds;
        }
        return skillIds;
    };

    //前提スキルのIDリストを取得
    Game_Actor.prototype.getPreskillId = function(skillId, tTypeId) {
        const results = [];
        const tree = $dataWeapons[tTypeId];
        $dataSkills.forEach( function(skill) {
            if (skill) {
                const derives = this.getDevSkillId(skill, tree);
                if (derives.length) {
                    const num = derives.filter( function(id) {
                        return id === skillId; 
                    }).length;
                    if (num) results.push(skill.id);
                }
            }
        },this);
        return results;
    };

    Game_Actor.prototype.isReqSkillOk = function(skillId, tTypeId) {
        return !this.getPreskillId(skillId, tTypeId).filter( function(id) {
            return !this.isStsLearnedSkill(id);
        },this).length;
    };



    const _STS_Game_Action_applyItemEffect = Game_Action.prototype.applyItemEffect;
    Game_Action.prototype.applyItemEffect = function(target, effect) {
        switch (effect.code) {
            case Game_Action.EFFECT_GET_SP:
                this.itemEffectGetSp(target, effect);
                break;
            case Game_Action.EFFECT_RESET_TREE:
                this.itemEffectResetTree(target, effect);
                break;
            case Game_Action.EFFECT_CLEAR_TREE:
                this.itemEffectClearTree(target, effect);
                break;
        }
        _STS_Game_Action_applyItemEffect.call(this, target, effect);
    };

    Game_Action.prototype.itemEffectGetSp = function(target, effect) {
        const value = effect.value2;
        if (value !== 0) {
            target.getSp(value);
            this.makeSuccess(target);
        }
    };

    Game_Action.prototype.itemEffectResetTree = function(target, effect) {
        target.resetAllTree(1);
        this.makeSuccess(target);
    };

    Game_Action.prototype.itemEffectClearTree = function(target, effect) {
        target.resetAllTree(0);
        this.makeSuccess(target);
    };

    Game_Action.prototype.stsCount = function() {
        if (this.isSkill()) {
            const id = this._item.itemId();
            return this.subject().stsCount(id);
        }
        return 0;
    };



    Game_Enemy.prototype.stsSp = function() {
        return Number(readObjectMeta(this.enemy(), ['STS GET SP', 'STS SP 入手']));
    };

    Game_Enemy.prototype.stsCount = function(skillId) {
        return 0;
    };



    Game_Troop.prototype.stsSpTotal = function() {
        return this.deadMembers().reduce(function(r, enemy) {
            return r + enemy.stsSp();
        }, 0);
    };



    Window_Base.prototype.setLearnSound = function() {
        const sts = FTKR.STS.stsSe;
        this._learnSound = {name:sts.name, volume:sts.volume, pitch:sts.pitch, pan:sts.pan};
    };

    Window_Base.prototype.setSkillId = function(skillId) {
        if (this._skillId === skillId) return;
        this._skillId = skillId;
        this.refresh();
    };

    Window_Base.prototype.drawCssActorSp = function(actor, x, y, width) {
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(FTKR.STS.sp.dispName, x, y, width);
        this.resetTextColor();
        this.drawText(actor.stsSp(), x, y, width, 'right');
    };

    //アクター名、スキル名が使用できるタイトル文を表示する関数
    Window_Base.prototype.drawStsDescTitle = function(format, x, y, width, skill) {
        const name = skill ? skill.name : '';
        const params = [this._actor._name, name];
        this.drawFormatTextEx(format, x, y, params, width);
    };

    //スキルの説明文を表示する関数
    Window_Base.prototype.drawStsDescription = function(x, y, width, skill) {
        const texts = this.getStsDesc(skill).split('\n');
        const dy = this.lineHeight();
        for (let i = 0; i < texts.length; i++) {
            if (FTKR.STS.skillStatus.adjustWidth) {
                this.drawStsFormatText(texts[i], x, y + dy * i, [], width);
            } else {
                this.drawFormatTextEx(texts[i], x, y + dy * i, []);
            }
        }
    };

    //スキルの説明文を取得する関数
    Window_Base.prototype.getStsDesc = function(skill) {
        const text = FTKR.STS.skillStatus.prioritizeDesc ?
            this.getStsSubDesc(skill) : null;
        if (Imported.FTKR_SEP) {
            const actor = this._actor;
            if (!actor || text) {
                return text ? text : this.ftItemDesc(skill);
            }
            const descs = skill.descs.filter( function(desc) {
                return actor.evalEnabledFormula(desc.enabled, skill);
            });
            const desc = descs.pop();
            return desc ? desc.description : '';
        } else {
            return text ? text : this.ftItemDesc(skill);
        }
    };

    Window_Base.prototype.getStsDescBase = function(skill) {
        const desc = this.getStsSubDesc(skill);
        return desc ? desc : this.ftItemDesc(skill);
    };

    Window_Base.prototype.getStsSubDesc = function(skill) {
        return skill.sts.desc;
    };

    /*-------------------------------------------------------------
    枠表示関数 drawDcfFrameBase(frame, rect, onCursor, item, type)
    frame   :フレームオブジェクト
    rect    :カーソル枠オブジェクト
    onCursor:カーソルと重なっているか(boolean)
    item    :アイテムオブジェクト、表示項目毎に枠を変えたい場合に入れる
    type    :枠タイプ(Number)、プラグインパラメータの設定を使うなら false
    -------------------------------------------------------------*/
    Window_Base.prototype.drawDcfFrameBase = function(frame, rect, onCursor, item, type) {
        switch (type || frame.type) {
            case 1:
                return this.drawLineFrame(false, frame, rect, onCursor, item);
            case 2:
                return this.drawLineFrame(true, frame, rect, onCursor, item);
            case 3:
                return this.drawImageFrame(frame, rect, onCursor, item);
            case 4:
                this.drawImageFrame(frame, rect, onCursor, item);
                return this.drawLineFrame(false, frame, rect, onCursor, item);
            case 5:
                this.drawImageFrame(frame, rect, onCursor, item);
                return this.drawLineFrame(true, frame, rect, onCursor, item);
            case 6:
                this.drawInFrame(frame, rect, onCursor, item);
                return this.drawLineFrame(false, frame, rect, onCursor, item);
            case 7:
                this.drawInFrame(frame, rect, onCursor, item);
                return this.drawLineFrame(true, frame, rect, onCursor, item);
        }
    };

    /*-------------------------------------------------------------
    枠画像表示関数 drawImageFrame()
    frame   :フレームオブジェクト
    rect    :カーソル枠オブジェクト
    onCursor:カーソルと重なっているか(boolean)
    item    :アイテムオブジェクト、枠を表示する項目別に画像を変えたい場合に入れる
    画像の6*6の四つ角はそのまま使い、それ以外の部分を拡大縮小してサイズ調整する。
    ただし、画像が12*12より大きくない場合は、そのまま拡大縮小する。
    -------------------------------------------------------------*/
    Window_Base.prototype.drawImageFrame = function(frame, rect, onCursor, item) {
        if (!frame) return;
        const image = frame.image;
        if (image && image.name) {
            const iic = Window_Base.IMAGE_INDEX_COLS;
            const ifs = Window_Base.IMAGE_FIXED_SIZE; 

            const bitmap = ImageManager.nuun_LoadPictures(image.name);
            const rx = rect.x + image.offsetX;
            const ry = rect.y + image.offsetY;
            const rw = rect.width;
            const rh = rect.height;
            const csrIndex = item ? item.csrIndex : 0;
            const defIndex = item ? item.defIndex : 0;
            const index = frame.changeOnCursor && onCursor ? csrIndex || image.csrIndex : defIndex || image.defIndex;
            const iw = image.width || Math.floor(bitmap.width / iic);
            const ih = image.height || Math.floor(bitmap.height / ifs);
            const ix = index % iic * iw;
            const iy = Math.floor(index / iic) * ih;
            const flag = image.enabledScale;
            const dx = flag ? rx : rx - (iw - rw) / 2;
            const dy = flag ? ry : ry - (ih - rh) / 2;
            const dw = flag ? rw + image.offsetW : iw;
            const dh = flag ? rh + image.offsetH : ih;
            if (iw > ifs * 2 && ih > ifs * 2) {
                //上側
                this.contents.blt(bitmap, ix, iy, ifs, ifs, dx, dy, ifs, ifs);
                this.contents.blt(bitmap, ix + ifs, iy, iw - ifs*2, ifs, dx + ifs, dy, dw - ifs*2, ifs);
                this.contents.blt(bitmap, ix + iw - ifs, iy, ifs, ifs, dx + dw - ifs, dy, ifs, ifs);
                //中央
                this.contents.blt(bitmap, ix, iy + ifs, ifs, ih - ifs*2, dx, dy + ifs, ifs, dh - ifs*2);
                this.contents.blt(bitmap, ix + ifs, iy + ifs, iw - ifs*2, ih - ifs*2, dx + ifs, dy + ifs, dw - ifs*2, dh - ifs*2);
                this.contents.blt(bitmap, ix + iw - ifs, iy + ifs, ifs, ih - ifs*2, dx + dw - ifs, dy + ifs, ifs, dh - ifs*2);
                //下側
                this.contents.blt(bitmap, ix, iy + ih - ifs, ifs, ifs, dx, dy + dh - ifs, ifs, ifs);
                this.contents.blt(bitmap, ix + ifs, iy + ih - ifs, iw - ifs*2, ifs, dx + ifs, dy + dh - ifs, dw - ifs*2, ifs);
                this.contents.blt(bitmap, ix + iw - ifs, iy + ih - ifs, ifs, ifs, dx + dw - ifs, dy + dh - ifs, ifs, ifs);
            } else {
                this.contents.blt(bitmap, ix, iy, iw, iw, dx, dy, dw, dh);
            }
        }
    };

    /*-------------------------------------------------------------
    枠線表示関数 drawLineFrame()
    double  :複線タイプか(boolean)
    frame   :フレームオブジェクト
    rect    :カーソル枠オブジェクト
    onCursor:カーソルと重なっているか(boolean)
    item    :アイテムオブジェクト、枠を表示する項目別に枠線色を変えたい場合に入れる
    -------------------------------------------------------------*/
    Window_Base.prototype.drawLineFrame = function(double, frame, rect, onCursor, item) {
        if (!frame) return;
        const line = frame.line;
        if (line && line.thick) {
            const offset = double ? line.subThick : 0;
            const csrColor = item ? item.csrColor : 0;
            const defColor = item ? item.defColor : 0;
            const color = frame.changeOnCursor && onCursor ? csrColor || line.csrColor : defColor || line.defColor;
            if (double) this.drawLineFrameBase(rect, 0, line.subColor, line.subThick);
            this.drawLineFrameBase(rect, offset, color, line.thick);
            if (double) {
                offset += line.thick;
                this.drawLineFrameBase(rect, offset, line.subColor, line.subThick);
            }
        }
    };

    /*-------------------------------------------------------------
    枠内塗潰し関数 drawInFrame()
    frame   :フレームオブジェクト
    rect    :カーソル枠オブジェクト
    onCursor:カーソルと重なっているか(boolean)
    item    :アイテムオブジェクト、枠を表示する項目別に枠内色を変えたい場合に入れる
    -------------------------------------------------------------*/
    Window_Base.prototype.drawInFrame = function(frame, rect, onCursor, item) {
        if (!frame) return;
        const fill = frame.fill;
        if (fill) {
            const csrColor = item ? item.csrInColor : 0;
            const defColor = item ? item.defInColor : 0;
            const csrColor2 = item ? item.csrInColor2 : csrColor;
            const defColor2 = item ? item.defInColor2 : defColor;
            const color1 = frame.changeOnCursor && onCursor ? csrColor || fill.csrColor : defColor || fill.defColor;
            const color2 = frame.changeOnCursor && onCursor ? csrColor2 || fill.csrColor2 || fill.csrColor :
            defColor2 || fill.defColor2 || fill.defColor;
            const opacity = item ? item.opacity : fill.opacity;
            this.drawRect(rect.x, rect.y, rect.width, rect.height, NuunManager.getColorCode(color1), NuunManager.getColorCode(color2), opacity);
        }
    };

    //カーソルサイズに枠線を描画
    Window_Base.prototype.drawLineFrameBase = function(rect, offset, color, thick) {
        const sx = rect.x + offset;
        const sy = rect.y + offset;
        const sw = rect.width - offset * 2;
        const sh = rect.height - offset * 2;
        this.drawDcfFrameLine(sx, sy, sw, sh, color, thick);
    };

    //枠線を描画
    Window_Base.prototype.drawDcfFrameLine = function(x, y, width, height, colorNum, thick) {
      if (colorNum < 0) return false;
      const color = NuunManager.getColorCode(colorNum);
      this.contents.drawDcfFrame(x, y, width, height, thick, color);
    };

    //矩形を描画
    Window_Base.prototype.drawRect = function(x, y, width, thick, color1, color2, opacity) {
        color2 = color2 || color1;
        this.contents.paintOpacity = opacity || 255;
        this.contents.gradientFillRect(x, y, width, thick, color1, color2);
        this.contents.paintOpacity = 255;
    };



    /*-------------------------------------------------------------
      コストデータ(アイコン,名前,必要数,手持ち数)を表示する関数
    -------------------------------------------------------------*/
    Window_Base.prototype.setCost = function(icon, name, base) {
        return {icon:icon, name:name, base:base};
    };

    Window_Base.prototype.setStsCost = function(cost) {
        switch(cost.type) {
            case 'gold':
                return this.setCost(FTKR.STS.icon.gold, $dataSystem.currencyUnit, $gameParty.gold());
            case 'item':
                var item = $dataItems[cost.id];
                return this.setCost(item.iconIndex, item.name, $gameParty.numItems(item));
            case 'var'://変数
                return this.setCost(FTKR.STS.icon.var, $dataSystem.variables[cost.id], $gameVariables.value(cost.id));
            case 'weapon':
                var item = $dataWeapons[cost.id];
                return this.setCost(item.iconIndex, item.name, $gameParty.numItems(item));
            case 'armor':
                var item = $dataArmors[cost.id];
              return this.setCost(item.iconIndex, item.name, $gameParty.numItems(item));
            case 'sp':
                return this.setCost(FTKR.STS.sp.icon, FTKR.STS.sp.dispName, this._actor.stsSp());
            default:
                return this.setCost(0, '', 0);
        }
    };

    //斜線描画関数
    Window_Base.prototype.drawDiagLine = function(x1, y1, x2, y2, color, thick) {
        this.contents.drawStsLine(x1, y1, x2, y2, ColorManager.textColor(color), thick);
    };

    //アイコンの表示スケールを指定できる表示関数
    Window_Base.prototype.drawIconCustom = function(iconIndex, x, y, scale) {
        const bitmap = ImageManager.loadSystem('IconSet');
        const pw = ImageManager.iconWidth;
        const ph = ImageManager.iconHeight;
        const sx = iconIndex % 16 * pw;
        const sy = Math.floor(iconIndex / 16) * ph;
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y, pw * scale, ph * scale);
    };

    // 制御文字を使えないフォーマットテキスト描画関数
    Window_Base.prototype.drawStsFormatText = function(fmt, x, y, params, width, position) {
        const text = fmt.format(params[0], params[1], params[2], params[3], params[4]);
        this.drawText(text, x, y, width, position);
    };

    // 制御文字を使えるフォーマットテキスト描画関数
    Window_Base.prototype.drawFormatTextEx = function(fmt, x, y, params) {
        const text = fmt.format(params[0], params[1], params[2], params[3], params[4]);
        return this.drawTextEx(text, x, y);
    };



/*-------------------------------------------------------------
      制御文字の表示処理の修正
    -------------------------------------------------------------*/
    
    const _STS_Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
    Window_Base.prototype.convertEscapeCharacters = function(text) {
        text = _STS_Window_Base_convertEscapeCharacters.call(this, text);
        text = text.replace(/\x1bSDATA\[(\d+),([^\]]+)\]/gi, function() {
            return $dataSkills[parseInt(arguments[1])][arguments[2]];
        }.bind(this));
        return text;
    };

    const _STS_Window_Base_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
    Window_Base.prototype.processEscapeCharacter = function(code, textState) {
        switch (code) {
        case 'LW':
            this.processDrawStsWidth(this.obtainEscapeStsParam(textState), textState);
            break;
        default:
            _STS_Window_Base_processEscapeCharacter.call(this, code, textState);
            break;
        }
    };

    Window_Base.prototype.obtainEscapeStsParam = function(textState) {
        const arr = /^\[([^\]]+)\]/.exec(textState.text.slice(textState.index));
        if (arr) {
            textState.index += arr[0].length;
            const results = arr[1].split(',');
            return results.map( function(elm) {
                return isNaN(parseInt(elm)) ? elm : parseInt(elm);
            });
        } else {
            return '';
        }
    };

    Window_Base.prototype.processDrawStsWidth = function(args, textState) {
        this.drawText(args[1], textState.x, textState.y, args[0], args[2]);
        textState.x += args[0];
    };

    if (!Window_Base.prototype.ftItemName) {
        Window_Base.prototype.ftItemName = function(item) {
            return !!item ? item.name : '';
        };
    }
    
    if (!Window_Base.prototype.ftItemIcon) {
        Window_Base.prototype.ftItemIcon = function(item) {
            return !!item ? item.iconIndex : 0;
        };
    }
    
    if (!Window_Base.prototype.ftItemDesc) {
        Window_Base.prototype.ftItemDesc = function(item) {
            return !!item ? item.description : '';
        };
    }




//=============================================================================
    // Window_Selectable
    //=============================================================================

    Window_Selectable.prototype.actSelect = function(index) {
        this.activate();
        this.select(index);
        this.refresh();
    };

    Window_Selectable.prototype.itemHeightSpace = function() {
        return 0;
    };

    Window_Selectable.prototype.unitHeight = function() {
        return this.itemHeight() + this.itemHeightSpace();
    };

    Window_Selectable.prototype.unitWidth = function() {
        return this.itemWidth() + this.spacing();
    };


    /*-------------------------------------------------------------
    枠表示関数 drawDcfFrame(index, frame, type)
    index   :表示項目の番号、基本的にdrawItem(index)の引数をそのまま使う。
    frame   :フレームオブジェクト、false で本プラグインの設定を使用する。
    type    :枠タイプ(Number)、プラグインパラメータの設定を使うなら false
    item    :アイテムオブジェクト、表示項目毎に枠を変えたい場合に入れる
    表示項目毎に枠を表示する関数。基本的に、drawItem関数内の最初に追加する。
    -------------------------------------------------------------*/
    Window_Selectable.prototype.drawDcfFrame = function(index, frame, type, item) {
        const onCursor = index === this.index();
        const rect = this.itemRect(index);
        if (frame.whenToDisplay === 1 && !onCursor ||
            frame.whenToDisplay === 2 && onCursor) {
            return;
        }
        this.drawDcfFrameBase(frame, rect, onCursor, item, type);
    };

    /*-------------------------------------------------------------
    枠表示を更新する関数 updateDcfFrame(index, frame, hide)
    index   :表示項目の番号、基本的にselect(index)の引数をそのまま使う。
    frame   :フレームオブジェクト、false で本プラグインの設定を使用する。
    hide    :カーソル非表示フラグ(boolean)
    カーソルに連動して枠の表示を変える関数。
    基本的に、select関数内の最後に追加する。
    -------------------------------------------------------------*/
    Window_Selectable.prototype.updateDcfFrame = function(index, frame, hide) {
        frame = frame || FTKR.STS.sFrame;
        if (hide || frame.hideCursor) {
            this.setCursorRect(0, 0, 0, 0);
        }
        const onCursor = index === this.index();
        if (frame.changeOnCursor && onCursor ||
            frame.whenToDisplay === 1 && onCursor ||
            frame.whenToDisplay === 2 && !onCursor) {
            this.refresh();
        }
    };



    Window_SkillList.prototype.makeItemList = function() {
        if (this._actor) {
            this._data = this._actor.skills().filter(function(item) {
                if (item.sts.learnSkillIds) {
                    return false;
                }
                return this.includes(item);
            }, this);
        } else {
            this._data = [];
        }
    };


    //=============================================================================
    // Window_TreeType
    //=============================================================================

    Window_TreeType.prototype = Object.create(Window_Selectable.prototype);
    Window_TreeType.prototype.constructor = Window_TreeType;

    Window_TreeType.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this._actor = null;
        this._stypeId = 0;
        this.refresh();
    };

    Window_TreeType.prototype.setActor = function(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
            this.scrollTo(0, 0);
        }
    };

    Window_TreeType.prototype.maxCols = function() {
        return 1;
    };

    Window_TreeType.prototype.maxItems = function() {
        return this._data ? this._data.length : 0;
    };

    Window_TreeType.prototype.refresh = function() {
        this.makeItemList();
        this.createContents();
        this.drawAllItems();
    };

    Window_TreeType.prototype.item = function(index) {
        return this._data ? this._data[index] : null;
    };

    Window_TreeType.prototype.includes = function(weaponId) {
        const weapon = $dataWeapons[weaponId];
        FTKR.setGameData(this._actor, null, weapon);
        return weapon && weapon.wtypeId === FTKR.STS.skillTreeId &&
            this._actor.evalStsFormula(weapon.sts.required, true, false);
    };

    Window_TreeType.prototype.makeItemList = function() {
        this._data = [];
        const actor = this._actor;
        if (actor) {
            this._data = actor.getTreeTypes().filter( function(id) {
                return this.includes(id);
            },this);
        }
    };

    Window_TreeType.prototype.drawItem = function(index) {
        if (this._actor) {
            const rect = this.itemLineRect(index);
            this.changeTextColor(ColorManager.systemColor());
            this.changePaintOpacity(true);
            const item = $dataWeapons[this.item(index)];
            if (item) {
            this.drawStsFrame(index, item);
            this.drawItemName(item, rect.x, rect.y, rect.width);
            }
            this.changePaintOpacity(true);
        }
    };

    Window_TreeType.prototype.drawStsFrame = function(index, item) {
        if (Imported.FTKR_DCF && FTKR.STS.treeTypes.enabled) {
            const defIndex = item ? item.sts.pIndex : 0;
            const csrIndex = item ? item.sts.pCIndex : 0;
            const item = {
            defColor:0,
            csrColor:0,
            defIndex: defIndex,
            csrIndex: csrIndex,
            };
            this.drawDcfFrame(index, false, false, item);
        }
    };

    Window_TreeType.prototype.setSkillTreeWindow = function(window) {
        this._skillTreeWindow = window;
        this.update();
    };

    Window_TreeType.prototype.setPreskillWindow = function(window) {
        this._preskillWindow = window;
        this.update();
    };

    Window_TreeType.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);
        const tTypeId = this.item(this.index());
        if (tTypeId && this._skillTreeWindow) this._skillTreeWindow.setTtypeId(tTypeId);
        if (tTypeId && this._preskillWindow) this._preskillWindow.setTtypeId(tTypeId);
    };

    Window_TreeType.prototype.select = function(index) {
        Window_Selectable.prototype.select.call(this, index);
        if (onSkillFrame() && FTKR.STS.treeTypes.enabled) this.updateDcfFrame(index, FTKR.STS.sFrame);
    };

    //=============================================================================
    // Window_SkillTree
    //=============================================================================

    Window_SkillTree.prototype = Object.create(Window_Selectable.prototype);
    Window_SkillTree.prototype.constructor = Window_SkillTree;

    Window_SkillTree.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this.defineLearnSound();
        this._actor = null;
        this._data = [];
        this.clearWindow();
    };

    Window_SkillTree.prototype.setActor = function(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.clearWindow();
            this.scrollTo(0, 0);
        }
    };

    Window_SkillTree.prototype.clearWindow = function() {
        this._stsIndex = 0;
        this._tTypeId = null;
        this._skillId = null;
        this.refresh();
    };

    Window_SkillTree.prototype.maxCols = function() {
      return Math.max(FTKR.STS.skillTree.maxCols, 1);
    };

    Window_SkillTree.prototype.itemWidth = function() {
        return FTKR.STS.sFrame.width;
    };

    Window_SkillTree.prototype.itemHeight = function() {
        return FTKR.STS.sFrame.height;
    };

    Window_SkillTree.prototype.wSpacing = function() {
        return Math.max(FTKR.STS.cFrame.offsetX + FTKR.STS.cFrame.width, 0);
    };

    Window_SkillTree.prototype.spacing = function() {
        const allSpacing = this.width - this.padding * 2 - this.wSpacing() - this.itemWidth() * this.maxCols();
        return this.maxCols() > 1 ? allSpacing / (this.maxCols() - 1) : 0;
    };

    Window_SkillTree.prototype.itemHeightSpace = function() {
        return FTKR.STS.skillTree.heightSpace;
    };

    Window_SkillTree.prototype.maxItems = function() {
        return this._data ? this._data.length : 1;
    };

    Window_SkillTree.prototype.item = function() {
        return this._data && this.index() >= 0 ? this._data[this.index()] : null;
    };

    Window_SkillTree.prototype.isCurrentItemEnabled = function() {
        return FTKR.STS.enableConf ? this.item() : this.isLearnOk(this.item());
    };

    Window_SkillTree.prototype.isLearnOk = function(item) {
        return item && this.isEnabled(item) && this._actor.isStsLearnedOk(item.id);
    };

    Window_SkillTree.prototype.isEnabled = function(item) {
        return item && this.isReqSkillOk(item) && this.isReqParamOk(item) && this.isPayCostOk(item);
    };

    Window_SkillTree.prototype.isPayCostOk = function(item) {
        return this._actor.isPayCostOk(item.id);
    };

    Window_SkillTree.prototype.isReqSkillOk = function(item) {
        return this._actor.isReqSkillOk(item.id, this._tTypeId);
    };

    Window_SkillTree.prototype.isReqParamOk = function(item) {
        return this._actor.isReqParamOk(item.id);
    };

    Window_SkillTree.prototype.isShowItem = function(item) {
        return item && (this.isEnabled(item) || this._actor.isStsLearnedSkill(item.id));
    };

    Window_SkillTree.prototype.makeItemList = function() {
        this._data = [];
        const actor = this._actor;
        if (actor && this._tTypeId) this._data = actor.getTreeDatas(this._tTypeId);
    };

    Window_SkillTree.prototype.checkId = function(list, id) {
        return list.filter( function(data) {
            return data && data.id === id;
        });
    };

    Window_SkillTree.prototype.drawItemBackground = function(index) {
        const data = this._data[index];
        if (!params.ShowContentsBackground || !data || onSkillFrame()) return false;
        const skill = this._actor.stsSkill(data.id);
        if (skill) {
            Window_Selectable.prototype.drawItemBackground.call(this, index);
        }
    };

    Window_SkillTree.prototype.drawItem = function(index) {
        const data = this._data[index];
        if (!data) return false;
        const rect = this.itemRect(index);
        const fcolor = this.setFrameColor(data);
        const skill = this._actor.stsSkill(data.id);
        if (skill) {
            const rect2 = this.itemLineRect(index);
            this.changePaintOpacity(this.isShowItem(data));
            this.drawTreeLineRect(data, rect);
            this.drawFrame(index, skill, data);
            this.drawTreeIcon(skill, rect);
            this.drawSkillCountRect(skill, data, rect, fcolor);
            this.drawSkillTextRect(skill, rect2, fcolor);
            this.changeTextColor(ColorManager.normalColor());
            this.changePaintOpacity(1);
        }
    };

    Window_SkillTree.prototype.drawTreeIcon = function(skill, rect) {
        const ssi = FTKR.STS.sFrame.icon;
        this.drawIcon(this.ftItemIcon(skill), rect.x + ssi.offsetX, rect.y + ssi.offsetY);
    };

    Window_SkillTree.prototype.drawFrame = function(index, skill, data) {
        if (!FTKR.STS.sFrame.enabled) return;
        const fColor = data ? this.setFrameColor(data) : 0;
        const rect = this.itemRect(index);
        if (onSkillFrame()) {
            this.drawDcfFrame(index, rect, skill, FTKR.STS.sFrame.type, fColor);
        } else {
            this.drawStsFrame(rect.x, rect.y, rect.width, rect.height, fColor, FTKR.STS.treeLineThick);
        }
    };

    Window_SkillTree.prototype.drawDcfFrame = function(index, rect, skill, type, color) {
        const onCursor = index === this.index();
        const defIndex = skill ? skill.sts.pIndex : 0;
        const csrIndex = skill ? skill.sts.pCIndex : 0;
        const item = {
            defColor:color,
            csrColor:0,
            defIndex:defIndex,
            csrIndex:csrIndex,
        };
        this.drawDcfFrameBase(FTKR.STS.sFrame, rect, onCursor, item, type);
    };

    Window_SkillTree.prototype.drawStsFrame = function(x, y, width, height, colorNum, thick) {
        if (colorNum < 0) return false;
        const color = NuunManager.getColorCode(colorNum);
        this.contents.drawStsFrame(x, y, width, height, thick, color);
    };

    Window_SkillTree.prototype.drawSkillTextRect = function(skill, rect, color) {
        this.drawSkillText(skill, rect.x, rect.y, rect.width, color, FTKR.STS.sFrame.text);
    };

    Window_SkillTree.prototype.drawSkillText = function(skill, x, y, width, color, sts) {
        const stx = sts.offsetX;
        this.changeTextColor(NuunManager.getColorCode(color));
        this.drawFormatTextEx(sts.format, x + stx, y + sts.offsetY, [this.ftItemName(skill)]);
    };

    //スキルの習得回数を表示
    Window_SkillTree.prototype.drawSkillCountRect = function(skill, data, rect, color) {
        this.drawSkillCount(this._actor, skill, data, rect.x, rect.y, rect.width, color);
    };
    
    Window_SkillTree.prototype.drawSkillCount = function(actor, skill, data, x, y, width, color){
        const iw = ImageManager.iconWidth;
        const ih = ImageManager.iconHeight;
        const cfl = FTKR.STS.cFrame;
        const scw = cfl.width;
        const sch = cfl.height;
        const scx = x + width + cfl.offsetX;
        const scy = y + cfl.offsetY;
        const thick = cfl.thick;
        const txtw = scw - thick * 2;
        const txth = sch - thick * 2;
        const rate = sch / iw;
        const sctx = scx + thick + cfl.count.offsetX;
        const scty = scy + thick + cfl.count.offsetY;
        const count = !actor.isStsLearnedSkill(skill.id) ? 0 : actor.stsCount(skill.id);
        if (FTKR.STS.enableSkillCount) {
            if (cfl.enabled) {
                const fcolor = this.setFrameColor(data);
            if (onSkillFrame()) {
                const rect = {x:scx, y:scy, width:scw, height:sch};
                const item = {defColor:fcolor,defIndex:cfl.defIndex};
                this.drawDcfFrameBase(FTKR.STS.sFrame, rect, false, item, cfl.type);
            } else {
                this.drawStsFrame(scx, scy, scw, sch, fcolor, thick);
            }
            }
            this.changeTextColor(NuunManager.getColorCode(color));
            this.drawFormatTextEx(cfl.format, sctx, scty, [count]);
        }
        if (actor.isStsLearnedSkill(skill.id) && !actor.isStsLearnedOk(skill.id)) {
            this.drawIconCustom(FTKR.STS.skillLearnedIcon, scx, scy, rate);
        }
    };

    //スキル間の派生線を表示
    Window_SkillTree.prototype.drawTreeLineRect = function(data, rect) {
        this.drawTreeLine(data, rect.x, rect.y, rect.width, rect.height);
    };

    Window_SkillTree.prototype.drawTreeLine = function(data, x, y, rw, rh) {
        if (!data.next.length) return;
        const x1 = x + rw/2, y1 = y + rh;//派生元座標
        for (let i = 0; i < data.next.length; i++) {
            const next = this.checkId(this._data, data.next[i])[0];
            if (!next) continue;
            const color = FTKR.STS.lineColor ? this.setFrameColor(next) : 0;
            const hs = this.itemHeightSpace();  //縦のスキル枠間の距離
            const x2 = x + rw/2 + (rw + this.spacing()) * (next.x - data.x);//派生先X座標
            const y2 = y + (rh + hs) * (next.y - data.y);//派生先Y座標
            const tlen = hs/2 * Math.code(next.x, data.x);
            const xm1 = x1 + tlen, xm2 = x2 - tlen;   //角部X座標
            switch (FTKR.STS.drawStsLineType) {
                case 1:
                    var ym1 = y2 - hs, ym2 = y2 - hs/2; //角部Y座標
                    this.drawTreeLineBase(x1, y1, x1, ym1, color);
                    this.drawTreeLineBase(x1, ym1, xm1, ym2, color);
                    this.drawTreeLineBase(xm1, ym2, xm2, ym2, color);
                    this.drawTreeLineBase(xm2, ym2, x2, y2, color);
                    break;
                case 2:
                    var ym1 = y1 + hs/2, ym2 = y1 + hs; //角部Y座標
                    this.drawTreeLineBase(x1, y1, xm1, ym1, color);
                    this.drawTreeLineBase(xm1, ym1, xm2, ym1, color);
                    this.drawTreeLineBase(xm2, ym1, x2, ym2, color);
                    this.drawTreeLineBase(x2, ym2, x2, y2, color);
                    break;
                case 3:
                    break;
                case 0:
                default:
                    this.drawTreeLineBase(x1, y1, x2, y2, color);
                    break;
            }
        }
    };

    Window_SkillTree.prototype.drawTreeLineBase = function(x, y, w, h, color) {
        const thick = FTKR.STS.treeLineThick;
        if (FTKR.STS.addFrameToLine) this.drawDiagLine(x, y, w, h, 15, thick + 2);
        this.drawDiagLine(x, y, w, h, color, thick);
    };

    Window_SkillTree.prototype.setFrameColor = function(data) {
        const sts = FTKR.STS.sFrame.color;
        if (this._actor.isStsLearnedSkill(data.id)) {
          return sts.isLearned;
        } else if (this.isLearnOk(data)) {
          return sts.isLearnOk;
        } else if (!this.isReqSkillOk(data)) {
          return sts.isReqSkillNg;
        } else {
          return sts.isReqNg;
        }
    };

    Window_SkillTree.prototype.refresh = function() {
      this.makeItemList();
      this.createContents();
      this.drawAllItems();
    };

    Window_SkillTree.prototype.setTtypeId = function(tTypeId) {
        if (this._tTypeId === tTypeId) return;
        this._tTypeId = tTypeId;
        this.refresh();
    };

    Window_SkillTree.prototype.defineLearnSound = function() {
        this.setLearnSound();
    };

    Window_SkillTree.prototype.setStatusTitleWindow = function(window) {
        this._stsStatusTitleWindow = window;
        this.update();
    };

    Window_SkillTree.prototype.setConfWindow = function(window) {
        this._confWindow = window;
        this.update();
    };

    Window_SkillTree.prototype.setCostWindow = function(window) {
        this._costWindow = window;
        this.update();
    };

    Window_SkillTree.prototype.setPreskillWindow = function(window) {
        this._preskillWindow = window;
        this.update();
    };

    Window_SkillTree.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);
        this._skillId = this.item() ? this.item().id : null;
        if (this._stsStatusTitleWindow) this._stsStatusTitleWindow.setSkillId(this._skillId);
        if (this._confWindow) this._confWindow.setEnabled(this.isLearnOk(this.item()));
        if (this._costWindow) this._costWindow.setSkillId(this._skillId);
        if (this._preskillWindow) this._preskillWindow.setSkillId(this._skillId);
    };

    Window_SkillTree.prototype.select = function(index) {
        Window_Selectable.prototype.select.call(this, index);
        if (onSkillFrame() && FTKR.STS.sFrame.enabled) this.updateDcfFrame(index);
    };

    Window_SkillTree.prototype.maxPageRows = function() {
        const pageHeight = this.height - this.padding * 2;
        return Math.floor(pageHeight / this.unitHeight());
    };

    Window_SkillTree.prototype.topRow = function() {
        return Math.floor(this._scrollY / this.unitHeight());
    };

    Window_SkillTree.prototype.setTopRow = function(row) {
        const scrollY = row.clamp(0, this.maxTopRow()) * this.unitHeight();
        if (this._scrollY !== scrollY) {
            this._scrollY = scrollY;
            this.refresh();
            this.updateCursor();
        }
    };

    Window_SkillTree.prototype.itemRect = function(index) {
        const maxCols = this.maxCols();
        const unitWidth = this.unitWidth();
        const unitHeight = this.unitHeight();
        const col = index % maxCols;
        const row = Math.floor(index / maxCols);
        const x = col * unitWidth + this.scrollBaseX();
        const y = row * unitHeight + this.scrollBaseY();
        const width = this.itemWidth();
        const height = this.itemHeight();
        return new Rectangle(x, y, width, height);
    };


    //=============================================================================
    // Window_StsSkillStatus
    //=============================================================================

    Window_StsSkillStatus.prototype = Object.create(Window_Base.prototype);
    Window_StsSkillStatus.prototype.constructor = Window_StsSkillStatus;

    Window_StsSkillStatus.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this._actor = null;
        this.clearWindow();
    };

    Window_StsSkillStatus.prototype.setActor = function(actor) {
        if (this._actor !== actor) this._actor = actor;
    };

    Window_StsSkillStatus.prototype.clearWindow = function() {
        this._skillId = null;
        this.refresh();
    };

    Window_StsSkillStatus.prototype.refresh = function() {
        this.contents.clear();
        const sts = FTKR.STS.skillStatus;
        this.drawSkillState(sts.titleFormat);
    };

    Window_StsSkillStatus.prototype.drawSkillState = function(format) {
        if (this._actor && this._skillId) {
            const skill = this._actor.stsSkill(this._skillId);
            const y = this.lineHeight();
            const width = this.width - this.padding * 2;
            format ? this.drawStsDescTitle(format, 0, 0, width, skill) : y = 0;
            this.drawStsDescription(0, y, width, skill);
        }
    };

    //=============================================================================
    // Window_StsConfTitle
    //=============================================================================

    Window_StsConfTitle.prototype = Object.create(Window_Base.prototype);
    Window_StsConfTitle.prototype.constructor = Window_StsConfTitle;

    Window_StsConfTitle.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this._actor = null;
        this._skillId = null;
        this.refresh();
    };

    Window_StsConfTitle.prototype.setActor = function(actor) {
        if (this._actor !== actor) this._actor = actor;
    };

    Window_StsConfTitle.prototype.refresh = function () {
        this.contents.clear();
        this.drawStsText(FTKR.STS.conf.titleformat);
    };

    Window_StsConfTitle.prototype.drawStsText = function(format) {
        if (this._actor && this._skillId) {
            const skill = this._actor.stsSkill(this._skillId);
            const width = this.width - this.standardPadding() * 2;
            this.drawStsDescTitle(format, 0, 0, width, skill);
        }
    };

    //=============================================================================
    // Window_StsConf
    //=============================================================================

    Window_StsConf.prototype = Object.create(Window_Selectable.prototype);
    Window_StsConf.prototype.constructor = Window_StsConf;

    Window_StsConf.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this.setLearnSound();
        this._actor = null;
        this._data = [];
        this._enabled = false;
        this._dicision = false;
    };

    Window_StsConf.prototype.setActor = function(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
        }
    };

    Window_StsConf.prototype.maxCols = function() {
        return 2;
    };

    Window_StsConf.prototype.maxItems = function() {
        return this._data ? this._data.length : 1;
    };

    Window_StsConf.prototype.item = function() {
        return this._data && this.index() >= 0 ? this._data[this.index()] : null;
    };

    Window_StsConf.prototype.makeItemList = function() {
        this._data = [
            {dicision:true, disp:FTKR.STS.conf.okFormat},
            {dicision:false, disp:FTKR.STS.conf.cancelFormat}
        ];
    };

    Window_StsConf.prototype.refresh = function() {
        this.makeItemList();
        this.createContents();
        this.drawAllItems();
    };

    Window_StsConf.prototype.isEnabled = function(index) {
        return this._actor && (this._enabled || index > 0);
    };

    Window_StsConf.prototype.isCurrentItemEnabled = function() {
        return this.isEnabled(this.index());
    };

    Window_StsConf.prototype.drawItem = function(index) {
        const rect = this.itemRect(index);
        this.changePaintOpacity(this.isEnabled(index));
        this.drawText(this._data[index].disp, rect.x, rect.y, rect.width, 'center');
        this.changePaintOpacity(1);
    };

    Window_StsConf.prototype.setEnabled = function(enabled) {
        if (this._enabled === enabled) return;
        this._enabled = enabled;
        this.refresh();
    };

    //=============================================================================
    // Window_StsCost
    //=============================================================================

    Window_StsCost.prototype = Object.create(Window_Base.prototype);
    Window_StsCost.prototype.constructor = Window_StsCost;

    Window_StsCost.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this._actor = null;
        this.clearWindow()
    };

    Window_StsCost.prototype.setActor = function(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
        }
    };

    Window_StsCost.prototype.clearWindow = function() {
        this._skillId = null;
        this.refresh();
    };

    Window_StsCost.prototype.refresh = function() {
        this.contents.clear();
        this.drawAllCost();
    };

    Window_StsCost.prototype.drawAllCost = function() {
        if (this._actor) {
            const skill = this._skillId ? this._actor.stsSkill(this._skillId) : null;
            const width = this.width - this.padding * 2;
            const y = this.lineHeight();
            let len = 0;
            const title = FTKR.STS.cost.titleFormat;
            if (title) {
                len = 1;
                this.drawStsDescTitle(title, 0, 0, width, skill);
            }
            this.drawCostValues(skill, 0, len * y, width);
        }
    };

    Window_StsCost.prototype.drawCostValues = function(skill, x, y, width) {
        if (!this._skillId) return;
        const lh = this.lineHeight();
        for (let i = 0; i < 3; i++) {
            const cost = skill.sts.costs[i];
            if (cost) {
                FTKR.setGameData(this._actor, null, skill);
                if (FTKR.STS.sp.hideCost0 && cost.type === 'sp' && (!cost.value || Number(cost.value) === 0)) continue;
                this.drawStsCost(cost, x, y + lh * i, width, skill.id);
            }
        }
    };

    Window_Base.prototype.drawStsCost = function(cost, x, y, width, skillId) {
        const iw = ImageManager.iconWidth + 4;
        width = width - iw;
        this.drawIcon(this.setStsCost(cost).icon, x + 2, y + 2);
        const params = [
            this._actor.evalStsFormula(cost.value, 0, 0),
            this.setStsCost(cost).base
        ];
        this.drawFormatTextEx(FTKR.STS.cost.itemFormat, x + iw, y, [this.setStsCost(cost).name]);
        const num = FTKR.STS.cost.numberFormat.split(',');
        this.changeTextColor(NuunManager.getColorCode(parseInt(num[0])));
        const numberWidth = FTKR.STS.cost.numberWidth || width + iw;
        const diff = width + iw - numberWidth;console.log(diff)
        const value = this._actor.isStsMaxCount(skillId) && FTKR.STS.cost.maxFormat ? FTKR.STS.cost.maxFormat : num[1];
        this.drawStsFormatText(value, x + diff, y, params, numberWidth, 'right');
    };

    //=============================================================================
    // Window_StsPreskill
    //=============================================================================

    Window_StsPreskill.prototype = Object.create(Window_Base.prototype);
    Window_StsPreskill.prototype.constructor = Window_StsPreskill;

    Window_StsPreskill.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this._actor = null;
        this.clearWindow()
    };

    Window_StsPreskill.prototype.setActor = function(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
        }
    };

    Window_StsPreskill.prototype.setTtypeId = function(tTypeId) {
        if (this._tTypeId === tTypeId) return;
        this._tTypeId = tTypeId;
        this.refresh();
    };

    Window_StsPreskill.prototype.clearWindow = function() {
        this._skillId = null;
        this._tTypeId = null;
        this.refresh();
    };

    Window_StsPreskill.prototype.refresh = function() {
        this.contents.clear();
        this.drawAllPreskill();
    };

    Window_StsPreskill.prototype.drawAllPreskill = function(index) {
        if (this._actor) {
            const actor = this._actor;
            const skill = this._skillId ? actor.stsSkill(this._skillId) : null;
            const width = this.width - this.padding * 2;
            const lh = this.lineHeight();
            let len = 0;
            const title = FTKR.STS.preskill.titleFormat;
            if (title) {
                len = 1;
                this.drawStsDescTitle(title, 0, 0, width, skill);
            }
            this.drawPreSkills(0, lh * len, width);
        }
    };

    Window_StsPreskill.prototype.drawPreSkills = function(x, y, width) {
        if (this._skillId && this._tTypeId) {
            const actor = this._actor;
            const lh = this.lineHeight();
            const preskillIds = actor.getPreskillId(this._skillId, this._tTypeId);
            for (let i = 0; i< preskillIds.length; i++) {
                const preskill = actor.stsSkill(preskillIds[i]);
                if (preskill) {
                    this.changePaintOpacity(actor.isStsLearnedSkill(preskill.id));
                    this.drawFormatTextEx(FTKR.STS.preskill.itemFormat, x, y + lh * i, [preskill.name], width);
                    this.changePaintOpacity(1);
                }
            }
        }
    };

    //=============================================================================
    // Window_StsActorStatus
    //=============================================================================

    Window_StsActorStatus.prototype = Object.create(Window_StatusBase.prototype);
    Window_StsActorStatus.prototype.constructor = Window_StsActorStatus;

    Window_StsActorStatus.prototype.initialize = function(rect) {
        Window_StatusBase.prototype.initialize.call(this, rect);
        this._actor = null;
    };

    Window_StsActorStatus.prototype.setActor = function(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            actor.checkInitSts();
            this.refresh();
        }
    };

    Window_StsActorStatus.prototype.refresh = function() {
        this.contents.clear();
        const sts = FTKR.STS.actorStatus;
        const actor = this._actor;
        if (actor) {
            const w = this.width - this.padding * 2;
            const h = this.height - this.padding * 2;
            if(Imported.FTKR_CSS) {
            this.drawCssActorStatus(0, actor, 0, 0, w, h, sts);
            } else {
                const y = this.lineHeight();
            this.drawActorFace(actor, 0, 0, w*2/3);
            this.drawActorName(actor, 120, 0, w - 120);
            this.drawActorLevel(actor, 120, y, w - 120);
            this.drawCssActorSp(actor, 120, y*2, w - 120);
            }
        }
    };

    Window_StsActorStatus.prototype.drawActorLevel = function(actor, x, y, width) {
        const value = actor.level;
        const tw = this.textWidth(String(value));
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(TextManager.levelA, x, y, width - tw - 4);
        this.resetTextColor();
        this.drawText(value, x + width - tw, y, tw, 'right');
    };


    const _STS_Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        _STS_Window_MenuCommand_addOriginalCommands.call(this);
        if (FTKR.STS.showCommand) {
            if (FTKR.STS.menuSwitchId === 0) {
                this.addCommand(FTKR.STS.commandName, 'learn skill', true);
            } else if (FTKR.STS.menuSwitchId > 0 &&
                $gameSwitches.value(FTKR.STS.menuSwitchId)) {
                this.addCommand(FTKR.STS.commandName, 'learn skill', true);
            }
        }
    };


    const _STS_Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _STS_Scene_Menu_createCommandWindow.call(this);
        if (FTKR.STS.showCommand) {
            this._commandWindow.setHandler('learn skill', this.commandPersonal.bind(this));
        }
    };

    const _STS_Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
    Scene_Menu.prototype.onPersonalOk = function() {
        _STS_Scene_Menu_onPersonalOk.call(this);
        switch (this._commandWindow.currentSymbol()) {
        case 'learn skill':
            SceneManager.push(Scene_STS);
            break;
        }
    };



    Scene_STS.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_STS.prototype.constructor = Scene_STS;

    Scene_STS.prototype.initialize = function() {
        ImageManager.nuun_LoadPictures(FTKR.STS.sFrame.image.name);
        Scene_MenuBase.prototype.initialize.call(this);
    };
    
    Scene_STS.prototype.start = function() {
        Scene_MenuBase.prototype.start.call(this);
        this.refreshActor();
    };

    Scene_STS.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createStsActorStatusWindow();
        this.createTreeTypeWindow();
        this.createSkillTreeWindow();
        this.createStsSkillStatusWindow();
        if (FTKR.STS.enableConf) {
            this.createStsConfTitleWindow();
            this.createStsConfWindow();
        }
        this.createStsCostWindow();
        this.createStsPreskillWindow();
    };

    Scene_STS.prototype.createStsActorStatusWindow = function() {
        const rect = this.stsActorStatusWindowRect();
        this._stsActorStatusWindow = new Window_StsActorStatus(rect);
        if (!!this._stsActorStatusWindow.reserveFaceImages) {
            this._stsActorStatusWindow.reserveFaceImages();
        }
        this.addWindow(this._stsActorStatusWindow);
    };

    Scene_STS.prototype.stsActorStatusWindowRect = function() {
        const wx = 0;
        const wy = this.mainAreaTop();
        const ww = 240;
        const wh = 144;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_STS.prototype.createTreeTypeWindow = function() {
        const rect = this.treeTypeWindowRect();
        this._stsTreeTypeWindow = new Window_TreeType(rect);
        const window = this._stsTreeTypeWindow;
        window.setHandler('ok',       this.onTreeTypeOk.bind(this));
        window.setHandler('cancel',   this.popScene.bind(this));
        window.setHandler('pagedown', this.nextActor.bind(this));
        window.setHandler('pageup',   this.previousActor.bind(this));
        this.addWindow(window);
        window.actSelect(0);
    };

    Scene_STS.prototype.treeTypeWindowRect = function() {
        const wx = 0;
        const wy = 144 + this.mainAreaTop();
        const ww = 240;
        const wh = 288;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_STS.prototype.createSkillTreeWindow = function() {
        const rect = this.skillTreeWindowRect();
        this._stsSkillTreeWindow = new Window_SkillTree(rect);
        const window = this._stsSkillTreeWindow;
        window.setHandler('ok',     this.onSkillTreeOk.bind(this));
        window.setHandler('cancel', this.onSkillTreeCancel.bind(this));
        this._stsTreeTypeWindow.setSkillTreeWindow(window);
        this.addWindow(window);
    };

    Scene_STS.prototype.skillTreeWindowRect = function() {
        const wx = 240;
        const wy = 144 + this.mainAreaTop();
        const ww = Graphics.boxWidth - wx;
        const wh = Graphics.boxHeight - wy;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_STS.prototype.createStsSkillStatusWindow = function() {
        const rect = this.stsSkillStatusWindowRect();
        this._stsStatusTitleWindow = new Window_StsSkillStatus(rect);
        const window = this._stsStatusTitleWindow;
        this._stsSkillTreeWindow.setStatusTitleWindow(window);
        this.addWindow(window);
    };

    Scene_STS.prototype.stsSkillStatusWindowRect = function() {
        const wx = 240;
        const wy = this.mainAreaTop();
        const ww = Graphics.boxWidth - wx;
        const wh = 144;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_STS.prototype.createStsConfTitleWindow = function() {
        const rect = this.stsConfTitleWindowRect();
        this._stsConfTitleWindow = new Window_StsConfTitle(rect);
        this.addWindow(this._stsConfTitleWindow);
    };

    Scene_STS.prototype.stsConfTitleWindowRect = function() {
        const wx = 204;
        const wy = 120 + this.mainAreaTop();
        const ww = 408;
        const wh = this._stsActorStatusWindow.fittingHeight(1);
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_STS.prototype.createStsConfWindow = function() {
        const rect = this.stsConfWindowRect();
        this._stsConfWindow = new Window_StsConf(rect);
        const window = this._stsConfWindow;
        window.setHandler('ok', this.onConfirmationOk.bind(this));
        window.setHandler('cancel', this.onConfirmationCancel.bind(this));
        this._stsSkillTreeWindow.setConfWindow(window);
        this.addWindow(window);
    };

    Scene_STS.prototype.stsConfWindowRect = function() {
        const ctw = this._stsConfTitleWindow;
        const wx = ctw.x;
        const wy = ctw.y + ctw.height;
        const ww = ctw.width;
        const wh = this._stsActorStatusWindow.fittingHeight(1);
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_STS.prototype.createStsCostWindow = function() {
        const rect = this.stsCostWindowRect();
        this._stsCostWindow = new Window_StsCost(rect);
        const window = this._stsCostWindow;
        this._stsSkillTreeWindow.setCostWindow(window);
        this.addWindow(window);
    };

    Scene_STS.prototype.stsCostWindowRect = function() {
        const wx = 0;
        const wy = 432 + this.mainAreaTop();
        const ww = 240;
        const wh = Graphics.boxHeight - wy;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_STS.prototype.createStsPreskillWindow = function() {
        const rect = this.stsPreskillWindowRect();
        this._stsPreskillWindow = new Window_StsPreskill(rect);
        const window = this._stsPreskillWindow;
        this._stsTreeTypeWindow.setPreskillWindow(window);
        this._stsSkillTreeWindow.setPreskillWindow(window);
        this.addWindow(window);
    };

    Scene_STS.prototype.stsPreskillWindowRect = function() {
        const wx = 204;
        const wy = 264 + this.mainAreaTop();
        const ww = 408;
        const wh = 216;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_STS.prototype.refreshActor = function() {
        const actor = this.actor();
        this._stsActorStatusWindow.setActor(actor);
        this._stsTreeTypeWindow.setActor(actor);
        this._stsStatusTitleWindow.setActor(actor);
        this._stsSkillTreeWindow.setActor(actor);
        const ctw = this._stsConfTitleWindow;
        if (ctw) {
            ctw.setActor(actor);
            ctw.hide();
        }
        const cfw = this._stsConfWindow;
        if (cfw) {
            cfw.setActor(actor);
            cfw.hide();
        }
        const csw = this._stsCostWindow;
        csw.setActor(actor);
        const psw = this._stsPreskillWindow;
        psw.setActor(actor);
        psw.hide();
    };

    Scene_STS.prototype.onActorChange = function() {
        this.refreshActor();
        this._stsTreeTypeWindow.actSelect(0);
    };

    Scene_STS.prototype.onTreeTypeOk = function() {
        this._stsSkillTreeWindow.actSelect(0);
    };

    Scene_STS.prototype.onSkillTreeOk = function() {
        const cfw = this._stsConfWindow;
        const stw = this._stsSkillTreeWindow;
        if (cfw) {
            const ctw = this._stsConfTitleWindow;
            ctw._skillId = stw._skillId;
            ctw.refresh();
            cfw.actSelect(0);
            this.stsConfShow();
            this._stsCostWindow.refresh();
            this._stsPreskillWindow.refresh();
        } else {
            this.stsLearnSkill(stw._skillId, stw._learnSound)
        }
    };

    Scene_STS.prototype.stsLearnSkill = function(skillId, sound) {
        const actor = this.actor();
        actor.stsLearnSkill(skillId);
        AudioManager.playStaticSe(sound);
        const stw = this._stsSkillTreeWindow;
        stw.actSelect(stw.index());
        this._stsActorStatusWindow.refresh();
        this._stsStatusTitleWindow.refresh();
        this._stsCostWindow.refresh();
        this._stsPreskillWindow.refresh();
    };

    Scene_STS.prototype.onSkillTreeCancel = function() {
        this._stsTreeTypeWindow.activate();
        this._stsSkillTreeWindow.deselect();
    };

    Scene_STS.prototype.onConfirmationOk = function() {
        const cfw = this._stsConfWindow;
        if (cfw.item().dicision) {
            cfw.deselect();
            this._stsConfTitleWindow.refresh();
            const stw = this._stsSkillTreeWindow;
            this.stsLearnSkill(stw._skillId, cfw._learnSound)
            this.stsConfHide();
        } else {
            this.onConfirmationCancel();
        }
    };

    Scene_STS.prototype.onConfirmationCancel = function() {
        this._stsConfWindow.deselect();
        var stw = this._stsSkillTreeWindow;
        stw.actSelect(stw.index());
        this.stsConfHide();
    };

    Scene_STS.prototype.stsConfHide = function() {
        this._stsConfWindow.hide();
        this._stsConfTitleWindow.hide();
        this._stsPreskillWindow.hide();
    };

    Scene_STS.prototype.stsConfShow = function() {
        this._stsConfWindow.show();
        this._stsConfTitleWindow.show();
        this._stsPreskillWindow.show();
    };

    Scene_STS.prototype.update = function() {
        Scene_MenuBase.prototype.update.call(this);
        if (this.isAllWindowDeactive()) this._stsTreeTypeWindow.activate();
    };

    Scene_STS.prototype.isAllWindowDeactive = function() {
        return this._stsConfWindow ? 
            (this._stsConfWindow.active !== true && 
            this._stsSkillTreeWindow.active !== true &&
            this._stsTreeTypeWindow.active !== true) :
            (this._stsTreeTypeWindow.active !== true && 
            this._stsSkillTreeWindow.active !== true);
    };

})();