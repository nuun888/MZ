/*:-----------------------------------------------------------------------------------
 * NUUN_GroupMaxItems.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */
/*:
 * @target MZ
 * @plugindesc Item group possession limit
 * @author NUUN
 * @version 1.1.1
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_MaxItem
 * 
 * @help
 * You can set a maximum total number of items per group.
 * Priority
 * Changed Max Sum > Group Max Sum > Default Max Sum
 * 
 * <ItemGroup:[GroupName]> [GroupName]:Sets the group name for items, weapons, and armor.
 * Any items that exceed the maximum total number using plugin commands will remain as is.
 * 
 * If you want to change the number of items per group, be sure to set the specified group in the plugin parameter "ItemGroupMaxItems".
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 8/31/2025 Ver.1.1.1
 * Fixed an issue where group totals were not being applied.
 * 8/25/2025 Ver.1.1.0
 * Fixed an issue where plugin commands were not working.
 * When changing the maximum number, it is now possible to change the maximum number for multiple groups with a single command.
 * Added a function to increase or decrease the maximum number.
 * 9/22/2024 Ver.1.0.2
 * Fixed an issue where items could not be acquired if the default maximum total number of possessions was set to 0.
 * Fixed the plugin command to change the maximum total number of possessions so that it can be set to 0, meaning unlimited.
 * 9/21/2024 Ver.1.0.1
 * Fixed an issue that caused items to be unable to be purchased even if the purchase conditions were met.
 * 10/20/2021 Ver.1.0.0
 * First edition.
 * 
 * 
 * @command ChangeMaxItemSum
 * @desc Change the maximum number of items you can own.
 * @text Change in maximum number of items you can own
 * 
 * @arg MaxSum
 * @type number
 * @default 1
 * @min 1
 * @text Maximum number of possessions after change
 * @desc Specify the maximum number of possessions to be changed.(0 = unlimited)
 * 
 * @arg ItemKey
 * @desc Set the group to be processed.
 * @text Key
 * @type combo[]
 * @option 'item'
 * @option 'weapon'
 * @option 'armor'
 * @default 
 * 
 * @command ChangeMaxItemAdd
 * @desc Increases or decreases the maximum total number of items you can own by the specified amount.
 * @text Increase/decrease maximum number of items held
 * 
 * @arg Num
 * @type number
 * @default 1
 * @min -9999
 * @text Increase or decrease the maximum number of possessions
 * @desc Specify the increment value.
 * 
 * @arg ItemKey
 * @desc Set the group to be processed.
 * @text Key
 * @type combo[]
 * @option 'item'
 * @option 'weapon'
 * @option 'armor'
 * @default 
 * 
 * 
 * @param ItemGroupMax
 * @desc Default total maximum number of items to have. (0 = unlimited)
 * @text Maximum total number of items
 * @type number
 * @default 0
 * @min 0
 * 
 * @param WeaponGroupMax
 * @desc Default total maximum number of weapons you can carry. (0 = unlimited)
 * @text Maximum total number of weapons
 * @type number
 * @default 0
 * @min 0
 * 
 * @param ArmorGroupMax
 * @desc Default total maximum number of armor you can carry. (0 = unlimited)
 * @text Maximum total number of armors
 * @type number
 * @default 0
 * @min 0
 * 
 * @param ItemGroupMaxItems
 * @desc Set the number of items each group can own.
 * @text Maximum number of possessions per group
 * @type struct<ItemGroupDefaultList>[]
 * @default []
 * 
 */
/*~struct~ItemGroupDefaultList:
 *
 * @param ItemDefaultGroupKey
 * @desc Set the item group name.
 * @text Item Group Name
 * @type combo
 * @option 'item'
 * @option 'weapon'
 * @option 'armor'
 * @default 
 * 
 * @param GroupDefaultSumMax
 * @desc Default total max number of item groups you can carry. (0 = unlimited)
 * @text Maximum total number of items in a group
 * @type number
 * @default 0
 * @min 0
 *
 */
