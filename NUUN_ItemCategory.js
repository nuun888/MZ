/*:-----------------------------------------------------------------------------------
 * NUUN_ItemCategory.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */
/*:
 * @target MZ
 * @plugindesc Item category customization
 * @author NUUN
 * @version 1.7.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_ItemNum
 * 
 * @help
 * You can add your own categories to your items.
 * Set the category key in the plugin parameters and enter <CategoryType:[typeName]> in the memo field for items, weapons and armor.
 * Items will be displayed in the category with the same category key as the [typeName] entered in the memo field.
 * If you enter "allItems" in the category key, the category excludes hidden items
 * All items are displayed.
 * item:Items without category keys or non-essential items.
 * weapon:Weapons with no category key.
 * armor:Armor with no category key.
 * keyItem:something important.
 * allItems:Items, Weapons, Armor, and all that matters.
 * allItem:all items.
 * 
 * [typeName]:Category key
 * About category keys
 *  item, weapon, armor, and keyItem cannot be used as keys for custom categories.
 * Example
 * <CategoryType:sozai> Items with this tag will appear in the "sozai" category.
 * 
 * Items, Weapons, and Armor Notes
 * <NoItemNum> Do not display the number of items.
 * 
 * If you uncheck the database item category, even if you set it with this plugin, the unchecked category will not be displayed.
 * 
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 3/20/2026 Ver.1.7.0
 * Added a feature to specify the number of columns and rows for categories on the selling screen.
 * Fixed an issue where the category settings were not applied if they were not specified in the selling category field.
 * We have fixed it so that category settings for the sales category can now be applied even after loading.
 * 9/22/2024 Ver.1.6.0
 * Added a function to display only items of a specified category on the item selection screen.
 * 9/12/2024 Ver.1.5.1
 * Added a plugin command that allows you to display specified sales categories.
 * 10/14/2023 Ver.1.5.0
 * Added a function that allows you to set the category to be displayed when selling.
 * 7/16/2023 Ver.1.4.0
 * Added ability to hide the number of specific items, weapons, and armor.
 * 11/12/2022 Ver.1.3.2
 * Changed the display in languages other than Japanese to English.
 * 6/12/2021 Ver.1.3.1
 * Added a function to apply the number hiding even in battle.
 * 5/8/2021 Ver.1.3.0
 * Added a function to change the category to be displayed.
 * Changed the setting method of the category key.
 * 12/28/2021 Ver.1.2.0
 * Added ability to view items and key items.
 * Change category key to combo box.
 * 8/22/2021 Ver.1.1.3
 * Competitive measures by adding a unique category function to the item picture book.
 * 3/15/2021 Ver.1.1.2
 * Fixed an issue where item counts were not displayed during combat.
 * 3/8/2021 Ver.1.1.1
 * Fixed to reflect the display of the number of items other than keyItem in all item display.
 * 3/7/2021 Ver.1.1.0
 * Added a function that allows you to select whether to display the number of items in each category.
 * Fixed to reflect the number of display lines even on the sale screen.
 * 11/18/2020 Ver.1.0.0
 * first edition.
 * 
 * @command AddCategory
 * @desc Change the category to display.
 * @text Display category change
 * 
 * @arg ItemCategory
 * @text Category item
 * @desc Category item settings.
 * @default []
 * @type struct<ItemCategoryList>[]
 * 
 * @arg ItemCategoryCols
 * @desc Number of category cols. Setting this to 0 will use the value set in "CategoryCols".
 * @text Number of category cols
 * @type number
 * @default 0
 * 
 * @arg ItemCategoryRows
 * @desc Number of category rows. Setting this to 0 will use the value set in "CategoryRows".
 * @text Number of category rows
 * @type number
 * @default 0
 * 
 * @command ResetCategory
 * @desc Returns the category to be displayed.
 * @text Display category reset
 * 
 * @command SaleCategoryCommand
 * @desc Change the categories displayed for sale.
 * @text Change display sales category
 * 
 * @arg  SaleCategoryList
 * @text Selling category items
 * @desc Setting up sale category items.
 * @default 
 * @type struct<ItemCategoryList>[]
 * 
 * @arg SaleCategoryCols
 * @desc Number of cols for sale category. Setting this to 0 will use the value set in "SaleCategoryCols".
 * @text Number of columns for sale category
 * @type number
 * @default 0
 * 
 * @arg SaleCategoryRows
 * @desc Number of rows for sale category. Setting this to 0 will use the value set in "SaleCategoryRows".
 * @text Number of rows in the sales category
 * @type number
 * @default 0
 * 
 * @command ResetSaleCategory
 * @desc Change back to the original sales category displayed.
 * @text Display sale category reset
 * 
 * @command SelectCategoryItem
 * @desc Display the item selection screen.
 * @text Item selection screen display
 * 
 * @arg CategoryItemIdVariable
 * @desc Variable that stores the item ID.
 * @text Storage Variables
 * @type variable
 * @default 0
 * 
 * @arg Categorykey
 * @text Category Key
 * @desc Set the category key. If the key is not in the list, enter it directly.
 * @type combo
 * @option 'allItem'
 * @default
 * 
 * 
 * @param CategoryCols
 * @desc The number of display columns for categories.
 * @text Number of categorical columns
 * @type number
 * @default 4
 * 
 * @param CategoryRows
 * @desc The number of rows displayed for categories.
 * @text Number of category rows
 * @type number
 * @default 1
 * 
 * @param ItemCategory
 * @text Category item
 * @desc Category item settings.
 * @default ["{\"CategoryName\":\"\",\"Categorykey\":\"'item'\",\"NumShow\":\"true\"}","{\"CategoryName\":\"\",\"Categorykey\":\"'weapon'\",\"NumShow\":\"true\"}","{\"CategoryName\":\"\",\"Categorykey\":\"'armor'\",\"NumShow\":\"true\"}","{\"CategoryName\":\"\",\"Categorykey\":\"'keyItem'\",\"NumShow\":\"true\"}"]
 * @type struct<ItemCategoryList>[]
 * 
 * @param SaleCategoryCols
 * @desc Number of cols for sale category. 0 represents the number of columns in the item category.
 * @text Number of cols for sale category
 * @type number
 * @default 0
 * 
 * @param SaleCategoryRows
 * @desc Number of rows for sale category. 0 represents the number of rows for the item category.
 * @text Number of rows in the sales category
 * @type number
 * @default 0
 * 
 * @param SaleCategory
 * @text Sale category item
 * @desc Setting of sale category items. If no setting is specified, the "Category item" setting will be applied.
 * @default 
 * @type struct<ItemCategoryList>[]
 * 
 * @param BattleNumVisible
 * @text Hide number during battle
 * @desc Even during battle, the count of category items with "NumShow" turned OFF will be hidden.
 * @type boolean
 * @default true
 * 
 */
