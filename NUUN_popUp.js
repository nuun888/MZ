/*:-----------------------------------------------------------------------------------
 * NUUN_popUp.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc Pop up
 * @author NUUN
 * @version 2.0.6
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 *            
 * @help
 * Pop up the state and buff name when the state and buff are removed.
 * The following popups are possible with this plugin.
 * State, buff, defeat, steal, skill learning
 * 
 * State popup
 * The text to be added is entered in pop-up text.
 * Enter the text at the time of release as pop-up text at the time of release or disappearance.
 * Popup text format
 * %1:State name
 * 
 * state notes
 * <PopUpStateName> State name to popup. If left blank, the database state name will be displayed.
 * <BatState> This state is judged to be a bad state.
 * <NoPopUp> Don't show popups.
 * <AddNoPopUp> Do not display the popup when granting.
 * <RemoveNoPopUp> Do not display the popup when the state is released.
 * <PopUpColor:[colorIndex]> Specifies the popup color. [colorIndex]: Color index number or color code.
 * Example: <PopUpColor: 17>
 * <StatePopupImg:[fileName]> Enter an image file directly under the img folder without an extension for the image when the state pops up.
 * <BadStatePopupImg:[fileName]> Enter the image file directly under the img folder without an extension for the image at the time of the popup of the disadvantageous state.
 * 
 * Buff popup
 * The text to be added is entered in pop-up text.
 * Enter the text when releasing with "Popup text on release, disappearance".
 * Popup text format
 * %1:Buff name
 * 
 * Popup defeated
 * Enter only the pop-up text for the text at the time of defeat.
 * 
 * Steal popup
 * Separate "NUUN_StealableItems" is required.
 * 
 * Enter the text at the time of acquisition in pop-up text.
 * Enter the text when releasing with "Popup text on release, disappearance".
 * Popup text format
 * %1: Item name, Gold
 * 
 * Popup learning skills
 * Separately, "NUUN_SkillLearning" Ver.1.1.2 or later is required.
 * 
 * Enter the text at the time of learning in "Popup text".
 * Popup text format
 * %1:Skill name
 * 
 * Specification
 * When used with "BattleEffectPopup", if this plug-in is set below "BattleEffectPopup", state and buff popups will be displayed with this plug-in.
 * If you want to change the popup type for each popup, remove 'Sprite_PopUpEX' from the applicable class of each popup plugin.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 9/14/2024 Ver 2.0.6
 * Fixed an issue where the popup for buffs and debuffs would not appear when removed.
 * 7/13/2023 Ver 2.0.5
 * Fixed an issue where an error popped up in "NUUN_StealableItems".
 * 5/22/2023 Ver 2.0.4
 * Fixed an issue where an error would occur when canceling a state with an event command.
 * 5/21/2023 Ver 2.0.3
 * Fixed an issue that caused an error when adding or removing states with event commands.
 * 5/21/2023 Ver 2.0.2
 * Fixed to pop up even when adding or canceling state with event command.
 * Fixed user popup not showing when used with certain plugins.
 * 3/27/2023 Ver 2.0.1
 * Fixed an issue where the icon would not display properly when adding an ability reduction to an ability increase or vice versa.
 * 12/28/2022 Ver 2.0.0
 * Major overhaul of plugin parameters.
 * Pop-up support when learning skills in skill learning.
 * Added the ability to display images for state, buff, and kill popups.
 * Changed the display in languages other than Japanese to English.
 * 12/15/2022 Ver 1.3.2
 * Fixes for conflicts
 * 12/5/2022 Ver 1.3.1
 * Added function to display in specified popup.
 * Added function to set coordinates and font size.
 * 12/4/2022 Ver 1.3.0
 * Added function to display popup when defeated.
 * Fixed the problem that the color code cannot be obtained properly.
 * 6/18/2022 Ver 1.2.2
 * Change definition for horizontal bound popup class application function implementation.
 * 6/18/2022 Ver 1.2.1
 * Minor fixes.
 * 6/14/2022 Ver 1.2.0
 * Support popup when stealing. (requires NUUN_StealableItems)
 * 5/2/2022 Ver 1.1.3
 * Fixed an issue where the buff releasing common popup text was not being applied correctly.
 * Fixed an issue where the buff releasing popup was not displaying properly.
 * Defined by applying horizontal bounce popup, adding plugin parameters.
 * 5/2/2022 Ver 1.1.2
 * Fixed an issue where the popup color did not change.
 * Modified to be able to specify color code for popup color.
 * 5/1/2022 Ver 1.1.1
 * Fixed the problem that an error appears when releasing the state.
 * Added a function that allows you to specify the popup display method (default, fixed).
 * /4/30/2022 Ver 1.1.0
 * Conflict resolution with some plugins.
 * Processing optimization.
 * Specification change of popup text.
 * 7/17/2021 Ver 1.0.1
 * Compatibility mode support for battle style expansion plug-ins.
 * 7/17/2021 Ver 1.0.0
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
 * @param PopUpWidth
 * @desc Specifies the popup message width. (default 240)
 * @text Popup message width
 * @type number
 * @default 240
 * @parent CommonSetting
 * 
 * @param PopUpReleaseOpacity
 * @desc Opacity when released.
 * @text Opacity when released
 * @type number
 * @default 128
 * @parent CommonSetting
 * 
 * @param PopUpUpInterval
 * @desc Interval when popups are displayed continuously.
 * @text Ppopup interval
 * @type number
 * @default 30
 * @parent CommonSetting
 * 
 * @param StatePopUpSetting
 * @text State popup
 * @default ------------------------------
 * 
 * @param PopUpAdvantageousState
 * @text Advantageous state popup settings
 * @desc Set the advantageous state that popup.
 * @default {"PopUpText":"%1","RemovePopUpText":"%1","PopupColor":"0","PopupIconIndex":"0","PopupMode":"","PopupEnemyX":"0","PopupEnemyY":"0","PopupFontSize":"4","PopupFontFace":""}
 * @type struct<PopUpData>
 * @parent StatePopUpSetting
 * 
 * @param PopUpBadState
 * @text Bad state popup settings
 * @desc Set the bad state that pops up.
 * @default {"PopUpText":"%1","RemovePopUpText":"%1","PopupColor":"0","PopupIconIndex":"0","PopupMode":"","PopupEnemyX":"0","PopupEnemyY":"0","PopupFontSize":"4","PopupFontFace":""}
 * @type struct<PopUpData>
 * @parent StatePopUpSetting
 * 
 * @param DeadNoPopup
 * @text Incapacitated popup display
 * @desc Displays a pop-up when incapacitated.
 * @type boolean
 * @default false
 * @parent StatePopUpSetting
 * 
 * @param BuffPopUpSetting
 * @text Buff, debuff popup
 * @default ------------------------------
 * 
 * @param AppliBuffPopUp
 * @text Popup buff setting
 * @desc Set the buff that pops up.
 * @default ["{\"StateType\":\"0\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}","{\"StateType\":\"1\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}","{\"StateType\":\"2\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}","{\"StateType\":\"3\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}","{\"StateType\":\"4\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}","{\"StateType\":\"5\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}","{\"StateType\":\"6\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}","{\"StateType\":\"7\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}","{\"StateType\":\"10\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}","{\"StateType\":\"11\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}","{\"StateType\":\"12\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}","{\"StateType\":\"13\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}","{\"StateType\":\"14\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}","{\"StateType\":\"15\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}","{\"StateType\":\"16\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}","{\"StateType\":\"17\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}"]
 * @type struct<PopUpBuffList>[]
 * @parent BuffPopUpSetting
 * 
 * @param PopUpBuff
 * @text Buff popup settings
 * @desc Set the buff that popup.
 * @default {"PopUpText":"%1","RemovePopUpText":"%1","PopupColor":"0","PopupIconIndex":"0","PopupMode":"","PopupEnemyX":"0","PopupEnemyY":"0","PopupFontSize":"4","PopupFontFace":""}
 * @type struct<PopUpData>
 * @parent BuffPopUpSetting
 * 
 * @param PopUpDebuff
 * @text Debuff popup settings
 * @desc Sets the debuff that popup.
 * @default {"PopUpText":"%1","RemovePopUpText":"%1","PopupColor":"0","PopupIconIndex":"0","PopupMode":"","PopupEnemyX":"0","PopupEnemyY":"0","PopupFontSize":"4","PopupFontFace":""}
 * @type struct<PopUpData>
 * @parent BuffPopUpSetting
 * 
 * @param DefeatPopUpSetting
 * @text Popup when defeated
 * @default ------------------------------
 * 
 * @param DefeatShowPopup
 * @text 撃破時ポップアップ表示
 * @desc 撃破時のポップアップを表示します。
 * @type boolean
 * @default false
 * @parent DefeatPopUpSetting
 * 
 * @param PopUpDefeat
 * @text Popup display when defeated
 * @desc Set up the pop-up when defeating.
 * @default {"PopUpText":"Defeat!","RemovePopUpText":"","PopupColor":"0","PopupIconIndex":"0","PopupMode":"","PopupEnemyX":"0","PopupEnemyY":"0","PopupFontSize":"4","PopupFontFace":""}
 * @type struct<PopUpData>
 * @parent DefeatPopUpSetting
 * 
 * @param PopUpDefeatImg
 * @desc Specify the pop-up file name when defeating.
 * @text Defeat popup image
 * @type file
 * @dir img/
 * @default 
 * @parent DefeatPopUpSetting
 * 
 * @param StealPopupSetting
 * @text Steal settings (requires NUUN_StealableItems)
 * @default ------------------------------
 * 
 * @param StealShowPopup
 * @type boolean
 * @default false
 * @text Steal popup display
 * @desc Show popup when stealing. (requires NUUN_StealableItems)
 * @parent StealPopupSetting
 * 
 * @param PopUpSteal
 * @text Steal popup settings
 * @desc Set the popup when you steal an item.
 * @default {"PopUpText":"%1","RemovePopUpText":"%1","PopupColor":"0","PopupIconIndex":"0","PopupMode":"","PopupEnemyX":"0","PopupEnemyY":"0","PopupFontSize":"4","PopupFontFace":""}
 * @type struct<PopUpData>
 * @parent StealPopupSetting
 * 
 * @param PopUpGoldSteal
 * @text Money stealing popup settings
 * @desc Set the pop-up when you steal money.
 * @default {"PopUpText":"%1","RemovePopUpText":"%1","PopupColor":"0","PopupIconIndex":"0","PopupMode":"","PopupEnemyX":"0","PopupEnemyY":"0","PopupFontSize":"4","PopupFontFace":""}
 * @type struct<PopUpData>
 * @parent StealPopupSetting
 * 
 * @param SkillLearningPopupSetting
 * @text Skill learning settings (requires NUUN_SkillLearning)
 * @default ------------------------------
 * 
 * @param SkillLearningShowPopup
 * @type boolean
 * @default false
 * @text Skill learning Popup Display
 * @desc Displays a popup when learning skills. (requires NUUN_SkillLearning)
 * @parent SkillLearningPopupSetting
 * 
 * @param PopUpSkillLearning
 * @text Skill learning popup settings
 * @desc Configure settings for skill learning that pops up.
 * @default {"PopUpText":"%1","RemovePopUpText":"","PopupColor":"0","PopupIconIndex":"0","PopupMode":"","PopupEnemyX":"0","PopupEnemyY":"0","PopupFontSize":"4","PopupFontFace":""}
 * @type struct<PopUpData>
 * @parent SkillLearningPopupSetting
 * 
 */
