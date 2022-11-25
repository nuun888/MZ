/*:-----------------------------------------------------------------------------------
 * NUUN_MenuScreen_default.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Menu screen EX Default type
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_MenuScreenEXBase
 * @orderAfter NUUN_Base
 * @version 2.0.0
 * 
 * @help
 * Change and extend the menu screen display.
 * 
 * Disable UI Window Criteria
 * Displays the display reference position of the window based on the screen. If it is OFF, it will be the default display.
 * 
 * Menu command display mode
 * Specifies the display position of the menu command.
 * 
 * Placement mode
 * Displays the layout of the menu status window according to the mode set in the menu command display mode.
 * Display to the right of the menu command if the menu command display mode is 'left'.
 * 'right' displays to the left of menu commands.
 * 'top' displays below menu commands.
 * 'under' displays above menu commands.
 * In case of 'free', it is displayed on the upper left basis (UI window basis invalid basis).
 *  
 * This plug-in supports "NUUN_ActorPicture".
 * The standing picture will be displayed even if you do not set it in "NUUN_ActorPicture settings".
 * By turning off "Apply NUUN_ActorPicture", the standing picture setting of this plug-in will be applied even when standing picture and face graphic display EX are installed.
 * Actor face graphics, standing pictures, and character chips can be set with the actor image base X coordinate and actor image base Y coordinate.
 * Also, when setting individually, set the image X coordinate and image Y coordinate of each actor image setting.
 * If you want to display the part of the image where the actor is displayed in the center, set the image display start coordinate X and image display start coordinate Y in each "Actor image setting".
 * 
 * Get Display Status Parameter
 * actor:Actor game data
 * 
 * Original gauge
 * Current value: set by evaluation formula
 * Max value: set by maximum value evaluation formula
 * Gauge Width: Set by Item, Gauge Width
 * Be sure to set the gauge identification ID. Enter any string for the ID. Please be careful not to duplicate.
 * 
 * background image
 * The ID is set in the map's tag or plugin command.
 * Map settings Note field
 * <MenuBackgroundId:[id]> Displays the image of the background image list [id] number for the menu background.
 * <MenuBackground:[url]> Displays the image of [url] as the menu background. The path is img/[url].png.
 * Example：<MenuBackground:titles1/Bigtree>
 * Note that the background set in the plugin parameter takes precedence over the above tag. When 0 is specified, the default background is displayed.
 * Please replace [id] and [url] of the tag with numbers or strings.
 * 
 * background image 2
 * It is superimposed in front of background image 1 and displayed.
 * Use it as background for menu UI.
 * If background image 1 is not changed during the game, setting the menu background to background image 2 is no problem.
 * 
 * Remarks
 * *1
 * You can specify the state you want to display in the state evaluation expression of the actor status display item. (Direct entry)
 * Specify the state IDs to be displayed separated by , .
 * Example
 * "1,5,11" Always enclose with ' or "
 * "1-10" State display from ID 1 to 10
 * "3-11,15"Displays state IDs 3 to 11 and 15
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 11/25/2022 Ver.2.0.0
 * Separate files for configuration and processing.
 * Added the ability to specify the coordinates and size of the menu command window, menu status window, and menu info window.
 * Changed the specification of how to set the menu info window.
 * 9/10/2022 Ver.1.4.1
 * Fixed the problem that the info window scrolls when the line is specified as one line.
 * 8/27/2022 Ver.1.4.0
 * Added a function that can display any image in the actor status.
 * Fixed the gauge to fit within the actor's display range.
 * 8/22/2022 Ver.1.3.2
 * Fixed the problem that the font size of the item changed after changing the font size in the text code.
 * 7/23/2022 Ver.1.3.1
 * Added the ability to specify the range of display states of states.
 * 7/23/2022 Ver.1.3.0
 * Added a function to display only the states for which you want to display state icons.
 * Added a function to display the state displayed in the battle status on the menu screen.
 * Fixed the problem that the decimal point was ignored when displaying the % of experience value.
 * 7/4/2022 Ver.1.2.4
 * Fixed so that the font size of info can be set for each item.
 * Added processing by supporting "NUUN_Chaptern" plug-in.
 * 6/10/2022 Ver.1.2.3
 * Fixed the problem that the parameter is shifted to the right if the name is not entered in the status unique parameter.
 * 6/7/2022 Ver.1.2.2
 * Conflict measures in some plugins.
 * 6/5/2022 Ver.1.2.1
 * Fixed an issue where the coordinates of the name of the original parameter of the status were not applied correctly.
 * 6/4/2022 Ver.1.2.0
 * Added a function that can display the action goal. (NUUN_Destination required)
 * 5/29/2022 Ver.1.1.1
 * Added the ability to change the background for each map.
 * Added plugin command to change background image.
 * Changed the background image to a two-layer structure.
 * 5/28/2022 Ver.1.1.0
 * Added the ability to add your own gauges to the stats that can be displayed.
 * Added a function to display the height of the menu command window by the number of commands (MV display).
 * 5/22/2022 Ver.1.0.1
 * Fixed an issue where the original parameters of stats were not applied.
 * Added experience value (no gauge) to status.
 * 5/17/2022 Ver.1.0.0
 * First edition.
 * 
 * @command ChangeBackgroundId
 * @desc Change the background image ID of the menu screen. 0 will show the default background.
 * @text Change background image ID
 * 
 * @arg backgroundId
 * @type number
 * @default 0
 * @text Background image list ID
 * @desc Specifies the background image list. 0 will show the default image.
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
 * @param WindowUiIgnore
 * @text Disable UI Window Criteria
 * @desc Make window placement relative to the screen instead of UI relative.
 * @type boolean
 * @default false
 * @parent Setting
 * 
 * @param BackGroundSetting
 * @text Background setting
 * @default ------------------------------
 * 
 * @param BackGroundImges
 * @desc Specifies the background image file name.
 * @text background image
 * @type file[]
 * @dir img/
 * @default 
 * @parent BackGroundSetting
 * 
 * @param BackUiWidth1
 * @text Match background image 1 UI
 * @desc Match the background size of background image 1 to the UI.
 * @type boolean
 * @default true
 * @parent BackGroundSetting
 * 
 * @param BackGroundImg
 * @desc Specify the background image file name to be displayed in front of background image 1.
 * @text background image 2
 * @type file
 * @dir img/
 * @default 
 * @parent BackGroundSetting
 * 
 * @param BackUiWidth
 * @text Match background image 2 UI
 * @desc Match the background size of background image 2 to the UI.
 * @type boolean
 * @default true
 * @parent BackGroundSetting
 * 
 * @param MenuCommandSetting
 * @text Menu command setting
 * @default ------------------------------
 * 
 * @param MenuCommandCols
 * @text Display Col for Menu Commands
 * @desc Col to display for menu commands.
 * @type number
 * @default 1
 * @min 1
 * @parent MenuCommandSetting
 * 
 * @param MenuCommandRows
 * @text Display Row for Menu Commands
 * @desc Row to display for menu commands. 0 for the number of menu commands displayed in the vertical width
 * @type number
 * @default 0
 * @min 0
 * @parent MenuCommandSetting
 * 
 * @param MenuCommandX
 * @text Menu command X coordinate
 * @desc X coordinate of menu command.
 * @type number
 * @default 0
 * @min -9999
 * @parent MenuCommandSetting
 * 
 * @param MenuCommandY
 * @desc Y coordinate for menu commands.
 * @text Menu command Y coordinate
 * @type number
 * @default 0
 * @min -9999
 * @parent MenuCommandSetting
 * 
 * @param MenuCommandWidth
 * @text Menu command width
 * @desc Width of the menu command window.
 * @type number
 * @default 240
 * @min 0
 * @parent MenuCommandSetting
 * 
 * @param MenuCommandHeight
 * @text Menu command vertical width
 * @desc Height of the menu command window. 0 for main area height
 * @type number
 * @default 504
 * @min 0
 * @parent MenuCommandSetting
 * 
 * @param MenuCommandPosition
 * @desc Specifies the display mode for menu commands.
 * @text Menu command display mode
 * @type select
 * @option None
 * @value 'free'
 * @option Left
 * @value 'left'
 * @option Right
 * @value 'right'
 * @option On screen
 * @value 'top'
 * @option Bottom of screen
 * @value 'under'
 * @default 'right'
 * @parent MenuCommandSetting
 * 
 * @param CommandHeightMode
 * @text Window height mode
 * @desc Fits the height of the menu command window to the number of commands.
 * @type boolean
 * @default false
 * @parent MenuCommandSetting
 * 
 * @param CommandWindowVisible
 * @text Command window display
 * @desc Show window.
 * @type boolean
 * @default true
 * @parent MenuCommandSetting
 * 
 * @param StatusSetting
 * @text Menu status setting
 * @default ------------------------------
 * 
 * @param StatusList
 * @desc Status item setting.
 * @text Status item setting
 * @type struct<StatusListData>[]
 * @default ["{\"DateSelect\":\"1\",\"NameColor\":\"16\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"180\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"168\",\"SystemItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"FontSize\":\"0\"}","{\"DateSelect\":\"4\",\"NameColor\":\"16\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"180\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"132\",\"SystemItemWidth\":\"48\",\"Align\":\"'right'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"FontSize\":\"0\"}","{\"DateSelect\":\"5\",\"NameColor\":\"16\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"3\",\"X_Coordinate\":\"180\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"FontSize\":\"0\"}","{\"DateSelect\":\"3\",\"NameColor\":\"16\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"360\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"168\",\"SystemItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"FontSize\":\"0\"}","{\"DateSelect\":\"11\",\"NameColor\":\"16\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"360\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"FontSize\":\"0\"}","{\"DateSelect\":\"12\",\"NameColor\":\"16\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"360\",\"Y_Coordinate\":\"24\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"FontSize\":\"0\"}","{\"DateSelect\":\"13\",\"NameColor\":\"16\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"360\",\"Y_Coordinate\":\"48\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"FontSize\":\"0\"}"]
 * @parent StatusSetting
 * 
 * @param MenuCols
 * @text Actor display col
 * @desc Col to display for the actor.
 * @type number
 * @default 1
 * @min 1
 * @parent StatusSetting
 * 
 * @param MenuRows
 * @text Actor Display Row
 * @desc Row to display for the actor.
 * @type number
 * @default 4
 * @min 1
 * @parent StatusSetting
 * 
 * @param MenuStatusX
 * @text Menu status X coordinate
 * @desc X coordinate of menu status.
 * @type number
 * @default 0
 * @min -9999
 * @parent StatusSetting
 * 
 * @param MenuStatusY
 * @desc Y coordinate of menu status
 * @text Menu status Y coordinate.
 * @type number
 * @default 0
 * @min -9999
 * @parent StatusSetting
 * 
 * @param MenuStatusWidth
 * @desc Width of menu status.
 * @text Menu status width
 * @type number
 * @default 0
 * @min 0
 * @parent StatusSetting
 * 
 * @param MenuStatusHeight
 * @desc Vertical width of the menu status.
 * @text Menu status vertical width
 * @type number
 * @default 0
 * @min 0
 * @parent StatusSetting
 * 
 * @param ArrangementMode
 * @text Placement mode
 * @desc Placement mode.
 * @type select
 * @option None
 * @value 0
 * @option Positional reference for menu commands
 * @value 1
 * @default 1
 * @parent StatusSetting
 * 
 * @param WindowVisible
 * @text Menu status window display
 * @desc Show window.
 * @type boolean
 * @default true
 * @parent StatusSetting
 * 
 * @param GaugeSetting
 * @text Gauge setting
 * @default ------------------------------
 * @parent StatusSetting
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
 * @parent StatusSetting
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
 * @type number
 * @default 17
 * @min 0
 * @parent ExpgaugeSetting
 * 
 * @param ExpGaugeColor2
 * @desc Exp gauge system color ID2 (right)
 * @text Exp value gauge color 2
 * @type number
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
 * @param InfoSetting
 * @text Menu info setting
 * @default ------------------------------
 * 
 * @param MenuInfoWindowSetting
 * @desc Info item settings
 * @text Info item settings
 * @type struct<InfoWindowList>[]
 * @default ["{\"MethodName\":\"money\",\"ListDateSetting\":\"1\",\"X_Position\":\"568\",\"Y_Position\":\"504\",\"Width\":\"240\",\"Height\":\"0\",\"InfoCols\":\"1\",\"InfoRows\":\"1\",\"InfoFontSize\":\"0\",\"WindowVisible\":\"true\"}"]
 * @parent InfoSetting
 * 
 * @param HelpList
 * @desc Command help item setting.
 * @text Command help item setting
 * @type struct<HelpListData>[]
 * @default ["{\"HelpCommandName\":\"'Item'\",\"HelpCommandText\":\"Display the items you have.\"}","{\"HelpCommandName\":\"'Skill'\",\"HelpCommandText\":\"Displays the skills you have learned.\"}","{\"HelpCommandName\":\"'Equip'\",\"HelpCommandText\":\"Change equip.\"}","{\"HelpCommandName\":\"'Status'\",\"HelpCommandText\":\"Display the status of the actor.\"}","{\"HelpCommandName\":\"'Options'\",\"HelpCommandText\":\"Change game settings.\"}","{\"HelpCommandName\":\"'Party'\",\"HelpCommandText\":\"Change members.\"}","{\"HelpCommandName\":\"'Save'\",\"HelpCommandText\":\"Record data.\"}","{\"HelpCommandName\":\"'Game End'\",\"HelpCommandText\":\"Exit the game.\"}"]
 * @parent InfoSetting
 * 
 * @param ListData1_10
 * @text Display item setting1-10
 * @default ------------------------------
 * @parent InfoSetting
 * 
 * @param PageList1
 * @desc List to display.
 * @text Display list 1
 * @type struct<InfoListData>[]
 * @default ["{\"DateSelect\":\"2\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DataEval\":\"\",\"Align\":\"'right'\",\"InfoIcon\":\"0\",\"Text\":\"\",\"ContentsFontSize\":\"0\"}"]
 * @parent ListData1_10
 *  
 * @param PageList2
 * @desc List to display.
 * @text Display list 2
 * @type struct<InfoListData>[]
 * @default ["{\"DateSelect\":\"6\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DataEval\":\"\",\"Align\":\"'right'\",\"InfoIcon\":\"0\",\"Text\":\"\",\"ContentsFontSize\":\"0\"}"]
 * @parent ListData1_10
 * 
 * @param PageList3
 * @desc List to display.
 * @text Display list 3
 * @type struct<InfoListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList4
 * @desc List to display.
 * @text Display list 4
 * @type struct<InfoListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList5
 * @desc List to display.
 * @text Display list 5
 * @type struct<InfoListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList6
 * @desc List to display.
 * @text Display list 6
 * @type struct<InfoListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList7
 * @desc List to display.
 * @text Display list 7
 * @type struct<InfoListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList8
 * @desc List to display.
 * @text Display list 8
 * @type struct<InfoListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList9
 * @desc List to display.
 * @text Display list 9
 * @type struct<InfoListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList10
 * @desc List to display.
 * @text Display list 10
 * @type struct<InfoListData>[]
 * @default []
 * @parent ListData1_10
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
 * @param ActorPictureData
 * @text NUUN_ActorPicture settings
 * @desc Actor image settings in "NUUN_ActorPicture"
 * @default []
 * @type struct<ActorPictureDataList>[]
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
 * 
 */
