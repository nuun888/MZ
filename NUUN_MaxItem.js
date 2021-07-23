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
 * @version 1.2.0
 * 
 * @help
 * アイテムの最大所持数を変更します。
 * アイテム、武器、防具のメモ欄に以下の書式を記入します。
 * <MaxItems:10> そのアイテムは最大１０個までしか持つことはできません。
 * <NoItemNum> アイテムの個数を表示しません。
 * <ItemGroup:[GroupName]> アイテムのグループを割り当てます。[GroupName]:グループ名
 * アイテムのグループごとに最大所持数を変更するときに使用します。
 * <ItemGroup:medicine> このアイテムのグループはmedicineに属します。
 * ※:の後にスペースを入れると正常に取得できない場合があります。
 * 
 * 優先度
 * 個別に設定した最大数 ＞ 変更した最大数 ＞ グループの最大数 ＞ カテゴリー内の最大数 ＞ デフォルト最大数
 * 
 * 最大所持数を高く設定すると個数表示上、文字が潰れて読みづらくなった場合、
 * 個数の桁数の増やしてみてください。（デフォルト00)
 * 
 * 以下の機能はNUUN_Base Ver1.1.3以降、NUUN_ItemCategoryが必要です。
 * NUUN_ItemCategory（アイテムカテゴリーカスタマイズ）と併用している場合、そのカテゴリー内の
 * アイテムのデフォルトの愛大所持数を設定できます。なおアイテムのみ有効です。
 * <CategoryType:[key]> に設定したカテゴリーのアイテムのデフォルトの最大所持数が変更されます。
 * 
 * 予約カテゴリーキー
 * keyItem：大事なもの
 * HiddenItemA：隠しアイテムA
 * HiddenItemB：隠しアイテムB
 * カテゴリーキーにkeyItemと記入した場合は大事なもの（CategoryTypeタグを記入していない）のアイテムのデフォルトの最大所持数が変更されます。
 * 
 * プラグインコマンド
 * プラグインコマンドでアイテム、武器、防具の最大所持数を変更できます。なお変更後に最大所持数を超えていた場合は超えた個数分消滅します。
 * 変更対象キーの設定方法
 * [key], [mode]:[key]カテゴリー又はグループ名　[mode]Category:カテゴリー　Group:アイテムグループ　※省略可
 * 設定例　プラグインコマンド
 * item, Category アイテムカテゴリーのアイテムの最大所持数が変更されます。
 * item アイテムカテゴリーのアイテムの最大所持数が変更されます。
 * medicine, Group アイテム、武器、防具に<ItemGroup:medicine>が記入されているアイテムの最大所持数が変更されます。
 * キーを記入しない場合はすべてのアイテムが変更されます。
 * 変更できるキーは複数設定できます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
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
 * @text 変更対象キー
 * @desc 最大所持数を変更する対象のキーを設定します。(アイテムが0に設定されてる場合のみ) ※複数指定可能
 * @type combo[]
 * @option 'item, Category'
 * @option 'keyItem, Category'
 * @default 'keyItem, Category'
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
 * @text 対象カテゴリー
 * @desc 最大所持数を変更する対象のカテゴリーを設定します。(武器が0に設定されてる場合のみ) ※複数指定可能
 * @type combo[]
 * @option 'weapon, Category'
 * @default 'weapon, Category'
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
 * @arg ItemKey
 * @text 対象カテゴリー
 * @desc 最大所持数を変更する対象のカテゴリーを設定します。(防具が0に設定されてる場合のみ) ※複数指定可能
 * @type combo[]
 * @option 'Armor, Category'
 * @default 'Armor, Category'
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
 * @desc アイテムカテゴリーカスタマイズで設定したカテゴリーアイテムのデフォルト最大所持数(要NUUN_ItemCategory)
 * @text カテゴリー最大所持数
 * @type struct<CustomDefaultList>[]
 * @default []
 * 
 * @param ItemGroupMaxItems
 * @desc 種類ごとのアイテム所持数を設定します。
 * @text 種類ごと最大所持数
 * @type struct<ItemGroupDefaultList>[]
 * @default []
 * 
 * @param NumberDigits
 * @desc 個数の桁数
 * @text 個数の桁数を設定します。例　0が３つで３桁分(000)
 * @type string
 * @default 00
 * 
 * @param ItemNumMode
 * @desc 表示形式。
 * @text 表示形式
 * @type select
 * @option 所持個数のみ
 * @value 0
 * @option 所持個数/所持最大数
 * @value 1
 * @default 0
 * 
 */
/*~struct~CustomDefaultList:
 *
 * @param CustomDefaultKey
 * @desc カテゴリーキーを設定します。NUUN_ItemCategoryのカテゴリー設定と同じように設定してください。
 * @text カテゴリーキー
 * @type string
 * @default
 * 
 * @param CustomDefaultMax
 * @desc カテゴリーのデフォルト最大所持数
 * @text カテゴリー最大所持数
 * @type number
 * @default 99
 * @min 1
 *
 */
