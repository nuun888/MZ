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
 * @plugindesc Ability value increase/decrease feature per turn
 * @author NUUN
 * @version 2.0.3
 * 
 * @help
 * You can set the feature that the ability value gradually increases for each turn.
 * 
 * Note field with features
 * <AbilityIncrease:[param],[rate]> At the end of the turn, ability value ID[param] increases agility by [rate]% each turn.
 * [param]:Ability ID
 * 0:MaxHP 1:MaxMP 2:ATK 3:DEF 4:MAT 5:MDF 6：AGI 7:LUK
 * [rate]:Increase rate　Increase rate is added every turn.
 * <Acceleration:6, 10> Agility increases by 10% each turn.
 * It is reset if there are no growth rate values to retrieve.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * 
 * Log
 * 8/8/2025 Ver.2.0.3
 * Fixed an issue where abilities would increase while moving.
 * 11/25/2022 Ver.2.0.2
 * Changed the display in languages other than Japanese to English.
 * 1/26/2022 Ver.2.0.1
 * Fixed an issue where an error would occur when starting the game from the middle of a save.
 * 1/25/2022 Ver.2.0.0
 * Compatible with all abilities.
 * A separate plug-in for processing elapsed turns.
 * 8/10/2021 Ver.1.0.1
 * Fixed Actor TPB not progressing.
 * 8/9/2021 Ver.1.0.0
 * First edition.
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 能力値ターン毎増減特徴
 * @author NUUN
 * @version 2.0.3
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
 * 2025/8/8 Ver.2.0.3
 * 移動中に能力が上昇してしまう問題を修正。
 * 2022/11/25 Ver.2.0.2
 * 日本語以外での表示を英語表示に変更。
 * 2022/1/26 Ver.2.0.1
 * セーブ途中からゲームを開始するとエラーが出る問題を修正。
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
    if (!this._abilityRate) {
        this.clearAccelerationbRate();
    }
    this._abilityRate[paramId] = -1;
};

Game_BattlerBase.prototype.setAccelerationbRate = function(paramId, rate) {
    if (!this._abilityRate) {
        this.clearAccelerationbRate();
    }
    const param = this._abilityRate[paramId];
    this._abilityRate[paramId] = param < 0 ? 1.0 + rate : Math.max(param + rate, 0);
};

Game_BattlerBase.prototype.getAccelerationbRate = function(paramId) {
    if (!this._abilityRate) {
        this.clearAccelerationbRate();
    }
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
    if (!$gameParty.inBattle()) return;//移動中は実行しない
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