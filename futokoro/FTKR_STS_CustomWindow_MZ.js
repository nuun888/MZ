//=============================================================================
// ツリー型スキル習得システム用 ウィンドウレイアウト変更プラグイン
// FTKR_STS_CustomWindow.js
// プラグインNo : 13
// 作成者     : フトコロ(futokoro)
// 作成日     : 2017/03/31
// 最終更新日 : 2018/09/08
// バージョン : v1.3.1
//=============================================================================
/*:
 * @target MZ
 * @plugindesc ツリー型スキル習得システム用 ウィンドウレイアウト変更プラグイン
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @url https://github.com/futokoro/RPGMaker/blob/master/FTKR_STS_CustomWindow.ja.md
 * @version 2.0.0
 * 
 * @help
 * 本プラグインは、ツリー型のスキル習得システム用の拡張プラグインです。
 * 
 * 本プラグインにより、スキル習得システムの専用画面のウィンドウレイアウトを
 * 変更することができます。
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
 * 本プラグインについて
 * 本プラグインはフトコロ様FTKR_STS_CustomWindowをMZ用に改変したプラグインです。
 * 原則、要望は受け付けておりません。
 * 
 * 更新履歴
 * 2024/8/18 Ver.2.0.0
 * 初版
 * 
 * 
 * @param TreeTypesWindowSetting
 * @text ツリータイプウィンドウの設定
 * @default ------------------------------
 * 
 * @param TreeTypesMaxCols
 * @desc ツリータイプを横に並べられる数
 * @text ツリータイプ列数
 * @type number
 * @default 1
 * @parent TreeTypesWindowSetting
 * 
 * @param TreeTypesHeightSpace
 * @desc ツリータイプの縦のコマンド間隔
 * @text コマンド間隔
 * @type number
 * @default 0
 * @parent TreeTypesWindowSetting
 * 
 * @param TreeTypesPositionX
 * @desc ツリータイプウィンドウの左上のX座標を指定します。(参考値：デフォルト画面幅サイズ = 816)
 * @text ツリータイプウィンドウX座標
 * @type number
 * @default 0
 * @parent TreeTypesWindowSetting
 *
 * @param TreeTypesPositionY
 * @desc ツリータイプウィンドウの左上のY座標を指定します。(参考値：デフォルト画面高さサイズ = 624)
 * @text ツリータイプウィンドウY座標
 * @type number
 * @default 144
 * @parent TreeTypesWindowSetting
 *
 * @param TreeTypesWidth
 * @desc ツリータイプウィンドウの幅を指定します。(参考値：余白 = 18) (-1 で、画面右端まで)
 * @text ツリータイプウィンドウ横幅
 * @type number
 * @default 240
 * @parent TreeTypesWindowSetting
 *
 * @param TreeTypesHeight
 * @desc ツリータイプウィンドウの高さを指定します。(参考値：1行 = 36、余白 = 18) (-1 で、画面下端まで)
 * @text ツリータイプウィンドウ高さ
 * @type number
 * @default 288
 * @parent TreeTypesWindowSetting
 *
 * @param TreeTypesOpacity
 * @desc ツリータイプウィンドウの透明率を指定します。
 * @text ツリータイプウィンドウ透明率
 * @type number
 * @default 192
 * @parent TreeTypesWindowSetting
 *
 * @param TreeTypesPadding
 * @desc ツリータイプウィンドウの余白幅を指定します。
 * @text ツリータイプウィンドウ余白幅
 * @type number
 * @default 18
 * @parent TreeTypesWindowSetting
 *
 * @param TreeTypesFrameHide
 * @desc ツリータイプウィンドウの枠を非表示にするか。
 * @text ツリータイプウィンドウ枠表示
 * @type boolean
 * @default false
 * @parent TreeTypesWindowSetting
 * 
 * @param SkillTreeWindowSetting
 * @text スキルツリーウィンドウの設定
 * @default ------------------------------
 *
 * @param SkillTreePositionX
 * @desc スキルツリーウィンドウの左上のX座標を指定します。(参考値：デフォルト画面幅サイズ = 816)
 * @text スキルツリーウィンドウX座標
 * @type number
 * @default 240
 * @parent SkillTreeWindowSetting
 *
 * @param SkillTreePositionY
 * @desc スキルツリーウィンドウの左上のY座標を指定します。(参考値：デフォルト画面高さサイズ = 624)
 * @text スキルツリーウィンドウY座標
 * @type number
 * @default 144
 * @parent SkillTreeWindowSetting
 *
 * @param SkillTreeWidth
 * @desc スキルツリーウィンドウの幅を指定します。(参考値：余白 = 18) (-1 で、画面右端まで)
 * @text スキルツリーウィンドウ横幅
 * @type number
 * @default -1
 * @parent SkillTreeWindowSetting
 *
 * @param SkillTreeHeight
 * @desc スキルツリーウィンドウの高さを指定します。(参考値：1行 = 36、余白 = 18) (-1 で、画面下端まで)
 * @text スキルツリーウィンドウ高さ
 * @type number
 * @default -1
 * @parent SkillTreeWindowSetting
 *
 * @param SkillTreeOpacity
 * @desc スキルツリーウィンドウの透明率を指定します。
 * @text スキルツリーウィンドウ透明率
 * @type number
 * @default 192
 * @parent SkillTreeWindowSetting
 *
 * @param SkillTreePadding
 * @desc スキルツリーウィンドウの余白幅を指定します。
 * @text スキルツリーウィンドウ余白幅
 * @type number
 * @default 18
 * @parent SkillTreeWindowSetting
 *
 * @param SkillTreeFrameHide
 * @desc スキルツリーウィンドウの枠を非表示にするか。
 * @text スキルツリーウィンドウ枠非表示
 * @type boolean
 * @default false
 * @parent SkillTreeWindowSetting
 * 
 * @param SkillStatusWindowSetting
 * @text スキル説明ウィンドウの設定
 * @default ------------------------------
 * 
 * @param SkillStatusPositionX
 * @desc スキルステータスウィンドウの左上のX座標を指定します。(参考値：デフォルト画面幅サイズ = 816)
 * @text スキルステータスウィンドウX座標
 * @type number
 * @default 240
 * @parent SkillStatusWindowSetting
 *
 * @param SkillStatusPositionY
 * @desc スキルステータスウィンドウの左上のY座標を指定します。(参考値：デフォルト画面高さサイズ = 624)
 * @text スキルステータスウィンドウY座標
 * @type number
 * @default 0
 * @parent SkillStatusWindowSetting
 *
 * @param SkillStatusWidth
 * @desc スキルステータスウィンドウの幅を指定します。(参考値：余白 = 18) (-1 で、画面右端まで)
 * @text スキルステータスウィンドウ横幅
 * @type number
 * @default -1
 * @parent SkillStatusWindowSetting
 *
 * @param SkillStatusHeight
 * @desc スキルステータスウィンドウの高さを指定します。(参考値：1行 = 36、余白 = 18) (-1 で、画面下端まで)
 * @text スキルステータスウィンドウ高さ
 * @type number
 * @default 144
 * @parent SkillStatusWindowSetting
 *
 * @param SkillStatusOpacity
 * @desc スキルステータスウィンドウの透明率を指定します。
 * @text スキルステータスウィンドウ透明率
 * @type number
 * @default 192
 * @parent SkillStatusWindowSetting
 *
 * @param SkillStatusPadding
 * @desc スキルステータスウィンドウの余白幅を指定します。
 * @text スキルステータスウィンドウ余白幅
 * @type number
 * @default 18
 * @parent SkillStatusWindowSetting
 *
 * @param SkillStatusFrameHide
 * @desc スキルステータスウィンドウの枠を非表示にするか。
 * @text スキルステータスウィンドウ枠非表示
 * @type boolean
 * @default false
 * @parent SkillStatusWindowSetting
 *
 * @param ActorStatusWindowSetting
 * @text アクターステータスウィンドウの設定
 * @default ------------------------------
 * 
 * @param ActorStatusPositionX
 * @desc アクターステータスウィンドウの左上のX座標を指定します。(参考値：デフォルト画面幅サイズ = 816)
 * @text アクターステータスウィンドウX座標
 * @type number
 * @default 0
 * @parent ActorStatusWindowSetting
 *
 * @param ActorStatusPositionY
 * @desc アクターステータスウィンドウの左上のY座標を指定します。(参考値：デフォルト画面高さサイズ = 624)
 * @text アクターステータスウィンドウY座標
 * @type number
 * @default 0
 * @parent ActorStatusWindowSetting
 *
 * @param ActorStatusWidth
 * @desc アクターステータスウィンドウの幅を指定します。(参考値：余白 = 18) (-1 で、画面右端まで)
 * @text アクターステータスウィンドウ横幅
 * @type number
 * @default 240
 * @parent ActorStatusWindowSetting
 *
 * @param ActorStatusHeight
 * @desc アクターステータスウィンドウの高さを指定します。(参考値：1行 = 36、余白 = 18) (-1 で、画面下端まで)
 * @text アクターステータスウィンドウ高さ
 * @type number
 * @default 144
 * @parent ActorStatusWindowSetting
 *
 * @param ActorStatusOpacity
 * @desc アクターステータスウィンドウの透明率を指定します。
 * @text アクターステータスウィンドウ透明率
 * @type number
 * @default 192
 * @parent ActorStatusWindowSetting
 *
 * @param ActorStatusPadding
 * @desc アクターステータスウィンドウの余白幅を指定します。
 * @text アクターステータスウィンドウ余白幅
 * @type number
 * @default 18
 * @parent ActorStatusWindowSetting
 *
 * @param ActorStatusFrameHide
 * @desc アクターステータスウィンドウの枠を非表示にするか。
 * @text アクターステータスウィンドウ枠非表示
 * @type boolean
 * @default false
 * @parent ActorStatusWindowSetting
 *
 * @param CostWindowSetting
 * @text コストウィンドウの設定
 * @default ------------------------------
 * 
 * @param AlwaysDisplayCost
 * @desc コストに常に表示するか。
 * @text コスト常時表示
 * @default 1
 * @type select
 * @option 表示しない(選択時のみ表示)
 * @value 0
 * @option 表示する
 * @value 1
 * @option 表示しない(常時)
 * @value 2
 * @parent CostWindowSetting
 *
 * @param CostMaxCols
 * @desc コストを横に並べる最大数を指定します。
 * @text コスト列最大数
 * @type number
 * @default 1
 * @parent CostWindowSetting
 *
 * @param CostSpacing
 * @desc コストを横に並べた時の間隔を指定します。
 * @text コスト列間隔
 * @type number
 * @default 24
 * @parent CostWindowSetting
 *
 * @param CostPositionX
 * @desc コストウィンドウの左上のX座標を指定します。(参考値：デフォルト画面幅サイズ = 816)
 * @text コストウィンドウX座標
 * @type number
 * @default 0
 * @parent CostWindowSetting
 *
 * @param CostPositionY
 * @desc コストウィンドウの左上のY座標を指定します。(参考値：デフォルト画面高さサイズ = 624)
 * @text コストウィンドウY座標
 * @type number
 * @default 432
 * @parent CostWindowSetting
 *
 * @param CostWidth
 * @desc コストウィンドウの幅を指定します。(参考値：余白 = 18) (-1 で、画面右端まで)
 * @text コストウィンドウ横幅
 * @type number
 * @default 240
 * @parent CostWindowSetting
 *
 * @param CostHeight
 * @desc コストウィンドウの高さを指定します。(参考値：1行 = 36、余白 = 18) (-1 で、画面下端まで)
 * @text コストウィンドウ高さ
 * @type number
 * @default -1
 * @parent CostWindowSetting
 *
 * @param CostOpacity
 * @desc コストウィンドウの透明率を指定します。
 * @text コストウィンドウ透明率
 * @type number
 * @default 192
 * @parent CostWindowSetting
 *
 * @param CostPadding
 * @desc コストウィンドウの余白幅を指定します。
 * @text コストウィンドウ余白幅
 * @type number
 * @default 18
 * @parent CostWindowSetting
 *
 * @param CostFrameHide
 * @desc コストウィンドウの枠を非表示にするか。
 * @text コストウィンドウ枠非表示
 * @type boolean
 * @default false
 * @parent CostWindowSetting
 * 
 * @param PreSkillWindowSetting
 * @text 前提スキルウィンドウの設定
 * @default ------------------------------
 * 
 * @param AlwaysDisplayPreskill
 * @desc 前提スキルに常に表示するか。
 * @text コストウィンドウ枠非表示
 * @default 0
 * @type select
 * @option 表示しない(選択時のみ表示)
 * @value 0
 * @option 表示する
 * @value 1
 * @option 表示しない(常時)
 * @value 2
 * @parent PreSkillWindowSetting
 *
 * @param PreskillMaxCols
 * @desc 前提スキルを横に並べる最大数を指定します。
 * @text 前提スキルウィンドウ列最大数
 * @type number
 * @default 1
 * @parent PreSkillWindowSetting
 *
 * @param PreskillSpacing
 * @desc 前提スキルを横に並べた時の間隔を指定します。
 * @text 前提スキルウィンドウ横間隔
 * @type number
 * @default 24
 * @parent PreSkillWindowSetting
 *
 * @param PreskillPositionX
 * @desc 前提スキルウィンドウの左上のX座標を指定します。(参考値：デフォルト画面幅サイズ = 816)
 * @text 前提スキルウィンドウX座標
 * @type number
 * @default 204
 * @parent PreSkillWindowSetting
 *
 * @param PreskillPositionY
 * @desc 前提スキルウィンドウの左上のY座標を指定します。(参考値：デフォルト画面高さサイズ = 624)
 * @text 前提スキルウィンドウY座標
 * @type number
 * @default 264
 * @parent PreSkillWindowSetting
 *
 * @param PreskillWidth
 * @desc 前提スキルウィンドウの幅を指定します。(参考値：余白 = 18) (-1 で、画面右端まで)
 * @text 前提スキルウィンドウ横幅
 * @type number
 * @default 408
 * @parent PreSkillWindowSetting
 *
 * @param PreskillHeight
 * @desc 前提スキルウィンドウの高さを指定します。(参考値：1行 = 36、余白 = 18) (-1 で、画面下端まで)
 * @text 前提スキルウィンドウ高さ
 * @type number
 * @default 216
 * @parent PreSkillWindowSetting
 *
 * @param PreskillOpacity
 * @desc 前提スキルウィンドウの透明率を指定します。
 * @text 前提スキルウィンドウ透明率
 * @type number
 * @default 192
 * @parent PreSkillWindowSetting
 *
 * @param PreskillPadding
 * @desc 前提スキルウィンドウの余白幅を指定します。
 * @text 前提スキルウィンドウ余白幅
 * @type number
 * @default 18
 * @parent PreSkillWindowSetting
 *
 * @param PreskillFrameHide
 * @desc 前提スキルウィンドウの枠を非表示にするか。
 * @text 前提スキルウィンドウ枠非表示
 * @type boolean
 * @default false
 * @parent PreSkillWindowSetting
 *
 * @param ConfirmationWindowSetting
 * @text 確認ウィンドウの設定
 * @default ------------------------------
 * 
 * @param ConfTitlePositionX
 * @desc 確認ウィンドウの左上のX座標を指定します。(参考値：デフォルト画面幅サイズ = 816)
 * @text 確認ウィンドウX座標
 * @type number
 * @default 204
 * @parent ConfirmationWindowSetting
 *
 * @param ConfTitlePositionY
 * @desc 確認ウィンドウの左上のY座標を指定します。(参考値：デフォルト画面高さサイズ = 624)
 * @text 確認ウィンドウY座標
 * @type number
 * @default 120
 * @parent ConfirmationWindowSetting
 *
 * @param ConfTitleWidth
 * @desc 確認ウィンドウの幅を指定します。(参考値：余白 = 18) (-1 で、画面右端まで)
 * @text 確認ウィンドウ横幅
 * @type number
 * @default 408
 * @parent ConfirmationWindowSetting
 *
 * @param ConfTitleHeight
 * @desc 確認ウィンドウの高さを指定します。(参考値：余白 = 18) (-1 で、画面右端まで)
 * @text 確認ウィンドウ高さ
 * @type number
 * @default 72
 * @parent ConfirmationWindowSetting
 *
 * @param ConfTitleOpacity
 * @desc 確認ウィンドウの透明率を指定します。
 * @text 確認ウィンドウ透明率
 * @type number
 * @default 192
 * @parent ConfirmationWindowSetting
 *
 * @param ConfTitlePadding
 * @desc 確認ウィンドウの余白幅を指定します。
 * @text 確認ウィンドウ余白幅
 * @type number
 * @default 18
 * @parent ConfirmationWindowSetting
 *
 * @param ConfTitleFrameHide
 * @desc 確認ウィンドウの枠を非表示にするか。
 * @text 確認ウィンドウ枠非表示
 * @type boolean
 * @default false
 * @parent ConfirmationWindowSetting
 *
 * @param ConfirmationCommandWindowSetting
 * @text 確認コマンドウィンドウの設定
 * @default ------------------------------
 * 
 * @param ConfirmationOpacity
 * @desc 確認コマンドウィンドウの透明率を指定します。
 * @text 確認コマンドウィンドウ透明率
 * @type number
 * @default 192
 * @parent ConfirmationCommandWindowSetting
 *
 * @param ConfirmationPadding
 * @desc 確認コマンドウィンドウの余白幅を指定します。
 * @text 確認コマンドウィンドウ余白幅
 * @type number
 * @default 18
 * @parent ConfirmationCommandWindowSetting
 *
 * @param ConfirmationFrameHide
 * @desc 確認コマンドウィンドウの枠を非表示にするか。
 * @text 確認コマンドウィンドウ枠非表示
 * @type boolean
 * @default false
 * @parent ConfirmationCommandWindowSetting
 *
 * @param TreeTitleWindowSetting
 * @text ツリータイトルウィンドウの設定
 * @default ------------------------------
 * 
 * @param TreeTitleFormat
 * @desc ツリータイトルウィンドウの表示内容を設定します。制御文字が使用可能です。空欄の場合はウィンドウを表示しません。
 * @text ツリータイトルウィンドウ表示内容
 * @type string
 * @default 
 * @parent TreeTitleWindowSetting
 *
 * @param TreeTitlePositionX
 * @desc ツリータイトルウィンドウの左上のX座標を指定します。(参考値：デフォルト画面幅サイズ = 816)
 * @text ツリータイトルウィンドウX座標
 * @type number
 * @default 
 * @parent TreeTitleWindowSetting
 *
 * @param TreeTitlePositionY
 * @desc ツリータイトルウィンドウの左上のY座標を指定します。(参考値：デフォルト画面高さサイズ = 624)
 * @text ツリータイトルウィンドウY座標
 * @type number
 * @default 
 * @parent TreeTitleWindowSetting
 *
 * @param TreeTitleWidth
 * @desc ツリータイトルウィンドウの幅を指定します。(参考値：余白 = 18) (-1 で、画面右端まで)
 * @text ツリータイトルウィンドウ横幅
 * @type number
 * @default 
 * @parent TreeTitleWindowSetting
 *
 * @param TreeTitleHeight
 * @desc ツリータイトルウィンドウの高さを指定します。(参考値：余白 = 18) (-1 で、画面右端まで)
 * @text ツリータイトルウィンドウ高さ
 * @type number
 * @default 
 * @parent TreeTitleWindowSetting
 *
 * @param TreeTitleOpacity
 * @desc ツリータイトルウィンドウの透明率を指定します。
 * @text ツリータイトルウィンドウ透明率
 * @type number
 * @default 192
 * @parent TreeTitleWindowSetting
 *
 * @param TreeTitlePadding
 * @desc ツリータイトルウィンドウの余白幅を指定します。
 * @text ツリータイトルウィンドウ余白幅
 * @type number
 * @default 18
 * @parent TreeTitleWindowSetting
 *
 * @param TreeTitleFrameHide
 * @desc ツリータイトルウィンドウの枠を非表示にするか。
 * @text ツリータイトルウィンドウ枠非表示
 * @type boolean
 * @default false
 * @parent TreeTitleWindowSetting
 *
 * @param BackgroundSetting
 * @text 背景設定の設定
 * @default ------------------------------
 * 
 * @param BackgroundImageName
 * @desc 背景に使用する画像ファイル名を指定します。
 * @text 背景画像
 * @default 
 * @dir img/
 * @type file
 * @parent BackgroundSetting
 * 
 * @param BackUiWidth
 * @text 背景サイズモード
 * @desc 背景サイズをUIに合わせる。
 * @type boolean
 * @default true
 * @parent BackGroundSetting
 *
 */

