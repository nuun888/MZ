/*:-----------------------------------------------------------------------------------
 * NUUN_SaveMembers.js
 * 
 * Copyright (C) 2025 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Saving and recalling party members
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * Implement a function to register and call parties in a specified party order.
 * 
 * Default key operation
 * Delete registered party Press Q (Oageup) key on the registered party screen
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 4/19/2025 Ver.1.0.0
 * First edition.
 * 
 * @command SetSaveMembers
 * @desc Remembers current party members.
 * @text Party member memory
 * 
 * @command ResetSaveMembers
 * @desc Deletes all saved parties.
 * @text Erase All
 * 
 * @param BasicSetting
 * @text Basic Settings
 * @default ------------------------------
 * 
 * @param SaveMembersMode
 * @text Processing non-party members
 * @desc Processing when there are members outside the party when determining members.
 * @type select
 * @option Exclude non-party members
 * @value 'exclusion'
 * @option Match all only
 * @value 'match'
 * @default 'exclusion'
 * @parent BasicSetting
 * 
 * @param ShowCommand
 * @text Menu command display
 * @desc Added party save menu command.
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param CommandName
 * @text Command name
 * @desc Enter the command name to be displayed in the menu command.
 * @type string
 * @default Party Registration
 * @parent BasicSetting
 * 
 * @param MaxShowSaveMembers
 * @text Number of Actors Displayed
 * @desc Number of actors that can be displayed. 0 is battle member
 * @type number
 * @default 4
 * @min 0
 * @parent BasicSetting
 * 
 * @param MemberHeight
 * @text Member display height
 * @desc The display height of the member.
 * @type number
 * @default 48
 * @parent BasicSetting
 * 
 * @param CharacterMode
 * @text Member images
 * @desc Select the display format for member images to be displayed.
 * @type select
 * @option Character chip
 * @value 'chip'
 * @option Face graphics
 * @value 'face'
 * @default 'chip'
 * @parent BasicSetting
 * 
 * @param EraseSe
 * @text Registration deletion SE
 * @desc Set the SE when registering is deleted.
 * @type struct<SoundEffect>
 * @default {"name":"","volume":"90","pitch":"100","pan":"0"}
 * @parent BasicSetting
 * 
 * @param EraseSymbol
 * @desc The key symbol name to unregister.
 * @text Registration deletion key symbol name
 * @type combo
 * @option "pageup"
 * @option "pagedown"
 * @default "pageup"
 * @parent BasicSetting
 * 
 * @param ActorPictureEXApp
 * @text FApply NUUN_ActorPicture
 * @desc Apply the image change of "NUUN_ActorPicture". If you turn it off, the settings in this plugin will be applied.
 * @type boolean
 * @default false
 * @parent BasicSetting
 * 
 * @param CommandWindowSetting
 * @text Command Window Settings
 * @default ------------------------------
 * 
 * @param SelectMembersCommandName
 * @text Party selection command name
 * @desc Enter the command name for party selection when registering a party.
 * @type string
 * @default Party selection
 * @parent CommandWindowSetting
 * 
 * @param RegistrationCommandName
 * @text Registered command name
 * @desc Enter the command name for party registration.
 * @type string
 * @default Party Registration
 * @parent CommandWindowSetting
 * 
 * @param Command_X
 * @text Command window X coordinate
 * @desc Command window X coordinate.
 * @type number
 * @default 0
 * @min -9999
 * @parent CommandWindowSetting
 * 
 * @param Command_Y
 * @text Command window X coordinate
 * @desc Command window Y coordinate.
 * @type number
 * @default 0
 * @min -9999
 * @parent CommandWindowSetting
 * 
 * @param Command_Width
 * @text Command window width
 * @desc Command window width.
 * @type number
 * @default 0
 * @parent CommandWindowSetting
 * 
 * @param SaveMembersWindowSetting
 * @text Registration Party Window Settings
 * @default ------------------------------
 * 
 * @param SaveMembers_X
 * @text Registration Party Window X Coordinate
 * @desc Registration Party Window X Coordinate.
 * @type number
 * @default 0
 * @min -9999
 * @parent SaveMembersWindowSetting
 * 
 * @param SaveMembers_Y
 * @text Registration Party Window Y Coordinate
 * @desc Registration Party Window Y Coordinate.
 * @type number
 * @default 0
 * @min -9999
 * @parent SaveMembersWindowSetting
 * 
 * @param SaveMembers_Rows
 * @text Registration Party Window Display rows
 * @desc Display rows and maximum number of registrations in the registered party window.
 * @type number
 * @default 8
 * @min 1
 * @parent SaveMembersWindowSetting
 * 
 * @param SceneFormationSetting
 * @text NUUN_SceneFormation setting
 * @default ------------------------------
 * 
 * @param SceneFormationOpenSaveMembers
 * @text SceneFormation registration screen display
 * @desc The party registration screen is displayed from the member selection screen in "NUUN_SceneFormation".
 * @type boolean
 * @default true
 * @parent SceneFormationSetting
 * 
 * @param OpenSaveMembersSymbol
 * @desc Key symbol name when displaying registered parties in "NUUN_SceneFormation".
 * @text Registered Party Display Symbol Name
 * @type combo
 * @option "pageup"
 * @option "pagedown"
 * @default "pageup"
 * @parent SceneFormationSetting
 * 
 */
