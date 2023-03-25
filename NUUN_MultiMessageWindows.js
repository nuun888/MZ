/*:-----------------------------------------------------------------------------------
 * NUUN_MultiMessageWindows.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Multiple message windows
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * You can now display multiple message windows.
 * 
 * Specify the ID of the message in the message window setting of the plug-in command before the message of the event command.
 * At that time, please turn on "Other message window persistent display".
 * 
 * Since the message window with other message window persistent display turned ON does not close automatically, close the window with the plug-in command "Close message window".
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * @command MultiMessageSetting
 * @desc Set the message window.
 * @text Message window settings
 * 
 * @arg Id
 * @type number
 * @default 0
 * @text Window ID
 * @desc Sets the id of the window.
 * @min 0
 * 
 * @arg MultiMessage
 * @desc Leave it open even if other message windows appear.
 * @text Other message window persistent display
 * @type boolean
 * @default true
 * 
 * 
 * @command MultiMessageClose
 * @desc Closes the message window with the specified ID.
 * @text Close message window
 * 
 * @arg Id
 * @type number
 * @default 0
 * @text Window ID
 * @desc Sets the id of the window. -1 clears all message windows.
 * @min -1
 * 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 複数メッセージウィンドウ
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * メッセージウィンドウを複数表示させることが出来るようになります。
 * 
 * イベントコマンドのメッセージの前にプラグインコマンドのメッセージウィンドウ設定でメッセージのIDを指定してください。
 * その際に他メッセージウィンドウ持続表示をONにしてください。
 * 
 * 他メッセージウィンドウ持続表示をONにしたメッセージウィンドウは自動ではウィンドウが閉じませんので、プラグインコマンドの
 * メッセージウィンドウクローズでウィンドウを閉じます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * @command MultiMessageSetting
 * @desc メッセージウィンドウの設定を行います。
 * @text メッセージウィンドウ設定
 * 
 * @arg Id
 * @type number
 * @default 0
 * @text ウィンドウID
 * @desc ウィンドウのIDを設定します。
 * @min 0
 * 
 * @arg MultiMessage
 * @desc 他のメッセージウィンドウが表示されても表示したままにします。
 * @text 他メッセージウィンドウ持続表示
 * @type boolean
 * @default true
 * 
 * 
 * @command MultiMessageClose
 * @desc 指定のIDのメッセージウィンドウを閉じます。
 * @text メッセージウィンドウクローズ
 * 
 * @arg Id
 * @type number
 * @default 0
 * @text ウィンドウID
 * @desc ウィンドウのIDを設定します。-1で全てのメッセージウインドウを消去します。
 * @min -1
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_MultiMessageWindows = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_MultiMessageWindows');
    const pluginName = "NUUN_MultiMessageWindows";

    PluginManager.registerCommand(pluginName, 'MultiMessageSetting', args => {
        $gameTemp.setMessageWindowId(Number(args.Id));
        $gameTemp.setMessageMode(eval(args.MultiMessage));
    });

    PluginManager.registerCommand(pluginName, 'MultiMessageClose', args => {
        $gameMessage.setCloseMessageId(Number(args.Id));
    });


    const _Game_Temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function() {
        _Game_Temp_initialize.call(this);
        this.MultiMessageWindow = [0, false, false];
    };

    Game_Temp.prototype.setMessageWindowId = function(id) {
        this.MultiMessageWindow[0] = id;
    };

    Game_Temp.prototype.setMessageMode = function(flag) {
        this.MultiMessageWindow[1] = flag;
    };

    Game_Temp.prototype.getMessageWindowId = function() {
        return this.MultiMessageWindow[0];
    };

    Game_Temp.prototype.getMessageMode = function() {
        return this.MultiMessageWindow[1];
    };

    const _Game_Message_clear = Game_Message.prototype.clear;
    Game_Message.prototype.clear = function() {
        _Game_Message_clear.call(this);
        this._closeMultiMessageId = -2;
    };

    Game_Message.prototype.setCloseMessageId = function(id) {
        this._closeMultiMessageId = id;
    };

    //Game_Message.prototype.hasText = function() {
    //    return this._texts.length > 0;
    //};

    Game_Message.prototype.getCloseMessageId = function() {
        return this._closeMultiMessageId;
    };

    const _Game_Message_add = Game_Message.prototype.add;
    Game_Message.prototype.add = function(text) {
        _Game_Message_add.call(this, text);
        $gameTemp.multiMessage = true;
    };


    const _Scene_Base_update = Scene_Base.prototype.update;
    Scene_Base.prototype.update = function() {
        this.multiMessageWindows();
        _Scene_Base_update.call(this);
        this.closeMultiMessageWindows();
    };

    Scene_Base.prototype.multiMessageWindows = function() {
        if (this._messageWindows && $gameTemp.multiMessage) {
            if (!this._messageWindows[$gameTemp.getMessageWindowId()]) {
                this.createMultiMessageWindow();
            } else {
                this.updateMultiMessageAssociateWindows();
            }
            $gameTemp.multiMessage = false;
        }
    };

    Scene_Base.prototype.closeMultiMessageWindows = function() {
        const id = $gameMessage.getCloseMessageId();
        if (id >= 0 && this._messageWindows[id]) {
            this._messageWindows[id].multiMessageMode = false;
            this._messageWindows[id].terminateMessage();
        } else if (id === -1) {
            for (const window of this._messageWindows) {
                window.multiMessageMode = false;
                window.terminateMessage();
            }
        }
    };

    const _Scene_Message_initialize = Scene_Message.prototype.initialize;
    Scene_Message.prototype.initialize = function() {
        this._messageWindows = [];
        this._nameBoxWindows = [];
        _Scene_Message_initialize.call(this);
    };

    Scene_Message.prototype.createMultiMessageWindow = function() {
        const rect = this.messageWindowRect();
        const window = new Window_Message(rect);
        const windowId = $gameTemp.getMessageWindowId();
        window.multiMessageId = windowId;
        window.multiMessageMode = $gameTemp.getMessageMode();
        this._messageWindows.push(window);
        this.addWindow(window);
        this.createMultiMessageNameBoxWindow(windowId);
        this.updateMultiMessageAssociateWindows();
    };

    Scene_Message.prototype.updateMultiMessageAssociateWindows = function() {
        const id = $gameTemp.getMessageWindowId();
        this._messageWindows[id].multiMessageMode = $gameTemp.getMessageMode();
        //元データを一時的に退避
        const evacuation = this._messageWindow;
        const nameEvacuation = this._nameBoxWindow;
        this._messageWindow = this._messageWindows[id];
        this._nameBoxWindow = this._nameBoxWindows[id];
        this.associateWindows();
        this._messageWindow = evacuation;
        this._nameBoxWindow = nameEvacuation;
    };

    Scene_Message.prototype.createMultiMessageNameBoxWindow = function(windowId) {
        if (!this._nameBoxWindows[windowId]) {
            const nameBoxWindow = new Window_NameBox();
            this.addWindow(nameBoxWindow);
            this._nameBoxWindows[windowId] = nameBoxWindow;
        }
    };


    const _Window_Message_canStart = Window_Message.prototype.canStart;
    Window_Message.prototype.canStart = function() {
        return _Window_Message_canStart.call(this) && this.isMultiMessage();
    };

    Window_Message.prototype.isMultiMessage = function() {
        return this.multiMessageId === $gameTemp.getMessageWindowId();
    };

    Window_Message.prototype.isCloseMultiMessage = function() {
        return !this.multiMessageMode;
    };

    const _Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
    Window_Message.prototype.terminateMessage = function() {
        if (this.isCloseMultiMessage()) {
            _Window_Message_terminateMessage.call(this);
        }
        $gameMessage.clear();
    };


})();