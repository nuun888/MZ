/*:-----------------------------------------------------------------------------------
 * NUUN_BattleActionWindow.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Battle log simple display and batch popup
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.1.1
 * 
 * @help
 * Only item names and skill names are displayed in the battle log.
 * This plugin displays popups all at once.
 * 
 * Log display position battler setting is set only when "Log display position" is specified as battler (log window only).
 * 
 * "Log display position" butler (log window only)
 * Enemy notes
 * <BattleLogPosition:[x],[y]>
 * [x]:X-coordinate
 * [y]:Y-coordinate
 * If the above tag is present, the setting in "Enemy window display position" will be ignored.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 6/3/2023 Ver.1.1.1
 * Correction of processing.
 * 5/9/2023 Ver.1.1.0
 * Added a function to display a message when using.
 * 5/5/2023 Ver.1.0.0
 * First edition.
 * 
 * @param LogSetting
 * @text Log setting
 * @default ------------------------------
 * 
 * @param LogWindowMode
 * @desc Specifies the log mode.
 * @text Log mode
 * @type select
 * @option Log message
 * @value 0
 * @option Log window
 * @value 1
 * @default 1
 * 
 * @param LogMessageMode
 * @text Log display format
 * @desc Specifies the log display format.
 * @type select
 * @option Skill, Item name only
 * @value 0
 * @option Message when using
 * @value 1
 * @default 0
 * 
 * @param LogWindowPositionMode
 * @desc Specify the display position of the log.
 * @text Log display position
 * @type select
 * @option Default
 * @value 0
 * @option Horizontal center
 * @value 1
 * @option Butler (log window only)
 * @value 2
 * @default 0
 * 
 * @param WindowSetting
 * @text Window setting
 * @default ------------------------------
 * 
 * @param WindowWidth
 * @desc width of the window. UI width at 0
 * @text Window width
 * @type number
 * @default 0
 * @parent WindowSetting
 * 
 * @param WindowX
 * @desc X coordinate of the window.
 * @text Window x coordinate
 * @type number
 * @default 0
 * @min -9999
 * @parent WindowSetting
 * 
 * @param WindowY
 * @desc Y coordinate of the window.
 * @text Window y coordinate
 * @type number
 * @default 0
 * @min -9999
 * @parent WindowSetting
 * 
 * @param LogWindowPositionBattlerSetting
 * @text Log display position butler setting
 * @default ------------------------------
 * 
 * @param ActorLogWindowPosition
 * @desc The window display position of the actor.
 * @text Actor window display position
 * @type struct<LogWindowSettings>
 * @default {"WindowX":"0","WindowY":"0"}
 * @parent LogWindowPositionBattlerSetting
 * 
 * @param EnemyLogWindowPosition
 * @desc The window display position of the enemy.
 * @text Enemy window display position
 * @type struct<LogWindowSettings>
 * @default {"WindowX":"0","WindowY":"0"}
 * @parent LogWindowPositionBattlerSetting
 * 
 * @param WindowBackgroundSetting
 * @text Window background image setting
 * @default ------------------------------
 * 
 * @param BackGroundImg
 * @desc Specifies the background image file name. Displayed when the log mode is log window.
 * @text Background image
 * @type file
 * @dir img/
 * @default 
 * 
 * @param BackGroundX
 * @desc Image coordinate X.
 * @text Image coordinate X
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param BackGroundY
 * @desc Image coordinate Y.
 * @text Image coordinate Y
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param DisplaySetting
 * @text Display setting
 * @default ------------------------------
 * 
 * @param NoAnimetionWait
 * @desc Display wait (frames) for items and skills without animations.
 * @text Display wait without animation
 * @type number
 * @default 30
 * @parent DisplaySetting
 * 
 * @param EndActionWait
 * @desc Wait (frame) at the end of one action.
 * @text Wait at the end of 1 action
 * @type number
 * @default 6
 * @parent DisplaySetting
 * 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc バトルログ簡易表示及び一括ポップアップ
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.1.1
 * 
 * @help
 * バトルログをアイテム名、スキル名のみ表示させるようにします。
 * このプラグインではポップアップを一括で表示させます。
 * 
 * ログ表示位置バトラー設定はログ表示位置をバトラー(ログウィンドウのみ)指定時のみ設定します。
 * 
 * ログ表示位置をバトラー(ログウィンドウのみ)
 * 敵のメモ欄
 * <BattleLogPosition:[x],[y]>
 * [x]:X座標
 * [y]:Y座標
 * 上記のタグがある場合、敵キャラウィンドウ表示位置での設定は無視されます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/6/3 Ver 1.1.1
 * 処理の修正。
 * 2023/5/9 Ver 1.1.0
 * 使用時のメッセージを表示させる機能を追加。
 * 2023/5/5 Ver 1.0.0
 * 初版
 * 
 * @param LogSetting
 * @text ログ設定
 * @default ------------------------------
 * 
 * @param LogWindowMode
 * @desc ログモードを指定します。
 * @text ログモード
 * @type select
 * @option ログメッセージ
 * @value 0
 * @option ログウィンドウ
 * @value 1
 * @default 1
 * 
 * @param LogMessageMode
 * @text ログ表示形式
 * @desc ログの表示形式を指定します。
 * @type select
 * @option スキル、アイテム名のみ
 * @value 0
 * @option 使用時のメッセージ
 * @value 1
 * @default 0
 * 
 * @param LogWindowPositionMode
 * @desc ログの表示位置を指定します。
 * @text ログ表示位置
 * @type select
 * @option 通常
 * @value 0
 * @option 横位置中央
 * @value 1
 * @option バトラー(ログウィンドウのみ)
 * @value 2
 * @default 0
 * 
 * @param WindowSetting
 * @text ウィンドウ設定
 * @default ------------------------------
 * 
 * @param WindowWidth
 * @desc ウィンドウの横幅。0でUI横幅
 * @text ウィンドウ横幅
 * @type number
 * @default 0
 * @parent WindowSetting
 * 
 * @param WindowX
 * @desc ウィンドウのX座標。
 * @text ウィンドウX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent WindowSetting
 * 
 * @param WindowY
 * @desc ウィンドウのY座標。
 * @text ウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent WindowSetting
 * 
 * @param LogWindowPositionBattlerSetting
 * @text ログ表示位置バトラー設定
 * @default ------------------------------
 * 
 * @param ActorLogWindowPosition
 * @desc アクターのウィンドウ表示位置。
 * @text アクターウィンドウ表示位置
 * @type struct<LogWindowSettings>
 * @default {"WindowX":"0","WindowY":"0"}
 * @parent LogWindowPositionBattlerSetting
 * 
 * @param EnemyLogWindowPosition
 * @desc 敵キャラのウィンドウ表示位置。
 * @text 敵キャラウィンドウ表示位置
 * @type struct<LogWindowSettings>
 * @default {"WindowX":"0","WindowY":"0"}
 * @parent LogWindowPositionBattlerSetting
 * 
 * @param WindowBackgroundSetting
 * @text ウィンドウ背景画像設定
 * @default ------------------------------
 * 
 * @param BackGroundImg
 * @desc 背景画像ファイル名を指定します。ログモードがログウィンドの時に表示されます。
 * @text 背景画像
 * @type file
 * @dir img/
 * @default 
 * 
 * @param BackGroundX
 * @desc 画像座標X。
 * @text 画像座標X
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param BackGroundY
 * @desc 画像座標Y
 * @text 画像表示開始座標Y
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param DisplaySetting
 * @text 表示設定
 * @default ------------------------------
 * 
 * @param NoAnimetionWait
 * @desc アニメーションがないアイテム、スキルの表示ウェイト(フレーム)。
 * @text アニメーション無し表示ウェイト
 * @type number
 * @default 30
 * @parent DisplaySetting
 * 
 * @param EndActionWait
 * @desc １行動終了時のウェイト(フレーム)。
 * @text １行動終了時ウェイト
 * @type number
 * @default 6
 * @parent DisplaySetting
 * 
 * 
 */
