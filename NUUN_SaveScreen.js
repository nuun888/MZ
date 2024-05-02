/*:-----------------------------------------------------------------------------------
 * NUUN_SaveScreen.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */
/*:
 * @target MZ
 * @plugindesc Save screen EX
 * @author NUUN
 * @version 2.3.1
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * You can customize the save screen.
 * 
 * Items that can be set
 * play time,save time,location,money,original param,file name,title,chapter,destination
 * actor name,class,nickname,level,character chip,face,sv actor, snap shot
 * 
 * To set the items to be displayed on the save screen, set from the display items of the plug-in parameter.
 * 
 * The drawTextEx display does not apply the font size of the plugin parameter.
 * Set the text with \FS[x].
 * 
 * Change background image
 * You can change the background image as the game progresses.
 * By default, the background ID will be changed each time you change it with the plug-in command "Change background image".
 * The background ID of the save data with the highest ID is displayed on the loading screen.
 * 
 * original param
 * 
 * 
 * Autosave snapshot
 * When autosaving, snapshots will be taken of the map just before the start of the battle and the map just before moving.
 * 
 * Content background setting (NUUN_Base ver.1.6.2 or later)
 * You can set an image as the content background for each save.
 * Usually, the background of list number 1 is displayed.
 * Use the second and later when you want to change the content background for each map.
 * Specify the file directly to change with the plug-in command.
 * 
 * The origin position of the content background image and the enlargement rate are set by the plug-in parameter "Content background image setting".
 * When an image with the same name as the image set in the content background is displayed, the set origin and magnification are applied.
 * If not set, it will be applied with the origin 0,0 and the magnification rate 100%.
 * 
 * Map Notes
 * <SaveContentsBackImg:[filename]> Specifies the content background image. For maps with this tag set, the image set in the map is applied instead of the image set in the plug-in parameter and plug-in command.
 * [filename]:list number of content background image
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 2024/5/2 Ver.2.3.1
 * Corrected an issue where an error message was not displayed when displayed alone.
 * 2024/5/1 Ver.2.3.0
 * Added a function to disable autosave execution when moving around the map or at the end of battle.
 * Fixed so that autosave can be executed when saving is disabled.
 * Corrected the display position of some content.
 * Fixed many bugs.
 * 2024/4/21 Ver.2.2.5
 * Some processing changes due to variable maximum save number plugin update.
 * 2024/4/20 Ver.2.2.4
 * Fixed an issue where the scrolling would be misaligned when saving with the number of save columns set to 2 or more.
 * 2024/2/23 Ver.2.2.3
 * Fixed an issue where saving could not be executed during event testing.
 * 2023/8/21 Ver.2.2.2
 * Fixed the problem that 0 is not displayed in the original parameter.
 * 2023/7/15 Ver.2.2.1
 * Added a function that can display facial graphics, SV actors, and actor names of actors that match specific conditions.
 * 2023/7/8 Ver.2.2.0
 * Added a function that can display the character chip and level of actors who meet only specific conditions.
 * 2023/6/18 Ver.2.1.4
 * Fixed an issue where lines were not working.
 * 2023/1/17 Ver.2.1.3
 * Corrected because the contents of the plug-in command's auto save execution were different.
 * Fixed the problem that the maximum number of saves is displayed one less when autosave is turned off.
 * Added a function that allows you to specify a switch that does not perform auto save when moving after battle.
 * 2023/1/7 Ver.2.1.2
 * Added a function that allows you to select whether to display or hide the window image.
 * Changed the display in languages other than Japanese to English.
 * 2023/1/7 Ver.2.1.1
 * Fixed the problem that the background image is not displayed when saving.
 * 2022/12/30 Ver.2.1.0
 * Added the ability to set the number of columns to display save files.
 * Added a function that allows you to specify the content background image for each map.
 * 2022/11/5 Ver.2.0.1
 * Fixed the problem that there is a margin between each face graphic when changing the enlargement ratio of the face.
 * 2022/9/24 Ver.2.0.0
 * Free arrangement of all items.
 * Fixed some bugs.
 * 2022/7/4 Ver.1.9.0
 * Added text display processing in ``NUUN_Chapter'' and ``NUUN_Destination''.
 * Added a function that allows you to change the content background in the middle of the game.
 * Fixed the problem that the font of some texts in the original parameter is not applied.
 * 2022/5/28 Ver.1.8.5
 * Added a function that can specify the coordinate time in the file name.
 * Added a function that can specify coordinates, display width, and character alignment in the file name horizontal string.
 * 2022/5/14 Ver.1.8.4
 * Fixed the problem that the background image is not applied even if the content background image is set to OFF.
 * 2022/5/11 Ver.1.8.3
 * Fixed an issue where the autosave did not work at the end of battle.
 * Fixed the problem that the map shot with auto save becomes a black image when moving the map and at the end of the battle.
 * 2022/1/5 Ver.1.8.2
 * Fixed the problem that the name can not be obtained.
 * Changed the original parameter setting method.
 * 2021/12/30 Ver.1.8.1
 * Added a function that allows you to set your own image for the content background.
 * 2021/12/12 Ver.1.8.0
 * Change content display settings.
 * Fixed an issue where plugin commands were not applied.
 * Changed the setting method of the text to be displayed next to the file name.
 * 2021/7/16 Ver.1.7.0
 * Added a function to display the save date and time.
 * 2021/5/29 Ver.1.6.0
 * Added ability to show side view actor.
 * 2021/5/27 Ver.1.5.2
 * Fixed screenshot handling.
 * Removed some plugin commands.
 * 2021/5/15 Ver.1.5.1
 * Changed how screenshots are processed.
 * 2021/5/14 Ver.1.5.0
 * Added function to display saved screenshots.
 * 2021/5/11 Ver.1.4.1
 * Fixed the problem that an error appears when opening the save screen with save data inherited from the previous version.
 * 2021/5/11 Ver.1.4.0
 * Added a function that allows you to change the background image according to the progress of the game.
 * 2021/5/8 Ver.1.3.0
 * Added a function that can display any background image.
 * Changed how to set the display of actor images.
 * Changed so that Y of the level can be adjusted.
 * Changed the Y coordinate of the actor when displaying the character chip to the relative coordinate.
 * Added the ability to specify the number of saves that can be displayed and the maximum number that can be saved.
 * Added the ability to hide the black background image (by default) that appears behind the content of the selection screen.
 * 2021/1/30 Ver.1.2.1
 * Changed how to set the content area X coordinate.
 * 2021/1/29 Ver.1.2.0
 * Changed to be able to specify the width, height, and magnification ratio of face.
 * Fixed the problem that the file name is not displayed for files without save info.
 * 2021/1/26 Ver.1.1.1
 * Fixed the problem that the file title is hidden when displaying face.
 * 2021/1/26 Ver.1.1.0
 * Added a function that can display face.
 * 2021/1/24 Ver.1.0.0
 * First edition.
 * 
 * @command ChangeBackground
 * @desc Change the background image.
 * @text Change background image
 * 
 * @arg BackGroundImg
 * @desc Specifies the background image file name.
 * @text Background image
 * @type file
 * @dir img/
 * @default 
 * 
 * @arg BackGroundId
 * @desc Sets the background image ID."Background image ID automatic setting" is OFF.
 * @text Background image ID
 * @type number
 * @default 0
 * @min 0
 * 
 * 
 * @command ChangeContentsBackground
 * @desc Change the content background image.
 * @text Content background image change
 * 
 * @arg BackGroundImg
 * @desc Specifies the background image file name.
 * @text Background image
 * @type file
 * @dir img/
 * @default 
 * 
 * 
 * @command UserAutoSave
 * @desc Perform autosave.
 * @text Perform autosave
 * 
 * @arg OnSaveSnap
 * @text snapshot permission
 * @desc Allow snapshots on autosave.
 * @type boolean
 * @default true
 * 
 * @command SnapShot
 * @desc Take a snapshot of the next save.
 * @text taking a snapshot
 * 
 * @command SetAnyName
 * @desc Enter the chapter name.
 * @text Chapter
 * 
 * @arg AnyName
 * @text Chapter text
 * @desc Enter the chapter text. Set when you want to display the current captor.
 * @type string
 * @default 
 * 
 * @command SpecifyActor
 * @desc Set the actor to display only the specified actor on the save screen.
 * @text Change specified actor
 * 
 * @arg ActorId
 * @text Actor
 * @desc Specifies an actor. If 0 is specified, the leader will be displayed.
 * @type actor
 * @default 0
 * 
 * 
 * @param BasicSetting
 * @text Basic setting
 * @default ------------------------------
 * 
 * @param PartyActorMode
 * @desc Actors to display.
 * @text Display actor
 * @type select
 * @option Battle members
 * @value 1
 * @option Party members(including standby members)
 * @value 2
 * @default 1
 * @parent BasicSetting
 * 
 * @param HelpWindowVisible
 * @text Help window image display
 * @desc Display the help window image.
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param SaveWindowVisible
 * @text Save window image display
 * @desc Show save window image.
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param SaveFileWindow
 * @text Save file window settings
 * @default ------------------------------
 * 
 * @param ContentsList
 * @desc Items to display.
 * @text Display item
 * @type struct<ContentsListData>[]
 * @default ["{\"DateSelect\":\"50\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"SystemNameColor\":\"16\",\"FontSize\":\"-6\",\"ParamName\":\"\",\"DetaEval\":\"\",\"Align\":\"\\\"left\\\"\"}","{\"DateSelect\":\"23\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"60\",\"ItemWidth\":\"48\",\"SystemItemWidth\":\"0\",\"SystemNameColor\":\"16\",\"FontSize\":\"-12\",\"ParamName\":\"\",\"DetaEval\":\"\",\"Align\":\"\\\"right\\\"\"}","{\"DateSelect\":\"10\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"2\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"SystemNameColor\":\"16\",\"FontSize\":\"-4\",\"ParamName\":\"\",\"DetaEval\":\"\",\"Align\":\"\\\"left\\\"\"}","{\"DateSelect\":\"12\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"230\",\"Y_Coordinate\":\"2\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"SystemNameColor\":\"16\",\"FontSize\":\"-6\",\"ParamName\":\"\",\"DetaEval\":\"\",\"Align\":\"\\\"TextEx\\\"\"}","{\"DateSelect\":\"3\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"230\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"520\",\"SystemItemWidth\":\"0\",\"SystemNameColor\":\"16\",\"FontSize\":\"-6\",\"ParamName\":\"現在地\",\"DetaEval\":\"\",\"Align\":\"\\\"left\\\"\"}","{\"DateSelect\":\"1\",\"X_Position\":\"1\",\"Y_Position\":\"3\",\"X_Coordinate\":\"230\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"260\",\"SystemItemWidth\":\"0\",\"SystemNameColor\":\"16\",\"FontSize\":\"-6\",\"ParamName\":\"プレイ時間\",\"DetaEval\":\"\",\"Align\":\"\\\"left\\\"\"}","{\"DateSelect\":\"4\",\"X_Position\":\"1\",\"Y_Position\":\"3\",\"X_Coordinate\":\"500\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"SystemNameColor\":\"16\",\"FontSize\":\"-6\",\"ParamName\":\"所持金\",\"DetaEval\":\"\",\"Align\":\"\\\"left\\\"\"}"]
 * @parent SaveFileWindow
 * 
 * @param NumSaveCols
 * @desc The number of save cols to display on the screen.
 * @text Number of display save cols
 * @type number
 * @default 1
 * @min 1
 * @parent SaveFileWindow
 * 
 * @param NumSaveRows
 * @desc Number of save rows displayed on the screen.
 * @text Number of saved display rows
 * @type number
 * @default 5
 * @min 1
 * @parent SaveFileWindow
 * 
 * @param SaveContentsCols
 * @desc Number of save items to display on screen.
 * @text Number of display save items
 * @type number
 * @default 2
 * @min 1
 * @parent SaveFileWindow
 * 
 * @param MaxSave
 * @desc Maximum number of saves.
 * @text Max number of saves
 * @type number
 * @default 20
 * @min 1
 * @parent SaveFileWindow
 * 
 * @param AutoSaveSetting
 * @text Auto save setting
 * @default ------------------------------
 * 
 * @param MapTransferAutoSave
 * @text Auto save enabled when moving map
 * @desc Autosave enabled when moving map.
 * @type boolean
 * @default true
 * @parent AutoSaveSetting
 * 
 * @param BattleEndAutoSave
 * @text Autosave enabled after battle
 * @desc Autosave enabled after battle.
 * @type boolean
 * @default true
 * @parent AutoSaveSetting
 * 
 * @param AutoSaveEnabledSwitch
 * @desc After battle, specify a switch that prohibits auto save execution when moving. (0 to enable auto save)
 * @text Auto save execution prohibited when moving after battle
 * @type switch
 * @default 0
 * @parent AutoSaveSetting
 * 
 * @param Contents
 * @text Each content setting
 * @default ------------------------------
 * 
 * @param DayTime
 * @desc Date and time format to display
 * @text datetime format
 * @type select
 * @option Standard (Year/Month/Day Hour:Minute:Second)
 * @value 'default'
 * @option English notation (Day/Month/Year Hour:Minute:Second)
 * @value 'en-GB'
 * @option Japanese era notation (day notation)
 * @value 'ja-JP-u-ca-japanese'
 * @default 'default'
 * @parent Contents
 * 
 * @param CharacterSpecifyActorOnry
 * @desc Shows only specified actors as characters. If the specified actor is 0, only the leader is displayed.
 * @text Character designation actor display
 * @type boolean
 * @default false
 * @parent Contents
 * 
 * @param FaceSpecifyActorOnry
 * @desc Shows only actors with specified faces. If the specified actor is 0, only the leader is displayed.
 * @text Face specified actor display
 * @type boolean
 * @default false
 * @parent Contents
 * 
 * @param SvSpecifyActorOnry
 * @desc Shows only the specified actor in the side view actor. If the specified actor is 0, only the leader is displayed.
 * @text SV actor specified actor display
 * @type boolean
 * @default false
 * @parent Contents
 * 
 * @param NameSpecifyActorOnry
 * @desc Shows only actors whose actor name is specified. If the specified actor is 0, only the leader is displayed.
 * @text Actor name specified actor display
 * @type boolean
 * @default false
 * @parent Contents
 * 
 * @param ClassSpecifyActorOnry
 * @desc Show only actors with specified class name. If the specified actor is 0, only the leader is displayed.
 * @text Class name specified actor display
 * @type boolean
 * @default false
 * @parent Contents
 * 
 * @param NickNameSpecifyActorOnry
 * @desc Shows only actors with nicknames. If the specified actor is 0, only the leader is displayed.
 * @text Nickname specified actor display
 * @type boolean
 * @default false
 * @parent Contents
 * 
 * @param LevelSpecifyActorOnry
 * @desc Shows only actors with specified levels. If the specified actor is 0, only the leader is displayed.
 * @text Level specified actor display
 * @type boolean
 * @default false
 * @parent Contents
 * 
 * @param SaveSnapSetting
 * @text Save snapshot settings
 * @default ------------------------------
 * 
 * @param InfoSaveSnap
 * @text Enable snapshot
 * @desc Enable snapshots.
 * @type boolean
 * @default false
 * @parent SaveSnapSetting
 * 
 * @param SaveSnapQuality
 * @desc Snapshot quality. (default value 0.92)
 * @text Snapshot quality
 * @type string
 * @default 0.92
 * @max 1
 * @parent SaveSnapSetting
 * 
 * @param SaveSnapScale
 * @desc Snapshot enlargement rate. (percentage)
 * @text Snapshot enlargement rate(percentage)
 * @type number
 * @default 12
 * @min 0
 * @parent SaveSnapSetting
 * 
 * @param AnyName
 * @text Chapter setting
 * @default ------------------------------
 * 
 * @param AnyNameVariable
 * @desc Chapter text variable number. It is not displayed if it is set by the plugin command "Enter the chapter name".
 * @text Chapter text display variable number
 * @type variable
 * @default 0
 * @parent AnyName
 * 
 * @param Actor
 * @text Actor settings
 * @default ------------------------------
 * 
 * @param FaceWidth
 * @desc Face Width.
 * @text Face Width
 * @type number
 * @default 144
 * @min 0
 * @parent Actor
 * 
 * @param FaceHeight
 * @desc Face height
 * @text Face height.
 * @type number
 * @default 144
 * @parent Actor
 * 
 * @param FaceScale
 * @desc Face scale
 * @text Scale
 * @type number
 * @default 100
 * @parent Actor
 * 
 * @param BackGround
 * @text Background setting
 * @default ------------------------------
 * 
 * @param BackGroundImg
 * @desc Specifies the background image file name.
 * @text Background image
 * @type file
 * @dir img/
 * @default 
 * @parent BackGround
 * 
 * @param BackUiWidth
 * @text Background image window UI size
 * @desc Fit the background image to the window UI size.
 * @type boolean
 * @default true
 * @parent BackGround
 * 
 * @param BackFitWidth
 * @text Background image enlargement
 * @desc Scales the background image to fit the window size or screen.
 * @type boolean
 * @default false
 * @parent BackGround
 * 
 * @param AutomaticSetting
 * @text Background image ID automatic setting
 * @desc Automatically sets the background image ID. The background of save data with a high ID is displayed on the loading screen.
 * @type boolean
 * @default true
 * @parent BackGround
 * 
 * @param ContentsBackVisible
 * @text Hide content background image
 * @desc Hide content background image
 * @type boolean
 * @default false
 * @parent BackGround
 * 
 * @param ContentsBackGroundImg
 * @desc Specifies the content background image file name.
 * @text Content background image
 * @type file[]
 * @dir img/
 * @default []
 * @parent BackGround
 * 
 * @param ContentsBackSettingsList
 * @desc Set the content background image.
 * @text Content background image setting
 * @type struct<ContentsBackSettings>[]
 * @default 
 * @parent BackGround
 * 
 * @param ContentsBackScale
 * @desc Default content background image scaling factor (percentage)
 * @text Background image magnification (percentage)
 * @type number
 * @min 0
 * @default 100
 * @parent BackGround
 * 
 * 
 */
