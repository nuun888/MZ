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
 * @plugindesc Screen Formation
 * @author NUUN
 * @version 2.0.3
 * @base NUUN_Base
 * @base NUUN_MenuParamListBase
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_MenuParamListBase
 * 
 * @help
 * Add a screen to sort members.
 * Selecting the Reorder menu command will display the member change screen.
 * You can choose the images of the battle members and standby members from character chips and face graphics. (The default is character chips.)
 * 
 * Characters who are unable to fight will be displayed with a red background by default.
 * 
 * The status of the selected actor can be customized.
 * 
 * All window coordinates are relative.
 * If Window Reference 0 is turned ON, the reference coordinates of the window will be 0,0.
 * If Auto Window Center is turned ON, only the X coordinate will be automatically adjusted to be in the center, so turn it OFF if you want to adjust the X coordinate.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 7/13/2024 Ver.2.0.3
 * Fixed the issue where the settings in "NUUN_ActorPicture" were not applied.
 * Fixed an issue where an error would occur when switching members in turn-based mode and selecting a command.
 * 6/30/2024 Ver.2.0.2
 * Fixed an issue where an error occurred when setting background color for fixed actors.
 * 6/23/2024 Ver.2.0.1
 * Added a forced battle member plugin command.
 * Fixed so that the member change screen does not close if a forced battle member actor is on the reserve team.
 * Fixed background color coordinates.
 * 6/22/2024 Ver.2.0.0
 * Changed the plug-in parameter specifications.
 * The cursor can now be moved horizontally from the battle member to the reserve member. (Battle member (left), Reserve member (right))
 * 
 * @command SceneFormationOpen
 * @desc The member change screen opens.
 * @text Open the member change screen
 * 
 * @command BattleActorFixed
 * @desc Specifies the actors to force into battle.
 * @text Forced battle member designation
 * 
 * @arg ActorId
 * @type actor
 * @default 0
 * @text Actor id
 * @desc Specify the actor ID. 0 for all actors
 * 
 * @command BattleActorFixedRelease
 * @desc Releases the actor that is forced onto the battle members.
 * @text Forced battle member removal
 * 
 * @arg ActorId
 * @type actor
 * @default 0
 * @text Actor id
 * @desc Specify the actor ID. 0 for all actors
 * 
 * 
 * @param BasicSetting
 * @text Basic setting
 * @default ------------------------------
 * 
 * @param VariableBattleMember
 * @text Number of combat members
 * @desc Variable number of combat members.
 * @type boolean
 * @default false
 * @parent BasicSetting
 * 
 * @param WindowCenter
 * @text Window center automatic adjustment
 * @desc Automatically adjusts the window to the center. It will be adjusted to the width of the waiting member window.
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param WindowZero
 * @text Window criteria 0
 * @desc Sets the coordinate reference of all windows to 0,0. Use this if you want to change the layout yourself.
 * @type boolean
 * @default false
 * @parent BasicSetting
 * 
 * @param CursorSwitchingDirection
 * @text Cursor switching direction
 * @desc The direction in which the cursor moves when switching between battle members and reserve members.
 * @type select
 * @option Battle members (top) Reserve members (bottom)
 * @value 0
 * @option Battle member (left) Reserve member (right)
 * @value 1
 * @default 0
 * @parent BasicSetting
 * 
 * @param DeadActorColor
 * @text Incapable of combat actor background color
 * @desc Background color of incapacitated actors. (Common to menu and battle)
 * @type color
 * @default 18
 * @min -1
 * @parent BasicSetting
 * 
 * @param BattleFixedActorColor
 * @text Fixed combat member actor
 * @desc Background color of fixed actors in battle. (Common to menu and battle)
 * @type color
 * @default 17
 * @min -1
 * @parent BasicSetting
 * 
 * @param MemberHeight
 * @text Member display height
 * @desc The display height of the member.(Common to menu and battle)
 * @type number
 * @default 48
 * @min -9999
 * @parent BasicSetting
 * 
 * @param LavelVisible
 * @text Level display
 * @desc Displays the levels of actors in battle and waiting. (Common to menu and battle)
 * @type boolean
 * @default false
 * @parent BasicSetting
 * 
 * @param LevelFontSize
 * @desc Font size of the level (difference from the main font)(Common to menu and battle)
 * @text Level Font Size
 * @type number
 * @default -10
 * @min 99
 * @parent BasicSetting
 * 
 * @param MemberImgSetting
 * @text Member image settings
 * @default ------------------------------
 * 
 * @param CharacterMode
 * @text Member images
 * @desc Select the display format for member images to be displayed. (Common to menu and battle)
 * @type select
 * @option Character chip
 * @value 'chip'
 * @option Face
 * @value 'face'
 * @default 'chip'
 * @parent MemberImgSetting
 * 
 * @param ActorCharacter_X
 * @text Actor image base X coordinate
 * @desc Actor image base X coordinate. (Common to menu and battle)
 * @type number
 * @max 9999
 * @min -9999
 * @default 0
 * @parent MemberImgSetting
 * 
 * @param ActorCharacter_Y
 * @text Actor image base Y coordinate
 * @desc Actor image base Y coordinate. (Common to menu and battle)
 * @type number
 * @max 9999
 * @min -9999
 * @default 0
 * @parent MemberImgSetting
 * 
 * @param BattleMemberNameSetting
 * @text Battle member name window settings
 * @default ------------------------------
 * 
 * @param BattleMemberName
 * @text Battle member name
 * @desc Battle member name.
 * @type string
 * @default Battle Members
 * @parent BattleMemberNameSetting
 * 
 * @param BattleMemberName_X
 * @text Battle member name window X coordinate
 * @desc Battle member name window X coordinate.
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleMemberNameSetting
 * 
 * @param BattleMemberName_Y
 * @text Battle member name window Y coordinate
 * @desc Battle member name window Y coordinate.
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleMemberNameSetting
 * 
 * @param MemberNameSetting
 * @text Standby Member Name Window Settings
 * @default ------------------------------
 * 
 * @param MemberName
 * @text Standby member name
 * @desc Standby member name.
 * @type string
 * @default Standby Members
 * @parent MemberNameSetting
 * 
 * @param MemberName_X
 * @text Standby member name window X coordinate
 * @desc Standby member name window X coordinate.
 * @type number
 * @default 0
 * @min -9999
 * @parent MemberNameSetting
 * 
 * @param MemberName_Y
 * @text Standby member name window Y-coordinate
 * @desc Standby member name window Y-coordinate.
 * @type number
 * @default 0
 * @min -9999
 * @parent MemberNameSetting
 * 
 * @param BattleMemberSetting
 * @text Battle Member Window Settings
 * @default ------------------------------
 * 
 * @param BattleMember_Cols
 * @text Battle member horizontally display number
 * @desc Battle member horizontally display number. If it is 0, the display width will change according to the maximum number of members.
 * @type number
 * @default 0
 * @min 0
 * @parent BattleMemberSetting
 * 
 * @param BattleMember_Rows
 * @text Battle member vertical display number
 * @desc Battle member vertical display number.
 * @type number
 * @default 1
 * @min 1
 * @parent BattleMemberSetting
 * 
 * @param BattleMember_X
 * @text Battle member window X coordinate
 * @desc Battle member window X coordinate.
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleMemberSetting
 * 
 * @param BattleMember_Y
 * @text Battle member window Y coordinate
 * @desc Battle member window Y coordinate.
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleMemberSetting
 * 
 * @param MemberSetting
 * @text Standby member window settings
 * @default ------------------------------
 * 
 * @param Member_Cols
 * @text Standby member horizontally display number
 * @desc Standby member horizontally display number.
 * @type number
 * @default 10
 * @min 0
 * @parent MemberSetting
 * 
 * @param Member_Rows
 * @text Standby member vertical display number
 * @desc Standby member vertical display number.
 * @type number
 * @default 1
 * @parent MemberSetting
 * 
 * @param Member_X
 * @text Standby member window X coordinate
 * @desc Standby member window X coordinate.
 * @type number
 * @default 0
 * @min -9999
 * @parent MemberSetting
 * 
 * @param Member_Y
 * @text Standby member window Y coordinate
 * @desc Standby member window Y coordinate.
 * @type number
 * @default 0
 * @min -9999
 * @parent MemberSetting
 * 
 * @param StatusSetting
 * @text Status Window Settings
 * @default ------------------------------
 * 
 * @param Status_X
 * @text Status window X coordinate
 * @desc Status window X coordinate.
 * @type number
 * @default 0
 * @min -9999
 * @parent StatusSetting
 * 
 * @param Status_Y
 * @text Status window Y coordinate
 * @desc Status window Y coordinate.
 * @type number
 * @default 0
 * @min -9999
 * @parent StatusSetting
 * 
 * @param Status_Width
 * @text Status window width
 * @desc Status window width.
 * @type number
 * @default 0
 * @min -9999
 * @parent StatusSetting
 * 
 * @param Status_Height
 * @text Status window height
 * @desc Status window height.
 * @type number
 * @default 0
 * @min -9999
 * @parent StatusSetting
 * 
 * @param ContentsSetting
 * @text Content Settings
 * @default ------------------------------
 * @parent StatusSetting
 * 
 * @param ActorStatus
 * @text Display actor status settings
 * @desc Actor Display Status Settings.
 * @default ["{\"DateSelect\":\"ActorName\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"Face\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"Level\",\"X_Position\":\"2\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"100\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"Class\",\"X_Position\":\"3\",\"Y_Position\":\"1\",\"X_Coordinate\":\"-50\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"State\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"144\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"HpGauge\",\"X_Position\":\"1\",\"Y_Position\":\"5\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"20\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"MpGauge\",\"X_Position\":\"1\",\"Y_Position\":\"6\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"10\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"Equip\",\"X_Position\":\"4\",\"Y_Position\":\"1\",\"X_Coordinate\":\"-50\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"240\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"Atk\",\"X_Position\":\"2\",\"Y_Position\":\"2\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"Def\",\"X_Position\":\"2\",\"Y_Position\":\"3\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"Mat\",\"X_Position\":\"2\",\"Y_Position\":\"4\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"Mdf\",\"X_Position\":\"3\",\"Y_Position\":\"2\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"Agi\",\"X_Position\":\"3\",\"Y_Position\":\"3\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"Luk\",\"X_Position\":\"3\",\"Y_Position\":\"4\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"ExpInfo\",\"X_Position\":\"2\",\"Y_Position\":\"5\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"300\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'right'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"Exp\",\"X_Position\":\"2\",\"Y_Position\":\"6\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"300\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'right'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}"]
 * @type struct<ActorStatusList>[]
 * @parent ContentsSetting
 * 
 * @param ContentsCols
 * @text Contents cols
 * @desc Number of columns of content in an item.
 * @type number
 * @default 4
 * @min 1
 * @max 4
 * @parent ContentsSetting
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
 * @param ActorImgSetting
 * @text Status Window Actor Image Settings
 * @default ------------------------------
 * 
 * @param GraphicMode
 * @desc Specifies the actor image to display.
 * @text Display actor image
 * @type select
 * @option None
 * @value 'none'
 * @option Image (in Actor Status window)
 * @value 'img'
 * @option Image
 * @value 's_img'
 * @default 'face'
 * @default 'none'
 * @parent ActorImgSetting
 * 
 * @param ActorsImgList
 * @text Image Settings
 * @desc Actor Image Settings
 * @default []
 * @type struct<actorImgList>[]
 * @parent ActorImgSetting
 * 
 * @param ActorPictureEXApp
 * @text Apply NUUN_ActorPicture
 * @desc Apply the image change of "NUUN_ActorPicture". If you turn it off, the settings in this plugin will be applied.
 * @type boolean
 * @default true
 * @parent ActorImgSetting
 * 
 * @param ActorImg_X
 * @text Actor image base X coordinate
 * @desc Basic X coordinate of the actor image
 * @type number
 * @max 9999
 * @min -9999
 * @default 0
 * @parent ActorImgSetting
 * 
 * @param ActorImg_Y
 * @text Actor image base Y coordinate
 * @desc Basic Y coordinate of the actor image
 * @type number
 * @max 9999
 * @min -9999
 * @default 0
 * @parent ActorImgSetting
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
 * @parent ActorImgSetting
 * 
 * @param ActorFixedSetting
 * @text Fixed actor sorting settings (requires NUUN_ActorFixed)
 * @default ------------------------------
 * 
 * @param FixedActorBackColor
 * @text Fixed actor background color
 * @desc Fixed actor background color. (Common to menu and battle)
 * @type number
 * @default 3
 * @min -1
 * @parent ActorFixedSetting
 * 
 * @param CancelSeFormula
 * @text Cancel SE Invalid evaluation formula
 * @desc An evaluation expression that gets the sound data of the cancel sound effect. Leave blank to use the default cancel sound.
 * @type combo
 * @option '$gameSystem.getSystemSound(n) ? $gameSystem.getSystemSound(n) : $dataSystem.sounds[n];//SystemSoundCustomize'
 * @default 
 * @parent ConflictMeasures
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
 * @option Face(1)(2)(3)(4)(26)
 * @value Face
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
 */
