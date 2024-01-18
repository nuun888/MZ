/*:-----------------------------------------------------------------------------------
 * NUUN_SkillStatusEX.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Skill status screen display customization
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 2.0.1
 * 
 * @help
 * Change the layout of the status window when selecting a skill.
 * This plugin requires "NUUN_MenuScreen"(Ver.2.0.17 or later).
 * 
 * The setting of the item is the same as the menu status setting of "NUUN_MenuScreen".
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 1/18/2024 Ver.2.0.1
 * Fixed an issue where an error was displayed when setting some items.
 * 1/8/2024 Ver.2.0.0
 * Fixed by updating menu screen Ver.3.0.0.
 * 5/14/2023 Ver.1.0.0
 * First edition.
 * 
 * @param Setting
 * @text Common setting
 * @default ------------------------------
 * 
 * @param DecimalMode
 * @text Rounding off
 * @desc Round off the non-display decimal point. (truncated at false)
 * @type boolean
 * @default true
 * @parent Setting
 * 
 * @param WindowSetting
 * @text Window setting
 * @default ------------------------------
 * 
 * @param SkillStatusWidth
 * @text Skill status window width
 * @desc The width of the skill status window.
 * @type number
 * @max 9999
 * @min 0
 * @default 0
 * @parent WindowSetting
 * 
 * @param SkillStatusRows
 * @text skill status, skill type window display cols
 * @desc Display cols in skill status and skill type windows.
 * @type number
 * @max 99
 * @min 1
 * @default 3
 * @parent WindowSetting
 * 
 * @param SkillStatusSetting
 * @text Skill status setting
 * @default ------------------------------
 * 
 * @param SkillStatusList
 * @desc Skill status item settings.
 * @text Skill status item settings
 * @type struct<StatusListData>[]
 * @default ["{\"DateSelect\":\"ActorName\",\"NameColor\":\"16\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"180\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"168\",\"SystemItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"ValueFontFace\":\"\",\"FontFace\":\"\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\"}","{\"DateSelect\":\"HpGauge\",\"NameColor\":\"16\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"360\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"ValueFontFace\":\"\",\"FontFace\":\"\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\"}","{\"DateSelect\":\"MpGauge\",\"NameColor\":\"16\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"360\",\"Y_Coordinate\":\"24\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"ValueFontFace\":\"\",\"FontFace\":\"\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\"}","{\"DateSelect\":\"TpGauge\",\"NameColor\":\"16\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"360\",\"Y_Coordinate\":\"48\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"ValueFontFace\":\"\",\"FontFace\":\"\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\"}","{\"DateSelect\":\"Level\",\"NameColor\":\"16\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"180\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"100\",\"SystemItemWidth\":\"0\",\"Align\":\"'right'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"ValueFontFace\":\"\",\"FontFace\":\"\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\"}","{\"DateSelect\":\"State\",\"NameColor\":\"16\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"3\",\"X_Coordinate\":\"180\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"144\",\"SystemItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"ValueFontFace\":\"\",\"FontFace\":\"\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\"}","{\"DateSelect\":\"Class\",\"NameColor\":\"0\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"360\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"168\",\"SystemItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"ValueFontFace\":\"\",\"FontFace\":\"\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\"}"]
 * @parent SkillStatusSetting
 * 
 * @param SameAsMenu
 * @text Skill status item settings
 * @desc Applied menu screen expansion settings.
 * @type boolean
 * @default false
 * @parent SkillStatusSetting
 *  
 * @param ActorSetting
 * @text Actor settings
 * @default ------------------------------
 * 
 * @param GraphicMode
 * @desc Specifies the actor image to display.
 * @text Display actor image
 * @type select
 * @option None
 * @value 'none'
 * @option Face
 * @value 'face'
 * @option Img
 * @value 'img'
 * @default 'face'
 * @parent ActorSetting
 * 
 * @param ActorsImgList
 * @text Image settings
 * @desc Actor image settings
 * @default []
 * @type struct<actorImgList>[]
 * @parent ActorSetting
 * 
 * @param ActorPictureEXApp
 * @text Apply NUUN_ActorPicture
 * @desc Apply the image change of "NUUN_ActorPicture". If you turn it off, the settings in this plugin will be applied.
 * @type boolean
 * @default true
 * @parent ActorSetting
 * 
 * @param ActorImg_X
 * @text Actor image base X coordinate
 * @desc Basic X coordinate of the actor image
 * @type number
 * @max 9999
 * @min -9999
 * @default 0
 * @parent ActorSetting
 * 
 * @param ActorImg_Y
 * @text Actor image base Y coordinate
 * @desc Basic Y coordinate of the actor image
 * @type number
 * @max 9999
 * @min -9999
 * @default 0
 * @parent ActorSetting
 * 
 * @param GaugeSetting
 * @text Gauge setting
 * @default ------------------------------
 * 
 * @param HPGaugeWidth
 * @text Width of HP gauge
 * @desc Specifies the width of the HP gauge.
 * @type number
 * @default 128
 * @min 0
 * @parent GaugeSetting
 * 
 * @param MPGaugeWidth
 * @text MP gauge width
 * @desc Specifies the width of the MP gauge.
 * @type number
 * @default 128
 * @min 0
 * @parent GaugeSetting
 * 
 * @param TPGaugeWidth
 * @text TP gauge width
 * @desc Specifies the width of the TP gauge.
 * @type number
 * @default 128
 * @min 0
 * @parent GaugeSetting
 * 
 * @param ExpgaugeSetting
 * @text EXP gauge settings
 * @default ------------------------------
 * 
 * @param ExpDisplayMode
 * @text Display of exp
 * @desc Specifies the display of experience points.
 * @type select
 * @option None
 * @value 0
 * @option Required experience to next level
 * @value 1
 * @option Current experience gained
 * @value 2
 * @option Current Acquisition Percentage Display
 * @value 3
 * @default 1
 * @parent ExpgaugeSetting
 * 
 * @param ExpGaugeWidth
 * @text Width of Exp Gauge
 * @desc Specifies the width of the Exp gauge.
 * @type number
 * @default 128
 * @min 0
 * @parent ExpgaugeSetting
 * 
 * @param LabelShow
 * @text Label display
 * @desc Show label.
 * @type boolean
 * @default true
 * @parent ExpgaugeSetting
 * 
 * @param ExpGaugeColor1
 * @desc Exp gauge system color ID 1 (left)
 * @text Exp value gauge color 1
 * @type color
 * @default 17
 * @min 0
 * @parent ExpgaugeSetting
 * 
 * @param ExpGaugeColor2
 * @desc Exp gauge system color ID2 (right)
 * @text Exp value gauge color 2
 * @type color
 * @default 6
 * @min 0
 * @parent ExpgaugeSetting
 * 
 * @param EXPDecimal
 * @text Decimal place number
 * @desc The number of decimal places that can be displayed.
 * @type number
 * @default 2
 * @min 0
 * @max 99
 * @parent ExpgaugeSetting
* 
*/
/*:ja
 * @target MZ
 * @plugindesc スキルステータス画面表示カスタマイズ
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 2.0.1
 * 
 * @help
 * スキル選択時のステータスウィンドウのレイアウトを変更します。
 * このプラグインはメニュー画面プラグイン(Ver.2.0.17以降)が必要になります。
 * 
 * 項目の設定はメニュー画面プラグインのメニューステータス設定と同じです。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/1/18 Ver.2.0.1
 * 一部項目の設定でエラーが表示される問題を修正。
 * 2024/1/8 Ver.2.0.0
 * メニュー画面Ver.3.0.0更新による修正。
 * 2023/5/14 Ver.1.0.0
 * 初版。
 * 
 * @param Setting
 * @text 共通設定
 * @default ------------------------------
 * 
 * @param DecimalMode
 * @text 端数処理四捨五入
 * @desc 表示外小数点を四捨五入で丸める。（falseで切り捨て）
 * @type boolean
 * @default true
 * @parent Setting
 * 
 * @param WindowSetting
 * @text ウィンドウ設定
 * @default ------------------------------
 * 
 * @param SkillStatusWidth
 * @text スキルステータスウィンドウ横幅
 * @desc スキルステータスウィンドウの横幅。
 * @type number
 * @max 9999
 * @min 0
 * @default 0
 * @parent WindowSetting
 * 
 * @param SkillStatusRows
 * @text スキルステータス、スキルタイプウィンドウ表示行
 * @desc スキルステータス及びスキルタイプウィンドウの表示行。
 * @type number
 * @max 99
 * @min 1
 * @default 3
 * @parent WindowSetting
 * 
 * @param SkillStatusSetting
 * @text スキルステータス設定
 * @default ------------------------------
 * 
 * @param SkillStatusList
 * @desc スキルステータス項目設定
 * @text スキルステータス項目設定
 * @type struct<StatusListData>[]
 * @default ["{\"DateSelect\":\"ActorName\",\"NameColor\":\"16\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"180\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"168\",\"SystemItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"ValueFontFace\":\"\",\"FontFace\":\"\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\"}","{\"DateSelect\":\"HpGauge\",\"NameColor\":\"16\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"360\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"ValueFontFace\":\"\",\"FontFace\":\"\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\"}","{\"DateSelect\":\"MpGauge\",\"NameColor\":\"16\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"360\",\"Y_Coordinate\":\"24\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"ValueFontFace\":\"\",\"FontFace\":\"\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\"}","{\"DateSelect\":\"TpGauge\",\"NameColor\":\"16\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"360\",\"Y_Coordinate\":\"48\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"ValueFontFace\":\"\",\"FontFace\":\"\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\"}","{\"DateSelect\":\"Level\",\"NameColor\":\"16\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"180\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"100\",\"SystemItemWidth\":\"0\",\"Align\":\"'right'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"ValueFontFace\":\"\",\"FontFace\":\"\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\"}","{\"DateSelect\":\"State\",\"NameColor\":\"16\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"3\",\"X_Coordinate\":\"180\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"144\",\"SystemItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"ValueFontFace\":\"\",\"FontFace\":\"\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\"}","{\"DateSelect\":\"Class\",\"NameColor\":\"0\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"360\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"168\",\"SystemItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"ValueFontFace\":\"\",\"FontFace\":\"\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\"}"]
 * @parent SkillStatusSetting
 * 
 * @param SameAsMenu
 * @text メニュー画面設定適用
 * @desc メニュー画面拡張の設定を適用。
 * @type boolean
 * @default false
 * @parent SkillStatusSetting
 * 
 * @param ActorSetting
 * @text アクター設定
 * @default ------------------------------
 * 
 * @param GraphicMode
 * @desc 表示するアクター画像を指定します。
 * @text 表示アクター画像
 * @type select
 * @option 表示なし
 * @value 'none'
 * @option 顔グラ
 * @value 'face'
 * @option 画像
 * @value 'img'
 * @default 'face'
 * @parent ActorSetting
 * 
 * @param ActorsImgList
 * @text 画像設定
 * @desc アクターの画像設定。立ち絵表示EX適用がONの場合は画像の設定は行いません。
 * @default []
 * @type struct<actorImgList>[]
 * @parent ActorSetting
 * 
 * @param ActorPictureEXApp
 * @text 立ち絵表示EX適用
 * @desc 立ち絵表示EXの画像変更を適用します。OFFにした場合はこのプラグインでの設定が適用されます。
 * @type boolean
 * @default true
 * @parent ActorSetting
 * 
 * @param ActorImg_X
 * @text アクター画像基本X座標
 * @desc アクター画像の基本X座標
 * @type number
 * @max 9999
 * @min -9999
 * @default 0
 * @parent ActorSetting
 * 
 * @param ActorImg_Y
 * @text アクター画像基本Y座標
 * @desc アクター画像の基本Y座標
 * @type number
 * @max 9999
 * @min -9999
 * @default 0
 * @parent ActorSetting
 * 
 * @param GaugeSetting
 * @text ゲージ設定
 * @default ------------------------------
 * 
 * @param HPGaugeWidth
 * @text HPゲージ横幅
 * @desc HPゲージの横幅を指定します。
 * @type number
 * @default 168
 * @min 0
 * @parent GaugeSetting
 * 
 * @param MPGaugeWidth
 * @text MPゲージ横幅
 * @desc MPゲージの横幅を指定します。
 * @type number
 * @default 168
 * @min 0
 * @parent GaugeSetting
 * 
 * @param TPGaugeWidth
 * @text TPゲージ横幅
 * @desc TPゲージの横幅を指定します。
 * @type number
 * @default 168
 * @min 0
 * @parent GaugeSetting
 * 
 * @param ExpgaugeSetting
 * @text 経験値ゲージ設定
 * @default ------------------------------
 * 
 * @param ExpDisplayMode
 * @text 経験値の表示
 * @desc 経験値の表示を指定します。
 * @type select
 * @option 表示なし
 * @value 0
 * @option 次のレベルまでの必要経験値
 * @value 1
 * @option 現在の獲得経験値
 * @value 2
 * @option 現在の獲得経験値の百分率表示
 * @value 3
 * @default 1
 * @parent ExpgaugeSetting
 * 
 * @param ExpGaugeWidth
 * @text Expゲージ横幅
 * @desc Expゲージの横幅を指定します。
 * @type number
 * @default 168
 * @min 0
 * @parent ExpgaugeSetting
 * 
 * @param LabelShow
 * @text ラベル表示
 * @desc ラベルを表示します
 * @type boolean
 * @default true
 * @parent ExpgaugeSetting
 * 
 * @param ExpGaugeColor1
 * @desc 経験値のゲージのシステムカラーID１（左）
 * @text 経験値ゲージ色１
 * @type color
 * @default 17
 * @min 0
 * @parent ExpgaugeSetting
 * 
 * @param ExpGaugeColor2
 * @desc 経験値のゲージのシステムカラーID２（右）
 * @text 経験値ゲージ色２
 * @type color
 * @default 6
 * @min 0
 * @parent ExpgaugeSetting
 * 
 * @param EXPDecimal
 * @text 小数点桁数
 * @desc 表示出来る小数点桁数。
 * @type number
 * @default 2
 * @min 0
 * @max 99
 * @parent ExpgaugeSetting
 * 
 */
