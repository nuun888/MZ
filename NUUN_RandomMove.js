/*:-----------------------------------------------------------------------------------
 * NUUN_RandomMove.js
 * 
 * Copyright (C) 2026 NUUN
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Random Directional Movement
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.1
 * 
 * @help
 * Randomize directional key inputs during movement.
 * 
 * Main Features
 * Randomize directional key input based on traits.
 * Randomize directional key input based on a switch.
 * “Specify directional keys by region.
 * 
 * This plugin does not provide a function to disable mouse-based movement.
 * Directional key randomization does not apply to mouse input.
 * A separate plugin is required to disable mouse-based movement.
 * Such as the Touch Input Disable Plugin (by Triacontane).
 * 
 * Note field for traits
 * <RomdomKeyMove> If an actor with this trait is in the party, directional key input becomes randomized.
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
 * 5/2/2026 Ver.1.0.1
 * Modified the behavior so that no processing is performed on tiles with a region ID of 0.
 * 4/30/2026 Ver.1.0.0
 * First edition.
 * 
 * @param RandomKeySwitch
 * @text Random direction switch
 * @desc Specify the switch ID that enables random direction.
 * @type switch
 * @default 0
 * 
 * @param RegionRandomKey
 * @text Region Random Direction
 * @desc Configure the random direction settings for regions.
 * @default 
 * @type struct<RandomKeyRegionSetting>[]
 * 
 * @param RandomMovementDisabled
 * @text Disabled map id
 * @desc Specify the map IDs where random movement is disabled.
 * @default 
 * @type map[]
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 方向キーランダム移動
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.1
 * 
 * @help
 * 移動による方向キーの入力をランダム化します。
 * 
 * 主な機能
 * 特徴による方向キーの入力をランダム化。
 * スイッチによる方向キーの入力をランダム化。
 * リージョンによる方向キーの指定。
 * 
 * 当プラグインではマウス操作での移動を無効にする機能はありません。
 * マウスでの操作では方向キーのランダム化されません。
 * マウス操作での移動を無効にする場合は別途プラグインが必要です。
 * タッチ操作無効化プラグイン(トリアコンタン様)など
 * 
 * 特徴を有するメモ欄
 * <RomdomKeyMove> この特徴があるアクターがパーティ内に存在する場合、方向キーがランダムになります。
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
 * 2026/5/2 Ver.1.0.1
 * リージョンIDが0のタイルでは処理を行わないように修正。
 * 2026/4/30 Ver.1.0.0
 * 初版
 * 
 * @param RandomKeySwitch
 * @text ランダム方向スイッチ
 * @desc ランダム方向を有効にするスイッチIDを指定します。
 * @type switch
 * @default 0
 * 
 * @param RegionRandomKey
 * @text リージョンランダム方向
 * @desc リージョンでのランダム方向の設定を行います。
 * @default 
 * @type struct<RandomKeyRegionSetting>[]
 * 
 * @param RandomMovementDisabled
 * @text 無効マップID
 * @desc ランダム移動を無効にするマップIDを指定します。
 * @default 
 * @type map[]
 * 
 * 
 */
/*~struct~RandomKeyRegionSetting:
 * 
 * @param RegionId
 * @text Region id
 * @desc Specify the region ID.
 * @type number
 * @max 255
 * @default 0
 * 
 * @param RegionKeySetting
 * @text Key setting
 * @desc Assign the key.
 * @default {"DownKey":"down","LeftKey":"left","RightKey":"right","UpKey":"down"}
 * @type struct<KeySetting>
 * 
 */
/*~struct~RandomKeyRegionSetting:ja
 * 
 * @param RegionId
 * @text リージョンID
 * @desc リージョンIDを指定します。
 * @type number
 * @max 255
 * @default 0
 * 
 * @param RegionKeySetting
 * @text キー設定
 * @desc キーの割り当てを行います。
 * @default {"DownKey":"down","LeftKey":"left","RightKey":"right","UpKey":"down"}
 * @type struct<KeySetting>
 * 
 */
/*~struct~KeySetting:
 * 
 * @param DownKey
 * @text Down arrow key
 * @desc Assign the key used to move down.
 * @type select
 * @option Left
 * @value left
 * @option Right
 * @value right
 * @option Down
 * @value down
 * @option Up
 * @value up
 * @default down
 * 
 * @param LeftKey
 * @text Left arrow key
 * @desc Assign the key used to move left.
 * @type select
 * @option Left
 * @value left
 * @option Right
 * @value right
 * @option Down
 * @value down
 * @option Up
 * @value up
 * @default left
 * 
 * @param RightKey
 * @text Right arrow key
 * @desc Assign the key used to move right.
 * @type select
 * @option Left
 * @value left
 * @option Right
 * @value right
 * @option Down
 * @value down
 * @option Up
 * @value up
 * @default right
 * 
 * @param UpKey
 * @text Up arrow key
 * @desc Assign the key used to move upward.
 * @type select
 * @option Left
 * @value left
 * @option Right
 * @value right
 * @option Down
 * @value down
 * @option Up
 * @value up
 * @default down
 * 
 */
