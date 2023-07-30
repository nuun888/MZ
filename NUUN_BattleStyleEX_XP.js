/*:-----------------------------------------------------------------------------------
 * NUUN_BattleStyleEX_XP.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc バトルスタイル拡張XPスタイル設定用
 * @author NUUN
 * @base NUUN_BattleStyleEX
 * @orderBefore NUUN_BattleStyleEX
 * @version 1.11.2
 * 
 * @help
 * バトルレイアウトをXP風に変更します。
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
 * 表示ステータス設定はアクターステータスに表示するステータスを独自に設定できます。
 * 表示したい項目だけ設定してください。
 * 表示ステータス設定にひとつでも設定してある場合は、こちらの設定が適用されます。
 * 
 * 
 * 独自パラメータ、独自パラメータ(動的) 
 * 評価式or文字列Aには表示する式をjavascriptで記入します。
 * this._battler:アクターゲームデータ
 * this._battler.actor():アクターシステムデータ
 * 
 * 独自ゲージ
 * 評価式or文字列Aに現在の値をjavascriptで記入します。
 * 評価式or文字列Bに最大値をjavascriptで記入します。
 * this._battler:アクターゲームデータ
 * this._battler.actor():アクターシステムデータ
 * 
 * ステート,ステート2
 * 評価式or文字列Aに表示するステートIDを記入します。
 * 評価式or文字列Bに表示するバフIDを記入します。
 * 
 * 画像
 * 評価式or文字列Aには表示条件をjavascriptで記入します。条件が一致しているときに表示されます。
 * 無記入の場合は常に表示されます。
 * actor:アクターゲームデータ
 * actor.actor():アクターシステムデータ
 * this._battler:アクターゲームデータ
 * this._battler.actor():アクターシステムデータ
 * 
 * 敵キャラのメモ欄
 * <AttackAnimation:11>
 * 敵キャラの通常攻撃時、11番のアニメーションが再生されます。指定がない場合はプラグインパラメータのデフォルト値が適用されます。
 * 
 * アクターステータス表示位置設定
 * リストの設定順はアクターステータスウィンドウに表示されるアクター順(戦闘キャラが1)になります。
 * 戦闘メンバーの表示設定はリストID1番に設定します。2番目は2番に設定します。(アクター別には設定できません)
 * 
 * 木星ペンギン氏作疑似３Dバトルプラグインと併用して、フロントビューで味方にアニメーションを表示させる場合は
 * 別途バトルスタイル拡張疑似３Dバトル併用パッチを導入してください。
 * 
 * Ver.1.6.0でバトルステータスのデフォルトの設定を表示ステータス設定での設定に変更しております。
 * 旧設定で設定している場合でアクター座標、画像設定で追加する場合は、表示ステータス設定を空欄にしてください。
 * 
 * ゲームパッドの振動設定
 * ゲームパッド設定の振動設定は別途NUUN_GamePadVibrationが必要です。
 * https://github.com/nuun888/MZ/blob/master/README/GamePadVibration.md
 * 
 * ※1
 * 0:HP上昇 1:MP上昇 2:攻撃力上昇 3:防御力上昇 4:魔法力上昇 5:魔法防御上昇 6:敏捷性上昇 7:運上昇
 * 10:HP減少 11:MP減少 12:攻撃力減少 13:防御力減少 14:魔法力減少 15:魔法防御減少 16:敏捷性減少 17:運減少
 * 
 * 更新履歴
 * 2023/7/30 Ver.1.11.2
 * 味方の画像切り替えでランダムに表示できる機能を追加。
 * 2023/7/2 Ver.1.11.1
 * 戦闘中の天候をスイッチで切り替えられる機能を追加。
 * 戦闘開始時及び戦闘終了時に指定のコモンイベントを指定できる機能を追加。
 * 2023/7/2 Ver.1.11.0
 * 戦闘中に天候を適用できる機能を追加。
 * 2023/6/3 Ver.1.10.6
 * バトルウィンドウの表示方式(旧処理または新処理)を指定できる機能を追加。
 * 2023/5/22 Ver.1.10.5
 * 条件アクター画像にクリティカルダメージ時の設定を追加。
 * 2023/5/7 Ver.1.10.4
 * アクターへのアニメーションの反転の有無が機能していなかった問題を修正。
 * 2023/4/30 Ver.1.10.3
 * 画像に条件式を指定できる機能を追加。
 * 2023/4/11 Ver.1.10.2
 * CounterExtend(トリアコンタン氏)に対応。
 * 2023/3/12 Ver.1.10.1
 * 味方へのクリティカル時と通常ダメージ時の振動設定を別々に変更。
 * 2023/2/27 Ver.1.10.0
 * ゲームパッドを振動させる機能を正式に追加。(要NUUN_GamePadVibration)
 * ボス消滅時にゲームパッドを振動させる機能を追加。
 * 2023/2/26 Ver.1.9.1
 * 試験的に味方のダメージ時にゲームパッドを振動させる機能を追加。
 * 2023/2/24 Ver.1.9.0
 * アクターステータスの各アクター表示の位置、幅を指定できる機能を追加。
 * 2023/2/11 Ver.1.8.4
 * アクターコンテンツを下側から表示する機能を追加。
 * 2023/1/8 Ver.1.8.3
 * アクター名、オリジナルパラメータ、レベルの表示文字揃えを指定できる機能を追加。
 * 2022/12/24 Ver.1.8.2
 * アクター名に任意のフォントを指定できる機能を追加。
 * 2022/12/10 Ver.1.8.1
 * 敵のダメージポップアップの位置を指定できる機能を追加。
 * 2022/10/18 Ver.1.8.0
 * スキル、アイテム選択画面の座標、横幅、行数、列数を設定できる機能を追加。
 * 2022/10/15 Ver.1.7.3
 * ステートが一つも付加されていないときに表示するアイコンを指定できる機能を追加。
 * 2022/10/9 Ver.1.7.2
 * アクターステータスのアクター毎にウィンドウを表示する機能を追加。
 * 2022/9/17 Ver.1.7.1
 * 敵対象選択画面のモンスター名の表示をアクター名と同じ仕様にする機能を追加。
 * 2022/8/25 Ver.1.7.0
 * アクター画像変化条件に防御時、反撃時、魔法反射時を追加。
 * 2022/8/24 Ver.1.6.3
 * 敵出現、アイテムウィンドウのXY座標が適用されていなかった問題を修正。
 * 2022/8/7 Ver.1.6.2
 * 戦闘終了時にアクターウィンドウを閉じる機能(コアスクリプトと同じ仕様)を追加。
 * 2022/8/6 Ver.1.6.1
 * ステート、ステート2に表示できるステート、バフのアイコンを指定および非表示にできる機能を追加。
 * Ver.1.6.0での仕様変更によりステートの枠外表示を廃止。
 * 2022/7/30 Ver.1.6.0
 * 表示ステータスにメニューで表示されるタイプのステートを表示する機能を追加。
 * 表示ステータスに画像を追加。
 * メンバー交代後にアクターの画像が変色してしまう問題を修正。
 * 一部プラグインパラメータのデフォルト値の修正。
 * アクター名に幅、フォントサイズが適用されていなかった問題を修正。
 * 2022/7/23 Ver.1.5.3
 * キャンセルボタンのX座標を調整できる機能を追加。
 * 2022/7/18 Ver.1.5.2
 * キャンセルボタンの表示位置を左か右か指定できる機能を追加。
 * 2022/6/24 Ver.1.5.1
 * 新規、更新後にアクターの画像がおかしくなる問題を修正。
 * 2022/6/19 Ver.1.5.0
 * アクター画像条件にコマンド選択時を追加。
 * アクター画像条件に不透明度を指定できる機能を追加。
 * 2022/6/18 Ver.1.4.1
 * アニメーションの表示をステータスの背後、ダメージポップアップをステータスの前面に表示するように変更。
 * 2022/6/15 Ver.1.4.0
 * パーティコマンド、アクターコマンド、アクターステータスウィンドウに任意のウィンドウスキンを設定できる機能を追加。
 * 2022/6/7 Ver.1.3.2
 * アクター毎にステートエフェクトの座標を調整できる機能を追加。
 * 2022/6/1 Ver.1.3.1
 * アクター画像（顔グラ）の設定方法に画像起点を追加。
 * 2022/5/26 Ver.1.3.0
 * アクターステータスの表示する方法に独自表示設定する機能を追加。
 * 上記の機能に独自パラメータ、独自ゲージを表示する機能を追加。
 * 2022/5/12 Ver.1.2.1
 * ステートアニメーションを表示させない機能を追加。
 * 2022/5/11 Ver.1.2.0
 * アクター画像にステート画像を表示する機能を追加。
 * 2022/5/2 Ver.1.1.1
 * エフェクトのプロパティを中間（アクター画像とステータスの間）か最前面に表示する機能を追加。
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
 * 立ち絵切り替え条件にスイッチ、武器、防具装備時、特定の職業を追加
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
 * @default 'top'
 * @parent PartyCommand
 * 
 * @param PartyCommandMaxCol
 * @desc 表示するコマンド列数。
 * @text 表示コマンド列数
 * @type number
 * @default 4
 * @min 1
 * @max 99
 * @parent PartyCommand
 * 
 * @param PartyCommandMaxRow
 * @desc 表示するコマンド行数。
 * @text 表示コマンド行数
 * @type number
 * @default 1
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
 * @param PartyCommandWindowSkin
 * @desc ウィンドウスキンを指定します。
 * @text ウィンドウスキン画像
 * @type file
 * @dir img/system
 * @default
 * @parent PartyCommandWindow
 * 
 * @param PartyCommandWindowColor
 * @text ウィンドウカラー
 * @desc ウィンドウの色の設定をします。
 * @default {"red":"0","green":"0","bule":"0"}
 * @type struct<WindowTone>
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
 * @default true
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
 * @param ActorCommandWindowSkin
 * @desc ウィンドウスキンを指定します。
 * @text ウィンドウスキン画像
 * @type file
 * @dir img/system
 * @default
 * @parent ActorCommand
 * 
 * @param ActorCommandWindowColor
 * @text ウィンドウカラー
 * @desc ウィンドウの色の設定をします。
 * @default {"red":"0","green":"0","bule":"0"}
 * @type struct<WindowTone>
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
 * @default 'actor'
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
 * @param ActorCommandBackGround
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
 * @parent ActorCommandBackGround
 * 
 * @param ActorBackground_X
 * @desc アクターコマンドの背景画像X座標（相対）。
 * @text 背景画像X座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorCommandBackGround
 * 
 * @param ActorBackground_Y
 * @desc アクターコマンドの背景画像Y座標（相対）。
 * @text 背景画像Y座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorCommandBackGround
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
 * @param ButtonSetting
 * @text ボタン設定
 * @default ////////////////////////////////
 * 
 * @param ButtonMode
 * @text キャンセルボタン表示位置
 * @desc キャンセルボタンの表示位置。
 * @type select
 * @option 左
 * @value 'left'
 * @option 右
 * @value 'right'
 * @default 'right'
 * @parent ButtonSetting
 * 
 * @param CancelButtonX
 * @desc キャンセルボタンX座標（相対）。
 * @text キャンセルボタンX座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ButtonSetting
 * 
 * @param ActorStatus
 * @text アクターステータス設定
 * @default ////////////////////////////////
 * 
 * @param ActorStatusWindowSkin
 * @desc ウィンドウスキンを指定します。
 * @text ウィンドウスキン画像
 * @type file
 * @dir img/system
 * @default
 * @parent ActorStatus
 * 
 * @param ActorStatusWindowColor
 * @text ウィンドウカラー
 * @desc ウィンドウの色の設定をします。
 * @default {"red":"0","green":"0","bule":"0"}
 * @type struct<WindowTone>
 * @parent ActorStatus
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
 * @text アクターステータス表示方法1
 * @desc アクターステータスの横方向の表示方法を選択します。
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
 * @param ActorStatusRowsMode
 * @text アクターステータス表示方法2
 * @desc アクターステータスの縦方向の表示方法を選択します。
 * @type select
 * @option 上から表示
 * @value 'top'
 * @option 下から表示
 * @value 'under'
 * @default 'top'
 * @parent ActorStatus
 * 
 * @param ActorStatusActorWindow
 * @text アクター個別ウィンドウ設定
 * @default ------------------------------
 * @parent ActorStatus
 * 
 * @param ActorStatusActorWindowShow
 * @desc アクター別のウィンドウを表示します。
 * @text アクター別ウィンドウ表示
 * @type boolean
 * @default false
 * @parent ActorStatusActorWindow
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
 * @param EnemyNameDyingColor
 * @desc 敵キャラ名を瀕死時に色を変化させます。
 * @text 敵ネーム瀕死カラー適用
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
 * @param WindowShow
 * @desc アクターステータスウィンドウ画像を表示する。
 * @text アクターステータスウィンドウ画像表示
 * @type boolean
 * @default false
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
 * @default false
 * @parent ActorStatusWindow
 * 
 * @param WindowContentsRect
 * @text アクターステータス表示位置設定
 * @default ------------------------------
 * @parent ActorStatusWindow
 * 
 * @param ActorContentsSetting
 * @text 各アクターステータス表示位置設定
 * @desc 各アクターステータスのコンテンツの表示位置を指定します。
 * @default []
 * @type struct<ActorContentsRect>[]
 * @parent WindowContentsRect
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
 * @param BattleEndActorStatusClose
 * @desc 戦闘終了時にアクターステータスウィンドウを閉じます。
 * @text 戦闘終了時ウィンドウ閉め
 * @type boolean
 * @default false
 * @parent ActorStatusOption
 * 
 * @param ActorSetting
 * @text アクター設定
 * @default ////////////////////////////////
 * 
 * @param DefaultStatusPositionData
 * @text デフォルトステータス座標表示設定
 * @desc デフォルトのステータスの座標、表示設定の設定を行います。
 * @default {"StatusListData":"[\"{\\\"Status\\\":\\\"'tpb'\\\",\\\"Width\\\":\\\"128\\\",\\\"Height\\\":\\\"12\\\",\\\"PositionX\\\":\\\"0\\\",\\\"PositionY\\\":\\\"88\\\",\\\"FontSize\\\":\\\"0\\\",\\\"ParamName\\\":\\\"\\\",\\\"UserParamID\\\":\\\"\\\",\\\"DetaEval1\\\":\\\"\\\",\\\"DetaEval2\\\":\\\"\\\",\\\"GaugeSetting\\\":\\\"------------------------------\\\",\\\"Color1\\\":\\\"0\\\",\\\"Color2\\\":\\\"0\\\",\\\"ImgesSetting\\\":\\\"------------------------------\\\",\\\"ContentsImges\\\":\\\"\\\"}\",\"{\\\"Status\\\":\\\"'name'\\\",\\\"Width\\\":\\\"128\\\",\\\"Height\\\":\\\"12\\\",\\\"PositionX\\\":\\\"0\\\",\\\"PositionY\\\":\\\"88\\\",\\\"FontSize\\\":\\\"0\\\",\\\"ParamName\\\":\\\"\\\",\\\"UserParamID\\\":\\\"\\\",\\\"DetaEval1\\\":\\\"\\\",\\\"DetaEval2\\\":\\\"\\\",\\\"GaugeSetting\\\":\\\"------------------------------\\\",\\\"Color1\\\":\\\"0\\\",\\\"Color2\\\":\\\"0\\\",\\\"ImgesSetting\\\":\\\"------------------------------\\\",\\\"ContentsImges\\\":\\\"\\\"}\",\"{\\\"Status\\\":\\\"'hpgauge'\\\",\\\"Width\\\":\\\"128\\\",\\\"Height\\\":\\\"12\\\",\\\"PositionX\\\":\\\"0\\\",\\\"PositionY\\\":\\\"112\\\",\\\"FontSize\\\":\\\"0\\\",\\\"ParamName\\\":\\\"\\\",\\\"UserParamID\\\":\\\"\\\",\\\"DetaEval1\\\":\\\"\\\",\\\"DetaEval2\\\":\\\"\\\",\\\"GaugeSetting\\\":\\\"------------------------------\\\",\\\"Color1\\\":\\\"0\\\",\\\"Color2\\\":\\\"0\\\",\\\"ImgesSetting\\\":\\\"------------------------------\\\",\\\"ContentsImges\\\":\\\"\\\"}\",\"{\\\"Status\\\":\\\"'mpgauge'\\\",\\\"Width\\\":\\\"128\\\",\\\"Height\\\":\\\"12\\\",\\\"PositionX\\\":\\\"0\\\",\\\"PositionY\\\":\\\"136\\\",\\\"FontSize\\\":\\\"0\\\",\\\"ParamName\\\":\\\"\\\",\\\"UserParamID\\\":\\\"\\\",\\\"DetaEval1\\\":\\\"\\\",\\\"DetaEval2\\\":\\\"\\\",\\\"GaugeSetting\\\":\\\"------------------------------\\\",\\\"Color1\\\":\\\"0\\\",\\\"Color2\\\":\\\"0\\\",\\\"ImgesSetting\\\":\\\"------------------------------\\\",\\\"ContentsImges\\\":\\\"\\\"}\",\"{\\\"Status\\\":\\\"'tpgauge'\\\",\\\"Width\\\":\\\"128\\\",\\\"Height\\\":\\\"12\\\",\\\"PositionX\\\":\\\"0\\\",\\\"PositionY\\\":\\\"160\\\",\\\"FontSize\\\":\\\"0\\\",\\\"ParamName\\\":\\\"\\\",\\\"UserParamID\\\":\\\"\\\",\\\"DetaEval1\\\":\\\"\\\",\\\"DetaEval2\\\":\\\"\\\",\\\"GaugeSetting\\\":\\\"------------------------------\\\",\\\"Color1\\\":\\\"0\\\",\\\"Color2\\\":\\\"0\\\",\\\"ImgesSetting\\\":\\\"------------------------------\\\",\\\"ContentsImges\\\":\\\"\\\"}\",\"{\\\"Status\\\":\\\"'state'\\\",\\\"Width\\\":\\\"128\\\",\\\"Height\\\":\\\"12\\\",\\\"PositionX\\\":\\\"114\\\",\\\"PositionY\\\":\\\"20\\\",\\\"FontSize\\\":\\\"0\\\",\\\"ParamName\\\":\\\"\\\",\\\"UserParamID\\\":\\\"\\\",\\\"DetaEval1\\\":\\\"\\\",\\\"DetaEval2\\\":\\\"\\\",\\\"GaugeSetting\\\":\\\"------------------------------\\\",\\\"Color1\\\":\\\"0\\\",\\\"Color2\\\":\\\"0\\\",\\\"ImgesSetting\\\":\\\"------------------------------\\\",\\\"ContentsImges\\\":\\\"\\\"}\"]","ActorImgChangePosition":"------------------------------","ImgChangePosition":"false","ActorImg_X":"0","ActorImg_Y":"0","ActorCommandSkin":"------------------------------","WindowSkin":"","WindowColor":"{\"red\":\"0\",\"green\":\"0\",\"bule\":\"0\"}","Background":"------------------------------","ActorBackground":"","ActorFrontBackground":"","OldSetting":"------------------------------","ActorNameChangePosition":"","NameChangePosition":"false","ActorName_X":"0","ActorName_Y":"88","ActorHPChangePosition":"------------------------------","HPGaugeWidth":"128","HPGaugeHeight":"12","HPChangePosition":"false","ActorHP_X":"0","ActorHP_Y":"112","ActorMPChangePosition":"------------------------------","MPGaugeWidth":"128","MPGaugeHeight":"12","MPChangePosition":"false","ActorMP_X":"0","ActorMP_Y":"136","ActorTPChangePosition":"------------------------------","TPGaugeWidth":"128","TPGaugeHeight":"12","TPChangePosition":"false","ActorTP_X":"0","ActorTP_Y":"160","ActorTPBChangePosition":"------------------------------","TPBGaugeWidth":"128","TPBGaugeHeight":"12","TPBChangePosition":"false","ActorTPB_X":"0","ActorTPB_Y":"88","ActorStateChangePosition":"------------------------------","StateChangePosition":"false","ActorState_X":"4","ActorState_Y":"20"}
 * @type struct<StatusPositionDataList>
 * @parent ActorSetting
 * 
 * @param DefaultActorImgData
 * @text デフォルトアクター画像設定
 * @desc デフォルトのアクター画像の設定を行います。
 * @default {"ActorImgMode":"'face'","Actor_X":"0","Actor_Y":"0","Img_SX":"0","Img_SY":"0","Actor_Scale":"100","ActorImgHPosition":"'center'","ActorImgVPosition":"'under'","ActorStateAnimationPosition":"------------------------------","ActorState_X":"0","ActorState_Y":"0"}
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
 * @text アクター画像表示縦幅
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
 * @param ActorNameFont
 * @desc アクター名のフォントを指定します。(拡張子なし)
 * @text アクター名フォント
 * @type string
 * @default 
 * @parent ActorStatusParamOption
 * 
 * @param TPBShow
 * @desc TPBゲージを表示します。外部プラグインで別の場所にTPBゲージを表示するときに設定します。
 * @text TPBゲージ表示
 * @type boolean
 * @default true
 * @parent ActorStatusParamOption
 * 
 * @param StateVisible
 * @desc ステートアイコンを表示させます。外部プラグインで別の場所にステートアイコンを表示するときに設定します。
 * @text ステートアイコン表示
 * @type boolean
 * @default true
 * @parent ActorStatusParamOption
 * 
 * @param NoStateIcon
 * @desc ステートが一つも付与されていないときのアイコンインデックス。
 * @text ステートなしアイコンインデックス
 * @type number
 * @default 0
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
 * @desc アクター画像（顔グラ）の高さ範囲をウィンドウ内に納めます。
 * @text アクター画像ウィンドウ内表示
 * @type boolean
 * @default false
 * @parent ActorStatusParamOption
 * 
 * @param NotVisibleStateIcons
 * @type state[]
 * @default []
 * @text 表示しないステート
 * @desc 表示しないステートアイコン。(ステート2には適用されません)
 * @parent ActorStatusParamOption
 * 
 * @param NotVisibleBuffIcons
 * @text 表示しないバフ、デバフ
 * @desc 表示しないバフ、デバフアイコン。(ステート2には適用されません)
 * @type select[]
 * @option HP上昇
 * @value 0
 * @option MP上昇
 * @value 1
 * @option 攻撃力上昇
 * @value 2
 * @option 防御力上昇
 * @value 3
 * @option 魔法力上昇
 * @value 4
 * @option 魔法防御上昇
 * @value 5
 * @option 敏捷性上昇
 * @value 6
 * @option 運上昇
 * @value 7
 * @option HP低下
 * @value 10
 * @option MP低下
 * @value 11
 * @option 攻撃力低下
 * @value 12
 * @option 防御力低下
 * @value 13
 * @option 魔法力低下
 * @value 14
 * @option 魔法防御低下
 * @value 15
 * @option 敏捷性低下
 * @value 16
 * @option 運低下
 * @value 17
 * @default []
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
 * @param ActorStateAnimation
 * @text アクターグラフィックステートアニメーション設定
 * @default ////////////////////////////////
 * 
 * @param StateAnimationShow
 * @desc アクター画像のステートアニメーションを表示します。フロントビューでアニメーションエフェクト表示有効時のみ
 * @text アクター画像ステートアニメーション表示
 * @type boolean
 * @default true
 * @parent ActorStateAnimation
 * 
 * @param ActorState_X
 * @desc アクター画像のステートアニメーションのX座標。（相対座標）フロントビューでアニメーションエフェクト表示有効時のみ
 * @text ステートアニメーションX座標（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorStateAnimation
 * 
 * @param ActorState_Y
 * @desc アクター画像のステートアニメーションのY座標。（相対座標）フロントビューでアニメーションエフェクト表示有効時のみ
 * @text ステートアニメーションY座標（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorStateAnimation
 * 
 * 
 * @param ActorImgEffect
 * @text アクターグラフィックエフェクト設定
 * @default ////////////////////////////////
 * 
 * @param DamageImgFrame
 * @desc アクター画像のダメージ、回復時、防御の画像変化フレーム。
 * @text ダメージ、回復、防御時変化フレーム
 * @type number
 * @default 30
 * @min 1
 * @max 9999
 * @parent ActorImgEffect
 * 
 * @param CounterImgFrame
 * @desc アクター画像の反撃、魔法反射時の画像変化フレーム。
 * @text 反撃、魔法反射画像変化フレーム
 * @type number
 * @default 60
 * @min 1
 * @max 9999
 * @parent ActorImgEffect
 * 
 * @param OnActorShake
 * @desc ダメージ時のシェイクを有効にする。
 * @text ダメージシェイク有効
 * @type boolean
 * @default false
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
 * 
 * @default false
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
 * @param EnemyEffect
 * @text 敵キャラエフェクト設定
 * @default ////////////////////////////////
 * 
 * @param EnemySkillAnimation
 * @desc 敵キャラのデフォルトの通常攻撃時のアニメーションID
 * @text 通常攻撃アニメーションID
 * @type animation
 * @default 1
 * @min 0
 * @parent EnemyEffect
 * 
 * @param EnemyDamage_X
 * @desc ダメージエフェクトのX座標。（相対座標）
 * @text ダメージエフェクトX座標（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent EnemyEffect
 * 
 * @param EnemyDamage_Y
 * @desc ダメージエフェクトのY座標。（相対座標）
 * @text ダメージエフェクトY座標（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent EnemyEffect
 * 
 * @param WeatherSetting
 * @text 天候設定
 * @default ////////////////////////////////
 * 
 * @param BattleShowWeather
 * @text 戦闘時天候表示設定。
 * @desc 戦闘時の天候の表示設定を行います。
 * @type select
 * @option 表示なし
 * @value 'None'
 * @option 表示
 * @value 'Show'
 * @option アクター画像上に表示
 * @value 'ShowFront'
 * @default 'Show'
 * @parent WeatherSetting
 * 
 * @param BattleWeatherSwitch
 * @desc 戦闘中の天候の表示スイッチ(ONで表示)
 * @text 戦闘中天候スイッチ
 * @type switch
 * @default 0
 * @parent WeatherSetting
 * 
 * @param BattleCommonEvent
 * @text バトルコモンイベント
 * @default ////////////////////////////////
 * 
 * @param BattleStartCommonEvent
 * @desc 戦闘開始時に実行するコモンイベント。
 * @text 戦闘開始時実行コモンイベント
 * @type common_event
 * @default 0
 * @parent BattleCommonEvent
 * 
 * @param BattleEndCommonEvent
 * @desc 戦闘終了時に実行するコモンイベント。
 * @text 戦闘終了時実行コモンイベント
 * @type common_event
 * @default 0
 * @parent BattleCommonEvent
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
 * @desc 出現ウィンドウの表示位置
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
 * @param ItemMaxRow
 * @desc 表示する行数。
 * @text アイテム行数
 * @type number
 * @default 4
 * @min 1
 * @max 99
 * @parent ItemWindow
 * 
 * @param ItemMaxCol
 * @desc 表示する列数。競合を起こす場合は0に設定してください。
 * @text アイテム列数
 * @type number
 * @default 2
 * @min 0
 * @max 99
 * @parent ItemWindow
 * 
 * @param ItemWindow_X
 * @desc アイテムウィンドウのX座標を指定します。
 * @text アイテムウィンドウX座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent ItemWindow
 * 
 * @param ItemWindow_Y
 * @desc アイテムウィンドウのY座標を指定します。
 * @text アイテムウィンドウY座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent ItemWindow
 * 
 * @param ItemWindow_Width
 * @desc アイテムウィンドウの横幅を指定します。0でUIサイズ 画面より大きい値にすると自動的に画面の横幅になります。
 * @text アイテムウィンドウの横幅
 * @type number
 * @default 0
 * @max 9999
 * @min 0
 * @parent ItemWindow
 * 
 * @param ItemWindowMode
 * @desc アイテムウィンドウの設定座標モード。(ON：デフォルトの表示位置からの相対座標 OFF:画面左上からの絶対座標)
 * @text アイテム設定座標モード
 * @type boolean
 * @default true
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
 * @param SkillMaxRow
 * @desc 表示する行数。
 * @text スキル行数
 * @type number
 * @default 4
 * @min 1
 * @max 99
 * @parent SkillWindow
 * 
 * @param SkillMaxCol
 * @desc 表示する列数。競合を起こす場合は0に設定してください。
 * @text スキル列数
 * @type number
 * @default 2
 * @min 0
 * @max 99
 * @parent SkillWindow
 * 
 * @param SkillWindow_X
 * @desc スキルウィンドウのX座標を指定します。
 * @text スキルウィンドウX座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent SkillWindow
 * 
 * @param SkillWindow_Y
 * @desc スキルウィンドウのY座標を指定します。
 * @text スキルウィンドウY座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent SkillWindow
 * 
 * @param SkillWindow_Width
 * @desc スキルウィンドウの横幅を指定します。0でUIサイズ 画面より大きい値にすると自動的に画面の横幅になります。
 * @text スキルウィンドウの横幅
 * @type number
 * @default 0
 * @max 9999
 * @min 0
 * @parent SkillWindow
 * 
 * @param SkillWindowMode
 * @desc スキルウィンドウの設定座標モード。(ON：デフォルトの表示位置からの相対座標 OFF:画面左上からの絶対座標)
 * @text スキル設定座標モード
 * @type boolean
 * @default true
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
 * @parent LoseWindow
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
 * @param GamePadSetting
 * @text ゲームパッド設定(要NUUN_GamePadVibration)
 * @default ////////////////////////////////
 * 
 * @param DamegeVibration
 * @desc 味方ダメージ時のゲームパッドの振動を有効にします。
 * @text 味方ダメージ時振動有効
 * @type boolean
 * @default false
 * @parent GamePadSetting
 * 
 * @param DamegeVibrationSetting
 * @type struct<VibrationData>
 * @default {"StartDelay":"0","Duration":"20","WeakMagnitude":"1.0","StrongMagnitude":"1.0"}
 * @text ダメージ時振動設定
 * @desc ダメージ時の振動の設定を行います。
 * @parent GamePadSetting
 * 
 * @param CriticalVibration
 * @desc 味方クリティカルダメージ時のゲームパッドの振動を有効にします。
 * @text 味方クリティカルダメージ時振動有効
 * @type boolean
 * @default false
 * @parent GamePadSetting
 * 
 * @param CriticalVibrationSetting
 * @type struct<VibrationData>
 * @default {"StartDelay":"0","Duration":"20","WeakMagnitude":"1.0","StrongMagnitude":"1.0"}
 * @text ダメージ時振動設定
 * @desc ダメージ時の振動の設定を行います。
 * @parent GamePadSetting
 * 
 * @param BossCollapseVibration
 * @desc ボス消滅エフェクト時のゲームパッドの振動を有効にします。
 * @text ボス消滅時振動有効
 * @type boolean
 * @default false
 * @parent GamePadSetting
 * 
 * @param BossCollapseVibrationSetting
 * @type struct<VibrationData>
 * @default {"StartDelay":"0","Duration":"0","WeakMagnitude":"1.0","StrongMagnitude":"1.0"}
 * @text ボス消滅時振動設定
 * @desc ボス消滅エフェクト時の振動の設定を行います。振動フレーム数は入力しません。
 * @parent GamePadSetting
 * 
 * @param SpecialSetting
 * @text 特殊設定
 * @default ////////////////////////////////
 * 
 * @param WindowDisplayMode
 * @text ウィンドウ表示モード
 * @desc ウィンドウの表示モードを指定します。
 * @type select
 * @option Sprite
 * @value 'Sprite'
 * @option Scene_Battle
 * @value 'Scene_Battle'
 * @default 'Sprite'
 * @parent SpecialSetting
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
/*~struct~StatusPositionDataList:
 * 
 * @param StatusListData
 * @text 表示ステータス設定
 * @desc 表示するステータス情報を設定します。一つでも指定してある場合はこちらの設定が適用されます。
 * @default 
 * @type struct<ActorStatusList>[]
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
 * @param ActorWindow
 * @text アクター別個別ウィンドウ設定
 * @default ------------------------------
 * 
 * @param ActorWindowSkin
 * @desc ウィンドウスキンを指定します。
 * @text ウィンドウスキン画像
 * @type file
 * @dir img/system
 * @default 
 * @parent ActorWindow
 * 
 * @param ActorWindowColor
 * @text ウィンドウカラー
 * @desc ウィンドウの色の設定をします。
 * @default {"red":"0","green":"0","bule":"0"}
 * @type struct<WindowTone>
 * @parent ActorWindow
 * 
 * @param ActorCommandSkin
 * @text アクターコマンドスキン設定
 * @default ------------------------------
 * 
 * @param WindowSkin
 * @desc ウィンドウスキンを指定します。
 * @text ウィンドウスキン画像
 * @type file
 * @dir img/system
 * @default 
 * @parent ActorCommandSkin
 * 
 * @param WindowColor
 * @text ウィンドウカラー
 * @desc ウィンドウの色の設定をします。
 * @default {"red":"0","green":"0","bule":"0"}
 * @type struct<WindowTone>
 * @parent ActorCommandSkin
 * 
 * @param Background
 * @text アクター画像設定
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
 * @param OldSetting
 * @text 旧設定
 * @default ------------------------------
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
 * @param ActorImgHPosition
 * @text 画像横基準表示位置
 * @desc 画像の横の基準表示位置を指定します。
 * @type select
 * @option 画像左基準
 * @value 'left'
 * @option 画像中央基準
 * @value 'center'
 * @default 'center'
 * @parent ActorImgList
 * 
 * @param ActorImgVPosition
 * @text 画像縦基準表示位置
 * @desc 画像の縦の基準表示位置を指定します。
 * @type select
 * @option 画像上基準
 * @value 'top'
 * @option 画像下基準
 * @value 'under'
 * @default 'under'
 * @parent ActorImgList
 * 
 * @param ActorStateAnimationPosition
 * @text アクター画像位置設定
 * @default ------------------------------
 * @parent ActorImgList
 * 
 * @param ActorState_X
 * @desc アクター画像毎のステートアニメーションのX座標。（相対座標）フロントビューでアニメーションエフェクト表示有効時のみ
 * @text ステートアニメーションX座標（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorStateAnimationPosition
 * 
 * @param ActorState_Y
 * @desc アクター画像毎のステートアニメーションのY座標。（相対座標）フロントビューでアニメーションエフェクト表示有効時のみ
 * @text ステートアニメーションY座標（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorStateAnimationPosition
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
 * @type struct<StatusPositionDataList>
 * @parent ActorPosition
 * 
 * @param ActorImges
 * @text アクター画像設定
 * @default ////////////////////////////////
 * 
 * @param ActorImgSetting
 * @text アクター画像座標拡大率設定
 * @desc アクター画像の座標、拡大率の設定を行います。空白の場合はデフォルトアクター画像設定の値が設定されます。
 * @default {"ActorImgMode":"'face'","Actor_X":"0","Actor_Y":"0","Img_SX":"0","Img_SY":"0","Actor_Scale":"100","ActorImgHPosition":"'center'","ActorImgVPosition":"'under'","ActorStateAnimationPosition":"------------------------------","ActorState_X":"0","ActorState_Y":"0"}
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
 * @desc アクターの画像を設定します。複数指定の場合はランダムに表示されます。
 * @type file[]
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
 * @param Opacity
 * @text 画像不透明度
 * @desc 画像の不透明度を指定します。
 * @type number
 * @default 255
 * @min 0
 * @max 255
 * 
 * @param Animation
 * @text 画像切り替え時アニメーション
 * @desc 画像切り替え時にアニメーションを表示します。
 * @type animation
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
 * @option クリティカルダメージ時
 * @value 'cridamage'
 * @option 回復時
 * @value 'recovery'
 * @option 攻撃スキル使用時(1)
 * @value 'attack'
 * @option 回復スキル使用時(1)
 * @value 'recoverySkill'
 * @option アイテム使用時(2)
 * @value 'item'
 * @option 反撃時
 * @value 'counter'
 * @option 魔法反射時
 * @value 'reflection'
 * @option 反撃時(CounterExtend)(4)
 * @value 'counterEX'
 * @option 防御時
 * @value 'guard'
 * @option 詠唱時
 * @value 'chant'
 * @option 勝利時
 * @value 'victory'
 * @option 被ステート(3)
 * @value 'state'
 * @option コマンド選択時
 * @value 'command'
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
 * @desc スキルを選択します。いずれかのスキル使用時に適用します。空白、なしの場合は全てのスキルが対象です。
 * @type skill[]
 * @default
 * @parent CondSetting
 * 
 * @param Item
 * @text アイテム(2)
 * @desc アイテムを選択します。いずれかのアイテム使用時に適用します。空白、なしの場合は全てのアイテムが対象です。
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
 * 
 * @param Id
 * @text 識別タグ(4)
 * @desc 識別タグを指定します。全ての識別タグが該当しているときに適用します。
 * @type string[]
 * @default 
 * @parent CondSetting
 * 
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
/*~struct~ActorStatusList:
 * 
 * @param Status
 * @text 表示対象
 * @desc アクターステータス画面に表示させるステータス対象を選択します。
 * @type select
 * @option HPゲージ(1)(2)(3)(4)
 * @value 'hpgauge'
 * @option MPゲージ(1)(2)(3)(4)
 * @value 'mpgauge'
 * @option TPゲージ(1)(2)(3)(4)
 * @value 'tpgauge'
 * @option TPB(1)(2)(3)(4)
 * @value 'tpb'
 * @option ステート(3)(4)(8)(9)
 * @value 'state'
 * @option ステート2(1)(3)(4)(8)(9)
 * @value 'state2'
 * @option アクター名(1)(2)(3)(4)(5)(13)
 * @value 'name'
 * @option 独自パラメータ(1)(3)(4)(5)(6)(8)(13)
 * @value 'param'
 * @option 独自パラメータ(動的) (1)(2)(3)(4)(5)(6)(7)(8)
 * @value 'dparam'
 * @option 独自ゲージ (1)(2)(3)(4)(5)(6)(7)(8)(10)(11)
 * @value 'usergauge'
 * @option レベル(1)(3)(4)(5)(6)(13)
 * @value 'lv'
 * @option 画像(3)(4)(7)(12)
 * @value 'imges'
 * @default
 * 
 * @param Width
 * @desc 横幅を指定します。
 * @text 横幅(1)
 * @type number
 * @default 128
 * @min 0
 * @max 999
 * 
 * @param Height
 * @desc 縦幅を指定します。
 * @text 縦幅(2)
 * @type number
 * @default 12
 * @min 0
 * @max 24
 * 
 * @param PositionX
 * @desc X座標を設定します。
 * @text X座標(3)
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param PositionY
 * @desc Y座標を設定します。
 * @text Y座標(4)
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param FontSize
 * @desc フォントサイズを設定します。(メインフォントからの差)
 * @text フォントサイズ(5)
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param ParamName
 * @desc ステータス名称。
 * @text ステータス名称(6)
 * @type string
 * @default 
 * 
 * @param UserParamID
 * @desc 独自パラメータ、ゲージ、画像識別ID。
 * @text 識別ID(7)
 * @type string
 * @default 
 * 
 * @param DetaEval1
 * @desc 評価式または文字列。(独自パラメータ、独自ゲージ現在値、ステートID(ステート、ステート2)、画像)
 * @text 評価式or文字列A(8)
 * @type string
 * @default 
 * 
 * @param DetaEval2
 * @desc 評価式or文字列。(独自ゲージ最大値、バフ(ステート、ステート2)※1)
 * @text 評価式or文字列B(9)
 * @type string
 * @default 
 * 
 * @param NamePosition
 * @desc 項目の表示位置を指定します
 * @text 項目表示位置(13)
 * @type select
 * @option 左
 * @value "left"
 * @option 中央
 * @value "center"
 * @option 右
 * @value "raight"
 * @default "left"
 * 
 * @param FontFace
 * @desc フォントを設定します。
 * @text フォント(15)
 * @type string
 * @default 
 * 
 * @param GaugeSetting
 * @text ゲージ設定
 * @default ------------------------------
 * 
 * @param Color1
 * @desc ゲージカラー(左)。テキストタブでカラーコードを入力できます。
 * @text ゲージカラー(左)(10)
 * @type number
 * @default 0
 * @min 0
 * @parent GaugeSetting
 * 
 * @param Color2
 * @desc ゲージカラー(右)。テキストタブでカラーコードを入力できます。
 * @text ゲージカラー(右)(11)
 * @type number
 * @default 0
 * @min 0
 * @parent GaugeSetting
 * 
 * @param ImgesSetting
 * @text 画像設定
 * @default ------------------------------
 * 
 * @param ContentsImges
 * @desc 画像を指定する。
 * @text 画像設定(12)
 * @type file
 * @dir img/
 * @default 
 * @parent ImgesSetting
 * 
 */
