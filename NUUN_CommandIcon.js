/*:-----------------------------------------------------------------------------------
 * NUUN_CommandIcon.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Command and category Ex
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.6.1
 * 
 * @help
 * You can display icons in the command menu and change the text color of command names.
 * You can choose to align the command name left, center, or right.
 * 
 * Command name: Enter the character string displayed in the command menu as it is.
 * Command Color: Change the color of the command name. (System color index) You can enter the color code on the text tab.
 * Icon index: Specifies the icon.
 * Filtering class setting mode: Specify whether to apply or exclude the filtering below.
 * Filtering class settings: Set the classes to apply or exclude settings. The first matching condition from the top is applied.
 * 
 * When entering a class not listed in the filtering class setting, be sure to enclose it with '' or "".
 * If you want to set in a window that is not in the filtering class setting, enter the relevant class directly in the text tab by enclosing it with '' or ''.
 * You can find the class name by writing 'console.log(this)' inside 'Window_Command.prototype.drawItem'. (F12)
 * Only classes that inherit 'Window_Command' can be reflected.
 * 
 * Window_ItemBook_Category：Item Catalog Category
 * Window_SaveVerificationWindow：Save confirmation overwrite screen options
 * Window_EnemyBook_Category：Monster Encyclopedia Enemy Category
 * Window_EnemyBookPageCategory：Monster picture book information page
 * 
 * If it is not in the combo box, please enter it directly.
 * 
 * Change font
 * A separate plug-in is required to change the font. (Triacontane-like FontLoad plug-in recommended)
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 6/16/2024 Ver.1.6.1
 * Processing fixes.
 * 2/17/2024 Ver.1.6.0
 * Added the ability to change the display of command text using switches.
 * Added a function that allows you to set conditions for command selection.
 * Fixed an issue where the content background was not displayed correctly.
 * 4/29/2023 Ver.1.5.1
 * Fixed an issue where the font of other commands would change.
 * 4/29/2023 Ver.1.5.0
 * Added a function to change the font. A separate plug-in is required to change the font.
 * 4/10/2023 Ver.1.4.5
 * Fixed handling of filtering classes.
 * 4/9/2023 Ver.1.4.4
 * Fixed an issue that was not applied to options.
 * 12/6/2022 Ver.1.4.3
 * Changed the Type of color specification plug-in parameter to color. (Core script Ver.1.6.0 or later)
 * Changed the Type of icon specified plug-in parameter to icon. (Core script Ver.1.6.0 or later)
 * 11/25/2022 Ver 1.4.2
 * Added a function that can specify the command to be applied with a symbol.
 * 11/10/2022 Ver 1.4.1
 * Corrected to fit the entire image within the display.
 * Changed the display in languages other than Japanese to English.
 * 11/10/2022 Ver 1.4.0
 * Added a function that can display any image as the content background of the command.
 * 4/10/2022 Ver 1.3.2
 * Fixed an issue where the command name display position setting for each class was not applied.
 * 12/25/2021 Ver 1.3.1
 * Items added to the filtering class by changing the monster picture book enemy category command.
 * 11/14/2021 Ver 1.3.0
 * Added the ability to specify the text position for each class.
 * 11/7/2021 Ver 1.2.5
 * Fixed so that it can be specified by color code.
 * 10/23/2021 Ver 1.2.4
 * Modified description of plug-in parameters and added only items in menu commands to initial setting.
 * 9/11/2021 Ver 1.2.3
 * Add save overwrite confirmation to filtering class (requires NUUN_SaveVerification)
 * 8/23/2021 Ver 1.2.2
 * Added item book category to exemption class setting. (requires NUUN_ItemBook)
 * 5/22/2021 Ver 1.2.1
 * Added a function to select the apply mode or exclude mode for the window that reflects the settings.
 * 5/21/2021 Ver 1.2.0
 * Added a function that can specify the window to reflect the setting.
 * 11/22/2020 Ver 1.1.1
 * Added a function to select command names from left alignment, center alignment, and right alignment.
 * 11/21/2020 Ver 1.1.0
 * Added the ability to color command names.
 * 11/20/2020 Ver 1.0.2
 * Fixed an issue where help and plugin parameters were displayed only in Japanese.
 * 11/20/2020 Ver 1.0.1
 * Fixed the problem that an error occurs when the plugin parameter CommadIcon is blank.
 * 11/19/2020 Ver 1.0.0
 * first edition.
 * 
 * @param CommadIcon
 * @text Command setting
 * @desc Configure command settings.
 * @default ["{\"CommadName\":\"Item\",\"CommadNameColor\":\"0\",\"iconId\":\"0\",\"ContentsBuckImg\":\"\",\"CommandClassMode\":\"0\",\"CommandClass\":\"\"}","{\"CommadName\":\"Skill\",\"CommadNameColor\":\"0\",\"iconId\":\"0\",\"ContentsBuckImg\":\"\",\"CommandClassMode\":\"0\",\"CommandClass\":\"\"}","{\"CommadName\":\"Equip\",\"CommadNameColor\":\"0\",\"iconId\":\"0\",\"ContentsBuckImg\":\"\",\"CommandClassMode\":\"0\",\"CommandClass\":\"\"}","{\"CommadName\":\"Status\",\"CommadNameColor\":\"0\",\"iconId\":\"0\",\"ContentsBuckImg\":\"\",\"CommandClassMode\":\"0\",\"CommandClass\":\"\"}","{\"CommadName\":\"Formation\",\"CommadNameColor\":\"0\",\"iconId\":\"0\",\"ContentsBuckImg\":\"\",\"CommandClassMode\":\"0\",\"CommandClass\":\"\"}","{\"CommadName\":\"Options\",\"CommadNameColor\":\"0\",\"iconId\":\"0\",\"ContentsBuckImg\":\"\",\"CommandClassMode\":\"0\",\"CommandClass\":\"[\\\"'Window_MenuCommand'\\\"]\"}","{\"CommadName\":\"Save\",\"CommadNameColor\":\"0\",\"iconId\":\"0\",\"ContentsBuckImg\":\"\",\"CommandClassMode\":\"0\",\"CommandClass\":\"\"}","{\"CommadName\":\"End Game\",\"CommadNameColor\":\"0\",\"iconId\":\"0\",\"ContentsBuckImg\":\"\",\"CommandClassMode\":\"0\",\"CommandClass\":\"\"}"]
 * @type struct<CommadIconList>[]
 * 
 * @param CommandPosition
 * @text Command name display position for vertical commands
 * @desc Specifies the display position of the command name of the vertical direction command. (menu screen, etc.)
 * @type select
 * @option Align Left
 * @value 'left'
 * @option Align Center
 * @value 'center'
 * @option Align Right
 * @value 'right'
 * @default 'center'
 * 
 * @param HorzCommandPosition
 * @text Command name display position for horizontal commands
 * @desc Specifies the display position of the command name of the horizontal command. (item column, etc.)
 * @type select
 * @option Align Left
 * @value 'left'
 * @option Align Center
 * @value 'center'
 * @option Align Right
 * @value 'right'
 * @default 'center'
 * 
 * @param ClassCommandPosition
 * @text Command name display position for each class
 * @desc Set the command name display position for each class.
 * @default []
 * @type struct<ClassCommandList>[]
 * 
 */
