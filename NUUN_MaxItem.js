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
 * @version 1.1.0
 * 
 * @help
 * アイテムの所持数を個別に設定します。
 * アイテム、武器、防具のメモ欄に以下の書式を記入します。
 * <MaxItems:10> そのアイテムは最大１０個までしか持つことはできません。
 * <NoItemNum> アイテムの個数を表示しません。
 * 
 * またデフォルトの最大所持数も設定することもできます。
 * 最大所持数はメモ欄に設定した最大所持数が優先されます。
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
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/7/11 Ver 1.1.0
 * 特定のアイテム個数を非表示にする機能を追加。
 * 所持個数/最大個数で表示させる機能を追加。
 * 2021/6/21 Ver 1.0.1
 * 隠しアイテムに対応。（要NUUN_ItemCategory）
 * 2021/6/20 Ver 1.0.0
 * 初版
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
 * @param NumberDigits
 * @desc 個数の桁数
 * @text 個数の桁数を設定します。例　0が３つで３桁分(000)
 * @type string
 * @default 00
 * 
 * @param ItemNumMode
 * @desc 表示形式。
 * @text 表示形式。
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

(() => {
  const parameters = PluginManager.parameters('NUUN_MaxItem');
  const defaultMaxItem = Number(parameters['DefaultMaxItem'] || 99);
  const defaultMaxWeapon = Number(parameters['DefaultMaxWeapon'] || 99);
  const defaultMaxArmor = Number(parameters['DefaultMaxArmor'] || 99);
  const numberDigits = String(parameters['NumberDigits'] || '00');
  const ItemNumMode = Number(parameters['ItemNumMode'] || 0);
  const CustomDefault = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['CustomDefault'])) : null) || [];
  let itemData = null;

  function setItemData(item) {
    itemData = item;
  }

  function getItemData() {
    return itemData;
  }

  Game_Party.prototype.maxItems = function(item) {//再定義
    if (item.meta.MaxItems) {
      return Number(item.meta.MaxItems);
    }
    return this.defaultMax(item);
  };

  Game_Party.prototype.defaultMax = function(item) {
    if (!item) {
      return null;
    } else if (DataManager.isItem(item)) {
      return Imported.NUUN_ItemCategory ? this.customDefaultMax(item) : defaultMaxItem;
    } else if (DataManager.isWeapon(item)) {
      return defaultMaxWeapon;
    } else if (DataManager.isArmor(item)) {
      return defaultMaxArmor;
    } else {
      return null;
    }
  };

  Game_Party.prototype.customDefaultMax = function(item) {
    const find = CustomDefault.find(data => data.CustomDefaultKey === this.getCategoryType(item));
    return find ? find.CustomDefaultMax || defaultMaxItem : defaultMaxItem;
  };

  Game_Party.prototype.getCategoryType = function(item) {
    return item.meta.CategoryType ? item.meta.CategoryType : this.getCategoryKeyItem(item);
  };

  Game_Party.prototype.getCategoryKeyItem = function(item) {
    if (item.itypeId === 2) {
      return "keyItem";
    } else if (item.itypeId === 3) {
      return "HiddenItemA";
    } else if (item.itypeId === 4) {
      return "HiddenItemB";
    }
    return null;
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
