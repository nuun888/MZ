/*:-----------------------------------------------------------------------------------
 * NUUN_UserKey.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Key button assignment
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.3.1
 * 
 * @help
 * You can change keyboard keys and gamepad button assignments or set new ones.
 * 
 * The button layout of the gamepad is based on the Xbox360 controller.
 * If the keyboard or gamepad code is set to -1, the original value is set.
 * 
 * If you want to execute a script by key input from a specific scene, enter the script in "Any script".
 * If there is processing in "Any script", it will not be executed from the handler.
 * 
 * Button UI Settings
 * If neither "Button Image" nor "Button image when pressed" is specified, the button image called from the handler will be set to the image in "ButtonSet.png".
 * The X position of the button will be displayed every 48 pixels from the left edge of the image.
 * To specify a decision button, set "Image X Position" to 8 and "Width" to 2.
 * 
 * Independent button UI settings
 * If executing from "Any script", set the button to be displayed directly on the scene.
 * Set the button UI position using the coordinates "Image X coordinate" and "Image Y coordinate".
 * 
 * specification
 * When applying key and button settings on the scene, the key or button will not respond unless a script or common event is specified.
 * Multiple application scenes can be set. If not set, it applies to all scenes.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 8/3/2025 Ver.1.3.1
 * Added a feature to hide buttons.
 * 4/29/2025 Ver.1.3.0
 * Added button settings.
 * 6/16/2024 Ver.1.2.8
 * Some processing has been corrected.
 * 5/11/2024 Ver.1.2.7
 * Added the ability to play SE when a valid key is pressed.
 * 8/4/2023 Ver.1.2.6
 * Added a function to enable keys and buttons (gamepad) under certain conditions.
 * 4/9/2023 Ver.1.2.5
 * Fixed an issue that caused an error when performing normal key operations.
 * 3/25/2023 Ver.1.2.4
 * Changed the use of key button trigger apply on scene.
 * 3/12/2023 Ver.1.2.3
 * Added a function that can specify common events for key button triggers on the scene.
 * 3/11/2023 Ver.1.2.2
 * Added definition by updating “NUUN_realMoveLeftStick”.
 * 3/7/2023 Ver.1.2.1
 * Modified the definition by supporting the left stick axis change amount proportional movement plug-in.
 * 3/7/2023 Ver.1.2.0
 * Added the ability to dash when the left stick is pushed all the way down.
 * 3/6/2023 Ver.1.1.1
 * Fixed an issue where the gamepad code was not recognized in the scene key and button settings.
 * 3/5/2023 Ver.1.1.0
 * Compatible with right stick.
 * 3/4/2023 Ver.1.0.1
 * Added repeat feature.
 * Fixed so that the set keys and buttons work even in battle.
 * 2/28/2023 Ver.1.0.0
 * First edition.
 * 
 * @param UserKey
 * @type struct<UserKeyList>[]
 * @text Key setting
 * @desc Key setting.
 * @default ["{\"UserKey\":\"{\\\"KeyCode\\\":\\\"65\\\",\\\"GamePadCode\\\":\\\"6\\\",\\\"KeyName\\\":\\\"\\\\\\\"pagedown2\\\\\\\"\\\",\\\"Repeated\\\":\\\"true\\\",\\\"KeySprict\\\":\\\"\\\",\\\"MapValid\\\":\\\"true\\\",\\\"BattleValid\\\":\\\"false\\\"}\"}","{\"UserKey\":\"{\\\"KeyCode\\\":\\\"83\\\",\\\"GamePadCode\\\":\\\"7\\\",\\\"KeyName\\\":\\\"\\\\\\\"pageup2\\\\\\\"\\\",\\\"Repeated\\\":\\\"true\\\",\\\"KeySprict\\\":\\\"\\\",\\\"MapValid\\\":\\\"true\\\",\\\"BattleValid\\\":\\\"false\\\"}\"}","{\"UserKey\":\"{\\\"KeyCode\\\":\\\"-1\\\",\\\"GamePadCode\\\":\\\"10\\\",\\\"KeyName\\\":\\\"\\\\\\\"leftstick\\\\\\\"\\\",\\\"Repeated\\\":\\\"false\\\",\\\"KeySprict\\\":\\\"\\\",\\\"MapValid\\\":\\\"true\\\",\\\"BattleValid\\\":\\\"false\\\"}\"}","{\"UserKey\":\"{\\\"KeyCode\\\":\\\"-1\\\",\\\"GamePadCode\\\":\\\"11\\\",\\\"KeyName\\\":\\\"\\\\\\\"rightstick\\\\\\\"\\\",\\\"Repeated\\\":\\\"false\\\",\\\"KeySprict\\\":\\\"\\\",\\\"MapValid\\\":\\\"true\\\",\\\"BattleValid\\\":\\\"false\\\"}\"}"]
 * 
 * @param GamepadSetting
 * @text Gamepad settings
 * @default ------------------------------
 * 
 * @param GamepadLeftStickMaxDash
 * @desc Push the left stick to the maximum axis to dash.
 * @text Left axis maximum dash
 * @type boolean
 * @default true
 * @parent GamepadSetting
 * 
 */
