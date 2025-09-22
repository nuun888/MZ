/*:-----------------------------------------------------------------------------------
 * NUUN_SkillTreeStausWindowEx.js
 * 
 * Copyright (C) 2025 NUUN
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Skill Tree Status Screen Customization
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_MenuParamListBase
 * @base NUUN_SkillTree
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_MenuParamListBase
 * @orderAfter NUUN_SkillTree
 * @version 1.0.0
 * 
 * @help
 * You can customize the status window in the skill tree screen.
 * You can also display actor images in the status window, skill tree window, or skill tree scene.
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
 * 8/15/2025 Ver.1.0.0
 * First edition.
 * 
 * @param ActorStatus
 * @text Display actor status settings
 * @desc Actor Display Status Settings.
 * @default ["{\"DateSelect\":\"Face\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"ActorName\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"120\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"Level\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"120\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'right'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"SkillPoint\",\"X_Position\":\"1\",\"Y_Position\":\"3\",\"X_Coordinate\":\"120\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'right'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}"]
 * @type struct<ActorStatusList>[]
 * 
 * @param ContentsCols
 * @text Contents cols
 * @desc Number of columns of content in an item.
 * @type number
 * @min 1
 * @max 99
 * @default 4
 * 
 * @param StatusWindowActorImgSetting
 * @text Actor Image Settings
 * @default ------------------------------
 * 
 * @param ActorsImgList
 * @text Image Settings
 * @desc Actor Image Settings
 * @default []
 * @type struct<actorImgList>[]
 * @parent StatusWindowActorImgSetting
 * 
 * @param ActorPictureEXApp
 * @text Apply NUUN_ActorPicture
 * @desc Apply the image change of "NUUN_ActorPicture". If you turn it off, the settings in this plugin will be applied.
 * @type boolean
 * @default true
 * @parent StatusWindowActorImgSetting
 * 
 * @param GraphicMode
 * @desc Specifies the actor image to display.
 * @text Display actor image
 * @type select
 * @option None
 * @value 'none'
 * @option Image (in Actor Status window)
 * @value 'img'
 * @option Image (in Skill Tree window)
 * @value 'img_tree'
 * @option Image_Scene
 * @value 's_img'
 * @default 'none'
 * @parent StatusWindowActorImgSetting
 * 
 * @param ActorImg_X
 * @text Actor image base X coordinate
 * @desc Basic X coordinate of the actor image
 * @type number
 * @max 9999
 * @min -9999
 * @default 0
 * @parent StatusWindowActorImgSetting
 * 
 * @param ActorImg_Y
 * @text Actor image base Y coordinate
 * @desc Basic Y coordinate of the actor image
 * @type number
 * @max 9999
 * @min -9999
 * @default 0
 * @parent StatusWindowActorImgSetting
 * 
 * @param ActorPosition
 * @text Standing picture display position
 * @desc Specifies the display position of the standing picture. Apeng is not applied.
 * @type select
 * @option Left
 * @value Left
 * @option Center
 * @value Center
 * @option Right
 * @value Right
 * @default Right
 * @parent StatusWindowActorImgSetting
 * 
 */
