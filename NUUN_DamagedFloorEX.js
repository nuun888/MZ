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
 * @plugindesc  Famage floor EX
 * @author NUUN
 * @version 1.3.3
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * Expands the handling of damage on the damage floor.
 * By setting the region setting to 0, it will be applied to map tiles that do not specify a region.
 * If both region and terrain tag are specified, it will be applied when either one matches.
 * The priority of floor damage settings is determined from the settings above the list and the matching conditions are applied.
 * Please set the conditions for which the region and terrain tags are set in the upper part.
 * The flash setting will not flash by entering 0 for the number of frames.
 * 
 * The floor damage value can use the evaluation formula.
 * a:Actor game data
 * By entering 'NoDamage', you will not receive floor damage. (States will still be applied.)
 * 
 * Notes with features
 * <DfrEx[tag]:[rate]> Enter the floor damage rate of the specified tag name as a specified integer.
 * [tag]: Tag name set in "Floor damage tag name"
 * [rate]:Efficacy rate
 * <DfrExPoison:150> The effectiveness rate of floor damage with the tag name Poison will be increased by 1.5 times.
 * <DfrExPoison:70> The effectiveness rate of floor damage with the tag name Poison will be increased by 0.7 times.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 9/21/2024 Ver.1.3.3
 * Fixed an issue that caused errors when traversing maps that use tilesets that do not have the Damage Floor setting applied.
 * 8/3/2024 Ver.1.3.2
 * Fixed an issue that could cause an error when walking through unspecified damage floors.
 * 6/28/2024 Ver.1.3.1
 * Added a function that gives a chance to inflict a status effect when dealing floor damage.
 * 6/27/2024 Ver.1.3.0
 * Added the ability to specify a different type (MP, TP) for the Floor Damage target.
 * 4/6/2024 Ver.1.2.2
 * Fixed an issue where floor damage rate was not applied when set to 0.
 * 1/6/2024 Ver.1.2.1
 * Added a function that allows you to set the effect rate for specific floor damage.
 * 1/4/2024 Ver.1.2.0
 * Added the ability to play an animation when taking floor damage.
 * Fixed an issue where SE during floor damage would regenerate even if you did not receive floor damage.
 * Corrected phase settings.
 * 11/14/2022 Ver.1.1.1
 * Changed the display in languages other than Japanese to English.
 * 4/2/2022 Ver.1.1.0
 * Added the ability to receive damage only to a specific actor.
 * Changed how to set flash.
 * 10/31/2021 Ver.1.0.3
 * Added a function that can set terrain tags and flash.
 * 10/24/2021 Ver.1.0.2
 * Changed the floor damage to be able to use the evaluation formula.
 * 10/24/2021 Ver.1.0.1
 * Added a function to specify the default floor damage and SE at the time of floor damage.
 * 10/24/2021 Ver.1.0.0
 * First edition.
 * 
 * @param DamagedFloorList
 * @text Damage floor setting
 * @desc Damage floor setting
 * @type struct<DamagedFloorData>[]
 * @default []
 * 
 * @param DefaultDamage
 * @text Default damage
 * @desc Damage at default floor damage (a: actor game data)
 * @type combo
 * @option '10;//default'
 * @option 'a.mhp * 0.02;//2% of maximum HP'
 * @default 10
 * 
 * @param DefaultSE
 * @text Default SE settings
 * @default ------------------------------
 * 
 * @param DefaultDamagedFloorSE
 * @text Default floor damage SE
 * @desc SE during floor damage.
 * @type file
 * @dir audio/se/
 * @parent DefaultSE
 * 
 * @param DefaultVolume
 * @text Volume
 * @desc Volume.
 * @type number
 * @default 90
 * @parent DefaultSE
 * 
 * @param DefaultPitch
 * @text Pitch
 * @desc Pitch.
 * @type number
 * @default 100
 * @parent DefaultSE
 * 
 * @param DefaultPan
 * @text Pan
 * @desc Pan.
 * @type number
 * @default 0
 * @max 100
 * @min -100
 * @parent DefaultSE
 * 
 * @param Flash
 * @text Flash settings
 * @default ------------------------------
 * 
 * @param DefaultFlashColor
 * @text Flash color
 * @desc Flash color. Do not flash by setting the number of frames to 0.
 * @type struct<FlashColorSetting>
 * @default {"red":"255","green":"0","blue":"0","gray":"128","flame":"8"}
 * @parent Flash
 * 
 */