/*~struct~WindowTone:
 * 
 * @param red
 * @desc 赤
 * @text 赤
 * @type number
 * @default 0
 * @max 255
 * @min -255
 * 
 * @param green
 * @text 緑
 * @desc 緑
 * @type number
 * @default 0
 * @max 255
 * @min -255
 * 
 * @param bule
 * @text 青
 * @desc 青
 * @type number
 * @default 0
 * @max 255
 * @min -255
 * 
 */
/*~struct~ActorContentsRect:
 * 
 * @param ActorContentsCoordinateMode
 * @text 座標モード
 * @desc 座標モードを指定します。ON:絶対座標 OFF:相対座標
 * @type boolean
 * @default false
 * 
 * @param ActorContentsX
 * @desc アクターステータスウィンドウのコンテンツ表示のX座標を指定します。(相対)
 * @text X座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param ActorContentsY
 * @desc アクターステータスウィンドウのコンテンツ表示のY座標を指定します。(相対)
 * @text Y座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param ActorContentsWidth
 * @desc アクターステータスウィンドウのコンテンツ表示の横幅を指定します。0で通常表示幅
 * @text 横幅
 * @type number
 * @default 0
 * @min 0
 * @max 999
 * 
 * @param ActorContentsHeight
 * @desc アクターステータスウィンドウのコンテンツ表示の縦幅を指定します。0で通常表示幅
 * @text 縦幅
 * @type number
 * @default 0
 * @min 0
 * @max 24
 * 
 */