/*~struct~ActorStatusList:
 *
 * @param DateSelect
 * @text Status to display
 * @desc Specifies the status to display.
 * @type select
 * @option None
 * @value None
 * @option Nane(1)(2)(3)(4)(5)(7)(8)(9)(11)(12)(14)(15)
 * @value Name
 * @option Face(1)(2)(3)(4)
 * @value Face
 * @option Actor name(1)(2)(3)(4)(5)(9)(11)(12)
 * @value ActorName
 * @option Nickname(1)(2)(3)(4)(5)(9)(11)(12)
 * @value Nickname
 * @option Class(1)(2)(3)(4)(5)(9)(11)(12)
 * @value Class
 * @option Level(1)(2)(3)(4)(5)(6)(9)(11)(12)(13)
 * @value Level
 * @option Skill point(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value SkillPoint
 * @option State(1)(2)(3)(4)(5)(16※1)
 * @value State
 * @option State (same display as for battle)(1)(2)(3)(4)
 * @value State2
 * @option Original parameter(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(16)(17)(18)
 * @value OrgParam
 * @option HP Gauge(1)(2)(3)(4)(5)(7)(20)(21)(23)(24)
 * @value HpGauge
 * @option MP Gauge(1)(2)(3)(4)(5)(7)(20)(21)(23)(24)
 * @value MpGauge
 * @option TP Gauge(1)(2)(3)(4)(5)(7)(20)(21)(23)(24)
 * @value TpGauge
 * @option CircularHP(1)(2)(3)(4)(7)(20)(21)(23)(24)
 * @value HpCircularGauge
 * @option CircularMP(1)(2)(3)(4)(7)(20)(23)
 * @value MpCircularGauge
 * @option CircularTP(1)(2)(3)(4)(7)(20))(23)
 * @value TpCircularGauge
 * @option Exp Info(1)(2)(3)(4)(5)(6)(7)(8)(9)(11)(12)(13)(17)
 * @value ExpInfo
 * @option Next EXP(1)(2)(3)(4)(5)(6)(7)(8)(9)(11)(12)(13)(17)(18)
 * @value Exp
 * @option EXP Gauge(1)(2)(3)(4)(5)(7)(18)(20)(21)(23)(24)
 * @value ExpGauge
 * @option EXP Circle Gauge(1)(2)(3)(4)(18)(20)(23)
 * @value ExpCircularGauge
 * @option ATK(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Atk
 * @option DEF(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Def
 * @option MAT(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Mat
 * @option MDF(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Mdf
 * @option AGI(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Agi
 * @option LUK(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Luk
 * @option Hit(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Hit
 * @option Evasion(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Eva
 * @option Critcal rate(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Cri
 * @option Critcal evade(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value CritcalEvade
 * @option Magic evade(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value MagicEvade
 * @option Magic reflect(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value MagicrEflect
 * @option Counter(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Counter
 * @option HP regen(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value HpRegen
 * @option MP regen(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value MpRegen
 * @option TP regen(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value TpRegen
 * @option Aggro(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Aggro
 * @option Guard(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Guard
 * @option Recovery(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Recovery
 * @option Item effect(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value ItemEffect
 * @option MP cost(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value MpCost
 * @option TP charge(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value TpCharge
 * @option Physical damage(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value PhysicalDamage
 * @option Magical damage(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value MagicalDamage
 * @option Floor damage(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value FloorDamage
 * @option Gain exp rate(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value GainExpRate
 * @option Original gauge(1)(2)(3)(4)(5)(7)(16)(18)(20)(21)(22)(23)(24)
 * @value OrgGauge
 * @option Image(1)(2)(3)(4)(25)
 * @value Imges
 * @option Character chip(1)(2)(3)(4)
 * @value Charchip
 * @option SV Actor(1)(2)(3)(4)
 * @value SvActor
 * @option Free Text(1)(2)(3)(4)(35)
 * @value Freetext
 * @option Line(1)(2)(3)(4)(5)(8)
 * @value HorzLine
 * @default None
 * 
 * @param X_Position
 * @text X display col position(1)
 * @desc X display col position
 * @type number
 * @default 1
 * @min 1
 * @max 1
 * 
 * @param Y_Position
 * @desc Y display row position
 * @text Y display row position(2)
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * 
 * @param X_Coordinate
 * @text X coordinate (relative)(3)
 * @desc X coordinate (relative coordinate from X display col position)
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param Y_Coordinate
 * @text Y coordinate (relative)(4)
 * @desc Y coordinate (relative coordinate from Y display row position)
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param ItemWidth
 * @desc Item, gauge width(0 for default width)
 * @text Item, gauge width(5)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param SystemItemWidth
 * @desc Width of item name (default width at 0)
 * @text Width of item name(6)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param ParamName
 * @desc Set the item name.
 * @text Name(7)
 * @type string
 * @default
 * 
 * @param NameColor
 * @desc System color ID for system items. You can enter the color code in the text tab.
 * @text Name color(8)
 * @type color
 * @default 16
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
 * @param paramUnit
 * @desc Set the units.
 * @text Unit(10)
 * @type string
 * @default 
 * 
 * @param FontSize
 * @desc Font size (difference from main font)
 * @text Font size(11)
 * @type number
 * @default 0
 * @min -99
 * 
 * @param FontFace
 * @desc Sets the font for item names.
 * @text Item name font(12)
 * @type string
 * @default 
 * 
 * @param ValueFontFace
 * @desc Sets the font for parameter text.
 * @text Parameter font(13)
 * @type string
 * @default 
 * 
 * @param Icon
 * @desc Set the icon.
 * @text Icon(14)
 * @type icon
 * @default 0
 * 
 * @param IconY
 * @desc Specifies the Y coordinate to adjust the icon (relative).
 * @text Icon adjustment Y coordinate(15)
 * @type number
 * @default 2
 * @min -99
 * 
 * @param DetaEval
 * @desc Enter an evaluation formula or string.
 * @text Evaluation formula or string(javaScript)(16)
 * @type combo
 * @option '$gameVariables.value(0);//Game variable'
 * @option 'actor;//Actor game data'
 * @option 'actor.actor();//Actor system data'
 * @default 
 * 
 * @param Back
 * @text Content background display(17)
 * @desc Shows the content background.
 * @type boolean
 * @default false
 * 
 * @param Decimal
 * @text Number of decimal places(18)
 * @desc The number of decimal places that can be displayed.
 * @type number
 * @default 0
 * @min 0
 * @max 99
 * 
 * @param GaugeSetting
 * @text Gauge Settings
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
 * @param OtherSetting
 * @text Other settings
 * @default ------------------------------
 * 
 * @param Text
 * @desc Enter the text of the free text. (Text code can be used)
 * @text Free text text(35)
 * @type multiline_string
 * @default
 * @parent OtherSetting
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
/*~struct~actorImgList:
 * 
 * @param ActorId
 * @text Actor
 * @desc Specify the actor.
 * @type actor
 * @default 0
 * 
 * @param ClassId
 * @text Class ID
 * @desc Specify your occupation.
 * @type class
 * @default 0
 * 
 * @param ActorImg
 * @text Actor image
 * @desc Display the image of the actor. If you want to switch the standing picture, please set the image in the list. 
 * @type file
 * @dir img/
 * @default 
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
 */