/*~struct~HelpListData:
 * 
 * @param HelpCommandName
 * @text Command name
 * @desc Sets the command name. If it is not on the list, fill it in directly.
 * @type combo
 * @option 'Item'
 * @option 'Skill'
 * @option 'Equip'
 * @option 'Status'
 * @option 'Options'
 * @option 'Party'
 * @option 'Save'
 * @option 'Game End'
 * @default
 * 
 * @param HelpCommandText
 * @text Command description
 * @desc Sets the command description. Text code available.
 * @type string
 * @default 
 * 
 */
/*~struct~InfoWindowList:
 * 
 * @param MethodName
 * @desc Specifies the distinguished name of the window.
 * @text Identification name
 * @type string
 * @default
 *
 * @param ListDateSetting
 * @desc Specifies the list to display.
 * @text Display list specification
 * @type select
 * @option None
 * @value 0
 * @option Display list１
 * @value 1
 * @option Display list 2
 * @value 2
 * @option Display list 3
 * @value 3
 * @option Display list 4
 * @value 4
 * @option Display list 5
 * @value 5
 * @option Display list 6
 * @value 6
 * @option Display list 7
 * @value 7
 * @option Display list 8
 * @value 8
 * @option Display list 9
 * @value 9
 * @option Display list 10
 * @value 10
 * @default 0
 * 
 * @param X_Position
 * @text X-coordinate
 * @desc X coordinate
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Y_Position
 * @desc Y-coordinate
 * @text Y coordinate
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Width
 * @text Window width
 * @desc Window width.
 * @type number
 * @default 0
 * @min 0
 * 
 * @param Height
 * @text Window height
 * @desc window height.
 * @type number
 * @default 0
 * @min 0
 * 
 * @param InfoCols
 * @text Info display col
 * @desc Col to display for info.
 * @type number
 * @default 2
 * @min 1
 * 
 * @param InfoRows
 * @text Info display row
 * @desc The row to display for info. 0 for window height
 * @type number
 * @default 0
 * @min 0
 * 
 * @param InfoFontSize
 * @desc Font size (difference from main font)
 * @text Font size
 * @type number
 * @default 0
 * @min -99
 * 
 * @param WindowVisible
 * @text Show window
 * @desc Show window.
 * @type boolean
 * @default true
 * 
 * 
 */