/*~struct~StatusListData:
 *
 * @param DateSelect
 * @text status to display
 * @desc Specifies the status to display.
 * @type select
 * @option None
 * @value None
 * @option Actor name(3)(4)(5)(6)(7)(9)(13)(15)
 * @value ActorName
 * @option Nickname(1)(3)(4)(5)(6)(7)(9)(13)(15)
 * @value Nickname
 * @option Class業(1)(3)(4)(5)(6)(7)(9)(13)(15)
 * @value Class
 * @option Level(1)(3)(4)(5)(6)(7)(13)(14)(15)
 * @value Level
 * @option State(3)(4)(5)(6)(7)(10※1)
 * @value State
 * @option State (same display as for battle)(3)(4)(5)(6)
 * @value State2
 * @option Original parameter(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)(14)(15)
 * @value OrgParam
 * @option HP Gauge(2)(3)(4)(5)(6)(7)(21)(23)(24)
 * @value HpGauge
 * @option MP Gauge(2)(3)(4)(5)(6)(7)(21)(23)(24)
 * @value MpGauge
 * @option TP Gauge(2)(3)(4)(5)(6)(7)(21)(23)(24)
 * @value TpGauge
 * @option EXP(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)(14)(15)
 * @value Exp
 * @option EXP Gauge(1)(2)(3)(4)(5)(6)(7)(21)
 * @value ExpGauge
 * @option ATK(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)(14)(15)
 * @value Atk
 * @option Def(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)(14)(15)
 * @value Def
 * @option Mat(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)(14)(15)
 * @value Mat
 * @option Mdf(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)(14)(15)
 * @value Mdf
 * @option Agi(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)(14)(15)
 * @value Agi
 * @option Luk(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)(14)(15)
 * @value Luk
 * @option Hit(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value Hit
 * @option Evasion(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value Eva
 * @option Critcal rate(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value Cri
 * @option Critcal evade(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value CritcalEvade
 * @option Magic evade(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value MagicEvade
 * @option Magic reflect(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value MagicrEflect
 * @option Counter(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value Counter
 * @option HP regen(1)(2)(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value HpRegen
 * @option MP regen(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value MpRegen
 * @option TP regen(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value TpRegen
 * @option Aggro(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value Aggro
 * @option Guard(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value Guard
 * @option Recovery(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value Recovery
 * @option Item effect(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value ItemEffect
 * @option MP cost(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value MpCost
 * @option TP charge(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value TpCharge
 * @option Physical damage(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value PhysicalDamage
 * @option Magical damage(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value MagicalDamage
 * @option Floor damage(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value FloorDamage
 * @option Gain exp rate(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value GainExpRate
 * @option Original gauge(2)(3)(4)(5)(6)(7)(10)(20)(21)(22)(23)(24)
 * @value OrgGauge
 * @option Image(3)(4)(5)(6)(10)(25)
 * @value Imges
 * @option Character chip(3)(4)(5)(6)(25)
 * @value Charchip
 * @option SV Actor(3)(4)(5)(6)(25)
 * @value SvActor
 * @option Line(1)(2)(3)(4)(5)(6)(7)
 * @value HorzLine
 * @default None
 * 
 * @param NameColor
 * @desc System color ID for system items. You can enter the color code in the text tab.
 * @text Name color(1)
 * @type color
 * @default 16
 * @min 0
 * 
 * @param ParamName
 * @desc Set the item name.
 * @text Name(2)
 * @type string
 * @default
 * 
 * @param X_Position
 * @text X display col position(3)
 * @desc X display col position
 * @type number
 * @default 1
 * @min 1
 * @max 1
 * 
 * @param Y_Position
 * @desc Y display row position
 * @text Y display row position(4)
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * 
 * @param X_Coordinate
 * @text X coordinate (relative)(5)
 * @desc X coordinate (relative coordinate from X display col position)
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param Y_Coordinate
 * @text Y coordinate (relative)(6)
 * @desc Y coordinate (relative coordinate from Y display row position)
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param ItemWidth
 * @desc Item, gauge width(0 for default width)
 * @text Item, gauge width(7)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param SystemItemWidth
 * @desc Width of item name (default width at 0)
 * @text Width of item name(8)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param Align
 * @desc Align.
 * @text Align(9)
 * @type select
 * @option Left
 * @value 'left'
 * @option Right
 * @value 'right'
 * @option Center
 * @value 'center'
 * @default 'left'
 * 
 * @param DetaEval
 * @desc Enter an evaluation formula or string.
 * @text Evaluation formula or string(javaScript)(10)
 * @type combo
 * @option '$gameVariables.value(0);//Game variable'
 * @option 'actor;//Actor game data'
 * @option 'actor.actor();//Actor system data'
 * @default 
 * 
 * @param paramUnit
 * @desc Set the units.
 * @text Unit(11)
 * @type string
 * @default 
 * 
 * @param Decimal
 * @text Decimal place number(12)
 * @desc The number of decimal places that can be displayed.
 * @type number
 * @default 0
 * @min 0
 * @max 99
 * 
 * @param FontSize
 * @desc Font size (difference from main font)
 * @text Font size(13)
 * @type number
 * @default 0
 * @min -99
 * 
 * @param ValueFontFace
 * @desc Sets the font for parameter text.
 * @text Parameter font(14)
 * @type string
 * @default 
 * 
 * @param FontFace
 * @desc Sets the font for item names.
 * @text Item name font(15)
 * @type string
 * @default 
 * 
 * @param GaugeSetting
 * @text Gauge setting
 * @default ------------------------------
 * 
 * @param GaugeID
 * @desc Identification ID.
 * @text  Identification ID(20)
 * @type string
 * @default 
 * @parent GaugeSetting
 * 
 * @param GaugeHeight
 * @desc Specifies the vertical width of a gauge.
 * @text Gauge vertical width(21)
 * @type number
 * @default 12
 * @min 0
 * @max 24
 * @parent GaugeSetting
 * 
 * @param DetaEval2
 * @desc Max value evaluation formula.
 * @text Max evaluation formula(javaScript)(22)
 * @type combo
 * @option '$gameVariables.value(0);//Game variable'
 * @option 'actor;//Actor game data'
 * @option 'actor.actor();//Actor system data'
 * @default 
 * @parent GaugeSetting
 * 
 * @param Color1
 * @desc Gauge system color ID (left). You can enter the color code in the text tab.
 * @text Gauge color (left)(23)
 * @type color
 * @default -1
 * @min -1
 * @parent GaugeSetting
 * 
 * @param Color2
 * @desc Gauge system color ID (right). You can enter the color code in the text tab.
 * @text Gauge color (right)(24)
 * @type color
 * @default -1
 * @min -1
 * @parent GaugeSetting
 * 
 * @param ImgSetting
 * @text Image settings
 * @default ------------------------------
 * 
 * @param ImgData
 * @desc Specifies the image to display.
 * @text Image(25)
 * @type file
 * @dir img/
 * @default 
 * @parent ImgSetting
 * 
 * @param BattleMemberOpacity
 * @text Non-battle member image translucency
 * @desc Semi-transparency is enabled outside the battle members.
 * @type boolean
 * @default true
 * @parent ImgSetting
 * 
 * @param CondSetting
 * @text Display condition settings
 * @default ------------------------------
 * 
 * @param Conditions
 * @desc Specify the conditions under which the item will be displayed. (JavaScript)
 * @text Item conditions
 * @type combo
 * @option '$gameVariables.value(0);//Game variable'
 * @option 'actor;//Actor game data'
 * @option 'actor.actor();//Actor system data'
 * @option '$dataSystem.optDisplayTp'//TP display
 * @default 
 *
 */
