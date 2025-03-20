/*:-----------------------------------------------------------------------------------
 * NUUN_PopupEx.js
 * 
 * Copyright (C) 2025 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Popup
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * Expands popups.
 * 
 * This plugin adds the following popups.
 * State
 * Buff, Debuff
 * Critical
 * Evade
 * Counterattack
 * Reflect
 * Substitute
 * Defeat
 * Elemental resistance
 * Elemental weakness
 * Elemental invalid
 * 
 * The following popups expand existing popups.
 * Failure
 * 
 * State popup
 * Any state that is set as an unfavorable state will become an unfavorable state.
 * Any state that is not specified will become an advantageous state.
 * 
 * State Notes
 * <BatStatePopupId:[id]> Specifies the popup data ID for the unfavorable state.
 * [id]: Setting ID for the plugin parameter "Unfavorable state popup settings"
 * 
 * <StatePopupId:[id]> Specifies the popup data ID for the favorable state.
 * [id]: Setting ID for the plugin parameter "Favorable state popup settings"
 * 
 * <PopUpStateName:[text]> Name of the state to popup. If left blank, the state name in the database will be displayed.
 * [text]: Popup text
 * %1: State name
 * 
 * <PopUpColor:[colorIndex]> Specifies the color when popup occurs.
 * [colorIndex]: Color index number or color code
 * Example: <PopUpColor:17>
 * 
 * The text when adding is entered in the popup text.
 * The text when removing is entered in the popup text when removing and disappearing.
 * Popup text format
 * %1: State name
 * 
 * Buffs, Debuffs
 * The popup text, popup text when released and when it disappears, popup text color, popup icon ID, and popup image are specified in an array format.
 * The ID in the list is the buff level.
 * For two-stage enhancement, set it to the second popup buff setting.
 * If it is weakened by two stages, set it to the second popup debuff setting.
 * 
 * The text to be added is entered in the popup text.
 * The text to be displayed when the popup is released should be entered in "Popup text when released or removed".
 * Popup text format
 * %1:Ability value
 * 
 * Critical, Evade, Failure, Counterattack, Reflect, Substitute, Defeat, Elemental Resistance, Elemental Weakness, Elemental Invalid
 * Enter the text in the popup text.
 * Popup text format
 * %1:Parameter (Critical, etc.)
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 3/21/2025 Ver.1.0.0
 * First edition.
 * 
 * @param CommonSetting
 * @text Common setting
 * @default ------------------------------
 * 
 * @param PopUpMode
 * @text Popup display mode
 * @desc Specifies the display mode of the popup.
 * @type select
 * @option Default
 * @value 'default'
 * @option Same position
 * @value 'Same'
 * @default 'Same'
 * @parent CommonSetting
 * 
 * @param PopUpUpInterval
 * @desc Interval when popups are displayed continuously.
 * @text Ppopup interval
 * @type number
 * @default 30
 * @parent CommonSetting
 * 
 * @param PopUpReleaseOpacity
 * @desc Opacity when released.
 * @text Opacity when released
 * @type number
 * @default 128
 * @parent CommonSetting
 * 
 * @param PopUpSetting
 * @text PopUp setting
 * @default ------------------------------
 * 
 * @param PopUpCritical
 * @text Critical popup settings.
 * @desc Sets the critical popup.
 * @default {"PopUpText":"%1","RemovePopUpText":"%1","PopupColor":"0","PopupIconIndex":"0","PopupFontSize":"4","PopupFontFace":"","PopUpImges":"","PopupMode":"'Default'"}
 * @type struct<PopUpData>
 * @parent PopUpSetting
 * 
 * @param PopUpAvoid
 * @text Avoid popup settings
 * @desc Set the avoidance popup.
 * @default {"PopUpText":"%1","RemovePopUpText":"%1","PopupColor":"0","PopupIconIndex":"0","PopupFontSize":"4","PopupFontFace":"","PopUpImges":"","PopupMode":"'Default'"}
 * @type struct<PopUpData>
 * @parent PopUpSetting
 * 
 * @param PopUpMiss
 * @text Failure popup settings
 * @desc Set the failure popup.
 * @default {"PopUpText":"%1","RemovePopUpText":"%1","PopupColor":"0","PopupIconIndex":"0","PopupFontSize":"4","PopupFontFace":"","PopUpImges":"","PopupMode":"'Default'"}
 * @type struct<PopUpData>
 * @parent Ptting
 * 
 * @param PopUpResistance
 * @text Resistance popup settings
 * @desc Sets the resistance popup.
 * @default {"PopUpText":"%1","RemovePopUpText":"%1","PopupColor":"0","PopupIconIndex":"0","PopupFontSize":"4","PopupFontFace":"","PopUpImges":"","PopupMode":"'Default'"}
 * @type struct<PopUpData>
 * @parent PopUpSetting
 * 
 * @param PopUpWeakness
 * @text Weakness popup settings
 * @desc Sets the weak spot popup.
 * @default {"PopUpText":"%1","RemovePopUpText":"%1","PopupColor":"0","PopupIconIndex":"0","PopupFontSize":"4","PopupFontFace":"","PopUpImges":"","PopupMode":"'Default'"}
 * @type struct<PopUpData>
 * @parent PopUpSetting
 * 
 * @param PopUpInvalid
 * @text Invalid popup settings
 * @desc Set the invalid popup.
 * @default {"PopUpText":"%1","RemovePopUpText":"%1","PopupColor":"0","PopupIconIndex":"0","PopupFontSize":"4","PopupFontFace":"","PopUpImges":"","PopupMode":"'Default'"}
 * @type struct<PopUpData>
 * @parent PopUpSetting
 * 
 * @param PopUpCounter
 * @text Counterattack popup setting
 * @desc Set the counterattack popup.
 * @default {"PopUpText":"%1","RemovePopUpText":"%1","PopupColor":"0","PopupIconIndex":"0","PopupFontSize":"4","PopupFontFace":"","PopUpImges":"","PopupMode":"'Default'"}
 * @type struct<PopUpData>
 * @parent PopUpSetting
 * 
 * @param PopUpRefleopUpSection
 * @text Reflection popup settings
 * @desc Set the reflection popup.
 * @default {"PopUpText":"%1","RemovePopUpText":"%1","PopupColor":"0","PopupIconIndex":"0","PopupFontSize":"4","PopupFontFace":"","PopUpImges":"","PopupMode":"'Default'"}
 * @type struct<PopUpData>
 * @parent PopUpSetting
 * 
 * @param PopUpSubstitute
 * @text Substitute popup settings
 * @desc Set up a substitute popup.
 * @default {"PopUpText":"%1","RemovePopUpText":"%1","PopupColor":"0","PopupIconIndex":"0","PopupFontSize":"4","PopupFontFace":"","PopUpImges":"","PopupMode":"'Default'"}
 * @type struct<PopUpData>
 * @parent PopUpSetting
 * 
 * @param PopUpDefeat
 * @text Defeat popup settings
 * @desc Sets the popup that appears when an enemy is defeated.
 * @default 
 * @type struct<PopUpData>
 * @parent PopUpSetting
 * 
 * @param StatePopUpSetting
 * @text State popup
 * @default ------------------------------
 * 
 * @param PopUpAdvantageousState
 * @text Favorable state popup settings
 * @desc Sets the favorable state that will popup.
 * @default ["{\"State\":\"2\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"%1\\\",\\\"RemovePopUpText\\\":\\\"%1\\\",\\\"PopUpPattern\\\":\\\"1\\\",\\\"PopupColor\\\":\\\"0\\\",\\\"PopupIconIndex\\\":\\\"0\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"State\":\"3\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"%1\\\",\\\"RemovePopUpText\\\":\\\"%1\\\",\\\"PopUpPattern\\\":\\\"1\\\",\\\"PopupColor\\\":\\\"0\\\",\\\"PopupIconIndex\\\":\\\"0\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}"]
 * @type struct<PopUpState>[]
 * @parent StatePopUpSetting
 * 
 * @param PopUpBadState
 * @text Unfavorable state popup settings
 * @desc Sets the adverse state that will popup.
 * @default ["{\"State\":\"0\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"%1\\\",\\\"RemovePopUpText\\\":\\\"%1\\\",\\\"PopupColor\\\":\\\"0\\\",\\\"PopupIconIndex\\\":\\\"0\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"State\":\"4\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"%1\\\",\\\"RemovePopUpText\\\":\\\"%1\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"0\\\",\\\"PopupIconIndex\\\":\\\"0\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"State\":\"5\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"%1\\\",\\\"RemovePopUpText\\\":\\\"%1\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"0\\\",\\\"PopupIconIndex\\\":\\\"0\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"State\":\"6\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"%1\\\",\\\"RemovePopUpText\\\":\\\"%1\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"0\\\",\\\"PopupIconIndex\\\":\\\"0\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"State\":\"7\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"%1\\\",\\\"RemovePopUpText\\\":\\\"%1\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"0\\\",\\\"PopupIconIndex\\\":\\\"0\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"State\":\"8\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"%1\\\",\\\"RemovePopUpText\\\":\\\"%1\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"0\\\",\\\"PopupIconIndex\\\":\\\"0\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"State\":\"9\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"%1\\\",\\\"RemovePopUpText\\\":\\\"%1\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"0\\\",\\\"PopupIconIndex\\\":\\\"0\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"State\":\"10\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"%1\\\",\\\"RemovePopUpText\\\":\\\"%1\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"0\\\",\\\"PopupIconIndex\\\":\\\"0\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"State\":\"12\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"%1\\\",\\\"RemovePopUpText\\\":\\\"%1\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"0\\\",\\\"PopupIconIndex\\\":\\\"0\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"State\":\"13\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"%1\\\",\\\"RemovePopUpText\\\":\\\"%1\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"0\\\",\\\"PopupIconIndex\\\":\\\"0\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}"]
 * @type struct<PopUpState>[]
 * @parent StatePopUpSetting
 * 
 * @param DefaultStatePopup
 * @text Apply Default Popup Plugin
 * @desc Specifies the default popup plugin to be applied.
 * @type combo
 * @option 'Default'
 * @option 'LateralBoundPopUp'
 * @option 'UpFadeoutPopup'
 * @option 'SlideFadeoutPopup'
 * @default 'Default'
 * 
 * @param BuffPopUpSetting
 * @text Buff popup
 * @default ------------------------------
 * 
 * @param BuffPopUp
 * @text Popup buff settings
 * @desc Set the buffs that will popup.
 * @default ["{\"StateType\":\"0\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 UP\\\\\\\",\\\\\\\"%1 UP\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"StateType\":\"1\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 UP\\\\\\\",\\\\\\\"%1 UP\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"StateType\":\"2\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 UP\\\\\\\",\\\\\\\"%1 UP\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"StateType\":\"3\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 UP\\\\\\\",\\\\\\\"%1 UP\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"StateType\":\"4\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 UP\\\\\\\",\\\\\\\"%1 UP\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"StateType\":\"5\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 UP\\\\\\\",\\\\\\\"%1 UP\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"StateType\":\"6\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 UP\\\\\\\",\\\\\\\"%1 UP\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"StateType\":\"7\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 UP\\\\\\\",\\\\\\\"%1 UP\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}"]
 * @type struct<PopUpBuffList>[]
 * @parent BuffPopUpSetting
 * 
 * @param DebuffPopUp
 * @text Popup debuff settings
 * @desc Set the debuff that popup.
 * @default ["{\"StateType\":\"0\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 DOWN\\\\\\\",\\\\\\\"%1 DOWN\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"StateType\":\"1\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 DOWN\\\\\\\",\\\\\\\"%1 DOWN\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"StateType\":\"2\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 DOWN\\\\\\\",\\\\\\\"%1 DOWN\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"StateType\":\"3\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 DOWN\\\\\\\",\\\\\\\"%1 DOWN\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"StateType\":\"4\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 DOWN\\\\\\\",\\\\\\\"%1 DOWN\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"StateType\":\"5\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 DOWN\\\\\\\",\\\\\\\"%1 DOWN\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"StateType\":\"6\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 DOWN\\\\\\\",\\\\\\\"%1 DOWN\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"StateType\":\"7\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 DOWN\\\\\\\",\\\\\\\"%1 DOWN\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}"]
 * @type struct<PopUpBuffList>[]
 * @parent BuffPopUpSetting
 * 
 * @param DefaultBuffPopup
 * @text Apply Default Popup Plugin
 * @desc Specifies the default popup plugin to be applied.
 * @type combo
 * @option 'Default'
 * @option 'LateralBoundPopUp'
 * @option 'UpFadeoutPopup'
 * @option 'SlideFadeoutPopup'
 * @default 'Default'
 * 
 */
