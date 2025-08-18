/*:-----------------------------------------------------------------------------------
 * NUUN_SkillTree.js
 * 
 * Copyright (C) 2025 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Skill Tree
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.3
 * 
 * @help
 * Implement a tree-type skill learning system.
 * 
 * This plugin requires the following plugins.
 * NUUN_Base
 * https://github.com/nuun888/MZ/blob/master/README/Base.md
 * 
 * Setting
 * Set the skill list in the plugin parameters "Skill tree settings". Be sure to fill in "Skill type identifier".
 * 
 * "Actor and class skill tree settings" specifies the skill types displayed by actor and class.
 * "Skill tree id dettings" specifies the list ID or "Skill type identifier" of "Skill tree settings" to set the skill tree type to be displayed.
 * You can add skill tree types using the plugin command "Added skill tree type".
 * 
 * Skill tree list settings
 * Specify skills in the skill settings of "Skill tree settings".
 * If the skill you set is not selected as a derived skill, it will automatically become the base skill.
 * The position of the skill you set will be calculated in order from the left side of the window based on the derived skills. If you set the same coordinates as an already displayed skill, 
 * it will be displayed shifted to the right.
 * 
 * (code): You can enter the color code in the text tab.
 * 
 * 
 * Actor's notes
 * <LevelupSkillPoint:[sp]> When you level up, you will gain a specified number of skill points. If nothing is entered, the settings in the plugin parameters will be applied.
 * [sp]:Skill point
 * 
 * <InitSkillPoint:[sp]> Specifies the initial skill points. If nothing is entered, the settings in the plugin parameters will be applied.
 * [sp]:Skill point
 * 
 * Item and skill notes
 * <GainSkillPoint:[sp]> Increases or decreases the specified skill points.
 * [sp]:Skill point
 * 
 * <SkillTreeReset> Resets all skill points.
 * 
 * Skill notes
 * <SKillPointCost:[cost]> Specify the skill points to be consumed. If nothing is entered, the settings in the plugin parameters will be applied.
 * [cost]:Skill point
 * 
 * <SkillTreeItemCost:[Id],[num]> Specifies the item to be consumed. If nothing is entered, the settings in the plugin parameters will be applied.
 * [id]:Item id
 * [num]:Consumption number
 * 
 * <SkillTreeItemWeapon:[Id],[num]> Specifies the weapon to be consumed. If nothing is entered, the settings in the plugin parameters will be applied.
 * [id]:Weapon id
 * [num]:Consumption number
 * 
 * <SkillTreeArmorCost:[Id],[num]> Specify the armor to be consumed. If nothing is entered, the settings in the plugin parameters will be applied.
 * [id]:Armor id
 * [num]:Consumption number
 * 
 * <SkillTreeGoldCost:[cost]> Specify the amount of gold to be consumed. If nothing is entered, the settings in the plugin parameters will be applied.
 * [cost]:Gold Consumption
 * 
 * <SkillTreeVariablesCost:[Id],[num]> Specify the game variables to be consumed. If nothing is entered, the settings in the plugin parameters will be applied.
 * [id]:Game Variable ID
 * [num]:Consumption number
 * 
 * <SKillTreeImageImdex:[index]> Specify the index number of the sprite sheet. If nothing is entered, the settings in the plugin parameters will be applied.
 * [index]:Index id
 * 
 * Enemy Notes
 * <DropSkillPoint:[sp], [rate]> Drop skill points.
 * [sp]:Skill point
 * [rate]:Probability
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 8/18/2025 Ver.1.0.3
 * Added a feature to display skill costs even when they are 0.
 * Fixed an issue where an error would appear when increasing or decreasing skill points after installation.
 * Fixed an issue where an error would occur at the end of battle.
 * 8/17/2025 Ver.1.0.2
 * Fixed an issue that caused an error to occur when trying to learn a skill in the skill tree with loaded data.
 * Fixed so that costs can be set using an evaluation formula.
 * Fixed an issue that caused skill items to become translucent even when the conditions for learning were met.
 * 8/15/2025 Ver.1.0.1
 * Updates regarding "Skill Tree Status Screen Customization".
 * 8/14/2025 Ver.1.0.0
 * First edition.
 * 
 * 
 * @command ShowSkillTreeWindow
 * @desc Displays the skill tree window.
 * @text Skill tree window display
 * 
 * @command GainSkillPoint
 * @desc Causes the target actor to gain a skill point.
 * @text Skill point acquisition
 * 
 * @arg ActorId
 * @text Actor id
 * @desc Specifies the actor ID.
 * @type actor
 * @min 0
 * @default 0
 * 
 * @arg GainSp
 * @text Skill points acquired
 * @desc Specifies the skill points to be acquired.
 * @type number
 * @min 0
 * @default 0
 * 
 * @command SkillTreeReset
 * @desc Resets the skill tree.
 * @text Skill Tree Reset
 * 
 * @arg ActorId
 * @text Actor id
 * @desc Specifies the actor ID.
 * @type actor
 * @min 0
 * @default 0
 * 
 * @arg SkillTreeId
 * @text Skill tree setting ID
 * @desc Specify the list ID or "Skill type identifier" of "Skill tree settings".
 * @type string
 * @default 0
 * 
 * @command SkillTreeLearnSkill
 * @desc You can learn a skill. If you do not meet the learning conditions, you will not be able to learn the skill.
 * @text Skills Learning
 * 
 * @arg ActorId
 * @text Actor id
 * @desc Specifies the actor ID.
 * @type actor
 * @min 0
 * @default 0
 * 
 * @arg SkillId
 * @text Skill id
 * @desc Specify the skill ID.
 * @type skill
 * @min 0
 * @default 0
 * 
 * @command AddSkillTreeType
 * @desc Add a skill tree type.
 * @text Added skill tree type
 * 
 * @arg ActorId
 * @text Actor id
 * @desc Specifies the actor ID.
 * @type actor
 * @min 0
 * @default 0
 * 
 * @arg SkillTreeId
 * @text Skill tree setting ID
 * @desc Specify the list ID or "Skill type identifier" of "Skill tree settings".
 * @type string
 * @default 0
 * 
 * @command RemoveSkillTreeType
 * @desc Deletes skill tree types. Skill trees added via "Actor and class skill tree settings" are not included.
 * @text Skill tree type removed
 * 
 * @arg ActorId
 * @text Actor id
 * @desc Specifies the actor ID.
 * @type actor
 * @min 0
 * @default 0
 * 
 * @arg SkillTreeId
 * @text Skill tree setting ID
 * @desc Specify the list ID or "Skill type identifier" of "Skill tree settings".
 * @type string
 * @default 0
 * 
 * @arg SkillTreeReset
 * @desc Delete all skills from the corresponding skill tree.
 * @text Clear all skills
 * @type boolean
 * @default true
 * 
 * 
 * 
 * @param SkillTreeSetting
 * @text Skill tree settings
 * @desc Set the skills in the skill tree.
 * @default 
 * @type struct<SkillTreeList>[]
 * 
 * @param SkillTreeActorSetting
 * @text Actor and class skill tree settings
 * @desc Set the skill tree to display for actors and classes.
 * @default 
 * @type struct<SkillTreeActorList>[]
 * 
 * @param BasicSetting
 * @text Basic setting
 * @default ------------------------------
 * 
 * @param ShowSkillTreeCommand
 * @desc Adds skill tree commands to the menu window.
 * @text Skill tree command displa
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param SkillTreeCommandName
 * @text Skill tree command display name
 * @desc Set the name to be displayed in the menu command.
 * @type string
 * @default "Skill Tree"
 * @parent BasicSetting
 * 
 * @param ShowCommandSkillTreeSwitch
 * @text Menu command display switch ID
 * @desc Specify the switch to display in the menu command. 
 * @type switches
 * @default 0
 * @parent BasicSetting
 * 
 * @param DisplayResultMessage
 * @text End of battle message
 * @desc Skill point acquisition message displayed at the end of battle. %1: Amount of SP acquired %2: Skill point name
 * @type string
 * @default %1\%2 found!
 * @parent BasicSetting
 * 
 * @param SkillTreeTextSetting
 * @text Skill tree display skill settings
 * @default ------------------------------
 * 
 * @param SkillTreeTextType
 * @text Skill name display type
 * @desc Specifies the skill name display type.
 * @type select
 * @option Icon
 * @value "icon"
 * @option Icon & Skill
 * @value "default"
 * @option Skill
 * @value "name"
 * @default default
 * @parent SkillTreeTextSetting
 * 
 * @param SkillTreeSecretText
 * @text Secret text
 * @desc Set the text to be displayed as secret text.
 * @type string
 * @default ????
 * @parent SkillTreeTextSetting
 * 
 * @param SecretIcon
 * @text Secret Icon
 * @desc Specify the icon index when secret. (Text type is icon.)
 * @type icon
 * @default 0
 * @min 0
 * @parent SkillTreeTextSetting
 * 
 * @param ClassSetting
 * @text Class setting
 * @default ------------------------------
 * 
 * @param SkillTreeClass
 * @desc Shows the skill tree of the current class. OFF shows all.
 * @text Current class skill tree display
 * @type boolean
 * @default true
 * @parent ClassSetting
 * 
 * @param ChangeClassResetSkillTree
 * @desc When changing classes, all skills of the previous class will be reset.
 * @text Skill reset when changing class
 * @type boolean
 * @default true
 * @parent ClassSetting
 * 
 * @param WindowSetting
 * @text Window setting
 * @default ------------------------------
 * 
 * @param SkillTypeSetting
 * @text Skill tree type window settings
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param SkillTypeWindow
 * @text Skill tree type window settings
 * @desc Configure the Skill Tree Type window.
 * @default {"WindowX":"0","WindowY":"230","WindowWidth":"240"}
 * @type struct<CommandWindowSetting>
 * @parent SkillTypeSetting
 * 
 * @param SkillTypeWindowTransparent
 * @desc Makes the skill tree type window image transparent.
 * @text Skill tree type window transparency
 * @type boolean
 * @default false
 * @parent SkillTypeSetting
 * 
 * @param SkillTypeCols
 * @text Number of skill tree type columns
 * @desc Number of columns in skill tree type.
 * @type number
 * @default 1
 * @min 1
 * @parent SkillTypeSetting
 * 
 * @param SkillTypeRows
 * @text Skill Tree Type Number of Lines
 * @desc Number of lines in skill tree type.
 * @type number
 * @default 3
 * @min 1
 * @parent SkillTypeSetting
 * 
 * @param SkillTreeWindowSetting
 * @text Skill tree window settings
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param SkillTreeWindow
 * @text Skill tree window settings
 * @desc Configure the Skill Tree window.
 * @default {"WindowX":"240","WindowY":"96","WindowWidth":"576","WindowHeight":"0"}
 * @type struct<WindowSetting>
 * @parent SkillTreeWindowSetting
 * 
 * @param SkillTreeWindowTransparent
 * @desc Makes the skill tree window image transparent.
 * @text Skill tree window transparency
 * @type boolean
 * @default false
 * @parent SkillTreeWindowSetting
 * 
 * @param SkillTreeCols
 * @text Skill tree columns
 * @desc Number of columns in the skill tree.
 * @type number
 * @default 4
 * @min 1
 * @parent SkillTreeWindowSetting
 * 
 * @param SkillTreeCostSetting
 * @text Skill tree cost window settings
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param SkillTreeCostWindow
 * @text Skill tree cost window settings
 * @desc Configure the skill cost window settings.
 * @default {"WindowX":"0","WindowY":"384","WindowWidth":"240","WindowHeight":"0"}
 * @type struct<WindowSetting>
 * @parent SkillTreeCostSetting
 * 
 * @param CostWindowTransparent
 * @desc Makes the skill tree cost window image transparent.
 * @text Skill Tree Cost Window Transparency
 * @type boolean
 * @default false
 * @parent SkillTreeCostSetting
 * 
 * @param CostWindowCols
 * @text Skill Tree Cost Window Column Count
 * @desc Number of columns in the Skill Tree Cost window
 * @type number
 * @default 1
 * @min 1
 * @parent SkillTreeWindowSetting
 * 
 * @param SkillCostName
 * @text Skill cost display name
 * @desc The display name for the skill cost.
 * @type string
 * @default "Learning Cost"
 * @parent SkillTreeCostSetting
 * 
 * @param SkillCostIcon
 * @text Skill point consumption icon
 * @desc Specifies the icon for the text that consumes skill points.
 * @type icon
 * @default 0
 * @min 0
 * @parent SkillTreeCostSetting
 * 
 * @param SkillCosTColor
 * @text Cost color (code)
 * @desc Specifies the color of the skill cost.
 * @type color
 * @default 17
 * @min 0
 * @parent SkillTreeCostSetting
 * 
 * @param GoldCostIcon
 * @text Gold consumption icon
 * @desc Specify the icon for text that consumes gold.
 * @type icon
 * @default 0
 * @min 0
 * @parent SkillTreeCostSetting
 * 
 * @param VarCostIcon
 * @text Game variable consumption icon
 * @desc Specifies the icon for the text that consumes the game variable.
 * @type icon
 * @default 0
 * @min 0
 * @parent SkillTreeCostSetting
 * 
 * @param SkillCostType
 * @text Skill cost display type
 * @desc Sets the display type of skill costs.
 * @type select
 * @option Cost
 * @value type1
 * @option Cost[Skill points]
 * @value type2
 * @option Cost (Skill points)
 * @value type3
 * @option Cost/Skill Points
 * @value type4
 * @default type3
 * @parent SkillTreeCostSetting
 * 
 * @param VisibleSkillPointZero
 * @desc Skill points will be displayed in the cost window even if the cost is 0.
 * @text Skill point cost 0 display
 * @type boolean
 * @default false
 * @parent SkillTreeCostSetting
 * 
 * @param SkillTreeStatusSetting
 * @text Status window settings
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param SkillTreeStatusWindow
 * @text Status window settings
 * @desc Configure the status window settings.
 * @default {"WindowX":"0","WindowY":"96","WindowWidth":"240","WindowHeight":"134"}
 * @type struct<WindowSetting>
 * @parent SkillTreeStatusSetting
 * 
 * @param StatusWindowTransparent
 * @desc Make status window images transparent.
 * @text Status window transparency
 * @type boolean
 * @default false
 * @parent SkillTreeStatusSetting
 * 
 * @param SkillTreeHelpSetting
 * @text Help window settings
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param SkillTreeHelpWindow
 * @text Help window settings
 * @desc Configure the Help window.
 * @default {"WindowX":"0","WindowY":"0","WindowWidth":"0","WindowHeight":"0"}
 * @type struct<WindowSetting>
 * @parent SkillTreeHelpSetting
 * 
 * @param HelpWindowTransparent
 * @desc Make the help window image transparent.
 * @text Help window transparency
 * @type boolean
 * @default false
 * @parent SkillTreeHelpSetting
 * 
 * @param SkillTreeConfirmationSetting
 * @text Confirmation window settings
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param LearnConfirmation
 * @desc A confirmation window will be displayed when learning a skill.
 * @text Confirmation window displayed when acquiring skills
 * @type boolean
 * @default true
 * @parent SkillTreeConfirmationSetting
 * 
 * @param SkillTreeConfirmationWindow
 * @text Confirmation window settings
 * @desc Configure the confirmation window settings.
 * @default {"WindowX":"204","WindowY":"120","WindowWidth":"408"}
 * @type struct<CommandWindowSetting>
 * @parent SkillTreeConfirmationSetting
 * 
 * @param ConfirmationWindowTitle
 * @text Confirmation window display name
 * @desc Specify the display name that will be displayed in the confirmation window.
 * @type string
 * @default "Checking skill learning"
 * @parent SkillTreeConfirmationSetting
 * 
 * @param ConfirmatioOkText
 * @text Confirmation window execution display name
 * @desc Specifies the display name for the run that will be displayed in the confirmation window.
 * @type string
 * @default "Execute"
 * @parent SkillTreeConfirmationSetting
 * 
 * @param ConfirmationCancleText
 * @text Confirmation window cancel display name
 * @desc Specifies the display name of the cancellation that will be displayed in the confirmation window.
 * @type string
 * @default "Not Executed"
 * @parent SkillTreeConfirmationSetting
 * 
 * @param LearnSetting
 * @text Skill learning settings
 * @default ------------------------------
 * 
 * @param LearnSESetting
 * @text Skill learning sound effects
 * @desc Sets the sound effect when learning skills.
 * @type struct<LearnSE>
 * @default {"LearnSE":"","volume":"90","pitch":"100","pan":"0"}
 * @parent LearnSetting
 * 
 * @param LearnedColor
 * @text Learned character color (code)
 * @desc 習得Specifies the color of the learned characters. -1 is the original color
 * @type color
 * @default 0
 * @min -1
 * @parent LearnSetting
 * 
 * @param LearnedIconSetting
 * @text Learned icon settings
 * @default ------------------------------
 * @parent LearnSetting
 * 
 * @param LearnedIcon
 * @text Learned icon
 * @desc Specifies the learned icon.
 * @type icon
 * @default 0
 * @min 0
 * @parent LearnedIconSetting
 * 
 * @param LearnedIconX
 * @text Icon X coordinate (relative)
 * @desc Specifies the X coordinate of the icon (relative coordinate).
 * @type number
 * @default 0
 * @min -9999
 * @parent LearnedIconSetting
 * 
 * @param LearnedIconY
 * @text Icon Y coordinate (relative)
 * @desc Specifies the Y coordinate of the icon (relative coordinate).
 * @type number
 * @default 0
 * @min -9999
 * @parent LearnedIconSetting
 * 
 * @param LearnedIconSize
 * @text Icon Size
 * @desc Specifies the size of the icon.
 * @type number
 * @default 16
 * @min 0
 * @parent LearnedIconSetting
 * 
 * @param SkillPointSetting
 * @text Skill point settings
 * @default ------------------------------
 * 
 * @param SkillPointName
 * @text Skill point display name
 * @desc The display name of the skill point.
 * @type string
 * @default SP
 * @parent SkillPointSetting
 * 
 * @param DefaultInitSkillPoint
 * @text Default starting skill points
 * @desc Default starting skill points.
 * @type number
 * @default 0
 * @parent SkillPointSetting
 * 
 * @param MaxSkillPoint
 * @text Maximum skill points
 * @desc Maximum skill points.
 * @type number
 * @default Infinity
 * @parent SkillPointSetting
 * 
 * @param DefaultSkillPointCost
 * @text Default skill point cost
 * @desc Default skill point cost.
 * @type number
 * @default 0
 * @parent SkillPointSetting
 * 
 * @param LevelupGainSkillPoint
 * @text Skill points acquired when leveling up
 * @desc Skill points gained when leveling up.
 * @type number
 * @default 1
 * @parent SkillPointSetting
 * 
 * @param DisplayLevelUpMessage
 * @text Level-up skill point acquisition message
 * @desc Skill point acquisition message displayed when leveling up. %1: Actor name %2: Amount of SP acquired %3: Skill point name
 * @type string
 * @default %1 received %2 %3!
 * @parent SkillPointSetting
 * 
 * @param BenchMembarsGainSkillPoint
 * @desc Bench members will also earn skill points when they win battles.
 * @text Bench Member Skill Point Acquisition
 * @type boolean
 * @default false
 * @parent SkillPointSetting
 * 
 * @param SkillSetting
 * @text Skill content setting
 * @default ------------------------------
 * 
 * @param SkillFrameType
 * @text Skill content display type
 * @desc Sets the display type of the skill content.
 * @type select
 * @option Default
 * @value default
 * @option With frame (with content background)
 * @value frameBack
 * @option With frame (no content background)
 * @value frame
 * @option Images (sprite sheets)
 * @value spritesheet
 * @default default
 * @parent SkillSetting
 * 
 * @param ColsMargin
 * @text Horizontal spacing per item
 * @desc Horizontal spacing per item.
 * @type number
 * @default 12
 * @parent SkillSetting
 * 
 * @param RowsMargin
 * @text Vertical spacing per item
 * @desc Vertical spacing per item.
 * @type number
 * @default 24
 * @parent SkillSetting
 * 
 * 
 * @param LineSetting
 * @text Line setting
 * @default ------------------------------
 * 
 * @param LineType
 * @text Line Type
 * @desc Specifies the line type.
 * @type select
 * @option Straight
 * @value straight
 * @option Type1
 * @value type1
 * @option Type1
 * @value type2
 * @option None
 * @value none
 * @default type1
 * @parent LineSetting
 * 
 * @param LineThick
 * @text Line thickness
 * @desc Specify the thickness of the line.
 * @type number
 * @default 2
 * @min 0
 * @parent LineSetting
 * 
 * @param NormalLineColor
 * @text Color of the line when the learning condition is not met (code)
 * @desc Specify the color of the lines that do not meet the learning conditions.
 * @type color
 * @default 15
 * @min 0
 * @parent FrameSetting
 * 
 * @param LearnedLineColor
 * @text Color of learned lines (code)
 * @desc Specify the color of the lines you have learned.
 * @type color
 * @default 17
 * @min 0
 * @parent LineSetting
 * 
 * @param UnlearnedLineColor
 * @text Unlearned line color (code)
 * @desc Specify the color of the line for the unskilled items that meet the mastery conditions.
 * @type color
 * @default 0
 * @min 0
 * @parent LineSetting
 * 
 * @param SkillCountSetting
 * @text Skill count settings
 * @default ------------------------------
 * 
 * @param ShowSkillCountFrame
 * @desc Skills A skill acquisition count frame is displayed for skills that can be acquired multiple times.
 * @text Learning count frame
 * @type boolean
 * @default true
 * @parent SkillCountSetting
 * 
 * @param SkillCountFrameColor
 * @text Learning count frame color (code)
 * @desc Specify the color of the learning count frame.
 * @type color
 * @default 17
 * @min 0
 * @parent SkillCountSetting
 * 
 * @param SkillCountFontColor
 * @text Learning count text color (code)
 * @desc Specify the text color for the learning count.
 * @type color
 * @default 17
 * @min 0
 * @parent SkillCountSetting
 * 
 * @param SkillCountFrameX
 * @text X coordinate of the learning count frame (relative)
 * @desc Adjusts the X coordinate (relative) of the learning count frame.
 * @type number
 * @default 0
 * @parent SkillCountSetting
 * 
 * @param SkillCountFrameY
 * @text Y coordinate of the learning count frame (relative)
 * @desc Adjusts the Y coordinate (relative) of the learning count frame.
 * @type number
 * @default 0
 * @parent SkillCountSetting
 * 
 * @param FrameSetting
 * @text Frame settings
 * @default ------------------------------
 * 
 * @param FrameThick
 * @text Frame border thickness.
 * @desc Specifies the thickness of the frame border.
 * @type number
 * @default 3
 * @min 0
 * @parent FrameSetting
 * 
 * @param FrameWidth
 * @text Frame width
 * @desc Specifies the width of the frame. 0 is the content width.
 * @type number
 * @default 0
 * @min 0
 * @parent FrameSetting
 * 
 * @param FrameX
 * @text Frame X coordinate (relative)
 * @desc Adjust the frame's X coordinate (relative).
 * @type number
 * @default 0
 * @parent FrameSetting
 * 
 * @param NormalFrameColor
 * @text Color of frame when learning conditions are not met (code)
 * @desc Specify the border color for items that do not meet the learning requirements.
 * @type color
 * @default 15
 * @min 0
 * @parent FrameSetting
 * 
 * @param LearnedFrameColor
 * @text Learned frame color (code)
 * @desc Specify the color of the learned frame.
 * @type color
 * @default 17
 * @min 0
 * @parent FrameSetting
 * 
 * @param UnlearnedFrameColor
 * @text Unlearned frame color (code)
 * @desc Specifies the color of the frames for items that have not yet been mastered but meet the mastery requirements.
 * @type color
 * @default 0
 * @min 0
 * @parent FrameSetting
 * 
 * @param ImagsSetting
 * @text Image Settings
 * @default ------------------------------
 * 
 * @param ContentsBackImage
 * @text Content background image
 * @desc Content background sprite sheet image
 * @type file
 * @dir img/
 * @default
 * @parent ImagsSetting
 * 
 * @param FocusImageIndex
 * @text Focused Index
 * @desc Specifies the index of the sprite sheet image when focused.
 * @type number
 * @default 0
 * @parent ImagsSetting
 * 
 * @param HideFocusCursor
 * @desc Hides the cursor when in focus.
 * @text Hide cursor when focused
 * @type boolean
 * @default true
 * @parent ImagsSetting
 * 
 * @param ContentsBackImageCols
 * @text Number of horizontal divisions in sprite sheet
 * @desc Specifies the number of horizontal divisions in the sprite sheet.
 * @type number
 * @default 4
 * @min 1
 * @parent ImagsSetting
 * 
 * @param ContentsBackImageRows
 * @text Number of vertical divisions in sprite sheet
 * @desc Specifies the number of vertical divisions in the sprite sheet.
 * @type number
 * @default 2
 * @min 1
 * @parent ImagsSetting
 * 
 * @param BackgroundSetting
 * @text Background image
 * @default ------------------------------
 * 
 * @param BackgroundImage
 * @text Background image
 * @desc Specify the background image.
 * @type file
 * @dir img/
 * @default
 * @parent BackgroundSetting
 * 
 * @param BackUiWidth
 * @text Background image window UI size
 * @desc Fit the background image to the window UI size.
 * @type boolean
 * @default true
 * @parent BackgroundSetting
 * 
 */
