/*:-----------------------------------------------------------------------------------
 * NUUN_MaxItem.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 更新履歴
 * 2020/11 Ver 1.0.0
 */ 
/*:
 * @target MZ
 * @plugindesc アイテムの個別最大数 ver1.0.0
 * @author ヽ(´ω`)ノ
 * 
 * @help
 * アイテムの所持数を個別に設定します。
 * アイテム、武器、防具のメモ欄に以下の書式を記入します。
 * <MaxItems:10> そのアイテムは最大１０個までしか持つことはできません。
 * 
 * またデフォルトの最大所持数も設定することもできます。
 * 上記の記入がある場合そちらが優先となります。
 * 
 * 最大所持数を高く設定すると個数表示上、文字が潰れて読みづらくなった場合、
 * 個数の桁数の増やしてみてください。（デフォルト00)
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
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
 * 
 * @param NumberDigits
 * @desc 個数の桁数
 * @text 個数の桁数を設定します。例　0が３つで３桁分(000)
 * @type string
 * @default 00
 * 
 */

(() => {
  const parameters = PluginManager.parameters('NUUN_MaxItem');
  const defaultMaxItem = Number(parameters['DefaultMaxItem'] || 99);
  const defaultMaxWeapon = Number(parameters['DefaultMaxWeapon'] || 99);
  const defaultMaxArmor = Number(parameters['DefaultMaxArmor'] || 99);
  const numberDigits = String(parameters['NumberDigits'] || '00');

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
      return defaultMaxItem;
    } else if (DataManager.isWeapon(item)) {
      return defaultMaxWeapon;
    } else if (DataManager.isArmor(item)) {
      return defaultMaxArmor;
    } else {
      return null;
    }
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
