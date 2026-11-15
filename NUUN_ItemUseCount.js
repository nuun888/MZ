/*:-----------------------------------------------------------------------------------
 * NUUN_ItemUseCount.js
 * Copyright (C) 2020 NUUN
 * -------------------------------------------------------------------------------------
 * 
 */
/*:
 * @target MZ
 * @plugindesc  Item Use Count
 * @author NUUN
 * @version 1.1.0
 * 
 * 
 * @help
 * You can set the number of times an item can be used before it is consumed.
 * The item is consumed when its remaining use count reaches 0.
 * When selling all copies of an item, the selling price of one item is reduced based on its remaining use count.
 * Note: In the current version, the selling price displayed in the shop does not reflect the remaining use count.
 * 
 * Using with Item Consumption Rate for the Same Item.
 * The processing order of the use count and item consumption rate depends on the plugin order.
 * If this plugin is placed before the Item Consumption Rate plugin, item consumption is processed first, followed by the use count.
 * In this case, the use count effect will not be applied if the consumption rate is set to 100% or higher.
 * If this plugin is placed after the Item Consumption Rate plugin, the use count is processed first, followed by item consumption.
 * In this case, the use count effect works correctly even if the consumption rate is set to 100% or higher.
 * 
 * Item Note Tags
 * <ItemUseCount:[Num]> Sets the number of uses before the item is consumed. [Num]: Number of uses
 * <ItemUseCountHide> Hides the remaining use count in the item list.
 * 
 * Plugin Commands
 * Consume Item with Use Count
 * Applies the use count effect when consuming an item through an event.
 * To apply the consumption rate (NUUN_ConsumptionItem), use the plugin command provided by NUUN_ConsumptionItem.
 * 
 * Terms of Use
 * Credit: Optional
 * Commercial use: Possible
 * Modifications: Possible
 * Redistribution: Possible
 * Support is not available for modified versions or downloads from sources other than https://github.com/nuun888/MZ, the official forum, or authorized retailers.
 * 
 * Log
 * 11/15/2026 Ver.1.1.0
 * Revised the internal processing.
 * 5/2/2021 Ver.1.0.2
 * Fixed an error that occurred when unequipping equipment.
 * 12/31/2021 Ver.1.0.1
 * Added an option to hide the use count in the item list.
 * 12/24/2020 Ver.1.0.0
 * First edition.
 * 
 * @command UseCountItems
 * @text Consume Item with Use Count
 * @desc Consumes an item while applying the use count effect.
 *
 * @arg UseCountItem
 * @type item
 * @default 0
 * @text Item
 * @desc Specifies the item to consume with the use count effect applied.
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc  アイテム使用回数
 * @author NUUN
 * @version 1.1.0
 * 
 * 
 * @help
 * アイテムに１回消費するまでの使用回数を設定できます。使用回数カウントが０になった時そのアイテムは消耗します。
 * アイテムを売却する際、全て売却した場合そのアイテムの通常売却額１つ分の売却額が使用回数に応じて減少します。
 * ※現在のバージョンではショップ画面で表示される売却額は使用回数を考慮していない売却額となっています。
 * 
 * 同一アイテムのアイテム消耗率と併用
 * プラグインの配置順によって、使用回数とアイテム消耗率の処理順序が異なります。
 * このプラグインをアイテム消耗率プラグインより先に配置した場合、アイテムの消耗処理が優先され、その後に使用回数が処理されます。
 * この場合、消耗率が100%以上に設定されていると、使用回数の効果が適用されません。
 * このプラグインをアイテム消耗率プラグインより後に配置した場合、使用回数の処理が優先され、その後にアイテムの消耗処理が行われます。
 * この場合、消耗率が100%以上に設定されていても、使用回数の効果は正常に適用されます。
 * 
 * アイテムのメモ欄
 * <ItemUseCount:[Num]>使用回数を設定します。[Num]:使用回数
 * <ItemUseCountHide>アイテム欄に使用回数を表示させません。
 * 
 * プラグインコマンド
 * 使用回数適用アイテム消費
 * イベントからのアイテム消費で使用回数を適用させます。
 * 消耗率(NUUN_ConsumptionItem)を適用させる場合は、NUUN_ConsumptionItemのプラグインコマンドから実行してください。
 * 
 * 利用規約
 * クレジット表記：任意
 * 商業利用：可能
 * 改変：可能
 * 再配布：可能
 * https://github.com/nuun888/MZ、公式フォーラム、正規販売サイト以外からのダウンロード、改変済みの場合はサポートは対象外となります。
 * 
 * 更新履歴
 * 2026/11/15 Ver.1.1.0
 * 処理の見直しによる修正。
 * 2021/5/2 Ver.1.0.2
 * 装備を外すときにエラーが出る問題を修正。
 * 2020/12/31 Ver.1.0.1
 * アイテム欄の使用回数を非表示に出来る機能を追加。
 * 2020/12/24 Ver.1.0.0
 * 初版
 * 
 * @command UseCountItems
 * @text 使用回数適用アイテム消費
 * @desc 使用回数の効果を適用してアイテムを消費します。
 * 
 * @arg UseCountItem
 * @type item
 * @default 0
 * @text アイテム
 * @desc 使用回数の効果を適用して消費するアイテムを指定します。
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_ItemUseCount = true;

(() => {
    class Nuun_PluginParams_ItemUseCount {
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

    window.Nuun_PluginParams_ItemUseCount = Nuun_PluginParams_ItemUseCount;

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
                return list.map(a => this.getTextCodeMeta(a));
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

    const params = Nuun_PluginParams_ItemUseCount.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;

    function NuunItemUseCountManager() {
        throw new Error("This is a static class");
    }

    window.NuunItemUseCountManager = NuunItemUseCountManager;

    NuunItemUseCountManager.itemUseCountParams = function(code) {
        
    };

    NuunItemUseCountManager.getMetaCode = function(object, method) {
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


    PluginManager.registerCommand(pluginName, "UseCountItems", args => {
        $gameParty.eventUseCountItem(Number(args.UseCountItem));
    });


    const _Game_Party_initialize = Game_Party.prototype.initialize;
    Game_Party.prototype.initialize = function() {
        _Game_Party_initialize.call(this);
        this._useItemCount = [];
    };

    Game_Party.prototype.initUseItemCount = function(item) {
        if (!this._useItemCount) {
            this._useItemCount = [];
        }
        if (this._useItemCount[item.id] === undefined) {
            this.setUseItemCount(item);
        }
    };

    Game_Party.prototype.setUseItemCount = function(item) {
        if (item && !!item.meta.ItemUseCount && !this._useItemCount[item.id]) {
            this.useItemCountReset(item);
        }
    };

    Game_Party.prototype.useItemCount = function(item) {
        this.initUseItemCount(item);
        this._useItemCount[item.id]--;
    };

    Game_Party.prototype.useItemCountReset = function(item) {
        this._useItemCount[item.id] = !!item.meta.ItemUseCount ? (Number(NuunItemUseCountManager.getMetaCode(item, "ItemUseCount")) || 0) : 0;
    };

    Game_Party.prototype.getUseItemCount = function(item) {
        this.initUseItemCount(item);
        return this._useItemCount[item.id] || 0;
    };

    const _Game_Party_consumeItem = Game_Party.prototype.consumeItem;
    Game_Party.prototype.consumeItem = function(item) {
        if (!!item && $dataItems[item.id] === item && item.consumable) {
            if (this.getUseItemCount(item) > 0) {
                this.useItemCount(item);
                if (this.getUseItemCount(item) > 0) {
                    return;
                }
                this.useItemCountReset(item);
            }
            _Game_Party_consumeItem.apply(this, arguments);
        }
    };

    const _Game_Party_gainItem = Game_Party.prototype.gainItem;
    Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
        const container = this.itemContainer(item);
        if (!!item && !!item.meta.ItemUseCount && container) {
            this.initUseItemCount(item);
            this.setUseItemCount(item);
        }
        _Game_Party_gainItem.apply(this, arguments);
    };

    const _Game_Party_loseItem = Game_Party.prototype.loseItem;
    Game_Party.prototype.loseItem = function(item, amount, includeEquip) {
        _Game_Party_loseItem.apply(this, arguments);
        if (!!item && !!item.meta.ItemUseCount && this.numItems(item) === 0) {
            this.initUseItemCount(item);
            this.useItemCountReset(item);//個数が0なら初期化
        }
    };

    Game_Party.prototype.eventUseCountItem = function(id) {
        const item = $dataItems[id];
        if (!!item && this.numItems(item) > 0) {
            this.consumeItem(item);
        }
    };


    const _Scene_Shop_doSell = Scene_Shop.prototype.doSell;
    Scene_Shop.prototype.doSell = function(number) {
        const count = $gameParty.getUseItemCount(this._item);
        _Scene_Shop_doSell.apply(this, arguments);
        if (!this._item.meta.ItemUseCount) return;
        if ($gameParty.numItems(this._item) === 0) {
            const gold = this.depreciation(this.sellingPrice(), count);
            if (gold > 0) {
                $gameParty.loseGold(gold);
            }
        }
    };

    Scene_Shop.prototype.depreciation = function(price, count) {
        const max = Number(NuunItemUseCountManager.getMetaCode(this._item, "ItemUseCount") || 0);
        if (max > 0) {
            return price - Math.floor(count / max * price);
        }
        return 0;
    };


    const _Window_ItemList_initialize = Window_ItemList.prototype.initialize;
    Window_ItemList.prototype.initialize = function(rect) {
        _Window_ItemList_initialize.apply(this, arguments);
        this._itemUseCountText = "";
        this._itemUseCountTextWidth = 0;
    };

    const _Window_ItemList_drawItem = Window_ItemList.prototype.drawItem;
    Window_ItemList.prototype.drawItem = function(index) {
        const item = this.itemAt(index);
        if (item && item.meta.ItemUseCount && !item.meta.ItemUseCountHide) {
            this._itemUseCountText = " ["+ $gameParty.getUseItemCount(item) +"/"+ item.meta.ItemUseCount +"]";
            this._itemUseCountTextWidth = this.textWidth(this._itemUseCountText);
        } else {
            this._itemUseCountTextWidth = 0;
            this._itemUseCountText = '';
        }
        _Window_ItemList_drawItem.apply(this, arguments);
    };

    const _Window_ItemList_umberWidth = Window_ItemList.prototype.numberWidth;
    Window_ItemList.prototype.numberWidth = function() {
        return _Window_ItemList_umberWidth.apply(this, arguments) + this._itemUseCountTextWidth;
    };

    const _Window_ItemList_drawItemNumber = Window_ItemList.prototype.drawItemNumber;
    Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
        if (this.needsNumber()) {
            const width2 = width - this._itemUseCountTextWidth;
            _Window_ItemList_drawItemNumber.call(this, item, x, y, width2);
            this.drawItemUseCountNumber(item, x, y, width);
        }
    };

    Window_ItemList.prototype.drawItemUseCountNumber = function(item, x, y, width) {
        if (!!item.meta.ItemUseCount) {
            this.drawText(this._itemUseCountText, x, y, width, "right");
        }
    };


})();