/*~struct~StatusListData:ja
 *
 * @param DateSelect
 * @text 表示するステータス
 * @desc 表示するステータスを指定します。
 * @type select
 * @option なし
 * @value None
 * @option アクター名(3)(4)(5)(6)(7)(9)(13)(15)
 * @value ActorName
 * @option 二つ名(1)(3)(4)(5)(6)(7)(9)(13)(15)
 * @value Nickname
 * @option 職業(1)(3)(4)(5)(6)(7)(9)(13)(15)
 * @value Class
 * @option レベル(1)(3)(4)(5)(6)(7)(13)(14)(15)
 * @value Level
 * @option ステート(3)(4)(5)(6)(7)(10※1)
 * @value State
 * @option ステート(戦闘用と同じ表示)(3)(4)(5)(6)
 * @value State2
 * @option 独自パラメータ(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)(14)(15)
 * @value OrgParam
 * @option HP(2)(3)(4)(5)(6)(7)(21)(23)(24)
 * @value HpGauge
 * @option MP(2)(3)(4)(5)(6)(7)(21)(23)(24)
 * @value MpGauge
 * @option TP(2)(3)(4)(5)(6)(7)(21)(23)(24)
 * @value TpGauge
 * @option 経験値(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)(14)(15)
 * @value Exp
 * @option 経験値（ゲージあり）(1)(2)(3)(4)(5)(6)(7)(21)
 * @value ExpGauge
 * @option 攻撃力(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)(14)(15)
 * @value Atk
 * @option 防御力(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)(14)(15)
 * @value Def
 * @option 魔法力(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)(14)(15)
 * @value Mat
 * @option 魔法防御(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)(14)(15)
 * @value Mdf
 * @option 敏捷性(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)(14)(15)
 * @value Agi
 * @option 運(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)(14)(15)
 * @value Luk
 * @option 命中率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value Hit
 * @option 回避率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value Eva
 * @option 会心率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value Cri
 * @option 会心回避率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value CritcalEvade
 * @option 魔法回避率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value MagicEvade
 * @option 魔法反射率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value MagicrEflect
 * @option 反撃率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value Counter
 * @option HP再生率(1)(2)(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value HpRegen
 * @option MP再生率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value MpRegen
 * @option TP再生率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value TpRegen
 * @option 狙われ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value Aggro
 * @option 防御効果率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value Guard
 * @option 回復効果率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value Recovery
 * @option 薬の知識(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value ItemEffect
 * @option MP消費率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value MpCost
 * @option TPチャージ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value TpCharge
 * @option 物理ダメージ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value PhysicalDamage
 * @option 魔法ダメージ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value MagicalDamage
 * @option 床ダメージ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value FloorDamage
 * @option 獲得経験値率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value GainExpRate
 * @option 独自ゲージ(2)(3)(4)(5)(6)(7)(10)(20)(21)(22)(23)(24)
 * @value OrgGauge
 * @option 画像(3)(4)(5)(6)(10)(25)
 * @value Imges
 * @option キャラチップ(3)(4)(5)(6)(25)
 * @value Charchip
 * @option SVアクター(3)(4)(5)(6)(25)
 * @value SvActor
 * @option ライン(1)(2)(3)(4)(5)(6)(7)
 * @value HorzLine
 * @default None
 * 
 * @param NameColor
 * @desc 項目名称のシステムカラーID。テキストタブでカラーコードを入力できます。
 * @text 項目名称文字色(1)
 * @type color
 * @default 16
 * @min 0
 * 
 * @param ParamName
 * @desc 項目の名称を設定します。
 * @text 名称(2)
 * @type string
 * @default
 * 
 * @param X_Position
 * @text X表示列位置(3)
 * @desc X表示列位置
 * @type number
 * @default 1
 * @min 1
 * @max 1
 * 
 * @param Y_Position
 * @desc Y表示行位置
 * @text Y表示行位置(4)
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * 
 * @param X_Coordinate
 * @text X座標（相対）(5)
 * @desc X座標（X表示列位置からの相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param Y_Coordinate
 * @text Y座標（相対）(6)
 * @desc Y座標（Y表示行位置からの相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param ItemWidth
 * @desc 項目、ゲージ横幅（0でデフォルト幅）
 * @text 項目、ゲージ横幅(7)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param SystemItemWidth
 * @desc 項目名称の横幅（0でデフォルト幅）
 * @text 項目名称横幅(8)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param Align
 * @desc 文字揃え。
 * @text 文字揃え(9)
 * @type select
 * @option 左
 * @value 'left'
 * @option 右
 * @value 'right'
 * @option 中央
 * @value 'center'
 * @default 'left'
 * 
 * @param DetaEval
 * @desc 評価式または文字列を記入します。
 * @text 評価式or文字列(javaScript)(10)
 * @type combo
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option 'actor;//アクターのゲームデータ'
 * @option 'actor.actor();//アクターのシステムデータ'
 * @default 
 * 
 * @param paramUnit
 * @desc 単位を設定します。
 * @text 単位(11)
 * @type string
 * @default 
 * 
 * @param Decimal
 * @text 小数点桁数(12)
 * @desc 表示出来る小数点桁数。
 * @type number
 * @default 0
 * @min 0
 * @max 99
 * 
 * @param FontSize
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ(13)
 * @type number
 * @default 0
 * @min -99
 * 
 * @param ValueFontFace
 * @desc パラメータテキストのフォントを設定します。
 * @text パラメータフォント(14)
 * @type string
 * @default 
 * 
 * @param FontFace
 * @desc 項目名称のフォントを設定します。
 * @text 項目名称フォント(15)
 * @type string
 * @default 
 * 
 * @param GaugeSetting
 * @text ゲージ設定
 * @default ------------------------------
 * 
 * @param GaugeID
 * @desc 識別ID。
 * @text 識別ID(20)
 * @type string
 * @default 
 * @parent GaugeSetting
 * 
 * @param GaugeHeight
 * @desc ゲージの縦幅を指定します。
 * @text ゲージの縦幅(21)
 * @type number
 * @default 12
 * @min 0
 * @max 24
 * @parent GaugeSetting
 * 
 * @param DetaEval2
 * @desc 最大値の評価式。
 * @text 最大値評価式(javaScript)(22)
 * @type combo
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option 'actor;//アクターのゲームデータ'
 * @option 'actor.actor();//アクターのシステムデータ'
 * @default 
 * @parent GaugeSetting
 * 
 * @param Color1
 * @desc ゲージのシステムカラーID(左)。テキストタブでカラーコードを入力できます。
 * @text ゲージカラー(左)(23)
 * @type color
 * @default -1
 * @min -1
 * @parent GaugeSetting
 * 
 * @param Color2
 * @desc ゲージのシステムカラーID(右)。テキストタブでカラーコードを入力できます。
 * @text ゲージカラー(右)(24)
 * @type color
 * @default -1
 * @min -1
 * @parent GaugeSetting
 * 
 * @param ImgSetting
 * @text 画像設定
 * @default ------------------------------
 * 
 * @param ImgData
 * @desc 表示する画像を指定します。
 * @text 画像(25)
 * @type file
 * @dir img/
 * @default 
 * @parent ImgSetting
 * 
 * @param BattleMemberOpacity
 * @text 非バトルメンバー画像半透明
 * @desc バトルメンバーではない時の半透明有効。
 * @type boolean
 * @default true
 * @parent ImgSetting
 * 
 * @param CondSetting
 * @text 表示条件設定
 * @default ------------------------------
 * 
 * @param Conditions
 * @desc 項目が表示される条件を指定します。(JavaScript)
 * @text 項目条件
 * @type combo
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option 'actor;//アクターのゲームデータ'
 * @option 'actor.actor();//アクターのシステムデータ'
 * @option '$dataSystem.optDisplayTp'//TP表示
 * @default 
 *
 */
