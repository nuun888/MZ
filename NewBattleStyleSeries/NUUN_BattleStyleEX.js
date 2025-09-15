/*:-----------------------------------------------------------------------------------
 * NUUN_BattleStyleEX.js
 * 
 * Copyright (C) 2024 NUUN
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Battle Style EX
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_MenuParamListBase
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_ActorPicture
 * @version 1.0.21
 * 
 * @help
 * You can change and customize the battle layout.
 * 
 * This plugin also implements the following features:
 * Battle window customization.
 * Actor animation in the front view.
 * Display actor state animation in the front view.
 * Conditional actor image switching.
 * Status parameter customization.
 * Specify background images for each window.
 * Command window customization.
 * 
 * Face graphics and actor image settings
 * You can switch face graphics or standing images under certain conditions in the actor image settings. Standing images and face graphics display EX is also supported, but please turn on the plugin parameter "Apply NUUN_ActorPicture".
 * Conditions are applied in order of priority, with matching conditions applied from top to bottom. Set the image that is normally applied at the bottom.
 * 
 * Display status settings
 * The Display Status Settings allow you to set your own statuses to be displayed in the Actor Status.
 * Set only the items you want to display.
 * If even one item is set in the Display Status Settings, this setting will be applied.
 * 
 * 
 * Unique parameters, Unique parameters (dynamic)
 * Enter the expression to be displayed in JavaScript in evaluation expression or string A.
 * actor:$gameActors
 * actor.actor():$dataActors
 * this._battler:$gameActors
 * this._battler.actor():$dataActors
 * 
 * Original gauge
 * Enter the current value in evaluation formula or string A using JavaScript.
 * Enter the maximum value in evaluation formula or string B using JavaScript.
 * actor:$gameActors
 * actor.actor():$dataActors
 * this._battler:$gameActors
 * this._battler.actor():$dataActors
 * 
 * State,State2
 * Enter the state ID to be displayed in evaluation expression or string A.
 * Enter the buff ID to be displayed in evaluation formula or string B.
 * Buff ID
 * 0: HP increase 1: MP increase 2: Attack increase 3: Defense increase 4: Magic increase 5: Magic defense increase 6: Agility increase 7: Luck increase
 * 10: HP decrease 11: MP decrease 12: Attack decrease 13: Defense decrease 14: Magic decrease 15: Magic defense decrease 16: Agility decrease 17: Luck decrease
 * 
 * Image
 * Enter the display condition in JavaScript in Evaluation expression or String A. It will be displayed when the condition is met.
 * If left blank, it will always be displayed.
 * actor:$gameActors
 * actor.actor():$dataActors
 * this._battler:$gameActors
 * this._battler.actor():$gameActors
 * 
 * Enemy Notes
 * <AttackAnimation:[id]>
 * [id]:Animation ID
 * When an enemy character performs a normal attack, the animation with the [id] number will be played. If not specified, the default value of the plugin parameters will be applied.
 * 
 * Setting the display position of each actor's status
 * The order of the list settings will be the order of the actors displayed in the actor status window (combat characters are number 1).
 * Set the display settings for combat members to list ID number 1. Set the second to number 2. (Cannot be set by actor)
 * 
 * This plugin does not require a conflict-fixing plugin for "MPP_Pseudo3DBattle".
 * 
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
 * 7/26/2025 Ver.1.0.21
 * Fixed an issue where actor images would not change under certain conditions when performing consecutive actions.
 * Fixed so that display range can be specified for face graphics.
 * 7/12/2025 Ver.1.0.20
 * Fixed an issue where reverse animations were not working.
 * 6/21/2025 Ver.1.0.19
 * Added a setting to display actor images when incapacitated.
 * 2/11/2025 Ver.1.0.18
 * Fixed spelling mistakes.
 * 2/1/2025 Ver.1.0.17
 * Fixed an issue where the Actor Commands item would not display when scrolling.
 * 12/21/2024 Ver.1.0.16
 * Fixed an issue that caused an error when selecting an ally target.
 * 12/21/2024 Ver.1.0.15
 * Added levels to actor image conditions.
 * Fixed an issue where the display status of actor-specific settings was not being applied.
 * 12/1/2024 Ver.1.0.14
 * Fixed an issue where animations would not play correctly when played in front view with some plug-ins.
 * 11/12/2024 Ver.1.0.13
 * Some processing has been corrected.
 * 11/9/2024 Ver.1.0.12
 * Fixed an issue where debuffs were not displayed on state icons that had display buffs set.
 * 11/4/2024 Ver.1.0.11
 * Fixed an issue where actor commands would not appear above the Actor Status window when specified to be located above the Actor Status window.
 * 10/13/2024 Ver.1.0.10
 * Fixed an issue where party commands would not appear and the game would freeze after canceling enemy targeting.
 * 10/8/2024 Ver.1.0.9
 * Fixed an issue where an error occurred when setting State 2.
 * 10/8/2024 Ver.1.0.8
 * Fixed an issue where state filtering was not working.
 * 9/22/2024 Ver.1.0.7
 * Fixed an issue where the actor selection cursor would appear misaligned.
 * 8/19/2024 Ver.1.0.6
 * Fixed an issue where the state (menu type) display did not change.
 * 8/14/2024 Ver.1.0.5
 * Fixed an issue that caused the game to freeze when returning to party commands after selecting an action for the second or subsequent times.
 * 8/11/2024 Ver.1.0.4
 * Fixed custom Y coordinates in actor commands not displaying at 0.
 * 8/9/2024 Ver.1.0.3
 * Added the ability to specify the display position of the Appearance, Flee, Victory, and Defeat windows.
 * Fixed an issue where the actor status window was not displayed at the start of battle.
 * 8/2/2024 Ver.1.0.2
 * Fixed an issue that caused errors when playing animations on maps.
 * 7/21/2024 Ver.1.0.1
 * Fixed an issue where players could get stuck at the end of combat.
 * Fixed an issue that could cause the Actor Status window to flicker.
 * 7/20/2024 Ver.1.0.0
 * First edition.
 * 
 * 
 * @command ActorStatusWindowVisible
 * @desc Toggles the display of actor status.
 * @text Actor status display switch
 * 
 * @arg WindowVisible
 * @type boolean
 * @default false
 * @text Display Switching
 * @desc Switches the display. (Displays when set to true)
 * 
 * 
 * @param BattleLayoutSetting
 * @text Battle Layout
 * @default ------------------------------
 * 
 * @param BattleLayoutStyle
 * @desc Specifies the battle style.
 * @text Battle style
 * @type combo
 * @option 'Default'
 * @option 'List'
 * @option 'List_NoTP'
 * @option 'XP'
 * @default 'Default'
 * @parent BattleLayoutSetting
 * 
 * @param BattleLayoutVar
 * @desc Specifies the game variable that specifies the layout. When the variable value is 0, the plugin parameter settings are applied.
 * @text Layout Game Variables
 * @type variable
 * @default 0
 * @parent BattleLayoutSetting
 * 
 * @param ActorStatusWindowSetting
 * @text Actor Status Window
 * @default ------------------------------
 * 
 * @param BattleLayout
 * @desc Sets the battle layout. The setting value for the layout game variable is the list number.
 * @text Battle Layout Settings
 * @default ["{\"StyleName\":\"'Default'\",\"DisplayStatusSettings\":\"------------------------------\",\"BattleStatusList\":\"[\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"TpbGauge\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"80\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"DynamicName\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"80\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"HpGauge\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"104\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"MpGauge\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"128\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"TpGauge\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"152\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"State2\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"90\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"ActorStatusWindowSetting\":\"------------------------------\",\"ActorStatusWindowBesideMode\":\"'center'\",\"ActorStatusWindowVerticalMode\":\"'under'\",\"WindowShow\":\"true\",\"WindowFrameShow\":\"false\",\"ContentsBackShow\":\"true\",\"ActorStatusBackgroundSetting\":\"------------------------------\",\"ActorStatusWindowBacgroundImg\":\"\",\"BackgroundStatusWindowFit\":\"true\",\"ActorStatusWindowSkinSetting\":\"------------------------------\",\"ActorStatusWindowSkin\":\"\",\"ActorStatusWindowColor\":\"\",\"ActorStatuPositionSetting\":\"------------------------------\",\"ActorStatusX\":\"0\",\"ActorStatusY\":\"0\",\"ActorStatusWidth\":\"0\",\"ActorStatusHeight\":\"0\",\"ActorStatuDisplayShiftSettings\":\"------------------------------\",\"CommandShiftMode\":\"'party'\",\"CommandRightMode\":\"true\",\"CommandSubtraction\":\"true\",\"WindowContentsSetting\":\"------------------------------\",\"ActorMaxCol\":\"4\",\"ActorMaxRow\":\"1\",\"ActorStatusBesideMode\":\"'right'\",\"ActorStatusVerticalMode\":\"'top'\",\"SelectBackShow\":\"true\",\"ActorSelectBackShow\":\"true\",\"ActorContentsSetting\":\"[]\",\"Background\":\"------------------------------\",\"ActorBackground\":\"\",\"ActorFrontImg\":\"\",\"ActorStatusActorWindow\":\"------------------------------\",\"ActorStatusActorWindowShow\":\"false\",\"ActorWindowSkinSetting\":\"------------------------------\",\"ActorWindowSkin\":\"\",\"ActorWindowColor\":\"\",\"ActorWindowSetting\":\"////////////////////////////////\",\"DefaultActorWindow\":\"true\",\"ActorWindowFrameShow\":\"false\",\"PartyCommandSettings\":\"////////////////////////////////\",\"PartyCommandPosition\":\"'default'\",\"PartyCommandMaxCol\":\"1\",\"PartyCommandMaxRow\":\"4\",\"PartyCommandPositionSetting\":\"------------------------------\",\"PartyCommand_X\":\"0\",\"PartyCommand_Y\":\"0\",\"PartyCommand_Width\":\"192\",\"PartyCommandOption\":\"------------------------------\",\"PartyCommandWindowCenter\":\"false\",\"PartyCommandMode\":\"false\",\"PartyCommandBackgroundSetting\":\"------------------------------\",\"PartyCommandWindowBacgroundImg\":\"\",\"BackgroundPartyCommandWindowFit\":\"true\",\"PartyCommandWindowSkinSetting\":\"------------------------------\",\"PartyCommandWindowVisible\":\"true\",\"PartyCommandWindowSkin\":\"\",\"PartyCommandWindowColor\":\"\",\"ActorCommandSettings\":\"////////////////////////////////\",\"ActorCommandPosition\":\"'default'\",\"ActorCommandMaxRow\":\"10\",\"ActorCommandMinRow\":\"4\",\"ActorCommandMaxCol\":\"1\",\"ActorCommandVariable\":\"true\",\"ActorCommandPositionSetting\":\"------------------------------\",\"ActorCommand_X\":\"0\",\"ActorCommand_Y\":\"0\",\"ActorCommand_Width\":\"192\",\"ActorCommandOption\":\"------------------------------\",\"ActorCommandWindowCenter\":\"false\",\"ActorCommandMode\":\"false\",\"ActorCommandHideWindow\":\"\",\"ActorCommandBackgroundSetting\":\"------------------------------\",\"ActorCommandWindowBacgroundImg\":\"\",\"BackgroundActorCommandWindowFit\":\"true\",\"ActorCommandWindowSkinSetting\":\"------------------------------\",\"ActorCommandWindowVisible\":\"true\",\"ActorCommandWindowSkin\":\"\",\"ActorCommandWindowColor\":\"\",\"ActorImgSetting\":\"------------------------------\",\"ActorImgMode\":\"'face'\",\"ActorImg_X\":\"0\",\"ActorImg_Y\":\"0\",\"Img_SX\":\"0\",\"Img_SY\":\"0\",\"Img_SW\":\"0\",\"Img_SH\":\"0\",\"ActorImgHPosition\":\"'center'\",\"ActorImgVPosition\":\"'under'\",\"ImgHeight\":\"100\",\"ImgHeightOnWindow\":\"false\",\"ActorSpecificSettings\":\"------------------------------\",\"ActorData\":\"[]\",\"ActorStateAnimationPosition\":\"------------------------------\",\"StateAnimationShow\":\"true\",\"ActorState_X\":\"0\",\"ActorState_Y\":\"0\",\"ActorEffectSettings\":\"////////////////////////////////\",\"ActorEffectShow\":\"true\",\"ActorEffect_X\":\"0\",\"ActorEffect_Y\":\"0\",\"ActorDamage_X\":\"0\",\"ActorDamage_Y\":\"0\",\"SelectActorHideWindow\":\"\"}","{\"StyleName\":\"'List'\",\"DisplayStatusSettings\":\"------------------------------\",\"BattleStatusList\":\"[\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"TpbGauge\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"DynamicName\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"HpGauge\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"192\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"MpGauge\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"325\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"TpGauge\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"458\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"118\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"State2\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"156\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"-2\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"ActorStatusWindowSetting\":\"------------------------------\",\"ActorStatusWindowBesideMode\":\"'center'\",\"ActorStatusWindowVerticalMode\":\"'under'\",\"WindowShow\":\"true\",\"WindowFrameShow\":\"false\",\"ContentsBackShow\":\"true\",\"ActorStatusBackgroundSetting\":\"------------------------------\",\"ActorStatusWindowBacgroundImg\":\"\",\"BackgroundStatusWindowFit\":\"true\",\"ActorStatusWindowSkinSetting\":\"------------------------------\",\"ActorStatusWindowSkin\":\"\",\"ActorStatusWindowColor\":\"\",\"ActorStatuPositionSetting\":\"------------------------------\",\"ActorStatusX\":\"0\",\"ActorStatusY\":\"0\",\"ActorStatusWidth\":\"0\",\"ActorStatusHeight\":\"0\",\"ActorStatuDisplayShiftSettings\":\"------------------------------\",\"CommandShiftMode\":\"'party'\",\"CommandRightMode\":\"true\",\"CommandSubtraction\":\"true\",\"WindowContentsSetting\":\"------------------------------\",\"ActorMaxCol\":\"1\",\"ActorMaxRow\":\"4\",\"ActorStatusBesideMode\":\"'center'\",\"ActorStatusVerticalMode\":\"'top'\",\"SelectBackShow\":\"true\",\"ActorSelectBackShow\":\"true\",\"ActorContentsSetting\":\"[]\",\"Background\":\"------------------------------\",\"ActorBackground\":\"\",\"ActorFrontImg\":\"\",\"ActorStatusActorWindow\":\"------------------------------\",\"ActorStatusActorWindowShow\":\"false\",\"ActorWindowSkinSetting\":\"------------------------------\",\"ActorWindowSkin\":\"\",\"ActorWindowColor\":\"\",\"ActorWindowSetting\":\"////////////////////////////////\",\"DefaultActorWindow\":\"false\",\"ActorWindowFrameShow\":\"false\",\"PartyCommandSettings\":\"////////////////////////////////\",\"PartyCommandPosition\":\"'default'\",\"PartyCommandMaxCol\":\"1\",\"PartyCommandMaxRow\":\"4\",\"PartyCommandPositionSetting\":\"------------------------------\",\"PartyCommand_X\":\"0\",\"PartyCommand_Y\":\"0\",\"PartyCommand_Width\":\"192\",\"PartyCommandOption\":\"------------------------------\",\"PartyCommandWindowCenter\":\"false\",\"PartyCommandMode\":\"false\",\"PartyCommandBackgroundSetting\":\"------------------------------\",\"PartyCommandWindowBacgroundImg\":\"\",\"BackgroundPartyCommandWindowFit\":\"true\",\"PartyCommandWindowSkinSetting\":\"------------------------------\",\"PartyCommandWindowVisible\":\"true\",\"PartyCommandWindowSkin\":\"\",\"PartyCommandWindowColor\":\"\",\"ActorCommandSettings\":\"////////////////////////////////\",\"ActorCommandPosition\":\"'default'\",\"ActorCommandMaxRow\":\"4\",\"ActorCommandMinRow\":\"4\",\"ActorCommandMaxCol\":\"1\",\"ActorCommandVariable\":\"false\",\"ActorCommandPositionSetting\":\"------------------------------\",\"ActorCommand_X\":\"0\",\"ActorCommand_Y\":\"0\",\"ActorCommand_Width\":\"192\",\"ActorCommandOption\":\"------------------------------\",\"ActorCommandWindowCenter\":\"false\",\"ActorCommandMode\":\"false\",\"ActorCommandHideWindow\":\"\",\"ActorCommandBackgroundSetting\":\"------------------------------\",\"ActorCommandWindowBacgroundImg\":\"\",\"BackgroundActorCommandWindowFit\":\"true\",\"ActorCommandWindowSkinSetting\":\"------------------------------\",\"ActorCommandWindowVisible\":\"true\",\"ActorCommandWindowSkin\":\"\",\"ActorCommandWindowColor\":\"\",\"ActorImgSetting\":\"------------------------------\",\"ActorImgMode\":\"'face'\",\"ActorImg_X\":\"0\",\"ActorImg_Y\":\"0\",\"Img_SX\":\"0\",\"Img_SY\":\"0\",\"Img_SW\":\"0\",\"Img_SH\":\"0\",\"ActorImgHPosition\":\"'left'\",\"ActorImgVPosition\":\"'under'\",\"ImgHeight\":\"0\",\"ImgHeightOnWindow\":\"false\",\"ActorSpecificSettings\":\"------------------------------\",\"ActorData\":\"[]\",\"ActorStateAnimationPosition\":\"------------------------------\",\"StateAnimationShow\":\"false\",\"ActorState_X\":\"0\",\"ActorState_Y\":\"0\",\"ActorEffectSettings\":\"////////////////////////////////\",\"ActorEffectShow\":\"false\",\"ActorEffect_X\":\"0\",\"ActorEffect_Y\":\"0\",\"ActorDamage_X\":\"0\",\"ActorDamage_Y\":\"0\",\"SelectActorHideWindow\":\"[\\\"'ItemWindow'\\\",\\\"'SkillWindow'\\\"]\"}","{\"StyleName\":\"'List_NoTP'\",\"DisplayStatusSettings\":\"------------------------------\",\"BattleStatusList\":\"[\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"TpbGauge\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"DynamicName\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"HpGauge\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"192\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"188\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"MpGauge\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"388\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"188\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"State2\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"156\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"-2\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"ActorStatusWindowSetting\":\"------------------------------\",\"ActorStatusWindowBesideMode\":\"'center'\",\"ActorStatusWindowVerticalMode\":\"'under'\",\"WindowShow\":\"true\",\"WindowFrameShow\":\"false\",\"ContentsBackShow\":\"true\",\"ActorStatusBackgroundSetting\":\"------------------------------\",\"ActorStatusWindowBacgroundImg\":\"\",\"BackgroundStatusWindowFit\":\"true\",\"ActorStatusWindowSkinSetting\":\"------------------------------\",\"ActorStatusWindowSkin\":\"\",\"ActorStatusWindowColor\":\"\",\"ActorStatuPositionSetting\":\"------------------------------\",\"ActorStatusX\":\"0\",\"ActorStatusY\":\"0\",\"ActorStatusWidth\":\"0\",\"ActorStatusHeight\":\"0\",\"ActorStatuDisplayShiftSettings\":\"------------------------------\",\"CommandShiftMode\":\"'party'\",\"CommandRightMode\":\"true\",\"CommandSubtraction\":\"true\",\"WindowContentsSetting\":\"------------------------------\",\"ActorMaxCol\":\"1\",\"ActorMaxRow\":\"4\",\"ActorStatusBesideMode\":\"'center'\",\"ActorStatusVerticalMode\":\"'top'\",\"SelectBackShow\":\"true\",\"ActorSelectBackShow\":\"true\",\"ActorContentsSetting\":\"[]\",\"Background\":\"------------------------------\",\"ActorBackground\":\"\",\"ActorFrontImg\":\"\",\"ActorStatusActorWindow\":\"------------------------------\",\"ActorStatusActorWindowShow\":\"false\",\"ActorWindowSkinSetting\":\"------------------------------\",\"ActorWindowSkin\":\"\",\"ActorWindowColor\":\"\",\"ActorWindowSetting\":\"////////////////////////////////\",\"DefaultActorWindow\":\"false\",\"ActorWindowFrameShow\":\"false\",\"PartyCommandSettings\":\"////////////////////////////////\",\"PartyCommandPosition\":\"'default'\",\"PartyCommandMaxCol\":\"1\",\"PartyCommandMaxRow\":\"4\",\"PartyCommandPositionSetting\":\"------------------------------\",\"PartyCommand_X\":\"0\",\"PartyCommand_Y\":\"0\",\"PartyCommand_Width\":\"192\",\"PartyCommandOption\":\"------------------------------\",\"PartyCommandWindowCenter\":\"false\",\"PartyCommandMode\":\"false\",\"PartyCommandBackgroundSetting\":\"------------------------------\",\"PartyCommandWindowBacgroundImg\":\"\",\"BackgroundPartyCommandWindowFit\":\"true\",\"PartyCommandWindowSkinSetting\":\"------------------------------\",\"PartyCommandWindowVisible\":\"true\",\"PartyCommandWindowSkin\":\"\",\"PartyCommandWindowColor\":\"\",\"ActorCommandSettings\":\"////////////////////////////////\",\"ActorCommandPosition\":\"'default'\",\"ActorCommandMaxRow\":\"4\",\"ActorCommandMinRow\":\"4\",\"ActorCommandMaxCol\":\"1\",\"ActorCommandVariable\":\"false\",\"ActorCommandPositionSetting\":\"------------------------------\",\"ActorCommand_X\":\"0\",\"ActorCommand_Y\":\"0\",\"ActorCommand_Width\":\"192\",\"ActorCommandOption\":\"------------------------------\",\"ActorCommandWindowCenter\":\"false\",\"ActorCommandMode\":\"false\",\"ActorCommandHideWindow\":\"\",\"ActorCommandBackgroundSetting\":\"------------------------------\",\"ActorCommandWindowBacgroundImg\":\"\",\"BackgroundActorCommandWindowFit\":\"true\",\"ActorCommandWindowSkinSetting\":\"------------------------------\",\"ActorCommandWindowVisible\":\"true\",\"ActorCommandWindowSkin\":\"\",\"ActorCommandWindowColor\":\"\",\"ActorImgSetting\":\"------------------------------\",\"ActorImgMode\":\"'face'\",\"ActorImg_X\":\"0\",\"ActorImg_Y\":\"0\",\"Img_SX\":\"0\",\"Img_SY\":\"0\",\"Img_SW\":\"0\",\"Img_SH\":\"0\",\"ActorImgHPosition\":\"'left'\",\"ActorImgVPosition\":\"'under'\",\"ImgHeight\":\"0\",\"ImgHeightOnWindow\":\"false\",\"ActorSpecificSettings\":\"------------------------------\",\"ActorData\":\"[]\",\"ActorStateAnimationPosition\":\"------------------------------\",\"StateAnimationShow\":\"false\",\"ActorState_X\":\"0\",\"ActorState_Y\":\"0\",\"ActorEffectSettings\":\"////////////////////////////////\",\"ActorEffectShow\":\"false\",\"ActorEffect_X\":\"0\",\"ActorEffect_Y\":\"0\",\"ActorDamage_X\":\"0\",\"ActorDamage_Y\":\"0\",\"SelectActorHideWindow\":\"[\\\"'ItemWindow'\\\",\\\"'SkillWindow'\\\"]\"}","{\"StyleName\":\"'XP'\",\"DisplayStatusSettings\":\"------------------------------\",\"BattleStatusList\":\"[\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"TpbGauge\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"DynamicName\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"HpGauge\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"-8\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"MpGauge\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"18\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"TpGauge\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"44\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"State2\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"140\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"ActorStatusWindowSetting\":\"------------------------------\",\"ActorStatusWindowBesideMode\":\"'center'\",\"ActorStatusWindowVerticalMode\":\"'under'\",\"WindowShow\":\"false\",\"WindowFrameShow\":\"false\",\"ContentsBackShow\":\"false\",\"ActorStatusBackgroundSetting\":\"------------------------------\",\"ActorStatusWindowBacgroundImg\":\"{\\\"BackgroundImg\\\":\\\"\\\",\\\"Background_X\\\":\\\"0\\\",\\\"Background_Y\\\":\\\"0\\\"}\",\"BackgroundStatusWindowFit\":\"false\",\"ActorStatusWindowSkinSetting\":\"------------------------------\",\"ActorStatusWindowSkin\":\"\",\"ActorStatusWindowColor\":\"\",\"ActorStatuPositionSetting\":\"------------------------------\",\"ActorStatusX\":\"0\",\"ActorStatusY\":\"0\",\"ActorStatusWidth\":\"0\",\"ActorStatusHeight\":\"0\",\"ActorStatuDisplayShiftSettings\":\"------------------------------\",\"CommandShiftMode\":\"'none'\",\"CommandRightMode\":\"true\",\"CommandSubtraction\":\"false\",\"WindowContentsSetting\":\"------------------------------\",\"ActorMaxCol\":\"4\",\"ActorMaxRow\":\"1\",\"ActorStatusBesideMode\":\"'center'\",\"ActorStatusVerticalMode\":\"'top'\",\"SelectBackShow\":\"true\",\"ActorSelectBackShow\":\"true\",\"ActorContentsSetting\":\"[]\",\"Background\":\"------------------------------\",\"ActorBackground\":\"\",\"ActorFrontImg\":\"\",\"ActorStatusActorWindow\":\"------------------------------\",\"ActorStatusActorWindowShow\":\"false\",\"ActorWindowSkinSetting\":\"------------------------------\",\"ActorWindowSkin\":\"\",\"ActorWindowColor\":\"\",\"ActorWindowSetting\":\"////////////////////////////////\",\"DefaultActorWindow\":\"false\",\"ActorWindowFrameShow\":\"false\",\"PartyCommandSettings\":\"////////////////////////////////\",\"PartyCommandPosition\":\"'top'\",\"PartyCommandMaxCol\":\"4\",\"PartyCommandMaxRow\":\"1\",\"PartyCommandPositionSetting\":\"------------------------------\",\"PartyCommand_X\":\"0\",\"PartyCommand_Y\":\"0\",\"PartyCommand_Width\":\"0\",\"PartyCommandOption\":\"------------------------------\",\"PartyCommandWindowCenter\":\"false\",\"PartyCommandMode\":\"false\",\"PartyCommandBackgroundSetting\":\"------------------------------\",\"PartyCommandWindowBacgroundImg\":\"{\\\"BackgroundImg\\\":\\\"\\\",\\\"Background_X\\\":\\\"0\\\",\\\"Background_Y\\\":\\\"0\\\"}\",\"BackgroundPartyCommandWindowFit\":\"true\",\"PartyCommandWindowSkinSetting\":\"------------------------------\",\"PartyCommandWindowVisible\":\"true\",\"PartyCommandWindowSkin\":\"\",\"PartyCommandWindowColor\":\"{\\\"red\\\":\\\"0\\\",\\\"green\\\":\\\"0\\\",\\\"bule\\\":\\\"128\\\"}\",\"ActorCommandSettings\":\"////////////////////////////////\",\"ActorCommandPosition\":\"'actor'\",\"ActorCommandMaxRow\":\"10\",\"ActorCommandMinRow\":\"4\",\"ActorCommandMaxCol\":\"1\",\"ActorCommandVariable\":\"true\",\"ActorCommandPositionSetting\":\"------------------------------\",\"ActorCommand_X\":\"0\",\"ActorCommand_Y\":\"0\",\"ActorCommand_Width\":\"192\",\"ActorCommandOption\":\"------------------------------\",\"ActorCommandWindowCenter\":\"false\",\"ActorCommandMode\":\"false\",\"ActorCommandHideWindow\":\"[\\\"'EnemyWindow'\\\",\\\"'ItemWindow'\\\",\\\"'SkillWindow'\\\",\\\"'ActorWindow'\\\"]\",\"ActorCommandBackgroundSetting\":\"------------------------------\",\"ActorCommandWindowBacgroundImg\":\"{\\\"BackgroundImg\\\":\\\"\\\",\\\"Background_X\\\":\\\"0\\\",\\\"Background_Y\\\":\\\"0\\\"}\",\"BackgroundActorCommandWindowFit\":\"true\",\"ActorCommandWindowSkinSetting\":\"------------------------------\",\"ActorCommandWindowVisible\":\"true\",\"ActorCommandWindowSkin\":\"\",\"ActorCommandWindowColor\":\"\",\"ActorImgSetting\":\"------------------------------\",\"ActorImgMode\":\"'face'\",\"ActorImg_X\":\"0\",\"ActorImg_Y\":\"0\",\"Img_SX\":\"0\",\"Img_SY\":\"0\",\"Img_SW\":\"0\",\"Img_SH\":\"0\",\"ActorImgHPosition\":\"'center'\",\"ActorImgVPosition\":\"'under'\",\"ImgHeight\":\"0\",\"ImgHeightOnWindow\":\"false\",\"ActorSpecificSettings\":\"------------------------------\",\"ActorData\":\"[]\",\"ActorStateAnimationPosition\":\"------------------------------\",\"StateAnimationShow\":\"true\",\"ActorState_X\":\"0\",\"ActorState_Y\":\"0\",\"ActorEffectSettings\":\"////////////////////////////////\",\"ActorEffectShow\":\"true\",\"ActorEffect_X\":\"0\",\"ActorEffect_Y\":\"0\",\"ActorDamage_X\":\"0\",\"ActorDamage_Y\":\"0\",\"SelectActorHideWindow\":\"[\\\"'_itemWindow'\\\",\\\"'_skillWindow'\\\"]\"}"]
 * @type struct<BattleLayoutList>[]
 * @parent ActorStatusWindowSetting
 * 
 * @param BattleEndActorStatusClose
 * @desc Closes actor status window at the end of combat.
 * @text Close window when battle ends
 * @type boolean
 * @default false
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorSetting
 * @text Actor Settings
 * @default ------------------------------
 * 
 * @param ActorGraphics
 * @text Actor Image Settings
 * @desc Set the actor image.
 * @default []
 * @type struct<ActorBattlerImgSetting>[]
 * @parent ActorSetting
 * 
 * @param OnActorPictureEX
 * @desc Apply the settings in "NUUN_ActorPicture".
 * @text Apply "NUUN_ActorPicture"
 * @type boolean
 * @default false
 * @parent ActorSetting
 * 
 * @param ImgDeathHide
 * @desc When dead, the actor image (face graphic) will be hidden.
 * @text Hide actor image when dead
 * @type boolean
 * @default true
 * @parent ActorSetting
 * 
 * @param ActorEffect
 * @text Actor Effect Settings
 * @default ------------------------------
 * 
 * @param DamageImgFrame
 * @desc Actor image change frames for damage, recovery, and defense.
 * @text Damage, recovery, and defense frames
 * @type number
 * @default 30
 * @min 1
 * @max 9999
 * @parent ActorEffect
 * 
 * @param CounterImgFrame
 * @desc Actor image counterattack, image change frame when reflecting magic.
 * @text Counterattack, magic reflection image change frame
 * @type number
 * @default 60
 * @min 1
 * @max 9999
 * @parent ActorEffect
 * 
 * @param OnActorShake
 * @desc Enable shake on damage.
 * @text Damage Shake Enabled
 * @type boolean
 * @default false
 * @parent ActorEffect
 * 
 * @param ActorShakeFlame
 * @desc Shake frames when damaged. (default 36)
 * @text Shake Frame
 * @type number
 * @default 36
 * @min 0
 * @parent ActorEffect
 * 
 * @param ActorShakePower
 * @desc The amount of shake when damaged. (Default 2)
 * @text Shake size
 * @type number
 * @default 2
 * @min 0
 * @parent ActorEffect
 * 
 * @param ActorShakeSpeed
 * @desc Shake speed when damaged. (default 20)
 * @text Shake Speed
 * @type number
 * @default 20
 * @min 0
 * @parent ActorEffect
 * 
 * @param OnActionZoom
 * @desc Enables effects during actions.
 * @text Effect on action
 * @type boolean
 * @default false
 * @parent ActorEffect
 * 
 * @param ActionZoomDuration
 * @desc Action effect frames.
 * @text Action effect frames
 * @type number
 * @default 60
 * @min 0
 * @parent ActorEffect
 * 
 * @param ActorFlash
 * @desc Makes the actor image blink when an actor target is selected.
 * @text Actor image flashes when selected
 * @type boolean
 * @default true
 * @parent ActorEffect
 * 
 * @param ActorsMirror
 * @desc Reverses the actor's animation.
 * @text Actor Animation Reverse
 * @type boolean
 * @default true
 * @parent ActorEffect
 * 
 * @param EnemyEffect
 * @text Enemy Effects
 * @default ------------------------------
 * 
 * @param EnemySkillAnimation
 * @desc Enemy normal attack animation.
 * @text nemy normal attack animation
 * @type animation
 * @default 1
 * @min 0
 * @parent EnemyEffect
 * 
 * @param EnemyDamage_X
 * @desc X coordinate of the damage effect. (relative coordinates)
 * @text Damage effect X coordinate (relative coordinate)
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent EnemyEffect
 * 
 * @param EnemyDamage_Y
 * @desc Y coordinate of damage effect. (relative coordinates)
 * @text Damage effect Y coordinate (relative coordinate)
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent EnemyEffect
 * 
 * @param StateIconSettings
 * @text State Icon Settings
 * @default ------------------------------
 * 
 * @param NoStateIcon
 * @desc Icon index when no state is added. 0 is invalid.
 * @text No state icon index
 * @type icon
 * @default 0
 * @parent StateIconSettings
 * 
 * @param WindowSetting
 * @text Window Settings Settings
 * @default ------------------------------
 * 
 * @param MessagePosition
 * @desc Position of appearance, escape, victory, and defeat windows. 0: Top 1: Middle 2: Bottom
 * @text Appearance, Escape, Victory, Defeat window positions
 * @type select
 * @option Top
 * @value 0
 * @option Middle
 * @value 1
 * @option Bottom
 * @value 2
 * @default 2
 * @parent WindowSetting
 * 
 * @param MessagePositionVar
 * @desc Variables that set the position of the appearance, escape, victory, and defeat windows. 0: Top 1: Middle 2: Bottom
 * @text Appearance, Escape, Win, Defeat window position variables
 * @type variable
 * @default 0
 * @parent WindowSetting
 * 
 * @param NoAppearWindow
 * @desc Disables the message that appears when a monster appears.
 * @text Monster appearance message disabled
 * @type boolean
 * @default false
 * @parent WindowSetting
 * 
 * @param WindowHideActorStatusWindow
 * @desc Specifies what should hide the actor status window when a specific window is displayed.
 * @text Specific window Actor status window hide setting
 * @type combo[]
 * @option '_messageWindow'
 * @option '_itemWindow'
 * @option '_skillWindow'
 * @option '_enemyWindow'
 * @option '_enemyBookEnemyWindow'
 * @option '_resultWindow'
 * @option '_resultLevelUpMainWindow'
 * @default 
 * @parent WindowSetting
 * 
 * @param SpecialSetting
 * @text Special Settings
 * @default ////////////////////////////////
 * 
 * @param WindowDisplayMode
 * @text Windowed Mode
 * @desc Specifies the window display mode.
 * @type select
 * @option Spriteset_Battle
 * @value 'Spriteset_Battle'
 * @option Scene_Battle
 * @value 'Scene_Battle'
 * @default 'Spriteset_Battle'
 * @parent SpecialSetting
 * 
 * @param PartyCommandFlickerPrevention
 * @desc Prevents party commands from flickering when acting during TPB.
 * @text Party command flicker prevention
 * @type boolean
 * @default true
 * @parent SpecialSetting
 * 
 */