/*~struct~ContentsListData:
 * 
 * @param DateSelect
 * @text status to display
 * @desc Specifies the status to display.
 * @type select
 * @option None
 * @value 0
 * @option Play time(1)(2)(3)(4)(5)(6)(7)(8)(9)(11)
 * @value 1
 * @option Save time(1)(2)(3)(4)(5)(6)(7)(8)(9)(11)
 * @value 2
 * @option Location(1)(2)(3)(4)(5)(6)(7)(8)(9)(11)
 * @value 3
 * @option Money(1)(2)(3)(4)(5)(6)(7)(8)(9)(11)
 * @value 4
 * @option Original param(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)
 * @value 5
 * @option Fail name(1)(2)(3)(4)(5)(8)
 * @value 10
 * @option Title(1)(2)(3)(4)(5)(8)(11)
 * @value 11
 * @option Chapter(1)(2)(3)(4)(5)(8)(11)
 * @value 12
 * @option Destination(1)(2)(3)(4)(5)(8)(11)
 * @value 13
 * @option Actor name(1)(2)(3)(4)(5)(8)(12)
 * @value 20
 * @option Class(1)(2)(3)(4)(5)(8)
 * @value 21
 * @option Nickname(1)(2)(3)(4)(5)(8)
 * @value 22
 * @option Level(1)(2)(3)(4)(5)(8)(11)(12)
 * @value 23
 * @option Character chip(1)(2)(3)(4)(5)(12)
 * @value 50
 * @option Face(1)(2)(3)(4)(12)
 * @value 51
 * @option SV actor(1)(2)(3)(4)(5)(12)
 * @value 52
 * @option Snap shot(1)(2)(3)(4)
 * @value 90
 * @option Line(1)(2)(3)(4)(5)(7)
 * @value 100
 * @default 0
 * 
 * @param X_Position
 * @text X display col position(1)
 * @desc X display col position.
 * @type number
 * @default 1
 * @min 1
 * @max 3
 * 
 * @param Y_Position
 * @desc Y display row position.
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
 * @param SystemNameColor
 * @desc System color ID for system items. You can enter the color code in the text tab.
 * @text System Name color(7)
 * @type color
 * @default 16
 * @min 0
 * 
 * @param FontSize
 * @desc Font size (difference from main font)
 * @text Font size(8)
 * @type number
 * @default -6
 * @min -99
 * 
 * @param ParamName
 * @desc Set the item name.
 * @text Name(9)
 * @type string
 * @default
 * 
 * @param DetaEval
 * @desc Enter an evaluation formula.
 * @text Evaluation formula(javaScript)(10)
 * @type combo
 * @option '$gameParty.steps();//Step'
 * @option '$gameSystem.battleCount();//Battle count'
 * @option '$gameSystem.escapeCount();//Escapes count'
 * @option '$gameSystem.saveCount();//Save count'
 * @option '$gameVariables.value(0);//Game variable'
 * @option '$gameSystem.chronus().getDateFormat(1);//”Chronus.js” datetime format 1'
 * @option '$gameSystem.chronus().getDateFormat(2);//”Chronus.js” datetime format 2'
 * @default 
 * 
 * @param Align
 * @desc Align.
 * @text Align(11)
 * @type select
 * @option Text code can be used (left)
 * @value "TextEx"
 * @option Left
 * @value "left"
 * @option Center
 * @value "center"
 * @option Right
 * @value "right"
 * @default "left"
 * 
 * @param ShowEval
 * @desc Enter the display conditions in Javascript.
 * @text Display condition (javaScript)(12)
 * @type combo
 * @option '$gameSwitches.value(Number(actor.actor().meta.SaveActorShowSwitch))'
 * @default 
 * 
 */
