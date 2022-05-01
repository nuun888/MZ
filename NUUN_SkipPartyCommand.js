/*:-----------------------------------------------------------------------------------
 * NUUN_SkipPartyCommand.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc スキップパーティコマンド
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * ターン開始後とに表示されるパーティコマンドをスキップします。TPBバトルの場合は戦闘開始後に表示されるパーティコマンドをスキップします。
 * アクターコマンドからキャンセルを押した場合は通常通りパーティコマンドが表示されます。
 * 
 * ※パーティコマンドを完全に表示させたくない場合はパーティコマンド表示順任意プラグイン(NUUN_PartyCommandCustomiz)をご仕様ください。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/5/2 Ver.1.0.0
 * 初版
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_SkipPartyCommand = true;

(() => {
const parameters = PluginManager.parameters('NUUN_SkipPartyCommand');

const _Scene_Battle_updateInputWindowVisibility = Scene_Battle.prototype.updateInputWindowVisibility
Scene_Battle.prototype.updateInputWindowVisibility = function() {
  if (!$gameMessage.isBusy() && this.needsInputWindowChange()) {
    this.startInput = true;
  }
  _Scene_Battle_updateInputWindowVisibility.call(this);
};

const _Scene_Battle_changeInputWindow = Scene_Battle.prototype.changeInputWindow;
Scene_Battle.prototype.changeInputWindow = function() {
  _Scene_Battle_changeInputWindow.call(this);
  if (BattleManager.isInputting()) {
    if (this.startInput && !BattleManager.actor()) {
      this.selectNextCommand();
      this.startInput = false;
    }
  }
};

})();