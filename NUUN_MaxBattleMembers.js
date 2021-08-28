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
 * @version 1.0.0
 * 
 * @help
 * 戦闘参加メンバーの人数を変更します。またゲーム途中で最大バトルメンバー数を変更できます。
 * 
 * 仕様
 * 最大戦闘メンバー数を前の数値より高く変更した場合、セーブ後のデータでは前の最大戦闘メンバー数よりフォロワーの画像が表示されません。
 * 
 * 更新履歴
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
 * @param BattleMemberCols
 * @text バトルステータス表示列数
 * @desc バトルステータス表示列数を設定します。
 * @type number
 * @default 4
 * @min 1
 * 
 */

var Imported = Imported || {};
Imported.NUUN_MaxBattleMembers = true;

(() => {
const parameters = PluginManager.parameters('NUUN_MaxBattleMembers');
const MaxBattleMemberNum = Number(parameters['MaxBattleMemberNum'] || 4);
const BattleMemberCols = Number(parameters['BattleMemberCols'] || 4);

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
    this.setMaxBattleMembers(MaxBattleMemberNum)
  }
  return this._maxBattleMembers;
};

Game_Party.prototype.setMaxBattleMembers = function(num) {
  this._maxBattleMembers = num;
  $gamePlayer.refresh();
};

Window_BattleStatus.prototype.maxCols = function() {//再定義
  return BattleMemberCols;
};

})();