/*~struct~PopUpData:
 * 
 * @param PopUpText
 * @desc Popup text.
 * @text Popup text
 * @type string
 * @default %1
 * 
 * @param RemovePopUpText
 * @desc Popup text on release, disappearance.
 * @text Popup text on release, disappearance
 * @type string
 * @default %1
 * 
 * @param PopupColor
 * @desc Popup color. (system color or color code (text tab))
 * @text Popup Color
 * @type color
 * @default 0
 * 
 * @param PopupIconIndex
 * @desc Popup icon index.
 * @text Popup icon index
 * @type icon
 * @default 0
 * 
 * @param PopupMode
 * @text Popup plugin to apply
 * @desc Specify the popup plugin to apply.
 * @default 
 * @type struct<PopupMode>
 * 
 * @param PopupEnemyX
 * @desc Enemy popup X coordinate. (relative)
 * @text Enemy popup X coordinate (relative)
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param PopupEnemyY
 * @desc Enemy popup Y coordinate (relative)
 * @text Enemy popup Y coordinate. (relative)
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param PopupFontSize
 * @desc Font size (difference from main font)
 * @text Font size
 * @type number
 * @default 4
 * @min -99
 * 
 * @param PopupFontFace
 * @desc Specify any font. (no extension)
 * @text Text font
 * @type string
 * @default 
 * 
 */
