/*:-----------------------------------------------------------------------------------
 * NUUN_SeamlessMap.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Combine multiple maps
 * @author NUUN
 * @version 1.2.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * Combine multiple maps into one map.
 * The map set as the first map in the list of combined map settings in the plug-in parameter will be the standard map.
 * Maps are automatically combined when you move to the set map.
 * Map name, display name, tileset, scroll type, enemy appearance step count, BGM automatic play, BGS automatic play, battle background, dash prohibition, distant view, and memo are applied to the map data of the list No. 1.
 * Encounters will be integrated with all map encounters set in the list.
 * The event ID after combination is the number added to the number of map events before it, so if you want to get the event ID, use the plug-in command "Get event ID". please.
 * 
 * Make sure all maps that you combine are the same size.
 * 
 * If the setting of the combined map setting is 3, 5, 6, 7 and the horizontal size of the map is 2 and the vertical size is 2
 * 3,5
 * 6,7
 * joined by .
 * 
 * When moving to the second or later map in the list by moving to a place with an event command, it will move to the base map. At that time, the coordinates are also adjusted to the set position.
 * 
 * plugin command
 * Get event ID
 * Assign the event ID in the binding map to a variable.
 * 
 * Event ID set
 * Sets the id of the bound event. Set this when you want to specify the ID of an event set in a map other than the base map when acquiring events using the event command.
 * Reset after setting the corresponding event command.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 2/26/2025 Ver.1.2.0
 * Added the ability to specify maps as variables.
 * 2/8/2023 Ver.1.1.6
 * Fixed a conflict with the Template Events plugin.
 * 11/12/2022 Ver.1.1.5
 * Changed the display in languages other than Japanese to English.
 * 2/25/2022 Ver.1.1.4
 * Fixed not to load concatenated map json file in the same map.
 * 2/20/2022 Ver.1.1.3
 * Re-correction.
 * 2/19/2022 Ver.1.1.2
 * Fixed an issue where an error would appear after moving the map.
 * 2/6/2022 Ver.1.1.1
 * Fixed an issue where events were not applied properly when moving maps.
 * 2/6/2022 Ver.1.1.0
 * Added a function that can specify an event ID other than the reference map.
 * 2/6/2022 Ver.1.0.0
 * first edition.
 * 
 * 
 * @command SeamlessMapEventId
 * @desc Get the event id in the binding map.
 * @text Get event ID
 * 
 * @arg MapId
 * @type number
 * @default 0
 * @desc Specifies the original map ID.
 * @text Original map ID
 * 
 * @arg EventId
 * @type number
 * @default 0
 * @desc Specifies the event ID of the original map.
 * @text Original map event ID
 * 
 * @arg IDVariable
 * @type variable
 * @default 0
 * @text Assignment variable
 * @desc A game variable that assigns the event ID.
 * 
 * @command SetEventData
 * @desc Sets the id of the bound event.
 * @text Event ID set
 * 
 * @arg MapId
 * @type number
 * @default 0
 * @desc Specifies the original map ID.
 * @text Original map ID
 * 
 * @arg EventId
 * @type number
 * @default 0
 * @desc Specifies the event ID of the original map. If the original map ID is 0, specify the event ID of the combined map.
 * @text Original map event ID
 * 
 * 
 * 
 * @param SeamlessMapSetting
 * @text Combined map settings
 * @desc Configure the binding map.
 * @type struct<SeamlessMapData>[]
 * @default []
 * 
 */
/*~struct~SeamlessMapData:
 * 
 *@param SeamlessMapList
 * @text Combined map settings
 * @desc Sets the combined smap. The map ID set at the top will be the base map.
 * @type struct<SeamlessMapIdList>[]
 * @default []
 * 
 * @param SeamlessMapXNum
 * @text Number of horizontal maps to connect
 * @desc The number of horizontal maps to concatenate.
 * @type number
 * @default 1
 * @min 1
 * 
 * @param SeamlessMapYNum
 * @text Number of vertical maps to be connected
 * @desc The number of vertical maps to concatenate.
 * @type number
 * @default 1
 * @min 1
 * 
 */