/*~struct~SoundEffect:
 * 
 * @param name
 * @text SE file
 * @desc Specify SE.
 * @type file
 * @dir audio/se
 * 
 * @param volume
 * @text SE volume
 * @desc Set the SE volume.
 * @type number
 * @default 90
 * @min 0
 * 
 * @param pitch
 * @text SE Pitch
 * @desc Sets the pitch of SE.
 * @type number
 * @default 100
 * 
 * @param pan
 * @text SE pan
 * @desc Set the pan to SE.
 * @type number
 * @default 0
 * @max 100
 * @min -100
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc パーティメンバーの保存、呼び出し
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * 指定のパーティの並び順をパーティを登録、呼び出しする機能を実装します。
 * 
 * デフォルトのキー操作
 * 登録パーティの消去 登録パーティ画面でQ（Oageup）キー
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2025/4/19 Ver.1.0.0
 * 初版
 * 
 * 
 * @command SetSaveMembers
 * @desc 現在のパーティメンバーを記憶します。
 * @text パーティメンバー記憶
 * 
 * @command ResetSaveMembers
 * @desc 保存しているパーティを全て消去します。
 * @text 全消去
 * 
 * @param BasicSetting
 * @text 基本設定
 * @default ------------------------------
 * 
 * @param SaveMembersMode
 * @text パーティ外メンバー処理
 * @desc メンバー決定時のパーティ外メンバーがいた時の処理。
 * @type select
 * @option パーティ外メンバー除外
 * @value 'exclusion'
 * @option 一致のみ
 * @value 'match'
 * @default 'exclusion'
 * @parent BasicSetting
 * 
 * @param ShowCommand
 * @text コマンド表示
 * @desc メニューコマンドにパーティ保存を追加します。
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param CommandName
 * @text コマンド名
 * @desc メニューコマンドに表示するコマンド名を記入します。
 * @type string
 * @default パーティ保存
 * @parent BasicSetting
 * 
 * @param MaxShowSaveMembers
 * @text 表示アクター数
 * @desc 表示出来るアクター数。0で戦闘メンバー
 * @type number
 * @default 4
 * @min 0
 * @parent BasicSetting
 * 
 * @param MemberHeight
 * @text メンバー表示高さ
 * @desc メンバーの表示高さ。
 * @type number
 * @default 48
 * @parent BasicSetting
 * 
 * @param CharacterMode
 * @text メンバー画像
 * @desc 表示するメンバー画像の表示形式を選択します。
 * @type select
 * @option キャラチップ
 * @value 'chip'
 * @option 顔グラフィック
 * @value 'face'
 * @default 'chip'
 * @parent BasicSetting
 * 
 * @param EraseSe
 * @text 登録消去時SE
 * @desc 登録消去時のSEを指定します。
 * @type struct<SoundEffect>
 * @default {"name":"","volume":"90","pitch":"100","pan":"0"}
 * @parent BasicSetting
 * 
 * @param EraseSymbol
 * @desc 登録削除のキーシンボル名。
 * @text 登録削除キーシンボル名
 * @type combo
 * @option "pageup"
 * @option "pagedown"
 * @default "pageup"
 * @parent BasicSetting
 * 
 * @param ActorPictureEXApp
 * @text 顔グラ表示EX適用
 * @desc 顔グラ表示EXの画像変更を適用します。
 * @type boolean
 * @default false
 * @parent BasicSetting
 * 
 * @param CommandWindowSetting
 * @text コマンドウィンドウ設定
 * @default ------------------------------
 * 
 * @param SelectMembersCommandName
 * @text パーティ選択コマンド名
 * @desc パーティ保存のパーティ選択のコマンド名を記入します。
 * @type string
 * @default パーティ選択
 * @parent CommandWindowSetting
 * 
 * @param RegistrationCommandName
 * @text 登録コマンド名
 * @desc パーティ保存のパーティ登録のコマンド名を記入します。
 * @type string
 * @default パーティ登録
 * @parent CommandWindowSetting
 * 
 * @param Command_X
 * @text コマンドウィンドウX座標
 * @desc コマンドウィンドウX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent CommandWindowSetting
 * 
 * @param Command_Y
 * @text コマンドウィンドウY座標
 * @desc コマンドウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent CommandWindowSetting
 * 
 * @param Command_Width
 * @text コマンドウィンドウ横幅
 * @desc コマンドーウィンドウ横幅
 * @type number
 * @default 0
 * @parent CommandWindowSetting
 * 
 * @param SaveMembersWindowSetting
 * @text 登録パーティウィンドウ設定
 * @default ------------------------------
 * 
 * @param SaveMembers_X
 * @text 登録パーティウィンドウX座標
 * @desc 登録パーティウィンドウX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent SaveMembersWindowSetting
 * 
 * @param SaveMembers_Y
 * @text 登録パーティウィンドウY座標
 * @desc 登録パーティウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent SaveMembersWindowSetting
 * 
 * @param SaveMembers_Rows
 * @text 登録パーティウィンドウ表示行
 * @desc 登録パーティウィンドウの表示行及び最大登録数。
 * @type number
 * @default 8
 * @min 1
 * @parent SaveMembersWindowSetting
 * 
 * @param SceneFormationSetting
 * @text NUUN_SceneFormation設定
 * @default ------------------------------
 * 
 * @param SceneFormationOpenSaveMembers
 * @text SceneFormation登録画面表示
 * @desc NUUN_SceneFormationでのメンバー選択画面からパーティ登録画面を表示します。
 * @type boolean
 * @default true
 * @parent SceneFormationSetting
 * 
 * @param OpenSaveMembersSymbol
 * @desc NUUN_SceneFormationで登録パーティを表示するときのキーシンボル名。
 * @text 登録パーティ表示シンボル名
 * @type combo
 * @option "pageup"
 * @option "pagedown"
 * @default "pageup"
 * @parent SceneFormationSetting
 * 
 */
