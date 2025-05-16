/*:-----------------------------------------------------------------------------------
 * NUUN_FastTravel.js
 * 
 * Copyright (C) 2024 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Fast Travel
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.1.1
 * 
 * @help
 * Implement Fast Travel.
 * 
 * Configuring a map for fast travel
 * Enter <FastTravelMap:[id]> in Note's in the map settings.
 * 
 * Fast travel settings
 * Enter the event ID set on the map in the Event ID field. (ID or event name)
 * If Activate event after selection is ON, the event specified in the event ID will be executed.
 * If it is OFF, specify the destination map ID and coordinates.
 * 
 * Move to fast travel map
 * Move to location using event command, or move to fast travel map using plugin parameters.
 * Cancellation is only valid when executed from plugin parameters.
 * 
 * 
 * Map Notes
 * <FastTravelMap:[id]> Maps with this tag will be fast travel maps.
 * [id]:Fast Travel Settings List Number
 * 
 * script
 * $gameMap.openFastTravel([id], [x], [y]);
 * [id]:Move destination map ID
 * [x]:Move destination X coordinate
 * [y]:Move destination Y coordinate
 * 
 *  
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * 
 * Log
 * 5/17/2025 Ver.1.1.1
 * If "NUUN_MenuParamListBase" is not installed, an error will occur, so it is a separate plugin.
 * 4/13/2025 Ver.1.1.0
 * Implemented subwindows.(Separate plugin)
 * 3/1/2025 Ver.1.0.4
 * Supports annotation location. (Versions before 1.8 used the old method.)
 * 9/22/2024 Ver.1.0.3
 * Fixed scrolling behavior of initial cursor position.
 * 9/21/2024 Ver.1.0.2
 * Fixed an issue where the help window and fast travel window would not become transparent.
 * Fixed the initial cursor index to be the index of the closest event from the destination coordinates.
 * Added a function to set the initial cursor index to a specified index.
 * 8/18/2024 Ver.1.0.1
 * Added the ability to specify the direction of the destination.
 * Fixed to prevent scrolling to places that cannot be selected.
 * Added back button (only when executed from plugin command).
 * 8/17/2024 Ver.1.0.0
 * First edition.
 * 
 * 
 * @command FastTravelOpen
 * @desc Opens fast travel.
 * @text Open fast travel
 * 
 * @arg MapId
 * @text Map Id
 * @type number
 * @default 0
 * @desc Specify the map ID.
 * 
 * @arg MapX
 * @text Move destination X coordinate
 * @type number
 * @default 0
 * @desc Specifies the X coordinate of the destination.
 * 
 * @arg MapY
 * @text Move destination Y coordinate
 * @type number
 * @default 0
 * @desc Specifies the Y coordinate of the destination.
 * 
 * @command FastTravelSelectIndex
 * @desc Specifies the initial cursor index for the fast label. It is initialized after the move.
 * @text Fast Label Initial Cursor Index
 * 
 * @arg FastTravelListId
 * @text Cursor Index
 * @type number
 * @default -1
 * @min -1
 * @desc Enter the cursor index.
 * 
 * 
 * @param FastTravelSetting
 * @desc Set up fast travel.
 * @text Fast Travel Settings
 * @type struct<fastTravelSetting>[]
 * @default 
 * 
 * @param TransferEventTrigger
 * @text Event triggered after selection
 * @desc After selecting the destination map, the target event will be triggered.
 * @type boolean
 * @default true
 * 
 * @param NoDisplayUnregisteredLocation
 * @text Hide unregistered locations
 * @desc Do not display locations that do not match the criteria.
 * @type boolean
 * @default false
 * 
 * @param MapUnknownData
 * @desc This is an unregistered character string.
 * @text String to be used when condition is not met
 * @type string
 * @default ？
 * 
 * @param ScrollSpeed
 * @desc Set the scroll speed.
 * @text Scroll Speed
 * @type number
 * @default 20
 * 
 * @param CharacterSetting
 * @text Character Chip Settings
 * @default ------------------------------
 * 
 * @param FastTravelCharacterName
 * @text Character chip image
 * @desc Image of the character chip during Fast Label.
 * @type file
 * @dir img/characters/
 * @default 
 * 
 * @param FastTravelCharacterIndex
 * @text Character Chip Index ID
 * @desc The index ID of the character chip in Fast Label.
 * @type number
 * @default 0
 * 
 * @param HelpWindowSetting
 * @text Help Window Settings
 * @default ------------------------------
 * 
 * @param HelpWindowX
 * @text Help window X coordinate
 * @desc X coordinate of the help window
 * @type number
 * @default 0
 * @min -9999
 * @parent HelpWindowSetting
 * 
 * @param HelpWindowY
 * @desc Y coordinate of the help window
 * @text Help window Y coordinate
 * @type number
 * @default 0
 * @min -9999
 * @parent HelpWindowSetting
 * 
 * @param HelpWindowWidth
 * @desc The width of the help window.
 * @text Help window width
 * @type number
 * @default 0
 * @min 0
 * @parent HelpWindowSetting
 * 
 * @param HelpWindowVisible
 * @text Help window opacity
 * @desc Makes the help window opaque.
 * @type boolean
 * @default true
 * @parent HelpWindowSetting
 * 
 * @param FastTravelWindowSetting
 * @text Fast Travel Window Settings
 * @default ------------------------------
 * 
 * @param FastTravelWindowX
 * @text Fast travel window X coordinate
 * @desc Fast travel window X coordinate
 * @type number
 * @default 0
 * @min -9999
 * @parent FastTravelWindowSetting
 * 
 * @param FastTravelWindowY
 * @desc Fast travel window Y coordinate
 * @text Fast travel window Y coordinate
 * @type number
 * @default 68
 * @min -9999
 * @parent FastTravelWindowSetting
 * 
 * @param FastTravelWindowWidth
 * @desc The width of the fast travel window.
 * @text Fast Travel Window Width
 * @type number
 * @default 240
 * @min 0
 * @parent FastTravelWindowSetting
 * 
 * @param FastTravelWindowRows
 * @desc Number of rows in the fast travel window.
 * @text Fast Travel Window Rows
 * @type number
 * @default 10
 * @min 1
 * @parent FastTravelWindowSetting
 * 
 * @param FastTravelWindowVisible
 * @text Fast travel window opacity
 * @desc Makes the fast travel window opaque.
 * @type boolean
 * @default true
 * @parent FastTravelWindowSetting
 * 
 * @param ButtonSetting
 * @text Button setting
 * @default ------------------------------
 * 
 * @param ButtonAbsoluteCoordinates
 * @text Button absolute coordinates
 * @desc Makes the button coordinates absolute coordinates.
 * @type boolean
 * @default false
 * @parent ButtonSetting
 * 
 * @param ButtonX
 * @text Cancel button X coordinate
 * @desc X coordinate of the cancel button
 * @type number
 * @default 0
 * @min -9999
 * @parent ButtonSetting
 * 
 * @param ButtonY
 * @desc Y coordinate of the cancel button
 * @text Cancel button Y coordinate
 * @type number
 * @default 0
 * @min -9999
 * @parent ButtonSetting
 * 
 */
