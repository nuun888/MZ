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
 * @version 1.0.1
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * You can set a maximum total number of items per group.
 * Priority
 * Changed Max Sum > Group Max Sum > Default Max Sum
 * 
 * <ItemGroup:[GroupName]> [GroupName]:Sets the group name for items, weapons, and armor.
 * Any items that exceed the maximum total number using plugin commands will remain as is.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
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
 * @desc Specify the maximum number of possessions to be changed.
 * 
 * @arg ItemKey
 * @desc Set the group to be processed (enter list number 1).
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
 * @desc Set the item group name. (enter list number 1)
 * @text Item Group Name
 * @type combo[]
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
 * @version 1.0.1
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * アイテムのグループ毎の合計の最大数を設定できます。
 * 優先度
 * 変更した最大合計 ＞ グループの最大合計 ＞ デフォルトの最大合計
 * 
 * <ItemGroup:[GroupName]> [GroupName]:アイテム、武器、防具のグループ名を設定します。
 * プラグインコマンドを使用して最大合計個数を超えてしまったアイテムはそのまま残ります。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
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
 * @min 1
 * @text 変更後の最大所持数
 * @desc 変更する最大所持数を指定します。
 * 
 * @arg ItemKey
 * @desc 処理を行うグループを設定します。(リスト番号1に記入)
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
 * @desc アイテムグループ名を設定します。(リスト番号1に記入)
 * @text アイテムグループ名
 * @type combo[]
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
  const parameters = PluginManager.parameters('NUUN_GroupMaxItems');
  const ItemGroupMaxItems = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ItemGroupMaxItems'])) : null) || [];
  const ItemGroupMax = Number(parameters['ItemGroupMax'] || 0);
  const WeaponGroupMax = Number(parameters['WeaponGroupMax'] || 0);
  const ArmorGroupMax = Number(parameters['ArmorGroupMax'] || 0);
  let itemType = null;

  const pluginName = 'NUUN_GroupMaxItems';
  PluginManager.registerCommand(pluginName, 'ChangeMaxItemSum', args => {
    changeMaxItemSum(args);
  });

  function changeMaxItemSum(args) {
    const key = args.ItemKey ? DataManager.nuun_structureData(args.ItemKey)[0] : null;
    if (key === 'item') {
      $gameParty._groupMaxItems = Number(args.MaxSum);
    } else if (key === 'weapon') {
      $gameParty._groupMaxWeapons = Number(args.MaxSum);
    } else if (key === 'armor') {
      $gameParty._groupMaxArmors = Number(args.MaxSum);
    } else if (key) {
      const index = ItemGroupMaxItems.findIndex(data => data.ItemDefaultGroupKey[0] === key);
      if (!this._groupMaxGroupItems) {
        this._groupMaxGroupItems = [];
      }
      this._groupMaxGroupItems[index] = Number(args.MaxSum);
    }
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
  };

  Game_Party.prototype.groupMaxItems = function(item) {
    itemType = null;
    const index = this.groupMaxItemsIndex(item);
    const find = ItemGroupMaxItems[index];
    if (find && find.GroupDefaultSumMax > 0) {
      if (this._groupMaxGroupItems && this._groupMaxGroupItems[index] > 0) {
        return this._groupMaxGroupItems[index];
      }
      itemType = find.ItemDefaultGroupKey[0];
      return find.GroupDefaultSumMax;
    } else if (DataManager.isItem(item)) {
      itemType = 'item';
      return this._groupMaxItems > 0 ? this._groupMaxItems : ItemGroupMax;
    } else if (DataManager.isWeapon(item)) {
      itemType = 'weapon';
      return this._groupMaxWeapons > 0 ? this._groupMaxWeapons : WeaponGroupMax;
    } else if (DataManager.isArmor(item)) {
      itemType = 'armor';
      return this._groupMaxArmors > 0 ? this._groupMaxArmors : ArmorGroupMax;
    } else {
      return 0;
    }
  };

  Game_Party.prototype.groupMaxItemsIndex = function(item) {
    return ItemGroupMaxItems.findIndex(data => data.ItemDefaultGroupKey[0] === item.meta.ItemGroup);
  };

  const _Game_Party_gainItem = Game_Party.prototype.gainItem;
  Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    const container = this.itemContainer(item);
    if (container && amount > 0) {
      const maxGroupItems = this.groupMaxItems(item);
      if (maxGroupItems > 0) {
        const num = Math.max(maxGroupItems - this.getGroupMaxItems(), 0);
        amount = amount.clamp(0, num);
      }
    }
    _Game_Party_gainItem.call(this, item, amount, includeEquip);
  };
  
  Game_Party.prototype.getGroupMaxItems = function() {
    if (itemType === 'item') {
      return this.items().reduce((r, item) => r + this.numItems(item), 0);
    } else if (itemType === 'weapon') {
      return this.weapons().reduce((r, item) => r + this.numItems(item), 0);
    } else if (itemType === 'armor') {
      return this.armors().reduce((r, item) => r + this.numItems(item), 0);
    } else {
      return this.allItems().reduce((r, item) => r + (item.meta.ItemGroup === itemType ? this.numItems(item) : 0), 0);
    }
  };

  const _Game_Party_hasMaxItems =Game_Party.prototype.hasMaxItems;
  Game_Party.prototype.hasMaxItems = function(item) {
    return _Game_Party_hasMaxItems.call(this, item) || this.hasGroupMaxItems(item);
  };
  
  Game_Party.prototype.hasGroupMaxItems = function(item) {
    const maxGroupItems = this.groupMaxItems(item);
    const groupMaxItems = $gameParty.getGroupMaxItems();
    return groupMaxItems >= maxGroupItems;
  };


  const _Scene_Shop_maxBuy = Scene_Shop.prototype.maxBuy;
  Scene_Shop.prototype.maxBuy = function() {
    let max = _Scene_Shop_maxBuy.call(this);
    const maxGroupItems = $gameParty.groupMaxItems(this._item);
    if (maxGroupItems > 0) {
      const num = Math.max(maxGroupItems - $gameParty.getGroupMaxItems(), 0);
      return max.clamp(0, num);
    }
    return max;
  };

})();