/*~struct~ItemCategoryList:
 * 
 * @param CategoryName
 * @text Category name
 * @desc Set the category name.
 * @type string
 * 
 * @param Categorykey
 * @text Category key
 * @desc Set the category key. Example: If it is an item, enter the key that is not in the item list directly.
 * @type combo
 * @option 'item'
 * @option 'weapon'
 * @option 'armor'
 * @option 'keyItem'
 * @option 'allItems'
 * @option 'allItem'
 * @default
 * 
 * @param NumShow
 * @type boolean
 * @default true
 * @text Number display
 * @desc Display the number.
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc アイテムカテゴリーカスタマイズ
 * @author NUUN
 * @version 1.7.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_ItemNum
 * 
 * @help
 * アイテムに独自のカテゴリーを追加することが出来ます。
 * プラグインパラメータでカテゴリーキーを設定し、アイテム、武器、防具のメモ欄に<CategoryType:[typeName]>を記入します。
 * メモ欄に記入した[typeName]と同じカテゴリーキーのカテゴリーにアイテムが表示されるようになります。
 * カテゴリーキーに「allItems」を記入しますと、そのカテゴリーは隠しアイテムを除く
 * 全てのアイテムが表示されます。
 * item:カテゴリーキーのないまたは大事なもの以外のアイテム
 * weapon:カテゴリーキーのない武器
 * armor:カテゴリーキーのない防具
 * keyItem:大事なもの
 * allItems:アイテム、武器、防具、大事なものすべて
 * allItem:全てのアイテム
 * 
 * [typeName]:カテゴリーキー
 * ※カテゴリーキーについて
 *  item、weapon、armor、keyItemは独自カテゴリーのキーには使用できません。
 * 例
 * <CategoryType:sozai> このタグを記入したアイテムはsozaiカテゴリーに表示されます。
 * 
 * データベースのアイテムカテゴリーのチェックを外した場合、このプラグインで設定してもチェックを外したカテゴリーは表示はされません。
 * 
 * アイテム、武器、防具のメモ欄
 * <NoItemNum> アイテムの個数を表示しません。
 * 
 * このプラグインはNUUN_Base Ver.1.3.0以降が必要です。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2026/3/20 Ver.1.7.0
 * 売却画面でカテゴリーの列数、行数を指定できる機能を追加。
 * 売却カテゴリー項目で設定を行ってない場合、カテゴリー項目の設定が適用されなかったもんだを修正。
 * 売却カテゴリーのカテゴリー指定をセーブをまたいで適用できるように修正。
 * 2024/9/22 Ver.1.6.0
 * アイテム選択画面で指定のカテゴリーアイテムのみを表示させる機能を追加。
 * 2024/9/12 Ver.1.5.1
 * 指定の売却カテゴリーを表示できるプラグインコマンドを追加。
 * 2023/10/14 Ver.1.5.0
 * 売却時の表示するカテゴリーを設定できる機能を追加。
 * 2023/7/16 Ver.1.4.0
 * 特定のアイテム、武器、防具の個数を非表示にする機能を追加。
 * 2022/11/12 Ver.1.3.2
 * 日本語以外での表示を英語表示に変更。
 * 2022/6/12 Ver.1.3.1
 * 戦闘中でも個数非表示を適用する機能を追加。
 * 2022/5/8 Ver.1.3.0
 * 表示するカテゴリーを変更する機能を追加。
 * カテゴリーキーの設定方法変更（要再設定）
 * 2021/12/28 Ver.1.2.0
 * アイテムとキーアイテムを表示する機能を追加。
 * カテゴリーキーをコンボボックスに変更。
 * 2021/8/22 Ver.1.1.3
 * アイテム図鑑の独自カテゴリー機能追加による競合対策。
 * 2021/3/15 Ver.1.1.2
 * 戦闘中にアイテムの個数が表示されない問題を修正。
 * 2021/3/8 Ver.1.1.1
 * 全てのアイテム表示でkeyItem以外の個数の表示を反映するように修正。
 * 2021/3/7 Ver.1.1.0
 * 各カテゴリーに個数を表示するか選択できる機能を追加。
 * 売却画面でも表示行数を反映させるように修正。
 * 2020/11/18 Ver.1.0.0
 * 初版
 * 
 * @command AddCategory
 * @desc 表示するカテゴリーを変更します。
 * @text 表示カテゴリー変更
 * 
 * @arg ItemCategory
 * @text カテゴリー項目
 * @desc カテゴリー項目の設定。
 * @default []
 * @type struct<ItemCategoryList>[]
 * 
 * @arg ItemCategoryCols
 * @desc カテゴリーの表示列数。0でカテゴリー列数での設定値
 * @text カテゴリー列数
 * @type number
 * @default 0
 * 
 * @arg ItemCategoryRows
 * @desc カテゴリーの表示行数。0でカテゴリー行数での設定値
 * @text カテゴリー行数
 * @type number
 * @default 0
 * 
 * @command ResetCategory
 * @desc 表示するカテゴリーをもとに戻します。
 * @text 表示カテゴリーリセット
 * 
 * @command SaleCategoryCommand
 * @desc 売却カテゴリーの表示するカテゴリーを変更します。
 * @text 表示売却カテゴリー変更
 * 
 * @arg  SaleCategoryList
 * @text 売却カテゴリー項目
 * @desc 売却カテゴリー項目の設定。設定がない場合はカテゴリー項目で設定したカテゴリーが表示されます。
 * @default 
 * @type struct<ItemCategoryList>[]
 * 
 * @arg SaleCategoryCols
 * @desc 売却カテゴリーの表示列数。0でカテゴリー列数での設定値
 * @text 売却カテゴリー列数
 * @type number
 * @default 0
 * 
 * @arg SaleCategoryRows
 * @desc 売却カテゴリーの表示行数。0でカテゴリー行数での設定値
 * @text 売却カテゴリー行数
 * @type number
 * @default 0
 * 
 * @command ResetSaleCategory
 * @desc 表示する売却カテゴリーをもとに戻します。
 * @text 表示売却カテゴリーリセット
 * 
 * @command SelectCategoryItem
 * @desc アイテム選択画面を表示します。
 * @text アイテム選択画面表示
 * 
 * @arg CategoryItemIdVariable
 * @desc アイテムIDを格納する変数。
 * @text 格納変数
 * @type variable
 * @default 0
 * 
 * @arg Categorykey
 * @text カテゴリーキー
 * @desc カテゴリーキーを設定します。リストにないキーは直接記入してください。
 * @type combo
 * @option 'allItem'
 * @default
 * 
 * 
 * @param CategoryCols
 * @desc カテゴリーの表示列数。
 * @text カテゴリー列数
 * @type number
 * @default 4
 * 
 * @param CategoryRows
 * @desc カテゴリーの表示行数。
 * @text カテゴリー行数
 * @type number
 * @default 1
 * 
 * @param ItemCategory
 * @text カテゴリー項目
 * @desc カテゴリー項目の設定。
 * @default ["{\"CategoryName\":\"\",\"Categorykey\":\"'item'\",\"NumShow\":\"true\"}","{\"CategoryName\":\"\",\"Categorykey\":\"'weapon'\",\"NumShow\":\"true\"}","{\"CategoryName\":\"\",\"Categorykey\":\"'armor'\",\"NumShow\":\"true\"}","{\"CategoryName\":\"\",\"Categorykey\":\"'keyItem'\",\"NumShow\":\"true\"}"]
 * @type struct<ItemCategoryList>[]
 * 
 * @param SaleCategoryCols
 * @desc 売却カテゴリーの表示列数。0でアイテムカテゴリーの列数
 * @text 売却カテゴリー列数
 * @type number
 * @default 0
 * 
 * @param SaleCategoryRows
 * @desc 売却カテゴリーの表示行数。0でアイテムカテゴリーの行数
 * @text 売却カテゴリー行数
 * @type number
 * @default 0
 * 
 * @param SaleCategory
 * @text 売却カテゴリー項目
 * @desc 売却カテゴリー項目の設定。設定がない場合はカテゴリー項目で設定したカテゴリーが表示されます。
 * @default 
 * @type struct<ItemCategoryList>[]
 * 
 * @param BattleNumVisible
 * @text 戦闘中個数非表示
 * @desc 戦闘中でも個数表示をOFF、大事なものの個数を表示をOFFにしたカテゴリーアイテムの個数非表示を適用させます。
 * @type boolean
 * @default true
 * 
 */
