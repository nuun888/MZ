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
 * @version 1.2.1
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
 * メッセージフォーマット
 * 経験値増加時減少時のメッセージ
 * %1:使用者 %2：対象者 %3：経験値
 * 効果なしの時のメッセージ
 * %1:使用者 %2：対象者
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/12/13 Ver 1.2.1
 * 経験値が正常に加算されない問題を修正。
 * 2021/12/6 Ver 1.2.0
 * メッセージのフォーマットを変更。
 * 最大レベルの時に経験値を増加させたときに経験値が減ってしまう問題を修正。
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
 * @param ExpMessageUp
 * @text 経験値増加時メッセージ
 * @desc 経験値増加時のメッセージ。%1:使用者 %2：対象者 %3：経験値
 * @type string
 * @default %2の経験値が%3増加した！
 * 
 * @param ExpMessageDown
 * @text 経験値減少時メッセージ
 * @desc 経験値減少時のメッセージ。%1:使用者 %2：対象者 %3：経験値
 * @type string
 * @default %2の経験値が%3減少した！
 * 
 * @param ExpMessageNoEffect
 * @text 効果なし時メッセージ
 * @desc 効果がなかった時のメッセージ。%1:使用者 %2：対象者
 * @type string
 * @default %2には効果がなかった！
 * 
 */
var Imported = Imported || {};
Imported.NUUN_ExpItem = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_ExpItem');
  const LogWindowShow = eval(parameters['LogWindowShow'] || 'false');
  const ExpMessageUp = String(parameters['ExpMessageUp'] || '%2の経験値が%3増加した！');
  const ExpMessageDown = String(parameters['ExpMessageDown'] || '%2の経験値が%3減少した！');
  const ExpMessageNoEffect = String(parameters['ExpMessageNoEffect'] || '%2には効果がなかった！');
  let gainExpItem = false;

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
      target.expItems(this.subject(), this.item());
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

  Game_Battler.prototype.expItems = function(subject, item) {
    if(this.isActor()) {
      let getExp = Number(item.meta.ExpIncrease);
      const currentExp = this.currentExp();
      let text = null;
      let expVal = Math.round(getExp * this.finalExpRate());
      let limitExp = 0;
      if (item.meta.levelUpStop && expVal > 0) {
        limitExp = this.nextLevelExp() - currentExp;
        expVal = expVal > limitExp ? limitExp : expVal;
      } else if (item.meta.NolevelDown && expVal < 0) {
        limitExp = this.currentLevelExp() - currentExp;
        expVal = expVal < limitExp ? limitExp : expVal;
      } else {
        limitExp = this.expForLevel(this.maxLevel()) - currentExp;
        expVal = expVal > limitExp ? limitExp : expVal;
      }
      if(expVal) {
        if (expVal > 0) {
          text = ExpMessageUp.format(subject.name(), this.name(), expVal);        
        } else {
          text = ExpMessageDown.format(subject.name(), this.name(), expVal);
        }
        if (LogWindowShow) {
          $gameMessage.add(text);
        } else {
          this.result().useExpItemText = text;
          this.result().useExpItem = true;
        }
        gainExpItem = true;
        this.gainExp(expVal);
        gainExpItem = false;
      } else if (getExp !== 0) {
        if (!LogWindowShow && expVal === 0) {
          this.result().useExpItemText = ExpMessageNoEffect.format(subject.name(), this.name());
          this.result().useExpItem = true;
        }
      }
    }
  };

  const _Game_Actor_finalExpRate = Game_Actor.prototype.finalExpRate;
  Game_Actor.prototype.finalExpRate = function() {
    return gainExpItem ? 1 : _Game_Actor_finalExpRate.call(this);
  };

  const _Window_BattleLog_displayActionResults = Window_BattleLog.prototype.displayActionResults;
  Window_BattleLog.prototype.displayActionResults = function(subject, target) {
	  _Window_BattleLog_displayActionResults.call(this, subject, target);
	  if (target.result().used) {
	  	this.push("pushBaseLine");
	  	this.displayExpItem(subject, target);
	  }
  };

  Window_BattleLog.prototype.displayExpItem = function(subject, target) {
    if (target.result().useExpItem) {
      this.push("addText", target.result().useExpItemText);
    }
  };

})();