/*:-----------------------------------------------------------------------------------
 * NUUN_StoppingFeature.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc 踏み止まり特徴
 * @author NUUN
 * @version 1.2.0
 * 
 * @help
 * 戦闘中のダメージでHPが2以上から0になったときに、戦闘不能にならずHPが1で止まる特徴を設定できます。
 * HPが1の時は踏み止まりが発生しません。
 * 条件付きベースプラグインと併用することで、特定の条件で踏み止まる特徴を設定できます。
 * 
 * 特徴を有するメモ欄
 * <StoppingRatio:[rate], [ratio], [condMode]> 指定の割合HP以上で発動します。
 * <StoppingValue:[rate], [hp oe more], [condMode]> 指定のHP以上で発動します。
 * [rate]:発動確立
 * [ratio]:発動するダメージ前のHPの割合。残りHPが指定したHPの割合以上なら発動します。
 * [hp oe more]:発動するHPの数値。
 * [condMode]：条件付きベースプラグインでの条件指定時のモード ※省略可能
 * <StoppingRatio:100, 30> HPが30％以上で戦闘不能になったとき100％の確率でダメージが1で踏み止まります。
 * <StoppingValue:100, 10> HPが10以上の場合で戦闘不能になったとき100％の確率でダメージが1で踏み止まります。
 * <StoppingRatio:50, 0> 50%の確立で戦闘不能になったときにHPが1で踏み止まります。
 * [condMode]は条件付きベースプラグインを導入してない場合は省略してください。
 * 
 * 以下のタグは条件付きベースプラグインが必要です。
 * <StoppingCond:[id], [id], [id]...> 攻撃したバトラーが指定したIDの条件を満たしたときに発動。
 * <TargetStoppingCond:[id], [id], [id]...> 撃破されたバトラーが指定したIDの条件を満たしたときに発動。
 * <PartyStoppingCond:[id], [id], [id]...> パーティメンバーが指定したIDの条件を満たしたときに発動。
 * <TroopStoppingCond:[id], [id], [id]...> 敵グループのメンバーが指定したIDの条件を満たしたときに発動。
 * 
 * <StoppingEraseState:[stateId]> 踏み止まり成功時に指定のステートを解除します。
 * [stateId]:ステートID
 * 
 * スキル、アイテムのメモ欄
 * <InvalidStopping:[rate]> このタグがあるスキル、アイテムは踏み止まりを無効化します。
 * [rate]：無効にする確立
 * <InvalidStopping:50> 撃破時50％の確率で踏み止まりを無効化します。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/10/14 Ver.1.2.0
 * 固定値以上で発動できる機能を追加。
 * HPが2以上の時に発動するように修正。
 * 2023/6/22 Ver.1.1.1
 * 処理の修正。
 * 2023/6/21 Ver.1.1.0
 * 踏み止まった時に指定のステートを解除する機能を追加。
 * 2021/11/18 Ver.1.0.0
 * 初版
 * 
 * @param StoppingMessage
 * @text 踏み止まり時メッセージ
 * @desc 踏み止まり時のメッセージ。%1使用者　%2対象
 * @default 
 * @type string
 * 
 * @param StoppingSESetting
 * @text 踏み止まり時SE設定
 * @default ------------------------------
 * 
 * @param StoppingSE
 * @text 踏み止まり時SE
 * @desc 踏み止まり時のSE
 * @type file
 * @dir audio/se/
 * @parent StoppingSESetting
 * 
 * @param volume
 * @text 音量
 * @desc 音量。
 * @type number
 * @default 90
 * @parent StoppingSESetting
 * 
 * @param pitch
 * @text ピッチ
 * @desc ピッチ。
 * @type number
 * @default 100
 * @parent StoppingSESetting
 * 
 * @param pan
 * @text 位相
 * @desc 位相。
 * @type number
 * @default 50
 * @parent StoppingSESetting
 * 
 */
var Imported = Imported || {};
NUUN_StoppingFeature = true;