/*~struct~ItemCategoryList:ja
 * @param CategoryName
 * @text カテゴリー名
 * @desc カテゴリー名を設定します。
 * @type string
 * 
 * @param Categorykey
 * @text カテゴリーキー
 * @desc カテゴリーキーを設定します。例:アイテムならitem リストにないキーは直接記入してください。
 * @type combo
 * @option 'item'
 * @option 'weapon'
 * @option 'armor'
 * @option 'keyItem'
 * @option 'allItems'
 * @option 'allItem'
 * @default
 * 
 * @param NumShow
 * @type boolean
 * @default true
 * @text 個数表示
 * @desc 個数を表示する。
 * 
 */
var Imported = Imported || {};
Imported.NUUN_ItemCategory = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;
    const CategoryCols = params.CategoryCols || 4;
    const CategoryRows = params.CategoryRows || 1;
    const ItemCategory = params.ItemCategory;
    const SaleCategory = params.SaleCategory;
    const BattleNumVisible = params.BattleNumVisible;
    let itemData = null;

    PluginManager.registerCommand(pluginName, 'AddCategory', args => {
        const categoryData = {};
        categoryData.itemCategory = DataManager.nuun_structureData(args.ItemCategory) || null;
        categoryData.itemCategoryCols = Number(args.ItemCategoryCols) || CategoryCols;
        categoryData.itemCategoryRows = Number(args.ItemCategoryRows) || CategoryRows;
        $gameSystem.itemCategory = categoryData;
    });

    PluginManager.registerCommand(pluginName, 'ResetCategory', args => {
        $gameSystem.itemCategory = {};
    });

    PluginManager.registerCommand(pluginName, 'SaleCategoryCommand', args => {
        const categoryData = {};
        categoryData.saleCategory = DataManager.nuun_structureData(args.SaleCategoryList) || null;
        categoryData.saleCategoryCols = Number(args.SaleCategoryCols) || $gameSystem.getItemCategoryCols();
        categoryData.saleCategoryRows = Number(args.SaleCategoryRows) || $gameSystem.getItemCategoryRows();
        $gameSystem.saleCategory = categoryData;
    });

    PluginManager.registerCommand(pluginName, 'ResetSaleCategory', args => {
        $gameSystem.saleCategory = {};
    });

    PluginManager.registerCommand(pluginName, 'SelectCategoryItem', args => {
        Game_Interpreter.prototype.command104([Number(args.CategoryItemIdVariable), getKey(args.Categorykey)]);
    });

    function getKey(param) {
        try {
            return eval(param)
        } catch (error) {
            return String(param);
        }
    };


    Game_System.prototype.getItemCategory = function() {
        return this.itemCategory && this.itemCategory.itemCategory && this.itemCategory.itemCategory.length > 0 ? 
        this.itemCategory.itemCategory : ItemCategory;
    };

    Game_System.prototype.getItemCategoryCols = function() {
        return this.itemCategory && this.itemCategory.itemCategoryCols ? 
        this.itemCategory.itemCategoryCols : CategoryCols;
    };

    Game_System.prototype.getItemCategoryRows = function() {
        return this.itemCategory && this.itemCategory.itemCategoryRows ? 
        this.itemCategory.itemCategoryRows : CategoryRows;
    };

    Game_System.prototype.getSaleCategory = function() {
        return this.saleCategory && this.saleCategory.saleCategory && this.saleCategory.saleCategory.length > 0 ? 
        this.saleCategory.saleCategory : (SaleCategory && SaleCategory.length > 0 ? SaleCategory : ItemCategory);
    };

    Game_System.prototype.getSaleCategoryCols = function() {
        return this.saleCategory && this.saleCategory.saleCategoryCols ? 
        this.saleCategory.saleCategoryCols : params.SaleCategoryCols > 0 ? params.SaleCategoryCols : this.getItemCategoryCols();
    };

    Game_System.prototype.getSaleCategoryRows = function() {
        return this.saleCategory && this.saleCategory.saleCategoryRows ? 
        this.saleCategory.saleCategoryRows : params.SaleCategoryRows > 0 ? params.SaleCategoryRows : this.getItemCategoryRows();
    };

    Game_System.prototype.isSaleCategory = function() {
        return (this.saleCategory && this.saleCategory.saleCategory) || (SaleCategory && SaleCategory.length > 0);
    };

    const _Scene_Item_categoryWindowRect = Scene_Item.prototype.categoryWindowRect;
    Scene_Item.prototype.categoryWindowRect = function() {
        const rect = _Scene_Item_categoryWindowRect.call(this);
        rect.height = this.calcWindowHeight($gameSystem.getItemCategoryRows(), true);
        return rect;
    };


    Scene_Shop.prototype.createCategoryWindow = function() {
        const rect = this.categoryWindowRect();
        this._categoryWindow = $gameSystem.isSaleCategory() ? new Window_ItemShopCategory(rect) : new Window_ItemCategory(rect);
        this._categoryWindow.setHelpWindow(this._helpWindow);
        this._categoryWindow.hide();
        this._categoryWindow.deactivate();
        this._categoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
        this._categoryWindow.setHandler("cancel", this.onCategoryCancel.bind(this));
        this.addWindow(this._categoryWindow);
    };

    const _Scene_Shop_categoryWindowRect = Scene_Shop.prototype.categoryWindowRect;
    Scene_Shop.prototype.categoryWindowRect = function() {
        const rect = _Scene_Shop_categoryWindowRect.call(this);
        rect.height = this.calcWindowHeight($gameSystem.getSaleCategoryRows(), true);
        return rect;
    };

    Window_Selectable.prototype.getItemCategoryList = function() {
        return $gameSystem.getItemCategory();
    };

    Window_ItemCategory.prototype.maxCols = function() {
        return $gameSystem.getItemCategoryCols();
    };

    Window_ItemCategory.prototype.makeCommandList = function() {
        const list = this.getItemCategoryList();
            if(!list) {
            return;
        }
        list.forEach(names => {
            if(this.needsCommand(names.Categorykey) && names.Categorykey === 'item') {
            this.addCommand(TextManager.item, names.Categorykey);
            } else if(this.needsCommand(names.Categorykey) && names.Categorykey === 'weapon') {
            this.addCommand(TextManager.weapon, names.Categorykey);
            } else if(this.needsCommand(names.Categorykey) && names.Categorykey === 'armor') {
            this.addCommand(TextManager.armor, names.Categorykey);
            } else if(this.needsCommand(names.Categorykey) && names.Categorykey === 'keyItem') {
            this.addCommand(TextManager.keyItem, names.Categorykey);
            } else if (this.needsCommand(names.Categorykey) && names.Categorykey === 'allItems') {
            this.addCommand(names.CategoryName, names.Categorykey);
            } else if(this.needsCommand(names.Categorykey) && names.CategoryName) { 
            this.addCommand(names.CategoryName, names.Categorykey);
            }
        });
    };

    const _Window_ItemList_includes = Window_ItemList.prototype.includes;
    Window_ItemList.prototype.includes = function(item) {
        if (this.isConstructor()) {
            return _Window_ItemList_includes.call(this, item);
        }
        if(this._category === 'allItems' && !this.secretItem(item) && item) {
            return true;
        } else if (this._category === 'allItem' && DataManager.isItem(item) && (item.itypeId === 1 || item.itypeId === 2)) {
            return true;
        }
        const type = item ? item.meta.CategoryType : null;
        const category = _Window_ItemList_includes.call(this, item);
        if(category && !type) {
            return category;
        }
        if (this._category === type) {
            return true;
        }
        return false;
    };

    Window_ItemList.prototype.secretItem = function(item) {
        if(DataManager.isItem(item) && item.itypeId > 2) {
            return true;
        }
        return false;
    };

    const _Window_ItemList_drawItemNumber = Window_ItemList.prototype.drawItemNumber;
    Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
        if (this.allItemsNeedsNumber(item)) {
            _Window_ItemList_drawItemNumber.call(this, item, x, y, width);
        }
    };

    const _Window_ItemList_drawItem = Window_ItemList.prototype.drawItem;
    Window_ItemList.prototype.drawItem = function(index) {
        itemData = this.itemAt(index);
        _Window_ItemList_drawItem.call(this, index);
    };

    Window_ItemList.prototype.needsNumber = function() {
        if (BattleNumVisible && itemData && $gameParty.inBattle()) {
            this._category = itemData.meta.CategoryType ? itemData.meta.CategoryType : (itemData.itypeId === 2 ? "keyItem" : this._needsCategory);
        }
        if (this._category === "keyItem") {  
            return $dataSystem.optKeyItemsNumber;
        }
        if (itemData && itemData.meta.NoItemNum) {
            return false;
        }
        return this._needsCategory === undefined || this._needsCategory === null ? true : this._needsCategory;
    };

    Window_ItemList.prototype.allItemsNeedsNumber = function(item) {
        if (this._category === "allItems") {
            if (item.itypeId === 2) {
            return $dataSystem.optKeyItemsNumber;
            } else if (item.meta.CategoryType) {
            const list = this.getItemCategoryList();
            const find = list.find(date => date.Categorykey === item.meta.CategoryType);
            if (find && find.NumShow !== undefined) {
                return find.NumShow;
            }
            return true;
            } 
        }
        return true;
    };

    const _Window_ItemList_setCategory = Window_ItemList.prototype.setCategory;
    Window_ItemList.prototype.setCategory = function(category) {
        if (this._category !== category) {
            this._needsCategory = true;
            const list = this.getItemCategoryList();
            if (list) {
                const find = list.find(date => date.Categorykey === category);
                if (find) {
                    this._needsCategory = (find.NumShow === undefined ? true : find.NumShow);
                }
            }
        }
        _Window_ItemList_setCategory.call(this, category);
    };


    function Window_ItemShopCategory() {
        this.initialize(...arguments);
    }

    Window_ItemShopCategory.prototype = Object.create(Window_ItemCategory.prototype);
    Window_ItemShopCategory.prototype.constructor = Window_ItemShopCategory;

    Window_ItemShopCategory.prototype.initialize = function(rect) {
        Window_ItemCategory.prototype.initialize.call(this, rect);
    };

    Window_ItemShopCategory.prototype.getItemCategoryList = function() {
        return $gameSystem.getSaleCategory();
    };

    Window_ItemShopCategory.prototype.maxCols = function() {
        return $gameSystem.getSaleCategoryCols();
    };


    const _Window_EventItem_includes = Window_EventItem.prototype.includes;
    Window_EventItem.prototype.includes = function(item) {
        const itypeId = $gameMessage.itemChoiceItypeId();
        if (DataManager.isItem(item) && isNaN(itypeId)) {
            if (itypeId === 'allItems' && !this.secretItem(item)) {
                return true;
            } else if (itypeId === 'allItem' && DataManager.isItem(item) && (item.itypeId === 1 || item.itypeId === 2)) {
                return true;
            } else if (itypeId === this.getItemType(item)) {
                return true;
            }
            return false;
        } else {
            return _Window_EventItem_includes.apply(this, arguments);
        }
    };

    Window_EventItem.prototype.getItemType = function(item) {
        return item.meta.CategoryType;
    };

})();