/*~struct~fastTravelSetting:
 * 
 * @param Name
 * @desc Distinguished name.
 * @text Distinguished name
 * @type string
 * @default 
 * 
 * @param FastTravelList
 * @desc Set the destination.
 * @text Destination Settings
 * @type struct<fastTravelList>[]
 * @default 
 * 
 */
/*~struct~fastTravelList:
 * 
 * @param FastTravelName
 * @desc Set the display name of the destination map.
 * @text Map Display Name
 * @type string
 * @default 
 * 
 * @param IconIndex
 * @desc Icon index.
 * @text Icon index
 * @type icon
 * @default 0
 * 
 * @param EventId
 * @desc The event ID or event name.
 * @text Event ID
 * @type string
 * @default 
 * 
 * @param FastTravelText
 * @desc The text to display when selected. (Control characters can be used.)
 * @text Selected Text
 * @type string
 * @default 
 * 
 * @param Destination
 * @desc Move destination settings.
 * @text Move destination settings
 * @type struct<DestinationSetting>
 * @default 
 * 
 * @param EnableSwitchId
 * @desc Switch ID to be enabled. If set to 0, it is always displayed.
 * @text Switch ID
 * @type switch
 * @default 0
 * 
 * @param CommonEvent
 * @desc Common event executed when moving.
 * @text Common Event
 * @type common_event
 * @default 0
 * 
 * @param FastTravelSubWindowSetting
 * @text Fast travel subwindow settings (requires NUUN_FastTravel_SubWindow)
 * @default ------------------------------
 * 
 * @param SubText
 * @desc Set the text to be displayed in the subtext in "Fast Travel Sub-Item Settings". (control characters possible)
 * @text Subtext Settings
 * @type multiline_string
 * @default
 * @parent FastTravelSubWindowSetting
 * 
 * @param SubImgSetting
 * @desc Set the image to be displayed in the sub window.
 * @text Subwindow image settings
 * @type struct<SubImg>[]
 * @default []
 * @parent FastTravelSubWindowSetting
 * 
 */
/*~struct~SubImg:
 * 
 * @param SubImage
 * @desc Specifies the image to be displayed in the subwindow.
 * @text Subwindow Image
 * @type file
 * @dir img/
 * @default
 * 
 * @param SubImageX
 * @desc Specifies the X coordinate of the image.
 * @text Image X coordinate
 * @type number
 * @default 0
 * 
 * @param SubImageY
 * @desc Specifies the Y coordinate of the image.
 * @text Image Y coordinate
 * @type number
 * @default 0
 * 
 * @param SubImageHeight
 * @desc Image display height. 0 for no shrinking
 * @text Image display height
 * @type number
 * @default 0
 * 
 */
