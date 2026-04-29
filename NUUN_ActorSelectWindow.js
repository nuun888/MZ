/*:-----------------------------------------------------------------------------------
 * NUUN_ActorSelectWindow.js
 * 
 * Copyright (C) 2026 NUUN
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Battle Actor Window Customization
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_MenuParamListBase
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_MenuParamListBase
 * @version 1.0.0
 * 
 * @help
 * Customizes the actor character selection window.
 * "NUUN_MenuParamListBase" is supported from Ver.1.2.0 onwards.
 * 
 * Terms of Use
 * Credit: Optional
 * Commercial use: Possible
 * Adult content: Possible
 * Modifications: Possible
 * Redistribution: Possible
 * Support is not available for modified versions or downloads from sources other than https://github.com/nuun888/MZ, the official forum, or authorized retailers.
 * 
 * Log
 * 4/30/2026 Ver.1.0.0
 * First edition.
 * 
 * @param ActorWindow
 * @text Actor Selection Window Settings
 * @desc Configure the Actor Selection Window.
 * @default {"WindowX":"0","WindowY":"96","WindowWidth":"248","WindowHeight":"400"}
 * @type struct<WindowSetting>
 * @parent WindowCoordinateSetting
 * 
 * @param WindowTransparent
 * @desc Make the actor selection window image opaque.
 * @text Actor Selection Window Opacity
 * @type boolean
 * @default false
 * 
 * @param ActorCols
 * @desc Number of columns to display.
 * @text Number of Columns
 * @type number
 * @default 2
 * @min 1
 * @max 99
 * 
 * @param ActorRows
 * @desc Number of rows to display.
 * @text Number of Rows
 * @type number
 * @default 4
 * @min 1
 * @max 99
 * 
 * @param ActorStatus
 * @text Display status settings
 * @desc Configures the actor display status settings.
 * @default ["{\"DateSelect\":\"DynamicName\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Decimal\":\"0\",\"DetaEval\":\"\",\"DetaEval2\":\"\",\"ImageHeight\":\"0\",\"IconSetting\":\"------------------------------\",\"Icon\":\"0\",\"IconY\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"0\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"Face\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Decimal\":\"0\",\"DetaEval\":\"\",\"DetaEval2\":\"\",\"ImageHeight\":\"0\",\"IconSetting\":\"------------------------------\",\"Icon\":\"0\",\"IconY\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"0\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}"]
 * @type struct<ActorStatusList>[]
 * 
 * @param ActorPictureEXApp
 * @text @text "NUUN_ActorPicture" application
 * @desc Apply the image change of standing picture display EX. If OFF, the settings in this plug-in are applied.
 * @type boolean
 * @default false
 * 
 * @param BackgroundSetting
 * @text Window background settings
 * @default ------------------------------
 * 
 * @param WindowBacgroundImg
 * @text Window background image settings
 * @desc Sets the window’s background image.
 * @default 
 * @type struct<WindowBackgroundSetting>
 * @parent BackgroundSetting
 * 
 * @param BackgroundWindowFit
 * @desc Aligns the image’s display position to the window. When OFF, it uses the UI coordinate range (0,0).
 * @text Display Window Position
 * @type boolean
 * @default treu
 * @parent BackgroundSetting
 * 
 */
/*~struct~WindowSetting:
 * 
 * @param WindowX
 * @text Window X coordinate
 * @desc Window X coordinate.
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param WindowY
 * @desc Window Y coordinate.
 * @text Window Y coordinate
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param WindowWidth
 * @desc Window width. When set to 0, it uses the UI screen width.
 * @text Window width
 * @type number
 * @default 0
 * @min 0
 * 
 * @param WindowHeight
 * @text Window height
 * @desc Window height. When set to 0, it uses the main area height.
 * @type number
 * @default 0
 * @min 0
 * 
 */