/*~struct~CommadIconList:
 * 
 * @param CommadName
 * @text Command name
 * @desc Command name to apply (must be the same name as the command name to display)
 * @type string
 * @default 
 * 
 * @param CommadSymbol
 * @text Symbol name
 * @desc Symbolic name of the apply command. If nothing is entered, the command name will be applied. (item for items)
 * @type combo
 * @option "item"
 * @option "skill"
 * @option "equip"
 * @option "status"
 * @option "formation"
 * @option "options"
 * @option "save"
 * @option "gameEnd"
 * @option "newGame"
 * @option "continue"
 * @option "toTitle"
 * @option "cancel"
 * @option "fight"
 * @option "escape"
 * @option "attack"
 * @option "guard"
 * @option "enemyBook"
 * @option "enemyBookInfo"
 * @default 
 * 
 * @param CommadNameColor
 * @text Command Color
 * @desc Color index number in command name. You can enter a color code in the text tab.
 * @type color
 * @default 0
 * @min 0
 * 
 * @param iconId
 * @text Icon index
 * @desc Icon index.
 * @type icon
 * @default 0
 * @min 0
 * 
 * @param CommadSecretName
 * @text Secret command name
 * @desc A character string while the secret command switch is OFF.
 * @type string
 * @default ???
 * 
 * @param CommadSecretSwitch
 * @text Secret command switch
 * @desc While OFF, the command character display will be changed to the display set in the secret command name.
 * @type switch
 * @default 0
 * 
 * @param ContentsBuckImg
 * @desc Specifies the content background image file name.
 * @text content background image
 * @type file
 * @dir img/
 * @default 
 * 
 * @param FontFace
 * @desc Sets the command font.
 * @text Command font
 * @type string
 * @default 
 * 
 * @param Enabled
 * @text Command selection conditions
 * @desc Enter the command selection conditions in JavaScript. (If not filled out, the original process will be used)
 * @type combo
 * @option 'this.areMainCommandsEnabled()'
 * @option 'this.isFormationEnabled()'
 * @option 'this.isSaveEnabled()'
 * @option 'this.isOptionsEnabled()'
 * @option 'this.isGameEndEnabled()'
 * @option '$gameSwitches.value(0)'
 * @default
 * 
 * @param CommandClassMode
 * @text Filtering class setting mode
 * @desc Specifies the mode of exemption class settings.
 * @type select
 * @option Apply
 * @value 0
 * @option Exclusion
 * @value 1
 * @default 0
 * 
 * @param CommandClass
 * @text Filtering class settings
 * @desc Specify classes to apply or exclude, and distinguished names. If not specified, all commands are reflected. (list number 1 only)
 * @type combo[]
 * @option 'Window_MenuCommand'
 * @option 'Window_ItemCategory'
 * @option 'Window_SkillType'
 * @option 'Window_EquipCommand'
 * @option 'Window_ShopCommand'
 * @option 'Window_PartyCommand'
 * @option 'Window_ActorCommand'
 * @option 'Window_TitleCommand'
 * @option 'Window_GameEnd'
 * @option 'Window_ChoiceList'
 * @option 'Window_Options'
 * @option 'Window_ItemBook_Category'
 * @option 'Window_SaveVerificationWindow'
 * @option 'Window_EnemyBook_Category'
 * @option 'Window_EnemyBookPageCategory'
 * @default
 * 
 */
