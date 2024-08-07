/*:-----------------------------------------------------------------------------------
 * NUUN_ItemWindowEx.js
 * 
 * Copyright (C) 2024 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Item Window Customization
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_MenuParamListBase
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_MenuParamListBase
 * @version 1.1.1
 * 
 * @help
 * You can customize the item screen.
 * The item screen during battle is not supported.
 * 
 * Item Info
 * NUUN_MenuParamListBase Ver.1.1.0 or later
 * 
 * Specifying the display item list
 * Notes for items, weapons, and armor
 * <ItemParamListId:[id]> Specifies the list ID for the item info item settings. If not specified, item number 1 in the list will be displayed.
 * The item info window is not displayed by default.
 * 
 * Description field, individual image specification
 * Notes for items, weapons, and armor
 * Desc
 * <[Method]:[text]> 
 * [Method]:The method name entered in the Description field, individual image method name.
 * [text]:Display Text
 * 
 * Common Imges
 *  <[Method]:[filePass], [x], [y]> 
 * [Method]:The method name entered in the Description field, individual image method name.
 * [filePass]:File names directly under img/pictures
 * [x]:X coordinate
 * [y]:Y coordinate
 * Please remove the brackets [] and fill in.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 7/27/2024 Ver.1.1.1
 * Fixed to allow decimal points to be applied to original parameters.
 * 7/21/2024 Ver.1.1.0
 * Added the ability to display item info.
 * Fixed an incorrect description of window opacity.
 * 7/13/2024 Ver.1.0.1
 * Fixed the issue where the settings in "NUUN_ActorPicture" were not applied.
 * 6/16/2024 Ver.1.0.0
 * First edition.
 * 
 * @param Setting
 * @text Common setting
 * @default ------------------------------
 * 
 * @param SubMemberOpacity
 * @text Substitute members opaque display
 * @desc Displays reserved members as opaque.
 * @type boolean
 * @default true
 * @parent Setting
 * 
 * @param HelpWindowSetting
 * @text Help Window Settings
 * @default ------------------------------
 * 
 * @param HelpWindowX
 * @text Help window X coordinate
 * @desc X coordinate of the help window.
 * @type number
 * @default 0
 * @min -9999
 * @parent HelpWindowSetting
 * 
 * @param HelpWindowY
 * @desc Y coordinate of the help window.
 * @text Help window Y coordinate
 * @type number
 * @default 468
 * @min -9999
 * @parent HelpWindowSetting
 * 
 * @param HelpWindowWidth
 * @desc The width of the help window.
 * @text Help window width
 * @type number
 * @default 0
 * @min 0
 * @parent HelpWindowSetting
 * 
 * @param HelpWindowVisible
 * @text Help window opacity
 * @desc Makes the help window opaque.
 * @type boolean
 * @default true
 * @parent HelpWindowSetting
 * 
 * @param CategoryWindowSetting
 * @text Category Window Settings
 * @default ------------------------------
 * 
 * @param CategoryWindowX
 * @text Category window X coordinate
 * @desc X coordinate of the category window.
 * @type number
 * @default 0
 * @min -9999
 * @parent CategoryWindowSetting
 * 
 * @param CategoryWindowY
 * @desc Y coordinate of the category window.
 * @text Category window Y coordinate
 * @type number
 * @default 0
 * @min -9999
 * @parent CategoryWindowSetting
 * 
 * @param CategoryWindowWidth
 * @desc The width of the category window.
 * @text Category window width
 * @type number
 * @default 0
 * @min 0
 * @parent CategoryWindowSetting
 * 
 * @param CategoryWindowHeight
 * @text Category window height
 * @desc ategory window height. 0 is the main area height
 * @type number
 * @default 0
 * @min 0
 * @parent CategoryWindowSetting
 * 
 * @param CategoryWindowHeightRows
 * @text Category Window Height
 * @desc Category window height (number of rows) Specify "CategoryWindowHeight" with 0
 * @type number
 * @default 1
 * @min 0
 * @parent CategoryWindowSetting
 * 
 * @param CategoryWindowCols
 * @desc Number of categorical columns.
 * @text Category cols
 * @type number
 * @default 4
 * @min 1
 * @parent CategoryWindowSetting
 * 
 * @param CategoryWindowVisible
 * @text Category window opacity
 * @desc Make the category window opaque.
 * @type boolean
 * @default true
 * @parent CategoryWindowSetting
 * 
 * @param ItemInfoWindowSetting
 * @text Item Info Settings
 * @default ------------------------------
 * 
 * @param ShowItemInfo
 * @text Item Info Display
 * @desc Displays the item info window.
 * @type boolean
 * @default false
 * @parent ItemInfoWindowSetting
 * 
 * @param ActorWindowShowItemInfo
 * @text Displaying item info when selecting an actor
 * @desc Displays the item info window when an actor is selected.
 * @type boolean
 * @default false
 * @parent ItemInfoWindowSetting
 * 
 * @param ItemInfoParamList
 * @desc Set the item info item. Items without a list designation will display list number 1.
 * @text Item Info Item Settings
 * @type struct<ItemInfoList>[]
 * @default 
 * @parent ItemInfoWindowSetting
 * 
 * @param WeaponInfoParamList
 * @desc Set the item of the item info weapon. If the weapon does not have a list specified, the first item on the list will be displayed.
 * @text Item Info Weapon Item Settings
 * @type struct<WeaponInfoList>[]
 * @default 
 * @parent ItemInfoWindowSetting
 * 
 * @param ArmorInfoParamList
 * @desc Set the item of the item info armor. For armor without a list specification, the first item on the list will be displayed.
 * @text Item Info Armor Item Settings
 * @type struct<ArmorInfoList>[]
 * @default 
 * @parent ItemInfoWindowSetting
 * 
 * @param ItemInfoWindowX
 * @text Item window X coordinate.
 * @desc Item window X coordinate
 * @type number
 * @default 0
 * @min -9999
 * @parent ItemInfoWindowSetting
 * 
 * @param ItemInfoWindowY
 * @desc Item window Y coordinate.
 * @text Item window Y coordinate
 * @type number
 * @default 68
 * @min -9999
 * @parent ItemInfoWindowSetting
 * 
 * @param ItemInfoWindowWidth
 * @desc Item window width. 0 is UI width.
 * @text Item window width
 * @type number
 * @default 0
 * @min 0
 * @parent ItemInfoWindowSetting
 * 
 * @param ItemInfoWindowHeight
 * @text Item window height
 * @desc Height of item window. 0 is main area height
 * @type number
 * @default 400
 * @min 0
 * @parent ItemInfoWindowSetting
 * 
 * @param ItemInfoWindowHeightRows
 * @text Item Window Height
 * @desc Item window height (number of rows) 0 specifies ItemInfoWindowHeight
 * @type number
 * @default 0
 * @min 0
 * @parent ItemInfoWindowSetting
 * 
 * @param ItemInfoWindowVisible
 * @text Item info window opacity
 * @desc Makes the item info window opaque.
 * @type boolean
 * @default true
 * @parent ItemInfoWindowSetting
 * 
 * @param ItemWindowSetting
 * @text Item Window Settings
 * @default ------------------------------
 * 
 * @param ItemWindowX
 * @text Item window X coordinate
 * @desc The X coordinate of the item window.
 * @type number
 * @default 0
 * @min -9999
 * @parent ItemWindowSetting
 * 
 * @param ItemWindowY
 * @desc The Y coordinate of the item window.
 * @text Item window Y coordinate
 * @type number
 * @default 68
 * @min -9999
 * @parent ItemWindowSetting
 * 
 * @param ItemWindowWidth
 * @desc The width of the item window.
 * @text Item window width
 * @type number
 * @default 0
 * @min 0
 * @parent ItemWindowSetting
 * 
 * @param ItemWindowHeight
 * @text Item window height
 * @desc Vertical width of item window. 0 is main area height
 * @type number
 * @default 400
 * @min 0
 * @parent ItemWindowSetting
 * 
 * @param ItemWindowHeightRows
 * @text Item Window Height
 * @desc Item window height (number of rows) 0 specifies "Item window height"
 * @type number
 * @default 0
 * @min 0
 * @parent ItemWindowSetting
 * 
 * @param ItemWindowCols
 * @desc Number of item cols.
 * @text Number of item cols
 * @type number
 * @default 2
 * @min 1
 * @parent ItemWindowSetting
 * 
 * @param ItemWindowVisible
 * @text Item window opacity
 * @desc Make item window opaque.
 * @type boolean
 * @default true
 * @parent ItemWindowSetting
 * 
 * @param ActorStatusWindowSetting
 * @text Actor Window Settings
 * @default ------------------------------
 * 
 * @param SameMenuWindow
 * @text Same as the menu screen
 * @desc Display the same as the menu screen. If true, the coordinates will be relative.
 * @type boolean
 * @default true
 * @parent ActorStatusWindowSetting
 * 
 * @param StatusList
 * @desc Set the status item. If not set, the same display as the menu screen will be displayed.
 * @text Status item settings
 * @type struct<StatusListData>[]
 * @default 
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorWindowX
 * @text Actor Window X Coordinate
 * @desc Actor window X coordinate.
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorWindowY
 * @desc Actor window Y coordinate.
 * @text Actor Window Y Coordinate
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorWindowWidth
 * @desc Actor window width.
 * @text Actor window width
 * @type number
 * @default 0
 * @min 0
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorWindowHeight
 * @text Actor window height
 * @desc Actor window height. 0 is the main area height.
 * @type number
 * @default 0
 * @min 0
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorWindowCols
 * @desc Number of actor columns to display.
 * @text Display actor cols
 * @type number
 * @default 1
 * @min 1
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorWindowRows
 * @text Display actor rows
 * @desc Number of actor rows to display.
 * @type number
 * @default 4
 * @min 1
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorWindowVisible
 * @text Actor window opacity
 * @desc Makes the actor window opaque.
 * @type boolean
 * @default true
 * @parent ActorStatusWindowSetting
 * 
 * @param ShowActorWindow
 * @text Actor window always visible
 * @desc Always show the actor window.
 * @type boolean
 * @default false
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorSetting
 * @text Actor Settings
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
 * @option Image
 * @value 'img'
 * @default 'face'
 * @parent ActorSetting
 * 
 * @param ActorsImgList
 * @text Image Settings
 * @desc Actor Image Settings
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
 * @param BackGroundSetting
 * @text Background Settings
 * @default ------------------------------
 * 
 * @param BackGroundImg
 * @desc Specifies the name of the background image file to be displayed.
 * @text background image
 * @type file
 * @dir img/
 * @default 
 * @parent BackGroundSetting
 * 
 * @param BackUiWidth
 * @text Background Size Mode
 * @desc Adjust the background size to fit the UI.
 * @type boolean
 * @default true
 * @parent BackGroundSetting
 * 
 */