/*~struct~ActorStatusList:
 *
 * @param DateSelect
 * @text Display contents
 * @desc Specify the content to be displayed.
 * @type select
 * @option None
 * @value None
 * @option Name(x)(y)(xc)(yc)(iw)[n](sc)(a)(fs)(ff)(i)
 * @value Name
 * @option Actor face(x)(y)(xc)(yc)(h)
 * @value Face
 * @option ActorName(x)(y)(xc)(yc)(iw)(h)
 * @value DynamicName
 * @option Nickname(x)(y)(xc)(yc)(iw)(a)(fs)(ff)
 * @value Nickname
 * @option Class(x)(y)(xc)(yc)(iw)(a)(fs)(ff)
 * @value Class
 * @option Level(x)(y)(xc)(yc)(iw)(sw)(n)(sc)(a)(fs)(ff)(vf)
 * @value Level
 * @option State(x)(y)(xc)(yc)(iw)(ev※1)
 * @value State
 * @option State2(x)(y)(xc)(yc)
 * @value State2
 * @option Turn(x)(y)(xc)(yc)(iw)(sw)(n)(sc)(a)(u)(fs)(ff)(vf)(vf)(i)
 * @value Turn
 * @option Original parameters(x)(y)(xc)(yc)(iw)(sw)(n)(sc)(a)(u)(fs)(ff)(vf)(vf)(d)[ev](i)
 * @value OrgParam
 * @option Original parameters(Dynamic)(x)(y)(xc)(yc)(iw)(sw)(n)(sc)(a)(u)(fs)(ff)(vf)(vf)(d)[ev](i)
 * @value DynamicOrgParam
 * @option HpGauge(x)(y)(xc)(yc)(iw)(n)(g)
 * @value HpGauge
 * @option MPGauge(x)(y)(xc)(yc)(iw)(n)(g)
 * @value MpGauge
 * @option TPGauge(x)(y)(xc)(yc)(iw)(n)(g)
 * @value TpGauge
 * @option TPBGauge(x)(y)(xc)(yc)(iw)(n)(g)
 * @value TpbGauge
 * @option CircularHP(x)(y)(xc)(yc)(n)(g)
 * @value HpCircularGauge
 * @option CircularMP(x)(y)(xc)(yc)(n)(g)
 * @value MpCircularGauge
 * @option CircularTP(x)(y)(xc)(yc)(n)(g)
 * @value TpCircularGauge
 * @option CircularTPB(x)(y)(xc)(yc)(n)(g)
 * @value TpbCircularGauge
 * @option Original gauge(x)(y)(xc)(yc)(iw)(n)[ev][ev2](g)
 * @value OrgGauge
 * @option Image(x)(y)(xc)(yc)(iw)(h)[im]
 * @value Imges
 * @option Free text(x)(y)(xc)(yc)(ft)
 * @value Freetext
 * @option Line(x)(y)(xc)(yc)(iw)(sc)
 * @value HorzLine
 * @default None
 * 
 * @param X_Position
 * @desc X display col position
 * @text X display col position(y)
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * 
 * @param Y_Position
 * @desc Y display row position
 * @text Y display row position(y)
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * 
 * @param X_Coordinate
 * @text X coordinate (relative)(xc)
 * @desc X coordinate (relative coordinate from X display col position)
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param Y_Coordinate
 * @text Y coordinate (relative)(yc)
 * @desc Y coordinate (relative coordinate from Y display row position)
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param ItemWidth
 * @desc Contents and gauge width (default width at 0)
 * @text Contents, gauge width (iw)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param SystemItemWidth
 * @desc Item name width (0 is default width)
 * @text Item name width (sw)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param ParamName
 * @desc Set the name of the item.
 * @text Name(n)
 * @type string
 * @default
 * 
 * @param NameColor
 * @desc System color ID for item name. You can enter the color code in the Text tab.
 * @text Item name font color(sc)
 * @type color
 * @default 16
 * @min 0
 * 
 * @param Align
 * @desc Align.
 * @text Align(a)
 * @type select
 * @option Left
 * @value 'left'
 * @option Right
 * @value 'right'
 * @option Center
 * @value 'center'
 * @default 'left'
 * 
 * @param paramUnit
 * @desc Set the units.
 * @text Unit(u)
 * @type string
 * @default 
 * 
 * @param FontSize
 * @desc Font size (difference from main font)
 * @text Font size(fs)
 * @type number
 * @default 0
 * @min -99
 * 
 * @param FontFace
 * @desc Sets the font for item names.
 * @text Item name font(ff)
 * @type string
 * @default 
 * 
 * @param ValueFontFace
 * @desc Sets the font for parameter text.
 * @text Parameter font(vf)
 * @type string
 * @default 
 * 
 * @param Decimal
 * @text Decimal places(d)
 * @desc number of decimal places that can be displayed.
 * @type number
 * @default 0
 * @min 0
 * @max 99
 * 
 * @param DetaEval
 * @desc Enter an evaluation formula or string.
 * @text Evaluation formula or string(javaScript)(ev)
 * @type combo
 * @option '$gameVariables.value(0);//Game variables'
 * @option 'actor;//Actor game data'
 * @option 'actor.actor();//Actor System Data'
 * @default 
 * 
 * @param DetaEval2
 * @desc Max value evaluation formula. State is buff, gauge is maximum value
 * @text Max evaluation formula(javaScript)(ev2)
 * @type combo
 * @option '$gameVariables.value(0);//Game variables'
 * @option 'actor;//Actor game data'
 * @option 'actor.actor();//Actor System Data'
 * @default 
 * 
 * @param ImageHeight
 * @desc Specifies the vertical size of the image.
 * @text Image height(h)
 * @type number
 * @default 0
 * @min 0
 * @max 999
 * 
 * @param IconSetting
 * @text Icon setting(i)
 * @default ------------------------------
 * 
 * @param Icon
 * @desc Set the icon.
 * @text Icon
 * @type icon
 * @default 0
 * @parent IconSetting
 * 
 * @param IconY
 * @desc Specifies the relative Y‑coordinate for adjusting the icon.
 * @text Icon adjustment Y‑coordinate
 * @type number
 * @default 0
 * @min -99
 * @parent IconSetting
 * 
 * @param GaugeSetting
 * @text Gauge setting(g)
 * @default ------------------------------
 * 
 * @param GaugeID
 * @desc Gauge ID.
 * @text Gauge ID
 * @type string
 * @default 
 * @parent GaugeSetting
 * 
 * @param GaugeHeight
 * @desc Specifies the vertical size of the gauge.
 * @text Gauge height
 * @type number
 * @default 0
 * @min 0
 * @max 99
 * @parent GaugeSetting
 * 
 * @param Color1
 * @desc Gauge system color ID (left). You can enter a color code in the Text tab.
 * @text Gauge color (left)
 * @type color
 * @default -1
 * @min -1
 * @parent GaugeSetting
 * 
 * @param Color2
 * @desc Gauge system color ID (right). You can enter a color code in the Text tab.
 * @text Gauge color (right)
 * @type color
 * @default -1
 * @min -1
 * @parent GaugeSetting
 * 
 * @param ImgSetting
 * @text Img setting
 * @default ------------------------------
 * 
 * @param ImgData
 * @desc Specify the image to display.
 * @text Image(im)
 * @type file
 * @dir img/
 * @default 
 * @parent ImgSetting
 * 
 * @param OtherSetting
 * @text Other setting
 * @default ------------------------------
 * 
 * @param Text
 * @desc Enter the free‑text content.“Control characters allowed”
 * @text Free‑text field(ft)
 * @type multiline_string
 * @default
 * @parent OtherSetting
 * 
 * @param CondSetting
 * @text Cond setting
 * @default ------------------------------
 * 
 * @param Conditions
 * @desc Specify the conditions under which the item will be displayed. (JavaScript)
 * @text Item conditions(all)
 * @type combo
 * @option '$gameVariables.value(0);//Game variable'
 * @option 'actor;//Actor game data'
 * @option 'actor.actor();//Actor system data'
 * @option '$dataSystem.optDisplayTp'//TP display
 * @default 
 *
 */
