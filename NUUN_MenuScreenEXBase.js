/*:-----------------------------------------------------------------------------------
 * NUUN_MenuScreenEXBase.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Menu screen base
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_MenuScreen_default
 * @orderAfter NUUN_MenuScreen
 * @orderAfter NUUN_MenuScreen2
 * @version 2.1.5
 * 
 * @help
 * A base plugin for processing menu screens.
 * 
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 1/7/2024 Ver.2.1.5
 * Fixed an issue where the background image would be displayed within the UI even if Match background image to UI was turned off.
 * Compatible with background plugins from other authors.
 * 1/6/2024 Ver.2.1.4
 * Fixed an issue where an error would occur when setting additional ability values and special ability values.
 * 1/3/2024 Ver.2.1.3
 * Fixed a problem where the method name of the info window was not applied.
 * 8/8/2023 Ver.2.1.2
 * Fixed an issue where changing the font color for nicknames and occupations was not working.
 * 8/8/2023 Ver.2.1.1
 * Added a function that does not make the sub member's actor image (face graphic) opaque.
 * 7/20/2023 Ver.2.1.0
 * Added a function that can be specified by occupation ID instead of actor ID in actor image setting.
 * Fixed an issue where the actor status line was not working.
 * 6/14/2023 Ver.2.0.20
 * Fixed face graphics processing.
 * 6/2/2023 Ver.2.0.19
 * Fixed an issue that caused an error when displaying nickname.
 * 5/22/2023 Ver.2.0.18
 * Conflict support with face shift of vanguard and rearguard plug-ins.
 * 5/14/2023 Ver.2.0.17
 * Correction of processing related to skill status screen display customization.
 * Modified to apply item names to gauge labels.
 * 5/8/2023 Ver.2.0.16
 * Added a function that allows you to specify conditions for the actor status image.
 * 5/7/2023 Ver.2.0.15
 * Fixed an issue where setting an image to an actor status would cause an error.
 * 5/3/2023 Ver.2.0.14
 * Fixed so that the color change of the gauge can be applied to HP, MP, and TP.
 * 5/2/2023 Ver.2.0.13
 * Fixed an issue where gauge values other than experience were not displayed.
 * 4/29/2023 Ver.2.0.12
 * Fixed an issue where experience values were not displaying correctly.
 * Fixed the problem that the numerical value was displayed even when the display of the experience value was not specified.
 * 4/28/2023 Ver.2.0.11
 * Added a function to change the font. A separate plug-in is required to change the font.
 * 4/22/2023 Ver.2.0.10
 * Fixed the problem that the original parameter of the info window is not displayed.
 * 4/13/2023 Ver.2.0.9
 * Fixed display of experience points at max level.
 * 4/9/2023 Ver.2.0.8
 * Fixed so that the info window class designation in other creator's plug-ins can be applied.
 * 4/1/2023 Ver.2.0.7
 * Added processing related to limit gauge display.
 * 12/1/2022 Ver.2.0.6
 * Fixed an issue where setting an actor front background image would cause an error.
 * 12/1/2022 Ver.2.0.5
 * Fixed to display at the height of the main area when the number of lines is set to 0 in window height mode.
 * 11/27/2022 Ver.2.0.4
 * Fixed an issue that caused an error when menu command display mode was set to left.
 * 11/26/2022 Ver.2.0.3
 * Fixed an issue where an error would occur if the actor image was set to Img with "ActorPictureEXApp" turned on.
 * Fixed the problem that APNG images remain displayed when scrolling.
 * 11/26/2022 Ver.2.0.2
 * Minor fix.
 * 11/26/2022 Ver.2.0.1
 * Fixed an issue where the window for selecting actors from items and skills was displayed in its original size and the status display was disturbed.
 * 11/25/2022 Ver.2.0.0
 * Separation of menu screen setting and processing.
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc メニュー画面ベース
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_MenuScreenEX
 * @version 2.1.5
 * 
 * @help
 * メニュー画面を処理するためのベースプラグインです。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/1/7 Ver.2.1.5
 * 背景画像をUIに合わせるをOFFにしても背景画像がUI内に表示されてしまう問題を修正。
 * 他作者様背景プラグインの競合対応。
 * 2024/1/6 Ver.2.1.4
 * 追加能力値、特殊能力値を設定するとエラーが出る問題を修正。
 * 2024/1/3 Ver.2.1.3
 * インフォウィンドウのメソッド名が適用されていなかった箇所があったため修正。
 * 2023/8/8 Ver.2.1.2
 * 二つ名と職業の文字色変更が機能していなかった問題を修正。
 * 2023/8/8 Ver.2.1.1
 * 控えメンバーのアクター画像(顔グラ)を不透明にしない機能を追加。
 * 2023/7/20 Ver.2.1.0
 * アクター画像設定にアクターIDではなく職業IDで指定できる機能を追加。
 * アクターステータスのラインが機能していなかった問題を修正。
 * 2023/6/14 Ver.2.0.20
 * 顔グラの処理を修正。
 * 2023/6/2 Ver.2.0.19
 * 二つ名を表示したときにエラーが出る問題を修正。
 * 2023/5/22 Ver.2.0.18
 * 前衛後衛プラグインのフェイスシフトとの競合対応。
 * 2023/5/14 Ver.2.0.17
 * スキルステータス画面表示カスタマイズに関する処理の修正。
 * 項目名称をゲージのラベルにも適用するように修正。
 * 2023/5/8 Ver.2.0.16
 * アクターステータスの画像に条件を指定できる機能を追加。
 * 2023/5/7 Ver.2.0.15
 * アクターステータスに画像を設定するとエラーが出る問題を修正。
 * 2023/5/3 Ver.2.0.14
 * ゲージの色変更をHP、MP、TPにも適用できるように修正。
 * 2023/5/2 Ver.2.0.13
 * 経験値以外のゲージの数値が表示されていなかった問題を修正。
 * 2023/4/29 Ver.2.0.12
 * 経験値数値が正常に表示されていなかった問題を修正。
 * 経験値の表示なし指定時でも、数値が表示されていた問題を修正。
 * 2023/4/28 Ver.2.0.11
 * フォントを変更できる機能を追加。別途フォントを変更できるプラグインが必要です。
 * 2023/4/22 Ver.2.0.10
 * インフォウィンドウのオリジナルパラメータが表示されない問題を修正。
 * 2023/4/13 Ver.2.0.9
 * 最大レベルでの経験値の表示を修正しました。
 * 2023/4/9 Ver.2.0.8
 * 他制作者プラグインでのインフォウィンドウのクラス指定を適用できるように修正。
 * 2023/4/1 Ver.2.0.7
 * リミットゲージ表示に関する処理の追加。
 * 2023/1/7 Ver.2.0.6
 * アクター前面背景画像を設定するとエラーが出る問題を修正。
 * 2022/12/1 Ver.2.0.5
 * ウィンドウ高さモードで行数を0に設定している場合は、メインエリアの高さで表示するように修正。
 * 2022/11/27 Ver.2.0.4
 * コマンドモードを左側に設定したときにエラーが出る問題を修正。
 * 2022/11/26 Ver.2.0.3
 * 立ち絵、顔グラEX適用をONにしてアクター画像をImgに設定した場合、エラーが出る問題を修正。
 * スクロールした際にAPNG画像が表示されたままになってしまう問題を修正。
 * 2022/11/26 Ver.2.0.2
 * 微修正。
 * 2022/11/26 Ver.2.0.1
 * アイテム、スキルからアクターを選択するウィンドウが元のサイズで表示され、ステータスの表示が乱れる問題を修正。
 * 2022/11/25 Ver.2.0.0
 * メニュー画面の処理を統合し、設定用のみ分割。
 * 
 */

