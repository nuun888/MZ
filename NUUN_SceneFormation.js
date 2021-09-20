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
 * @version 1.2.3
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * メンバーを並び変える画面を追加します。
 * メニューコマンドの並び替えを選択するとメンバーチェンジ画面が表示されるようになります。
 * 
 * 戦闘不能のキャラはデフォルト設定では背景が赤く表示されます。
 * 
 * 選択中のアクターのステータスはカスタマイズ可能です。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
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
 * 
 * @command SceneFormationOpen
 * @desc メンバー変更画面を開きます。
 * @text メンバー変更画面を開く
 * 
 * @param BasicSetting
 * @text 基本設定
 * @default ------------------------------
 * 
 * @param VariableBattleMember
 * @text 戦闘メンバー数可変（未実装）
 * @desc 戦闘メンバー数。
 * @type boolean
 * @default false
 * @parent BasicSetting
 * 
 * @param LavelVisible
 * @text レベル表示
 * @desc 戦闘メンバー及び待機メンバーのアクターにレベルを表示。
 * @type boolean
 * @default false
 * @parent BasicSetting
 * 
 * @param WindowCenter
 * @text ウィンドウ中央自動調整
 * @desc ウィンドウを中央に自動調整します。待機メンバーウィンドウの横幅で調整されます。
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param DeadActorColor
 * @text 戦闘不能アクター背景色
 * @desc 戦闘不能アクターの背景色。
 * @type number
 * @default 18
 * @min -1
 * @parent BasicSetting
 * 
 * @param DecimalMode
 * @text 端数処理四捨五入
 * @desc 表示外小数点を四捨五入で丸める。（falseで切り捨て）
 * @type boolean
 * @default true
 * @parent Setting
 * 
 * @param BattleMemberNameSetting
 * @text 戦闘メンバー名称ウィンドウ設定
 * @default ------------------------------
 * 
 * @param BattleMemberName
 * @text 戦闘メンバー名称
 * @desc 戦闘メンバー名称
 * @type string
 * @default 戦闘メンバー
 * @parent BattleMemberNameSetting
 * 
 * @param BattleMemberName_X
 * @text 戦闘メンバー名称ウィンドウX座標
 * @desc 戦闘メンバー名称ウィンドウX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleMemberNameSetting
 * 
 * @param BattleMemberName_Y
 * @text 戦闘メンバー名称ウィンドウY座標（相対）
 * @desc 戦闘メンバー名称ウィンドウY座標（相対）
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
 * @desc 待機メンバー名称
 * @type string
 * @default 待機メンバー
 * @parent MemberNameSetting
 * 
 * @param MemberName_X
 * @text 待機メンバー名称ウィンドウX座標
 * @desc 待機メンバー名称ウィンドウX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent MemberNameSetting
 * 
 * @param MemberName_Y
 * @text 待機メンバー名称ウィンドウY座標（相対）
 * @desc 待機メンバー名称ウィンドウY座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @parent MemberNameSetting
 * 
 * @param BattleMemberSetting
 * @text バトルメンバーウィンドウ設定
 * @default ------------------------------
 * 
 * @param BattleMember_X
 * @text バトルメンバーウィンドウX座標
 * @desc バトルメンバーウィンドウX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleMemberSetting
 * 
 * @param BattleMember_Y
 * @text バトルメンバーウィンドウY座標（相対）
 * @desc バトルメンバーウィンドウY座標（相対）
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
 * @desc 待機メンバー横表示数
 * @type number
 * @default 10
 * @min 0
 * @parent MemberSetting
 * 
 * @param Member_Rows
 * @text 待機メンバー縦表示数
 * @desc 待機メンバー縦表示数
 * @type number
 * @default 1
 * @parent MemberSetting
 * 
 * @param Member_X
 * @text 待機メンバーウィンドウX座標
 * @desc 待機メンバーウィンドウX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent MemberSetting
 * 
 * @param Member_Y
 * @text 待機メンバーウィンドウY座標（相対）
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
 * @desc アクターの表示ステータス設定
 * @default ["{\"DateSelect\":\"1\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}","{\"DateSelect\":\"100\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}","{\"DateSelect\":\"4\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"2\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"100\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}","{\"DateSelect\":\"3\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"3\",\"Y_Position\":\"1\",\"X_Coordinate\":\"-50\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}","{\"DateSelect\":\"5\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"144\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}","{\"DateSelect\":\"10\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"5\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"20\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}","{\"DateSelect\":\"11\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"6\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"10\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}","{\"DateSelect\":\"60\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"4\",\"Y_Position\":\"1\",\"X_Coordinate\":\"-50\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"240\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}","{\"DateSelect\":\"12\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"2\",\"Y_Position\":\"2\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}","{\"DateSelect\":\"13\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"2\",\"Y_Position\":\"3\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}","{\"DateSelect\":\"14\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"2\",\"Y_Position\":\"4\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}","{\"DateSelect\":\"15\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"3\",\"Y_Position\":\"2\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}","{\"DateSelect\":\"16\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"3\",\"Y_Position\":\"3\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}","{\"DateSelect\":\"17\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"3\",\"Y_Position\":\"4\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}","{\"DateSelect\":\"40\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"2\",\"Y_Position\":\"5\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"380\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}","{\"DateSelect\":\"41\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DetaEval\":\"\",\"X_Position\":\"2\",\"Y_Position\":\"6\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"380\",\"SystemItemWidth\":\"0\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"textMethod\":\"\",\"Back\":\"false\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\"}"]
 * @type struct<ActorStatusList>[]
 * @parent StatusSetting
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
 * @default 0
 * @parent StatusSetting
 * 
 * @param EquipIcons
 * @type struct<EquipIconsData>[]
 * @text 装備アイコン
 * @desc 装備アイコンを設定します。IDは装備スロットの番号と同じです。
 * @default []
 * @parent StatusSetting
 * 
 * 
 * @param ActorFixedSetting
 * @text アクター並び替え固定設定(要Imported.NUUN_ActorFixed)
 * @default ------------------------------
 * 
 * @param FixedActorBackColor
 * @text 固定アクター背景色
 * @desc 固定アクターの背景色。
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
 * @option 現在の経験値(1)(4)(5)(6)(7)(8)(9)(12)
 * @value 40
 * @option 次のレベルまでの経験値(1)(4)(5)(6)(7)(8)(9)(12)
 * @value 41
 * @option オリジナルパラメータ(1)(2)(3)(4)(5)(6)(7)(8)(9)(12)
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
var Imported = Imported || {};
Imported.NUUN_SceneFormation = true;


