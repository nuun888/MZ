/*:-----------------------------------------------------------------------------------
 * NUUN_PurchaseCategory.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Shop purchase category
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.1.0
 * 
 * @help
 * Display the item category on the purchase screen of the shop.
 * 
 * Plugin command
 * Change display category of purchase
 *  Set the categories to display.
 *  A separate "NUUN_ItemCategory" is required to display with any key.
 * 
 * Purchase display category reset
 *  Resets the category settings set in Change Display Category of Purchases.
 *  Returns to default state.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 12/10/2022 Ver.1.1/0
 * Added a switch that allows you to set whether to display or hide the category display.
 * 12/7/2022 Ver.1.0.2
 * Added a switch to show/hide categories.
 * 12/3/2022 Ver.1.0.1
 * Minor fix.
 * 12/3/2022 Ver.1.0.0
 * First edition.
 * 
 * @param BuyCategoryCols
 * @desc The number of display columns for categories.
 * @text Number of category col
 * @type number
 * @default 3
 * 
 * @param BuyCategoryRows
 * @desc The number of rows displayed for categories.
 * @text Number of category rows
 * @type number
 * @default 1
 * 
 * @param BuyCategoryWidthMode
 * @text Category display width mode
 * @desc Makes the width of the item category at the time of purchase the width of the purchase window.(false: UI size)
 * @type boolean
 * @default true
 * 
 * @param ShowKeyItem
 * @text Key Item display
 * @desc Key Item is displayed in the category at the time of purchase.
 * @type boolean
 * @default false
 * 
 * @param BuyCategorySwitch
 * @desc A switch that applies the purchase category. A setting of 0 will always show the category.
 * @text Purchasing category applicable switch ID
 * @type switch
 * @default 0
 * 
 * 
 * @command AddBuyCategory
 * @desc Change the displayed category of purchases.
 * @text Change display category of purchase
 * 
 * @arg ItemBuyCategory
 * @text Purchasing category item
 * @desc Setting of category items for purchase.
 * @default []
 * @type struct<ItemBuyCategoryList>[]
 * 
 * @command ResetBuyCategory
 * @desc Resets the displayed category of purchases.
 * @text Purchase display category reset
 * 
 */
/*~struct~ItemBuyCategoryList:
 * 
 * @param CategoryName
 * @text Category name
 * @desc Set the category name to display.
 * @type string
 * 
 * @param Categorykey
 * @text Category key
 * @desc Set the category key.
 * @type combo
 * @option 'item'
 * @option 'weapon'
 * @option 'armor'
 * @option 'keyItem'
 * @default
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc ショップ購入カテゴリー表示
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.1.0
 * 
 * @help
 * ショップの購入画面にアイテムカテゴリーを表示します。
 * 
 * プラグインコマンド
 * 購入時表示カテゴリー変更
 *  表示するカテゴリーを設定します。
 *  任意のキーで表示するには別途「NUUN_ItemCategory」が必要です。
 * 
 * 購入表示カテゴリーリセット
 *  購入時表示カテゴリー変更で設定したカテゴリー設定をリセットします。
 *  デフォルトの状態に戻ります。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/12/10 Ver.1.1.0
 * カテゴリー表示の表示、非表示を設定出来るスイッチを追加。
 * 2022/12/7 Ver.1.0.2
 * カテゴリーを表示非表示を設定できるスイッチを追加。
 * 2022/12/3 Ver.1.0.1
 * 微修正。
 * 2022/12/3 Ver.1.0.0
 * 初版
 * 
 * @param BuyCategoryCols
 * @desc カテゴリーの表示列数。
 * @text カテゴリー列数
 * @type number
 * @default 3
 * 
 * @param BuyCategoryRows
 * @desc カテゴリーの表示行数。
 * @text カテゴリー行数
 * @type number
 * @default 1
 * 
 * @param BuyCategoryWidthMode
 * @text カテゴリー表示幅モード
 * @desc 購入時のアイテムカテゴリーの幅を購入ウィンドウの幅にします。(false:UIサイズ)
 * @type boolean
 * @default true
 * 
 * @param ShowKeyItem
 * @text 大事なもの表示
 * @desc 購入時のカテゴリーに大事なものを表示します。
 * @type boolean
 * @default false
 * 
 * @param BuyCategorySwitch
 * @desc 購入時のカテゴリーを適用するスイッチ。0で常にカテゴリーが表示されます。
 * @text 購入時カテゴリー適用スイッチID
 * @type switch
 * @default 0
 * 
 * 
 * @command AddBuyCategory
 * @desc 購入時の表示するカテゴリーを変更します。
 * @text 購入時表示カテゴリー変更
 * 
 * @arg ItemBuyCategory
 * @text 購入時カテゴリー項目
 * @desc 購入時カテゴリー項目の設定。
 * @default []
 * @type struct<ItemBuyCategoryList>[]
 * 
 * @command ResetBuyCategory
 * @desc 購入時の表示するカテゴリーをもとに戻します。
 * @text 購入表示カテゴリーリセット
 * 
 */