/*~struct~BattleLayoutList:
 * 
 * @param StyleName
 * @desc Battle layout style name.
 * @text Battle Layout Style
 * @type combo
 * @option 'Default'
 * @option 'List'
 * @option 'XP'
 * @option 'Side'
 * @default 'Default'
 * 
 * @param DisplayStatusSettings
 * @text Display Status Settings
 * @default ------------------------------
 * 
 * @param BattleStatusList
 * @desc Specifies the status to display.
 * @text Display status settings
 * @default []
 * @type struct<ActorStatusList>[]
 * @parent DisplayStatusSettings
 * 
 * @param ActorStatusWindowSetting
 * @text Actor status window basic settings
 * @default ------------------------------
 * 
 * @param ActorStatusWindowBesideMode
 * @text Horizontal display
 * @desc Select how the Actor Status window is displayed horizontally.
 * @type select
 * @option Left
 * @value 'left'
 * @option Center
 * @value 'center'
 * @option Right
 * @value 'right'
 * @default 'center'
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorStatusWindowVerticalMode
 * @text Vertical display
 * @desc Select how the Actor Status window is displayed vertically.
 * @type select
 * @option Top
 * @value 'top'
 * @option Under
 * @value 'under'
 * @default 'under'
 * @parent ActorStatusWindowSetting
 * 
 * @param WindowShow
 * @desc Makes the window opaque.
 * @text Window Opaque
 * @type boolean
 * @default false
 * @parent ActorStatusWindowSetting
 * 
 * @param WindowFrameShow
 * @desc Show window frames.
 * @text Window Frame Display
 * @type boolean
 * @default false
 * @parent ActorStatusWindowSetting
 * 
 * @param ContentsBackShow
 * @desc Displays the window's content background.
 * @text Window content background display
 * @type boolean
 * @default false
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorStatusBackgroundSetting
 * @text Actor Status Window Skin Settings
 * @default ------------------------------
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorStatusWindowBacgroundImg
 * @text Window background image settings
 * @desc Sets the background image for the actor status window.
 * @default 
 * @type struct<WindowBackgroundSetting>
 * @parent ActorStatusBackgroundSetting
 * 
 * @param BackgroundStatusWindowFit
 * @desc Aligns the image display position with the status window. OFF: UI range (0,0)
 * @text Status window position display
 * @type boolean
 * @default true
 * @parent ActorStatusBackgroundSetting
 * 
 * @param ActorStatusWindowSkinSetting
 * @text Actor Status Window Skin Settings
 * @default ------------------------------
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorStatusWindowSkin
 * @text Window Skin Settings
 * @desc Sets the actor status window skin.
 * @type file
 * @dir img/system
 * @default 
 * @parent ActorStatusWindowSkinSetting
 * 
 * @param ActorStatusWindowColor
 * @text Window Color
 * @desc et the window color. Leave blank to default.
 * @default 
 * @type struct<WindowTone>
 * @parent ActorStatusWindowSkinSetting
 * 
 * @param ActorStatuPositionSetting
 * @text Coordinate Settings
 * @default ------------------------------
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorStatusX
 * @desc Specifies the X coordinate of the actor status window (relative).
 * @text X coordinate
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent ActorStatuPositionSetting
 * 
 * @param ActorStatusY
 * @desc Specifies the Y coordinate of the actor status window (relative).
 * @text Y coordinate
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent ActorStatuPositionSetting
 * 
 * @param ActorStatusWidth
 * @desc Specifies the width of the actor status window.
 * @text Width
 * @type number
 * @default 0
 * @min 0
 * @parent ActorStatuPositionSetting
 * 
 * @param ActorStatusHeight
 * @desc Specifies the height of the actor status window.
 * @text Height
 * @type number
 * @default 0
 * @min 0
 * @parent ActorStatuPositionSetting
 * 
 * @param ActorStatuDisplayShiftSettings
 * @text Actor Status Window Display Settings
 * @default ------------------------------
 * @parent ActorStatusWindowSetting
 * 
 * @param CommandShiftMode
 * @text Shift target command window
 * @desc Specifies the display position of party commands when custom selection is enabled.
 * @type select
 * @option Party Commands
 * @value 'party'
 * @option Actor Commands
 * @value 'actor'
 * @option No shift
 * @value 'none'
 * @default 'party'
 * @parent ActorStatuDisplayShiftSettings
 * 
 * @param CommandRightMode
 * @desc The position of the commands displayed when party and actor commands are in default display.
 * @text Party and actor commands displayed on the right
 * @type boolean
 * @default true
 * @parent ActorStatuDisplayShiftSettings
 * 
 * @param CommandSubtraction
 * @desc Subtract the window for the command.
 * @text Command window subtraction
 * @type boolean
 * @default false
 * @parent ActorStatuDisplayShiftSettings
 * 
 * @param WindowContentsSetting
 * @text Actor Status Content Settings
 * @default ------------------------------
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorMaxCol
 * @desc The number of actors to line up side by side.
 * @text Actor cols
 * @type number
 * @default 4
 * @min 1
 * @max 99
 * @parent WindowContentsSetting
 * 
 * @param ActorMaxRow
 * @desc The number of actors to line up vertically.
 * @text Actor rows
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * @parent WindowContentsSetting
 * 
 * @param ActorStatusBesideMode
 * @text Horizontal display
 * @desc Select how actor status content is displayed horizontally.
 * @type select
 * @option Left
 * @value 'left'
 * @option Center
 * @value 'center'
 * @option Right
 * @value 'right'
 * @option Triangle
 * @value 'triangle'
 * @default 'center'
 * @parent WindowContentsSetting
 * 
 * @param ActorStatusVerticalMode
 * @text Vertical display
 * @desc Select how the actor status content is displayed vertically.
 * @type select
 * @option Top
 * @value 'top'
 * @option Under
 * @value 'under'
 * @default 'top'
 * @parent WindowContentsSetting
 * 
 * @param SelectBackShow
 * @desc Displays the actor background that is displayed when selecting an actor's action.
 * @text Background display during actor action
 * @type boolean
 * @default true
 * @parent WindowContentsSetting
 * 
 * @param ActorSelectBackShow
 * @desc Shows the actor background that is displayed when an actor is targeted.
 * @text Background display when selecting actor target
 * @type boolean
 * @default true
 * @parent WindowContentsSetting
 * 
 * @param ActorContentsSetting
 * @text Setting the display position of each actor's status
 * @desc Specifies the display position of the content for each actor status.
 * @default []
 * @type struct<ActorContentsRect>[]
 * @parent WindowContentsSetting
 * 
 * @param Background
 * @text Content background and foreground image settings
 * @default ------------------------------
 * @parent  ActorStatusWindowSetting
 * 
 * @param ActorBackground
 * @desc pecifies the background image for the actor.
 * @text Actor Background Image
 * @type file
 * @default 
 * @dir img/
 * @parent Background
 * 
 * @param ActorFrontImg
 * @desc Specifies the foreground image for the actor (displayed between the actor graphic and the status).
 * @text Foreground Image
 * @type file
 * @dir img/
 * @default 
 * @parent Background
 * 
 * @param ActorStatusActorWindow
 * @text Actor individual window settings
 * @default ------------------------------
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorStatusActorWindowShow
 * @desc Displays a window for each actor.
 * @text Actor-specific window display
 * @type boolean
 * @default false
 * @parent ActorStatusActorWindow
 * 
 * @param ActorWindowSkinSetting
 * @text Actor Window Skin Settings
 * @default ------------------------------
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorWindowSkin
 * @desc Specifies the window skin.
 * @text Window Skin Image
 * @type file
 * @dir img/system
 * @default 
 * @parent ActorWindowSkinSetting
 * 
 * @param ActorWindowColor
 * @text Window Color
 * @desc Set the window color. Default if blank
 * @default 
 * @type struct<WindowTone>
 * @parent ActorWindowSkinSetting
 * 
 * @param ActorWindowSetting
 * @text Actor Window Settings
 * @default ////////////////////////////////
 * 
 * @param DefaultActorWindow
 * @desc Displays the default actor selection window.
 * @text Actor selection window display
 * @type boolean
 * @default false
 * @parent ActorWindowSetting
 * 
 * @param ActorWindowFrameShow
 * @desc Show window frames.
 * @text Window Frame Display
 * @type boolean
 * @default false
 * @parent ActorWindowSetting
 * 
 * @param PartyCommandSettings
 * @text Party Command Settings
 * @default ////////////////////////////////
 * 
 * @param PartyCommandPosition
 * @text Command display position
 * @desc Specifies the display position of party commands when custom selection is enabled.
 * @type select
 * @option Top
 * @value 'top'
 * @option Middle
 * @value 'middle'
 * @option Status winodw top
 * @value 'statuswindowtop'
 * @option Under
 * @value 'under'
 * @option Custom
 * @value 'custom'
 * @option Default
 * @value 'default'
 * @option Conventional Processing
 * @value 'none'
 * @default 'default'
 * @parent PartyCommandSettings
 * 
 * @param PartyCommandMaxCol
 * @desc The number of command columns to display.
 * @text Cols
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * @parent PartyCommandSettings
 * 
 * @param PartyCommandMaxRow
 * @desc PartyCommandMaxRow
 * @text Rows
 * @type number
 * @default 4
 * @min 1
 * @max 99
 * @parent PartyCommandSettings
 * 
 * @param PartyCommandPositionSetting
 * @text Coordinate Settings
 * @default ------------------------------
 * @parent PartyCommandSettings
 * 
 * @param PartyCommand_X
 * @desc Specifies the X coordinate of the party command window.
 * @text Command window X coordinate
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent PartyCommandPositionSetting
 * 
 * @param PartyCommand_Y
 * @desc Specifies the Y coordinate of the party command window.
 * @text Command window Y coordinate
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent PartyCommandPositionSetting
 * 
 * @param PartyCommand_Width
 * @desc Specifies the width of the party command window. 0 is the UI width.
 * @text Command window width
 * @type number
 * @default 192
 * @max 9999
 * @min 0
 * @parent PartyCommandPositionSetting
 * 
 * @param PartyCommandOption
 * @text Party Command Options
 * @default ------------------------------
 * @parent PartyCommandSettings
 * 
 * @param PartyCommandWindowCenter
 * @text Window coordinate center display
 * @desc Centers the window (non-default).
 * @type boolean
 * @default false
 * @parent PartyCommandOption
 * 
 * @param PartyCommandMode
 * @desc Display party command items closer to the center.
 * @text Command display centered
 * @type boolean
 * @default false
 * @parent PartyCommandOption
 * 
 * @param PartyCommandBackgroundSetting
 * @text Party command window background settings
 * @default ------------------------------
 * @parent PartyCommandSettings
 * 
 * @param PartyCommandWindowBacgroundImg
 * @text Window background image settings
 * @desc Sets the background image for the party command window.
 * @default 
 * @type struct<WindowBackgroundSetting>
 * @parent PartyCommandBackgroundSetting
 * 
 * @param BackgroundPartyCommandWindowFit
 * @desc Aligns the image display position with the party command window. OFF for UI range (0,0)
 * @text Window position display
 * @type boolean
 * @default true
 * @parent PartyCommandBackgroundSetting
 * 
 * @param PartyCommandWindowSkinSetting
 * @text Party command window image settings
 * @default ------------------------------
 * @parent PartyCommandSettings
 * 
 * @param PartyCommandWindowVisible
 * @desc Makes the window image opaque. Please turn it OFF when specifying a background. 
 * @text Window Opacity
 * @type boolean
 * @default true
 * @parent PartyCommandWindowSkinSetting
 * 
 * @param PartyCommandWindowSkin
 * @text Window Skin Settings
 * @desc Sets the skin for the party command window.
 * @type file
 * @dir img/system
 * @default 
 * @parent PartyCommandWindowSkinSetting
 * 
 * @param PartyCommandWindowColor
 * @text Window Color
 * @desc Set the window color. Default if blank
 * @default 
 * @type struct<WindowTone>
 * @parent PartyCommandWindowSkinSetting
 * 
 * @param ActorCommandSettings
 * @text Actor Command Settings
 * @default ////////////////////////////////
 * 
 * @param ActorCommandPosition
 * @text Command display position
 * @desc Specifies the display position of actor commands when custom selection is enabled.
 * @type select
 * @option Default (coordinates are fixed)
 * @value 'default'
 * @option Top
 * @value 'top'
 * @option Middle
 * @value 'middle'
 * @option Status winodw top
 * @value 'statuswindowtop'
 * @option Under
 * @value 'under'
 * @option Actor top
 * @value 'actor'
 * @option Above each SV actor (SV recommended)
 * @value 'svtop'
 * @option Left of each SV actor (SV recommended)
 * @value 'svleft'
 * @option Right of each SV actor (SV recommended)
 * @value 'svright'
 * @option Custom
 * @value 'custom'
 * @option Conventional Processing
 * @value 'none'
 * @default 'default'
 * @parent ActorCommandSettings
 * 
 * @param ActorCommandMaxRow
 * @desc The maximum number of command lines that can be displayed. If variable command display is OFF, this setting applies.
 * @text Maximum number of command row displayed
 * @type number
 * @default 10
 * @min 1
 * @max 99
 * @parent ActorCommandSettings
 * 
 * @param ActorCommandMinRow
 * @desc Minimum command rows to display。
 * @text Minimum command rows displayed when command is variable
 * @type number
 * @default 4
 * @min 1
 * @max 99
 * @parent ActorCommandSettings
 * 
 * @param ActorCommandMaxCol
 * @desc The number of command cols to display.
 * @text Display command cols
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * @parent ActorCommandSettings
 * 
 * @param ActorCommandVariable
 * @desc The number of commands displayed will be the same as the number of commands (up to the maximum number of command rows).
 * @text Command variable display
 * @type boolean
 * @default true
 * @parent ActorCommandSettings
 * 
 * @param ActorCommandPositionSetting
 * @text Coordinate Settings
 * @default ------------------------------
 * @parent ActorCommandSettings
 * 
 * @param ActorCommand_X
 * @desc Specifies the X coordinate of the actor command window.
 * @text Command window X coordinate
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent ActorCommandPositionSetting
 * 
 * @param ActorCommand_Y
 * @desc Specifies the Y coordinate of the actor command window.
 * @text Command window Y coordinate
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent ActorCommandPositionSetting
 * 
 * @param ActorCommand_Width
 * @desc Specifies the width of the actor command window.
 * @text Command window width
 * @type number
 * @default 192
 * @max 9999
 * @min 0
 * @parent ActorCommandPositionSetting
 * 
 * @param ActorCommandOption
 * @text Actor Command Options
 * @default ------------------------------
 * @parent ActorCommandSettings
 * 
 * @param ActorCommandWindowCenter
 * @text Window coordinate center display
 * @desc Centers the window (non-default).
 * @type boolean
 * @default false
 * @parent ActorCommandOption
 * 
 * @param ActorCommandMode
 * @desc Display the actor command items closer to the center.
 * @text Command display centered
 * @type boolean
 * @default false
 * @parent ActorCommandOption
 * 
 * @param ActorCommandHideWindow
 * @desc Specifies a window that hides actor commands while the particular window is open.
 * @text Actor Command Hidden Target Window
 * @type combo[]
 * @option 'MessageWindow'
 * @option 'ItemWindow'
 * @option 'SkillWindow'
 * @option 'ActorWindow'
 * @option 'EnemyWindow'
 * @option 'EnemyBook'
 * @option 'Formation'
 * @default 
 * @parent ActorCommandOption
 * 
 * @param ActorCommandBackgroundSetting
 * @text Actor Command Window Background Settings
 * @default ------------------------------
 * @parent ActorCommandSettings
 * 
 * @param ActorCommandWindowBacgroundImg
 * @text Window background image settings
 * @desc Sets the background image for the actor command window.
 * @default 
 * @type struct<WindowBackgroundSetting>
 * @parent ActorCommandBackgroundSetting
 * 
 * @param BackgroundActorCommandWindowFit
 * @desc Aligns the image display position with the actor command window. OFF for UI range (0,0)
 * @text Window position display
 * @type boolean
 * @default true
 * @parent ActorCommandBackgroundSetting
 * 
 * @param ActorCommandWindowSkinSetting
 * @text Actor Command Window Image Settings
 * @default ------------------------------
 * @parent ActorCommandSettings
 * 
 * @param ActorCommandWindowVisible
 * @desc Makes the window image opaque. Please turn it OFF when specifying a background. 
 * @text Window Opacity
 * @type boolean
 * @default true
 * @parent ActorCommandWindowSkinSetting
 * 
 * @param ActorCommandWindowSkin
 * @desc Specifies the window skin.
 * @text Window Skin Image
 * @type file
 * @dir img/system
 * @default 
 * @parent ActorCommandWindowSkinSetting
 * 
 * @param ActorCommandWindowColor
 * @text Window Color
 * @desc Set the window color. Default if blank
 * @default 
 * @type struct<WindowTone>
 * @parent ActorCommandWindowSkinSetting
 * 
 * @param ActorImgSetting
 * @text Actor Image Settings
 * @default ------------------------------
 * 
 * @param ActorImgMode
 * @text Actor Image Mode
 * @desc Actor image to display in actor status.
 * @type select
 * @option None
 * @value 'none'
 * @option Face
 * @value 'face'
 * @option Imges
 * @value 'imges'
 * @default 'face'
 * @parent ActorImgSetting
 * 
 * @param ActorImg_X
 * @desc Sets the X coordinate of the image.
 * @text Image X coordinate
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorImgSetting
 * 
 * @param ActorImg_Y
 * @desc Sets the Y coordinate of the image.
 * @text Image Y coordinate
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorImgSetting
 * 
 * @param Img_SX
 * @desc The start X coordinate of the image.
 * @text Image display start coordinate X
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorImgSetting
 * 
 * @param Img_SY
 * @desc Image display start coordinate Y
 * @text Image display start coordinate Y
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorImgSetting
 * 
 * @param Img_SW
 * @desc The display width of the image.
 * @text Image display width
 * @type number
 * @default 0
 * @min 0
 * @max 9999
 * @parent ActorImgSetting
 * 
 * @param Img_SH
 * @desc The display height of the image.
 * @text Image display height
 * @type number
 * @default 0
 * @min 0
 * @max 9999
 * @parent ActorImgSetting
 * 
 * @param ActorImgHPosition
 * @text Face graphic horizontal reference display position
 * @desc Specifies the reference display position next to the face graphic.
 * @type select
 * @option Left
 * @value 'left'
 * @option Certer
 * @value 'center'
 * @default 'center'
 * @parent ActorImgSetting
 * 
 * @param ActorImgVPosition
 * @text Image vertical reference display position
 * @desc Specifies the vertical reference display position of the image (image only).
 * @type select
 * @option Top
 * @value 'top'
 * @option Under
 * @value 'under'
 * @default 'under'
 * @parent ActorImgSetting
 * 
 * @param ImgHeight
 * @desc Specifies the maximum height of the image (0 is the default).
 * @text Image Height
 * @type number
 * @default 0
 * @min 0
 * @max 9999
 * @parent ActorImgSetting
 * 
 * @param ImgHeightOnWindow
 * @desc Fits the height range of the actor image within the window.
 * @text Actor image in window display
 * @type boolean
 * @default false
 * @parent ActorImgSetting
 * 
 * @param ActorSpecificSettings
 * @text Actor-specific settings
 * @default ------------------------------
 * @parent ActorImgSetting
 * 
 * @param ActorData
 * @text Actor coordinates, image settings
 * @desc Set individual coordinates and images for each actor.
 * @default []
 * @type struct<ActorDataList>[]
 * @parent ActorImgSetting
 * 
 * @param ActorStateAnimationPosition
 * @text Actor State Animation Settings
 * @default ------------------------------
 * @parent ActorImgSetting
 * 
 * @param StateAnimationShow
 * @desc Displays the state animation of the actor image. Only when animation effect display is enabled in the front view.
 * @text Actor Image State Animation Display
 * @type boolean
 * @default true
 * @parent ActorStateAnimationPosition
 * 
 * @param ActorState_X
 * @desc X coordinate of state animation for each actor image. Only when animation effects are enabled in the front view
 * @text State animation X coordinate (relative coordinate)
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorStateAnimationPosition
 * 
 * @param ActorState_Y
 * @desc The Y coordinate of the state animation for each actor image. Only when animation effects are enabled in the front view
 * @text State animation Y coordinate (relative coordinate)
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorStateAnimationPosition
 * 
 * @param ActorEffectSettings
 * @text Actor Effect Settings
 * @default ////////////////////////////////
 * 
 * @param ActorEffectShow
 * @desc Animation effects are also displayed in the front view.
 * @text Front view effect display
 * @type boolean
 * @default false
 * @parent ActorEffectSettings
 * 
 * @param ActorEffect_X
 * @desc The relative x-coordinate of the animation effect.
 * @text Animation effect X coordinate (relative coordinate)
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorEffectSettings
 * 
 * @param ActorEffect_Y
 * @desc The relative y-coordinate of the animation effect.
 * @text Animation effect Y coordinate (relative coordinate)
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorEffectSettings
 * 
 * @param ActorDamage_X
 * @desc The X coordinate of the damage effect (relative coordinate).
 * @text Damage effect X coordinate (relative coordinate)
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorEffectSettings
 * 
 * @param ActorDamage_Y
 * @desc The Y coordinate of the damage effect (relative coordinate).
 * @text Damage effect Y coordinate (relative coordinate)
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorEffectSettings
 * 
 * @param SelectActorHideWindow
 * @desc Specifies which windows to hide while the actor window is visible. 
 * @text Hide specified window
 * @type combo[]
 * @option 'ItemWindow'
 * @option 'SkillWindow'
 * @default 
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
 * @option State(1)(2)(3)(4)
 * @value State2
 * @option Turn(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value Turn
 * @option Original parameter(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(16)
 * @value OrgParam
 * @option Dynamic original parameters(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(16)
 * @value DynamicOrgParam
 * @option HP Gauge(1)(2)(3)(4)(5)(7)(20)(21)(23)(24)
 * @value HpGauge
 * @option MP Gauge(1)(2)(3)(4)(5)(7)(20)(21)(23)(24)
 * @value MpGauge
 * @option TP Gauge(1)(2)(3)(4)(5)(7)(20)(21)(23)(24)
 * @value TpGauge
 * @option TPBGauge(1)(2)(3)(4)(5)(7)(20)(21)(23)(24)
 * @value TpbGauge
 * @option CircularHP(1)(2)(3)(4)(7)(20)(21)(23)(24)
 * @value HpCircularGauge
 * @option CircularMP(1)(2)(3)(4)(7)(20)(23)
 * @value MpCircularGauge
 * @option CircularTP(1)(2)(3)(4)(7)(20))(23)
 * @value TpCircularGauge
 * @option CircularTPB(1)(2)(3)(4)(7)(20))(23)
 * @value TpbCircularGauge
 * @option Original gauge(1)(2)(3)(4)(5)(7)(16)(18)(20)(21)(22)(23)(24)
 * @value OrgGauge
 * @option Imges(1)(2)(3)(4)(25)
 * @value Imges
 * @option Free text(1)(2)(3)(4)(35)
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
 * @param DetaEval
 * @desc Enter an evaluation formula or string. State is state ID, gauge is current value
 * @text Evaluation formula or string(javaScript)(16)
 * @type combo
 * @option '$gameVariables.value(0);//Game variable'
 * @option 'actor;//Actor game data'
 * @option 'actor.actor();//Actor system data'
 * @default 
 * 
 * @param DetaEval2
 * @desc Max value evaluation formula. State is buff, gauge is maximum value
 * @text Max evaluation formula(javaScript)(22)
 * @type combo
 * @option '$gameVariables.value(0);//Game variable'
 * @option 'actor;//Actor game data'
 * @option 'actor.actor();//Actor system data'
 * @default 
 * 
 * @param ParamID
 * @desc Identification ID of state or gauge.
 * @text Identification ID(20)
 * @type string
 * @default 
 * 
 * @param GaugeSetting
 * @text Gauge setting
 * @default ------------------------------
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
/*~struct~ActorDataList:
 * 
 * @param ActorId
 * @text Actor
 * @desc Specify the actor. If 0 is specified, the default setting will be used.
 * @type actor
 * @default 0
 * 
 * @param ActorStatusListDataSetting
 * @text Actor Image Position Setting
 * @default When Actor Image Mode is Default, all settings in Actor Image Position Settings will be default.
 * 
 * @param StatusListData
 * @text Display Status Settings
 * @desc Sets the status information to be displayed. If any of these are not set, the default settings will be applied.
 * @default 
 * @type struct<ActorStatusList>[]
 * @parent ActorStatusListDataSetting
 * 
 * @param ActorWindowSkinSetting
 * @text Individual window settings for each actor
 * @default ------------------------------
 * 
 * @param ActorWindowSkin
 * @desc Specifies the window skin. If not specified, the default setting will be applied.
 * @text Window Skin Image
 * @type file
 * @dir img/system
 * @default 
 * @parent ActorWindowSkinSetting
 * 
 * @param ActorWindowColor
 * @text Window Color
 * @desc Sets the window color.
 * @default 
 * @type struct<WindowTone>
 * @parent ActorWindowSkinSetting
 * 
 * @param ActorCommandBackgroundSetting
 * @text Actor Command Window Background Settings
 * @default ------------------------------
 * 
 * @param ActorCommandWindowBacgroundImg
 * @text Actor Command Window Background Image Settings
 * @desc Sets the background image for the actor command window.
 * @default 
 * @type struct<WindowBackgroundSetting>
 * @parent ActorCommandBackgroundSetting
 * 
 * @param ActorCommandSkinSetting
 * @text Actor Command Skin Settings
 * @default ------------------------------
 * 
 * @param ActorCommandWindowSkin
 * @desc Specifies the window skin. If not specified, the default setting will be applied.
 * @text Window Skin Image
 * @type file
 * @dir img/system
 * @default 
 * @parent ActorCommandSkinSetting
 * 
 * @param ActorCommandWindowColor
 * @text Window Color
 * @desc Sets the window color.
 * @default 
 * @type struct<WindowTone>
 * @parent ActorCommandSkinSetting
 * 
 * @param Background
 * @text Actor Image Settings
 * @default ------------------------------
 * 
 * @param ActorBackground
 * @desc Specifies the background image for the actor. If not specified, the default setting will be applied.
 * @text Actor Background Image
 * @type file
 * @default 
 * @dir img/
 * @parent Background
 * 
 * @param ActorFrontImg
 * @desc Specifies the background image behind the status. If not specified, the default setting will be used.
 * @text Status background image
 * @type file
 * @dir img/
 * @default 
 * @parent Background
 * 
 * @param ActorImgPositionSetting
 * @text Actor Image Position Setting
 * @default When Actor Image Mode is Default, all settings in Actor Image Position Settings will be default.
 * 
 * @param ActorImgMode
 * @text Actor Image Mode
 * @desc Actor image to display in actor status.
 * @type select
 * @option None
 * @value 'none'
 * @option Default
 * @value 'default'
 * @option Face
 * @value 'face'
 * @option Imges
 * @value 'imges'
 * @default 'default'
 * @parent ActorImgPositionSetting
 * 
 * @param Actor_X
 * @desc Sets the X coordinate of the image.
 * @text Image X coordinate
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorImgPositionSetting
 * 
 * @param Actor_Y
 * @desc Sets the Y coordinate of the image.
 * @text Image Y coordinate
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorImgPositionSetting
 * 
 * @param Img_SX
 * @desc The start X coordinate of the image.
 * @text Image display start coordinate X
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorImgPositionSetting
 * 
 * @param Img_SY
 * @desc Image display start coordinate Y
 * @text Image display start coordinate Y
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorImgPositionSetting
 * 
 * @param Img_SW
 * @desc The display width of the image.
 * @text Image display width
 * @type number
 * @default 0
 * @min 0
 * @max 9999
 * @parent ActorImgPositionSetting
 * 
 * @param Img_SH
 * @desc The display height of the image.
 * @text Image display height
 * @type number
 * @default 0
 * @min 0
 * @max 9999
 * @parent ActorImgPositionSetting
 * 
 * @param ActorImgHPosition
 * @text Face graphic horizontal reference display position
 * @desc Specifies the reference display position next to the face graphic.
 * @type select
 * @option Left
 * @value 'left'
 * @option Certer
 * @value 'center'
 * @default 'center'
 * @parent ActorImgPositionSetting
 * 
 * @param ActorImgVPosition
 * @text Image vertical reference display position
 * @desc Specifies the vertical reference display position of the image (image only).
 * @type select
 * @option Top
 * @value 'top'
 * @option Under
 * @value 'under'
 * @default 'under'
 * @parent ActorImgPositionSetting
 * 
 * @param ActorStateAnimationPosition
 * @text Actor State Animation Settings
 * @default ------------------------------
 * 
 * @param ActorState_X
 * @desc X coordinate of state animation for each actor image. Valid except 0
 * @text State animation X coordinate (relative coordinate)
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorStateAnimationPosition
 * 
 * @param ActorState_Y
 * @desc The Y coordinate of the state animation for each actor image. Valid except 0
 * @text State animation Y coordinate (relative coordinate)
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorStateAnimationPosition
 * 
 */
/*~struct~ActorBattlerImgSetting:
 * 
 * @param ActorId
 * @text Actor
 * @desc Specify the actor.
 * @type actor
 * @default 0
 * 
 * @param BattlerActorImg
 * @text Actor Image Settings
 * @desc Set the actor image.
 * @default []
 * @type struct<ActorBattlerImgList>[]
 * 
 */
/*~struct~ActorBattlerImgList:
 * 
 * @param GraphicImg
 * @text Actor Image
 * @desc Set the actor image. If multiple images are specified, they will be displayed randomly.
 * @type file[]
 * @dir img/
 * 
 * @param FaceImg
 * @text Face graphics image
 * @desc Set the sprite sheet for the face graphic image.
 * @type file
 * @dir img/faces
 * 
 * @param FaceIndex
 * @text Face Gra Index ID
 * @desc he index ID of the face graphic.
 * @type number
 * @default -1
 * @min -1
 * 
 * @param Opacity
 * @text Image Opacity
 * @desc Specifies the opacity of the image.
 * @type number
 * @default 255
 * @min 0
 * @max 255
 * 
 * @param AllMatch
 * @text All conditions match
 * @default ------------------------------
 * 
 * @param ImgHP
 * @text Remaining HP
 * @desc Changes when the remaining HP is within the specified range or numerical value.
 * @type struct<CondValue>
 * @default {"CondValid":"false","UpLimit":"0","DwLimit":"0"}
 * @parent AllMatch
 * 
 * @param ImgSwitch
 * @text Switch
 * @desc Changes when all the specified switches are ON.
 * @type switch[]
 * @default
 * @parent AllMatch
 * 
 * @param ImgWeapon
 * @text Weapon
 * @desc The condition is met when all of the specified weapons are equipped.
 * @type weapon[]
 * @default 
 * @parent AllMatch
 * 
 * @param ImgArmor
 * @text Armor
 * @desc The condition is met when all of the specified armor is equipped.
 * @type armor[]
 * @default 
 * @parent AllMatch
 * 
 * @param ImgClass
 * @text Class
 * @desc Certain professions qualify.
 * @type class
 * @default 0
 * @parent AllMatch
 * 
 * @param ImgStateAll
 * @text State
 * @desc The condition is met when all of the specified states are applied.
 * @type state[]
 * @default 
 * @parent AllMatch
 * 
 * @param Level
 * @text Level
 * @desc The condition is met when the level is equal to or higher than the specified level.
 * @type number
 * @default 1
 * @parent AllMatch
 * 
 * @param ChangeGraphicScenes
 * @text Changing scene
 * @desc Select the graphic change scene.
 * @type select
 * @option Default
 * @value 'default'
 * @option Death
 * @value 'death'
 * @option Dying
 * @value 'dying'
 * @option Damage
 * @value 'damage'
 * @option Cridamage
 * @value 'cridamage'
 * @option Recovery
 * @value 'recovery'
 * @option Attack(1)
 * @value 'attack'
 * @option RecoverySkill(1)
 * @value 'recoverySkill'
 * @option UseItem(2)
 * @value 'item'
 * @option Counter
 * @value 'counter'
 * @option Reflection
 * @value 'reflection'
 * @option CounterEX(CounterExtend)(4)
 * @value 'counterEX'
 * @option Guard
 * @value 'guard'
 * @option Chant
 * @value 'chant'
 * @option Victory
 * @value 'victory'
 * @option State(3)
 * @value 'state'
 * @option Command Selection
 * @value 'command'
 * @option Final Attack (1) NUUN_FinalAttack required
 * @value 'finalAttack'
 * @default 'default'
 * @parent AllMatch
 * 
 * @param CondSetting
 * @text Condition setting
 * @default ------------------------------
 * 
 * @param Skill
 * @text Skill(1)
 * @desc Select a skill. Applies when using any skill. Blank or none applies to all skills.
 * @type skill[]
 * @default
 * @parent CondSetting
 * 
 * @param Item
 * @text Item(2)
 * @desc Select an item. Applies when using any item. Blank or None applies to all items.
 * @type item[]
 * @default
 * @parent CondSetting
 * 
 * @param stateId
 * @text Received state(3)
 * @desc Select a state. Applies to all states.
 * @type state[]
 * @default 
 * @parent CondSetting
 * 
 * @param Id
 * @text Identification tag(4)
 * @desc Specifies an identification tag. Applies when all identification tags are applicable.
 * @type string[]
 * @default 
 * @parent CondSetting
 */
