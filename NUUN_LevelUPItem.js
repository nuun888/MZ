/*:-----------------------------------------------------------------------------------
 * NUUN_LevelUPItem.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * 
 * @target MZ
 * @plugindesc レベルアップアイテム、スキル
 * @author NUUN
 * @version 1.0.2
 * 
 * @help
 * 経験値を増減させるアイテムやスキルを作ることが出来ます。
 * 
 * アイテム、スキルのメモ欄に記入します。
 * <LevelUP:1> レベルが1アップします。
 * <LevelUP:5> レベルが5アップします。
 * <LevelUP:-1> レベルが1ダウンします。
 * <LevelUP:-10> レベルが10ダウンします。
 *               
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/6/5 Ver.1.0.2
 * スキル失敗時のメッセージが表示しなくなる問題を修正。
 * 2021/5/2 Ver.1.0.1
 * レベルをダウンさせると経験値のおかしくなる問題を修正。
 * 2021/4/29 Ver.1.0.0
 * 初版
 * 
 * @param MessageWindowShow
 * @text メッセージウィンドウ表示
 * @desc レベルアップ後メッセージウィンドウを表示する。
 * @type boolean
 * @default true
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_LevelUPItem = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_LevelUPItem');
  const MessageWindowShow = eval(parameters['MessageWindowShow'] || 'true');

  const _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
  Game_Action.prototype.applyItemUserEffect = function(target) {
    _Game_Action_applyItemUserEffect.call(this, target);
    this.useLevelUpItem(target);
  };

  Game_Action.prototype.useLevelUpItem = function(target) {
    if (target.isActor() && (this.isLevelUpItem() || this.isLevelDownItem())) {
      target.levelUpItems(target, this.item());
      this.makeSuccess(target);
    }
  };

  Game_Action.prototype.isLevelUpItem = function() {
    return this.item().meta.LevelUP > 0;
  };

  Game_Action.prototype.isLevelDownItem = function() {
    return this.item().meta.LevelUP < 0;
  };

  Game_Action.prototype.testLevelUp = function(target) {
    const result = (this.testLifeAndDeath(target) && this.item().meta.LevelUP && 
                    (this.isLevelDownItem () && target._level > 1 || (this.isLevelUpItem() && !target.isMaxLevel()))
                  )
    return result;
  };

  const _Game_Action_testApply = Game_Action.prototype.testApply;
  Game_Action.prototype.testApply = function(target) {
    return _Game_Action_testApply.call(this, target) || this.testLevelUp(target);
  };

  Game_BattlerBase.prototype.levelUpItems = function(target, item) {
    if(this.isActor()) {
      let levelUpVal = item.meta.LevelUP;
      if (levelUpVal > 0) {
        levelUpVal = Math.min(levelUpVal, target.maxLevel() - target._level);
        target.changeLevel(target.level + levelUpVal, MessageWindowShow);
      } else if (levelUpVal < 0) {
        levelUpVal = Math.abs(levelUpVal);
        levelUpVal = Math.min(levelUpVal, (target._level - 1));
        target.changeLevel(target.level - levelUpVal, MessageWindowShow);
      }
    }
  };
})();