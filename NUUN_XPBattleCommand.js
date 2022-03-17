/*:-----------------------------------------------------------------------------------
 * NUUN_XPBattleCommand.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc XP風パーティ、アクターコマンド
 * @author NUUN
 * @version 1.0.3
 * @base NUUN_Base
 * 
 * @help
 * パーティコマンド、アクターコマンドをXP風に表示します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/3/17 Ver.1.0.3
 * アクター加入、離脱時の処理を修正。
 * 2021/11/15 Ver.1.0.2
 * パーティコマンドの項目が最大列数を超えてた時にコマンドがずれる問題を修正。
 * 2021/11/14 Ver.1.0.1
 * パーティコマンド中央寄りがアクターコマンド中央寄りになっていたのを修正。
 * 2021/11/7 Ver.1.0.0
 * 初版
 * 
 * @param PartyCommandSetting
 * @text パーティコマンド設定
 * @default ------------------------------
 * 
 * @param PartyCommandMode
 * @desc パーティコマンドの項目を中央寄りに表示させます。
 * @text パーティコマンド中央寄り
 * @type boolean
 * @default true
 * @parent PartyCommandSetting
 * 
 * @param MaxPartyCommandCols
 * @desc 表示する最大パーティコマンド列数。
 * @text 最大パーティコマンド列数
 * @type number
 * @default 4
 * @min 1
 * @parent PartyCommandSetting
 * 
 * @param PartyCommandPosition
 * @text パーティコマンド表示位置
 * @desc パーティコマンドの表示位置を選択します。
 * @type select
 * @option 上
 * @value 'top'
 * @option 中央
 * @value 'center'
 * @option アクターステータスの上
 * @value 'statusTop'
 * @default 'top'
 * @parent PartyCommandSetting
 * 
 * @param ActorCommandSetting
 * @text アクターコマンド設定
 * @default ------------------------------
 * 
 * @param ActorsCommandVariable
 * @desc アクターコマンドを可変表示にします。
 * @text アクターコマンド可変表示
 * @type boolean
 * @default true
 * @parent ActorCommandSetting
 * 
 * @param MaxActorCommandRows
 * @desc 表示する最大アクターコマンド行数。
 * @text 最大アクターコマンド行数
 * @type number
 * @default 10
 * @min 1
 * @parent ActorCommandSetting
 * 
 */
