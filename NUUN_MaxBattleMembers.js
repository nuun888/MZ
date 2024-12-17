/*:-----------------------------------------------------------------------------------
 * NUUN_MaxBattleMembers.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Change in number of battle members
 * @author NUUN
 * @version 1.0.8
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * Change the number of members participating in the battle. 
 * You can also change the maximum number of battle members during the game.
 * 
 * The function to keep the gauge width within a range depending on the screen size and number of members has been made into a separate plugin.
 * NUUN_BattleGaugeWidthFix
 * 
 * specification
 * The number of members that can be set in the plugin command's maximum number of battle members must be less than or equal to the maximum number of battle members in the plugin parameters.
 * 
 * 
 * Log
 * 12/17/2021 Ver.1.0.8
 * Fixed formations to display with 5 or more people.
 * 8/28/2021 Ver.1.0.0
 * First edition.
 * 
 * @command SetMaxBattleMember
 * @desc Change the maximum number of battlers.
 * @text Change in maximum battle members
 * 
 * @arg maxBattleMember
 * @text Maximum number of battle members
 * @desc Set the maximum number of battle members.
 * @type number
 * @default 0
 * 
 * 
 * @param MaxBattleMemberNum
 * @text Maximum number of battle members
 * @desc Set the maximum number of battle members.
 * @type number
 * @default 4
 * @min 1
 * 
 * @param MaxFollowers
 * @text Maximum number of followers displayed
 * @desc Set the maximum number of followers to display.
 * @type number
 * @default 4
 * @min 1
 * 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 戦闘メンバー数変更プラグイン
 * @author NUUN
 * @version 1.0.8
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * 戦闘参加メンバーの人数を変更します。またゲーム途中で最大バトルメンバー数を変更できます。
 * 
 * 画面サイズ、メンバー数によってゲージの幅を範囲内に収める機能は別プラグイン化いたしました。
 * NUUN_BattleGaugeWidthFix
 * 
 * 
 * 更新履歴
 * 2024/12/17 Ver.1.0.8
 * 隊列が5人以上で表示されるように修正。
 * 2024/6/16 Ver.1.0.7
 * 戦闘中に最大メンバーが増加したときにサイドビューアクターが表示されない問題を修正。
 * 2022/8/27 Ver.1.0.6
 * ゲージ幅補正機能を別プラグイン化。
 * 2022/8/6 Ver.1.0.5
 * 競合対策
 * 2022/7/31 Ver.1.0.4
 * 戦闘メンバーが5人以上の時にゲージがはみ出さないように修正。
 * 2022/2/27 Ver.1.0.3
 * 戦闘中に最大メンバーの増減をさせるとエラーがでる問題を修正。
 * 2022/2/11 Ver.1.0.2
 * 戦闘中に最大メンバー数を変更すると表示が乱れる問題を修正。
 * 2021/9/18 Ver.1.0.1
 * 戦闘開始時にエラーが出る問題を修正。
 * 2021/8/28 Ver.1.0.0
 * 初版
 * 
 * @command SetMaxBattleMember
 * @desc 最大戦闘人数を変更します。
 * @text 最大戦闘人数変更
 * 
 * @arg maxBattleMember
 * @text 最大戦闘メンバー数
 * @desc 最大戦闘メンバー数を設定します。設定できるメンバー数はプラグインパラメータの最大戦闘メンバー数以下となります。
 * @type number
 * @default 0
 * 
 * 
 * @param MaxBattleMemberNum
 * @text 最大戦闘メンバー数
 * @desc 最大戦闘メンバー数を設定します。
 * @type number
 * @default 4
 * @min 1
 * 
 * @param MaxFollowers
 * @text フォロワー最大表示数
 * @desc フォロワーの最大表示数を設定します。
 * @type number
 * @default 4
 * @min 1
 * 
 * 
 */

