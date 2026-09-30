/*:-----------------------------------------------------------------------------------
 * NUUN_VendorMoney.js
 * 
 * Copyright (C) 2025 NUUN
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Vendor money
 * @author NUUN
 * @version 1.1.0
 * 
 * @help
 * Implement vendor money.
 * 
 * Memo field of the event containing the "Shop Processing" event command:
 * <VendorMoney:[Id]> 
 * [Id]:Specify any ID. The specified ID corresponds to the ID in the "Vendor Money Settings" plugin parameter.
 * For example, to use list entry 1 in "Vendor Money Settings", enter <VendorMoney:1>
 * 
 * Changing Vendor Money or Setting Initial Vendor Money In the "Change Vendor Money" plugin command, specify the ID of the target vendor.
 * vendorMoney:The vendor's current money
 * Specify 0 to change the money of all applicable vendors.
 * Parameters:
 * vendorMoney: The vendor's current money. (Available only when changing vendor money.)
 * initMoney: The vendor's initial amount of money.
 * 
 * Terms of Use
 * Credit: Optional
 * Commercial use: Possible
 * Modifications: Possible
 * Redistribution: Possible
 * Support is not available for modified versions or downloads from sources other than https://github.com/nuun888/MZ, the official forum, or authorized retailers.
 * 
 * Log
 * 9/30/2026 Ver.1.1.0
 * Changed the plugin to work without NUUN_Base.
 * Added a feature that prevents selling items if the selling price exceeds the vendor's available funds.
 * Added a feature that allows changing the money of all vendors by specifying 0 as the ID in "Change Vendor Money".
 * Added an option to add to or replace the current vendor's money when changing vendor money.
 * Fixed an issue where some parameters used in evaluation formulas were not applied correctly.
 * 2/16/2025 Ver.1.0.0
 * First edition.
 * 
 * @param DisableShortageSale
 * @desc Prevents items from being sold if the vendor does not have enough money to cover the selling price.
 * @text Disable selling when funds are insufficient
 * @type boolean
 * @default false
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
 * @default ["{\"InitVendorMoney\":\"5000\"}"]
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
 * @arg MoneyType
 * @text Change Method
 * @desc Specifies whether to add to the vendor's money or replace it with the specified amount.
 * @type select
 * @option Add
 * @value 0
 * @option Replace
 * @value 1
 * @default 1
 * 
 */
/*~struct~VendorMoneyList:
 * 
 * @param IdentifierName
 * @text Identifier
 * @desc Specify any identifier using half-width alphanumeric characters.
 * @type string
 * @default
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
 * @version 1.1.0
 * 
 * @help
 * 店の所持金を実装します。
 * 
 * イベントコマンド「ショップの処理」を行っているイベントのメモ欄
 * <VendorMoney:[Id]> 
 * [Id]:任意のIDを指定します。指定したIDはプラグインパラメータ「店の所持金設定」の指定のIDの設定が適用されます。
 * プラグインパラメータの店の所持金設定のリスト番号1を指定する場合は、<VendorMoney:1> 
 * 
 * 店所持金変更または店所持金初期値
 * プラグインコマンドの「店の所持金変更」のIDでは該当の店のIDを指定します。(0で全ての該当IDの店の金額が変更されます)
 * パラメータ
 * vendorMoney:店の現在の所持金(店の所持金変更でのみ)
 * initMoney:所持金の初期金額
 * 
 * 利用規約
 * クレジット表記：任意
 * 商業利用：可能
 * 改変：可能
 * 再配布：可能
 * https://github.com/nuun888/MZ、公式フォーラム、正規販売サイト以外からのダウンロード、改変済みの場合はサポートは対象外となります。
 * 
 * 更新履歴
 * 2026/9/30 Ver.1.1.0
 * NUUN_Baseなしで実行できるように仕様を変更。
 * 売却価格が店の所持金を上回る場合、売却できない機能を追加。
 * 店の所持金変更でIDを0に指定することで全ての店の所持金を変更できる機能を追加。
 * 在の店の金額を変更で加算、代入を選択できる機能を追加。
 * 評価式で使用する一部パラメータが適用されていなかった問題を修正。
 * 2025/2/16 Ver.1.0.0
 * 初版
 * 
 * 
 * @param DisableShortageSale
 * @desc 店の所持金が売却価格に満たない場合、売却できないようにします。
 * @text 不足分売却不可
 * @type boolean
 * @default false
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
 * @default ["{\"InitVendorMoney\":\"5000\"}"]
 * @type struct<VendorMoneyList>[]
 * 
 * 
 * @command SetVenderMoney
 * @desc 店の所持金を変更します。
 * @text 店の所持金変更
 * 
 * @arg Id
 * @desc 店のIDを指定します。0はすべてのショップが対象です。
 * @text 店ID
 * @type number
 * @min 0
 * @default 0
 * 
 * @arg VenderMoney
 * @desc 現在の店の金額を変更します。"initVendorMoney"記入で店所持金初期値の金額が代入されます。
 * @text 店所持金変更(Javascript)
 * @type string
 * @default 0
 * 
 * @arg MoneyType
 * @text 変更方法
 * @desc 店の所持金を加算するか、指定した金額を代入するかを設定します。
 * @type select
 * @option 加算
 * @value 0
 * @option 代入
 * @value 1
 * @default 1
 * 
 */
