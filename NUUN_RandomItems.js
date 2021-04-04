/*:-----------------------------------------------------------------------------------
 * NUUN_RandomItems.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc アイテムのランダム入手
 * @author NUUN
 * @version 1.2.2
 * 
 * @help
 * アイテムをランダムで入手します。
 * ランダムアイテムの設定はプラグインコマンドから設定します。
 * ランダムに取得できる対象は、アイテム、武器、防具、お金、コモンイベントが設定できます。
 * コモンイベントを設定した場合は、取得時に指定のコモンイベントが呼び出されます。
 * 取得したアイテムのリストID、アイテム名、アイコンインデックス、重みを変数に代入できます。
 * コモンイベントはアイテム名ではなくコモンイベントIDが代入されます。アイコンインデックスを代入されません。
 * お金はアイテム名ではなく取得した金額で表示されます。アイコンインデックスは代入されません。
 * 
 * プラグインパラメータでアイテムを取得やメッセージを表示するプラグインをご使用の場合は、
 * 取得リストID変数を設定して分岐条件などで各種設定をしてください。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/4/4 Ver.1.2.2
 * プラグインコマンドにお金を入手したときにアイコンIDを取得し変数に格納できる機能を追加しました。
 * 2021/2/25 Ver.1.2.1
 * ゲーム変数代入時のマップ更新を１度しか行わないようにに修正。
 * 2021/2/25 Ver.1.2.0
 * 変数にアイテム名、アイコンインデックス、重みを代入する機能を追加。
 * アイテムを取得するときに変数にリストIDが代入されない問題を修正。
 * 2020/12/15 Ver.1.1.0
 * MOG_TreasurePopup対応。
 * 2020/11/22 Ver.1.0.0
 * 初版
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
 * @default 0
 * 
 * @param ItemNameVar
 * @desc 取得アイテム名を格納する変数。
 * @text 取得アイテム名変数
 * @type variable
 * @default 0
 * 
 * @param ItemIconIDVar
 * @desc 取得アイテムのアイコンIDを格納する変数。
 * @text 取得アイテムアイコンID変数
 * @type variable
 * @default 0
 * 
 * @param WeightVar
 * @desc 取得アイテムの重みを格納する変数。
 * @text 取得アイテム重み変数
 * @type variable
 * @default 0
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
 * 
 * @param MoneyIconID
 * @desc お金取得時のアイコンID。
 * @text お金取得時アイコンID変数
 * @type number
 * @default 0
 */
var Imported = Imported || {};
Imported.NUUN_RandomItems = true;

(() => {
  'use strict';
  const parameters = PluginManager.parameters('NUUN_RandomItems');
  const GetTextMessage = String(parameters['GetTextMessage'] || 'を手に入れた！');
  const GetItemMessage = eval(parameters['GetItemMessage'] || "true");
  const CommonListIdVar = Number(parameters['CommonListIdVar'] || 0);
  const ItemNameVar = Number(parameters['ItemNameVar'] || 0);
  const ItemIconIDVar = Number(parameters['ItemIconIDVar'] || 0);
  const WeightVar = Number(parameters['WeightVar'] || 0);
  let eventId = 0;
  
  const pluginName = "NUUN_RandomItems";
  PluginManager.registerCommand(pluginName, 'ItemList', args => {
    $gameParty.randomItems(args);
  });

  const _Game_Interpreter_command357 = Game_Interpreter.prototype.command357;
  Game_Interpreter.prototype.command357 = function(params) {
    if (params[0] === "NUUN_RandomItems") {
      eventId = this._eventId;
    }
    return _Game_Interpreter_command357.call(this, params);
  };

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
    interpreter.clear();
    interpreter._eventId = eventId;//MOG_TreasurePopup対応のため
    eventId = 0;
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
          $gameVariables.setValueInRandomItem(ItemNameVar, $dataItems[list[i].ItemId].name);
          $gameVariables.setValueInRandomItem(ItemIconIDVar, $dataItems[list[i].ItemId].iconIndex);
          $gameVariables.setValueInRandomItem(WeightVar, list[i].weight);
          $gameVariables.setValue(CommonListIdVar, i + 1);
          break;
        } else if(list[i].itemType === 1 && $dataWeapons[list[i].WeaponId]){
          getItem = {itemType: "weapon", deta: $dataWeapons[list[i].WeaponId], text: list[i].GetText};
          $gameVariables.setValueInRandomItem(ItemNameVar, $dataWeapons[list[i].WeaponId].name);
          $gameVariables.setValueInRandomItem(ItemIconIDVar, $dataWeapons[list[i].WeaponId].iconIndex);
          $gameVariables.setValueInRandomItem(WeightVar, list[i].weight);
          $gameVariables.setValue(CommonListIdVar, i + 1);
          break;
        } else if (list[i].itemType === 2 && $dataArmors[list[i].ArmorId]){
          getItem = {itemType: "armor", deta: $dataArmors[list[i].ArmorId], text: list[i].GetText};
          $gameVariables.setValueInRandomItem(ItemNameVar, $dataArmors[list[i].ArmorId].name);
          $gameVariables.setValueInRandomItem(ItemIconIDVar, $dataArmors[list[i].ArmorId].iconIndex);
          $gameVariables.setValueInRandomItem(WeightVar, list[i].weight);
          $gameVariables.setValue(CommonListIdVar, i + 1);
          break;
        } else if (list[i].itemType === 3 && list[i].GainMoney){
          getItem = {itemType: "money", deta: list[i].GainMoney, text: list[i].GetText};
          $gameVariables.setValueInRandomItem(ItemNameVar, list[i].GainMoney);
          $gameVariables.setValueInRandomItem(ItemIconIDVar, list[i].MoneyIconID);
          $gameVariables.setValueInRandomItem(WeightVar, list[i].weight);
          $gameVariables.setValue(CommonListIdVar, i + 1);
          break;
        } else if (list[i].itemType === 10 && list[i].Common){
          getItem = {itemType: "common", deta: list[i].Common, text: list[i].GetText}
          $gameVariables.setValueInRandomItem(ItemNameVar, list[i].Common);
          $gameVariables.setValueInRandomItem(WeightVar, list[i].weight);
          $gameVariables.setValue(CommonListIdVar, i + 1);
          break;
        }
      }
			i++;
		}
    return getItem;
  }

  Game_Variables.prototype.setValueInRandomItem = function(variableId, value) {
    if (variableId > 0 && variableId < $dataSystem.variables.length) {
        if (typeof value === "number") {
            value = Math.floor(value);
        }
        this._data[variableId] = value;
    }
};
})();
