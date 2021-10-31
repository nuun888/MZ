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
 * @version 1.0.3
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * ダメージ床のダメージ時の処理を拡張します。
 * リージョン設定を0にすることでリージョンを指定していないマップタイルで適用されます。
 * リージョンと地形タグを両方指定している場合はどちらかが一致したときに適用されます。
 * 床ダメージ設定の優先度はリストの上の設定から判定し一致した条件が適用されます。
 * リージョン、地形タグを設定した条件は上のほうに設定してください。
 * フラッシュ設定はリスト５番の数値を0と入力することでフラッシュされません。
 * 
 * 床ダメージ値は評価式が使用できます。
 * a：アクター
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/10/31 Ver.1.0.3
 * 地形タグ、フラッシュを設定できる機能を追加。
 * 2021/10/24 Ver.1.0.2
 * 床ダメージを評価式が使用できるように変更。
 * 2021/10/24 Ver.1.0.1
 * デフォルトの床ダメージ、床ダメージ時のSEを指定できる機能を追加。
 * 2021/10/24 Ver.1.0.0
 * 初版
 * 
 * @param DamagedFloorList
 * @text ダメージ床設定
 * @desc ダメージ床設定
 * @type struct<DamagedFloorData>[]
 * @default ["{\"TileSetId\":\"4\",\"DamagedFloorRegion\":\"[\\\"{\\\\\\\"RegionId\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Damage\\\\\\\":\\\\\\\"10\\\\\\\",\\\\\\\"SE\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"DamagedFloorSE\\\\\\\":\\\\\\\"Poison\\\\\\\",\\\\\\\"volume\\\\\\\":\\\\\\\"90\\\\\\\",\\\\\\\"pitch\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"pan\\\\\\\":\\\\\\\"50\\\\\\\"}\\\"]\"}"]
 * 
 * @param DamagedFloorFlash
 * @text フラッシュ有効
 * @desc ダメージ時のフラッシュを有効にする。
 * @type boolean
 * @default false
 * 
 * @param DefaultDamage
 * @text デフォルトダメージ
 * @desc デフォルト床ダメージ時のダメージ（a：アクター）
 * @type string
 * @default 10
 * 
 * @param DefaultSE
 * @text デフォルトのSE設定
 * @default ------------------------------
 * 
 * @param DefaultDamagedFloorSE
 * @text デフォルト床ダメージ時SE
 * @desc デフォルトの床ダメージ時のSE
 * @type file
 * @dir audio/se/
 * @parent DefaultSE
 * 
 * @param DefaultVolume
 * @text 音量
 * @desc 音量。
 * @type number
 * @default 90
 * @parent DefaultSE
 * 
 * @param DefaultPitch
 * @text ピッチ
 * @desc ピッチ。
 * @type number
 * @default 100
 * @parent DefaultSE
 * 
 * @param DefaultPan
 * @text 位相
 * @desc 位相。
 * @type number
 * @default 50
 * @parent DefaultSE
 * 
 * @param Flash
 * @text フラッシュ設定
 * @default ------------------------------
 * 
 * @param DefaultFlashColor
 * @text フラッシュ色
 * @desc フラッシュの色。（1:赤、2:緑、3:青、4:グレー、5:フレーム数）フレーム数を0にすることでフラッシュしません。
 * @type string[]
 * @default ["255","0","0","128","8"]
 * @parent Flash
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
 * @param TerrainId
 * @text 地形タグID
 * @desc 地形タグID
 * @type number
 * @default -1
 * @min -1
 * @max 7
 * 
 * @param Damage
 * @text ダメージ
 * @desc 床ダメージ時のダメージ（a：アクター）
 * @type string
 * @default 10
 * 
 * @param SE
 * @text SE設定
 * @default ------------------------------
 * 
 * @param DamagedFloorSE
 * @text 床ダメージ時SE
 * @desc 床ダメージ時のSE
 * @type file
 * @dir audio/se/
 * @parent SE
 * 
 * @param volume
 * @text 音量
 * @desc 音量。
 * @type number
 * @default 90
 * @parent SE
 * @min 0
 * @max 9999
 * 
 * @param pitch
 * @text ピッチ
 * @desc ピッチ。
 * @type number
 * @default 100
 * @parent SE
 * 
 * @param pan
 * @text 位相
 * @desc 位相。
 * @type number
 * @default 50
 * @parent SE
 * 
 * @param Flash
 * @text フラッシュ設定
 * @default ------------------------------
 * 
 * @param FlashColor
 * @text フラッシュ色
 * @desc フラッシュの色。（1:赤、2:緑、3:青、4:グレー、5:フレーム数）フレーム数を0にすることでフラッシュしません
 * @type string[]
 * @default 
 * @parent Flash
 * 
 */
