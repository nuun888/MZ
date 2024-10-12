/*:-----------------------------------------------------------------------------------
 * NUUN_ItemListImage .js
 * 
 * Copyright (C) 2024 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Item list imaging
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @orderBefore NUUN_ItemNum
 * @version 1.0.1
 * 
 * @help
 * Displays images in the item list.
 * 
 * Item Notes
 * <ItemListImg:[url]> Displays the image.
 * [url]:Images directly under pictures
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 10/13/2024 Ver.1.0.1
 * Fixed Exclude unused files in settings images to exclude them.
 * 10/12/2024 Ver.1.0.0
 * First edition.
 * 
 * @param ItemNameShow
 * @text Item Name Display
 * @desc Displays the item name.
 * @type boolean
 * @default true
 * 
 * @param ItemSetting
 * @text Item Settings
 * @default ------------------------------
 * 
 * @param ItemWindowSetting
 * @desc Sets the display settings for the item window.
 * @text Item window display settings
 * @type struct<ItemImgSetting>
 * @default {"ItemImgCols":"5","ItemRectHeight":"0","ItemNameX":"0","ItemNameY":"112","ItemNumberX":"0","ItemNumberY":"0","ItemBitmapX":"-1"}
 * @parent ItemSetting
 * 
 * @param ShopItemSetting
 * @text Shop Settings
 * @default ------------------------------
 * 
 * @param ShopWindowBuySetting
 * @desc Sets the display settings for the shop window when purchasing.
 * @text Shop window purchase display settings
 * @type struct<ItemImgSetting>
 * @default {"ItemImgCols":"3","ItemRectHeight":"0","ItemNameX":"0","ItemNameY":"112","ItemNumberX":"0","ItemNumberY":"0","ItemBitmapX":"-1"}
 * @parent ShopItemSetting
 * 
 * @param ShopWindowSellSetting
 * @desc Sets the display settings for the shop window when selling.
 * @text Shop window display settings when selling
 * @type struct<ItemImgSetting>
 * @default {"ItemImgCols":"5","ItemRectHeight":"0","ItemNameX":"0","ItemNameY":"112","ItemNumberX":"0","ItemNumberY":"0","ItemBitmapX":"-1"}
 * @parent ShopItemSetting
 * 
 * @param EquipItemSetting
 * @text Equipment list settings
 * @default ------------------------------
 * 
 * @param EquipWindowSetting
 * @desc Sets the display settings for the equipment window.
 * @text Equipment window display settings
 * @type struct<ItemImgSetting>
 * @default {"ItemImgCols":"3","ItemRectHeight":"0","ItemNameX":"0","ItemNameY":"112","ItemNumberX":"0","ItemNumberY":"0","ItemBitmapX":"-1"}
 * @parent EquipItemSetting
 * 
 * @param BattleItemSetting
 * @text Battle Item List Settings
 * @default ------------------------------
 * 
 * @param BattleWindowSetting
 * @desc Sets the display settings for the battle item window.
 * @text Battle item window display settings
 * @type struct<ItemImgSetting>
 * @default {"ItemImgCols":"5","ItemRectHeight":"0","ItemNameX":"0","ItemNameY":"112","ItemNumberX":"0","ItemNumberY":"0","ItemBitmapX":"-1"}
 * @parent BattleItemSetting
 * 
 */