/*~struct~VendorMoneyList:ja
 * 
 * @param IdentifierName
 * @text 識別名
 * @desc 半角英数字の任意の識別名を設定します。
 * @type string
 * @default 
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
    class Nuun_PluginParams_VendorMoney {
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

    window.Nuun_PluginParams_VendorMoney = Nuun_PluginParams_VendorMoney;

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

    const params = Nuun_PluginParams_VendorMoney.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;

    function NuunVendorMoneyManager() {
        throw new Error("This is a static class");
    }

    window.NuunVendorMoneyManager = NuunVendorMoneyManager;

    NuunVendorMoneyManager.getMetaCode = function(object, method) {
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

    NuunVendorMoneyManager.vendorMoneyParams = function(code) {
        switch (code) {
            case 0:
                return params.VendorMoneySetting || [];
            case 1:
                return params.MoneyShortageColor;
            case 2:
                return params.DisableShortageSale;
        }
    };

    NuunVendorMoneyManager.getColorCode = function(color) {
        if (typeof(color) === "string" && color.indexOf('#') === 0) {
            return color;
        }
        return ColorManager.textColor(color);
    };

    NuunVendorMoneyManager.getVendorId = function(id) {
        if (isNaN(id)) {
            return this.vendorMoneyParams(0).findIndex(data => data.IdentifierName === id) + 1;
        } else {
            return Number(id);
        }
    };


    PluginManager.registerCommand(pluginName, 'SetVenderMoney', args => {
        const id = NuunVendorMoneyManager.getVendorId(args.Id);
        if (id > 0) {
            $gameSystem.setVenderMoney(id, args.VenderMoney, Number(args.MoneyType));
        } else {
            ($gameSystem._vendorMoney || []).forEach((vendor, index) => {
                $gameSystem.setVenderMoney(index, args.VenderMoney, Number(args.MoneyType));
            });
        }
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

    Game_System.prototype.setVenderMoney = function(id, money, type = 1) {
        const data = NuunVendorMoneyManager.vendorMoneyParams(0)[id - 1];
        if (!data) return;
        if (!this._vendorMoney) {
            this.initVendorMoney();
        }
        try {
            const vendorMoney = this._vendorMoney[id];
            const initMoney = data.InitVendorMoney;
            switch (type) {
                case 0:
                    if (this._vendorMoney[id] === undefined) {
                        this._vendorMoney[id] = initMoney;
                    }
                    this._vendorMoney[id] += Math.max((isNaN(money) ? eval(money) : money), 0);
                    break;
                case 1:
                    this._vendorMoney[id] = Math.max((isNaN(money) ? eval(money) : money), 0);
                    break;
            }
        } catch (error) {

        }
    };

    Game_System.prototype.initVendor = function(eventId) {
        const event = $gameMap.event(eventId);
        const id = !!event && event.event().meta.VendorMoney ? NuunVendorMoneyManager.getMetaCode(event.event(), "VendorMoney") : 0;
        this._vendorId = NuunVendorMoneyManager.getVendorId(id);
        if (this._vendorId > 0) {
            const data = NuunVendorMoneyManager.vendorMoneyParams(0)[this._vendorId - 1];
            if (!data) return;
            if (!this._vendorMoney) {
                this.initVendorMoney();
            }
            if (this._vendorMoney[this._vendorId] === undefined) {//データがなければ初期化
                try {
                    const initMoney = data.InitVendorMoney;
                    this._vendorMoney[this._vendorId] = Math.max((isNaN(initMoney) ? eval(initMoney) : initMoney), 0);
                } catch (error) {
                    
                }
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
        const id = (this._vendorId || 0);
        this._vendorMoney[id] = this._vendorMoney[id] + momey;
    };

    Game_System.prototype.vendorSellMoney = function(momey) {
        if (!this._vendorId) return 0;
        if (!this._vendorMoney) {
            this.initVendorMoney();
        }
        const id = (this._vendorId || 0);
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

    const _Scene_Shop_maxSell = Scene_Shop.prototype.maxSell;
    Scene_Shop.prototype.maxSell = function() {
        const max = _Scene_Shop_maxSell.apply(this, arguments);
        if (!NuunVendorMoneyManager.vendorMoneyParams(2) || !this.isVendor()) return max;
        const price = this.sellingPrice();
        if (price === 0) return max;
        const vendorMax = Math.floor($gameSystem.getVendorMoney() / price);
        return Math.min(max, vendorMax);
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
            this.changeTextColor(NuunVendorMoneyManager.getColorCode(NuunVendorMoneyManager.vendorMoneyParams(1)));
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
        if (NuunVendorMoneyManager.vendorMoneyParams(2)) {
            return this.sellingPrice(item) <= venderMoney;
        }
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