/*:ja
 * @target MZ
 * @plugindesc アイテムグループ所持制限
 * @author NUUN
 * @version 1.1.1
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_MaxItem
 * 
 * @help
 * アイテムのグループ毎の合計の最大数を設定できます。
 * 優先度
 * 変更した最大合計 ＞ グループの最大合計 ＞ デフォルトの最大合計
 * 
 * <ItemGroup:[GroupName]> [GroupName]:アイテム、武器、防具のグループ名を設定します。
 * プラグインコマンドを使用して最大合計個数を超えてしまったアイテムはそのまま残ります。
 * 
 * グループ毎のアイテム数を変更する場合は、プラグインパラメータのグループごと最大所持数に必ず指定のグループを設定してください。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2025/9/9 Ver 1.1.2
 * キー設定しているアイテムがアイテム全体個数を含んで計算されていた問題を修正。
 * 2025/8/31 Ver 1.1.1
 * グループ合計数が適用されていなかった問題を修正。
 * 2025/8/25 Ver 1.1.0
 * プラグインコマンドが機能していなかった問題を修正。
 * 最大数を変更する際、1回のコマンド操作で複数のグループの最大数変更を実行できるように変更。
 * 最大数を増減できる機能を追加。
 * 2024/9/22 Ver 1.0.2
 * デフォルト合計最大所持数を0に設定していた場合、アイテムを取得できない問題を修正。
 * プラグインコマンドのアイテム合計最大所持数変更で0で無制限に設定できるように修正。
 * 2024/9/21 Ver 1.0.1
 * 購入条件を満たしていてもアイテムが購入できなくなる問題を修正。
 * 2021/10/20 Ver 1.0.0
 * 初版
 * 
 * 
 * @command ChangeMaxItemSum
 * @desc アイテムの合計最大所持数を変更します。
 * @text アイテム合計最大所持数変更
 * 
 * @arg MaxSum
 * @type number
 * @default 1
 * @min 0
 * @text 変更後の最大所持数
 * @desc 変更する最大所持数を指定します。（0で無制限）
 * 
 * @arg ItemKey
 * @desc 処理を行うグループを設定します。
 * @text キー
 * @type combo[]
 * @option 'item'
 * @option 'weapon'
 * @option 'armor'
 * @default 
 * 
 * @command ChangeMaxItemAdd
 * @desc アイテムの合計最大所持数を指定の数値分増減します。
 * @text アイテム合計最大所持数増減
 * 
 * @arg Num
 * @type number
 * @default 1
 * @min -9999
 * @text 最大所持数増減
 * @desc 増減値を指定します。
 * 
 * @arg ItemKey
 * @desc 処理を行うグループを設定します。
 * @text キー
 * @type combo[]
 * @option 'item'
 * @option 'weapon'
 * @option 'armor'
 * @default 
 * 
 * 
 * @param ItemGroupMax
 * @desc アイテムのデフォルト合計最大所持数。（0で無制限）
 * @text アイテム合計最大所持数
 * @type number
 * @default 0
 * @min 0
 * 
 * @param WeaponGroupMax
 * @desc 武器のデフォルト合計最大所持数。（0で無制限）
 * @text 武器合計最大所持数
 * @type number
 * @default 0
 * @min 0
 * 
 * @param ArmorGroupMax
 * @desc 防具のデフォルト合計最大所持数。（0で無制限）
 * @text 防具合計最大所持数
 * @type number
 * @default 0
 * @min 0
 * 
 * @param ItemGroupMaxItems
 * @desc グループごとのアイテム所持数を設定します。
 * @text グループごと最大所持数
 * @type struct<ItemGroupDefaultList>[]
 * @default []
 * 
 */
/*~struct~ItemGroupDefaultList:ja
 *
 * @param ItemDefaultGroupKey
 * @desc アイテムグループ名を設定します。
 * @text アイテムグループ名
 * @type combo
 * @option 'item'
 * @option 'weapon'
 * @option 'armor'
 * @default 
 * 
 * @param GroupDefaultSumMax
 * @desc アイテムグループのデフォルト合計最大所持数（0で無制限）
 * @text アイテムグループ最大合計所持数
 * @type number
 * @default 0
 * @min 0
 *
 */