/*~struct~CommandWindowSetting:
 * 
 * @param WindowX
 * @text Window X coordinate
 * @desc X coordinate of the window.
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param WindowY
 * @desc Y coordinate of the window.
 * @text Window Y coordinate
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param WindowWidth
 * @desc The width of the window.
 * @text Window Width
 * @type number
 * @default 0
 * @min 0
 * 
 */
/*~struct~WindowSetting:
 * 
 * @param WindowX
 * @text Window X coordinate
 * @desc X coordinate of the window.
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param WindowY
 * @desc Y coordinate of the window.
 * @text Window Y coordinate
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param WindowWidth
 * @desc The width of the window.
 * @text Window Width
 * @type number
 * @default 0
 * @min 0
 * 
 * @param WindowHeight
 * @text Window Height
 * @desc Window height. 0 is the main area height (Help window setting is the help area height)
 * @type number
 * @default 0
 * @min 0
 * 
 */
/*~struct~SkillTreeList:
 * 
 * @param SymbolName
 * @text Skill type identifier
 * @desc Set any string.
 * @type string
 * @default 
 * 
 * @param SkillTreeName
 * @text Skill type name
 * @desc Specify the skill type name.
 * @type string
 * @default 
 * 
 * @param SkillTreeList
 * @text Skill Settings
 * @desc Set the skill list to be displayed in the skill tree.
 * @default 
 * @type struct<SkillTreeDataTable>[]
 * 
 */
/*~struct~SkillTreeActorList:
 * 
 * @param ActorId
 * @text Actor id
 * @desc Specify the actor.
 * @type actor
 * @default 0
 * 
 * @param ClassId
 * @text Class id
 * @desc Specify the class.
 * @type class
 * @default 0
 * 
 * @param SkillTreeCategoryList
 * @text Skill tree id dettings
 * @desc Sets the skill tree list to display. Specify the list ID or "Skill type identifier" in "Skill tree settings".
 * @default []
 * @type string[]
 * 
 * 
 */
/*~struct~SkillTreeDataTable:
 * 
 * @param SkillId
 * @text Skill id
 * @desc Specify the skill.
 * @type skill
 * @default 0
 * 
 * @param DerivedSkill
 * @text Derived Skills
 * @desc Set the derived skills.
 * @type skill[]
 * @default []
 * 
 * @param DerivedSkillX
 * @text Display X column
 * @desc Specify the column to display. If it is 1 or more, it will be displayed in the specified column.
 * @type number
 * @default 0
 * 
 * @param DerivedSkillY
 * @text Display Y line
 * @desc Specify the line to display. If it is 1 or more, it will be displayed on the specified line.
 * @type number
 * @default 0
 * 
 * @param CostSetting
 * @text Cost setting
 * @default ------------------------------
 * 
 * @param Cost
 * @text Skill point cost
 * @desc Set the cost of skill points to be consumed.(You can also enter an evaluation formula)
 * @type string
 * @default 0
 * @parent CostSetting
 * 
 * @param CostItemSetting
 * @text Item cost settings
 * @default ------------------------------
 * @parent CostSetting
 * 
 * @param CostItem
 * @text Consumable item cost
 * @desc Set the item to be consumed.
 * @type item
 * @default 0
 * @parent CostItemSetting
 * 
 * @param ConsumeItemCost
 * @text Number of consumable items
 * @desc Set the number of items to be consumed.(You can also enter an evaluation formula)
 * @type string
 * @default 0
 * @parent CostItemSetting
 * 
 * @param CostWeaponSetting
 * @text Weapon cost settings
 * @default ------------------------------
 * @parent CostSetting
 * 
 * @param CostWeapon
 * @text Weapon cost
 * @desc Set the weapon to be consumed.
 * @type weapon
 * @default 0
 * @parent CostWeaponSetting
 * 
 * @param ConsumeWeaponCost
 * @text Number of weapons consumed
 * @desc Set the number of weapons to be consumed.(You can also enter an evaluation formula)
 * @type string
 * @default 0
 * @parent CostWeaponSetting
 * 
 * @param CostArmorSetting
 * @text Armor cost settings
 * @default ------------------------------
 * @parent CostSetting
 * 
 * @param CostArmor
 * @text Consumed armor cost
 * @desc Set the armor to be consumed.
 * @type armor
 * @default 0
 * @parent CostArmorSetting
 * 
 * @param ConsumeArmorCost
 * @text Number of armors consumed
 * @desc Set the number of armor pieces to be consumed.(You can also enter an evaluation formula)
 * @type string
 * @default 0
 * @parent CostArmorSetting
 * 
 * @param CostGoldSetting
 * @text Gold cost setting
 * @default ------------------------------
 * @parent CostSetting
 * 
 * @param CostGold
 * @text Gold consumption
 * @desc Set the gold to be consumed as a cost.(You can also enter an evaluation formula)
 * @type string
 * @default 0
 * @parent CostGoldSetting
 * 
 * @param CostVariablesSetting
 * @text Variable cost settings
 * @default ------------------------------
 * @parent CostSetting
 * 
 * @param CostVariables
 * @text Consumed game variable cost
 * @desc Set the game variable to consume.
 * @type variables
 * @default 0
 * @parent CostVariablesSetting
 * 
 * @param ConsumeVariablesCost
 * @text Consumption game variables
 * @desc Set the number of game variables to consume.(You can also enter an evaluation formula)
 * @type string
 * @default 0
 * @parent CostVariablesSetting
 * 
 * @param DisplayVariablesCostText
 * @text Consumed game variable text
 * @desc The text displayed for the consuming game variable.
 * @type string
 * @default 
 * @parent CostVariablesSetting
 * 
 * @param LearnSetting
 * @text Learning settings
 * @default ------------------------------
 * 
 * @param MaxCount
 * @text Number of times learned
 * @desc Specify the number of times you can learn it. 0 is 1 time
 * @type number
 * @default 0
 * @parent LearnSetting
 * 
 * @param LearnCond
 * @text learning conditions
 * @desc Enter the conditions for acquiring skills in JavaScript.
 * @type combo
 * @option 'v[0];//Variables'
 * @option 's[0];//Switches'
 * @option 'actor._level >= 10;//Actor level 10 or higher'
 * @default 
 * @parent LearnSetting
 * 
 * @param IndividualSetting
 * @text Individual setting
 * @default ------------------------------
 * 
 * @param LineType
 * @text Line Type
 * @desc Specifies the line type.
 * @type select
 * @option Straight
 * @value straight
 * @option Type1
 * @value type1
 * @option Type1
 * @value type2
 * @option None
 * @value none
 * @default none
 * @parent IndividualSetting
 * 
 * @param DisplayConditionsSetting
 * @text Display condition settings
 * @default ------------------------------
 * 
 * @param SkillTreeCond
 * @text Display conditions
 * @desc Enter the conditions for displaying in the skill tree in JavaScript.
 * @type combo
 * @option 'v[0];//Variables'
 * @option 's[0];//Switches'
 * @option 's[0];//Switches'
 * @default 
 * @parent DisplayConditionsSetting
 * 
 * @param SkillTreeSecret
 * @text Secret Conditions
 * @desc Enter the conditions for displaying secrets in the skill tree using JavaScript.
 * @type combo
 * @option 'v[0];//Variables'
 * @option 's[0];//Switches'
 * @default 
 * @parent DisplayConditionsSetting
 * 
 * @param FrameImageSetting
 * @text Sprite sheet image settings
 * @default ------------------------------
 * 
 * @param ImageIndex
 * @text Image index
 * @desc Specifies the index of the sprite sheet image.
 * @type number
 * @default 0
 * @parent FrameImageSetting
 * 
 */