/*~struct~DamagedFloorData:
 * 
 * @param TileSetId
 * @text Tileset ID
 * @desc Tileset ID
 * @type tileset
 * @default 0
 * 
 * @param DamagedFloorRegion
 * @text Damage floor application setting
 * @desc Sets the damage floor to apply.
 * @type struct<DamagedFloorRegionData>[]
 * @default ["{\"RegionId\":\"0\",\"TerrainId\":\"-1\",\"Damage\":\"10\",\"DamageActor\":\"[]\",\"SE\":\"------------------------------\",\"DamagedFloorSE\":\"\",\"volume\":\"90\",\"pitch\":\"100\",\"pan\":\"50\",\"Flash\":\"------------------------------\",\"FlashColor\":\"{\\\"red\\\":\\\"255\\\",\\\"green\\\":\\\"0\\\",\\\"blue\\\":\\\"0\\\",\\\"gray\\\":\\\"128\\\",\\\"flame\\\":\\\"8\\\"}\"}"]
 * 
 * 
 */
/*~struct~DamagedFloorRegionData:
 * 
 * @param DamagedFloorName
 * @text Floor damage tag name
 * @desc Set the tag name for floor damage.
 * @type string
 * @default 
 * 
 * @param RegionId
 * @text RegionID
 * @desc RegionID.
 * @type number
 * @default 0
 * 
 * @param TerrainId
 * @text Terrain tag ID
 * @desc Terrain tag ID
 * @type number
 * @default -1
 * @min -1
 * @max 7
 * 
 * @param DamageType
 * @text Damege type
 * @desc Specifies the target that will receive floor damage.
 * @type select
 * @option HP
 * @value 'Hp'
 * @option MP
 * @value 'Mp'
 * @option TP
 * @value 'Tp'
 * @default 'Hp'
 * 
 * @param Damage
 * @text Damage
 * @desc Damage at default floor damage (a: actor game data)
 * @type combo
 * @option '10;//default'
 * @option 'Math.max(1,Math.round(a.mhp * 0.01));//1% of maximum HP'
 * @option 'NoDamage'
 * @default 10
 * 
 * @param AddState
 * @text Add state
 * @desc Specify the state to be applied when dealing floor damage.
 * @type state
 * @default 0
 * 
 * @param AddStateProbability
 * @text Add state probability (%)
 * @desc Specifies the probability of a state being inflicted when floor damage is applied.
 * @type number
 * @default 0
 * 
 * @param DamageActor
 * @text Applicable actor
 * @desc The actor that applies floor damage. For all actors without specifying
 * @type struct<DamageFloorActor>[]
 * @default []
 * 
 * @param DamageInclude
 * @text Animation playback target
 * @desc Specify the target to play the regeneration animation when floor damage occurs.
 * @type select
 * @option player only
 * @value 'player'
 * @option Including followers (delay)
 * @value 'includefollowersDelay'
 * @option Including followers (simultaneous playback)
 * @value 'includefollowers'
 * @default 'includefollowers'
 * 
 * @param SE
 * @text SE settings
 * @default ------------------------------
 * 
 * @param DamagedFloorSE
 * @text SE during floor damage
 * @desc SE during floor damage.
 * @type file
 * @dir audio/se/
 * @parent SE
 * 
 * @param volume
 * @text Volume
 * @desc Volume.
 * @type number
 * @default 90
 * @parent SE
 * @min 0
 * @max 9999
 * 
 * @param pitch
 * @text Pitch
 * @desc Pitch.
 * @type number
 * @default 100
 * @parent SE
 * 
 * @param pan
 * @text Pan
 * @desc Pan。
 * @type number
 * @default 0
 * @max 100
 * @min -100
 * @parent SE
 * 
 * @param Flash
 * @text Flash settings
 * @default ------------------------------
 * 
 * @param FlashColor
 * @text Flash color
 * @desc flash color. Setting the number of frames to 0 will not flash.
 * @type struct<FlashColorSetting>
 * @default {"red":"255","green":"0","blue":"0","gray":"128","flame":"8"}
 * @parent Flash
 * 
 * @param Animation
 * @text Animation settings
 * @default ------------------------------
 * 
 * @param DamageAnimation
 * @text Animation when floor damage occurs
 * @desc Animation when floor damage occurs.
 * @type animation
 * @default 
 * @parent Animation
 * 
 */
