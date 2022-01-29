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
 * @version 1.0.1
 * @base NUUN_DropItemRateBase
 * @orderAfter NUUN_DropItemRateBase
 * 
 * @help
 * アイテムのドロップ率を百分率にします。
 * 敵のデータベースのドロップアイテムの出現率に1～1000の間で設定してください。
 * 
 * ドロップ率設定の一の位が小数点第一位になります。
 * 600と設定した場合は60%の確率でドロップします。
 * 255と設定した場合は25.5%の確率でドロップします。
 * アイテム入手率２倍時の時はドロップ率が設定した数値の２倍の値になります。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/1/29 Ver.1.0.1
 * ドロップアイテム取得の処理を別プラグインで処理化。
 * 2021/8/13 Ver.1.0.0
 * 初版
 * 
 */
var Imported = Imported || {};
Imported.NUUN_DropRatePercentage = true;

(() => {
const parameters = PluginManager.parameters('NUUN_DropRatePercentage');

Game_Enemy.prototype.randomValue = function(di, rate, i) {
    return Math.random() * 1000;
};

Game_Enemy.prototype.rateValue = function(di, rate, i) {
    return di.denominator * rate;
};

Game_Enemy.prototype.getDropItemsRatePercentage = function(di) {
    return di.denominator / 10;
};

})();