/*~struct~SoundEffect:ja
 * 
 * @param name
 * @text SEファイル
 * @desc SEを指定します。
 * @type file
 * @dir audio/se
 * 
 * @param volume
 * @text SEの音量
 * @desc SEを音量を設定します。
 * @type number
 * @min 0
 * @default 90
 * 
 * @param pitch
 * @text SEのピッチ
 * @desc SEをピッチを設定します。
 * @type number
 * @default 100
 * 
 * @param pan
 * @text SEの位相
 * @desc SEを位相を設定します。
 * @default 0
 * @max 100
 * @min -100
 * 
 */

var Imported = Imported || {};
Imported.NUUN_SaveMembers = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;

    PluginManager.registerCommand(pluginName, 'SetSaveMembers', args => {
        $gameSystem.setSaveMembers();
    });

    PluginManager.registerCommand(pluginName, 'ResetSaveMembers', args => {
        $gameSystem.resetSaveMembers();
    });

    function _isActorPictureEXApp() {
        return Imported.NUUN_ActorPicture && params.ActorPictureEXApp;
    };

    function _saveMemberCharacterModeWidth() {
        switch (params.CharacterMode) {
            case 'face':
                return ImageManager.faceWidth + Window_Base.prototype.itemPadding.call(this);
            case 'chip':
                return 56;
        }
    };

    NuunManager.getSaveMembersEraseSymbol = function() {
        return params.EraseSymbol;
    };

    NuunManager.getOpenSaveMembersSymbol = function() {
        return params.OpenSaveMembersSymbol;
    };

    NuunManager.getSceneFormationOpenSaveMembers = function() {
        return params.SceneFormationOpenSaveMembers;
    };
    
    NuunManager.playSaveMembersEraseSe = function() {
        AudioManager.playSe(params.EraseSe);
    };

    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this._saveMembers = [];
    };

    Game_System.prototype.getSaveMembersNum = function() {
        if (!this._saveMembers) {
            this.resetSaveMembers();
        }
        return this._saveMembers.length;
    };

    Game_System.prototype.setSaveMembers = function() {
        if (!this._saveMembers) {
            this.resetSaveMembers();
        }
        this._saveMembers.push($gameParty._actors.clone());
    };

    Game_System.prototype.eraseSaveMembers = function(index) {
        if (!this._saveMembers) {
            this.resetSaveMembers();
        }
        this._saveMembers.splice(index, 1);
    };

    Game_System.prototype.resetSaveMembers = function() {
        this._saveMembers = [];
    };

    Game_System.prototype.setSavePartyMembers = function(index) {
        const _actors = this._saveMembers[index].filter(id => $gameParty._actors.includes(id));
        if (_actors.length > 0 ) {
            $gameParty._actors = _actors;
            $gamePlayer.refresh();
            return true;
        }
        return false;
    };

    Game_System.prototype.isSavePartyMembers = function(index) {
        switch (params.SaveMembersMode) {
            case 'exclusion':
                return this.isSavePartyMembersSome(index);
            case 'match':
                return this.isSavePartyMembersEvery(index);
        }
        return false;
    };

    Game_System.prototype.isSavePartyMembersEvery = function(index) {
        const members = this._saveMembers[index];
        return members.every(member => $gameParty._actors.includes(member));
    };

    Game_System.prototype.isSavePartyMembersSome = function(index) {
        const members = this._saveMembers[index];
        return members.some(member => $gameParty._actors.includes(member));
    };
 

    const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _Scene_Menu_createCommandWindow.apply(this, arguments);
        this._commandWindow.setHandler("saveParty", this.commandSaveParty.bind(this));
    };

    Scene_Menu.prototype.commandSaveParty = function() {
        SceneManager.push(Scene_SavePartyMembers);
    };

    Scene_Base.prototype.saveMembersWindowRect = function() {
        const wx = params.SaveMembers_X;
        const wy = params.SaveMembers_Y;
        const ww = this.nuun_SaveMemberWindowWidth();
        const wh = 32 + params.SaveMembers_Rows * (params.MemberHeight + Window_Selectable.prototype.rowSpacing.call(this));
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Base.prototype.nuun_SaveMemberWindowWidth = function() {
        if (params.MaxShowSaveMembers > 0) {
            return $gameSystem.windowPadding() * 2 + params.MaxShowSaveMembers * _saveMemberCharacterModeWidth();
        } else {
            return $gameSystem.windowPadding() * 2 + (Imported.NUUN_SceneFormation ? $gameParty.originalMaxBattleMembers() : $gameParty.maxBattleMembers()) * this.characterModeWidth();
        }
    };

    
    function Scene_SavePartyMembers() {
        this.initialize(...arguments);
    }
      
    Scene_SavePartyMembers.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_SavePartyMembers.prototype.constructor = Scene_SavePartyMembers;
      
    Scene_SavePartyMembers.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);

    };

    Scene_SavePartyMembers.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createSavePartyCommandWindow();
        this.createSavePartyMembersWindow();
    };

    Scene_SavePartyMembers.prototype.createSavePartyCommandWindow = function() {
        const rect = this.commandWindowRect();
        const commandWindow = new Window_SavePartyCommand(rect);
        commandWindow.setHandler("selectMembers", this.commandSelectMembers.bind(this));
        commandWindow.setHandler("saveMembers", this.commandSaveMembers.bind(this));
        commandWindow.setHandler("cancel", this.popScene.bind(this));
        this.addWindow(commandWindow);
        this._commandWindow = commandWindow;
    };

    Scene_SavePartyMembers.prototype.commandWindowRect = function() {
        const ww = params.Command_Width > 0 ? params.Command_Width : this.mainCommandWidth();
        const wh = this.calcWindowHeight(3, true);
        const wx = params.Command_X;
        const wy = params.Command_Y;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_SavePartyMembers.prototype.createSavePartyMembersWindow = function() {
        const rect = this.saveMembersWindowRect();
        this._saveMembersWindow = new Window_SaveMembers(rect);
        this._saveMembersWindow.setHandler("ok", this.onSaveMembersOk.bind(this));
        this._saveMembersWindow.setHandler("cancel", this.onSaveMembersCancel.bind(this));
        this._saveMembersWindow.setHandler(NuunManager.getSaveMembersEraseSymbol(), this.onSaveMembersEraseOk.bind(this));
        this.addWindow(this._saveMembersWindow);
    };

    Scene_SavePartyMembers.prototype.commandSelectMembers = function() {
        this._commandWindow.deactivate();
        this._saveMembersWindow.activate();
        this._saveMembersWindow.select(0);
    };

    Scene_SavePartyMembers.prototype.commandSaveMembers = function() {
        if (params.SaveMembers_Rows > $gameSystem.getSaveMembersNum()) {
            $gameSystem.setSaveMembers();
            this._saveMembersWindow.refresh();
        } else {
            SoundManager.playBuzzer();
        }
        this._commandWindow.activate();
    };

    Scene_SavePartyMembers.prototype.onSaveMembersOk = function() {
        if ($gameSystem.setSavePartyMembers(this._saveMembersWindow.index())) {
            this.onSaveMembersCancel();
        } else {
            SoundManager.playBuzzer();
            this._saveMembersWindow.activate();
        }
    };

    Scene_SavePartyMembers.prototype.onSaveMembersCancel = function() {
        this._saveMembersWindow.deactivate();
        this._saveMembersWindow.deselect();
        this._commandWindow.activate();
        this._commandWindow.selectLast();
    };

    Scene_SavePartyMembers.prototype.onSaveMembersEraseOk = function() {
        $gameSystem.eraseSaveMembers(this._saveMembersWindow.index());
        this._saveMembersWindow.refresh();
        this._saveMembersWindow.activate();
        const index = Math.min(this._saveMembersWindow.index(), $gameSystem.getSaveMembersNum() - 1);
        this._saveMembersWindow.forceSelect(index);
        NuunManager.playSaveMembersEraseSe();
        if ($gameSystem.getSaveMembersNum() === 0) {
            this.onSaveMembersCancel();
        }
    };


    const _Window_MenuCommand_addFormationCommand = Window_MenuCommand.prototype.addFormationCommand;
    Window_MenuCommand.prototype.addFormationCommand = function() {
        _Window_MenuCommand_addFormationCommand.apply(this, arguments);
        if (params.ShowCommand && this.needsCommand("formation")) {
            const enabled = this.isFormationEnabled();
            this.addCommand(params.CommandName, "saveParty", enabled);
        }
    };

    function Window_SavePartyCommand() {
        this.initialize(...arguments);
    }
    
    Window_SavePartyCommand.prototype = Object.create(Window_Command.prototype);
    Window_SavePartyCommand.prototype.constructor = Window_SavePartyCommand;
    
    Window_SavePartyCommand._lastCommandSymbol = null;

    Window_SavePartyCommand.prototype.initialize = function(rect) {
        Window_Command.prototype.initialize.call(this, rect);
        this.selectLast();
    };

    Window_SavePartyCommand.prototype.makeCommandList = function() {
        this.addMainCommands();
    };

    Window_SavePartyCommand.prototype.addMainCommands = function() {
        this.addCommand(params.SelectMembersCommandName, "selectMembers", true);
        this.addCommand(params.RegistrationCommandName, "saveMembers", true);
        this.addCommand("戻る", "cancel", true);
    };

    Window_SavePartyCommand.prototype.processOk = function() {
        Window_SavePartyCommand._lastCommandSymbol = this.currentSymbol();
        Window_Command.prototype.processOk.call(this);
    };
    
    Window_SavePartyCommand.prototype.selectLast = function() {
        this.selectSymbol(Window_SavePartyCommand._lastCommandSymbol);
    };

    function Window_SaveMembers() {
        this.initialize(...arguments);
    }
    
    Window_SaveMembers.prototype = Object.create(Window_StatusBase.prototype);
    Window_SaveMembers.prototype.constructor = Window_SaveMembers;

    Window_SaveMembers.prototype.initialize = function(rect) {
        Window_StatusBase.prototype.initialize.call(this, rect);
        this._actorImgData = params.CharacterMode === 'face' && _isActorPictureEXApp() ? new Nuun_ActorGraphics(this) : null;
        this.refresh();
    };

    Window_SaveMembers.prototype.maxItems = function() {
        return $gameSystem.getSaveMembersNum();
    };

    Window_SaveMembers.prototype.itemHeight = function() {
        return Math.floor(this.innerHeight / params.SaveMembers_Rows);
    };

    Window_SaveMembers.prototype.actorWidth = function() {
        return Math.floor(this.innerWidth / this.getMaxBattleMembers()) - this.colSpacing();
    };

    Window_SaveMembers.prototype.isCurrentItemEnabled = function() {
        return this.isSavePartyMembers(this.index());
    };

    Window_SaveMembers.prototype.isSavePartyMembers = function(index) {
        return $gameSystem.isSavePartyMembers(index);
    };

    Window_SaveMembers.prototype.getSavePartyMembers = function(index) {
        return $gameSystem._saveMembers[index].slice(0, this.getMaxBattleMembers()).map(id => $gameActors.actor(id));
    };

    Window_SaveMembers.prototype.getMaxBattleMembers = function() {
        return Imported.NUUN_SceneFormation ? $gameParty.originalMaxBattleMembers() : $gameParty.maxBattleMembers();
    };

    Window_SaveMembers.prototype.drawItem = function(index) {
        const rect = this.itemRect(index);
        this.changePaintOpacity(this.isSavePartyMembers(index));
        this.getSavePartyMembers(index).forEach((actor, i) => {
            if (actor) {
                const bitmap = this.loadCheckBitmap(actor);
                if (bitmap) {
                    bitmap.addLoadListener(function() {
                        this.drawItemImage(actor, rect, i);
                    }.bind(this));
                } else {
                    this.drawItemImage(actor, rect, i);
                }
            } else {
                this.drawText('-', rect.x, rect.y + 4, rect.width, "center");
            }
        });
        this.changePaintOpacity(true);
    };

    Window_SaveMembers.prototype.drawItemImage = function(actor, rect, index) {
        if (params.CharacterMode === 'chip') {
            this.drawFormationCharacter(actor, rect.x + _saveMemberCharacterModeWidth() * index, rect.y, rect.width);
        } else if (params.CharacterMode === 'face') {
            this.drawFormationFace(actor, rect.x + _saveMemberCharacterModeWidth() * index, rect.y, Math.min(rect.width, ImageManager.faceWidth), Math.min(rect.height, ImageManager.faceHeight));
        }
    };

    Window_SaveMembers.prototype.loadCheckBitmap = function(actor) {
        let bitmap = null;
        let loadBitmap = null;
        if (params.CharacterMode === 'chip') {
            loadBitmap = ImageManager.loadCharacter(actor.characterName());
        } else if (params.CharacterMode === 'face') {
            if (this._actorImgData) {
                this._actorImgData.setup(actor);
                loadBitmap = this._actorImgData.loadActorFace();
            } else {
                loadBitmap = ImageManager.loadFace(actor.faceName());
            }
        }
        if (loadBitmap && !loadBitmap.isReady()) {
            bitmap = loadBitmap;
        }
        return bitmap;
    };

    Window_SaveMembers.prototype.drawFormationCharacter = function(actor, x, y, width) {
        let x2 = x + this.actorWidth() / 2;
        let y2 = y + this.itemHeight() - this.rowSpacing() * 2;
        this.drawCharacter(actor.characterName(), actor.characterIndex(), x2, y2);
    };

    Window_SaveMembers.prototype.drawFormationFace = function(actor, x, y, width, height) {
        if (_isActorPictureEXApp()) {
            if (this._actorImgData) {
                this._actorImgData.setup(actor);
            }
            this.actorPictureEXDrawFace(actor, x + 1, y + 1, width - 2, height - 2);
        } else {
            this.drawActorFace(actor, x + 1, y + 1, width - 2, height - 2);
        }
    };

    Window_SaveMembers.prototype.actorPictureEXDrawFace = function(actor, x, y, width, height) {
        this.drawFace(this._actorImgData.getActorGraphicFace(), this._actorImgData.getActorGraphicFaceInde(), x, y, width, height);
    };

    Window_SaveMembers.prototype.itemRect = function(index) {
        const rect = Window_Selectable.prototype.itemRect.call(this, index);
        rect.height = Math.min(rect.height, params.MemberHeight);
        rect.y += this.rowSpacing();
        return rect;
    };

    window.Window_SaveMembers = Window_SaveMembers;
    
})();