/*~struct~ContentsBackSettings:
 * 
 * @param ContentsBackGroundImg
 * @desc Specifies the content background image file name.
 * @text Content background image
 * @type file
 * @dir img/
 * @default 
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
 * @param Scale
 * @desc Content background image scaling factor (percentage)
 * @text Background image magnification (percentage)
 * @type number
 * @min 0
 * @default 100
 * 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc セーブ画面拡張
 * @author NUUN
 * @version 2.3.1
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * セーブ画面をカスタマイズできます。
 * 
 * 設定
 * 設定できる項目
 * プレイ時間、セーブ時刻、現在地、所持金、オリジナル項目、ファイル名、タイトル、章、行動目標、
 * アクター名、クラス、二つ名、レベル、キャラチップ、顔グラ、SVアクター、スナップショット
 * 
 * セーブ画面に表示する項目を設定するにはプラグインパラメータの表示項目から設定します。
 * 
 * drawTextEx表示はプラグインパラメータのフォントサイズが適用されません。
 * テキストに\FS[x]で設定してください。
 * 
 * 背景画像の変更
 * ゲームの進行によって背景画像を変更出来ます。
 * 初期設定ではプラグインコマンド「背景画像変更」で変更したたびに背景IDが変更されます。
 * 背景IDはロード画面でIDの一番高いセーブデータの背景が表示されます。
 * 
 * オリジナルパラメータ
 * 
 * 
 * オートセーブ時のスナップショット
 * オートセーブ時のスナップショットは戦闘開始直前のマップ、移動直前のマップが撮影されます。
 * 
 * スナップショットを表示するとセーブ容量が大きります。
 * 
 * コンテンツ背景の設定(NUUN_Base ver.1.6.2以降)
 * 各セーブのコンテンツ背景に画像を設定できます。
 * 通常はリスト番号1番の背景が表示されます。
 * 2番以降はマップ毎でコンテンツ背景を変更したい場合に使用します。
 * プラグインコマンドでの変更は直接ファイルを指定します。
 * 
 * コンテンツ背景の画像の原点位置及び、拡大率はプラグインパラメータのコンテンツ背景画像設定で行います。
 * コンテンツ背景に設定された画像を同じ名前の画像が表示されるとき、設定された原点、拡大率が適用されます。
 * 設定されていない場合は原点0,0、拡大率100%で適用されます。
 * 
 * マップの設定のメモ欄
 * <SaveContentsBackImg:[filename]> コンテンツ背景の画像を指定します。このタグが設定されているマップは、プラグインパラメータ及びプラグインコマンドで
 * 設定された画像は適用されずマップに設定された画像が適用されます。
 * [filename]:コンテンツ背景画像のリスト番号
 * 
 * Ver.1.3.0からNUUN_Base Ver.1.1.3以降が必要となります。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/5/2 Ver.2.3.1
 * 単体表示でエラーが出る表示がされない問題を修正。
 * 2024/5/1 Ver.2.3.0
 * マップ移動時、戦闘終了時にオートセーブの実行を非許可にする機能を追加。
 * セーブ禁止時にオートセーブを実行できるように修正。
 * 一部コンテンツの表示位置の修正。
 * 多数の不具合を修正。
 * 2024/4/21 Ver.2.2.5
 * 可変最大セーブ数プラグイン更新による一部処理の変更。
 * 2024/4/20 Ver.2.2.4
 * セーブ列数を2以上にしてセーブした際に、スクロールがずれる問題を修正。
 * 2024/2/23 Ver.2.2.3
 * イベントテストでセーブが実行できない問題を修正。
 * 2023/8/21 Ver.2.2.2
 * オリジナルパラメータで0が表示されない問題を修正。
 * 2023/7/15 Ver.2.2.1
 * 特定の条件のみ一致したアクターの顔グラ、SVアクター、アクター名を表示できる機能を追加。
 * 2023/7/8 Ver.2.2.0
 * 特定の条件のみ一致したアクターのキャラチップ、レベルを表示できる機能を追加。
 * 2023/6/18 Ver.2.1.4
 * ラインが機能していなかった問題を修正。
 * 2023/1/17 Ver.2.1.3
 * プラグインコマンドのオードセーブ実行の内容が異なっていたので修正。
 * オートセーブ有効化をOFFにしたときに最大セーブ数が１つ少なく表示される問題を修正。
 * 戦闘後、移動時のオートセーブを実行しないスイッチを指定できる機能を追加。
 * 2023/1/7 Ver.2.1.2
 * ウィンドウ画像を表示非表示か選択できる機能を追加。
 * 日本語以外での表示を英語表示に変更。
 * 2023/1/7 Ver.2.1.1
 * セーブ時に背景画像が表示されない問題を修正。
 * 2022/12/30 Ver.2.1.0
 * セーブファイルの表示に列数を設定できる機能を追加。
 * コンテンツ背景画像をマップ毎に指定できる機能を追加。
 * 2022/11/5 Ver.2.0.1
 * 顔グラの拡大率を変更したときに各顔グラの間に余白ができてしまう問題を修正。
 * 2022/9/24 Ver.2.0.0
 * 全ての項目の配置の自由化。
 * 一部不具合修正。
 * 2022/7/4 Ver.1.9.0
 * チャプターテキスト、メニュー画面行動目標表示プラグインでのテキスト表示の処理追加。
 * コンテンツ背景をゲーム途中で変更できる機能を追加。
 * オリジナルパラメータの一部のテキストのフォントが適用されない問題を修正。
 * 2022/5/28 Ver.1.8.5
 * ファイル名に座標時を指定できる機能を追加。
 * ファイル名横文字列に座標、表示横幅、文字揃えを指定できる機能を追加。
 * 2022/5/14 Ver.1.8.4
 * コンテンツ背景画像非表示をOFFに設定しても背景画像が適用しない問題を修正。
 * 2022/5/11 Ver.1.8.3
 * 戦闘終了時にオートセーブがされない問題を修正。
 * マップ移動時、戦闘終了時に、オートセーブでのマップショットが黒い画像になる問題を修正。
 * 2022/1/5 Ver.1.8.2
 * 名称が取得できない問題を修正。
 * オリジナルパラメータの設定方法を変更。
 * 2021/12/30 Ver.1.8.1
 * コンテンツ背景を独自の画像を設定できる機能を追加。
 * 2021/12/12 Ver.1.8.0
 * コンテンツの表示設定を変更。
 * プラグインコマンドが適用されていなかった問題を修正。
 * ファイル名横の表示する文字の設定方法を変更。
 * 2021/7/16 Ver.1.7.0
 * セーブ日時を表示する機能を追加。
 * 2021/5/29 Ver.1.6.0
 * サイドビューアクターを表示する機能を追加。
 * 2021/5/27 Ver.1.5.2
 * スクリーンショットの処理を修正。
 * 一部プラグインコマンドを削除。
 * 2021/5/15 Ver.1.5.1
 * スクリーンショットの処理方法を変更。
 * 2021/5/14 Ver.1.5.0
 * セーブスクリーンショットを表示する機能を追加。
 * 2021/5/11 Ver.1.4.1
 * 前バージョンから引き継いだセーブデータがあるセーブ画面を開くとエラーが出る問題を修正。
 * 2021/5/11 Ver.1.4.0
 * ゲームの進行度に応じて背景画像を変更できる機能を追加。
 * 2021/5/8 Ver.1.3.0
 * 任意の背景画像を表示できる機能を追加。
 * アクター画像の表示の設定方法を変更。
 * レベルのYを調整できるように変更。
 * キャラチップ表示時のアクターY座標を相対座標に変更。
 * 表示できるセーブ数、セーブできる最大数を指定できる機能を追加。
 * 選択画面のコンテンツ背後に表示される黒い背景画像（デフォルトの場合）を非表示にする機能を追加。
 * 2021/1/30 Ver.1.2.1
 * コンテンツエリアX座標の設定方法を変更
 * 2021/1/29 Ver.1.2.0
 * 顔グラの横幅、縦幅、拡大率を指定できるように変更。
 * セーブインフォがないファイルでファイル名が表示されない問題を修正。
 * 2021/1/26 Ver.1.1.1
 * 顔グラを表示時、ファイルタイトルが隠れて表示されてしまう問題を修正。
 * 2021/1/26 Ver.1.1.0
 * 顔グラを表示できる機能を追加。
 * 2021/1/24 Ver.1.0.0
 * 初版
 * 
 * @command ChangeBackground
 * @desc 背景画像を変更します。
 * @text 背景画像変更
 * 
 * @arg BackGroundImg
 * @desc 背景画像ファイル名を指定します。
 * @text 背景画像
 * @type file
 * @dir img/
 * @default 
 * 
 * @arg BackGroundId
 * @desc 背景画像IDを設定します。IDの高いセーブデータの背景がロード画面で表示されます。背景画像ID自動設定がOFFの時有効です。
 * @text 背景画像ID
 * @type number
 * @default 0
 * @min 0
 * 
 * 
 * @command ChangeContentsBackground
 * @desc コンテンツ背景画像を変更します。
 * @text コンテンツ背景画像変更
 * 
 * @arg BackGroundImg
 * @desc 背景画像ファイル名を指定します。
 * @text 背景画像
 * @type file
 * @dir img/
 * @default 
 * 
 * 
 * @command UserAutoSave
 * @desc オートセーブ時を行います。
 * @text オートセーブ実行
 * 
 * @arg OnSaveSnap
 * @text スナップショット許可
 * @desc オートセーブ時のスナップショットを許可します。
 * @type boolean
 * @default true
 * 
 * @command SnapShot
 * @desc 次回セーブ時のスナップショットを撮影します。
 * @text スナップショット撮影
 * 
 * @command SetAnyName
 * @desc 章の名称を記入します。
 * @text 章
 * 
 * @arg AnyName
 * @text 章テキスト
 * @desc 章テキストを記入します。現在のキャプターを表示したい時に設定します。
 * @type string
 * @default 
 * 
 * @command SpecifyActor
 * @desc セーブ画面に表示されるアクターを指定のアクターのみ表示させるアクターを設定します。
 * @text 指定のアクター変更
 * 
 * @arg ActorId
 * @text アクター
 * @desc アクターを指定します。0の場合はリーダーが表示されます。
 * @type actor
 * @default 0
 * 
 * 
 * @param BasicSetting
 * @text 基本設定
 * @default ------------------------------
 * 
 * @param PartyActorMode
 * @desc 表示するアクター
 * @text 表示アクター
 * @type select
 * @option バトルメンバー
 * @value 1
 * @option パーティメンバー(控え含む)
 * @value 2
 * @default 1
 * @parent BasicSetting
 * 
 * @param HelpWindowVisible
 * @text ヘルプウィンドウ画像表示
 * @desc ヘルプウィンドウ画像を表示する。
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param SaveWindowVisible
 * @text セーブウィンドウ画像表示
 * @desc セーブウィンドウ画像を表示する。
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param SaveFileWindow
 * @text セーブファイルウィンドウ設定
 * @default ------------------------------
 * 
 * @param ContentsList
 * @desc 表示する項目。
 * @text 表示項目
 * @type struct<ContentsListData>[]
 * @default ["{\"DateSelect\":\"50\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"SystemNameColor\":\"16\",\"FontSize\":\"-6\",\"ParamName\":\"\",\"DetaEval\":\"\",\"Align\":\"\\\"left\\\"\"}","{\"DateSelect\":\"23\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"60\",\"ItemWidth\":\"48\",\"SystemItemWidth\":\"0\",\"SystemNameColor\":\"16\",\"FontSize\":\"-12\",\"ParamName\":\"\",\"DetaEval\":\"\",\"Align\":\"\\\"right\\\"\"}","{\"DateSelect\":\"10\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"2\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"SystemNameColor\":\"16\",\"FontSize\":\"-4\",\"ParamName\":\"\",\"DetaEval\":\"\",\"Align\":\"\\\"left\\\"\"}","{\"DateSelect\":\"12\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"230\",\"Y_Coordinate\":\"2\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"SystemNameColor\":\"16\",\"FontSize\":\"-6\",\"ParamName\":\"\",\"DetaEval\":\"\",\"Align\":\"\\\"TextEx\\\"\"}","{\"DateSelect\":\"3\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"230\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"520\",\"SystemItemWidth\":\"0\",\"SystemNameColor\":\"16\",\"FontSize\":\"-6\",\"ParamName\":\"現在地\",\"DetaEval\":\"\",\"Align\":\"\\\"left\\\"\"}","{\"DateSelect\":\"1\",\"X_Position\":\"1\",\"Y_Position\":\"3\",\"X_Coordinate\":\"230\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"260\",\"SystemItemWidth\":\"0\",\"SystemNameColor\":\"16\",\"FontSize\":\"-6\",\"ParamName\":\"プレイ時間\",\"DetaEval\":\"\",\"Align\":\"\\\"left\\\"\"}","{\"DateSelect\":\"4\",\"X_Position\":\"1\",\"Y_Position\":\"3\",\"X_Coordinate\":\"500\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"SystemNameColor\":\"16\",\"FontSize\":\"-6\",\"ParamName\":\"所持金\",\"DetaEval\":\"\",\"Align\":\"\\\"left\\\"\"}"]
 * @parent SaveFileWindow
 * 
 * @param NumSaveCols
 * @desc 画面に表示するセーブ列数
 * @text 表示セーブ列数
 * @type number
 * @default 1
 * @min 1
 * @parent SaveFileWindow
 * 
 * @param NumSaveRows
 * @desc 画面に表示するセーブ行数
 * @text 表示セーブ行数
 * @type number
 * @default 5
 * @min 1
 * @parent SaveFileWindow
 * 
 * @param SaveContentsCols
 * @desc 画面に表示するセーブの項目列数
 * @text 表示セーブ項目列数
 * @type number
 * @default 2
 * @min 1
 * @parent SaveFileWindow
 * 
 * @param MaxSave
 * @desc 最大セーブ数
 * @text 最大セーブ数
 * @type number
 * @default 20
 * @min 1
 * @parent SaveFileWindow
 * 
 * @param AutoSaveSetting
 * @text オートセーブ設定
 * @default ------------------------------
 * 
 * @param MapTransferAutoSave
 * @text マップ移動時オートセーブ有効
 * @desc マップ移動時のオートセーブ有効。
 * @type boolean
 * @default true
 * @parent AutoSaveSetting
 * 
 * @param BattleEndAutoSave
 * @text 戦闘終了後オートセーブ有効
 * @desc 戦闘終了後のオートセーブ有効。
 * @type boolean
 * @default true
 * @parent AutoSaveSetting
 * 
 * @param AutoSaveEnabledSwitch
 * @desc 戦闘後、移動時のオートセーブ実行を禁止にするスイッチを指定します。(オートセーブを有効化ON)
 * @text 戦闘後、移動時オートセーブ実行禁止
 * @type switch
 * @default 0
 * @parent AutoSaveSetting
 * 
 * @param Contents
 * @text 各コンテンツ設定
 * @default ------------------------------
 * 
 * @param DayTime
 * @desc 表示する日時フォーマット
 * @text 日時フォーマット
 * @type select
 * @option 標準
 * @value 'default'
 * @option 英表記（日/月/年 時：分：秒）
 * @value 'en-GB'
 * @option 元号表記（日表記）
 * @value 'ja-JP-u-ca-japanese'
 * @default 'default'
 * @parent Contents
 * 
 * @param CharacterSpecifyActorOnry
 * @desc キャラクターを指定アクターのみ表示します。指定アクターが0の場合はリーダーのみ表示されます。
 * @text キャラクター指定アクター表示
 * @type boolean
 * @default false
 * @parent Contents
 * 
 * @param FaceSpecifyActorOnry
 * @desc 顔グラを指定アクターのみ表示します。指定アクターが0の場合はリーダーのみ表示されます。
 * @text 顔グラ指定アクター表示
 * @type boolean
 * @default false
 * @parent Contents
 * 
 * @param SvSpecifyActorOnry
 * @desc サイドビューアクターを指定アクターのみ表示します。指定アクターが0の場合はリーダーのみ表示されます。
 * @text SVアクター指定アクター表示
 * @type boolean
 * @default false
 * @parent Contents
 * 
 * @param NameSpecifyActorOnry
 * @desc アクター名を指定アクターのみ表示します。指定アクターが0の場合はリーダーのみ表示されます。
 * @text アクター名指定アクター表示
 * @type boolean
 * @default false
 * @parent Contents
 * 
 * @param ClassSpecifyActorOnry
 * @desc クラス名を指定アクターのみ表示します。指定アクターが0の場合はリーダーのみ表示されます。
 * @text クラス名指定アクター表示
 * @type boolean
 * @default false
 * @parent Contents
 * 
 * @param NickNameSpecifyActorOnry
 * @desc 二つ名(ニックネーム)を指定アクターのみ表示します。指定アクターが0の場合はリーダーのみ表示されます。
 * @text 二つ名指定アクター表示
 * @type boolean
 * @default false
 * @parent Contents
 * 
 * @param LevelSpecifyActorOnry
 * @desc レベルを指定アクターのみ表示します。指定アクターが0の場合はリーダーのみ表示されます。
 * @text レベル指定アクター表示
 * @type boolean
 * @default false
 * @parent Contents
 * 
 * @param SaveSnapSetting
 * @text セーブスナップショット設定
 * @default ------------------------------
 * 
 * @param InfoSaveSnap
 * @text スナップショット有効化
 * @desc スナップショットを有効にします。
 * @type boolean
 * @default false
 * @parent SaveSnapSetting
 * 
 * @param SaveSnapQuality
 * @desc スナップショットの画質。(デフォルト値0.92)
 * @text スナップショット画質
 * @type string
 * @default 0.92
 * @max 1
 * @parent SaveSnapSetting
 * 
 * @param SaveSnapScale
 * @desc スナップショットの拡大率（百分率）
 * @text スナップショット拡大率（百分率）
 * @type number
 * @default 12
 * @min 0
 * @parent SaveSnapSetting
 * 
 * @param AnyName
 * @text 章設定
 * @default ------------------------------
 * 
 * @param AnyNameVariable
 * @desc 章テキスト変数番号。プラグインコマンド「章テキスト」で設定している場合は表示されません。
 * @text 章テキスト表示変数番号
 * @type variable
 * @default 0
 * @parent AnyName
 * 
 * @param Actor
 * @text アクター設定
 * @default ------------------------------
 * 
 * @param FaceWidth
 * @desc 顔グラの横幅
 * @text 顔グラの横幅
 * @type number
 * @default 144
 * @min 0
 * @parent Actor
 * 
 * @param FaceHeight
 * @desc 顔グラの縦幅
 * @text 顔グラの縦幅
 * @type number
 * @default 144
 * @parent Actor
 * 
 * @param FaceScale
 * @desc 顔グラの拡大率
 * @text 拡大率
 * @type number
 * @default 100
 * @parent Actor
 * 
 * @param BackGround
 * @text 背景設定
 * @default ------------------------------
 * 
 * @param BackGroundImg
 * @desc 背景画像ファイル名を指定します。
 * @text 背景画像
 * @type file
 * @dir img/
 * @default 
 * @parent BackGround
 * 
 * @param BackUiWidth
 * @text 背景画像ウィンドウUIサイズ
 * @desc 背景画像をウィンドウUIサイズに合わせる。
 * @type boolean
 * @default true
 * @parent BackGround
 * 
 * @param BackFitWidth
 * @text 背景画像拡大
 * @desc 背景画像をウィンドウサイズまたは画面に合わせ拡大します。
 * @type boolean
 * @default false
 * @parent BackGround
 * 
 * @param AutomaticSetting
 * @text 背景画像ID自動設定
 * @desc 背景画像IDを自動で設定します。背景画像を変更した際、IDの高いセーブデータの背景がロード画面で表示されます。
 * @type boolean
 * @default true
 * @parent BackGround
 * 
 * @param ContentsBackVisible
 * @text コンテンツ背景表示なし
 * @desc コンテンツの背景画像を表示しません。
 * @type boolean
 * @default false
 * @parent BackGround
 * 
 * @param ContentsBackGroundImg
 * @desc コンテンツ背景画像ファイル名を指定します。
 * @text コンテンツ背景画像
 * @type file[]
 * @dir img/
 * @default []
 * @parent BackGround
 * 
 * @param ContentsBackSettingsList
 * @desc コンテンツ背景の画像設定を行います。
 * @text コンテンツ背景画像設定
 * @type struct<ContentsBackSettings>[]
 * @default 
 * @parent BackGround
 * 
 * @param ContentsBackScale
 * @desc デフォルトのコンテンツ背景画像の拡大率(百分率)
 * @text コンテンツ背景画像拡大率(百分率)
 * @type number
 * @min 0
 * @default 100
 * @parent BackGround
 * 
 * 
 */
