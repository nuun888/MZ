/*:-----------------------------------------------------------------------------------
 * NUUN_MultiCursor.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc マルチカーソル
 * @author NUUN
 * @version 1.0.0
 *            
 * @help  
 * アクターの対象選択時、複数対象のアイテム、スキルのカーソル表示を個別に表示させます。
 * なお、当プラグインとNUUN_Scope_confirmationとの併用はできません。(当プラグインはNUUN_Scope_confirmationの機能の一部に組み込まれています)
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 
 * 更新履歴
 * 2022/7/4 Ver.1.0.0
 * 初版
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_MultiCursor = true;

(() => {
const parameters = PluginManager.parameters('NUUN_MultiCursor');

Game_Unit.prototype.targetSelect = function(activeMember) {
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

Game_Unit.prototype.select = function(target) {
  activeMember = [];
  activeMember.push(target);
  this.targetSelect(activeMember);
};

const _Window_Base_initialize = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function(rect) {
  _Window_Base_initialize.call(this, rect);
  this._multiCursor = false;
};


const _Window_Selectable_setCursorAll = Window_Selectable.prototype.setCursorAll;
Window_Selectable.prototype.setCursorAll = function(cursorAll) {
  _Window_Selectable_setCursorAll.call(this, cursorAll);
  this.setMultiCursor(cursorAll);
};

Window_Selectable.prototype.setMultiCursor = function(mode) {
  this._multiCursor = mode;
};

const _Window_MenuActor_select = Window_MenuActor.prototype.select;
Window_MenuActor.prototype.select = function(index) {
  if (this.cursorAll()) {
    Window_Selectable.prototype.select.call(this, index);
    $gameParty.targetSelect($gameParty.members());
    this.refreshCursor();
  } else {
    _Window_MenuActor_select.call(this, index);
  }
};

Window_Selectable.prototype.refreshCursorForAll = function() {//再定義
  const maxItems = this.maxItems();
  let rect;
  if (maxItems > 0) {
    if (this.cursorAll()) {
      this.setCursorRect(0, 0, 0, 0);
      for (let i = 0; maxItems > i; i++) {
        const target = this.selectTarget(i);
        if (target) {
          rect = this.itemRect(i);
          this.setCursorRects(rect.x, rect.y, rect.width, rect.height, i);
        }
      }
    } else {
      const items = maxItems + (maxItems >= this.maxCols() && maxItems % this.maxCols() ? 0 : -1);
      rect = this.itemRect(0);
      rect.enlarge(this.itemRect(items));
      this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
    }
  } else {
      this.setCursorRect(0, 0, 0, 0);
  }
};

Window_MenuActor.prototype.selectTarget = function(index) {
  const actor = $gameParty.members()[index];
  return actor ? actor.isSelected() : false;
};

Window_BattleEnemy.prototype.selectTarget = function(index) {
  const enemy = $gameTroop.aliveMembers()[index];
  return enemy ? enemy.isSelected() : false;
};

const _Window_initialize = Window.prototype.initialize;
Window.prototype.initialize = function() {
  _Window_initialize.call(this);
  this._multiCursorRect = [];
  this._multiCursorSprite = [];
  this._cursorIndex = 0;
};

Window.prototype.setCursorRects = function(x, y, width, height, index) {
  this._createCursorSprites(index);
  this._cursorIndex = index;
  const cw = Math.floor(width || 0);
  const ch = Math.floor(height || 0);
  this._multiCursorRect[index].x = Math.floor(x || 0);
  this._multiCursorRect[index].y = Math.floor(y || 0);
  if (this._multiCursorRect[index].width !== cw || this._multiCursorRect[index].height !== ch) {
    this._multiCursorRect[index].width = cw;
    this._multiCursorRect[index].height = ch;
    this._multiRefreshCursor(index);
  }
};

const _Window_setCursorRect = Window.prototype.setCursorRect;
Window.prototype.setCursorRect = function(x, y, width, height) {
  _Window_setCursorRect.call(this, x, y, width, height);
  this._multiCursorSprite.forEach((sprite, i) => {
    if (sprite.width > 0 && sprite.height > 0) {
      this.setCursorRects(0, 0, 0, 0, i);
    }
  });
};

Window.prototype._createCursorSprites = function(index) {
  if (!this._multiCursorSprite[index]) {
    const cursorSprite = new Sprite();
    for (let i = 0; i < 9; i++) {
        cursorSprite.addChild(new Sprite());
    }
    this._clientArea.addChildAt(cursorSprite, 1);
    this._multiCursorSprite[index] = cursorSprite;
    this._multiCursorRect[index] = new Rectangle();
  }
};

Window.prototype._multiRefreshCursor = function(index) {
  const drect = this._multiCursorRect[index].clone();
  const srect = { x: 96, y: 96, width: 48, height: 48 };
  const m = 4;
  for (const child of this._multiCursorSprite[index].children) {
    child.bitmap = this._windowskin;
  }
  this._setRectPartsGeometry(this._multiCursorSprite[index], srect, drect, m);
};

const _Window_refreshCursor = Window.prototype._refreshCursor;
Window.prototype._refreshCursor = function() {
  _Window_refreshCursor.call(this);
  if (this._multiCursor) {
    this._multiCursorSprite.forEach((sprite, i) => {
      const drect = this._multiCursorRect[i].clone();
      const srect = { x: 96, y: 96, width: 48, height: 48 };
      const m = 4;
      for (const child of sprite.children) {
        child.bitmap = this._windowskin;
      }
      this._setRectPartsGeometry(sprite, srect, drect, m);
    });
  }
};

const _Window_updateCursor = Window.prototype._updateCursor;
Window.prototype._updateCursor = function() {
  _Window_updateCursor.call(this);
  if (this._multiCursor) {
    this._multiCursorSprite.forEach((sprite, i) => {
      sprite.alpha = this._makeCursorAlpha();
      sprite.visible = this.isOpen() && this.cursorVisible;
      sprite.x = this._multiCursorRect[i].x;
      sprite.y = this._multiCursorRect[i].y;
    });
  }
};

})();