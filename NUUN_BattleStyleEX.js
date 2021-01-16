/*:-----------------------------------------------------------------------------------
 * NUUN_BattleStyleEX.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 更新履歴
 * 2021/1/17 Ver 1.0.0
 * ベースプラグインとレイアウト設定用のプラグインを別々に分割。
 */
/*:
 * @target MZ
 * @plugindesc バトルスタイル拡張設定用
 * @author NUUN
 * @orderBefore NUUN_BattleStyleEX_Base
 * 
 * @help
 * このプラグインはレイアウト設定用のプラグインです。
 * バトルスタイルを変更するには「NUUN_BattleStyleEX_Base」をこのプラグインよりも下に配置してください。
 * 
 * 
 * バトルスタイルに以下の機能を実装します。
 * 　アクターの立ち絵を表示できるようになります。
 * 　戦闘不能時やダメージを受けた時、瀕死、勝利、詠唱時、ステートにかかっている時に顔グラフィック、立ち絵を変更可能
 * 　フロントビューでもアクター側にアニメーション、ダメージエフェクト表示可能
 * 　パーティコマンド、アクターコマンドの位置を指定可能
 *   各ゲージ長やステータスの位置を設定可能
 * 
 * 仕様
 * アクターステータスをコマンド非表示になった時に中央に移動しないように変更しています。
 * パーティコマンドは画面上部、画面上部からアクターステータス欄の中間、アクターステータス欄の上部
 * のいずれかから選択できます。TPBバトルでアクティブを選択している場合は、画面上部以外の選択を推奨いたします。
 * アクターコマンドは各アクターの上部に表示されます。
 * エネミーの座標によりダメージエフェクトがアクターのグラフィックに被り、表示が見えなくなる場合があります。
 * フロントビュー時のエフェクトはアクターのグラフィックの前面、アクターステータスの背面に表示されます。
 * 
 * 
 * 立ち絵を表示させたい場合は、プラグインパラメータから「アクターの画像設定」
 * を選択し、各アクターに表示させる画像を指定させてください。
 * デフォルトの画像が指定されてない場合は顔グラフィックが表示されます。
 * 戦闘不能時のアクター画像（顔グラ）を変えたくない場合（非表示）、同じ画像を（顔グラの場合はインデックス番号）を指定してください。
 * 
 * 顔グラフィックが８を超える場合は、複数の顔グラフィック画像を１つのファイルに結合してください。
 * （データベースのアクター設定の顔グラフィックでも反映されます）
 * ＊＊＊＊　元の顔グラフィック画像
 * ＊＊＊＊
 *    +
 * ＊＊＊＊　追加の顔グラフィック画像
 * ＊＊＊＊
 *    +
 * 顔グラのインデックス番号は左上から順に0,1,2,3となっています。
 * 
 * 各ステータスの位置を変更したい場合は、各項目の「〇〇の座標変更」をtureにしてください。
 * 
 * アクターステータスが２行以上になる場合で顔グラフィックを表示している場合は「顔グラフィックの座標変更」をtrueにしてください。
 * falseのままだと画像がつぶされて表示されなくなります。座標位置は基本いじらなくても表示されます。
 * 
 * アクターステータスのサイズを確認したい場合は、テスト戦闘を行い「DevTools」で確認できます。
 * 背景画像はアクターウィンドウ、アクターステータス背景ともにimg/systemに配置してください。
 * 
 * エネミーのメモ欄
 * <AttackAnimation:11>
 * エネミーの通常攻撃時、11番のアニメーションが再生されます。
 * 
 * ステートのメモ欄
 * <ChangeImgId:1>
 * 被ステート時に顔グラまたは、グラフィック画像がID１の画像に変化します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 
 * @parent ActorsButlers
 * 
 * @param Window
 * @text ウィンドウ設定
 * 
 * @param WindowShow
 * @desc アクターウィンドウを表示する。
 * @text アクターウィンドウ表示
 * @type boolean
 * @default true
 * @parent Window
 * 
 * @param WindowFrameShow
 * @desc アクターウィンドウ枠を表示する。
 * @text アクターウィンドウ枠表示
 * @type boolean
 * @default false
 * @parent Window
 * 
 * @param cursorBackShow
 * @desc アクター背景を表示する。
 * @text アクター背景表示
 * @type boolean
 * @default true
 * @parent Window
 * 
 * @param SelectBackShow
 * @desc アクターの行動選択時に表示されるアクター背景を表示する。
 * @text アクター行動時背景表示
 * @type boolean
 * @default true
 * @parent Window
 * 
 * @param windowBackground
 * @desc 背景画像ウィンドウを指定する。
 * @text 背景画像ウィンドウ
 * @type file
 * @dir img/system
 * @parent Window
 * 
 * @param ActorStatusWindowOnPosition
 * @desc アクターウィンドウ全体の座標の変更を許可します。
 * @text アクターウィンドウ座標変更許可
 * @type boolean
 * @default false
 * @parent Window
 * 
 * @param ActorStatusWindow_X
 * @desc アクターステータスウィンドウのX座標（絶対座標）を指定します。
 * @text ウィンドウのX座標（絶対座標）
 * @type number
 * @default 0
 * @min -9999
 * @parent Window
 * 
 * @param ActorStatusWindow_Y
 * @desc アクターステータスウィンドウのY座標（絶対座標）を指定します。
 * @text ウィンドウのY座標（絶対座標）
 * @type number
 * @default 0
 * @min -9999
 * @parent Window
 * 
 * @param ActorStatusWindow_Width
 * @desc アクターステータスウィンドウの横幅を指定します。
 * @text ウィンドウの横幅
 * @type number
 * @default 0
 * @max 9999
 * @min 0
 * @parent Window
 * 
 * @param ActorStatusWindow_Height
 * @desc アクターステータスウィンドウの縦幅を指定します。
 * @text ウィンドウの縦幅
 * @type number
 * @default 0
 * @max 9999
 * @min 0
 * @parent Window
 * 
 * @param ActorStatusWindowCenter
 * @text ウィンドウ中央表示
 * @desc ウィンドウを中央に表示させます。
 * @type boolean
 * @default true
 * @parent Window
 * 
 * @param ActorSelectBackShow
 * @desc アクターの対象選択時に表示されるアクター背景を表示する。
 * @text アクターの対象選択時背景表示
 * @type boolean
 * @default true
 * @parent Window
 * 
 * @param MessageWindowPosition
 * @text エネミー出現、リザルト、敗北、逃走メッセージ等上部表示
 * @desc エネミー出現、リザルト、敗北、逃走メッセージ等を画面上側に表示させます。
 * @type boolean
 * @default false
 * @parent Window
 * 
 * @param Opacity
 * @text 不透明度設定
 * 
 * @param ActorWindowSelectOpacity
 * @desc エネミー、アイテム、スキル選択画面を表示している時のアクターウィンドウの不透明度
 * @text 選択時ウィンドウ不透明度
 * @type number
 * @default 100
 * @max 255
 * @min 0
 * @parent Opacity
 * 
 * @param SkillWindowOpacity
 * @text スキル画面不透明度無効
 * @desc スキルウィンドウ表示時の不透明度を無効化します。
 * @type boolean
 * @default false
 * @parent Opacity
 * 
 * @param ItemWindowOpacity
 * @text アイテム画面不透明度無効
 * @desc アイテムウィンドウ表示時の不透明度を無効化します。
 * @type boolean
 * @default false
 * @parent Opacity
 * 
 * @param EnemyWindowOpacity
 * @text エネミー選択画面不透明度無効
 * @desc エネミー選択ウィンドウ表示時の不透明度を無効化します。
 * @type boolean
 * @default false
 * @parent Opacity
 * 
 * @param PartyCommand
 * @text パーティコマンド設定
 * 
 * @param PartyCommandPosition
 * @text パーティコマンドの表示位置
 * @desc パーティコマンドの表示位置を指定します。
 * @type select
 * @option 上部
 * @value 0
 * @option 中間
 * @value 1
 * @option アクターステータスウィンドウの上
 * @value 2
 * @desc エネミーのNo表示
 * @default 0
 * @parent PartyCommand
 * 
 * @param PartyCommandMaxRow
 * @desc 表示するコマンド行数。
 * @text 表示コマンド行数
 * @type number
 * @default 1
 * @min 1
 * @parent PartyCommand
 * 
 * @param PartyCommandMaxCol
 * @desc 表示するコマンド列数。
 * @text 表示コマンド列数
 * @type number
 * @default 4
 * @min 1
 * @parent PartyCommand
 * 
 * @param PartyCommandCenter
 * @text コマンド中央表示
 * @desc コマンドを中央に表示させます。
 * @type boolean
 * @default true
 * @parent PartyCommand
 * 
 * @param PartyCommand_X
 * @desc コマンドのX座標。
 * @text コマンドX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent PartyCommand
 * 
 * @param PartyCommand_Y
 * @desc コマンドのY座標。
 * @text コマンドY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent PartyCommand
 * 
 * @param PartyCommand_Width
 * @desc コマンドの横幅。
 * @text コマンド横幅
 * @type number
 * @default 0
 * @min 0
 * @parent PartyCommand
 * 
 * @param ActorCommand
 * @text アクターコマンド設定
 * 
 * @param ActorCommandMode
 * @text アクターコマンドの表示方法
 * @desc アクターコマンドの表示方法を選択します。
 * @type select
 * @option 各アクターの上
 * @value 0
 * @option 上部
 * @value 1
 * @option 中間
 * @value 2
 * @option アクターウィンドウの上
 * @value 3
 * @default 0
 * @parent ActorCommand
 * 
 * @param ActorCommandMaxRow
 * @desc 表示するコマンド行数。
 * @text 表示コマンド行数
 * @type number
 * @default 4
 * @min 1
 * @parent ActorCommand
 * 
 * @param ActorCommandMaxCol
 * @desc 表示するコマンド列数。
 * @text 表示コマンド列数
 * @type number
 * @default 1
 * @min 1
 * @parent ActorCommand
 * 
 * @param ActorCommandCenter
 * @text コマンド中央表示
 * @desc コマンドを中央に表示させます。
 * @type boolean
 * @default true
 * @parent ActorCommand
 * 
 * @param ActorCommand_X
 * @desc コマンドのX座標。
 * @text コマンドX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorCommand
 * 
 * @param ActorCommand_Y
 * @desc コマンドのY座標。
 * @text コマンドY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorCommand
 * 
 * @param ActorCommand_Width
 * @desc コマンドの横幅。
 * @text コマンド横幅
 * @type number
 * @default 0
 * @min 0
 * @parent ActorCommand
 * 
 * @param Effect
 * @text エフェクト設定
 * 
 * @param ActorEffectShow
 * @desc フロントビューでもエフェクトを表示。
 * @text フロントビューエフェクト表示
 * @type boolean
 * @default true
 * @parent Effect
 * 
 * @param ActorEffect_X
 * @desc アニメーションエフェクトのX座標（相対座標）。
 * @text アニメーションエフェクトX座標（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @parent Effect
 * 
 * @param ActorEffect_Y
 * @desc アニメーションエフェクトのY座標（相対座標）。
 * @text アニメーションエフェクトY座標（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @parent Effect
 * 
 * @param ActorDamage_X
 * @desc ダメージエフェクトのX座標（アニメーションエフェクトからの相対座標）。
 * @text ダメージエフェクトX座標（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @parent Effect
 * 
 * @param ActorDamage_Y
 * @desc ダメージエフェクトのY座標（アニメーションエフェクトからの相対座標）。
 * @text ダメージエフェクトY座標（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @parent Effect
 * 
 * @param ActorFlash
 * @desc アクター選択時にアクター画像（顔グラ）点滅させます。
 * @text アクター選択時点滅
 * @type boolean
 * @default true
 * @parent Effect
 * 
 * 
 * @param ActorStatus
 * @text アクター設定
 * 
 * @param ActorMaxCol
 * @desc 横に並べるアクター数。
 * @text 横アクター数
 * @type number
 * @default 0
 * @min 0
 * @parent ActorStatus
 * 
 * @param ActorMaxRow
 * @desc 縦に並べるアクター数。
 * @text 縦アクター数
 * @type number
 * @default 0
 * @min 0
 * @parent ActorStatus
 * 
 * @param ActorStatusMode
 * @text アクターステータス表示方法
 * @desc アクターステータスの表示方法を選択します。
 * @type select
 * @option 左寄り
 * @value 0
 * @option 中央
 * @value 1
 * @option 右寄り
 * @value 2
 * @default 1
 * @parent ActorStatus
 * 
 * @param actorBackground
 * @desc アクターの背景画像を指定します。
 * @text アクター背景画像
 * @type file
 * @dir img/system
 * @parent ActorStatus
 * 
 * @param ActorsButlers
 * @text アクターの画像設定
 * @parent ActorStatus
 * 
 * @param ActorsButlerList
 * @text 画像設定
 * @desc アクターの画像設定
 * @default []
 * @type struct<actorsButlerList>[]
 * @parent ActorsButlers
 * 
 * @param damageImgFrame
 * @desc ダメージ時の画像変化フレーム。
 * @text ダメージ時変化フレーム
 * @type number
 * @default 30
 * @min 1
 * @parent ActorsButlers
 * 
 * @param imgDeathHide
 * @desc 戦闘不能になった場合、アクター画像（顔グラ）を非表示にします。
 * @text 戦闘不能時アクター画像表示
 * @type boolean
 * @default true
 * @parent ActorsButlers
 * 
 * @param ActorNameChangePosition
 * @text アクター名位置設定（相対座標）
 * @desc 座標はアクターステータス(0, 0)からの相対座標です。
 * @parent ActorStatus
 * 
 * @param NameShow
 * @desc 名前を表示します。
 * @text 名前表示
 * @type boolean
 * @default true
 * @parent ActorNameChangePosition
 * 
 * @param NameChangePosition
 * @desc 名前の座標変更を許可する。
 * @text 名前の座標変更
 * @type boolean
 * @default false
 * @parent ActorNameChangePosition
 * 
 * @param ActorName_X
 * @desc 名前のX座標を設定します。名前の座標変更がTrueの場合のみ適用します。。
 * @text 名前X座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorNameChangePosition
 * 
 * @param ActorName_Y
 * @desc 名前のY座標を設定します。名前の座標変更がTrueの場合のみ適用します。（デフォルト88）
 * @text 名前Y座標
 * @type number
 * @default 88
 * @min -9999
 * @parent ActorNameChangePosition
 * 
 * @param ActorImgChangePosition
 * @text アクターグラフィック位置設定
 * @parent ActorStatus
 * 
 * @param ActorImg_X
 * @desc 画像のオフセットX座標（基準位置からの相対座標となります）
 * @text 画像オフセットX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorImgChangePosition
 * 
 * @param ActorImg_Y
 * @desc 画像のオフセットY座標（基準位置からの相対座標となります）
 * @text 画像オフセットY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorImgChangePosition
 * 
 * @param ActorFeceChangePosition
 * @text 顔グラフィック位置設定
 * @parent ActorImgChangePosition
 * 
 * @param FaceChangePosition
 * @desc 顔グラフィックの座標変更を許可します。アクターのピクチャ設定がされてないアクターのみ適用されます。
 * @text 顔グラフィックの座標変更
 * @type boolean
 * @default false
 * @parent ActorFeceChangePosition
 * 
 * @param ActorFace_X
 * @desc 顔グラフィックのX座標を設定します。顔グラフィックの座標変更がTrueの場合のみ適用します。
 * @text 顔グラフィックX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorFeceChangePosition
 * 
 * @param ActorFace_Y
 * @desc 顔グラフィックのY座標を設定します。顔グラフィックの座標変更がTrueの場合のみ適用します。
 * @text 顔グラフィックY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorFeceChangePosition
 * 
 * @param ActorFace_Width
 * @desc 顔グラフィックの横幅（0でデフォルト設定となります）
 * @text 顔グラフィック横幅
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorImgChangePosition
 * 
 * @param ActorFace_Height
 * @desc 顔グラフィックの縦幅（0でデフォルト設定となります）
 * @text 顔グラフィック縦幅
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorImgChangePosition
 * 
 * @param GaugeWidth
 * @desc HP,MP,TPゲージの最大横幅を指定します。（デフォルト128）
 * @text ゲージ最大横幅
 * @type number
 * @default 128
 * @min 0
 * @parent ActorStatus
 * 
 * @param ActorHPChangePosition
 * @text HP位置設定
 * @parent ActorStatus
 * 
 * @param HPGaugeWidth
 * @desc HPゲージの横幅を指定します。（デフォルト128）
 * @text HPゲージ横幅
 * @type number
 * @default 128
 * @min 0
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
 * @desc HPのX座標を設定します。HPの座標変更がTrueの場合のみ適用します。
 * @text HP_X座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorHPChangePosition
 * 
 * @param ActorHP_Y
 * @desc HPのY座標を設定します。HPの座標変更がTrueの場合のみ適用します。（デフォルト112）
 * @text HP_Y座標
 * @type number
 * @default 112
 * @min -9999
 * @parent ActorHPChangePosition
 * 
 * @param ActorMPChangePosition
 * @text MP位置設定
 * @parent ActorStatus
 * 
 * @param MPGaugeWidth
 * @desc MPゲージの横幅を指定します。（デフォルト128）
 * @text MPゲージ横幅
 * @type number
 * @default 128
 * @min 0
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
 * @desc MPのX座標を設定します。MPの座標変更がTrueの場合のみ適用します。
 * @text MP_X座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorMPChangePosition
 * 
 * @param ActorMP_Y
 * @desc MPのY座標を設定します。MPの座標変更がTrueの場合のみ適用します。（デフォルト136）
 * @text MP_Y座標
 * @type number
 * @default 136
 * @parent ActorMPChangePosition
 * 
 * @param ActorTPChangePosition
 * @text TP位置設定
 * @parent ActorStatus
 * 
 * @param TPGaugeWidth
 * @desc TPゲージの横幅を指定します。（デフォルト128）
 * @text TPゲージ横幅
 * @type number
 * @default 128
 * @min 0
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
 * @desc TPのX座標を設定します。TPの座標変更がTrueの場合のみ適用します。
 * @text TP_X座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorTPChangePosition
 * 
 * @param ActorTP_Y
 * @desc TPのY座標を設定します。TPの座標変更がTrueの場合のみ適用します。（デフォルト160）
 * @text TP_Y座標
 * @type number
 * @default 160
 * @min -9999
 * @parent ActorTPChangePosition
 * 
 * @param ActorTPBChangePosition
 * @text TPB位置設定
 * @parent ActorStatus
 * 
 * @param TPBShow
 * @desc TPBゲージを表示します。
 * @text TPBゲージ表示
 * @type boolean
 * @default true
 * @parent ActorTPBChangePosition
 * 
 * @param TPBGaugeWidth
 * @desc TPBゲージの横幅を指定します。（デフォルト128）
 * @text TPBゲージ横幅
 * @type number
 * @default 128
 * @min 0
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
 * @desc TPBのX座標を設定します。TPBの座標変更がTrueの場合のみ適用します。
 * @text TPB_X座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorTPBChangePosition
 * 
 * @param ActorTPB_Y
 * @desc TPBのY座標を設定します。TPBの座標変更がTrueの場合のみ適用します。（デフォルト88）
 * @text TPB_Y座標
 * @type number
 * @default 88
 * @min -9999
 * @parent ActorTPBChangePosition
 * 
 * @param ActorStateChangePosition
 * @text State位置設定
 * @parent ActorStatus
 * 
 * @param StateChangePosition
 * @desc ステートの座標変更を許可します。
 * @text ステートの座標変更
 * @type boolean
 * @default false
 * @parent ActorStateChangePosition
 * 
 * @param ActorState_X
 * @desc ステートのX座標を設定します。ステートの座標変更がTrueの場合のみ適用します。
 * @text ステートX座標
 * @type number
 * @default 4
 * @min -9999
 * @parent ActorStateChangePosition
 * 
 * @param ActorState_Y
 * @desc ステートのY座標ステートの座標変更がTrueの場合のみ適用します。
 * @text ステートY座標
 * @type number
 * @default 20
 * @min -9999
 * @parent ActorStateChangePosition
 * 
 */
