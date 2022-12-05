/*:-----------------------------------------------------------------------------------
 * NUUN_StandbyMemberFollowers.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Follower standby member display
 * @author NUUN
 * @version 1.0.1
 * 
 * @help
 * Display waiting members to followers.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * 12/5/2022 Ver.1.0.1
 * Changed follower collision judgment to judgment by switch.
 * Added a switch that turns ON when all-way traffic is no longer possible and a function to call a common event.
 * 12/4/2022 Ver.1.0.0
 * First edition.
 * 
 * @param MaxMembers
 * @desc Maximum number of player followers.
 * @text Max number of player followers
 * @type number
 * @default 10
 * 
 * @param FollowerCollidedSwitch
 * @desc Perform follower collision detection. By turning it ON, you will not be able to slip through the followers.
 * @text Follower collision switch
 * @type switch
 * @default 0
 * 
 * @param AllCollidedSwitch
 * @desc A switch ID that turns ON when traffic is no longer possible in all directions.
 * @text 4-Way Impassable Switch
 * @type switch
 * @default 0
 * 
 * @param AllDirectionsCollidedOnCommonEvent
 * @desc A common event that is called when it becomes impossible to pass in all directions.
 * @text 4-Way Impassable Common Event
 * @type common_event
 * @default 0
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 隊列控えメンバー表示
 * @author NUUN
 * @version 1.0.1
 * 
 * @help
 * 隊列に控えメンバーを表示します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 2022/12/5 Ver.1.0.1
 * フォロワー衝突判定をスイッチでの判定に変更。
 * 全方向通行できなくなったときにONにするスイッチ及び、コモンイベントを呼び出す機能を追加。
 * 2022/12/4 Ver.1.0.0
 * 初版
 * 
 * @param MaxMembers
 * @desc リーダーを含む最大隊列数
 * @text 最大隊列数
 * @type number
 * @default 10
 * 
 * @param FollowerCollidedSwitch
 * @desc フォロワーの衝突判定を行います。ONにすることでフォロワーをすり抜けることは出来なくなります。
 * @text フォロワー衝突判定スイッチ
 * @type switch
 * @default 0
 * 
 * @param AllCollidedSwitch
 * @desc 全方向通行できなくなった時にONにするスイッチID。
 * @text 全方向通行不能スイッチ
 * @type switch
 * @default 0
 * 
 * @param AllDirectionsCollidedOnCommonEvent
 * @desc 全方向通行できなくなった時に呼び出すコモンイベント。
 * @text 全方向通行不能コモンイベント
 * @type common_event
 * @default 0
 * 
 */

var Imported = Imported || {};
Imported.NUUN_StandbyMemberFollowers = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_StandbyMemberFollowers');
    const MaxMembers = Number(parameters['MaxMembers'] || 10);
    const FollowerCollidedSwitch = Number(parameters['FollowerCollidedSwitch'] || 0);
    const AllCollidedSwitch = Number(parameters['AllCollidedSwitch'] || 0);
    const AllDirectionsCollidedOnCommonEvent = Number(parameters['AllDirectionsCollidedOnCommonEvent'] || 0);

    Game_Followers.prototype.setup = function() {//再定義
        this._data = [];
        for (let i = 1; i < MaxMembers; i++) {
            this._data.push(new Game_Follower(i));
        }
    };

    Game_Followers.prototype.nuun_addFollowers = function() {
        if (this._data.length + 1 < MaxMembers) {
            for (let i = this._data.length + 1; i < MaxMembers; i++) {
                this._data.push(new Game_Follower(i));
            }
        }
    };

    Game_Follower.prototype.actor = function() {//再定義
        return $gameParty.members()[this._memberIndex];
    };

    const _Spriteset_Map_createCharacters = Spriteset_Map.prototype.createCharacters;
    Spriteset_Map.prototype.createCharacters = function() {
        $gamePlayer.followers().nuun_addFollowers();
        _Spriteset_Map_createCharacters.call(this);
    };

    const _Game_CharacterBase_isCollidedWithCharacters = Game_CharacterBase.prototype.isCollidedWithCharacters;
    Game_CharacterBase.prototype.isCollidedWithCharacters = function(x, y) {
        const _class = String(this.constructor.name);
        if (FollowerCollidedSwitch > 0 && $gameSwitches.value(FollowerCollidedSwitch) && _class === "Game_Player") {
            return _Game_CharacterBase_isCollidedWithCharacters.call(this, x, y) || this.isCollidedWithPlayerCharacters(x, y);
        } else {
            return _Game_CharacterBase_isCollidedWithCharacters.call(this, x, y);
        }
    };

    Game_Player.prototype.isCollidedWithPlayerCharacters = function(x, y) {
        return this.isNormalPriority() && $gamePlayer.isCollided(x, y);
    };

    Game_Player.prototype.isAllDirectionsCollided = function(x, y) {
        return !this.canPass(x, y, 2) && !this.canPass(x, y, 4) && !this.canPass(x, y, 6) && !this.canPass(x, y, 8);
    };

    Game_Player.prototype.allDirectionsCollided = function() {
        const result = this.isAllDirectionsCollided(this.x, this.y);
        if (AllCollidedSwitch > 0) {
            if (result !== $gameSwitches.value(AllCollidedSwitch)) {
                $gameSwitches.setValue(AllCollidedSwitch, result);
            }
        }
        if (result && AllDirectionsCollidedOnCommonEvent > 0) {
            $gameTemp.reserveCommonEvent(AllDirectionsCollidedOnCommonEvent);
        }
    };

    const _Game_Player_moveStraight = Game_Player.prototype.moveStraight;
    Game_Player.prototype.moveStraight = function(d) {
        _Game_Player_moveStraight.call(this, d);
        this.allDirectionsCollided();
    };
    
})();