/*~struct~StatusListData:
 *
 * @param DateSelect
 * @text Status to display
 * @desc Specifies the status to display.
 * @type select
 * @option None
 * @value None
 * @option Nane(1)(2)(3)(4)(5)(7)(8)(9)(11)(12)(14)(15)
 * @value Name
 * @option Actor name(1)(2)(3)(4)(5)(9)(11)(12)
 * @value ActorName
 * @option Nickname(1)(2)(3)(4)(5)(9)(11)(12)
 * @value Nickname
 * @option Class(1)(2)(3)(4)(5)(9)(11)(12)
 * @value Class
 * @option Level(1)(2)(3)(4)(5)(6)(9)(11)(12)(13)
 * @value Level
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
 * @option Equip(1)(2)(3)(4)(5)(6)(7)(8)(11)(12)(17)(30)(31)
 * @value Equip
 * @option Image(1)(2)(3)(4)(25)
 * @value Imges
 * @option Character chip(1)(2)(3)(4)(26)
 * @value Charchip
 * @option SV Actor(1)(2)(3)(4)(26)
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
 * @param BattleMemberOpacity
 * @text Non-battle member image translucency(26)
 * @desc Semi-transparency is enabled outside the battle members.
 * @type boolean
 * @default true
 * @parent ImgSetting
 * 
 * @param EquipSetting
 * @text Equipment Settings
 * @default ------------------------------
 * 
 * @param EquipStartIndex
 * @text Start Index(30)
 * @desc Specifies the starting index of the equipment column.
 * @type number
 * @default 0
 * @min 0
 * @max 99999
 * @parent EquipSetting
 * 
 * @param EquipNum
 * @text Display equipment number(31)
 * @desc Specifies the display of the equipment column. (No limit at 0)
 * @type number
 * @default 0
 * @parent EquipSetting
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
/*~struct~ItemInfoList:
 * 
 * @param ItemInfoParams
 * @desc Set the item info items.
 * @text Item Info Item Settings
 * @type struct<ItemInfoListData>[]
 * @default 
 * 
 */
/*~struct~WeaponInfoList:
 * 
 * @param WeaponInfoParams
 * @desc Item Info Sets the weapon item.
 * @text Item Info Weapon Item Settings
 * @type struct<WeaponInfoListData>[]
 * @default 
 * 
 */
/*~struct~ArmorInfoList:
 * 
 * @param ArmorInfoParams
 * @desc Item Info Set the armor item.
 * @text Item Info Armor Item Settings
 * @type struct<ArmorInfoListData>[]
 * @default 
 * 
 */
/*~struct~ItemInfoListData:
 *
 * @param DateSelect
 * @text Items to display
 * @desc Specify the items to display.
 * @type select
 * @option None
 * @value None
 * @option Name(1)(2)(3)(4)(5)(7)(8)(9)(11)(12)(14)(15)
 * @value Name
 * @option Item name(1)(2)(3)(4)(5)(9)(11)(12)
 * @value ItemName
 * @option Original parameter(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(16)(17)(18)
 * @value OrgParam
 * @option Price(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Price
 * @option Consumption(1)(2)(3)(4)(5)(6)(7)(8)(9)(11)(12)(13)(14)(15)(17)
 * @value Consumption
 * @option Possession(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Num
 * @option Max possession(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value MaxNum
 * @option Occasion(1)(2)(3)(4)(5)(6)(7)(8)(9)(11)(12)(13)(14)(15)(17)
 * @value Occasion
 * @option Speed(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Speed
 * @option Success rate(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Success
 * @option Consumption rate(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value ConsumptionRate
 * @option Common imges(1)(2)(3)(4)(25)(26)
 * @value Imges
 * @option IndividualImges(1)(2)(3)(4)(25)(26)(28)
 * @value IndividualImges
 * @option Free text(1)(2)(3)(4)(35)
 * @value Freetext
 * @option Line(1)(2)(3)(4)(5)(8)
 * @value HorzLine
 * @option Desc(1)(2)(3)(4)(6)(7)(8)(28)
 * @value Desc
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
 * @option 'item;//Item data'
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
 * @param TextMethod
 * @desc Description field, method name to link to image (individually specified image)
 * @text Description field, individual image method name (28)
 * @type string
 * @default 
 * @parent textSetting
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
 * @param ImgMaxHeight
 * @desc Maximum image height (specified in number of rows) 0 for no shrinking
 * @text Maximum image height(26)
 * @type number
 * @default 0
 * @min 0
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
 * @default 
 *
 */
/*~struct~WeaponInfoListData:
 *
 * @param DateSelect
 * @text Items to display
 * @desc Specify the items to display.
 * @type select
 * @option None
 * @value None
 * @option Name(1)(2)(3)(4)(5)(7)(8)(9)(11)(12)(14)(15)
 * @value Name
 * @option Item name(1)(2)(3)(4)(5)(9)(11)(12)
 * @value ItemName
 * @option Original parameter(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(16)(17)(18)
 * @value OrgParam
 * @option Price(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Price
 * @option Possession(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Num
 * @option Max possession(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value MaxNum
 * @option Weapon type(1)(2)(3)(4)(5)(6)(7)(8)(9)(11)(12)(13)(14)(15)(17)
 * @value Type
 * @option Atk(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Atk
 * @option Def(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Def
 * @option Mat(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Mat
 * @option Mdf(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Mdf
 * @option Agi(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Agi
 * @option Luk(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Luk
 * @option Common imges(1)(2)(3)(4)(25)(26)
 * @value Imges
 * @option IndividualImges(1)(2)(3)(4)(25)(26)(28)
 * @value IndividualImges
 * @option Free text(1)(2)(3)(4)(35)
 * @value Freetext
 * @option Line(1)(2)(3)(4)(5)(8)
 * @value HorzLine
 * @option Desc(1)(2)(3)(4)(6)(7)(8)(28)
 * @value Desc
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
 * @option 'item;//Item data'
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
 * @param TextMethod
 * @desc Description field, method name to link to image (individually specified image)
 * @text Description field, individual image method name (28)
 * @type string
 * @default 
 * @parent textSetting
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
 * @param ImgMaxHeight
 * @desc Maximum image height (specified in number of rows) 0 for no shrinking
 * @text Maximum image height(26)
 * @type number
 * @default 0
 * @min 0
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
 * @default 
 *
 */