/*~struct~actorsButlerList:
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
 * 
 * @param Actor_Y
 * @desc 画像のY座標。
 * @text 画像Y座標
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param Actor_Scale
 * @desc 画像の拡大率。
 * @text 画像拡大率
 * @type number
 * @default 100
 * @min 0
 * 
 * @param ActorButlers
 * @text アクターグラフィック設定
 * 
 * @param defaultImg
 * @text デフォルト画像
 * @desc デフォルトの画像を表示します。
 * @type file
 * @dir img/pictures
 * @parent ActorButlers
 * 
 * @param deathImg
 * @text 戦闘不能画像
 * @desc 戦闘不能になった時の画像を表示します。指定しない場合は戦闘不能時に画像が透明になります。
 * @type file
 * @dir img/pictures
 * @parent ActorButlers
 * 
 * @param damageImg
 * @text ダメージ時画像
 * @desc ダメージを受けた時の画像を表示します。
 * @type file
 * @dir img/pictures
 * @parent ActorButlers
 * 
 * @param dyingImg
 * @text 瀕死時画像
 * @desc 瀕死の時の画像を表示します。
 * @type file
 * @dir img/pictures
 * @parent ActorButlers
 * 
 * @param victoryImg
 * @text 勝利時画像
 * @desc 勝利時の画像を表示します。
 * @type file
 * @dir img/pictures
 * @parent ActorButlers
 * 
 * @param chantImg
 * @text 詠唱時画像
 * @desc 詠唱時の画像を表示します。
 * @type file
 * @dir img/pictures
 * @parent ActorButlers
 * 
 * @param stateImg
 * @text 被ステート時画像
 * @desc 被ステート時の画像を設定します。
 * @type struct<actorStateImgList>[]
 * @parent ActorButlers
 *  
 * @param ActorFace
 * @text 顔グラフィック設定
 * @desc アクターグラフィック設定時では表示されません。
 * 
 * @param deathFaceIndex
 * @desc 戦闘不能時のインデックス番号。
 * @text 戦闘不能時インデックス番号
 * @type number
 * @default -1
 * @min -1
 * @parent ActorFace
 * 
 * @param damageFaceIndex
 * @desc ダメージ時のインデックス番号。
 * @text ダメージ時インデックス番号
 * @type number
 * @default -1
 * @min -1
 * @parent ActorFace
 * 
 * @param dyingFaceIndex
 * @desc 瀕死時のインデックス番号。
 * @text 瀕死時インデックス番号
 * @type number
 * @default -1
 * @min -1
 * @parent ActorFace
 * 
 * @param victoryFaceIndex
 * @desc 勝利時のインデックス番号。
 * @text 勝利時インデックス番号
 * @type number
 * @default -1
 * @min -1
 * @parent ActorFace
 * 
 * @param chantFaceIndex
 * @desc 詠唱時のインデックス番号。
 * @text 詠唱時インデックス番号
 * @type number
 * @default -1
 * @min -1
 * @parent ActorFace
 * 
 * @param stateFaceIndex
 * @text 被ステート時インデックス番号
 * @desc 被ステート時のインデックス番号。
 * @type struct<actorStateFaceIndexList>[]
 * @parent ActorFace
 * 
 */