/*~struct~UserKeyList:
 * 
 * @param UserKey
 * @type struct<UserKeyData>
 * @text Key setting
 * @desc Key setting.
 * @default 
 * 
 * @param ButtonImgSetting
 * @text Button UI Settings
 * @default ------------------------------
 * 
 * @param ShowButton
 * @desc Display the button.
 * @text Button display
 * @type boolean
 * @default true
 * @parent ButtonImgSetting
 * 
 * @param ButtonImg
 * @desc Specifies the button image.
 * @text Button Image
 * @type file
 * @dir img/
 * @default 
 * @parent ButtonImgSetting
 * 
 * @param ButtonPressedImg
 * @desc Specifies the image of the button when it is pressed.
 * @text Button image when pressed
 * @type file
 * @dir img/
 * @default 
 * @parent ButtonImgSetting
 * 
 * @param SymbolButtonSetting
 * @text Symbol button UI settings
 * @default ------------------------------
 * @parent ButtonImgSetting
 * 
 * @param ButtonSpriteX
 * @text Image X Position
 * @desc Specifies the display position of "ButtonSet" when no image is specified.
 * @type number
 * @min 0
 * @default 11
 * @parent SymbolButtonSetting
 * 
 * @param ButtonSpriteWidth
 * @text Width
 * @desc If no image is specified, specifies the width of the "ButtonSet".
 * @type number
 * @min 0
 * @default 1
 * @parent SymbolButtonSetting
 * 
 * @param IndependenceButtonSetting
 * @text Independent button UI setting
 * @default ------------------------------
 * @parent ButtonImgSetting
 * 
 * @param IndependenceButtonSpriteX
 * @text Image X coordinate
 * @desc Specifies the X coordinate of the image.
 * @type number
 * @min 0
 * @default 0
 * @parent IndependenceButtonSetting
 * 
 * @param IndependenceButtonSpriteY
 * @text Image Y coordinate
 * @desc Specifies the Y coordinate of the image.
 * @type number
 * @min 0
 * @default 0
 * @parent IndependenceButtonSetting
 * 
 */