/*~struct~DestinationSetting:
 * 
 * @param DestinationMapLocation
 * @desc Specify destination map (Editor 1.9.0 later)
 * @text Move destination map
 * @type location
 * @default 
 * 
 * @param DestinationMapId
 * @desc Specify the destination map ID.
 * @text Move destination map ID
 * @type number
 * @default 0
 * 
 * @param DestinationMapX
 * @desc Specify the X coordinate of the destination map.
 * @text Destination map X coordinate
 * @type number
 * @default 0
 * 
 * @param DestinationMapY
 * @desc Specify the Y coordinate of the destination map.
 * @text Destination map Y coordinate
 * @type number
 * @default 0
 * 
 * @param Direction
 * @desc Character direction.
 * @text direction
 * @type select
 * @option As it is
 * @value 0
 * @option Down
 * @value 2
 * @option Left
 * @value 4
 * @option Right
 * @value 6
 * @option Up
 * @value 8
 * @default 0
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc ファストトラベル
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.1.1
 * 
 * @help
 * ファストトラベルを実装します。
 * 
 * ファストトラベル用のマップの設定
 * マップの設定のメモ欄に<FastTravelMap:[id]>を記入します。
 * 
 * ファストトラベルの設定
 * イベントIDにマップで設定したイベントIDを記入します。(IDまたはイベント名)
 * 選択後イベント起動をONにしている場合は、イベントIDで指定したイベントが実行されます。
 * OFFにしている場合は移動先マップID、座標を指定します。
 * 
 * ファストトラベル用マップへの移動
 * イベントコマンドの場所移動、またはプラグインパラメータでファストトラベル用マップに移動します。
 * キャンセルはプラグインパラメータから実行のみ有効になります。
 * 
 * 
 * マップのメモ欄
 * <FastTravelMap:[id]> このタグが付けられたマップはファストトラベルマップとなります。
 * [id]:ファストトラベル設定のリスト番号
 * 
 * スクリプト
 * $gameMap.openFastTravel([id], [x], [y]);
 * [id]:移動先マップID
 * [x]:移動先X座標
 * [y]:移動先Y座標
 * 
 *  
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 無償、有償ゲーム問わずご利用いただけます。
 * 
 * 
 * 更新履歴
 * 2025/5/17 Ver.1.1.1
 * NUUN_MenuParamListBaseを導入しないとエラーが出るため別プラグイン化
 * 2025/4/13 Ver.1.1.0
 * サブウィンドウを実装。(別プラグイン化)
 * 2025/3/1 Ver.1.0.4
 * アノテーションlocationに対応。(1.8以前のバージョンは従来の方式)
 * 2024/9/22 Ver.1.0.3
 * カーソルの初期位置のスクロールの挙動を修正。
 * 2024/9/21 Ver.1.0.2
 * ヘルプウィンドウ、ファストトラベルウィンドウのウィンドウが透明化しない問題を修正。
 * カーソルの初期インデックスを移動先の座標から一番近いイベントのインデックスになるように修正。
 * カーソルの初期インデックスを指定のインデックスにする機能を追加。
 * 2024/8/18 Ver.1.0.1
 * 移動先の向きを指定できる機能を追加。
 * 選択できない場所にスクロールしないように修正。
 * 戻るボタンを追加。(プラグインコマンドから実行時のみ)
 * 2024/8/17 Ver.1.0.0
 * 初版
 * 
 * 
 * @command FastTravelOpen
 * @desc ファストトラベルを開きます。
 * @text ファストトラベル開く
 * 
 * @arg MapId
 * @text マップID
 * @type number
 * @default 0
 * @desc マップIDを指定します。
 * 
 * @arg MapX
 * @text 移動先X座標
 * @type number
 * @default 0
 * @desc 移動先のX座標を指定します。
 * 
 * @arg MapY
 * @text 移動先Y座標
 * @type number
 * @default 0
 * @desc 移動先のY座標を指定します。
 * 
 * 
 * @command FastTravelSelectIndex
 * @desc ファストラベルの初期カーソルインデックスを指定します。移動後に初期化されます。
 * @text ファストラベル初期カーソルインデックス
 * 
 * @arg FastTravelListId
 * @text カーソルインデックス
 * @type number
 * @default -1
 * @min -1
 * @desc カーソルインデックスを記入します。
 * 
 * @param FastTravelSetting
 * @desc ファストトラベルの設定をします。
 * @text ファストトラベル設定
 * @type struct<fastTravelSetting>[]
 * @default 
 * 
 * @param TransferEventTrigger
 * @text 選択後イベント起動
 * @desc 移動先マップ選択後に対象のイベントを起動します。
 * @type boolean
 * @default true
 * 
 * @param NoDisplayUnregisteredLocation
 * @text 未登録場所非表示
 * @desc 条件に一致しない場所を表示しない。
 * @type boolean
 * @default false
 * 
 * @param MapUnknownData
 * @desc 未登録の文字列です。？1文字だけ入れると名前の文字数に応じて？に置き換えられます。
 * @text 条件不一致時文字列
 * @type string
 * @default ？
 * 
 * @param ScrollSpeed
 * @desc スクロールスピードを設定します。
 * @text スクロールスピード
 * @type number
 * @default 20
 * 
 * @param CharacterSetting
 * @text キャラクターチップ設定
 * @default ------------------------------
 * 
 * @param FastTravelCharacterName
 * @text キャラチップ画像
 * @desc ファストラベル中のキャラチップの画像。
 * @type file
 * @dir img/characters/
 * @default 
 * 
 * @param FastTravelCharacterIndex
 * @text キャラチップインデックスID
 * @desc ファストラベル中のキャラチップのインデックスID。
 * @type number
 * @default 0
 * 
 * @param HelpWindowSetting
 * @text ヘルプウィンドウ設定
 * @default ------------------------------
 * 
 * @param HelpWindowX
 * @text ヘルプウィンドウX座標
 * @desc ヘルプウィンドウのX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent HelpWindowSetting
 * 
 * @param HelpWindowY
 * @desc ヘルプウィンドウのY座標
 * @text ヘルプウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent HelpWindowSetting
 * 
 * @param HelpWindowWidth
 * @desc ヘルプウィンドウの横幅。
 * @text ヘルプウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent HelpWindowSetting
 * 
 * @param HelpWindowVisible
 * @text ヘルプウィンドウ不透明化
 * @desc ヘルプウィンドウを不透明化する。
 * @type boolean
 * @default true
 * @parent HelpWindowSetting
 * 
 * @param FastTravelWindowSetting
 * @text ファストトラベルウィンドウ設定
 * @default ------------------------------
 * 
 * @param FastTravelWindowX
 * @text ファストトラベルウィンドウX座標
 * @desc ファストトラベルウィンドウのX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent FastTravelWindowSetting
 * 
 * @param FastTravelWindowY
 * @desc ファストトラベルウィンドウのY座標
 * @text ファストトラベルウィンドウY座標
 * @type number
 * @default 68
 * @min -9999
 * @parent FastTravelWindowSetting
 * 
 * @param FastTravelWindowWidth
 * @desc ファストトラベルウィンドウの横幅。
 * @text ファストトラベルウィンドウ横幅
 * @type number
 * @default 240
 * @min 0
 * @parent FastTravelWindowSetting
 * 
 * @param FastTravelWindowRows
 * @desc ファストトラベルウィンドウの行数。
 * @text ファストトラベルウィンドウ行数
 * @type number
 * @default 10
 * @min 1
 * @parent FastTravelWindowSetting
 * 
 * @param FastTravelWindowVisible
 * @text ファストトラベルウィンドウ不透明化
 * @desc ファストトラベルウィンドウを不透明化する。
 * @type boolean
 * @default true
 * @parent FastTravelWindowSetting
 * 
 * @param ButtonSetting
 * @text ボタン設定
 * @default ------------------------------
 * 
 * @param ButtonAbsoluteCoordinates
 * @text ボタン絶対座標
 * @desc ボタンの座標を絶対座標にします。
 * @type boolean
 * @default false
 * @parent ButtonSetting
 * 
 * @param ButtonX
 * @text キャンセルボタンX座標
 * @desc キャンセルボタンのX座標
 * @type number
 * @default 0
 * @min -9999
 * 
 * @parent ButtonSetting
 * 
 * @param ButtonY
 * @desc キャンセルボタンのY座標
 * @text キャンセルボタンY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ButtonSetting
 * 
 */
