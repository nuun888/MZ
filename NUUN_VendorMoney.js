/*:-----------------------------------------------------------------------------------
 * NUUN_VendorMoney.js
 * 
 * Copyright (C) 2025 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Vendor money
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * Implement vendor money.
 * 
 * Memo section for events where the event command "Shop Processing" is being performed
 * <VendorMoney:[Id]> 
 * [Id]:Specify any ID. The specified ID will be applied to the specified ID in the plugin parameter "Vendor Money Settings".
 * 
 * In the plugin command "Change vendor money" ID, specify the ID of the relevant store. (The amount of money held by all vendors with the corresponding ID will be changed.)
 * Parameters
 * vendorMoney:The vendor's current money
 * initMoney:Initial amount of money
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 2/16/2025 Ver.1.0.0
 * First edition.
 * 
 * @param MoneyShortageColor
 * @text Shortage text color
 * @desc Specifies the text color when the vendor's amount is insufficient.
 * @type color
 * @default 18
 * 
 * @param VendorMoneySetting
 * @text Vendor Money Settings
 * @desc Sets the vendor's money.
 * @default 
 * @type struct<VendorMoneyList>[]
 * 
 * 
 * @command SetVenderMoney
 * @desc Changes the vendor's money.
 * @text Vendor money change
 * 
 * @arg Id
 * @desc Specifies the vendor's ID.
 * @text Vendor ID
 * @type number
 * @min 1
 * @default 1
 * 
 * @arg VenderMoney
 * @desc Change the current vendor amount.
 * @text Vendor money(Javascript)
 * @type string
 * @default 0
 * 
 */
/*~struct~VendorMoneyList:
 * 
 * @param InitVendorMoney
 * @type string
 * @default 0
 * @text Initial vendor money
 * @desc Specifies the initial amount of money the vendor has.
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 店の所持金
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * 店の所持金を実装します。
 * 
 * イベントコマンド「ショップの処理」を行っているイベントのメモ欄
 * <VendorMoney:[Id]> 
 * [Id]:任意のIDを指定します。指定したIDはプラグインパラメータ「店の所持金設定」の指定のIDの設定が適用されます。
 * 
 * プラグインコマンドの「店の所持金変更」のIDでは該当の店のIDを指定します。(全ての該当IDの店の金額が変更されます)
 * パラメータ
 * vendorMoney:店の現在の所持金
 * initMoney:所持金の初期金額
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2025/2/16 Ver.1.0.0
 * 初版
 * 
 * 
 * @param MoneyShortageColor
 * @text 不足時文字色
 * @desc 店の金額が不足していた時の文字色を指定します。
 * @type color
 * @default 18
 * 
 * @param VendorMoneySetting
 * @text 店の所持金設定
 * @desc 店の所持金の設定を行います。
 * @default 
 * @type struct<VendorMoneyList>[]
 * 
 * 
 * @command SetVenderMoney
 * @desc 店の所持金を変更します。
 * @text 店の所持金変更
 * 
 * @arg Id
 * @desc 店のIDを指定します。
 * @text 店ID
 * @type number
 * @min 1
 * @default 1
 * 
 * @arg VenderMoney
 * @desc 現在の店の金額を変更します。
 * @text 店所持金変更(Javascript)
 * @type string
 * @default 0
 * 
 */
/*~struct~VendorMoneyList:ja
 * 
 * @param InitVendorMoney
 * @type string
 * @default 0
 * @text 店所持金初期値
 * @desc 店の所持金の初期値を指定します。
 * 
 */