/*~struct~KeySetting:ja
 * 
 * @param DownKey
 * @text 下方向キー
 * @desc 下方向に移動するキーの割り当てを行います。
 * @type select
 * @option Left
 * @value left
 * @option Right
 * @value right
 * @option Down
 * @value down
 * @option Up
 * @value up
 * @default down
 * 
 * @param LeftKey
 * @text 左方向キー
 * @desc 左方向に移動するキーの割り当てを行います。
 * @type select
 * @option Left
 * @value left
 * @option Right
 * @value right
 * @option Down
 * @value down
 * @option Up
 * @value up
 * @default left
 * 
 * @param RightKey
 * @text 右方向キー
 * @desc 右方向に移動するキーの割り当てを行います。
 * @type select
 * @option Left
 * @value left
 * @option Right
 * @value right
 * @option Down
 * @value down
 * @option Up
 * @value up
 * @default right
 * 
 * @param UpKey
 * @text 上方向キー
 * @desc 上方向に移動するキーの割り当てを行います。
 * @type select
 * @option Left
 * @value left
 * @option Right
 * @value right
 * @option Down
 * @value down
 * @option Up
 * @value up
 * @default down
 * 
 */

var Imported = Imported || {};
Imported.NUUN_RandomMove = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    Game_Actor.prototype.isKeyRomdomMove = function() {
        return this.traitObjects().some(trait => !!trait && !!trait.meta.RomdomKeyMove);
    };

    Game_Party.prototype.isKeyRomdomMove = function() {
        return this.members().some(member => member.isKeyRomdomMove());
    };

    
    const _Input_clear = Input.clear;
    Input.clear = function() {
        _Input_clear.apply(this, arguments);
        this._randomInput = null;
        this._regionKeyInput = null;
    };

    const _Input_updateDirection = Input._updateDirection;
    Input._updateDirection = function() {
        this._setRandomKey();
        _Input_updateDirection.apply(this, arguments);
    };

    const _Input_signX = Input._signX;
    Input._signX = function() {
        if (!this.isRandomMoveInput()) {
            return _Input_signX.apply(this, arguments);
        }
        const left = this.isPressed(Input._getInputKey(1)) ? 1 : 0;
        const right = this.isPressed(Input._getInputKey(2)) ? 1 : 0;
        return right - left;
    };

    const _Input_signY = Input._signY;
    Input._signY = function() {
        if (!this.isRandomMoveInput()) {
            return _Input_signY.apply(this, arguments);
        }
        const up = this.isPressed(Input._getInputKey(3)) ? 1 : 0;
        const down = this.isPressed(Input._getInputKey(0)) ? 1 : 0;
        return down - up;
    };

    Input.isRandomMoveInput = function() {
        if (!!params.RandomMovementDisabled && params.RandomMovementDisabled.some(mapId => !!$gameMap && mapId === $gameMap.mapId())) {
            return false;
        } else if (!this._regionKeyInput && !this._randomInput) {
            return false;
        } else {
            return true;
        }
    };

    Input._getInputKey = function(index) {
        if (!!this._regionKeyInput) {
            return this._regionKeyInput[index];
        } else if (!!this._randomInput) {
            return this._randomInput[index];
        } else {
            switch (index) {
                case 0:
                    return "down";
                case 1:
                    return "left";
                case 2:
                    return "right";
                case 3:
                    return "up";
            };
        }
    };

    Input._setRandomKey = function() {
        if (this._isRegionRandomKey()) {
            return;
        } else if (this._isRandomMoveKey()) {//特徴及びスイッチによるランダムキー
            if (!!this._regionKeyInput || !!this._randomInput) return;
            this._randomInput = [];
            const dirs = ["down", "left", "right", "up"];
            this._randomInput[0] = dirs.splice(Math.floor(Math.random() * dirs.length), 1);
            this._randomInput[1] = dirs.splice(Math.floor(Math.random() * dirs.length), 1);
            this._randomInput[2] = dirs.splice(Math.floor(Math.random() * dirs.length), 1);
            this._randomInput[3] = dirs.splice(Math.floor(Math.random() * dirs.length), 1);
        } else {
            this._randomInput = null;
        }
    };

    Input.setRegionRandomKey = function(data) {
        this._regionKeyInput = [];
        if (!!data.RegionKeySetting) {
            this._regionKeyInput[0] = data.RegionKeySetting.DownKey;
            this._regionKeyInput[1] = data.RegionKeySetting.LeftKey;
            this._regionKeyInput[2] = data.RegionKeySetting.RightKey;
            this._regionKeyInput[3] = data.RegionKeySetting.UpKey;
        } else {
            this._regionKeyInput = null;
        }
    };

    Input._isRandomMoveKey = function() {
        if (!$gameSwitches || !$gameParty) return false;
        return $gameSwitches.value(params.RandomKeySwitch) || $gameParty.isKeyRomdomMove();
    };

    Input._isRegionRandomKey = function() {
        if (!$dataMap || !params.RegionRandomKey) {
            this._regionKeyInput = null;
            return false;
        }
        const region = $gamePlayer.regionId();
        if (region === 0) return false;
        const find = params.RegionRandomKey.find(data => data.RegionId === region);
        if (!!find) {
            this.setRegionRandomKey(find);//ランダムキーが設定されていても強制的に適用。
            return true;
        }
        this._regionKeyInput = null;
        return false;
    };

    
})();