/*~struct~LogWindowSettings:
 * 
 * @param WindowX
 * @desc X coordinate of the window.
 * @text Window x coordinate
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param WindowY
 * @desc Y coordinate of the window.
 * @text Window y coordinate
 * @type number
 * @default 0
 * @min -9999
 * 
 */
/*~struct~LogWindowSettings:ja
 * 
 * @param WindowX
 * @desc ウィンドウのX座標。
 * @text ウィンドウX座標
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param WindowY
 * @desc ウィンドウのY座標。
 * @text ウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * 
 */

var Imported = Imported || {};
Imported.NUUN_BattleActionWindow = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_BattleActionWindow');
    const LogWindowMode = Number(parameters['LogWindowMode'] || 1);
    const LogWindowPositionMode = Number(parameters['LogWindowPositionMode'] || 0);
    const LogMessageMode = Number(parameters['LogMessageMode'] || 0);
    const WindowWidth = Number(parameters['WindowWidth'] || 0);
    const WindowX = Number(parameters['WindowX'] || 0);
    const WindowY = Number(parameters['WindowY'] || 0);
    const NoAnimetionWait = Number(parameters['NoAnimetionWait'] || 30);
    const EndActionWait = Number(parameters['EndActionWait'] || 6);
    const BackGroundImg = String(parameters['BackGroundImg']);
    const BackGroundX = Number(parameters['BackGroundX'] || 0);
    const BackGroundY = Number(parameters['BackGroundY'] || 0);
    const ActorLogWindowPosition = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ActorLogWindowPosition'])) : null) || {};
    const EnemyLogWindowPosition = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['EnemyLogWindowPosition'])) : null) || {};

    function LogWindowPosition(width) {
        switch (LogWindowPositionMode) {
            case 1:
                return Math.floor(Graphics.boxWidth / 2 - width / 2);
            default:
                return 0;
        }
    };

    function getBattlerPosition(battler) {
        if (battler.isActor()) {
            return ActorLogWindowPosition;
        } else {
            const meta = battler.enemy().meta.BattleLogPosition;
            if (!!meta) {
                const position = battler.enemy().meta.BattleLogPosition.split(',').map(Number);
                return {WindowX: position[0], WindowY: position[1]};
            }
            return EnemyLogWindowPosition;
        }
    };

    //Scene
    const _Scene_Base_createWindowLayer = Scene_Base.prototype.createWindowLayer;
    Scene_Base.prototype.createWindowLayer = function() {
        const className = String(this.constructor.name);
        if (className === "Scene_Battle" && !!BackGroundImg && LogWindowMode === 1) {
            this.setBattleLogWindowBackground();
        }
        _Scene_Base_createWindowLayer.call(this);
    };

    const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _Scene_Battle_createAllWindows.call(this);
        if (LogWindowMode === 1) {
            this.createBattleLogWindow();
        }
    };

    Scene_Battle.prototype.setBattleLogWindowBackground = function() {
        const bitmap = ImageManager.nuun_LoadPictures(BackGroundImg);
        const sprite = new Sprite(bitmap);
        this.addChild(sprite);
        sprite.hide();
        this._battleLogWindowBackground = sprite;
    };

    Scene_Battle.prototype.createBattleLogWindow = function() {
        const rect = this.battleLogWindowRect();
        this._battleLogWindow = new Window_NUUN_BattleLog(rect);
        this._battleLogWindow.hide();
        this.addWindow(this._battleLogWindow);
        this._logWindow.setBattleLogWindow(this._battleLogWindow);
        if (this._battleLogWindowBackground) {
            const sprite = this._battleLogWindowBackground;
            sprite.x = rect.x + BackGroundX + (Graphics.width - Graphics.boxWidth) / 2;
            sprite.y = rect.y + BackGroundY + (Graphics.height - Graphics.boxHeight) / 2;
            this._battleLogWindow.setBattleLogWindowBackground(sprite);
        }
    };

    Scene_Battle.prototype.battleLogWindowRect = function() {
        const ww = WindowWidth > 0 ? WindowWidth : Graphics.boxWidth;
        const wh = this.calcWindowHeight((LogMessageMode === 0 ? 1 : 2), true);
        const wx = WindowX + LogWindowPosition(ww);
        const wy = WindowY;
        return new Rectangle(wx, wy, ww, wh);
    };
    
    //Window
    function Window_NUUN_BattleLog() {
        this.initialize(...arguments);
    }
    
    Window_NUUN_BattleLog.prototype = Object.create(Window_Selectable.prototype);
    Window_NUUN_BattleLog.prototype.constructor = Window_NUUN_BattleLog;
    
    Window_NUUN_BattleLog.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        if (!!BackGroundImg) {
            this.opacity = 0;
        }
        this._item = null;
        this._duration = 0;
        this._battleLogMessage = [];
    };

    Window_NUUN_BattleLog.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);
        this.updateBattleLog();
    };

    Window_NUUN_BattleLog.prototype.updateBattleLog = function() {
        if (!BattleManager.isBusy()) {
            this.battleLogWindowHide(); 
        }
    };

    Window_NUUN_BattleLog.prototype.refresh = function() {
        this.contents.clear();
        if (!!this._item) {
            this.drawItem();
        }
    };

    Window_NUUN_BattleLog.prototype.drawItem = function() {
        if (LogMessageMode === 0) {
            const rect = this.itemLineRect(0);
            this.drawItemName(this._item, rect.x, rect.y, rect.width);
        } else {
            this.drawBattleLogMessage();
        }
    };

    Window_NUUN_BattleLog.prototype.drawBattleLogMessage = function() {
        this._battleLogMessage.forEach((message, i) =>{
            this.height = this.fittingHeight(this._battleLogMessage.length);
            const rect = this.itemLineRect(i);
            this.drawTextEx(this._battleLogMessage[i], rect.x, rect.y, rect.width);
        })
    };

    Window_NUUN_BattleLog.prototype.drawItemName = function(item, x, y, width) {
        if (item) {
            const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
            const textMargin = ImageManager.iconWidth + 4;
            const itemWidth = Math.max(0, width - textMargin);
            const x2 = Math.floor((width / 2) - (this.textWidth(item.name) / 2) - this.itemPadding() * 2);
            this.resetTextColor();
            this.drawIcon(item.iconIndex, x + x2, iconY);
            this.drawText(item.name, x + textMargin, y, itemWidth,'center');
        }
    };

    Window_NUUN_BattleLog.prototype.setItem = function(item, battler, battleLogMessage) {
        this._item = item;
        this._battleLogMessage = battleLogMessage;
        if (LogWindowPositionMode === 2 && !!battler) {
            const data = getBattlerPosition(battler._battler);
            const w = (Graphics.width - Graphics.boxWidth) / 2;
            const h = (Graphics.height - Graphics.boxHeight) / 2;
            try {
                this.x = battler.x - Math.floor(this.width / 2) + data.WindowX + WindowX;
                this.x = this.x.clamp(0 - w, Graphics.width - w - this.width);
                this.y = battler.y + data.WindowY + WindowY;
                this.y = this.y.clamp(0 - h, Graphics.height - h - this.height);
            } catch (error) {
                
            }
            if (!!this._battleLogBackground) {
                this._battleLogBackground.x = this.x + BackGroundX + w;
                this._battleLogBackground.y = this.y + BackGroundX + h;
            }
        }
        this.refresh();
    };

    Window_NUUN_BattleLog.prototype.setBattleLogWindowBackground = function(background) {
        this._battleLogBackground = background;
    };
    
    Window_NUUN_BattleLog.prototype.battleLogWindowShow = function() {
        this.show();
        if (this._battleLogBackground) {
            this._battleLogBackground.show()
        }
    };

    Window_NUUN_BattleLog.prototype.battleLogWindowHide = function() {
        this.hide();
        if (this._battleLogBackground) {
            this._battleLogBackground.hide()
        }
    };
    

    const _Window_BattleLog_initialize = Window_BattleLog.prototype.initialize;
    Window_BattleLog.prototype.initialize = function(rect) {
        this._battleLogMessage = [];
        _Window_BattleLog_initialize.call(this, rect);
    };

    Window_BattleLog.prototype.messageSpeed = function() {//再定義
        return 0;
    };

    const _Window_BattleLog_clear = Window_BattleLog.prototype.clear;
    Window_BattleLog.prototype.clear = function() {
        this._battleLogMessage = [];
        _Window_BattleLog_clear.call(this);
    };

    Window_BattleLog.prototype.setBattleLogWindow = function(battleLogWindow) {
        this._battleLogWindow = battleLogWindow;
    };

    const _Window_BattleLog_callNextMethod = Window_BattleLog.prototype.callNextMethod;
    Window_BattleLog.prototype.callNextMethod = function() {
        while (this._methods.length > 0) {
            if (this.updateWait()) {
                break;
            }
            _Window_BattleLog_callNextMethod.call(this);
            this.coercionPopup(this._methods[0]);
        }
    };

    Window_BattleLog.prototype.coercionPopup = function(method) {
        if (method && this.isPopup(method)) {
            const target = method.params[0];
            const sprite = this._spriteset.battlerSprites().find(sprite => sprite._battler === target);
            this.battleLogWindowPopup(target, sprite);
        }
    };

    Window_BattleLog.prototype.isPopup = function(method) {
        switch (method.name) {
            case 'popupMessage':
            case 'nuun_popupState':
                return true;
            default:
                return false;
        }
    };

    Window_BattleLog.prototype.addTextBattleLog = function(item) {
        this._battleLogItem = item;
        this.refresh();
    };

    Window_BattleLog.prototype.refresh = function() {//再定義
        if (LogWindowMode === 0) {
            this.drawBackground();
            this.contents.clear();
            if (LogMessageMode === 0) {
                if (this._lines.length > 0 && this._battleLogItem) {
                    this.drawLineText(0)
                }
            } else {
                if (this._lines.length > 0 && this._battleLogMessage) {
                    this._battleLogMessage.forEach((message, i) => this.drawLineText(i))
                }
            }
        } else {
            this.contents.clear();
        }
    };

    Window_BattleLog.prototype.drawLineText = function(index) {//再定義
        const rect = this.lineRect(index);
        const width = WindowWidth > 0 ? WindowWidth : rect.width;
        const x = WindowX + LogWindowPosition(width) + rect.x;
        this.contents.clearRect(x, WindowY + rect.y, width, rect.height);
        if (LogMessageMode === 0) {
            Window_NUUN_BattleLog.prototype.drawItemName.call(this, this._battleLogItem, x, WindowY, width);
        } else {
            if (this._battleLogMessage[index]) {
                this.drawTextEx(this._battleLogMessage[index], rect.x, rect.y, rect.width);
            }
        }
    };

    Window_BattleLog.prototype.backRect = function() {//再定義
        const height = this.numLines() * this.itemHeight();
        const width = WindowWidth > 0 ? WindowWidth : this.innerWidth;
        return new Rectangle(WindowX + LogWindowPosition(width), WindowY, width, height);
    };

    const _Window_BattleLog_numLines = Window_BattleLog.prototype.numLines;
    Window_BattleLog.prototype.numLines = function() {
        return LogMessageMode === 0 ? Math.min(_Window_BattleLog_numLines.call(this), 1) : this._battleLogMessage.length;
    };

    const _Window_BattleLog_displayActionResults = Window_BattleLog.prototype.displayActionResults;
    Window_BattleLog.prototype.displayActionResults = function(subject, target) {
        _Window_BattleLog_displayActionResults.call(this, subject, target);
        
    };
    
    const _Window_BattleLog_startAction = Window_BattleLog.prototype.startAction;
    Window_BattleLog.prototype.startAction = function(subject, action, targets) {
        _Window_BattleLog_startAction.call(this, subject, action, targets);
        const item = action.item();
        if (LogWindowMode === 1) {
            this.push("showBattleLogWindow", item, this._spriteset.battlerSprites().find(sprite => sprite._battler === subject));
        }
        this.push("setBattleActionWindowWait", item);
    };

    const _Window_BattleLog_endAction = Window_BattleLog.prototype.endAction;
    Window_BattleLog.prototype.endAction = function(subject) {
        _Window_BattleLog_endAction.call(this, subject);
        if (LogWindowMode === 1) {
            this.push("hideBattleLogWindow");
        }
        this.push("setEndBattleActionWindowWait");
    };

    const _Window_BattleLog_displayAction = Window_BattleLog.prototype.displayAction;
    Window_BattleLog.prototype.displayAction = function(subject, item) {
        this.push("setBattleLogMessage", subject, item);
        _Window_BattleLog_displayAction.call(this, subject, item);
        this.push("addTextBattleLog", item);
    };

    const _Window_BattleLog_displayDamage = Window_BattleLog.prototype.displayDamage;
    Window_BattleLog.prototype.displayDamage = function(target) {
        if (target.result().used) {
            this.push("battleLogWindowPopup", target, this._spriteset.battlerSprites().find(sprite => sprite._battler === target));
        }
        _Window_BattleLog_displayDamage.call(this, target);
    };

    Window_BattleLog.prototype.setBattleLogMessage = function(subject, item) {
        this._battleLogMessage = [];
        if (DataManager.isSkill(item)) {
            this.addBattleLogMessage(item.message1, subject, item);
            this.addBattleLogMessage(item.message2, subject, item);
        } else {
            this.addBattleLogMessage(TextManager.useItem, subject, item);
        }
    };

    Window_BattleLog.prototype.addBattleLogMessage = function(fmt, subject, item) {
        if (fmt) {
            const message = fmt.format(subject.name(), item.name);
            this._battleLogMessage.push(message);
        }
    };

    Window_BattleLog.prototype.showBattleLogWindow = function(item, battler) {
        if (!!item && !item.meta.NoBattleLog) {
            this._battleLogWindow.setItem(item, battler, this._battleLogMessage);
            this._battleLogWindow.battleLogWindowShow();
        }
    };

    Window_BattleLog.prototype.hideBattleLogWindow = function() {
        this._battleLogWindow.battleLogWindowHide();
    };

    Window_BattleLog.prototype.setBattleActionWindowWait = function(item) {
        if (!!item && item.animationId === 0 || !!$dataAnimations[item.animationId]) {
            this.setBattleActionWindowWait();
        }
    };

    Window_BattleLog.prototype.battleLogWindowPopup = function(target, sprite) {
        if (sprite) {
            sprite.updateDamagePopup();//ここで強制的にポップアップ
        }
    };

    Window_BattleLog.prototype.waitForEffect = function() {//再定義
        
    };

    Window_BattleLog.prototype.setBattleActionWindowWait = function() {
        this._waitCount = NoAnimetionWait;
    };

    Window_BattleLog.prototype.setEndBattleActionWindowWait = function() {
        this._waitCount = EndActionWait;
    };

})();