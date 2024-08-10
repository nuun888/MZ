/*:-----------------------------------------------------------------------------------
 * NUUN_BattleMessagesBackgroundImg.js
 * 
 * Copyright (C) 2024 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Battle message window background image
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_BattleStyleEX
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_BattleStyleEX
 * @version 1.0.0
 * 
 * @help
 * You can set a background image for the message window during battle.
 * In addition to the message window, you can also set it for monster appearance, victory, defeat, and escape messages.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 8/10/2024 Ver.1.0.0
 * First edition.
 * 
 * @param MessageSetting
 * @text Message background image
 * @desc Set the image for the message.
 * @default []
 * @type struct<WindowBackground>
 * 
 * @param EnemyAppearSetting
 * @text Appearance message background image
 * @desc Set the image for the message that appears.
 * @default []
 * @type struct<WindowBackground>
 * 
 * @param VictorySetting
 * @text Victory message background image
 * @desc Set the image for the victory message.
 * @default []
 * @type struct<WindowBackground>
 * 
 * @param LoseSetting
 * @text Defeat message background image
 * @desc Set the image for the defeat message.
 * @default []
 * @type struct<WindowBackground>
 * 
 * @param EscapeSetting
 * @text Escape message background image
 * @desc Set the image for the getaway message.
 * @default []
 * @type struct<WindowBackground>
 * 
 * @param EscapeFailureSetting
 * @text Escape failure message background image
 * @desc Set the image for the escape failure message.
 * @default []
 * @type struct<WindowBackground>
 * 
 * 
 * 
 */
/*~struct~WindowBackground:
 * 
 * @param BackGroundImg
 * @desc Specifies the name of the background image file to be displayed.
 * @text Background Image
 * @type file
 * @dir img/
 * @default 
 * 
 * @param WindowBackground_X
 * @desc Window background image X coordinate (relative).
 * @text Background image X coordinate (relative)
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param WindowBackground_Y
 * @desc Window background image Y coordinate (relative).
 * @text Background image Y coordinate (relative)
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 戦闘中メッセージウィンドウ背景画像
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_BattleStyleEX
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_BattleStyleEX
 * @version 1.0.0
 * 
 * @help
 * 戦闘中のメッセージウィンドウに背景画像を設定できます。
 * メッセージウィンドウ以外にモンスター出現、勝利、敗北、逃走メッセージにも設定可能です。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/8/10 Ver.1.0.0
 * 初版
 * 
 * 
 * @param MessageSetting
 * @text メッセージ背景画像
 * @desc メッセージの画像設定を行います。
 * @default []
 * @type struct<WindowBackground>
 * 
 * @param EnemyAppearSetting
 * @text モンスター出現メッセージ背景画像
 * @desc モンスター出現メッセージの画像設定を行います。
 * @default []
 * @type struct<WindowBackground>
 * 
 * @param VictorySetting
 * @text 勝利メッセージ背景画像
 * @desc 勝利メッセージの画像設定を行います。
 * @default []
 * @type struct<WindowBackground>
 * 
 * @param LoseSetting
 * @text 敗北メッセージ背景画像
 * @desc 敗北メッセージの画像設定を行います。
 * @default []
 * @type struct<WindowBackground>
 * 
 * @param EscapeSetting
 * @text 逃走メッセージ背景画像
 * @desc 逃走メッセージの画像設定を行います。
 * @default []
 * @type struct<WindowBackground>
 * 
 * @param EscapeFailureSetting
 * @text 逃走失敗メッセージ背景画像
 * @desc 逃走失敗メッセージの画像設定を行います。
 * @default []
 * @type struct<WindowBackground>
 * 
 */
/*~struct~WindowBackground:ja
 * 
 * @param BackGroundImg
 * @desc 表示する背景画像ファイル名を指定します。
 * @text 背景画像
 * @type file
 * @dir img/
 * @default 
 * 
 * @param WindowBackground_X
 * @desc ウィンドウの背景画像X座標（相対）。
 * @text 背景画像X座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param WindowBackground_Y
 * @desc ウィンドウの背景画像Y座標（相対）。
 * @text 背景画像Y座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 */

