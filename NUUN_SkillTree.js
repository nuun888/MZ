/*:-----------------------------------------------------------------------------------
 * NUUN_SkillTree.js
 * 
 * Copyright (C) 2025 NUUN
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Skill Tree
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.5.3
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
 * When specifying a color, for plugin parameters with (code) appended to the parameter name, you can enter a color code in the text field (Text tab).
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
 * <SkillTreeSkillText:[text]> Set the description for the help window. If nothing is entered, the description for the database settings will be displayed.
 * [text]:Description (control characters allowed)
 * 
 * <SkillTreeNoCostReturn> The skill cost for this skill will not be refunded.
 * 
 * Item, Weapon, and Armor Notes
 * <SkillTreeCostNoReturn> Items will not be refunded upon reset.
 * 
 * Enemy Notes
 * <DropSkillPoint:[sp], [rate]> Drop skill points.
 * [sp]:Skill point
 * [rate]:Probability
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
 * 12/13/2025 Ver.1.5.3
 * Fixed an issue where the branch lines were not displayed in "NUUN_SkillTreeFreeArrangement".
 * 12/7/2025 Ver.1.5.2
 * Added a feature that allows you to specify the color of the system text in the cost window.
 * Added a feature that allows you to specify the color of the cost name in the cost window.
 * 12/6/2025 Ver.1.5.1
 * Fixed an issue where variable costs were not working.
 * 12/4/2025 Ver.1.5.0
 * Added a feature to play a custom sound effect when learning a skill.
 * Added a feature to scroll the background image.
 * 11/28/2025 Ver.1.4.3
 * Corrected the process of applying "NUUN_SkillTreeFreeArrangement".
 * 10/13/2025 Ver.1.4.2
 * Added the ability to specify an actor when displaying the skill tree window from a plugin command.
 * 10/11/2025 Ver.1.4.1
 * Fix item width.
 * 10/11/2025 Ver.1.4.0
 * Added a feature that allows you to specify a single image as the background for skill item content.
 * Added a feature that allows you to set help text when selecting a skill type.
 * Fixed the display order of derived lines.
 * 10/6/2025 Ver.1.3.5
 * Fixed an issue where the cost refund for "SkillTreeRemoveSkill" was not working.
 * 10/5/2025 Ver.1.3.4
 * Fixed an issue where skill names were not displayed correctly depending on the number of times the skill was learned.
 * 10/4/2025 Ver.1.3.3
 * Fixed an issue where the skill icon after learning was only applied when "NUUN_SkillTreeLearnEx" was set.
 * Added a feature that allows you to set the skill icon after learning for each skill.
 * 10/2/2025 Ver.1.3.2
 * Corrected the processing of skill item display.
 * Added a feature that allows you to set skill icons during the learning process. (If you have the paid version, you can write the evaluation formula in the Text tab)
 * 9/29/2025 Ver.1.3.1
 * The character selection button UI will now only be displayed while selecting the skill tree type.
 * The help text will no longer be displayed when returning to the skill tree type selection screen.
 * 9/24/2025 Ver.1.3.0
 * Added a feature to allow setting custom help text in the help window, separate from the database text.
 * Added a feature to set skill points for each class.
 * Added a feature to disable skill cost refund for specific skills.
 * 9/23/2025 Ver.1.2.13
 * Fixed an issue where the skill tree type window did not display at full width within the UI area.
 * 9/18/2025 Ver.1.2.12
 * Fixed scrolling.
 * 9/17/2025 Ver.1.2.11
 * Added a feature to reset skill points when changing classes.
 * Fixed an issue where skill points were incorrectly added when changing classes.
 * Modified the system so that skills acquired through the "Learnable Skills" function are not affected by the reset.
 * Added a "Ignore Cost" option to the plugin command "Skills Learning".
 * 9/15/2025 Ver.1.2.10
 * Added a feature to specify the width of items in the skill tree window.
 * Fixed an issue where skill cost information was displayed when returning to the Skill Tree Type window from the Skill Tree window.
 * 9/14/2025 Ver.1.2.9
 * Added the ability to adjust the position of skill item icons and text.
 * Fixed an issue where actors could not be selected for skill point increase/decrease items and reset items.
 * Fixed an issue where not all skill points were refunded when learning a skill multiple times.
 * 9/13/2025 Ver.1.2.8
 * Corrected horizontal margins.
 * 9/12/2025 Ver.1.2.7
 * Added a feature to set the level numerically in the learning conditions.
 * Fixed an issue where the acquisition count was set to 0 when acquiring a skill outside of the skill tree.
 * Changed some processing.
 * 9/10/2025 Ver.1.2.6
 * Fixed an issue where the cost display of weapons and armor was not displaying the correct number of items.
 * 9/8/2025 Ver.1.2.5
 * Fixed an issue where an error would occur when deleting a skill if cost refunds were enabled.
 * Fixed an issue where costs for items, weapons, and armor were not being paid.
 * 9/7/2025 Ver.1.2.4
 * Fixed an issue where the skill name in the skill cost window would display the name of a secret skill.
 * Fixed to prevent numerical text from displaying for items set to Secret.
 * Fixed an issue where an error would occur when opening the Skill Tree when the confirmation window was set to show.
 * 9/6/2025 Ver.1.2.3
 * Fixed an issue where the frame border would still appear even when disabled.
 * 9/6/2025 Ver.1.2.2
 * Fixed an issue whereby "learned" is displayed if a skill has already been learned.
 * Added a function to not display the skill cost and conditions if a skill has already been learned.
 * Fixed an issue whereby the number of times a skill has been learned is counted even if the maximum number of times it can be learned is 0.
 * Added a function to display the learning confirmation window in the center.
 * 9/1/2025 Ver.1.2.1
 * Fixed the initial coordinate settings.
 * Fixed an issue where the help window was displayed shifted downwards with certain plugins.
 * Added a feature to display help at the bottom.
 * Added a feature to disable consideration of help coordinates.
 * Fixed an issue where skill ID could not be referenced by skillId.
 * 8/31/2025 Ver.1.2.0
 * Added a feature to specify the inner width.
 * Added a feature to set arbitrary numeric text for skill items in the skill tree window.
 * Fixed an issue where items specified in columns were displayed misaligned.
 * 8/30/2025 Ver.1.1.2
 * Fixed the learning target for skill learning plugin commands to the currently applied skill tree type.
 * Added the ability to ignore prerequisite skills and specify the number of times a skill can be learned to skill learning plugin commands.
 * Added the ability to delete skills to the plugin commands.
 * 8/28/2025 Ver.1.1.1
 * Added the ability to specify the frame color of skills that can be relearned.
 * Added the ability to set learning condition text to cost conditions.
 * 8/26/2025 Ver.1.1.0
 * Skill learning cost refunds now apply to items, weapons, armor, amounts, and variables.
 * Added a setting to not refund skill learning costs when clearing or resetting the skill tree.
 * Added a plugin command to determine if a skill has been learned in the skill tree.
 * Updated to support the Extended Skill Learning plugin.
 * 8/25/2025 Ver.1.0.6
 * Fixed an issue where an error would occur when increasing or decreasing skill points if the initial skill points were set from the actor or job.
 * 8/24/2025 Ver.1.0.5
 * Individual settings for initial skill points and skill points gained upon leveling up now also apply to jobs.
 * Fixed an issue where some other starting skills would not be displayed if a starting skill without a column specification was set.
 * Added a function to force the X coordinate to be displayed at a specified position.
 * 8/23/2025 Ver.1.0.4
 * Changed the processing specifications after skill acquisition. (Save files are not compatible with all versions.)
 * Fixed an issue where skill learning via plugin commands could be executed more than the maximum number of times allowed.
 * If the skill it is derived from has not been acquired, the line color will now be displayed in the color that indicates the acquisition conditions have not been met.
 * 8/18/2025 Ver.1.0.3
 * Added a feature to display skill costs even when they are 0.
 * Fixed to display SP gained when leveling up.
 * Fixed an issue where an error would occur when increasing or decreasing skill points after installation.
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
 * @arg ActorId
 * @text Actor id
 * @desc Specifies the actor ID.
 * @type actor
 * @min 0
 * @default 0
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
 * @arg ReturnSkillTreeCost
 * @desc Skill costs are not refunded. (Costs that are not eligible for refund will not be refunded.)
 * @text No skill cost refund
 * @type boolean
 * @default false
 * 
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
 * @arg Count
 * @text Skill learning count
 * @desc Specifies the number of times to learn the specified skill. 0 is the maximum number of times
 * @type number
 * @min 0
 * @default 1
 * 
 * @arg CostCondForced
 * @text Ignoring costs and conditions
 * @desc You will learn it regardless of the learning costs and conditions.
 * @type boolean
 * @default false
 * 
 * @arg Forced
 * @text Ignore prerequisite skills
 * @desc Learn without regard for prerequisite skills.
 * @type boolean
 * @default false
 * 
 * 
 * @command SkillTreeRemoveSkill
 * @desc Removes a learned skill from the skill tree.
 * @text Skill remove
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
 * @arg ReturnSkillTreeCost
 * @desc Skill costs are not refunded. (Costs that are not eligible for refund will not be refunded.)
 * @text No skill cost refund
 * @type boolean
 * @default false
 * 
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
 * @arg ReturnSkillTreeCost
 * @desc Skill costs are not refunded. (Costs that are not eligible for refund will not be refunded.)
 * @text No skill cost refund
 * @type boolean
 * @default false
 * 
 * 
 * @command IsSkillTreeLearnedSkill
 * @desc Determines whether the specified skill has been learned in the skill tree and assigns it to the specified switch.
 * @text Skill learning completion status
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
 * @arg SwitchesId
 * @text Switch
 * @desc Specify the switch ID to be assigned.
 * @type switch
 * @default 0
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
 * @default "default"
 * @parent SkillTreeTextSetting
 * 
 * @param SkillTreeTextX
 * @text Text position X (relative)
 * @desc Adjusts the X position of the skill (icon).
 * @type number
 * @default 0
 * @parent SkillTreeTextSetting
 * 
 * @param SkillTreeContentsWidth
 * @text Skill item width
 * @desc Set the width of the skill item. Set automatically at 0.
 * @type number
 * @default 0
 * @min 0
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
 * @param SkillTreeNumText
 * @text Numeric text
 * @desc Sets the numeric text.(Javascript)
 * @type combo
 * @option 'count +"/"+ maxCount'
 * @default 
 * @parent SkillTreeTextSetting
 * 
 * @param SkillTreeTextWidth
 * @text Numeric character length
 * @desc Set the character length of the numeric text. Example: 3 digits with 3 zeros (000).
 * @type string
 * @default 000
 * @parent SkillTreeTextSetting
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
 * @param ClassChangeResetSkillPoint
 * @desc Resets skill points for types that are no longer displayed when changing classes.
 * @text Skill points reset when changing classes
 * @type boolean
 * @default true
 * @parent ClassSetting
 * 
 * @param IsClassSp
 * @desc Assign skill points per class.
 * @text Class-specific skill points
 * @type boolean
 * @default false
 * @parent ClassSetting
 * 
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
 * @param SkillTreeTypeHelpText
 * @text Skill tree type help
 * @desc Sets the default help window text.
 * @type string
 * @default 
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
 * @default {"WindowX":"240","WindowY":"0","WindowWidth":"576","WindowHeight":"0"}
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
 * @param InnerWidth
 * @text Window inner width
 * @desc Specifies the width of the window. Scrolls to a width equal to or greater than the window width. 0 is the original inner width
 * @type number
 * @default 0
 * @min 0
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
 * @default {"WindowX":"0","WindowY":"288","WindowWidth":"240","WindowHeight":"0"}
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
 * @parent SkillTreeCostSetting
 * 
 * @param SkillCostName
 * @text Skill cost display name
 * @desc The display name for the skill cost. %1:Skill name
 * @type string
 * @default "Learning Cost"
 * @parent SkillTreeCostSetting
 * 
 * @param LearnedName
 * @text Learned names
 * @desc Learned display name.
 * @type string
 * @default "Already learned"
 * @parent SkillTreeCostSetting
 * 
 * @param LearningLevelName
 * @text Name of the learnable level
 * @desc The display name of the level that can be learned.
 * @type string
 * @default Learning Level
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
 * @param SkillCostSystemColor
 * @text "Skill cost display name" text color (code)
 * @desc Specifies the text color of the "Skill cost display name" in the cost window.
 * @type color
 * @default 16
 * @parent SkillTreeCostSetting
 * 
 * @param LearnedNameColor
 * @text Learned name text color (code)
 * @desc Specifies the text color of "Learned names" in the cost window.
 * @type color
 * @default 16
 * @parent SkillTreeCostSetting
 * 
 * @param SkillCostNameColor
 * @text Cost name text color (code)
 * @desc Specifies the color of the cost name text in the Cost window.
 * @type color
 * @default 16
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
 * @param VisibleLearnedSkillCost
 * @desc If a skill has been fully mastered or mastered multiple times, the cost will not be displayed.
 * @text No learned cost displayed
 * @type boolean
 * @default false
 * @parent SkillTreeCostSetting
 * 
 * @param VisibleSkillPointZero
 * @desc Skill points will be displayed in the cost window even if the cost is 0.
 * @text Skill point cost 0 display
 * @type boolean
 * @default false
 * @parent SkillTreeCostSetting
 * 
 * @param VisibleLearningLevel
 * @desc Does not display the level available for learning.
 * @text No learning level display
 * @type boolean
 * @default false
 * @parent SkillTreeCostSetting
 * 
 * @param SkillTreeCostExSetting
 * @text Cost Window Ex settings
 * @default To perform this setting, you need to have "NUUN_SkillTreeEx" installed.
 * @parent SkillTreeCostSetting
 * 
 * @param ShowPrerequisite
 * @desc This will display prerequisite skills. (Requires "NUUN_SkillTreeEx")
 * @text Display prerequisite skills
 * @type boolean
 * @default false
 * @parent SkillTreeCostExSetting
 * 
 * @param PrerequisiteSkillsName
 * @text Prerequisite skill display name
 * @desc Prerequisite skill display name.
 * @type string
 * @default Prerequisite skills
 * @parent SkillTreeCostExSetting
 * 
 * @param SkillTreeStatusSetting
 * @text Status window settings
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param SkillTreeStatusWindow
 * @text Status window settings
 * @desc Configure the status window settings.
 * @default {"WindowX":"0","WindowY":"0","WindowWidth":"240","WindowHeight":"134"}
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
 * @param SkillTreeHelpRows
 * @text Skill Tree Help Window Display Lines
 * @desc Number of lines displayed in the skill tree help window.
 * @type number
 * @default 2
 * @min 0
 * @parent SkillTreeHelpSetting
 * 
 * @param HelpBottomMode
 * @desc The help window will be displayed at the bottom.
 * @text Help window bottom display
 * @type boolean
 * @default false
 * @parent SkillTreeHelpSetting
 * 
 * @param HelpAreaInvalidated
 * @desc Disables the influence of help window coordinates on other windows.
 * @text Help window coordinate consideration disabled
 * @type boolean
 * @default false
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
 * @param ConfirmationWindowCenter
 * @desc The confirmation window is displayed in the center.
 * @text Auto center display
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
 * @desc Specifies the color of the learned characters. -1 is the original color
 * @type color
 * @default 0
 * @min -1
 * @parent LearnSetting
 * 
 * @param LearnSkillIcon
 * @text Learning skill icon
 * @desc Skill item icon after acquisition. (0 represents the default skill icon)
 * @type icon
 * @default 0 
 * @parent LearnSetting
 * 
 * @param LearnedIconSetting
 * @text Learned icon settings
 * @default ------------------------------
 * @parent LearnSetting
 * 
 * @param LearnedIcon
 * @text Learned icon
 * @desc Specifies the learned icon. (The icon next to the skill is set in "Learning skill icon")
 * @type icon
 * @default 89
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
 * @option Images
 * @value image
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
 * @option key line(under)
 * @value type1
 * @option key line(up)
 * @value type2
 * @option key line(middle)
 * @value type3
 * @option None
 * @value none
 * @default type1
 * @parent LineSetting
 * 
 * @param LineDiagonalWidth
 * @text Hook mark length
 * @desc Specifies the length of the hook mark.
 * @type number
 * @default 30
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
 * @param CountFrameColor
 * @text Relearnable frame color (code)
 * @desc Specifies the color of the skill slot that can be relearned.
 * @type color
 * @default 23
 * @min 0
 * @parent FrameSetting
 * 
 * @param ImagsSetting
 * @text Image Settings
 * @default ------------------------------
 * 
 * @param HideFocusCursor
 * @desc Hides the cursor when in focus.
 * @text Hide cursor when focused
 * @type boolean
 * @default true
 * @parent ImagsSetting
 * 
 * @param SpriteSheetSetting
 * @text  Sprite sheet setting
 * @default ------------------------------
 * @parent ImagsSetting
 * 
 * @param ContentsBackImage
 * @text Content background image
 * @desc Content background sprite sheet image
 * @type file
 * @dir img/
 * @default
 * @parent SpriteSheetSetting
 * 
 * @param FocusImageIndex
 * @text Focused Index
 * @desc Specifies the index of the sprite sheet image when focused.
 * @type number
 * @default 0
 * @parent SpriteSheetSetting
 * 
 * @param ContentsBackImageCols
 * @text Number of horizontal divisions in sprite sheet
 * @desc Specifies the number of horizontal divisions in the sprite sheet.
 * @type number
 * @default 4
 * @min 1
 * @parent SpriteSheetSetting
 * 
 * @param ContentsBackImageRows
 * @text Number of vertical divisions in sprite sheet
 * @desc Specifies the number of vertical divisions in the sprite sheet.
 * @type number
 * @default 2
 * @min 1
 * @parent SpriteSheetSetting
 * 
 * @param BackgroundSetting
 * @text Background image
 * @default ------------------------------
 * @parent ImagsSetting
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
 * @desc Fit the background image to the window UI size. If scrolling is specified, it will be disabled.
 * @type boolean
 * @default true
 * @parent BackgroundSetting
 * 
 * @param BackScrollX
 * @desc Horizontal scrolling speed of the background image. Positive values scroll to the right, negative values to the left.
 * @text Background Scroll Speed X
 * @type number
 * @default 0
 * @min -9999
 * @parent BackgroundSetting
 * 
 * @param BackScrollY
 * @desc Vertical scrolling speed of the background image. Positive values scroll downward, negative values upward.
 * @text Background Scroll Speed Y
 * @type number
 * @default 0
 * @min -9999
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
 * @param SkillTreeTypeHelpText
 * @text Skill tree type help
 * @desc Sets the text for the help window.
 * @type string
 * @default 
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
 * @param ForcedPlacement
 * @text Fixed column position enabled
 * @desc Forces it to appear at the specified column position.
 * @type boolean
 * @default false
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
 * @type variable
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
 * @param LearningLevel
 * @text Levels at which learning is possible
 * @desc Specify the level you can learn. 0 means no limit
 * @type number
 * @default 0
 * @parent LearnSetting
 * 
 * @param LearnCondText
 * @text Learning condition text
 * @desc The text of the learning conditions to be displayed in the cost window. Control characters can be used.
 * @type multiline_string
 * @default 
 * @parent LearnSetting
 * 
 * @param LearnCond
 * @text Learning conditions
 * @desc Enter the conditions for acquiring skills in JavaScript.
 * @type combo
 * @option 'v[0];//Variables'
 * @option 's[0];//Switches'
 * @option 'actor._level >= 10;//Actor level 10 or higher'
 * @default 
 * @parent LearnSetting
 * 
 * @param LearnSkillIcon
 * @text Learning skill icon
 * @desc Skill item icon after acquisition. (0 is the default)
 * @type icon
 * @default 0 
 * @parent LearnSetting
 * 
 * @param LearnSe
 * @text Individual se on learning
 * @desc Plays a custom SE instead of the default one when the skill is learned.
 * @type struct<LearnSE>
 * @default {"LearnSE":"","volume":"90","pitch":"100","pan":"0"}
 * @parent LearnSetting
 * 
 * @param LearnCommonEvent
 * @text Common event on learning
 * @desc Executes a specified common event after the skill is learned. (NUUN_SkillTreeEx required)
 * @type common_event
 * @default 0
 * @parent LearnSetting
 * 
 * @param ImmediateCommonEvent
 * @text Immediate common event execution
 * @desc Triggers the common event immediately. Some commands are unavailable in this mode.
 * @type boolean
 * @default false
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
 * @option key line(under)
 * @value type1
 * @option key line(up)
 * @value type2
 * @option key line(middle)
 * @value type3
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
 * @version 1.5.3
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
 * 
 * 色指定時、プラグインパラメータ名に(code)が付いたプラグインパラメータは、テキストタブでカラーコードが記入できます。
 * 
 * 
 * アクター、職業のメモ欄
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
 * <SkillTreeSkillText:[text]> ヘルプウィンドウの説明文を設定します。記入がない場合はデータベース設定の説明が表示されます。
 * [text]:説明文(制御文字使用可能)
 * 
 * <SkillTreeNoCostReturn> このスキルのスキルコストの返還が行われません。
 * 
 * アイテム、武器、防具のメモ欄
 * <SkillTreeCostNoReturn> リセット時にアイテムの返還はありません。
 * 
 * 敵キャラのメモ欄
 * <DropSkillPoint:[sp], [rate]> スキルポイントをドロップします。
 * [sp]:スキルポイント
 * [rate]:確率
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
 * 2025/12/13 Ver.1.5.3
 * NUUN_SkillTreeFreeArrangementでの派生線が表示されない問題を修正。
 * 2025/12/7 Ver.1.5.2
 * コストウィンドウのシステム文字の色を指定できる機能を追加。
 * コストウィンドウのコスト名の色を指定できる機能を追加。
 * 2025/12/6 Ver.1.5.1
 * 変数コストが機能していなかった問題を修正。
 * 2025/12/4 Ver.1.5.0
 * スキル習得時に任意のSEを再生する機能を追加。
 * 背景画像をスクロールさせる機能を追加。
 * 2025/11/28 Ver.1.4.3
 * スキルツリー自由配置プラグイン適用に関する処理の修正。
 * 2025/10/13 Ver.1.4.2
 * プラグインコマンドからスキルツリーウィンドウを表示する際に、アクターを指定できる機能を追加。
 * 2025/10/11 Ver.1.4.1
 * 項目の幅を修正。
 * 2025/10/11 Ver.1.4.0
 * スキル項目コンテンツ背景に単体画像を指定できる機能を追加。
 * スキルタイプ選択中にヘルプテキストを設定できる機能を追加。
 * 派生ラインの表示順を修正。
 * 2025/10/6 Ver.1.3.5
 * スキル削除のコスト返還が機能していなかった問題を修正。
 * 2025/10/5 Ver.1.3.4
 * スキル習得回数によるスキル名が正常に表示されない問題を修正。
 * 2025/10/4 Ver.1.3.3
 * 習得後スキルアイコンがNUUN_SkillTreeLearnEx設定している場合しか適用されていなかった問題を修正。
 * 習得後スキルアイコンをスキルごとに設定できるように修正。
 * 2025/10/2 Ver.1.3.2
 * スキル項目表示の処理の修正。
 * 習得時のスキルアイコンを設定できる機能を追加。(有償版をお持ちの場合はテキストタブで評価式で記述可能)
 * 2025/9/29 Ver.1.3.1
 * キャラクター切り替えのボタンUIの表示をスキルツリータイプ選択中のみ表示するように修正。
 * スキルツリータイプ選択に戻る際、ヘルプテキストを表示しないように修正。
 * 2025/9/24 Ver.1.3.0
 * ヘルプウィンドウの説明文にデータベースとは別の任意の説明文を設定できる機能を追加。
 * クラス毎のスキルポイントを設定できる機能を追加。
 * スキルコスト返還を無効になるスキルを設定できる機能を追加。
 * 2025/9/23 Ver.1.2.13
 * スキルツリータイプウィンドウの横幅がUIエリア最大まで表示されない問題を修正。
 * 2025/9/18 Ver.1.2.12
 * スクロール処理を修正。
 * 2025/9/17 Ver.1.2.11
 * クラス変更時にスキルポイントをリセットする機能を追加。
 * クラス変更時にスキルポイントが加算されてしまう問題を修正。
 * 習得するスキルで習得されたスキルはリセットの対象外になるように修正。
 * プラグインコマンド「スキル習得」にコスト無視を追加。
 * 2025/9/15 Ver.1.2.10
 * スキルツリーウインドウの項目の横幅を指定できる機能を追加。
 * スキルツリーウィンドウからスキルツリータイプウィンドウに戻る際に、スキルコスト情報を表示しないように修正。
 * 2025/9/14 Ver.1.2.9
 * スキル項目のアイコン、文字の位置を調整する機能を追加。
 * スキルポイント増減アイテム、リセットアイテムでアクターを選択できない問題を修正。
 * 複数回習得でスキルポイントが全て返還されていなかった問題を修正。
 * 2025/9/13 Ver.1.2.8
 * 横余白の修正。
 * 2025/9/12 Ver.1.2.7
 * 習得条件にレベルを数値で設定できる機能を追加。
 * スキルツリー習得以外でスキルを習得した際に、習得カウント回数が0になっていた問題を修正。
 * 一部の処理を変更。
 * 2025/9/10 Ver.1.2.6
 * コスト表示の武器、防具の所持数が正常に表示されていなかった問題を修正。
 * 2025/9/8 Ver.1.2.5
 * スキル削除時にコストの返還を有効にしている場合、エラーが出る問題を修正。
 * アイテム、武器、防具のコストが支払われていなかった問題を修正。
 * 2025/9/7 Ver.1.2.4
 * スキルコストウィンドウのスキル名でシークレット状態のスキル名が表示されてしまう問題を修正。
 * シークレット表示の項目に対して、数値テキストを表示しないように修正。
 * 確認ウィンドウを表示に設定しているときに、スキルツリーを開くとエラーが出る問題を修正。
 * 2025/9/6 Ver.1.2.3
 * フレーム枠を無効にしても表示されてしまう問題を修正。
 * 2025/9/6 Ver.1.2.2
 * スキルが習得済みの場合は、習得済みと表示するように修正。
 * スキルが習得済みの場合は、スキルコスト、条件を表示させない機能を追加。
 * 最大習得回数が0のスキルでも習得回数をカウントするように修正。
 * 習得確認ウィンドウを中央に表示させる機能を追加。
 * 2025/9/1 Ver.1.2.1
 * 初期の座標設定を修正。
 * 特定のプラグインでヘルプウィンドウの位置が下にずれて表示される問題を修正。
 * ヘルプを下側に表示できる機能を追加。
 * ヘルプ座標の考慮を無効にする機能を追加。
 * skillIdでスキルIDを参照できない問題を修正。
 * 2025/8/31 Ver.1.2.0
 * 内幅を指定できる機能を追加。
 * スキルツリーウィンドウのスキル項目に任意の数字テキストを設定できる機能を追加。
 * 列指定した項目がずれて表示される問題を修正。
 * 2025/8/30 Ver.1.1.2
 * プラグインコマンドのスキル習得の習得対象を現在適用されているスキルツリータイプに修正。
 * プラグインコマンドのスキル習得に前提スキル無視及びスキルの習得回数を指定できる機能を追加。
 * プラグインコマンドにスキルの削除を追加。
 * 2025/8/28 Ver.1.1.1
 * 再習得可能なスキルの枠の色を指定できる機能を追加。
 * コスト条件に習得条件のテキストを設定できる機能を追加。
 * 2025/8/26 Ver.1.1.0
 * スキル習得コストの返還をアイテム、武器、防具、金額、変数にも適用。
 * スキルツリー消去、スキルツリーリセットでスキル習得コストを返還されない設定を追加。
 * スキルがスキルツリーで習得済みか判定するプラグインコマンドを追加。
 * 拡張スキル習得プラグインに対応するための更新。
 * 2025/8/25 Ver.1.0.6
 * アクター、職業から初期スキルポイントを設定した場合に、スキルポイント増減時にエラーが起きる問題を修正。
 * 2025/8/24 Ver.1.0.5
 * 初期スキルポイント、レベルアップ時の獲得スキルポイントの個別設定を職業にも適用。
 * 起点スキルで列指定がないスキルが設定されている場合、一部の他起点スキルが表示されなくなる問題を修正。
 * X座標を強制的に指定の位置に表示させる機能を追加。
 * 2025/8/23 Ver.1.0.4
 * スキル習得後の処理の仕様を変更。(全バージョンとのセーブの互換性なし)
 * プラグインコマンドのスキル習得を実行した際に、習得最大回数を超えて実行できてしまう問題を修正。
 * 派生元のスキルが未習得の場合、線の色を習得条件未達成の色で表示するように修正。
 * 2025/8/18 Ver.1.0.3
 * 消費スキルコストが0の時でもコストを表示する機能を追加。
 * レベルアップ時に獲得SPを表示するように修正。
 * 導入後にスキルポイントを増減させるとエラーが出る問題を修正。
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
 * @arg ActorId
 * @text アクターID
 * @desc 表示するアクターIDを指定します。
 * @type actor
 * @min 0
 * @default 0
 * 
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
 * @arg ReturnSkillTreeCost
 * @desc スキルコストを返還しない。(返還対象外のコストは戻りません)
 * @text スキルコスト返還なし
 * @type boolean
 * @default false
 * 
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
 * @arg Count
 * @text スキル習得回数
 * @desc 指定のスキルの習得回数を指定します。0で最大回数
 * @type number
 * @min 0
 * @default 1
 * 
 * @arg CostCondForced
 * @text コスト、条件無視
 * @desc 習得コスト、習得条件を無視して習得します。
 * @type boolean
 * @default false
 * 
 * @arg Forced
 * @text 前提スキル無視
 * @desc 前提スキルを無視して習得します。(リセット時にはコストは返還されます)
 * @type boolean
 * @default false
 * 
 * @command SkillTreeRemoveSkill
 * @desc スキルツリーで習得済みのスキルを削除します。
 * @text スキル削除
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
 * @arg ReturnSkillTreeCost
 * @desc スキルコストを返還しない。(返還対象外のコストは戻りません)
 * @text スキルコスト返還なし
 * @type boolean
 * @default false
 * 
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
 * @arg ReturnSkillTreeCost
 * @desc スキルコストを返還しない。(返還対象外のコストは戻りません)
 * @text スキルコスト返還なし
 * @type boolean
 * @default false
 * 
 * 
 * @command IsSkillTreeLearnedSkill
 * @desc 指定のスキルがスキルツリーで習得済みか判定し、指定のスイッチに代入します。
 * @text スキル習得済み判定
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
 * @arg SwitchesId
 * @text スイッチ
 * @desc 代入するスイッチIDを指定します。
 * @type switch
 * @default 0
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
 * @default "default"
 * @parent SkillTreeTextSetting
 * 
 * @param SkillTreeTextX
 * @text 文字位置X(相対)
 * @desc 項目(アイコン)のX位置を調整します。
 * @type number
 * @default 0
 * @parent SkillTreeTextSetting
 * 
 * @param SkillTreeContentsWidth
 * @text スキル項目の横幅
 * @desc スキル項目の横幅を設定します。0で自動設定。
 * @type number
 * @default 0
 * @min 0
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
 * @param SkillTreeNumText
 * @text 数値テキスト
 * @desc 数値テキストを設定します。(Javascript)
 * @type combo
 * @option 'count +"/"+ maxCount'
 * @default 
 * @parent SkillTreeTextSetting
 * 
 * @param SkillTreeTextWidth
 * @text 数値文字長
 * @desc 数値テキストの文字長を設定します。例:0が3つで3桁分(000)
 * @type string
 * @default 000
 * @parent SkillTreeTextSetting
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
 * @param ClassChangeResetSkillPoint
 * @desc クラス変更時に表示されなくなるタイプのスキルポイントをリセットします。
 * @text クラス変更時スキルポイントリセット
 * @type boolean
 * @default true
 * @parent ClassSetting
 * 
 * @param IsClassSp
 * @desc クラス毎にスキルポイントを割り当てます。
 * @text クラス別スキルポイント
 * @type boolean
 * @default false
 * @parent ClassSetting
 * 
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
 * @default {"WindowX":"0","WindowY":"134","WindowWidth":"240"}
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
 * @param SkillTreeTypeHelpText
 * @text スキルツリータイプヘルプ
 * @desc デフォルトのヘルプウィンドウのテキストを設定します。
 * @type string
 * @default 
 * @parent SkillTypeSetting
 * 
 * @param SkillTreeWindowSetting
 * @text スキルツリーウィンドウ設定
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param SkillTreeWindow
 * @text スキルツリーウィンドウ設定
 * @desc スキルツリーウィンドウの設定を行います。
 * @default {"WindowX":"240","WindowY":"0","WindowWidth":"576","WindowHeight":"0"}
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
 * @param InnerWidth
 * @text ウィンドウ内幅
 * @desc ウィンドウの内部の横幅を指定します。ウィンドウ以上の幅でスクロールします。0で元の内幅
 * @type number
 * @default 0
 * @min 0
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
 * @default {"WindowX":"0","WindowY":"288","WindowWidth":"240","WindowHeight":"0"}
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
 * @parent SkillTreeCostSetting
 * 
 * @param SkillCostName
 * @text スキルコスト表示名
 * @desc スキルコストの表示名。%1:スキル名
 * @type string
 * @default 習得コスト
 * @parent SkillTreeCostSetting
 * 
 * @param LearnedName
 * @text 習得済み名称
 * @desc 習得済みの表示名。
 * @type string
 * @default 習得済み
 * @parent SkillTreeCostSetting
 * 
 * @param LearningLevelName
 * @text 習得可能レベル名称
 * @desc 習得可能レベルの表示名。
 * @type string
 * @default 習得可能レベル
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
 * @param SkillCostSystemColor
 * @text スキルコスト表示名文字色(code)
 * @desc コストウィンドウのスキルコスト表示名の文字の色を指定します。
 * @type color
 * @default 16
 * @parent SkillTreeCostSetting
 * 
 * @param LearnedNameColor
 * @text 習得済み名称文字色(code)
 * @desc コストウィンドウの習得済み名称の文字の色を指定します。
 * @type color
 * @default 16
 * @parent SkillTreeCostSetting
 * 
 * @param SkillCostNameColor
 * @text コスト名文字色(code)
 * @desc コストウィンドウのコスト名の文字の色を指定します。
 * @type color
 * @default 16
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
 * @param VisibleLearnedSkillCost
 * @desc スキルが回数含め習得済みの場合コストを表示しません。
 * @text 習得済みコスト表示なし
 * @type boolean
 * @default false
 * @parent SkillTreeCostSetting
 * 
 * @param VisibleSkillPointZero
 * @desc スキルポイントのコストが0でもコストウィンドウに表示させます。
 * @text スキルポイントコスト0表示
 * @type boolean
 * @default false
 * @parent SkillTreeCostSetting
 * 
 * @param VisibleLearningLevel
 * @desc 習得可能レベルを表示しません。
 * @text 習得可能レベル表示なし
 * @type boolean
 * @default false
 * @parent SkillTreeCostSetting
 * 
 * @param SkillTreeCostExSetting
 * @text コストウィンドウEx設定
 * @default この設定を行うにはNUUN_SkillTreeExを導入している必要があります。
 * @parent SkillTreeCostSetting
 * 
 * @param ShowPrerequisite
 * @desc 前提スキルを表示します。(要スキルツリー有償版拡張)
 * @text 前提スキル表示
 * @type boolean
 * @default false
 * @parent SkillTreeCostExSetting
 * 
 * @param PrerequisiteSkillsName
 * @text 前提スキル表示名
 * @desc 前提スキルの表示名。
 * @type string
 * @default 前提スキル
 * @parent SkillTreeCostExSetting
 * 
 * 
 * @param SkillTreeStatusSetting
 * @text ステータスウィンドウ設定
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param SkillTreeStatusWindow
 * @text ステータスウィンドウ設定
 * @desc ステータスウィンドウの設定を行います。
 * @default {"WindowX":"0","WindowY":"0","WindowWidth":"240","WindowHeight":"134"}
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
 * @param SkillTreeHelpRows
 * @text スキルツリーヘルプウィンドウ表示行数
 * @desc スキルツリーヘルプウィンドウの表示行数。
 * @type number
 * @default 2
 * @min 0
 * @parent SkillTreeHelpSetting
 * 
 * @param HelpBottomMode
 * @desc ヘルプウィンドウを下側に表示します。
 * @text ヘルプウィンドウ下側表示
 * @type boolean
 * @default false
 * @parent SkillTreeHelpSetting
 * 
 * @param HelpAreaInvalidated
 * @desc ヘルプウィンドウ座標を他ウィンドウへの影響を無効にします。
 * @text ヘルプウィンドウ座標考慮無効
 * @type boolean
 * @default false
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
 * @param ConfirmationWindowCenter
 * @desc 確認ウィンドウを中央に表示します。
 * @text 自動中央表示
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
 * @param LearnSkillIcon
 * @text 習得後スキルアイコン
 * @desc 習得後のスキル項目のアイコン。0でスキルアイコン
 * @type icon
 * @default 0
 * @parent LearnSetting
 * 
 * @param LearnedIconSetting
 * @text 習得済みアイコン設定
 * @default ------------------------------
 * @parent LearnSetting
 * 
 * @param LearnedIcon
 * @text 習得済みのアイコン
 * @desc 習得済みのアイコンを指定します。(スキルの横のアイコンは習得後スキルアイコンで設定)
 * @type icon
 * @default 89
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
 * @option 画像
 * @value image
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
 * @option カギ線(中)
 * @value type3
 * @option なし
 * @value none
 * @default type1
 * @parent LineSetting
 * 
 * @param LineDiagonalWidth
 * @text カギ線長さ
 * @desc カギ線の長さを指定します。
 * @type number
 * @default 30
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
 * @param CountFrameColor
 * @text 再習得可能な枠の色(code)
 * @desc 再習得できるスキル枠の色を指定します。
 * @type color
 * @default 23
 * @min 0
 * @parent FrameSetting
 * 
 * @param ImagsSetting
 * @text 画像設定
 * @default ------------------------------
 * 
 * @param HideFocusCursor
 * @desc フォーカス時にカーソルを非表示にします。
 * @text フォーカス時カーソル非表示
 * @type boolean
 * @default true
 * @parent ImagsSetting
 * 
 * @param SpriteSheetSetting
 * @text スプライトシート設定
 * @default ------------------------------
 * @parent ImagsSetting
 * 
 * @param ContentsBackImage
 * @text コンテンツ背景画像
 * @desc コンテンツ背景のスプライトシート画像
 * @type file
 * @dir img/
 * @default
 * @parent SpriteSheetSetting
 * 
 * @param FocusImageIndex
 * @text フォーカス時インデックス
 * @desc フォーカス時のスプライトシート画像のインデックスを指定します。
 * @type number
 * @default 0
 * @parent SpriteSheetSetting
 * 
 * @param ContentsBackImageCols
 * @text スプライトシート横分割数
 * @desc スプライトシートの横分割数を指定します。
 * @type number
 * @default 4
 * @min 1
 * @parent SpriteSheetSetting
 * 
 * @param ContentsBackImageRows
 * @text スプライトシート縦分割数
 * @desc スプライトシートの縦分割数を指定します。
 * @type number
 * @default 2
 * @min 1
 * @parent SpriteSheetSetting
 * 
 * @param SingleImageSetting
 * @text 単体画像設定
 * @default ------------------------------
 * @parent ImagsSetting
 * 
 * @param ContentsBackSingleImage
 * @text 画像設定
 * @desc コンテンツ背景の画像を設定します。ID1はデフォルトの画像になります。
 * @type file[]
 * @dir img/
 * @default
 * @parent SingleImageSetting
 * 
 * @param FocusImageId
 * @text フォーカス時画像ID
 * @desc フォーカス時の画像設定のIDを指定します。
 * @type number
 * @default 0
 * @parent SingleImageSetting
 * 
 * @param BackgroundSetting
 * @text 背景設定
 * @default ------------------------------
 * @parent ImagsSetting
 * 
 * @param BackgroundImage
 * @text 背景画像
 * @desc 背景画像を指定します。スクロール指定している場合は無効になります。
 * @type file
 * @dir img/
 * @default
 * @parent BackgroundSetting
 * 
 * @param BackUiWidth
 * @text 背景サイズモード
 * @desc 背景サイズをUIに合わせる。スクロール指定している場合は無効になります。
 * @type boolean
 * @default true
 * @parent BackgroundSetting
 * 
 * @param BackScrollX
 * @desc 背景画像の横方向のスクロール速度。正の値は右にスクロールし、負の値は左にスクロールします。
 * @text 横方向スクロール速度
 * @type number
 * @default 0
 * @min -9999
 * @parent BackgroundSetting
 * 
 * @param BackScrollY
 * @desc 背景画像の縦方向のスクロール速度。正の値は下方向にスクロールし、負の値は上方向にスクロールします。
 * @text 縦方向スクロール速度
 * @type number
 * @default 0
 * @min -9999
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
 * @param SkillTreeTypeHelpText
 * @text スキルツリータイプヘルプ
 * @desc ヘルプウィンドウのテキストを設定します。
 * @type string
 * @default 
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
 * @param ForcedPlacement
 * @text 固定列位置有効
 * @desc 指定の列位置に強制的に表示させます。
 * @type boolean
 * @default false
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
 * @type variable
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
 * @param LearningLevel
 * @text 習得可能レベル
 * @desc 習得可能なレベルを指定します。0で制限なし
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
 * @param LearnCondText
 * @text 習得条件のテキスト
 * @desc コストウィンドウに表示させる習得条件のテキスト。制御文字使用可能
 * @type multiline_string
 * @default 
 * @parent LearnSetting
 * 
 * @param LearnSkillIcon
 * @text 習得後スキルアイコン
 * @desc スキルごとの習得後のスキル項目のアイコン。0でデフォルト
 * @type icon
 * @default 0
 * @parent LearnSetting
 * 
 * @param LearnSe
 * @text 習得時の個別SE
 * @desc 習得後にデフォルトのSEではなく、任意のSEを再生します。
 * @type struct<LearnSE>
 * @default {"LearnSE":"","volume":"90","pitch":"100","pan":"0"}
 * @parent LearnSetting
 * 
 * @param LearnCommonEvent
 * @text 習得時のコモンイベント
 * @desc 習得後に任意のコモンイベントを実行します。(要スキルツリー有償版拡張)
 * @type common_event
 * @default 0
 * @parent LearnSetting
 * 
 * @param ImmediateCommonEvent
 * @text 即時コモンイベント発動
 * @desc 即時にコモンイベントを発動させます。一部コマンドは使用できません。
 * @type boolean
 * @default false
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
 * @option カギ線(中)
 * @value type3
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
 * @param FrameImageSettingEx
 * @text 画像設定
 * @default ------------------------------
 * 
 * @param ImageId
 * @text 画像ID
 * @desc 画像設定のIDを指定します。0を指定した場合はデフォルトのIDになります。
 * @type number
 * @default 0
 * @parent FrameImageSettingEx
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
    let _confirmation = false;
    let _setActor = null;

    PluginManager.registerCommand(pluginName, 'ShowSkillTreeWindow', args => {
        SceneManager.push(Scene_SkillTree);
        _setActor = $gameActors.actor(Number(args.ActorId));
    });

    PluginManager.registerCommand(pluginName, 'GainSkillPoint', args => {
        if (Number(args.ActorId) > 0) {
            const actor = $gameActors.actor(Number(args.ActorId));
            actor.gainSkillPoint(Number(args.GainSp));
        }
    });

    PluginManager.registerCommand(pluginName, 'SkillTreeReset', args => {
        if (Number(args.ActorId) > 0) {
            const actor = $gameActors.actor(Number(args.ActorId));
            if (!!args.SkillTreeType) {
                _SkillTreeReset(actor, Number(args.SkillTreeType), !eval(args.ReturnSkillTreeCost));
            } else {
                _SkillTreeResets(actor, !eval(args.ReturnSkillTreeCost));
            }
        }
    });

    PluginManager.registerCommand(pluginName, 'SkillTreeLearnSkill', args => {
        if (Number(args.ActorId) > 0) {
            const actor = $gameActors.actor(Number(args.ActorId));
            actor.skillTreeLearnSkill(Number(args.SkillId), Number(args.Count), eval(args.CostCondForced), eval(args.Forced));
        }
    });

    PluginManager.registerCommand(pluginName, 'SkillTreeRemoveSkill', args => {
        if (Number(args.ActorId) > 0) {
            const actor = $gameActors.actor(Number(args.ActorId));
            actor.skillTreeRemoveSkill(Number(args.SkillId), !eval(args.ReturnSkillTreeCost))
        }
    });

    PluginManager.registerCommand(pluginName, 'AddSkillTreeType', args => {
        if (Number(args.ActorId) > 0) {
            const actor = $gameActors.actor(Number(args.ActorId));
            actor.addSkillTree(args.SkillTreeId);
        }
    });

    PluginManager.registerCommand(pluginName, 'RemoveSkillTreeType', args => {
        if (Number(args.ActorId) > 0) {
            const actor = $gameActors.actor(Number(args.ActorId));
            actor.removeSkillTree(args.SkillTreeId, eval(args.SkillTreeReset), !eval(args.ReturnSkillTreeCost));
        }
    });

    PluginManager.registerCommand(pluginName, 'IsSkillTreeLearnedSkill', args => {
        if (Number(args.ActorId) > 0) {
            const actor = $gameActors.actor(Number(args.ActorId));
            const result = actor.isSkillTreeLearned(Number(args.SkillId));
            $gameSwitches.setValue(Number(args.SwitchesId), result);
        }
    });


    function _getSkillTreeSettingIndex(id) {
        if (isNaN(id)) {
            return params.SkillTreeSetting.findIndex(data => data.SymbolName === id);
        } else {
            return Number(id) - 1;
        }
    };

    function _getSkillTreeSettingSymbolName(symbol) {
        return symbol;
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

    function _isBackgroundImage() {
        return params.SkillFrameType === 'image';
    }

    function _isConfirmation() {
        return _confirmation;
    };

    function _setConfirmation(flag) {
        _confirmation = flag;
    };

    function _SkillTreeReset(actor, type, r) {
        const id = _getSkillTreeSettingIndex(type)
        actor.skillTreeReset(id, r, actor._classId);
    };

    function _SkillTreeResets(actor, r) {
        const list = actor.getAllSkillTreeList();
        for (const id of list) {
            actor.skillTreeReset(id, r, actor._classId);
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
                    list.push([type, data.ClassId]);
                }
            }
        }
        return list;
    };

    function _getSkillTreeData(data, type, actor) {
        return new SkillTreeData(data, type, actor);
    };

    function _returnSkillTreeItem(data) {
        const list = data.item;
        if ($dataItems[list[0]].meta.SkillTreeCostNoReturn) return;
        for (let i = 0; i < list.length; i++) {
            if (!isNaN(list[i])) {
                const item = $dataItems[list[i]];
                $gameParty.gainItem(item, data.itemCost[i]);
            }
        }
    };

    function _returnSkillTreeWeapon(data) {
        const list = data.weapon;
        if ($dataWeapons[list[0]].meta.SkillTreeCostNoReturn) return;
        for (let i = 0; i < list.length; i++) {
            if (!isNaN(list[i])) {
                const item = $dataWeapons[list[i]];
                $gameParty.gainItem(item, data.weaponCost[i]);
            }
        }
    };

    function _returnSkillTreeArmor(data) {
        const list = data.armor;
        if ($dataArmors[list[0]].meta.SkillTreeCostNoReturn) return;
        for (let i = 0; i < list.length; i++) {
            if (!isNaN(list[i])) {
                const item = $dataArmors[list[i]];
                $gameParty.gainItem(item, data.armorCost[i]);
            }
        }
    };

    function _returnSkillTreeVar(data) {
        const list = data.var;
        for (let i = 0; i < list.length; i++) {
            if (!isNaN(list[i])) {
                const value = $gameVariables.value(list[i]);
                $gameVariables.setValue(value - data.varCost[i]);
            }
        }
    };

    NuunManager.getSkillPointParamName = function() {
        return params.SkillPointName;
    };

    NuunManager.getSkillTreeReqSkillList = function(list, skillId) {
        return list.filter(req => {
            if (!!req.DerivedSkill) {
                return req.DerivedSkill.includes(skillId);
            }
            return false;
        });
    };

    NuunManager.getSkillTreeReqSkillListId = function(list, skillId) {
        return this.getSkillTreeReqSkillList(list, skillId).map(t => t.SkillId);
    };

    NuunManager.getSkillTreeData = function(data, type, actor) {
        return new SkillTreeData(data, type, actor);
    };

    NuunManager.getCountLearnSkillData = function(contents, data) {
        return data;
    };

    NuunManager.getLearnSkillIconFormula = function(data, text) {
        return text;
    };


    class SkillTreeData {
        constructor(data, type, actor) {
            this._data = data;
            this._id = data.SkillId;
            this._type = type;
            this._actor = actor;
            this._derivedSkill = data.DerivedSkill || [];
            this._x = data.DerivedSkillX || 0;
            this._y = data.DerivedSkillY || 0;
            this._coordinateX = data.DerivedSkillCoordinateX || 0;
            this._coordinateY = data.DerivedSkillCoordinateY || 0;
            this._iconIndex = 0;
            this._cond = data.SkillTreeCond || "";
            this._secret = data.SkillTreeSecret || "";
            this._learnCond = data.LearnCond || "";
            this._learnCondText = data.LearnCondText || "";
            this._enabled = true;
            this._isPrerequisiteSkill = false;
            this._force = data.ForcedPlacement;
            this._spriteIndex = _isSpriteSheet() ? this.getSkillFrame(data) : 0;
            this._derivedLineType = data.LineType === "none" ? params.LineType : (data.LineType || params.LineType);
            this._derivedLineMode = Array.isArray(data.LineMode) ? data.LineMode : ([data.LineMode] || []);
            this._maxCount = data.MaxCount || 0;
            this._countLearnSkillList = data.CountLearnSkill;
            this._imageId = data.ImageId;
            this._se = !!data.LearnSe && !!data.LearnSe.LearnSE ? data.LearnSe : params.LearnSESetting;
            this._commonEvent = data.LearnCommonEvent || 0;
            this._immediateCommonEvent = data.ImmediateCommonEvent;
            this.setCountLearnSkillData();
            const exLearningData = NuunManager.getCountLearnSkillData(this._countLearnSkillData, data);
            this.setupCost(exLearningData);
            this.setupIcon(exLearningData);
            this.updateCost();
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
            this._learningLevel = data.LearningLevel || 0;
            //this.setCostList();//updateCost()を実行する場合は削除
        }

        updateCost() {
            this._cost = this.getCode(this._costFormula);
            this._costGold = this.getCode(this._costGoldFormula);
            //this._costVariables = this.getCode(this._costVariablesFormulat);
            this._consumeItem = this.getCode(this._consumeItemFormula);
            this._consumeWeapon = this.getCode(this._consumeWeaponFormula);
            this._consumeArmor = this.getCode(this._consumeArmorFormula);
            this._consumeVariables = this.getCode(this._consumeVariablesFormula);
            this.setCostList();
        }

        refresh() {
            this.setCountLearnSkillData();
            const exLearningData = NuunManager.getCountLearnSkillData(this._countLearnSkillData, null);
            if (!!exLearningData) {
                this.setupCost(exLearningData);
            }
            this.setupIcon(exLearningData);
            this.updateCost();
        }

        setupIcon(exData) {
            if (exData && exData.LearnSkillIcon && exData.LearnSkillIcon > 0) {
                this._iconIndex = exData.Count === this._actor.getSkillTreeCount(this._id) ? exData.LearnSkillIcon : this.getDefaultIcon();
            } else {
                this._iconIndex = this.getDefaultIcon();
            }
        }

        getDefaultIcon() {
            return this._data.LearnSkillIcon && this._data.LearnSkillIcon > 0 ? this._data.LearnSkillIcon : (params.LearnSkillIcon || 0);
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
            if (this._learningLevel > 0) {
                list.push("level");
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
                    return this.getVariablesNum();
                case 'level':
                    return this._learningLevel;
            }
        }

        isVisibleCost(type) {
            switch (type) {
                case 'level':
                    return params.VisibleLearningLevel;
                default:
                    return false;
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
                const maxCount = this.getMaxCount() || 1;
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

        getImageId() {
            return this._imageId;
        }

        getX() {
            return this._coordinateX;
        }

        getY() {
            return this._coordinateY;
        }

        isLearnSe() {
            return !!this._se && !!this._se.LearnSE;
        }

        getLearnSe() {
            return this._se;
        }

        getCommonEvent() {
            return this._commonEvent;
        }

        isImmediateCommonEvent() {
            return this._immediateCommonEvent;
        }

        getIconIndex() {
            return NuunManager.getLearnSkillIconFormula(this, this._iconIndex);
        }

        setupPrerequisiteSkill(flag) {
            this._isPrerequisiteSkill = flag;
        }

        getPrerequisiteSkill() {
            return this._isPrerequisiteSkill;
        }

        getLearn() {
            if (!!this._countLearnSkillData && !!this._countLearnSkillData.LearnCond) {
                return this._countLearnSkillData.LearnCond || this._learnCond;
            }
            return this._learnCond;
        }

        getLearnCondText() {
            if (!!this._countLearnSkillData && !!this._countLearnSkillData.LearnCondText) {
                return this._countLearnSkillData.LearnCondText || this._learnCond;
            }
            return this._learnCondText;
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

        getDerivedLineMode(index) {
            return this._derivedLineMode[index] || "auto";
        }

        isForce() {
            return this._force;
        }

        setCountLearnSkillData() {
            this._countLearnSkillData = this.getCountLearnSkillList();
        }

        getCountLearnSkillList() {
            if (!Imported.NUUN_SkillTreeLearnEx) return null;
            const list = NuunManager.getSkillTreeLearnExSetting();
            if (!list) return null;
            for (const data of list) {
                if (this.isLearnExData(data)) {
                    return this.isCountLearnExData(data.SkillLearnExList);
                }
            }
            return null
        }

        isLearnExData(data) {
            const symbol = _getSkillTreeSettingSymbolName(data.TypeId);
            return (!symbol || symbol === this._type) && data.SkillId === this._id;
        }

        isCountLearnExData(list) {
            return list.find(data => data.Count <= this._actor.getSkillTreeCount(this._id));
        }

        getLearnSkill() {
            if (!this._countLearnSkillData || this._countLearnSkillData.LearnSkillId === 0) return this._id;
            return this._countLearnSkillData.LearnSkillId;
        }

        isCostValid() {
            return this._countLearnSkillData && this._countLearnSkillData.CostValid;
        }

        getSkillName(skill) {
            skill = !!skill ? skill : $dataSkills[this.getLearnSkill()];
            return this.isSkillTreeSecretCond() ? skill.name : this.getSecretText(skill);
        }

        getSkillSecretName(skill) {
            skill = !!skill ? skill : $dataSkills[this.getLearnSkill()];
            return this.getSecretText(skill);
        }

        getSecretText(skill) {
            const text = params.SkillTreeSecretText;
            if(text === '？' || text === '?') {
                const name_length = skill.name.length;
                return text.repeat(name_length);
            } else {
                return text;
            }
        }

        getSecretIcon() {
            return params.SecretIcon;
        }

        getRemoveSkill() {
            if (!this._countLearnSkillData || this._countLearnSkillData.RemoveSkillId === 0) return 0;
            return this._countLearnSkillData.RemoveSkillId;
        }

        removeLearnExSkill() {
            if (!this._countLearnSkillList) return;
            for (const data of this._countLearnSkillList) {
                const skill = data.LearnSkillId;
                if (skill > 0 && this._actor.isLearnedSkill(skill) && !this._actor.isSkillTreeLearn(skill)) {
                    this._actor.forgetSkill(skill);
                }
            }
        }

        returnSkillTreeCost(data, classId) {
            if (data.cost > 0) {
                this._actor.gainSkillPoint(data.cost, classId);
            }
            if (!!data.item && data.item[0] > 0) {
                _returnSkillTreeItem(data);
            }
            if (!!data.weapon && data.weapon[0] > 0) {
                _returnSkillTreeWeapon(data);
            }
            if (!!data.armor && data.armor[0] > 0) {
                _returnSkillTreeArmor(data);
            }
            if (data.goldCost > 0) {
                $gameParty.gainGold(data.goldCost);
            }
            if (!!data.var && data.var[0] > 0) {
                _returnSkillTreeVar(data);
            }
        }

        isPaySkillTreeCostOk() {
            if (this.getCost() > 0 && !this.isCanCost(this._actor.nsp)) {
                return false;
            }
            if (this.getCostItem() > 0 && $gameParty.numItems($dataItems[this.getCostItem()]) < this.getItemNum()) {
                return false;
            }
            if (this.getCostWeapon() > 0 && $gameParty.numItems($dataWeapons[this.getCostWeapon()]) < this.getWeaponNum()) {
                return false;
            }
            if (this.getCostArmor() > 0 && $gameParty.numItems($dataArmors[this.getCostArmor()]) < this.getArmorNum()) {
                return false;
            }
            if (this.getCostGold() > 0 && !this.getCanGold($gameParty.gold())) {
                return false;
            }
            if (this.getCostVariables() > 0 && $gameVariables.value(this.getCostVariables()) < this.getVariablesNum()) {
                return false;
            }
            return true;
        }

        isPaySkillTreeSkillPointCostOk() {
            return this.isCanCost(this._actor.nsp);
        }

        isPaySkillTreeItemCostOk() {
            return $gameParty.numItems($dataItems[this.getCostItem()]) >= this.getItemNum();
        }

        isPaySkillTreeWeaponCostOk() {
            return $gameParty.numItems($dataWeapons[this.getCostWeapon()]) >= this.getWeaponNum();
        }

        isPaySkillTreeArmorCostOk() {
            return $gameParty.numItems($dataArmors[this.getCostArmor()]) >= this.getArmorNum();
        }

        isPaySkillTreeGoldCostOk() {
            return this.getCanGold($gameParty.gold());
        }

        isPaySkillTreeVariablesCostOk() {
            return $gameVariables.value(this.getCostVariables()) >= this.getVariablesNum();
        }

        paySkillTreeCost() {
            if (this.getCost() > 0 && this.isCanCost(this._actor.nsp)) {
                this._actor.paySkillTreePoint(this.getCost());
            }
            if (this.getCostItem() > 0 && $gameParty.numItems($dataItems[this.getCostItem()]) >= this.getItemNum()) {
                $gameParty.loseItem($dataItems[this.getCostItem()], this.getItemNum());
            }
            if (this.getCostWeapon() > 0 && $gameParty.numItems($dataWeapons[this.getCostWeapon()]) >= this.getWeaponNum()) {
                $gameParty.loseItem($dataWeapons[this.getCostWeapon()], this.getWeaponNum());
            }
            if (this.getCostArmor() > 0 && $gameParty.numItems($dataArmors[this.getCostArmor()]) >= this.getArmorNum()) {
                $gameParty.loseItem($dataArmors[this.getCostArmor()], this.getArmorNum());
            }
            if (this.getCostGold() > 0 && !this.getCanGold($gameParty.gold())) {
                $gameParty.loseGold(this.getCostGold());
            }
            if (this.getCostVariables() > 0 && $gameVariables.value(this.getCostVariables()) >= this.getVariablesNum()) {
                const value = $gameVariables.value(this.getCostVariables());
                $gameVariables.setValue(value - this.getVariablesNum());
            }
        }

        isSkillTreeCond() {
            const cond = this.getCond();
            if (!cond) return true;
            const d = this;
            const v = $gameVariables._data;
            const s = $gameSwitches._data;
            const skillId = this._id;
            const actor = this._actor;
            const count = actor.getSkillTreeCount(this._id);
            const maxCount = this.getMaxCount() || 1;
            return eval(cond);
        }

        isSkillTreeSecretCond() {
            const cond = this.getSecret();
            if (!cond) return true;
            const d = this;
            const v = $gameVariables._data;
            const s = $gameSwitches._data;
            const skillId = this._id;
            const actor = this._actor;
            const count = actor.getSkillTreeCount(this._id);
            const maxCount = this.getMaxCount() || 1;
            return eval(cond);
        }

        isSkillTreeLearnCond() {
            const cond = this.getLearn();
            if (!cond) return true;
            const d = this;
            const v = $gameVariables._data;
            const s = $gameSwitches._data;
            const skillId = this._id;
            const actor = this._actor;
            const count = actor.getSkillTreeCount(this._id);
            const maxCount = this.getMaxCount() || 1;
            return eval(cond);
        };

        isLearningLevel() {
            return this._actor._level >= this._learningLevel;
        }

        getLearningLevel() {
            return this._learningLevel;
        }

    }

    window.SkillTreeData = SkillTreeData;


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
        this.setupActor();
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
        this._helpWindow = new Window_SkillTreeHelp(rect);
        this.addWindow(this._helpWindow);
        this._skillTreeWindow.setHelpWindow(this._helpWindow);
        this._skillTreeType.setHelpWindow(this._helpWindow);
        if (params.HelpWindowTransparent) {
            this._helpWindow.opacity = 0;
        }
    };

    Scene_SkillTree.prototype.createSkillTreeConfirmationWindow = function() {
        _setConfirmation(params.LearnConfirmation);
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

    Scene_SkillTree.prototype.getSkillTreeBackgroundImage = function() {
        return params.BackgroundImage;
    };

    Scene_SkillTree.prototype.createBackground = function() {
        Scene_MenuBase.prototype.createBackground.call(this);
        const image = this.getSkillTreeBackgroundImage();
        if (image) {
            const sprite = new Sprite_BackgroundSprite(image);
            sprite.setup(image, params.BackScrollX, params.BackScrollY);
            const bitmap = ImageManager.nuun_LoadPictures(image);
            sprite.setBitmap(bitmap);
            this.addChild(sprite);
            bitmap.addLoadListener(function() {
                this.setBackGround(sprite);
            }.bind(this));
        }
    };

    Scene_SkillTree.prototype.setBackGround = function(sprite) {
        if (sprite.isScroll()) {
            return;
        }
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
        const wy = (w.WindowY || 0) + this.mainAreaTop();
        const wh = this.calcWindowHeight(params.SkillTypeRows, true);
        const wx = (w.WindowX || 0);
        const ww = Math.min(Graphics.boxWidth - wx, w.WindowWidth > 0 ? w.WindowWidth : Graphics.boxWidth);
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_SkillTree.prototype.skillTreeWindowRect = function() {
        const w = _getWindowData("SkillTreeWindow");
        const wy = (w.WindowY || 0) + this.mainAreaTop();
        const wx = (w.WindowX || 0);
        const ww = Math.min(Graphics.boxWidth - wx, w.WindowWidth > 0 ? w.WindowWidth : Graphics.boxWidth);
        const wh = Math.min(Graphics.boxHeight - wy - this.helpAreaBottomY(), (w.WindowHeight > 0 ? w.WindowHeight : Graphics.boxHeight));
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_SkillTree.prototype.skillTreeCostWindowRect = function() {
        const w = _getWindowData("SkillTreeCostWindow");
        const wy = (w.WindowY || 0) + this.mainAreaTop();
        const wx = (w.WindowX || 0);
        const ww = Math.min(Graphics.boxWidth - wx, w.WindowWidth > 0 ? w.WindowWidth : Graphics.boxWidth);
        const wh = Math.min(Graphics.boxHeight - wy - this.helpAreaBottomY(), (w.WindowHeight > 0 ? w.WindowHeight : Graphics.boxHeight));
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_SkillTree.prototype.skillTreeStatusWindowRect = function() {
        const w = _getWindowData("SkillTreeStatusWindow");
        const wy = (w.WindowY || 0) + this.mainAreaTop();
        const wx = (w.WindowX || 0);
        const ww = Math.min(Graphics.boxWidth - wx, w.WindowWidth > 0 ? w.WindowWidth : Graphics.boxWidth);
        const wh = Math.min(Graphics.boxHeight - wy - this.helpAreaBottomY(), (w.WindowHeight > 0 ? w.WindowHeight : Graphics.boxHeight));
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_SkillTree.prototype.skillTreeHelpWindowRect = function() {
        const w = _getWindowData("SkillTreeHelpWindow");
        const wy = (w.WindowY || 0) + this.helpAreaTop();
        const wh = Math.min(Graphics.boxHeight - wy, (w.WindowHeight > 0 ? w.WindowHeight : this.skillTreeHelpAreaHeight()));
        const wx = (w.WindowX || 0);
        const ww = Math.min(Graphics.boxWidth - wx, w.WindowWidth > 0 ? w.WindowWidth : Graphics.boxWidth);
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_SkillTree.prototype.skillTreeConfirmationWindowRect = function() {
        const w = _getWindowData("SkillTreeConfirmationWindow");
        const wy = (w.WindowY || 0) + this.mainAreaTop();
        const wh = this.calcWindowHeight(3, true);
        const ww = w.WindowWidth > 0 ? w.WindowWidth : Graphics.boxWidth;
        const wx = params.ConfirmationWindowCenter ? Math.floor(Graphics.boxWidth / 2) - Math.floor(ww / 2) : (w.WindowX || 0);
        return new Rectangle(wx, wy, Math.min(Graphics.boxWidth - wx, ww), wh);
    };

    Scene_SkillTree.prototype.helpAreaBottomY = function() {
        return this.isBottomHelpMode() ? this.helpAreaHeight() : 0;
    };

    Scene_SkillTree.prototype.helpAreaHeight = function() {
        return params.HelpAreaInvalidated ? 0 : this.skillTreeHelpAreaHeight();
    };

    Scene_SkillTree.prototype.skillTreeHelpAreaHeight = function() {
        return params.SkillTreeHelpRows > 0 ? this.calcWindowHeight(params.SkillTreeHelpRows, false) : Scene_MenuBase.prototype.helpAreaHeight.apply(this, arguments);
    };

    Scene_SkillTree.prototype.isBottomHelpMode = function() {
        return params.HelpBottomMode;
    };

    Scene_SkillTree.prototype.setupActor = function() {
        if (!!_setActor) {
            this._actor = _setActor;
            _setActor = null
        }
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
        this._skillTreeWindow.select(this._skillTreeWindow.initSkillTreeCursorIndex());
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
        this._skillTreeCostWindow.setData(null);
        this._skillTreeWindow.setHelpWindowItem(null);
        this._skillTreeType.updateHelp();
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

    Scene_SkillTree.prototype.arePageButtonsEnabled = function() {
        return !!this._skillTreeType && this._skillTreeType.active;
    };


    function Window_SkillTreeHelp() {
        this.initialize(...arguments);
    }

    Window_SkillTreeHelp.prototype = Object.create(Window_Help.prototype);
    Window_SkillTreeHelp.prototype.constructor = Window_SkillTreeHelp;

    Window_SkillTreeHelp.prototype.initialize = function(rect) {
        Window_Help.prototype.initialize.call(this, rect);
    };

    Window_SkillTreeHelp.prototype.setItem = function(item) {
        if (item && item.meta && item.meta.SkillTreeSkillText) {
            this.setText(item.meta.SkillTreeSkillText);
        } else {
            Window_Help.prototype.setItem.call(this, item);
        }
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

    Window_SkillTreeType.prototype.updateHelp = function() {
        Window_Selectable.prototype.updateHelp.call(this);
        this.setHelpWindowItem({description: this.getHelpText()});
    };

    Window_SkillTreeType.prototype.getHelpText = function() {
        const data = params.SkillTreeSetting[this.currentExt()];
        if (!data) {
            return params.SkillTreeTypeHelpText;
        } else {
            return data.SkillTreeTypeHelpText ? data.SkillTreeTypeHelpText : params.SkillTreeTypeHelpText;
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
        this.setHelpWindowItem({description: this.getHelpText()});
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
        this._learnOk = true;
        Window_Selectable.prototype.initialize.call(this, rect);
        this.setSkillTreeLineSprite();
    };

    Window_SkillTree.prototype.contentsSkillTreeLine = function() {
        const sprite = new Sprite();
        this._contentsBackSprite.addChild(sprite);
        const width = this.contentsWidth();
        const height = this.contentsHeight();
        sprite.bitmap = new Bitmap(width, height);
        return sprite;
    };

    Window_SkillTree.prototype.loadSkillTreeImages = function() {
        if (_isSpriteSheet()) {
            return ImageManager.nuun_LoadPictures(params.ContentsBackImage);
        } else if (_isBackgroundImage()) {
            return this.loadSkillTreeImages2();
        }
        return null;
    };

    Window_SkillTree.prototype.loadSkillTreeImages2 = function() {
        const parameter = params.ContentsBackSingleImage;
        if (!parameter) return;
        const imageList = [];
        for (let i = 0; i < parameter.length; i++) {
            imageList[i] = ImageManager.nuun_LoadPictures(parameter[i]);
        }
        return imageList;
    };

    Window_SkillTree.prototype.setSkillTreeLineSprite = function() {
        this._contentsSkillTreeLine = this.contentsSkillTreeLine();
        this._contentsSkillTreeUnlearnedLine = this.contentsSkillTreeLine();
        this._contentsSkillTreeLearningLine = this.contentsSkillTreeLine();
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

    Window_SkillTree.prototype.initSkillTreeCursorIndex = function() {
        return 0;
    };

    Window_SkillTree.prototype.update = function() {
        Window_Selectable.prototype.update.apply(this, arguments);
    };

    Window_SkillTree.prototype.callUpdateHelp = function() {
        Window_Selectable.prototype.callUpdateHelp.apply(this, arguments);
        if (this.active) {
            this.updateSkillTreeWindow();
        }
    };

    Window_SkillTree.prototype.updateSkillTreeWindow = function() {
        if (this._skillTreeCostWindow) {
            this.updateCostWindow();
        }
        if (this._skillTreeTooltipsWindow) {
            this.updateLearnWindow();
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
        return data && data._id > 0 && data.isEnabled() ? $dataSkills[data._id] : null;
    };

    Window_SkillTree.prototype.colsMargin = function() {
        return params.ColsMargin;
    };

    Window_SkillTree.prototype.rowsMargin = function() {
        return params.RowsMargin;
    };

    Window_SkillTree.prototype.itemWidth = function() {
        return params.SkillTreeContentsWidth > 0 ? (params.SkillTreeContentsWidth + this.colsMargin() + this.itemPadding()) : Math.floor(this.skillTreeInnerWidth() / this.maxCols()) + Math.floor(this.colsMargin() / this.maxCols());
    };

    Window_SkillTree.prototype.itemHeight = function() {
        return Window_Selectable.prototype.itemHeight.call(this) + this.rowsMargin();
    };

    Window_SkillTree.prototype.overallWidth = function() {
        return (this.maxCols() * this.itemWidth()) - this.colsMargin();
    };

    Window_SkillTree.prototype.overallHeight = function() {
        return Window_Selectable.prototype.overallHeight.apply(this, arguments) - this.rowsMargin();
    };

    Window_SkillTree.prototype.skillTreeItemHeight = function() {
        return params.SkillTreeContentsWidth;
    };

    Window_SkillTree.prototype.skillTreeInnerWidth = function() {
        return (params.InnerWidth > 0 ? Math.max(params.InnerWidth, this.innerWidth) : this.innerWidth);
    };

    Window_SkillTree.prototype.skillTreeCol = function() {
        return this.index() % this.maxCols();
    };

    Window_SkillTree.prototype.itemRect = function(index) {
        const rect = Window_Selectable.prototype.itemRect.apply(this, arguments);
        rect.width -= this.colsMargin();
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
            this.drawSkillTreeSpriteSheet(id, rect);
        } else if (_isBackgroundImage()) {
            this.drawSkillTreeImage(index, params);
        }
    };

    Window_SkillTree.prototype.drawSkillTreeSpriteSheet = function(index, rect) {
        const bitmap = this._skillTreeImages;
        const pw = rect.width;
        const ph = rect.height;
        const w = Math.floor(bitmap.width / params.ContentsBackImageCols);
        const h = Math.floor(bitmap.height / params.ContentsBackImageRows);
        const sx = (index % params.ContentsBackImageCols) * w;
        const sy = Math.floor(index / params.ContentsBackImageCols) * h;
        this.contentsBack.blt(bitmap, sx, sy, w, h, rect.x, rect.y, pw, ph);
    };

    Window_SkillTree.prototype.drawSkillTreeImage = function(index) {
        const data = this.itemAt(index);
        const rect = this.itemRect(index);
        const bitmap = this.getSkillTreeContentsImage(index, data);
        const w = bitmap.width;
        const h = bitmap.height;
        this.contentsBack.blt(bitmap, 0, 0, w, h, rect.x, rect.y, rect.width, rect.height);
    };

    Window_SkillTree.prototype.getSkillTreeContentsImage = function(index, data) {
        if (index === this.index()) {
            return this._skillTreeImages[this.getFocusImageId()];
        } else if (data.getImageId() > 0) {
            return this._skillTreeImages[data.getImageId() - 1];
        } else {
            return this._skillTreeImages[0];
        }
    };

    Window_SkillTree.prototype.getFocusImageId = function() {
        return Math.max(params.FocusImageId - 1, 0);
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

    Window_SkillTree.prototype.getSkillTreeSetting = function() {
        return params.SkillTreeSetting || [];
    };

    Window_SkillTree.prototype.getSkillTreeList = function() {
        const treeData = this.getSkillTreeSetting()[this._skillTreeId];
        if (!treeData) return null;
        const list = treeData.SkillTreeList;
        if (!list) return null;
        return list;
    };

    Window_SkillTree.prototype.skillTreeMaxCols = function() {
        return this.maxCols();
    };

    Window_SkillTree.prototype.makeSkillTreeList = function() {
        const tree = [];
        const list = this.getSkillTreeList();
        if (!list) return [];
        const initList = this.initialSkillTreeList();
        let nextList = [];
        nextList[0] = [];
        let treeList = this.startSkillTreeList(initList, nextList);
        const maxCols = this.skillTreeMaxCols();
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
                                if (dt.isForce() && dt._x > 0) {
                                    x = dt._x - 1;
                                    break;
                                } else {
                                    x = dt._x > 0 ? Math.max(colsCount, dt._x - 1) : colsCount;
                                }
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
                                colsCount = Math.max(x + 1, colsCount + (dt.isForce() && dt._x > 0 ? 0 : 1));
                            } else {
                                const index = this.checkDeduplicationIndex(nextList[0], skillId);
                                if (index < 0) {
                                    nextList[0][x] = this.isSkillTreeCond(dt) ? dt : "null";
                                    colsCount = Math.max(x + 1, colsCount + (dt.isForce() && dt._x > 0 ? 0 : 1));
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
            let x = 0;
            if (data.isForce() && data._x > 0) {
                x = data._x - 1;
            } else {
                x = data._x > 0 ? data._x - 1 : (count[y] || 0);
            }
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
                count[y] = (count[y] || 0) + 1;
            }
        }
        return tree;
    };

    Window_SkillTree.prototype.initialSkillTreeList = function() {
        const list = this.getSkillTreeSetting()[this._skillTreeId].SkillTreeList;
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
        return data.isSkillTreeCond();
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
        this.getSkillTreeLineClear();
        const list = this._data;
        const length = list.length;
        for (let i = 0; i < length; i++) {
            const data = list[i];
            if (!!data) {
                //const rect = this.itemLineRect(i);
                const rect = this.itemRect(i);
                this.drawDerivedSkillTreeLine(data, rect);
            }
        }
    };

    Window_SkillTree.prototype.drawItem = function(index) {
        const data = this.itemAt(index);
        if (data) {
            const rect = this.itemLineRect(index);
            const skillId = data.getLearnSkill();
            const skill = $dataSkills[skillId];
            const enabled = this.isEnabled(data);
            const learned = this._actor.isSkillTreeLearned(data._id);
            const secret = data.isSkillTreeSecretCond();
            this.changePaintOpacity(enabled);
            this._learnedSkillColor = this.getSkillTreeLearnedColor(learned);
            if (!enabled && !secret) {
                this.drawSkillTreeSecretText(data, skill, rect);
            } else {
                this.drawSkillTreeText(data, skill, rect, learned);    
            }
            if (secret) {
                this.drawItemNumber(data, rect.x, rect.y, rect.width);
            }
            this.drawSkillTreeContentsFrame(index, data, learned, enabled);
            this.learnedDrawIcon(data, learned, rect);
            this.drawSkillCount(data, learned, rect);
            this.changePaintOpacity(1);
        }
    };

    Window_SkillTree.prototype.drawSkillTreeText = function(data, skill, rect, learned) {
        const x = rect.x + (params.SkillTreeTextX || 0);
        const w = rect.width - (this.numberWidth() + (params.SkillTreeTextX || 0));
        switch (params.SkillTreeTextType) {
            case "icon":
                const iconY = rect.y + (this.lineHeight() - ImageManager.iconHeight) / 2;
                this.setExSkillIcon(learned, data, skill);
                this.drawIcon(skill.iconIndex, x, iconY);
                break;
            case "default":
                this.setExSkillIcon(learned, data, skill);
                this.drawItemName(skill, x, rect.y, w);
                break;
            case "name":
                this.drawText(skill.name, x, rect.y, w);
                break;
        }
    };

    Window_SkillTree.prototype.drawSkillTreeSecretText = function(data, skill, rect) {
        const x = rect.x + (params.SkillTreeTextX || 0);
        const w = rect.width - (this.numberWidth() + (params.SkillTreeTextX || 0));
        if (params.SkillTreeTextType === "icon") {
                const iconY = x + (this.lineHeight() - ImageManager.iconHeight) / 2;
                this.drawIcon(data.getSecretIcon(), rect.x, iconY);
            } else {
                this.drawText(data.getSkillSecretName(skill), x, rect.y, w);
            }
            data.enabled();
    };

    Window_SkillTree.prototype.getSkillIcon = function(data, skill) {
        const index = data.getIconIndex();
        return index > 0 ? index : skill.iconIndex;
    };

    Window_SkillTree.prototype.setExSkillIcon = function(learned, data, skill) {
        this._exSkillIcon = learned ? this.getSkillIcon(data, skill) : skill.iconIndex;
    };

    Window_SkillTree.prototype.drawIcon = function(iconIndex, x, y) {
        if (this._exSkillIcon > 0) {
            iconIndex = this._exSkillIcon;
            this._exSkillIcon = 0;
        }
        Window_Base.prototype.drawIcon.apply(this, arguments);
    };

    Window_SkillTree.prototype.drawItemNumber = function(data, x, y, width, align = "right") {
        if (params.SkillTreeNumText) {
            const actor = this._actor;
            const count = actor.getSkillTreeCount(data._id);
            const maxCount = data.getMaxCount() || 1;
            const skillId = data._id;
            const d = data;
            const v = $gameVariables._data;
            const s = $gameSwitches._data;
            const itemWidth = this.numberWidth() - this.itemPadding();
            this.drawText(eval(params.SkillTreeNumText), x + (width - itemWidth), y, itemWidth, align);
        }
    };

    Window_SkillTree.prototype.drawSkillTreeContentsFrame = function(index, data, learned, enabled) {
        if (!this.isSkillTreeFrame()) return;
        const rect = this.itemRect(index);
        const width = params.FrameWidth > 0 ? Math.min(params.FrameWidth, rect.width) : rect.width;
        const height = rect.height;
        const x = rect.x + params.FrameX;
        const y = rect.y;
        const color = this.getFrameColor(data, learned, enabled);
        const thick = (params.FrameThick || 3);
        this.drawSkillTreeFrame(x, y, width, height, thick, color);
    };

    Window_SkillTree.prototype.drawSkillCount = function(data, learned, rect) {
        if (!this.isSkillTreeSkillCount() || data.getMaxCount() <= 1 || !learned) return;
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

    Window_SkillTree.prototype.getFrameColor = function(data, learned, enabled) {
        if (learned) {
            return this.isMultipleCount(data) ? NuunManager.getColorCode(params.LearnedFrameColor) : NuunManager.getColorCode(params.CountFrameColor);
        } else if (enabled) {
            return NuunManager.getColorCode(params.UnlearnedFrameColor);
        } else {
            return NuunManager.getColorCode(params.NormalFrameColor);
        }
    };

    Window_SkillTree.prototype.getLineColor = function(derivedLearned, enabled, learned) {
        if (derivedLearned && learned) {
            return NuunManager.getColorCode(params.LearnedLineColor);
        } else if (derivedLearned && !learned) {
            return NuunManager.getColorCode(params.NormalLineColor);
        } else if (enabled) {
            return NuunManager.getColorCode(params.UnlearnedLineColor);
        } else {
            return NuunManager.getColorCode(params.NormalLineColor);
        }
    };

    Window_SkillTree.prototype.getSkillTreeLineContents = function(derivedLearned, enabled, learned) {
        if (derivedLearned && learned) {
             return this._contentsSkillTreeLearningLine.bitmap;
        } else if (derivedLearned && !learned) {
            return this._contentsSkillTreeLine.bitmap;
        } else if (enabled) {
            return this._contentsSkillTreeUnlearnedLine.bitmap;
        } else {
            return this._contentsSkillTreeLine.bitmap;
        }
    };

    Window_SkillTree.prototype.getSkillTreeLineClear = function() {
        if (this._contentsSkillTreeLine) {
            this._contentsSkillTreeLine.bitmap.clear();
        }
        if (this._contentsSkillTreeUnlearnedLine) {
            this._contentsSkillTreeUnlearnedLine.bitmap.clear();
        }
        if (this._contentsSkillTreeLearningLine) {
            this._contentsSkillTreeLearningLine.bitmap.clear();
        }
    };

    Window_SkillTree.prototype.drawDerivedSkillTreeLine = function(data, rect) {
        if (data && !data.isDerivedSkill()) return;
        const x = this.getLineX(rect);
        const y = this.getLineY(rect);
        for (let i = 0; i < data._derivedSkill.length; i++) {
            const skillId = data._derivedSkill[i];
            const index = this.getSkillTreeDataIndex(skillId);
            const derivedData = this._data[index];
            const learned = this._actor.isSkillTreeLearned(data._id);
            if (!!derivedData && this.isSkillTreeCond(derivedData)) {
                const enabled = this.isEnabled(derivedData);
                const derivedLearned = this._actor.isSkillTreeLearned(derivedData._id);
                const colorId = this.getLineColor(derivedLearned, enabled, learned);
                const bitmapContents = this.getSkillTreeLineContents(derivedLearned, enabled, learned);
                const derivedRect = this.itemRect(index);
                const color = NuunManager.getColorCode(colorId);
                const x2 = this.getDerivedX(derivedRect);
                const y2 = this.getDerivedY(derivedRect);
                if (Imported.NUUN_SkillTreeFreeArrangement) {
                    this.drawSkillTreeFreeArrangementLine(bitmapContents, data.getDerivedLineMode(i), x, y, x2, y2,derivedRect.width, derivedRect.height, params.LineThick, color);
                } else {
                    switch (data.getDerivedLineType()) {
                        case "straight":
                            this.drawSkillTreeStraightLine(bitmapContents, x, y, x2, y2, params.LineThick, color);
                            break;
                        case "type1":
                            this.drawSkillTreeType1Line(bitmapContents, x, y, x2, y2, params.LineThick, color);
                            break;
                        case "type2":
                            this.drawSkillTreeType2Line(bitmapContents, x, y, x2, y2, params.LineThick, color);
                            break;
                        case "type3":
                            this.drawSkillTreeType3Line(bitmapContents, x, y, x2, y2, params.LineThick, color);
                            break;
                        case "type4":
                            this.drawSkillTreeType4Line(bitmapContents, x, y, x2, y2, params.LineThick, color);
                            break;
                        case "type7":
                            this.drawSkillTreeType7Line(bitmapContents, x, y, x2, y2, params.LineThick, color);
                            break;
                    }
                }
                
            } 
        }
    };

    Window_SkillTree.prototype.drawSkillTreeStraightLine = function(contents, x1, y1, x2, y2, thick, color) {
        const context = contents._context;
        context.strokeStyle = color;
        context.lineWidth = thick;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
    };

    Window_SkillTree.prototype.drawSkillTreeType1Line = function(contents, x1, y1, x2, y2, thick, color) {
        const context = contents._context;
        context.strokeStyle = color;
        context.lineWidth = thick;
        const height = this.rowsMarginHeight();
        const diagonal = Math.floor(height / 2) * this.getDirection(x1, x2);
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x1, y2 - height);
        context.lineTo(x1 + diagonal, y2 - Math.floor(height / 2));
        context.lineTo(x2 - diagonal, y2 - Math.floor(height / 2));
        context.lineTo(x2, y2);
        context.stroke();
    };

    Window_SkillTree.prototype.drawSkillTreeType2Line = function(contents, x1, y1, x2, y2, thick, color) {
        const context = contents._context;
        context.strokeStyle = color;
        context.lineWidth = thick;
        const height = this.rowsMarginHeight();
        const diagonal = Math.floor(height / 2) * this.getDirection(x1, x2);
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x1 + diagonal, y1 + Math.floor(height / 2));
        context.lineTo(x2 - diagonal, y1 + Math.floor(height / 2));
        context.lineTo(x2, y1 + height);
        context.lineTo(x2, y2);
        context.stroke();
    };

    Window_SkillTree.prototype.drawSkillTreeType3Line = function(contents, x1, y1, x2, y2, thick, color) {//EX
        const context = contents._context;
        context.strokeStyle = color;
        context.lineWidth = thick;
        const height = this.rowsMarginHeight();
        const diagonal = Math.floor(height / 2) * this.getDirection(x1, x2);
        const diagonal_h = Math.floor(y2 - y1) / 2;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x1, y1 + diagonal_h - Math.floor(height / 2));
        context.lineTo(x1 + diagonal, y1 + diagonal_h);
        context.lineTo(x2 - diagonal, y1 + diagonal_h);
        context.lineTo(x2, y1 + diagonal_h + Math.floor(height / 2));
        context.lineTo(x2, y2);
        context.stroke();
    };

    Window_SkillTree.prototype.drawSkillTreeType4Line = function(contents, x1, y1, x2, y2, thick, color) {//EX
        const context = contents._context;
        context.strokeStyle = color;
        context.lineWidth = thick;
        const height = this.rowsMarginHeight();
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x1, y2 - Math.floor(height / 2));
        context.lineTo(x2, y2 - Math.floor(height / 2));
        context.lineTo(x2, y2);
        context.stroke();
    };

    Window_SkillTree.prototype.drawSkillTreeType7Line = function(contents, x1, y1, x2, y2, thick, color) {//EX
        const context = contents._context;
        context.strokeStyle = color;
        context.lineWidth = thick;
        const height = this.rowsMarginHeight();
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x1, y1 + Math.floor(height / 3));
        context.lineTo(x2, y2 - Math.floor(height / 3));
        context.lineTo(x2, y2);
        context.stroke();
    };

    Window_SkillTree.prototype.rowsMarginHeight = function() {
        return Math.min((params.LineDiagonalWidth || 30), this.rowsMargin() + this.rowSpacing());
    };

    Window_SkillTree.prototype.getLineX = function(rect) {
        return rect.x + (rect.width / 2);
    };

    Window_SkillTree.prototype.getLineY = function(rect) {
        return rect.y + rect.height;
    };

    Window_SkillTree.prototype.getDerivedX = function(rect) {
        return rect.x + (rect.width / 2);
    };

    Window_SkillTree.prototype.getDerivedY = function(rect) {
        return rect.y;
    };

    Window_SkillTree.prototype.drawCountBackgroundRect = function(x, y ,w, h) {
        const c1 = ColorManager.itemBackColor1();
        const c2 = ColorManager.itemBackColor2();
        this.contents.gradientFillRect(x, y, w, h, c1, c2, true);
        this.contents.strokeRect(x, y, w, h, c1);
    };

    Window_SkillTree.prototype.getLearnedIcon = function(data) {
        return params.LearnedIcon || 0;
    };

    Window_SkillTree.prototype.learnedDrawIcon = function(data, enabled, rect) {
        const iconId = this.getLearnedIcon(data);
        if (iconId && iconId > 0 && enabled) {
            const iconY = rect.y + (this.lineHeight() - ImageManager.iconHeight) / 2;
            const delta = ImageManager.standardIconWidth - ImageManager.iconWidth;
            const x = rect.x + rect.width + params.LearnedIconX + delta;
            const y = params.LearnedIconY + iconY;
            this.drawLearnedIcon(iconId, x, y);
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

    Window_SkillTree.prototype.numberWidth = function() {
        return params.SkillTreeNumText ? this.textWidth(params.SkillTreeTextWidth) : 0;
    };

    Window_SkillTree.prototype.isEnabled = function(data) {
        return !!data && this.isMultipleCount(data) || !!data && this.isPrerequisiteSkill(data) && data.isPaySkillTreeCostOk() && this.isSkillTreeEvalCond(data);
    };

    Window_SkillTree.prototype.isSkillTreeEvalCond = function(data) {
        return data.isSkillTreeSecretCond() && data.isSkillTreeLearnCond() && data.isLearningLevel();
    };

    Window_SkillTree.prototype.isCurrentItemEnabled = function() {
        return this.isEnabled(this._data[this.index()]);
    };

    Window_SkillTree.prototype.isLearnEnabled = function() {
        return this._learnOk;
    };

    Window_SkillTree.prototype.setIsPrerequisitSkill = function(data) {
        const list = this.getSkillTreeList();
        if (!list) return [];
        data.setupPrerequisiteSkill(this._actor.isSkillTreeReqSkill(list, data._id));
    };

    Window_SkillTree.prototype.isPrerequisiteSkill = function(data) {
        this.setIsPrerequisitSkill(data);
        return data.getPrerequisiteSkill();
    };

    Window_SkillTree.prototype.isMultipleCount = function(data) {
        if (data.getMaxCount() === 0) return this._actor.isSkillTreeLearned(data._id);
        return this._actor.isMultipleCount(data._id, data.getMaxCount());
    };

    Window_SkillTree.prototype.isSkillTreeSkillCount = function() {
        return params.ShowSkillCountFrame;
    };

    Window_SkillTree.prototype.learnSkillTree = function() {
        const data = this.itemAt(this.index());
        _setConfirmation(params.LearnConfirmation);
        data.paySkillTreeCost();
        this._actor.learnSkillTreeSkill(data);
        this.refresh();
        this._skillTreeStatusWindow.refresh();
        this._skillTreeCostWindow.refresh();
        this.skillTreeLearnCommonEvent(data);
    };

    Window_SkillTree.prototype.playOkSound = function() {
        if (!this.isProcessLearnOk()) {
            return;
        }
        const _se = this.playSoundLearnSE();
        if (!!_se) {
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
        Window_Base.prototype.resetTextColor.apply(this, arguments);
        if (this._learnedSkillColor) {
            this.changeTextColor(this._learnedSkillColor);
            this._learnedSkillColor = null;
        }
    };

    Window_SkillTree.prototype.isConfirmationActive = function() {
        return _isConfirmation();
    };

    Window_SkillTree.prototype.isSkillTreeContentsImage = function() {
        return !!_isSpriteSheet() || !!_isBackgroundImage();
    };

    Window_SkillTree.prototype.isSkillTreeBackgroundImage = function() {
        return !!_isBackgroundImage();
    };

    Window_SkillTree.prototype.setSkillTreeCostWindow = function(costWindow) {
        this._skillTreeCostWindow = costWindow;
        costWindow._skillTreeWindow = this;
    };

    Window_SkillTree.prototype.setSkillTreeStatusWindow = function(skillTreeWindow) {
        this._skillTreeStatusWindow = skillTreeWindow;
    };

    Window_SkillTree.prototype.setSkillTreeConfirmationWindow = function(skillTreeWindow) {
        this._skillTreeConfirmationWindow = skillTreeWindow;
    };

    Window_SkillTree.prototype.ensureCursorVisible = function(smooth) {
        if (params.InnerWidth > 0) {
            if (this._cursorAll) {
                this.scrollTo(0, 0);
            } else {
                const scrollX = this.scrollX();
                const scrollY = this.scrollY();
                let itemTop = 0;
                let itemBottom = 0;
                let scrollMin = 0;
                let itemLeft = 0;
                let itemRight = 0;
                let scrollMin2 = 0;
                if (this.innerHeight > 0 && this.row() >= 0) {
                    itemTop = this.row() * this.itemHeight();
                    itemBottom = itemTop + this.itemHeight();
                    scrollMin = itemBottom - this.innerHeight;
                }
                if (this.innerWidth > 0 && this.skillTreeCol() >= 0) {
                    itemLeft = this.skillTreeCol() * this.itemWidth();
                    itemRight = itemLeft + this.itemWidth();
                    scrollMin2 = itemRight - this.innerWidth;
                }
                if (scrollY > itemTop) {
                    this.setEnsureCursor(smooth, scrollX, itemTop);
                } else if (scrollY < Math.min(this.maxScrollY(), scrollMin)) {
                    this.setEnsureCursor(smooth, scrollX, scrollMin);
                } else if (scrollX > itemLeft) {
                    this.setEnsureCursor(smooth, itemLeft, scrollY);
                } else if (scrollX < scrollMin2) {
                    this.setEnsureCursor(smooth, scrollMin2, scrollY);
                }
            }
        } else {
            Window_Selectable.prototype.ensureCursorVisible.apply(this, arguments);
        }
    };

    Window_SkillTree.prototype.setEnsureCursor = function(smooth, x, y) {
        if (smooth) {
            this.smoothScrollTo(x, y);
        } else {
            this.scrollTo(x, y);
        }
    };

    Window_SkillTree.prototype.contentsWidth = function() {
        return this.innerWidth + this.itemWidth();
    };

    Window_SkillTree.prototype.getSkillTreeSkillCostColor = function() {
        return params.SkillCosTColor;
    };

    Window_SkillTree.prototype.getSkillTreeSkillCostType = function() {
        return params.SkillCostType;
    };

    Window_SkillTree.prototype.getSkillTreeLearnedColor = function(learned) {
        return learned && params.LearnedColor >= 0 ? NuunManager.getColorCode(params.LearnedColor) : null;
    };

    Window_SkillTree.prototype.playSoundLearnSE = function() {
        const data = this.itemAt(this.index());
        if (!!data.isLearnSe()) {
            return data.getLearnSe();
        } else {
            return null;
        }
    };

    Window_SkillTree.prototype.skillTreeLearnCommonEvent = function(data) {
        
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
        this._list = null;
        this._heightRows = 0;
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

    Window_SkillTreeCost.prototype.showCostList = function(data) {
        return data.getCostList().filter(type => !data.isVisibleCost(type));
    };

    Window_SkillTreeCost.prototype.itemAt = function(index) {
        return this._data && index >= 0 ? this._data[index] : null;
    };

    Window_SkillTreeCost.prototype.itemRect = function(index) {
        const rect = Window_Selectable.prototype.itemRect.apply(this, arguments);
        const maxCols = this.maxCols();
        const itemHeight = this.lineHeight();
        const row = Math.floor(index / maxCols);
        rect.y = row * itemHeight;
        return rect;
    };

    Window_SkillTreeCost.prototype.refresh = function() {
        this.contents.clear();
        this._heightRows = 0;
        const lineHeight = this.lineHeight();
        const rect = this.itemRect(0);
        this.drawCostTitle(rect.x, rect.y);
        this.drawCount(this._treeData, rect.x, rect.y, rect.width);
        if (!this._treeData || !this._treeData.isEnabled()) return;
        if (params.VisibleLearnedSkillCost && this.isMultipleCount(this._treeData)) return;
        this.drawCostList(rect.x, rect.y);
        if (params.ShowPrerequisite) {
            this.drawPrerequisite(rect.x, rect.y + (this._heightRows * lineHeight), rect.width);
        }
        this.drawCostTextEx(this._treeData, rect.x, rect.y + (this._heightRows * lineHeight));
    };

    Window_SkillTreeCost.prototype.drawPrerequisite = function(x, y, width) {
        
    };

    Window_SkillTreeCost.prototype.drawCostList = function(x, y) {
        const list = this.showCostList(this._treeData);
        const lineHeight = this.lineHeight();
        this.setHeightRows(1);
        for (let i = 0; i < list.length; i++) {
            const rect = this.itemRect(i);
            this.drawCostItem(list[i], rect.x, rect.y + (this._heightRows * lineHeight), rect.width);
        }
        this.setHeightRows(Math.ceil(list.length / this.maxCols()));
    };

    Window_SkillTreeCost.prototype.drawCostItem = function(type, x, y, width) {
        const textWidth = this.textWidth("0000");
        const data = this._treeData;
        this.drawCost(type, data, x, y, width - textWidth);
        this.drawSkillTreeCost(type, data, x, y, width);
    };

    Window_SkillTreeCost.prototype.drawCostTitle = function(x, y) {
        let text = '';
        const data = this._treeData;
        if (!!data) {
            if (this.isMultipleCount(data)) {
                this.changeTextColor(NuunManager.getColorCode(params.LearnedNameColor));
                text = params.LearnedName || "習得済み";
            } else {
                this.changeTextColor(NuunManager.getColorCode(params.SkillCostSystemColor));
                text = params.SkillCostName.format(data.getSkillName());
            }
        }
        this.drawText(text, x, y);
    };

    Window_SkillTreeCost.prototype.drawCount = function(data, x, y, width) {
        this.changeTextColor(NuunManager.getColorCode(params.SkillCosTColor));
        if (!!data && data.getMaxCount() > 0) {
            this.drawSkillTreeCount(data, x, y, width, "right");
        }
    };

    Window_SkillTreeCost.prototype.drawCost = function(type, data, x, y, width) {
        this.changeTextColor(NuunManager.getColorCode(params.SkillCostNameColor));
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
            case 'level':
                this.drawLevel(x, y, width);
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

    Window_SkillTreeCost.prototype.drawLevel = function(x, y, width) {
        this.resetTextColor();
        this.drawText(params.LearningLevelName, x, y, width);
    };

    Window_SkillTreeCost.prototype.drawCostTextEx = function(data, x, y) {
        if (data.getLearnCondText()) {
            this.drawTextEx(data.getLearnCondText(), x, y);
        }
    };

    Window_SkillTreeCost.prototype.getParam = function(data, type) {
        switch (type) {
            case "sp":
                return this._actor.nsp;
            case 'item':
                return $gameParty.numItems($dataItems[data.getCostItem()]);
            case 'weapon':
                return $gameParty.numItems($dataWeapons[data.getCostWeapon()]);
            case 'armor':
                return $gameParty.numItems($dataArmors[data.getCostArmor()]);
            case 'gold':
                return $gameParty.gold();
            case 'var':
                return $gameVariables.value(data.getCostVariables());
            case 'level':
                return this._actor._level;
        }
    };

    Window_SkillTreeCost.prototype.isMultipleCount = function(data) {
        if (data.getMaxCount() === 0) return this._actor.isSkillTreeLearned(data._id);
        return this._actor.isMultipleCount(data._id, data.getMaxCount());
    };

    Window_SkillTreeCost.prototype.setHeightRows = function(row) {
        this._heightRows += row;
    };

    Window_SkillTreeCost.prototype.getPrerequisiteSkillsName = function() {
        return params.PrerequisiteSkillsName || "前提スキル";
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
            _SkillTreeResets(target, true);
            this.makeSuccess(target);
        }
    };

    const _Game_Action_testApply = Game_Action.prototype.testApply;
    Game_Action.prototype.testApply = function(target) {
        return _Game_Action_testApply.call(this, target) || this.isSkillTreeItems();
    };

    Game_Action.prototype.isSkillTreeItems = function() {
        const item = this.item();
        return !!item.meta.SkillTreeReset || !!item.meta.GainSkillPoint;
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
        this._cnsp = [];
        this._skillTreeList = null;
        this._learnSkillTreeSkillList = null;
        this.learnCount = 0;//総スキル習得回数
        this.totalSp = 0;//総スキルポイント
        this._skillTreeChangeClassMode = false;
    };

    const _Game_Actor_setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function(actorId) {
        _Game_Actor_setup.apply(this, arguments);
        this.initSkillPoint();
        this.gainTotalSkillPoint(this._nsp);
        this.setupSkillTreeList();
        this.initLearnSkillList();
    };

    Game_Actor.prototype.learnSkillTreeData = function() {
        return {
            skillId:0 ,
            higherSkills:[],
            count:0 ,
            cost:0 ,
            item:[],
            itemCost:[],
            weapon:[],
            weaponCost:[],
            armor:[],
            armorCost:[],
            goldCost:0,
            var:[],
            varCost:[],
        }
    };

    Game_Actor.prototype.initLearnSkillList = function() {
        if (!this._learnSkillTreeSkillList) {
            this._learnSkillTreeSkillList = [];
            this.setStartLearnSkillTreeList();
        }
    };

    Game_Actor.prototype.initSkillPoint = function() {
        if (params.IsClassSp && !this._cnsp) {
            this._cnsp = [];
        }
        const sp = params.IsClassSp ? this._cnsp[this._classId] : this._nsp;
        if (isNaN(sp)) {
            this.setSkillPoint(params.IsClassSp && this._cnsp.length > 0 ? 0 : this.initBattlerSkillPoint(this.actorId()), this._classId);
        }
    };

    Game_Actor.prototype.setupLearnSkillTreeData = function(data) {
        let learnData = this.getLearnSkillTreeSkill(data._id);
        if (!learnData) {
            learnData = this.learnSkillTreeData();
        }
        learnData.skillId = data._id;
        learnData.count = Math.min(learnData.count + 1, (data.getMaxCount() || 1));
        if (data.getCost() > 0) {
            learnData.cost += data.getCost();
        }
        if (data.getCostItem() > 0) {
            const i = learnData.item.indexOf(data.getCostItem());
            const index = i >= 0 ? i : learnData.item.length;
            learnData.item[index] = data.getCostItem();
            learnData.itemCost[index] = (learnData.itemCost[index] || 0) + data.getItemNum();
        }
        if (data.getCostWeapon() > 0) {
            const i = learnData.weapon.indexOf(data.getCostWeapon());
            const index = i >= 0 ? i : learnData.weapon.length;
            learnData.weapon[index] = data.getCostWeapon();
            learnData.weaponCost[index] = (learnData.weaponCost[index] || 0) + data.getWeaponNum();
        }
        if (data.getCostArmor() > 0) {
            const i = learnData.armor.indexOf(data.getCostArmor());
            const index = i >= 0 ? i : learnData.armor.length;
            learnData.armor[index] = data.getCostArmor();
            learnData.armorCost[index] = (learnData.armorCost[index] || 0) + data.getArmorNum();
        }
        if (data.getCostGold() > 0) {
            learnData.goldCost += data.getCostGold();
        }
        if (data.getCostVariables() > 0) {
            const i = learnData.var.indexOf(data.getCostVariables());
            const index = i >= 0 ? i : learnData.var.length;
            learnData.var[index] = data.getCostVariables();
            learnData.varCost[index] = (learnData.varCost[index] || 0) + data.getVariablesNum();
        }
        this._learnSkillTreeSkillList[data._id] = learnData;
        this.learnCount++;
    };

    Game_Actor.prototype.setStartLearnSkillTreeList = function() {
        const list = this.getAllSkillTreeList();
        for (const id of list) {
            const skillTree = params.SkillTreeSetting[id];
            if (!!skillTree && !!skillTree.SkillTreeList) {
                for (const data of skillTree.SkillTreeList) {
                    if (this.isLearnedSkill(data.SkillId) && !this.isSkillTreeLearn(data.SkillId)) {
                        this.setupLearnSkillTreeData(_getSkillTreeData(data, skillTree.SymbolName, this));
                    }
                }
            }
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
                this.skillTreeReset(id, params.ClassChangeResetSkillPoint, classId);
            }
        }
    };

    Game_Actor.prototype.setLearnSkillTreeSkill = function(data) {
        this.initLearnSkillList();
        this.setupLearnSkillTreeData(data);
    };

    Game_Actor.prototype.removeLearnSkillTreeSkill = function(skillId) {
        if (!!this._learnSkillTreeSkillList && !!this._learnSkillTreeSkillList[skillId]) {
            this._learnSkillTreeSkillList[skillId] = null;
        }
    };

    Game_Actor.prototype.getLearnSkillTreeSkill = function(skillId) {
        this.initLearnSkillList();
        return this._learnSkillTreeSkillList[skillId];
    };

    Game_Actor.prototype.setupSkillTreeList = function() {
        const list = _matchSkillTreeActor(this);//[スキルツリーID,クラスID]
        if (!this._skillTreeList) {
            this._skillTreeList = [];
        }
        for (const array of list) {
            array[0] = _getSkillTreeSettingIndex(array[0]);
            if (array[0] >= 0 && !this._skillTreeList.some(a => a[0] === array[0] && a[1] === array[1])) {
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

    Game_Actor.prototype.removeSkillTree = function(type, b, r) {
        const id = _getSkillTreeSettingIndex(type);
        if (!this._skillTreeList) {
            this._skillTreeList = [];
            return;
        }
        if (b) {
            this.skillTreeReset(id, r, this._classId);
        }
        const index = this._skillTreeList.findIndex(a => a[0] === id && a[1] === 0);
        if (index >= 0) {
            this._skillTreeList.splice(index, 1);
        }
    };

    Game_Actor.prototype.initBattlerSkillPoint = function(actorId) {
        const actor = $dataActors[actorId];
        const _class = this.currentClass();
        const cost = NuunManager.getMetaCode(_class, "InitSkillPoint") || NuunManager.getMetaCode(actor, "InitSkillPoint");
        return !!cost && cost >= 0 ? Number(cost) : params.DefaultInitSkillPoint;
    };

    const _Game_Actor_changeClass = Game_Actor.prototype.changeClass;
    Game_Actor.prototype.changeClass = function(classId, keepExp) {
        const oldClassId = this._classId;
        this._skillTreeChangeClassMode = true;
        _Game_Actor_changeClass.apply(this, arguments);
        this._skillTreeChangeClassMode = false;
        this.setupSkillTreeList();
        if (params.ChangeClassResetSkillTree) {
            this.changeClassResetSkillTree(oldClassId);
        }
    };

    const _Game_Actor_changeExp = Game_Actor.prototype.changeExp;
    Game_Actor.prototype.changeExp = function(exp, show) {
        const lastSp = this.nsp;
        _Game_Actor_changeExp.apply(this, arguments);
        if (show) {
            this.displayLevelUpSkillPoint(this.nsp - lastSp);
        }
    };

    Game_Actor.prototype.displayLevelUpSkillPoint = function(sp) {
        if (sp > 0) {
            const text = params.DisplayLevelUpMessage.format(this._name, sp, params.SkillPointName);
            $gameMessage.add(text);
        }
    };

    Game_Actor.prototype.isDuplicationSkillTree = function(id, classId) {
        return this._skillTreeList.some(array => array[0] === id && array[1] !== classId);
    };

    Game_Actor.prototype.isSkillTreeLearned = function(skillId) {
        return this.isLearnedSkill(skillId) || this.isSkillTreeLearn(skillId);
    };

    Game_Actor.prototype.isSkillTreeLearn = function(skillId) {
        if (!this._learnSkillTreeSkillList) return false;
        return !!this._learnSkillTreeSkillList[skillId];
    };

    Game_Actor.prototype.learnSkillTreeSkill = function(data) {
        const learnSkillId = this.getSkillTreeLearnSkill(data);
        const forgetSkillId = this.getSkillTreeRemoveSkill(data);
        if (!this.isSkillTreeLearned(learnSkillId)) {
            this.learnSkill(learnSkillId);
        }   
        if (forgetSkillId > 0) {
            this.forgetSkill(forgetSkillId);
        }
        this.setLearnSkillTreeSkill(data);
    };

    Game_Actor.prototype.getSkillTreeLearnSkill = function(data) {
        return data._id;
    };

    Game_Actor.prototype.getSkillTreeRemoveSkill = function(data) {
        return 0;
    };

    Game_Actor.prototype.maxSkillTreePoint = function() {
        return params.MaxSkillPoint > 0 ? params.MaxSkillPoint : Infinity;
    };

    Game_Actor.prototype.paySkillTreePoint = function(sp) {
        this.gainSkillPoint(-sp);
    };

    Game_Actor.prototype.gainSkillPoint = function(sp, classId = this._classId) {
        if (this._skillTreeChangeClassMode) return;
        this.initSkillPoint();
        const newSp = (params.IsClassSp ? this._cnsp[classId] : this._nsp) + sp;
        this.setSkillPoint(newSp.clamp(0, this.maxSkillTreePoint()), classId);
    };

    Game_Actor.prototype.setSkillPoint = function(sp, classId) {
        if (params.IsClassSp) {
            this._cnsp[classId] = sp;
        } else{
            this._nsp = sp;
        }
    };

    Game_Actor.prototype.getSkillPoint = function() {
        this.initSkillPoint();
        return params.IsClassSp ? this._cnsp[this._classId] : this._nsp;
    };

    Game_Actor.prototype.gainTotalSkillPoint = function(sp) {
        if (this.totalSp === undefined) {
            this.totalSp = 0;
        }
        this.totalSp += sp;
    };

    Game_Actor.prototype.isMultipleCount = function(skillId ,maxCount) {
        this.initLearnSkillList();
        const learnSkill = this._learnSkillTreeSkillList[skillId];
        return maxCount <= (!!learnSkill ? learnSkill.count : 0);
    };

    Game_Actor.prototype.getSkillTreeCount = function(skillId) {
        this.initLearnSkillList();
        const learnSkill = this._learnSkillTreeSkillList[skillId];
        return !!learnSkill ? (learnSkill.count) : (this.isLearnedSkill(skillId) ? 1 : 0);
    };

    const _Game_Actor_levelUp = Game_Actor.prototype.levelUp;
    Game_Actor.prototype.levelUp = function() {
        _Game_Actor_levelUp.apply(this, arguments);
        this.levelSkillPoint();
    };

    Game_Actor.prototype.levelSkillPoint = function() {
        const gainSp = Number(this.getLevelSkillPoint());
        this.gainSkillPoint(gainSp);
        this.gainTotalSkillPoint(gainSp);
    };

    Game_Actor.prototype.getLevelSkillPoint = function() {
        const actor = this.actor();
        const _class = this.currentClass();
        return NuunManager.getMetaCode(_class, "LevelupSkillPoint") || (NuunManager.getMetaCode(actor, "LevelupSkillPoint") || params.LevelupGainSkillPoint);
    };

    Game_Actor.prototype.skillTreeReset = function(id, r, classId) {
        const skillTree = params.SkillTreeSetting[id];
        if (!skillTree || !skillTree.SkillTreeList) return;
        for (const data of skillTree.SkillTreeList) {//プラグインパラメータのデータを参照
            if (this.isSkillTreeLearned(data.SkillId) && this.notDeletionSkillTreeSkill(data.SkillId)) {
                const t = _getSkillTreeData(data, skillTree.SymbolName, this);
                this.removeSkillTreeSkill(t, (!this.isNotSkillTreeCostReturn(t._id) && r), classId);
            }
        }
    };

    Game_Actor.prototype.removeSkillTreeSkill = function(data, r, classId) {
        const learnData = this._learnSkillTreeSkillList[data._id];
        if (!!learnData && !this.isNotSkillTreeLevelupSkill(classId, data._id)) {
            if (r) {
                data.returnSkillTreeCost(learnData, classId);
            }
            this.forgetSkillTreeSkill(data);
        }
    };

    Game_Actor.prototype.forgetSkillTreeSkill = function(data) {
        this.forgetSkill(data._id);
        this.removeLearnSkillTreeSkill(data._id);
    };

    Game_Actor.prototype.isNotSkillTreeCostReturn = function(skillId) {
        const skill = $dataSkills[skillId];
        return !!skill.meta.SkillTreeNoCostReturn;
    };

    Game_Actor.prototype.isNotSkillTreeLevelupSkill = function(classId, skillId) {
        return $dataClasses[classId].learnings.some(learning => {
            return skillId === learning.skillId}
        );
    };

    Game_Actor.prototype.notDeletionSkillTreeSkill = function(skillId) {
        const skill = $dataSkills[skillId];
        if (!skill) return true;
        return !skill.meta.SkillTreeNotDeletion;
    };

    Game_Actor.prototype.skillTreeLearnSkill = function(skillId, count = 0, costCondForced = false, forced = false) {
        const data = this.getSkillTreeIsLearnSkillData(skillId, forced);
        if (!!data) {
            const maxCount = (count > 0 ? Math.min(count, data.getMaxCount()) : data.getMaxCount()) || 1;
            for (let i = 0; i < maxCount; i++) {
                if (!this.isMultipleCount(data._id ,data.getMaxCount() || 1) && costCondForced || (data.isPaySkillTreeCostOk() && this.isSkillTreeEvalCond(data))) {
                    if (!costCondForced) {
                        data.paySkillTreeCost();
                    }
                    this.learnSkillTreeSkill(data);
                    if (i < maxCount - 1) {
                        data.refresh();
                    }
                }
            }
        }
    };

    Game_Actor.prototype.skillTreeRemoveSkill = function(skillId, r) {
        const data = this.getSkillTreeIsRemoveSkillData(skillId);
        if (!!data) {
            this.removeSkillTreeSkill(data, r && !this.isNotSkillTreeCostReturn(data._id), this._classId);
        }
    };

    Game_Actor.prototype.getSkillTreeIsLearnSkillData = function(skillId, forced) {
        const list = this.getSkillTreeList();
        for (const id of list) {
            const skillTree = params.SkillTreeSetting[id];
            if (!!skillTree && !!skillTree.SkillTreeList) {
                for (const data of skillTree.SkillTreeList) {
                    if (data.SkillId === skillId && !this.isSkillTreeLearned(skillId) && (forced || this.isSkillTreeReqSkill(skillTree.SkillTreeList, skillId))) {
                        return _getSkillTreeData(data, skillTree.SymbolName, this);
                    }
                }
            }
        }
        return null;
    };

    Game_Actor.prototype.getSkillTreeIsRemoveSkillData = function(skillId) {
        const list = this.getSkillTreeList();
        for (const id of list) {
            const skillTree = params.SkillTreeSetting[id];
            if (!!skillTree && !!skillTree.SkillTreeList) {
                for (const data of skillTree.SkillTreeList) {
                    if (data.SkillId === skillId && this.notDeletionSkillTreeSkill(skillId) && this.isSkillTreeLearned(skillId)) {
                        return _getSkillTreeData(data, skillTree.SymbolName, this);
                    }
                }
            }
        }
        return null;
    };

    Game_Actor.prototype.isSkillTreeEvalCond = function(data) {
        return data.isSkillTreeCond() && data.isSkillTreeSecretCond() && data.isSkillTreeLearnCond() && data.isLearningLevel();
    };

    Game_Actor.prototype.isSkillTreeReqSkill = function(list, skillId) {
        const reqList = NuunManager.getSkillTreeReqSkillListId(list, skillId);
        if (reqList.length === 0) return true;
        return reqList.every(id => this.isSkillTreeLearned(id));
    };

    Game_Actor.prototype.benchMembersSkillPoint = function() {
        return !params.BenchMembarsGainSkillPoint && !this.isBattleMember() ? 0 : 1;
    };

    Game_Enemy.prototype.getSkillPoint = function() {
        return 0;
    };

    Game_Enemy.prototype.getSkillTreeCount = function(skillId) {
        return 1;
    };

    Game_Enemy.prototype.isSkillTreeLearned = function(skillId) {
        return true;
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
            const gainSp = sp * actor.benchMembersSkillPoint();
            actor.gainSkillPoint(gainSp);
            actor.gainTotalSkillPoint(gainSp);
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


    function Sprite_BackgroundSprite() {
        this.initialize(...arguments);
    }

    Sprite_BackgroundSprite.prototype = Object.create(Sprite.prototype);
    Sprite_BackgroundSprite.prototype.constructor = Sprite_BackgroundSprite;

    Sprite_BackgroundSprite.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);
        this.initMembers();
    };

    Sprite_BackgroundSprite.prototype.initMembers = function() {
        this._backgroundName = null;
        this._scrollX = 0;
        this._scrollY = 0;
    };

    Sprite_BackgroundSprite.prototype.setup = function(name, sx = 0, sy = 0) {
        if (!!name) {
            this._backgroundName = name;
            this._scrollX = sx;
            this._scrollY = sy;
        } else {
            this._backgroundName = null;
            this._scrollX = 0;
            this._scrollY = 0;
        }
    };

    Sprite_BackgroundSprite.prototype.setBitmap = function(bitmap) {
        if (this.isScroll()) {
            this._scrollBackground = new TilingSprite();
            this._scrollBackground.move(0, 0, Graphics.width, Graphics.height);
            this.addChild(this._scrollBackground);
            this._scrollBackground.bitmap = bitmap;
        } else {
            this.bitmap = bitmap;
        }
    };

    Sprite_BackgroundSprite.prototype.update = function() {
        Sprite.prototype.update.call(this);
        this.updateScrollBackground();
    };

    Sprite_BackgroundSprite.prototype.updateScrollBackground = function() {
        if (!!this._backgroundName && !!this._scrollBackground && this.isScroll()) {
            const sprite = this._scrollBackground;
            sprite.origin.x += this._scrollX;
            sprite.origin.y += this._scrollY;
        }
    };

    Sprite_BackgroundSprite.prototype.isScroll = function() {
        return this._scrollX !== 0 || this._scrollY !== 0;
    };

})();