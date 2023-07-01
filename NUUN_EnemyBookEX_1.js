/*:-----------------------------------------------------------------------------------
 * NUUN_EnemyBookEX_1.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Resistance Display Mask (NUUN_EnemyBook Expansion)
 * @author NUUN
 * @version 1.0.2
 * @base NUUN_EnemyBook
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_EnemyBook
 * @orderAfter NUUN_MultiElement
 * 
 * @help
 * The display of attributes, states, and debuff resistance invalid weaknesses in the monster encyclopedia will only display attributes, states, and debuffs that have been received.
 * 
 * This plug-in is an extended function of Monster Encyclopedia (NUUN_EnemyBook).
 * This plugin requires "NUUN_Base" Ver.1.6.9 or later.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * Log
 * 7/1/2023 Ver.1.0.2
 * Correction of processing regarding the addition of multiple attribute functions.
 * 11/17/2021 Ver.1.0.1
 * Changed handling of getting multiple attributes.
 * 8/13/2021 Ver.1.0.0
 * First edition.
 * 
 */
/*:
 * @target MZ
 * @plugindesc 耐性表示マスク（モンスター図鑑拡張）
 * @author NUUN
 * @version 1.0.2
 * @base NUUN_EnemyBook
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_EnemyBook
 * @orderAfter NUUN_MultiElement
 * 
 * @help
 * モンスター図鑑の属性、ステート、デバフ耐性無効弱点の表示を、受けた事のある属性、ステート、デバフのみ表示するようにします。
 * 
 * このプラグインはモンスター図鑑（NUUN_EnemyBook）の拡張機能です。
 * このプラグインはNUUN_Base Ver.1.6.9以降が必要です。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/7/1 Ver.1.0.2
 * 複数属性機能追加に関しての処理修正。
 * 2021/11/7 Ver.1.0.1
 * 複数属性取得に関しての処理の変更。
 * 2021/8/13 Ver.1.0.0
 * 初版
 * 
 */
var Imported = Imported || {};
Imported.NUUN_EnemyBookEX_1 = true;

(() => {
const parameters = PluginManager.parameters('NUUN_EnemyBookEX_1');

const _Game_Action_calcElementRate = Game_Action.prototype.calcElementRate;
Game_Action.prototype.calcElementRate = function(target) {
    if (this.item().damage.elementId < 0) {
        this._multiElements = this.subject().attackElements();
    } else {
        this._multiElements = [this.item().damage.elementId];
    }
    const rate = _Game_Action_calcElementRate.call(this, target);
    if (target.isEnemy()) {
        this.enemyBookAttackElementDate(target, this._multiElements);
    }
    return rate;
};

Game_Action.prototype.enemyBookAttackElementDate = function(target, element) {
  for (const elementId of element) {
    $gameSystem.setEnemyBookElementFlag(target.enemyId(), elementId, true);
  }
};


const _Game_Action_itemEffectAddState = Game_Action.prototype.itemEffectAddState;
Game_Action.prototype.itemEffectAddState = function(target, effect) {
  _Game_Action_itemEffectAddState.call(this, target, effect);
  if (target.isEnemy()) {
    if (effect.dataId === 0) {
      this.enemyBookAttackStateDate(target);
    } else {
      $gameSystem.setEnemyBookStateFlag(target.enemyId(), effect.dataId, true);
    }
  }
};

Game_Action.prototype.enemyBookAttackStateDate = function(target) {
  for (const stateId of this.subject().attackStates()) {
    $gameSystem.setEnemyBookStateFlag(target.enemyId(), stateId, true);
  }
};


const _Game_Action_itemEffectAddDebuff = Game_Action.prototype.itemEffectAddDebuff;
Game_Action.prototype.itemEffectAddDebuff = function(target, effect) {
  _Game_Action_itemEffectAddDebuff.call(this, target, effect);
  if (target.isEnemy()) {
    $gameSystem.setEnemyBookDebuffFlag(target.enemyId(), effect.dataId, true);
  }
};

})();