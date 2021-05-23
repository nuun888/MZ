/*:-----------------------------------------------------------------------------------
 * NUUN_ButlerName.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc  バトラー名前表示
 * @author NUUN
 * @version 1.0.1
 * 
 * @help
 * モンスターに敵名を表示します。
 * 
 * 敵キャラのメモ欄
 * <EnemyNameX:[position]> TPBゲージのX座標を調整します。（相対座標）
 * <EnemyNameY:[position]> TPBゲージのY座標を調整します。（相対座標）
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/5/23 Ver.1.0.1
 * プラグインパラメータが反映されなかった問題を修正。
 * 2021/5/23 Ver.1.0.0
 * 初版
 * 
 * @param EnemySetting
 * @text モンスター設定
 * @default ------------------------------
 * 
 * @param EnemyNamePosition
 * @desc モンスターの名前表示位置
 * @text 名前表示位置
 * @type select
 * @option 表示なし
 * @value -1
 * @option 敵画像の上
 * @value 0
 * @option 敵画像の下
 * @value 1
 * @default 0
 * 
 * @param Name_X
 * @desc X座標（相対座標）指定します。
 * @text X座標
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param Name_Y
 * @desc Y座標（相対座標）指定します。
 * @text Y座標
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param Name_FontSize
 * @desc モンスター名のフォントサイズ。（メインフォントから）
 * @text フォントサイズ
 * @type number
 * @default -12
 * @min -9999
 * 
 */
var Imported = Imported || {};
Imported.NUUN_ButlerName = true;

