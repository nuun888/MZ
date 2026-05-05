/*:-----------------------------------------------------------------------------------
 * NUUN_EventMoveMode.js
 * 
 * Copyright (C) 2026 NUUN
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Event Movement Mode Settings
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * Configures the event’s movement mode.
 * You can choose from the following movement modes.
 * Blank: Normal movement
 * 1:Same as the small boat
 * 2:Same as the large ship
 * 3:Same as the airship
 * 
 * Allows you to configure events that can move across water.
 * 
 * Specify this in the event’s note field or in a comment within the event commands.
 * <EventMoveMode:[id]> Movement will follow the ID mode specified above. This applies to all event pages.
 * If written in the event commands, the setting applies only to that page.
 * [id]: The ID listed below
 * 1:Same as the small boat
 * 2:Same as the large ship
 * 3:Same as the airship
 * 
 * Terms of Use
 * Credit: Optional
 * Commercial use: Possible
 * Adult content: Possible
 * Modifications: Possible
 * Redistribution: Possible
 * Support is not available for modified versions or downloads from sources other than https://github.com/nuun888/MZ, the official forum, or authorized retailers.
 * 
 * Log
 * 5/5/2026 Ver.1.0.0
 * First edition.
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc イベントの移動モード設定
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * イベントの移動モードを設定します。
 * 移動モードは以下から選択できます。
 * 無記入:通常の移動
 * 1:小型船と同じ
 * 2:大型船と同じ
 * 3:飛行艇と同じ
 * 
 * 海上を移動できるイベントを設定することが出来ます。
 * 
 * イベントのメモ欄及び、イベントの実行内容の注釈で記述
 * <EventMoveMode:[id]> 上記のIDモードでの通行になります。全てのページで有効になります。
 * イベントの実行内容に記入の場合はそのページでのみ有効になります。
 * [id]:下記のID
 * 1:小型船と同じ
 * 2:大型船と同じ
 * 3:飛行艇と同じ
 * 
 * 
 * 利用規約
 * クレジット表記：任意
 * 商業利用：可能
 * 成人向け：可能
 * 改変：可能
 * 再配布：可能
 * https://github.com/nuun888/MZ、公式フォーラム、正規販売サイト以外からのダウンロード、改変済みの場合はサポートは対象外となります。
 * 
 * 更新履歴
 * 2026/5/5 Ver.1.0.0
 * 初版
 * 
 * 
 */

var Imported = Imported || {};
Imported.NUUN_EventMoveMode = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;

    const _Game_Event_initMembers = Game_Event.prototype.initMembers;
    Game_Event.prototype.initMembers = function() {
        _Game_Event_initMembers.apply(this, arguments);
        this._eventMoveMode = 0;
    };

    const _Game_Event_refresh = Game_Event.prototype.refresh;
    Game_Event.prototype.refresh = function() {
        _Game_Event_refresh.apply(this, arguments);
        this.nuun_EventMapPassable();
    };

    Game_Event.prototype.nuun_EventMapPassable = function() {
        const page = this.event().pages[this._pageIndex];
        if (!!page) {
            this.nuun_EventMapPassableTag(page);
        }
    };

    Game_Event.prototype.nuun_EventMapPassableTag = function(page) {
        this._eventMoveMode = 0;
        const re = /<(?:EventMoveMode):\s*(.*)>/;
        for (const tag of page.list) {
            if (tag.code === 108 || tag.code === 408) {
                const match = re.exec(tag.parameters[0]);
                if (match) {
                    this._eventMoveMode = Number(match[1]);
                }
            }
        }
    };

    const _Game_CharacterBase_isMapPassable = Game_CharacterBase.prototype.isMapPassable;
    Game_CharacterBase.prototype.isMapPassable = function(x, y, d) {
        return this.isEventMapPassable(x, y, d);
    };

    Game_CharacterBase.prototype.isEventMapPassable = function(x, y, d) {
        return _Game_CharacterBase_isMapPassable.apply(this, arguments);
    };

    Game_Event.prototype.isEventMapPassable = function(x, y, d) {
        if (!this._eventMoveMode && !this.event().meta.EventMoveMode) return _Game_CharacterBase_isMapPassable.apply(this, arguments);
        const x2 = $gameMap.roundXWithDirection(x, d);
        const y2 = $gameMap.roundYWithDirection(y, d);
        const movingMode = !!this._eventMoveMode ? this._eventMoveMode : NuunManager.getMetaCode(this.event(), "EventMoveMode");
        if (!movingMode) return _Game_CharacterBase_isMapPassable.apply(this, arguments);
        switch (Number(movingMode)) {
            case 1:
                return $gameMap.isBoatPassable(x2, y2);
            case 2:
                return $gameMap.isShipPassable(x2, y2);
            case 3:
                return true;
            default:
                return false;
        }
    };

})();