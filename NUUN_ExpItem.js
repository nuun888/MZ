/*:-----------------------------------------------------------------------------------
 * NUUN_ExpItem.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 更新履歴
 * 2020/11/21 Ver 1.0.0
 * 
 * 2020/11/21 Ver 1.0.1
 *  レベルが１上がったら経験値の増加をしない機能と、経験値減少時にレベルダウンをしない機能を追加。
 * 
 * 2020/11/22 Ver 1.0.2
 *  バトルログに表示するように対応。
 */ 
/*:
 * 
 * @target MZ
 * @plugindesc 経験値増減アイテム、スキル
 * @author NUUN
 * 
 * @help
 * 経験値を増減させるアイテムやスキルを作ることが出来ます。
 * 
 * アイテム、スキルのメモ欄に記入します。
 * <ExpIncrease:10000> 経験値が10000増加します。
 * <ExpIncrease:-5000> 経験値が5000減少します。
 * <levelUpStop> レベルが１つ上がったら経験値の増加を行わないようにします。（増加経験値の上限値が、次のレベルの到達に必要な累計経験値から現在の経験値を引いた値になります）
 * <NolevelDown> レベルダウンを行わないようにします。（減少経験値の下限値が、現在のレベルの到達に必要な累計経験値から現在の経験値を引いた値になります）
 *               
 * <ExpIncrease:1000000>
 * <levelUpStop>
 * このような記述をすることでレベルアップアイテムを作ることも可能です。
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
    target.expItems(target, this.item());
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

  Game_BattlerBase.prototype.expItems = function(target, item) {
    if(this.isActor()) {
      let expVal = item.meta.ExpIncrease;
      if(item.meta.levelUpStop && expVal > 0) {
        expVal = Math.min(this.nextLevelExp() - this.currentExp(), expVal);
      } else if (item.meta.NolevelDown && expVal < 0) {
        expVal = Math.max(this.currentLevelExp() - this.currentExp(), expVal);
      }
      if(expVal) {
        this.gainExp(expVal);
        if($gameParty.inBattle()) {
          const text = expVal > 0 ? '増加した' : '減少した';
          BattleManager._logWindow.addText(target.name() +'の'+ TextManager.basic(8) +'が'+ expVal + text);
        }
      }
    }
  };
})();