/*~struct~VibrationData:
 * 
 * @param StartDelay
 * @desc 振動を開始するまでのディレイフレーム数
 * @text 開始ディレイフレーム
 * @type number
 * @default 0
 * @min 0
 * 
 * @param Duration
 * @desc 振動フレーム数
 * @text 振動フレーム数
 * @type number
 * @default 20
 * 
 * @param WeakMagnitude
 * @desc 高周波 (弱い) ランブル モーターのランブル強度。
 * @text 高周波ランブル強度
 * @type string
 * @default 1.0
 * 
 * @param StrongMagnitude
 * @desc 低周波 (強い) ランブル モーターのランブル強度。
 * @text 低周波ランブル強度
 * @type string
 * @default 1.0
 * 
 */

var Imported = Imported || {};
Imported.NUUN_BattleStyleEX_XP = true;

(() => {

const parameters = PluginManager.parameters('NUUN_BattleStyleEX_XP');
const params = {};

params.bsMode = 'XP';

params.PartyCommandPosition = eval(parameters['PartyCommandPosition']) || 'top';
params.PartyCommandWindowSkin = String(parameters['PartyCommandWindowSkin']);
params.PartyCommandWindowColor = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PartyCommandWindowColor'])) : null) || {"red":"0","green":"0","bule":"0"};
params.PartyCommandMaxCol = Number(parameters['PartyCommandMaxCol'] || 4);
params.PartyCommandMaxRow = Number(parameters['PartyCommandMaxRow'] || 1);
params.PartyCommand_X = Number(parameters['PartyCommand_X'] || 0);
params.PartyCommand_Y = Number(parameters['PartyCommand_Y'] || 0);
params.PartyCommand_Width = Number(parameters['PartyCommand_Width'] || 192);
params.PartyCommandMode = eval(parameters['PartyCommandMode'] || "true");
params.PartyCommandWindowShow = eval(parameters['PartyCommandWindowShow'] || "true");
params.PartyCommandWindowCenter = eval(parameters['PartyCommandWindowCenter'] || "true");
params.PartyCommandBackgroundImg = String(parameters['PartyCommandBackgroundImg']);
params.PartyBackground_X = Number(parameters['PartyBackground_X'] || 0);
params.PartyBackground_Y = Number(parameters['PartyBackground_Y'] || 0);

params.ActorCommandPosition = eval(parameters['ActorCommandPosition']) || "actor";
params.ActorCommandWindowSkin = String(parameters['ActorCommandWindowSkin']);
params.ActorCommandWindowColor = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ActorCommandWindowColor'])) : null) || {"red":"0","green":"0","bule":"0"};
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
params.WidthWithCommand = false;

params.EnemyWindowShow = eval(parameters['EnemyWindowShow'] || "true");
params.EnemyMaxRow = Number(parameters['EnemyMaxRow'] || 4);
params.EnemyMaxCol = Number(parameters['EnemyMaxCol'] || 1);
params.EnemyWindow_X = Number(parameters['EnemyWindow_X'] || 0);
params.EnemyWindow_Y = Number(parameters['EnemyWindow_Y'] || 0);
params.EnemyWindow_Width = Number(parameters['EnemyWindow_Width'] || 0);
params.EnemyWindowMode = eval(parameters['EnemyWindowMode'] || "true");
params.EnemyNameDyingColor = eval(parameters['EnemyNameDyingColor'] || "true");
params.EnemyWindowOpacity = Number(parameters['EnemyWindowOpacity'] || 255);
params.EnemyWindowBackgroundImg = String(parameters['EnemyWindowBackgroundImg']);
params.EnemyWindowBackground_X = Number(parameters['EnemyWindowBackground_X'] || 0);
params.EnemyWindowBackground_Y = Number(parameters['EnemyWindowBackground_Y'] || 0);

params.ButtonMode = eval(parameters['ButtonMode']) || 'right';
params.CancelButtonX = Number(parameters['CancelButtonX'] || 0);

params.ActorStatusWindowSkin = String(parameters['ActorStatusWindowSkin']);
params.ActorStatusWindowColor = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ActorStatusWindowColor'])) : null) || {"red":"0","green":"0","bule":"0"};
params.ActorStatusVariable = eval(parameters['ActorStatusVariable'] || "false");
params.ActorMaxCol = Number(parameters['ActorMaxCol'] || 4);
params.ActorMaxRow = Number(parameters['ActorMaxRow'] || 1);
params.ActorStatusMode = eval(parameters['ActorStatusMode']) || "center";
params.ActorStatusRowsMode = eval(parameters['ActorStatusRowsMode']) || "top";
params.ActorStatusWindowPosition = eval(parameters['ActorStatusWindowPosition']) || 'under';
params.ActorStatusWindow_X = Number(parameters['ActorStatusWindow_X'] || 0);
params.ActorStatusWindow_Y = Number(parameters['ActorStatusWindow_Y'] || 0);
params.ActorStatusWindow_Width = Number(parameters['ActorStatusWindow_Width'] || 0);
params.ActorStatusWindow_Height = Number(parameters['ActorStatusWindow_Height'] || 0);
params.ActorStatusWindowCenter = eval(parameters['ActorStatusWindowCenter'] || "false");
params.WindowBackground = String(parameters['WindowBackground']);
params.WindowBackground_X = Number(parameters['WindowBackground_X'] || 0);
params.WindowBackground_Y = Number(parameters['WindowBackground_Y'] || 0);
params.ActorStatusWindowLock = true;
params.WindowShow = eval(parameters['WindowShow'] || "false");
params.WindowFrameShow = eval(parameters['WindowFrameShow'] || "false");
params.CursorBackShow = eval(parameters['CursorBackShow'] || "false");
params.ActorStatusActorWindowShow = eval(parameters['ActorStatusActorWindowShow'] || "false");
params.ActorContentsSetting = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ActorContentsSetting'])) : null) || [];

params.ActorEffectShow = eval(parameters['ActorEffectShow'] || "true");
params.ActorEffect_X = Number(parameters['ActorEffect_X'] || 0);
params.ActorEffect_Y = Number(parameters['ActorEffect_Y'] || 0);
params.ActorDamage_X = Number(parameters['ActorDamage_X'] || 0);
params.ActorDamage_Y = Number(parameters['ActorDamage_Y'] || 0);
params.ActorsMirror = eval(parameters['ActorsMirror'] || "true");
params.StateAnimationShow = eval(parameters['StateAnimationShow'] || "true");
params.ActorState_X = Number(parameters['ActorState_X'] || 0);
params.ActorState_Y = Number(parameters['ActorState_Y'] || 0);
params.EnemyDamage_X = Number(parameters['EnemyDamage_X'] || 0);
params.EnemyDamage_Y = Number(parameters['EnemyDamage_Y'] || 0);

params.DamageImgFrame = Number(parameters['DamageImgFrame'] || 30);
params.CounterImgFrame = Number(parameters['CounterImgFrame'] || 60);
params.ActorShakeFlame = Number(parameters['ActorShakeFlame'] || 36);
params.ActorShakePower = Number(parameters['ActorShakePower'] || 2);
params.ActorShakeSpeed = Number(parameters['ActorShakeSpeed'] || 20);
params.ActionZoomDuration = Number(parameters['ActionZoomDuration'] || 60);
params.ActorFlash = eval(parameters['ActorFlash'] || "true");
params.OnActionZoom = eval(parameters['OnActionZoom'] || "false");
params.OnActorShake = eval(parameters['OnActorShake'] || "false");

params.DefaultStatusPositionData = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['DefaultStatusPositionData'])) : null) || {};
params.DefaultActorImgData = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['DefaultActorImgData'])) : null) || {};
params.ActorData = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ActorData'])) : null) || [];
params.OnActorPictureEX = eval(parameters['OnActorPictureEX'] || "false");
params.Img_SW = Number(parameters['Img_SW'] || 0);
params.Img_SH = Number(parameters['Img_SH'] || 0);
params.FaceHeight = Number(parameters['FaceHeight'] || 0);
params.NameShow = eval(parameters['NameShow'] || "true");
params.ActorNameFont = String(parameters['ActorNameFont']);
params.TPBShow = eval(parameters['TPBShow'] || "true");
params.StateVisible = eval(parameters['StateVisible'] || "true");
params.NoStateIcon = Number(parameters['NoStateIcon'] || 0);
params.OutsideWindowVisible = false;
params.SelectBackShow = eval(parameters['SelectBackShow'] || "true");
params.ActorSelectBackShow = eval(parameters['ActorSelectBackShow'] || "true");
params.ImgDeathHide = eval(parameters['ImgDeathHide'] || "true");
params.FaceHeightOnWindow = eval(parameters['FaceHeightOnWindow'] || "false");
params.NotVisibleStateIcons = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['NotVisibleStateIcons'])) : null) || [];
params.NotVisibleBuffIcons = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['NotVisibleBuffIcons'])) : null) || [];
params.BattleEndActorStatusClose = eval(parameters['BattleEndActorStatusClose'] || "false");
params.BattleShowWeather = eval(parameters['BattleShowWeather']) || 'Show';
params.BattleWeatherSwitch = Number(parameters['BattleWeatherSwitch'] || 0);