/*~struct~SeamlessMapIdList:
 * 
 * @param SeamlessMapId
 * @text Combined map id
 * @desc Set map id. The map ID set at the top will be the base map.
 * @type map
 * @default 0
 * 
 * @param SeamlessMapVariable
 * @text Combined map ID variable
 * @desc Set the variable that specifies the map ID. The map ID set at the top will be the base map.
 * @type variable
 * @default 0
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 複数マップ結合
 * @author NUUN
 * @version 1.2.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * 複数のマップを一つのマップに結合します。
 * プラグインパラメータの結合マップ設定のリスト1番に設定したマップが基準となるマップとなります。
 * 設定したマップに移動した時点で自動的にマップが結合されます。
 * マップ名、表示名、タイルセット、スクロールタイプ、敵出現歩数、BGM自動演奏、BGS自動演奏、戦闘背景、ダッシュ禁止
 * 遠景、メモはリスト1番のマップデータが適用されます。
 * エンカウントはリストで設定したマップのエンカウントが全て統合されます。
 * 
 * 結合後のイベントIDはリストの2番目以降のIDは、その前のマップイベント数に加算された数値になりますので、
 * イベントIDを取得したい場合はプラグインコマンドのイベントID取得から取得してください。
 * 
 * 結合させるマップはすべて同じサイズにしてください。
 * 
 * 結合マップ設定の設定が3,5,6,7でマップの横サイズが2、縦サイズが2の場合は
 * 3,5
 * 6,7
 * で結合されます。
 * 
 * イベントコマンドでの場所移動で、リストの2番目以降のマップに移動したときは基準となるマップに移動します。その際に座標も設定した位置に調整されます。
 * 
 * プラグインコマンド
 * イベントID取得
 * 結合マップ内のイベントIDを変数に代入します。
 * 
 * イベントIDセット
 * 結合したイベントのIDをセットします。イベントコマンドでのイベント取得で基準マップ以外のマップで設定したイベントのIDを指定したいときに設定します。
 * 該当のイベントコマンドを設定した後にリセットします。
 * 
 * 更新履歴
 * 2025/2/26 Ver.1.2.0
 * マップを変数で指定できる機能を追加。
 * 2023/2/8 Ver.1.1.6
 * テンプレートイベントプラグインと競合を起こす問題を修正。
 * 2022/11/12 Ver.1.1.5
 * 日本語以外での表示を英語表示に変更。
 * 2022/2/25 Ver.1.1.4
 * 同一マップでは連結マップjsonファイルを読み込まないように修正。
 * 2022/2/20 Ver.1.1.3
 * 再修正。
 * 2022/2/19 Ver.1.1.2
 * マップ移動後にエラーが出る問題を修正。
 * 2022/2/6 Ver.1.1.1
 * マップ移動時にイベントが正常に適用されない問題を修正。
 * 2022/2/6 Ver.1.1.0
 * 基準マップ以外のイベントIDを指定できる機能を追加。
 * 2022/2/6 Ver.1.0.0
 * 初版
 * 
 * 
 * @command SeamlessMapEventId
 * @desc 結合マップ内のイベントIDを取得します。
 * @text イベントID取得
 * 
 * @arg MapId
 * @type number
 * @default 0
 * @desc 元のマップIDを指定します。
 * @text 元マップID
 * 
 * @arg EventId
 * @type number
 * @default 0
 * @desc 元のマップのイベントIDを指定します。
 * @text 元マップイベントID
 * 
 * @arg IDVariable
 * @type variable
 * @default 0
 * @text 代入変数
 * @desc イベントIDを代入するゲーム変数。
 * 
 * @command SetEventData
 * @desc 結合したイベントのIDをセットします。
 * @text イベントIDセット
 * 
 * @arg MapId
 * @type number
 * @default 0
 * @desc 元のマップIDを指定します。
 * @text 元マップID
 * 
 * @arg EventId
 * @type number
 * @default 0
 * @desc 元のマップのイベントIDを指定します。元マップIDが0の場合は結合したマップのイベントIDで指定します。
 * @text 元マップイベントID
 * 
 * 
 * 
 * @param SeamlessMapSetting
 * @text 結合マップ設定
 * @desc 結合マップの設定します。
 * @type struct<SeamlessMapData>[]
 * @default []
 * 
 */
