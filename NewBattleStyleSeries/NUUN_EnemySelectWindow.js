/*:-----------------------------------------------------------------------------------
 * NUUN_EnemySelectWindow.js
 * 
 * Copyright (C) 2024 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Battle Enemy Window Customization
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_BattleStyleEX
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * Customizes the enemy character selection window.
 * This plugin is an extension plugin for Battle Style EX.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 7/20/2024 Ver.1.0.0
 * First edition.
 * 
 * @param EnemyCols
 * @desc Number of cols to display.
 * @text Cols
 * @type number
 * @default 2
 * @min 1
 * @max 99
 * 
 * @param EnemyRows
 * @desc Number of rows to display.
 * @text Rows
 * @type number
 * @default 4
 * @min 1
 * @max 99
 * 
 * @param EnemyNameDyingColor
 * @desc The name of an enemy character will change color when they are near death.
 * @text Enemy name dying color applied
 * @type boolean
 * @default true
 * 
 * @param WindowVisible
 * @desc Makes the window image opaque. Please turn it OFF when specifying a background. (When it is OFF, only the commands are displayed.)
 * @text Window Opacity
 * @type boolean
 * @default true
 * 
 * @param CoordinateSettings
 * @text Coordinate Settings
 * @default ------------------------------
 * 
 * @param EnemyWindow_X
 * @desc Specifies the X coordinate of the enemy character window.
 * @text Window X coordinate
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent CoordinateSettings
 * 
 * @param EnemyWindow_Y
 * @desc Specifies the Y coordinate of the enemy character window.
 * @text Window Y coordinate
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent CoordinateSettings
 * 
 * @param EnemyWindow_Width
 * @desc Specifies the width of the enemy character window. 0 is the UI size.
 * @text Window width
 * @type number
 * @default 0
 * @max 9999
 * @min 0
 * @parent CoordinateSettings
 * 
 * @param EnemyWindowMode
 * @desc Window setting coordinate mode. (true: relative coordinate from the display position, false: absolute coordinate from the top left of the screen)
 * @text Coordinate mode
 * @type boolean
 * @default true
 * @parent CoordinateSettings
 * 
 * @param BackgroundSetting
 * @text Window Background Settings
 * @default ------------------------------
 * 
 * @param WindowBacgroundImg
 * @text Window background image settings
 * @desc Sets the background image of the window.
 * @default 
 * @type struct<WindowBackgroundSetting>
 * @parent BackgroundSetting
 * 
 * @param BackgroundWindowFit
 * @desc Fits the image display position to the window. OFF: UI range (0,0)
 * @text Window position display
 * @type boolean
 * @default treu
 * @parent BackgroundSetting
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
/*:ja
 * @target MZ
 * @plugindesc バトルエネミーウィンドウカスタマイズ
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_BattleStyleEX
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * 敵キャラの選択ウィンドウをカスタマイズします。
 * このプラグインはバトルスタイル拡張EXの拡張プラグインです。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/7/20 Ver.1.0.0
 * 初版
 * 
 * @param EnemyCols
 * @desc 表示する列数。
 * @text 列数
 * @type number
 * @default 2
 * @min 1
 * @max 99
 * 
 * @param EnemyRows
 * @desc 表示する行数。
 * @text 行数
 * @type number
 * @default 4
 * @min 1
 * @max 99
 * 
 * @param EnemyNameDyingColor
 * @desc 敵キャラ名を瀕死時に色を変化させます。
 * @text 敵ネーム瀕死カラー適用
 * @type boolean
 * @default true
 * 
 * @param WindowVisible
 * @desc ウィンドウ画像を不透明化。背景指定時はOFFにしてください。(OFFでコマンドのみ表示されます。)
 * @text ウィンドウ不透明化
 * @type boolean
 * @default true
 * 
 * @param CoordinateSettings
 * @text Coordinate Settings
 * @default ------------------------------
 * 
 * @param EnemyWindow_X
 * @desc 敵キャラウィンドウのX座標を指定します。
 * @text ウィンドウX座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent CoordinateSettings
 * 
 * @param EnemyWindow_Y
 * @desc 敵キャラウィンドウのY座標を指定します。
 * @text ウィンドウY座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent CoordinateSettings
 * 
 * @param EnemyWindow_Width
 * @desc 敵キャラウィンドウの横幅を指定します。0でUIサイズ 画面より大きい値にすると自動的に画面の横幅になります。
 * @text ウィンドウの横幅
 * @type number
 * @default 0
 * @max 9999
 * @min 0
 * @parent CoordinateSettings
 * 
 * @param EnemyWindowMode
 * @desc 敵キャラウィンドウの設定座標モード。(true:デフォルトの表示位置からの相対座標 false:画面左上からの絶対座標)
 * @text 設定座標モード
 * @type boolean
 * @default true
 * @parent CoordinateSettings
 * 
 * @param BackgroundSetting
 * @text ウィンドウ背景設定
 * @default ------------------------------
 * 
 * @param WindowBacgroundImg
 * @text ウィンドウ背景画像設定
 * @desc ウィンドウの背景画像を設定します。
 * @default 
 * @type struct<WindowBackgroundSetting>
 * @parent BackgroundSetting
 * 
 * @param BackgroundWindowFit
 * @desc 画像の表示位置をウィンドウに合わせます。OFFでUI範囲(0,0)
 * @text ウィンドウ位置表示
 * @type boolean
 * @default treu
 * @parent BackgroundSetting
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

var Imported = Imported || {};
Imported.NUUN_EnemySelectWindow = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const parameters = PluginManager.parameters('NUUN_EnemySelectWindow');

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
        this.createBattleEnemyBackground();
    };

    const _Scene_Battle_enemyWindowRect = Scene_Battle.prototype.enemyWindowRect;
    Scene_Battle.prototype.enemyWindowRect = function() {
        const rect = _Scene_Battle_enemyWindowRect.apply(this, arguments);
        rect.x = (params.EnemyWindowMode ? rect.x : 0) + params.EnemyWindow_X;
        rect.width = params.EnemyWindow_Width > 0 ? Math.min(Graphics.boxWidth, params.EnemyWindow_Width) - rect.x : rect.width;
        rect.height = this.calcWindowHeight(params.EnemyRows, true);
        rect.y = (params.EnemyWindowMode ? rect.y : 0) + params.EnemyWindow_Y;
        return rect;
    };

    const _Scene_Battle_createEnemyWindow = Scene_Battle.prototype.createEnemyWindow;
    Scene_Battle.prototype.createEnemyWindow = function() {
        _Scene_Battle_createEnemyWindow.apply(this, arguments);
        if (this._enmeyWindowBackground && this._enemyWindow) {
            const data = _getBackground();
            this._enmeyWindowBackground.x = (params.BackgroundWindowFit ? this._enemyWindow.x : 0) + data.Background_X;
            this._enmeyWindowBackground.y = (params.BackgroundWindowFit ? this._enemyWindow.y : 0) + data.Background_Y;
        } 
    };

    Scene_Battle.prototype.createBattleEnemyBackground = function() {
        const data = _getBackgroundImg();
        if (data) {
            const bitmap = ImageManager.nuun_LoadPictures(data);
            const sprite = new Sprite(bitmap);
            this.addChild(sprite);
            sprite.hide();
            this._enmeyWindowBackground = sprite;
        }
    };

    const _Scene_Battle_updateVisibility = Scene_Battle.prototype.updateVisibility;
    Scene_Battle.prototype.updateVisibility = function() {
        _Scene_Battle_updateVisibility.apply(this, arguments);
        this.updateBackgroundEnmeyWindow();
    };

    Scene_Battle.prototype.updateBackgroundEnmeyWindow = function() {
        if (this._enmeyWindowBackground && this._enemyWindow) {
            if (this._enemyWindow.isOpen()) {
                this._enmeyWindowBackground.visible = this._enemyWindow.visible;
            } else if (this._enemyWindow.visible) {
                this._enmeyWindowBackground.visible = this._enemyWindow.isOpen();
            }
        }
    };
    

    const _Window_BattleEnemy_initialize = Window_BattleEnemy.prototype.initialize;
    Window_BattleEnemy.prototype.initialize = function(rect) {
        _Window_BattleEnemy_initialize.apply(this, arguments);
        this.opacity = params.WindowVisible ? 255 : 0;
    };

    Window_BattleEnemy.prototype.maxCols = function() {
        return params.EnemyCols;
    };

    const _Window_BattleEnemy_drawItem = Window_BattleEnemy.prototype.drawItem;
    Window_BattleEnemy.prototype.drawItem = function(index) {
        if (params.EnemyNameDyingColor) {
            const enemy = this._enemies[index];
            this.changeTextColor(ColorManager.hpColor(enemy));
            const name = enemy.name();
            const rect = this.itemLineRect(index);
            this.drawText(name, rect.x, rect.y, rect.width);
        } else {
            _Window_BattleEnemy_drawItem.apply(this, arguments);
        }
    };

   
})();