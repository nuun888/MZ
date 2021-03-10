/*:-----------------------------------------------------------------------------------
 * NUUN_CastTimeCharge.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc  キャストタイムチャージ率特徴
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * キャストタイム中のチャージ率を変化させる特徴を付けることが出来ます。
 * 
 * 特徴を有するメモ欄（アクター、職業、武器、防具、ステート、エネミー）
 * <CastTimeCharge:[rate]> キャストタイムのチャージ率が[rate]%変化します。
 * <CastTimeCharge:50> キャストタイムのチャージ率が５０％になります。（溜まるスピードが半分になります）
 * <CastTimeCharge:200> キャストタイムのチャージ率が２倍になります。
 * <CastTimeCharge:0> スキルを即時発動します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/3/11 Ver.1.0.0
 * 初版
 * 
 */
var Imported = Imported || {};
Imported.NUUN_CastTimeCharge = true;

(() => {
const parameters = PluginManager.parameters('NUUN_CastTimeCharge');

const _Game_Battler_tpbAcceleration = Game_Battler.prototype.tpbAcceleration;
Game_Battler.prototype.tpbAcceleration = function() {
  return _Game_Battler_tpbAcceleration.call(this) * (this._tpbState === "casting" ? this.tpbCastTimeCharge() : 1);
};

Game_Battler.prototype.tpbCastTimeCharge = function() {
  let rate = 1;
  for (const traitObject of this.traitObjects()) {
    if (traitObject.meta.CastTimeCharge) {
      const chargeRate = Number(traitObject.meta.CastTimeCharge);
      if (chargeRate === 0) {//即時発動
        return Infinity;
      } else if (chargeRate > 0) {
        rate *= chargeRate / 100;
      }
    }
  }
  return rate;
};

})();