/*~struct~ContentsListData:ja
 * 
 * @param DateSelect
 * @text 表示するステータス
 * @desc 表示するステータスを指定します。
 * @type select
 * @option なし
 * @value 0
 * @option プレイ時間(1)(2)(3)(4)(5)(6)(7)(8)(9)(11)
 * @value 1
 * @option セーブ時刻(1)(2)(3)(4)(5)(6)(7)(8)(9)(11)
 * @value 2
 * @option 現在地(1)(2)(3)(4)(5)(6)(7)(8)(9)(11)
 * @value 3
 * @option 所持金(1)(2)(3)(4)(5)(6)(7)(8)(9)(11)
 * @value 4
 * @option オリジナル項目(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)
 * @value 5
 * @option ファイル名(1)(2)(3)(4)(5)(8)
 * @value 10
 * @option タイトル(1)(2)(3)(4)(5)(8)(11)
 * @value 11
 * @option 章(1)(2)(3)(4)(5)(8)(11)
 * @value 12
 * @option 行動目標(1)(2)(3)(4)(5)(8)(11)
 * @value 13
 * @option アクター名(1)(2)(3)(4)(5)(8)(12)
 * @value 20
 * @option クラス(1)(2)(3)(4)(5)(8)
 * @value 21
 * @option 二つ名(Nickname)(1)(2)(3)(4)(5)(8)
 * @value 22
 * @option レベル(1)(2)(3)(4)(5)(8)(11)(12)
 * @value 23
 * @option キャラチップ(1)(2)(3)(4)(5)(12)
 * @value 50
 * @option 顔グラ(1)(2)(3)(4)(12)
 * @value 51
 * @option SVアクター(1)(2)(3)(4)(5)(12)
 * @value 52
 * @option スナップショット(1)(2)(3)(4)
 * @value 90
 * @option ライン(1)(2)(3)(4)(5)(7)
 * @value 100
 * @default 0
 * 
 * @param X_Position
 * @text X表示列位置(1)
 * @desc X表示列位置
 * @type number
 * @default 1
 * @min 1
 * @max 3
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
 * @desc Y座標（Y表示列位置からの相対座標）
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
 * @desc システム項目の横幅（0でデフォルト幅）
 * @text システム項目横幅(6)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param SystemNameColor
 * @desc システム項目の文字色。テキストタブでカラーコードを入力できます。
 * @text システム項目文字色(7)
 * @type color
 * @default 16
 * @min 0
 * 
 * @param FontSize
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ(8)
 * @type number
 * @default -6
 * @min -99
 * 
 * @param ParamName
 * @desc 項目の名称を設定します。
 * @text 名称(9)
 * @type string
 * @default
 * 
 * @param DetaEval
 * @desc 評価式。
 * @text 評価式(javaScript)(10)
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
 * @text 文字揃え(11)
 * @type select
 * @option 制御文字使用可(左揃え)
 * @value "TextEx"
 * @option 左
 * @value "left"
 * @option 中央
 * @value "center"
 * @option 右
 * @value "right"
 * @default "left"
 * 
 * @param ShowEval
 * @desc 表示条件をJavascriptで記入します。
 * @text 表示条件(javaScript)(12)
 * @type combo
 * @option '$gameSwitches.value(Number(actor.actor().meta.SaveActorShowSwitch))'
 * @default 
 * 
 */