var Imported = Imported || {};
Imported.NUUN_MenuScreenEXBase = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_MenuScreenEXBase');
    const params = NuunManager.getMenuStatusParams();

    let maxGaugeWidth = 128;
    let menuTextMode = null;
    let menuAlign = null;
    let _commandName = '';
    let _commandText = '';

    function getPluginName() {
        if (Imported.NUUN_MenuScreen_default) {
            return "NUUN_MenuScreen_default";
        } else if (Imported.NUUN_MenuScreen) {
            return "NUUN_MenuScreen";
        } else if (Imported.NUUN_MenuScreen_2) {
            return "NUUN_MenuScreen_2";
        } else {
            return '';
        }
    };


    const pluginName = getPluginName();
    PluginManager.registerCommand(getPluginName(), 'ChangeBackgroundId', args => {
        $gameSystem.menuBackgroundId = Number(args.backgroundId);
    });
    
    Scene_Menu.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createCommandWindow();
        this.createStatusWindow();
        this.createInfoWindow();
    };

    Scene_Menu.prototype.isRightInputMode = function() {
        return params.MenuCommandPosition === 'right';
    };

    const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _Scene_Menu_createCommandWindow.call(this);
        _commandName = null;
        if (params.CommandHeightMode) {
            this._commandWindow.maxItemsHeight();
        }
        if (!params.CommandWindowVisible) {
            this._commandWindow.opacity = 0;
        }
    };

    Scene_Menu.prototype.createInfoWindow = function() {
        const list = params.MenuInfoWindowSetting;
        list.forEach((data, i) => {
            if (data.ListDateSetting > 0) {
                const method = '_infoSideMenuWindow'+ !!data.MethodName ? data.MethodName : [i];
                const pageMethod = 'PageList' + data.ListDateSetting;
                const rect = this.infoWindowRect(data);
                const window = new Window_InfoMenu(rect, params.infoContents[pageMethod], data.MethodName);
                this[method] = window;
                this.addWindow(window);
                window.setup(data.InfoCols, data.InfoFontSize);
                if (!data.WindowVisible) {
                    window.opacity = 0;
                }
            }
        });
    };

    const _Scene_Menu_createStatusWindow = Scene_Menu.prototype.createStatusWindow;
    Scene_Menu.prototype.createStatusWindow = function() {
        _Scene_Menu_createStatusWindow.call(this);
        if (!params.WindowVisible) {
            this._statusWindow.opacity = 0;
        }
    };

    Scene_Menu.prototype.infoWindowRect = function(data) {
        const wx = data.X_Position + (params.WindowUiIgnore ? (Graphics.boxWidth - Graphics.width) / 2 : 0);
        const ww = params.WindowUiIgnore ? (data.Width > 0 ? data.Width : Graphics.width) : (Math.min(data.Width > 0 ? data.Width : Graphics.boxWidth, Graphics.boxWidth - wx));
        const wy = (params.WindowUiIgnore ? 0 : this.nuun_menuHelpAreaHeight()) + data.Y_Position;
        const wh = data.InfoRows > 0 ? this.nuun_infoAreaHeight(data.InfoRows) : data.Height;
        return new Rectangle(wx, wy, ww, Math.min(wh, (params.WindowUiIgnore ? Graphics.height : Graphics.boxHeight) - wy));
    };

    Scene_Menu.prototype.commandWindowRect = function() {
        const wx = this.nuun_mainCommandX();
        const wy = this.nuun_mainCommandY();
        const ww = (Math.min(this.nuun_mainCommandWidth(), (params.WindowUiIgnore ? Graphics.width : Graphics.boxWidth) - wx));
        const wh = this.nuun_mainCommandHeight();
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Menu.prototype.statusWindowRect = function() {
        let rect = [];
        if (params.ArrangementMode === 0) {
            rect = this.statusWindowArrangementModeRect();
        } else {
            rect = this.statusWindowDefaultModeRect();
        }
        return new Rectangle(rect[0], rect[1], rect[2], rect[3]);
    };

    Scene_Menu.prototype.statusWindowDefaultModeRect = function() {
        const width = (params.MenuStatusWidth > 0 ? params.MenuStatusWidth : (params.WindowUiIgnore ? Graphics.width : Graphics.boxWidth) - (!isBesideMenuCommand() ? this.nuun_mainCommandWidth() : 0));
        const height = params.MenuStatusHeight > 0 ? params.MenuStatusHeight : (params.WindowUiIgnore ? Graphics.height : (Graphics.boxHeight - this.nuun_menuHelpAreaHeight()));
        const wx = (params.MenuCommandPosition === 'left' ? this.nuun_mainCommandWidth() : 0) + (params.WindowUiIgnore ? (Graphics.boxWidth - Graphics.width) / 2 : 0) + params.MenuStatusX;
        const ww = Math.min(width, (params.WindowUiIgnore ? Graphics.width : Graphics.boxWidth) - wx);
        const wh = Math.min(height, (isBesideMenuCommand() ? (params.WindowUiIgnore ? Graphics.height - this.nuun_mainCommandHeight() : Graphics.boxHeight - this.nuun_menuHelpAreaHeight() - this.nuun_mainCommandHeight()) : (params.WindowUiIgnore ? Graphics.height : Graphics.boxHeight)));
        const wy = (isBesideMenuCommand() ? this._commandWindow.y + (params.MenuCommandPosition === 'under' ? -wh : this.nuun_mainCommandHeight()) : (params.WindowUiIgnore ? (Graphics.boxHeight - Graphics.height) / 2 : this.nuun_menuHelpAreaHeight())) + params.MenuStatusY;
        return [wx, wy, ww, Math.min(wh, (params.WindowUiIgnore ? Graphics.height : Graphics.boxHeight) - wy)];
    };

    Scene_Menu.prototype.statusWindowArrangementModeRect = function() {
        const width = (params.MenuStatusWidth > 0 ? params.MenuStatusWidth : (params.WindowUiIgnore ? Graphics.width : Graphics.boxWidth));
        const height = params.MenuStatusHeight > 0 ? params.MenuStatusHeight : (params.WindowUiIgnore ? Graphics.height : (Graphics.boxHeight - this.nuun_menuHelpAreaHeight()));
        const wx = params.MenuStatusX + (params.WindowUiIgnore ? (Graphics.boxWidth - Graphics.width) / 2 : 0);
        const ww = Math.min(width, (params.WindowUiIgnore ? Graphics.width : Graphics.boxWidth) - wx);
        const wy = (params.WindowUiIgnore ? (Graphics.boxHeight - Graphics.height) / 2 : this.nuun_menuHelpAreaHeight()) + params.MenuStatusY;
        const wh = Math.min(height, (params.WindowUiIgnore ? Graphics.height : Graphics.boxHeight) - wy);
        return [wx, wy, ww, wh];
    };

    function isBesideMenuCommand() {
        return params.MenuCommandPosition === 'under' || params.MenuCommandPosition === 'top';
    };

    Scene_MenuBase.prototype.nuun_mainCommandX = function() {
        switch (params.MenuCommandPosition) {
            case 'free':
            case 'left':
            case 'top':
            case 'under':
                return (params.WindowUiIgnore ? (Graphics.boxWidth - Graphics.width) / 2 : 0) + params.MenuCommandX;
            case 'right':
                return (params.WindowUiIgnore ? Graphics.width + (Graphics.boxWidth - Graphics.width) / 2 : Graphics.boxWidth) - this.nuun_mainCommandWidth() + params.MenuCommandX;
        }
    };

    Scene_MenuBase.prototype.nuun_mainCommandY = function() {
        switch (params.MenuCommandPosition) {
            case 'free':
            case 'left':
            case 'top':
            case 'right':
                return (params.WindowUiIgnore ? (Graphics.boxHeight - Graphics.height) / 2 : this.nuun_menuHelpAreaHeight()) + params.MenuCommandY;
            case 'under':
                return (params.WindowUiIgnore ? Graphics.height + ((Graphics.boxHeight - Graphics.height) / 2) : Graphics.boxHeight) - this.nuun_mainCommandHeight() + params.MenuCommandY;
        }
    };

    Scene_MenuBase.prototype.nuun_mainCommandWidth = function() {
        return params.MenuCommandWidth > 0 ? params.MenuCommandWidth : (params.MenuCommandCols > 1 ? (params.WindowUiIgnore ? Graphics.width : Graphics.boxWidth) : 240);
    };

    Scene_MenuBase.prototype.nuun_mainCommandHeight = function() {
        return params.CommandHeightMode ? (params.MenuCommandRows > 0 ? this.nuun_mainCommandAreaHeight(params.MenuCommandRows) : this.mainAreaHeight()) : (params.MenuCommandHeight > 0 ? params.MenuCommandHeight : this.mainAreaHeight());
    };

    Scene_MenuBase.prototype.nuun_mainCommandAreaHeight = function(rows) {
        return this.calcWindowHeight(rows, true);
    };

    Scene_MenuBase.prototype.nuun_infoAreaHeight = function(rows) {
        return this.calcWindowHeight(rows, false);
    };
    
    Scene_MenuBase.prototype.nuun_menuHelpAreaHeight = function() {
        return this.mainAreaTop();
    };

    const _Scene_Menu_createBackground = Scene_Menu.prototype.createBackground;
    Scene_Menu.prototype.createBackground = function() {
        Scene_MenuBase.prototype.createBackground.call(this);
        if (!$gameSystem.menuBackgroundId) {
            $gameSystem.menuBackgroundId = 0;
        }
        const data = $dataMap;
        const backgroundId = ($gameSystem.menuBackgroundId > 0 ? $gameSystem.menuBackgroundId : ($dataMap && $dataMap.meta.MenuBackgroundId ? Number(data.meta.MenuBackgroundId) : $gameSystem.menuBackgroundId)) || 1;
        const img = params.BackGroundImges ? params.BackGroundImges[backgroundId - 1] : null;
        if (img) {
            const sprite = new Sprite();
            sprite.bitmap = ImageManager.nuun_LoadPictures(img);
            this.addChild(sprite);
            if (sprite.bitmap && !sprite.bitmap.isReady()) {
                sprite.bitmap.addLoadListener(this.setBackGround.bind(this, sprite, params.BackUiWidth1));
            } else {
                this.setBackGround(sprite, params.BackUiWidth1);
            }
        }
        if (params.BackGroundImg) {
            const sprite = new Sprite();
            sprite.bitmap = ImageManager.nuun_LoadPictures(params.BackGroundImg);
            this.addChild(sprite);
            if (sprite.bitmap && !sprite.bitmap.isReady()) {
                sprite.bitmap.addLoadListener(this.setBackGround.bind(this, sprite, params.BackUiWidth));
            } else {
                this.setBackGround(sprite, params.BackUiWidth);
            }
        }
    };

    Scene_Menu.prototype.setBackGround = function(sprite, mode) {
        if (mode) {
            sprite.x = (Graphics.width - (Graphics.boxWidth + 8)) / 2;
            sprite.y = (Graphics.height - (Graphics.boxHeight + 8)) / 2;
            sprite.scale.x = (Graphics.boxWidth + 8 !== sprite.bitmap.width ? (Graphics.boxWidth + 8) / sprite.bitmap.width : 1);
            sprite.scale.y = (Graphics.boxHeight + 8 !== sprite.bitmap.height ? (Graphics.boxHeight + 8) / sprite.bitmap.height : 1);
        } else {
            sprite.scale.x = (Graphics.width !== sprite.bitmap.width ? Graphics.width / sprite.bitmap.width : 1);
            sprite.scale.y = (Graphics.height !== sprite.bitmap.height ? Graphics.height / sprite.bitmap.height : 1);
        }
    };

    const _Scene_Menu_update = Scene_Menu.prototype.update;
    Scene_Menu.prototype.update = function() {
	    _Scene_Menu_update.call(this);
        const commandName = this._commandWindow.currentData().name;
        if (_commandName !== commandName) {
            _commandName = commandName;
            const find = params.HelpList.find(data => data.HelpCommandName === commandName);
            _commandText = find && find.HelpCommandText ? find.HelpCommandText : "";
        }
    };

    Scene_ItemBase.prototype.actorWindowRect = function() {
        let rect = [];
        if (params.ArrangementMode === 0) {
            rect = this.statusWindowArrangementModeRect();
        } else {
            rect = this.statusWindowDefaultModeRect();
        }
        return new Rectangle(rect[0], rect[1], rect[2], rect[3]);
    };

    Scene_ItemBase.prototype.statusWindowDefaultModeRect = function() {
        const width = (params.MenuStatusWidth > 0 ? params.MenuStatusWidth : (params.WindowUiIgnore ? Graphics.width : Graphics.boxWidth) - (!isBesideMenuCommand() ? this.nuun_mainCommandWidth() : 0));
        const height = params.MenuStatusHeight > 0 ? params.MenuStatusHeight : (params.WindowUiIgnore ? Graphics.height : (Graphics.boxHeight - this.nuun_menuHelpAreaHeight()));
        const wx = (params.MenuCommandPosition === 'left' ? this.nuun_mainCommandWidth() : 0) + (params.WindowUiIgnore ? (Graphics.boxWidth - Graphics.width) / 2 : 0) + params.MenuStatusX;
        const ww = Math.min(width, (params.WindowUiIgnore ? Graphics.width : Graphics.boxWidth) - wx);
        const wh = Math.min(height, (isBesideMenuCommand() ? (params.WindowUiIgnore ? Graphics.height - this.nuun_mainCommandHeight() : Graphics.boxHeight - this.nuun_menuHelpAreaHeight() - this.nuun_mainCommandHeight()) : (params.WindowUiIgnore ? Graphics.height : Graphics.boxHeight)));
        const wy = (isBesideMenuCommand() ? this.nuun_mainCommandY() + (params.MenuCommandPosition === 'under' ? -wh : this.nuun_mainCommandHeight()) : (params.WindowUiIgnore ? (Graphics.boxHeight - Graphics.height) / 2 : this.nuun_menuHelpAreaHeight())) + params.MenuStatusY;
        return [wx, wy, ww, Math.min(wh, (params.WindowUiIgnore ? Graphics.height : Graphics.boxHeight) - wy)];
    };

    Scene_ItemBase.prototype.statusWindowArrangementModeRect = function() {
        const width = (params.MenuStatusWidth > 0 ? params.MenuStatusWidth : (params.WindowUiIgnore ? Graphics.width : Graphics.boxWidth));
        const height = params.MenuStatusHeight > 0 ? params.MenuStatusHeight : (params.WindowUiIgnore ? Graphics.height : (Graphics.boxHeight - this.nuun_menuHelpAreaHeight()));
        const wx = params.MenuStatusX + (params.WindowUiIgnore ? (Graphics.boxWidth - Graphics.width) / 2 : 0);
        const ww = Math.min(width, (params.WindowUiIgnore ? Graphics.width : Graphics.boxWidth) - wx);
        const wy = (params.WindowUiIgnore ? (Graphics.boxHeight - Graphics.height) / 2 : this.nuun_menuHelpAreaHeight()) + params.MenuStatusY;
        const wh = Math.min(height, (params.WindowUiIgnore ? Graphics.height : Graphics.boxHeight) - wy);
        return [wx, wy, ww, wh];
    };

    const _Window_MenuCommand_initialize = Window_MenuCommand.prototype.initialize;
    Window_MenuCommand.prototype.initialize = function(rect) {
        _Window_MenuCommand_initialize.call(this, rect);
        this._homeHeight = this.height;
    };

    Window_MenuCommand.prototype.maxItemsHeight = function() {
        const maxItems = Math.max(1, this.maxItems());
        this.height = Math.min(this.fittingHeight(maxItems), this._homeHeight);
    };

    Window_MenuCommand.prototype.maxCols = function() {
        return params.MenuCommandCols;
    };


    const _Window_Selectable_paint =Window_Selectable.prototype.paint;
    Window_MenuStatus.prototype.paint = function() {
        if (String(this.constructor.name) === 'Window_MenuStatus' && this.contents && !!this._actorsBitmap) {
            for (const sprite of this._actorsBitmap) {
                sprite.resetMenuActorImg();
            }
        }
        _Window_Selectable_paint.call(this);
    };


    const _Window_MenuStatus_initialize = Window_MenuStatus.prototype.initialize;
    Window_MenuStatus.prototype.initialize = function(rect) {
        this._actorsBitmap = [];
        this.language_Jp = $gameSystem.isJapanese();
        _Window_MenuStatus_initialize.call(this, rect);
        this.nuun_loadImages();
    };

    Window_MenuStatus.prototype.nuun_loadImages = function() {
        for (const actor of $gameParty.allMembers()) {
            let data = null;
            if (this.isActorPictureEXApp()) {
                actor.resetImgId();
                data = this.getActorImgData(actor);
                actor.loadActorFace();
                actor.loadActorGraphic();
            } else {
                data = this.getActorImgData(actor);
                ImageManager.loadFace(data.FaceImg);
                ImageManager.nuun_LoadPictures(data.ActorImg);
            }
            if (data && data.ActorBackImg) {
                ImageManager.nuun_LoadPictures(data.ActorBackImg);
            }
            if (data && data.ActorFrontImg) {
                ImageManager.nuun_LoadPictures(data.ActorFrontImg);
            }
        }
    };

    Window_MenuStatus.prototype.isActorPictureEXApp = function() {
        return Imported.NUUN_ActorPicture && params.ActorPictureEXApp;
    };

    Window_MenuStatus.prototype.numVisibleRows = function() {
        return params.MenuRows;
    };

    Window_MenuStatus.prototype.maxCols = function() {
        return params.MenuCols;
    };

    Window_StatusBase.prototype.nuunMenu_maxContentsCols = function() {
        return 1;
    };

    Window_StatusBase.prototype.nuunMenu_itemContentsWidth = function(width) {
        return Math.floor(width / this.nuunMenu_maxContentsCols()) - this.colSpacing() - 4;
    };

    Window_StatusBase.prototype.nuunMenu_systemWidth = function(swidth, width) {
        return swidth > 0 ? swidth : Math.floor(width / 3);
    };

    Window_MenuStatus.prototype.isSubMemberOpacity = function(actor) {
        return params.SubMemberOpacity ? actor.isBattleMember() : true;
    };

    Window_MenuStatus.prototype.drawItemBackground = function(index) {
        const actor = this.actor(index);
        const data = this.nuunMenu_getActorData(actor);
        if (data && data.ActorBackImg) {
            const bitmap = ImageManager.nuun_LoadPictures(data.ActorBackImg);
            if (bitmap && !bitmap.isReady()) {
                bitmap.addLoadListener(this.drawActorBack.bind(this, bitmap, index));
            } else {
                this.drawActorBack(bitmap, index);
            }
        } else {
            Window_Selectable.prototype.drawItemBackground.call(this, index);
        }
    };

    Window_MenuStatus.prototype.drawActorBack = function(bitmap, index) {
        const rect = this.itemRect(index);
        try {
            this.contentsBack.nuun_contentsBackBlt(bitmap, 0, 0, rect.width, rect.height, rect.x + 1, rect.y + 1, rect.width - 2, rect.height - 2, 100, true);
            //this.contentsBack.blt(bitmap, 0, 0, rect.width, rect.height, rect.x + 1, rect.y + 1, rect.width - 2, rect.height - 2);
        } catch (e) {
            const log = $gameSystem.isJapanese() ? 'NUUN_BaseがVer.1.6.2以降ではありません。' : "'NUUN_Base' is not Ver.1.6.2 or later.";
            throw ["LoadError", log];
        }
    };

    Window_MenuStatus.prototype.createApngSprite = function(actor, index, data, rect) {
        if (!this._actorsBitmap[index]) {
            const rect = this.itemRect(index);
            const sprite = new Sprite_MenuActorImg();
            this._contentsBackSprite.addChild(sprite);
            this._actorsBitmap[index] = sprite;
        }
        const sprite = this._actorsBitmap[index];
        sprite.setup(actor, data);
        sprite.move(rect.x + 50, rect.y, rect.width, rect.height);
    };

    Window_MenuStatus.prototype.addChildToBack2 = function(child) {
        return this.contents.addChild(child);
    };

    Window_MenuStatus.prototype.drawItemImage = function(index) {
        const actor = this.actor(index);
        const rect = this.itemRect(index);
        let bitmap = null;
        const data = this.nuunMenu_getActorData(actor);
        if (data && data.GraphicMode !== 'none') {
            if (data.GraphicMode === 'imgApng') {
                this.createApngSprite(actor, index, data, rect);
            } else if (this.isActorPictureEXApp()) {
                bitmap = data.GraphicMode === 'face' ? actor.loadActorFace() : actor.loadActorGraphic();
            } else {
                bitmap = data.GraphicMode === 'face' ? ImageManager.loadFace(data.FaceImg) : ImageManager.nuun_LoadPictures(data.ActorImg);
            }
        }
        if (bitmap) {
            bitmap.addLoadListener(function() {
                this.drawActorGraphic(data, bitmap, rect.x, rect.y, rect.width, rect.height, actor);
            }.bind(this));
        } else {
            this.drawActorFront(data, rect.x, rect.y, rect.width, rect.height);
        }
        
    };

    Window_MenuStatus.prototype.drawActorGraphic = function(data, bitmap, x, y, width, height, actor) {
        this.changePaintOpacity(this.isSubMemberOpacity(actor));
        if (data.GraphicMode === 'face') {
            this.nuunMenu_contentsDrawActorFace(actor, data, x, y, width, height);
        } else {
            this.nuunMenu_contentsDrawActorGraphic(actor, data, bitmap, x, y, width, height);
        }
        this.changePaintOpacity(true);
        this.drawActorFront(data, x, y, width, height);
    };

    Window_MenuStatus.prototype.drawActorFront = function(data, x, y, width, height) {
        const frontBitmapImg = data ? data.ActorFrontImg : null;
        if (frontBitmapImg) {
            const frontBitmap = ImageManager.nuun_LoadPictures(frontBitmapImg);
            frontBitmap.addLoadListener(function() {
                this.drawContentsActorFront(frontBitmap, x, y, width, height);
            }.bind(this));
        }
    };

    Window_StatusBase.prototype.nuunMenu_contentsDrawActorFace = function(actor, data, x, y, width, height) {
        width = Math.min(width, ImageManager.faceWidth);
        height = height - 2;
        this.nuunMenu_drawActorFace(actor, x, y, width, height, data);
    };

    Window_MenuStatus.prototype.drawContentsActorFront = function(bitmap, x, y, width, height) {
        this.contents.blt(bitmap, 0, 0, width, height, x, y);
    };

    Window_MenuStatus.prototype.condActorImg = function(data, actor) {
        if (data.ClassId && data.ClassId > 0 && actor._classId === data.ClassId) {
            return true;
        } else if (data.actorId === actor.actorId()) {
            return true;
        }
        return false;
    };

    Window_MenuStatus.prototype.getActorImgData = function(actor) {
        const list = params.ActorsImgList;
        const find = list.find(data => this.condActorImg(data, actor));
        if (!find) {
        return {
            Actor_X: 0, 
            Actor_Y: 0, 
            Img_SX: 0, 
            Img_SY: 0, 
            Actor_Scale: 100, 
            ActorBackImg: null,
            ActorFrontImg: null, 
            GraphicMode: params.GraphicMode, 
            FaceIndex : -1,
            ActorImg: null,
            FaceImg: actor.faceName()
        };
        } if (find.GraphicMode === 'default' || !find.GraphicMode) {
            find.GraphicMode = params.GraphicMode;
        }
        return find;
    };

    Window_MenuStatus.prototype.battlreActorPicture = function(actor) {
        const actors = params.ActorPictureData;
        const find = actors.find(a => a.actorId === actor.actorId());
        if (!find) {
        return {
            Actor_X: 0, 
            Actor_Y: 0, 
            Img_SX: 0, 
            Img_SY: 0, 
            Actor_Scale: 100, 
            ActorBackImg: null,
            ActorFrontImg: null, 
            GraphicMode: params.GraphicMode, 
            FaceIndex : -1,
            ActorImg: null,
            FaceImg: actor.faceName()
        };
        } else if (find.GraphicMode === 'default' || !find.GraphicMode) {
            find.GraphicMode = params.GraphicMode;
        }
        return find;
    };

    Window_StatusBase.prototype.nuunMenu_getMenuGraphicMode = function() {
        return params.GraphicMode;
    };

    Window_StatusBase.prototype.nuunMenu_getActorData = function(actor) {
        return this.isActorPictureEXApp() ? this.battlreActorPicture(actor) : this.getActorImgData(actor);
    };

    Window_StatusBase.prototype.nuunMenu_isMenuActorData = function() {
        return this.isActorPictureEXApp() ? params.ActorPictureData : params.ActorsImgList;
    };

    Window_StatusBase.prototype.nuunMenu_loadContentsImg = function(data) {
        return ImageManager.nuun_LoadPictures(data.ImgData);
    };

    Window_MenuStatus.prototype.getStatusList = function() {
        return params.StatusList;
    };

    Window_MenuStatus.prototype.drawItemStatus = function(index) {
        this.nuunMenu_drawItemContents(index);
    };

    Window_MenuStatus.prototype.getDecimalMode = function() {
        return params.DecimalMode;
    };

    Window_StatusBase.prototype.nuunMenu_drawItemContents = function(index) {
        let bitmap = null;
        let loadBitmap = null;
        const list = this.getStatusList();
        for (const data of list) {
            switch (data.DateSelect) {
                case 200:
                    loadBitmap = this.nuunMenu_loadContentsImg(data);
                    break;
            }
            if (loadBitmap && !loadBitmap.isReady()) {
                bitmap = loadBitmap;
            }
            if (bitmap && !bitmap.isReady()) {
                bitmap.addLoadListener(this.nuunMenu_drawItemContentsStatus.bind(this, index))
                return;
            } else {
                this.nuunMenu_drawItemContentsStatus(index);
            }
        }
    };

    Window_MenuStatus.prototype.nuunMenu_drawItemContentsStatus = function(index) {
        const actor = this.actor(index);
        const rect = this.itemRect(index);
        const itemWidth = this.nuunMenu_itemContentsWidth(rect.width);
        const lineHeight = this.lineHeight();
        const colSpacing = this.colSpacing();
        maxGaugeWidth = itemWidth;
        const list = this.getStatusList();
        for (const data of list) {
        const x_Position = data.X_Position;
        const position = Math.min(x_Position, this.nuunMenu_maxContentsCols());
        const contentsX = rect.x + (itemWidth + colSpacing) * (position - 1) + data.X_Coordinate + colSpacing;
        const contentsY = rect.y + lineHeight * (data.Y_Position - 1) + data.Y_Coordinate + this.itemPadding();
        const width = data.ItemWidth && data.ItemWidth > 0 ? Math.min(data.ItemWidth, itemWidth) : itemWidth;
        this.nuunMenu_drawContentsBase(data, contentsX, contentsY, width - colSpacing / 2, actor);
        }
    };

    Window_StatusBase.prototype.nuunMenu_drawContentsBase = function(data, x, y, width, actor) {
        $gameTemp.menuParam = null;
        switch (data.DateSelect) {
        case 0:
            break;
        case 1:
            this.nuunMenu_drawActorName(data, x, y, width, actor);
            break;
        case 2:
            this.nuunMenu_drawActorNickname(data, x, y, width, actor);
            break;
        case 3:
            this.nuunMenu_drawActorClass(data, x, y, width, actor);
            break;
        case 4:
            this.nuunMenu_drawActorLevel(data, x, y, width, actor);
            break;
        case 5:
            this.nuunMenu_drawActorIcons(data, x, y, width, actor);
            break;
        case 6:
            this.nuunMenu_drawParam(data, x, y, width, actor);
            break;
        case 7:
            this.nuunMenu_drawPlaceStateIcon(x, y, actor);
            break;
        case 11:
            $gameTemp.menuParam = data;
            this.nuunMenu_placeHpGauge(x, y, actor);
            break;
        case 12:
            $gameTemp.menuParam = data;
            this.nuunMenu_placeMpGauge(x, y, actor);
            break;
        case 13:
            $gameTemp.menuParam = data;
            this.nuunMenu_placeTpGauge(x, y, actor);
            break;
        case 14:
            this.nuunMenu_drawExp(data, x, y, width, actor);
            break;
        case 15:
            $gameTemp.menuParam = data;
            this.nuunMenu_placeExpGauge(x, y, actor);
            break;
        case 22:
        case 23:
        case 24:
        case 25:
        case 26:
        case 27:
            this.nuunMenu_drawParams(data, data.DateSelect, x, y, width, actor);
            break;
        case 30:
        case 31:
        case 32:
        case 33:
        case 34:
        case 35:
        case 36:
        case 37:
        case 38:
        case 39:
            this.nuunMenu_drawXParams(data, data.DateSelect, x, y, width, actor);
            break;
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
        case 45:
        case 46:
        case 47:
        case 48:
        case 49:
            this.nuunMenu_drawSParams(data, data.DateSelect, x, y, width, actor);
            break;
        case 100:
            $gameTemp.menuParam = data;
            this.nuunMenu_placeUserGauge(data, x, y, actor);
            break;
        case 200:
            this.nuunMenu_drawMenuStatusImg(data, x, y, actor);
            break;
        case 300:
            this.nuunMenu_contentsDrawActorChip(data, x, y, width, actor);
            break;
        case 301:
            this.drawSvActorImg(data, x, y, width, actor);
            break;
        case 1000:
            this.nuunMenu_horzLine(x, y, width, data);
            break;
        }
    };

    Window_StatusBase.prototype.nuunMenu_paramNameData = function(data, actor, param) {
        if (data.ParamName) {
        return data.ParamName;
        }
        switch (param) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
            return TextManager.param(param);
        case 10:
        case 11:
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
        case 42:
            return TextManager.param(0);
        case 43:
            return TextManager.param(1);
        default:
            return null;
        }
    };
    
    Window_StatusBase.prototype.nuunMenu_paramData = function(data, actor, param) {
        switch (param) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
            return actor.param(param);
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
            return actor.xparam(param - 10) * 100;
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
            return actor.sparam(param - 20) * 100;
        default:
            return null;
        }
    };

    Window_MenuStatus.prototype.nuunMenu_horzLine = function(x, y, width, data) {
        const lineY = y + this.lineHeight() / 2 - 1;
        this.contents.paintOpacity = 48;
        this.contents.fillRect(x, lineY, width, 2, NuunManager.getColorCode(data.NameColor));
        this.contents.paintOpacity = 255;
    };

    Window_MenuStatus.prototype.nuunMenu_contentsDrawActorChip = function(data, x, y, width, actor) {
        this.nuunMenu_actorCharacterChip(actor, data, x + 24, y + 48, "actor%1-menuStatusCharacter");
    };

    Window_MenuStatus.prototype.drawSvActorImg = function(data, x, y, width, actor) {
        this.nuunMenu_drawSvActorImg(data, x, y, width, actor, "actor%1-menuStatusSvActor");
    };

    Window_StatusBase.prototype.nuunMenu_drawParams = function(data, param, x, y, width, actor) {
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        const nameText = this.nuunMenu_paramNameData(data, actor, param - 20);
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        this.nuun_setContentsFontFace(data);
        const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? this.textWidth(nameText) : this.nuunMenu_systemWidth(data.SystemItemWidth, width);
        this.drawText(nameText, x, y, textWidth);
        this.resetTextColor();
        this.nuun_setContentsValueFontFace(data);
        const textParam = (data.DetaEval ? eval(data.DetaEval) : this.nuunMenu_paramData(data, actor, param - 20)) + (data.paramUnit ? String(data.paramUnit) : "");
        this.drawText(textParam, x + textWidth + 8, y, width - (textWidth + 8), data.Align);
        this.resetFontSettings();
    };

    Window_StatusBase.prototype.nuunMenu_drawXParams = function(data, param, x, y, width, actor) {
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        const nameText = this.nuunMenu_paramNameData(data, actor, param - 20);
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        this.nuun_setContentsFontFace(data);
        const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? this.textWidth(nameText) : this.nuunMenu_systemWidth(data.SystemItemWidth, width);
        this.drawText(nameText, x, y, textWidth);
        this.resetTextColor();
        this.nuun_setContentsValueFontFace(data);
        let textParam = (data.DetaEval ? eval(data.DetaEval) : this.nuunMenu_paramData(data, actor, param - 20));
        textParam = NuunManager.numPercentage(textParam, (data.Decimal - 2) || 0, this.getDecimalMode());
        textParam += (data.paramUnit ? String(data.paramUnit) : "");
        this.drawText(textParam, x + textWidth + 8, y, width - (textWidth + 8), data.Align);
        this.resetFontSettings();
    };

    Window_StatusBase.prototype.nuunMenu_drawSParams = function(data, param, x, y, width, actor) {
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        const nameText = this.nuunMenu_paramNameData(data, actor, param - 20);
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        this.nuun_setContentsFontFace(data);
        const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? this.textWidth(nameText) : this.nuunMenu_systemWidth(data.SystemItemWidth, width);
        this.drawText(nameText, x, y, textWidth);
        this.resetTextColor();
        this.nuun_setContentsValueFontFace(data);
        let textParam = (data.DetaEval ? eval(data.DetaEval) : this.nuunMenu_paramData(data, actor, param - 20));
        textParam = NuunManager.numPercentage(textParam, (data.Decimal - 2) || 0, this.getDecimalMode());
        textParam += (data.paramUnit ? String(data.paramUnit) : "");
        this.drawText(textParam, x + textWidth + 8, y, width - (textWidth + 8), data.Align);
        this.resetFontSettings();
    };

    Window_StatusBase.prototype.nuunMenu_drawActorName = function(data, x, y, width, actor) {
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        menuTextMode = 'name';
        menuAlign = data.Align;
        this.nuun_setContentsFontFace(data);
        Window_StatusBase.prototype.drawActorName.call(this, actor, x, y, width);
        this.resetFontSettings();
    };

    Window_StatusBase.prototype.nuunMenu_drawText = function(text, x, y, maxWidth, align) {
        if (menuTextMode === 'name') {
            align = menuAlign;
            menuTextMode = null;
        }
        Window_Base.prototype.drawText.call(this, text, x, y, maxWidth, align);
    };

    Window_StatusBase.prototype.nuunMenu_drawActorClass = function(data, x, y, width, actor) {
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        this.nuun_setContentsFontFace(data);
        this.drawText(actor.currentClass().name, x, y, width, data.Align);
        this.resetFontSettings();
    };

    Window_StatusBase.prototype.nuunMenu_drawActorNickname = function(data, x, y, width, actor) {
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        this.nuun_setContentsFontFace(data);
        this.drawText(actor.nickname(), x, y, width, data.Align);
        this.resetFontSettings();
    };

    Window_StatusBase.prototype.nuunMenu_drawActorLevel = function(data, x, y, width, actor) {
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        this.nuun_setContentsFontFace(data);
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        this.drawText(TextManager.levelA, x, y, 48);
        this.resetTextColor();
        this.nuun_setContentsValueFontFace(data);
        this.drawText(actor.level, x + 60, y, width - 60, "right");
        this.resetFontSettings();
    };

    Window_StatusBase.prototype.nuunMenu_drawActorIcons = function(data, x, y, width, actor) {
        let icons = [];
        let states = [];
        const iconWidth = ImageManager.iconWidth;
        const dataEval = data.DetaEval;
        if (dataEval) {
            const stateList = dataEval.split(',');
            for (const id of stateList) {
                Array.prototype.push.apply(states, this.nuun_getListIdData(id));
            }
            icons = actor.allIcons().filter(icon => states.some(i => $dataStates[i].iconIndex === icon)).slice(0, Math.floor(width / iconWidth));
            let iconX = x;
            for (const icon of icons) {
                this.drawIcon(icon, iconX, y + 2);
                iconX += iconWidth;
            }
        } else {
            Window_StatusBase.prototype.drawActorIcons.call(this, actor, x, y, width);
        }
    };

    Window_StatusBase.prototype.nuunMenu_drawParam = function(data, x, y, width, actor) {
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        this.nuun_setContentsFontFace(data);
        const nameText = data.ParamName ? data.ParamName : '';
        const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? this.textWidth(nameText) : this.nuunMenu_systemWidth(data.SystemItemWidth, width);
        this.drawText(nameText, x, y, textWidth);
        this.resetTextColor();
        if (data.DetaEval) {
            this.nuun_setContentsValueFontFace(data);
            const padding = textWidth > 0 ? 8 : 0;
            this.drawText(eval(data.DetaEval), x + textWidth + padding, y, width - (textWidth + padding), data.Align);
        }
        this.resetFontSettings();
    };

    Window_MenuStatus.prototype.nuunMenu_placeHpGauge = function(x, y, actor) {
        $gameTemp.menuGaugeType = "hp";
        this.nuunMenu_placeGauge(actor, "hp", x, y, "actor%1-gauge-%2");
    };

    Window_MenuStatus.prototype.nuunMenu_placeMpGauge = function(x, y, actor) {
        $gameTemp.menuGaugeType = "mp";
        this.nuunMenu_placeGauge(actor, "mp", x, y, "actor%1-gauge-%2");
    };

    Window_MenuStatus.prototype.nuunMenu_placeTpGauge = function(x, y, actor) {
        if ($dataSystem.optDisplayTp) {
            $gameTemp.menuGaugeType = "tp";
            this.nuunMenu_placeGauge(actor, "tp", x, y, "actor%1-gauge-%2");
        }
    };

    Window_MenuStatus.prototype.nuunMenu_placeExpGauge = function(x, y, actor) {
        $gameTemp.menuGaugeType = "menuexp";
        this.nuunMenu_placeGauge(actor, "menuexp", x, y, "menuExp-%1");
    };

    Window_MenuStatus.prototype.nuunMenu_placeUserGauge = function(data, x, y, actor) {
        $gameTemp.menuGaugeType = data.GaugeID;
        this.nuunMenu_placeGauge(actor, data.GaugeID, x, y, "actor%1-gauge-%2");
    };

    Window_StatusBase.prototype.nuunMenu_drawPlaceStateIcon = function(x, y, actor) {
        const hw = Math.floor(ImageManager.iconWidth / 2);
        this.placeStateIcon(actor, x + hw, y + hw);
    };

    Window_StatusBase.prototype.nuunMenu_drawExp = function(data, x, y, width, actor) {
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        const nameText = data.ParamName ? data.ParamName : 'NextLv';
        this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
        this.nuun_setContentsFontFace(data);
        const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? this.textWidth(nameText) : this.nuunMenu_systemWidth(data.SystemItemWidth, width);
        this.drawText(nameText, x + textWidth, y, textWidth);
        this.resetTextColor();
        this.nuun_setContentsValueFontFace(data);
        let textParam = (data.DetaEval ? eval(data.DetaEval) : actor.nextLevelExp() - actor.currentLevelExp());
        this.drawText(textParam, x + textWidth + 8, y, width - (textWidth + 8), data.Align);
        this.resetFontSettings();
    };

    Window_StatusBase.prototype.nuunMenu_placeGauge = function(actor, type, x, y, fmt) {
        if (Imported.NUUN_GaugeImage) {
            this.placeGaugeImg(actor, type, x, y);
        }
        const key = fmt.format(actor.actorId(), type);
        const sprite = this.createInnerSprite(key, Sprite_MenuGauge);
        sprite.setup(actor, type);
        sprite.move(x, y);
        sprite.show();
    };

    Window_StatusBase.prototype.nuunMenu_actorCharacterChip = function(actor, data, x, y, fmt) { 
        const key = fmt.format(actor.actorId());
        const sprite = this.createInnerSprite(key, Sprite_MenuScreenCharacter);
        sprite.setup(actor, data);
        sprite._character.setPosition(0, 0);
        sprite.move(x, y);
        sprite.show();
    };

    Window_StatusBase.prototype.nuunMenu_drawSvActorImg = function(data, x, y, width, actor, fmt) {
        const key = fmt.format(actor.actorId());
        const sprite = this.createInnerSprite(key, Sprite_MenuSvActor);
        sprite.setup(actor, data);
        sprite.show();
        sprite.setHome(x + 64, y + 64);
        sprite.startMotion();
    };

    Window_StatusBase.prototype.nuunMenu_drawMenuStatusImg = function(data, x, y, actor) {
        if (data.ImgData) {
            if (data.DetaEval && !eval(data.DetaEval)) {
                return;
            }
            const rect = this.itemRect(0);
            const bitmap = ImageManager.nuun_LoadPictures(data.ImgData);
            this.contents.blt(bitmap, 0, 0, rect.width, rect.height, x - this.colSpacing(), y - this.itemPadding());
        }
    };

    Window_StatusBase.prototype.nuunMenu_drawActorFace = function(actor, x, y, width, height, data) {
        x += (data ? data.Actor_X : 0) + this.ActorImgX() + 1;
        y += (data ? data.Actor_Y : 0) + this.ActorImgY() + 1;
        if (this.isActorPictureEXApp()) {
            this.drawFace(actor.getActorGraphicFace(), actor.getActorGraphicFaceIndex(), x, y, width, height);
        } else {
            let bitmap = null;
            if (data && data.FaceImg) {
                bitmap = data.FaceImg;
            } else {
                bitmap = actor.faceName();
            }
            const faceIndex = data && data.FaceIndex >= 0 ? data.FaceIndex : actor.faceIndex();
            if (actor.isRearguard && actor.isRearguard()) {//VanguardAndRearguard
                x += Window_MenuStatus.shiftWidth;
            }
            this.drawFace(bitmap, faceIndex, x, y, width, height);
        }
    };

    Window_StatusBase.prototype.nuunMenu_contentsDrawActorGraphic = function(actor, data, bitmap, x, y, width, height) {
        width = Math.min(width - 2, bitmap.width);
        height = Math.min(height - 2, bitmap.height);
        const scale = (data.Actor_Scale || 100) / 100;
        const sw = width * scale;
        const sh = height * scale;
        const sx = data.Img_SX || 0;
        const sy = data.Img_SY || 0;
        x += 1 + data.Actor_X + this.ActorImgX();
        y += 1 + data.Actor_Y + this.ActorImgY();
        this.contents.blt(bitmap, sx, sy, width + (width - sw), height + (height - sh), x, y, width, height);
    };

    Window_StatusBase.prototype.nuun_setContentsFontFace = function(data) {
        this.contents.fontFace = data.FontFace ? data.FontFace : $gameSystem.mainFontFace();
    };

    Window_StatusBase.prototype.nuun_setContentsValueFontFace = function(data) {
        this.contents.fontFace = data.ValueFontFace ? data.ValueFontFace : $gameSystem.mainFontFace();
    };

    Window_MenuStatus.prototype.ActorImgX = function() {
        return params.ActorImg_X;
    };

    Window_MenuStatus.prototype.ActorImgY = function() {
        return params.ActorImg_Y;
    };

    function Window_InfoMenu() {
        this.initialize(...arguments);
    }
    
    Window_InfoMenu.prototype = Object.create(Window_Selectable.prototype);
    Window_InfoMenu.prototype.constructor = Window_InfoMenu;
    
    Window_InfoMenu.prototype.initialize = function(rect, data, name) {
        this._dataList = data;
        this._data = {Id: name};//T氏プラグイン
        this._classNameId = name;
        Window_Selectable.prototype.initialize.call(this, rect);
        this._text = '';
        this._commandName = _commandName;
        this._infoFontSize = 0;
        this._onPlayTime = false;
        this._onRefresh = false;
    };

    Window_InfoMenu.prototype.setup = function(cols, fontsize) {
        this._maxCols = cols;
        this._infoFontSize = fontsize;
        this.refresh();
    };

    Window_InfoMenu.prototype.maxCols = function() {
        return this._maxCols ? this._maxCols : 1;
    };
    
    Window_InfoMenu.prototype.itemHeight = function() {
        return this.lineHeight();
    };

    Window_InfoMenu.prototype.getInfoList = function() {
        return this._dataList || [];
    };

    Window_InfoMenu.prototype.refresh = function() {
        this.contents.clear();
        const listData = this.getInfoList();
        const lineHeight = this.lineHeight();
        for (const data of listData) {
            this.resetFontSettings();
            const x_Position = data.X_Position;
            const position = Math.min(x_Position, this.maxCols());
            const rect = this.itemRect(position - 1);
            const x = rect.x + (data.X_Coordinate || 0);
            const y = (data.Y_Position - 1) * lineHeight + rect.y + data.Y_Coordinate;
            const width = data.ItemWidth && data.ItemWidth > 0 ? data.ItemWidth : rect.width;
            this.dateDisplay(data, x, y, width);
        }
    };
    
    Window_InfoMenu.prototype.dateDisplay = function(data, x, y, width) {
        switch (data.DateSelect) {
        case 0:
            break;
        case 1:
            this.drawPlayTime(data, x, y, width);
            break;
        case 2:
            this.drawGold(data, x, y, width);
            break;
        case 3:
            this.drawLocation(data, x, y, width);
            break;
        case 4:
            this.drawOriginalParam(data, x, y, width);
            break;
        case 5:
            this.drawName(data, x, y, width);
            break;
        case 6:
            this.drawCommandExplanation(data, x, y, width);
            break;
        case 10:
            this.drawFreeText(data, x, y, width);
            break;
        case 11:
            this.drawDestination(data, x, y, width);
            break;
        case 12:
            this.drawChapter(data, x, y, width);
            break;
        case 20:
            this.drawLimitGauge(data, x, y, width);
            break;
        case 100:
        this.nuunMenu_horzLine(x, y, width, data);
        default:
            break;
        }
    };

    Window_InfoMenu.prototype.nuunMenu_horzLine = function(x, y, width, data) {
        const lineY = y + this.lineHeight() / 2 - 1;
        this.contents.paintOpacity = 48;
        this.contents.fillRect(x, lineY, width, 2, NuunManager.getColorCode(data.NameColor));
        this.contents.paintOpacity = 255;
    };

    Window_InfoMenu.prototype.drawLimitGauge = function(data, x, y, width) {
        let sprite = null;
        if (this._partyGauge) {
            sprite = this._partyGauge;
        } else {
            try {
                sprite = $gameParty.getPartyLimitSprite(Math.min(data.ItemWidth, width));
                this.addChild(sprite);
            } catch (error) {
                return;
            }
        }
        sprite.setup('actor', 'limit');
        sprite.move(x, y);
        sprite.show();
        this._partyGauge = sprite;
    };
    
    Window_InfoMenu.prototype.drawGold = function(data, x, y, width) {
        let iconWidth = 0;
        if (data.InfoIcon > 0) {
            this.drawIcon(data.InfoIcon, x, y + 2);
            iconWidth = ImageManager.iconWidth + 6;
        }
        this.contents.fontSize = $gameSystem.mainFontSize() + this._infoFontSize + (data.ContentsFontSize || 0);
        this.nuun_setContentsFontFace(data);
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        const nameText = data.ParamName ? data.ParamName : '';
        const systemWidth = data.SystemItemWidth === 0 ? this.textWidth(nameText) : this.systemWidth(data.SystemItemWidth, width);
        this.drawText(nameText, x + iconWidth, y, systemWidth);
        this.resetTextColor();
        this.nuun_setContentsValueFontFace(data);
        this.drawCurrencyValue(this.value(), this.currencyUnit(), x + systemWidth + 8 + iconWidth, y, width - (systemWidth + 8 + iconWidth));
        this.resetFontSettings();
    };
    
    Window_InfoMenu.prototype.drawPlayTime = function(data, x, y, width) {
        this.contents.fontSize = $gameSystem.mainFontSize() + this._infoFontSize + (data.ContentsFontSize || 0);
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        this.nuun_setContentsFontFace(data);
        const nameText = data.ParamName ? data.ParamName : '';
        const systemWidth = !!nameText ? (data.SystemItemWidth || 160) : 0;
        let iconWidth = 0;
        if (data.InfoIcon > 0) {
            this.drawIcon(data.InfoIcon, x, y + 2);
            iconWidth = ImageManager.iconWidth + 6;
        }
        this.drawText(nameText, x + iconWidth, y, systemWidth);
        this.resetTextColor();
        this.nuun_setContentsValueFontFace(data);
        this.drawText($gameSystem.playtimeText(), x + systemWidth + iconWidth + this.itemPadding(), y, width - (systemWidth + 8 + iconWidth), data.Align);
        this.resetFontSettings();
        this._onPlayTime = true;
    };
    
    Window_InfoMenu.prototype.drawLocation = function(data, x, y, width) {
        this.contents.fontSize = $gameSystem.mainFontSize() + this._infoFontSize + (data.ContentsFontSize || 0);
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        this.nuun_setContentsFontFace(data);
        const nameText = data.ParamName ? data.ParamName : '';
        const systemWidth = !!nameText ? (data.SystemItemWidth || 160) : 0;
        let iconWidth = 0;
        if (data.InfoIcon > 0) {
            this.drawIcon(data.InfoIcon, x, y + 2);
            iconWidth = ImageManager.iconWidth + 6;
        }
        this.drawText(nameText, x + iconWidth, y, systemWidth);
        this.resetTextColor();
        this.nuun_setContentsValueFontFace(data);
        const text = $gameMap.mapId() > 0 ? $gameMap.displayName() : '';
        this.drawText(text, x + systemWidth + iconWidth + this.itemPadding(), y, width - (systemWidth + 8 + iconWidth), data.Align);
        this.resetFontSettings();
    };
    
    Window_InfoMenu.prototype.drawOriginalParam = function(data, x, y, width) {
        this.contents.fontSize = $gameSystem.mainFontSize() + this._infoFontSize + (data.ContentsFontSize || 0);
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        this.nuun_setContentsFontFace(data);
        const nameText = data.ParamName ? data.ParamName : '';
        const systemWidth = !!nameText ? (data.SystemItemWidth || 160) : 0;
        let iconWidth = 0;
        if (data.InfoIcon > 0) {
            this.drawIcon(data.InfoIcon, x, y + 2);
            iconWidth = ImageManager.iconWidth + 6;
        }
        this.drawText(nameText, x + iconWidth, y, systemWidth);
        this.resetTextColor();
        if (!!data.DataEval) {
            this.nuun_setContentsValueFontFace(data);
            this.drawText(eval(data.DataEval), x + systemWidth + 8 + iconWidth, y, width - (systemWidth + 8 + iconWidth), data.Align);
        }
        this.resetFontSettings();
    };
    
    Window_InfoMenu.prototype.drawCommandExplanation = function(data, x, y, width) {
        this.drawTextEx(this._text, x, y, width);
    };
    
    Window_InfoMenu.prototype.drawFreeText = function(data, x, y, width) {   
        this.drawTextEx(data.Text, x, y, width);
    };
    
    Window_InfoMenu.prototype.drawDestination = function(data, x, y, width) {
        if (!Imported.NUUN_Destination) {
            return;
        }
        let iconWidth = 0;
        let textWidth = 0;
        if (data.InfoIcon > 0) {
            this.drawIcon(data.InfoIcon, x, y + 2);
            iconWidth = ImageManager.iconWidth + 6;
        }
        this.contents.fontSize = $gameSystem.mainFontSize() + this._infoFontSize + (data.ContentsFontSize || 0);
        if (data.ParamName) {
            this.changeTextColor(NuunManager.getColorCode(data.NameColor));
            this.nuun_setContentsFontFace(data);
            const nameText = data.ParamName ? data.ParamName : '';
            this.drawText(nameText, x + iconWidth, y, textWidth);
            textWidth = this.systemWidth(data.SystemItemWidth, width);
        }
        this.resetTextColor();
        const text = this.getDestinationList();
        if (text) {
            this.drawTextEx(text, x + iconWidth + textWidth, y, width - textWidth - iconWidth);
        }
        this.resetFontSettings();
    };
    
    Window_InfoMenu.prototype.drawChapter = function(data, x, y, width) {
        if (!Imported.NUUN_Chapter) {
            return;
        }
        let iconWidth = 0;
        let textWidth = 0;
        if (data.InfoIcon > 0) {
            this.drawIcon(data.InfoIcon, x, y + 2);
            iconWidth = ImageManager.iconWidth + 6;
        }
        this.contents.fontSize = $gameSystem.mainFontSize() + this._infoFontSize + (data.ContentsFontSize || 0);
        if (data.ParamName) {
            this.changeTextColor(NuunManager.getColorCode(data.NameColor));
            this.nuun_setContentsFontFace(data);
            const nameText = data.ParamName ? data.ParamName : '';
            this.drawText(nameText, x + iconWidth, y, textWidth);
            textWidth = this.systemWidth(data.SystemItemWidth, width);
        }
        this.resetTextColor();
        const text = this.getChapter();
        if (text) {
            this.drawTextEx(text, x + iconWidth + textWidth, y, width - textWidth - iconWidth);
        }
        this.resetFontSettings();
    };
    
    Window_InfoMenu.prototype.drawName = function(data, x, y, width) {
        this.contents.fontSize = $gameSystem.mainFontSize() + this._infoFontSize + (data.ContentsFontSize || 0);
        this.changeTextColor(NuunManager.getColorCode(data.NameColor));
        const nameText = data.ParamName ? data.ParamName : '';
        this.nuun_setContentsFontFace(data);
        this.drawText(nameText, x, y, width, data.Align);
        this.resetFontSettings();
    };
    
    Window_InfoMenu.prototype.systemWidth = function(swidth, width) {
        return swidth > 0 ? swidth : 120;
    };
    
    Window_InfoMenu.prototype.value = function() {
        return $gameParty.gold();
    };
    
    Window_InfoMenu.prototype.currencyUnit = function() {
        return TextManager.currencyUnit;
    };
    
    Window_InfoMenu.prototype.setText = function(str) {
        this._text = str;
        this._onRefresh = true;
    };

    Window_InfoMenu.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);
        if (this._commandName !== _commandName) {
            this.setText(_commandText);
            this._commandName = _commandName;
        }
        if (this._onPlayTime || this._onRefresh) {
            this.refresh();
        }
    };

    Window_InfoMenu.prototype.nuun_setContentsFontFace = function(data) {
        this.contents.fontFace = data.FontFace ? data.FontFace : $gameSystem.mainFontFace();
    };

    Window_InfoMenu.prototype.nuun_setContentsValueFontFace = function(data) {
        this.contents.fontFace = data.ValueFontFace ? data.ValueFontFace : $gameSystem.mainFontFace();
    };


    function Sprite_MenuGauge() {
        this.initialize(...arguments);
    }
      
    Sprite_MenuGauge.prototype = Object.create(Sprite_Gauge.prototype);
    Sprite_MenuGauge.prototype.constructor = Sprite_MenuGauge;
    window.Sprite_MenuGauge = Sprite_MenuGauge;
      
    Sprite_MenuGauge.prototype.initialize = function() {
        this._statusType = $gameTemp.menuGaugeType;
        this.menuParam = $gameTemp.menuParam;
        this._gaugeWidth = Math.min(this.getMenuGaugeWidth(), maxGaugeWidth);
        this._gaugeHeight = this.getMenuGaugeHeight();
        Sprite_Gauge.prototype.initialize.call(this);
    };
    
    Sprite_MenuGauge.prototype.bitmapWidth = function() {
        return this._gaugeWidth;
    };
      
    Sprite_MenuGauge.prototype.gaugeHeight = function() {
        return this._gaugeHeight;
    };

    Sprite_MenuGauge.prototype.getMenuGaugeWidth = function() {
        if (this.menuParam.ItemWidth > 0) {
            return this.menuParam.ItemWidth;
        } else {
            return this.getMenuGaugeWidthParams(this._statusType);
        }
    };

    Sprite_MenuGauge.prototype.getMenuGaugeWidthParams = function(type) {
        switch (type) {
            case 'hp':
              return params.HPGaugeWidth;
            case 'mp':
              return params.MPGaugeWidth;
            case 'tp':
              return params.TPGaugeWidth;
            case 'menuexp':
              return params.ExpGaugeWidth;
            default:
              return 128;
          }
    };
      
    Sprite_MenuGauge.prototype.getMenuGaugeHeight = function() {
        switch (this._statusType) {
            case 'hp':
              return this.menuParam.GaugeHeight > 0 ? this.menuParam.GaugeHeight : 12;
            case 'mp':
              return this.menuParam.GaugeHeight > 0 ? this.menuParam.GaugeHeight : 12;
            case 'tp':
              return this.menuParam.GaugeHeight > 0 ? this.menuParam.GaugeHeight : 12;
            case 'menuexp':
              return this.menuParam.GaugeHeight > 0 ? this.menuParam.GaugeHeight : 12;
            default:
              return this.menuParam.GaugeHeight > 0 ? this.menuParam.GaugeHeight : 128;
          }
    };
    
    Sprite_MenuGauge.prototype.gaugeColor1 = function() {
        if (this._battler && this.menuParam) {
          switch (this._statusType) {
            case "hp":
            case "mp":
            case "tp":
            case "time":
                return this.menuParam.Color1 >= 0 ? NuunManager.getColorCode(this.menuParam.Color1) : Sprite_Gauge.prototype.gaugeColor1.call(this);
            case "menuexp":
                return NuunManager.getColorCode(this.expGaugeColor1Param());
            default:
              return NuunManager.getColorCode(this.menuParam.Color1);
          }
        } else {
          return Sprite_Gauge.prototype.gaugeColor1.call(this);
        }
    };
      
    Sprite_MenuGauge.prototype.gaugeColor2 = function() {
        if (this._battler && this.menuParam) {
          switch (this._statusType) {
            case "hp":
            case "mp":
            case "tp":
            case "time":
                return this.menuParam.Color2 >= 0 ? NuunManager.getColorCode(this.menuParam.Color2) : Sprite_Gauge.prototype.gaugeColor2.call(this);
            case "menuexp":
                return NuunManager.getColorCode(this.expGaugeColor2Param());
            default:
              return NuunManager.getColorCode(this.menuParam.Color2);
          }
        } else {
          return Sprite_Gauge.prototype.gaugeColor2.call(this);
        }
    };
    
    Sprite_MenuGauge.prototype.displyaExp = function() {
        const mode = this.expDisplayModeParam();
        if (mode === 1) {
            return this.currentMaxValue() - this.currentValue();
        } else if (mode === 2) {
            return this.currentValue();
        } else if (mode === 3) {
            return NuunManager.numPercentage(this.currentValue() / this.currentMaxValue() * 100, this.expDecimalwParam(), this.decimalModeParam());
        }
        return this._battler.currentExp() - this._battler.currentLevelExp();
    };
    
    Sprite_MenuGauge.prototype.displyaMaxExp = function() {
        return this._battler.nextLevelExp() - this._battler.currentLevelExp();
    };
    
    Sprite_MenuGauge.prototype.currentValue = function() {
        if (this._battler && this.menuParam) {
        switch (this._statusType) {
            case "hp":
            case "mp":
            case "tp":
            case "time":
                return Sprite_Gauge.prototype.currentValue.call(this);
            case "menuexp":
                return  this._battler.isMaxLevel() ? this.currentMaxValue() : this._battler.currentExp() - this._battler.currentLevelExp();
            default:
                const actor = this._battler;
                return eval(this.menuParam.DetaEval);
          }
        } else {
          return Sprite_Gauge.prototype.currentValue.call(this);
        }
    };
      
    Sprite_MenuGauge.prototype.currentMaxValue = function() {
        if (this._battler && this.menuParam) {
        switch (this._statusType) {
            case "hp":
            case "mp":
            case "tp":
            case "time":
                return Sprite_Gauge.prototype.currentMaxValue.call(this);
            case "menuexp":
                return this._battler.nextLevelExp() - this._battler.currentLevelExp();
            default:
                const actor = this._battler;
                return eval(this.menuParam.DetaEval2);
            }
        } else {
          return Sprite_Gauge.prototype.currentMaxValue.call(this);
        }
    };
    
    Sprite_MenuGauge.prototype.label = function() {
        if (this._battler && this.menuParam) {
            switch (this._statusType) {
            case "hp":
            case "mp":
            case "tp":
            case "time":
                return this.menuParam.ParamName ? this.menuParam.ParamName : Sprite_Gauge.prototype.label.call(this);
            case "menuexp":
                return this.labelShowParam() ? this.menuParam.ParamName ? this.menuParam.ParamName : TextManager.expA : '';
            default:
              return this.menuParam.ParamName;
            }
        } else {
          return Sprite_Gauge.prototype.label.call(this);
        }
    };
    
    Sprite_MenuGauge.prototype.drawValue = function() {
        if (this._statusType === "menuexp") {
            const mode = this.expDisplayModeParam();
            if (mode === 0) {
                return;
            }
            let text = this.displyaExp();
            if (mode === 3) {
                text = this._battler.isMaxLevel() ? "100%" : text +"%";
            } else {
                text = this._battler.isMaxLevel() ? "-------" : text;
            }
            const width = this.bitmapWidth();
            const height = this.textHeight();
            this.setupValueFont();
            this.bitmap.drawText(text, 0, 0, width, height, "right");
        } else {
            Sprite_Gauge.prototype.drawValue.call(this);
        }
    };

    Sprite_MenuGauge.prototype.expGaugeColor1Param = function() {
        return params.ExpGaugeColor1;
    };

    Sprite_MenuGauge.prototype.expGaugeColor2Param = function() {
        return params.ExpGaugeColor2;
    };

    Sprite_MenuGauge.prototype.decimalModeParam = function() {
        return params.DecimalMode;
    };

    Sprite_MenuGauge.prototype.expDecimalwParam = function() {
        return params.EXPDecimal;
    };

    Sprite_MenuGauge.prototype.expDisplayModeParam = function() {
        return params.ExpDisplayMode;
    };

    Sprite_MenuGauge.prototype.labelShowParam = function() {
        return params.LabelShow;
    };

    function Sprite_MenuScreenCharacter() {
        this.initialize(...arguments);
    }
      
    Sprite_MenuScreenCharacter.prototype = Object.create(Sprite_Character.prototype);
    Sprite_MenuScreenCharacter.prototype.constructor = Sprite_MenuScreenCharacter;
      
    Sprite_MenuScreenCharacter.prototype.initialize = function(character) {
        Sprite_Character.prototype.initialize.call(this, character);
        this._data = null;
        this._actor = null;
    };

    Sprite_MenuScreenCharacter.prototype.setup = function(battler, data) {
        const character = new Game_Character(battler);
        const characterName = battler.characterName();
        const characterIndex = battler.characterIndex();
        character.setImage(characterName, characterIndex);
        character.setStepAnime(true);
        this._data = data;
        this._actor = battler;
        this.setCharacter(character);
    };
      
    Sprite_MenuScreenCharacter.prototype.update = function() {
        if (this.visible) {
          Sprite_Character.prototype.update.call(this);
          this._character.updateAnimation();
          this.changePaintOpacity();
        }
    };

    Sprite_MenuScreenCharacter.prototype.changePaintOpacity = function() {
        const battleMemberOpacity = this._data.BattleMemberOpacity !== undefined ? this._data.BattleMemberOpacity : true;
        if (battleMemberOpacity) {
            this.opacity = this._actor.isBattleMember() ? 255 : Window_Base.prototype.translucentOpacity.call(this);
        }
    };

    Sprite_MenuScreenCharacter.prototype.updatePosition = function() {

    };
    

    function Sprite_MenuSvActor() {
        this.initialize(...arguments);
    }
      
    Sprite_MenuSvActor.prototype = Object.create(Sprite_Actor.prototype);
    Sprite_MenuSvActor.prototype.constructor = Sprite_MenuSvActor;
      
    Sprite_MenuSvActor.prototype.updateVisibility = function() {
        Sprite_Clickable.prototype.updateVisibility.call(this);
    };
      
    Sprite_MenuSvActor.prototype.initialize = function(battler) {
    Sprite_Actor.prototype.initialize.call(this, battler);
        this._data = null;
    };

    Sprite_MenuSvActor.prototype.setup = function(battler, data) {
        this.setBattler(battler);
        this._data = data;
    };
      
    Sprite_MenuSvActor.prototype.moveToStartPosition = function() {
        this.startMove(0, 0, 0);
    };
      
    Sprite_MenuSvActor.prototype.updateMain = function() {
        this.updateBitmap();
        this.updateFrame();
        this.updateMove();
        this.changePaintOpacity();
    };

    Sprite_MenuSvActor.prototype.changePaintOpacity = function() {
        const battleMemberOpacity = this._data.BattleMemberOpacity !== undefined ? this._data.BattleMemberOpacity : true;
        if (battleMemberOpacity) {
            this.opacity = this._actor.isBattleMember() ? 255 : Window_Base.prototype.translucentOpacity.call(this);
        }
    };
    
    Sprite_MenuSvActor.prototype.startMotion = function() {
        if (this._actor.isDead()) {
            motionType = 'dead';
        } else {
            motionType = 'walk';
        }
        Sprite_Actor.prototype.startMotion.call(this, motionType);
    };
      
    Sprite_MenuSvActor.prototype.setupWeaponAnimation = function() {
        
    };


    function Sprite_MenuActorImg() {
        this.initialize(...arguments);
    }
      
    Sprite_MenuActorImg.prototype = Object.create(Sprite.prototype);
    Sprite_MenuActorImg.prototype.constructor = Sprite_MenuActorImg;
      
    Sprite_MenuActorImg.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);
        this.initMembers();
    };
    
    Sprite_MenuActorImg.prototype.initMembers = function() {
        this._battler = null;
        this._apngMode = null;
        this._data = null;
        this._pictureName = null;
    };
    
    Sprite_MenuActorImg.prototype.setup = function(battler, data) {
        this._battler = battler;
        this._data = data;
        const name = Imported.NUUN_ActorPicture && params.ActorPictureEXApp ? battler.getActorGraphicImg() : data.ActorImg;
        this._pictureName = name.split('pictures/')[1];
        this.refresh();
    };

    Sprite_MenuActorImg.prototype.refresh = function() {
        if (this.addApngChild && this.loadApngSprite(this._pictureName)) {
            this.addApngChild(this._pictureName);
            this._apngMode = true;
        }
    };

    Sprite_MenuActorImg.prototype.destroy = function() {
        this.resetMenuActorImg();
        Sprite.prototype.destroy.call(this);
    };
    
    Sprite_MenuActorImg.prototype.resetMenuActorImg = function() {
        this._battler = null;
        if (this._apngMode) {
            this.destroyApngIfNeed();
            this._apngMode = null;
        }
    };

    Sprite_MenuActorImg.prototype.loadApngSprite = function(name) {
        return Sprite_Picture.prototype.loadApngSprite.call(this, name);
    };


})();