/*~struct~PopUpState:
 * 
 * @param State
 * @desc Specify the state.
 * @text State
 * @type state
 * @default 0
 * 
 * @param PopUpData
 * @text Popup Settings
 * @desc Configure the popup.
 * @default {"State":"8","PopUpData":"{\"PopUpText\":\"%1\",\"RemovePopUpText\":\"%1\",\"PopupColor\":\"0\",\"PopupIconIndex\":\"0\",\"PopupFontSize\":\"4\",\"PopupFontFace\":\"\",\"PopupMode\":\"'Default'\"}"}
 * @type struct<PopUpStateData>
 * @parent StatePopUpSetting
 * 
 */
/*~struct~PopUpBuffList:
 * 
 * @param StateType
 * @text Buff popup
 * @desc Specifies the buff to popup.
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
 * @option Luk
 * @value 7
 * @default 0
 * 
 * @param PopUpData
 * @text Popup Settings
 * @desc Configure the popup.
 * @default {"PopUpText":"[\"%1\",\"%1]","RemovePopUpText":"[\"%1\",\"%1]","PopUpPattern":"0","PopupColor":"[]","PopupIconIndex":"[]","PopupFontSize":"4","PopupFontFace":"","PopUpImges":"","PopupMode":"'Default'"}
 * @type struct<PopUpBuffData>
 * @parent StatePopUpSetting
 * 
 * 
 */
/*~struct~PopUpData:
 * 
 * @param PopUpText
 * @desc Popup text. %1: Status name to popup
 * @text Popup Text
 * @type string 
 * @default %1
 * 
 * @param PopUpWidth
 * @desc Specify the popup message width. (Default: 240)
 * @text Message Width
 * @type number
 * @default 240
 * 
 * @param PopupColor
 * @desc Popup color. (System color or Color Code (Text tab))
 * @text Popup text color
 * @type color
 * @default 0
 * 
 * @param PopupIconIndex
 * @desc The icon ID of the popup.
 * @text Popup Icon ID
 * @type icon
 * @default 0
 * 
 * @param PopupFontSize
 * @desc Font size (difference from main font)
 * @text Font size
 * @type number
 * @default 4
 * @min -99
 * 
 * @param PopupFontFace
 * @desc Specify any font (without extension).
 * @text Text font
 * @type string
 * @default 
 * 
 * @param PopUpImges
 * @desc Specify the popup file name.
 * @text Popup Image
 * @type file
 * @dir img/
 * @default 
 * 
 * @param PopupMode
 * @text Popup plugins to apply
 * @desc Specify the popup plugin to be applied. If no plugin is found, the default will be used.
 * @type combo
 * @option 'Default'
 * @option 'LateralBoundPopUp'
 * @option 'UpFadeoutPopup'
 * @option 'SlideFadeoutPopup'
 * @default 'Default'
 * 
 */
/*~struct~PopUpStateData:
 * 
 * @param PopUpText
 * @desc Popup text. %1: Status name to popup
 * @text Popup Text
 * @type string 
 * @default %1
 * 
 * @param RemovePopUpText
 * @desc Popup text when released or disappeared. %1: Status name to be displayed
 * @text Popup text when released or removed
 * @type string
 * @default %1
 * 
 * @param PopUpPattern
 * @text View pop-ups
 * @desc Display popup
 * @type select
 * @option Popup
 * @value 0
 * @option No popup
 * @value 1
 * @option Do not pop up only when given
 * @value 2
 * @option Do not pop up when releasing
 * @value 3
 * @default 0
 * 
 * @param PopUpWidth
 * @desc Specify the popup message width. (Default: 240)
 * @text Message Width
 * @type number
 * @default 240
 * 
 * @param PopupColor
 * @desc Popup color. (System color or Color Code (Text tab))
 * @text Popup text color
 * @type color
 * @default 0
 * 
 * @param PopupIconIndex
 * @desc The icon ID of the popup.
 * @text Popup Icon ID
 * @type icon
 * @default 0
 * 
 * @param PopupFontSize
 * @desc Font size (difference from main font)
 * @text Font size
 * @type number
 * @default 4
 * @min -99
 * 
 * @param PopupFontFace
 * @desc Specify any font (without extension).
 * @text Text font
 * @type string
 * @default 
 * 
 * @param PopUpImges
 * @desc Specify the popup file name.
 * @text Popup Image
 * @type file
 * @dir img/
 * @default 
 * 
 * @param PopupMode
 * @text Popup plugins to apply
 * @desc Specify the popup plugin to be applied. If no plugin is found, the default will be used.
 * @type combo
 * @option 'Default'
 * @option 'LateralBoundPopUp'
 * @option 'UpFadeoutPopup'
 * @option 'SlideFadeoutPopup'
 * @default 'Default'
 * 
 */
