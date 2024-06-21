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
 * @plugindesc Menu screen EX
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 3.1.7
 * 
 * @help
 * Change and extend the menu screen display.
 * 
 * You can choose from four layouts, but you can also set your own layout.
 * 
 * Item settings
 * Display status acquisition parameters
 * actor: actor game data
 * 
 * Original gauge
 * Current value: set by evaluation formula
 * Max value: set by maximum value evaluation formula
 * Gauge Width: Set by Item, Gauge Width
 * Be sure to set the gauge identification ID. Enter any string for the ID. Please be careful not to duplicate.
 * 
 * Image
 * Enter the display conditions in javascript in the evaluation expression or string (javaScript). Appears when the conditions are met.
 * Always displayed if left blank.
 * actor: actor game data
 * actor.actor(): actor system data
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
 * Equipment
 * If equipment is set as the displayed status.
 * Specify the equipment to display for a specific actor or class.
 * Memo field for actor or class
 * <MenuShowEquips:[name],[name]...>
 * [name]:Equipment part name
 * Only the specified equipment part will be displayed. If not specified, all parts will be displayed.
 * If you fill in both actor and class, the actor settings will take precedence.
 * 
 * Placement mode
 * Displays the layout of the menu status window according to the mode set in the menu command display mode.
 * Display to the right of the menu command if the menu command display mode is 'left'.
 * 'right' displays to the left of menu commands.
 * 'top' displays below menu commands.
 * 'under' displays above menu commands.
 * In case of 'free', it is displayed on the upper left basis (UI window basis invalid basis).
 * 
 * Change font
 * A separate plug-in is required to change the font. (Triacontane-like FontLoad plug-in recommended)
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
 * ※2
 * Do not set when displaying an image with "NUUN_ActorPicture".
 * 
 *  
 * This plug-in supports "NUUN_ActorPicture".
 * The standing picture will be displayed even if you do not set it in "NUUN_ActorPicture settings".
 * By turning off "Apply NUUN_ActorPicture", the standing picture setting of this plug-in will be applied even when standing picture and face graphic display EX are installed.
 * Actor face graphics, standing pictures, and character chips can be set with the actor image base X coordinate and actor image base Y coordinate.
 * Also, when setting individually, set the image X coordinate and image Y coordinate of each actor image setting.
 * If you want to display the part of the image where the actor is displayed in the center, set the image display start coordinate X and image display start coordinate Y in each "Actor image setting".
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 6/22/2024 Ver.3.1.7
 * Fixed an issue where item width was not applied wider than the width of a single item.
 * Fixed actor front image image to fit item width.
 * 6/8/2024 Ver.3.1.6
 * Fixed so that units can be set for the current experience points and experience points to the next level.
 * Fixed an issue where ability units were displayed twice.
 * 6/8/2024 Ver.3.1.5
 * Fixed the APNG display to be displayed in front of the cursor.
 * Fixed an issue where the APNG would remain when the cursor was moved.
 * 5/26/2024 Ver.3.1.4
 * Updated with circle gauge support.
 * 5/12/2024 Ver.3.1.3
 * Added a function to skip actor target selection when there is only one member.
 * Corrected spelling error in party limit gauge.
 * Fixed an issue where special ability values were displayed twice.
 * 5/11/2024 Ver.3.1.2
 * Fixed so that fonts for numbers and units can be specified separately.
 * Fixed so that unit color can be applied with system color.
 * 4/20/2024 Ver.3.1.1
 * Fixed an issue where an error occurred when setting chapters. (Reset chapter selection only)
 * Fixed an issue where the display up to the next level was displayed based on earned experience points.
 * 4/6/2024 Ver.3.1.0
 * Added a function to display current experience points and equipment in the status.
 * 3/17/2024 Ver.3.0.3
 * Fixed so that font settings for amount and unit can be applied separately.
 * 1/18/2024 Ver.3.0.2
 * Fixed an issue where an error was displayed when setting some items in "NUUN_SkillStatusEX".
 * 1/8/2024 Ver.3.0.1
 * Support for "NUUN_SkillStatusEX".
 * 1/7/2024 Ver.3.0.0
 * Consolidate styles into one plugin.
 * Some plugin parameters have been abolished.
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
 * @param MenuLayoutSetting
 * @text Menu layout
 * @default ------------------------------
 * 
 * @param MenuLayoutStyle
 * @desc Specify the menu style.
 * @text Menu style
 * @type combo
 * @option 'Default'
 * @option 'ActorBeside'
 * @option 'CommandBeside'
 * @option 'Type4'
 * @default 'Default'
 * @parent MenuLayoutSetting
 * 
 * @param MenuWindowSetting
 * @text Actor status window
 * @default ------------------------------
 * 
 * @param MenuLayout
 * @desc Specifies the menu window to display.
 * @text Menu window settings
 * @default ["{\"StyleName\":\"'Default'\",\"WindowUiIgnore\":\"false\",\"StatusSetting\":\"------------------------------\",\"StatusList\":\"[\\\"{\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"180\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"168\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"360\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"MpGauge\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"360\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"24\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"TpGauge\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"360\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"48\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"'$dataSystem.optDisplayTp'//TP表示\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"Level\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"180\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'right'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"180\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"144\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"NameColor\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"360\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"168\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"StatusWindowBesidePosition\":\"'left'\",\"StatusWindowVerticalPosition\":\"'top'\",\"StatusWindowCommandDifference\":\"'beside'\",\"MenuStatusX\":\"0\",\"MenuStatusY\":\"0\",\"MenuStatusWidth\":\"0\",\"MenuCols\":\"1\",\"MenuRows\":\"4\",\"MenuStatusHeight\":\"0\",\"WindowVisible\":\"true\",\"InfoSetting\":\"------------------------------\",\"MenuInfoWindowSetting\":\"[\\\"{\\\\\\\"MethodName\\\\\\\":\\\\\\\"info1\\\\\\\",\\\\\\\"ListDateSetting\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Width\\\\\\\":\\\\\\\"240\\\\\\\",\\\\\\\"Height\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"InfoCols\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"InfoRows\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"InfoFontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"WindowBesidePosition\\\\\\\":\\\\\\\"'right'\\\\\\\",\\\\\\\"WindowVerticalPosition\\\\\\\":\\\\\\\"'under'\\\\\\\",\\\\\\\"WindowVisible\\\\\\\":\\\\\\\"true\\\\\\\"}\\\"]\",\"ListData1_10\":\"------------------------------\",\"PageList1\":\"[\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"Gold\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DataEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'right'\\\\\\\",\\\\\\\"InfoIcon\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ContentsFontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"PageList2\":\"[]\",\"PageList3\":\"[]\",\"PageList4\":\"[]\",\"PageList5\":\"[]\",\"PageList6\":\"[]\",\"PageList7\":\"[]\",\"PageList8\":\"[]\",\"PageList9\":\"[]\",\"PageList10\":\"[]\",\"MenuCommandSetting\":\"------------------------------\",\"MenuCommandPosition\":\"'right'\",\"MenuCommandCols\":\"1\",\"MenuCommandRows\":\"0\",\"MenuCommandX\":\"0\",\"MenuCommandY\":\"0\",\"MenuCommandWidth\":\"240\",\"MenuCommandHeight\":\"504\",\"CommandHeightMode\":\"false\",\"CommandWindowVisible\":\"true\",\"ActorSetting\":\"------------------------------\",\"GraphicMode\":\"'face'\",\"ActorsImgList\":\"[]\",\"ActorPictureEXApp\":\"false\",\"ActorImg_X\":\"0\",\"ActorImg_Y\":\"0\",\"BackGroundSetting2\":\"------------------------------\",\"BackGroundImg\":\"\",\"BackUiWidth2\":\"true\"}","{\"StyleName\":\"'ActorBeside'\",\"WindowUiIgnore\":\"false\",\"StatusSetting\":\"------------------------------\",\"StatusList\":\"[\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"ActorName\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"168\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"HpGauge\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"13\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"MpGauge\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"13\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"24\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"TpGauge\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"13\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"48\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"'$dataSystem.optDisplayTp'//TP表示\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"Level\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'right'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"State\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"144\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"Class\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"168\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\"]\",\"StatusWindowBesidePosition\":\"'left'\",\"StatusWindowVerticalPosition\":\"'top'\",\"StatusWindowCommandDifference\":\"'beside'\",\"MenuStatusX\":\"0\",\"MenuStatusY\":\"0\",\"MenuStatusWidth\":\"0\",\"MenuCols\":\"4\",\"MenuRows\":\"1\",\"MenuStatusHeight\":\"0\",\"WindowVisible\":\"true\",\"InfoSetting\":\"------------------------------\",\"MenuInfoWindowSetting\":\"[\\\"{\\\\\\\"MethodName\\\\\\\":\\\\\\\"info1\\\\\\\",\\\\\\\"ListDateSetting\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Width\\\\\\\":\\\\\\\"240\\\\\\\",\\\\\\\"Height\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"InfoCols\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"InfoRows\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"InfoFontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"WindowBesidePosition\\\\\\\":\\\\\\\"'right'\\\\\\\",\\\\\\\"WindowVerticalPosition\\\\\\\":\\\\\\\"'under'\\\\\\\",\\\\\\\"WindowVisible\\\\\\\":\\\\\\\"true\\\\\\\"}\\\"]\",\"ListData1_10\":\"------------------------------\",\"PageList1\":\"[\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"Gold\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DataEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'right'\\\\\\\",\\\\\\\"InfoIcon\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ContentsFontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"PageList2\":\"[]\",\"PageList3\":\"[]\",\"PageList4\":\"[]\",\"PageList5\":\"[]\",\"PageList6\":\"[]\",\"PageList7\":\"[]\",\"PageList8\":\"[]\",\"PageList9\":\"[]\",\"PageList10\":\"[]\",\"MenuCommandSetting\":\"------------------------------\",\"MenuCommandPosition\":\"'right'\",\"MenuCommandCols\":\"1\",\"MenuCommandRows\":\"0\",\"MenuCommandX\":\"0\",\"MenuCommandY\":\"0\",\"MenuCommandWidth\":\"240\",\"MenuCommandHeight\":\"504\",\"CommandHeightMode\":\"false\",\"CommandWindowVisible\":\"true\",\"ActorSetting\":\"------------------------------\",\"GraphicMode\":\"'face'\",\"ActorsImgList\":\"[]\",\"ActorPictureEXApp\":\"false\",\"ActorImg_X\":\"0\",\"ActorImg_Y\":\"0\",\"BackGroundSetting2\":\"------------------------------\",\"BackGroundImg\":\"\",\"BackUiWidth2\":\"true\"}","{\"StyleName\":\"'CommandBeside'\",\"WindowUiIgnore\":\"false\",\"StatusSetting\":\"------------------------------\",\"StatusList\":\"[\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"ActorName\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"168\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"HpGauge\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"7\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"MpGauge\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"7\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"44\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"TpGauge\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"7\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"68\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"'$dataSystem.optDisplayTp'//TP表示\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"Level\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'right'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"State\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"144\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"Class\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"6\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"168\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\"]\",\"StatusWindowBesidePosition\":\"'left'\",\"StatusWindowVerticalPosition\":\"'commandunder'\",\"StatusWindowCommandDifference\":\"'none'\",\"MenuStatusX\":\"0\",\"MenuStatusY\":\"0\",\"MenuStatusWidth\":\"0\",\"MenuCols\":\"4\",\"MenuRows\":\"1\",\"MenuStatusHeight\":\"356\",\"WindowVisible\":\"true\",\"InfoSetting\":\"------------------------------\",\"MenuInfoWindowSetting\":\"[\\\"{\\\\\\\"MethodName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ListDateSetting\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Width\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Height\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"InfoCols\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"InfoRows\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"InfoFontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"WindowBesidePosition\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"WindowVerticalPosition\\\\\\\":\\\\\\\"'under'\\\\\\\",\\\\\\\"WindowVisible\\\\\\\":\\\\\\\"true\\\\\\\"}\\\"]\",\"ListData1_10\":\"------------------------------\",\"PageList1\":\"[\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"CurrentLocation\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"Location:\\\\\\\",\\\\\\\"DataEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"InfoIcon\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ContentsFontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"Playtime\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"160\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"Play time:\\\\\\\",\\\\\\\"DataEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'right'\\\\\\\",\\\\\\\"InfoIcon\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ContentsFontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"CommandDescription\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DataEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'right'\\\\\\\",\\\\\\\"InfoIcon\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ContentsFontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"Gold\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DataEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'right'\\\\\\\",\\\\\\\"InfoIcon\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ContentsFontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"PageList2\":\"[]\",\"PageList3\":\"[]\",\"PageList4\":\"[]\",\"PageList5\":\"[]\",\"PageList6\":\"[]\",\"PageList7\":\"[]\",\"PageList8\":\"[]\",\"PageList9\":\"[]\",\"PageList10\":\"[]\",\"MenuCommandSetting\":\"------------------------------\",\"MenuCommandPosition\":\"'top'\",\"MenuCommandCols\":\"4\",\"MenuCommandRows\":\"2\",\"MenuCommandX\":\"0\",\"MenuCommandY\":\"0\",\"MenuCommandWidth\":\"0\",\"MenuCommandHeight\":\"0\",\"CommandHeightMode\":\"true\",\"CommandWindowVisible\":\"true\",\"ActorSetting\":\"------------------------------\",\"GraphicMode\":\"'face'\",\"ActorsImgList\":\"[]\",\"ActorPictureEXApp\":\"false\",\"ActorImg_X\":\"0\",\"ActorImg_Y\":\"0\",\"BackGroundSetting2\":\"------------------------------\",\"BackGroundImg\":\"\",\"BackUiWidth2\":\"true\"}","{\"StyleName\":\"'Type4'\",\"WindowUiIgnore\":\"false\",\"StatusSetting\":\"------------------------------\",\"StatusList\":\"[\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"ActorName\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"168\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"HpGauge\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"120\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"MpGauge\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"120\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"44\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"TpGauge\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"120\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"68\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"'$dataSystem.optDisplayTp'//TP表示\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"Level\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'right'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"State\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"160\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"144\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"Class\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"120\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"168\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\"]\",\"StatusWindowBesidePosition\":\"'left'\",\"StatusWindowVerticalPosition\":\"'top'\",\"StatusWindowCommandDifference\":\"'beside'\",\"MenuStatusX\":\"0\",\"MenuStatusY\":\"96\",\"MenuStatusWidth\":\"0\",\"MenuCols\":\"2\",\"MenuRows\":\"2\",\"MenuStatusHeight\":\"468\",\"WindowVisible\":\"true\",\"InfoSetting\":\"------------------------------\",\"MenuInfoWindowSetting\":\"[\\\"{\\\\\\\"MethodName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ListDateSetting\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Width\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Height\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"InfoCols\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"InfoRows\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"InfoFontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"WindowBesidePosition\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"WindowVerticalPosition\\\\\\\":\\\\\\\"'top'\\\\\\\",\\\\\\\"WindowVisible\\\\\\\":\\\\\\\"true\\\\\\\"}\\\"]\",\"ListData1_10\":\"------------------------------\",\"PageList1\":\"[\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"CurrentLocation\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"Location:\\\\\\\",\\\\\\\"DataEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"InfoIcon\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ContentsFontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"Playtime\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"160\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"Play time:\\\\\\\",\\\\\\\"DataEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'right'\\\\\\\",\\\\\\\"InfoIcon\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ContentsFontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"CommandDescription\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DataEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'right'\\\\\\\",\\\\\\\"InfoIcon\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ContentsFontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"Gold\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DataEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'right'\\\\\\\",\\\\\\\"InfoIcon\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ContentsFontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"PageList2\":\"[]\",\"PageList3\":\"[]\",\"PageList4\":\"[]\",\"PageList5\":\"[]\",\"PageList6\":\"[]\",\"PageList7\":\"[]\",\"PageList8\":\"[]\",\"PageList9\":\"[]\",\"PageList10\":\"[]\",\"MenuCommandSetting\":\"------------------------------\",\"MenuCommandPosition\":\"'right'\",\"MenuCommandCols\":\"1\",\"MenuCommandRows\":\"0\",\"MenuCommandX\":\"0\",\"MenuCommandY\":\"96\",\"MenuCommandWidth\":\"240\",\"MenuCommandHeight\":\"468\",\"CommandHeightMode\":\"false\",\"CommandWindowVisible\":\"true\",\"ActorSetting\":\"------------------------------\",\"GraphicMode\":\"'face'\",\"ActorsImgList\":\"[]\",\"ActorPictureEXApp\":\"false\",\"ActorImg_X\":\"0\",\"ActorImg_Y\":\"0\",\"BackGroundSetting2\":\"------------------------------\",\"BackGroundImg\":\"\",\"BackUiWidth2\":\"true\"}"]
 * @type struct<MenuLayoutList>[]
 * @parent MenuWindowSetting
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
 * @param SubMemberOpacity
 * @text Sub member opaque display
 * @desc Displays sub members as opaque.
 * @type boolean
 * @default true
 * @parent Setting
 * 
 * @param HelpSetting
 * @text Command help settings
 * @default ------------------------------
 * 
 * @param HelpList
 * @desc Command help item setting.
 * @text Command help item setting
 * @type struct<HelpListData>[]
 * @default ["{\"HelpCommandName\":\"'Item'\",\"HelpCommandText\":\"Display the items you have.\"}","{\"HelpCommandName\":\"'Skill'\",\"HelpCommandText\":\"Displays the skills you have learned.\"}","{\"HelpCommandName\":\"'Equip'\",\"HelpCommandText\":\"Change equip.\"}","{\"HelpCommandName\":\"'Status'\",\"HelpCommandText\":\"Display the status of the actor.\"}","{\"HelpCommandName\":\"'Options'\",\"HelpCommandText\":\"Change game settings.\"}","{\"HelpCommandName\":\"'Party'\",\"HelpCommandText\":\"Change members.\"}","{\"HelpCommandName\":\"'Save'\",\"HelpCommandText\":\"Record data.\"}","{\"HelpCommandName\":\"'Game End'\",\"HelpCommandText\":\"Exit the game.\"}"]
 * @parent HelpSetting
 * 
 * @param ExpgaugeSetting
 * @text EXP gauge settings
 * @default ------------------------------
 * 
 * @param ExpDisplayMode
 * @text Display of exp gauge
 * @desc Specifies the display of the experience value gauge.
 * @type select
 * @option None
 * @value 0
 * @option Required experience to next level
 * @value 1
 * @option Current experience gained
 * @value 2
 * @option Current Acquisition Percentage Display
 * @value 3
 * @option Level display(Circle gauge only)
 * @value 4
 * @default 1
 * @parent ExpgaugeSetting
 * 
 * @param LabelShow
 * @text Label display
 * @desc Show label.
 * @type boolean
 * @default true
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
 */
/*~struct~MenuLayoutList:
 * 
 * @param StyleName
 * @desc Menu layout style name.
 * @text Menu layout style
 * @type combo
 * @option 'Default'
 * @default 'Default'
 * 
 * @param WindowUiIgnore
 * @text Disable UI Window Criteria
 * @desc Make window placement relative to the screen instead of UI relative.
 * @type boolean
 * @default false
 * 
 * @param StatusSetting
 * @text Menu status setting
 * @default ------------------------------
 * 
 * @param StatusList
 * @desc Status item setting.
 * @text Status item setting
 * @type struct<StatusListData>[]
 * @default 
 * @parent StatusSetting
 * 
 * @param StatusWindowBesidePosition
 * @text Status menu window horizontal position
 * @desc Specifies the horizontal position of the status menu window.
 * @type select
 * @option None
 * @value 'free'
 * @option Left
 * @value 'left'
 * @option Right
 * @value 'right'
 * @option Next to command
 * @value 'command'
 * @default 'left'
 * @parent StatusSetting
 * 
 * @param StatusWindowVerticalPosition
 * @text Status menu window vertical position
 * @desc Specifies the vertical position of the status menu window.
 * @type select
 * @option None
 * @value 'free'
 * @option Top
 * @value 'top'
 * @option Under
 * @value 'under'
 * @option Above the command
 * @value 'commandtop'
 * @option Below command
 * @value 'commandunder'
 * @default 'top'
 * @parent StatusSetting
 * 
 * @param StatusWindowCommandDifference
 * @text Subtract command window width
 * @desc Subtracts the width of the window by the width of the command window.
 * @type select
 * @option None
 * @value 'none'
 * @option Lateral direction
 * @value 'beside'
 * @option Vertical direction
 * @value 'vertical'
 * @default 'none'
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
 * @param MenuStatusHeight
 * @desc Vertical width of the menu status.
 * @text Menu status vertical width
 * @type number
 * @default 0
 * @min 0
 * @parent StatusSetting
 * 
 * @param WindowVisible
 * @text Menu status window display
 * @desc Show window.
 * @type boolean
 * @default true
 * @parent StatusSetting
 * 
 * @param EquipSetting
 * @text 装備設定
 * @default ------------------------------
 * @parent StatusSetting
 * 
 * @param EquipNameVisible
 * @text Equipment part name display
 * @desc Specify the equipment part name to be displayed.
 * @type select
 * @option None
 * @value None
 * @option Parts only
 * @value Name
 * @option Iicon only
 * @value Icon
 * @option Icon, Part
 * @value IconName
 * @default Name
 * @parent EquipSetting
 * 
 * @param EquipIcons
 * @type struct<EquipIconsData>[]
 * @text Equipment icon
 * @desc Equipment icon set. The ID is the same as the equipment slot number.
 * @default []
 * @parent EquipSetting
 * 
 * @param InvalidSlotHide
 * @text Hide sealed equipment
 * @desc Equipment sealed with features will not be displayed.
 * @type boolean
 * @default false
 * @parent EquipSetting
 * 
 * @param InfoSetting
 * @text Menu info setting
 * @default ------------------------------
 * 
 * @param MenuInfoWindowSetting
 * @desc Info item settings
 * @text Info item settings
 * @type struct<InfoWindowList>[]
 * @default 
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
 * @default []
 * @parent ListData1_10
 *  
 * @param PageList2
 * @desc List to display.
 * @text Display list 2
 * @type struct<InfoListData>[]
 * @default []
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
 * 
 * @param MenuCommandSetting
 * @text Menu command setting
 * @default ------------------------------
 * 
 * @param MenuCommandPosition
 * @desc Specifies the display mode of menu commands.
 * @text Menu command display mode
 * @type select
 * @option None
 * @value 'free'
 * @option Left
 * @value 'left'
 * @option Right
 * @value 'right'
 * @option Top
 * @value 'top'
 * @option Under
 * @value 'under'
 * @default 'right'
 * @parent MenuCommandSetting
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
 * @param CommandHeightMode
 * @text Window height mode
 * @desc Fits the height of the menu command window to the number of commands.
 * @type boolean
 * @default true
 * @parent MenuCommandSetting
 * 
 * @param CommandWindowVisible
 * @text Command window display
 * @desc Show window.
 * @type boolean
 * @default true
 * @parent MenuCommandSetting
 * 
 * @param SkipSelectOneMember
 * @text Skip single member selection
 * @desc If there is only one member, skip actor target selection.
 * @type boolean
 * @default false
 * @parent MenuCommandSetting
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
 * @param BackGroundSetting2
 * @text Background settings 2
 * @default ------------------------------
 * 
 * @param BackGroundImg
 * @desc Specify the background image file name to be displayed in front of background image 1.
 * @text background image 2
 * @type file
 * @dir img/
 * @default 
 * @parent BackGroundSetting2
 * 
 * @param BackUiWidth2
 * @text Match background image 2 UI
 * @desc Match the background size of background image 2 to the UI.
 * @type boolean
 * @default true
 * @parent BackGroundSetting2
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
 * @option CircularHP(2)(3)(4)(5)(6)(7)(21)(23)(24)
 * @value HpCircularGauge
 * @option CircularMP(2)(3)(4)(5)(6)(7)(21)(23)(24)
 * @value MpCircularGauge
 * @option CircularTP(2)(3)(4)(5)(6)(7)(21)(23)(24)
 * @value TpCircularGauge
 * @option NowEXP(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)(14)(15)
 * @value ExpInfo
 * @option NextEXP(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)(14)(15)
 * @value Exp
 * @option EXP Gauge(1)(2)(3)(4)(5)(6)(7)(21)
 * @value ExpGauge
 * @option CircularExpGauge (1)(2)(3)(4)(5)(6)(7)(21)
 * @value ExpCircularGauge
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
 * @option Equip(1)(2)(3)(4)(5)(6)(7)(8)(13)
 * @value Equip
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
/*~struct~InfoListData:
 *
 * @param DateSelect
 * @text Items to display
 * @desc Specifies the items to display.
 * @type select
 * @option None
 * @value None
 * @option Play time(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(13)(14)(15)
 * @value Playtime
 * @option Gold(1)(2)(3)(4)(5)(6)(7)(8)(11)(13)(14)(15)
 * @value Gold
 * @option Location(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(13)(14)(15)
 * @value CurrentLocation
 * @option Original parameter(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)(14)(15)
 * @value OrgParam
 * @option Name(1)(2)(3)(4)(5)(7)(8)(10)(11)(13)(15)
 * @value Name
 * @option Menu command description(1)(2)(3)(4)(5)(7)(8)
 * @value CommandDescription
 * @option Free text(1)(2)(3)(4)(12)
 * @value Freetext
 * @option Action target (NUUN_Destination required)(1)(2)(3)(4)(6)(7)(8)(11)(13)(15)
 * @value Destination
 * @option Chapter (NUUN_Chapter required)(1)(2)(3)(4)(6)(7)(8)(11)(13)(15)
 * @value Chapter
 * @option Limit gayge（Required "NUUN_PartyLimitGauge"）(1)(2)(3)(4)(5)
 * @value Limit_Gauge
 * @option Line(1)(2)(3)(4)(5)(7)
 * @value HorzLine
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
 * @type color
 * @default 0
 * @min 0
 * 
 * @param NameColor
 * @desc System color ID for system items. You can enter the color code in the text tab.
 * @text Name color(7)
 * @type color
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
 * @type icon
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
 * @param WindowBesidePosition
 * @desc Specifies the horizontal display reference position of the window.
 * @text Window horizontal display reference position
 * @type select
 * @option None
 * @value 'free'
 * @option Left
 * @value 'left'
 * @option Right
 * @value 'right'
 * @default 'left'
 * 
 * @param WindowVerticalPosition
 * @desc Specifies the vertical display reference position of the window.
 * @text Window vertical display reference position
 * @type select
 * @option None
 * @value 'free'
 * @option Top
 * @value 'top'
 * @option Under
 * @value 'under'
 * @default 'top'
 * 
 * @param WindowVisible
 * @text Show window
 * @desc Show window.
 * @type boolean
 * @default true
 * 
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
 * @text Actor image※2
 * @desc Display the image of the actor. If you want to switch the standing picture, please set the image in the list. 
 * @type file
 * @dir img/
 * @default 
 * 
 * @param FaceImg
 * @text Face image※2
 * @desc Set the sprite sheet of the face graphic image.
 * @type file
 * @dir img/faces
 * 
 * @param FaceIndex
 * @desc Index ID of the Face image.
 * @text Face index ID※2
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
/*:ja
 * @target MZ
 * @plugindesc メニュー画面
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 3.1.7
 * 
 * @help
 * メニュー画面の表示を変更、拡張します。
 * 
 * レイアウトは４つから選択できますが、独自のレイアウトも設定可能です。
 * 
 * 項目設定
 * 表示ステータスの取得パラメータ
 * actor:アクターのゲームデータ
 * 
 * 独自ゲージ
 * 現在値：評価式で設定
 * 最大値：最大値評価式で設定
 * ゲージ横幅：項目、ゲージ横幅で設定
 * ゲージの識別IDは必ず設定してください。IDは任意の文字列を入力します。重複しないよう注意してください。
 * 
 * 背景設定
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
 * 装備
 * 表示するステータスに装備を設定している場合
 * 特定のアクター又は職業の表示させる装備を指定する。
 * アクター又は職業のメモ欄
 * <MenuShowEquips:[name],[name]...>
 * [name]:装備部位名
 * 指定した装備部位のみ表示されます。指定がない場合は全ての部位が表示されます。
 * アクターと職業両方に記入した場合はアクターの設定が優先されます。
 * 
 * 
 * 備考
 * ※1
 * アクターステータス表示項目のステートの評価式には表示したいステートを指定できます。(直接記入)
 * 表示したいステートIDを,区切りで指定します。
 * 例 "1,5,11" 必ず''または""で囲む
 * "1-10" ステートID1～10番まで表示
 * "3-11,15"ステートID3～11,15番を表示
 * 
 * ※2
 * 立ち絵、顔グラ共通プラグインで画像を表示する場合は設定しません。
 * 
 *  
 * 当プラグインは、立ち絵、顔グラ表示EXに対応しています。
 * 立ち絵表示EX用画像設定で設定しなくても立ち絵は表示されます。
 * 立ち絵表示EX適用をOFFにすることで立ち絵、顔グラ表示EX導入時でも、このプラグインの立ち絵設定が適用されます。
 * アクターの顔グラ、立ち絵、キャラチップはアクター画像基本X座標、アクター画像基本Y座標で設定できます。
 * また個別に設定する場合は各アクター画像設定の画像X座標、画像Y座標で設定します。
 * 画像のアクターが表示されている部分を中央に表示させたい場合は各アクター画像設定の画像表示開始座標X、画像表示開始座標Y
 * で設定します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/6/22 Ver.3.1.7
 * 項目の横幅が1項目の横幅より広く適用されない問題を修正。
 * アクターの前面画像の画像を項目幅にフィットするように修正。
 * 2024/6/9 Ver.3.1.6
 * 能力値の単位が二重に表示される問題を修正。
 * 現在の経験値、次のレベルまでの経験値に単位を設定できるように修正。
 * 2024/6/8 Ver.3.1.5
 * APNGの表示をカーソルより前に表示するように修正。
 * カーソル移動するとAPNGが残ってしまう問題を修正。
 * 2024/5/26 Ver.3.1.4
 * サークルゲージ対応による更新。
 * 2024/5/12 Ver.3.1.3
 * メンバーが一人の時にアクター対象選択をスキップする機能を追加。
 * パーティリミットゲージのスペルミス修正。
 * 特殊能力値の数値が二重に表示される問題を修正。
 * 2024/5/11 Ver.3.1.2
 * 数値と単位のフォントを別々に指定できるように修正。
 * 単位の色をシステムカラーで適用できるように修正。
 * 2024/4/20 Ver.3.1.1
 * チャプター設定時にエラーが出る問題を修正。(チャプター選択のみ再設定)
 * 次のレベルまでの表示が獲得経験値で表示されていた問題を修正。
 * 2024/4/6 Ver.3.1.0
 * ステータスに現在の経験値、装備を表示する機能を追加。
 * 2024/3/17 Ver.3.0.3
 * 金額と単位のフォントの設定を別々に適用できるように修正。
 * 2024/1/18 Ver.3.0.2
 * スキルステータスカスタマイズプラグインで一部項目の設定でエラーが表示される問題を修正。
 * 2024/1/8 Ver.3.0.1
 * スキルステータス画面表示カスタマイズへの対応。
 * 2024/1/7 Ver.3.0.0
 * スタイルを一つのプラグインに統合。
 * 一部のプラグインパラメータを廃止。
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
 * 
 * @param MenuLayoutSetting
 * @text メニューレイアウト
 * @default ------------------------------
 * 
 * @param MenuLayoutStyle
 * @desc メニュースタイルを指定します。
 * @text メニュースタイル
 * @type combo
 * @option 'Default'
 * @option 'ActorBeside'
 * @option 'CommandBeside'
 * @option 'Type4'
 * @default 'Default'
 * @parent MenuLayoutSetting
 * 
 * @param MenuWindowSetting
 * @text アクターステータスウィンドウ
 * @default ------------------------------
 * 
 * @param MenuLayout
 * @desc 表示するメニューウィンドウを指定します。
 * @text メニューウィンドウ設定
 * @default ["{\"StyleName\":\"'Default'\",\"WindowUiIgnore\":\"false\",\"StatusSetting\":\"------------------------------\",\"StatusList\":\"[\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"ActorName\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"180\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"168\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"HpGauge\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"360\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"MpGauge\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"360\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"24\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"TpGauge\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"360\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"48\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"'$dataSystem.optDisplayTp'//TP表示\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"Level\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"180\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'right'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"State\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"180\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"144\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"Class\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"360\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"168\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\"]\",\"StatusWindowBesidePosition\":\"'left'\",\"StatusWindowVerticalPosition\":\"'top'\",\"StatusWindowCommandDifference\":\"'beside'\",\"MenuStatusX\":\"0\",\"MenuStatusY\":\"0\",\"MenuStatusWidth\":\"0\",\"MenuCols\":\"1\",\"MenuRows\":\"4\",\"MenuStatusHeight\":\"0\",\"WindowVisible\":\"true\",\"InfoSetting\":\"------------------------------\",\"MenuInfoWindowSetting\":\"[\\\"{\\\\\\\"MethodName\\\\\\\":\\\\\\\"info1\\\\\\\",\\\\\\\"ListDateSetting\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Width\\\\\\\":\\\\\\\"240\\\\\\\",\\\\\\\"Height\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"InfoCols\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"InfoRows\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"InfoFontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"WindowBesidePosition\\\\\\\":\\\\\\\"'right'\\\\\\\",\\\\\\\"WindowVerticalPosition\\\\\\\":\\\\\\\"'under'\\\\\\\",\\\\\\\"WindowVisible\\\\\\\":\\\\\\\"true\\\\\\\"}\\\"]\",\"ListData1_10\":\"------------------------------\",\"PageList1\":\"[\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"Gold\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DataEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'right'\\\\\\\",\\\\\\\"InfoIcon\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ContentsFontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"PageList2\":\"[]\",\"PageList3\":\"[]\",\"PageList4\":\"[]\",\"PageList5\":\"[]\",\"PageList6\":\"[]\",\"PageList7\":\"[]\",\"PageList8\":\"[]\",\"PageList9\":\"[]\",\"PageList10\":\"[]\",\"MenuCommandSetting\":\"------------------------------\",\"MenuCommandPosition\":\"'right'\",\"MenuCommandCols\":\"1\",\"MenuCommandRows\":\"0\",\"MenuCommandX\":\"0\",\"MenuCommandY\":\"0\",\"MenuCommandWidth\":\"240\",\"MenuCommandHeight\":\"504\",\"CommandHeightMode\":\"false\",\"CommandWindowVisible\":\"true\",\"ActorSetting\":\"------------------------------\",\"GraphicMode\":\"'face'\",\"ActorsImgList\":\"[]\",\"ActorPictureEXApp\":\"false\",\"ActorImg_X\":\"0\",\"ActorImg_Y\":\"0\",\"BackGroundSetting2\":\"------------------------------\",\"BackGroundImg\":\"\",\"BackUiWidth2\":\"true\"}","{\"StyleName\":\"'ActorBeside'\",\"WindowUiIgnore\":\"false\",\"StatusSetting\":\"------------------------------\",\"StatusList\":\"[\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"ActorName\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"168\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"HpGauge\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"13\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"MpGauge\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"13\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"24\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"TpGauge\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"13\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"48\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"'$dataSystem.optDisplayTp'//TP表示\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"Level\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'right'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"State\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"144\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"Class\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"168\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\"]\",\"StatusWindowBesidePosition\":\"'left'\",\"StatusWindowVerticalPosition\":\"'top'\",\"StatusWindowCommandDifference\":\"'beside'\",\"MenuStatusX\":\"0\",\"MenuStatusY\":\"0\",\"MenuStatusWidth\":\"0\",\"MenuCols\":\"4\",\"MenuRows\":\"1\",\"MenuStatusHeight\":\"0\",\"WindowVisible\":\"true\",\"InfoSetting\":\"------------------------------\",\"MenuInfoWindowSetting\":\"[\\\"{\\\\\\\"MethodName\\\\\\\":\\\\\\\"info1\\\\\\\",\\\\\\\"ListDateSetting\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Width\\\\\\\":\\\\\\\"240\\\\\\\",\\\\\\\"Height\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"InfoCols\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"InfoRows\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"InfoFontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"WindowBesidePosition\\\\\\\":\\\\\\\"'right'\\\\\\\",\\\\\\\"WindowVerticalPosition\\\\\\\":\\\\\\\"'under'\\\\\\\",\\\\\\\"WindowVisible\\\\\\\":\\\\\\\"true\\\\\\\"}\\\"]\",\"ListData1_10\":\"------------------------------\",\"PageList1\":\"[\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"Gold\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DataEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'right'\\\\\\\",\\\\\\\"InfoIcon\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ContentsFontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"PageList2\":\"[]\",\"PageList3\":\"[]\",\"PageList4\":\"[]\",\"PageList5\":\"[]\",\"PageList6\":\"[]\",\"PageList7\":\"[]\",\"PageList8\":\"[]\",\"PageList9\":\"[]\",\"PageList10\":\"[]\",\"MenuCommandSetting\":\"------------------------------\",\"MenuCommandPosition\":\"'right'\",\"MenuCommandCols\":\"1\",\"MenuCommandRows\":\"0\",\"MenuCommandX\":\"0\",\"MenuCommandY\":\"0\",\"MenuCommandWidth\":\"240\",\"MenuCommandHeight\":\"504\",\"CommandHeightMode\":\"false\",\"CommandWindowVisible\":\"true\",\"ActorSetting\":\"------------------------------\",\"GraphicMode\":\"'face'\",\"ActorsImgList\":\"[]\",\"ActorPictureEXApp\":\"false\",\"ActorImg_X\":\"0\",\"ActorImg_Y\":\"0\",\"BackGroundSetting2\":\"------------------------------\",\"BackGroundImg\":\"\",\"BackUiWidth2\":\"true\"}","{\"StyleName\":\"'CommandBeside'\",\"WindowUiIgnore\":\"false\",\"StatusSetting\":\"------------------------------\",\"StatusList\":\"[\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"ActorName\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"168\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"HpGauge\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"7\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"MpGauge\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"7\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"44\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"TpGauge\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"7\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"68\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"'$dataSystem.optDisplayTp'//TP表示\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"Level\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'right'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"State\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"144\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"Class\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"6\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"168\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\"]\",\"StatusWindowBesidePosition\":\"'left'\",\"StatusWindowVerticalPosition\":\"'commandunder'\",\"StatusWindowCommandDifference\":\"'none'\",\"MenuStatusX\":\"0\",\"MenuStatusY\":\"0\",\"MenuStatusWidth\":\"0\",\"MenuCols\":\"4\",\"MenuRows\":\"1\",\"MenuStatusHeight\":\"356\",\"WindowVisible\":\"true\",\"InfoSetting\":\"------------------------------\",\"MenuInfoWindowSetting\":\"[\\\"{\\\\\\\"MethodName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ListDateSetting\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Width\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Height\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"InfoCols\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"InfoRows\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"InfoFontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"WindowBesidePosition\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"WindowVerticalPosition\\\\\\\":\\\\\\\"'under'\\\\\\\",\\\\\\\"WindowVisible\\\\\\\":\\\\\\\"true\\\\\\\"}\\\"]\",\"ListData1_10\":\"------------------------------\",\"PageList1\":\"[\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"CurrentLocation\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"現在地:\\\\\\\",\\\\\\\"DataEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"InfoIcon\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ContentsFontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"Playtime\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"160\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"プレイ時間:\\\\\\\",\\\\\\\"DataEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'right'\\\\\\\",\\\\\\\"InfoIcon\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ContentsFontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"CommandDescription\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DataEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'right'\\\\\\\",\\\\\\\"InfoIcon\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ContentsFontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"Gold\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DataEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'right'\\\\\\\",\\\\\\\"InfoIcon\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ContentsFontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"PageList2\":\"[]\",\"PageList3\":\"[]\",\"PageList4\":\"[]\",\"PageList5\":\"[]\",\"PageList6\":\"[]\",\"PageList7\":\"[]\",\"PageList8\":\"[]\",\"PageList9\":\"[]\",\"PageList10\":\"[]\",\"MenuCommandSetting\":\"------------------------------\",\"MenuCommandPosition\":\"'top'\",\"MenuCommandCols\":\"4\",\"MenuCommandRows\":\"2\",\"MenuCommandX\":\"0\",\"MenuCommandY\":\"0\",\"MenuCommandWidth\":\"0\",\"MenuCommandHeight\":\"0\",\"CommandHeightMode\":\"true\",\"CommandWindowVisible\":\"true\",\"ActorSetting\":\"------------------------------\",\"GraphicMode\":\"'face'\",\"ActorsImgList\":\"[]\",\"ActorPictureEXApp\":\"false\",\"ActorImg_X\":\"0\",\"ActorImg_Y\":\"0\",\"BackGroundSetting2\":\"------------------------------\",\"BackGroundImg\":\"\",\"BackUiWidth2\":\"true\"}","{\"StyleName\":\"'Type4'\",\"WindowUiIgnore\":\"false\",\"StatusSetting\":\"------------------------------\",\"StatusList\":\"[\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"ActorName\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"168\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"HpGauge\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"120\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"MpGauge\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"120\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"44\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"TpGauge\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"120\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"68\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"'$dataSystem.optDisplayTp'//TP表示\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"Level\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'right'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"State\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"160\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"144\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"Class\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"120\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"168\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Decimal\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BattleMemberOpacity\\\\\\\":\\\\\\\"true\\\\\\\"}\\\"]\",\"StatusWindowBesidePosition\":\"'left'\",\"StatusWindowVerticalPosition\":\"'top'\",\"StatusWindowCommandDifference\":\"'beside'\",\"MenuStatusX\":\"0\",\"MenuStatusY\":\"96\",\"MenuStatusWidth\":\"0\",\"MenuCols\":\"2\",\"MenuRows\":\"2\",\"MenuStatusHeight\":\"468\",\"WindowVisible\":\"true\",\"InfoSetting\":\"------------------------------\",\"MenuInfoWindowSetting\":\"[\\\"{\\\\\\\"MethodName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ListDateSetting\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Width\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Height\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"InfoCols\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"InfoRows\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"InfoFontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"WindowBesidePosition\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"WindowVerticalPosition\\\\\\\":\\\\\\\"'top'\\\\\\\",\\\\\\\"WindowVisible\\\\\\\":\\\\\\\"true\\\\\\\"}\\\"]\",\"ListData1_10\":\"------------------------------\",\"PageList1\":\"[\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"CurrentLocation\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"現在地:\\\\\\\",\\\\\\\"DataEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"InfoIcon\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ContentsFontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"Playtime\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"160\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"プレイ時間:\\\\\\\",\\\\\\\"DataEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'right'\\\\\\\",\\\\\\\"InfoIcon\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ContentsFontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"CommandDescription\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DataEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'right'\\\\\\\",\\\\\\\"InfoIcon\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ContentsFontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"Gold\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DataEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'right'\\\\\\\",\\\\\\\"InfoIcon\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ContentsFontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"PageList2\":\"[]\",\"PageList3\":\"[]\",\"PageList4\":\"[]\",\"PageList5\":\"[]\",\"PageList6\":\"[]\",\"PageList7\":\"[]\",\"PageList8\":\"[]\",\"PageList9\":\"[]\",\"PageList10\":\"[]\",\"MenuCommandSetting\":\"------------------------------\",\"MenuCommandPosition\":\"'right'\",\"MenuCommandCols\":\"1\",\"MenuCommandRows\":\"0\",\"MenuCommandX\":\"0\",\"MenuCommandY\":\"96\",\"MenuCommandWidth\":\"240\",\"MenuCommandHeight\":\"468\",\"CommandHeightMode\":\"false\",\"CommandWindowVisible\":\"true\",\"ActorSetting\":\"------------------------------\",\"GraphicMode\":\"'face'\",\"ActorsImgList\":\"[]\",\"ActorPictureEXApp\":\"false\",\"ActorImg_X\":\"0\",\"ActorImg_Y\":\"0\",\"BackGroundSetting2\":\"------------------------------\",\"BackGroundImg\":\"\",\"BackUiWidth2\":\"true\"}"]
 * @type struct<MenuLayoutList>[]
 * @parent MenuWindowSetting
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
 * @param SubMemberOpacity
 * @text 控えメンバー不透明表示
 * @desc 控えメンバーを不透明で表示します。
 * @type boolean
 * @default true
 * @parent Setting
 * 
 * @param HelpSetting
 * @text コマンドヘルプ設定
 * @default ------------------------------
 * 
 * @param HelpList
 * @desc コマンドヘルプ項目設定
 * @text コマンドヘルプ項目設定
 * @type struct<HelpListData>[]
 * @default ["{\"HelpCommandName\":\"'アイテム'\",\"HelpCommandText\":\"所持しているアイテムを表示します。\"}","{\"HelpCommandName\":\"'スキル'\",\"HelpCommandText\":\"スキルを表示します。\"}","{\"HelpCommandName\":\"'装備'\",\"HelpCommandText\":\"装備を変更します。\"}","{\"HelpCommandName\":\"'ステータス'\",\"HelpCommandText\":\"アクターのステータスを表示します。\"}","{\"HelpCommandName\":\"'オプション'\",\"HelpCommandText\":\"ゲームの設定を変更します。\"}","{\"HelpCommandName\":\"'並び替え'\",\"HelpCommandText\":\"メンバーの並び替えを行います。\"}","{\"HelpCommandName\":\"'セーブ'\",\"HelpCommandText\":\"データを記録します。\"}","{\"HelpCommandName\":\"'ゲーム終了'\",\"HelpCommandText\":\"ゲームを終了します。\"}"]
 * @parent HelpSetting
 * 
 * @param ExpgaugeSetting
 * @text 経験値ゲージ設定
 * @default ------------------------------
 * 
 * @param ExpDisplayMode
 * @text 経験値ゲージの表示
 * @desc 経験値ゲージの表示を指定します。
 * @type select
 * @option 表示なし
 * @value 0
 * @option 次のレベルまでの必要経験値
 * @value 1
 * @option 現在の獲得経験値
 * @value 2
 * @option 現在の獲得経験値の百分率表示
 * @value 3
 * @option レベル表示(サークルゲージのみ)
 * @value 4
 * @default 1
 * @parent ExpgaugeSetting
 * 
 * @param LabelShow
 * @text ラベル表示
 * @desc ラベルを表示します
 * @type boolean
 * @default true
 * @parent ExpgaugeSetting
 * 
 * @param EXPDecimal
 * @text 経験値小数点桁数
 * @desc 経験値の表示出来る小数点桁数。
 * @type number
 * @default 2
 * @min 0
 * @max 99
 * @parent ExpgaugeSetting
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
 * @text 背景画像1背景サイズをUIに合わせる
 * @desc 背景画像1の背景サイズをUIに合わせる。
 * @type boolean
 * @default true
 * @parent BackGroundSetting
 * 
 * 
 */
/*~struct~MenuLayoutList:ja
 * 
 * @param StyleName
 * @desc メニューレイアウトのスタイル名。
 * @text メニューレイアウトスタイル
 * @type combo
 * @option 'Default'
 * @default 'Default'
 * 
 * @param WindowUiIgnore
 * @text UIウィンドウ基準無効
 * @desc ウィンドウの配置をUI基準ではなく画面基準にします。
 * @type boolean
 * @default false
 * 
 * @param StatusSetting
 * @text メニューステータス設定
 * @default ------------------------------
 * 
 * @param StatusList
 * @desc ステータス項目設定
 * @text ステータス項目設定
 * @type struct<StatusListData>[]
 * @default 
 * @parent StatusSetting
 * 
 * @param StatusWindowBesidePosition
 * @text ステータスメニューウィンドウ横方向位置
 * @desc ステータスメニューウィンドウの横方向の位置を指定します。
 * @type select
 * @option 指定なし
 * @value 'free'
 * @option 左
 * @value 'left'
 * @option 右
 * @value 'right'
 * @option コマンドの横
 * @value 'command'
 * @default 'left'
 * @parent StatusSetting
 * 
 * @param StatusWindowVerticalPosition
 * @text ステータスメニューウィンドウ縦方向位置
 * @desc ステータスメニューウィンドウの縦方向の位置を指定します。
 * @type select
 * @option 指定なし
 * @value 'free'
 * @option 画面上
 * @value 'top'
 * @option 画面下
 * @value 'under'
 * @option コマンドの上
 * @value 'commandtop'
 * @option コマンドの下
 * @value 'commandunder'
 * @default 'top'
 * @parent StatusSetting
 * 
 * @param StatusWindowCommandDifference
 * @text コマンドウィンドウ幅分差し引き
 * @desc ウィンドウの幅をコマンドウィンドウの幅分差し引きます。
 * @type select
 * @option 指定なし
 * @value 'none'
 * @option 横方向
 * @value 'beside'
 * @option 縦方向
 * @value 'vertical'
 * @default 'none'
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
 * @param WindowVisible
 * @text ウィンドウ表示
 * @desc ウィンドウを表示する。
 * @type boolean
 * @default true
 * @parent StatusSetting
 * 
 * @param EquipSetting
 * @text 装備設定
 * @default ------------------------------
 * @parent StatusSetting
 * 
 * @param EquipNameVisible
 * @text 装備部位名表示
 * @desc 表示する装備部位名を指定します。
 * @type select
 * @option なし
 * @value None
 * @option 部位のみ
 * @value Name
 * @option アイコンのみ
 * @value Icon
 * @option アイコン、部位
 * @value IconName
 * @default Name
 * @parent EquipSetting
 * 
 * @param EquipIcons
 * @type struct<EquipIconsData>[]
 * @text 装備アイコン
 * @desc 装備アイコンを設定します。IDは装備スロットの番号と同じです。
 * @default []
 * @parent EquipSetting
 * 
 * @param InvalidSlotHide
 * @text 封印装備非表示
 * @desc 特徴で封印されている装備を表示しません。
 * @type boolean
 * @default false
 * @parent EquipSetting
 * 
 * @param InfoSetting
 * @text メニューインフォ設定
 * @default ------------------------------
 * 
 * @param MenuInfoWindowSetting
 * @desc インフォ項目設定
 * @text インフォ項目設定
 * @type struct<InfoWindowList>[]
 * @default 
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
 * @default []
 * @parent ListData1_10
 *  
 * @param PageList2
 * @desc 表示するリスト。
 * @text 表示リスト２
 * @type struct<InfoListData>[]
 * @default []
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
 * 
 * @param MenuCommandSetting
 * @text メニューコマンド設定
 * @default ------------------------------
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
 * @param CommandHeightMode
 * @text ウィンドウ高さモード
 * @desc メニューコマンドウィンドウの高さをコマンド数に合わせます。
 * @type boolean
 * @default true
 * @parent MenuCommandSetting
 * 
 * @param CommandWindowVisible
 * @text ウィンドウ表示
 * @desc ウィンドウを表示する。
 * @type boolean
 * @default true
 * @parent MenuCommandSetting
 * 
 * @param SkipSelectOneMember
 * @text 一人メンバー選択スキップ
 * @desc メンバーが一人のみの場合、アクターの対象選択をスキップします。
 * @type boolean
 * @default false
 * @parent MenuCommandSetting
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
 * @param BackGroundSetting2
 * @text 背景設定2
 * @default ------------------------------
 * 
 * @param BackGroundImg
 * @desc 背景画像１の手前に表示する背景画像ファイル名を指定します。
 * @text 背景画像２
 * @type file
 * @dir img/
 * @default 
 * @parent BackGroundSetting2
 * 
 * @param BackUiWidth2
 * @text 背景画像2背景サイズをUIに合わせる
 * @desc 背景画像2の背景サイズをUIに合わせる。
 * @type boolean
 * @default true
 * @parent BackGroundSetting2
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
 * @option CircularHP(2)(3)(4)(5)(6)(7)(21)(23)(24)
 * @value HpCircularGauge
 * @option CircularMP(2)(3)(4)(5)(6)(7)(21)(23)(24)
 * @value MpCircularGauge
 * @option CircularTP(2)(3)(4)(5)(6)(7)(21)(23)(24)
 * @value TpCircularGauge
 * @option 現在の経験値(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)(14)(15)
 * @value ExpInfo
 * @option 次のレベルまでの経験値(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)(14)(15)
 * @value Exp
 * @option 経験値ゲージ(1)(2)(3)(4)(5)(6)(7)(21)
 * @value ExpGauge
 * @option 経験値サークルゲージ (1)(2)(3)(4)(5)(6)(7)(21)
 * @value ExpCircularGauge
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
 * @option 装備(1)(2)(3)(4)(5)(6)(7)(8)(13)
 * @value Equip
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
/*~struct~InfoListData:ja
 *
 * @param DateSelect
 * @text 表示する項目
 * @desc 表示する項目を指定します。
 * @type select
 * @option なし
 * @value None
 * @option プレイ時間(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(13)(14)(15)
 * @value Playtime
 * @option 所持金(1)(2)(3)(4)(5)(6)(7)(8)(11)(13)(14)(15)
 * @value Gold
 * @option 現在地(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(13)(14)(15)
 * @value CurrentLocation
 * @option 独自パラメータ(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(13)(14)(15)
 * @value OrgParam
 * @option 名称のみ(1)(2)(3)(4)(5)(7)(8)(10)(11)(13)(15)
 * @value Name
 * @option メニューコマンド説明(1)(2)(3)(4)(5)(7)(8)
 * @value CommandDescription
 * @option フリーテキスト(1)(2)(3)(4)(12)
 * @value Freetext
 * @option 行動目標（要メニュー画面行動目標表示）(1)(2)(3)(4)(6)(7)(8)(11)(13)(15)
 * @value Destination
 * @option キャプター（要チャプターテキスト）(1)(2)(3)(4)(6)(7)(8)(11)(13)(15)
 * @value Chapter
 * @option リミットゲージ（要NUUN_PartyLimitGauge）(1)(2)(3)(4)(5)
 * @value Limit_Gauge
 * @option ライン(1)(2)(3)(4)(5)(7)
 * @value HorzLine
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
 * @type color
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
 * @type icon
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
 * @text ウィンドウ横幅
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
 * @param WindowBesidePosition
 * @desc ウィンドウの横方向の表示基準位置を指定します。
 * @text ウィンドウ横方向表示基準位置
 * @type select
 * @option 指定なし
 * @value 'free'
 * @option 左
 * @value 'left'
 * @option 右
 * @value 'right'
 * @default 'left'
 * 
 * @param WindowVerticalPosition
 * @desc ウィンドウの縦方向の表示基準位置を指定します。
 * @text ウィンドウ縦方向表示基準位置
 * @type select
 * @option 指定なし
 * @value 'free'
 * @option 画面上
 * @value 'top'
 * @option 画面下
 * @value 'under'
 * @default 'top'
 * 
 * @param WindowVisible
 * @text ウィンドウ表示
 * @desc ウィンドウを表示する。
 * @type boolean
 * @default true
 * 
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
 * @text アクター画像※2
 * @desc アクターの画像を表示します。立ち絵を切り替える場合はリストに画像を設定してください。(顔グラ表示OFF)
 * @type file
 * @dir img/
 * @default 
 * 
 * @param FaceImg
 * @text 顔グラ画像※2
 * @desc 顔グラ画像のスプライトシートを設定します。(顔グラ表示ON)
 * @type file
 * @dir img/faces
 * 
 * @param FaceIndex
 * @desc 顔グラのインデックスID。
 * @text 顔グラインデックスID※2
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
Imported.NUUN_MenuScreenEX = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_MenuScreenEX');
    Nuun_PluginParams.getPluginParams(document.currentScript);
    const _menutemp = new Nuun_TempParam();

    const MenuLayoutStyle = DataManager.nuun_structureData(parameters['MenuLayoutStyle']);
    const MenuLayout = DataManager.nuun_structureData(parameters['MenuLayout']);
    const DecimalMode= eval(parameters['DecimalMode'] || "false");
    const SubMemberOpacity = eval(parameters['SubMemberOpacity'] || "true");
    const BackGroundImges = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['BackGroundImges'])) : null) || [];
    const BackUiWidth1 = eval(parameters['BackUiWidth1'] || "true");
    const HelpList = DataManager.nuun_structureData(parameters['HelpList']);
    const ExpDisplayMode = Number(parameters['ExpDisplayMode'] || 1);
    const EXPDecimal = Number(parameters['EXPDecimal'] || 2);
    const LabelShow = eval(parameters['LabelShow'] || "true");

    let menuTextMode = null;
    let menuAlign = null;
    let _commandName = '';
    let _commandText = '';
    let _menuLayout = {};

    pluginName = "NUUN_MenuScreenEX";
    PluginManager.registerCommand(pluginName, 'ChangeBackgroundId', args => {
        $gameSystem.menuBackgroundId = Number(args.backgroundId);
    });


    function getMenuLayout() {
        return MenuLayout.find(layout => layout.StyleName === MenuLayoutStyle);
    };

    function setTepmData(data) {
        _menutemp.setData(data);
    };

    const _Scene_Menu_initialize = Scene_Menu.prototype.initialize;
    Scene_Menu.prototype.initialize = function() {
        this.initMenuLayout();
        _Scene_Menu_initialize.call(this);
    };

    Scene_MenuBase.prototype.initMenuLayout = function() {
        this._menuLayout = getMenuLayout();
        _menuLayout = this._menuLayout;
        try {
            this._menuLayout.StyleName;
        } catch (error) {
            const log = $gameSystem.isJapanese() ? "データが存在しません。" : "Data does not exist.";
            throw ["DataError", log];
        }
    };

    Scene_Menu.prototype.isRightInputMode = function() {
        return this._menuLayout.MenuCommandPosition === 'right';
    };

    Scene_Menu.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createCommandWindow();
        this.createStatusWindow();
        this.createInfoWindow();
    };

    Scene_Menu.prototype.statusWindowRect = function() {
        const wx = this.nuun_statusWindowX();
        const wy = this.nuun_statusWindowY();
        const ww = this.nuun_statusWindowWidth();
        const wh = this.nuun_statusWindowHeight();
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_MenuBase.prototype.nuun_statusWindowX = function() {
        switch (this._menuLayout.StatusWindowBesidePosition) {
            case 'free':
            case 'left':
                return this._menuLayout.MenuStatusX + (this.isWindowUiIgnore() ? (Graphics.boxWidth - Graphics.width) / 2 : 0);
            case 'right':
                return (this.isWindowUiIgnore() ? Graphics.width + (Graphics.boxWidth - Graphics.width) / 2 : Graphics.boxWidth) - this.nuun_infoWindowWidth(data) + this._menuLayout.MenuStatusX;
            case 'command':
                return this._menuLayout.MenuStatusX + this.nuun_mainCommandX() + (this.isRightInputMode() ? -this.nuun_statusWindowWidth() : this.nuun_mainCommandWidth());
        }
    };

    Scene_MenuBase.prototype.nuun_statusWindowY = function() {
        switch (this._menuLayout.StatusWindowVerticalPosition) {
            case 'free':
            case 'top':
                return this._menuLayout.MenuStatusY + (this.isWindowUiIgnore() ? 0 : this.nuun_menuHelpAreaHeight());
            case 'under':
                return (this.isWindowUiIgnore() ? Graphics.height + ((Graphics.boxHeight - Graphics.height) / 2) : Graphics.boxHeight) - this.nuun_infoWindowHeight(data) + this._menuLayout.MenuStatusY;
            case 'commandtop':
                return this._menuLayout.MenuStatusY + this.nuun_mainCommandY() - this.nuun_statusWindowHeight();
            case 'commandunder':
                return this._menuLayout.MenuStatusY + this.nuun_mainCommandY() + this.nuun_mainCommandHeight()
            }
    };

    Scene_MenuBase.prototype.nuun_statusWindowWidth = function() {
        return this.isWindowUiIgnore() ? (this._menuLayout.MenuStatusWidth > 0 ? this._menuLayout.MenuStatusWidth : Graphics.width) : (this._menuLayout.MenuStatusWidth > 0 ? this._menuLayout.MenuStatusWidth : Graphics.boxWidth) + (this.nuun_statusWindowIsCommandBesideDifference() ? -this.nuun_mainCommandWidth() : 0);
    };

    Scene_MenuBase.prototype.nuun_statusWindowHeight = function() {
        return (this._menuLayout.MenuStatusHeight > 0 ? this._menuLayout.MenuStatusHeight : (this.isWindowUiIgnore() ? Graphics.height : Graphics.boxHeight - this.nuun_menuHelpAreaHeight())) + (this.nuun_statusWindowIsCommandVerticalDifference() ? -(this.nuun_mainCommandHeight()) : 0);
    };

    Scene_MenuBase.prototype.nuun_statusWindowIsCommandBesideDifference = function() {
        return this._menuLayout.StatusWindowCommandDifference === 'beside';
    };

    Scene_MenuBase.prototype.nuun_statusWindowIsCommandVerticalDifference = function() {
        return this._menuLayout.StatusWindowCommandDifference === 'vertical';
    };

    const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _Scene_Menu_createCommandWindow.call(this);
        _commandName = null;
        if (this._menuLayout.CommandHeightMode) {
            this._commandWindow.maxItemsHeight();
        }
        if (!this._menuLayout.CommandWindowVisible) {
            this._commandWindow.opacity = 0;
        }
    };

    const _Scene_Menu_createStatusWindow = Scene_Menu.prototype.createStatusWindow;
    Scene_Menu.prototype.createStatusWindow = function() {
        _Scene_Menu_createStatusWindow.call(this);
        if (!this._menuLayout.WindowVisible) {
            this._statusWindow.opacity = 0;
        }
    };

    Scene_Menu.prototype.createInfoWindow = function() {
        const list = this._menuLayout.MenuInfoWindowSetting;
        list.forEach((data, i) => {
            if (data.ListDateSetting > 0) {
                const method = '_infoSideMenuWindow'+ !!data.MethodName ? data.MethodName : [i];
                const pageMethod = 'PageList' + data.ListDateSetting;
                const rect = this.infoWindowRect(data);
                const window = new Window_InfoMenu(rect, this._menuLayout[pageMethod], data.MethodName);
                this[method] = window;
                this.addWindow(window);
                window.setup(data.InfoCols, data.InfoFontSize);
                if (!data.WindowVisible) {
                    window.opacity = 0;
                }
            }
        });
    };

    Scene_Menu.prototype.infoWindowRect = function(data) {
        const ww = this.nuun_infoWindowWidth(data);
        const wx = this.nuun_infoWindowX(data);
        const wy = this.nuun_infoWindowY(data);
        const wh = this.nuun_infoWindowHeight(data);
        return new Rectangle(wx, wy, ww, wh);
    };
    
    Scene_Menu.prototype.nuun_infoWindowX = function(data) {
        switch (data.WindowBesidePosition) {
            case 'free':
            case 'left':
                return data.X_Position + (this.isWindowUiIgnore() ? (Graphics.boxWidth - Graphics.width) / 2 : 0);
            case 'right':
                return (this.isWindowUiIgnore() ? Graphics.width + (Graphics.boxWidth - Graphics.width) / 2 : Graphics.boxWidth) - this.nuun_infoWindowWidth(data) + data.X_Position;
        }
    };

    Scene_Menu.prototype.nuun_infoWindowY = function(data) {
        switch (data.WindowVerticalPosition) {
            case 'free':
            case 'top':
                return  data.Y_Position + (this.isWindowUiIgnore() ? 0 : this.nuun_menuHelpAreaHeight());
            case 'under':
                return (this.isWindowUiIgnore() ? Graphics.height + ((Graphics.boxHeight - Graphics.height) / 2) : Graphics.boxHeight) - this.nuun_infoWindowHeight(data) + this._menuLayout.MenuCommandY;
        }
    };

    Scene_Menu.prototype.nuun_infoWindowWidth = function(data) {
        return this.isWindowUiIgnore() ? (data.Width > 0 ? data.Width : Graphics.width) : (data.Width > 0 ? data.Width : Graphics.boxWidth);
    };

    Scene_Menu.prototype.nuun_infoWindowHeight = function(data) {
        if (data.InfoRows > 0) {
            return this.nuun_infoAreaHeight(data.InfoRows);
        } else {
            return data.Height > 0 ? data.Height : (this.isWindowUiIgnore() ? Graphics.height : Graphics.boxHeight - this.nuun_menuHelpAreaHeight());
        }
    };

    Scene_Menu.prototype.commandWindowRect = function() {
        const wx = this.nuun_mainCommandX();
        const wy = this.nuun_mainCommandY();
        const ww = this.nuun_mainCommandWidth();
        const wh = this.nuun_mainCommandHeight();
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_MenuBase.prototype.nuun_mainCommandX = function() {
        switch (this._menuLayout.MenuCommandPosition) {
            case 'free':
            case 'left':
            case 'top':
            case 'under':
                return (this.isWindowUiIgnore() ? (Graphics.boxWidth - Graphics.width) / 2 : 0) + this._menuLayout.MenuCommandX;
            case 'right':
                return (this.isWindowUiIgnore() ? Graphics.width + (Graphics.boxWidth - Graphics.width) / 2 : Graphics.boxWidth) - this.nuun_mainCommandWidth() + this._menuLayout.MenuCommandX;
        }
    };

    Scene_MenuBase.prototype.nuun_mainCommandY = function() {
        switch (this._menuLayout.MenuCommandPosition) {
            case 'free':
            case 'left':
            case 'top':
            case 'right':
                return (this.isWindowUiIgnore() ? (Graphics.boxHeight - Graphics.height) / 2 : this.nuun_menuHelpAreaHeight()) + this._menuLayout.MenuCommandY;
            case 'under':
                return (this.isWindowUiIgnore() ? Graphics.height + ((Graphics.boxHeight - Graphics.height) / 2) : Graphics.boxHeight) - this.nuun_mainCommandHeight() + this._menuLayout.MenuCommandY;
        }
    };

    Scene_MenuBase.prototype.nuun_mainCommandWidth = function() {
        const m = this._menuLayout;
        return m.MenuCommandWidth > 0 ? m.MenuCommandWidth : (this.isWindowUiIgnore() ? Graphics.width : Graphics.boxWidth);
    };

    Scene_MenuBase.prototype.nuun_mainCommandHeight = function() {
        const m = this._menuLayout;
        return m.CommandHeightMode ? (m.MenuCommandRows > 0 ? this.nuun_mainCommandAreaHeight(m.MenuCommandRows) : this.mainAreaHeight()) : (m.MenuCommandHeight > 0 ? m.MenuCommandHeight : this.mainAreaHeight());
    };

    Scene_MenuBase.prototype.nuun_mainCommandAreaHeight = function(rows) {
        return this.calcWindowHeight(rows, true);
    };

    Scene_MenuBase.prototype.isWindowUiIgnore = function() {
        return this._menuLayout.WindowUiIgnore;
    };

    Scene_Menu.prototype.isBesideMenuCommand = function() {
        return this._menuLayout.MenuCommandPosition === 'under' || this._menuLayout.MenuCommandPosition === 'top';
    };

    Scene_Menu.prototype.nuun_infoAreaHeight = function(rows) {
        return this.calcWindowHeight(rows, false);
    };
    
    Scene_MenuBase.prototype.nuun_menuHelpAreaHeight = function() {
        return this.mainAreaTop();
    };

    Scene_Menu.prototype.createBackground = function() {
        Scene_MenuBase.prototype.createBackground.call(this);
        if (!$gameSystem.menuBackgroundId) {
            $gameSystem.menuBackgroundId = 0;
        }
        const data = $dataMap;
        const backgroundId = ($gameSystem.menuBackgroundId > 0 ? $gameSystem.menuBackgroundId : ($dataMap && $dataMap.meta.MenuBackgroundId ? Number(data.meta.MenuBackgroundId) : $gameSystem.menuBackgroundId)) || 1;
        const img = BackGroundImges ? BackGroundImges[backgroundId - 1] : null;
        if (img) {
            const sprite = new Sprite();
            sprite.bitmap = ImageManager.nuun_LoadPictures(img);
            this.addChild(sprite);
            if (sprite.bitmap && !sprite.bitmap.isReady()) {
                sprite.bitmap.addLoadListener(this.setBackGround.bind(this, sprite, BackUiWidth1));
            } else {
                this.setBackGround(sprite, BackUiWidth1);
            }
        }
        if (this._menuLayout && this._menuLayout.BackGroundImg) {
            const sprite = new Sprite();
            sprite.bitmap = ImageManager.nuun_LoadPictures(this._menuLayout.BackGroundImg);
            this.addChild(sprite);
            if (sprite.bitmap && !sprite.bitmap.isReady()) {
                sprite.bitmap.addLoadListener(this.setBackGround.bind(this, sprite, this._menuLayout.BackUiWidth2));
            } else {
                this.setBackGround(sprite, this._menuLayout.BackUiWidth2);
            }
        }
    };

    const _Scene_Menu_update = Scene_Menu.prototype.update;
    Scene_Menu.prototype.update = function() {
	    _Scene_Menu_update.call(this);
        this.updateCommandName();
    };

    Scene_Menu.prototype.setBackGround = function(sprite, mode) {
        if (mode) {
            sprite.x = (Graphics.width - (Graphics.boxWidth + 8)) / 2;
            sprite.y = (Graphics.height - (Graphics.boxHeight + 8)) / 2;
            sprite.scale.x = (Graphics.boxWidth + 8 !== sprite.bitmap.width ? (Graphics.boxWidth + 8) / sprite.bitmap.width : 1);
            sprite.scale.y = (Graphics.boxHeight + 8 !== sprite.bitmap.height ? (Graphics.boxHeight + 8) / sprite.bitmap.height : 1);
        } else {
            sprite.scale.x = (Graphics.width !== sprite.bitmap.width ? Graphics.width / sprite.bitmap.width : 1);
            sprite.scale.y = (Graphics.height !== sprite.bitmap.height ? Graphics.height / sprite.bitmap.height : 1);
        }
    };

    Scene_Menu.prototype.updateCommandName = function() {
        const commandName = this._commandWindow.currentData().name;
        if (_commandName !== commandName) {
            _commandName = commandName;
            const find = HelpList.find(data => data.HelpCommandName === commandName);
            _commandText = find && find.HelpCommandText ? find.HelpCommandText : "";
        }
    };

    const _Scene_Menu_commandPersonal = Scene_Menu.prototype.commandPersonal;
    Scene_Menu.prototype.commandPersonal = function() {
        if (this._menuLayout.SkipSelectOneMember && $gameParty.size() === 1) {
            this.onPersonalOk();
        } else {
            _Scene_Menu_commandPersonal.call(this);
        }
    };


    const _Scene_ItemBase_initialize = Scene_ItemBase.prototype.initialize;
    Scene_ItemBase.prototype.initialize = function() {
        this.initMenuLayout();
        _Scene_ItemBase_initialize.call(this);
    };

    Scene_ItemBase.prototype.actorWindowRect = function() {
        const wx = this.nuun_statusWindowX();
        const wy = this.nuun_statusWindowY();
        const ww = this.nuun_statusWindowWidth();
        const wh = this.nuun_statusWindowHeight();
        return new Rectangle(wx, wy, ww, wh);
    };

    
    const _Window_MenuCommand_initialize = Window_MenuCommand.prototype.initialize;
    Window_MenuCommand.prototype.initialize = function(rect) {
        _Window_MenuCommand_initialize.call(this, rect);
        this._homeHeight = this.height;
    };

    Window_MenuCommand.prototype.maxItemsHeight = function() {
        const maxItems = Math.max(1, this.maxItems());
        this.height = Math.min(this.fittingHeight(maxItems), this._homeHeight);
    };

    Window_MenuCommand.prototype.maxCols = function() {
        return _menuLayout.MenuCommandCols;
    };


    const _Window_MenuStatus_initialize = Window_MenuStatus.prototype.initialize;
    Window_MenuStatus.prototype.initialize = function(rect) {
        this._actorsBitmap = [];
        this.language_Jp = $gameSystem.isJapanese();
        _Window_MenuStatus_initialize.call(this, rect);
        this.nuun_loadImages();
    };

    Window_MenuStatus.prototype.nuun_loadImages = function() {
        for (const actor of $gameParty.allMembers()) {
            let data = null;
            if (this.isActorPictureEXApp()) {
                actor.resetImgId();
                data = this.getActorImgData(actor);
                actor.loadActorFace();
                actor.loadActorGraphic();
            } else {
                data = this.getActorImgData(actor);
                ImageManager.loadFace(data.FaceImg);
                ImageManager.nuun_LoadPictures(data.ActorImg);
            }
            if (data && data.ActorBackImg) {
                ImageManager.nuun_LoadPictures(data.ActorBackImg);
            }
            if (data && data.ActorFrontImg) {
                ImageManager.nuun_LoadPictures(data.ActorFrontImg);
            }
        }
    };

    Window_MenuStatus.prototype.isActorPictureEXApp = function() {
        return Imported.NUUN_ActorPicture && _menuLayout.ActorPictureEXApp;
    };

    Window_MenuStatus.prototype.numVisibleRows = function() {
        return _menuLayout.MenuRows;
    };

    Window_MenuStatus.prototype.maxCols = function() {
        return _menuLayout.MenuCols;
    };

    Window_StatusBase.prototype.nuunMenu_maxContentsCols = function() {
        return 1;
    };

    Window_StatusBase.prototype.nuunMenu_itemContentsWidth = function(width) {
        return Math.floor(width / this.nuunMenu_maxContentsCols()) - this.colSpacing() - 4;
    };

    Window_StatusBase.prototype.nuunMenu_systemWidth = function(swidth, width) {
        return swidth > 0 ? swidth : Math.floor(width / 3);
    };

    Window_MenuStatus.prototype.isSubMemberOpacity = function(actor) {
        return SubMemberOpacity ? actor.isBattleMember() : true;
    };

    Window_StatusBase.prototype.getMenuLayoutActorsImgList = function() {
        return _menuLayout.ActorsImgList;
    };

    Window_MenuStatus.prototype.drawItemBackground = function(index) {
        const actor = this.actor(index);
        const data = this.getActorImgData(actor);
        if (data && data.ActorBackImg) {
            const bitmap = ImageManager.nuun_LoadPictures(data.ActorBackImg);
            if (bitmap && !bitmap.isReady()) {
                bitmap.addLoadListener(this.drawActorBack.bind(this, bitmap, index));
            } else {
                this.drawActorBack(bitmap, index);
            }
        } else {
            Window_Selectable.prototype.drawItemBackground.call(this, index);
        }
    };

    Window_MenuStatus.prototype.drawItemImage = function(index) {
        const actor = this.actor(index);
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
                this.drawActorGraphic(data, bitmap, rect.x, rect.y, rect.width, rect.height, actor);
            }.bind(this));
        } else {
            this.drawActorFront(data, rect.x, rect.y, rect.width, rect.height);
        }
        
    };

    Window_MenuStatus.prototype.drawActorGraphic = function(data, bitmap, x, y, width, height, actor) {
        this.changePaintOpacity(this.isSubMemberOpacity(actor));
        if (data.GraphicMode === 'face') {
            this.nuunMenu_contentsDrawActorFace(actor, data, x, y, width, height);
        } else {
            this.nuunMenu_contentsDrawActorGraphic(actor, data, bitmap, x, y, width, height);
        }
        this.changePaintOpacity(true);
        this.drawActorFront(data, x, y, width, height);
    };

    Window_MenuStatus.prototype.drawActorFront = function(data, x, y, width, height) {
        const frontBitmapImg = data ? data.ActorFrontImg : null;
        if (frontBitmapImg) {
            const frontBitmap = ImageManager.nuun_LoadPictures(frontBitmapImg);
            frontBitmap.addLoadListener(function() {
                this.drawContentsActorFront(frontBitmap, x, y, width, height);
            }.bind(this));
        }
    };

    Window_StatusBase.prototype.nuunMenu_contentsDrawActorFace = function(actor, data, x, y, width, height) {
        width = Math.min(width, ImageManager.faceWidth);
        height = height - 2;
        this.nuunMenu_drawActorFace(actor, x, y, width, height, data);
    };

    Window_MenuStatus.prototype.drawContentsActorFront = function(bitmap, x, y, width, height) {
        this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, width, height);
    };

    Window_StatusBase.prototype.nuunMenu_getMenuGraphicMode = function() {
        return _menuLayout.GraphicMode;
    };

    Window_MenuStatus.prototype.drawActorBack = function(bitmap, index) {
        const rect = this.itemRect(index);
        this.contentsBack.nuun_contentsBackBlt(bitmap, 0, 0, rect.width, rect.height, rect.x + 1, rect.y + 1, rect.width - 2, rect.height - 2, 100, true);
    };

    Window_MenuStatus.prototype.createApngSprite = function(actor, index, data, rect) {
        if (!this._actorsBitmap[index]) {
            const sprite = new Sprite_MenuActorImg();
            this.nuun_addClientAreaSprite(sprite);
            this._actorsBitmap[index] = sprite;
        }
        const sprite = this._actorsBitmap[index];
        sprite.setup(actor, data);
        sprite.move(rect.x + 50, rect.y, rect.width, rect.height);
    };

    Window_MenuStatus.prototype.getActorImgData = function(actor) {
        const list = _menuLayout.ActorsImgList;
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
                GraphicMode: _menuLayout.GraphicMode, 
                FaceIndex : -1,
                ActorImg: null,
                FaceImg: actor.faceName()
            }
        } else if (find.GraphicMode === 'default' || !find.GraphicMode) {
            find.GraphicMode = _menuLayout.GraphicMode;
        }
        return find;
    };

    Window_StatusBase.prototype.condActorImg = function(data, actor) {
        if (this.isActorPictureEXApp()) {
            return data.actorId === actor.actorId();
        } else {
            if (data.ClassId && data.ClassId > 0 && actor._classId === data.ClassId) {
                return true;
            } else if (data.actorId === actor.actorId()) {
                return true;
            }
        }
        return false;
    };

    Window_MenuStatus.prototype.addChildToBack2 = function(child) {
        return this.contents.addChild(child);
    };

    Window_StatusBase.prototype.nuunMenu_loadContentsImg = function(data) {
        return ImageManager.nuun_LoadPictures(data.ImgData);
    };

    Window_MenuStatus.prototype.getStatusList = function() {
        return _menuLayout.StatusList;
    };

    Window_MenuStatus.prototype.drawItemStatus = function(index) {
        this.nuunMenu_drawItemContents(index);
    };

    Window_MenuStatus.prototype.getDecimalMode = function() {
        return DecimalMode;
    };

    Window_StatusBase.prototype.nuunMenu_drawItemContents = function(index) {
        let bitmap = null;
        let loadBitmap = null;
        const list = this.getStatusList();
        for (const data of list) {
            switch (data.DateSelect) {
                case "Imges":
                    loadBitmap = this.nuunMenu_loadContentsImg(data);
                    break;
            }
            if (loadBitmap && !loadBitmap.isReady()) {
                bitmap = loadBitmap;
            }
            if (bitmap && !bitmap.isReady()) {
                bitmap.addLoadListener(this.nuunMenu_drawItemContentsStatus.bind(this, index))
                return;
            } else {
                this.nuunMenu_drawItemContentsStatus(index);
            }
        }
    };

    Window_MenuStatus.prototype.nuunMenu_drawItemContentsStatus = function(index) {
        const actor = this.actor(index);
        const rect = this.itemRect(index);
        const itemWidth = this.nuunMenu_itemContentsWidth(rect.width);
        const lineHeight = this.lineHeight();
        const colSpacing = this.colSpacing();
        const list = this.getStatusList();
        for (const data of list) {
        const x_Position = data.X_Position;
        const position = Math.min(x_Position, this.nuunMenu_maxContentsCols());
        const contentsX = rect.x + (itemWidth + colSpacing) * (position - 1) + data.X_Coordinate + colSpacing;
        const contentsY = rect.y + lineHeight * (data.Y_Position - 1) + data.Y_Coordinate + this.itemPadding();
        const width = data.ItemWidth && data.ItemWidth > 0 ? Math.min(data.ItemWidth, rect.width - contentsX) : Math.min(itemWidth, rect.width - contentsX);
        data._width = data.ItemWidth && data.ItemWidth > 0 ? Math.min(data.ItemWidth, width) : Math.min(width, 128);
        this.nuunMenu_drawContentsBase(data, contentsX, contentsY, width - colSpacing / 2, actor);
        }
    };

    Window_StatusBase.prototype.nuunMenu_drawContentsBase = function(data, x, y, width, battler) {
        if (this.nuunMenu_isContents(data, battler)) {
            setTepmData(data)
            const method = 'nuun_DrawMenuStatusContents' + data.DateSelect;
            try {
                this[method](data, x, y, width, battler);
            } catch (error) {
                const log = ($gameSystem.isJapanese() ? "無効なIDが設定されています。" : "An invalid ID has been configured.") + data.DateSelect;
                throw ["DataError", log];
            }
        }
    };

    Window_StatusBase.prototype.nuunMenu_isContents = function(data, actor) {
        if (!data.Conditions) {
            return true;
        }
        return eval(data.Conditions);
    };

    Window_StatusBase.prototype.nuunMenu_paramNameData = function(data, param) {
        if (data.ParamName) {
        return data.ParamName;
        }
        switch (param) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
            return TextManager.param(param);
        case 10:
        case 11:
            return TextManager.param(param - 2);
        case 12:
            return this.language_Jp ? "会心率" : 'Critcal Rate';
        case 13:
            return this.language_Jp ? "会心回避率" : 'Critical Evade';
        case 14:
            return this.language_Jp ? "魔法回避率" : 'Magic Evade';
        case 15:
            return this.language_Jp ? "魔法反射率" : 'Magic Reflect';
        case 16:
            return this.language_Jp ? "反撃率" : 'Counter';
        case 17:
            return this.language_Jp ? "HP再生率" : 'HP Regen';
        case 18:
            return this.language_Jp ? "MP再生率" : 'MP Regen';
        case 19:
            return this.language_Jp ? "TP再生率" : 'TP Regen';
        case 20:
            return this.language_Jp ? "狙われ率" : 'Aggro';
        case 21:
            return this.language_Jp ? "防御効果率" : 'Guard';
        case 22:
            return this.language_Jp ? "回復効果率" : 'Recovery';
        case 23:
            return this.language_Jp ? "薬の知識" : 'Item Effect';
        case 24:
            return this.language_Jp ? "MP消費率" : 'MP Cost';
        case 25:
            return this.language_Jp ? "TPチャージ率" : 'TP Charge';
        case 26:
            return this.language_Jp ? "物理ダメージ率" : 'Physical Damage';
        case 27:
            return this.language_Jp ? "魔法ダメージ率" : 'Magical Damage';
        case 28:
            return this.language_Jp ? "床ダメージ率" : 'Floor Damage';
        case 29:
            return this.language_Jp ? "獲得経験率" : 'EXP Gain';
        case 42:
            return TextManager.param(0);
        case 43:
            return TextManager.param(1);
        default:
            return null;
        }
    };

    Window_Base.prototype.nuun_DrawMenuStatusContentsNone = function(data, x, y, width) {
        
    };

    Window_MenuStatus.prototype.nuun_DrawMenuStatusContentsHorzLine = function(x, y, width, data) {
        const lineY = y + this.lineHeight() / 2 - 1;
        this.contents.paintOpacity = 48;
        this.contents.fillRect(x, lineY, width, 2, NuunManager.getColorCode(data.NameColor));
        this.contents.paintOpacity = 255;
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsActorName = function(data, x, y, width, actor) {
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        menuTextMode = 'name';
        menuAlign = data.Align;
        this.nuun_setContentsFontFace(data);
        Window_StatusBase.prototype.drawActorName.call(this, actor, x, y, width);
        this.resetFontSettings();
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsNickname = function(data, x, y, width, actor) {
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        this.nuun_setContentsFontFace(data);
        this.drawText(actor.nickname(), x, y, width, data.Align);
        this.resetFontSettings();
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsClass = function(data, x, y, width, actor) {
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        this.nuun_setContentsFontFace(data);
        this.drawText(actor.currentClass().name, x, y, width, data.Align);
        this.resetFontSettings();
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsLevel = function(data, x, y, width, actor) {
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        this.nuun_setContentsFontFace(data);
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        this.drawText(TextManager.levelA, x, y, 48);
        this.resetTextColor();
        this.nuun_setContentsValueFontFace(data);
        this.drawText(actor.level, x + 60, y, width - 60, "right");
        this.resetFontSettings();
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsState = function(data, x, y, width, actor) {
        let icons = [];
        let states = [];
        const iconWidth = ImageManager.iconWidth;
        const dataEval = data.DetaEval;
        if (dataEval) {
            const stateList = dataEval.split(',');
            for (const id of stateList) {
                Array.prototype.push.apply(states, this.nuun_getListIdData(id));
            }
            icons = actor.allIcons().filter(icon => states.some(i => $dataStates[i].iconIndex === icon)).slice(0, Math.floor(width / iconWidth));
            let iconX = x;
            for (const icon of icons) {
                this.drawIcon(icon, iconX, y + 2);
                iconX += iconWidth;
            }
        } else {
            Window_StatusBase.prototype.drawActorIcons.call(this, actor, x, y, width);
        }
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsState2 = function(data, x, y, width, actor) {
        const hw = Math.floor(ImageManager.iconWidth / 2);
        this.placeStateIcon(actor, x + hw, y + hw);
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsOrgParam = function(data, x, y, width, actor) {
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        this.nuun_setContentsFontFace(data);
        const nameText = data.ParamName ? data.ParamName : '';
        const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? this.textWidth(nameText) : this.nuunMenu_systemWidth(data.SystemItemWidth, width);
        this.drawText(nameText, x, y, textWidth);
        this.resetTextColor();
        if (data.DetaEval) {
            this.nuun_setContentsValueFontFace(data);
            const padding = textWidth > 0 ? 8 : 0;
            this.nuun_DrawContentsParamUnitText(eval(data.DetaEval), data, x + textWidth + padding, y, width - (textWidth + padding));
        }
        this.resetFontSettings();
    };

    Window_MenuStatus.prototype.nuun_DrawMenuStatusContentsHpGauge = function(data, x, y, width, actor) {
        _menutemp.setType("hp");
        this.nuunMenu_placeGauge(actor, "hp", x, y, "actor%1-gauge-%2");
    };

    Window_MenuStatus.prototype.nuun_DrawMenuStatusContentsMpGauge = function(data, x, y, width, actor) {
        _menutemp.setType("mp");
        this.nuunMenu_placeGauge(actor, "mp", x, y, "actor%1-gauge-%2");
    };

    Window_MenuStatus.prototype.nuun_DrawMenuStatusContentsTpGauge = function(data, x, y, width, actor) {
        if ($dataSystem.optDisplayTp) {
            _menutemp.setType("tp");
            this.nuunMenu_placeGauge(actor, "tp", x, y, "actor%1-gauge-%2");
        }
    };

    Window_MenuStatus.prototype.nuun_DrawMenuStatusContentsExpGauge = function(data, x, y, width, actor) {
        _menutemp.setType("menuexp");
        this.nuunMenu_placeGauge(actor, "menuexp", x, y, "menuExp-%1");
    };

    Window_MenuStatus.prototype.nuun_DrawMenuStatusContentsHpCircularGauge = function(data, x, y, width, actor) {
        _menutemp.setType("hp");
        this.nuunMenu_placeCircularGauge(actor, "hp", x, y, "actor%1-gauge-%2");
    };

    Window_MenuStatus.prototype.nuun_DrawMenuStatusContentsMpCircularGauge = function(data, x, y, width, actor) {
        _menutemp.setType("mp");
        this.nuunMenu_placeCircularGauge(actor, "mp", x, y, "actor%1-gauge-%2");
    };

    Window_MenuStatus.prototype.nuun_DrawMenuStatusContentsTpCircularGauge = function(data, x, y, width, actor) {
        if ($dataSystem.optDisplayTp) {
            _menutemp.setType("tp");
            this.nuunMenu_placeCircularGauge(actor, "tp", x, y, "actor%1-gauge-%2");
        }
    };

    Window_MenuStatus.prototype.nuun_DrawMenuStatusContentsExpCircularGauge = function(data, x, y, width, actor) {
        _menutemp.setType("menuexp");
        this.nuunMenu_placeCircularGauge(actor, "menuexp", x, y, "menuExp-%1");
    };

    Window_StatusBase.prototype.setTempType = function(type) {
        _menutemp.setType(type);
    };

    Window_MenuStatus.prototype.nuun_DrawMenuStatusContentsOrgGauge = function(data, x, y, actor) {
        _menutemp.setType(data.GaugeID);
        this.nuunMenu_placeGauge(actor, data.GaugeID, x, y, "actor%1-gauge-%2");
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsExpInfo = function(data, x, y, width, actor) {
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        const nameText = data.ParamName ? data.ParamName : TextManager.expTotal.format(TextManager.exp);
        const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? this.textWidth(nameText) : this.nuunMenu_systemWidth(data.SystemItemWidth, width);
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        this.nuun_setContentsFontFace(data);
        this.drawText(nameText, x, y, width);
        this.resetTextColor();
        this.nuun_setContentsValueFontFace(data);
        this.nuun_DrawContentsParamUnitText(this.nuun_ExpTotalValue(actor), data, x + textWidth + 8, y, width - (textWidth + 8));
        this.resetFontSettings();
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsExp = function(data, x, y, width, actor) {
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        const nameText = data.ParamName ? data.ParamName : 'NextLv';
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        this.nuun_setContentsFontFace(data);
        const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? this.textWidth(nameText) : this.nuunMenu_systemWidth(data.SystemItemWidth, width);
        this.drawText(nameText, x, y, textWidth);
        this.resetTextColor();
        this.nuun_setContentsValueFontFace(data);
        let textParam = (data.DetaEval ? eval(data.DetaEval) : this.nuun_ExpNextValue(actor));
        this.nuun_DrawContentsParamUnitText(textParam, data, x + textWidth + 8, y, width - (textWidth + 8));
        this.resetFontSettings();
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsEquip = function(data, x, y, width, actor) {
        const equipNameVisible = _menuLayout.EquipNameVisible;
        const lineHeight = this.lineHeight();
        const equips = actor.equips();
        const showEquips = this.getMenuStatusShowEquipList(actor);
        const e1uipsLength = equips.length;
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        let y2 = y;
        let width2 = width;
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        this.nuun_setContentsFontFace(data);
        const nameText = data.ParamName;
        if (nameText) {
            this.drawText(nameText, x + 0, y, width);
            y2 += lineHeight;
        }
        let contentsY = y2;
        for (let i = 0; i < e1uipsLength; i++) {
            const index = i;
            const slotName = this.actorSlotName(actor, index);
            if (slotName && this.isShowSlot(actor, index) && (!showEquips || (showEquips && showEquips.some(data => data === slotName)))) {
                let sw = 0;
                let iconWidth = 0;
                const item = equips[index];
                if (equipNameVisible === "IconName" || equipNameVisible === "Icon") {//アイコン表示
                    const iconId = _menuLayout.EquipIcons && _menuLayout.EquipIcons[i] ? _menuLayout.EquipIcons[i].EquipIconId : 0;
                    if (iconId > 0) {
                    this.drawIcon(iconId, x, contentsY + 2);
                    }
                    iconWidth = ImageManager.iconWidth + (equipNameVisible === "Icon" ? 24 : 4);
                }
                if (equipNameVisible === "Name" || equipNameVisible === "IconName") {//デフォルト
                    sw += this.nuunMenu_systemWidth(data.SystemItemWidth, width);
                    this.changeTextColor(NuunManager.getColorCode(data.NameColor));
                    this.drawText(slotName, x + iconWidth, contentsY, sw);
                }
                sw += iconWidth;
                this.resetTextColor();
                this.drawItemName(item, x + sw, contentsY, width - sw);
                contentsY += lineHeight;
            }
        }
        this.resetFontSettings();
    };

    Window_MenuStatus.prototype.nuun_DrawMenuStatusContentsCharchip = function(data, x, y, width, actor) {
        this.nuunMenu_actorCharacterChip(actor, data, x + 24, y + 48, "actor%1-menuStatusCharacter");
    };
    
    Window_MenuStatus.prototype.nuun_DrawMenuStatusContentsSvActor = function(data, x, y, width, actor) {
        this.nuunMenu_drawSvActorImg(data, x, y, width, actor, "actor%1-menuStatusSvActor");
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsImges = function(data, x, y, width, actor) {
        this.nuunMenu_drawMenuStatusImg(data, x, y, actor);
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsHp = function(data, x, y, width, actor) {
        this.nuunMenu_drawParams(data, 0, x, y, width, actor);
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsMp = function(data, x, y, width, actor) {
        this.nuunMenu_drawParams(data, 1, x, y, width, actor);
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsAtk = function(data, x, y, width, actor) {
        this.nuunMenu_drawParams(data, 2, x, y, width, actor);
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsDef = function(data, x, y, width, actor) {
        this.nuunMenu_drawParams(data, 3, x, y, width, actor);
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsMat = function(data, x, y, width, actor) {
        this.nuunMenu_drawParams(data, 4, x, y, width, actor);
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsMdf = function(data, x, y, width, actor) {
        this.nuunMenu_drawParams(data, 5, x, y, width, actor);
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsAgi = function(data, x, y, width, actor) {
        this.nuunMenu_drawParams(data, 6, x, y, width, actor);
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsLuk = function(data, x, y, width, actor) {
        this.nuunMenu_drawParams(data, 7, x, y, width, actor);
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsHit = function(data, x, y, width, actor) {
        this.nuunMenu_drawXParams(data, 0, x, y, width, actor);
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsEva = function(data, x, y, width, actor) {
        this.nuunMenu_drawXParams(data, 1, x, y, width, actor);
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsCri = function(data, x, y, width, actor) {
        this.nuunMenu_drawXParams(data, 2, x, y, width, actor);
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsCritcalEvade = function(data, x, y, width, actor) {
        this.nuunMenu_drawXParams(data, 3, x, y, width, actor);
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsMagicEvade = function(data, x, y, width, actor) {
        this.nuunMenu_drawXParams(data, 4, x, y, width, actor);
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsMagicrEflect = function(data, x, y, width, actor) {
        this.nuunMenu_drawXParams(data, 5, x, y, width, actor);
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsCounter = function(data, x, y, width, actor) {
        this.nuunMenu_drawXParams(data, 6, x, y, width, actor);
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsHpRegen = function(data, x, y, width, actor) {
        this.nuunMenu_drawXParams(data, 7, x, y, width, actor);
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsMpRegen = function(data, x, y, width, actor) {
        this.nuunMenu_drawXParams(data, 8, x, y, width, actor);
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsTpRegen = function(data, x, y, width, actor) {
        this.nuunMenu_drawXParams(data, 9, x, y, width, actor);
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsAggro = function(data, x, y, width, actor) {
        this.nuunMenu_drawSParams(data, 0, x, y, width, actor);
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsGuard = function(data, x, y, width, actor) {
        this.nuunMenu_drawSParams(data, 1, x, y, width, actor);
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsRecovery = function(data, x, y, width, actor) {
        this.nuunMenu_drawSParams(data, 2, x, y, width, actor);
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsItemEffect = function(data, x, y, width, actor) {
        this.nuunMenu_drawSParams(data, 3, x, y, width, actor);
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsMpCost = function(data, x, y, width, actor) {
        this.nuunMenu_drawSParams(data, 4, x, y, width, actor);
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsTpCharge = function(data, x, y, width, actor) {
        this.nuunMenu_drawSParams(data, 5, x, y, width, actor);
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsPhysicalDamage = function(data, x, y, width, actor) {
        this.nuunMenu_drawSParams(data, 6, x, y, width, actor);
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsMagicalDamage = function(data, x, y, width, actor) {
        this.nuunMenu_drawSParams(data, 7, x, y, width, actor);
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsFloorDamage = function(data, x, y, width, actor) {
        this.nuunMenu_drawSParams(data, 8, x, y, width, actor);
    };

    Window_StatusBase.prototype.nuun_DrawMenuStatusContentsGainExpRate = function(data, x, y, width, actor) {
        this.nuunMenu_drawSParams(data, 9, x, y, width, actor);
    };

    Window_StatusBase.prototype.nuunMenu_drawParams = function(data, param, x, y, width, actor) {
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        const nameText = this.nuunMenu_paramNameData(data, param);
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        this.nuun_setContentsFontFace(data);
        const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? this.textWidth(nameText) : this.nuunMenu_systemWidth(data.SystemItemWidth, width);
        this.drawText(nameText, x, y, textWidth);
        this.resetTextColor();
        this.nuun_setContentsValueFontFace(data);
        const textParam = (data.DetaEval ? eval(data.DetaEval) : actor.param(param));
        this.nuun_DrawContentsParamUnitText(textParam, data, x + textWidth + 8, y, width - (textWidth + 8));
        //this.drawText(textParam, x + textWidth + 8, y, width - (textWidth + 8), data.Align);
        this.resetFontSettings();
    };

    Window_StatusBase.prototype.nuunMenu_drawXParams = function(data, param, x, y, width, actor) {
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        const nameText = this.nuunMenu_paramNameData(data, param + 10);
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        this.nuun_setContentsFontFace(data);
        const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? this.textWidth(nameText) : this.nuunMenu_systemWidth(data.SystemItemWidth, width);
        this.drawText(nameText, x, y, textWidth);
        this.resetTextColor();
        this.nuun_setContentsValueFontFace(data);
        let textParam = (data.DetaEval ? eval(data.DetaEval) : actor.xparam(param) * 100);
        textParam = NuunManager.numPercentage(textParam, (data.Decimal - 2) || 0, this.getDecimalMode());
        this.nuun_DrawContentsParamUnitText(textParam, data, x + textWidth + 8, y, width - (textWidth + 8));
        //this.drawText(textParam, x + textWidth + 8, y, width - (textWidth + 8), data.Align);
        this.resetFontSettings();
    };

    Window_StatusBase.prototype.nuunMenu_drawSParams = function(data, param, x, y, width, actor) {
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        const nameText = this.nuunMenu_paramNameData(data, param + 20);
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        this.nuun_setContentsFontFace(data);
        const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? this.textWidth(nameText) : this.nuunMenu_systemWidth(data.SystemItemWidth, width);
        this.drawText(nameText, x, y, textWidth);
        this.resetTextColor();
        this.nuun_setContentsValueFontFace(data);
        let textParam = (data.DetaEval ? eval(data.DetaEval) : actor.sparam(param) * 100);
        textParam = NuunManager.numPercentage(textParam, (data.Decimal - 2) || 0, this.getDecimalMode());
        this.nuun_DrawContentsParamUnitText(textParam, data, x + textWidth + 8, y, width - (textWidth + 8));
        //this.drawText(textParam, x + textWidth + 8, y, width - (textWidth + 8), data.Align);
        this.resetFontSettings();
    };

    Window_StatusBase.prototype.nuunMenu_drawSvActorImg = function(data, x, y, width, actor, fmt) {
        const key = fmt.format(actor.actorId());
        const sprite = this.createInnerSprite(key, Sprite_MenuSvActor);
        sprite.setup(actor, data);
        sprite.show();
        sprite.setHome(x + 64, y + 64);
        sprite.startMotion();
    };

    Window_StatusBase.prototype.nuunMenu_actorCharacterChip = function(actor, data, x, y, fmt) { 
        const key = fmt.format(actor.actorId());
        const sprite = this.createInnerSprite(key, Sprite_MenuScreenCharacter);
        sprite.setup(actor, data);
        sprite._character.setPosition(0, 0);
        sprite.move(x, y);
        sprite.show();
    };

    Window_StatusBase.prototype.nuunMenu_placeGauge = function(actor, type, x, y, fmt) {
        if (Imported.NUUN_GaugeImage) {
            this.placeGaugeImg(actor, type, x, y);
        }
        const key = fmt.format(actor.actorId(), type);
        const sprite = this.createInnerSprite(key, Sprite_MenuGauge);
        sprite.setup(actor, type);
        sprite.move(x, y);
        sprite.show();
    };

    Window_StatusBase.prototype.nuunMenu_placeCircularGauge = function(actor, type, x, y, fmt) {
        if (!Imported.NUUN_CircularGauge) {
            return;
        }
        const find = this.getCircularGaugeData(type);
        if (!!find) {
            this.nuun_drawCircularMenuGauge(find, actor, type, find.GaugeX + x, find.GaugeY + y);
        }
    };

    Window_MenuStatus.prototype.nuun_drawCircularMenuGauge = function(data, actor, type, x, y) {
        this.setCircularTempData(type, data);
        const key = "resultActor%1-gauge-%2".format(actor.actorId(), type);
        const sprite = this.createInnerSprite(key, Sprite_MenuCircularGauge);
        sprite.setup(actor, type);
        sprite.move(x, y);
        sprite.show();
        this.clearCircularTempData();
    };

    Window_StatusBase.prototype.nuunMenu_drawMenuStatusImg = function(data, x, y, actor) {
        if (data.ImgData) {
            if (data.DetaEval && !eval(data.DetaEval)) {
                return;
            }
            const rect = this.itemRect(0);
            const bitmap = ImageManager.nuun_LoadPictures(data.ImgData);
            this.contents.blt(bitmap, 0, 0, rect.width, rect.height, x - this.colSpacing(), y - this.itemPadding());
        }
    };

    Window_StatusBase.prototype.nuunMenu_drawActorFace = function(actor, x, y, width, height, data) {
        x += (data ? data.Actor_X : 0) + this.ActorImgX() + 1;
        y += (data ? data.Actor_Y : 0) + this.ActorImgY() + 1;
        if (this.isActorPictureEXApp()) {
            this.drawFace(actor.getActorGraphicFace(), actor.getActorGraphicFaceIndex(), x, y, width, height);
        } else {
            let bitmap = null;
            if (data && data.FaceImg) {
                bitmap = data.FaceImg;
            } else {
                bitmap = actor.faceName();
            }
            const faceIndex = data && data.FaceIndex >= 0 ? data.FaceIndex : actor.faceIndex();
            if (actor.isRearguard && actor.isRearguard()) {
                x += Window_MenuStatus.shiftWidth;
            }
            this.drawFace(bitmap, faceIndex, x, y, width, height);
        }
    };

    Window_StatusBase.prototype.nuunMenu_contentsDrawActorGraphic = function(actor, data, bitmap, x, y, width, height) {
        width = Math.min(width - 2, bitmap.width);
        height = Math.min(height - 2, bitmap.height);
        const scale = (data.Actor_Scale || 100) / 100;
        const sw = width * scale;
        const sh = height * scale;
        const sx = data.Img_SX || 0;
        const sy = data.Img_SY || 0;
        x += 1 + data.Actor_X + this.ActorImgX();
        y += 1 + data.Actor_Y + this.ActorImgY();
        this.contents.blt(bitmap, sx, sy, width + (width - sw), height + (height - sh), x, y, width, height);
    };

    Window_StatusBase.prototype.nuun_setContentsFontFace = function(data) {
        this.contents.fontFace = data.FontFace ? data.FontFace : $gameSystem.mainFontFace();
    };

    Window_StatusBase.prototype.nuun_setContentsValueFontFace = function(data) {
        this.contents.fontFace = data.ValueFontFace ? data.ValueFontFace : $gameSystem.mainFontFace();
    };

    Window_StatusBase.prototype.nuunMenu_drawText = function(text, x, y, maxWidth, align) {
        if (menuTextMode === 'name') {
            align = menuAlign;
            menuTextMode = null;
        }
        Window_Base.prototype.drawText.call(this, text, x, y, maxWidth, align);
    };

    Window_StatusBase.prototype.getMenuStatusShowEquipList = function(actor) {
        if (actor.actor().meta.MenuShowEquips) {
            return actor.actor().meta.MenuShowEquips.split(',');
        } else if (actor.currentClass().meta.MenuShowEquips) {
            return actor.currentClass().meta.MenuShowEquips.split(',');
        } else {
            return null;
        }
    };

    Window_StatusBase.prototype.isShowSlot = function(actor, index) {
        if (_menuLayout.InvalidSlotHide) {
            return !actor.isEquipTypeSealed(actor.equipSlots()[index]);
        } else {
            return true;
        }
    };

    Window_StatusBase.prototype.nuun_ExpTotalValue = function(actor) {
        if (actor.isMaxLevel()) {
            return "-------";
        } else {
            return actor.currentExp();
        }
    };

    Window_StatusBase.prototype.nuun_ExpNextValue = function(actor) {
        if (actor.isMaxLevel()) {
            return "-------";
        } else {
            return actor.nextRequiredExp();
        }
    };

    Window_MenuStatus.prototype.ActorImgX = function() {
        return _menuLayout.ActorImg_X;
    };

    Window_MenuStatus.prototype.ActorImgY = function() {
        return _menuLayout.ActorImg_Y;
    };


    function Window_InfoMenu() {
        this.initialize(...arguments);
    }
    
    Window_InfoMenu.prototype = Object.create(Window_Selectable.prototype);
    Window_InfoMenu.prototype.constructor = Window_InfoMenu;
    
    Window_InfoMenu.prototype.initialize = function(rect, data, name) {
        this._dataList = data;
        this._data = {Id: name};//T氏プラグイン
        this._classNameId = name;
        Window_Selectable.prototype.initialize.call(this, rect);
        this._text = '';
        this._commandName = _commandName;
        this._infoFontSize = 0;
        this._onPlayTime = false;
        this._onCommandName = false;
        this._onRefresh = false;
    };

    Window_InfoMenu.prototype.setup = function(cols, fontsize) {
        this._maxCols = cols;
        this._infoFontSize = fontsize;
        this.refresh();
    };

    Window_InfoMenu.prototype.maxCols = function() {
        return this._maxCols ? this._maxCols : 1;
    };
    
    Window_InfoMenu.prototype.itemHeight = function() {
        return this.lineHeight();
    };

    Window_InfoMenu.prototype.getInfoList = function() {
        return this._dataList || [];
    };

    Window_InfoMenu.prototype.refresh = function() {
        this.contents.clear();
        const listData = this.getInfoList();
        const lineHeight = this.lineHeight();
        for (const data of listData) {
            this.resetFontSettings();
            const x_Position = data.X_Position;
            const position = Math.min(x_Position, this.maxCols());
            const rect = this.itemRect(position - 1);
            const x = rect.x + (data.X_Coordinate || 0);
            const y = (data.Y_Position - 1) * lineHeight + rect.y + data.Y_Coordinate;
            const width = data.ItemWidth && data.ItemWidth > 0 ? Math.min(data.ItemWidth, rect.width - x) : rect.width - x;
            this.nuun_DrawContents(data, x, y, width);
        }
    };

    Window_InfoMenu.prototype.nuun_DrawContents = function(data, x, y, width, battler) {
        const method = 'nuun_DrawMenuInfoContents' + data.DateSelect;
        try {
            this[method](data, x, y, width, battler);
        } catch (error) {
            const log = ($gameSystem.isJapanese() ? "無効なIDが設定されています。" : "An invalid ID has been configured.") + data.DateSelect;
            throw ["DataError", log];
        }
    };

    Window_InfoMenu.prototype.nuun_DrawMenuInfoContentsNone = function(data, x, y, width) {
        
    };

    Window_InfoMenu.prototype.nuun_DrawMenuInfoContentsHorzLine = function(data, x, y, width) {
        const lineY = y + this.lineHeight() / 2 - 1;
        this.contents.paintOpacity = 48;
        this.contents.fillRect(x, lineY, width, 2, NuunManager.getColorCode(data.NameColor));
        this.contents.paintOpacity = 255;
    };

    Window_InfoMenu.prototype.nuun_DrawMenuInfoContentsLimit_Gauge = function(data, x, y, width) {
        let sprite = null;
        if (this._partyGauge) {
            sprite = this._partyGauge;
        } else {
            try {
                sprite = $gameParty.getPartyLimitSprite(Math.min(data.ItemWidth, width));
                this.addChild(sprite);
            } catch (error) {
                return;
            }
        }
        sprite.setup('actor', 'limit');
        sprite.move(x, y);
        sprite.show();
        this._partyGauge = sprite;
    };
    
    Window_InfoMenu.prototype.nuun_DrawMenuInfoContentsGold = function(data, x, y, width) {
        let iconWidth = 0;
        if (data.InfoIcon > 0) {
            this.drawIcon(data.InfoIcon, x, y + 2);
            iconWidth = ImageManager.iconWidth + 6;
        }
        this.contents.fontSize = $gameSystem.mainFontSize() + this._infoFontSize + (data.ContentsFontSize || 0);
        NuunManager.setMainFontFace(data.FontFace);
        NuunManager.setNumberFontFace(data.ValueFontFace);
        this.nuun_setFontFace();
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        const nameText = data.ParamName ? data.ParamName : '';
        const systemWidth = data.SystemItemWidth === 0 ? this.textWidth(nameText) : this.systemWidth(data.SystemItemWidth, width);
        this.drawText(nameText, x + iconWidth, y, systemWidth);
        this.resetTextColor();
        this.drawCurrencyValue(this.value(), this.currencyUnit(), x + systemWidth + 8 + iconWidth, y, width - (systemWidth + 8 + iconWidth));
        this.resetFontSettings();
    };
    
    Window_InfoMenu.prototype.nuun_DrawMenuInfoContentsPlaytime = function(data, x, y, width) {
        this.contents.fontSize = $gameSystem.mainFontSize() + this._infoFontSize + (data.ContentsFontSize || 0);
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        this.nuun_setContentsFontFace(data);
        const nameText = data.ParamName ? data.ParamName : '';
        const systemWidth = !!nameText ? (data.SystemItemWidth || 100) : 0;
        let iconWidth = 0;
        if (data.InfoIcon > 0) {
            this.drawIcon(data.InfoIcon, x, y + 2);
            iconWidth = ImageManager.iconWidth + 6;
        }
        this.drawText(nameText, x + iconWidth, y, systemWidth);
        this.resetTextColor();
        this.nuun_setContentsValueFontFace(data);
        this.drawText($gameSystem.playtimeText(), x + systemWidth + iconWidth + this.itemPadding(), y, width - (systemWidth + 8 + iconWidth), data.Align);
        this.resetFontSettings();
        this._onPlayTime = true;
    };
    
    Window_InfoMenu.prototype.nuun_DrawMenuInfoContentsCurrentLocation = function(data, x, y, width) {
        this.contents.fontSize = $gameSystem.mainFontSize() + this._infoFontSize + (data.ContentsFontSize || 0);
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        this.nuun_setContentsFontFace(data);
        const nameText = data.ParamName ? data.ParamName : '';
        const systemWidth = !!nameText ? (data.SystemItemWidth || 100) : 0;
        let iconWidth = 0;
        if (data.InfoIcon > 0) {
            this.drawIcon(data.InfoIcon, x, y + 2);
            iconWidth = ImageManager.iconWidth + 6;
        }
        this.drawText(nameText, x + iconWidth, y, systemWidth);
        this.resetTextColor();
        this.nuun_setContentsValueFontFace(data);
        const text = $gameMap.mapId() > 0 ? $gameMap.displayName() : '';
        this.drawText(text, x + systemWidth + iconWidth + this.itemPadding(), y, width - (systemWidth + 8 + iconWidth), data.Align);
        this.resetFontSettings();
    };
    
    Window_InfoMenu.prototype.nuun_DrawMenuInfoContentsOrgParam = function(data, x, y, width) {
        this.contents.fontSize = $gameSystem.mainFontSize() + this._infoFontSize + (data.ContentsFontSize || 0);
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        this.nuun_setContentsFontFace(data);
        const nameText = data.ParamName ? data.ParamName : '';
        const systemWidth = !!nameText ? (data.SystemItemWidth || 100) : 0;
        let iconWidth = 0;
        if (data.InfoIcon > 0) {
            this.drawIcon(data.InfoIcon, x, y + 2);
            iconWidth = ImageManager.iconWidth + 6;
        }
        this.drawText(nameText, x + iconWidth, y, systemWidth);
        this.resetTextColor();
        if (!!data.DataEval) {
            this.nuun_setContentsValueFontFace(data);
            this.drawText(eval(data.DataEval), x + systemWidth + 8 + iconWidth, y, width - (systemWidth + 8 + iconWidth), data.Align);
        }
        this.resetFontSettings();
    };
    
    Window_InfoMenu.prototype.nuun_DrawMenuInfoContentsCommandDescription = function(data, x, y, width) {
        this._onCommandName = true;
        this.drawTextEx(this._text, x, y, width);
    };
    
    Window_InfoMenu.prototype.nuun_DrawMenuInfoContentsFreeText = function(data, x, y, width) {   
        this.drawTextEx(data.Text, x, y, width);
    };
    
    Window_InfoMenu.prototype.nuun_DrawMenuInfoContentsDestination = function(data, x, y, width) {
        if (!Imported.NUUN_Destination) {
            return;
        }
        let iconWidth = 0;
        let textWidth = 0;
        if (data.InfoIcon > 0) {
            this.drawIcon(data.InfoIcon, x, y + 2);
            iconWidth = ImageManager.iconWidth + 6;
        }
        this.contents.fontSize = $gameSystem.mainFontSize() + this._infoFontSize + (data.ContentsFontSize || 0);
        if (data.ParamName) {
            this.changeTextColor(NuunManager.getColorCode(data.NameColor));
            this.nuun_setContentsFontFace(data);
            const nameText = data.ParamName ? data.ParamName : '';
            this.drawText(nameText, x + iconWidth, y, textWidth);
            textWidth = this.systemWidth(data.SystemItemWidth, width);
        }
        this.resetTextColor();
        const text = this.getDestinationList();
        if (text) {
            this.drawTextEx(text, x + iconWidth + textWidth, y, width - textWidth - iconWidth);
        }
        this.resetFontSettings();
    };
    
    Window_InfoMenu.prototype.nuun_DrawMenuInfoContentsChapter = function(data, x, y, width) {
        if (!Imported.NUUN_Chapter) {
            return;
        }
        let iconWidth = 0;
        let textWidth = 0;
        if (data.InfoIcon > 0) {
            this.drawIcon(data.InfoIcon, x, y + 2);
            iconWidth = ImageManager.iconWidth + 6;
        }
        this.contents.fontSize = $gameSystem.mainFontSize() + this._infoFontSize + (data.ContentsFontSize || 0);
        if (data.ParamName) {
            this.changeTextColor(NuunManager.getColorCode(data.NameColor));
            this.nuun_setContentsFontFace(data);
            const nameText = data.ParamName ? data.ParamName : '';
            this.drawText(nameText, x + iconWidth, y, textWidth);
            textWidth = this.systemWidth(data.SystemItemWidth, width);
        }
        this.resetTextColor();
        const text = this.getChapter();
        if (text) {
            this.drawTextEx(text, x + iconWidth + textWidth, y, width - textWidth - iconWidth);
        }
        this.resetFontSettings();
    };
    
    Window_InfoMenu.prototype.nuun_DrawMenuInfoContentsName = function(data, x, y, width) {
        this.contents.fontSize = $gameSystem.mainFontSize() + this._infoFontSize + (data.ContentsFontSize || 0);
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        const nameText = data.ParamName ? data.ParamName : '';
        this.nuun_setContentsFontFace(data);
        this.drawText(nameText, x, y, width, data.Align);
        this.resetFontSettings();
    };
    
    Window_InfoMenu.prototype.systemWidth = function(swidth, width) {
        return swidth > 0 ? swidth : 120;
    };
    
    Window_InfoMenu.prototype.value = function() {
        return $gameParty.gold();
    };
    
    Window_InfoMenu.prototype.currencyUnit = function() {
        return TextManager.currencyUnit;
    };
    
    Window_InfoMenu.prototype.setText = function(str) {
        this._text = str;
        this._onRefresh = true;
    };

    Window_InfoMenu.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);
        if (this._onCommandName) {
            if (this._commandName !== _commandName) {
                this.setText(_commandText);
                this._commandName = _commandName;
            }
        }
        if (this._onPlayTime || this._onRefresh) {
            this._onRefresh = false;
            this.refresh();
        }
    };

    Window_InfoMenu.prototype.nuun_setContentsFontFace = function(data) {
        this.contents.fontFace = data.FontFace ? data.FontFace : $gameSystem.mainFontFace();
    };

    Window_InfoMenu.prototype.nuun_setContentsValueFontFace = function(data) {
        this.contents.fontFace = data.ValueFontFace ? data.ValueFontFace : $gameSystem.mainFontFace();
    };


    function Sprite_MenuGauge() {
        this.initialize(...arguments);
    }
      
    Sprite_MenuGauge.prototype = Object.create(Sprite_Gauge.prototype);
    Sprite_MenuGauge.prototype.constructor = Sprite_MenuGauge;
    window.Sprite_MenuGauge = Sprite_MenuGauge;
      
    Sprite_MenuGauge.prototype.initialize = function() {
        this._statusType = _menutemp.getType();
        this.menuParam = _menutemp.getData();
        Sprite_Gauge.prototype.initialize.call(this);
    };

    Sprite_MenuGauge.prototype.bitmapWidth = function() {
        return this.menuParam._width || 128;
    };

    Sprite_MenuGauge.prototype.gaugeHeight = function() {
        return this.menuParam.GaugeHeight > 0 ? this.menuParam.GaugeHeight : 12;
    };
    
    Sprite_MenuGauge.prototype.gaugeColor1 = function() {
        if (this._battler && this.menuParam) {
            switch (this._statusType) {
                case "menuexp":
                    return this.menuParam.Color1 >= 0 ? NuunManager.getColorCode(this.menuParam.Color1) : NuunManager.getColorCode(17);
                default:
                    return this.menuParam.Color1 >= 0 ? NuunManager.getColorCode(this.menuParam.Color1) : Sprite_Gauge.prototype.gaugeColor1.call(this);
            }
        } else {
            return Sprite_Gauge.prototype.gaugeColor1.call(this);
        }
    };
      
    Sprite_MenuGauge.prototype.gaugeColor2 = function() {
        if (this._battler && this.menuParam) {
            switch (this._statusType) {
                case "menuexp":
                    return this.menuParam.Color2 >= 0 ? NuunManager.getColorCode(this.menuParam.Color2) : NuunManager.getColorCode(6);
                default:
                    return this.menuParam.Color2 >= 0 ? NuunManager.getColorCode(this.menuParam.Color2) : Sprite_Gauge.prototype.gaugeColor2.call(this);
            }
        } else {
            return Sprite_Gauge.prototype.gaugeColor2.call(this);
        }
    };
    
    Sprite_MenuGauge.prototype.displyaExp = function() {
        const mode = this.expDisplayModeParam();
        if (mode === 1) {
            return this._battler.nextRequiredExp();
        } else if (mode === 2) {
            return this.currentValue();
        } else if (mode === 3) {
            return NuunManager.numPercentage(this.currentValue() / this.currentMaxValue() * 100, this.expDecimalParam(), this.decimalModeParam());
        }
        return this._battler.currentExp() - this._battler.currentLevelExp();
    };
    
    Sprite_MenuGauge.prototype.displyaMaxExp = function() {
        return this._battler.nextLevelExp() - this._battler.currentLevelExp();
    };
    
    Sprite_MenuGauge.prototype.currentValue = function() {
        if (this._battler && this.menuParam) {
        switch (this._statusType) {
            case "hp":
            case "mp":
            case "tp":
            case "time":
                return Sprite_Gauge.prototype.currentValue.call(this);
            case "menuexp":
                return  this._battler.isMaxLevel() ? this.currentMaxValue() : this._battler.currentExp() - this._battler.currentLevelExp();
            default:
                const actor = this._battler;
                return eval(this.menuParam.DetaEval);
          }
        } else {
          return Sprite_Gauge.prototype.currentValue.call(this);
        }
    };
      
    Sprite_MenuGauge.prototype.currentMaxValue = function() {
        if (this._battler && this.menuParam) {
        switch (this._statusType) {
            case "hp":
            case "mp":
            case "tp":
            case "time":
                return Sprite_Gauge.prototype.currentMaxValue.call(this);
            case "menuexp":
                return this._battler.nextLevelExp() - this._battler.currentLevelExp();
            default:
                const actor = this._battler;
                return eval(this.menuParam.DetaEval2);
            }
        } else {
          return Sprite_Gauge.prototype.currentMaxValue.call(this);
        }
    };
    
    Sprite_MenuGauge.prototype.label = function() {
        if (this._battler && this.menuParam) {
            switch (this._statusType) {
            case "hp":
            case "mp":
            case "tp":
            case "time":
                return this.menuParam.ParamName ? this.menuParam.ParamName : Sprite_Gauge.prototype.label.call(this);
            case "menuexp":
                return this.expLabel();
            default:
              return this.menuParam.ParamName;
            }
        } else {
          return Sprite_Gauge.prototype.label.call(this);
        }
    };

    Sprite_MenuGauge.prototype.expLabel = function() {
        return this.labelShowParam() ? this.menuParam.ParamName ? this.menuParam.ParamName : TextManager.expA : '';
    };
    
    Sprite_MenuGauge.prototype.drawValue = function() {
        if (this._statusType === "menuexp") {
            this.drawValueExp();
        } else {
            Sprite_Gauge.prototype.drawValue.call(this);
        }
    };

    Sprite_MenuGauge.prototype.drawValueExp = function() {
        const mode = this.expDisplayModeParam();
        if (mode === 0) {
            return;
        }
        let text = this.displyaExp();
        if (mode === 3) {
            text = this._battler.isMaxLevel() ? "100%" : text +"%";
        } else {
            text = this._battler.isMaxLevel() ? "-------" : text;
        }
        const width = this.bitmapWidth();
        const height = this.textHeight();
        this.setupValueFont();
        this.bitmap.drawText(text, 0, 0, width, height, "right");;
    };

    Sprite_MenuGauge.prototype.decimalModeParam = function() {
        return DecimalMode;
    };

    Sprite_MenuGauge.prototype.expDecimalParam = function() {
        return EXPDecimal;
    };

    Sprite_MenuGauge.prototype.expDisplayModeParam = function() {
        return ExpDisplayMode;
    };

    Sprite_MenuGauge.prototype.labelShowParam = function() {
        return LabelShow;
    };


    function Sprite_MenuCircularGauge() {
        this.initialize(...arguments);
    }
      
    Sprite_MenuCircularGauge.prototype = Object.create(Sprite_MenuGauge.prototype);
    Sprite_MenuCircularGauge.prototype.constructor = Sprite_MenuCircularGauge;
    window.Sprite_MenuCircularGauge = Sprite_MenuCircularGauge;
      
    Sprite_MenuCircularGauge.prototype.initialize = function() {
        this.setCircularData();
        Sprite_MenuGauge.prototype.initialize.call(this);
    };

    Sprite_MenuCircularGauge.prototype.drawValueExp = function() {
        const mode = this.expDisplayModeParam();
        if (mode === 0) {
            return;
        }
        let text = this.displyaExp();
        if (mode === 3) {
            //text = this._battler.isMaxLevel() ? "100%" : text +"%";
            text = this._battler.isMaxLevel() ? "100" : text;
        } else if (mode === 4) {
            text = this._battler._level;
        } else {
            text = this._battler.isMaxLevel() ? "---" : text;
        }
        const width = this.circularSprite[1] ? this._circularBitmap.width : this.circularBitmapWidth();
        const height = this.circularSprite[1] ? this._circularBitmap.height : this.circularBitmapHeight();
        this.setupValueFont();
        const y = this._circularData.ShowLabel ? 6 : 0;
        this.bitmap.drawText(text, 0, y, width, height, "center");
    };

    Sprite_MenuCircularGauge.prototype.expLabel = function() {
        if (this.labelShowParam()) {
            return this.expDisplayModeParam() === 4 ? (this.menuParam.ParamName ? this.menuParam.ParamName : TextManager.levelA) : Sprite_MenuGauge.prototype.expLabel.call(this);
        } else {
            return '';
        }
    };


    function Sprite_MenuScreenCharacter() {
        this.initialize(...arguments);
    }
      
    Sprite_MenuScreenCharacter.prototype = Object.create(Sprite_Character.prototype);
    Sprite_MenuScreenCharacter.prototype.constructor = Sprite_MenuScreenCharacter;
      
    Sprite_MenuScreenCharacter.prototype.initialize = function(character) {
        Sprite_Character.prototype.initialize.call(this, character);
        this._data = null;
        this._actor = null;
    };

    Sprite_MenuScreenCharacter.prototype.setup = function(battler, data) {
        const character = new Game_Character(battler);
        const characterName = battler.characterName();
        const characterIndex = battler.characterIndex();
        character.setImage(characterName, characterIndex);
        character.setStepAnime(true);
        this._data = data;
        this._actor = battler;
        this.setCharacter(character);
    };
      
    Sprite_MenuScreenCharacter.prototype.update = function() {
        if (this.visible) {
          Sprite_Character.prototype.update.call(this);
          this._character.updateAnimation();
          this.changePaintOpacity();
        }
    };

    Sprite_MenuScreenCharacter.prototype.changePaintOpacity = function() {
        const battleMemberOpacity = this._data.BattleMemberOpacity !== undefined ? this._data.BattleMemberOpacity : true;
        if (battleMemberOpacity) {
            this.opacity = this._actor.isBattleMember() ? 255 : Window_Base.prototype.translucentOpacity.call(this);
        }
    };

    Sprite_MenuScreenCharacter.prototype.updatePosition = function() {

    };
    

    function Sprite_MenuSvActor() {
        this.initialize(...arguments);
    }
      
    Sprite_MenuSvActor.prototype = Object.create(Sprite_Actor.prototype);
    Sprite_MenuSvActor.prototype.constructor = Sprite_MenuSvActor;
      
    Sprite_MenuSvActor.prototype.updateVisibility = function() {
        Sprite_Clickable.prototype.updateVisibility.call(this);
    };
      
    Sprite_MenuSvActor.prototype.initialize = function(battler) {
    Sprite_Actor.prototype.initialize.call(this, battler);
        this._data = null;
    };

    Sprite_MenuSvActor.prototype.setup = function(battler, data) {
        this.setBattler(battler);
        this._data = data;
    };
      
    Sprite_MenuSvActor.prototype.moveToStartPosition = function() {
        this.startMove(0, 0, 0);
    };
      
    Sprite_MenuSvActor.prototype.updateMain = function() {
        this.updateBitmap();
        this.updateFrame();
        this.updateMove();
        this.changePaintOpacity();
    };

    Sprite_MenuSvActor.prototype.changePaintOpacity = function() {
        const battleMemberOpacity = this._data.BattleMemberOpacity !== undefined ? this._data.BattleMemberOpacity : true;
        if (battleMemberOpacity) {
            this.opacity = this._actor.isBattleMember() ? 255 : Window_Base.prototype.translucentOpacity.call(this);
        }
    };
    
    Sprite_MenuSvActor.prototype.startMotion = function() {
        if (this._actor.isDead()) {
            motionType = 'dead';
        } else {
            motionType = 'walk';
        }
        Sprite_Actor.prototype.startMotion.call(this, motionType);
    };
      
    Sprite_MenuSvActor.prototype.setupWeaponAnimation = function() {
        
    };


    function Sprite_MenuActorImg() {
        this.initialize(...arguments);
    }
      
    Sprite_MenuActorImg.prototype = Object.create(Sprite.prototype);
    Sprite_MenuActorImg.prototype.constructor = Sprite_MenuActorImg;
      
    Sprite_MenuActorImg.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);
        this.initMembers();
    };
    
    Sprite_MenuActorImg.prototype.initMembers = function() {
        this._battler = null;
        this._apngMode = null;
        this._data = null;
        this._pictureName = null;
    };
    
    Sprite_MenuActorImg.prototype.setup = function(battler, data) {
        this._battler = battler;
        this._data = data;
        const name = Imported.NUUN_ActorPicture && _menuLayout.ActorPictureEXApp ? battler.getActorGraphicImg() : data.ActorImg;
        this._pictureName = name.split('pictures/')[1];
        this.refresh();
    };

    Sprite_MenuActorImg.prototype.refresh = function() {
        if (this.addApngChild && this.loadApngSprite(this._pictureName)) {
            this.addApngChild(this._pictureName);
            this._apngMode = true;
        }
    };

    Sprite_MenuActorImg.prototype.destroy = function() {
        this.resetMenuActorImg();
        Sprite.prototype.destroy.call(this);
    };
    
    Sprite_MenuActorImg.prototype.resetMenuActorImg = function() {
        this._battler = null;
        if (this._apngMode) {
            this.destroyApngIfNeed();
            this._apngMode = null;
        }
    };

    Sprite_MenuActorImg.prototype.loadApngSprite = function(name) {
        return Sprite_Picture.prototype.loadApngSprite.call(this, name);
    };


})();