/*~struct~StatusListData:
 *
 * @param DateSelect
 * @text status to display
 * @desc Specifies the status to display.
 * @type select
 * @option None
 * @value 0
 * @option Actor name(1)(3)(4)(5)(6)(7)(9)(13)
 * @value 1
 * @option Nickname(1)(3)(4)(5)(6)(7)(9)(13)
 * @value 2
 * @option Class(1)(3)(4)(5)(6)(7)(9)(13)
 * @value 3
 * @option Level(1)(3)(4)(5)(6)(7)(13)
 * @value 4
 * @option State(3)(4)(5)(6)(7)(10※1)
 * @value 5
 * @option State (same display as for battle)(3)(4)(5)(6)
 * @value 7
 * @option Original parameter(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)
 * @value 6
 * @option HP(3)(4)(5)(6)(7)(21)
 * @value 11
 * @option MP(3)(4)(5)(6)(7)(21)
 * @value 12
 * @option TP(3)(4)(5)(6)(7)(21)
 * @value 13
 * @option EXP(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)
 * @value 14
 * @option Exp (with gauge)(1)(2)(3)(4)(5)(6)(7)(21)
 * @value 15
 * @option ATK(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)
 * @value 22
 * @option DEF(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)
 * @value 23
 * @option MAT(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)
 * @value 24
 * @option MDF(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)
 * @value 25
 * @option AGI(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)
 * @value 26
 * @option LUK(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)
 * @value 27
 * @option Hit(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 30
 * @option Evasion(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 31
 * @option Critcal rate(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 32
 * @option Critcal evade(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 33
 * @option Magic evade(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 34
 * @option Magic reflect(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 35
 * @option Counter(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 36
 * @option HP regen(1)(2)(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 37
 * @option MP regen(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 38
 * @option TP regen(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 39
 * @option Aggro(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 40
 * @option Guard(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 41
 * @option Recovery(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 42
 * @option Item effect(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 43
 * @option MP cost(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 44
 * @option TP charge(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 45
 * @option Physical damage(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 46
 * @option Magical damage(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 47
 * @option Floor damage(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 48
 * @option Gain exp rate(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 49
 * @option Original gauge(3)(4)(5)(6)(7)(10)(20)(21)(22)(23)(24)
 * @value 100
 * @option Image(3)(4)(5)(6)(25)
 * @value 200
 * @option Character chip(3)(4)(5)(6)(25)
 * @value 300
 * @option SV Actor(3)(4)(5)(6)(25)
 * @value 301
 * @option Line(1)(2)(3)(4)(5)(6)(7)
 * @value 1000
 * @default 0
 * 
 * @param NameColor
 * @desc System color ID for system items. You can enter the color code in the text tab.
 * @text Name color(1)
 * @type number
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
 * @type number
 * @default 0
 * @min 0
 * @parent GaugeSetting
 * 
 * @param Color2
 * @desc Gauge system color ID (right). You can enter the color code in the text tab.
 * @text Gauge color (right)(24)
 * @type number
 * @default 0
 * @min 0
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
 */