/*~struct~PopUpBuffData:
 * 
 * @param PopUpText
 * @desc Popup text. %1: Status name to popup
 * @text Popup Text
 * @type string[]
 * @default ["%1","%1"]
 * 
 * @param RemovePopUpText
 * @desc Popup text when released or disappeared. %1: Status name to be displayed
 * @text Popup text when released or removed
 * @type string[]
 * @default ["%1","%1"]
 * 
 * @param PopUpPattern
 * @text View pop-ups
 * @desc Display popup
 * @type select
 * @option Popup
 * @value 0
 * @option No popup
 * @value 1
 * @option Do not pop up only when given
 * @value 2
 * @option Do not pop up when releasing
 * @value 3
 * @default 0
 * 
 * @param PopUpWidth
 * @desc Specify the popup message width. (Default: 240)
 * @text Message Width
 * @type number
 * @default 240
 * 
 * @param PopupColor
 * @desc Popup color. (System color or Color Code (Text tab))
 * @text Popup text color
 * @type color[]
 * @default []
 * 
 * @param PopupIconIndex
 * @desc The icon ID of the popup.
 * @text Popup Icon ID
 * @type icon[]
 * @default []
 * 
 * @param PopupFontSize
 * @desc Font size (difference from main font)
 * @text Font size
 * @type number
 * @default 4
 * @min -99
 * 
 * @param PopupFontFace
 * @desc Specify any font (without extension).
 * @text Text font
 * @type string
 * @default 
 * 
 * @param PopUpImges
 * @desc Specify the popup file name.
 * @text Popup Image
 * @type file[]
 * @dir img/
 * @default 
 * 
 * @param PopupMode
 * @text Popup plugins to apply
 * @desc Specify the popup plugin to be applied. If no plugin is found, the default will be used.
 * @type combo
 * @option 'Default'
 * @option 'LateralBoundPopUp'
 * @option 'UpFadeoutPopup'
 * @option 'SlideFadeoutPopup'
 * @default 'Default'
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc ポップアップ拡張
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * ポップアップを拡張します。
 * このプラグインでは以下のポップアップを追加します。
 * ステート
 * バフ、デバフ
 * クリティカル
 * 回避
 * 反撃
 * 反射
 * かばう
 * 撃破
 * 属性耐性
 * 属性弱点
 * 属性無効
 * 以下のポップアップは既存のポップアップを拡張します。
 * 失敗
 * 
 * ステートのポップアップ
 * 不利なステートに設定されているステートは不利状態のステートになります。
 * 指定がないステートは全て有利なステートになります。
 * 
 * ステートのメモ欄
 * <BatStatePopupId:[id]> 不利なステートのポップアップデータIDを指定します。
 * [id]:プラグインパラメータ「不利なステートポップアップ設定」の設定ID
 * <StatePopupId:[id]> 有利なステートのポップアップデータIDを指定します。
 * [id]:プラグインパラメータ「有利なステートポップアップ設定」の設定ID
 * <PopUpStateName:[text]> ポップアップするステート名。無記入の場合はデータベースのステート名が表示されます。
 * [text]:ポップアップテキスト
 * %1:ステート名
 * <PopUpColor:[colorIndex]> ポップアップ時の色を指定します。
 * [colorIndex]:カラーインデックス番号またはカラーコード　
 * 例：<PopUpColor:17>
 * 
 * 付加時のテキストはポップアップテキストで記入します。
 * 解除時のテキストは解除時、消失時ポップアップテキストで記入します。
 * ポップアップテキストフォーマット
 * %1:ステート名
 * 
 * バフ、デバフ
 * ポップアップテキスト、解除時、消失時ポップアップテキスト、ポップアップ文字色、ポップアップアイコンID、ポップアップ画像の指定は
 * 配列型なっております。
 * リストのIDがバフレベルになっております。
 * 2段階強化の場合はポップアップバフ設定の2番目に設定。
 * 2段階弱体の場合はポップアップデバフ設定の2番目に設定。
 * 
 * 付加時のテキストはポップアップテキストで記入します。
 * 解除時のテキストは解除時、消失時ポップアップテキストで記入します。
 * ポップアップテキストフォーマット
 * %1:能力値
 * 
 * クリティカル、回避、失敗、反撃、反射、かばう、撃破、属性耐性、属性弱点、属性無効
 * テキストはポップアップテキストで記入します。
 * ポップアップテキストフォーマット
 * %1:パラメータ(クリティカル等)
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2025/3/21 Ver.1.0.0
 * 初版
 * 
 * @param CommonSetting
 * @text 共通設定
 * @default ------------------------------
 * 
 * @param PopUpMode
 * @text ポップアップ表示モード
 * @desc ポップアップの表示モードを指定します。
 * @type select
 * @option デフォルト
 * @value 'default'
 * @option 同一位置
 * @value 'Same'
 * @default 'Same'
 * @parent CommonSetting
 * 
 * @param PopUpUpInterval
 * @desc ポップアップを連続で表示するときの間隔
 * @text ポップアップ間隔
 * @type number
 * @default 30
 * @parent CommonSetting
 * 
 * @param PopUpReleaseOpacity
 * @desc 解除時の不透明度
 * @text 解除時不透明度
 * @type number
 * @default 128
 * @parent CommonSetting
 * 
 * @param PopUpSetting
 * @text ポップアップ設定
 * @default ------------------------------
 * 
 * @param PopUpCritical
 * @text クリティカルポップアップ設定
 * @desc クリティカルのポップアップ設定をします。
 * @default {"PopUpText":"%1","RemovePopUpText":"%1","PopupColor":"0","PopupIconIndex":"0","PopupFontSize":"4","PopupFontFace":"","PopUpImges":"","PopupMode":"'Default'"}
 * @type struct<PopUpData>
 * @parent PopUpSetting
 * 
 * @param PopUpAvoid
 * @text 回避ポップアップ設定
 * @desc 回避のポップアップ設定をします。
 * @default {"PopUpText":"%1","RemovePopUpText":"%1","PopupColor":"0","PopupIconIndex":"0","PopupFontSize":"4","PopupFontFace":"","PopUpImges":"","PopupMode":"'Default'"}
 * @type struct<PopUpData>
 * @parent PopUpSetting
 * 
 * @param PopUpMiss
 * @text 失敗ポップアップ設定
 * @desc 失敗のポップアップ設定をします。
 * @default {"PopUpText":"%1","RemovePopUpText":"%1","PopupColor":"0","PopupIconIndex":"0","PopupFontSize":"4","PopupFontFace":"","PopUpImges":"","PopupMode":"'Default'"}
 * @type struct<PopUpData>
 * @parent PopUpSetting
 * 
 * @param PopUpResistance
 * @text 耐性ポップアップ設定
 * @desc 耐性のポップアップ設定をします。
 * @default {"PopUpText":"%1","RemovePopUpText":"%1","PopupColor":"0","PopupIconIndex":"0","PopupFontSize":"4","PopupFontFace":"","PopUpImges":"","PopupMode":"'Default'"}
 * @type struct<PopUpData>
 * @parent PopUpSetting
 * 
 * @param PopUpWeakness
 * @text 弱点ポップアップ設定
 * @desc 弱点のポップアップ設定をします。
 * @default {"PopUpText":"%1","RemovePopUpText":"%1","PopupColor":"0","PopupIconIndex":"0","PopupFontSize":"4","PopupFontFace":"","PopUpImges":"","PopupMode":"'Default'"}
 * @type struct<PopUpData>
 * @parent PopUpSetting
 * 
 * @param PopUpInvalid
 * @text 無効ポップアップ設定
 * @desc 無効のポップアップ設定をします。
 * @default {"PopUpText":"%1","RemovePopUpText":"%1","PopupColor":"0","PopupIconIndex":"0","PopupFontSize":"4","PopupFontFace":"","PopUpImges":"","PopupMode":"'Default'"}
 * @type struct<PopUpData>
 * @parent PopUpSetting
 * 
 * @param PopUpCounter
 * @text 反撃ポップアップ設定
 * @desc 反撃のポップアップ設定をします。
 * @default {"PopUpText":"%1","RemovePopUpText":"%1","PopupColor":"0","PopupIconIndex":"0","PopupFontSize":"4","PopupFontFace":"","PopUpImges":"","PopupMode":"'Default'"}
 * @type struct<PopUpData>
 * @parent PopUpSetting
 * 
 * @param PopUpReflection
 * @text 反射ポップアップ設定
 * @desc 反射のポップアップ設定をします。
 * @default {"PopUpText":"%1","RemovePopUpText":"%1","PopupColor":"0","PopupIconIndex":"0","PopupFontSize":"4","PopupFontFace":"","PopUpImges":"","PopupMode":"'Default'"}
 * @type struct<PopUpData>
 * @parent PopUpSetting
 * 
 * @param PopUpSubstitute
 * @text かばうポップアップ設定
 * @desc かばうのポップアップ設定をします。
 * @default {"PopUpText":"%1","RemovePopUpText":"%1","PopupColor":"0","PopupIconIndex":"0","PopupFontSize":"4","PopupFontFace":"","PopUpImges":"","PopupMode":"'Default'"}
 * @type struct<PopUpData>
 * @parent PopUpSetting
 * 
 * @param PopUpDefeat
 * @text 撃破ポップアップ設定
 * @desc 撃破のポップアップ設定をします。
 * @default 
 * @type struct<PopUpData>
 * @parent PopUpSetting
 * 
 * @param StatePopUpSetting
 * @text ステートのポップアップ
 * @default ------------------------------
 * 
 * @param PopUpAdvantageousState
 * @text 有利なステートポップアップ設定
 * @desc ポップアップする有利なステートの設定をします。
 * @default ["{\"State\":\"2\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"%1\\\",\\\"RemovePopUpText\\\":\\\"%1\\\",\\\"PopUpPattern\\\":\\\"1\\\",\\\"PopupColor\\\":\\\"0\\\",\\\"PopupIconIndex\\\":\\\"0\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"State\":\"3\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"%1\\\",\\\"RemovePopUpText\\\":\\\"%1\\\",\\\"PopUpPattern\\\":\\\"1\\\",\\\"PopupColor\\\":\\\"0\\\",\\\"PopupIconIndex\\\":\\\"0\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}"]
 * @type struct<PopUpState>[]
 * @parent StatePopUpSetting
 * 
 * @param PopUpBadState
 * @text 不利なステートポップアップ設定
 * @desc ポップアップする不利なステートの設定をします。
 * @default ["{\"State\":\"0\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"%1\\\",\\\"RemovePopUpText\\\":\\\"%1\\\",\\\"PopupColor\\\":\\\"0\\\",\\\"PopupIconIndex\\\":\\\"0\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"State\":\"4\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"%1\\\",\\\"RemovePopUpText\\\":\\\"%1\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"0\\\",\\\"PopupIconIndex\\\":\\\"0\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"State\":\"5\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"%1\\\",\\\"RemovePopUpText\\\":\\\"%1\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"0\\\",\\\"PopupIconIndex\\\":\\\"0\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"State\":\"6\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"%1\\\",\\\"RemovePopUpText\\\":\\\"%1\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"0\\\",\\\"PopupIconIndex\\\":\\\"0\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"State\":\"7\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"%1\\\",\\\"RemovePopUpText\\\":\\\"%1\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"0\\\",\\\"PopupIconIndex\\\":\\\"0\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"State\":\"8\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"%1\\\",\\\"RemovePopUpText\\\":\\\"%1\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"0\\\",\\\"PopupIconIndex\\\":\\\"0\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"State\":\"9\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"%1\\\",\\\"RemovePopUpText\\\":\\\"%1\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"0\\\",\\\"PopupIconIndex\\\":\\\"0\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"State\":\"10\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"%1\\\",\\\"RemovePopUpText\\\":\\\"%1\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"0\\\",\\\"PopupIconIndex\\\":\\\"0\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"State\":\"12\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"%1\\\",\\\"RemovePopUpText\\\":\\\"%1\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"0\\\",\\\"PopupIconIndex\\\":\\\"0\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"State\":\"13\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"%1\\\",\\\"RemovePopUpText\\\":\\\"%1\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"0\\\",\\\"PopupIconIndex\\\":\\\"0\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}"]
 * @type struct<PopUpState>[]
 * @parent StatePopUpSetting
 * 
 * @param DefaultStatePopup
 * @text 適用デフォルトポップアッププラグイン
 * @desc 適用させるデフォルトポップアッププラグインを指定をします。
 * @type combo
 * @option 'Default'
 * @option 'LateralBoundPopUp'
 * @option 'UpFadeoutPopup'
 * @option 'SlideFadeoutPopup'
 * @default 'Default'
 * 
 * @param BuffPopUpSetting
 * @text バフのポップアップ
 * @default ------------------------------
 * 
 * @param BuffPopUp
 * @text ポップアップバフ設定
 * @desc ポップアップするバフの設定をします。
 * @default ["{\"StateType\":\"0\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 UP\\\\\\\",\\\\\\\"%1 UP\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"StateType\":\"1\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 UP\\\\\\\",\\\\\\\"%1 UP\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"StateType\":\"2\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 UP\\\\\\\",\\\\\\\"%1 UP\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"StateType\":\"3\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 UP\\\\\\\",\\\\\\\"%1 UP\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"StateType\":\"4\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 UP\\\\\\\",\\\\\\\"%1 UP\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"StateType\":\"5\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 UP\\\\\\\",\\\\\\\"%1 UP\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"StateType\":\"6\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 UP\\\\\\\",\\\\\\\"%1 UP\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"StateType\":\"7\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 UP\\\\\\\",\\\\\\\"%1 UP\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}"]
 * @type struct<PopUpBuffList>[]
 * @parent BuffPopUpSetting
 * 
 * @param DebuffPopUp
 * @text ポップアップデバフ設定
 * @desc ポップアップするデバフの設定をします。
 * @default ["{\"StateType\":\"0\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 DOWN\\\\\\\",\\\\\\\"%1 DOWN\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"StateType\":\"1\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 DOWN\\\\\\\",\\\\\\\"%1 DOWN\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"StateType\":\"2\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 DOWN\\\\\\\",\\\\\\\"%1 DOWN\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"StateType\":\"3\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 DOWN\\\\\\\",\\\\\\\"%1 DOWN\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"StateType\":\"4\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 DOWN\\\\\\\",\\\\\\\"%1 DOWN\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"StateType\":\"5\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 DOWN\\\\\\\",\\\\\\\"%1 DOWN\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"StateType\":\"6\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 DOWN\\\\\\\",\\\\\\\"%1 DOWN\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}","{\"StateType\":\"7\",\"PopUpData\":\"{\\\"PopUpText\\\":\\\"[\\\\\\\"%1 DOWN\\\\\\\",\\\\\\\"%1 DOWN\\\\\\\"]\\\",\\\"RemovePopUpText\\\":\\\"[\\\\\\\"%1\\\\\\\",\\\\\\\"%1]\\\",\\\"PopUpPattern\\\":\\\"0\\\",\\\"PopupColor\\\":\\\"[]\\\",\\\"PopupIconIndex\\\":\\\"[]\\\",\\\"PopupFontSize\\\":\\\"4\\\",\\\"PopupFontFace\\\":\\\"\\\",\\\"PopUpImges\\\":\\\"\\\",\\\"PopupMode\\\":\\\"'Default'\\\"}\"}"]
 * @type struct<PopUpBuffList>[]
 * @parent BuffPopUpSetting
 * 
 * @param DefaultBuffPopup
 * @text 適用デフォルトポップアッププラグイン
 * @desc 適用させるデフォルトポップアッププラグインを指定をします。
 * @type combo
 * @option 'Default'
 * @option 'LateralBoundPopUp'
 * @option 'UpFadeoutPopup'
 * @option 'SlideFadeoutPopup'
 * @default 'Default'
 * 
 */
