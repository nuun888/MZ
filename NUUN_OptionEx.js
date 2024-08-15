/*:-----------------------------------------------------------------------------------
 * NUUN_OptionEx.js
 * 
 * Copyright (C) 2024 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Option EX
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.1
 * 
 * @help
 * Expand the options screen.
 * 
 * Operation to change keys and gamepad keys (buttons)
 * To change keys, gamepad keys, or buttons, press Enter (confirmation button) on the item you want to change and then press any key (button).
 * You cannot set keys (buttons) that have already been set or reserved keys (buttons).
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 8/16/2024 Ver.1.0.1
 * Added the ability to make windows transparent.
 * 8/15/2024 Ver.1.0.0
 * First edition.
 * 
 * @param ResetPlaySe
 * @text Playback SE at reset
 * @desc The se that plays when resetting.
 * @default 
 * @type struct<PlaySe>
 * 
 * @param OptionCategorySetting
 * @text Option Category Settings
 * @default ------------------------------
 * 
 * @param CommandOptions
 * @text Display Category Option Settings
 * @desc Set the category of options to display.
 * @default ["{\"OptionsData\":\"[\\\"{\\\\\\\"OptionName\\\\\\\":\\\\\\\"Always Dash\\\\\\\",\\\\\\\"OptionSymbol\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"alwaysDash\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"OptionHidden\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OptionConfigSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Var\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Switch\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"OptionsStringList\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"GlobalConfigData\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"OptionName\\\\\\\":\\\\\\\"Command Remember\\\\\\\",\\\\\\\"OptionSymbol\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"commandRemember\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"OptionHidden\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OptionConfigSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Var\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Switch\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"OptionsStringList\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"GlobalConfigData\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"OptionName\\\\\\\":\\\\\\\"Touch UI\\\\\\\",\\\\\\\"OptionSymbol\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"touchUI\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"OptionHidden\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OptionConfigSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Var\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Switch\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"OptionsStringList\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"GlobalConfigData\\\\\\\":\\\\\\\"true\\\\\\\"}\\\"]\",\"OptionName\":\"Game Play\",\"OptionCommandSymbol\":\"gamesetting\"}","{\"OptionsData\":\"[\\\"{\\\\\\\"OptionName\\\\\\\":\\\\\\\"BGM Volume\\\\\\\",\\\\\\\"OptionSymbol\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"bgmVolume\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"OptionHidden\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OptionConfigSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Var\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Switch\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"OptionsStringList\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"GlobalConfigData\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"OptionName\\\\\\\":\\\\\\\"BGS Volume\\\\\\\",\\\\\\\"OptionSymbol\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"bgsVolume\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"OptionHidden\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OptionConfigSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Var\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Switch\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"OptionsStringList\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"GlobalConfigData\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"OptionName\\\\\\\":\\\\\\\"ME Volume\\\\\\\",\\\\\\\"OptionSymbol\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"meVolume\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"OptionHidden\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OptionConfigSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Var\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Switch\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"OptionsStringList\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"GlobalConfigData\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"OptionName\\\\\\\":\\\\\\\"SE Volume\\\\\\\",\\\\\\\"OptionSymbol\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"seVolume\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"OptionHidden\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OptionConfigSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Var\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Switch\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"OptionsStringList\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"GlobalConfigData\\\\\\\":\\\\\\\"true\\\\\\\"}\\\"]\",\"OptionName\":\"Sound\",\"OptionCommandSymbol\":\"sound\"}","{\"OptionsData\":\"\",\"OptionName\":\"KeyConfig\",\"OptionCommandSymbol\":\"'KeyConfig'\"}","{\"OptionsData\":\"\",\"OptionName\":\"GamePad\",\"OptionCommandSymbol\":\"'GamePad'\"}"]
 * @type struct<CommandOptionList>[]
 * @parent OptionCategorySetting
 * 
 * @param OptionCategoryWindowX
 * @desc X coordinate of the category window.
 * @text Category Window X Coordinate
 * @type number
 * @default 0
 * @min -9999
 * @parent OptionCategorySetting
 * 
 * @param OptionCategoryWindowY
 * @desc Y coordinate of the category window.
 * @text Category Window Y Coordinate
 * @type number
 * @default 100
 * @min -9999
 * @parent OptionCategorySetting
 * 
 * @param OptionCategoryWindowWidth
 * @desc The width of the category window.
 * @text Category Window Width
 * @type number
 * @default 240
 * @min 0
 * @parent OptionCategorySetting
 * 
 * @param OptionCategoryWindowHeightRows
 * @text Number of category window rows.
 * @desc Category rows.
 * @type number
 * @default 4
 * @min 0
 * @parent OptionCategorySetting
 * 
 * @param OptionCategoryWindowCols
 * @desc Number of categorical cols
 * @text Categorical cols
 * @type number
 * @default 1
 * @min 1
 * @parent OptionCategorySetting
 * 
 * @param OptionCategoryWindowVisible
 * @text Category window opacity
 * @desc Makes the category window opaque.
 * @type boolean
 * @default true
 * @parent OptionCategorySetting
 * 
 * @param OptionPageSetting
 * @text Option Page Settings
 * @default ------------------------------
 * 
 * @param OptionPageWindowX
 * @text Option page window X coordinate
 * @desc X coordinate of the options page window
 * @type number
 * @default 240
 * @min -9999
 * @parent OptionPageSetting
 * 
 * @param OptionPageWindowY
 * @desc Y coordinate of the options page window
 * @text Option page window Y coordinate
 * @type number
 * @default 100
 * @min -9999
 * @parent OptionPageSetting
 * 
 * @param OptionPageWindowWidth
 * @desc The width of the options page window.
 * @text Option Page Window Width
 * @type number
 * @default 1000
 * @min 0
 * @parent OptionPageSetting
 * 
 * @param OptionPageWindowVisibleRows
 * @desc Maximum number of rows displayed in the options page window.
 * @text Maximum number of rows displayed
 * @type number
 * @default 10
 * @min 1
 * @parent OptionPageSetting
 * 
 * @param MaxOptionPageWindowRows
 * @desc Maximum number of rows in an options page window.
 * @text Option Page Window Maximum Rows
 * @type number
 * @default 7
 * @min 1
 * @parent OptionPageSetting
 * 
 * @param OptionPageWindowVisible
 * @text Option Page Window Opacity
 * @desc Makes the options page window opaque.
 * @type boolean
 * @default true
 * @parent OptionPageSetting
 * 
 * @param KeyConfigSetting
 * @text Key Settings
 * @default ------------------------------
 * 
 * @param KeyConfigData
 * @text Key config settings
 * @desc Set the key configuration you want to set.
 * @default ["{\"OptionName\":\"Dash\",\"OptionSymbol\":\"\\\"shift\\\"\",\"ChangeKeyList\":\"-1\"}","{\"OptionName\":\"Previous Page\",\"OptionSymbol\":\"\\\"pageup\\\"\",\"ChangeKeyList\":\"-1\"}","{\"OptionName\":\"Next Page\",\"OptionSymbol\":\"\\\"pagedown\\\"\",\"ChangeKeyList\":\"-1\"}","{\"OptionName\":\"Reset\",\"OptionSymbol\":\"\\\"reset\\\"\"}"]
 * @type struct<KeyConfigList>[]
 * @parent KeyConfigSetting
 * 
 * @param KeyConfigFormat
 * @desc Expression to run when determining a command.
 * @text Evaluation formula when determining command
 * @type combo
 * @option "SceneManager.push(Mano_InputConfig.Scene_KeyConfig)"
 * @default
 * @parent KeyConfigSetting
 * 
 * @param SelectNameColor
 * @text Key setting selected color
 * @desc Specifies the color of the selected item in the key settings.
 * @type color
 * @default 17
 * @min 0
 * @parent KeyConfigSetting
 * 
 * @param KeyConfigFocusHide
 * @text Clear window when key configuration is focused
 * @desc When selecting a key configuration setting, the options window will be hidden.
 * @type boolean
 * @default false
 * @parent KeyConfigSetting
 * 
 * @param GamePadConfigSetting
 * @text Gamepad Settings
 * @default ------------------------------
 * 
 * @param GamePadConfigData
 * @text Gamepad Settings
 * @desc Configure the gamepad you want to set up.
 * @default ["{\"OptionName\":\"Menu\",\"OptionSymbol\":\"\\\"menu\\\"\"}","{\"OptionName\":\"Dash\",\"OptionSymbol\":\"\\\"shift\\\"\",\"ChangeKeyList\":\"-1\"}","{\"OptionName\":\"Previous Page\",\"OptionSymbol\":\"\\\"pageup\\\"\",\"ChangeKeyList\":\"-1\"}","{\"OptionName\":\"Next Page\",\"OptionSymbol\":\"\\\"pagedown\\\"\",\"ChangeKeyList\":\"-1\"}","{\"OptionName\":\"Reset\",\"OptionSymbol\":\"\\\"reset\\\"\"}"]
 * @type struct<KeyConfigList>[]
 * @parent GamePadConfigSetting
 * 
 * @param GamePadFormat
 * @desc Expression to run when determining a command.
 * @text Evaluation formula when determining command
 * @type combo
 * @option "SceneManager.push(Mano_InputConfig.Scene_GamepadConfig)"
 * @default
 * @parent GamePadConfigSetting
 * 
 * @param GamepadConfigFocusHide
 * @text Clear window when gamepad is focused
 * @desc Dismiss the options window when selecting a gamepad setting.
 * @type boolean
 * @default false
 * @parent GamePadConfigSetting
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
 */