/*~struct~ArmorInfoListData:
 *
 * @param DateSelect
 * @text Items to display
 * @desc Specify the items to display.
 * @type select
 * @option None
 * @value None
 * @option Name(1)(2)(3)(4)(5)(7)(8)(9)(11)(12)(14)(15)
 * @value Name
 * @option Item name(1)(2)(3)(4)(5)(9)(11)(12)
 * @value ItemName
 * @option Original parameter(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(16)(17)(18)
 * @value OrgParam
 * @option Price(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Price
 * @option Possession(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Num
 * @option Max possession(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value MaxNum
 * @option Armor Type(1)(2)(3)(4)(5)(6)(7)(8)(9)(11)(12)(13)(14)(15)(17)
 * @value Type
 * @option Equipment Type(1)(2)(3)(4)(5)(6)(7)(8)(9)(11)(12)(13)(14)(15)(17)
 * @value EquipType
 * @option Atk(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Atk
 * @option Def(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Def
 * @option Mat(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Mat
 * @option Mdf(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Mdf
 * @option Agi(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Agi
 * @option Luk(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Luk
 * @option Common imges(1)(2)(3)(4)(25)(26)
 * @value Imges
 * @option IndividualImges(1)(2)(3)(4)(25)(26)(28)
 * @value IndividualImges
 * @option Free text(1)(2)(3)(4)(35)
 * @value Freetext
 * @option Line(1)(2)(3)(4)(5)(8)
 * @value HorzLine
 * @option Desc(1)(2)(3)(4)(6)(7)(8)(28)
 * @value Desc
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
 * @option 'item;//Item data'
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
 * @param TextMethod
 * @desc Description field, method name to link to image (individually specified image)
 * @text Description field, individual image method name (28)
 * @type string
 * @default 
 * @parent textSetting
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
 * @param ImgMaxHeight
 * @desc Maximum image height (specified in number of rows) 0 for no shrinking
 * @text Maximum image height(26)
 * @type number
 * @default 0
 * @min 0
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
 * @default 
 *
 */
/*:ja
 * @target MZ
 * @plugindesc アイテムウィンドウカスタマイズ
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_MenuParamListBase
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_MenuParamListBase
 * @version 1.1.1
 * 
 * @help
 * アイテム画面をカスタマイズできます。
 * 戦闘中のアイテム画面には対応しておりません。
 * 
 * アイテムインフォ
 * NUUN_MenuParamListBase Ver.1.1.0以降
 * 表示項目リストの指定
 * アイテム、武器、防具のメモ欄
 * <ItemParamListId:[id]> アイテムインフォ項目設定のリストIDを指定します。指定がない場合はリスト番号1番の項目が表示されます。
 * 
 * アイテムインフォウィンドウは初期設定では表示されません。
 * 
 * 記述欄、個別画像指定
 * アイテム、武器、防具のメモ欄
 * 記述欄
 * <[Method]:[text]> 
 * [Method]:記述欄、個別指定画像タグ名で記入したタグ名。
 * [text]:表示テキスト
 * 
 * 個別画像指定
 * <[Method]:[filePass], [x], [y]> 
 * [Method]:記述欄、個別指定画像タグ名で記入したタグ名。
 * [filePass]:img/pictures直下のファイル名
 * [x]:X座標
 * [y]:Y座標
 * []は外して記入して下さい。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/7/27 Ver.1.1.1
 * オリジナルパラメータに小数点数を適用できるように修正。
 * 2024/7/21 Ver.1.1.0
 * アイテムインフォを表示できる機能を追加。
 * ウィンドウの不透明化の説明が間違っていたため修正。
 * 2024/7/13 Ver.1.0.1
 * 立ち絵、顔グラ共通プラグインでの設定が適用されなかった問題を修正。
 * 2024/6/16 Ver.1.0.0
 * 初版
 * 
 * 
 * @param Setting
 * @text 共通設定
 * @default ------------------------------
 * 
 * @param SubMemberOpacity
 * @text 控えメンバー不透明表示
 * @desc 控えメンバーを不透明で表示します。
 * @type boolean
 * @default true
 * @parent Setting
 * 
 * @param HelpWindowSetting
 * @text ヘルプウィンドウ設定
 * @default ------------------------------
 * 
 * @param HelpWindowX
 * @text ヘルプウィンドウX座標
 * @desc ヘルプウィンドウのX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent HelpWindowSetting
 * 
 * @param HelpWindowY
 * @desc ヘルプウィンドウのY座標
 * @text ヘルプウィンドウY座標
 * @type number
 * @default 468
 * @min -9999
 * @parent HelpWindowSetting
 * 
 * @param HelpWindowWidth
 * @desc ヘルプウィンドウの横幅。
 * @text ヘルプウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent HelpWindowSetting
 * 
 * @param HelpWindowVisible
 * @text ヘルプウィンドウ不透明化
 * @desc ヘルプウィンドウを不透明化する。
 * @type boolean
 * @default true
 * @parent HelpWindowSetting
 * 
 * @param CategoryWindowSetting
 * @text カテゴリーウィンドウ設定
 * @default ------------------------------
 * 
 * @param CategoryWindowX
 * @text カテゴリーウィンドウX座標
 * @desc カテゴリーウィンドウのX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent CategoryWindowSetting
 * 
 * @param CategoryWindowY
 * @desc カテゴリーウィンドウのY座標
 * @text カテゴリーウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent CategoryWindowSetting
 * 
 * @param CategoryWindowWidth
 * @desc カテゴリーウィンドウの横幅。
 * @text カテゴリーウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent CategoryWindowSetting
 * 
 * @param CategoryWindowHeight
 * @text カテゴリーウィンドウ縦幅
 * @desc カテゴリーウィンドウの縦幅。0でメインエリア高さ
 * @type number
 * @default 0
 * @min 0
 * @parent CategoryWindowSetting
 * 
 * @param CategoryWindowHeightRows
 * @text カテゴリーウィンドウ高さ
 * @desc カテゴリーウィンドウの高さ(行数指定) 0でCategoryWindowHeight指定
 * @type number
 * @default 1
 * @min 0
 * @parent CategoryWindowSetting
 * 
 * @param CategoryWindowCols
 * @desc カテゴリー列数
 * @text カテゴリー列数
 * @type number
 * @default 4
 * @min 1
 * @parent CategoryWindowSetting
 * 
 * @param CategoryWindowVisible
 * @text カテゴリーウィンドウ不透明化
 * @desc カテゴリーウィンドウを不透明化する。
 * @type boolean
 * @default true
 * @parent CategoryWindowSetting
 * 
 * @param ItemWindowSetting
 * @text アイテムウィンドウ設定
 * @default ------------------------------
 * 
 * @param ItemWindowX
 * @text アイテムウィンドウX座標
 * @desc アイテムウィンドウのX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ItemWindowSetting
 * 
 * @param ItemWindowY
 * @desc アイテムウィンドウのY座標
 * @text アイテムウィンドウY座標
 * @type number
 * @default 68
 * @min -9999
 * @parent ItemWindowSetting
 * 
 * @param ItemWindowWidth
 * @desc アイテムウィンドウの横幅。
 * @text アイテムウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent ItemWindowSetting
 * 
 * @param ItemWindowHeight
 * @text アイテムウィンドウ縦幅
 * @desc アイテムウィンドウの縦幅。0でメインエリア高さ
 * @type number
 * @default 400
 * @min 0
 * @parent ItemWindowSetting
 * 
 * @param ItemWindowHeightRows
 * @text アイテムウィンドウ高さ
 * @desc アイテムウィンドウの高さ(行数指定) 0でItemWindowHeight指定
 * @type number
 * @default 0
 * @min 0
 * @parent ItemWindowSetting
 * 
 * @param ItemWindowCols
 * @desc アイテム列数
 * @text アイテム列数
 * @type number
 * @default 2
 * @min 1
 * @parent ItemWindowSetting
 * 
 * @param ItemWindowVisible
 * @text アイテムウィンドウ不透明化
 * @desc アイテムウィンドウを不透明化する。
 * @type boolean
 * @default true
 * @parent ItemWindowSetting
 * 
 * @param ItemInfoWindowSetting
 * @text アイテムインフォ設定
 * @default ------------------------------
 * 
 * @param ShowItemInfo
 * @text アイテムインフォ表示
 * @desc アイテムインフォウィンドウを表示します。
 * @type boolean
 * @default false
 * @parent ItemInfoWindowSetting
 * 
 * @param ActorWindowShowItemInfo
 * @text アクター選択時のアイテムインフォ表示
 * @desc アクター選択時にアイテムインフォウィンドウを表示します。
 * @type boolean
 * @default false
 * @parent ItemInfoWindowSetting
 * 
 * @param ItemInfoParamList
 * @desc アイテムインフォの項目を設定します。リスト指定のないアイテムはリスト1番が表示されます。
 * @text アイテムインフォ項目設定
 * @type struct<ItemInfoList>[]
 * @default 
 * @parent ItemInfoWindowSetting
 * 
 * @param WeaponInfoParamList
 * @desc アイテムインフォ武器の項目を設定します。リスト指定のない武器はリスト1番が表示されます。
 * @text アイテムインフォ武器項目設定
 * @type struct<WeaponInfoList>[]
 * @default 
 * @parent ItemInfoWindowSetting
 * 
 * @param ArmorInfoParamList
 * @desc アイテムインフォ防具の項目を設定します。リスト指定のない防具はリスト1番が表示されます。
 * @text アイテムインフォ防具項目設定
 * @type struct<ArmorInfoList>[]
 * @default 
 * @parent ItemInfoWindowSetting
 * 
 * @param ItemInfoWindowX
 * @text アイテムウィンドウX座標
 * @desc アイテムウィンドウのX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ItemInfoWindowSetting
 * 
 * @param ItemInfoWindowY
 * @desc アイテムウィンドウのY座標
 * @text アイテムウィンドウY座標
 * @type number
 * @default 68
 * @min -9999
 * @parent ItemInfoWindowSetting
 * 
 * @param ItemInfoWindowWidth
 * @desc アイテムウィンドウの横幅。0でUI幅
 * @text アイテムウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent ItemInfoWindowSetting
 * 
 * @param ItemInfoWindowHeight
 * @text アイテムウィンドウ縦幅
 * @desc アイテムウィンドウの縦幅。0でメインエリア高さ
 * @type number
 * @default 400
 * @min 0
 * @parent ItemInfoWindowSetting
 * 
 * @param ItemInfoWindowHeightRows
 * @text アイテムウィンドウ高さ
 * @desc アイテムウィンドウの高さ(行数指定) 0でItemInfoWindowHeight指定
 * @type number
 * @default 0
 * @min 0
 * @parent ItemInfoWindowSetting
 * 
 * @param ItemInfoWindowVisible
 * @text アイテムインフォウィンドウ不透明化
 * @desc アイテムインフォウィンドウを不透明化する。
 * @type boolean
 * @default true
 * @parent ItemInfoWindowSetting
 * 
 * @param ActorStatusWindowSetting
 * @text アクターウィンドウ設定
 * @default ------------------------------
 * 
 * @param SameMenuWindow
 * @text メニュー画面と同じ
 * @desc 表示をメニュー画面と同じ表示にする。trueの場合、座標は相対座標になります。
 * @type boolean
 * @default true
 * @parent ActorStatusWindowSetting
 * 
 * @param StatusList
 * @desc ステータスの項目を設定します。未設定の場合はメニュー画面と同じ表示になります。
 * @text ステータス項目設定
 * @type struct<StatusListData>[]
 * @default 
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorWindowX
 * @text アクターウィンドウX座標
 * @desc アクターウィンドウのX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorWindowY
 * @desc アクターウィンドウのY座標
 * @text アクターウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorWindowWidth
 * @desc アクターウィンドウの横幅。
 * @text アクターウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorWindowHeight
 * @text アクターウィンドウ縦幅
 * @desc アクターウィンドウの縦幅。0でメインエリア高さ
 * @type number
 * @default 0
 * @min 0
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorWindowCols
 * @desc 表示するアクター列数
 * @text 表示アクター列数
 * @type number
 * @default 1
 * @min 1
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorWindowRows
 * @text 表示アクター行数
 * @desc 表示するアクター行数
 * @type number
 * @default 4
 * @min 1
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorWindowVisible
 * @text アクターウィンドウ不透明化
 * @desc アクターウィンドウを不透明化します。
 * @type boolean
 * @default true
 * @parent ActorStatusWindowSetting
 * 
 * @param ShowActorWindow
 * @text アクターウィンドウ常時表示
 * @desc アクターウィンドウを常時表示する。
 * @type boolean
 * @default false
 * @parent ActorStatusWindowSetting
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
 * @desc アクターの画像設定
 * @default []
 * @type struct<actorImgList>[]
 * @parent ActorSetting
 * 
 * @param ActorPictureEXApp
 * @text 立ち絵表示EX適用
 * @desc 立ち絵表示EXの画像変更を適用します。OFFにした場合はこのプラグインでの設定が適用されます。
 * @type boolean
 * @default false
 * @parent ActorSetting
 * 
 * @param ActorImg_X
 * @text アクター画像基本X座標
 * @desc アクター画像の基本X座標(顔グラのみ)
 * @type number
 * @max 9999
 * @min -9999
 * @default 0
 * @parent ActorSetting
 * 
 * @param ActorImg_Y
 * @text アクター画像基本Y座標
 * @desc アクター画像の基本Y座標(顔グラのみ)
 * @type number
 * @max 9999
 * @min -9999
 * @default 0
 * @parent ActorSetting
 * 
 * @param BackGroundSetting
 * @text 背景設定
 * @default ------------------------------
 * 
 * @param BackGroundImg
 * @desc 表示する背景画像ファイル名を指定します。
 * @text 背景画像
 * @type file
 * @dir img/
 * @default 
 * @parent BackGroundSetting
 * 
 * @param BackUiWidth
 * @text 背景サイズモード
 * @desc 背景サイズをUIに合わせる。
 * @type boolean
 * @default true
 * @parent BackGroundSetting
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
 * @option 名称のみ(1)(2)(3)(4)(5)(7)(8)(9)(11)(12)(14)(15)
 * @value Name
 * @option アクター名(1)(2)(3)(4)(5)(9)(11)(12)
 * @value ActorName
 * @option 二つ名(1)(2)(3)(4)(5)(9)(11)(12)
 * @value Nickname
 * @option 職業(1)(2)(3)(4)(5)(9)(11)(12)
 * @value Class
 * @option レベル(1)(2)(3)(4)(5)(6)(9)(11)(12)(13)
 * @value Level
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
 * @option 攻撃力(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Atk
 * @option 防御力(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Def
 * @option 魔法力(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Mat
 * @option 魔法防御(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Mdf
 * @option 敏捷性(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Agi
 * @option 運(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
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
 * @option 装備(1)(2)(3)(4)(5)(6)(7)(8)(11)(12)(17)(30)(31)
 * @value Equip
 * @option 画像(1)(2)(3)(4)(25)
 * @value Imges
 * @option キャラチップ(1)(2)(3)(4)(26)
 * @value Charchip
 * @option SVアクター(1)(2)(3)(4)(26)
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
 * @param BattleMemberOpacity
 * @text 非バトルメンバー画像半透明(26)
 * @desc バトルメンバーではない時の半透明有効。
 * @type boolean
 * @default true
 * @parent ImgSetting
 * 
 * @param EquipSetting
 * @text 装備設定
 * @default ------------------------------
 * 
 * @param EquipStartIndex
 * @text 開始インデックス(30)
 * @desc 装備欄の開始インデックスを指定します。
 * @type number
 * @default 0
 * @min 0
 * @max 99999
 * @parent EquipSetting
 * 
 * @param EquipNum
 * @text 表示装備数(31)
 * @desc 装備欄の表示を指定します。(0で制限なし)
 * @type number
 * @default 0
 * @parent EquipSetting
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
/*~struct~ItemInfoList:ja
 * 
 * @param ItemInfoParams
 * @desc アイテムインフォの項目を設定します。
 * @text アイテムインフォ項目設定
 * @type struct<ItemInfoListData>[]
 * @default 
 * 
 */