/*~struct~ClassCommandList:
 * 
 * @param CommandClass
 * @text Filtering class setting
 * @desc Specifies the class to apply. or distinguished name.
 * @type combo
 * @option 'Window_MenuCommand'
 * @option 'Window_ItemCategory'
 * @option 'Window_SkillType'
 * @option 'Window_EquipCommand'
 * @option 'Window_ShopCommand'
 * @option 'Window_PartyCommand'
 * @option 'Window_ActorCommand'
 * @option 'Window_TitleCommand'
 * @option 'Window_GameEnd'
 * @option 'Window_ChoiceList'
 * @option 'Window_Options'
 * @option 'Window_ItemBook_Category'
 * @option 'Window_SaveVerificationWindow'
 * @option 'Window_EnemyBook_Category'
 * @option 'Window_EnemyBookPageCategory'
 * @default
 * 
 * @param CommandPosition
 * @text Command name display position
 * @desc Specifies the display position of the command name.
 * @type select
 * @option Align Left
 * @value 'left'
 * @option Align Center
 * @value 'center'
 * @option Align Right
 * @value 'right'
 * @default 'center'
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc コマンド、カテゴリー表示拡張
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.6.1
 * 
 * @help
 * コマンドメニューにアイコンを表示やコマンド名の文字色を変更できます。
 * コマンド名の位置を左揃え、中央揃え、右揃えから選べます。
 * 
 * コマンド名：コマンドメニューに表示される文字列をそのまま記入します。
 * コマンドの色：コマンド名の色を変更します。（システムカラーインデックス）　テキストタブでカラーコードを記入できます。
 * アイコンインデックス：アイコンを指定します。
 * フィルタリングクラス設定モード：下のフィルタリングを適用するか除外するか指定します。
 * フィルタリングクラス設定：設定を適用または除外するクラスを設定します。上から一番最初に条件一致した条件が適用されます。
 * 
 * フィルタリングクラス設定でリストにないクラスを記入する場合は必ず'または"で囲ってください。
 * フィルタリングクラス設定にないウィンドウで設定する場合は、テキストタブで直接該当クラスを''または""で囲って記入してください。
 * Window_Command.prototype.drawItem内にconsole.log(this)を記入することでクラス名が分かります。(F12)
 * 反映させられるクラスはWindow_Commandを継承しているクラスのみとなります。
 * 
 * Window_ItemBook_Category：アイテム図鑑カテゴリー
 * Window_SaveVerificationWindow：セーブ確認上書き画面選択肢
 * Window_EnemyBook_Category：モンスター図鑑敵カテゴリー
 * Window_EnemyBookPageCategory：モンスター図鑑情報ページ
 * 
 * ※コンボボックスにない場合、直接記入してください。
 * 
 * フォントの変更
 * 別途フォントを変更できるプラグインが必要です。(トリアコンタン様のFontLoad(フォントロードプラグイン)推奨)
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/6/16 Ver.1.6.1
 * 処理の修正。
 * 2024/2/17 Ver.1.6.0
 * スイッチによってコマンドテキストの表示を変更する機能を追加。
 * コマンド選択可能な条件を設定できる機能を追加。
 * コンテンツ背景の表示が正常に行われていなかった問題を修正。
 * 2023/4/29 Ver.1.5.2
 * 処理の修正。
 * 2023/4/29 Ver.1.5.1
 * 他のコマンドのフォントが変更されてしまう問題を修正。
 * 2023/4/29 Ver.1.5.0
 * フォントを変更できる機能を追加。別途フォントを変更できるプラグインが必要です。
 * 2023/4/10 Ver.1.4.5
 * フィルタリングクラスの処理修正。
 * 2023/4/9 Ver.1.4.4
 * オプションに適用されていなかった問題を修正。
 * 2022/12/6 Ver.1.4.3
 * カラー指定のプラグインパラメータのTypeをcolorに変更。(コアスクリプトVer.1.6.0以降)
 * アイコン指定のプラグインパラメータのTypeをiconに変更。(コアスクリプトVer.1.6.0以降)
 * 2022/11/25 Ver 1.4.2
 * 適用するコマンドをシンボルで指定できる機能を追加。
 * 2022/11/10 Ver 1.4.1
 * 画像全体を表示内に収めるように修正。
 * 日本語以外での表示を英語表示に変更。
 * 2022/11/10 Ver 1.4.0
 * コマンドのコンテンツ背景に任意の画像を表示できる機能を追加。
 * 2022/4/10 Ver 1.3.2
 * クラス毎のコマンド名表示位置の設定が適用されていなかった問題を修正。
 * 2021/12/25 Ver 1.3.1
 * モンスター図鑑敵カテゴリーコマンド化によりフィルタリングクラスに項目追加。
 * 2021/11/14 Ver 1.3.0
 * クラス毎にテキストの位置を指定できる機能を追加。
 * 2021/11/7 Ver 1.2.5
 * カラーコードで指定できるように修正。
 * 2021/10/23 Ver 1.2.4
 * プラグインパラメータの説明を修正及びメニューコマンド内の項目のみ初期設定に追加。
 * 2021/9/11 Ver 1.2.3
 * フィルタリングクラスにセーブ上書き確認を追加（要NUUN_SaveVerification）
 * 2021/8/23 Ver 1.2.2
 * 適用除外クラス設定にアイテム図鑑カテゴリーを追加。(要NUUN_ItemBook)
 * 2021/5/22 Ver 1.2.1
 * 設定を反映するウィンドウを適用モードか除外モードかを選択できる機能を追加。
 * 2021/5/21 Ver 1.2.0
 * 設定を反映するウィンドウを指定できる機能を追加。
 * 2020/11/22 Ver 1.1.1
 * コマンド名を左揃え、中央揃え、右揃えから選べる機能を追加。
 * 2020/11/21 Ver 1.1.0
 * コマンド名に色を付ける機能を追加。
 * 2020/11/20 Ver 1.0.2
 * 日本語版しかヘルプやプラグインパラメータが表示されなかった問題を修正。
 * 2020/11/20 Ver 1.0.1
 * プラグインパラメータのCommadIconが空白だった場合、エラーが出る問題を修正。
 * 2020/11/19 Ver 1.0.0
 * 初版
 * 
 * @param CommadIcon
 * @text コマンド設定
 * @desc コマンドの設定をします。
 * @default ["{\"CommadName\":\"アイテム\",\"CommadNameColor\":\"0\",\"iconId\":\"0\",\"CommandClassMode\":\"0\",\"CommandClass\":\"\"}","{\"CommadName\":\"スキル\",\"CommadNameColor\":\"0\",\"iconId\":\"0\",\"CommandClassMode\":\"0\",\"CommandClass\":\"\"}","{\"CommadName\":\"装備\",\"CommadNameColor\":\"0\",\"iconId\":\"0\",\"CommandClassMode\":\"0\",\"CommandClass\":\"\"}","{\"CommadName\":\"ステータス\",\"CommadNameColor\":\"0\",\"iconId\":\"0\",\"CommandClassMode\":\"0\",\"CommandClass\":\"\"}","{\"CommadName\":\"並び替え\",\"CommadNameColor\":\"0\",\"iconId\":\"0\",\"CommandClassMode\":\"0\",\"CommandClass\":\"\"}","{\"CommadName\":\"オプション\",\"CommadNameColor\":\"0\",\"iconId\":\"0\",\"CommandClassMode\":\"0\",\"CommandClass\":\"[\\\"'Window_MenuCommand'\\\"]\"}","{\"CommadName\":\"セーブ\",\"CommadNameColor\":\"0\",\"iconId\":\"0\",\"ContentsBuckImg\":\"\",\"CommandClassMode\":\"0\",\"CommandClass\":\"\"}","{\"CommadName\":\"ゲーム終了\",\"CommadNameColor\":\"0\",\"iconId\":\"0\",\"ContentsBuckImg\":\"\",\"CommandClassMode\":\"0\",\"CommandClass\":\"\"}"]
 * @type struct<CommadIconList>[]
 * 
 * @param CommandPosition
 * @text 縦方向コマンドのコマンド名表示位置
 * @desc 縦方向コマンドのコマンド名の表示位置を指定します。（メニュー画面など）
 * @type select
 * @option 左揃え
 * @value 'left'
 * @option 中央揃え
 * @value 'center'
 * @option 右揃え
 * @value 'right'
 * @default 'center'
 * 
 * @param HorzCommandPosition
 * @text 横方向コマンドのコマンド名表示位置
 * @desc 横方向コマンドのコマンド名の表示位置を指定します。（アイテム欄など）
 * @type select
 * @option 左揃え
 * @value 'left'
 * @option 中央揃え
 * @value 'center'
 * @option 右揃え
 * @value 'right'
 * @default 'center'
 * 
 * @param ClassCommandPosition
 * @text クラス毎のコマンド名表示位置
 * @desc クラス毎のコマンド名表示位置の設定をします。
 * @default []
 * @type struct<ClassCommandList>[]
 * 
 */