params.BattleStartCommonEvent = Number(parameters['BattleStartCommonEvent'] || 0);
params.BattleEndCommonEvent = Number(parameters['BattleEndCommonEvent'] || 0);

params.EnemySkillAnimation = Number(parameters['EnemySkillAnimation'] || 1);

params.AppearWindowVisible = eval(parameters['AppearWindowVisible'] || "false");
params.AppearWindowOpacity = Number(parameters['AppearWindowOpacity'] || 255);
params.AppearWindowAnchorMode = eval(parameters['AppearWindowAnchorMode']) || 'under';
params.AppearBackgroundImg = String(parameters['AppearBackgroundImg']);
params.AppearBackground_X = Number(parameters['AppearWindowBackground_X'] || 0);
params.AppearBackground_Y = Number(parameters['AppearWindowBackground_Y'] || 0);

params.ItemWindowShow = eval(parameters['ItemWindowShow'] || "true");
params.ItemWindowOpacity = Number(parameters['ItemWindowOpacity'] || 255);
params.ItemWindowBackgroundImg = String(parameters['ItemWindowBackgroundImg']);
params.ItemBackground_X = Number(parameters['ItemWindowBackground_X'] || 0);
params.ItemBackground_Y = Number(parameters['ItemWindowBackground_Y'] || 0);
params.ItemMaxRow = Number(parameters['ItemMaxRow'] || 4);
params.ItemMaxCol = Number(parameters['ItemMaxCol'] || 1);
params.ItemWindow_X = Number(parameters['ItemWindow_X'] || 0);
params.ItemWindow_Y = Number(parameters['ItemWindow_Y'] || 0);
params.ItemWindow_Width = Number(parameters['ItemWindow_Width'] || 0);
params.ItemWindowMode = eval(parameters['ItemWindowMode'] || "true");

