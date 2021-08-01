/*:-----------------------------------------------------------------------------------
 * NUUN_SupportActor.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc サポートアクタープラグイン
 * @author NUUN
 * @version 1.0.0
 *            
 * @help
 * 戦闘でサポートするアクターを設定します。
 * サポートアクターは戦闘画面に表示されずアクターステータスウィンドウにも表示されません。また攻撃対象にされません。
 * サポートメンバー以外のメンバーが全滅した場合、敗北となります。
 * 自動戦闘、経験値の入手に関して設定はアクターの特徴から設定してください。
 * 
 * アクターのメモ欄
 * <SupportActor>　このタグがあるアクターはサポートアクターとなります。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/8/1 Ver.1.0.0
 * 初版
 * 
 */
var Imported = Imported || {};
Imported.NUUN_SupportActor = true;
membersMode = false;

(() => {
  const parameters = PluginManager.parameters('NUUN_SupportActor');

  Game_Actor.prototype.isSupportActor = function() {
    return this.actor().meta.SupportActor;
  };

  const _Game_Actor_isBattleMember = Game_Actor.prototype.isBattleMember;
  Game_Actor.prototype.isBattleMember = function() {
    const result = _Game_Actor_isBattleMember.call(this);
    if (result) {
      return result;
    }
    return $gameParty.supportBattleMembers().includes(this);
  };

  const _BattleManager_initMembers = BattleManager.initMembers;
  BattleManager.initMembers = function() {
    _BattleManager_initMembers.call(this);
    this.membersMode = false;
  };

  const _BattleManager_allBattleMembers = BattleManager.allBattleMembers;
  BattleManager.allBattleMembers = function() {
    return _BattleManager_allBattleMembers.call(this).concat($gameParty.supportBattleMembers())
  };

  const _BattleManager_makeActionOrders = BattleManager.makeActionOrders;
  BattleManager.makeActionOrders = function() {
    _BattleManager_makeActionOrders.call(this);
    const battlers = this._actionBattlers;
    if (!this._surprise) {
      battlers.push(...$gameParty.supportBattleMembers());
    }
    for (const battler of battlers) {
      battler.makeSpeed();
    }
    battlers.sort((a, b) => b.speed() - a.speed());
    this._actionBattlers = battlers;
  };

  const _BattleManager_changeCurrentActor = BattleManager.changeCurrentActor;
  BattleManager.changeCurrentActor = function(forward) {
    this.membersMode = true;
    _BattleManager_changeCurrentActor.call(this, forward);
  };

  const _Game_Party_battleMembers = Game_Party.prototype.battleMembers;
  Game_Party.prototype.battleMembers = function() {
    let members = _Game_Party_battleMembers.call(this).filter(actor => !actor.isSupportActor());//サポートメンバーを除外
    if (BattleManager.membersMode) {
      members = members.concat(this.supportBattleMembers());
      BattleManager.membersMode = false;
    }
    return members;
  };

  Game_Party.prototype.supportBattleMembers = function() {
    return this.allMembers().filter(actor => actor.isAppeared() && actor.isSupportActor());
  };

  const _Game_Party_makeActions = Game_Party.prototype.makeActions;
  Game_Party.prototype.makeActions = function() {
    _Game_Party_makeActions.call(this);
    for (const member of this.supportBattleMembers()) {
        member.makeActions();
    }
  };

  const _Game_Party_updateTpb = Game_Party.prototype.updateTpb;
  Game_Party.prototype.updateTpb = function() {
    _Game_Party_updateTpb.call(this);
    for (const member of this.supportBattleMembers()) {
      member.updateTpb();  
    }
  };

  const _Game_Party_canInput = Game_Party.prototype.canInput;
  Game_Party.prototype.canInput = function() {
    return _Game_Party_canInput.call(this) || this.supportBattleMembers().some(actor => actor.canInput());
  };

})();