/*~struct~InfoListData:
 *
 * @param DateSelect
 * @text Items to display
 * @desc Specifies the items to display.
 * @type select
 * @option None
 * @value 0
 * @option Play time(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)
 * @value 1
 * @option Money(1)(2)(3)(4)(5)(6)(7)(8)(11)
 * @value 2
 * @option Location(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)
 * @value 3
 * @option Original parameter(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)
 * @value 4
 * @option Name(1)(2)(3)(4)(5)(7)(8)(10)(11)
 * @value 5
 * @option Menu command description(1)(2)(3)(4)(5)(7)(8)
 * @value 6
 * @option Free text(1)(2)(3)(4)(12)
 * @value 10
 * @option Action target (NUUN_Destination required)(1)(2)(3)(4)(6)(7)(8)(11)
 * @value 11
 * @option Captor (NUUN_Chapter required)(1)(2)(3)(4)(6)(7)(8)(11)
 * @value 12
 * @default 0
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
 * @param NameColor
 * @desc System color ID for system items. You can enter the color code in the text tab.
 * @text Name color(7)
 * @type number
 * @default 16
 * @min 0
 * 
 * @param ParamName
 * @desc Set the item name.
 * @text Name(8)
 * @type string
 * @default
 * 
 * @param DataEval
 * @desc Evaluation formula.
 * @text Evaluation formul(javaScript)(9)
 * @type combo
 * @option '$gameParty.steps();//Step count'
 * @option '$gameSystem.battleCount();//Battle count'
 * @option '$gameSystem.escapeCount();//Escape count'
 * @option '$gameSystem.saveCount();//Save count'
 * @option '$gameVariables.value(0);//Game variable'
 * @option '$gameSystem.chronus().getDateFormat(1);//Chronus plugin datetime format 1'
 * @option '$gameSystem.chronus().getDateFormat(2);//Chronus plugin datetime format 2'
 * @default 
 * 
 * @param Align
 * @desc Align.
 * @text Align(10)
 * @type select
 * @option Left
 * @value 'left'
 * @option Right
 * @value 'right'
 * @option Center
 * @value 'center'
 * @default 'right'
 * 
 * @param InfoIcon
 * @text Icon ID(11)
 * @desc Icon ID
 * @type number
 * @default 0
 * @max 999999
 * @min 0
 * 
 * @param Text
 * @desc Enter the text for free text. (text code available)
 * @text Free text(12)
 * @type multiline_string
 * @default
 * 
 * @param ContentsFontSize
 * @desc Font size (difference from main font)
 * @text Font size(13)
 * @type number
 * @default 0
 * @min -99
 *
 */
