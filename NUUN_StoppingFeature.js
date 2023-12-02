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
 * @plugindesc Stopping feature
 * @author NUUN
 * @version 1.3.0
 * 
 * @help
 * You can set a feature that when your HP goes from 2 or more to 0 due to damage during battle, your HP will stop at 1 instead of becoming incapacitated.
 * When HP is 1, a stop will not occur.
 * By using it in conjunction with "NUUN_ConditionsBase", you can set a characteristic that stops under certain conditions.
 * 
 * Memo field with characteristics
 * <StoppingRatio:[rate], [ratio], [condMode]> Activates when the specified percentage HP is exceeded.
 * <StoppingValue:[rate], [hp oe more], [condMode]> Activates when the specified HP is exceeded.
 * [rate]:Activation conditions
 * [ratio]:Percentage of HP before damage is activated. Activates if the remaining HP is equal to or higher than the specified HP percentage.
 * [hp oe more]:The number of HP to activate.
 * [condMode]:Mode when specifying conditions in "NUUN_ConditionsBase" *Optional
 * <StoppingRatio:100, 30> When HP is 30% or more and you are unable to fight, there is a 100% chance that the damage will stop at 1.
 * <StoppingValue:100, 10> If your HP is 10 or more and you become incapacitated, there is a 100% chance that the damage will stop at 1.
 * <StoppingRatio:50, 0> There is a 50% chance that when you become incapacitated, your HP will stop at 1.
 * Omit [condMode] if "NUUN_ConditionsBase" is not installed.
 * 
 * The following tags require "NUUN_ConditionsBase".
 * <StoppingCond:[id], [id], [id]...> Activated when the attacking battler meets the specified ID conditions.
 * <TargetStoppingCond:[id], [id], [id]...> Activated when the defeated battler meets the specified ID conditions.
 * <PartyStoppingCond:[id], [id], [id]...> Activates when party members meet the specified ID conditions.
 * <TroopStoppingCond:[id], [id], [id]...> Activated when a member of the enemy group meets the specified ID conditions.
 * 
 * <StoppingEraseState:[stateId]> Releases the specified state when the stop is successful.
 * [stateId]:State ID.
 * 
 * <MaxStoppingCount:[count]> Specify the number of times you will stop in one battle. If there is more than one, the maximum finite number is applied.
 * [count]:The number of times.
 * 
 * Skill and item notes
 * <InvalidStopping:[rate]> Skills and items with this tag will invalidate the stopping point.
 * [rate]:Probability of invalidating
 * <InvalidStopping:50> When defeated, there is a 50% chance to nullify the stop.
 * 
 * <ResetStoppingCount> Resets the number of stops.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 12/2/2023 Ver.1.3.0
 * Added a function that allows you to set the number of times it can be activated.
 * Changed the method to set the activation probability as an evaluation formula.
 * 10/14/2023 Ver.1.2.0
 * Added a function that can be activated above a fixed value.
 * Modified to activate when HP is 2 or more.
 * 6/22/2023 Ver.1.1.1
 * Processing correction.
 * 6/21/2023 Ver.1.1.0
 * Added a function to cancel the specified state when stopped.
 * 11/18/2021 Ver.1.3.0
 * First edition.
 * 
 * @param ActorMaxStopping
 * @text Actor maximum number of stops
 * @desc Maximum number of stops for the actor. 0 for unlimited
 * @type number
 * @default 0
 * 
 * @param EnemyMaxStopping
 * @text Enemy maximum number of stops
 * @desc Maximum number of stops for the enmey. 0 for unlimited
 * @type number
 * @default 0
 * 
 * @param StoppingMessage
 * @text Message when stopping
 * @desc A message when you stop. %1 user %2 target
 * @default 
 * @type string
 * 
 * @param ActorStoppingRateFormat
 * @text Actor activation probability
 * @desc The activation probability that the actor will stop. this:$gameActor
 * @type combo
 * @option Math.floor(Math.random() * 100) < rate;
 * @default Math.floor(Math.random() * 100) < rate;
 *  
 * @param EnemyStoppingRateFormat
 * @text Enemy activation probability
 * @desc Probability of activation that will stop the enemy. this:$gameEnemy
 * @type combo
 * @option Math.floor(Math.random() * 100) < rate;
 * @default Math.floor(Math.random() * 100) < rate;
 * 
 * @param StoppingSESetting
 * @text SE setting when stopping
 * @default ------------------------------
 * 
 * @param StoppingSE
 * @text SE
 * @desc SE
 * @type file
 * @dir audio/se/
 * @parent StoppingSESetting
 * 
 * @param volume
 * @text Volume
 * @desc Volume
 * @type number
 * @default 90
 * @parent StoppingSESetting
 * 
 * @param pitch
 * @text Pitch
 * @desc Pitch
 * @type number
 * @default 100
 * @parent StoppingSESetting
 * 
 * @param pan
 * @text Pan
 * @desc Pan
 * @type number
 * @default 50
 * @parent StoppingSESetting
 * 
 */
