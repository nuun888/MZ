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
 * @version 1.0.1
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

const _Game_Party_defaultMaxBattleMembers = Game_Party.prototype.defaultMaxBattleMembers;
Game_Party.prototype.defaultMaxBattleMembers = function() {
  const members = _Game_Party_defaultMaxBattleMembers.call(this);
  return Imported.NUUN_SupportActor ? members * 2 : members;
};

Game_Party.prototype.standbyMembers = function() {
  return this.allMembers().slice(this.maxBattleMembers() + this.getSupportBattleMembersNum());
};

const _Game_Party_maxFormationBattleMembers = Game_Party.prototype.maxFormationBattleMembers;
Game_Party.prototype.maxFormationBattleMembers = function() {
  return _Game_Party_maxFormationBattleMembers.call(this) + this.getSupportBattleMembersNum();
};

const _Window_FormationBattleMember_actor = Window_FormationBattleMember.prototype.actor;
Window_FormationBattleMember.prototype.actor = function(index) {
  $gameParty.membersMode = true;
  return _Window_FormationBattleMember_actor.call(this, index);
};

const _Window_FormationBattleMember_maxItems = Window_FormationBattleMember.prototype.maxItems;
Window_FormationBattleMember.prototype.maxItems = function() {
  $gameParty.membersMode = true;
  return _Window_FormationBattleMember_maxItems.call(this);
};

})();