/*~struct~WeaponInfoList:ja
 * 
 * @param WeaponInfoParams
 * @desc アイテムインフォ武器の項目を設定します。
 * @text アイテムインフォ武器項目設定
 * @type struct<WeaponInfoListData>[]
 * @default 
 * 
 */
/*~struct~ArmorInfoList:ja
 * 
 * @param ArmorInfoParams
 * @desc アイテムインフォ防具の項目を設定します。
 * @text アイテムインフォ防具項目設定
 * @type struct<ArmorInfoListData>[]
 * @default 
 * 
 */
/*~struct~ItemInfoListData:ja
 *
 * @param DateSelect
 * @text 表示する項目
 * @desc 表示する項目を指定します。
 * @type select
 * @option なし
 * @value None
 * @option 名称のみ(1)(2)(3)(4)(5)(7)(8)(9)(11)(12)(14)(15)
 * @value Name
 * @option アイテム名(1)(2)(3)(4)(5)(9)(11)(12)
 * @value ItemName
 * @option 独自パラメータ(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(16)(17)(18)
 * @value OrgParam
 * @option 価格(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Price
 * @option 消耗(1)(2)(3)(4)(5)(6)(7)(8)(9)(11)(12)(13)(14)(15)(17)
 * @value Consumption
 * @option 所持数(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Num
 * @option 最大所持数(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value MaxNum
 * @option 使用可能時(1)(2)(3)(4)(5)(6)(7)(8)(9)(11)(12)(13)(14)(15)(17)
 * @value Occasion
 * @option 速度補正(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Speed
 * @option 成功率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Success
 * @option 消耗率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value ConsumptionRate
 * @option 画像（共通画像）(1)(2)(3)(4)(25)(26)
 * @value Imges
 * @option 画像（個別指定画像）(1)(2)(3)(4)(25)(26)(28)
 * @value IndividualImges
 * @option フリーテキスト(1)(2)(3)(4)(35)
 * @value Freetext
 * @option ライン(1)(2)(3)(4)(5)(8)
 * @value HorzLine
 * @option 記述欄(1)(2)(3)(4)(6)(7)(8)(28)
 * @value Desc
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
 * @option 'item;//アイテムデータ'
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
 * @param TextMethod
 * @desc 記述欄、画像（個別指定画像）に紐づけするタグ名
 * @text 記述欄、個別指定画像タグ名(28)
 * @type string
 * @default 
 * @parent textSetting
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
 * @param ImgMaxHeight
 * @desc 画像の最大縦幅（行数で指定）0で縮小無し
 * @text 画像の最大縦幅(26)
 * @type number
 * @default 0
 * @min 0
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
 * @default 
 *
 */
