/*:-----------------------------------------------------------------------------------
 * NUUN_AnySellPrice.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc Selling price arbitrary setting
 * @author NUUN
 * @version 1.1.1
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 *            
 * @help
 * Makes items, weapons, and armor sell for whatever price they want instead of half their price.
 * Item, Weapon, and Armor Notes
 * <SellPrice:[sell]>
 * [sell]:Selling price
 * <SellPrice:500> Selling price is 500.
 * <SellPrice:0> You can buy it, but you will not be able to sell it. (if you set the database price to 1 or higher)
 * 
 * Please set the selling price of the plug-in command before processing the event command shop.
 * The selling price setting is not automatically initialized. Unless you set the selling price or initialize the selling price setting list, the previously set data will remain.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 12/6/2022 Ver.1.1.1
 * Changed the display in languages other than Japanese to English.
 * 10/31/2021 Ver 1.1.0
 * Added a function that allows you to set the selling price with a plugin command.
 * 10/9/2021 Ver 1.0.0
 * First edition.
 * 
 * @command OrderSellingPrice
 * @desc Set the selling price.
 * @text Setting the selling price
 * 
 * @arg OrderSellingPriceList
 * @text Sell price setting
 * @desc Sell price setting
 * @default []
 * @type struct<SellingPriceList>[]
 * 
 * @command OrderSellingPriceInitialize
 * @desc Initialize the price list of selling prices.
 * @text Initialize selling price setting list
 * 
 * 
 */
/*~struct~SellingPriceList:
 * 
 * @param ItemId
 * @type item
 * @default 
 * @text Item
 * @desc Specifies an item.
 * 
 * @param WeaponId
 * @type weapon
 * @default 
 * @text Weapon
 * @desc Specifies a weapon.
 * 
 * @param ArmorId
 * @type armor
 * @default 
 * @text Armor
 * @desc Specify armor.
 * 
 * @param SellPrice
 * @type number
 * @default 0
 * @text Selling price
 * @desc Specify the selling price.
 * @min 0
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 売値任意設定
 * @author NUUN
 * @version 1.1.1
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 *            
 * @help
 * アイテム、武器、防具の売値を価格の半分ではなく任意の売値にします。
 * アイテム、武器、防具のメモ欄
 * <SellPrice:[sell]>
 * [sell]:売値
 * <SellPrice:500> 売値が500になります。
 * <SellPrice:0> 購入することは出来ますが、売ることが出来なくなります。(データベースの価格を1以上に設定した場合)
 * 
 * プラグインコマンド売値の設定は、イベントコマンドショップの処理の前に行ってください。
 * なお売値の設定は自動では初期化されません。売値の設定または売値の設定リスト初期化を行わない限りまえで設定した
 * データが残り続けます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/12/6 Ver.1.1.1
 * 日本語以外での表示を英語表示に変更。
 * 2021/10/31 Ver 1.1.0
 * プラグインコマンドで売値を設定できる機能を追加。
 * 2021/10/9 Ver 1.0.0
 * 初版
 * 
 * @command OrderSellingPrice
 * @desc 売値の値段を設定します。
 * @text 売値の設定
 * 
 * @arg OrderSellingPriceList
 * @text 売値設定
 * @desc 売値設定
 * @default []
 * @type struct<SellingPriceList>[]
 * 
 * @command OrderSellingPriceInitialize
 * @desc 売値の値段リストを初期化します。
 * @text 売値の設定リスト初期化
 * 
 * 
 */
/*~struct~SellingPriceList:ja
 * 
 * @param ItemId
 * @type item
 * @default 
 * @text アイテム
 * @desc アイテムを指定します。
 * 
 * @param WeaponId
 * @type weapon
 * @default 
 * @text 武器
 * @desc 武器を指定します。
 * 
 * @param ArmorId
 * @type armor
 * @default 
 * @text 防具
 * @desc 防具を指定します。
 * 
 * @param SellPrice
 * @type number
 * @default 0
 * @text 売値
 * @desc 売値を指定します。
 * @min 0
 * 
 */
var Imported = Imported || {};
Imported.NUUN_AnySellPrice = true;

(() => {

  const parameters = PluginManager.parameters('NUUN_AnySellPrice');
  let orderSellPriceList = [];
  const pluginName = "NUUN_AnySellPrice";

  PluginManager.registerCommand(pluginName, 'OrderSellingPrice', args => {
    const listData = (NUUN_Base_Ver >= 113 ? DataManager.nuun_structureData(args.OrderSellingPriceList) : null) || [];
    for (const sellItem of listData) {
      orderSellPrice(sellItem);
    }
  });

  PluginManager.registerCommand(pluginName, 'OrderSellingPriceInitialize', args => {
    orderSellPriceList = [];
  });

  function sellPrice(item) {
    return item.meta.SellPrice ? Number(item.meta.SellPrice) : null;
  };

  function orderSellPrice(args) {
    if (Number(args.ItemId) > 0) {
      orderSellPriceList.push({id:Number(args.ItemId), sell: Number(args.SellPrice), type:'item'});
    } else if (Number(args.WeaponId) > 0) {
      orderSellPriceList.push({id:Number(args.WeaponId), sell: Number(args.SellPrice), type:'weapon'});
    } else if (Number(ArmorId) > 0) {
      orderSellPriceList.push({id:Number(args.ArmorId), sell: Number(args.SellPrice), type:'armor'});
    }
  };

  function getOrderSellPrice(item) {
    const find = orderSellPriceList.find(sellItem => {
      if (DataManager.isItem(item) && sellItem.type === 'item') {
        return sellItem.id === item.id;
      } else if (DataManager.isWeapon(item) && sellItem.type === 'weapon') {
        return sellItem.id === item.id;
      } else if (DataManager.isArmor(item) && sellItem.type === 'armor') {
        return sellItem.id === item.id;
      }
      return false;
    });
    return find ? find.sell : 0;
  };


  const _Scene_Shop_sellingPrice = Scene_Shop.prototype.sellingPrice;
  Scene_Shop.prototype.sellingPrice = function() {
    const item = this._item;
    const orderSellPrice = getOrderSellPrice(item);
    const sell = orderSellPrice > 0 ? orderSellPrice : sellPrice(this._item);
    return sell !== null ? sell : _Scene_Shop_sellingPrice.call(this);
  };

  Scene_Shop.prototype.orderSellingPrice = function() {
    const item = this._item;
    const orderSellPrice = getOrderSellPrice(item);
    return orderSellPrice > 0 ? orderSellPrice : sellPrice(item);
  };

  const _Window_ShopSell_isEnabled = Window_ShopSell.prototype.isEnabled;
  Window_ShopSell.prototype.isEnabled = function(item) {
    const orderSellPrice = getOrderSellPrice(item);
    const sell = orderSellPrice > 0 ? orderSellPrice : sellPrice(item);
    return sell !== null ? sell > 0 : _Window_ShopSell_isEnabled.call(this, item);
  };
})();