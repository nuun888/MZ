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
 * @plugindesc Event contact detection EX
 * @author NUUN
 * @version 1.5.4
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * Extends contact range determination for events.
 * 
 * Event "Note" field or “Comment” of event execution details
 * ※The former applies to all event pages. The latter applies when the filled page is executed.
 * 
 * <EventRangeCollided>
 * Enable range collision detection for events. Triggers are applied in the same way as normal characters.
 * 
 * <EventRangeObstacle>
 * If there is a map with a traffic judgment of "x" in the field of view in the event of the specified range, the event will not be performed.
 * 
 * <EventRange:besideRange,[lx],[rx]> Enlarges the contact judgment within the specified horizontal range. Orientation is ignored.
 * [lx]:Contact left range of the event (positive integer)
 * [ry]:Contact right range of the event (positive integer)
 * 
 * <EventRange:verticalRange,[uy],[dy]> Enlarges the contact judgment within the specified vertical range. Orientation is ignored.
 * [ux]:contact upper range of the event (positive integer)
 * [dy]:contact lower extent of the event (positive integer)
 * 
 * <EventRange:frontRange,[range]> Expands the contact detection from the specified event to the range directly in front.
 * [range]:Contact range (integer)
 * 
 * <EventRange:range,[x],[y]> Expands the contact detection around the specified range. If you enter 4, the trigger will be activated in the range of ±2 squares (5 squares) centered on the event.
 * [x]:contact lateral extent of the event (an even positive integer)
 * [y]:contact longitudinal extent of the event (an even positive integer)
 * 
 * <EventRange:rangeEX,[x1],[y1],[x2],[y2],[x3],[y3],[x4],[y4]> Enlarge the contact judgment within the specified range from the event.
 * If you want to specify left or above the event coordinates, enter it as a negative number.
 * [x1]:Event contact range point AX coordinate (integer)
 * [y1]:Event contact range point AY coordinate (integer)
 * [x2]:Event contact range point BX coordinate (integer)
 * [y2]:Event contact range point BY coordinate (integer)
 * [x3]:Event contact range point CX coordinate (integer)
 * [y3]:Event contact range point CY coordinate (integer)
 * [x4]:Event contact range point DX coordinate (integer)
 * [y4]:Event contact range point DY coordinate (integer)
 * 
 * <EventRange:circle,[range],[rad]> Expand the contact judgment from the specified radius. By specifying the angle, the contact detection is expanded according to the angle from the front.
 * [range]:contact range (integer)
 * [rad]:Angle (0 to 180°) *Can be omitted.If omitted, 360°
 * 
 * <EventRange:triangle,[range],[rad]> Expands the contact detection according to the angle from the front for the specified recognition range.
 * [range]:Contact range from the front (integer)
 * [rad]:Angle (0 to 180°)
 * 
 * <EventRecognition:[range]> If you are away from the specified range or more, the event contact judgment will not be performed.
 * [range]:Contact judgment maximum distance number (positive integer)
 * <EventRecognition:20> If the distance from the player to the event is 20 squares or more, contact judgment processing will not be performed.
 * Contents of <EventRecognition:[range]> take precedence over plugin parameters.
 * 
 * <EventRangeOnSelf:[Self]> When the player leaves the range, turn on the specified self switch.
 * [Self]: A,B,C,D
 * 
 * <EventRangeUnlock> Does not redirect the direction of the event when the trigger fires.
 * 
 * If you enter "Comment" in the execution content, it will be the contact range for each page. It will be the contact range of the page with the current conditions.
 * If there is an entry in the event memo field and "Comment" at the same time, the "Comment" tag will take precedence.
 * 
 * Event Player Distance X Variable ID, Event Player Distance Y Variable ID
 * Specifies a variable to substitute the distance from the event to the player when executing an event with contact detection extension.
 * Negative coordinates are assigned if the player is to the left or above the event.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 5/5/2025 Ver.1.5.4
 * Fixed an issue where collision detection was not working properly with circle and triangle.
 * Fixed an issue where collision detection was working behind the object with frontRange.
 * 4/2/2023 Ver.1.5.3
 * Added a function to turn on the specified self switch when the player leaves the range.
 * Added functionality to keep event direction unchanged when player enters range.
 * 3/27/2023 Ver.1.5.2
 * Fixed an issue where the normal collision detection between events was not performed.
 * 1/31/2023 Ver.1.5.1
 * Fixed an issue where settings from Comment tag of <EventRangeObstacle> were not applied.
 * 11/27/2022 Ver.1.5.0
 * Added a function that does not cause an event when there is an obstacle in sight from the player.
 * Fixed an issue where the collision detection was not applied correctly in the range collision detection of the event.
 * Fixed the problem that the range was not judged by contact from the event.
 * 11/27/2022 Ver.1.4.2
 * Changed the display in languages other than Japanese to English.
 * 9/14/2022 Ver.1.4.1
 * Fixed to apply collision range judgment from event.
 * Fixed an issue where events with collision detection would not go in some directions.
 * Fixed the wrong description of "range".
 * 9/11/2022 Ver.1.4.0
 * Added range collision detection function.
 * 7/24/2022 Ver.1.3.1
 * Fixed an issue where the event player distance could not be acquired properly when multiple events were started.
 * 7/16/2022 Ver.1.3.0
 * Added a function that allows you to specify a range for each event page.
 * Added range from directly in front of event to contact range.
 * 7/14/2022 Ver.1.2.0
 * Added horizontal and vertical to contact detection.
 * Added the ability to specify a variable that substitutes the distance from the player to the event.
 * 7/14/2022 Ver.1.1.1
 * Fixed an issue where circular and triangular contact detection was not working properly.
 * 7/11/2022 Ver.1.1.0
 * Added a function to set the range for contact detection.
 * Added triangle type to contact range mode.
 * 7/11/2022 Ver.1.0.0
 * First edition
 * 
 * @param EventRecognitionRange
 * @text Contact judgment processing range
 * @desc pecify the range for contact detection.
 * @type number
 * @default 30
 * 
 * @param DistanceFromXVar
 * @text Event player distance X variable ID
 * @desc Set a game variable that substitutes the difference (X coordinate) from the event to the player.
 * @type variable
 * @default 0
 * 
 * @param DistanceFromYVar
 * @text Event player distance y variable ID
 * @desc Set a game variable that substitutes the difference (Y coordinate) from the event to the player.
 * @type variable
 * @default 0
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc イベント接触判定拡張
 * @author NUUN
 * @version 1.5.3
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * イベントの接触範囲判定を拡張します。
 * 
 * イベントのメモ欄またはイベントの実行内容の注釈(Comment)
 * ※前者は全イベントページに適用されます。後者は記入したページの時に適用します。
 * 
 * <EventRangeCollided>
 * イベントの範囲衝突判定を有効にします。トリガーが通常キャラと同じで適用されます。
 * 
 * <EventRangeObstacle>
 * 範囲指定のイベントで視界先に通行判定が×のマップがある場合、イベントを実行しません。
 * 
 * <EventRange:besideRange,[lx],[rx]> 指定した横方向の範囲内の接触判定を拡大します。向きは無視されます。
 * [lx]:イベントの接触左側範囲(正の数の整数)
 * [ry]:イベントの接触右側範囲(正の数の整数)
 * 
 * <EventRange:verticalRange,[uy],[dy]> 指定した縦方向の範囲内の接触判定を拡大します。向きは無視されます。
 * [ux]:イベントの接触上側範囲(正の数の整数)
 * [dy]:イベントの接触下側範囲(正の数の整数)
 * 
 * <EventRange:frontRange,[range]> 指定したイベントからの真正面の範囲までの接触判定を拡大します。
 * [range]:接触範囲(整数)
 * 
 * <EventRange:range,[x],[y]> 指定した範囲を中心に接触判定を拡大します。4と記入した場合はイベントを中心に±2マスの
 * 範囲(5マス)でトリガーが起動します。
 * [x]:イベントの接触横範囲(偶数の正の数の整数)
 * [y]:イベントの接触縦範囲(偶数の正の数の整数)
 * 
 * <EventRange:rangeEX,[x1],[y1],[x2],[y2],[x3],[y3],[x4],[y4]> イベントから指定した範囲内の接触判定を拡大します。
 * イベント座標より左、上を指定する場合はそのまま負の数で記入してください。
 * [x1]:イベントの接触範囲点AX座標(整数)
 * [y1]:イベントの接触範囲点AY座標(整数)
 * [x2]:イベントの接触範囲点BX座標(整数)
 * [y2]:イベントの接触範囲点BY座標(整数)
 * [x3]:イベントの接触範囲点CX座標(整数)
 * [y3]:イベントの接触範囲点CY座標(整数)
 * [x4]:イベントの接触範囲点DX座標(整数)
 * [y4]:イベントの接触範囲点DY座標(整数)
 * 
 * <EventRange:circle,[range],[rad]> 指定した半径からの接触判定を拡大します。角度を指定することで正面から角度に応じて接触判定を拡大します。
 * [range]:接触範囲(整数)
 * [rad]:角度(0～180°)※省略可　省略時は360°
 * 
 * <EventRange:triangle,[range],[rad]> 指定した認識範囲に対して、正面からの角度に応じて接触判定を拡大します。
 * [range]:正面からの接触範囲(整数)
 * [rad]:角度(0～180°)
 * 
 * <EventRecognition:[range]> 指定の範囲以上から離れている場合はイベント接触判定を行いません。
 * [range]:接触判定最大距離数(正の数の整数)
 * <EventRecognition:20> プレイヤーからイベントまでの距離が20マス以上なら接触判定処理を行いません。
 * プラグインパラメータよりも<EventRecognition:[range]>の内容が優先されます。
 * 
 * <EventRangeOnSelf:[Self]> 範囲内からプレイヤーが離れた時に、指定のセルフスイッチをONにします。
 * [Self]: A,B,C,D
 * 
 * <EventRangeUnlock> トリガー発動時にイベントの向きを方向転換させません。
 * 
 * 実行内容に注釈(Comment)は、ページ毎の接触範囲となります。現在の条件になっているページの接触範囲となります。
 * イベントのメモ欄と注釈(Comment)に同時に記入がある場合、注釈(Comment)のタグが優先されます。
 * 
 * イベントプレイヤー距離X変数ID、イベントプレイヤー距離Y変数ID
 * 接触拡張を持つイベント実行時にイベントからプレイヤーまでの距離を代入する変数を指定します。
 * プレイヤーがイベントより左、上にいる場合はマイナス座標が代入されます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2025/5/5 Ver.1.5.4
 * circle、triangleで正常に接触判定を行っていなかった問題を修正。
 * frontRangeで背後でも接触判定する問題を修正。
 * 2023/4/2 Ver.1.5.3
 * プレイヤーが範囲外に離れた時に指定のセルフスイッチをONにする機能を追加。
 * プレイヤーが範囲内に入っても、イベントの方向が変わらない機能を追加。
 * 2023/3/27 Ver.1.5.2
 * イベントとイベントの通常の接触判定が行われていなかった問題を修正。
 * 2023/1/31 Ver.1.5.1
 * <EventRangeObstacle>の注釈からの設定が適用されていなかった問題を修正。
 * 2022/11/27 Ver.1.5.0
 * プレイヤーから視界上に障害物がある場合、イベント発生しない機能を追加。
 * イベントの範囲衝突判定で衝突判定が正常に適用してなかった問題を修正。
 * イベントから接触で範囲判定しなかった問題を修正。
 * 2022/11/27 Ver.1.4.2
 * 日本語以外での表示を英語表示に変更。
 * 2022/9/14 Ver.1.4.1
 * イベントからの衝突範囲判定を適用できるように修正。
 * 衝突判定を持つイベントが一部方向に行かなくなる問題を修正。
 * rangeの説明が間違っていたので修正。
 * 2022/9/11 Ver.1.4.0
 * 範囲衝突判定機能を追加。
 * 2022/7/24 Ver.1.3.1
 * 複数イベント起動した場合、イベントプレイヤー距離が正常に取得できない問題を修正。
 * 2022/7/16 Ver.1.3.0
 * イベントページ毎に範囲を指定できる機能を追加。
 * 接触範囲にイベントの真正面からの範囲内を追加。
 * 2022/7/14 Ver.1.2.0
 * 接触判定に横長、縦長を追加。
 * プレイヤーからイベントまでの距離を代入する変数を指定できる機能を追加。
 * 2022/7/14 Ver.1.1.1
 * 円形、三角型の接触判定が正常に機能していなかった問題を修正。
 * 2022/7/11 Ver.1.1.0
 * 接触判定を行う範囲を設定する機能を追加。
 * 接触範囲モードに三角形型を追加。
 * 2022/7/11 Ver.1.0.0
 * 初版
 * 
 * @param EventRecognitionRange
 * @text 接触判定処理範囲
 * @desc 接触判定を行う範囲を指定します。イベントのメモ欄に<EventRecognition:[range]>がある場合は、そちらが優先されます。
 * @type number
 * @default 30
 * 
 * @param DistanceFromXVar
 * @text イベントプレイヤー距離X変数ID
 * @desc イベントからプレイヤーまでの差(X座標)を代入するゲーム変数を設定します。
 * @type variable
 * @default 0
 * 
 * @param DistanceFromYVar
 * @text イベントプレイヤー距離Y変数ID
 * @desc イベントからプレイヤーまでの差(Y座標)を代入するゲーム変数を設定します。
 * @type variable
 * @default 0
 * 
 */


