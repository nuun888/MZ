/*:-----------------------------------------------------------------------------------
 * NUUN_EnemyBook.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Enemy book
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 2.20.10
 * 
 * @help
 * Implement an enemy book.
 * With this plugin, you can freely customize the display content of enemy information.
 * 
 * Feature
 * Enemy Book: Check enemy information. It can be displayed even in battle.
 * Enemy Information: You can check the information of the enemy you are currently fighting.
 * Analyze: Check the information of the specified enemy.
 * 
 * Registration of enemy information
 * Set in the plugin parameters "Enemy book registration settings".
 * Start of battle: Register the enemies that appear in the book at the start of battle.
 * Defeat: Registers the enemy in the book when defeated.
 * When analysis is successful: Register in the book when the analysis is successful.
 * End of battle: Register the appearing enemy in the book at the end of the battle.
 * If Status information registration is OFF and Information unregistered status display is ON in the item settings, the display will be displayed as "a" etc. unless it is registered in the picture book when Status information registration is ON.
 * Example
 * Register in the book at the start of battle, and register status information when defeating
 * Set End of battle (Status information registration OFF) and Defeat (Status information registration ON) in the list.
 * Register all when analysis is successful
 * Set When analysis is successful (Status information registration ON) in the list.
 * 
 * Enemy character's memo column and enemy category setting notes *The latter is only when the category is displayed
 * Description field text Text code is available.
 * <[tag]:[text]> Description field text
 * [tag]:Description field tag name　By default, the tag describing the enemy description is set to "desc".
 * [text]:Text to display.
 * Any number of lines can be displayed by inserting a line break, so you can add your own items.
 * <desc:ahhh> Displays "ahhh" for items tagged "desc".
 * By default, the item displayed on the second page is set to "desc", so enter <desc:[text]> to display text.
 * 
 * Displaying Images by Enemy
 * <[tag]:[img],[x],[y]> Specify an arbitrary image to be displayed in the page.
 * [tag]:Individual image tag name (set in Description field, Individual image tag name)
 * [img]:Image path (no extension)
 * If the individually specified image folder is 'pictures', enter the file directly under img/pictures without an extension.
 * When acquiring from a subfolder, please also enter the subfolder name. Example items/tankobu
 * [x]:x-coordinate (relative)
 * [y]:y coordinate (relative)
 * If you want to specify multiple images, set as many as you want to display in the item list, and set them with separate names in ”Description column, individual image tag name”.
 * By default, the "pictures" folder is specified.
 * ”Individual image” is a function to display a different arbitrary image for each monster page. If you want to display the monster image, please display it with "Enemy picture".
 * 
 * Registration in enemy book
 * <NoBook>(tag default without enemy book registration)
 * It is not registered (displayed) in the enemy book.
 * You can set any tag name in the plugin parameter "Tag without enemy book registration". If you want to use the tag name of the old version as it is, please replace the tag name with "Tag without enemy book registration2".
 * <NoBookData>(Tag 2 default without enemy book registration)
 * It will not be registered (displayed) in the Monster Encyclopedia, but only enemy information and analysis will be displayed.
 * Any tag name can be set in the plug-in parameter "Tag without enemy book registration2".
 * <ShowDataBook>
 * Even if you have not defeated it, it will be judged as already defeated. All information is also displayed.
 * <AnalyzeResist:50> Sets the analysis resistance value. In this case, the analysis succeeds with a probability of 50%.
 * 
 * Registration settings when transforming
 * <NoTransformInData> When transforming, it will not be treated as defeated and will not be registered in the picture book. (Only when "Defeat before transformation" is ON)
 * <TransformEnemy:[enemyid]> Makes the monster with the specified ID defeated when defeated. Also, the number of defeats, acquired items, etc. will be counted for the monster with the specified ID.
 * [enemyid]:EnemyID
 * 
 * Other monster settings
 * <EnemyIcon:[iconid]>
 * An icon can be displayed to the left of the monster name.
 * <EnemyIcon:120> The icon with icon ID 120 is displayed.
 * 
 * Skill and item notes
 * <AnalyzeSkill:[id]> Activate the analyze skill.
 * [id]:List number of analysis skill settings
 * <AnalyzeSkill:1> This skill and item are Analyze Skills, and will be activated with the 1st setting in the "Analyze skill setting" list.
 * 
 * <CertainAnalyze> Ignore analysis resistance.
 * 
 * <SeeThrough> Register the picture book without opening the analyze screen. Skill attacks, encyclopedia registration, and information registration are treated as analysis.
 * 
 * <EnemyInfo> Displays enemy information.
 * 
 * Item notes
 * <NoDropProbability>
 * Items marked with this tag will not show drop item probability display.
 * 
 * Enemy Type Category Settings
 * You can display enemies by type.
 * Category key can be set with any character string except "all".
 * If "all" is entered, all enemies registered in the enemy book will be displayed.
 * If "mapEnemy" is entered, monsters in the current map will be displayed.
 * Enemy notes
 * <CategoryKey:[Key]> Set the categories to display.
 * <CategoryKey:[Key],[Key]....> Multiple categories can be displayed.
 * [Key]:Category Key (Enter the string set in the plug-in parameter without [])
 * 
 * You can display the items when the category is selected. Not displayed when not set.
 * Tags such as ``Description field'' are entered in the notes of the enemy category setting in the plugin parameters.
 * 
 * Message when analysis skill setting fails
 * %1:Target name
 * %2:Subject name
 * When "%2 failed to analyze.", if the skill user is a lead, "Lead failed to analyze." is displayed.
 * 
 * Enemy notes
 * Side view (specified when showing side view enemies in item settings)
 * <EB_SVBattler:[fileName]> Display the monster image as a side view image. (It is assumed that you have installed a plug-in that displays the side view actor on the enemy)
 * [fileName]:File name Specify the side view battler image. Please specify the file name in the sv_actors folder without the extension.
 * If you are displaying the side view battler in the "Visu stalle" series, you do not need to define it.
 * 
 * Enemy notes
 * <EB_SVBattlerMotion:[motionId]> Display with the specified motion. If there is no entry, it will be displayed with 0 motion.
 * [motionId]:0 to 17 motion ID (enter numerical value)
 * 
 * Enemy notes
 * Character (Displayed when character is specified in item settings)
 * <EnemyBookCharacter:[failName],[id],[direction]> Display character chips. It will not be displayed for enemies that are not specified.
 * [failName]:File name Specify the file name in the "characters" folder without an extension.
 * [id]:Character chip index number. The 3x4 character chip will be 0.
 * [direction]:Specifies direction. 2 front (top) 4 left (second) 6 right (third) 8 rearward (bottom) * can be omitted
 * 
 * Enemy notes
 * <EnemyBookFVEnemy> Displays the monster image to be displayed as a front view image.
 * <EnemyBookSVEnemy> Displays the monster image to be displayed as a side view image.
 * 
 * ”Unencountered category string”, ”unidentified enemy string”, ”Item when status information is not registered, skill display name”, "RegistrationEnemyInfo(ON)" will be replaced with "?" depending on the number of characters in the name if only one "?" is entered.
 * 
 * If you turn on "Unconfirmed drop item name" and "Unconfirmed stealable item name", even if you register status information, it will not be displayed until you confirm the drop item (stealable item).
 * "Unconfirmed use skill display" will not be displayed until you confirm the skill used even if you register the status information.
 * "Hide Unverified Attributes", "Hide unconfirmed state", and "Hide unidentified debuffs" will not be displayed until you confirm attributes, states, and debuff resistance weaknesses even if you register status information.
 * 
 * Page window display Mode
 * By setting it to hidden, the page window will be displayed outside the screen and the enemy book display area will be expanded.
 * 
 * Element resistance (icon display) setting
 * Disabled reflected in less effective elements
 * When turned off, elements with 0% resistance are displayed in resistance elements.
 * 
 * Background image
 * "Background image window size" aligns the upper left of the image according to the UI screen.
 * "BackFitWidth" is expanded according to the screen size based on the mode set in the background image UI window size.
 * If it fits in the UI window, it will be enlarged with the size of the UI.
 * If it is specified for each page, the background set individually takes precedence.
 * 
 * Setting the list of enemies that appear on the map
 * You can display the monsters that appear on the current map by making the following settings.
 * By entering 'mapEnemy' as the category key, a list of monsters on the current map will be displayed.
 * 
 * Fill in the ID of the enemy character that will be encountered in the event on the map.
 * Specified in the map enemy encounter list in the plugin parameters.
 * 
 * You can set it from "Map enemy encounter list".
 * It is not necessary to enter when setting with plug-in parameters, but if the following tags are entered, the settings of the following tags will take precedence.
 * 
 * Map Note
 * <EncountEnemiesList:[id],[id]...>
 * Specify the enemy character ID. Multiple entries are allowed.
 * 
 * If using "NUUN_EnemyBookEncounterCheck", the above setting will be applied if it is set, but if not set it will be automatically determined from the current map's enemy group.
 * 
 * Gauges such as turn, level, and HP are displayed only during battle.
 * 
 * Method of operation
 * Up and down (↑ ↓) keys: select enemy
 * Left and right (← →) keys: Switch pages(Default)
 * PgUp PgDn key: monster page turn
 * Decided: Display full-size monsters
 * 
 * touch operation
 * Up/down swipe: scroll
 * 
 * plugin command
 * Enemy book open                                          :Open the enemy book.
 * Enemy information display                                :Open enemy information.
 * Added Enemy                                              :Add an enemy to the picture book. No status information is registered.
 * Enemy deletion                                           :Removes enemies from the enemy book.
 * Enemy book completed                                     :Complete the enemy book.
 * Initialize Enemy Book                                    :Clear (delete all) the enemy book.
 * Enemy status information registration                    :Register enemy status information. At the same time, the process of "add enemy" is also performed.
 * Removes enemy status information                         :Removes enemy status information.
 * Enemy defeated                                           :Makes the enemy defeated.
 * Reset number of kills                                    :Resets the number of defeated enemies.
 * Acquired enemy drop items                                :Makes the enemy's gain item acquired.
 * Unobtained enemy drop items                              :Makes the enemy's drop item unacquired.
 * Acquired enemy steal item                                :Makes the enemy's steal item acquired.
 * Enemy steal item not acquired                            : Makes the enemy's steal item unacquired.
 * Total Killed Number of Enemies                           :Stores the number of defeated enemies in a variable.
 * Encounter Count                                          :Stores the number of enemies encountered in a variable.
 * Enemy book completion rate                               :Stores the completion rate of the enemy book.
 * Total number of kills                                    :Stores the number of kills for the specified enemy in a variable.
 * Enemy book registered judgment                           :Determines if the enemy is registered in the enemy book.
 * Status information registered judgment                   :Determines if the enemy's status information has been registered in the enemy book.
 * Item drop judgment                                       :Determines if the specified item has been dropped.
 * Item stolen judgment                                     :Determine if you have stolen the specified item.
 * Unconfirmed use skill confirmed                          :Makes the enemy's use skill "confirmed".
 * Confirmed skill used Unconfirmed                         :Makes the enemy's use skill "unconfirmed".
 * Unconfirmed attribute resistance information confirmed   :Makes the enemy's attribute resistance weakness "confirmed". Specify 0 to make all "confirmed". (requires NUUN_EnemyBookEX_1)
 * Confirmed attribute resistance information unconfirmed   :Makes the enemy's attribute resistance weak point "unconfirmed". Specify 0 to make all "unconfirmed". (requires NUUN_EnemyBookEX_1)
 * Unconfirmed state resistance information Confirmed       :Makes the enemy's state resistance weakness "confirmed". Specify 0 to make all "confirmed". (requires NUUN_EnemyBookEX_1)
 * Confirmed state resistance information unconfirmed       :Makes the enemy's state resistance weak point "unconfirmed". Specify 0 to make all "unconfirmed". (requires NUUN_EnemyBookEX_1)
 * Unconfirmed debuff resistance information Confirmed      :Makes the enemy's debuff resistance weak point "confirmed". Specify 0 to make all "confirmed". (requires NUUN_EnemyBookEX_1)
 * Confirmed debuff resistance information unconfirmed      :Makes the enemy's debuff resistance weak point "unconfirmed". Specify 0 to make all "unconfirmed". (requires NUUN_EnemyBookEX_1)
 * 
 * Parameter reference variable
 * this._enemy or de: Get enemy data from the database.
 * this._enemy.meta: Get the meta tag.
 * enemy: Get data for Game_Enemy.
 * 
 * Requires "NUUN_StealableItems" to enable stealable items.
 * Requires "NUUN_EnemyBookEX_2" and "NUUN_ConditionalDrops" to enable conditional items.
 * Requires "NUUN_RadarChartBase" to enable radar charts.
 * Requires "NUUN_EnemyBookEX_1" to enable state, attribute, and buff resistance mask functions.
 * 
 * Displaying Apng images
 * Separately, "ApngPicture.js" by "Triacontane" and the following libraries are required.
 * https://github.com/sbfkcel/pixi-apngAndGif
 * Please check ApngPicture.js for the download destination.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 2/10/2024 Ver.2.20.10
 * Added a function that allows you to set conditions under which commands can be selected.
 * 1/3/2024 Ver.2.20.9
 * Fixed an issue where attribute icons were not displayed correctly when attacking.
 * 12/29/2023 Ver.2.20.8
 * Set error log when invalid data is set in completion level display settings.
 * 12/29/2023 Ver.2.20.7
 * Fixed an issue where an error would occur when viewing categories during battle.
 * Fixed the behavior of some windows during battle.
 * Fixed an issue where the "ActualEnemyMask" setting was not being applied.
 * 12/10/2023 Ver.2.20.6
 * Fixed an issue where mask processing was not performed when attack attributes were not registered.
 * 12/9/2023 Ver.2.20.5
 * Added attack attributes. (Self-configuration required)
 * 11/4/2023 Ver.2.20.4
 * Minor corrections.
 * 7/22/2023 Ver.2.20.3
 * Corrected to color-code resistance and weakness numbers with attributes and state resistance (numbers).
 * 7/16/2023 Ver.2.20.2
 * Added a function to execute only the analysis registration process without opening the analyze screen.
 * 7/8/2023 Ver.2.20.1
 * Fixed an issue that caused an error when opening the Monster Book with category visibility set to true.
 * Fixed an issue where resistance, debuff, disable, and absorption display of attribute icon was not displayed properly.
 * 7/1/2023 Ver.2.20.0
 * Added the item of absorption element (icon display).
 * Added a function not to display absorption attributes from invalid attributes.
 * Fixed an issue where Hide Unverified Attributes (requires NUUN_EnemyBookEX_1) was not applied.
 * 6/30/2023 Ver.2.19.5
 * Fixed an issue where full size silhouettes were not working.
 * 6/21/2023 Ver.2.19.4
 * Fixed an issue where the analysis page could not be switched.
 * 6/18/2023 Ver.2.19.3
 * Fixed the problem that the display item setting of analyze was not applied properly.
 * 6/17/2023 Ver.2.19.2
 * Fixed an issue where an error would occur if the "NUUN_EnemyBookEncounterCheck" plugin was not installed when displaying the current map.
 * Fixed an issue where radar charts would not be displayed.
 * 6/9/2023 Ver.2.19.1
 * Fixed an issue that caused an error when showing resistance debuffs.
 * Added ability to display debuffs on state (icon) resistance, invalidity, and weakness.
 * Added invalid debuffs to display items.
 * 6/2/2023 Ver.2.19.0
 * Added the current map to the picture book category.
 * 4/8/2023 Ver.2.18.6
 * Added a function to display monster images in front view image or side view image.
 * Fixed an issue where viewing conditional drop items would cause an error.
 * 3/20/2023 Ver.2.18.5
 * Fix to cache enemy game data. (Other than some monsters)
 * Fixed not to display the full size image of unregistered monsters.
 * 3/12/2023 Ver.2.18.4
 * Added support for enemy sideview actors in "VisuMZ_1_BattleCore".
 * 3/11/2023 Ver.2.18.3
 * Fixed an issue where it was not possible to switch pages other than the cursor during combat.
 * Fixed the problem that when using "VisuMZ_0_CoreEngine", the monster page also changes when selecting a monster.
 * 3/10/2023 Ver.2.18.2
 * Fixed the problem that system color 0 cannot be specified.
 * 3/6/2023 Ver.2.18.1
 * Fixed an issue where Apng monsters would be slow when displaying them.
 * 3/5/2023 Ver.2.18.0
 * Added a function to display full-size monsters.
 * 3/4/2023 Ver.2.17.14
 * Conflict resolution.
 * 3/4/2023 Ver.2.17.13
 * Added a function that allows you to specify key settings for page switching on monster pages. (You need a plug-in that can assign keys separately)
 * 2/26/2023 Ver.2.17.12
 * Fixed an issue where enemies were not registered in the encyclopedia when they were added via plugins instead of appearing as enemies.
 * 2/25/2023 Ver.2.17.11
 * Fixed number display processing.
 * 2/23/2023 Ver.2.17.10
 * Added a function to display unregistered monster images as silhouettes.
 * 1/22/2023 Ver.2.17.9
 * Corrected so that No. is attached before the numerical value in the display of the enemy number.
 * Changed page column to automatic setting.
 * Fixed to be able to specify the color in the window skin. (Reset required)
 * Modified so that the display of window images can be specified for each window.
 * 1/5/2023 Ver.2.17.8
 * Fixed an issue where monsters before transformation were not counted as defeated and monsters after transformation were double counted as defeated.
 * 12/17/2022 Ver.2.17.7
 * Fixed processing when adding enemy actions with external plugins.
 * 12/17/2022 Ver.2.17.6
 * Added ability to display skills learned through skill learning in enemy actions.
 * 12/14/2022 Ver.2.17.5
 * Fixed an issue that caused an error when calling some variables in drop items and stealable items.
 * 12/12/2022 Ver.2.17.4
 * Fixed error in "Element resistance (resistance numerical display)."
 * 12/9/2022 Ver.2.17.3
 * Changed the Type of color specification plug-in parameter to color. (Ver.1.6.0 or later)
 * Changed the Type of icon specified plug-in parameter to icon. (Ver.1.6.0 or later)
 * Changed the display in languages other than Japanese to English.
 * 11/20/2022 Ver.2.17.2
 * Fixed enemy information not switching between same enemy information.
 * 11/19/2022 Ver.2.17.1
 * Fixed an issue where registration in the enemy book and status registration were not performed when defeated.
 * Fixed the problem that registration in the enemy book and status registration were not performed when analyzing.
 * 11/19/2022 Ver.2.17.0
 * Added a function that can display an icon next to the item name.
 * 11/12/2022 Ver.2.16.5
 * Added ability to display enemy levels.
 * APNG related fixes.
 * 11/6/2022 Ver.2.16.4
 * APNG related fixes.
 * 11/5/2022 Ver.2.16.3
 * Fixed the problem that an error occurs when ApngPicture is not installed.
 * 11/5/2022 Ver.2.16.2
 * Fixed the problem that monsters displayed in APNG are displayed twice.
 * 11/5/2022 Ver.2.16.1
 * Apng compatible. (Requires ApngPicture.js from Triacontane)
 * 10/18/2022 Ver.2.16.0
 * Added a function that can display items when selecting a category in the enemy status window.
 * Fixed an issue where enemies were not showing up in categories.
 * /10/9/2022 Ver.2.15.0
 * Added a function that allows you to set items that can be displayed for unregistered enemies.
 * Fixed the problem that the alphabet displayed when there is the same enemy in the enemy list of enemy information is not displayed.
 * Fixed an issue with non-working tags.
 * 10/8/2022 Ver.2.14.3
 * Added a function to change the registration of enemy book data to a specified enemy when defeated.
 * Enemy information, fixed to not display the enemy number that is only displayed in analyze.
 * Fixed an issue where registered text colors in the enemy selection window were not applied.
 * Fixed an issue where the function to hide unregistered status information in enemy information was not applied.
 * 10/4/2022 Ver.2.14.2
 * Added a function that allows you to set any name for the tag displayed in the enemy book.
 * 10/2/2022 Ver.2.14.1
 * Fixed the problem that an error occurs when opening the picture book when specifying the item width.
 * Fixed because the right of character alignment was wrong.
 * Preset re-correction
 * 10/2/2022 Ver.2.14.0
 * Changed the specification of the setting when registering the enemy book.
 * Changed specification of drop items, stealable items, conditional items, enemy skills, attribute resistance, and state resistance columns.
 * Cleanup of plugin parameters.
 * Fixed an issue where stealable items were not displaying properly.
 * Changed specification of analysis setting.
 * Specification change of <NoBook> and <NoBookData>.
 * Changed so that the background image can be specified when selecting a category.
 * 7/30/2022 Ver.2.13.4
 * Added a function that allows you to specify a name that is not displayed in the enemy book.
 * Fixed an issue that caused items to appear slightly offset when no content background was displayed.
 * 6/15/2022 Ver.2.13.3
 * Fixed the problem that NaN is displayed when a character string is entered in the evaluation expression.
 * 6/13/2022 Ver.2.13.2
 * Added a function to display the physical damage rate and magic damage rate in the element resistance list.
 * 6/5/2022 Ver.2.13.1
 * Fixed some processing.
 * 5/5/2022 Ver.2.13.0
 * Changed the stealing skill rate display to an evaluation formula format.
 * Fixed an issue where the display of items would be unnatural if the probabilities were not displayed for drop items or stolen items.
 * Changed specifications of drop item and evaluation formula entry for each item.
 * Changed enemy book presets.
 * 4/2/2022 Ver.2.12.1
 * Added processing by saving picture book data sharing.
 * 3/4/2022 Ver.2.12.0
 * Added a function to display element and state resistance as a percentage.
 * Fixed the problem that an error occurs at the start of battle depending on the pattern of enemy book registration.
 * 1/29/2022 Ver.2.11.2
 * Changed the specification of the drop item rate display.
 * 1/24/2022 Ver.2.11.1
 * Added ability to hide the enemy detail page window.
 * 1/24/2022 Ver.2.11.0
 * Cleaned up plugin parameters.
 * Specification change of original parameter.
 * Changed presets for enemy detail pages.
 * Added a function to specify the item font size.
 * Added ability to register at the end of battle.
 * Fixed registration process.
 * 1/1/2022 Ver.2.10.4
 * Fixed the problem that the display shifts when opening enemy information when specifying the width of the information page during battle.
 * Fixed the problem that the number notation of the category is strange.
 * Fixed an issue where category names were displayed with different category names.
 * 12/31/2021 Ver.2.10.3
 * Fixed an issue that allows you to select categories that are not displayed.
 * Fix to force enemy categories to be left aligned.
 * 12/25/2021 Ver.2.10.2
 * Fixed the problem that null is displayed when setting the unit with blank.
 * 12/25/2021 Ver.2.10.1
 * Changed the page category and enemy category to the command method.
 * Fixed an issue where an error would occur when displaying the conditional drop item enemy book.
 * 12/22/2021 Ver.2.10.0
 * Changed so that flag processing is not performed when unconfirmed drop items, stealable item names, and hide used skill names are turned off.
 * Added ability to show conditional drop items.
 * 2/7/2021 Ver.1.0.0
 * First edition.
 * 
 * @param BasicSetting
 * @text Basic setting
 * @default ------------------------------
 * 
 * @param WindowMode
 * @desc Specifies the display position of the selection window.
 * @text Selection window position
 * @type select
 * @option Left
 * @value 0
 * @option Right
 * @value 1
 * @default 0
 * @parent BasicSetting
 * 
 * @param RegistrationTiming
 * @desc Set the registration method for the enemy book.
 * @text Enemy book registration settings
 * @type struct<RegistrationTimingList>[]
 * @default ["{\"RegistrationTiming\":\"0\",\"RegisterStatus\":\"true\"}"]
 * @parent BasicSetting
 * 
 * @param TransformDefeat
 * @desc Assumes that the enemy before transformation has been defeated.
 * @text Defeat before transformation
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param NoDataName
 * @desc Specify a name that is not registered in the enemy book. Name blanks are not registered by default.
 * @text Names not registered in the enemy book
 * @type string
 * @default 
 * @parent BasicSetting
 * 
 * @param NoBookTag
 * @desc Tag names that will not be registered in the enemy book.
 * @text Tag without enemy book registration
 * @type string
 * @default NoBook
 * @parent BasicSetting
 * 
 * @param NoBookDataTag
 * @desc Tag names that will not be registered in the enemy book.Enemy information will be displayed during analysis.
 * @text Tag without enemy book registration2
 * @type string
 * @default NoBookData
 * @parent BasicSetting
 * 
 * @param DecimalMode
 * @text rounding off
 * @desc Round off the non-display decimal point. (truncated at false)
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param ImgFolder
 * @desc Specify the folder name for the individually specified images. (directly under img)
 * @text Individually specified image folder
 * @type string
 * @default pictures
 * @parent BasicSetting
 * 
 * @param SVEnemyMirror
 * @type boolean
 * @default true
 * @text Side view butler reversal
 * @desc Inverts the image when displaying Side View Battler.
 * @parent BasicSetting
 * 
 * @param BackUiWidth
 * @text Background image window size
 * @desc Fit the background image to the UI window size.
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param BackFitWidth
 * @text Background image UI window size
 * @desc Scales the background image to fit the window size or screen.
 * @type boolean
 * @default false
 * @parent BasicSetting
 * 
 * @param EnemyGraphicMode
 * @desc Specifies whether to display the monster image as a front view image or a side view image.
 * @text Enemy image type
 * @type select
 * @option By mode
 * @value 0
 * @option Image for front view
 * @value 1
 * @option Image for side view
 * @value 2
 * @default 0
 * @parent BasicSetting
 * 
 * @param PageNextSymbol
 * @desc Pagination symbol name.(To change, you need a plug-in that can assign keys separately)
 * @text Pagination symbol name
 * @type string
 * @default pageup
 * @parent BasicSetting
 * 
 * @param PagePreviousSymbol
 * @desc Page return symbol name.(To change, you need a plug-in that can assign keys separately)
 * @text Page return symbol name
 * @type string
 * @default pagedown
 * @parent BasicSetting
 * 
 * @param ActualEnemyMask
 * @type boolean
 * @default true
 * @text Full size image unregistered silhouette
 * @desc Creates a full-size silhouette of a monster whose information has not yet been registered.
 * @parent BasicSetting
 * 
 * @param MapEncountEnemySetting
 * @text Map encounter enemy character setting
 * @default ------------------------------
 * 
 * @param MapEncountEnemy
 * @text Map enemy encounter list
 * @desc Set the enemies to encounter on the specified map.
 * @type struct<EncountList>[]
 * @default []
 * @parent MapEncountEnemySetting
 * 
 * @param CommandSetting
 * @text Enemy Book Command Settings
 * @default ------------------------------
 * 
 * @param CommandName
 * @desc Name of the command.
 * @text Command display name
 * @type string
 * @default Enemy Book
 * @parent CommandSetting
 * 
 * @param ShowCommand
 * @desc Add a enemy book to the menu command.
 * @text Menu command display
 * @type boolean
 * @default false
 * @parent CommandSetting
 * 
 * @param enemyBookSwitch 
 * @desc Flag switch ID to display.
 * @text Menu command display switch
 * @type switch
 * @default 0
 * @parent CommandSetting
 * 
 * @param CondCommandEnemyBook
 * @desc Conditions for selecting an enemy book. If it cannot be selected, it will be displayed semi-transparently.
 * @text Menu command selection conditions
 * @type combo
 * @option '$gameSwitches.value(0);//スイッチ'
 * @default 
 * @parent CommandSetting
 * 
 * @param ShowBattleCommand
 * @desc Adds an enemy book to party commands in battle.
 * @text Party command display
 * @type boolean
 * @default false
 * @parent CommandSetting
 * 
 * @param enemyBookBattleSwitch
 * @desc Flag switch ID to be displayed during battle.
 * @text Party command display switch
 * @type switch
 * @default 0
 * @parent CommandSetting
 * 
 * @param CondBattleCommandEnemyBook
 * @desc Conditions for selecting enemy books with party commands. If it cannot be selected, it will be displayed semi-transparently.
 * @text Party command selection conditions
 * @type combo
 * @option '$gameSwitches.value(0);//スイッチ'
 * @default 
 * @parent CommandSetting
 * 
 * @param InfoCommandSetting
 * @text Enemy information command setting
 * @default ------------------------------
 * 
 * @param EnemyInfoCommandName
 * @desc Name of enemy information command.
 * @text Enemy information command name
 * @type string
 * @default Enemy Info
 * @parent InfoCommandSetting
 * 
 * @param ShowEnemyInfoCommand
 * @desc Add enemy information to party commands during battle.
 * @text Enemy Info Party Command Display
 * @type boolean
 * @default false
 * @parent InfoCommandSetting
 * 
 * @param enemyBookInfoSwitch
 * @desc A flag switch ID that displays enemy information during battle.
 * @text Enemy information party command display switch ID.
 * @type switch
 * @default 0
 * @parent InfoCommandSetting
 * 
 * @param CondEnemyBookInfo
 * @desc Conditions for selecting enemy information. If it cannot be selected, it will be displayed semi-transparently.
 * @text Enemy information selection conditions
 * @type combo
 * @option '$gameSwitches.value(0);//スイッチ'
 * @default 
 * @parent InfoCommandSetting
 * 
 * @param WindowSetting
 * @text Common window settings
 * @default ------------------------------
 * 
 * @param BookWidth
 * @desc Width of enemy info window. (2/3 of the screen at 0)
 * @text Enemy info window width
 * @type number
 * @default 0
 * @min 0
 * @parent WindowSetting
 * 
 * @param NoTouchUIWindow
 * @type boolean
 * @default false
 * @text Window top alignment when Touch UI is OFF
 * @desc When the battle touch UI is off, the window is pushed up.
 * @parent WindowSetting
 * 
 * @param AllWindowVisibleHide
 * @type boolean
 * @default false
 * @text Hide all window images
 * @desc Hide window images for all windows. This setting will take precedence even if you hide them individually.
 * @parent WindowSetting
 * 
 * @param BackgoundWindowMode
 * @type boolean
 * @default false
 * @text Background image mode during battle
 * @desc Sets the battle window to background image mode. Set it to ON when setting the background image.
 * @parent WindowSetting
 * 
 * @param CategorySetting
 * @text Display Category Window Setting
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param CategoryNameWindowVisible
 * @type boolean
 * @default true
 * @text Display category window image display
 * @desc Display the window image of the display category.
 * @parent CategorySetting
 * 
 * @param CategoryNameWindowsSkin
 * @desc Specifies the window skin for the display category window.
 * @text Display category window skin
 * @type file
 * @dir img/system
 * @default 
 * @parent CategorySetting
 * 
 * @param SelectCategorySetting
 * @text Category window settings
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param CategoryShow
 * @type boolean
 * @default false
 * @text Show category window
 * @desc Display the category window. If hidden, it will not be displayed with the View Categories window.
 * @parent SelectCategorySetting
 * 
 * @param EnemyBookCategory
 * @desc Set the enemy category.
 * @text Enemy category setting
 * @type struct<BookCategoryList>[]
 * @default ["{\"CategoryName\":\"ALL\",\"CategoryKey\":\"all\",\"CategoryNote\":\"\"}","{\"CategoryName\":\"BOSS\",\"CategoryKey\":\"boss\",\"CategoryNote\":\"\"}"]
 * @parent SelectCategorySetting
 * 
 * @param CategoryVisibleType
 * @text Unencountered category display
 * @desc Category display when you have not encountered even one.
 * @type select
 * @option Show
 * @value 0
 * @option Hide
 * @value 1
 * @option Hide with another string
 * @value 2
 * @default 0
 * @parent SelectCategorySetting
 * 
 * @param CategoryUnknownData
 * @desc A string of categories that have not yet been encountered.
 * @text Unencountered category string
 * @type string
 * @default ?
 * @parent SelectCategorySetting
 * 
 * @param CategoryListDateSetting
 * @desc List to display when category is selected.
 * @text Category display list
 * @type struct<CategoryPageListData>[]
 * @default []
 * @parent SelectCategorySetting
 * 
 * @param CategoryWindowVisible
 * @type boolean
 * @default true
 * @text Category window image display
 * @desc Display the window image of the category.
 * @parent SelectCategorySetting
 * 
 * @param CategoryWindowsSkin
 * @desc Specifies the window skin for the category window.
 * @text Category window skin
 * @type file
 * @dir img/system
 * @default 
 * @parent SelectCategorySetting
 * 
 * @param SelectEnemySetting
 * @text Monster selection window common settings
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param NumberType
 * @text Enemy number display
 * @desc Displays enemy numbers.
 * @type select
 * @option No display of enemy No.
 * @value 0
 * @option Show enemy No.
 * @value 1
 * @option Display enemy No. and fill in 0.(2 digits)
 * @value 2
 * @option Display enemy No. and fill in 0.(3 digits)
 * @value 3
 * @option Display enemy No. and fill in 0.(4 digits)
 * @value 4
 * @default 1
 * @parent SelectEnemySetting
 * 
 * @param NumberWidth
 * @desc Specify the number display range with a string. When padding with 0, it is set according to the number of digits.
 * @text Number display range
 * @type string
 * @default 00
 * @parent SelectEnemySetting
 * 
 * @param UnknownVisible
 * @desc Hides unidentified enemy from the list.
 * @text Unidentified enemy display
 * @type boolean
 * @default false
 * @parent SelectEnemySetting
 * 
 * @param NumberMode
 * @desc When displayed from the category, the number display is displayed in the order of each category display.
 * @text Number category display order display
 * @type boolean
 * @default false
 * @parent SelectEnemySetting
 * 
 * @param UnknownEnemyIcons
 * @desc Unregistered enemy icon.
 * @text Unregistered enemy icon
 * @type icon
 * @default 0
 * @min 0
 * @parent SelectEnemySetting
 * 
 * @param UnknownData
 * @desc A string of characters for enemies that have not been encountered.
 * @text unidentified enemy string
 * @type string
 * @default ?
 * @parent SelectEnemySetting
 * 
 * @param RegistrationEnemyColor
 * @desc Color of registered enemy names.
 * @text Registered enemy name text color
 * @type color
 * @default 0
 * @max 999
 * @parent SelectEnemySetting
 * 
 * @param RegistrationStatusEnemyColor
 * @desc The color of enemy names registered in status information.
 * @text Enemy name text color registered with status information
 * @type color
 * @default 0
 * @max 999
 * @parent SelectEnemySetting
 * 
 * @param SelectEnemybookSetting
 * @text Enemy Book Selection Window Common Settings
 * @default ------------------------------
 * @parent SelectEnemySetting
 * 
 * @param IndexWindowVisible
 * @type boolean
 * @default true
 * @text Monster selection window image display
 * @desc Displays the monster selection window image.
 * @parent SelectEnemybookSetting
 * 
 * @param IndexWindowsSkin
 * @desc Specifies the window skin for the enemy selection window.
 * @text Enemy selection window skin
 * @type file
 * @dir img/system
 * @default 
 * @parent SelectEnemybookSetting
 * 
 * @param SelectEnemyInfoSetting
 * @text Enemy information selection window common settings
 * @default ------------------------------
 * @parent SelectEnemySetting
 * 
 * @param InfoWindowVisible
 * @type boolean
 * @default true
 * @text Enemy information window image display
 * @desc Displays a window image of enemy information.
 * @parent SelectEnemyInfoSetting
 * 
 * @param InfoWindowsSkin
 * @desc Specifies the window skin for enemy info windows.
 * @text Enemy info window skin
 * @type file
 * @dir img/system
 * @default 
 * @parent SelectEnemyInfoSetting
 * 
 * @param PercentWindow
 * @text Enemy Book completenes Window Settings
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param PercentWindowShow
 * @type boolean
 * @default true
 * @text Completeness display
 * @desc Show completeness. Enemy information is not displayed in Analyze.
 * @parent PercentWindow
 * 
 * @param PercentContent
 * @desc Set the display items in the enemy book completenes window.
 * @text Display item setting
 * @type struct<PercentContentList>[]
 * @default ["{\"ContentName\":\"Completenes\",\"ContentDate\":\"0\"}","{\"ContentName\":\"Encountered\",\"ContentDate\":\"1\"}","{\"ContentName\":\"Destroyed\",\"ContentDate\":\"2\"}"]
 * @parent PercentWindow
 * 
 * @param Interval
 * @desc Enemy book completeness window update frame
 * @text Update frame interval
 * @type number
 * @default 100
 * @max 999999
 * @min 0
 * @parent PercentWindow
 * 
 * @param PercentWindowVisible
 * @type boolean
 * @default true
 * @text Completeness window image display
 * @desc Displays the completeness window image.
 * @parent PercentWindow
 * 
 * @param PercentWindowsSkin
 * @desc Specifies the window skin for the enemy book perfection window.
 * @text Enemy book completeness window skin
 * @type file
 * @dir img/system
 * @default 
 * @parent PercentWindow
 * 
 * @param PageWindow
 * @text Page window setting
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param PageWindowsShow
 * @desc Display the page screen.
 * @text Page display Mode
 * @type boolean
 * @default false
 * @parent PageWindow
 * 
 * @param PageWindowVisible
 * @type boolean
 * @default true
 * @text page window image display
 * @desc Displays the window image of the page.
 * @parent PageWindow
 * 
 * @param PageWindowsSkin
 * @desc Specifies the window skin for the page screen.
 * @text Page window skin
 * @type file
 * @dir img/system
 * @default 
 * @parent PageWindow
 * 
 * @param EnemyBookStatusSetting
 * @text Enemy status settings
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param EnemyBookDefaultFontSize
 * @desc Default font size (difference from main font)
 * @text Default font size
 * @type number
 * @min -99
 * @default 0
 * @parent EnemyBookStatusSetting
 * 
 * @param UnknownStatus
 * @desc Status display name when status information is not registered.
 * @text Status display name when status information is not registered
 * @type string
 * @default ???
 * @parent EnemyBookStatusSetting
 * 
 * @param UnknownItems
 * @desc Item when status information is not registered, skill display name.*1
 * @text Item when status information is not registered, skill display name
 * @type string
 * @default ?
 * @parent EnemyBookStatusSetting
 * 
 * @param ContentWindowVisible
 * @type boolean
 * @default true
 * @text Monster status window image display
 * @desc Displays window image of monster status.
 * @parent EnemyBookStatusSetting
 * 
 * @param ContentWindowsSkin
 * @desc Specifies the window skin for the enemy status window.
 * @text Enemy status window skin
 * @type file
 * @dir img/system
 * @default 
 * @parent EnemyBookStatusSetting
 * 
 * @param EnemyBookSetting
 * @text Enemy book settings
 * @default ------------------------------
 * @parent EnemyBookStatusSetting
 * 
 * @param PageSetting
 * @desc Enemy Status Window Page Setup. Select the page to be displayed from the display list of display item settings.
 * @text Page settings
 * @type struct<PageSettingData>[]
 * @default ["{\"ListDateSetting\":\"1\",\"PageCategoryName\":\"基本情報\",\"BackGroundImg\":\"\"}","{\"ListDateSetting\":\"2\",\"PageCategoryName\":\"ドロップアイテム\",\"BackGroundImg\":\"\"}","{\"ListDateSetting\":\"3\",\"PageCategoryName\":\"説明\",\"BackGroundImg\":\"\"}"]
 * @parent EnemyBookSetting
 * 
 * @param ContentCols
 * @text Enemy information item col
 * @desc he number of enemy information item cols.
 * @type number
 * @default 2
 * @min 1
 * @parent EnemyBookSetting
 * 
 * @param CategoryBackGroundImg
 * @desc Specify the name of the enemy book background image file when selecting a category.
 * @text Category enemy book background image
 * @type file
 * @dir img/
 * @default 
 * @parent EnemyBookSetting
 * 
 * @param DefaultBackGroundImg
 * @desc Specify the default enemy book background image file name.
 * @text Enemy book background image
 * @type file
 * @dir img/
 * @default 
 * @parent EnemyBookSetting
 * 
 * @param UnregisteredEnemy
 * @desc Specifies the display list of unregistered enemies. If 0, it will not be displayed.
 * @text Unregistered enemy list designation
 * @type select
 * @option None
 * @value 0
 * @option List1
 * @value 1
 * @option List2
 * @value 2
 * @option List3
 * @value 3
 * @option List4
 * @value 4
 * @option List5
 * @value 5
 * @option List6
 * @value 6
 * @option List7
 * @value 7
 * @option List8
 * @value 8
 * @option List9
 * @value 9
 * @option List10
 * @value 10
 * @option List11
 * @value 11
 * @option List12
 * @value 12
 * @option List13
 * @value 13
 * @option List14
 * @value 14
 * @option List15
 * @value 15
 * @option List16
 * @value 16
 * @option List17
 * @value 17
 * @option List18
 * @value 18
 * @option List19
 * @value 19
 * @option List20
 * @value 20 
 * @default 0
 * @parent EnemyBookSetting
 * 
 * @param EnemyInfoSetting
 * @text Enemy information basic settings
 * @default ------------------------------
 * @parent EnemyBookStatusSetting
 * 
 * @param InfoPageSetting
 * @desc Enemy info page settings. Select the display page from the display list of "Display item setting".
 * @text Page settings
 * @type struct<PageSettingData>[]
 * @default ["{\"ListDateSetting\":\"1\",\"PageCategoryName\":\"基本情報\",\"BackGroundImg\":\"\"}","{\"ListDateSetting\":\"2\",\"PageCategoryName\":\"ドロップアイテム\",\"BackGroundImg\":\"\"}","{\"ListDateSetting\":\"3\",\"PageCategoryName\":\"説明\",\"BackGroundImg\":\"\"}"]
 * @parent EnemyInfoSetting
 * 
 * @param InfoContentCols
 * @text Enemy information item col
 * @desc The number of enemy information item columns.
 * @type number
 * @default 2
 * @min 1
 * @parent EnemyInfoSetting
 * 
 * @param InfoStatusGaugeVisible
 * @type boolean
 * @default true
 * @text Show gauge
 * @desc Displays gauges for HP, MP, and TP.
 * @parent EnemyInfoSetting
 * 
 * @param InfoEnemyCurrentStatus
 * @type boolean
 * @default true
 * @text Enemy current status display
 * @desc Displays the enemy's current status.
 * @parent EnemyInfoSetting
 * 
 * @param RegistrationEnemyInfo
 * @desc The registration timing is also reflected in enemy information.
 * @text Enemy information registration timing reflection
 * @type boolean
 * @default false
 * @parent EnemyInfoSetting
 * 
 * @param InfoMaskMode
 * @desc Hide the status if you have not registered the status information.
 * @text Information unregistered status hidden
 * @type boolean
 * @default false
 * @parent EnemyInfoSetting
 * 
 * @param DefaultInfoBackGroundImg
 * @desc Specifies the default enemy information background image file name.
 * @text Enemy information background image
 * @type file
 * @dir img/
 * @default 
 * @parent EnemyInfoSetting
 * 
 * @param AnalyzeSetting
 * @text Analysis basic settings
 * @default ------------------------------
 * @parent EnemyBookStatusSetting
 * 
 * @param AnalyzeSkillMode
 * @desc Configure analysis skills.
 * @text Analyze skill setting
 * @type struct<AnalyzeSkill>[]
 * @default ["{\"ListNumber\":\"0\",\"ContentCols\":\"2\",\"StatusGaugeVisible\":\"true\",\"EnemyCurrentStatus\":\"true\",\"AnalyzeMissMessage\":\"%2 failed to analyze.\",\"BuffColor\":\"0\",\"DebuffColor\":\"0\"}","{\"ListNumber\":\"1\",\"ContentCols\":\"2\",\"StatusGaugeVisible\":\"true\",\"EnemyCurrentStatus\":\"true\",\"AnalyzeMissMessage\":\"%2 failed to analyze.\",\"BuffColor\":\"0\",\"DebuffColor\":\"0\"}"]
 * @parent AnalyzeSetting
 * 
 * @param AnalyzeListData
 * @desc Analyze settings.
 * @text Analyze settings
 * @type struct<AnalyzeList>[]
 * @default ["{\"Name\":\"\",\"AnalyzePageList\":\"[\\\"{\\\\\\\"ListDateSetting\\\\\\\":\\\\\\\"11\\\\\\\",\\\\\\\"PageCategoryName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BackGroundImg\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\"}"]
 * @parent AnalyzeSetting
 * 
 * @param CommonVariableID
 * @desc A variable that substitutes an enemy ID when specifying a common event.
 * @text Enemy ID variable
 * @type variable
 * @default 0
 * @parent AnalyzeSetting
 * 
 * @param BattleEnemyBookSetting
 * @text Battle Enemy Book Common Settings
 * @default ------------------------------
 * @parent EnemyBookStatusSetting
 * 
 * @param HPgaugeWidth
 * @desc HP gauge width.
 * @text HP gauge width
 * @type number
 * @default 200
 * @max 999
 * @min 0
 * @parent BattleEnemyBookSetting
 * 
 * @param MPgaugeWidth
 * @desc MP gauge width.
 * @text MP gauge width
 * @type number
 * @default 200
 * @max 999
 * @min 0
 * @parent BattleEnemyBookSetting
 * 
 * @param TPgaugeWidth
 * @desc TP gauge width.
 * @text TP gauge width
 * @type number
 * @default 200
 * @max 999
 * @min 0
 * @parent BattleEnemyBookSetting
 * 
 * @param BuffColor
 * @desc Numerical color for stat parameters during stat buffs. (Enemy information, analysis)
 * @text Status buff value color
 * @type color
 * @default 0
 * @max 999999
 * @parent BattleEnemyBookSetting
 * 
 * @param DebuffColor
 * @desc Numerical color of status parameters during status debuffs. (Enemy information, analysis)
 * @text Status debuff value color
 * @type color
 * @default 0
 * @max 999999
 * @parent BattleEnemyBookSetting
 * 
 * @param ListData
 * @text Display item setting
 * @default ------------------------------
 * @parent EnemyBookStatusSetting
 * 
 * @param ListData1_10
 * @text Display item setting 1-10
 * @default ------------------------------
 * @parent ListData
 * 
 * @param PageList1
 * @desc List to display.
 * @text display list 1
 * @type struct<PageListData>[]
 * @default ["{\"BasicSetting\":\"\",\"DateSelect\":\"33\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"2\",\"paramName\":\"\",\"NameColor\":\"0\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"false\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"center\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"200\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"false\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"1\",\"X_Position\":\"2\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"2\",\"X_Position\":\"2\",\"Y_Position\":\"3\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"3\",\"X_Position\":\"2\",\"Y_Position\":\"4\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"4\",\"X_Position\":\"2\",\"Y_Position\":\"5\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"5\",\"X_Position\":\"2\",\"Y_Position\":\"6\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"6\",\"X_Position\":\"2\",\"Y_Position\":\"7\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"7\",\"X_Position\":\"2\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"8\",\"X_Position\":\"2\",\"Y_Position\":\"9\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"30\",\"X_Position\":\"1\",\"Y_Position\":\"11\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"31\",\"X_Position\":\"2\",\"Y_Position\":\"11\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"32\",\"X_Position\":\"2\",\"Y_Position\":\"10\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"false\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"41\",\"X_Position\":\"1\",\"Y_Position\":\"12\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"46\",\"X_Position\":\"2\",\"Y_Position\":\"12\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"40\",\"X_Position\":\"1\",\"Y_Position\":\"14\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"45\",\"X_Position\":\"2\",\"Y_Position\":\"14\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}"]
 * @parent ListData1_10
 *  
* @param PageList2
* @desc List to display.
* @text display list 2
* @type struct<PageListData>[]
* @default ["{\"BasicSetting\":\"\",\"DateSelect\":\"33\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"2\",\"paramName\":\"\",\"NameColor\":\"0\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"false\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"center\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"200\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"false\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"1\",\"X_Position\":\"2\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"2\",\"X_Position\":\"2\",\"Y_Position\":\"3\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"3\",\"X_Position\":\"2\",\"Y_Position\":\"4\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"4\",\"X_Position\":\"2\",\"Y_Position\":\"5\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"5\",\"X_Position\":\"2\",\"Y_Position\":\"6\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"6\",\"X_Position\":\"2\",\"Y_Position\":\"7\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"7\",\"X_Position\":\"2\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"8\",\"X_Position\":\"2\",\"Y_Position\":\"9\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"60\",\"X_Position\":\"1\",\"Y_Position\":\"10\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"2\",\"paramName\":\"ドロップアイテム\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}"]
* @parent ListData1_10
* 
* @param PageList3
* @desc List to display.
* @text display list 3
* @type struct<PageListData>[]
* @default ["{\"BasicSetting\":\"\",\"DateSelect\":\"33\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"2\",\"paramName\":\"\",\"NameColor\":\"0\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"false\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"center\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"200\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"false\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"1\",\"X_Position\":\"2\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"2\",\"X_Position\":\"2\",\"Y_Position\":\"3\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"3\",\"X_Position\":\"2\",\"Y_Position\":\"4\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"4\",\"X_Position\":\"2\",\"Y_Position\":\"5\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"5\",\"X_Position\":\"2\",\"Y_Position\":\"6\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"6\",\"X_Position\":\"2\",\"Y_Position\":\"7\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"7\",\"X_Position\":\"2\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"8\",\"X_Position\":\"2\",\"Y_Position\":\"9\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"70\",\"X_Position\":\"1\",\"Y_Position\":\"10\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"2\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"desc\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}"]
* @parent ListData1_10
* 
* @param PageList4
* @desc List to display.
* @text display list 4
* @type struct<PageListData>[]
* @default []
* @parent ListData1_10
* 
* @param PageList5
* @desc List to display.
* @text display list 5
* @type struct<PageListData>[]
* @default []
* @parent ListData1_10
* 
* @param PageList6
* @desc List to display.
* @text display list 6
* @type struct<PageListData>[]
* @default []
* @parent ListData1_10
* 
* @param PageList7
* @desc List to display.
* @text display list 7
* @type struct<PageListData>[]
* @default []
* @parent ListData1_10
* 
* @param PageList8
* @desc List to display.
* @text display list 8
* @type struct<PageListData>[]
* @default []
* @parent ListData1_10
* 
* @param PageList9
* @desc List to display.
* @text display list 9
* @type struct<PageListData>[]
* @default []
* @parent ListData1_10
* 
* @param PageList10
* @desc List to display.
* @text display list 10
* @type struct<PageListData>[]
* @default []
* @parent ListData1_10
* 
* @param ListData11_20
* @text Display item setting 11-20
* @default ------------------------------
* @parent ListData
* 
* @param PageList11
* @desc List to display.
* @text display list 11
* @type struct<PageListData>[]
* @default ["{\"BasicSetting\":\"\",\"DateSelect\":\"33\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"2\",\"paramName\":\"\",\"NameColor\":\"0\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"false\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"center\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"200\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"false\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"1\",\"X_Position\":\"2\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"2\",\"X_Position\":\"2\",\"Y_Position\":\"3\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"3\",\"X_Position\":\"2\",\"Y_Position\":\"4\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"4\",\"X_Position\":\"2\",\"Y_Position\":\"5\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"5\",\"X_Position\":\"2\",\"Y_Position\":\"6\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"6\",\"X_Position\":\"2\",\"Y_Position\":\"7\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"7\",\"X_Position\":\"2\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"8\",\"X_Position\":\"2\",\"Y_Position\":\"9\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"30\",\"X_Position\":\"1\",\"Y_Position\":\"11\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"31\",\"X_Position\":\"2\",\"Y_Position\":\"11\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"41\",\"X_Position\":\"1\",\"Y_Position\":\"12\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"46\",\"X_Position\":\"2\",\"Y_Position\":\"12\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"40\",\"X_Position\":\"1\",\"Y_Position\":\"14\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"45\",\"X_Position\":\"2\",\"Y_Position\":\"14\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}"]
* @parent ListData11_20
* 
* @param PageList12
* @desc List to display.
* @text display list 12
* @type struct<PageListData>[]
* @default []
* @parent ListData11_20
* 
* @param PageList13
* @desc List to display.
* @text display list 13
* @type struct<PageListData>[]
* @default []
* @parent ListData11_20
* 
* @param PageList14
* @desc List to display.
* @text display list 14
* @type struct<PageListData>[]
* @default []
* @parent ListData11_20
* 
* @param PageList15
* @desc List to display.
* @text display list 15
* @type struct<PageListData>[]
* @default []
* @parent ListData11_20
* 
* @param PageList16
* @desc List to display.
* @text display list 16
* @type struct<PageListData>[]
* @default []
* @parent ListData11_20
* 
* @param PageList17
* @desc List to display.
* @text display list 17
* @type struct<PageListData>[]
* @default []
* @parent ListData11_20
* 
* @param PageList18
* @desc List to display.
* @text display list 18
* @type struct<PageListData>[]
* @default []
* @parent ListData11_20
* 
* @param PageList19
* @desc List to display.
* @text display list 19
* @type struct<PageListData>[]
* @default []
* @parent ListData11_20
* 
* @param PageList20
* @desc List to display.
* @text display list 20
* @type struct<PageListData>[]
* @default []
* @parent ListData11_20
* 
* @param DropItemData
* @text Drop item settings
* @default ------------------------------
* @parent EnemyBookStatusSetting
* 
* @param DropItemProbabilityShow
* @desc Display probabilities.
* @text Probability display
* @type boolean
* @default true
* @parent DropItemData
* 
* @param DropRateEval
* @desc Defines the drop rate evaluation formula.  rate:denominator  di:drop information
* @text Drop rate evaluation formula
* @type combo
* @option "'1/'+ rate"
* @option "ge.getDropItemsRatePercentage(di) +'%';//NUUN_DropRatePercentageVer.1.0.1～"
* @option "ge.dropItemMolecule(i) +'/'+ rate;//NUUN_DropItemMolecule"
* @default 
* @parent DropItemData
* 
* @param ShowDropItemName
* @desc Hide unconfirmed drop items. 
* @text Unconfirmed drop item name
* @type boolean
* @default false
* @parent DropItemData
* 
* @param DropItemMultiCols
* @desc Display column for drop items.
* @text Display col
* @type number
* @min 1
* @default 1
* @parent DropItemData
* 
* @param CondDropData
* @text Conditional drop item settings
* @default ------------------------------
* @parent DropItemData
* 
* @param CondDropItemCols
* @desc Display column for conditional drop items.
* @text Display col
* @type number
* @min 1
* @default 1
* @parent CondDropData
* 
* @param StealItemData
* @text Steel item settings
* @default ------------------------------
* @parent EnemyBookStatusSetting
* 
* @param StealItemProbabilityShow
* @desc Display probabilities.
* @text Probability display
* @type boolean
* @default true
* @parent StealItemData
* 
* @param StealRateEval
* @desc Define the steal rate evaluation formula. rate: Steal rate (percentage)
* @text Steal rate evaluation formula
* @type combo
* @option "rate +'%';//Steal rate"
* @default 
* @parent StealItemData
* 
* @param ShowStealItemName
* @desc Hide unidentified stealable items.
* @text Unconfirmed stealable item name
* @type boolean
* @default false
* @parent StealItemData
* 
* @param StealItemCols
* @desc Display column for steel items.
* @text Display col
* @type number
* @min 1
* @default 1
* @parent StealItemData
* 
* @param ActionData
* @text Enemy use skill setting
* @default ------------------------------
* @parent EnemyBookStatusSetting
* 
* @param ShowActionName
* @desc Hide unconfirmed use skills. 
* @text Unconfirmed use skill display
* @type boolean
* @default false
* @parent ActionData
* 
* @param ActionMaxItems
* @desc Maximum number of items to display. (0 for no limit)
* @text Maximum number of items
* @type number
* @default 0
* @min 0
* @parent ActionData
* 
* @param ActionCols
* @desc Enemy skill display column.
* @text Display col
* @type number
* @min 1
* @default 1
* @parent ActionData
 * 
 * @param ElementIconSetting
 * @text Display attribute icon settings
 * @default ------------------------------
 * @parent EnemyBookStatusSetting
 * 
 * @param ElementList
 * @desc Element to display. (Common to attribute icons, resistance list, and radar chart)
 * @text Display element
 * @type struct<ElementData>[]
 * @default ["{\"ElementNo\":\"1\",\"ElementIconId\":\"76\"}","{\"ElementNo\":\"2\",\"ElementIconId\":\"64\"}","{\"ElementNo\":\"3\",\"ElementIconId\":\"65\"}","{\"ElementNo\":\"4\",\"ElementIconId\":\"66\"}","{\"ElementNo\":\"5\",\"ElementIconId\":\"67\"}","{\"ElementNo\":\"6\",\"ElementIconId\":\"68\"}","{\"ElementNo\":\"7\",\"ElementIconId\":\"69\"}","{\"ElementNo\":\"8\",\"ElementIconId\":\"70\"}","{\"ElementNo\":\"9\",\"ElementIconId\":\"71\"}"]
 * @parent ElementIconSetting
 * 
 * @param ElementUnknownIconId
 * @desc Specifies the ID of the element icon to be displayed when the status information is not registered.
 * @text Element icon ID when status information is not registered
 * @type icon
 * @default 0
 * @parent ElementIconSetting
 * 
* @param ResistWeakElementData
* @text Attribute resistance setting
* @default ------------------------------
* @parent EnemyBookStatusSetting
* 
* @param ElementIcon
* @text Element resistance (icon display) setting
* @default ------------------------------
* @parent ResistWeakElementData
* 
* @param ResistNoEffectElement
* @desc Invalidity is reflected in the element which is hard to work.
* @text Disabled reflected in less effective elements
* @type boolean
* @default true
* @parent ElementIcon
 * 
 * @param AbsorptionNoEffectElement
 * @desc Reflects the absorption attribute as invalid. A separate plug-in is required for absorption attributes.
 * @text Disable reflection of absorption attributes
 * @type boolean
 * @default true
 * @parent ElementIcon
* 
* @param ElementValue
* @text Element resistance (resistance numerical display)
* @default ------------------------------
* @parent ResistWeakElementData
* 
* @param ResistWeakElementMode
* @text Element resistance display mode
* @desc Specifies the type to display.
* @type select
* @option element name
* @value 0
* @option Icon
* @value 1
* @option Element name and icon
* @value 2
* @default 2
* @parent ElementValue
* 
* @param ElementCol
* @desc Display column of element resistance.
* @text Element resistance display column
* @type number
* @default 1
* @parent ElementValue
* 
* @param ElementRadarChart
* @text Element resistance radar chart
* @default ------------------------------
* @parent ResistWeakElementData
* 
* @param ElementRadarChartRadius
* @desc Radar chart radius.
* @text Radar chart radius
* @type number
* @default 100
* @parent ElementRadarChart
* 
* @param ElementRadarChartFramecolor
* @desc Set the border color of the radar chart.
* @text Radar chart frame color
* @type color
* @default 15
* @parent ElementRadarChart
* 
* @param ElementRadarChartLineColor
* @desc Sets the line color of the radar chart.
* @text Radar chart line color
* @type color
* @default 15
* @parent ElementRadarChart
* 
* @param ElementRadarChartMainColor1
* @desc Sets the background color of the center of the radar chart.
* @text Radar chart center background color
* @type color
* @default 3
* @parent ElementRadarChart
* 
* @param ElementRadarChartMainColor2
* @desc Sets the outer background color of the radar chart.
* @text Radar chart outer background color
* @type color
* @default 3
* @parent ElementRadarChart
* 
* @param ElementRadarChartX
* @desc Radar chart X coordinate (relative).
* @text Radar chart X coordinate
* @type number
* @min -9999
* @default 48
* @parent ElementRadarChart
* 
* @param ElementRadarChartY
* @desc Radar chart Y coordinate (relative).
* @text Radar chart Y coordinate
* @type number
* @min -9999
* @default 48
* @parent ElementRadarChart
* 
* @param ElementRadarChart_FontSize
* @desc Font size. (from main font)
* @text Font siz
* @type number
* @default -12
* @min -9999
* @parent ElementRadarChart
* 
* @param NUUN_EnemyBookEX_1
* @text (Required NUUN_EnemyBookEX_1)
* @default ------------------------------
* @parent ResistWeakElementData
* 
* @param ShowElementsIcon
* @desc Hides unconfirmed resistance weakness attributes.
* @text Hide Unverified Attributes(requires NUUN_EnemyBookEX_1)
* @type boolean
* @default false
* @parent NUUN_EnemyBookEX_1
 * 
 * @param StateIconSetting
 * @text Display attribute icon settings
 * @default ------------------------------
 * @parent EnemyBookStatusSetting
 * 
 * @param StateList
 * @desc State to display.
 * @text Display state
 * @type struct<StateData>[]
 * @default ["{\"StateId\":\"1\"}","{\"StateId\":\"4\"}","{\"StateId\":\"5\"}","{\"StateId\":\"6\"}","{\"StateId\":\"7\"}","{\"StateId\":\"8\"}","{\"StateId\":\"9\"}","{\"StateId\":\"10\"}","{\"StateId\":\"12\"}","{\"StateId\":\"13\"}"]
 * @parent StateIconSetting
 * 
 * @param StateUnknownIconId
 * @desc Specify the ID of the state icon to be displayed when the status information is not registered.
 * @text State icon ID when status information is not registered
 * @type icon
 * @default 0
 * @parent StateIconSetting
 * 
* @param ResistWeakStateData
* @text State resistance setting
* @default ------------------------------
* @parent EnemyBookStatusSetting
* 
* @param ResistWeakStateIcon
* @text State resistance (icon display) setting
* @default ------------------------------
* @parent ResistWeakStateData
* 
* @param NormalWeakState
* @desc Apply valid states with 100% or higher effectiveness. If it is OFF, it will be 101% or more.
* @text Effective attribute effectiveness (applied at 100% or more)
* @type boolean
* @default false
* @parent ResistWeakStateIcon
* 
* @param ResistNoEffectState
* @desc Apply invalid to less effective state. When OFF, the state with 0% resistance is displayed in the resistance state.
* @text Apply invalid to less effective state
* @type boolean
* @default true
* @parent ResistWeakStateIcon
 * 
 * @param ResistDebuffInState
 * @desc Applies debuff resistance to state resistance and immunity. The display debuff is set with "DeBuffList".
 * @text Resistance null debuff applied
 * @type boolean
 * @default false
 * @parent ResistWeakStateIcon
* 
* @param ResistWeakStateValue
* @text Resistance state (resistance numerical display) setting
* @default ------------------------------
* @parent ResistWeakStateData
* 
* @param ResistWeakStateMode
* @text State display mode
* @desc Specifies the type to display.
* @type select
* @option State name
* @value 0
* @option Icon
* @value 1
* @option State name and icon
* @value 2
* @default 2
* @parent ResistWeakStateValue
* 
* @param StateCol
* @desc Display column for state resistance.
* @text State resistance display col
* @type number
* @default 1
* @parent ResistWeakStateValue
* 
* @param StateRadarChart
* @text State resistance radar chart
* @default ------------------------------
* @parent ResistWeakStateData
* 
* @param StateRadarChartRadius
* @desc Radar chart radius.
* @text Radar chart radius
* @type number
* @default 100
* @parent StateRadarChart
* 
* @param StateRadarChartFramecolor
* @desc Set the border color of the radar chart.
* @text Radar chart frame color
* @type color
* @default 15
* @parent StateRadarChart
* 
* @param StateRadarChartLineColor
* @desc Sets the line color of the radar chart.
* @text Radar chart line color
* @type color
* @default 15
* @parent StateRadarChart
* 
* @param StateRadarChartMainColor1
* @desc Sets the background color of the center of the radar chart.
* @text Radar chart center background color
* @type color
* @default 3
* @parent StateRadarChart
* 
* @param StateRadarChartMainColor2
* @desc Sets the outer background color of the radar chart.
* @text Radar chart outer background color
* @type color
* @default 3
* @parent StateRadarChart
* 
* @param StateRadarChartX
* @desc Radar chart X coordinate (relative).
* @text Radar chart X coordinate
* @type number
* @min -9999
* @default 48
* @parent StateRadarChart
* 
* @param StateRadarChartY
* @desc Radar chart Y coordinate (relative).
* @text Radar chart Y coordinate
* @min -9999
* @type number
* @default 48
* @parent StateRadarChart
* 
* @param StateRadarChart_FontSize
* @desc Font size. (from main font)
* @text Font size
* @type number
* @default -12
* @min -9999
* @parent StateRadarChart
* 
* @param RadarChartIcon
* @desc Display the state display as an icon. OFF is the state name
* @text Icon display
* @type boolean
* @default true
* @parent StateRadarChart
* 
* @param NUUN_EnemyBookEX_1_State
* @text (requires NUUN_EnemyBookEX_1)
* @default ------------------------------
* @parent ResistWeakStateData
* 
* @param ShowStateIcon
* @desc Hide the state of unconfirmed resistance weaknesses.
* @text Hide unconfirmed state (requires NUUN_EnemyBookEX_1)
* @type boolean
* @default false
* @parent NUUN_EnemyBookEX_1_State
* 
* @param ResistWeakDebuffData
* @text Debuff resistance weak point setting
* @default ------------------------------
* @parent EnemyBookStatusSetting
* 
* @param DeBuffList
* @desc Debuff to display.
* @text Display debuff
* @type struct<DebuffData>[]
* @default ["{\"ParamId\":\"0\",\"DebuffIconId\":\"48\"}","{\"ParamId\":\"1\",\"DebuffIconId\":\"49\"}","{\"ParamId\":\"2\",\"DebuffIconId\":\"50\"}","{\"ParamId\":\"3\",\"DebuffIconId\":\"51\"}","{\"ParamId\":\"4\",\"DebuffIconId\":\"52\"}","{\"ParamId\":\"5\",\"DebuffIconId\":\"53\"}","{\"ParamId\":\"6\",\"DebuffIconId\":\"54\"}","{\"ParamId\":\"7\",\"DebuffIconId\":\"55\"}"]
* @parent ResistWeakDebuffData
 * 
 * @param NormalWeakDebuff
 * @desc Effective debuffs are reflected from 100% or more effectiveness. If it is OFF, it will be 101% or more.
 * @text Easy-to-effect debuff effectiveness 100% applied
 * @type boolean
 * @default false
 * @parent ResistWeakDebuffData
 * 
 * @param ResistNoEffectDebuff
 * @desc Invalidity is reflected in debuffs that are difficult to work. When OFF, resistance 0% is displayed in the resistance debuff.
 * @text Invalid reflection on debuffs that are difficult to work
 * @type boolean
 * @default true
 * @parent ResistWeakDebuffData
* 
* @param DeBuffUnknownIconId
* @desc Specifies the ID of the debuff icon to be displayed when status information is not registered.
* @text Debuff icon ID when status information is not registered
* @type icon
* @default 0
* @parent ResistWeakDebuffData
* 
* @param NUUN_EnemyBookEX_1_DeBuff
* @text (requires NUUN_EnemyBookEX_1)
* @default ------------------------------
* @parent ResistWeakDebuffData
* 
* @param ShowDebuffIcon
* @desc Hides unconfirmed state debuffs of resistance weaknesses.
* @text Hide unidentified debuffs (requires NUUN_EnemyBookEX_1)
* @type boolean
* @default false
* @parent NUUN_EnemyBookEX_1_DeBuff
* 
* 
* 
* @command EnemyBookOpen
* @desc Open the enemy book.
* @text Enemy book open
* 
* @command EnemyInfoOpen
* @desc Open enemy information.
* @text Enemy information display
* 
* @command EnemyBookAdd
* @desc Add an enemy to the picture book. No status information is registered.
* @text Added enemy
* 
* @arg enemyId
* @type enemy
* @default 0
* @desc Specifies the enemy ID.
* 
* @command EnemyBookRemove
* @desc Removes enemies from the enemy book.
* @text Enemy deletion
* 
* @arg enemyId
* @type enemy
* @default 0
* @desc Specifies the enemy ID.
* 
* @command EnemyBookStatusAdd
* @desc Register enemy status information. It also performs the processing of "enemy addition".
* @text Enemy status information registration
* 
* @arg enemyId
* @type enemy
* @default 0
* @desc Specifies the enemy ID.
* 
* @command EnemyBookStatusRemove
* @desc Removes enemy status information.
* @text Remove enemy status information
* 
* @arg enemyId
* @type enemy
* @default 0
* @desc Specifies the enemy ID.
* 
* @command EnemyBookComplete
* @desc Complete the enemy book.
* @text Enemy book completed
* 
* @command EnemyBookClear
* @desc Clear (delete all) the enemy book.
* @text Initialize Enemy Book
* 
* @command EnemyBookAddDefeat
* @desc Makes the enemy defeated.
* @text Enemy defeated
* 
* @arg enemyId
* @type enemy
* @default 0
* @desc Specifies the enemy ID.
*  
* @command EnemyBookRemoveDefeat
* @desc Reset the number of defeated monsters.(If 0 is specified, the number of defeats of all enemies is reset.)
* @text Reset number of kills
* 
* @arg enemyId
* @type enemy
* @default 0
* @desc Specifies the enemy ID.
* 
* @command EnemyBookGetDropItem
* @desc Makes the enemy's gain item acquired.
* @text Acquired enemy drop items
* 
* @arg enemyId
* @type enemy
* @default 0
* @desc Specifies the enemy ID.
* 
* @arg dropListId
* @type number
* @default 0
* @text Drop item list ID
* @desc Specifies the drop item list ID. (All acquired by specifying 0)
* 
* @command EnemyBookRemoveDropItem
* @desc Makes the enemy's steal item acquired.
* @text Unobtained enemy drop items
* 
* @arg enemyId
* @type enemy
* @default 0
* @desc Specifies the enemy ID.
* 
* @arg dropListId
* @type number
* @default 0
* @text Drop item list ID
* @desc Specifies the drop item list ID. (If 0 is specified, all will be unacquired)
* 
* @command EnemyBookGetStealItem
* @desc Makes the enemy's steal item unacquired.
* @text Acquired enemy steal item
*
* @arg enemyId
* @type enemy
* @default 0
* @desc Specifies the enemy ID.
* 
* @arg stealListId
* @type number
* @default 0
* @text Steel Item List ID
* @desc Specifies the steal item list ID. (If 0 is specified, all will be acquired)
* 
* @command EnemyBookRemoveStealItem
* @desc Makes the enemy's steal item unacquired.
* @text Enemy steal item not acquired
* @type 0
* @default 0
* 
* @arg enemyId
* @type enemy
* @default 0
* @desc Specifies the enemy ID.
* 
* @arg stealListId
* @type number
* @default 0
* @text Steel Item List ID
* @desc Specifies the steal item list ID. (If 0 is specified, all will be unacquired)
* 
* @command EnemyBookDefeatEnemy
* @desc Stores the number of defeated enemies in a variable.
* @text Total Killed Number of Enemies
* 
* @arg DefeatEnemy
* @type variable
* @default 0
* @text Variable
* @desc Specify a variable to substitute the number of defeated enemies.
* 
* @command EnemyBookEncounteredEnemy
* @desc Stores the number of enemies encountered in a variable.
* @text Encounter Count
* 
* @arg EncounteredEnemy
* @type variable
* @default 0
* @text Variable
* @desc Specifies a variable to substitute the number of monsters encountered.
* 
* @command EnemyBookCompleteRate
* @desc Stores the completion rate of the enemy book.
* @text Enemy book completion rate
* 
* @arg CompleteRate
* @type variable
* @default 0
* @text Variable
* @desc Specify a variable to assign the completion rate of the enemy book.
* 
* @command EnemyBookRegistration
* @desc Determines if the enemy is registered in the enemy book.
* @text Enemy book registered judgment
* 
* @arg enemyId
* @type enemy
* @default 0
* @text Enemy
* @desc Specifies the enemy ID.
* 
* @arg registrationSwitch
* @type switch
* @default 0
* @text Switch
* @desc Specifies a switch that substitutes whether the enemy is registered in the enemy book.
* 
* @command EnemyBookStatusRegistration
* @desc Determines if the enemy's status information has been registered in the enemy book.
* @text Status information registered judgment
* 
* @arg enemyId
* @type enemy
* @default 0
* @text Enemy
* @desc Specifies the enemy ID.
* 
* @arg statusRegistrationSwitch
* @type switch
* @default 0
* @text Switch
* @desc Specifies a switch that substitutes whether the enemy is registered in the enemy book.
* 
* @command EnemyBookDefeatEnemySum
* @desc Stores the number of kills for the specified enemy in a variable.
* @text Total number of kills.
* 
* @arg enemyId
* @type enemy
* @default 0
* @text Enemy
* @desc Specifies the enemy ID.
* 
* @arg DefeatEnemySum
* @type variable
* @default 0
* @text Variable
* @desc Specify a variable to substitute the number of defeated monsters.
* 
* @command DorpItemAcquired
* @desc Determines if the specified item has been dropped.
* @text Item drop judgment
* 
* @arg enemyId
* @type enemy
* @default 0
* @desc Specifies the enemy ID.
* 
* @arg DorpItemAcquiredId
* @type number
* @default 0
* @text Item drop list ID
* @desc Specifies the item drop list ID.  (Judge all by specifying 0)
* 
* @arg DorpItemAcquiredswitch
* @type switch
* @default 0
* @text Switch
* @desc Specifies a switch that substitutes whether the item has been dropped.
* 
* @command StealItemAcquired
* @desc Determine if you have stolen the specified item.
* @text Item stolen judgment
* 
* @arg enemyId
* @type enemy
* @default 0
* @desc Specifies the enemy ID.
* 
* @arg stealAcquiredId
* @type number
* @default 0
* @text Steel Item List ID
* @desc Specifies the steal item list ID. (Judge all by specifying 0)
* 
* @arg StealAcquiredswitch
* @type switch
* @default 0
* @text Switch
* @desc Specifies the switch ID that determines whether the specified item has been steal.
* 
* @command EnemyBookActionAdd
* @desc Changes the enemy's "unconfirmed" skills to "confirmed".
* @text Unconfirmed use skill confirmed
* 
* @arg enemyId
* @type enemy
* @default 0
* @desc Specifies the enemy ID.
* 
* @arg actionId
* @type number
* @default 0
* @text Behavior pattern ID
* @desc Behavior pattern ID (the top is number 1) (Judge all by specifying 0)
* 
* @command EnemyBookActionRemove
* @desc Changes the enemy's "confirmed" use skill to "unconfirmed".
* @text Confirmed skill used Unconfirmed
* 
* @arg enemyId
* @type enemy
* @default 0
* @desc Specifies the enemy ID.
* 
* @arg actionId
* @type number
* @default 0
* @text Behavior pattern ID
* @desc Behavior pattern ID (the top is number 1) (Judge all by specifying 0)
* 
* @command EnemyBookElementAdd
* @desc Changes the enemy's "unconfirmed" attribute resistance weakness information to "confirmed". (requires NUUN_EnemyBookEX_1)
* @text Unconfirmed attribute resistance information confirmed
* 
* @arg enemyId
* @type enemy
* @default 0
* @desc Specifies the enemy ID.
* 
* @arg elementId
* @type number
* @default 0
* @text Element ID
* @desc Attribute ID (attribute of database type tag) (Judge all by specifying 0)
* 
* @command EnemyBookElementRemove
* @desc Changes the enemy's "confirmed" attribute resistance weakness information to "unconfirmed". (requires NUUN_EnemyBookEX_1)
* @text Confirmed attribute resistance information unconfirmed
* 
* @arg enemyId
* @type enemy
* @default 0
* @desc Specifies the enemy ID.
* 
* @arg elementId
* @type number
* @default 0
* @text Element ID
* @desc Attribute ID (attribute of database type tag) (Judge all by specifying 0)
* 
* @command EnemyBookStateAdd
* @desc Changes the enemy's "unconfirmed" state resistance weakness information to "confirmed". (requires NUUN_EnemyBookEX_1)
* @text Unconfirmed state resistance information Confirmed
* 
* @arg enemyId
* @type enemy
* @default 0
* @desc Specifies the enemy ID.
* 
* @arg stateId
* @type state
* @default 0
* @text State ID
* @desc State ID (attribute of database type tag) (Judge all by specifying 0)
* 
* @command EnemyBookStateRemove
* @desc Changes the enemy's "confirmed" state resistance weakness information to "unconfirmed". (requires NUUN_EnemyBookEX_1)
* @text Confirmed state resistance information unconfirmed
* 
* @arg enemyId
* @type enemy
* @default 0
* @desc Specifies the enemy ID.
* 
* @arg stateId
* @type state
* @default 0
* @text State ID
* @desc State ID (attribute of database type tag) (Judge all by specifying 0)
* 
* @command EnemyBookDebuffAdd
* @desc Changes the enemy's "unconfirmed" debuff resistance weakness information to "confirmed". (requires NUUN_EnemyBookEX_1)
* @text Unconfirmed debuff resistance information Confirmed
* 
* @arg enemyId
* @type enemy
* @default 0
* @desc Specifies the enemy ID.
* 
* @arg debuffId
* @text Debuff target
* @desc Specifies the debuff target to be confirmed.
* @type select
* @option HP
* @value 0
* @option MP
* @value 1
* @option ATK
* @value 2
* @option DEF
* @value 3
* @option MAT
* @value 4
* @option MDF
* @value 5
* @option AGI
* @value 6
* @option LUK
* @value 7
* @option ALL
* @value -1
* @default -1
* 
* @command EnemyBookDebuffRemove
* @desc Changes the enemy's "confirmed" debuff resistance weakness information to "unconfirmed". (requires NUUN_EnemyBookEX_1)
* @text Confirmed debuff resistance information unconfirmed
* 
* @arg enemyId
* @type enemy
* @default 0
* @desc Specifies the enemy ID.
* 
* @arg debuffId
* @text Debuff target
* @desc Specifies the debuff target to be unconfirmed.
* @type select
* @option HP
* @value 0
* @option MP
* @value 1
* @option ATK
* @value 2
* @option DEF
* @value 3
* @option MAT
* @value 4
* @option MDF
* @value 5
* @option AGI
* @value 6
* @option LUK
* @value 7
* @option ALL
* @value -1
* @default -1
* 
*/
/*~struct~RegistrationTimingList:
* 
* @param RegistrationTiming
* @text Registration timing
* @desc Book registration time.
* @type select
* @option Start of battle
* @value 0
* @option Defeat
* @value 1
* @option When analysis is successful
* @value 2
* @option End of battle
* @value 4
* @option No registration
* @value 10
* @default 0
* 
* @param RegisterStatus
* @desc Register status information.
* @text Status information registration
* @type boolean
* @default true
* 
*/
/*~struct~PageListData:
* 
* @param BasicSetting
* @text Basic setting
* @default
* 
* @param DateSelect
* @desc Specify the items to be displayed.
* @text item list
* @type select
* @option None
* @value 0
* @option MaxHP(1)~(14)(16)(20)(21)
* @value 1
* @option MaxMP(1)~(14)(16)(20)(21)
* @value 2
* @option ATK(1)~(14)(16)(20)(21)
* @value 3
* @option DEF(1)~(14)(16)(20)(21)
* @value 4
* @option MAT(1)~(14)(16)(20)(21)
* @value 5
* @option MDF(1)~(14)(16)(20)(21)
* @value 6
* @option AGI(1)~(14)(16)(20)(21)
* @value 7
* @option LUK(1)~(14)(16)(20)(21)
* @value 8
* @option TP (Only when the current status is ON)(1)~(16)(20)(21)
* @value 9
* @option Hit(1)~(16)(20)(21)
* @value 10
* @option Evasion(1)~(16)(20)(21)
* @value 11
* @option Critcal rate(1)~(16)(20)(21)
* @value 12
* @option Critcal evade(1)~(16)(20)(21)
* @value 13
* @option Magic evade(1)~(16)(20)(21)
* @value 14
* @option Magic reflect(1)~(16)(20)(21)
* @value 15
* @option Counter(1)~(16)(20)(21)
* @value 16
* @option HP regen(1)~(16)(20)(21)
* @value 17
* @option MP regen(1)~(16)(20)(21)
* @value 18
* @option TP regen(1)~(16)(20)(21)
* @value 19
* @option Aggro(1)~(16)(20)(21)
* @value 20
* @option Guard(1)~(16)(20)(21)
* @value 21
* @option Recovery(1)~(16)(20)(21)
* @value 22
* @option Item effect(1)~(16)(20)(21)
* @value 23
* @option MP cost(1)~(16)(20)(21)
* @value 24
* @option TP charge(1)~(16)(20)(21)
* @value 25
* @option Physical damage(1)~(16)(20)(21)
* @value 26
* @option Magical damage(1)~(16)(20)(21)
* @value 27
* @option Gain exp(1)~(14)(16)(20)(21)
* @value 30
* @option Gain gold(1)~(14)(16)(20)(21)
* @value 31
* @option Knocked down number(1)~(14)(16)(20)(21)
* @value 32
* @option Enemy name(1)~(5)(7)(8)(9)(12)(16)(20)(21)
* @value 33
* @option Level (Only in battle)(1)~(12)(16)(20)(21)
* @value 34
* @option Name(1)~(5)(7)(8)(9)(12)(16)(20)(21)
* @value 35
* @option Turn (displayed only when the current status is ON in TPB battle)(1)~(14)(16)(20)(21)
* @value 36
* @option Enemy book number(1)~(5)(7)(8)(9)(12)(16)
* @value 37
* @option Resistance element (icon display)(1)~(5)(7)(8)(9)(12)(13)(20)(21)
* @value 40
* @option Weakness element (icon display)(1)~(5)(7)(8)(9)(12)(13)(20)(21)
* @value 41
* @option Disabled element (icon display)(1)~(5)(7)(8)(9)(12)(13)(20)(21)
* @value 42
* @option Element resistance (resistance numerical display)(1)~(16)(20)(21)
* @value 43
* @option Absorp element (icon display)(1)~(5)(7)(8)(9)(12)(13)(20)(21)
* @value 44
* @option Resistance state (icon display)(1)~(5)(7)(8)(9)(12)(13)(20)(21)
* @value 45
* @option Weakness state (icon display)(1)~(5)(7)(8)(9)(12)(13)(20)(21)
* @value 46
* @option Disabled state (icon display)(1)~(5)(7)(8)(9)(12)(13)(20)(21)
* @value 47
* @option Resistance state (resistance numerical display)(1)~(16)(20)(21)
* @value 48
* @option Resistance debuff (icon display)(1)~(5)(7)(8)(9)(12)(13)(20)(21)
* @value 50
* @option Weakness debuff (icon display)(1)~(5)(7)(8)(9)(12)(13)(20)(21)
* @value 51
* @option Drop item(1)~(15)(20)(21)
* @value 60
* @option Items to steal(1)~(15)(20)(21)
* @value 61
* @option Conditional drop item(1)~(15)(20)(21)
* @value 62
* @option Description field(1)~(5)(7)(8)(9)(12)(13)(17)(20)(21)
* @value 70
* @option Common description field(1)~(5)(7)(8)(9)(12)(13)(20)(20)(21)
* @value 71
* @option Original parameter(1)~(16)(20)(21)
* @value 80
* @option AttackElement(1)～(5)(7)(8)(9)(12)(13)(20)(21)
* @value 90
* @option Enemy use skill(1)~(15)(20)(21)
* @value 100
* @option Element radar chart(1)~(5)(8)(9)(12)(20)(21)
* @value 121
* @option State radar chart(1)~(5)(8)(9)(12)(20)(21)
* @value 122
* @option Enemy picture(1)(2)(3)(4)(5)(7)(19)
* @value 200
* @option Chara chip(1)(2)(3)(4)(13)
* @value 201
* @option Common image(1)(2)(3)(4)(5)(7)(18)(19)
* @value 250
* @option Individual image(1)(2)(3)(4)(5)(7)(19)
* @value 251
* @option switch page(1)~(5)(7)(8)(9)(12)(16)
* @value 500
* @option Line(1)(2)(3)(4)(5)(7)(9)
* @value 1000
* @default 0
* @parent BasicSetting
* 
* @param X_Position
* @text X display row position(1)
* @desc X display row position
* @type number
* @default 1
* @min 1
* @max 3
* @parent BasicSetting
* 
* @param Y_Position
* @desc Y display row position
* @text Y display row position(2)
* @type number
* @default 1
* @min 1
* @parent BasicSetting
* 
* @param X_Coordinate
* @text X coordinate (relative)(3)
* @desc X coordinate (relative coordinate from X display column position)
* @type number
* @default 0
* @min -9999
* @parent BasicSetting
* 
* @param Y_Coordinate
* @text Y coordinate (relative)(4)
* @desc Y coordinate (relative coordinate from Y display column position)
* @type number
* @default 0
* @min -9999
* @parent BasicSetting
* 
* @param ItemWidth
* @desc Item width (automatically set to 0)
* @text Item width(5)
* @type number
* @default 0
* @min 0
* @parent BasicSetting
* 
* @param SystemItemWidth
* @desc Width of item name (automatically set to 0)
* @text Item name Width(6)
* @type number
* @default 0
* @min 0
* @parent BasicSetting
* 
* @param WideMode
* @desc Item display mode. Displayed across multiple columns.
* @text Item display mode(7)
* @type select
* @option 1 column display
* @value 1
* @option 2 columns display
* @value 2
* @option 3 columns displa (only when the number of display columns is 3)
* @value 3
* @default 1
* @parent BasicSetting
* 
* @param paramName
* @desc Set the name of the item to display.
* @text Name(8)
* @type string
* @default
* @parent BasicSetting
* 
* @param NameColor
* @desc Text color for item names. (system color or color code)
* @text Item name text color(9)
* @type color
* @default 16
* @min 0
* @parent BasicSetting
* 
* @param DetaEval
* @desc Set a parameter evaluation expression or string.
* @text Parameter evaluation expression or string(10)
* @type combo
* @option '$gameVariables.value(0);//game variable'
* @default 
* @parent BasicSetting
* 
* @param Back
* @text Content background display(11)
* @desc Show content background.
* @type boolean
* @default false
* @parent BasicSetting
* 
* @param FontSize
* @desc Font size (main font + difference from default font)
* @text Font size(12)
* @type number
* @default 0
* @min -99
* @parent BasicSetting
* 
* @param MaskMode
* @desc When registering, hide the status if you do not register information in the Enemy book registration settings.
* @text Information unregistered status display(13)
* @type boolean
* @default false
* @parent BasicSetting
* 
* @param Decimal
* @text Decimal place number(14)
* @desc The number of decimal places that can be displayed.
* @type number
* @default 0
* @min 0
* @max 99
* @parent BasicSetting
* 
* @param paramUnit
* @desc Set the units.
* @text Unit(15)
* @type string
* @default 
* @parent UnitSetting
* 
* @param namePosition
* @desc Specifies the character display position.
* @text Text display position(16)
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
* @param textMethod
* @desc Description field, tag name linked to individual image.
* @text Description field, Individual image tag name(17)
* @type string
* @default 
* @parent textSetting
* 
* @param CommonText
* @desc Common text (text code available)
* @text Common text(20)
* @type multiline_string	
* @default 
* @parent textSetting
* 
* @param ImgData
* @desc Specify a common image file name displayed on all enemy pages. Width is "item width", height is "Max height"
* @text Common image(18)
* @type file
* @dir img/
* @default 
* @parent ImgSetting
* 
* @param ImgMaxHeight
* @desc Max height of image (specified by number of row)
* @text Max height(19)
* @type number
* @default 8
* @min 0
* @parent ImgSetting
* 
* @param IconId
* @text Icon ID(20)
* @desc An icon is displayed to the left of the item name. Specifies the ID of the icon.
* @type icon
* @default 0
* 
* @param IconY
* @text Icon correction Y value(21)
* @desc Specifies the correction Y value of the icon.
* @type number
* @default 2
* 
*/
/*~struct~CategoryPageListData:
* 
* @param BasicSetting
* @text Basic setting
* @default
* 
* @param DateSelect
* @desc Specify the items to be displayed.
* @text Item list
* @type select
* @option None
* @value 0
* @option Name(1)~(5)(7)(8)(9)(12)(16)
* @value 35
* @option Description field(1)~(5)(7)(8)(9)(12)(17)
* @value 70
* @option Common description field(1)~(5)(7)(8)(9)(12)(20)
* @value 71
* @option Common image(1)(2)(3)(4)(5)(7)(18)(19)
* @value 250
* @option Individual image(1)(2)(3)(4)(5)(7)(19)
* @value 251
* @option Line(1)(2)(3)(4)(5)(7)(9)
* @value 1000
* @default 0
* @parent BasicSetting
* 
* @param X_Position
* @text X display row position(1)
* @desc X display row position
* @type number
* @default 1
* @min 1
* @max 3
* @parent BasicSetting
* 
* @param Y_Position
* @desc Y display row position
* @text Y display row position(2)
* @type number
* @default 1
* @min 1
* @parent BasicSetting
* 
* @param X_Coordinate
* @text X coordinate (relative)(3)
* @desc X coordinate (relative coordinate from X display column position)
* @type number
* @default 0
* @min -9999
* @parent BasicSetting
* 
* @param Y_Coordinate
* @text Y coordinate (relative)(4)
* @desc Y coordinate (relative coordinate from Y display column position)
* @type number
* @default 0
* @min -9999
* @parent BasicSetting
* 
* @param ItemWidth
* @desc Item width (automatically set to 0)
* @text Item width(5)
* @type number
* @default 0
* @min 0
* @parent BasicSetting
* 
* @param SystemItemWidth
* @desc Width of item name (automatically set to 0)
* @text Item name Width(6)
* @type number
* @default 0
* @min 0
* @parent BasicSetting
* 
* @param WideMode
* @desc Item display mode. Displayed across multiple columns.
* @text Item display mode(7)
* @type select
* @option 1 column display
* @value 1
* @option 2 columns display
* @value 2
* @option 3 columns displa (only when the number of display columns is 3)
* @value 3
* @default 1
* @parent BasicSetting
* 
* @param paramName
* @desc Set the name of the item to display.
* @text Name(8)
* @type string
* @default
* @parent BasicSetting
* 
* @param NameColor
* @desc Text color for item names. (system color or color code)
* @text Item name text color(9)
* @type color
* @default 16
* @min 0
* @parent BasicSetting
* 
* @param FontSize
* @desc Font size (main font + difference from default font)
* @text Font size(12)
* @type number
* @default 0
* @min -99
* @parent BasicSetting
* 
* @param namePosition
* @desc Specifies the character display position.
* @text Text display position(16)
* @type select
* @option Left
* @value "left"
* @option Center
* @value "center"
* @option Right
* @value "right"
* @default "left"
* 
* @param textMethod
* @desc Description field, tag name linked to individual image.
* @text Description field, Individual image tag name(17)
* @type string
* @default 
* 
* @param CommonText
* @desc Common text (text code available)
* @text Common text(20)
* @type multiline_string	
* @default 
* 
* @param ImgData
* @desc Specify a common image file name displayed on all enemy pages. Width is "item width", height is "Max height"
* @text Common image(18)
* @type file
* @dir img/
* @default 
* 
* @param ImgMaxHeight
* @desc Max height of image (specified by number of row)
* @text Max height(19)
* @type number
* @default 8
* @min 0
* 
* @param IconId
* @text Icon ID(20)
* @desc An icon is displayed to the left of the item name. Specifies the ID of the icon.
* @type icon
* @default 0
* 
* @param IconY
* @text Icon correction Y value(21)
* @desc Specifies the correction Y value of the icon.
* @type number
* @default 2
* 
*/
/*~struct~PageSettingData:
* 
* @param ListDateSetting
* @desc Specifies the list to display.
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
* @option display list 11
* @value 11
* @option display list 12
* @value 12
* @option display list 13
* @value 13
* @option display list 14
* @value 14
* @option display list 15
* @value 15
* @option display list 16
* @value 16
* @option display list 17
* @value 17
* @option display list 18
* @value 18
* @option display list 19
* @value 19
* @option display list 20
* @value 20 
* @default 1
* 
* @param PageCategoryName
* @desc Sets the name of the page.
* @text Page name
* @type string
* @default
* 
* @param BackGroundImg
* @desc Specifies the background image file name.
* @text Background image
* @type file
* @dir img/
* @default 
*  
*/
/*~struct~BookCategoryList:
* 
* @param CategoryName
* @desc Set the category name.
* @text Category name
* @type string
* 
* @param CategoryKey
* @desc Set the key of the category. (all: display all, mapEnemy: current map)
* @text CategoryKey
* @type combo
* @option 'all'
* @option 'mapEnemy'
* @default
* 
* @param CategoryNote
* @desc Note.
* @text Note
* @type multiline_string
* @default 
* 
*/
/*~struct~PercentContentList:
*
* @param ContentName
* @desc Name.
* @text Name
* @type string
* @default 
* 
* @param ContentDate
* @desc Specifies the information to display.
* @text Display information
* @type select
* @option Completion rate
* @value 0
* @option Encountered
* @value 1
* @option Defeat
* @value 2
* @option Information registered
* @value 3
* @option number of encounters
* @value 11
* @option number of defeat
* @value 12
* @option Number of registered information
* @value 13
* @default 0
*
*/
/*~struct~ElementData:
* 
* @param ElementNo
* @desc Element number to display. (0: none, -1: physical damage rate, -2: magic damage rate)
* @text Element number
* @type number
* @min -2
* 
* @param ElementIconId
* @desc Specifies the ID of the icon.
* @text Icon Id
* @type icon
* @min 0
*/
/*~struct~StateData:
*
* @param StateId
* @desc The state to display.
* @text display state
* @type state
*
*/
/*~struct~DebuffData:
* 
* @param ParamId
* @text Debuff
* @desc Specifies a display debuff.
* @type select
* @option HP
* @value 0
* @option MP
* @value 1
* @option ATK
* @value 2
* @option DEF
* @value 3
* @option MAT
* @value 4
* @option MDF
* @value 5
* @option AGI
* @value 6
* @option LUK
* @value 7
* @default 0
* 
* @param DebuffIconId
* @desc Specifies the ID of the icon.
* @text Icon Id
* @type icon
* @default 0
*/
/*~struct~AnalyzeSkill:
* 
* @param ListNumber
* @desc Specifies the list number of analyzes to display. 0 is the same as the picture book display
* @text Specify analysis item
* @type number
* @default 0
* 
* @param ContentCols
* @text Enemy information item col
* @desc Enemy information item column.
* @type number
* @default 2
* @min 1
* 
* @param StatusGaugeVisible
* @type boolean
* @default true
* @text Show gauge
* @desc Displays HP and MP gauges.
* 
* @param EnemyCurrentStatus
* @type boolean
* @default true
* @text Enemy current status display
* @desc Displays the enemy's current status.
* 
* @param AnalyzeMissMessage
* @type string
* @default %2 failed to analyze.
* @text Message when analysis fails
* @desc Sets the message when analysis fails.
* 
* @param BuffColor
* @desc Buff text color..
* @text Buff text color.
* @type color
* @default 0
* @max 999999
* 
* @param DebuffColor
* @desc Debuff text color.
* @text Debuff text color
* @type color
* @default 0
* @max 999999
* 
* 
*/
/*~struct~AnalyzeList:
* 
* @param Name
* @desc Name.
* @text Name
* @type string
* @default 
* 
* @param AnalyzePageList
* @desc Setting items to display.
* @text Display item setting
* @type struct<PageSettingData>[]
* @default 
* @parent AnalyzeSetting
* 
*/
/*~struct~WindowSkinData:
 *
 * @param WindowSkin
 * @desc Specifies the window skin.
 * @text window skin picture
 * @type file
 * @dir img/system
 * @default
 * 
 * @param WindowSkinColor
 * @text Window color
 * @desc Sets the window color.
 * @default {"red":"0","green":"0","bule":"0"}
 * @type struct<WindowTone>
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
/*~struct~EncountList:
 * 
 * @param MapId
 * @desc Map ID (Separated if multiple specified)
 * @text Map ID
 * @type string
 * @default 
 * 
 * @param Enemy
 * @desc Specify the enemy character to encounter on the specified map.
 * @text Enemy character list
 * @type enemy[]
 * @default 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc モンスター図鑑
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 2.20.10
 * 
 * @help
 * モンスター図鑑を実装します。
 * このプラグインではモンスター情報の表示内容を自由にカスタマイズする事が出来ます。
 * 
 * 機能
 * 図鑑：モンスターの情報を確認できます。戦闘中でも表示できます。
 * 敵の情報：現在戦っているモンスターの情報を確認できます。
 * アナライズ：指定のモンスターの情報を確認します。
 * 
 * モンスター情報の登録
 * プラグインパラメータの「図鑑登録設定」で設定します。
 * 戦闘開始時：戦闘開始時に出現モンスターを図鑑に登録します。
 * 撃破時：倒したときにそのモンスターを図鑑に登録します。
 * アナライズ時：アナライズ成功時に図鑑に登録します。
 * 戦闘終了時：戦闘終了時に出現モンスターを図鑑に登録します。
 * ステータス情報登録をOFFにしている場合は、項目設定で情報未登録ステータス表示をONにしている該当の項目で
 * ステータス情報登録をONにしている場面で図鑑に登録しない限り表示が？等で表示されます。
 * 例
 * 戦闘開始時に図鑑に登録し、撃破時にステータス情報を登録
 * リストで戦闘終了時(ステータス情報登録OFF)と撃破時(ステータス情報登録ON)を設定します。
 * アナライズ成功時に全て登録
 * リストでアナライズ時(ステータス情報登録ON)を設定します。
 * 
 * 敵キャラのメモ欄及びモンスターカテゴリー設定のメモ欄　※後者はカテゴリー表示時のみ
 * 記述欄のテキスト　制御文字が使用可能です。
 * <[tag]:[text]> 記述欄のテキスト
 * [tag]:記述欄タグ名　デフォルト設定だとモンスターの説明を記述するタグはdescに設定されています。
 * [text]:表示するテキスト。
 * 改行すれば何行でも表示可能ですので、独自の項目を追加することも可能です。
 * <desc:ああああ> descとタグ付けされた項目に「ああああ」が表示されます。
 * デフォルト設定では2ページ目に表示される項目にdescが設定されていますので、文章を表示させる場合は<desc:[text]>と記入してください。
 * 
 * モンスター別画像の表示
 * <[tag]:[img],[x],[y]> ページ内に表示させる任意の画像を指定します。
 * [tag]:モンスター個別画像タグ名（記述欄、個別指定画像タグで設定します）
 * [img]:画像パス(拡張子なし)　
 * 個別指定画像フォルダが'pictures'ならimg/pictures直下のファイルを拡張子なしで記入してください。
 * サブフォルダーから取得する場合はサブフォルダー名も記入してください。例 items/tankobu
 * [x]:x座標(相対)
 * [y]:y座標(相対)
 * 複数画像を指定したい場合は項目リストで表示する分だけ設定し、記述欄、個別指定画像タグ名で別々の名前で設定してください。
 * デフォルトの設定ではpicturesフォルダーが指定されています。
 * モンスター個別画像はモンスター毎に異なる任意の画像を表示させるための機能です。モンスター画像を表示させる場合はモンスター画像で表示させてください。
 * 
 * モンスターの図鑑登録
 * <NoBook>(図鑑登録なしタグデフォルト)
 * モンスター図鑑に登録(表示)されません。
 * プラグインパラメータの図鑑登録なしタグで任意のタグ名を設定できます。旧バージョンのタグ名のまま使用したい場合は図鑑登録なしタグ2とタグ名を入れ替えてください。
 * <NoBookData>(図鑑登録なしタグ2デフォルト)
 * モンスター図鑑に登録(表示)されませんが、敵の情報、アナライズのみ表示されます。
 * プラグインパラメータの図鑑登録なしタグ2で任意のタグ名を設定できます。
 * <ShowDataBook>
 * 未撃破でも撃破済みと判定されます。また情報がすべて表示されます。
 * <AnalyzeResist:50> アナライズの抵抗値を設定します。この場合５０％の確率でアナライズが成功します。
 * 
 * 変身時の登録設定
 * <NoTransformInData> 変身時に撃破扱いにならず図鑑に登録しません。（変身前撃破をONにしている時のみ）
 * <TransformEnemy:[enemyid]> 撃破時に指定のIDのモンスターを撃破済みにします。また撃破数、取得アイテム等も指定のIDのモンスターに集計されます。
 * [enemyid]:敵キャラID
 * 
 * その他のモンスター設定
 * <EnemyIcon:[iconid]>
 * モンスター名の左にアイコンを表示させることが出来ます。
 * <EnemyIcon:120> アイコンID120番のアイコンが表示されます。
 * 
 * スキル、アイテムのメモ欄
 * <AnalyzeSkill:[id]> アナライズを発動します。
 * [id]:アナライズスキル設定のリスト番号
 * <AnalyzeSkill:1> このスキル、アイテムはアナライズスキルとし、「アナライズスキル設定」の１番の設定で発動します。
 * 
 * <CertainAnalyze> アナライズ耐性を無視します。
 * 
 * <SeeThrough> アナライズ画面を開かずに図鑑登録します。スキルの攻撃、図鑑登録、情報登録はアナライズ扱いとなります。
 * 
 * <EnemyInfo> 敵の情報を表示します。
 * 
 * アイテムのメモ欄
 * <NoDropProbability>
 * このタグを記入したアイテムはドロップアイテムの確率表示を表示しません。
 * 
 * モンスターの種類カテゴリーの設定
 * モンスターを種類別に表示させることが出来ます。
 * カテゴリーkeyはallを除いて任意の文字列で設定可能です。
 * allを記入の場合は図鑑に登録される全てのモンスターが表示されます。
 * mapEnemyを記入の場合は現在のマップのモンスターが表示されます。
 * 敵キャラのメモ欄
 * <CategoryKey:[Key]> 表示するカテゴリーを設定します。
 * <CategoryKey:[Key],[Key]....> 表示出来るカテゴリーは複数設定可能です。
 * [Key]:カテゴリーKey([]は付けずにプラグインパラメータで設定した文字列を記入してください)
 * 
 * カテゴリー選択時の項目を表示できます。未設定時は表示されません。
 * 記述欄等のタグはプラグインパラメータのモンスターカテゴリー設定のメモ欄に記入します。
 * 
 * アナライズスキル設定の失敗時のメッセージ
 * %1:ターゲット名
 * %2:使用者名
 * 「%2はアナライズに失敗した。」の時、スキル使用者がリードの場合は「リードはアナライズに失敗した。」と表示されます。
 * 
 * 敵キャラのメモ欄
 * サイドビュー(項目設定のサイドビューエネミー表示時に指定されます)
 * <EB_SVBattler:[fileName]> モンスター画像をサイドビュー画像で表示させます。(モンスターにサイドビューアクターを表示する系のプラグイン導入が前提としています)
 * [fileName]:ファイル名　サイドビューバトラー画像を指定します。sv_actorsフォルダ内のファイル名を拡張子なしで指定してください。
 * Visu stalleシリーズでサイドビューバトラーを表示している場合は定義する必要はありません。
 * 
 * 敵キャラのメモ欄
 * <EB_SVBattlerMotion:[motionId]> 指定したモーションで表示させます。記入なしの場合は0のモーションで表示されます。
 * [motionId]:0～17モーションID(数値で入力)
 * 
 * 敵キャラのメモ欄
 * キャラクター(項目設定のキャラクター指定時に表示されます)
 * <EnemyBookCharacter:[failName],[id],[direction]> キャラチップを表示します。指定していないモンスターには表示されません。
 * [failName]:ファイル名　charactersフォルダ内のファイル名を拡張子なしで指定してください。
 * [id]:キャラチップのインデックス番号。3×4のキャラチップは0になります。
 * [direction]:方向を指定します。2正面（一番上） 4左（２番目） 6右（３番目） 8後向き（一番下）　※省略可能
 * 
 * 敵キャラのメモ欄
 * <EnemyBookFVEnemy> 表示するモンスター画像をフロントビュー用の画像で表示します。
 * <EnemyBookSVEnemy> 表示するモンスター画像をサイドビュー用の画像で表示します。
 * 
 * 未遭遇カテゴリー文字列、未確認モンスター文字列、ステータス情報未登録時アイテム、スキル表示名、敵の情報登録タイミング反映(ON)は、
 * ？1文字だけ入れると名前の文字数に応じて？に置き換えられます。
 * 
 * 未確認ドロップアイテム名及び、未確認盗めるアイテム表示をONにした場合、
 * ステータス情報登録をしてもドロップアイテム(盗めるアイテム)を確認するまでは表示されません。
 * 未確認使用スキル表示はステータス情報登録をしてもスティールアイテム使用スキルを確認するまでは表示されません。
 * 未確認属性を隠す、未確認ステートを隠す、未確認デバフを隠すは、ステータス情報登録をしても属性、ステート、デバフ耐性弱点を確認するまでは表示されません。
 * 
 * ページウィンドウ表示モード
 * 非表示に設定することでページウィンドウを画面外に表示し、図鑑表示領域を拡大します。
 * 
 * 属性耐性（アイコン表示）設定
 * 効きにくい属性に無効反映
 * OFFにした場合耐性0%の属性が耐性属性に表示されます。
 * 
 * 背景画像
 * 背景画像UIウィンドウサイズはUI画面に合わせて画像を左上を合わせます。
 * 背景画像拡大は背景画像UIウィンドウサイズで設定したモードを元に画面サイズに合わせて拡大されます。
 * UIウィンドウに合わせている場合はUIのサイズで拡大されます。
 * ページごとに指定してある場合は個別に設定している背景が優先されます。
 * 
 * ターン、レベル、HPなどのゲージは戦闘中のみ表示されます。
 * 
 * マップに出現する敵のリスト設定
 * 以下の設定を行うことにより、現在のマップに出現するモンスターを表示することができます。
 * カテゴリーkeyを'mapEnemy'を記入することで現在のマップのモンスター一覧が表示されます。
 * 
 * マップのイベントにエンカウントする敵キャラのIDを記入。
 * プラグインパラメータのマップ敵エンカウントリストで指定。
 * マップ敵エンカウントリストから設定できます。
 * なお、プラグインパラメータで設定する場合は記入する必要はありませんが、以下のタグを記入した場合は、
 * 以下のタグの設定が優先されます。
 * 
 * マップのメモ欄
 * <EncountEnemiesList:[id],[id]...>
 * 敵キャラIDを指定します。複数入力できます。
 * 
 * モンスター図鑑マップ遭遇チェックを使用している場合は、上記の設定がある場合はその設定が適用されますが、設定されていない場合は
 * 現在のマップの敵グループから自動で判定されます。
 * 
 * 操作方法
 * 上下（↑ ↓）キー：モンスター選択
 * 左右（← →）キー ：ページ切り替え(デフォルト)
 * PgUp PgDnキー：モンスターページ送り
 * 決定　原寸大モンスター表示
 * 
 * タッチ操作
 * 上下スワイプ：スクロール（弾くように勢いよくスワイプすることでページ送りと同等になります）
 * 
 * プラグインコマンド
 * モンスター図鑑オープン       図鑑を開きます。
 * 敵の情報表示　　　　　       敵の情報を開きます。
 * モンスター追加              モンスターを図鑑に追加します。ステータス情報は登録されません。
 * モンスター削除              モンスターを図鑑から削除します。
 * 図鑑完成                    図鑑を完成させます。
 * 図鑑初期化                  図鑑をクリア（全削除）させます。
 * モンスターステータス情報登録  モンスターのステータス情報を登録します。同時に「モンスター追加」の処理も行います。
 * モンスターステータス情報削除  モンスターをステータス情報を削除します。
 * モンスター撃破済み           モンスターを撃破済みにします。
 * 撃破数初期化                 モンスターの撃破数をリセットします。
 * モンスタードロップアイテム習得済み   モンスターのドロップアイテムを取得済みにさせます。
 * モンスタードロップアイテム未収得     モンスターのドロップアイテムを未収得にさせます。
 * モンスタースティールアイテム取得済み モンスターのスティールアイテムを取得済みにします。
 * モンスタースティールアイテム未取得   モンスターのスティールアイテムを未収得にさせます。
 * 総撃破数モンスター数          撃破したモンスター数を変数に格納します。
 * 遭遇数                      遭遇済みのモンスター数を変数に格納します。
 * 図鑑完成度                   現在の完成率を変数に格納します。
 * 総撃破数                    指定のモンスターの撃破数を変数に格納します。
 * 図鑑登録済み判定             指定のモンスターが図鑑登録済みが判定します。
 * ステータス情報登録済み判定    指定のモンスターのステータス情報登録済みか判定します。
 * アイテムドロップ済み判定      指定のアイテムがドロップ済みか判定します。
 * アイテム盗み済み判定         指定のアイテムが盗み済みか判定します。
 * 未確認済み使用スキル確認　　　　敵の使用スキルを確認済みにします。0で全て確認済みにします。
 * 確認済み使用スキル未確認　　　　　敵の使用スキルを未確認にします。0で全て未確認にします。
 * 敵の属性耐性弱点確認済み　　　敵の属性耐性弱点を確認済みにします。0で全て確認済みにします。(要NUUN_EnemyBookEX_1)
 * 敵の属性耐性弱点未確認　　　　敵の属性耐性弱点を未確認にします。0で全て未確認にします。(要NUUN_EnemyBookEX_1)
 * 未確認ステート耐性弱点情報確認済み　敵のステート耐性弱点を確認済みにします。0で全て確認済みにします。(要NUUN_EnemyBookEX_1)
 * 確認済みステート耐性弱点情報未確認　　敵のステート耐性弱点を未確認にします。0で全て未確認にします。(要NUUN_EnemyBookEX_1)
 * 未確認デバフ耐性弱点情報確認済み　　敵のデバフ耐性弱点を確認済みにします。0で全て確認済みにします。(要NUUN_EnemyBookEX_1)
 * 未確認デバフ耐性弱点情報確認済み　　　敵のデバフ耐性弱点を未確認にします。0で全て未確認にします。(要NUUN_EnemyBookEX_1)
 * 
 * パラメータ参照変数
 * this._enemyまたはde:データベースのモンスターデータを取得します。
 * this._enemy.meta:メタタグを取得します。
 * enemy:Game_Enemyのデータを取得します。
 * 
 * スティールアイテムを有効にするにはNUUN_StealableItemsが必要です。
 * 条件付きアイテムを有効にするにはNUUN_EnemyBookEX_2及びNUUN_ConditionalDropsがが必要です。
 * レーダーチャートを有効にするにはNUUN_RadarChartBaseが必要です。
 * ステート、属性、バフ耐性マスク機能を有効にするにはNUUN_EnemyBookEX_1が必要です。
 * 
 * Apng画像の表示
 * 別途トリアコンタン様のApngPicture.js及び以下のライブラリが必要です。
 * https://github.com/sbfkcel/pixi-apngAndGif
 * ダウンロード先はApngPicture.js(APNGピクチャプラグイン)をご確認ください。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/2/10 Ver.2.20.10
 * コマンドの選択できる条件を設定できる機能を追加。
 * 2024/1/3 Ver.2.20.9
 * 攻撃時属性のアイコンが正常に表示されなかった問題を修正。
 * 2023/12/29 Ver.2.20.8
 * 完成度の表示設定に不正なデータが設定されているときのエラーログを設定。
 * 2023/12/29 Ver.2.20.7
 * 戦闘中にカテゴリーを表示したときにエラーが出る問題を修正。
 * 戦闘中の一部のウィンドウの挙動を修正。
 * モンスター原寸大未登録シルエットの設定が適用されていなかった問題を修正。
 * 2023/12/10 Ver.2.20.6
 * 攻撃時属性の未登録時のマスク処理が行われていなかった問題を修正。
 * 2023/12/9 Ver.2.20.5
 * 攻撃時属性を追加。(要自己設定)
 * 2023/11/4 Ver.2.20.4
 * 微修正。
 * 2023/7/22 Ver.2.20.3
 * 属性、ステート耐性(数値)で耐性、弱点の数値を色分けするように修正。
 * 2023/7/16 Ver.2.20.2
 * アナライズ画面を開かずにアナライズの登録処理のみを実行する機能を追加。
 * 2023/7/8 Ver.2.20.1
 * カテゴリー表示をtrueに設定してモンスター図鑑を開くとエラーが出る問題を修正。
 * 属性アイコンの耐性、弱体、無効、吸収表示が正常に表示されない問題を修正。
 * 2023/7/1 Ver.2.20.0
 * 吸収属性(アイコン表示)の項目を追加。
 * 無効属性から吸収属性を表示しない機能を追加。
 * 未確認属性を隠す(要NUUN_EnemyBookEX_1)が適用されていなかった問題を修正。
 * 2023/6/30 Ver.2.19.5
 * 原寸大表示のシルエットが機能していなかった問題を修正。
 * 2023/6/21 Ver.2.19.4
 * アナライズのページが切り替えられない問題を修正。
 * 2023/6/18 Ver.2.19.3
 * アナライズの表示項目設定が正常に適用されていなかった問題を修正。
 * 2023/6/17 Ver.2.19.2
 * 現在のマップを表示させる際に、モンスター図鑑マップ遭遇チェックプラグインを入れていないとエラーが出る問題を修正。
 * レーダーチャートが表示されなくなる問題を修正。
 * 2023/6/9 Ver.2.19.1
 * 耐性デバフを表示させるとエラーが出る問題を修正。
 * ステート(アイコン)耐性、無効、弱点にデバフを表示させる機能を追加。
 * 表示項目に無効デバフを追加。
 * 2023/6/2 Ver.2.19.0
 * 図鑑カテゴリーに現在のマップを追加。
 * 2023/4/8 Ver.2.18.6
 * モンスター画像をフロントビュー画像かサイドビュー画像で表示する機能を追加。
 * 条件付きドロップアイテムを表示するとエラーが出る問題を修正。
 * 2023/3/20 Ver.2.18.5
 * 敵のゲームデータをキャッシュするように修正。(一部のモンスター以外)
 * 未登録モンスターの原寸画像を表示しないように修正。
 * 2023/3/12 Ver.2.18.4
 * VisuMZ_1_BattleCoreでの敵のサイドビューアクターに対応。
 * 2023/3/11 Ver.2.18.3
 * 戦闘中にカーソル以外のページ切り替えができなかった問題を修正。
 * VisuMZ_0_CoreEngineと併用するとモンスター選択時にモンスターのページも切り替わってしまう問題を修正。
 * 2023/3/10 Ver.2.18.2
 * システムカラー0番が指定できない問題を修正。
 * 2023/3/6 Ver.2.18.1
 * Apngのモンスターを表示するときに、重くなる問題を修正。
 * 2023/3/5 Ver.2.18.0
 * 原寸大のモンスターを表示する機能を追加。
 * 2023/3/4 Ver.2.17.14
 * 競合の解消。
 * 2023/3/4 Ver.2.17.13
 * モンスターページのページ切り替えのキー設定を指定できる機能を追加。(別途キー割り当てが出来るプラグインが必要です)
 * 2023/2/26 Ver.2.17.12
 * 敵の出現ではなくプラグイン等で敵を追加したときに、図鑑に登録されない問題を修正。
 * 2023/2/25 Ver.2.17.11
 * ナンバー表示の処理を修正。
 * 2023/2/23 Ver.2.17.10
 * 情報登録していないモンスター画像をシルエットで表示する機能を追加。
 * 2023/1/22 Ver.2.17.9
 * 敵ナンバーの表示で数値の前にNo.が付くように修正。
 * ページ列を自動設定に変更。
 * ウィンドウスキンで色を指定できるように修正。(要再設定)
 * ウィンドウ画像の表示を各ウィンドウ毎に指定できるように修正。
 * 2023/1/5 Ver.2.17.8
 * 変身前のモンスターが撃破カウントされずに変身後のモンスターが2重に撃破カウントされてしまう問題を修正。
 * 2022/12/25 Ver.2.17.7
 * 外部プラグインで敵の行動を追加したときの処理を修正。
 * 2022/12/17 Ver.2.17.6
 * 敵の行動でスキルラーニングで習得したスキルを表示できるように対応。
 * 2022/12/14 Ver.2.17.5
 * ドロップアイテム、盗めるアイテムで一部の変数を呼び出すとエラーが出る問題を修正。
 * 2022/12/12 Ver.2.17.4
 * 属性耐性（耐性数値表示）でエラーが出る問題を修正。
 * 2022/12/9 Ver.2.17.3
 * カラー指定のプラグインパラメータのTypeをcolorに変更。(Ver.1.6.0以降)
 * アイコン指定のプラグインパラメータのTypeをiconに変更。(Ver.1.6.0以降)
 * 日本語以外での表示を英語表示に変更。
 * 2022/11/20 Ver.2.17.2
 * 敵の情報で同じモンスターの情報の切り替えが行われない問題を修正。
 * 2022/11/19 Ver.2.17.1
 * 撃破時に図鑑に登録及び、ステータス登録が行われない問題を修正。
 * アナライズ時に図鑑に登録及び、ステータス登録が行われない問題を修正。
 * 2022/11/19 Ver.2.17.0
 * 項目名称の横にアイコンを表示できる機能を追加。
 * 2022/11/12 Ver.2.16.5
 * 敵のレベルを表示する機能を追加。
 * APNG関連の修正。
 * 2022/11/6 Ver.2.16.4
 * APNG関連の修正。
 * 2022/11/5 Ver.2.16.3
 * ApngPictureが導入されていないとエラーが出る問題を修正。
 * 2022/11/5 Ver.2.16.2
 * APNGで表示したモンスターが２重に表示されてしまう問題を修正。
 * 2022/11/5 Ver.2.16.1
 * Apng対応。(トリアコンタン様のApngPicture.jsが必要となります)
 * 2022/10/18 Ver.2.16.0
 * モンスターステータスウィンドウにカテゴリー選択時の項目を表示できる機能を追加。
 * カテゴリーにモンスターが表示されなかった問題を修正。
 * 2022/10/9 Ver.2.15.0
 * 未登録のモンスターに対して表示できる項目を設定できる機能を追加。
 * 敵の情報のモンスター一覧に同一モンスターがいるときに表示されるアルファベットが表示されない問題を修正。
 * 機能していなかったタグの問題を修正。
 * 2022/10/8 Ver.2.14.3
 * 撃破、図鑑データの登録を指定のモンスターに変更する機能を追加。
 * 敵の情報、アナライズでのみしか表示されないモンスターのNoを表示しないように修正。
 * モンスター選択ウィンドウの登録済みの文字色が適用されない問題を修正。
 * 敵の情報でステータス情報未登録のステータスを隠す機能が適用されなかった問題を修正。
 * 2022/10/4 Ver.2.14.2
 * 図鑑に表示するタグを任意の名前に設定できる機能を追加。
 * 2022/10/2 Ver.2.14.1
 * 項目横幅指定時に図鑑を開くとエラーが出る問題を修正。
 * 文字揃えのrightが間違っていたので修正。
 * プリセット再修正
 * 2022/10/2 Ver.2.14.0
 * 図鑑登録時の設定の仕様を変更。
 * ドロップアイテム、スティールアイテム、条件付きアイテム、敵のスキル、属性耐性、ステート耐性の列指定の仕様変更。
 * プラグインパラメータの整理。
 * スティールアイテムが正常に表示されなかった問題を修正。
 * アナライズの設定の仕様を変更。
 * <NoBook>と<NoBookData>の仕様変更。
 * カテゴリー選択時の背景画像を指定できるように変更。
 * 2022/7/30 Ver.2.13.4
 * 図鑑に表示しない名前を指定できる機能を追加。
 * コンテンツ背景の表示なしの時に、項目の表示がわずかにずれて表示される問題を修正。
 * 2022/6/15 Ver.2.13.3
 * 評価式に文字列を記入したときにNaNと表示されてしまう問題を修正。
 * 2022/6/13 Ver.2.13.2
 * 属性耐性一覧に物理ダメージ率と魔法ダメージ率を表示できる機能を追加。
 * 2022/6/5 Ver.2.13.1
 * 一部の処理を修正。
 * 2022/5/5 Ver.2.13.0
 * 盗みスキル率の表示を評価式形式に変更。
 * ドロップアイテム、盗みアイテムで確立を表示しない場合、アイテムの表示が不自然になる問題を修正。
 * ドロップアイテム、各項目の評価式記入の仕様を変更。
 * 図鑑のプリセットを変更。
 * 2022/4/2 Ver.2.12.1
 * 図鑑データセーブ共有化による処理追加。
 * 2022/3/4 Ver.2.12.0
 * 属性、ステート耐性を百分率で表示する機能を追加。
 * 図鑑登録のパターンによっては戦闘開始時にエラーが起きる問題を修正。
 * 2022/1/29 Ver.2.11.2
 * ドロップアイテム率の表示の仕様を変更。
 * 2022/1/24 Ver.2.11.1
 * 敵の詳細ページウィンドウを表示させない機能を追加。
 * 2022/1/24 Ver.2.11.0
 * プラグインパラメータを整理。
 * オリジナルパラメータの仕様変更。
 * モンスター詳細ページのプリセットの変更。
 * 項目フォントサイズを指定できる機能を追加。
 * 戦闘終了時に登録する機能を追加。
 * 登録時の処理を修正。
 * 2022/1/1 Ver.2.10.4
 * 戦闘中に情報ページの横幅指定時に敵の情報を開くと表示がずれる問題を修正。
 * カテゴリーのナンバー表記がおかしくなる問題を修正。
 * カテゴリー名が別のカテゴリー名で表示される問題を修正。
 * 2021/12/31 Ver.2.10.3
 * 表示していないカテゴリーを選択できてしまう問題を修正。
 * モンスターカテゴリーを強制的に左揃えにするように修正。
 * 2021/12/25 Ver.2.10.2
 * 単位を空白で設定したときにnullが表示されてしまう問題を修正。
 * 2021/12/25 Ver.2.10.1
 * ページカテゴリー、敵のカテゴリーをコマンド化。
 * 条件付きドロップアイテム図鑑表示併用時エラーが出る問題を修正。
 * 2021/12/22 Ver.2.10.0
 * 未確認ドロップアイテム、スティールアイテム名、使用スキル名を隠すをOFFにした時、フラグ処理を行わないように変更。
 * 条件付きドロップアイテムを表示する機能を追加。
 * 2021/12/12 Ver.2.9.6
 * メインウィンドウ（モンスターの情報を表示）の横幅を設定できる機能を追加。
 * 2021/12/11 Ver.2.9.5
 * 追加、特殊能力値に小数点数を指定できる機能を追加。
 * 2021/11/10 Ver.2.9.4
 * 使用していないプラグインパラメータを削除。
 * 2021/11/9 Ver.2.9.3
 * カラーコードに対応。
 * 評価式でのモンスターデータの参照方法を変更。
 * 敵の情報で背景を設定したときにモンスターリストの位置がズレる問題を修正。
 * 背景の表示方法を変更。
 * 2021/11/3 Ver.2.9.2
 * アナライズに成功して、別のスキルを実行しミスしたときにアナライズの失敗時のメッセージが表示される問題を修正。
 * 2021/9/27 Ver.2.9.1
 * 敵の情報に情報登録しているエネミー名に色を付けれる機能を追加。
 * 敵の情報の登録済みエネミー名の色の反映を登録タイミングに関係なく反映するように変更。
 * ナンバー表示をカテゴリー順に表示させる機能を追加。
 * 2021/9/26 Ver.2.9.0
 * 背景画像はページ、アナライズ、敵の情報毎に設定できるように変更。
 * 敵の情報に登録タイミングを反映させるように変更。
 * 敵の情報に登録しているエネミー名に色を付けれる機能を追加。
 * 背景画像を指定して敵の情報を開いた後に閉じるとモンスターの画像が残ってしまう問題を修正。
 * 2021/9/2 Ver.2.8.1
 * モンスター毎の個別画像の座標設定が反映されていなかった問題を修正。
 * 2021/8/28 Ver.2.8.0
 * 画像を表示できる機能を追加。
 * 2021/8/13 Ver.2.7.3
 * アイテム百分率化プラグインに対応。
 * 受けた属性、ステート、デバフ表示機能を別プラグイン化。
 * 2021/7/25 Ver.2.7.2
 * 登録タイミングに登録なしを追加。
 * 2021/7/19 Ver.2.7.1
 * レーダーチャートの座標調整でマイナス側に設定できなかった問題を修正。
 * 2021/7/18 Ver.2.7.0
 * 属性耐性、ステート耐性をレーダーチャートで表示できる機能を追加。(要NUUN_RadarChartBase)
 * 2021/6/26 Ver.2.6.1
 * 変身時撃破をONにしても変身時の図鑑登録をしない機能を追加。
 * 2021/6/16 Ver.2.6.0
 * モンスターブックナンバーを表示する機能を追加。
 * 図鑑に登録されていないモンスターをリストから表示しない機能を追加。
 * 完成度ウィンドウに幾つかの項目を追加。
 * 2021/6/13 Ver.2.5.2
 * プラグインコマンドで敵の情報を表示できる機能を追加。
 * 2021/6/12 Ver.2.5.1
 * ウィンドウの端に謎の黒い縦線が出る問題を修正。
 * 2021/6/9 Ver.2.5.0
 * 遭遇していないカテゴリーをシークレット表示、非表示にする機能を追加。
 * アナライズ耐性を無視するスキルを設定できる機能を追加。
 * 2021/6/6 Ver.2.4.3
 * プラグインコマンドに図鑑登録済み判定とステータス情報登録済み判定を追加。
 * モンスターにアナライズ耐性を設定できる機能を追加。
 * TPBアクティブで敵を全滅させた直後に敵の情報を開くとエラーが出る問題を修正。
 * 2021/5/29 Ver.2.4.2
 * キャラチップを表示する機能を追加。
 * 色相が変化しているモンスターの次にサイドビューアクターが表示されると、色相が前のモンスターの色相で表示される問題を修正。
 * 2021/5/24 Ver.2.4.1
 * モンスター図鑑を開いた後に敵の情報を開くと特定の条件でエラーが起きる問題を修正。
 * 登録タイミングを遭遇時にして途中から出現するモンスターが出現せずに戦闘を終了すると図鑑に登録してしまう問題を修正。
 * 敵の情報でステータス情報登録をしていないモンスターの情報を隠す機能を追加。
 * 2021/5/22 Ver.2.4.0
 * 戦闘中の敵の情報を確認する機能を追加。
 * 2021/5/20 Ver.2.3.1
 * 各項目の背景（黒い背景）を表示する機能を追加。
 * システム文字の幅を指定できる機能を追加。
 * 単位を付けられる機能を追加。
 * 2021/5/15 Ver.2.3.0
 * 各ウィンドウのウィンドウスキンを個別に設定できる機能を追加。（要NUUN_Base Ver.1.1.4以降）
 * 2021/5/7 Ver.2.2.1
 * 変身前のモンスターを撃破済みにしてもステータス情報が反映されなかった問題を修正。
 * 2021/5/4 Ver.2.2.0
 * モンスター情報の各項目の座標、横幅を詳細に設定できるように変更。
 * ターン数を表示する機能を追加。
 * 2021/5/2 Ver.2.1.3
 * 図鑑、アナライズに表示されないモンスターを攻撃したときダメージが表示されない問題を修正。
 * 2021/5/1 Ver.2.1.2
 * プラグインコマンド「モンスター図鑑オープン」を戦闘中にも対応。
 * 図鑑登録、アナライズを使用しても表示しない機能を追加。
 * 2021/4/30 Ver.2.1.1
 * 登録タイミングを撃破済みにしてモンスターを撃破しても登録されない問題を修正。
 * 2021/4/30 Ver.2.1.0
 * 敵の使用スキルに未確認の使用スキルを隠す機能を追加。
 * 敵の属性、ステート、デバフに未確認のアイコンを隠す機能を追加。
 * 不要なプラグインパラメータを削除。
 * アイテム、スティール情報を確認済み及び未確認にする時に、１番目のアイテムを指定したときに全てのアイテムが対象になってしまう問題を修正。
 * 情報登録タイミングを遭遇時に設定するとエラーが出る問題を修正。
 * 2021/4/28 Ver.2.0.3
 * 敵の現在のTPを表示する機能を追加。
 * モンスター名にアイコンを表示する機能を追加。
 * ゲージの表示が現在のステータスを表示のみ表示以外に表示されていた問題を修正。
 * NRP_LoopCursorと併用するとエラーが出る問題を修正。
 * 2021/4/27 Ver.2.0.2
 * 未情報のアイテム、スキルの表示を未確認の索引名から別々に変更。
 * リスト型のプラグインパラメータで空白のまま図鑑を実行するとエラーが起きる問題を修正。
 * 2021/4/26 Ver.2.0.1
 * 表示できる項目に行動、耐性デバフ、弱点デバフを追加。
 * 弱点ステートに無効化ステートが表示してしまう問題を修正。
 * 2021/4/25 Ver.2.0.0
 * 敵のステータスを表示する項目を大幅にリニューアル。
 * ステータス情報の登録タイミングを指定できる機能を追加。
 * ステータス情報未登録時に耐性属性、弱点属性、無効属性、耐性ステート、弱点ステート、無敵ステートに未登録時の表示アイコンを指定できる機能を追加。
 * 背景画像の参照先を指定できるように変更。
 * 完成度を撃破数からステータス登録した数に変更。
 * プラグインコマンド「図鑑完成」を実行すると撃破数がリセットされる問題を修正。
 * 2021/2/7 Ver.1.0.0
 * 初版
 * 
 * @param BasicSetting
 * @text 基本設定
 * @default ------------------------------
 * 
 * @param WindowMode
 * @desc 選択ウィンドウの表示位置を指定します。
 * @text 選択ウィンドウ位置
 * @type select
 * @option 左側表示
 * @value 0
 * @option 右側表示
 * @value 1
 * @default 0
 * @parent BasicSetting
 * 
 * @param RegistrationTiming
 * @desc モンスターの図鑑への登録方法を設定します。
 * @text 図鑑登録設定
 * @type struct<RegistrationTimingList>[]
 * @default ["{\"RegistrationTiming\":\"0\",\"RegisterStatus\":\"true\"}"]
 * @parent BasicSetting
 * 
 * @param TransformDefeat
 * @desc 変身前の敵を撃破したものとみなします。
 * @text 変身前撃破
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param NoDataName
 * @desc 図鑑に登録しない名前を指定します。名前空欄はデフォルトで登録されません。
 * @text 登録しない名前
 * @type string
 * @default 
 * @parent BasicSetting
 * 
 * @param NoBookTag
 * @desc 図鑑に登録しないタグ名。
 * @text 図鑑登録なしタグ
 * @type string
 * @default NoBook
 * @parent BasicSetting
 * 
 * @param NoBookDataTag
 * @desc 図鑑に登録しないタグ名。敵の情報、アナライズ時は表示されます。
 * @text 図鑑登録なしタグ2
 * @type string
 * @default NoBookData
 * @parent BasicSetting
 * 
 * @param DecimalMode
 * @text 端数処理四捨五入
 * @desc 表示外小数点を四捨五入で丸める。（falseで切り捨て）
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param ImgFolder
 * @desc 個別指定画像をフォルダ名を指定します。(img直下)
 * @text 個別指定画像フォルダ
 * @type string
 * @default pictures
 * @parent BasicSetting
 * 
 * @param SVEnemyMirror
 * @type boolean
 * @default true
 * @text サイドビューバトラー反転
 * @desc サイドビューバトラーを表示時、画像を反転させる。
 * @parent BasicSetting
 * 
 * @param BackUiWidth
 * @text 背景画像UIウィンドウサイズ
 * @desc 背景画像をUIウィンドウサイズに合わせる。
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param BackFitWidth
 * @text 背景画像拡大
 * @desc 背景画像をウィンドウサイズまたは画面に合わせ拡大します。
 * @type boolean
 * @default false
 * @parent BasicSetting
 * 
 * @param EnemyGraphicMode
 * @desc モンスター画像をフロントビュー用かサイドビュー用の画像で表示するかを指定します。
 * @text モンスター画像タイプ
 * @type select
 * @option モードによって
 * @value 0
 * @option フロントビュー用画像
 * @value 1
 * @option サイドビュー用画像
 * @value 2
 * @default 0
 * @parent BasicSetting
 * 
 * @param PageNextSymbol
 * @desc ページ送りのシンボル名(変更するには別途キー割り当てが出来るプラグインが必要です)
 * @text ページ送りシンボル名
 * @type combo
 * @option 
 * @option pageup2
 * @default 
 * @parent BasicSetting
 * 
 * @param PagePreviousSymbol
 * @desc ページ戻りのシンボル名(変更するには別途キー割り当てが出来るプラグインが必要です)
 * @text ページ戻りシンボル名
 * @type combo
 * @option 
 * @option pagedown2
 * @default 
 * @parent BasicSetting
 * 
 * @param ActualEnemyMask
 * @type boolean
 * @default true
 * @text モンスター原寸大未登録シルエット
 * @desc 情報が未登録のモンスターの原寸大表示をシルエットにします。
 * @parent BasicSetting
 * 
 * @param MapEncountEnemySetting
 * @text マップエンカウント敵キャラ設定
 * @default ------------------------------
 * 
 * @param MapEncountEnemy
 * @text マップ敵エンカウントリスト
 * @desc 指定のマップでエンカウントする敵の設定を行います。
 * @type struct<EncountList>[]
 * @default []
 * @parent MapEncountEnemySetting
 * 
 * @param CommandSetting
 * @text 図鑑コマンド設定
 * @default ------------------------------
 * 
 * @param CommandName
 * @desc コマンドの名称。
 * @text コマンドの表示名
 * @type string
 * @default モンスター図鑑
 * @parent CommandSetting
 * 
 * @param ShowCommand
 * @desc メニューコマンドにモンスター図鑑を追加します。
 * @text メニューコマンド表示
 * @type boolean
 * @default false
 * @parent CommandSetting
 * 
 * @param enemyBookSwitch 
 * @desc 表示させるフラグスイッチID
 * @text メニューコマンド表示スイッチ
 * @type switch
 * @default 0
 * @parent CommandSetting
 * 
 * @param CondCommandEnemyBook
 * @desc モンスター図鑑を選択できる条件。選択できない場合は半透明で表示されます。
 * @text メニューコマンド選択条件
 * @type combo
 * @option '$gameSwitches.value(0);//スイッチ'
 * @default 
 * @parent CommandSetting
 * 
 * @param ShowBattleCommand
 * @desc 戦闘中のパーティコマンドにモンスター図鑑を追加します。
 * @text パーティコマンド表示
 * @type boolean
 * @default false
 * @parent CommandSetting
 * 
 * @param enemyBookBattleSwitch
 * @desc 戦闘中に表示させるフラグスイッチID
 * @text パーティコマンド表示スイッチ
 * @type switch
 * @default 0
 * @parent CommandSetting
 * 
 * @param CondBattleCommandEnemyBook
 * @desc パーティコマンドでモンスター図鑑を選択できる条件。選択できない場合は半透明で表示されます。
 * @text パーティコマンド選択条件
 * @type combo
 * @option '$gameSwitches.value(0);//スイッチ'
 * @default 
 * @parent CommandSetting
 * 
 * @param InfoCommandSetting
 * @text 敵の情報コマンド設定
 * @default ------------------------------
 * 
 * @param EnemyInfoCommandName
 * @desc 敵の情報コマンドの名称。
 * @text 敵の情報コマンド表示名
 * @type string
 * @default 敵の情報
 * @parent InfoCommandSetting
 * 
 * @param ShowEnemyInfoCommand
 * @desc 戦闘中のパーティコマンドに敵の情報を追加します。
 * @text 敵の情報パーティコマンド表示
 * @type boolean
 * @default false
 * @parent InfoCommandSetting
 * 
 * @param enemyBookInfoSwitch
 * @desc 敵の情報を戦闘中に表示させるフラグスイッチID
 * @text 敵の情報パーティコマンド表示スイッチ
 * @type switch
 * @default 0
 * @parent InfoCommandSetting
 * 
 * @param CondEnemyBookInfo
 * @desc 敵の情報を選択できる条件。選択できない場合は半透明で表示されます。
 * @text 敵の情報選択条件
 * @type combo
 * @option '$gameSwitches.value(0);//スイッチ'
 * @default 
 * @parent InfoCommandSetting
 * 
 * @param WindowSetting
 * @text 共通ウィンドウ設定
 * @default ------------------------------
 * 
 * @param BookWidth
 * @desc モンスター情報ウィンドウの横幅。(0で画面の2/3)
 * @text モンスター情報ウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent WindowSetting
 * 
 * @param NoTouchUIWindow
 * @type boolean
 * @default false
 * @text 戦闘時タッチUIがOFF時ウィンドウ上詰め
 * @desc 戦闘時タッチUIがOFFの時ウィンドウを上に詰めます。
 * @parent WindowSetting
 * 
 * @param AllWindowVisibleHide
 * @type boolean
 * @default false
 * @text 全ウィンドウ画像非表示
 * @desc 全てのウィンドウのウィンドウ画像を非表示します。個別に非表示設定を行ってもこの設定が優先されます。
 * @parent WindowSetting
 * 
 * @param BackgoundWindowMode
 * @type boolean
 * @default false
 * @text 戦闘時背景画像モード
 * @desc 戦闘時の図鑑、敵の情報、アナライズのウィンドウを背景画像モードにします。背景画像設定時はONに設定してください。
 * @parent WindowSetting
 * 
 * @param CategorySetting
 * @text 表示カテゴリーウィンドウ設定
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param CategoryNameWindowVisible
 * @type boolean
 * @default true
 * @text 表示カテゴリーウィンドウ画像表示
 * @desc 表示カテゴリーのウィンドウ画像を表示します。
 * @parent CategorySetting
 * 
 * @param CategoryNameWindowsSkin
 * @desc 表示カテゴリーウィンドウのウィンドウスキンを指定します。
 * @text 表示カテゴリーウィンドウスキン
 * @type struct<WindowSkinData>
 * @default 
 * @parent CategorySetting
 * 
 * @param SelectCategorySetting
 * @text カテゴリーウィンドウ設定
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param CategoryShow
 * @type boolean
 * @default false
 * @text カテゴリーを表示
 * @desc カテゴリーを表示します。非表示の場合は表示カテゴリーと共に表示されません。
 * @parent SelectCategorySetting
 * 
 * @param EnemyBookCategory
 * @desc モンスターカテゴリーの設定をします。
 * @text モンスターカテゴリー設定
 * @type struct<BookCategoryList>[]
 * @default ["{\"CategoryName\":\"全て\",\"CategoryKey\":\"all\"}","{\"CategoryName\":\"ボス\",\"CategoryKey\":\"boss\"}"]
 * @parent SelectCategorySetting
 * 
 * @param CategoryVisibleType
 * @text 未遭遇カテゴリー表示
 * @desc １体も遭遇してない場合のカテゴリー表示。
 * @type select
 * @option 表示
 * @value 0
 * @option 非表示
 * @value 1
 * @option 別の文字列で隠す
 * @value 2
 * @default 0
 * @parent SelectCategorySetting
 * 
 * @param CategoryUnknownData
 * @desc 未遭遇カテゴリーの文字列です。？1文字だけ入れると名前の文字数に応じて？に置き換えられます。「別の文字列で隠す」時のみ有効。
 * @text 未遭遇カテゴリー文字列
 * @type string
 * @default ？
 * @parent SelectCategorySetting
 * 
 * @param CategoryListDateSetting
 * @desc カテゴリー選択時に表示するリスト。
 * @text カテゴリー表示リスト
 * @type struct<CategoryPageListData>[]
 * @default []
 * @parent SelectCategorySetting
 * 
 * @param CategoryWindowVisible
 * @type boolean
 * @default true
 * @text カテゴリーウィンドウ画像表示
 * @desc カテゴリーのウィンドウ画像を表示します。
 * @parent SelectCategorySetting
 * 
 * @param CategoryWindowsSkin
 * @desc カテゴリーウィンドウのウィンドウスキンを指定します。
 * @text カテゴリーウィンドウスキン
 * @type struct<WindowSkinData>
 * @default 
 * @parent SelectCategorySetting
 * 
 * @param SelectEnemySetting
 * @text モンスター選択ウィンドウ共通設定
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param NumberType
 * @text モンスターのナンバー表示
 * @desc モンスターのナンバーを表示します。
 * @type select
 * @option モンスターNoの表示なし
 * @value 0
 * @option モンスターNoを表示する。
 * @value 1
 * @option モンスターNoを表示し、0埋めをする(2桁)。
 * @value 2
 * @option モンスターNoを表示し、0埋めをする(3桁)。
 * @value 3
 * @option モンスターNoを表示し、0埋めをする(4桁)。
 * @value 4
 * @default 1
 * @parent SelectEnemySetting
 * 
 * @param NumberWidth
 * @desc ナンバーの表示範囲を文字列で指定します。0埋めする場合は桁数に応じて設定されます。
 * @text ナンバー表示範囲
 * @type string
 * @default 00
 * @parent SelectEnemySetting
 * 
 * @param UnknownVisible
 * @desc 未確認のモンスターをリストに表示しません。
 * @text 未確認モンスター表示
 * @type boolean
 * @default false
 * @parent SelectEnemySetting
 * 
 * @param NumberMode
 * @desc カテゴリーから表示されたときに、ナンバー表示を各カテゴリー表示順で表示します。(カテゴリーウィンドウ表示時のみ有効)
 * @text ナンバーカテゴリー表示順表示
 * @type boolean
 * @default false
 * @parent SelectEnemySetting
 * 
 * @param UnknownEnemyIcons
 * @desc 未登録のモンスターアイコン。
 * @text 未登録モンスターアイコン
 * @type icon
 * @default 0
 * @min 0
 * @parent SelectEnemySetting
 * 
 * @param UnknownData
 * @desc 未確認の文字列です。？1文字だけ入れると名前の文字数に応じて？に置き換えられます。
 * @text 未確認モンスター文字列
 * @type string
 * @default ？
 * @parent SelectEnemySetting
 * 
 * @param RegistrationEnemyColor
 * @desc 登録済みモンスター名の色。
 * @text 登録済みモンスター名文字色
 * @type color
 * @default 0
 * @max 999
 * @parent SelectEnemySetting
 * 
 * @param RegistrationStatusEnemyColor
 * @desc ステータス情報登録済みモンスター名の色。
 * @text ステータス情報登録済みモンスター名文字色
 * @type color
 * @default 0
 * @max 999
 * @parent SelectEnemySetting
 * 
 * @param SelectEnemybookSetting
 * @text 図鑑選択ウィンドウ共通設定
 * @default ------------------------------
 * @parent SelectEnemySetting
 * 
 * @param IndexWindowVisible
 * @type boolean
 * @default true
 * @text モンスター選択ウィンドウ画像表示
 * @desc モンスター選択のウィンドウ画像を表示します。
 * @parent SelectEnemybookSetting
 * 
 * @param IndexWindowsSkin
 * @desc モンスター選択ウィンドウのウィンドウスキンを指定します。
 * @text モンスター選択ウィンドウスキン
 * @type struct<WindowSkinData>
 * @default 
 * @parent SelectEnemybookSetting
 * 
 * @param SelectEnemyInfoSetting
 * @text 敵の情報選択ウィンドウ共通設定
 * @default ------------------------------
 * @parent SelectEnemySetting
 * 
 * @param InfoWindowVisible
 * @type boolean
 * @default true
 * @text 敵の情報ウィンドウ画像表示
 * @desc 敵の情報のウィンドウ画像を表示します。
 * @parent SelectEnemyInfoSetting
 * 
 * @param InfoWindowsSkin
 * @desc 敵の情報ウィンドウのウィンドウスキンを指定します。
 * @text 敵の情報ウィンドウスキン
 * @type struct<WindowSkinData>
 * @default 
 * @parent SelectEnemyInfoSetting
 * 
 * @param PercentWindow
 * @text 完成度ウィンドウ設定
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param PercentWindowShow
 * @type boolean
 * @default true
 * @text 完成度表示
 * @desc 完成度を表示する。敵の情報、アナライズでは表示されません。
 * @parent PercentWindow
 * 
 * @param PercentContent
 * @desc 完成度の表示項目を設定をします。
 * @text 表示項目設定
 * @type struct<PercentContentList>[]
 * @default ["{\"ContentName\":\"完成度\",\"ContentDate\":\"0\"}","{\"ContentName\":\"遭遇済み\",\"ContentDate\":\"1\"}","{\"ContentName\":\"撃破済み\",\"ContentDate\":\"2\"}"]
 * @parent PercentWindow
 * 
 * @param Interval
 * @desc 完成度ウィンドウの更新フレーム
 * @text 更新フレーム間隔
 * @type number
 * @default 100
 * @max 999999
 * @min 0
 * @parent PercentWindow
 * 
 * @param PercentWindowVisible
 * @type boolean
 * @default true
 * @text 完成度ウィンドウ画像表示
 * @desc 完成度のウィンドウ画像を表示します。
 * @parent PercentWindow
 * 
 * @param PercentWindowsSkin
 * @desc 完成度のウィンドウスキンを指定します。
 * @text 完成度ウィンドウスキン
 * @type struct<WindowSkinData>
 * @default 
 * @parent PercentWindow
 * 
 * @param PageWindow
 * @text ページウィンドウ設定
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param PageWindowsShow
 * @desc ページ画面を表示します。非表示に設定することでページ画面を画面外に表示し、図鑑表示領域を拡大します。
 * @text ページ画面表示モード
 * @type boolean
 * @default false
 * @parent PageWindow
 * 
 * @param PageWindowVisible
 * @type boolean
 * @default true
 * @text ページウィンドウ画像表示
 * @desc ページのウィンドウ画像を表示します。
 * @parent PageWindow
 * 
 * @param PageWindowsSkin
 * @desc ページウィンドウスキンを指定します。
 * @text ページウィンドウスキン
 * @type struct<WindowSkinData>
 * @default 
 * @parent PageWindow
 * 
 * @param EnemyBookStatusSetting
 * @text モンスターステータス設定
 * @default ------------------------------
 * @parent WindowSetting
 * 
 * @param EnemyBookDefaultFontSize
 * @desc デフォルトのフォントサイズ（メインフォントからの差）
 * @text デフォルトフォントサイズ
 * @type number
 * @min -99
 * @default 0
 * @parent EnemyBookStatusSetting
 * 
 * @param UnknownStatus
 * @desc ステータス情報未登録時のステータス表示名
 * @text ステータス情報未登録時ステータス表示名
 * @type string
 * @default ？？？
 * @parent EnemyBookStatusSetting
 * 
 * @param UnknownItems
 * @desc ステータス情報未登録時のアイテム、スキル表示名
 * @text ステータス情報未登録時アイテム、スキル表示名
 * @type string
 * @default ？
 * @parent EnemyBookStatusSetting
 * 
 * @param ContentWindowVisible
 * @type boolean
 * @default true
 * @text モンスターステータスウィンドウ画像表示
 * @desc モンスターステータスのウィンドウ画像を表示します。
 * @parent EnemyBookStatusSetting
 * 
 * @param ContentWindowsSkin
 * @desc モンスターステータスウィンドウのウィンドウスキンを指定します。
 * @text モンスターステータスウィンドウスキン
 * @type struct<WindowSkinData>
 * @default 
 * @parent EnemyBookStatusSetting
 * 
 * @param EnemyBookSetting
 * @text モンスター図鑑設定
 * @default ------------------------------
 * @parent EnemyBookStatusSetting
 * 
 * @param PageSetting
 * @desc モンスターステータスウィンドウのページ設定。表示するページを表示項目設定の表示リストから選択してください。
 * @text ページ設定
 * @type struct<PageSettingData>[]
 * @default ["{\"ListDateSetting\":\"1\",\"PageCategoryName\":\"基本情報\",\"BackGroundImg\":\"\"}","{\"ListDateSetting\":\"2\",\"PageCategoryName\":\"ドロップアイテム\",\"BackGroundImg\":\"\"}","{\"ListDateSetting\":\"3\",\"PageCategoryName\":\"説明\",\"BackGroundImg\":\"\"}"]
 * @parent EnemyBookSetting
 * 
 * @param ContentCols
 * @text モンスター情報項目列数
 * @desc モンスター情報の項目列数。
 * @type number
 * @default 2
 * @min 1
 * @parent EnemyBookSetting
 * 
 * @param CategoryBackGroundImg
 * @desc カテゴリー選択時の図鑑背景画像ファイル名を指定します。ページごとに指定してある場合は個別設定が優先されます。
 * @text カテゴリー図鑑背景画像
 * @type file
 * @dir img/
 * @default 
 * @parent EnemyBookSetting
 * 
 * @param DefaultBackGroundImg
 * @desc デフォルトの図鑑背景画像ファイル名を指定します。ページごとに指定してある場合は個別設定が優先されます。
 * @text 図鑑背景画像
 * @type file
 * @dir img/
 * @default 
 * @parent EnemyBookSetting
 * 
 * @param UnregisteredEnemy
 * @desc 未登録のモンスターの表示リストを指定します。0の場合は表示されません。
 * @text 未登録モンスターリスト指定
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
 * @option 表示リスト１１
 * @value 11
 * @option 表示リスト１２
 * @value 12
 * @option 表示リスト１３
 * @value 13
 * @option 表示リスト１４
 * @value 14
 * @option 表示リスト１５
 * @value 15
 * @option 表示リスト１６
 * @value 16
 * @option 表示リスト１７
 * @value 17
 * @option 表示リスト１８
 * @value 18
 * @option 表示リスト１９
 * @value 19
 * @option 表示リスト２０
 * @value 20 
 * @default 0
 * @parent EnemyBookSetting
 * 
 * @param EnemyInfoSetting
 * @text 敵の情報基本設定
 * @default ------------------------------
 * @parent EnemyBookStatusSetting
 * 
 * @param InfoPageSetting
 * @desc モンスターインフォウィンドウのページ設定。表示するページを表示項目設定の表示リストから選択してください。
 * @text ページ設定
 * @type struct<PageSettingData>[]
 * @default ["{\"ListDateSetting\":\"1\",\"PageCategoryName\":\"基本情報\",\"BackGroundImg\":\"\"}","{\"ListDateSetting\":\"2\",\"PageCategoryName\":\"ドロップアイテム\",\"BackGroundImg\":\"\"}","{\"ListDateSetting\":\"3\",\"PageCategoryName\":\"説明\",\"BackGroundImg\":\"\"}"]
 * @parent EnemyInfoSetting
 * 
 * @param InfoContentCols
 * @text モンスター情報項目列数
 * @desc モンスター情報の項目列数。
 * @type number
 * @default 2
 * @min 1
 * @parent EnemyInfoSetting
 * 
 * @param InfoStatusGaugeVisible
 * @type boolean
 * @default true
 * @text ゲージを表示
 * @desc HP、MP、TPのゲージを表示します。
 * @parent EnemyInfoSetting
 * 
 * @param InfoEnemyCurrentStatus
 * @type boolean
 * @default true
 * @text モンスターの現在ステータス表示
 * @desc モンスターの現在のステータスを表示します。
 * @parent EnemyInfoSetting
 * 
 * @param RegistrationEnemyInfo
 * @desc 登録タイミングを敵の情報にも反映させます。未登録の場合はモンスター名が？等で表示されます。
 * @text 敵の情報登録タイミング反映
 * @type boolean
 * @default false
 * @parent EnemyInfoSetting
 * 
 * @param InfoMaskMode
 * @desc ステータス情報を登録していない場合はステータスを隠す。
 * @text 情報未登録ステータス非表示
 * @type boolean
 * @default false
 * @parent EnemyInfoSetting
 * 
 * @param DefaultInfoBackGroundImg
 * @desc デフォルトの敵の情報背景画像ファイル名を指定します。ページごとに指定してある場合は個別設定が優先されます。
 * @text 敵の情報背景画像
 * @type file
 * @dir img/
 * @default 
 * @parent EnemyInfoSetting
 * 
 * @param AnalyzeSetting
 * @text アナライズ基本設定
 * @default ------------------------------
 * @parent EnemyBookStatusSetting
 * 
 * @param AnalyzeSkillMode
 * @desc アナライズスキルの設定をします。
 * @text アナライズスキル設定
 * @type struct<AnalyzeSkill>[]
 * @default ["{\"ListNumber\":\"0\",\"ContentCols\":\"2\",\"StatusGaugeVisible\":\"true\",\"EnemyCurrentStatus\":\"true\",\"AnalyzeMissMessage\":\"%2はアナライズに失敗した。\",\"BuffColor\":\"0\",\"DebuffColor\":\"0\"}","{\"ListNumber\":\"1\",\"ContentCols\":\"2\",\"StatusGaugeVisible\":\"true\",\"EnemyCurrentStatus\":\"true\",\"AnalyzeMissMessage\":\"%2はアナライズに失敗した。\",\"BuffColor\":\"0\",\"DebuffColor\":\"0\"}"]
 * @parent AnalyzeSetting
 * 
 * @param AnalyzeListData
 * @desc アナライズの設定。
 * @text アナライズ設定
 * @type struct<AnalyzeList>[]
 * @default ["{\"Name\":\"\",\"AnalyzePageList\":\"[\\\"{\\\\\\\"ListDateSetting\\\\\\\":\\\\\\\"11\\\\\\\",\\\\\\\"PageCategoryName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"BackGroundImg\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\"}"]
 * @parent AnalyzeSetting
 * 
 * @param CommonVariableID
 * @desc コモンイベント指定にモンスターIDを代入する変数
 * @text モンスターID代入変数
 * @type variable
 * @default 0
 * @parent AnalyzeSetting
 * 
 * @param BattleEnemyBookSetting
 * @text 戦闘時図鑑共通設定
 * @default ------------------------------
 * @parent EnemyBookStatusSetting
 * 
 * @param HPgaugeWidth
 * @desc HPゲージ横幅
 * @text HPゲージ横幅
 * @type number
 * @default 200
 * @max 999
 * @min 0
 * @parent BattleEnemyBookSetting
 * 
 * @param MPgaugeWidth
 * @desc MPゲージ横幅
 * @text MPゲージ横幅
 * @type number
 * @default 200
 * @max 999
 * @min 0
 * @parent BattleEnemyBookSetting
 * 
 * @param TPgaugeWidth
 * @desc TPゲージ横幅
 * @text TPゲージ横幅
 * @type number
 * @default 200
 * @max 999
 * @min 0
 * @parent BattleEnemyBookSetting
 * 
 * @param BuffColor
 * @desc ステータスバフ時のステータスパラメータの数値色。(敵の情報、アナライズ)
 * @text ステータスバフ時数値色
 * @type color
 * @default 0
 * @max 999999
 * @parent BattleEnemyBookSetting
 * 
 * @param DebuffColor
 * @desc ステータスデバフ時のステータスパラメータの数値色。(敵の情報、アナライズ)
 * @text ステータスデバフ時数値色
 * @type color
 * @default 0
 * @max 999999
 * @parent BattleEnemyBookSetting
 * 
 * @param ListData
 * @text 表示項目設定
 * @default ------------------------------
 * @parent EnemyBookStatusSetting
 * 
 * @param ListData1_10
 * @text 表示項目設定1-10
 * @default ------------------------------
 * @parent ListData
 * 
 * @param PageList1
 * @desc 表示するリスト。
 * @text 表示リスト１
 * @type struct<PageListData>[]
 * @default ["{\"BasicSetting\":\"\",\"DateSelect\":\"33\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"2\",\"paramName\":\"\",\"NameColor\":\"0\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"false\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"center\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"200\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"false\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"1\",\"X_Position\":\"2\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"2\",\"X_Position\":\"2\",\"Y_Position\":\"3\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"3\",\"X_Position\":\"2\",\"Y_Position\":\"4\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"4\",\"X_Position\":\"2\",\"Y_Position\":\"5\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"5\",\"X_Position\":\"2\",\"Y_Position\":\"6\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"6\",\"X_Position\":\"2\",\"Y_Position\":\"7\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"7\",\"X_Position\":\"2\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"8\",\"X_Position\":\"2\",\"Y_Position\":\"9\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"30\",\"X_Position\":\"1\",\"Y_Position\":\"11\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"31\",\"X_Position\":\"2\",\"Y_Position\":\"11\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"32\",\"X_Position\":\"2\",\"Y_Position\":\"10\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"false\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"41\",\"X_Position\":\"1\",\"Y_Position\":\"12\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"46\",\"X_Position\":\"2\",\"Y_Position\":\"12\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"40\",\"X_Position\":\"1\",\"Y_Position\":\"14\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"45\",\"X_Position\":\"2\",\"Y_Position\":\"14\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}"]
 * @parent ListData1_10
 *  
 * @param PageList2
 * @desc 表示するリスト。
 * @text 表示リスト２
 * @type struct<PageListData>[]
 * @default ["{\"BasicSetting\":\"\",\"DateSelect\":\"33\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"2\",\"paramName\":\"\",\"NameColor\":\"0\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"false\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"center\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"200\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"false\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"1\",\"X_Position\":\"2\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"2\",\"X_Position\":\"2\",\"Y_Position\":\"3\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"3\",\"X_Position\":\"2\",\"Y_Position\":\"4\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"4\",\"X_Position\":\"2\",\"Y_Position\":\"5\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"5\",\"X_Position\":\"2\",\"Y_Position\":\"6\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"6\",\"X_Position\":\"2\",\"Y_Position\":\"7\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"7\",\"X_Position\":\"2\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"8\",\"X_Position\":\"2\",\"Y_Position\":\"9\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"60\",\"X_Position\":\"1\",\"Y_Position\":\"10\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"2\",\"paramName\":\"ドロップアイテム\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}"]
 * @parent ListData1_10
 * 
 * @param PageList3
 * @desc 表示するリスト。
 * @text 表示リスト３
 * @type struct<PageListData>[]
 * @default ["{\"BasicSetting\":\"\",\"DateSelect\":\"33\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"2\",\"paramName\":\"\",\"NameColor\":\"0\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"false\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"center\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"200\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"false\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"1\",\"X_Position\":\"2\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"2\",\"X_Position\":\"2\",\"Y_Position\":\"3\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"3\",\"X_Position\":\"2\",\"Y_Position\":\"4\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"4\",\"X_Position\":\"2\",\"Y_Position\":\"5\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"5\",\"X_Position\":\"2\",\"Y_Position\":\"6\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"6\",\"X_Position\":\"2\",\"Y_Position\":\"7\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"7\",\"X_Position\":\"2\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"8\",\"X_Position\":\"2\",\"Y_Position\":\"9\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"70\",\"X_Position\":\"1\",\"Y_Position\":\"10\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"2\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"desc\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}"]
 * @parent ListData1_10
 * 
 * @param PageList4
 * @desc 表示するリスト。
 * @text 表示リスト４
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList5
 * @desc 表示するリスト。
 * @text 表示リスト５
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList6
 * @desc 表示するリスト。
 * @text 表示リスト６
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList7
 * @desc 表示するリスト。
 * @text 表示リスト７
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList8
 * @desc 表示するリスト。
 * @text 表示リスト８
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList9
 * @desc 表示するリスト。
 * @text 表示リスト９
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList10
 * @desc 表示するリスト。
 * @text 表示リスト１０
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param ListData11_20
 * @text 表示項目設定11-20
 * @default ------------------------------
 * @parent ListData
 * 
 * @param PageList11
 * @desc 表示するリスト。
 * @text 表示リスト１１
 * @type struct<PageListData>[]
 * @default ["{\"BasicSetting\":\"\",\"DateSelect\":\"33\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"2\",\"paramName\":\"\",\"NameColor\":\"0\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"false\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"center\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"200\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"false\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"1\",\"X_Position\":\"2\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"2\",\"X_Position\":\"2\",\"Y_Position\":\"3\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"3\",\"X_Position\":\"2\",\"Y_Position\":\"4\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"4\",\"X_Position\":\"2\",\"Y_Position\":\"5\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"5\",\"X_Position\":\"2\",\"Y_Position\":\"6\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"6\",\"X_Position\":\"2\",\"Y_Position\":\"7\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"7\",\"X_Position\":\"2\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"8\",\"X_Position\":\"2\",\"Y_Position\":\"9\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"30\",\"X_Position\":\"1\",\"Y_Position\":\"11\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"31\",\"X_Position\":\"2\",\"Y_Position\":\"11\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"right\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"41\",\"X_Position\":\"1\",\"Y_Position\":\"12\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"46\",\"X_Position\":\"2\",\"Y_Position\":\"12\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"40\",\"X_Position\":\"1\",\"Y_Position\":\"14\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}","{\"BasicSetting\":\"\",\"DateSelect\":\"45\",\"X_Position\":\"2\",\"Y_Position\":\"14\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"paramName\":\"\",\"NameColor\":\"16\",\"DetaEval\":\"\",\"Back\":\"false\",\"FontSize\":\"0\",\"MaskMode\":\"true\",\"Decimal\":\"0\",\"paramUnit\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textMethod\":\"\",\"CommonText\":\"\",\"ImgData\":\"\",\"ImgMaxHeight\":\"8\",\"IconId\":\"0\",\"IconY\":\"2\"}"]
 * @parent ListData11_20
 * 
 * @param PageList12
 * @desc 表示するリスト。
 * @text 表示リスト１２
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList13
 * @desc 表示するリスト。
 * @text 表示リスト１３
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList14
 * @desc 表示するリスト。
 * @text 表示リスト１４
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList15
 * @desc 表示するリスト。
 * @text 表示リスト１５
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList16
 * @desc 表示するリスト。
 * @text 表示リスト１６
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList17
 * @desc 表示するリスト。
 * @text 表示リスト１７
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList18
 * @desc 表示するリスト。
 * @text 表示リスト１８
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList19
 * @desc 表示するリスト。
 * @text 表示リスト１９
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList20
 * @desc 表示するリスト。
 * @text 表示リスト２０
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param DropItemData
 * @text ドロップアイテム設定
 * @default ------------------------------
 * @parent EnemyBookStatusSetting
 * 
 * @param DropItemProbabilityShow
 * @desc 確率を表示する。
 * @text 確率表示
 * @type boolean
 * @default true
 * @parent DropItemData
 * 
 * @param DropRateEval
 * @desc ドロップ率の評価式を定義します。rate:分母　di:ドロップ情報
 * @text ドロップ率評価式
 * @type combo
 * @option "'1/'+ rate"
 * @option "ge.getDropItemsRatePercentage(di) +'%';//ドロップ率百分率化Ver.1.0.1～"
 * @option "ge.dropItemMolecule(i) +'/'+ rate;//ドロップ率分子操作"
 * @default 
 * @parent DropItemData
 * 
 * @param ShowDropItemName
 * @desc 未確認のドロップアイテムを隠す。(ステータス情報登録をしてもドロップアイテムを確認するまでは表示されません)
 * @text 未確認ドロップアイテム名
 * @type boolean
 * @default false
 * @parent DropItemData
 * 
 * @param DropItemMultiCols
 * @desc ドロップアイテムの表示列。
 * @text 表示列
 * @type number
 * @min 1
 * @default 1
 * @parent DropItemData
 * 
 * @param CondDropData
 * @text 条件付きドロップアイテム設定
 * @default ------------------------------
 * @parent DropItemData
 * 
 * @param CondDropItemCols
 * @desc 条件付きドロップアイテムの表示列。
 * @text 表示列
 * @type number
 * @min 1
 * @default 1
 * @parent CondDropData
 * 
 * @param StealItemData
 * @text 盗みアイテム設定
 * @default ------------------------------
 * @parent EnemyBookStatusSetting
 * 
 * @param StealItemProbabilityShow
 * @desc 確率を表示する。
 * @text 確率表示
 * @type boolean
 * @default true
 * @parent StealItemData
 * 
 * @param StealRateEval
 * @desc 盗み率の評価式を定義します。rate:盗み率(100分率)
 * @text 盗み率評価式
 * @type combo
 * @option "rate +'%';//盗み率"
 * @default 
 * @parent StealItemData
 * 
 * @param ShowStealItemName
 * @desc 未確認の盗めるアイテムを隠す。(ステータス情報登録をしても盗めるアイテムを確認するまでは表示されません)
 * @text 未確認盗めるアイテム表示
 * @type boolean
 * @default false
 * @parent StealItemData
 * 
 * @param StealItemCols
 * @desc 盗めるアイテムの表示列。
 * @text 表示列
 * @type number
 * @min 1
 * @default 1
 * @parent StealItemData
 * 
 * @param ActionData
 * @text 敵の使用スキル設定
 * @default ------------------------------
 * @parent EnemyBookStatusSetting
 * 
 * @param ShowActionName
 * @desc 未確認の使用スキルを隠す。(ステータス情報登録をしても使用スキルを確認するまでは表示されません)
 * @text 未確認使用スキル表示
 * @type boolean
 * @default false
 * @parent ActionData
 * 
 * @param ActionMaxItems
 * @desc 表示する最大項目数。(0で制限なし)
 * @text 最大項目数
 * @type number
 * @default 0
 * @min 0
 * @parent ActionData
 * 
 * @param ActionCols
 * @desc 敵のスキルの表示列。
 * @text 表示列
 * @type number
 * @min 1
 * @default 1
 * @parent ActionData
 * 
 * @param ElementIconSetting
 * @text 表示属性アイコン設定
 * @default ------------------------------
 * @parent EnemyBookStatusSetting
 * 
 * @param ElementList
 * @desc 表示する属性。攻撃時属性、耐性表、レーダーチャート共通
 * @text 表示属性
 * @type struct<ElementData>[]
 * @default ["{\"ElementNo\":\"1\",\"ElementIconId\":\"76\"}","{\"ElementNo\":\"2\",\"ElementIconId\":\"64\"}","{\"ElementNo\":\"3\",\"ElementIconId\":\"65\"}","{\"ElementNo\":\"4\",\"ElementIconId\":\"66\"}","{\"ElementNo\":\"5\",\"ElementIconId\":\"67\"}","{\"ElementNo\":\"6\",\"ElementIconId\":\"68\"}","{\"ElementNo\":\"7\",\"ElementIconId\":\"69\"}","{\"ElementNo\":\"8\",\"ElementIconId\":\"70\"}","{\"ElementNo\":\"9\",\"ElementIconId\":\"71\"}"]
 * @parent ElementIconSetting
 * 
 * @param ElementUnknownIconId
 * @desc ステータス情報未登録時に表示する属性アイコンのIDを指定します。
 * @text ステータス情報未登録時属性アイコンID
 * @type icon
 * @default 0
 * @parent ElementIconSetting
 * 
 * @param ResistWeakElementData
 * @text 属性耐性弱点設定
 * @default ------------------------------
 * @parent EnemyBookStatusSetting
 * 
 * @param ElementIcon
 * @text 属性耐性（アイコン表示）設定
 * @default ------------------------------
 * @parent ResistWeakElementData
 * 
 * @param ResistNoEffectElement
 * @desc 効きにくい属性に無効を反映させます。OFFにした場合耐性0%の属性が耐性属性に表示されます。
 * @text 効きにくい属性に無効反映
 * @type boolean
 * @default true
 * @parent ElementIcon
 * 
 * @param AbsorptionNoEffectElement
 * @desc 吸収属性を無効を反映させます。吸収属性は別途プラグインが必要です。
 * @text 吸収属性を無効反映
 * @type boolean
 * @default true
 * @parent ElementIcon
 * 
 * @param ElementValue
 * @text 属性耐性（耐性数値表示）
 * @default ------------------------------
 * @parent ResistWeakElementData
 * 
 * @param ResistWeakElementMode
 * @text 属性耐性表示モード
 * @desc 表示するタイプを指定します。
 * @type select
 * @option 属性名のみ
 * @value 0
 * @option アイコンのみ
 * @value 1
 * @option 属性名+アイコンのみ
 * @value 2
 * @default 2
 * @parent ElementValue
 * 
 * @param ElementCol
 * @desc 属性耐性の表示列。
 * @text 属性耐性表示列
 * @type number
 * @default 1
 * @parent ElementValue
 * 
 * @param ElementRadarChart
 * @text 属性耐性レーダーチャート
 * @default ------------------------------
 * @parent ResistWeakElementData
 * 
 * @param ElementRadarChartRadius
 * @desc レーダチャートの半径。
 * @text レーダチャート半径
 * @type number
 * @default 100
 * @parent ElementRadarChart
 * 
 * @param ElementRadarChartFramecolor
 * @desc レーダチャートの枠の色を設定します。
 * @text レーダチャート枠色
 * @type color
 * @default 15
 * @parent ElementRadarChart
 * 
 * @param ElementRadarChartLineColor
 * @desc レーダチャートの線の色を設定します。
 * @text レーダチャート線色
 * @type color
 * @default 15
 * @parent ElementRadarChart
 * 
 * @param ElementRadarChartMainColor1
 * @desc レーダチャートの中心の背景色を設定します。
 * @text レーダチャート中心背景色
 * @type color
 * @default 3
 * @parent ElementRadarChart
 * 
 * @param ElementRadarChartMainColor2
 * @desc レーダチャートの外側背景色を設定します。
 * @text レーダチャート外側背景色
 * @type color
 * @default 3
 * @parent ElementRadarChart
 * 
 * @param ElementRadarChartX
 * @desc レーダチャートのX座標（相対）。
 * @text レーダチャートX座標
 * @type number
 * @min -9999
 * @default 48
 * @parent ElementRadarChart
 * 
 * @param ElementRadarChartY
 * @desc レーダチャートのY座標（相対）。
 * @text レーダチャートY座標
 * @type number
 * @min -9999
 * @default 48
 * @parent ElementRadarChart
 * 
 * @param ElementRadarChart_FontSize
 * @desc フォントサイズ。（メインフォントから）
 * @text フォントサイズ
 * @type number
 * @default -12
 * @min -9999
 * @parent ElementRadarChart
 * 
 * @param NUUN_EnemyBookEX_1
 * @text (要NUUN_EnemyBookEX_1)
 * @default ------------------------------
 * @parent ResistWeakElementData
 * 
 * @param ShowElementsIcon
 * @desc 耐性弱点未確認の属性を隠す。(ステータス情報登録をしても属性耐性弱点を確認するまでは表示されません)
 * @text 未確認属性を隠す(要NUUN_EnemyBookEX_1)
 * @type boolean
 * @default false
 * @parent NUUN_EnemyBookEX_1
 * 
 * @param StateIconSetting
 * @text 表示ステートアイコン設定
 * @default ------------------------------
 * @parent EnemyBookStatusSetting
 * 
 * @param StateList
 * @desc 表示するステート。
 * @text 表示ステート
 * @type struct<StateData>[]
 * @default ["{\"StateId\":\"1\"}","{\"StateId\":\"4\"}","{\"StateId\":\"5\"}","{\"StateId\":\"6\"}","{\"StateId\":\"7\"}","{\"StateId\":\"8\"}","{\"StateId\":\"9\"}","{\"StateId\":\"10\"}","{\"StateId\":\"12\"}","{\"StateId\":\"13\"}"]
 * @parent StateIconSetting
 * 
 * @param StateUnknownIconId
 * @desc ステータス情報未登録時に表示するステートアイコンのIDを指定します。
 * @text ステータス情報未登録時ステートアイコンID
 * @type icon
 * @default 0
 * @parent StateIconSetting
 * 
 * @param ResistWeakStateData
 * @text ステート耐性弱点設定
 * @default ------------------------------
 * @parent EnemyBookStatusSetting
 * 
 * @param ResistWeakStateIcon
 * @text ステート耐性（アイコン表示）設定
 * @default ------------------------------
 * @parent ResistWeakStateData
 * 
 * @param NormalWeakState
 * @desc 効きやすいステート対象を有効度100%以上から反映させるか。OFFの場合は101%以上になります。
 * @text 効きやすい属性有効度100%適用
 * @type boolean
 * @default false
 * @parent ResistWeakStateIcon
 * 
 * @param ResistNoEffectState
 * @desc 効きにくいステートに無効を反映させるか。OFFにした場合耐性0%のステートが耐性ステートに表示されます。
 * @text 効きにくいステートに無効反映
 * @type boolean
 * @default true
 * @parent ResistWeakStateIcon
 * 
 * @param ResistDebuffInState
 * @desc ステートの耐性及び無効にデバフの耐性を適用させます。表示デバフは表示デバフで設定します。
 * @text 耐性無効デバフ適用
 * @type boolean
 * @default false
 * @parent ResistWeakStateIcon
 * 
 * @param ResistWeakStateValue
 * @text 耐性ステート（耐性数値表示）設定
 * @default ------------------------------
 * @parent ResistWeakStateData
 * 
 * @param ResistWeakStateMode
 * @text ステート表示モード
 * @desc 表示するタイプを指定します。
 * @type select
 * @option ステート名のみ
 * @value 0
 * @option アイコンのみ
 * @value 1
 * @option ステート名+アイコンのみ
 * @value 2
 * @default 2
 * @parent ResistWeakStateValue
 * 
 * @param StateCol
 * @desc ステート耐性の表示列。
 * @text ステート耐性表示列
 * @type number
 * @default 1
 * @parent ResistWeakStateValue
 * 
 * @param StateRadarChart
 * @text ステート耐性レーダーチャート
 * @default ------------------------------
 * @parent ResistWeakStateData
 * 
 * @param StateRadarChartRadius
 * @desc レーダチャートの半径。
 * @text レーダチャート半径
 * @type number
 * @default 100
 * @parent StateRadarChart
 * 
 * @param StateRadarChartFramecolor
 * @desc レーダチャートの枠の色を設定します。
 * @text レーダチャート枠色
 * @type color
 * @default 15
 * @parent StateRadarChart
 * 
 * @param StateRadarChartLineColor
 * @desc レーダチャートの線の色を設定します。
 * @text レーダチャート線色
 * @type color
 * @default 15
 * @parent StateRadarChart
 * 
 * @param StateRadarChartMainColor1
 * @desc レーダチャートの中心の背景色を設定します。
 * @text レーダチャート中心背景色
 * @type color
 * @default 3
 * @parent StateRadarChart
 * 
 * @param StateRadarChartMainColor2
 * @desc レーダチャートの外側背景色を設定します。
 * @text レーダチャート外側背景色
 * @type color
 * @default 3
 * @parent StateRadarChart
 * 
 * @param StateRadarChartX
 * @desc レーダチャートのX座標（相対）。
 * @text レーダチャートX座標
 * @type number
 * @min -9999
 * @default 48
 * @parent StateRadarChart
 * 
 * @param StateRadarChartY
 * @desc レーダチャートのY座標（相対）。
 * @text レーダチャートY座標
 * @min -9999
 * @type number
 * @default 48
 * @parent StateRadarChart
 * 
 * @param StateRadarChart_FontSize
 * @desc フォントサイズ。（メインフォントから）
 * @text フォントサイズ
 * @type number
 * @default -12
 * @min -9999
 * @parent StateRadarChart
 * 
 * @param RadarChartIcon
 * @desc ステートの表示をアイコンで表示する。OFFはステート名
 * @text アイコン表示
 * @type boolean
 * @default true
 * @parent StateRadarChart
 * 
 * @param NUUN_EnemyBookEX_1_State
 * @text (要NUUN_EnemyBookEX_1)
 * @default ------------------------------
 * @parent ResistWeakStateData
 * 
 * @param ShowStateIcon
 * @desc 耐性弱点未確認のステートを隠す。(ステータス情報登録をしてもステート耐性弱点を確認するまでは表示されません)
 * @text 未確認ステートを隠す(要NUUN_EnemyBookEX_1)
 * @type boolean
 * @default false
 * @parent NUUN_EnemyBookEX_1_State
 * 
 * @param ResistWeakDebuffData
 * @text デバフ耐性弱点設定
 * @default ------------------------------
 * @parent EnemyBookStatusSetting
 * 
 * @param DeBuffList
 * @desc 表示するデバフ。
 * @text 表示デバフ
 * @type struct<DebuffData>[]
 * @default ["{\"ParamId\":\"0\",\"DebuffIconId\":\"48\"}","{\"ParamId\":\"1\",\"DebuffIconId\":\"49\"}","{\"ParamId\":\"2\",\"DebuffIconId\":\"50\"}","{\"ParamId\":\"3\",\"DebuffIconId\":\"51\"}","{\"ParamId\":\"4\",\"DebuffIconId\":\"52\"}","{\"ParamId\":\"5\",\"DebuffIconId\":\"53\"}","{\"ParamId\":\"6\",\"DebuffIconId\":\"54\"}","{\"ParamId\":\"7\",\"DebuffIconId\":\"55\"}"]
 * @parent ResistWeakDebuffData
 * 
 * @param NormalWeakDebuff
 * @desc 効きやすいデバフ対象を有効度100%以上から反映させるか。OFFの場合は101%以上になります。
 * @text 効きやすいデバフ有効度100%適用
 * @type boolean
 * @default false
 * @parent ResistWeakDebuffData
 * 
 * @param ResistNoEffectDebuff
 * @desc 効きにくいデバフに無効を反映させるか。OFFにした場合耐性0%のデバフが耐性デバフに表示されます。
 * @text 効きにくいデバフに無効反映
 * @type boolean
 * @default true
 * @parent ResistWeakDebuffData
 * 
 * @param DeBuffUnknownIconId
 * @desc ステータス情報未登録時に表示するデバフアイコンのIDを指定します。
 * @text ステータス情報未登録時デバフアイコンID
 * @type icon
 * @default 0
 * @parent ResistWeakDebuffData
 * 
 * @param NUUN_EnemyBookEX_1_DeBuff
 * @text (要NUUN_EnemyBookEX_1)
 * @default ------------------------------
 * @parent ResistWeakDebuffData
 * 
 * @param ShowDebuffIcon
 * @desc 耐性弱点未確認のステートデバフを隠す。(ステータス情報登録をしてもデバフ耐性弱点を確認するまでは表示されません)
 * @text 未確認デバフを隠す(要NUUN_EnemyBookEX_1)
 * @type boolean
 * @default false
 * @parent NUUN_EnemyBookEX_1_DeBuff
 * 
 * 
 * 
 * @command EnemyBookOpen
 * @desc モンスター図鑑を開きます。
 * @text モンスター図鑑オープン
 * 
 * @command EnemyInfoOpen
 * @desc 敵の情報を開きます。
 * @text 敵の情報表示
 * 
 * @command EnemyBookAdd
 * @desc モンスターを図鑑に追加します。ステータス情報は登録されません。
 * @text モンスター追加
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @command EnemyBookRemove
 * @desc モンスターを図鑑から削除します。
 * @text モンスター削除
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @command EnemyBookStatusAdd
 * @desc モンスターのステータス情報を登録します。「モンスター追加」の処理も行います。
 * @text モンスターステータス情報登録
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @command EnemyBookStatusRemove
 * @desc モンスターのステータス情報を削除します。
 * @text モンスターステータス情報削除
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @command EnemyBookComplete
 * @desc 図鑑を完成させます。
 * @text 図鑑完成
 * 
 * @command EnemyBookClear
 * @desc 図鑑をクリア（消去）します。
 * @text 図鑑初期化
 * 
 * @command EnemyBookAddDefeat
 * @desc モンスターを撃破済みにします。
 * @text モンスター撃破済み
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 *  
 * @command EnemyBookRemoveDefeat
 * @desc モンスターの撃破数をリセットします。(0で全てのモンスターの撃破数をリセットします)
 * @text 撃破数初期化
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @command EnemyBookGetDropItem
 * @desc モンスターのドロップアイテムを取得済みにします。
 * @text モンスタードロップアイテム取得済み
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg dropListId
 * @type number
 * @default 0
 * @text ドロップアイテムリストID
 * @desc ドロップアイテムリストIDを指定します。（0ですべて取得済みにします）
 * 
 * @command EnemyBookRemoveDropItem
 * @desc モンスターのドロップアイテムを未収得にします。
 * @text モンスタードロップアイテム未収得
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg dropListId
 * @type number
 * @default 0
 * @text ドロップアイテムリストID
 * @desc ドロップアイテムリストIDを指定します。（0ですべて未取得済みにします）
 * 
 * @command EnemyBookGetStealItem
 * @desc モンスターのスティールアイテムを取得済みにします。
 * @text モンスタースティールアイテム取得済み
 *
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg stealListId
 * @type number
 * @default 0
 * @text スティールアイテムリストID
 * @desc スティールアイテムリストIDを指定します。（0ですべて取得済みにします）
 * 
 * @command EnemyBookRemoveStealItem
 * @desc モンスターのスティールアイテムを未取得にします。
 * @text モンスタースティールアイテム未取得
 * @type 0
 * @default 0
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg stealListId
 * @type number
 * @default 0
 * @text スティールアイテムリストID
 * @desc スティールアイテムリストIDを指定します。（0ですべて未取得済みにします）
 * 
 * @command EnemyBookDefeatEnemy
 * @desc 撃破済みのモンスター数を格納します。
 * @text 総撃破数モンスター数
 * 
 * @arg DefeatEnemy
 * @type variable
 * @default 0
 * @text 変数
 * @desc 撃破済みモンスター数を代入する変数を指定します。
 * 
 * @command EnemyBookEncounteredEnemy
 * @desc 遭遇したモンスター数を格納します。
 * @text 遭遇数
 * 
 * @arg EncounteredEnemy
 * @type variable
 * @default 0
 * @text 変数
 * @desc 遭遇したモンスター数を代入する変数を指定します。
 * 
 * @command EnemyBookCompleteRate
 * @desc 図鑑の完成率を格納します。
 * @text 図鑑完成率
 * 
 * @arg CompleteRate
 * @type variable
 * @default 0
 * @text 変数
 * @desc 図鑑の完成率を代入する変数を指定します。
 * 
 * @command EnemyBookRegistration
 * @desc モンスターが図鑑に登録済みか判定します。
 * @text 図鑑登録済み判定
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @text モンスター
 * @desc モンスターを指定します。
 * 
 * @arg registrationSwitch
 * @type switch
 * @default 0
 * @text スイッチ
 * @desc モンスターが図鑑に登録済みかを代入するスイッチを指定します。
 * 
 * @command EnemyBookStatusRegistration
 * @desc モンスターのステータス情報が図鑑に登録済みか判定します。
 * @text ステータス情報登録済み判定
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @text モンスター
 * @desc モンスターを指定します。
 * 
 * @arg statusRegistrationSwitch
 * @type switch
 * @default 0
 * @text スイッチ
 * @desc モンスターが図鑑に登録済みかを代入するスイッチを指定します。
 * 
 * @command EnemyBookDefeatEnemySum
 * @desc モンスターの撃破数を格納します。
 * @text 総撃破数
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @text モンスター
 * @desc モンスターを指定します。
 * 
 * @arg DefeatEnemySum
 * @type variable
 * @default 0
 * @text 変数
 * @desc モンスターの撃破数を代入する変数を指定します。
 * 
 * @command DorpItemAcquired
 * @desc 指定のアイテムがドロップ済みか判定します。
 * @text アイテムドロップ済み判定
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg DorpItemAcquiredId
 * @type number
 * @default 0
 * @text アイテムドロップリストID
 * @desc アイテムドロップリストIDを指定します。（0ですべて）
 * 
 * @arg DorpItemAcquiredswitch
 * @type switch
 * @default 0
 * @text 格納スイッチ
 * @desc アイテムがドロップ済みかを代入するスイッチを指定します。
 * 
 * @command StealItemAcquired
 * @desc 指定のアイテムが盗み済みか判定します。
 * @text アイテム盗み済み判定
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg stealAcquiredId
 * @type number
 * @default 0
 * @text スティールアイテムリストID
 * @desc スティールアイテムリストIDを指定します。（0ですべて）
 * 
 * @arg StealAcquiredswitch
 * @type switch
 * @default 0
 * @text 格納スイッチ
 * @desc アイテムが盗み済みかを代入する変数を指定します。
 * 
 * @command EnemyBookActionAdd
 * @desc モンスターの未確認の使用スキルを確認済みにします。
 * @text 未確認使用スキル確認済み
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg actionId
 * @type number
 * @default 0
 * @text 行動パターンID
 * @desc 行動パターンID（一番上が１番）（0ですべて）
 * 
 * @command EnemyBookActionRemove
 * @desc モンスターの確認済みの使用スキルを未確認にします。
 * @text 確認済み使用スキル未確認
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg actionId
 * @type number
 * @default 0
 * @text 行動パターンID
 * @desc 行動パターンID（一番上が１番）（0ですべて）
 * 
 * @command EnemyBookElementAdd
 * @desc モンスターの未確認の属性耐性弱点情報を確認済みにします。(要NUUN_EnemyBookEX_1)
 * @text 未確認属性耐性弱点情報確認済み
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg elementId
 * @type number
 * @default 0
 * @text 属性ID
 * @desc 属性ID（データベースのタイプタグの属性）（0ですべて）
 * 
 * @command EnemyBookElementRemove
 * @desc モンスターの確認済みの属性耐性弱点情報を未確認にします。(要NUUN_EnemyBookEX_1)
 * @text 確認済み属性耐性弱点情報未確認
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg elementId
 * @type number
 * @default 0
 * @text 属性ID
 * @desc 属性ID（データベースのタイプタグの属性）（0ですべて）
 * 
 * @command EnemyBookStateAdd
 * @desc モンスターの未確認のステート耐性弱点情報を確認済みにします。(要NUUN_EnemyBookEX_1)
 * @text 未確認ステート耐性弱点情報確認済み
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg stateId
 * @type state
 * @default 0
 * @text ステートID
 * @desc ステートID（データベースのタイプタグの属性）（0ですべて）
 * 
 * @command EnemyBookStateRemove
 * @desc モンスターの確認済みのステート耐性弱点情報を未確認にします。(要NUUN_EnemyBookEX_1)
 * @text 確認済みステート耐性弱点情報未確認
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg stateId
 * @type state
 * @default 0
 * @text ステートID
 * @desc ステートID（データベースのタイプタグの属性）（0（なし）ですべて）
 * 
 * @command EnemyBookDebuffAdd
 * @desc モンスターの未確認のデバフ耐性弱点情報を確認済みにします。(要NUUN_EnemyBookEX_1)
 * @text 未確認デバフ耐性弱点情報確認済み
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg debuffId
 * @text デバフ対象
 * @desc 確認済みにするデバフ対象を指定します。
 * @type select
 * @option ＨＰ
 * @value 0
 * @option ＭＰ
 * @value 1
 * @option 攻撃力
 * @value 2
 * @option 防御力
 * @value 3
 * @option 魔法力
 * @value 4
 * @option 魔法防御
 * @value 5
 * @option 敏捷性
 * @value 6
 * @option 運
 * @value 7
 * @option 全て
 * @value -1
 * @default -1
 * 
 * @command EnemyBookDebuffRemove
 * @desc モンスターの確認済みのデバフ耐性弱点情報を未確認にします。(要NUUN_EnemyBookEX_1)
 * @text 確認済みデバフ耐性弱点情報未確認
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg debuffId
 * @text デバフ対象
 * @desc 未確認済みにするデバフ対象を指定します。
 * @type select
 * @option ＨＰ
 * @value 0
 * @option ＭＰ
 * @value 1
 * @option 攻撃力
 * @value 2
 * @option 防御力
 * @value 3
 * @option 魔法力
 * @value 4
 * @option 魔法防御
 * @value 5
 * @option 敏捷性
 * @value 6
 * @option 運
 * @value 7
 * @option 全て
 * @value -1
 * @default -1
 * 
 */
/*~struct~RegistrationTimingList:ja
 * 
 * @param RegistrationTiming
 * @text 登録タイミング
 * @desc 図鑑の登録タイミング。
 * @type select
 * @option 戦闘開始時
 * @value 0
 * @option 撃破時
 * @value 1
 * @option アナライズ成功時
 * @value 2
 * @option 戦闘終了時
 * @value 4
 * @option 登録なし
 * @value 10
 * @default 0
 * 
 * @param RegisterStatus
 * @desc ステータス情報を登録します。
 * @text ステータス情報登録。
 * @type boolean
 * @default true
 * 
 */
/*~struct~PageListData:ja
 * 
 * @param BasicSetting
 * @text 基本設定
 * @default
 * 
 * @param DateSelect
 * @desc 表示させる項目を指定。
 * @text 項目リスト
 * @type select
 * @option 表示なし
 * @value 0
 * @option 最大HP(1)～(14)(16)(20)(21)
 * @value 1
 * @option 最大MP(1)～(14)(16)(20)(21)
 * @value 2
 * @option 攻撃力(1)～(14)(16)(20)(21)
 * @value 3
 * @option 防御力(1)～(14)(16)(20)(21)
 * @value 4
 * @option 魔法力(1)～(14)(16)(20)(21)
 * @value 5
 * @option 魔法防御(1)～(14)(16)(20)(21)
 * @value 6
 * @option 敏捷性(1)～(14)(16)(20)(21)
 * @value 7
 * @option 運(1)～(14)(16)(20)(21)
 * @value 8
 * @option TP（現在のステータスをONのときのみ）(1)～(16)(20)(21)
 * @value 9
 * @option 命中率(1)～(16)(20)(21)
 * @value 10
 * @option 回避率(1)～(16)(20)(21)
 * @value 11
 * @option 会心率(1)～(16)(20)(21)
 * @value 12
 * @option 会心回避率(1)～(16)(20)(21)
 * @value 13
 * @option 魔法回避率(1)～(16)(20)(21)
 * @value 14
 * @option 魔法反射率(1)～(16)(20)(21)
 * @value 15
 * @option 反撃率(1)～(16)(20)(21)
 * @value 16
 * @option HP再生率(1)～(16)(20)(21)
 * @value 17
 * @option MP再生率(1)～(16)(20)(21)
 * @value 18
 * @option TP再生率(1)～(16)(20)(21)
 * @value 19
 * @option 狙われ率(1)～(16)(20)(21)
 * @value 20
 * @option 防御効果率(1)～(16)(20)(21)
 * @value 21
 * @option 回復効果率(1)～(16)(20)(21)
 * @value 22
 * @option 薬の知識(1)～(16)(20)(21)
 * @value 23
 * @option MP消費率(1)～(16)(20)(21)
 * @value 24
 * @option TPチャージ率(1)～(16)(20)(21)
 * @value 25
 * @option 物理ダメージ率(1)～(16)(20)(21)
 * @value 26
 * @option 魔法ダメージ率(1)～(16)(20)(21)
 * @value 27
 * @option 経験値(1)～(14)(16)(20)(21)
 * @value 30
 * @option 獲得金額(1)～(14)(16)(20)(21)
 * @value 31
 * @option 倒した数(1)～(14)(16)(20)(21)
 * @value 32
 * @option モンスター名(1)～(5)(7)(8)(9)(12)(16)(20)(21)
 * @value 33
 * @option レベル(戦闘時のみ)(1)～(12)(16)(20)(21)
 * @value 34
 * @option 名称のみ(1)～(5)(7)(8)(9)(12)(16)(20)(21)
 * @value 35
 * @option ターン（TPBバトルで現在のステータスをONにしている時のみ表示）(1)～(14)(16)(20)(21)
 * @value 36
 * @option モンスターブックナンバー(1)～(5)(7)(8)(9)(12)(16)
 * @value 37
 * @option 耐性属性（アイコン表示）(1)～(5)(7)(8)(9)(12)(13)(20)(21)
 * @value 40
 * @option 弱点属性（アイコン表示）(1)～(5)(7)(8)(9)(12)(13)(20)(21)
 * @value 41
 * @option 無効属性（アイコン表示）(1)～(5)(7)(8)(9)(12)(13)(20)(21)
 * @value 42
 * @option 属性耐性（耐性数値表示）(1)～(16)(20)(21)
 * @value 43
 * @option 吸収属性（アイコン表示）(1)～(5)(7)(8)(9)(12)(13)(20)(21)
 * @value 44
 * @option 耐性ステート（アイコン表示）(1)～(5)(7)(8)(9)(12)(13)(20)(21)
 * @value 45
 * @option 弱点ステート（アイコン表示）(1)～(5)(7)(8)(9)(12)(13)(20)(21)
 * @value 46
 * @option 無効ステート（アイコン表示）(1)～(5)(7)(8)(9)(12)(13)(20)(21)
 * @value 47
 * @option 耐性ステート（耐性数値表示）(1)～(16)(20)(21)
 * @value 48
 * @option 耐性デバフ（アイコン表示）(1)～(5)(7)(8)(9)(12)(13)(20)(21)
 * @value 50
 * @option 弱点デバフ（アイコン表示）(1)～(5)(7)(8)(9)(12)(13)(20)(21)
 * @value 51
 * @option 無効デバフ（アイコン表示）(1)～(5)(7)(8)(9)(12)(13)(20)(21)
 * @value 52
 * @option ドロップアイテム(1)～(15)(20)(21)
 * @value 60
 * @option スティールアイテム(1)～(15)(20)(21)
 * @value 61
 * @option 条件付きドロップアイテム(1)～(15)(20)(21)
 * @value 62
 * @option 記述欄(1)～(5)(7)(8)(9)(12)(13)(17)(20)(21)
 * @value 70
 * @option 共通記述欄(1)～(5)(7)(8)(9)(12)(13)(20)(20)(21)
 * @value 71
 * @option オリジナルパラメータ(1)～(16)(20)(21)
 * @value 80
 * @option 攻撃時属性（アイコン表示）(1)～(5)(7)(8)(9)(12)(13)(20)(21)
 * @value 90
 * @option 敵の使用スキル(1)～(15)(20)(21)
 * @value 100
 * @option 属性レーダーチャート(1)～(5)(8)(9)(12)(20)(21)
 * @value 121
 * @option ステートレーダーチャート(1)～(5)(8)(9)(12)(20)(21)
 * @value 122
 * @option モンスター画像(1)(2)(3)(4)(5)(7)(19)
 * @value 200
 * @option キャラチップ(1)(2)(3)(4)(13)
 * @value 201
 * @option 共通画像(1)(2)(3)(4)(5)(7)(18)(19)
 * @value 250
 * @option 個別画像(1)(2)(3)(4)(5)(7)(19)
 * @value 251
 * @option ページ切り替え(1)～(5)(7)(8)(9)(12)(16)
 * @value 500
 * @option ライン(1)(2)(3)(4)(5)(7)(9)
 * @value 1000
 * @default 0
 * @parent BasicSetting
 * 
 * @param X_Position
 * @text X表示列位置(1)
 * @desc X表示列位置
 * @type number
 * @default 1
 * @min 1
 * @max 3
 * @parent BasicSetting
 * 
 * @param Y_Position
 * @desc Y表示行位置
 * @text Y表示行位置(2)
 * @type number
 * @default 1
 * @min 1
 * @parent BasicSetting
 * 
 * @param X_Coordinate
 * @text X座標（相対）(3)
 * @desc X座標（X表示列位置からの相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @parent BasicSetting
 * 
 * @param Y_Coordinate
 * @text Y座標（相対）(4)
 * @desc Y座標（Y表示列位置からの相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @parent BasicSetting
 * 
 * @param ItemWidth
 * @desc 項目横幅（0で自動）
 * @text 項目横幅(5)
 * @type number
 * @default 0
 * @min 0
 * @parent BasicSetting
 * 
 * @param SystemItemWidth
 * @desc 項目名称の横幅（0で自動）
 * @text 項目名称横幅(6)
 * @type number
 * @default 0
 * @min 0
 * @parent BasicSetting
 * 
 * @param WideMode
 * @desc 項目表示モード。複数列にまたがって表示されます。
 * @text 項目表示モード(7)
 * @type select
 * @option １列表示
 * @value 1
 * @option ２列表示
 * @value 2
 * @option ３列表示（表示列数が３の時のみ）
 * @value 3
 * @default 1
 * @parent BasicSetting
 * 
 * @param paramName
 * @desc 表示する項目の名称を設定します。
 * @text 名称(8)
 * @type string
 * @default
 * @parent BasicSetting
 * 
 * @param NameColor
 * @desc 項目名称の文字色。(システムカラーまたはカラーコード)
 * @text 項目名称文字色(9)
 * @type color
 * @default 16
 * @min 0
 * @parent BasicSetting
 * 
 * @param DetaEval
 * @desc パラメータ評価式または文字列を設定します。
 * @text パラメータ評価式or文字列(10)
 * @type combo
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option 'ge._race;//種族（要蒼竜氏バトラー種族定義）'
 * @option 'ge.sp;//取得SP（要うなぎおおとろ氏スキルツリー）'
 * @default 
 * @parent BasicSetting
 * 
 * @param Back
 * @text コンテンツ背景表示(11)
 * @desc コンテンツ背景を表示させます。
 * @type boolean
 * @default false
 * @parent BasicSetting
 * 
 * @param FontSize
 * @desc フォントサイズ（メインフォント+デフォルトフォントからの差）
 * @text フォントサイズ(12)
 * @type number
 * @default 0
 * @min -99
 * @parent BasicSetting
 * 
 * @param MaskMode
 * @desc 図鑑登録の際、ステータス情報登録タイミングで情報登録してない場合はステータスを隠します。
 * @text 情報未登録ステータス表示(13)
 * @type boolean
 * @default false
 * @parent BasicSetting
 * 
 * @param Decimal
 * @text 小数点桁数(14)
 * @desc 表示出来る小数点桁数。
 * @type number
 * @default 0
 * @min 0
 * @max 99
 * @parent BasicSetting
 * 
 * @param paramUnit
 * @desc 単位を設定します。
 * @text 単位(15)
 * @type string
 * @default 
 * @parent UnitSetting
 * 
 * @param namePosition
 * @desc 文字の表示位置を指定します。
 * @text 文字の表示位置(16)
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
 * @param textMethod
 * @desc 記述欄、個別画像に紐づけするタグ名
 * @text 記述欄、個別画像タグ名(17)
 * @type string
 * @default 
 * @parent textSetting
 * 
 * @param CommonText
 * @desc 共通テキスト(制御文字使用可能)
 * @text 共通テキスト(20)
 * @type multiline_string	
 * @default 
 * @parent textSetting
 * 
 * @param ImgData
 * @desc 全てのモンスターページに表示される共通画像ファイル名を指定します。横幅は「項目横幅」、高さは「画像の最大縦幅」
 * @text 共通画像(18)
 * @type file
 * @dir img/
 * @default 
 * @parent ImgSetting
 * 
 * @param ImgMaxHeight
 * @desc 画像の最大縦幅（行数で指定）
 * @text 画像の最大縦幅(19)
 * @type number
 * @default 8
 * @min 0
 * @parent ImgSetting
 * 
 * @param IconId
 * @text アイコンID(20)
 * @desc 項目名称の左にアイコンを表示します。アイコンのIDを指定します。
 * @type icon
 * @default 0
 * 
 * @param IconY
 * @text アイコン補正Y値(21)
 * @desc アイコンの補正Y値を指定します。
 * @type number
 * @default 2
 * 
 */
/*~struct~CategoryPageListData:ja
 * 
 * @param BasicSetting
 * @text 基本設定
 * @default
 * 
 * @param DateSelect
 * @desc 表示させる項目を指定。
 * @text 項目リスト
 * @type select
 * @option 表示なし
 * @value 0
 * @option 名称のみ(1)～(5)(7)(8)(9)(12)(16)
 * @value 35
 * @option 記述欄(1)～(5)(7)(8)(9)(12)(17)
 * @value 70
 * @option 共通記述欄(1)～(5)(7)(8)(9)(12)(20)
 * @value 71
 * @option 共通画像(1)(2)(3)(4)(5)(7)(18)(19)
 * @value 250
 * @option 個別画像(1)(2)(3)(4)(5)(7)(19)
 * @value 251
 * @option ライン(1)(2)(3)(4)(5)(7)(9)
 * @value 1000
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
 * 
 * @param X_Coordinate
 * @text X座標（相対）(3)
 * @desc X座標（X表示列位置からの相対座標）
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param Y_Coordinate
 * @text Y座標（相対）(4)
 * @desc Y座標（Y表示列位置からの相対座標）
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param ItemWidth
 * @desc 項目横幅（0で自動）
 * @text 項目横幅(5)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param SystemItemWidth
 * @desc 項目名称の横幅（0で自動）
 * @text 項目名称横幅(6)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param WideMode
 * @desc 項目表示モード。複数列にまたがって表示されます。
 * @text 項目表示モード(7)
 * @type select
 * @option １列表示
 * @value 1
 * @option ２列表示
 * @value 2
 * @option ３列表示（表示列数が３の時のみ）
 * @value 3
 * @default 1
 * 
 * @param paramName
 * @desc 表示する項目の名称を設定します。
 * @text 名称(8)
 * @type string
 * @default
 * 
 * @param NameColor
 * @desc 項目名称の文字色。(システムカラーまたはカラーコード)
 * @text 項目名称文字色(9)
 * @type color
 * @default 16
 * @min 0
 * 
 * @param FontSize
 * @desc フォントサイズ（メインフォント+デフォルトフォントからの差）
 * @text フォントサイズ(12)
 * @type number
 * @default 0
 * @min -99
 * 
 * @param namePosition
 * @desc 文字の表示位置を指定します。
 * @text 文字の表示位置(16)
 * @type select
 * @option 左
 * @value "left"
 * @option 中央
 * @value "center"
 * @option 右
 * @value "right"
 * @default "left"
 * 
 * @param textMethod
 * @desc 記述欄、個別画像に紐づけするタグ名
 * @text 記述欄、個別画像タグ名(17)
 * @type string
 * @default 
 * 
 * @param CommonText
 * @desc 共通テキスト(制御文字使用可能)
 * @text 共通テキスト(20)
 * @type multiline_string	
 * @default 
 * 
 * @param ImgData
 * @desc 全てのモンスターページに表示される共通画像ファイル名を指定します。横幅は「項目横幅」、高さは「画像の最大縦幅」
 * @text 共通画像(18)
 * @type file
 * @dir img/
 * @default 
 * 
 * @param ImgMaxHeight
 * @desc 画像の最大縦幅（行数で指定）
 * @text 画像の最大縦幅(19)
 * @type number
 * @default 8
 * @min 0
 * 
 * @param IconId
 * @text アイコンID(20)
 * @desc 項目名称の左にアイコンを表示します。アイコンのIDを指定します。
 * @type icon
 * @default 0
 * 
 * @param IconY
 * @text アイコン補正Y値(21)
 * @desc アイコンの補正Y値を指定します。
 * @type number
 * @default 2
 * 
 */
/*~struct~PageSettingData:ja
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
 * @option 表示リスト１１
 * @value 11
 * @option 表示リスト１２
 * @value 12
 * @option 表示リスト１３
 * @value 13
 * @option 表示リスト１４
 * @value 14
 * @option 表示リスト１５
 * @value 15
 * @option 表示リスト１６
 * @value 16
 * @option 表示リスト１７
 * @value 17
 * @option 表示リスト１８
 * @value 18
 * @option 表示リスト１９
 * @value 19
 * @option 表示リスト２０
 * @value 20 
 * @default 1
 * 
 * @param PageCategoryName
 * @desc ページの名前を設定します。
 * @text ページ名
 * @type string
 * @default
 * 
 * @param BackGroundImg
 * @desc 背景画像ファイル名を指定します。
 * @text 背景画像
 * @type file
 * @dir img/
 * @default 
 *  
 */
/*~struct~BookCategoryList:ja
 * 
 * @param CategoryName
 * @desc カテゴリー名を設定します。
 * @text カテゴリー名
 * @type string
 * 
 * @param CategoryKey
 * @desc カテゴリーのKeyを設定します。(all:全て表示、mapEnemy:現在のマップ)
 * @text カテゴリーKey
 * @type combo
 * @option 'all'
 * @option 'mapEnemy'
 * @default
 * 
 * @param CategoryNote
 * @desc メモ欄。
 * @text メモ欄
 * @type multiline_string
 * @default 
 * 
 */
/*~struct~PercentContentList:ja
 *
 * @param ContentName
 * @desc 名称。
 * @text 表示名称
 * @type string
 * @default 
 * 
 * @param ContentDate
 * @desc 表示する情報を指定します。
 * @text 表示情報
 * @type select
 * @option 完成度
 * @value 0
 * @option 遭遇済み
 * @value 1
 * @option 撃破済み
 * @value 2
 * @option 情報登録済み
 * @value 3
 * @option 遭遇数
 * @value 11
 * @option 撃破数
 * @value 12
 * @option 情報登録数
 * @value 13
 * @default 0
*
*/
/*~struct~ElementData:ja
 * 
 * @param ElementNo
 * @desc 表示する属性番号です。(0:なし、-1:物理ダメージ率、-2:魔法ダメージ率)
 * @text 属性番号
 * @type number
 * @min -2
 * 
 * @param ElementIconId
 * @desc アイコンのIDを指定します。
 * @text アイコンID
 * @type icon
 * @min 0
 */
/*~struct~StateData:ja
 *
 * @param StateId
 * @desc 表示するステートです。
 * @text 表示ステート
 * @type state
 *
 */
/*~struct~DebuffData:ja
 * 
 * @param ParamId
 * @text デバフ対象
 * @desc 表示デバフを指定します。
 * @type select
 * @option ＨＰ
 * @value 0
 * @option ＭＰ
 * @value 1
 * @option 攻撃力
 * @value 2
 * @option 防御力
 * @value 3
 * @option 魔法力
 * @value 4
 * @option 魔法防御
 * @value 5
 * @option 敏捷性
 * @value 6
 * @option 運
 * @value 7
 * @default 0
 * 
 * @param DebuffIconId
 * @desc アイコンのIDを指定します。
 * @text アイコンID
 * @type icon
 * @default 0
 */
/*~struct~AnalyzeSkill:ja
 * 
 * @param ListNumber
 * @desc 表示するアナライズのリスト番号を指定します。0で図鑑表示と同じ
 * @text アナライズ項目指定
 * @type number
 * @default 0
 * 
 * @param ContentCols
 * @text モンスター情報項目列数
 * @desc モンスター情報の項目列数。
 * @type number
 * @default 2
 * @min 1
 * 
 * @param StatusGaugeVisible
 * @type boolean
 * @default true
 * @text ゲージを表示
 * @desc HP、MPのゲージを表示します。
 * 
 * @param EnemyCurrentStatus
 * @type boolean
 * @default true
 * @text モンスターの現在ステータス表示
 * @desc モンスターの現在のステータスを表示します。
 * 
 * @param AnalyzeMissMessage
 * @type string
 * @default %2はアナライズに失敗した。
 * @text アナライズ失敗時メッセージ
 * @desc アナライズの失敗時のメッセージを設定します。
 * 
 * @param BuffColor
 * @desc バフ時の文字色。
 * @text バフ時文字色
 * @type color
 * @default 0
 * @max 999999
 * 
 * @param DebuffColor
 * @desc デバフ時の文字色。
 * @text デバフ時文字色
 * @type color
 * @default 0
 * @max 999999
 * 
 * 
 */
/*~struct~AnalyzeList:ja
 * 
 * @param Name
 * @desc 識別名。
 * @text 識別名
 * @type string
 * @default 
 * 
 * @param AnalyzePageList
 * @desc 表示する項目設定。
 * @text 表示項目設定
 * @type struct<PageSettingData>[]
 * @default 
 * @parent AnalyzeSetting
 * 
 */
/*~struct~WindowSkinData:ja
 *
 * @param WindowSkin
 * @desc ウィンドウスキンを指定します。
 * @text ウィンドウスキン画像
 * @type file
 * @dir img/system
 * @default
 * 
 * @param WindowSkinColor
 * @text ウィンドウカラー
 * @desc ウィンドウの色の設定をします。
 * @default {"red":"0","green":"0","bule":"0"}
 * @type struct<WindowTone>
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
/*~struct~EncountList:ja
 * 
 * @param MapId
 * @desc マップID(複数指定の場合は,区切り)
 * @text マップID
 * @type string
 * @default 
 * 
 * @param Enemy
 * @desc 指定のマップでエンカウントする敵キャラを指定します。
 * @text 敵キャラリスト
 * @type enemy[]
 * @default 
 * 
 */
/*~struct~SetEnemy:
 * 
 * @param Enemy
 * @desc 指定のマップでエンカウントする敵キャラを指定します。
 * @text 敵キャラ
 * @type enemy
 * @default 
 * 
 * @param EnemyEval
 * @desc 敵キャラの適用条件をjavascriptで記入します。
 * @text 敵キャラ適用条件
 * @type combo
 * @default 
 * 
 */

var Imported = Imported || {};
Imported.NUUN_EnemyBook = true;

(() => {
const parameters = PluginManager.parameters('NUUN_EnemyBook');

const WindowMode = eval(parameters['WindowMode']) || 0;
const DecimalMode = eval(parameters['DecimalMode'] || 'true');
const NoDataName = String(parameters['NoDataName']);
const TransformDefeat = eval(parameters['TransformDefeat'] || 'true');
const BackUiWidth = eval(parameters['BackUiWidth'] || 'true');
const BackFitWidth = eval(parameters['BackFitWidth'] || 'false');
const NoBookTag = NuunManager.getStringCode(parameters['NoBookTag']) || 'NoBook';
const NoBookDataTag = NuunManager.getStringCode(parameters['NoBookDataTag']) || 'NoBookData';
const PageNextSymbol = NuunManager.getStringCode(parameters['PageNextSymbol']);
const PagePreviousSymbol = NuunManager.getStringCode(parameters['PagePreviousSymbol']);
const ActualEnemyMask = eval(parameters['ActualEnemyMask'] || 'true');
const EnemyGraphicMode = Number(parameters['EnemyGraphicMode'] || 0);

const RegistrationTiming = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['RegistrationTiming'])) : [];
const RegistrationEnemyColor = (DataManager.nuun_structureData(parameters['RegistrationEnemyColor'])) || 0;
const RegistrationStatusEnemyColor = (DataManager.nuun_structureData(parameters['RegistrationStatusEnemyColor'])) || 0;

const CommandName = String(parameters['CommandName']);
const enemyBookSwitch = Number(parameters['enemyBookSwitch'] || 0);
const ShowCommand = eval(parameters['ShowCommand'] || 'false');
const ShowBattleCommand = eval(parameters['ShowBattleCommand'] || 'false');
const enemyBookBattleSwitch = Number(parameters['enemyBookBattleSwitch'] || 0);
const CondCommandEnemyBook = NuunManager.getEvalCode(parameters['CondCommandEnemyBook']) || true;
const CondBattleCommandEnemyBook = NuunManager.getEvalCode(parameters['CondBattleCommandEnemyBook']) || true;
const CondEnemyBookInfo = NuunManager.getEvalCode(parameters['CondEnemyBookInfo']) || true;

const RegistrationEnemyInfo = eval(parameters['RegistrationEnemyInfo'] || 'false');
const InfoMaskMode = eval(parameters['InfoMaskMode'] || 'false');
const ShowEnemyInfoCommand = eval(parameters['ShowEnemyInfoCommand'] || 'false');
const EnemyInfoCommandName = String(parameters['EnemyInfoCommandName']);
const enemyBookInfoSwitch = Number(parameters['enemyBookInfoSwitch'] || 0);
const InfoWindowsSkin = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['InfoWindowsSkin'])) : {};

const PageSetting = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageSetting'])) : [];
const PageCols = Number(parameters['PageCols'] || 2);
const ContentCols = Number(parameters['ContentCols'] || 2);
const InfoPageSetting = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['InfoPageSetting'])) : [];
const InfoPageCols = Number(parameters['InfoPageCols'] || 2);
const InfoContentCols = Number(parameters['InfoContentCols'] || 2);
const InfoStatusGaugeVisible = eval(parameters['InfoStatusGaugeVisible'] || 'true');
const InfoEnemyCurrentStatus = eval(parameters['InfoEnemyCurrentStatus'] || 'true');
const AnalyzeSkillMode = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['AnalyzeSkillMode'])) : [];
const AnalyzeListData = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['AnalyzeListData'])) : [];
const ContentWindowsSkin = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ContentWindowsSkin'])) : {};
const CommonVariableID = Number(parameters['CommonVariableID'] || 0);
const UnregisteredEnemy = Number(parameters['UnregisteredEnemy'] || 0);

const BookWidth = Number(parameters['BookWidth'] || 0);
const NoTouchUIWindow = eval(parameters['NoTouchUIWindow'] || 'false');
const PercentWindowShow = eval(parameters['PercentWindowShow'] || 'true');
const PercentContent = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PercentContent'])) : [];
const Interval = Number(parameters['Interval'] || 0);
const PercentWindowsSkin = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PercentWindowsSkin'])) : {};

const CategoryNameWindowsSkin = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['CategoryNameWindowsSkin'])) : {};

const CategoryShow = eval(parameters['CategoryShow'] || 'true');
const EnemyBookCategory = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['EnemyBookCategory'])) : [];
const CategoryVisibleType = eval(parameters['CategoryVisibleType']) || 0;
const CategoryUnknownData = String(parameters['CategoryUnknownData'] || '？');
const CategoryWindowsSkin = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['CategoryWindowsSkin'])) : {};
const CategoryListDateSetting = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['CategoryListDateSetting'])) : [];

const NumberType = eval(parameters['NumberType']) || 0;
const NumberWidth = String(parameters['NumberWidth'] || '00');
const UnknownVisible = eval(parameters['UnknownVisible'] || 'false');
const NumberMode = eval(parameters['NumberMode'] || 'false');
const UnknownData = String(parameters['UnknownData'] || '？');
const UnknownEnemyIcons = Number(parameters['UnknownEnemyIcons'] || 0);
const IndexWindowsSkin = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['IndexWindowsSkin'])) : {};

const PageWindowsShow = eval(parameters['PageWindowsShow'] || 'false');
const PageWindowsSkin = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageWindowsSkin'])) : {};

const EnemyBookDefaultFontSize = Number(parameters['EnemyBookDefaultFontSize'] || 0);
const UnknownStatus = String(parameters['UnknownStatus'] || '？？？');
const UnknownItems = String(parameters['UnknownItems'] || '？');
const ImgFolder = NuunManager.getStringCode(parameters['ImgFolder'] || 'pictures');
const SVEnemyMirror = eval(parameters['SVEnemyMirror'] || 'true');

const BuffColor = (DataManager.nuun_structureData(parameters['BuffColor'])) || 0;
const DebuffColor = (DataManager.nuun_structureData(parameters['DebuffColor'])) || 0;
const HPgaugeWidth = Number(parameters['HPgaugeWidth'] || 200);
const MPgaugeWidth = Number(parameters['MPgaugeWidth'] || 200);
const TPgaugeWidth = Number(parameters['TPgaugeWidth'] || 200);

const DropItemProbabilityShow = eval(parameters['DropItemProbabilityShow'] || 'false');
const DropRateEval = NuunManager.getEvalCode(parameters['DropRateEval']);
const ShowDropItemName = eval(parameters['ShowDropItemName'] || 'false');
const DropItemMultiCols = Number(parameters['DropItemMultiCols'] || 1);
const CondDropItemCols = Number(parameters['CondDropItemCols'] || 1);

const StealItemProbabilityShow = eval(parameters['StealItemProbabilityShow'] || 'false');
const StealRateEval = NuunManager.getEvalCode(parameters['StealRateEval']);
const ShowStealItemName = eval(parameters['ShowStealItemName'] || 'false');
const StealItemCols = Number(parameters['StealItemCols'] || 1);

const ShowActionName = eval(parameters['ShowActionName'] || 'false');
const ActionMaxItems = Number(parameters['ActionMaxItems'] || 0);
const ActionCols = Number(parameters['ActionCols'] || 1);

const ElementList = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ElementList'])) : [];
const ShowElementsIcon = eval(parameters['ShowElementsIcon'] || 'false');
const ElementUnknownIconId = Number(parameters['ElementUnknownIconId'] || 1);
const ResistNoEffectElement = eval(parameters['ResistNoEffectElement'] || 'true');
const ResistWeakElementMode = eval(parameters['ResistWeakElementMode']) || 2;
const AbsorptionNoEffectElement = eval(parameters['AbsorptionNoEffectElement'] || 'true');
const ElementCol = Number(parameters['ElementCol'] || 1);
const ElementRadarChartRadius = Number(parameters['ElementRadarChartRadius'] || 100);
const ElementRadarChartFramecolor = Number(parameters['ElementRadarChartFramecolor'] || 0);
const ElementRadarChartLineColor = Number(parameters['ElementRadarChartLineColor'] || 0);
const ElementRadarChartMainColor1 = Number(parameters['ElementRadarChartMainColor1'] || 0);
const ElementRadarChartMainColor2 = Number(parameters['ElementRadarChartMainColor2'] || 0);
const ElementRadarChartX = Number(parameters['ElementRadarChartX'] || 48);
const ElementRadarChartY = Number(parameters['ElementRadarChartY'] || 48);
const ElementRadarChart_FontSize = Number(parameters['ElementRadarChart_FontSize'] || 0);

const StateList = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['StateList'])) : [];
const StateUnknownIconId = Number(parameters['StateUnknownIconId'] || 1);
const NormalWeakState = eval(parameters['NormalWeakState'] || 'false');
const ResistNoEffectState = eval(parameters['ResistNoEffectState'] || 'true');
const ResistWeakStateMode = eval(parameters['ResistWeakStateMode']) || 2;
const StateCol = Number(parameters['StateCol'] || 1);
const ShowStateIcon = eval(parameters['ShowStateIcon'] || 'false');
const StateRadarChartRadius = Number(parameters['StateRadarChartRadius'] || 100);
const StateRadarChartFramecolor = Number(parameters['StateRadarChartFramecolor'] || 0);
const StateRadarChartLineColor = Number(parameters['StateRadarChartLineColor'] || 0);
const StateRadarChartMainColor1 = Number(parameters['StateRadarChartMainColor1'] || 0);
const StateRadarChartMainColor2 = Number(parameters['StateRadarChartMainColor2'] || 0);
const StateRadarChartX = Number(parameters['StateRadarChartX'] || 48);
const StateRadarChartY = Number(parameters['StateRadarChartY'] || 48);
const StateRadarChart_FontSize = Number(parameters['StateRadarChart_FontSize'] || 0);
const RadarChartIcon = eval(parameters['RadarChartIcon'] || 'false');
const ResistDebuffInState = eval(parameters['ResistDebuffInState'] || 'false');

const DeBuffList = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['DeBuffList'])) : [];
const DeBuffUnknownIconId = Number(parameters['DeBuffUnknownIconId'] || 1);
const NormalWeakDebuff = eval(parameters['NormalWeakDebuff'] || 'false');
const ResistNoEffectDebuff = eval(parameters['ResistNoEffectDebuff'] || 'true');
const ShowDebuffIcon = eval(parameters['ShowDebuffIcon'] || 'false');

const DefaultBackGroundImg = String(parameters['DefaultBackGroundImg']);
const DefaultInfoBackGroundImg = String(parameters['DefaultInfoBackGroundImg']);
const CategoryBackGroundImg = String(parameters['CategoryBackGroundImg']);
const AllWindowVisibleHide = eval(parameters['AllWindowVisibleHide'] || 'false');
const CategoryNameWindowVisible = eval(parameters['CategoryNameWindowVisible'] || 'true');
const CategoryWindowVisible = eval(parameters['CategoryWindowVisible'] || 'true');
const IndexWindowVisible = eval(parameters['IndexWindowVisible'] || 'true');
const InfoWindowVisible = eval(parameters['InfoWindowVisible'] || 'true');
const PercentWindowVisible = eval(parameters['PercentWindowVisible'] || 'true');
const PageWindowVisible = eval(parameters['PageWindowVisible'] || 'true');
const ContentWindowVisible = eval(parameters['ContentWindowVisible'] || 'true');
const BackgoundWindowMode = eval(parameters['BackgoundWindowMode'] || 'false');

const bookContents = {};
bookContents.PageList1 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList1'])) : [];
bookContents.PageList2 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList2'])) : [];
bookContents.PageList3 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList3'])) : [];
bookContents.PageList4 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList4'])) : [];
bookContents.PageList5 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList5'])) : [];
bookContents.PageList6 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList6'])) : [];
bookContents.PageList7 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList7'])) : [];
bookContents.PageList8 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList8'])) : [];
bookContents.PageList9 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList9'])) : [];
bookContents.PageList10 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList10'])) : [];
bookContents.PageList11 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList11'])) : [];
bookContents.PageList12 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList12'])) : [];
bookContents.PageList13 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList13'])) : [];
bookContents.PageList14 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList14'])) : [];
bookContents.PageList15 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList15'])) : [];
bookContents.PageList16 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList16'])) : [];
bookContents.PageList17 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList17'])) : [];
bookContents.PageList18 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList18'])) : [];
bookContents.PageList19 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList19'])) : [];
bookContents.PageList20 = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PageList20'])) : [];

const MapEncountEnemiesList = setMapList();

const pageIndex = {category:0, index:0, page:0, infoIndex:0};
const NRP_pLoopLR = PluginManager.parameters("NRP_LoopCursor").loopLR;
let ge = null;
let de = null;
let apngCache = null;

const pluginName = "NUUN_EnemyBook";

PluginManager.registerCommand(pluginName, 'EnemyBookOpen', args => {
    if ($gameParty.inBattle()) {
      SceneManager._scene.commandEnemyBook();
    } else {
      SceneManager.push(Scene_EnemyBook);
    }
});
      
PluginManager.registerCommand(pluginName, 'EnemyInfoOpen', args => {
    if ($gameParty.inBattle()) {
        SceneManager._scene.commandEnemyBookInfo();
    }
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookAdd', args => {
    const enemyId = Number(args.enemyId);
    if (enemyId > 0) {
        $gameSystem.addToEnemyBook(enemyId);
    }
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookRemove', args => {
    const enemyId = Number(args.enemyId);
    if (enemyId > 0) {
        $gameSystem.removeFromEnemyBook(enemyId);
    }
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookStatusAdd', args => {
    const enemyId = Number(args.enemyId);
    if (enemyId > 0) {
        $gameSystem.statusToEnemyBook(enemyId);
    }
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookStatusRemove', args => {
    const enemyId = Number(args.enemyId);
    if (enemyId > 0) {
        $gameSystem.removeStatusEnemyBook(enemyId);
    }
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookComplete', args => {
    $gameSystem.completeEnemyBook();
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookClear', args => {
    $gameSystem.clearEnemyBook();
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookAddDefeat', args => {
    const enemyId = Number(args.enemyId);
    if (enemyId > 0) {
        $gameSystem.addDefeat(enemyId);
    }
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookRemoveDefeat', args => {
    $gameSystem.resetDefeat(Number(args.enemyId));
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookRegistration', args => {
    const enemyId = Number(args.enemyId);
    if (enemyId > 0) {
        $gameSwitches.setValue(Number(args.registrationSwitch), $gameSystem.isInEnemyBook($dataEnemies[enemyId]));
    } else {
        $gameSwitches.setValue(Number(args.registrationSwitch), false);
    }
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookStatusRegistration', args => {
    const enemyId = Number(args.enemyId);
    if (enemyId > 0) {
        $gameSwitches.setValue(Number(args.statusRegistrationSwitch), $gameSystem.isInEnemyBookStatus($dataEnemies[enemyId]));
    } else {
        $gameSwitches.setValue(Number(args.statusRegistrationSwitch), false);
    }
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookGetDropItem', args => {
    $gameSystem.dropItemListFlag(Number(args.enemyId), Number(args.dropListId) - 1, true, Number(args.dropListId) > 0);
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookRemoveDropItem', args => {
    $gameSystem.dropItemListFlag(Number(args.enemyId), Number(args.dropListId) - 1, false, Number(args.dropListId) > 0);
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookGetStealItem', args => {
    $gameSystem.stealItemListFlag(Number(args.enemyId) , Number(args.stealListId) - 1, true, Number(args.stealListId) > 0);
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookRemoveStealItem', args => {
    $gameSystem.stealItemListFlag(Number(args.enemyId) , Number(args.stealListId) - 1, false, Number(args.stealListId) > 0);
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookDefeatEnemy', args => {
    $gameSystem.defeatEnemyVar(Number(args.DefeatEnemy));
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookEncounteredEnemy', args => {
    $gameSystem.encounteredEnemyVar(Number(args.EncounteredEnemy));
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookCompleteRate', args => {
    $gameSystem.completeRateVariables(Number(args.CompleteRate));
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookDefeatEnemySum', args => {
    const enemyId = Number(args.enemyId);
    if (enemyId > 0) {
        $gameSystem.defeatEnemySumVar(enemyId, Number(args.DefeatEnemySum));
    }
});
      
PluginManager.registerCommand(pluginName, 'DorpItemAcquired', args => {
    $gameSystem.dorpItemAcquired(Number(args.DorpItemAcquiredswitch), Number(args.enemyId), Number(args.DorpItemAcquiredId) - 1);
});
      
PluginManager.registerCommand(pluginName, 'StealItemAcquired', args => {
    $gameSystem.stealItemAcquired(Number(args.StealAcquiredswitch), Number(args.enemyId), Number(args.stealAcquiredId) - 1);
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookActionAdd', args => {
    $gameSystem.enemyBookActionList(Number(args.enemyId), Number(args.actionId) - 1, Number(args.actionId) > 0, true);
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookActionRemove', args => {
    $gameSystem.enemyBookActionList(Number(args.enemyId), Number(args.actionId) - 1, Number(args.actionId) > 0, false);
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookElementAdd', args => {
    if (!Imported.NUUN_EnemyBookEX_1) {
        return;
    }
    $gameSystem.enemyBookElementList(Number(args.enemyId), Number(args.elementId) - 1, Number(args.elementId) > 0, true);
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookElementRemove', args => {
    if (!Imported.NUUN_EnemyBookEX_1) {
        return;
    }
    $gameSystem.enemyBookElementList(Number(args.enemyId), Number(args.elementId) - 1, Number(args.elementId) > 0, false);
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookStateAdd', args => {
    if (!Imported.NUUN_EnemyBookEX_1) {
        return;
    }
    $gameSystem.enemyBookStateList(Number(args.enemyId), Number(args.stateId) - 1, Number(args.stateId) > 0, true);
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookStateRemove', args => {
    if (!Imported.NUUN_EnemyBookEX_1) {
        return;
    }
    $gameSystem.enemyBookStateList(Number(args.enemyId), Number(args.stateId) - 1, Number(args.stateId) > 0, false);
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookDebuffAdd', args => {
    if (!Imported.NUUN_EnemyBookEX_1) {
        return;
    }
    $gameSystem.enemyBookDebuffList(Number(args.enemyId), Number(args.debuffId) - 1, Number(args.debuffId) > 0, true);
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookDebuffRemove', args => {
    if (!Imported.NUUN_EnemyBookEX_1) {
        return;
    }
    $gameSystem.enemyBookDebuffList(Number(args.enemyId), Number(args.debuffId) - 1, Number(args.debuffId) > 0, false);
});

function setMapList() {
    const MapEncountEnemy = DataManager.nuun_structureData(parameters['MapEncountEnemy']);
    if (!MapEncountEnemy) {
        return null;
    }
    const MapEncountEnemies = [];
    MapEncountEnemy.forEach(data => {
        if (data.MapId) {
            const mapList = isNaN(data.MapId) ? data.MapId.split(',').map(Number) : [data.MapId];
            mapList.forEach(mapId => {
                MapEncountEnemies[mapId] = data;
            });
        }
    });
    return MapEncountEnemies;
};

function getTransformEnemy(enemyId) {
    if ($dataEnemies[enemyId].meta.TransformEnemy) {
        enemyId = Number($dataEnemies[enemyId].meta.TransformEnemy);
    }
    return enemyId;
};

NuunManager.getMapEncountEnemyList = function() {
    return MapEncountEnemiesList;
};

NuunManager.isMapEncountEnemList = function() {
    return !!MapEncountEnemiesList && MapEncountEnemiesList.length > 0;
};

const _DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    _DataManager_extractSaveContents.call(this, contents);
    $gameSystem.initEnemyBookNumber();
};

//Game_System
const _Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
  _Game_System_initialize.call(this);
  this._enemyBookFlags = this._enemyBookFlags || [];
  this._enemyBookStatusFlags = this._enemyBookStatusFlags || [];
  this._defeatNumber = this._defeatNumber || [];
  this._itemDorps = this._itemDorps || [];
  this._condItemDorps = this._condItemDorps || [];
  this._stealItem = this._stealItem || [];
  this._enemyBookElementFlags = this._enemyBookElementFlags || [];
  this._enemyBookStateFlags = this._enemyBookStateFlags || [];
  this._enemyBookDebuffFlags = this._enemyBookDebuffFlags || [];
  this._enemyBookActionFlags = this._enemyBookActionFlags || [];
  this.initEnemyBookNumber();
  this.initCategoryEnemyBook();
};

Game_System.prototype.addToEnemyBook = function(enemyId) {
  if(!this._enemyBookFlags) {
    this.clearEnemyBookFlags();
  }
  enemyId = getTransformEnemy(enemyId);
  this._enemyBookFlags[enemyId] = true;
};

Game_System.prototype.addStatusToEnemyBook = function(enemyId) {
  if(!this._enemyBookStatusFlags) {
    this.clearEnemyBookStatusFlags();
  }
  enemyId = getTransformEnemy(enemyId);
  this._enemyBookStatusFlags[enemyId] = true;
};

Game_System.prototype.categoryToEnemyBook = function(enemy) {
  if (enemy && this.isInEnemyBook(enemy)) {
    const enemyCategory = enemy.meta.CategoryKey ? enemy.meta.CategoryKey.split(',') : [];
    for (key of enemyCategory) {
      const index = EnemyBookCategory.findIndex(category => category.CategoryKey === key);
      if (index >= 0) {
        this._enemyBookCategoryFlags[index] = true;
      }
    }
  }
};

Game_System.prototype.getCategoryEnemyBook = function(index) {
  return this._enemyBookCategoryFlags[index];
};

Game_System.prototype.initCategoryEnemyBook = function() {
  this._enemyBookCategoryFlags = [];
  const enemyBookCategoryLength = EnemyBookCategory.length;
  for (let i = 0; i < enemyBookCategoryLength; i++) {
    this._enemyBookCategoryFlags[i] = false;
  }
  const index = EnemyBookCategory.findIndex(category => category.CategoryKey === 'all');
  if (index >= 0) {
    this._enemyBookCategoryFlags[index] = true;
  }
};

Game_System.prototype.statusToEnemyBook = function(enemyId) {
  this.addToEnemyBook(enemyId);
  this.addStatusToEnemyBook(enemyId);
};

Game_System.prototype.removeEnemyBook = function(enemyId) {
  if(!this._enemyBookFlags) {
    this.clearEnemyBookFlags();
  }
  this._enemyBookFlags[enemyId] = false;
};

Game_System.prototype.removeStatusEnemyBook = function(enemyId) {
  if(!this._enemyBookStatusFlags) {
    this.clearEnemyBookStatusFlags();
  }
  this._enemyBookStatusFlags[enemyId] = false;
};

Game_System.prototype.removeFromEnemyBook = function(enemyId) {
  if(this._enemyBookFlags) {
    this.removeEnemyBook(enemyId);
    this.removeStatusEnemyBook(enemyId);
    this.dropItemListFlag(enemyId, 0, false, false);
    this.stealItemListFlag(enemyId, 0, false, false);
    this.enemyBookActionList(enemyId, 0, false, false);
    if (Imported.NUUN_EnemyBookEX_1) {
      this.enemyBookElementList(enemyId, 0, false, false);
      this.enemyBookStateList(enemyId, 0, false, false);
      this.enemyBookDebuffList(enemyId, 0, false, false);
    }
    if (Imported.NUUN_EnemyBookEX_2) {
      this.condDropItemListFlag(enemyId, 0, false, false);
    }
    if (!this._defeatNumber) {
      this.clearDefeat();
    }
    this._defeatNumber[enemyId] = 0;
  }
};

Game_System.prototype.clearEnemyBookFlags = function() {
  this._enemyBookFlags = [];
};

Game_System.prototype.clearEnemyBookStatusFlags = function() {
  this._enemyBookStatusFlags = [];
};

Game_System.prototype.clearEnemyBook = function() {
  this.clearEnemyBookFlags();
  this.clearEnemyBookStatusFlags();
  this.clearDefeat();
  this.clearDropItem();
  this.clearStealItem();
  this.clearEnemyBookAction();
  if (Imported.NUUN_EnemyBookEX_1) {
    this.clearEnemyBookElement();
    this.clearEnemyBookState();
    this.clearEnemyBookDebuff();
  }
  if (Imported.NUUN_EnemyBookEX_2) {
    this.clearCondDropItem();
  }
};

Game_System.prototype.completeEnemyBook = function() {
  for (let i = 1; i < $dataEnemies.length; i++) {
    this.addToEnemyBook(i);
    this.addStatusToEnemyBook(i);
    this.dropItemListFlag(i, 0, true, false);
    this.stealItemListFlag(i, 0, true, false);
    this.enemyBookActionList(i, 0, false, true);
    if (Imported.NUUN_EnemyBookEX_1) {
      this.enemyBookElementList(i, 0, false, true);
      this.enemyBookStateList(i, 0, false, true);
      this.enemyBookDebuffList(i, 0, false, true);
    }
    if (Imported.NUUN_EnemyBookEX_2) {
      this.condDropItemListFlag(i, 0, true, false);
    }
  }
};

Game_System.prototype.getEnemyBookFlag = function(enemyId) {
  return this._enemyBookFlags ? this._enemyBookFlags[enemyId] : false;
};

Game_System.prototype.getEnemyBookStatusFlag = function(enemyId) {
    return this._enemyBookStatusFlags ? this._enemyBookStatusFlags[enemyId] : false;
  };

Game_System.prototype.isInEnemyBook = function(enemy) {
  return enemy && enemy.name && this.noEnemyBookEnemyName(enemy) && this._enemyBookFlags && this._enemyBookFlags[enemy.id];
};

Game_System.prototype.isInEnemyBookStatus = function(enemy) {
  return enemy && enemy.name && this.noEnemyBookEnemyName(enemy) && this._enemyBookStatusFlags && this._enemyBookStatusFlags[enemy.id];
};

Game_System.prototype.completeRateVariables = function(val) {
  const rate = this.completeRate();
  $gameVariables.setValue(val, rate);
};

Game_System.prototype.completeRate = function() {
  return this.onStatusEnemyDate() / this.bookEnemyDate() * 100;
};

Game_System.prototype.isEnemyBook = function(enemy) {//データベース
  return enemy && enemy.name && this.noEnemyBookEnemyName(enemy) && !enemy.meta[NoBookTag] && !enemy.meta[NoBookDataTag];
};

Game_System.prototype.isEnemyBookData = function(enemy) {//データベース
    return enemy && enemy.name && this.noEnemyBookEnemyName(enemy) && !enemy.meta[NoBookTag];
};

Game_System.prototype.bookEnemyDate = function() {
  return $dataEnemies.reduce((r, enemy) => {
    return r + (this.isEnemyBook(enemy) ? 1 : 0);
  }, 0);
};

Game_System.prototype.onStatusEnemyDate = function(enemyList) {
  const enemy = enemyList ? enemyList : $dataEnemies;
  return enemy.reduce((r, enemy) => {
    return r + (this.isEnemyBook(enemy) && this.isInEnemyBookStatus(enemy) ? 1 : 0);
  }, 0);
};

Game_System.prototype.clearDefeat = function() {
	this._defeatNumber = [];
};

Game_System.prototype.defeatCount = function(enemyId) {
  if (!this._defeatNumber) {
    this.clearDefeat();
  }
  enemyId = getTransformEnemy(enemyId);
  this._defeatNumber[enemyId] = this._defeatNumber[enemyId] || 0;
  this._defeatNumber[enemyId]++;
};

Game_System.prototype.defeatNumber = function(enemyId) {
  if(this._defeatNumber && this._defeatNumber[enemyId]) {
    return this._defeatNumber[enemyId];
  }
  return 0;
};

Game_System.prototype.setDefeatEnemy = function(enemyList) {
  const enemy = enemyList ? enemyList : $dataEnemies;
  this._defeatEnemy = enemy.reduce((r, enemy) => {
    return r + (enemy && enemy.name && this.noEnemyBookEnemyName(enemy) && (this.defeatNumber(enemy.id) > 0 || enemy.meta.ShowDataBook && !enemy.meta[NoBookTag] && !enemy.meta[NoBookDataTag]) ? 1 : 0);
  }, 0);
};

Game_System.prototype.noEnemyBookEnemyName = function(enemy) {
  return NoDataName ? NoDataName !== enemy.name : true;
};

Game_System.prototype.defeatEnemy = function(enemyList) {
  this.setDefeatEnemy(enemyList);
  return this._defeatEnemy;
};

Game_System.prototype.defeatEnemyVar = function(val) {
  this.setDefeatEnemy();
  $gameVariables.setValue(val, this._defeatEnemy);
};

Game_System.prototype.defeatEnemySumVar = function(enemy, val) {
  $gameVariables.setValue(val, this.defeatNumber(enemy));
};

Game_System.prototype.addDefeat = function(enemy) {
  if (this.defeatNumber(enemy) <= 0) {
    this.defeatCount(enemy);
  }
};

Game_System.prototype.resetDefeat = function(enemyId) {
  if (!this._defeatNumber) {
    this.clearDefeat();
  }
  if (enemyId > 0) {
    if(this._defeatNumber[enemyId]) {
      this._defeatNumber[enemyId] = 0;
    }
  } else {
    for(let i = 1; $dataEnemies.length > i; i++) {
      this._defeatNumber[i] = 0;
    }
  }
};

Game_System.prototype.setEncounteredEnemy = function(enemyList) {
  const enemy = enemyList ? enemyList : $dataEnemies;
  this._EncounteredEnemy = enemy.reduce((r ,enemy) => {
    return r + (this.encounteredEnemyBook(enemy) ? 1 : 0);
  }, 0);
};

Game_System.prototype.encounteredEnemy = function(enemyList) {
  this.setEncounteredEnemy(enemyList);
  return this._EncounteredEnemy;
};

Game_System.prototype.encounteredEnemyVar = function(val) {
  this.setEncounteredEnemy();
  $gameVariables.setValue(val, this._EncounteredEnemy);
};

Game_System.prototype.encounteredEnemyBook = function(enemy) {
  return this.isEnemyBook(enemy) && this.isInEnemyBook(enemy);
};

Game_System.prototype.clearDropItem = function() {
	this._itemDorps = [];
};

Game_System.prototype.setDropItemFlag = function(enemyId, dropId, flag) {
  if (!ShowDropItemName) {
    return;
  }
	if (!this._itemDorps) {
		this.clearDropItem();
  }
  enemyId = getTransformEnemy(enemyId);
  this._itemDorps[enemyId] = this._itemDorps[enemyId] || [];
  this._itemDorps[enemyId][dropId] = flag;
};

Game_System.prototype.getDropItemFlag = function(enemyId, dropId) {
  if(!this._itemDorps || !this._itemDorps[enemyId] || !this._itemDorps[enemyId][dropId]) {
    return false;
  }
  return this._itemDorps[enemyId][dropId];
};

Game_System.prototype.clearStealItem = function() {
	this._stealItem = [];
};

Game_System.prototype.setStealItemFlag = function(enemyId, stealId, flag) {
  if (!ShowStealItemName) {
    return;
  }
	if (!this._stealItem) {
		this.clearStealItem();
  }
  enemyId = getTransformEnemy(enemyId);
  this._stealItem[enemyId] = this._stealItem[enemyId] || [];
  this._stealItem[enemyId][stealId] = flag;
};

Game_System.prototype.getStealItemFlag = function(enemyId, stealId) {
  if(!this._stealItem || !this._stealItem[enemyId] || !this._stealItem[enemyId][stealId]) {
    return false;
  }
  return this._stealItem[enemyId][stealId];
};

Game_System.prototype.dropItemListFlag = function(enemyId, dropListId, mode, Individual) {
	if(enemyId > 0){
        if(Individual){
            this.setDropItemFlag(enemyId, dropListId, mode);
        } else {
            let itemList = $dataEnemies[enemyId].dropItems;
            for(let i = 0; itemList.length > i; i++){
                this.setDropItemFlag(enemyId, i, mode);
            }
        }
    }
};

Game_System.prototype.stealItemListFlag = function(enemyId, stealListId, mode, Individual) {
	if(enemyId > 0){
    if(Individual){
      this.setStealItemFlag (enemyId, stealListId, mode);
    } else {
      const enemy = $dataEnemies[enemyId];
      const itemList = (Imported.NUUN_StealableItems ? this.getStealList(enemy) : null);
      if(itemList) {
        for(let i = 0; itemList.length > i; i++){
          this.setStealItemFlag(enemyId, i, mode);
        }
      }
    }
  }
};

Game_System.prototype.dorpItemAcquired = function(switchId, enemyId, dropId) {
  if (dropId > 0) {
    drop = this.getDropItemFlag(enemyId, dropId);
  } else {
    drop = false;
    const itemList = $dataEnemies[enemyId].dropItems;
    if (itemList) {
      for(let i = 0; itemList.length > i; i++){
        if (itemList[i].kind > 0) {
          drop = this.getDropItemFlag(enemyId, i);
          if (!drop) {
            break;
          }
        }
      }
    }
  }
  if (switchId > 0) {
    $gameSwitches.setValue(switchId, drop);
  } else {
    return drop;
  }
};

Game_System.prototype.stealItemAcquired = function(switchId, enemyId, stealId) {
  if (stealId > 0) {
    steal = this.getStealItemFlag(enemyId, stealId);
  } else {
    steal = false;
    const itemList = this.getStealList($dataEnemies[enemyId]);
    if (itemList) {
      for(let i = 0; itemList.length > i; i++){
        steal = this.getStealItemFlag(enemyId, stealId);
        if (!steal) {
          break;
        }
      }
    }
  }
  if (switchId > 0) {
    $gameSwitches.setValue(switchId, steal);
  } else {
    return steal;
  }
};

Game_System.prototype.registrationTiming = function(mode) {
  return RegistrationTiming.some(data => data.RegistrationTiming === mode && !data.RegisterStatus);
};

Game_System.prototype.registrationStatusTiming = function(mode) {
  return RegistrationTiming.some(data => data.RegistrationTiming === mode && data.RegisterStatus);
};

Game_System.prototype.registrationStatusNoTransform = function() {
    return RegistrationTiming.some(data => {
        (data.RegistrationTiming === 0 || data.RegistrationTiming === 1 || data.RegistrationTiming === 4) 
        && data.RegisterStatus;
    });
  };

Game_System.prototype.getStealList = function(enemy) {
  const re =/<(?:steal)\s*([IWAM]):\s*(\d+(?:\s*,\s*\d+)*)>/g;
  const stealItems = [];
	while(true) {
		let match = re.exec(enemy.note);
		if (match) {
			let data = match[2].split(',');
			switch (match[1]) {
				case 'I':
					stealItems.push({dataId: parseInt(data[0]), denominator: parseInt(data[1]), kind:1});
					break;
				case 'W':
					stealItems.push({dataId: parseInt(data[0]), denominator: parseInt(data[1]), kind:2});
					break;
				case 'A':
					stealItems.push({dataId: parseInt(data[0]), denominator: parseInt(data[1]), kind:3});
					break;
				case 'M':
					stealItems.push({dataId: parseInt(data[0]), denominator: parseInt(data[1]), kind:4});
					break;
			}
		} else {
			return stealItems;
		}
	}
};

Game_System.prototype.clearEnemyBookAction = function() {
	this._enemyBookActionFlags = [];
};

Game_System.prototype.setEnemyBookActionFlag = function(enemyId, actionId, flag) {
  if (!ShowActionName) {
    return;
  }
	if (!this._enemyBookActionFlags) {
		this.clearEnemyBookAction();
  }
  enemyId = getTransformEnemy(enemyId);
  this._enemyBookActionFlags[enemyId] = this._enemyBookActionFlags[enemyId] || [];
  this._enemyBookActionFlags[enemyId][actionId] = flag;
};

Game_System.prototype.getEnemyBookActionFlag = function(enemyId, actionId) {
  if(!this._enemyBookActionFlags || !this._enemyBookActionFlags[enemyId] || !this._enemyBookActionFlags[enemyId][actionId]) {
    return false;
  }
  return this._enemyBookActionFlags[enemyId][actionId];
};

Game_System.prototype.enemyBookActionList = function(enemyId, actionId, Individual, mode) {
  if (enemyId > 0) {
    if (Individual) {
      this.setEnemyBookActionFlag(enemyId, actionId, mode);
    } else {
      const action = $dataEnemies[enemyId].actions;
      for(let i = 0; action.length > i; i++){
        this.setEnemyBookActionFlag(enemyId, i, mode);
      }
    }
  }
};

Game_System.prototype.clearEnemyBookElement = function() {
	this._enemyBookElementFlags = [];
};

Game_System.prototype.setEnemyBookElementFlag = function(enemyId, elementId, flag) {
	if (!this._enemyBookElementFlags) {
		this.clearEnemyBookElement();
    }
    if (flag) {
        enemyId = getTransformEnemy(enemyId);
    }
    this._enemyBookElementFlags[enemyId] = this._enemyBookElementFlags[enemyId] || [];
    this._enemyBookElementFlags[enemyId][elementId] = flag;
};

Game_System.prototype.getEnemyBookElementFlag = function(enemyId, elementId) {
  if(!this._enemyBookElementFlags || !this._enemyBookElementFlags[enemyId] || !this._enemyBookElementFlags[enemyId][elementId]) {
    return false;
  }
  return this._enemyBookElementFlags[enemyId][elementId];
};

Game_System.prototype.enemyBookElementList = function(enemyId, elementId, Individual, mode) {
  if (enemyId > 0) {
    if (Individual) {
      this.setEnemyBookElementFlag(enemyId, elementId, mode);
    } else {
      const list = ElementList;
      for(let i = 0; list.length > i; i++){
        this.setEnemyBookElementFlag(enemyId, list[i].ElementNo - 1, mode);
      }
    }
  }
};

Game_System.prototype.clearEnemyBookState = function() {
	this._enemyBookStateFlags = [];
};

Game_System.prototype.setEnemyBookStateFlag = function(enemyId, stateId, flag) {
	if (!this._enemyBookStateFlags) {
		this.clearEnemyBookState();
    }
    if (flag) {
        enemyId = getTransformEnemy(enemyId);
    }
    this._enemyBookStateFlags[enemyId] = this._enemyBookStateFlags[enemyId] || [];
    this._enemyBookStateFlags[enemyId][stateId] = flag;
};

Game_System.prototype.getEnemyBookStateFlag = function(enemyId, stateId) {
  if(!this._enemyBookStateFlags || !this._enemyBookStateFlags[enemyId] || !this._enemyBookStateFlags[enemyId][stateId]) {
    return false;
  }
  return this._enemyBookStateFlags[enemyId][stateId];
};

Game_System.prototype.enemyBookStateList = function(enemyId, stateId, Individual, mode) {
  if (enemyId > 0) {
    if (Individual) {
      this.setEnemyBookStateFlag(enemyId, stateId, mode);
    } else {
      const list = StateList;
      for(let i = 0; list.length > i; i++){
        this.setEnemyBookStateFlag(enemyId, list[i].StateId, mode);
      }
    }
  }
};

Game_System.prototype.clearEnemyBookDebuff = function() {
	this._enemyBookDebuffFlags = [];
};

Game_System.prototype.setEnemyBookDebuffFlag = function(enemyId, debuffId, flag) {
	if (!this._enemyBookDebuffFlags) {
		this.clearEnemyBookDebuff();
    }
    if (flag) {
        enemyId = getTransformEnemy(enemyId);
    }
    this._enemyBookDebuffFlags[enemyId] = this._enemyBookDebuffFlags[enemyId] || [];
    this._enemyBookDebuffFlags[enemyId][debuffId] = flag;
};

Game_System.prototype.getEnemyBookDebuffFlag = function(enemyId, debuffId) {
  if(!this._enemyBookDebuffFlags || !this._enemyBookDebuffFlags[enemyId] || !this._enemyBookDebuffFlags[enemyId][debuffId]) {
    return false;
  }
  return this._enemyBookDebuffFlags[enemyId][debuffId];
};

Game_System.prototype.enemyBookDebuffList = function(enemyId, debuffId, Individual, mode) {
  if (enemyId > 0) {
    if (Individual) {
      this.setEnemyBookDebuffFlag(enemyId, debuffId, mode);
    } else {
      const list = DeBuffList;
      for(let i = 0; list.length > i; i++){
        this.setEnemyBookDebuffFlag(enemyId, list[i].ParamId, mode);
      }
    }
  }
};

Game_System.prototype.initEnemyBookNumber = function() {
  this._enemyBookNumber = [];
  let index = 0;
  for (enemy of $dataEnemies) {
    if (enemy && this.isEnemyBook(enemy)) {
      index++;
      this._enemyBookNumber.push(index);
    } else {
      this._enemyBookNumber.push(-1);
    }
  }
  this._enemyBookLength = index;
};

Game_System.prototype.addToEnemyBookNumber = function(enemyId, index) {
    if(!this._enemyBookNumber) {
        this._enemyBookNumber = [];
    }
    this._enemyBookNumber[enemyId] = index;
};

Game_System.prototype.getEnemyBookNumber = function(enemyId) {
  return enemyId === 0 ? this._enemyBookNumber : this._enemyBookNumber[enemyId];
};


//Game_Troop
const _Game_Troop_setup = Game_Troop.prototype.setup;
Game_Troop.prototype.setup = function(troopId) {
    _Game_Troop_setup.call(this, troopId);
    for (const enemy of this.members()) {
        if (enemy.isAppeared()) {
        const enemyId = enemy.enemyId();
        if ($gameSystem.registrationTiming(0)) {
            $gameSystem.addToEnemyBook(enemyId);
        }
        if ($gameSystem.registrationStatusTiming(0)) {
            if (!$gameSystem.getEnemyBookFlag(enemyId)) {
                $gameSystem.addToEnemyBook(enemyId);
            }
            $gameSystem.addStatusToEnemyBook(enemyId);
            }
        }
    }
};


const _Game_BattlerBase_appear = Game_BattlerBase.prototype.appear;
Game_BattlerBase.prototype.appear = function() {
     _Game_BattlerBase_appear.call(this);
    if (this.isEnemy()) {
        const enemyId = this.enemyId();
        if ($gameTroop.inBattle()) {
            if ($gameSystem.registrationTiming(0)) {
                $gameSystem.addToEnemyBook(enemyId);
            }
            if ($gameSystem.registrationStatusTiming(0)) {
                if (!$gameSystem.getEnemyBookFlag(enemyId)) {
                $gameSystem.addToEnemyBook(enemyId);
                }
                $gameSystem.addStatusToEnemyBook(enemyId);
            }
        } else {
            if ($gameSystem.registrationTiming(4)) {
                $gameSystem.addToEnemyBook(enemyId);
            }
            if ($gameSystem.registrationStatusTiming(4)) {
                if (!$gameSystem.getEnemyBookFlag(enemyId)) {
                $gameSystem.addToEnemyBook(enemyId);
                }
                $gameSystem.addStatusToEnemyBook(enemyId);
            }
        }
    }
};

const _Game_BattlerBase_die = Game_BattlerBase.prototype.die;
Game_BattlerBase.prototype.die = function() {
    _Game_BattlerBase_die.call(this);
    if (this.isEnemy()) {
        const enemyId = this.enemyId();
        if ($gameSystem.registrationTiming(1)) {
            $gameSystem.addToEnemyBook(enemyId);
        }
        if ($gameSystem.registrationStatusTiming(1)) {
            if (!$gameSystem.getEnemyBookFlag(enemyId)) {
                $gameSystem.addToEnemyBook(enemyId);
            }
            $gameSystem.addStatusToEnemyBook(enemyId);
        }
        $gameSystem.defeatCount(enemyId);
    }
};

//Game_Enemy
Game_Enemy.prototype.enemybookTransform = function() {
    const enemyId = this.enemyId();
    if (TransformDefeat && !this.enemy().meta.NoTransformInData) {
        $gameSystem.defeatCount(enemyId);
        if ($gameSystem.registrationStatusNoTransform()) {
            if (!$gameSystem.getEnemyBookFlag(enemyId)) {
                $gameSystem.addToEnemyBook(enemyId);
            }
            $gameSystem.addStatusToEnemyBook(enemyId);
        }
    }
};

const _Game_Enemy_transform = Game_Enemy.prototype.transform;
Game_Enemy.prototype.transform = function(enemyId) {
    _Game_Enemy_transform.call(this, enemyId);
    if ($gameSystem.registrationTiming(0)) {
        $gameSystem.addToEnemyBook(enemyId);
    }
    if ($gameSystem.registrationStatusTiming(0)) {
        if (!$gameSystem.getEnemyBookFlag(enemyId)) {
            $gameSystem.addToEnemyBook(enemyId);
        }
        $gameSystem.addStatusToEnemyBook(enemyId);
    }
};

Game_Enemy.prototype.dropItemFlag = function(drop) {
    let di = this.enemy().dropItems;
    for (let i = 0; i < drop.length; i++){
        for(let r = 0; r < di.length; r++){
            if(drop[i].id === di[r].dataId){
                switch (di[r].kind) {
                    case 1:
                    if(DataManager.isItem(drop[i])){
                        $gameSystem.setDropItemFlag(this._enemyId, r, true);
                    }
                    break;
                    case 2:
                        if(DataManager.isWeapon(drop[i])){
                        $gameSystem.setDropItemFlag(this._enemyId, r, true);
                        }
                    break;
                    case 3:
                        if(DataManager.isArmor(drop[i])){
                            $gameSystem.setDropItemFlag(this._enemyId, r, true);
                        }
                    break;
                }
            }
        }
    }
};

const _Game_Enemy_makeDropItems = Game_Enemy.prototype.makeDropItems;
Game_Enemy.prototype.makeDropItems = function() {
    const drop = _Game_Enemy_makeDropItems.call(this);
    this.dropItemFlag(drop);
    return drop;
};

Game_Enemy.prototype.stealItemFlag = function() {
    const enemyId = this._enemyId;
    const number = $gameSystem._stealIndex;
    $gameSystem.setStealItemFlag(enemyId, number, true);
};

const _Game_Enemy_makeStealItems = Game_Enemy.prototype.makeStealItems;
Game_Enemy.prototype.makeStealItems = function(rate, mode) {
    const di = _Game_Enemy_makeStealItems.call(this, rate, mode)
    if(mode === 1 && di){
        this.stealItemFlag();
    }
    return di;
};


const _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
  _Game_Action_applyItemUserEffect.call(this, target);
  this.bookSkill(target)
  this.analyzeSkill(target);
  this.seeThrougSkill(target);
};

Game_Action.prototype.bookSkill = function(target) {
    this.enemyInfoSkill(target);
};

Game_Action.prototype.enemyInfoSkill = function(target) {
    if (this.item().meta.EnemyInfo) {
        SceneManager._scene.commandEnemyBookInfo();
    }
};


Game_Action.prototype.analyzeSkill = function(target) {
    if (target.isEnemy() && $gameSystem.isEnemyBookData(target.enemy())) {
        const data = this.item().meta.AnalyzeSkill ? this.item().meta.AnalyzeSkill.split(',').map(Number) : [-1];
        if (data[0] >= 0) {
            const analyzeSkill = AnalyzeSkillMode[data[0] - 1];
            if (analyzeSkill) {
                target.result().analyzeSkill = true;
                const rate = this.item().meta.CertainAnalyze || !target.enemy().meta.AnalyzeResist ? 100 : Number(target.enemy().meta.AnalyzeResist);
                if (Math.floor(Math.random() * 100 >= rate)) {
                    target.result().missed = true;
                    BattleManager.analyzeMissMessage = analyzeSkill.AnalyzeMissMessage.format(target.name(), this.subject().name());
                    return;
                }
                this.makeSuccess(target);
                if (data[0] === 0 && data[1] > 0) {
                    $gameVariables.setValue(CommonVariableID, target.enemy().id);
                    $gameTemp.reserveCommonEvent(data[1]);
                    SceneManager._scene.addEnemyDataEnemyBook(target);
                } else {
                    SceneManager._scene.setEnemyBookEnemyAnalyze(target, analyzeSkill);
                }
            }
        }
    }
};

Game_Action.prototype.seeThrougSkill = function(target) {
    if (target.isEnemy() && $gameSystem.isEnemyBookData(target.enemy())) {
        if (this.item().meta.SeeThrough) {
            target.result().analyzeSkill = true;
            const rate = this.item().meta.CertainAnalyze || !target.enemy().meta.AnalyzeResist ? 100 : Number(target.enemy().meta.AnalyzeResist);
            if (Math.floor(Math.random() * 100 >= rate)) {
                target.result().missed = true;
                return;
            }
            this.makeSuccess(target);
            SceneManager._scene.addEnemyDataEnemyBook(target);
        }
    }
};

const _Game_ActionResult_clear = Game_ActionResult.prototype.clear;
Game_ActionResult.prototype.clear = function() {
    _Game_ActionResult_clear.call(this);
    this.analyzeSkill = false;
};

const _Game_Interpreter_command336 = Game_Interpreter.prototype.command336;
Game_Interpreter.prototype.command336 = function(params) {
    this.iterateEnemyIndex(params[0], enemy => {
        enemy.enemybookTransform();
    });
    return _Game_Interpreter_command336.call(this, params);
};

//Scene_Menu
const _Scene_Menu_createCommandWindow =　Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    _Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler("enemyBook", this.commandEnemyBook.bind(this));
};

Scene_Menu.prototype.commandEnemyBook = function() {
  SceneManager.push(Scene_EnemyBook);
};

const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
    _Window_MenuCommand_addOriginalCommands.call(this);
    if(ShowCommand && ($gameSwitches.value(enemyBookSwitch) || enemyBookSwitch === 0)) {
        this.addCommand(CommandName, "enemyBook",eval(CondCommandEnemyBook));
    }
};

//Scene_EnemyBook
function Scene_EnemyBook() {
    this.initialize(...arguments);
}
  
Scene_EnemyBook.prototype = Object.create(Scene_MenuBase.prototype);
Scene_EnemyBook.prototype.constructor = Scene_EnemyBook;
  
Scene_EnemyBook.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
    this._backGroundImg = null;
};

Scene_EnemyBook.prototype.createBackground = function() {
    Scene_MenuBase.prototype.createBackground.call(this);
    this.createEnemybookBackground();
};
  
Scene_EnemyBook.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createPercentWindow();
    this.createCategoryNameWindow();
    this.createCategoryWindow();
    this.createIndexEnemyWindow();
    this.createEnemyPageWindow();
    this.createEnemyWindow();
    this.updateEnemyBookBackground();
    this.createEnemyBookButton();
    this.createEnemyBookActual();
    this.openBook();
};

Scene_EnemyBook.prototype.createEnemybookBackground = function() {
    const sprite = new Sprite();
    this.addChild(sprite);
    this._enemyBookBackgroundSprite = sprite;
    sprite.show();
};

Scene_EnemyBook.prototype.updateEnemyBookBackground = function() {
    const sprite = this._enemyBookBackgroundSprite;
    const img = this.getEnemyBookBackground();
    if (sprite.bitmapName !== img) {
        const bitmap = img ? ImageManager.nuun_LoadPictures(img) : null;
        sprite.bitmap = bitmap;
        sprite.bitmapName = img;
        if (bitmap) {
            bitmap.addLoadListener(function() {
                this.backgroundRefresh();
            }.bind(this));
        }
    }
};

Scene_EnemyBook.prototype.backgroundRefresh = function() {
    const sprite = this._enemyBookBackgroundSprite;
    if (BackUiWidth) {
        sprite.x = (Graphics.width - Graphics.boxWidth) / 2 - 4;
        sprite.y = (Graphics.height - Graphics.boxHeight) / 2 - 4;
    } else {
        sprite.x = 0;
        sprite.y = 0;
    }
    if (BackFitWidth) {
        if(BackUiWidth) {
            sprite.scale.x = (this.width !== sprite.bitmap.width ? this.width / sprite.bitmap.width : 1);
            sprite.scale.y = (this.height !== sprite.height ? this.height / sprite.bitmap.height : 1);
        } else {
            sprite.scale.x = (Graphics.width !== sprite.bitmap.width ? Graphics.width / sprite.bitmap.width : 1);
            sprite.scale.y = (Graphics.height !== sprite.bitmap.height ? Graphics.height / sprite.bitmap.height : 1);
        }
    }
};

Scene_EnemyBook.prototype.createPercentWindow = function() {
    if (PercentWindowShow) {
        const rect = this.percentWindowRect();
        this._percentWindow = new Window_EnemyBook_Percent(rect);
        this.addWindow(this._percentWindow);
        if (AllWindowVisibleHide || !PercentWindowVisible) {
          this._percentWindow.opacity = 0;
        }
    } else {
        this._percentWindow = null;
    }
};

Scene_EnemyBook.prototype.createCategoryWindow = function() {
    if (CategoryShow) {
        const rect = this.categoryWindowRect();
        this._categoryWindow = new Window_EnemyBook_Category(rect);
        this._categoryWindow.setHandler("cancel", this.popScene.bind(this));
        this._categoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
        this.addWindow(this._categoryWindow);
        this._categoryWindow.setCategoryNameWindow(this._categoryNameWindow);
        if (AllWindowVisibleHide || !CategoryWindowVisible) {
          this._categoryWindow.opacity = 0;
        }
    } else {
        this._categoryWindow = null;
    }
};

Scene_EnemyBook.prototype.createCategoryNameWindow = function() {
    if (CategoryShow) {
        const rect = this.categoryNameWindowRect();
        this._categoryNameWindow = new Window_EnemyBook_CategoryName(rect);
        this.addWindow(this._categoryNameWindow);
        if (AllWindowVisibleHide || !CategoryNameWindowVisible) {
          this._categoryNameWindow.opacity = 0;
        }
    } else {
        this._categoryNameWindow = null;
    }
};

Scene_EnemyBook.prototype.createEnemyPageWindow = function() {
    pageIndex.page = 0;
    const rect = this.enemyWindowPageRect();
    this._enemyPageWindow = new Window_EnemyBookPage(rect);
    if (!!PageNextSymbol && !!PagePreviousSymbol) {
        this._enemyPageWindow.setHandler(PageNextSymbol, this.enemyBookPageup.bind(this));
        this._enemyPageWindow.setHandler(PagePreviousSymbol, this.enemyBookPagedown.bind(this));
    }
    this.addWindow(this._enemyPageWindow);
    this._enemyPageWindow.deactivate();
    this._enemyPageWindow.setPageList(PageSetting, PageSetting.length);
    this._enemyPageWindow.setIndexWindow(this._indexWindow);
    if (AllWindowVisibleHide || !PageWindowVisible) {
      this._enemyPageWindow.opacity = 0;
    }
};

Scene_EnemyBook.prototype.createIndexEnemyWindow = function() {
    const rect = this.indexWindowRect();
    this._indexWindow = new Window_EnemyBook_Index(rect);
    this._indexWindow.setHandler("cancel", this.onEnemyIndexCancel.bind(this));
    this._indexWindow.setHandler("ok", this.onEnemyActual.bind(this));
    this.addWindow(this._indexWindow);
    this._indexWindow.setPercentWindow(this._percentWindow);
    if (this._categoryWindow) {
        this._categoryWindow.setEnemyIndexWindow(this._indexWindow);
        this._indexWindow.hide();
        this._categoryNameWindow.hide();
    } else {
        this._indexWindow.activate();
    }
    if (AllWindowVisibleHide || !IndexWindowVisible) {
        this._indexWindow.opacity = 0;
    }
};

Scene_EnemyBook.prototype.createEnemyWindow = function() {
    const rect = this.enemyWindowRect();
    this._enemyWindow = new Window_EnemyBook(rect);
    this.addWindow(this._enemyWindow);
    this._indexWindow.setEnemyWindow(this._enemyWindow);
    this._enemyPageWindow.setEnemyWindow(this._enemyWindow);
    if (this._categoryWindow) {
        this._categoryWindow.setEnemyWindow(this._enemyWindow);
    }
    if (AllWindowVisibleHide || !ContentWindowVisible) {
        this._enemyWindow.opacity = 0;
    }
};

Scene_EnemyBook.prototype.onEnemyActual = function() {
    if (this._enemyBookActualSprite.visible) {
        this._enemyBookActualSprite.hideActualEnemy();
    } else {
        this._enemyBookActualSprite.showActualEnemy();
    }
    this._indexWindow.activate();
    this._enemyPageWindow.activate();
};

Scene_EnemyBook.prototype.createEnemyBookActual = function() {
    const sprite = new Sprite_BookEnemyActualBase();
    this.addChild(sprite);
    this._enemyBookActualSprite = sprite;
    this._enemyWindow.setEnemyActualSprite(sprite);
};

Scene_EnemyBook.prototype.percentWindowRect = function() {
    const wx = WindowMode === 0 ? 0 : this.enemyWindowWidth();
    const wy = this.mainAreaTop();
    const ww = this.indexWidth();
    const wh = this.calcWindowHeight(1, true);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.enemyWindowPageRect = function() {
    const wx = WindowMode === 0 ? this.indexWidth() : 0;
    const wh = this.calcWindowHeight(1, true);
    const wy = PageWindowsShow ? this.mainAreaTop() : (wh + (Graphics.height - Graphics.boxHeight) / 2) * -1;
    const ww = this.enemyWindowWidth();
    return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.indexWindowRect = function() {
    const height = (this._percentWindow ? this._percentWindow.height : 0) + (this._categoryNameWindow ? this._categoryNameWindow.height : 0);
    const wx = WindowMode === 0 ? 0 : this.enemyWindowWidth();
    const wy = this.mainAreaTop() + height;
    const ww = this.indexWidth();
    const wh = this.mainAreaHeight() - height;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.categoryWindowRect = function() {
    const height = (this._percentWindow ? this._percentWindow.height : 0);
    const wx = WindowMode === 0 ? 0 : this.enemyWindowWidth();
    const wy = this.mainAreaTop() + height;
    const ww = this.indexWidth();
    const wh = this.mainAreaHeight() - height;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.categoryNameWindowRect = function() {
    const wx = WindowMode === 0 ? 0 : this.enemyWindowWidth();
    const wy = this.mainAreaTop() + (this._percentWindow ? this._percentWindow.height : 0);
    const ww = this.indexWidth();
    const wh = this.calcWindowHeight(1, true);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.enemyWindowRect = function() {
    const wx = WindowMode === 0 ? this.indexWidth() : 0;
    const wy = this.mainAreaTop() + (PageWindowsShow ? this._enemyPageWindow.height : 0);
    const ww = this.enemyWindowWidth();
    const wh = this.mainAreaHeight() - (PageWindowsShow ? this._enemyPageWindow.height : 0);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.createEnemyBookButton = function() {
    if (ConfigManager.touchUI) {
        this._enemyBook_downButton = new Sprite_Button("pagedown");
        this._enemyBook_upButton = new Sprite_Button("pageup");
        this.addWindow(this._enemyBook_downButton);
        this.addWindow(this._enemyBook_upButton);
        this.setEnemyBookButton();
        this._enemyBook_downButton.setClickHandler(this.updateEnemyBookPagedownButton.bind(this));
        this._enemyBook_upButton.setClickHandler(this.updateEnemyBookPageupButton.bind(this));
    }
};

Scene_EnemyBook.prototype.setEnemyBookButton = function() {
    if (this._cancelButton && this._enemyBook_downButton && this._enemyBook_upButton) {
        this._enemyBook_downButton.x = (this._cancelButton ? this._cancelButton.x - 20 : 0) - this._enemyBook_downButton.width;
        this._enemyBook_downButton.y = this.buttonY();
        this._enemyBook_upButton.x = this._enemyBook_downButton.x - this._enemyBook_upButton.width - 4;
        this._enemyBook_upButton.y = this.buttonY();
        this._enemyBook_downButton.visible = !this._categoryWindow;
        this._enemyBook_upButton.visible = !this._categoryWindow;
    }
};

Scene_EnemyBook.prototype.openBook = function() {
    if (!CategoryShow) {
        this.enemyIndexSelection();
    }
};

Scene_EnemyBook.prototype.enemyWindowWidth = function() {
    return Graphics.boxWidth - this.indexWidth();
};
  
Scene_EnemyBook.prototype.helpAreaHeight = function() {
    return 0;
};

Scene_EnemyBook.prototype.indexWidth = function() {
    return BookWidth > 0 ? Graphics.boxWidth - BookWidth : Math.floor(Graphics.boxWidth / 3);
};

Scene_EnemyBook.prototype.onEnemyIndexCancel = function() {
    if (CategoryShow) {
      this.enemyCategorySelection();
    } else {
      this.popScene();
    }
};

Scene_EnemyBook.prototype.onCategoryOk = function() {
    this.enemyIndexSelection();
};

Scene_EnemyBook.prototype.enemyIndexSelection = function() {
    if (CategoryShow) {
      this._categoryWindow.hide();
      this._categoryWindow.deselect();
      this._categoryWindow.deactivate();
      this._categoryNameWindow.show();
    }
    this._indexWindow.refresh();
    this._indexWindow.show();
    this._indexWindow.activate();
    this._enemyPageWindow.activate();
    this._enemyPageWindow.select(pageIndex.page);
    this._enemyPageWindow.refresh();
};

Scene_EnemyBook.prototype.enemyCategorySelection = function() {
    this._categoryWindow.setSelect();
    this._categoryWindow.show();
    this._categoryNameWindow.hide();
    this._indexWindow.hide();
    this._categoryWindow.activate();
    this._indexWindow.deselect();
    this._indexWindow.deactivate();
    this._enemyPageWindow.deselect();
    this._enemyPageWindow.deactivate();
    this._enemyPageWindow.refresh();
    this._enemyBookActualSprite.hideActualEnemy();
};

Scene_EnemyBook.prototype.enemyBookPagedown = function() {
    this._enemyPageWindow.activate();
    this.updateEnemyBookPagedownButton();
};
  
Scene_EnemyBook.prototype.enemyBookPageup = function() {
    this._enemyPageWindow.activate();
    this.updateEnemyBookPageupButton();
};

Scene_EnemyBook.prototype.enemyBookCursorLeft = function() {
    
};

Scene_EnemyBook.prototype.enemyBookCursorRight = function() {
    
};

const _Window_Selectable_cursorRight = Window_Selectable.prototype.cursorRight;
const _Window_Selectable_cursorLeft = Window_Selectable.prototype.cursorLeft;
Scene_EnemyBook.prototype.updateEnemyBookPagedownButton = function() {
    this._enemyPageWindow.userLeft(true);
    SoundManager.playCursor();
};


Scene_EnemyBook.prototype.updateEnemyBookPageupButton = function() {
    this._enemyPageWindow.userRight(true);
    SoundManager.playCursor();
};

Scene_EnemyBook.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
    this.updateEnemyBookBackground();
    this.updatePageupdownButton();
};

Scene_EnemyBook.prototype.updatePageupdownButton = function() {
    if (this._enemyBook_downButton) {
        this._enemyBook_downButton.visible = this._enemyPageWindow.active && this.updatePageupdownButtonBookMode();
    }
    if (this._enemyBook_upButton) {
        this._enemyBook_upButton.visible = this._enemyPageWindow.active && this.updatePageupdownButtonBookMode();
    }
};

Scene_EnemyBook.prototype.updatePageupdownButtonBookMode = function() {
    return PageSetting.length > 1;
};

Scene_EnemyBook.prototype.getEnemyBookBackground = function() {
    if (this._categoryWindow && this._categoryWindow.active) {
        return CategoryBackGroundImg ? CategoryBackGroundImg : DefaultBackGroundImg;
    }
    const data = this._enemyWindow.getDisplayPage();
    if (data && data.BackGroundImg) {
        return data.BackGroundImg;
    } else {
        return DefaultBackGroundImg;
    }
};

//Scene_Battle
const _Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
Scene_Battle.prototype.createPartyCommandWindow = function() {
    _Scene_Battle_createPartyCommandWindow.call(this);
    this._partyCommandWindow.setHandler("enemyBook", this.commandEnemyBook.bind(this));
    this._partyCommandWindow.setHandler("enemyBookInfo", this.commandEnemyBookInfo.bind(this));
};

const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
  _Scene_Battle_createAllWindows.call(this);
  this.createEnemyBookWindow();
};

Scene_Battle.prototype.createEnemyBookWindow = function() {
    this.createEnemyBookBackground();
    this.createEnemyBookPercentWindow();
    this.createEnemyBookCategoryNameWindow();
    this.createEnemyBookCategoryWindow();
    this.createEnemyBookIndexWindow();
    this.createEnemyBookInfoIndexWindow();
    this.createEnemyBookPageWindow();
    this.createEnemyBookStatusWindow();
    this.createEnemyBookButton();
    this.createEnemyBookActual();
};

Scene_Battle.prototype.createEnemyBookBackground = function() {
    const sprite = new Sprite();
    this.addChild(sprite);
    this._enemyBookBackgroundSprite = sprite;
    sprite.hide();
};

Scene_Battle.prototype.createEnemyBookPercentWindow = function() {
    if (PercentWindowShow) {
        const rect = this.enemyBookPercentWindowRect();
        this._enemyBookPercentWindow = new Window_EnemyBook_Percent(rect);
        this.createEnemyBookAddWindow(this._enemyBookPercentWindow, true);
    } else {
        this._enemyBookPercentWindow = null;
    }
};

Scene_Battle.prototype.createEnemyBookCategoryNameWindow = function() {
    if (CategoryShow) {
        const rect = this.enemyBookCategoryNameWindowRect();
        this._enemyBookCategoryNameWindow = new Window_EnemyBook_CategoryName(rect);
        this.createEnemyBookAddWindow(this._enemyBookCategoryNameWindow, false);
    } else {
        this._enemyBookCategoryNameWindow = null;
    }
};

Scene_Battle.prototype.createEnemyBookCategoryWindow = function() {
    if (CategoryShow) {
        const rect = this.enemyBookCategoryWindowRect();
        this._enemyBookCategoryWindow = new Window_EnemyBook_Category(rect);
        this._enemyBookCategoryWindow.setHandler("cancel",this.cancelEnemyBook.bind(this));
        this._enemyBookCategoryWindow.setHandler("ok", this.onEnemyBookCategoryOk.bind(this));
        this.createEnemyBookAddWindow(this._enemyBookCategoryWindow, true);
        this._enemyBookCategoryWindow.setCategoryNameWindow(this._enemyBookCategoryNameWindow);
        this._enemyBookCategoryWindow.deactivate();
    } else {
        this._enemyBookCategoryWindow = null;
    }
};

Scene_Battle.prototype.createEnemyBookIndexWindow = function() {
    const rect = this.enemyBookIndexWindowRect();
    this._enemyBookIndexWindow = new Window_EnemyBook_Index(rect);
    this._enemyBookIndexWindow.setHandler("cancel", this.onEnemyBookIndexCancel.bind(this));
    this.createEnemyBookAddWindow(this._enemyBookIndexWindow, !CategoryShow);
    this._enemyBookIndexWindow.setPercentWindow(this._enemyBookPercentWindow);
    if (this._enemyBookCategoryWindow) {
        this._enemyBookCategoryWindow.setEnemyIndexWindow(this._enemyBookIndexWindow);
    }
};

Scene_Battle.prototype.createEnemyBookInfoIndexWindow = function() {
    const rect = this.enemyBookInfoIndexWindowRect();
    this._enemyBookInfoIndexWindow = new Window_EnemyBook_InfoIndex(rect);
    this._enemyBookInfoIndexWindow.setHandler("cancel", this.onEnemyBookInfoCancel.bind(this));
    this.createEnemyBookAddWindow(this._enemyBookInfoIndexWindow, true);
};

Scene_Battle.prototype.createEnemyBookPageWindow = function() {
    const rect = this.enemyBookPageWindowRect();
    this._enemyBookPageWindow = new Window_EnemyBookPage(rect);
    this._enemyBookPageWindow.setHandler("cancel", this.onEnemyBookPageCancel.bind(this));
    this._enemyBookPageWindow.setHandler("ok", this.onEnemyActual.bind(this));
    if (!!PageNextSymbol && !!PagePreviousSymbol) {
        this._enemyBookPageWindow.setHandler(PageNextSymbol, this.enemyBookPageup.bind(this));
        this._enemyBookPageWindow.setHandler(PagePreviousSymbol, this.enemyBookPagedown.bind(this));
    }
    this.createEnemyBookAddWindow(this._enemyBookPageWindow, true);
    this._enemyBookPageWindow.setIndexWindow(this._enemyBookIndexWindow);
    this._enemyBookPageWindow.setInfoIndexWindow(this._enemyBookInfoIndexWindow);
    this._enemyBookPageWindow.deactivate();
};

Scene_Battle.prototype.createEnemyBookStatusWindow = function() {
    const rect = this.enemyBookWindowRect();
    this._enemyBookEnemyWindow = new Window_BattleEnemyBook(rect);
    this.createEnemyBookAddWindow(this._enemyBookEnemyWindow, true);
    this._enemyBookIndexWindow.setEnemyWindow(this._enemyBookEnemyWindow);
    this._enemyBookInfoIndexWindow.setEnemyWindow(this._enemyBookEnemyWindow);
    this._enemyBookPageWindow.setEnemyWindow(this._enemyBookEnemyWindow);
    if (this._enemyBookCategoryWindow) {
        this._enemyBookCategoryWindow.setEnemyWindow(this._enemyBookEnemyWindow);
    }
    BattleManager.setEnemyBookWinsow(this._enemyBookEnemyWindow);
};

Scene_Battle.prototype.createEnemyBookButton = function() {
    if (ConfigManager.touchUI) {
        this._enemyBook_cancelButton = new Sprite_Button("cancel");
        this._enemyBook_downButton = new Sprite_Button("pagedown");
        this._enemyBook_upButton = new Sprite_Button("pageup");
        this.createEnemyBookAddWindow(this._enemyBook_cancelButton, false);
        this.createEnemyBookAddWindow(this._enemyBook_downButton, false);
        this.createEnemyBookAddWindow(this._enemyBook_upButton, false);
        this.setEnemyBookButton();
        this._enemyBook_downButton.setClickHandler(this.updateEnemyBookPagedownButton.bind(this));
        this._enemyBook_upButton.setClickHandler(this.updateEnemyBookPageupButton.bind(this));
    }
};

Scene_Battle.prototype.setEnemyBookButton = function() {
    let x = this._enemyBookEnemyWindow.x + this._enemyBookEnemyWindow.width;
    const y = this.enemyBookButtonY() + this.enemyBookWindowUi_Y();
    if (this._enemyBook_cancelButton) {
        this._enemyBook_cancelButton.x = x - this._enemyBook_cancelButton.width;
        this._enemyBook_cancelButton.y = y;
    }
    if (this._enemyBook_downButton && this._enemyBook_upButton) {
        this._enemyBook_downButton.x = (this._enemyBook_cancelButton ? this._enemyBook_cancelButton.x - 20 : 0) - this._enemyBook_downButton.width;
        this._enemyBook_downButton.y = y;
        this._enemyBook_upButton.x = this._enemyBook_downButton.x - this._enemyBook_upButton.width - 4;
        this._enemyBook_upButton.y = y;
    }
};

Scene_Battle.prototype.createEnemyBookActual = function() {
    const sprite = new Sprite_BookEnemyActualBase();
    this.addChild(sprite);
    this._enemyBookActualSprite = sprite;
    this._enemyBookEnemyWindow.setEnemyActualSprite(sprite);
};

Scene_Battle.prototype.onEnemyActual = function() {
    if (!this._enemyBookActualSprite) {
        this.createEnemyBookActual();//暫定
    }
    if (this._enemyBookActualSprite.visible) {
        this._enemyBookActualSprite.hideActualEnemy();
    } else {
        this._enemyBookActualSprite.showActualEnemy();
    }
    if (this._enemyBookIndexWindow.visible) {
        this._enemyBookIndexWindow.activate();
    } else if (this._enemyBookInfoIndexWindow.visible) {
        this._enemyBookInfoIndexWindow.activate();
    }
    this._enemyBookPageWindow.activate();
};

Scene_Battle.prototype.enemyBookButtonY = function() {
    return Math.floor((this.buttonAreaHeight() - 48) / 2);
};

Scene_Battle.prototype.enemyBookPercentWindowRect = function() {
    const wx = WindowMode === 0 ? 0 : this.enemyBookWindowWidth();
    const wy = this.enemyBookMainAreaTop();
    const ww = this.enemyBookIndexWidth();
    const wh = this.calcWindowHeight(1, true);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookCategoryNameWindowRect = function() {
    const wx = WindowMode === 0 ? 0 : this.enemyBookWindowWidth();
    const wy = this.enemyBookMainAreaTop() + (this._enemyBookPercentWindow ? this._enemyBookPercentWindow.height : 0);
    const ww = this.enemyBookIndexWidth();
    const wh = this.calcWindowHeight(1, !CategoryShow);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookCategoryWindowRect = function() {
    const height = (this._enemyBookPercentWindow ? this._enemyBookPercentWindow.height : 0);
    const wx = WindowMode === 0 ? 0 : this.enemyBookWindowWidth();
    const wy = this.enemyBookMainAreaTop() + height;
    const ww = this.enemyBookIndexWidth();
    const wh = this.enemyBookMainAreaHeight() - height;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookIndexWindowRect = function() {
    const height = (this._enemyBookPercentWindow ? this._enemyBookPercentWindow.height : 0) + (this._enemyBookCategoryNameWindow ? this._enemyBookCategoryNameWindow.height : 0);
    const wx = WindowMode === 0 ? 0 : this.enemyBookWindowWidth();
    const wy = this.enemyBookMainAreaTop() + height;
    const ww = this.enemyBookIndexWidth();
    const wh = this.enemyBookMainAreaHeight() - height;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookInfoIndexWindowRect = function() {
    const wx = WindowMode === 0 ? 0 : this.enemyBookWindowWidth();
    const wy = this.enemyBookMainAreaTop();
    const ww = this.enemyBookIndexWidth();
    const wh = this.enemyBookMainAreaHeight();
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookPageWindowRect = function() {
    const wx = WindowMode === 0 ? this.enemyBookIndexWidth() : 0;
    const wh = this.calcWindowHeight(1, true);
    const wy = this.enemyBookMainAreaTop();
    const ww = this.enemyBookWindowWidth();
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookWindowRect = function() {
    const wx = WindowMode === 0 ? this.enemyBookIndexWidth() : 0;
    const wy = this.enemyBookMainAreaTop();
    const ww = this.enemyBookWindowWidth();
    const wh = Graphics.boxHeight;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookAnalyzeWindowRect = function() {
    const ww = this.enemyBookWindowWidth();
    const wx = (Graphics.width - ww) / 2;
    const wy = this.enemyBookMainAreaTop();
    const wh = Graphics.boxHeight;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.createEnemyBookAddWindow = function(windowDate, openness) {
    if (BackgoundWindowMode) {
        this.addChild(windowDate);
    } else {
        this.addWindow(windowDate);
    }
    windowDate.x += this.enemyBookWindowUi_X();
    windowDate.y += this.enemyBookWindowUi_Y();
    windowDate.hide();
    if (AllWindowVisibleHide || !getBookWindowVisible(String(windowDate.constructor.name))) {
        windowDate.opacity = 0;
    } else {
        windowDate.openness = openness ? 0 : 255;
    }
};

Scene_Battle.prototype.enemyBookWindowClose = function(window) {
    if (!AllWindowVisibleHide || getBookWindowVisible(String(window.constructor.name))) {
        window.close();
    } else {
        window.hide();
    }
};

function getBookWindowVisible(_class) {
    switch (_class) {
        case "Window_EnemyBook_CategoryName":
            return CategoryNameWindowVisible;
        case "Window_EnemyBook_Category":
            return CategoryWindowVisible;
        case "Window_EnemyBook_Index":
            return IndexWindowVisible;
        case "Window_EnemyBook_InfoIndex":
            return InfoWindowVisible;
        case 'Window_EnemyBook_Percent':
            return PercentWindowVisible;
        case "Window_EnemyBookPage":
            return PageWindowVisible;
        case "Window_BattleEnemyBook":
            return ContentWindowVisible;
        default:
            return true;
    }
};

Scene_Battle.prototype.enemyBookWindowUi_X = function() {
    return BackgoundWindowMode ? (Graphics.width - Graphics.boxWidth) / 2 : 0;
};

Scene_Battle.prototype.enemyBookWindowUi_Y = function() {
    return BackgoundWindowMode ? (Graphics.height - Graphics.boxHeight) / 2 : 0;
};

Scene_Battle.prototype.enemyBookWindowWidth = function() {
    return Graphics.boxWidth - this.enemyBookIndexWidth();
};
  
Scene_Battle.prototype.enemyBookIndexWidth = function() {
    return BookWidth > 0 ? Graphics.boxWidth - BookWidth : Math.floor(Graphics.boxWidth / 3);
};

Scene_Battle.prototype.pageWindowsShowMode = function(list) {
    return PageWindowsShow && list.length > 1;
};

Scene_Battle.prototype.enemyBookMainAreaTop = function() {
    const y = 0;
    if (NoTouchUIWindow && !ConfigManager.touchUI) {
      return y;
    }
    return y + this.buttonAreaHeight();
};
  
Scene_Battle.prototype.enemyBookMainAreaHeight = function() {
    return Graphics.boxHeight - this.enemyBookMainAreaTop();
};

const _Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
  _Scene_Battle_update.call(this);
  this.updateEnemyBookBackground();
  this.updatePageCancelButton();
  this.updatePageupdownButton();
};

Scene_Battle.prototype.updateEnemyBookBackground = function() {
    if (BackgoundWindowMode) {
        const sprite = this._enemyBookBackgroundSprite;
        const img = this.getEnemyBookBackground();
        if (sprite.bitmapName !== img) {
            const bitmap = img ? ImageManager.nuun_LoadPictures(img) : null;
            sprite.bitmap = bitmap;
            sprite.bitmapName = img;
            if (bitmap) {
                bitmap.addLoadListener(function() {
                    this.backgroundRefresh();
                }.bind(this));
            }
        }
    }
};

Scene_Battle.prototype.backgroundRefresh = function() {
    const sprite = this._enemyBookBackgroundSprite;
    if (BackUiWidth) {
        sprite.x = (Graphics.width - Graphics.boxWidth) / 2 - 4;
        sprite.y = (Graphics.height - Graphics.boxHeight) / 2 - 4;
    } else {
        sprite.x = 0;
        sprite.y = 0;
    }
    if (BackFitWidth) {
        if(BackUiWidth) {
            sprite.scale.x = (this.width !== sprite.bitmap.width ? this.width / sprite.bitmap.width : 1);
            sprite.scale.y = (this.height !== sprite.height ? this.height / sprite.bitmap.height : 1);
        } else {
            sprite.scale.x = (Graphics.width !== sprite.bitmap.width ? Graphics.width / sprite.bitmap.width : 1);
            sprite.scale.y = (Graphics.height !== sprite.bitmap.height ? Graphics.height / sprite.bitmap.height : 1);
        }
    }
};

Scene_Battle.prototype.updatePageCancelButton = function() {
    if (this._enemyBook_cancelButton) {
        this._enemyBook_cancelButton.visible = this._enemyBookPageWindow.active || (this._enemyBookCategoryWindow && this._enemyBookCategoryWindow.active);
    }
};

Scene_Battle.prototype.updatePageupdownButton = function() {
    if (this._enemyBook_downButton) {
        this._enemyBook_downButton.visible = this._enemyBookPageWindow.active && this.updatePageupdownButtonBookMode();
    }
    if (this._enemyBook_upButton) {
        this._enemyBook_upButton.visible = this._enemyBookPageWindow.active && this.updatePageupdownButtonBookMode();
    }
};

Scene_Battle.prototype.enemyBookPagedown = function() {
    this._enemyBookPageWindow.activate();
    this.updateEnemyBookPagedownButton();
};
  
Scene_Battle.prototype.enemyBookPageup = function() {
    this._enemyBookPageWindow.activate();
    this.updateEnemyBookPageupButton();
};

Scene_Battle.prototype.updateEnemyBookPagedownButton = function() {
    this._enemyBookPageWindow.userLeft(true);
    SoundManager.playCursor();
};
  
Scene_Battle.prototype.updateEnemyBookPageupButton = function() {
    this._enemyBookPageWindow.userRight(true);
    SoundManager.playCursor();
};

Scene_Battle.prototype.updatePageupdownButtonBookMode = function() {
    return this._enemyBookEnemyWindow.getEnemyStatusList().length > 1;
};

Scene_Battle.prototype.getEnemyBookBackground = function() {
    if (this._enemyBookCategoryWindow && this._enemyBookCategoryWindow.active) {
        return CategoryBackGroundImg ? CategoryBackGroundImg : DefaultBackGroundImg;
    }
    const data = this._enemyBookEnemyWindow.getDisplayPage();
    if (data && data.BackGroundImg) {
        return data.BackGroundImg;
    } else {
        switch (this._enemyBookEnemyWindow._mode) {
            case 'book':
                return DefaultBackGroundImg
            case 'info':
                return DefaultInfoBackGroundImg;
            default:
                return null;
        }
    }
};

Scene_Battle.prototype.setEnemyBook = function() {
    const rect = this.enemyBookWindowRect();
    const pageRect = this.enemyBookPageWindowRect();
    this._enemyBookPageWindow.y = pageRect.y - (this.pageWindowsShowMode(PageSetting) ? 0 : this._enemyBookPageWindow.height + pageRect.y) + this.enemyBookWindowUi_Y() - (Graphics.height - Graphics.boxHeight) / 2;
    this._enemyBookEnemyWindow.x = rect.x + this.enemyBookWindowUi_X();
    this._enemyBookPageWindow.x = this._enemyBookEnemyWindow.x;
    this._enemyBookEnemyWindow.y = rect.y + (this.pageWindowsShowMode(PageSetting) ? this._enemyBookPageWindow.height : 0) + this.enemyBookWindowUi_Y();
    this._enemyBookEnemyWindow.width = rect.width;
    this._enemyBookEnemyWindow.height = rect.height - (rect.y + (this.pageWindowsShowMode(PageSetting) ? this._enemyBookPageWindow.height : 0));
    this._enemyBookEnemyWindow.setMode('book');
    this._enemyBookEnemyWindow.setEnemyData(null);
    this._enemyBookPageWindow.setPageList(PageSetting, PageSetting.length);
    this.setEnemyBookButton();
    BattleManager.enemyBook_Open = true;
    this.updateEnemyBookBackground();
    this._enemyBookBackgroundSprite.show();
};

Scene_Battle.prototype.setEnemyBookInfo = function() {
    const rect = this.enemyBookWindowRect();
    const pageRect = this.enemyBookPageWindowRect();
    this._enemyBookPageWindow.y = pageRect.y - (this.pageWindowsShowMode(InfoPageSetting) ? 0 : this._enemyBookPageWindow.height + pageRect.y) + this.enemyBookWindowUi_Y() - (Graphics.height - Graphics.boxHeight) / 2;
    this._enemyBookEnemyWindow.x = rect.x + this.enemyBookWindowUi_X();
    this._enemyBookPageWindow.x = this._enemyBookEnemyWindow.x;
    this._enemyBookEnemyWindow.y = rect.y + (this.pageWindowsShowMode(InfoPageSetting) ? this._enemyBookPageWindow.height : 0) + this.enemyBookWindowUi_Y();
    this._enemyBookEnemyWindow.width = rect.width;
    this._enemyBookEnemyWindow.height = rect.height - (rect.y + (this.pageWindowsShowMode(InfoPageSetting) ? this._enemyBookPageWindow.height : 0));
    this._enemyBookEnemyWindow.setMode('info');
    this._enemyBookEnemyWindow.setEnemyData(null);
    this._enemyBookPageWindow.setPageList(InfoPageSetting, InfoPageSetting.length);
    this.setEnemyBookButton();
    BattleManager.enemyBook_Open = true;
    this.updateEnemyBookBackground();
    this._enemyBookBackgroundSprite.show();
};

Scene_Battle.prototype.setEnemyBookEnemyAnalyze = function(target, analyzeDate) {
    this.addEnemyDataEnemyBook(target);
    const rect = this.enemyBookAnalyzeWindowRect();
    const pageRect = this.enemyBookPageWindowRect();
    const id = analyzeDate.ListNumber;
    let data = null;
    let cols = 0;
    if (data = id > 0 && AnalyzeListData[id - 1]) {
        data = AnalyzeListData[id - 1].AnalyzePageList;
        cols = data.length;
        this._enemyBookEnemyWindow.setMode('analyze', analyzeDate);
    } else {
        data = PageSetting;
        cols = PageSetting.length;
        this._enemyBookEnemyWindow.setMode('analyze');
    }
    this._enemyBookPageWindow.y = pageRect.y - (this.pageWindowsShowMode(data) ? 0 : this._enemyBookPageWindow.height + pageRect.y) + this.enemyBookWindowUi_Y() - (Graphics.height - Graphics.boxHeight) / 2;
    this._enemyBookPageWindow.x = rect.x;
    this._enemyBookEnemyWindow.x = rect.x;
    this._enemyBookEnemyWindow.y = rect.y + (this.pageWindowsShowMode(data) ? this._enemyBookPageWindow.height : 0) + this.enemyBookWindowUi_Y();
    this._enemyBookEnemyWindow.width = rect.width;
    this._enemyBookEnemyWindow.height = rect.height - (rect.y + (this.pageWindowsShowMode(data) ? this._enemyBookPageWindow.height : 0));
    this._enemyBookEnemyWindow.selectEnemy = target;
    this._enemyBookEnemyWindow.setEnemyData(target.enemy());
    this._enemyBookPageWindow.setPageList(data, cols);
    this.enemyBookEnemyAnalyze();
    this.setEnemyBookButton();
    BattleManager.enemyBook_Open = true;
    this.updateEnemyBookBackground();
    this._enemyBookBackgroundSprite.show();
};

Scene_Battle.prototype.commandEnemyBook = function() {
    this.setEnemyBook();
    if (PercentWindowShow) {
        this._enemyBookPercentWindow.show();
        this._enemyBookPercentWindow.open();
    }
    if (CategoryShow) {
        this.openEnemyBookCategory();
    } else {
        this.onEnemyBookCategoryOk();
    }
    this._enemyBookPageWindow.show();
    this._enemyBookEnemyWindow.show();
    this._enemyBookPageWindow.open();
    this._enemyBookEnemyWindow.open();
    pageIndex.page = 0;
};

Scene_Battle.prototype.commandEnemyBookInfo = function() {
    this.setEnemyBookInfo();
    this._enemyBookInfoIndexWindow.show();
    this._enemyBookInfoIndexWindow.open();
    this._enemyBookPageWindow.show();
    this._enemyBookEnemyWindow.show();
    this._enemyBookPageWindow.open();
    this._enemyBookEnemyWindow.open();
    this._enemyBookInfoIndexWindow.activate();
    this._enemyBookPageWindow.activate();
    this._enemyBookPageWindow.select(0);
    this._enemyBookPageWindow.refresh();
    this._enemyBookInfoIndexWindow.refresh();
};

Scene_Battle.prototype.enemyBookEnemyAnalyze = function() {
    this._enemyBookPageWindow.show();
    this._enemyBookEnemyWindow.show();
    this._enemyBookPageWindow.open();
    this._enemyBookEnemyWindow.open();
    this._enemyBookPageWindow.activate();
    this._enemyBookPageWindow.select(0);
    this._enemyBookPageWindow.refresh();
};

Scene_Battle.prototype.openEnemyBookCategory = function() {
    this._enemyBookCategoryWindow.show();
    this._enemyBookCategoryWindow.open();
    this._enemyBookCategoryWindow.activate();
    this._enemyBookCategoryWindow.refresh();
    this._enemyBookCategoryNameWindow.hide();
    this._enemyBookIndexWindow.hide();
    this._enemyBookPageWindow.deselect();
    this._enemyBookPageWindow.deactivate();
    this._enemyBookPageWindow.refresh();
    this._enemyBookIndexWindow.deselect();
    this._enemyBookIndexWindow.deactivate();
    this._enemyBookActualSprite.hideActualEnemy();
};

Scene_Battle.prototype.onEnemyBookCategoryOk = function() {
    if (CategoryShow) {
        this._enemyBookCategoryWindow.hide();
        this._enemyBookCategoryWindow.deselect();
        this._enemyBookCategoryWindow.deactivate();

        this._enemyBookCategoryNameWindow.open();
        this._enemyBookCategoryNameWindow.show();
    }
    this._enemyBookIndexWindow.open();
    this._enemyBookIndexWindow.show();
    this._enemyBookIndexWindow.activate();
    this._enemyBookIndexWindow.refresh();
    this._enemyBookPageWindow.activate();
    this._enemyBookPageWindow.select(pageIndex.page);
    this._enemyBookPageWindow.refresh();
};

Scene_Battle.prototype.onEnemyBookIndexCancel = function() {
    if (CategoryShow) {
        this.openEnemyBookCategory();
    } else {
        this.cancelEnemyBook();
    }
};

Scene_Battle.prototype.onEnemyBookInfoCancel = function() {
    this.enemyBookWindowClose(this._enemyBookInfoIndexWindow);
    this._enemyBookInfoIndexWindow.deselect();
    this._enemyBookInfoIndexWindow.deactivate();
    this.enemyBookWindowClose(this._enemyBookPageWindow);
    this._enemyBookPageWindow.deselect();
    this._enemyBookPageWindow.deactivate();
    this.enemyBookWindowClose(this._enemyBookEnemyWindow);
    BattleManager.enemyBook_Open = false;
    this._enemyBookBackgroundSprite.hide();
    if (this._partyCommandWindow.isOpen()) {
        this._partyCommandWindow.activate();
    } else if (this._actorCommandWindow.isOpen()) {
        this._actorCommandWindow.activate();
    } else {
        this._partyCommandWindow.activate();
    }
    this._enemyBookActualSprite.hideActualEnemy();
};

Scene_Battle.prototype.onEnemyBookPageCancel = function() {
    if (this._enemyBookEnemyWindow._mode === "analyze") {
        this.enemyBookWindowClose(this._enemyBookEnemyWindow);
        this.enemyBookWindowClose(this._enemyBookPageWindow);
        this._enemyBookPageWindow.deselect();
        this._enemyBookPageWindow.deactivate();
        this._enemyBookBackgroundSprite.hide();
        BattleManager.enemyBook_Open = false;
        this._enemyBookActualSprite.hideActualEnemy();
    }
};

Scene_Battle.prototype.cancelEnemyBook = function() {
    if (PercentWindowShow) {
        this.enemyBookWindowClose(this._enemyBookPercentWindow);
    }
    if (CategoryShow) {
        this.enemyBookWindowClose(this._enemyBookCategoryWindow);
        this._enemyBookCategoryNameWindow.hide();
        this._enemyBookCategoryWindow.deselect();
        this._enemyBookCategoryWindow.deactivate();
    } else {
        this.enemyBookWindowClose(this._enemyBookIndexWindow);
        this._enemyBookIndexWindow.deselect();
        this._enemyBookIndexWindow.deactivate();
        this._enemyBookPageWindow.deselect();
        this._enemyBookPageWindow.deactivate();
    }
    this.enemyBookWindowClose(this._enemyBookEnemyWindow);
    this.enemyBookWindowClose(this._enemyBookPageWindow);
    BattleManager.enemyBook_Open = false;
    this._enemyBookBackgroundSprite.hide();
    if (this._partyCommandWindow.isOpen()) {
        this._partyCommandWindow.activate();
    } else if (this._actorCommandWindow.isOpen()) {
        this._actorCommandWindow.activate();
    } else {
        this._partyCommandWindow.activate();
    }
    this._enemyBookActualSprite.hideActualEnemy();
};

const _Scene_Battle_isAnyInputWindowActive  = Scene_Battle.prototype.isAnyInputWindowActive;
Scene_Battle.prototype.isAnyInputWindowActive = function() {
    return this._enemyBookPageWindow.active || (this._enemyBookCategoryWindow && this._enemyBookCategoryWindow.active) || _Scene_Battle_isAnyInputWindowActive.call(this);
};

const _Scene_Battle_isTimeActive = Scene_Battle.prototype.isTimeActive;
Scene_Battle.prototype.isTimeActive = function() {
    return this._enemyBookPageWindow.active || (this._enemyBookCategoryWindow && this._enemyBookCategoryWindow.active) || _Scene_Battle_isTimeActive.call(this);
};

const _Scene_Battle_updateCancelButton = Scene_Battle.prototype.updateCancelButton;
Scene_Battle.prototype.updateCancelButton = function() {
  if (this._cancelButton) {
    _Scene_Battle_updateCancelButton.call(this);
    if (BattleManager.enemyBook_Open) {
        this._cancelButton.visible = !BattleManager.enemyBook_Open;
    }
  }
};

Scene_Battle.prototype.addEnemyDataEnemyBook = function(enemy) {
    const enemyId = enemy.enemyId();
    if ($gameSystem.registrationTiming(2)) {
        $gameSystem.addToEnemyBook(enemyId);
    }
    if ($gameSystem.registrationStatusTiming(2)) {
        if (!$gameSystem.getEnemyBookFlag(enemyId)) {
            $gameSystem.addToEnemyBook(enemyId);
        }
        $gameSystem.addStatusToEnemyBook(enemyId);
    }
};

const _Window_Selectable_isOpenAndActive = Window_Selectable.prototype.isOpenAndActive;
Window_Selectable.prototype.isOpenAndActive = function() {
    if (BattleManager.enemyBook_Open && $gameParty.inBattle()) {
        return this.interruptWindow && _Window_Selectable_isOpenAndActive.call(this);
    } else {
        return _Window_Selectable_isOpenAndActive.call(this);
    }
};

const _Window_Base_updateTone = Window_Base.prototype.updateTone;
Window_Base.prototype.updateTone = function() {
    if (this._isEnemyBook && this.windowColor) {
      const tone = this.windowColor;
      this.setTone(tone.red, tone.green, tone.bule);
    } else {
        _Window_Base_updateTone.call(this);
    }
};

//Window_EnemyBook_Percent
function Window_EnemyBook_Percent() {
    this.initialize(...arguments);
}
  
Window_EnemyBook_Percent.prototype = Object.create(Window_Selectable.prototype);
Window_EnemyBook_Percent.prototype.constructor = Window_EnemyBook_Percent;
  
Window_EnemyBook_Percent.prototype.initialize = function(rect) {
    this._isEnemyBook = true;
    this._defeat = {};
    this._encountered = {};
    this._percentContent = PercentContent;
    this._percentContentLength = this._percentContent.length;
    Window_Selectable.prototype.initialize.call(this, rect);
    this._duration = 0;
    this._oy = 0;
};

Window_EnemyBook_Percent.prototype.loadWindowskin = function() {
    if (PercentWindowsSkin.WindowSkin) {
      this.windowskin = ImageManager.loadSystem(PercentWindowsSkin.WindowSkin);
      this.windowColor = PercentWindowsSkin.WindowSkinColor;
    } else {
      Window_Base.prototype.loadWindowskin.call(this);
    }
};

Window_EnemyBook_Percent.prototype.percentRefresh = function(enemyList) {
    this._enemyListLength = enemyList.length;
    this.defeatPercent(enemyList);
    this.encounteredPercent(enemyList);
    this.refresh();
};
  
Window_EnemyBook_Percent.prototype.defeatPercent = function(enemyList) {
    this._defeat.length = enemyList.length;
    this._defeat.encNum = $gameSystem.defeatEnemy(enemyList);
    this._defeat.onStatus = $gameSystem.onStatusEnemyDate(enemyList);
    this._defeat.Percent = Math.floor(this._defeat.encNum / this._defeat.length * 100);
    this._defeat.complete = Math.floor(this._defeat.onStatus / this._defeat.length * 100);
};
  
Window_EnemyBook_Percent.prototype.encounteredPercent = function(enemyList) {
    this._encountered.encNum = $gameSystem.encounteredEnemy(enemyList);
    this._encountered.length = enemyList.length;
};
  
Window_EnemyBook_Percent.prototype.registrationPercent = function(enemyList) {
    this.registration.encNum = $gameSystem.registrationEnemy(enemyList);
};
  
Window_EnemyBook_Percent.prototype.refresh = function() {
    const lineHeight = this.lineHeight();
    const rect = this.itemLineRect(0);
    let y = rect.y + (this._oy * -1);
    this.contents.clear();
    for (const content of this._percentContent) { 
        const text = this.getPercentParam(content);
        this.drawText(text, rect.x, y, rect.width, 'center');
        y += lineHeight;
    }
    const text = this.getPercentParam(this._percentContent[0]);
    this.drawText(text, rect.x, y, rect.width, 'center');
};
  
Window_EnemyBook_Percent.prototype.getPercentParam = function(content) {
    if (!content) {
        return '完成度 : '+ (this._defeat.complete || 0) +' %';
    }
    switch (content.ContentDate) {
      case 0:
        return content.ContentName +' : '+ (this._defeat.complete || 0) +' %';
      case 1:
        return content.ContentName +' : '+ this._encountered.encNum +'/'+ this._encountered.length;
      case 2:
        return content.ContentName +' : '+ this._defeat.encNum +'/'+ this._defeat.length;
      case 11:
        return content.ContentName +' : '+ this._encountered.encNum;
      case 12:
        return content.ContentName +' : '+ this._defeat.encNum;
      case 13:
        return content.ContentName +' : '+ this._defeat.onStatus;
    }
};
  
Window_EnemyBook_Percent.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    if (this._percentContentLength > 1) {
      this._duration++;
      this.updateInterval();
    }
};
  
Window_EnemyBook_Percent.prototype.updateInterval = function() {
    const lineHeight = this.lineHeight();
    if(this._duration >= Interval && this._duration < Interval + lineHeight){
        this._oy++;
        this.refresh();
    }
    if(this._duration >= Interval + lineHeight){
        this._duration = 0;
        if(this._oy >= lineHeight * this._percentContentLength){
            this._oy = 0;
        }
    }
};

//Window_EnemyBook_CategoryName
function Window_EnemyBook_CategoryName() {
    this.initialize(...arguments);
}
  
Window_EnemyBook_CategoryName.prototype = Object.create(Window_Selectable.prototype);
Window_EnemyBook_CategoryName.prototype.constructor = Window_EnemyBook_CategoryName;
  
Window_EnemyBook_CategoryName.prototype.initialize = function(rect) {
    this._isEnemyBook = true;
    Window_Selectable.prototype.initialize.call(this, rect);
    this._categoryName = null;
};

Window_EnemyBook_CategoryName.prototype.loadWindowskin = function() {
    if (CategoryNameWindowsSkin.WindowSkin) {
      this.windowskin = ImageManager.loadSystem(CategoryNameWindowsSkin.WindowSkin);
      this.windowColor = CategoryNameWindowsSkin.WindowSkinColor;
    } else {
      Window_Base.prototype.loadWindowskin.call(this);
    }
};

Window_EnemyBook_CategoryName.prototype.setCategoryName = function(name) {
    if (this._categoryName !== name) {
        this._categoryName = name;
        this.refresh();
    }
};

Window_EnemyBook_CategoryName.prototype.refresh = function() {
    const rect = this.itemRect(0);
    this.contents.clear();
    this.drawText(this._categoryName, rect.x, rect.y, rect.width);
};

//Window_EnemyBook_Category
function Window_EnemyBook_Category() {
    this.initialize(...arguments);
}
  
Window_EnemyBook_Category.prototype = Object.create(Window_Command.prototype);
Window_EnemyBook_Category.prototype.constructor = Window_EnemyBook_Category;
  
Window_EnemyBook_Category.prototype.initialize = function(rect) {
    this._isEnemyBook = true;
    Window_Command.prototype.initialize.call(this, rect);
    this.interruptWindow = true;
};

Window_EnemyBook_Category.prototype.loadWindowskin = function() {
    if (CategoryWindowsSkin.WindowSkin) {
      this.windowskin = ImageManager.loadSystem(CategoryWindowsSkin.WindowSkin);
      this.windowColor = CategoryWindowsSkin.WindowSkinColor;
    } else {
      Window_Base.prototype.loadWindowskin.call(this);
    }
};

Window_EnemyBook_Category.prototype.maxCols = function() {
    return 1;
};

Window_EnemyBook_Category.prototype.categoryFilter = function() {
    return this._list.filter((data, i) => $gameSystem.getCategoryEnemyBook(i));
};

Window_EnemyBook_Category.prototype.select = function(index) {
    Window_Selectable.prototype.select.call(this, index);
    this.refreshEnemyData();
};

Window_EnemyBook_Category.prototype.setCategoryFlags = function() {
    $gameSystem.initCategoryEnemyBook();
    for (enemy of $dataEnemies) {
        $gameSystem.categoryToEnemyBook(enemy);
    }
};

Window_EnemyBook_Category.prototype.refreshEnemyData = function() {
    if (this._enemyWindow && this.active) {
        const note = this.currentData() ? this.currentData().note : {};
        this._enemyWindow.setCategoryData(note);
    }
};

Window_EnemyBook_Category.prototype.makeCommandList = function() {
    const list = EnemyBookCategory;
    list.forEach((command, i) => {
        let categoryName = command.CategoryName;
        let enabled = true;
        if (CategoryVisibleType === 2) {
            categoryName = this.unknownDataLength(categoryName);
            enabled = false;
        }
        this.addCommand(categoryName, command.CategoryKey, enabled, i);
        this._list[this._list.length - 1].note = enemyBookExtractMetadata(command);
    });
    if (CategoryVisibleType === 1) {
        this._list = this.categoryFilter();
    }
};

Window_EnemyBook_Category.prototype.unknownDataLength = function(name) {
    if(CategoryUnknownData === '？' || CategoryUnknownData === '?') {
        const name_length = name.length;
        return CategoryUnknownData.repeat(name_length);
    } else {
        return CategoryUnknownData;
    }
};

Window_EnemyBook_Category.prototype.refresh = function() {
    this.setCategoryFlags();
    Window_Command.prototype.refresh.call(this);
    this.setSelect();
};

Window_EnemyBook_Category.prototype.processOk = function() {
    pageIndex.category = this.index();
    const currentData = this.currentData();
    this._enemyIndexWindow.setCategoryType(currentData);
    const name = currentData ? currentData.name : '';
    this._categoryNameWindow.setCategoryName(name);
    Window_Command.prototype.processOk.call(this);
};

Window_EnemyBook_Category.prototype.processCancel = function() {
    pageIndex.category = this.index();
    Window_Command.prototype.processCancel.call(this);
};

Window_EnemyBook_Category.prototype.setSelect = function() {
    this.select(pageIndex.category || 0);
};

Window_EnemyBook_Category.prototype.setEnemyIndexWindow = function(enemyIndexWindow) {
    this._enemyIndexWindow = enemyIndexWindow;
};

Window_EnemyBook_Category.prototype.setCategoryNameWindow = function(categoryNameWindow) {
    this._categoryNameWindow = categoryNameWindow;
};

Window_EnemyBook_Category.prototype.setEnemyWindow = function(enemyWindow) {
    this._enemyWindow = enemyWindow;
    this.refreshEnemyData();
};

Window_EnemyBook_Category.prototype.itemTextAlign = function() {
    return "left";
};


//Window_EnemyBook_Index
function Window_EnemyBook_Index() {
    this.initialize(...arguments);
}
  
Window_EnemyBook_Index.prototype = Object.create(Window_Selectable.prototype);
Window_EnemyBook_Index.prototype.constructor = Window_EnemyBook_Index;
  
Window_EnemyBook_Index.prototype.initialize = function(rect) {
    this._isEnemyBook = true;
    Window_Selectable.prototype.initialize.call(this, rect);
    this._enemyList = [];
    this._category = null;
    this.interruptWindow = true;console.log()
};

Window_EnemyBook_Index.prototype.loadWindowskin = function() {
    if (IndexWindowsSkin.WindowSkin) {
      this.windowskin = ImageManager.loadSystem(IndexWindowsSkin.WindowSkin);
      this.windowColor = IndexWindowsSkin.WindowSkinColor;
    } else {
      Window_Base.prototype.loadWindowskin.call(this);
    }
};

Window_EnemyBook_Index.prototype.maxCols = function() {
    return 1;
};

Window_EnemyBook_Index.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_EnemyBook_Index.prototype.makeEnemyList = function() {
    this._enemyPercentList = [];
    if (this._category && this._category.symbol === "mapEnemy") {
        this._enemyEncounterList = this.getMapEncountEnemyList();
    }
    this._data = $dataEnemies.filter(enemy => this.includes(enemy));
};

Window_EnemyBook_Index.prototype.includes = function(enemy) {
    const result = $gameSystem.isEnemyBook(enemy);
    if (result) {
        this._enemyPercentList.push(enemy);
    }
    if (result && this.categoryIncludes(enemy) && this.unknownEnemyVisible(enemy)) {
        return true;
    }
    return false;
};

Window_EnemyBook_Index.prototype.unknownEnemyVisible = function(enemy) {
    return !UnknownVisible || (UnknownVisible && $gameSystem.isInEnemyBook(enemy));
};

Window_EnemyBook_Index.prototype.getMapEncountEnemyList = function() {
    if ($gameMap.data.EncountEnemiesList) {
        return $gameMap.data.EncountEnemiesList.split(',').map(Number);
    } else if(NuunManager.isMapEncountEnemList() && MapEncountEnemiesList[$gameMap.mapId()]) {
        return NuunManager.getMapEncountEnemyList()[$gameMap.mapId()].Enemy;
    } else if (Imported.NUUN_EnemyBookEncounterCheck) {
        return NuunManager.getEncounterEnemyList();
    }
};
  
Window_EnemyBook_Index.prototype.categoryIncludes = function(enemy) {
    if (!this._category || this._category.symbol === "all") {
        return true;
    } else if (this._enemyEncounterList && this._category.symbol === "mapEnemy") {
        return this._enemyEncounterList.find(id => id === enemy.id);
    } else {
        const enemyCategory = enemy.meta.CategoryKey ? enemy.meta.CategoryKey.split(',') : ["all"];
        return enemyCategory.find(category => category === this._category.symbol);
    }
};

Window_EnemyBook_Index.prototype.setSelect = function() {
    this.select(Math.min(pageIndex.index, this.maxItems()) || 0);
};

Window_EnemyBook_Index.prototype.select = function(index) {
    Window_Selectable.prototype.select.call(this, index);
    this.refreshEnemyData();
};

Window_EnemyBook_Index.prototype.getEnemy = function() {
    return this._data[this.index()];
};
  
Window_EnemyBook_Index.prototype.refreshEnemyData = function() {
    if (this._enemyWindow && this.active) {
      const enemy = this.getEnemy();
      this._enemyWindow.setEnemyData(enemy);
    }
};

Window_EnemyBook_Index.prototype.processOk = function() {
    pageIndex.index = this.index();
    Window_Selectable.prototype.processOk.call(this);
};

Window_EnemyBook_Index.prototype.processCancel = function() {
    pageIndex.index = this.index();
    Window_Selectable.prototype.processCancel.call(this);
};

Window_EnemyBook_Index.prototype.enemyAt = function(index) {
    return this._data && index >= 0 ? this._data[index] : null;
};

Window_EnemyBook_Index.prototype.refresh = function() {
    this.makeEnemyList();
    this.refreshPercent();
    this.setSelect();
    Window_Selectable.prototype.refresh.call(this);
};

Window_EnemyBook_Index.prototype.drawItem = function(index) {
    const enemy = this.enemyAt(index);
    this.resetTextColor();
    if (enemy) {
        const rect = this.itemLineRect(index);
        let name = '';
        let iconId = 0;
        if ($gameSystem.isInEnemyBook(enemy)) {
            name = enemy.name;
            iconId = enemy.meta.EnemyIcon ? Number(enemy.meta.EnemyIcon) : 0;
        } else {
            name = this.unknownDataLength(enemy);
            iconId = enemy.meta.EnemyIcon && enemy.meta.EnemyIcon > 0 ? UnknownEnemyIcons : 0;
        }
        const textMargin = iconId > 0 ? ImageManager.iconWidth + 4 : 0;
        const itemWidth = Math.max(0, rect.width - textMargin);
        if(NumberType > 0) {
            let numberText = NumberMode ? index + 1 : $gameSystem.getEnemyBookNumber(enemy.id);
            const textWidth = this.numberWidth(numberText, NumberType);
            if (NumberType >= 2) {
                numberText = this.numberWidthSlice(numberText, NumberType);
            }
            this.drawText(numberText, rect.x, rect.y, textWidth);
            this.drawText(":", rect.x + textWidth + 6, rect.y);
            if (iconId > 0) {
                const iconY = rect.y + (this.lineHeight() - ImageManager.iconHeight) / 2;
                this.drawIcon(iconId, rect.x + textWidth + 24, iconY);
            }
            this.isEnemyNameColor(enemy);
            this.drawText(name, rect.x + textWidth + 24 + textMargin, rect.y, itemWidth - textWidth - 24);
        } else {
            if (iconId > 0) {
                const iconY = rect.y + (this.lineHeight() - ImageManager.iconHeight) / 2;
                this.drawIcon(iconId, rect.x, iconY);
            }
            this.isEnemyNameColor(enemy);
            this.drawText(name, rect.x + textMargin, rect.y, itemWidth);
        }
    }
};

Window_EnemyBook_Index.prototype.numberWidth = function(numberText, id) {
    if (id <= 1) {
        return this.textWidth(NumberWidth);
    } else if (id === 2) {
        return this.textWidth('00');
    } else if (id === 3) {
        return this.textWidth('000');
    } else if (id === 4) {
        return this.textWidth('0000');
    }
};
  
Window_EnemyBook_Index.prototype.numberWidthSlice = function(indexText, id) {
    if (id === 2) {
        return ('00' + indexText).slice(-2);
    } else if (id === 3) {
        return ('000' + indexText).slice(-3);
    } else if (id === 4) {
        return ('0000' + indexText).slice(-4);
    }
};

Window_EnemyBook_Index.prototype.EnemyNameLength = function(enemy) {
	return enemy.name.length;
};
  
Window_EnemyBook_Index.prototype.unknownDataLength = function(enemy) {
    if(UnknownData === '？' || UnknownData === '?') {
        const name_length = this.EnemyNameLength(enemy);
        return UnknownData.repeat(name_length);
    } else {
        return UnknownData;
    }
};

Window_EnemyBook_Index.prototype.setCategoryType = function(category) {
    if (this._category !== category) {
        this._category = category;
    }
};

Window_EnemyBook_Index.prototype.refreshPercent = function() {
    if (this._percentWindow) {
      this._percentWindow.percentRefresh(this._enemyPercentList);
    }
};

Window_EnemyBook_Index.prototype.setPercentWindow = function(percentWindow) {
    this._percentWindow = percentWindow;
    this.refresh();
};

Window_EnemyBook_Index.prototype.setEnemyWindow = function(enemyWindow) {
    this._enemyWindow = enemyWindow;
};
  
Window_EnemyBook_Index.prototype.setCategoryWindow = function(categoryWindow) {
    this._categoryWindow = categoryWindow;
};

Window_EnemyBook_Index.prototype.isEnemyNameColor = function(enemy) {
    if ($gameSystem.isInEnemyBookStatus(enemy)) {
        this.changeTextColor(NuunManager.getColorCode(RegistrationStatusEnemyColor));
    } else if ($gameSystem.isInEnemyBook(enemy)) {
        this.changeTextColor(NuunManager.getColorCode(RegistrationEnemyColor));
    } else {
        this.resetTextColor();
    }
};


function Window_EnemyBook_InfoIndex() {
    this.initialize(...arguments);
}
  
Window_EnemyBook_InfoIndex.prototype = Object.create(Window_EnemyBook_Index.prototype);
Window_EnemyBook_InfoIndex.prototype.constructor = Window_EnemyBook_InfoIndex;
  
Window_EnemyBook_InfoIndex.prototype.initialize = function(rect) {
    this._isEnemyBook = true;
    Window_EnemyBook_Index.prototype.initialize.call(this, rect);
};

Window_EnemyBook_InfoIndex.prototype.loadWindowskin = function() {
    if (InfoWindowsSkin.WindowSkin) {
      this.windowskin = ImageManager.loadSystem(InfoWindowsSkin.WindowSkin);
      this.windowColor = InfoWindowsSkin.WindowSkinColor;
    } else {
      Window_Base.prototype.loadWindowskin.call(this);
    }
};

Window_EnemyBook_InfoIndex.prototype.setSelect = function() {
    this.select(Math.min(pageIndex.infoIndex, this.maxItems()) || 0);
};

Window_EnemyBook_InfoIndex.prototype.processOk = function() {
    pageIndex.infoIndex = this.index();
    Window_Selectable.prototype.processOk.call(this);
};

Window_EnemyBook_InfoIndex.prototype.processCancel = function() {
    pageIndex.infoIndex = this.index();
    Window_Selectable.prototype.processCancel.call(this);
};

Window_EnemyBook_InfoIndex.prototype.refreshEnemyData = function() {
    if (this._enemyWindow && this.active) {
        const enemy = this.getEnemy();
        if (enemy) {
            this._enemyWindow.selectEnemy = this._data[this.index()];
        }
        this._enemyWindow.setEnemyInfoData(enemy);
    }
};

Window_EnemyBook_InfoIndex.prototype.refresh = function() {
    this.makeEnemyList();
    this.setSelect();
    Window_Selectable.prototype.refresh.call(this);
};

Window_EnemyBook_InfoIndex.prototype.makeEnemyList = function() {
    this._data = [];
    this._data = $gameTroop._enemies.filter(enemy => this.includes(enemy));
};

Window_EnemyBook_InfoIndex.prototype.includes = function(enemy) {
    if ($gameSystem.isEnemyBookData(enemy.enemy()) && enemy.isAlive()) {
      return true;
    }
    return false;
};
  
Window_EnemyBook_InfoIndex.prototype.enemyAt = function(index) {
    return this._data && index >= 0 ? this._data[index].enemy() : null;
};
  
Window_EnemyBook_InfoIndex.prototype.getEnemy = function() {
    return this._data && this._data[this.index()] ? this._data[this.index()].enemy() : null;
};

Window_EnemyBook_InfoIndex.prototype.drawItem = function(index) {
    const enemy = this.enemyAt(index);
    if(enemy) {
        const rect = this.itemLineRect(index);
        let name = '';
        let iconId = 0;
        if (RegistrationEnemyInfo) {
            if ($gameSystem.isInEnemyBook(enemy) || !!enemy.meta[NoBookDataTag]) {
                name = this._data[index].name();
                iconId = enemy.meta.EnemyIcon ? Number(enemy.meta.EnemyIcon) : 0;
            } else {
                name = this.unknownDataLength(enemy);
                iconId = enemy.meta.EnemyIcon && enemy.meta.EnemyIcon > 0 ? UnknownEnemyIcons : 0;
            }
        } else {
            name = this._data[index].name();
            iconId = enemy.meta.EnemyIcon ? Number(enemy.meta.EnemyIcon) : 0;
        }
        const textMargin = iconId > 0 ? ImageManager.iconWidth + 4 : 0;
        const itemWidth = Math.max(0, rect.width - textMargin);
        if (iconId > 0) {
            const iconY = rect.y + (this.lineHeight() - ImageManager.iconHeight) / 2;
            this.drawIcon(iconId, rect.x, iconY);
        }
        this.isEnemyNameColor(enemy);
        this.drawText(name, rect.x + textMargin, rect.y, itemWidth); 
    }
};

//Window_EnemyBookPage
function Window_EnemyBookPage() {
    this.initialize(...arguments);
}
  
Window_EnemyBookPage.prototype = Object.create(Window_HorzCommand.prototype);
Window_EnemyBookPage.prototype.constructor = Window_EnemyBookPage;
  
Window_EnemyBookPage.prototype.initialize = function(rect) {
    this._isEnemyBook = true;
    Window_HorzCommand.prototype.initialize.call(this, rect);
    this._data = null;
    this.interruptWindow = true;
};

Window_EnemyBookPage.prototype.loadWindowskin = function() {
    if (PageWindowsSkin.WindowSkin) {
      this.windowskin = ImageManager.loadSystem(PageWindowsSkin.WindowSkin);
      this.windowColor = PageWindowsSkin.WindowSkinColor;
    } else {
      Window_Base.prototype.loadWindowskin.call(this);
    }
};

Window_EnemyBookPage.prototype.maxCols = function() {
    return this._pageCols;
};

Window_EnemyBookPage.prototype.select = function(index) {
    Window_HorzCommand.prototype.select.call(this, index);
    this.refreshEnemyData(index);
    if (index >= 0) {
        pageIndex.page = index;
    }
};

Window_EnemyBookPage.prototype.refreshEnemyData = function(index) {
    if (this._enemyWindow) {
        this._enemyWindow.setPage(index);
    }
};

Window_EnemyBookPage.prototype.makeCommandList = function() {
    if (this._data && (this._indexWindow && this._indexWindow.active) || (this._infoIndexWindow && this._infoIndexWindow.active)) {
        this._data.forEach((command, i) => {
            this.addCommand(command.PageCategoryName, 'page' + i, true, i);
        });
    } else if (this._enemyWindow && this._enemyWindow._mode === 'analyze') {
        this._data.forEach((command, i) => {
            this.addCommand(command.PageCategoryName, 'page' + i, true, i);
        });
    }
};

Window_EnemyBookPage.prototype.setPageList = function(list, cols) {
    this._data = list;
    this._pageCols = cols;
    this.refresh();
};

Window_EnemyBookPage.prototype.setEnemyWindow = function(enemyWindow) {
    this._enemyWindow = enemyWindow;
};

Window_EnemyBookPage.prototype.setIndexWindow = function(indexWindow) {
    this._indexWindow = indexWindow;
};

Window_EnemyBookPage.prototype.setInfoIndexWindow = function(indexWindow) {
    this._infoIndexWindow = indexWindow;
};

Window_EnemyBookPage.prototype.refresh = function() {
    Window_HorzCommand.prototype.refresh.call(this);
};

Window_EnemyBookPage.prototype.userRight = function(wrap) {
    _Window_Selectable_cursorRight.call(this, wrap);
};

Window_EnemyBookPage.prototype.userLeft = function(wrap) {
    _Window_Selectable_cursorLeft.call(this, wrap);
};

Window_EnemyBookPage.prototype.cursorRight = function(wrap) {
    if (!PageNextSymbol && !PagePreviousSymbol) {
        _Window_Selectable_cursorRight.call(this, wrap);
    }
};
    
Window_EnemyBookPage.prototype.cursorLeft = function(wrap) {
    if (!PageNextSymbol && !PagePreviousSymbol) {
        _Window_Selectable_cursorLeft.call(this, wrap);
    }
};

Window_EnemyBookPage.prototype.cursorUp = function(wrap) {

};
    
Window_EnemyBookPage.prototype.cursorDown = function(wrap) {

};


function Window_EnemyBook() {
    this.initialize(...arguments);
}
  
Window_EnemyBook.prototype = Object.create(Window_StatusBase.prototype);
Window_EnemyBook.prototype.constructor = Window_EnemyBook;
  
Window_EnemyBook.prototype.initialize = function(rect) {
    this._isEnemyBook = true;
    Window_StatusBase.prototype.initialize.call(this, rect);
    this._page = 0;
    this._categoryMode = false;
    this._categoryData = {};
    this._enemySprite = null;
    this._displayList = null;
    this._enemy = null;
    this._enemyData = [];
    this._enemyActualSprite = null;
    this.setEnemySprite();
    this.language_Jp = $gameSystem.isJapanese();
    this._enemyId = 0;
    ge = null;
    de = null;
};

Window_EnemyBook.prototype.loadWindowskin = function() {
    if (ContentWindowsSkin.WindowSkin) {
      this.windowskin = ImageManager.loadSystem(ContentWindowsSkin.WindowSkin);
      this.windowColor = ContentWindowsSkin.WindowSkinColor;
    } else {
      Window_Base.prototype.loadWindowskin.call(this);
    }
};

Window_EnemyBook.prototype.maxCols = function() {
    return ContentCols;
};

Window_EnemyBook.prototype.close = function() {
    Window_Base.prototype.close.call(this);
    this._enemySprite.resetEnemy();
    this.enemyActualeResetEnemy();
};

Window_EnemyBook.prototype.setEnemyData = function(enemy) {
    this._categoryMode = false;
    if (this._enemy !== enemy) {
        this._enemy = enemy;
        this.refresh();
    }
};

Window_EnemyBook.prototype.setEnemyInfoData = function(enemy) {
    this._enemy = enemy;
    this.refresh();
};

Window_EnemyBook.prototype.setEnemySprite = function() {
    this._enemySprite = new Sprite_BookEnemy();
    this.addChildToBack(this._enemySprite);
};

Window_EnemyBook.prototype.setPage = function(index) {
    this._page = index;
    this._displayList = index >= 0 ? PageSetting[index] : null;
    this.refresh();
};

Window_EnemyBook.prototype.getDisplayPage = function() {
    return this._displayList;
};


Window_EnemyBook.prototype.setCategoryData = function(note) {
    this._categoryMode = true;
    if (this._categoryData !== note) {
        this._categoryData = note;
        this.refresh();
    }
};

Window_EnemyBook.prototype.listDate = function(list) {
    let tag = 'PageList';
    if (this._categoryMode) {
        return CategoryListDateSetting; 
    } else if (UnregisteredEnemy > 0) {
        tag += $gameSystem.isInEnemyBook(this._enemy) ? list.ListDateSetting : UnregisteredEnemy;
    } else {
        tag += list.ListDateSetting;
    }
    return bookContents[tag];
};

Window_EnemyBook.prototype.setEnemyActualSprite = function(sprite) {
    this._enemyActualSprite = sprite;
};

Window_EnemyBook.prototype.setupEnemyActual = function(battler, mask) {
    if (this._enemyActualSprite) {
        this._enemyActualSprite.setup(battler, mask);
    }
};

Window_EnemyBook.prototype.enemyActualeResetEnemy = function() {
    if (this._enemyActualSprite) {
        this._enemyActualSprite.resetEnemy();
    }
};

Window_EnemyBook.prototype.paramMask = function(MaskMode) {
    return MaskMode && !this.noUnknownStatus() ? $gameSystem.isInEnemyBookStatus(this._enemy) : true;
};

Window_EnemyBook.prototype.resistWeakDataMask = function(MaskMode) {
    return MaskMode && !this.noUnknownStatus() ? $gameSystem.isInEnemyBookStatus(this._enemy) : true;
};

Window_EnemyBook.prototype.showDropItemMask = function(MaskMode) {
    return MaskMode && !this.noUnknownStatus() ? $gameSystem.isInEnemyBookStatus(this._enemy): true;
};
  
Window_EnemyBook.prototype.dropItemFlag = function(index) {
    return ShowDropItemName ? $gameSystem.getDropItemFlag(this._enemy.id, index) : true;
};

Window_EnemyBook.prototype.showStealItemMask = function(MaskMode) {
    return MaskMode && !this.noUnknownStatus() ? $gameSystem.isInEnemyBookStatus(this._enemy): true;
};
  
Window_EnemyBook.prototype.stealItemFlag = function(index) {
    return ShowStealItemName ? $gameSystem.getStealItemFlag(this._enemy.id, index) : true;
};

Window_EnemyBook.prototype.condDropItemFlag = function(index) {
    return Imported.NUUN_EnemyBookEX_2 && this.getShowCondDropItemName() ? $gameSystem.getCondDropItemFlag(this._enemy.id, index) : true;
};

Window_EnemyBook.prototype.showActionMask = function(MaskMode) {
    return MaskMode && !this.noUnknownStatus() ? $gameSystem.isInEnemyBookStatus(this._enemy): true;
};
  
Window_EnemyBook.prototype.actionFlag = function(index) {
    return ShowActionName ? $gameSystem.getEnemyBookActionFlag(this._enemy.id, index) : true;
};

Window_EnemyBook.prototype.onElementsFlag = function(index) {
    return Imported.NUUN_EnemyBookEX_1 && ShowElementsIcon && index >= 0 ? $gameSystem.getEnemyBookElementFlag(this._enemy.id, index) : true;
};
  
Window_EnemyBook.prototype.onStateFlag = function(index) {
    return Imported.NUUN_EnemyBookEX_1 && ShowStateIcon ? $gameSystem.getEnemyBookStateFlag(this._enemy.id, index) : true;
};
  
Window_EnemyBook.prototype.onDebuffFlag = function(index) {
    return Imported.NUUN_EnemyBookEX_1 && ShowDebuffIcon ? $gameSystem.getEnemyBookDebuffFlag(this._enemy.id, index) : true;
};

Window_EnemyBook.prototype.noUnknownStatus = function(enemy) {
    return this._enemy ? this._enemy.meta.ShowDataBook : false;
};

Window_EnemyBook.prototype.isEnemyData = function() {
    return $gameSystem.isEnemyBook(this._enemy) && (UnregisteredEnemy === 0 && $gameSystem.isInEnemyBook(this._enemy) || UnregisteredEnemy > 0);
};

Window_EnemyBook.prototype.enemyActualSpriteHide = function() {
    if (!$gameSystem.isInEnemyBook(this._enemy)) {
        if (this._enemyActualSprite) {
            this._enemyActualSprite.hide();
        }
    }
};

Window_EnemyBook.prototype.refresh = function() {
    Window_StatusBase.prototype.refresh.call(this);
    this._enemySprite.bitmap = null;
    this.setupEnemyActual(null, false);
    if (this._categoryMode && CategoryListDateSetting) {
        this.loadBitmap();
    } else if (this._enemy && this._displayList) {
        if (this.isEnemyData()) {
            this.loadBitmap();
        } else {
            this.enemyActualSpriteHide();
        }  
    }
};

Window_EnemyBook.prototype.getEnemyData = function() {
    const enemy = this._enemyData[this._enemy.id];
    if (!enemy) {
        this._enemyData[this._enemy.id] = new Game_Enemy(this._enemy.id, 0, 0);
    } else if (this._enemyId !== this._enemy.id && enemy._svBattlerData && enemy.svBattlerName()) {
        this._enemyData[this._enemy.id] = new Game_Enemy(this._enemy.id, 0, 0);//サイドビューなら再更新
    }
    this._enemyId = this._enemyData[this._enemy.id].enemyId();
    return this._enemyData[this._enemy.id];
};

Window_EnemyBook.prototype.drawEnemyBookContents = function() {
    const lineHeight = this.lineHeight();
    const listContents = this.listDate(this._displayList);
    const enemy = this._categoryMode ? null : this.getEnemyData();
    ge = enemy;
    de = this._enemy;
    this._enemySprite.resetEnemy();
    this.enemyActualeResetEnemy();
    this.setupEnemyActual(enemy, this.paramMask(ActualEnemyMask));
    for (const data of listContents) {
        this.resetFontSettings();
        const x_Position = data.X_Position;
        const position = Math.min(x_Position, this.maxCols());
        const rect = this.itemRect(position - 1);
        const x = rect.x + (data.X_Coordinate || 0);
        const y = (data.Y_Position - 1) * lineHeight + rect.y + (data.Y_Coordinate || 0);
        const width = (data.ItemWidth && data.ItemWidth > 0 ? Math.min(data.ItemWidth, rect.width - data.X_Coordinate) : this.widthMode(data, rect));
        this.dateDisplay(data, enemy, x, y, width);
    }
};

Window_EnemyBook.prototype.isActualeEnemyMask = function(list) {
    for (const data of list) {
        if (data.DateSelect === 200) {
            return this.paramMask(data.MaskMode);
        }
    }
    return false;
};

Window_EnemyBook.prototype.loadBitmap = function() {
    const listContents = this.listDate(this._displayList);
    let bitmap = null;
    let loadBitmap = null;
    listContents.forEach(list => {
        switch (list.DateSelect) {
            case 250:
                loadBitmap = ImageManager.nuun_LoadPictures(list.ImgData);
            case 251:
                const meta = this._categoryMode ? this._categoryData[list.textMethod] : this._enemy.meta[list.textMethod];
                const dataImg = meta ? meta.split(',') : null;
                if (dataImg) {
                    loadBitmap = ImageManager.loadBitmap("img/"+ ImgFolder +"/", dataImg[0]);
                }
        }
        if (loadBitmap && !loadBitmap.isReady()) {
            bitmap = loadBitmap;
        }
    });
    if (bitmap && !bitmap.isReady()) {
        bitmap.addLoadListener(this.drawEnemyBookContents.bind(this))
        return;
    } else {
        this.drawEnemyBookContents();
    }
};

Window_EnemyBook.prototype.widthMode = function(list, rect) {
    if (list.WideMode === 2) {
      rect.width = rect.width * 2 + this.colSpacing();
    } else if (list.WideMode === 3 && ContentCols >= 3) {
      rect.width = rect.width * 3 + (this.colSpacing() * 2);
    }
    return rect.width;
};

Window_EnemyBook.prototype.dateDisplay = function(list, enemy, x, y, width) {
    switch (list.DateSelect) {
        case 0:
            break;
        case 1:
        case 2:
            this.enemyGauge(list, enemy, x, y, width);
            break;
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
            this.enemyParams(list, enemy, x, y, width);
            break;
        case 9:
            this.enemyGauge(list, enemy, x, y, width);
            break;
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
            this.enemyXParams(list, enemy, x, y, width);
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
            this.enemySParams(list, enemy, x, y, width);
            break;
        case 30:
            this.enemyExp(list, enemy, x, y, width);
            break;
        case 31:
            this.enemyGold(list, enemy, x, y, width);
            break;
        case 32:
            this.defeat(list, enemy, x, y, width);
            break;
        case 33:
            this.enemyName(list, enemy, x, y, width);
            break;
        case 34:
            this.enemyLevel(list, enemy, x, y, width);
            break;
        case 35:
            this.name(list, enemy, x, y, width);
            break;
        case 36:
            this.turn(list, enemy, x, y, width);
            break;
        case 37:
            this.bookEnemyNo(list, enemy, x, y, width);
            break;
        case 40:
            this.drawResistElement(list, enemy, x, y, width);
            break;
        case 41:
            this.drawWeakElement(list, enemy, x, y, width);
            break;
        case 42:
            this.drawNoEffectElement(list, enemy, x, y, width);
            break;
        case 43:
            this.drawResistValueElement(list, enemy, x, y, width);
            break;
        case 44:
            this.drawAbsorpElement(list, enemy, x, y, width);
            break;
        case 45:
            this.drawResistStates(list, enemy, x, y, width);
            break;
        case 46:
            this.drawWeakStates(list, enemy, x, y, width);
            break;
        case 47:
            this.drawNoEffectStates(list, enemy, x, y, width);
            break;
        case 48:
            this.drawResistValueState(list, enemy, x, y, width);
            break;
        case 50:
            this.drawWeakDebuff(list, enemy, x, y, width);
            break;
        case 51:
            this.drawResistDebuff(list, enemy, x, y, width);
            break;
        case 52:
            this.drawNoEffectDebuff(list, enemy, x, y, width);
            break;
        case 55:
            this.drawResistValueDebuff(list, enemy, x, y, width);
            break;
        case 60:
            this.dropItems(list, enemy, x, y, width);
            break;
        case 61:
            this.stealItems(list, enemy, x, y, width);
            break;
        case 62:
            this.condDropItems(list, enemy, x, y, width);
            break;
        case 70:
            this.drawDesc(list, enemy, x, y, width);
            break;
        case 71:
            this.drawCommonDesc(list, enemy, x, y, width);
            break;
        case 80:
            this.originalParams(list, enemy, x, y, width);
            break;
        case 90:
            this.attackElement(list, enemy, x, y, width);
            break;
        case 100:
            this.enemyAction(list, enemy, x, y, width);
            break;
        case 121:
            this.enemyElementChart(list, enemy, x, y, width);
            break;
        case 122:
            this.enemyStateChart(list, enemy, x, y, width);
            break;
        case 200:
            this.enemyImg(list, enemy, x - 4, y - 4, width);
            break;
        case 201:
            this.enemyCharacter(list, enemy, x, y, width);
            break;
        case 250:
            this.commonEnemyBitmap(list, enemy, x, y, width);
            break;
        case 251:
            this.enemyBitmap(list, enemy, x, y, width);
            break;
        case 500:
            this.enemyPageSwitching(list, enemy, x, y, width);
            break;
        case 1000:
            this.horzLine(list, enemy, x, y, width);
            break;
        default:
            break;
    }
};

Window_EnemyBook.prototype.paramNameShow = function(list, enemy) {
    if (list.paramName) {
      return list.paramName
    }
    
    const params = list.DateSelect;
    switch (params) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
            return TextManager.param(params - 1);
        case 9:
            return TextManager.basic(6);
        case 10:
        case 11:
            return TextManager.param(params - 2);
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
        default:
            return null;
    }
};

Window_EnemyBook.prototype.paramShow = function(list, enemy) {
    const de = this._enemy;
    if (list.DetaEval) {
      return eval(list.DetaEval);
    }
    const params = list.DateSelect;
    switch (params) {
        case 1:
            return enemy._hp;
        case 2:
            return enemy._mp;
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
            return enemy.param(params - 1);
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
            return enemy.xparam(params - 10) * 100;
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
            return enemy.sparam(params - 20) * 100;
        default:
            return null;
    }
};

Window_EnemyBook.prototype.normalParam = function(list, enemy) {
    const de = this._enemy;
    if (list.DetaEval) {
      return eval(list.DetaEval);
    }
    const params = list.DateSelect;
    if (params >= 10) {
        return this.paramShow(list, enemy);
    }
    switch (params) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
            return this._enemy.params[params - 1];
      default:
        return null;
    }
};

Window_EnemyBook.prototype.horzLine = function(list, enemy, x, y, width) {
    const lineY = y + this.lineHeight() / 2 - 1;
    this.contents.paintOpacity = 48;
    this.contents.fillRect(x, lineY, width, 2, NuunManager.getColorCode(list.NameColor));
    this.contents.paintOpacity = 255;
};

Window_EnemyBook.prototype.enemyPageSwitching = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const nameText = list.paramName ? list.paramName : '←→キー：ページ切り替え';
    this.drawText(nameText, x, y, width, list.namePosition);
};

Window_EnemyBook.prototype.enemyImg = function(list, enemy, x, y, width) {
    const height = list.ImgMaxHeight * this.lineHeight();
    const itemPadding = this.itemPadding();
    this._enemySprite.setMaxWidth(width);
    this._enemySprite.setMaxHeight(height - itemPadding);
    this._enemySprite.setup(enemy, width / 2 + x + (itemPadding * 2), (y + height / 2) + (itemPadding * 2), this.paramMask(list.MaskMode));
};

Window_EnemyBook.prototype.enemyName = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const text = enemy.name();
    const iconId = this._enemy.meta.EnemyIcon ? Number(this._enemy.meta.EnemyIcon) : 0;
    if (iconId > 0) {
        const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
        const textMargin = iconId > 0 ? ImageManager.iconWidth + 4 : 0;
        const itemWidth = Math.max(0, width - textMargin);
        const textWidth = this.textWidth(text);
        const width2 = Math.min(itemWidth, textWidth);
        if(list.namePosition === 'center') {
            this.drawIcon(iconId, x + (width / 2 - width2 / 2) - textMargin / 2, iconY);
        } else if (list.namePosition === 'left') {
            this.drawIcon(iconId, x, iconY);
        } else {
            this.drawIcon(iconId, x + itemWidth - width2, iconY);
        }
        this.drawText(text, x + textMargin, y, itemWidth, list.namePosition);
    } else {
        this.drawText(text, x, y, width, list.namePosition);
    }
};

Window_EnemyBook.prototype.name = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const nameText = list.paramName;
    let margin = 0;
    if (list.IconId > 0) {
        this.drawIcon(list.IconId, x, y + list.IconY);
        margin = ImageManager.iconWidth + 4;
    }
    if (nameText) {
      this.drawText(nameText, x + margin, y, width - margin, list.namePosition);
    }
};

Window_EnemyBook.prototype.enemyGauge = function(list, enemy, x, y, width) {
    this.enemyParams(list, enemy, x, y, width);
};

Window_EnemyBook.prototype.enemyParams = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    let margin = 0;
    if (list.Back) {
        this.drawContentsBackground(list, x, y, width);
        x = this.contensX(x);
        width = this.contensWidth(width);
    }
    if (list.IconId > 0) {
        this.drawIcon(list.IconId, x, y + list.IconY);
        margin = ImageManager.iconWidth + 4;
    }
    const nameText = this.paramNameShow(list, enemy);
    const systemWidth = list.SystemItemWidth || 100;
    this.drawText(nameText, x + margin, y, systemWidth - margin);
    this.resetTextColor();
    let text = this.paramShow(list, enemy);
    if (!this.paramMask(list.MaskMode)){
        text = UnknownStatus;
    } else {
        this.setBuffColor(list, enemy);
    }
    this.drawText(text, x + systemWidth + this.itemPadding(), y, width - (systemWidth + this.itemPadding()), list.namePosition);
};

Window_EnemyBook.prototype.enemyXParams = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    let margin = 0;
    if (list.Back) {
        this.drawContentsBackground(list, x, y, width);
        x = this.contensX(x);
        width = this.contensWidth(width);
    }
    if (list.IconId > 0) {
        this.drawIcon(list.IconId, x, y + list.IconY);
        margin = ImageManager.iconWidth + 4;
    }
    const nameText = this.paramNameShow(list, enemy);
    const systemWidth = list.SystemItemWidth || 100;
    this.drawText(nameText, x + margin, y, systemWidth - margin);
    this.resetTextColor();
    let text = this.paramShow(list, enemy);
    if (!this.paramMask(list.MaskMode)){
        text = UnknownStatus;
    } else {
        text = NuunManager.numPercentage(text, list.Decimal, DecimalMode);
        this.setBuffColor(list, enemy);
    }
    text += list.paramUnit ? String(list.paramUnit) : " %";
    this.drawText(text, x + systemWidth + this.itemPadding(), y, width - (systemWidth + this.itemPadding()), list.namePosition);
};

Window_EnemyBook.prototype.enemySParams = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    let margin = 0;
    if (list.Back) {
        this.drawContentsBackground(list, x, y, width);
        x = this.contensX(x);
        width = this.contensWidth(width);
    }
    if (list.IconId > 0) {
        this.drawIcon(list.IconId, x, y + list.IconY);
        margin = ImageManager.iconWidth + 4;
    }
    const nameText = this.paramNameShow(list, enemy);
    const systemWidth = list.SystemItemWidth || 100;
    this.drawText(nameText, x + margin, y, systemWidth - margin);
    this.resetTextColor();
    let text = this.paramShow(list, enemy);
    if (!this.paramMask(list.MaskMode)){
        text = UnknownStatus;
    } else {
        text = NuunManager.numPercentage(text, list.Decimal, DecimalMode);
        this.setBuffColor(list, enemy);
    }
    text += list.paramUnit ? String(list.paramUnit) : " %";
    this.drawText(text, x + systemWidth + this.itemPadding(), y, width - (systemWidth + this.itemPadding()), list.namePosition);
};

Window_EnemyBook.prototype.enemyExp = function(list, enemy, x, y, width) {
    const de = this._enemy;
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    let margin = 0;
    if (list.Back) {
        this.drawContentsBackground(list, x, y, width);
        x = this.contensX(x);
        width = this.contensWidth(width);
    }
    if (list.IconId > 0) {
        this.drawIcon(list.IconId, x, y + list.IconY);
        margin = ImageManager.iconWidth + 4;
    }
    const nameText = list.paramName ? list.paramName : TextManager.exp;
    const systemWidth = list.SystemItemWidth || 100;
    this.drawText(nameText, x + margin, y, systemWidth - margin);
    this.resetTextColor();
    let text;
    if(this.paramMask(list.MaskMode)) {
      text = list.DetaEval ? eval(list.DetaEval) : enemy.exp();
    } else {
      text = UnknownStatus;
    }
    this.drawText(text, x + systemWidth + this.itemPadding(), y, width - (systemWidth + this.itemPadding()), list.namePosition);
};

Window_EnemyBook.prototype.enemyGold = function(list, enemy, x, y, width) {
    const de = this._enemy;
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    let margin = 0;
    if (list.Back) {
        this.drawContentsBackground(list, x, y, width);
        x = this.contensX(x);
        width = this.contensWidth(width);
    }
    if (list.IconId > 0) {
        this.drawIcon(list.IconId, x, y + list.IconY);
        margin = ImageManager.iconWidth + 4;
    }
    const nameText = list.paramName ? list.paramName : (this.language_Jp ? "獲得金額" : 'Gold Gain');
    const systemWidth = list.SystemItemWidth || 100;
    this.drawText(nameText, x + margin, y, systemWidth - margin);
    this.resetTextColor();
    let text;
    if(this.paramMask(list.MaskMode)) {
      text = list.DetaEval ? eval(list.DetaEval) : enemy.gold();
      this.drawCurrencyValue(text, this.currencyUnit(), x + systemWidth + this.itemPadding(), y, width - (systemWidth + this.itemPadding()));
    } else {
      text = UnknownStatus;
      this.drawText(text, x + systemWidth + this.itemPadding(), y, width - (systemWidth + this.itemPadding()), 'right');
    }
};

Window_EnemyBook.prototype.defeat = function(list, enemy, x, y, width) {
    const de = this._enemy;
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    let margin = 0;
    if (list.Back) {
        this.drawContentsBackground(list, x, y, width);
        x = this.contensX(x);
        width = this.contensWidth(width);
    }
    if (list.IconId > 0) {
        this.drawIcon(list.IconId, x, y + list.IconY);
        margin = ImageManager.iconWidth + 4;
    }
    const nameText = list.paramName ? list.paramName : (this.language_Jp ? "倒した数" : 'Eefeat Enemy');
    const systemWidth = list.SystemItemWidth || 100;
    this.drawText(nameText, x + margin, y, systemWidth - margin);
    this.resetTextColor();
    let text = null;
    if(this.paramMask(list.MaskMode)) {
        text = list.DetaEval ? eval(list.DetaEval) : $gameSystem.defeatNumber(enemy.enemyId());
        if (list.paramUnit) {
            text += String(list.paramUnit);
        }
    } else {
        text = UnknownStatus;
    }
    this.drawText(text, x + systemWidth + this.itemPadding(), y, width - (systemWidth + this.itemPadding()), list.namePosition);
};

Window_EnemyBook.prototype.enemyLevel = function(list, enemy, x, y, width) {
    
};

Window_EnemyBook.prototype.originalParams = function(list, enemy, x, y, width) {
    const de = this._enemy;
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    let margin = 0;
    if (list.Back) {
        this.drawContentsBackground(list, x, y, width);
        x = this.contensX(x);
        width = this.contensWidth(width);
    }
    if (list.IconId > 0) {
        this.drawIcon(list.IconId, x, y + list.IconY);
        margin = ImageManager.iconWidth + 4;
    }
    const nameText = list.paramName;
    const systemWidth = nameText ? (list.SystemItemWidth || 100) : margin;
    if (nameText) {
        this.drawText(nameText, x + margin, y, systemWidth - margin);
    }
    let text = null;
    if(this.paramMask(list.MaskMode)) {
        text = eval(list.DetaEval);
        if (list.paramUnit) {
            text += String(list.paramUnit);
        }
    } else {
        text = UnknownStatus;
    }
    this.resetTextColor();
    this.drawText(text, x + systemWidth + this.itemPadding(), y, width - (systemWidth + this.itemPadding()), list.namePosition);
};

Window_EnemyBook.prototype.bookEnemyNo = function(list, enemy, x, y, width) {
    if ($gameSystem.isEnemyBook(this._enemy)) {
        this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
        this.changeTextColor(NuunManager.getColorCode(list.NameColor));
        const nameText = list.paramName;
        const systemWidth = nameText ? (list.SystemItemWidth || 100) : 0;
        if (nameText) {
            this.drawText(nameText, x, y, systemWidth, list.namePosition);
        }
        this.resetTextColor();
        let text = 'No.'+ $gameSystem.getEnemyBookNumber(this._enemy.id);
        if (NumberType === 2) {
          text = this.numberWidthSlice(text);
        }
        this.drawText(text, x + systemWidth + this.itemPadding(), y, width - (systemWidth + this.itemPadding()), list.namePosition);
    }
};

Window_EnemyBook.prototype.turn = function(list, enemy, x, y, width) {

};

Window_EnemyBook.prototype.dropItems = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    let margin = 0;
    const dropList = this._enemy.dropItems;
    const lineHeight = this.lineHeight();
    let x2 = 0;
    let y2 = 0;
    let dropIndex = 0;
    width = Math.floor((width - this.colSpacing()) / DropItemMultiCols);
    const nameText = list.paramName;
    if (list.IconId > 0) {
        this.drawIcon(list.IconId, x, y + list.IconY);
        margin = ImageManager.iconWidth + 4;
    }
    if (nameText) {
        this.drawText(nameText, x + margin, y, width - margin);
        y += lineHeight;
    }
    this.resetTextColor();
    dropList.forEach((di, i) => {
        if(di.kind > 0){
            x2 = Math.floor(dropIndex % DropItemMultiCols) * (width + this.itemPadding()) + x;
            y2 = Math.floor(dropIndex / DropItemMultiCols) * lineHeight + y;
            let width2 = width;
            if (list.Back) {
                this.drawContentsBackground(list, x2, y2, width);
                x2 = this.contensX(x2);
                width2 = this.contensWidth(width);
            }
            const item = enemy.itemObject(di.kind, di.dataId);
            if((this.showDropItemMask(list.MaskMode, enemy) && this.dropItemFlag(i))) {
                if (DropItemProbabilityShow && !item.meta.NoDropProbability) {
                    let rate = di.denominator;
                    const text = DropRateEval ? eval(DropRateEval) : "1/" + rate;
                    let textWidth = this.textWidth(text);
                    this.drawItemName(item, x2, y2, width2 - (textWidth + this.itemPadding()));
                    this.drawEnemyBookNumber(text, x2, y2, width2);
                } else {
                    this.drawItemName(item, x2, y2, width2);
                }
            } else {
                this.resetTextColor();
                this.drawText(this.unknownDataLength(item.name), x2, y2, width2, 'left');
            }
            dropIndex++;
        }
    });
};

Window_EnemyBook.prototype.stealItems = function(list, enemy, x, y, width) {
    if (Imported.NUUN_StealableItems) {
        this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
        this.changeTextColor(NuunManager.getColorCode(list.NameColor));
        const stealList = enemy._stealItems;
        const lineHeight = this.lineHeight();
        let x2 = 0;
        let y2 = 0;
        let stealIndex = 0;
        width = Math.floor((width - this.colSpacing()) / StealItemCols);
        const nameText = list.paramName;
        if (nameText) {
            let margin = 0;
            if (list.IconId > 0) {
                this.drawIcon(list.IconId, x, y + list.IconY);
                margin = ImageManager.iconWidth + 4;
            }
            this.drawText(nameText, x + margin, y, width - margin);
            y += lineHeight;
        }
        this.resetTextColor();
        stealList.forEach((di, i) => {
            if(di.kind > 0 && kind < 4){
                x2 = Math.floor(stealIndex % StealItemCols) * (width + this.itemPadding()) + x;
                y2 = Math.floor(stealIndex / StealItemCols) * lineHeight + y;
                let width2 = width;
                if (list.Back) {
                    this.drawContentsBackground(list, x2, y2, width);
                    x2 = this.contensX(x2);
                    width2 = this.contensWidth(width);
                }
                const item = enemy.stealObject(di.kind, di.dataId);
                if((this.showStealItemMask(list.MaskMode, enemy) && this.stealItemFlag(i))) {
                    if (StealItemProbabilityShow) {
                        let rate = di.denominator;
                        const text = StealRateEval ? eval(StealRateEval) : rate;
                        let textWidth = this.textWidth(rate);
                        this.drawItemName(item, x2, y2, width2 - textWidth - this.itemPadding());
                        this.drawEnemyBookNumber(text, x2, y2, width2);
                      } else {
                        this.drawItemName(item, x2, y2, width2);
                      }
                } else {
                    this.resetTextColor();
                    this.drawText(this.unknownDataLength(item.name), x2, y2, width2, 'left');
                }
                stealIndex++;
            }
        });
    } else {
        this.drawText('盗みスキルプラグイン(NUUN_StealableItems)が導入されていません。', x, y, width, 'left');
    }
};

Window_EnemyBook.prototype.condDropItems = function(list, enemy, x, y, width) {
    if (Imported.NUUN_ConditionalDrops && Imported.NUUN_EnemyBookEX_2) {
        this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
        this.changeTextColor(NuunManager.getColorCode(list.NameColor));
        const dropList = enemy._conditionalDropItems;
        const lineHeight = this.lineHeight();
        let x2 = 0;
        let y2 = 0;
        let dropIndex = 0;
        width = Math.floor((width - this.colSpacing()) / CondDropItemCols);
        const nameText = list.paramName;
        if (nameText) {
            let margin = 0;
            if (list.IconId > 0) {
                this.drawIcon(list.IconId, x, y + list.IconY);
                margin = ImageManager.iconWidth + 4;
            }
            this.drawText(nameText, x + margin, y, width - margin);
            y += lineHeight;
        }
        this.resetTextColor();
        dropList.forEach((di, i) => {
            let width2 = width;
            if(di[1] > 0){
                x2 = Math.floor(dropIndex % CondDropItemCols) * (width + this.itemPadding()) + x;
                y2 = Math.floor(dropIndex / CondDropItemCols) * lineHeight + y;
                if (list.Back) {
                    this.drawContentsBackground(list, x2, y2, width);
                    x2 = this.contensX(x2);
                    width2 = this.contensWidth(width);
                }
            }
            const item = enemy.getCondDropItem(di);
            if((this.showDropItemMask(list.MaskMode, enemy) && this.condDropItemFlag(i))) {
                this.drawItemName(item, x2, y2, width2 - this.itemPadding());
            } else {
                this.resetTextColor();
                this.drawText(this.unknownDataLength(item.name), x2, y2, width2, 'left');
            }
            dropIndex++;
        });
    } else {
        this.drawText('条件付きドロップアイテムプラグイン(Imported.NUUN_ConditionalDrops)が導入されていません。', x, y, width, 'left');
    }
};

Window_EnemyBook.prototype.enemyAction = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const action = enemy.allSkillActions(this._enemy.actions);
    const lineHeight = this.lineHeight();
    let x2 = 0;
    let y2 = 0;
    width = Math.floor((width - this.colSpacing()) / ActionCols);
    const nameText = list.paramName;
    if (nameText) {
        let margin = 0;
        if (list.IconId > 0) {
            this.drawIcon(list.IconId, x, y + list.IconY);
            margin = ImageManager.iconWidth + 4;
        }
        this.drawText(nameText, x + margin, y, width - margin);
        y += lineHeight;
    }
    this.resetTextColor();
    const dateLenght = ActionMaxItems === 0 ? action.length : ActionMaxItems;
    for (let i = 0; i < dateLenght; i++) {
        x2 = Math.floor(i % ActionCols) * (width + this.itemPadding()) + x;
        y2 = Math.floor(i / ActionCols) * lineHeight + y;
        let width2 = width;
        if (list.Back) {
            this.drawContentsBackground(list, x2, y2, width);
            x2 = this.contensX(x2);
            width2 = this.contensWidth(width);
        }
        const skillDate = $dataSkills[action[i].skillId];
        if(this.showActionMask(list.MaskMode, enemy) && this.actionFlag(i)){
            this.drawItemName(skillDate, x2, y2, width2);
        } else {
            this.drawText(this.unknownDataLength(skillDate.name), x2, y2, width2);
        }
    }
};

Window_EnemyBook.prototype.attackElement = function(list, enemy, x, y, width) {
    const elements = enemy.attackElements();
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const lineHeight = this.lineHeight();
    const nameText = list.paramName || "攻撃時属性";
    if (nameText) {
        let margin = 0;
        if (list.IconId > 0) {
            this.drawIcon(list.IconId, x, y + list.IconY);
            margin = ImageManager.iconWidth + 4;
        }
        this.drawText(nameText, x + margin, y, width - margin);
    }
    const icons = [];
    for (const element of elements) {
        if (element > 0) {
            const e = ElementList.find(data => data.ElementNo === element);
            if (!this.paramMask(list.MaskMode)) {
                icons.push(ElementUnknownIconId);
            }else if (e.ElementIconId > 0) {
                icons.push(e.ElementIconId);
            } 
        }
    }
    const iconWidth = this.iconX(icons, width);
    let x2 = x + width - iconWidth * icons.length;
    icons.forEach(icon => {
        this.drawIcon(icon, x2, y);
        x2 += iconWidth;
    });
};

Window_EnemyBook.prototype.drawResistValueElement = function(list, enemy, x, y, width) {
    const de = this._enemy;
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const lineHeight = this.lineHeight();
    let x2 = 0;
    let y2 = 0;
    width = Math.floor((width - this.colSpacing()) / ElementCol);
    const nameText = list.paramName;
    if (nameText) {
        let margin = 0;
        if (list.IconId > 0) {
            this.drawIcon(list.IconId, x, y + list.IconY);
            margin = ImageManager.iconWidth + 4;
        }
        this.drawText(nameText, x + margin, y, width - margin);
        y += lineHeight;
    }
    this.resetTextColor();
    ElementList.forEach((element, i) => {
        x2 = Math.floor(i % ElementCol) * (width + this.itemPadding()) + x;
        y2 = Math.floor(i / ElementCol) * lineHeight + y;
        let width2 = width;
        if (list.Back) {
            this.drawContentsBackground(list, x2, y2, width);
            x2 = this.contensX(x2);
            width2 = this.contensWidth(width);
        }
        let textWidth = 0;
        if (element.ElementNo && element.ElementNo !== 0) {
            if (element.ElementIconId > 0 && ResistWeakElementMode >= 1) {
                const iconId = ElementUnknownIconId > 0 && this.onElementsFlag(element.ElementNo) ? ElementUnknownIconId : element.ElementIconId;
                this.drawIcon(iconId, x2, y2);
                textWidth += ImageManager.iconWidth + 4;
            }
            if (ResistWeakElementMode !== 1) {
                const systemWidth = nameText ? (list.SystemItemWidth || 60) : 0;
                this.changeTextColor(NuunManager.getColorCode(list.NameColor));
                const elementText = this.onElementsFlag(element.ElementNo) ? getElementTextName(element.ElementNo) : UnknownStatus;
                this.drawText(elementText, x2 + textWidth, y2, systemWidth);
                textWidth += systemWidth;
            }
            if (this.resistWeakDataMask(list.MaskMode)) {
                let rate = 1.0;
                if (element.ElementNo < 0) {
                    rate = (element.ElementNo === -1 ? enemy.sparam(6) : enemy.sparam(7)) * 100;
                } else if (element.ElementNo > 0) {
                    rate = enemy.elementRate(element.ElementNo) * 100;
                }
                rate = NuunManager.numPercentage(rate, list.Decimal || 0, DecimalMode);
                this.valueColor(rate);
                rate += list.paramUnit ? String(list.paramUnit) : " %";
                const rateText = list.DetaEval ? eval(list.DetaEval) : rate;
                this.drawText(rateText, x2 + textWidth + this.itemPadding(), y2, width2 - (textWidth + this.itemPadding()), "right");
            } else {
                this.resetTextColor();
                this.drawText(UnknownStatus, x2 + textWidth + this.itemPadding(), y2, width2 - (textWidth + this.itemPadding()), "right");
            }
        }
    });
};

Window_EnemyBook.prototype.drawResistValueState = function(list, enemy, x, y, width) {
    const de = this._enemy;
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const lineHeight = this.lineHeight();
    let x2 = 0;
    let y2 = 0;
    width = Math.floor((width - this.colSpacing()) / StateCol);
    const nameText = list.paramName;
    if (nameText) {
        let margin = 0;
        if (list.IconId > 0) {
            this.drawIcon(list.IconId, x, y + list.IconY);
            margin = ImageManager.iconWidth + 4;
        }
        this.drawText(nameText, x + margin, y, width - margin);
        y += lineHeight;
    }
    this.resetTextColor();
    StateList.forEach((state, i) => {
        x2 = Math.floor(i % StateCol) * (width + this.itemPadding()) + x;
        y2 = Math.floor(i / StateCol) * lineHeight + y;
        let width2 = width;
        if (list.Back) {
            this.drawContentsBackground(list, x2, y2, width);
            x2 = this.contensX(x2);
            width2 = this.contensWidth(width);
        }
        let textWidth = 0;
        if (state.StateId) {
            const stateId = state.StateId;
            if (stateId > 0) {
                if ($dataStates[stateId].iconIndex > 0 && ResistWeakStateMode >= 1) {
                    const iconId = StateUnknownIconId > 0 && this.onStateFlag(stateId) ? StateUnknownIconId : $dataStates[stateId].iconIndex;
                    this.drawIcon(iconId, x2, y2);
                    textWidth += ImageManager.iconWidth + 4;
                }
                if (ResistWeakStateMode !== 1) {
                    const systemWidth = nameText ? (list.SystemItemWidth || 60) : 0;
                    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
                    const stateText = this.onStateFlag(stateId) ? $dataStates[stateId].name : UnknownStatus;
                    this.drawText(stateText, x2 + textWidth, y2, systemWidth);
                    textWidth += systemWidth;
                }
                if (this.resistWeakDataMask(list.MaskMode)) {
                    let rate = (enemy.isStateResist(stateId) ? 0 : enemy.stateRate(stateId)) * 100;
                    rate = NuunManager.numPercentage(rate, list.Decimal || 0, DecimalMode);
                    this.valueColor(rate);
                    rate += list.paramUnit ? String(list.paramUnit) : " %";
                    const rateText = list.DetaEval ? eval(list.DetaEval) : rate;
                    this.drawText(rateText, x2 + textWidth + this.itemPadding(), y2, width2 - (textWidth + this.itemPadding()), "right");
                  } else {
                    this.resetTextColor();
                    this.drawText(UnknownStatus, x2 + textWidth + this.itemPadding(), y2, width2 - (textWidth + this.itemPadding()), "right");
                  }
            }
        }
    });
};

Window_EnemyBook.prototype.drawResistElement = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const lineHeight = this.lineHeight();
    const nameText = list.paramName ? list.paramName : (this.language_Jp ? "耐性属性" : 'Resist Element');
    let Unknown = false;
    if (nameText) {
        let margin = 0;
        if (list.IconId > 0) {
            this.drawIcon(list.IconId, x, y + list.IconY);
            margin = ImageManager.iconWidth + 4;
        }
        this.drawText(nameText, x + margin, y, width - margin);
        y += lineHeight;
    }
    if(!this.resistWeakDataMask(list.MaskMode)){
        if (ElementUnknownIconId === 0) {
          return;
        }
        Unknown = true;
    }
    const icons = [];
    ElementList.forEach(Element => {
        let rate = 1.0;
        let icon = 0;
        if(Element.ElementNo < 0) {
            rate = Element.ElementNo === -1 ? enemy.sparam(6) : enemy.sparam(7);
        } else if (Element.ElementNo > 0) {
            rate = enemy.elementRate(Element.ElementNo);
        }
        if (rate < 1) {
            if (ResistNoEffectElement) {
                if (AbsorptionNoEffectElement) {
                    icon = this.isMaskElement(Element, Unknown);
                } else if (!AbsorptionNoEffectElement && rate >= 0) {
                    icon = this.isMaskElement(Element, Unknown);
                }
            } else if (rate > 0) {
                icon = this.isMaskElement(Element, Unknown);
            }
            if (icon > 0) {
                icons.push(icon);
            }
        }
    });
    let x2 = this.iconX(icons, width);
    icons.forEach(icon => {
          this.drawIcon(icon, x, y);
          x += x2;
    });
};

Window_EnemyBook.prototype.drawWeakElement = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const lineHeight = this.lineHeight();
    const nameText = list.paramName ? list.paramName : (this.language_Jp ? "弱点属性" : 'Weak Element');
    let Unknown = false;
    if (nameText) {
        let margin = 0;
        if (list.IconId > 0) {
            this.drawIcon(list.IconId, x, y + list.IconY);
            margin = ImageManager.iconWidth + 4;
        }
        this.drawText(nameText, x + margin, y, width - margin);
        y += lineHeight;
    }
    if(!this.resistWeakDataMask(list.MaskMode)){
        if (ElementUnknownIconId === 0) {
          return;
        }
        Unknown = true;
    }
    const icons = [];
    ElementList.forEach(Element => {
        let rate = 1.0;
        let icon = 0;
        if (Element.ElementNo < 0) {
            rate = Element.ElementNo === -1 ? enemy.sparam(6) : enemy.sparam(7);
          } else if (Element.ElementNo > 0) {
            rate = enemy.elementRate(Element.ElementNo);
          }
          if (rate > 1) {
            icon = this.isMaskElement(Element, Unknown);
            if (icon > 0) {
                icons.push(icon);
            }
          }
    });
    let x2 = this.iconX(icons, width);
    icons.forEach(icon => {
          this.drawIcon(icon, x, y);
          x += x2;
    });
};

Window_EnemyBook.prototype.drawNoEffectElement = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const lineHeight = this.lineHeight();
    const nameText = list.paramName ? list.paramName : (this.language_Jp ? "無効属性" : 'Invalid Element');
    let Unknown = false;
    if (nameText) {
        let margin = 0;
        if (list.IconId > 0) {
            this.drawIcon(list.IconId, x, y + list.IconY);
            margin = ImageManager.iconWidth + 4;
        }
        this.drawText(nameText, x + margin, y, width - margin);
        y += lineHeight;
    }
    if(!this.resistWeakDataMask(list.MaskMode)){
        if (ElementUnknownIconId === 0) {
          return;
        }
        Unknown = true;
    }
    const icons = [];
    ElementList.forEach(Element => {
        let rate = 1.0;
        let icon = 0;
        if (Element.ElementNo < 0) {
            rate = Element.ElementNo === -1 ? enemy.sparam(6) : enemy.sparam(7);
        } else if (Element.ElementNo > 0) {
            rate = enemy.elementRate(Element.ElementNo);
        }
        if (rate <= 0) {
            if ((!AbsorptionNoEffectElement && rate === 0) || AbsorptionNoEffectElement) {
                icon = this.isMaskElement(Element, Unknown);
            }
            if (icon > 0) {
                icons.push(icon);
            }
        }
    });
    let x2 = this.iconX(icons, width);
    icons.forEach(icon => {
          this.drawIcon(icon, x, y);
          x += x2;
    });
};

Window_EnemyBook.prototype.drawAbsorpElement = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const lineHeight = this.lineHeight();
    const nameText = list.paramName ? list.paramName : (this.language_Jp ? "吸収属性" : 'Absorp Element');
    let Unknown = false;
    if (nameText) {
        let margin = 0;
        if (list.IconId > 0) {
            this.drawIcon(list.IconId, x, y + list.IconY);
            margin = ImageManager.iconWidth + 4;
        }
        this.drawText(nameText, x + margin, y, width - margin);
        y += lineHeight;
    }
    if(!this.resistWeakDataMask(list.MaskMode)){
        if (ElementUnknownIconId === 0) {
          return;
        }
        Unknown = true;
    }
    const icons = [];
    ElementList.forEach(Element => {
        let rate = 1.0;
        let icon = 0;
        if (Element.ElementNo < 0) {
            rate = Element.ElementNo === -1 ? enemy.sparam(6) : enemy.sparam(7);
        } else if (Element.ElementNo > 0) {
            rate = enemy.elementRate(Element.ElementNo);
        }
        if (rate < 0) {
            icon = this.isMaskElement(Element, Unknown);
            if (icon > 0) {
                icons.push(icon);
            }
        }
    });
    let x2 = this.iconX(icons, width);
    icons.forEach(icon => {
          this.drawIcon(icon, x, y);
          x += x2;
    });
};

Window_EnemyBook.prototype.drawResistStates = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const lineHeight = this.lineHeight();
    const nameText = list.paramName ? list.paramName : (this.language_Jp ? "耐性ステート" : 'Resist State');
    let Unknown = false;
    if (nameText) {
        let margin = 0;
        if (list.IconId > 0) {
            this.drawIcon(list.IconId, x, y + list.IconY);
            margin = ImageManager.iconWidth + 4;
        }
        this.drawText(nameText, x + margin, y, width - margin);
        y += lineHeight;
    }
    if(!this.resistWeakDataMask(list.MaskMode)){
        if (StateUnknownIconId === 0) {
          return;
        }
        Unknown = true;
    }
    let icons = [];
    StateList.forEach(state => {
        let rate = 1.0;
        let icon = 0;
        if(state.StateId > 0){
            let stateId = state.StateId;
            let rate = enemy.stateRate(stateId);
            if (ResistNoEffectState) {
              rate *= enemy.isStateResist(stateId) ? 0 : 1;
            }
            if (rate < 1 && (ResistNoEffectState || (!ResistNoEffectState && rate > 0))) {
              if (Unknown || (StateUnknownIconId > 0 && !this.onStateFlag(stateId))) {
                icon = StateUnknownIconId;
              } else {
                icon = this.onStateFlag(stateId) ? $dataStates[stateId].iconIndex : 0;
              }
              if (icon && icon > 0) icons.push(icon);
            }
        }
    });
    if (ResistDebuffInState) {
        DeBuffList.forEach(buff => {
            let icon = 0;
            let rate = enemy.debuffRate(buff.ParamId);
            if (rate < 1 && (ResistNoEffectState || (!ResistNoEffectState && rate > 0))) {
                if (Unknown || (DeBuffUnknownIconId > 0 && !this.onDebuffFlag(buff.ParamId))) {
                    icon = DeBuffUnknownIconId;
                } else {
                    icon = this.onDebuffFlag(buff.ParamId) ? buff.DebuffIconId : 0;
                }
                if (icon && icon > 0) icons.push(icon);
            }
        });
    }
    let x2 = this.iconX(icons, width);
    icons.forEach(icon => {
          this.drawIcon(icon, x, y);
          x += x2;
    });
};

Window_EnemyBook.prototype.drawWeakStates = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const lineHeight = this.lineHeight();
    const nameText = list.paramName ? list.paramName : (this.language_Jp ? "弱点ステート" : 'Weak State');
    let Unknown = false;
    if (nameText) {
        let margin = 0;
        if (list.IconId > 0) {
            this.drawIcon(list.IconId, x, y + list.IconY);
            margin = ImageManager.iconWidth + 4;
        }
        this.drawText(nameText, x + margin, y, width - margin);
        y += lineHeight;
    }
    if(!this.resistWeakDataMask(list.MaskMode)){
        if (StateUnknownIconId === 0) {
          return;
        }
        Unknown = true;
    }
    let icons = [];
    StateList.forEach(state => {
        let rate = 1.0;
        let icon = 0;
        if(state.StateId > 0) {
            let stateId = state.StateId;
            let rate = enemy.stateRate(stateId);
            if (((!NormalWeakState && rate > 1) || (NormalWeakState && rate >= 1)) && !enemy.isStateResist(stateId)) {
                if (Unknown || (StateUnknownIconId > 0 && !this.onStateFlag(stateId))) {
                    icon = StateUnknownIconId;
                } else {
                    icon = this.onStateFlag(stateId) ? $dataStates[stateId].iconIndex : 0;
                }
                if (icon && icon > 0) icons.push(icon);
            }
        }
    });
    if (ResistDebuffInState) {
        DeBuffList.forEach(buff => {
            let icon = 0;
            let rate = enemy.debuffRate(buff.ParamId);
            if ((!NormalWeakState && rate > 1) || (NormalWeakState && rate >= 1)) {
                if (Unknown || (DeBuffUnknownIconId > 0 && !this.onDebuffFlag(buff.ParamId))) {
                    icon = DeBuffUnknownIconId;
                } else {
                    icon = this.onDebuffFlag(buff.ParamId) ? buff.DebuffIconId : 0;
                }
                if (icon && icon > 0) icons.push(icon);
            }
        });
    }
    let x2 = this.iconX(icons, width);
    icons.forEach(icon => {
          this.drawIcon(icon, x, y);
          x += x2;
    });
};

Window_EnemyBook.prototype.drawNoEffectStates = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const lineHeight = this.lineHeight();
    const nameText = list.paramName ? list.paramName : (this.language_Jp ? "無効ステート" : 'Invalid State');
    let Unknown = false;
    if (nameText) {
        let margin = 0;
        if (list.IconId > 0) {
            this.drawIcon(list.IconId, x, y + list.IconY);
            margin = ImageManager.iconWidth + 4;
        }
        this.drawText(nameText, x + margin, y, width - margin);
        y += lineHeight;
    }
    if(!this.resistWeakDataMask(list.MaskMode)){
        if (StateUnknownIconId === 0) {
          return;
        }
        Unknown = true;
    }
    let icons = [];
    StateList.forEach(state => {
        let rate = 1.0;
        let icon = 0;
        if(state.StateId){
            let stateId = state.StateId;
            let rate = enemy.stateRate(stateId);
            if (rate <= 0 || enemy.isStateResist(stateId)) {
                if (Unknown || (StateUnknownIconId > 0 && !this.onStateFlag(stateId))) {
                    icon = StateUnknownIconId;
                } else {
                    icon = this.onStateFlag(stateId) ? $dataStates[stateId].iconIndex : 0;
                }
                if (icon && icon > 0) icons.push(icon);
            }
        }
    });
    if (ResistDebuffInState) {
        DeBuffList.forEach(buff => {
            let icon = 0;
            let rate = enemy.debuffRate(buff.ParamId);
            if (rate <= 0) {
                if (Unknown || (DeBuffUnknownIconId > 0 && !this.onDebuffFlag(buff.ParamId))) {
                    icon = DeBuffUnknownIconId;
                } else {
                    icon = this.onDebuffFlag(buff.ParamId) ? buff.DebuffIconId : 0;
                }
                if (icon && icon > 0) icons.push(icon);
            }
        });
    }
    let x2 = this.iconX(icons, width);
    icons.forEach(icon => {
          this.drawIcon(icon, x, y);
          x += x2;
    });
};

Window_EnemyBook.prototype.drawWeakDebuff = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const lineHeight = this.lineHeight();
    const nameText = list.paramName ? list.paramName : (this.language_Jp ? "弱点デバフ" : 'Weak Debuff');
    let Unknown = false;
    if (nameText) {
        let margin = 0;
        if (list.IconId > 0) {
            this.drawIcon(list.IconId, x, y + list.IconY);
            margin = ImageManager.iconWidth + 4;
        }
        this.drawText(nameText, x + margin, y, width - margin);
        y += lineHeight;
    }
    if(!this.resistWeakDataMask(list.MaskMode)){
        if (DeBuffUnknownIconId === 0) {
          return;
        }
        Unknown = true;
    }
    let icons = [];
    DeBuffList.forEach(buff => {
        let icon = 0;
        let rate = enemy.debuffRate(buff.ParamId);
        if ((!NormalWeakDebuff && rate > 1) || (NormalWeakDebuff && rate >= 1)) {
            if (Unknown || (DeBuffUnknownIconId > 0 && !this.onDebuffFlag(buff.ParamId))) {
                icon = DeBuffUnknownIconId;
            } else {
                icon = this.onDebuffFlag(buff.ParamId) ? buff.DebuffIconId : 0;
            }
            if (icon && icon > 0) icons.push(icon);
        }
    });
    let x2 = this.iconX(icons, width);
    icons.forEach(icon => {
          this.drawIcon(icon, x, y);
          x += x2;
    });
};

Window_EnemyBook.prototype.drawResistDebuff = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const lineHeight = this.lineHeight();
    const nameText = list.paramName ? list.paramName : (this.language_Jp ? "耐性デバフ" : 'Resist Debuff');
    let Unknown = false;
    if (nameText) {
        let margin = 0;
        if (list.IconId > 0) {
            this.drawIcon(list.IconId, x, y + list.IconY);
            margin = ImageManager.iconWidth + 4;
        }
        this.drawText(nameText, x + margin, y, width - margin);
        y += lineHeight;
    }
    if(!this.resistWeakDataMask(list.MaskMode)){
        if (DeBuffUnknownIconId === 0) {
          return;
        }
        Unknown = true;
    }
    let icons = [];
    DeBuffList.forEach(buff => {
        let icon = 0;
        let rate = enemy.debuffRate(buff.ParamId);
        if (rate < 1 && (ResistNoEffectDebuff || (!ResistNoEffectDebuff && rate > 0))) {
            if (Unknown || (DeBuffUnknownIconId > 0 && !this.onDebuffFlag(buff.ParamId))) {
                icon = DeBuffUnknownIconId;
            } else {
                icon = this.onDebuffFlag(buff.ParamId) ? buff.DebuffIconId : 0;
            }
            if (icon && icon > 0) icons.push(icon);
        }
    });
    let x2 = this.iconX(icons, width);
    icons.forEach(icon => {
          this.drawIcon(icon, x, y);
          x += x2;
    });
};

Window_EnemyBook.prototype.drawNoEffectDebuff = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const lineHeight = this.lineHeight();
    const nameText = list.paramName ? list.paramName : (this.language_Jp ? "無効デバフ" : 'NoEffect Debuff');
    let Unknown = false;
    if (nameText) {
        let margin = 0;
        if (list.IconId > 0) {
            this.drawIcon(list.IconId, x, y + list.IconY);
            margin = ImageManager.iconWidth + 4;
        }
        this.drawText(nameText, x + margin, y, width - margin);
        y += lineHeight;
    }
    if(!this.resistWeakDataMask(list.MaskMode)){
        if (DeBuffUnknownIconId === 0) {
          return;
        }
        Unknown = true;
    }
    let icons = [];
    DeBuffList.forEach(buff => {
        let icon = 0;
        let rate = enemy.debuffRate(buff.ParamId);
        if (rate <= 0) {
            if (Unknown || (DeBuffUnknownIconId > 0 && !this.onDebuffFlag(buff.ParamId))) {
                icon = DeBuffUnknownIconId;
            } else {
                icon = this.onDebuffFlag(buff.ParamId) ? buff.DebuffIconId : 0;
            }
            if (icon && icon > 0) icons.push(icon);
        }
    });
    let x2 = this.iconX(icons, width);
    icons.forEach(icon => {
          this.drawIcon(icon, x, y);
          x += x2;
    });
};

Window_EnemyBook.prototype.drawDesc = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const lineHeight = this.lineHeight();
    const nameText = list.paramName;
    if (nameText) {
        let margin = 0;
        if (list.IconId > 0) {
            this.drawIcon(list.IconId, x, y + list.IconY);
            margin = ImageManager.iconWidth + 4;
        }
        this.drawText(nameText, x + margin, y, width - margin);
        y += lineHeight;
    }
    this.resetTextColor();
    if(this.paramMask(list.MaskMode)){
        let text = list.DetaEval ? list.DetaEval : undefined;
        if (!text) {
            const method = list.textMethod;
            if (method) {
                text = this._categoryMode ? this._categoryData[method] : enemy.enemy().meta[method];
            }
        } else {
            text = eval(text);
        }
        if(text){
            this.drawTextEx(text, x, y, width);
        }
    }
};

Window_EnemyBook.prototype.drawCommonDesc = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const lineHeight = this.lineHeight();
    const nameText = list.paramName;
    if (nameText) {
        let margin = 0;
        if (list.IconId > 0) {
            this.drawIcon(list.IconId, x, y + list.IconY);
            margin = ImageManager.iconWidth + 4;
        }
        this.drawText(nameText, x + margin, y, width - margin);
        y += lineHeight;
    }
    this.resetTextColor();
    if(this.paramMask(list.MaskMode)){
        this.drawTextEx(list.CommonText, x, y, width);
    }
};

Window_EnemyBook.prototype.enemyCharacter = function(list, enemy, x, y, width) {
    this.enemyCharacterChip(enemy, x, y);
};

Window_EnemyBook.prototype.enemyElementChart = function(list, enemy, x, y, width) {
    if (!Imported.NUUN_RadarChartBase) {
      return;
    }
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const nameText = list.paramName ? list.paramName : (this.language_Jp ? "耐性属性" : 'Resist Element');
    let margin = 0;
    if (list.IconId > 0) {
        this.drawIcon(list.IconId, x, y + list.IconY);
        margin = ImageManager.iconWidth + 4;
    }
    this.drawText(nameText, x + margin, y, width - margin);
    const lineHeight = this.lineHeight();
    this.enemyElementRadarChart(this.setEnemyElementChart(enemy), enemy, x, y + lineHeight ,'element');
};

Window_EnemyBook.prototype.enemyStateChart = function(list, enemy, x, y, width) {
    if (!Imported.NUUN_RadarChartBase) {
      return;
    }
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    const nameText = list.paramName ? list.paramName : (this.language_Jp ? "耐性ステート" : 'Resist State');
    let margin = 0;
    if (list.IconId > 0) {
        this.drawIcon(list.IconId, x, y + list.IconY);
        margin = ImageManager.iconWidth + 4;
    }
    this.drawText(nameText, x + margin, y, width - margin);
    const lineHeight = this.lineHeight();
    this.enemyStateRadarChart(this.setEnemyStateChart(enemy), enemy, x, y + lineHeight ,'state');
};

Window_EnemyBook.prototype.setEnemyElementChart = function(enemy) {
    const data = [];
    for (const element of ElementList) {
      let rate = enemy.elementRate(element.ElementNo);
      const elementName = $dataSystem.elements[element.ElementNo];
      const elementIconId = element.ElementIconId || 0;
      data.push(this.setRadarChart(elementName, rate, elementIconId));
    }
    return data;
};

Window_EnemyBook.prototype.setEnemyStateChart = function(enemy) {
    const data = [];
    for (const state of StateList) {
      let stateId = state.StateId;
      let rate = enemy.stateRate(stateId);
      rate *= enemy.isStateResist(stateId) ? 0 : 1;
      const stateName = $dataStates[stateId].name;
      const iconId = RadarChartIcon ? $dataStates[stateId].iconIndex : 0;
      data.push(this.setRadarChart(stateName, rate, iconId));
    }
    return data;
};

Window_EnemyBook.prototype.enemyElementRadarChart = function(list, enemy, x, y, type) { 
    const key = "enemyRadarChart_%1".format(type);
    const sprite = this.createInnerSprite(key, Sprite_NUUN_RadarChart);
    sprite.setupColor(ElementRadarChartFramecolor, ElementRadarChartLineColor, ElementRadarChartMainColor1, ElementRadarChartMainColor2);
    sprite.setup(enemy, type, list, ElementRadarChartRadius, ElementRadarChartX, ElementRadarChartY, ElementRadarChart_FontSize);
    sprite.move(x, y);
    sprite.show();
};

Window_EnemyBook.prototype.enemyStateRadarChart = function(list, enemy, x, y, type) { 
    const key = "enemyRadarChart_%1".format(type);
    const sprite = this.createInnerSprite(key, Sprite_NUUN_RadarChart);
    sprite.setupColor(StateRadarChartFramecolor, StateRadarChartLineColor, StateRadarChartMainColor1, StateRadarChartMainColor2);
    sprite.setup(enemy, type, list, StateRadarChartRadius, StateRadarChartX, StateRadarChartY, StateRadarChart_FontSize);
    sprite.move(x, y);
    sprite.show();
};

Window_EnemyBook.prototype.commonEnemyBitmap = function(list, enemy, x, y, width) {
    if (!list.ImgData) {
        return;
    }
    const bitmap = ImageManager.nuun_LoadPictures(list.ImgData);
    bitmap.addLoadListener(function() {
        this.drawImg(bitmap, list, x, y, width);
    }.bind(this));
};

Window_EnemyBook.prototype.enemyBitmap = function(list, enemy, x, y, width) {
    const meta = this._categoryMode ? this._categoryData[list.textMethod] : this._enemy.meta[list.textMethod];
    const dataImg = meta ? meta.split(',') : null;
    if (dataImg) {
        const bitmap = ImageManager.loadBitmap("img/"+ ImgFolder +"/", dataImg[0]);
        x += Number(dataImg[1]) || 0;
        y += Number(dataImg[2]) || 0;
        bitmap.addLoadListener(function() {
            this.drawImg(bitmap, list, x, y, width);
        }.bind(this));
    }
};

Window_EnemyBook.prototype.drawImg = function(bitmap, list, x, y, width) {
    const height = list.ImgMaxHeight * this.lineHeight();
    const scalex = Math.min(1.0, width / bitmap.width);
    const scaley = Math.min(1.0, height / bitmap.height);
    const scale = scalex > scaley ? scaley : scalex;
    const dw = Math.floor(bitmap.width * scale);
    const dh = Math.floor(bitmap.height * scale);
    x += Math.floor(width / 2 - dw / 2);
    this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, dw, dh);
};

Window_EnemyBook.prototype.drawContentsBackground = function(list, x, y, width) {
    if (list.back) {
        const rect = this.contentsRect(x, y, width);
        if(list.BackContentsImg) {
            const bitmap = ImageManager.nuun_LoadPictures(list.BackContentsImg);
            bitmap.addLoadListener(function() {
                this.drawContentsBackgroundImg(bitmap, rect);
            }.bind(this));
        } else {
            this.drawContentsBackgroundRect(rect);
        }
    }
};

Window_EnemyBook.prototype.drawContentsBackgroundImg = function(bitmap, rect) {
    const width = Math.min(bitmap.width, rect.width);
    const height = Math.min(bitmap.height, rect.height);
    this.contentsBack.blt(bitmap, 0, 0, bitmap.width, bitmap.height, rect.x + 1, rect.y + 1, width, height);
};

Window_EnemyBook.prototype.drawContentsBackgroundRect = function(rect) {
    const c1 = ColorManager.itemBackColor1();
    const c2 = ColorManager.itemBackColor2();
    const x = rect.x;
    const y = rect.y;
    const w = rect.width;
    const h = rect.height;
    this.contents.gradientFillRect(x, y, w, h, c1, c2, true);
    this.contents.strokeRect(x, y, w, h, c1);
};
  
Window_EnemyBook.prototype.drawContentsBackgroundRect = function(rect) {
    const c1 = ColorManager.itemBackColor1();
    const c2 = ColorManager.itemBackColor2();
    const x = rect.x;
    const y = rect.y;
    const w = rect.width;
    const h = rect.height;
    this.contents.gradientFillRect(x, y, w, h, c1, c2, true);
    this.contents.strokeRect(x, y, w, h, c1);
};

Window_EnemyBook.prototype.contentsRect = function(x, y, width) {
    const fontSize = $gameSystem.mainFontSize() - this.contents.fontSize;
    const height = this.lineHeight() - fontSize - this.rowSpacing();
    return new Rectangle(x, y + 2 + Math.floor(fontSize / 2), width, height);
};

Window_EnemyBook.prototype.contensX = function(x) {
    return x + (this.itemPadding() / 2);
};

Window_EnemyBook.prototype.contensWidth = function(width) {
    return width - this.itemPadding();
};

Window_EnemyBook.prototype.currencyUnit = function() {
    return TextManager.currencyUnit;
};

Window_EnemyBook.prototype.numberWidthSlice = function(indexText) {
    return ($gameSystem._enemyBookLength >= 1000 ? ('0000' + indexText).slice(-4) : ('000' + indexText).slice(-3));
};

Window_EnemyBook.prototype.drawEnemyBookNumber = function(text, x, y, width) {
    this.drawText(text , x, y, width,'right');
};

Window_EnemyBook.prototype.buffIconIndex = function(rate, paramId) {
	if (rate > 1) {
        return Game_BattlerBase.ICON_BUFF_START + (buffLevel - 1) * 8 + paramId;
    }
};

Window_EnemyBook.prototype.valueColor = function(value) {
    if (value > 100) {
        this.changeTextColor(ColorManager.powerDownColor())
    } else if (value < 100) {
        this.changeTextColor(ColorManager.powerUpColor())
    } else {
        this.resetTextColor();
    }
};

Window_EnemyBook.prototype.isMaskElement = function(Element, Unknown) {
    let icon = 0;
    if (Unknown || (ElementUnknownIconId > 0 && !this.onElementsFlag(Element.ElementNo))) {
        icon = ElementUnknownIconId;
    } else {
        icon = this.onElementsFlag(Element.ElementNo) ? Element.ElementIconId : 0;
    }
    if (icon && icon > 0) {
        return icon;
    }
    return 0;
};

Window_EnemyBook.prototype.iconX = function(icons, width) {
	if (ImageManager.iconWidth * icons.length > width) {
		return Math.floor(width / icons.length);
	}
	return ImageManager.iconWidth;
};

Window_EnemyBook.prototype.enemyCharacterChip = function(enemy, x, y) { 
    const key = "enemyBook_character";
    const sprite = this.createInnerSprite(key, Sprite_EnemyBookCharacter);
    sprite.setup(enemy);
    sprite._character.setPosition(x + 24, y + this.lineHeight());
    sprite.updatePosition();
    sprite.show();
};

Window_EnemyBook.prototype.setBuffColor = function(list, enemy) {

};

Window_EnemyBook.prototype.nameLength = function(name) {
	return name.length;
};

Window_EnemyBook.prototype.unknownDataLength = function(name) {
    if(UnknownItems === '？' || UnknownItems === '?') {
        const name_length = this.nameLength(name);
        return UnknownItems.repeat(name_length);
    } else {
        return UnknownItems;
    }
};

function Window_BattleEnemyBook() {
    this.initialize(...arguments);
}
  
Window_BattleEnemyBook.prototype = Object.create(Window_EnemyBook.prototype);
Window_BattleEnemyBook.prototype.constructor = Window_BattleEnemyBook;
  
Window_BattleEnemyBook.prototype.initialize = function(rect) {
    Window_EnemyBook.prototype.initialize.call(this, rect);
    this._mode = 'book'
    this.selectEnemy = null;
    this._contentsData = null;
};

Window_BattleEnemyBook.prototype.setMode = function(mode, data) {
    this._mode = mode;
    this._contentsData = data || null;
};

Window_BattleEnemyBook.prototype.setPage = function(index) {
    this._page = index;
    this._displayList = index >= 0 ? this.getEnemyStatusList()[index] : null;
    this.refresh();
};

Window_BattleEnemyBook.prototype.maxCols = function() {
    switch (this._mode) {
        case 'book':
            return ContentCols;
        case 'info':
            return InfoContentCols;
        case 'analyze':
            return this._contentsData ? this._contentsData.ContentCols : ContentCols;
    }
};

Window_BattleEnemyBook.prototype.getEnemyStatusList = function() {
    switch (this._mode) {
        case 'book':
            return PageSetting;
        case 'info':
            return InfoPageSetting;
        case 'analyze':
            const id = this._contentsData ? this._contentsData.ListNumber : -1;
            return id > 0 && AnalyzeListData[id - 1] ? AnalyzeListData[id - 1].AnalyzePageList : PageSetting;
    }
};

Window_BattleEnemyBook.prototype.statusMode = function() {
    switch (this._mode) {
        case 'book':
            return false;
        case 'info':
            return InfoEnemyCurrentStatus;
        case 'analyze':
            return this._contentsData ? this._contentsData.EnemyCurrentStatus : false;
    }
};

Window_BattleEnemyBook.prototype.statusGaugeMode = function() {
    switch (this._mode) {
        case 'book':
            return false;
        case 'info':
            return InfoStatusGaugeVisible;
        case 'analyze':
            return this._contentsData ? this._contentsData.StatusGaugeVisible : false;
    }
};

Window_BattleEnemyBook.prototype.isEnemyData = function() {
    if (!this._enemy) {
        return;
    }
    switch (this._mode) {
        case 'book':
            return $gameSystem.isEnemyBook(this._enemy) && (UnregisteredEnemy === 0 && $gameSystem.isInEnemyBook(this._enemy) || UnregisteredEnemy > 0);
        case 'info':
            return (UnregisteredEnemy === 0 && $gameSystem.isInEnemyBook(this._enemy) || UnregisteredEnemy > 0);
        case 'analyze':
            return $gameSystem.isEnemyBookData(this._enemy);
    }
};

Window_BattleEnemyBook.prototype.noUnknownStatus = function(enemy) {
    if (!this._enemy) {
        return;
    }
    switch (this._mode) {
        case 'book':
            return this._enemy.meta.ShowDataBook;
        case 'info':
            return this._enemy.meta.ShowDataBook || !InfoMaskMode || this._enemy.meta[NoBookDataTag];
        case 'analyze':
            return this._enemy.meta.ShowDataBook;
    }
};

Window_BattleEnemyBook.prototype.setBuffColor = function(list, enemy) {
    if (this.statusMode()) {
        if (list.DateSelect === 1 && enemy.isDying()) {
            this.changeTextColor(this.crisisColor());
        } else if (list.DateSelect > 2 && list.DateSelect !== 9) {
            this.changeTextColor(this.buffColor(this.paramShow(list, enemy), this.normalParam(list, enemy)));
        }
    }
};

Window_BattleEnemyBook.prototype.getEnemyData = function() {
    if (this.statusMode()) {
        return this.selectEnemy;
    } else {
        return Window_EnemyBook.prototype.getEnemyData.call(this);
    }
};

Window_BattleEnemyBook.prototype.enemyGauge = function(list, enemy, x, y, width) {
    if (!this.statusMode() || !this.statusGaugeMode()) {
        this.enemyParams(list, enemy, x, y, width);
        return;
    }
    switch (list.DateSelect) {
        case 1:
            $gameTemp.bookGaugeType = "hp";
            this.placeGauge(enemy, "hp", x, y);
            break;
        case 2:
            $gameTemp.bookGaugeType = "mp";
            this.placeGauge(enemy, "mp", x, y);
            break;
        case 9:
            $gameTemp.bookGaugeType = "tp";
            this.placeGauge(enemy, "tp", x, y);
            break;
    }
};

Window_BattleEnemyBook.prototype.turn = function(list, enemy, x, y, width) {
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    if (BattleManager.isTpb() && this.statusMode()) {
        let margin = 0;
        if (list.Back) {
            this.drawContentsBackground(list, x, y, width);
            x = this.contensX(x);
            width = this.contensWidth(width);
        }
        if (list.IconId > 0) {
            this.drawIcon(list.IconId, x, y + list.IconY);
            margin = ImageManager.iconWidth + 4;
        }
        const nameText = list.paramName ? list.paramName : (this.language_Jp ? "ターン" : 'Turn');
        const systemWidth = nameText ? (list.SystemItemWidth || 100) : 0;
        this.drawText(nameText, x + margin, y, systemWidth - margin);
        this.resetTextColor();
        let text;
        if(this.paramMask(list.MaskMode)){
            text = list.DetaEval ? eval(list.DetaEval) : Math.max(enemy.turnCount(), 1);
        } else {
            text = UnknownStatus;
        }
        this.drawText(text, x + systemWidth + this.itemPadding(), y, width - (systemWidth + this.itemPadding()), list.namePosition);
    }
};

Window_BattleEnemyBook.prototype.enemyLevel = function(list, enemy, x, y, width) {
    const de = this._enemy;
    this.contents.fontSize = $gameSystem.mainFontSize() + list.FontSize + EnemyBookDefaultFontSize;
    this.changeTextColor(NuunManager.getColorCode(list.NameColor));
    let margin = 0;
    if (list.Back) {
        this.drawContentsBackground(list, x, y, width);
        x = this.contensX(x);
        width = this.contensWidth(width);
    }
    if (list.IconId > 0) {
        this.drawIcon(list.IconId, x, y + list.IconY);
        margin = ImageManager.iconWidth + 4;
    }
    const nameText = list.paramName ? list.paramName : (this.language_Jp ? "レベル" : 'Level');
    const systemWidth = list.SystemItemWidth || 100;
    this.drawText(nameText, x + margin, y, systemWidth - margin);
    this.resetTextColor();
    const text = list.DetaEval ? eval(list.DetaEval) : enemy._level;
    this.drawText(text, x + systemWidth + this.itemPadding(), y, width - (systemWidth + this.itemPadding()), list.namePosition);
};

Window_BattleEnemyBook.prototype.placeGauge = function(enemy, type, x, y, width) {
    const key = "enemyBook-gauge-%1".format(type);
    const sprite = this.createInnerSprite(key, Sprite_EnemyBookGauge);
    sprite.setup(enemy, type);
    sprite.move(x, y);
    sprite.show();
};

Window_EnemyBook.prototype.buffColor = function(params, nparams) {
    const _buffColor = this._mode === 'info' ? BuffColor : (this._contentsData ? this._contentsData.BuffColor : BuffColor);
    const _debuffColor = this._mode === 'info' ? DebuffColor : (this._contentsData ? this._contentsData.DebuffColor : DebuffColor);
    if (params > nparams) {
        return NuunManager.getColorCode(_buffColor)
    } else if (params < nparams) {
        return NuunManager.getColorCode(_debuffColor)
    } else {
        return ColorManager.normalColor();
    }
};

Window_EnemyBook.prototype.crisisColor = function() {
    return ColorManager.crisisColor();
};


const _Window_PartyCommand_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
Window_PartyCommand.prototype.makeCommandList = function() {
  _Window_PartyCommand_makeCommandList.call(this);
  if (this.isEnemyBook()) {
    this.addCommand(CommandName, "enemyBook", eval(CondBattleCommandEnemyBook));
  }
  if (this.isEnemyInfo()) {
    this.addCommand(EnemyInfoCommandName, "enemyBookInfo", eval(CondEnemyBookInfo));
  }
};

Window_Command.prototype.isEnemyBook = function() {
    return ShowBattleCommand && ($gameSwitches.value(enemyBookBattleSwitch) || enemyBookBattleSwitch === 0);
};
  
Window_Command.prototype.isEnemyInfo = function() {
    return ShowEnemyInfoCommand && ($gameSwitches.value(enemyBookInfoSwitch) || enemyBookInfoSwitch === 0);
};


const _Window_BattleLog_displayMiss =Window_BattleLog.prototype.displayMiss;
Window_BattleLog.prototype.displayMiss = function(target) {
    if (target.result().analyzeSkill) {
        const fmt = BattleManager.analyzeMissMessage;
        this.push("pushBaseLine");
        this.push("addText", fmt);
    } else {
    _Window_BattleLog_displayMiss.call(this, target);
    }
};


function Sprite_BookEnemy() {
    this.initialize(...arguments);
}
  
Sprite_BookEnemy.prototype = Object.create(Sprite.prototype);
Sprite_BookEnemy.prototype.constructor = Sprite_BookEnemy;
  
Sprite_BookEnemy.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.initMembers();
};

Sprite_BookEnemy.prototype.initMembers = function() {
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this._battler = null;
    this._svEnemy = false;
    this.maxWidth = 0;
    this._apngMode = null;
    this._maskMode = false;
};

Sprite_BookEnemy.prototype.setup = function(battler,x, y, mask) {
    this._battler = battler;
    this.x = x;
    this.y = y;
    this._svEnemy = this.getSvBattler(battler);
    this._maskMode = mask;
    this.refresh();
};

Sprite_BookEnemy.prototype.getSvBattler = function(battler) {
    if (battler.enemy().meta.EB_SVBattler) {
        return "EB_SVBattler";
    } else if (battler._svBattlerData && !!battler._svBattlerData.name) {
        return "_svBattlerData";
    }
    return null;
};

Sprite_BookEnemy.prototype.resetEnemy = function() {
    this._battler = null;
    if (this._apngMode) {
        this.destroyApngIfNeed();
        this._apngMode = null;
    }
};

Sprite_BookEnemy.prototype.refresh = function() {
    let bitmap = null;
    if (this._svEnemy) {
        const sv_name = this.enemySVBattlerName();
        bitmap = ImageManager.loadSvActor(sv_name);
        this.bitmap = bitmap;
    } else {
        const name = this.enemyBattlerName();
        const enemy = this._battler.enemy();
        if (enemy.meta.EnemyBookFVEnemy) {
            bitmap = ImageManager.loadEnemy(name);
        } else if (enemy.meta.EnemyBookSVEnemy) {
            bitmap = ImageManager.loadSvEnemy(name); 
        } else if (EnemyGraphicMode === 2 || EnemyGraphicMode === 0 && $gameSystem.isSideView()) {
            bitmap = ImageManager.loadSvEnemy(name);
        } else if (EnemyGraphicMode === 1 || EnemyGraphicMode === 0) {
            bitmap = ImageManager.loadEnemy(name);
        }
        if (this.addApngChild && this.loadApngSprite(name)) {
            this.addApngChild(name);
            this._apngMode = true;
        } else {
            this.bitmap = bitmap;
        }
    }
    if (bitmap && !bitmap.isReady()) {
        bitmap.addLoadListener(this.drawEnemy.bind(this));
    } else {
        this.drawEnemy();
    }
};

Sprite_BookEnemy.prototype.drawEnemy = function() {
    if (!this.bitmap) {
        return;
    }
    if (this._svEnemy) {
        this._pattern = 0;
        this._motionCount = 0;
        this.scale.x = SVEnemyMirror ? -1 : 1;
        this.scale.y = 1;
        this.setSvActor();
    } else {
        const hue = this._battler.battlerHue();
        Sprite_Battler.prototype.setHue.call(this, hue);
        const bitmapWidth = this.bitmap.width;
        const bitmapHeight = this.bitmap.height;
        const contentsWidth = this.maxWidth;
        const contentsHeight = this.maxHeight;
        let scale = 1.0;
        if (bitmapHeight > contentsHeight) {
            scale = Math.min((contentsHeight / bitmapHeight), 1.0);
        }
        if (bitmapWidth > contentsWidth) {
            scale = Math.min((contentsWidth / bitmapWidth), scale);
        }
        this.scale.x = scale;
        this.scale.y = scale;
        this.setFrame(0, 0, this.bitmap.width, this.bitmap.height);
    }
    if (!this._maskMode) {
        this.setColorTone([-255,-255,-255,0]);
    } else {
        this.setColorTone([0,0,0,0]);
    }
};
  
Sprite_BookEnemy.prototype.update = function() {
    if (this.bitmap && this._svEnemy) {
        if (++this._motionCount >= this.motionSpeed()) {
            this._pattern = (this._pattern + 1) % 4;
            this.setSvActor();
            this._motionCount = 0;
        }
    } else if (!this.bitmap && this._svEnemy) {
        this._svEnemy = false;
    }
};
  
Sprite_BookEnemy.prototype.setSvActor = function() {
    const motionIndex = this._battler.enemy().meta.EB_SVBattlerMotion ? Number(this._battler.enemy().meta.EB_SVBattlerMotion) : 0;
    const pattern = this._pattern < 3 ? this._pattern : 1;
    const cw = this.bitmap.width / 9;
    const ch = this.bitmap.height / 6;
    const cx = Math.floor(motionIndex / 6) * 3 + pattern;
    const cy = motionIndex % 6;
    this.setFrame(cx * cw, cy * ch, cw, ch);
    const hue = this._battler.battlerHue();
    Sprite_Battler.prototype.setHue.call(this, hue);
};
  
Sprite_BookEnemy.prototype.motionSpeed = function() {
    return 12;
};
  
Sprite_BookEnemy.prototype.enemyBattlerName = function() {
      return this._battler.battlerName();
};
  
Sprite_BookEnemy.prototype.enemySVBattlerName = function() {
    if (this._svEnemy === "EB_SVBattler") {
        return this._battler.enemy().meta.EB_SVBattler;
    } else if (this._svEnemy === "_svBattlerData") {
        return this._battler._svBattlerData.name;
    }
};
  
Sprite_BookEnemy.prototype.resetSVEnemy = function() {
    this._svEnemy = false;
};
  
Sprite_BookEnemy.prototype.setMaxWidth = function(width) {
    this.maxWidth = width;
};
  
Sprite_BookEnemy.prototype.setMaxHeight = function(height) {
    this.maxHeight = height;
};

Sprite_BookEnemy.prototype.destroy = function() {
    this.resetEnemy();
    Sprite.prototype.destroy.call(this);
};

//ApngPicture トリアコンタン氏
Sprite_BookEnemy.prototype.loadApngSprite = function(name) {
    if ($gameSystem.isSideView()) {
        return SceneManager.tryLoadApngSideEnemy(name);
    } else {
        return SceneManager.tryLoadApngEnemy(name);
    }
};

Sprite_BookEnemy.prototype.loadStaticImage = function(name) {
    if ($gameSystem.isSideView()) {
        return ImageManager.loadSvEnemy(name);
    } else {
        return ImageManager.loadEnemy(name);
    }
};


function Sprite_BookEnemyActualBase () {
    this.initialize(...arguments);
}
  
Sprite_BookEnemyActualBase.prototype = Object.create(Sprite.prototype);
Sprite_BookEnemyActualBase.prototype.constructor = Sprite_BookEnemyActualBase;
  
Sprite_BookEnemyActualBase.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.initMembers();
};

Sprite_BookEnemyActualBase.prototype.initMembers = function() {
    this.createBitmap();
    this.setBackground();
    const sprite = new Sprite_BookEnemyActual();
    this._mainSprite = sprite;
    this.addChild(sprite);
    this.hide();
};

Sprite_BookEnemyActualBase.prototype.createBitmap = function() {
    const width = Graphics.width;
    const height = Graphics.height;
    this.bitmap = new Bitmap(width, height);
};

Sprite_BookEnemyActualBase.prototype.setBackground = function() {
    this.bitmap.fillRect(0, 0, Graphics.width, Graphics.height, "rgba(0, 0, 0, 0.6)");
};

Sprite_BookEnemyActualBase.prototype.showActualEnemy = function() {
    if (this._mainSprite.isEnemyBookFlag()) {
        this.show();
    }
};

Sprite_BookEnemyActualBase.prototype.hideActualEnemy = function() {
    this.hide();
};

Sprite_BookEnemyActualBase.prototype.setup = function(battler, mask) {
    this._mainSprite.setup(battler, mask);
};

Sprite_BookEnemyActualBase.prototype.resetEnemy = function() {
    this._mainSprite.resetEnemy();
};


function Sprite_BookEnemyActual () {
    this.initialize(...arguments);
}
  
Sprite_BookEnemyActual.prototype = Object.create(Sprite_BookEnemy.prototype);
Sprite_BookEnemyActual.prototype.constructor = Sprite_BookEnemyActual;
  
Sprite_BookEnemyActual.prototype.initialize = function() {
    Sprite_BookEnemy.prototype.initialize.call(this);
    this.initMembers();
};

Sprite_BookEnemyActual.prototype.initMembers = function() {
    Sprite_BookEnemy.prototype.initMembers.call(this);
    this.maxWidth = Graphics.width;
};

Sprite_BookEnemyActual.prototype.setup = function(battler, mask) {
    this._battler = battler;
    this.x = Graphics.width / 2;
    this.y = Graphics.height / 2;
    this._svEnemy = battler ? this.getSvBattler(battler) : null;
    this._bigEnemy = battler && battler.enemy().meta.BigEnemy;
    this._maskMode = mask;
    this.refresh();
};

Sprite_BookEnemyActual.prototype.refresh = function() {
    if (this._battler) {
        Sprite_BookEnemy.prototype.refresh.call(this);
    } else {
        this.bitmap = null;
    }
};

Sprite_BookEnemyActual.prototype.isEnemyBookFlag = function() {
    return this._battler && $gameSystem.isInEnemyBook(this._battler.enemy());
};

function Sprite_EnemyBookGauge() {
    this.initialize(...arguments);
}
  
Sprite_EnemyBookGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_EnemyBookGauge.prototype.constructor = Sprite_EnemyBookGauge;

Sprite_EnemyBookGauge.prototype.initialize = function() {
    Sprite_Gauge.prototype.initialize.call(this);
    this._statusType = $gameTemp.bookGaugeType;
    $gameTemp.bookGaugeType = null;
};
  
Sprite_EnemyBookGauge.prototype.bitmapWidth = function() {
    const statusType = !this._statusType ? $gameTemp.bookGaugeType : this._statusType;
    switch (statusType) {
        case "hp":
            return HPgaugeWidth;
        case "mp":
            return MPgaugeWidth;
        case "tp":
            return TPgaugeWidth;
        default:
            return Sprite_Gauge.prototype.bitmapWidth.call(this);
    }
};

function Game_EnemyBookCharacter() {
    this.initialize(...arguments);
}
  
Game_EnemyBookCharacter.prototype = Object.create(Game_Character.prototype);
Game_EnemyBookCharacter.prototype.constructor = Game_EnemyBookCharacter;
  
Game_EnemyBookCharacter.prototype.initialize = function(id) {
    Game_Character.prototype.initialize.call(this);
    this._enemyId = id;
    this.setStepAnime(true);
    this.refresh();
  };
  
Game_EnemyBookCharacter.prototype.refresh = function() {
    const enemy = $dataEnemies[this._enemyId];
    if (enemy && enemy.meta.EnemyBookCharacter) {
        const data = enemy.meta.EnemyBookCharacter.split(',');
        const characterName = String(data[0]);
        const characterIndex = Number(data[1]);
        this.setImage(characterName, characterIndex);
        this.setDirection(Number(data[2]) || 0);
    } else {
        this.setImage("", 0);
    }
};
  
Game_EnemyBookCharacter.prototype.setPosition = function(x, y) {
    this._bookEnemyX = x;
    this._bookEnemyY = y;
};
  
Game_EnemyBookCharacter.prototype.screenX = function() {
    return this._bookEnemyX;
};
  
Game_EnemyBookCharacter.prototype.screenY = function() {
    return this._bookEnemyY;
};


const _Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
Sprite_Enemy.prototype.setBattler = function(battler) {
    _Sprite_Enemy_setBattler.call(this, battler);
    if ($gameTroop.inBattle()) {
        const enemyId = battler.enemyId();
        if ($gameSystem.registrationTiming(0) && !$gameSystem.getEnemyBookFlag(enemyId)) {
            $gameSystem.addToEnemyBook(enemyId);
        }
        if ($gameSystem.registrationStatusTiming(0) && !$gameSystem.getEnemyBookStatusFlag(enemyId)) {
            if (!$gameSystem.getEnemyBookFlag(enemyId)) {
                $gameSystem.addToEnemyBook(enemyId);
            }
            $gameSystem.addStatusToEnemyBook(enemyId);
        }
    }
};

  
function Sprite_EnemyBookCharacter() {
    this.initialize(...arguments);
}
  
Sprite_EnemyBookCharacter.prototype = Object.create(Sprite_Character.prototype);
Sprite_EnemyBookCharacter.prototype.constructor = Sprite_EnemyBookCharacter;
  
Sprite_EnemyBookCharacter.prototype.initialize = function(character) {
    Sprite_Character.prototype.initialize.call(this, character);
};
  
Sprite_EnemyBookCharacter.prototype.setCharacter = function(character) {
    this._character = character;
};
  
Sprite_EnemyBookCharacter.prototype.update = function() {
    if (this.visible) {
    Sprite_Character.prototype.update.call(this);
        this._character.updateAnimation();
    }
};

Sprite_EnemyBookCharacter.prototype.setup = function(battler) {
    const character = new Game_EnemyBookCharacter(battler.enemyId());
    this.setCharacter(character);
};


const _BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
    _BattleManager_initMembers.call(this);
    this.analyzeMissMessage = null;
    this.enemyBook_Open = false;
};

const _BattleManager_isBusy = BattleManager.isBusy;
BattleManager.isBusy = function() {
    return this.enemyBookIsBusy() || _BattleManager_isBusy.call(this);
};

BattleManager.enemyBookIsBusy = function() {
    return this.enemyBook_Open;
};

BattleManager.setEnemyBookWinsow = function(window) {
    return this.enemyBookWindow = window;
};

const _BattleManager_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
    _BattleManager_startAction.call(this);
    this.setEnemyBookAction();
};

BattleManager.setEnemyBookAction = function() {
    const subject = this._subject;
    if (subject.isEnemy() && this._action) {
        const actionId = subject.enemy().actions.findIndex(action => action.skillId === this._action.item().id);
        $gameSystem.setEnemyBookActionFlag(subject.enemyId(), actionId, true);
    }
};

function getElementTextName(no) {
    if (no < 0) {
      return no === -1 ? (this.language_Jp ? '物理ダメージ率' : 'Physical Damage') : (this.language_Jp ? '魔法ダメージ率' : 'Magical Damage');
    } else {
      return $dataSystem.elements[no];
    }
};

enemyBookExtractMetadata = function(data) {
    const regExp = /<([^<>:]+)(:?)([^>]*)>/g;
    meta = {};
    if (!data.CategoryNote) {
        return meta;
    }
    for (;;) {
        const match = regExp.exec(data.CategoryNote);
        if (match) {
            if (match[2] === ":") {
                meta[match[1]] = match[3];
            } else {
                meta[match[1]] = true;
            }
        } else {
            break;
        }
    }
    return meta;
};


})();