/*~struct~FlashColorSetting:
 * 
 * @param red
 * @text Red
 * @desc Red
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * 
 * @param green
 * @text Green
 * @desc Green
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * 
 * @param blue
 * @text Blue
 * @desc Blue
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * 
 * @param gray
 * @text Gray
 * @desc Gray
 * @type number
 * @min 0
 * @max 255
 * @default 128
 * 
 * @param flame
 * @text Number of frames
 * @desc Number of frames
 * @type number
 * @min 0
 * @max 9999
 * @default 8
 * 
 * 
 */
/*~struct~DamageFloorActor:
 * 
 * @param Actor
 * @text Actor
 * @desc Actor
 * @type actor
 * @default 0
 * 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc  ダメージ床拡張
 * @author NUUN
 * @version 1.3.3
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * ダメージ床のダメージ時の処理を拡張します。
 * リージョン設定を0にすることでリージョンを指定していないマップタイルで適用されます。
 * リージョンと地形タグを両方指定している場合はどちらかが一致したときに適用されます。
 * 床ダメージ設定の優先度はリストの上の設定から判定し一致した条件が適用されます。
 * リージョン、地形タグを設定した条件は上のほうに設定してください。
 * フラッシュ設定はフレーム数の数値を0と入力することでフラッシュされません。
 * 
 * 床ダメージ値は評価式が使用できます。
 * a:アクターのゲームデータ
 * 'NoDamage'と記入することで床ダメージを受けません。(ステートの付与は行われます)
 * 
 * 特徴を持つメモ欄
 * <DfrEx[tag]:[rate]> 指定のタグ名の床ダメージ率を指定の整数で記入します。
 * [tag]:床ダメージタグ名で設定したタグ名
 * [rate]:効果率
 * <DfrExPoison:150> タグ名がPoisonの床ダメージの効果率が1.5倍になります。
 * <DfrExPoison:70> タグ名がPoisonの床ダメージの効果率が0.7倍になります。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/9/21 Ver.1.3.3
 * ダメージ床適用設定が適用されていないタイルセットを使用しているマップを移動するとエラーが出る問題を修正。
 * 2024/8/3 Ver.1.3.2
 * 未設定のダメージ床を通行したときにエラーが起きる問題を修正。
 * 2024/6/28 Ver.1.3.1
 * 床ダメージダメージ時に確率でステートを付与させる機能を追加。
 * 2024/6/27 Ver.1.3.0
 * 床ダメージダメージの対象に別のタイプ(MP、TP)を指定できる機能を追加。
 * 2024/4/6 Ver.1.2.2
 * 床ダメージ率を0にしたときに適用されない問題を修正。
 * 2024/1/6 Ver.1.2.1
 * 特定の床ダメージに対して効果率を設定できる機能を追加。
 * 2024/1/4 Ver.1.2.0
 * 床ダメージ時にアニメーションを再生する機能を追加。
 * 床ダメージを受けなくても床ダメージ時のSEが再生してしまう問題を修正。
 * 位相の設定を修正。
 * 2022/11/14 Ver.1.1.1
 * 日本語以外での表示を英語表示に変更。
 * 2022/4/2 Ver.1.1.0
 * 特定のアクターのみダメージを受ける機能を追加。
 * フラッシュの設定方法を変更。
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
 * @default []
 * 
 * @param DefaultDamage
 * @text デフォルトダメージ
 * @desc デフォルト床ダメージ時のダメージ（a：アクターのゲームデータ）
 * @type combo
 * @option '10;//デフォルト'
 * @option 'a.mhp * 0.02;//最大HPの2%'
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
 * @default 0
 * @max 100
 * @min -100
 * @parent DefaultSE
 * 
 * @param Flash
 * @text フラッシュ設定
 * @default ------------------------------
 * 
 * @param DefaultFlashColor
 * @text フラッシュ色
 * @desc フラッシュの色。フレーム数を0にすることでフラッシュしません
 * @type struct<FlashColorSetting>
 * @default {"red":"255","green":"0","blue":"0","gray":"128","flame":"8"}
 * @parent Flash
 * 
 */