/*~struct~UserKeyData:
 * 
 * @param KeyCode
 * @desc Key code.
 * @text Key code
 * @type select
 * @option None
 * @value -1
 * @option BackSpace
 * @value 8
 * @option Tab
 * @value 9
 * @option Enter
 * @value 13
 * @option Shift
 * @value 16
 * @option Ctrl
 * @value 17
 * @option Alt
 * @value 18
 * @option Pause
 * @value 19
 * @option Esc
 * @value 27
 * @option Space
 * @value 32
 * @option PageUp
 * @value 33
 * @option PageDown
 * @value 34
 * @option End
 * @value 35
 * @option Home
 * @value 36
 * @option ←
 * @value 37
 * @option ↑
 * @value 38
 * @option →
 * @value 39
 * @option ↓
 * @value 40
 * @option Insert
 * @value 45
 * @option Delete
 * @value 46
 * @option 0
 * @value 48
 * @option 1
 * @value 49
 * @option 2
 * @value 50
 * @option 3
 * @value 51
 * @option 4
 * @value 52
 * @option 5
 * @value 53
 * @option 6
 * @value 54
 * @option 7
 * @value 55
 * @option 8
 * @value 56
 * @option 9
 * @value 57
 * @option A
 * @value 65
 * @option B
 * @value 66
 * @option C
 * @value 67
 * @option D
 * @value 68
 * @option E
 * @value 69
 * @option F
 * @value 70
 * @option G
 * @value 71
 * @option H
 * @value 72
 * @option I
 * @value 73
 * @option J
 * @value 74
 * @option K
 * @value 75
 * @option L
 * @value 76
 * @option M
 * @value 77
 * @option N
 * @value 78
 * @option O
 * @value 79
 * @option P
 * @value 80
 * @option Q
 * @value 81
 * @option R
 * @value 82
 * @option S
 * @value 83
 * @option T
 * @value 84
 * @option U
 * @value 85
 * @option V
 * @value 86
 * @option W
 * @value 87
 * @option X
 * @value 88
 * @option Y
 * @value 89
 * @option Z
 * @value 90
 * @option Win
 * @value 91
 * @option Apps
 * @value 92
 * @option :*
 * @value 186
 * @option ;+
 * @value 187
 * @option ,<
 * @value 188
 * @option -=
 * @value 189
 * @option .>
 * @value 190
 * @option /?
 * @value 191
 * @option `
 * @value 192
 * @option [{
 * @value 220
 * @option |
 * @value 221
 * @option ]}
 * @value 222
 * @default -1
 * @min -1
 * 
 * @param GamePadCode
 * @desc Gamepad code.
 * @text Gamepad code
 * @type select
 * @option None
 * @value -1
 * @option A(Down button)
 * @value 0
 * @option B(Right button)
 * @value 1
 * @option X(Left button)
 * @value 2
 * @option Y(Up button)
 * @value 3
 * @option LB
 * @value 4
 * @option RB
 * @value 5
 * @option LT
 * @value 6
 * @option RT
 * @value 7
 * @option Back
 * @value 8
 * @option Start
 * @value 9
 * @option Left stick push
 * @value 10
 * @option Right stick push
 * @value 11
 * @option Left stick ↑
 * @value 12
 * @option Left stick ↓
 * @value 13
 * @option Left stick ←
 * @value 14
 * @option Left stick →
 * @value 15
 * @option 
 * @value 16
 * @option Right stick ↑
 * @value 21
 * @option Right stick ↓
 * @value 22
 * @option Right stick ←
 * @value 23
 * @option Right stick →
 * @value 24
 * @default -1
 * @min -1
 * 
 * @param KeyName
 * @desc Any symbolic name. Enclose the string with ' or ".
 * @text Symbol name
 * @type string
 * @default
 * 
 * @param Repeated
 * @desc Repeat enabled.
 * @text Repeat enabled
 * @type boolean
 * @default false
 * 
 * @param SceneKeyAndButtonSetting
 * @text On-scene key and button setting
 * @default ------------------------------
 * 
 * @param KeySprict
 * @desc Any script.(not valid from handler)
 * @text Any script
 * @type combo
 * @option "NuunManager.getNotEncounterEnemies('Enc', 0)"
 * @option "NuunManager.getNotEncounterEnemies('Status', 0)"
 * @default
 * @parent SceneKeyAndButtonSetting
 * 
 * @param KeyCommonEvent
 * @desc Any common event.
 * @text Any common event
 * @type common_event
 * @default 0
 * @parent SceneKeyAndButtonSetting
 * 
 * @param KeyPlaySe
 * @text Play SE
 * @desc The sound effect that plays when pressed.
 * @default 
 * @type struct<PlaySe>
 * @parent SceneKeyAndButtonSetting
 * 
 * @param CondSetting
 * @text Cond setting
 * @default ------------------------------
 * 
 * @param CondValidSwitch
 * @desc Condition to apply key or button if specific switch is true. 0 is always true
 * @text Switch Condition
 * @type switch
 * @default 0
 * @parent CondSetting
 * 
 * @param ValidScene
 * @desc The scene to apply the key, button.
 * @text Applicable scene
 * @type combo[]
 * @option "Scene_Map"
 * @option "Scene_Menu"
 * @option "Scene_Item"
 * @option "Scene_Skill"
 * @option "Scene_Equip"
 * @option "Scene_Status"
 * @option "Scene_Options"
 * @option "Scene_Shop"
 * @option "Scene_Battle"
 * @default
 * @parent CondSetting
 * 
 * @param ValidCond
 * @desc Conditions to apply keys, buttons.
 * @text Applicable condition
 * @type combo
 * @default
 * @parent CondSetting
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
 * @plugindesc キーボタン割り当て
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.3.1
 * 
 * @help
 * キーボードのキー及び、ゲームパッドのボタン割り当てを変更したり新規に設定したり出来ます。
 * ゲームパッドのボタン配置はXbox360コントローラ基準になっております。
 * キーボード、ゲームパッドのコードが-1に設定されている場合は元の値が設定されます。
 * 
 * 特定シーンからキー入力で実行する場合は任意スクリプトにスクリプトを記入して下さい。
 * 任意スクリプトに処理がある場合、ハンドラからは実行されません。
 * 
 * ボタンUI設定
 * ハンドラから呼び出すボタン画像はボタン画像または押し時ボタン画像どちらかが指定されていない場合、ButtonSet.pngの画像が設定されます。
 * ボタンのX位置は画像の左端から48ピクセル毎の表示になります。
 * 決定ボタンを指定する場合は画像X位置を8、横幅を2に設定。
 * 
 * 独立ボタン設定
 * 任意スクリプトから実行する場合、シーン上に直接表示するボタンを設定します。
 * 座標は画像X座標、画像X座標でボタンUIの位置を設定します。
 * 
 * 仕様
 * シーン上でのキー、ボタン設定適用は、スクリプト又はコモンイベントが指定されてなければキーまたはボタンは反応しません。
 * 適用シーンは複数設定可能です。設定されていない場合は全てのシーンで適用されます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2025/8/3 Ver.1.3.1
 * ボタンを表示させない機能を追加。
 * 2025/4/29 Ver.1.3.0
 * ボタンの設定を追加。
 * 2024/6/16 Ver.1.2.8
 * 一部の処理を修正。
 * 2024/5/11 Ver.1.2.7
 * 有効なキーを押されたときにSEを再生する機能を追加。
 * 2023/8/4 Ver.1.2.6
 * 特定の条件でキー、ボタン(ゲームパッド)を有効にする機能を追加。
 * 2023/4/9 Ver.1.2.5
 * 通常のキー操作を行ったときにエラーが起きる問題を修正。
 * 2023/3/25 Ver.1.2.4
 * シーン上でのキーボタントリガー適用の使用を変更。
 * 2023/3/12 Ver.1.2.3
 * シーン上でのキーボタントリガーにコモンイベントを指定できる機能を追加。
 * 2023/3/11 Ver.1.2.2
 * 左スティック軸変化量比例移動更新による定義追加。
 * 2023/3/7 Ver.1.2.1
 * 左スティック軸変化量比例移動プラグイン対応による定義修正。
 * 2023/3/7 Ver.1.2.0
 * 左スティックを最大に倒すとダッシュする機能を追加。
 * 2023/3/6 Ver.1.1.1
 * シーン上キー、ボタン設定でゲームパッドコードが認識しない問題を修正。
 * 2023/3/5 Ver.1.1.0
 * 右スティックに対応。
 * 2023/3/4 Ver.1.0.1
 * リピート機能を追加。
 * 戦闘中でも設定したキー、ボタンが動作するように修正。
 * 2023/2/28 Ver.1.0.0
 * 初版
 * 
 * @param UserKey
 * @type struct<UserKeyList>[]
 * @text キーの設定
 * @desc キーの設定。
 * @default ["{\"UserKey\":\"{\\\"KeyCode\\\":\\\"65\\\",\\\"GamePadCode\\\":\\\"6\\\",\\\"KeyName\\\":\\\"\\\\\\\"pagedown2\\\\\\\"\\\",\\\"Repeated\\\":\\\"true\\\",\\\"KeySprict\\\":\\\"\\\",\\\"MapValid\\\":\\\"true\\\",\\\"BattleValid\\\":\\\"false\\\"}\"}","{\"UserKey\":\"{\\\"KeyCode\\\":\\\"83\\\",\\\"GamePadCode\\\":\\\"7\\\",\\\"KeyName\\\":\\\"\\\\\\\"pageup2\\\\\\\"\\\",\\\"Repeated\\\":\\\"true\\\",\\\"KeySprict\\\":\\\"\\\",\\\"MapValid\\\":\\\"true\\\",\\\"BattleValid\\\":\\\"false\\\"}\"}","{\"UserKey\":\"{\\\"KeyCode\\\":\\\"-1\\\",\\\"GamePadCode\\\":\\\"10\\\",\\\"KeyName\\\":\\\"\\\\\\\"leftstick\\\\\\\"\\\",\\\"Repeated\\\":\\\"false\\\",\\\"KeySprict\\\":\\\"\\\",\\\"MapValid\\\":\\\"true\\\",\\\"BattleValid\\\":\\\"false\\\"}\"}","{\"UserKey\":\"{\\\"KeyCode\\\":\\\"-1\\\",\\\"GamePadCode\\\":\\\"11\\\",\\\"KeyName\\\":\\\"\\\\\\\"rightstick\\\\\\\"\\\",\\\"Repeated\\\":\\\"false\\\",\\\"KeySprict\\\":\\\"\\\",\\\"MapValid\\\":\\\"true\\\",\\\"BattleValid\\\":\\\"false\\\"}\"}"]
 * 
 * @param GamepadSetting
 * @text ゲームパッド設定
 * @default ------------------------------
 * 
 * @param GamepadLeftStickMaxDash
 * @desc 左スティックの軸の最大に倒すとダッシュします。
 * @text 左軸最大ダッシュ
 * @type boolean
 * @default true
 * @parent GamepadSetting
 * 
 */
