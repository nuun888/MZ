/*:-----------------------------------------------------------------------------------
 * NUUN_BuyDiscountRate.js
 * 
 * Copyright (C) 2025 NUUN
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Items that give discounts when purchased when in possession
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * You can create items that will apply a discount when you purchase other items just by owning them.
 * If you buy 20 you will get 20% off. If you own multiple items, the highest discount rate will be applied.
 * Upon installation, the discount will be applied to the purchase price in the shop (this may not apply to shops displayed by plugins, etc.).
 * 
 * Item, Armor, and Weapon Notes
 * <NoBuyDiscount> Discounts will be excluded.
 * 
 * Terms of Use
 * Credit: Optional
 * Commercial use: Possible
 * Adult content: Possible
 * Modifications: Possible
 * Redistribution: Possible
 * Support is not available for modified versions or downloads from sources other than https://github.com/nuun888/MZ, the official forum, or authorized retailers.
 * 
 * Log
 * 11/6/2025 Ver.1.0.0
 * First edition.
 * 
 * @param BuyDiscountRateItems
 * @desc Set the items that will be discounted if you possess them.
 * @text Item settings to offer discounts when purchased if owned
 * @type struct<DiscountRateItems>[]
 * @default []
 * 
 * @param EnableBuyDiscountSwitch
 * @text Discount Disable Switch
 * @desc Specifies the switch that will disable the discount.
 * @type switch
 * @default 0
 * 
 */
/*~struct~DiscountRateItems:
 *
 * @param Item
 * @desc Specify the item.
 * @text Item
 * @type item
 * @default 0
 * 
 * @param DiscountRate
 * @desc Specify the discount rate when you have it. (Integer) 50 means 50% OFF
 * @text Discount rate
 * @type number
 * @min -9999
 * @default 20
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 所持中割引率適用アイテム
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * 所持しているだけでアイテムを購入するときに割引が適用されるアイテムを制作できます。
 * 20なら20%OFF 複数所持の場合は一番高い割引率が適用されます。
 * 導入した時点でショップ(プラグイン等で表示したショップは適用されない場合があります)の購入価格に割引が適用されます。
 * 
 * 利用規約
 * クレジット表記：任意
 * 商業利用：可能
 * 成人向け：可能
 * 改変：可能
 * 再配布：可能
 * https://github.com/nuun888/MZ、公式フォーラム、正規販売サイト以外からのダウンロード、改変済みの場合はサポートは対象外となります。
 * 
 * アイテム、防具、武器のメモ欄
 * <NoBuyDiscount> 割引対象外にします。
 * 
 * 更新履歴
 * 2025/11/6 Ver.1.0.0
 * 初版
 * 
 * @param BuyDiscountRateItems
 * @desc 所持していると割引が適用されるアイテムを設定します。
 * @text 割引適用所持アイテム
 * @type struct<DiscountRateItems>[]
 * @default []
 * 
 * @param EnableBuyDiscountSwitch
 * @text 割引無効スイッチ
 * @desc 割引が無効になるスイッチを指定します。
 * @type switch
 * @default 0
 * 
 */
/*~struct~DiscountRateItems:ja
 *
 * @param Item
 * @desc アイテムを指定します。
 * @text アイテム
 * @type item
 * @default 0
 * 
 * @param DiscountRate
 * @desc 所持している時の割引率を指定します。(整数) 50なら50%OFF
 * @text 割引率
 * @type number
 * @min -9999
 * @default 20
 * 
 */

var Imported = Imported || {};
Imported.NUUN_BuyDiscountRate = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    const _Window_ShopBuy_initialize = Window_ShopBuy.prototype.initialize;
    Window_ShopBuy.prototype.initialize = function(rect) {
        _Window_ShopBuy_initialize.apply(this, arguments);
        this._moneyDiscountRate = 1.0;
    };

    const _Window_ShopBuy_refresh = Window_ShopBuy.prototype.refresh;
    Window_ShopBuy.prototype.refresh = function() {
        this._buyDiscountRate = $gameParty.getBuyDiscountRate();
        _Window_ShopBuy_refresh.apply(this, arguments);
    };

    Game_Party.prototype.getBuyDiscountRate = function() {
        return Math.max(this.buyDiscountRate() + 100, 0) / 100
    };

    Game_Party.prototype.buyDiscountRate = function() {
        if (params.EnableBuyDiscountSwitch > 0 && $gameSwitches.value(params.EnableBuyDiscountSwitch)) return 1.0;
        return params.BuyDiscountRateItems.reduce((r, data) => {
            const item = $dataItems[data.Item];
            if (data.Item > 0 && data.DiscountRate > r && !!item && this.hasItem(item)) {
                return (data.DiscountRate * -1);
            }
            return 0;
        }, 0);
    };

    const _Window_ShopBuy_price = Window_ShopBuy.prototype.price;
    Window_ShopBuy.prototype.price = function(item) {
        return _Window_ShopBuy_price.apply(this, arguments) * this.getBuyDiscountRate(item);
    };

    Window_ShopBuy.prototype.getBuyDiscountRate = function(item) {
        if (!item || this._buyDiscountRate === undefined) return 1.0;
        if (!!item.meta.NoBuyDiscount) return 1.0;
        return this._buyDiscountRate;
    };

    
})();