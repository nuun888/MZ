/*:-----------------------------------------------------------------------------------
 * NUUN_EquipStatusEX.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Equip status EX
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.2.0
 * 
 * @help
 * Expands the display of equipment status.
 * 
 * Set each item in "Page display settings".
 * Specify the list number set in "Page Display Settings" in "Equipment Status Settings".
 * Pages are set in order from the top of the "Equipment Status Settings" list.
 * 
 * Elementals and states to be displayed are set by elemental resistance and state resistance of plug-in parameters.
 * 
 * This plug-in supports "NUUN_ActorPicture".
 * By turning off the "NUUN_ActorPicture" application, the standing picture setting of this plug-in will be applied even when the "NUUN_ActorPicture" are installed.
 * f you want to set it individually, set it with the image X coordinate and image Y coordinate of each actor image setting.
 * If you want to display the part where the actor of the image is displayed in the center, set the image display start coordinate X and image display start coordinate Y of each actor image setting.
 * 
 * Specification
 * Character chips and SV actors are displayed in front.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 11/17/2022 Ver.1.2.0
 * Added the ability to view the gear set bonuses you have applied. (Requires "NUUN_SetBonusEquip")
 * 11/14/2022 Ver.1.1.1
 * Fixed an issue that caused an error when opening the equip screen.
 * 11/14/2022 Ver.1.1.0
 * Changed the setting method of setting items.
 * Added character chips and SV actors to display items
 * 11/14/2022 Ver.1.0.1
 * Fixed an issue where the actor image was displayed in front.
 * 11/13/2022 Ver.1.0.0
 * first edition.
 * 
 * @param Setting
 * @text Common setting
 * @default ------------------------------
 * 
 * @param ContentsHeight
 * @desc Item height.
 * @text Item height
 * @type number
 * @default 36
 * @min 0
 * @parent Setting
 * 
 * @param DecimalMode
 * @text Rounding off
 * @desc Round off the non-display decimal point. (truncated at false)
 * @type boolean
 * @default true
 * @parent Setting
 * 
 * @param EquipSetting
 * @text Equipment settings
 * @default ------------------------------
 * 
 * @param EquipPageList
 * @desc Set equipment status.
 * @text Equipment status setting
 * @type struct<EquipPageListData>[]
 * @default ["{\"ListDateSetting\":\"1\"}","{\"ListDateSetting\":\"2\"}","{\"ListDateSetting\":\"3\"}","{\"ListDateSetting\":\"4\"}","{\"ListDateSetting\":\"5\"}"]
 * @parent EquipSetting
 * 
 * @param EquipStatusCols
 * @text Equipment status display cols
 * @desc A column to display equipment status.
 * @type number
 * @default 1
 * @min 1
 * @parent EquipSetting
 * 
 * @param ElementResist
 * @type struct<ElementData>[]
 * @text Element resistance
 * @desc Specifies the elementals of elemental resistance to display.
 * @default ["{\"ElementNo\":\"1\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"2\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"3\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"4\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"5\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"6\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"7\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"8\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"9\",\"ElementIconId\":\"\"}"]
 * @parent EquipSetting
 * 
 * @param ElementResistMode
 * @text Elemental resistance display mode
 * @desc Specifies the display mode for elemental resistance.
 * @type select
 * @option Icon only
 * @value 0
 * @option Name only
 * @value 1
 * @option Icon & Name
 * @value 2
 * @default 1
 * @parent EquipSetting
 * 
 * @param StateResist
 * @type struct<StateData>[]
 * @text State resistance
 * @desc Specifies the state of state tolerance to display.
 * @default ["{\"StateNo\":\"4\"}","{\"StateNo\":\"5\"}","{\"StateNo\":\"6\"}","{\"StateNo\":\"7\"}","{\"StateNo\":\"8\"}","{\"StateNo\":\"9\"}","{\"StateNo\":\"10\"}","{\"StateNo\":\"12\"}","{\"StateNo\":\"13\"}"]
 * @parent EquipSetting
 * 
 * @param StateResistMode
 * @text State tolerance display mode
 * @desc Specifies the state resistance display mode.
 * @type select
 * @option Icon only
 * @value 0
 * @option Name only
 * @value 1
 * @option Icon & Name
 * @value 2
 * @default 1
 * @parent EquipSetting
 * 
 * @param PageSetting
 * @text Page settings
 * @default ------------------------------
 * 
 * @param EquipPageList1
 * @desc Set equipment status.
 * @text Equipment status setting
 * @type struct<EquipContentsListData>[]
 * @default ["{\"DateSelect\":\"1\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"1000\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"20\",\"X_Position\":\"1\",\"Y_Position\":\"3\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"21\",\"X_Position\":\"1\",\"Y_Position\":\"4\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"22\",\"X_Position\":\"1\",\"Y_Position\":\"5\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"23\",\"X_Position\":\"1\",\"Y_Position\":\"6\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"24\",\"X_Position\":\"1\",\"Y_Position\":\"7\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"25\",\"X_Position\":\"1\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"26\",\"X_Position\":\"1\",\"Y_Position\":\"9\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"27\",\"X_Position\":\"1\",\"Y_Position\":\"10\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}"]
 * @parent PageSetting
 * 
 * @param EquipPageList2
 * @desc Set equipment status.
 * @text Equipment status setting
 * @type struct<EquipContentsListData>[]
 * @default ["{\"DateSelect\":\"1\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"1000\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"30\",\"X_Position\":\"1\",\"Y_Position\":\"3\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"31\",\"X_Position\":\"1\",\"Y_Position\":\"4\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"32\",\"X_Position\":\"1\",\"Y_Position\":\"5\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"33\",\"X_Position\":\"1\",\"Y_Position\":\"6\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"34\",\"X_Position\":\"1\",\"Y_Position\":\"7\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"35\",\"X_Position\":\"1\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"36\",\"X_Position\":\"1\",\"Y_Position\":\"9\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"37\",\"X_Position\":\"1\",\"Y_Position\":\"10\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"38\",\"X_Position\":\"1\",\"Y_Position\":\"11\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"39\",\"X_Position\":\"1\",\"Y_Position\":\"12\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}"]
 * @parent PageSetting
 * 
 * @param EquipPageList3
 * @desc Set equipment status.
 * @text Equipment status setting
 * @type struct<EquipContentsListData>[]
 * @default ["{\"DateSelect\":\"1\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"1000\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"40\",\"X_Position\":\"1\",\"Y_Position\":\"3\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"41\",\"X_Position\":\"1\",\"Y_Position\":\"4\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"42\",\"X_Position\":\"1\",\"Y_Position\":\"5\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"43\",\"X_Position\":\"1\",\"Y_Position\":\"6\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"44\",\"X_Position\":\"1\",\"Y_Position\":\"7\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"45\",\"X_Position\":\"1\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"46\",\"X_Position\":\"1\",\"Y_Position\":\"9\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"47\",\"X_Position\":\"1\",\"Y_Position\":\"10\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"48\",\"X_Position\":\"1\",\"Y_Position\":\"11\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"49\",\"X_Position\":\"1\",\"Y_Position\":\"12\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}"]
 * @parent PageSetting
 * 
 * @param EquipPageList4
 * @desc Set equipment status.
 * @text Equipment status setting
 * @type struct<EquipContentsListData>[]
 * @default ["{\"DateSelect\":\"1\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"1000\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"100\",\"X_Position\":\"1\",\"Y_Position\":\"3\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}"]
 * @parent PageSetting
 * 
 * @param EquipPageList5
 * @desc Set equipment status.
 * @text Equipment status setting
 * @type struct<EquipContentsListData>[]
 * @default ["{\"DateSelect\":\"1\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"1000\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"101\",\"X_Position\":\"1\",\"Y_Position\":\"3\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}"]
 * @parent PageSetting
 * 
 * @param EquipPageList6
 * @desc Set equipment status.
 * @text Equipment status setting
 * @type struct<EquipContentsListData>[]
 * @default []
 * @parent PageSetting
 * 
 * @param EquipPageList7
 * @desc Set equipment status.
 * @text Equipment status setting
 * @type struct<EquipContentsListData>[]
 * @default []
 * @parent PageSetting
 * 
 * @param EquipPageList8
 * @desc Set equipment status.
 * @text Equipment status setting
 * @type struct<EquipContentsListData>[]
 * @default []
 * @parent PageSetting
 * 
 * @param EquipPageList9
 * @desc Set equipment status.
 * @text Equipment status setting
 * @type struct<EquipContentsListData>[]
 * @default []
 * @parent PageSetting
 * 
 * @param EquipPageList10
 * @desc Set equipment status.
 * @text Equipment status setting
 * @type struct<EquipContentsListData>[]
 * @default []
 * @parent PageSetting
 * 
 * @param ActorSetting
 * @text ActorSetting
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
 * @option Imges
 * @value 'img'
 * @default 'none'
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
 * @text Image settings for "ActorPicture"
 * @desc image setting in "ActorPicture".
 * @default []
 * @type struct<ActorPictureDataList>[]
 * @parent ActorSetting
 * 
 * @param ActorPictureEXApp
 * @text "ActorPicture" application
 * @desc Apply the image change of the "ActorPicture". If you turn it off, the settings in this plugin will be applied.
 * @type boolean
 * @default true
 * @parent ActorSetting
 * 
 * @param ActorImg_X
 * @text Actor image base X coordinate
 * @desc Base X coordinate of the actor image.
 * @type number
 * @max 9999
 * @min -9999
 * @default 0
 * @parent ActorSetting
 * 
 * @param ActorImg_Y
 * @text Actor image base Y coordinate
 * @desc Base Y coordinate of the actor image.
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
 * @text Width of MP gauge
 * @desc Specifies the width of the MP gauge.
 * @type number
 * @default 128
 * @min 0
 * @parent GaugeSetting
 * 
 * @param TPGaugeWidth
 * @text Width of TP gauge
 * @desc Specifies the width of the TP gauge.
 * @type number
 * @default 128
 * @min 0
 * @parent GaugeSetting
 * 
 * @param EquipSetBonusSetting
 * @text Equip set bonus settings
 * @default ------------------------------
 * 
 * @param SetBonusLineHeight
 * @desc Item height.
 * @text Item height
 * @type number
 * @default 36
 * 
 */
 /*~struct~ElementData:
 *
 * @param ElementNo
 * @text ElementID
 * @desc Specifies the element number to display.
 * @type number
 *
 * @param ElementIconId
 * @text IconID
 * @desc Specifies the ID of the icon.
 * @type number
 * @min 0
 * @max 99999
 * @default 0
 * 
 */
 /*~struct~StateData:
 *
 * @param StateNo
 * @text State
 * @desc Specifies the state to display.
 * @type state
 * @default 0
 * 
 * @param StateIconId
 * @text State icon ID
 * @desc Specifies the ID of the icon. If 0, the database icon will be displayed.
 * @type number
 * @default 0
 *
 */
 /*~struct~EquipPageListData:
 * 
 * @param ListDateSetting
 * @desc Specifies the list of page display settings to display.
 * @text Display list specification
 * @type select
 * @option None
 * @value 0
 * @option display list 1
 * @value 1
 * @option display list 2
 * @value 2
 * @option display list 3
 * @value 3
 * @option display list 4
 * @value 4
 * @option display list 5
 * @value 5
 * @option display list 6
 * @value 6
 * @option display list 7
 * @value 7
 * @option display list 8
 * @value 8
 * @option display list 9
 * @value 9
 * @option display list 10
 * @value 10
 * @default 0
 * 
 */
 /*~struct~EquipContentsListData:
 * 
 * @param DateSelect
 * @text Status to display
 * @desc Specifies the status to display.
 * @type select
 * @option None
 * @value 0
 * @option Actor name(1)(2)(3)(4)(6)(13)
 * @value 1
 * @option Nickname(1)(2)(3)(4)(6)(12)(13)
 * @value 2
 * @option Class(1)(2)(3)(4)(6)(12)(13)
 * @value 3
 * @option Level(1)(2)(3)(4)(5)(6)(7)(12)(13)
 * @value 4
 * @option State(1)(2)(3)(4)(6)
 * @value 5
 * @option Original param(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 6
 * @option HP gauge(1)(2)(3)(4)(6)
 * @value 10
 * @option MP gauge(1)(2)(3)(4)(6)
 * @value 11
 * @option TP gaugeジ(1)(2)(3)(4)(6)
 * @value 12
 * @option HP(1)(2)(3)(4)(5)(6)(7)(8)(10)(12)(13)(16)(17)
 * @value 20
 * @option MP(1)(2)(3)(4)(5)(6)(7)(8)(10)(12)(13)(16)(17)
 * @value 21
 * @option ATK(1)(2)(3)(4)(5)(6)(7)(8)(10)(12)(13)(16)(17)
 * @value 22
 * @option DEF(1)(2)(3)(4)(5)(6)(7)(8)(10)(12)(13)(16)(17)
 * @value 23
 * @option MAT(1)(2)(3)(4)(5)(6)(7)(8)(10)(12)(13)(16)(17)
 * @value 24
 * @option MDF(1)(2)(3)(4)(5)(6)(7)(8)(10)(12)(13)(16)(17)
 * @value 25
 * @option AGI(1)(2)(3)(4)(5)(6)(7)(8)(10)(12)(13)(16)(17)
 * @value 26
 * @option LUK(1)(2)(3)(4)(5)(6)(7)(8)(10)(12)(13)(16)(17)
 * @value 27
 * @option Hit(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 30
 * @option Evasion(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 31
 * @option Critcal rate(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 32
 * @option Critcal evade(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 33
 * @option Magic evade(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 34
 * @option Magic reflect(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 35
 * @option Counter(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 36
 * @option HP regen(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 37
 * @option MP regen(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 38
 * @option TP regen(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 39
 * @option Aggro(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 40
 * @option Guard(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 41
 * @option Recovery(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 42
 * @option Item effect(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 43
 * @option MP cost(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 44
 * @option TP charge(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 45
 * @option Physical damage(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 46
 * @option Magical damage(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 47
 * @option Floor damage(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 48
 * @option Gain exp rate(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 49
 * @option Elemental resistance(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(13)(15)(17)
 * @value 100
 * @option State resistance(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(13)(15)(17)
 * @value 101
 * @option Text(1)(2)(3)(4)(5)(6)(8)(13)(14)
 * @value 150
 * @option Equip set bonus(1)(2)(3)(4)(5)(6)(7)(8)(13)
 * @value 180
 * @option Character chip(1)(2)(3)(4)
 * @value 200
 * @option SV Actor(1)(2)(3)(4)
 * @value 201
 * @option Line(1)(2)(3)(4)(5)(6)
 * @value 1000
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
 * @desc Y display line position
 * @text Y display line position(2)
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * 
 * @param X_Coordinate
 * @text X coordinate (relative)(3)
 * @desc X coordinate (relative to X display cols position)
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param Y_Coordinate
 * @text Y coordinate (relative)(4)
 * @desc Y coordinate (relative to Y display row position)
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param NameColor
 * @desc System color ID for system items. You can enter the color code in the text tab.
 * @text System color(5)
 * @type number
 * @default 16
 * @min 0
 * 
 * @param ItemWidth
 * @desc Item gauge Width (0 for default width)
 * @text Item gauge Width(6)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param SystemItemWidth
 * @desc Width of system item (0 is the default width)
 * @text System width(7)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param ParamName
 * @desc Sets the name of the item.
 * @text Name(8)
 * @type string
 * @default
 * 
 * @param DataEval
 * @desc Eval。
 * @text Eval(javaScript)(9)
 * @type combo
 * @option '$gameVariables.value(0);//game variable'
 * @option 'a;//Actor game data'
 * @option 'a.actor();//Actor system data'
 * @default 
 * 
 * @param paramUnit
 * @desc Set the units.
 * @text Unit(10)
 * @type string
 * @default 
 * 
 * @param Decimal
 * @text number of decimal places(11)
 * @desc The number of decimal places that can be displayed.
 * @type number
 * @default 0
 * @min 0
 * @max 99
 * 
 * @param Align
 * @desc Specifies the display position of characters.
 * @text Character display position(12)
 * @type select
 * @option Left
 * @value "left"
 * @option Center
 * @value "center"
 * @option Right
 * @value "right"
 * @default "left"
 * @parent nameSetting
 * 
 * @param FontSize
 * @desc Font size (difference from main font)
 * @text Font size(13)
 * @type number
 * @default 0
 * @min -99
 * 
 * @param textMethod
 * @desc Text tag.
 * @text Text tag(14)
 * @type string
 * @default 
 * 
 * @param ContentsCols
 * @text Cols(15)
 * @desc Column to display.
 * @type number
 * @default 1
 * @min 1
 * 
 * @param IconId
 * @text IconID(16)
 * @desc Specifies the ID of the icon.
 * @type number
 * @default 0
 * 
 * @param IconY
 * @text Icon correction Y value(17)
 * @desc Specifies the correction Y value of the icon.
 * @type number
 * @default 2
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
 * @text Separate display actor image
 * @type select
 * @option None
 * @value 'none'
 * @option Face
 * @value 'face'
 * @option Img
 * @value 'img'
 * @option Img(APNG)
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
 * @text Face graphic image
 * @desc Set the sprite sheet of the face graphic image. 
 * @type file
 * @dir img/faces
 * 
 * @param FaceIndex
 * @desc Index ID of the facial image.
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
 * @text Image Y coordinate
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Img_SX
 * @desc Display starting coordinate X of the image.
 * @text Image display start coordinate X
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Img_SY
 * @desc Display starting coordinate Y of the image.
 * @text Image display start coordinate Y
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Actor_Scale
 * @desc Image scale.
 * @text Image scale
 * @type number
 * @default 100
 * @min 0
 * @max 999
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
 * @text Separate display actor image
 * @type select
 * @option None
 * @value 'none'
 * @option Face
 * @value 'face'
 * @option Img
 * @value 'img'
 * @option Img(APNG)
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
 * @text Image Y coordinate
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Img_SX
 * @desc Display starting coordinate X of the image.
 * @text Image display start coordinate X
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Img_SY
 * @desc Display starting coordinate Y of the image.
 * @text Image display start coordinate Y
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Actor_Scale
 * @desc Image scale.
 * @text Image scale
 * @type number
 * @default 100
 * @min 0
 * @max 999
 * 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 装備ステータス表示拡張
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.2.0
 * 
 * @help
 * 装備ステータス１の表示を拡張します。
 * 
 * 各項目の設定はページ表示設定で設定します。
 * 装備ステータス設定でページ表示設定で設定したリスト番号を指定してください。
 * 装備ステータス設定リストの上から順にページが設定されます。
 * 
 * 表示させる属性、ステートはプラグインパラメータの属性耐性、ステート耐性で設定します。
 * 
 * 当プラグインは、立ち絵、顔グラ表示EXに対応しています。
 * 立ち絵表示EX適用をOFFにすることで立ち絵、顔グラ表示EX導入時でも、このプラグインの立ち絵設定が適用されます。
 * 個別に設定する場合は各アクター画像設定の画像X座標、画像Y座標で設定します。
 * 画像のアクターが表示されている部分を中央に表示させたい場合は各アクター画像設定の画像表示開始座標X、画像表示開始座標Y
 * で設定します。
 * 
 * 仕様
 * キャラチップ、SVアクターは一番手前に表示されます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/11/17 Ver.1.2.0
 * 適用している装備セットボーナスを表示できる機能を追加。(要NUUN_SetBonusEquip)
 * 2022/11/14 Ver.1.1.1
 * 装備画面を開くとエラーが出る問題を修正。
 * 2022/11/14 Ver.1.1.0
 * 設定項目の設定方法を変更。
 * 表示項目にキャラチップとSVアクターを追加
 * 2022/11/14 Ver.1.0.1
 * アクター画像が手前に表示されてしまう問題を修正。
 * 2022/11/13 Ver.1.0.0
 * 初版
 * 
 * @param Setting
 * @text 共通設定
 * @default ------------------------------
 * 
 * @param ContentsHeight
 * @desc 項目高さ。
 * @text 項目高さ
 * @type number
 * @default 36
 * @min 0
 * @parent Setting
 * 
 * @param DecimalMode
 * @text 端数処理四捨五入
 * @desc 表示外小数点を四捨五入で丸める。（falseで切り捨て）
 * @type boolean
 * @default true
 * @parent Setting
 * 
 * @param EquipSetting
 * @text 装備設定
 * @default ------------------------------
 * 
 * @param EquipPageList
 * @desc 装備ステータスの設定します。
 * @text 装備ステータス設定
 * @type struct<EquipPageListData>[]
 * @default ["{\"ListDateSetting\":\"1\"}","{\"ListDateSetting\":\"2\"}","{\"ListDateSetting\":\"3\"}","{\"ListDateSetting\":\"4\"}","{\"ListDateSetting\":\"5\"}"]
 * @parent EquipSetting
 * 
 * @param EquipStatusCols
 * @text 装備ステータス表示列
 * @desc 装備ステータスの表示する列。
 * @type number
 * @default 1
 * @min 1
 * @parent EquipSetting
 * 
 * @param ElementResist
 * @type struct<ElementData>[]
 * @text 属性耐性
 * @desc 表示する属性耐性の属性を指定します。
 * @default ["{\"ElementNo\":\"1\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"2\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"3\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"4\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"5\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"6\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"7\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"8\",\"ElementIconId\":\"\"}","{\"ElementNo\":\"9\",\"ElementIconId\":\"\"}"]
 * @parent EquipSetting
 * 
 * @param ElementResistMode
 * @text 属性耐性表示モード
 * @desc 属性耐性の表示モードを指定します。
 * @type select
 * @option アイコンのみ
 * @value 0
 * @option 名称のみ
 * @value 1
 * @option アイコン、名称
 * @value 2
 * @default 1
 * @parent EquipSetting
 * 
 * @param StateResist
 * @type struct<StateData>[]
 * @text ステート耐性
 * @desc 表示するステート耐性のステートを指定します。
 * @default ["{\"StateNo\":\"4\"}","{\"StateNo\":\"5\"}","{\"StateNo\":\"6\"}","{\"StateNo\":\"7\"}","{\"StateNo\":\"8\"}","{\"StateNo\":\"9\"}","{\"StateNo\":\"10\"}","{\"StateNo\":\"12\"}","{\"StateNo\":\"13\"}"]
 * @parent EquipSetting
 * 
 * @param StateResistMode
 * @text ステート耐性表示モード
 * @desc ステート耐性の表示モードを指定します。
 * @type select
 * @option アイコンのみ
 * @value 0
 * @option 名称のみ
 * @value 1
 * @option アイコン、名称
 * @value 2
 * @default 1
 * @parent EquipSetting
 * 
 * @param PageSetting
 * @text ページ表示設定
 * @default ------------------------------
 * 
 * @param EquipPageList1
 * @desc 装備ステータスの設定します。
 * @text 装備ステータス設定
 * @type struct<EquipContentsListData>[]
 * @default ["{\"DateSelect\":\"1\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"1000\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"20\",\"X_Position\":\"1\",\"Y_Position\":\"3\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"21\",\"X_Position\":\"1\",\"Y_Position\":\"4\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"22\",\"X_Position\":\"1\",\"Y_Position\":\"5\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"23\",\"X_Position\":\"1\",\"Y_Position\":\"6\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"24\",\"X_Position\":\"1\",\"Y_Position\":\"7\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"25\",\"X_Position\":\"1\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"26\",\"X_Position\":\"1\",\"Y_Position\":\"9\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"27\",\"X_Position\":\"1\",\"Y_Position\":\"10\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}"]
 * @parent PageSetting
 * 
 * @param EquipPageList2
 * @desc 装備ステータスの設定します。
 * @text 装備ステータス設定
 * @type struct<EquipContentsListData>[]
 * @default ["{\"DateSelect\":\"1\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"1000\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"30\",\"X_Position\":\"1\",\"Y_Position\":\"3\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"31\",\"X_Position\":\"1\",\"Y_Position\":\"4\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"32\",\"X_Position\":\"1\",\"Y_Position\":\"5\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"33\",\"X_Position\":\"1\",\"Y_Position\":\"6\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"34\",\"X_Position\":\"1\",\"Y_Position\":\"7\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"35\",\"X_Position\":\"1\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"36\",\"X_Position\":\"1\",\"Y_Position\":\"9\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"37\",\"X_Position\":\"1\",\"Y_Position\":\"10\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"38\",\"X_Position\":\"1\",\"Y_Position\":\"11\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"39\",\"X_Position\":\"1\",\"Y_Position\":\"12\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}"]
 * @parent PageSetting
 * 
 * @param EquipPageList3
 * @desc 装備ステータスの設定します。
 * @text 装備ステータス設定
 * @type struct<EquipContentsListData>[]
 * @default ["{\"DateSelect\":\"1\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"1000\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"40\",\"X_Position\":\"1\",\"Y_Position\":\"3\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"41\",\"X_Position\":\"1\",\"Y_Position\":\"4\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"42\",\"X_Position\":\"1\",\"Y_Position\":\"5\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"43\",\"X_Position\":\"1\",\"Y_Position\":\"6\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"44\",\"X_Position\":\"1\",\"Y_Position\":\"7\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"45\",\"X_Position\":\"1\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"46\",\"X_Position\":\"1\",\"Y_Position\":\"9\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"47\",\"X_Position\":\"1\",\"Y_Position\":\"10\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"48\",\"X_Position\":\"1\",\"Y_Position\":\"11\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"49\",\"X_Position\":\"1\",\"Y_Position\":\"12\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}"]
 * @parent PageSetting
 * 
 * @param EquipPageList4
 * @desc 装備ステータスの設定します。
 * @text 装備ステータス設定
 * @type struct<EquipContentsListData>[]
 * @default ["{\"DateSelect\":\"1\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"1000\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"100\",\"X_Position\":\"1\",\"Y_Position\":\"3\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}"]
 * @parent PageSetting
 * 
 * @param EquipPageList5
 * @desc 装備ステータスの設定します。
 * @text 装備ステータス設定
 * @type struct<EquipContentsListData>[]
 * @default ["{\"DateSelect\":\"1\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"1000\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"DateSelect\":\"101\",\"X_Position\":\"1\",\"Y_Position\":\"3\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"NameColor\":\"16\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"DataEval\":\"\",\"paramUnit\":\"\",\"Decimal\":\"0\",\"Align\":\"\\\"left\\\"\",\"FontSize\":\"0\",\"textMethod\":\"\",\"ContentsCols\":\"1\",\"IconId\":\"0\",\"IconY\":\"2\"}"]
 * @parent PageSetting
 * 
 * @param EquipPageList6
 * @desc 装備ステータスの設定します。
 * @text 装備ステータス設定
 * @type struct<EquipContentsListData>[]
 * @default []
 * @parent PageSetting
 * 
 * @param EquipPageList7
 * @desc 装備ステータスの設定します。
 * @text 装備ステータス設定
 * @type struct<EquipContentsListData>[]
 * @default []
 * @parent PageSetting
 * 
 * @param EquipPageList8
 * @desc 装備ステータスの設定します。
 * @text 装備ステータス設定
 * @type struct<EquipContentsListData>[]
 * @default []
 * @parent PageSetting
 * 
 * @param EquipPageList9
 * @desc 装備ステータスの設定します。
 * @text 装備ステータス設定
 * @type struct<EquipContentsListData>[]
 * @default []
 * @parent PageSetting
 * 
 * @param EquipPageList10
 * @desc 装備ステータスの設定します。
 * @text 装備ステータス設定
 * @type struct<EquipContentsListData>[]
 * @default []
 * @parent PageSetting
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
 * @default 'none'
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
 * @param EquipSetBonusSetting
 * @text 装備セットボーナス設定
 * @default ------------------------------
 * 
 * @param SetBonusLineHeight
 * @desc 項目高さ。
 * @text 項目高さ
 * @type number
 * @default 36
 * 
 * 
 */