function Window_FormationBattleMemberName() {
  this.initialize(...arguments);
}

Window_FormationBattleMemberName.prototype = Object.create(Window_StatusBase.prototype);
Window_FormationBattleMemberName.prototype.constructor = Window_FormationBattleMemberName;


function Window_FormationMemberName() {
  this.initialize(...arguments);
}

Window_FormationMemberName.prototype = Object.create(Window_StatusBase.prototype);
Window_FormationMemberName.prototype.constructor = Window_FormationMemberName;


function Window_FormationBattleMember() {
  this.initialize(...arguments);
}

Window_FormationBattleMember.prototype = Object.create(Window_StatusBase.prototype);
Window_FormationBattleMember.prototype.constructor = Window_FormationBattleMember;


function Window_FormationMember() {
  this.initialize(...arguments);
}

Window_FormationMember.prototype = Object.create(Window_StatusBase.prototype);
Window_FormationMember.prototype.constructor = Window_FormationMember;


function Window_FormationStatus() {
  this.initialize(...arguments);
}

Window_FormationStatus.prototype = Object.create(Window_StatusBase.prototype);
Window_FormationStatus.prototype.constructor = Window_FormationStatus;

(() => {
const parameters = PluginManager.parameters('NUUN_SceneFormation');
//const VariableBattleMember = eval(parameters['VariableBattleMember'] || "false");
const VariableBattleMember = false;
const BattleMemberName = String(parameters['BattleMemberName'] || "戦闘メンバー");
const MemberName = String(parameters['MemberName'] || "待機メンバー");
const BattleMemberName_X = Number(parameters['BattleMemberName_X'] || 0);
const BattleMemberName_Y = Number(parameters['BattleMemberName_Y'] || 0);
const MemberName_X = Number(parameters['MemberName_X'] || 0);
const MemberName_Y = Number(parameters['MemberName_Y'] || 0);
const BattleMember_X = Number(parameters['BattleMember_X'] || 0);
const BattleMember_Y = Number(parameters['BattleMember_Y'] || 0);
const Member_X = Number(parameters['Member_X'] || 0);
const Member_Y = Number(parameters['Member_Y'] || 0);
const Member_Cols = Number(parameters['Member_Cols'] || 10);
const Member_Rows = Number(parameters['Member_Rows'] || 1);
const ActorStatus = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ActorStatus'])) : [];
const DecimalMode = eval(parameters['DecimalMode'] || "true");
const WindowCenter = eval(parameters['WindowCenter'] || "true");
const EquipIcons = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['EquipIcons'])) : [];
const EquipNameVisible = Number(parameters['EquipNameVisible'] || 1);
const DeadActorColor = Number(parameters['DeadActorColor'] || 18);
const parameters2 = PluginManager.parameters('NUUN_SceneSupportActorFormation');
const SupportActorColor = Number(parameters2['SupportActorColor'] || 5);
const FixedActorBackColor = Number(parameters['FixedActorBackColor'] || 3);
const LavelVisible = eval(parameters['LavelVisible'] || "false");
const pluginName = "NUUN_SceneFormation";