/*~struct~PopUpState:ja
 * 
 * @param State
 * @desc ステートを指定します。
 * @text ステート
 * @type state
 * @default 0
 * 
 * @param PopUpData
 * @text ポップアップ設定
 * @desc ポップアップの設定をします。
 * @default {"State":"8","PopUpData":"{\"PopUpText\":\"%1\",\"RemovePopUpText\":\"%1\",\"PopupColor\":\"0\",\"PopupIconIndex\":\"0\",\"PopupFontSize\":\"4\",\"PopupFontFace\":\"\",\"PopupMode\":\"'Default'\"}"}
 * @type struct<PopUpStateData>
 * @parent StatePopUpSetting
 * 
 * 
 */
/*~struct~PopUpBuffList:ja
 * 
 * @param StateType
 * @text 能力値ポップアップ
 * @desc ポップアップさせる能力値を指定します。
 * @type select
 * @option HP
 * @value 0
 * @option MP
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
 * @param PopUpData
 * @text ポップアップ設定
 * @desc ポップアップの設定をします。
 * @default {"PopUpText":"[\"%1\",\"%1]","RemovePopUpText":"[\"%1\",\"%1]","PopUpPattern":"0","PopupColor":"[]","PopupIconIndex":"[]","PopupFontSize":"4","PopupFontFace":"","PopUpImges":"","PopupMode":"'Default'"}
 * @type struct<PopUpBuffData>
 * @parent StatePopUpSetting
 * 
 */