/*~struct~ElementData:ja
 *
 * @param ElementNo
 * @text 属性ID
 * @desc 表示する属性番号を指定します。
 * @type number
 *
 * @param ElementIconId
 * @text アイコンID
 * @desc アイコンのIDを指定します。
 * @type number
 * @min 0
 * @max 99999
 * @default 0
 * 
 */
/*~struct~StateData:ja
 *
 * @param StateNo
 * @text ステート
 * @desc 表示するステートを指定します。
 * @type state
 * @default 0
 * 
 * @param StateIconId
 * @text ステートアイコンID
 * @desc アイコンのIDを指定します。0の場合はデータベースのアイコンが表示されます。
 * @type number
 * @default 0
 *
 */
/*~struct~EquipPageListData:ja
 * 
 * @param ListDateSetting
 * @desc 表示するページ表示設定の中からリストを指定します。
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
 */
/*~struct~EquipContentsListData:ja
 * 
 * @param DateSelect
 * @text 表示するステータス
 * @desc 表示するステータスを指定します。
 * @type select
 * @option なし
 * @value 0
 * @option アクター名(1)(2)(3)(4)(6)(13)
 * @value 1
 * @option 二つ名(1)(2)(3)(4)(6)(12)(13)
 * @value 2
 * @option 職業(1)(2)(3)(4)(6)(12)(13)
 * @value 3
 * @option レベル(1)(2)(3)(4)(5)(6)(7)(12)(13)
 * @value 4
 * @option ステート(1)(2)(3)(4)(6)
 * @value 5
 * @option 独自パラメータ(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)
 * @value 6
 * @option ＨＰゲージ(1)(2)(3)(4)(6)
 * @value 10
 * @option ＭＰゲージ(1)(2)(3)(4)(6)
 * @value 11
 * @option ＴＰゲージ(1)(2)(3)(4)(6)
 * @value 12
 * @option ＨＰ(1)(2)(3)(4)(5)(6)(7)(8)(10)(12)(13)(16)(17)
 * @value 20
 * @option ＭＰ(1)(2)(3)(4)(5)(6)(7)(8)(10)(12)(13)(16)(17)
 * @value 21
 * @option 攻撃力(1)(2)(3)(4)(5)(6)(7)(8)(10)(12)(13)(16)(17)
 * @value 22
 * @option 防御力(1)(2)(3)(4)(5)(6)(7)(8)(10)(12)(13)(16)(17)
 * @value 23
 * @option 魔法力(1)(2)(3)(4)(5)(6)(7)(8)(10)(12)(13)(16)(17)
 * @value 24
 * @option 魔法防御(1)(2)(3)(4)(5)(6)(7)(8)(10)(12)(13)(16)(17)
 * @value 25
 * @option 敏捷性(1)(2)(3)(4)(5)(6)(7)(8)(10)(12)(13)(16)(17)
 * @value 26
 * @option 運(1)(2)(3)(4)(5)(6)(7)(8)(10)(12)(13)(16)(17)
 * @value 27
 * @option 命中率(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 30
 * @option 回避率(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 31
 * @option 会心率(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 32
 * @option 会心回避率(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 33
 * @option 魔法回避率(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 34
 * @option 魔法反射率(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 35
 * @option 反撃率(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 36
 * @option HP再生率(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 37
 * @option MP再生率(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 38
 * @option TP再生率(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 39
 * @option 狙われ率(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 40
 * @option 防御効果率(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 41
 * @option 回復効果率(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 42
 * @option 薬の知識(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 43
 * @option MP消費率(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 44
 * @option TPチャージ率(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 45
 * @option 物理ダメージ率(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 46
 * @option 魔法ダメージ率(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 47
 * @option 床ダメージ率(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 48
 * @option 獲得経験値率(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(12)(13)(16)(17)
 * @value 49
 * @option 属性耐性(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(13)(15)(17)
 * @value 100
 * @option ステート耐性(1)(2)(3)(4)(5)(6)(7)(8)(10)(11)(13)(15)(17)
 * @value 101
 * @option 記述欄(1)(2)(3)(4)(5)(6)(8)(13)(14)
 * @value 150
 * @option 装備セットボーナス(1)(2)(3)(4)(5)(6)(7)(8)(13)
 * @value 180
 * @option キャラチップ(1)(2)(3)(4)
 * @value 200
 * @option SVアクター(1)(2)(3)(4)
 * @value 201
 * @option ライン(1)(2)(3)(4)(5)(6)
 * @value 1000
 * @default 0
 * 
 * @param X_Position
 * @text X表示列位置(1)
 * @desc X表示列位置
 * @type number
 * @default 1
 * @min 1
 * @max 1
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
 * @param NameColor
 * @desc システム項目のシステムカラーID。テキストタブでカラーコードを入力できます。
 * @text システム項目文字色(5)
 * @type number
 * @default 16
 * @min 0
 * 
 * @param ItemWidth
 * @desc 項目、ゲージ横幅（0でデフォルト幅）
 * @text 項目、ゲージ横幅(6)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param SystemItemWidth
 * @desc システム項目の横幅（0でデフォルト幅）
 * @text システム項目横幅(7)
 * @type number
 * @default 0
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
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option 'a;//アクターのゲームデータ'
 * @option 'a.actor();//アクターのシステムデータ'
 * @default 
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
 * @param Align
 * @desc 文字の表示位置を指定します。
 * @text 文字の表示位置(12)
 * @type select
 * @option 左
 * @value "left"
 * @option 中央
 * @value "center"
 * @option 右
 * @value "right"
 * @default "left"
 * @parent nameSetting
 * 
 * @param FontSize
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ(13)
 * @type number
 * @default 0
 * @min -99
 * 
 * @param textMethod
 * @desc 記述欄タグ名
 * @text 記述欄タグ名(14)
 * @type string
 * @default 
 * 
 * @param ContentsCols
 * @text 表示列(15)
 * @desc 表示する列。
 * @type number
 * @default 1
 * @min 1
 * 
 * @param IconId
 * @text アイコンID(16)
 * @desc アイコンのIDを指定します。
 * @type number
 * @default 0
 * 
 * @param IconY
 * @text アイコン補正Y値(17)
 * @desc アイコンの補正Y値を指定します。
 * @type number
 * @default 2
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
 * 
 */

