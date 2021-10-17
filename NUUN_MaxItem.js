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
 * @version 1.3.0
 * @base NUUN_Base
 * 
 * @help
 * アイテムの最大所持数を変更します。
 * アイテム、武器、防具のメモ欄に以下の書式を記入します。
 * <MaxItems:10> そのアイテムは最大１０個までしか持つことはできません。
 * <NoItemNum> アイテムの個数を表示しません。
 * <ItemGroup:[GroupName]> アイテムのグループを割り当てます。[GroupName]:グループ名
 * アイテムのグループごとに最大所持数を変更するときに使用します。
 * <ItemGroup:回復> このアイテムのグループは回復に属します。
 * 
 * 優先度
 * 個別に設定した最大数 ＞ 変更した最大数 ＞ グループの最大所持数 ＞ カテゴリー内の最大数 ＞ デフォルト最大数
 * 
 * 最大所持数を高く設定すると個数表示上、文字が潰れて読みづらくなった場合、
 * 個数の桁数の増やしてみてください。（デフォルト00)
 * 
 * グループまたはカテゴリーごとに最大所持数を設定できます。なおカテゴリーは別途NUUN_ItemCategoryが必要です。
 * 優先度はグループの最大所持数＞カテゴリーの最大所持数になります。
 * <CategoryType:[key]> に設定したカテゴリーのアイテムのデフォルトの最大所持数が変更されます。
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
 * @desc 処理を行うグループまたはカテゴリーキーを設定します。（カテゴリーはNUUN_ItemCategoryが必要です）
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
 * @desc 処理を行うグループまたはカテゴリーキーを設定します。（カテゴリーはNUUN_ItemCategoryが必要です）
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
 * @desc 処理を行うグループまたはカテゴリーキーを設定します。（カテゴリーはNUUN_ItemCategoryが必要です）
 * @text キー
 * @type string
 * @default
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

(() => {
  const parameters = PluginManager.parameters('NUUN_MaxItem');
  const defaultMaxItem = Number(parameters['DefaultMaxItem'] || 99);
  const defaultMaxWeapon = Number(parameters['DefaultMaxWeapon'] || 99);
  const defaultMaxArmor = Number(parameters['DefaultMaxArmor'] || 99);
  const numberDigits = String(parameters['NumberDigits'] || '00');
  const ItemNumMode = Number(parameters['ItemNumMode'] || 0);
  const CustomDefault = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['CustomDefault'])) : null) || [];
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

  const _Game_Party_initialize = Game_Party.prototype.initialize;
  Game_Party.prototype.initialize = function() {
    _Game_Party_initialize.call(this);
    this._itemsMaxItem = [];
    this._weaponsMaxItem = [];
    this._armorsMaxItem = [];
    this._categoryMaxItem = [];
  };

  Game_Party.prototype.setMaxItem = function(id, maxNum) {
    if (!this._itemsMaxItem) {
      this._itemsMaxItem = [];
    }
    this._itemsMaxItem[id] = maxNum;
    const item = $dataItems[id];console.log(maxNum)
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
    if (item.meta.MaxItems && item.meta.MaxItems > 0) {
      return Number(item.meta.MaxItems);
    }
    const type = itemType(item);
    const maxNum = this.getMaxItems(item, type);
    if (maxNum > 0) {
      return maxNum;
    }
    return this.defaultMax(item, type);
  };

  Game_Party.prototype.getMaxItems = function(item, type) {
    if (type === 'item' && this._itemsMaxItem) {
      return this._itemsMaxItem[item.id] || 0;
    } else if (type === 'weapon' && this._weaponsMaxItem) {
      return this._weaponsMaxItem[item.id] || 0;
    } else if (type === 'armor' && this._armorsMaxItem) {
      return this._armorsMaxItem[item.id] || 0;
    } else {
      return 0;
    }
  };

  Game_Party.prototype.defaultMax = function(item, type) {
    return this.customDefaultMax(item, type);
  };

  Game_Party.prototype.customDefaultMax = function(item, type) {
    const find = CustomDefault.find(data => data.CustomDefaultKey === this.getCategoryType(item, type));
    if (find) {
      return find.CustomDefaultMax || 99;
    } else {
      if (type === 'item') {
        return defaultMaxItem;
      } else if (type === 'weapon') {
        return defaultMaxWeapon;
      } else if (type === 'armor') {
        return defaultMaxArmor;
      } else {
        return 99;
      }
    }
  };

  Game_Party.prototype.getCategoryType = function(item, type) {
    if (item.meta.ItemGroup) {
      return (item.meta.ItemGroup).trim();
    }
    return Imported.NUUN_ItemCategory && item.meta.CategoryType ? (item.meta.CategoryType).trim() : getCategoryKeyItem(item, type);
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


  function setItemData(item) {
    itemData = item;
  }

  function getItemData() {
    return itemData;
  }

  function itemType(item) {
    if (DataManager.isItem(item)) {
      return 'item';
    } else if (DataManager.isWeapon(item)) {
      return 'weapon'
    } else if (DataManager.isArmor(item)) {
      return 'armor'
    } else {
      return null;
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

  function changeMaxItem(args) {
    if (Number(args.Item) > 0) {
      $gameParty.setMaxItem(Number(args.Item), Number(args.MaxNum));
    } else {
      for (const item of $dataItems) {
        if (item && item.name) {
          if (args.ItemKey) {
            if (args.ItemKey === $gameParty.getCategoryType(item, 'item')) {
              $gameParty.setMaxItem(item.id, Number(args.MaxNum));
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
            }
          } else {
            $gameParty.setArmorMaxItem(item.id, Number(args.MaxNum));
          }
        }
      }
    }
  };

  function changeCategoryMaxItem(args) {
    const keys = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(args.ItemKey)) : null) || [];
    for (const item of $dataItems) {
      if (item && item.name) {
        const find = keys.find(key => {
          return key === $gameParty.getCategoryType(item, 'item');
        });
        if (find) {
          $gameParty.setMaxItem(item.id, Number(args.MaxNum));
          $gameParty._categoryMaxItem[index] = Number(args.MaxNum);
        }
      }
    }
  };

  function changeCategoryMaxWeapon(args) {
    const keys = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(args.ItemKey)) : null) || [];
    for (const item of $dataWeapons) {
      if (item && item.name) {
        const index = keys.findIndex(key => {
          return key === $gameParty.getCategoryType(item, 'weapon');
        });
        if (index >= 0) {
          $gameParty.setWeaponMaxItem(item.id, Number(args.MaxNum));
          $gameParty._categoryMaxItem[index] = Number(args.MaxNum);
        }
      }
    }
  };

  function changeMaxArmor(args) {
    const keys = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(args.ItemKey)) : null) || [];
    for (const item of $dataArmors) {
      if (item && item.name) {
        const find = keys.find(key => {
          return key === $gameParty.getCategoryType(item, 'armor');
        });
        if (find) {
          $gameParty.setArmorMaxItem(item.id, Number(args.MaxNum));
          $gameParty._categoryMaxItem[index] = Number(args.MaxNum);
        }
      }
    }
  };

})();
