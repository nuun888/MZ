/*:-----------------------------------------------------------------------------------
 * NUUN_MaxItem.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc アイテム最大所持数変更
 * @author NUUN
 * @version 1.4.1
 * @base NUUN_Base
 * 
 * @help
 * アイテムの最大所持数を変更します。
 * 
 * アイテム、武器、防具のメモ欄に以下の書式を記入します。
 * <MaxItems:10> そのアイテムは最大１０個までしか持つことはできません。
 * 
 * 優先度
 * 変更した最大数 ＞ 個別に設定した最大数 ＞ グループの最大所持数 ＞ カテゴリー内の最大数 ＞ デフォルト最大数
 * 
 * グループまたはカテゴリーごとに最大所持数を設定できます。（カテゴリーはNUUN_ItemCategoryの拡張機能です）
 * 優先度はグループの最大所持数＞カテゴリーの最大所持数になります。
 * カテゴリー
 * <CategoryType:[key]> に設定したカテゴリーのアイテムのデフォルトの最大所持数が変更されます。
 * グループ
 * <ItemGroup:[GroupName]> アイテムのグループを割り当てます。[GroupName]:グループ名
 * アイテムのグループごとに最大所持数を変更するときに使用します。
 * <ItemGroup:回復> このアイテムのグループは回復に属します。
 * 
 * 予約キー
 * keyItem：大事なもの
 * HiddenItemA：隠しアイテムA
 * HiddenItemB：隠しアイテムB
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2025/8/25 Ver 1.4.1
 * コードの整理
 * 2022/6/11 Ver 1.4.0
 * 変更した最大数と個別に設定した最大数の適用優先度を変更。
 * 個数表示を別プラグイン化。
 * 2021/10/21 Ver 1.3.1
 * 防具の最大数の変更が正常に反映されていなかった問題を修正。
 * 2021/10/17 Ver 1.3.0
 * アイテム個別の最大所持数を変更しても反映されない問題を修正。
 * グループとカテゴリーの最大所持数の設定を共通化。
 * 2021/7/24 Ver 1.2.0
 * 最大所持数を変更できる機能を追加。
 * 2021/7/11 Ver 1.1.0
 * 特定のアイテム個数を非表示にする機能を追加。
 * 所持個数/最大個数で表示させる機能を追加。
 * 2021/6/21 Ver 1.0.1
 * 隠しアイテムに対応。（要NUUN_ItemCategory）
 * 2021/6/20 Ver 1.0.0
 * 初版
 * 
 * 
 * @command ChangeMaxItem
 * @desc アイテムの最大所持数を変更します。
 * @text アイテム最大所持数変更
 * 
 * @arg Item
 * @type item
 * @default 0
 * @text アイテム
 * @desc 変更するアイテムを指定します。0で「ItemKey」で指定した対象の全てのアイテムを変更します。
 * 
 * @arg MaxNum
 * @type number
 * @default 1
 * @min 1
 * @text 変更後の最大所持数
 * @desc 変更する最大所持数を指定します。
 * 
 * @arg ItemKey
 * @desc 処理を行うグループまたはカテゴリーキーを設定します。
 * @text キー
 * @type string
 * @default
 * 
 * 
 * @command ChangeMaxWeapon
 * @desc 武器の最大所持数を変更します。
 * @text 武器最大所持数変更
 * 
 * @arg Weapon
 * @type Weapon
 * @default 0
 * @text 武器
 * @desc 変更する武器を指定します。0で「ItemKey」で指定した対象の全ての武器を変更します。
 * 
 * @arg MaxNum
 * @type number
 * @default 1
 * @min 1
 * @text 変更後の最大所持数
 * @desc 変更する最大所持数を指定します。
 * 
 * @arg ItemKey
 * @desc 処理を行うグループまたはカテゴリーキーを設定します。
 * @text キー
 * @type string
 * @default
 * 
 * 
 * @command ChangeMaxArmor
 * @desc 防具の最大所持数を変更します。
 * @text 防具最大所持数変更
 * 
 * @arg Armor
 * @type Armor
 * @default 0
 * @text 防具
 * @desc 変更する防具を指定します。0で「ItemKey」で指定した対象の全ての防具を変更します。
 * 
 * @arg MaxNum
 * @type number
 * @default 1
 * @min 1
 * @text 変更後の最大所持数
 * @desc 変更する最大所持数を指定します。
 * 
 * @arg Key
 * @desc 処理を行うグループまたはカテゴリーキーを設定します。
 * @text キー
 * @type string
 * @default
 * 
 * 
 * 
 * @param DefaultMaxItem
 * @desc デフォルトの最大アイテム所持数
 * @text デフォルトの最大アイテム所持数を設定します。
 * @type number
 * @default 99
 * @min 1
 * 
 * @param DefaultMaxWeapon
 * @desc デフォルトの最大武器所持数
 * @text デフォルトの最大武器所持数を設定します。
 * @type number
 * @default 99
 * @min 1
 * 
 * @param DefaultMaxArmor
 * @desc デフォルトの最大防具所持数
 * @text デフォルトの最大防具所持数を設定します。
 * @type number
 * @default 99
 * @min 1
 * 
 * @param CustomDefault
 * @desc グループまたはカテゴリー毎の最大所持数(要NUUN_ItemCategory)
 * @text グループカテゴリー最大所持数
 * @type struct<CustomDefaultList>[]
 * @default []
 * 
 */
