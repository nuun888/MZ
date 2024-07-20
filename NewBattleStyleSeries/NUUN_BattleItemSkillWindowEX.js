/*:-----------------------------------------------------------------------------------
 * NUUN_BattleItemSkillWindowEX.js
 * 
 * Copyright (C) 2024 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc IBattle item and skill window customization
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_BattleStyleEX
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * Customize the item and skill window during battle.
 * This plugin is an extension plugin for Battle Style EX.
 * 
 * Notes for items and skills
 * <BattleHelp:[text]>
 * [text]: Help text
 * If the above tag is not present, help for database settings will be displayed.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 7/20/2024 Ver.1.0.0
 * First edition.
 * 
 * @param HelpLogWindowShow
 * @desc The log window will be displayed even when the help window is displayed.
 * @text Display log when displaying help
 * @type boolean
 * @default false
 * 
 * @param SkillWindowSettings
 * @text Skill Window Settings
 * @default ------------------------------
 * 
 * @param SkillWindowCols
 * @desc Number of cols to display.
 * @text Cols
 * @type number
 * @default 2
 * @min 1
 * @max 99
 * @parent SkillWindowSettings
 * 
 * @param SkillWindowRows
 * @desc Number of rows to display.
 * @text Rows
 * @type number
 * @default 4
 * @min 1
 * @max 99
 * @parent SkillWindowSettings
 * 
 * @param SkillWindowVisible
 * @desc Window image opacity. Please turn it OFF when specifying background.
 * @text Window Opacity
 * @type boolean
 * @default true
 * @parent SkillWindowSettings
 * 
 * @param SkillWindowCoordinateSettings
 * @text Skill window coordinate settings
 * @default ------------------------------
 * @parent SkillWindowSettings
 * 
 * @param SkillWindow_X
 * @desc Specifies the X coordinate of the skill window.
 * @text Window X coordinate
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent SkillWindowCoordinateSettings
 * 
 * @param SkillWindow_Y
 * @desc Specifies the Y coordinate of the skill window.
 * @text Window Y coordinate
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent SkillWindowCoordinateSettings
 * 
 * @param SkillWindow_Width
 * @desc Specifies the width of the skill window. 0 is the UI size.
 * @text Window width
 * @type number
 * @default 0
 * @max 9999
 * @min 0
 * @parent SkillWindowCoordinateSettings
 * 
 * @param SkillWindowMode
 * @desc Coordinate mode for skill window. (true: relative to default display position, false: absolute from top left of screen)
 * @text Set coordinate mode
 * @type boolean
 * @default true
 * @parent SkillWindowCoordinateSettings
 * 
 * @param SkillWindowHelpSetting
 * @text Skill Help Window Settings
 * @default ------------------------------
 * @parent SkillWindowSettings
 * 
 * @param SkillWindowHelp
 * @text Skill Window Help Settings
 * @desc Sets the help for the skill window. Leave blank for default display.
 * @default 
 * @type struct<HelpWindowData>
 * @parent SkillWindowHelpSetting
 * 
 * @param SkillWindowBackgroundSetting
 * @text Skill window background settings
 * @default ------------------------------
 * @parent SkillWindowSettings
 * 
 * @param SkillWindowWindowBacgroundImg
 * @text Skill window background image setting
 * @desc Sets the background image for the skill window.
 * @default 
 * @type struct<WindowBackgroundSetting>
 * @parent SkillWindowBackgroundSetting
 * 
 * @param SkillWindowBackgroundWindowFit
 * @desc Fits the image display position to the window. OFF: UI range (0,0)
 * @text Window position display
 * @type boolean
 * @default treu
 * @parent SkillWindowBackgroundSetting
 * 
 * @param ItemWindowSettings
 * @text Item Window Settings
 * @default ------------------------------
 * 
 * @param ItemWindowCols
 * @desc Number of cols to display.
 * @text Cols
 * @type number
 * @default 2
 * @min 1
 * @max 99
 * @parent ItemWindowSettings
 * 
 * @param ItemWindowRows
 * @desc Number of rows to display.
 * @text Rows
 * @type number
 * @default 4
 * @min 1
 * @max 99
 * @parent ItemWindowSettings
 * 
 * @param ItemWindowVisible
 * @desc Window image opacity. Please turn it OFF when specifying background.
 * @text Window Opacity
 * @type boolean
 * @default true
 * @parent ItemWindowSettings
 * 
 * @param ItemWindowCoordinateSettings
 * @text Item window coordinate settings
 * @default ------------------------------
 * @parent ItemWindowSettings
 * 
 * @param ItemWindow_X
 * @desc Specifies the X coordinate of the item window.
 * @text Window X coordinate
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent ItemWindowCoordinateSettings
 * 
 * @param ItemWindow_Y
 * @desc Specifies the Y coordinate of the item window.
 * @text Window Y coordinate
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent ItemWindowCoordinateSettings
 * 
 * @param ItemWindow_Width
 * @desc Specifies the width of the item window. 0 is the UI size.
 * @text Window width
 * @type number
 * @default 0
 * @max 9999
 * @min 0
 * @parent ItemWindowCoordinateSettings
 * 
 * @param ItemWindowMode
 * @desc Coordinate mode for the item window. (true: relative to the default display position, false: absolute from the top left of the screen)
 * @text Set coordinate mode
 * @type boolean
 * @default true
 * @parent ItemWindowCoordinateSettings
 * 
 * @param ItemWindowHelpSetting
 * @text Item Help Window Settings
 * @default ------------------------------
 * @parent ItemWindowSettings
 * 
 * @param ItemWindowHelp
 * @text Item Window Help Settings
 * @desc Sets the help for the item window. Leave blank for default display.
 * @default 
 * @type struct<HelpWindowData>
 * @parent ItemWindowHelpSetting
 * 
 * @param ItemWindowBackgroundSetting
 * @text Item window background settings
 * @default ------------------------------
 * @parent ItemWindowSettings
 * 
 * @param ItemWindowWindowBacgroundImg
 * @text Item window background image settings
 * @desc Sets the background image of the item window.
 * @default 
 * @type struct<WindowBackgroundSetting>
 * @parent ItemWindowBackgroundSetting
 * 
 * @param ItemWindowBackgroundWindowFit
 * @desc Fits the image display position to the window. OFF: UI range (0,0)
 * @text Window position display
 * @type boolean
 * @default treu
 * @parent ItemWindowBackgroundSetting
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
/*~struct~HelpWindowData:
 * 
 * @param HelpX
 * @desc Help window X coordinate (relative).
 * @text Help window X coordinate (relative)
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param HelpY
 * @desc Help window Y coordinate (relative).
 * @text Help window Y coordinate (relative)
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param HelpWidth
 * @desc The width of the help window.
 * @text Help window width
 * @type number
 * @default 0
 * @min 0
 * @max 9999
 * 
 * @param HelpRows
 * @desc The number of rows to display in the help window.
 * @text Help window display rows
 * @type number
 * @default 2
 * @min 1
 * @max 99
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc バトルアイテム、スキルウィンドウカスタマイズ
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_BattleStyleEX
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * 戦闘中のアイテム、スキルウィンドウをカスタマイズします。
 * このプラグインはバトルスタイル拡張EXの拡張プラグインです。
 * 
 * アイテム、スキルのメモ欄
 * <BattleHelp:[text]>
 * [text]:ヘルプテキスト
 * 上記のタグがない場合は、データベースの設定のヘルプが表示されます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/7/20 Ver.1.0.0
 * 初版
 * 
 * 
 * @param HelpLogWindowShow
 * @desc ヘルプウィンドウ表示中でもログウィンドウを表示させます。
 * @text ヘルプ表示時ログ表示
 * @type boolean
 * @default false
 * 
 * @param SkillWindowSettings
 * @text スキルウィンドウ設定
 * @default ------------------------------
 * 
 * @param SkillWindowCols
 * @desc 表示する列数。
 * @text 列数
 * @type number
 * @default 2
 * @min 1
 * @max 99
 * @parent SkillWindowSettings
 * 
 * @param SkillWindowRows
 * @desc 表示する行数。
 * @text 行数
 * @type number
 * @default 4
 * @min 1
 * @max 99
 * @parent SkillWindowSettings
 * 
 * @param SkillWindowVisible
 * @desc ウィンドウ画像を不透明化。背景指定時はOFFにしてください。(OFFでコマンドのみ表示されます。)
 * @text ウィンドウ不透明化
 * @type boolean
 * @default true
 * @parent SkillWindowSettings
 * 
 * @param SkillWindowCoordinateSettings
 * @text スキルウィンドウ座標設定
 * @default ------------------------------
 * @parent SkillWindowSettings
 * 
 * @param SkillWindow_X
 * @desc スキルウィンドウのX座標を指定します。
 * @text ウィンドウX座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent SkillWindowCoordinateSettings
 * 
 * @param SkillWindow_Y
 * @desc スキルウィンドウのY座標を指定します。
 * @text ウィンドウY座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent SkillWindowCoordinateSettings
 * 
 * @param SkillWindow_Width
 * @desc スキルウィンドウの横幅を指定します。0でUIサイズ
 * @text ウィンドウの横幅
 * @type number
 * @default 0
 * @max 9999
 * @min 0
 * @parent SkillWindowCoordinateSettings
 * 
 * @param SkillWindowMode
 * @desc スキルウィンドウの設定座標モード。(true:デフォルトの表示位置からの相対座標 false:画面左上からの絶対座標)
 * @text 設定座標モード
 * @type boolean
 * @default true
 * @parent SkillWindowCoordinateSettings
 * 
 * @param SkillWindowHelpSetting
 * @text スキルヘルプウィンドウ設定
 * @default ------------------------------
 * @parent SkillWindowSettings
 * 
 * @param SkillWindowHelp
 * @text スキルウィンドウヘルプ設定
 * @desc スキルウィンドウのヘルプを設定します。空白でデフォルトの表示になります。
 * @default 
 * @type struct<HelpWindowData>
 * @parent SkillWindowHelpSetting
 * 
 * @param SkillWindowBackgroundSetting
 * @text ウィンドウ背景設定
 * @default ------------------------------
 * @parent SkillWindowSettings
 * 
 * @param SkillWindowWindowBacgroundImg
 * @text スキルウィンドウ背景画像設定
 * @desc スキルウィンドウの背景画像を設定します。
 * @default 
 * @type struct<WindowBackgroundSetting>
 * @parent SkillWindowBackgroundSetting
 * 
 * @param SkillWindowBackgroundWindowFit
 * @desc 画像の表示位置をウィンドウに合わせます。OFFでUI範囲(0,0)
 * @text ウィンドウ位置表示
 * @type boolean
 * @default treu
 * @parent SkillWindowBackgroundSetting
 * 
 * @param ItemWindowSettings
 * @text アイテムウィンドウ設定
 * @default ------------------------------
 * 
 * @param ItemWindowCols
 * @desc 表示する列数。
 * @text 列数
 * @type number
 * @default 2
 * @min 1
 * @max 99
 * @parent ItemWindowSettings
 * 
 * @param ItemWindowRows
 * @desc 表示する行数。
 * @text 行数
 * @type number
 * @default 4
 * @min 1
 * @max 99
 * @parent ItemWindowSettings
 * 
 * @param ItemWindowVisible
 * @desc ウィンドウ画像を不透明化。背景指定時はOFFにしてください。(OFFでコマンドのみ表示されます。)
 * @text ウィンドウ不透明化
 * @type boolean
 * @default true
 * @parent ItemWindowSettings
 * 
 * @param ItemWindowCoordinateSettings
 * @text アイテムウィンドウ座標設定
 * @default ------------------------------
 * @parent ItemWindowSettings
 * 
 * @param ItemWindow_X
 * @desc アイテムウィンドウのX座標を指定します。
 * @text ウィンドウX座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent ItemWindowCoordinateSettings
 * 
 * @param ItemWindow_Y
 * @desc アイテムウィンドウのY座標を指定します。
 * @text ウィンドウY座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent ItemWindowCoordinateSettings
 * 
 * @param ItemWindow_Width
 * @desc アイテムウィンドウの横幅を指定します。
 * @text ウィンドウの横幅
 * @type number
 * @default 0
 * @max 9999
 * @min 0
 * @parent ItemWindowCoordinateSettings
 * 
 * @param ItemWindowMode
 * @desc アイテムウィンドウの設定座標モード。(true:デフォルトの表示位置からの相対座標 false:画面左上からの絶対座標)
 * @text 設定座標モード
 * @type boolean
 * @default true
 * @parent ItemWindowCoordinateSettings
 * 
 * @param ItemWindowHelpSetting
 * @text アイテムヘルプウィンドウ設定
 * @default ------------------------------
 * @parent ItemWindowSettings
 * 
 * @param ItemWindowHelp
 * @text アイテムウィンドウヘルプ設定
 * @desc アイテムウィンドウのヘルプを設定します。空白でデフォルトの表示になります。
 * @default 
 * @type struct<HelpWindowData>
 * @parent ItemWindowHelpSetting
 * 
 * @param ItemWindowBackgroundSetting
 * @text アイテムウィンドウ背景設定
 * @default ------------------------------
 * @parent ItemWindowSettings
 * 
 * @param ItemWindowWindowBacgroundImg
 * @text アイテムウィンドウ背景画像設定
 * @desc アイテムウィンドウの背景画像を設定します。
 * @default 
 * @type struct<WindowBackgroundSetting>
 * @parent ItemWindowBackgroundSetting
 * 
 * @param ItemWindowBackgroundWindowFit
 * @desc 画像の表示位置をウィンドウに合わせます。OFFでUI範囲(0,0)
 * @text ウィンドウ位置表示
 * @type boolean
 * @default treu
 * @parent ItemWindowBackgroundSetting
 * 
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
/*~struct~HelpWindowData:ja
 * 
 * @param HelpX
 * @desc ヘルプウィンドウのX座標（相対）。
 * @text ヘルプウィンドウX座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param HelpY
 * @desc ヘルプウィンドウのY座標（相対）。
 * @text ヘルプウィンドウY座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param HelpWidth
 * @desc ヘルプウィンドウの横幅。
 * @text ヘルプウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @max 9999
 * 
 * @param HelpRows
 * @desc ヘルプウィンドウの表示行数。
 * @text ヘルプウィンドウ表示行数
 * @type number
 * @default 2
 * @min 1
 * @max 99
 * 
 */

