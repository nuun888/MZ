/*:-----------------------------------------------------------------------------------
 * NUUN_RegionMapBGM.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Region Map BGM
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * Change map BGM by region.
 * 
 * Map nots
 * <RegionMapBgm[regionId]:[BGMFailName],[Volume],[Pitch],[Pan]> Sets the regional BGM within the specified region ID.
 * [regionId]:region id
 * [BGMFailName]:BGM file name (no extension)
 * [Volume]:volume
 * [Pitch]:pitch
 * [Pan]:pan(-100～100)
 * <RegionMapBgm6:Field2,90,100,0> Field2's BGM will be played when the player enters the location with region ID 6.
 * 
 * Log
 * 1/9/2023 Ver.1.0.0
 * First edition.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * @command EnabledRegionMapBgm
 * @desc Specify whether to prohibit changing the area map BGM.
 * @text Prohibition of area map BGM change enabled
 * 
 * @arg SetRegionMapBgmEnabled
 * @text Change
 * @desc Prohibited with ON. OFF allows it.
 * @type boolean
 * @default true
 * 
 * @param RegionMapBgm
 * @text Regional BGM settings
 * @desc Set the regional BGM.
 * @type struct<RegionMapBgmsList>[]
 * @default []
 * 
 */
/*~struct~RegionMapBgmsList:
 * 
 * @param MapId
 * @text Map ID
 * @desc Map id.
 * @type number
 * @default 0
 * 
 * @param RegionMapBgm
 * @text Map area BGM settings
 * @desc Set the area BGM in the map.
 * @type struct<RegionMapBgmList>[]
 * @default []
 * 
 */
/*~struct~RegionMapBgmList:
 * 
 * @param RegionId
 * @text Region id
 * @desc Region id.
 * @type number
 * @default 0
 * 
 * @param name
 * @text BGM file
 * @desc Specify BGM.
 * @type file
 * @dir audio/bgm
 * 
 * @param volume
 * @text BGM volume
 * @desc Set the BGM volume.
 * @default 90
 * @min 0
 * 
 * @param pitch
 * @text BGM Pitch
 * @desc Set the pitch of BGM.
 * @default 100
 * 
 * @param pan
 * @text BGM pan
 * @desc Set the pan of BGM.
 * @max 100
 * @min -100
 * @default 0
 * 
 * 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 地域マップBGM
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * リージョンによってマップBGMを変更します。
 * 
 * マップの設定のメモ欄
 * <RegionMapBgm[regionId]:[BGMFailName],[Volume],[Pitch],[Pan]> 指定したリージョンID内の地域BGMを設定します。
 * [regionId]:リージョンID
 * [BGMFailName]:BGMファイル名(拡張子なし)
 * [Volume]:音量
 * [Pitch]:ピッチ
 * [Pan]:位相(-100～100)
 * <RegionMapBgm6:Field2,90,100,0> プレイヤーがリージョンID６番の場所に入ったときに、Field2のBGMが再生されます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/1/9 Ver.1.0.0
 * 初版
 * 
 * 
 * @command EnabledRegionMapBgm
 * @desc 地域マップBGMを変更を禁止にするか指定します。
 * @text 地域マップBGM変更禁止有効
 * 
 * @arg SetRegionMapBgmEnabled
 * @text 変更
 * @desc ONで禁止。OFFで許可します。
 * @type boolean
 * @default true
 * 
 * 
 * @param RegionMapBgm
 * @text 地域BGM設定
 * @desc 地域BGMの設定を行います。
 * @type struct<RegionMapBgmsList>[]
 * @default []
 * 
 */
/*~struct~RegionMapBgmsList:ja
 * 
 * @param MapId
 * @text マップID
 * @desc マップID
 * @type number
 * @default 0
 * 
 * @param RegionMapBgm
 * @text マップ内地域BGM設定
 * @desc マップ内の地域BGMの設定を行います。
 * @type struct<RegionMapBgmList>[]
 * @default []
 * 
 */
/*~struct~RegionMapBgmList:ja
 * 
 * @param RegionId
 * @text リージョンID
 * @desc リージョンID
 * @type number
 * @default 0
 * 
 * @param name
 * @text BGMファイル
 * @desc BGMを指定します。
 * @type file
 * @dir audio/bgm
 * 
 * @param volume
 * @text BGMの音量
 * @desc BGMを音量を設定します。
 * @default 90
 * @min 0
 * 
 * @param pitch
 * @text BGMのピッチ
 * @desc BGMをピッチを設定します。
 * @default 100
 * 
 * @param pan
 * @text BGMの位相
 * @desc BGMを位相を設定します。
 * @default 0
 * @max 100
 * @min -100
 * 
 * 
 * 
 */

var Imported = Imported || {};
Imported.NUUN_RegionMapBGM = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_RegionMapBGM');
    const _RegionMapBgm = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['RegionMapBgm'])) : null) || [];
    let _regionBgmData = null;

    const pluginName = 'NUUN_RegionMapBGM';
    PluginManager.registerCommand(pluginName, 'EnabledRegionMapBgm', args => {
        $gameMap.setEnabledRegionMapBgm(eval(args.SetRegionMapBgmEnabled));
    });

    const _Game_Map_autoplay = Game_Map.prototype.autoplay;
    Game_Map.prototype.autoplay = function() {
        _Game_Map_autoplay.call(this);
        this.setRegionBgm();
    };

    Game_Map.prototype.getRegionBgm = function() {
        const x = $gamePlayer._x;
        const y = $gamePlayer._y;
        const regionId = this.regionId(x, y);
        const data = $dataMap.meta['RegionMapBgm' + regionId];
        if (!!data) {
            const array = data.split(',');
            return {name: array[0], volume: Number(array[1]), pitch: Number(array[2]), pan: Number(array[3])};
        } else {
            const list = _RegionMapBgm.find(bgm => bgm.MapId === this._mapId);
            if (list) {
                const bgmData = list.RegionMapBgm.find(data => data.RegionId === regionId);
                if (bgmData) {
                    return {name: bgmData.name, volume: bgmData.volume, pitch: bgmData.pitch, pan: bgmData.pan};
                }
            }
            return null;
        }
    };

    const _Game_Map_update = Game_Map.prototype.update;
    Game_Map.prototype.update = function(sceneActive) {
        _Game_Map_update.call(this, sceneActive);
        this.updateRegionBgm();
    };

    Game_Map.prototype.updateRegionBgm = function() {
        if ($gamePlayer.isMoving() && this.isRegionBgm()) {
            this.setRegionBgm();
        } 
    };
    
    Game_Map.prototype.isRegionBgm = function() {
        return !this._enabledRegionMapBgm;
    };

    Game_Map.prototype.setEnabledRegionMapBgm = function(flag) {
        this._enabledRegionMapBgm = flag;
        if (!flag) {
            this.setRegionBgm();
        }
    };

    Game_Map.prototype.setRegionBgm = function() {
        const x = $gamePlayer._x;
        const y = $gamePlayer._y;
        const regionData = this.mapId() +"region"+ this.regionId(x, y);
        if (regionData !== _regionBgmData) {
            const regionBgm = this.getRegionBgm();
            if (regionBgm) {
                AudioManager.playBgm(regionBgm);
                _regionBgmData = regionData;
            } else {
                AudioManager.playBgm($dataMap.bgm);
                _regionBgmData = regionData;
            }
        }
    };
    
})();