var Imported = Imported || {};
Imported.NUUN_EquipStatusEX = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_EquipStatusEX');
    const ContentsHeight = Number(parameters['ContentsHeight'] || 36);
    const EquipPageList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['EquipPageList'])) : null) || [];
    const EquipStatusCols = Number(parameters['EquipStatusCols'] || 1);
    const ElementResist = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ElementResist'])) : null) || [];
    const ElementResistMode = eval(parameters['ElementResistMode']) || 1;
    const StateResist = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['StateResist'])) : null) || [];
    const StateResistMode = eval(parameters['StateResistMode']) || 1;
    const DecimalMode = eval(parameters['DecimalMode'] || "true");
    const HPGaugeWidth = Number(parameters['HPGaugeWidth'] || 128);
    const MPGaugeWidth = Number(parameters['MPGaugeWidth'] || 128);
    const TPGaugeWidth = Number(parameters['TPGaugeWidth'] || 128);
    const GraphicMode = eval(parameters['GraphicMode']) || 'face';
    const ActorsImgList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ActorsImgList'])) : null) || [];
    const ActorPictureData = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ActorPictureData'])) : null) || [];
    const ActorPictureEXApp = eval(parameters['ActorPictureEXApp'] || "true");
    const ActorImg_X = Number(parameters['ActorImg_X'] || 0);
    const ActorImg_Y = Number(parameters['ActorImg_Y'] || 0);
    const SetBonusLineHeight = Number(parameters['SetBonusLineHeight'] || 36);

    const equipContents = {};
    equipContents.PageList1 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['EquipPageList1'])) : [];
    equipContents.PageList2 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['EquipPageList2'])) : [];
    equipContents.PageList3 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['EquipPageList3'])) : [];
    equipContents.PageList4 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['EquipPageList4'])) : [];
    equipContents.PageList5 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['EquipPageList5'])) : [];
    equipContents.PageList6 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['EquipPageList6'])) : [];
    equipContents.PageList7 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['EquipPageList7'])) : [];
    equipContents.PageList8 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['EquipPageList8'])) : [];
    equipContents.PageList9 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['EquipPageList9'])) : [];
    equipContents.PageList10 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['EquipPageList10'])) : [];

    let maxGaugeWidth = 128;
    
    const _Scene_Equip_createSlotWindow = Scene_Equip.prototype.createSlotWindow;
    Scene_Equip.prototype.createSlotWindow = function() {
        _Scene_Equip_createSlotWindow.call(this);
        this._slotWindow.setHandler("pagedown", this.nextPage.bind(this));
        this._slotWindow.setHandler("pageup", this.previousPage.bind(this));
    };

    const _Scene_Equip_createItemWindow = Scene_Equip.prototype.createItemWindow;
    Scene_Equip.prototype.createItemWindow = function() {
        _Scene_Equip_createItemWindow.call(this);
        this._itemWindow.setHandler("pagedown", this.nextPage.bind(this));
        this._itemWindow.setHandler("pageup", this.previousPage.bind(this));
    };

    Scene_Equip.prototype.nextPage = function() {
        const page = this._statusWindow.getPage();
        const maxPage = this._statusWindow.maxPage();
        this._statusWindow.setPage((page + 1) % maxPage);
        this._statusWindow.refresh();
        SoundManager.playCursor();
        if (this._slotWindow.visible) {
            this._slotWindow.activate();
        } else if (this._itemWindow.visible) {
            this._itemWindow.activate();
        }
    };

    Scene_Equip.prototype.previousPage = function() {
        const page = this._statusWindow.getPage();
        const maxPage = this._statusWindow.maxPage();
        this._statusWindow.setPage((page + maxPage - 1) % maxPage);
        this._statusWindow.refresh();
        SoundManager.playCursor();
        if (this._slotWindow.visible) {
            this._slotWindow.activate();
        } else if (this._itemWindow.visible) {
            this._itemWindow.activate();
        }
    };

    const _Scene_Equip_arePageButtonsEnabled = Scene_Equip.prototype.arePageButtonsEnabled;
    Scene_Equip.prototype.arePageButtonsEnabled = function() {
        return this._statusWindow.maxPage() > 1 ? true : _Scene_Equip_arePageButtonsEnabled.call(this);
    };

    Scene_Equip.prototype.nextActor = function() {
        if ((this._slotWindow.visible && this._slotWindow.active) || (this._itemWindow.visible && this._itemWindow.active)) {
            this.nextPage();
        } else {
            Scene_MenuBase.prototype.nextActor.call(this);
        }
    };
    
    Scene_Equip.prototype.previousActor = function() {
        if ((this._slotWindow.visible && this._slotWindow.active) || (this._itemWindow.visible && this._itemWindow.active)) {
            this.previousPage();
        } else {
            Scene_MenuBase.prototype.previousActor.call(this);
        }
    };

    const _Window_EquipStatus_initialize = Window_EquipStatus.prototype.initialize;
    Window_EquipStatus.prototype.initialize = function(rect) {
        this.loadImages();
        _Window_EquipStatus_initialize.call(this, rect);
        this._page = 0;
        this.language_Jp = $gameSystem.isJapanese();
        this._equipBitmap = null;
    };
    
    Window_EquipStatus.prototype.lineHeight = function() {
        return ContentsHeight || 36;
    };

    Window_EquipStatus.prototype.maxCols = function() {
        return EquipStatusCols;
    };

    Window_EquipStatus.prototype.getPage = function() {
        return this._page;
    };

    Window_EquipStatus.prototype.setPage = function(page) {
        return this._page = page;
    };

    Window_EquipStatus.prototype.maxPage = function() {
        return EquipPageList.length;
    };

    Window_EquipStatus.prototype.getPageList = function() {
        const page = EquipPageList[this.getPage()].ListDateSetting;
        const tag = 'PageList' + page;
        return equipContents[tag]
    };

    const _Window_EquipStatus_refresh = Window_EquipStatus.prototype.refresh;
    Window_EquipStatus.prototype.refresh = function() {
        Window_StatusBase.prototype.refresh.call(this);
        _Window_EquipStatus_refresh.call(this);
    };

    Window_EquipStatus.prototype.loadImages = function() {
        for (const actor of $gameParty.allMembers()) {
            let data = null;
            if (Imported.NUUN_ActorPicture && ActorPictureEXApp) {
                actor.resetImgId();
                data = this.getActorData(actor);
                const mode = data.GraphicMode;
                if (mode === 'face') {
                    actor.loadActorFace()
                } else if (mode === 'img') {
                    actor.loadActorGraphic();
                }
            } else {
                data = this.getActorData(actor);
                const mode = data.GraphicMode;
                if (mode === 'face') {
                    ImageManager.loadFace(data.FaceImg);
                } else if (mode === 'img') {
                    ImageManager.nuun_LoadPictures(data.ActorImg);
                }
            }
        }
    };

    const _Window_EquipStatus_drawActorFace = Window_EquipStatus.prototype.drawActorFace;
    Window_EquipStatus.prototype.drawActorFace = function(actor, x, y, width, height) {
        const rect = this.itemRect(0);
        const data = this.getActorData(actor);
        const mode = data.GraphicMode;
        let bitmap = null;
        if (this._actorBitmap) {
            this._actorBitmap.resetApngImg();
        }
        if (mode !== 'none') {
            if (mode === 'imgApng') {
                this.createApngSprite(actor, data, rect);
            } else if (Imported.NUUN_ActorPicture && ActorPictureEXApp) {
                bitmap = mode === 'face' ? actor.loadActorFace() : this.loadActorImg(actor);
            } else {
                bitmap = mode === 'face' ? ImageManager.nuun_LoadPictures(data.FaceImg) : ImageManager.nuun_LoadPictures(data.ActorImg);
            }
        }
        if (bitmap) {
            bitmap.addLoadListener(function() {
                if (mode === 'face') {
                    this.drawEquipActorFace(data, bitmap, rect.x, rect.y, this.innerWidth, this.innerHeight, actor);
                } else {
                    this.drawActorGraphic(data, bitmap, rect.x, rect.y, this.innerWidth, this.innerHeight, actor);
                }
            }.bind(this));
        }
        if (bitmap && !bitmap.isReady()) {
            this._equipBitmap = bitmap;
        } else if (!bitmap) {
            this._equipBitmap = null;
        }
    };

    Window_EquipStatus.prototype.getActorData = function(actor) {
        return Imported.NUUN_ActorPicture && ActorPictureEXApp ? this.battlreActorPicture(actor.actorId()) : this.getActorImgData(actor.actorId());
    };

    Window_EquipStatus.prototype.getActorImgData = function(actorId) {
        const actors = ActorsImgList;
        const find = actors.find(actor => actor.actorId === actorId);
        if (!find) {
        return {Actor_X: 0, Actor_Y: 0, Img_SX: 0, Img_SY: 0, Actor_Scale: 100, GraphicMode: GraphicMode, FaceIndex : -1};
        } if (find.GraphicMode === 'default' || !find.GraphicMode) {
            find.GraphicMode = GraphicMode;
        }
        return find;
    };

    Window_EquipStatus.prototype.battlreActorPicture = function(id) {
        const actors = ActorPictureData;
        const find = actors.find(actor => actor.actorId === id);
        if (!find) {
        return {Actor_X: 0, Actor_Y: 0, Img_SX: 0, Img_SY: 0, Actor_Scale: 100, GraphicMode: GraphicMode, FaceIndex : -1};
        } else if (find.GraphicMode === 'default' || !find.GraphicMode) {
            find.GraphicMode = GraphicMode;
        }
        return find;
    };

    Window_EquipStatus.prototype.drawEquipActorFace = function(data, bitmap, x, y, width, height, actor) {
        width = Math.min(width, ImageManager.faceWidth);
        height = Math.min(height, ImageManager.faceHeight);
        x += data.Actor_X + ActorImg_X;
        y += data.Actor_Y + ActorImg_Y;
         if (Imported.NUUN_ActorPicture && ActorPictureEXApp) {
            this.drawFace(actor.getActorGraphicFace(), actor.getActorGraphicFaceIndex(), x, y, ImageManager.faceWidth, height);
        } else {
            _Window_EquipStatus_drawActorFace.call(this, actor, x, y, width, height);
        }
    };

    Window_EquipStatus.prototype.drawActorGraphic = function(data, bitmap, x, y, width, height, actor) {
        width = Math.min(width, bitmap.width);
        height = Math.min(height, bitmap.height);
        const scale = (data.Actor_Scale || 100) / 100;
        const sw = width * scale;
        const sh = height * scale;
        const sx = data.Img_SX || 0;
        const sy = data.Img_SY || 0;
        x += data.Actor_X + ActorImg_X;
        y += data.Actor_Y + ActorImg_Y;
        this.contents.blt(bitmap, sx, sy, width + (width - sw), height + (height - sh), x, y, width, height);
    };

    const _Window_EquipStatus_drawAllParams = Window_EquipStatus.prototype.drawAllParams;
    Window_EquipStatus.prototype.drawAllParams = function() {
        if (!!this._equipBitmap) {
            this._equipBitmap.addLoadListener(function() {
                this.drawEquipStatusContents();
            }.bind(this));
        } else {
            this.drawEquipStatusContents();
        }
    };

    Window_EquipStatus.prototype.drawEquipStatusContents = function() {
        if (this.maxPage() > 0) {
            const list = this.getPageList();
            const lineHeight = this.lineHeight();
            for (const data of list) {
                this.resetFontSettings();
                const x_Position = data.X_Position;
                const position = Math.min(x_Position, this.maxCols());
                const rect = this.itemRect(position - 1);
                const x = rect.x + (data.X_Coordinate);
                const y = (data.Y_Position - 1) * lineHeight + rect.y + data.Y_Coordinate;
                const width = data.ItemWidth && data.ItemWidth > 0 ? Math.min(data.ItemWidth, rect.width - data.X_Coordinate) : rect.width;
                maxGaugeWidth = width;
                this.dateDisplay(data, x, y, width);
            }
        } else {
            _Window_EquipStatus_drawAllParams.call(this);
        }
    };

    Window_EquipStatus.prototype.dateDisplay = function(data, x, y, width) {
        const actor = this._actor;
        switch (data.DateSelect) {
        case 0:
            break;
        case 1:
            this.drawContentsActorName(data, actor, x, y, width);
            break;
        case 2:
            this.drawActorNickname(data, actor, x, y, width);
            break;
        case 3:
            this.drawActorClass(data, actor, x, y, width);
            break;
        case 4:
            this.drawActorLevel(data, actor, x, y, width);
            break;
        case 5:
            this.drawActorIcons(data, actor, x, y, width);
            break;
        case 6:
            this.drawOrgParam(data, actor, x, y, width);
            break;
        case 10:
            $gameTemp.equipParam = data;
            this.placeHpGauge(x, y, actor);
            break;
        case 11:
            $gameTemp.equipParam = data;
            this.placeMpGauge(x, y, actor);
            break;
        case 12:
            $gameTemp.equipParam = data;
            this.placeTpGauge(x, y, actor);
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
            this.drawParam(data, actor, x, y, width);
            break;
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
            this.drawXParam(data, actor, x, y, width);
            break;
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
        case 45:
        case 46:
        case 47:
        case 48:
        case 49:
            this.drawSParam(data, actor, x, y, width);
            break;
        case 100:
            this.drawElement(data, actor, x, y, width);
            break;
        case 101:
            this.drawState(data, actor, x, y, width);
            break;
        case 102:
            break;
        case 150:
            this.drawDesc(data, actor, x, y, width);
            break;
        case 160:
            this.drawSpecialStatus(data, actor, x, y, width);
            break;
        case 180:
            this.drawSetBonus(data, actor, x, y, width);
            break;
        case 200:
            this.contentsDrawActorChip(data, x, y, width, actor);
            break;
        case 201:
            this.drawSvActorImg(data, x, y, width, actor);
            break;
        case 1000:
            this.horzLine(data, x, y, width, actor);
            break;
        default:
            break;
        }
    };

    Window_EquipStatus.prototype.paramNameShow = function(data) {
        if (data.ParamName) {
          return data.ParamName
        }
        const params = data.DateSelect;
        switch (params) {
            case 30:
            case 31:
                return TextManager.param(params - 22);
            case 32:
                return this.language_Jp ? "会心率" : 'Critcal Rate';
            case 33:
                return this.language_Jp ? "会心回避率" : 'Critical Evade';
            case 34:
                return this.language_Jp ? "魔法回避率" : 'Magic Evade';
            case 35:
                return this.language_Jp ? "魔法反射率" : 'Magic Reflect';
            case 36:
                return this.language_Jp ? "反撃率" : 'Counter';
            case 37:
                return this.language_Jp ? "HP再生率" : 'HP Regen';
            case 38:
                return this.language_Jp ? "MP再生率" : 'MP Regen';
            case 39:
                return this.language_Jp ? "TP再生率" : 'TP Regen';
            case 40:
                return this.language_Jp ? "狙われ率" : 'Aggro';
            case 41:
                return this.language_Jp ? "防御効果率" : 'Guard';
            case 42:
                return this.language_Jp ? "回復効果率" : 'Recovery';
            case 43:
                return this.language_Jp ? "薬の知識" : 'Item Effect';
            case 44:
                return this.language_Jp ? "MP消費率" : 'MP Cost';
            case 45:
                return this.language_Jp ? "TPチャージ率" : 'TP Charge';
            case 46:
                return this.language_Jp ? "物理ダメージ率" : 'Physical Damage';
            case 47:
                return this.language_Jp ? "魔法ダメージ率" : 'Magical Damage';
            case 48:
                return this.language_Jp ? "床ダメージ率" : 'Floor Damage';
            case 49:
                return this.language_Jp ? "獲得経験率" : 'EXP Gain';
            default:
                return null;
        }
    };

    Window_EquipStatus.prototype.drawActorName = function(actor, x, y, width) {
        
    };

    Window_EquipStatus.prototype.drawContentsActorName = function(data, actor, x, y, width) {
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        Window_StatusBase.prototype.drawActorName.call(this, actor, x, y, width);
    };

    Window_EquipStatus.prototype.drawActorClass = function(data, actor, x, y, width) {
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        this.resetTextColor();
        this.drawText(actor.currentClass().name, x, y, width, data.Align);
    };
    
    Window_EquipStatus.prototype.drawActorNickname = function(data, actor, x, y, width) {
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        this.resetTextColor();
        this.drawText(actor.nickname(), x, y, width, data.Align);
    };

    Window_EquipStatus.prototype.drawActorLevel = function(data, actor, x, y, width) {
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        this.changeTextColor(ColorManager.systemColor());
        const systemWidth = data.SystemItemWidth || 48;
        const x2 = x + systemWidth + this.itemPadding();
        this.drawText(TextManager.levelA, x, y, systemWidth);
        this.resetTextColor();
        this.drawText(actor.level, x2, y, width - x2, data.Align);
    };
    
    Window_EquipStatus.prototype.drawActorIcons = function(data, actor, x, y, width) {
        const iconWidth = ImageManager.iconWidth;
        const icons = actor.allIcons().slice(0, Math.floor(width / iconWidth));
        let iconX = x;
        for (const icon of icons) {
            this.drawIcon(icon, iconX, y + 2);
            iconX += iconWidth;
        }
    };

    Window_EquipStatus.prototype.drawParam = function(data, actor, x, y, width) {
        const paramId = data.DateSelect - 20;
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        const systemWidth = data.SystemItemWidth || 160;
        const name = data.ParamName ? data.ParamName : TextManager.param(paramId);
        let margin = 0;
        if (data.IconId > 0) {
            this.drawIcon(data.IconId, x, y + data.IconY);
            margin = ImageManager.iconWidth + 4;
        } else {
            margin = 0;
        }
        const value = actor.param(paramId);
        const paramX = this.paramX(width);
        const rightArrowWidth = this.rightArrowWidth();
        const paramWidth = this.paramWidth();
        this.drawText(name, x + margin, y, Math.min(systemWidth, width - paramX - margin));
        this.resetTextColor();
        if (actor) {
            this.drawText(value + (data.paramUnit ? String(data.paramUnit) : ""), paramX, y, paramWidth, "right");
        }
        this.drawRightArrow(paramX + paramWidth, y);
        if (this._tempActor) {
            const newValue = this._tempActor.param(paramId);
            const diffvalue = newValue - value;
            this.changeTextColor(ColorManager.paramchangeTextColor(diffvalue));
            this.drawText(newValue + (data.paramUnit ? String(data.paramUnit) : ""), paramX + paramWidth + rightArrowWidth, y, paramWidth, "right");
        }
    };

    Window_EquipStatus.prototype.drawXParam = function(data, actor, x, y, width) {
        const paramId = data.DateSelect;
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        const systemWidth = data.SystemItemWidth || 160;
        const name = this.paramNameShow(data);
        let margin = 0;
        if (data.IconId > 0) {
            this.drawIcon(data.IconId, x, y + data.IconY);
            margin = ImageManager.iconWidth + 4;
        } else {
            margin = 0;
        }
        const value = NuunManager.numPercentage(actor.xparam(paramId - 30) * 100, data.Decimal || 0, DecimalMode);
        const paramX = this.paramX(width);
        const rightArrowWidth = this.rightArrowWidth();
        const paramWidth = this.paramWidth();
        this.drawText(name, x + margin, y, Math.min(systemWidth, width - paramX - margin));
        this.resetTextColor();
        if (actor) {
            this.drawText(value + (data.paramUnit ? String(data.paramUnit) : "%"), paramX, y, paramWidth, "right");
        }
        this.drawRightArrow(paramX + paramWidth, y);
        if (this._tempActor) {
            const newValue = NuunManager.numPercentage(this._tempActor.xparam(paramId - 30) * 100, data.Decimal || 0, DecimalMode);
            const diffvalue = newValue - value;
            this.changeTextColor(ColorManager.paramchangeTextColor(diffvalue));
            this.drawText(newValue + (data.paramUnit ? String(data.paramUnit) : "%"), paramX + paramWidth + rightArrowWidth, y, paramWidth, "right");
        }
    };

    Window_EquipStatus.prototype.drawSParam = function(data, actor, x, y, width) {
        const paramId = data.DateSelect;
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        const systemWidth = data.SystemItemWidth || 160;
        const name = this.paramNameShow(data);
        let margin = 0;
        if (data.IconId > 0) {
            this.drawIcon(data.IconId, x, y + data.IconY);
            margin = ImageManager.iconWidth + 4;
        } else {
            margin = 0;
        }
        const value = NuunManager.numPercentage(actor.sparam(paramId - 40) * 100, data.Decimal - 2, DecimalMode);
        const paramX = this.paramX(width);
        const rightArrowWidth = this.rightArrowWidth();
        const paramWidth = this.paramWidth();
        this.drawText(name, x + margin, y, Math.min(systemWidth, width - paramX - margin));
        this.resetTextColor();
        if (actor) {
            this.drawText(value + (data.paramUnit ? String(data.paramUnit) : "%"), paramX, y, paramWidth, "right");
        }
        this.drawRightArrow(paramX + paramWidth, y);
        if (this._tempActor) {
            const newValue = NuunManager.numPercentage(this._tempActor.sparam(paramId - 40) * 100, data.Decimal - 2, DecimalMode);
            const diffvalue = newValue - value;
            this.changeTextColor(ColorManager.paramchangeTextColor(diffvalue));
            this.drawText(newValue + (data.paramUnit ? String(data.paramUnit) : "%"), paramX + paramWidth + rightArrowWidth, y, paramWidth, "right");
        }
    };

    Window_EquipStatus.prototype.drawOriginalStatusParam = function(data, index, actor, x, y, width) {
        let a = actor;
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        const name = data.ParamName ? data.ParamName : null;
        let margin = 0;
        if (data.IconId > 0) {
            this.drawIcon(data.IconId, x, y + data.IconY);
            margin = ImageManager.iconWidth + 4;
        } else {
            margin = 0;
        }
        const systemWidth = name ? (data.SystemItemWidth || 160) : 0;
        const paramX = this.paramX(width);
        const rightArrowWidth = this.rightArrowWidth();
        const paramWidth = this.paramWidth();
        if (name) {
            this.drawText(name, x + margin, y, Math.min(systemWidth, width - paramX - margin));
        }
        this.resetTextColor();
        let text = eval(data.DataEval);
        if (!isNaN(text)) {
            text = NuunManager.numPercentage(text, data.Decimal - 2, DecimalMode);
        }
        if (actor) {
            this.drawText(text + (data.paramUnit ? String(data.paramUnit) : ""), paramX, y, paramWidth, "right");
        }
        this.drawRightArrow(paramX + paramWidth, y);
        if (this._tempActor) {
            a = this._tempActor;
            const newValue = NuunManager.numPercentage(eval(data.DataEval), data.Decimal - 2, DecimalMode);
            if (!isNaN(text)) {
                const diffvalue = newValue - text;
                this.changeTextColor(ColorManager.paramchangeTextColor(diffvalue));
            } else {
                this.resetTextColor();
            }
            this.drawText(newValue + (data.paramUnit ? String(data.paramUnit) : ""), paramX + paramWidth + rightArrowWidth, y, paramWidth, "right");
        }
    };

    Window_EquipStatus.prototype.drawSpecialStatus = function(data, actor, x, y, width) {
        const lineHeight = SetBonusLineHeight;
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        const name = data.ParamName ? data.ParamName : null;
        if (name) {
            this.drawText(name, x, y, data.SystemItemWidth);
            y += lineHeight;
        }
        const a = this._tempActor ? this._tempActor : actor;
        const equips = a.equips();
        for (const equip of equips) {
            
        }
    };

    Window_EquipStatus.prototype.drawSetBonus = function(data, actor, x, y, width) {
        const lineHeight = SetBonusLineHeight;
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        const name = data.ParamName ? data.ParamName : null;
        if (name) {
            this.drawText(name, x, y, data.SystemItemWidth);
            y += lineHeight;
        }
        const a = this._tempActor ? this._tempActor : actor;
        const list = a.getSetBonusIds().filter(bonus => !!bonus);
        list.forEach(setBonusId => {
            const setData = NuunManager.getSetBonusData(setBonusId.id);
            const setBonusSum = setBonusId.sum;
            this.changeTextColor(NuunManager.getColorCode(data.NameColor));
            const name = setData.SetBonusName;
            this.drawSetBonusName(name, x, y, width);
            this.resetTextColor();
            y += lineHeight;
            this.horzLine(data, x, y, width, actor);
            y += lineHeight;
            setData.SetBonusNumberEquipment.forEach(numberEquip => {
                if (setData.SetBonusEquip && setData.SetBonusEquip.length > 1 && numberEquip.SetNumberEquip <= setBonusSum) {
                    y += lineHeight * this.drawSetBonusNumberEquipment(data, numberEquip, x, y, width);
                } else if (!(setData.SetBonusEquip && setData.SetBonusEquip.length > 1) && numberEquip.SetNumberEquip <= setBonusSum) {
                    y += lineHeight * this.drawSetBonusNumberEquipment(data, numberEquip, x, y, width);
                }
            });
            if (setData.SetBonusEquip && setData.SetBonusEquip.length > 1 && setData.SetBonusEquip.length === setBonusSum) {
                y += lineHeight * this.drawSetBonusParam(data, setData, x, y, width);
            }
        });
    };

    Window_EquipStatus.prototype.drawElement = function(data, actor, x, y, width) {
        const lineHeight = this.lineHeight();
        const name = data.ParamName ? data.ParamName : null;
        const systemWidth = name ? (data.SystemItemWidth || 160) : 0;
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        let margin = 0;
        if (name) {
            this.drawText(name, x, y, width);
            y += lineHeight;
        }
        let index = 0;
        width = Math.floor((width - this.colSpacing()) / data.ContentsCols);
        const paramX = this.paramX(width);
        const rightArrowWidth = this.rightArrowWidth();
        const paramWidth = this.paramWidth();
        ElementResist.forEach(element => {
            const elementId = element.ElementNo;
            if (elementId > 0) {
                const x2 = Math.floor(index % data.ContentsCols) * (width + this.itemPadding());
                const y2 = Math.floor(index / data.ContentsCols) * lineHeight;
                const iconId = element.ElementIconId;
                if (!ElementResistMode !== 1 && iconId > 0) {
                    this.drawIcon(iconId, x + x2, y + y2 + data.IconY);
                    margin = ImageManager.iconWidth + 4;
                } else {
                    margin = 0;
                }
                if (ElementResistMode !== 0) {
                    const name = $dataSystem.elements[elementId];
                    this.changeTextColor(NuunManager.getColorCode(data.NameColor));
                    this.drawText(name, x + x2 + margin, y + y2, systemWidth);
                }
                this.resetTextColor();
                const rate = NuunManager.numPercentage(actor.elementRate(elementId) * 100, data.Decimal - 2, DecimalMode);
                if (actor) {
                    this.drawText(rate + (data.paramUnit ? String(data.paramUnit) : "%"), paramX + x2, y + y2, paramWidth, "right");
                }
                this.drawRightArrow(paramX + paramWidth + x2, y + y2);
                if (this._tempActor) {
                    const newValue = NuunManager.numPercentage(this._tempActor.elementRate(elementId) * 100, data.Decimal - 2, DecimalMode);
                    const diffvalue = rate - newValue;
                    this.changeTextColor(ColorManager.paramchangeTextColor(diffvalue));
                    this.drawText(newValue + (data.paramUnit ? String(data.paramUnit) : "%"), paramX + paramWidth + rightArrowWidth + x2, y + y2, paramWidth, "right");
                }
                index++;
            }
        });
    };

    Window_EquipStatus.prototype.drawState = function(data, actor, x, y, width) {
        const lineHeight = this.lineHeight();
        const name = data.ParamName ? data.ParamName : null;
        const systemWidth = name ? (data.SystemItemWidth || 160) : 0;
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        let margin = 0;
        if (name) {
            this.drawText(name, x, y, width);
            y += lineHeight;
        }
        let index = 0;
        width = Math.floor((width - this.colSpacing()) / data.ContentsCols);
        const paramX = this.paramX(width);
        const rightArrowWidth = this.rightArrowWidth();
        const paramWidth = this.paramWidth();
        StateResist.forEach(state => {
            const stateId = state.StateNo;
            if (stateId > 0) {
                const x2 = Math.floor(index % data.ContentsCols) * (width + this.itemPadding());
                const y2 = Math.floor(index / data.ContentsCols) * lineHeight;
                const iconId = state.StateIconId > 0 ? state.StateIconId : $dataStates[stateId].iconIndex;
                if (!StateResistMode !== 1 && iconId > 0) {
                    this.drawIcon(iconId, x + x2, y + y2 + data.IconY);
                    margin = ImageManager.iconWidth + 4;
                } else {
                    margin = 0;
                }
                if (StateResistMode !== 0) {
                    const name = $dataStates[stateId].name;
                    this.changeTextColor(NuunManager.getColorCode(data.NameColor));
                    this.drawText(name, x + margin + x2, y + y2, systemWidth);
                }
                this.resetTextColor();
                let rate = actor.stateRate(stateId) * 100 * (actor.isStateResist(stateId) ? 0 : 1);
                rate = NuunManager.numPercentage(rate, data.Decimal - 2, DecimalMode);
                if (actor) {
                    this.drawText(rate + (data.paramUnit ? String(data.paramUnit) : "%"), paramX + x2, y + y2, paramWidth, "right");
                }
                this.drawRightArrow(paramX + paramWidth + x2, y + y2);
                if (this._tempActor) {
                    let newValue = this._tempActor.stateRate(stateId) * 100 * (this._tempActor.isStateResist(stateId) ? 0 : 1);
                    newValue = NuunManager.numPercentage(newValue, data.Decimal - 2, DecimalMode);
                    const diffvalue = rate - newValue;
                    this.changeTextColor(ColorManager.paramchangeTextColor(diffvalue));
                    this.drawText(newValue + (data.paramUnit ? String(data.paramUnit) : "%"), paramX + paramWidth + rightArrowWidth + x2, y + y2, paramWidth, "right");
                }
                index++;
            }
        });
    };

    Window_EquipStatus.prototype.drawDesc = function(data, actor, x, y, width) {
        const lineHeight = this.lineHeight();
        let text = null;
        const name = data.ParamName ? data.ParamName : null;
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        if (name) {
            this.drawText(name, x, y, width);
            y += lineHeight;
        }
        this.resetTextColor();
        const method = data.textMethod;
        if (method) {
            text = actor.actor().meta[method];
        }
        if(text){
            this.drawTextEx(text, x, y, width);
        }
    };

    Window_EquipStatus.prototype.contentsDrawActorChip = function(data, x, y, width, actor) {
        this.actorCharacterChip(actor, data, x + 24, y + 48);
    };

    Window_EquipStatus.prototype.actorCharacterChip = function(actor, data, x, y) { 
        const key = "actormenuStatusCharacter";
        const sprite = this.createInnerSprite(key, Sprite_EquipScreenCharacter);
        sprite.setup(actor, data);
        sprite._character.setPosition(0, 0);
        sprite.move(x, y);
        sprite.show();
    };

    Window_EquipStatus.prototype.drawSvActorImg = function(data, x, y, width, actor) {
        const key = "menuSvActor";
        const sprite = this.createInnerSprite(key, Sprite_EquipSvActor);
        sprite.setup(actor, data);
        sprite.show();
        sprite.setHome(x + 64, y + 64);
        sprite.startMotion();
    };

    Window_EquipStatus.prototype.placeHpGauge = function(x, y, actor) {
        $gameTemp.equipGaugeType = "hp";
        this.placeGauge(actor, "hp", x, y);
    };
    
    Window_EquipStatus.prototype.placeMpGauge = function(x, y, actor) {
        $gameTemp.equipGaugeType = "mp";
        this.placeGauge(actor, "mp", x, y);
    };
    
    Window_EquipStatus.prototype.placeTpGauge = function(x, y, actor) {
        if ($dataSystem.optDisplayTp) {
            $gameTemp.equipGaugeType = "tp";
            this.placeGauge(actor, "tp", x, y);
        }
    };

    Window_EquipStatus.prototype.placeGauge = function(actor, type, x, y) {
        const key = "actorEquip-gauge-%1".format(type);
        const sprite = this.createInnerSprite(key, Sprite_EquipStatusGauge);
        sprite.setup(actor, type);
        sprite.move(x, y);
        sprite.show();
    };
    

    Window_EquipStatus.prototype.horzLine = function(data, x, y, width, actor) {
        const lineY = y + this.lineHeight() / 2 - 1;
        this.contents.paintOpacity = 48;
        this.contents.fillRect(x, lineY, width, 2, NuunManager.getColorCode(data.NameColor));
        this.contents.paintOpacity = 255;
    };
    
    Window_EquipStatus.prototype.paramX = function(width) {//再定義
        const itemPadding = this.itemPadding();
        const rightArrowWidth = this.rightArrowWidth();
        const paramWidth = this.paramWidth();
        return width - itemPadding - paramWidth * 2 - rightArrowWidth;
    };

    Window_EquipStatus.prototype.createApngSprite = function(actor, data, rect) {
        if (!this._actorBitmap) {
            const sprite = new Sprite_NuunAPngImg();
            this._contentsBackSprite.addChild(sprite);
            this._actorBitmap = sprite;
        }
        if (this._actorBitmap) {
            const name = Imported.NUUN_ActorPicture && ActorPictureEXApp ? battler.getActorGraphicImg() : data.ActorImg;
            this._actorBitmap.setup(actor, data, name);
            this._actorBitmap.move(rect.x + data.Actor_X + ActorImg_X, rect.y + data.Actor_Y + ActorImg_Y, rect.width, rect.height);
        }
    };

    Window_EquipStatus.prototype.drawSetBonusName = function(name, x, y, width) {
        this.drawText(name, x, y, width);
    };
    
    Window_EquipStatus.prototype.drawSetBonusParam = function(data, numberEquip, x, y, width) {
        const equip = getSetBonusEquip(numberEquip.SetBonusWeaponData, numberEquip.SetBonusArmorData);
        let rows = 0;
        if (equip) {
            let text = '';
            let textWidth = 0;
            if (numberEquip.SetBonusText) {
                this.changeTextColor(NuunManager.getColorCode(data.NameColor));
                this.drawText(numberEquip.SetBonusText, x, y, width);
                textWidth = this.textWidth(numberEquip.SetBonusText) + this.itemPadding();
            }
            this.resetTextColor();
            const setBonusParamText = numberEquip.SetBonusParamText || [];
            setBonusParamText.forEach(textData => {
                const statusWidth = this.textWidth(textData) + textWidth;
                if (statusWidth > width && !!text) {
                    this.drawText(text, x + textWidth, y, width - textWidth);
                    text = '';
                    textWidth = 0;
                    y += SetBonusLineHeight;
                    rows++;
                }
                if (!!textData) {
                    text += text ? ','+ textData : textData;
                }
            });
            if (!!text) {
                this.drawText(text, x + textWidth, y, width - textWidth);
                rows++;
            }
        }
        return rows;
    };
    
    Window_EquipStatus.prototype.drawSetBonusNumberEquipment = function(data, numberEquip, x, y, width) {
        const equip = getSetBonusEquip(numberEquip.SetNumberEquipWeaponData, numberEquip.SetNumberEquipArmorData);
        let rows = 0;
        if (equip) {
            let text = '';
            let textWidth = 0;
            if (numberEquip.SetBonusText) {
                this.changeTextColor(NuunManager.getColorCode(data.NameColor));
                this.drawText(numberEquip.SetBonusText, x, y, width);
                textWidth = this.textWidth(numberEquip.SetBonusText) + this.itemPadding();
            }
            this.resetTextColor();
            const setBonusParamText = numberEquip.SetBonusParamText || [];
            setBonusParamText.forEach(textData => {
                const statusWidth = this.textWidth(textData) + textWidth;
                if (statusWidth > width && !!text) {
                    this.drawText(text, x + textWidth, y, width - textWidth);
                    text = '';
                    textWidth = 0;
                    y += SetBonusLineHeight;
                    rows++;
                }
                if (!!textData) {
                    text += text ? ','+ textData : textData;
                }
            });
            if (!!text) {
                this.drawText(text, x + textWidth, y, width - textWidth);
                rows++;
            }
        }
        return rows;
    };


    function Sprite_EquipStatusGauge() {
        this.initialize(...arguments);
    }
      
    Sprite_EquipStatusGauge.prototype = Object.create(Sprite_Gauge.prototype);
    Sprite_EquipStatusGauge.prototype.constructor = Sprite_EquipStatusGauge;
      
    Sprite_EquipStatusGauge.prototype.initialize = function() {
        this._statusType = $gameTemp.equipGaugeType;
        this.equipParam = $gameTemp.equipParam;
        this._gaugeWidth = Math.min(this.getEquipGaugeWidth(), maxGaugeWidth);
        this._gaugeHeight = 12;
        Sprite_Gauge.prototype.initialize.call(this);
    };

    Sprite_EquipStatusGauge.prototype.bitmapWidth = function() {
        return this._gaugeWidth;
    };
      
    Sprite_EquipStatusGauge.prototype.gaugeHeight = function() {
        return this._gaugeHeight;
    };

    Sprite_EquipStatusGauge.prototype.getEquipGaugeWidth = function() {
        switch (this._statusType) {
          case 'hp':
            return this.equipParam.ItemWidth > 0 ? this.equipParam.ItemWidth : HPGaugeWidth;
          case 'mp':
            return this.equipParam.ItemWidth > 0 ? this.equipParam.ItemWidth : MPGaugeWidth;
          case 'tp':
            return this.equipParam.ItemWidth > 0 ? this.equipParam.ItemWidth : TPGaugeWidth;
          default:
            return this.equipParam.ItemWidth > 0 ? this.equipParam.ItemWidth : 128;
        }
    };


    function Sprite_EquipScreenCharacter() {
        this.initialize(...arguments);
    }
      
    Sprite_EquipScreenCharacter.prototype = Object.create(Sprite_Character.prototype);
    Sprite_EquipScreenCharacter.prototype.constructor = Sprite_EquipScreenCharacter;
      
    Sprite_EquipScreenCharacter.prototype.initialize = function(character) {
        Sprite_Character.prototype.initialize.call(this, character);
        this._data = null;
        this._actor = null;
    };

    Sprite_EquipScreenCharacter.prototype.setup = function(battler, data) {
        const character = new Game_Character(battler);
        const characterName = battler.characterName();
        const characterIndex = battler.characterIndex();
        character.setImage(characterName, characterIndex);
        character.setStepAnime(true);
        this._data = data;
        this._actor = battler;
        this.setCharacter(character);
    };
      
    Sprite_EquipScreenCharacter.prototype.update = function() {
        if (this.visible) {
          Sprite_Character.prototype.update.call(this);
          this._character.updateAnimation();
          this.changePaintOpacity();
        }
    };

    Sprite_EquipScreenCharacter.prototype.changePaintOpacity = function() {
        const battleMemberOpacity = this._data.BattleMemberOpacity !== undefined ? this._data.BattleMemberOpacity : true;
        if (battleMemberOpacity) {
            this.opacity = this._actor.isBattleMember() ? 255 : Window_Base.prototype.translucentOpacity.call(this);
        }
    };

    Sprite_EquipScreenCharacter.prototype.updatePosition = function() {

    };
    

    function Sprite_EquipSvActor() {
        this.initialize(...arguments);
    }
      
    Sprite_EquipSvActor.prototype = Object.create(Sprite_Actor.prototype);
    Sprite_EquipSvActor.prototype.constructor = Sprite_EquipSvActor;
      
    Sprite_EquipSvActor.prototype.updateVisibility = function() {
        Sprite_Clickable.prototype.updateVisibility.call(this);
    };
      
    Sprite_EquipSvActor.prototype.initialize = function(battler) {
    Sprite_Actor.prototype.initialize.call(this, battler);
        this._data = null;
    };

    Sprite_EquipSvActor.prototype.setup = function(battler, data) {
        this.setBattler(battler);
        this._data = data;
    };
      
    Sprite_EquipSvActor.prototype.moveToStartPosition = function() {
        this.startMove(0, 0, 0);
    };
      
    Sprite_EquipSvActor.prototype.updateMain = function() {
        this.updateBitmap();
        this.updateFrame();
        this.updateMove();
    };
    
    Sprite_EquipSvActor.prototype.startMotion = function() {
        if (this._actor.isDead()) {
            motionType = 'dead';
        } else {
            motionType = 'walk';
        }
        Sprite_Actor.prototype.startMotion.call(this, motionType);
    };
      
    Sprite_EquipSvActor.prototype.setupWeaponAnimation = function() {
        
    };


    function getSetBonusEquip(weaponId, armorId) {
        if (weaponId > 0) {
            return $dataWeapons[weaponId];
        } else if (armorId > 0) {
            return $dataArmors[armorId];
        } else {
            return null;
        }
    };
      

})();