/*~struct~CommandOptionList:
 * 
 * @param OptionsData
 * @text Option item settings
 * @desc Set the option items to be set.
 * @default 
 * @type struct<OptionList>[]
 * 
 * @param OptionName
 * @desc Option Name.
 * @text Option Name
 * @type string
 * @default 
 * 
 * @param OptionCommandSymbol
 * @desc Command Symbol Name.
 * @text Command Symbol Name
 * @type combo
 * @option 'GamePad'
 * @option 'KeyConfig'
 * @default 
 * 
 * 
 */
/*~struct~OptionList:
 * 
 * @param OptionName
 * @desc Option Name.
 * @text Option Name
 * @type string
 * @default 
 * 
 * @param OptionSymbol
 * @desc Command Symbol Name.
 * @text Command Symbol Name
 * @type combo
 * @option "alwaysDash"
 * @option "commandRemember"
 * @option "touchUI"
 * @option "bgmVolume"
 * @option "bgsVolume"
 * @option "meVolume"
 * @option "seVolume"
 * @option "gamePadVibration"
 * @option "startUpFullScreen"
 * @default 
 * 
 * @param OptionHidden
 * @desc Enter the conditions to be displayed in the command.
 * @text Command display conditions
 * @type combo
 * @option '$gameSwitches.value(0);'
 * @option '!!navigator.getGamepads()[0];//Gamepad in use detection'
 * @default
 * 
 * @param OptionConfigSetting
 * @text Optional Advanced Settings
 * @default ------------------------------
 * 
 * @param Var
 * @text Variable(1)(2)
 * @desc Specify the variables.
 * @default 0
 * @type variable
 * 
 * @param Switch
 * @text Switch(2)
 * @desc Specifies the switch.
 * @type switch
 * @default 0
 * 
 * @param OptionsStringList
 * @text Optional Parameter Name(1)
 * @desc Sets the optional parameter name.
 * @default []
 * @type string[]
 * 
 * @param GlobalConfigData
 * @desc Applies to all save data.
 * @text All save data applies(2)
 * @type boolean
 * @default false
 * 
 */
/*~struct~KeyConfigList:
 * 
 * @param OptionName
 * @desc Option Name.
 * @text Option Name
 * @type string
 * @default 
 * 
 * @param OptionSymbol
 * @desc Command Symbol Name.
 * @text Command Symbol Name
 * @type combo
 * @option "escape"
 * @option "shift"
 * @option "pageup"
 * @option "pagedown"
 * @option "menu"
 * @option "reset"
 * @default 
 * 
 * 
 */