/*~struct~actorImgList:
 * 
 * @param actorId
 * @text Actor
 * @desc Specifies an actor.
 * @type actor
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
 * @text Actor image
 * @desc Display the image of the actor. If you want to switch the standing picture, please set the image in the list. 
 * @type file
 * @dir img/
 * @default 
 * 
 * @param FaceImg
 * @text Face image
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
/*~struct~ActorPictureDataList:
 * 
 * @param actorId
 * @text Actor
 * @desc Specifies an actor.
 * @type actor
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
/*:ja
 * @target MZ
 * @plugindesc メニュー画面
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 2.0.0
 * 
 * @help
 * メニュー画面の表示を変更、拡張します。
 * 
 * UIウィンドウ基準無効
 * ウィンドウの表示基準位置を画面基準に表示します。OFFの場合はデフォルトの表示になります。
 * 
 * メニューコマンド表示モード
 * メニューコマンドの表示位置を指定します。
 * 
 * 配置モード
 * メニューステータスウィンドウの配置をメニューコマンド表示モードで設定したモードにより表示します。
 * メニューコマンド表示モードが'left'の場合はメニューコマンドの右側に表示。
 * 'right'の場合はメニューコマンドの左側に表示。
 * 'top'の場合はメニューコマンドの下側に表示。
 * 'under'の場合はメニューコマンドの上側に表示。
 * 'free'の場合は左上基準(UIウィンドウ基準無効基準)に表示。
 *  
 * 当プラグインは、立ち絵、顔グラ表示EXに対応しています。
 * 立ち絵表示EX用画像設定で設定しなくても立ち絵は表示されます。
 * 立ち絵表示EX適用をOFFにすることで立ち絵、顔グラ表示EX導入時でも、このプラグインの立ち絵設定が適用されます。
 * アクターの顔グラ、立ち絵、キャラチップはアクター画像基本X座標、アクター画像基本Y座標で設定できます。
 * また個別に設定する場合は各アクター画像設定の画像X座標、画像Y座標で設定します。
 * 画像のアクターが表示されている部分を中央に表示させたい場合は各アクター画像設定の画像表示開始座標X、画像表示開始座標Y
 * で設定します。
 * 
 * 表示ステータスの取得パラメータ
 * actor:アクターのゲームデータ
 * 
 * 独自ゲージ
 * 現在値：評価式で設定
 * 最大値：最大値評価式で設定
 * ゲージ横幅：項目、ゲージ横幅で設定
 * ゲージの識別IDは必ず設定してください。IDは任意の文字列を入力します。重複しないよう注意してください。
 * 
 * 背景画像1
 * IDはマップのタグまたはプラグインコマンドで設定します。
 * マップの設定のメモ欄
 * <MenuBackgroundId:[id]> メニュー背景を背景画像リスト[id]番の画像を表示します。
 * <MenuBackground:[url]> メニュー背景を[url]の画像を表示します。パスはimg/[url].pngです。
 * 例：<MenuBackground:titles1/Bigtree>
 * なお上記のタグよりもプラグインパラメータで設定した背景が優先されます。0番指定の時はデフォルトの背景が表示されます。
 * タグの[id]、[url]は[]ごと数値または文字列に置き換えてください。
 * 
 * 背景画像2
 * 背景画像1の手前に重ねて表示されます。
 * メニューUIの背景として使用します。
 * ゲーム中、背景画像1を変更しない場合は、メニュー背景を背景画像2で設定しても問題ありません。
 * 
 * 備考
 * ※1
 * アクターステータス表示項目のステートの評価式には表示したいステートを指定できます。(直接記入)
 * 表示したいステートIDを,区切りで指定します。
 * 例 "1,5,11" 必ず''または""で囲む
 * "1-10" ステートID1～10番まで表示
 * "3-11,15"ステートID3～11,15番を表示
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 2022/11/25 Ver.2.0.0
 * 設定用と処理用のファイルを分離。
 * メニューコマンドウィンドウ、メニューステータスウィンドウ、メニューインフォウィンドウの座標、サイズを指定できる機能を追加。
 * メニューインフォウィンドウの設定方法の仕様を変更。
 * 2022/9/10 Ver.1.4.1
 * インフォウィンドウの行を1行に指定したときに、スクロールしてしまう問題を修正。
 * 2022/8/27 Ver.1.4.0
 * アクターステータスに任意の画像を表示できる機能を追加。
 * ゲージがアクターの表示範囲内に収まるように修正。
 * 2022/8/22 Ver.1.3.2
 * 制御文字でフォントサイズ変更をした後に、項目のフォントのサイズが変化してしまう問題を修正。
 * 2022/7/23 Ver.1.3.1
 * ステートの表示ステートを範囲指定する機能を追加。
 * 2022/7/23 Ver.1.3.0
 * ステートのアイコンを表示したいステートのみ表示する機能を追加。
 * バトルステータスに表示されるステートの表示をメニュー画面上に表示できる機能を追加。
 * 経験値の%表示時に小数点が指定した小数点数を無視して表示されてしまう問題を修正。
 * 2022/7/4 Ver.1.2.4
 * インフォのフォントサイズを各項目毎に設定できるように修正。
 * チャプターテキストプラグイン対応による処理追加。
 * 2022/6/10 Ver.1.2.3
 * ステータス独自パラメータで名称を無記入した場合、パラメータが右にずれる問題を修正。
 * 2022/6/7 Ver.1.2.2
 * 一部プラグインでの競合対策。
 * 2022/6/5 Ver.1.2.1
 * ステータスの独自パラメータの名称の座標が正常に適用されていなかった問題を修正。
 * 2022/6/4 Ver.1.2.0
 * 行動目標を表示できる機能を追加。（要メニュー画面行動目標表示プラグイン）
 * 2022/5/29 Ver.1.1.1
 * マップごとに背景を変更できる機能を追加。
 * 背景画像を変更するプラグインコマンドを追加。
 * 背景画像を２層構造に変更。
 * 2022/5/28 Ver.1.1.0
 * 表示できるステータスに独自のゲージを追加できる機能を追加。
 * メニューコマンドウィンドウの高さをコマンド数の高さで表示する(MVの表示)機能を追加。
 * 2022/5/22 Ver.1.0.1
 * ステータスの独自パラメータが適用されない問題を修正。
 * ステータスに経験値（ゲージなし）を追加。
 * 2022/5/17 Ver.1.0.0
 * 初版
 * 
 * @command ChangeBackgroundId
 * @desc メニュー画面の背景画像IDを変更します。0でデフォルトの背景が表示されます。
 * @text 背景画像ID変更
 * 
 * @arg backgroundId
 * @type number
 * @default 0
 * @text 背景画像リストID
 * @desc 背景画像リストを指定します。0でデフォルトの画像が表示されます。
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
 * @param WindowUiIgnore
 * @text UIウィンドウ基準無効
 * @desc ウィンドウの配置をUI基準ではなく画面基準にします。
 * @type boolean
 * @default false
 * @parent Setting
 * 
 * @param BackGroundSetting
 * @text 背景設定
 * @default ------------------------------
 * 
 * @param BackGroundImges
 * @desc 背景画像ファイル名を指定します。
 * @text 背景画像１
 * @type file[]
 * @dir img/
 * @default 
 * @parent BackGroundSetting
 * 
 * @param BackUiWidth1
 * @text 背景画像１背景サイズをUIに合わせる
 * @desc 背景画像１の背景サイズをUIに合わせる。
 * @type boolean
 * @default true
 * @parent BackGroundSetting
 * 
 * @param BackGroundImg
 * @desc 背景画像１の手前に表示する背景画像ファイル名を指定します。
 * @text 背景画像２
 * @type file
 * @dir img/
 * @default 
 * @parent BackGroundSetting
 * 
 * @param BackUiWidth
 * @text 背景画像２背景サイズをUIに合わせる
 * @desc 背景画像２の背景サイズをUIに合わせる。
 * @type boolean
 * @default true
 * @parent BackGroundSetting
 * 
 * @param MenuCommandSetting
 * @text メニューコマンド設定
 * @default ------------------------------
 * 
 * @param MenuCommandCols
 * @text メニューコマンドの表示列
 * @desc メニューコマンドの表示する列。
 * @type number
 * @default 1
 * @min 1
 * @parent MenuCommandSetting
 * 
 * @param MenuCommandRows
 * @text メニューコマンドの表示行
 * @desc メニューコマンドの表示する行。0でメニューコマンド縦幅内での表示数
 * @type number
 * @default 0
 * @min 0
 * @parent MenuCommandSetting
 * 
 * @param MenuCommandX
 * @text メニューコマンドX座標
 * @desc メニューコマンドのX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent MenuCommandSetting
 * 
 * @param MenuCommandY
 * @desc メニューコマンドのY座標
 * @text メニューコマンドY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent MenuCommandSetting
 * 
 * @param MenuCommandWidth
 * @text メニューコマンド横幅
 * @desc メニューコマンドウィンドウの横幅。
 * @type number
 * @default 240
 * @min 0
 * @parent MenuCommandSetting
 * 
 * @param MenuCommandHeight
 * @text メニューコマンド縦幅
 * @desc メニューコマンドウィンドウの縦幅。0でメインエリア高さ
 * @type number
 * @default 504
 * @min 0
 * @parent MenuCommandSetting
 * 
 * @param MenuCommandPosition
 * @desc メニューコマンドの表示モードを指定します。
 * @text メニューコマンド表示モード
 * @type select
 * @option 指定なし
 * @value 'free'
 * @option 左
 * @value 'left'
 * @option 右
 * @value 'right'
 * @option 画面上
 * @value 'top'
 * @option 画面下
 * @value 'under'
 * @default 'right'
 * @parent MenuCommandSetting
 * 
 * @param CommandHeightMode
 * @text ウィンドウ高さモード
 * @desc メニューコマンドウィンドウの高さをコマンド数に合わせます。
 * @type boolean
 * @default false
 * @parent MenuCommandSetting
 * 
 * @param CommandWindowVisible
 * @text ウィンドウ表示
 * @desc ウィンドウを表示する。
 * @type boolean
 * @default true
 * @parent MenuCommandSetting
 * 
 * @param StatusSetting
 * @text メニューステータス設定
 * @default ------------------------------
 * 
 * @param StatusList
 * @desc ステータス項目設定
 * @text ステータス項目設定
 * @type struct<StatusListData>[]
 * @default ["{\"DateSelect\":\"1\",\"NameColor\":\"16\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"180\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"168\",\"SystemItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"FontSize\":\"0\"}","{\"DateSelect\":\"4\",\"NameColor\":\"16\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"180\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"132\",\"SystemItemWidth\":\"48\",\"Align\":\"'right'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"FontSize\":\"0\"}","{\"DateSelect\":\"5\",\"NameColor\":\"16\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"3\",\"X_Coordinate\":\"180\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"FontSize\":\"0\"}","{\"DateSelect\":\"3\",\"NameColor\":\"16\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"360\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"168\",\"SystemItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"FontSize\":\"0\"}","{\"DateSelect\":\"11\",\"NameColor\":\"16\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"360\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"FontSize\":\"0\"}","{\"DateSelect\":\"12\",\"NameColor\":\"16\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"360\",\"Y_Coordinate\":\"24\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"FontSize\":\"0\"}","{\"DateSelect\":\"13\",\"NameColor\":\"16\",\"ParamName\":\"\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"360\",\"Y_Coordinate\":\"48\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"Align\":\"'left'\",\"DetaEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"FontSize\":\"0\"}"]
 * @parent StatusSetting
 * 
 * @param MenuCols
 * @text アクターの表示列
 * @desc アクターの表示する列。
 * @type number
 * @default 1
 * @min 1
 * @parent StatusSetting
 * 
 * @param MenuRows
 * @text アクターの表示行
 * @desc アクターの表示する行。
 * @type number
 * @default 4
 * @min 1
 * @parent StatusSetting
 * 
 * @param MenuStatusX
 * @text メニューステータスX座標
 * @desc メニューステータスのX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent StatusSetting
 * 
 * @param MenuStatusY
 * @desc メニューステータスのY座標
 * @text メニューステータスY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent StatusSetting
 * 
 * @param MenuStatusWidth
 * @desc メニューステータスの横幅。
 * @text メニューステータス横幅
 * @type number
 * @default 0
 * @min 0
 * @parent StatusSetting
 * 
 * @param MenuStatusHeight
 * @desc メニューステータスの縦幅。
 * @text メニューステータス縦幅
 * @type number
 * @default 0
 * @min 0
 * @parent StatusSetting
 * 
 * @param ArrangementMode
 * @text 配置モード
 * @desc 配置モード。
 * @type select
 * @option 指定なし
 * @value 0
 * @option メニューコマンドの位置基準
 * @value 1
 * @default 1
 * @parent StatusSetting
 * 
 * @param WindowVisible
 * @text ウィンドウ表示
 * @desc ウィンドウを表示する。
 * @type boolean
 * @default true
 * @parent StatusSetting
 * 
 * @param GaugeSetting
 * @text ゲージ設定
 * @default ------------------------------
 * @parent StatusSetting
 * 
 * @param HPGaugeWidth
 * @text HPゲージ横幅
 * @desc HPゲージの横幅を指定します。
 * @type number
 * @default 128
 * @min 0
 * @parent GaugeSetting
 * 
 * @param MPGaugeWidth
 * @text MPゲージ横幅
 * @desc MPゲージの横幅を指定します。
 * @type number
 * @default 128
 * @min 0
 * @parent GaugeSetting
 * 
 * @param TPGaugeWidth
 * @text TPゲージ横幅
 * @desc TPゲージの横幅を指定します。
 * @type number
 * @default 128
 * @min 0
 * @parent GaugeSetting
 * 
 * @param ExpgaugeSetting
 * @text 経験値ゲージ設定
 * @default ------------------------------
 * @parent StatusSetting
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
 * @default 128
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
 * @type number
 * @default 17
 * @min 0
 * @parent ExpgaugeSetting
 * 
 * @param ExpGaugeColor2
 * @desc 経験値のゲージのシステムカラーID２（右）
 * @text 経験値ゲージ色２
 * @type number
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
 * @param InfoSetting
 * @text メニューインフォ設定
 * @default ------------------------------
 * 
 * @param MenuInfoWindowSetting
 * @desc インフォ項目設定
 * @text インフォ項目設定
 * @type struct<InfoWindowList>[]
 * @default ["{\"MethodName\":\"money\",\"ListDateSetting\":\"1\",\"X_Position\":\"568\",\"Y_Position\":\"504\",\"Width\":\"240\",\"Height\":\"0\",\"InfoCols\":\"1\",\"InfoRows\":\"1\",\"InfoFontSize\":\"0\",\"WindowVisible\":\"true\"}"]
 * @parent InfoSetting
 * 
 * @param HelpList
 * @desc コマンドヘルプ項目設定
 * @text コマンドヘルプ項目設定
 * @type struct<HelpListData>[]
 * @default ["{\"HelpCommandName\":\"'アイテム'\",\"HelpCommandText\":\"所持しているアイテムを表示します。\"}","{\"HelpCommandName\":\"'スキル'\",\"HelpCommandText\":\"スキルを表示します。\"}","{\"HelpCommandName\":\"'装備'\",\"HelpCommandText\":\"装備を変更します。\"}","{\"HelpCommandName\":\"'ステータス'\",\"HelpCommandText\":\"アクターのステータスを表示します。\"}","{\"HelpCommandName\":\"'オプション'\",\"HelpCommandText\":\"ゲームの設定を変更します。\"}","{\"HelpCommandName\":\"'並び替え'\",\"HelpCommandText\":\"メンバーの並び替えを行います。\"}","{\"HelpCommandName\":\"'セーブ'\",\"HelpCommandText\":\"データを記録します。\"}","{\"HelpCommandName\":\"'ゲーム終了'\",\"HelpCommandText\":\"ゲームを終了します。\"}"]
 * @parent InfoSetting
 * 
 * @param ListData1_10
 * @text 表示項目設定1-10
 * @default ------------------------------
 * @parent InfoSetting
 * 
 * @param PageList1
 * @desc 表示するリスト。
 * @text 表示リスト１
 * @type struct<InfoListData>[]
 * @default ["{\"DateSelect\":\"2\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DataEval\":\"\",\"Align\":\"'right'\",\"InfoIcon\":\"0\",\"Text\":\"\",\"ContentsFontSize\":\"0\"}"]
 * @parent ListData1_10
 *  
 * @param PageList2
 * @desc 表示するリスト。
 * @text 表示リスト２
 * @type struct<InfoListData>[]
 * @default ["{\"DateSelect\":\"6\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"NameColor\":\"16\",\"ParamName\":\"\",\"DataEval\":\"\",\"Align\":\"'right'\",\"InfoIcon\":\"0\",\"Text\":\"\",\"ContentsFontSize\":\"0\"}"]
 * @parent ListData1_10
 * 
 * @param PageList3
 * @desc 表示するリスト。
 * @text 表示リスト３
 * @type struct<InfoListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList4
 * @desc 表示するリスト。
 * @text 表示リスト４
 * @type struct<InfoListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList5
 * @desc 表示するリスト。
 * @text 表示リスト５
 * @type struct<InfoListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList6
 * @desc 表示するリスト。
 * @text 表示リスト６
 * @type struct<InfoListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList7
 * @desc 表示するリスト。
 * @text 表示リスト７
 * @type struct<InfoListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList8
 * @desc 表示するリスト。
 * @text 表示リスト８
 * @type struct<InfoListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList9
 * @desc 表示するリスト。
 * @text 表示リスト９
 * @type struct<InfoListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList10
 * @desc 表示するリスト。
 * @text 表示リスト１０
 * @type struct<InfoListData>[]
 * @default []
 * @parent ListData1_10
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
 * @param ActorPictureData
 * @text 立ち絵表示EX用画像設定
 * @desc 立ち絵表示EXでのアクターの画像設定
 * @default []
 * @type struct<ActorPictureDataList>[]
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
 * 
 */
