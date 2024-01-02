/*:-----------------------------------------------------------------------------------
 * NUUN_SVActorStateIcon.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc サイドビューアクターステートアイコン
 * @author NUUN
 * @version 1.0.3
 * @base NUUN_BattlerOverlayBase
 * @orderAfter NUUN_BattlerOverlayBase
 * 
 * @help
 * サイドビューアクター上にステートアイコンを表示させます。
 * 
 * アクターのメモ欄
 * <ActorStateX:[position]> アクターのステートアイコンのX座標を調整します。（相対座標）
 * <ActorStateY:[position]> アクターのステートアイコンのY座標を調整します。（相対座標）
 * <HideSVStateIcon> ステートアイコンを表示させません。
 * 
 * このプラグインはNUUN_BattlerOverlayBase(バトラーオーバーレイベース)が必要です。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/1/3 Ver.1.0.3
 * 処理の修正。
 * 2023/7/11 Ver.1.0.2
 * 特定のアクターに対しステートアイコンを表示させない機能を追加。
 * 2023/6/2 Ver.1.0.1
 * 処理の修正。
 * 2022/5/10 Ver.1.0.0
 * 初版
 * 
 * @param ActorStatePosition
 * @desc SVアクターのステートアイコンの表示位置
 * @text 名前表示位置
 * @type select
 * @option 表示なし
 * @value 'none'
 * @option 敵画像の上
 * @value 'up'
 * @option 敵画像の下
 * @value 'under'
 * @option 敵画像の中心
 * @value 'middle'
 * @default 'up'
 * 
 * @param StateVisible
 * @desc ステートアイコンの表示タイミング
 * @text ステートアイコン表示タイミング
 * @type select
 * @option 常に表示
 * @value 'always'
 * @default 'always'
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
 * @param ActorWindowStetaIconShow
 * @type boolean
 * @default false
 * @text ウィンドウステートアイコン表示
 * @desc アクターステータスウィンドウのステートアイコンを表示します。
 * 
 */
var Imported = Imported || {};
Imported.NUUN_SVActorStateIcon = true;
let bootStart = false;

(() => {
const parameters = PluginManager.parameters('NUUN_SVActorStateIcon');
const ActorStatePosition = eval(parameters['ActorStatePosition']) || 'up';
const State_X = Number(parameters['State_X'] || 0);
const State_Y = Number(parameters['State_Y'] || 0);
const StateVisible = eval(parameters['StateVisible']) || 'always';
const ActorWindowStetaIconShow = eval(parameters['ActorWindowStetaIconShow'] || 'false');

const _Sprite_Actor_update = Sprite_Actor.prototype.update;
Sprite_Actor.prototype.update = function() {
  _Sprite_Actor_update.call(this);
  this.updateStateSprite();
};

Sprite_Actor.prototype.updateStateSprite = function() {
    if (!this._actor || ActorStatePosition === 'none' || this._actor.actor().meta.HideSVStateIcon) {
      return;
    }
    if (this.battlerOverlay && !this._stateIconSprite) {
      this.createStateIconSprite();
    }
    if (this._stateIconSprite) {
      const actor = this._actor.actor();
      const x = (actor.meta.ActorStateX ? Number(actor.meta.ActorStateX) : 0) + State_X;
      const y = (actor.meta.ActorStateY ? Number(actor.meta.ActorStateY) : 0) + State_Y;
      this._stateIconSprite.x = x;
      this._stateIconSprite.y = y - this.getBattlerStatePosition() - 20;
    }
};

Sprite_Actor.prototype.getBattlerStatePosition = function() {
    const scale = this.battlerOverlay.battlerSpriteScale_y;
    if (ActorStatePosition === 'up') {
      return this.getSVBattlerHeight() * scale;
    } else if (ActorStatePosition === 'middle') {
      return Math.floor((this.getSVBattlerHeight() * scale) / 2);
    } else {
      return 0;
    }
};

Sprite_Actor.prototype.createStateIconSprite = function() {
    NuunManager.isEnemyStateIconMode = this.isEnemySpriteStateIcon();
    const sprite = new Sprite_StateIcon();
    this.battlerOverlay.addChild(sprite);
    this._stateIconSprite = sprite;
    sprite.setup(this._actor);
    sprite.show();
    sprite.move(0, 0);
    sprite._svMode = true;
};

Sprite_Actor.prototype.isEnemySpriteStateIcon = function() {
    const _class = String(this.constructor.name);
    switch (_class) {
        case "Sprite_EnemyRex":
            return true;
        default:
            return false;
    }
};

const _Sprite_StateIcon_initMembers = Sprite_StateIcon.prototype.initMembers;
Sprite_StateIcon.prototype.initMembers = function() {
    this._isEnemyMode = NuunManager.isEnemyStateIconMode;
    _Sprite_StateIcon_initMembers.call(this);
    this.svMode = false;
};

Sprite_StateIcon.prototype.stateActorVisibleInSelect = function() {
    if (StateVisible === 'select') {
      return this._battler.isSelected();
    }
    return true;
};
  
Sprite_StateIcon.prototype.stateActorVisible = function() {
    this.visible = this.stateActorVisibleInSelect();
};
  
const _Sprite_StateIcon_update = Sprite_StateIcon.prototype.update;
Sprite_StateIcon.prototype.update = function() {
    _Sprite_StateIcon_update.call(this);
    if (this._battler && this._battler.isActor()) {
      this.stateActorVisible();
    }
};

if (!ActorWindowStetaIconShow) {
    Window_StatusBase.prototype.placeStateIcon = function(actor, x, y) {
    
    };
}

})();