/*~struct~actorStateImgList:
 * 
 * @param actorStateImg
 * @text 被ステート時画像
 * @desc 被ステート時の画像を表示します。
 * @type file
 * @dir img/pictures
 * 
 * @param stateImgId
 * @text 変化ID
 * @desc 変化するステートのIDを指定します。ステートのメモ欄に<ChangeImgId:[id]>を記入してください。[id]:変化ID
 * @type number
 * 
 * @param Always
 * @desc 被ステート時画像変化。
 * @text 被ステート時の画像を戦闘不能以外変化しません。
 * @type boolean
 * @default false
 * 
 * @param priorityId
 * @text プロパティID
 * @desc プロパティID
 * @type number
 * @default 1
 * @min 0
 * 
 */
/*~struct~actorStateFaceIndexList:
 * 
 * @param actorStateIndex
 * @text 被ステート時インデックス番号
 * @desc 被ステート時のインデックス番号。
 * @type number
 * @default -1
 * @min -1
 * 
 * @param stateFaceId
 * @text 変化ID
 * @desc 変化するステートのIDを指定します。ステートのメモ欄に<ChangeImgId:[id]>を記入してください。[id]:変化ID
 * @type number
 * @default 0
 * 
 * @param Always
 * @desc 被ステート時画像変化。
 * @text 被ステート時の画像を戦闘不能以外変化しません。
 * @type boolean
 * @default false
 * 
 * @param priorityId
 * @text プロパティID
 * @desc プロパティID
 * @type number
 * @default 1
 * @min 0
 * 
 */

var Imported = Imported || {};
Imported.NUUN_BattleStyleEX = true;