var Imported = Imported || {};
Imported.NUUN_MaxBattleMembers = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;
    const MaxBattleMemberNum = params.MaxBattleMemberNum;
    let membersRefresh = false;

    PluginManager.registerCommand(pluginName, 'SetMaxBattleMember', args => {
        $gameParty.setMaxBattleMembers(Number(args.maxBattleMember));
    });

    const _Game_Party_initialize = Game_Party.prototype.initialize;
    Game_Party.prototype.initialize = function() {
        _Game_Party_initialize.call(this);
        this._maxBattleMembers = MaxBattleMemberNum;
    };

    Game_Party.prototype.maxBattleMembers = function() {//再定義
        if (this._maxBattleMembers === undefined) {
            this.setMaxBattleMembers(MaxBattleMemberNum);
        }
        return this._maxBattleMembers;
    };

    Game_Party.prototype.setMaxBattleMembers = function(num) {
        this._maxBattleMembers = num;
        if (this.inBattle()) {
            $gameTemp.requestBattleRefresh();
            membersRefresh = true;
        }
        $gamePlayer.refresh();
    };


    const _Game_Followers_setup = Game_Followers.prototype.setup;
    Game_Followers.prototype.setup = function() {
        _Game_Followers_setup.apply(this, arguments);
        if (this._data.length > params.MaxFollowers) return;
        for (let i = this._data.length + 1; i <= params.MaxFollowers; i++) {
            this._data.push(new Game_Follower(i));
        }
    };

    if (false) {
        const _Game_Player_refresh = Game_Player.prototype.refresh;
        Game_Player.prototype.refresh = function() {
                this._followers.setupNewAddActor();
                _Game_Player_refresh.apply(this, arguments);
                this.synchronizeNewAddActor();
        };
            
        Game_Player.prototype.synchronizeNewAddActor = function() {
            if (this._followers.newAddActor) {
                this._followers.synchronize(this._x, this._y, this.direction());
            }
        };
    
        const _Spriteset_Map_update = Spriteset_Map.prototype.update;
        Spriteset_Map.prototype.update = function() {
            _Spriteset_Map_update.call(this);
            this.updateCharacters();
        };
        
        Spriteset_Map.prototype.updateCharacters = function() {
            if ($gamePlayer._followers.newAddActor) {
                this.createCharacters();
                $gamePlayer._followers.newAddActor = false;
            }
        };
    
        Game_Followers.prototype.setupNewAddActor = function() {
            const dataLength = this._data.length;
            const index = dataLength + 1;
            const max = $gameParty.maxBattleMembers();
            for (let i = index; i < max; i++) {
                this._data.push(new Game_Follower(i));
            }
            if (this._data.length > dataLength) {
                this.newAddActor = true;
            }
        };
    }

    const _Window_BattleStatus_initialize = Window_BattleStatus.prototype.initialize;
    Window_BattleStatus.prototype.initialize = function(rect) {
        _Window_BattleStatus_initialize.call(this, rect);

    };

    Window_BattleStatus.prototype.maxCols = function() {//再定義
        return $gameParty._maxBattleMembers;
    };

    const _Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        _Scene_Battle_update.call(this);
        if (BattleManager.isTpb() && membersRefresh && !$gameTemp.isBattleRefreshRequested() && this._actorCommandWindow.actor()) {
            membersRefresh = false;
            const index = $gameParty.battleMembers().indexOf(this._actorCommandWindow.actor());
            if (index >= 0) {
            this._statusWindow.select(index);
            } else {
            this.commandCancel();
            }
        }
    };


    const _Spriteset_Battle_updateActors = Spriteset_Battle.prototype.updateActors;
    Spriteset_Battle.prototype.updateActors = function() {
        this.addCreateActors();
        _Spriteset_Battle_updateActors.apply(this, arguments);
    };
    

    Spriteset_Battle.prototype.addCreateActors = function() {
        if ($gameSystem.isSideView() && this._actorSprites && $gameParty.maxBattleMembers() > this._actorSprites.length) {
            const count = $gameParty.maxBattleMembers() - this._actorSprites.length;
            for (let i = 0; i < count; i++) {
                const sprite = new Sprite_Actor();
                sprite.startMove(0, 0, 0);
                this._actorSprites.push(sprite);
                this._battleField.addChild(sprite);
            }
        }
    };


})();