/*:ja
 * @target MZ
 * @plugindesc メンバー変更画面
 * @author NUUN
 * @version 2.0.3
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * メンバーを並び変える画面を追加します。
 * メニューコマンドの並び替えを選択するとメンバーチェンジ画面が表示されるようになります。
 * 戦闘メンバー、待機メンバーの画像はキャラチップ、顔グラから選択できます。（デフォルトではキャラチップ）
 * 
 * 戦闘不能のキャラはデフォルト設定では背景が赤く表示されます。
 * 
 * 選択中のアクターのステータスはカスタマイズ可能です。
 * 
 * 全てのウィンドウの座標は相対座標になります。
 * ウィンドウ基準0をONにした場合、ウィンドウの基準座標を0,0にします。
 * なおウィンドウ中央自動調整をONにしている場合、X座標だけ中央になるよう自動調整され
 * てしまいますのでX座標を調整する場合はOFFにしてください。
 * 
 * アクターのメモ欄
 * <BattleMemberFixed>
 * 戦闘メンバーから外すことは出来ません。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/7/13 Ver.2.0.3
 * 立ち絵、顔グラ表示EXでの設定が適用されない問題を修正。
 * ターン制でメンバー交代を行い、コマンド選択するとエラーが出る問題を修正。
 * 2024/6/30 Ver.2.0.2
 * 固定アクターの背景色設定でエラーが出る問題を修正。
 * 2024/6/23 Ver.2.0.1
 * 強制戦闘メンバーのプラグインコマンドを追加。
 * 強制戦闘メンバーのアクターが控えメンバーにいる場合、メンバー変更画面を閉じないように修正。
 * 背景色の座標を修正。
 * 2024/6/22 Ver.2.0.0
 * プラグインパラメータの仕様を変更。
 * 戦闘メンバーから控えメンバーへのカーソル移動を横方向にも対応。(戦闘メンバー(左)、控えメンバー(右))
 * 
 * @command SceneFormationOpen
 * @desc メンバー変更画面を開きます。
 * @text メンバー変更画面を開く
 * 
 * @command BattleActorFixed
 * @desc 戦闘メンバーに強制するアクターを指定します。
 * @text 強制戦闘メンバー指定
 * 
 * @arg ActorId
 * @type actor
 * @default 0
 * @text アクターID
 * @desc アクターIDを指定します。0で全アクター
 * 
 * @command BattleActorFixedRelease
 * @desc 戦闘メンバーに強制するアクターを解除します。
 * @text 強制戦闘メンバー解除
 * 
 * @arg ActorId
 * @type actor
 * @default 0
 * @text アクターID
 * @desc アクターIDを指定します。0で全アクター
 * 
 * 
 * @param BasicSetting
 * @text 基本設定
 * @default ------------------------------
 * 
 * @param VariableBattleMember
 * @text 戦闘メンバー数可変
 * @desc 戦闘メンバー数。(メニュー、戦闘共通)
 * @type boolean
 * @default false
 * @parent BasicSetting
 * 
 * @param WindowCenter
 * @text ウィンドウ中央自動調整
 * @desc ウィンドウを中央に自動調整します。待機メンバーウィンドウの横幅で調整されます。(メニュー)
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param WindowZero
 * @text ウィンドウ基準0
 * @desc すべてのウィンドウの座標基準を0,0にします。独自にレイアウトを変更したい場合に使用してください。(メニュー)
 * @type boolean
 * @default false
 * @parent BasicSetting
 * 
 * @param CursorSwitchingDirection
 * @text カーソル切り替え方向
 * @desc バトルメンバーと控えメンバーのカーソル移動切り替え時の方向。
 * @type select
 * @option バトルメンバー(上)控えメンバー(下)
 * @value 0
 * @option バトルメンバー(左)控えメンバー(右)
 * @value 1
 * @default 0
 * @parent BasicSetting
 * 
 * @param DeadActorColor
 * @text 戦闘不能アクター背景色
 * @desc 戦闘不能アクターの背景色。(メニュー、戦闘共通)
 * @type color
 * @default 18
 * @min -1
 * @parent BasicSetting
 * 
 * @param BattleFixedActorColor
 * @text 戦闘メンバー固定アクター
 * @desc 戦闘メンバー固定アクターの背景色。(メニュー、戦闘共通)
 * @type color
 * @default 17
 * @min -1
 * @parent BasicSetting
 * 
 * @param MemberHeight
 * @text メンバー表示高さ
 * @desc メンバーの表示高さ。(メニュー、戦闘共通)
 * @type number
 * @default 48
 * @min -9999
 * @parent BasicSetting
 * 
 * @param LavelVisible
 * @text レベル表示
 * @desc 戦闘メンバー及び待機メンバーのアクターにレベルを表示。(メニュー、戦闘共通)
 * @type boolean
 * @default false
 * @parent BasicSetting
 * 
 * @param LevelFontSize
 * @desc レベルのフォントサイズ。(メインフォントからの差)(メニュー、戦闘共通)
 * @text レベルフォントサイズ
 * @type number
 * @default -10
 * @min 99
 * @parent BasicSetting
 * 
 * @param MemberImgSetting
 * @text メンバー画像設定
 * @default ------------------------------
 * 
 * @param CharacterMode
 * @text メンバー画像
 * @desc 表示するメンバー画像の表示形式を選択します。(メニュー、戦闘共通)
 * @type select
 * @option キャラチップ
 * @value 'chip'
 * @option 顔グラフィック
 * @value 'face'
 * @default 'chip'
 * @parent MemberImgSetting
 * 
 * @param ActorCharacter_X
 * @text アクター画像基本X座標
 * @desc アクター画像の基本X座標(メニュー、戦闘共通)
 * @type number
 * @max 9999
 * @min -9999
 * @default 0
 * @parent MemberImgSetting
 * 
 * @param ActorCharacter_Y
 * @text アクター画像基本Y座標
 * @desc アクター画像の基本Y座標(メニュー、戦闘共通)
 * @type number
 * @max 9999
 * @min -9999
 * @default 0
 * @parent MemberImgSetting
 * 
 * @param BattleMemberNameSetting
 * @text 戦闘メンバー名称ウィンドウ設定
 * @default ------------------------------
 * 
 * @param BattleMemberName
 * @text 戦闘メンバー名称
 * @desc 戦闘メンバー名称(メニュー、戦闘共通)
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
 * @text 戦闘メンバー名称ウィンドウY座標
 * @desc 戦闘メンバー名称ウィンドウY座標
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
 * @desc 待機メンバー名称(メニュー、戦闘共通)
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
 * @text 待機メンバー名称ウィンドウY座標
 * @desc 待機メンバー名称ウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent MemberNameSetting
 * 
 * @param BattleMemberSetting
 * @text 戦闘メンバーウィンドウ設定
 * @default ------------------------------
 * 
 * @param BattleMember_Cols
 * @text 戦闘メンバー横表示数
 * @desc 戦闘メンバー横表示数 0で最大メンバー数に応じて表示幅が変わります。
 * @type number
 * @default 0
 * @min 0
 * @parent BattleMemberSetting
 * 
 * @param BattleMember_Rows
 * @text 戦闘メンバー縦表示数
 * @desc 戦闘メンバー縦表示数
 * @type number
 * @default 1
 * @min 1
 * @parent BattleMemberSetting
 * 
 * @param BattleMember_X
 * @text 戦闘メンバーウィンドウX座標
 * @desc 戦闘メンバーウィンドウX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleMemberSetting
 * 
 * @param BattleMember_Y
 * @text 戦闘メンバーウィンドウY座標
 * @desc 戦闘メンバーウィンドウY座標
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
 * @text 待機メンバーウィンドウY座標
 * @desc 待機メンバーウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent MemberSetting
 * 
 * @param StatusSetting
 * @text ステータスウィンドウ設定
 * @default ------------------------------
 * 
 * @param Status_X
 * @text ステータスウィンドウX座標
 * @desc ステータスウィンドウX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent StatusSetting
 * 
 * @param Status_Y
 * @text ステータスウィンドウY座標
 * @desc ステータスウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent StatusSetting
 * 
 * @param Status_Width
 * @text ステータスウィンドウ横幅
 * @desc ステータスウィンドウ横幅
 * @type number
 * @default 0
 * @min -9999
 * @parent StatusSetting
 * 
 * @param Status_Height
 * @text ステータスウィンドウ縦幅
 * @desc ステータスウィンドウ縦幅
 * @type number
 * @default 0
 * @min -9999
 * @parent StatusSetting
 * 
 * @param ContentsSetting
 * @text コンテンツ設定
 * @default ------------------------------
 * @parent StatusSetting
 * 
 * @param ActorStatus
 * @text 表示ステータス設定
 * @desc アクターの表示ステータス設定
 * @default ["{\"DateSelect\":\"ActorName\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"Face\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"Level\",\"X_Position\":\"2\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"100\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"Class\",\"X_Position\":\"3\",\"Y_Position\":\"1\",\"X_Coordinate\":\"-50\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"State\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"144\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"HpGauge\",\"X_Position\":\"1\",\"Y_Position\":\"5\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"20\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"MpGauge\",\"X_Position\":\"1\",\"Y_Position\":\"6\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"10\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"Equip\",\"X_Position\":\"4\",\"Y_Position\":\"1\",\"X_Coordinate\":\"-50\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"240\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"Atk\",\"X_Position\":\"2\",\"Y_Position\":\"2\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"Def\",\"X_Position\":\"2\",\"Y_Position\":\"3\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"Mat\",\"X_Position\":\"2\",\"Y_Position\":\"4\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"Mdf\",\"X_Position\":\"3\",\"Y_Position\":\"2\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"Agi\",\"X_Position\":\"3\",\"Y_Position\":\"3\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"Luk\",\"X_Position\":\"3\",\"Y_Position\":\"4\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'left'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"ExpInfo\",\"X_Position\":\"2\",\"Y_Position\":\"5\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"300\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'right'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}","{\"DateSelect\":\"Exp\",\"X_Position\":\"2\",\"Y_Position\":\"6\",\"X_Coordinate\":\"-44\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"300\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"NameColor\":\"16\",\"Align\":\"'right'\",\"paramUnit\":\"\",\"FontSize\":\"0\",\"FontFace\":\"\",\"ValueFontFace\":\"\",\"Icon\":\"0\",\"IconY\":\"2\",\"DetaEval\":\"\",\"Back\":\"false\",\"Decimal\":\"0\",\"GaugeSetting\":\"------------------------------\",\"GaugeID\":\"\",\"GaugeHeight\":\"12\",\"DetaEval2\":\"\",\"Color1\":\"-1\",\"Color2\":\"-1\",\"ImgSetting\":\"------------------------------\",\"ImgData\":\"\",\"BattleMemberOpacity\":\"true\",\"EquipSetting\":\"------------------------------\",\"EquipStartIndex\":\"0\",\"EquipNum\":\"0\",\"OtherSetting\":\"------------------------------\",\"Text\":\"\",\"CondSetting\":\"------------------------------\",\"Conditions\":\"\"}"]
 * @type struct<ActorStatusList>[]
 * @parent ContentsSetting
 * 
 * @param ContentsCols
 * @text コンテンツ列数
 * @desc 項目のコンテンツ列数
 * @type number
 * @default 4
 * @min 1
 * @max 4
 * @parent ContentsSetting
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
 * @param ActorImgSetting
 * @text ステータスウィンドウアクター画像設定
 * @default ------------------------------
 * 
 * @param GraphicMode
 * @desc ステータスウィンドウに表示するアクター画像を指定します。
 * @text ステータスウィンドウ表示アクター画像
 * @type select
 * @option 表示なし
 * @value 'none'
 * @option 画像(アクターステータスウィンドウ内)
 * @value 'img'
 * @option 画像
 * @value 's_img'
 * @default 'none'
 * @parent ActorImgSetting
 * 
 * @param ActorsImgList
 * @text 画像設定
 * @desc アクターの画像設定
 * @default []
 * @type struct<actorImgList>[]
 * @parent ActorImgSetting
 * 
 * @param ActorPictureEXApp
 * @text 立ち絵表示EX適用
 * @desc 立ち絵表示EXの画像変更を適用します。OFFにした場合はこのプラグインでの設定が適用されます。
 * @type boolean
 * @default false
 * @parent ActorImgSetting
 * 
 * @param ActorImg_X
 * @text アクター画像基本X座標
 * @desc アクター画像の基本X座標
 * @type number
 * @max 9999
 * @min -9999
 * @default 0
 * @parent ActorImgSetting
 * 
 * @param ActorImg_Y
 * @text アクター画像基本Y座標
 * @desc アクター画像の基本Y座標
 * @type number
 * @max 9999
 * @min -9999
 * @default 0
 * @parent ActorImgSetting
 * 
 * @param ActorPosition
 * @text 立ち絵表示位置
 * @desc 立ち絵の表示位置を指定します。Apengは適用されません。
 * @type select
 * @option 左
 * @value Left
 * @option 中央
 * @value Center
 * @option 右
 * @value Right
 * @default Right
 * @parent ActorImgSetting
 * 
 * @param ActorFixedSetting
 * @text アクター並び替え固定設定(要NUUN_ActorFixed)
 * @default ------------------------------
 * 
 * @param FixedActorBackColor
 * @text 固定アクター背景色
 * @desc 固定アクターの背景色。(メニュー、戦闘共通)
 * @type number
 * @default 3
 * @min -1
 * @parent ActorFixedSetting
 * 
 * @param ConflictMeasures
 * @text 競合対策
 * @default ------------------------------
 * 
 * @param CancelSeFormula
 * @text キャンセルSE無効評価式
 * @desc キャンセルSEの音声データを取得する評価式。無記入でシステムのキャンセル音。
 * @type combo
 * @option '$gameSystem.getSystemSound(n) ? $gameSystem.getSystemSound(n) : $dataSystem.sounds[n];//システム効果音変更'
 * @default 
 * @parent ConflictMeasures
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
 * @option 顔グラ(1)(2)(3)(4)(26)
 * @value Face
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
 *  
 */

