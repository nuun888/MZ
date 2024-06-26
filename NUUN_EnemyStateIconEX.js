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
 * @version 1.1.4
 * @base NUUN_BattlerOverlayBase
 * @orderAfter NUUN_BattlerOverlayBase
 * 
 * @help
 * 敵のステートの表示を拡張、変更します。
 * 一部のプラグイン上で敵グラフィックの色調を変更したときにステートアイコンの色調も変わることを防ぎます。
 * またモンスターと重なっても表示が他のモンスターの背後に表示されることはありません。
 * 
 * このプラグインはNUUN_BattlerOverlayBase(バトラーオーバーレイベース)が必要です。
 * 
 * 敵キャラのメモ欄
 * <EnemyStateX:[position]> モンスターのステートアイコンのX座標を調整します。（相対座標）
 * <EnemyStateY:[position]> モンスターのステートアイコンのY座標を調整します。（相対座標）
 * 
 * バトルイベントの注釈
 * <EnemyStatePosition:[Id],[x],[y]> 敵グループの[Id]番目のモンスターのステートアイコンの位置を調整します。（相対座標）
 * [Id]:表示順番号
 * [x]:X座標
 * [y]:Y座標
 * [id]は敵グループ設定で配置した順番のIDで指定します。配置ビューのモンスター画像の左上に番号が表示されますのでその番号を記入します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/6/23 Ver.1.1.4
 * 一部のプラグインでステートアイコンが表示されなくなる問題を修正。
 * 2023/6/2 Ver.1.1.3
 * 処理の修正。
 * 2023/5/16 Ver.1.1.2
 * ステートアイコン表示位置の敵画像の下、敵画像の中心が機能していなかった問題を修正。
 * ステートアイコン表示タイミングを選択時に指定したときにアクターのステートアイコンが表示されない問題を修正。
 * 2023/5/6 Ver.1.1.1
 * ステートの表示をフェードアウト、フェードインさせるように修正。
 * 2022/5/10 Ver.1.1.0
 * バトラーの表示処理の定義大幅変更に関する定義変更。
 * 2022/3/27 Ver.1.0.1
 * ステートの表示をなしに設定してもアイコンが表示されてしまう問題を修正。
 * 戦闘開始時にエラーが起きる問題を修正。
 * 2021/12/12 Ver.1.0.0
 * 初版
 * 
 * 
 * @param EnemyStatePosition
 * @desc モンスターのステートアイコンの表示位置
 * @text ステートアイコン表示位置
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
 */
var Imported = Imported || {};
Imported.NUUN_EnemyStateIconEX = true;

(() => {
const parameters = PluginManager.parameters('NUUN_EnemyStateIconEX');
const EnemyStatePosition = Number(parameters['EnemyStatePosition'] || 0);
const State_X = Number(parameters['State_X'] || 0);
const State_Y = Number(parameters['State_Y'] || 0);
const StateVisible = eval(parameters['StateVisible'] || 0);

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

const _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
Sprite_Enemy.prototype.update = function() {
    _Sprite_Enemy_update.call(this);
    this.updateStateSpriteEx();
};

const _Sprite_Enemy_updateStateSprite = Sprite_Enemy.prototype.updateStateSprite;
Sprite_Enemy.prototype.updateStateSpriteEx = function() {
    if (EnemyStatePosition < 0) {
        return;
    }
    this.createStateIconSprite();
    if (this._stateIconSprite) {
        const enemy = this._enemy.enemy();
        const x = (enemy.meta.EnemyStateX ? Number(enemy.meta.EnemyStateX) : 0) + State_X + this._enemy.getStatePositionX();
        const y = (enemy.meta.EnemyStateY ? Number(enemy.meta.EnemyStateY) : 0) + State_Y + this._enemy.getStatePositionY();
        this._stateIconSprite.x = x;
        this._stateIconSprite.y = y - this.getBattlerStatePosition();

        if (this._stateIconSprite.y < 20 - this.y) {
            this._stateIconSprite.y = 20 - this.y;
        }
    }
};

Sprite_Enemy.prototype.getBattlerStatePosition = function() {
  const scale = this.getBattlerOverlayConflict();
  if (EnemyStatePosition === 0) {
    return this.getBattlerOverlayHeight() * scale;
  } else if (EnemyStatePosition === 2) {
    return Math.floor((this.getBattlerOverlayHeight() * scale) / 2);
  } else {
    return 0;
  }
};

Sprite_Enemy.prototype.createStateIconSprite = function() {//再定義
  if (!this._stateIconSprite) {
    const sprite = new Sprite_StateIcon();
    sprite.StateVisible === 0 ? 255 : 0;
    this._stateIconSprite = sprite;
    sprite.show();
    sprite.move(0, 0);
    $gameTemp.enemyStateRefresh = true;
  } else if (this.battlerOverlay && !this.battlerOverlay.onStateIconSprite && this._stateIconSprite) {
    this.battlerOverlay.addChild(this._stateIconSprite);
    this.battlerOverlay.onStateIconSprite = !!this._stateIconSprite;
  }
};


const _Sprite_StateIcon_initMembers = Sprite_StateIcon.prototype.initMembers;
Sprite_StateIcon.prototype.initMembers = function() {
    _Sprite_StateIcon_initMembers.call(this);
};

Sprite_StateIcon.prototype.stateVisibleInSelect = function() {
  if (this._battler && this._battler.isEnemy() && StateVisible === 1) {
    return this._battler.isSelected();
  }
  return true;
};

Sprite_StateIcon.prototype.stateVisible = function() {
  const _visible = this.stateVisibleInSelect();
  if (_visible && this.opacity < 255) {
      this.opacity += 25;
      this.opacity = this.opacity.clamp(0, 255);
  } else if (!_visible && this.opacity > 0) {
      this.opacity -= 25;
      this.opacity = this.opacity.clamp(0, 255);
  }
  if (this.opacity > 0) {
      this.visible = true;
  } else {
      this.visible = false;
  }
};

const _Sprite_StateIcon_update = Sprite_StateIcon.prototype.update;
Sprite_StateIcon.prototype.update = function() {
  _Sprite_StateIcon_update.call(this);
  if (this._battler && this._battler.isEnemy()) {
    this.stateVisible();
  }
};


const _Spriteset_Battle_updateBattlerOverlay = Spriteset_Battle.prototype.updateBattlerOverlay;
Spriteset_Battle.prototype.updateBattlerOverlay = function() {
  _Spriteset_Battle_updateBattlerOverlay.call(this);
  if ($gameTemp.enemyStateRefresh) {
    this.setStateIconPosition();
    $gameTemp.enemyStateRefresh = false;
  }
};

Spriteset_Battle.prototype.setStateIconPosition = function() {
  const statePositionList = getEnemyStatePosition($gameTroop.troop());
  for (const data of statePositionList) {
    const enemy = $gameTroop.members()[data[0] - 1];
    if (enemy) {
      enemy.setStatePosition(data[1], data[2]);
    }
  }
};


const _Game_Enemy_initMembers = Game_Enemy.prototype.initMembers;
Game_Enemy.prototype.initMembers = function() {
  _Game_Enemy_initMembers.call(this);
  this._battlerStatePositionX = 0;
  this._battlerStatePositionY = 0;
};

Game_Enemy.prototype.setStatePosition = function(x, y){
  this._battlerStatePositionX = x;
  this._battlerStatePositionY = y;
};

Game_Enemy.prototype.getStatePositionX = function(){
  return this._battlerStatePositionX;
};

Game_Enemy.prototype.getStatePositionY = function(){
  return this._battlerStatePositionY;
};

})();