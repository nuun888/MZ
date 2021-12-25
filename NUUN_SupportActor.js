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
 * @version 1.3.3
 * @base NUUN_Base
 * @orderAfter NUUN_Base
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
 * 2021/12/25 Ver.1.3.3
 * プラグインコマンド「サポートアクター設定」に戦闘中の呼び出しターンを指定する機能を追加。
 * 2021/12/24 Ver.1.3.2
 * 特定の条件下でアクターのコマンドが表示されなくなる問題を修正。
 * その他競合対策。
 * 機能していないプラグインパラメータを削除。
 * 2021/12/18 Ver.1.3.1
 * 特定条件下で戦闘中に攻撃コマンドを使用するとエラーが出る問題を修正。
 * 2021/11/3 Ver.1.3.0
 * プラグインコマンドからサポートアクターを設定できる機能を追加。
 * 2021/8/17 Ver.1.2.3
 * メンバー変更画面反映のための処理追加。
 * 2021/8/11 Ver.1.2.2
 * サイドビューに表示するサポートアクターの最大数を超えてサポートアクターがメンバーに追加されるとエラーが出る問題を修正。
 * 2021/8/11 Ver.1.2.1
 * 一部のプラグインパラメータの説明が別の説明になっていた問題を修正。
 * 2021/8/10 Ver.1.2.0
 * サイドビューアクターにサポートアクターを表示する機能を追加。
 * 2021/8/9 Ver.1.1.1
 * セーブ画面拡張でサポートアクターのレベル、サイドビューアクターが表示されなかった問題を修正。
 * 並び替えでサポートアクターを先頭にすると先頭の歩行グラが変わらない問題を修正。
 * 2021/8/9 Ver.1.1.0
 * サポートアクターがフォロワーに表示されていなかった問題を修正。
 * ターン制時のコマンドの処理を修正。
 * セーブ画面のアクター表示にサポートアクターを入れるかの可否する機能を追加。
 * 2021/8/1 Ver.1.0.0
 * 初版
 * 
 * @command SupportActorSetting
 * @desc サポートアクターにするまたは、解除するアクターを設定します。
 * @text サポートアクター設定
 * 
 * @arg Actor
 * @text アクター
 * @desc アクターを指定します。
 * @type actor
 * @default 0
 * 
 * @arg  SupportActorsSwitch
 * @desc サポートアクターのONまたはOFF（ONでサポートアクター化）
 * @text サポートアクタースイッチ
 * @type boolean
 * @default true
 * 
 * @arg SupportActorTurn
 * @text サポートアクターターン
 * @desc サポートアクターを呼び出しているターンを設定します。(-1で無制限、-2で戦闘終了まで)
 * @type number
 * @default -1
 * 
 * 
 * @param SupportActorSV
 * @text サイドビューサポートアクター設定
 * @desc サイドビューサポートアクター設定。
 * @default []
 * @type struct<SupportActorSVList>[]
 * 
 */
/*~struct~SupportActorSVList:
 * 
 * @param SupportActorSV_X
 * @text サポートアクターSV座標X
 * @desc サポートアクターSV座標X
 * @type number
 * @default 0
 * 
 * @param SupportActorSV_Y
 * @text サポートアクターSV座標Y
 * @desc サポートアクターSV座標Y
 * @type number
 * @default 96
 * 
 */
