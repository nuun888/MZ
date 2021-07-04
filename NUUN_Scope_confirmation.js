/*:-----------------------------------------------------------------------------------
 * NUUN_Scope_confirmation.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc 全体、ランダム攻撃でも対象選択表示
 * @author NUUN
 * @version 1.0.1
 *            
 * @help  
 * 全体、ランダム範囲でも対象選択画面を表示させます。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 
 * 更新履歴
 * 2021/7/5 Ver.1.0.1
 * 味方が奇数の時にカーソル全選択時の表示が正常に表示されない問題を修正。
 * 2021/7/4 Ver.1.0.0
 * 初版
 * 
 * @param ForEveryoneSelect
 * @desc 対象が使用者の時に選択画面を表示する。
 * @text 対象使用者選択表示
 * @type boolean
 * @default false
 * 
 */
var Imported = Imported || {};
Imported.NUUN_Scope_confirmation = true;

(() => {
const parameters = PluginManager.parameters('NUUN_Scope_confirmation');
const ForEveryoneSelect = eval(parameters['ForEveryoneSelect'] || 'false');

const _Scene_Battle_onSelectAction = Scene_Battle.prototype.onSelectAction;
Scene_Battle.prototype.onSelectAction = function() {
  this.resetCursor();
  const action = BattleManager.inputtingAction();
  if (ForEveryoneSelect && action.isForUser()) {
    this.startActorSelection();
    this._actorWindow.selectForItem(action);
  } else if (action.isForEveryone()) {
    this.startEnemySelection();
    this._enemyWindow.selectForItem(action);
  } else if (action.isForRandom()) {
    if (action.isForOpponent()) {
      this.startEnemySelection();
      this._enemyWindow.selectForItem(action); 
    } else {
      this.startActorSelection();
      this._actorWindow.selectForItem(action);
    }
  } else if (action.isForAll()) {
    if (action.isForOpponent()) {
      this.startEnemySelection();
      this._enemyWindow.selectForItem(action); 
    } else {
      this.startActorSelection();
      this._actorWindow.selectForItem(action);
    }
  } else {
    _Scene_Battle_onSelectAction.call(this);
  }
};

Scene_Battle.prototype.resetCursor = function() {
  this._enemyWindow.setCursorAll(false);
  this._actorWindow.setCursorAll(false);
  this._actorWindow.setCursorFixed(false);
};

Window_BattleActor.prototype.selectForItem = function(action) {
  if (action.isForUser()) {
    this.forceSelect(BattleManager.actor().index());
    this.setCursorFixed(true);
  } else if (action.isForAll()) {
    this.setCursorAll(true);
    this.forceSelect(0);
  } else if (action.isForRandom()) {
    this.setCursorAll(true);
    this.forceSelect(0);
  }
};

Window_BattleEnemy.prototype.selectForItem = function(action) {
  if (action.isForEveryone()) {
    this.setCursorAll(true);
    this.forceSelect(0);
  } else if (action.isForAll()) {
    this.setCursorAll(true);
    this.forceSelect(0);
  } else if (action.isForRandom()) {
    this.setCursorAll(true);
    this.forceSelect(0);
  }
};

Window_BattleActor.prototype.select = function(index) {//再定義
  Window_BattleStatus.prototype.select.call(this, index);
  let activeMember = []
  if (this.cursorAll()) {
    activeMember = $gameParty.aliveMembers();
    $gameParty.select(activeMember);
  } else {
    activeMember[0] = this.actor(index);
    $gameParty.select(activeMember);
  }
};

Window_BattleEnemy.prototype.select = function(index) {//再定義
  Window_Selectable.prototype.select.call(this, index);
  let activeMember = []
  if (this.cursorAll()) {
    activeMember = $gameTroop.aliveMembers();
    $gameTroop.select(activeMember);
  } else {
    activeMember[0] = this.enemy();
    $gameTroop.select(activeMember);
  }
};

Game_Unit.prototype.select = function(activeMember) {//再定義
  if (activeMember && activeMember[0]) {
    for (const member of this.members()) {
      const find = activeMember.find(target => member === target);
      if (find) {
        member.select();
      } else {
        member.deselect();
      }
    }
  } else {
    for (const member of this.members()) {
      member.deselect();
    }
  }
};
//不具合修正
Window_BattleEnemy.prototype.refreshCursorForAll = function() {//再定義
  const maxItems = this.maxItems();
  if (maxItems > 0) {
    const items = maxItems + (maxItems > 1 && maxItems % 2 ? 0 : -1);
      const rect = this.itemRect(0);
      rect.enlarge(this.itemRect(items));
      this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
  } else {
      this.setCursorRect(0, 0, 0, 0);
  }
};

})();