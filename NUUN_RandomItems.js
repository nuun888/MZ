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
 * @plugindesc Random get items and money
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.3.2
 * 
 * @help
 * Randomly obtain items and money.
 * Random item settings are set from the plugin command.
 * Items, weapons, armor, money, and common events can be set as random targets.
 * If a common event is set, the specified common event will be called upon acquisition.
 * The list ID, item name, icon index and weight of the acquired item can be assigned to variables.
 * Common events are assigned common event IDs instead of item names. Not assigned icon index.
 * Money is displayed by the amount obtained instead of the item name. Icon index is not assigned.
 * The conditional expression becomes a lottery target when the specified conditions are met. 
 * Enter the evaluation expression (java script code) for the conditional expression.
 * 
 * Message when item is acquired.
 * %1: Item name
 * %2: Item icon
 * Message when getting money
 * %1: money
 * %2: MoneyIconID
 * %3: currency unit
 * 
 * If you are using a plugin that retrieves items or displays messages with plugin parameters, set the retrieval list ID variable and make various settings such as branch conditions.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 12/9/2022 Ver.1.3.2
 * Added a function that can set a conditional expression for the random acquisition target.
 * 12/8/2022 Ver.1.3.1
 * Changed the Type of icon specified plug-in parameter to icon. (Ver.1.6.0 or later)
 * 11/12/2022 Ver.1.3.0
 * Change message format.
 * Changed the display in languages other than Japanese to English.
 * 4/4/2021 Ver.1.2.2
 * Added a function to get the icon ID and store it in a variable when you get money in the plugin command.
 * 2/25/2021 Ver.1.2.1
 * Fixed to update the map only once when assigning game variables.
 * 2/25/2021 Ver.1.2.0
 * Added function to assign item name, icon index and weight to variables.
 * Fixed the problem that the list ID is not assigned to the variable when getting the item.
 * 12/15/2020 Ver.1.1.0
 * ”MOG_TreasurePopup” supported.
 * 11/22/2020 Ver.1.0.0
 * first edition.
 * 
 * @command ItemList
 * @desc Specifies the item to get randomly.
 * @arg list
 * @text Random item
 * @type struct<randomList>[]
 * 
 * @param GetTextMessage
 * @text Default message when getting
 * @desc Default message on fetch.
 * @type string
 * @default You got \i[%2]%1!
 * 
 * @param GetGoldMessage
 * @text Default message when getting money
 * @desc Default message when getting money.
 * @type string
 * @default Got %1%3!
 * 
 * @param GetItemMessage
 * @desc Show message window when fetching.
 * @text Message window display
 * @type boolean
 * @default true
 * 
 * @param CommonListIdVar
 * @desc A variable that stores the list ID when retrieving.
 * @text Acquisition list ID variableId
 * @type variable
 * @default 0
 * 
 * @param ItemNameVar
 * @desc A variable that stores the retrieved item name.
 * @text Acquisition item name variableId
 * @type variable
 * @default 0
 * 
 * @param ItemIconIDVar
 * @desc A variable that stores the icon ID of the acquired item.
 * @text Acquisition item icon ID variableId
 * @type variable
 * @default 0
 * 
 * @param WeightVar
 * @desc A variable that stores the weight of the acquired item.
 * @text Acquisition item weight variableId
 * @type variable
 * @default 0
 * 
 */ 
