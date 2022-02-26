/*:-----------------------------------------------------------------------------------
 * NUUN_PartyCommandCustomize.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
 /*:
 * @target MZ
 * @plugindesc パーティコマンドカスタマイズ
 * @author NUUN
 * @version 1.0.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * パーティコマンドをカスタマイズします。
 * 
 * このプラグインを配置する場所により動作が異なります。
 * 下のほうに配置することにより全てのコマンドの表示順を設定できます。他プラグインによるコマンド追加を行う場合は「Commandkey」
 * に該当する文字列を記入してください。
 * 他プラグインのコマンド追加をこのプラグインで設定せずに追加する場合は、それらのプラグインの上に配置してください。
 * 
 * 仕様
 * パーティコマンドリストの項目が１以下の時はパーティコマンドが省略されます。
 * 
 * 更新履歴
 * 2022/2/26 Ver.1.0.0
 * 初版
 * 
 * @param PartyCommandList
 * @text パーティコマンドリスト
 * @desc パーティコマンドの設定。
 * @default 
 * @type struct<CommandList>[]
 * 
 */
/*~struct~CommandList:
 * @param CommandName
 * @text コマンド名
 * @desc コマンド名を設定します。
 * @type string
 * 
 * @param Commandkey
 * @text 表示コマンドキー
 * @desc 適用、除外するクラスを指定します。無指定の場合は全てのコマンドで反映されます。
 * @type combo[]
 * @option 'fight'
 * @option 'escape'
 * @option 'formation'
 * @default
 * 
 * @param CommandEval
 * @type string
 * @default 
 * @text 
 * @desc 
 * 
 */

var Imported = Imported || {};
Imported.NUUN_PartyCommandCustomize = true;

(() => {
const parameters = PluginManager.parameters('NUUN_PartyCommandCustomize');
const PartyCommandList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PartyCommandList'])) : null) || [];

const _Window_PartyCommand_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
Window_PartyCommand.prototype.makeCommandList = function() {
  if (PartyCommandList) {
    for (const data of PartyCommandList) {
      const key = data.Commandkey[0];
      let text = data.CommandName;
      if (key === "fight") {
        text = !text ? TextManager.fight : text;
      }
      if (key === "escape") {
        text = !text ? TextManager.escape : text;
        this.addCommand(text, key, data.CommandEval ? eval(data.CommandEval) : BattleManager.canEscape());
      } else {
        this.addCommand(text, key, eval(data.CommandEval));
      }
    }
  } else {//配列がなければ通常の処理
    _Window_PartyCommand_makeCommandList.call(this);
  }
};

const _Scene_Battle_selectPreviousCommand = Scene_Battle.prototype.selectPreviousCommand;
Scene_Battle.prototype.selectPreviousCommand = function() {
  _Scene_Battle_selectPreviousCommand.call(this);
  if (!BattleManager.needsPartyCommand() && !BattleManager.actor()) {
    this.selectNextCommand();
  }
};

const _Scene_Battle_changeInputWindow = Scene_Battle.prototype.changeInputWindow;
Scene_Battle.prototype.changeInputWindow = function() {
  _Scene_Battle_changeInputWindow.call(this);
  if (BattleManager.isInputting()) {
    if (!BattleManager.isTpb() && !BattleManager.needsPartyCommand() && !BattleManager.actor()) {
      this.selectNextCommand();
    }
  }
};

const _BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
  _BattleManager_initMembers.call(this);
  this.initNeedsPartyCommand();
};

BattleManager.initNeedsPartyCommand = function() {
  this._tpbNeedsPartyCommand = this.needsPartyCommand() ? this._tpbNeedsPartyCommand : false;
};

BattleManager.needsPartyCommand = function() {
  return PartyCommandList && PartyCommandList.length > 1;
};

})();