/*~struct~PlaySe:
 * 
 * @param name
 * @text SE
 * @desc Play se.
 * @type file
 * @dir audio/se/
 * 
 * @param volume
 * @text Volume
 * @desc Set the volume to SE.
 * @type number
 * @default 90
 * 
 * @param pitch
 * @text Pitch
 * @desc Set the pitch to SE.
 * @type number
 * @default 100
 * 
 * @param pan
 * @text Pan
 * @desc Set the phase to SE.
 * @type number
 * @default 0
 * @max 100
 * @min -100
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc オプション拡張
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.1
 * 
 * @help
 * オプション画面を拡張します。
 * 
 * キー、ゲームパッドのキー(ボタン)変更の操作
 * キー、ゲームパッドのキー、ボタンの変更は変更したい項目でEnter(決定ボタン)を押し、任意のキー(ボタン)を押します。
 * 既に設定済みのキー(ボタン)、予約キー(ボタン)は設定できません。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/8/16 Ver.1.0.1
 * ウィンドウを透明にする機能を追加。
 * 2024/8/15 Ver.1.0.0
 * 初版
 * 
 * 
 * @param ResetPlaySe
 * @text リセット時再生SE
 * @desc リセット時の再生するSE。
 * @default 
 * @type struct<PlaySe>
 * 
 * @param OptionCategorySetting
 * @text オプションカテゴリー設定
 * @default ------------------------------
 * 
 * @param CommandOptions
 * @text 表示カテゴリーオプション設定
 * @desc 表示するオプションのカテゴリー設定を行います。
 * @default ["{\"OptionsData\":\"[\\\"{\\\\\\\"OptionName\\\\\\\":\\\\\\\"常時ダッシュ\\\\\\\",\\\\\\\"OptionSymbol\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"alwaysDash\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"OptionHidden\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OptionConfigSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Var\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Switch\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"OptionsStringList\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"GlobalConfigData\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"OptionName\\\\\\\":\\\\\\\"コマンド記憶\\\\\\\",\\\\\\\"OptionSymbol\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"commandRemember\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"OptionHidden\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OptionConfigSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Var\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Switch\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"OptionsStringList\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"GlobalConfigData\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"OptionName\\\\\\\":\\\\\\\"タッチUI\\\\\\\",\\\\\\\"OptionSymbol\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"touchUI\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"OptionHidden\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OptionConfigSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Var\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Switch\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"OptionsStringList\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"GlobalConfigData\\\\\\\":\\\\\\\"true\\\\\\\"}\\\"]\",\"OptionName\":\"ゲームプレイ\",\"OptionCommandSymbol\":\"gamesetting\"}","{\"OptionsData\":\"[\\\"{\\\\\\\"OptionName\\\\\\\":\\\\\\\"BGM 音量\\\\\\\",\\\\\\\"OptionSymbol\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"bgmVolume\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"OptionHidden\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OptionConfigSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Var\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Switch\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"OptionsStringList\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"GlobalConfigData\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"OptionName\\\\\\\":\\\\\\\"BGS 音量\\\\\\\",\\\\\\\"OptionSymbol\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"bgsVolume\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"OptionHidden\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OptionConfigSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Var\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Switch\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"OptionsStringList\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"GlobalConfigData\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"OptionName\\\\\\\":\\\\\\\"ME 音量\\\\\\\",\\\\\\\"OptionSymbol\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"meVolume\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"OptionHidden\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OptionConfigSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Var\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Switch\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"OptionsStringList\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"GlobalConfigData\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"OptionName\\\\\\\":\\\\\\\"SE 音量\\\\\\\",\\\\\\\"OptionSymbol\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"seVolume\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"OptionHidden\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OptionConfigSetting\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"Var\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Switch\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"OptionsStringList\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"GlobalConfigData\\\\\\\":\\\\\\\"true\\\\\\\"}\\\"]\",\"OptionName\":\"サウンド\",\"OptionCommandSymbol\":\"sound\"}","{\"OptionsData\":\"\",\"OptionName\":\"キー設定\",\"OptionCommandSymbol\":\"'KeyConfig'\"}","{\"OptionsData\":\"\",\"OptionName\":\"ゲームパッド\",\"OptionCommandSymbol\":\"'GamePad'\"}"]
 * @type struct<CommandOptionList>[]
 * @parent OptionCategorySetting
 * 
 * @param OptionCategoryWindowX
 * @text カテゴリーウィンドウX座標
 * @desc カテゴリーウィンドウのX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent OptionCategorySetting
 * 
 * @param OptionCategoryWindowY
 * @desc カテゴリーウィンドウのY座標
 * @text カテゴリーウィンドウY座標
 * @type number
 * @default 100
 * @min -9999
 * @parent OptionCategorySetting
 * 
 * @param OptionCategoryWindowWidth
 * @desc カテゴリーウィンドウの横幅。
 * @text カテゴリーウィンドウ横幅
 * @type number
 * @default 240
 * @min 0
 * @parent OptionCategorySetting
 * 
 * @param OptionCategoryWindowHeightRows
 * @text カテゴリーウィンドウ行数
 * @desc カテゴリーウィンドウの行数。
 * @type number
 * @default 4
 * @min 0
 * @parent OptionCategorySetting
 * 
 * @param OptionCategoryWindowCols
 * @desc カテゴリー列数
 * @text カテゴリー列数
 * @type number
 * @default 1
 * @min 1
 * @parent OptionCategorySetting
 * 
 * @param OptionCategoryWindowVisible
 * @text カテゴリーウィンドウ不透明化
 * @desc カテゴリーウィンドウを不透明化する。
 * @type boolean
 * @default true
 * @parent OptionCategorySetting
 * 
 * @param OptionPageSetting
 * @text オプションページ設定
 * @default ------------------------------
 * 
 * @param OptionPageWindowX
 * @text オプションページウィンドウX座標
 * @desc オプションページウィンドウのX座標
 * @type number
 * @default 240
 * @min -9999
 * @parent OptionPageSetting
 * 
 * @param OptionPageWindowY
 * @desc オプションページウィンドウのY座標
 * @text オプションページウィンドウY座標
 * @type number
 * @default 100
 * @min -9999
 * @parent OptionPageSetting
 * 
 * @param OptionPageWindowWidth
 * @desc オプションページウィンドウの横幅。
 * @text オプションページウィンドウ横幅
 * @type number
 * @default 1000
 * @min 0
 * @parent OptionPageSetting
 * 
 * @param OptionPageWindowVisibleRows
 * @desc オプションページウィンドウの最大表示行数。
 * @text オプションページウィンドウ最大表示行数
 * @type number
 * @default 10
 * @min 1
 * @parent OptionPageSetting
 * 
 * @param MaxOptionPageWindowRows
 * @desc オプションページウィンドウの最大行数。
 * @text オプションページウィンドウ最大行数
 * @type number
 * @default 7
 * @min 1
 * @parent OptionPageSetting
 * 
 * @param OptionPageWindowVisible
 * @text オプションページウィンドウ不透明化
 * @desc オプションページウィンドウを不透明化する。
 * @type boolean
 * @default true
 * @parent OptionPageSetting
 * 
 * @param KeyConfigSetting
 * @text キー設定
 * @default ------------------------------
 * 
 * @param KeyConfigData
 * @text キーコンフィグ設定
 * @desc 設定するキーコンフィグの設定を行います。
 * @default ["{\"OptionName\":\"ダッシュ\",\"OptionSymbol\":\"\\\"shift\\\"\",\"ChangeKeyList\":\"-1\"}","{\"OptionName\":\"前ページ\",\"OptionSymbol\":\"\\\"pageup\\\"\",\"ChangeKeyList\":\"-1\"}","{\"OptionName\":\"次ページ\",\"OptionSymbol\":\"\\\"pagedown\\\"\",\"ChangeKeyList\":\"-1\"}","{\"OptionName\":\"リセット\",\"OptionSymbol\":\"\\\"reset\\\"\"}"]
 * @type struct<KeyConfigList>[]
 * @parent KeyConfigSetting
 * 
 * @param KeyConfigFormat
 * @desc コマンド決定時に実行する式。
 * @text コマンド決定時評価式
 * @type combo
 * @option "SceneManager.push(Mano_InputConfig.Scene_KeyConfig)"
 * @default
 * @parent KeyConfigSetting
 * 
 * @param SelectNameColor
 * @text キー設定選択中色
 * @desc キー設定で選択中の項目の色を指定します。
 * @type color
 * @default 17
 * @min 0
 * @parent KeyConfigSetting
 * 
 * @param KeyConfigFocusHide
 * @text キーコンフィグフォーカス時ウィンドウ消去
 * @desc キーコンフィグ設定選択時にオプションウィンドウを消去します。
 * @type boolean
 * @default false
 * @parent KeyConfigSetting
 * 
 * @param GamePadConfigSetting
 * @text ゲームパッド設定
 * @default ------------------------------
 * 
 * @param GamePadConfigData
 * @text ゲームパッド設定
 * @desc 設定するゲームパッドの設定を行います。
 * @default ["{\"OptionName\":\"メニュー\",\"OptionSymbol\":\"\\\"menu\\\"\"}","{\"OptionName\":\"ダッシュ\",\"OptionSymbol\":\"\\\"shift\\\"\",\"ChangeKeyList\":\"-1\"}","{\"OptionName\":\"前ページ\",\"OptionSymbol\":\"\\\"pageup\\\"\",\"ChangeKeyList\":\"-1\"}","{\"OptionName\":\"次ページ\",\"OptionSymbol\":\"\\\"pagedown\\\"\",\"ChangeKeyList\":\"-1\"}","{\"OptionName\":\"リセット\",\"OptionSymbol\":\"\\\"reset\\\"\"}"]
 * @type struct<KeyConfigList>[]
 * @parent GamePadConfigSetting
 * 
 * @param GamePadFormat
 * @desc コマンド決定時に実行する式。
 * @text コマンド決定時評価式
 * @type combo
 * @option "SceneManager.push(Mano_InputConfig.Scene_GamepadConfig)"
 * @default
 * @parent GamePadConfigSetting
 * 
 * @param GamepadConfigFocusHide
 * @text ゲームパッドフォーカス時ウィンドウ消去
 * @desc ゲームパッド設定選択時にオプションウィンドウを消去します。
 * @type boolean
 * @default false
 * @parent GamePadConfigSetting
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
 */