/*~struct~WindowBackgroundSetting:
 * 
 * @param BackgroundImg
 * @desc Specifies the background image window.
 * @text Background Image Window
 * @type file
 * @dir img/
 * @default 
 * 
 * @param Background_X
 * @desc Background image X coordinate (relative).
 * @text Background image X coordinate (relative)
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Background_Y
 * @desc Background image Y coordinate (relative).
 * @text Background image Y coordinate (relative)
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc アクター選択ウィンドウカスタマイズ
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_MenuParamListBase
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_MenuParamListBase
 * @version 1.0.0
 * 
 * @help
 * アクターの選択ウィンドウをカスタマイズします。
 * NUUN_MenuParamListBaseはVer.1.2.0以降対応です。
 * 
 * 利用規約
 * クレジット表記：任意
 * 商業利用：可能
 * 成人向け：可能
 * 改変：可能
 * 再配布：可能
 * https://github.com/nuun888/MZ、公式フォーラム、正規販売サイト以外からのダウンロード、改変済みの場合はサポートは対象外となります。
 * 
 * 更新履歴
 * 2026/4/30 Ver.1.0.0
 * 初版
 * 
 * @param ActorWindow
 * @text アクター選択ウィンドウ設定
 * @desc アクター選択ウィンドウの設定を行います。
 * @default {"WindowX":"0","WindowY":"96","WindowWidth":"248","WindowHeight":"400"}
 * @type struct<WindowSetting>
 * @parent WindowCoordinateSetting
 * 
 * @param WindowTransparent
 * @desc アクター選択ウィンドウ画像を不透明化。
 * @text アクター選択ウィンドウ不透明化
 * @type boolean
 * @default false
 * 
 * @param ActorCols
 * @desc 表示する列数。
 * @text 列数
 * @type number
 * @default 2
 * @min 1
 * @max 99
 * 
 * @param ActorRows
 * @desc 表示する行数。
 * @text 行数
 * @type number
 * @default 4
 * @min 1
 * @max 99
 * 
 * @param ActorStatus
 * @text 表示ステータス設定
 * @desc アクターの表示ステータス設定
 * @default ["{\"DateSelect\":\"DynamicName\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Decimal\":\"0\",\"DetaEval\":\"\",\"DetaEval2\":\"\",\"ImageHeight\":\"0\",\"IconSetting\":\"------------------------------\",\"Icon\":\"0\",\"IconY\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"0\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"Face\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Decimal\":\"0\",\"DetaEval\":\"\",\"DetaEval2\":\"\",\"ImageHeight\":\"0\",\"IconSetting\":\"------------------------------\",\"Icon\":\"0\",\"IconY\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"0\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}"]
 * @type struct<ActorStatusList>[]
 * 
 * @param ActorPictureEXApp
 * @text 立ち絵表示EX適用
 * @desc 立ち絵表示EXの画像変更を適用します。OFFにした場合はこのプラグインでの設定が適用されます。
 * @type boolean
 * @default false
 * 
 * @param BackgroundSetting
 * @text ウィンドウ背景設定
 * @default ------------------------------
 * 
 * @param WindowBacgroundImg
 * @text ウィンドウ背景画像設定
 * @desc ウィンドウの背景画像を設定します。
 * @default 
 * @type struct<WindowBackgroundSetting>
 * @parent BackgroundSetting
 * 
 * @param BackgroundWindowFit
 * @desc 画像の表示位置をウィンドウに合わせます。OFFでUI範囲(0,0)
 * @text ウィンドウ位置表示
 * @type boolean
 * @default treu
 * @parent BackgroundSetting
 * 
 */
