/*:-----------------------------------------------------------------------------------
 * NUUN_AnySellPrice.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc 売値任意設定
 * @author NUUN
 * @version 1.0.0
 *            
 * @help
 * アイテム、武器、防具の売値を価格の半分ではなく任意の売値にします。
 * アイテム、武器、防具のメモ欄
 * <SellPrice:[sell]>
 * [sell]:売値
 * <SellPrice:500> 売値が500になります。
 * <SellPrice:0> 購入することは出来ますが、売ることが出来なくなります。(データベースの価格を1以上に設定した場合)
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/10/9 Ver 1.0.0
 * 初版
 * 
 */
var Imported = Imported || {};
Imported.NUUN_AnySellPrice = true;

(() => {
  function sellPrice(item) {
    return item.meta.SellPrice ? Number(item.meta.SellPrice) : null;
  };

  const _Scene_Shop_sellingPrice = Scene_Shop.prototype.sellingPrice;
  Scene_Shop.prototype.sellingPrice = function() {
    const sell = sellPrice(this._item);
    return sell !== null ? sell : _Scene_Shop_sellingPrice.call(this);
  };

  const _Window_ShopSell_isEnabled = Window_ShopSell.prototype.isEnabled;
  Window_ShopSell.prototype.isEnabled = function(item) {
    const sell = sellPrice(item);
    return sell !== null ? sell > 0 : _Window_ShopSell_isEnabled.call(this, item);
  };
})();