/*~struct~ItemImgSetting:
 * 
 * @param ItemImgCols
 * @text Number of columns in item list
 * @desc The number of columns in the item window.
 * @type number
 * @default 5
 * @min 1
 * 
 * @param ItemRectHeight
 * @text Item Height
 * @desc The height of the item. 0 is the same as the width.
 * @type number
 * @default 0
 * 
 * @param ItemNameX
 * @text Item name X coordinate
 * @desc Item name X coordinate.
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param ItemNameY
 * @desc Item name Y coordinate.
 * @text Item name Y coordinate
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param ItemNumberX
 * @text Item quantity (selling price) X coordinate
 * @desc X coordinate of item quantity (selling price)
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param ItemNumberY
 * @desc Y coordinate of item quantity (selling price)
 * @text Item quantity (selling price) Y coordinate
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param ItemBitmapX
 * @text Item image X coordinate
 * @desc X coordinate of item image (-1 is center)
 * @type number
 * @default -1
 * @min -1
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc アイテムリスト画像化
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @orderBefore NUUN_ItemNum
 * @version 1.0.1
 * 
 * @help
 * アイテム一覧に画像を表示させます。
 * 
 * アイテムのメモ欄
 * <ItemListImg:[url]> 画像を表示します。
 * [url]:pictures直下の画像
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/10/13 Ver.1.0.1
 * 設定画像の未使用ファイルを除外するを除外するように修正。
 * 2024/10/12 Ver.1.0.0
 * 初版
 * 
 * @param ItemNameShow
 * @text アイテム名表示
 * @desc アイテム名を表示します。
 * @type boolean
 * @default true
 * 
 * @param ItemSetting
 * @text アイテム設定
 * @default ------------------------------
 * 
 * @param ItemWindowSetting
 * @desc アイテムウィンドウの表示設定を行います。
 * @text アイテムウィンドウ表示設定
 * @type struct<ItemImgSetting>
 * @default {"ItemImgCols":"5","ItemRectHeight":"0","ItemNameX":"0","ItemNameY":"112","ItemNumberX":"0","ItemNumberY":"0","ItemBitmapX":"-1"}
 * @parent ItemSetting
 * 
 * @param ShopItemSetting
 * @text ショップ設定
 * @default ------------------------------
 * 
 * @param ShopWindowBuySetting
 * @desc ショップウィンドウの購入時の表示設定を行います。
 * @text ショップウィンドウ購入時表示設定
 * @type struct<ItemImgSetting>
 * @default {"ItemImgCols":"3","ItemRectHeight":"0","ItemNameX":"0","ItemNameY":"112","ItemNumberX":"0","ItemNumberY":"0","ItemBitmapX":"-1"}
 * @parent ShopItemSetting
 * 
 * @param ShopWindowSellSetting
 * @desc ショップウィンドウの売却時の表示設定を行います。
 * @text ショップウィンドウ売却時表示設定
 * @type struct<ItemImgSetting>
 * @default {"ItemImgCols":"5","ItemRectHeight":"0","ItemNameX":"0","ItemNameY":"112","ItemNumberX":"0","ItemNumberY":"0","ItemBitmapX":"-1"}
 * @parent ShopItemSetting
 * 
 * @param EquipItemSetting
 * @text 装備一覧設定
 * @default ------------------------------
 * 
 * @param EquipWindowSetting
 * @desc 装備ウィンドウの表示設定を行います。
 * @text 装備ウィンドウ表示設定
 * @type struct<ItemImgSetting>
 * @default {"ItemImgCols":"3","ItemRectHeight":"0","ItemNameX":"0","ItemNameY":"112","ItemNumberX":"0","ItemNumberY":"0","ItemBitmapX":"-1"}
 * @parent EquipItemSetting
 * 
 * @param BattleItemSetting
 * @text 戦闘アイテム一覧設定
 * @default ------------------------------
 * 
 * @param BattleWindowSetting
 * @desc 戦闘アイテムウィンドウの表示設定を行います。
 * @text 戦闘アイテムウィンドウ表示設定
 * @type struct<ItemImgSetting>
 * @default {"ItemImgCols":"5","ItemRectHeight":"0","ItemNameX":"0","ItemNameY":"112","ItemNumberX":"0","ItemNumberY":"0","ItemBitmapX":"-1"}
 * @parent BattleItemSetting
 * 
 * @noteParam ItemListImg
 * @noteDir img/pictures
 * @noteType file
 * @noteData items
 * 
 */
/*~struct~ItemImgSetting:ja
 * 
 * @param ItemImgCols
 * @text アイテム一覧列数
 * @desc アイテムウィンドウの列数。
 * @type number
 * @default 5
 * @min 1
 * 
 * @param ItemRectHeight
 * @text 項目高さ
 * @desc 項目の高さ。0で横幅と同じ
 * @type number
 * @default 0
 * 
 * @param ItemNameX
 * @text アイテム名X座標
 * @desc アイテム名のX座標
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param ItemNameY
 * @desc アイテム名のY座標
 * @text アイテム名Y座標
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param ItemNumberX
 * @text アイテム個数(売値)X座標
 * @desc アイテム個数(売値)のX座標
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param ItemNumberY
 * @desc アイテム個数(売値)のY座標
 * @text アイテム個数(売値)Y座標
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param ItemBitmapX
 * @text アイテム画像X座標
 * @desc アイテム画像のX座標(-1で中央)
 * @type number
 * @default -1
 * @min -1
 * 
 */