/*~struct~UserKeyList:ja
 * 
 * @param UserKey
 * @type struct<UserKeyData>
 * @text キー設定
 * @desc キー設定。
 * @default 
 * 
 * @param ButtonImgSetting
 * @text ボタンUI設定
 * @default ------------------------------
 * 
 * @param ShowButton
 * @desc ボタンを表示します。
 * @text ボタン表示
 * @type boolean
 * @default true
 * @parent ButtonImgSetting
 * 
 * @param ButtonImg
 * @desc ボタン画像を指定します。
 * @text ボタン画像
 * @type file
 * @dir img/
 * @default 
 * @parent ButtonImgSetting
 * 
 * @param ButtonPressedImg
 * @desc 押されたときのボタン画像を指定します。
 * @text 押し時ボタン画像
 * @type file
 * @dir img/
 * @default 
 * @parent ButtonImgSetting
 * 
 * @param SymbolButtonSetting
 * @text シンボルボタンUI設定
 * @default ------------------------------
 * @parent ButtonImgSetting
 * 
 * @param ButtonSpriteX
 * @text 画像X位置
 * @desc 画像が指定されていない場合のButtonSetの表示位置を指定。
 * @type number
 * @min 0
 * @default 11
 * @parent SymbolButtonSetting
 * 
 * @param ButtonSpriteWidth
 * @text 横幅
 * @desc 画像が指定されていない場合はButtonSetの横幅を指定。
 * @type number
 * @min 0
 * @default 1
 * @parent SymbolButtonSetting
 * 
 * @param IndependenceButtonSetting
 * @text 独立ボタンUI設定
 * @default ------------------------------
 * @parent ButtonImgSetting
 * 
 * @param IndependenceButtonSpriteX
 * @text 画像X座標
 * @desc 画像のX座標を指定します。
 * @type number
 * @min 0
 * @default 0
 * @parent IndependenceButtonSetting
 * 
 * @param IndependenceButtonSpriteY
 * @text 画像Y座標
 * @desc 画像のY座標を指定します。
 * @type number
 * @min 0
 * @default 0
 * @parent IndependenceButtonSetting
 * 
 */
