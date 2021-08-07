/*:-----------------------------------------------------------------------------------
 * NUUN_RecoveryReversal.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc 回復効果反転特徴
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * 回復効果を受けるとダメージを受ける特徴を設定できます。
 * 特徴を有するメモ欄
 * <RecoveryReversal> 回復効果を受けるとダメージを受けます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/8/ Ver.1.0.0
 * 初版
 * 
 */
var Imported = Imported || {};
Imported.NUUN_RecoveryReversal = true;

(() => {
const parameters = PluginManager.parameters('NUUN_RecoveryReversal');

const _Game_BattlerBase_sparam = Game_BattlerBase.prototype.sparam;
Game_BattlerBase.prototype.sparam = function(sparamId) {
  let rate = _Game_BattlerBase_sparam.call(this, sparamId);
  if (sparamId === 2) {
    rate *= this.recoveryReversal();
  }
  return rate;
};

Game_BattlerBase.prototype.recoveryReversal = function() {
  const result = this.traitObjects().some(trait => trait.meta.RecoveryReversal);
  return result ? -1 : 1;
};

})();