/*~struct~actorImgList:
 * 
 * @param actorId
 * @text Actor
 * @desc Specifies an actor.
 * @type actor
 * @default 0
 * 
 * @param ClassId
 * @text Class ID
 * @desc Specify your occupation. If the occupation ID is specified, this will take precedence.
 * @type class
 * @default 0
 * 
 * @param GraphicMode
 * @desc Specifies the actor image to display.
 * @text Individual Display Actor Image
 * @type select
 * @option None
 * @value 'none'
 * @option Face
 * @value 'face'
 * @option Image
 * @value 'img'
 * @option Image(APNG)
 * @value 'imgApng'
 * @option Settings in the display actor image
 * @value 'default'
 * @default 'default'
 * 
 * @param ActorImg
 * @text Actor image※1
 * @desc Display the image of the actor. If you want to switch the standing picture, please set the image in the list. 
 * @type file
 * @dir img/
 * @default 
 * 
 * @param FaceImg
 * @text Face image※1
 * @desc Set the sprite sheet of the face graphic image.
 * @type file
 * @dir img/faces
 * 
 * @param FaceIndex
 * @desc Index ID of the Face image.
 * @text Face index ID
 * @type number
 * @default -1
 * @min -1
 * @max 9999
 * 
 * @param Actor_X
 * @desc X coordinate of the image.
 * @text Image x-coordinate
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Actor_Y
 * @desc Y coordinate of the image.
 * @text Image y-coordinate
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Img_SX
 * @desc The display start coordinate X of the image.
 * @text Image display start coordinate X
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Img_SY
 * @desc The display start coordinate Y of the image.
 * @text Image display start coordinate Y
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Actor_Scale
 * @desc Actor image Scale.
 * @text Actor image Scale
 * @type number
 * @default 100
 * @min 0
 * @max 999
 * 
 * @param ActorBackImg
 * @desc Specify the background image file name for the actor.
 * @text Actor background image
 * @type file
 * @dir img/
 * @default 
 * 
 * @param ActorFrontImg
 * @desc Specifies the foreground image file name of the actor.
 * @text Actor front image
 * @type file
 * @dir img/
 * @default 
 * 
 */
