/*:-----------------------------------------------------------------------------------
 * NUUN_LevelItem.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * 
 * @target MZ
 * @plugindesc 経験値増減アイテム、スキル
 * @author NUUN
 * @version 1.1.1
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
 * 更新履歴
 * 2021/5/2 Ver 1.1.1
 * 効果がなかった時のメッセージログを追加。
 * 2020/12/24 Ver 1.1.0
 * 使用時のバトルログをメッセージウィンドウに表示する機能を追加。
 * 2020/12/8 Ver 1.0.3
 * 最大レベルの累計必要経験値超えて取得してしまう不具合を修正。
 * 2020/11/22 Ver 1.0.2
 * バトルログに表示するように対応。
 * 2020/11/21 Ver 1.0.1
 * レベルが１上がったら経験値の増加をしない機能と、経験値減少時にレベルダウンをしない機能を追加。
 * 2020/11/21 Ver 1.0.0
 * 初版
 * 
 * 
 * @param LogWindowShow
 * @text メッセージウィンドウ表示
 * @desc 使用時のログをメッセージウィンドウに表示する。
 * @type boolean
 * @default false
 * 
 */
var Imported = Imported || {};
Imported.NUUN_ExpItem = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_ExpItem');
  const LogWindowShow = eval(parameters['LogWindowShow'] || 'false');

  const _Game_ActionResult_clear = Game_ActionResult.prototype.clear;
Game_ActionResult.prototype.clear = function() {
  _Game_ActionResult_clear.call(this);
  this.useExpItem = false;
  this.useExpItemText = null;
};

  const _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
  Game_Action.prototype.applyItemUserEffect = function(target) {
    _Game_Action_applyItemUserEffect.call(this, target);
    if (this.item().meta.ExpIncrease) {
      target.expItems(target, this.item());
      this.makeSuccess(target);
    }
  };

  Game_Action.prototype.isExpItem = function() {
    return this.item().meta.ExpIncrease;
  };

  Game_Action.prototype.testExpItem = function(target) {
    const result = (this.testLifeAndDeath(target) && (this.isExpItem() && !target.isMaxLevel()))
    return result;
  };

  Game_Action.prototype.isGrow = function(target) {
    return _Game_Action_testApply.call(this, target) || this.testExpItem(target);
  };

  const _Game_Action_testApply = Game_Action.prototype.testApply;
  Game_Action.prototype.testApply = function(target) {
    return _Game_Action_testApply.call(this, target) || this.testExpItem(target);
  };

  Game_BattlerBase.prototype.expItems = function(target, item) {
    if(this.isActor()) {
      let expVal = item.meta.ExpIncrease;
      const originalExp = expVal;
      let text = null;
      if(item.meta.levelUpStop && expVal > 0) {
        expVal = Math.min(this.nextLevelExp() - this.currentExp(), expVal);
      } else if (item.meta.NolevelDown && expVal < 0) {
        expVal = Math.max(this.currentLevelExp() - this.currentExp(), expVal);
      }
      expVal = Math.min(this.expForLevel(this.maxLevel()) - this.currentExp(), expVal);console.log(expVal)
      if(expVal) {
        text = expVal > 0 ? '増加した' : '減少した';
        if (LogWindowShow) {
          $gameMessage.add(target.name() +'の'+ TextManager.basic(8) +'が'+ expVal + text + "!");
        } else {
          target.result().useExpItem = true;
          target.result().useExpItemText = "%1の"+ TextManager.basic(8) +'が'+ expVal + text + "!";
        }
        this.gainExp(expVal);
      } else if (originalExp !== 0) {
        if (!LogWindowShow && expVal === 0) {
          target.result().useExpItem = true;
          target.result().useExpItemText = "%1には効果がなかった!";
        }
      }
    }
  };

  const _Window_BattleLog_displayDamage = Window_BattleLog.prototype.displayDamage;
  Window_BattleLog.prototype.displayDamage = function(target) {
    _Window_BattleLog_displayDamage.call(this, target);
    if (!target.result().missed && !target.result().evaded && target.result().useExpItem){
      this.displayTargetItemMessage(target)
    }
  };

  Window_BattleLog.prototype.displayTargetItemMessage = function(target) {
    const text = target.result().useExpItemText.format(target.name());
    this.push("addText", text);
  };
})();