/*~struct~LearnSE:
 * 
 * @param LearnSE
 * @text Skill learning sound effects
 * @desc Skill learning sound effects.
 * @type file
 * @dir audio/se/
 * 
 * @param volume
 * @text Volume
 * @desc Volume
 * @type number
 * @default 90
 * 
 * @param pitch
 * @text Pitch
 * @desc Pitch
 * @type number
 * @default 100
 * 
 * @param pan
 * @text Pan
 * @desc Pan
 * @type number
 * @max 100
 * @min -100
 * @default 0
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc スキルツリー
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.3
 * 
 * @help
 * ツリー型のスキル習得システムを実装します。
 * 
 * 設定
 * プラグインパラメータのスキルツリー設定でスキルリストの設定を行います。識別名は必ず記入して下さい。
 * 
 * アクター、クラススキルツリー設定でアクター、職業によって表示されるスキルタイプを指定します。
 * スキルツリーID設定はスキルツリー設定のリストIDまたは識別名を指定し表示されるスキルツリータイプを設定してください。
 * ※プラグインコマンドのスキルツリータイプ追加でスキルツリータイプを追加できます。
 * 
 * スキルツリーリストの設定
 * スキルツリー設定のスキル設定でスキルを指定します。
 * 設定したスキルが派生スキルで選択されていない場合は、自動的に起点スキルになります。
 * 設定したスキルはウィンドウの左側から派生スキルを元に順に位置が算出されます。既に表示されている座標に後から同じ座標に設定されている場合は、
 * 右側にずれて表示されます。
 * 派生スキルの終端スキルは設定しなくても問題ありませんが、座標やコスト等を設定する場合は追加する必要があります。
 * 
 * (code):テキストタブでカラーコードを記入できます。
 * 
 * 
 * アクターのメモ欄
 * <LevelupSkillPoint:[sp]> レベルアップ時に指定のスキルポイントを得ます。記入がない場合はプラグインパラメータの設定が適用されます。
 * [sp]:スキルポイント
 * 
 * <InitSkillPoint:[sp]> 初期のスキルポイントを指定します。記入がない場合はプラグインパラメータの設定が適用されます。
 * [sp]:スキルポイント
 * 
 * アイテム、スキルのメモ欄
 * <GainSkillPoint:[sp]> 指定のスキルポイントを増減させます。
 * [sp]:スキルポイント
 * 
 * <SkillTreeReset> スキルポイントを全てリセットします。
 * 
 * スキルのメモ欄
 * <SKillPointCost:[cost]> 消費するスキルポイントを指定します。記入がない場合はプラグインパラメータの設定が適用されます。
 * [cost]:スキルポイント
 * 
 * <SkillTreeItemCost:[Id],[num]> 消費するアイテムを指定します。記入がない場合はプラグインパラメータの設定が適用されます。
 * [id]:アイテムID
 * [num]:消費アイテム個数
 * 
 * <SkillTreeItemWeapon:[Id],[num]> 消費する武器を指定します。記入がない場合はプラグインパラメータの設定が適用されます。
 * [id]:武器ID
 * [num]:消費武器個数
 * 
 * <SkillTreeArmorCost:[Id],[num]> 消費する防具を指定します。記入がない場合はプラグインパラメータの設定が適用されます。
 * [id]:防具ID
 * [num]:消費防具個数
 * 
 * <SkillTreeGoldCost:[cost]> 消費する金額を指定します。記入がない場合はプラグインパラメータの設定が適用されます。
 * [cost]:消費金額
 * 
 * <SkillTreeVariablesCost:[Id],[num]> 消費するゲーム変数を指定します。記入がない場合はプラグインパラメータの設定が適用されます。
 * [id]:ゲーム変数ID
 * [num]:消費数
 * 
 * <SKillTreeImageImdex:[index]> スプライトシートのインデックス番号を指定します。記入がない場合はプラグインパラメータの設定が適用されます。
 * [index]:インデックス番号
 * 
 * 敵キャラのメモ欄
 * <DropSkillPoint:[sp], [rate]> スキルポイントをドロップします。
 * [sp]:スキルポイント
 * [rate]:確率
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2025/8/18 Ver.1.0.3
 * 消費スキルコストが0の時でもコストを表示する機能を追加。
 * 導入後にスキルポイントを増減させるとえあらーが出る問題を修正。
 * 戦闘終了時にエラーが出る問題を修正。
 * 2025/8/17 Ver.1.0.2
 * ロードしたデータでスキルツリーでスキルを習得しようとした場合にエラーが出る問題を修正。
 * コストに評価式で設定できるように修正。
 * 習得条件を満たしているにもかかわらず、スキル項目が選択不能状態になる問題を修正。
 * 2025/8/15 Ver.1.0.1
 * スキルツリーステータス画面カスタマイズに関する更新。
 * 2025/8/14 Ver.1.0.0
 * 初版
 * 
 * 
 * @command ShowSkillTreeWindow
 * @desc スキルツリーウィンドウを表示します。
 * @text スキルツリーウィンドウ表示
 * 
 * @command GainSkillPoint
 * @desc 対象のアクターにスキルポイントを取得させます。
 * @text スキルポイント取得
 * 
 * @arg ActorId
 * @text アクターID
 * @desc アクターIDを指定します。
 * @type actor
 * @min 0
 * @default 0
 * 
 * @arg GainSp
 * @text 取得スキルポイント
 * @desc 取得するスキルポイントを指定します。
 * @type number
 * @min 0
 * @default 0
 * 
 * @command SkillTreeReset
 * @desc スキルツリーをリセットします。
 * @text スキルツリーリセット
 * 
 * @arg ActorId
 * @text アクターID
 * @desc アクターIDを指定します。
 * @type actor
 * @min 0
 * @default 0
 * 
 * @arg SkillTreeType
 * @text スキルツリータイプ
 * @desc スキルツリータイプをIDまたは識別名で指定します。未指定で全てのタイプがリセットされます。
 * @type string
 * @default
 * 
 * @command SkillTreeLearnSkill
 * @desc スキルを習得します。習得条件を満たしていない場合は習得出来ません。
 * @text スキル習得
 * 
 * @arg ActorId
 * @text アクターID
 * @desc アクターIDを指定します。
 * @type actor
 * @min 0
 * @default 0
 * 
 * @arg SkillId
 * @text スキルID
 * @desc スキルIDを指定します。
 * @type skill
 * @min 0
 * @default 0
 * 
 * @command AddSkillTreeType
 * @desc スキルツリータイプを追加します。
 * @text スキルツリータイプ追加
 * 
 * @arg ActorId
 * @text アクターID
 * @desc アクターIDを指定します。
 * @type actor
 * @min 0
 * @default 0
 * 
 * @arg SkillTreeId
 * @text スキルツリー設定ID
 * @desc スキルツリー設定のリストIDまたは識別名を指定します。
 * @type string
 * @default 0
 * 
 * @command RemoveSkillTreeType
 * @desc スキルツリータイプを削除します。アクター、クラススキルツリー設定で追加されたスキルツリーは対象外です。
 * @text スキルツリータイプ削除
 * 
 * @arg ActorId
 * @text アクターID
 * @desc アクターIDを指定します。
 * @type actor
 * @min 0
 * @default 0
 * 
 * @arg SkillTreeId
 * @text スキルツリー設定ID
 * @desc スキルツリー設定のリストIDまたは識別名を指定します。
 * @type string
 * @default 0
 * 
 * @arg SkillTreeReset
 * @desc 該当のスキルツリーのスキルを全て消去する。
 * @text スキル全消去
 * @type boolean
 * @default true
 * 
 * 
 * 
 * @param SkillTreeSetting
 * @text スキルツリー設定
 * @desc スキルツリーのスキルの設定を行います。
 * @default 
 * @type struct<SkillTreeList>[]
 * 
 * @param SkillTreeActorSetting
 * @text アクター、クラススキルツリー設定
 * @desc アクター、クラスの表示するスキルツリーの設定を行います。
 * @default 
 * @type struct<SkillTreeActorList>[]
 * 
 * @param BasicSetting
 * @text 基本設定
 * @default ------------------------------
 * 
 * @param ShowSkillTreeCommand
 * @desc メニューウィンドウにスキルツリーコマンドを追加します。
 * @text スキルツリーコマンド表示
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param SkillTreeCommandName
 * @text スキルツリーコマンド表示名
 * @desc メニューコマンドに表示させる名前を設定します。
 * @type string
 * @default スキルツリー
 * @parent BasicSetting
 * 
 * @param ShowCommandSkillTreeSwitch
 * @text メニューコマンド表示スイッチID
 * @desc メニューコマンドに表示するスイッチを指定します。0で表示
 * @type switches
 * @default 0
 * @parent BasicSetting
 * 
 * @param DisplayResultMessage
 * @text 戦闘終了時メッセージ
 * @desc 戦闘終了時に表示されるスキルポイントの入手メッセージ。%1:獲得SP量 %2:スキルポイント名
 * @type string
 * @default %1 の%2を獲得！
 * @parent BasicSetting
 * 
 * @param SkillTreeTextSetting
 * @text スキルツリー表示スキル設定
 * @default ------------------------------
 * 
 * @param SkillTreeTextType
 * @text スキル名表示タイプ
 * @desc スキル名表示のタイプを指定します。
 * @type select
 * @option アイコンのみ
 * @value "icon"
 * @option アイコン、スキル名
 * @value "default"
 * @option スキル名のみ
 * @value "name"
 * @default default
 * @parent SkillTreeTextSetting
 * 
 * @param SkillTreeSecretText
 * @text シークレット
 * @desc シークレットテキストの表示させるテキストを設定します。
 * @type string
 * @default ？？？？
 * @parent SkillTreeTextSetting
 * 
 * @param SecretIcon
 * @text シークレットアイコン
 * @desc シークレット時のアイコンインデックスを指定します。(テキストタイプがアイコン)
 * @type icon
 * @default 0
 * @min 0
 * @parent SkillTreeTextSetting
 * 
 * @param ClassSetting
 * @text クラス設定
 * @default ------------------------------
 * 
 * @param SkillTreeClass
 * @desc 現在のクラスのスキルツリーを表示します。OFFで全て表示
 * @text 現在クラススキルツリー表示
 * @type boolean
 * @default true
 * @parent ClassSetting
 * 
 * @param ChangeClassResetSkillTree
 * @desc クラス変更時変更前のクラスのスキルを全てリセットします。
 * @text クラス変更時スキルリセット
 * @type boolean
 * @default true
 * @parent ClassSetting
 * 
 * @param WindowSetting
 * @text ウィンドウ設定
 * @default ------------------------------
 * 
 * @param SkillTypeSetting
 * @text スキルタイプウィンドウ設定
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param SkillTypeWindow
 * @text スキルツリータイプウィンドウ設定
 * @desc スキルツリータイプウィンドウの設定を行います。
 * @default {"WindowX":"0","WindowY":"230","WindowWidth":"240"}
 * @type struct<CommandWindowSetting>
 * @parent SkillTypeSetting
 * 
 * @param SkillTypeWindowTransparent
 * @desc スキルツリータイプウィンドウ画像を透明化。
 * @text スキルツリータイプウィンドウ透明化
 * @type boolean
 * @default false
 * @parent SkillTypeSetting
 * 
 * @param SkillTypeCols
 * @text スキルツリータイプ列数
 * @desc スキルツリータイプの列数
 * @type number
 * @default 1
 * @min 1
 * @parent SkillTypeSetting
 * 
 * @param SkillTypeRows
 * @text スキルツリータイプ行数
 * @desc スキルツリータイプの行数
 * @type number
 * @default 3
 * @min 1
 * @parent SkillTypeSetting
 * 
 * @param SkillTreeWindowSetting
 * @text スキルタイプウィンドウ設定
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param SkillTreeWindow
 * @text スキルツリーウィンドウ設定
 * @desc スキルツリーウィンドウの設定を行います。
 * @default {"WindowX":"240","WindowY":"96","WindowWidth":"576","WindowHeight":"0"}
 * @type struct<WindowSetting>
 * @parent SkillTreeWindowSetting
 * 
 * @param SkillTreeWindowTransparent
 * @desc スキルツリーウィンドウ画像を透明化。
 * @text スキルツリーウィンドウ透明化
 * @type boolean
 * @default false
 * @parent SkillTreeWindowSetting
 * 
 * @param SkillTreeCols
 * @text スキルツリー列数
 * @desc スキルツリーの列数
 * @type number
 * @default 4
 * @min 1
 * @parent SkillTreeWindowSetting
 * 
 * @param SkillTreeCostSetting
 * @text スキルツリーコストウィンドウ設定
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param SkillTreeCostWindow
 * @text スキルツリーコストウィンドウ設定
 * @desc スキルツリーコストウィンドウの設定を行います。
 * @default {"WindowX":"0","WindowY":"384","WindowWidth":"240","WindowHeight":"0"}
 * @type struct<WindowSetting>
 * @parent SkillTreeCostSetting
 * 
 * @param CostWindowTransparent
 * @desc スキルツリーコストウィンドウ画像を透明化。
 * @text スキルツリーコストウィンドウ透明化
 * @type boolean
 * @default false
 * @parent SkillTreeCostSetting
 * 
 * @param CostWindowCols
 * @text スキルツリーコストウィンドウ列数
 * @desc スキルツリーコストウィンドウの列数
 * @type number
 * @default 1
 * @min 1
 * @parent SkillTreeWindowSetting
 * 
 * @param SkillCostName
 * @text スキルコスト表示名
 * @desc スキルコストの表示名。
 * @type string
 * @default 習得コスト
 * @parent SkillTreeCostSetting
 * 
 * @param SkillCostIcon
 * @text スキルポイント消費アイコン
 * @desc スキルポイントを消費するテキストのアイコンを指定します。
 * @type icon
 * @default 0
 * @min 0
 * @parent SkillTreeCostSetting
 * 
 * @param SkillCosTColor
 * @text コストの色(code)
 * @desc スキルコストの色を指定します。
 * @type color
 * @default 17
 * @min 0
 * @parent SkillTreeCostSetting
 * 
 * @param GoldCostIcon
 * @text 金額消費アイコン
 * @desc 金額を消費するテキストのアイコンを指定します。
 * @type icon
 * @default 0
 * @min 0
 * @parent SkillTreeCostSetting
 * 
 * @param VarCostIcon
 * @text ゲーム変数消費アイコン
 * @desc ゲーム変数を消費するテキストのアイコンを指定します。
 * @type icon
 * @default 0
 * @min 0
 * @parent SkillTreeCostSetting
 * 
 * @param SkillCostType
 * @text スキルコスト表示タイプ
 * @desc スキルコストの表示タイプを設定します。
 * @type select
 * @option 消費コストのみ
 * @value type1
 * @option 消費コスト[スキルポイント]
 * @value type2
 * @option 消費コスト(スキルポイント)
 * @value type3
 * @option 消費コスト/スキルポイント
 * @value type4
 * @default type3
 * @parent SkillTreeCostSetting
 * 
 * @param VisibleSkillPointZero
 * @desc スキルポイントのコストが0でもコストウィンドウに表示させます。
 * @text スキルポイントコスト0表示
 * @type boolean
 * @default false
 * @parent SkillTreeCostSetting
 * 
 * @param SkillTreeStatusSetting
 * @text ステータスウィンドウ設定
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param SkillTreeStatusWindow
 * @text ステータスウィンドウ設定
 * @desc ステータスウィンドウの設定を行います。
 * @default {"WindowX":"0","WindowY":"96","WindowWidth":"240","WindowHeight":"134"}
 * @type struct<WindowSetting>
 * @parent SkillTreeStatusSetting
 * 
 * @param StatusWindowTransparent
 * @desc ステータスウィンドウ画像を透明化。
 * @text ステータスウィンドウ透明化
 * @type boolean
 * @default false
 * @parent SkillTreeStatusSetting
 * 
 * @param SkillTreeHelpSetting
 * @text ヘルプウィンドウ設定
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param SkillTreeHelpWindow
 * @text ヘルプウィンドウ設定
 * @desc ヘルプウィンドウの設定を行います。
 * @default {"WindowX":"0","WindowY":"0","WindowWidth":"0","WindowHeight":"0"}
 * @type struct<WindowSetting>
 * @parent SkillTreeHelpSetting
 * 
 * @param HelpWindowTransparent
 * @desc ヘルプウィンドウ画像を透明化。
 * @text ヘルプウィンドウ透明化
 * @type boolean
 * @default false
 * @parent SkillTreeHelpSetting
 * 
 * @param SkillTreeConfirmationSetting
 * @text 確認ウィンドウ設定
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param LearnConfirmation
 * @desc スキル習得時に確認ウィンドウを表示します。
 * @text スキル習得時確認ウィンドウ表示
 * @type boolean
 * @default true
 * @parent SkillTreeConfirmationSetting
 * 
 * @param SkillTreeConfirmationWindow
 * @text 確認ウィンドウ設定
 * @desc 確認ウィンドウの設定を行います。
 * @default {"WindowX":"204","WindowY":"120","WindowWidth":"408"}
 * @type struct<CommandWindowSetting>
 * @parent SkillTreeConfirmationSetting
 * 
 * @param ConfirmationWindowTitle
 * @text 確認ウィンドウの表示名
 * @desc 確認ウィンドウに表示される表示名を指定します。
 * @type string
 * @default "スキル習得の確認"
 * @parent SkillTreeConfirmationSetting
 * 
 * @param ConfirmatioOkText
 * @text 確認ウィンドウの実行の表示名
 * @desc 確認ウィンドウに表示される実行の表示名を指定します。
 * @type string
 * @default "実行する"
 * @parent SkillTreeConfirmationSetting
 * 
 * @param ConfirmationCancleText
 * @text 確認ウィンドウのキャンセルの表示名
 * @desc 確認ウィンドウに表示されるキャンセルの表示名を指定します。
 * @type string
 * @default "実行しない"
 * @parent SkillTreeConfirmationSetting
 * 
 * @param LearnSetting
 * @text スキル習得時設定
 * @default ------------------------------
 * 
 * @param LearnSESetting
 * @text スキル習得時SE
 * @desc スキル習得時のSEを設定します。
 * @type struct<LearnSE>
 * @default {"LearnSE":"","volume":"90","pitch":"100","pan":"0"}
 * @parent LearnSetting
 * 
 * @param LearnedColor
 * @text 習得済みの文字の色(code)
 * @desc 習得済みの文字の色を指定します。-1で元の文字色
 * @type color
 * @default 0
 * @min -1
 * @parent LearnSetting
 * 
 * @param LearnedIconSetting
 * @text 習得済みアイコン設定
 * @default ------------------------------
 * @parent LearnSetting
 * 
 * @param LearnedIcon
 * @text 習得済みのアイコン
 * @desc 習得済みのアイコンを指定します。
 * @type icon
 * @default 0
 * @min 0
 * @parent LearnedIconSetting
 * 
 * @param LearnedIconX
 * @text アイコンのX座標(相対)
 * @desc アイコンのX座標を指定します。(相対座標)
 * @type number
 * @default 0
 * @min -9999
 * @parent LearnedIconSetting
 * 
 * @param LearnedIconY
 * @text アイコンのY座標(相対)
 * @desc アイコンのY座標を指定します。(相対座標)
 * @type number
 * @default 0
 * @min -9999
 * @parent LearnedIconSetting
 * 
 * @param LearnedIconSize
 * @text アイコンサイズ
 * @desc アイコンのサイズを指定します。
 * @type number
 * @default 16
 * @min 0
 * @parent LearnedIconSetting
 * 
 * @param SkillPointSetting
 * @text スキルポイント設定
 * @default ------------------------------
 * 
 * @param SkillPointName
 * @text スキルポイント表示名
 * @desc スキルポイントの表示名。
 * @type string
 * @default SP
 * @parent SkillPointSetting
 * 
 * @param DefaultInitSkillPoint
 * @text デフォルト初期スキルポイント
 * @desc デフォルトの初期スキルポイント。
 * @type number
 * @default 0
 * @parent SkillPointSetting
 * 
 * @param MaxSkillPoint
 * @text スキルポイント最大値
 * @desc スキルポイントの最大値。
 * @type number
 * @default Infinity
 * @parent SkillPointSetting
 * 
 * @param DefaultSkillPointCost
 * @text デフォルトスキルポイントコスト
 * @desc デフォルトのスキルポイントコスト。
 * @type number
 * @default 0
 * @parent SkillPointSetting
 * 
 * @param LevelupGainSkillPoint
 * @text レベルアップ時取得スキルポイント
 * @desc レベルアップ時の取得スキルポイント。
 * @type number
 * @default 1
 * @parent SkillPointSetting
 * 
 * @param DisplayLevelUpMessage
 * @text レベルアップスキルポイント獲得メッセージ
 * @desc レベルアップに表示されるスキルポイントの入手メッセージ。%1:アクター名 %2:獲得SP量 %3:スキルポイント名
 * @type string
 * @default %1は%3 %2を獲得！
 * @parent SkillPointSetting
 * 
 * @param BenchMembarsGainSkillPoint
 * @desc 控えメンバーにも戦闘勝利時にスキルポイントを獲得させます。
 * @text 控えメンバースキルポイント獲得
 * @type boolean
 * @default false
 * @parent SkillPointSetting
 * 
 * @param SkillSetting
 * @text スキル項目設定
 * @default ------------------------------
 * 
 * @param SkillFrameType
 * @text スキル項目表示タイプ
 * @desc スキル項目の表示タイプを設定します。
 * @type select
 * @option デフォルト
 * @value default
 * @option 枠あり(コンテンツ背景あり)
 * @value frameBack
 * @option 枠あり(コンテンツ背景なし)
 * @value frame
 * @option 画像(スプライトシート)
 * @value spritesheet
 * @default default
 * @parent SkillSetting
 * 
 * @param ColsMargin
 * @text 項目ごと横間隔
 * @desc 項目ごとの横間隔。
 * @type number
 * @default 12
 * @parent SkillSetting
 * 
 * @param RowsMargin
 * @text 項目ごと縦間隔
 * @desc 項目ごとの縦間隔。
 * @type number
 * @default 24
 * @parent SkillSetting
 * 
 * 
 * @param LineSetting
 * @text ライン設定
 * @default ------------------------------
 * 
 * @param LineType
 * @text 線のタイプ
 * @desc 線のタイプを指定します。
 * @type select
 * @option 直線
 * @value straight
 * @option カギ線(下)
 * @value type1
 * @option カギ線(上)
 * @value type2
 * @option なし
 * @value none
 * @default type1
 * @parent LineSetting
 * 
 * @param LineThick
 * @text 線の太さ
 * @desc 線の太さを指定します。
 * @type number
 * @default 2
 * @min 0
 * @parent LineSetting
 * 
 * @param NormalLineColor
 * @text 習得条件未達成の線の色(code)
 * @desc 習得条件を満たしていない線の色を指定します。
 * @type color
 * @default 15
 * @min 0
 * @parent FrameSetting
 * 
 * @param LearnedLineColor
 * @text 習得済みの線の色(code)
 * @desc 習得済みの線の色を指定します。
 * @type color
 * @default 17
 * @min 0
 * @parent LineSetting
 * 
 * @param UnlearnedLineColor
 * @text 未習得の線の色(code)
 * @desc 習得条件を満たしている未習得の線の色を指定します。
 * @type color
 * @default 0
 * @min 0
 * @parent LineSetting
 * 
 * @param SkillCountSetting
 * @text スキルカウント設定
 * @default ------------------------------
 * 
 * @param ShowSkillCountFrame
 * @desc スキル複数回習得できるスキルに習得カウント枠を表示します。
 * @text 習得カウント枠
 * @type boolean
 * @default true
 * @parent SkillCountSetting
 * 
 * @param SkillCountFrameColor
 * @text 習得カウント枠の色(code)
 * @desc 習得カウント枠の色を指定します。
 * @type color
 * @default 17
 * @min 0
 * @parent SkillCountSetting
 * 
 * @param SkillCountFontColor
 * @text 習得カウント数の文字色(code)
 * @desc 習得カウント数の文字色を指定します。
 * @type color
 * @default 17
 * @min 0
 * @parent SkillCountSetting
 * 
 * @param SkillCountFrameX
 * @text 習得カウント枠のX座標(相対)
 * @desc 習得カウント枠のX座標(相対)を調整します。
 * @type number
 * @default 0
 * @parent SkillCountSetting
 * 
 * @param SkillCountFrameY
 * @text 習得カウント枠のY座標(相対)
 * @desc 習得カウント枠のY座標(相対)を調整します。
 * @type number
 * @default 0
 * @parent SkillCountSetting
 * 
 * @param FrameSetting
 * @text フレーム設定
 * @default ------------------------------
 * 
 * @param FrameThick
 * @text フレーム枠太さ
 * @desc フレーム枠の太さを指定します。
 * @type number
 * @default 3
 * @min 0
 * @parent FrameSetting
 * 
 * @param FrameWidth
 * @text フレーム幅
 * @desc フレーム枠の横幅を指定します。0でコンテンツ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent FrameSetting
 * 
 * @param FrameX
 * @text フレームのX座標(相対)
 * @desc フレームのX座標(相対)を調整します。
 * @type number
 * @default 0
 * @parent FrameSetting
 * 
 * @param NormalFrameColor
 * @text 習得条件未達成の枠の色(code)
 * @desc 習得条件を満たしていない枠線の色を指定します。
 * @type color
 * @default 15
 * @min 0
 * @parent FrameSetting
 * 
 * @param LearnedFrameColor
 * @text 習得済みの枠の色(code)
 * @desc 習得済みの枠の色を指定します。
 * @type color
 * @default 17
 * @min 0
 * @parent FrameSetting
 * 
 * @param UnlearnedFrameColor
 * @text 未習得の枠の色(code)
 * @desc 習得条件を満たしている未習得の枠の色を指定します。
 * @type color
 * @default 0
 * @min 0
 * @parent FrameSetting
 * 
 * @param ImagsSetting
 * @text 画像設定
 * @default ------------------------------
 * 
 * @param ContentsBackImage
 * @text コンテンツ背景画像
 * @desc コンテンツ背景のスプライトシート画像
 * @type file
 * @dir img/
 * @default
 * @parent ImagsSetting
 * 
 * @param FocusImageIndex
 * @text フォーカス時インデックス
 * @desc フォーカス時のスプライトシート画像のインデックスを指定します。
 * @type number
 * @default 0
 * @parent ImagsSetting
 * 
 * @param HideFocusCursor
 * @desc フォーカス時にカーソルを非表示にします。
 * @text フォーカス時カーソル非表示
 * @type boolean
 * @default true
 * @parent ImagsSetting
 * 
 * @param ContentsBackImageCols
 * @text スプライトシート横分割数
 * @desc スプライトシートの横分割数を指定します。
 * @type number
 * @default 4
 * @min 1
 * @parent ImagsSetting
 * 
 * @param ContentsBackImageRows
 * @text スプライトシート縦分割数
 * @desc スプライトシートの縦分割数を指定します。
 * @type number
 * @default 2
 * @min 1
 * @parent ImagsSetting
 * 
 * @param BackgroundSetting
 * @text 背景設定
 * @default ------------------------------
 * 
 * @param BackgroundImage
 * @text 背景画像
 * @desc 背景画像を指定します。
 * @type file
 * @dir img/
 * @default
 * @parent BackgroundSetting
 * 
 * @param BackUiWidth
 * @text 背景サイズモード
 * @desc 背景サイズをUIに合わせる。
 * @type boolean
 * @default true
 * @parent BackgroundSetting
 * 
 */
