/*:-----------------------------------------------------------------------------------
 * NUUN_SceneFormation_SupportActor.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc メンバー変更画面(サポートアクター反映)
 * @author NUUN
 * @version 1.1.0
 * @base NUUN_SceneFormation
 * @base NUUN_SupportActor
 * @orderAfter NUUN_SceneFormation
 * 
 * @help
 * メンバー変更画面にサポートアクター（NUUN_SupportActor）の機能を反映できるようにします。
 * このプラグインはメンバー変更画面（NUUN_SceneFormation）及びサポートアクター（NUUN_SupportActor）の拡張機能です。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/3/30 Ver.1.1.1
 * メンバー変更プラグインの処理追加による修正。
 * 2022/3/30 Ver.1.1.0
 * メンバー変更画面、サポートアクター処理見直しによる定義変更。
 * 2021/8/19 Ver.1.0.2
 * 戦闘メンバーを全てサポートメンバーにしたときに戦闘に敗北してしまう問題を修正。
 * 2021/8/18 Ver.1.0.1
 * 戦闘メンバーが最大戦闘メンバー未満の時にエラーが起きる問題による処理の修正。
 * 2021/8/17 Ver.1.0.0
 * 初版
 * 
 * @param SupportActorBackColor
 * @text サポートアクター背景色
 * @desc サポートアクターの背景色。
 * @type number
 * @default 5
 * @min -1
 * 
 */
var Imported = Imported || {};
Imported.NUUN_SceneFormation_SupportActor = true;

(() => {
const parameters = PluginManager.parameters('NUUN_SceneFormation_SupportActor');
const parameters2 = PluginManager.parameters('NUUN_SceneFormation');
const VariableBattleMember = eval(parameters2['VariableBattleMember'] || "true");
const BattleMember_Cols = Number(parameters2['BattleMember_Cols'] || 4);
const BattleMember_Rows = Number(parameters2['BattleMember_Rows'] || 1);
const parameters3 = PluginManager.parameters('NUUN_SceneBattleFormation');
const BattleMember_ColsInBattle = Number(parameters3['BattleMember_Cols'] || 4);
const BattleMember_RowsInBattle = Number(parameters3['BattleMember_Rows'] || 1);

Game_Party.prototype.formationBattleMember = function() {
  const members = this.withSupportActorInBattleMembers();
  if (VariableBattleMember) {
    members.push(null);
  }
  return members;
};

Game_Party.prototype.withSupportActorInBattleMembers = function() {
  const members = this.allBattleMembers().filter(actor => actor.isAppeared());
  const maxMember = this.maxBattleMembers();
  let i = maxMember - this.membersInSupportActorNum(members);
  const concatMembers = this.allMembers().slice(this.maxBattleMembers()).filter(member => {
    if (!member.getSupportActor()) {
      i++;
    }
    if (i <= maxMember && member.isAppeared() && !member.getSupportActor()) {
      return true;
    }
    if (i < maxMember && member.isAppeared() && member.getSupportActor()) {
      return true;
    }
    return false;
  });
  Array.prototype.push.apply(members, concatMembers);
  return members;
};

Game_Party.prototype.allStandByMembers = function() {
  return this.allMembers().filter(member => member.isAppeared()).slice(this.withSupportActorInBattleMembers().length);
};

const _Game_Party_checkSwap = Game_Party.prototype.checkSwap;
Game_Party.prototype.checkSwap = function(index) {
  const actor = this.allMembers()[index];
  return actor && !actor.getSupportActor() && _Game_Party_checkSwap.call(this);
};

const _Window_FormationBattleMember_maxCols = Window_FormationBattleMember.prototype.maxCols;
Window_FormationBattleMember.prototype.maxCols = function() {
  return _Window_FormationBattleMember_maxCols.call(this) * (this.getParamBattleMember_Rows() === 1 ? 2 : 1);
};

})();