/*~struct~PopUpBuffList:
 * 
 * @param StateType
 * @text Buff popup
 * @desc Specifies the buff to popup.
 * @type select
 * @option HP up
 * @value 0
 * @option MP up
 * @value 1
 * @option ATK up
 * @value 2
 * @option DEF up
 * @value 3
 * @option MAT up
 * @value 4
 * @option MDF up
 * @value 5
 * @option AGI up
 * @value 6
 * @option Luk up
 * @value 7
 * @option HP down
 * @value 10
 * @option MP down
 * @value 11
 * @option ATK down
 * @value 12
 * @option DEF down
 * @value 13
 * @option MAT down
 * @value 14
 * @option MDF down
 * @value 15
 * @option AGI down
 * @value 16
 * @option LUK down
 * @value 17
 * @default 0
 * 
 * @param PopUpName
 * @text Popup name
 * @desc Enter the name that pops up. If there is no entry, the original parameter name will be displayed.
 * @type string
 * @default
 * 
 * @param PopUpBuffColor
 * @desc Text color of popup (system color or color code (Text tab))
 * @text Text color
 * @type color
 * @default 0
 * 
 * @param BuffPopUpMode
 * @text Show popup
 * @desc Select Show Popup.
 * @type select
 * @option Show popup
 * @value 0
 * @option don't popup
 * @value 1
 * @option Do not popup only when granting
 * @value 2
 * @option Do not pop up only when releasing
 * @value 3
 * @default 0
 * 
 * @param PopUpBuffImg
 * @desc Specifies the buff popup file name.
 * @text buff popup image
 * @type file
 * @dir img/
 * @default 
 * 
 */
