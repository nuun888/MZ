/*:-----------------------------------------------------------------------------------
 * NUUN_ConsumptionItem.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */
/*:
 * @target MZ
 * @plugindesc  アイテム消耗率
 * @author NUUN
 * @version 1.1.0
 * 
 * @help
 * アイテムに一定の確率で消費するアイテムを作ることが出来ます。
 * 
 * アイテムのメモ欄に<ConsumptionRate:[rate]>を記入します。
 * [rate]:確率
 * <ConsumptionRate:50> アイテム使用時に50%の確率で消費します。
 * 
 * <ConsumptionMessage:[Text]> 戦闘時のアイテム消耗時に表示するメッセージ（ログ）を表示します。
 * [Text]:表示メッセージ（ログ）
 * %1：使用者名
 * %2：アイテム名
 * 
 * <ConsumptionSE:[name],[volume],[pitch],[pan]>アイテム消耗時に再生するSEを指定します。
 * <ConsumptionSE:Break, 90, 100, 50>アイテム消耗時に「Break」が再生されます。
 * [name]:ファイル名（拡張子なし）
 * [volume]:音量
 * [pitch]:ピッチ
 * [pan]:位相
 * 
 * 更新履歴
 * 2021/11/3 Ver.1.1.0
 * メッセージのフォーマットを変更。
 * 2020/12/31 Ver.1.0.0
 * 初版
 * 
 */
var Imported = Imported || {};
Imported.NUUN_ConsumptionItem = true;

(() => {
const parameters = PluginManager.parameters('NUUN_ConsumptionItem');
const ConsumptionNoLog = eval(parameters['ConsumptionNoLog'] || 'false');

const _Game_Party_consumeItem = Game_Party.prototype.consumeItem;
Game_Party.prototype.consumeItem = function(item) {
  if (DataManager.isItem(item) && item.consumable && this.consumeRate(item)) {
    _Game_Party_consumeItem.call(this, item);
  }
};

Game_Party.prototype.consumeRate = function(item) {
  const rate = Math.min(item.meta.ConsumptionRate ? item.meta.ConsumptionRate : 100, 100);
  const reslit = Math.floor(Math.random() * 100 < rate);
  if (reslit) {
    this.consumptionMessage(item);
    this.consumptionSe(item);
  }
  return reslit;
};

Game_Party.prototype.consumptionMessage = function(item) {
  if (item.meta.ConsumptionMessage) {
    if (this.inBattle()) {
      BattleManager._ConsumptionMessage = true;
    }
  }
};

Game_Party.prototype.consumptionSe = function(item) {
  if (item.meta.ConsumptionSE) {
    const date = item.meta.ConsumptionSE.split(',');
    AudioManager.playSe({"name":date[0],"volume":date[1],"pitch":date[2],"pan":date[3]});
  }
};

const _BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
  _BattleManager_initMembers.call(this);
  BattleManager._ConsumptionMessage = false;
};

const _Window_BattleLog_displayItemMessage = Window_BattleLog.prototype.displayItemMessage;
Window_BattleLog.prototype.displayItemMessage = function(fmt, subject, item) {
  _Window_BattleLog_displayItemMessage.call(this, fmt, subject, item)
  if (BattleManager._ConsumptionMessage) {
    this.push("pushBaseLine");
    this.displayConsumption(subject, item);
    BattleManager._ConsumptionMessage = false;
  }
};

Window_BattleLog.prototype.displayConsumption = function(subject, item) {
  this.push("addText", item.meta.ConsumptionMessage.format(subject.name(), item.name));
};
})();