/*~struct~CommadIconList:ja
 * 
 * @param CommadName
 * @text コマンド名
 * @desc 適用するコマンド名（表示するコマンド名と同じ名前にしてください）
 * @type string
 * @default 
 * 
 * @param CommadSymbol
 * @text シンボル名
 * @desc 適用するコマンドのシンボル名を記入します。無記入の場合はコマンド名で参照されます。(アイテムならitem)
 * @type combo
 * @option "item"
 * @option "skill"
 * @option "equip"
 * @option "status"
 * @option "formation"
 * @option "options"
 * @option "save"
 * @option "gameEnd"
 * @option "newGame"
 * @option "continue"
 * @option "toTitle"
 * @option "cancel"
 * @option "fight"
 * @option "escape"
 * @option "attack"
 * @option "guard"
 * @option "enemyBook"
 * @option "enemyBookInfo"
 * @default 
 * 
 * @param CommadNameColor
 * @text コマンド名の色
 * @desc コマンド名のカラーインデックス番号。テキストタブでカラーコードが入力できます。
 * @type color
 * @default 0
 * @min 0
 * 
 * @param iconId
 * @text アイコンインデックス番号
 * @desc アイコンのインデックス番号。
 * @type icon
 * @default 0
 * @min 0
 * 
 * @param CommadSecretName
 * @text シークレットコマンド名
 * @desc シークレットコマンドスイッチがOFFの間の文字列。
 * @type string
 * @default ？？？
 * 
 * @param CommadSecretSwitch
 * @text シークレットコマンドスイッチ
 * @desc OFFの間、コマンドの文字表示をシークレットコマンド名で設定した表示に変更します。
 * @type switch
 * @default 0
 * 
 * @param ContentsBuckImg
 * @desc コンテンツ背景画像ファイル名を指定します。
 * @text コンテンツ背景画像
 * @type file
 * @dir img/
 * @default 
 * 
 * @param FontFace
 * @desc コマンドのフォントを設定します。
 * @text コマンドフォント
 * @type string
 * @default 
 * 
 * @param Enabled
 * @text コマンド選択条件
 * @desc コマンド選択の条件をJavaScriptで記入します。(未記入の場合は元の処理)
 * @type combo
 * @option 'this.areMainCommandsEnabled()'
 * @option 'this.isFormationEnabled()'
 * @option 'this.isSaveEnabled()'
 * @option 'this.isOptionsEnabled()'
 * @option 'this.isGameEndEnabled()'
 * @option '$gameSwitches.value(0)'
 * @default
 * 
 * @param CommandClassMode
 * @text フィルタリングクラス設定モード
 * @desc 適用除外クラス設定のモードを指定します。
 * @type select
 * @option 適用
 * @value 0
 * @option 除外
 * @value 1
 * @default 0
 * 
 * @param CommandClass
 * @text フィルタリングクラス設定
 * @desc 適用、除外するクラスまたは識別名を指定します。無指定の場合は全てのコマンドで反映されます。(リスト番号１のみ)
 * @type combo[]
 * @option 'Window_MenuCommand'
 * @option 'Window_ItemCategory'
 * @option 'Window_SkillType'
 * @option 'Window_EquipCommand'
 * @option 'Window_ShopCommand'
 * @option 'Window_PartyCommand'
 * @option 'Window_ActorCommand'
 * @option 'Window_TitleCommand'
 * @option 'Window_GameEnd'
 * @option 'Window_ChoiceList'
 * @option 'Window_Options'
 * @option 'Window_ItemBook_Category'
 * @option 'Window_SaveVerificationWindow'
 * @option 'Window_EnemyBook_Category'
 * @option 'Window_EnemyBookPageCategory'
 * @default
 * 
 */