var Imported = Imported || {};
Imported.NUUN_SceneFormation = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const parameters = PluginManager.parameters('NUUN_SceneFormation');
    const paramSupport = PluginManager.parameters('NUUN_SceneFormation_SupportActor');
    params.SupportActorBackColor = (DataManager.nuun_structureData(paramSupport['SupportActorBackColor']));
    const paramList = {};

    const pluginName = "NUUN_SceneFormation";

    PluginManager.registerCommand(pluginName, 'SceneFormationOpen', args => {
        if (Imported.NUUN_SceneBattleFormation && $gameParty.inBattle()) {
            SceneManager._scene.commandFormation();
        } else {
            SceneManager.push(Scene_Formation);
        }
    });

    PluginManager.registerCommand(pluginName, 'BattleActorFixed', args => {
        const actorId = Number(args.ActorId);
        $gameParty.setBattleActorFixed(actorId);
    });
    
    PluginManager.registerCommand(pluginName, 'BattleActorFixedRelease', args => {
        const actorId = Number(args.ActorId);
        $gameParty.setBattleActorFixedRelease(actorId);
    });


    function isbattleMembersDead(actor, withdrawalActor) {
        const members = $gameParty.battleMembers().filter(member => member !== withdrawalActor && member.isDead());
        return members.length + (actor && actor.isDead() ? 1 : 0);
    };
      
    function _isActorPictureEXApp() {
        return Imported.NUUN_ActorPicture && paramList.ActorPictureEXApp;
    };

    function _getActorImgData(actor) {
        return null;
    }

    NuunManager.isBattleFixedActor = function(actor) {
        return false;
    };


    Game_Actor.prototype.setBattleFixed = function() {
        this._battleFixed = true;
    };
      
    Game_Actor.prototype.setBattleFixedRelease = function() {
        this._battleFixed = false;
    };
      
    Game_Actor.prototype.isBattleFixed = function() {
        return this._battleFixed || this.actor().meta.BattleMemberFixed;
    };


    const _Game_Party_initialize = Game_Party.prototype.initialize;
    Game_Party.prototype.initialize = function() {
        this._formationBattleMembers = null;
        _Game_Party_initialize.call(this);
    };

    Game_Party.prototype.getFormationBattleMember = function() {
        return this._formationBattleMembers;
    };

    const _Game_Party_maxBattleMembers = Game_Party.prototype.maxBattleMembers;
    Game_Party.prototype.maxBattleMembers = function() {
        if (this._formationBattleMembers) {
            return Math.min(this.getFormationBattleMember(), _Game_Party_maxBattleMembers.call(this));
        } else {
            this._formationBattleMembers = _Game_Party_maxBattleMembers.call(this);
            return this._formationBattleMembers;
        }
    };

    Game_Party.prototype.originalMaxBattleMembers = function() {
        return _Game_Party_maxBattleMembers.call(this);
    };

    Game_Party.prototype.formationBattleMember = function() {
        const members = this.battleMembers();
        if (params.VariableBattleMember) {
            members.push(null);
        }
        return members;
    };

    Game_Party.prototype.formationMember = function() {
        const members = this.allStandByMembers();
        if (params.VariableBattleMember) {
            members.push(null);
        }
        return members;
    };

    Game_Party.prototype.allStandByMembers = function() {
        return this.allMembers().filter(member => member.isAppeared()).slice(this.maxBattleMembers());
    };

    Game_Party.prototype.checkFormationBattleMember = function(addActor, withdrawalActor) {
        let battleMember = this.battleMembers().filter(member => member !== withdrawalActor);
        if (addActor) {
            battleMember.push(addActor);
        }
        return !battleMember.every(member => member.isDead());
    };

    Game_Party.prototype.withdrawalOrder = function(index) {
        const withdrawalActor = this._actors.splice(index, 1);
        Array.prototype.push.apply(this._actors, [withdrawalActor]);
    };

    Game_Party.prototype.entryOrder = function(index) {
        const entryActor = this._actors[index];
        const members = this.formationBattleMember();
        index += index >= members.length ? 1 : 0;
        this._actors.splice(members.length - 1, 0, entryActor);
        this._actors.splice(index, 1);
    };

    Game_Party.prototype.changeWithdrawaBattleMember = function() {
        const members = this._formationBattleMembers - 1;
        this._formationBattleMembers = members.clamp(1, this.battleMembers().length - 1);
    };

    Game_Party.prototype.changeEntryBattleMember = function() {
        const members = this._formationBattleMembers + (this.battleMembers().length === this._formationBattleMembers ? 1 : 0);
        this._formationBattleMembers = members.clamp(1, _Game_Party_maxBattleMembers.call(this));
    };

    Game_Party.prototype.useFormation = function() {
        return true;
    };

    Game_Party.prototype.checkSwap = function(index) {
        return true;
    };

    Game_Party.prototype.setBattleActorFixed = function(id) {
        if (id > 0) {
            const actor = $gameActors.actor(id)
            actor.setBattleFixed();
        } else {
            this.allMembers().forEach(actor => actor.setBattleFixed());
        }
    };

    Game_Party.prototype.setBattleActorFixedRelease = function(id) {
        if (id > 0) {
            $gameActors.actor(id).setBattleFixedRelease();
        } else {
            this.allMembers().forEach(actor => actor.setBattleFixedRelease());
        }
    };


    Scene_Base.prototype.setNuun_Formation = function(mode, paramData) {
        return new Nuun_Formation(this, mode, paramData);
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
        this._formation = this.setNuun_Formation(false);
    };
      
    Scene_Formation.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this._formation.create();
    };
      
    Scene_Formation.prototype.createWindowLayer = function() {
        this._formation.createBattleMemberActor();
        Scene_MenuBase.prototype.createWindowLayer.call(this);
    };
      
    const _Scene_Formation_update = Scene_Formation.prototype.update;
    Scene_Formation.prototype.update = function() {
        _Scene_Formation_update.call(this);
        this._formation.update();
    };
      
    const _Scene_Formation_createBackground = Scene_Formation.prototype.createBackground;
    Scene_Formation.prototype.createBackground = function() {
        _Scene_Formation_createBackground.apply(this, arguments);
        if (params.BackGroundImg) {
            const bitmap = ImageManager.nuun_LoadPictures(params.BackGroundImg);
            const sprite = new Sprite(bitmap);
            this.addChild(sprite);
            bitmap.addLoadListener(function() {
                this.setBackGround(sprite);
            }.bind(this));
        }
    };
      
    Scene_Formation.prototype.setBackGround = function(sprite) {
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

    class Nuun_Formation {
        constructor(scene, mode , paramData) {
            this._scene = scene;
            this._isBattle = mode;//この段階では$gameParty.inBattle()はfalse
            this.initMembers();
            if (mode) {
                this.setBattleParamData(paramData);
            } else {
                this.setParamData(paramData);
            }
        }

        initMembers() {
            this._selectIndex = 0;
            this._bmSselectIndex = 0;
            this._mSelectIndex = 0; 
            this._commandWindow = null;
            this._spriteActor = null;
            this._leader = null;
            $gameTemp.changeCursor = false;
            $gameTemp.changeTouch = false;
            this.formationIndex = -1;
            this.pendingIndex = -1;
            this.cursorMode = 'battle';
            this.pendingMode = null;
            this.formationOldActor = null;
            this._baseSprite = null;
            this._changeMembers = [];
        }

        setBattleCursorMode() {
            this.cursorMode = 'battle';
        }
        
        setMemberCursorMode() {
            this.cursorMode = 'member';
        }

        isCursorBattleMode() {
            return this.cursorMode === 'battle';
        }

        isCursorMemberMode() {
            return this.cursorMode === 'member';
        }

        setBattlePendingMode() {
            this.pendingMode = 'battle';
        }
        
        setMemberPendingMode() {
            this.pendingMode = 'member';
        }

        clearPendingMode() {
            this.pendingMode = null;
        }

        isPendingBattleMode() {
            return this.pendingMode === 'battle';
        }

        isPendingMemberMode() {
            return this.pendingMode === 'member';
        }

        setFormationIndex(index) {
            this.formationIndex = index;
        }

        setPendingIndex(index) {
            this.pendingIndex = index;
        }

        getPendingIndex() {
            return this.pendingIndex;
        }

        setBattleParamData(paramData) {
            paramList.CommandShowMode = paramData.CommandShowMode;
            paramList.FormationActorState = paramData.FormationActorState;
            paramList.EndTurnAfteExecution = paramData.EndTurnAfteExecution;
            if (paramData.MenuFormationLayout) {
                this.setParamData();
                return;
            }
            paramList.WindowCenter = paramData.WindowCenter;
            paramList.WindowZero = paramData.WindowZero;
            paramList.CursorSwitchingDirection = paramData.CursorSwitchingDirection;
            paramList.BattleMemberName_X = paramData.BattleMemberName_X;
            paramList.BattleMemberName_Y = paramData.BattleMemberName_Y;
            paramList.MemberName_X = paramData.MemberName_X;
            paramList.MemberName_Y = paramData.MemberName_Y;
            paramList.BattleMember_X = paramData.BattleMember_X;
            paramList.BattleMember_Y = paramData.BattleMember_Y;
            paramList.Member_X = paramData.Member_X;
            paramList.Member_Y = paramData.Member_Y;
            paramList.BattleMember_Cols = paramData.BattleMember_Cols;
            paramList.BattleMember_Rows = paramData.BattleMember_Rows;
            paramList.Member_Cols = paramData.Member_Cols;
            paramList.Member_Rows = paramData.Member_Rows;
            paramList.Status_X = paramData.Status_X;
            paramList.Status_Y = paramData.Status_Y;
            paramList.BattleMemberWindowWidth = paramData.BattleMemberWindowWidth;
            paramList.BattleMemberWindowHeight = paramData.BattleMemberWindowHeight;
            paramList.MemberWindowWidth = paramData.MemberWindowWidth;
            paramList.MemberWindowHeight = paramData.MemberWindowHeight;
            paramList.Status_Width = paramData.Status_Width;
            paramList.Status_Height = paramData.Status_Height;
            paramList.ContentsCols = paramData.ContentsCols;
            paramList.ActorStatus = paramData.ActorStatus ? paramData.ActorStatus : params.ActorStatus;
            paramList.GraphicMode = paramData.GraphicMode;
            paramList.ActorPosition = paramData.ActorPosition;
            paramList.ActorPictureEXApp = paramData.ActorPictureEXApp;
            paramList.ActorsImgList = paramData.ActorsImgList ? paramData.ActorsImgList : params.ActorsImgList;
            paramList.ActorImg_X = paramData.ActorImg_X;
            paramList.ActorImg_Y = paramData.ActorImg_Y;
        }
        
        setParamData() {
            paramList.WindowCenter = params.WindowCenter;
            paramList.WindowZero = params.WindowZero;
            paramList.CursorSwitchingDirection = params.CursorSwitchingDirection;
            paramList.BattleMemberName_X = params.BattleMemberName_X;
            paramList.BattleMemberName_Y = params.BattleMemberName_Y;
            paramList.MemberName_X = params.MemberName_X;
            paramList.MemberName_Y = params.MemberName_Y;
            paramList.BattleMember_X = params.BattleMember_X;
            paramList.BattleMember_Y = params.BattleMember_Y;
            paramList.Member_X = params.Member_X;
            paramList.Member_Y = params.Member_Y;
            paramList.BattleMember_Cols = params.BattleMember_Cols;
            paramList.BattleMember_Rows = params.BattleMember_Rows;
            paramList.Member_Cols = params.Member_Cols;
            paramList.Member_Rows = params.Member_Rows;
            paramList.Status_X = params.Status_X;
            paramList.Status_Y = params.Status_Y;
            paramList.BattleMemberWindowWidth = params.BattleMemberWindowWidth;
            paramList.BattleMemberWindowHeight = params.BattleMemberWindowHeight;
            paramList.MemberWindowWidth = params.MemberWindowWidth;
            paramList.MemberWindowHeight = params.MemberWindowHeight;
            paramList.Status_Width = params.Status_Width;
            paramList.Status_Height = params.Status_Height;
            paramList.ContentsCols = params.ContentsCols;
            paramList.ActorStatus = params.ActorStatus;
            paramList.GraphicMode = params.GraphicMode;
            paramList.ActorPosition = params.ActorPosition;
            paramList.ActorPictureEXApp = params.ActorPictureEXApp;
            paramList.ActorsImgList = params.ActorsImgList;
            paramList.ActorImg_X = params.ActorImg_X;
            paramList.ActorImg_Y = params.ActorImg_Y;
        }

        create() {
            this.createBackground();
            this.createBattleMemberWindow();
            this.createBattleMemberNameWindow();
            this.createMemberWindow();
            this.createMemberNameWindow();
            this.createMemberStatusWindow();
            this.initSelect();
        }
        
        createBackground() {
            
        }

        createBattleMemberActor() {
            if (params.GraphicMode === "s_img") {
                if (!this._spriteActor) {
                    this._spriteActor = new Sprite_NuunActor(this._scene, params);
                }
                this._scene.addChild(this._spriteActor);
            }
        }

        createBattleMemberWindow() {
            const rect = this.battleMemberWindowRect();
            const battleMemberWindow = new Window_FormationBattleMember(rect, this);
            battleMemberWindow.setHandler("ok", this.onBattleMemberOk.bind(this));
            battleMemberWindow.setHandler("cancel", this.onCancel.bind(this));
            battleMemberWindow.setSpriteActor(this._spriteActor);
            this._scene.addWindow(battleMemberWindow);
            this._battleMemberWindow = battleMemberWindow;
            if (this._isBattle) {
                battleMemberWindow.openness = 0;
            } else {
                battleMemberWindow.activate();
            }
        }
        
        createBattleMemberNameWindow() {
            const rect = this.battleMemberNameWindowRect();
            const battleMemberNameWindow = new Window_FormationBattleMemberName(rect);
            this._scene.addWindow(battleMemberNameWindow);
            this._battleMemberNameWindow = battleMemberNameWindow;
            if (this._isBattle) {
                battleMemberNameWindow.openness = 0;
            }
        }
    
        createMemberWindow() {
            const rect = this.memberWindowRect();
            const memberWindow = new Window_FormationMember(rect, this);
            memberWindow.setHandler("ok", this.onBattleMemberOk.bind(this));
            memberWindow.setHandler("cancel", this.onCancel.bind(this));
            memberWindow.setSpriteActor(this._spriteActor);
            this._scene.addWindow(memberWindow);
            this._memberWindow = memberWindow;
            if (this._isBattle) {
                 memberWindow.openness = 0;
            }
        }
          
        createMemberNameWindow() {
            const rect = this.memberNameWindowRect();
            const memberNameWindow = new Window_FormationMemberName(rect);
            this._scene.addWindow(memberNameWindow);
            this._memberNameWindow = memberNameWindow;
            if (this._isBattle) {
                memberNameWindow.openness = 0;
            }
        }
          
        createMemberStatusWindow() {
            const scene = this._scene;
            const rect = this.memberStatusWindowRect();
            const memberStatusWindow = new Window_FormationStatus(rect, this);
            scene.addWindow(memberStatusWindow);
            this._memberStatusWindow = memberStatusWindow;
            if (this._isBattle) {
                memberStatusWindow.openness = 0;
            }
        }
        
        battleMemberNameWindowRect() {
            const wx = paramList.BattleMemberName_X + (paramList.WindowCenter ? (Graphics.boxWidth - this.memberWindowWidth()) / 2 : 0);
            const wy = paramList.BattleMemberName_Y;
            const ww = this.nameWidth();
            const wh = this._scene.calcWindowHeight(1, true);
            return new Rectangle(wx, wy, ww, wh);
        }
          
        memberNameWindowRect() {
            const wx = paramList.MemberName_X + (paramList.WindowCenter ? (Graphics.boxWidth - this.memberWindowWidth()) / 2 : 0);
            const wy = paramList.MemberName_Y + (paramList.WindowZero ? 0 : this.memberY());
            const ww = this.nameWidth();
            const wh = this._scene.calcWindowHeight(1, true);
            return new Rectangle(wx, wy, ww, wh);
        }
          
        battleMemberWindowRect() {
            const ww = paramList.BattleMemberWindowWidth > 0 ? paramList.BattleMemberWindowWidth : ($gameSystem.windowPadding() * 2 + this.battleMemberWindowWidth());
            const wx = paramList.BattleMember_X + (paramList.WindowCenter ? (Graphics.boxWidth - this.memberWindowWidth()) / 2 : 0);
            const wy = paramList.BattleMember_Y + (paramList.WindowZero ? 0 : this._scene.calcWindowHeight(1, true));
            const wh = paramList.BattleMemberWindowHeight > 0 ? paramList.BattleMemberWindowHeight : (32 + paramList.BattleMember_Rows * (params.MemberHeight));
            return new Rectangle(wx, wy, ww, wh);
        }
          
        memberWindowRect() {
            const ww = paramList.MemberWindowWidth > 0 ? paramList.MemberWindowWidth : this.memberWindowWidth();
            const wx = paramList.Member_X + (paramList.WindowCenter ? (Graphics.boxWidth - ww) / 2 : 0);
            const wy = paramList.Member_Y + (paramList.WindowZero ? 0 : this.memberY() + this._scene.calcWindowHeight(1, true));
            const wh = paramList.MemberWindowHeight > 0 ? paramList.MemberWindowHeight : (32 + (paramList.Member_Rows) * params.MemberHeight);
            return new Rectangle(wx, wy, ww, wh);
        }
          
        memberStatusWindowRect() {
            const wx = paramList.Status_X;
            const wh = paramList.Status_Height > 0 ? paramList.Status_Height : this._scene.calcWindowHeight(5, true);
            const wy = paramList.Status_Y + (paramList.WindowZero ? 0 : Graphics.boxHeight - wh);
            const ww = paramList.Status_Width > 0 ? paramList.Status_Width : Graphics.boxWidth;
            return new Rectangle(wx, wy, ww, wh);
        }

        initSelect() {
            this._battleMemberWindow.select(0);
            this._memberWindow.setPendingIndex(-1);
            this._battleMemberWindow.setPendingIndex(-1);
            this.setBattleCursorMode();
            this.clearPendingMode();
            this.initBattleMembers();
        }

        initBattleMembers() {
            this._changeMembers = $gameParty.battleMembers().map(member => member);
        }
        
        setCommand(command) {
            this._commandWindow = command;
        }
        
        update() {
            if ($gameTemp.changeCursor || $gameTemp.changeTouch) {
                if (this.isCursorBattleMode()) {
                    this.onChangeBattleMemberOk();
                } else if (this.isCursorMemberMode()) {
                    this.onChangeMemberOk();
                }
            }
        }

        changeBattleMemberCursorIndex() {
            switch (paramList.CursorSwitchingDirection) {
                case 0:
                    return Math.min(this.formationIndex % this._battleMemberWindow.maxCols(), $gameParty.formationMember().length - 1, paramList.Member_Cols);
                case 1:
                    return Math.min((Math.ceil(this.formationIndex / this._battleMemberWindow.maxCols()) - 1) * paramList.Member_Cols, this._memberWindow.maxItems() - 1);
            }
        }

        changeMemberCursorIndex() {
            const cols = this._battleMemberWindow.maxCols();
            const maxItem = this._battleMemberWindow.maxItems();
            const rows = Math.ceil(maxItem / cols);
            const value = Math.max((rows * cols) - cols, 0) + this.formationIndex;
            switch (paramList.CursorSwitchingDirection) {
                case 0:
                    return Math.min((value >= maxItem ? (rows > 1 ? value - cols : maxItem - 1) : value), maxItem - 1);
                case 1:
                    return Math.min(((Math.ceil(this.formationIndex / this._memberWindow.maxCols())) * cols) + cols - 1, maxItem - 1);
            }
        }

        onChangeBattleMemberOk() {
            const index = this.changeBattleMemberCursorIndex();
            this._battleMemberWindow.deselect();
            this._battleMemberWindow.deactivate();
            this._memberWindow.activate();
            if ($gameTemp.changeCursor) {
                this._memberWindow.select(index);
            }
            $gameTemp.changeCursor = false;
            $gameTemp.changeTouch = false;
            this.setMemberCursorMode()
        }
        
        onChangeMemberOk() {
            const index = this.changeMemberCursorIndex();
            this._memberWindow.deselect();
            this._memberWindow.deactivate();
            this._battleMemberWindow.activate();
            if ($gameTemp.changeCursor) {
                this._battleMemberWindow.select(index);
            }
            $gameTemp.changeCursor = false;
            $gameTemp.changeTouch = false;
            this.setBattleCursorMode();
        }
        
        onBattleMemberOk() {
            if (this.pendingIndex >= 0) {
                this.onFormationOk();
            } else {
                if (this.isCursorBattleMode()) {
                    this._memberWindow.setPendingIndex(-1);
                    this._battleMemberWindow.setPendingIndex(this.formationIndex);
                } else {
                    this._battleMemberWindow.setPendingIndex(-1);
                    this._memberWindow.setPendingIndex(this.formationIndex);
                }
            }
            if (this.isCursorBattleMode()) {
                this._battleMemberWindow.activate();
            } else {
                this._memberWindow.activate();
            }
        }
        
        onFormationOk() {
            const index = this.getActorIndex();
            const p_Index = this.getPendingActorIndex();
            if (index >= 0 && p_Index >= 0) {
                $gameParty.swapOrder(index, p_Index);
                this.formationActorRefresh();
            } else if (index < 0) {
                this.selectOrder(p_Index);
            } else if (p_Index < 0) {
                this.pendingOrder(index);
            }
            this._battleMemberWindow.setPendingIndex(-1);
            this._memberWindow.setPendingIndex(-1);
            this._battleMemberWindow.refresh();
            this._memberWindow.refresh();
            this.clearPendingMode();
            if (this._isBattle) {
                $gameTemp.formationRefresh = true;
            }
        }
        
        selectOrder(index) {
            const check = $gameParty.checkSwap(index);
            if (this.isCursorBattleMode()) {
                $gameParty.entryOrder(index);
                if (this.isPendingMemberMode() && check) {
                    $gameParty.changeEntryBattleMember();
                }
                $gamePlayer.refresh();
            } else {
                $gameParty.withdrawalOrder(index);
                if (this.isPendingBattleMode() && check) {
                    $gameParty.changeWithdrawaBattleMember();
                }
                $gamePlayer.refresh();
            }
        }
        
        pendingOrder(index) {
            const check = $gameParty.checkSwap(index);
            if (this.isPendingBattleMode()) {
                $gameParty.entryOrder(index);
                if (this.isCursorMemberMode() && check) {
                    $gameParty.changeEntryBattleMember();
                }
                $gamePlayer.refresh();
            } else {
                $gameParty.withdrawalOrder(index);
                if (this.isCursorBattleMode() && check) {
                    $gameParty.changeWithdrawaBattleMember();
                }
                $gamePlayer.refresh();
            }
        }
        
        formationActorRefresh() {
            if (this.isCursorBattleMode()) {
                this._battleMemberWindow.redrawItem(this.formationIndex);
            } else {
                this._memberWindow.redrawItem(this.formationIndex);
            }
            if (this.isPendingBattleMode()) {
                this._battleMemberWindow.redrawItem(this._battleMemberWindow.pendingIndex());
            } else {
                this._memberWindow.redrawItem(this._memberWindow.pendingIndex());
            }
        }
        
        getActorIndex() {
            let actor = null;
            if (this.isCursorBattleMode()) {
                actor = $gameParty.formationBattleMember()[this.formationIndex];
            } else {
                actor = $gameParty.formationMember()[this.formationIndex];
            }
            if (actor) {
                return $gameParty.allMembers().indexOf(actor);
            }
            return -1;
        }
        
        getPendingActorIndex() {
            let actor = null;
            if (this.isPendingBattleMode()) {
                actor = $gameParty.formationBattleMember()[this._battleMemberWindow.pendingIndex()];
            } else {
                actor = $gameParty.formationMember()[this._memberWindow.pendingIndex()];
            }
            if (actor) {
                return $gameParty.allMembers().indexOf(actor);
            }
            return -1;
        }
        
        onCancel() {
            if (this.pendingIndex >= 0) {
                if (this.isCursorBattleMode()) {
                    this.onBattleMemberCancel();
                } else {
                    this.onMemberCancel();
                }
            } else {
                if (!this.isBattleFixedMembers()) {
                    this.cancelSystemSe(2);
                    SoundManager.playBuzzer();
                    if (this.isCursorBattleMode()) {
                        this._battleMemberWindow.activate();
                    } else {
                        this._memberWindow.activate();
                    }
                    return;
                }
                if (this._isBattle) {
                    this.close();
                    BattleManager.battleCommandRefresh();
                    const changeOk = this.changeActorRefresh();
                    if (paramList.EndTurnAfteExecution && changeOk) {
                        if (BattleManager.isTpb()) {
                            const actor = BattleManager.actor();
                            if (actor && paramList.CommandShowMode === "Actor") {
                                this._scene.hideSubInputWindows();
                                this._scene.selectNextCommand();
                            }
                        }
                    }
                } else {
                    this._scene.popScene();
                }
            }
        }

        isBattleFixedMembers() {
            for (const member of $gameParty.allMembers()) {
                if (this.isBattleFixedActor(member)) {
                    if (!member.isBattleMember()) {
                        return false;
                    }
                }
            }
            return true;
        }

        isBattleFixedActor(member) {
            return member.isBattleFixed() || NuunManager.isBattleFixedActor(member);
        }
        
        changeActorRefresh() {
            let changeOk = false;
            $gameParty.battleMembers().forEach(member => {
                if (!this._changeMembers.includes(member)) {
                    if (paramList.FormationActorState > 0 && member.isStateAddable(paramList.FormationActorState)) {
                        member.addState(paramList.FormationActorState);
                    }
                    changeOk = true;
                }
            })
            this._changeMembers.forEach(member => {
                if (!$gameParty.battleMembers().includes(member)) {
                    if (member.isStateAffected(paramList.FormationActorState)) {
                        member.removeState(paramList.FormationActorState);
                    }
                    changeOk = true;
                }
            })
            return changeOk;
        }

        onBattleMemberCancel() {
            this._memberWindow.setPendingIndex(-1);
            this._battleMemberWindow.setPendingIndex(-1);
            this._battleMemberWindow.activate();
            this.clearPendingMode();
        }
        
        onMemberCancel() {
            this._memberWindow.setPendingIndex(-1);
            this._battleMemberWindow.setPendingIndex(-1);
            this._memberWindow.activate();
            this.clearPendingMode();
        }
        
        memberWindowWidth() {
            return $gameSystem.windowPadding() * 2 + paramList.Member_Cols * (params.CharacterMode === 'face' ? 152 : 56);
        }
          
        nameWidth() {
            return 240;
        }
          
        memberY() {
            return this._battleMemberWindow.y + this._battleMemberWindow.height + 12;
        }
        
        battleMemberWindowWidth() {
            return (paramList.BattleMember_Cols > 0 ? paramList.BattleMember_Cols : _Game_Party_maxBattleMembers.call($gameParty)) * (Imported.NUUN_SceneFormation_SupportActor && paramList.BattleMember_Rows === 1 ? 2 : 1) * (params.CharacterMode === 'face' ? 152 : 56);
        }

        cancelSystemSe(n) {
            const se = params.CancelSeFormula ? eval(params.CancelSeFormula) : $dataSystem.sounds[n];
            for (const buffer of AudioManager._staticBuffers) {
                if (buffer.name === se.name) {
                    buffer.stop();
                    break;
                }
            }
        }
        
        open() {
            BattleManager.formationCommandActor = BattleManager.actor();
            this._battleMemberNameWindow.open();
            this._memberNameWindow.open();
            this._battleMemberWindow.open();
            this._memberWindow.open();
            this._memberStatusWindow.open();
            this._battleMemberNameWindow.show();
            this._memberNameWindow.show();
            this._battleMemberWindow.show();
            this._memberWindow.show();
            this._memberStatusWindow.show();
            this._battleMemberWindow.refresh();
            this._memberWindow.refresh();
            this._battleMemberWindow.activate();
            this._commandWindow.hide();
            this.formationOldActor = null;
            this.initSelect();
        }
        
        close() {
            $gameTemp.requestBattleRefresh();
            if (!BattleManager.isTpb()) {
                $gameParty.formationMakeActions();
            }
            this._battleMemberNameWindow.close();
            this._memberNameWindow.close();
            this._battleMemberWindow.close();
            this._memberWindow.close();
            this._memberStatusWindow.close();
            this._battleMemberWindow.deselect();
            this._memberWindow.deselect();
            this._commandWindow.show();
            this._commandWindow.open();
            this._commandWindow.activate();
        }
    };

    Window_StatusBase.prototype.drawBackGroundActor = function(index) {
        const actor = this.actor(index);
        if (index !== this._pendingIndex) {
            const rect = this.itemRect(index);
            this.contentsBack.paintOpacity = 128;
            if (actor && params.DeadActorColor >= 0 && actor.isDead()) {
                const deadcolor = NuunManager.getColorCode(params.DeadActorColor);
                this.contentsBack.fillRect(rect.x + 1, rect.y + 1, rect.width - 2, rect.height - 2, deadcolor);
            } else if (Imported.NUUN_ActorFixed && actor && params.FixedActorBackColor >= 0 && actor.isFixed()) {
                const fixedColor = NuunManager.getColorCode(params.FixedActorBackColor);
                this.contentsBack.fillRect(rect.x + 1, rect.y + 1, rect.width - 2, rect.height - 2, fixedColor);
            } else if (actor && params.BattleFixedActorColor >= 0 && actor.actor().meta.BattleMemberFixed) {
                const battleFixedColor = NuunManager.getColorCode(params.BattleFixedActorColor || 0);
                this.contentsBack.fillRect(rect.x + 1, rect.y + 1, rect.width - 2, rect.height - 2, battleFixedColor);
            } else if (Imported.NUUN_SceneFormation_SupportActor && params.SupportActorBackColor >= 0 && actor && actor.getSupportActor()) {
                const supportcolor = NuunManager.getColorCode(params.SupportActorBackColor);
                this.contentsBack.fillRect(rect.x + 1, rect.y + 1, rect.width - 2, rect.height - 2, supportcolor);
            }
            this.contentsBack.paintOpacity = 255;
        }
    };

    Window_StatusBase.prototype.drawFormationImg = function(data, actor, bitmap, x, y, width, height) {
        if (data) {
            width = Math.min(width - 2, bitmap.width);
            height = Math.min(height - 2, bitmap.height);
            const scale = (data.wActor_Scale || 100) / 100;
            const sw = width * scale;
            const sh = height * scale;
            const sx = data.wImg_SX || 0;
            const sy = data.wImg_SY || 0;
            const x2 = x + 1 + (data.wActor_X || 0);// + ActorImg_X;
            const y2 = y + 1 + (data.wActor_Y || 0);// + ActorImg_Y;
            this.contents.blt(bitmap, sx, sy, width + (width - sw), height + (height - sh), x2, y2, width, height);
        }
        this.drawLavel(actor, x, y, width);
    };

    Window_StatusBase.prototype.setActorFormationStatus = function(index) {
        const actor = this.actor(index);
        if (this._formation._memberStatusWindow && actor !== this._formation.formationOldActor) {
            this._formation._memberStatusWindow.setStatus(actor);
            if (this._spriteActor) {
                this._spriteActor.setup(actor);
            }
            this._formation.formationOldActor = actor;
        }
    };

    Window_StatusBase.prototype.getFormationSelectActor = function() {
        return $gameParty.leader();
    };


    //戦闘メンバー名称
    function Window_FormationBattleMemberName() {
        this.initialize(...arguments);
    }
    
    Window_FormationBattleMemberName.prototype = Object.create(Window_StatusBase.prototype);
    Window_FormationBattleMemberName.prototype.constructor = Window_FormationBattleMemberName;

    Window_FormationBattleMemberName.prototype.initialize = function(rect) {
    Window_StatusBase.prototype.initialize.call(this, rect);
        this.refresh();
    };

    Window_FormationBattleMemberName.prototype.refresh = function() {
        const rect = this.itemLineRect(0);
        this.drawContentsName(rect.x, rect.y, rect.width);
    };

    Window_FormationBattleMemberName.prototype.drawContentsName = function(x, y, width) {
        this.drawText(params.BattleMemberName, x, y, width);
    };

    window.FormationBattleMemberName = Window_FormationBattleMemberName;

    //待機メンバー名称
    function Window_FormationMemberName() {
        this.initialize(...arguments);
    }
    
    Window_FormationMemberName.prototype = Object.create(Window_StatusBase.prototype);
    Window_FormationMemberName.prototype.constructor = Window_FormationMemberName;

    Window_FormationMemberName.prototype.initialize = function(rect) {
        Window_StatusBase.prototype.initialize.call(this, rect);
        this.refresh();
    };

    Window_FormationMemberName.prototype.refresh = function() {
        const rect = this.itemLineRect(0);
        this.drawContentsName(rect.x, rect.y, rect.width);
    };

    Window_FormationMemberName.prototype.drawContentsName = function(x, y, width) {
        this.drawText(params.MemberName, x, y, width);
    };

    window.Window_FormationMemberName = Window_FormationMemberName;

    //戦闘メンバー
    function Window_FormationBattleMember() {
        this.initialize(...arguments);
    }
    
    Window_FormationBattleMember.prototype = Object.create(Window_StatusBase.prototype);
    Window_FormationBattleMember.prototype.constructor = Window_FormationBattleMember;

    Window_FormationBattleMember.prototype.initialize = function(rect, formation) {
        this._formation = formation;
        this._members = $gameParty.formationBattleMember();
        Window_StatusBase.prototype.initialize.call(this, rect);
        this._formationMode = true;
        this._oldActor = null;
        this.refresh();
    };

    Window_FormationBattleMember.prototype.refresh = function() {
        this._members = $gameParty.formationBattleMember();
        Window_StatusBase.prototype.refresh.call(this);
    };

    Window_FormationBattleMember.prototype.maxItems = function() {
        return Math.min(this._members.length, _Game_Party_maxBattleMembers.call($gameParty) + (Imported.NUUN_SceneFormation_SupportActor ? $gameParty.membersInSupportActorNum(this._members) : 0));
    };

    Window_FormationBattleMember.prototype.maxCols = function() {
        return paramList.BattleMember_Cols > 0 ? paramList.BattleMember_Cols : _Game_Party_maxBattleMembers.call($gameParty);
    };

    Window_FormationBattleMember.prototype.getParamBattleMember_Rows = function() {
        return paramList.BattleMember_Rows;
    };

    Window_FormationBattleMember.prototype.itemHeight = function() {
        return Math.floor(this.innerHeight / paramList.BattleMember_Rows);
    };

    Window_FormationBattleMember.prototype.actor = function(index) {
        return this._members[index];
    };

    Window_FormationBattleMember.prototype.processOk = function() {
        this.setSelectIndex(this.index());
        Window_StatusBase.prototype.processOk.call(this);
    };

    Window_FormationBattleMember.prototype.getPendingIndex = function() {
        return this._formation.getPendingIndex();
    };

    Window_FormationBattleMember.prototype.isCurrentItemEnabled = function() {
        const actor = this.actor(this.index());
        const pendingActor = this._formation.isPendingBattleMode() ? this.actor(this.getPendingIndex()) : $gameParty.formationMember()[this.getPendingIndex()];
        if (pendingActor) {
            return !this.isFormationMembersDead(actor, pendingActor) && this.isChangeActorEnabled(actor, pendingActor) && this.isFormationChangeActorEnabled(actor, pendingActor);
        } else if (actor) {
            return this.isChangeActorEnabled(actor) && this.isFormationChangeActorEnabled(actor, pendingActor);
        } else if (!!this._formation.pendingMode && !actor && !pendingActor) {
            return false;
        } else {
            return true;
        }
    };

    Window_FormationBattleMember.prototype.isFormationMembersDead = function(actor, pendingActor) {
        const battleMember = $gameParty.battleMembers();
        const members = battleMember.filter(member => {
            if (pendingActor.isBattleMember()) {
                return true;
            } else {
                return member !== actor;
            }
        });
        if (!pendingActor.isBattleMember()) {
            Array.prototype.push.apply(members, [pendingActor]);
        }
        return members.every(member => member.isDead());
    };

    Window_FormationBattleMember.prototype.isChangeActorEnabled = function(actor) {
        return actor ? actor.isFormationChangeOk() : true;
    };

    Window_FormationBattleMember.prototype.isFormationChangeActorEnabled = function(actor, pendingActor) {
        return true;
    };

    Window_FormationBattleMember.prototype.select = function(index) {
    Window_Selectable.prototype.select.call(this, index);
        this.setActorFormationStatus(index);
    };

    const _Window_FormationBattleMember_processTouch = Window_FormationBattleMember.prototype.processTouch;
    Window_FormationBattleMember.prototype.processTouch = function() {
        this.onTouchSelectActive();
        _Window_FormationBattleMember_processTouch.call(this);
    };

    Window_FormationBattleMember.prototype.loadCheckBitmap = function(actor) {
        let bitmap = null;
        let loadBitmap = null;
        if (params.CharacterMode === 'chip') {
            loadBitmap = ImageManager.loadCharacter(actor.characterName());
        } else if (params.CharacterMode === 'face') {
            loadBitmap = _isActorPictureEXApp() ? actor.loadActorFace() : ImageManager.loadFace(actor.faceName());
        } else if (params.CharacterMode === 'img') {
            const data = _getActorImgData(actor);
            if (data) {
                loadBitmap = _isActorPictureEXApp() ? actor.loadActorGraphic() : ImageManager.nuun_LoadPictures(data.ActorImg);
            }
        }
        if (loadBitmap && !loadBitmap.isReady()) {
            bitmap = loadBitmap;
        }
        return bitmap;
    };

    Window_FormationBattleMember.prototype.drawItem = function(index) {
        this.drawBackGroundActor(index);
        this.drawPendingItemBackground(index);
        const actor = this.actor(index);
        const rect = this.itemRect(index);
        if (actor) {
            const bitmap = this.loadCheckBitmap(actor);
            if (bitmap) {
                bitmap.addLoadListener(function() {
                    this.drawItemImage(actor, rect);
                    this.drawItemStatus(actor, rect);
                }.bind(this));
            } else {
                this.drawItemImage(actor, rect);
                this.drawItemStatus(actor, rect);
            }
        } else {
            this.drawText('-', rect.x, rect.y + 4, rect.width, "center");
        }
    };

    Window_FormationBattleMember.prototype.drawItemImage = function(actor, rect) {
        if (params.CharacterMode === 'chip') {
            this.drawFormationCharacter(actor, rect.x, rect.y, rect.width);
        } else if (params.CharacterMode === 'face') {
            this.drawFormationFace(actor, rect.x, rect.y, Math.min(rect.width, ImageManager.faceWidth), Math.min(rect.height, ImageManager.faceHeight));
        } else if (params.CharacterMode === 'img') {
            this.drawFormationImg(actor, rect.x, rect.y, rect.width, rect.height);
        }
    };

    Window_FormationBattleMember.prototype.drawItemStatus = function(actor, rect) {
        this.drawLavel(actor, rect.x, rect.y, rect.width, rect.height);
    };

    Window_FormationBattleMember.prototype.drawFormationCharacter = function(actor, x, y, width) {
        let x2 = x + Math.floor(width / 2);
        let y2 = y +  + this.itemHeight() - this.rowSpacing();
        this.drawCharacter(actor.characterName(), actor.characterIndex(), x2, y2);
    };

    Window_FormationBattleMember.prototype.drawFormationFace = function(actor, x, y, width, height) {
        if (_isActorPictureEXApp()) {
            this.actorPictureEXDrawFace(actor, x + 1, y + 1, width - 2, height - 2);
        } else {
            this.drawActorFace(actor, x + 1, y + 1, width - 2, height - 2);
        }
    };

    Window_FormationBattleMember.prototype.drawLavel = function(actor, x, y, width, height) {
        if (params.LavelVisible) {
            const padding = Math.floor(this.itemPadding() / 2);
            this.contents.fontSize = $gameSystem.mainFontSize() + params.LevelFontSize;
            y += height - 30;
            x += padding;
            width = Math.min(width - padding, 60);
            const textWidth = this.textWidth(TextManager.levelA);
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(TextManager.levelA, x, y, width);
            this.resetTextColor();
            this.drawText(actor.level, x + textWidth, y, width - textWidth - padding, "right");
            this.contents.fontSize = $gameSystem.mainFontSize();
        }
    };

    Window_FormationBattleMember.prototype.itemRect = function(index) {
        const rect = Window_Selectable.prototype.itemRect.call(this, index);
        rect.height = Math.min(rect.height, params.MemberHeight);
        rect.y += this.itemHeight() - this.rowSpacing() - rect.height;
        return rect;
    };

    Window_FormationBattleMember.prototype.drawPendingItemBackground = function(index) {
        if (index === this._pendingIndex) {
            const rect = this.itemRect(index);
            const color = ColorManager.pendingColor();
            this.changePaintOpacity(false);
            this.contents.fillRect(rect.x + 1, rect.y + 1, rect.width - 2, rect.height - 2, color);
            this.changePaintOpacity(true);
        }
    };

    Window_FormationBattleMember.prototype.cursorDown = function(wrap) {
        if (paramList.CursorSwitchingDirection === 0) {
            const index = this.index();
            const cols = this.maxCols();
            const maxItem = this.maxItems();
            const rowIndex = maxItem - cols;
            Window_Selectable.prototype.cursorDown.apply(this, arguments);
            if ($gameParty.formationMember().length > 0 && index >= rowIndex) {
                this.changeFormationCursor(this.index());
            }
        } else {
            Window_Selectable.prototype.cursorDown.apply(this, arguments);
        }
    };

    Window_FormationBattleMember.prototype.cursorRight = function(wrap) {
        if (paramList.CursorSwitchingDirection === 1) {
            const index = this.index();
            const cols = this.maxCols();
            const maxItem = this.maxItems();
            const rightIndex = index % cols;
            Window_Selectable.prototype.cursorRight.apply(this, arguments);
            if ($gameParty.formationMember().length > 0 && rightIndex + 1 === cols || index === maxItem - 1) {
                this.changeFormationCursor(index);
            }
        } else {
            Window_Selectable.prototype.cursorRight.apply(this, arguments);
        }
    };

    Window_FormationBattleMember.prototype.onTouchSelectActive = function() {
        if (this.isHoverEnabled() && this._formation.isCursorMemberMode()) {
            const hitIndex = this.hitIndex();
            if (hitIndex >= 0) {
                this.activate();
                $gameTemp.changeTouch = true;
            }
        }
    };

    Window_FormationBattleMember.prototype.changeFormationCursor = function(index) {
        this.setSelectIndex(index);
        $gameTemp.changeCursor = true;
        this.playCursorSound();
    };

    Window_FormationBattleMember.prototype.playOkSound = function() {
        SoundManager.playOk();
    };

    Window_FormationBattleMember.prototype.setSelectIndex = function(index) {
        this._formation.setFormationIndex(index);
    };

    Window_FormationBattleMember.prototype.pendingIndex = function() {
        return this._pendingIndex;
    };

    Window_FormationBattleMember.prototype.setPendingIndex = function(index) {
        const lastPendingIndex = this._pendingIndex;
        this._pendingIndex = index;
        this._formation.setPendingIndex(index);
        this._formation.setBattlePendingMode();
        this.redrawItem(this._pendingIndex);
        this.redrawItem(lastPendingIndex);
    };

    Window_FormationBattleMember.prototype.setSpriteActor = function(sprite) {
        this._spriteActor = sprite;
    };

    window.Window_FormationBattleMember = Window_FormationBattleMember;

    //待機メンバー
    function Window_FormationMember() {
        this.initialize(...arguments);
    }
    
    Window_FormationMember.prototype = Object.create(Window_StatusBase.prototype);
    Window_FormationMember.prototype.constructor = Window_FormationMember;

    Window_FormationMember.prototype.initialize = function(rect, formation) {
        this._formation = formation;
        this._members = $gameParty.formationMember();
        Window_StatusBase.prototype.initialize.call(this, rect);
        this._formationMode = true;
        this._oldActor = null;
        this.refresh();
    };

    Window_FormationMember.prototype.refresh = function() {
        this._members = $gameParty.formationMember();
        Window_StatusBase.prototype.refresh.call(this);
    };

    Window_FormationMember.prototype.maxItems = function() {
        return this._members.length;
    };

    Window_FormationMember.prototype.maxCols = function() {
        return paramList.Member_Cols;
    };

    Window_FormationMember.prototype.itemHeight = function() {
        return Math.floor(this.innerHeight / paramList.Member_Rows);
    };

    Window_FormationMember.prototype.actor = function(index) {
        return this._members[index];
    };

    Window_FormationMember.prototype.processOk = function() {
        this.setSelectIndex(this.index());
        Window_StatusBase.prototype.processOk.call(this);
    };

    Window_FormationMember.prototype.getPendingIndex = function() {
        return this._formation.getPendingIndex();
    };

    Window_FormationMember.prototype.isCurrentItemEnabled = function() {
        const actor = this.actor(this.index());
        const pendingActor = this._formation.isPendingBattleMode() ? $gameParty.formationBattleMember()[this.getPendingIndex()] : this.actor(this.getPendingIndex());
        if (pendingActor) {
            return !this.isFormationMembersDead(actor, pendingActor) && this.isChangeActorEnabled(actor, pendingActor) && this.isFormationChangeActorEnabled(actor, pendingActor);
        } else if (actor) {
            return !this.isFormationMembersDead(actor, pendingActor) && this.isChangeActorEnabled(actor) && this.isFormationChangeActorEnabled(actor, pendingActor);
        } else if (!!this._formation.pendingMode && !actor && !pendingActor) {
            return false;
        } else {
            return true;
        }
    };

    Window_FormationMember.prototype.isFormationMembersDead = function(actor, pendingActor) {
        const battleMember = $gameParty.battleMembers();
        const members = battleMember.filter(member => {
            if (pendingActor && pendingActor.isBattleMember() && member === pendingActor) {
                return false;
            }
            return true;
        });
        if (actor && pendingActor && pendingActor.isBattleMember()) {
            Array.prototype.push.apply(members, [actor]);
        }
        return members.every(member => member.isDead());
    };

    Window_FormationMember.prototype.isChangeActorEnabled = function(actor) {
    return actor ? actor.isFormationChangeOk() : true;
    };

    Window_FormationMember.prototype.isFormationChangeActorEnabled = function(actor, pendingActor) {
        return true;
    };

    Window_FormationMember.prototype.select = function(index) {
        Window_Selectable.prototype.select.call(this, index);
        this.setActorFormationStatus(index);
    };

    const _Window_FormationMember_processTouch = Window_FormationMember.prototype.processTouch;
    Window_FormationMember.prototype.processTouch = function() {
        this.onTouchSelectActive();
        _Window_FormationMember_processTouch.call(this);
    };

    Window_FormationMember.prototype.loadCheckBitmap = function(actor) {
        let bitmap = null;
        let loadBitmap = null;
        if (params.CharacterMode === 'chip') {
            loadBitmap = ImageManager.loadCharacter(actor.characterName());
        } else if (params.CharacterMode === 'face') {
            loadBitmap = _isActorPictureEXApp() ? actor.loadActorFace() : ImageManager.loadFace(actor.faceName());
        } else if (params.CharacterMode === 'img') {
            const data = _getActorImgData(actor);
            if (data) {
                loadBitmap = _isActorPictureEXApp() ? actor.loadActorGraphic() : ImageManager.nuun_LoadPictures(data.ActorImg);
            }
        }
        if (loadBitmap && !loadBitmap.isReady()) {
            bitmap = loadBitmap;
        }
        return bitmap;
    };

    Window_FormationMember.prototype.drawItem = function(index) {
        this.drawBackGroundActor(index);
        this.drawPendingItemBackground(index);
        const actor = this.actor(index);
        const rect = this.itemRect(index);
        if (actor) {
            const bitmap = this.loadCheckBitmap(actor);
            if (bitmap) {
                bitmap.addLoadListener(function() {
                    this.drawItemImage(actor, rect);
                    this.drawItemStatus(actor, rect);
                }.bind(this));
            } else {
                this.drawItemImage(actor, rect);
                this.drawItemStatus(actor, rect);
            }
            
        } else {
            this.drawText('-', rect.x, rect.y + 4, rect.width, "center");
        }
    };

    Window_FormationMember.prototype.drawItemImage = function(actor, rect) {
        if (params.CharacterMode === 'chip') {
            this.drawFormationCharacter(actor, rect.x, rect.y, rect.width);
        } else if (params.CharacterMode === 'face') {
            this.drawFormationFace(actor, rect.x, rect.y, Math.min(rect.width, ImageManager.faceWidth), Math.min(rect.height, ImageManager.faceHeight));
        } else if (params.CharacterMode === 'img') {
            this.drawFormationImg(actor, rect.x, rect.y, rect.width, rect.height);
        }
    };

    Window_FormationMember.prototype.drawItemStatus = function(actor, rect) {
        this.drawLavel(actor, rect.x, rect.y, rect.width, rect.height);
    };

    Window_FormationMember.prototype.drawFormationCharacter = function(actor, x, y, width) {
        let x2 = x + Math.floor(width / 2);
        let y2 = y + this.itemHeight() - this.rowSpacing();
        this.drawCharacter(actor.characterName(), actor.characterIndex(), x2, y2);
    };

    Window_FormationMember.prototype.drawFormationFace = function(actor, x, y, width, height) {
        if (_isActorPictureEXApp()) {
            this.actorPictureEXDrawFace(actor, x + 1, y + 1, width - 2, height - 2);
        } else {
            this.drawActorFace(actor, x + 1, y + 1, width - 2, height - 2);
        }
    };

    Window_FormationMember.prototype.drawLavel = function(actor, x, y, width, height) {
        if (params.LavelVisible) {
            const padding = Math.floor(this.itemPadding() / 2);
            y += height - 30;
            x += padding;
            width = Math.min(width - padding, 60);
            const textWidth = this.textWidth(TextManager.levelA);
            this.contents.fontSize = $gameSystem.mainFontSize() + params.LevelFontSize;
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(TextManager.levelA, x, y, width);
            this.resetTextColor();
            this.drawText(actor.level, x + textWidth, y, width - textWidth - padding, "right");
            this.contents.fontSize = $gameSystem.mainFontSize();
        }
    };

    Window_FormationMember.prototype.itemRect = function(index) {
        const rect = Window_Selectable.prototype.itemRect.call(this, index);
        rect.height = Math.min(rect.height, params.MemberHeight);
        rect.y += this.itemHeight() - this.rowSpacing() - rect.height;
        return rect;
    };

    Window_FormationMember.prototype.drawPendingItemBackground = function(index) {
        if (index === this._pendingIndex) {
            const rect = this.itemRect(index);
            const color = ColorManager.pendingColor();
            this.changePaintOpacity(false);
            this.contents.fillRect(rect.x + 1, rect.y + 1, rect.width - 2, rect.height - 2, color);
            this.changePaintOpacity(true);
        }
    };

    Window_FormationMember.prototype.cursorUp = function(wrap) {
        if (paramList.CursorSwitchingDirection === 0) {
            const index = this.index();
            Window_Selectable.prototype.cursorUp.apply(this, arguments);
            if (index < this.maxCols()) {
                this.changeFormationCursor(this.index());
            }
        } else {
            Window_Selectable.prototype.cursorUp.apply(this, arguments);
        }
    };

    Window_FormationMember.prototype.cursorLeft = function(wrap) {
        if (paramList.CursorSwitchingDirection === 1) {
            const index = this.index();
            const cols = this.maxCols();
            const maxItem = this.maxItems();
            const rightIndex = index % cols;
            Window_Selectable.prototype.cursorLeft.apply(this, arguments);
            if (rightIndex === 0) {
                this.changeFormationCursor(index);
            }
        } else {
            Window_Selectable.prototype.cursorLeft.apply(this, arguments);
        }
    };

    Window_FormationMember.prototype.onTouchSelectActive = function() {
        if (this.isHoverEnabled() && this._formation.isCursorBattleMode()) {
            const hitIndex = this.hitIndex();
            if (hitIndex >= 0) {
            $gameTemp.changeTouch = true;
            this.activate();
            }
        }
    };

    Window_FormationMember.prototype.changeFormationCursor = function(index) {
        this.setSelectIndex(index);
        $gameTemp.changeCursor = true;
        this.playCursorSound();
    };

    Window_FormationMember.prototype.playOkSound = function() {
        SoundManager.playOk();
    };

    Window_FormationMember.prototype.setSelectIndex = function(index) {
        this._formation.setFormationIndex(index);
    };

    Window_FormationMember.prototype.setPendingIndex = function(index) {
        const lastPendingIndex = this._pendingIndex;
        this._pendingIndex = index;
        this._formation.setPendingIndex(index);
        this._formation.setMemberPendingMode();
        this.redrawItem(this._pendingIndex);
        this.redrawItem(lastPendingIndex);
    };

    Window_FormationMember.prototype.pendingIndex = function() {
        return this._pendingIndex;
    };

    Window_FormationMember.prototype.setSpriteActor = function(sprite) {
        this._spriteActor = sprite;
    };

    window.Window_FormationMember = Window_FormationMember;

    //ステータス
    function Window_FormationStatus() {
        this.initialize(...arguments);
    }
    
    Window_FormationStatus.prototype = Object.create(Window_StatusBase.prototype);
    Window_FormationStatus.prototype.constructor = Window_FormationStatus;

    Window_FormationStatus.prototype.initialize = function(rect, formation) {
        Window_StatusBase.prototype.initialize.call(this, rect);
        this._formation = formation;
        this._actor = null;
        this._contentsData = new Nuun_DrawFormationStatusData(this, paramList);
        this.refresh();
    };

    Window_FormationStatus.prototype.setStatus = function(actor) {
        this._actor = actor;
        this.refresh();
    };

    Window_FormationStatus.prototype.maxCols = function() {
        return 1;
    };

    Window_FormationStatus.prototype.itemHeight = function() {
        return this.innerHeight;
    };

    Window_FormationStatus.prototype.isSubMemberOpacity = function(actor) {
        return true;
    };

    Window_FormationStatus.prototype.getGraphicMode = function() {
        return paramList.GraphicMode;
    };

    Window_FormationStatus.prototype.defaultGraphicMode = function() {
        return 'none';
    };

    Window_FormationStatus.prototype.refresh = function() {
        Window_StatusBase.prototype.refresh.call(this);
        if (!this._actor) {
            return;
        }
        this._contentsData.drawStatusContents(this._actor);
    };

    Window_FormationStatus.prototype.setupActorImg = function() {
        if (this._actor) {
            this._contentsData.imgSetup(this._actor);
        }
    };

    Window_FormationStatus.prototype.drawItemStatus = function() {
        this._contentsData.nuun_DrawStatusContents(this._actor);
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

    Window_FormationStatus.prototype.isActorPictureEXApp = function() {
        return _isActorPictureEXApp();
    };


    class Nuun_DrawFormationStatusData extends Nuun_DrawListData {
        constructor(_window, params) {
            super(_window, params);
        }

        nuun_MaxContentsCols() {
            return paramList.ContentsCols;
        }

        getParamsList() {
            return paramList.ActorStatus;
        }

        isActorPictureEXApp() {
            return _isActorPictureEXApp();
        }

    };

})();