/*~struct~SeamlessMapData:ja
 * 
 *@param SeamlessMapList
 * @text 結合マップ設定
 * @desc 結合マップの設定します。一番上に設定したマップIDが基準となるマップになります。
 * @type struct<SeamlessMapIdList>[]
 * @default []
 * 
 * @param SeamlessMapXNum
 * @text 連結する横マップ数
 * @desc 連結する横のマップ数。
 * @type number
 * @default 1
 * @min 1
 * 
 * @param SeamlessMapYNum
 * @text 連結する縦マップ数
 * @desc 連結する縦のマップ数。
 * @type number
 * @default 1
 * @min 1
 * 
 */
/*~struct~SeamlessMapIdList:ja
 * 
 * @param SeamlessMapId
 * @text 結合マップID
 * @desc マップIDを設定します。一番上に設定したマップIDが基準となるマップになります。
 * @type map
 * @default 0
 * 
 * @param SeamlessMapVariable
 * @text 結合マップID変数
 * @desc マップIDを指定する変数を設定します。一番上に設定したマップIDが基準となるマップになります。
 * @type variable
 * @default 0
 * 
 */
var Imported = Imported || {};
Imported.NUUN_SeamlessMap = true;

(() => {
const parameters = PluginManager.parameters('NUUN_SeamlessMap');
const SeamlessMapSetting = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['SeamlessMapSetting'])) : null) || [];
let SeamlessMaps = [];
let _seamlessMapData = null;
$dataSeamlessMap = [];

const pluginName = "NUUN_SeamlessMap";
PluginManager.registerCommand(pluginName, 'SeamlessMapEventId', args => {
    const index = $gameMap.getSeamlessEventId(Number(args.MapId), Number(args.EventId));
    $gameVariables.setValue(Number(args.IDVariable), index);
});

PluginManager.registerCommand(pluginName, 'SetEventData', args => {
    const index = $gameMap.getSeamlessEventId(Number(args.MapId), Number(args.EventId));
    $gameTemp.seamlessEventId = index;
});


function _getSeamlessMapData(mapId) {
    return SeamlessMapSetting.find(data => {
        const seamlessMap = data.SeamlessMapList;
        if (seamlessMap && seamlessMap.length > 1) {
            if ($gameVariables && seamlessMap[0].SeamlessMapVariable > 0) {
                return $gameVariables.value(seamlessMap[0].SeamlessMapVariable) === mapId;
            } else {
                return seamlessMap[0].SeamlessMapId === mapId;
            }
        }
    });
};

function _getSeamlessMaps(mapId) {
    SeamlessMaps = [];
    _seamlessMapData = _getSeamlessMapData(mapId);
    if (!_seamlessMapData) return;
    const seamlessMap = _seamlessMapData.SeamlessMapList;
    seamlessMap.forEach(data => {
        if ($gameVariables && data.SeamlessMapVariable > 0) {
            SeamlessMaps[$gameVariables.value(data.SeamlessMapVariable)] = $gameVariables.value(seamlessMap[0].SeamlessMapVariable);
        } else {
            SeamlessMaps[data.SeamlessMapId] = seamlessMap[0].SeamlessMapId;
        }
    });
}

function isSeamlessMapIndex(mapId) {
    return SeamlessMaps[mapId] ? SeamlessMaps[mapId] : -1;
};

function getSeamlessMapData() {
    return _seamlessMapData;
};

function seamlessMapCheck(seamlessMap, width, height) {
    return seamlessMap.every(map => map.width === width && map.height === height);
};

function getSeamlessMapPosition(mapId) {
    const data = getSeamlessMapData(mapId);
    if (data) {
        const index = getSeamlessMapIndex(data, mapId);
        const col = index % data.SeamlessMapXNum;
        const row = Math.floor(index / data.SeamlessMapYNum);
        return [col, row];
    }
    return [0, 0];
};

function getSeamlessMapIndex(data, mapId) {
    return _getSeamlessMap(data).indexOf(mapId);
};

function _getSeamlessMap(data) {
    return data.SeamlessMapList.map(id => {
        return _getSeamlessMapId(id);
    });
};

function _getSeamlessMapId(data) {
    return $gameVariables && data.SeamlessMapVariable > 0 ? $gameVariables.value(data.SeamlessMapVariable) :data.SeamlessMapId;
};