/*~struct~fastTravelSetting:ja
 * 
 * @param Name
 * @desc 識別名。
 * @text 識別名
 * @type string
 * @default 
 * 
 * @param FastTravelList
 * @desc 移動先の設定をします。
 * @text 移動先設定
 * @type struct<fastTravelList>[]
 * @default 
 * 
 */
/*~struct~fastTravelList:ja
 * 
 * @param FastTravelName
 * @desc 移動先マップの表示名を設定します。
 * @text マップ表示名
 * @type string
 * @default 
 * 
 * @param IconIndex
 * @desc アイコンインデックス。
 * @text アイコン
 * @type icon
 * @default 0
 * 
 * @param EventId
 * @desc イベントIDまたはイベント名。
 * @text イベントID
 * @type string
 * @default 
 * 
 * @param FastTravelText
 * @desc 選択時に表示させるテキスト。(制御文字使用可能)
 * @text 選択時テキスト
 * @type string
 * @default 
 * 
 * @param Destination
 * @desc 移動先設定。
 * @text 移動先設定
 * @type struct<DestinationSetting>
 * @default 
 * 
 * @param EnableSwitchId
 * @desc 有効化させるスイッチID。0の場合は常に表示。
 * @text スイッチID
 * @type switch
 * @default 0
 * 
 * @param CommonEvent
 * @desc 移動時に実行するコモンイベント。
 * @text コモンイベント
 * @type common_event
 * @default 0
 * 
 * @param FastTravelSubWindowSetting
 * @text ファストトラベルサブウィンドウ設定(要NUUN_FastTravel_SubWindow)
 * @default ------------------------------
 * 
 * @param SubText
 * @desc ファストトラベルサブ項目設定でサブテキストに表示させるテキストを設定します。(制御文字使用可能)
 * @text サブテキスト設定
 * @type multiline_string
 * @default
 * @parent FastTravelSubWindowSetting
 * 
 * @param SubImgSetting
 * @desc サブウィンドウに表示する画像を設定します。
 * @text サブウィンドウ画像設定
 * @type struct<SubImg>[]
 * @default []
 * @parent FastTravelSubWindowSetting
 * 
 */
/*~struct~SubImg:ja
 * 
 * @param SubImage
 * @desc サブウィンドウに表示する画像を指定します。
 * @text サブウィンドウ画像
 * @type file
 * @dir img/
 * @default
 * 
 * @param SubImageX
 * @desc 画像のX座標を指定します。
 * @text 画像X座標
 * @type number
 * @default 0
 * 
 * @param SubImageY
 * @desc 画像のY座標を指定します。
 * @text 画像Y座標
 * @type number
 * @default 0
 * 
 * @param SubImageHeight
 * @desc 画像の表示高さ。0で縮小無し
 * @text 画像表示高さ
 * @type number
 * @default 0
 * 
 */
/*~struct~DestinationSetting:ja
 * 
 * @param DestinationMapLocation
 * @desc 移動先マップを指定します。(エディタ1.9.0以降)
 * @text 移動先マップ
 * @type location
 * @default 
 * 
 * @param DestinationMapId
 * @desc 移動先マップIDを指定します。
 * @text 移動先マップID
 * @type number
 * @default 0
 * 
 * @param DestinationMapX
 * @desc 移動先マップのX座標を指定します。
 * @text 移動先マップX座標
 * @type number
 * @default 0
 * 
 * @param DestinationMapY
 * @desc 移動先マップのY座標を指定します。
 * @text 移動先マップY座標
 * @type number
 * @default 0
 * 
 * @param Direction
 * @desc キャラクターの向き。
 * @text 向き
 * @type select
 * @option そのまま
 * @value 0
 * @option 下
 * @value 2
 * @option 左
 * @value 4
 * @option 右
 * @value 6
 * @option 上
 * @value 8
 * @default 0
 * 
 */