/*~struct~CondValue:
 * 
 * @param CondValid
 * @desc Activate the HP condition.
 * @text HP condition valid
 * @type boolean
 * @default false
 * 
 * @param UpLimit
 * @text Upper limit
 * @desc Upper limit.
 * @type number
 * @default 0
 * 
 * @param DwLimit
 * @text Lower limit
 * @desc Lower limit.
 * @type number
 * @default 0
 * 
 */
/*~struct~ActorContentsRect:
 * 
 * @param ActorContentsCoordinateMode
 * @text Coordinate Mode
 * @desc Specifies the coordinate mode. ON: Absolute coordinates OFF: Relative coordinates
 * @type boolean
 * @default false
 * 
 * @param ActorContentsX
 * @desc Specifies the X coordinate of the content display of the actor status window. (relative)
 * @text X coordinate
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param ActorContentsY
 * @desc Specifies the Y coordinate of the content display of the actor status window. (relative)
 * @text Y coordinate
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param ActorContentsWidth
 * @desc Specifies the width of the content display in the actor status window. 0 is the normal display width.
 * @text Width
 * @type number
 * @default 0
 * @min 0
 * @max 999
 * 
 * @param ActorContentsHeight
 * @desc Specifies the height of the content display of the actor status window. 0 is the normal display width.
 * @text Height
 * @type number
 * @default 0
 * @min 0
 * @max 24
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
/*~struct~WindowTone:
 * 
 * @param red
 * @desc Red
 * @text Red
 * @type number
 * @default 0
 * @max 255
 * @min -255
 * 
 * @param green
 * @text Green
 * @desc Green
 * @type number
 * @default 0
 * @max 255
 * @min -255
 * 
 * @param bule
 * @text Bule
 * @desc Bule
 * @type number
 * @default 0
 * @max 255
 * @min -255
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc バトルスタイル拡張
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_MenuParamListBase
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_ActorPicture
 * @version 1.0.21
 * 
 * @help
 * 戦闘レイアウトを変更、カスタマイズできます。
 * 
 * このプラグインでは他に以下の機能を実装します。
 * 戦闘ウィンドウのカスタマイズ。
 * フロントビューでのアクターへのアニメーション。
 * フロントビューでのアクターのステートアニメーション表示。
 * 条件付きアクター画像の切り替え。
 * ステータスパラメータのカスタマイズ。
 * 各ウィンドウの背景画像指定。
 * コマンドウィンドウのカスタマイズ。
 * 
 * 顔グラ、立ち絵の設定
 * アクターの画像設定で条件で顔グラまたは立ち絵を切り替える事ができます。また立ち絵、顔グラ表示EXに対応していますが、プラグインパラメータの
 * 立ち絵表示EX適用をONにしてください。
 * 条件の優先度は上から順に一致した条件が適用されます。通常時に適用される画像は一番下に設定してください。
 * 
 * 表示するステータス設定
 * 表示ステータス設定はアクターステータスに表示するステータスを独自に設定できます。
 * 表示したい項目だけ設定してください。
 * 表示ステータス設定にひとつでも設定してある場合は、こちらの設定が適用されます。
 * 
 * 
 * 独自パラメータ、独自パラメータ(動的) 
 * 評価式or文字列Aには表示する式をjavascriptで記入します。
 * actor:アクターゲームデータ
 * actor.actor():アクターシステムデータ
 * this._battler:アクターゲームデータ
 * this._battler.actor():アクターシステムデータ
 * 
 * 独自ゲージ
 * 評価式or文字列Aに現在の値をjavascriptで記入します。
 * 評価式or文字列Bに最大値をjavascriptで記入します。
 * actor:アクターゲームデータ
 * actor.actor():アクターシステムデータ
 * this._battler:アクターゲームデータ
 * this._battler.actor():アクターシステムデータ
 * 
 * ステート,ステート2
 * 評価式or文字列Aに表示するステートIDを記入します。
 * 評価式or文字列Bに表示するバフIDを記入します。
 * バフのID
 * 0:HP上昇 1:MP上昇 2:攻撃力上昇 3:防御力上昇 4:魔法力上昇 5:魔法防御上昇 6:敏捷性上昇 7:運上昇
 * 10:HP減少 11:MP減少 12:攻撃力減少 13:防御力減少 14:魔法力減少 15:魔法防御減少 16:敏捷性減少 17:運減少
 * 
 * 画像
 * 評価式or文字列Aには表示条件をjavascriptで記入します。条件が一致しているときに表示されます。
 * 無記入の場合は常に表示されます。
 * actor:アクターゲームデータ
 * actor.actor():アクターシステムデータ
 * this._battler:アクターゲームデータ
 * this._battler.actor():アクターシステムデータ
 * 
 * 敵キャラのメモ欄
 * <AttackAnimation:[id]>
 * [id]:アニメーションID
 * 敵キャラの通常攻撃時、[id]番のアニメーションが再生されます。指定がない場合はプラグインパラメータのデフォルト値が適用されます。
 * 
 * 各アクターステータス表示位置設定
 * リストの設定順はアクターステータスウィンドウに表示されるアクター順(戦闘キャラが1)になります。
 * 戦闘メンバーの表示設定はリストID1番に設定します。2番目は2番に設定します。(アクター別には設定できません)
 * 
 * このプラグインでは木星ペンギン氏作疑似３Dバトルプラグインとの競合対応プラグインは必要ありません。
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
 * 2025/7/26 Ver.1.0.21
 * 連続行動時に特定の条件でアクターの画像が切り替わらない問題を修正。
 * 顔グラに表示範囲指定を適用できるように修正。
 * 2025/7/12 Ver.1.0.20
 * アニメーションの反転が機能していなかった問題を修正。
 * 2025/6/21 Ver.1.0.19
 * 戦闘不能時のアクター画像の表示設定を追加。
 * 2025/2/11 Ver.1.0.18
 * スペルミスを修正。
 * 2025/2/1 Ver.1.0.17
 * スクロールを行うとアクターコマンドの項目が表示されない問題を修正。
 * 2024/12/21 Ver.1.0.16
 * 味方の対象選択時にエラーが出る問題を修正。
 * 2024/12/21 Ver.1.0.15
 * アクター画像条件にレベルを追加。
 * アクター別設定の表示ステータスが適用されていなかった問題を修正。
 * 2024/12/1 Ver.1.0.14
 * 一部プラグインにてフロントビューでアニメーションを再生させたときに、アニメーションが正常に再生されない問題を修正いたしました。
 * 2024/11/12 Ver.1.0.13
 * 一部の処理を修正。
 * 2024/11/9 Ver.1.0.12
 * 表示バフの設定を行ったステートアイコンでデバフが表示されない問題を修正。
 * 2024/11/4 Ver.1.0.11
 * アクターコマンドの位置をアクターステータスウインドウの上に指定したときに、アクターステータスウインドウの上に表示されない問題を修正。
 * 2024/10/13 Ver.1.0.10
 * 敵対象キャンセル後、パーティコマンドが表示されずにフリーズする問題を修正。
 * 2024/10/8 Ver.1.0.9
 * ステート2の設定でエラーが出る問題を修正。
 * 2024/10/8 Ver.1.0.8
 * ステートのフィルター機能が機能していなかった問題を修正。
 * 2024/9/23 Ver.1.0.7
 * アクター選択のカーソルがずれて表示される問題を修正。
 * 2024/8/19 Ver.1.0.6
 * ステート(メニュータイプ)の表示が切り替わらなっかた問題を修正。
 * 2024/8/14 Ver.1.0.5
 * 2回目以降の行動選択時からパーティコマンドに戻る際にフリーズする問題を修正。
 * 2024/8/11 Ver.1.0.4
 * アクターコマンドのカスタムのY座標が0の位置に表示されない問題を修正。
 * 2024/8/9 Ver.1.0.3
 * 出現、逃走、勝利、敗北ウィンドウの表示位置を指定できる機能を追加。
 * 戦闘開始時にアクターステータスウィンドウが表示されなかったのを修正。
 * 2024/8/2 Ver.1.0.2
 * マップ上でアニメーションを再生するとエラーが出る問題を修正。
 * 2024/7/21 Ver.1.0.1
 * アクターステータスウィンドウがちらつく問題を修正。
 * 2024/7/20 Ver.1.0.0
 * 初版
 * 
 * 
 * @command ActorStatusWindowVisible
 * @desc アクターステータスの表示を切り替えます。
 * @text アクターステータス表示切替
 * 
 * @arg WindowVisible
 * @type boolean
 * @default false
 * @text 表示切替
 * @desc 表示の切り替えをします。(trueで表示)
 * 
 * 
 * @param BattleLayoutSetting
 * @text バトルレイアウト
 * @default ------------------------------
 * 
 * @param BattleLayoutStyle
 * @desc バトルスタイルを指定します。
 * @text バトルスタイル
 * @type combo
 * @option 'Default'
 * @option 'List'
 * @option 'List_NoTP'
 * @option 'XP'
 * @default 'Default'
 * @parent BattleLayoutSetting
 * 
 * @param BattleLayoutVar
 * @desc レイアウトを指定するゲーム変数を指定します。0及び変数の値が0でプラグインパラメータの設定が適用されます。
 * @text レイアウトゲーム変数
 * @type variable
 * @default 0
 * @parent BattleLayoutSetting
 * 
 * @param ActorStatusWindowSetting
 * @text アクターステータスウィンドウ
 * @default ------------------------------
 * 
 * @param BattleLayout
 * @desc バトルレイアウトを設定します。レイアウトゲーム変数での設定値はリスト番号を指定します。
 * @text バトルレイアウト設定
 * @default ["{\"StyleName\":\"'Default'\",\"DisplayStatusSettings\":\"------------------------------\",\"BattleStatusList\":\"[\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"TpbGauge\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"80\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"DynamicName\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"80\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"HpGauge\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"104\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"MpGauge\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"128\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"TpGauge\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"152\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"State2\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"90\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"ActorStatusWindowSetting\":\"------------------------------\",\"ActorStatusWindowBesideMode\":\"'center'\",\"ActorStatusWindowVerticalMode\":\"'under'\",\"WindowShow\":\"true\",\"WindowFrameShow\":\"false\",\"ContentsBackShow\":\"true\",\"ActorStatusBackgroundSetting\":\"------------------------------\",\"ActorStatusWindowBacgroundImg\":\"\",\"BackgroundStatusWindowFit\":\"true\",\"ActorStatusWindowSkinSetting\":\"------------------------------\",\"ActorStatusWindowSkin\":\"\",\"ActorStatusWindowColor\":\"\",\"ActorStatuPositionSetting\":\"------------------------------\",\"ActorStatusX\":\"0\",\"ActorStatusY\":\"0\",\"ActorStatusWidth\":\"0\",\"ActorStatusHeight\":\"0\",\"ActorStatuDisplayShiftSettings\":\"------------------------------\",\"CommandShiftMode\":\"'party'\",\"CommandRightMode\":\"true\",\"CommandSubtraction\":\"true\",\"WindowContentsSetting\":\"------------------------------\",\"ActorMaxCol\":\"4\",\"ActorMaxRow\":\"1\",\"ActorStatusBesideMode\":\"'right'\",\"ActorStatusVerticalMode\":\"'top'\",\"SelectBackShow\":\"true\",\"ActorSelectBackShow\":\"true\",\"ActorContentsSetting\":\"[]\",\"Background\":\"------------------------------\",\"ActorBackground\":\"\",\"ActorFrontImg\":\"\",\"ActorStatusActorWindow\":\"------------------------------\",\"ActorStatusActorWindowShow\":\"false\",\"ActorWindowSkinSetting\":\"------------------------------\",\"ActorWindowSkin\":\"\",\"ActorWindowColor\":\"\",\"ActorWindowSetting\":\"////////////////////////////////\",\"DefaultActorWindow\":\"true\",\"ActorWindowFrameShow\":\"false\",\"PartyCommandSettings\":\"////////////////////////////////\",\"PartyCommandPosition\":\"'default'\",\"PartyCommandMaxCol\":\"1\",\"PartyCommandMaxRow\":\"4\",\"PartyCommandPositionSetting\":\"------------------------------\",\"PartyCommand_X\":\"0\",\"PartyCommand_Y\":\"0\",\"PartyCommand_Width\":\"192\",\"PartyCommandOption\":\"------------------------------\",\"PartyCommandWindowCenter\":\"false\",\"PartyCommandMode\":\"false\",\"PartyCommandBackgroundSetting\":\"------------------------------\",\"PartyCommandWindowBacgroundImg\":\"\",\"BackgroundPartyCommandWindowFit\":\"true\",\"PartyCommandWindowSkinSetting\":\"------------------------------\",\"PartyCommandWindowVisible\":\"true\",\"PartyCommandWindowSkin\":\"\",\"PartyCommandWindowColor\":\"\",\"ActorCommandSettings\":\"////////////////////////////////\",\"ActorCommandPosition\":\"'default'\",\"ActorCommandMaxRow\":\"10\",\"ActorCommandMinRow\":\"4\",\"ActorCommandMaxCol\":\"1\",\"ActorCommandVariable\":\"true\",\"ActorCommandPositionSetting\":\"------------------------------\",\"ActorCommand_X\":\"0\",\"ActorCommand_Y\":\"0\",\"ActorCommand_Width\":\"192\",\"ActorCommandOption\":\"------------------------------\",\"ActorCommandWindowCenter\":\"false\",\"ActorCommandMode\":\"false\",\"ActorCommandHideWindow\":\"\",\"ActorCommandBackgroundSetting\":\"------------------------------\",\"ActorCommandWindowBacgroundImg\":\"\",\"BackgroundActorCommandWindowFit\":\"true\",\"ActorCommandWindowSkinSetting\":\"------------------------------\",\"ActorCommandWindowVisible\":\"true\",\"ActorCommandWindowSkin\":\"\",\"ActorCommandWindowColor\":\"\",\"ActorImgSetting\":\"------------------------------\",\"ActorImgMode\":\"'face'\",\"ActorImg_X\":\"0\",\"ActorImg_Y\":\"0\",\"Img_SX\":\"0\",\"Img_SY\":\"0\",\"Img_SW\":\"0\",\"Img_SH\":\"0\",\"ActorImgHPosition\":\"'center'\",\"ActorImgVPosition\":\"'under'\",\"ImgHeight\":\"100\",\"ImgHeightOnWindow\":\"false\",\"ActorSpecificSettings\":\"------------------------------\",\"ActorData\":\"[]\",\"ActorStateAnimationPosition\":\"------------------------------\",\"StateAnimationShow\":\"true\",\"ActorState_X\":\"0\",\"ActorState_Y\":\"0\",\"ActorEffectSettings\":\"////////////////////////////////\",\"ActorEffectShow\":\"true\",\"ActorEffect_X\":\"0\",\"ActorEffect_Y\":\"0\",\"ActorDamage_X\":\"0\",\"ActorDamage_Y\":\"0\",\"SelectActorHideWindow\":\"\"}","{\"StyleName\":\"'List'\",\"DisplayStatusSettings\":\"------------------------------\",\"BattleStatusList\":\"[\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"TpbGauge\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"DynamicName\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"HpGauge\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"192\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"MpGauge\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"325\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"TpGauge\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"458\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"118\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"State2\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"156\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"-2\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"ActorStatusWindowSetting\":\"------------------------------\",\"ActorStatusWindowBesideMode\":\"'center'\",\"ActorStatusWindowVerticalMode\":\"'under'\",\"WindowShow\":\"true\",\"WindowFrameShow\":\"false\",\"ContentsBackShow\":\"true\",\"ActorStatusBackgroundSetting\":\"------------------------------\",\"ActorStatusWindowBacgroundImg\":\"\",\"BackgroundStatusWindowFit\":\"true\",\"ActorStatusWindowSkinSetting\":\"------------------------------\",\"ActorStatusWindowSkin\":\"\",\"ActorStatusWindowColor\":\"\",\"ActorStatuPositionSetting\":\"------------------------------\",\"ActorStatusX\":\"0\",\"ActorStatusY\":\"0\",\"ActorStatusWidth\":\"0\",\"ActorStatusHeight\":\"0\",\"ActorStatuDisplayShiftSettings\":\"------------------------------\",\"CommandShiftMode\":\"'party'\",\"CommandRightMode\":\"true\",\"CommandSubtraction\":\"true\",\"WindowContentsSetting\":\"------------------------------\",\"ActorMaxCol\":\"1\",\"ActorMaxRow\":\"4\",\"ActorStatusBesideMode\":\"'center'\",\"ActorStatusVerticalMode\":\"'top'\",\"SelectBackShow\":\"true\",\"ActorSelectBackShow\":\"true\",\"ActorContentsSetting\":\"[]\",\"Background\":\"------------------------------\",\"ActorBackground\":\"\",\"ActorFrontImg\":\"\",\"ActorStatusActorWindow\":\"------------------------------\",\"ActorStatusActorWindowShow\":\"false\",\"ActorWindowSkinSetting\":\"------------------------------\",\"ActorWindowSkin\":\"\",\"ActorWindowColor\":\"\",\"ActorWindowSetting\":\"////////////////////////////////\",\"DefaultActorWindow\":\"false\",\"ActorWindowFrameShow\":\"false\",\"PartyCommandSettings\":\"////////////////////////////////\",\"PartyCommandPosition\":\"'default'\",\"PartyCommandMaxCol\":\"1\",\"PartyCommandMaxRow\":\"4\",\"PartyCommandPositionSetting\":\"------------------------------\",\"PartyCommand_X\":\"0\",\"PartyCommand_Y\":\"0\",\"PartyCommand_Width\":\"192\",\"PartyCommandOption\":\"------------------------------\",\"PartyCommandWindowCenter\":\"false\",\"PartyCommandMode\":\"false\",\"PartyCommandBackgroundSetting\":\"------------------------------\",\"PartyCommandWindowBacgroundImg\":\"\",\"BackgroundPartyCommandWindowFit\":\"true\",\"PartyCommandWindowSkinSetting\":\"------------------------------\",\"PartyCommandWindowVisible\":\"true\",\"PartyCommandWindowSkin\":\"\",\"PartyCommandWindowColor\":\"\",\"ActorCommandSettings\":\"////////////////////////////////\",\"ActorCommandPosition\":\"'default'\",\"ActorCommandMaxRow\":\"4\",\"ActorCommandMinRow\":\"4\",\"ActorCommandMaxCol\":\"1\",\"ActorCommandVariable\":\"false\",\"ActorCommandPositionSetting\":\"------------------------------\",\"ActorCommand_X\":\"0\",\"ActorCommand_Y\":\"0\",\"ActorCommand_Width\":\"192\",\"ActorCommandOption\":\"------------------------------\",\"ActorCommandWindowCenter\":\"false\",\"ActorCommandMode\":\"false\",\"ActorCommandHideWindow\":\"\",\"ActorCommandBackgroundSetting\":\"------------------------------\",\"ActorCommandWindowBacgroundImg\":\"\",\"BackgroundActorCommandWindowFit\":\"true\",\"ActorCommandWindowSkinSetting\":\"------------------------------\",\"ActorCommandWindowVisible\":\"true\",\"ActorCommandWindowSkin\":\"\",\"ActorCommandWindowColor\":\"\",\"ActorImgSetting\":\"------------------------------\",\"ActorImgMode\":\"'face'\",\"ActorImg_X\":\"0\",\"ActorImg_Y\":\"0\",\"Img_SX\":\"0\",\"Img_SY\":\"0\",\"Img_SW\":\"0\",\"Img_SH\":\"0\",\"ActorImgHPosition\":\"'left'\",\"ActorImgVPosition\":\"'under'\",\"ImgHeight\":\"0\",\"ImgHeightOnWindow\":\"false\",\"ActorSpecificSettings\":\"------------------------------\",\"ActorData\":\"[]\",\"ActorStateAnimationPosition\":\"------------------------------\",\"StateAnimationShow\":\"false\",\"ActorState_X\":\"0\",\"ActorState_Y\":\"0\",\"ActorEffectSettings\":\"////////////////////////////////\",\"ActorEffectShow\":\"false\",\"ActorEffect_X\":\"0\",\"ActorEffect_Y\":\"0\",\"ActorDamage_X\":\"0\",\"ActorDamage_Y\":\"0\",\"SelectActorHideWindow\":\"[\\\"'ItemWindow'\\\",\\\"'SkillWindow'\\\"]\"}","{\"StyleName\":\"'List_NoTP'\",\"DisplayStatusSettings\":\"------------------------------\",\"BattleStatusList\":\"[\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"TpbGauge\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"DynamicName\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"HpGauge\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"192\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"188\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"MpGauge\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"388\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"188\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"State2\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"156\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"-2\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"ActorStatusWindowSetting\":\"------------------------------\",\"ActorStatusWindowBesideMode\":\"'center'\",\"ActorStatusWindowVerticalMode\":\"'under'\",\"WindowShow\":\"true\",\"WindowFrameShow\":\"false\",\"ContentsBackShow\":\"true\",\"ActorStatusBackgroundSetting\":\"------------------------------\",\"ActorStatusWindowBacgroundImg\":\"\",\"BackgroundStatusWindowFit\":\"true\",\"ActorStatusWindowSkinSetting\":\"------------------------------\",\"ActorStatusWindowSkin\":\"\",\"ActorStatusWindowColor\":\"\",\"ActorStatuPositionSetting\":\"------------------------------\",\"ActorStatusX\":\"0\",\"ActorStatusY\":\"0\",\"ActorStatusWidth\":\"0\",\"ActorStatusHeight\":\"0\",\"ActorStatuDisplayShiftSettings\":\"------------------------------\",\"CommandShiftMode\":\"'party'\",\"CommandRightMode\":\"true\",\"CommandSubtraction\":\"true\",\"WindowContentsSetting\":\"------------------------------\",\"ActorMaxCol\":\"1\",\"ActorMaxRow\":\"4\",\"ActorStatusBesideMode\":\"'center'\",\"ActorStatusVerticalMode\":\"'top'\",\"SelectBackShow\":\"true\",\"ActorSelectBackShow\":\"true\",\"ActorContentsSetting\":\"[]\",\"Background\":\"------------------------------\",\"ActorBackground\":\"\",\"ActorFrontImg\":\"\",\"ActorStatusActorWindow\":\"------------------------------\",\"ActorStatusActorWindowShow\":\"false\",\"ActorWindowSkinSetting\":\"------------------------------\",\"ActorWindowSkin\":\"\",\"ActorWindowColor\":\"\",\"ActorWindowSetting\":\"////////////////////////////////\",\"DefaultActorWindow\":\"false\",\"ActorWindowFrameShow\":\"false\",\"PartyCommandSettings\":\"////////////////////////////////\",\"PartyCommandPosition\":\"'default'\",\"PartyCommandMaxCol\":\"1\",\"PartyCommandMaxRow\":\"4\",\"PartyCommandPositionSetting\":\"------------------------------\",\"PartyCommand_X\":\"0\",\"PartyCommand_Y\":\"0\",\"PartyCommand_Width\":\"192\",\"PartyCommandOption\":\"------------------------------\",\"PartyCommandWindowCenter\":\"false\",\"PartyCommandMode\":\"false\",\"PartyCommandBackgroundSetting\":\"------------------------------\",\"PartyCommandWindowBacgroundImg\":\"\",\"BackgroundPartyCommandWindowFit\":\"true\",\"PartyCommandWindowSkinSetting\":\"------------------------------\",\"PartyCommandWindowVisible\":\"true\",\"PartyCommandWindowSkin\":\"\",\"PartyCommandWindowColor\":\"\",\"ActorCommandSettings\":\"////////////////////////////////\",\"ActorCommandPosition\":\"'default'\",\"ActorCommandMaxRow\":\"4\",\"ActorCommandMinRow\":\"4\",\"ActorCommandMaxCol\":\"1\",\"ActorCommandVariable\":\"false\",\"ActorCommandPositionSetting\":\"------------------------------\",\"ActorCommand_X\":\"0\",\"ActorCommand_Y\":\"0\",\"ActorCommand_Width\":\"192\",\"ActorCommandOption\":\"------------------------------\",\"ActorCommandWindowCenter\":\"false\",\"ActorCommandMode\":\"false\",\"ActorCommandHideWindow\":\"\",\"ActorCommandBackgroundSetting\":\"------------------------------\",\"ActorCommandWindowBacgroundImg\":\"\",\"BackgroundActorCommandWindowFit\":\"true\",\"ActorCommandWindowSkinSetting\":\"------------------------------\",\"ActorCommandWindowVisible\":\"true\",\"ActorCommandWindowSkin\":\"\",\"ActorCommandWindowColor\":\"\",\"ActorImgSetting\":\"------------------------------\",\"ActorImgMode\":\"'face'\",\"ActorImg_X\":\"0\",\"ActorImg_Y\":\"0\",\"Img_SX\":\"0\",\"Img_SY\":\"0\",\"Img_SW\":\"0\",\"Img_SH\":\"0\",\"ActorImgHPosition\":\"'left'\",\"ActorImgVPosition\":\"'under'\",\"ImgHeight\":\"0\",\"ImgHeightOnWindow\":\"false\",\"ActorSpecificSettings\":\"------------------------------\",\"ActorData\":\"[]\",\"ActorStateAnimationPosition\":\"------------------------------\",\"StateAnimationShow\":\"false\",\"ActorState_X\":\"0\",\"ActorState_Y\":\"0\",\"ActorEffectSettings\":\"////////////////////////////////\",\"ActorEffectShow\":\"false\",\"ActorEffect_X\":\"0\",\"ActorEffect_Y\":\"0\",\"ActorDamage_X\":\"0\",\"ActorDamage_Y\":\"0\",\"SelectActorHideWindow\":\"[\\\"'ItemWindow'\\\",\\\"'SkillWindow'\\\"]\"}","{\"StyleName\":\"'XP'\",\"DisplayStatusSettings\":\"------------------------------\",\"BattleStatusList\":\"[\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"TpbGauge\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ParamID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"DynamicName\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"HpGauge\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"-8\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"MpGauge\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"18\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"TpGauge\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"44\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"DateSelect\\\\\\\":\\\\\\\"State2\\\\\\\",\\\\\\\"X_Position\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Y_Position\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"X_Coordinate\\\\\\\":\\\\\\\"140\\\\\\\",\\\\\\\"Y_Coordinate\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"ItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SystemItemWidth\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"ParamName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NameColor\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"Align\\\\\\\":\\\\\\\"'left'\\\\\\\",\\\\\\\"paramUnit\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"FontSize\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"FontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"ValueFontFace\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"DetaEval\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"GaugeID\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"GaugeHeight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"DetaEval2\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Color1\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Color2\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"ImgSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"ImgData\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OtherSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Text\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CondSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Conditions\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"ActorStatusWindowSetting\":\"------------------------------\",\"ActorStatusWindowBesideMode\":\"'center'\",\"ActorStatusWindowVerticalMode\":\"'under'\",\"WindowShow\":\"false\",\"WindowFrameShow\":\"false\",\"ContentsBackShow\":\"false\",\"ActorStatusBackgroundSetting\":\"------------------------------\",\"ActorStatusWindowBacgroundImg\":\"{\\\"BackgroundImg\\\":\\\"\\\",\\\"Background_X\\\":\\\"0\\\",\\\"Background_Y\\\":\\\"0\\\"}\",\"BackgroundStatusWindowFit\":\"false\",\"ActorStatusWindowSkinSetting\":\"------------------------------\",\"ActorStatusWindowSkin\":\"\",\"ActorStatusWindowColor\":\"\",\"ActorStatuPositionSetting\":\"------------------------------\",\"ActorStatusX\":\"0\",\"ActorStatusY\":\"0\",\"ActorStatusWidth\":\"0\",\"ActorStatusHeight\":\"0\",\"ActorStatuDisplayShiftSettings\":\"------------------------------\",\"CommandShiftMode\":\"'none'\",\"CommandRightMode\":\"true\",\"CommandSubtraction\":\"false\",\"WindowContentsSetting\":\"------------------------------\",\"ActorMaxCol\":\"4\",\"ActorMaxRow\":\"1\",\"ActorStatusBesideMode\":\"'center'\",\"ActorStatusVerticalMode\":\"'top'\",\"SelectBackShow\":\"true\",\"ActorSelectBackShow\":\"true\",\"ActorContentsSetting\":\"[]\",\"Background\":\"------------------------------\",\"ActorBackground\":\"\",\"ActorFrontImg\":\"\",\"ActorStatusActorWindow\":\"------------------------------\",\"ActorStatusActorWindowShow\":\"false\",\"ActorWindowSkinSetting\":\"------------------------------\",\"ActorWindowSkin\":\"\",\"ActorWindowColor\":\"\",\"ActorWindowSetting\":\"////////////////////////////////\",\"DefaultActorWindow\":\"false\",\"ActorWindowFrameShow\":\"false\",\"PartyCommandSettings\":\"////////////////////////////////\",\"PartyCommandPosition\":\"'top'\",\"PartyCommandMaxCol\":\"4\",\"PartyCommandMaxRow\":\"1\",\"PartyCommandPositionSetting\":\"------------------------------\",\"PartyCommand_X\":\"0\",\"PartyCommand_Y\":\"0\",\"PartyCommand_Width\":\"0\",\"PartyCommandOption\":\"------------------------------\",\"PartyCommandWindowCenter\":\"false\",\"PartyCommandMode\":\"false\",\"PartyCommandBackgroundSetting\":\"------------------------------\",\"PartyCommandWindowBacgroundImg\":\"{\\\"BackgroundImg\\\":\\\"\\\",\\\"Background_X\\\":\\\"0\\\",\\\"Background_Y\\\":\\\"0\\\"}\",\"BackgroundPartyCommandWindowFit\":\"true\",\"PartyCommandWindowSkinSetting\":\"------------------------------\",\"PartyCommandWindowVisible\":\"true\",\"PartyCommandWindowSkin\":\"\",\"PartyCommandWindowColor\":\"{\\\"red\\\":\\\"0\\\",\\\"green\\\":\\\"0\\\",\\\"bule\\\":\\\"128\\\"}\",\"ActorCommandSettings\":\"////////////////////////////////\",\"ActorCommandPosition\":\"'actor'\",\"ActorCommandMaxRow\":\"10\",\"ActorCommandMinRow\":\"4\",\"ActorCommandMaxCol\":\"1\",\"ActorCommandVariable\":\"true\",\"ActorCommandPositionSetting\":\"------------------------------\",\"ActorCommand_X\":\"0\",\"ActorCommand_Y\":\"0\",\"ActorCommand_Width\":\"192\",\"ActorCommandOption\":\"------------------------------\",\"ActorCommandWindowCenter\":\"false\",\"ActorCommandMode\":\"false\",\"ActorCommandHideWindow\":\"[\\\"'EnemyWindow'\\\",\\\"'ItemWindow'\\\",\\\"'SkillWindow'\\\",\\\"'ActorWindow'\\\"]\",\"ActorCommandBackgroundSetting\":\"------------------------------\",\"ActorCommandWindowBacgroundImg\":\"{\\\"BackgroundImg\\\":\\\"\\\",\\\"Background_X\\\":\\\"0\\\",\\\"Background_Y\\\":\\\"0\\\"}\",\"BackgroundActorCommandWindowFit\":\"true\",\"ActorCommandWindowSkinSetting\":\"------------------------------\",\"ActorCommandWindowVisible\":\"true\",\"ActorCommandWindowSkin\":\"\",\"ActorCommandWindowColor\":\"\",\"ActorImgSetting\":\"------------------------------\",\"ActorImgMode\":\"'face'\",\"ActorImg_X\":\"0\",\"ActorImg_Y\":\"0\",\"Img_SX\":\"0\",\"Img_SY\":\"0\",\"Img_SW\":\"0\",\"Img_SH\":\"0\",\"ActorImgHPosition\":\"'center'\",\"ActorImgVPosition\":\"'under'\",\"ImgHeight\":\"0\",\"ImgHeightOnWindow\":\"false\",\"ActorSpecificSettings\":\"------------------------------\",\"ActorData\":\"[]\",\"ActorStateAnimationPosition\":\"------------------------------\",\"StateAnimationShow\":\"true\",\"ActorState_X\":\"0\",\"ActorState_Y\":\"0\",\"ActorEffectSettings\":\"////////////////////////////////\",\"ActorEffectShow\":\"true\",\"ActorEffect_X\":\"0\",\"ActorEffect_Y\":\"0\",\"ActorDamage_X\":\"0\",\"ActorDamage_Y\":\"0\",\"SelectActorHideWindow\":\"[\\\"'_itemWindow'\\\",\\\"'_skillWindow'\\\"]\"}"]
 * @type struct<BattleLayoutList>[]
 * @parent ActorStatusWindowSetting
 * 
 * @param BattleEndActorStatusClose
 * @desc 戦闘終了時にアクターステータスウィンドウを閉じます。
 * @text 戦闘終了時ウィンドウ閉め
 * @type boolean
 * @default false
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorSetting
 * @text アクター設定
 * @default ------------------------------
 * 
 * @param ActorGraphics
 * @text アクター画像設定
 * @desc アクター画像の設定を行います。
 * @default []
 * @type struct<ActorBattlerImgSetting>[]
 * @parent ActorSetting
 * 
 * @param OnActorPictureEX
 * @desc 立ち絵表示EXでの設定を適用します。
 * @text 立ち絵表示EX適用
 * @type boolean
 * @default false
 * @parent ActorSetting
 * 
 * @param ImgDeathHide
 * @desc 戦闘不能になった場合、アクター画像（顔グラ）を非表示にします。
 * @text 戦闘不能時アクター画像非表示
 * @type boolean
 * @default true
 * @parent ActorSetting
 * 
 * @param ActorEffect
 * @text アクターエフェクト設定
 * @default ------------------------------
 * 
 * @param DamageImgFrame
 * @desc アクター画像のダメージ、回復時、防御の画像変化フレーム。
 * @text ダメージ、回復、防御時変化フレーム
 * @type number
 * @default 30
 * @min 1
 * @max 9999
 * @parent ActorEffect
 * 
 * @param CounterImgFrame
 * @desc アクター画像の反撃、魔法反射時の画像変化フレーム。
 * @text 反撃、魔法反射画像変化フレーム
 * @type number
 * @default 60
 * @min 1
 * @max 9999
 * @parent ActorEffect
 * 
 * @param OnActorShake
 * @desc ダメージ時のシェイクを有効にする。
 * @text ダメージシェイク有効
 * @type boolean
 * @default false
 * @parent ActorEffect
 * 
 * @param ActorShakeFlame
 * @desc ダメージ時のシェイクフレーム。（デフォルト36）
 * @text シェイクフレーム
 * @type number
 * @default 36
 * @min 0
 * @parent ActorEffect
 * 
 * @param ActorShakePower
 * @desc ダメージ時のシェイクの大きさ。（デフォルト2）
 * @text シェイクの大きさ
 * @type number
 * @default 2
 * @min 0
 * @parent ActorEffect
 * 
 * @param ActorShakeSpeed
 * @desc ダメージ時のシェイクのスピード。（デフォルト20）
 * @text シェイクスピード
 * @type number
 * @default 20
 * @min 0
 * @parent ActorEffect
 * 
 * @param OnActionZoom
 * @desc 行動時のエフェクトを有効にする。
 * @text 行動時エフェクト有効
 * @type boolean
 * @default false
 * @parent ActorEffect
 * 
 * @param ActionZoomDuration
 * @desc 行動時のエフェクトフレーム
 * @text 行動時エフェクトフレーム
 * @type number
 * @default 60
 * @min 0
 * @parent ActorEffect
 * 
 * @param ActorFlash
 * @desc アクター対象選択時にアクター画像を点滅させます。
 * @text 選択時アクター画像点滅
 * @type boolean
 * @default true
 * @parent ActorEffect
 * 
 * @param ActorsMirror
 * @desc アクターのアニメーションを反転します。
 * @text アクターアニメーション反転
 * @type boolean
 * @default true
 * @parent ActorEffect
 * 
 * @param ActorRefreshStatusWindowRefresh
 * @desc アクターリフレッシュ時にウィンドウステータスを更新する。
 * @text アクターリフレッシュ時ステータス更新
 * @type boolean
 * @default false
 * @parent ActorStatusWindowSetting
 * 
 * @param EnemyEffect
 * @text 敵のエフェクト
 * @default ------------------------------
 * 
 * @param EnemySkillAnimation
 * @desc 敵の通常攻撃のアニメーション。
 * @text 敵通常攻撃アニメーション
 * @type animation
 * @default 1
 * @min 0
 * @parent EnemyEffect
 * 
 * @param EnemyDamage_X
 * @desc ダメージエフェクトのX座標。（相対座標）
 * @text ダメージエフェクトX座標（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent EnemyEffect
 * 
 * @param EnemyDamage_Y
 * @desc ダメージエフェクトのY座標。（相対座標）
 * @text ダメージエフェクトY座標（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent EnemyEffect
 * 
 * @param StateIconSettings
 * @text ステートアイコン設定
 * @default ------------------------------
 * 
 * @param NoStateIcon
 * @desc ステートが一つも付与されていないときのアイコンインデックス。0で無効になります。
 * @text ステートなしアイコンインデックス
 * @type icon
 * @default 0
 * @parent StateIconSettings
 * 
 * @param WindowSetting
 * @text ウィンドウ設定設定
 * @default ------------------------------
 * 
 * @param MessagePosition
 * @desc 出現、逃走、勝利、敗北ウィンドウの位置。0:上 1:中間 2:下
 * @text 出現、逃走、勝利、敗北ウィンドウ位置
 * @type select
 * @option 上
 * @value 0
 * @option 中間
 * @value 1
 * @option 下
 * @value 2
 * @default 2
 * @parent WindowSetting
 * 
 * @param MessagePositionVar
 * @desc 出現、逃走、勝利、敗北ウィンドウの位置を設定する変数。0:上 1:中間 2:下
 * @text 出現、逃走、勝利、敗北ウィンドウ位置変数
 * @type variable
 * @default 0
 * @parent WindowSetting
 * 
 * @param NoAppearWindow
 * @desc モンスター出現時のメッセージを無効にする。
 * @text モンスター出現メッセージ無効
 * @type boolean
 * @default false
 * @parent WindowSetting
 * 
 * @param WindowHideActorStatusWindow
 * @desc 特定のウィンドウが表示されているときのアクターステータスウィンドウを非表示にする対象を指定します。
 * @text 特定ウィンドウアクターステータスウィンドウ非表示設定
 * @type combo[]
 * @option 'MessageWindow'
 * @option 'ItemWindow'
 * @option 'SkillWindow'
 * @option 'ActorWindow'
 * @option 'EnemyWindow'
 * @option 'EnemyBook'
 * @option 'Formation'
 * @option 'ResultWindow'
 * @option 'ResultLevelUp'
 * @default 
 * @parent WindowSetting
 * 
 * @param SpecialSetting
 * @text 特殊設定
 * @default ////////////////////////////////
 * 
 * @param WindowDisplayMode
 * @text ウィンドウ表示モード
 * @desc ウィンドウの表示モードを指定します。
 * @type select
 * @option Spriteset_Battle
 * @value 'Spriteset_Battle'
 * @option Scene_Battle
 * @value 'Scene_Battle'
 * @default 'Spriteset_Battle'
 * @parent SpecialSetting
 * 
 * @param PartyCommandFlickerPrevention
 * @desc TPB時の行動時のパーティコマンドのちらつきを防止します。
 * @text パーティコマンドちらつき防止
 * @type boolean
 * @default true
 * @parent SpecialSetting
 * 
 */