var Imported = Imported || {};
Imported.NUUN_GroupMaxItems = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;

    const ItemGroupMaxItems = params.ItemGroupMaxItems || [];
    const ItemGroupMax = params.ItemGroupMax || Infinity;
    const WeaponGroupMax = params.WeaponGroupMax || Infinity;
    const ArmorGroupMax = params.ArmorGroupMax || Infinity;

    PluginManager.registerCommand(pluginName, 'ChangeMaxItemSum', args => {
        changeMaxItemSum(args);
    });

    PluginManager.registerCommand(pluginName, 'ChangeMaxItemAdd', args => {
        changeMaxItemAdd(args);
    });

    function changeMaxItemSum(args) {
        const keys = args.ItemKey ? DataManager.nuun_structureData(args.ItemKey) : [];
        for (const key of keys) {
            switch (key) {
            case 'item':
                $gameParty.setGroupMaxItems(Number(args.MaxSum));
                break;
            case 'weapon':
                $gameParty.setGroupMaxWeapons(Number(args.MaxSum));
                break;
            case 'armor':
                $gameParty.setGroupMaxArmors(Number(args.MaxSum));
                break;
            default:
                const index = _getGroupKeyIndex(key);
                $gameParty.groupMaxGroupItems(index, Number(args.MaxSum));  
            }
        }
    };

    function changeMaxItemAdd(args) {
        const keys = args.ItemKey ? DataManager.nuun_structureData(args.ItemKey) : null;
        for (const key of keys) {
            switch (key) {
                case 'item':
                    $gameParty.setGroupAdditionItems(Number(args.Num));
                    break;
                case 'weapon':
                    $gameParty.setGroupAdditionWeapons(Number(args.Num));
                    break;
                case 'armor':
                    $gameParty.setGroupAdditionArmors(Number(args.Num));
                    break;
                default:
                    const index = _getGroupKeyIndex(key);
                    $gameParty.groupAdditionMaxGroupItems(index, Number(args.Num));  
            }
        }
    };

    function _getGroupKeyIndex(key) {
        return ItemGroupMaxItems.findIndex(data => {
            return Array.isArray(data.ItemDefaultGroupKey) ? data.ItemDefaultGroupKey[0] === key : data.ItemDefaultGroupKey === key;
        });
    };

    function _groupMaxItemsIndex(item) {
        return ItemGroupMaxItems.findIndex(data => {
            const key = Array.isArray(data.ItemDefaultGroupKey) ? data.ItemDefaultGroupKey[0] : data.ItemDefaultGroupKey;
            return key === item.meta.ItemGroup;
        });
    };

    const _Game_Party_initialize = Game_Party.prototype.initialize;
    Game_Party.prototype.initialize = function() {
        _Game_Party_initialize.call(this);
        this.initGroupMaxItems();
    };

    Game_Party.prototype.initGroupMaxItems = function() {
        this._groupMaxItems = 0;
        this._groupMaxWeapons = 0;
        this._groupMaxArmors = 0;
        this._groupMaxGroupItems = [];
        this.initGroupMaxItemsNum();
    };

    Game_Party.prototype.setGroupMaxItems = function(num) {
        this._groupMaxItems = num || Infinity;
    };

    Game_Party.prototype.setGroupMaxWeapons = function(num) {
        this._groupMaxWeapons = num || Infinity;
    };

    Game_Party.prototype.setGroupMaxArmors = function(num) {
        this._groupMaxArmors = num || Infinity;
    };

    Game_Party.prototype.groupMaxGroupItems = function(index, num) {
        if (!this._groupMaxGroupItems) {
                this._groupMaxGroupItems = [];
        }
        if (index >= 0) {
            this._groupMaxGroupItems[index] = Math.max(0, (num || Infinity));
        }
    };

    Game_Party.prototype.setGroupAdditionMaxItems = function(num) {
        this._groupMaxItems = Math.max(0, ((this._groupMaxItems || ItemGroupMax) + num));
    };

    Game_Party.prototype.setGroupAdditionMaxWeapons = function(num) {
        this._groupMaxWeapons = Math.max(0, ((this._groupMaxWeapons || WeaponGroupMax) + num));
    };

    Game_Party.prototype.setGroupAdditionMaxArmors = function(num) {
        this._groupMaxArmors = Math.max(0, ((this._groupMaxArmors || ArmorGroupMax) + num));
    };

    Game_Party.prototype.groupAdditionMaxGroupItems = function(index, num) {
        if (!this._groupMaxGroupItems) {
                this._groupMaxGroupItems = [];
        }
        if (index >= 0) {
            this._groupMaxGroupItems[index] = Math.max(0, ((this._groupMaxGroupItems[index] || ItemGroupMaxItems[index].GroupDefaultSumMax) + num));
        }
    };

    Game_Party.prototype.initGroupMaxItemsNum = function() {
        if (!this._groupMaxGroupNum) {
            this._groupMaxGroupNum = {};
            this._groupMaxGroupNum.Items = 0;
            this._groupMaxGroupNum.Weapons = 0;
            this._groupMaxGroupNum.Armors = 0;
        } else {
            return;
        }
        for (const item of this.allItems()) {
            const index = _groupMaxItemsIndex(item);
            if (index >= 0) {
                const key = item.meta.ItemGroup;
                if (!this._groupMaxGroupNum[key]) {
                    this._groupMaxGroupNum[key] = 0;
                }
                this._groupMaxGroupNum[key] += this.numItems(item);
            } else if ($dataItems[item.id] === item) {
                this._groupMaxGroupNum.Items += this.numItems(item);
            } else if ($dataWeapons[item.id] === item) {
                this._groupMaxGroupNum.Weapons += this.numItems(item);
            } else if ($dataArmors[item.id] === item) {
                this._groupMaxGroupNum.Armors += this.numItems(item);
            }
        }
    };

    Game_Party.prototype.setGroupMaxItemsNum = function(item) {
        const index = _groupMaxItemsIndex(item);
        if (index >= 0) {
            const key = item.meta.ItemGroup;
            this._groupMaxGroupNum[key] = this.allItems().reduce((r, data) => r + (data.meta.ItemGroup === key ? this.numItems(data) : 0), 0);
        } else if ($dataItems[item.id] === item) {
            this._groupMaxGroupNum.Items = this.items().reduce((r, data) => r + this.numItems(data), 0);
        } else if ($dataWeapons[item.id] === item) {
            this._groupMaxGroupNum.Weapons = this.weapons().reduce((r, data) => r + this.numItems(data), 0);
        } else if ($dataArmors[item.id] === item) {
            this._groupMaxGroupNum.Armors = this.armors().reduce((r, data) => r + this.numItems(data), 0);
        }
    };

    Game_Party.prototype.getMaxItems = function(item) {
        const index = _groupMaxItemsIndex(item);
        if (index >= 0) {
            return this.getGroupMaxGroupItems(index);
        }
        if ($dataItems[item.id] === item) {
            return this.getGroupMaxItems();
        } else if ($dataWeapons[item.id] === item) {
            return this.getGroupMaxWeapons();
        } else if ($dataArmors[item.id] === item) {
            return this.getGroupMaxArmors();
        } else {
            return Infinity;
        }
    };

    Game_Party.prototype.getGroupMaxItems = function() {
        return this._groupMaxItems > 0 ? this._groupMaxItems : (ItemGroupMax || Infinity);
    };

    Game_Party.prototype.getGroupMaxWeapons = function() {
        return this._groupMaxWeapons > 0 ? this._groupMaxWeapons : (WeaponGroupMax || Infinity);
    };

    Game_Party.prototype.getGroupMaxArmors = function() {
        return this._groupMaxArmors > 0 ? this._groupMaxArmors : (ArmorGroupMax || Infinity);
    };

    Game_Party.prototype.getGroupMaxGroupItems = function(index) {
        if (this._groupMaxGroupItems && this._groupMaxGroupItems[index] > 0) {
            return this._groupMaxGroupItems[index];
        } else if (!!ItemGroupMaxItems[index]) {
            return ItemGroupMaxItems[index].GroupDefaultSumMax;
        }
        return Infinity;
    };

    const _Game_Party_maxItems = Game_Party.prototype.maxItems;
    Game_Party.prototype.maxItems = function(item) {
        this.initGroupMaxItemsNum();
        return Math.min(this.maxValidNumber(item), _Game_Party_maxItems.apply(this, arguments));
    };

    Game_Party.prototype.maxValidNumber = function(item) {
        const maxGroupItems = this.getMaxItems(item);
        const key = item.meta.ItemGroup;
        if (!!this._groupMaxGroupNum[key]) {
            return Math.max(maxGroupItems - this._groupMaxGroupNum[key], 0);
        } else if ($dataItems[item.id] === item) {
            return Math.max(maxGroupItems - this._groupMaxGroupNum.Items, 0);
        } else if ($dataWeapons[item.id] === item) {
            return Math.max(maxGroupItems - this._groupMaxGroupNum.Weapons, 0);
        } else if ($dataArmors[item.id] === item) {
            return Math.max(maxGroupItems - this._groupMaxGroupNum.Armors, 0);
        }
        return Infinity;
    };

    const _Game_Party_gainItem = Game_Party.prototype.gainItem;
    Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
        _Game_Party_gainItem.apply(this, arguments);
        const container = this.itemContainer(item);
        if (container) {
            this.setGroupMaxItemsNum(item);
        }
    };

})();