/*~struct~CommandWindowSetting:ja
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
 * @desc ウィンドウの横幅。
 * @text ウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
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
 * @desc ウィンドウの横幅。
 * @text ウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * 
 * @param WindowHeight
 * @text ウィンドウ縦幅
 * @desc ウィンドウの縦幅。0でメインエリア高さ (ヘルプウィンドウ設定はヘルプエリア高さ)
 * @type number
 * @default 0
 * @min 0
 * 
 */
/*~struct~SkillTreeList:ja
 * 
 * @param SymbolName
 * @text 識別名
 * @desc 任意の識別名を設定します。
 * @type string
 * @default 
 * 
 * @param SkillTreeName
 * @text スキルタイプ名
 * @desc スキルタイプ名を指定します。
 * @type string
 * @default 
 * 
 * @param SkillTreeList
 * @text スキル設定
 * @desc スキルツリーに表示させるスキルリストを設定します。
 * @default 
 * @type struct<SkillTreeDataTable>[]
 * 
 */
/*~struct~SkillTreeActorList:ja
 * 
 * @param ActorId
 * @text アクター
 * @desc アクターを指定します。
 * @type actor
 * @default 0
 * 
 * @param ClassId
 * @text 職業
 * @desc 職業を指定します。
 * @type class
 * @default 0
 * 
 * @param SkillTreeCategoryList
 * @text スキルツリーID設定
 * @desc 表示するスキルツリーリストを設定します。スキルツリー設定のリストIDまたは識別名で指定します。
 * @default []
 * @type string[]
 * 
 * 
 */
/*~struct~SkillTreeDataTable:ja
 * 
 * @param SkillId
 * @text スキルID
 * @desc スキルを指定します。
 * @type skill
 * @default 0
 * 
 * @param DerivedSkill
 * @text 派生スキル
 * @desc 派生スキルを設定します。
 * @type skill[]
 * @default []
 * 
 * @param DerivedSkillX
 * @text 表示X列
 * @desc 表示させる列を指定します。1以上で指定の列に表示されます。
 * @type number
 * @default 0
 * 
 * @param DerivedSkillY
 * @text 表示Y行
 * @desc 表示させる行を指定します。1以上で指定の行に表示されます。
 * @type number
 * @default 0
 * 
 * @param CostSetting
 * @text コスト設定
 * @default ------------------------------
 * 
 * @param Cost
 * @text 消費スキルポイント
 * @desc 消費するスキルポイントを設定します。(式でも記入できます)
 * @type string
 * @default 0
 * @parent CostSetting
 * 
 * @param CostItemSetting
 * @text アイテムコスト設定
 * @default ------------------------------
 * @parent CostSetting
 * 
 * @param CostItem
 * @text 消費アイテムコスト
 * @desc 消費するアイテムを設定します。
 * @type item
 * @default 0
 * @parent CostItemSetting
 * 
 * @param ConsumeItemCost
 * @text 消費アイテム個数
 * @desc 消費するアイテムの個数を設定します。(式でも記入できます)
 * @type string
 * @default 0
 * @parent CostItemSetting
 * 
 * @param CostWeaponSetting
 * @text 武器コスト設定
 * @default ------------------------------
 * @parent CostSetting
 * 
 * @param CostWeapon
 * @text 消費武器コスト
 * @desc 消費する武器を設定します。
 * @type weapon
 * @default 0
 * @parent CostWeaponSetting
 * 
 * @param ConsumeWeaponCost
 * @text 消費武器個数
 * @desc 消費する武器の個数を設定します。(式でも記入できます)
 * @type string
 * @default 0
 * @parent CostWeaponSetting
 * 
 * @param CostArmorSetting
 * @text 防具コスト設定
 * @default ------------------------------
 * @parent CostSetting
 * 
 * @param CostArmor
 * @text 消費防具コスト
 * @desc 消費する防具を設定します。
 * @type armor
 * @default 0
 * @parent CostArmorSetting
 * 
 * @param ConsumeArmorCost
 * @text 消費防具個数
 * @desc 消費する防具の個数を設定します。(式でも記入できます)
 * @type string
 * @default 0
 * @parent CostArmorSetting
 * 
 * @param CostGoldSetting
 * @text 金額コスト設定
 * @default ------------------------------
 * @parent CostSetting
 * 
 * @param CostGold
 * @text 消費金額
 * @desc コストとして消費する金額を設定します。(式でも記入できます)
 * @type string
 * @default 0
 * @parent CostGoldSetting
 * 
 * @param CostVariablesSetting
 * @text 変数コスト設定
 * @default ------------------------------
 * @parent CostSetting
 * 
 * @param CostVariables
 * @text 消費ゲーム変数コスト
 * @desc 消費するゲーム変数を設定します
 * @type variables
 * @default 0
 * @parent CostVariablesSetting
 * 
 * @param ConsumeVariablesCost
 * @text 消費ゲーム変数
 * @desc 消費するゲーム変数内の個数を設定します。(式でも記入できます)
 * @type string
 * @default 0
 * @parent CostVariablesSetting
 * 
 * @param DisplayVariablesCostText
 * @text 消費ゲーム変数テキスト
 * @desc 消費するゲーム変数に表示されるテキスト
 * @type string
 * @default 
 * @parent CostVariablesSetting
 * 
 * @param LearnSetting
 * @text 習得設定
 * @default ------------------------------
 * 
 * @param MaxCount
 * @text 習得回数
 * @desc 習得できる回数を指定します。0で1回
 * @type number
 * @default 0
 * @parent LearnSetting
 * 
 * @param LearnCond
 * @text 習得条件
 * @desc スキルを習得する条件をJavaScriptで記入します。
 * @type combo
 * @option 'v[0];//Variables'
 * @option 's[0];//Switches'
 * @option 'actor._level >= 10;//Actor level 10 or higher'
 * @default 
 * @parent LearnSetting
 * 
 * @param IndividualSetting
 * @text 個別設定
 * @default ------------------------------
 * 
 * @param LineType
 * @text 線のタイプ
 * @desc このスキルから派生先のスキルまでの線のタイプを指定します。
 * @type select
 * @option なし
 * @value none
 * @option 直線
 * @value straight
 * @option カギ線(下)
 * @value type1
 * @option カギ線(上)
 * @value type2
 * @default none
 * @parent IndividualSetting
 * 
 * @param DisplayConditionsSetting
 * @text 表示条件設定
 * @default ------------------------------
 * 
 * @param SkillTreeCond
 * @text 表示条件
 * @desc スキルツリーに表示する条件をJavaScriptで記入します。
 * @type combo
 * @option 'v[0];//Variables'
 * @option 's[0];//Switches'
 * @option 's[0];//Switches'
 * @default 
 * @parent DisplayConditionsSetting
 * 
 * @param SkillTreeSecret
 * @text シークレット条件
 * @desc スキルツリーにシークレット表示する条件をJavaScriptで記入します。
 * @type combo
 * @option 'v[0];//Variables'
 * @option 's[0];//Switches'
 * @default 
 * @parent DisplayConditionsSetting
 * 
 * @param FrameImageSetting
 * @text スプライトシート画像設定
 * @default ------------------------------
 * 
 * @param ImageIndex
 * @text インデックス
 * @desc スプライトシート画像のインデックスを指定します。
 * @type number
 * @default 0
 * @parent FrameImageSetting
 * 
 */
/*~struct~LearnSE:ja
 * 
 * @param LearnSE
 * @text スキル習得時SE
 * @desc スキル習得時のSE
 * @type file
 * @dir audio/se/
 * 
 * @param volume
 * @text 音量
 * @desc 音量。
 * @type number
 * @default 90
 * 
 * @param pitch
 * @text ピッチ
 * @desc ピッチ。
 * @type number
 * @default 100
 * 
 * @param pan
 * @text 位相
 * @desc 位相。
 * @type number
 * @default 0
 * @max 100
 * @min -100
 * 
 */