/*~struct~BattleLayoutList:ja
 * 
 * @param StyleName
 * @desc バトルレイアウトのスタイル名。
 * @text バトルレイアウトスタイル
 * @type combo
 * @option 'Default'
 * @option 'List'
 * @option 'XP'
 * @option 'Side'
 * @default 'Default'
 * 
 * @param DisplayStatusSettings
 * @text 表示ステータス設定
 * @default ------------------------------
 * 
 * @param BattleStatusList
 * @desc 表示するステータスを指定します。
 * @text 表示するステータス設定
 * @default []
 * @type struct<ActorStatusList>[]
 * @parent DisplayStatusSettings
 * 
 * @param ActorStatusWindowSetting
 * @text アクターステータスウィンドウ基本設定
 * @default ------------------------------
 * 
 * @param ActorStatusWindowBesideMode
 * @text 横方向表示方法1
 * @desc アクターステータスウィンドウの横方向の表示方法を選択します。
 * @type select
 * @option 左寄り
 * @value 'left'
 * @option 中央
 * @value 'center'
 * @option 右寄り
 * @value 'right'
 * @default 'center'
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorStatusWindowVerticalMode
 * @text 縦方向表示方法2
 * @desc アクターステータスウィンドウの縦方向の表示方法を選択します。
 * @type select
 * @option 上基準
 * @value 'top'
 * @option 下基準
 * @value 'under'
 * @default 'under'
 * @parent ActorStatusWindowSetting
 * 
 * @param WindowShow
 * @desc ウィンドウを表示する。アクター画像やステータスは表示されます。
 * @text ウィンドウ表示
 * @type boolean
 * @default false
 * @parent ActorStatusWindowSetting
 * 
 * @param WindowFrameShow
 * @desc ウィンドウ枠を表示する。
 * @text ウィンドウ枠表示
 * @type boolean
 * @default false
 * @parent ActorStatusWindowSetting
 * 
 * @param ContentsBackShow
 * @desc ウィンドウのコンテンツ背景を表示する。
 * @text ウィンドウコンテンツ背景表示
 * @type boolean
 * @default false
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorStatusBackgroundSetting
 * @text アクターステータスウィンドウスキン設定
 * @default ------------------------------
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorStatusWindowBacgroundImg
 * @text ウィンドウ背景画像設定
 * @desc アクターステータスウィンドウの背景画像を設定します。
 * @default 
 * @type struct<WindowBackgroundSetting>
 * @parent ActorStatusBackgroundSetting
 * 
 * @param BackgroundStatusWindowFit
 * @desc 画像の表示位置をステータスウィンドウに合わせます。OFFでUI範囲(0,0)
 * @text ステータスウィンドウ位置表示
 * @type boolean
 * @default true
 * @parent ActorStatusBackgroundSetting
 * 
 * @param ActorStatusWindowSkinSetting
 * @text アクターステータスウィンドウスキン設定
 * @default ------------------------------
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorStatusWindowSkin
 * @text ウィンドウスキン設定
 * @desc アクターステータスウィンドウのスキンを設定します。
 * @type file
 * @dir img/system
 * @default 
 * @parent ActorStatusWindowSkinSetting
 * 
 * @param ActorStatusWindowColor
 * @text ウィンドウカラー
 * @desc ウィンドウの色の設定をします。空欄でデフォルト
 * @default 
 * @type struct<WindowTone>
 * @parent ActorStatusWindowSkinSetting
 * 
 * @param ActorStatuPositionSetting
 * @text 座標設定
 * @default ------------------------------
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorStatusX
 * @desc アクターステータスウィンドウのX座標を指定します。(相対)
 * @text X座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent ActorStatuPositionSetting
 * 
 * @param ActorStatusY
 * @desc アクターステータスウィンドウのY座標を指定します。(相対)
 * @text Y座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent ActorStatuPositionSetting
 * 
 * @param ActorStatusWidth
 * @desc アクターステータスウィンドウの横幅を指定します。
 * @text 横幅
 * @type number
 * @default 0
 * @min 0
 * @parent ActorStatuPositionSetting
 * 
 * @param ActorStatusHeight
 * @desc アクターステータスウィンドウの縦幅を指定します。
 * @text 縦幅
 * @type number
 * @default 0
 * @min 0
 * @parent ActorStatuPositionSetting
 * 
 * @param ActorStatuDisplayShiftSettings
 * @text アクターステータスウィンドウ表示設定
 * @default ------------------------------
 * @parent ActorStatusWindowSetting
 * 
 * @param CommandShiftMode
 * @text シフト対象コマンドウィンドウ
 * @desc カスタム選択時のパーティコマンドの表示位置を指定します。
 * @type select
 * @option パーティコマンド
 * @value 'party'
 * @option アクターコマンド
 * @value 'actor'
 * @option シフトしない
 * @value 'none'
 * @default 'party'
 * @parent ActorStatuDisplayShiftSettings
 * 
 * @param CommandRightMode
 * @desc パーティ、アクターコマンドがデフォルトの表示の時に表示されるコマンドの位置。
 * @text パーティ、アクターコマンド右側表示
 * @type boolean
 * @default true
 * @parent ActorStatuDisplayShiftSettings
 * 
 * @param CommandSubtraction
 * @desc コマンド分のウィンドウを差し引きます。
 * @text コマンド分ウィンドウ差し引き
 * @type boolean
 * @default false
 * @parent ActorStatuDisplayShiftSettings
 * 
 * @param WindowContentsSetting
 * @text アクターステータスコンテンツ設定
 * @default ------------------------------
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorMaxCol
 * @desc 横に並べるアクター数。
 * @text 横アクター数
 * @type number
 * @default 4
 * @min 1
 * @max 99
 * @parent WindowContentsSetting
 * 
 * @param ActorMaxRow
 * @desc 縦に並べるアクター数。
 * @text 縦アクター数
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * @parent WindowContentsSetting
 * 
 * @param ActorStatusBesideMode
 * @text 横方向表示方法1
 * @desc アクターステータスコンテンツの横方向の表示方法を選択します。
 * @type select
 * @option 左寄り
 * @value 'left'
 * @option 中央
 * @value 'center'
 * @option 右寄り
 * @value 'right'
 * @option ピラミッド
 * @value 'triangle'
 * @default 'center'
 * @parent WindowContentsSetting
 * 
 * @param ActorStatusVerticalMode
 * @text 縦方向表示方法2
 * @desc アクターステータスコンテンツの縦方向の表示方法を選択します。
 * @type select
 * @option 上基準
 * @value 'top'
 * @option 下基準
 * @value 'under'
 * @default 'top'
 * @parent WindowContentsSetting
 * 
 * @param SelectBackShow
 * @desc アクターの行動選択時に表示されるアクター背景を表示する。
 * @text アクター行動時背景表示
 * @type boolean
 * @default true
 * @parent WindowContentsSetting
 * 
 * @param ActorSelectBackShow
 * @desc アクターの対象選択時に表示されるアクター背景を表示する。
 * @text アクターの対象選択時背景表示
 * @type boolean
 * @default true
 * @parent WindowContentsSetting
 * 
 * @param ActorContentsSetting
 * @text 各アクターステータス表示位置設定
 * @desc 各アクターステータスのコンテンツの表示位置を指定します。
 * @default []
 * @type struct<ActorContentsRect>[]
 * @parent WindowContentsSetting
 * 
 * @param Background
 * @text コンテンツ背景、前景画像設定
 * @default ------------------------------
 * @parent  ActorStatusWindowSetting
 * 
 * @param ActorBackground
 * @desc アクターの背景画像を指定します。
 * @text アクター背景画像
 * @type file
 * @default 
 * @dir img/
 * @parent Background
 * 
 * @param ActorFrontImg
 * @desc アクターの前景画像を指定する。（アクターグラフィックとステータスの間に表示）
 * @text 前景画像
 * @type file
 * @dir img/
 * @default 
 * @parent Background
 * 
 * @param ActorStatusActorWindow
 * @text アクター個別ウィンドウ設定
 * @default ------------------------------
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorStatusActorWindowShow
 * @desc アクター別のウィンドウを表示します。
 * @text アクター別ウィンドウ表示
 * @type boolean
 * @default false
 * @parent ActorStatusActorWindow
 * 
 * @param ActorWindowSkinSetting
 * @text アクターウィンドウスキン設定
 * @default ------------------------------
 * @parent ActorStatusWindowSetting
 * 
 * @param ActorWindowSkin
 * @desc ウィンドウスキンを指定します。
 * @text ウィンドウスキン画像
 * @type file
 * @dir img/system
 * @default 
 * @parent ActorWindowSkinSetting
 * 
 * @param ActorWindowColor
 * @text ウィンドウカラー
 * @desc ウィンドウの色の設定をします。空欄でデフォルト
 * @default 
 * @type struct<WindowTone>
 * @parent ActorWindowSkinSetting
 * 
 * @param ActorWindowSetting
 * @text アクターウィンドウ設定
 * @default ////////////////////////////////
 * 
 * @param DefaultActorWindow
 * @desc デフォルトのアクター選択ウィンドウを表示します。
 * @text アクター選択ウィンドウ表示
 * @type boolean
 * @default false
 * @parent ActorWindowSetting
 * 
 * @param ActorWindowFrameShow
 * @desc ウィンドウ枠を表示する。
 * @text ウィンドウ枠表示
 * @type boolean
 * @default false
 * @parent ActorWindowSetting
 * 
 * @param PartyCommandSettings
 * @text パーティコマンド設定
 * @default ////////////////////////////////
 * 
 * @param PartyCommandPosition
 * @text コマンドの表示位置
 * @desc カスタム選択時のパーティコマンドの表示位置を指定します。
 * @type select
 * @option 上部
 * @value 'top'
 * @option 中間
 * @value 'middle'
 * @option アクターステータスウィンドウの上
 * @value 'statuswindowtop'
 * @option 下部
 * @value 'under'
 * @option カスタム
 * @value 'custom'
 * @option デフォルト
 * @value 'default'
 * @option 従来処理
 * @value 'none'
 * @default 'default'
 * @parent PartyCommandSettings
 * 
 * @param PartyCommandMaxCol
 * @desc 表示するコマンド列数。
 * @text 表示コマンド列数
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * @parent PartyCommandSettings
 * 
 * @param PartyCommandMaxRow
 * @desc 表示するコマンド行数。
 * @text 表示コマンド行数
 * @type number
 * @default 4
 * @min 1
 * @max 99
 * @parent PartyCommandSettings
 * 
 * @param PartyCommandPositionSetting
 * @text 座標設定
 * @default ------------------------------
 * @parent PartyCommandSettings
 * 
 * @param PartyCommand_X
 * @desc パーティコマンドウィンドウのX座標を指定します。
 * @text コマンドウィンドウX座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent PartyCommandPositionSetting
 * 
 * @param PartyCommand_Y
 * @desc パーティコマンドウィンドウのY座標を指定します。
 * @text コマンドウィンドウY座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent PartyCommandPositionSetting
 * 
 * @param PartyCommand_Width
 * @desc パーティコマンドウィンドウの横幅を指定します。0でUI幅
 * @text コマンドウィンドウの横幅
 * @type number
 * @default 192
 * @max 9999
 * @min 0
 * @parent PartyCommandPositionSetting
 * 
 * @param PartyCommandOption
 * @text パーティコマンドオプション
 * @default ------------------------------
 * @parent PartyCommandSettings
 * 
 * @param PartyCommandWindowCenter
 * @text ウィンドウ座標中央表示
 * @desc ウィンドウを中央に表示させます。(デフォルト以外)
 * @type boolean
 * @default false
 * @parent PartyCommandOption
 * 
 * @param PartyCommandMode
 * @desc パーティコマンドの項目を中央寄りに表示させます。
 * @text コマンド表示中央寄り
 * @type boolean
 * @default false
 * @parent PartyCommandOption
 * 
 * @param PartyCommandBackgroundSetting
 * @text パーティコマンドウィンドウ背景設定
 * @default ------------------------------
 * @parent PartyCommandSettings
 * 
 * @param PartyCommandWindowBacgroundImg
 * @text パーティコマンドウィンドウ背景画像設定
 * @desc パーティコマンドウィンドウの背景画像を設定します。
 * @default 
 * @type struct<WindowBackgroundSetting>
 * @parent PartyCommandBackgroundSetting
 * 
 * @param BackgroundPartyCommandWindowFit
 * @desc 画像の表示位置をパーティコマンドウィンドウに合わせます。OFFでUI範囲(0,0)
 * @text パーティコマンドウィンドウ位置表示
 * @type boolean
 * @default true
 * @parent PartyCommandBackgroundSetting
 * 
 * @param PartyCommandWindowSkinSetting
 * @text パーティコマンドウィンドウ画像設定
 * @default ------------------------------
 * @parent PartyCommandSettings
 * 
 * @param PartyCommandWindowVisible
 * @desc ウィンドウ画像を不透明化。背景指定時はOFFにしてください。(OFFでコマンドのみ表示されます。)
 * @text ウィンドウ不透明化
 * @type boolean
 * @default true
 * @parent PartyCommandWindowSkinSetting
 * 
 * @param PartyCommandWindowSkin
 * @text ウィンドウスキン設定
 * @desc パーティコマンドウィンドウのスキンを設定します。
 * @type file
 * @dir img/system
 * @default 
 * @parent PartyCommandWindowSkinSetting
 * 
 * @param PartyCommandWindowColor
 * @text ウィンドウカラー
 * @desc ウィンドウの色の設定をします。空欄でデフォルト
 * @default 
 * @type struct<WindowTone>
 * @parent PartyCommandWindowSkinSetting
 * 
 * @param ActorCommandSettings
 * @text アクターコマンド設定
 * @default ////////////////////////////////
 * 
 * @param ActorCommandPosition
 * @text アクターコマンドの表示方法
 * @desc アクターコマンドの表示方法を選択します。
 * @type select
 * @option デフォルト(座標は固定です)
 * @value 'default'
 * @option 上部
 * @value 'top'
 * @option 中間
 * @value 'middle'
 * @option アクターステータスウィンドウの上
 * @value 'statuswindowtop'
 * @option 下部
 * @value 'under'
 * @option 各アクターの上
 * @value 'actor'
 * @option 各SVアクターの上（SV推奨）
 * @value 'svtop'
 * @option 各SVアクターの左（SV推奨）
 * @value 'svleft'
 * @option 各SVアクターの右（SV推奨）
 * @value 'svright'
 * @option カスタム
 * @value 'custom'
 * @option 従来処理
 * @value 'none'
 * @default 'default'
 * @parent ActorCommandSettings
 * 
 * @param ActorCommandMaxRow
 * @desc 表示できる最大コマンド行数。コマンド可変表示をOFFの場合はこの設定の値が適用されます。
 * @text 最大表示コマンド行数
 * @type number
 * @default 10
 * @min 1
 * @max 99
 * @parent ActorCommandSettings
 * 
 * @param ActorCommandMinRow
 * @desc 表示する最低コマンド行数。
 * @text コマンド可変表示時の表示最低コマンド行数
 * @type number
 * @default 4
 * @min 1
 * @max 99
 * @parent ActorCommandSettings
 * 
 * @param ActorCommandMaxCol
 * @desc 表示するコマンド列数。
 * @text 表示コマンド列数
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * @parent ActorCommandSettings
 * 
 * @param ActorCommandVariable
 * @desc アクターコマンドの表示数をコマンド数分表示します。（最大表示コマンド行数まで表示）
 * @text コマンド可変表示
 * @type boolean
 * @default true
 * @parent ActorCommandSettings
 * 
 * @param ActorCommandPositionSetting
 * @text 座標設定
 * @default ------------------------------
 * @parent ActorCommandSettings
 * 
 * @param ActorCommand_X
 * @desc アクターコマンドウィンドウのX座標を指定します。
 * @text コマンドウィンドウX座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent ActorCommandPositionSetting
 * 
 * @param ActorCommand_Y
 * @desc アクターコマンドウィンドウのY座標を指定します。
 * @text コマンドウィンドウY座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent ActorCommandPositionSetting
 * 
 * @param ActorCommand_Width
 * @desc アクターコマンドウィンドウの横幅を指定します。
 * @text コマンドウィンドウの横幅
 * @type number
 * @default 192
 * @max 9999
 * @min 0
 * @parent ActorCommandPositionSetting
 * 
 * @param ActorCommandOption
 * @text アクターコマンドオプション
 * @default ------------------------------
 * @parent ActorCommandSettings
 * 
 * @param ActorCommandWindowCenter
 * @text ウィンドウ座標中央表示
 * @desc ウィンドウを中央に表示させます。(デフォルト以外)
 * @type boolean
 * @default false
 * @parent ActorCommandOption
 * 
 * @param ActorCommandMode
 * @desc アクターコマンドの項目を中央寄りに表示させます。
 * @text コマンド表示中央寄り
 * @type boolean
 * @default false
 * @parent ActorCommandOption
 * 
 * @param ActorCommandHideWindow
 * @desc 特定のウィンドウが開いている間にアクターコマンドを非表示にするウィンドウを指定します。
 * @text アクターコマンド非表示対象ウィンドウ
 * @type combo[]
 * @option 'MessageWindow'
 * @option 'ItemWindow'
 * @option 'SkillWindow'
 * @option 'ActorWindow'
 * @option 'EnemyWindow'
 * @option 'EnemyBook'
 * @option 'Formation'
 * @default 
 * @parent ActorCommandOption
 * 
 * @param ActorCommandBackgroundSetting
 * @text アクターコマンドウィンドウ背景設定
 * @default ------------------------------
 * @parent ActorCommandSettings
 * 
 * @param ActorCommandWindowBacgroundImg
 * @text アクターコマンドウィンドウ背景画像設定
 * @desc アクターコマンドウィンドウの背景画像を設定します。
 * @default 
 * @type struct<WindowBackgroundSetting>
 * @parent ActorCommandBackgroundSetting
 * 
 * @param BackgroundActorCommandWindowFit
 * @desc 画像の表示位置をアクターコマンドウィンドウに合わせます。OFFでUI範囲(0,0)
 * @text アクターコマンドウィンドウ位置表示
 * @type boolean
 * @default true
 * @parent ActorCommandBackgroundSetting
 * 
 * @param ActorCommandWindowSkinSetting
 * @text アクターコマンドウィンドウ画像設定
 * @default ------------------------------
 * @parent ActorCommandSettings
 * 
 * @param ActorCommandWindowVisible
 * @desc ウィンドウ画像を不透明化。背景指定時はOFFにしてください。(OFFでコマンドのみ表示されます。)
 * @text ウィンドウ不透明化
 * @type boolean
 * @default true
 * @parent ActorCommandWindowSkinSetting
 * 
 * @param ActorCommandWindowSkin
 * @desc ウィンドウスキンを指定します。
 * @text ウィンドウスキン画像
 * @type file
 * @dir img/system
 * @default 
 * @parent ActorCommandWindowSkinSetting
 * 
 * @param ActorCommandWindowColor
 * @text ウィンドウカラー
 * @desc ウィンドウの色の設定をします。空欄でデフォルト
 * @default 
 * @type struct<WindowTone>
 * @parent ActorCommandWindowSkinSetting
 * 
 * @param ActorImgSetting
 * @text アクター画像設定
 * @default ------------------------------
 * 
 * @param ActorImgMode
 * @text アクターの画像モード
 * @desc アクターステータスに表示するアクターの画像。
 * @type select
 * @option なし
 * @value 'none'
 * @option 顔グラ
 * @value 'face'
 * @option 画像
 * @value 'imges'
 * @default 'face'
 * @parent ActorImgSetting
 * 
 * @param ActorImg_X
 * @desc 画像のX座標を設定します。
 * @text 画像X座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorImgSetting
 * 
 * @param ActorImg_Y
 * @desc 画像のY座標を設定します。
 * @text 画像Y座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorImgSetting
 * 
 * @param Img_SX
 * @desc 画像の表示開始座標X。
 * @text 画像表示開始座標X
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorImgSetting
 * 
 * @param Img_SY
 * @desc 画像の表示開始座標Y
 * @text 画像表示開始座標Y
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorImgSetting
 * 
 * @param Img_SW
 * @desc 画像の表示横幅。
 * @text 画像表示横幅
 * @type number
 * @default 0
 * @min 0
 * @max 9999
 * @parent ActorImgSetting
 * 
 * @param Img_SH
 * @desc 画像の表示縦幅。
 * @text 画像表示縦幅
 * @type number
 * @default 0
 * @min 0
 * @max 9999
 * @parent ActorImgSetting
 * 
 * @param ActorImgHPosition
 * @text 顔グラ横基準表示位置
 * @desc 顔グラの横の基準表示位置を指定します。
 * @type select
 * @option 画像左基準
 * @value 'left'
 * @option 画像中央基準
 * @value 'center'
 * @default 'center'
 * @parent ActorImgSetting
 * 
 * @param ActorImgVPosition
 * @text 画像縦基準表示位置
 * @desc 画像の縦の基準表示位置を指定します。(画像のみ)
 * @type select
 * @option 画像上基準
 * @value 'top'
 * @option 画像下基準
 * @value 'under'
 * @default 'under'
 * @parent ActorImgSetting
 * 
 * @param ImgHeight
 * @desc 画像の最大縦幅を指定します。（0でデフォルト）
 * @text 画像縦幅
 * @type number
 * @default 0
 * @min 0
 * @max 9999
 * @parent ActorImgSetting
 * 
 * @param ImgHeightOnWindow
 * @desc アクター画像の高さ範囲をウィンドウ内に納めます。
 * @text アクター画像ウィンドウ内表示
 * @type boolean
 * @default false
 * @parent ActorImgSetting
 * 
 * @param ActorSpecificSettings
 * @text アクター別設定
 * @default ------------------------------
 * @parent ActorImgSetting
 * 
 * @param ActorData
 * @text アクター座標、画像設定
 * @desc アクターの個別の座標、画像設定を行います。
 * @default []
 * @type struct<ActorDataList>[]
 * @parent ActorImgSetting
 * 
 * @param ActorStateAnimationPosition
 * @text アクターステートアニメーション設定
 * @default ------------------------------
 * @parent ActorImgSetting
 * 
 * @param StateAnimationShow
 * @desc アクター画像のステートアニメーションを表示します。フロントビューでアニメーションエフェクト表示有効時のみ
 * @text アクター画像ステートアニメーション表示
 * @type boolean
 * @default true
 * @parent ActorStateAnimationPosition
 * 
 * @param ActorState_X
 * @desc アクター画像毎のステートアニメーションのX座標。（相対座標）フロントビューでアニメーションエフェクト表示有効時のみ
 * @text ステートアニメーションX座標（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorStateAnimationPosition
 * 
 * @param ActorState_Y
 * @desc アクター画像毎のステートアニメーションのY座標。（相対座標）フロントビューでアニメーションエフェクト表示有効時のみ
 * @text ステートアニメーションY座標（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorStateAnimationPosition
 * 
 * @param ActorEffectSettings
 * @text アクターエフェクト設定
 * @default ////////////////////////////////
 * 
 * @param ActorEffectShow
 * @desc フロントビューでもアニメーションエフェクトを表示。
 * @text フロントビューエフェクト表示
 * @type boolean
 * @default false
 * @parent ActorEffectSettings
 * 
 * @param ActorEffect_X
 * @desc アニメーションエフェクトのX座標（相対座標）。
 * @text アニメーションエフェクトX座標（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorEffectSettings
 * 
 * @param ActorEffect_Y
 * @desc アニメーションエフェクトのY座標（相対座標）。
 * @text アニメーションエフェクトY座標（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorEffectSettings
 * 
 * @param ActorDamage_X
 * @desc ダメージエフェクトのX座標。（相対座標）
 * @text ダメージエフェクトX座標（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorEffectSettings
 * 
 * @param ActorDamage_Y
 * @desc ダメージエフェクトのY座標。（相対座標）
 * @text ダメージエフェクトY座標（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorEffectSettings
 * 
 * @param SelectActorHideWindow
 * @desc アクターウィンドウが表示されている間に非表示にするウィンドウを指定します。
 * @text 指定ウィンドウ非表示
 * @type combo[]
 * @option 'ItemWindow'
 * @option 'SkillWindow'
 * @default 
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
 * @option アクター名(1)(2)(3)(4)(5)(9)(11)(12)
 * @value DynamicName
 * @option 二つ名(1)(2)(3)(4)(5)(9)(11)(12)
 * @value Nickname
 * @option 職業(1)(2)(3)(4)(5)(9)(11)(12)
 * @value Class
 * @option レベル(1)(2)(3)(4)(5)(6)(9)(11)(12)(13)
 * @value Level
 * @option ステート(1)(2)(3)(4)(5)(16※1)
 * @value State
 * @option ステート2(1)(2)(3)(4)
 * @value State2
 * @option ターン(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)
 * @value Turn
 * @option 独自パラメータ(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(16)
 * @value OrgParam
 * @option 独自パラメータ(動的)(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(16)
 * @value DynamicOrgParam
 * @option HPゲージ(1)(2)(3)(4)(5)(7)(20)(21)(23)(24)
 * @value HpGauge
 * @option MPゲージ(1)(2)(3)(4)(5)(7)(20)(21)(23)(24)
 * @value MpGauge
 * @option TPゲージ(1)(2)(3)(4)(5)(7)(20)(21)(23)(24)
 * @value TpGauge
 * @option TPBゲージ(1)(2)(3)(4)(5)(7)(20)(21)(23)(24)
 * @value TpbGauge
 * @option CircularHP(1)(2)(3)(4)(7)(20)(21)(23)(24)
 * @value HpCircularGauge
 * @option CircularMP(1)(2)(3)(4)(7)(20)(23)
 * @value MpCircularGauge
 * @option CircularTP(1)(2)(3)(4)(7)(20))(23)
 * @value TpCircularGauge
 * @option CircularTPB(1)(2)(3)(4)(7)(20))(23)
 * @value TpbCircularGauge
 * @option 独自ゲージ(1)(2)(3)(4)(5)(7)(16)(18)(20)(21)(22)(23)(24)
 * @value OrgGauge
 * @option 画像(1)(2)(3)(4)(25)
 * @value Imges
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
 * @param DetaEval
 * @desc 評価式または文字列を記入します。ステートはステートID、ゲージは現在値
 * @text 評価式or文字列(javaScript)(16)
 * @type combo
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option 'actor;//アクターのゲームデータ'
 * @option 'actor.actor();//アクターのシステムデータ'
 * @default 
 * 
 * @param DetaEval2
 * @desc 評価式または文字列を記入します。ステートはバフ、ゲージは最大値
 * @text 評価式or文字列(javaScript)(22)
 * @type combo
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option 'actor;//アクターのゲームデータ'
 * @option 'actor.actor();//アクターのシステムデータ'
 * @default 
 * 
 * @param ParamID
 * @desc ステート、ゲージの識別ID。
 * @text 識別ID(20)
 * @type string
 * @default 
 * 
 * @param GaugeSetting
 * @text ゲージ設定
 * @default ------------------------------
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
/*~struct~ActorDataList:ja
 * 
 * @param ActorId
 * @text アクター
 * @desc アクターを指定します。0指定の場合はデフォルトの設定となります。
 * @type actor
 * @default 0
 * 
 * @param ActorStatusListDataSetting
 * @text アクター画像位置設定
 * @default アクターの画像モードをデフォルトに設定した場合、アクター画像位置設定の全ての設定がデフォルトの設定で適用されます。
 * 
 * @param StatusListData
 * @text 表示ステータス設定
 * @desc 表示するステータス情報を設定します。一つでも設定されていない場合はデフォルトの設定が適用されます。
 * @default 
 * @type struct<ActorStatusList>[]
 * @parent ActorStatusListDataSetting
 * 
 * @param ActorWindowSkinSetting
 * @text アクター別個別ウィンドウ設定
 * @default ------------------------------
 * 
 * @param ActorWindowSkin
 * @desc ウィンドウスキンを指定します。未指定の場合はデフォルトの設定が適用されます。
 * @text ウィンドウスキン画像
 * @type file
 * @dir img/system
 * @default 
 * @parent ActorWindowSkinSetting
 * 
 * @param ActorWindowColor
 * @text ウィンドウカラー
 * @desc ウィンドウの色の設定をします。
 * @default 
 * @type struct<WindowTone>
 * @parent ActorWindowSkinSetting
 * 
 * @param ActorCommandBackgroundSetting
 * @text アクターコマンドウィンドウ背景設定
 * @default ------------------------------
 * 
 * @param ActorCommandWindowBacgroundImg
 * @text アクターコマンドウィンドウ背景画像設定
 * @desc アクターコマンドウィンドウの背景画像を設定します。
 * @default 
 * @type struct<WindowBackgroundSetting>
 * @parent ActorCommandBackgroundSetting
 * 
 * @param ActorCommandSkinSetting
 * @text アクターコマンドスキン設定
 * @default ------------------------------
 * 
 * @param ActorCommandWindowSkin
 * @desc ウィンドウスキンを指定します。未指定の場合はデフォルトの設定が適用されます。
 * @text ウィンドウスキン画像
 * @type file
 * @dir img/system
 * @default 
 * @parent ActorCommandSkinSetting
 * 
 * @param ActorCommandWindowColor
 * @text ウィンドウカラー
 * @desc ウィンドウの色の設定をします。
 * @default 
 * @type struct<WindowTone>
 * @parent ActorCommandSkinSetting
 * 
 * @param Background
 * @text アクター画像設定
 * @default ------------------------------
 * 
 * @param ActorBackground
 * @desc アクターの背景画像を指定します。未指定の場合はデフォルトの設定が適用されます。
 * @text アクター背景画像
 * @type file
 * @default 
 * @dir img/
 * @parent Background
 * 
 * @param ActorFrontImg
 * @desc ステータス背後の背景画像を指定する。未指定の場合はデフォルトの設定が適用されます。
 * @text ステータス背後背景画像
 * @type file
 * @dir img/
 * @default 
 * @parent Background
 * 
 * @param ActorImgPositionSetting
 * @text アクター画像位置設定
 * @default アクターの画像モードをデフォルトに設定した場合、アクター画像位置設定の全ての設定がデフォルトの設定で適用されます。
 * 
 * @param ActorImgMode
 * @text アクターの画像モード
 * @desc アクターステータスに表示するアクターの画像。
 * @type select
 * @option なし
 * @value 'none'
 * @option デフォルト
 * @value 'default'
 * @option 顔グラ
 * @value 'face'
 * @option 画像
 * @value 'imges'
 * @default 'default'
 * @parent ActorImgPositionSetting
 * 
 * @param Actor_X
 * @desc 画像のX座標。
 * @text 画像X座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorImgPositionSetting
 * 
 * @param Actor_Y
 * @desc 画像のY座標。
 * @text 画像Y座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorImgPositionSetting
 * 
 * @param Img_SX
 * @desc 画像の表示開始座標X。
 * @text 画像表示開始座標X
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorImgPositionSetting
 * 
 * @param Img_SY
 * @desc 画像の表示開始座標Y
 * @text 画像表示開始座標Y
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorImgPositionSetting
 * 
 * @param Img_SW
 * @desc 画像の表示横幅。
 * @text 画像表示横幅
 * @type number
 * @default 0
 * @min 0
 * @max 9999
 * @parent ActorImgPositionSetting
 * 
 * @param Img_SH
 * @desc 画像の表示縦幅。
 * @text 画像表示縦幅
 * @type number
 * @default 0
 * @min 0
 * @max 9999
 * @parent ActorImgPositionSetting
 * 
 * @param ActorImgHPosition
 * @text 顔グラ横基準表示位置
 * @desc 顔グラの横の基準表示位置を指定します。
 * @type select
 * @option 画像左基準
 * @value 'left'
 * @option 画像中央基準
 * @value 'center'
 * @default 'center'
 * @parent ActorImgPositionSetting
 * 
 * @param ActorImgVPosition
 * @text 画像縦基準表示位置
 * @desc 画像の縦の基準表示位置を指定します。(画像のみ)
 * @type select
 * @option 画像上基準
 * @value 'top'
 * @option 画像下基準
 * @value 'under'
 * @default 'under'
 * @parent ActorImgPositionSetting
 * 
 * @param ActorStateAnimationPosition
 * @text アクターステートアニメーション設定
 * @default ------------------------------
 * 
 * @param ActorState_X
 * @desc アクター画像毎のステートアニメーションのX座標。0以外で有効
 * @text ステートアニメーションX座標（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorStateAnimationPosition
 * 
 * @param ActorState_Y
 * @desc アクター画像毎のステートアニメーションのY座標。0以外で有効
 * @text ステートアニメーションY座標（相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * @parent ActorStateAnimationPosition
 * 
 */