/*~struct~CustomDefaultList:
 *
 * @param CustomDefaultKey
 * @desc グループまたはカテゴリーキーを設定します。（カテゴリーはNUUN_ItemCategoryが必要です）
 * @text グループカテゴリーキー
 * @type string
 * @default
 * 
 * @param CustomDefaultMax
 * @desc デフォルト最大所持数
 * @text 最大所持数
 * @type number
 * @default 99
 * @min 1
 *
 */
var Imported = Imported || {};
Imported.NUUN_MaxItem = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;

    const parameters = PluginManager.parameters('NUUN_MaxItem');
    const defaultMaxItem = params.DefaultMaxItem || 99;
    const defaultMaxWeapon = params.DefaultMaxWeapon || 99;
    const defaultMaxArmor = params.DefaultMaxArmor || 99;
    const CustomDefault = params.CustomDefault || [];

    PluginManager.registerCommand(pluginName, 'ChangeMaxItem', args => {
        changeMaxItem(args);
    });

    PluginManager.registerCommand(pluginName, 'ChangeMaxWeapon', args => {
        changeMaxWeapon(args);
    });

    PluginManager.registerCommand(pluginName, 'ChangeMaxArmor', args => {
        changeMaxArmor(args);
    });

    function changeMaxItem(args) {
        if (Number(args.Item) > 0) {
            $gameParty.setMaxItem(Number(args.Item), Number(args.MaxNum));
        } else {
            for (const item of $dataItems) {
                if (item && item.name) {
                    if (args.ItemKey) {
                        if (args.ItemKey === $gameParty.getCategoryType(item, 'item')) {
                        $gameParty.setMaxItem(item.id, Number(args.MaxNum));
                        $gameParty.setGroopMaxItem(args.ItemKey, Number(args.MaxNum));
                        }
                    } else {
                        $gameParty.setMaxItem(item.id, Number(args.MaxNum));
                    }
                }
            }
        }
    };

    function changeMaxWeapon(args) {
        if (Number(args.Weapon) > 0) {
            $gameParty.setWeaponMaxItem(Number(args.Weapon), Number(args.MaxNum));
        } else {
            for (const item of $dataWeapons) {
                if (item && item.name) {
                    if (args.ItemKey) {
                        if (args.ItemKey === $gameParty.getCategoryType(item, 'weapon')) {
                        $gameParty.setWeaponMaxItem(item.id, Number(args.MaxNum));
                        $gameParty.setGroopMaxItem(args.ItemKey, Number(args.MaxNum));
                        }
                    } else {
                        $gameParty.setWeaponMaxItem(item.id, Number(args.MaxNum));
                    }
                }
            }
        }
    };

    function changeMaxArmor(args) {
        if (Number(args.Armor) > 0) {
            $gameParty.setArmorMaxItem(Number(args.Armor), Number(args.MaxNum));
        } else {
            for (const item of $dataArmors) {
                if (item && item.name) {
                    if (args.ItemKey) {
                        if (args.ItemKey === $gameParty.getCategoryType(item, 'armor')) {
                        $gameParty.setArmorMaxItem(item.id, Number(args.MaxNum));
                        $gameParty.setGroopMaxItem(args.ItemKey, Number(args.MaxNum));
                        }
                    } else {
                        $gameParty.setArmorMaxItem(item.id, Number(args.MaxNum));
                    }
                }
            }
        }
    };

    function getCategoryKeyItem(item, type) {
        if (type === 'item') {
            if (item.itypeId === 2) {
                return "keyItem";
            } else if (item.itypeId === 3) {
                return "HiddenItemA";
            } else if (item.itypeId === 4) {
                return "HiddenItemB";
            }
        }
        return null;
    };

    const _Game_Party_initialize = Game_Party.prototype.initialize;
    Game_Party.prototype.initialize = function() {
        _Game_Party_initialize.call(this);
        this._itemsMaxItem = [];
        this._weaponsMaxItem = [];
        this._armorsMaxItem = [];
    };

    Game_Party.prototype.initGroopMaxItems = function() {
        for (const data of CustomDefault) {
            const method = '_nuunMaxItems' + data.CustomDefaultKey;
            if (!this[method]) {
                this[method] = data.CustomDefaultMax;
            }
        }
    };

    Game_Party.prototype.setGroopMaxItem = function(group, max) {
        const method = '_nuunMaxItems' + group;
        this[method] = max;
    };

    Game_Party.prototype.getGroopMaxItem = function(item) {
        const tag = item.meta.ItemGroup;
        const method = '_nuunMaxItems' + tag;
        if (tag && !this[method]) {
            const find = CustomDefault.find(data => data.CustomDefaultKey === tag);
            if (find) {
                this.setGroopMaxItem(tag, find.CustomDefaultMax);
            }
        }
        return this[method] || 0;
    };

    Game_Party.prototype.getMaxItemNum = function(item, type) {
        const individualNum = this.individualMax(item.id, type);
        if (individualNum > 0) {
            return individualNum;
        } else if (item.meta.MaxItems) {
            return Number(item.meta.MaxItems);
        } else {
            const maxNum = this.getGroopMaxItem(item);
            return maxNum > 0 ? maxNum : this.defaultMax(type);
        }
    };

    Game_Party.prototype.individualMax = function(id, type) {
        switch (type) {
            case 'item':
                return this._itemsMaxItem ? (this._itemsMaxItem[id] || 0) : 0;
            case 'weapon':
                return this._weaponsMaxItem ? (this._weaponsMaxItem[id] || 0) : 0;
            case 'armor' :
                return this._armorsMaxItem ? (this._armorsMaxItem[id] || 0) : 0;
            default:
                return 0;
        }
    };

    Game_Party.prototype.defaultMax = function(type) {
        switch (type) {
            case 'item':
                return defaultMaxItem;
            case 'weapon':
                return defaultMaxWeapon;
            case 'armor' :
                return defaultMaxArmor;
            default:
                return 99;
        }
    };

    Game_Party.prototype.maxItems = function(item) {//再定義
        if (DataManager.isItem(item)) {
            return this.getMaxItemNum(item, 'item');
        } else if (DataManager.isWeapon(item)) {
            return this.getMaxItemNum(item, 'weapon');
        } else if (DataManager.isArmor(item)) {
            return this.getMaxItemNum(item, 'armor');
        }
    };

    Game_Party.prototype.numMaxItems = function(item) {
        const nowNumber = this.numItems(item);
        if (nowNumber > this.maxItems(item)) {
            const container = this.itemContainer(item);
            container[id] = Math.min(nowNumber, this.maxItems(item));
        }
    };

    Game_Party.prototype.setMaxItem = function(id, maxNum) {
        if (!this._itemsMaxItem) {
            this._itemsMaxItem = [];
        }
        this._itemsMaxItem[id] = maxNum;
        this.numMaxItems($dataItems[id]);
    };

    Game_Party.prototype.setWeaponMaxItem = function(id, maxNum) {
        if (!this._weaponsMaxItem) {
            this._weaponsMaxItem = [];
        }
        this._weaponsMaxItem[id] = maxNum;
        this.numMaxItems($dataWeapons[id]);
    };

    Game_Party.prototype.setArmorMaxItem = function(id, maxNum) {
        if (!this._armorsMaxItem) {
            this._armorsMaxItem = [];
        }
        this._armorsMaxItem[id] = maxNum;
        this.numMaxItems($$dataArmors[id]);
    };

    Game_Party.prototype.getCategoryType = function(item, type) {
        if (item.meta.ItemGroup) {
            return (item.meta.ItemGroup).trim();
        }
        return Imported.NUUN_ItemCategory && item.meta.CategoryType ? (item.meta.CategoryType).trim() : getCategoryKeyItem(item, type);
    };


})();
