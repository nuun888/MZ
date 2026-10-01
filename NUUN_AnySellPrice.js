/*:-----------------------------------------------------------------------------------
 * NUUN_AnySellPrice.js
 * 
 * Copyright (C) 2021 NUUN
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc Selling price arbitrary setting
 * @author NUUN
 * @version 1.2.0
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
 * Credit: Optional
 * Commercial use: Possible
 * Modifications: Possible
 * Redistribution: Possible
 * Support is not available for modified versions or downloads from sources other than https://github.com/nuun888/MZ, the official forum, or authorized retailers.
 * 
 * Log
 * 10/1/2026 Ver.1.2.0
 * Changed the plugin to work without NUUN_Base.
 * 11/18/2023 Ver.1.1.2
 * Fixed an issue where an error would occur when selecting the sell screen when there were no items.
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
 * @version 1.2.0
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
 * クレジット表記：任意
 * 商業利用：可能
 * 改変：可能
 * 再配布：可能
 * https://github.com/nuun888/MZ、公式フォーラム、正規販売サイト以外からのダウンロード、改変済みの場合はサポートは対象外となります。
 * 
 * 更新履歴
 * 2026/10/1 Ver.1.2.0
 * NUUN_Baseなしで実行できるように仕様を変更。
 * 2023/11/18 Ver.1.1.2
 * アイテムがない状態で売却画面を選択するとエラーが出る問題を修正。
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
    class Nuun_PluginParams_AnySellPrice {
        static getPluginParams(text) {//document.currentScript
            try {
                const name = String(Utils.extractFileName(text.src).split('.').shift());
                const params = PluginManager.parameters(name);
                if (params) {
                    const pluginParam = new Nuun_PluginParamData(params);
                    pluginParam.setPluginName(name);
                    return pluginParam.getParameters();
                }
                return {pluginName: name};
            } catch (error) {
                const log = ($gameSystem.isJapanese() ? "コアスクリプトをVer.1.3.2以降に更新してください。" : "Please update the core script to version 1.3.2 or later.");
                throw ["ParameterError", log];
            }
        }
    };

    class Nuun_PluginParamData {
        constructor(text) {
            this._parameters = JSON.parse(JSON.stringify(text, this._convertParams)) || {};
        }

        _convertParams(key, code) {
            try {
                return JSON.parse(code);
            } catch (e) {
                if (isNaN(code)) {
                    if (!code) {
                        return null;
                    }
                    try {
                        if (code.indexOf("'") === 0 || code.indexOf('"') === 0) {
                            return eval(code);//'または"を外す。
                        }
                        return !!code ? String(code) : null;
                    } catch (e) {
                        if (typeof {} === "object") {
                            return code;
                        }
                        return !!code ? String(code) : null;
                    }
                } else {
                    return String(code);
                }
            }
        }

        getParameters() {
            return this._parameters;
        }

        setPluginName(name) {
            this._parameters.pluginName = name;
        }


        getMetaTag(object, code) {
            const data = object.meta[code];
            let list = [];
            if (data !== undefined) {
                try {
                    list = data.split(',');
                } catch (error) {
                    return this.getTextCodeMeta(data);
                }
                list.forEach(a => {
                    a = this.getTextCodeMeta(a);
                });
                return list;
            } else {
                return undefined;
            }
        }

        getTextCodeMeta(text) {
            if (isNaN(text)) {
                return text;
            } else {
                return Number(text);
            }
        }
    };

    const params = Nuun_PluginParams_AnySellPrice.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;

    function NuunAnySellPriceManager() {
        throw new Error("This is a static class");
    }

    window.NuunAnySellPriceManager = NuunAnySellPriceManager;

    NuunAnySellPriceManager.orderSellPriceList = [];

    NuunAnySellPriceManager.structureData = function(params){
        return JSON.parse(JSON.stringify(params, function(key, value) {
            try {
                return JSON.parse(value);
            } catch (e) {
                return NuunAnySellPriceManager.getEvalCode(value);
            }
        }));
    };

    NuunAnySellPriceManager.getEvalCode = function(code) {
        if (isNaN(code)) {
            if (!code) {
                return null;
            }
            return this.stringCode(code);
        } else {
            return String(code);
        }
    };

    NuunAnySellPriceManager.stringCode = function(code){
        try {
            if (code.indexOf("'") === 0 || code.indexOf('"') === 0) {
                return eval(code);//'または"を外す。
            }
            return !!code ? String(code) : null;
        } catch (e) {
            return code;
        }
    };

    NuunAnySellPriceManager.getMetaCode = function(object, method) {
        const meta = object.meta[method];
        if (!meta) return null;
        if (meta === true) {
            return null;
        }
        if (meta.indexOf('[') >= 0) {
            const log = ($gameSystem.isJapanese() ? "パラメータに[]が含まれています。[]を外して記入して下さい。" : "The parameter contains []. Please remove the [] and enter it.");
            throw ["ParameterError", log];
        }
        return meta;
    };

    NuunAnySellPriceManager.sellPrice = function(item) {
        return item && item.meta.SellPrice ? Number(NuunAnySellPriceManager.getMetaCode(item, "SellPrice")) : null;
    };

    NuunAnySellPriceManager.orderSellPrice = function(args) {
        if (Number(args.ItemId) > 0) {
            this.orderSellPriceList.push({id:Number(args.ItemId), sell: Number(args.SellPrice), type:'item'});
        } else if (Number(args.WeaponId) > 0) {
            this.orderSellPriceList.push({id:Number(args.WeaponId), sell: Number(args.SellPrice), type:'weapon'});
        } else if (Number(args.ArmorId) > 0) {
            this.orderSellPriceList.push({id:Number(args.ArmorId), sell: Number(args.SellPrice), type:'armor'});
        }
    };

    NuunAnySellPriceManager.getOrderSellPrice = function(item) {
        if (!item) return false;
        const find = this.orderSellPriceList.find(sellItem => {
            if ($dataItems[item.id] === item && sellItem.type === 'item') {
                return sellItem.id === item.id;
            } else if ($dataWeapons[item.id] === item && sellItem.type === 'weapon') {
                return sellItem.id === item.id;
            } else if ($dataArmors[item.id] === item && sellItem.type === 'armor') {
                return sellItem.id === item.id;
            }
            return false;
        });
        return find ? find.sell : 0;
    };

    PluginManager.registerCommand(pluginName, 'OrderSellingPrice', args => {
        const listData = (NUUN_Base_Ver >= 113 ? NuunAnySellPriceManager.structureData(args.OrderSellingPriceList) : null) || [];
        for (const sellItem of listData) {
            NuunAnySellPriceManager.orderSellPrice(sellItem);
        }
    });

    PluginManager.registerCommand(pluginName, 'OrderSellingPriceInitialize', args => {
        NuunAnySellPriceManager.orderSellPriceList = [];
    });

    const _Scene_Shop_sellingPrice = Scene_Shop.prototype.sellingPrice;
    Scene_Shop.prototype.sellingPrice = function() {
        const item = this._item;
        const orderSellPrice = NuunAnySellPriceManager.getOrderSellPrice(item);
        const sell = orderSellPrice > 0 ? orderSellPrice : NuunAnySellPriceManager.sellPrice(this._item);
        return sell !== null ? sell : _Scene_Shop_sellingPrice.apply(this, arguments);
    };

    Scene_Shop.prototype.orderSellingPrice = function() {
        const item = this._item;
        const orderSellPrice = NuunAnySellPriceManager.getOrderSellPrice(item);
        return orderSellPrice > 0 ? orderSellPrice : NuunAnySellPriceManager.sellPrice(item);
    };

    const _Window_ShopSell_isEnabled = Window_ShopSell.prototype.isEnabled;
    Window_ShopSell.prototype.isEnabled = function(item) {
        const orderSellPrice = NuunAnySellPriceManager.getOrderSellPrice(item);
        const sell = orderSellPrice > 0 ? orderSellPrice : NuunAnySellPriceManager.sellPrice(item);
        return sell !== null ? sell > 0 : _Window_ShopSell_isEnabled.apply(this, arguments);
    };

    
})();