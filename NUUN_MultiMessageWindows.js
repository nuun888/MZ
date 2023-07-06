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
 * @version 1.1.9
 * 
 * @help
 * You can now display multiple message windows.
 * 
 * Specify the ID of the message in the message window setting of the plug-in command before the message of the event command.
 * At that time, please turn on "Other message window persistent display".
 * 
 * If you display multiple message windows with the other message window persistent display ON, the window that was opened later will be closed in order.
 * If you want to close the specified message window, use "MultiMessageClose".
 * If the key is disabled, please close the window with "MultiMessageClose".
 * 
 * MultiMessage
 * Be sure to turn it ON to display multiple message windows.
 * 
 * Simultaneous
 * Displayed at the same time as the next message window.
 * If you execute an event command that waits in between, the display timing will shift.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 7/7/2023 Ver.1.1.9
 * Fixed the problem that the window is not displayed when displaying the input system window.
 * 6/27/2023 Ver.1.1.8
 * Fixed an issue where windows could be moved when opening.
 * Fix processing.
 * Fixed function error.
 * 6/25/2023 Ver.1.1.7
 * Conflict support with NRP_MapTravel.
 * Fixed the problem that if you close one window after opening multiple windows, you can move regardless of the move permission setting.
 * 4/22/2023 Ver.1.1.6
 * Fixed an issue that allowed players to walk when displaying normal windows.
 * Added function to initialize window settings.
 * 4/8/2023 Ver.1.1.5
 * Added function to disable key operation.
 * 4/2/2023 Ver.1.1.4
 * Fixed the problem that the message window is not displayed and the event command cannot be executed when trying to display the message window after switching scenes.
 * 4/2/2023 Ver.1.1.3
 * Fixed the problem that the menu etc. will not open when closing the message window under certain conditions.
 * Fixed the problem that an error occurs when batch deleting windows after specifying the jump number ID.
 * 4/2/2023 Ver.1.1.2
 * Added a function to specify the display position of the name window.
 * 4/1/2023 Ver.1.1.1
 * Added a function to allow movement while the message window is displayed.
 * 4/1/2023 Ver.1.1.0
 * Fixed so that the pause sign appears in all message windows while messages are displayed.
 * 3/26/2023 Ver.1.0.2
 * Fixed an issue that caused players to become incapacitated when trying to display a message window without specifying an ID.
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
 * @arg Simultaneous
 * @desc It will be displayed together with the next message.
 * @text Simultaneous display of next message
 * @type boolean
 * @default false
 * 
 * @arg NoBusy
 * @desc Allows player movement while the message window is displayed.
 * @text Permission to move player
 * @type boolean
 * @default false
 * 
 * @arg KeyInvalid
 * @desc Disable key operation when "Permission to move player" is enabled.
 * @text Disable key operation
 * @type boolean
 * @default false
 * 
 * 
 * @arg NameWindowPosition
 * @desc Specifies the position of the name window to display.
 * @text name window position
 * @type select
 * @option Default
 * @value 'default'
 * @option Left
 * @value 'left'
 * @option Right
 * @value 'right'
 * @default 'default'
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
 * @command ResetMultiMessage
 * @desc Returns the settings of the message window to the initial state.
 * @text Message window initial state
 * 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 複数メッセージウィンドウ
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.1.9
 * 
 * @help
 * メッセージウィンドウを複数表示させることが出来るようになります。
 * 
 * イベントコマンドのメッセージの前にプラグインコマンドのメッセージウィンドウ設定でメッセージのIDを指定してください。
 * その際に他メッセージウィンドウ持続表示をONにしてください。
 * 
 * 他メッセージウィンドウ持続表示をONにしたメッセージウィンドウを複数表示させた場合は、後に開いたウィンドウから順に閉じます。
 * 指定のメッセージウィンドウを閉じたい場合はメッセージウィンドウクローズを使用します。
 * キー無効に設定している場合は、メッセージウィンドウクローズでウィンドウを閉じてください。
 * 
 * 他メッセージウィンドウ持続表示
 * 複数のメッセージウィンドウを表示させるには必ずONにしてください。
 * 
 * 次メッセージ同時表示
 * 次に表示されるメッセージウィンドウと同時に表示します。
 * 間にウエイトを行うイベントコマンドを実行すると表示タイミングがずれます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/7/7 Ver.1.1.9
 * 入力系ウィンドウを表示したときにウィンドウが表示されない問題を修正。
 * 2023/6/27 Ver.1.1.8
 * ウィンドウを開くときに移動できてしまう問題を修正。
 * 処理の修正。
 * 関数ミス修正。
 * 2023/6/25 Ver.1.1.7
 * 複数ウィンドウを開いた後に、一つのウィンドウを閉じると移動許可設定に関わらず移動できてしまう問題を修正。
 * 2023/4/22 Ver.1.1.6
 * 通常のウィンドウを表示したときにプレイヤーが歩行できてしまう問題を修正。
 * ウィンドウの設定を初期化する機能を追加。
 * 2023/4/8 Ver.1.1.5
 * キー操作を無効にする機能を追加。
 * 2023/4/3 Ver.1.1.4
 * シーン切り替え後にメッセージウィンドウを表示させようとすると、メッセージウィンドウが表示されずイベントコマンドが実行できなくなる問題を修正。
 * 2023/4/2 Ver.1.1.3
 * 特定の条件でメッセージウィンドウを閉じるとメニュー等が開かなくなる問題を修正。
 * 飛び番のIDを指定した後にウィンドウを一括削除するとエラーが出る問題を修正。
 * 2023/4/2 Ver.1.1.2
 * ネームウィンドウの表示位置を指定できる機能を追加。
 * 2023/4/1 Ver.1.1.1
 * メッセージウィンドウ表示中に移動を許可する機能を追加。
 * 2023/4/1 Ver.1.1.0
 * メッセージ表示中は全てのメッセージウィンドウでポーズサインが出るように修正。
 * メッセージウィンドウを他のウィンドウと同時に表示する機能を追加。
 * 2023/3/26 Ver.1.0.2
 * IDを指定せずにメッセージウィンドウを表示させようとすると、行動不能になる問題を修正。
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
 * @arg Simultaneous
 * @desc 次に表示されるメッセージと同時表示させます。
 * @text 次メッセージ同時表示
 * @type boolean
 * @default false
 * 
 * @arg NoBusy
 * @desc メッセージウィンドウ表示中のプレイヤーの移動を許可します。
 * @text プレイヤー移動許可
 * @type boolean
 * @default false
 * 
 * @arg KeyInvalid
 * @desc プレイヤー移動許可が有効時、キー操作を無効にします。
 * @text キー操作無効
 * @type boolean
 * @default false
 * 
 * @arg NameWindowPosition
 * @desc 表示するネームウィンドウの位置を指定します。
 * @text ネームウィンドウ位置
 * @type select
 * @option デフォルト
 * @value 'default'
 * @option 左
 * @value 'left'
 * @option 右
 * @value 'right'
 * @default 'default'
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
 * @command ResetMultiMessage
 * @desc メッセージウィンドウの設定を初期状態に戻します。
 * @text メッセージウィンドウ初期状態
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

    PluginManager.registerCommand(pluginName, 'ResetMultiMessage', args => {
        SceneManager._scene.resetMultiMessageWindow();
    });

    PluginManager.registerCommand(pluginName, 'DefaultMessageWindow', args => {
        $gameSystem.defaultMessageWindow = true;
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
        $gameTemp.activeMultiMessageId = 0;
        $gameSystem.defaultMessageWindow = false;
        _Scene_Message_initialize.call(this);
    };

    const _Scene_Base_update = Scene_Base.prototype.update;
    Scene_Base.prototype.update = function() {
        _Scene_Base_update.call(this);
    };

    Scene_Message.prototype.setMultiMessageWindow = function(args) {
        this._multiMessageWindowsList[0] = 
        {id: Number(args.Id), 
            mode: eval(args.MultiMessage), 
            noBusy: eval(args.NoBusy), 
            simultaneous: eval(args.Simultaneous), 
            nameBox: NuunManager.getEvalCode(String(args.NameWindowPosition)),
            keyInvalid: eval(args.KeyInvalid),
        };
        if (!this._messageWindows[Number(args.Id)]) {
            this.createMultiMessageWindow();
            this.createMultiMessageNameBoxWindow();
        }
        $gameTemp.activeMultiMessageId = Number(args.Id);
        $gameSystem.defaultMessageWindow = false;
        this.associateMultiWindows();
    };

    Scene_Message.prototype.resetMultiMessageWindow = function() {
        this._multiMessageWindowsList[0] = 
        {id: 0, 
            mode: false, 
            noBusy: false, 
            simultaneous: false, 
            nameBox: 'default',
            keyInvalid: false,
        };
        $gameTemp.activeMultiMessageId = 0;
        this.associateMultiWindows();
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

    Scene_Message.prototype.getNoBusyMessage = function() {
        return this._multiMessageWindowsList[0] !== undefined ? this._multiMessageWindowsList[0].noBusy : false;
    };

    Scene_Message.prototype.getSimultaneous = function() {
        return this._multiMessageWindowsList[0] !== undefined ? this._multiMessageWindowsList[0].simultaneous : false;
    };

    Scene_Message.prototype.getNameBoxPosition = function() {
        return this._multiMessageWindowsList[0] !== undefined ? this._multiMessageWindowsList[0].nameBox : 'default';
    };

    Scene_Message.prototype.getMessageKeyInvalid = function() {
        return this._multiMessageWindowsList[0] !== undefined ? this._multiMessageWindowsList[0].keyInvalid : false;
    };

    const _Scene_Message_createAllWindows = Scene_Message.prototype.createAllWindows;
    Scene_Message.prototype.createAllWindows = function() {
        _Scene_Message_createAllWindows.call(this);
        this.associateMultiWindows();
    };

    const _Scene_Message_createMessageWindow = Scene_Message.prototype.createMessageWindow;
    Scene_Message.prototype.createMessageWindow = function() {
        _Scene_Message_createMessageWindow.call(this);
        if (this.createMultiMessageWindow) {
            this.createMultiMessageWindow();
        }
    };

    const _Scene_Message_createNameBoxWindow = Scene_Message.prototype.createNameBoxWindow;
    Scene_Message.prototype.createNameBoxWindow = function() {
        _Scene_Message_createNameBoxWindow.call(this);
        if (this.createMultiMessageNameBoxWindow) {
            this.createMultiMessageNameBoxWindow();
        }
    };

    Scene_Message.prototype.createMultiMessageWindow = function() {
        const rect = this.messageWindowRect();
        const window = new Window_MultiMessage(rect);
        const windowId = this.getmultiMessageWindowId();
        window.multiMessageId = windowId;
        window.multiMessageMode = this.getmultiMessageMode();
        window.simultaneousMode = this.getSimultaneous();
        window.noBusy = this.getNoBusyMessage();
        window.keyInvalid = this.getMessageKeyInvalid();
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
        if (id >= 0 && this._messageWindows[id] && this._messageWindows[id].isOpen()) {
            this._messageWindows[id].multiMessageMode = false;
            this._messageWindows[id].terminateMessage();
            this._messageWindows[id].pause = false;
        } else if (id === -1) {
            for (const window of this._messageWindows) {
                if (window && window.isOpen()) {
                    window.multiMessageMode = false;
                    window.terminateMessage();
                    window.pause = false;
                }
            }
        }
    };

    const _Scene_Message_associateWindows = Scene_Message.prototype.associateWindows;
    Scene_Message.prototype.associateMultiWindows = function() {
        const messageWindow = this._messageWindow;
        const nameBoxWindow = this._nameBoxWindow;
        const id = this.getmultiMessageWindowId();
        const window = this._messageWindows[id];
        window.multiMessageMode = this.getmultiMessageMode();
        window.simultaneousMode = this.getSimultaneous();
        window.noBusy = this.getNoBusyMessage();
        window.keyInvalid = this.getMessageKeyInvalid();
        this._messageWindow = window;
        this._nameBoxWindow = this._nameBoxWindows[id];
        this._nameBoxWindow.setBoxPosition(this.getNameBoxPosition(this._messageWindow))
        _Scene_Message_associateWindows.call(this);
        this._messageWindow = messageWindow;
        this._nameBoxWindow = nameBoxWindow;
    };

    Scene_Message.prototype.noBusyMultiMessageWindow = function() {
        return this._messageWindows.some(window => {
            return window.visible && (window.isOpen() || window.isOpening()) && !window.noBusy;
        });
    };

    function Window_MultiMessage() {
        this.initialize(...arguments);
    }
    
    Window_MultiMessage.prototype = Object.create(Window_Message.prototype);
    Window_MultiMessage.prototype.constructor = Window_MultiMessage;
    
    Window_MultiMessage.prototype.initialize = function(rect) {
        this.multiMessageId = 0;
        this.multiMessageMode = false;
        this.simultaneousMode = false;
        this.noBusy = false;
        this.keyInvalid = false;
        Window_Message.prototype.initialize.call(this, rect);
    };

    const _Window_Message_canStart = Window_Message.prototype.canStart;
    Window_MultiMessage.prototype.canStart = function() {
        return _Window_Message_canStart.call(this) && this.isMultiMessage();
    };

    Window_Message.prototype.canStart = function() {
        return false;
    };

    Window_MultiMessage.prototype.isMultiMessage = function() {
        return this.multiMessageId === ($gameTemp.activeMultiMessageId || 0);
    };

    const _Window_Message_doesContinue = Window_Message.prototype.doesContinue;
    Window_MultiMessage.prototype.doesContinue = function() {
        if (this.multiMessageMode) {
            return this.multiMessageMode && $gameMessage.hasText();
        } else {
            return _Window_Message_doesContinue.call(this);
        }
    };

    const _Window_Message_startMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function() {
        const textState = this._textState;
        _Window_Message_startMessage.call(this);
        if (!textState && this.simultaneousMode) {
            $gameMessage.clear();
            this.simultaneousMode = false;
        }
    };

    const _Window_Message_update = Window_Message.prototype.update;
    Window_MultiMessage.prototype.update = function() {
        if (this.isMultiMessage()) {
            _Window_Message_update.call(this);
        } else {
            this.checkToNotClose();
            Window_Base.prototype.update.call(this);
            this.synchronizeNameBox();
        }
        if (this.multiMessageMode && !this._textState) {
            this.pause = true;
        }
        if (this.pause && (this.isClosing() || this.isClosed())) {
            this.pause = false;
        }
    };

    Window_Message.prototype.update = function() {
        if (String(this.constructor.name) === "Window_Message") {
            return;
        }
        _Window_Message_update.call(this);
    };

    const _Window_Message_updateMessage = Window_Message.prototype.updateMessage;
    Window_MultiMessage.prototype.updateMessage = function() {
        if (this.isMultiMessage()) {
            return _Window_Message_updateMessage.call(this);
        }
        return false;
    };

    const _Window_Message_updateInput = Window_Message.prototype.updateInput;
    Window_Message.prototype.updateInput = function() {
        if (this.noBusy && this.keyInvalid) {
            return false;
        }
        return _Window_Message_updateInput.call(this);
    };

    Window_NameBox.prototype.setBoxPosition = function(mode) {
        this._boxPosition = mode;
    };

    const _Window_NameBox_updatePlacement = Window_NameBox.prototype.updatePlacement;
    Window_NameBox.prototype.updatePlacement = function() {
        _Window_NameBox_updatePlacement.call(this);
        const messageWindow = this._messageWindow;
        if (this._boxPosition === 'left') {
            this.x = messageWindow.x;
        } else if (this._boxPosition === 'right') {
            this.x = messageWindow.x + messageWindow.width - this.width;
        }
    };


    const _Game_Player_canMove = Game_Player.prototype.canMove;
    Game_Player.prototype.canMove = function() {
        const result = _Game_Player_canMove.call(this);
        if (!result) {
            if ($gameMessage.isBusy() && !SceneManager._scene.noBusyMultiMessageWindow()) {
                return true;
            }
        }
        if (SceneManager._scene.noBusyMultiMessageWindow()) {
            return false;
        }
        return result;
    };


    Game_Message.prototype.isBusyMultiMessageWindow = function() {
        return SceneManager._scene.isBusyMultiMessageWindow();
    };
    
})();