PluginManager.registerCommand(pluginName, 'SceneFormationOpen', args => {
  if (Imported.NUUN_SceneBattleFormation && $gameParty.inBattle()) {
    SceneManager._scene.commandFormation();
  } else {
    SceneManager.push(Scene_Formation);
  }
});

const _Game_Party_initialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
  this._nowMaxBattleMembers = null;
  this._defaultMaxBattleMembers = null;
  _Game_Party_initialize.call(this);
};

Game_Party.prototype.standbyMembers = function() {
  return this.allMembers().slice(this.maxBattleMembers());
};

Game_Party.prototype.maxFormationBattleMembers = function() {
  return this.maxBattleMembers();
};

Game_Party.prototype.useFormation = function() {
  return true;
};

Game_Party.prototype.isFormationSwitching = function() {
  return VariableBattleMember || (!VariableBattleMember && this.standbyMembers().length > 0);
};

const _Game_Party_maxBattleMembers = Game_Party.prototype.maxBattleMembers;
Game_Party.prototype.maxBattleMembers = function() {
  return _Game_Party_maxBattleMembers.call(this);
  //return _maxBattleMembers.call(this) + this._nomMaxVariable;
};

Game_Party.prototype.defaultMaxBattleMembers = function() {
  return this.maxBattleMembers();
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
};

Scene_Formation.prototype.create = function() {
  Scene_MenuBase.prototype.create.call(this);
  this.createBattleMemberWindow();
  this.createBattleMemberNameWindow();
  this.createMemberWindow();
  this.createMemberNameWindow();
  this.createMemberStatusWindow();
};

Scene_Formation.prototype.createBattleMemberNameWindow = function() {
  const rect = this.battleMemberNameWindowRect();
  this._battleMemberNameWindow = new Window_FormationBattleMemberName(rect);
  this.addWindow(this._battleMemberNameWindow);
};

Scene_Formation.prototype.createMemberNameWindow = function() {
  const rect = this.memberNameWindowRect();
  this._memberNameWindow = new Window_FormationMemberName(rect);
  this.addWindow(this._memberNameWindow);
};

Scene_Formation.prototype.createBattleMemberWindow = function() {
  const rect = this.battleMemberWindowRect();
  this._battleMemberWindow = new Window_FormationBattleMember(rect);
  this._battleMemberWindow.setHandler("ok", this.onBattleMemberOk.bind(this));
  this._battleMemberWindow.setHandler("cancel", this.onBattleMemberCancel.bind(this));
  this.addWindow(this._battleMemberWindow);
  this._battleMemberWindow.activate();
};

Scene_Formation.prototype.createMemberWindow = function() {
  const rect = this.memberWindowRect();
  this._memberWindow = new Window_FormationMember(rect);
  this._memberWindow.setHandler("ok", this.onMemberOk.bind(this));
  this._memberWindow.setHandler("cancel", this.onMemberCancel.bind(this));
  this._battleMemberWindow.setMemberWindow(this._memberWindow);
  this._memberWindow.setMemberWindow(this._battleMemberWindow);
  this.addWindow(this._memberWindow);
};

Scene_Formation.prototype.createMemberStatusWindow = function() {
  const rect = this.memberStatusWindowRect();
  this._memberStatusWindow = new Window_FormationStatus(rect);
  this.addWindow(this._memberStatusWindow);
  this._battleMemberWindow.setMemberStatusWindow(this._memberStatusWindow);
  this._memberWindow.setMemberStatusWindow(this._memberStatusWindow);
  this._battleMemberWindow.select(0);
  $gameTemp.changeCursor = false;
  $gameTemp.changeTouch = false;
};

