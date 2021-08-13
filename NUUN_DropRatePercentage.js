/*:-----------------------------------------------------------------------------------
 * NUUN_DropRatePercentage.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc ドロップ率百分率化
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * アイテムのドロップ率を百分率にします。
 * ドロップ率設定の一の位が小数点第一位になります。
 * 600と設定した場合は60%の確率でドロップします。
 * 255と設定した場合は25.5%の確率でドロップします。
 * アイテム入手率２倍時の時はドロップ率が設定した数値の２倍の値になります。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/8/13 Ver.1.0.0
 * 初版
 * 
 */
var Imported = Imported || {};
Imported.NUUN_DropRatePercentage = true;

(() => {
const parameters = PluginManager.parameters('NUUN_DropRatePercentage');

Game_Enemy.prototype.makeDropItems = function() {//再定義
  const rate = this.dropItemRate();
  return this.enemy().dropItems.reduce((r, di) => {
      if (di.kind > 0 && Math.random() * 1000 < di.denominator * rate) {
          return r.concat(this.itemObject(di.kind, di.dataId));
      } else {
          return r;
      }
  }, []);
};

})();
