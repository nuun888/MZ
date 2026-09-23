/*:-----------------------------------------------------------------------------------
 * NUUN_SlipperyFloor.js
 * 
 * Copyright (C) 2026 NUUN
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Slippery floor
 * @author NUUN
 * @version 1.1.0
 * 
 * @help
 * I will implement a slippery floor.
 * Events also slide.
 * 
 * Characters moving on tiles with the specified region or terrain tag will slide until they reach an impassable tile or a regular tile.
 * 
 * When using "NUUN_SymbolEncounter", make sure it is updated to version 1.3.2 or later.
 * 
 * Event note field
 * <NoSlipEvent> This event does not slide.
 * 
 * <SlipEventPattern:[pattern]> It specifies the character chip pattern used when sliding.
 * [pattern]:pattern 0～2
 * 
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
 * 9/23/2026 Ver.1.1.0
 * Changed the specifications so that the plugin can run without NUUN_Base.
 * 5/9/2026 Ver.1.0.1
 * Added a feature that allows specifying the character chip pattern for events.
 * Fixed an issue where direction‑fixed events would move in their original facing direction when sliding on slippery tiles.
 * 5/2/2026 Ver.1.0.0
 * First edition.
 * 
 * @param RegionId
 * @text Region id
 * @desc Specify the region ID.
 * @type number
 * @max 255
 * @default 0
 * 
 * @param TerrainTagId
 * @text Terrain tag id
 * @desc Specify the terrain tag ID.
 * @type number
 * @max 7
 * @min -1
 * @default -1
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 滑る床
 * @author NUUN
 * @version 1.1.0
 * 
 * @help
 * 滑る床を実装します。
 * イベントも滑ります。
 * 
 * 指定のリージョンまたは、指定の地形タグで移動を行うと、通行不能箇所または通常タイルまで滑る出します。
 * 
 * NUUN_SymbolEncounterを導入している場合は、NUUN_SymbolEncounterVer.1.3.2以降に更新してください。
 * 
 * イベントのメモ欄
 * <NoSlipEvent> このイベントは滑りません。
 * 
 * <SlipEventPattern:[pattern]> 滑るときのキャラクターチップのパターンを指定します。
 * [pattern]:パターン 0～2
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
 * 2026/9/23 Ver.1.1.0
 * NUUN_Baseなしで実行できるように仕様を変更。
 * 2026/5/9 Ver.1.0.1
 * イベントにキャラクターチップのパターンを指定できる機能を追加。
 * 向き固定のイベントが滑る床を移動する際に、元の向きの方向に移動してしまう問題を修正。
 * 2026/5/2 Ver.1.0.0
 * 初版
 * 
 * @param RegionId
 * @text リージョンID
 * @desc リージョンIDを指定します。
 * @type number
 * @max 255
 * @default 0
 * 
 * @param TerrainTagId
 * @text 地形タグID
 * @desc 地形タグIDを指定します。
 * @type number
 * @max 7
 * @min -1
 * @default -1
 * 
 */


var Imported = Imported || {};
Imported.NUUN_SlipperyFloor = true;

