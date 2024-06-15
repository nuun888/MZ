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
 * @plugindesc 戦闘メンバー数変更プラグイン
 * @author NUUN
 * @version 1.0.7
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * 戦闘参加メンバーの人数を変更します。またゲーム途中で最大バトルメンバー数を変更できます。
 * 
 * 画面サイズ、メンバー数によってゲージの幅を範囲内に収める機能は別プラグイン化いたしました。
 * NUUN_BattleGaugeWidthFix
 * 
 * 仕様
 * 最大戦闘メンバー数を前の数値より高く変更した場合、セーブ後のデータでは前の最大戦闘メンバー数よりフォロワーの画像が表示されません。
 * 
 * 更新履歴
 * 2024/6/16 Ver.1.0.7
 * 戦闘中に最大メンバーが増加したときにサイドビューアクターが表示されない問題を修正。
 * 2022/8/27 Ver.1.0.6
 * ゲージ幅補正機能を別プラグイン化。
 * 2022/8/6 Ver.1.0.5
 * 競合対策
 * 2022/7/31 Ver.1.0.4
 * 戦闘メンバーが５人以上の時にゲージがはみ出さないように修正。
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
 * 
 */

var Imported = Imported || {};
Imported.NUUN_MaxBattleMembers = true;

(() => {
const parameters = PluginManager.parameters('NUUN_MaxBattleMembers');
const MaxBattleMemberNum = Number(parameters['MaxBattleMemberNum'] || 4);
let membersRefresh = false;

const pluginName = "NUUN_MaxBattleMembers";
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