/*~struct~randomList:
 * @param itemType
 * @text Acquisition item ID
 * @desc ID of the item that can be acquired.
 * @type select
 * @option Item(1)(6)(7)(8)(9)
 * @value 0
 * @option Weapon(2)(6)(7)(8)(9)
 * @value 1
 * @option Armor(3)(6)(7)(8)(9)
 * @value 2
 * @option Money(4)(6)(7)(8)(9)
 * @value 3
 * @option Common event(5)(6)(9)
 * @value 10
 * @default 0
 * 
 * @param ItemId
 * @text Acquired item(1)
 * @desc Items that can be acquired.
 * @type item
 * 
 * @param WeaponId
 * @text Acquired weapons(2)
 * @desc Weapons that can be acquired.
 * @type weapon
 * 
 * @param ArmorId
 * @text Acquired armor(3)
 * @desc Armor that can be acquired.
 * @type armor
 * 
 * @param GainMoney
 * @text Acquired money(4)
 * @desc money you can get.
 * @type number
 * @min -9999999999999
 * 
 * @param Common
 * @text Common event(5)
 * @desc Open a common event.
 * @type common_event
 * @default 0
 * 
 * @param weight
 * @text weight(6)
 * @desc weight.
 * @type number
 * @default 1
 * 
 * @param Cond
 * @text conditional expression(9)
 * @desc Fill in the conditions.
 * @type combo
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option '$gameSwitches.value(0);//スイッチ'
 * @default 
 * 
 * @param GetText
 * @text Acquisition message(7)
 * @desc message when retrieving.
 * @type string
 * 
 * @param MoneyIconID
 * @desc Icon ID when getting money.
 * @text Money acquisition icon ID.(8)
 * @type icon
 * @default 0
 */
/*:ja
 * @target MZ
 * @plugindesc アイテム、お金のランダム入手
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.3.2
 * 
 * @help
 * アイテム、お金をランダムで入手します。
 * ランダムアイテムの設定はプラグインコマンドから設定します。
 * ランダムに取得できる対象は、アイテム、武器、防具、お金、コモンイベントが設定できます。
 * コモンイベントを設定した場合は、取得時に指定のコモンイベントが呼び出されます。
 * 取得したアイテムのリストID、アイテム名、アイコンインデックス、重みを変数に代入できます。
 * コモンイベントはアイテム名ではなくコモンイベントIDが代入されます。アイコンインデックスを代入されません。
 * お金はアイテム名ではなく取得した金額で表示されます。アイコンインデックスは代入されません。
 * 条件式は、指定の条件が一致したときに抽選対象になります。条件式は評価式(java script code)を入力します。
 * 
 * アイテム取得時のメッセージ
 * %1:アイテム名
 * %2:アイテムアイコン
 * お金取得時のメッセージ
 * %1:金額
 * %2:お金取得時アイコンID
 * %3:通貨単位
 * 
 * プラグインパラメータでアイテムを取得やメッセージを表示するプラグインをご使用の場合は、
 * 取得リストID変数を設定して分岐条件などで各種設定をしてください。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/12/9 Ver.1.3.2
 * ランダム取得対象に条件式を設定できる機能を追加。
 * 2022/12/8 Ver.1.3.1
 * アイコン指定のプラグインパラメータのTypeをiconに変更。(Ver.1.6.0以降)
 * 2022/11/12 Ver.1.3.0
 * メッセージのフォーマットを変更。
 * 日本語以外での表示を英語表示に変更。
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
 * @text アイテム取得時のデフォルトメッセージ
 * @desc アイテム取得時のデフォルトメッセージ。
 * @type string
 * @default \i[%2]%1を手に入れた！
 * 
 * @param GetGoldMessage
 * @text お金取得時のデフォルトメッセージ
 * @desc お金時のデフォルトメッセージ。
 * @type string
 * @default %1%3を手に入れた！
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
/*~struct~randomList:ja
 * @param itemType
 * @text 取得アイテムのID
 * @desc 取得できるアイテムのID。
 * @type select
 * @option アイテム(1)(6)(7)(8)(9)
 * @value 0
 * @option 武器(2)(6)(7)(8)(9)
 * @value 1
 * @option 防具(3)(6)(7)(8)(9)
 * @value 2
 * @option 金額(4)(6)(7)(8)(9)
 * @value 3
 * @option コモンイベント(5)(6)(9)
 * @value 10
 * @default 0
 * 
 * @param ItemId
 * @text 取得アイテム(1)
 * @desc 取得できるアイテム。
 * @type item
 * 
 * @param WeaponId
 * @text 取得武器(2)
 * @desc 取得できる武器。
 * @type weapon
 * 
 * @param ArmorId
 * @text 取得防具(3)
 * @desc 取得できる防具。
 * @type armor
 * 
 * @param GainMoney
 * @text 取得金額(4)
 * @desc 取得できるお金。
 * @type number
 * @min -9999999999999
 * 
 * @param Common
 * @text コモンイベント(5)
 * @desc コモンイベントを開きます。
 * @type common_event
 * @default 0
 * 
 * @param weight
 * @text 重み(6)
 * @desc 重み。
 * @type number
 * @default 1
 * 
 * @param Cond
 * @text 条件式(9)
 * @desc 条件を記入します。
 * @type combo
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option '$gameSwitches.value(0);//スイッチ'
 * @default 
 * 
 * @param GetText
 * @text 取得時メッセージ(7)
 * @desc 取得時のメッセージ。
 * @type string
 * 
 * @param MoneyIconID
 * @desc お金取得時のアイコンID。
 * @text お金取得時アイコンID(8)
 * @type icon
 * @default 0
 */