/*~struct~CommandOptionList:ja
 * 
 * @param OptionsData
 * @text オプション項目設定
 * @desc 設定するオプション項目を設定します。
 * @default []
 * @type struct<OptionList>[]
 * 
 * @param OptionName
 * @desc コマンド名
 * @text コマンド名
 * @type string
 * @default 
 * 
 * @param OptionCommandSymbol
 * @desc コマンドシンボル名
 * @text コマンドシンボル名
 * @type combo
 * @option 'GamePad'
 * @option 'KeyConfig'
 * @default 
 * 
 * 
 */
/*~struct~OptionList:ja
 * 
 * @param OptionName
 * @desc オプション名
 * @text オプション名
 * @type string
 * @default 
 * 
 * @param OptionSymbol
 * @desc コマンドシンボル名
 * @text コマンドシンボル名
 * @type combo
 * @option "alwaysDash"
 * @option "commandRemember"
 * @option "touchUI"
 * @option "bgmVolume"
 * @option "bgsVolume"
 * @option "meVolume"
 * @option "seVolume"
 * @option "gamePadVibration"
 * @option "startUpFullScreen"
 * @default 
 * 
 * @param OptionHidden
 * @desc コマンドに表示させる条件を記入します。
 * @text コマンド表示条件
 * @type combo
 * @option '$gameSwitches.value(0);'
 * @option '!!navigator.getGamepads()[0];//ゲームパッド使用中判定'
 * @default
 * 
 * @param OptionConfigSetting
 * @text オプション詳細設定
 * @default ------------------------------
 * 
 * @param Var
 * @text 変数
 * @desc 変数を指定します。
 * @default 0
 * @type variable
 * 
 * @param Switch
 * @text スイッチ
 * @desc スイッチを指定します。
 * @type switch
 * @default 0
 * 
 * @param OptionsStringList
 * @text オプションパラメータ名
 * @desc オプションのパラメータ名を設定します。
 * @default []
 * @type string[]
 * 
 * @param GlobalConfigData
 * @desc 全てのセーブデータに適用します。
 * @text 全セーブデータ適用
 * @type boolean
 * @default false
 * 
 */
/*~struct~KeyConfigList:ja
 * 
 * @param OptionName
 * @desc オプション名
 * @text オプション名
 * @type string
 * @default 
 * 
 * @param OptionSymbol
 * @desc コマンドシンボル名
 * @text コマンドシンボル名
 * @type combo
 * @option "escape"
 * @option "shift"
 * @option "pageup"
 * @option "pagedown"
 * @option "menu"
 * @option "reset"
 * @default 
 * 
 * 
 */
