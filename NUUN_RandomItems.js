/*:-----------------------------------------------------------------------------------
 * NUUN_RandomItems.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 更新履歴
 * 2020/11/22 Ver 1.0.0
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
 * TinyGetInfoWndMZプラグインをご使用の際は、イベントコマンド用スイッチIDをONにしてください。
 * 
 * プラグインパラメータでアイテムを取得やメッセージを表示するプラグインをご使用の場合は、
 * 取得リストID変数を設定して分岐条件などで各種設定をしてください。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 
 * @command ItemList
 * @desc ランダムに取得するアイテムを指定します。
 * @arg list
 * @text ランダムアイテム
 * @type struct<randomList>[]
 * 
 * @param GetTextMessage
 * @text 取得時のデフォルトメッセージ
 * @desc 取得時のデフォルトメッセージ。
 * @type string
 * @default を手に入れた！
 * 
 * @param GetItemMessage
 * @desc 取得時にメッセージウィンドウを表示する。
 * @text メッセージウィンドウ表示
 * @type boolean
 * @default true
 * 
 * @param CommonListIdVar
 * @desc 取得時のリストIDを格納する変数。
 * @text 取得リストID変数
 * @type variable
 * @min 0
 * 
 */ 
/*~struct~randomList:
 * @param itemType
 * @text 取得アイテムのID
 * @desc 取得できるアイテムのID。
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
 * @text 取得アイテム
 * @desc 取得できるアイテム。
 * @type item
 * 
 * @param WeaponId
 * @text 取得武器
 * @desc 取得できる武器。
 * @type weapon
 * 
 * @param ArmorId
 * @text 取得防具
 * @desc 取得できる防具。
 * @type armor
 * 
 * @param GainMoney
 * @text 取得金額
 * @desc 取得できるお金。
 * @type number
 * @min -9999999999999
 * 
 * @param Common
 * @text コモンイベント
 * @desc コモンイベントを開きます。
 * @type common_event
 * @default 0
 * 
 * @param weight
 * @text 重み
 * @desc 重み。
 * @type number
 * @default 1
 * 
 * @param GetText
 * @text 取得時メッセージ
 * @desc 取得時のメッセージ。
 * @type string
 */

(() => {
  const parameters = PluginManager.parameters('NUUN_RandomItems');
  const GetTextMessage = String(parameters['GetTextMessage'] || 'を手に入れた！');
  const GetItemMessage = eval(parameters['GetItemMessage'] || true);
  const CommonListIdVar = Number(parameters['CommonListIdVar'] || 0);
  
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
    this.itemNameVal(itemData);
  };

  Game_Party.prototype.itemNameVal = function(itemDeta) {
    if(GetItemMessage) {
      let text = itemDeta.text;
      if(!text) {
        if(itemDeta.itemType === "money") {
          text = itemDeta.deta + TextManager.currencyUnit + GetTextMessage;
        } else {
          const textIcon = itemDeta.deta.iconIndex > 0 ? '\\i['+ itemDeta.deta.iconIndex +']' : '';
          text = textIcon + itemDeta.deta.name + GetTextMessage;
        }
      }
      $gameMessage.newPage();
      $gameMessage.add(text);
    }
  };

  Game_Party.prototype.randomItemList = function(list) {
    let weightSum = 0;
    let probability = 0.0;
    let getItem = null;
    $gameVariables.setValue(CommonListIdVar, 0);
    list.forEach(item => {
      weightSum += item.weight;
    });
    const value = Math.random() * weightSum;
    let i = 0;
		while(list.length > i){
      probability += list[i].weight / weightSum * weightSum;
      if (probability > value){
        if(list[i].itemType === 0 && $dataItems[list[i].ItemId]){
          getItem = {itemType: "item", deta: $dataItems[list[i].ItemId], text: list[i].GetText};
          break;
        } else if(list[i].itemType === 1 && $dataWeapons[list[i].WeaponId]){
          getItem = {itemType: "weapon", deta: $dataWeapons[list[i].WeaponId], text: list[i].GetText};
          $gameVariables.setValue(CommonListIdVar, i + 1);
          break;
        } else if (list[i].itemType === 2 && $dataArmors[list[i].ArmorId]){
          getItem = {itemType: "armor", deta: $dataArmors[list[i].ArmorId], text: list[i].GetText};
          $gameVariables.setValue(CommonListIdVar, i + 1);
          break;
        } else if (list[i].itemType === 3 && list[i].GainMoney){
          getItem = {itemType: "money", deta: list[i].GainMoney, text: list[i].GetText};
          $gameVariables.setValue(CommonListIdVar, i + 1);
          break;
        } else if (list[i].itemType === 10 && list[i].Common){
          getItem = {itemType: "common", deta: list[i].Common, text: list[i].GetText}
          $gameVariables.setValue(CommonListIdVar, i + 1);
          break;
        }
      }
			i++;
		}
    return getItem;
  }
})();