var Imported = Imported || {};
Imported.NUUN_RandomItems = true;

(() => {
  'use strict';
  const parameters = PluginManager.parameters('NUUN_RandomItems');
  const GetTextMessage = String(parameters['GetTextMessage']);
  const GetGoldMessage = String(parameters['GetGoldMessage']);
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
    const list = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(args)) : null) || [];
    if (list) {
      const data = list.list.filter(a => !a.Cond || (a.Cond && eval(a.Cond)));
      const itemData = this.randomItemList(data);
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
    } else {
      return this;
    }
  };

  Game_Party.prototype.itemNameVal = function(itemDeta) {
    let text = '';
    if(GetItemMessage) {
      if(itemDeta.itemType === "money") {
        text = itemDeta.text ? itemDeta.text : GetGoldMessage;
        text = text.format(itemDeta.deta, itemDeta.iconId, TextManager.currencyUnit);
      } else {
        text = itemDeta.text ? itemDeta.text : GetTextMessage;
        text = text.format(itemDeta.deta.name, itemDeta.deta.iconIndex);
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
          setRandomItemData(ItemNameVar, $dataItems[list[i].ItemId].name);
          setRandomItemData(ItemIconIDVar, $dataItems[list[i].ItemId].iconIndex);
          setRandomItemData(WeightVar, list[i].weight);
          $gameVariables.setValue(CommonListIdVar, i + 1);
          break;
        } else if(list[i].itemType === 1 && $dataWeapons[list[i].WeaponId]){
          getItem = {itemType: "weapon", deta: $dataWeapons[list[i].WeaponId], text: list[i].GetText};
          setRandomItemData(ItemNameVar, $dataWeapons[list[i].WeaponId].name);
          setRandomItemData(ItemIconIDVar, $dataWeapons[list[i].WeaponId].iconIndex);
          setRandomItemData(WeightVar, list[i].weight);
          $gameVariables.setValue(CommonListIdVar, i + 1);
          break;
        } else if (list[i].itemType === 2 && $dataArmors[list[i].ArmorId]){
          getItem = {itemType: "armor", deta: $dataArmors[list[i].ArmorId], text: list[i].GetText};
          setRandomItemData(ItemNameVar, $dataArmors[list[i].ArmorId].name);
          setRandomItemData(ItemIconIDVar, $dataArmors[list[i].ArmorId].iconIndex);
          setRandomItemData(WeightVar, list[i].weight);
          $gameVariables.setValue(CommonListIdVar, i + 1);
          break;
        } else if (list[i].itemType === 3 && list[i].GainMoney){
          getItem = {itemType: "money", deta: list[i].GainMoney, text: list[i].GetText, iconId: list[i].MoneyIconID};
          setRandomItemData(ItemNameVar, list[i].GainMoney);
          setRandomItemData(ItemIconIDVar, list[i].MoneyIconID);
          setRandomItemData(WeightVar, list[i].weight);
          $gameVariables.setValue(CommonListIdVar, i + 1);
          break;
        } else if (list[i].itemType === 10 && list[i].Common){
          getItem = {itemType: "common", deta: list[i].Common, text: list[i].GetText}
          setRandomItemData(ItemNameVar, list[i].Common);
          setRandomItemData(WeightVar, list[i].weight);
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

  function setRandomItemData(varId, data) {
    $gameVariables.setValueInRandomItem(varId, data);
  };

})();
