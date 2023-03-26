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
 * @version 1.0.1
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
 * Log
 * 3/26/2023 Ver.1.0.1
 * Correction of processing.
 * 3/25/2023 Ver.1.0.0
 * First edition.
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
 * @version 1.0.1
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
 * 更新履歴
 * 2023/3/26 Ver.1.0.1
 * 処理の修正。
 * 2023/3/25 Ver.1.0.0
 * 初版。
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
        setMultiMessageWindow(args);
    });

    PluginManager.registerCommand(pluginName, 'MultiMessageClose', args => {
        closeMultiMessageWindow(Number(args.Id));
    });

    function setMultiMessageWindow(args) {
        SceneManager._scene.setMultiMessageWindow(args);
    };

    function closeMultiMessageWindow(id) {
        SceneManager._scene.closeMultiMessageWindow(id);
    };


    const _Scene_Message_initialize = Scene_Message.prototype.initialize;
    Scene_Message.prototype.initialize = function() {
        this._multiMessageWindowsList = [];
        this._messageWindows = [];
        this._nameBoxWindows = [];
        _Scene_Message_initialize.call(this);
    };

    Scene_Message.prototype.setMultiMessageWindow = function(args) {
        this._multiMessageWindowsList[0] = {id: Number(args.Id), mode: eval(args.MultiMessage), active: false};
        if (!this._messageWindows[Number(args.Id)]) {
            this.createMultiMessageWindow();
            this.createMultiMessageNameBoxWindow();
        }
        $gameTemp.activeMultiMessageId = Number(args.Id);
        this.associateWindows();
    };

    Scene_Message.prototype.shiftMessageWindowId = function() {
        if (this._multiMessageWindowsList.length > 0) {
            this._multiMessageWindowsList.shift();
        }
    };

    Scene_Message.prototype.getmultiMessageWindowId = function() {
        return this._multiMessageWindowsList[0] !== undefined ? this._multiMessageWindowsList[0].id : 0;
    };

    Scene_Message.prototype.getmultiMessageMode = function() {
        return this._multiMessageWindowsList[0] !== undefined ? this._multiMessageWindowsList[0].mode : false;
    };

    Scene_Message.prototype.getActivemultiMessage = function() {
        return this._multiMessageWindowsList[0] !== undefined? this._multiMessageWindowsList[0].active : false;
    };

    Scene_Message.prototype.createMessageWindow = function() {//再定義
        this.createMultiMessageWindow();
    };

    Scene_Message.prototype.createNameBoxWindow = function() {//再定義
        this.createMultiMessageNameBoxWindow();
    };

    Scene_Message.prototype.createMultiMessageWindow = function() {
        const rect = this.messageWindowRect();
        const window = new Window_MultiMessage(rect);
        const windowId = this.getmultiMessageWindowId();
        window.multiMessageId = windowId;
        window.multiMessageMode = this.getmultiMessageMode();
        this._messageWindows[windowId] = window;
        this.addWindow(window);
    };

    Scene_Message.prototype.createMultiMessageNameBoxWindow = function() {
        const windowId = this.getmultiMessageWindowId();
        if (!this._nameBoxWindows[windowId]) {
            const nameBoxWindow = new Window_NameBox();
            this.addWindow(nameBoxWindow);
            this._nameBoxWindows[windowId] = nameBoxWindow;
        }
    };

    Scene_Message.prototype.closeMultiMessageWindow = function(id) {
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

    const _Scene_Message_associateWindows = Scene_Message.prototype.associateWindows;
    Scene_Message.prototype.associateWindows = function() {
        const id = this.getmultiMessageWindowId();
        this._messageWindows[id].multiMessageMode = this.getmultiMessageMode();
        this._messageWindow = this._messageWindows[id];
        this._nameBoxWindow = this._nameBoxWindows[id];
        _Scene_Message_associateWindows.call(this);
    };


    function Window_MultiMessage() {
        this.initialize(...arguments);
    }
    
    Window_MultiMessage.prototype = Object.create(Window_Message.prototype);
    Window_MultiMessage.prototype.constructor = Window_MultiMessage;
    
    Window_MultiMessage.prototype.initialize = function(rect) {
        Window_Message.prototype.initialize.call(this, rect);

    };

    const _Window_Message_canStart = Window_Message.prototype.canStart;
    Window_MultiMessage.prototype.canStart = function() {
        return _Window_Message_canStart.call(this) && this.isMultiMessage();
    };

    Window_MultiMessage.prototype.isMultiMessage = function() {
        return this.multiMessageId === $gameTemp.activeMultiMessageId;
    };

    Window_MultiMessage.prototype.doesContinue = function() {
        return this.multiMessageMode && $gameMessage.hasText();
    };

})();