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
 * @version 1.0.0
 * 
 * @help
 * Also show waiting members to followers.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * 12/4/2022 Ver.1.0.0
 * First edition.
 * 
 * @param MaxMembers
 * @desc Maximum number of player followers.
 * @text Max number of player followers
 * @type number
 * @default 10
 * 
 * @param FollowerCollided
 * @desc Perform collision detection on followers. You will no longer be able to slip through your followers.
 * @text Follower collision detection
 * @type boolean
 * @default false
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 隊列控えメンバー表示
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * 隊列に控えメンバーを表示します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 2022/12/4 Ver.1.0.0
 * 初版
 * 
 * @param MaxMembers
 * @desc リーダーを含む最大隊列数
 * @text 最大隊列数
 * @type number
 * @default 10
 * 
 * @param FollowerCollided
 * @desc 隊列に衝突判定を行います。隊列をすり抜けることは出来なくなります。
 * @text 隊列衝突判定
 * @type boolean
 * @default false
 * 
 */

var Imported = Imported || {};
Imported.NUUN_StandbyMemberFollowers = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_StandbyMemberFollowers');
    const MaxMembers = Number(parameters['MaxMembers'] || 10);
    const FollowerCollided = eval(parameters['FollowerCollided'] || "false");

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
        if (FollowerCollided && _class === "Game_Player") {
            return _Game_CharacterBase_isCollidedWithCharacters.call(this, x, y) || this.isCollidedWithPlayerCharacters(x, y);
        } else {
            return _Game_CharacterBase_isCollidedWithCharacters.call(this, x, y);
        }
    };

    Game_Player.prototype.isCollidedWithPlayerCharacters = function(x, y) {
        return this.isNormalPriority() && $gamePlayer.isCollided(x, y);
    };
    
})();