var Imported = Imported || {};
Imported.NUUN_SkillTree = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;
    _confirmation = false;

    PluginManager.registerCommand(pluginName, 'ShowSkillTreeWindow', args => {
        SceneManager.push(Scene_SkillTree);
    });

    PluginManager.registerCommand(pluginName, 'GainSkillPoint', args => {
        if (Number(args.ActorId) > 0) {
            const actor = $gameActors.actor(Number(args.ActorId));
            actor.gainSkillPoint(Number(args.GainSp))
        }
    });

    PluginManager.registerCommand(pluginName, 'SkillTreeReset', args => {
        if (Number(args.ActorId) > 0) {
            const actor = $gameActors.actor(Number(args.ActorId));
            if (!!args.SkillTreeType) {
                _SkillTreeReset(actor, Number(args.SkillTreeType));
            } else {
                _SkillTreeResets(actor);
            }
        }
    });

    PluginManager.registerCommand(pluginName, 'SkillTreeLearnSkill', args => {
        if (Number(args.ActorId) > 0) {
            const actor = $gameActors.actor(Number(args.ActorId));
            actor.skillTreeLearnSkill(Number(args.SkillId))
        }
    });

    PluginManager.registerCommand(pluginName, 'AddSkillTreeType', args => {
        if (Number(args.ActorId) > 0) {
            const actor = $gameActors.actor(Number(args.ActorId));
            actor.addSkillTree(Number(args.SkillTreeId));
        }
    });

    PluginManager.registerCommand(pluginName, 'RemoveSkillTreeType', args => {
        if (Number(args.ActorId) > 0) {
            const actor = $gameActors.actor(Number(args.ActorId));
            actor.removeSkillTree(Number(args.SkillTreeId), eval(args.SkillTreeReset));
        }
    });


    function _getSkillTreeSettingIndex(id) {
        if (isNaN(id)) {
            return params.SkillTreeSetting.findIndex(data => data.SymbolName === id);
        } else {
            return Number(id) - 1;
        }
    };

    function _getWindowData(method) {
        return params[method];
    };

    function _getSkillCostTag(method, tag) {
        return NuunManager.getMetaCode(method, tag);
    };

    function _getSkillCostTagList(method, tag) {
        return NuunManager.getMetaCodeList(method, tag);
    };

    function _getSkillImgTag(method) {
        return NuunManager.getMetaCode(method, "SKillTreeImageImdex");
    };

    function _isSpriteSheet() {
        return params.SkillFrameType === 'spritesheet' && params.ContentsBackImage;
    };

    function _isConfirmation() {
        return _confirmation;
    };

    function _setConfirmation(flag) {
        _confirmation = flag;
    };

    function _SkillTreeReset(actor, type) {
        const id = _getSkillTreeSettingIndex(type)
        actor.skillTreeReset(id);
    };

    function _SkillTreeResets(actor) {
        const list = actor.getAllSkillTreeList();
        for (const id of list) {
            actor.skillTreeReset(id);
        }
    };

    function _matchSkillTreeActor(actor) {
        const list = [];
        for (const data of params.SkillTreeActorSetting) {
            const typeList = [];
            if (!!data.SkillTreeCategoryList) {
                if (data.ActorId === actor.actorId() && actor._classId === data.ClassId) {
                    typeList.push(...data.SkillTreeCategoryList);
                } else if (data.ClassId === 0 && data.ActorId === actor.actorId()) {
                    typeList.push(...data.SkillTreeCategoryList);
                } else if (data.ActorId === 0 && actor._classId === data.ClassId) {
                    typeList.push(...data.SkillTreeCategoryList);
                }
                for (const type of typeList) {
                    list.push([type, data.ClassId])
                }
            }
        }
        return list;
    };

    function _getSkillTreeData(data, type, actor) {
        return new SkillTreeData(data, type, actor);
    };

    NuunManager.getSkillPointParamName = function() {
        return params.SkillPointName;
    }


    class SkillTreeData {
        constructor(data, type, actor) {
            this._id = data.SkillId;
            this._type = type;
            this._actor = actor;
            this._derivedSkill = data.DerivedSkill || [];
            this._x = data.DerivedSkillX || 0;
            this._y = data.DerivedSkillY || 0;
            this._cond = data.SkillTreeCond || "";
            this._secret = data.SkillTreeSecret || "";
            this._learnCond = data.LearnCond || "";
            this._enabled = true;
            this.setupCost(data);
            this.updateCost();
            this._spriteIndex = _isSpriteSheet() ? this.getSkillFrame(data) : 0;
            this._derivedLineType = data.LineType === "none" ? params.LineType : (data.LineType || params.LineType);
            this._maxCount = data.MaxCount || 0;
        }

        setSKillPointCost(data) {
            const tagCost = _getSkillCostTag($dataSkills[this._id], "SKillPointCost");
            this._costFormula = tagCost !== null ? tagCost : (!!data.Cost ? data.Cost : params.DefaultSkillPointCost);
        }

        setSKillTreeGoldCost(data) {
            const tagCost = _getSkillCostTag($dataSkills[this._id], "SkillTreeGoldCost");
            this._costGoldFormula = tagCost !== null ? tagCost : data.CostGold || 0;
        }

        setupCost(data) {
            this.setSKillPointCost(data);
            this.setItemCost(data, "SkillTreeItemCost", "Item");
            this.setItemCost(data, "SkillTreeItemWeapon", "Weapon");
            this.setItemCost(data, "SkillTreeArmorCost", "Armor");
            this.setItemCost(data, "SkillTreeVariablesCost", "Variables");
            this.setSKillTreeGoldCost(data);
            this._DisplayVariablesCostText = data.DisplayVariablesCostText || "";
            //this.setCostList();//updateCost()を実行する場合は削除
        }

        updateCost() {
            this._cost = this.getCode(this._costFormula);
            this._costGold = this.getCode(this._costGoldFormula);
            this._costVariables = this.getCode(this._costVariablesFormula);
            this._consumeItem = this.getCode(this._consumeItemFormula);
            this._consumeWeapon = this.getCode(this._consumeWeaponFormula);
            this._consumeArmor = this.getCode(this._consumeArmorFormula);
            this._consumeVariables = this.getCode(this._consumeVariablesFormula);
            this.setCostList();
        }

        refresh() {
            this.updateCost();
        }

        setCostList() {
            const list = [];
            if (params.VisibleSkillPointZero || this._cost > 0) {
                list.push("sp");
            }
            if (this._costItem > 0 && this._consumeItem > 0) {
                list.push("item");
            }
            if (this._costWeapon > 0 && this._consumeWeapon > 0) {
                list.push("weapon");
            }
            if (this._costArmor > 0 && this._consumeArmor > 0) {
                list.push("armor");
            }
            if (this._costGold > 0) {
                list.push("gold");
            }
            if (this._costVariables > 0 && this._consumeVariables > 0) {
                list.push("var");
            }
            this._displayCostList = list;
        }

        getCostNum(type) {
            switch (type) {
            case "sp":
                return this.getCost();
            case 'item':
                return this.getItemNum();
            case 'weapon':
                return this.getWeaponNum();
            case 'armor':
                return this.getArmorNum();
            case 'gold':
                return this.getCostGold();
            case 'var':
                return this.getVariableNum();
            }
        }

        setItemCost(data, tag, type) {
            const tag1 = String("_cost" + type);
            const tag2 = String("_consume" + type + "Formula");
            const tag3 = String("Cost" + type);
            const tag4 = String("Consume" + type +"Cost");
            const tagCost = _getSkillCostTagList($dataSkills[this._id], tag);
            this[tag1] = tagCost !== null ? Number(tagCost[0]) : data[tag3] || 0;
            this[tag2] = tagCost !== null ? Number(tagCost[1]) : Number(data[tag4]) || 0;
        }

        getCode(text) {
            if (isNaN(text)) {
                if (text === null || text === "") {
                    return 0;
                }
                const actor = this._actor;
                const skillId = this._id;
                const count = actor.getSkillTreeCount(this._id);
                const d = this;
                const v = $gameVariables._data;
                const s = $gameSwitches._data;
                return eval(text);
            } else {
                return Number(text) || 0;
            }
        }

        getCostList() {
            return this._displayCostList;
        }

        getCostWeapon() {
            return this._costWeapon;
        }

        getCostArmor() {
            return this._costArmor;
        }

        getCostItem() {
            return this._costItem;
        }

        getCostGold() {
            return this._costGold;
        }

        getCostVariables() {
            return this._costVariables;
        }

        getItemNum() {
            return this._consumeItem;
        }

        getWeaponNum() {
            return this._consumeWeapon;
        }

        getArmorNum() {
            return this._consumeArmor;
        }

        getVariablesNum() {
            return this._consumeVariables;
        }

        getVariablesText() {
            return this._DisplayVariablesCostText;
        }

        enabled() {
            this._enabled = false;
        }

        isEnabled() {
            return this._enabled;
        }

        isDerivedSkill() {
            return this._derivedSkill.length > 0;
        }

        isCanCost(sp) {
            return this._cost <= sp;
        }

        getCanGold(gold) {
            return this._costGold <= gold;
        }

        getCost() {
            return this._cost;
        }

        getCond() {
            return this._cond;
        }

        getSecret() {
            return this._secret;
        }

        getLearn() {
            return this._learnCond;
        }

        getMaxCount() {
            return this._maxCount;
        }

        getSkillFrame(data) {
            const index = _getSkillImgTag($dataSkills[this._id]);
            return index !== null ? index : (data.ImageIndex || 0);
        }

        getFrameIndex() {
            return this._spriteIndex;
        }

        getDerivedLineType() {
            return this._derivedLineType;
        }

    }

    const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _Scene_Menu_createCommandWindow.apply(this, arguments);
        if (this.isShowCommandSkillTree()) {
            this._commandWindow.setHandler("skillTree", this.commandPersonal.bind(this));
        }
    };

    Scene_Menu.prototype.isShowCommandSkillTree = function() {
        return params.ShowSkillTreeCommand && 
        params.ShowCommandSkillTreeSwitch === 0 ||
        $gameSwitches.value(params.ShowCommandSkillTreeSwitch);
    };

    Scene_Menu.prototype.commandSkillTree = function() {
        SceneManager.push(Scene_SkillTree);
    };

    const _Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
    Scene_Menu.prototype.onPersonalOk = function() {
        switch (this._commandWindow.currentSymbol()) {
            case "skillTree":
                this.commandSkillTree();
                break;
            default:
                _Scene_Menu_onPersonalOk.apply(this, arguments);
                break;
        }
    };



    const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        _Window_MenuCommand_addOriginalCommands.apply(this, arguments);
        if (params.ShowSkillTreeCommand) {
            this.addCommand(params.SkillTreeCommandName, "skillTree",true);
        }
    };


    function Scene_SkillTree() {
        this.initialize(...arguments);
    }
  
    Scene_SkillTree.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_SkillTree.prototype.constructor = Scene_SkillTree;
    
    Scene_SkillTree.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    window.Scene_SkillTree = Scene_SkillTree;

    Scene_SkillTree.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createSkillTreeTypeWindow();
        this.createSkillTreeWindow();
        this.createSkillTreeCostWindow();
        this.createSkillTreeStatusWindow();
        this.createSkillTreeHelpWindow();
        this.createSkillTreeConfirmationWindow();
    };

    Scene_SkillTree.prototype.createSkillTreeTypeWindow = function() {
        const rect = this.skillTreeTypeWindowRect();
        this._skillTreeType = new Window_SkillTreeType(rect);
        this._skillTreeType.setHandler("ok", this.onSkillTreeTypeOk.bind(this));
        this._skillTreeType.setHandler("cancel", this.popScene.bind(this));
        this._skillTreeType.setHandler("pagedown", this.nextActor.bind(this));
        this._skillTreeType.setHandler("pageup", this.previousActor.bind(this));
        this.addWindow(this._skillTreeType);
        if (params.SkillTypeWindowTransparent) {
            this._skillTreeType.opacity = 0;
        }
    };

    Scene_SkillTree.prototype.createSkillTreeWindow = function() {
        const rect = this.skillTreeWindowRect();
        this._skillTreeWindow = new Window_SkillTree(rect);
        this._skillTreeWindow.setHandler("ok", this.onSkillTreeOk.bind(this));
        this._skillTreeWindow.setHandler("cancel", this.cancelSkillTree.bind(this));
        this.addWindow(this._skillTreeWindow);
        this._skillTreeType.setSkillTreeWindow(this._skillTreeWindow);
        if (params.SkillTreeWindowTransparent) {
            this._skillTreeType.opacity = 0;
        }
    };

    Scene_SkillTree.prototype.createSkillTreeCostWindow = function() {
        const rect = this.skillTreeCostWindowRect();
        this._skillTreeCostWindow = new Window_SkillTreeCost(rect);
        this.addWindow(this._skillTreeCostWindow);
        this._skillTreeWindow.setSkillTreeCostWindow(this._skillTreeCostWindow);
        if (params.CostWindowTransparent) {
            this._skillTreeCostWindow.opacity = 0;
        }
    };

    Scene_SkillTree.prototype.createSkillTreeStatusWindow = function() {
        const rect = this.skillTreeStatusWindowRect();
        this._skillTreeStatusWindow = new Window_SkillTreeStatus(rect);
        this.addWindow(this._skillTreeStatusWindow);
        this._skillTreeWindow.setSkillTreeStatusWindow(this._skillTreeStatusWindow);
        if (params.StatusWindowTransparent) {
            this._skillTreeStatusWindow.opacity = 0;
        }
    };

    Scene_SkillTree.prototype.createSkillTreeHelpWindow = function() {
        const rect = this.skillTreeHelpWindowRect();
        this._helpWindow = new Window_Help(rect);
        this.addWindow(this._helpWindow);
        this._skillTreeWindow.setHelpWindow(this._helpWindow);
        if (params.HelpWindowTransparent) {
            this._helpWindow.opacity = 0;
        }
    };

    Scene_SkillTree.prototype.createSkillTreeConfirmationWindow = function() {
        _setConfirmation(params.LearnConfirmation)
        if (params.LearnConfirmation) {
            const rect = this.skillTreeConfirmationWindowRect();
            this._confirmationWindow = new Window_SkillTreeConfirmation(rect);
            this._confirmationWindow.setHandler("ok", this.onConfirmationOk.bind(this));
            this._confirmationWindow.setHandler("cancel", this.cancelConfirmation.bind(this));
            this.addWindow(this._confirmationWindow);
            this._confirmationWindow.hide();
            this._skillTreeWindow.setSkillTreeConfirmationWindow(this._confirmationWindow);
        }
    };

    Scene_SkillTree.prototype.createBackground = function() {
        Scene_MenuBase.prototype.createBackground.call(this);
        if (params.BackgroundImage) {
            const bitmap = ImageManager.nuun_LoadPictures(params.BackgroundImage);
            const sprite = new Sprite(bitmap);
            this.addChild(sprite);
            bitmap.addLoadListener(function() {
                this.setBackGround(sprite);
            }.bind(this));
        }
    };

    Scene_SkillTree.prototype.setBackGround = function(sprite) {
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

    Scene_SkillTree.prototype.skillTreeTypeWindowRect = function() {
        const w = _getWindowData("SkillTypeWindow");
        const wy = w.WindowY + this.mainAreaTop();
        const wh = this.calcWindowHeight(params.SkillTypeRows, true);
        const wx = w.WindowX;
        const ww = Math.min(Graphics.boxWidth - wx, w.WindowWidth > 0 ? w.WindowWidth : Graphics.boxWidth);
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_SkillTree.prototype.skillTreeWindowRect = function() {
        const w = _getWindowData("SkillTreeWindow");
        const wy = w.WindowY + this.mainAreaTop();
        const wx = w.WindowX;
        const ww = Math.min(Graphics.boxWidth - wx, w.WindowWidth > 0 ? w.WindowWidth : Graphics.boxWidth);
        const wh = Math.min(Graphics.boxHeight - wy, (w.WindowHeight > 0 ? w.WindowHeight : Graphics.boxHeight));
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_SkillTree.prototype.skillTreeCostWindowRect = function() {
        const w = _getWindowData("SkillTreeCostWindow");
        const wy = w.WindowY + this.mainAreaTop();
        const wx = w.WindowX;
        const ww = Math.min(Graphics.boxWidth - wx, w.WindowWidth > 0 ? w.WindowWidth : Graphics.boxWidth);
        const wh = Math.min(Graphics.boxHeight - wy, (w.WindowHeight > 0 ? w.WindowHeight : Graphics.boxHeight));
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_SkillTree.prototype.skillTreeStatusWindowRect = function() {
        const w = _getWindowData("SkillTreeStatusWindow");
        const wy = w.WindowY + this.mainAreaTop();
        const wx = w.WindowX;
        const ww = Math.min(Graphics.boxWidth - wx, w.WindowWidth > 0 ? w.WindowWidth : Graphics.boxWidth);
        const wh = Math.min(Graphics.boxHeight - wy, (w.WindowHeight > 0 ? w.WindowHeight : Graphics.boxHeight));
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_SkillTree.prototype.skillTreeHelpWindowRect = function() {
        const w = _getWindowData("SkillTreeHelpWindow");
        const wy = w.WindowY + this.mainAreaTop();
        const wh = Math.min(Graphics.boxHeight - wy, (w.WindowHeight > 0 ? w.WindowHeight : this.helpAreaHeight()));
        const wx = w.WindowX;
        const ww = Math.min(Graphics.boxWidth - wx, w.WindowWidth > 0 ? w.WindowWidth : Graphics.boxWidth);
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_SkillTree.prototype.skillTreeConfirmationWindowRect = function() {
        const w = _getWindowData("SkillTreeConfirmationWindow");
        const wy = w.WindowY + this.mainAreaTop();
        const wh = this.calcWindowHeight(3, true);
        const wx = w.WindowX;
        const ww = Math.min(Graphics.boxWidth - wx, w.WindowWidth > 0 ? w.WindowWidth : Graphics.boxWidth);
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_SkillTree.prototype.setupActor = function(actor) {
        this._actor = actor;
    };

    Scene_SkillTree.prototype.start = function() {
        Scene_MenuBase.prototype.start.call(this);
        this.refreshActor();
    };

    Scene_SkillTree.prototype.refreshActor = function() {
        const actor = this.actor();
        this._skillTreeType.setActor(actor);
        this._skillTreeWindow.setActor(actor);
        this._skillTreeCostWindow.setActor(actor);
        this._skillTreeStatusWindow.setActor(actor);
    };

    Scene_SkillTree.prototype.onSkillTreeTypeOk = function() {
        this._skillTreeWindow.activate();
        this._skillTreeWindow.select(0);
    };

    Scene_SkillTree.prototype.skillTreeLearnConfirmation = function() {
        this._skillTreeWindow.activate();
        this._skillTreeWindow.learnSkillTree();
    };

    Scene_SkillTree.prototype.onSkillTreeOk = function() {
        if (this._skillTreeWindow.isLearnEnabled()) {
            if (_isConfirmation()) {
                SoundManager.playOk();
                this.openConfirmationWindow();
            } else {
                this.skillTreeLearnConfirmation();
            }
        } else {
            this._skillTreeWindow.activate();
        }
    };

    Scene_SkillTree.prototype.cancelSkillTree = function() {
        this._skillTreeType.activate();
        this._skillTreeWindow.deselect();
    };

    Scene_SkillTree.prototype.onActorChange = function() {
        Scene_MenuBase.prototype.onActorChange.call(this);
        this.refreshActor();
        this._skillTreeWindow.deselect();
        this._skillTreeWindow.deactivate();
        this._skillTreeType.activate();
    };

    Scene_SkillTree.prototype.openConfirmationWindow = function() {
        this._confirmationWindow.show();
        this._confirmationWindow.open();
        this._confirmationWindow.activate();
        this._confirmationWindow.select(0);
    };

    Scene_SkillTree.prototype.onConfirmationOk = function() {
        this._confirmationWindow.close();
        _setConfirmation(false);
        this._skillTreeWindow.playOkSound();
        this.skillTreeLearnConfirmation();
    };

    Scene_SkillTree.prototype.cancelConfirmation = function() {
        this._confirmationWindow.close();
        this._skillTreeWindow.activate();
    };

    Scene_SkillTree.prototype.needsPageButtons = function() {
        return true;
    };


    function Window_SkillTreeType() {
        this.initialize(...arguments);
    }
    
    Window_SkillTreeType.prototype = Object.create(Window_Command.prototype);
    Window_SkillTreeType.prototype.constructor = Window_SkillTreeType;

    window.Window_SkillTreeType = Window_SkillTreeType;
    
    Window_SkillTreeType.prototype.initialize = function(rect) {
        Window_Command.prototype.initialize.call(this, rect);
        this._actor = null;
    };

    Window_SkillTreeType.prototype.setActor = function(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
        }
    };

    Window_SkillTreeType.prototype.maxCols = function() {
        return params.SkillTypeCols;
    };

    Window_SkillTreeType.prototype.itemTextAlign = function() {
        return "left";
    };

    Window_SkillTreeType.prototype.setSkillTreeWindow = function(skillTreeWindow) {
        this._skillTreeWindow = skillTreeWindow;
    };

    Window_SkillTreeType.prototype.setSkillTreeWindow = function(skillTreeWindow) {
        this._skillTreeWindow = skillTreeWindow;
    };

    Window_SkillTreeType.prototype.makeCommandList = function() {
        if (this._actor) {
            const list = this._actor.getSkillTreeList();
            for (const id of list) {
                if (params.SkillTreeSetting[id]) {
                    const skilltree = params.SkillTreeSetting[id];
                    this.addCommand(skilltree.SkillTreeName, skilltree.SymbolName, true, id);
                }
            }
        }
    };

    Window_SkillTreeType.prototype.update = function() {
        Window_Command.prototype.update.call(this);
        if (this._skillTreeWindow) {
            this._skillTreeWindow.setSkillTreeId(this.currentExt());
        }
    };


    function Window_SkillTree() {
        this.initialize(...arguments);
    }
    
    Window_SkillTree.prototype = Object.create(Window_Selectable.prototype);
    Window_SkillTree.prototype.constructor = Window_SkillTree;

    window.Window_SkillTree = Window_SkillTree;
    
    Window_SkillTree.prototype.initialize = function(rect) {
        this._learnedSkillColor = null;
        this._skillTreeImages = this.loadSkillTreeImages();
        $testData = [];
        this._learnOk = true;
        Window_Selectable.prototype.initialize.call(this, rect);
    };

    Window_SkillTree.prototype.loadSkillTreeImages = function() {
        if (_isSpriteSheet()) {
            return ImageManager.nuun_LoadPictures(params.ContentsBackImage);
        }
        return null;
    };

    Window_SkillTree.prototype.maxCols = function() {
        return params.SkillTreeCols;
    };

    Window_SkillTree.prototype.setActor = function(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this._data = [];
            this.refresh();
            this.scrollTo(0, 0);
        }
    };

    Window_SkillTree.prototype.setSkillTreeId = function(id) {
        if (this._skillTreeId !== id) {
            this._skillTreeId = id;
            this._data = [];
            this.refresh();
            this.scrollTo(0, 0);
        }
    };

    Window_SkillTree.prototype.callUpdateHelp = function() {
        Window_Selectable.prototype.callUpdateHelp.apply(this, arguments);
        if (this.active && this._skillTreeCostWindow) {
            this.updateCostWindow();
        }
    };

    Window_SkillTree.prototype.updateHelp = function() {
        this.setHelpWindowItem(this.helpItem());
    };

    Window_SkillTree.prototype.updateCostWindow = function() {
        this._skillTreeCostWindow.setData(this.itemAt(this.index()));
    };

    Window_SkillTree.prototype.item = function() {
        const item = this.itemAt(this.index());
        return item && item._id > 0 ? $dataSkills[item._id] : null;
    };

    Window_SkillTree.prototype.helpItem = function() {
        const data = this.itemAt(this.index());
        return data && data._id && data.isEnabled() > 0 ? $dataSkills[data._id] : null;
    };

    Window_SkillTree.prototype.colSpacing = function() {
        return 16 + this.colsMargin();
    };

    Window_SkillTree.prototype.colsMargin = function() {
        return params.ColsMargin;
    };

    Window_SkillTree.prototype.rowsMargin = function() {
        return params.RowsMargin;
    };

    Window_SkillTree.prototype.itemHeight = function() {
        return Window_Selectable.prototype.itemHeight.call(this) + this.rowsMargin();
    };

    Window_SkillTree.prototype.overallHeight = function() {
        return Window_Selectable.prototype.overallHeight.apply(this, arguments) - this.rowsMargin();
    };

    Window_SkillTree.prototype.itemRect = function(index) {
        const rect = Window_Selectable.prototype.itemRect.apply(this, arguments);
        rect.height -= this.rowsMargin();
        return rect;
    };

    Window_SkillTree.prototype.refresh = function() {
        this.makeItemList();
        Window_Selectable.prototype.refresh.call(this);
    };

    Window_SkillTree.prototype.drawItemBackground = function(index) {
        const data = this.itemAt(index);
        if (!!data && this.isSkillTreeContentsBack()) {
            Window_Selectable.prototype.drawItemBackground.call(this, index);
        } else if (!!data && this.isSkillTreeContentsImg()) {
            this.drawSkillTreeBackgroundImg(index);
        }
    };

    Window_SkillTree.prototype.drawSkillTreeBackgroundImg = function(index) {
        if (_isSpriteSheet()) {
            const data = this.itemAt(index);
            const id = this.getFrameIndex(data, index);
            const rect = this.itemRect(index);
            this.drawSkillTreeImage(id, rect);
        }
    };

    Window_SkillTree.prototype.drawSkillTreeImage = function(index, rect) {
        const bitmap = this._skillTreeImages;
        const pw = rect.width;
        const ph = rect.height;
        const w = Math.floor(bitmap.width / params.ContentsBackImageCols);
        const h = Math.floor(bitmap.height / params.ContentsBackImageRows);
        const sx = (index % params.ContentsBackImageCols) * w;
        const sy = Math.floor(index / params.ContentsBackImageCols) * h;
        this.contentsBack.blt(bitmap, sx, sy, w, h, rect.x, rect.y, pw, ph);
    };

    Window_SkillTree.prototype.select = function(index) {
        Window_Selectable.prototype.select.apply(this, arguments);
        this.updateSkillTreeCursor();
    };

    Window_SkillTree.prototype.updateSkillTreeCursor = function() {
        if (this.isSkillTreeContentsImage()) {
            if (!this._data) {
                this.makeItemList();
            }
            this.paint();
        }
    };

    Window_SkillTree.prototype.refreshCursor = function() {
        Window_Selectable.prototype.refreshCursor.apply(this, arguments);
        if (this.isSkillTreeContentsImage() && params.HideFocusCursor && !!this.itemAt(this.index())) {
            this.setCursorRect(0, 0, 0, 0);
        }
    };

    Window_SkillTree.prototype.getFrameIndex = function(data, index) {
        return index === this.index() ? params.FocusImageIndex : data.getFrameIndex();
    };

    Window_SkillTree.prototype.isSkillTreeContentsBack = function() {
        return params.SkillFrameType === 'default' || params.SkillFrameType === 'frameBack';
    };

    Window_SkillTree.prototype.isSkillTreeContentsImg = function() {
        return params.SkillFrameType === 'spritesheet' || params.SkillFrameType === 'image';
    };

    Window_SkillTree.prototype.isSkillTreeFrame = function() {
        return params.SkillFrameType === 'frameBack' || params.SkillFrameType === 'frame';
    };

    Window_SkillTree.prototype.makeItemList = function() {
        if (this._actor && this._skillTreeId >= 0) {
            this._data = this.makeSkillTreeList();
        } else {
            this._data = [];
        }
    };

    Window_SkillTree.prototype.checkDeduplication = function(list, id) {
        return list.some(s => s && s._id === id);
    };

    Window_SkillTree.prototype.checkDeduplicationIndex = function(list, id) {
        return list.findIndex(s => s && s._id === id);
    };

    Window_SkillTree.prototype.getSkillTreeType = function() {
        return params.SkillTreeSetting[this._skillTreeId].SymbolName;
    };

    Window_SkillTree.prototype.getSkillTreeList = function() {
        const treeData = params.SkillTreeSetting[this._skillTreeId];
        if (!treeData) return null;
        const list = treeData.SkillTreeList;
        if (!list) return null;
        return list;
    };

    Window_SkillTree.prototype.makeSkillTreeList = function() {
        const tree = [];
        const list = this.getSkillTreeList();
        if (!list) return [];
        const initList = this.initialSkillTreeList();
        let nextList = [];
        nextList[0] = [];
        let treeList = this.startSkillTreeList(initList, nextList);
        const maxCols = this.maxCols();
        let rowsCount = 0;
        let colsCount = 0;
        while (true) {
            if (treeList.length === 0 && nextList.length <= 1 && nextList[0].length === 0) {
                break;
            }
            colsCount = 0;
            for (let i = 0; i < maxCols; i++) {
                const t = treeList[i];
                if (!t || t ===  'null') {
                    tree[i + rowsCount * maxCols] = null;
                } else {
                    const y = rowsCount;
                    if (this.checkDeduplication(tree, t._id)) {
                        const deduplicationId = tree.map(a => a && a._id).indexOf(t._id);
                        tree.splice(deduplicationId, 1, null);
                    }
                    tree[i + y * maxCols] = t;
                    if (!!t.isDerivedSkill()) {
                        for (const skillId of t._derivedSkill) {
                            const dt = this.getDerivedTreeData(list, skillId);
                            let x = 0;
                            while(true) {
                                x = dt._x > 0 ? Math.max(colsCount + 1, dt._x - 1) : colsCount;
                                if (nextList[0][x]) {
                                    colsCount++;
                                } else {
                                    break;
                                }
                            }
                            if (dt._y > rowsCount + 1) {
                                const ycols = (dt._y - 1) - (rowsCount + 1);
                                if (!nextList[ycols]) {
                                    nextList[ycols] = [];
                                }
                                const index = this.checkDeduplicationIndex(nextList[ycols], skillId);
                                if (index < 0) {
                                    nextList[ycols][x] = this.isSkillTreeCond(dt) ? dt : "null";
                                }
                                colsCount = Math.max(x + 1, colsCount + 1);
                            } else {
                                const index = this.checkDeduplicationIndex(nextList[0], skillId);
                                if (index < 0) {
                                    nextList[0][x] = this.isSkillTreeCond(dt) ? dt : "null";
                                    colsCount = Math.max(x + 1, colsCount + 1);
                                }
                            }
                        }
                    }
                }
            }
            treeList = nextList.shift();
            nextList[0] = !nextList[0] ? [] : nextList[0];
            rowsCount++;
        }
        return tree;  
    };

    Window_SkillTree.prototype.startSkillTreeList = function(list, nextList) {
        const tree = [];
        const count = [];
        for (const data of list) {
            let y = data._y > 1 ? data._y - 1 : 0;
            let x = data._x > 0 ? data._x - 1 : (count[y] || 0);
            if (y >= 1) {
                const rows = y - 1;
                if (!nextList[rows]) {
                    nextList[rows] = [];
                }
                nextList[rows][x] = this.isSkillTreeCond(data) ? data : 'null';
            } else {
                tree[x] = this.isSkillTreeCond(data) ? data : 'null';
            }
            if (data._x > 0) {
                count[y] = Math.max(data._x, (count[y] || 0));
            } else {
                count[y]++;
            }
        }
        return tree;
    };

    Window_SkillTree.prototype.initialSkillTreeList = function() {
        const list = params.SkillTreeSetting[this._skillTreeId].SkillTreeList;
        const tree = [];
        if (!list) return [];
        for (let i = 0; i < list.length; i++) {
            const data = list[i];
            const id = data.SkillId;
            if (this.isInitSkill(list, id)) {
                tree.push(this.getInitTreeData(data));
            }
        }
        return tree;
    };

    Window_SkillTree.prototype.isInitSkill = function(list, id) {
        return list.every((data) => {
            return !data.DerivedSkill || !data.DerivedSkill.includes(id);
        });
    };

    Window_SkillTree.prototype.getInitTreeData = function(data) {
        const t = this.isFindSkillTreeData(data.SkillId);
        if (!!t) {
            t.refresh();
            return t;
        }
        return this.getSkillTreeData(data);
    };

    Window_SkillTree.prototype.getDerivedTreeData = function(list, skillId) {
        const t = this.isFindSkillTreeData(skillId);
        if (!!t) {
            t.refresh();
            return t;
        }
        const find = list.find(t => t && t.SkillId === skillId);
        return find ? this.getSkillTreeData(find) : this.getSkillTreeData(this.getNotTreeData(skillId));
    };

    Window_SkillTree.prototype.isFindSkillTreeData = function(id) {
        return this._data.find(data => data && data._id === id);
    };

    Window_SkillTree.prototype.getSkillTreeDataIndex = function(id) {
        return this._data.findIndex(data => data && data._id === id);
    };

    Window_SkillTree.prototype.getNotTreeData = function(id) {
        return {
            SkillId: id,
            DerivedSkillX: 0,
            DerivedSkillY: 0,
            Cond: "",
            Cost: (_getSkillCostTag($dataSkills[id]) || params.DefaultSkillPointCost)
        }
    };

    Window_SkillTree.prototype.isSkillTreeCond = function(data) {
        return this._actor.isSkillTreeCond(data);
    };

    Window_SkillTree.prototype.isSkillTreeSecretCond = function(data) {
        return this._actor.isSkillTreeSecretCond(data);
    };

    Window_SkillTree.prototype.isSkillTreeLearnCond = function(data) {
        return this._actor.isSkillTreeLearnCond(data);
    };

    Window_SkillTree.prototype.getSkillTreeData = function(data) {
        return _getSkillTreeData(data, this.getSkillTreeType(), this._actor);
    };

    Window_SkillTree.prototype.itemAt = function(index) {
        return this._data && index >= 0 ? this._data[index] : null;
    };

    Window_SkillTree.prototype.maxItems = function() {
        return this._data ? this._data.length : 1;
    };

    Window_SkillTree.prototype.drawAllItems = function() {
        this.drawBaseAreaContens();
        Window_Selectable.prototype.drawAllItems.call(this);
    };

    Window_SkillTree.prototype.drawBaseAreaContens = function() {
        this.drawDerivedSkillTreeLineBase();
    };

    Window_SkillTree.prototype.drawDerivedSkillTreeLineBase = function() {
        const list = this._data;
        const length = list.length;
        for (let i = 0; i < length; i++) {
            const data = list[i];
            if (!!data) {
                const rect = this.itemLineRect(i);
                this.drawDerivedSkillTreeLine(data, rect);
            }
        }
    };

    Window_SkillTree.prototype.drawItem = function(index) {
        const data = this.itemAt(index);
        if (data) {
            const rect = this.itemLineRect(index);
            const skill = $dataSkills[data._id];
            const enabled = this.isEnabled(data);
            const learned = this._actor.isSkillTreeLearned(data._id);
            this.changePaintOpacity(enabled);
            this._learnedSkillColor = learned && params.LearnedColor >= 0 ? NuunManager.getColorCode(params.LearnedColor) : null;
            this.drawSkillTreeText(data, skill, rect, enabled);
            this.drawSkillTreeContentsFrame(index, learned, enabled);
            this.learnedDrawIcon(learned, rect);
            this.drawSkillCount(data, learned, rect);
            this.changePaintOpacity(1);
        }
    };

    Window_SkillTree.prototype.drawSkillTreeText = function(data, skill, rect, enabled) {
        if (!enabled && !this.isSkillTreeSecretCond(data)) {
            if (params.SkillTreeTextType === "icon") {
                const iconY = rect.y + (this.lineHeight() - ImageManager.iconHeight) / 2;
                this.drawIcon(this.getSecretIcon(), rect.x, iconY);
            } else {
                this.drawText(this.getSecretText(skill), rect.x, rect.y, rect.width);
            }
            data.enabled();
        } else {
            switch (params.SkillTreeTextType) {
                case "icon":
                    const iconY = rect.y + (this.lineHeight() - ImageManager.iconHeight) / 2;
                    this.drawIcon(skill.iconIndex, rect.x, iconY);
                    break;
                case "default":
                    this.drawItemName(skill, rect.x, rect.y, rect.width);
                    break;
                case "name":
                    this.drawText(skill.name, rect.x, rect.y, rect.width);
                    break;
            }
        }
    };

    Window_SkillTree.prototype.drawSkillTreeContentsFrame = function(index, learned, enabled) {
        if (!this.isSkillTreeSkillCount()) return;
        const rect = this.itemRect(index);
        const width = params.FrameWidth > 0 ? Math.min(params.FrameWidth, rect.width) : rect.width;
        const height = rect.height;
        const x = rect.x + params.FrameX;
        const y = rect.y;
        const color = this.getFrameColor(learned, enabled);
        const thick = (params.FrameThick || 3);
        this.drawSkillTreeFrame(x, y, width, height, thick, color);
    };

    Window_SkillTree.prototype.drawSkillCount = function(data, learned, rect) {
        if (!this.isSkillTreeFrame() || data.getMaxCount() <= 1 || !learned) return;
        const width = 20;
        const height = 20;
        const x = rect.x + rect.width + params.SkillCountFrameX;
        const y = rect.y + rect.height - (height / 2) + params.SkillCountFrameY;
        const color = NuunManager.getColorCode(params.SkillCountFrameColor);
        this.drawCountBackgroundRect(x, y, width, height);
        this.drawSkillTreeFrame(x, y, width, height, 2, color);
        this.drawSkillTreeCountText(data, x, y, width, height);
    };

    Window_SkillTree.prototype.drawSkillTreeFrame = function(x, y, width, height, thick, color) {
        const context = this.contents._context;
        context.strokeStyle = color;
        context.lineWidth = thick;
        context.beginPath();
        context.strokeRect(x, y, width, height);
        context.stroke();
    };

    Window_SkillTree.prototype.drawSkillTreeCountText = function(data, x, y, width, height) {
        this.contents.fontSize = 16;
        this.changeTextColor(NuunManager.getColorCode(params.SkillCountFontColor));
        this.drawText(this._actor.getSkillTreeCount(data._id), x, y - (height / 2) + 2, width, "center");
        this.contents.fontSize = $gameSystem.mainFontSize();
    };

    Window_SkillTree.prototype.getFrameColor = function(learned, enabled) {
        if (learned) {
            return NuunManager.getColorCode(params.LearnedFrameColor);
        } else if (enabled) {
            return NuunManager.getColorCode(params.UnlearnedFrameColor);
        } else {
            return NuunManager.getColorCode(params.NormalFrameColor);
        }
    };

    Window_SkillTree.prototype.getLineColor = function(learned, enabled) {
        if (learned) {
            return NuunManager.getColorCode(params.LearnedLineColor);
        } else if (enabled) {
            return NuunManager.getColorCode(params.UnlearnedLineColor);
        } else {
            return NuunManager.getColorCode(params.NormalLineColor);
        }
    };

    Window_SkillTree.prototype.drawDerivedSkillTreeLine = function(data, rect) {
        if (data && !data.isDerivedSkill()) return;
        const x = rect.x + (rect.width / 2);
        const y = rect.y + rect.height;
        for (const skillId of data._derivedSkill) {
            const index = this.getSkillTreeDataIndex(skillId);
            const derivedData = this._data[index];
            if (!!derivedData && this.isSkillTreeCond(derivedData)) {
                const enabled = this.isEnabled(derivedData);
                const learned = this._actor.isSkillTreeLearned(derivedData._id);
                const colorId = this.getLineColor(learned, enabled);
                const derivedRect = this.itemLineRect(index);
                const color = NuunManager.getColorCode(colorId);
                const x2 = derivedRect.x + (derivedRect.width / 2);
                const y2 = derivedRect.y;
                switch (data.getDerivedLineType()) {
                    case "straight":
                        this.drawSkillTreeStraightLine(x, y + 2, x2, y2 - 2, params.LineThick, color);
                        break;
                    case "type1":
                        this.drawSkillTreeType1Line(x, y + 2, x2, y2 - 2, params.LineThick, color);
                        break;
                    case "type2":
                        this.drawSkillTreeType2Line(x, y + 2, x2, y2 - 2, params.LineThick, color);
                        break;
                    case "type3":
                        this.drawSkillTreeType3Line(x, y + 2, x2, y2 - 2, params.LineThick, color);
                        break;
                    case "type4":
                        this.drawSkillTreeType4Line(x, y + 2, x2, y2 - 2, params.LineThick, color);
                        break;
                    case "type7":
                        this.drawSkillTreeType7Line(x, y + 2, x2, y2 - 2, params.LineThick, color);
                        break;
                }
            } 
        }
    };

    Window_SkillTree.prototype.drawSkillTreeStraightLine = function(x1, y1, x2, y2, thick, color) {
        this.drawSkillTreeLine(x1, y1, x2, y2, thick, color);
    };

    Window_SkillTree.prototype.drawSkillTreeType1Line = function(x1, y1, x2, y2, thick, color) {
        const rowSpacing = this.rowSpacing();
        const h = this.rowsMargin() + rowSpacing;
        const t = Math.floor(h / 2) * this.getDirection(x1, x2);
        const xm1 = x1 + t;
        const xm2 = x2 - t;
        const ym1 = y2 - h;
        const ym2 = y2 - Math.floor(h / 2);
        this.drawSkillTreeLine(x1, y1, x1, ym1, thick, color);
        this.drawSkillTreeLine(x1, ym1, xm1, ym2, thick, color);
        this.drawSkillTreeLine(xm1, ym2, xm2, ym2, thick, color);
        this.drawSkillTreeLine(xm2, ym2, x2, y2, thick, color);
    };

    Window_SkillTree.prototype.drawSkillTreeType2Line = function(x1, y1, x2, y2, thick, color) {
        const rowSpacing = this.rowSpacing();
        const h = this.rowsMargin() + rowSpacing;
        const t = Math.floor(h / 2) * this.getDirection(x1, x2);
        const xm1 = x1 + t;
        const xm2 = x2 - t;
        const ym1 = y1 + Math.floor(h / 2);
        const ym2 = y1 + h;
        this.drawSkillTreeLine(x1, y1, xm1, ym1, thick, color);
        this.drawSkillTreeLine(xm1, ym1, xm2, ym1, thick, color);
        this.drawSkillTreeLine(xm2, ym1, x2, ym2, thick, color);
        this.drawSkillTreeLine(x2, ym2, x2, y2, thick, color);
    };

    Window_SkillTree.prototype.drawSkillTreeType3Line = function(x1, y1, x2, y2, thick, color) {
        const rowSpacing = this.rowSpacing();
        const h = this.rowsMargin() + rowSpacing;
        const t = Math.floor(h / 2) * this.getDirection(x1, x2);
        const xm1 = x1 + t;
        const xm2 = x2 - t;
        const ym1 = y1 + Math.floor(y2 - y1) / 2;
        const ym2 = ym1 - Math.floor(h / 2);
        const ym3 = ym1 + Math.floor(h / 2);
        this.drawSkillTreeLine(x1, y1, x1, ym2, thick, color);
        this.drawSkillTreeLine(x1, ym2, xm1, ym1, thick, color);
        this.drawSkillTreeLine(xm1, ym1, xm2, ym1, thick, color);
        this.drawSkillTreeLine(xm2, ym1, x2, ym3, thick, color);
        this.drawSkillTreeLine(x2, ym3, x2, y2, thick, color);
    };

    Window_SkillTree.prototype.drawSkillTreeType4Line = function(x1, y1, x2, y2, thick, color) {
        const rowSpacing = this.rowSpacing();
        const h = this.rowsMargin() + rowSpacing;
        const ym1 = y2 - Math.floor(h / 2);
        this.drawSkillTreeLine(x1, y1, x1, ym1, thick, color);
        this.drawSkillTreeLine(x1, ym1, x2, ym1, thick, color);
        this.drawSkillTreeLine(x2, ym1, x2, y2, thick, color);
    };

    Window_SkillTree.prototype.drawSkillTreeType7Line = function(x1, y1, x2, y2, thick, color) {
        const rowSpacing = this.rowSpacing();
        const h = this.rowsMargin() + rowSpacing;
        const ym1 = y1 + Math.floor(h / 3);
        const ym2 = y2 - Math.floor(h / 3);
        this.drawSkillTreeLine(x1, y1, x1, ym1, thick, color);
        this.drawSkillTreeLine(x1, ym1, x2, ym2, thick, color);
        this.drawSkillTreeLine(x2, ym2, x2, y2, thick, color);
    };

    Window_SkillTree.prototype.drawSkillTreeLine = function(x1, y1, x2, y2, thick, color) {
        const context = this.contents._context;
        context.strokeStyle = color;
        context.lineWidth = thick;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
    };

    Window_SkillTree.prototype.drawCountBackgroundRect = function(x, y ,w, h) {
        const c1 = ColorManager.itemBackColor1();
        const c2 = ColorManager.itemBackColor2();
        this.contents.gradientFillRect(x, y, w, h, c1, c2, true);
        this.contents.strokeRect(x, y, w, h, c1);
    };

    Window_SkillTree.prototype.learnedDrawIcon = function(enabled, rect) {
        if (enabled) {
            const iconY = rect.y + (this.lineHeight() - ImageManager.iconHeight) / 2;
            const delta = ImageManager.standardIconWidth - ImageManager.iconWidth;
            const x = rect.x + rect.width + params.LearnedIconX + delta;
            const y = params.LearnedIconY + iconY;
            this.drawLearnedIcon(params.LearnedIcon, x, y);
        }
    };

    Window_SkillTree.prototype.drawLearnedIcon = function(iconIndex, x, y) {
        const bitmap = ImageManager.loadSystem("IconSet");
        const pw = ImageManager.iconWidth;
        const ph = ImageManager.iconHeight;
        const sx = (iconIndex % 16) * pw;
        const sy = Math.floor(iconIndex / 16) * ph;
        const w = params.LearnedIconSize || pw;
        const h = params.LearnedIconSize || ph;
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y, w, h);
    };

    Window_SkillTree.prototype.getDirection = function(x1, x2) {
        if (x1 < x2) {
            return 1;
        } else if (x1 > x2) {
            return -1;
        } else {
            return 0;
        }
    };

    Window_SkillTree.prototype.getSecretText = function(skill) {
        if(params.SkillTreeSecretText === '？' || params.SkillTreeSecretText === '?') {
            const name_length = this.secretTextLength(skill);
            return params.SkillTreeSecretText.repeat(name_length);
        } else {
            return params.SkillTreeSecretText;
        }
    };

    Window_SkillTree.prototype.secretTextLength = function(skill) {
        return skill.name.length;
    };

    Window_SkillTree.prototype.getSecretIcon = function() {
        return params.SecretIcon;
    };

    Window_SkillTree.prototype.isEnabled = function(data) {
        return !!data && this.isMultipleCount(data) || !!data && this.isReqSkill(data) && this._actor.isPaySkillTreeCostOk(data) && this.isSkillTreeEvalCond(data);
    };

    Window_SkillTree.prototype.isSkillTreeEvalCond = function(data) {
        return this.isSkillTreeSecretCond(data) && this.isSkillTreeLearnCond(data);
    };

    Window_SkillTree.prototype.isCurrentItemEnabled = function() {
        return this.isEnabled(this._data[this.index()]);
    };

    Window_SkillTree.prototype.isLearnEnabled = function() {
        return this._learnOk;
    };

    Window_SkillTree.prototype.isReqSkill = function(data) {
        const list = this.getSkillTreeList();
        if (!list) return [];
        return this._actor.isSkillTreeReqSkill(list, data._id);
    };

    Window_SkillTree.prototype.isMultipleCount = function(data) {
        if (data.getMaxCount() === 0) return !!this._actor.isSkillTreeLearned(data._id);
        return this._actor.isMultipleCount(data._id, data.getMaxCount());
    };

    Window_SkillTree.prototype.isSkillTreeSkillCount = function() {
        return params.ShowSkillCountFrame;
    };

    Window_SkillTree.prototype.learnSkillTree = function() {
        const data = this.itemAt(this.index());
        _setConfirmation(params.LearnConfirmation)
        //if (this.isMultipleCount(data)) return;
        this._actor.paySkillTreeCost(data);
        this._actor.learnSkillTree(data._id);
        this._actor.setSkillCount(data._id, data.getMaxCount());
        this.refresh();
        this._skillTreeStatusWindow.refresh();
        this._skillTreeCostWindow.refresh();
    };

    Window_SkillTree.prototype.playOkSound = function() {
        if (!this.isProcessLearnOk()) {
            return;
        }
        const _se = params.LearnSESetting;
        if (!!_se && !!_se.LearnSE) {
            AudioManager.playSe({"name":_se.LearnSE,"volume":_se.volume,"pitch":_se.pitch,"pan":_se.pan});
        } else {
            Window_Base.prototype.playOkSound.call(this);
        }
    };

    Window_SkillTree.prototype.isProcessLearnOk = function() {
        const data = this.itemAt(this.index());
        if (this.isMultipleCount(data)) {
            this._learnOk = false;
            return false;
        }
        this._learnOk = true;
        if (this.isConfirmationActive()) {
            return false;
        }
        return true;
    };

    Window_SkillTree.prototype.resetTextColor = function() {
        if (this._learnedSkillColor) {
            this.changeTextColor(this._learnedSkillColor);
            this._learnedSkillColor = null;
        } else {
            Window_Base.prototype.resetTextColor.apply(this, arguments);
        }
    };

    Window_SkillTree.prototype.isConfirmationActive = function() {
        return _isConfirmation();
    };

    Window_SkillTree.prototype.isSkillTreeContentsImage = function() {
        return !!_isSpriteSheet();
    };

    Window_SkillTree.prototype.setSkillTreeCostWindow = function(skillTreeWindow) {
        this._skillTreeCostWindow = skillTreeWindow;
    };

    Window_SkillTree.prototype.setSkillTreeStatusWindow = function(skillTreeWindow) {
        this._skillTreeStatusWindow = skillTreeWindow;
    };

    Window_SkillTree.prototype.setSkillTreeConfirmationWindow = function(skillTreeWindow) {
        this._skillTreeConfirmationWindow = skillTreeWindow;
    };


    function Window_SkillTreeCost() {
        this.initialize(...arguments);
    }
    
    Window_SkillTreeCost.prototype = Object.create(Window_Selectable.prototype);
    Window_SkillTreeCost.prototype.constructor = Window_SkillTreeCost;

    window.Window_SkillTreeCost = Window_SkillTreeCost;
    
    Window_SkillTreeCost.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this._data = [];
        this._treeData = null;
    };

    Window_SkillTreeCost.prototype.setActor = function(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
        }
    };

    Window_SkillTreeCost.prototype.setData = function(data) {
        if (this._treeData !== data) {
            this._treeData = data;
            this.refresh();
        }
    };

    Window_SkillTreeCost.prototype.maxCols = function() {
        return params.CostWindowCols;
    };

    Window_SkillTreeCost.prototype.maxItems = function() {
        return this._data ? this._data.length : 1;
    };

    Window_SkillTreeCost.prototype.makeItemList = function() {
        this._data = this._treeData ? this._treeData.getCostList() : [];
    };

    Window_SkillTreeCost.prototype.itemAt = function(index) {
        return this._data && index >= 0 ? this._data[index] : null;
    };

    Window_SkillTreeCost.prototype.refresh = function() {
        this.makeItemList();
        Window_Selectable.prototype.refresh.call(this);
        const rect = this.itemRect(-this.maxCols());
        this.drawCostTitle(rect.x, rect.y);
        this.drawCount(this._treeData, rect.x, rect.y, rect.width);
    };

    Window_SkillTreeCost.prototype.drawAllItems = function() {
        if (!this._treeData || !this._treeData.isEnabled()) return;
        Window_Selectable.prototype.drawAllItems.call(this);
    };

    Window_SkillTreeCost.prototype.itemRect = function(index) {
        index += this.maxCols();
        return Window_Selectable.prototype.itemRect.apply(this, arguments);
    };

    Window_SkillTreeCost.prototype.drawItemBackground = function(index) {

    };


    Window_SkillTreeCost.prototype.drawItem = function(index) {
        const textWidth = this.textWidth("0000");
        const rect = this.itemRect(index);
        const type = this.itemAt(index);
        this.drawCost(type, this._treeData, rect.x, rect.y, rect.width - textWidth);
        this.drawSkillTreeCost(type, this._treeData, rect.x, rect.y, rect.width);
    };

    Window_SkillTreeCost.prototype.drawCostTitle = function(x, y) {
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(params.SkillCostName, x, y);
    };

    Window_SkillTreeCost.prototype.drawCount = function(data, x, y, width) {
        this.changeTextColor(NuunManager.getColorCode(params.SkillCosTColor));
        if (!!data && data.getMaxCount() > 0) {
            this.drawSkillTreeCount(data, x, y, width, "right");
        }
    };


    Window_SkillTreeCost.prototype.drawCost = function(type, data, x, y, width) {
        this.changeTextColor(ColorManager.systemColor());
        switch (type) {
            case "sp":
                this.drawSkillCostIconName(params.SkillPointName, params.SkillCostIcon, x, y, width);
                break;
            case 'item':
                this.drawItemName($dataItems[data.getCostItem()], x, y, width);
                break;
            case 'weapon':
                this.drawItemName($dataWeapons[data.getCostWeapon()], x, y, width);
                break;
            case 'armor':
                this.drawItemName($dataArmors[data.getCostArmor()], x, y, width);
                break;
            case 'gold':
                this.drawSkillCostIconName(TextManager.currencyUnit, params.GoldCostIcon, x, y, width);
                break;
            case 'var':
                this.drawSkillCostIconName(data.getVariablesText(), params.VarCostIcon, x, y, width);
                break;
        }
    };

    Window_SkillTreeCost.prototype.drawSkillTreeCost = function(type, data, x, y, width) {
        this.changeTextColor(NuunManager.getColorCode(params.SkillCosTColor));
        switch (params.SkillCostType) {
            case 'type1':
                this.drawText(data.getCostNum(type), x, y, width, "right");
                break;
            case 'type2':
                this.drawText(data.getCostNum(type) +"["+ this.getParam(data, type) +"]", x, y, width, "right");
                break;
            case 'type3':
                this.drawText(data.getCostNum(type) +"("+ this.getParam(data, type) +")", x, y, width, "right");
                break;
            case 'type4':
                this.drawText(data.getCostNum(type) +"/"+ this.getParam(data, type), x, y, width, "right");
                break;
        }
    };

    Window_SkillTreeCost.prototype.drawSkillTreeCount = function(data, x, y, width) {
        this.changeTextColor(NuunManager.getColorCode(params.SkillCosTColor));
        switch (params.SkillCostType) {
            case 'type1':
                this.drawText(this._actor.getSkillTreeCount(data._id), x, y, width, "right");
                break;
            case 'type2':
                this.drawText(this._actor.getSkillTreeCount(data._id) +"["+ data.getMaxCount() +"]", x, y, width, "right");
                break;
            case 'type3':
                this.drawText(this._actor.getSkillTreeCount(data._id) +"("+ data.getMaxCount() +")", x, y, width, "right");
                break;
            case 'type4':
                this.drawText(this._actor.getSkillTreeCount(data._id) +"/"+ data.getMaxCount(), x, y, width, "right");
                break;
        }
    };

    Window_SkillTreeCost.prototype.drawSkillCostIconName = function(text, iconIndex,  x, y, width) {
        const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
        const delta = ImageManager.standardIconWidth - ImageManager.iconWidth;
        const textMargin = iconIndex > 0 ? ImageManager.standardIconWidth + 4 : 0;
        const itemWidth = Math.max(0, width - textMargin);
        if (iconIndex > 0) {
            this.drawIcon(iconIndex, x + delta / 2, iconY);
        }
        this.drawText(text, x + textMargin, y, itemWidth);
    };

    Window_SkillTreeCost.prototype.drawCostName = function(text, x, y, width) {
        this.drawText(text, x, y, width);
    };

    Window_SkillTreeCost.prototype.getParam = function(data, type) {
        switch (type) {
            case "sp":
                return this._actor.nsp;
            case 'item':
                return $gameParty.numItems($dataItems[data.getCostItem()]);
            case 'weapon':
                return $gameParty.numItems($dataItems[data.getCostWeapon()]);
            case 'armor':
                return $gameParty.numItems($dataItems[data.getCostArmor()]);
            case 'gold':
                return $gameParty.gold();
            case 'var':
                return data.getCostVariables();
        }
    };


    function Window_SkillTreeStatus() {
        this.initialize(...arguments);
    }
    
    Window_SkillTreeStatus.prototype = Object.create(Window_StatusBase.prototype);
    Window_SkillTreeStatus.prototype.constructor = Window_SkillTreeStatus;

    window.Window_SkillTreeStatus = Window_SkillTreeStatus;
    
    Window_SkillTreeStatus.prototype.initialize = function(rect) {
        Window_StatusBase.prototype.initialize.call(this, rect);
    };

    Window_SkillTreeStatus.prototype.setActor = function(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
        }
    };

    Window_SkillTreeStatus.prototype.refresh = function() {
        this.contents.clear();
        const rect = this.itemRect(0);
        const lineHeight = this.lineHeight();
        this.drawActorFace(this._actor, rect.x, rect.y);
        this.drawActorName(this._actor, rect.x + 120, rect.y, rect.width - 120);
        this.drawActorLevel(this._actor, rect.x + 120, rect.y + lineHeight * 1);
        this.drawActorSkillPoint(this._actor, rect.x + 120, rect.y + lineHeight * 2);
    };

    Window_SkillTreeStatus.prototype.drawActorSkillPoint = function(actor, x, y, width) {
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(params.SkillPointName, x, y, 48);
        this.resetTextColor();
        this.drawText(actor.nsp, x + 48, y, 36, "right");
    };

    Window_SkillTreeStatus.prototype.drawActorLevel = function(actor, x, y) {
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(TextManager.levelA, x, y, 48);
        this.resetTextColor();
        this.drawText(actor.level, x + 48, y, 36, "right");
    };


    function Window_SkillTreeConfirmation() {
        this.initialize(...arguments);
    }
    
    Window_SkillTreeConfirmation.prototype = Object.create(Window_HorzCommand.prototype);
    Window_SkillTreeConfirmation.prototype.constructor = Window_SkillTreeConfirmation;

    window.Window_SkillTreeConfirmation = Window_SkillTreeConfirmation;
    
    Window_SkillTreeConfirmation.prototype.initialize = function(rect) {
        Window_HorzCommand.prototype.initialize.call(this, rect);
        this.openness = 0;
    };

    Window_SkillTreeConfirmation.prototype.maxCols = function() {
        return 2;
    };

    Window_SkillTreeConfirmation.prototype.itemTextAlign = function() {
        return "center";
    };

    Window_SkillTreeConfirmation.prototype.makeCommandList = function() {
        this.addCommand(params.ConfirmatioOkText, "ok", true);
        this.addCommand(params.ConfirmationCancleText, "cancel", true);
    };

    Window_SkillTreeConfirmation.prototype.refresh = function() {
        Window_HorzCommand.prototype.refresh.call(this);
        this.confirmationMessage();
        //
        
    };

    Window_SkillTreeConfirmation.prototype.itemRect = function(index) {
        index += 4;
        return Window_Selectable.prototype.itemRect.apply(this, arguments);
    };

    Window_SkillTreeConfirmation.prototype.drawItem = function(index) {
        const rect = this.itemLineRect(index);
        const align = this.itemTextAlign();
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
    };

    Window_SkillTreeConfirmation.prototype.confirmationMessage = function() {
        const rect = this.itemRect(-4);
        const lineHeight = this.lineHeight();
        const width = this.innerWidth - this.colSpacing();
        this.drawText(params.ConfirmationWindowTitle, rect.x, rect.y, width);
        this.contentsHorzLine(rect.x, rect.y + lineHeight, width);
    };

    Window_SkillTreeConfirmation.prototype.contentsHorzLine = function(x, y, width) {
        const lineY = y + this.lineHeight() / 2 - 1;
        this.contents.paintOpacity = 48;
        this.contents.fillRect(x, lineY, width, 2, ColorManager.normalColor());
        this.contents.paintOpacity = 255;
    };


    const _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
    Game_Action.prototype.applyItemUserEffect = function(target) {
        _Game_Action_applyItemUserEffect.apply(this, arguments);
        this.skillPointGainItem(target);
        this.skillTreeResetItem(target);
    };

    Game_Action.prototype.skillPointGainItem = function(target) {
        const item = this.item();
        const point = NuunManager.getMetaCode(item, "GainSkillPoint");
        if (!!point) {
            target.gainSkillPoint(Number(point));
            this.makeSuccess(target);
        }
    };

    Game_Action.prototype.skillTreeResetItem = function(target) {
        const item = this.item();
        if (!!item.meta.SkillTreeReset) {
            _SkillTreeResets(target);
            this.makeSuccess(target);
        }
    };


    Object.defineProperties(Game_BattlerBase.prototype, {
        nsp: {
            get: function() {
                return this.getSkillPoint();
            },
            configurable: true
        }
    });

    const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
    Game_Actor.prototype.initMembers = function() {
        _Game_Actor_initMembers.call(this);
        this._nsp = 0;
        this._skillTreeCount = [];
        this._skillTreeList = null
        this.learnCount = 0;
    };

    Game_Actor.prototype.initSkillCount = function(skillId) {
        if (!this._skillTreeCount) {
            this._skillTreeCount = [];
        }
        if (this._skillTreeCount[skillId] === undefined) {
            this._skillTreeCount[skillId] = 0;
        }
    };

    const _Game_Actor_setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function(actorId) {
        _Game_Actor_setup.apply(this, arguments);
        this._nsp = this.initSkillPoint(actorId);
        this.setupSkillTreeList();
    };

    Game_Actor.prototype.setupSkillTreeList = function() {
        const list = _matchSkillTreeActor(this);
        if (!this._skillTreeList) {
            this._skillTreeList = [];
        }
        for (const array of list) {
            array[0] = _getSkillTreeSettingIndex(array[0]);
            if (!this._skillTreeList.some(a => a[0] === array[0] && a[1] === array[1])) {
                this._skillTreeList.push(array);
            }
        }
    };

    Game_Actor.prototype.getSkillTreeList = function() {
        if (!this._skillTreeList) {
            this.setupSkillTreeList();
        }
        return this.filterSkillTreeList();
    };

    Game_Actor.prototype.getAllSkillTreeList = function() {
        if (!this._skillTreeList) {
            this.setupSkillTreeList();
        }
        return this._skillTreeList.map(array => array[0]);
    };

    Game_Actor.prototype.filterSkillTreeList = function() {
        const list = this._skillTreeList;
        return list.filter((array, index) => {
            if (params.SkillTreeClass) {
                if (array[1] > 0 && array[1] !== this._classId) {
                    return false;
                }
            }
            for (let i = 0; i < index; i++) {
                if (params.SkillTreeClass && list[i][1] > 0 && list[i][1] !== this._classId) {
                    continue;
                }
                if (array[0] === list[i][0]) {
                    return false;
                }
            }
            return true;
        }).map(array => array[0]);
    };

    Game_Actor.prototype.addSkillTree = function(type) {
        const id = _getSkillTreeSettingIndex(type);
        if (!this._skillTreeList) {
            this._skillTreeList = [];
        }
        const data = params.SkillTreeSetting[id];
        if (!!data && !this._skillTreeList.some(a => a[0] === id && a[1] === data.ClassId)) {
            this._skillTreeList.push([id, 0]);
        }
    };

    Game_Actor.prototype.removeSkillTree = function(type, b) {
        const id = _getSkillTreeSettingIndex(type);
        if (!this._skillTreeList) {
            this._skillTreeList = [];
            return;
        }
        if (b) {
            this.skillTreeReset(id);
        }
        const index = this._skillTreeList.findIndex(a => a[0] === id && a[1] === 0);
        if (index >= 0) {
            this._skillTreeList.splice(index, 1);
        }
    };

    Game_Actor.prototype.initSkillPoint = function(actorId) {
        const actor = $dataActors[actorId];
        const cost = NuunManager.getMetaCode(actor, "InitSkillPoint");
        return !!cost && cost >= 0 ? cost : params.DefaultInitSkillPoint;
    };

    const _Game_Actor_changeClass = Game_Actor.prototype.changeClass;
    Game_Actor.prototype.changeClass = function(classId, keepExp) {
        const oldClassId = this._classId;
        const sp = this.nsp;
        _Game_Actor_changeClass.apply(this, arguments);
        this.setupSkillTreeList();
        this._nsp = sp;
        if (params.ChangeClassResetSkillTree) {
            this.changeClassResetSkillTree(oldClassId);
        }
    };

    const _Game_Actor_changeExp = Game_Actor.prototype.changeExp;
    Game_Actor.prototype.changeExp = function(exp, show) {
        const lastSP = this.nsp;
        _Game_Actor_changeExp.apply(this, arguments);
        if (show) {
            this.displayLevelUpSkillPoint(this.nsp - lastSP);
        }
    };

    Game_Actor.prototype.displayLevelUpSkillPoint = function(sp) {
        if (sp > 0) {
            const text = params.DisplayLevelUpMessage.format(this._name, sp, params.SkillPointName);
            const tests = $gameMessage._texts;
            $gameMessage.add(text);
        }
    };

    Game_Actor.prototype.changeClassResetSkillTree = function(classId) {
        const list = this._skillTreeList.filter(array => {
            if (array[1] > 0) {
                if (array[1] === classId) {
                    return true;
                }
            }
            return false;
        }).map(array => array[0]);
        for (const id of list) {
            if (!this.isDuplicationSkillTree(id, classId)) {
                this.skillTreeReset(id);
            }
        }
    };

    Game_Actor.prototype.isDuplicationSkillTree = function(id, classId) {
        return this._skillTreeList.some(array => array[0] === id && array[1] !== classId);
    };

    Game_Actor.prototype.isPaySkillTreeCostOk = function(data) {
        if (data.getCost() > 0 && !data.isCanCost(this.nsp)) {
            return false;
        }
        if (data.getCostItem() > 0 && $gameParty.numItems($dataItems[data.getCostItem()]) < data.getItemNum()) {
            return false;
        }
        if (data.getCostWeapon() > 0 && $gameParty.numItems($dataWeapons[data.getCostWeapon()]) < data.getWeaponNum()) {
            return false;
        }
        if (data.getCostArmor() > 0 && $gameParty.numItems($dataArmors[data.getCostArmor()]) < data.getArmorNum()) {
            return false;
        }
        if (data.getCostGold() > 0 && !data.getCanGold($gameParty.gold())) {
            return false;
        }
        if (data.getCostVariables() > 0 && $gameVariables.value(data.getCostVariables() < data.getVariableNum())) {
            return false;
        }
        return true;
    };

    Game_Actor.prototype.paySkillTreeCost = function(data) {
        if (data.getCost() > 0 && data.isCanCost(this.nsp)) {
            this.paySkillTreePoint(data.getCost());
        }
        if (data.getCostItem() > 0 && $gameParty.numItems($dataItems[data.getCostItem()]) < data.getItemNum()) {
            $gameParty.gainItem($dataItems[data.getCostItem()], data.getItemNum());
        }
        if (data.getCostWeapon() > 0 && $gameParty.numItems($dataWeapons[data.getCostWeapon()]) < data.getWeaponNum()) {
            $gameParty.gainItem($dataWeapons[data.getCostWeapon()], data.getWeaponNum());
        }
        if (data.getCostArmor() > 0 && $gameParty.numItems($dataArmors[data.getCostArmor()]) < data.getArmorNum()) {
            $gameParty.gainItem($dataArmors[data.getCostArmor()], data.getArmorNum());
        }
        if (data.getCostGold() > 0 && !data.getCanGold($gameParty.gold())) {
            $gameParty.loseGold(data.getCostGold());
        }
        if (data.getCostVariables() > 0 && $gameVariables.value(data.getCostVariables()) < data.getVariableNum()) {
            const value = $gameVariables.value(data.getCostVariables());
            $gameVariables.setValue(value - data.getVariableNum());
        }
    };

    Game_Actor.prototype.isSkillTreeLearned = function(skillId) {
        return this.isLearnedSkill(skillId);
    };

    Game_Actor.prototype.learnSkillTree = function(skillId) {
        this.learnCount++;
        if (!this.isSkillTreeLearned()) {
            this.learnSkill(skillId);
        }
    };

    Game_Actor.prototype.maxSkillTreePoint = function() {
        return params.MaxSkillPoint > 0 ? params.MaxSkillPoint : Infinity;
    };

    Game_Actor.prototype.paySkillTreePoint = function(sp) {
        this.gainSkillPoint(-sp);
    };

    Game_Actor.prototype.gainSkillPoint = function(sp) {
        if (isNaN(this._nsp)) {
            this._nsp = this.initSkillPoint(this.actorId());
        }
        this._nsp += sp;
        this._nsp = this._nsp.clamp(0, this.maxSkillTreePoint());
    };

    Game_Actor.prototype.getSkillPoint = function() {
        if (isNaN(this._nsp)) {
            this._nsp = this.initSkillPoint(this.actorId());
        }
        return this._nsp;
    };

    Game_Actor.prototype.setSkillCount = function(skillId ,maxCount) {
        this.initSkillCount(skillId);
        this._skillTreeCount[skillId] = Math.min(this._skillTreeCount[skillId] + 1, maxCount);
    };

    Game_Actor.prototype.isMultipleCount = function(skillId ,maxCount) {
        this.initSkillCount(skillId);
        return maxCount <= (this._skillTreeCount[skillId] || 0);
    };

    Game_Actor.prototype.getSkillTreeCount = function(skillId) {
        this.initSkillCount(skillId);
        return !!this._skillTreeCount ? (this._skillTreeCount[skillId] || 0) : 0;
    };

    const _Game_Actor_levelUp = Game_Actor.prototype.levelUp;
    Game_Actor.prototype.levelUp = function() {
        _Game_Actor_levelUp.apply(this, arguments);
        this.levelSkillPoint();
    };

    Game_Actor.prototype.levelSkillPoint = function() {
        this.gainSkillPoint(this.getLevelSkillPoint());
    };

    Game_Actor.prototype.getLevelSkillPoint = function() {
        const actor = this.actor();
        return NuunManager.getMetaCode(actor, "LevelupSkillPoint") || params.LevelupGainSkillPoint;
    };

    Game_Actor.prototype.skillTreeReset = function(id) {
        const skillTree = params.SkillTreeSetting[id];
        if (!skillTree || !skillTree.SkillTreeList) return;
        for (const data of skillTree.SkillTreeList) {
            if (this.isSkillTreeLearned(data.SkillId) && this.notDeletionSkillTreeSkill(data.SkillId)) {
                const treeData = _getSkillTreeData(data, skillTree.SymbolName, this);
                this.forgetSkill(treeData._id);
                if (treeData.getMaxCount() > 0) {
                    this.countGainSkillPoint(treeData);
                } else {
                    this.gainSkillPoint(treeData.getCost());
                }
            }
        }
    };

    Game_Actor.prototype.countGainSkillPoint = function(data) {
        const count = this.getSkillTreeCount(data._id);
        for (let i = 0; i < count; i++) {
            this.getCountSkillPoint(data, index);
        }
    };

    Game_Actor.prototype.getCountSkillPoint = function(data, index) {
        this.gainSkillPoint(data.getCost());
    };

    Game_Actor.prototype.notDeletionSkillTreeSkill = function(skillId) {
        const skill = $dataSkills[skillId];
        if (!skill) return true;
        return !skill.meta.SkillTreeNotDeletion;
    };

    Game_Actor.prototype.skillTreeLearnSkill = function(skillId) {
        for (const id of this._skillTreeList) {
            const skillTree = params.SkillTreeSetting[id];
            if (!!skillTree || !!skillTree.SkillTreeList) {
                for (const data of skillTree.SkillTreeList) {
                    if (data.SkillId === skillId && !this.isSkillTreeLearned(skillId) && this.isSkillTreeReqSkill(skillTree.SkillTreeList, skillId)) {
                        const t = _getSkillTreeData(data, skillTree.SymbolName, this);
                        if (this.isPaySkillTreeCostOk(t) && this.isSkillTreeEvalCond(t)) {
                            this.paySkillTreeCost(t);
                            this.learnSkillTree(skillId);
                            return;
                        }
                    }
                }   
            }
        }
    };

    Game_Actor.prototype.isSkillTreeEvalCond = function(data) {
        return this.isSkillTreeCond(data) && this.isSkillTreeSecretCond(data) && this.isSkillTreeLearnCond(data);
    };

    Game_Actor.prototype.isSkillTreeCond = function(data) {
        const cond = data.getCond();
        if (!cond) return true;
        const d = data;
        const v = $gameVariables._data;
        const s = $gameSwitches._data;
        const count = this.getSkillTreeCount(data._id);
        const actor = this;
        return eval(cond);
    };

    Game_Actor.prototype.isSkillTreeSecretCond = function(data) {
        const cond = data.getSecret();
        if (!cond) return true;
        const d = data;
        const v = $gameVariables._data;
        const s = $gameSwitches._data;
        const count = this.getSkillTreeCount(data._id);
        const actor = this;
        return eval(cond);
    };

    Game_Actor.prototype.isSkillTreeLearnCond = function(data) {
        const cond = data.getLearn();
        if (!cond) return true;
        const d = data;
        const v = $gameVariables._data;
        const s = $gameSwitches._data;
        const count = this.getSkillTreeCount(data._id);
        const actor = this;
        return eval(cond);
    };

    Game_Actor.prototype.isSkillTreeReqSkill = function(list, skillId) {
        const reqList = list.filter(req => {
            if (!!req.DerivedSkill) {
                return req.DerivedSkill.includes(skillId);
            }
            return false;
        }).map(t => t.SkillId);
        if (reqList.length === 0) return true;
        return reqList.every(id => this.isSkillTreeLearned(id));
    };

    Game_Actor.prototype.benchMembersSkillPoint = function() {
        return !params.BenchMembarsGainSkillPoint && !this.isBattleMember() ? 0 : 1;
    };

    Game_Enemy.prototype.getSkillPoint = function() {
        return 0;
    };

    Game_Enemy.prototype.getGainSkillPoint = function() {
        const enemy = this.enemy();
        return NuunManager.getMetaCodeList(enemy, "DropSkillPoint") || [0 ,0];
    };

    Game_Enemy.prototype.makeDropSkillPoint = function() {
        const data = this.getGainSkillPoint().map(Number);
        if (data[0] > 0 && (data[1] || 100) > Math.random() * 100) {
            return data[0];
        }
        return 0;
    };


    Game_Troop.prototype.skillPointTotal = function() {
        const members = this.deadMembers();
        return members.reduce((r, enemy) => r + Number(enemy.makeDropSkillPoint()), 0);
    };


    const _BattleManager_gainRewards = BattleManager.gainRewards;
    BattleManager.gainRewards = function() {
        _BattleManager_gainRewards.apply(this, arguments);
        this.gainSkillPoint();
    };

    BattleManager.gainSkillPoint = function() {
        const sp = this._rewards.skillPoint;
        for (const actor of $gameParty.allMembers()) {
            actor.gainSkillPoint(sp * actor.benchMembersSkillPoint());
        }
    };

    const _BattleManager_makeRewards = BattleManager.makeRewards;
    BattleManager.makeRewards = function() {
        _BattleManager_makeRewards.apply(this, arguments);
        this._rewards.skillPoint = $gameTroop.skillPointTotal();
    };

    const _BattleManager_displayRewards = BattleManager.displayRewards;
    BattleManager.displayRewards = function() {
        _BattleManager_displayRewards.apply(this, arguments);
        this.displaySkillPoint();
    };

    BattleManager.displaySkillPoint = function() {
        if (params.DisplayResultMessage) {
            const sp = this._rewards.skillPoint;
            if (sp > 0) {
                const text = params.DisplayResultMessage.format(sp, params.SkillPointName);
                $gameMessage.add("\\." + text);
            }
        }
    };


})();