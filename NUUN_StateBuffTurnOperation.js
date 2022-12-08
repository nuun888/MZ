/*:-----------------------------------------------------------------------------------
 * NUUN_StateBuffTurnOperation.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc State, buff turn operation item, skill
 * @author NUUN
 * @version 1.0.1
 * 
 * @help
 * You can set the granted state, items that increase or decrease buff turns, and skills.
 * 
 * Item/skill Notes
 * <StateTurnOperations:[turn]> Increases or decreases all remaining turns of the currently granted state.
 * <StateTurnOperations[stateId]:[turn]> Increases or decreases the remaining turns of the specified state.
 * 
 * <BuffTurnOperations:[turn]> Increases or decreases the remaining turns of the currently granted enhancement buff.
 * <BuffTurnOperations[BuffId]:[turn]> Increases or decreases the remaining turns of the specified strengthening buff.
 * 
 * <DebuffTurnOperations:[turn]> Increases or decreases all remaining turns of the currently applied debuff.
 * <DebuffTurnOperations[BuffId]:[turn]> Increases or decreases the remaining turns of the specified debuff.
 * [stateId]:State ID
 * [BuffId]:BuffID 0:HP 1:MP 2:ATK 3:DEF 4:MAT 5:MDF 6:AGI 7:LUK
 * [turn]:± turn number
 * 
 * <StateTurnOperations:2> All remaining turns of the granted state are added by 2 turns.
 * <StateTurnOperations5:-2> All remaining turns of the given state ID 5 state will be subtracted by 2 turns.
 * <BuffTurnOperations2:3> 3 turns will be added to the remaining turns when attack power is increased.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 12/8/2022 Ver.1.0.1
 * Changed the display in languages other than Japanese to English.
 * 2/16/2022 Ver.1.0.0
 * First edition.
 * 
 * 
 */
/*:
 * @target MZ
 * @plugindesc ステート、バフターン操作アイテム、スキル
 * @author NUUN
 * @version 1.0.1
 * 
 * @help
 * 付与されているステート、バフのターンを増減させるアイテム、スキルを設定できます。
 * 
 * アイテム、スキルのメモ欄
 * <StateTurnOperations:[turn]> 現在付与されているステートの残りターンを全て増減させます。
 * <StateTurnOperations[stateId]:[turn]> 指定したステートの残りターンを増減させます。
 * 
 * <BuffTurnOperations:[turn]> 現在付与されている強化バフの残りターンを全て増減させます。
 * <BuffTurnOperations[BuffId]:[turn]> 指定した強化バフの残りターンを増減させます。
 * 
 * <DebuffTurnOperations:[turn]> 現在付与されている弱体バフの残りターンを全て増減させます。
 * <DebuffTurnOperations[BuffId]:[turn]> 指定した弱体バフの残りターンを増減させます。
 * [stateId]:ステートID
 * [BuffId]:バフID 0:HP 1:MP 2:攻撃力 3:防御力 4:魔法力 5:魔法防御 6:敏捷性 7:運
 * [turn]:±ターン数
 * 
 * <StateTurnOperations:2> 付与されているステートの残りターンが全て2ターン加算されます。
 * <StateTurnOperations5:-2> 付与されているステートID5番のステートの残りターンが全て2ターン減算されます。
 * <BuffTurnOperations2:3> 攻撃力上昇時の残りターンが3ターン加算されます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/12/8 Ver.1.0.1
 * 日本語以外での表示を英語表示に変更。
 * 2022/2/16 Ver.1.0.0
 * 初版
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_StateBuffTurnOperation = true;

(() => {
const parameters = PluginManager.parameters('NUUN_StateBuffTurnOperation');

function getStateTurn(stateId, item) {
    const tag = 'StateTurnOperations'
    if (item.meta.StateTurnOperations) {
        return Number(item.meta.StateTurnOperations);
    } else if (item.meta[tag + stateId]) {
        return Number(item.meta[tag + stateId]);
    } else {
        return 0;
    }
};

function getBuffTurn(buffId, item) {
    const tag = 'BuffTurnOperations'
    if (item.meta.BuffTurnOperations) {
        return Number(item.meta.BuffTurnOperations);
    } else if (item.meta[tag + buffId]) {
        return Number(item.meta[tag + buffId]);
    } else {
        return 0;
    }
};

function getDebuffTurn(buffId, item) {
    const tag = 'DebuffTurnOperations'
    if (item.meta.DebuffTurnOperations) {
        return Number(item.meta.DebuffTurnOperations);
    } else if (item.meta[tag + buffId]) {
        return Number(item.meta[tag + buffId]);
    } else {
        return 0;
    }
};

const _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    _Game_Action_applyItemUserEffect.call(this, target);
    this.useStateTurnOperation(target);
    this.useBuffTurnOperation(target);
};

Game_Action.prototype.useStateTurnOperation = function(target) {
    for (const stateId of target._states) {
        const turn = getStateTurn(stateId, this.item());
        if (turn !== 0) {
            target.stateTurnOperation(stateId, turn);
            this.makeSuccess(target);
        }
    }
};

Game_Action.prototype.useBuffTurnOperation = function(target) {
    let turn = 0;
    target._buffs.forEach((buff, i) => {
        if (target.isBuffAffected(i)) {
            turn = getBuffTurn(i, this.item());
        } else if (target.isDebuffAffected(i)) {
            turn = getDebuffTurn(i, this.item());
        }
        
        if (turn !== 0) {
            target.buffTurnOperation(i, turn);
            this.makeSuccess(target);
        }
    });
};

Game_Battler.prototype.stateTurnOperation = function(stateId, turn) {
    this._stateTurns[stateId] = Math.max(this._stateTurns[stateId] + turn, 0);
};

Game_Battler.prototype.buffTurnOperation = function(id, turn) {
    this._buffTurns[id] = Math.max(this._buffTurns[id] + turn, 0);
};

})();