/*~struct~HelpListData:ja
 * 
 * @param HelpCommandName
 * @text コマンド名
 * @desc コマンド名を設定します。リストにない場合は直接記入します。
 * @type combo
 * @option 'アイテム'
 * @option 'スキル'
 * @option '装備'
 * @option 'ステータス'
 * @option 'オプション'
 * @option '並び替え'
 * @option 'セーブ'
 * @option 'ゲーム終了'
 * @default
 * 
 * @param HelpCommandText
 * @text コマンドの説明文
 * @desc コマンドの説明文を設定します。制御文字使用可能です。
 * @type string
 * @default 
 * 
 */
/*~struct~InfoWindowList:ja
 * 
 * @param MethodName
 * @desc ウィンドウの識別名を指定します。
 * @text 識別名
 * @type string
 * @default
 *
 * @param ListDateSetting
 * @desc 表示するリストを指定します。
 * @text 表示リスト指定
 * @type select
 * @option なし
 * @value 0
 * @option 表示リスト１
 * @value 1
 * @option 表示リスト２
 * @value 2
 * @option 表示リスト３
 * @value 3
 * @option 表示リスト４
 * @value 4
 * @option 表示リスト５
 * @value 5
 * @option 表示リスト６
 * @value 6
 * @option 表示リスト７
 * @value 7
 * @option 表示リスト８
 * @value 8
 * @option 表示リスト９
 * @value 9
 * @option 表示リスト１０
 * @value 10
 * @default 0
 * 
 * @param X_Position
 * @text X座標
 * @desc X座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Y_Position
 * @desc Y座標
 * @text Y座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Width
 * @text 横幅
 * @desc ウィンドウの横幅。
 * @type number
 * @default 0
 * @min 0
 * 
 * @param Height
 * @text ウィンドウ縦幅
 * @desc ウィンドウの高さ。
 * @type number
 * @default 0
 * @min 0
 * 
 * @param InfoCols
 * @text インフォの表示列
 * @desc インフォの表示する列。
 * @type number
 * @default 2
 * @min 1
 * 
 * @param InfoRows
 * @text インフォの表示行
 * @desc インフォの表示する行。0でウィンドウ縦幅
 * @type number
 * @default 0
 * @min 0
 * 
 * @param InfoFontSize
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ
 * @type number
 * @default 0
 * @min -99
 * 
 * @param WindowVisible
 * @text ウィンドウ表示
 * @desc ウィンドウを表示する。
 * @type boolean
 * @default true
 * 
 * 
 */