var Imported = Imported || {};
Imported.NUUN_ItemListImage = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const ItemWindowSetting = _getSettingParam(params.ItemWindowSetting);
    const ShopWindowBuySetting = _getSettingParam(params.ShopWindowBuySetting);
    const ShopWindowSellSetting = _getSettingParam(params.ShopWindowSellSetting);
    const EquipWindowSetting = _getSettingParam(params.EquipWindowSetting);
    const BattleWindowSetting = _getSettingParam(params.BattleWindowSetting);

    function _getSettingParam(param) {
        if (!param) {
            const log = ($gameSystem.isJapanese() ? "入力データがありません。" : "");
            throw ["ParameterError", log];
        }
        return param;
    }

    Window_Selectable.prototype.getItemImgNameX = function() {
        return ItemWindowSetting.ItemNameX;
    };

    Window_Selectable.prototype.getItemImgNameY = function() {
        return ItemWindowSetting.ItemNameY;
    };

    Window_Selectable.prototype.getItemImgNumberX = function() {
        return ItemWindowSetting.ItemNumberX;
    };

    Window_Selectable.prototype.getItemImgNumberY = function() {
        return ItemWindowSetting.ItemNumberY;
    };

    Window_Selectable.prototype.getItemBitmapX = function() {
        return ItemWindowSetting.ItemBitmapX;
    };

    Window_Selectable.prototype.getItemBitmapY = function() {
        return 0;
    };

    Window_Selectable.prototype.isItemName = function() {
        return params.ItemNameShow;
    };

    Window_Selectable.prototype.getItemBitmap = function(item) {
        _metaCheck(item.meta.ItemListImg)
        return item.meta.ItemListImg ? ImageManager.nuun_LoadPictures("pictures/"+ item.meta.ItemListImg) : null
    };

    Window_Selectable.prototype.drawItemGraphic = function(bitmap, x, y, width, height) {
        const scale_x = width / bitmap.width;
        const scale_y = height / bitmap.height;
        const scale = Math.min(scale_x, scale_y);
        const itemBitmapX = this.getItemBitmapX();
        const x2 = itemBitmapX >= 0 ? itemBitmapX : (width / 2 - (bitmap.width / 2 * scale)) + x;
        const y2 = y + this.getItemBitmapY();
        this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x2, y2, Math.floor(bitmap.width * scale), Math.floor(bitmap.height * scale));
    };

    Window_ItemList.prototype.maxCols = function() {
        return ItemWindowSetting.ItemImgCols;
    };

    Window_ItemList.prototype.itemHeight = function() {
        return ItemWindowSetting.ItemRectHeight > 0 ? ItemWindowSetting.ItemRectHeight : this.defaultItemHeight(); 
    };

    Window_Selectable.prototype.defaultItemHeight = function() {
        return (Math.floor(this.innerWidth / this.maxCols()) - this.rowSpacing() * 2); 
    };

    Window_ItemList.prototype.drawItem = function(index) {
        const item = this.itemAt(index);
        if (item) {
            const bitmap = this.getItemBitmap(item);
            const rect = this.itemRect(index);
            if (bitmap) {
                bitmap.addLoadListener(function() {
                    this.drawItemImg(item, bitmap, index, rect.x, rect.y, rect.width, rect.height);
                }.bind(this));
            } else {
                this.drawItemImg(item, null, index, rect.x, rect.y, rect.width, rect.height);
            }
        }
    };

    Window_ItemList.prototype.drawItemImg = function(item, bitmap, index, x, y, width, height) {
        this.changePaintOpacity(this.isEnabled(item));
        const padding = this.itemPadding();
        if (bitmap) {
            this.drawItemGraphic(bitmap, x, y, width, height);
        }
        if (this.isItemName()) {
            this.drawItemName(item, x + this.getItemImgNameX(), y + Math.min(this.getItemImgNameY(), height - this.lineHeight() - (padding / 2)), width - padding);
        }
        this.drawItemNumber(item, x + this.getItemImgNumberX(), y + Math.min(this.getItemImgNumberY(), height - this.lineHeight() - (padding / 2)), width - padding);
        this.changePaintOpacity(1);
    };

    Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
        if (this.needsNumber()) {
            this.drawText($gameParty.numItems(item), x, y, width, "right");
        }
    };

    //ショップ

    Window_ShopBuy.prototype.drawItem = function(index) {
        const item = this.itemAt(index);
        if (item) {
            const bitmap = this.getItemBitmap(item);
            const rect = this.itemRect(index);
            if (bitmap) {
                bitmap.addLoadListener(function() {
                    this.drawItemImg(item, bitmap, index, rect.x, rect.y, rect.width, rect.height);
                }.bind(this));
            } else {
                this.drawItemImg(item, null, index, rect.x, rect.y, rect.width, rect.height);
            }
        }
    };

    Window_ShopBuy.prototype.drawItemImg = function(item, bitmap, index, x, y, width, height) {
        const price = this.price(item);
        const padding = this.itemPadding();
        if (bitmap) {
            this.drawItemGraphic(bitmap, x, y, width, height);
        }
        this.changePaintOpacity(this.isEnabled(item));
        if (this.isItemName()) {
            this.drawItemName(item, x + this.getItemImgNameX(), y + Math.min(this.getItemImgNameY(), height - this.lineHeight() - (padding / 2)), width - padding);
        }
        this.drawText(price, x + this.getItemImgNumberX(), y + Math.min(this.getItemImgNumberY(), height - this.lineHeight() - (padding / 2)), width - padding, "right");
        this.changePaintOpacity(true);
    };

    Window_ShopBuy.prototype.maxCols = function() {
        return ShopWindowBuySetting.ItemImgCols;
    };

    Window_ShopBuy.prototype.itemHeight = function() {
        return ShopWindowBuySetting.ItemRectHeight > 0 ? ShopWindowBuySetting.ItemRectHeight : this.defaultItemHeight();
    };

    Window_ShopBuy.prototype.getItemImgNameX = function() {
        return ShopWindowBuySetting.ItemNameX;
    };

    Window_ShopBuy.prototype.getItemImgNameY = function() {
        return ShopWindowBuySetting.ItemNameY;
    };

    Window_ShopBuy.prototype.getItemImgNumberX = function() {
        return ShopWindowBuySetting.ItemNumberX;
    };

    Window_ShopBuy.prototype.getItemImgNumberY = function() {
        return ShopWindowBuySetting.ItemNumberY;
    };

    Window_ShopBuy.prototype.getItemBitmapX = function() {
        return ShopWindowBuySetting.ItemBitmapX;
    };

    Window_ShopBuy.prototype.getItemBitmapY = function() {
        return 0;
    };

    Window_ShopSell.prototype.itemHeight = function() {
        return ShopWindowSellSetting.ItemRectHeight > 0 ? ShopWindowSellSetting.ItemRectHeight : this.defaultItemHeight();
    };

    Window_ShopSell.prototype.maxCols = function() {
        return ShopWindowSellSetting.ItemImgCols;
    };

    Window_ShopSell.prototype.getItemImgNameX = function() {
        return ShopWindowSellSetting.ItemNameX;
    };

    Window_ShopSell.prototype.getItemImgNameY = function() {
        return ShopWindowSellSetting.ItemNameY;
    };

    Window_ShopSell.prototype.getItemImgNumberX = function() {
        return ShopWindowSellSetting.ItemNumberX;
    };

    Window_ShopSell.prototype.getItemImgNumberY = function() {
        return ShopWindowSellSetting.ItemNumberY;
    };

    Window_ShopSell.prototype.getItemBitmapX = function() {
        return ShopWindowSellSetting.ItemBitmapX;
    };

    Window_ShopSell.prototype.getItemBitmapY = function() {
        return 0;
    };

    //装備
    Window_EquipItem.prototype.itemHeight = function() {
        return EquipWindowSetting.ItemRectHeight > 0 ? EquipWindowSetting.ItemRectHeight : this.defaultItemHeight();
    };

    Window_EquipItem.prototype.maxCols = function() {
        return EquipWindowSetting.ItemImgCols;
    };

    Window_EquipItem.prototype.getItemImgNameX = function() {
        return EquipWindowSetting.ItemNameX;
    };

    Window_EquipItem.prototype.getItemImgNameY = function() {
        return EquipWindowSetting.ItemNameY;
    };

    Window_EquipItem.prototype.getItemImgNumberX = function() {
        return EquipWindowSetting.ItemNumberX;
    };

    Window_EquipItem.prototype.getItemImgNumberY = function() {
        return EquipWindowSetting.ItemNumberY;
    };

    Window_EquipItem.prototype.getItemBitmapX = function() {
        return EquipWindowSetting.ItemBitmapX;
    };

    Window_EquipItem.prototype.getItemBitmapY = function() {
        return 0;
    };

    //戦闘
    Window_BattleItem.prototype.itemHeight = function() {
        return BattleWindowSetting.ItemRectHeight > 0 ? BattleWindowSetting.ItemRectHeight : this.defaultItemHeight();
    };

    Window_BattleItem.prototype.maxCols = function() {
        return BattleWindowSetting.ItemImgCols;
    };

    Window_BattleItem.prototype.getItemImgNameX = function() {
        return BattleWindowSetting.ItemNameX;
    };

    Window_BattleItem.prototype.getItemImgNameY = function() {
        return BattleWindowSetting.ItemNameY;
    };

    Window_BattleItem.prototype.getItemImgNumberX = function() {
        return BattleWindowSetting.ItemNumberX;
    };

    Window_BattleItem.prototype.getItemImgNumberY = function() {
        return BattleWindowSetting.ItemNumberY;
    };

    Window_BattleItem.prototype.getItemBitmapX = function() {
        return BattleWindowSetting.ItemBitmapX;
    };

    Window_BattleItem.prototype.getItemBitmapY = function() {
        return 0;
    };

    function _metaCheck(meta) {
        if (meta.indexOf('[') >= 0) {
            const log = ($gameSystem.isJapanese() ? "メタタグのパラメータに[]が含まれています。[]を外して記入して下さい。" : "The meta tag parameter contains []. Please remove the [] and enter it.");
            throw ["ParameterError", log];
        }
    }

})();