/*~struct~WeaponInfoListData:ja
 *
 * @param DateSelect
 * @text 表示する項目
 * @desc 表示する項目を指定します。
 * @type select
 * @option なし
 * @value None
 * @option 名称のみ(1)(2)(3)(4)(5)(7)(8)(9)(11)(12)(14)(15)
 * @value Name
 * @option アイテム名(1)(2)(3)(4)(5)(9)(11)(12)
 * @value ItemName
 * @option 独自パラメータ(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(16)(17)(18)
 * @value OrgParam
 * @option 価格(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Price
 * @option 所持数(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Num
 * @option 最大所持数(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value MaxNum
 * @option 武器タイプ(1)(2)(3)(4)(5)(6)(7)(8)(9)(11)(12)(13)(14)(15)(17)
 * @value Type
 * @option 攻撃力(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Atk
 * @option 防御力(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Def
 * @option 魔法力(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Mat
 * @option 魔法防御(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Mdf
 * @option 敏捷性(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Agi
 * @option 運(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Luk
 * @option 画像（共通画像）(1)(2)(3)(4)(25)(26)
 * @value Imges
 * @option 画像（個別指定画像）(1)(2)(3)(4)(25)(26)(28)
 * @value IndividualImges
 * @option フリーテキスト(1)(2)(3)(4)(35)
 * @value Freetext
 * @option ライン(1)(2)(3)(4)(5)(8)
 * @value HorzLine
 * @option 記述欄(1)(2)(3)(4)(6)(7)(8)(28)
 * @value Desc
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
 * @option 'item;//アイテムデータ'
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
 * @param TextMethod
 * @desc 記述欄、画像（個別指定画像）に紐づけするタグ名
 * @text 記述欄、個別指定画像タグ名(28)
 * @type string
 * @default 
 * @parent textSetting
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
 * @param ImgMaxHeight
 * @desc 画像の最大縦幅（行数で指定）0で縮小無し
 * @text 画像の最大縦幅(26)
 * @type number
 * @default 0
 * @min 0
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
 * @default 
 *
 */
/*~struct~ArmorInfoListData:ja
 *
 * @param DateSelect
 * @text 表示する項目
 * @desc 表示する項目を指定します。
 * @type select
 * @option なし
 * @value None
 * @option 名称のみ(1)(2)(3)(4)(5)(7)(8)(9)(11)(12)(14)(15)
 * @value Name
 * @option アイテム名(1)(2)(3)(4)(5)(9)(11)(12)
 * @value ItemName
 * @option 独自パラメータ(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(16)(17)(18)
 * @value OrgParam
 * @option 価格(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Price
 * @option 所持数(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value Num
 * @option 最大所持数(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)
 * @value MaxNum
 * @option 防具タイプ(1)(2)(3)(4)(5)(6)(7)(8)(9)(11)(12)(13)(14)(15)(17)
 * @value Type
 * @option 装備タイプ(1)(2)(3)(4)(5)(6)(7)(8)(9)(11)(12)(13)(14)(15)(17)
 * @value EquipType
 * @option 攻撃力(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Atk
 * @option 防御力(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Def
 * @option 魔法力(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Mat
 * @option 魔法防御(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Mdf
 * @option 敏捷性(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Agi
 * @option 運(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value Luk
 * @option 画像（共通画像）(1)(2)(3)(4)(25)(26)
 * @value Imges
 * @option 画像（個別指定画像）(1)(2)(3)(4)(25)(26)(28)
 * @value IndividualImges
 * @option フリーテキスト(1)(2)(3)(4)(35)
 * @value Freetext
 * @option ライン(1)(2)(3)(4)(5)(8)
 * @value HorzLine
 * @option 記述欄(1)(2)(3)(4)(6)(7)(8)(28)
 * @value Desc
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
 * @option 'item;//アイテムデータ'
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
 * @param TextMethod
 * @desc 記述欄、画像（個別指定画像）に紐づけするタグ名
 * @text 記述欄、個別指定画像タグ名(28)
 * @type string
 * @default 
 * @parent textSetting
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
 * @param ImgMaxHeight
 * @desc 画像の最大縦幅（行数で指定）0で縮小無し
 * @text 画像の最大縦幅(26)
 * @type number
 * @default 0
 * @min 0
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
 * @default 
 *
 */