/*~struct~StatusListData:ja
 *
 * @param DateSelect
 * @text 表示するステータス
 * @desc 表示するステータスを指定します。
 * @type select
 * @option なし
 * @value 0
 * @option アクター名(1)(3)(4)(5)(6)(7)(9)(13)
 * @value 1
 * @option 二つ名(1)(3)(4)(5)(6)(7)(9)(13)
 * @value 2
 * @option 職業(1)(3)(4)(5)(6)(7)(9)(13)
 * @value 3
 * @option レベル(1)(3)(4)(5)(6)(7)(13)
 * @value 4
 * @option ステート(3)(4)(5)(6)(7)(10※1)
 * @value 5
 * @option ステート(戦闘用と同じ表示)(3)(4)(5)(6)
 * @value 7
 * @option 独自パラメータ(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)
 * @value 6
 * @option ＨＰ(3)(4)(5)(6)(7)(21)
 * @value 11
 * @option ＭＰ(3)(4)(5)(6)(7)(21)
 * @value 12
 * @option ＴＰ(3)(4)(5)(6)(7)(21)
 * @value 13
 * @option 経験値(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)
 * @value 14
 * @option 経験値（ゲージあり）(1)(2)(3)(4)(5)(6)(7)(21)
 * @value 15
 * @option 攻撃力(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)
 * @value 22
 * @option 防御力(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)
 * @value 23
 * @option 魔法力(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)
 * @value 24
 * @option 魔法防御(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)
 * @value 25
 * @option 敏捷性(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)
 * @value 26
 * @option 運(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)
 * @value 27
 * @option 命中率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 30
 * @option 回避率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 31
 * @option 会心率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 32
 * @option 会心回避率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 33
 * @option 魔法回避率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 34
 * @option 魔法反射率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 35
 * @option 反撃率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 36
 * @option HP再生率(1)(2)(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 37
 * @option MP再生率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 38
 * @option TP再生率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 39
 * @option 狙われ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 40
 * @option 防御効果率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 41
 * @option 回復効果率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 42
 * @option 薬の知識(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 43
 * @option MP消費率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 44
 * @option TPチャージ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 45
 * @option 物理ダメージ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 46
 * @option 魔法ダメージ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 47
 * @option 床ダメージ率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 48
 * @option 獲得経験値率(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 49
 * @option 独自ゲージ(3)(4)(5)(6)(7)(10)(20)(21)(22)(23)(24)
 * @value 100
 * @option 画像(3)(4)(5)(6)(25)
 * @value 200
 * @option キャラチップ(3)(4)(5)(6)(25)
 * @value 300
 * @option SVアクター(3)(4)(5)(6)(25)
 * @value 301
 * @option ライン(1)(2)(3)(4)(5)(6)(7)
 * @value 1000
 * @default 0
 * 
 * @param NameColor
 * @desc 項目名称のシステムカラーID。テキストタブでカラーコードを入力できます。
 * @text 項目名称文字色(1)
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
 * @type number
 * @default 0
 * @min 0
 * @parent GaugeSetting
 * 
 * @param Color2
 * @desc ゲージのシステムカラーID(右)。テキストタブでカラーコードを入力できます。
 * @text ゲージカラー(右)(24)
 * @type number
 * @default 0
 * @min 0
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
 */