DataManager.loadSeamlessMap = function(mapId) {
    const mapData = getSeamlessMapData(mapId);
    if (mapData) {
        const mapList = mapData.SeamlessMapList.map(data => _getSeamlessMapId(data));
        if (this._loadedMapId !== mapList[0]) {//ランダムマップ生成時注意
            mapList.forEach((id, r) => {
                if (id > 0) {
                    const filename = "Map%1.json".format(id.padZero(3));
                    this.loadSeamlessMapDataFile("$dataSeamlessMap", filename, r);
                    this.seamlessMapId[r] = id;
                }
            });
        }       
    }
};

DataManager.loadSeamlessMapDataFile = function(name, src, r) {
    const xhr = new XMLHttpRequest();
    const url = "data/" + src;
    window[name][r] = null;
    xhr.open("GET", url);
    xhr.overrideMimeType("application/json");
    xhr.onload = () => this.onXhrSeamlessMapLoad(xhr, name, src, url, r);
    xhr.onerror = () => this.onXhrError(name, src, url);
    xhr.send();
};

DataManager.onXhrSeamlessMapLoad = function(xhr, name, src, url, r) {
    if (xhr.status < 400) {
        window[name][r] = JSON.parse(xhr.responseText);
        this.onLoad(window[name][r]);
    } else {
        this.onXhrError(name, src, url);
    }
};

const _DataManager_loadMapData = DataManager.loadMapData;
DataManager.loadMapData = function(mapId) {
    this.seamlessMapId = [];
    _getSeamlessMaps(mapId);
    const id = isSeamlessMapIndex(mapId);
    if (id > 0) {
        this.loadSeamlessMap(mapId);
        mapId = id;
    }
    this._loadedMapId = mapId;
    _DataManager_loadMapData.call(this, mapId);
};

const _DataManager_isMapLoaded = DataManager.isMapLoaded;
DataManager.isMapLoaded = function() {
    if (this.seamlessMapId && this.seamlessMapId.length > 1) {
        return this.isSeamlessMapLoaded();
    } else {
        return _DataManager_isMapLoaded.call(this);
    }
};

DataManager.isSeamlessMapLoaded = function() {
    this.checkError();
    return !!$dataMap && !!$dataSeamlessMap.every(map => !!map);
};


const _Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
    this.setSeamlessMap();
    _Scene_Map_onMapLoaded.call(this);
};

Scene_Map.prototype.setSeamlessMap = function() {
    const mapId = $gamePlayer._newMapId > 0 ? $gamePlayer._newMapId : $gameMap.mapId();
    const data = getSeamlessMapData(mapId);
    this.seamlessMap(data);
    this.seamlessEncounter(data);
    this.setSeamlessMapEvants(data);
};

Scene_Map.prototype.seamlessMap = function(data) {
    if (data) {
        const maps = [];
        const seamlessMap = $dataSeamlessMap;
        const width = seamlessMap[0].width;
        const height = seamlessMap[0].height;
        $gameMap.orgWidth = width;
        $gameMap.orgHeight = height;
        if (seamlessMapCheck(seamlessMap, width, height)) {
            const maxNum = width * height;
            for (let i = 0; i < 6; i++) {
                for (let h = 0; h < data.SeamlessMapYNum; h++) {
                    for (let r = 0; r < height; r++) {
                        for (let w = 0; w < data.SeamlessMapXNum; w++) {
                            const mapData = seamlessMap[h * data.SeamlessMapXNum + w];
                            const seamlessMapData = mapData.data.slice(r * width + maxNum * i, r * width + width + maxNum * i);
                            Array.prototype.push.apply(maps, seamlessMapData);
                        }
                    }
                }
            }
            $dataMap.data = maps;
            $dataMap.width *= data.SeamlessMapXNum;
            $dataMap.height *= data.SeamlessMapYNum;
        }
    }
};