(() => {
const parameters = PluginManager.parameters('NUUN_StoppingFeature');
const StoppingMessage = String(parameters['StoppingMessage'] || '');
const StoppingSE = String(parameters['StoppingSE'] || '');
const volume = Number(parameters['volume'] || 90);
const pitch = Number(parameters['pitch'] || 100);
const pan = Number(parameters['pan'] || 50);
let eraseStateId = 0;
let mode = false;

const _Game_Action_executeHpDamage = Game_Action.prototype.executeHpDamage;
Game_Action.prototype.executeHpDamage = function(target, value) {
    eraseStateId = 0;
    mode = false;
    const hp = target.hp;
    if (hp - value <= 0 && this.stopping(target, hp) && !this.getInvalidStoppingRate()) {   
        value = hp - Math.max(hp - value, 0) - 1;
        target.result()._stopping = true;
        target.removeState(eraseStateId);
    }
    _Game_Action_executeHpDamage.call(this, target, value);
};

Game_Action.prototype.stopping = function(target, value) {
    return target.traitObjects().some(trait => {
        const stopping = getStoppingMeta(trait);
        const id = this.stoppingEraseState(trait);
        if (stopping && id > 0) {
            eraseStateId = id;
        }
        return (stopping && isTargetHpCheck(value) && getStoppingResult(target, value, stopping) && this.condStoppingResult(stopping, trait, target));
    })
};

Game_Action.prototype.condStoppingResult = function(stopping, trait, target) {
    if (!Imported.NUUN_ConditionsBase) {
        return true;
    }
    const mode = stopping[2] || 0;
    const action = $gameTemp.getActionData();
    return this.triggerConditions(trait, target, 'StoppingCond', 'TargetStoppingCond', 'PartyStoppingCond', 'TroopStoppingCond', action.damage, mode);
};

Game_Action.prototype.getInvalidStoppingRate = function() {
    const invalidStopping = this.item().meta.InvalidStopping;
    return invalidStopping ? Math.floor(Math.random() * 100) < parseInt(invalidStopping) : false;
};

Game_Action.prototype.stoppingEraseState = function(trait) {
    return trait.meta.StoppingEraseState ? Number(trait.meta.StoppingEraseState) : 0;
};

const _Game_ActionResult_clear = Game_ActionResult.prototype.clear;
Game_ActionResult.prototype.clear = function() {
    _Game_ActionResult_clear.call(this);
    this._stopping = false;
};


const _Window_BattleLog_displayActionResults = Window_BattleLog.prototype.displayActionResults;
Window_BattleLog.prototype.displayActionResults = function(subject, target) {
	_Window_BattleLog_displayActionResults.call(this, subject, target);
	if (target.result().used && target.result()._stopping) {
		this.displayStopping(subject, target);
        this.push("pushBaseLine");
	}
};

Window_BattleLog.prototype.displayStopping = function(subject, target) {
    if (StoppingMessage) {
        this.push("addText", StoppingMessage.format(subject.name(), target.name()));
    }
    stoppingSE();
};

function stoppingSE() {
    if (StoppingSE) {
      AudioManager.playSe({"name":StoppingSE,"volume":volume,"pitch":pitch,"pan":pan});
    }
};

function getStoppingResult(target, value, stopping) {
    if (mode) {
        return getStoppingRate(stopping[0]) && value >= stopping[1];
    } else {
        return getStoppingRate(stopping[0]) && value >= (target.mhp * stopping[1]) / 100;
    }
};

function getStoppingRate(rate) {
    return Math.floor(Math.random() * 100) < rate;
};

function isTargetHpCheck(value) {
    return value > 1;
};

function getStoppingMeta(trait) {
    if (trait.meta.Stopping) {
        return trait.meta.Stopping.split(',').map(Number);
    } else if (trait.meta.StoppingRatio) {
        return trait.meta.StoppingRatio.split(',').map(Number);
    } else if (trait.meta.StoppingValue) {
        mode = true;
        return  trait.meta.StoppingValue.split(',').map(Number)
    } else {
        return null;
    }
};

})();