var Imported = Imported || {};
Imported.NUUN_DamagedFloorEX = true;

(() => {
const parameters = PluginManager.parameters('NUUN_DamagedFloorEX');
const DamagedFloorList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['DamagedFloorList'])) : null) || [];
const DefaultFlashColor = eval(parameters['DefaultFlashColor']);
const DefaultDamage = String(parameters['DefaultDamage'] || '10');
const DefaultDamagedFloorSE = String(parameters['DefaultDamagedFloorSE'] || '');
const DefaultVolume = Number(parameters['DefaultVolume'] || 90);
const DefaultPitch = Number(parameters['DefaultPitch'] || 100);
const DefaultPan = Number(parameters['DefaultPan'] || 50);
let onMapFloorDamage = false;
let FlashColor = [];

const _Game_Actor_executeFloorDamage = Game_Actor.prototype.executeFloorDamage;
Game_Actor.prototype.executeFloorDamage = function() {
  onMapFloorDamage = true;
  _Game_Actor_executeFloorDamage.call(this);
  onMapFloorDamage = false;
};

const _Game_Actor_performMapDamage = Game_Actor.prototype.performMapDamage;
Game_Actor.prototype.performMapDamage = function() {
  if (onMapFloorDamage) {
    _Game_Actor_performMapDamage.call(this);
    $gameMap.getDamagedFloorListData();
  } else {
    _Game_Actor_performMapDamage.call(this);
  }
};

const _Game_Actor_basicFloorDamage = Game_Actor.prototype.basicFloorDamage;
Game_Actor.prototype.basicFloorDamage = function() {
  const coreDamage = _Game_Actor_basicFloorDamage.call(this);
  const damagedFloorId = $gameMap._damagedFloorId;
  const a = this;
  if (damagedFloorId >= 0) {
    const x = $gamePlayer._x;
    const y = $gamePlayer._y;
    const regionId = $gameMap.regionId(x, y);
    const Terrain = $gameMap.terrainTag(x, y);
    const damagedFloorData = DamagedFloorList[damagedFloorId].DamagedFloorRegion || [];
    const mainData = damagedFloorData.find(data => data.RegionId === regionId || data.TerrainId === Terrain);
    if (mainData.FlashColor) {
      setFlashData(mainData.FlashColor);
    } else {
      setFlashData(DefaultFlashColor);
    }
    return mainData && mainData.Damage ? eval(mainData.Damage) : DefaultDamage ? eval(DefaultDamage) : coreDamage;
  } else {
    setFlashData(DefaultFlashColor);
    return DefaultDamage ? eval(DefaultDamage) : coreDamage;
  }
};


const _Game_Screen_startFlashForDamage = Game_Screen.prototype.startFlashForDamage;
Game_Screen.prototype.startFlashForDamage = function() {
  if (onMapFloorDamage) {
    if (FlashColor[4] > 0) {
      this.startFlash([FlashColor[0], FlashColor[1], FlashColor[2], FlashColor[3]], FlashColor[4]);
    }
    FlashColor = [];
  } else {
    _Game_Screen_startFlashForDamage.call(this);
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
    const Terrain = $gameMap.terrainTag(x, y);
    const mainData = damagedFloorData.find(data => data.RegionId === regionId || data.TerrainId === Terrain);
    if (mainData && mainData.DamagedFloorSE) {
      AudioManager.playSe({"name":mainData.DamagedFloorSE,"volume":mainData.volume,"pitch":mainData.pitch,"pan":mainData.pan});
    } else if (DefaultDamagedFloorSE) {
      AudioManager.playSe({"name":DefaultDamagedFloorSE,"volume":DefaultVolume,"pitch":DefaultPitch,"pan":DefaultPan});
    }
  } else {
    if (DefaultDamagedFloorSE) {
      AudioManager.playSe({"name":DefaultDamagedFloorSE,"volume":DefaultVolume,"pitch":DefaultPitch,"pan":DefaultPan});
    }
  }
};

function setFlashData(data) {
  FlashColor[0] = parseInt(data[0]).clamp(0, 255);
  FlashColor[1] = parseInt(data[1]).clamp(0, 255);
  FlashColor[2] = parseInt(data[2]).clamp(0, 255);
  FlashColor[3] = parseInt(data[3]).clamp(0, 255);
  FlashColor[4] = parseInt(data[4]);
};

})();