/*~struct~PopupMode:
 * 
 * @param Mode
 * @text Apply Popup Settings
 * @desc Specifies the popup plugin to apply.
 * @type combo
 * @option 'Default'
 * @option 'LateralBoundPopUp'
 * @option 'UpFadeoutPopup'
 * @option 'SlideFadeoutPopup'
 * @default 'Default'
 * 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc ポップアップ
 * @author NUUN
 * @version 2.0.6
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 *            
 * @help
 * ステート、バフ付加解除時にステート、バフ名をポップアップさせます。
 * このプラグインでは以下のポップアップができます。
 * ステート、バフ、撃破時、盗み時、スキルラーニング
 * 
 * ステートのポップアップ
 * 付加時のテキストはポップアップテキストで記入します。
 * 解除時のテキストは解除時、消失時ポップアップテキストで記入します。
 * ポップアップテキストフォーマット
 * %1:ステート名
 * 
 * ステートのメモ欄
 * <PopUpStateName> ポップアップするステート名。無記入の場合はデータベースのステート名が表示されます。
 * <BatState> このステートは悪いステートと判定します。
 * <NoPopUp> ポップアップを表示しません。
 * <AddNoPopUp> 付与時のポップアップを表示しません。
 * <RemoveNoPopUp> 解除時のポップアップを表示しません。
 * <PopUpColor:[colorIndex]> ポップアップ時の色を指定します。[colorIndex]:カラーインデックス番号またはカラーコード　例：<PopUpColor:17>
 * <StatePopupImg:[fileName]> ステートのポップアップ時の画像を、imgフォルダ直下の画像ファイルを拡張子なしで記入します。
 * <BadStatePopupImg:[fileName]> 不利なステートのポップアップ時の画像を、imgフォルダ直下の画像ファイルを拡張子なしで記入します。
 * 
 * バフのポップアップ
 * 付加時のテキストはポップアップテキストで記入します。
 * 解除時のテキストは解除時、消失時ポップアップテキストで記入します。
 * ポップアップテキストフォーマット
 * %1:バフ名
 * 
 * 撃破時のポップアップ
 * 撃破時のテキストはポップアップテキストのみ記入します。
 * 
 * 盗み時のポップアップ
 * 別途「盗みスキル」(NUUN_StealableItems)が必要です。
 * 
 * 入手時のテキストはポップアップテキストで記入します。
 * 消失時のテキストは解除時、消失時ポップアップテキストで記入します。
 * ポップアップテキストフォーマット
 * %1:アイテム名、金額
 * 
 * スキル習得時のポップアップ
 * 別途「スキルラーニング」(NUUN_SkillLearning)Ver.1.1.2以降が必要です。
 * 
 * 習得時のテキストはポップアップテキストで記入します。
 * ポップアップテキストフォーマット
 * %1:スキル名
 * 
 * 仕様
 * 戦闘行動結果ポップアッププラグインと併用時、このプラグインを戦闘行動結果ポップアッププラグインより下に設定した場合、ステート、バフのポップアップ
 * はこのプラグインでの表示になります。
 * 各ポップアップ毎にポップアップの種類を変えたい場合は、各ポップアッププラグインの適用クラスから'Sprite_PopUpEX'を外してください。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/9/14 Ver 2.0.6
 * 解除時のバフ、デバフのポップアップが表示されない問題を修正。
 * 2023/7/13 Ver 2.0.5
 * 盗みスキル、アイテムでのポップアップでエラーが出る問題を修正。
 * 2023/5/22 Ver 2.0.4
 * イベントコマンドでステートを解除するとエラーが出る問題を修正。
 * 2023/5/21 Ver 2.0.3
 * イベントコマンドでのステート付加、解除を行う時にエラーが出る問題を修正。
 * 2023/5/21 Ver 2.0.2
 * イベントコマンドでのステート付加、解除でもポップアップするように修正。
 * 特定のプラグインとの併用で、使用者のポップアップが表示されない問題を修正。
 * 2023/3/27 Ver 2.0.1
 * 能力低下から能力上昇またはその逆で付加した場合、アイコンが正常に表示されない問題を修正。
 * 2022/12/28 Ver 2.0.0
 * プラグインパラメータの大幅な見直し。
 * スキルラーニングでのスキル習得時のポップアップ対応。
 * ステート、バフ、撃破のポップアップを画像を表示できる機能を追加。
 * 日本語以外での表示を英語表示に変更。
 * 2022/12/15 Ver 1.3.2
 * 競合対策
 * 2022/12/5 Ver 1.3.1
 * 指定のポップアップで表示する機能を追加。
 * 座標、フォントサイズを設定できる機能を追加。
 * 2022/12/4 Ver 1.3.0
 * 撃破したときのポップアップを表示する機能を追加。
 * カラーコードを正常に取得できない問題を修正。
 * 2022/6/18 Ver 1.2.2
 * 横バウンドポップアップクラス毎適用機能実装のための定義変更。
 * 2022/6/18 Ver 1.2.1
 * 微修正。
 * 2022/6/14 Ver 1.2.0
 * 盗み時のポップアップに対応。(要NUUN_StealableItems)
 * 2022/5/2 Ver 1.1.3
 * バフ解除時の共通ポップアップのテキストが正常に適用されていなかった問題を修正。
 * バフ解除時のポップアップが正常に表示されていなかった問題を修正。
 * 横バウンドポップアップ適用による定義、プラグインパラメータの追加。
 * 2022/5/2 Ver 1.1.2
 * ポップアップ色が変わらない問題を修正。
 * ポップアップ色にカラーコードでも指定できるように修正。
 * 2022/5/1 Ver 1.1.1
 * ステート解除時にエラーが出る問題を修正。
 * ポップアップの表示方法を指定（デフォルト、固定）できる機能を追加。
 * 2022/4/30 Ver 1.1.0
 * 一部プラグインとの競合解消。
 * 処理の最適化。
 * ポップアップテキストの仕様変更。
 * 2021/7/17 Ver 1.0.1
 * バトルスタイル拡張プラグインの互換モード対応。
 * 2021/7/17 Ver 1.0.0
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
 * @param PopUpWidth
 * @desc ポップアップメッセージ幅を指定します。（デフォルト240）
 * @text メッセージ幅
 * @type number
 * @default 240
 * @parent CommonSetting
 * 
 * @param PopUpReleaseOpacity
 * @desc 解除時の不透明度
 * @text 解除時不透明度
 * @type number
 * @default 128
 * @parent CommonSetting
 * 
 * @param PopUpUpInterval
 * @desc ポップアップを連続で表示するときの間隔
 * @text ポップアップ間隔
 * @type number
 * @default 30
 * @parent CommonSetting
 * 
 * @param StatePopUpSetting
 * @text ステートのポップアップ
 * @default ------------------------------
 * 
 * @param PopUpAdvantageousState
 * @text 有利なステートポップアップ設定
 * @desc ポップアップする有利なステートの設定をします。
 * @default {"PopUpText":"%1","RemovePopUpText":"%1","PopupColor":"0","PopupIconIndex":"0","PopupMode":"","PopupEnemyX":"0","PopupEnemyY":"0","PopupFontSize":"4","PopupFontFace":""}
 * @type struct<PopUpData>
 * @parent StatePopUpSetting
 * 
 * @param PopUpBadState
 * @text 不利なステートポップアップ設定
 * @desc ポップアップする不利なステートの設定をします。
 * @default {"PopUpText":"%1","RemovePopUpText":"%1","PopupColor":"0","PopupIconIndex":"0","PopupMode":"","PopupEnemyX":"0","PopupEnemyY":"0","PopupFontSize":"4","PopupFontFace":""}
 * @type struct<PopUpData>
 * @parent StatePopUpSetting
 * 
 * @param DeadNoPopup
 * @text 戦闘不能ポップアップ表示
 * @desc 戦闘不能のポップアップを表示します。
 * @type boolean
 * @default false
 * @parent StatePopUpSetting
 * 
 * @param BuffPopUpSetting
 * @text バフ、デバフのポップアップ
 * @default ------------------------------
 * 
 * @param AppliBuffPopUp
 * @text ポップアップバフ設定
 * @desc ポップアップするバフの設定をします。
 * @default ["{\"StateType\":\"0\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}","{\"StateType\":\"1\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}","{\"StateType\":\"2\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}","{\"StateType\":\"3\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}","{\"StateType\":\"4\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}","{\"StateType\":\"5\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}","{\"StateType\":\"6\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}","{\"StateType\":\"7\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}","{\"StateType\":\"10\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}","{\"StateType\":\"11\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}","{\"StateType\":\"12\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}","{\"StateType\":\"13\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}","{\"StateType\":\"14\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}","{\"StateType\":\"15\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}","{\"StateType\":\"16\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}","{\"StateType\":\"17\",\"PopUpName\":\"\",\"PopUpBuffColor\":\"0\",\"BuffPopUpMode\":\"0\",\"PopUpBuffImg\":\"\"}"]
 * @type struct<PopUpBuffList>[]
 * @parent BuffPopUpSetting
 * 
 * @param PopUpBuff
 * @text バフポップアップ設定
 * @desc ポップアップするバフの設定をします。
 * @default {"PopUpText":"%1","RemovePopUpText":"%1","PopupColor":"0","PopupIconIndex":"0","PopupMode":"","PopupEnemyX":"0","PopupEnemyY":"0","PopupFontSize":"4","PopupFontFace":""}
 * @type struct<PopUpData>
 * @parent BuffPopUpSetting
 * 
 * @param PopUpDebuff
 * @text デバフポップアップ設定
 * @desc ポップアップするデバフの設定をします。
 * @default {"PopUpText":"%1","RemovePopUpText":"%1","PopupColor":"0","PopupIconIndex":"0","PopupMode":"","PopupEnemyX":"0","PopupEnemyY":"0","PopupFontSize":"4","PopupFontFace":""}
 * @type struct<PopUpData>
 * @parent BuffPopUpSetting
 * 
 * @param DefeatPopUpSetting
 * @text 撃破時のポップアップ
 * @default ------------------------------
 * 
 * @param DefeatShowPopup
 * @text 撃破時ポップアップ表示
 * @desc 撃破時のポップアップを表示します。
 * @type boolean
 * @default false
 * @parent DefeatPopUpSetting
 * 
 * @param PopUpDefeat
 * @text 撃破時ポップアップ設定
 * @desc 撃破時のポップアップ設定をします。
 * @default {"PopUpText":"撃破！","RemovePopUpText":"","PopupColor":"0","PopupIconIndex":"0","PopupMode":"","PopupEnemyX":"0","PopupEnemyY":"0","PopupFontSize":"4","PopupFontFace":""}
 * @type struct<PopUpData>
 * @parent DefeatPopUpSetting
 * 
 * @param PopUpDefeatImg
 * @desc 撃破時のポップアップファイル名を指定します。
 * @text 撃破ポップアップ画像
 * @type file
 * @dir img/
 * @default 
 * @parent DefeatPopUpSetting
 * 
 * @param StealPopupSetting
 * @text 盗み設定(要NUUN_StealableItems)
 * @default ------------------------------
 * 
 * @param StealShowPopup
 * @type boolean
 * @default false
 * @text 盗みポップアップ表示
 * @desc 盗み時ポップアップを表示します。（要NUUN_StealableItems）
 * @parent StealPopupSetting
 * 
 * @param PopUpSteal
 * @text 盗み時ポップアップ設定
 * @desc アイテム盗み時のポップアップ設定をします。
 * @default {"PopUpText":"%1","RemovePopUpText":"%1","PopupColor":"0","PopupIconIndex":"0","PopupMode":"","PopupEnemyX":"0","PopupEnemyY":"0","PopupFontSize":"4","PopupFontFace":""}
 * @type struct<PopUpData>
 * @parent StealPopupSetting
 * 
 * @param PopUpGoldSteal
 * @text お金盗み時ポップアップ設定
 * @desc お金盗み時のポップアップ設定をします。
 * @default {"PopUpText":"%1","RemovePopUpText":"%1","PopupColor":"0","PopupIconIndex":"0","PopupMode":"","PopupEnemyX":"0","PopupEnemyY":"0","PopupFontSize":"4","PopupFontFace":""}
 * @type struct<PopUpData>
 * @parent StealPopupSetting
 * 
 * @param SkillLearningPopupSetting
 * @text スキルラーニング設定(要NUUN_SkillLearning)
 * @default ------------------------------
 * 
 * @param SkillLearningShowPopup
 * @type boolean
 * @default false
 * @text スキル習得ポップアップ表示
 * @desc スキル習得時ポップアップを表示します。（要NUUN_SkillLearning）
 * @parent SkillLearningPopupSetting
 * 
 * @param PopUpSkillLearning
 * @text スキル習得ポップアップ設定
 * @desc スキル習得時のポップアップ設定をします。
 * @default {"PopUpText":"%1","RemovePopUpText":"","PopupColor":"0","PopupIconIndex":"0","PopupMode":"","PopupEnemyX":"0","PopupEnemyY":"0","PopupFontSize":"4","PopupFontFace":""}
 * @type struct<PopUpData>
 * @parent SkillLearningPopupSetting
 * 
 */