Scene_Map.prototype.setSeamlessMapEvants = function(data) {
    if (data) {
        const events = [];
        const seamlessMap = $dataSeamlessMap;
        if (seamlessMap.length > 0) {
            seamlessMap.forEach((map, r) => {
                if (map) {
                    let event = map.events;
                    let eventLength = events.length
                    if (event.length > 0) {
                        if (r > 0) {
                            event = event.slice(1);
                            eventLength -= 1;
                        }
                        event.forEach(eventData => {
                            if (eventData) {
                                eventData.seamlessId = r;
                                eventData.orgEvantId = eventData.id;
                                eventData.orgMapId = DataManager.seamlessMapId[r];
                                eventData.x += (r % data.SeamlessMapXNum * ($gameMap.orgWidth || 0));
                                eventData.y += (Math.floor(r / data.SeamlessMapYNum) * ($gameMap.orgHeight || 0));
                                eventData.id = eventData.id + eventLength;
                            }
                        });
                        Array.prototype.push.apply(events, event);
                    }
                }
            });
            $dataMap.events = events;
        }
    }
};

Scene_Map.prototype.seamlessEncounter = function(data) {
    if (data) {
        const encounter = [];
        const seamlessMap = $dataSeamlessMap;
        seamlessMap.forEach(map => {
            const list = map.encounterList;
            if (list.length > 0) {
                Array.prototype.push.apply(encounter, list);
            }
        });
        $dataMap.encounterList = encounter;
    }
};


const _Game_Map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
    _Game_Map_initialize.call(this);
    this.orgWidth = 0;
    this.orgHeight = 0;
};

Game_Map.prototype.getSeamlessEventId = function(mapId, eventId) {
    const events = this.events();
    for (const event of events) {
        if (mapId === 0 && eventId === event.orgEventId) {
            return event._eventId;
        } else if (mapId === event.orgMapId && eventId === event.orgEventId) {
            return event._eventId;
        }
    }
    return -1;
};


const _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
    _Game_CharacterBase_initMembers.call(this);
    this.orgMapId = 0;
};


const _Game_Player_reserveTransfer = Game_Player.prototype.reserveTransfer;
Game_Player.prototype.reserveTransfer = function(mapId, x, y, d, fadeType) {
    const seamlessMapId = isSeamlessMapIndex(mapId);
    if (seamlessMapId > 0) {
        this.orgMapId = mapId;
        const position = getSeamlessMapPosition(mapId);
        x += position[0] * ($gameMap.orgWidth || 0);
        y += position[1] * ($gameMap.orgHeight || 0);
        mapId = seamlessMapId;
    }
    _Game_Player_reserveTransfer.call(this, mapId, x, y, d, fadeType);
};


const _Game_Vehicle_setLocation = Game_Vehicle.prototype.setLocation;
Game_Vehicle.prototype.setLocation = function(mapId, x, y) {
    const position = this.seamlessPosition(mapId, x, y);
    _Game_Vehicle_setLocation.call(this, position[0], position[1], position[2]);
};

Game_Vehicle.prototype.seamlessPosition = function(mapId, x, y) {
    const seamlessMapId = isSeamlessMapIndex(mapId);
    if (seamlessMapId > 0 && mapId !== seamlessMapId) {
        const position = getSeamlessMapPosition(mapId);
        x += position[0] * ($gameMap.orgWidth || 0);
        y += position[1] * ($gameMap.orgHeight || 0);
        this.orgMapId = mapId;
        mapId = seamlessMapId;
    }
    return [mapId, x, y];
};

const _Game_Vehicle_refresh = Game_Vehicle.prototype.refresh;
Game_Vehicle.prototype.refresh = function() {
    const position = this.seamlessPosition(this._mapId, this.x, this.y);
    if (position[0] !== this.x || position[1] !== this.y) {
        this._mapId = position[0];
        this.setPosition(position[1], position[2]);
    }
    _Game_Vehicle_refresh.call(this)
};


const _Game_Event_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
    _Game_Event_initialize.call(this, mapId, eventId);
    const event = this.event();
    this.orgEventId = event.orgEvantId || eventId;
    this.orgMapId = event.orgMapId || mapId;
};


const _Game_Interpreter_character = Game_Interpreter.prototype.character;
Game_Interpreter.prototype.character = function(param) {
    if ($gameTemp.seamlessEventId > 0) {
        param = $gameTemp.seamlessEventId;
        $gameTemp.seamlessEventId = -1;
    }
    return _Game_Interpreter_character.call(this, param);
};

})();
