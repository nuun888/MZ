/*:-----------------------------------------------------------------------------------
 * NUUN_CancelCastTime.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc  キャストタイム（詠唱）キャンセルスキル、アイテム
 * @author NUUN
 * @version 1.1.0
 * 
 * @help
 * キャスト（詠唱）中のスキルをキャンセルさせるスキル、アイテムを設定できます。
 * 
 * キャストタイム（詠唱）キャンセルスキルの設定
 * アイテム、スキルのメモ欄
 * <C_CastTime:[rate]> 対象のキャストタイム（詠唱）中のスキルをキャンセルさせます。[rate]:確率
 * <C_CastTime:100> キャスト（詠唱）中のスキルをキャンセルします。
 * <C_CastTime:50> キャスト（詠唱）中のスキルを５０％の確率でキャンセルします。
 * 
 * キャストタイム（詠唱）キャンセルスキルを受けた時のスキルキャンセルのキャンセル有効度設定
 * スキルのメモ欄
 * <C_Disabled:[rate]> キャスト（詠唱）中スキルのキャンセル有効度を設定します。0でキャンセル無効、100で通常 [rate]:確率
 * <C_Disabled:50> キャスト（詠唱）中スキルのキャンセル成功率が２０％の低下します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/1/16 Ver.1.1.0
 * キャンセル時のチャージタイムを０からチャージするか、キャンセル時のキャストタイムの割合から溜めさせるかチャージを指定できる機能を追加。
 * 2021/1/11 Ver.1.0.0
 * 初版
 * 
 * @param CancelTpbChargeRate
 * @desc キャンセルされた時、チャージタイムの開始値を溜めたキャストタイムの割合からの開始値にする。（false：初期値0）
 * @text キャンセル時チャージタイム割合開始
 * @type boolean
 * @default true
 * 
 * @param CancelCastTimeSEDate
 * @text SE設定
 * 
 * @param CancelCastTimeSE
 * @text キャストタイムキャンセル時SE
 * @desc キャストタイム（詠唱）キャンセル時のSE
 * @type file
 * @dir audio/se/
 * @parent CancelCastTimeSEDate
 * 
 * @param volume
 * @text 音量
 * @desc 音量。
 * @type number
 * @default 90
 * @parent CancelCastTimeSEDate
 * 
 * @param pitch
 * @text ピッチ
 * @desc ピッチ。
 * @type number
 * @default 100
 * @parent CancelCastTimeSEDate
 * 
 * @param pan
 * @text 位相
 * @desc 位相。
 * @type number
 * @default 50
 * @parent CancelCastTimeSEDate
 */
var Imported = Imported || {};
Imported.NUUN_CancelCastTime = true;

(() => {
const parameters = PluginManager.parameters('NUUN_CancelCastTime');
const CancelTpbChargeRate = eval(parameters['CancelTpbChargeRate'] || true);
const CancelCastTimeSE = String(parameters['CancelCastTimeSE']);
const volume = Number(parameters['volume'] || 90);
const pitch = Number(parameters['pitch'] || 100);
const pan = Number(parameters['pan'] || 50);

Game_Action.prototype.cancelCastTimeAttack = function() {
  return this.item().meta.C_CastTime ? Number(this.item().meta.C_CastTime) : 0;
};

Game_Action.prototype.cancelCastTimeRate = function(rate, target) {
	return Math.floor(Math.random() * 100) < rate * this.cancelCastTimeDisabled(target);
};

const _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
  _Game_Action_applyItemUserEffect.call(this, target);
  if (BattleManager.isTpb()) {
    const rate = this.cancelCastTimeAttack();
    if (rate > 0) {
      if (this.cancelCastTimeRate(rate, target) && target._tpbState === "casting") {
        const tpb_rate = target._tpbCastTime / target.tpbRequiredCastTime();
        BattleManager.endBattlerActions(target);
        target.clearActions();
        if (CancelTpbChargeRate) {
          target.setTpbChargeTime_CancelCastTime(tpb_rate);
        }
        if(CancelCastTimeSE) {
          AudioManager.playSe({"name":CancelCastTimeSE,"volume":volume,"pitch":pitch,"pan":pan});
        }
      }
    }
  }
};

Game_Action.prototype.cancelCastTimeDisabled = function(target) {
  const actions = target._actions.filter(action => action.isValid());
  const items = actions.map(action => action.item());
  let rate = 1.0;
  items.forEach(item => {
    rate *= this.castTimeDisabled(item) / 100;
  });
  return rate;
};

Game_Action.prototype.castTimeDisabled = function(item) {
  return item.meta.C_Disabled ? Number(item.meta.C_Disabled) : 100;
};

Game_Battler.prototype.setTpbChargeTime_CancelCastTime = function(rate) {
  this._tpbChargeTime = 1 * rate;
};

})();