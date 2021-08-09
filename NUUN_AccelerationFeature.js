/*:-----------------------------------------------------------------------------------
 * NUUN_AccelerationFeature.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc 加速特徴
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * ターンごとに徐々に敏捷性が上昇していく特徴を設定できます。
 * 
 * 特徴を有するメモ欄
 * <Accelerationb:[rate]> ターン終了時に[rate]%ずつ敏捷性が上昇します。
 * [rate]:増加率　ターンごとに増加率が加算されます。
 * <Accelerationb:10> ターンごとに敏捷性が10%ずつ上昇します。
 * 取得する増加率値がない場合はリセットされます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/8/9 Ver.1.0.0
 * 初版
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_AccelerationFeature = true;

(() => {
const parameters = PluginManager.parameters('NUUN_AccelerationFeature');

const _Game_Battler_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
  _Game_Battler_initMembers.call(this);
  this.clearAccelerationbRate();
};

Game_BattlerBase.prototype.traitAccelerationb = function() {
  return this.traitObjects().reduce((r, trait) => {
    if (trait.meta.Accelerationb) {
      return r.concat(Number(trait.meta.Accelerationb));
    } else {
      return r;
    }
  }, []);
};

Game_BattlerBase.prototype.traitAccelerationbRate = function() {
  const trait = this.traitAccelerationb();
  if (trait.length > 0) {
    return (this.traitAccelerationb().reduce((r, obj) => r * (obj + 100) / 100, 1) -1) * 100;
  }
  return 0;
};

Game_BattlerBase.prototype.setAccelerationbRate = function() {
  const rate = this.traitAccelerationbRate();
  if (rate > 0) {
    this._accelerationbAgi += rate;
  } else if (this._accelerationbAgi > 0) {
    this.clearAccelerationbRate();
  }
};

Game_BattlerBase.prototype.clearAccelerationbRate = function() {
  this._accelerationbAgi = 0;
};

const _Game_BattlerBase_paramRate = Game_BattlerBase.prototype.paramRate;
Game_BattlerBase.prototype.paramRate = function(paramId) {
  const rate = _Game_BattlerBase_paramRate.call(this, paramId);
  if (paramId === 6) {
    return rate * (this._accelerationbAgi / 100 + 1);
  }
  return rate;
};

const _Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function(advantageous) {
  _Game_Battler_onBattleStart.call(this, advantageous);
  this.clearAccelerationbRate();
};

const _Game_Battler_onTurnEnd =Game_Battler.prototype.onTurnEnd;
Game_Battler.prototype.onTurnEnd = function() {
  _Game_Battler_onTurnEnd.call(this);
  this.setAccelerationbRate();
};

const _Game_Actor_onBattleEnd = Game_Actor.prototype.onBattleEnd;
Game_Actor.prototype.onBattleEnd = function() {
  _Game_Actor_onBattleEnd.call(this)
  this.clearAccelerationbRate();
};

})();