/*~struct~DamagedFloorData:ja
 * 
 * @param TileSetId
 * @text タイルセットID
 * @desc タイルセットID
 * @type tileset
 * @default 0
 * 
 * @param DamagedFloorRegion
 * @text ダメージ床適用設定
 * @desc 適用するダメージ床の設定をします。
 * @type struct<DamagedFloorRegionData>[]
 * @default ["{\"RegionId\":\"0\",\"TerrainId\":\"-1\",\"Damage\":\"10\",\"DamageActor\":\"[]\",\"SE\":\"------------------------------\",\"DamagedFloorSE\":\"\",\"volume\":\"90\",\"pitch\":\"100\",\"pan\":\"50\",\"Flash\":\"------------------------------\",\"FlashColor\":\"{\\\"red\\\":\\\"255\\\",\\\"green\\\":\\\"0\\\",\\\"blue\\\":\\\"0\\\",\\\"gray\\\":\\\"128\\\",\\\"flame\\\":\\\"8\\\"}\"}"]
 * 
 * 
 */
/*~struct~DamagedFloorRegionData:ja
 * 
 * @param DamagedFloorName
 * @text 床ダメージタグ名
 * @desc 床ダメージのタグ名を設定します。
 * @type string
 * @default 
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
 * @param DamageType
 * @text ダメージタイプ
 * @desc 床ダメージを受けるダメージ対象を指定します。
 * @type select
 * @option HP
 * @value 'Hp'
 * @option MP
 * @value 'Mp'
 * @option TP
 * @value 'Tp'
 * @default 'Hp'
 * 
 * @param Damage
 * @text ダメージ
 * @desc 床ダメージ時のダメージ（a：アクター）
 * @type combo
 * @option '10;//デフォルト'
 * @option 'Math.max(1,Math.round(a.mhp * 0.01));//最大HPの1％'
 * @option 'NoDamage'
 * @default 10
 * 
 * @param AddState
 * @text 付与ステート
 * @desc 床ダメージ時に付与するステートを指定します。
 * @type state
 * @default 0
 * 
 * @param AddStateProbability
 * @text 付与ステート確率(%)
 * @desc 床ダメージ時に付与するステートの確率を指定します。
 * @type number
 * @default 0
 * 
 * @param DamageActor
 * @text 適用アクター
 * @desc 床ダメージを適用するアクター 指定なしで全アクター対象
 * @type struct<DamageFloorActor>[]
 * @default []
 * 
 * @param DamageInclude
 * @text アニメーション再生対象
 * @desc 床ダメージ時の再生アニメーションを再生する対象を指定します。
 * @type select
 * @option プレーヤーのみ
 * @value 'player'
 * @option フォロワー含む(ディレイ)
 * @value 'includefollowersDelay'
 * @option フォロワー含む(同時再生)
 * @value 'includefollowers'
 * @default 'includefollowers'
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
 * @default 0
 * @max 100
 * @min -100
 * @parent SE
 * 
 * @param Flash
 * @text フラッシュ設定
 * @default ------------------------------
 * 
 * @param FlashColor
 * @text フラッシュ色
 * @desc フラッシュの色。フレーム数を0にすることでフラッシュしません
 * @type struct<FlashColorSetting>
 * @default {"red":"255","green":"0","blue":"0","gray":"128","flame":"8"}
 * @parent Flash
 * 
 * @param Animation
 * @text アニメーション設定
 * @default ------------------------------
 * 
 * @param DamageAnimation
 * @text 床ダメージ時アニメーション
 * @desc 床ダメージ時のアニメーション。
 * @type animation
 * @default 
 * @parent Animation
 * 
 */
/*~struct~FlashColorSetting:ja
 * 
 * @param red
 * @text 赤
 * @desc 赤
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * 
 * @param green
 * @text 緑
 * @desc 緑
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * 
 * @param blue
 * @text 青
 * @desc 青
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * 
 * @param gray
 * @text グレー
 * @desc グレー
 * @type number
 * @min 0
 * @max 255
 * @default 128
 * 
 * @param flame
 * @text フレーム数
 * @desc フレーム数
 * @type number
 * @min 0
 * @max 9999
 * @default 8
 * 
 * 
 */