/*~struct~ActorBattlerImgSetting:ja
 * 
 * @param ActorId
 * @text アクター
 * @desc アクターを指定します。
 * @type actor
 * @default 0
 * 
 * @param BattlerActorImg
 * @text アクター画像設定
 * @desc アクター画像の設定を行います。
 * @default []
 * @type struct<ActorBattlerImgList>[]
 * 
 */
/*~struct~ActorBattlerImgList:ja
 * 
 * @param GraphicImg
 * @text アクター画像
 * @desc アクターの画像を設定します。複数指定の場合はランダムに表示されます。
 * @type file[]
 * @dir img/
 * 
 * @param FaceImg
 * @text 顔グラ画像
 * @desc 顔グラ画像のスプライトシートを設定します。
 * @type file
 * @dir img/faces
 * 
 * @param FaceIndex
 * @text 顔グラのインデックスID
 * @desc 顔グラのインデックスID。
 * @type number
 * @default -1
 * @min -1
 * 
 * @param Opacity
 * @text 画像不透明度
 * @desc 画像の不透明度を指定します。
 * @type number
 * @default 255
 * @min 0
 * @max 255
 * 
 * @param AllMatch
 * @text 全条件一致
 * @default ------------------------------
 * 
 * @param ChangeGraphicScenes
 * @text 変化シーン
 * @desc グラフィックの変化シーンを選択します。
 * @type select
 * @option 通常
 * @value 'default'
 * @option 戦闘不能
 * @value 'death'
 * @option 瀕死
 * @value 'dying'
 * @option ダメージ時
 * @value 'damage'
 * @option クリティカルダメージ時
 * @value 'cridamage'
 * @option 回復時
 * @value 'recovery'
 * @option 攻撃スキル使用時(1)
 * @value 'attack'
 * @option 回復スキル使用時(1)
 * @value 'recoverySkill'
 * @option アイテム使用時(2)
 * @value 'item'
 * @option 反撃時
 * @value 'counter'
 * @option 魔法反射時
 * @value 'reflection'
 * @option 反撃時(CounterExtend)(4)
 * @value 'counterEX'
 * @option 防御時
 * @value 'guard'
 * @option 詠唱時
 * @value 'chant'
 * @option 勝利時
 * @value 'victory'
 * @option 被ステート(3)
 * @value 'state'
 * @option コマンド選択時
 * @value 'command'
 * @option ファイナルアタック時(1) 要NUUN_FinalAttack
 * @value 'finalAttack'
 * @default 'default'
 * @parent AllMatch
 * 
 * @param ImgHP
 * @text 残りHP
 * @desc 残りHPが指定の範囲内または数値の時に変化します。
 * @type struct<CondValue>
 * @default {"CondValid":"false","UpLimit":"0","DwLimit":"0"}
 * @parent AllMatch
 * 
 * @param ImgSwitch
 * @text スイッチ
 * @desc 指定したスイッチが全てONの時に変化します。
 * @type switch[]
 * @default
 * @parent AllMatch
 * 
 * @param ImgWeapon
 * @text 武器
 * @desc 指定した武器を全て装備している時に条件を満たします。
 * @type weapon[]
 * @default 
 * @parent AllMatch
 * 
 * @param ImgArmor
 * @text 防具
 * @desc 指定した防具を全て装備している時に条件を満たします。
 * @type armor[]
 * @default 
 * @parent AllMatch
 * 
 * @param ImgClass
 * @text 職業
 * @desc 特定の職業なら条件を満たします。
 * @type class
 * @default 0
 * @parent AllMatch
 * 
 * @param ImgStateAll
 * @text ステート。
 * @desc 指定したステートに全てかかっている時に条件を満たします。
 * @type state[]
 * @default 
 * @parent AllMatch
 * 
 * @param Level
 * @text レベル
 * @desc レベルが指定のレベル以上の時に条件を満たします。
 * @type number
 * @default 1
 * @parent AllMatch
 * 
 * @param CondSetting
 * @text 条件設定
 * @default ------------------------------
 * 
 * @param Skill
 * @text スキル(1)
 * @desc スキルを選択します。いずれかのスキル使用時に適用します。空白、なしの場合は全てのスキルが対象です。
 * @type skill[]
 * @default
 * @parent CondSetting
 * 
 * @param Item
 * @text アイテム(2)
 * @desc アイテムを選択します。いずれかのアイテム使用時に適用します。空白、なしの場合は全てのアイテムが対象です。
 * @type item[]
 * @default
 * @parent CondSetting
 * 
 * @param stateId
 * @text 被ステート(3)
 * @desc ステートを選択します。全てのステートにかかっている時に適用します。
 * @type state[]
 * @default 
 * @parent CondSetting
 * 
 * @param Id
 * @text 識別タグ(4)
 * @desc 識別タグを指定します。全ての識別タグが該当しているときに適用します。
 * @type string[]
 * @default 
 * @parent CondSetting
*/
/*~struct~CondValue:ja
* 
* @param CondValid
* @desc HP条件を有効にします。
* @text HP条件有効
* @type boolean
* @default false
* 
* @param UpLimit
* @text 上限値
* @desc 上限値
* @type number
* @default 0
* 
* @param DwLimit
* @text 下限値
* @desc 下限値
* @type number
* @default 0
* 
*/
/*~struct~ActorContentsRect:ja
 * 
 * @param ActorContentsCoordinateMode
 * @text 座標モード
 * @desc 座標モードを指定します。ON:絶対座標 OFF:相対座標
 * @type boolean
 * @default false
 * 
 * @param ActorContentsX
 * @desc アクターステータスウィンドウのコンテンツ表示のX座標を指定します。(相対)
 * @text X座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param ActorContentsY
 * @desc アクターステータスウィンドウのコンテンツ表示のY座標を指定します。(相対)
 * @text Y座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param ActorContentsWidth
 * @desc アクターステータスウィンドウのコンテンツ表示の横幅を指定します。0で通常表示幅
 * @text 横幅
 * @type number
 * @default 0
 * @min 0
 * @max 999
 * 
 * @param ActorContentsHeight
 * @desc アクターステータスウィンドウのコンテンツ表示の縦幅を指定します。0で通常表示幅
 * @text 縦幅
 * @type number
 * @default 0
 * @min 0
 * @max 24
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
/*~struct~WindowTone:ja
 * 
 * @param red
 * @desc 赤
 * @text 赤
 * @type number
 * @default 0
 * @max 255
 * @min -255
 * 
 * @param green
 * @text 緑
 * @desc 緑
 * @type number
 * @default 0
 * @max 255
 * @min -255
 * 
 * @param bule
 * @text 青
 * @desc 青
 * @type number
 * @default 0
 * @max 255
 * @min -255
 * 
 */