/*~struct~PlaySe:ja
 * 
 * @param name
 * @text SE
 * @desc 再生SE
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
Imported.NUUN_OptionEx = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    const parameters = PluginManager.parameters('NUUN_OptionEx');
    const keyMapper = Input.keyMapper;
    const gamepadMapper = Input.gamepadMapper;

    params.KeyConfigData.forEach(list => {
        const data = list.OptionSymbol;
        if (data === "escape" || data === "ok" || data === "cancel") {
            const log = data + ($gameSystem.isJapanese() ? "は使用できません。" : "An invalid ID has been configured.");
            throw ["DataError", log];
        }
    })

    Scene_Options.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createCategoryWindow();
        this.createOptionsWindow();
    };

    Scene_Options.prototype.createCategoryWindow = function() {
        if (params.CommandOptions && params.CommandOptions.length > 1) {
            const rect = this.categoryWindowRect();
            this._optionsCategoryWindow = new Window_CategoryOptions(rect);
            this._optionsCategoryWindow.setHandler("ok", this.onCommandOk.bind(this));
            this._optionsCategoryWindow.setHandler("cancel", this.popScene.bind(this));
            this.addWindow(this._optionsCategoryWindow);
        }
    };

    Scene_Options.prototype.createOptionsWindow = function() {
        const rect = this.optionsWindowRect();
        this._optionsWindow = new Window_Options(rect);
        this._optionsWindow.setHandler("cancel", this.cancelOption.bind(this));
        this.addWindow(this._optionsWindow);
    };
    
    
    Scene_Options.prototype.categoryWindowRect = function() {
        const wx = params.OptionCategoryWindowX;
        const ww = params.OptionCategoryWindowWidth > 0 ? Math.min(params.OptionCategoryWindowWidth, Graphics.boxWidth - wx) : Graphics.boxWidth;
        const wh = this.calcWindowHeight(params.OptionCategoryWindowHeightRows, true);
        const wy = params.OptionCategoryWindowY + this.mainAreaTop();
        return new Rectangle(wx, wy, ww, wh);
    };

    const _Scene_Options_createOptionsWindow = Scene_Options.prototype.createOptionsWindow;
    Scene_Options.prototype.createOptionsWindow = function() {
        _Scene_Options_createOptionsWindow.apply(this, arguments);
        if (this._optionsCategoryWindow) {
            this._optionsCategoryWindow.setOptionWindow(this._optionsWindow);
            this._optionsWindow.deactivate();
        }
    };
    
    Scene_Options.prototype.optionsWindowRect = function() {
        const n = Math.min(this.maxCommands(), this.maxVisibleCommands());
        const wx = params.OptionPageWindowX;
        const ww = params.OptionPageWindowWidth > 0 ? Math.min(params.OptionPageWindowWidth, Graphics.boxWidth - wx) : Graphics.boxWidth;
        const wh = this.calcWindowHeight(n, true);
        const wy = params.OptionPageWindowY + this.mainAreaTop();
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Options.prototype.onCommandOk = function() {
        this._optionsCategoryWindow.deactivate();
        if (this._optionsCategoryWindow.currentSymbol() === 'KeyConfig' && !!params.KeyConfigFormat) {
            eval(params.KeyConfigFormat);
        } else if (this._optionsCategoryWindow.currentSymbol() === 'GamePad' && !!params.GamePadFormat) {
            eval(params.GamePadFormat);
        } else {
            this._optionsWindow.activate();
            this._optionsWindow.select(0);
            this._optionsWindow.configIndexClear();
            this._optionsWindow.refresh();
        }
    };

    Scene_Options.prototype.cancelOption = function() {
        if (this._optionsWindow.setupKeyMode) {
            this._optionsWindow.setupKeyMode = false;
            this._optionsWindow.activate();
        } else {
            if (this._optionsCategoryWindow) {
                this._optionsCategoryWindow.activate();
                this._optionsWindow.deactivate();
            } else {
                this.popScene();
            }
        }
    };

    Scene_Options.prototype.maxCommands = function() {
        return params.MaxOptionPageWindowRows;
    };

    Scene_Options.prototype.maxVisibleCommands = function() {
        return params.OptionPageWindowVisibleRows;
    };

    if (Scene_Options.prototype.createBackground == Scene_MenuBase.prototype.createBackground) {
        Scene_Options.prototype.createBackground = function() {
            Scene_MenuBase.prototype.createBackground.apply(this, arguments);
        };
    }

    const _Scene_Options_createBackground = Scene_Options.prototype.createBackground;
    Scene_Options.prototype.createBackground = function() {
        _Scene_Options_createBackground.apply(this, arguments);
        if (params.BackGroundImg) {
            const bitmap = ImageManager.nuun_LoadPictures(params.BackGroundImg);
            const sprite = new Sprite(bitmap);
            this.addChild(sprite);
            bitmap.addLoadListener(function() {
                this.setBackGround(sprite);
            }.bind(this));
        }
    };

    Scene_Options.prototype.setBackGround = function(sprite) {
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


    function Window_CategoryOptions() {
        this.initialize(...arguments);
    }
    
    Window_CategoryOptions.prototype = Object.create(Window_Command.prototype);
    Window_CategoryOptions.prototype.constructor = Window_CategoryOptions;
    
    Window_CategoryOptions.prototype.initialize = function(rect) {
        Window_Command.prototype.initialize.call(this, rect);
        this.opacity = params.OptionCategoryWindowVisible ? 255 : 0;
    };

    Window_CategoryOptions.prototype.setOptionWindow = function(optionWindow) {
        this._optionWindow = optionWindow;
    };

    Window_CategoryOptions.prototype.makeCommandList = function() {
        this.addCategoryOptions();
    };

    Window_CategoryOptions.prototype.maxCols = function() {
        return params.OptionCategoryWindowCols;
    };

    Window_CategoryOptions.prototype.update = function() {
        Window_Command.prototype.update.call(this);
        if (this._optionWindow) {
            this._optionWindow.setCategory(this.currentSymbol());
        }
    };

    Window_CategoryOptions.prototype.addCategoryOptions = function() {
        params.CommandOptions.forEach((data, index) => {
            if (data.OptionName) {
                this.addCommand(data.OptionName, data.OptionCommandSymbol);
            }
        });
    };


    const _Window_Options_initialize = Window_Options.prototype.initialize;
    Window_Options.prototype.initialize = function(rect) {
        _Window_Options_initialize.call(this, rect);
        this.setupEventHandlers();
        this._category = "none";
        this._configIndex = 0;
        this.setupKeyMode = false;
        this.opacity = params.OptionPageWindowVisible ? 255 : 0;
    };

    Window_Options.prototype.setupEventHandlers = function() {
        document.addEventListener("keydown", this.onKeyDown.bind(this));
    };

    Window_Options.prototype.configIndexClear = function() {
        this._configIndex = 0;
    };

    Window_Options.prototype.setCategory = function(category) {
        Window_ItemList.prototype.setCategory.call(this, category);
    };

    Window_Options.prototype.makeCommandList = function() {
        const list = params.CommandOptions.find(data => data.OptionCommandSymbol === this._category);
        if (list) {
            if (list.OptionCommandSymbol === 'KeyConfig') {
                this.commandOptionsKeyConfig(list);
            } else if (list.OptionCommandSymbol === 'GamePad') {
                this.commandOptionsGamePad(list);
            } else {
                this.commandOptionsData(list);
            }
        }
    };

    if (Window_Options.prototype.update == Window_Selectable.prototype.update) {
        Window_Options.prototype.update = function() {
            Window_Selectable.prototype.update.apply(this, arguments);
        };
    }

    const _Window_Options_update = Window_Options.prototype.update;
    Window_Options.prototype.update = function() {
        _Window_Options_update.apply(this, arguments);
        this.updateGamePadActive();
    };

    Window_Options.prototype.updateGamePadActive = function() {
        if (this.activeFrame) {
            if (Input.nuun_onGamepads() < 0) {
                this.activeFrame = false;
                if (!this.setupKeyMode) {
                    this.activate();
                }
            }
            return;
        }
        if (this.setupKeyMode && !Input.isPressed("ok")) {
            const state = Input.nuun_onGamepads();
            if (state >= 0) {
                this.onButtonGamepad(state);
            }
        }
    };

    Window_Options.prototype.commandOptionsKeyConfig = function(list) {
        for (const data of params.KeyConfigData) {
            this.addCommand(data.OptionName, data.OptionSymbol);
        }
    };

    Window_Options.prototype.commandOptionsGamePad = function(list) {
        for (const data of params.GamePadConfigData) {
            this.addCommand(data.OptionName, data.OptionSymbol);
        }
    };

    Window_Options.prototype.commandOptionsData = function(list) {
        for (const data of list.OptionsData) {
            if (!data.OptionHidden || eval(data.OptionHidden)) {
                this.addCommand(data.OptionName, data.OptionSymbol, true, data);
            }
        }
    };

    const _Window_Options_processOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk = function() {
        if (this.isKeyConfig() || this.isGamePadConfig()) {
            this.setupKey();
        } else {
            _Window_Options_processOk.apply(this, arguments);
        }
    };

    const _Window_Options_cursorRight = Window_Options.prototype.cursorRight;
    Window_Options.prototype.cursorRight = function(wrap) {
        if (this.isKeyConfig()) {
            this.setConfigIndex(1);
        } else {
            _Window_Options_cursorRight.apply(this, arguments);
        }
    };
    
    const _Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
    Window_Options.prototype.cursorLeft = function(wrap) {
        if (this.isKeyConfig()) {
            this.setConfigIndex(-1);
        } else {
            _Window_Options_cursorLeft.apply(this, arguments);
        }
    };

    if (Window_Options.prototype.cursorDown == Window_Selectable.prototype.cursorDown) {
        Window_Options.prototype.cursorDown = function(wrap) {
            Window_Selectable.prototype.cursorDown.apply(this, arguments);
        };
    }

    const _Window_Options_cursorDown = Window_Options.prototype.cursorDown;
    Window_Options.prototype.cursorDown = function(wrap) {
        _Window_Options_cursorDown.apply(this, arguments);
        if (this.isKeyConfig() || this.isGamePadConfig()) {
            this.configIndexClear();
            this.refresh();
        }
    };

    if (Window_Options.prototype.cursorUp == Window_Selectable.prototype.cursorUp) {
        Window_Options.prototype.cursorUp = function(wrap) {
            Window_Selectable.prototype.cursorUp.apply(this, arguments);
        };
    }
    
    const _Window_Options_cursorUp = Window_Options.prototype.cursorUp;
    Window_Options.prototype.cursorUp = function(wrap) {
        _Window_Options_cursorUp.apply(this, arguments);
        if (this.isKeyConfig() || this.isGamePadConfig()) {
            this.configIndexClear();
            this.refresh();
        }
    };

    Window_Options.prototype.setConfigIndex = function(value) {
        const symbol = this.commandSymbol(this.index())
        const oldIndex = this._configIndex;
        this._configIndex += value;
        this._configIndex = this._configIndex.clamp(0, _getKeyCodeList(symbol).length - 1);
        if (oldIndex !== this._configIndex) {
            this.redrawItem(this.findSymbol(symbol));
            this.playCursorSound();
        }
    };

    Window_Options.prototype.setupKey = function() {
        if (this.isReset(this.index())) {
            this.resetKey();
        } else {
            this.setupKeyMode = true;
            this.deactivate();
        }
    };

    Window_Options.prototype.resetKey = function() {
        if (this.isKeyConfig()) {
            _resetKeyConfig();
            ConfigManager.keyConfig = {};

        } else if (this.isGamePadConfig()) {
            _resetGamepadConfig();
            ConfigManager.gamePadConfig = {};
        }
        this.refresh();
        _playResetSound(params.ResetPlaySe)
    };

    if (Window_Options.prototype.refresh == Window_Command.prototype.refresh) {
        Window_Options.prototype.refresh = function() {
            Window_Command.prototype.refresh.apply(this, arguments);
        };
    }

    const _Window_Options_refresh = Window_Options.prototype.refresh;
    Window_Options.prototype.refresh = function() {
        this.optionFocusHide();
        _Window_Options_refresh.apply(this, arguments);
    };

    const _Window_Options_drawItem = Window_Options.prototype.drawItem;
    Window_Options.prototype.drawItem = function(index) {
        if (this.isKeyConfig()) {
            this.drawKeyConfig(index);
        } else if (this.isGamePadConfig()) {
            this.drawGamePadConfig(index);
        } else {
            _Window_Options_drawItem.apply(this, arguments);
        }
    };

    Window_Options.prototype.drawKeyConfig = function(index) {
        const title = this.commandName(index);
        const rect = this.itemLineRect(index);
        const statusWidth = this.keyStatusWidth();
        const titleWidth = rect.width - statusWidth;
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        if (!this.isReset(index)) {
            this.drawText(title, rect.x, rect.y, titleWidth, "left");
            this.drawKeyList(index, rect.x + titleWidth, rect.y, statusWidth);
        } else {
            this.drawText(title, rect.x, rect.y, rect.width, "center");
        }
    };

    Window_Options.prototype.drawKeyList = function(index, x, y, width) {
        const list = _getKeyCodeList(this.commandSymbol(index));
        const w = Math.floor(width / list.length);
        list.forEach((code, i) => {
            this.index() === index && this._configIndex === i ? this.changeTextColor(NuunManager.getColorCode(params.SelectNameColor)) : this.resetTextColor();
            this.drawText(_getKey(code), x + (i * w), y, w - this.itemPadding(), "center");
        })
    };

    Window_Options.prototype.drawGamePadConfig = function(index) {
        const title = this.commandName(index);
        const rect = this.itemLineRect(index);
        const statusWidth = this.keyStatusWidth();
        const titleWidth = rect.width - statusWidth;
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        if (!this.isReset(index)) {
            this.drawText(title, rect.x, rect.y, titleWidth, "left");
            this.drawGamePadList(index, rect.x + titleWidth, rect.y, statusWidth);
        } else {
            this.drawText(title, rect.x, rect.y, rect.width, "center");
        }
    };

    Window_Options.prototype.drawGamePadList = function(index, x, y, width) {
        const list = _getGamePadCodeList(this.commandSymbol(index));
        const w = Math.floor(width / list.length);
        list.forEach((code, i) => {
            this.resetTextColor();
            this.drawText(_getGamePadKey(code), x + (i * w), y, w - this.itemPadding(), "center");
        })
    };

    const _Window_Options_changeValue = Window_Options.prototype.changeValue;
    Window_Options.prototype.changeValue = function(symbol, value) {
        const data = this.getExtData(symbol);
        if (data && data.Var > 0) {
            value = this.changeVariables(data, symbol, value);
        } else if (data && data.Switch > 0) {
            this.changeSwitches(data, symbol, value);
        }
        _Window_Options_changeValue.apply(this, arguments);
    };

    Window_Options.prototype.changeVariables = function(data, symbol, value) {
        let varValue = $gameVariables.value(data.Var);
        varValue += value ? 1 : -1;
        varValue = varValue.clamp(0, data.OptionsStringList.length - 1);
        $gameVariables.setValue(data.Var, varValue);
        return varValue;
    };

    Window_Options.prototype.setConfigValue = function(symbol, volume) {
        ConfigManager[symbol] = volume;
    };

    Window_Options.prototype.changeSwitches = function(data, symbol, value) {
        $gameSwitches.setValue(data.Switch, value);
    };

    Window_Options.prototype.keyStatusWidth = function() {
        return this.itemWidth() - Math.floor(this.itemWidth() / 3);
    };

    const _Window_Options_statusText = Window_Options.prototype.statusText;
    Window_Options.prototype.statusText = function(index) {
        const symbol = this.commandSymbol(index);
        const value = this.getConfigValue(symbol);
        const data = this.getExtData(symbol);
        if (data && data.Var > 0) {
            return this.variablesStatusText(data, value);
        } else if (data && data.Switch > 0) {
            return this.booleanStatusText(value);
        } else {
            return _Window_Options_statusText.apply(this, arguments);
        }
    };

    Window_Options.prototype.isReset = function(index) {
        return this.commandSymbol(index) === "reset";
    };

    Window_Options.prototype.isKeyConfig = function() {
        return this._category === "KeyConfig";
    };

    Window_Options.prototype.isGamePadConfig = function() {
        return this._category === "GamePad";
    };

    Window_Options.prototype.getExtData = function(symbol) {
        return this._list[this.findSymbol(symbol)].ext;
    };

    Window_Options.prototype.variablesStatusText = function(data, value = $gameVariables.value(data.Var)) {
        return data.OptionsStringList[value];
    };

    Window_Options.prototype.keyMapperStatusText = function(value) {
        return keyMapper[13];
    };

    Window_Options.prototype.optionFocusHide = function() {
        if (this.isKeyConfig() && params.KeyConfigFocusHide) {
            this.hide();
        } else if (this.isGamePadConfig() && params.GamepadConfigFocusHide) {
            this.hide();
        } else {
            this.show();
        }
    };

    Window_Options.prototype.onKeyDown = function(event) {
        if (this.setupKeyMode && event.keyCode) {
            if (this.isKeyConfig()) {
                this.setupKeyCode(event.keyCode);
            } else if (this.isGamePadConfig()) {
                if (keyMapper[event.keyCode] === "escape" || keyMapper[event.keyCode] === "cancel") {
                    SoundManager.playCancel();
                    this.activate();
                    return;
                }
            }
        }
    };

    Window_Options.prototype.onButtonGamepad = function(code) {
        if (this.isKeyConfig()) {
            if (gamepadMapper[code] === "cancel") {
                SoundManager.playCancel();
                this.setupKeyMode = false;
                this.activeFrame = true;
            }
        } else if (this.isGamePadConfig()) {
            this.setupGamePadCode(code);
        }
    };

    Window_Options.prototype.setupKeyCode = function(code) {
        const symbol = this.commandSymbol(this.index());
        const list = _getKeyCodeList(symbol);
        if (keyMapper[code] === "escape" || keyMapper[code] === "cancel") {
            SoundManager.playCancel();
            this.activate();
            return;
        }
        if (Input._currentState[symbol]) {
            Input._currentState[symbol] = false;
        }
        if (!!keyMapper[code] || this.isInvalidKey(code)) {
            this.playBuzzerSound();
            return;
        }
        if (code === 46) {
            keyMapper[list[this._configIndex]] = "";
        } else if (list[this._configIndex] < 0) {
            keyMapper[code] = symbol;
        } else {
            keyMapper[list[this._configIndex]] = "";
            keyMapper[code] = symbol;
        }
        this.redrawItem(this.findSymbol(symbol));
        this.playOkSound();
        if (_getKeyCodeList(symbol).length > 1) {
            this.setKeyConfigValue(symbol, code);
            this.setupKeyMode = false;
            this.activate();
        }
    };

    Window_Options.prototype.isInvalidKey = function(code) {
        const list = _invalidKeyList();
        return list.includes(code);
    };

    Window_Options.prototype.setKeyConfigValue = function(symbol, code) {
        if (!ConfigManager.keyConfig) {
            ConfigManager.keyConfig = {};
        }
        const config = ConfigManager.keyConfig;
        config[symbol] = code;
    };

    Window_Options.prototype.setupGamePadCode = function(code) {
        const symbol = this.commandSymbol(this.index());
        const list = _getGamePadCodeList(symbol);
        if (gamepadMapper[code] === "cancel") {
            SoundManager.playCancel();
            this.setupKeyMode = false;
            this.activeFrame = true;
            return;
        }
        if (!!gamepadMapper[code]) {
            this.playBuzzerSound();
            this.activeFrame = true;
            return;
        }
        gamepadMapper[list[this._configIndex]] = "";
        gamepadMapper[code] = symbol;
        this.redrawItem(this.findSymbol(symbol));
        this.playOkSound();
        if (_getKeyCodeList(symbol).length > 1) {
            this.setGamePadConfigValue(symbol, code);
            this.setupKeyMode = false;
        }
        this.activeFrame = true;
    };

    Window_Options.prototype.setGamePadConfigValue = function(symbol, code) {
        if (!ConfigManager.gamePadConfig) {
            ConfigManager.gamePadConfig = {};
        }
        const config = ConfigManager.gamePadConfig;
        config[symbol] = code;
    };

    if (Window_Options.prototype.onTouchSelect == Window_Selectable.prototype.onTouchSelect) {
        Window_Options.prototype.onTouchSelect = function(trigge) {
            Window_Selectable.prototype.onTouchSelect.apply(this, arguments);
        };
    }

    const _Window_Options_onTouchSelect = Window_Options.prototype.onTouchSelect;
    Window_Options.prototype.onTouchSelect = function(trigger) {
        _Window_Options_onTouchSelect.apply(this, arguments);
        if (this.isCursorMovable()) {
            if (this.isKeyConfig() || this.isGamePadConfig()) {
                this._configIndex = 0;
                this.refresh();
            }
        }
        
    };


    const _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        let config = _ConfigManager_makeData.apply(this, arguments);
        config = this.makeOptionsData(config);
        config = this.makeKeyConfig(config);
        config = this.makeGamePadConfig(config);
        return config;
    };

    ConfigManager.makeOptionsData = function(config) {
        params.CommandOptions.forEach(optionList => {
            if (optionList.OptionsData) {
                optionList.OptionsData.forEach(data => {
                    if (data.GlobalConfigData) {
                        if (data.Var > 0) {
                            config[data.OptionSymbol] = this[data.OptionSymbol] ? this[data.OptionSymbol] : $gameVariables.value(data.Var);
                        } else if (data.Switch > 0) {
                            config[data.OptionSymbol] = this[data.OptionSymbol] ? this[data.OptionSymbol] : $gameSwitches.value(data.Switch);
                        }
                    }
                })
            }
        })
        return config;
    };

    ConfigManager.makeKeyConfig = function(config) {
        if (this.keyConfig) {
            config.keyConfig = {};
            for (const key in this.keyConfig) {
                config.keyConfig[key] = this.keyConfig[key];
            }
        }
        return config;
    };

    ConfigManager.makeGamePadConfig = function(config) {
        if (this.gamePadConfig) {
            config.gamePadConfig = {};
            for (const key in this.gamePadConfig) {
                config.gamePadConfig[key] = this.gamePadConfig[key];
            }
        }
        return config;
    };

    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.apply(this, arguments);
        this.applyOptionsData(config);
        this.applyKeyConfig(config);
        this.applyGamePadConfig(config);
    };

    ConfigManager.applyOptionsData = function(config) {
        params.CommandOptions.forEach(optionList => {
            optionList.OptionsData.forEach(data => {
                if (data.Var > 0 || data.Switch > 0) {
                    this[data.OptionSymbol] = this.readVolume(config, data.OptionSymbol);
                }
            })
        })
    };

    ConfigManager.applyKeyConfig = function(config) {
        const keyConfig = config.keyConfig;
        if (keyConfig) {
            this.keyConfig = {};
            for (const key in keyConfig) {
                const code = keyConfig[key];
                this.keyConfig[key] = code;
                keyMapper[code] = key;
            }
        }
    };

    ConfigManager.applyGamePadConfig = function(config) {
        const gamePadConfig = config.gamePadConfig;
        if (gamePadConfig) {
            this.gamePadConfig = {};
            for (const key in gamePadConfig) {
                const code = gamePadConfig[key];
                this.gamePadConfig[key] = code;
                gamepadMapper[code] = key;
            }
        }
    };

    ConfigManager.setDefaultMapper = function() {
        this._defaultKeyMapper = Object.freeze(_cloneObject(Input.keyMapper));
        this._defaultgamepadMapper = Object.freeze(_cloneObject(Input.gamepadMapper));
    };

    ConfigManager.getDefaultKeyMapper = function() {
        return this._defaultKeyMapper || Input.keyMapper;
    };

    ConfigManager.getDefaultGamepadMapper = function() {
        return this._defaultgamepadMapper || Input.gamepadMapper;
    };


    Input.nuun_onGamepads = function() {
        for (const status of this._gamepadStates) {
            for (let i = 0; i < status.length; i++) {
                if (status[i]) {
                    return i;
                }
            }
        }
        return -1;
    };


    const _Scene_Boot_onDatabaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function() {
        ConfigManager.setDefaultMapper();
        _Scene_Boot_onDatabaseLoaded.apply(this, arguments);
    };

    function _getKeyCodeList(symbol) {
        const keyList = [];
        for (const name in keyMapper) {
            if (keyMapper[name] === symbol) {
                keyList.push(Number(name));
            }
        }
        keyList.push(-1);
        return keyList;
    };

    function _getGamePadCodeList(symbol) {
        const keyList = [];
        for (const name in gamepadMapper) {
            if (gamepadMapper[name] === symbol) {
                keyList.push(Number(name));
            }
        }
        return keyList;
    };

    function _cloneObject(object) {
        const newObject = {};
        for (const obj in object) {
            newObject[obj] = object[obj];
            
        }
        return newObject;
    };

    function _resetKeyConfig() {
        const _keyMapper = ConfigManager.getDefaultKeyMapper();
        for (const code in Input.keyMapper) {
            Input.keyMapper[code] = _keyMapper[code] !== undefined ? _keyMapper[code] : '';
        }
    };

    function _resetGamepadConfig() {
        const _gamepadMapper = ConfigManager.getDefaultGamepadMapper();
        for (const code in Input.gamepadMapper) {
            Input.gamepadMapper[code] = _gamepadMapper[code] !== undefined ? _gamepadMapper[code] : '';
        }
    };

    function _playResetSound(playSe) {
        if (!!playSe) {
            AudioManager.playStaticSe(playSe);
        } else {
            SoundManager.playOk();
        }
    };

    function _invalidKeyList() {
        return [46, 145, 240, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 144];
    }

    function _getKey(code) {
        switch (code) {
            case -1:
                return "[Add Key]";
            case 8:
                return "BackSpace";
            case 9:
                return "Tab";
            case 13:
                return "Enter";
            case 16:
                return "Shift";
            case 17:
                return "Ctrl";
            case 18:
                return "Alt";
            case 19:
                return "Pause"
            case 27:
                return "Esc";
            case 32:
                return "Pause";
            case 33:
                return "PageUp";
            case 34:
                return "PageDown";
            case 35:
                return "End";
            case 36:
                return "Home";
            case 37:
                return "←";
            case 38:
                return "↑";
            case 39:
                return "→";
            case 40:
                return "↓";
            case 45:
                return "Insert";
            case 46:
                return "Delete";
            case 48:
                return "0";
            case 49:
                return "1";
            case 50:
                return "2";
            case 51:
                return "3";
            case 52:
                return "4";
            case 53:
                return "5";
            case 54:
                return "6";
            case 55:
                return "7";
            case 56:
                return "8";
            case 57:
                return "9";
            case 65:
                return "A";
            case 66:
                return "B";
            case 67:
                return "C";
            case 68:
                return "D";
            case 69:
                return "E";
            case 70:
                return "F";
            case 71:
                return "G";
            case 72:
                return "H";
            case 73:
                return "I";
            case 74:
                return "J";
            case 75:
                return "K";
            case 76:
                return "L";
            case 77:
                return "M";
            case 78:
                return "N";
            case 79:
                return "O";
            case 80:
                return "P";
            case 81:
                return "Q";
            case 82:
                return "R";
            case 83:
                return "S";
            case 84:
                return "T";
            case 85:
                return "U";
            case 86:
                return "V";
            case 87:
                return "W";
            case 88:
                return "X";
            case 89:
                return "Y";
            case 90:
                return "Z";
            case 91:
                return "Win";
            case 92:
                return "Apps";
            case 96:
                return "Num pad 0";
            case 97:
                return "Num pad 1";
            case 98:
                return "Num pad 2";
            case 99:
                return "Num pad 3";
            case 100:
                return "Num pad 4";
            case 101:
                return "Num pad 5";
            case 102:
                return "Num pad 6";
            case 103:
                return "Num pad 7";
            case 104:
                return "Num pad 8";
            case 105:
                return "Num pad 9";
        }
        return "";
    };

    function _invalidKey(code) {
        switch (code) {
            case 8:
                return "BackSpace";
            case 9:
                return "Tab";
            case 13:
                return "Enter";
            case 16:
                return "Shift";
            case 17:
                return "Ctrl";
            case 18:
                return "Alt";
            case 19:
                return "Pause"
            case 27:
                return "Esc";
            case 32:
                return "Pause";
            case 33:
                return "PageUp";
            case 34:
                return "PageDown";
            case 35:
                return "End";
            case 36:
                return "Home";
            case 37:
                return "←";
            case 38:
                return "↑";
            case 39:
                return "→";
            case 40:
                return "↓";
            case 45:
                return "Insert";
            case 46:
                return "Delete";
            case 48:
                return "0";
            case 49:
                return "1";
            case 50:
                return "2";
            case 51:
                return "3";
            case 52:
                return "4";
            case 53:
                return "5";
            case 54:
                return "6";
            case 55:
                return "7";
            case 56:
                return "8";
            case 57:
                return "9";
            case 65:
                return "A";
            case 66:
                return "B";
            case 67:
                return "C";
            case 68:
                return "D";
            case 69:
                return "E";
            case 70:
                return "F";
            case 71:
                return "G";
            case 72:
                return "H";
            case 73:
                return "I";
            case 74:
                return "J";
            case 75:
                return "K";
            case 76:
                return "L";
            case 77:
                return "M";
            case 78:
                return "N";
            case 79:
                return "O";
            case 80:
                return "P";
            case 81:
                return "Q";
            case 82:
                return "R";
            case 83:
                return "S";
            case 84:
                return "T";
            case 85:
                return "U";
            case 86:
                return "V";
            case 87:
                return "W";
            case 88:
                return "X";
            case 89:
                return "Y";
            case 90:
                return "Z";
            case 91:
                return "Win";
            case 92:
                return "Apps";
            case 96:
                return "Num pad 0";
            case 97:
                return "Num pad 1";
            case 98:
                return "Num pad 2";
            case 99:
                return "Num pad 3";
            case 100:
                return "Num pad 4";
            case 101:
                return "Num pad 5";
            case 102:
                return "Num pad 6";
            case 103:
                return "Num pad 7";
            case 104:
                return "Num pad 8";
            case 105:
                return "Num pad 9";
        }
        return "";
    };

    function _getGamePadKey(code) {
        switch (code) {
            case -1:
                return "[Add Key]";
            case 0:
                return "A";
            case 1:
                return "B";
            case 2:
                return "X";
            case 3:
                return "Y";
            case 4:
                return "LB";
            case 5:
                return "RB";
            case 6:
                return "LT"
            case 7:
                return "RT";
            case 8:
                return "Back";
            case 9:
                return "Start";
            case 10:
                return "Left stick push";
            case 11:
                return "Right stick push";
            case 12:
                return "Left stick ↑";
            case 13:
                return "Left stick ↓";
            case 14:
                return "Left stick ←";
            case 15:
                return "Left stick →";
            case 16:
                return "";
            case 21:
                return "Right stick ↑";
            case 22:
                return "Right stick ↓";
            case 23:
                return "Right stick ←";
            case 24:
                return "Right stick →";
        }
        return "";
    };
    
})();