Scene_Formation.prototype.battleMemberNameWindowRect = function() {
  const wx = BattleMemberName_X + (WindowCenter ? (Graphics.boxWidth - this.memberWindowWidth()) / 2 : 0);
  const wy = BattleMemberName_Y;
  const ww = this.nameWidth();
  const wh = this.calcWindowHeight(1, true);
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Formation.prototype.memberNameWindowRect = function() {
  const wx = MemberName_X + (WindowCenter ? (Graphics.boxWidth - this.memberWindowWidth()) / 2 : 0);
  const wy = this.memberY() + MemberName_Y;
  const ww = this.nameWidth();
  const wh = this.calcWindowHeight(1, true);
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Formation.prototype.battleMemberWindowRect = function() {
  const wx = BattleMember_X + (WindowCenter ? (Graphics.boxWidth - this.memberWindowWidth()) / 2 : 0);
  const wy = this.calcWindowHeight(1, true) + BattleMember_Y;
  const ww = $gameSystem.windowPadding() * 2 + $gameParty.defaultMaxBattleMembers() * 56;
  const wh = 80;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Formation.prototype.memberWindowRect = function() {
  const ww = this.memberWindowWidth();
  const wx = Member_X + WindowCenter ? (Graphics.boxWidth - ww) / 2 : 0;
  const wy = this.memberY() + this.calcWindowHeight(1, true) + Member_Y;
  const wh = 86 + (Member_Rows - 1) * 48;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Formation.prototype.memberStatusWindowRect = function() {
  const wx = 0;
  const wh = this.calcWindowHeight(5, true);
  const wy = Graphics.boxHeight - wh;
  const ww = Graphics.boxWidth;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Formation.prototype.memberWindowWidth = function() {
  return $gameSystem.windowPadding() * 2 + Member_Cols * 56;
};

Scene_Formation.prototype.nameWidth = function() {
  return 240;
};

Scene_Formation.prototype.memberY = function() {
  return this._battleMemberWindow.y + this._battleMemberWindow.height + 12;
};

const _Scene_Formation_update = Scene_Formation.prototype.update;
Scene_Formation.prototype.update = function() {
  _Scene_Formation_update.call(this);
  if ($gameTemp.changeCursor || $gameTemp.changeTouch) {
    if (this._battleMemberWindow._cursorMode === 'battle') {
      this.onChangeBattleMemberOk();
    } else if (this._memberWindow._cursorMode === 'member') {
      this.onChangeMemberOk();
    }
  }
};

Scene_Formation.prototype.onChangeBattleMemberOk = function() {
  this.setMemberCursor();
  const selectIndex = Math.min(this._battleMemberWindow.getSelectIndex(), $gameParty.standbyMembers().length - 1 + (VariableBattleMember ? 1 : 0), Member_Cols);
  this._battleMemberWindow.deselect();
  this._battleMemberWindow.deactivate();
  this._memberWindow.activate();
  if ($gameTemp.changeCursor) {
    this._memberWindow.select(selectIndex);
    $gameTemp.changeCursor = false;
  } else {
    $gameTemp.changeTouch = false;
  }
};

Scene_Formation.prototype.onChangeMemberOk = function() {
  this.setBattleMemberCursor();
  const selectIndex = Math.min(this._memberWindow.getSelectIndex(), $gameParty.maxFormationBattleMembers() - 1 + (VariableBattleMember ? 1 : 0));
  this._memberWindow.deselect();
  this._memberWindow.deactivate();
  this._battleMemberWindow.activate();
  if ($gameTemp.changeCursor) {
    this._battleMemberWindow.select(selectIndex);
    $gameTemp.changeCursor = false;
  } else {
    $gameTemp.changeTouch = false;
  }
};

Scene_Formation.prototype.setMemberCursor = function() {
  this._battleMemberWindow._cursorMode = 'member';
  this._memberWindow._cursorMode = 'member';
};

Scene_Formation.prototype.setBattleMemberCursor = function() {
  this._battleMemberWindow._cursorMode = 'battle';
  this._memberWindow._cursorMode = 'battle';
};

Scene_Formation.prototype.onBattleMemberOk = function() {
  const actorIndex = this._battleMemberWindow.getSelectIndex();
  let pendingIndex = this._battleMemberWindow.pendingIndex();
  let refreshMode = false;
  if (pendingIndex < 0) {
    pendingIndex = this._memberWindow.pendingIndex();
    if (pendingIndex >= 0) {
      refreshMode = true;
    }
  }
  if (pendingIndex >= 0) {
    setPendingIndex = pendingIndex + (refreshMode ? $gameParty.maxFormationBattleMembers() : 0);
    const maxMember = $gameParty.maxFormationBattleMembers();
    //const actor_c = $gameParty.allMembers()[actorIndex];
    //const actor_p = $gameParty.allMembers()[setPendingIndex];
    this.onFormationOk(actorIndex, setPendingIndex);
    let newMaxMember = $gameParty.maxFormationBattleMembers();
    if (actorIndex >= newMaxMember) {
      const selectIndex = Math.min(actorIndex, newMaxMember - 1);
      this._battleMemberWindow.select(selectIndex);
    } else {
      this._battleMemberWindow.redrawItem(actorIndex);
    }
    if (refreshMode) {
      this._memberWindow.redrawItem(pendingIndex);
    } else {
      this._battleMemberWindow.redrawItem(pendingIndex);
    }
    if ( maxMember !== newMaxMember) {
      this._memberWindow.refresh();
      this._battleMemberWindow.refresh();
    }
    //this.onAddActorOk(actorIndex, -1, 'battle');
  } else {
    this._battleMemberWindow.setPendingIndex(actorIndex);
    this._battleMemberWindow.setActorStatus(actorIndex);
  }
  this._battleMemberWindow.activate();
};

Scene_Formation.prototype.onMemberOk = function() {
  const actorIndex = this._memberWindow.getSelectIndex();
  let pendingIndex = this._battleMemberWindow.pendingIndex();
  let refreshMode = false;
  if (pendingIndex < 0) {
    pendingIndex = this._memberWindow.pendingIndex();
    if (pendingIndex >= 0) {
      refreshMode = true;
    }
  }
  if (pendingIndex >= 0) {
    setPendingIndex = pendingIndex + (refreshMode ? $gameParty.maxFormationBattleMembers() : 0);
    const maxMember = $gameParty.maxFormationBattleMembers();
    // actor_c = $gameParty.allMembers()[actorIndex];
    // actor_p = $gameParty.allMembers()[setPendingIndex];
    this.onFormationOk(actorIndex + $gameParty.maxFormationBattleMembers(), setPendingIndex);
    let newMaxMember = $gameParty.maxFormationBattleMembers();
    if (refreshMode) {
      this._memberWindow.redrawItem(pendingIndex);
    } else {
      this._battleMemberWindow.redrawItem(pendingIndex);
    }
    this._memberWindow.redrawItem(actorIndex);
    if (maxMember !== newMaxMember) {
      this._memberWindow.refresh();
      this._battleMemberWindow.refresh();
    }
  } else {
    this._memberWindow.setPendingIndex(actorIndex);
    this._memberWindow.setActorStatus(actorIndex);
  }
  this._memberWindow.activate();
};

Scene_Formation.prototype.onBattleMemberCancel = function() {
  if (this._battleMemberWindow.pendingIndex() >= 0 || this._memberWindow.pendingIndex() >= 0) {
    this._memberWindow.setPendingIndex(-1);
    this._battleMemberWindow.setPendingIndex(-1);
    this._battleMemberWindow.activate();
  } else {
    this.popScene();
  }
};

Scene_Formation.prototype.onMemberCancel = function() {
  if (this._battleMemberWindow.pendingIndex() >= 0 || this._memberWindow.pendingIndex() >= 0) {
    this._memberWindow.setPendingIndex(-1);
    this._battleMemberWindow.setPendingIndex(-1);
    this._memberWindow.activate();
  } else {
    this.popScene();
  }
};
//
Scene_Formation.prototype.onFormationOk = function(index, pendingIndex) {
  $gameParty.swapOrder(index, pendingIndex);
  this._memberWindow.setPendingIndex(-1);
  this._battleMemberWindow.setPendingIndex(-1);
};

Scene_Formation.prototype.onAddActorOk = function(index1, index2, mode) {
  if (mode === 'battle') {//戦闘メンバーと-を交換
    dir = -1;
  } else {
    dir =1;
  }
  //const dir = $gameParty.maxBattleMembers() 
  $gameParty.addFormationOrder(index1, dir);
  this._memberWindow.setPendingIndex(-1);
  this._battleMemberWindow.setPendingIndex(-1);
  
};

Game_Party.prototype.addFormationOrder = function(index1, dir) {//index1にはアクター
  const actorId = this.allMembers()[index1].actorId();
  const index = this._actors.indexOf(actorId);
  const temp = this._actors.splice(index, 1);
  this._actors.push(...temp);
  const members = this.maxFormationBattleMembers();
  this._nowMaxBattleMembers = members + dir;
  $gamePlayer.refresh();
};


Window_StatusBase.prototype.drawBackSupportActor = function(index) {
  const actor = this.actor(index);
  if (index !== this._pendingIndex) {
    const rect = this.itemRect(index);
    const height = 48;
    const y = rect.y + (this.itemHeight() - this.rowSpacing() - height);
    this.contentsBack.paintOpacity = 128;
    if (Imported.NUUN_SceneFormation_SupportActor && SupportActorColor >= 0 && actor && actor.actor().meta.SupportActor) {
      const supportcolor = ColorManager.textColor(SupportActorColor);
      this.contentsBack.fillRect(rect.x, y, rect.width, height, supportcolor);
    }
    if (Imported.NUUN_ActorFixed && actor && FixedActorBackColor >= 0 && actor.getFixed()) {
      const fixedcColor = ColorManager.textColor(FixedActorBackColor);
      this.contentsBack.fillRect(rect.x, y, rect.width, height, fixedcColor);
    }
    if (actor && DeadActorColor >= 0 && actor.isDead()) {
      const deadcolor = ColorManager.textColor(DeadActorColor);
      this.contentsBack.fillRect(rect.x, y, rect.width, height, deadcolor);
    }
    this.contentsBack.paintOpacity = 255;
  }
};

Window_StatusBase.prototype.isbattleMembersDead = function() {
  return $gameParty.battleMembers().filter(actor => actor.isDead()).length;
};


//戦闘メンバー名称
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

//待機メンバー名称
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

//戦闘メンバー
Window_FormationBattleMember.prototype.initialize = function(rect) {
  Window_StatusBase.prototype.initialize.call(this, rect);
  this._cursorMode = 'battle';
  this._pendingIndex = -1;
  this._pendingIndexs = -1;
  this._nuun_FormationMode = true;
  this.refresh();
};

Window_FormationBattleMember.prototype.maxItems = function() {
  return Math.min($gameParty.maxFormationBattleMembers(), $gameParty.battleMembers().length + (VariableBattleMember ? 1 : 0));
};

Window_FormationBattleMember.prototype.maxCols = function() {
  return $gameParty.defaultMaxBattleMembers();
};

Window_FormationBattleMember.prototype.itemHeight = function() {
  return Math.floor(this.innerHeight / 1);
};

Window_FormationBattleMember.prototype.actor = function(index) {
  return $gameParty.battleMembers()[index];
};

Window_FormationBattleMember.prototype.processOk = function() {
  this.setSelectIndex(this.index());
  Window_StatusBase.prototype.processOk.call(this);
};

Window_FormationBattleMember.prototype.select = function(index) {
  Window_Selectable.prototype.select.call(this, index);
  this.setActorStatus(index);
};

Window_FormationBattleMember.prototype.setActorStatus = function(index) {
  const actor = this.actor(index);
  if (this._memberStatusWindow) {
    this._memberStatusWindow.setStatus(actor);
  }
};


Window_FormationBattleMember.prototype.isCurrentItemEnabled = function() {
  const actor = this.actor(this.index());
  const memberPendingIndex = this._memberWindow.pendingIndex();
  const pendingActor = this._memberWindow.actor(memberPendingIndex);
  if (actor && !actor.isDead() && memberPendingIndex >= 0 && pendingActor.isDead()) {
    return this.isbattleMembersDead() < $gameParty.maxBattleMembers() - 1;
  }
  return actor && Window_StatusBase.prototype.isCurrentItemEnabled.call(this) && actor.isFormationChangeOk();
};

Window_FormationBattleMember.prototype.playOkSound = function() {
  SoundManager.playOk();
};

Window_FormationBattleMember.prototype.setMemberStatusWindow = function(memberStatusWindow) {
  this._memberStatusWindow = memberStatusWindow;
};

Window_FormationBattleMember.prototype.setMemberWindow = function(memberWindow) {
  this._memberWindow = memberWindow;
};

Window_FormationBattleMember.prototype.setSelectIndex = function(index) {
  this._selectIndex = index;
};

Window_FormationBattleMember.prototype.getSelectIndex = function() {
  return this._selectIndex;
};

Window_FormationBattleMember.prototype.drawItem = function(index) {
  const rect = this.itemRect(index);
  const actor = this.actor(index);
  this.drawBackSupportActor(index);
  this.drawPendingItemBackground(index);
  if (VariableBattleMember && this.maxItems() - 1 === index && !actor) {
    this.drawText('-', rect.x, rect.y + 16, 48, 'center');
  } else {
    const bitmap = ImageManager.loadCharacter(actor.characterName());
    if (!bitmap.isReady()) {
      bitmap.addLoadListener(this.drawContents.bind(this, actor, rect.x, rect.y, rect.width));
    } else {
      this.drawContents(actor, rect.x, rect.y, rect.width);
    }
  }
};

Window_FormationBattleMember.prototype.drawContents = function(actor, x, y, width) {
  let x2 = x + Math.floor(width / 2);
  let y2 = y +  + this.itemHeight() - this.rowSpacing();
  this.drawCharacter(actor.characterName(), actor.characterIndex(), x2, y2);
  this.drawLavel(actor, x, y, width);
};

Window_FormationBattleMember.prototype.drawLavel = function(actor, x, y, width) {
  if (LavelVisible) {
    const padding = Math.floor(this.itemPadding() / 2);
    y += this.itemHeight() - 32;
    x += padding;
    width -= padding;
    const textWidth = this.textWidth(TextManager.levelA);
    this.contents.fontSize = 16;
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(TextManager.levelA, x, y, width);
    this.resetTextColor();
    this.drawText(actor.level, x + textWidth, y, width - textWidth - padding, "right");
    this.contents.fontSize = $gameSystem.mainFontSize();
  }
};

const _Window_FormationBattleMember_setCursorRect = Window_FormationBattleMember.prototype.setCursorRect;
Window_FormationBattleMember.prototype.setCursorRect = function(x, y, width, height) {
  height = 48;
  y +=this.itemHeight() - this.rowSpacing() - height;
  _Window_FormationBattleMember_setCursorRect.call(this, x, y, width, height);
};

const _Window_FormationBattleMember_drawBackgroundRect = Window_FormationBattleMember.prototype.drawBackgroundRect;
Window_FormationBattleMember.prototype.drawBackgroundRect = function(rect) {
  rect.height = 48;
  rect.y += this.itemHeight() - this.rowSpacing() - rect.height;
  _Window_FormationBattleMember_drawBackgroundRect.call(this, rect);
};

Window_FormationBattleMember.prototype.drawPendingItemBackground = function(index) {
  if (index === this._pendingIndex) {
      const rect = this.itemRect(index);
      const color = ColorManager.pendingColor();    
      const height = 48;
      const y = rect.y + (this.itemHeight() - this.rowSpacing() - height);
      this.changePaintOpacity(false);
      this.contents.fillRect(rect.x, y, rect.width, height, color);
      this.changePaintOpacity(true);
  }
};

const _Window_FormationBattleMember_cursorDown = Window_FormationBattleMember.prototype.cursorDown;
Window_FormationBattleMember.prototype.cursorDown = function(wrap) {
  const index = this.index();
  const rowIndex = Math.floor((this.maxItems() - 1) / this.maxCols()) * this.maxCols();
  _Window_FormationBattleMember_cursorDown.call(this, wrap);
  if ($gameParty.isFormationSwitching() && index >= rowIndex) {
    this.changeCursor();
  }
};

Window_FormationBattleMember.prototype.onTouchSelectActive = function() {
  if (this.isHoverEnabled() && $gameParty.isFormationSwitching() && this._cursorMode === 'member') {
    const hitIndex = this.hitIndex();
    if (hitIndex >= 0) {
      this.activate();
      $gameTemp.changeTouch = true;
    }
  }
};

const _Window_FormationBattleMember_processTouch = Window_FormationBattleMember.prototype.processTouch;
Window_FormationBattleMember.prototype.processTouch = function() {
  this.onTouchSelectActive();
  _Window_FormationBattleMember_processTouch.call(this);
};

Window_FormationBattleMember.prototype.changeCursor = function() {
  this.setSelectIndex(this.index());
  $gameTemp.changeCursor = true;
  this.playCursorSound();
};

Window_FormationBattleMember.prototype.pendingIndex = function() {
  return this._pendingIndex;
};

Window_FormationBattleMember.prototype.setPendingIndex = function(index) {
  const lastPendingIndex = this._pendingIndex;
  this._pendingIndex = index;
  this._pendingIndexs = index;
  this._memberWindow._pendingIndexs = this._pendingIndexs;
  this.redrawItem(this._pendingIndex);
  this.redrawItem(lastPendingIndex);
};


//待機メンバー
Window_FormationMember.prototype.initialize = function(rect) {
  Window_StatusBase.prototype.initialize.call(this, rect);
  this._cursorMode = 'battle';
  this._pendingIndex = -1;
  this._pendingIndexs = -1;
  this._nuun_FormationMode = true;
  this.refresh();
};

Window_FormationMember.prototype.maxItems = function() {
  return $gameParty.standbyMembers().length + (VariableBattleMember ? 1 : 0);
};

Window_FormationMember.prototype.maxCols = function() {
  return Member_Cols;
};

Window_FormationMember.prototype.itemHeight = function() {
  return Math.floor(this.innerHeight / Member_Rows);
};

Window_FormationMember.prototype.actor = function(index) {
  return $gameParty.standbyMembers()[index];
};

Window_FormationMember.prototype.processOk = function() {
  this.setSelectIndex(this.index());
  Window_StatusBase.prototype.processOk.call(this);
};

Window_FormationMember.prototype.select = function(index) {
  Window_Selectable.prototype.select.call(this, index);
  this.setActorStatus(index);
};

Window_FormationMember.prototype.setActorStatus = function(index) {
  const actor = this.actor(index);
  if (this._memberStatusWindow) {
    this._memberStatusWindow.setStatus(actor);
  }
};

Window_FormationMember.prototype.isCurrentItemEnabled = function() {
  const actor = this.actor(this.index());
  const memberPendingIndex = this._battleMemberWindow.pendingIndex();
  const battleMemberActor = this._battleMemberWindow.actor(memberPendingIndex);
  
  if (battleMemberActor && !battleMemberActor.isDead() && actor && actor.isDead()){
    return this.isbattleMembersDead() < $gameParty.maxBattleMembers() - 1;
  }
  return (actor && Window_StatusBase.prototype.isCurrentItemEnabled.call(this) && actor.isFormationChangeOk()) || (this.maxItems() - 1 === this.index());
  //return (actor && actor.isFormationChangeOk()) || (this.maxItems() - 1 === this.index());
};

Window_FormationMember.prototype.setMemberStatusWindow = function(memberStatusWindow) {
  this._memberStatusWindow = memberStatusWindow;
};

Window_FormationMember.prototype.setMemberWindow = function(battleMemberWindow) {
  this._battleMemberWindow = battleMemberWindow;
};

Window_FormationMember.prototype.setSelectIndex = function(index) {
  this._selectIndex = index;
};

Window_FormationMember.prototype.getSelectIndex = function() {
  return this._selectIndex;
};

Window_FormationMember.prototype.drawItem = function(index) {
  this.drawBackSupportActor(index);
  this.drawPendingItemBackground(index);
  const rect = this.itemRect(index);
  const actor = this.actor(index);
  if (VariableBattleMember && this.maxItems() - 1 === index) {
    this.drawText('-', rect.x, rect.y + 16, 48, 'center');
  } else if (actor) {
    const bitmap = ImageManager.loadCharacter(actor.characterName());
    if (!bitmap.isReady()) {
      bitmap.addLoadListener(this.drawContents.bind(this, actor, rect.x, rect.y, rect.width));
    } else {
      this.drawContents(actor, rect.x, rect.y, rect.width);
    }
  }
};

Window_FormationMember.prototype.drawContents = function(actor, x, y, width) {
  let x2 = x + Math.floor(width / 2);
  let y2 = y +  + this.itemHeight() - this.rowSpacing();
  this.drawCharacter(actor.characterName(), actor.characterIndex(), x2, y2);
  this.drawLavel(actor, x, y, width);
};

Window_FormationMember.prototype.drawLavel = function(actor, x, y, width) {
  if (LavelVisible) {
    const padding = Math.floor(this.itemPadding() / 2);
    y += this.itemHeight() - 32;
    x += padding;
    width -= padding;
    const textWidth = this.textWidth(TextManager.levelA);
    this.contents.fontSize = 16;
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(TextManager.levelA, x, y, width);
    this.resetTextColor();
    this.drawText(actor.level, x + textWidth, y, width - textWidth - padding, "right");
    this.contents.fontSize = $gameSystem.mainFontSize();
  }
};

const _Window_FormationMember_setCursorRect = Window_FormationMember.prototype.setCursorRect;
Window_FormationMember.prototype.setCursorRect = function(x, y, width, height) {
  height = 48;
  y +=this.itemHeight() - this.rowSpacing() - height;
  _Window_FormationMember_setCursorRect.call(this, x, y, width, height);
};

const _Window_FormationMember_drawBackgroundRect = Window_FormationMember.prototype.drawBackgroundRect;
Window_FormationMember.prototype.drawBackgroundRect = function(rect) {
  rect.height = 48;
  rect.y += this.itemHeight() - this.rowSpacing() - rect.height;
  _Window_FormationMember_drawBackgroundRect.call(this, rect);
};

Window_FormationMember.prototype.drawPendingItemBackground = function(index) {
  if (index === this._pendingIndex) {
      const rect = this.itemRect(index);
      const color = ColorManager.pendingColor();
      this.changePaintOpacity(false);
      const height = 48;
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
    this.changeCursor();
  }
};

Window_FormationMember.prototype.onTouchSelectActive = function() {
  if (this.isHoverEnabled() && this._cursorMode === 'battle') {
    const hitIndex = this.hitIndex();
    if (hitIndex >= 0) {
      $gameTemp.changeTouch = true;
      this.activate();
    }
  }
};

const _Window_FormationMember_processTouch = Window_FormationMember.prototype.processTouch;
Window_FormationMember.prototype.processTouch = function() {
  this.onTouchSelectActive();
  _Window_FormationMember_processTouch.call(this);
};

Window_FormationMember.prototype.changeCursor = function() {
  this.setSelectIndex(this.index());
  $gameTemp.changeCursor = true;
  this.playCursorSound();
};

Window_FormationMember.prototype.pendingIndex = function() {
  return this._pendingIndex;
};

Window_FormationMember.prototype.setPendingIndex = function(index) {
  const lastPendingIndex = this._pendingIndex;
  this._pendingIndex = index;
  this._pendingIndexs = index + $gameParty.maxFormationBattleMembers();
  this._battleMemberWindow._pendingIndexs = this._pendingIndexs;
  this.redrawItem(this._pendingIndex);
  this.redrawItem(lastPendingIndex);
};


//ステータス
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
  this.contents.clear();
  this.hideAdditionalSprites();
  if (!this._actor) {
    return;
  }
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
      this.drawActorFace(this._actor, x, y);
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

Window_FormationStatus.prototype.drawName = function(list, x, y, width) {
  const text = list.ParamName;
  if (text) {
    this.changeTextColor(ColorManager.textColor(list.NameColor));
    this.drawText(text, x, y, width);
  }
  this.resetTextColor();
};

Window_FormationStatus.prototype.drawDesc = function(list, actor, x, y, width) {
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
      text = this.statusParamDecimal(text, list.Decimal);
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

Window_FormationStatus.prototype.drawOriginalStatus = function(list, actor, x, y, width) {
  const dactor = actor.actor();
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
  if (text !== undefined) {
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
      this.changeTextColor(ColorManager.textColor(list.NameColor));
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
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  this.drawText(expTotal, x, y, width);
  this.resetTextColor();
  this.drawText(this.expTotalValue(), x, y, width, "right");
};

Window_FormationStatus.prototype.drawNextExpInfo = function(list, actor, x, y, width) {
  const lineHeight = this.lineHeight();
  const expNext = TextManager.expNext.format(TextManager.level);
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  this.drawText(expNext, x, y, width);
  this.resetTextColor();
  this.drawText(this.expNextValue(), x, y, width, "right");
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



Window_FormationStatus.prototype.statusParamDecimal = function(val, decimal) {
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

})();