var Imported = Imported || {};
Imported.NUUN_ItemWindowEx = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    const parameters = PluginManager.parameters('NUUN_ItemWindowEx');

    const _Scene_Item_create = Scene_Item.prototype.create;
    Scene_Item.prototype.create = function() {
        _Scene_Item_create.call(this);
        this.createItemInfoWindow();
        this.setWindowOpacity();
    };

    Scene_Item.prototype.createActorWindow = function() {
        const rect = this.actorWindowRect();
        this._actorWindow = isStatusList() ? new Window_ItemMenuActor(rect) : new Window_MenuActor(rect);
        this._actorWindow.setHandler("ok", this.onActorOk.bind(this));
        this._actorWindow.setHandler("cancel", this.onActorCancel.bind(this));
        this.addWindow(this._actorWindow);
    };
    
    Scene_Item.prototype.createItemInfoWindow = function() {
        if (params.ShowItemInfo) {
            const rect = this.itemInfoWindowRect();
            this._itemInfoWindow = new Window_ItemInfo(rect);
            this.addWindow(this._itemInfoWindow);
            this._itemWindow.setItemInfoWindow(this._itemInfoWindow);
            this._categoryWindow.setItemInfoWindow(this._itemInfoWindow);
            if (!params.ActorWindowShowItemInfo && this._actorWindow.active && this._actorWindow.visible) {
                this._itemInfoWindow.hide();
            }
        }
    };

    Scene_Item.prototype.actorWindowRect = function() {
        if (params.SameMenuWindow) {
            const rect = Scene_ItemBase.prototype.actorWindowRect.apply(this, arguments);
            rect.x += params.ActorWindowX;
            rect.y += params.ActorWindowY;
            return rect;
        } else {
            const wx = params.ActorWindowX;
            const wy = params.ActorWindowY + this.mainAreaTop();
            const ww = params.ActorWindowWidth > 0 ? Math.min(params.ActorWindowWidth, Graphics.boxWidth - wx) : Graphics.boxWidth;
            const wh = params.ActorWindowHeight > 0 ? Math.min(params.ActorWindowHeight, Graphics.boxHeight - wy) : Graphics.boxHeight;
            return new Rectangle(wx, wy, ww, wh);
        }
    };

    Scene_Item.prototype.helpWindowRect = function() {
        const wx = params.HelpWindowX;
        const wy = params.HelpWindowY + this.mainAreaTop();
        const ww = params.HelpWindowWidth > 0 ? Math.min(params.HelpWindowWidth, Graphics.boxWidth - wx) : Graphics.boxWidth;
        const wh = this.helpAreaHeight();
        return new Rectangle(wx, wy, ww, wh);
    };
    

    Scene_Item.prototype.categoryWindowRect = function() {
        const wx = params.CategoryWindowX;
        const wy = params.CategoryWindowY + this.mainAreaTop();
        const ww = params.CategoryWindowWidth > 0 ? Math.min(params.CategoryWindowWidth, Graphics.boxWidth - wx) : Graphics.boxWidth;
        const wh = Math.min(Graphics.boxHeight - wy, params.CategoryWindowHeightRows > 0 ? this.calcWindowHeight(params.CategoryWindowHeightRows, true) : (params.CategoryWindowHeight > 0 ? params.CategoryWindowHeight : Graphics.boxHeight));
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Item.prototype.itemWindowRect = function() {
        const wx = params.ItemWindowX;
        const wy = params.ItemWindowY + this.mainAreaTop();
        const ww = params.ItemWindowWidth > 0 ? Math.min(params.ItemWindowWidth, Graphics.boxWidth - wx) : Graphics.boxWidth;
        const wh = Math.min(Graphics.boxHeight - wy, params.ItemWindowHeightRows > 0 ? this.calcWindowHeight(params.ItemWindowHeightRows, false) : (params.ItemWindowHeight > 0 ? params.ItemWindowHeight : Graphics.boxHeight));
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Item.prototype.itemInfoWindowRect = function() {
        const wx = params.ItemInfoWindowX;
        const wy = params.ItemInfoWindowY + this.mainAreaTop();
        const ww = params.ItemInfoWindowWidth > 0 ? Math.min(params.ItemInfoWindowWidth, Graphics.boxWidth - wx) : Graphics.boxWidth;
        const wh = Math.min(Graphics.boxHeight - wy, params.ItemInfoWindowHeightRows > 0 ? this.calcWindowHeight(params.ItemInfoWindowHeightRows, false) : (params.ItemInfoWindowHeight > 0 ? params.ItemInfoWindowHeight : Graphics.boxHeight));
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Item.prototype.showActorWindow = function() {
        this._actorWindow.show();
        this._actorWindow.activate();
        if (!params.ActorWindowShowItemInfo && this._itemInfoWindow && this._actorWindow.active) {
            this._itemInfoWindow.hide();
        }
    };


    const _Scene_Item_hideActorWindow = Scene_Item.prototype.hideActorWindow;
    Scene_Item.prototype.hideActorWindow = function() {
        if (params.ShowActorWindow) {
            this._actorWindow.deselect();
            this._actorWindow.deactivate();
        } else {
            _Scene_Item_hideActorWindow.apply(this, arguments);
        }
        if (this._itemInfoWindow && (!this._actorWindow.active || !this._actorWindow.visible)) {
            this._itemInfoWindow.show();
        }
    };

    Scene_Item.prototype.setWindowOpacity = function() {
        if (!params.HelpWindowVisible) {
            this._helpWindow.opacity = 0;
        }
        if (!params.CategoryWindowVisible) {
            this._categoryWindow.opacity = 0;
        }
        if (!params.ItemWindowVisible) {
            this._itemWindow.opacity = 0;
        }
        if (!params.ActorWindowVisible) {
            this._actorWindow.opacity = 0;
        }
        if (this._itemInfoWindow && !params.ItemInfoWindowVisible) {
            this._itemInfoWindow.opacity = 0;
        }
    };

    const _Scene_Item_createBackground = Scene_Item.prototype.createBackground;
    Scene_Item.prototype.createBackground = function() {
        _Scene_Item_createBackground.apply(this, arguments);
        if (params.BackGroundImg) {
            const bitmap = ImageManager.nuun_LoadPictures(params.BackGroundImg);
            const sprite = new Sprite(bitmap);
            this.addChild(sprite);
            bitmap.addLoadListener(function() {
                this.setBackGround(sprite);
            }.bind(this));
        }
    };

    Scene_Item.prototype.setBackGround = function(sprite) {
        if (params.BackUiWidth) {
            sprite.x = (Graphics.width - (Graphics.boxWidth + 8)) / 2;
            sprite.y = (Graphics.height - (Graphics.boxHeight + 8)) / 2;
            sprite.scale.x = (Graphics.boxWidth + 8 !== sprite.bitmap.width ? (Graphics.boxWidth + 8) / sprite.bitmap.width : 1);
            sprite.scale.y = (Graphics.boxHeight + 8 !== sprite.bitmap.height ? (Graphics.boxHeight + 8) / sprite.bitmap.height : 1);
        } else {
            sprite.scale.x = (Graphics.width !== sprite.bitmap.width ? Graphics.width / sprite.bitmap.width : 1);
            sprite.scale.y = (Graphics.height !== sprite.bitmap.height ? Graphics.height / sprite.bitmap.height : 1);
        }
    };

    const _Scene_Item_update = Scene_Item.prototype.update;
    Scene_Item.prototype.update = function() {
        _Scene_Item_update.apply(this, arguments);
    };

    Window_Selectable.prototype.setItemInfoWindow = function(_window) {
        this._itemInfoWindow = _window;
    };

    Window_Selectable.prototype.setInfoWindowItem = function(item) {
        if (this._itemInfoWindow) {
            this._itemInfoWindow.setItem(item);
        }
    };

    Window_ItemCategory.prototype.maxCols = function() {
        return params.CategoryWindowCols;
    };


    Window_ItemList.prototype.maxCols = function() {
        return params.ItemWindowCols;
    };

    const _Window_Selectable_updateHelp = Window_Selectable.prototype.updateHelp;
    Window_Selectable.prototype.updateHelp = function() {
        _Window_Selectable_updateHelp.apply(this, arguments);
        this.setInfoWindowItem(null);
    };

    const _Window_ItemList_updateHelp = Window_ItemList.prototype.updateHelp;
    Window_ItemList.prototype.updateHelp = function() {
        _Window_ItemList_updateHelp.apply(this, arguments);
        this.setInfoWindowItem(this.item());
    };


    function Window_ItemMenuActor() {
        this.initialize(...arguments);
    }
    
    Window_ItemMenuActor.prototype = Object.create(Window_MenuActor.prototype);
    Window_ItemMenuActor.prototype.constructor = Window_ItemMenuActor;
    
    Window_ItemMenuActor.prototype.initialize = function(rect) {
        this._contentsData = [];
        this.createData();
        Window_MenuActor.prototype.initialize.call(this, rect);
        if (params.ShowActorWindow) {
            this.show();
        }
    };

    Window_ItemMenuActor.prototype.maxCols = function() {
        return params.ActorWindowCols;
    };

    Window_ItemMenuActor.prototype.numVisibleRows = function() {
        return params.ActorWindowRows;
    };

    Window_ItemMenuActor.prototype.createData = function() {
        $gameParty.members().forEach((member, index) => {
            this._contentsData[index] = new Nuun_DrawMenuActorListData(this, params);
        });
    };

    Window_ItemMenuActor.prototype.drawItemBackground = function(index) {
        if (this._contentsData[index].drawItemBackground(index)) {
            Window_Selectable.prototype.drawItemBackground.apply(this, arguments);
        }
    };

    Window_ItemMenuActor.prototype.drawItem = function(index) {
        this._contentsData[index].drawItemContents(index);
    };

    Window_ItemMenuActor.prototype.defaultGraphicMode = function() {
        return 'face';
    };

    Window_ItemMenuActor.prototype.isSubMemberOpacity = function(actor) {
        return params.SubMemberOpacity ? actor.isBattleMember() : true;
    };

    Window_ItemMenuActor.prototype.setupActorImg = function() {
        $gameParty.members().forEach((member, index) => {
            this._contentsData[index].imgSetup(member);
        });
    };


    function Window_ItemInfo() {
        this.initialize(...arguments);
    }
    
    Window_ItemInfo.prototype = Object.create(Window_StatusBase.prototype);
    Window_ItemInfo.prototype.constructor = Window_ItemInfo;
    
    Window_ItemInfo.prototype.initialize = function(rect) {
        this._contentsData = new Nuun_DrawItemInfoListData(this, params);
        Window_StatusBase.prototype.initialize.call(this, rect);
    };

    Window_ItemInfo.prototype.itemHeight = function() {
        return this.innerHeight;
    };

    Window_ItemInfo.prototype.setItem = function(item) {
        this._contentsData.setItem(item);
        this.refresh();
    };

    Window_ItemInfo.prototype.refresh = function() {
        this.contents.clear();
        this._contentsData.refresh();
    };

    class Nuun_DrawMenuActorListData extends Nuun_DrawListData {
        constructor(_window, params) {
            super(_window, params);
        }

        nuun_MaxContentsCols() {
            return 1;
        }

        getStatusParamsList() {
            return params.StatusList;
        }

        getActorsSettingList() {
            return params.ActorsImgList;
        }
    };

    function isStatusList() {
        return params.StatusList && params.StatusList.length > 0;
    };

    class Nuun_DrawItemInfoListData extends Nuun_DrawListData {
        constructor(_window, params) {
            super(_window, params);
            this._item = null;
        }

        nuun_MaxContentsCols() {
            return 1;
        }

        getStatusParamsList() {
            return params.ItemInfoList;
        }

        setItem(item) {
            this._item = item;
            this.itemSetList(item);
        }

        itemSetList(item) {
            const id = item && item.meta.ItemParamListId && Number(item.meta.ItemParamListId) > 0 ? Number(item.meta.ItemParamListId) - 1 : 0
            try {
                if (DataManager.isItem(item)) {
                    this.setList(params.ItemInfoParamList[id].ItemInfoParams);
                } else if (DataManager.isWeapon(item)) {
                    this.setList(params.WeaponInfoParamList[id].WeaponInfoParams);
                } else if (DataManager.isArmor(item)) {
                    this.setList(params.ArmorInfoParamList[id].ArmorInfoParams);
                }
            } catch (error) {
                const log = ($gameSystem.isJapanese() ? "パラメータが設定されていません。" : "Parameter not set.");
                throw ["ParameterError", log];
            }
        }

        refresh() {
            this.drawStatusContents(this._item)
        }

        drawItemImg(actor, index) {
            
        }

        nuun_IsContents(data, item) {
            if (!!data.Conditions) {
                return eval(data.Conditions);
            }
            return true;
        }

        nuun_DrawContentsItemName(data, x, y, width, item) {
            const w = this._window;
            const icon = data.Icon && data.Icon > 0 ? data.Icon : item.iconIndex;
            const iconY = y + (w.lineHeight() - ImageManager.iconHeight) / 2 + (data.IconY || 0);
            const textMargin = ImageManager.iconWidth + 4;
            const itemWidth = Math.max(0, width - textMargin);
            w.changeTextColor(NuunManager.getColorCode(data.NameColor));
            w.drawIcon(icon, x, iconY);
            w.drawText(item.name, x + textMargin, y, itemWidth, data.Align);
        }

        nuun_DrawContentsPrice(data, x, y, width, item) {
            const w = this._window;
            const padding = w.itemPadding();
            if (data.Back) {
                w.drawContentsBackground(x, y, width);
                x = this.contensX(x);
                width = this.contensWidth(width);
            }
            if (data.Icon && data.Icon > 0) {
                w.drawIcon(data.Icon, x, y + (data.IconY || 0));
                const iconWidth = ImageManager.iconWidth + 4;
                x += iconWidth;
                width -= iconWidth;
            }
            w.changeTextColor(NuunManager.getColorCode(data.NameColor));
            const nameText = data.ParamName ? data.ParamName : (this.language_Jp ? "価格" : "Price");
            w.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
            this.nuun_SetContentsFontFace(data);
            const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? w.textWidth(nameText) : this.nuun_SystemWidth(data.SystemItemWidth, width);
            w.drawText(nameText, x, y, textWidth);
            w.resetTextColor();
            this.nuun_SetContentsValueFontFace(data);
            const textParam = (data.DetaEval ? eval(data.DetaEval) : item.price);
            w.nuun_DrawContentsParamUnitText(textParam, data, x + textWidth + padding, y, width - (textWidth + padding));
        }

        nuun_DrawContentsConsumption(data, x, y, width, item) {
            const w = this._window;
            const padding = w.itemPadding();
            if (data.Back) {
                w.drawContentsBackground(x, y, width);
                x = this.contensX(x);
                width = this.contensWidth(width);
            }
            if (data.Icon && data.Icon > 0) {
                w.drawIcon(data.Icon, x, y + (data.IconY || 0));
                const iconWidth = ImageManager.iconWidth + 4;
                x += iconWidth;
                width -= iconWidth;
            }
            w.changeTextColor(NuunManager.getColorCode(data.NameColor));
            const nameText = data.ParamName ? data.ParamName : (this.language_Jp ? "消耗" : "Consumption");
            w.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
            this.nuun_SetContentsFontFace(data);
            const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? w.textWidth(nameText) : this.nuun_SystemWidth(data.SystemItemWidth, width);
            w.drawText(nameText, x, y, textWidth);
            w.resetTextColor();
            this.nuun_SetContentsValueFontFace(data);
            const textParam = (data.DetaEval ? eval(data.DetaEval) : this.consumableText(item));
            w.drawText(textParam, x + textWidth + padding, y, width - (textWidth + padding), data.Align);
        }

        nuun_DrawContentsNum(data, x, y, width, item) {
            const w = this._window;
            const padding = w.itemPadding();
            if (data.Back) {
                w.drawContentsBackground(x, y, width);
                x = this.contensX(x);
                width = this.contensWidth(width);
            }
            if (data.Icon && data.Icon > 0) {
                w.drawIcon(data.Icon, x, y + (data.IconY || 0));
                const iconWidth = ImageManager.iconWidth + 4;
                x += iconWidth;
                width -= iconWidth;
            }
            w.changeTextColor(NuunManager.getColorCode(data.NameColor));
            const nameText = data.ParamName ? data.ParamName : (this.language_Jp ? "所持数" : "Num");
            w.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
            this.nuun_SetContentsFontFace(data);
            const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? w.textWidth(nameText) : this.nuun_SystemWidth(data.SystemItemWidth, width);
            w.drawText(nameText, x, y, textWidth);
            w.resetTextColor();
            this.nuun_SetContentsValueFontFace(data);
            const textParam = (data.DetaEval ? eval(data.DetaEval) : $gameParty.numItems(item));
            w.nuun_DrawContentsParamUnitText(textParam, data, x + textWidth + padding, y, width - (textWidth + padding));
        }

        nuun_DrawContentsMaxNum(data, x, y, width, item) {
            const w = this._window;
            const padding = w.itemPadding();
            if (data.Back) {
                w.drawContentsBackground(x, y, width);
                x = this.contensX(x);
                width = this.contensWidth(width);
            }
            if (data.Icon && data.Icon > 0) {
                w.drawIcon(data.Icon, x, y + (data.IconY || 0));
                const iconWidth = ImageManager.iconWidth + 4;
                x += iconWidth;
                width -= iconWidth;
            }
            w.changeTextColor(NuunManager.getColorCode(data.NameColor));
            const nameText = data.ParamName ? data.ParamName : (this.language_Jp ? "最大所持数" : "Max Num");
            w.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
            this.nuun_SetContentsFontFace(data);
            const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? w.textWidth(nameText) : this.nuun_SystemWidth(data.SystemItemWidth, width);
            w.drawText(nameText, x, y, textWidth);
            w.resetTextColor();
            this.nuun_SetContentsValueFontFace(data);
            const textParam = (data.DetaEval ? eval(data.DetaEval) : $gameParty.maxItems(item));
            w.nuun_DrawContentsParamUnitText(textParam, data, x + textWidth + padding, y, width - (textWidth + padding));
        }

        nuun_DrawContentsOccasion(data, x, y, width, item) {
            const w = this._window;
            const padding = w.itemPadding();
            if (data.Back) {
                w.drawContentsBackground(x, y, width);
                x = this.contensX(x);
                width = this.contensWidth(width);
            }
            if (data.Icon && data.Icon > 0) {
                w.drawIcon(data.Icon, x, y + (data.IconY || 0));
                const iconWidth = ImageManager.iconWidth + 4;
                x += iconWidth;
                width -= iconWidth;
            }
            w.changeTextColor(NuunManager.getColorCode(data.NameColor));
            const nameText = data.ParamName ? data.ParamName : (this.language_Jp ? "使用可能時" : "Occasion");
            w.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
            this.nuun_SetContentsFontFace(data);
            const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? w.textWidth(nameText) : this.nuun_SystemWidth(data.SystemItemWidth, width);
            w.drawText(nameText, x, y, textWidth);
            w.resetTextColor();
            this.nuun_SetContentsValueFontFace(data);
            const textParam = (data.DetaEval ? eval(data.DetaEval) : this.useItemOccasionName(item));
            w.drawText(textParam, x + textWidth + padding, y, width - (textWidth + padding), data.Align);
        }

        nuun_DrawContentsSpeed(data, x, y, width, item) {
            const w = this._window;
            const padding = w.itemPadding();
            if (data.Back) {
                w.drawContentsBackground(x, y, width);
                x = this.contensX(x);
                width = this.contensWidth(width);
            }
            if (data.Icon && data.Icon > 0) {
                w.drawIcon(data.Icon, x, y + (data.IconY || 0));
                const iconWidth = ImageManager.iconWidth + 4;
                x += iconWidth;
                width -= iconWidth;
            }
            w.changeTextColor(NuunManager.getColorCode(data.NameColor));
            const nameText = data.ParamName ? data.ParamName : (this.language_Jp ? "速度補正" : "Speed");
            w.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
            this.nuun_SetContentsFontFace(data);
            const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? w.textWidth(nameText) : this.nuun_SystemWidth(data.SystemItemWidth, width);
            w.drawText(nameText, x, y, textWidth);
            w.resetTextColor();
            this.nuun_SetContentsValueFontFace(data);
            const textParam = (data.DetaEval ? eval(data.DetaEval) : item.speed);
            w.nuun_DrawContentsParamUnitText(textParam, data, x + textWidth + padding, y, width - (textWidth + padding));
        }

        nuun_DrawContentsSuccess(data, x, y, width, item) {
            const w = this._window;
            const padding = w.itemPadding();
            if (data.Back) {
                w.drawContentsBackground(x, y, width);
                x = this.contensX(x);
                width = this.contensWidth(width);
            }
            if (data.Icon && data.Icon > 0) {
                w.drawIcon(data.Icon, x, y + (data.IconY || 0));
                const iconWidth = ImageManager.iconWidth + 4;
                x += iconWidth;
                width -= iconWidth;
            }
            w.changeTextColor(NuunManager.getColorCode(data.NameColor));
            const nameText = data.ParamName ? data.ParamName : (this.language_Jp ? "成功率" : "Success Rate");
            w.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
            this.nuun_SetContentsFontFace(data);
            const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? w.textWidth(nameText) : this.nuun_SystemWidth(data.SystemItemWidth, width);
            w.drawText(nameText, x, y, textWidth);
            w.resetTextColor();
            this.nuun_SetContentsValueFontFace(data);
            const textParam = (data.DetaEval ? eval(data.DetaEval) : item.successRate);
            w.nuun_DrawContentsParamUnitText(textParam, data, x + textWidth + padding, y, width - (textWidth + padding));
        }

        nuun_DrawContentsOrgParam(data, x, y, width, item) {
            const w = this._window;
            w.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
            if (data.Back) {
                w.drawContentsBackground(x, y, width);
                x = this.contensX(x);
                width = this.contensWidth(width);
            }
            if (data.Icon && data.Icon > 0) {
                w.drawIcon(data.Icon, x, y + (data.IconY || 0));
                const iconWidth = ImageManager.iconWidth + 4;
                x += iconWidth;
                width -= iconWidth;
            }
            w.changeTextColor(NuunManager.getColorCode(data.NameColor));
            this.nuun_SetContentsFontFace(data);
            const nameText = data.ParamName ? data.ParamName : '';
            const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? w.textWidth(nameText) : this.nuun_SystemWidth(data.SystemItemWidth, width);
            w.drawText(nameText, x, y, textWidth);
            w.resetTextColor();
            if (data.DetaEval) {
                this.nuun_SetContentsValueFontFace(data);
                const padding = textWidth > 0 ? w.itemPadding() : 0;
                const textParam = this.getStatusEvalParam(param, actor);
                if (isNaN(textParam)) {
                    w.nuun_DrawContentsParamUnitText(textParam, data, x + textWidth + padding, y, width - (textWidth + padding));
                } else {
                    const value = NuunManager.numPercentage(textParam, (data.Decimal - 2) || 0, true);
                    w.nuun_DrawContentsParamUnitText(value, data, x + textWidth + padding, y, width - (textWidth + padding));
                }   
            }
        }

        nuun_DrawParams(data, param, x, y, width, item) {
            const w = this._window;
            const padding = w.itemPadding();
            if (data.Back) {
                w.drawContentsBackground(x, y, width);
                x = this.contensX(x);
                width = this.contensWidth(width);
            }
            if (data.Icon && data.Icon > 0) {
                w.drawIcon(data.Icon, x, y + (data.IconY || 0));
                const iconWidth = ImageManager.iconWidth + 4;
                x += iconWidth;
                width -= iconWidth;
            }
            w.changeTextColor(NuunManager.getColorCode(data.NameColor));
            const nameText = this.nuun_ParamNameData(data, param);
            w.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
            this.nuun_SetContentsFontFace(data);
            const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? w.textWidth(nameText) : this.nuun_SystemWidth(data.SystemItemWidth, width);
            w.drawText(nameText, x, y, textWidth);
            w.resetTextColor();
            this.nuun_SetContentsValueFontFace(data);
            const textParam = (data.DetaEval ? eval(data.DetaEval) : item.params[param]);
            w.nuun_DrawContentsParamUnitText(textParam, data, x + textWidth + padding, y, width - (textWidth + padding));
        }

        nuun_DrawContentsType(data, x, y, width, item) {
            const w = this._window;
            const padding = w.itemPadding();
            if (data.Back) {
                w.drawContentsBackground(x, y, width);
                x = this.contensX(x);
                width = this.contensWidth(width);
            }
            if (data.Icon && data.Icon > 0) {
                w.drawIcon(data.Icon, x, y + (data.IconY || 0));
                const iconWidth = ImageManager.iconWidth + 4;
                x += iconWidth;
                width -= iconWidth;
            }
            w.changeTextColor(NuunManager.getColorCode(data.NameColor));
            const nameText = data.ParamName ? data.ParamName : this.getTypeText(item);
            w.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
            this.nuun_SetContentsFontFace(data);
            const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? w.textWidth(nameText) : this.nuun_SystemWidth(data.SystemItemWidth, width);
            w.drawText(nameText, x, y, textWidth);
            w.resetTextColor();
            this.nuun_SetContentsValueFontFace(data);
            const textParam = (data.DetaEval ? eval(data.DetaEval) : this.typeIdText(item));
            w.drawText(textParam, x + textWidth + padding, y, width - (textWidth + padding), data.Align);
        }

        nuun_DrawContentsEquipType(data, x, y, width, item) {
            const w = this._window;
            const padding = w.itemPadding();
            if (data.Back) {
                w.drawContentsBackground(x, y, width);
                x = this.contensX(x);
                width = this.contensWidth(width);
            }
            if (data.Icon && data.Icon > 0) {
                w.drawIcon(data.Icon, x, y + (data.IconY || 0));
                const iconWidth = ImageManager.iconWidth + 4;
                x += iconWidth;
                width -= iconWidth;
            }
            w.changeTextColor(NuunManager.getColorCode(data.NameColor));
            const nameText = data.ParamName ? data.ParamName : (this.language_Jp ? "装備タイプ" : "Equip Type");
            w.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
            this.nuun_SetContentsFontFace(data);
            const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? w.textWidth(nameText) : this.nuun_SystemWidth(data.SystemItemWidth, width);
            w.drawText(nameText, x, y, textWidth);
            w.resetTextColor();
            this.nuun_SetContentsValueFontFace(data);
            const textParam = (data.DetaEval ? eval(data.DetaEval) : this.equipTypeIdText(item));
            w.drawText(textParam, x + textWidth + padding, y, width - (textWidth + padding), data.Align);
        }

        nuun_DrawContentsConsumptionRate(data, x, y, width, item) {
            const w = this._window;
            const padding = w.itemPadding();
            if (data.Back) {
                w.drawContentsBackground(x, y, width);
                x = this.contensX(x);
                width = this.contensWidth(width);
            }
            if (data.Icon && data.Icon > 0) {
                w.drawIcon(data.Icon, x, y + (data.IconY || 0));
                const iconWidth = ImageManager.iconWidth + 4;
                x += iconWidth;
                width -= iconWidth;
            }
            w.changeTextColor(NuunManager.getColorCode(data.NameColor));
            const nameText = data.ParamName ? data.ParamName : (this.language_Jp ? "消耗率" : "Consumption Rate");
            w.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
            this.nuun_SetContentsFontFace(data);
            const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? w.textWidth(nameText) : this.nuun_SystemWidth(data.SystemItemWidth, width);
            w.drawText(nameText, x, y, textWidth);
            w.resetTextColor();
            this.nuun_SetContentsValueFontFace(data);
            const textParam = (data.DetaEval ? eval(data.DetaEval) : this.consumptionRateText(item));
            w.nuun_DrawContentsParamUnitText(textParam, data, x + textWidth + padding, y, width - (textWidth + padding));
        }

        getObject(item) {
            return item;
        }

        useItemOccasionName(item) {
            const occasion = item.occasion;
            if (occasion === 0) {
                return this.language_Jp ? "常時" : "Always";
            } else if (occasion === 1) {
                return this.language_Jp ? "戦闘時" : "Battle Screen";
            } else if (occasion === 2) {
                return this.language_Jp ? "移動時" : "Menu Screen";
            } else {
                return this.language_Jp ? "使用不可" : "Never";
            }
        }

        consumableText(item) {
            if (item.consumable) {
                return this.language_Jp ? "消耗" : "Consumable";
            } else {
                return this.language_Jp ? "消耗なし" : "Not consumable";
            }
        }

        getTypeText(item) {
            if (DataManager.isWeapon(item)) {
                return this.language_Jp ? "武器タイプ" : "Weapon Type";
            } else if (DataManager.isArmor(item)) {
                return this.language_Jp ? "防具タイプ" : "Armor Type";
            }
        }

        equipTypeIdText(item) {
            return $dataSystem.equipTypes[item.etypeId];
        }

        typeIdText(item) {
            if (DataManager.isWeapon(item)) {
                return $dataSystem.weaponTypes[item.wtypeId]
            } else if (DataManager.isArmor(item)) {
                return $dataSystem.armorTypes[item.atypeId]
            }
        }

        consumptionRateText(item) {
            if (item.consumable) {
                return item.meta.ConsumptionRate || 100;
            } else {
                return 0;
            }
        }

    };

    function isStatusList() {
        return params.StatusList && params.StatusList.length > 0;
    };
    
})();