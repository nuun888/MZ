/*:-----------------------------------------------------------------------------------
 * NUUN_EnemyStateIconEX.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc 敵ステート表示拡張
 * @author NUUN
 * @version 1.0.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * 敵のステートの表示を拡張、変更します。
 * 一部のプラグイン上で敵グラフィックの色調を変更したときにステートアイコンの色調も変わることを防ぎます。
 * またモンスターと重なっても表示が他のモンスターの背後に表示されることはありません。
 * 
 * このプラグインは共通処理(NUUN_Base)Ver.1.3.2以降が必要になります。
 * 
 * 敵キャラのメモ欄
 * <EnemyStateX:[position]> モンスターのステートアイコンのX座標を調整します。（相対座標）
 * <EnemyStateY:[position]> モンスターのステートアイコンのY座標を調整します。（相対座標）
 * 
 * バトルイベントの注釈
 * <EnemyStatePosition:[Id],[x],[y]> 敵グループの[Id]番目のモンスターのステートアイコンの位置を調整します。（相対座標）
 * [Id]：表示順番号
 * [x]：X座標
 * [y]：Y座標
 * [id]は敵グループ設定で配置した順番のIDで指定します。配置ビューのモンスター画像の左上に番号が表示されますのでその番号を記入します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/12/12 Ver.1.0.0
 * 初版
 * 
 * 
 * @param EnemyStatePosition
 * @desc モンスターのステートアイコンの表示位置
 * @text 名前表示位置
 * @type select
 * @option 表示なし
 * @value -1
 * @option 敵画像の上
 * @value 0
 * @option 敵画像の下
 * @value 1
 * @option 敵画像の中心
 * @value 2
 * @default 0
 * 
 * @param StateVisible
 * @desc ステートアイコンの表示タイミング
 * @text ステートアイコン表示タイミング
 * @type select
 * @option 常に表示
 * @value 0
 * @option 選択時
 * @value 1
 * @default 0
 * 
 * @param State_X
 * @desc X座標（相対座標）指定します。
 * @text X座標
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param State_Y
 * @desc Y座標（相対座標）指定します。
 * @text Y座標
 * @type number
 * @default 0
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
Imported.NUUN_EnemyStateIconEX = true;

(() => {
const parameters = PluginManager.parameters('NUUN_EnemyStateIconEX');
const EnemyStatePosition = Number(parameters['EnemyStatePosition'] || 0);
const State_X = Number(parameters['State_X'] || 0);
const State_Y = Number(parameters['State_Y'] || 0);
const ConflictScale = Number(parameters['ConflictScale'] || 0);
const StateVisible = eval(parameters['StateVisible'] || 0);
let StatePositionList = [];

const _Spriteset_Battle_createBattleField = Spriteset_Battle.prototype.createBattleField;
Spriteset_Battle.prototype.createBattleField = function() {
  _Spriteset_Battle_createBattleField.call(this);
  this.createGaugeBase();
  StatePositionList = getEnemyStatePosition($gameTroop.troop());
};

const _Spriteset_Battle_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
  _Spriteset_Battle_update.call(this);
  if ($gameTemp.enemyStateRefresh) {
    this.setStateIconPosition();
    $gameTemp.enemyStateRefresh = false;
  }
  for (const sprite of this._enemySprites) {
    if (sprite._enemy)
    sprite.updateStateIcon();
  }
};

Spriteset_Battle.prototype.setStateIconPosition = function() {
  for (const data of StatePositionList) {
    const enemy = $gameTroop.members()[data[0] - 1];
    if (enemy) {
      enemy.setStatePosition(data[1], data[2]);
    }
  }
};


Sprite_Enemy.prototype.createStateIconSprite = function() {//再定義
  const baseSprite = BattleManager.gaugeBaseSprite;
  this._stateIconSprite = new Sprite_StateIcon();
  baseSprite.addChild(this._stateIconSprite);
  this._stateIconSprite.enemySpriteId = this.spriteId;
  this._stateIconSprite.show();
};

const _Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
Sprite_Enemy.prototype.setBattler = function(battler) {
  _Sprite_Enemy_setBattler.call(this, battler);
  this.hpGaugeOffsetX = battler.getStatePositionX() + (battler.enemy().meta.EnemyStateX ? Number(battler.enemy().meta.EnemyStateX) : 0) + (Graphics.width - Graphics.boxWidth) / 2 + State_X;
  this.hpGaugeOffsetY = battler.getStatePositionY() + (battler.enemy().meta.EnemyStateY ? Number(battler.enemy().meta.EnemyStateY) : 0) + State_Y + (Graphics.height - Graphics.boxHeight) / 2;
};

Sprite_Enemy.prototype.updateStateIcon = function() {
  if (BattleManager.gaugeBaseSprite) {
    if (!this._stateIconSprite) {
      $gameTemp.enemyStateRefresh = true;
      this.enemyStateIcon();
    }
    this._stateIconSprite.x = this.hpGaugeOffsetX + this.x;
    this._stateIconSprite.y = this.hpGaugeOffsetY + this.y;
    if (this.getStateIconPosition() === 0) {
      this._stateIconSprite.y -= this.getButlerStateHeight();
    } else if (this.getStateIconPosition() === 2) {
      this._stateIconSprite.y -= Math.floor(this.getButlerStateHeight() / 2);
    }
    this.stateIconOpacity();
  }
};

Sprite_Enemy.prototype.getButlerStateHeight = function() {
  const scale = this.getButlerStateConflict();
  if (this._SVBattlername) {
    return Math.floor(((this._mainSprite.bitmap.height / 6) + 30) * 0.9);
  } else if (this._svBattlerSprite) {
    return Math.floor((this.height + 30) * 0.9);
  } else {
    return Math.floor(((this.bitmap.height + 70) * 0.9) * scale);
  }
};

Sprite_Enemy.prototype.getButlerStateConflict = function() {
  if (ConflictScale === 1) {
    return this.scale.y;
  } else if (ConflictScale === 2) {
    return this._baseScale.y;
  } else {
    return 1;
  }
};

Sprite_Enemy.prototype.getStateIconPosition = function() {
  return EnemyStatePosition;
};

Sprite_Enemy.prototype.stateIconOpacity = function() {
  if (this._effectType !== "blink") {
    this._stateIconSprite.opacity = this.opacity;
  }
};

Sprite_StateIcon.prototype.stateVisibleInSelect = function() {
  if (StateVisible === 1) {
    return this._battler.isSelected();
  }
  return true;
};

Sprite_StateIcon.prototype.stateVisible = function() {
  this.visible = this.stateVisibleInSelect();
};

const _Sprite_StateIcon_update = Sprite_StateIcon.prototype.update;
Sprite_StateIcon.prototype.update = function() {
  _Sprite_StateIcon_update.call(this);
  if (this._battler.isEnemy()) {
    this.stateVisible();
  }
};


const _Game_Enemy_initMembers = Game_Enemy.prototype.initMembers;
Game_Enemy.prototype.initMembers = function() {
  _Game_Enemy_initMembers.call(this);
  this._butlerStatePositionX = 0;
  this._butlerStatePositionY = 0;
};

Game_Enemy.prototype.setStatePosition = function(x, y){
  this._butlerStatePositionX = x;
  this._butlerStatePositionY = y;
};

Game_Enemy.prototype.getStatePositionX = function(){
  return this._butlerStatePositionX;
};

Game_Enemy.prototype.getStatePositionY = function(){
  return this._butlerStatePositionY;
};
  
function getEnemyStatePosition(troop) {
  const pages = troop.pages[0];
  list = [];
  const re = /<(?:EnemyStatePosition):\s*(.*)>/;
  pages.list.forEach(tag => {
    if (tag.code === 108 || tag.code === 408) {
      let match = re.exec(tag.parameters[0]);
      if (match) {
        list.push(match[1].split(',').map(Number));
      }
    }
  });
  return list;
};

})();