/*~struct~DamageFloorActor:ja
 * 
 * @param Actor
 * @text アクター
 * @desc アクター
 * @type actor
 * @default 0
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_DamagedFloorEX = true;

(() => {
const parameters = PluginManager.parameters('NUUN_DamagedFloorEX');
const DamagedFloorList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['DamagedFloorList'])) : null) || [];
const DefaultFlashColor = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['DefaultFlashColor'])) : null);
const DefaultDamage = String(parameters['DefaultDamage'] || '10');
const DefaultDamagedFloorSE = String(parameters['DefaultDamagedFloorSE'] || '');
const DefaultVolume = Number(parameters['DefaultVolume'] || 90);
const DefaultPitch = Number(parameters['DefaultPitch'] || 100);
const DefaultPan = Number(parameters['DefaultPan'] || 50);
let _onMapFloorDamage = false;
let _damagedFloorExData = {};
let FlashColor = {};
let _floorDamageAnimationTargets = [];

const _Game_Map_initialize  = Game_Map.prototype.initialize ;
Game_Map.prototype.initialize = function() {
    _Game_Map_initialize.call(this);
    this._damagedFloorId = -1;
    this._damagedFloorSe = null;
    this._damagedFloorExData = null;
};

const _Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    _Game_Map_setup.call(this, mapId);
    this.initDamagedFloorId();
};

Game_Map.prototype.initDamagedFloorId = function() {
    this._damagedFloorId = DamagedFloorList.findIndex(data => data.TileSetId === this._tilesetId);
};

Game_Map.prototype.setFloorDamageData = function() {
    const damagedFloorId = this._damagedFloorId;
    const x = $gamePlayer._x;
    const y = $gamePlayer._y;
    const regionId = $gameMap.regionId(x, y);
    const Terrain = $gameMap.terrainTag(x, y);
    const damagedFloorData = DamagedFloorList[damagedFloorId] ? DamagedFloorList[damagedFloorId].DamagedFloorRegion : [];
    _damagedFloorExData = damagedFloorData.find(data => this.isDamagedFloorData(data, regionId, Terrain));
};

Game_Map.prototype.isDamagedFloorData = function(data, regionId, Terrain) {
    if (regionId > 0) {
        return (data.RegionId === regionId && (data.TerrainId >= 0 ? data.TerrainId === Terrain : true));
    } else {
        return (data.TerrainId >= 0 ? data.TerrainId === Terrain : true);
    }
};


const _Game_Actor_executeFloorDamage = Game_Actor.prototype.executeFloorDamage;
Game_Actor.prototype.executeFloorDamage = function() {
    _onMapFloorDamage = true;
    if (!!_damagedFloorExData && _damagedFloorExData.DamageType !== 'Hp') {
        const floorDamage = Math.floor(this.basicFloorDamage() * this.fdr);
        const realDamage = Math.min(floorDamage, this.maxFloorDamage());
        const methodName = 'gain' + _damagedFloorExData.DamageType;
        this[methodName](-realDamage);
        if (realDamage > 0) {
            this.performMapDamage();
        }
    } else {
        _Game_Actor_executeFloorDamage.call(this);
    }
    if (!!_damagedFloorExData && _damagedFloorExData.AddState > 0) {
        this.floorDamageAddState();
    }
    _onMapFloorDamage = false;
};

Game_Actor.prototype.floorDamageAddState = function() {
    if (Math.random() * 100 < _damagedFloorExData.AddStateProbability) {
        this.addState(_damagedFloorExData.AddState);
    }
};

Game_Actor.prototype.floorDamageRate = function() {
    const tag = _damagedFloorExData ? 'DfrEx'+ String(_damagedFloorExData.DamagedFloorName) : null;
    return this.traitObjects().reduce((r, trait) => {
        if (tag && trait.meta[tag] !== undefined && trait.meta[tag] >= 0) {
            return r * Number(trait.meta[tag]) / 100;
        } else {
            return r;
        }
    }, 1.0);
};

const _Game_Actor_basicFloorDamage = Game_Actor.prototype.basicFloorDamage;
Game_Actor.prototype.basicFloorDamage = function() {
    const coreDamage = _Game_Actor_basicFloorDamage.call(this);
    const a = this;
    if (!!_damagedFloorExData) {
        const mainData = _damagedFloorExData;
        if (this.floorDamageActor(mainData.DamageActor)) {
            return mainData.Damage !== 'NoDamage' ? ((mainData.Damage ? eval(mainData.Damage) : (DefaultDamage ? eval(DefaultDamage) : coreDamage)) * this.floorDamageRate()) : 0;
        } else {
            return 0;
        }
    } else {
        return (DefaultDamage ? eval(DefaultDamage) : coreDamage) * this.floorDamageRate();
    }
};

const _Game_Actor_performMapDamage = Game_Actor.prototype.performMapDamage;
Game_Actor.prototype.performMapDamage = function() {
    const floorDamage = _onMapFloorDamage;
    _Game_Actor_performMapDamage.call(this);
    this.exFloorDamage(floorDamage);
};

Game_Actor.prototype.exFloorDamage = function(mode) {
    if (mode) {
        this.floorDamagePlaySe(_damagedFloorExData);
        this.floorDamageAnimation(_damagedFloorExData);
    }
};

Game_Actor.prototype.floorDamagePlaySe = function(data) {
    if (data && data.DamagedFloorSE) {
        AudioManager.playSe({"name":data.DamagedFloorSE,"volume":data.volume,"pitch":data.pitch,"pan":data.pan});
    } else if (DefaultDamagedFloorSE) {
        AudioManager.playSe({"name":DefaultDamagedFloorSE,"volume":DefaultVolume,"pitch":DefaultPitch,"pan":DefaultPan});
    }
};

Game_Actor.prototype.floorDamageAnimation = function(data) {
    if (!!data) {
        const mode = !data.DamageInclude ? 'includefollowers' : data.DamageInclude;
        if (mode === 'player') {
            $gameTemp.requestAnimation([$gamePlayer], data.DamageAnimation);
        } else {
            if ($gameParty.leader() === this) {
                if (mode === 'includefollowers') {
                    $gameTemp.requestAnimation([$gamePlayer], data.DamageAnimation);
                } else {
                    _floorDamageAnimationTargets.push($gamePlayer);
                }
            } else {
                const target = this.getFloorDamageFollowerTarget();
                if (!!target) {
                    if (mode === 'includefollowers') {
                        $gameTemp.requestAnimation([target], data.DamageAnimation);
                    } else {
                        _floorDamageAnimationTargets.push(target);
                    }
                }
            }
        }
    }
};

Game_Actor.prototype.getFloorDamageFollowerTarget = function() {
    const followers = $gamePlayer.followers()._data;
    return followers.find(follower => follower.isVisible() && follower.actor() === this);
};

Game_Actor.prototype.floorDamageActor = function(data) {
    return data.length > 0 ? data.some(a => a.Actor === this.actorId()) : true;
};

const _Game_Screen_startFlashForDamage = Game_Screen.prototype.startFlashForDamage;
Game_Screen.prototype.startFlashForDamage = function() {
    if (_onMapFloorDamage) {
        this.startFlashFloorDamage();
    } else {
        _Game_Screen_startFlashForDamage.call(this);
    }
};

Game_Screen.prototype.startFlashFloorDamage = function() {
    if (!!_damagedFloorExData && _damagedFloorExData.FlashColor) {
        setFlashData(_damagedFloorExData.FlashColor);
    } else {
        setFlashData(DefaultFlashColor);
    }
    if (FlashColor.flame > 0) {
        this.startFlash([FlashColor.red, FlashColor.green, FlashColor.blue, FlashColor.gray], FlashColor.flame);
    }
    FlashColor = {};
};


const _Game_Party_onPlayerWalk = Game_Party.prototype.onPlayerWalk;
Game_Party.prototype.onPlayerWalk = function() {
    $gameMap.setFloorDamageData();
    _Game_Party_onPlayerWalk.call(this);
    if (_floorDamageAnimationTargets.length > 0) {
        $gameTemp.requestAnimation(_floorDamageAnimationTargets, _damagedFloorExData.DamageAnimation);
        _floorDamageAnimationTargets = [];
    }
};

function setFlashData(data) {
    FlashColor = data;
};


})();