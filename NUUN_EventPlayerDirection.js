/*:-----------------------------------------------------------------------------------
 * NUUN_EventPlayerDirection.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc トリガー起動時のプレイヤーとイベントの向き状況取得
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * トリガー起動時のプレイヤーとイベントとの向き状況を取得します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/7/24 Ver.1.0.0
 * 初版
 * 
 * 
 * @param PlayerBackDirectionSwitch
 * @text プレイヤー背後スイッチID
 * @desc プレイヤーから見てイベントが後ろ方向からトリガーが起動したときにONにするスイッチID。
 * @type switch
 * @default 0
 * 
 * @param EventBackDirectionSwitch
 * @text イベント背後スイッチID
 * @desc イベントから見てプレイヤーが後ろ方向からトリガーが起動したときにONにするスイッチID。
 * @type switch
 * @default 0
 * 
 * @param PlayerFrontDirectionSwitch
 * @text プレイヤー正面スイッチID
 * @desc プレイヤーから見てイベントが正面方向からトリガーが起動したときにONにするスイッチID。
 * @type switch
 * @default 0
 * 
 * @param EventFrontDirectionSwitch
 * @text イベント正面スイッチID
 * @desc イベントから見てプレイヤーが正面方向からトリガーが起動したときにONにするスイッチID。
 * @type switch
 * @default 0
 * 
 * @param PlayerLeftDirectionSwitch
 * @text プレイヤー左側スイッチID
 * @desc プレイヤーから見てイベントが左方向からトリガーが起動したときにONにするスイッチID。
 * @type switch
 * @default 0
 * 
 * @param EventLeftDirectionSwitch
 * @text イベント左側スイッチID
 * @desc イベントから見てプレイヤーが左方向からトリガーが起動したときにONにするスイッチID。
 * @type switch
 * @default 0
 * 
 * @param PlayerRightDirectionSwitch
 * @text プレイヤー右側スイッチID
 * @desc プレイヤーから見てイベントが右方向からトリガーが起動したときにONにするスイッチID。
 * @type switch
 * @default 0
 * 
 * @param EventRightDirectionSwitch
 * @text イベント右側スイッチID
 * @desc イベントから見てプレイヤーが右方向からトリガーが起動したときにONにするスイッチID。
 * @type switch
 * @default 0
 * 
 * 
 */


