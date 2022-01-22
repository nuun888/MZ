/*:-----------------------------------------------------------------------------------
 * NUUN_RegionMapName.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc 地域マップ名
 * @author NUUN
 * @version 1.0.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * 場所によってマップ名が変わる地域名を表示します。
 * 地域名はリージョンIDによりマップ名が変わります。
 * 
 * 設定方法はマップの設定のメモ欄での設定またはプラグインパラメータから設定します。
 * 両方設定してある場合はマップの設定が適用されます。
 * 
 * マップの設定のメモ欄
 * <RegionMapName[regionId]:[MapName]> 指定したリージョンID内の地域名を設定します。
 * [regionId]:リージョンID
 * [MapName]:マップ名
 * <RegionMapName6:'ジャングル'> プレイヤーがリージョンID６番の場所に入ったときに、マップ名をジャングルに変更します。
 * 地域名は設定したリージョンID内のみマップ名が変更します。指定のリージョンIDから外れた場合は元のマップ名または別の地域名が表示されます。
 * 
 * 更新履歴
 * 2022/1/22 Ver.1.0.0
 * 初版
 * 
 * @param RegionMapNames
 * @text 地域マップ名設定
 * @desc 地域マップ名の設定を行います。
 * @type struct<RegionMapNamesList>[]
 * @default []
 * 
 */
/*~struct~RegionMapNamesList:
 * 
 * @param MapId
 * @text マップID
 * @desc マップID
 * @type number
 * @default 0
 * 
 * @param RegionMapName
 * @text マップ内地域マップ名設定
 * @desc マップ内の地域マップ名の設定を行います。
 * @type struct<RegionMapNameList>[]
 * @default []
 * 
 */
/*~struct~RegionMapNameList:
 * 
 * @param RegionId
 * @text リージョンID
 * @desc リージョンID
 * @type number
 * @default 0
 * 
 * @param mapName
 * @text 地域マップ名
 * @desc 地域マップ名
 * @type string
 * @default
 * 
 */
var Imported = Imported || {};
Imported.NUUN_RegionMapName = true;

(() => {
const parameters = PluginManager.parameters('NUUN_RegionMapName');
const RegionMapNames = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['RegionMapNames'])) : null) || [];

const _Game_Map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
    _Game_Map_initialize.call(this);
    this._oldMapName = '';
};

const _Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    _Game_Map_setup.call(this, mapId);
    if ($dataMap) {
        this.setOldMapName();
    }
};

const _Game_Map_displayName = Game_Map.prototype.displayName;
Game_Map.prototype.displayName = function() {
    const regionName = this.regionMapName();
    return  regionName ? regionName : _Game_Map_displayName.call(this);
};

Game_Map.prototype.regionMapName = function() {
    const x = $gamePlayer._x;
    const y = $gamePlayer._y;
    const regionId = this.regionId(x, y);
    const data = this.getRegionMapName(regionId);
    const mapName = data ? data.mapName : null;
    const tag = 'RegionMapName'
    if ($dataMap.meta[tag + regionId]) {
        return String($dataMap.meta[tag + regionId]);
    } else if (mapName) {
        return mapName;
    }
    return '';
};

Game_Map.prototype.getRegionMapName = function(regionId) {
    const list = RegionMapNames.find(data => data.MapId === this._mapId);
    if (list) {
        return list.RegionMapName.find(data => data.RegionId === regionId);
    }
    return list;
};

Game_Map.prototype.setOldMapName = function() {
    this._oldMapName = this.displayName();
};

Game_Map.prototype.getOldMapName = function() {
    return this._oldMapName;
};

const _Scene_Map_updateMapNameWindow = Scene_Map.prototype.updateMapNameWindow;
Scene_Map.prototype.updateMapNameWindow = function() {
    _Scene_Map_updateMapNameWindow.call(this);
    const newMapName = $gameMap.displayName();
    if (newMapName && $gameMap.getOldMapName() !== newMapName) {
        $gameMap.enableNameDisplay();
        $gameMap.setOldMapName();
        this._mapNameWindow.open();
    }
};

})();
