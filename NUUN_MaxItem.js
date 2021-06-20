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
 * @version 1.0.0
 * 
 * @help
 * アイテムの所持数を個別に設定します。
 * アイテム、武器、防具のメモ欄に以下の書式を記入します。
 * <MaxItems:10> そのアイテムは最大１０個までしか持つことはできません。
 * 
 * またデフォルトの最大所持数も設定することもできます。
 * 最大所持数はメモ欄に設定した最大所持数が優先されます。
 * 
 * 最大所持数を高く設定すると個数表示上、文字が潰れて読みづらくなった場合、
 * 個数の桁数の増やしてみてください。（デフォルト00)
 * 
 * NUUN_ItemCategory（アイテムカテゴリーカスタマイズ）と併用している場合、そのカテゴリー内の
 * アイテムのデフォルトの愛大所持数を設定できます。なおアイテムのみ有効です。
 * カテゴリーキーにkeyItemと記入した場合は大事なもの（CategoryTypeタグを記入していない）のアイテムのデフォルトの最大所持数が変更されます。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/6/20 Ver 1.0.0
 * 
 * @param DefaultMaxItem
 * @desc デフォルトの最大アイテム所持数
 * @text デフォルトの最大アイテム所持数を設定します。
 * @type number
 * @default 99
 * 
 * @param DefaultMaxWeapon
 * @desc デフォルトの最大武器所持数
 * @text デフォルトの最大武器所持数を設定します。
 * @type number
 * @default 99
 * 
 * @param DefaultMaxArmor
 * @desc デフォルトの最大防具所持数
 * @text デフォルトの最大防具所持数を設定します。
 * @type number
 * @default 99
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
 *
 */

(() => {
  const parameters = PluginManager.parameters('NUUN_MaxItem');
  const defaultMaxItem = Number(parameters['DefaultMaxItem'] || 99);
  const defaultMaxWeapon = Number(parameters['DefaultMaxWeapon'] || 99);
  const defaultMaxArmor = Number(parameters['DefaultMaxArmor'] || 99);
  const numberDigits = String(parameters['NumberDigits'] || '00');
  const CustomDefault = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['CustomDefault'])) : null) || [];

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
    return item.meta.CategoryType ? item.meta.CategoryType : (item.itypeId === 2 ? "keyItem" : null);
  };

  Window_ItemList.prototype.numberWidth = function() {//再定義
    return this.textWidth(numberDigits + '0');
  };

  Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {//再定義
    if (this.needsNumber()) {
        const numberWidth = this.textWidth(numberDigits);
        this.drawText(":", x, y, width - numberWidth, "right");
        this.drawText($gameParty.numItems(item), x + width - numberWidth, y, numberWidth, "right");
    }
  };
})();