/*~struct~InfoListData:ja
 *
 * @param DateSelect
 * @text 表示する項目
 * @desc 表示する項目を指定します。
 * @type select
 * @option なし
 * @value 0
 * @option プレイ時間(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)
 * @value 1
 * @option 所持金(1)(2)(3)(4)(5)(6)(7)(8)(11)
 * @value 2
 * @option 現在地(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)
 * @value 3
 * @option 独自パラメータ(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)
 * @value 4
 * @option 名称のみ(1)(2)(3)(4)(5)(7)(8)(10)(11)
 * @value 5
 * @option メニューコマンド説明(1)(2)(3)(4)(5)(7)(8)
 * @value 6
 * @option フリーテキスト(1)(2)(3)(4)(12)
 * @value 10
 * @option 行動目標（要メニュー画面行動目標表示）(1)(2)(3)(4)(6)(7)(8)(11)
 * @value 11
 * @option キャプター（要チャプターテキスト）(1)(2)(3)(4)(6)(7)(8)(11)
 * @value 12
 * @default 0
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
 * @desc 項目横幅（0でデフォルト幅）
 * @text 項目横幅(5)
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
 * @param NameColor
 * @desc 項目名称の文字色。テキストタブでカラーコードを入力できます。
 * @text 項目名称文字色(7)
 * @type number
 * @default 16
 * @min 0
 * 
 * @param ParamName
 * @desc 項目の名称を設定します。
 * @text 名称(8)
 * @type string
 * @default
 * 
 * @param DataEval
 * @desc 評価式。
 * @text 評価式(javaScript)(9)
 * @type combo
 * @option '$gameParty.steps();//歩数'
 * @option '$gameSystem.battleCount();//戦闘回数'
 * @option '$gameSystem.escapeCount();//逃走回数'
 * @option '$gameSystem.saveCount();//セーブ回数'
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option '$gameSystem.chronus().getDateFormat(1);//ゲーム内時間の導入プラグイン日時フォーマット1'
 * @option '$gameSystem.chronus().getDateFormat(2);//ゲーム内時間の導入プラグイン日時フォーマット2'
 * @default 
 * 
 * @param Align
 * @desc 文字揃え。
 * @text 文字揃え(10)
 * @type select
 * @option 左
 * @value 'left'
 * @option 右
 * @value 'right'
 * @option 中央
 * @value 'center'
 * @default 'right'
 * 
 * @param InfoIcon
 * @text アイコンID(11)
 * @desc アイコンID
 * @type number
 * @default 0
 * @max 999999
 * @min 0
 * 
 * @param Text
 * @desc フリーテキストのテキストを記入します。(制御文字使用可能)
 * @text フリーテキストのテキスト(12)
 * @type multiline_string
 * @default
 * 
 * @param ContentsFontSize
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ(13)
 * @type number
 * @default 0
 * @min -99
 *
 */
/*~struct~actorImgList:ja
 * 
 * @param actorId
 * @text アクター
 * @desc アクターを指定します。
 * @type actor
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
 * @text アクター画像
 * @desc アクターの画像を表示します。立ち絵を切り替える場合はリストに画像を設定してください。(顔グラ表示OFF)
 * @type file
 * @dir img/
 * @default 
 * 
 * @param FaceImg
 * @text 顔グラ画像
 * @desc 顔グラ画像のスプライトシートを設定します。(顔グラ表示ON)
 * @type file
 * @dir img/faces
 * 
 * @param FaceIndex
 * @desc 顔グラのインデックスID。
 * @text 顔グラインデックスID
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
/*~struct~ActorPictureDataList:ja
 * 
 * @param actorId
 * @text アクター
 * @desc アクターを指定します。
 * @type actor
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
Imported.NUUN_MenuScreen_default = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_MenuScreen_default');

    const params = {};

    params.menuMode = 'Default';
    params.BackGroundImg = String(parameters['BackGroundImg']);
    params.BackGroundImges = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['BackGroundImges'])) : null) || [];
    params.BackUiWidth1 = eval(parameters['BackUiWidth1'] || "true");
    params.BackUiWidth = eval(parameters['BackUiWidth'] || "true");
    params.WindowMargin = Number(parameters['WindowMargin'] || 4);
    params.WindowUiIgnore = eval(parameters['WindowUiIgnore'] || "false");
    params.MenuCommandCols = Number(parameters['MenuCommandCols'] || 1);
    params.MenuCommandRows = Number(parameters['MenuCommandRows'] || 0);
    params.MenuCommandX = Number(parameters['MenuCommandX'] || 0);
    params.MenuCommandY = Number(parameters['MenuCommandY'] || 0);
    params.MenuCommandWidth = Number(parameters['MenuCommandWidth'] || 0);
    params.MenuCommandHeight = Number(parameters['MenuCommandHeight'] || 0);
    params.HPGaugeWidth = Number(parameters['HPGaugeWidth'] || 128);
    params.MPGaugeWidth = Number(parameters['MPGaugeWidth'] || 128);
    params.TPGaugeWidth = Number(parameters['TPGaugeWidth'] || 128);
    params.ExpGaugeWidth = Number(parameters['ExpGaugeWidth'] || 128);
    params.ExpGaugeColor1 = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ExpGaugeColor1'])) : 18);
    params.ExpGaugeColor2 = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ExpGaugeColor2'])) : 18);
    params.CommandHeightMode = eval(parameters['CommandHeightMode'] || "false");
    params.DecimalMode = eval(parameters['DecimalMode'] || "true");
    params.MenuCommandPosition = eval(parameters['MenuCommandPosition']) || 'right';
    params.ArrangementMode = eval(parameters['ArrangementMode'] || 1);
    params.ExpDisplayMode = Number(parameters['ExpDisplayMode'] || 1);
    params.LabelShow = eval(parameters['LabelShow'] || "true");
    params.EXPDecimal = Number(parameters['EXPDecimal'] || 2);
    params.MenuCols = Number(parameters['MenuCols'] || 1);
    params.MenuRows = Number(parameters['MenuRows'] || 4);
    params.MenuStatusX = Number(parameters['MenuStatusX'] || 0);
    params.MenuStatusY = Number(parameters['MenuStatusY'] || 0);
    params.MenuStatusWidth = Number(parameters['MenuStatusWidth'] || 0);
    params.MenuStatusHeight = Number(parameters['MenuStatusHeight'] || 0);
    params.CommandWindowVisible = eval(parameters['CommandWindowVisible'] || "true");
    params.WindowVisible = eval(parameters['WindowVisible'] || "true");
    params.StatusList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['StatusList'])) : null) || [];

    params.GraphicMode = eval(parameters['GraphicMode']) || 'face';
    params.ActorsImgList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ActorsImgList'])) : null) || [];
    params.ActorPictureData = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ActorPictureData'])) : null) || [];
    params.ActorPictureEXApp = eval(parameters['ActorPictureEXApp'] || "true");
    params.ActorImg_X = Number(parameters['ActorImg_X'] || 0);
    params.ActorImg_Y = Number(parameters['ActorImg_Y'] || 0);

    params.MenuInfoWindowSetting = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['MenuInfoWindowSetting'])) : null) || [];
    params.HelpList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['HelpList'])) : null) || [];
    params.infoContents = {};
    params.infoContents.PageList1 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList1'])) : [];
    params.infoContents.PageList2 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList2'])) : [];
    params.infoContents.PageList3 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList3'])) : [];
    params.infoContents.PageList4 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList4'])) : [];
    params.infoContents.PageList5 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList5'])) : [];
    params.infoContents.PageList6 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList6'])) : [];
    params.infoContents.PageList7 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList7'])) : [];
    params.infoContents.PageList8 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList8'])) : [];
    params.infoContents.PageList9 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList9'])) : [];
    params.infoContents.PageList10 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList10'])) : [];

    NuunManager.getMenuStatusParams = function() {
        return params;
    };
})();