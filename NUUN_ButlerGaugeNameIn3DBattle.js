/*:-----------------------------------------------------------------------------------
 * NUUN_ButlerGaugeNameIn3DBattle.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc  バトラーゲージ及びネーム表示疑似3Dバトル併用パッチ
 * @author NUUN
 * @version 1.0.2
 * 
 * @help
 * 疑似3Dバトル併用時にモンスターに表示するゲージ及び名前を追従するようにします。
 * このプラグインは疑似3Dバトル（木星ペンギン様）とバトラーHPゲージ、エネミーTPBゲージ併用時に
 * ゲージ、エネミー名を追従させるためのプラグインです。
 * 
 * 仕様
 * 疑似3Dバトルの仕様によりConflictScaleで設定したモードに関係なく拡大率に考慮して表示されます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/5/11 Ver.1.0.2
 * 敵名前表示の仕様変更に関する定義変更。
 * 2021/6/15 Ver.1.0.1
 * 疑似3DバトルVer.1.1に対応。
 * 2021/6/15 Ver.1.0.0
 * 初版
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_ButlerGaugeNameIn3DBattle = true;

(() => {
const parameters = PluginManager.parameters('NUUN_ButlerGaugeNameIn3DBattle');

const _Spriteset_Battle_convertSprite3dPlacement = Spriteset_Battle.prototype.convertSprite3dPlacement;
Spriteset_Battle.prototype.convertSprite3dPlacement = function(sprite) {
  _Spriteset_Battle_convertSprite3dPlacement.call(this, sprite);
  sprite.Pseudo3DBattleX = sprite.x;
  sprite.Pseudo3DBattleY = sprite.y;
  sprite.Pseudo3DScaleX = sprite.scale.x;
  sprite.Pseudo3DScaleY = sprite.scale.y;
  if (sprite.battlerOverlay) {
    sprite.battlerOverlay.updatePosition();
  }
};


const _Sprite_Enemy_updateHpGauge = Sprite_Enemy.prototype.updateHpGauge;
Sprite_Enemy.prototype.updateHpGauge = function() {
  const height = this.sv_EnemyHeight();
  const x = this.x;
  const y = this.y;
  this.x = this.Pseudo3DBattleX;
  this.y = this.Pseudo3DBattleY + (this.getButlerHpPosition() === 0 ? (height - height * this.Pseudo3DScaleY) : 0);
  _Sprite_Enemy_updateHpGauge.call(this);
  this.x = x;
  this.y = y;
};

const _Sprite_Enemy_updateTpbGauge = Sprite_Enemy.prototype.updateTpbGauge;
Sprite_Enemy.prototype.updateTpbGauge = function() {
  const height = this.sv_EnemyHeight();
  const x = this.x;
  const y = this.y;
  this.x = this.Pseudo3DBattleX;
  this.y = this.Pseudo3DBattleY + (this.getButlerTpbPosition() === 0 ? (height - height * this.Pseudo3DScaleY) : 0);
  _Sprite_Enemy_updateTpbGauge.call(this);
  this.x = x;
  this.y = y;
};

Sprite_Enemy.prototype.sv_EnemyHeight = function() {
  if (this._SVBattlername) {
    return Math.round(this._mainSprite.bitmap.height / 6);
  } else if (this._svBattlerSprite) {
    return this.height;
  } else {
    return this.bitmap.height;
  }
};

})();