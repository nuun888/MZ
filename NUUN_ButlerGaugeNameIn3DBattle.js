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
 * @version 1.0.0
 * 
 * @help
 * 疑似3Dバトル併用時にモンスターに表示するゲージ及び名前を追従するようにします。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/6/15 Ver.1.0.0
 * 初版
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_ButlerGaugeNameIn3DBattle = true;

(() => {
const parameters = PluginManager.parameters('NUUN_ButlerGaugeNameIn3DBattle');

const _Sprite_Battler_convertPseudo3dPosition = Sprite_Battler.prototype.convertPseudo3dPosition;
Sprite_Battler.prototype.convertPseudo3dPosition = function() {
  _Sprite_Battler_convertPseudo3dPosition.call(this);
  this.Pseudo3DBattleX = this.x;
  this.Pseudo3DBattleY = this.y;
  this.Pseudo3DScaleX = this.scale.x;
  this.Pseudo3DScaleY = this.scale.y;
};

const _Sprite_Enemy_updateHpGauge = Sprite_Enemy.prototype.updateHpGauge;
Sprite_Enemy.prototype.updateHpGauge = function() {
  const x = this.x;
  const y = this.y;
  this.x = this.Pseudo3DBattleX;
  this.y = this.Pseudo3DBattleY + (this.bitmap.height - this.bitmap.height * this.Pseudo3DScaleY);
  _Sprite_Enemy_updateHpGauge.call(this);
  this.x = x;
  this.y = y;
};

const _Sprite_Enemy_updateTpbGauge = Sprite_Enemy.prototype.updateTpbGauge;
Sprite_Enemy.prototype.updateTpbGauge = function() {
  const x = this.x;
  const y = this.y;
  this.x = this.Pseudo3DBattleX;
  this.y = this.Pseudo3DBattleY + (this.bitmap.height - this.bitmap.height * this.Pseudo3DScaleY);
  _Sprite_Enemy_updateTpbGauge.call(this);
  this.x = x;
  this.y = y;
};

const _Sprite_Enemy_updateEnemyName = Sprite_Enemy.prototype.updateEnemyName;
Sprite_Enemy.prototype.updateEnemyName = function() {
  const x = this.x;
  const y = this.y;
  this.x = this.Pseudo3DBattleX;
  this.y = this.Pseudo3DBattleY + (this.bitmap.height - this.bitmap.height * this.Pseudo3DScaleY);
  _Sprite_Enemy_updateEnemyName.call(this);
  this.x = x;
  this.y = y;
};

})();