/*~struct~ItemGroupDefaultList:
 *
 * @param ItemDefaultGroupId
 * @desc アイテムグループ名を設定します。
 * @text アイテムグループ名
 * @type string
 * @default
 * 
 * @param GroupDefaultMax
 * @desc アイテムグループのデフォルト最大所持数
 * @text アイテムグループ最大所持数
 * @type number
 * @default 99
 * @min 1
 *
 */

(() => {
  const parameters = PluginManager.parameters('NUUN_MaxItem');
  const defaultMaxItem = Number(parameters['DefaultMaxItem'] || 99);
  const defaultMaxWeapon = Number(parameters['DefaultMaxWeapon'] || 99);
  const defaultMaxArmor = Number(parameters['DefaultMaxArmor'] || 99);
  const numberDigits = String(parameters['NumberDigits'] || '00');
  const ItemNumMode = Number(parameters['ItemNumMode'] || 0);
  const CustomDefault = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['CustomDefault'])) : null) || [];
  const ItemGroupMaxItems = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ItemGroupMaxItems'])) : null) || [];
  let itemData = null;

  const pluginName = 'NUUN_MaxItem';
  PluginManager.registerCommand(pluginName, 'ChangeMaxItem', args => {
    changeMaxItem(args);
  });

  PluginManager.registerCommand(pluginName, 'ChangeMaxWeapon', args => {
    changeMaxWeapon(args);
  });

  PluginManager.registerCommand(pluginName, 'ChangeMaxArmor', args => {
    changeMaxArmor(args);
  });

  function setItemData(item) {
    itemData = item;
  }

  function getItemData() {
    return itemData;
  }

  function changeMaxItem(args) {
    if (args.Item > 0) {
      $gameParty.setMaxItem(args.Item, args.MaxNum);
    } else {
      const keys = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(args.ItemKey)) : null) || [];
      for (const item of $dataItems) {
        if (item && item.name) {
          const find = keys.find(key => {
            const keyData = key.split(',');
            if (keyData[1] && keyData[1].trim() === 'Group') {
              return keyData[0] === $gameParty.getGroupType(item);
            } else {
              return keyData[0] === $gameParty.getCategoryType(item);
            }
          });
          if (keys.length === 0 || find) {
            $gameParty.setMaxItem(item.id, args.MaxNum);
          }
        }
      }
    }
  };

  function changeMaxWeapon(args) {
    if (args.Weapon > 0) {
      $gameParty.setWeaponMaxItem(args.Weapon, args.MaxNum);
    } else {
      const keys = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(args.ItemKey)) : null) || [];
      for(const item of $dataWeapons) {
        if (item && item.name) {
          const find = keys.find(key => {
            const keyData = key.split(',');
            if (keyData[1] && keyData[1].trim() === 'Group') {
              return keyData[0] === $gameParty.getEquipGroupType(item);
            } else {
              return keyData[0] === $gameParty.getEquipCategoryType(item);
            }
          });
          if (keys.length === 0 || find) {
            $gameParty.setWeaponMaxItem(item.id, args.MaxNum);
          }
        }
      }
    }
  };

  function changeMaxArmor(args) {
    if (args.Armor > 0) {
      $gameParty.setArmorMaxItem(args.Armor, args.MaxNum);
    } else {
      const keys = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(args.ItemKey)) : null) || [];
      for(const item of $dataArmors) { 
        if (item && item.name) {
          const find = keys.find(key => {
            const keyData = key.split(',');
            if (keyData[1] && keyData[1].trim() === 'Group') {
              return keyData[0] === $gameParty.getEquipGroupType(item);
            } else {
              return keyData[0] === $gameParty.getEquipCategoryType(item);
            }
          });
          if (keys.length === 0 || find) {
            $gameParty.setArmorMaxItem(item.id, args.MaxNum);
          }
        }
      }
    }
  };

  const _Game_Party_initialize = Game_Party.prototype.initialize;
  Game_Party.prototype.initialize = function() {
    _Game_Party_initialize.call(this);
    this.initMaxItemsList();
  };

  Game_Party.prototype.initMaxItemsList = function() {
    this._itemsMaxItem = [];
    this._weaponsMaxItem = [];
    this._armorsMaxItem = [];
  };

  Game_Party.prototype.setMaxItem = function(id, maxNum) {
    if (!this._itemsMaxItem) {
      this._itemsMaxItem = [];
    }
    this._itemsMaxItem[id] = maxNum;
    const item = $dataItems[id];
    const nowNumber = this.numItems(item);
    if (nowNumber > this.maxItems(item)) {
      const container = this.itemContainer(item);
      container[id] = Math.min(nowNumber, this.maxItems(item));
    }
  };

  Game_Party.prototype.setWeaponMaxItem = function(id, maxNum) {
    if (!this._weaponsMaxItem) {
      this._weaponsMaxItem = [];
    }
    this._weaponsMaxItem[id] = maxNum;
    const item = $dataWeapons[id];
    const nowNumber = this.numItems(item);
    if (nowNumber > this.maxItems(item)) {
      const container = this.itemContainer(item);
      container[id] = Math.min(nowNumber, this.maxItems(item));
    }
  };

  Game_Party.prototype.setArmorMaxItem = function(id, maxNum) {
    if (!this._armorsMaxItem) {
      this._armorsMaxItem = [];
    }
    this._armorsMaxItem[id] = maxNum;
    const item = $dataArmors[id];
    const nowNumber = this.numItems(item);
    if (nowNumber > this.maxItems(item)) {
      const container = this.itemContainer(item);
      container[id] = Math.min(nowNumber, this.maxItems(item));
    }
  };


  Game_Party.prototype.maxItems = function(item) {//再定義 
    if (item.meta.MaxItems) {
      return Number(item.meta.MaxItems);
    }
    const maxNum = this.getMaxItems(item);
    if (maxNum > 0) {
      return maxNum;
    }
    return this.defaultMax(item);
  };

  Game_Party.prototype.getMaxItems = function(item) {
    if (!item) {
      return 0;
    } else if (this._itemsMaxItem && DataManager.isItem(item)) {
      return this._itemsMaxItem[item.id] || 0;
    } else if (this._weaponsMaxItem && DataManager.isWeapon(item)) {
      return this._weaponsMaxItem[item.id] || 0;
    } else if (this._armorsMaxItem && DataManager.isArmor(item)) {
      return this._armorsMaxItem[item.id] || 0;
    } else {
      return 0;
    }
  };

  Game_Party.prototype.defaultMax = function(item) {
    if (!item) {
      return null;
    } else if (DataManager.isItem(item)) {
      return this.defaultMaxItem(item);
    } else if (DataManager.isWeapon(item)) {
      return this.defaultMaxWeapon(item);
    } else if (DataManager.isArmor(item)) {
      return this.defaultMaxArmor(item);
    } else {
      return null;
    }
  };

  Game_Party.prototype.defaultMaxItem = function(item) {
    if (item.meta.ItemGroup) {
      const groupMaxItem = this.getGroupItem(item);
      if (groupMaxItem) {
        return groupMaxItem;
      }
    }
    if (Imported.NUUN_ItemCategory) {
      return this.customDefaultMax(item);
    } else {
      return defaultMaxItem;
    }
  };

  Game_Party.prototype.defaultMaxWeapon = function(item) {
    if (item.meta.ItemGroup) {
      const groupMaxItem = this.getGroupItem(item);
      if (groupMaxItem) {
        return groupMaxItem;
      }
    }
    return defaultMaxWeapon;
  };

  Game_Party.prototype.defaultMaxArmor = function(item) {
    if (item.meta.ItemGroup) {
      const groupMaxItem = this.getGroupItem(item);
      if (groupMaxItem) {
        return groupMaxItem;
      }
    }
    return defaultMaxArmor;
  };

  Game_Party.prototype.customDefaultMax = function(item) {
    const find = CustomDefault.find(data => data.CustomDefaultKey === this.getCategoryType(item));
    return find ? find.CustomDefaultMax || defaultMaxItem : defaultMaxItem;
  };

  Game_Party.prototype.getCategoryType = function(item) {
    return item.meta.CategoryType ? (item.meta.CategoryType).trim() : this.getCategoryKeyItem(item);
  };

  Game_Party.prototype.getEquipCategoryType = function(item) {
    return item.meta.CategoryType ? (item.meta.CategoryType).trim() : (DataManager.isWeapon(item) ? 'weapon' : 'armor');
  };

  Game_Party.prototype.getGroupType = function(item) {
    return item.meta.ItemGroup ? (item.meta.ItemGroup).trim() : this.getCategoryKeyItem(item);
  };

  Game_Party.prototype.getEquipGroupType = function(item) {
    return item.meta.ItemGroup ? (item.meta.ItemGroup).trim() : (DataManager.isWeapon(item) ? 'weapon' : 'armor');
  };

  Game_Party.prototype.getCategoryKeyItem = function(item) {
    if (item.itypeId === 2) {
      return "keyItem";
    } else if (item.itypeId === 3) {
      return "HiddenItemA";
    } else if (item.itypeId === 4) {
      return "HiddenItemB";
    }
    return "item";
  };

  Game_Party.prototype.getGroupItem = function(item) {
    const find = ItemGroupMaxItems.find(key => key.ItemDefaultGroupId === item.meta.ItemGroup);
    return find ? find.GroupDefaultMax: null;
  };

  Window_ItemList.prototype.numberWidth = function() {//再定義
    return getItemData().meta.NoItemNum ? 0 : this.textWidth(numberDigits + '0');
  };

  const _Window_ItemList_drawItem = Window_ItemList.prototype.drawItem;
  Window_ItemList.prototype.drawItem = function(index) {
    setItemData(this.itemAt(index));
    _Window_ItemList_drawItem.call(this, index);
};

  Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {//再定義
    if (this.needsNumber() && !item.meta.NoItemNum) {
        const numberWidth = this.textWidth(numberDigits);
        this.drawText(":", x, y, width - numberWidth, "right");
        let text = null;
        if (ItemNumMode === 0) {
          text = $gameParty.numItems(item);
        } else {
          text = $gameParty.numItems(item) +"/"+ $gameParty.maxItems(item);
        }
        this.drawText(text, x + width - numberWidth, y, numberWidth, "right");
    }
  };
})();
