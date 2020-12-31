/*:-----------------------------------------------------------------------------------
 * NUUN_EventUseItem.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 更新履歴
 * 2020/12/31 Ver.1.0.0
 * 初版
 */
/*:
 * @target MZ
 * @plugindesc  イベントでアイテム消費時消耗率、使用回数反映
 * @author NUUN
 * @orderAfter NUUN_ConsumptionItem
 * 
 * @help
 * イベントコマンドのアイテムの増減では消耗率、使用回数などの効果が反映されません。
 * このプラグインはアイテムを消費する時、消耗率、使用回数を考慮し消費させます。
 * なお、消耗率、使用回数を反映させる場合はイベントコマンドの「アイテムの増減」ではなく
 * プラグインコマンドの「アイテム消費」を使用します。「アイテムの増減」では反映されません。
 * 
 * 
 * プラグインコマンド
 * ConsumeItems　アイテム消費
 * アイテムを１つ消費します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * @command ConsumeItems
 * @text アイテム消費
 * @desc アイテムを消費させます。
 * 
 * @arg consumeItem
 * @type item
 * @default 0
 * @text アイテム
 * @desc 消費させるアイテムを指定します。
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_EventUseItem = true;
let ConsumptionMessage = false;

(() => {
const parameters = PluginManager.parameters('NUUN_EventUseItem');
const pluginName = "NUUN_EventUseItem";
PluginManager.registerCommand(pluginName, "ConsumeItems", args => {
  $gameParty.eventConsumeItem(Number(args.consumeItem));
});

Game_Party.prototype.eventConsumeItem = function(args) {
  const item = $dataItems[args];
  ConsumptionMessage = true;
  if (this.numItems(item) > 0) {
    this.consumeItem(item);
  }
  ConsumptionMessage = false;
};

if (Imported.NUUN_ConsumptionItem) {
  const _Game_Party_consumptionMessage = Game_Party.prototype.consumptionMessage;
  Game_Party.prototype.consumptionMessage = function(item) {
    _Game_Party_consumptionMessage.call(this, item);
    if (item.meta.ConsumptionMessage) {
      if (!this.inBattle() && ConsumptionMessage) {
        $gameMessage.add(item.meta.ConsumptionMessage);
      }
    }
  };
}
})();