var Imported = Imported || {};
Imported.NUUN_BattleStyleEX = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    const parameters = PluginManager.parameters('NUUN_BattleStyleEX');

    const _tempParams = new Nuun_TempParam();
    const pluginName = "NUUN_BattleStyleEX";

    PluginManager.registerCommand(pluginName, 'ChangeBattleLayout', args => {
        const battleStyle = BattleLayout.find(data => data.StyleName === eval(args.BattleLayoutStyle));
        if (battleStyle && !$gameParty.inBattle()) {
            $gameSystem.setBattleStyle(battleStyle.StyleName);
        }
    });

    PluginManager.registerCommand(pluginName, 'ActorStatusWindowVisible', args => {
        BattleManager.statusWindowVisible(eval(args.WindowVisible));
    });


    class Nuun_BattleLayoutData {
        constructor(_scene) {
            this._scene = _scene;
            this._data = null;
            this._svActorData = [];
        }

        setStyle() {
            if (params.BattleLayoutVar > 0 && $gameVariables.value(params.BattleLayoutVar) > 0) {
                const style = params.BattleLayout[$gameVariables.value(params.BattleLayoutVar) - 1];
                this._data =  style ? style : params.BattleLayout.find(data => data.StyleName === params.BattleLayoutStyle);
            } else {
                this._data = params.BattleLayout.find(data => data.StyleName === params.BattleLayoutStyle);
            }
        }

        getActorData(actor) {
            return this._data && this._data.ActorData.find(data => actor && data.ActorId === actor.actorId()) || null;
        }

        getBattlerActors() {
            return NuunManager.getBattlerActors();
        }

        getBattleStatusList() {
            return this._data.BattleStatusList;
        }

        getActorBattleStatusList(battler) {
            if (!battler || !battler.isActor()) return this.getBattleStatusList();
            const data = this.getActorData(battler);
            return data && data.StatusListData && data.StatusListData.length > 0 ? data.StatusListData : this.getBattleStatusList();
        }

        isDefaultActorWindow() {
            return this._data.DefaultActorWindow;
        }

        getActorMaxCol() {
            return this._data.ActorMaxCol || 4;
        }

        getActorMaxRow() {
            return this._data.ActorMaxRow || 1;
        }

        getActorStatusWidth() {
            return this._data.ActorStatusWidth;
        }

        getActorStatusHeight() {
            return this._data.ActorStatusHeight;
        }
        
        getActorStatusX() {
            return this._data.ActorStatusX;
        }

        getActorStatusY() {
            return this._data.ActorStatusY;
        }

        isPartyCommandWindowCenter() {
            return this._data.PartyCommandWindowCenter;
        }

        isPartyCommandMode() {
            return this._data.PartyCommandMode;
        }

        getPartyCommandPosition() {
            return this._data.PartyCommandPosition;
        }

        getPartyCommand_Width() {
            return this._data.PartyCommand_Width;
        }

        getPartyCommand_X() {
            return this._data.PartyCommand_X;
        }

        getPartyCommand_Y() {
            return this._data.PartyCommand_Y;
        }

        getPartyCommandMaxCol() {
            return this._data.PartyCommandMaxCol;
        }

        getPartyCommandMaxRow() {
            return this._data.PartyCommandMaxRow;
        }

        isActorCommandWindowCenter() {
            return this._data.ActorCommandWindowCenter;
        }

        isActorCommandMode() {
            return this._data.ActorCommandMode;
        }

        isActorCommandVariable() {
            return this._data.ActorCommandVariable;
        }

        getActorCommandPosition() {
            return this._data.ActorCommandPosition;
        }

        getActorCommand_Width() {
            return this._data.ActorCommand_Width;
        }

        getActorCommand_X() {
            return this._data.ActorCommand_X;
        }

        getActorCommand_Y() {
            return this._data.ActorCommand_Y;
        }

        getActorCommandMaxCol() {
            return this._data.ActorCommandMaxCol;
        }

        getActorCommandMinRow() {
            return this._data.ActorCommandMinRow;
        }

        getActorCommandMaxRow() {
            return this._data.ActorCommandMaxRow;
        }

        isActoyCommandWindowCenter() {
            return this._data.ActorCommandWindowCenter;
        }

        getActorCommandHideWindow() {
            return this._data.ActorCommandHideWindow || [];
        }

        getCommandSubtraction() {
            return this._data.CommandSubtraction;
        }

        getCommandShiftMode() {
            return this._data.CommandShiftMode;
        }

        isFrontViewActorEffectShow() {
            return this._data.ActorEffectShow;
        }

        isCommandRightMode() {
            return this._data.CommandRightMode;
        }

        getActorEffect_X() {
            return this._data.ActorEffect_X;
        }

        getActorEffect_Y() {
            return this._data.ActorEffect_Y;
        }

        ActorDamage_X() {
            return this._data.ActorDamage_X;
        }

        ActorDamage_Y() {
            return this._data.ActorDamage_Y;
        }

        isWindowShow() {
            return this._data.WindowShow;
        }

        isWindowFrameShow() {
            return this._data.WindowFrameShow;
        }

        isActorWindowFrameShow() {
            return this._data.ActorWindowFrameShow;
        }

        isContentsBackShow() {
            return this._data.ContentsBackShow;
        }

        getActorStatusWindowBacgroundImg() {
            return this._data.ActorStatusWindowBacgroundImg ? this._data.ActorStatusWindowBacgroundImg.BackgroundImg : null;
        }

        getActorStatusWindowBacgroundImgX() {
            return this._data.ActorStatusWindowBacgroundImg.Background_X;
        }

        getActorStatusWindowBacgroundImgY() {
            return this._data.ActorStatusWindowBacgroundImg.Background_Y;
        }

        isBackgroundStatusWindowFit() {
            return this._data.BackgroundStatusWindowFit;
        }

        getPartyCommandWindowBacgroundImg() {
            return this._data.PartyCommandWindowBacgroundImg ? this._data.PartyCommandWindowBacgroundImg.BackgroundImg : null;
        }

        getPartyCommandWindowBacgroundImgX() {
            return this._data.PartyCommandWindowBacgroundImg.Background_X;
        }

        getPartyCommandWindowBacgroundImgY() {
            return this._data.PartyCommandWindowBacgroundImg.Background_Y;
        }

        isBackgroundPartyCommandWindowFit() {
            return this._data.BackgroundPartyCommandWindowFit;
        }

        isActorCommandWindowBacgroundImg() {
            return this._data.ActorCommandWindowBacgroundImg;
        }

        getActorCommandWindowBacgroundImg(data) {
            return data && data.ActorCommandWindowBacgroundImg ? data.ActorCommandWindowBacgroundImg.BackgroundImg : this.getActorCommandCommonWindowBacgroundImg();
        }

        getActorCommandCommonWindowBacgroundImg() {
            return this._data.ActorCommandWindowBacgroundImg ? this._data.ActorCommandWindowBacgroundImg.BackgroundImg : null;
        }

        getActorCommandWindowBacgroundImgX(data) {
            return data && data.ActorCommandWindowBacgroundImg ? data.ActorCommandWindowBacgroundImg.Background_X : this._data.ActorCommandWindowBacgroundImg.Background_X;
        }

        getActorCommandWindowBacgroundImgY(data) {
            return data && data.ActorCommandWindowBacgroundImg ? data.ActorCommandWindowBacgroundImg.Background_Y : this._data.ActorCommandWindowBacgroundImg.Background_Y;
        }

        isBackgroundActorCommandWindowFit() {
            return this._data.BackgroundPartyCommandWindowFit;
        }

        isContentsBackVisible() {
            return !this.isActorStatusActorWindowShow() && this.isContentsBackShow();
        }

        getActorStatusWindowBesideMode() {
            return this._data.ActorStatusWindowBesideMode;
        }

        getActorStatusWindowVerticalMode() {
            return this._data.ActorStatusWindowVerticalMode;
        }

        getActorStatusBesideMode() {
            return this._data.ActorStatusBesideMode;
        }

        getActorStatusVerticalMode() {
            return this._data.ActorStatusVerticalMode;
        }

        getActorContentsSetting() {
            return this._data.ActorContentsSetting;
        }

        isStateAnimationShow() {
            return this._data.StateAnimationShow;
        }

        isFrontAnimation() {
            return !$gameSystem.isSideView() && this.isFrontViewActorEffectShow();
        }

        isStateAnimation() {
            return this.isFrontAnimation() && this.isStateAnimationShow();
        }

        getActorState_X() {
            return this._data.ActorState_X;
        }

        getActorState_Y() {
            return this._data.ActorState_Y;
        }

        isAnimationShouldMirror() {
            return params.ActorsMirror;
        }

        getWindowSkin(method) {
            return this._data[method];
        }

        getWindowSkinEx(data, method) {
            return data && data[method] ? data[method] : this.getWindowSkin(method);
        }

        getWindowColor(method) {
            return this._data[method];
        }
        
        getWindowColorEx(data, method) {
            return data && data[method] ? data[method] : this.getWindowColor(method);
        }

        getWindowVisible(method) {
            return this._data[method];
        }

        getActorImgModeData(data) {
            return data ? data.ActorImgMode : this._data.ActorImgMode;
        }

        getActorImg_X(data) {
            return data && this.getActorImgModeData(data) !== 'default' ? data.Actor_X : this._data.ActorImg_X;
        }

        getActorImg_Y(data) {
            return data && this.getActorImgModeData(data) !== 'default' ? data.Actor_Y : this._data.ActorImg_Y;
        }

        getImg_SX(data) {
            return data && this.getActorImgModeData(data) !== 'default' ? data.Img_SX : this._data.Img_SX;
        }

        getImg_SY(data) {
            return data && this.getActorImgModeData(data) !== 'default' ? data.Img_SY : this._data.Img_SY;
        }

        getImg_SW(data) {
            return data && this.getActorImgModeData(data) !== 'default' ? data.Img_SW : this._data.Img_SW;
        }

        getImg_SH(data) {
            return data && this.getActorImgModeData(data) !== 'default' ? data.Img_SH : this._data.Img_SH;
        }

        getActorImgHPosition(data) {
            return data && this.getActorImgModeData(data) !== 'default' ? data.ActorImgHPosition : this._data.ActorImgHPosition;
        }

        getActorImgVPosition(data) {
            return data && this.getActorImgModeData(data) !== 'default' ? data.ActorImgVPosition : this._data.ActorImgVPosition;
        }

        getActorImgMode(data) {
            return data && this.getActorImgModeData(data) !== 'default' ? data.ActorImgMode : this._data.ActorImgMode;
        }

        getActorBackground(data) {
            return data && data.ActorBackground ? data.ActorBackground : this._data.ActorBackground;
        }

        getActorFrontImg(data) {
            return data && data.ActorFrontImg ? data.ActorFrontImg : this._data.ActorFrontImg;
        }

        getActorContents(index) {
            try {
                return this.getActorContentsSetting()[index];
            } catch (error) {
                return null;
            }
        }

        getStatusWindow() {
            return this._scene._statusWindow;
        }

        isActorStatusActorWindowShow() {
            return this._data.ActorStatusActorWindowShow;
        }

        getBattleActorImgMode() {
            return this._data.BattleActorImg;
        }

        getSelectActorHideWindow() {
            return this._data.SelectActorHideWindow || [];
        }

        isSelectBackShow() {
            return this._data.SelectBackShow;
        }

        isActorSelectBackShow() {
            return this._data.ActorSelectBackShow;
        }

        isActorSelectBackVisible() {
            return !this.isActorStatusActorWindowShow() && this.isActorSelectBackShow();
        }

        getFaceHeight() {
            return this._data.ImgHeight || 144;
        }

        getImgHeight() {
            return this._data.ImgHeight || 0;
        }

        isFaceHeightOnWindow() {
            return this._data.ImgHeightOnWindow;
        }

        getNoStateIcon() {
            return params.NoStateIcon || 0;
        }

        getNotVisibleStateIcons() {
            return this._data.NotVisibleStateIcons || [];
        }

        getNotVisibleBuffIcons() {
            return this._data.NotVisibleBuffIcons || [];
        }

        getCommandWidth() {
            switch (this.getCommandShiftMode()) {
                case 'party':
                    return this.getPartyCommandWidth();
                case 'actor':
                    return this.getActorCommandWidth();
                default:
                    return 0;
            }
        }

        getActorWindowWidthCommandSubtraction() {
            const ww = this.getActorStatusWindowWidth();
            return Math.min((this.getCommandSubtraction() ? ww - this.getCommandWidth() : ww) , Graphics.width);
        }

        getActorWindowXCommandSubtraction() {
            return (this.getCommandSubtraction() && !this._scene.isRightInputMode() ? this.getCommandWidth() : 0) + this.getActorWindowX();
        }

        getActorStatusWindowWidth() {
            return this.getActorStatusWidth() > 0 ? this.getActorStatusWidth() : Graphics.boxWidth;
        }

        getActorStatusWindowHeight() {
            return  this.getActorStatusHeight() > 0 ? this.getActorStatusHeight() : this._scene.windowAreaHeight() + (this.isWindowFrameShow() ? 0 : this.extra());
        }

        getActorWindowX() {
            return this.getActorStatusX() + this.getActorStatusBesideX();
        }

        getActorWindowY() {
            return this.getActorStatusY() + this.getActorStatusVerticalY();
        }

        extra() {
            return 10;
        }

        activeActorWindow() {
            return this._scene._actorWindow && this._scene._actorWindow.active;
        }

        setPartyCommandPosition(rect) {
            switch (this.getPartyCommandPosition()) {
                case 'default':
                    rect.width = this.partyCommandWidth(1);
                    rect.x = (this._scene.isRightInputMode() ? this._scene._statusWindow.x + this._scene._statusWindow.width : 0) - ((Graphics.width - Graphics.boxWidth) / 2);
                    rect.y = this.partyCommand_YPosition();
                    break;
                case 'custom':
                    rect.width = this.partyCommandWidth(1);
                    rect.x = this.getPartyCommandX();
                    rect.y = this.partyCommand_YPosition();  
                case 'top':
                    rect.width = this.partyCommandWidth(0);
                    rect.x = this.getPartyCommandX();
                    rect.y = this.partyCommand_YPosition();
                    break;
                case 'middle':
                    rect.width = this.partyCommandWidth(0);
                    rect.x = this.getPartyCommandX();
                    rect.y = this.partyCommand_YPosition();
                    break;
                case 'under':
                    rect.width = this.partyCommandWidth(0);
                    rect.x = this.getPartyCommandX();
                    rect.y = this.partyCommand_YPosition();
                    break;
                case 'statuswindowtop':
                    rect.width = this.partyCommandWidth(0);
                    rect.x = this.getPartyCommandX();
                    rect.y = this.partyCommand_YPosition();
                    break;
                default:
                    rect.x -= ((Graphics.width - Graphics.boxWidth) / 2);
                    rect.y = this.partyCommand_YPosition();
                    break;    
                }
            rect.height = this.partyWindowAreaHeight();
            return rect;
        }

        getPartyCommandWidth() {
            const mode = this.getPartyCommandPosition();
            switch (mode) {
                case 'top':
                case 'middle':
                case 'under':
                case 'statuswindowtop':
                    return this.partyCommandWidth();
                default:
                    return this.partyCommandDefaultWidth();
            }
        }

        partyCommand_YPosition() {
            const mode = this.getPartyCommandPosition();
            switch (mode) {
                case 'default':
                    return this._scene._statusWindow.y + (Graphics.boxHeight - Graphics.height) / 2 + this.getCommandBoxY() + this.getPartyCommand_Y();
                case 'custom':
                    return this.getPartyCommand_Y();
                case 'top':
                    return this.getPartyCommand_Y();
                case 'middle':
                    return (this._scene._statusWindow.y + (Graphics.boxHeight - Graphics.height) / 2 + 4) / 2 - (this.partyWindowAreaHeight() / 2) + this.getPartyCommand_Y();
                case 'under':
                    return Graphics.boxHeight - this.partyWindowAreaHeight() + this.getPartyCommand_Y();
                case 'statuswindowtop':
                    return this._scene._statusWindow.y + ((Graphics.boxHeight - Graphics.height) / 2) - this.partyWindowAreaHeight() + this.getPartyCommand_Y();
                default:
                    return 0;
            }
        }

        partyCommandDefaultWidth() {
            return this.getPartyCommand_Width() > 0 ? Math.min(this.getPartyCommand_Width(), Graphics.width) : 192;
        }
        
        partyCommandWidth() {
            return this.getPartyCommand_Width() > 0 ? Math.min(this.getPartyCommand_Width(), Graphics.width) : Graphics.boxWidth;
        }
    
        partyWindowAreaHeight() {
            return this._scene.calcWindowHeight(this.getPartyCommandMaxRow(), true);
        }
    
        getPartyCommandX() {
            const mode = this.getPartyCommandPosition();
            switch (mode) {
                case 'top':
                case 'middle':
                case 'under':
                case 'statuswindowtop':
                    return this.getPartyCommand_X() + (this.isPartyCommandWindowCenter() ? this.partyCommandCenter() : 0);
                default:
                    return this.getPartyCommand_X();
            }
        }

        partyCommandCenter() {
            return (Graphics.boxWidth - this.getPartyCommandWidth()) / 2;
        }

        getActorCommandWidth() {
            const mode = this.getActorCommandPosition();
            switch (mode) {
                case 'top':
                case 'middle':
                case 'under':
                case 'statuswindowtop':
                    return this.actorCommandWidth();
                default:
                    return this.actorCommandDefaultWidth();
            }
        }

        getActorCommand_XPosition(rect) {
            const mode = this.getActorCommandPosition();
            switch (mode) {
                case 'top':
                case 'middle':
                case 'under':
                case 'statuswindowtop':
                case 'custom':
                    return this.getActorCommand_X() + (this.isActoyCommandWindowCenter() ? this.actorCommandCenter() : 0);
                case 'default':
                    return (this._scene.isRightInputMode() ? this._scene._statusWindow.x + this._scene._statusWindow.width : 0) - ((Graphics.width - Graphics.boxWidth) / 2);
                case 'none':
                    return rect.x;
                default:
                    return this.getActorCommand_X();
            }
        }
        
        getActorCommand_YPosition(rect) {
            const mode = this.getActorCommandPosition();
            switch (mode) {
                case 'default':
                    return this._scene._statusWindow.y + (Graphics.boxHeight - Graphics.height) / 2 + this.getCommandBoxY() + this.getActorCommand_Y();
                case 'custom':
                case 'top':
                    return this.getActorCommand_Y();
                case 'none': 
                    return rect.y;
                case 'middle':
                case 'under':
                case 'statuswindowtop':
                default:
                    return 0;
            }
        }

        getCommandBoxY() {
            return (this.isWindowFrameShow() ? 0 : 4)
        }

        actorCommandDefaultWidth() {
            return this.getActorCommand_Width() > 0 ? Math.min(this.getActorCommand_Width(), Graphics.width) : 192;
        }

        actorCommandWidth() {
            return this.getActorCommand_Width() > 0 ? Math.min(this.getActorCommand_Width(), Graphics.width) : Graphics.boxWidth;
        }

        actorCommandHeight() {
            return this._scene.calcWindowHeight(this.getActorCommandMaxRow(), true);
        }

        actorCommandAreaHeight() {
            return this._scene.calcWindowHeight(this.getActorCommandMaxRow(), true);
        }
    
        actorCommandCenter() {
            return (Graphics.boxWidth - this.getActorCommandWidth()) / 2;  
        }

        getActorStatusBesideX () {
            switch (this.getActorStatusWindowBesideMode()) {
                case 'left':
                    return (Graphics.width - Graphics.boxWidth) / 2; 
                case 'center':
                    return (Graphics.width / 2) - (this.getActorStatusWindowWidth() / 2);
                case 'right':
                    return Graphics.boxWidth - this.getActorStatusWindowWidth() + (Graphics.width - Graphics.boxWidth) / 2;
            };
        }
          
        getActorStatusVerticalY() {
            switch (this.getActorStatusWindowVerticalMode()) {
                case 'top':
                    return (Graphics.height - Graphics.boxHeight) / 2 + (this.isWindowFrameShow() ? 0 : - 4);
                case 'under':
                    return (Graphics.boxHeight - this.getActorStatusWindowHeight() + (this.isWindowFrameShow() ? 0 : this.extra() - 4)) + ((Graphics.height - Graphics.boxHeight) / 2);
            };
        }

        getCommandoShiftWidth() {
            switch (this.getCommandShiftMode()) {
                case 'party':
                    return this.getPartyCommandWidth();
                case 'actor':
                    return this.actorCommandWidth();
                case 'none':
                    return 0;
                default:
                    return 0;
            }
        }

        actorCommandRefresh(_window) {
            const actorIndex = _window.selectActor(_window._actor);
            const statuWindow = this._scene._statusWindow;
            let data = null;
            if (statuWindow && _window._actor || actorIndex >= 0) {
                const rect = statuWindow.itemRect(actorIndex);
                switch (this.getActorCommandPosition()) {
                    case 'actor':
                        if (!!_window.supportActorCommandPosition && _window.supportActorCommandPosition()) {
                            break;
                        }
                        _window.x = rect.x + (statuWindow.x - ((Graphics.width - Graphics.boxWidth) / 2)) + statuWindow.itemPadding() + ((rect.width - _window.width) / 2) + this.getActorCommand_X();
                        _window.y = (statuWindow.y + rect.y + _window._homeY) - (_window.height + 4) - ((Graphics.height - Graphics.boxHeight) / 2) + this.getActorCommand_Y();
                        break;
                    case 'svtop':
                        data = this.getSvActor(actorIndex);
                        if (data) {
                            _window.x = data.x - (_window.width + data.width) / 2 + 32 + this.getActorCommand_X();
                            _window.y = data.y - (_window.height + data.height + 48) + this.getActorCommand_Y();
                        }
                        break;
                    case 'svleft':
                        data = this.getSvActor(actorIndex);
                        _window.x = data.x - _window.width - 32 + this.getActorCommand_X()
                        _window.y = data.y - (_window.height + data.height + 48) / 2 + this.getActorCommand_Y();
                        break;
                    case 'svright':
                        data = this.getSvActor(actorIndex);
                        _window.x = data.x + 32 + this.getActorCommand_X()
                        _window.y = data.y - (_window.height + data.height + 48) / 2 + this.getActorCommand_Y();
                        break;
                    case 'top':
                        _window.y = _window._homeY;
                        break;
                    case 'middle':
                        _window.y = _window._homeY - Math.floor(_window.height / 2);
                        break;
                    case 'custom':
                        _window.y = _window._homeY;
                        break;
                    case 'statuswindowtop':
                        _window.y = _window._homeY + statuWindow.y - _window.height - ((Graphics.height - Graphics.boxHeight) / 2);
                        break;
                    default:
                        _window.y = this.isActorCommandVariable() ? _window._homeY + (Graphics.boxHeight - (_window._homeY + _window.height)) : _window._homeY;
                        break;
                }
            }
        }

        setSvActorSprites() {
            this._svActorData = this._scene._spriteset._actorSprites;
        }

        getSvActor(index) {
            return this._svActorData[index];
        }

        setFrontActor(index, sprite) {
            if (NuunManager.styleData.isFrontAnimation()) {
                this._svActorData[index].setFrontActor(sprite);
            }
        }

        getGraphicsData(actor) {
            if (params.ActorGraphics) {
                return params.ActorGraphics.find(data => data.ActorId === actor.actorId());
            }
        }

        commandRefresh() {
            this._commandRefresh = true;
        }

        clearCommandRefresh() {
            this._commandRefresh = false;
        }

        isCommandRefresh() {
            return this._commandRefresh;
        }

        getBackgroundX() {
            return (this.isBackgroundStatusWindowFit() ? this._scene._statusWindow.x : 0) + this.getActorStatusWindowBacgroundImgX();
        }

        getBackgroundY() {
            return (this.isBackgroundStatusWindowFit() ? this._scene._statusWindow.y : 0) + this.getActorStatusWindowBacgroundImgY();
        }

        getPartyCommandBackgroundX() {
            return (this.isBackgroundPartyCommandWindowFit() ? this._scene._partyCommandWindow.x : 0) + this.getPartyCommandWindowBacgroundImgX();
        }

        getPartyCommandBackgroundY() {
            return (this.isBackgroundPartyCommandWindowFit() ? this._scene._partyCommandWindow.y : 0) + this.getPartyCommandWindowBacgroundImgY();
        }

        getActorCommandBackgroundX(data) {
            return (this.isBackgroundActorCommandWindowFit() ? this._scene._actorCommandWindow.x : 0) + this.getActorCommandWindowBacgroundImgX(data);
        }

        getActorCommandBackgroundY(data) {
            return (this.isBackgroundActorCommandWindowFit() ? this._scene._actorCommandWindow.y : 0) + this.getActorCommandWindowBacgroundImgY(data);
        }

        getWindowMethods(name) {
            switch (name) {
                case 'MessageWindow':
                    return '_messageWindow';
                case 'ItemWindow':
                    return '_itemWindow';
                case 'SkillWindow':
                    return '_skillWindow';
                case 'ActorWindow':
                    return '_actorWindow';
                case 'EnemyWindow':
                    return '_enemyWindow';
                case 'EnemyBook':
                    return '_enemyBookEnemyWindow';
                case 'Formation':
                    return '_battleFormation';
                case 'ResultWindow':
                    return '_resultWindow';
                case 'ResultLevelUp':
                    return '_resultLevelUpMainWindow';
                default:
                    return name;
            }
        }
    }

    class Nuun_DrawBattleStyleListData extends Nuun_DrawListData {
        constructor(_window, params) {
            super(_window, params);
        }

        nuun_MaxContentsCols() {
            return 1;
        }

        getStatusParamsList() {
            return NuunManager.styleData.getActorBattleStatusList(this._battler);
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

    class Nuun_BattleStyleActorAnimation {
        constructor() {
            this._battler = null;
            this._data = null;
            this._graphicIndex = -1;
            this._graphicOpacity = 255;
            this._graphicName = null;
            this._isDeadImg = false;
            this._imgScenes = 'default';
            this._battlerData = null;
        }

        setup(battler) {
            this._battler = battler;
            this._data = this.getGraphicsData(battler);
            this._battlerData = NuunManager.styleData.getActorData(battler);
        }

        actor() {
            return this._battler;
        }

        getGraphicsData(actor) {
            try {
                if (this.isOnActorPictureEX()) {
                    const battlerActors = NuunManager.styleData.getBattlerActors();
                    if (battlerActors) {
                        return battlerActors.find(data => data.actorId === actor.actorId()).ButlerActorImg;
                    }
                } else {
                    if (params.ActorGraphics) {
                        return params.ActorGraphics.find(data => data.ActorId === actor.actorId()).BattlerActorImg;
                    }
                }
            } catch (error) {
                return null;
            }
        }

        isFaceMode() {
            return NuunManager.styleData.getActorImgMode(this._battlerData) === 'face';
        }

        getActorImg_X() {
            return NuunManager.styleData.getActorImg_X(this._battlerData);
        }

        getActorImg_Y() {
            return NuunManager.styleData.getActorImg_Y(this._battlerData);
        }

        getImg_SX() {
            return NuunManager.styleData.getImg_SX(this._battlerData);
        }

        getImg_SY() {
            return NuunManager.styleData.getImg_SY(this._battlerData);
        }

        getImg_SW() {
            return NuunManager.styleData.getImg_SW(this._battlerData);
        }

        getImg_SH() {
            return NuunManager.styleData.getImg_SH(this._battlerData);
        }

        getActorImgHPosition() {
            return NuunManager.styleData.getActorImgHPosition(this._battlerData);
        }

        getActorImgVPosition() {
            return NuunManager.styleData.getActorImgVPosition(this._battlerData);
        }

        getStateRectX() {
            return this._battlerData && this._battlerData.ActorState_X !== 0 ? this._battlerData.ActorState_X : NuunManager.styleData.getActorState_X();
        }

        getStateRectY() {
            return this._battlerData && this._battlerData.ActorState_Y !== 0 ? this._battlerData.ActorState_Y : NuunManager.styleData.getActorState_Y();
        }

        isActorImgHCenter() {
            return this.getActorImgHPosition() === 'center';
        }

        isActorImgHLeft() {
            return this.getActorImgHPosition() === 'left';
        }

        isActorImgVUnder() {
            return this.getActorImgVPosition() === 'under';
        }

        isActorImgVTop() {
            return this.getActorImgVPosition() === 'top';
        }

        isOnActorPictureEX() {
            return _isOnActorPictureEX();
        }

        getBattleStyleOpacity() {
            return this._graphicOpacity;
        }

        getActorId() {
            return _isOnActorPictureEX() ? 'actorId' : 'ActorId';
        }

        update() {
            this.battlerGraphicRefresh();
        }

        battlerGraphicRefresh() {
            if (!this._battler) {
                return;
            }
            let imgIndex = -1;
            let index = -1;
            this._isDeadImg = false;
            this._imgScenes = 'default';
            const imgDataList = this._data;
            const mode = NuunManager.styleData.getActorImgMode(this._data);
            const oldFileName = this._battleStyleGraphicName;
            if (mode !== 'none' && imgDataList) {
                index = imgDataList.findIndex(imgData => {
                    return this.battleStyleMatchConditions(imgData);
                });
                if (index >= 0) {
                    this.setbattleStyleGraphicId();
                    const imgData = imgDataList[index];
                    this._battleStyleGraphicName = this.getBattleStyleImg(imgData);
                    imgIndex = this.getBattleStyleImgIndex(imgData);
                    this._isDeadImg = this.isBSActorGraphicDead(imgData);
                    this._battleStyleGraphicOpacity = imgData.Opacity || 255;
                } else {
                    this._battleStyleGraphicName = null;
                }
            } else {
                if (this.isFaceMode()) {
                    this._battleStyleGraphicName = this._battler.faceName();
                    imgIndex = this._battler.faceIndex();
                    index = 0;
                } else {
                    this._battleStyleGraphicName = null;
                }
            }
            this._battleStyleGraphicIndex = index;
            this._battleStyleImgIndex = imgIndex;
            this._battler.setImgScenes(this._imgScenes);
            if (oldFileName !== this._battleStyleGraphicName && !!this._battleStyleGraphicName) {
                if (this.isFaceMode()) {
                    ImageManager.loadFace(this._battleStyleGraphicName);
                } else {
                    ImageManager.nuun_LoadPictures(this._battleStyleGraphicName);
                }
            }
        }

        battleStyleMatchConditions(data) {
            if (data._Class && data._Class > 0 && !this.filteringClass(data)) {
                return false;
            }
            if (data.ImgHP && data.ImgHP.CondValid && !conditionsParam(data.ImgHP, this._battler.hp, this._battler.param(0))) {
                return false;
            }
            if (data.ImgSwitch && !this.isBattleStyleSwitchImg(data)) {
                return false;
            }
            if (data.ImgWeapon && !this.isBattleStyleWeaponImg(data)) {
                return false;
            }
            if (data.ImgArmor && !this.isBattleStyleArmorImg(data)) {
                return false;
            }
            if (data.ImgStateAll && !this.isBattleStyleStateImg(data, data.ImgStateAll)) {
                return false;
            }
            if (data.ImgClass > 0 && !this.isBattleStyleClassImg(data)) {
                return false;
            }
            if (data.Level && data.Level > 0 && !this.isBattleStyleLevel(data)) {
                return false;
            }
            if (!this.battleStyleMatchChangeGraphic(data)) {
                return false;
            }
            return true;
        }

        battleStyleMatchChangeGraphic(data) {
            const changeData = data.ChangeGraphicScenes;
            this._imgScenes = changeData;
            switch (changeData) {
                case 'default' :
                    return true;
                case 'finalAttack':
                    return this.isFinalAttack(data.Skill);
                case 'death' :
                    return this.isDead();
                case 'b_appeared' :
                    return !this.isAppeared();
                case 'command' :
                    return this.isInputting();
                case 'dying' :
                    return this.isDying();
                case 'damage' :
                    return this.getImgId(1) || this.getImgId(3);
                case 'cridamage' :
                    return this.getImgId(3);
                case 'recovery' :
                    return this.getImgId(2);
                case 'attack' :
                    return this.getImgId(10) && this.isBattleStyleUseItemImg(data.Skill);
                case 'recoverySkill' :
                    return this.getImgId(11) && this.isBattleStyleUseItemImg(data.Skill);
                case 'item' :
                    return this.getImgId(12) && this.isBattleStyleUseItemImg(data.Item);
                case 'chant' :
                    return this.isChanting();
                case 'victory' :
                    return this.getImgId(20);
                case 'state' :
                    return this.isBattleStyleStateImg(data, data.stateId);
                case 'counter' :
                    return this.isCounter();
                case 'reflection' :
                    return this.isReflection();
                case 'counterEX' :
                    return this.isCounterEX(data);
                case 'guard' :
                    return this.getImgId(15);
            }
        }

        isFinalAttack(skill) {
            return Imported.NUUN_FinalAttack && (this.getImgId(10) || this.getImgId(11)) && this._battler.isFinalAttack() && this.isBattleStyleUseItemImg(skill);
        }

        setbattleStyleGraphicId() {
            switch (this._imgScenes) {
                case 'counter':
                case 'reflection':
                case 'counterEX':
                    this._battler.setBattleImgId(30);
                    break;
            }
        }

        getBattleStyleImg(data) {
            if (this.isFaceMode()) {
                return this.actorFaceName(data)
            } else {
                return this.graphicName(data);
            }
        }

        actorFaceName(data) {
            return data && data.FaceImg ? data.FaceImg : this._battler.faceName();
        }

        graphicName(data) {
            const images = this.actorGraphicName(data);
            if (Array.isArray(images)) {
                if (images.length > 1) {
                    return images[Math.randomInt(images.length)];
                } else {
                    return images[0];
                }
            } else {
                return images;
            }
        }

        actorGraphicName(data) {
            return data.GraphicImg;
        }

        getGraphicName() {
            return this._battleStyleGraphicName;
        }

        getImgIndex() {
            return this._battleStyleImgIndex;
        }

        getGraphicIndex() {
            return this._battleStyleGraphicIndex; 
        }

        getImgScenes() {
            return this._imgScenes; 
        }

        isDeadImg() {
            return this._isDeadImg;
        }

        getBattleStyleImgIndex(data) {
            return this.isFaceMode() ? this.actorFaceIndex(data) : this.batterImgIndex(data);
        }

        actorFaceIndex(data) {
            return data && data.FaceIndex >= 0 ? data.FaceIndex : this._battler.faceIndex();
        }

        batterImgIndex(data) {
            return -1;
        }

        isBSActorGraphicDead(data) {
            return data && (!!data.ImgStateAll && this.getStateData(data.ImgStateAll)) || data.ChangeGraphicScenes === 'death' || (data.ChangeGraphicScenes === 'state' && (data.stateId && this.getStateData(data.stateId)));
        }

        getStateData(data) {
            return data.some(s => s === this._battler.deathStateId());
        }

        getImgId(id) {
            return this._battler.onImgId[id];
        }

        isDead() {
            return this._battler.isDead();
        }

        isAppeared() {
            return this._battler.isAppeared();
        }

        isInputting() {
            return this._battler.isInputting();
        }

        isDying() {
            return this._battler.isDying();
        }

        isChanting() {
            return this._battler.isChanting();
        }

        isCounter() {
            return this._battler.result().counterEx;
        }

        isReflection() {
            return this._battler.result().reflectionEx;
        }

        isStateSprite() {
            return !!this._stateSprite;
        }

        setStateSprite(sprite) {
            this._stateSprite = sprite;
        }

        getStateSprite() {
            return this._stateSprite;
        }

        isCounterEX(data) {
            return this._battler.result().counterExtend && this.isBattleStyleUseItemImg(data.Id);
        }

        isBattleStyleSwitchImg(data) {
            return data.ImgSwitch.every(id => $gameSwitches.value(id));
        }

        isBattleStyleWeaponImg(data) {
            return data.ImgWeapon.every(id => this._battler.isEquipped($dataWeapons[id]));
        }

        isBattleStyleArmorImg(data) {
            return data.ImgArmor.every(id => this._battler.isEquipped($dataArmors[id]));
        }

        isBattleStyleClassImg(data) {
            return data.ImgClass ? this._battler._classId === data.ImgClass : true;
        }

        isBattleStyleLevel(data) {
            return !!this._battler._level && data.Level && data.Level > 0 ? this._battler._level >= data.Level : true;
        }

        isBattleStyleUseItemImg(item) {
            return item && item[0] > 0 ? item.includes(this._battler.nuun_bsUseItemId) : true;
        }

        isBattleStyleStateImg(data, states) {
            return states.every(id => id > 0 ? this._battler.isStateAffected(id) : true);
        }

        getLoadBattleStyleImg() {
            return this.isFaceMode() ? this.loadBattleStyleActorFace() : this.loadBattleStyleActorGraphic();
        }

        loadBattleStyleActorFace() {
            return ImageManager.loadFace(this.getGraphicName());
        }

        loadBattleStyleActorGraphic() {
            return ImageManager.nuun_LoadPictures(this.getGraphicName());
        }

        filteringClass(data) {
            if (data.FilteringClass && data.FilteringClass.length > 0) {
                return data.FilteringClass.some(filterClass => filterClass === 'Scene_Battle');
            } else {
                return true;
            }
        }
        
    };

    window.Nuun_BattleStyleActorAnimation = Nuun_BattleStyleActorAnimation;

    function _isOnActorPictureEX() {
        return Imported.NUUN_ActorPicture && params.OnActorPictureEX;
    }

    function conditionsParam(data, param, maxParam) {
        return (param >= maxParam * data.DwLimit / 100 && (data.UpLimit > 0 ? (param <= maxParam * data.UpLimit / 100) : true));
    };

    function setBsPositionType() {
        if (params.MessagePositionVar > 0) {
            const val = $gameVariables.value(params.MessagePositionVar);
            if (val >= 0) {
                $gameMessage.setPositionType($gameVariables.value(params.MessagePositionVar));
                return;
            }
        }
        $gameMessage.setPositionType(params.MessagePosition);
    };

    const _BattleManager_displayStartMessages = BattleManager.displayStartMessages;
    BattleManager.displayStartMessages = function() {
        if (!params.NoAppearWindow) {
            _BattleManager_displayStartMessages.apply(this, arguments);
            setBsPositionType();
        }
    };

    const _BattleManager_displayVictoryMessage = BattleManager.displayVictoryMessage;
    BattleManager.displayVictoryMessage = function() {
        _BattleManager_displayVictoryMessage.apply(this, arguments);
        setBsPositionType();
    };
    
    const _BattleManager_displayDefeatMessage = BattleManager.displayDefeatMessage;
    BattleManager.displayDefeatMessage = function() {
        _BattleManager_displayDefeatMessage.apply(this, arguments);
        setBsPositionType();
    };

    const _BattleManager_displayEscapeSuccessMessage = BattleManager.displayEscapeSuccessMessage;
    BattleManager.displayEscapeSuccessMessage = function() {
        _BattleManager_displayEscapeSuccessMessage.apply(this, arguments);
        setBsPositionType();
    };

    const _BattleManager_displayEscapeFailureMessage = BattleManager.displayEscapeFailureMessage;
    BattleManager.displayEscapeFailureMessage = function() {
        _BattleManager_displayEscapeFailureMessage.apply(this, arguments);
        setBsPositionType();
    };

    BattleManager.statusWindowVisible = function(flag) {
        this._statusWindowVisible = flag;
    }

    BattleManager.isStatusWindowVisible = function() {
        return this._statusWindowVisible;
    }

    const _BattleManager_invokeCounterAttack = BattleManager.invokeCounterAttack;
    BattleManager.invokeCounterAttack = function(subject, target) {
        target.isCouterAction = true;
        if (target.isActor()) {
            target.result().counterEx = true;
        }
        _BattleManager_invokeCounterAttack.apply(this, arguments);
    };

    const _BattleManager_invokeMagicReflection = BattleManager.invokeMagicReflection;
    BattleManager.invokeMagicReflection = function(subject, target) {
        target.isReflectionAction = true;
        if (target.isActor()) {
            target.result().reflectionEx = true;
        }
        _BattleManager_invokeMagicReflection.apply(this, arguments);
    };


    const _Game_Temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function() {
        _Game_Temp_initialize.call(this);
        this._battleStyleRefresh = false;
        this._battleStyleStatusRefresh = false;
    };

    Game_Temp.prototype.setBattleStyleRefresh = function(flag) {
        this._battleStyleRefresh = flag;
    };
    
    Game_Temp.prototype.isBattleStyleRequested = function() {setBattleStyleStatusRefresh
        return this._battleStyleRefresh || false;
    };

    Game_Temp.prototype.setBattleStyleStatusRefresh = function(flag) {
        this._battleStyleStatusRefresh = flag;
    };
    
    Game_Temp.prototype.isBattleStyleStatusRequested = function() {
        return this._battleStyleStatusRefresh || false;
    };


    const _Game_ActionResult_clear = Game_ActionResult.prototype.clear;
    Game_ActionResult.prototype.clear = function() {
        _Game_ActionResult_clear.call(this);
        this.counterEx = false;
        this.reflectionEx = false;
        this.counterExtend = false;
    };


    const _Game_Battler_initMembers = Game_Battler.prototype.initMembers;
    Game_Battler.prototype.initMembers = function() {
        _Game_Battler_initMembers.call(this);
        this.nuun_bsUseItemId = -1;
        this.onImgId = [];
        this._actionBattlerImg = null;
        this._isEffectAction = false;
        this._onDamageEffect = false;
        this._imgScenes = 'default';
    };

    Game_Battler.prototype.setImgScenes = function(imgScenes) {
        this._imgScenes = imgScenes;
    };

    Game_Battler.prototype.isImgScenesGuard = function() {
        return this._imgScenes === "guard";
    };

    const _Game_Actor_performActionStart = Game_Actor.prototype.performActionStart;
    Game_Actor.prototype.performActionStart = function(action) {
        _Game_Actor_performActionStart.apply(this, arguments);
        if (params.OnActionZoom && !this.isCounterSkillAction()) {
            this._isEffectAction = true;
        }
        this.setBattleStyleAttackImgId(action);
    };

    const _Game_Enemy_performActionStart = Game_Enemy.prototype.performActionStart;
    Game_Enemy.prototype.performActionStart = function(action) {
        _Game_Enemy_performActionStart.apply(this, arguments);
        this.setBattleStyleAttackImgId(action);
    };

    Game_Battler.prototype.setBattleStyleAttackImgId = function(action) {
        if (action.item().animationId !== 0) {
            if (action.isRecover()) {
                this.setBattleImgId(11, action.item().id);
                this.setBSActionBattlerImg("recovery");
            } else if (action.isAttack() && action.isDamage()) {
                this.setBattleImgId(10, action.item().id);
                this.setBSActionBattlerImg("attack");
            } else if (action.isMagicSkill()) {
                this.setBattleImgId(10, action.item().id);
                this.setBSActionBattlerImg("attack");
            } else if (action.isSkill() && action.isDamage()) {
                this.setBattleImgId(10, action.item().id);
                this.setBSActionBattlerImg("attack");
            } else if (action.isItem()) {
                this.setBattleImgId(12, action.item().id);
                this.setBSActionBattlerImg("item");
            } else {
                this.setBattleImgId(0, -1);
                this.setBSActionBattlerImg(null);
            }
            //this.battleStyleImgRefresh();
        }
    };

    const _Game_Battler_performDamage = Game_Battler.prototype.performDamage;
    Game_Battler.prototype.performDamage = function() {
        _Game_Battler_performDamage.apply(this, arguments);
        this.setDamageEffect();
        if (this.isGuard()) {
            this.setBattleImgId(15);
            this.setBSActionBattlerImg(null);
        }
        if (!this.isImgScenesGuard()) {
            this.battlerImgCritical ? this.setBattleImgId(3) : this.setBattleImgId(1);
            this.battlerImgCritical = false;
            this.setBSActionBattlerImg(null);
        }
        //this.battleStyleImgRefresh();
    };

    const _Game_Battler_performRecovery = Game_Battler.prototype.performRecovery;
    Game_Battler.prototype.performRecovery = function() {
        _Game_Battler_performRecovery.apply(this, arguments);
        this.setBattleImgId(2);
        this.setBSActionBattlerImg(null);
        //this.battleStyleImgRefresh();
    };

    const _Game_Actor_performVictory = Game_Actor.prototype.performVictory;
    Game_Actor.prototype.performVictory = function() {
        _Game_Actor_performVictory.apply(this, arguments);
        this.setBattleImgId(20);
        this.setBSActionBattlerImg(null);
        //this.battleStyleImgRefresh();
    };

    const _Game_Actor_refresh = Game_Actor.prototype.refresh;
    Game_Actor.prototype.refresh = function() {
        _Game_Actor_refresh.apply(this, arguments);
        if ($gameParty.inBattle()) {
            $gameTemp.setBattleStyleStatusRefresh(params.ActorRefreshStatusWindowRefresh);
        }
    };

    Game_Battler.prototype.isCounterSkillAction = function() {
        return !!this._counterAction;
    };

    Game_Battler.prototype.isBSEffectAction = function() {
        return this._isEffectAction;
    };

    Game_Actor.prototype.setDamageEffect = function() {
        this._onDamageEffect = params.OnActorShake;
    };

    Game_Enemy.prototype.setDamageEffect = function() {
        this._onDamageEffect = false;
    };

    Game_Battler.prototype.isBSDamageEffect = function() {
        return this._onDamageEffect;
    };

    Game_Battler.prototype.setBSActionBattlerImg = function(state) {
        this._actionBattlerImg = state;
    };
      
    Game_Battler.prototype.isBSActionBattlerImg = function() {
        return this._actionBattlerImg;
    };
    

    Game_Battler.prototype.setBattleImgId = function(id, itemId) {
        if (itemId !== undefined) {
            this.nuun_bsUseItemId = itemId;
        }
        if (!this.onImgId) {
            this.onImgId = [];
        }
        this.onImgId[id] = true;
    };
    
    Game_Battler.prototype.resetBattleStyleImgId = function() {
        if (!this.onImgId) {
            this.onImgId = [];
        }
        for (let i = 0; i < this.onImgId.length; i++) {
            this.onImgId[i] = false;
        }
    };

    const _Game_Actor_isSpriteVisible = Game_Actor.prototype.isSpriteVisible;
    Game_Actor.prototype.isSpriteVisible = function() {
        const result = _Game_Actor_isSpriteVisible.apply(this, arguments);
        if (result) {
            return result;
        }
        return NuunManager.styleData && NuunManager.styleData.isFrontAnimation() && $gameParty.inBattle();
    };

    Game_Enemy.prototype.attackAnimation = function() {
        return this.bareHandsAnimationId();
    };
      
    Game_Enemy.prototype.bareHandsAnimationId = function() {
        return this.enemy().meta.AttackAnimation ? Number(this.enemy().meta.AttackAnimation) : params.EnemySkillAnimation;
    };

    Game_Battler.prototype.setVisibleIcons = function(stateList, buffList) {
        this._visibleStates = stateList || [];
        this._visibleBuffs = buffList || [];
    };

    Game_Enemy.prototype.setVisibleIcons = function(stateList, buffList) {
        this._visibleStates = [];
        this._visibleBuffs = [];
    };

    const _Game_BattlerBase_stateIcons = Game_BattlerBase.prototype.stateIcons;
    Game_BattlerBase.prototype.stateIcons = function() {
        const states = _Game_BattlerBase_stateIcons.apply(this, arguments);
        if (this._visibleStates && this._visibleStates.length > 0) {
            return states.filter(state => this._visibleStates.indexOf(state) >= 0);
        }
        return states;
    };

    const _Game_BattlerBase_buffIcons = Game_BattlerBase.prototype.buffIcons;
    Game_BattlerBase.prototype.buffIcons = function() {
        const buffs = _Game_BattlerBase_buffIcons.apply(this, arguments);
        if (this._visibleBuffs && this._visibleBuffs.length > 0) {
            return buffs.filter(buff => this._visibleBuffs.indexOf(buff) >= 0);
        }
        return buffs;
    };


    const _Scene_Battle_initialize = Scene_Battle.prototype.initialize;
    Scene_Battle.prototype.initialize = function() {
        NuunManager.styleData = new Nuun_BattleLayoutData(this);
        NuunManager.styleData.setStyle();
        _Scene_Battle_initialize.call(this);
        this._actorStatusBackground = null;
        this._bsBattleEnd = false;
    };

    const _Scene_Battle_start = Scene_Battle.prototype.start;
    Scene_Battle.prototype.start = function() {
        //BattleManager.battleStartCommon();
        _Scene_Battle_start.call(this);
        if (this._actorImges) {
            this._actorImges.refresh();
        }
        this._actorStatus.refresh();
    };

    const _Scene_Battle_updateStatusWindowVisibility = Scene_Battle.prototype.updateStatusWindowVisibility;
    Scene_Battle.prototype.updateStatusWindowVisibility = function() {
        _Scene_Battle_updateStatusWindowVisibility.apply(this, arguments);
        this.updateOpenStatusWindow();
        this.updatePartyCommandWindow();
        this.updateActorCommandWindow();
        this.updateBackgroundImg();
        this.updateBattleEndActorStatus();
    };

    const _Scene_Battle_stop = Scene_Battle.prototype.stop;
    Scene_Battle.prototype.stop = function() {
        _Scene_Battle_stop.apply(this, arguments);
        if (!params.BattleEndActorStatusClose) {
            this._statusWindow.open();
        }
    };

    Scene_Battle.prototype.updateBattleEndActorStatus = function() {
        if (BattleManager.isBattleEnd()) {
            this._bsBattleEnd = true;
        }
        if (params.BattleEndActorStatusClose) {
            if (BattleManager.isBattleEnd()) {
              this._statusWindow.close();
            }
        } else if (this._bsBattleEnd) {
            this._statusWindow.open();
        }
    };

    Scene_Battle.prototype.updateOpenStatusWindow = function() {
        if (params.BattleEndActorStatusClose && BattleManager.isBattleEnd()) {
            this._statusWindow.bsHide();
            return;
        }
        const result = BattleManager.isStatusWindowVisible();
        this._statusWindow.visible = !result;
        if (!!this._actorImges) {
            this._actorImges.visible = !result;
        }
        this._actorStatus.visible = !result;
        if (!this._statusWindow.visible) {
            return;
        }
        for (const hideWindow of params.WindowHideActorStatusWindow) {
            const _window = this[NuunManager.styleData.getWindowMethods(hideWindow)];
            if (_window) {
                if (_window.isOpen() || _window.isOpening() || _window.isClosing()) {
                    this._statusWindow.visible = !_window.visible;
                    if (!!this._actorImges) {
                        this._actorImges.visible = !_window.visible;
                    }
                    this._actorStatus.visible = !_window.visible;
                } else if (_window.visible) {
                    this._statusWindow.visible = !_window.isOpen();
                    if (!!this._actorImges) {
                        this._actorImges.visible = !_window.isOpen();
                    }
                    this._actorStatus.visible = !_window.isOpen();
                }
                if (!this._statusWindow.visible) {
                    break;
                }
            }
        }
        if (this._statusWindow.visible && (!this._statusWindow.isOpen() || !this._statusWindow.isOpening())) {
            this._statusWindow.open();
        }
    };

    Scene_Battle.prototype.updatePartyCommandWindow = function() {
        if ($gameTemp.onBSAction && (this._partyCommandWindow.isOpen() || this._partyCommandWindow.isOpening())) {
            $gameTemp.onBSAction = false;
            this._partyCommandWindow.close();
        }
        if ($gameTemp.onBSAction && BattleManager._phase === 'action') {
            $gameTemp.onBSAction = false;
        }
    };

    const _Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
    Scene_Battle.prototype.startActorCommandSelection = function() {
        _Scene_Battle_startActorCommandSelection.apply(this, arguments);
        $gameTemp.onBSAction = false;
    };

    Scene_Battle.prototype.updateActorCommandWindow = function() {
        const list = NuunManager.styleData.getActorCommandHideWindow();
        for (const hideWindow of list) {
            const _window = this[NuunManager.styleData.getWindowMethods(hideWindow)];
            if (_window) {
                if (_window.isOpen()) {
                    this._actorCommandWindow.visible = !_window.visible;
                } else if (_window.visible) {
                    this._actorCommandWindow.visible = !_window.isOpen();
                }
                if (!this._actorCommandWindow.visible) {
                    break;
                }
            }
        }
        if (this._actorCommandWindow.isOpen() && this._actorCommandWindow.visible) {
            $gameTemp.onBSAction = false;
        }
    };

    Scene_Battle.prototype.isRightInputMode = function() {
        return NuunManager.styleData.isCommandRightMode();
    };

    Scene_Battle.prototype.updateBackgroundImg = function() {
        this.updateBackgroundActorStatus();
        this.updateBackgroundPartyCommand();
        this.updateBackgroundActorCommand();
    };

    Scene_Battle.prototype.updateBackgroundActorStatus = function() {
        if(this._actorStatusBackground && this._statusWindow) {
            this._actorStatusBackground.x = NuunManager.styleData.getBackgroundX();
            this._actorStatusBackground.y = NuunManager.styleData.getBackgroundY();
        }
    };

    Scene_Battle.prototype.updateBackgroundPartyCommand = function() {
        if (this._partyCommandBackground && this._partyCommandWindow) {
            this._partyCommandBackground.x = NuunManager.styleData.getPartyCommandBackgroundX();
            this._partyCommandBackground.y = NuunManager.styleData.getPartyCommandBackgroundY();
            if (this._partyCommandWindow.isOpen()) {
                this._partyCommandBackground.visible = this._partyCommandWindow.visible;
            } else if (this._partyCommandWindow.visible) {
                this._partyCommandBackground.visible = this._partyCommandWindow.isOpen();
            }
        }
    };

    Scene_Battle.prototype.updateBackgroundActorCommand = function() {
        if (this._actorCommandBackground && this._actorCommandWindow) {
            const data = NuunManager.styleData.getActorData(BattleManager.actor());
            this._actorCommandBackground.bitmap = ImageManager.nuun_LoadPictures(NuunManager.styleData.getActorCommandWindowBacgroundImg(data));
            this._actorCommandBackground.x = NuunManager.styleData.getActorCommandBackgroundX(data);
            this._actorCommandBackground.y = NuunManager.styleData.getActorCommandBackgroundY(data);
            if (this._actorCommandWindow.isOpen()) {
                this._actorCommandBackground.visible = this._actorCommandWindow.visible;
            } else if (this._actorCommandWindow.visible) {
                this._actorCommandBackground.visible = this._actorCommandWindow.isOpen();
            }
        }
    };

    Scene_Battle.prototype.createBackground = function() {
        if (NuunManager.styleData.getActorStatusWindowBacgroundImg()) {
            const bitmap = ImageManager.nuun_LoadPictures(NuunManager.styleData.getActorStatusWindowBacgroundImg());
            const sprite = new Sprite(bitmap);
            this._battleHudBack.addChild(sprite);
            this._actorStatusBackground = sprite;
        }
    };


    const _Scene_Battle_createSpriteset = Scene_Battle.prototype.createSpriteset;
    Scene_Battle.prototype.createSpriteset = function() {
        _Scene_Battle_createSpriteset.apply(this, arguments);
        if (params.WindowDisplayMode === 'Scene_Battle') {
            this.addChild(this._spriteset._battleHudBase);
        }
        NuunManager.styleData.setSvActorSprites();
    };

    const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        this._battleHudBack = this._spriteset.getHudBack();
        this._battleHudFront = this._spriteset.getHudStatus();
        this.createBackground();
        this.createHud();
        _Scene_Battle_createAllWindows.call(this);
    };

    Scene_Battle.prototype.createHud = function() {
        const rect = this.statusWindowRect();
        this._statusWindow = new Window_BsBattleStatus(rect);
        this._battleHudBack.addChild(this._statusWindow);
        this.createActorSelectWindow();
        this.createActorImges(rect);
        this.createActorStatus(rect);
        this._statusWindow.setActorWindow(this._actorImges, this._actorStatus);
        this.createPartyCommandBackground();
        this.createActorCommandBackground();
    };

    const _Scene_Battle_createStatusWindow = Scene_Battle.prototype.createStatusWindow;
    Scene_Battle.prototype.createStatusWindow = function() {
        
    };

    Scene_Battle.prototype.createActorImges = function(rect) {
        this._actorImges = new Window_BattleActorImges(rect);
        this._battleHudBack.addChild(this._actorImges);
    };
    
    Scene_Battle.prototype.createActorStatus = function(rect) {
        this._actorStatus = new Window_BattleActorStatus(rect);
        this._battleHudFront.addChild(this._actorStatus);
    };

    const _Scene_Battle_createActorWindow = Scene_Battle.prototype.createActorWindow;
    Scene_Battle.prototype.createActorWindow = function() {
        if (NuunManager.styleData.isDefaultActorWindow()) {
            _Scene_Battle_createActorWindow.apply(this, arguments);
        }
    };

    const _Scene_Battle_statusWindowRect = Scene_Battle.prototype.statusWindowRect;
    Scene_Battle.prototype.statusWindowRect = function() {
        const ww = NuunManager.styleData.getActorWindowWidthCommandSubtraction();
        const wh = NuunManager.styleData.getActorStatusWindowHeight();
        const wx = NuunManager.styleData.getActorWindowX();
        const wy = NuunManager.styleData.getActorWindowY();
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Battle.prototype.createActorSelectWindow = function() {
        if (NuunManager.styleData.isDefaultActorWindow()) {
            return;
        }
        const rect = this.actorWindowRect();
        this._actorWindow = new Window_BsBattleActor(rect);
        this._actorWindow.setHandler("ok", this.onActorOk.bind(this));
        this._actorWindow.setHandler("cancel", this.onActorCancel.bind(this));
        this._battleHudBack.addChild(this._actorWindow);
    };

    Scene_Battle.prototype.actorWindowRect = function() {
        return NuunManager.styleData.isDefaultActorWindow() ? _Scene_Battle_statusWindowRect.apply(this, arguments) : this.statusWindowRect();
    };

    const _Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
    Scene_Battle.prototype.createPartyCommandWindow = function() {
        _Scene_Battle_createPartyCommandWindow.apply(this, arguments);
        
    };

    const _Scene_Battle_partyCommandWindowRect = Scene_Battle.prototype.partyCommandWindowRect;
    Scene_Battle.prototype.partyCommandWindowRect = function() {
        const rect = _Scene_Battle_partyCommandWindowRect.call(this);
        return NuunManager.styleData.setPartyCommandPosition(rect);
    };

    Scene_Battle.prototype.createPartyCommandBackground = function() {
        if (NuunManager.styleData.getPartyCommandWindowBacgroundImg()) {
            const bitmap = ImageManager.nuun_LoadPictures(NuunManager.styleData.getPartyCommandWindowBacgroundImg());
            const sprite = new Sprite(bitmap);
            this._battleHudFront.addChild(sprite);
            this._partyCommandBackground = sprite;
            sprite.hide();
        }
    };

    const _Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
    Scene_Battle.prototype.createActorCommandWindow = function() {
        _Scene_Battle_createActorCommandWindow.apply(this, arguments);
    };

    const _Scene_Battle_actorCommandWindowRect = Scene_Battle.prototype.actorCommandWindowRect;
    Scene_Battle.prototype.actorCommandWindowRect = function() {
        const rect = _Scene_Battle_actorCommandWindowRect.apply(this, arguments);
        rect.width = NuunManager.styleData.actorCommandWidth();
        rect.height = NuunManager.styleData.actorCommandHeight();
        rect.x = NuunManager.styleData.getActorCommand_XPosition(rect);
        rect.y = NuunManager.styleData.getActorCommand_YPosition(rect);
        return rect;
    };

    const _Scene_Battle_enemyWindowRect = Scene_Battle.prototype.enemyWindowRect;
    Scene_Battle.prototype.enemyWindowRect = function() {
        const rect = _Scene_Battle_enemyWindowRect.apply(this, arguments);
        rect.x = rect.x - ((Graphics.width - Graphics.boxWidth) / 2);
        return rect;
    };

    Scene_Battle.prototype.createActorCommandBackground = function() {
        if (!!NuunManager.styleData.isActorCommandWindowBacgroundImg()) {
            const sprite = new Sprite();
            this._battleHudFront.addChild(sprite);
            this._actorCommandBackground = sprite;
            sprite.hide();
        }
    };

    const _Scene_Battle_update  = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        _Scene_Battle_update.apply(this, arguments);
        this.updateSelectActorHideWindow();
    };


    Scene_Battle.prototype.updateSelectActorHideWindow = function() {
        for (const methods of NuunManager.styleData.getSelectActorHideWindow()) {
            const _window = this[NuunManager.styleData.getWindowMethods(methods)];
            if (_window) {
                _window.visible = _window.visible ? !this._actorWindow.visible : _window.visible;
            }
        }
    };

    const _Scene_Battle_updateVisibility = Scene_Battle.prototype.updateVisibility;
    Scene_Battle.prototype.updateVisibility = function() {
        _Scene_Battle_updateVisibility.apply(this, arguments);
    };

    const _Scene_Battle_updateStatusWindowPosition = Scene_Battle.prototype.updateStatusWindowPosition;
    Scene_Battle.prototype.updateStatusWindowPosition = function() {
        if (NuunManager.styleData.getCommandShiftMode() !== 'none') {
            _Scene_Battle_updateStatusWindowPosition.apply(this, arguments);
            if (this._actorImges) {
                this._actorImges.x = this._statusWindow.x;
            }
            if (this._actorStatus) {
                this._actorStatus.x = this._statusWindow.x;
            }
        }
    };

    const _Scene_Battle_statusWindowX = Scene_Battle.prototype.statusWindowX;
    Scene_Battle.prototype.statusWindowX = function() {
        let wx = _Scene_Battle_statusWindowX.apply(this, arguments);
        if (this.isAnyInputWindowActive()) {
            wx += (this.isRightInputMode() ? 0 : NuunManager.styleData.getCommandoShiftWidth());
        } else {
            wx += NuunManager.styleData.getActorWindowX();
        }
        return wx;
    };

    const _Scene_Battle_onSelectAction = Scene_Battle.prototype.onSelectAction;
    Scene_Battle.prototype.onSelectAction = function() {
        $gameTemp.onBSAction = params.PartyCommandFlickerPrevention && BattleManager.isTpb();
        _Scene_Battle_onSelectAction.call(this);
    };

    const _Scene_Battle_startActorSelection = Scene_Battle.prototype.startActorSelection;
    Scene_Battle.prototype.startActorSelection = function() {
        _Scene_Battle_startActorSelection.apply(this, arguments);
        this._statusWindow.refreshCursor();
    };

    const _Scene_Battle_onActorCancel = Scene_Battle.prototype.onActorCancel;
    Scene_Battle.prototype.onActorCancel = function() {
        _Scene_Battle_onActorCancel.apply(this, arguments);
        $gameTemp.onBSAction = false;
        this._statusWindow.refreshCursor();
    };


    const _Window_PartyCommand_initialize = Window_PartyCommand.prototype.initialize;
    Window_PartyCommand.prototype.initialize = function(rect) {
        _Window_PartyCommand_initialize.call(this, rect);
        this.opacity = NuunManager.styleData.getWindowVisible('PartyCommandWindowVisible') ? 255 : 0;
    };

    Window_PartyCommand.prototype.loadWindowskin = function() {
        const skin = NuunManager.styleData.getWindowSkin('PartyCommandWindowSkin');
        if (skin) {
            this.windowskin = ImageManager.loadSystem(skin);
        } else {
            Window_Base.prototype.loadWindowskin.call(this);
        }
        this.setWindowTone();
    };

    Window_PartyCommand.prototype.setWindowTone = function() {
        const windowColor = NuunManager.styleData.getWindowColor('PartyCommandWindowColor');
        if (windowColor) {
            this.windowColor = windowColor;
        } else {
            this.windowColor = null;
        }
    };
      
    Window_PartyCommand.prototype.updateTone = function() {
        if (this.windowColor) {
            const tone = this.windowColor;
            this.setTone(tone.red, tone.green, tone.bule);
        } else {
            Window_Base.prototype.updateTone.call(this);
        }
    };
    
    Window_PartyCommand.prototype.maxCols = function() {;
        return (NuunManager.styleData.isPartyCommandMode() ? NuunManager.styleData.getPartyCommandMaxCol() : Math.min((this._list ? this.maxItems() : NuunManager.styleData.getPartyCommandMaxCol()), NuunManager.styleData.getPartyCommandMaxCol())) || 1;
    };

    const _Window_PartyCommand_itemRect = Window_PartyCommand.prototype.itemRect;
    Window_PartyCommand.prototype.itemRect = function(index) {
        const rect = _Window_PartyCommand_itemRect.call(this, index);
        if (NuunManager.styleData.isPartyCommandMode()) {
            rect.x += this.itemWidth() / 2 * (this.maxCols() - Math.min(this.maxItems(), this.maxCols()));
        }
        return rect;
    };

    
    const _Window_ActorCommand_initialize = Window_ActorCommand.prototype.initialize;
    Window_ActorCommand.prototype.initialize = function(rect) {
        _Window_ActorCommand_initialize.apply(this, arguments);
        this.opacity = NuunManager.styleData.getWindowVisible('ActorCommandWindowVisible') ? 255 : 0;
        this._homeY = rect.y;
    };

    if (Window_ActorCommand.prototype.update == Window_Command.prototype.update) {
        Window_ActorCommand.prototype.update = function() {
            Window_Command.prototype.update.apply(this, arguments);
        };
    }

    const _Window_ActorCommand_update = Window_ActorCommand.prototype.update;
    Window_ActorCommand.prototype.update = function() {
        _Window_ActorCommand_update.apply(this, arguments);
        const actor = this.actor();
        if (!$gameTemp.isBattleRefreshRequested() && NuunManager.styleData.isCommandRefresh() && actor) {
            NuunManager.styleData.clearCommandRefresh();
            this.refresh();
        }
    };

    if (Window_ActorCommand.prototype.paint == Window_Selectable.prototype.paint) {
        Window_ActorCommand.prototype.paint = function() {
            Window_Selectable.prototype.paint.apply(this, arguments);
        };
    }

    const _Window_ActorCommand_paint = Window_ActorCommand.prototype.paint;
    Window_ActorCommand.prototype.paint = function() {
        if (this.contents) {
            this.setCommandHeight();
        }
        _Window_ActorCommand_paint.apply(this, arguments);
    };

    Window_ActorCommand.prototype.maxCols = function() {
        return (NuunManager.styleData.isActorCommandMode() ? NuunManager.styleData.getActorCommandMaxCol() : Math.min((this._list ? this.maxItems() : NuunManager.styleData.getActorCommandMaxCol()), NuunManager.styleData.getActorCommandMaxCol())) || 1;
    };

    Window_ActorCommand.prototype.setCommandHeight = function() {
        const maxCols = NuunManager.styleData.isActorCommandVariable() ? Math.ceil(this.maxItems() / NuunManager.styleData.getActorCommandMaxCol()) : NuunManager.styleData.getActorCommandMaxRow();
        const cols = NuunManager.styleData.isActorCommandVariable() ? maxCols.clamp(NuunManager.styleData.getActorCommandMinRow(), NuunManager.styleData.getActorCommandMaxRow()) : maxCols;
        this.height = this.fittingHeight(cols);
    };

    Window_ActorCommand.prototype.selectActor = function(actor) {
        const members = $gameParty.battleMembers();
        return members.indexOf(actor);
    };

    const _Window_ActorCommand_itemRect = Window_ActorCommand.prototype.itemRect;
    Window_ActorCommand.prototype.itemRect = function(index) {
        const rect = _Window_ActorCommand_itemRect.apply(this, arguments);
        if (NuunManager.styleData.isActorCommandMode()) {
            rect.x += this.itemWidth() / 2 * (this.maxCols() - Math.min(this.maxItems(), this.maxCols()));
        }
        return rect;
    };

    const _Window_ActorCommand_refresh = Window_ActorCommand.prototype.refresh;
    Window_ActorCommand.prototype.refresh = function() {
        _Window_ActorCommand_refresh.apply(this, arguments);
        this.setupSkin();
        NuunManager.styleData.actorCommandRefresh(this);
    };

    Window_ActorCommand.prototype.setupSkin = function() {
        const data = NuunManager.styleData.getActorData(this.actor());
        this.loadWindowskin(data);
        this.setWindowTone(data);
    };

    Window_ActorCommand.prototype.loadWindowskin = function(data) {
        const skin = NuunManager.styleData.getWindowSkinEx(data, 'ActorCommandWindowSkin');
        if (skin) {
            this.windowskin = ImageManager.loadSystem(skin);
        } else {
            Window_Base.prototype.loadWindowskin.call(this);
        }
    };

    Window_ActorCommand.prototype.setWindowTone = function(data) {
        const windowColor = NuunManager.styleData.getWindowColorEx(data, 'ActorCommandWindowColor');
        if (windowColor) {
            this.windowColor = windowColor;
        } else {
            this.windowColor = null;
        }
    };
      
    Window_ActorCommand.prototype.updateTone = function() {
        if (this.windowColor) {
            const tone = this.windowColor;
            this.setTone(tone.red, tone.green, tone.bule);
        } else {
            Window_Base.prototype.updateTone.call(this);
        }
    };


    function Window_BsBattleStatus() {
        this.initialize(...arguments);
    }
    
    Window_BsBattleStatus.prototype = Object.create(Window_BattleStatus.prototype);
    Window_BsBattleStatus.prototype.constructor = Window_BsBattleStatus;
    window.Window_BsBattleStatus = Window_BsBattleStatus;

    Window_BsBattleStatus.prototype.initialize = function(rect) {
        Window_BattleStatus.prototype.initialize.apply(this, arguments);
        this.frameVisible = NuunManager.styleData.isWindowFrameShow();
        this.opacity = NuunManager.styleData.isWindowShow() ? 255 : 0;
        this._opening = true;
        this.visible = true;
    };

    Window_BsBattleStatus.prototype.loadWindowskin = function() {
        const skin = NuunManager.styleData.getWindowSkin('ActorStatusWindowSkin');
        if (skin) {
            this.windowskin = ImageManager.loadSystem(skin);
        } else {
            Window_Base.prototype.loadWindowskin.apply(this, arguments);
        }
        this.setWindowTone();
    };

    Window_BsBattleStatus.prototype.setWindowTone = function() {
        const windowColor = NuunManager.styleData.getWindowColor('ActorStatusWindowColor');
        if (windowColor) {
            this.windowColor = windowColor;
        } else {
            this.windowColor = null;
        }
    };
      
    Window_BsBattleStatus.prototype.updateTone = function() {
        if (this.windowColor) {
            const tone = this.windowColor;
            this.setTone(tone.red, tone.green, tone.bule);
        } else {
            Window_Base.prototype.updateTone.apply(this, arguments);
        }
    };

    Window_BsBattleStatus.prototype.maxCols = function() {
        return NuunManager.styleData.getActorMaxCol();
    };

    Window_BsBattleStatus.prototype.itemHeight = function() {
        return Math.floor(Window_BattleStatus.prototype.itemHeight.apply(this, arguments) / NuunManager.styleData.getActorMaxRow());
    };

    Window_BsBattleStatus.prototype.rowSpacing = function() {
        return Math.ceil(this.bsBattleMembers().length / this.maxCols()) > 1 ? 4 : Window_BattleStatus.prototype.rowSpacing.apply(this, arguments);
    };

    Window_BattleStatus.prototype.bsBattleMembers = function() {
        return $gameParty.battleMembers();
    };

    Window_BsBattleStatus.prototype.maxContentsData = function() {
        return Math.max(this.maxItems(), this._contentsData.length);
    };

    Window_BsBattleStatus.prototype.setActorWindow = function(battleActorImges, BattleActorStatus) {
        this._window_battleActorImges = battleActorImges;
        this._window_BattleActorStatus = BattleActorStatus;
    };

    Window_BsBattleStatus.prototype.refreshCursor = function() {
        if (NuunManager.styleData.isSelectBackShow() && !NuunManager.styleData.activeActorWindow()) {
            Window_BattleStatus.prototype.refreshCursor.apply(this, arguments);
        } else {
            this.setCursorRect(0, 0, 0, 0);
        }
    };

    Window_BsBattleStatus.prototype.itemRect = function(index) {
        const rect = NuunManager.styleData.getActorStatusBesideMode() === 'triangle' ? this.triangleRect(index) : Window_Selectable.prototype.itemRect.call(this, index);
        return this.statusPosition(index, rect);
    };

    Window_BsBattleStatus.prototype.triangleRect = function(index) {
        const maxCols = this.maxCols();
        const topCol = this.maxItems() % maxCols;
        const itemWidth = this.itemWidth();
        const itemHeight = this.itemHeight();
        const colSpacing = this.colSpacing();
        const rowSpacing = this.rowSpacing();
        const col = (index + (topCol > index ? 0 : maxCols - topCol)) % maxCols;
        const shiftIndex = (NuunManager.styleData.getActorMaxRow() - Math.ceil(this.maxItems() / maxCols)) * (maxCols - col);
        const row = Math.floor(((topCol > index || topCol === 0 ? 0 : maxCols - topCol) + index + shiftIndex) / maxCols);
        const x = (col * itemWidth + colSpacing / 2) - this.scrollBaseX();
        const y = (row * itemHeight + rowSpacing / 2) - this.scrollBaseY();
        const width = itemWidth - colSpacing;
        const height = itemHeight - rowSpacing;
        return new Rectangle(x, y, width, height);
    };

    Window_BsBattleStatus.prototype.statusPosition = function(index, rect) {
        const itemWidth = this.itemWidth();
        const padding = this.itemPadding();
        let cols = this.maxCols();
        let maxCols = 0;
        const data = NuunManager.styleData.getActorContents(index);
        if (data && data.ActorContentsCoordinateMode) {
            rect.x = 0;
            rect.y = 0;
        } else {
            const mode = NuunManager.styleData.getActorStatusBesideMode();
            if (mode === 'triangle') {
                const topCol = this.maxItems() % this.maxCols();
                cols = (topCol > index ? topCol : this.maxCols());
                index += (topCol > index || topCol === 0 ? 0 : this.maxCols() - topCol);
                maxCols = Math.min(cols, this.maxItems());
            } else {
                maxCols = Math.min(this.maxItems() - (Math.floor(index / cols) * cols), cols, this.maxItems());
            }
            if (mode === 'center') {
                rect.x += Math.floor((this.width / 2) - (itemWidth * maxCols / 2)) - padding;
            } else if (mode === 'right') {
                rect.x += this.width - (maxCols * itemWidth) - padding * 2;
            } else if (mode === 'triangle') {
                rect.x += Math.floor((this.width / 2) - (itemWidth * maxCols / 2)) - padding;
            }
            if (NuunManager.styleData.getActorStatusVerticalMode() === 'under') {
                rect.y = this.height - (rect.height + rect.y + padding * 2);
            }
        }
        if (data) {
            rect.x += data.ActorContentsX || 0;
            rect.y += data.ActorContentsY || 0;
            rect.width = data.ActorContentsWidth > 0 ? data.ActorContentsWidth : rect.width;
            rect.height = data.ActorContentsHeight > 0 ? data.ActorContentsHeight : rect.height;
        }
        return rect;
    };

    Window_BsBattleStatus.prototype.preparePartyRefresh = function() {
        this.performPartyRefresh();
    };
    
    Window_BsBattleStatus.prototype.performPartyRefresh = function() {
        $gameTemp.setBattleStyleRefresh(true);
        this.refresh();
        NuunManager.styleData.commandRefresh();
    };

    Window_BsBattleStatus.prototype.drawItem = function(index) {
        if (NuunManager.styleData.isActorStatusActorWindowShow()) {
           this.drawActorWindow(index);
        }
    };

    Window_BsBattleStatus.prototype.drawActorWindow = function(index) {
        const actor = this.actor(index);
        const key = "actor%1-window".format(index);
        const rect = this.itemRect(index);
        _tempParams.setData(null, rect);
        const _window = this.createInnerSprite(key, Window_BSActorWindow);
        _window.setup(actor);
        _window.show();
    };
      
    Window_BsBattleStatus.prototype.drawItemBackground = function(index) {
        const actor = this.actor(index);
        const data = NuunManager.styleData.getActorData(actor);
        if (NuunManager.styleData.getActorBackground(data)) {
            const rect = this.itemRect(index);
            const bitmap = ImageManager.nuun_LoadPictures(NuunManager.styleData.getActorBackground(data));
            bitmap.addLoadListener(this.actorBackGround.bind(this, bitmap, rect.x, rect.y, rect.width, rect.height));
        } else if (NuunManager.styleData.isContentsBackVisible()) {
            Window_Selectable.prototype.drawItemBackground.call(this, index);
        }
    };

    Window_BsBattleStatus.prototype.actorBackGround = function(bitmap, x, y, width, height) {
        this.contentsBack.blt(bitmap, 0, 0, width, height, x, y);
    };

    Window_BsBattleStatus.prototype.open = function() {
        Window_Base.prototype.open.apply(this, arguments);
        if (this._window_battleActorImges) {
            this._window_battleActorImges.open();
        }
        if (this._window_BattleActorStatus) {
            this._window_BattleActorStatus.open();
        }
    };
      
    Window_BsBattleStatus.prototype.close = function() {
        Window_Base.prototype.close.apply(this, arguments);
        if (this._window_battleActorImges) {
            this._window_battleActorImges.close();
        }
        if (this._window_BattleActorStatus) {
            this._window_BattleActorStatus.close();
        }
    };
    
    Window_BsBattleStatus.prototype.show = function() {
        Window_Base.prototype.show.apply(this, arguments);
        if (this._window_battleActorImges) {
            this._window_battleActorImges.show();
        }
        if (this._window_BattleActorStatus) {
            this._window_BattleActorStatus.show();
        }
    };
    
    const _Window_BattleStatus_hide = Window_BattleStatus.prototype.hide
    Window_BsBattleStatus.prototype.hide = function() {
        SceneManager._scene.updateOpenStatusWindow();
    };

    Window_BsBattleStatus.prototype.bsHide = function() {
        Window_BattleStatus.prototype.hide.apply(this, arguments);
        if (this._window_battleActorImges) {
            this._window_battleActorImges.hide();
        }
        if (this._window_BattleActorStatus) {
            this._window_BattleActorStatus.hide();
        }
    };


    function Window_BattleActorImges() {
        this.initialize(...arguments);
    }
      
    Window_BattleActorImges.prototype = Object.create(Window_BsBattleStatus.prototype);
    Window_BattleActorImges.prototype.constructor = Window_BattleActorImges;
    window.Window_BattleActorImges = Window_BattleActorImges;

    Window_BattleActorImges.prototype.initialize = function(rect) {
        Window_StatusBase.prototype.initialize.call(this, rect);
        this.openness = 0;
        this.opacity = 0;
        this._opening = true;
        this.visible = true;
        this._contentsData = [];
        this.createData();
        this.setActorBaseSprite();
        this.preparePartyRefresh();
    };

    Window_BattleActorImges.prototype.createData = function() {
        for (let i = 0; i < this.maxItems(); i++) {
            this._contentsData[i] = new Nuun_BattleStyleActorAnimation();
        }
    };

    Window_BattleActorImges.prototype.setActorBaseSprite = function() {
        const sprite = new Sprite();
        this._actorImgBaseSprite = sprite;
        this.addChild(sprite);
        sprite.hide();
    };

    Window_BattleActorImges.prototype.drawItemBackground = function(index) {

    };

    Window_BattleActorImges.prototype.preparePartyRefresh = function() {
        this.performPartyRefresh();
    };
    
    Window_BattleActorImges.prototype.performPartyRefresh = function() {
        for (let i = 0; i < this.maxContentsData(); i++) {
            const actor = this.actor(i);
            if (!this._contentsData[i]) {
                this._contentsData[i] = new Nuun_BattleStyleActorAnimation();
            }
            this._contentsData[i].setup(actor);
        }
        this.refresh();
    };

    Window_BattleActorImges.prototype.drawItem = function(index) {
        this.drawItemImage(index);
        this.drawStatusBack(index);
    };

    Window_BattleActorImges.prototype.drawStatusBack = function(index) {
        const actor = this.actor(index);
        const data = NuunManager.styleData.getActorData(actor);
        if (NuunManager.styleData.getActorFrontImg(data)) {
            const rect = this.itemRect(index);
            const bitmap = ImageManager.nuun_LoadPictures(NuunManager.styleData.getActorFrontImg(data));
            bitmap.addLoadListener(this.actorFrontBackGround.bind(this, index, bitmap, rect.x, rect.y, rect.width, rect.height));
        }
    };


    Window_BattleStatus.prototype.actorBackGround = function(bitmap, x, y, width, height) {
        this.contentsBack.blt(bitmap, 0, 0, width, height, x, y);
    };
      
    Window_BattleActorImges.prototype.actorFrontBackGround = function(index, bitmap, x, y, width, height) {
        const key = "actor-Frontback-%1".format(index);
        const sprite = this.createActorImgSprite(key, Sprite);
        sprite.bitmap = bitmap;
        sprite.move(x + this.colSpacing(), y + 8);
        sprite.width = bitmap.width;
        sprite.height = bitmap.height;
        sprite.scale.x = width / bitmap.width;
        sprite.scale.y = height / bitmap.height;
        sprite.show();
    };

    Window_BattleActorImges.prototype.drawItemImage = function(index) {
        const data = this._contentsData[index];
        if (data.isFaceMode()) {
            this.drawItemFace(index);
        } else {
            this.drawItemBattler(index);
        }
    };

    Window_BattleActorImges.prototype.drawItemFace = function(index) {
        const contentsData = this._contentsData[index];
        const rect = this.faceRect(index);
        const pw = ImageManager.faceWidth;
        const ph = ImageManager.faceHeight;
        let width = rect.width || pw;
        let height = rect.height || ph;
        const key = "actor_%1-BSImg".format(index);
        const sprite = this.createActorImgSprite(key, Sprite_ActorImges);
        this.createStateAnimation(contentsData, index);
        sprite.setup(contentsData, contentsData.getImgIndex());
        sprite.setRect(Math.min(width, rect.width), rect.height);
        sprite.setHome(rect.x, rect.y);
        sprite.show();
        NuunManager.styleData.setFrontActor(index, sprite);
    };

    Window_BattleActorImges.prototype.drawItemBattler = function(index) {
        const contentsData = this._contentsData[index];
        const rect = this.itemImgRect(index);
        const key = "actor_%1-BSImg".format(index);
        const sprite = this.createActorImgSprite(key, Sprite_ActorImges);
        this.createStateAnimation(contentsData, index);
        sprite.setup(contentsData, contentsData.getImgIndex());
        const width = NuunManager.styleData.isFaceHeightOnWindow() ? rect.width : Infinity;
        const height = NuunManager.styleData.isFaceHeightOnWindow() ? rect.height : Infinity;
        sprite.setRect(width, height);
        sprite.setHome(rect.x, rect.y);
        sprite.show();
        NuunManager.styleData.setFrontActor(index, sprite);
    };

    Window_BattleActorImges.prototype.createStateAnimation = function(data, index) {
        if (!data.isStateSprite() && NuunManager.styleData.isStateAnimation()) {
            const key = "actor_%1-BSStateOverlay".format(index);
            const sprite = this.createActorImgSprite(key, Sprite_StateOverlay);
            data.setStateSprite(sprite);
        }
    };

    Window_BattleActorImges.prototype.createActorImgSprite = function(key, spriteClass) {
        const dict = this._additionalSprites;
        if (dict[key]) {
            return dict[key];
        } else {
            const sprite = new spriteClass();
            dict[key] = sprite;
            this._actorImgBaseSprite.addChild(sprite);
            return sprite;
        }
    };

    Window_BattleActorImges.prototype.faceRect = function(index) {
        const contentsData = this._contentsData[index];
        const rect = this.itemRect(index);
        rect.pad(-1);
        if (contentsData.isActorImgHCenter()) {
            rect.x = rect.x + Math.floor(rect.width / 2);
        } else if (contentsData.isActorImgHLeft()) {
            rect.x = rect.x + (ImageManager.faceWidth / 2);
        } else {
            rect.x = (rect.x + rect.width) - (ImageManager.faceWidth);
        }
        rect.x += 8 + contentsData.getActorImg_X();
        rect.y += 8 + contentsData.getActorImg_Y();
        rect.width = rect.width;
        rect.height = NuunManager.styleData.getFaceHeight() > 0 ? Math.min(rect.height, NuunManager.styleData.getFaceHeight()) : rect.height;
        rect.y += Math.floor(Math.min(ImageManager.faceHeight, rect.height) / 2);
        return rect;
    };

    Window_BattleActorImges.prototype.itemImgRect = function(index) {
        const contentsData = this._contentsData[index];
        const rect = this.itemRect(index);
        rect.x += (contentsData.isActorImgHCenter() ? Math.floor(this.itemWidth() / 2) + 4 : 8) + contentsData.getActorImg_X();
        if (NuunManager.styleData.isFaceHeightOnWindow()) {
            rect.y += Math.floor(rect.height / 2) + this.itemPadding() + contentsData.getActorImg_Y();
        } else {
            rect.y += (contentsData.isActorImgVUnder() ? rect.height : 0) + this.itemPadding() + contentsData.getActorImg_Y();
        }
        rect.height = NuunManager.styleData.getImgHeight() > 0 ? Math.min(rect.height, NuunManager.styleData.getImgHeight()) : rect.height;
        return rect;
    };

    Window_BattleActorImges.prototype.open = function() {
        Window_Base.prototype.open.call(this);
        this._actorImgBaseSprite.show();
    };
      
    Window_BattleActorImges.prototype.close = function() {
        Window_Base.prototype.close.call(this);
        this._actorImgBaseSprite.hide();
    };

    Window_BattleActorImges.prototype.show = function() {
        Window_Base.prototype.show.apply(this, arguments);
        this._actorImgBaseSprite.show();
    };
    
    Window_BattleActorImges.prototype.hide = function() {
        Window_Base.prototype.hide.apply(this, arguments);
        this._actorImgBaseSprite.hide();
    };


    function Window_BattleActorStatus() {
        this.initialize(...arguments);
    }
      
    Window_BattleActorStatus.prototype = Object.create(Window_BsBattleStatus.prototype);
    Window_BattleActorStatus.prototype.constructor = Window_BattleActorStatus;
    window.Window_BattleActorStatus = Window_BattleActorStatus;

    Window_BattleActorStatus.prototype.initialize = function(rect) {
        Window_StatusBase.prototype.initialize.call(this, rect);
        const filterArea = this._clientArea.filterArea;
        this.openness = 0;
        this.opacity = 0;
        this._opening = true;
        this.visible = true;
        this._contentsData = [];
        this.createData();
        this.preparePartyRefresh();
    };

    Window_BattleActorStatus.prototype.createData = function() {
        for (let i = 0; i < this.maxItems(); i++) {
            this._contentsData[i] = new Nuun_DrawBattleStyleListData(this, params);
        }
    };

    Window_BattleActorStatus.prototype.update = function() {
        Window_BattleStatus.prototype.update.apply(this, arguments);
        if (!$gameTemp.isBattleRefreshRequested() && $gameTemp.isBattleStyleStatusRequested()) {
            this.preparePartyRefresh();
        }
    };
    
    Window_BattleActorStatus.prototype.preparePartyRefresh = function() {
        $gameTemp.clearBattleRefreshRequest();
        $gameTemp.setBattleStyleStatusRefresh(false);
        this.performPartyRefresh();
    };
    
    Window_BattleActorStatus.prototype.performPartyRefresh = function() {
        for (let i = 0; i < this.maxContentsData(); i++) {
            if (!this._contentsData[i]) {
                this._contentsData[i] = new Nuun_DrawBattleStyleListData(this, params);
            }
        }
        this.refresh();
    };

    Window_BattleActorStatus.prototype.drawItemBackground = function(index) {

    };

    Window_BattleActorStatus.prototype.drawItem = function(index) {
        this._contentsData[index].drawItemContents(index);
    };
    
    Window_BattleActorStatus.prototype.hide = function() {
        Window_Base.prototype.hide.apply(this, arguments);
    };
    

    function Window_BsBattleActor() {
        this.initialize(...arguments);
    }
    
    Window_BsBattleActor.prototype = Object.create(Window_BattleActor.prototype);
    Window_BsBattleActor.prototype.constructor = Window_BsBattleActor;

    const _Window_BattleActor_initialize = Window_BattleActor.prototype.initialize;
    Window_BattleActor.prototype.initialize = function(rect) {
        _Window_BattleActor_initialize.call(this, rect);
        this.setActorWindowFrameShow();
    };
    

    Window_BsBattleActor.prototype.initialize = function(rect) {
        Window_BattleActor.prototype.initialize.call(this, rect);
        this.opacity = 0;
    };

    Window_BattleActor.prototype.setActorWindowFrameShow = function() {
        this.frameVisible = NuunManager.styleData.isActorWindowFrameShow();
    };

    Window_BsBattleActor.prototype.setActorWindowFrameShow = function() {
        
    };

    Window_BsBattleActor.prototype.maxCols = function() {
        return NuunManager.styleData.getActorMaxCol();
    };

    Window_BsBattleActor.prototype.itemHeight = function() {
        return Math.floor(Window_BattleStatus.prototype.itemHeight.apply(this, arguments) / NuunManager.styleData.getActorMaxRow());
    };

    Window_BsBattleActor.prototype.rowSpacing = function() {
        return Math.ceil(this.bsBattleMembers().length / this.maxCols()) > 1 ? 4 : Window_BattleStatus.prototype.rowSpacing.apply(this, arguments);
    };

    Window_BsBattleActor.prototype.drawItem = function(index) {
        this.drawItemImage(index);
        this.drawItemStatus(index);
    };

    Window_BsBattleActor.prototype.drawItemBackground = function(index) {

    };

    Window_BsBattleActor.prototype.preparePartyRefresh = function() {
        this.refresh();
    };

    Window_BsBattleActor.prototype.drawItem = function(index) {

    };

    Window_BsBattleActor.prototype.refreshCursor = function() {
        if (NuunManager.styleData.isActorSelectBackVisible()) {
            Window_BattleActor.prototype.refreshCursor.apply(this, arguments);
        } else {
            this.setCursorRect(0, 0, 0, 0);
        }
    };

    Window_BsBattleActor.prototype.itemRect = function(index) {
        return Window_BsBattleStatus.prototype.itemRect.apply(this, arguments);
    };

    Window_BsBattleActor.prototype.triangleRect = function(index) {
        return Window_BsBattleStatus.prototype.triangleRect.apply(this, arguments);
    };

    Window_BsBattleActor.prototype.statusPosition = function(index, rect) {
        return Window_BsBattleStatus.prototype.statusPosition.apply(this, arguments);
    };


    const _Window_BattleLog_showEnemyAttackAnimation = Window_BattleLog.prototype.showEnemyAttackAnimation;
    Window_BattleLog.prototype.showEnemyAttackAnimation = function(subject, targets) {
        const id = subject.attackAnimation();
        if (id > 0) {
            this.showNormalAnimation(targets, id, false);
        } else {
            _Window_BattleLog_showEnemyAttackAnimation.apply(this, arguments);
        }
    };

    //Sprite_Actor
    function Sprite_BSFrontActor() {
        this.initialize(...arguments);
    }
    
    Sprite_BSFrontActor.prototype = Object.create(Sprite_Actor.prototype);
    Sprite_BSFrontActor.prototype.constructor = Sprite_BSFrontActor;

    window.Sprite_BSFrontActor = Sprite_BSFrontActor;
    
    Sprite_BSFrontActor.prototype.initialize = function(battler) {
        Sprite_Actor.prototype.initialize.call(this, battler);
    };
    
    Sprite_BSFrontActor.prototype.initMembers = function() {
        Sprite_Actor.prototype.initMembers.call(this);
        this.viewFrontActor = NuunManager.styleData.isFrontAnimation();
    };

    Sprite_BSFrontActor.prototype.updateVisibility = function() {
        Sprite_Actor.prototype.updateVisibility.apply(this, arguments);
        if (this.viewFrontActor) {
            //this.visible = true;
            this.visible = false;
            this.updateBsPosition();
        }
    };

    Sprite_BSFrontActor.prototype.updateBsPosition = function() {
        const index = this._actor.index();
        const statusWindow = SceneManager._scene._statusWindow;
        const rect = statusWindow.itemRectWithPadding(index);
        const x = statusWindow.x + rect.x + Math.floor(rect.width / 2) + statusWindow.itemPadding() + NuunManager.styleData.getActorEffect_X();
        const y = statusWindow.y + rect.y + Math.floor(rect.height / 2) + NuunManager.styleData.getActorEffect_Y();
        this.setHome(x, y);
    };

    Sprite_Battler.prototype.setFrontActor = function(sprite) {
        
    };

    Sprite_Battler.prototype.getFrontActor = function() {
        return false;
    };

    Sprite_BSFrontActor.prototype.setFrontActor = function(sprite) {
        this._frontActor = sprite;
    };

    Sprite_BSFrontActor.prototype.getFrontActor = function() {
        return this._frontActor;
    };

    Sprite_BSFrontActor.prototype.startMove = function(x, y, duration) {

    };
    
    Sprite_BSFrontActor.prototype.updateMotion = function() {
    
    };

    Sprite_BSFrontActor.prototype.damageOffsetX = function() {
        return NuunManager.styleData.ActorDamage_X();
    };
      
    Sprite_BSFrontActor.prototype.damageOffsetY = function() {
        return NuunManager.styleData.ActorDamage_Y();
    };


    const _Sprite_Enemy_damageOffsetX = Sprite_Enemy.prototype.damageOffsetX;
    Sprite_Enemy.prototype.damageOffsetX = function() {
        return _Sprite_Enemy_damageOffsetX.apply(this, arguments) + params.EnemyDamage_X;
    };

    const _Sprite_Enemy_damageOffsetY = Sprite_Enemy.prototype.damageOffsetY;
    Sprite_Enemy.prototype.damageOffsetY = function() {
        return _Sprite_Enemy_damageOffsetY.apply(this, arguments) + params.EnemyDamage_Y;
    };


    Sprite_StateIcon.prototype.setupVisibleIcons = function(list1, list2) {
        this._visibleStates = list1 || [];
        this._visibleBuffs = list2 || [];
    };

    Sprite_StateIcon.prototype.setVisibleIcons = function() {
        if (this._battler) {
            this._battler.setVisibleIcons(this._visibleStates, this._visibleBuffs);
        }
    };
    
    Sprite_StateIcon.prototype.resetVisibleIcons = function() {
        if (this._battler) {
            this._battler.setVisibleIcons(null, null);
        }
    };

    const _Sprite_StateIcon_update = Sprite_StateIcon.prototype.update;
    Sprite_StateIcon.prototype.update = function() {
        this.setVisibleIcons();
        _Sprite_StateIcon_update.apply(this, arguments);
        this.resetVisibleIcons();
    };


    const _Sprite_StateIcon_updateIcon = Sprite_StateIcon.prototype.updateIcon;
    Sprite_StateIcon.prototype.updateIcon = function() {
        _Sprite_StateIcon_updateIcon.apply(this, arguments);
        if (this._battler && this._battler.isActor() && NuunManager.styleData && NuunManager.styleData.getNoStateIcon() > 0 && this._iconIndex === 0) {
            this._iconIndex = NuunManager.styleData.getNoStateIcon();
        }
    };


    const _Sprite_Animation_setup = Sprite_Animation.prototype.setup;
    Sprite_Animation.prototype.setup = function(targets, animation, mirror, delay, previous) {
        this._frontTargets = this.getFrontTargets(targets);
        _Sprite_Animation_setup.call(this, targets, animation, mirror, delay, previous);
    };

    Sprite_Animation.prototype.getFrontTargets = function(targets) {
        return targets.map(target => target._actor && !!target.getFrontActor() ? target.getFrontActor() : target);
    };

    const _Sprite_Animation_updateFlash = Sprite_Animation.prototype.updateFlash;
    Sprite_Animation.prototype.updateFlash = function() {
        if (NuunManager.styleData && NuunManager.styleData.isFrontAnimation()) {
            const t = this._targets;
            this._targets =  this._frontTargets;
            _Sprite_Animation_updateFlash.apply(this, arguments);
            this._targets = t;
        } else {
            _Sprite_Animation_updateFlash.apply(this, arguments);
        }
    };

    const _Sprite_AnimationMV_setup = Sprite_AnimationMV.prototype.setup;
    Sprite_AnimationMV.prototype.setup = function(targets, animation, mirror, delay) {
        this._frontTargets = this.getFrontTargets(targets);
        _Sprite_AnimationMV_setup.apply(this, arguments);
    };

    Sprite_AnimationMV.prototype.getFrontTargets = function(targets) {
        return targets.map(target => target._actor && !!target.getFrontActor() ? target.getFrontActor() : target);
    };

    const _Sprite_AnimationMV_updateFlash = Sprite_AnimationMV.prototype.updateFlash;
    Sprite_AnimationMV.prototype.updateFlash = function() {
        if (NuunManager.styleData && NuunManager.styleData.isFrontAnimation()) {
            const t = this._targets;
            this._targets =  this._frontTargets;
            _Sprite_AnimationMV_updateFlash.apply(this, arguments);
            this._targets = t;
        } else {
            _Sprite_AnimationMV_updateFlash.apply(this, arguments);
        }
    };

    const _Sprite_AnimationMV_startHiding = Sprite_AnimationMV.prototype.startHiding;
    Sprite_AnimationMV.prototype.startHiding = function(duration) {
        if (NuunManager.styleData && NuunManager.styleData.isFrontAnimation()) {
            const t = this._targets;
            this._targets =  this._frontTargets;
            _Sprite_AnimationMV_startHiding.apply(this, arguments);
            this._targets = t;
        } else {
            _Sprite_AnimationMV_startHiding.apply(this, arguments);
        }
    };

    const _Sprite_AnimationMV_onEnd = Sprite_AnimationMV.prototype.onEnd;
    Sprite_AnimationMV.prototype.onEnd = function() {
        if (NuunManager.styleData && NuunManager.styleData.isFrontAnimation()) {
            const t = this._targets;
            this._targets =  this._frontTargets;
            _Sprite_AnimationMV_onEnd.apply(this, arguments);
            this._targets = t;
        } else {
            _Sprite_AnimationMV_onEnd.apply(this, arguments);
        }
    };

    const _Spriteset_Base_createAnimationSprite = Spriteset_Base.prototype.createAnimationSprite;
    Spriteset_Base.prototype.createAnimationSprite = function(targets, animation, mirror, delay) {
        if (String(this.constructor.name) === 'Spriteset_Battle') {
            this.createBsAnimationSprite(targets, animation, mirror, delay);
        } else {
            _Spriteset_Base_createAnimationSprite.apply(this, arguments);
        }
    };

    Spriteset_Battle.prototype.createBsAnimationSprite = function(targets, animation, mirror, delay) {
        const mv = this.isMVAnimation(animation);
        const sprite = new (mv ? Sprite_AnimationMV : Sprite_Animation)();
        const targetSprites = this.makeTargetSprites(targets);
        if (this.animationTarget(targetSprites)) {
            const baseDelay = this.animationBaseDelay();
            const previous = delay > baseDelay ? this.lastAnimationSprite() : null;
            if (this.animationShouldMirror(targets[0])) {
                mirror = !mirror;
            }
            sprite.targetObjects = targets;
            sprite.setup(targetSprites, animation, mirror, delay, previous);
            this.getEffectsContainer().addChild(sprite);
            this._animationSprites.push(sprite);
        } else {
            _Spriteset_Base_createAnimationSprite.apply(this, arguments);
        }
    };

    Spriteset_Battle.prototype.getEffectsContainer = function(){
        return this._effectsFrontContainer ? this._effectsFrontContainer : this._effectsContainer;
    };

    Spriteset_Battle.prototype.animationTarget = function(targetSprites){
        if (NuunManager.styleData && NuunManager.styleData.isFrontAnimation() && targetSprites) {
            return targetSprites.some(target => target.viewFrontActor && !!target._battler.isActor());
        }
        return false;
    };

    if (Spriteset_Battle.prototype.animationShouldMirror == Spriteset_Base.prototype.animationShouldMirror) {
        Spriteset_Battle.prototype.animationShouldMirror = function(target) {
            return Spriteset_Base.prototype.animationShouldMirror.apply(this, arguments);
        };
    }
    
    const _Spriteset_Battle_animationShouldMirror = Spriteset_Battle.prototype.animationShouldMirror;
    Spriteset_Battle.prototype.animationShouldMirror = function(target) {
        return _Spriteset_Battle_animationShouldMirror.apply(this, arguments) ? params.ActorsMirror : false;
    };

    const _Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
    Spriteset_Battle.prototype.createLowerLayer = function() {
        _Spriteset_Battle_createLowerLayer.apply(this, arguments);
        this.createStatusLayer();
    };

    Spriteset_Battle.prototype.createStatusLayer = function() {
        this.createBattleHud();//ベーススプライト
        this.createHudBack();//ウィンドウ、アクターグラフィック
        this.createEffects();//アニメーション
        this.createHudStatus();//ステータス
        this.createFrontActors();
    };

    Spriteset_Battle.prototype.createBattleHud = function() {
        const sprite = new Sprite();
        this.addChild(sprite);
        this._battleHudBase = sprite;
        this._battleHudSprite = [];
    };

    Spriteset_Battle.prototype.createActorImgBaseSprite = function() {
        
    };

    Spriteset_Battle.prototype.createHudBack = function() {
        const sprite = new Sprite();
        this._battleHudBase.addChild(sprite);
        this._battleHudSprite[0] = sprite;
    };

    Spriteset_Battle.prototype.createEffects = function() {
        const sprite = this.setBattleBase();
        this._battleHudBase.addChild(sprite);
        this._battleHudSprite[1] = sprite;
        this._effectsFrontContainer = sprite;
    };

    Spriteset_Battle.prototype.createHudStatus = function() {
        const sprite = new Sprite();
        this._battleHudBase.addChild(sprite);
        this._battleHudSprite[2] = sprite;
    };

    Spriteset_Battle.prototype.createDamege = function() {
        const sprite = this.setBattleBase();
        this._battleHudBase.addChild(sprite);
        this._battleHudSprite[3] = sprite;
    };

    Spriteset_Battle.prototype.getHudBack = function() {
        return this._battleHudSprite[0];
    };

    Spriteset_Battle.prototype.getHudStatus = function() {
        return this._battleHudSprite[2];
    };

    Spriteset_Battle.prototype.setBattleBase = function() {
        const width = Graphics.boxWidth;
        const height = Graphics.boxHeight;
        const x = 0;
        const y = 0;
        const sprite = new Sprite();
        sprite.setFrame(0, 0, width, height);
        sprite.x = x;
        sprite.y = y - this.battleFieldOffsetY();
        sprite.home_x = x;
        return sprite;
    };

    const _Spriteset_Battle_update = Spriteset_Battle.prototype.update;
    Spriteset_Battle.prototype.update = function() {
        _Spriteset_Battle_update.apply(this, arguments);
        this.updateBsEffects();
    };

    Spriteset_Battle.prototype.updateBsEffects = function() {
        
    };

    const _Spriteset_Battle_updateActors = Spriteset_Battle.prototype.updateActors;
    Spriteset_Battle.prototype.updateActors = function() {
        this.addBsCreateActors();
        _Spriteset_Battle_updateActors.apply(this, arguments);
    };

    Spriteset_Battle.prototype.getFrontActorsBaseSpriteId = function() {
        return 3;
    };

    Spriteset_Battle.prototype.createFrontActors = function() {
        if (!$gameSystem.isSideView() && NuunManager.styleData && NuunManager.styleData.isFrontViewActorEffectShow()) {
            this._actorSprites = [];//ロールバックの可能性あり
            const spriteId = this.getFrontActorsBaseSpriteId();
            this.createDamege();
            for (let i = 0; i < $gameParty.maxBattleMembers(); i++) {
                const sprite = new Sprite_BSFrontActor();
                this._actorSprites.push(sprite);
                this._battleHudSprite[spriteId].addChild(sprite);
            }
        }
    };

    Spriteset_Battle.prototype.addBsCreateActors = function() {
        if (!$gameSystem.isSideView() && NuunManager.styleData && NuunManager.styleData.isFrontViewActorEffectShow() && this._actorSprites && $gameParty.maxBattleMembers() > this._actorSprites.length) {
            const count = $gameParty.maxBattleMembers() - this._actorSprites.length;
            const spriteId = this.getFrontActorsBaseSpriteId();
            for (let i = 0; i < count; i++) {
                const sprite = new Sprite_BSFrontActor();
                this._actorSprites.push(sprite);
                this._battleHudSprite[spriteId].addChild(sprite);
            }
        }  
    };

    Spriteset_Battle.prototype.getFrontActorsSprite = function() {
        return $gameSystem.isSideView() ? this._actorSprites : [];
    };

    
    function Sprite_ActorImges() {
        this.initialize(...arguments);
    }
      
    Sprite_ActorImges.prototype = Object.create(Sprite.prototype);
    Sprite_ActorImges.prototype.constructor = Sprite_ActorImges;

    window.Sprite_ActorImges = Sprite_ActorImges;
      
    Sprite_ActorImges.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);
        this.initMembers();
    };

    Sprite_ActorImges.prototype.initMembers = function() {
        this._battler = null;
        this._data = null;
        this._imgScenes = '';
        this._imgIndex = -1;
        this._selectionEffectCount = 0;
        this._shake = 0;
        this._shakePower = params.ActorShakePower;
        this._shakeSpeed = params.ActorShakeSpeed;
        this._shakeDuration = 0;
        this._shakeDirection = 1;
        this._zoomDuration = 0;
        this._zoomScale = 1;
        this._zoomScaleTarget = 1.2;
        this._updateCount = 0;
        this._imgListId = -1;
        this._durationOpacity = 0;
        this._bsBitmapWidth = 0;
        this._bsBitmapHeight = 0;
        this._startUpdate = true;
        this._zoomEffect = false;
        this._apngMode = false;
        this._loadedBitmap = null;
    };

    Sprite_ActorImges.prototype.setup = function(data, index) {
        this._battler = data._battler;
        this._data = data;
        this._imgIndex = index;
        this.resetData();
        //if (!data._actor) {
        //    this.bitmap = null;
        //    return;
        //}
        this._battler.resetBattleStyleImgId();
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this._data.update();
        this.updateActorGraphic();
        const stateSprite = data.getStateSprite();
        if (stateSprite && NuunManager.styleData.isStateAnimation()) {
            stateSprite.setup(data._battler);
            stateSprite.anchor.y = 0.5;
            stateSprite.x = this.x + data.getStateRectX() + this.getStatePositionX();
            stateSprite.y = this.y + data.getStateRectY() + this.getStatePositionY();
            stateSprite.show();
        }
        this.setBlendColor([0, 0, 0, 0]);
        
    };

    Sprite_ActorImges.prototype.resetData = function() {
        this._imgScenes = '';
        this._imgListId = null;
        this._updateCount = 0;
    };

    Sprite_ActorImges.prototype.setHome = function(x, y) {
        this._homeX = x;
        this._homeY = y;
        this._baseScale = 1.0;
        this.move(x, y);
    };

    Sprite_ActorImges.prototype.setRect = function(width, height) {
        this._rectWidth = width;
        this._rectHeight = height;
    };

    Sprite_ActorImges.prototype.resetBitmapData = function(width, height) {
        this._bsBitmapWidth = width;
        this._bsBitmapHeight = height;
        this.y = this._homeY;//画像更新時に一旦戻す。
    };
    
    Sprite_ActorImges.prototype.getStatePositionX = function() {
        return 0;
    };
      
    Sprite_ActorImges.prototype.getStatePositionY = function() {
        if (this._data.isFaceMode()) {
            return 0;
        } else if (NuunManager.styleData.isFaceHeightOnWindow()) {
            return 0;
        } else {
            return Math.floor(this._bsBitmapHeight / 3) * -1;
        }
    };

    Sprite_ActorImges.prototype.update = function() {
        Sprite.prototype.update.call(this);
        if (this._battler) {
            this._data.update();
            this.updateActorGraphic();
            this.updateMotion();
            this.updateSelectionEffect();
        } else {
            this._stateSprite = null;
            this.bitmap = null;
        } 
    };

    Sprite_ActorImges.prototype.updateMotion = function() {
        this.refreshStateOverlay();
        this.setupEffect();
        this.updateDamage();
        this.updateZoom();
    };

    Sprite_ActorImges.prototype.refreshStateOverlay = function() {
        const stateSprite = this._data.getStateSprite();
        if (stateSprite && NuunManager.styleData.isStateAnimation()) {
            stateSprite.visible = this.visible;
            if (this._loadedBitmap && this._loadedBitmap.isReady()) {
                const scale = this._zoomScale * this._baseScale;
                stateSprite.x = this.x + this._data.getStateRectX() + this.getStatePositionX();
                stateSprite.y = this.y + this._data.getStateRectY() + this.getStatePositionY();
            }
        }
    };
    
    Sprite_ActorImges.prototype.setupEffect = function() {
        if (params.OnActorShake && this._battler.isBSDamageEffect()) {
            this._shakeDuration = params.ActorShakeFlame;
            this._battler._onDamageEffect = false;
        }
        if (params.OnActionZoom && this._battler.isBSEffectAction()) {
            this._zoomDuration = params.ActionZoomDuration;
            this._zoomEffect = true;
            this._battler._isEffectAction = false;
        }
    };
    
    Sprite_ActorImges.prototype.updateDamage = function() {
        if (this._shakeDuration > 0 || this._shake !== 0) {
            const delta = (this._shakePower * this._shakeSpeed * this._shakeDirection) / 10;
            if (this._shakeDirection <= 1 && this._shake * (this._shake + delta) < 0) {
                this._shake = 0;
            } else {
                this._shake += delta;
            }
            if (this._shake > this._shakePower * 2) {
                this._shakeDirection = -1;
            }
            if (this._shake < -this._shakePower * 2) {
                this._shakeDirection = 1;
            }
            this._shakeDuration--;
            this.x += Math.round(this._shake);
        } else if (this.x !== this._homeX) {
            this.resetDamage();
        }
    };
    
    Sprite_ActorImges.prototype.updateZoom = function() {
        if (this._loadedBitmap && this._loadedBitmap.isReady()) {
            if (this._zoomDuration > 0) {
                const d = this._zoomDuration;
                const t = this._zoomDuration <= params.ActionZoomDuration / 2 ? 1 : this._zoomScaleTarget;
                this._zoomScale = ((this._zoomScale * (d - 1) + t) / d);
                this._zoomDuration--;
                const scale = this._zoomScale * this._baseScale;
                this.scale.x = scale;
                this.scale.y = scale;
            } else {
                if (this.scale.x !== this._baseScale) {
                    this.resetZoom();
                }
                if (this._zoomEffect) {
                    this._zoomEffect = false;
                }
            }
        }
    };

    Sprite_ActorImges.prototype.updateSelectionEffect = function() {
        if (!params.ActorFlash || NuunManager.styleData.isDefaultActorWindow()) {
            return;
        }
        const target = this;
        if (target && this._battler.isSelected()) {
            this._selectionEffectCount++;
            if (this._selectionEffectCount % 30 < 15) {
                target.setBlendColor([255, 255, 255, 64]);
            } else {
                target.setBlendColor([0, 0, 0, 0]);
            }
        } else if (this._selectionEffectCount > 0) {
            this._selectionEffectCount = 0;
            target.setBlendColor([0, 0, 0, 0]);
        }
    };

    Sprite_ActorImges.prototype.resetDamage = function() {
        this.x = this._homeX;
    };
    
    Sprite_ActorImges.prototype.resetZoom = function() {
        this.scale.x = this._baseScale;
        this.scale.y = this._baseScale;
    };

    Sprite_ActorImges.prototype.updateActorGraphic = function() {
        const actor = this._battler;
        if (actor) {
            if (this.isFinalAttack(actor)) {
                this._updateCount = 1;
            } else if (actor.isDead() && !this.isDead()) {
                this.setDeadUpdateCount();
            } else if (actor.isAlive() && this.isDead()) {
                this.setReviveUpdateCount();
            } else if (actor.isAlive() && this._data.getGraphicName() && this._imgListId !== this._data.getGraphicIndex()) {
                if (this._data.getImgId(1) || this._data.getImgId(2) || this._data.getImgId(3) || this._data.getImgId(15)) {
                    this._updateCount = this.setDamageDuration();
                } else if (this._data.getImgId(30)) {
                    this._updateCount = this.setCounterDuration();
                } else if (this._data.getImgId(20)) {
                    this._updateCount = Infinity;
                } else {
                    this._updateCount = 1;
                }
            }
        }
        this.refreshActorGraphic(actor);
        if (this._startUpdate) {
            this._startUpdate = false;
        }
    };
    
    Sprite_ActorImges.prototype.refreshActorGraphic = function(actor) {
        if (actor && this._data.getGraphicName()) {
            if (this._imgListId !== this._data.getGraphicIndex() && this._updateCount > 0) {
                const bitmap = this._data.getLoadBattleStyleImg();
                this._loadedBitmap = bitmap;
                if (bitmap && !bitmap.isReady()) {
                    bitmap.addLoadListener(this.setActorGraphic.bind(this, actor, bitmap));
                } else if (bitmap) {
                    this.setActorGraphic(actor, bitmap);
                }
                this._imgScenes = this.getImgScenes();
                this._imgListId = this._data.getGraphicIndex();
            }
        }
        this.refreshActorCount(actor);
    };

    Sprite_ActorImges.prototype.refreshActorCount = function(actor) {
        const count = this._updateCount;
        this.updateAnimation();
        if (this._imgScenes === 'chant' && !actor.isChanting()) {
            this.resetBattleStyleImg(actor);
        } else if (actor.isBSActionBattlerImg()) {
            if (!actor.isActing() && !this.isCounterSkillAction(actor)) {
                actor.setBSActionBattlerImg(null);
                this.resetBattleStyleImg(actor);
            } else if (!this.isCounterSkillAction(actor) && this.isCounter()) {
                actor.setBSActionBattlerImg(null);
                this.resetBattleStyleImg(actor);
            }
        } else if (count > 0 && this._updateCount === 0) {
            actor.setBSActionBattlerImg(null);
            this.resetBattleStyleImg(actor);
        }
    };

    Sprite_ActorImges.prototype.isFinalAttack = function(actor) {
        return Imported.NUUN_FinalAttack && actor._onFinalAttack;
    };
    
    Sprite_ActorImges.prototype.isCounter = function() {
        return this._imgScenes === 'counter' || this._imgScenes === 'reflection' || this._imgScenes === 'counterEX';
    };
    
    Sprite_ActorImges.prototype.isChangeOpacity = function(actor) {
        return this.opacity !== this._data.getBattleStyleOpacity();
    };
    
    Sprite_ActorImges.prototype.isCounterSkillAction = function(actor) {
        return actor.isCounterSkillAction();
    };
    
    Sprite_ActorImges.prototype.resetBattleStyleImg = function(actor) {
        actor.resetBattleStyleImgId();
    };
    
    Sprite_ActorImges.prototype.setActorGraphic = function(actor, bitmap) {
        const pass = this._data.getGraphicName();
        const name = pass ? pass.split('pictures/')[1] : null;
        if (name && this.addApngChild && this.loadApngSprite(name)) {
            this.addApngChild(name);
            this._apngMode = true;
            this.resetBitmapData(bitmap.width, bitmap.height);
        } else {
            this.resetApngActorImg();
            this.bitmap = bitmap;
            if (this._data.isFaceMode()) {
                this.faceRefresh(this._data.getImgIndex());
                this.resetBitmapData(this._rectWidth, this._rectHeight);
            } else {
                this.imgFrameRefresh();
                this.resetBitmapData(bitmap.width, bitmap.height);
            }
            if (this.isDead()) {
                this._actorImgesOpacity = this.isActorGraphicDead() ? (this.opacity - this._data.getBattleStyleOpacity()) : (this.opacity - 0);
                this._durationOpacity = this.getFadeoutOpacity();
                if (this._durationOpacity !== 0) {
                    this._updateCount = this.setDeadDuration();
                }
            } else {
                this._actorImgesOpacity = this.opacity - this._data.getBattleStyleOpacity();
                this._durationOpacity = this.getFadeoutOpacity();
                if (this._durationOpacity !== 0) {
                    this._updateCount = 30;
                }
            }
        }
    };
    
    Sprite_ActorImges.prototype.updateAnimation = function(){
        if (this._updateCount > 0) {
            this._updateCount--;
            if(this._durationOpacity > 0){
                this.opacity -= this.getFadeoutOpacity() / this.setDeadDuration();
                this.opacity = Math.max(this.opacity, 0);
                this._durationOpacity = this.opacity;
            } else if (this._durationOpacity < 0) {
                this.opacity -= this.getFadeoutOpacity() / this.setDeadDuration();
                this.opacity = Math.min(this.opacity, 255);
                this._durationOpacity = this.opacity - this.getFadeoutOpacity();
            }
        }
    };
    
    Sprite_ActorImges.prototype.getFadeoutOpacity = function() {
        if (!this._actorImgesOpacity) {
            this._actorImgesOpacity = 0;
        }
        return this._actorImgesOpacity;
    };
    
    Sprite_ActorImges.prototype.getImgScenes = function() {
        return this._data.getImgScenes();
    };
    
    Sprite_ActorImges.prototype.faceRefresh = function(faceIndex) {
        const pw = ImageManager.faceWidth;
        const ph = ImageManager.faceHeight;
        const sw = Math.min((this._data.getImg_SW() || pw), this._rectWidth, pw);
        const sh = Math.min((this._data.getImg_SH() || ph), this._rectHeight, ph);
        const sx = Math.floor((faceIndex % 4) * pw + (pw - sw) / 2) + this._data.getImg_SX();
        const sy = Math.floor(Math.floor(faceIndex / 4) * ph + (ph - sh) / 2) + this._data.getImg_SY();
        this.setFrame(sx, sy, sw, sh);
        this._imgIndex = faceIndex;
    };
    
    Sprite_ActorImges.prototype.imgFrameRefresh = function() {//画像を切り替えるリセットされるため再設定
        const sw = (this._data.getImg_SW() || this._rectWidth);
        const sh = (this._data.getImg_SH() || this._rectHeight);
        const sx = (this._data.getImg_SX() || 0);
        const sy = (this._data.getImg_SY() || 0);
        this.setFrame(sx, sy, sw, sh);
    };
    
    Sprite_ActorImges.prototype.setDeadUpdateCount = function() {
        if (!params.ImgDeathHide) {
            this._updateCount = 0;
            this._actorImgesOpacity = 0;
        }
        if (this.isActorGraphicDead()) {
            this._updateCount = 1;
            this._actorImgesOpacity = (this.opacity - this._data.getBattleStyleOpacity());
        } else if (params.ImgDeathHide && !this.isActorGraphicDead()) {
            this._actorImgesOpacity = this.opacity - 0;
        }
        this._durationOpacity = this.getFadeoutOpacity();
        if (this._durationOpacity !== 0) {
            this._updateCount = this.setDeadDuration();
        }
        this.setActorDead(true);
    };
    
    Sprite_ActorImges.prototype.setReviveUpdateCount = function(){
        this._actorImgesOpacity = this.opacity - this._data.getBattleStyleOpacity();
        this._durationOpacity = this.getFadeoutOpacity();
        if (this._durationOpacity !== 0) {
            this._updateCount = this.setDeadDuration();
        }
        this.setActorDead(false);
    };
    
    Sprite_ActorImges.prototype.isActorGraphicDead = function() {
        return this._data.isDeadImg();
    };
    
    Sprite_ActorImges.prototype.setDeadDuration = function(){
        return this._startUpdate ? 1 : 30;
    };
    
    Sprite_ActorImges.prototype.setDamageDuration = function(){
        return params.DamageImgFrame;
    };
    
    Sprite_ActorImges.prototype.setCounterDuration = function(){
        return params.CounterImgFrame;
    };
    
    Sprite_ActorImges.prototype.setActorDead = function(flag){
        this._isDead = flag;
    };
    
    Sprite_ActorImges.prototype.isDead = function(){
        return this._isDead;
    };
    
    Sprite_ActorImges.prototype.resetApngActorImg = function() {
        if (this._apngMode) {
            this.destroyApngIfNeed();
            this._apngMode = null;
        }
    };
    
    Sprite_ActorImges.prototype.destroy = function() {
        this.resetApngActorImg();
        Sprite.prototype.destroy.call(this);
    };
    
    Sprite_ActorImges.prototype.loadApngSprite = function(name) {
        return Sprite_Picture.prototype.loadApngSprite.call(this, name);
    };


    function Window_BSActorWindow() {
        this.initialize(...arguments);
    }
      
    Window_BSActorWindow.prototype = Object.create(Window_Selectable.prototype);
    Window_BSActorWindow.prototype.constructor = Window_BSActorWindow;
      
    Window_BSActorWindow.prototype.initialize = function() {
        Window_Selectable.prototype.initialize.call(this, _tempParams.getExParams());
    };

    Window_BSActorWindow.prototype.setup = function(actor) {
        this._actor = actor;
        this._data = NuunManager.styleData.getActorData(actor);
        this.loadWindowskin();
        this.setWindowTone();
    };

    Window_BSActorWindow.prototype.loadWindowskin = function() {
        const skin = NuunManager.styleData.getWindowSkinEx(this._data, 'ActorWindowSkin');
        if (skin) {
            this.windowskin = ImageManager.loadSystem(skin);
        } else {
            Window_Base.prototype.loadWindowskin.apply(this, arguments);
        }
    };

    Window_BSActorWindow.prototype.setWindowTone = function() {
        const windowColor = NuunManager.styleData.getWindowColorEx(this._data, 'ActorWindowColor');
        if (windowColor) {
            this.windowColor = windowColor;
        } else {
            this.windowColor = null;
        }
    };

    Window_BSActorWindow.prototype.updateTone = function() {
        if (this.windowColor) {
            const tone = this.windowColor;
            this.setTone(tone.red, tone.green, tone.bule);
        } else {
            Window_Base.prototype.updateTone.apply(this, arguments);
        }
    };

    Window_BSActorWindow.prototype.updateArrows = function() {
  
    };

   
})();