var Imported = Imported || {};
Imported.NUUN_ExpGauge = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_EventPlayerDirection');
    const PlayerBackDirectionSwitch = Number(parameters['PlayerBackDirectionSwitch'] || 0);
    const EventBackDirectionSwitch = Number(parameters['EventBackDirectionSwitch'] || 0);
    const PlayerFrontDirectionSwitch = Number(parameters['PlayerFrontDirectionSwitch'] || 0);
    const EventFrontDirectionSwitch = Number(parameters['EventFrontDirectionSwitch'] || 0);
    const PlayerRightDirectionSwitch = Number(parameters['PlayerRightDirectionSwitch'] || 0);
    const EventRightDirectionSwitch = Number(parameters['EventRightDirectionSwitch'] || 0);
    const PlayerLeftDirectionSwitch = Number(parameters['PlayerLeftDirectionSwitch'] || 0);
    const EventLeftDirectionSwitch = Number(parameters['EventLeftDirectionSwitch'] || 0);

    const _Game_Interpreter_setup = Game_Interpreter.prototype.setup;
    Game_Interpreter.prototype.setup = function(list, eventId) {
        _Game_Interpreter_setup.call(this, list, eventId);
        if (eventId > 0) {
            const event = this.character(0);
            $gameSwitches.setValue(PlayerBackDirectionSwitch, event.getPlayerBackDirection());
            $gameSwitches.setValue(EventBackDirectionSwitch, event.getEventBackDirection());
            $gameSwitches.setValue(PlayerFrontDirectionSwitch, event.getPlayerFrontDirection());
            $gameSwitches.setValue(EventFrontDirectionSwitch, event.getEventFrontDirection());
            $gameSwitches.setValue(PlayerRightDirectionSwitch, event.getPlayerRightDirection());
            $gameSwitches.setValue(EventRightDirectionSwitch, event.getEventRightDirection());
            $gameSwitches.setValue(PlayerLeftDirectionSwitch, event.getPlayerLeftDirection());
            $gameSwitches.setValue(EventLeftDirectionSwitch, event.getEventLeftDirection());
        }
    };

    const _Game_Event_initialize = Game_Event.prototype.initialize;
    Game_Event.prototype.initialize = function(mapId, eventId) {
        _Game_Event_initialize.call(this, mapId, eventId);
        this._eventBackDirection = false;
        this._playerBackDirection = false;
        this._eventFrontDirection = false;
        this._playerFrontDirection = false;
        this._eventLeftDirection = false;
        this._playerLeftDirection = false;
        this._eventRightDirection = false;
        this._playerRightDirection = false;
    };

    const _Game_Event_start = Game_Event.prototype.start;
    Game_Event.prototype.start = function() {
        this.setPlayerEventDirection();
        _Game_Event_start.call(this);
    };

    Game_Event.prototype.setPlayerEventDirection = function() {
        const dx = this.deltaXFrom($gamePlayer.x);
        const dy = this.deltaYFrom($gamePlayer.y);
        this.eventPlayerDirection(dx, dy);
    };

    Game_Event.prototype.getEventBackDirection = function() {
        return this._eventBackDirection;
    };

    Game_Event.prototype.getPlayerBackDirection = function() {
        return this._playerBackDirection;
    };

    Game_Event.prototype.getEventFrontDirection = function() {
        return this._eventFrontDirection;
    };

    Game_Event.prototype.getPlayerFrontDirection = function() {
        return this._playerFrontDirection;
    };

    Game_Event.prototype.getEventLeftDirection = function() {
        return this._eventLeftDirection;
    };

    Game_Event.prototype.getPlayerLeftDirection = function() {
        return this._playerLeftDirection;
    };

    Game_Event.prototype.getEventRightDirection = function() {
        return this._eventRightDirection;
    };

    Game_Event.prototype.getPlayerRightDirection = function() {
        return this._playerRightDirection;
    };


    Game_Event.prototype.eventPlayerDirection = function(dx, dy) {
        this._eventBackDirection = this.eventPlayerDirectionBack(dx, dy);
        this._playerBackDirection = this.playerEventDirectionBack(dx, dy);
        this._eventFrontDirection = this.eventPlayerDirectionFront(dx, dy);
        this._playerFrontDirection = this.playerEventDirectionFront(dx, dy);
        this._eventLeftDirection = this.eventPlayerDirectionLeft(dx, dy);
        this._playerLeftDirection = this.playerEventDirectionLeft(dx, dy);
        this._eventRightDirection = this.eventPlayerDirectionRight(dx, dy);
        this._playerRightDirection = this.playerEventDirectionRight(dx, dy);
    };

    Game_Event.prototype.eventPlayerDirectionBack = function(dx, dy) {
        switch (this.direction()) {
            case 2:
                return $gamePlayer.direction() === 2 && dy > 0;
            case 4:
                return $gamePlayer.direction() === 4 && dx < 0;
            case 6:
                return $gamePlayer.direction() === 6 && dx > 0;
            case 8:
                return $gamePlayer.direction() === 8 && dy < 0;
        }
    };

    Game_Event.prototype.playerEventDirectionBack = function(dx, dy) {
        switch ($gamePlayer.direction()) {
            case 2:
                return this.direction() === 2 && dy < 0;
            case 4:
                return this.direction() === 4 && dx > 0;
            case 6:
                return this.direction() === 6 && dx < 0;
            case 8:
                return this.direction() === 8 && dy > 0;
        }
    };

    Game_Event.prototype.eventPlayerDirectionFront = function(dx, dy) {
        switch (this.direction()) {
            case 2:
                return $gamePlayer.direction() === 8 && dy < 0;
            case 4:
                return $gamePlayer.direction() === 6 && dx > 0;
            case 6:
                return $gamePlayer.direction() === 4 && dx < 0;
            case 8:
                return $gamePlayer.direction() === 2 && dy > 0;
        }
    };

    Game_Event.prototype.playerEventDirectionFront = function(dx, dy) {
        switch ($gamePlayer.direction()) {
            case 2:
                return this.direction() === 8 && dy > 0;
            case 4:
                return this.direction() === 6 && dx < 0;
            case 6:
                return this.direction() === 4 && dx > 0;
            case 8:
                return this.direction() === 2 && dy < 0;
        }
    };

    Game_Event.prototype.eventPlayerDirectionLeft = function(dx, dy) {
        switch (this.direction()) {
            case 2:
                return $gamePlayer.direction() === 4 && dx < 0;
            case 4:
                return $gamePlayer.direction() === 8 && dy < 0;
            case 6:
                return $gamePlayer.direction() === 2 && dy > 0;
            case 8:
                return $gamePlayer.direction() === 6 && dx > 0;
        }
    };

    Game_Event.prototype.playerEventDirectionLeft = function(dx, dy) {
        switch ($gamePlayer.direction()) {
            case 2:
                return this.direction() === 4 && dx > 0;
            case 4:
                return this.direction() === 8 && dy > 0;
            case 6:
                return this.direction() === 2 && dy < 0;
            case 8:
                return this.direction() === 6 && dx < 0;
        }
    };

    Game_Event.prototype.eventPlayerDirectionRight = function(dx, dy) {
        switch (this.direction()) {
            case 2:
                return $gamePlayer.direction() === 6 && dx > 0;
            case 4:
                return $gamePlayer.direction() === 2 && dy > 0;
            case 6:
                return $gamePlayer.direction() === 8 && dy < 0;
            case 8:
                return $gamePlayer.direction() === 4 && dx < 0;
        }
    };

    Game_Event.prototype.playerEventDirectionRight = function(dx, dy) {
        switch ($gamePlayer.direction()) {
            case 2:
                return this.direction() === 6 && dx < 0;
            case 4:
                return this.direction() === 2 && dy < 0;
            case 6:
                return this.direction() === 8 && dy > 0;
            case 8:
                return this.direction() === 4 && dx > 0;
        }
    };

})();