var Imported = Imported || {};
Imported.FTKR_STS_CustomWindow_MZ = true;

var FTKR = FTKR || {};
FTKR.STS = FTKR.STS || {};
FTKR.STS.CW = FTKR.STS.CW || {};

function Window_SkillTreeTitle() {
    this.initialize.apply(this, arguments);
}

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const parameters = PluginManager.parameters('FTKR_STS_CustomWindow_MZ');

    FTKR.STS.CW.alwaysDispCost     = params.AlwaysDisplayCost || 0;
    FTKR.STS.CW.alwaysDispPreskill = params.AlwaysDisplayPreskill || 0;

    //背景設定
    FTKR.STS.CW.background = {
        name    :params.BackgroundImageName || '',
        mode    :params.BackUiWidth,
    };

    //ツリータイプウィンドウ設定
    FTKR.STS.CW.treeTypes = {
        maxCols :params.TreeTypesMaxCols || 0,
        hspace  :params.TreeTypesHeightSpace || 0,
        posiX   :params.TreeTypesPositionX || 0,
        posiY   :params.TreeTypesPositionY || 0,
        width   :params.TreeTypesWidth || 0,
        height  :params.TreeTypesHeight || 0,
        opacity :params.TreeTypesOpacity || 0,
        padding :params.TreeTypesPadding || 0,
        frame   :params.TreeTypesFrameHide,
    };
    //スキルツリーウィンドウ設定
    FTKR.STS.CW.skillTree = {
        posiX   :params.SkillTreePositionX || 0,
        posiY   :params.SkillTreePositionY || 0,
        width   :params.SkillTreeWidth || 0,
        height  :params.SkillTreeHeight || 0,
        opacity :params.SkillTreeOpacity || 0,
        padding :params.SkillTreePadding || 0,
        frame   :params.SkillTreeFrameHide,
    };
    //スキルツリータイトルウィンドウ設定
    FTKR.STS.CW.treeTitle = {
        format  :params.TreeTitleFormat,
        posiX   :params.TreeTitlePositionX || 0,
        posiY   :params.TreeTitlePositionY || 0,
        width   :params.TreeTitleWidth || 0,
        height  :params.TreeTitleHeight || 0,
        opacity :params.TreeTitleOpacity || 0,
        padding :params.TreeTitlePadding || 0,
        frame   :params.TreeTitleFrameHide,
    };

    //スキルステータスウィンドウ設定
    FTKR.STS.CW.skillStatus = {
        posiX   :params.SkillStatusPositionX || 0,
        posiY   :params.SkillStatusPositionY || 0,
        width   :params.SkillStatusWidth || 0,
        height  :params.SkillStatusHeight || 0,
        opacity :params.SkillStatusOpacity || 0,
        padding :params.SkillStatusPadding || 0,
        frame   :params.SkillStatusFrameHide,
    };
    //アクターステータスウィンドウ設定
    FTKR.STS.CW.actorStatus = {
        posiX   :params.ActorStatusPositionX || 0,
        posiY   :params.ActorStatusPositionY || 0,
        width   :params.ActorStatusWidth || 0,
        height  :params.ActorStatusHeight || 0,
        opacity :params.ActorStatusOpacity || 0,
        padding :params.ActorStatusPadding || 0,
        frame   :params.ActorStatusFrameHide,
    };
    //コストウィンドウ設定
    FTKR.STS.CW.cost = {
        maxCols :params.CostMaxCols || 0,
        spacing :params.CostSpacing || 0,
        posiX   :params.CostPositionX || 0,
        posiY   :params.CostPositionY || 0,
        width   :params.CostWidth || 0,
        height  :params.CostHeight || 0,
        opacity :params.CostOpacity || 0,
        padding :params.CostPadding || 0,
        frame   :params.CostFrameHide,
    };
    //前提スキルウィンドウ設定
    FTKR.STS.CW.preskill = {
        maxCols :params.PreskillMaxCols || 0,
        spacing :params.PreskillSpacing || 0,
        posiX   :params.PreskillPositionX || 0,
        posiY   :params.PreskillPositionY || 0,
        width   :params.PreskillWidth || 0,
        height  :params.PreskillHeight || 0,
        opacity :params.PreskillOpacity || 0,
        padding :params.PreskillPadding || 0,
        frame   :params.PreskillFrameHide,
    };
    //確認ウィンドウ設定
    FTKR.STS.CW.confTitle = {
        posiX   :params.ConfTitlePositionX || 0,
        posiY   :params.ConfTitlePositionY || 0,
        width   :params.ConfTitleWidth || 0,
        height  :params.ConfTitleHeight || 0,
        opacity :params.ConfTitleOpacity || 0,
        padding :params.ConfTitlePadding || 0,
        frame   :params.ConfTitleFrameHide,
    };
    //確認コマンドウィンドウ設定
    FTKR.STS.CW.conf = {
        opacity :params.ConfirmationOpacity || 0,
        padding :params.ConfirmationPadding || 0,
        frame   :params.ConfirmationFrameHide,
    };


    FTKR.STS.CW.DatabaseLoaded = false;
    FTKR.STS.CW.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!FTKR.STS.CW.DataManager_isDatabaseLoaded.call(this)) return false;
        if (!FTKR.STS.CW.DatabaseLoaded) {
            this.stsBgiDataNotetags($dataActors);
            FTKR.STS.CW.DatabaseLoaded = true;
        }
        return true;
    };

    DataManager.stsBgiDataNotetags = function(group) {
        const note1a = /<STS_IMAGE:(.+)>/i;
        const note1aj = /<STS_画像:(.+)>/i;
        const note1b = /<\/STS_IMAGE>/i;
        const note1bj = /<\/STS_画像>/i;

        for (let n = 1; n < group.length; n++) {
            const obj = group[n];
            const notedata = obj.note.split(/[\r\n]+/);

            let setMode = 'none';
            obj.sts.bgi = {
            name:'',
            offsetX:0,
            offsetY:0,
            };
            for (let i = 0; i < notedata.length; i++) {
                const line = notedata[i];
                if (line.match(note1a) || line.match(note1aj)) {
                    var text = '';
                    setMode = 'data';
                    obj.sts.bgi.name = RegExp.$1;
                } else if (note1b.test(line) || note1bj.test(line)) {
                    setMode = 'none';
                    obj.sts.data = text;
                } else if (setMode === 'data') {
                    text += line + ';';
                }
            }
            this.setStsBgiData(obj);
        }
    };

    DataManager.setStsBgiData = function(obj) {
        const stsdata = obj.sts.data;
        if (stsdata) {
            const case2 = /(?:BGI OFFSET X):[ ]*(\d+)/i;
            const case3 = /(?:BGI OFFSET Y):[ ]*(\d+)/i;

            const datas = stsdata.split(';');
            for (let i = 0; i < datas.length; i++) {
                const data = datas[i];
                if(data.match(case2)) {
                    obj.sts.bgi.offsetX = Number(RegExp.$1);
                } else if(data.match(case3)) {
                    obj.sts.bgi.offsetY = Number(RegExp.$1);
                }
            }
            obj.sts.data = '';
        }
    };

    //=============================================================================
    // Game_Actor
    //=============================================================================

    FTKR.STS.CW.Game_Actor_setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function(actorId) {
        FTKR.STS.CW.Game_Actor_setup.call(this, actorId);
        ImageManager.nuun_LoadPictures(this.actor().sts.bgi.name);
    };

    //=============================================================================
    // Scene_STS
    //=============================================================================

    Scene_STS.prototype.createBackground = function() {
        this._backgroundSprite = new Sprite();
        const bgiName = FTKR.STS.CW.background.name;
        this._backgroundSprite.bitmap = bgiName ? ImageManager.nuun_LoadPictures(bgiName) : SceneManager.backgroundBitmap();
        this.addChild(this._backgroundSprite);
        this._contents = new Sprite();
        this.addChild(this._contents);
        this._backgroundSprite.bitmap.addLoadListener(function() {
            this.setBackGround(this._backgroundSprite);
        }.bind(this));
    };

    Scene_STS.prototype.setBackGround = function(sprite) {
        if (FTKR.STS.CW.background.mode) {
            sprite.x = (Graphics.width - (Graphics.boxWidth + 8)) / 2;
            sprite.y = (Graphics.height - (Graphics.boxHeight + 8)) / 2;
            sprite.scale.x = (Graphics.boxWidth + 8 !== sprite.bitmap.width ? (Graphics.boxWidth + 8) / sprite.bitmap.width : 1);
            sprite.scale.y = (Graphics.boxHeight + 8 !== sprite.bitmap.height ? (Graphics.boxHeight + 8) / sprite.bitmap.height : 1);
        } else {
            sprite.scale.x = (Graphics.width !== sprite.bitmap.width ? Graphics.width / sprite.bitmap.width : 1);
            sprite.scale.y = (Graphics.height !== sprite.bitmap.height ? Graphics.height / sprite.bitmap.height : 1);
        }
    };

    FTKR.STS.CW.Scene_STS_refreshActor = Scene_STS.prototype.refreshActor;
    Scene_STS.prototype.refreshActor = function() {
        FTKR.STS.CW.Scene_STS_refreshActor.call(this);
        const actor = this.actor();
        if (actor) {
            const bgi = actor.actor().sts.bgi;
            if (bgi.name) {
                this._contents.bitmap = ImageManager.loadSystem(bgi.name);
                this._contents.move(bgi.offsetX, bgi.offsetY);
            }
        }
        if(FTKR.STS.CW.alwaysDispCost !== 1) this._stsCostWindow.hide();
        if(FTKR.STS.CW.alwaysDispPreskill == 1) this._stsPreskillWindow.show();
    };

    Scene_STS.prototype.stsConfHide = function() {
        this._stsConfWindow.hide();
        this._stsConfTitleWindow.hide();
        if(FTKR.STS.CW.alwaysDispCost !== 1) {
            this._stsCostWindow.hide();
        }
        if(FTKR.STS.CW.alwaysDispPreskill !== 1) {
            this._stsPreskillWindow.hide();
        }
    };

    Scene_STS.prototype.stsConfShow = function() {
        this._stsConfWindow.show();
        this._stsConfTitleWindow.show();
        if(!FTKR.STS.CW.alwaysDispCost) {
            this._stsCostWindow.show();
        }
        if(!FTKR.STS.CW.alwaysDispPreskill) {
            this._stsPreskillWindow.show();
        }
    };

    const _Scene_STS_createSkillTreeWindow = Scene_STS.prototype.createSkillTreeWindow;
    Scene_STS.prototype.createSkillTreeWindow = function() {
        _Scene_STS_createSkillTreeWindow.call(this);
        if (FTKR.STS.CW.treeTitle.format) {
            this.createStsSkillTreeTitleWindow();
        }
    };

    Scene_STS.prototype.createStsSkillTreeTitleWindow = function() {
        const rect = this.stsSkillTreeTitleWindowRect();
        this._stsTreeTitleWindow = new Window_SkillTreeTitle(rect);
        this.addWindow(this._stsTreeTitleWindow);
    };

    Scene_STS.prototype.stsSkillTreeTitleWindowRect = function() {
        const wx = 0;
        const wy = 0;
        const ww = 0;
        const wh = 0;
        return new Rectangle(wx, wy, ww, wh);
    };
  
  
    //=============================================================================
    // Window_Base
    //=============================================================================

    Window_Base.prototype.setWubdiwLayout = function(layout) {
        this.x = layout.posiX;
        this.y = layout.posiY;
        this.width = layout.width === -1 ? Graphics.boxWidth - this.x : layout.width;
        this.height = layout.height === -1 ? Graphics.boxHeight - this.y : layout.height;
    };

    Window_Base.prototype.getWindowLayout = function(layout) {
        return {
            x:layout.posiX,
            y:layout.posiY,
            width:layout.width === -1 ? Graphics.boxWidth - layout.posiX : layout.width,
            height:layout.height === -1 ? Graphics.boxHeight - layout.posiY : layout.height,
        };
    };

    //=============================================================================
    // Window_TreeType
    //=============================================================================

    FTKR.STS.CW.Window_TreeType_initialize = Window_TreeType.prototype.initialize;
    Window_TreeType.prototype.initialize = function(rect) {
        const layout = this.getWindowLayout(FTKR.STS.CW.treeTypes);
        rect.x = layout.x;
        rect.y = layout.y;
        rect.width = layout.width;
        rect.height = layout.height;
        FTKR.STS.CW.Window_TreeType_initialize.call(this, rect);
    };

    Window_TreeType.prototype.itemHeightSpace = function() {
        return FTKR.STS.CW.treeTypes.hspace;
    };

    Window_TreeType.prototype.standardBackOpacity = function() {
        return FTKR.STS.CW.treeTypes.opacity;
    };

    Window_TreeType.prototype.standardPadding = function() {
        return FTKR.STS.CW.treeTypes.padding;
    };

    Window_TreeType.prototype.maxCols = function() {
    return Math.max(FTKR.STS.CW.treeTypes.maxCols, 1);
    };

    Window_TreeType.prototype._refreshFrame = function() {
        if (!FTKR.STS.CW.treeTypes.frame) Window.prototype._refreshFrame.call(this);
    };

    Window_TreeType.prototype.maxPageRows = function() {
        const pageHeight = this.height - this.padding * 2;
        return Math.floor(pageHeight / this.unitHeight());
    };

    Window_TreeType.prototype.topRow = function() {
        return Math.floor(this._scrollY / this.unitHeight());
    };

    Window_TreeType.prototype.setTopRow = function(row) {
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
    // Window_SkillTree
    //=============================================================================

    FTKR.STS.CW.Window_SkillTree_initialize = Window_SkillTree.prototype.initialize;
    Window_SkillTree.prototype.initialize = function(rect) {
        const layout = this.getWindowLayout(FTKR.STS.CW.skillTree);
        rect.x = layout.x;
        rect.y = layout.y;
        rect.width = layout.width;
        rect.height = layout.height;
        FTKR.STS.CW.Window_SkillTree_initialize.call(this, rect);
    };

    Window_SkillTree.prototype.standardBackOpacity = function() {
        return FTKR.STS.CW.skillTree.opacity;
    };

    Window_SkillTree.prototype.standardPadding = function() {
        return FTKR.STS.CW.skillTree.padding;
    };

    Window_SkillTree.prototype._refreshFrame = function() {
        if (!FTKR.STS.CW.skillTree.frame) Window.prototype._refreshFrame.call(this);
    };

    //=============================================================================
    // Window_StsSkillStatus
    //=============================================================================

    FTKR.STS.CW.Window_StsSkillStatus_initialize = Window_StsSkillStatus.prototype.initialize;
    Window_StsSkillStatus.prototype.initialize = function(rect) {
        const layout = this.getWindowLayout(FTKR.STS.CW.skillStatus);
        rect.x = layout.x;
        rect.y = layout.y;
        rect.width = layout.width;
        rect.height = layout.height;
        FTKR.STS.CW.Window_StsSkillStatus_initialize.call(this, rect);
    };

    Window_StsSkillStatus.prototype.standardBackOpacity = function() {
        return FTKR.STS.CW.skillStatus.opacity;
    };

    Window_StsSkillStatus.prototype.standardPadding = function() {
        return FTKR.STS.CW.skillStatus.padding;
    };

    Window_StsSkillStatus.prototype._refreshFrame = function() {
        if (!FTKR.STS.CW.skillStatus.frame) Window.prototype._refreshFrame.call(this);
    };

    //=============================================================================
    // Window_StsActorStatus
    //=============================================================================

    FTKR.STS.CW.Window_StsActorStatus_initialize = Window_StsActorStatus.prototype.initialize;
    Window_StsActorStatus.prototype.initialize = function(rect) {
        const layout = this.getWindowLayout(FTKR.STS.CW.actorStatus);
        rect.x = layout.x;
        rect.y = layout.y;
        rect.width = layout.width;
        rect.height = layout.height;
        FTKR.STS.CW.Window_StsActorStatus_initialize.call(this, rect);
    };

    Window_StsActorStatus.prototype.standardBackOpacity = function() {
        return FTKR.STS.CW.actorStatus.opacity;
    };

    Window_StsActorStatus.prototype.standardPadding = function() {
        return FTKR.STS.CW.actorStatus.padding;
    };

    Window_StsActorStatus.prototype._refreshFrame = function() {
        if (!FTKR.STS.CW.actorStatus.frame) Window.prototype._refreshFrame.call(this);
    };

    //=============================================================================
    // Window_StsCost
    //=============================================================================

    FTKR.STS.CW.Window_StsCost_initialize = Window_StsCost.prototype.initialize;
    Window_StsCost.prototype.initialize = function(rect) {
        const layout = this.getWindowLayout(FTKR.STS.CW.cost);
        rect.x = layout.x;
        rect.y = layout.y;
        rect.width = layout.width;
        rect.height = layout.height;
        FTKR.STS.CW.Window_StsCost_initialize.call(this, rect);
    };

    Window_StsCost.prototype.standardBackOpacity = function() {
        return FTKR.STS.CW.cost.opacity;
    };

    Window_StsCost.prototype.standardPadding = function() {
        return FTKR.STS.CW.cost.padding;
    };

    Window_StsCost.prototype._refreshFrame = function() {
        if (!FTKR.STS.CW.cost.frame) Window.prototype._refreshFrame.call(this);
    };

    Window_StsCost.prototype.drawCostValues = function(skill, x, y, width) {
        if (!this._skillId) return;
        const lh = this.lineHeight();
        const costs = skill.sts.costs;
        const cols = FTKR.STS.CW.cost.maxCols;
        const spacing = FTKR.STS.CW.cost.spacing;
        var cw = (width - spacing * (cols - 1))/ cols
        var cx = 0, cy = 0;
        for (let i = 0, n = 0; i< costs.length; i++) {
            const cost = costs[i];
            if (cost) {
                if (FTKR.STS.sp.hideCost0 && cost.type === 'sp' &&
                    (!cost.value || Number(cost.value) === 0)) {
                    n -= 1;
                    continue;
                }
                if (!((i + n) % cols)) {
                    cx = 0;
                    cy += 1;
                } else {
                    cx += cw + spacing;
                }
                FTKR.setGameData(this._actor, null, skill);
                this.drawStsCost(cost, x + cx, y + lh * (cy - 1), cw);
            }
        }
    };

    //=============================================================================
    // Window_StsPreskill
    //=============================================================================

    FTKR.STS.CW.Window_StsPreskill_initialize = Window_StsPreskill.prototype.initialize;
    Window_StsPreskill.prototype.initialize = function(rect) {
        const layout = this.getWindowLayout(FTKR.STS.CW.preskill);
        rect.x = layout.x;
        rect.y = layout.y;
        rect.width = layout.width;
        rect.height = layout.height;
        FTKR.STS.CW.Window_StsPreskill_initialize.call(this, rect);
    };

    Window_StsPreskill.prototype.standardBackOpacity = function() {
        return FTKR.STS.CW.preskill.opacity;
    };

    Window_StsPreskill.prototype.standardPadding = function() {
        return FTKR.STS.CW.preskill.padding;
    };

    Window_StsPreskill.prototype._refreshFrame = function() {
        if (!FTKR.STS.CW.preskill.frame) Window.prototype._refreshFrame.call(this);
    };

    Window_StsPreskill.prototype.drawPreSkills = function(x, y, width) {
        if (this._skillId && this._tTypeId) {
            const actor = this._actor;
            const lh = this.lineHeight();
            const preskillIds = actor.getPreskillId(this._skillId, this._tTypeId);
            const cols = FTKR.STS.CW.preskill.maxCols;
            const spacing = FTKR.STS.CW.preskill.spacing;
            var cw = (width - spacing * (cols - 1))/ cols
            var cx = 0, cy = 0;
            for (let i = 0; i< preskillIds.length; i++) {
                const preskill = actor.stsSkill(preskillIds[i]);
                if (preskill) {
                    if (!(i % cols)) {
                        cx = 0;
                        cy += 1;
                    } else {
                        cx += cw + spacing;
                    }
                    this.changePaintOpacity(actor.isStsLearnedSkill(preskill.id));
                    this.drawFormatTextEx(FTKR.STS.preskill.itemFormat, x + cx, y + lh * (cy - 1), [preskill.name], cw);
                    this.changePaintOpacity(1);
                }
            }
        }
    };

    //=============================================================================
    // Window_StsConfTitle
    //=============================================================================

    FTKR.STS.CW.Window_StsConfTitle_initialize = Window_StsConfTitle.prototype.initialize;
    Window_StsConfTitle.prototype.initialize = function(rect) {
        const layout = this.getWindowLayout(FTKR.STS.CW.confTitle);
        rect.x = layout.x;
        rect.y = layout.y;
        rect.width = layout.width;
        rect.height = layout.height;
        FTKR.STS.CW.Window_StsConfTitle_initialize.call(this, rect);
    };

    Window_StsConfTitle.prototype.standardBackOpacity = function() {
        return FTKR.STS.CW.confTitle.opacity;
    };

    Window_StsConfTitle.prototype.standardPadding = function() {
        return FTKR.STS.CW.confTitle.padding;
    };

    Window_StsConfTitle.prototype._refreshFrame = function() {
        if (!FTKR.STS.CW.confTitle.frame) Window.prototype._refreshFrame.call(this);
    };

    //=============================================================================
    // Window_StsConf
    //=============================================================================

    Window_StsConf.prototype.standardBackOpacity = function() {
        return FTKR.STS.CW.conf.opacity;
    };

    Window_StsConf.prototype.standardPadding = function() {
        return FTKR.STS.CW.conf.padding;
    };

    Window_StsConf.prototype._refreshFrame = function() {
        if (!FTKR.STS.CW.conf.frame) Window.prototype._refreshFrame.call(this);
    };

    //=============================================================================
    // Window_SkillTreeTitle
    //=============================================================================

    Window_SkillTreeTitle.prototype = Object.create(Window_Base.prototype);
    Window_SkillTreeTitle.prototype.constructor = Window_SkillTreeTitle;

    Window_SkillTreeTitle.prototype.initialize = function(rect) {
        const layout = this.getWindowLayout(FTKR.STS.CW.treeTitle);
        rect.x = layout.x;
        rect.y = layout.y;
        rect.width = layout.width;
        rect.height = layout.height;
        Window_Base.prototype.initialize.call(this, rect);
        this.refresh();
    };

    Window_SkillTreeTitle.prototype.standardBackOpacity = function() {
        return FTKR.STS.CW.treeTitle.opacity;
    };

    Window_SkillTreeTitle.prototype.standardPadding = function() {
        return FTKR.STS.CW.treeTitle.padding;
    };

    Window_SkillTreeTitle.prototype._refreshFrame = function() {
        if (!FTKR.STS.CW.treeTitle.frame) Window.prototype._refreshFrame.call(this);
    };

    Window_SkillTreeTitle.prototype.refresh = function () {
        this.contents.clear();
        this.drawStsText(FTKR.STS.CW.treeTitle.format);
    };

    Window_SkillTreeTitle.prototype.drawStsText = function(format) {
        //var width = this.width - this.standardPadding() * 2;
        this.drawTextEx(format, 0, 0);
    };
    
})();