/*~struct~ContentsBackSettings:ja
 * 
 * @param ContentsBackGroundImg
 * @desc コンテンツ背景画像ファイル名を指定します。
 * @text コンテンツ背景画像
 * @type file
 * @dir img/
 * @default 
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
 * @param Scale
 * @desc コンテンツ背景画像の拡大率(百分率)
 * @text コンテンツ背景画像拡大率(百分率)
 * @type number
 * @min 0
 * @default 100
 * 
 * 
 */

var Imported = Imported || {};
Imported.NUUN_SaveScreen = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_SaveScreen');
  const BackUiWidth = eval(parameters['BackUiWidth'] || 'true');
  const BackFitWidth = eval(parameters['BackFitWidth'] || 'false');
  const ContentsBackVisible = eval(parameters['ContentsBackVisible'] || "false");
  const AutomaticSetting = eval(parameters['AutomaticSetting'] || "true");
  const PartyActorMode = Number(parameters['PartyActorMode'] || 1);
  const FaceWidth = Number(parameters['FaceWidth'] || 144);
  const FaceHeight = Number(parameters['FaceHeight'] || 144);
  const FaceScale = Number(parameters['FaceScale'] || 100);
  const NumSaveCols = Number(parameters['NumSaveCols'] || 1);
  const NumSaveRows = Number(parameters['NumSaveRows'] || 5);
  const AutoSaveEnabledSwitch = Number(parameters['AutoSaveEnabledSwitch'] || 0);
  const MapTransferAutoSave = eval(parameters['MapTransferAutoSave'] || "true");
  const BattleEndAutoSave = eval(parameters['BattleEndAutoSave'] || "true");
  const SaveContentsCols = Number(parameters['SaveContentsCols'] || 2);
  const MaxSave = Number(parameters['MaxSave'] || 20);
  const AnyNameVariable = Number(parameters['AnyNameVariable'] || 0);
  const InfoSaveSnap = eval(parameters['InfoSaveSnap'] || "true");
  const SaveSnapQuality = eval(parameters['SaveSnapQuality'] || 0.92);
  const SaveSnapScale = Number(parameters['SaveSnapScale'] || 15);
  const DayTime = String(parameters['DayTime']);
  const BackGroundImg = String(parameters['BackGroundImg']);
  const ContentsBackGroundImg = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ContentsBackGroundImg'])) : null) || [];
  const ContentsBackSettingsList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ContentsBackSettingsList'])) : null) || [];
  const ContentsList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ContentsList'])) : null) || [];
  const ContentsBackScale = Number(parameters['ContentsBackScale'] || 100);
  const CharacterSpecifyActorOnry = eval(parameters['CharacterSpecifyActorOnry'] || "false");
  const FaceSpecifyActorOnry = eval(parameters['FaceSpecifyActorOnry'] || "false");
  const SvSpecifyActorOnry = eval(parameters['SvSpecifyActorOnry'] || "false");
  const NameSpecifyActorOnry = eval(parameters['NameSpecifyActorOnry'] || "false");
  const ClassSpecifyActorOnry = eval(parameters['ClassSpecifyActorOnry'] || "false");
  const NickNameSpecifyActorOnry = eval(parameters['NickNameSpecifyActorOnry'] || "false");
  const LevelSpecifyActorOnry = eval(parameters['LevelSpecifyActorOnry'] || "false");
  const HelpWindowVisible = eval(parameters['HelpWindowVisible'] || "true");
  const SaveWindowVisible = eval(parameters['SaveWindowVisible'] || "true");

  let saveInfoSnapShot = null;

  const pluginName = "NUUN_SaveScreen";
  PluginManager.registerCommand(pluginName, 'ChangeBackground', args => {
    const data = String(args.BackGroundImg);
    if (data) {
      $gameSystem.setSaveBuckGround(data, Number(args.BackGroundId));
    }
  });

  PluginManager.registerCommand(pluginName, 'ChangeContentsBackground', args => {
    const data = String(args.BackGroundImg);
    if (data) {
      $gameSystem.setSaveContentsBuckGround(data);
    }
  });

  PluginManager.registerCommand(pluginName, 'UserAutoSave', args => {
    SceneManager.snapSaveBitmap(eval(args.OnSaveSnap));
    SceneManager._scene.userRequestAutosave();
  });
  
  PluginManager.registerCommand(pluginName, 'SetAnyName', args => {
    $gameSystem.saveAnyName = args.AnyName;
  });

  PluginManager.registerCommand(pluginName, 'SpecifyActor', args => {
    $gameParty.setSaveFileSpecifyActorOnry(Number(args.ActorId));
  });

  function getSaveContentsBuckgroundImg() {
    return !!$dataMap && $dataMap.meta && $dataMap.meta.SaveContentsBackImg ?  ContentsBackGroundImg[Number($dataMap.meta.SaveContentsBackImg) - 1] : $gameSystem.saveContentsBuckgroundImg;
  };

    function isAutosaveEnabledSwitch() {
        return AutoSaveEnabledSwitch === 0 || !$gameSwitches.value(AutoSaveEnabledSwitch);
    };


  const _DataManager_loadSavefileImages = DataManager.loadSavefileImages;
  DataManager.loadSavefileImages = function(info) {
    _DataManager_loadSavefileImages.call(this, info);
    if (info.svActor && Symbol.iterator in info.svActor) {
      for (const character of info.svActor) {
        ImageManager.loadSvActor(character[0]);
      }
    }
    if (info.snap) {
      ImageManager.loadSaveSnapBitmap(info.snap);
    }
  };

  DataManager.loadSnap = function(info) {
    if ($gameSystem.onSnap) {
      DataManager.urlBitmapData();
      info.snap = this.urlBitmap;
    } else {
      saveInfoSnapShot = null;
      info.snap = null;
    }
  };

  const _DataManager_makeSavefileInfo = DataManager.makeSavefileInfo ;
  DataManager.makeSavefileInfo = function() {
    const info = _DataManager_makeSavefileInfo.call(this);
    this.setPartyData(info);
    info.background = $gameSystem.saveBuckgroundImg;
    info.contentsBuck = getSaveContentsBuckgroundImg();
    info.mapname = !!$dataMap ? $gameMap.displayName() : '';
    info.gold = $gameParty._gold;
    if (Imported.NUUN_Chapter) {
      info.AnyName = $gameSystem.getChapter();
    } else {
      info.AnyName = $gameSystem.saveAnyName ? $gameSystem.saveAnyName : $gameVariables.value(AnyNameVariable);
    }
    if (Imported.NUUN_Destination) {
      info.destinationName = $gameSystem.getDestinationList();
    }
    this.setOrgParams(info);
    this.loadSnap(info);
    return info;
  };

  DataManager.setOrgParams = function(info) {
    ContentsList.forEach((data, index)=> {
      if (data.DateSelect === 5 && data.DetaEval) {
        info["orgParam_"+ String(index)] = eval(data.DetaEval);
      }
    });
  };

    DataManager.setPartyData = function(info, data) {
        const actorId = $gameParty.getSaveFileSpecifyActorOnry();
        const actor = actorId > 0 ? $gameActors.actor(actorId) : $gameParty.leader();
        if (CharacterSpecifyActorOnry) {
            info.characters = [actor.characterName(), actor.characterIndex()];
        }
        if (FaceSpecifyActorOnry) {
            info.faces = [actor.faceName(), actor.faceIndex()];
        }
        info.svActor = SvSpecifyActorOnry ? [actor.battlerName()] : $gameParty.svActorForSavefile();
        info.actorName = NameSpecifyActorOnry ? [actor.name()] : $gameParty.actorNameForSavefile();
        info.actorClass = ClassSpecifyActorOnry ? [actor.currentClass().name] : $gameParty.actorClassForSavefile();
        info.actorNickName = NickNameSpecifyActorOnry ? [actor.nickname()] : $gameParty.actorNickNameForSavefile();
        info.levelActor = LevelSpecifyActorOnry ? [actor._level] : $gameParty.actorLevelForSavefile();
        this.setPartyCondData(info);
    };

    DataManager.setPartyCondData = function(info) {
        ContentsList.forEach((data, index)=> {
            if (data.DateSelect === 50 && !!data.ShowEval) {
                info["characters_"+ String(index)] = $gameParty.charactersFilterForSavefile(data);
            } else if (data.DateSelect === 51 && !!data.ShowEval) {
                info["faces_"+ String(index)] = $gameParty.actorFacesFilterForSavefile(data);
            } else if (data.DateSelect === 52 && !!data.ShowEval) {
                info["svActor_"+ String(index)] = $gameParty.svActorFilterForSavefile(data);
            } else if (data.DateSelect === 20 && !!data.ShowEval) {
                info["actorName_"+ String(index)] = $gameParty.actorNameFilterForSavefile(data);
            } else if (data.DateSelect === 23 && !!data.ShowEval) {
                info["levelActor_"+ String(index)] = $gameParty.actorLevelFilterForSavefile(data);
            }
        });
    };

  DataManager.loadBackground = function() {
    const globalInfo = this._globalInfo;
    const validInfo = globalInfo.slice(1).filter(x => x);
    const id = Math.max(...validInfo.map(x => this.backgroundId(x)));
    const index = globalInfo.findIndex(x => x && this.backgroundId(x) === id);
    return globalInfo[index].background ? globalInfo[index].background[0] : null;
  };

  DataManager.backgroundId = function(x) {
    return x.background ? x.background[1] : 0;
  };

  DataManager.snapBitmap = function() {
    return SceneManager.getSnapBitmap();
  };

  DataManager.urlBitmapData = function() {
    this.urlBitmap = this.toDataURL();
  };

  DataManager.toDataURL = function() {
    const png = this.svaeSnapBitmap()._canvas.toDataURL('image/png', SaveSnapQuality);
    const jpeg = this.svaeSnapBitmap()._canvas.toDataURL('image/jpeg', SaveSnapQuality);
    return (png.length < jpeg.length) ? png : jpeg;
  };

  DataManager.svaeSnapBitmap = function(){
    const bitmap = this.snapBitmap();
    if (bitmap) {
      const width = bitmap.width * SaveSnapScale / 100;
      const height = bitmap.height * SaveSnapScale / 100;
      const snapBitmap = new Bitmap(width, height);
      snapBitmap.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, snapBitmap.width, snapBitmap.height);
      return snapBitmap;
    }
    return null;
  };

  SceneManager.snapSaveBitmap = function(mode) {
    $gameSystem.onSnap = mode;
    if (mode) {
      if (this._snapBitmap) {
        this._snapBitmap.destroy();
      }
      this._snapBitmap = this.snap();
      SceneManager.snapAutoSave();
    }
  };

  SceneManager.snapAutoSave = function() {
    this._snapAutoSave = true;
  };

  SceneManager.getSnapBitmap = function() {
    return this._snapBitmap;
  };

  SceneManager.snapSaveBackground = function() {
    $gameSystem.onSnap = InfoSaveSnap;
    if (InfoSaveSnap) {
      if (this._snapAutoSave) {
        this._snapAutoSave = false;
        return;
      }
      if (this._snapBitmap) {
        this._snapBitmap.destroy();
      }
      this._snapBitmap = this._backgroundBitmap;
    }
  };

  const _SceneManager_push = SceneManager.push;
  SceneManager.push = function(sceneClass) {
    if (sceneClass.name === 'Scene_Battle') {
      if (Scene_Base.prototype.isAutosaveEnabled.call() && BattleEndAutoSave && isAutosaveEnabledSwitch()) {
        SceneManager.snapSaveBitmap(true);
      }
    }
    _SceneManager_push.call(this, sceneClass);
  };

  const _SceneManager_snapForBackground = SceneManager.snapForBackground;
  SceneManager.snapForBackground = function() {
    _SceneManager_snapForBackground.call(this);
    this.snapSaveBackground();
  };

  ImageManager.loadSaveSnapBitmap = function(url) {
    const has = Utils.hasEncryptedImages();
    let bitmap = null;
    if (has) {
      Utils._hasEncryptedImages = false;
      bitmap = ImageManager.loadBitmapFromUrl(url);
      Utils._hasEncryptedImages = true;
    } else {
      bitmap = ImageManager.loadBitmapFromUrl(url);
    }
    return bitmap;
  };

  const _DataManager_maxSavefiles = DataManager.maxSavefiles;
  DataManager.maxSavefiles = function() {
    return MaxSave ? MaxSave : _DataManager_maxSavefiles.call(this);
  };
  

  const _Scene_Base_requestAutosave = Scene_Base.prototype.requestAutosave;
  Scene_Base.prototype.requestAutosave = function() {
    _Scene_Base_requestAutosave.call(this);
  };

    Scene_Base.prototype.userRequestAutosave = function() {
        if (this.isUserAutosaveEnabled()) {
            this.executeAutosave();
        }
    };

    Scene_Base.prototype.isUserAutosaveEnabled = function() {
        return (
            !DataManager.isBattleTest() &&
            !DataManager.isEventTest() &&
            $gameSystem.isAutosaveEnabled()
        );
    };

    const _Scene_Map_updateTransferPlayer = Scene_Map.prototype.updateTransferPlayer;
    Scene_Map.prototype.updateTransferPlayer = function() {
        if ($gamePlayer.isTransferring()) {
            if (this.isAutosaveEnabled() && MapTransferAutoSave && isAutosaveEnabledSwitch()) {
                SceneManager.snapSaveBitmap(true);
            }
        }
        _Scene_Map_updateTransferPlayer.call(this);
    };

    const _Scene_Map_shouldAutosave = Scene_Map.prototype.shouldAutosave;
    Scene_Map.prototype.shouldAutosave = function() {
        return _Scene_Map_shouldAutosave.apply(this, arguments) && MapTransferAutoSave && isAutosaveEnabledSwitch();
    };

    const _Scene_Battle_shouldAutosave = Scene_Battle.prototype.shouldAutosave;
    Scene_Battle.prototype.shouldAutosave = function() {
        return _Scene_Battle_shouldAutosave.apply(this, arguments) && BattleEndAutoSave && isAutosaveEnabledSwitch();
    };
  

  const _Scene_File_create = Scene_File.prototype.create;
  Scene_File.prototype.create = function() {
    this.createBackground();
    _Scene_File_create.call(this);
  };

  const _Scene_File_createListWindow = Scene_File.prototype.createListWindow;
  Scene_File.prototype.createListWindow = function() {
    _Scene_File_createListWindow.call(this);
    if (!SaveWindowVisible) {
      this._listWindow.opacity = 0;
    }
  };

  const _Scene_File_createHelpWindow = Scene_File.prototype.createHelpWindow;
  Scene_File.prototype.createHelpWindow = function() {
    _Scene_File_createHelpWindow.call(this);
    if (!HelpWindowVisible) {
      this._helpWindow.opacity = 0;
    }
  };

  Scene_File.prototype.createBackground = function() {
    Scene_MenuBase.prototype.createBackground.call(this);
    if (BackGroundImg) {
      let data = null;
      if (this._mode === 'save') {
        data = $gameSystem.getSaveBuckGround();
      } else {
        data = DataManager.loadBackground() || BackGroundImg;
      }
      if (data) {
        const sprite = new Sprite();
        sprite.bitmap = ImageManager.nuun_LoadPictures(data);
        if (data) {
          this.addChild(sprite);
          if (sprite.bitmap && !sprite.bitmap.isReady()) {
            sprite.bitmap.addLoadListener(this.setBackGround.bind(this, sprite));
          } else {
            this.setBackGround(sprite);
          }
        }
      }
    }
  };

  Scene_File.prototype.setBackGround = function(sprite) {
    if (BackUiWidth) {
      sprite.x = (Graphics.width - Graphics.boxWidth) / 2 - 4;
      sprite.y = (Graphics.height - Graphics.boxHeight) / 2 - 4;
    } else {
      sprite.x = 0;
      sprite.y = 0;
    }
    if (BackFitWidth) {
      if(BackUiWidth) {
        sprite.scale.x = (Graphics.boxWidth + 8 !== sprite.bitmap.width ? (Graphics.boxWidth + 8) / sprite.bitmap.width : 1);
        sprite.scale.y = (Graphics.boxHeight + 8 !== sprite.bitmap.height ? (Graphics.boxHeight + 8) / sprite.bitmap.height : 1);
      } else {
        sprite.scale.x = (Graphics.width !== sprite.bitmap.width ? Graphics.width / sprite.bitmap.width : 1);
        sprite.scale.y = (Graphics.height !== sprite.bitmap.height ? Graphics.height / sprite.bitmap.height : 1);
      }
    }
  };

  const _Window_SavefileList_initialize = Window_SavefileList.prototype.initialize;
  Window_SavefileList.prototype.initialize = function(rect) {
    _Window_SavefileList_initialize.call(this, rect);
    this._contentsBackVisible = ContentsBackVisible;
  };

  Window_SavefileList.prototype.maxCols = function() {
    return NumSaveCols;
  };

  Window_SavefileList.prototype.maxContentsCols = function() {
    return SaveContentsCols;
  };

  Window_SavefileList.prototype.maxItems = function() {
    return DataManager.maxSavefiles();
  };

  Window_SavefileList.prototype.lineHeight = function() {
    return 30;
  };