var Imported = Imported || {};
Imported.NUUN_BattleMessagesBackgroundImg = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    const parameters = PluginManager.parameters('NUUN_BattleMessagesBackgroundImg');

    const _BattleManager_displayStartMessages = BattleManager.displayStartMessages;
    BattleManager.displayStartMessages = function() {
        _BattleManager_displayStartMessages.call(this);
        this.nuun_displayMessageType("Appear");
    };

    const _BattleManager_displayVictoryMessage = BattleManager.displayVictoryMessage;
    BattleManager.displayVictoryMessage = function() {
        _BattleManager_displayVictoryMessage.call(this);
        this.nuun_displayMessageType("Victory");
    };

    const _BattleManager_displayDefeatMessage = BattleManager.displayDefeatMessage;
    BattleManager.displayDefeatMessage = function() {
        _BattleManager_displayDefeatMessage.call(this);
        this.nuun_displayMessageType("Lose");
    };

    const _BattleManager_displayEscapeSuccessMessage = BattleManager.displayEscapeSuccessMessage;
    BattleManager.displayEscapeSuccessMessage = function() {
        _BattleManager_displayEscapeSuccessMessage.call(this);
        this.nuun_displayMessageType("Escape");
    };

    const _BattleManager_displayEscapeFailureMessage = BattleManager.displayEscapeFailureMessage;
    BattleManager.displayEscapeFailureMessage = function() {
        _BattleManager_displayEscapeFailureMessage.call(this);
        this.nuun_displayMessageType("EscapeFailure");
    };

    BattleManager.nuun_displayMessageType = function(type) {
        $gameMessage.nuun_displayMessageType(type);
    };


    const _Scene_Base_createWindowLayer = Scene_Base.prototype.createWindowLayer;
    Scene_Base.prototype.createWindowLayer = function() {
        this.createBsBackground();
        _Scene_Base_createWindowLayer.apply(this, arguments);
    };

    Scene_Base.prototype.createBsBackground = function() {
        
    };

    Scene_Battle.prototype.createBsBackground = function() {
        this._messageBackground = new Sprite();
        this.addChild(this._messageBackground);
    };

    const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _Scene_Battle_createAllWindows.apply(this, arguments);
        this._messageWindow.setMessageBackground(this._messageBackground);
    };


    Window_Message.prototype.setMessageBackground = function(sprite) {
        this._messageBackground = sprite;
    };

    const _Window_Message_updateBackground = Window_Message.prototype.updateBackground;
    Window_Message.prototype.updateBackground = function() {
        if (this._messageBackground) {
            const data = $gameMessage.getMessageBackgroundData();
            if (data.BackGroundImg) {
                this._messageBackground.bitmap = ImageManager.nuun_LoadPictures(data.BackGroundImg);
                this._messageBackground.x = this.x + data.WindowBackground_X + (Graphics.width - Graphics.boxWidth) / 2;
                this._messageBackground.y = this.y + data.WindowBackground_Y + (Graphics.height - Graphics.boxHeight) / 2;
                this._messageBackground.show();
                $gameMessage.setBackground(2);
            } else {
                this._messageBackground.bitmap = null;
                this._messageBackground.hide();
            }
        }
        _Window_Message_updateBackground.apply(this, arguments);
    };

    const _Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
    Window_Message.prototype.terminateMessage = function() {
        _Window_Message_terminateMessage.apply(this, arguments);
        this.hideMessageBackground(); 
    };

    Window_Message.prototype.hideMessageBackground = function() {
        if (this._messageBackground) {
            this._messageBackground.hide();
        }
    };


    const _Game_Message_clear = Game_Message.prototype.clear;
    Game_Message.prototype.clear = function() {
        _Game_Message_clear.apply(this, arguments);
        this._messageType = null;
    };

    Game_Message.prototype.nuun_displayMessageType = function(type) {
        this._messageType = type;
    };

    Game_Message.prototype.nuun_getDisplayMessageType = function() {
        return this._messageType;
    };

    Game_Message.prototype.getMessageBackgroundData = function() {
        switch (this.nuun_getDisplayMessageType()) {
            case "Appear":
                return params.EnemyAppearSetting;
            case "Victory":
                return params.VictorySetting;
            case "Lose":
                return params.LoseSetting;
            case "Escape":
                return params.EscapeSetting;
            case "EscapeFailure":
                return params.EscapeFailureSetting;
            default:
                return params.MessageSetting;
        }
    };

})();