var Imported = Imported || {};
Imported.NUUN_VendorMoney = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;


    PluginManager.registerCommand(pluginName, 'SetVenderMoney', args => {
        $gameSystem.setVenderMoney(Number(args.Id), args.VenderMoney);
    });

    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.apply(this, arguments);
        this.initVendorMoney();
        this._vendorId = 0;
    };

    Game_System.prototype.initVendorMoney = function() {
        this._vendorMoney = [];
    };

    Game_System.prototype.setVenderMoney = function(id, money) {
        if (id === 0 && params.VendorMoneySetting[id - 1]) return;
        if (!this._vendorMoney) {
            this.initVendorMoney();
        }
        const vendorMoney = this._vendorMoney[id];
        const initMoney = params.VendorMoneySetting[id - 1].InitVendorMoney;
        this._vendorMoney[id] = Math.max((isNaN(money) ? eval(money) : money), 0);
    };

    Game_System.prototype.initVendor = function(eventId) {
        const event = $gameMap.event(eventId);
        const id = !!event && event.event().meta.VendorMoney ? NuunManager.getMetaCode(event.event(), "VendorMoney") : 0;
        this._vendorId = id;
        if (this._vendorId > 0) {
            const data = params.VendorMoneySetting[this._vendorId - 1];
            if (!this._vendorMoney) {
                this.initVendorMoney();
            }
            if (this._vendorMoney[this._vendorId] === undefined) {
                this._vendorMoney[this._vendorId] = isNaN(data.InitVendorMoney) ? eval(data.InitVendorMoney) : Number(data.InitVendorMoney);
            }
        }
    };

    Game_System.prototype.getVendorId = function() {
        return this._vendorId;
    };

    Game_System.prototype.getVendorMoney = function() {
        return this._vendorMoney[(this._vendorId || 0)];
    };

    Game_System.prototype.vendorBuyMoney = function(momey) {
        if (!this._vendorId) return;
        if (!this._vendorMoney) {
            this.initVendorMoney();
        }
        const id = [(this._vendorId || 0)];
        this._vendorMoney[id] = this._vendorMoney[id] + momey;
    };

    Game_System.prototype.vendorSellMoney = function(momey) {
        if (!this._vendorId) return 0;
        if (!this._vendorMoney) {
            this.initVendorMoney();
        }
        const id = [(this._vendorId || 0)];
        const vendorMoney = this._vendorMoney[id] - momey;
        const sellMoney = vendorMoney < 0 ? this._vendorMoney[id] : momey;
        this._vendorMoney[id] = Math.max(0, vendorMoney);
        return sellMoney;
    };


    const _Game_Interpreter_command302 = Game_Interpreter.prototype.command302;
    Game_Interpreter.prototype.command302 = function(params) {
        $gameSystem.initVendor(this._eventId);
        return _Game_Interpreter_command302.apply(this, arguments);
    };


    const _Scene_Shop_create = Scene_Shop.prototype.create;
    Scene_Shop.prototype.create = function() {
        _Scene_Shop_create.apply(this, arguments);
        this.createVendorGoldWindow();
    };

    Scene_Shop.prototype.createVendorGoldWindow = function() {
        if (this.isVendor()) {
            const rect = this.vendorGoldWindowRect();
            this._vendorGoldWindow = new Window_VendorGold(rect);
            this.addWindow(this._vendorGoldWindow);
        }
    };

    Scene_Shop.prototype.vendorGoldWindowRect = function() {
        return this.goldWindowRect();
    };

    if (Scene_Shop.prototype.update == Scene_MenuBase.prototype.update) {
        Scene_Shop.prototype.update = function() {
            Scene_MenuBase.prototype.update.apply(this, arguments);
        };
    }

    const _Scene_Shop_update = Scene_Shop.prototype.update;
    Scene_Shop.prototype.update = function() {
        _Scene_Shop_update.apply(this, arguments);
        if (this._vendorGoldWindow) {
            this._vendorGoldWindow.visible = this.isVendor() && (this._sellWindow.visible || this._numberWindow.visible);
        }
    };

    const _Scene_Shop_doBuy = Scene_Shop.prototype.doBuy;
    Scene_Shop.prototype.doBuy = function(number) {
        _Scene_Shop_doBuy.apply(this, arguments);
        $gameSystem.vendorBuyMoney(number * this.buyingPrice());
    };
    
    const _Scene_Shop_doSell = Scene_Shop.prototype.doSell;
    Scene_Shop.prototype.doSell = function(number) {
        if (!this.isVendor()) return _Scene_Shop_doSell.apply(this, arguments);
        const sellMoney =  $gameSystem.vendorSellMoney(number * this.sellingPrice());
        $gameParty.gainGold(sellMoney);
        $gameParty.loseItem(this._item, number);
    };

    const _Scene_Shop_onNumberOk = Scene_Shop.prototype.onNumberOk;
    Scene_Shop.prototype.onNumberOk = function() {
        _Scene_Shop_onNumberOk.apply(this, arguments);
        if (this.isVendor()) {
            this._vendorGoldWindow.refresh();
        }
    };

    Scene_Shop.prototype.isVendor = function() {
        return !!$gameSystem.getVendorId();
    };


    Window_Base.prototype.isVendor = function() {
        return !!$gameSystem.getVendorId();
    };

    const _Window_ShopNumber_drawTotalPrice = Window_ShopNumber.prototype.drawTotalPrice;
    Window_ShopNumber.prototype.drawTotalPrice = function() {
        if (this.isVendor() && this.isVendorSellingPrice()) {
            this.nuunchangeTextColor = true;
            this.changeTextColor(NuunManager.getColorCode(params.MoneyShortageColor));
        }
        _Window_ShopNumber_drawTotalPrice.apply(this, arguments);
        this.nuunchangeTextColor = false;
    };

    Window_ShopNumber.prototype.isVendorSellingPrice = function() {
        return this.isVendor() && this._price * this._number > $gameSystem.getVendorMoney();
    };

    if (Window_ShopNumber.prototype.resetTextColor == Window_Base.prototype.resetTextColor) {
        Window_ShopNumber.prototype.resetTextColor = function() {
            Window_Base.prototype.resetTextColor.apply(this, arguments);
        };
    }

    const _Window_ShopNumber_resetTextColor = Window_ShopNumber.prototype.resetTextColor;
    Window_ShopNumber.prototype.resetTextColor = function() {
        if (!this.nuunchangeTextColor) {
            _Window_ShopNumber_resetTextColor.apply(this, arguments);
        }
    };


    const _Window_ShopSell_initialize = Window_ShopSell.prototype.initialize;
    Window_ShopSell.prototype.initialize = function(rect) {
        _Window_ShopSell_initialize.apply(this, arguments);
        this._itemPrice = 0;
    };

    const _Window_ShopSell_isEnabled = Window_ShopSell.prototype.isEnabled;
    Window_ShopSell.prototype.isEnabled = function(item) {
        return _Window_ShopSell_isEnabled.apply(this, arguments) && this.isVendorMoney(item);
    };

    Window_ShopSell.prototype.isVendorMoney = function(item) {
        if (!this.isVendor()) return true;
        const venderMoney = $gameSystem.getVendorMoney();
        if (venderMoney === 0) return false;
        return true;
        //不足分容赦割合
        //if (params.VendorMoneyShortagerate < 0) return true;
        //const price = this.sellingPrice(item);
        //return price <= $gameSystem.getVendorMoney() || price * 100 / $gameSystem.getVendorMoney() <= (params.VendorMoneyShortagerate) + 100;
    };

    Window_ShopSell.prototype.sellingPrice = function(item) {
        const _scene = SceneManager._scene;
        const orgItem = _scene._item;//競合回避のため退避
        _scene._item = item;
        const sell = _scene.sellingPrice();
        _scene._item = orgItem;
        return sell;
    };


    function Window_VendorGold() {
        this.initialize(...arguments);
    }
    
    Window_VendorGold.prototype = Object.create(Window_Gold.prototype);
    Window_VendorGold.prototype.constructor = Window_VendorGold;
    
    Window_VendorGold.prototype.initialize = function(rect) {
        Window_Gold.prototype.initialize.call(this, rect);
    };

    Window_VendorGold.prototype.value = function() {
        return $gameSystem.getVendorMoney();
    };
    
})();