/*:ja
 * @target MZ
 * @plugindesc スキルツリーステータス画面カスタマイズ
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * スキルツリー画面のステータスウィンドウをカスタマイズできます。
 * また、ステータスウィンドウ、スキルツリーウィンドウ、スキルツリーシーンのいずれかにアクター画像を表示できます。
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
 * 2025/8/15 Ver.1.0.0
 * 初版
 * 
 * @param ActorStatus
 * @text 表示ステータス設定
 * @desc アクターの表示ステータス設定
 * @default ["{\"DateSelect\":\"Face\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"ActorName\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"120\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"Level\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"120\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'right'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"SkillPoint\",\"X_Position\":\"1\",\"Y_Position\":\"3\",\"X_Coordinate\":\"120\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'right'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}"]
 * @type struct<ActorStatusList>[]
 * 
 * @param ContentsCols
 * @text コンテンツ列数
 * @desc 項目のコンテンツ列数
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * 
 * @param StatusWindowActorImgSetting
 * @text アクター画像設定
 * @default ------------------------------
 * 
 * @param ActorsImgList
 * @text 画像設定
 * @desc アクターの画像設定
 * @default []
 * @type struct<actorImgList>[]
 * @parent StatusWindowActorImgSetting
 * 
 * @param ActorPictureEXApp
 * @text 立ち絵表示EX適用
 * @desc 立ち絵表示EXの画像変更を適用します。OFFにした場合はこのプラグインでの設定が適用されます。
 * @type boolean
 * @default false
 * @parent StatusWindowActorImgSetting
 * 
 * @param GraphicMode
 * @desc ステータスウィンドウに表示するアクター画像を指定します。
 * @text ステータスウィンドウ表示アクター画像
 * @type select
 * @option 表示なし
 * @value 'none'
 * @option 画像(アクターステータスウィンドウ内)
 * @value 'img'
 * @option 画像(スキルツリーウィンドウ内)
 * @value 'img_tree'
 * @option 画像
 * @value 's_img'
 * @default 'none'
 * @parent StatusWindowActorImgSetting
 * 
 * @param ActorImg_X
 * @text アクター画像基本X座標
 * @desc アクター画像の基本X座標
 * @type number
 * @max 9999
 * @min -9999
 * @default 0
 * @parent StatusWindowActorImgSetting
 * 
 * @param ActorImg_Y
 * @text アクター画像基本Y座標
 * @desc アクター画像の基本Y座標
 * @type number
 * @max 9999
 * @min -9999
 * @default 0
 * @parent StatusWindowActorImgSetting
 * 
 * @param ActorPosition
 * @text 立ち絵表示位置
 * @desc ステータスウィンドウの立ち絵の表示位置を指定します。Apengは適用されません。
 * @type select
 * @option 左
 * @value Left
 * @option 中央
 * @value Center
 * @option 右
 * @value Right
 * @default Right
 * @parent StatusWindowActorImgSetting
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
 * @option 名称のみ(1)(2)(3)(4)(5)(7)(8)(9)(11)(12)(14)(15)
 * @value Name
 * @option 顔グラ(1)(2)(3)(4)
 * @value Face
 * @option アクター名(1)(2)(3)(4)(5)(9)(11)(12)
 * @value ActorName
 * @option 二つ名(1)(2)(3)(4)(5)(9)(11)(12)
 * @value Nickname
 * @option 職業(1)(2)(3)(4)(5)(9)(11)(12)
 * @value Class
 * @option レベル(1)(2)(3)(4)(5)(6)(9)(11)(12)(13)
 * @value Level
 * @option スキルポイント(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value SkillPoint
 * @option ステート(1)(2)(3)(4)(5)(16※1)
 * @value State
 * @option ステート(戦闘用と同じ表示)(1)(2)(3)(4)
 * @value State2
 * @option 独自パラメータ(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(16)(17)(18)
 * @value OrgParam
 * @option HPゲージ(1)(2)(3)(4)(5)(7)(20)(21)(23)(24)
 * @value HpGauge
 * @option MPゲージ(1)(2)(3)(4)(5)(7)(20)(21)(23)(24)
 * @value MpGauge
 * @option TPゲージ(1)(2)(3)(4)(5)(7)(20)(21)(23)(24)
 * @value TpGauge
 * @option CircularHP(1)(2)(3)(4)(7)(20)(21)(23)(24)
 * @value HpCircularGauge
 * @option CircularMP(1)(2)(3)(4)(7)(20)(23)
 * @value MpCircularGauge
 * @option CircularTP(1)(2)(3)(4)(7)(20))(23)
 * @value TpCircularGauge
 * @option 現在の経験値(1)(2)(3)(4)(5)(6)(7)(8)(9)(11)(12)(13)(17)
 * @value ExpInfo
 * @option 次のレベルまでの経験値(1)(2)(3)(4)(5)(6)(7)(8)(9)(11)(12)(13)(17)(18)
 * @value Exp
 * @option 経験値（ゲージあり）(1)(2)(3)(4)(5)(7)(18)(20)(21)(23)(24)
 * @value ExpGauge
 * @option 経験値サークルゲージ (1)(2)(3)(4)(18)(20)(23)
 * @value ExpCircularGauge
 * @option 攻撃力(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Atk
 * @option 防御力(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Def
 * @option 魔法力(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Mat
 * @option 魔法防御(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Mdf
 * @option 敏捷性(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Agi
 * @option 運(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Luk
 * @option 命中率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Hit
 * @option 回避率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Eva
 * @option 会心率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Cri
 * @option 会心回避率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value CritcalEvade
 * @option 魔法回避率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value MagicEvade
 * @option 魔法反射率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value MagicrEflect
 * @option 反撃率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Counter
 * @option HP再生率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value HpRegen
 * @option MP再生率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(18)
 * @value MpRegen
 * @option TP再生率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value TpRegen
 * @option 狙われ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Aggro
 * @option 防御効果率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Guard
 * @option 回復効果率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Recovery
 * @option 薬の知識(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value ItemEffect
 * @option MP消費率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value MpCost
 * @option TPチャージ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value TpCharge
 * @option 物理ダメージ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value PhysicalDamage
 * @option 魔法ダメージ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value MagicalDamage
 * @option 床ダメージ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value FloorDamage
 * @option 獲得経験値率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value GainExpRate
 * @option 独自ゲージ(1)(2)(3)(4)(5)(7)(16)(18)(20)(21)(22)(23)(24)
 * @value OrgGauge
 * @option 画像(1)(2)(3)(4)(25)
 * @value Imges
 * @option キャラチップ(1)(2)(3)(4)
 * @value Charchip
 * @option SVアクター(1)(2)(3)(4)
 * @value SvActor
 * @option フリーテキスト(1)(2)(3)(4)(35)
 * @value Freetext
 * @option ライン(1)(2)(3)(4)(5)(8)
 * @value HorzLine
 * @default None
 * 
 * @param X_Position
 * @text X表示列位置(1)
 * @desc X表示列位置
 * @type number
 * @default 1
 * @min 1
 * @max 4
 * 
 * @param Y_Position
 * @desc Y表示行位置
 * @text Y表示行位置(2)
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * 
 * @param X_Coordinate
 * @text X座標（相対）(3)
 * @desc X座標（X表示列位置からの相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param Y_Coordinate
 * @text Y座標（相対）(4)
 * @desc Y座標（Y表示行位置からの相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param ItemWidth
 * @desc 項目、ゲージ横幅（0でデフォルト幅）
 * @text 項目、ゲージ横幅(5)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param SystemItemWidth
 * @desc 項目名称の横幅（0でデフォルト幅）
 * @text 項目名称横幅(6)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param ParamName
 * @desc 項目の名称を設定します。
 * @text 名称(7)
 * @type string
 * @default
 * 
 * @param NameColor
 * @desc 項目名称のシステムカラーID。テキストタブでカラーコードを入力できます。
 * @text 項目名称文字色(8)
 * @type color
 * @default 16
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
 * @param paramUnit
 * @desc 単位を設定します。
 * @text 単位(10)
 * @type string
 * @default 
 * 
 * @param FontSize
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ(11)
 * @type number
 * @default 0
 * @min -99
 * 
 * @param FontFace
 * @desc 項目名称のフォントを設定します。
 * @text 項目名称フォント(12)
 * @type string
 * @default 
 * 
 * @param ValueFontFace
 * @desc 数値のフォントを設定します。
 * @text 数値フォント(13)
 * @type string
 * @default 
 * 
 * @param Icon
 * @desc アイコンを設定します。
 * @text アイコン(14)
 * @type icon
 * @default 0
 * 
 * @param IconY
 * @desc アイコンを調整するY座標を指定します。(相対)
 * @text アイコン調整Y座標(15)
 * @type number
 * @default 2
 * @min -99
 * 
 * @param DetaEval
 * @desc 評価式または文字列を記入します。
 * @text 評価式or文字列(javaScript)(16)
 * @type combo
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option 'actor;//アクターのゲームデータ'
 * @option 'actor.actor();//アクターのシステムデータ'
 * @default 
 * 
 * @param Back
 * @text コンテンツ背景表示(17)
 * @desc コンテンツ背景を表示させます。
 * @type boolean
 * @default false
 * 
 * @param Decimal
 * @text 小数点桁数(18)
 * @desc 表示出来る小数点桁数。
 * @type number
 * @default 0
 * @min 0
 * @max 99
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
 * @param OtherSetting
 * @text その他設定
 * @default ------------------------------
 * 
 * @param Text
 * @desc フリーテキストのテキストを記入します。(制御文字使用可能)
 * @text フリーテキストのテキスト(35)
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
/*~struct~actorImgList:ja
 * 
 * @param ActorId
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
 * @param ActorImg
 * @text アクター画像
 * @desc アクターの画像を表示します。
 * @type file
 * @dir img/
 * @default 
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
 *  
 */