/*~struct~ClassCommandList:ja
 * 
 * @param CommandClass
 * @text フィルタリングクラス設定
 * @desc 適用するクラスを指定します。または識別名
 * @type combo
 * @option 'Window_MenuCommand'
 * @option 'Window_ItemCategory'
 * @option 'Window_SkillType'
 * @option 'Window_EquipCommand'
 * @option 'Window_ShopCommand'
 * @option 'Window_PartyCommand'
 * @option 'Window_ActorCommand'
 * @option 'Window_TitleCommand'
 * @option 'Window_GameEnd'
 * @option 'Window_ChoiceList'
 * @option 'Window_Options'
 * @option 'Window_ItemBook_Category'
 * @option 'Window_SaveVerificationWindow'
 * @option 'Window_EnemyBook_Category'
 * @option 'Window_EnemyBookPageCategory'
 * @default
 * 
 * @param CommandPosition
 * @text コマンド名表示位置
 * @desc コマンド名の表示位置を指定します。
 * @type select
 * @option 左揃え
 * @value 'left'
 * @option 中央揃え
 * @value 'center'
 * @option 右揃え
 * @value 'right'
 * @default 'center'
 * 
 */
var Imported = Imported || {};
Imported.NUUN_CommandIcon = true;

(() => {
const parameters = PluginManager.parameters('NUUN_CommandIcon');
const params = Nuun_PluginParams.getPluginParams(document.currentScript);

class Nuun_CommandEx {
    constructor(_window) {
        this._window = _window;
        this._commandName = "";
        this._commandSymbol = "";
        this.setItemTextAlign();
    }

    setup(index) {
        const symbol = this._window.commandSymbol(index);
        const name = this._window.commandName(index);
        this._commandName = name;
        this._commandSymbol = symbol;
        this._data = params.CommadIcon ? params.CommadIcon.find(Commad => this.getFindCommand(Commad, symbol, name) && this.isClass(Commad.CommandClass, Commad.CommandClassMode)) : null;
    }

    getFindCommand(data, symbol, name) {
        if (!!data.CommadSymbol) {
            return data.CommadSymbol === symbol;
        } else {
            return data.CommadName === name;
        }
    }

    isClass(Command, mode) {
        if (Command && Command.length > 0) {
            const className = getClass(this._window);
            const result = Command.some(_Class => _Class === className);
            if (mode === 0 || mode === undefined) {
                return result;
            } else {
                return result ? false : true;
            }
        }
        return true;
    }

    setItemTextAlign() {
        const align = this.itemTextAlignClass();
        this._align = !!align ? align : this._window.commandExItemTextAlign();
    }

    getItemTextAlign() {
        return this._align;
    }

    itemTextAlignClass() {
        const commandPosition = params.ClassCommandPosition || [];
        const className = getClass(this._window);
        const result = commandPosition.find(_Class => _Class.CommandClass === className);
        return result ? result.CommandPosition : null;
    }

    isCommandEx() {
        return !!this._data;
    }

    getCommandEx() {
        return this._data;
    }

    isCommandNameText(text) {
        return text === this._commandName;
    }

    contentsBuckImg(index) {
        if (this._data.ContentsBuckImg) {
            const bitmap = ImageManager.nuun_LoadPictures(this._data.ContentsBuckImg);
            bitmap.addLoadListener(function() {
                this._window.drawContentsBack(bitmap, index);
            }.bind(this));
            return true;
        }
        return false;
    }

    isCommadSecretName(text) {
        if (this._data && !!this._data.CommadSecretName) {
            if (!this.isCommadSecret()) {
                text = this.unknownDataLength(data.CommadSecretName , text);
            }
        }
        return text;
    }

    isCommadSecret() {
        if (this._data.CommadSecretSwitch > 0) {
            return $gameSwitches.value(this._data.CommadSecretSwitch)
        }
        return true;
    };

    unknownDataLength(secretName, name) {
        if(secretName === '？' || secretName === '?') {
            const name_length = this.commandNameLength(name);
            return secretName.repeat(name_length);
        } else {
            return secretName;
        }
    };
    
    commandNameLength(name) {
        return name.length;
    };

    getCommandEnabled(name, symbol, ext) {
        const data = params.CommadIcon ? params.CommadIcon.find(Commad => this.getFindCommand(Commad, symbol, name) && this.isClass(Commad.CommandClass, Commad.CommandClassMode)) : null;
        if (data && data.Enabled) {
            return eval(data.Enabled);
        }
        return ext;
    }

}

const _Window_Command_initialize = Window_Command.prototype.initialize;
Window_Command.prototype.initialize = function(rect) {
    this._commandEx = new Nuun_CommandEx(this);
    _Window_Command_initialize.apply(this, arguments);
};

const _Window_Command_addCommand = Window_Command.prototype.addCommand;
Window_Command.prototype.addCommand = function(name, symbol, enabled = true, ext = null) {
    ext = this._commandEx.getCommandEnabled(name, symbol, ext);
    _Window_Command_addCommand.apply(this, arguments);
};

if (Window_Command.prototype.drawItemBackground == Window_Selectable.prototype.drawItemBackground) {
    Window_Command.prototype.drawItemBackground = function(index) {
        Window_Selectable.prototype.drawItemBackground.apply(this, arguments);
    };
}

const _Window_Command_drawItemBackground = Window_Command.prototype.drawItemBackground;
Window_Command.prototype.drawItemBackground = function(index) {
    this._commandEx.setup(index);
    if (this._commandEx.isCommandEx()) {
        if (this._commandEx.contentsBuckImg(index)) {
            return;
        }
    }
    _Window_Command_drawItemBackground.apply(this, arguments);
};

Window_Command.prototype.drawContentsBack = function(bitmap, index) {
    const rect = this.itemRect(index);
    const width = Math.min(bitmap.width, rect.width);
    const height = Math.min(bitmap.height, rect.height);
    this.contentsBack.blt(bitmap, 0, 0, bitmap.width, bitmap.height, rect.x + 1, rect.y + 1, width, height);
};

const _Window_Command_drawItem = Window_Command.prototype.drawItem;
Window_Command.prototype.drawItem = function(index) {
    this.resetFontSettings();
    if (!this._commandEx.isCommandNameText(this.commandName(index))) {
        this._commandEx.setup(index);
    }
    _Window_Command_drawItem.call(this, index);
};

const _Window_Options_drawItem = Window_Options.prototype.drawItem;
Window_Options.prototype.drawItem = function(index) {
    this.resetFontSettings();
    if (!this._commandEx.isCommandNameText(this.commandName(index))) {
        this._commandEx.setup(index);
    }
    _Window_Options_drawItem.call(this, index);
};

const _Window_Command_drawText = Window_Command.prototype.drawText;
Window_Command.prototype.drawText = function(text, x, y, maxWidth, align) {
    if (this._commandEx.isCommandNameText(text) && this._commandEx.isCommandEx()) {
        const data = this._commandEx.getCommandEx();
        text = this._commandEx.isCommadSecretName(text);
        this.nuun_setContentsFontFace(data);
        const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
        const textMargin = data.iconId > 0 ? ImageManager.iconWidth + 4 : 0;
        const textWidth = this.textWidth(text);
        const itemWidth = Math.max(0, maxWidth - textMargin);
        width = Math.min(itemWidth, textWidth);
        if(data.iconId > 0) {
            if(align === 'center') {
                this.drawIcon(data.iconId, x + (maxWidth / 2 - width / 2) - textMargin / 2, iconY);
            } else if (align === 'left') {
                this.drawIcon(data.iconId, x, iconY);
            } else {
                this.drawIcon(data.iconId, x + itemWidth - width, iconY);
            }
        }
        x += textMargin;
        maxWidth = itemWidth;
        this.commandChangeTextColor(data);
    }
    _Window_Command_drawText.apply(this, arguments);
};

Window_Command.prototype.commandExItemTextAlign = function() {
    if (params.CommandPosition !== 'None') {
        return params.CommandPosition;
    } else {
        return _Window_Command_itemTextAlign.apply(this, arguments);
    }
};

Window_HorzCommand.prototype.commandExItemTextAlign = function() {
    if (params.HorzCommandPosition !== 'None') {
        return params.HorzCommandPosition;
    } else {
        return _Window_HorzCommand_itemTextAlign.apply(this, arguments);
    }
};

const _Window_Command_itemTextAlign = Window_Command.prototype.itemTextAlign;
Window_Command.prototype.itemTextAlign = function() {
    return this._commandEx.getItemTextAlign() ? this._commandEx.getItemTextAlign() : _Window_Command_itemTextAlign.call(this);
};

const _Window_HorzCommand_itemTextAlign = Window_HorzCommand.prototype.itemTextAlign;
Window_HorzCommand.prototype.itemTextAlign = function() {
    return this._commandEx.getItemTextAlign() ? this._commandEx.getItemTextAlign() : _Window_HorzCommand_itemTextAlign.call(this);
};

Window_Command.prototype.commandChangeTextColor = function(data) {
    this.changeTextColor(NuunManager.getColorCode(data.CommadNameColor));
};

Window_Command.prototype.nuun_setContentsFontFace = function(data) {
    this.contents.fontFace = data.FontFace ? data.FontFace : $gameSystem.mainFontFace();
};

function getClass(_class) {
    try {
        return NuunManager.isFilterClass(_class);
    } catch (error) {
        return String(_class.constructor.name);
    }
};

})();