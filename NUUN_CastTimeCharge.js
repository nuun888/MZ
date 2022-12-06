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
 * @plugindesc  Cast time charge rate characteristics
 * @author NUUN
 * @version 1.0.1
 * 
 * @help
 * You can add a feature that changes the charge rate during casting time.
 * 
 * Note fields with features (Actor, Class, Weapon, Armor, State, Enemy)
 * <CastTimeCharge:[rate]> Cast time charge rate changes by [rate]%.
 * <CastTimeCharge:50> Charge rate of cast time becomes 50%. (The speed at which it accumulates is halved)
 * <CastTimeCharge:200> Cast time charge rate is doubled.
 * <CastTimeCharge:0> Immediately activate the skill.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 12/6/2022 Ver.1.0.1
 * Changed the display in languages other than Japanese to English.
 * 3/11/2021 Ver.1.0.0
 * First edition.
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc  キャストタイムチャージ率特徴
 * @author NUUN
 * @version 1.0.1
 * 
 * @help
 * キャストタイム中のチャージ率を変化させる特徴を付けることが出来ます。
 * 
 * 特徴を有するメモ欄（アクター、職業、武器、防具、ステート、敵キャラ）
 * <CastTimeCharge:[rate]> キャストタイムのチャージ率が[rate]%変化します。
 * <CastTimeCharge:50> キャストタイムのチャージ率が５０％になります。（溜まるスピードが半分になります）
 * <CastTimeCharge:200> キャストタイムのチャージ率が２倍になります。
 * <CastTimeCharge:0> スキルを即時発動します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/12/6 Ver.1.0.1
 * 日本語以外での表示を英語表示に変更。
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