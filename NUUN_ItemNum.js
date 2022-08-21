/*:-----------------------------------------------------------------------------------
 * NUUN_ItemNum.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc アイテム個数表示変更
 * @author NUUN
 * @version 1.0.1
 * 
 * @help
 * アイテムの個数表示をカスタマイズします。
 * 
 * 最大所持数を高く設定すると個数表示上、文字が潰れて読みづらくなった場合、個数の桁数の増やしてみてください。（デフォルト00)
 * 
 * party:パーティ
 * num:所持個数
 * maxNum:最大個数
 * 
 * アイテムのメモ欄
 * <NoItemNum> アイテムの個数を表示しません。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/8/22 Ver.1.0.1
 * ''で囲うと評価式が評価しない問題を修正。
 * 2022/6/11 Ver.1.0.0
 * 初版
 * 
 * @param NumberDigits
 * @desc 個数の桁数
 * @text 個数の桁数を設定します。例　0が３つで３桁分(000)
 * @type string
 * @default 00
 * 
 * @param ItemNumPrefix
 * @desc 所持数の前に表示する文字列を設定します。
 * @text 所持数前文字列
 * @type string
 * @default :
 * 
 * @param ItemNumEval
 * @text 所持数の形式
 * @desc 所持数の表示形式を評価式で指定します。(''または""で囲む)
 * @type combo
 * @option 'num'
 * @option 'num +"/"+ maxNum'
 * @default 'num'
 * 
 */

var Imported = Imported || {};
Imported.NUUN_ItemNum = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_ItemNum');
    const numberDigits = String(parameters['NumberDigits'] || '00');
    const ItemNumPrefix = String(parameters['ItemNumPrefix'] || ':');
    const ItemNumEval = eval(parameters['ItemNumEval']) || 'num';
    let itemData = null;

    const _Window_ItemList_drawItem = Window_ItemList.prototype.drawItem;
    Window_ItemList.prototype.drawItem = function(index) {
      this.setItemData(this.itemAt(index));
      _Window_ItemList_drawItem.call(this, index);
    };

    Window_ItemList.prototype.setItemData = function(item) {
      itemData = item;
    };

    Window_ItemList.prototype.numberWidth = function() {//再定義
      return itemData.meta.NoItemNum ? 0 : this.textWidth(numberDigits + '0');
    };

    Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {//再定義
      if (this.needsNumber() && !item.meta.NoItemNum) {
        const numberWidth = this.textWidth(numberDigits);
        this.drawText(ItemNumPrefix, x, y, width - numberWidth, "right");
        const party = $gameParty;
        const num = party.numItems(item);
        const maxNum = party.maxItems(item);
        const text = eval(ItemNumEval);
        this.drawText(text, x + width - numberWidth, y, numberWidth, "right");
      }
    };

})();