var Imported = Imported || {};
Imported.NUUN_SupportActor = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_SupportActor');
  const SupportActorSV = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['SupportActorSV'])) : null) || [];
  const SupportActorMode = eval(parameters['SupportActorMode'] || 'false');
  let sIndex = -1;

  const pluginName = "NUUN_SupportActor";
  PluginManager.registerCommand(pluginName, 'SupportActorSetting', args => {
    const actorId = Number(args.Actor);
    if (actorId > 0) {
      $gameActors._data[actorId].setAddSupportActor(args);
    }
  });

  const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
  Game_Actor.prototype.initMembers = function() {
    _Game_Actor_initMembers.call(this);
    this._supportActorTurn = -1;
    this._supportActorCallActor = 0;
    this._supportActorDeadCallActor = false;
    this._supportActor = false;
  };

  const _Game_Actor_setup = Game_Actor.prototype.setup;
  Game_Actor.prototype.setup = function(actorId) {
    _Game_Actor_setup.call(this, actorId);
    this._supportActor = this.isSupportActor();
  };

  Game_Actor.prototype.setAddSupportActor = function(args) {
    const flag = eval(args.SupportActorsSwitch);
    this.setSupportActor(flag);
    this.setSupportActorTurn(Number(args.SupportActorTurn));
  };

  Game_Actor.prototype.setSupportActor = function(flag) {
    this._supportActor = flag;
  };

  Game_Actor.prototype.getSupportActor = function() {
    if (!this._supportActor) {
      this._supportActor = this.isSupportActor();
    }
    return this._supportActor;
  };

  Game_Actor.prototype.isSupportActor = function() {
    return !!this.actor().meta.SupportActor;
  };

  Game_Actor.prototype.noResultSupportActor = function() {
    return this.actor().meta.NoResultSupportActor;
  };

  Game_Actor.prototype.supportActorindex = function() {
    return $gameParty.supportBattleMembers().indexOf(this);
  };

  const _Game_Actor_isBattleMember = Game_Actor.prototype.isBattleMember;
  Game_Actor.prototype.isBattleMember = function() {
    const result = _Game_Actor_isBattleMember.call(this);
    if (result) {
      return result;
    }
    return $gameParty.supportBattleMembers().includes(this);
  };

  Game_Actor.prototype.updateSupportActorTurn = function() {
    if (this._supportActorTurn > 0) {
        this._supportActorTurn--;
    }
  };

  Game_Actor.prototype.setSupportActorTurn = function(turn) {
    this._supportActorTurn = turn;
  };

  Game_Actor.prototype.getSupportActorTurn = function() {
    return this._supportActorTurn;
  };

  Game_Actor.prototype.setSupportActorCallActor = function(actorId) {
    this._supportActorCallActor = actorId;
  };

  Game_Actor.prototype.getSupportActorCallActor = function() {
    return this._supportActorCallActor;
  };

  Game_Actor.prototype.setSupportActorDeahCall = function(flag) {
    this._supportActorDeadCallActor = !!flag;
  };

  Game_Actor.prototype.getSupportActorDeahCall = function() {
    return this._supportActorDeadCallActor;
  };

  Game_Actor.prototype.updateRemoveSupportActor = function() {
    if (this._supportActorTurn === 0) {
      this.removeSupportActor();
    }
  };

  Game_Actor.prototype.supportActorDeathCallActor = function() {
    if (this._supportActorDeadCallActor) {
      if (this._supportActorCallActor > 0 && $gameActors.actor(this.getSupportActorCallActor()).isDead()) {
        this.removeSupportActor();
      }
    }
  };

  const _Game_Actor_onTurnEnd = Game_Actor.prototype.onTurnEnd;
  Game_Actor.prototype.onTurnEnd = function() {
    _Game_Actor_onTurnEnd.call(this);
    this.updateSupportActorTurn();
    this.updateRemoveSupportActor();
  };

  const _Game_Actor_onBattleEnd = Game_Actor.prototype.onBattleEnd;
  Game_Actor.prototype.onBattleEnd = function() {
    _Game_Actor_onBattleEnd.call(this);
    const turn = this.getSupportActorTurn();
    if (turn === -2 || turn >= 0) {
      this.removeSupportActor();
    }
  };

  Game_Actor.prototype.removeSupportActor = function() {
    $gameParty.removeActor(this.actorId());
    this._supportActorCallActor = 0;
    this._supportActorDeadCallActor =false;
    if (!this.getSupportActor()) {
      this._supportActor = false;
    }
  };

  const _BattleManager_allBattleMembers = BattleManager.allBattleMembers;
  BattleManager.allBattleMembers = function() {
    return _BattleManager_allBattleMembers.call(this).concat($gameParty.supportBattleMembers())
  };

  const _BattleManager_displayBattlerStatus = BattleManager.displayBattlerStatus;
  BattleManager.displayBattlerStatus = function(battler, current) {
    _BattleManager_displayBattlerStatus.call(this, battler, current);
    if (battler.isActor()) {
      battler.supportActorDeathCallActor();
    }
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
    $gameParty.membersMode = true;
    _BattleManager_changeCurrentActor.call(this, forward);
  };

  const _Game_Party_initialize = Game_Party.prototype.initialize;
  Game_Party.prototype.initialize = function() {
    _Game_Party_initialize.call(this);
  };

  const _Game_Party_battleMembers = Game_Party.prototype.battleMembers;
  Game_Party.prototype.battleMembers = function() {
    let members = _Game_Party_battleMembers.call(this).concat(this.addBattleMembers());
    if (!SupportActorMode && this.membersMode) {
      this.membersMode = false;
      let i = 0;
      return members.filter(member => {
        if (!member.getSupportActor() && i < this.maxBattleMembers()) {
          i++;
          return true;
        } else if (member.getSupportActor()) {
          return true;
        }
      });
    }
    this.membersMode = false;
    const members2 = this.MainBattleMembers(members).slice(0,this.maxBattleMembers());
    return SupportActorMode ? members2.concat(this.allSupportBattleMembers(members)) : members2;
  };

  Game_Party.prototype.addBattleMembers = function() {
    return this.allMembers().slice(this.maxBattleMembers());
  };

  Game_Party.prototype.addSupportMembers = function() {
    return this.allMembers().slice(this.maxBattleMembers()).filter(actor => actor.isAppeared() && actor.getSupportActor());
  };

  Game_Party.prototype.MainBattleMembers = function(members) {
    return members.filter(actor => !actor.getSupportActor());
  };

  Game_Party.prototype.allSupportBattleMembers = function(member) {
    return member.filter(actor => actor.isAppeared() && actor.getSupportActor());
  };

  Game_Party.prototype.supportBattleMembers = function() {
    return this.allMembers().filter(actor => actor.isAppeared() && actor.getSupportActor());
  };

  Game_Party.prototype.supportMainBattleMembers = function() {
    let index = 0;
    this.membersMode = true;
    const maxMembers = this.battleMembers().length;
    return this.allMembers().slice(0, maxMembers).filter(actor => {
      if (actor.isAppeared() && !actor.getSupportActor()) {
      index++;
      }
      if (actor.isAppeared() && actor.getSupportActor() && this.maxBattleMembers() > index) {
        return true;
      }
    },); 
  };

  Game_Party.prototype.setSupportBattleMembersNum = function() {
    this._supportBattleMembersNum = this.supportMainBattleMembers().length;
  };

  Game_Party.prototype.getSupportBattleMembersNum = function() {
    return this._supportBattleMembersNum;
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

  Game_Party.prototype.resultSupportMembers = function(reserve, support) {
    if (support) {
      this.membersMode = true;
    }
    if (reserve) {
      return this.resultMembers();
    } else {
      return this.battleMembers();
    }
  };

  const _Game_Player_refresh = Game_Player.prototype.refresh;
  Game_Player.prototype.refresh = function() {
    $gameParty.setSupportBattleMembersNum();
    _Game_Player_refresh.call(this);
  };


  const _Game_Follower_actor = Game_Follower.prototype.actor;
  Game_Follower.prototype.actor = function() {
    $gameParty.membersMode = true;
    return _Game_Follower_actor.call(this);
  };

  const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
  Scene_Battle.prototype.createAllWindows = function() {
    _Scene_Battle_createAllWindows.call(this);
    this.createSupportActorWindow();
  };

  Scene_Battle.prototype.createSupportActorWindow = function() {

  };

  const _Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
  Scene_Battle.prototype.startActorCommandSelection = function() {
    _Scene_Battle_startActorCommandSelection.call(this);
    const supportActor = $gameParty.supportBattleMembers().find(actor => actor.actorId() === BattleManager.actor().actorId());
    if (supportActor && this._supportActorWindow) {
      this._supportActorWindow.setActor(supportActor);
      this._supportActorWindow.show();
      this._supportActorWindow.open();
    }
  };

  const _Scene_Battle_hideSubInputWindows = Scene_Battle.prototype.hideSubInputWindows;
  Scene_Battle.prototype.hideSubInputWindows = function() {
    _Scene_Battle_hideSubInputWindows.call(this);
    if (this._supportActorWindow) {
      this._supportActorWindow.close();
    }
  };


  function Window_SupportActor() {
    this.initialize(...arguments);
  }

  Window_SupportActor.prototype = Object.create(Window_Selectable.prototype);
  Window_SupportActor.prototype.constructor = Window_SupportActor;

  Window_SupportActor.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.openness = 0;
    this._actor = null;
  };

  Window_SupportActor.prototype.setActor = function(actor) {
    this._actor = actor;
  };

  Window_SupportActor.prototype.colSpacing = function() {
    return 0;
  };

  Window_SupportActor.prototype.refresh = function() {
    const rect = this.itemLineRect(0);
    this.contents.clear();
    this.drawName(rect.x, rect.y, rect.width);
    this.drawFace(rect.x, rect.y, rect.width);
  };

  Window_SupportActor.prototype.drawName = function(x, y, width) {
    this.drawText(this._actor.name(), x, y, width);
  };

  Window_SupportActor.prototype.drawFace = function() {

  };

  Window_SupportActor.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
  };


  const _Spriteset_Battle_createActors = Spriteset_Battle.prototype.createActors;
  Spriteset_Battle.prototype.createActors = function() {
    _Spriteset_Battle_createActors.call(this);
    const SupportActorSVLength = SupportActorSV.length;
    if (SupportActorSV.length > 0 && $gameSystem.isSideView()){
      this._supportActorSprites = [];
      for (let i = 0; i < SupportActorSVLength; i++) {
        const sprite = new Sprite_Actor();
        this._supportActorSprites.push(sprite);
        this._battleField.addChild(sprite);
      }
    }
  };

  const _Spriteset_Battle_updateActors = Spriteset_Battle.prototype.updateActors;
  Spriteset_Battle.prototype.updateActors = function() {
    _Spriteset_Battle_updateActors.call(this);
    const members = $gameParty.supportBattleMembers();
    for (let i = 0; i < this._supportActorSprites.length; i++) {
      this._supportActorSprites[i].setBattler(members[i]);
    }
  };

  const _Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome;
  Sprite_Actor.prototype.setActorHome = function(index) {
    sIndex = -1;
    if (this._actor.getSupportActor()) {
      index = this._actor.supportActorindex();
      if (!SupportActorSV[index]) {
        return;
      }
      sIndex = index;
    }
    _Sprite_Actor_setActorHome.call(this, index);
  };

  const _Sprite_Actor_setHome = Sprite_Actor.prototype.setHome;
  Sprite_Actor.prototype.setHome = function(x, y) {
    if (this._actor.getSupportActor()) {
      x += SupportActorSV[sIndex].SupportActorSV_X;
      y += SupportActorSV[sIndex].SupportActorSV_Y;
    }
    _Sprite_Actor_setHome.call(this, x, y);
  };

})();