(() => {
    class Nuun_PluginParams_SlipperyFloor {
        static getPluginParams(text) {//document.currentScript
            try {
                const name = String(Utils.extractFileName(text.src).split('.').shift());
                const params = PluginManager.parameters(name);
                if (params) {
                    const pluginParam = new Nuun_PluginParamData(params);
                    pluginParam.setPluginName(name);
                    return pluginParam.getParameters();
                }
                return {pluginName: name};
            } catch (error) {
                const log = ($gameSystem.isJapanese() ? "コアスクリプトをVer.1.3.2以降に更新してください。" : "Please update the core script to version 1.3.2 or later.");
                throw ["ParameterError", log];
            }
        }
    };

    window.Nuun_PluginParams_SlipperyFloor = Nuun_PluginParams_SlipperyFloor;

    class Nuun_PluginParamData {
        constructor(text) {
            this._parameters = JSON.parse(JSON.stringify(text, this._convertParams)) || {};
        }

        _convertParams(key, code) {
            try {
                return JSON.parse(code);
            } catch (e) {
                if (isNaN(code)) {
                    if (!code) {
                        return null;
                    }
                    try {
                        if (code.indexOf("'") === 0 || code.indexOf('"') === 0) {
                            return eval(code);//'または"を外す。
                        }
                        return !!code ? String(code) : null;
                    } catch (e) {
                        if (typeof {} === "object") {
                            return code;
                        }
                        return !!code ? String(code) : null;
                    }
                } else {
                    return String(code);
                }
            }
        }

        getParameters() {
            return this._parameters;
        }

        setPluginName(name) {
            this._parameters.pluginName = name;
        }


        getMetaTag(object, code) {
            const data = object.meta[code];
            let list = [];
            if (data !== undefined) {
                try {
                    list = data.split(',');
                } catch (error) {
                    return this.getTextCodeMeta(data);
                }
                list = list.map(a => this.getTextCodeMeta(a));
                return list;
            } else {
                return undefined;
            }
        }

        getTextCodeMeta(text) {
            if (isNaN(text)) {
                return text;
            } else {
                return Number(text);
            }
        }
    };

    const params = Nuun_PluginParams_SlipperyFloor.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;

    function NuunSlipperyFloorManager() {
        throw new Error("This is a static class");
    }

    window.NuunSlipperyFloorManager = NuunSlipperyFloorManager;

    NuunSlipperyFloorManager.getEvalCode = function(code) {
        if (isNaN(code)) {
            if (!code) {
                return null;
            }
            return this.stringCode(code);
        } else {
            return String(code);
        }
    };

    NuunSlipperyFloorManager.stringCode = function(code){
        try {
            if (code.indexOf("'") === 0 || code.indexOf('"') === 0) {
                return eval(code);//'または"を外す。
            }
            return !!code ? String(code) : null;
        } catch (e) {
            return code;
        }
    };

    NuunSlipperyFloorManager.getMetaCode = function(object, method) {
        const meta = object.meta[method];
        if (!meta) return null;
        if (meta === true) {
            return null;
        }
        if (meta.indexOf('[') >= 0) {
            const log = ($gameSystem.isJapanese() ? "パラメータに[]が含まれています。[]を外して記入して下さい。" : "The parameter contains []. Please remove the [] and enter it.");
            throw ["ParameterError", log];
        }
        return meta;
    };

    NuunSlipperyFloorManager.slipperyFloorParams = function(code) {
        switch (code) {
            case 0:
                return params.RegionId;
            case 1:
                return params.TerrainTagId;
        }
    };


    Game_Map.prototype.isSlipperyFloor = function(x, y) {
        const region = this.regionId(x, y);
        const terrainTag = this.terrainTag(x, y);
        return (NuunSlipperyFloorManager.slipperyFloorParams(0) > 0 && NuunSlipperyFloorManager.slipperyFloorParams(0) === region) ||
         (NuunSlipperyFloorManager.slipperyFloorParams(1) >= 0 && NuunSlipperyFloorManager.slipperyFloorParams(1) === terrainTag);
    };

    const _Game_CharacterBase_moveStraight = Game_CharacterBase.prototype.moveStraight;
    Game_CharacterBase.prototype.moveStraight = function(d) {
        _Game_CharacterBase_moveStraight.apply(this, arguments);
        if (this.isMovementSucceeded()) {
            this._slipDirection = d;
        }
    };

    const _Game_CharacterBase_updateMove = Game_CharacterBase.prototype.updateMove;
    Game_CharacterBase.prototype.updateMove = function() {
        _Game_CharacterBase_updateMove.apply(this, arguments);
        if (!this.isSlipCharacter()) return;
        if (!this.isMoving() && $gameMap.isSlipperyFloor(this.x, this.y)) {
            if (this.isMoveRouteForcing()) {
                this.processRouteEnd();//スリップしたら予約中の移動ルートの設定を無効にする。
            }
            this.slipperyMove();
        } else if (this._slipping && !this.isMoving()) {
            this.endSlippingMove();
        }
    };

    Game_CharacterBase.prototype.isSlipCharacter = function() {
        return this.isNormalPriority();
    };

    Game_Event.prototype.isSlipCharacter = function() {
        return Game_CharacterBase.prototype.isSlipCharacter.apply(this, arguments) && !this.event().meta.NoSlipEvent;
    };

    Game_CharacterBase.prototype.slipperyMove = function() {
        this.moveStraight(this._slipDirection || this.direction());
        this._slipping = true;
    };

    Game_Follower.prototype.slipperyMove = function() {
        this._slipping = true;
    };

    Game_CharacterBase.prototype.endSlippingMove = function() {
        this._slipping = $gameMap.isSlipperyFloor(this.x, this.y);
    };

    Game_CharacterBase.prototype.isSlipping = function() {
        return !!this._slipping && this.isMoving();
    };

    const _Game_CharacterBase_pattern = Game_CharacterBase.prototype.pattern;
    Game_CharacterBase.prototype.pattern = function() {
        return this._slipping ? this.getSlipEventPattern() : _Game_CharacterBase_pattern.apply(this, arguments);
    };

    Game_CharacterBase.prototype.getSlipEventPattern = function() {
        return 2;
    };

    Game_Event.prototype.getSlipEventPattern = function() {
        if (!this.event().meta.SlipEventPattern) return Game_CharacterBase.prototype.getSlipEventPattern.apply(this, arguments);
        return Number(NuunSlipperyFloorManager.getMetaCode(this.event(), "SlipEventPattern") || 0);
    };


    Game_Interpreter.prototype.isCharacterSlipping = function(param) {//-1:プレイヤー　0:このイベント 1以上:(イベント
        if (param < 0) {
            return $gamePlayer.isSlipping();
        } else if (this.isOnCurrentMap()) {
            const event = $gameMap.event(param > 0 ? param : this._eventId);
            return !!event ? event.isSlipping() : false;
        }
    };

    
})();