/*~struct~actorImgList:ja
 * 
 * @param actorId
 * @text アクター
 * @desc アクターを指定します。
 * @type actor
 * @default 0
 * 
 * @param ClassId
 * @text 職業ID
 * @desc 職業を指定します。職業のIDが指定されている場合はこちらが優先されます。
 * @type class
 * @default 0
 * 
 * @param GraphicMode
 * @desc 表示するアクター画像を指定します。
 * @text 個別表示アクター画像
 * @type select
 * @option 表示なし
 * @value 'none'
 * @option 顔グラ
 * @value 'face'
 * @option 画像
 * @value 'img'
 * @option 画像(APNG)
 * @value 'imgApng'
 * @option 表示アクター画像での設定
 * @value 'default'
 * @default 'default'
 * 
 * @param ActorImg
 * @text アクター画像※1
 * @desc アクターの画像を表示します。立ち絵を切り替える場合はリストに画像を設定してください。(顔グラ表示OFF)
 * @type file
 * @dir img/
 * @default 
 * 
 * @param FaceImg
 * @text 顔グラ画像※1
 * @desc 顔グラ画像のスプライトシートを設定します。(顔グラ表示ON)
 * @type file
 * @dir img/faces
 * 
 * @param FaceIndex
 * @desc 顔グラのインデックスID。
 * @text 顔グラインデックスID※1
 * @type number
 * @default -1
 * @min -1
 * @max 9999
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
 * @param ActorBackImg
 * @desc アクターの背景画像ファイル名を指定します。
 * @text アクターの背景画像
 * @type file
 * @dir img/
 * @default 
 * 
 * @param ActorFrontImg
 * @desc アクターの前面画像ファイル名を指定します。
 * @text アクターの前面画像
 * @type file
 * @dir img/
 * @default 
 * 
 */