/*~struct~PopUpData:ja
 * 
 * @param PopUpText
 * @desc ポップアップテキスト。%1:ポップアップするステータス名
 * @text ポップアップテキスト
 * @type string 
 * @default %1
 * 
 * @param PopUpWidth
 * @desc ポップアップメッセージ幅を指定します。（デフォルト240）
 * @text メッセージ幅
 * @type number
 * @default 240
 * 
 * @param PopupColor
 * @desc ポップアップカラー。(システムカラーまたはカラーコード(テキストタブ))
 * @text ポップアップ文字色
 * @type color
 * @default 0
 * 
 * @param PopupIconIndex
 * @desc ポップアップのアイコンID。
 * @text ポップアップアイコンID
 * @type icon
 * @default 0
 * 
 * @param PopupFontSize
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ
 * @type number
 * @default 4
 * @min -99
 * 
 * @param PopupFontFace
 * @desc 任意のフォントを指定します。(拡張子なし)
 * @text テキスト部のフォント
 * @type string
 * @default 
 * 
 * @param PopUpImges
 * @desc ポップアップファイル名を指定します。
 * @text ポップアップ画像
 * @type file
 * @dir img/
 * @default 
 * 
 * @param PopupMode
 * @text 適用するポップアッププラグイン
 * @desc 適用させるポップアッププラグインを指定をします。プラグインが見つからない場合はデフォルトになります。
 * @type combo
 * @option 'Default'
 * @option 'LateralBoundPopUp'
 * @option 'UpFadeoutPopup'
 * @option 'SlideFadeoutPopup'
 * @default 'Default'
 * 
 */
/*~struct~PopUpStateData:ja
 * 
 * @param PopUpText
 * @desc ポップアップテキスト。%1:ポップアップするステータス名
 * @text ポップアップテキスト
 * @type string 
 * @default %1
 * 
 * @param RemovePopUpText
 * @desc 解除時または消失時ポップアップテキスト。%1:ポップアップするステータス名
 * @text 解除時、消失時ポップアップテキスト
 * @type string
 * @default %1
 * 
 * @param PopUpPattern
 * @text ポップアップの表示
 * @desc ポップアップの表示を選択します。
 * @type select
 * @option ポップアップする
 * @value 0
 * @option ポップアップしない
 * @value 1
 * @option 付与時のみポップアップしない
 * @value 2
 * @option 解除時のみポップアップしない
 * @value 3
 * @default 0
 * 
 * @param PopUpWidth
 * @desc ポップアップメッセージ幅を指定します。（デフォルト240）
 * @text メッセージ幅
 * @type number
 * @default 240
 * 
 * @param PopupColor
 * @desc ポップアップカラー。(システムカラーまたはカラーコード(テキストタブ))
 * @text ポップアップ文字色
 * @type color
 * @default 0
 * 
 * @param PopupIconIndex
 * @desc ポップアップのアイコンID。
 * @text ポップアップアイコンID
 * @type icon
 * @default 0
 * 
 * @param PopupFontSize
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ
 * @type number
 * @default 4
 * @min -99
 * 
 * @param PopupFontFace
 * @desc 任意のフォントを指定します。(拡張子なし)
 * @text テキスト部のフォント
 * @type string
 * @default 
 * 
 * @param PopUpImges
 * @desc ポップアップファイル名を指定します。
 * @text ポップアップ画像
 * @type file
 * @dir img/
 * @default 
 * 
 * @param PopupMode
 * @text 適用するポップアッププラグイン
 * @desc 適用させるポップアッププラグインを指定をします。プラグインが見つからない場合はデフォルトになります。
 * @type combo
 * @option 'Default'
 * @option 'LateralBoundPopUp'
 * @option 'UpFadeoutPopup'
 * @option 'SlideFadeoutPopup'
 * @default 'Default'
 * 
 */
/*~struct~PopUpBuffData:ja
 * 
 * @param PopUpText
 * @desc ポップアップテキスト。%1:ポップアップするステータス名
 * @text ポップアップテキスト
 * @type string[]
 * @default ["%1","%1"]
 * 
 * @param RemovePopUpText
 * @desc 解除時または消失時ポップアップテキスト。%1:ポップアップするステータス名
 * @text 解除時、消失時ポップアップテキスト
 * @type string[]
 * @default ["%1","%1"]
 * 
 * @param PopUpPattern
 * @text ポップアップの表示
 * @desc ポップアップの表示を選択します。
 * @type select
 * @option ポップアップする
 * @value 0
 * @option ポップアップしない
 * @value 1
 * @option 付与時のみポップアップしない
 * @value 2
 * @option 解除時のみポップアップしない
 * @value 3
 * @default 0
 * 
 * @param PopUpWidth
 * @desc ポップアップメッセージ幅を指定します。（デフォルト240）
 * @text メッセージ幅
 * @type number
 * @default 240
 * 
 * @param PopupColor
 * @desc ポップアップカラー。(システムカラーまたはカラーコード(テキストタブ))
 * @text ポップアップ文字色
 * @type color[]
 * @default []
 * 
 * @param PopupIconIndex
 * @desc ポップアップのアイコンID。
 * @text ポップアップアイコンID
 * @type icon[]
 * @default []
 * 
 * @param PopupFontSize
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ
 * @type number
 * @default 4
 * @min -99
 * 
 * @param PopupFontFace
 * @desc 任意のフォントを指定します。(拡張子なし)
 * @text テキスト部のフォント
 * @type string
 * @default 
 * 
 * @param PopUpImges
 * @desc ポップアップファイル名を指定します。
 * @text ポップアップ画像
 * @type file[]
 * @dir img/
 * @default 
 * 
 * @param PopupMode
 * @text 適用するポップアッププラグイン
 * @desc 適用させるポップアッププラグインを指定をします。プラグインが見つからない場合はデフォルトになります。
 * @type combo
 * @option 'Default'
 * @option 'LateralBoundPopUp'
 * @option 'UpFadeoutPopup'
 * @option 'SlideFadeoutPopup'
 * @default 'Default'
 * 
 */

