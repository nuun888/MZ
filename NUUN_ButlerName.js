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
 * @plugindesc  エネミー名前表示
 * @author NUUN
 * @version 1.1.3
 * @help
 * モンスターの敵名を表示します。
 * 
 * 敵キャラのメモ欄
 * <EnemyNameX:[position]> モンスター名のX座標を調整します。（相対座標）
 * <EnemyNameY:[position]> モンスター名のY座標を調整します。（相対座標）
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/7/13 Ver.1.1.3
 * エネミー画像を消去するプラグインとの競合対策。
 * 2021/7/10 Ver.1.1.2
 * 一部の変数名が重複していた問題を修正。
 * 2021/7/10 Ver.1.1.1
 * 戦闘途中でエネミースプライトを生成するとエラーが出る場合があるので修正。
 * 2021/6/19 Ver.1.1.0
 * 名前の表示タイミングを設定できる機能を追加。
 * 2021/6/19 Ver.1.0.5
 * 疑似3DバトルVer.1.1対応のため一部の処理を変更。
 * 敵画像の上表示時の画像拡大時の処理方法の設定方法を変更。
 * 2021/6/18 Ver.1.0.4
 * ヘルプの説明の一部が間違っていたのを修正。
 * 2021/5/26 Ver.1.0.3
 * MNKR_TMBattlerExMZ.jsの拡大率を適用するように修正。
 * 2021/5/24 Ver.1.0.2
 * 処理の一部を修正。
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
 * @param EnemyNameVisible
 * @desc モンスターの名前の表示タイミング
 * @text 名前表示タイミング
 * @type select
 * @option 常に表示
 * @value 0
 * @option 選択時
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
 * @param  ConflictScale
 * @desc 敵画像の上設定時の拡大率の考慮
 * @text 拡大率の考慮
 * @type select
 * @option 元のサイズ基準
 * @value 0
 * @option 現在のサイズ基準
 * @value 1
 * @option 元のサイズ基準（MNKR_TMBattlerExMZ併用時）
 * @value 2
 * @default 0
 * 
 */
var Imported = Imported || {};
Imported.NUUN_ButlerName = true;