/*~struct~WindowSetting:ja
 * 
 * @param WindowX
 * @text ウィンドウX座標
 * @desc ウィンドウのX座標
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param WindowY
 * @desc ウィンドウのY座標
 * @text ウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param WindowWidth
 * @desc ウィンドウの横幅。0でUI画面横幅
 * @text ウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * 
 * @param WindowHeight
 * @text ウィンドウ縦幅
 * @desc ウィンドウの縦幅。0でメインエリア高さ
 * @type number
 * @default 0
 * @min 0
 * 
 */
/*~struct~ActorStatusList:ja
 *
 * @param DateSelect
 * @text 表示するステータス
 * @desc 表示するステータスを指定します。
 * @type select
 * @option なし
 * @value None
 * @option 名称のみ(x)(y)(xc)(yc)(iw)[n](sc)(a)(fs)(ff)(i)
 * @value Name
 * @option 顔グラフィック(x)(y)(xc)(yc)(h)
 * @value Face
 * @option アクター名(x)(y)(xc)(yc)(iw)(h)
 * @value DynamicName
 * @option 二つ名(x)(y)(xc)(yc)(iw)(a)(fs)(ff)
 * @value Nickname
 * @option 職業(x)(y)(xc)(yc)(iw)(a)(fs)(ff)
 * @value Class
 * @option レベル(x)(y)(xc)(yc)(iw)(sw)(n)(sc)(a)(fs)(ff)(vf)
 * @value Level
 * @option ステート(x)(y)(xc)(yc)(iw)(ev※1)
 * @value State
 * @option ステート2(x)(y)(xc)(yc)
 * @value State2
 * @option ターン(x)(y)(xc)(yc)(iw)(sw)(n)(sc)(a)(u)(fs)(ff)(vf)(vf)(i)
 * @value Turn
 * @option 独自パラメータ(x)(y)(xc)(yc)(iw)(sw)(n)(sc)(a)(u)(fs)(ff)(vf)(vf)(d)[ev](i)
 * @value OrgParam
 * @option 独自パラメータ(動的)(x)(y)(xc)(yc)(iw)(sw)(n)(sc)(a)(u)(fs)(ff)(vf)(vf)(d)[ev](i)
 * @value DynamicOrgParam
 * @option HPゲージ(x)(y)(xc)(yc)(iw)(n)(g)
 * @value HpGauge
 * @option MPゲージ(x)(y)(xc)(yc)(iw)(n)(g)
 * @value MpGauge
 * @option TPゲージ(x)(y)(xc)(yc)(iw)(n)(g)
 * @value TpGauge
 * @option TPBゲージ(x)(y)(xc)(yc)(iw)(n)(g)
 * @value TpbGauge
 * @option CircularHP(x)(y)(xc)(yc)(n)(g)
 * @value HpCircularGauge
 * @option CircularMP(x)(y)(xc)(yc)(n)(g)
 * @value MpCircularGauge
 * @option CircularTP(x)(y)(xc)(yc)(n)(g)
 * @value TpCircularGauge
 * @option CircularTPB(x)(y)(xc)(yc)(n)(g)
 * @value TpbCircularGauge
 * @option 独自ゲージ(x)(y)(xc)(yc)(iw)(n)[ev][ev2](g)
 * @value OrgGauge
 * @option 画像(x)(y)(xc)(yc)(iw)(h)[im]
 * @value Imges
 * @option フリーテキスト(x)(y)(xc)(yc)(ft)
 * @value Freetext
 * @option ライン(x)(y)(xc)(yc)(iw)(sc)
 * @value HorzLine
 * @default None
 * 
 * @param X_Position
 * @text X表示列位置(x)
 * @desc X表示列位置
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * 
 * @param Y_Position
 * @desc Y表示行位置
 * @text Y表示行位置(y)
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * 
 * @param X_Coordinate
 * @text X座標（相対）(xc)
 * @desc X座標（X表示列位置からの相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param Y_Coordinate
 * @text Y座標（相対）(yc)
 * @desc Y座標（Y表示行位置からの相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param ItemWidth
 * @desc 項目、ゲージ横幅（0でデフォルト幅）
 * @text 項目、ゲージ横幅(iw)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param SystemItemWidth
 * @desc 項目名称の横幅（0でデフォルト幅）
 * @text 項目名称横幅(sw)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param ParamName
 * @desc 項目の名称を設定します。
 * @text 名称(n)
 * @type string
 * @default
 * 
 * @param NameColor
 * @desc 項目名称のシステムカラーID。テキストタブでカラーコードを入力できます。
 * @text 項目名称文字色(sc)
 * @type color
 * @default 16
 * @min 0
 * 
 * @param Align
 * @desc 文字揃え。
 * @text 文字揃え(a)
 * @type select
 * @option 左
 * @value 'left'
 * @option 右
 * @value 'right'
 * @option 中央
 * @value 'center'
 * @default 'left'
 * 
 * @param paramUnit
 * @desc 単位を設定します。
 * @text 単位(u)
 * @type string
 * @default 
 * 
 * @param FontSize
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ(fs)
 * @type number
 * @default 0
 * @min -99
 * 
 * @param FontFace
 * @desc 項目名称のフォントを設定します。
 * @text 項目名称フォント(ff)
 * @type string
 * @default 
 * 
 * @param ValueFontFace
 * @desc 数値のフォントを設定します。
 * @text 数値フォント(vf)
 * @type string
 * @default 
 * 
 * @param Decimal
 * @text 小数点桁数(d)
 * @desc 表示出来る小数点桁数。
 * @type number
 * @default 0
 * @min 0
 * @max 99
 * 
 * @param DetaEval
 * @desc 評価式または文字列を記入します。
 * @text 評価式or文字列(javaScript)(ev)
 * @type combo
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option 'actor;//アクターのゲームデータ'
 * @option 'actor.actor();//アクターのシステムデータ'
 * @default 
 * 
 * @param DetaEval2
 * @desc 最大値の評価式。
 * @text 最大値評価式(javaScript)(ev2)
 * @type combo
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option 'actor;//アクターのゲームデータ'
 * @option 'actor.actor();//アクターのシステムデータ'
 * @default 
 * 
 * @param ImageHeight
 * @desc 画像の縦幅を指定します。
 * @text 画像の縦幅(h)
 * @type number
 * @default 0
 * @min 0
 * @max 999
 * 
 * @param IconSetting
 * @text アイコン設定(i)
 * @default ------------------------------
 * 
 * @param Icon
 * @desc アイコンを設定します。
 * @text アイコン
 * @type icon
 * @default 0
 * @parent IconSetting
 * 
 * @param IconY
 * @desc アイコンを調整するY座標を指定します。(相対)
 * @text アイコン調整Y座標
 * @type number
 * @default 0
 * @min -99
 * @parent IconSetting
 * 
 * @param GaugeSetting
 * @text ゲージ設定(g)
 * @default ------------------------------
 * 
 * @param GaugeID
 * @desc 識別ID。
 * @text 識別ID
 * @type string
 * @default 
 * @parent GaugeSetting
 * 
 * @param GaugeHeight
 * @desc ゲージの縦幅を指定します。
 * @text ゲージの縦幅
 * @type number
 * @default 0
 * @min 0
 * @max 99
 * @parent GaugeSetting
 * 
 * @param Color1
 * @desc ゲージのシステムカラーID(左)。テキストタブでカラーコードを入力できます。
 * @text ゲージカラー(左)
 * @type color
 * @default -1
 * @min -1
 * @parent GaugeSetting
 * 
 * @param Color2
 * @desc ゲージのシステムカラーID(右)。テキストタブでカラーコードを入力できます。
 * @text ゲージカラー(右)
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
 * @text 画像(im)
 * @type file
 * @dir img/
 * @default 
 * @parent ImgSetting
 * 
 * @param OtherSetting
 * @text その他設定
 * @default ------------------------------
 * 
 * @param Text
 * @desc フリーテキストのテキストを記入します。(制御文字使用可能)
 * @text フリーテキストのテキスト(ft)
 * @type multiline_string
 * @default
 * @parent OtherSetting
 * 
 * @param CondSetting
 * @text 表示条件設定
 * @default ------------------------------
 * 
 * @param Conditions
 * @desc 項目が表示される条件を指定します。(JavaScript)
 * @text 項目条件(all)
 * @type combo
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option 'actor;//アクターのゲームデータ'
 * @option 'actor.actor();//アクターのシステムデータ'
 * @option '$dataSystem.optDisplayTp'//TP表示
 * @default 
 *
 */
