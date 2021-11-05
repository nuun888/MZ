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
 * @version 1.1.1
 * 
 * @help
 * アイテムに一定の確率で消費するアイテムを作ることが出来ます。
 * 消耗率を軽減できる特徴を設定できます。
 * なお、マップ上ではパーティメンバーの中で一番軽減率の高い数値で判定します。
 * 戦闘中では使用者の軽減率で判定します。
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
 * 
 * 特徴を持つメモ欄
 * <ConsumptionRatio:[ratio]> 消耗する確率を軽減します。
 * [ratio]：補正消耗率
 * <ConsumptionRatio:70> 消耗率が70%されます。消耗率50%のアイテムは35%の確率で消耗します。
 * このタグが有効なアイテムはConsumptionRateのタグが設定されたアイテムのみ適用されます。
 * 
 * <NoConsumptionRatio>
 * このアイテムには消耗率の軽減が適用されません。
 * 
 * 更新履歴
 * 2021/11/6 Ver.1.1.1
 * 消耗時のデフォルトのSEを設定出来る項目を追加。
 * 消耗率を軽減出来る特徴を設定できる機能を追加。
 * 2021/11/3 Ver.1.1.0
 * メッセージのフォーマットを変更。
 * 2020/12/31 Ver.1.0.0
 * 初版
 * 
 * @param ConsumptionItemSE
 * @text 消耗時SE
 * @desc 消耗率が設定してあるアイテムが消耗したときのSE
 * @type file
 * @dir audio/se/
 * 
 * @param volume
 * @text 音量
 * @desc 音量。
 * @type number
 * @default 90
 * 
 * @param pitch
 * @text ピッチ
 * @desc ピッチ。
 * @type number
 * @default 100
 * 
 * @param pan
 * @text 位相
 * @desc 位相。
 * @type number
 * @default 50
 * 
 */
var Imported = Imported || {};
Imported.NUUN_ConsumptionItem = true;

(() => {
const parameters = PluginManager.parameters('NUUN_ConsumptionItem');
const ConsumptionNoLog = eval(parameters['ConsumptionNoLog'] || 'false');
const ConsumptionItemSE = String(parameters['ConsumptionItemSE'] || '');
const volume = Number(parameters['volume'] || 90);
const pitch = Number(parameters['pitch'] || 100);
const pan = Number(parameters['pan'] || 50);
let useActor = null;

const _Game_Battler_consumeItem = Game_Battler.prototype.consumeItem;
Game_Battler.prototype.consumeItem = function(item) {
  useActor = this;
  _Game_Battler_consumeItem.call(this, item);
};

const _Game_Party_consumeItem = Game_Party.prototype.consumeItem;
Game_Party.prototype.consumeItem = function(item) {
  if (DataManager.isItem(item) && item.consumable && this.consumeRate(item)) {
    _Game_Party_consumeItem.call(this, item);
  }
};

Game_Party.prototype.consumeRate = function(item) {
  if (item.meta.ConsumptionRate) {
    const rate = Math.min(item.meta.ConsumptionRate ? item.meta.ConsumptionRate : 100, 100);
    const reslit = Math.floor(Math.random() * 100 < (item.meta.NoConsumptionRatio ? rate : this.consumptionItemRatio(rate)));
    if (reslit) {
      this.consumptionMessage(item);
      this.consumptionSe(item);
    }
    return reslit;
  } else {
    return true;
  }
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
  } else if (ConsumptionItemSE) {
    AudioManager.playSe({"name":ConsumptionItemSE,"volume":volume,"pitch":pitch,"pan":pan});
  }
};

Game_Party.prototype.consumptionItemRatio = function(rate) {
  return rate * (this.inBattle() ? this.consumptionRatioInBattle() : this.consumptionRatioMembers());
};

Game_Party.prototype.consumptionRatioInBattle = function() {
  const actor = useActor;
  useActor = null;
  return this.consumptionRatio(actor);
};

Game_Party.prototype.consumptionRatioMembers = function(item) {
  return this.battleMembers().reduce((r, member) => {
    const rate = this.consumptionRatio(member);
    if (r > rate) {
      r = rate;
    }
    return r;
  }, 1.0);
};

Game_Party.prototype.consumptionRatio = function(member) {
  return member.traitObjects().reduce((r, obj) => {
    if (obj.meta.ConsumptionRatio) {
      return r * obj.meta.ConsumptionRatio / 100;
    } else {
      return r;
    }
  }, 1.0);
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