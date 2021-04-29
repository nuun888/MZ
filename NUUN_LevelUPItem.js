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
 * @version 1.0.0
 * 
 * @help
 * 経験値を増減させるアイテムやスキルを作ることが出来ます。
 * 
 * アイテム、スキルのメモ欄に記入します。
 * <LevelUP:1> レベルが1アップします。
 * <LevelUP:-1> レベルが1ダウンします。
 *               
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/4/28 Ver.1.0.0
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
    target.levelUpItems(target, this.item());
    this.makeSuccess(target);
  };

  Game_Action.prototype.isLevelUpItem = function() {
    return this.item().meta.LevelUP && this.item().meta.LevelUP > 0;
  };

  Game_Action.prototype.isLevelDownItem = function() {
    return this.item().meta.LevelUP && this.item().meta.LevelUP < 0;
  };

  const _Game_Action_testApply = Game_Action.prototype.testApply;
  Game_Action.prototype.testApply = function(target) {
    return _Game_Action_testApply.call(this, target) || 
    (this.testLifeAndDeath(target) && (this.isLevelDownItem () && target._level > 1 || (this.isLevelUpItem() && !target.isMaxLevel())));
  };

  Game_BattlerBase.prototype.levelUpItems = function(target, item) {
    if(this.isActor()) {
      let levelUpVal = item.meta.LevelUP;
      const lastLevel = this._level;
      const lastSkills = this.skills();
      if (levelUpVal > 0) {
        levelUpVal = Math.min(levelUpVal, target.maxLevel() - target._level);
        for (let i = 0; i < levelUpVal; i++) {
          this.levelUp();
        }
      } else if (levelUpVal < 0) {
        levelUpVal = Math.abs(levelUpVal);
        levelUpVal = Math.min(levelUpVal, (target._level - 1));
        for (let i = 0; i < levelUpVal; i++) {
          this.levelDown();
        }
      }
      if (MessageWindowShow && this._level > lastLevel) {
        this.displayLevelUp(this.findNewSkills(lastSkills));
      }
    }
  };
})();