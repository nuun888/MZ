/*:-----------------------------------------------------------------------------------
 * NUUN_RandomItems.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 更新履歴
 * 2020/11 Ver 1.0.0
 */ 
/*:
 * @target MZ
 * @plugindesc アイテムのランダム入手
 * @author NUUN
 * 
 * @help
 * アイテムをランダムで入手します。
 * ランダムアイテムの設定はプラグインコマンドから設定します。
 * ランダムに取得できる対象は、アイテム、武器、防具、お金、コモンイベントが設定できます。
 * コモンイベントを設定した場合は、取得時に指定のコモンイベントが呼び出されます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 
 * @command ItemList
 * @desc ランダムアイテム
 * @arg list
 * @text ランダムに取得するアイテムを指定します。
 * @type struct<randomList>[]
 * 
 * @param GetItemNameVal
 * @desc 取得アイテム名変数
 * @text 取得アイテム名を代入する変数。
 * @type variable
 * @default 0
 * 
 */ 
/*~struct~randomList:
 * @param itemType
 * @text 取得できるアイテムのID。
 * @desc 取得アイテムのID
 * @type select
 * @option アイテム
 * @value 0
 * @option 武器
 * @value 1
 * @option 防具
 * @value 2
 * @option 金額
 * @value 3
 * @option コモンイベント
 * @value 10
 * @default 0
 * 
 * @param ItemId
 * @text 取得できるアイテム。
 * @desc 取得アイテム
 * @type item
 * 
 * @param WeaponId
 * @text 取得できる武器。
 * @desc 取得武器
 * @type weapon
 * 
 * @param ArmorId
 * @text 取得できる防具。
 * @desc 取得防具
 * @type armor
 * 
 * @param GainMoney
 * @text 取得できるお金。
 * @desc 取得金額
 * @type number
 * @min -9999999999999
 * 
 * @param Common
 * @text コモンイベントを開きます。
 * @desc コモンイベント
 * @type common_event
 * 
 * @param weight
 * @text 重み。
 * @desc 重み
 * @type number
 * @default 1
 */

(() => {
  const parameters = PluginManager.parameters('NUUN_RandomItems');
  const GetItemNameVal = Number(parameters['GetItemNameVal'] || 0);
  
  const pluginName = "NUUN_RandomItems";
  PluginManager.registerCommand(pluginName, 'ItemList', args => {
    $gameParty.randomItems(args);
  });

  Game_Party.prototype.randomItems = function(args) {
    const list = JSON.parse( JSON.stringify(args ,
      ( key, value ) => {
          try { return JSON.parse( value ); } catch( e ) {}
          return value;
      }
    )).list;
    if(!list) {
      return this;
    }
    const itemData = this.randomItemList(list);
    const interpreter = new Game_Interpreter();
    if(itemData.itemType === "common") {
      $gameTemp.reserveCommonEvent(itemData.deta);
      return this;
    } else if(itemData.itemType === "money") {
      interpreter.command125([0, 0, itemData.deta]);
    } else if(itemData.itemType === "item"){
      interpreter.command126([itemData.deta.id, 0, 0, 1]);
    } else if(itemData.itemType === "weapon"){
      interpreter.command127([itemData.deta.id, 0, 0, 1]);
    } else {
      interpreter.command128([itemData.deta.id, 0, 0, 1]);
    }
    if(GetItemNameVal > 0){
      $gameVariables.setValue(GetItemNameVal) = itemDeta.name;
    }
  };

  Game_Party.prototype.randomItemList = function(list) {
    let weightSum = 0;
    let probability = 0.0;
    let getItem = null;
    list.forEach(item => {
      weightSum += item.weight;
    });
    const value = Math.random() * weightSum;
    let i = 0;
		while(list.length > i){
      probability += list[i].weight / weightSum * weightSum;
      if (probability > value){
        if(list[i].itemType === 0){
          getItem = {itemType: "item", deta: $dataItems[list[i].ItemId] };
          break;
        } else if(list[i].itemType === 1){
          getItem = {itemType: "weapon", deta: $dataWeapons[list[i].WeaponId]};
          break;
        } else if (list[i].itemType === 2){
          getItem = {itemType: "armor", deta: $dataArmors[list[i].ArmorId]};
          break;
        } else if (list[i].itemType === 3){
          getItem = {itemType: "money", deta: list[i].GainMoney };
          break;
        } else if (list[i].itemType === 10){
          getItem = {itemType: "common", deta: list[i].Common }
          break;
        }
      }
			i++;
		}
    return getItem;
  }
})();
