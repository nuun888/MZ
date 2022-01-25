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
 * @plugindesc 能力値ターン毎増減特徴
 * @author NUUN
 * @version 2.0.0
 * 
 * @help
 * ターンごとに徐々に能力値が上昇していく特徴を設定できます。
 * 
 * 特徴を有するメモ欄
 * <Accelerationb[paramId]:[rate]> ターン終了時に[]paramId]の能力値が[rate]%ずつ上昇（減少）します。
 * [paramId]:能力値　0:最大HP 1:最大MP 2:攻撃力 3:防御力 4:魔法力 5:魔法防御 6:敏捷性 7:運
 * [rate]:増加率　ターンごとに増加率が加算されます。
 * <Accelerationb6:10> ターンごとに敏捷性が10%ずつ上昇します。
 * 取得する増加率値がない場合はリセットされます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/1/25 Ver.2.0.0
 * 全ての能力値に対応。
 * 経過ターンの処理を別プラグイン化。
 * ステートでの経過ターンを付与してからのターンに変更。
 * 2021/8/10 Ver.1.0.1
 * アクターのTPBが進行しない問題を修正。
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

Game_BattlerBase.prototype.clearAccelerationbRate = function() {
  //this._accelerationb 旧
  this._abilityRate = [-1,-1,-1,-1,-1,-1,-1,-1];
};

Game_BattlerBase.prototype.resetAccelerationbRate = function(paramId) {
  this._abilityRate[paramId] = -1;
};

Game_BattlerBase.prototype.setAccelerationbRate = function(paramId, rate) {
  const param = this._abilityRate[paramId];
  this._abilityRate[paramId] = param < 0 ? 1.0 + rate : Math.max(param + rate, 0);
};

Game_BattlerBase.prototype.getAccelerationbRate = function(paramId) {
  return this._abilityRate[paramId] >= 0 ? this._abilityRate[paramId] : 1.0;
};

Game_BattlerBase.prototype.traitAccelerationbRate = function(paramId) {
  const rates = this.traitAccelerationb(paramId);
  if (rates.length > 0) {
    return rates.reduce((r, rate) => {
      return r + rate / 100;
    }, 0.0);
  } else {
    return -1;
  }
};

Game_BattlerBase.prototype.traitAccelerationb = function(paramId) {
  const tag = 'Accelerationb';
  return this.traitObjects().reduce((r, trait) => {
    if (trait.meta[tag + paramId]) {
      return r.concat(Number(trait.meta[tag + paramId]));
    } else {
      return r;
    }
  }, []);
};

Game_BattlerBase.prototype.setAccelerationbRates = function() {
  for (let i = 0; i < 8; i++) {
    const rate = this.traitAccelerationbRate(i);
    if (rate >= 0) {
      this.setAccelerationbRate(i, rate);
    } else {
      this.resetAccelerationbRate(i);
    }
  }
};

const _Game_BattlerBase_paramRate = Game_BattlerBase.prototype.paramRate;
Game_BattlerBase.prototype.paramRate = function(paramId) {
  const rate = _Game_BattlerBase_paramRate.call(this, paramId);
  return rate * this.getAccelerationbRate(paramId);
};

const _Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function(advantageous) {
  _Game_Battler_onBattleStart.call(this, advantageous);
  this.clearAccelerationbRate();
};

const _Game_Battler_onTurnEnd =Game_Battler.prototype.onTurnEnd;
Game_Battler.prototype.onTurnEnd = function() {
  _Game_Battler_onTurnEnd.call(this);
  this.setAccelerationbRates();
};

const _Game_Actor_onBattleEnd = Game_Actor.prototype.onBattleEnd;
Game_Actor.prototype.onBattleEnd = function() {
  _Game_Actor_onBattleEnd.call(this)
  this.clearAccelerationbRate();
};

})();