/*~struct~PopUpData:ja
 * 
 * @param PopUpText
 * @desc ポップアップテキスト。
 * @text ポップアップテキスト
 * @type string
 * @default %1
 * 
 * @param RemovePopUpText
 * @desc 解除時または消失時ポップアップテキスト。
 * @text 解除時、消失時ポップアップテキスト
 * @type string
 * @default %1
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
 * @param PopupMode
 * @text 適用するポップアッププラグイン
 * @desc 適用させるポップアッププラグインを指定をします。
 * @default 
 * @type struct<PopupMode>
 * 
 * @param PopupEnemyX
 * @desc 敵ポップアップX座標(相対)
 * @text 敵ポップアップX座標(相対)
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param PopupEnemyY
 * @desc 敵ポップアップY座標(相対)
 * @text 敵ポップアップY座標(相対)
 * @type number
 * @default 0
 * @min -9999
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
 */
/*~struct~PopUpBuffList:ja
 * 
 * @param StateType
 * @text バフポップアップ
 * @desc ポップアップさせるバフを指定します。
 * @type select
 * @option HP上昇
 * @value 0
 * @option MP上昇
 * @value 1
 * @option 攻撃力上昇
 * @value 2
 * @option 防御力上昇
 * @value 3
 * @option 魔法力上昇
 * @value 4
 * @option 魔法防御上昇
 * @value 5
 * @option 敏捷性上昇
 * @value 6
 * @option 運上昇
 * @value 7
 * @option HP低下
 * @value 10
 * @option MP低下
 * @value 11
 * @option 攻撃力低下
 * @value 12
 * @option 防御力低下
 * @value 13
 * @option 魔法力低下
 * @value 14
 * @option 魔法防御低下
 * @value 15
 * @option 敏捷性低下
 * @value 16
 * @option 運低下
 * @value 17
 * @default 0
 * 
 * @param PopUpName
 * @text ポップアップ名
 * @desc ポップアップする名前を記入します。記入がない場合は共通のパラメータ名が表示されます。
 * @type string
 * @default
 * 
 * @param PopUpBuffColor
 * @desc ポップアップの文字色(システムカラーまたはカラーコード(テキストタブ))
 * @text 文字色
 * @type color
 * @default 0
 * 
 * @param BuffPopUpMode
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
 * @param PopUpBuffImg
 * @desc バフのポップアップファイル名を指定します。
 * @text バフポップアップ画像
 * @type file
 * @dir img/
 * @default 
 * 
 */
