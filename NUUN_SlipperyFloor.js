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
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.1
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
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.1
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
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    Game_Map.prototype.isSlipperyFloor = function(x, y) {
        const region = this.regionId(x, y);
        const terrainTag = this.terrainTag(x, y);
        return (params.RegionId > 0 && params.RegionId === region) || (params.TerrainTagId >= 0 && params.TerrainTagId === terrainTag);
    };

    const _Game_CharacterBase_moveStraight = Game_CharacterBase.prototype.moveStraight;
    Game_CharacterBase.prototype.moveStraight = function(d) {
        _Game_CharacterBase_moveStraight.apply(this, arguments);
        this._slipDirection = d;
    };

    const _Game_CharacterBase_updateMove = Game_CharacterBase.prototype.updateMove;
    Game_CharacterBase.prototype.updateMove = function() {
        _Game_CharacterBase_updateMove.apply(this, arguments);
        if (!this.isSlipCharacter()) return;
        if (!this.isMoving() && $gameMap.isSlipperyFloor(this._realX, this._realY)) {
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
        this._slipping = $gameMap.isSlipperyFloor(this._realX, this._realY);
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
        return Number(NuunManager.getMetaCode(this.event(), "SlipEventPattern") || 0);
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