var Imported = Imported || {};
Imported.NUUN_SkillStatusEX = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_SkillStatusEX');
    const SkillStatusWidth = Number(parameters['SkillStatusWidth'] || 0);
    const SkillStatusRows = Number(parameters['SkillStatusRows'] || 3);
    const StatusList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['SkillStatusList'])) : null) || [];
    const DecimalMode = eval(parameters['DecimalMode'] || "true");
    const SameAsMenu = eval(parameters['SameAsMenu'] || "false");
    const ActorsImgList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ActorsImgList'])) : null) || [];
    const ActorPictureEXApp = eval(parameters['ActorPictureEXApp'] || "true");
    const GraphicMode = eval(parameters['GraphicMode']) || 'face';
    const ActorImg_X = Number(parameters['ActorImg_X'] || 0);
    const ActorImg_Y = Number(parameters['ActorImg_Y'] || 0);
    const HPGaugeWidth = Number(parameters['HPGaugeWidth'] || 128);
    const MPGaugeWidth = Number(parameters['MPGaugeWidth'] || 128);
    const TPGaugeWidth = Number(parameters['TPGaugeWidth'] || 128);
    const ExpGaugeWidth = Number(parameters['ExpGaugeWidth'] || 128);
    const ExpGaugeColor1 = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ExpGaugeColor1'])) : 18);
    const ExpGaugeColor2 = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ExpGaugeColor2'])) : 18);
    const ExpDisplayMode = Number(parameters['ExpDisplayMode'] || 1);
    const EXPDecimal = Number(parameters['EXPDecimal'] || 2);
    const LabelShow = eval(parameters['LabelShow'] || "true");

    Scene_Skill.prototype.skillTypeWindowRect = function() {
        const ww = SkillStatusWidth > 0 ? Graphics.boxWidth - SkillStatusWidth : this.mainCommandWidth();
        const wh = this.calcWindowHeight(SkillStatusRows, true);
        const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
        const wy = this.mainAreaTop();
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Skill.prototype.statusWindowRect = function() {
        const ww = SkillStatusWidth > 0 ? SkillStatusWidth : Graphics.boxWidth - this.mainCommandWidth();
        const wh = this._skillTypeWindow.height;
        const wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;
        const wy = this.mainAreaTop();
        return new Rectangle(wx, wy, ww, wh);
    };


    const _Window_SkillStatus_initialize = Window_SkillStatus.prototype.initialize;DecimalMode
    Window_SkillStatus.prototype.initialize = function(rect) {
        if (Imported.NUUN_MenuScreenEX || Imported.NUUN_MenuScreenEXBase) {
            
        } else {
            const log = ($gameSystem.isJapanese() ? "NUUN_MenuScreenEXまたはNUUN_MenuScreenEXBaseが見つかりません。" : "NUUN_MenuScreenEX or NUUN_MenuScreenEXBase not found.");
            throw ["PluginError", log];
        }
        this._actorsBitmap = null;
        this.language_Jp = $gameSystem.isJapanese();
        _Window_SkillStatus_initialize.call(this, rect);
    };

    Window_SkillStatus.prototype.isActorPictureEXApp = function() {
        return Imported.NUUN_ActorPicture && ActorPictureEXApp;
    };

    Window_SkillStatus.prototype.getStatusList = function() {
        return SameAsMenu ? Window_MenuStatus.prototype.getStatusList.call(this) : StatusList;
    };

    Window_SkillStatus.prototype.itemContentsHeight = function() {
        return Math.floor(this.innerHeight / 1);
    };

    Window_SkillStatus.prototype.getDecimalMode = function() {
        return DecimalMode;
    };

    Window_SkillStatus.prototype.createApngSprite = function(actor, index, data, rect) {
        if (!this._actorsBitmap) {
            const rect = this.itemRect(index);
            const sprite = new Sprite_MenuActorImg();
            this._contentsBackSprite.addChild(sprite);
            this._actorsBitmap = sprite;
        }
        const sprite = this._actorsBitmap;
        sprite.setup(actor, data);
        sprite.move(rect.x + 50, rect.y, this.contentsWidth(), this.itemContentsHeight());
    };

    Window_SkillStatus.prototype.drawActorGraphic = function(data, bitmap, x, y, width, height, actor) {
        if (data.GraphicMode === 'face') {
            this.nuunMenu_contentsDrawActorFace(actor, data, x, y, width, height);
        } else {
            this.nuunMenu_contentsDrawActorGraphic(actor, data, bitmap, x, y, width, height);
        }
    };

    Window_SkillStatus.prototype.getActorImgData = function(actor) {
        const list = SameAsMenu ? this.getMenuLayoutActorsImgList() : ActorsImgList;
        const find = list.find(data => this.condActorImg(data, actor));
        if (!find) {
            return {
                Actor_X: 0, 
                Actor_Y: 0, 
                Img_SX: 0, 
                Img_SY: 0, 
                Actor_Scale: 100, 
                ActorBackImg: null,
                ActorFrontImg: null, 
                GraphicMode:this.getGraphicMode(),
                FaceIndex : -1,
                ActorImg: null,
                FaceImg: actor.faceName()
            }
        } else if (find.GraphicMode === 'default' || !find.GraphicMode) {
            find.GraphicMode = this.getGraphicMode();
        }
        return find;
    };

    Window_SkillStatus.prototype.refresh = function() {
        Window_StatusBase.prototype.refresh.call(this);
        this.drawItemImage(0);
        this.nuunMenu_drawItemContents(0);
    };

    Window_SkillStatus.prototype.drawItemImage = function(index) {
        const actor = this._actor;
        const rect = this.itemRect(index);
        let bitmap = null;
        const data = this.getActorImgData(actor);
        if (data && data.GraphicMode !== 'none') {
            if (data.GraphicMode === 'imgApng') {
                this.createApngSprite(actor, index, data, rect);
            } else if (this.isActorPictureEXApp()) {
                bitmap = data.GraphicMode === 'face' ? actor.loadActorFace() : actor.loadActorGraphic();
            } else {
                bitmap = data.GraphicMode === 'face' ? ImageManager.loadFace(data.FaceImg) : ImageManager.nuun_LoadPictures(data.ActorImg);
            }
        }
        if (bitmap) {
            bitmap.addLoadListener(function() {
                this.drawActorGraphic(data, bitmap, rect.x, rect.y, rect.width, this.innerHeight, actor);
            }.bind(this));
        } else {
            this.drawActorFront(data, rect.x, rect.y, rect.width, this.innerHeight);
        }
    };

    Window_SkillStatus.prototype.nuunMenu_drawItemContentsStatus = function(index) {
        const actor = this._actor;
        const rect = this.itemRect(0);
        const itemWidth = this.nuunMenu_itemContentsWidth(rect.width);
        const lineHeight = this.lineHeight();
        const colSpacing = this.colSpacing();
        const list = this.getStatusList();
        for (const data of list) {
        const x_Position = data.X_Position;
        const position = Math.min(x_Position, this.nuunMenu_maxContentsCols());
        const contentsX = rect.x + (itemWidth + colSpacing) * (position - 1) + data.X_Coordinate + colSpacing;
        const contentsY = rect.y + lineHeight * (data.Y_Position - 1) + data.Y_Coordinate + this.itemPadding();
        const width = data.ItemWidth && data.ItemWidth > 0 ? Math.min(data.ItemWidth, itemWidth) : itemWidth;
        data._width = data.ItemWidth && data.ItemWidth > 0 ? Math.min(data.ItemWidth, width) : Math.min(width, 128);
        this.nuunMenu_drawContentsBase(data, contentsX, contentsY, width - colSpacing / 2, actor);
        }
    };

    Window_SkillStatus.prototype.nuun_DrawMenuStatusContentsCharchip = function(data, x, y, width, actor) {
        this.nuunMenu_actorCharacterChip(actor, data, x + 24, y + 48, "actor%1-skillStatusCharacter");
    };

    Window_SkillStatus.prototype.nuun_DrawMenuStatusContentsHpGauge = function(data, x, y, width, actor) {
        this.setTempType('hp');
        this.nuunMenu_placeGauge(actor, "hp", x, y, "skillStatus_Actor%1-gauge-%2");
    };

    Window_SkillStatus.prototype.nuun_DrawMenuStatusContentsMpGauge = function(data, x, y, width, actor) {
        this.setTempType('mp');
        this.nuunMenu_placeGauge(actor, "mp", x, y, "skillStatus_Actor%1-gauge-%2");
    };

    Window_SkillStatus.prototype.nuun_DrawMenuStatusContentsTpGauge = function(data, x, y, width, actor) {
        if ($dataSystem.optDisplayTp) {
            this.setTempType('tp');
            this.nuunMenu_placeGauge(actor, "tp", x, y, "skillStatus_Actor%1-gauge-%2");
        }
    };

    Window_SkillStatus.prototype.nuun_DrawMenuStatusContentsExpGauge = function(data, x, y, width, actor) {
        this.setTempType('menuexp');
        this.nuunMenu_placeGauge(actor, "menuexp", x, y, "skillStatus_SvActor%1");
    };

    Window_SkillStatus.prototype.nuun_DrawMenuStatusContentsOrgGauge = function(data, x, y, width, actor) {
        this.setTempType(data.GaugeID);
        this.nuunMenu_placeGauge(actor, data.GaugeID, x, y, "skillStatus_Actor%1-gauge-%2");
    };

    Window_SkillStatus.prototype.nuun_DrawMenuStatusContentsCharchip = function(data, x, y, width, actor) {
        this.nuunMenu_actorCharacterChip(actor, data, x + 24, y + 48, "actor%1-skillStatusCharacter");
    };
    
    Window_SkillStatus.prototype.nuun_DrawMenuStatusContentsSvActor = function(data, x, y, width, actor) {
        this.nuunMenu_drawSvActorImg(data, x, y, width, actor, "actor%1-skillStatusSvActor");
    };

    Window_SkillStatus.prototype.ActorImgX = function() {
        return ActorImg_X;
    };

    Window_SkillStatus.prototype.ActorImgY = function() {
        return ActorImg_Y;
    };

    Window_SkillStatus.prototype.getGraphicMode = function() {
        return SameAsMenu ? this.nuunMenu_getMenuGraphicMode() : GraphicMode;
    };

    function Sprite_SkillStatusGauge() {
        this.initialize(...arguments);
    }
      
    Sprite_SkillStatusGauge.prototype = Object.create(Sprite_MenuGauge.prototype);
    Sprite_SkillStatusGauge.prototype.constructor = Sprite_SkillStatusGauge;

    Sprite_SkillStatusGauge.prototype.initialize = function() {
        Sprite_MenuGauge.prototype.initialize.call(this);
    };

    if (!SameAsMenu) {
        Sprite_SkillStatusGauge.prototype.getMenuGaugeWidthParams = function(type) {
            switch (type) {
                case 'hp':
                  return HPGaugeWidth;
                case 'mp':
                  return MPGaugeWidth;
                case 'tp':
                  return TPGaugeWidth;
                case 'menuexp':
                  return ExpGaugeWidth;
                default:
                  return 128;
              }
        };
    
        Sprite_SkillStatusGauge.prototype.expGaugeColor1Param = function() {
            return ExpGaugeColor1;
        };
    
        Sprite_SkillStatusGauge.prototype.expGaugeColor2Param = function() {
            return ExpGaugeColor2;
        };
    
        Sprite_SkillStatusGauge.prototype.decimalModeParam = function() {
            return DecimalMode;
        };
    
        Sprite_SkillStatusGauge.prototype.expDecimalwParam = function() {
            return EXPDecimal;
        };
    
        Sprite_SkillStatusGauge.prototype.expDisplayModeParam = function() {
            return ExpDisplayMode;
        };
    
        Sprite_SkillStatusGauge.prototype.labelShowParam = function() {
            return LabelShow;
        };
    }

})();