params.SkillWindowShow = eval(parameters['SkillWindowShow'] || "true");
params.SkillWindowOpacity = Number(parameters['SkillWindowOpacity'] || 255);
params.SkillWindowBackgroundImg = String(parameters['SkillWindowBackgroundImg']);
params.SkillBackground_X = Number(parameters['SkillBackground_X'] || 0);
params.SkillBackground_Y = Number(parameters['SkillBackground_Y'] || 0);
params.SkillMaxRow = Number(parameters['SkillMaxRow'] || 4);
params.SkillMaxCol = Number(parameters['SkillMaxCol'] || 1);
params.SkillWindow_X = Number(parameters['SkillWindow_X'] || 0);
params.SkillWindow_Y = Number(parameters['SkillWindow_Y'] || 0);
params.SkillWindow_Width = Number(parameters['SkillWindow_Width'] || 0);
params.SkillWindowMode = eval(parameters['SkillWindowMode'] || "true");

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

params.DamegeVibration = eval(parameters['DamegeVibration'] || "false");
params.DamegeVibrationSetting = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['DamegeVibrationSetting'])) : null);
params.CriticalVibration = eval(parameters['CriticalVibration'] || "false");
params.CriticalVibrationSetting = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['CriticalVibrationSetting'])) : null);
params.BossCollapseVibration = eval(parameters['BossCollapseVibration'] || "false");
params.BossCollapseVibrationSetting = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['BossCollapseVibrationSetting'])) : null);

params.SupportActorCommand_X = Number(parameters['ESupportActorCommand_X'] || 0);
params.SupportActorCommand_Y = Number(parameters['SupportActorCommand_Y'] || 0);

params.WindowDisplayMode = eval(parameters['WindowDisplayMode']) || 'Sprite';

NuunManager.getBattleStyleParams = function() {
    return params;
};

})();