/*~struct~UserKeyData:ja
 * 
 * @param KeyCode
 * @desc キーコード
 * @text キーコード
 * @type select
 * @option None
 * @value -1
 * @option BackSpace
 * @value 8
 * @option Tab
 * @value 9
 * @option Enter
 * @value 13
 * @option Shift
 * @value 16
 * @option Ctrl
 * @value 17
 * @option Alt
 * @value 18
 * @option Pause
 * @value 19
 * @option Esc
 * @value 27
 * @option Space
 * @value 32
 * @option PageUp
 * @value 33
 * @option PageDown
 * @value 34
 * @option End
 * @value 35
 * @option Home
 * @value 36
 * @option ←
 * @value 37
 * @option ↑
 * @value 38
 * @option →
 * @value 39
 * @option ↓
 * @value 40
 * @option Insert
 * @value 45
 * @option Delete
 * @value 46
 * @option 0
 * @value 48
 * @option 1
 * @value 49
 * @option 2
 * @value 50
 * @option 3
 * @value 51
 * @option 4
 * @value 52
 * @option 5
 * @value 53
 * @option 6
 * @value 54
 * @option 7
 * @value 55
 * @option 8
 * @value 56
 * @option 9
 * @value 57
 * @option A
 * @value 65
 * @option B
 * @value 66
 * @option C
 * @value 67
 * @option D
 * @value 68
 * @option E
 * @value 69
 * @option F
 * @value 70
 * @option G
 * @value 71
 * @option H
 * @value 72
 * @option I
 * @value 73
 * @option J
 * @value 74
 * @option K
 * @value 75
 * @option L
 * @value 76
 * @option M
 * @value 77
 * @option N
 * @value 78
 * @option O
 * @value 79
 * @option P
 * @value 80
 * @option Q
 * @value 81
 * @option R
 * @value 82
 * @option S
 * @value 83
 * @option T
 * @value 84
 * @option U
 * @value 85
 * @option V
 * @value 86
 * @option W
 * @value 87
 * @option X
 * @value 88
 * @option Y
 * @value 89
 * @option Z
 * @value 90
 * @option Win
 * @value 91
 * @option Apps
 * @value 92
 * @option :*
 * @value 186
 * @option ;+
 * @value 187
 * @option ,<
 * @value 188
 * @option -=
 * @value 189
 * @option .>
 * @value 190
 * @option /?
 * @value 191
 * @option `
 * @value 192
 * @option [{
 * @value 220
 * @option |
 * @value 221
 * @option ]}
 * @value 222
 * @default -1
 * @min -1
 * 
 * @param GamePadCode
 * @desc ゲームパッドコード
 * @text ゲームパッドコード
 * @type select
 * @option None
 * @value -1
 * @option A(下ボタン)
 * @value 0
 * @option B(右ボタン)
 * @value 1
 * @option X(左ボタン)
 * @value 2
 * @option Y(上ボタン)
 * @value 3
 * @option LB
 * @value 4
 * @option RB
 * @value 5
 * @option LT
 * @value 6
 * @option RT
 * @value 7
 * @option Back
 * @value 8
 * @option Start
 * @value 9
 * @option Left stick push
 * @value 10
 * @option Right stick push
 * @value 11
 * @option Left stick ↑
 * @value 12
 * @option Left stick ↓
 * @value 13
 * @option Left stick ←
 * @value 14
 * @option Left stick →
 * @value 15
 * @option 
 * @value 16
 * @option Right stick ↑
 * @value 21
 * @option Right stick ↓
 * @value 22
 * @option Right stick ←
 * @value 23
 * @option Right stick →
 * @value 24
 * @default -1
 * @min -1
 * 
 * @param KeyName
 * @desc 任意のシンボル名。文字列を'または"で囲ってください。
 * @text シンボル名
 * @type string
 * @default
 * 
 * @param Repeated
 * @desc リピート有効
 * @text リピート有効
 * @type boolean
 * @default false
 * 
 * @param SceneKeyAndButtonSetting
 * @text シーン上キー、ボタン設定
 * @default ------------------------------
 * 
 * @param KeySprict
 * @desc 任意のスクリプト(ハンドラからは無効)
 * @text 任意スクリプト
 * @type combo
 * @option "NuunManager.getNotEncounterEnemies('Enc', 0)"
 * @option "NuunManager.getNotEncounterEnemies('Status', 0)"
 * @default
 * @parent SceneKeyAndButtonSetting
 * 
 * @param KeyCommonEvent
 * @desc 任意のコモンイベント
 * @text 任意コモンイベント
 * @type common_event
 * @default 0
 * @parent SceneKeyAndButtonSetting
 * 
 * @param KeyPlaySe
 * @text 再生SE
 * @desc 押されたときに再生するSE。
 * @default 
 * @type struct<PlaySe>
 * @parent SceneKeyAndButtonSetting
 * 
 * @param CondSetting
 * @text 条件設定
 * @default ------------------------------
 * 
 * @param CondValidSwitch
 * @desc 特定のスイッチがtrueならキー、ボタンを適用する条件。0で常にtrue
 * @text スイッチ条件
 * @type switch
 * @default 0
 * @parent CondSetting
 * 
 * @param ValidScene
 * @desc キー、ボタンを適用するシーン。
 * @text 適用シーン
 * @type combo[]
 * @option "Scene_Map"
 * @option "Scene_Menu"
 * @option "Scene_Item"
 * @option "Scene_Skill"
 * @option "Scene_Equip"
 * @option "Scene_Status"
 * @option "Scene_Options"
 * @option "Scene_Shop"
 * @option "Scene_Battle"
 * @default
 * @parent CondSetting
 * 
 * @param ValidCond
 * @desc キー、ボタンを適用する条件。
 * @text 適用条件
 * @type combo
 * @default
 * @parent CondSetting
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
Imported.NUUN_UserKey = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_UserKey');
    const UserKey = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['UserKey'])) : null) || [];
    const GamepadLeftStickMaxDash = eval(parameters['GamepadLeftStickMaxDash'] || "true");

    const keyMapper = Input.keyMapper;
    const gamepadMapper = Input.gamepadMapper;

    function playUserOkSound(playSe) {
        if (!!playSe) {
            AudioManager.playStaticSe(playSe);
        }
    };

    for (const data of UserKey) {
        if (data.UserKey) {
            if (data.UserKey.KeyCode >= 0) {
                keyMapper[String(data.UserKey.KeyCode)] = data.UserKey.KeyName;
            }
            if (data.UserKey.GamePadCode >= 0) {
                gamepadMapper[String(data.UserKey.GamePadCode)] = data.UserKey.KeyName;
            }
        }
    }

    const _Window_Selectable_processHandling = Window_Selectable.prototype.processHandling;
    Window_Selectable.prototype.processHandling = function() {
        const result = _Window_Selectable_processHandling.call(this);
        if (result) {
            return result;
        }
        if (this.isOpenAndActive()) {
            for (const data of UserKey) {
                if (data.UserKey && data.UserKey.KeyCode >= 0 || data.UserKey.GamePadCode >= 0) {
                    const keyName = data.UserKey.KeyName;
                    if (!this.isDefaultProcessHandling(keyName) && this.isHandled(keyName) && isRepeated(data.UserKey.Repeated, keyName)) {
                        return this.processUserKey(keyName);
                    }
                }
            }
        }
    };

    Window_Selectable.prototype.isDefaultProcessHandling = function(keyName) {
        switch (keyName) {
            case "ok":
            case "cancel":
            case "pagedown":
            case "pageup":
                return true;
        }
        return false;
    };

    Window_Selectable.prototype.processUserKey = function(name, _eval) {
        this.updateInputData();
        this.deactivate();
        if (!!_eval) {
            eval(_eval);
        } else {
            this.callHandler(name);
        }
    };

    const _Scene_MenuBase_update = Scene_MenuBase.prototype.update;
    Scene_MenuBase.prototype.update = function() {
        _Scene_MenuBase_update.call(this);
        if (!SceneManager.isSceneChanging()) {
            this.updateUserKey();
        }
    };

    const _Scene_Map_updateScene = Scene_Map.prototype.updateScene;
    Scene_Map.prototype.updateScene = function() {
        _Scene_Map_updateScene.call(this);
        if (!SceneManager.isSceneChanging()) {
            this.updateUserKey();
        }
    };

    const _Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        _Scene_Battle_update.call(this);
        if (this.isActive() && !this.isBusy()) {
            this.updateUserKey();
        }
    };

    Scene_Base.prototype.isKeyValidCond = function(data, _class) {
        const _scene = this.isValidScene(data, _class);
        if (!_scene) {
            return false;
        }
        return this.isValidCond(data);
    };

    Scene_Base.prototype.isValidScene = function(data, _class) {
        if (!!data.ValidScene && data.ValidScene.length > 0) {
            return data.ValidScene.some(scene => scene === _class);
        }
        return true;
    };

    Scene_Base.prototype.isValidCond = function(data) {
        if (data.CondValidSwitch > 0 && !$gameSwitches.value(data.CondValidSwitch)) {
            return false;
        }
        if (!!data.ValidCond) {
            return eval(data.ValidCond);
        }
        return true;
    };
    
    Scene_Base.prototype.updateUserKey = function() {
        const _className = String(this.constructor.name);
        for (const data of UserKey) {
            this.updateUserButtons(data);
            if (data.UserKey && this.isKeyValidCond(data.UserKey, _className) && (!!data.UserKey.KeySprict || data.UserKey.KeyCommonEvent > 0) && (data.UserKey.KeyCode >= 0 || data.UserKey.GamePadCode >= 0)) {
                const keyName = data.UserKey.KeyName;
                if (isRepeated(data.UserKey.Repeated, keyName)) {
                    this._userKeyCalling = true;
                }
                if (this._userKeyCalling && !$gamePlayer.isMoving()) {
                    if (data.UserKey.KeyCommonEvent > 0) {
                        $gameTemp.reserveCommonEvent(data.UserKey.KeyCommonEvent);
                    } else if (!!data.UserKey.KeySprict) {
                        playUserOkSound(data.UserKey.KeyPlaySe)
                        this.callUserKey(data.UserKey.KeySprict);
                    }
                    this._userKeyCalling = false;
                }
            }
        }
    };

    Scene_Base.prototype.callUserKey = function(keySprict) {
        eval(keySprict);
    };


    const _Scene_Map_createButtons = Scene_Map.prototype.createButtons;
    Scene_Map.prototype.createButtons = function() {
        _Scene_Map_createButtons.apply(this, arguments);
        if (ConfigManager.touchUI) {
            this.createUserButtons();
        }
    };

    const _Scene_MenuBase_createButtons = Scene_MenuBase.prototype.createButtons;
    Scene_MenuBase.prototype.createButtons = function() {
        _Scene_MenuBase_createButtons.apply(this, arguments);
        if (ConfigManager.touchUI) {
            this.createUserButtons();
        }
    };

    const _Scene_Battle_createButtons = Scene_Battle.prototype.createButtons;
    Scene_Battle.prototype.createButtons = function() {
        _Scene_Battle_createButtons.apply(this, arguments);
        if (ConfigManager.touchUI) {
            this.createUserButtons();
        }
    };

    Scene_Base.prototype.createUserButtons = function() {
        const _className = String(this.constructor.name);
        for (const data of UserKey) {
            if (data.ShowButton && data.UserKey && this.isValidScene(data.UserKey, _className) && (!!data.UserKey.KeySprict || data.UserKey.KeyCommonEvent > 0) && (data.UserKey.KeyCode >= 0 || data.UserKey.GamePadCode >= 0)) {
                this.createUserButton(data);
            }
        }
    };
    
    Scene_Base.prototype.createUserButton = function(data) {
        this._userButton = {};
        this._userButton[data.UserKey.KeyName] = new Sprite_UserButton(data.UserKey.KeyName);
        const method = this._userButton[data.UserKey.KeyName];
        method.x = data.IndependenceButtonSpriteX;
        method.y = data.IndependenceButtonSpriteY;
        method.visible = this.areUserButtonsEnabled(data);
        this.addChild(method);
    };

    Scene_Base.prototype.updateUserButtons = function(data) {
        if (this._userButton && this._userButton[data.UserKey.KeyName]) {
            this._userButton[data.UserKey.KeyName].visible = this.areUserButtonsEnabled(data);
        }
    };

    Scene_Base.prototype.areUserButtonsEnabled = function(data) {
        return this.isValidCond(data.UserKey);
    };

    const _Input_clear = Input.clear;
    Input.clear = function() {
        _Input_clear.call(this);
        this._stickDashing = false;
        this._stickMoveing = 0.0;
        this._stickMoveHistory = [];
    };

    const _Input_updateGamepadState = Input._updateGamepadState;
    Input._updateGamepadState = function(gamepad) {
        const lastState = this._gamepadStates[gamepad.index] || [];
        _Input_updateGamepadState.call(this, gamepad);
        this._gamepadAddButton(gamepad, lastState);
    };

    Input._gamepadAddButton = function(gamepad, lastState) {
        const newState = this._gamepadStates[gamepad.index];
        const buttons = gamepad.buttons;
        const axes = gamepad.axes;
        const threshold = 0.5;
        newState[21] = false;
        newState[22] = false;
        newState[23] = false;
        newState[24] = false;
        if (axes[3] < -threshold) {
            newState[21] = true;
        } else if (axes[3] > threshold) {
            newState[22] = true;
        }
        if (axes[2] < -threshold) {
            newState[23] = true;
        } else if (axes[2] > threshold) {
            newState[24] = true;
        }
        const move = Math.max(Math.abs(axes[0]), Math.abs(axes[1])) - 0.5;
        if (move > 0) {
            this._stickMoveHistory.push(Math.abs(this._stickMoveing));
            if (this._stickMoveHistory.length > 2) {
                this._stickMoveHistory.shift();
            }
            this._stickMoveing = move;
            this._onStickMoveing = true;
        } else if ($gamePlayer && !$gamePlayer.isMoving()) {
            this._stickMoveHistory = [0];
            this._stickMoveing = move;
        } else {
            this._onStickMoveing = false;
        }
        if (GamepadLeftStickMaxDash) {
            this.gamepadLeftStickMaxDash();
        }
        for (let j = 21; j < newState.length; j++) {
            if (newState[j] !== lastState[j]) {
                const buttonName = this.gamepadMapper[j];
                if (buttonName) {
                    this._currentState[buttonName] = newState[j];
                }
            }
        }
        this._gamepadStates[gamepad.index] = newState;
    };

    Input.gamepadLeftStickMaxDash = function() {
        this._stickDashing = this._stickMoveing >= 0.5;
    };

    Input.isStickDashing = function() {
        return this._stickDashing;
    };

    function isRepeated(repeat, name) {
        return repeat ? Input.isRepeated(name) : Input.isTriggered(name);
    };

    const _Game_Player_isDashButtonPressed = Game_Player.prototype.isDashButtonPressed;
    Game_Player.prototype.isDashButtonPressed = function() {
        if (Input.isStickDashing()) {
            return true;
        }
        return _Game_Player_isDashButtonPressed.call(this);
    };


    const _Sprite_Button_initialize = Sprite_Button.prototype.initialize;
    Sprite_Button.prototype.initialize = function(buttonType) {
        this._buttonData = _getAddSymbol(buttonType);
        _Sprite_Button_initialize.apply(this, arguments);
    };

    const _Sprite_Button_loadButtonImage = Sprite_Button.prototype.loadButtonImage;
    Sprite_Button.prototype.loadButtonImage = function() {
        if (this.isButtonBitmap()) {
            this._buttonBitmap = ImageManager.nuun_LoadPictures(this._buttonData.ButtonImg);
            this._buttonPressedBitmap = ImageManager.nuun_LoadPictures(this._buttonData.ButtonPressedImg);
        } else {
            _Sprite_Button_loadButtonImage.apply(this, arguments);
        } 
    };

    const _Sprite_Button_checkBitmap = Sprite_Button.prototype.checkBitmap;
    Sprite_Button.prototype.checkBitmap = function() {
        if (this.isButtonBitmap()) return;
        _Sprite_Button_checkBitmap.apply(this, arguments);
    };

    const _Sprite_Button_buttonData = Sprite_Button.prototype.buttonData;
    Sprite_Button.prototype.buttonData = function() {
        if (this.isButtonBitmap()) {
            return { x: 0, w: this._buttonData.ButtonSpriteWidth};
        } else if (this.notButtonBitmap()) {
            return { x: this._buttonData.ButtonSpriteX, w: this._buttonData.ButtonSpriteWidth};
        } else {
            return _Sprite_Button_buttonData.apply(this, arguments);
        }
    };

    const _Sprite_Button_updateFrame = Sprite_Button.prototype.updateFrame;
    Sprite_Button.prototype.updateFrame = function() {
        if (this.isButtonBitmap()) {
            this.bitmap = this.isPressed() ? this._buttonPressedBitmap : this._buttonBitmap;
        } else {
            _Sprite_Button_updateFrame.apply(this, arguments);
        }
    };

    Sprite_Button.prototype.isButtonBitmap = function() {
        return !!this._buttonData && this._buttonData.ButtonImg && this._buttonData.ButtonPressedImg;
    };

    Sprite_Button.prototype.notButtonBitmap = function() {
        return !!this._buttonData && !(this._buttonData.ButtonImg && this._buttonData.ButtonPressedImg);
    };


    function Sprite_UserButton() {
        this.initialize(...arguments);
    }
    
    Sprite_UserButton.prototype = Object.create(Sprite_Button.prototype);
    Sprite_UserButton.prototype.constructor = Sprite_UserButton;
    
    Sprite_UserButton.prototype.initialize = function(buttonType) {
        Sprite_Button.prototype.initialize.apply(this, arguments);
    };

    Sprite_UserButton.prototype.buttonData = function() {
        return { x: 0, w: this._buttonData.ButtonSpriteWidth};
    };

    function _getAddSymbol(buttonType) {
        return UserKey.find(data => data.UserKey && data.UserKey.KeyName === buttonType);
    };

})();