/*~struct~PopupMode:ja
 * 
 * @param Mode
 * @text 適用ポップアップ設定
 * @desc 適用するポップアッププラグインを指定します。
 * @type combo
 * @option 'Default'
 * @option 'LateralBoundPopUp'
 * @option 'UpFadeoutPopup'
 * @option 'SlideFadeoutPopup'
 * @default 'Default'
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_popUp = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_popUp');
  const PopUpMode = eval(parameters['PopUpMode']) || 'default';
  const PopUpReleaseOpacity = Number(parameters['PopUpReleaseOpacity'] || 128);
  const PopUpUpInterval = Number(parameters['PopUpUpInterval'] || 30);
  const DeadNoPopup = eval(parameters['DeadNoPopup'] || 'false');
  const PopUpWidth = Number(parameters['PopUpWidth'] || 240);
  const PopUpAdvantageousState = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PopUpAdvantageousState'])) : null);
  const PopUpBadState = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PopUpBadState'])) : null);
  const AppliBuffPopUp = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['AppliBuffPopUp'])) : null) || [];
  const PopUpBuff = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PopUpBuff'])) : null);
  const PopUpDebuff = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PopUpDebuff'])) : null);
  const DefeatShowPopup = eval(parameters['DefeatShowPopup'] || 'false');
  const PopUpDefeat = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PopUpDefeat'])) : null);
  const StealShowPopup = eval(parameters['StealShowPopup'] || 'false');
  const PopUpSteal = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PopUpSteal'])) : null);
  const PopUpGoldSteal = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PopUpGoldSteal'])) : null);
  const SkillLearningShowPopup = eval(parameters['SkillLearningShowPopup'] || 'false');
  const PopUpSkillLearning = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PopUpSkillLearning'])) : null);
  const PopUpDefeatImg = String(parameters['PopUpDefeatImg']);
  let nuunPopup = false;

class PopUpData {
    constructor() {
        this.name = null;
        this.color = 0;
        this.id = 0;
        this.iconIndex = 0;
        this.opacity = 255;
        this.mode = 'Default';
        this.x = 0;
        this.y = 0;
        this.fontsize = 0;
        this.fontFace = null;
        this.image = null;
        this.popupType = "";
    }

    setup(data, id, format, color, icon, opacity, type, image) {
        this.name = format;
        this.color = color;
        this.id = id;
        this.iconIndex = icon;
        this.mode = data.PopupMode ? data.PopupMode.Mode : 'Default';
        this.x = data.PopupEnemyX;
        this.x = data.PopupEnemyX;
        this.y = data.PopupEnemyY;
        this.fontsize = data.PopupFontSize;
        this.fontFace = data.PopupFontFace;
        this.image = image;
        this.opacity = opacity;
        this._onPopup = false;
        this.popupType = type;
        this.onPopup();
    }

    onPopup() {
        this._onPopup = true;
    }

    clearPopup() {
        this._onPopup = false;
    }

    isPopup() {
        return this._onPopup;
    }
};

  const _Game_Battler_initMembers = Game_Battler.prototype.initMembers;
  Game_Battler.prototype.initMembers = function() {
    _Game_Battler_initMembers.call(this);
    this.nuun_popupData = false;
  };

  Game_Battler.prototype.isStatePopupRequested = function() {
    return !!this.nuun_popupData && this.nuun_popupData.isPopup();
  };
  
  Game_Battler.prototype.clearStatePopup = function() {
    this.clearPopUpData();
  };

  Game_Battler.prototype.startStatePopup = function() {
    this.nuun_popupData.onPopup();
  };

  Game_Battler.prototype.addSetPopUpData = function(popup) {
    this.nuun_popupData = popup;
  };

  Game_Battler.prototype.clearPopUpData = function() {
    this.nuun_popupData = null;
  };
  
  Game_Battler.prototype.getPopUpData = function() {
    return this.nuun_popupData;
  };

  const _Game_Battler_removeBuff = Game_Battler.prototype.removeBuff;
  Game_Battler.prototype.removeBuff = function(paramId) {
    this.setBuffLevel(paramId);
    if (this.isAlive() && this.isBuffOrDebuffAffected(paramId)) {
      this._result.pushRemovedDebuff(paramId);
    }
    _Game_Battler_removeBuff.call(this, paramId);
  };

  Game_Battler.prototype.setBuffLevel = function(id) {
    this.result().buffsLevel[id] = this._buffs[id];
  };

  Game_Battler.prototype.popupBuffIconIndex = function(id) {
    if (id < 10) {
      return Game_BattlerBase.ICON_BUFF_START + Math.max((this._buffs[id] - 1), 0) * 8 + id;
    } else {
      return Game_BattlerBase.ICON_DEBUFF_START + Math.max((-this._buffs[id - 10] - 1), 0) * 8 + id - 10;
    }
  };

  Game_Battler.prototype.removePopupBuffIconIndex = function(id) {
    if (id < 10) {
      return Game_BattlerBase.ICON_BUFF_START + (this.removePopupBuffLevel(id) * 8) + id;
    } else {
      return Game_BattlerBase.ICON_DEBUFF_START + (this.removePopupBuffLevel(id) * 8) + id - 10;
    }
  };

  Game_Battler.prototype.removePopupBuffLevel = function(id) {
    return id < 10 ? (this.result().buffsLevel[id] - 1) : Math.abs(this.result().buffsLevel[id - 10]) - 1;
  };

  const _Game_BattlerBase_die = Game_BattlerBase.prototype.die;
  Game_BattlerBase.prototype.die = function() {
    _Game_BattlerBase_die.call(this);
    this.result().defeatPopup = true;
  };

  Game_Battler.prototype.shouldPopupDefeat = function() {
    return !!this._result.defeatPopup;
  };

  Game_Battler.prototype.shouldPopupSkillLearning = function() {
    return !!this._result.learningSkill;
  };

  const _Game_ActionResult_clear = Game_ActionResult.prototype.clear;
  Game_ActionResult.prototype.clear = function() {
    _Game_ActionResult_clear.call(this);
    this.popupData = null;
    this.removedPositiveBuffs = [];
    this.removedDebuffs = [];
    this.buffsLevel = [0, 0, 0, 0, 0, 0, 0, 0];
    this.defeatPopup = false;
  };

  const _Game_ActionResult_pushRemovedBuff = Game_ActionResult.prototype.pushRemovedBuff;
  Game_ActionResult.prototype.pushRemovedBuff = function(paramId) {
    _Game_ActionResult_pushRemovedBuff.call(this, paramId);
    if (this.buffsLevel[paramId] > 0) {
      this.removedPositiveBuffs.push(paramId);
    }
  };

  Game_ActionResult.prototype.pushRemovedDebuff = function(paramId) {
    if (this.buffsLevel[paramId] < 0) {
      this.removedDebuffs.push(paramId);
    }
  };

  Game_ActionResult.prototype.stealPopupText = function(type) {
    switch (type) {
      case 'getSteal':
        return PopUpSteal.PopUpText;
      case 'stolenName':
        return PopUpSteal.RemovePopUpText;
      case 'getGold':
        return PopUpGoldSteal.PopUpText;
      case 'stolenGold':
        return PopUpGoldSteal.RemovePopUpText;
    }
  };


  const _Window_BattleLog_pushPopupMessage = Window_BattleLog.prototype.pushPopupMessage;
  Window_BattleLog.prototype.pushPopupMessage = function(target, popUp) {
    if (!nuunPopup) {
      _Window_BattleLog_pushPopupMessage.call(this, target, popUp);
    }
  };

  const _Window_BattleLog_displayAffectedStatus = Window_BattleLog.prototype.displayAffectedStatus;
  Window_BattleLog.prototype.displayAffectedStatus = function(target) {
    if (target.result().isStatusAffected()) {
      this.displayPopUpState(target);
    }
    if (DefeatShowPopup && target.shouldPopupDefeat()) {
      this.displayAffectedDefeat(target);
    }
    nuunPopup = true;
    _Window_BattleLog_displayAffectedStatus.call(this, target);
    nuunPopup = false;
  };
  
  Window_BattleLog.prototype.displayPopUpState = function(target) {
    const result = target.result();
      this.displayAddedPopUpState(target);
      this.displayRemovedPopUpState(target);
      this.displayPopUpBuffs(target, result.addedBuffs, false);
      this.displayPopUpBuffs(target, result.addedDebuffs, true);
      this.displayRemovedPopUpBuffs(target, result.removedPositiveBuffs, false);
      this.displayRemovedPopUpBuffs(target, result.removedDebuffs, true);
  };

  Window_BattleLog.prototype.displayAddedPopUpState = function(target) {
    const states = target.result().addedStateObjects();
    for (const state of states) {
      if (this.displayDeadPopup(target, state) && !state.meta.NoPopUp && !state.meta.AddNoPopUp) {
        const data = this.isBadState(state) ? PopUpBadState : PopUpAdvantageousState;
        if (data) {
          const color = this.setupStatePopUpColor(state, data);
          const name = state.meta.PopUpStateName ? state.meta.PopUpStateName : state.name;
          const iconIndex = data.PopupIconIndex > 0 ? data.PopupIconIndex : state.iconIndex;
          const img = this.isBadState(state) ? state.meta.BadStatePopupImg : state.meta.StatePopupImg;
          this.setupPopup(target, data, state.id, data.PopUpText.format(name), color, iconIndex, 255, 'State', img);
        }
      }
    }
  };

  Window_BattleLog.prototype.displayRemovedPopUpState = function(target) {
    const states = target.result().removedStateObjects();
    for (const state of states) {
      if (this.displayDeadPopup(target, state) && !state.meta.NoPopUp && !state.meta.RemoveNoPopUp) {
        const data = this.isBadState(state) ? PopUpBadState : PopUpAdvantageousState;
        if (data) {
          const color = this.setupStatePopUpColor(state, data);
          const name = state.meta.PopUpStateName ? state.meta.PopUpStateName : state.name;
          const iconIndex = data.PopupIconIndex > 0 ? data.PopupIconIndex : state.iconIndex;
          const img = this.isBadState(state) ? state.meta.BadStatePopupImg : state.meta.StatePopupImg;
          this.setupPopup(target, data, state.id, data.RemovePopUpText.format(name), color, iconIndex, PopUpReleaseOpacity, 'RState', img);
        }
      }
    }
  };

  Window_BattleLog.prototype.displayPopUpBuffs = function(target, buffs, mode) {
    if (buffs.length > 0) {
      for (const paramId of buffs) {
        const id = mode ? paramId + 10 : paramId;
        const find = AppliBuffPopUp.find(buff => buff.StateType === id);
        if (find) {
          const data = mode ? PopUpDebuff : PopUpBuff;
          if (data && (find.BuffPopUpMode === 0 || find.BuffPopUpMode === 3)) {
            const paramId = id < 10 ? id : id - 10;
            const color = this.setupBuffPopUpColor(id, find, data);
            const name = find.PopUpName ? find.PopUpName : TextManager.param(paramId);
            const iconIndex = data.PopupIconIndex > 0 ? data.PopupIconIndex : target.popupBuffIconIndex(id);
            this.setupPopup(target, data, id, data.PopUpText.format(name), color, iconIndex, 255, 'Buff', find.PopUpBuffImg);
          }
        }
      }
    }
  };

  Window_BattleLog.prototype.displayRemovedPopUpBuffs = function(target, buffs, mode) {
    if (buffs.length > 0) {
      for (const paramId of buffs) {
        const id = mode ? paramId + 10 : paramId;
        const find = AppliBuffPopUp.find(buff => buff.StateType === id);
        if (find) {
          const data = mode ? PopUpDebuff : PopUpBuff;
          if (data && (find.BuffPopUpMode === 0 || find.BuffPopUpMode === 2)) {
            const paramId = id < 10 ? id : id - 10;
            const color = this.setupBuffPopUpColor(id, find, data);
            const name = find.PopUpName ? find.PopUpName : TextManager.param(paramId);
            const iconIndex = data.PopupIconIndex > 0 ? data.PopupIconIndex : target.removePopupBuffIconIndex(id);
            this.setupPopup(target, data, id, data.RemovePopUpText.format(name), color, iconIndex, PopUpReleaseOpacity, 'RBuff', find.PopUpBuffImg);
          }
        }
      }
    }
  };

  Window_BattleLog.prototype.stealPopup = function(target, item) {
    if (StealShowPopup) {
      const data = PopUpGoldSteal;
      if (data) {
        const name = item.popupText.format(item.name);
        const iconIndex = data.PopupIconIndex > 0 ? data.PopupIconIndex : item.iconIndex;
        this.setupPopup(target, data, item.id, name, data.PopupColor, iconIndex, 255, 'Steal');
      }
    }
  };

  Window_BattleLog.prototype.displayAffectedDefeat = function(target) {
    const data = PopUpDefeat;
    if (data) {
      const name = data.PopUpText.format();
      this.setupPopup(target, data, 0, name, data.PopupColor, data.PopupIconIndex, 255, 'Defeat', PopUpDefeatImg);
    }
  };

  Window_BattleLog.prototype.displayAffectedSkillLearning = function(target, skills) {
    if (SkillLearningShowPopup) {
      const data = PopUpSkillLearning;
      if (data) {
        for (const skill of skills) {
          const name = data.PopUpText.format(skill.skillName);
          const iconIndex = data.PopupIconIndex > 0 ? data.PopupIconIndex : $dataSkills[skill.id].iconIndex;
          this.setupPopup(target, data, skill.id, name, data.PopupColor, iconIndex, 255, 'Learn');
        }
      }
    }
  };

  Window_BattleLog.prototype.setupPopup = function(target, data, id, format, color, icon, opacity, type, image) {
    const popupData = setPopupData(data, id, format, color, icon, opacity, type, image);
    this.push('nuun_popupState', target, popupData);
  };

  Window_BattleLog.prototype.isBadState = function(state) {
    return _isBadState(state);
  };

  Window_BattleLog.prototype.setupStatePopUpColor = function(state, data) {
    return _setupStatePopUpColor(state, data);
  };

  Window_BattleLog.prototype.setupBuffPopUpColor = function(id, find, data) {
    return find.PopUpBuffColor ? find.PopUpBuffColor : data.PopupColor;
  };

  Window_BattleLog.prototype.displayDeadPopup = function(target, state) {
    return _displayDeadPopup(target, state);
  };

  Window_BattleLog.prototype.nuun_popupState = function(target, popup) {
    target.addSetPopUpData(popup);
  };
  
  function Sprite_PopUpEX() {
    this.initialize(...arguments);
  }
  
  Sprite_PopUpEX.prototype = Object.create(Sprite_Damage.prototype);
  Sprite_PopUpEX.prototype.constructor = Sprite_PopUpEX;
  
  Sprite_PopUpEX.prototype.initialize = function(mode) {
    this._popupMode = mode;
    this.popupData = null;
    Sprite_Damage.prototype.initialize.call(this);
  };

  Sprite_PopUpEX.prototype.createBitmap = function(width, height) {
    if (this.popupData && this.popupData.image) {
      return ImageManager.nuun_LoadPictures(this.popupData.image);
    } else {
      return Sprite_Damage.prototype.createBitmap.call(this, width, height);
    }
  };

  Sprite_PopUpEX.prototype.setup = function(battler) {
    this.popupData = battler.getPopUpData();
    this.drawPopup(battler);
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

  Sprite_PopUpEX.prototype.damageColor = function() {
    return NuunManager.getColorCode(this._colorType);
  };

  Sprite_PopUpEX.prototype.drawPopup = function(battler) {
    const popupData = this.popupData;
    if (popupData) {
      this.drawIcon(popupData);
      this.createPopUp(popupData);
    }
  };

  Sprite_PopUpEX.prototype.createPopUp = function(popupData) {
    const sprite = this.createChildSprite(PopUpWidth, this.fontSize());
    if (popupData.image) {
      this.opacity = popupData.opacity;
      sprite.dy = 0;
    } else {
      let textMargin = 0;
      if (popupData.iconIndex > 0) {
        textMargin = ImageManager.iconWidth + 4;
      }
      this.opacity = popupData.opacity;
      this.setDefaultOpacity();
      this._colorType = popupData.color;
      sprite.bitmap.textColor = this.damageColor();
      sprite.bitmap.drawText(popupData.name, textMargin, 0, PopUpWidth - textMargin, this.fontSize(), "center");
      sprite.dy = 0;
    }
  };

  Sprite_PopUpEX.prototype.drawIcon = function(popupData) {
    const iconIndex = popupData.iconIndex;
    if (iconIndex > 0) {
      const sprite = this.createChildSprite(ImageManager.iconWidth, this.fontSize());
      sprite.bitmap = ImageManager.loadSystem("IconSet");
      sprite.bitmap.fontSize = this.fontSize();
      const textMargin = Math.min(Math.floor((sprite.bitmap.measureTextWidth(popupData.name) / 2)), Math.floor(PopUpWidth / 2) - Math.floor(ImageManager.iconWidth / 2) - 2);
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

  Sprite_PopUpEX.prototype.update = function() {
    if (this.delay > 0) {
      this.delay--;
      if (this.delay <= 0) {
        this.show();
      }
      if (PopUpUpInterval > 0) {
        return;
      }
    }
    Sprite_Damage.prototype.update.call(this);
  };

  Sprite_PopUpEX.prototype.fontSize = function() {
    return $gameSystem.mainFontSize() + this.popupData.fontsize || 4;
  };

  Sprite_PopUpEX.prototype.fontFace = function() {
    return this.popupData && this.popupData.fontFace ? this.popupData.fontFace : $gameSystem.mainFontFace();
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


  const _Sprite_Battler_updateDamagePopup = Sprite_Battler.prototype.updateDamagePopup;
  Sprite_Battler.prototype.updateDamagePopup = function() {
    this.setupStatePopup();
    _Sprite_Battler_updateDamagePopup.call(this);
  };
  
  Sprite_Battler.prototype.setupStatePopup = function() {
    if (this._battler.isStatePopupRequested()) {
        if (this._battler.isSpriteVisible()) {
            this.createStatePopupSprite();
        }
        this._battler.clearStatePopup();
    }
  };

  Sprite_Battler.prototype.createStatePopupSprite = function() {
    const last = this._damages[this._damages.length - 1];
    const popupData = this._battler.getPopUpData();
    const popupMode = popupData ? getPopupClass(popupData.mode) : 0;
    const sprite = new Sprite_PopUpEX(popupMode);
    if (last && PopUpMode === 'default') {
      sprite.x = last.x + 8;
      sprite.y = last.y - 16;
    } else {
      sprite.x = this.x + this.damageOffsetX() + this.damagePopupOffsetX(popupData);
      sprite.y = this.y + this.damageOffsetY() + this.damagePopupOffsetY(popupData);
    }
    if (last) {
      sprite.delay = this._damages.length * Math.max(PopUpUpInterval, 1);
      sprite.hide();
    } else {
      sprite.delay = 0;
    }
    sprite.setup(this._battler);
    this._damages.push(sprite);
    this.parent.addChild(sprite);
    this._popUpSprite = sprite;
  };

  Sprite_Battler.prototype.damagePopupOffsetX = function() {
    return 0;
  };

  Sprite_Battler.prototype.damagePopupOffsetY = function() {
    return 0;
  };

  Sprite_Enemy.prototype.damagePopupOffsetX = function(data) {
    return data ? (data.x || 0) : 0;
  };

  Sprite_Enemy.prototype.damagePopupOffsetY = function(data) {
    return data ? (data.y || 0) : 0;
  };

const _Game_Battler_clearResult = Game_Battler.prototype.clearResult;
Game_Battler.prototype.clearResult = function() {
    if (!$gameTemp.noClearResult) {
        _Game_Battler_clearResult.call(this);
    }
};

const _Game_Interpreter_command313 = Game_Interpreter.prototype.command313;
Game_Interpreter.prototype.command313 = function(params) {
    $gameTemp.noClearResult = $gameParty.inBattle();
    const result = _Game_Interpreter_command313.call(this, params);
    $gameTemp.noClearResult = false;
    if (result && $gameParty.inBattle()) {
        this.iterateActorEx(params[0], params[1], actor => {
            setAddedStatePopup(actor);
            setRemovedStatePopup(actor);
            const sprite = SceneManager._scene._spriteset.battlerSprites().find(sprite => sprite._battler === actor);
            if (sprite) {
                sprite.updateDamagePopup();
            }
            actor.clearResult();
        });
    }
    return result;
};

const _Game_Interpreter_command333 = Game_Interpreter.prototype.command333;
Game_Interpreter.prototype.command333 = function(params) {
    $gameTemp.noClearResult = $gameParty.inBattle();
    const result = _Game_Interpreter_command333.call(this, params);
    $gameTemp.noClearResult = false;
    if (result && $gameParty.inBattle()) {
        this.iterateActorEx(params[0], params[1], enemy => {
            setAddedStatePopup(enemy);
            setRemovedStatePopup(enemy);
            const sprite = SceneManager._scene._spriteset.battlerSprites().find(sprite => sprite._battler === enemy);
            if (sprite) {
                sprite.updateDamagePopup();
            }
            enemy.clearResult();
        });
    }
    return result;
};

function setPopupData(data, id, format, color, icon, opacity, image) {
    const popupData = new PopUpData();
    popupData.setup(data, id, format, color, icon, opacity, image);
    return popupData;
};

function setAddedStatePopup(target) {
    const states = target.result().addedStateObjects();
    for (const state of states) {
        if (_displayDeadPopup(target, state) && !state.meta.NoPopUp && !state.meta.AddNoPopUp) {
            const data = _isBadState(state) ? PopUpBadState : PopUpAdvantageousState;
            if (data) {
            const color = _setupStatePopUpColor(state, data);
            const name = state.meta.PopUpStateName ? state.meta.PopUpStateName : state.name;
            const iconIndex = data.PopupIconIndex > 0 ? data.PopupIconIndex : state.iconIndex;
            const img = _isBadState(state) ? state.meta.BadStatePopupImg : state.meta.StatePopupImg;
            const popup = setPopupData(data, state.id, data.PopUpText.format(name), color, iconIndex, 255, img);
            target.addSetPopUpData(popup);
            }
        }
    }
};

function setRemovedStatePopup(target) {
    const states = target.result().removedStateObjects();
    for (const state of states) {
        if (_displayDeadPopup(target, state) && !state.meta.NoPopUp && !state.meta.RemoveNoPopUp) {
            const data = _isBadState(state) ? PopUpBadState : PopUpAdvantageousState;
            if (data) {
                const color = _setupStatePopUpColor(state, data);
                const name = state.meta.PopUpStateName ? state.meta.PopUpStateName : state.name;
                const iconIndex = data.PopupIconIndex > 0 ? data.PopupIconIndex : state.iconIndex;
                const img = _isBadState(state) ? state.meta.BadStatePopupImg : state.meta.StatePopupImg;
                const popup = setPopupData(data, state.id, data.RemovePopUpText.format(name), color, iconIndex, PopUpReleaseOpacity, img);
                target.addSetPopUpData(popup);
            }
        }
    }
};

function _displayDeadPopup(target, state) {
    return !DeadNoPopup ? state.id !== target.deathStateId() : true;
};

function _isBadState(state) {
    return !!state.meta.BatState;
};

function _setupStatePopUpColor(state, data) {
    return state.meta.PopUpColor ? (isNaN(Number(state.meta.PopUpColor)) ? state.meta.PopUpColor : Number(state.meta.PopUpColor)) : data.PopupColor;
};

  function getPopupClass(mode) {
    switch (mode) {
      case 'LateralBoundPopUp':
        return 1;
      case 'SlideFadeoutPopup':
        return 2;
      case 'UpFadeoutPopup':
        return 3;
      case 'Default':
      default:
        return 0;
    }
  }

})();