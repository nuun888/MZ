/*:-----------------------------------------------------------------------------------
 * NUUN_EventRange.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc イベント接触判定拡張
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * イベントの接触判定を拡張します。
 * 
 * イベントのメモ欄
 * <EventRange:range,[x],[y]> 指定した範囲を中心に接触判定を拡大します。
 * [x]:イベントの接触横範囲
 * [y]:イベントの接触盾範囲
 * 
 * <EventRange:rangeEX,[x1],[y1],[x2],[y2],[x3],[y3],[x4],[y4]> イベントから指定した範囲内の接触判定を拡大します。
 * イベント座標より左、上を指定する場合はそのまま負の数で記入してください。
 * [x1]:イベントの接触範囲点AX座標
 * [y1]:イベントの接触範囲点AY座標
 * [x2]:イベントの接触範囲点BX座標
 * [y2]:イベントの接触範囲点BY座標
 * [x3]:イベントの接触範囲点CX座標
 * [y3]:イベントの接触範囲点CY座標
 * [x4]:イベントの接触範囲点DX座標
 * [y4]:イベントの接触範囲点DY座標
 * 
 * <EventRange:circle,[r],[rad]> 指定した半径からの接触判定を拡大します。角度を指定することで正面から角度に応じて接触判定を拡大します。
 * [r]:半径
 * [rad]:角度(0～180°)※省略可　省略時は360°
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/7/11 Ver.1.0.0
 * 初版
 * 
 * 
 */


var Imported = Imported || {};
Imported.NUUN_EventRange = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_EventRange');

    const _Game_Player_startMapEvent = Game_Player.prototype.startMapEvent;
    Game_Player.prototype.startMapEvent = function(x, y, triggers, normal) {
        _Game_Player_startMapEvent.call(this, x, y, triggers, normal);
        if (!$gameMap.isEventRunning()) {
            for (const event of $gameMap.eventsRangeXy(x, y)) {
                if (event.isTriggerIn(triggers)) {
                    event.start();
                }
            }
        }
    };

    Game_Map.prototype.eventsRangeXy = function(x, y) {
        return this.events().filter(event => {
            return event.range(x, y);
        });
    };

    const _Game_Map_eventsXy = Game_Map.prototype.eventsXy;
    Game_Map.prototype.eventsXy = function(x, y) {
        const events = _Game_Map_eventsXy.call(this, x, y)
        return events.filter(event => !event.event().meta.EventRange);
    };

    Game_Event.prototype.range = function(x, y) {
        const data = this.event().meta.EventRange;
        if (data) {
            const arr = data.split(',');
            const mode = arr[0].trim();
            if (mode === 'range') {
                return (this.rangeX(x, Number(arr[1])) && this.rangeY(y, Number(arr[2])));
            } else if (mode === 'rangeEX') {
                return this.rangeEX(x, y, Number(arr[1]), Number(arr[2]), Number(arr[3]), Number(arr[4]),Number(arr[5]), Number(arr[6]), Number(arr[7]), Number(arr[8]));
            } else if (mode === 'circle') {
                return this.circleRange(x, y, Number(arr[1]), Number(arr[2]));
            } else if (mode === 'donut') {
                return this.donutRange(x, y, Number(arr[1]));
            }
        } else {
            return false;
        }
    };

    Game_Event.prototype.rangeEX = function(x, y, x1, y1, x2, y2, x3, y3, x4, y4) {
        return (this.rangeCp(this.x + x1, this.y + y1, this.x + x2, this.y + y2, x, y) &&
        this.rangeCp(this.x + x2, this.y + y2, this.x + x3, this.y + y3, x, y) &&
        this.rangeCp(this.x + x3, this.y + y3, this.x + x4, this.y + y4, x, y) &&
        this.rangeCp(this.x + x4, this.y + y4, this.x + x1, this.y + y1, x, y));
    };

    Game_Event.prototype.rangeCp = function(ax, ay, bx, by, x, y) {
        const x2 = ax - bx;
        const y2 = ay - by;
        const a = bx - x;
        const b = by - y;
        return (x2 * b - y2 * a) >= 0;
    };

    Game_Event.prototype.circleRange = function(x, y, r, rad) {
        const sx = this.deltaXFrom(x);
        const sy = this.deltaYFrom(y);
        const a = Math.abs(sx);
        const b = Math.abs(sy);
        const h = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        if (!rad) {
            return h <= r;
        }
        rad = Math.min(rad, 180);
        const radian = (rad / 2) * (Math.PI / 180);
        const ry = NuunManager.numPercentage(Math.abs(Math.tan(radian) * a), 6, true);
        const rx = NuunManager.numPercentage(Math.abs(Math.tan(radian) * b), 6, true);
        switch (this.direction()) {
            case 2:
                return h <= r && rx >= a && sy <= 0;
            case 6:
                return h <= r && rx >= a && sy >= 0;
            case 4:
                return h <= r && ry >= b && sx >= 0;
            case 8:
                return h <= r && ry >= b && sx <= 0;
        }
        return false;
    };

    Game_Event.prototype.donutRange = function(x, y, r1, r2) {
        const a = Math.abs(this.deltaXFrom(x));
        const b = Math.abs(this.deltaYFrom(y));
        const h = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        return h <= r1 && h <= r2;
    };

    Game_Event.prototype.rangeX = function(x, x2) {
        return this.x >= x - Math.floor(x2 / 2) && this.x <= x + Math.floor(x2 / 2);
    };

    Game_Event.prototype.rangeY = function(y, y2) {
        return this.y >= y - Math.floor(y2 / 2) && this.y <= y + Math.floor(y2 / 2);
    };

})();