var Imported = Imported || {};
Imported.NUUN_BattleItemSkillWindowEX = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const parameters = PluginManager.parameters('NUUN_BattleItemSkillWindowEX');

    function _getBackground() {
        return params.WindowBacgroundImg ? params.WindowBacgroundImg : null;
    };

    function _getBackgroundImg() {
        const background = _getBackground();
        return background ? background.BackgroundImg : null;
    };

    const _Scene_Battle_createSpriteset = Scene_Battle.prototype.createSpriteset;
    Scene_Battle.prototype.createSpriteset = function() {
        _Scene_Battle_createSpriteset.apply(this, arguments);
        this.createBattleItemBackground();
        this.createBattleSkillBackground();
    };

    Scene_Battle.prototype.createBattleItemBackground = function() {
        const data = _getBackgroundImg();
        if (data) {
            const bitmap = ImageManager.nuun_LoadPictures(data);
            const sprite = new Sprite(bitmap);
            this.addChild(sprite);
            sprite.hide();
            this._itemWindowBackground = sprite;
        }
    };

    Scene_Battle.prototype.createBattleSkillBackground = function() {
        const data = _getBackgroundImg();
        if (data) {
            const bitmap = ImageManager.nuun_LoadPictures(data);
            const sprite = new Sprite(bitmap);
            this.addChild(sprite);
            sprite.hide();
            this._skillWindowBackground = sprite;
        }
    };

    const _Scene_Battle_updateVisibility = Scene_Battle.prototype.updateVisibility;
    Scene_Battle.prototype.updateVisibility = function() {
        _Scene_Battle_updateVisibility.apply(this, arguments);
        this.updateBackgroundBattleItem();
        this.updateBackgroundBattleSkill();
    };

    Scene_Battle.prototype.updateBackgroundBattleItem = function() {
        if (this._itemWindowBackground && this._itemWindow) {
            if (this._itemWindow.isOpen()) {
                this._itemWindowBackground.visible = this._itemWindow.visible;
            } else if (this._itemWindow.visible) {
                this._itemWindowBackground.visible = this._itemWindow.isOpen();
            }
        }
    };

    Scene_Battle.prototype.updateBackgroundBattleSkill = function() {
        if (this._skillWindowBackground && this._skillWindow) {
            if (this._skillWindow.isOpen()) {
                this._skillWindowBackground.visible = this._skillWindow.visible;
            } else if (this._skillWindow.visible) {
                this._skillWindowBackground.visible = this._skillWindow.isOpen();
            }
        }
    };

    const _Scene_Battle_updateLogWindowVisibility = Scene_Battle.prototype.updateLogWindowVisibility;
    Scene_Battle.prototype.updateLogWindowVisibility = function() {
        _Scene_Battle_updateLogWindowVisibility.apply(this, arguments);
        this._logWindow.visible = params.HelpLogWindowShow || (this._logWindow.visible && !this._bsHelpWindow.visible);
    };

    const _Scene_Battle_createHelpWindow = Scene_Battle.prototype.createHelpWindow;
    Scene_Battle.prototype.createHelpWindow = function() {
        _Scene_Battle_createHelpWindow.apply(this, arguments);
        const rect = this.helpWindowRect();
        this._bsHelpWindow = new Window_BsHelp(rect);
        this._bsHelpWindow.hide();
        this.addWindow(this._bsHelpWindow);
    };
    
    const _Scene_Battle_createItemWindow = Scene_Battle.prototype.createItemWindow;
    Scene_Battle.prototype.createItemWindow = function() {
        _Scene_Battle_createItemWindow.apply(this, arguments);
        this._itemWindow.setHelpWindow(this._bsHelpWindow);
        this.itemBackgroundPosition();
    };

    const _Scene_Battle_createSkillWindow = Scene_Battle.prototype.createSkillWindow;
    Scene_Battle.prototype.createSkillWindow = function() {
        _Scene_Battle_createSkillWindow.apply(this, arguments);
        this._skillWindow.setHelpWindow(this._bsHelpWindow);
        this.skillBackgroundPosition();
    };

    Scene_Battle.prototype.itemBackgroundPosition = function() {
        if (this._itemWindowBackground && this._itemWindow) {
            const data = _getBackground();
            this._itemWindowBackground.x = (params.BackgroundWindowFit ? this._itemWindow.x : 0) + data.Background_X;
            this._itemWindowBackground.y = (params.BackgroundWindowFit ? this._itemWindow.y : 0) + data.Background_Y;
        }
    };

    Scene_Battle.prototype.skillBackgroundPosition = function() {
        if (this._skillWindowBackground && this._skillWindow) {
            const data = _getBackground();
            this._skillWindowBackground.x = (params.BackgroundWindowFit ? this._skillWindow.x : 0) + data.Background_X;
            this._skillWindowBackground.y = (params.BackgroundWindowFit ? this._skillWindow.y : 0) + data.Background_Y;
        }
    };

    const _Scene_Battle_skillWindowRect = Scene_Battle.prototype.skillWindowRect;
    Scene_Battle.prototype.skillWindowRect = function() {
        const rect = _Scene_Battle_skillWindowRect.apply(this, arguments);
        rect.x = (params.SkillWindowMode ? rect.x : 0) + params.SkillWindow_X;
        rect.width = params.SkillWindow_Width > 0 ? Math.min(Graphics.boxWidth, params.SkillWindow_Width) - rect.x : rect.width;
        rect.height = this.calcWindowHeight(params.SkillWindowRows, true);
        rect.y = (params.SkillWindowMode ? rect.y : 0) + params.SkillWindow_Y;
        return rect;
    };

    const _Scene_Battle_itemWindowRect = Scene_Battle.prototype.itemWindowRect;
    Scene_Battle.prototype.itemWindowRect = function() {
        const rect = _Scene_Battle_skillWindowRect.apply(this, arguments);
        rect.x = (params.ItemWindowMode ? rect.x : 0) + params.ItemWindow_X;
        rect.width = params.ItemWindow_Width > 0 ? Math.min(Graphics.boxWidth, params.ItemWindow_Width) - rect.x : rect.width;
        rect.height = this.calcWindowHeight(params.ItemWindowRows, true);
        rect.y = (params.ItemWindowMode ? rect.y : 0) + params.ItemWindow_Y;
        return rect;
    };


    const _Window_BattleItem_initialize = Window_BattleItem.prototype.initialize;
    Window_BattleItem.prototype.initialize = function(rect) {
        _Window_BattleItem_initialize.call(this, rect);
        this.opacity = params.ItemWindowVisible ? 255 : 0;
    };

    Window_BattleItem.prototype.maxCols = function() {
        return params.ItemWindowCols;
    };


    const _Window_BattleSkill_initialize = Window_BattleSkill.prototype.initialize;
    Window_BattleSkill.prototype.initialize = function(rect) {
        _Window_BattleSkill_initialize.call(this, rect);
        this.opacity = params.SkillWindowVisible ? 255 : 0;
    };

    Window_BattleSkill.prototype.maxCols = function() {
        return params.SkillWindowCols;
    };

    const _Window_Selectable_setHelpWindowItem = Window_Selectable.prototype.setHelpWindowItem;
    Window_Selectable.prototype.setHelpWindowItem = function(item) {
        this.setHelpRect();
        _Window_Selectable_setHelpWindowItem.apply(this, arguments);
    };

    Window_Selectable.prototype.setHelpRect = function() {
        if (this._helpWindow && this._helpWindow.setBsParams) {
            this._helpWindow.setBsParams(null ,null ,null, 2);
        }
    };

    Window_BattleItem.prototype.setHelpRect = function() {
        if (this._helpWindow) {
            const data = params.ItemWindowHelp;
            if (data) {
                this._helpWindow.setBsParams(data.HelpX ,data.HelpY ,data.HelpWidth, data.HelpRows);
            } else {
                this._helpWindow.setBsParams(null ,null ,null, 2);
            }
        }
    };

    Window_BattleSkill.prototype.setHelpRect = function() {
        if (this._helpWindow) {
            const data = params.SkillWindowHelp;
            if (data) {
                this._helpWindow.setBsParams(data.HelpX ,data.HelpY ,data.HelpWidth, data.HelpRows);
            } else {
                this._helpWindow.setBsParams(null ,null ,null, 2);
            }
        }
    };


    function Window_BsHelp() {
        this.initialize(...arguments);
    }
    
    Window_BsHelp.prototype = Object.create(Window_Help.prototype);
    Window_BsHelp.prototype.constructor = Window_BsHelp;

    Window_BsHelp.prototype.initialize = function(rect) {
        const height = rect.height;
        rect.height = Graphics.boxHeight;
        Window_Help.prototype.initialize.call(this, rect);
        this.height = height;
        this.setBsHome(this.x, this.y, this.width);
    };

    Window_BsHelp.prototype.setItem = function(item) {
        if (item && item.meta.BattleHelp) {
            this.setText(item.meta.BattleHelp);
        } else {
            Window_Help.prototype.setItem.apply(this, arguments);
        }
    };

    Window_BsHelp.prototype.setBsHome = function(x, y, width) {
        this._bsHomeX = x;
        this._bsHomeY = y;
        this._bsHomeWidth = width;
    };

    Window_BsHelp.prototype.setBsParams = function(x, y, width, rows) {
        this.x = x !== null ? x : this._bsHomeX;
        this.y = y !== null ? y : this._bsHomeY;
        this.width = width !== null ? width : this._bsHomeWidth;
        this.height = this.fittingHeight(rows);
        this._helpRefresh = true;
    };
   
})();