var Imported = Imported || {};
Imported.NUUN_SkillTreeStausWindowEx = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const paramList = {};
    paramList.ActorImg_X = params.ActorImg_X;
    paramList.ActorImg_Y = params.ActorImg_Y;
    paramList.ActorPosition = params.ActorPosition;


    function _isActorPictureEXApp() {
        return Imported.NUUN_ActorPicture && params.ActorPictureEXApp;
    }

    Scene_SkillTree.prototype.createWindowLayer = function() {
        this.createSpriteActor();
        Scene_MenuBase.prototype.createWindowLayer.call(this);
    };

    Scene_SkillTree.prototype.createSpriteActor = function() {
        if (params.GraphicMode === "s_img") {
            if (!this._spriteActor) {
                this._spriteActor = new Sprite_NuunActor(this, params);
            }
            this.addChild(this._spriteActor);
        }
    };

    const _Scene_SkillTree_refreshActor = Scene_SkillTree.prototype.refreshActor;
    Scene_SkillTree.prototype.refreshActor = function() {
        _Scene_SkillTree_refreshActor.apply(this, arguments);
        this.setupSpriteActor(this.actor());
    };

    Scene_SkillTree.prototype.setupSpriteActor = function(actor) {
        if (this._spriteActor) {
            this._spriteActor.setup(actor);
        }
    };

    const _Window_SkillTree_initialize = Window_SkillTree.prototype.initialize;
    Window_SkillTree.prototype.initialize = function(rect) {
        _Window_SkillTree_initialize.call(this, rect);
        this._actorBitmap = null;
        this._actorImgData = params.GraphicMode === 'img_tree' && _isActorPictureEXApp() ? new Nuun_ActorGraphics(this) : null;
    };

    const _Window_SkillTree_setActor = Window_SkillTree.prototype.setActor;
    Window_SkillTree.prototype.setActor = function(actor) {
        _Window_SkillTree_setActor.apply(this, arguments);
        this.setActorBitmap();
    };

    Window_SkillTree.prototype.setActorBitmap = function() {
        if (params.GraphicMode !== 'img_tree') return;
        if (this._actor && this._actorImgData) {
            this.setupActorImg();
        }
        const data = this.getActorImgData(this._actor);
        this._actorBitmap = this.getActorGraphicImg(data);
    };

    const _Window_SkillTree_drawAllItems = Window_SkillTree.prototype.drawAllItems;
    Window_SkillTree.prototype.drawAllItems = function() {
        if (!!this._actorBitmap && !this._actorBitmap.isReady()) {
            this._actorBitmap.addLoadListener(this.drawAllItems.bind(this));
            return;
        }
        _Window_SkillTree_drawAllItems.apply(this, arguments);
    };

    const _Window_SkillTree_drawBaseAreaContens = Window_SkillTree.prototype.drawBaseAreaContens;
    Window_SkillTree.prototype.drawBaseAreaContens = function() {
        this.drawActorImage();
        _Window_SkillTree_drawBaseAreaContens.apply(this, arguments);
    };

    Window_SkillTree.prototype.setupActorImg = function() {
        if (this._actor && this._actorImgData) {
            this._actorImgData.setup(this._actor);
        }
    };

    Window_SkillTree.prototype.drawActorImage = function() {
        if (params.GraphicMode !== 'img_tree') return;
        let bitmap = null;
        const actor = this._actor;
        const data = this.getActorImgData(actor);
        if (data && params.GraphicMode !== 'none') {
            bitmap = this.getActorGraphicImg(data);
        }
        if (bitmap) {
            bitmap.addLoadListener(function() {
                this.drawActorGraphic(data, bitmap, 0, 0, this.innerWidth, this.innerHeight, actor);
            }.bind(this));
        }
    };

    Window_SkillTree.prototype.getActorGraphicImg = function(data) {
        return _isActorPictureEXApp() ? this._actorImgData.loadActorGraphic() : ImageManager.nuun_LoadPictures(data.ActorImg);
    };

    Window_SkillTree.prototype.drawActorGraphic = function(data, bitmap, x, y, width, height, actor) {
        this.nuun_drawActorGraphic(data, bitmap, x, y, width, height);
    };

    Window_SkillTree.prototype.nuun_drawActorGraphic = function(data, bitmap, x, y, width, height) {
        const ww = bitmap.width;
        const wh = bitmap.height;
        const sx = data.Img_SX || 0;
        const sy = data.Img_SY || 0;
        x += data.Actor_X + (params.ActorImg_X || 0) + this.getActorGraphicPosition(bitmap);
        y += data.Actor_Y + (params.ActorImg_Y || 0) + (this.innerHeight - bitmap.height);
        this.contentsBack.blt(bitmap, sx, sy, ww, wh, x, y, ww, wh);
    };

    Window_SkillTree.prototype.getActorImgData = function(actor) {
        const list = params.ActorsImgList;
        return list.find(data => this.condActorImg(data, actor));
    };

    Window_SkillTree.prototype.condActorImg = function(data, actor) {
        if (data.ActorId === actor.actorId() && actor._classId === data.ClassId) {
            return true;
        } else if (data.ClassId === 0 && data.ActorId === actor.actorId()) {
            return true;
        } else if (data.ActorId === 0 && actor._classId === data.ClassId) {
            return true;
        }
        return false;
    };

    Window_SkillTree.prototype.getActorGraphicPosition = function(bitmap) {
        switch (params.ActorPosition) {
            case 'Left':
                return 0;
            case 'Center':
                return Math.floor(this.innerWidth / 2 - ((bitmap.width) / 2));
            case 'Right':
                return this.innerWidth - (bitmap.width);
            default:
                return this.innerWidth - (bitmap.width);
        }
    };

    const _Window_SkillTreeStatus_initialize = Window_SkillTreeStatus.prototype.initialize;
    Window_SkillTreeStatus.prototype.initialize = function(rect) {
        _Window_SkillTreeStatus_initialize.call(this, rect);
        if (!!params.ActorStatus) {
            this._contentsData = new Nuun_DrawSkillTreeStatusData(this, paramList);
            this._contentsData.setList(params.ActorStatus);
        }
    };

    const _Window_SkillTreeStatus_refresh = Window_SkillTreeStatus.prototype.refresh;
    Window_SkillTreeStatus.prototype.refresh = function() {
        if (!!params.ActorStatus) {
            Window_StatusBase.prototype.refresh.call(this);
            if (!this._actor) {
                return;
            }
            this._contentsData.drawStatusContents(this._actor);
        } else {
            _Window_SkillTreeStatus_refresh.apply(this, arguments);
        }
    };

    Window_SkillTreeStatus.prototype.defaultGraphicMode = function() {
        return 'none';
    };

    Window_SkillTreeStatus.prototype.setupActorImg = function() {
        if (this._actor) {
            this._contentsData.imgSetup(this._actor);
        }
    };

    Window_SkillTreeStatus.prototype.isActorPictureEXApp = function() {
        return _isActorPictureEXApp();
    };

    class Nuun_DrawSkillTreeStatusData extends Nuun_DrawListData {
        constructor(_window, params) {
            super(_window, params);
        }

        nuun_MaxContentsCols() {
            return params.ContentsCols || 1;
        }

        getGraphicMode() {
            return params.GraphicMode;
        }

        getActorsList() {
            return params.ActorsImgList;
        }

        getActorsSettingList() {
            return this._window.isActorPictureEXApp() ? NuunManager.getBattlerActors() : this.getActorsList();
        }

        isActorPictureEXApp() {
            return this._window.isActorPictureEXApp();
        }

    };
    
})();