var Imported = Imported || {};
Imported.NUUN_FastTravel = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;
    
    PluginManager.registerCommand(pluginName, 'FastTravelOpen', args => {
        $gameTemp.fastTravelId = Number(args.Id) || 0;
        _openFastTravel(args);
    });

    PluginManager.registerCommand(pluginName, 'FastTravelOpen', args => {
        $gameTemp.fastTravelId = Number(args.Id) || 0;
        _openFastTravel(args);
    });

    PluginManager.registerCommand(pluginName, 'FastTravelSelectIndex', args => {
        _fastTravelData.setIndex(Number(args.FastTravelListId) || 0);
    });

    class FastTravelData {
        constructor() {
            this.index = -1;
            this.mapId = 0;
            this.direction = 0;
            this.mapX = 0;
            this.mapY = 0;
            this.characterName = null;
            this.characterIndex = 0;
        }

        setup() {
            const id = Number($dataMap.meta.FastTravelMap);
            this.setFastTravelSelect(id);
        }

        setFastTravelMapData() {
            this.mapId = $gameMap.mapId();
            this.direction = $gamePlayer.direction();
            this.mapX = $gamePlayer.x;
            this.mapY = $gamePlayer.y;
        }

        setFastTravelCharacterChipData() {
            this.characterName = $gamePlayer.characterName();
            this.characterIndex = $gamePlayer.characterIndex();
        }

        setIndex(index) {
            this.index = index;
        }

        getIndex() {
            const index = this.index;
            this.index = -1;
            return index;
        }

        isCharacterName() {
            return !!this.characterName;
        }

        clear() {
            this.characterName = null;
            this.characterIndex = 0;
        }

        setFastTravelSelect(id) {
            const data = params.FastTravelSetting[id - 1];
            if (!data && !data.FastTravelList) return this.setIndex(0);
            if (this.index >= 0) {
                return this.setInitFastTravelLocate(data, this.index);
            }
            const x = $gamePlayer._newX;
            const y = $gamePlayer._newY;
            let appX = 99999999;
            let appY = 99999999;
            let appIndex = 0;
            data.FastTravelList.forEach((fastTravel, index) => {
                const event = $gameMap.getFastTravelEvent(fastTravel.EventId);
                if (event) {
                    if (Math.abs(x - event.x) <= appX && Math.abs(y - event.y) <= appY) {
                        appX = Math.abs(x - event.x);
                        appY = Math.abs(y - event.y);
                        appIndex = index;
                    }
                }
            });
            this.setInitFastTravelLocate(data, appIndex);
            this.setIndex(appIndex);
        }

        setInitFastTravelLocate(data, index) {
            const fastTravel = this.fastTravelAt(data, index);
            const event = $gameMap.getFastTravelEvent(fastTravel.EventId);
            if (event) {
                $gamePlayer.fastTravelLocateTransfer(event.x, event.y);
            }
        }

        fastTravelAt(data, index) {
            return data.FastTravelList && index >= 0 ? data.FastTravelList[index] : null;
        }

    };
    const _fastTravelData = new FastTravelData();

    function _openFastTravel(args) {
        const mapId = Number(args.MapId);
        if (mapId <= 0 || $gameParty.inBattle() || $gameMessage.isBusy()) return;
        const x = Number(args.MapX);
        const y = Number(args.MapY);
        $gameTemp.fastTravelCommand = true;
        _fastTravelData.setFastTravelMapData();
        $gamePlayer.reserveTransfer(mapId, x, y, 2, 0);
    };


    const _Scene_Map_initialize = Scene_Map.prototype.initialize;
    Scene_Map.prototype.initialize = function() {
        _Scene_Map_initialize.call(this);
        this._fastTravelMap = false;
        this._cancelFastTravel = false;
    };

    const _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
    Scene_Map.prototype.createDisplayObjects = function() {
        this.setupFastTravel();
        _Scene_Map_createDisplayObjects.apply(this, arguments);
    };

    Scene_Map.prototype.setupFastTravel = function() {
        this._fastTravelMap = $dataMap && $dataMap.meta.FastTravelMap;
        if (this._fastTravelMap) {
            this._cancelFastTravel = $gameTemp.fastTravelCommand || false;
            $gameTemp.fastTravelCommand = false;
            this.setFastTravelCharacter();
        } else if (_fastTravelData.isCharacterName()) {
            this.resetFastTravel();
        }
    };

    Scene_Map.prototype.setFastTravelCharacter = function() {
        if (params.FastTravelCharacterName) {
            _fastTravelData.setFastTravelCharacterChipData();
            const actor = $gameParty.leader();
            actor.setCharacterImage(params.FastTravelCharacterName, params.FastTravelCharacterIndex);
            $gamePlayer.refresh();
        }  
    };

    Scene_Map.prototype.resetFastTravel = function() {
        const actor = $gameParty.leader();
        actor.setCharacterImage(_fastTravelData.characterName, _fastTravelData.characterIndex);
        _fastTravelData.clear();
        $gamePlayer.refresh();
    };

    const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        _Scene_Map_createAllWindows.call(this);
        if (this._fastTravelMap) {
            this.createFastTravel();
            this.openFastTravel(Number($dataMap.meta.FastTravelMap));
            const event = this._fastTravel.getFastTravelEvent(0);
            if (event) {
                //$gamePlayer.locate(event.x, event.y);
            }
            $gamePlayer.setDirection(2);
        }
        $gamePlayer.setDirectionFix($dataMap && !!$dataMap.meta.FastTravelMap);
    };

    const _Scene_Map_createButtons = Scene_Map.prototype.createButtons;
    Scene_Map.prototype.createButtons = function() {
        _Scene_Map_createButtons.apply(this, arguments);
        if (ConfigManager.touchUI) {
            if (this.needsCancelFastTravelButton()) {
                this.createCancelFastTravelButton();
            }
        }
    };

    Scene_Map.prototype.needsCancelFastTravelButton = function() {
        return this._cancelFastTravel;
    };

    Scene_Map.prototype.createCancelFastTravelButton = function() {
        this._cancelFastTravelButton = new Sprite_Button("cancel");
        this._cancelFastTravelButton.x = (params.ButtonAbsoluteCoordinates ? 0 : Graphics.boxWidth - this._cancelFastTravelButton.width - 4) + params.ButtonX;
        this._cancelFastTravelButton.y = this.fastTravelButtonY();
        this.addWindow(this._cancelFastTravelButton);
    };

    Scene_Map.prototype.fastTravelButtonY = function() {
        return (params.ButtonAbsoluteCoordinates ? 0 : 72) + params.ButtonY;
    };

    Scene_Map.prototype.createFastTravel = function() {
        this.createFastTravelHelpWindow();
        this.createFastTravelWindow();
        this._fastTravel.hide();
    };

    Scene_Map.prototype.createFastTravelHelpWindow = function() {
        const rect = this.fastTravelHelpWindowRect();
        this._fastTravelHelpWindow = new Window_FastTravelHelp(rect);
        this.addWindow(this._fastTravelHelpWindow);
    };
    
    Scene_Map.prototype.fastTravelHelpWindowRect = function() {
        const wx = params.HelpWindowX;
        const wy = params.HelpWindowY;
        const ww = params.HelpWindowWidth > 0 ? Math.min(params.HelpWindowWidth, Graphics.boxWidth - wx) : Graphics.boxWidth;
        const wh = this.calcWindowHeight(1, true);
        return new Rectangle(wx, wy, ww, wh);
    };
    
    
    Scene_Map.prototype.createFastTravelWindow = function() {
        const rect = this.fastTravelWindowRect();
        this._fastTravel = new Window_FastTravel(rect);
        this._fastTravel.setHandler("ok", this.fastTravelOk.bind(this));
        this._fastTravel.setHandler("cancel", this.fastTravelCancel.bind(this));
        this._fastTravel.setHelpWindow(this._fastTravelHelpWindow);
        this.addWindow(this._fastTravel);
    };

    Scene_Map.prototype.fastTravelWindowRect = function() {
        const wx = params.FastTravelWindowX;
        const wy = params.FastTravelWindowY;
        const ww = params.FastTravelWindowWidth > 0 ? Math.min(params.FastTravelWindowWidth, Graphics.boxWidth - wx) : Graphics.boxWidth;
        const wh = this.calcWindowHeight(params.FastTravelWindowRows, true);
        return new Rectangle(wx, wy, ww, wh);
    };

    const _Scene_Map_isMenuEnabled = Scene_Map.prototype.isMenuEnabled;
    Scene_Map.prototype.isMenuEnabled = function() {
        return _Scene_Map_isMenuEnabled.apply(this, arguments) && !this._fastTravelMap;
    };

    Scene_Map.prototype.isFastTravelActive = function() {
        return this._fastTravelMap ? !this._fastTravel.active : true;
    };

    Scene_Map.prototype.fastTravelOk = function() {
        const data = this._fastTravel.getFastTravelMap();
        let result = false;
        if (data) {
            if (params.TransferEventTrigger) {
                result = $gamePlayer.startFastTravelEvent(this.getFastTravelEvent());
            } else if(data.DestinationMapLocation && data.DestinationMapLocation.mapId > 0) {
                $gamePlayer.setDirectionFix(false);
                $gamePlayer.reserveTransfer((data.DestinationMapLocation.mapId), data.DestinationMapLocation.x, data.DestinationMapLocation.y, data.Direction, 0);
                result = true;
            } else if(data.DestinationMapId > 0) {
                $gamePlayer.setDirectionFix(false);
                $gamePlayer.reserveTransfer((data.DestinationMapId), data.DestinationMapX, data.DestinationMapY, data.Direction, 0);
                result = true;
            }
            if (data.CommonEvent > 0) {
                result = true;
                $gameTemp.reserveCommonEvent(data.CommonEvent);
            }
        }
        if (result) {
            this._fastTravel.deactivate();
            this._fastTravel.hide();
        } else {
            this._fastTravel.activate();
        }
    };
    
    Scene_Map.prototype.fastTravelCancel = function() {
        if (this._cancelFastTravel && _fastTravelData && _fastTravelData.mapId > 0) {
            $gamePlayer.setDirectionFix(false);
            $gamePlayer.reserveTransfer(_fastTravelData.mapId, _fastTravelData.mapX, _fastTravelData.mapY, _fastTravelData.direction, 0);
            this._fastTravel.deactivate();
            this._fastTravel.hide();
        } else {
            this._fastTravel.activate();
        }
    };

    Scene_Map.prototype.openFastTravel = function(id) {
        this._fastTravel.show();
        this._fastTravel.setup(id);
        this._fastTravel.select(_fastTravelData.getIndex());
        this._fastTravel.activate();
        //if (params.StartCommonEvent > 0) {
        //    $gameTemp.reserveCommonEvent(params.StartCommonEvent);
        //}
    };

    Scene_Map.prototype.getFastTravelEvent = function() {
        const fastTravel = this._fastTravel.getFastTravelData();
        return fastTravel ? $gameMap.getFastTravelEvent(fastTravel.EventId) : null;
    };


    function Window_FastTravel() {
        this.initialize(...arguments);
    }
    
    Window_FastTravel.prototype = Object.create(Window_Selectable.prototype);
    Window_FastTravel.prototype.constructor = Window_FastTravel;

    window.Window_FastTravel = Window_FastTravel;
    
    Window_FastTravel.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this._eventX = $gamePlayer.x;
        this._eventY = $gamePlayer.y;
        this._scrollRestX = 0;
        this._scrollRestY = 0;
        this._scrollSpeedX = 0;
        this._scrollSpeedY = 0;
        this.opacity = params.FastTravelWindowVisible ? 255 : 0;
    };

    Window_FastTravel.prototype.setup = function(id) {
        const data = params.FastTravelSetting[id - 1];
        if (data) {
            this._data = this.fastTravelListFilter(id) || [];
        }
        this.refresh();
    };

    Window_FastTravel.prototype.fastTravelListFilter = function(id) {
        return params.FastTravelSetting[id - 1].FastTravelList.filter(data => {
            if (!params.NoDisplayUnregisteredLocation && data.EnableSwitchId > 0) {
                return $gameSwitches.value(data.EnableSwitchId);
            } else {
                return true;
            }
        });
    };

    Window_FastTravel.prototype.maxItems = function() {
        return this._data ? this._data.length : 1;
    };

    Window_FastTravel.prototype.itemAt = function(index) {
        return this._data && index >= 0 ? this._data[index] : null;
    };

    Window_FastTravel.prototype.getFastTravelMap = function() {
        const data = this.itemAt(this.index());
        return data ? data.Destination : null;
    };

    Window_FastTravel.prototype.getFastTravelData = function() {
        const data = this.itemAt(this.index());
        return data ? data : null;
    };

    Window_FastTravel.prototype.drawItem = function(index) {
        const fastTravel = this.itemAt(index);
        if (fastTravel) {
            const rect = this.itemLineRect(index);
            const enabled = this.isEnabled(fastTravel);
            this.changePaintOpacity(enabled);
            if (enabled) {
                this.drawItemName(fastTravel, rect.x, rect.y, rect.width);
            } else {
                this.drawText(unknownDataLength(fastTravel.FastTravelName), rect.x, rect.y, rect.width);
            }
            this.changePaintOpacity(1);
        }
    };

    Window_FastTravel.prototype.drawItemName = function(data, x, y, width) {
        if (data) {
            const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
            const textMargin = ImageManager.iconWidth + 4;
            const itemWidth = Math.max(0, width - textMargin);
            this.resetTextColor();
            this.drawIcon(data.IconIndex, x, iconY);
            this.drawText(data.FastTravelName, x + textMargin, y, itemWidth);
        }
    };

    Window_FastTravel.prototype.isEnabled = function(data) {
        return data.EnableSwitchId > 0 ? $gameSwitches.value(data.EnableSwitchId) : true;
    };

    Window_FastTravel.prototype.isCurrentItemEnabled = function() {
        const fastTravel = this.itemAt(this.index());
        return fastTravel ? this.isEnabled(fastTravel) : false;
    };

    Window_FastTravel.prototype.select = function(index) {
        Window_Selectable.prototype.select.call(this, index);
        const event = this.getFastTravelEvent(index);
        if (this.isCurrentItemEnabled() && event) {
            this._eventX = event.x;
            this._eventY = event.y;
            const newDisplayX = event.x - $gamePlayer.centerX();
            const newDisplayY = event.y - $gamePlayer.centerY();
            this._scrollRestX = Math.abs(newDisplayX - $gameMap._displayX);
            this._scrollRestY = Math.abs(newDisplayY - $gameMap._displayY);
            this._scrollSpeedX = (this._scrollRestX / this._scrollRestX * (newDisplayX - $gameMap._displayX < 0 ? -1 : 1));
            this._scrollSpeedY = (this._scrollRestY / this._scrollRestY * (newDisplayY - $gameMap._displayY < 0 ? -1 : 1));
            const fastTravel = this.itemAt(this.index());
            if (fastTravel) {
                this.setHelpText(fastTravel.FastTravelText);
                this.setFastTravelSubWindow(fastTravel);
            }
        } else if (event) {
            this.setHelpText("");
            this.setFastTravelSubWindow(null);
        }
    };

    Window_FastTravel.prototype.getFastTravelEvent = function(index) {
        const fastTravel = this.itemAt(index);
        return fastTravel ? $gameMap.getFastTravelEvent(fastTravel.EventId) : null;
    };

    Window_FastTravel.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);
        if (this.active) {
            if (this.isCurrentItemEnabled()) {
                $gamePlayer.fastTravelLocate(this._eventX, this._eventY);
            }
            this.updateScroll();
        }
    };

    Window_FastTravel.prototype.updateScroll = function() {
        if (this._scrollRestX > 0) {
            const directionX = this._scrollSpeedX < 0;
            const speedX = this._scrollRestX / params.ScrollSpeed * this._scrollSpeedX;
            const d_speedX = directionX ? Math.min(0.1, speedX) : Math.max(-0.01, speedX);
            $gameMap.scrollDisplayPosX(d_speedX);
            this._scrollRestX -= Math.abs(d_speedX);
        }
        if (this._scrollRestY > 0) {
            const directionY = this._scrollSpeedY < 0;
            const speedY = this._scrollRestY / params.ScrollSpeed * this._scrollSpeedY;
            const d_speedY = directionY ? Math.min(0.1, speedY) : Math.max(-0.01, speedY);
            $gameMap.scrollDisplayPosY(d_speedY);
            this._scrollRestY -= Math.abs(d_speedY);
        }
    };

    Window_FastTravel.prototype.setHelpWindow = function(helpWindow) {
        this._fastTravelHelpWindow = helpWindow;
    };

    Window_FastTravel.prototype.setSubWindow = function(setSubWindow) {
        this._setSubWindow = setSubWindow;
    };

    Window_FastTravel.prototype.setHelpText = function(text) {
        if (this._fastTravelHelpWindow) {
            this._fastTravelHelpWindow.setHelpText(text);
        }
    };

    Window_FastTravel.prototype.setFastTravelSubWindow = function(fastTravel) {

    };


    function Window_FastTravelHelp() {
        this.initialize(...arguments);
    }
    
    Window_FastTravelHelp.prototype = Object.create(Window_Selectable.prototype);
    Window_FastTravelHelp.prototype.constructor = Window_FastTravelHelp;
    
    Window_FastTravelHelp.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this.fastTravelText = null;
        this.opacity = params.HelpWindowVisible ? 255 : 0;
    };

    Window_FastTravelHelp.prototype.setHelpText = function(text) {
        this.fastTravelText = text;
        this.refresh();
    };

    Window_FastTravelHelp.prototype.refresh = function() {
        Window_Selectable.prototype.refresh.call(this);
        const rect = this.itemLineRect(0);
        if (this.fastTravelText) {
            this.drawTextEx(this.fastTravelText, rect.x, rect.y);
        }
    };

    const _Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(mapId) {
        _Game_Map_setup.apply(this, arguments);
        if (this.isFastTravelMap()) {
            _fastTravelData.setup();
        }
    };

    Game_Map.prototype.isFastTravelMap = function() {
        return $dataMap && $dataMap.meta.FastTravelMap;
    };

    Game_Map.prototype.scrollDisplayPosX = function(x) {
        if (this.isLoopHorizontal()) {
            this._displayX += x;
            this._parallaxX += x;
        } else {
            const endX = this.width() - this.screenTileX();
            const displayX = this._displayX + x;
            this._displayX = endX < 0 ? endX / 2 : displayX.clamp(0, endX);
            this._parallaxX = this._displayX;
        }
    };

    Game_Map.prototype.scrollDisplayPosY = function(y) {
        if (this.isLoopVertical()) {
            this._displayY += y;
            this._parallaxY += y;
        } else {
            const endY = this.height() - this.screenTileY();
            const displayY = this._displayY + y;
            this._displayY = endY < 0 ? endY / 2 : displayY.clamp(0, endY);
            this._parallaxY = this._displayY;
        }
    };

    Game_Map.prototype.getFastTravelEvent = function(eventId) {
        return getTagCode(this, eventId);
    };

    Game_Map.prototype.openFastTravel = function(id, x, y) {
        if (id <= 0 || $gameParty.inBattle() || $gameMessage.isBusy()) return;
        $gameTemp.fastTravelCommand = true;
        _fastTravelData.setFastTravelMapData();
        $gamePlayer.reserveTransfer(id, x, y, 2, 0);
    };


    Game_Player.prototype.fastTravelLocateTransfer = function(x, y) {
        this._newX = x;
        this._newY = y;
    };

    Game_Player.prototype.fastTravelLocate = function(x, y) {
        Game_Character.prototype.locate.call(this, x, y);
        this._followers.synchronize(x, y, this.direction());
    };

    Game_Player.prototype.startFastTravelEvent = function(event) {
        if (!$gameMap.isEventRunning()) {
            if (!event) return false;
            event.start();
            return true;
        }
    };

    const _Game_Player_canMove = Game_Player.prototype.canMove;
    Game_Player.prototype.canMove = function() {
        if ($dataMap && $dataMap.meta.FastTravelMap) {
            return false;
        }
        return _Game_Player_canMove.apply(this, arguments);
    };

    const _Game_Follower_isVisible = Game_Follower.prototype.isVisible;//暫定
    Game_Follower.prototype.isVisible = function() {
        if ($dataMap && $dataMap.meta.FastTravelMap) {
            return false;
        }
        return _Game_Follower_isVisible.call(this);
    };


    function getTagCode(map, data) {
        if (!data) {
            return null;
        } else if (isNaN(data)) {
            return map.events().find(event => !!event && data === event.event().name);
        } else {
            return map.event(data);
        }
    };

    function unknownDataLength(name) {
        if (params.MapUnknownData === '？' || params.MapUnknownData === '?') {
            const name_length = name.length;
            return params.MapUnknownData.repeat(name_length);
        } else {
            return params.MapUnknownData;
        }
    };

    
})();