var Imported = Imported || {};
Imported.NUUN_EventRange = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_EventRange');
    const EventRecognitionRange = Number(parameters['EventRecognitionRange'] || 30);
    const DistanceFromXVar = Number(parameters['DistanceFromXVar'] || 0);
    const DistanceFromYVar = Number(parameters['DistanceFromYVar'] || 0);

    const _Game_Interpreter_setup = Game_Interpreter.prototype.setup;
    Game_Interpreter.prototype.setup = function(list, eventId) {
        _Game_Interpreter_setup.call(this, list, eventId);
        if (eventId > 0) {
            const event = this.character(0);
            $gamePlayer.setDistanceFrom(event.deltaXFrom($gamePlayer.x) * -1, event.deltaYFrom($gamePlayer.y) * -1);
        }
    };


    const _Game_CharacterBase_moveStraight = Game_CharacterBase.prototype.moveStraight;
    Game_CharacterBase.prototype.moveStraight = function(d) {
        _Game_CharacterBase_moveStraight.call(this, d);
        if (this.isEventRangeEvent() && this.isMovementSucceeded() && !$gameMap.isEventRunning()) {
            $gamePlayer.setDistanceFrom(0, 0);
            if (this._trigger === 2 && this.range($gamePlayer.x, $gamePlayer.y) && !$gamePlayer.pos(this.x, this.y)) {
                if (!this.isJumping() && this.isNormalPriority()) {
                    this.start();
                }
            }
        }
    };

    Game_CharacterBase.prototype.isEventRangeEvent = function() {
        return false;
    };

    const _Game_Player_initMembers = Game_Player.prototype.initMembers;
    Game_Player.prototype.initMembers = function() {
        _Game_Player_initMembers.call(this);
        this._distanceFromX = 0;
        this._distanceFromY = 0;
    };

    Game_Player.prototype.setDistanceFrom = function(x, y) {
        this._distanceFromX = x;
        this._distanceFromY = y;
        $gameVariables.setValue(DistanceFromXVar, x);
        $gameVariables.setValue(DistanceFromYVar, y);
    };

    const _Game_Player_startMapEvent = Game_Player.prototype.startMapEvent;
    Game_Player.prototype.startMapEvent = function(x, y, triggers, normal) {
        this.setDistanceFrom(0, 0);
        _Game_Player_startMapEvent.call(this, x, y, triggers, normal);
        if (!$gameMap.isEventRunning()) {
            for (const event of $gameMap.eventsRangeEventPlayerXy(x, y)) {
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

    Game_Map.prototype.eventsRangeEventPlayerXy = function(x, y) {
        return this.events().filter(event => {
            return event.rangeEventPlayer(x, y);
        });
    };

    const _Game_Map_eventsXy = Game_Map.prototype.eventsXy;
    Game_Map.prototype.eventsXy = function(x, y) {
        const events = _Game_Map_eventsXy.call(this, x, y);
        return events.filter(event => !event.getEventRangeTag());
    };

    Game_Map.prototype.eventsRangeXyNt = function(e, x, y) {
        return this.events().filter(event => event.eventsRangeXyNt(x, y) && e !== event);
    };

    const _Game_Event_initialize = Game_Event.prototype.initialize;
    Game_Event.prototype.initialize = function(mapId, eventId) {
        this._rangeOnSelf = false;
        _Game_Event_initialize.call(this, mapId, eventId);
    };

    Game_Event.prototype.setRangeOnSelf = function(result) {
        if (this._eventRangeOnSelfTag) {
            if (this._rangeOnSelf && !result) {
                const key = [this._mapId, this._eventId, this._eventRangeOnSelfTag];
                $gameSelfSwitches.setValue(key, true);
            }
        }
        this._rangeOnSelf = result;
    };

    Game_Event.prototype.isEventRangeEvent = function() {
        return true;
    };

    Game_Event.prototype.rangeEventPlayer = function(x, y) {
        const result = this.range(x, y);
        this.setRangeOnSelf(result);
        return result;
    };

    const _Game_Event_lock = Game_Event.prototype.lock;
    Game_Event.prototype.lock = function() {
        if (!this._eventRangeUnlockTag) {
            _Game_Event_lock.call(this);
        }
    };

    const _Game_Event_isCollidedWithEvents = Game_Event.prototype.isCollidedWithEvents;
    Game_Event.prototype.isCollidedWithEvents = function(x, y) {
        const events = $gameMap.eventsRangeXyNt(this, x, y);
        return _Game_Event_isCollidedWithEvents.call(this, x, y) || events.length > 0;
    };

    const _Game_Event_isCollidedWithPlayerCharacters = Game_Event.prototype.isCollidedWithPlayerCharacters;
    Game_Event.prototype.isCollidedWithPlayerCharacters = function(x, y) {
        return _Game_Event_isCollidedWithPlayerCharacters.call(this, x, y) || (this.isNormalPriority() && this.isEventRangeCollidedWithPlayerCharacters(x, y))
    };

    Game_Event.prototype.isEventRangeCollidedWithPlayerCharacters = function(x, y) {
        return !!this.getEventRangeCollidedTag() && ($gamePlayer.range(x, y, this) || $gamePlayer.rangeFollower(x, y, this));
    };

    Game_Event.prototype.eventsRangeXyNt = function(x, y) {
        return !this.posNt(x, y) && !!this.getEventRangeCollidedTag() && this.range(x, y);
    };

    const _Game_CharacterBase_isCollidedWithEvents = Game_CharacterBase.prototype.isCollidedWithEvents;
    Game_CharacterBase.prototype.isCollidedWithEvents = function(x, y) {
        const events = $gameMap.eventsRangeXyNt(this, x, y);
        return _Game_CharacterBase_isCollidedWithEvents.call(this, x, y) || events.some(event => event.isNormalPriority());
    };

    Game_CharacterBase.prototype.obstacleJudgment = function(x, y) {
        if (this._eventRangeObstacleSensingTag) {
            const sx = this.deltaXFrom(x) * -1;
            const sy = this.deltaYFrom(y) * -1;
            const maxDelta = Math.max(Math.abs(x), Math.abs(y));
            for (let i = 0; i < maxDelta; i++) {
                const x2 = Math.round((sx / maxDelta) * (i + 1)) + this.x;
                const y2 = Math.round((sy / maxDelta) * (i + 1)) + this.y;
                if (!$gameMap.isObstacleJudgmentPassable(x2, y2)) {
                    return false;
                }
            }
        }
        return true;
    };

    Game_Map.prototype.isObstacleJudgmentPassable = function(x, y) {
        return this.checkPassage(x, y, 0x0f);
    };

    Game_Character.prototype.range = function(x, y, e) {
        const event = e ? e : this;
        const sx = Math.abs(this.deltaXFrom(x));
        const sy = Math.abs(this.deltaYFrom(y));
        const data = event.getEventRangeTag();
        const recognition = event.event().meta.EventRecognition ? Number(event.event().meta.EventRecognition) : EventRecognitionRange;
        if (recognition > 0 && (sx >= recognition || sy >= recognition)) {
            return false;
        }
        let result = false;
        if (data) {
            const arr = data.split(',');
            const mode = arr[0].trim();
            if (mode === 'range') {
                result = (this.rangeX(x, Number(arr[1])) && this.rangeY(y, Number(arr[2])));
            } else if (mode === 'besideRange') {
                result = this.besideRange(this.deltaXFrom(x), y, Number(arr[1]), Number(arr[2]));
            } else if (mode === 'verticalRange') {
                result = this.verticalRange(x, this.deltaYFrom(y), Number(arr[1]), Number(arr[2]));
            } else if (mode === 'rangeEX') {
                result = this.rangeEX(x, y, Number(arr[1]), Number(arr[2]), Number(arr[3]), Number(arr[4]),Number(arr[5]), Number(arr[6]), Number(arr[7]), Number(arr[8]));
            } else if (mode === 'circle') {
                result = this.circleRange(x, y, Number(arr[1]), Number(arr[2]));
            } else if (mode === 'triangle') {
                result = this.triangleRange(x, y, Number(arr[1]), Number(arr[2]));
            } else if (mode === 'frontRange') {
                result = this.frontRange(x, y, Number(arr[1]));
            } else if (mode === 'donut') {
                result = this.donutRange(x, y, Number(arr[1]));
            }
        }
        if (result) {      
            return event.obstacleJudgment(x, y);
        }
        return result;
    };

    Game_Character.prototype.rangeEX = function(x, y, x1, y1, x2, y2, x3, y3, x4, y4) {
        return (this.rangeCp(this.x + x1, this.y + y1, this.x + x2, this.y + y2, x, y) &&
        this.rangeCp(this.x + x2, this.y + y2, this.x + x3, this.y + y3, x, y) &&
        this.rangeCp(this.x + x3, this.y + y3, this.x + x4, this.y + y4, x, y) &&
        this.rangeCp(this.x + x4, this.y + y4, this.x + x1, this.y + y1, x, y));
    };

    Game_Character.prototype.besideRange = function(x, y, lx, rx) {
        return x <= lx && x >= rx * -1 && this.y === y;
    };

    Game_Character.prototype.verticalRange = function(x, y, uy, dy) {
        return y <= uy && y >= dy * -1 && this.x === x;
    };

    Game_Character.prototype.frontRange = function(x, y, h) {
        const sx = this.deltaXFrom(x);
        const sy = this.deltaYFrom(y);
        switch (this.direction()) {
            case 2:
                return sy < 0 && sy >= h * -1 && this.x === x;
            case 4:
                return sx > 0 && sx <= h && this.y === y;
            case 6:
                return sx < 0 && sx >= h * -1 && this.y === y;
            case 8:
                return sy > 0 && sy <= h && this.x === x;
        }
        return false;
    };

    Game_Character.prototype.rangeCp = function(ax, ay, bx, by, x, y) {
        const x2 = ax - bx;
        const y2 = ay - by;
        const a = bx - x;
        const b = by - y;
        return (x2 * b - y2 * a) >= 0;
    };

    Game_Character.prototype.circleRange = function(x, y, r, rad) {
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
        const ry = NuunManager.numPercentage(Math.abs(Math.tan(radian) * (a || 0.1)), 6, true);
        const rx = NuunManager.numPercentage(Math.abs(Math.tan(radian) * (b || 0.1)), 6, true);
        switch (this.direction()) {
            case 2:
                return h <= r && rx >= a && sy <= 0;
            case 4:
                return h <= r && ry >= b && sx >= 0;
            case 6:
                return h <= r && ry >= b && sx <= 0;
            case 8:
                return h <= r && rx >= a && sy >= 0;
        }
        return false;
    };

    Game_Character.prototype.triangleRange = function(x, y, r, rad) {
        const sx = this.deltaXFrom(x);
        const sy = this.deltaYFrom(y);
        const a = Math.abs(sx);
        const b = Math.abs(sy);
        rad = Math.min(rad, 180);
        const radian = (rad / 2) * (Math.PI / 180);
        const ry = NuunManager.numPercentage(Math.abs(Math.tan(radian) * (a || 0.1)), 6, true);
        const rx = NuunManager.numPercentage(Math.abs(Math.tan(radian) * (b || 0.1)), 6, true);
        switch (this.direction()) {
            case 2:
                return b <= r && rx >= a && sy <= 0;
            case 4:
                return a <= r && ry >= b && sx >= 0;
            case 6:
                return a <= r && ry >= b && sx <= 0;
            case 8:
                return b <= r && rx >= a && sy >= 0;
        }
        return false;
    };

    Game_Character.prototype.donutRange = function(x, y, r1, r2) {
        const a = Math.abs(this.deltaXFrom(x));
        const b = Math.abs(this.deltaYFrom(y));
        const h = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        return h <= r1 && h <= r2;
    };

    Game_Character.prototype.rangeX = function(x, x2) {
       return this.x >= x - Math.floor(x2 / 2) && this.x <= x + Math.floor(x2 / 2);
    };

    Game_Character.prototype.rangeY = function(y, y2) {
        return this.y >= y - Math.floor(y2 / 2) && this.y <= y + Math.floor(y2 / 2);
    };

    Game_Character.prototype.getEventRangeTag = function() {
        return this._eventRangeTag;
    };

    Game_Character.prototype.getEventRangeCollidedTag = function() {
        return this._eventRangeCollidedTag;
    };

    const _Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
    Game_Event.prototype.setupPageSettings = function() {
        _Game_Event_setupPageSettings.call(this);
        this.setRangeCommentTag();
    };

    const _Game_Event_clearPageSettings = Game_Event.prototype.clearPageSettings;
    Game_Event.prototype.clearPageSettings = function() {
        _Game_Event_clearPageSettings.call(this);
        this._eventRangeTag = null;
        this._eventRangeCollidedTag = null;
        this._eventRangeObstacleSensingTag = null;
        this._eventRangeOnSelfTag = null;
        this._eventRangeUnlockTag = null;
    };

    Game_Event.prototype.setRangeCommentTag = function() {
        const event = this.event();
        const re = /<(?:EventRange):\s*(.*)>/;
        const re2 = /<(?:EventRangeCollided)>/;
        const re3 = /<(?:EventRangeObstacle)>/;
        const re4 = /<(?:EventRangeOnSelf):\s*(.*)>/;
        const re5 = /<(?:EventRangeUnlock)>/;
        this._eventRangeTag = null;
        this._eventRangeCollidedTag = null;
        this._eventRangeObstacleSensingTag = null;
        this._eventRangeOnSelfTag = null;
        this._eventRangeUnlockTag = null;
        this.list().forEach(tag => {
            if (tag.code === 108 || tag.code === 408) {
                let match = re.exec(tag.parameters[0]);
                let match2 = re2.exec(tag.parameters[0]);
                let match3 = re3.exec(tag.parameters[0]);
                let match4 = re4.exec(tag.parameters[0]);
                let match5 = re5.exec(tag.parameters[0]);
                if (match) {
                    this._eventRangeTag = match[1];
                } else if (match2) {
                    this._eventRangeCollidedTag = !!match2[0];
                } else if (match3) {
                    this._eventRangeObstacleSensingTag = !!match3[0];
                } else if (match4) {
                    this._eventRangeOnSelfTag = match4[1];
                } else if (match5) {
                    this._eventRangeUnlockTag = match5[0];
                }
            }
        });
        if (!this._eventRangeTag && event.meta.EventRange) {
            this._eventRangeTag = event.meta.EventRange;
        }
        if (!this._eventRangeCollidedTag  && event.meta.EventRangeCollided) {
            this._eventRangeCollidedTag  = !!event.meta.EventRangeCollided;
        }
        if (!this._eventRangeObstacleSensingTag && event.meta.EventRangeObstacle) {
            this._eventRangeObstacleSensingTag  = !!event.meta.EventRangeObstacle;
        }
        if (!this._eventRangeOnSelfTag && event.meta.EventRangeOnSelf) {
            this._eventRangeOnSelfTag = event.meta.EventRangeOnSelf;
        }
        if (!this._eventRangeUnlockTag && event.meta.EventRangeUnlock) {
            this._eventRangeUnlockTag = event.meta.EventRangeUnlock;
        }
    };

    Game_Player.prototype.rangeFollower = function(x, y, e) {
        if (this.isThrough()) {
            return false;
        } else {
            return this._followers.isSomeoneRangeCollided(x, y, e);
        }
    };

    Game_Followers.prototype.isSomeoneRangeCollided = function(x, y, e) {
        return this.visibleFollowers().some(follower => follower.range(x, y, e));
    };

})();