/*:ja
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
 * <MaxStoppingCount:[count]> 一回の戦闘での踏み止まる回数を指定します。複数存在する場合は最大の有限回数が適用されます。
 * [count]:回数
 * 
 * スキル、アイテムのメモ欄
 * <InvalidStopping:[rate]> このタグがあるスキル、アイテムは踏み止まりを無効化します。
 * [rate]：無効にする確立
 * <InvalidStopping:50> 撃破時50％の確率で踏み止まりを無効化します。
 * 
 * <ResetStoppingCount> 踏み止まりの回数をリセットします。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/12/2 Ver.1.3.0
 * 発動できる回数を設定できる機能を追加。
 * 発動確率を評価式に設定する方式に変更。
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
 * @param ActorMaxStopping
 * @text アクター最大踏み止まり回数
 * @desc アクターの最大踏み止まり回数。0で無制限
 * @type number
 * @default 0
 * 
 * @param EnemyMaxStopping
 * @text 敵最大踏み止まり回数
 * @desc 敵の最大踏み止まり回数。0で無制限
 * @type number
 * @default 0
 * 
 * @param StoppingMessage
 * @text 踏み止まり時メッセージ
 * @desc 踏み止まり時のメッセージ。%1使用者 %2対象
 * @default 
 * @type string
 * 
 * @param ActorStoppingRateFormat
 * @text アクター発動確率
 * @desc アクターの踏み止まる発動確率。this:$gameActor
 * @type combo
 * @option Math.floor(Math.random() * 100) < rate;
 * @default Math.floor(Math.random() * 100) < rate;
 *  
 * @param EnemyStoppingRateFormat
 * @text 敵発動確率
 * @desc 敵の踏み止まる発動確率。this:$gameEnemy
 * @type combo
 * @option Math.floor(Math.random() * 100) < rate;
 * @default Math.floor(Math.random() * 100) < rate;
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
const ActorMaxStopping = Number(parameters['ActorMaxStopping'] || 0);
const EnemyMaxStopping = Number(parameters['EnemyMaxStopping'] || 0);
const ActorStoppingRateFormat = DataManager.nuun_structureData(parameters['ActorStoppingRateFormat']);
const EnemyStoppingRateFormat = DataManager.nuun_structureData(parameters['EnemyStoppingRateFormat']);
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
        target.stoppingFeatureCount();
    }
    _Game_Action_executeHpDamage.call(this, target, value);
};

Game_Action.prototype.stopping = function(target, value) {
    const maxCount = this.getStoppingFeatureCount(target);
    if (maxCount > 0 && !target.isStoppingFeatureCount(maxCount)) {
        return false;
    }
    return target.traitObjects().some(trait => {
        const stopping = getStoppingMeta(trait);
        const id = this.stoppingEraseState(trait);
        if (stopping && id > 0) {
            eraseStateId = id;
        }
        return (stopping && isTargetHpCheck(value) && getStoppingResult(target, value, stopping) && this.condStoppingResult(stopping, trait, target));
    })
};

Game_Action.prototype.getStoppingFeatureCount = function(target) {
    const maxCount = target.isActor() ? ActorMaxStopping : EnemyMaxStopping;
    return target.traitObjects().reduce((r,trait) => {console.log(r)
        if (trait.meta.MaxStoppingCount && r < Number(trait.meta.MaxStoppingCount)) {
            r = Number(trait.meta.MaxStoppingCount);
        }
        return r;
    }, maxCount);
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

const _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    _Game_Action_applyItemUserEffect.call(this, target);
    this.resetStoppingCount(target);
};

Game_Action.prototype.resetStoppingCount = function(target) {
    const item = this.item();
    if (item.meta.ResetStoppingCount) {
        target.initStoppingFeatureCount();
        this.makeSuccess(target);
    }
};


const _Game_ActionResult_clear = Game_ActionResult.prototype.clear;
Game_ActionResult.prototype.clear = function() {
    _Game_ActionResult_clear.call(this);
    this._stopping = false;
};


const _Game_Battler_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
    _Game_Battler_initMembers.call(this);
    this._stoppingFeatureCount = 0;
};

Game_Battler.prototype.initStoppingFeatureCount = function() {
    this._stoppingFeatureCount = 0;
};

Game_Battler.prototype.stoppingFeatureCount = function() {
    this._stoppingFeatureCount++;
};

Game_Battler.prototype.isStoppingFeatureCount = function(count) {
    return this._stoppingFeatureCount < count;
};

Game_Actor.prototype.getStoppingFeatureRate = function(rate) {
    return !!ActorStoppingRateFormat ? eval(ActorStoppingRateFormat) : getStoppingRate(rate);
};

Game_Enemy.prototype.getStoppingFeatureRate = function(rate) {
    return !!EnemyStoppingRateFormat ? eval(EnemyStoppingRateFormat) : getStoppingRate(rate);
};


Game_Party.prototype.initStoppingFeatureCount = function() {
    const members = this.allMembers();//控えメンバーも含める
    for (const menber of members) {
        menber.initStoppingFeatureCount();
    }
};

Game_Troop.prototype.initStoppingFeatureCount = function() {
    const members = this.members();
    for (const menber of members) {
        menber.initStoppingFeatureCount();
    }
};

const _Game_Unit_onBattleStart = Game_Unit.prototype.onBattleStart;
Game_Unit.prototype.onBattleStart = function(advantageous) {
    _Game_Unit_onBattleStart.call(this, advantageous);
    this.initStoppingFeatureCount();
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
        return target.getStoppingFeatureRate(stopping[0]) && value >= stopping[1];
    } else {
        return target.getStoppingFeatureRate(stopping[0]) && value >= (target.mhp * stopping[1]) / 100;
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