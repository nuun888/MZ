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
 * 回復効果率によってダメージ量も変わります。
 * 特徴を有するメモ欄
 * <RecoveryReversal> 回復効果を受けるとダメージを受けます。
 * <HPRecoveryReversal> HP回復効果を受けるとダメージを受けます。
 * <MPRecoveryReversal> MP回復効果を受けるとダメージを受けます。
 * 
 * アイテム、スキルのメモ欄
 * <NoRecoveryReversal> 回復効果反転特徴の影響を無視します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/8/7 Ver.1.0.0
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
  const flag = this.getReversalFlag();
  this.setReversalFlag(false);
  return flag ? -1 : 1;
};

Game_BattlerBase.prototype.hpRecoveryReversal = function() {
  return this.traitObjects().some(trait => trait.meta.RecoveryReversal || trait.meta.HPRecoveryReversal);
};

Game_BattlerBase.prototype.mpRecoveryReversal = function() {
  return this.traitObjects().some(trait => trait.meta.RecoveryReversal || trait.meta.MPRecoveryReversal);
};

Game_BattlerBase.prototype.setReversalFlag = function(flag) {
  this._reversalFlag = flag;
};

Game_BattlerBase.prototype.getReversalFlag = function() {
  return this._reversalFlag
};


const _Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;
Game_Action.prototype.makeDamageValue = function(target, critical) {
  if (!this.noRecoveryReversal()) {
    if (this.isHpRecover()) {
      target.setReversalFlag(target.hpRecoveryReversal());
    } else if (this.isMpRecover()){
      target.setReversalFlag(target.mpRecoveryReversal());
    }
  }
  return _Game_Action_makeDamageValue.call(this, target, critical);
};

const _Game_Action_itemEffectRecoverHp = Game_Action.prototype.itemEffectRecoverHp;
Game_Action.prototype.itemEffectRecoverHp = function(target, effect) {  
  if (!this.noRecoveryReversal()) {
    target.setReversalFlag(target.hpRecoveryReversal());
  }
  _Game_Action_itemEffectRecoverHp.call(this, target, effect);
};

const _Game_Action_itemEffectRecoverMp = Game_Action.prototype.itemEffectRecoverMp;
Game_Action.prototype.itemEffectRecoverMp = function(target, effect) {
  if (!this.noRecoveryReversal()) {
    target.setReversalFlag(target.mpRecoveryReversal());
  }
  _Game_Action_itemEffectRecoverMp.call(this, target, effect);
};

Game_Action.prototype.noRecoveryReversal = function() {
  return this.item().meta.NoRecoveryReversal;
};

})();