var Imported = Imported || {};
Imported.NUUN_PopupEx = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    class PopupData {
        constructor(state) {
            this._state = state;
            this._name = '';
            this._status = null;
            this._buffLevel = 0;
        }

        setup(status) {
            this._status = status;
            switch (this._state) {
                case "addState":
                case "removedState":
                    this.setupState(status);
                    break;
                case "addBuff":
                    this.setupBuff(status);
                    break;
                case "addDebuff":
                    this.setupDebuff(status);
                    break;
                case "removedBuff":
                    this.removedBuff(status);
                    break;
                case "removedDebuff":
                    this.removedDeDebuff(status);
                    break;
                case "critical":
                case "miss":
                case "avoid":
                case "resistance":
                case "weakness":
                case "invalid":
                case "defeat":
                case "counter":
                case "reflection":
                case "substitute":
                    this.setupPopup(status);
                    break;
                case "getSteal":
                    this.setupGetSteal(status);
                    break;
                case "stolenName":
                    this.setupStolen(status);
                    break;
                case "getGold":
                    this.setupStealGold(status);
                    break;
                case "stolenGold":
                    this.setupStolenGold(status);
                    break;
                case "learn":
                    this.setupLearn(status);
                    break;
            }
        }

        setupBuffs(battler, status) {
            this.setup(status);
            this._buffLevel = battler.buff(status);
        }

        setupRemovedBuffs(battler, status) {
            this.setup(status);
            this._buffLevel = battler.result().buffLevel[status];
        }

        setupSteal(battler, status) {
            this.setup(status);
        }

        isPopup() {
            return !!this._data;
        }

        setupState(status) {
            const data = this.getBadState(status);
            this._data = !!data ? data : this.getPopUpAdvantageousState(status);
            if (this._data) {
                this._name = this.getPopupStateText(status);
            }
        }

        setupBuff(status) {
            const data = params.BuffPopUp.find(buff => buff.StateType === status);
            this._data = data ? data.PopUpData : _noneBuffPopupData();
            if (this._data) {
                this._name = this.getPopupBuffText(status);
            }
        }
        
        setupDebuff(status) {
            const data = params.DebuffPopUp.find(buff => buff.StateType === status);
            this._data = data ? data.PopUpData : _noneBuffPopupData();
            if (this._data) {
                this._name = this.getPopupBuffText(status);
            }
        }

        removedBuff(status) {
            const data = params.BuffPopUp.find(buff => buff.StateType === status);
            this._data = data ? data.PopUpData : _noneBuffPopupData();
            if (this._data) {
                this._name = this.getPopupBuffText(status);
            }
        }

        removedDeDebuff(status) {
            const data = params.DebuffPopUp.find(buff => buff.StateType === status);
            this._data = data ? data.PopUpData : _noneBuffPopupData();
            if (this._data) {
                this._name = this.getPopupBuffText(status);
            }
        }

        setupPopup(status) {
            this._data = this.getPopupData();
            if (this._data) {
                this._name = this.getPopupText(status);
            }
        }

        setupGetSteal(status) {
            this._data = NuunManager.getStealPopupParams();
            if (this._data) {
                this._name = this.getPopupStealText(status);
            }
        }

        setupStolen(status) {
            this._data = NuunManager.getStealPopupParams();
            if (this._data) {
                this._name = this.getPopupStolenText(status);
            }
        }

        setupStealGold(status) {
            this._data = NuunManager.getStealGoldPopupParams();
            if (this._data) {
                this._name = this.getPopupStealGoldText(status);
            }
        }

        setupStolenGold(status) {
            this._data = NuunManager.getStealGoldPopupParams();
            if (this._data) {
                this._name = this.getPopupStolenGoldText(status);
            }
        }

        setupLearn(status) {
            this._data = NuunManager.getSkillLearningPopupParams();
            if (this._data) {
                this._name = this.getPopupSkillLearningText(status);
            }
        }

        getPopupText(status) {
            return this._data.PopUpText.format(this.getPopupTextParams(status));
        }

        getPopupStateText(status) {
            if (status.meta.PopUpStateName) {
                return status.meta.PopUpStateName.format(status.name);
            } else if (this._state === "removedState" && this._data.RemovePopUpText) {
                return this._data.RemovePopUpText.format(status.name);
            } else if (this._state === "addState" && this._data.PopUpText) {
                return this._data.PopUpText.format(status.name);
            }
            return status.name;
        }

        getBadState(state) {
            let find = null;
            if (state.meta.BatStatePopupId) {
                find = params.PopUpBadState[Number(NuunManager.getMetaCode(state, "BatStatePopupId")) - 1];
            }
            if (!find) {
                find = params.PopUpBadState.find(data => data.State === state.id);
            }
            return !!find ? find.PopUpData : null;
        }

        getPopUpAdvantageousState(state) {
            let find = null;
            if (state.meta.StatePopupId) {
                find = params.PopUpAdvantageousState[Number(NuunManager.getMetaCode(state, "StatePopupId")) - 1];
            }
            if (!find) {
                find = params.PopUpAdvantageousState.find(data => data.State === state.id);
            }
            return !!find ? find.PopUpData : _noneStatePopupData();
        }

        getPopupBuffText(status) {
            const buffLevel = this.arrayBuffLevel();
            if ((this._state === "addBuff" || this._state === "addDebuff") && this._data.PopUpText && this._data.PopUpText[buffLevel]) {
                return this._data.PopUpText[buffLevel].format(this.getPopupBuffTextName(status));
            } else if ((this._state === "removedBuff" || this._state === "removedDebuff") && this._data.RemovePopUpText && this._data.RemovePopUpText[buffLevel]) {
                return this._data.RemovePopUpText[buffLevel].format(this.getPopupBuffTextName(status));
            }
            return TextManager.param(status);
        }

        getPopupStealText(status) {
            return this._data.PopUpText.format(status.name);
        }

        getPopupStolenText(status) {
            return this._data.StolenPopUpText.format(status.name);
        }

        getPopupStealGoldText(status) {
            return this._data.PopUpText.format(status.name);
        }

        getPopupStolenGoldText(status) {
            return this._data.StolenPopUpText.format(status.name);
        }

        getPopupSkillLearningText(status) {
            return this._data.PopUpText.format(status.skillName);
        }

        getPopupBuffTextName(status) {
            return TextManager.param(status);
        }

        getPopupData() {
            switch (this._state) {
                case "critical":
                    return params.PopUpCritical;
                case "miss":
                    return params.PopUpMiss;
                case "avoid":
                    return params.PopUpAvoid;
                case "resistance":
                    return params.PopUpResistance;
                case "weakness":
                    return params.PopUpWeakness;
                case "invalid":
                    return params.PopUpInvalid;
                case "defeat":
                    return params.PopUpDefeat;
                case "counter":
                    return params.PopUpCounter;
                case "reflection":
                    return params.PopUpReflection;
                case "substitute":
                    return params.PopUpSubstitute;
            }
        }

        getPopupTextParams(status) {
            switch (this._state) {
                case "critical":
                    return "Critical";
                case "resistance":
                    return "Resistance";
                case "weakness":
                    return "Weakness";
                case "invalid":
                    return "Invalid"
                case "avoid":
                    return "Avoid";
                case "miss":
                    return "Miss";
                case "defeat":
                    return "Defeat";
                case "counter":
                    return "Counter";
                case "reflection":
                    return "Reflection";
                case "substitute":
                    return "Substitute";
            }
        }

        name() {
            return this._name;
        }

        color() {
            if (this.isBuffPopup()) {
                const buffLevel = this.arrayBuffLevel();
                return this._data.PopupColor && this._data.PopupColor[buffLevel] !== undefined ? this._data.PopupColor[buffLevel] : 0;
            } else if (!(this._status && this._status.meta)) {
                return this._data.PopupColor;
            } else {
                return this._status.meta.PopUpColor ? this._status.meta.PopUpColor : this._data.PopupColor;
            }
        }

        popupWidth() {
            return this._data && this._data.PopUpWidth ? this._data.PopUpWidth : 240;
        }

        popUpPattern() {
            return this._data ? this._data.PopUpPattern : 0;
        }

        opacity() {
            return this.isRemoved() ? params.PopUpReleaseOpacity : 255;
        }

        isRemoved() {
            return this._state.includes("removed") || this._state.includes("stolen");
        }

        isImges() {
            return !!this.getPopupImges();
        }

        getPopupBitmap() {
            return ImageManager.nuun_LoadPictures(this.getPopupImges());
        }

        getPopupImges() {
            if (this.isBuffPopup()) {
                const buffLevel = this.arrayBuffLevel();
                if (this._data.PopUpImges && this._data.PopupImges[buffLevel]) {
                    return this._data.PopUpImges[buffLevel];
                } else if (this._data.PopUpImges && this._data.PopUpImges[0]) {
                    return this._data.PopUpImges[0];
                } else {
                    return null;
                }
            } else {
                return this._data.PopUpImges;
            }
        }

        iconIndex() {
            if (this.isBuffPopup()) {
                return this.buffIconIndex();
            }
            if (this._data.PopupIconIndex === undefined || this._data.PopupIconIndex < 0) return 0;
            if (!(this._status && this._status.iconIndex)) return this._data.PopupIconIndex;
            return this._data.PopupIconIndex > 0 ? this._data.PopupIconIndex : this._status.iconIndex;
        }

        buffIconIndex() {
            const buffLevel = this.arrayBuffLevel();
            if (!this._data.PopupIconIndex) {
                return 0;
            } else if (this._data.PopupIconIndex[buffLevel] < 0) {
                return 0;
            } else if (this._data.PopupIconIndex[buffLevel] > 0) {
                return this._data.PopupIconIndex[buffLevel]; 
            } else {
                return Game_BattlerBase.prototype.buffIconIndex(this._buffLevel, this._status);
            }
        }

        fontSize() {
            return this._data.PopupFontSize;
        }

        fontFace() {
            return this._data.PopupFontFace ? this._data.PopupFontFace : $gameSystem.mainFontFace();
        }

        arrayBuffLevel() {
            return Math.abs(this._buffLevel) - 1;
        }

        isBuffPopup() {
            switch (this._state) {
                case "addBuff":
                case "addDebuff":
                case "removedBuff":
                case "removedDebuff":
                    return true;
                default:
                    return false;
            }
        }

        getPopupMode() {
            const id = this.CheckPopupClass(this._data.PopupMode);
            let mode = 'Default';
            if (id > 0) return id;
            if (this._state.includes("State")) {
                mode = params.DefaultStatePopup;
            } else if (this._state.includes("Buff") || this._state.includes("Debuff")) {
                mode = params.DefaultBuffPopup;
            }
            return this.CheckPopupClass(mode);
        }

        CheckPopupClass(mode) {
            if (mode === 'Default') return 0;
            switch (mode) {
                case 'LateralBoundPopUp':
                    return 1;
                case 'SlideFadeoutPopup':
                    return 2;
                case 'UpFadeoutPopup':
                    return 3;
                default:
                    return 0;
            }
        }
    }
    window.PopupData = PopupData;

    const _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
    Game_Action.prototype.applyItemUserEffect = function(target) {
        _Game_Action_applyItemUserEffect.apply(this, arguments);
        const result = target.result();
        if (result.isHit()) {
            this.popupElement(target, result);
        }
    };

    Game_Action.prototype.popupElement = function(target, result) {
        const rate = this.calcElementRate(target);
        if (rate === 0) {
            result.elementRate = "invalid";
        } else if (rate < 1.0) {
            result.elementRate = "resistance";
        } else if (rate > 1.0) {
            result.elementRate = "weakness";
        }
    };


    const _Game_ActionResult_clear = Game_ActionResult.prototype.clear;
    Game_ActionResult.prototype.clear = function() {
        _Game_ActionResult_clear.apply(this, arguments);
        this.elementRate = "";
        this.popupDefeat = false;
        this.buffLevel = [0, 0, 0, 0, 0, 0, 0, 0];
    };


    Game_Battler.prototype.addSetPopUpData = function(data) {
        this.nuun_popupData = data;
    };

    Game_Battler.prototype.clearNuunPopup = function() {
        this.nuun_popupData = null;
    };

    Game_Battler.prototype.isNuunPopupData = function() {
        return !!this.nuun_popupData;
    };

    Game_Battler.prototype.getNuunPopupData = function() {
        return this.nuun_popupData;
    };

    Game_Battler.prototype.shouldPopupDefeat = function() {
        return !!this.result().popupDefeat;
    };

    Game_Battler.prototype.setupRemoveBuffLevel = function(paramId) {
        this.result().buffLevel[paramId] = this._buffs[paramId];
    };


    const _Game_BattlerBase_die = Game_BattlerBase.prototype.die;
    Game_BattlerBase.prototype.die = function() {
        _Game_BattlerBase_die.call(this);
        this.result().popupDefeat = true;
    };

    const _Game_BattlerBase_eraseBuff = Game_BattlerBase.prototype.eraseBuff;
    Game_BattlerBase.prototype.eraseBuff = function(paramId) {
        this.setupRemoveBuffLevel(paramId);
        _Game_BattlerBase_eraseBuff.apply(this, arguments);
    };


    const _Window_BattleLog_displayCritical = Window_BattleLog.prototype.displayCritical;
    Window_BattleLog.prototype.displayCritical = function(target) {
        _Window_BattleLog_displayCritical.apply(this, arguments);
        if (target.result().critical) {
            this.popUpCritical(target);
        }
    };

    const _Window_BattleLog_displayDamage = Window_BattleLog.prototype.displayDamage;
    Window_BattleLog.prototype.displayDamage = function(target) {
        _Window_BattleLog_displayDamage.apply(this, arguments);
        if (target.result().elementRate) {
            this.popUpElementRate(target);
        }
    };

    const _Window_BattleLog_displayMiss = Window_BattleLog.prototype.displayMiss;
    Window_BattleLog.prototype.displayMiss = function(target) {
        _Window_BattleLog_displayMiss.apply(this, arguments);
        if (target.result().missed) {
            this.popUpMissed(target);
        }
    };

    const _Window_BattleLog_displayEvasion = Window_BattleLog.prototype.displayEvasion;
    Window_BattleLog.prototype.displayEvasion = function(target) {
        _Window_BattleLog_displayEvasion.apply(this, arguments);
        if (target.result().evaded) {
            this.popUpAvoid(target);
        }
    };

    const _Window_BattleLog_displayAffectedStatus = Window_BattleLog.prototype.displayAffectedStatus;
    Window_BattleLog.prototype.displayAffectedStatus = function(target) {
        if (target.result().isStatusAffected()) {
            this.popUpState(target);
        }
        if (target.shouldPopupDefeat()) {
            this.popupDefeat(target);
        }
        _Window_BattleLog_displayAffectedStatus.apply(this, arguments);
    };

    const _Window_BattleLog_displayCounter = Window_BattleLog.prototype.displayCounter;
    Window_BattleLog.prototype.displayCounter = function(target) {
        _Window_BattleLog_displayCounter.apply(this, arguments);
        this.popupCounter(target);
    };
    
    const _Window_BattleLog_displayReflection = Window_BattleLog.prototype.displayReflection;
    Window_BattleLog.prototype.displayReflection = function(target) {
        _Window_BattleLog_displayReflection.apply(this, arguments);
        this.popupReflection(target);
    };
    
    const _Window_BattleLog_displaySubstitute = Window_BattleLog.prototype.displaySubstitute;
    Window_BattleLog.prototype.displaySubstitute = function(substitute, target) {
        _Window_BattleLog_displaySubstitute.apply(this, arguments);
        this.popupSubstitute(substitute);
    };

    Window_BattleLog.prototype.popUpCritical = function(target) {
        const popupData = new PopupData("critical");
        popupData.setup();
        this.setupPopup(target, popupData);
    };

    Window_BattleLog.prototype.popUpMissed = function(target) {
        const popupData = new PopupData("miss");
        popupData.setup();
        this.setupPopup(target, popupData);
    };

    Window_BattleLog.prototype.popUpAvoid = function(target) {
        const popupData = new PopupData("avoid");
        popupData.setup();
        this.setupPopup(target, popupData);
    };

    Window_BattleLog.prototype.popupDefeat = function(target) {
        const popupData = new PopupData("defeat");
        popupData.setup();
        this.setupPopup(target, popupData);
    };

    Window_BattleLog.prototype.popUpElementRate = function(target) {
        const popupData = new PopupData(target.result().elementRate);
        popupData.setup();
        this.setupPopup(target, popupData);
    };

    Window_BattleLog.prototype.popupCounter = function(target) {
        const popupData = new PopupData("counter");
        popupData.setup();
        this.setupPopup(target, popupData);
    };

    Window_BattleLog.prototype.popupReflection = function(target) {
        const popupData = new PopupData("reflection");
        popupData.setup();
        this.setupPopup(target, popupData);
    };

    Window_BattleLog.prototype.counterExPopup = function(counter, target) {
        const popupData = new PopupData(counter);
        popupData.setup();
        this.setupPopup(target, popupData);
    };

    Window_BattleLog.prototype.popupSubstitute = function(target) {
        const popupData = new PopupData("substitute");
        popupData.setup();
        this.setupPopup(target, popupData);
    };

    Window_BattleLog.prototype.popUpState = function(target) {
        this.displayPopUpState(target);
        this.displayRemovedPopUpState(target);
        this.displayPopUpBuffs(target);
        this.displayPopUpDebuffs(target);
        this.displayRemovedPopUpBuffs(target);
    };

    Window_BattleLog.prototype.displayPopUpState = function(target) {
        const states = target.result().addedStateObjects();
        for (const state of states) {
            const popupData = new PopupData("addState");
            popupData.setup(state);
            if ((popupData.popUpPattern() === 0 || popupData.popUpPattern() === 3)) {
                this.setupPopup(target, popupData);   
            }
        }
    };

    Window_BattleLog.prototype.displayRemovedPopUpState = function(target) {
        const states = target.result().removedStateObjects();
        for (const state of states) {
            const popupData = new PopupData("removedState");
            popupData.setup(state);
            if ((popupData.popUpPattern() === 0 || popupData.popUpPattern() === 2)) {
                this.setupPopup(target, popupData);   
            }      
        }
    };

    Window_BattleLog.prototype.displayPopUpBuffs = function(target) {
        const buffs = target.result().addedBuffs;
        if (buffs.length > 0) {
            for (const paramId of buffs) {
                const popupData = new PopupData("addBuff");
                popupData.setupBuffs(target, paramId);
                if ((popupData.popUpPattern() === 0 || popupData.popUpPattern() === 3)) {
                    this.setupPopup(target, popupData);
                }
            }
        }
    };

    Window_BattleLog.prototype.displayPopUpDebuffs = function(target) {
        const buffs = target.result().addedDebuffs;
        if (buffs.length > 0) {
            for (const paramId of buffs) {
                const popupData = new PopupData("addDebuff");
                popupData.setupBuffs(target, paramId);
                if ((popupData.popUpPattern() === 0 || popupData.popUpPattern() === 3)) {
                    this.setupPopup(target, popupData);
                }
            }
        }
    };

    Window_BattleLog.prototype.displayRemovedPopUpBuffs = function(target) {
        const result = target.result();
        const buffs = result.removedBuffs;
        if (buffs.length > 0) {
            for (const paramId of buffs) {
                let state = "";
                if (result.buffLevel[paramId] > 0) {
                    state = "removedBuff";
                } else if (result.buffLevel[paramId] < 0) {
                    state = "removedDebuff";
                }
                const popupData = new PopupData(state);
                popupData.setupRemovedBuffs(target, paramId);
                if ((popupData.popUpPattern() === 0 || popupData.popUpPattern() === 2)) {
                    this.setupPopup(target, popupData);
                }
            }

        }
    };

    Window_BattleLog.prototype.setupPopup = function(target, data) {
        if (data.isPopup()) {
            this.push('nuun_popupState', target, data);
        }
    };

    Window_BattleLog.prototype.nuun_popupState = function(target, popup) {
        target.addSetPopUpData(popup);
    };
    

    const _Sprite_Battler_updateDamagePopup = Sprite_Battler.prototype.updateDamagePopup;
    Sprite_Battler.prototype.updateDamagePopup = function() {
        this.setupPopupEx();
        _Sprite_Battler_updateDamagePopup.call(this);
    };

    Sprite_Battler.prototype.setupPopupEx = function() {
        if (this._battler.isNuunPopupData()) {
            if (this._battler.isSpriteVisible()) {
                this.createPopupExSprite();
            }
            this._battler.clearNuunPopup();
        }
    };

    const _Sprite_Battler_createDamageSprite = Sprite_Battler.prototype.createDamageSprite;
    Sprite_Battler.prototype.createDamageSprite = function() {
        const result = this._battler.result();
        if (result.missed || result.evaded) return;
        _Sprite_Battler_createDamageSprite.apply(this, arguments);
    };

    Sprite_Battler.prototype.createPopupExSprite = function() {
        const last = this._damages[this._damages.length - 1];
        const popupData = this._battler.getNuunPopupData();
        const sprite = new Sprite_PopUpEX(popupData);
        if (last && params.PopUpMode === 'default') {
            sprite.x = last.x + 8;
            sprite.y = last.y - 16;
        } else {
            sprite.x = this.x + this.damageOffsetX() + this.damagePopupOffsetX(popupData);
            sprite.y = this.y + this.damageOffsetY() + this.damagePopupOffsetY(popupData);
        }
        if (last) {
            sprite.delay = this._damages.length * Math.max(params.PopUpUpInterval, 1);
            sprite.hide();
        } else {
            sprite.delay = 0;
        }
        sprite.setup(this._battler);
        this._damages.push(sprite);
        this.parent.addChild(sprite);
    };

    Sprite_Battler.prototype.damagePopupOffsetX = function() {
        return 0;
    };
    
    Sprite_Battler.prototype.damagePopupOffsetY = function() {
        return 0;
    };


    function Sprite_PopUpEX() {
        this.initialize(...arguments);
    }
      
    Sprite_PopUpEX.prototype = Object.create(Sprite_Damage.prototype);
    Sprite_PopUpEX.prototype.constructor = Sprite_PopUpEX;
      
    Sprite_PopUpEX.prototype.initialize = function(data) {
        this._popupData = data;
        this._popupMode = data ? data.getPopupMode() : 'Default';
        Sprite_Damage.prototype.initialize.call(this);
    };

    Sprite_PopUpEX.prototype.createBitmap = function(width, height) {
        if (this._popupData && this._popupData.isImges()) {
            return this._popupData.getPopupBitmap();
        } else {
            return Sprite_Damage.prototype.createBitmap.call(this, width, height);
        }
    };

    Sprite_PopUpEX.prototype.destroy = function(options) {
        for (const child of this.children) {
            if (child.bitmap && !child.bitmap.iconImg && !child.bitmap._image) {
                child.bitmap.destroy();
            } else {
                child.bitmap = null;
            }
        }
        Sprite.prototype.destroy.call(this, options);
    };

    Sprite_PopUpEX.prototype.setup = function(battler) {
        this.drawPopup();
    };

    Sprite_PopUpEX.prototype.update = function() {
        if (this.delay > 0) {
            this.delay--;
            if (this.delay <= 0) {
                this.show();
            }
            if (params.PopUpUpInterval > 0) {
                return;
            }
        }
        Sprite_Damage.prototype.update.call(this);
    };

    Sprite_PopUpEX.prototype.drawPopup = function() {
        this.createPopUp();
        this.drawIcon();
    };

    Sprite_PopUpEX.prototype.createPopUp = function() {
        const sprite = this.createChildSprite(this._popupData.popupWidth(), this.fontSize());
        this.opacity = this._popupData.opacity();
        sprite.dy = 0;
        if (!this._popupData.isImges()) {
                let textMargin = 0;
            if (this._popupData.iconIndex() > 0) {
                textMargin = ImageManager.iconWidth + 4;
            }
            this.setDefaultOpacity();
            this._colorType = this._popupData.color();
            sprite.bitmap.textColor = this.damageColor();
            sprite.bitmap.drawText(this._popupData.name(), textMargin, 0, this._popupData.popupWidth() - textMargin, this.fontSize(), "center");
        }
    };

    Sprite_PopUpEX.prototype.drawIcon = function() {
        const iconIndex = this._popupData.iconIndex();
        if (iconIndex > 0) {
            const sprite = this.createChildSprite(ImageManager.iconWidth, this.fontSize());
            sprite.bitmap = ImageManager.loadSystem("IconSet");
            sprite.bitmap.fontSize = this.fontSize();
            const textMargin = Math.min(Math.floor((sprite.bitmap.measureTextWidth(this._popupData.name()) / 2)), Math.floor(this._popupData.popupWidth() / 2) - Math.floor(ImageManager.iconWidth / 2) - 2);
            sprite.bitmap.iconImg = true;
            sprite.dy = 0;
            const pw = ImageManager.iconWidth;
            const ph = ImageManager.iconHeight;
            const sx = (iconIndex % 16) * pw;
            const sy = Math.floor(iconIndex / 16) * ph;
            sprite.setFrame(sx, sy, pw, ph);
            sprite.x -= textMargin;
            sprite.bitmap.y = 2;
        }
    };

    const _Sprite_Damage_updateOpacity = Sprite_Damage.prototype.updateOpacity;
    Sprite_Damage.prototype.updateOpacity = function() {
        if (this._setOpacity !== undefined) {
            if (this._duration < 10) {
                this.opacity = (this.getOpacity() * this._duration) / 10;
            }
        } else {
            _Sprite_Damage_updateOpacity.call(this);
        }
    };

    Sprite_Damage.prototype.setDefaultOpacity = function() {
        this._setOpacity = this.opacity;
    };
    
    Sprite_Damage.prototype.getOpacity = function() {
        return this._setOpacity || 255;
    };

    Sprite_PopUpEX.prototype.fontSize = function() {
        return $gameSystem.mainFontSize() + this._popupData.fontSize() || 4;
    };
    
    Sprite_PopUpEX.prototype.fontFace = function() {
        return this.popupData && this.popupData.fontFace ? this.popupData.fontFace : $gameSystem.mainFontFace();
    };

    Sprite_PopUpEX.prototype.damageColor = function() {
        return NuunManager.getColorCode(this._colorType);
    };

    function _noneStatePopupData() {
        return {
            PopUpText: "%1",
            RemovePopUpText: "%1",
            PopUpPattern: 0,
            PopupColor: 0,
            PopupIconIndex: 0,
            PopupFontSize: 4
        }
    };

    function _noneBuffPopupData() {
        return {
            PopUpText: ["%1","%1"],
            RemovePopUpText: ["%1","%1"],
            PopUpPattern: 0,
            PopupColor: [],
            PopupIconIndex: [],
            PopupFontSize: 4
        }
    };
    
})();