Window_SavefileList.prototype.selectSavefile = function(savefileId) {//再定義
    const index = Math.max(0, this.savefileIdToIndex(savefileId));
    this.select(index);
    this.setTopRow(Math.floor(index / this.maxCols()) - 2);
};

  const _Window_SavefileList_numVisibleRows = Window_SavefileList.prototype.numVisibleRows;
  Window_SavefileList.prototype.numVisibleRows = function() {
    return NumSaveRows ? NumSaveRows : _Window_SavefileList_numVisibleRows.call(this);
  };

  const _Window_SavefileList_drawItemBackground = Window_SavefileList.prototype.drawItemBackground;
  Window_SavefileList.prototype.drawItemBackground = function(index) {
    const savefileId = this.indexToSavefileId(index);
    const info = DataManager.savefileInfo(savefileId);
    const buckgroundImg = info && !!info.contentsBuck ? info.contentsBuck : null;
    if (buckgroundImg) {
      const bitmap = ImageManager.nuun_LoadPictures(buckgroundImg);
      if (bitmap && !bitmap.isReady()) {
        bitmap.addLoadListener(this.drawContentsBack.bind(this, bitmap, index, buckgroundImg));
      } else {
        this.drawContentsBack(bitmap, index, buckgroundImg);
      }
    } else {
      _Window_SavefileList_drawItemBackground.call(this, index);
    }
  };

    Window_SavefileList.prototype.drawContentsBack = function(bitmap, index , buckgroundImg) {
        const data = ContentsBackSettingsList.find(imgData => buckgroundImg === imgData.ContentsBackGroundImg);
        let sx = 0;
        let sy = 0;
        let scale = ContentsBackScale;
        if (data) {
        sx = data.Img_SX;
        sy = data.Img_SY;
        scale = data.Scale;
        }
        const rect = this.itemRect(index);
        try {
        this.contentsBack.nuun_contentsBackBlt(bitmap, sx, sy, rect.width, rect.height, rect.x + 1, rect.y + 1, rect.width - 2, rect.height - 2, scale, true);
        } catch (e) {
        const log = $gameSystem.isJapanese() ? 'NUUN_BaseがVer.1.6.2以降ではありません。' : "'NUUN_Base' is not Ver.1.6.2 or later.";
        throw ["LoadError", log];
        }
    };

    Window_SavefileList.prototype.drawItem = function(index) {
        const savefileId = this.indexToSavefileId(index);
        const info = DataManager.savefileInfo(savefileId);
        const rect = this.itemRectWithPadding(index);
        this.resetTextColor();
        this.changePaintOpacity(this.isEnabled(savefileId));
        this.drawContents(info, rect, savefileId);
    };

  Window_SavefileList.prototype.drawContents = function(info, rect, savefileId) {
    const lineHeight = this.lineHeight();
    const colSpacing = this.colSpacing();
    const itemWidth = this.itemContentsWidth(rect.width);
    ContentsList.forEach((data, r) => {
      this.resetFontSettings();
      const x_Position = data.X_Position;
      const y_Position = data.Y_Position;
      const position = Math.min(x_Position, this.maxContentsCols());
      const x = (data.X_Coordinate || 0) + (itemWidth + colSpacing) * (position - 1);
      const y = (y_Position - 1) * lineHeight + rect.y + (data.Y_Coordinate || 0);
      const width = Math.min(data.ItemWidth && data.ItemWidth > 0 ? Math.min(data.ItemWidth, itemWidth) : this.widthMode(data, itemWidth), rect.width - x);
      if (info) {
        this.drawContentsBase(info, x + rect.x , y, width, data, savefileId, r);
      } else {
        this.drawContentsNotData(info, x + rect.x, y, width, data, savefileId, r);
      }
    });
  };

  Window_SavefileList.prototype.widthMode = function(mode, width) {
    if (mode) {
      width = width * 2 + this.colSpacing();
    }
    return width;
  };

  Window_SavefileList.prototype.itemContentsWidth = function(width) {
    return Math.floor(width / this.maxContentsCols()) - this.colSpacing();
  };

  Window_SavefileList.prototype.drawContentsBase = function(info, x, y, width, data, savefileId, r) {
    switch (data.DateSelect) {
      case 0:
        break;
      case 1:
        this.drawPlaytime(info, x, y, width, data);
        break;
      case 2:
        this.drawDayTime(info, x, y, width, data);
        break;
      case 3:
        this.drawMapName(info, x, y, width, data);
        break;
      case 4:
        this.drawGold(info, x, y, width, data);
        break;
      case 5:
        this.drawOriginal(info, x, y, width, data, r);
        break;
      case 10:
        this.drawTitle(savefileId, x, y, width, info, data);
        break;
      case 11:
        this.drawTitleName(info, x, y, width, data);
        break;
      case 12:
        this.drawAnyName(info, x, y, width, data);
        break;
      case 13:
        this.drawDestination(info, x, y, width, data);
        break;
      case 20:
        this.drawActorName(info, x, y, width, data, r);
        break;
      case 21:
        this.drawActorClass(info, x, y, width, data);
        break;
      case 22:
        this.drawActorNickName(info, x, y, width, data);
        break;
      case 23:
        this.drawActorLeval(info, x, y, width, data, r);
        break;
      case 50:
        this.drawCharacters(info, x, y, width, data, r);
        break;
      case 51:
        this.drawFaceActors(info, x, y, width, data, r);
        break;
      case 52:
        this.drawSvActors(info, x, y, width, data, r);
        break;
      case 90:
        this.drawSnapBitmap(info, x, y, width, data);
        break;
      case 100:
        this.horzLine(x, y, width, data);
        break;
    }
  };

    Window_SavefileList.prototype.horzLine = function(x, y, width, data) {
        const lineY = y + this.lineHeight() / 2 - 1;
        this.contents.paintOpacity = 48;
        this.contents.fillRect(x, lineY, width, 2, NuunManager.getColorCode(data.SystemNameColor));
        this.contents.paintOpacity = 255;
    };

  Window_SavefileList.prototype.drawContentsNotData = function(info, x, y, width, data, savefileId, r) {
    switch (data.DateSelect) {
      case 10:
        this.drawTitle(savefileId, x, y, width, info, data);
        break;
      case 14:
        this.drawNotFileText(info, x, y, width, data, savefileId);
        break;
    }
  };

  Window_SavefileList.prototype.drawNotFileText = function(info, x, y, width, data, savefileId) {
    if (savefileId <= 0) {
      this.drawTextEx(info.AnyName, x, y, width);
    }
  };

  Window_SavefileList.prototype.drawPlaytime = function(info, x, y, width, data) {
    const systemWidth = data.ParamName ? (data.SystemItemWidth || 100) : 0;
    const padding = data.ParamName ? this.itemPadding() : 0;
    this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
    this.drawSystemText(x, y , systemWidth, data);
    if (info.playtime) {
      this.drawText(info.playtime, x + systemWidth + padding, y, width - (systemWidth + padding), data.Align);
    }
  };

  Window_SavefileList.prototype.drawDayTime = function(info, x, y, width, data) {
    const systemWidth = data.ParamName ? (data.SystemItemWidth || 100) : 0;
    const padding = data.ParamName ? this.itemPadding() : 0;
    this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
    this.drawSystemText(x, y , systemWidth, data);
    if (info.timestamp) {
      const _dayTime = new Date(info.timestamp);
      const format = _dayTime.toLocaleString(eval(DayTime));
      this.drawText(format, x + systemWidth + padding, y, width - (systemWidth + padding), data.Align);
    }
  };

  Window_SavefileList.prototype.drawMapName = function(info, x, y, width, data) {
    const systemWidth = data.ParamName ? (data.SystemItemWidth || 100) : 0;
    const padding = data.ParamName ? this.itemPadding() : 0;
    this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
    this.drawSystemText(x, y , systemWidth, data);
    if (info.mapname) {
      this.drawText(info.mapname, x + systemWidth + padding, y, width - (systemWidth + padding), data.Align);
    }
  };

  Window_SavefileList.prototype.drawGold = function(info, x, y, width, data) {
    const systemWidth = data.ParamName ? (data.SystemItemWidth || 100) : 0;
    const padding = data.ParamName ? this.itemPadding() : 0;
    this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
    this.drawSystemText(x, y , systemWidth, data);
    if (info.gold !== undefined) {
      const unit = TextManager.currencyUnit;
      this.drawCurrencyValue(info.gold, unit, x, y, width)
    }
  };

  Window_SavefileList.prototype.drawOriginal = function(info, x, y, width, data, index) {
    const systemWidth = data.ParamName ? (data.SystemItemWidth || 100) : 0;
    const padding = data.ParamName ? this.itemPadding() : 0;
    this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
    this.drawSystemText(x, y , systemWidth, data);
    const text = info["orgParam_"+ String(index)];
    if (text !== undefined) {
      this.drawText(text, x + systemWidth + padding, y, width - (systemWidth + padding), data.Align);
    }
  };

  const _Window_SavefileList_drawTitle = Window_SavefileList.prototype.drawTitle;
  Window_SavefileList.prototype.drawTitle = function(savefileId, x, y, width, info, data) {
    this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
    _Window_SavefileList_drawTitle.apply(this, arguments);
  };

  Window_SavefileList.prototype.drawTitleName = function(info, x, y, width, data) {
    this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
    this.drawText(info.title, x, y, width);
  };

  Window_SavefileList.prototype.drawAnyName = function(info, x, y, width, data) {
    if (info.AnyName) {
      this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
      this.resetTextColor();
      if (data.Align === 'TextEx') {
        this.drawTextEx(info.AnyName, x, y, width);
      } else {
        this.drawText(info.AnyName , x, y, width, data.Align);
      }
    }
  };

  Window_SavefileList.prototype.drawDestination = function(info, x, y, width, data) {
    if (info.destinationName) {
      this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
      this.resetTextColor();
      if (data.Align === 'TextEx') {
        this.drawTextEx(info.destinationName, x, y, width);
      } else {
        this.drawText(info.destinationName , x, y, width, data.Align);
      }
    }
  };

    Window_SavefileList.prototype.drawCharacters = function(info, x, y, width, data, index) {
        const rect = this.itemRectWithPadding(0);
        const bottom = y + rect.height;
        if (!!data.ShowEval) {
            this.drawPartyFilterCharacters(info, x + 24, bottom - 8, index);
        } else if (CharacterSpecifyActorOnry) {
            this.drawSpecifyActorOnryCharacter(info, x + 24, bottom - 8);
        } else {
            this.drawPartyCharacters(info, x + 24, bottom - 8);
        }
    };

    Window_SavefileList.prototype.drawFaceActors = function(info, x, y, width, data, index) {
        const rect = this.itemRect(0);
        const colSpacing = this.colSpacing();
        width += colSpacing / 2;
        const height = Math.min(FaceHeight, rect.height) - 4;
        const height2 = height * (height / (height * FaceScale / 100));
        let faceX = x;
        if (!!data.ShowEval) {
            const _info = info["faces_"+ String(index)] || [];
            for (const data of _info) {
                this.drawFace(data[0], data[1], faceX, y + 2, FaceWidth, height2);
                faceX += FaceWidth * FaceScale / 100;
            }
        } else if (info.faces) {
            if (FaceSpecifyActorOnry) {
                const data = _info[0];
                this.drawFace(data[0], data[1], x, y + 2, FaceWidth, height2);
            } else {
                for (const data of info.faces) {
                    this.drawFace(data[0], data[1], faceX, y + 2, FaceWidth, height2);
                    faceX += FaceWidth * FaceScale / 100;
                }
            }
        }
    };    

    Window_SavefileList.prototype.drawFace = function(faceName, faceIndex, x, y, width, height) {
        const rect = this.itemRectWithPadding(0);
        const scale = FaceScale / 100;
        const scale2 = 100 / (100 * scale);
        width = width || ImageManager.faceWidth;
        height = Math.min((height || ImageManager.faceHeight), (rect.height - 2) * scale2);
        const bitmap = ImageManager.loadFace(faceName);
        const pw = ImageManager.faceWidth;
        const ph = ImageManager.faceHeight;
        const sw = Math.min(width, pw);
        const sh = Math.min(height, ph);
        const dx = Math.floor(x + Math.max(width - pw, 0) / 2);
        const dy = Math.floor(y + Math.max(height - ph, 0) / 2);
        const sx = Math.floor((faceIndex % 4) * pw + (pw - sw) / 2);
        const sy = Math.floor(Math.floor(faceIndex / 4) * ph + (ph - sh) / 2);
        const dw = Math.floor(sw * scale);
        const dh = Math.floor(sh * scale);
        this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
    };

    Window_SavefileList.prototype.drawSvActors = function(info, x, y, width, data, index) {
        const colSpacing = this.colSpacing();
        width += colSpacing / 2;
        let svX = x;
        if (!!data.ShowEval) {
            const _info = info["svActor_"+ String(index)] || [];
            for (const data of _info) {
                this.drawSvActor(data[0], svX, y);
                svX += (data.ItemWidth || 48);
            }
        } else if (info.svActor) {
            if (SvSpecifyActorOnry) {
                const data = _info[0];
                this.drawSvActor(data, x, y);
            } else {
                for (const data of info.svActor) {
                    this.drawSvActor(data[0], svX, y);
                    svX += (data.ItemWidth || 48);
                }
            }
        }
    };

  Window_SavefileList.prototype.drawSvActor = function(data, x, y) {
    if (data) {
      const motionIndex = 0;
      const bitmap = ImageManager.loadSvActor(data);
      const pw = Math.floor(bitmap.width / 9);
      const ph = Math.floor(bitmap.height / 6);
      const sx = Math.floor(motionIndex / 6) * 3;
      const sy = motionIndex % 6;
      this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
    }
  };

  Window_SavefileList.prototype.drawActorName = function(info, x, y, width, data, index) {
    const colSpacing = this.colSpacing();
    const padding = this.itemPadding();
    width += colSpacing / 2;
    this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
    this.resetTextColor();
    let nameX = x;
    if (!!data.ShowEval) {
        const width2 = (data.ItemWidth || 48);
        const actorName = (info["actorName_"+ String(index)] || []);
        for (const name of actorName) {
            this.drawText(name , nameX, y, width2 - padding, data.Align);
            nameX += width2;
        }
    } else if (info.actorName) {
        if (NameSpecifyActorOnry) {
            const name = info.actorName[0];
            this.drawText(name , x, y, width, data.Align);
        } else {
            const width2 = (data.ItemWidth || 48);
            for (const name of info.actorName) {
                this.drawText(name , nameX, y, width2 - padding, data.Align);
                nameX += width2;
            }
        }
    }
  };

  Window_SavefileList.prototype.drawActorClass = function(info, x, y, width, data) {
    if (info.actorClass) {
      const colSpacing = this.colSpacing();
      const padding = this.itemPadding();
      width += colSpacing / 2;
      this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
      this.resetTextColor();
      if (ClassSpecifyActorOnry) {
        const name = info.actorClass[0];
        this.drawText(name , x, y, width, data.Align);
      } else {
        let nameX = x;
        const width2 = (data.ItemWidth || 48);
        for (const name of info.actorClass) {
          this.drawText(name , nameX, y, width2 - padding, data.Align);
          nameX += width2;
        }
      }
    }
  };

  Window_SavefileList.prototype.drawActorNickName = function(info, x, y, width, data) {
    if (info.actorNickName) {
      const colSpacing = this.colSpacing();
      const padding = this.itemPadding();
      width += colSpacing / 2;
      this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
      this.resetTextColor();
      if (NickNameSpecifyActorOnry) {
        const name = info.actorNickName[0];
        this.drawText(name , x, y, width, data.Align);
      } else {
        let nameX = x;
        const width2 = (data.ItemWidth || 48);
        for (const name of info.actorNickName) {
          this.drawText(name , nameX, y, width2 - padding, data.Align);
          nameX += width2;
        }
      }
    }
  };

    Window_SavefileList.prototype.drawActorLeval = function(info, x, y, width, data, index) {
        this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
        const textWidth = this.textWidth(TextManager.levelA);
        const padding = this.itemPadding();
        const colSpacing = this.colSpacing();
        let levelActorX = x;
        if (!!data.ShowEval) {
            const levelActor = (info["levelActor_"+ String(index)] || []);
            const width2 = (data.ItemWidth || 48);
            for (const level of levelActor) {
                this.changeTextColor(NuunManager.getColorCode(data.SystemNameColor));
                this.drawText(TextManager.levelA, levelActorX + padding / 4, y, textWidth);
                this.resetTextColor();
                this.drawText(level, levelActorX + textWidth + padding / 2, y, width2 - (textWidth + padding), data.Align);
                levelActorX += width2;
            }
        } else if (info.levelActor) {
            if (LevelSpecifyActorOnry) {
                const level = info.levelActor[0];
                this.changeTextColor(NuunManager.getColorCode(data.SystemNameColor));
                this.drawText(TextManager.levelA, x, y, textWidth);
                this.resetTextColor();
                this.drawText(level, x + textWidth + padding, y, width - (textWidth + padding), data.Align);
            } else {
                const width2 = (data.ItemWidth || 48);
                for (const level of info.levelActor) {
                    this.changeTextColor(NuunManager.getColorCode(data.SystemNameColor));
                    this.drawText(TextManager.levelA, levelActorX + padding / 4, y, textWidth);
                    this.resetTextColor();
                    this.drawText(level, levelActorX + textWidth + padding / 2, y, width2 - (textWidth + padding), data.Align);
                    levelActorX += width2;
                }
            }
        }
    };

    Window_SavefileList.prototype.drawPartyFilterCharacters = function(info, x, y, index) {
        const characters = info["characters_"+ String(index)];
        if (characters) {
            let characterX = x;
            for (const data of characters) {
                this.drawCharacter(data[0], data[1], characterX, y);
                characterX += 48;
            }
        }
    };

    Window_SavefileList.prototype.drawSpecifyActorOnryCharacter = function(info, x, y) {
        if (info.characters) {
        const data = info.characters[0];
        this.drawCharacter(data[0], data[1], x, y);
        }
    };

  Window_SavefileList.prototype.drawSnapBitmap = function(info, x, y, width, data) {
    if (info.snap) {
      const bitmap = ImageManager.loadSaveSnapBitmap(info.snap);
      this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y);
    }
  };

  Window_SavefileList.prototype.drawSystemText = function(x, y, width, data) {
    if (data.ParamName) {
      this.changeTextColor(NuunManager.getColorCode(data.SystemNameColor));
      this.drawText(data.ParamName || '', x, y, width);
      this.resetTextColor();
    }
  };

  Window_SavefileList.prototype.systemWidth = function(swidth, width) {
    return swidth > 0 ? swidth : Math.floor(width / 2);
  };

  const _Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    _Game_System_initialize.call(this);
    this.saveBuckgroundImg = [BackGroundImg, 0];
    this.saveContentsBuckgroundImg = ContentsBackGroundImg[0];
    this.onSnap = false;
  };

  Game_System.prototype.setSaveBuckGround = function(img, id) {
    const buckgroundId = AutomaticSetting ? (this.buckgroundId || 0) + 1 : id;
    this.saveBuckgroundImg = [img, buckgroundId];
  };

  Game_System.prototype.getSaveBuckGround = function() {
    this.saveBuckgroundImg = this.saveBuckgroundImg && !!this.saveBuckgroundImg[0] ? this.saveBuckgroundImg : [BackGroundImg, 0];
    return this.saveBuckgroundImg[0];
  };

  Game_System.prototype.getSaveBuckGroundId = function() {
    return this.saveBuckgroundImg[1] || 0;
  };

  Game_System.prototype.setSaveContentsBuckGround = function(img) {
    this.saveContentsBuckgroundImg = img ? img : ContentsBackGroundImg[0];
  };

  const _Game_Party_initialize = Game_Party.prototype.initialize;
  Game_Party.prototype.initialize = function() {
    _Game_Party_initialize.call(this);
    this._saveFileSpecifyActorOnry = 0;
  };

  Game_Party.prototype.setSaveFileSpecifyActorOnry = function(id) {
    this._saveFileSpecifyActorOnry = id;
  };

  Game_Party.prototype.getSaveFileSpecifyActorOnry = function() {
    return this._saveFileSpecifyActorOnry;
  };

  const _Game_Party_charactersForSavefile = Game_Party.prototype.charactersForSavefile;
  Game_Party.prototype.charactersForSavefile = function() {
    if (PartyActorMode === 1) {
      return _Game_Party_charactersForSavefile.call(this);
    } else if (PartyActorMode === 2) {
      return this.members().map(actor => [
        actor.characterName(),
        actor.characterIndex()
      ]);
    }
  };

  const _Game_Party_facesForSavefile = Game_Party.prototype.facesForSavefile;
  Game_Party.prototype.facesForSavefile = function() {
    if (PartyActorMode === 1) {
      return _Game_Party_facesForSavefile.call(this);
    } else if (PartyActorMode === 2) {
      return this.members().map(actor => [
        actor.faceName(),
        actor.faceIndex()
      ]);
    }
  };

  Game_Party.prototype.actorLevelForSavefile = function() {
    if (PartyActorMode === 1) {
      return this.battleMembers().map(actor => actor._level);
    } else if (PartyActorMode === 2) {
      return this.members().map(actor => actor._level);
    }
  };

  Game_Party.prototype.actorNameForSavefile = function() {
    if (PartyActorMode === 1) {
      return this.battleMembers().map(actor => actor.name());
    } else if (PartyActorMode === 2) {
      return this.members().map(actor => actor.name());
    }
  };

  Game_Party.prototype.svActorForSavefile = function() {
    if (PartyActorMode === 1) {
      return this.battleMembers().map(actor => [actor.battlerName()]);
    } else if (PartyActorMode === 2) {
      return this.members().map(actor => [actor.battlerName()]);
    }
  };

  Game_Party.prototype.actorClassForSavefile = function() {
    if (PartyActorMode === 1) {
      return this.battleMembers().map(actor => actor.currentClass().name);
    } else if (PartyActorMode === 2) {
      return this.members().map(actor => actor.currentClass().name);
    }
  };

  Game_Party.prototype.actorNickNameForSavefile = function() {
    if (PartyActorMode === 1) {
      return this.battleMembers().map(actor => actor.nickname());
    } else if (PartyActorMode === 2) {
      return this.members().map(actor => actor.nickname());
    }
  };


    Game_Party.prototype.charactersFilterForSavefile = function(data) {
        return this.allMembers().filter(actor => eval(data.ShowEval)).map(actor => [
            actor.characterName(),
            actor.characterIndex()
        ]);
    };

    Game_Party.prototype.actorFacesFilterForSavefile = function(data) {
        return this.allMembers().filter(actor => eval(data.ShowEval)).map(actor => [
            actor.faceName(),
            actor.faceIndex()
        ]);
    };
    
    Game_Party.prototype.svActorFilterForSavefile = function(data) {
        return this.allMembers().filter(actor => eval(data.ShowEval)).map(actor => [actor.battlerName()]);
    };

    Game_Party.prototype.actorLevelFilterForSavefile = function(data) {
        return this.allMembers().filter(actor => eval(data.ShowEval)).map(actor => actor._level);
    };
    
    Game_Party.prototype.actorNameFilterForSavefile = function(data) {
        return this.allMembers().filter(actor => eval(data.ShowEval)).map(actor => actor.name());
    };

})();