/*~struct~ItemBuyCategoryList:ja
 * 
 * @param CategoryName
 * @text カテゴリー名
 * @desc カテゴリー名を設定します。
 * @type string
 * 
 * @param Categorykey
 * @text カテゴリーキー
 * @desc カテゴリーキーを設定します。
 * @type combo
 * @option 'item'
 * @option 'weapon'
 * @option 'armor'
 * @option 'keyItem'
 * @default
 * 
 */
var Imported = Imported || {};
Imported.NUUN_PurchaseCategory = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_PurchaseCategory');
    const BuyCategoryCols = Number(parameters['BuyCategoryCols'] || 3);
    const BuyCategoryRows = Number(parameters['BuyCategoryRows'] || 1);
    const BuyCategoryWidthMode = eval(parameters['BuyCategoryWidthMode'] || 'true');
    const ShowKeyItem = eval(parameters['ShowKeyItem'] || 'false');
    const BuyCategorySwitch = Number(parameters['BuyCategorySwitch'] || 0);

    const pluginName = "NUUN_PurchaseCategory";
    PluginManager.registerCommand(pluginName, 'AddBuyCategory', args => {
        $gameSystem.itemBuyCategory = DataManager.nuun_structureData(args.ItemBuyCategory) || null;
    });

    PluginManager.registerCommand(pluginName, 'ResetBuyCategory', args => {
        $gameSystem.itemBuyCategory = null;
    });

    function isBuyCategorySwitch() {
        return BuyCategorySwitch === 0 || BuyCategorySwitch > 0 && $gameSwitches.value(BuyCategorySwitch);
    };
    
    const _Scene_Shop_create = Scene_Shop.prototype.create;
    Scene_Shop.prototype.create = function() {
        _Scene_Shop_create.call(this);
        this.createBuyCategoryWindow();
        this.fixSellWindow();
    };

    Scene_Shop.prototype.createBuyCategoryWindow = function() {
        const rect = this.buyCategoryWindowRect();
        this._buyCategoryWindow = new Window_ItemBuyCategory(rect);
        this._buyCategoryWindow.setHelpWindow(this._helpWindow);
        this._buyCategoryWindow.hide();
        this._buyCategoryWindow.deactivate();
        this._buyCategoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
        this._buyCategoryWindow.setHandler("cancel", this.onCategoryCancel.bind(this));
        this.addWindow(this._buyCategoryWindow);
        this._buyCategoryWindow.setItemWindow(this._buyWindow);
    };
    
    Scene_Shop.prototype.buyCategoryWindowRect = function() {
        const wx = this._buyWindow.x;
        const wy = this._dummyWindow.y;
        const ww = BuyCategoryWidthMode ? this._buyWindow.width : Graphics.boxWidth;
        const wh = this.calcWindowHeight(BuyCategoryRows , true);
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Shop.prototype.fixSellWindow = function() {
        if (this._buyCategoryWindow.needsSelection()) {
            this._buyWindow.y += this._buyCategoryWindow.height;
            this._buyWindow.height -= this._buyCategoryWindow.height;
            if (!BuyCategoryWidthMode) {
                this._statusWindow.y += this._buyCategoryWindow.height;
                this._statusWindow.height -= this._buyCategoryWindow.height;
            }
        }
    };

    const _Scene_Shop_commandBuy = Scene_Shop.prototype.commandBuy;
    Scene_Shop.prototype.commandBuy = function() {
        this._buyCategoryWindow.setItemWindow(this._buyWindow);
        this._dummyWindow.hide();
        this._buyWindow.setMoney(this.money());
        this._buyWindow.show();
        this._buyWindow.deselect();
        this._statusWindow.show();
        this._buyWindow.refresh();
        if (this._buyCategoryWindow.needsSelection()) {
            this._buyCategoryWindow.show();
            this._buyCategoryWindow.activate();
        } else {
            this.onCategoryOk();
        }
    };

    const _Scene_Shop_activateBuyWindow = Scene_Shop.prototype.activateBuyWindow;
    Scene_Shop.prototype.activateBuyWindow = function() {
        if (this._buyCategoryWindow.needsSelection()) {
            this._buyCategoryWindow.show();
        }
        _Scene_Shop_activateBuyWindow.call(this);
    };

    const _Scene_Shop_onCategoryOk = Scene_Shop.prototype.onCategoryOk;
    Scene_Shop.prototype.onCategoryOk = function() {
        const symbol = this._commandWindow.currentSymbol();
        if (symbol === "buy") {
            this.activateBuyWindow();
            this._buyWindow.select(0);
        } else if (symbol === "sell") {
            _Scene_Shop_onCategoryOk.call(this);
        }
    };

    const _Scene_Shop_onCategoryCancel = Scene_Shop.prototype.onCategoryCancel;
    Scene_Shop.prototype.onCategoryCancel = function() {
        _Scene_Shop_onCategoryCancel.call(this);
        if (this._commandWindow.currentSymbol() === "buy") {
            this._buyCategoryWindow.hide();
            this._buyWindow.hide();
            this._statusWindow.hide();
        }
    };

    Scene_Shop.prototype.onBuyCancel = function() {//再定義
        this._buyWindow.deselect();
        this._statusWindow.setItem(null);
        this._helpWindow.clear();
        if (this._buyCategoryWindow.needsSelection()) {
            this._buyCategoryWindow.activate();
        } else {
            this.onCategoryCancel();
        }
    };

    const _Scene_Shop_onBuyOk = Scene_Shop.prototype.onBuyOk;
    Scene_Shop.prototype.onBuyOk = function() {
        _Scene_Shop_onBuyOk.call(this);
        this._buyCategoryWindow.hide();
    };


    function Window_ItemBuyCategory() {
        this.initialize(...arguments);
    }
    
    Window_ItemBuyCategory.prototype = Object.create(Window_ItemCategory.prototype);
    Window_ItemBuyCategory.prototype.constructor = Window_ItemBuyCategory;
    
    Window_ItemBuyCategory.prototype.initialize = function(rect) {
        Window_ItemCategory.prototype.initialize.call(this, rect);
    };

    Window_ItemBuyCategory.prototype.maxCols = function() {
        return BuyCategoryCols;
    };

    Window_ItemBuyCategory.prototype.makeCommandList = function() {
        const list = $gameSystem.itemBuyCategory;
        if (isBuyCategorySwitch()) {
            if (list && list.length > 0) {
                for (const command of list) {
                    if(this.needsCommand(command.Categorykey) && command.Categorykey === 'item') {
                        this.addCommand(TextManager.item, command.Categorykey);
                    } else if(this.needsCommand(command.Categorykey) && command.Categorykey === 'weapon') {
                        this.addCommand(TextManager.weapon, command.Categorykey);
                    } else if(this.needsCommand(command.Categorykey) && command.Categorykey === 'armor') {
                        this.addCommand(TextManager.armor, command.Categorykey);
                    } else if(ShowKeyItem && this.needsCommand(command.Categorykey) && command.Categorykey === 'keyItem') {
                        this.addCommand(TextManager.keyItem, command.Categorykey);
                    } else if (this.needsCommand(ncommand.Categorykey) && command.Categorykey === 'allItems') {
                        this.addCommand(command.CategoryName, command.Categorykey);
                    } else if(this.needsCommand(names.Categorykey) && command.CategoryName) { 
                        this.addCommand(command.CategoryName, command.Categorykey);
                    }
                }
            } else {
                Window_ItemCategory.prototype.makeCommandList.call(this);
                if (!ShowKeyItem) {
                    const index = this._list.findIndex(command => command.symbol === 'keyItem');
                    this._list.splice(index, 1);
                }
            }
        }
    };
    
    Window_ItemBuyCategory.prototype.needsSelection = function() {
        return Window_ItemCategory.prototype.needsSelection.call(this) && isBuyCategorySwitch();
    };


    const _Window_ShopBuy_initialize = Window_ShopBuy.prototype.initialize;
    Window_ShopBuy.prototype.initialize = function(rect) {
        _Window_ShopBuy_initialize.call(this, rect);
        this._category = "none";
    };

    Window_ShopBuy.prototype.setCategory = function(category) {
        if (this._category !== category) {
            this._category = category;
            this.refresh();
            this.scrollTo(0, 0);
        }
    };

    const _Window_ShopBuy_goodsToItem = Window_ShopBuy.prototype.goodsToItem;
    Window_ShopBuy.prototype.goodsToItem = function(goods) {
        const item = _Window_ShopBuy_goodsToItem.call(this, goods);
        return item && this.includes(item) ? item : null;
    };

    Window_ShopBuy.prototype.includes = function(item) {
        return isBuyCategorySwitch() ? Window_ItemList.prototype.includes.call(this, item) : true;
    };

    Window_ShopBuy.prototype.isConstructor = function() {
        return false;
    };
      

})();