(() => {
const parameters = PluginManager.parameters('NUUN_ButlerName');
const ActorNamePosition = Number(parameters['ActorNamePosition'] || 0);
const ActorName_X = Number(parameters['ActorName_X'] || 0);
const ActorName_Y = Number(parameters['ActorName_Y'] || 0);
const ActorName_FontSize = Number(parameters['ActorName_FontSize'] || -12);
const EnemyNamePosition = Number(parameters['EnemyNamePosition'] || 0);
const EnemyNameVisible = Number(parameters['EnemyNameVisible'] || 0);
const Name_X = Number(parameters['Name_X'] || 0);
const Name_Y = Number(parameters['Name_Y'] || 0);
const Name_FontSize = Number(parameters['Name_FontSize'] || -12);
const ConflictScale = Number(parameters['ConflictScale'] || 0);

const _Sprite_Enemy_updateBitmap = Sprite_Enemy.prototype.updateBitmap;
Sprite_Enemy.prototype.updateBitmap = function() {
  _Sprite_Enemy_updateBitmap.call(this);
  if (this._enemy && EnemyNamePosition >= 0) {
      this.updateEnemyName();
  }
  //if (ActorNamePosition >= 0 && $gameSystem.isSideView()) {
  //  this.updateActorName();
  //}
};

Sprite_Enemy.prototype.updateActorName = function() {
  this._butlerNameSprite.x = this.butlerNameOffsetX + (this.x - this._butlerNameSprite.width / 2);
  this._butlerNameSprite.y = this.butlerNameOffsetY + this.y - 40;
  this._butlerNameSprite.y -= Math.round((this.bitmap.height + 40) * 0.9);
  if (this._butlerNameSprite.y < 0) {
    this._butlerNameSprite.y = 30;
  } else if (this._butlerNameSprite.y + 40 > Graphics.height) {
    this._butlerNameSprite.y = Graphics.height - 40;
  }
};

Sprite_Enemy.prototype.updateEnemyName = function() {
  if (!this._butlerNameSprite) {
    this.enemyName();
  }
  this._butlerNameSprite.x = this.butlerNameOffsetX + (this.x - this._butlerNameSprite.width / 2);
  this._butlerNameSprite.y = this.butlerNameOffsetY + this.y - 40;
  if (this.getButlerNamePosition() === 0) {
    this._butlerNameSprite.y -= this.getButlerNameHeight();
  }
  if (this._butlerNameSprite.y < 0) {
    this._butlerNameSprite.y = 30;
  } else if (this._butlerNameSprite.y + 40 > Graphics.height) {
    this._butlerNameSprite.y = Graphics.height - 40;
  }
  this.butlerNameOpacity();
};

Sprite_Enemy.prototype.enemyName = function() {
  const butlerGaugeBase = BattleManager.gaugeBaseSprite;
  const sprite = new Sprite_ButlerName();
  butlerGaugeBase.addChild(sprite);
  sprite.setup(this._enemy);
  sprite.show();
  sprite.move(0, 0);
  this._butlerNameSprite = sprite;
  sprite.enemySpriteId = this.spriteId;
  this.butlerNameOffsetX = (this._enemy.enemy().meta.EnemyNameX ? Number(this._enemy.enemy().meta.EnemyNameX) : 0) + (Graphics.width - Graphics.boxWidth) / 2 + Name_X;
  this.butlerNameOffsetY = (this._enemy.enemy().meta.EnemyNameY ? Number(this._enemy.enemy().meta.EnemyNameY) : 0) + Name_Y + (Graphics.height - Graphics.boxHeight) / 2;
};

Sprite_Enemy.prototype.getButlerNameHeight = function() {
  const scale = this.getButlerNameConflict();
  if (this._SVBattlername) {
    return Math.floor((this._mainSprite.bitmap.height / 6) * 0.9);
  } else if (this._svBattlerSprite) {
    return Math.floor(this.height * 0.9);
  } else {
    return Math.floor(((this.bitmap.height + 40) * 0.9) * scale);
  }
};

Sprite_Enemy.prototype.getButlerNameConflict = function() {
  if (ConflictScale === 1) {
    return this.scale.y;
  } else if (ConflictScale === 2) {
    return this._baseScale.y;
  } else {
    return 1;
  }
};

Sprite_Enemy.prototype.getButlerNamePosition = function() {
  return EnemyNamePosition;
};

Sprite_Enemy.prototype.butlerNameOpacity = function() {
  if (this._effectType !== "blink") {
    this._butlerNameSprite.opacity = this.opacity;
  }
};

const _Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
  _Spriteset_Battle_createLowerLayer.call(this);
  this.createGaugeBase();
  this.createEnemyName();
  //this.createActorName();
};

Spriteset_Battle.prototype.createGaugeBase = function() {
  if (EnemyNamePosition >= 0) {
    if (!this._butlerGaugeBase) {
      const sprite = new Sprite();
      this.addChild(sprite);
      this._butlerGaugeBase = sprite;
      BattleManager.gaugeBaseSprite = sprite;
    }
  }
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
  sprites.enemyName();
};

const _Spriteset_Battle_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
  _Spriteset_Battle_update.call(this);
  this.updateButlerName();
};

Spriteset_Battle.prototype.updateButlerName = function() {
  for (const sprite of this._butlerGaugeBase.children) {
    const spriteData = this._enemySprites.some(enemy => enemy.spriteId === sprite.enemySpriteId);
    if (!spriteData) {
      this._butlerGaugeBase.removeChild(sprite);
    }
  }
};

function Sprite_ButlerName() {
  this.initialize(...arguments);
}

Sprite_ButlerName.prototype = Object.create(Sprite_Name.prototype);
Sprite_ButlerName.prototype.constructor = Sprite_ButlerName;

Sprite_ButlerName.prototype.initialize = function() {
  Sprite_Name.prototype.initialize.call(this);
  this.enemySpriteId = -1;
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

const _Sprite_ButlerName_updateBitmap = Sprite_ButlerName.prototype.updateBitmap;
Sprite_ButlerName.prototype.updateBitmap = function() {
  _Sprite_ButlerName_updateBitmap.call(this);
  this.butlerNameVisible();
};

Sprite_ButlerName.prototype.butlerNameVisible = function() {
  this.visible = this.butlerNameVisibleInSelect();
};

Sprite_ButlerName.prototype.butlerNameVisibleInSelect = function() {
  if (EnemyNameVisible === 1) {
    return this._battler.isSelected();
  }
  return true;
};

const _BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
  _BattleManager_initMembers.call(this);
  this.gaugeBaseSprite = null;
};
})();