/*~struct~WindowBackgroundSetting:ja
 * 
 * @param BackgroundImg
 * @desc 背景画像ウィンドウを指定します。
 * @text 背景画像ウィンドウ
 * @type file
 * @dir img/
 * @default 
 * 
 * @param Background_X
 * @desc 背景画像X座標（相対）。
 * @text 背景画像X座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Background_Y
 * @desc 背景画像Y座標（相対）。
 * @text 背景画像Y座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 */

var Imported = Imported || {};
Imported.NUUN_ActorSelectWindow = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const parameters = PluginManager.parameters('NUUN_ActorSelectWindow');

    Scene_Battle.prototype.createActorWindow = function() {
        const rect = this.actorWindowRect();
        this._actorWindow = new Window_BattleActor(rect);
        this._actorWindow.setHandler("ok", this.onActorOk.bind(this));
        this._actorWindow.setHandler("cancel", this.onActorCancel.bind(this));
        this.addWindow(this._actorWindow);
        if (params.WindowTransparent) {
            this._actorWindow.opacity = 0;
        }
    };

    const _Scene_Battle_actorWindowRect = Scene_Battle.prototype.actorWindowRect;
    Scene_Battle.prototype.actorWindowRect = function() {
        const w = this.getActorWindowData("ActorWindow");
        if (!w) return _Scene_Battle_actorWindowRect.apply(this, arguments);
        const wx = (w.WindowX || 0);
        const wy = (w.WindowY || 0);
        const ww = Math.min(Graphics.boxWidth - (w.WindowX || 0), w.WindowWidth > 0 ? w.WindowWidth : Graphics.boxWidth);
        const wh = Math.min(Graphics.boxHeight - (w.WindowY || 0), w.WindowHeight > 0 ? w.WindowHeight : Graphics.boxHeight);
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Battle.prototype.getActorWindowData = function(method) {
        return params[method];
    };


    const _Window_BattleActor_initialize = Window_BattleActor.prototype.initialize;
    Window_BattleActor.prototype.initialize = function(rect) {
        _Window_BattleActor_initialize.apply(this, arguments);
        this.frameVisible = true;
        this.createData();
    };

    Window_BattleActor.prototype.maxCols = function() {
        return params.ActorCols || 1;
    };

    Window_BattleActor.prototype.itemHeight = function() {
        return Math.floor(Window_BattleStatus.prototype.itemHeight.apply(this, arguments) / _getActorRow());
    };

    Window_BattleActor.prototype.updatePadding = function() {
        _getActorRow() > 1 ? Window_Base.prototype.updatePadding.apply(this, arguments) : Window_BattleStatus.prototype.updatePadding.apply(this, arguments)
    };

    Window_BattleActor.prototype.rowSpacing = function() {
        return _getActorRow() > 1 ? Window_Selectable.prototype.rowSpacing.apply(this, arguments) : Window_BattleStatus.prototype.rowSpacing.apply(this, arguments);
    };

    Window_BattleActor.prototype.setActorWindowFrameShow = function() {//BS
        
    };

    Window_BattleActor.prototype.maxContentsData = function() {
        return Math.max(this.maxItems(), this._contentsData.length);
    };

    Window_BattleActor.prototype.createData = function() {
        this._contentsData = [];
        for (let i = 0; i < this.maxItems(); i++) {
            this._contentsData[i] = new Nuun_DrawBattleActorListData(this, params);
        }
    };
    
    Window_BattleActor.prototype.performPartyRefresh = function() {
        for (let i = 0; i < this.maxContentsData(); i++) {
            if (!this._contentsData[i]) {
                this._contentsData[i] = new Nuun_DrawBattleActorListData(this, params);
            }
        }
        this.refresh();
    };

    Window_BattleActor.prototype.drawItem = function(index) {
        if (!this._contentsData[index]) {
            this._contentsData[index] = new Nuun_DrawBattleActorListData(this, params);
        }
        this._contentsData[index].drawItemContents(index);
    };

    Window_BattleActor.prototype.isActorPictureEXApp = function() {
        return Imported.NUUN_ActorPicture && params.ActorPictureEXApp;
    };


    class Nuun_DrawBattleActorListData extends Nuun_DrawListData {
        constructor(_window, params) {
            super(_window, params);
        }

        nuun_MaxContentsCols() {
            return 1;
        }

        getStatusParamsList() {
            return params.ActorStatus || [];
        }

        getActorsSettingList() {
            return [];
        }

        contentsHeightPadding() {
            return 0;
        }

        drawItemContentsImg(index) {
            
        }

        nuun_DrawContentsActorName(data, x, y, width, actor) {
            const key = "actor%1-name".format(actor.actorId());
            const sprite = _window.createInnerSprite(key, Sprite_Name);
            sprite.setup(actor);
            sprite.move(x, y);
            sprite.show();
        }

        nuun_DrawContentsTurn(data, x, y, width, actor) {
            const key = "actor%1-turn".format(actor.actorId());
            this.setTempType('turn');
            this.setTepmData(data)
            const sprite = this._window.createInnerSprite(key, Sprite_DynamicParam);
            sprite.setup(actor);
            sprite.move(x, y);
            sprite.show();
        }

        nuun_DrawContentsState2(data, x, y, width, actor) {
            const hw = Math.floor(ImageManager.iconWidth / 2);
            const key = "actor%1-stateIcon%2".format(actor.actorId(), data ? data.ParamID || 'dparam' : 'dparam');
            const sprite = this._window.createInnerSprite(key, Sprite_StateIcon);
            if (data) {
                sprite.setupVisibleIcons(this.getVisibleIcons(data.DetaEval), this.getVisibleBuffIcons(data.DetaEval2));
            }
            sprite.setup(actor);
            sprite.move(x + hw, y + hw);
            sprite.show();
        }

        nuun_DrawContentsState(data, x, y, width, actor) {
            const w = this._window;
            actor.setVisibleIcons(this.getVisibleIcons(data.DetaEval), this.getVisibleBuffIcons(data.DetaEval2));
            w.drawActorIcons(actor, x, y, width);
            actor.setVisibleIcons(null, null);
        }

        getVisibleIcons(dataEval) {
            let states = [];
            if (dataEval) {
                const stateList = dataEval.split(',');
                for (const id of stateList) {
                    Array.prototype.push.apply(states, NuunManager.nuun_getListIdData(id));
                }
            }
            return states.map(state => $dataStates[state].iconIndex);
        }

        getVisibleBuffIcons(dataEval) {
            let buffs = [];
            const icons = [];
            if (dataEval) {
                const stateList = dataEval.split(',');
                for (const id of stateList) {
                    Array.prototype.push.apply(buffs, NuunManager.nuun_getListIdData(id));
                }
            }
            buffs.forEach(buff => {
                if (buff >= 0 && buff < 10) {
                    icons.push(Game_BattlerBase.prototype.buffIconIndex.call(this, 1, buff));
                    icons.push(Game_BattlerBase.prototype.buffIconIndex.call(this, 2, buff));
                } else if (buff >= 10) {
                    icons.push(Game_BattlerBase.prototype.buffIconIndex.call(this, -1, buff - 10));
                    icons.push(Game_BattlerBase.prototype.buffIconIndex.call(this, -2, buff - 10));
                }
            });
            return icons;
        }
    };

    return

    function _getBackground() {
        return params.WindowBacgroundImg ? params.WindowBacgroundImg : null;
    };

    function _getBackgroundImg() {
        const background = _getBackground();
        return background ? background.BackgroundImg : null;
    };

    function _getActorRow() {
        return params.ActorRows || 1;
    };

    const _Scene_Battle_createSpriteset = Scene_Battle.prototype.createSpriteset;
    Scene_Battle.prototype.createSpriteset = function() {
        _Scene_Battle_createSpriteset.apply(this, arguments);
        this.createBattleEnemyBackground();
    };

    

    Scene_Battle.prototype.createBattleEnemyBackground = function() {
        const data = _getBackgroundImg();
        if (data) {
            const bitmap = ImageManager.nuun_LoadPictures(data);
            const sprite = new Sprite(bitmap);
            this.addChild(sprite);
            sprite.hide();
            this._actorWindowBackground = sprite;
        }
    };

    const _Scene_Battle_updateVisibility = Scene_Battle.prototype.updateVisibility;
    Scene_Battle.prototype.updateVisibility = function() {
        _Scene_Battle_updateVisibility.apply(this, arguments);
        this.updateBackgroundActorWindow();
    };

    Scene_Battle.prototype.updateBackgroundActorWindow = function() {
        if (this._actorWindowBackground && this._actorWindow) {
            if (this._actorWindow.isOpen()) {
                this._actorWindowBackground.visible = this._actorWindow.visible;
            } else if (this._actorWindow.visible) {
                this._actorWindowBackground.visible = this._actorWindow.isOpen();
            }
        }
    };

   
})();