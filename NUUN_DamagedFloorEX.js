/*:-----------------------------------------------------------------------------------
 * NUUN_DamagedFloorEX.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */
/*:
 * @target MZ
 * @plugindesc  ダメージ床拡張
 * @author NUUN
 * @version 1.0.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * ダメージ床のダメージ時の処理を拡張します。
 * リージョン設定を0にすることでリージョンを指定していないマップタイルで適用されます。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/10/24 Ver.1.0.0
 * 初版
 * 
 * @param DamagedFloorList
 * @text ダメージ床設定
 * @desc ダメージ床設定
 * @type struct<DamagedFloorData>[]
 * @default ["{\"TileSetId\":\"1\",\"DamagedFloorRegion\":\"[\\\"{\\\\\\\"RegionId\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Damage\\\\\\\":\\\\\\\"10\\\\\\\",\\\\\\\"DamagedFloorSE\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"volume\\\\\\\":\\\\\\\"90\\\\\\\",\\\\\\\"pitch\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"pan\\\\\\\":\\\\\\\"50\\\\\\\"}\\\"]\"}"]
 * 
 * @param DamagedFloorFlash
 * @text フラッシュ有効
 * @desc ダメージ時のフラッシュを有効にする。
 * @type boolean
 * @default false
 * 
 */
/*~struct~DamagedFloorData:
 * 
 * @param TileSetId
 * @text タイルセットID
 * @desc タイルセットID
 * @type tileset
 * @default 0
 * 
 * @param DamagedFloorRegion
 * @text ダメージ床リージョン設定
 * @desc ダメージ床リージョン設定
 * @type struct<DamagedFloorRegionData>[]
 * @default []
 * 
 * 
 */
/*~struct~DamagedFloorRegionData:
 * 
 * @param RegionId
 * @text リージョンID
 * @desc リージョンID
 * @type number
 * @default 0
 * 
 * @param Damage
 * @text ダメージ
 * @desc 床ダメージ時のダメージ
 * @type number
 * @default 10
 * 
 * @param DamagedFloorSE
 * @text 床ダメージ時SE
 * @desc 床ダメージ時のSE
 * @type file
 * @dir audio/se/
 * 
 * @param volume
 * @text 音量
 * @desc 音量。
 * @type number
 * @default 90
 * 
 * @param pitch
 * @text ピッチ
 * @desc ピッチ。
 * @type number
 * @default 100
 * 
 * @param pan
 * @text 位相
 * @desc 位相。
 * @type number
 * @default 50
 * 
 */
var Imported = Imported || {};
Imported.NUUN_DamagedFloorEX = true;

(() => {
const parameters = PluginManager.parameters('NUUN_DamagedFloorEX');
const DamagedFloorList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['DamagedFloorList'])) : null) || [];
const DamagedFloorFlash = eval(parameters['DamagedFloorFlash'] || 'false');
let onMapFloorDamage = false;
let floorDamageRefresh = false;

const _Game_Actor_executeFloorDamage = Game_Actor.prototype.executeFloorDamage;
Game_Actor.prototype.executeFloorDamage = function() {
  onMapFloorDamage = true;
  _Game_Actor_executeFloorDamage.call(this);
  onMapFloorDamage = false;
};

const _Game_Actor_performMapDamage = Game_Actor.prototype.performMapDamage;
Game_Actor.prototype.performMapDamage = function() {
  if (onMapFloorDamage) {
    if (!$gameParty.inBattle() && floorDamageRefresh) {
      floorDamageRefresh = false;
      if (DamagedFloorFlash) {
        _Game_Actor_performMapDamage.call(this);
      }
    $gameMap.getDamagedFloorListData();
    }
  } else {
    _Game_Actor_performMapDamage.call(this);
  }
};

const _Game_Actor_basicFloorDamage = Game_Actor.prototype.basicFloorDamage;
Game_Actor.prototype.basicFloorDamage = function() {
  const damagedFloorId = $gameMap._damagedFloorId;
  if (damagedFloorId >= 0) {
    const x = $gamePlayer._x;
    const y = $gamePlayer._y;
    const regionId = $gameMap.regionId(x, y);
    const damagedFloorData = DamagedFloorList[$gameMap._damagedFloorId].DamagedFloorRegion || [];
    const mainData = damagedFloorData.find(data => data.RegionId === regionId);
    return mainData ? mainData.Damage : _Game_Actor_basicFloorDamage.call(this);
  } else {
    return _Game_Actor_basicFloorDamage.call(this);
  }
};


const _Game_Party_onPlayerWalk = Game_Party.prototype.onPlayerWalk;
Game_Party.prototype.onPlayerWalk = function() {
  floorDamageRefresh = true;
  _Game_Party_onPlayerWalk.call(this);
};


const _Game_Map_initialize  = Game_Map.prototype.initialize ;
Game_Map.prototype.initialize = function() {
  _Game_Map_initialize.call(this);
  this._damagedFloorId = -1;
};

const _Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
  _Game_Map_setup.call(this, mapId);
  this.initDamagedFloorId()
};

Game_Map.prototype.initDamagedFloorId = function(mapId) {
  this._damagedFloorId = DamagedFloorList.findIndex(data => data.TileSetId === this._tilesetId);
};

Game_Map.prototype.getDamagedFloorListData = function() {
  if (this._damagedFloorId >= 0) {
    const x = $gamePlayer._x;
    const y = $gamePlayer._y;
    const regionId = this.regionId(x, y);
    const damagedFloorData = DamagedFloorList[this._damagedFloorId].DamagedFloorRegion || [];
    const mainData = damagedFloorData.find(data => data.RegionId === regionId);
    if (mainData && mainData.DamagedFloorSE) {
      AudioManager.playSe({"name":mainData.DamagedFloorSE,"volume":mainData.volume,"pitch":mainData.pitch,"pan":mainData.pan});
    }
  }
};

})();