var Imported = Imported || {};
Imported.NUUN_XPBattleCommand = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_XPBattleCommand');
  const PartyCommandMode = eval(parameters['PartyCommandMode'] || 'true');
  const MaxPartyCommandCols = Number(parameters['MaxPartyCommandCols'] || 4);
  const PartyCommandPosition = eval(parameters['PartyCommandPosition'] || 'top');
  const ActorsCommandVariable = eval(parameters['ActorsCommandVariable'] || 'true');
  const MaxActorCommandRows = Number(parameters['MaxActorCommandRows'] || 10);


  const _Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
  Scene_Battle.prototype.createPartyCommandWindow = function() {
    _Scene_Battle_createPartyCommandWindow.call(this);
    this._partyCommandWindow.y = this.partyCommandY();
  };

  const _Scene_Battle_partyCommandWindowRect = Scene_Battle.prototype.partyCommandWindowRect;
  Scene_Battle.prototype.partyCommandWindowRect = function() {
    const rect = _Scene_Battle_partyCommandWindowRect.call(this);
    rect.width = Graphics.boxWidth;
    rect.height = this.calcWindowHeight(1, true);
    rect.x = 0;
    rect.y = 0;
    return rect;
  };

  Scene_Battle.prototype.partyCommandY = function() {
    if (PartyCommandPosition === 'top') {
      return 0;
    } else if (PartyCommandPosition === 'center') {
      return Math.floor((Graphics.boxHeight - this._statusWindow.height + 6) / 2 - this._partyCommandWindow.height / 2);
    } else  if (PartyCommandPosition === 'statusTop') {
      return Graphics.boxHeight - this._statusWindow.height + 6 - this._partyCommandWindow.height;
    } else {
      return 0;
    }
  };

  const _Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
  Scene_Battle.prototype.createActorCommandWindow = function() {
    _Scene_Battle_createActorCommandWindow.call(this);
    this._actorCommandWindow.home_y = Graphics.boxHeight - this._statusWindow.height + 6;
    this._actorCommandWindow.setStatusWindow(this._statusWindow);
  };

  const _Scene_Battle_actorCommandWindowRect = Scene_Battle.prototype.actorCommandWindowRect;
  Scene_Battle.prototype.actorCommandWindowRect = function() {
    const rect = _Scene_Battle_actorCommandWindowRect.call(this);
    rect.x = 0;
    rect.y = 0;
    rect.height = this.calcWindowHeight(MaxActorCommandRows, true);
    return rect;
  };

  Scene_Battle.prototype.statusWindowX = function() {
    const rect = this.statusWindowRect();
    return (Graphics.boxWidth - rect.width) / 2 + rect.x;
  };

  const _Scene_Battle_update = Scene_Battle.prototype.update;
  Scene_Battle.prototype.update = function() {
    if ($gameTemp.commandRefresh && !$gameTemp.isBattleRefreshRequested() && this._actorCommandWindow.actor()) {
      $gameTemp.commandRefresh = false;
      const index = $gameParty.battleMembers().indexOf(this._actorCommandWindow.actor());
      if (index >= 0) {
        this._statusWindow.select(index);
      } else {
        this.commandCancel();
      }
      this._actorCommandWindow.refresh();
    }
    _Scene_Battle_update.call(this);
  };
  
  
  Window_PartyCommand.prototype.maxCols = function() {
    return PartyCommandMode ? MaxPartyCommandCols : Math.min((this._list ? this.maxItems() : MaxPartyCommandCols), MaxPartyCommandCols);
  };

  const _Window_PartyCommand_itemRect = Window_PartyCommand.prototype.itemRect;
  Window_PartyCommand.prototype.itemRect = function(index) {
    const rect = _Window_PartyCommand_itemRect.call(this, index);
    if (PartyCommandMode) {
      rect.x += this.itemWidth() / 2 * (this.maxCols() - Math.min(this.maxItems(), this.maxCols()));
    }
    return rect;
  };

  const _Window_PartyCommand_refresh = Window_PartyCommand.prototype.refresh;
  Window_PartyCommand.prototype.refresh = function() {
    _Window_PartyCommand_refresh.call(this);
  };


  Window_ActorCommand.prototype.maxCols = function() {
    return 1;
  };

  Window_ActorCommand.prototype.setCommandHeight = function() {
    const cols = this.maxItems();
    this.height = this.fittingHeight(cols);
  };

  Window_ActorCommand.prototype.getSelectActor = function() {
    return $gameParty.battleMembers()[this.selectActor(this._actor)];
  };

  Window_ActorCommand.prototype.selectActor = function(actor) {
    const members = $gameParty.battleMembers();
    return members.indexOf(actor);
  };

  const _Window_ActorCommand_paint = Window_ActorCommand.prototype.paint;
  Window_ActorCommand.prototype.paint = function() {
    if (ActorsCommandVariable) {
      this.setCommandHeight();
    }
    _Window_ActorCommand_paint.call(this);
  };
  
  const _Window_ActorCommand_refresh = Window_ActorCommand.prototype.refresh;
  Window_ActorCommand.prototype.refresh = function() {
    _Window_ActorCommand_refresh.call(this);
    const actorIndex = this.selectActor(this._actor);
    if (this._statusWindow && this._actor || actorIndex >= 0) {
      const rect = this._statusWindow.itemRect(actorIndex);
      this.x = rect.x + (Graphics.boxWidth - this._statusWindow.width) / 2 + (rect.width - this.width) / 2 + this.itemPadding();
      this.y = this.home_y - this.height + rect.y;
    }
  };

  Window_ActorCommand.prototype.setStatusWindow = function(statusWindow) {
    this._statusWindow = statusWindow;
  };

  const _Window_BattleStatus_performPartyRefresh = Window_BattleStatus.prototype.performPartyRefresh;
  Window_BattleStatus.prototype.performPartyRefresh = function() {
    this.commandRefresh();
    _Window_BattleStatus_performPartyRefresh.call(this);
  };

  Window_BattleStatus.prototype.commandRefresh = function() {
    $gameTemp.commandRefresh = true;
  };

})();