(() => {
const parameters = PluginManager.parameters('NUUN_ButlerName');
const EnemyNamePosition = Number(parameters['EnemyNamePosition'] || 0);
const Name_X = Number(parameters['Name_X'] || 0);
const Name_Y = Number(parameters['Name_Y'] || 0);
const Name_FontSize = Number(parameters['Name_FontSize'] || -12);

const _Sprite_Enemy_initVisibility = Sprite_Enemy.prototype.initVisibility;
Sprite_Enemy.prototype.initVisibility = function() {
  _Sprite_Enemy_initVisibility.call(this);
  if (!this._appeared) {
    this.setEnemyNameOpacity(0);
  }
};

const _Sprite_Enemy_revertToNormal = Sprite_Enemy.prototype.revertToNormal;
Sprite_Enemy.prototype.revertToNormal = function() {
  _Sprite_Enemy_revertToNormal.call(this);
  this.setEnemyNameOpacity(255);
};

const _Sprite_Enemy_updateCollapse = Sprite_Enemy.prototype.updateCollapse;
Sprite_Enemy.prototype.updateCollapse = function() {
  _Sprite_Enemy_updateCollapse.call(this);
  this.collapseEnemyName();
};

const _Sprite_Enemy_updateBossCollapse = Sprite_Enemy.prototype.updateBossCollapse;
Sprite_Enemy.prototype.updateBossCollapse = function() {
  _Sprite_Enemy_updateBossCollapse.call(this);
  this.collapseEnemyName();
};

const _Sprite_Enemy_updateAppear = Sprite_Enemy.prototype.updateAppear;
Sprite_Enemy.prototype.updateAppear = function() {
  _Sprite_Enemy_updateAppear.call(this);
  this._butlerName.opacity = (16 - this._effectDuration) * 16;
};

const _Sprite_Enemy_updateDisappear = Sprite_Enemy.prototype.updateDisappear;
Sprite_Enemy.prototype.updateDisappear = function() {
  _Sprite_Enemy_updateDisappear.call(this);
  this._butlerName.opacity = 256 - (32 - this._effectDuration) * 10;
};

const _Sprite_Enemy_updateInstantCollapse = Sprite_Enemy.prototype.updateInstantCollapse;
Sprite_Enemy.prototype.updateInstantCollapse = function() {
  _Sprite_Enemy_updateInstantCollapse.call(this);
  this._butlerName.opacity = 0;
};

Sprite_Enemy.prototype.collapseEnemyName = function() {
  this._butlerName.opacity *= this._effectDuration / (this._effectDuration + 1);
};

Sprite_Enemy.prototype.setEnemyNameOpacity = function(opacity) {
  this._butlerName.opacity = opacity;
};

const _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
Sprite_Enemy.prototype.update = function() {
  _Sprite_Enemy_update.call(this);
  if (this._enemy && EnemyNamePosition >= 0) {
      this.updateEnemyName();
  }
  //if (ActorNamePosition >= 0 && $gameSystem.isSideView()) {
  //  this.updateActorName();
  //}
};

Sprite_Enemy.prototype.updateActorName = function() {
  this._butlerName.x = this.butlerNameOffsetX + (this.x - this._butlerName.width / 2);
  this._butlerName.y = this.butlerNameOffsetY + this.y - 40;
  this._butlerName.y -= Math.round((this.bitmap.height + 40) * 0.9);
  if (this._butlerName.y < 0) {
      this._butlerName.y = 30;
  } else if (this._butlerName.y + 40 > Graphics.height) {
    this._butlerName.y = Graphics.height - 40;
  }
};

Sprite_Enemy.prototype.updateEnemyName = function() {
  this._butlerName.x = this.butlerNameOffsetX + (this.x - this._butlerName.width / 2);
  this._butlerName.y = this.butlerNameOffsetY + this.y - 40;
  if (EnemyNamePosition === 0) {
    if (this._SVBattlername) {
      this._butlerName.y -= Math.round(((this._mainSprite.bitmap.height / 6)) * 0.9);
    } else if (this._svBattlerSprite) {
      this._butlerName.y -= Math.round((this.height) * 0.9);
    } else {
      this._butlerName.y -= Math.round((this.bitmap.height + 40) * 0.9);
    }
  }
  if (this._butlerName.y < 0) {
      this._butlerName.y = 30;
  } else if (this._butlerName.y + 40 > Graphics.height) {
    this._butlerName.y = Graphics.height - 40;
  }
};

const _Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
  _Spriteset_Battle_createLowerLayer.call(this);
  this.createEnemyName();
  //this.createActorName();
};

Spriteset_Battle.prototype.createActorName = function() {
  if (EnemyNamePosition >= 0 && $gameSystem.isSideView()) {
    if (!this._butlerGaugeBase) {
      const sprite = new Sprite();
      this.addChild(sprite);
      this._butlerGaugeBase = sprite;
    }
  }
};

Spriteset_Battle.prototype.createEnemyName = function() {
  if (EnemyNamePosition >= 0) {
    if (!this._butlerGaugeBase) {
      const sprite = new Sprite();
      this.addChild(sprite);
      this._butlerGaugeBase = sprite;
    }
    for (const sprites of this._enemySprites) {
      this.enemyName(sprites);
    }
  }
};

//Spriteset_Battle.prototype.updateActors = function() {
//  const members = $gameParty.battleMembers();
//  for (let i = 0; i < this._actorSprites.length; i++) {
//      this._actorSprites[i].setBattler(members[i]);
//  }
//};

Spriteset_Battle.prototype.actorName = function(sprites) {
  const sprite = new Sprite_ButlerName();
  this._butlerGaugeBase.addChild(sprite);
  sprite.setup(sprites._battler);
  sprite.show();
  sprite.move(0, 0);
  sprites._butlerName = sprite;
  sprites.butlerNameOffsetX = ActorName_X + (Graphics.width - Graphics.boxWidth) / 2;
  sprites.butlerNameOffsetY = ActorName_Y + (Graphics.height - Graphics.boxHeight) / 2;
  //sprites.butlerNameOffsetX = (sprites._enemy.enemy().meta.EnemyNameX ? Number(sprites._enemy.enemy().meta.EnemyNameX) : 0) + (Graphics.width - Graphics.boxWidth) / 2 + Name_X;
  //sprites.butlerNameOffsetY = (sprites._enemy.enemy().meta.EnemyNameY ? Number(sprites._enemy.enemy().meta.EnemyNameY) : 0) + Name_Y + (Graphics.height - Graphics.boxHeight) / 2;
};

Spriteset_Battle.prototype.enemyName = function(sprites) {
  const sprite = new Sprite_ButlerName();
  this._butlerGaugeBase.addChild(sprite);
  sprite.setup(sprites._battler);
  sprite.show();
  sprite.move(0, 0);
  sprites._butlerName = sprite;
  sprites.butlerNameOffsetX = (sprites._enemy.enemy().meta.EnemyNameX ? Number(sprites._enemy.enemy().meta.EnemyNameX) : 0) + (Graphics.width - Graphics.boxWidth) / 2 + Name_X;
  sprites.butlerNameOffsetY = (sprites._enemy.enemy().meta.EnemyNameY ? Number(sprites._enemy.enemy().meta.EnemyNameY) : 0) + Name_Y + (Graphics.height - Graphics.boxHeight) / 2;
};

function Sprite_ButlerName() {
  this.initialize(...arguments);
}

Sprite_ButlerName.prototype = Object.create(Sprite_Name.prototype);
Sprite_ButlerName.prototype.constructor = Sprite_ButlerName;

Sprite_ButlerName.prototype.initialize = function() {
  Sprite_Name.prototype.initialize.call(this);
};

Sprite_ButlerName.prototype.fontSize = function() {
  return $gameSystem.mainFontSize() + Name_FontSize;
};

Sprite_ButlerName.prototype.redraw = function() {
  const name = this.name();
  const width = this.bitmapWidth();
  const height = this.bitmapHeight();
  this.setupFont();
  this.bitmap.clear();
  this.bitmap.drawText(name, 0, 0, width, height, "center");
};

})();