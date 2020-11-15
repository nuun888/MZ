/*:-----------------------------------------------------------------------------------
 * NUUN_ExpItem.js
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
 * 
 * @target MZ
 * @plugindesc 経験値アイテム、スキル
 * @author NUUN
 * 
 * @help
 * アイテム、スキルで経験値の増減をコモンイベントを経由せずに使用させます。
 * これによりアイテム、スキルを使うたびにウィンドウが閉じずに連続で使用することが可能になります。
 * 
 * <ExpIncrease:10000> 経験値が10000増加します。
 * <ExpIncrease:-5000> 経験値が5000減少します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 */
var Imported = Imported || {};
Imported.NUUN_ExpItem = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_ExpItem');

  const _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
  Game_Action.prototype.applyItemUserEffect = function(target) {
    _Game_Action_applyItemUserEffect.call(this, target);
    target.expItems(this.item());
    this.makeSuccess(target);
  };

  Game_Action.prototype.isExpItem = function() {
    return this.item().meta.ExpIncrease;
  };

  const _Game_Action_testApply = Game_Action.prototype.testApply;
  Game_Action.prototype.testApply = function(target) {
    return _Game_Action_testApply.call(this, target) || 
    (this.testLifeAndDeath(target) && (this.isExpItem() && !target.isMaxLevel()))
  };

  Game_BattlerBase.prototype.expItems = function(item) {
    const expVal = item.meta.ExpIncrease;
    if(expVal && this.isActor()) {
      this.gainExp(expVal);
    }
  };
})();