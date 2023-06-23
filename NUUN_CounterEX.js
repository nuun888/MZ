/*:-----------------------------------------------------------------------------------
 * NUUN_CounterEX.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Counter extension
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * Extend the counter.
 * 
 * Counter trigger
 * Always: When the conditions are met, counterattack (reflection) is possible even if you are not the target of the attack.
 * Skill: Counterattacks (reflects) at the time of special skill.
 * Magic: Counterattacks (reflects) during magic.
 * Sure hit: Counterattack (reflect) when hit.
 * Use item: Counterattacks (reflects) when using an item.
 * If you do not specify Always, only the target that was attacked will be the counterattack target.
 * If you want to counterattack when using an item, please set both always and item.
 * 
 * Counter skill
 * If you specify multiple skills, one will be activated randomly from the skills that match the conditions.
 * 
 * Counter action
 * Counterattack: Counterattack with the specified skill when attacked. If none is specified, it will counterattack with a normal attack.
 * Reflection: Reflects the caster with the skill received when attacked.
 * Full reflection: Reflects with the skill received when attacked. If you receive a full attack, give the opponent a full attack.
 * 
 * Activation timing
 * Per target: Counterattacks (reflects) each time a target is hit.
 * After Action: Counterattack when the action is over.
 * 
 * Counter activation condition
 * "NUUN_ConditionsBase" (Ver.1.2.0 or later) is required to use this function.
 * Set from the counter activation condition of the plug-in parameter.
 * Specifies the list ID of plugin parameters for "NUUN_ConditionsBase". If you specify multiple items, separate them with a comma.
 * 
 * Setting counterattack (reflection)
 * Notes with features
 * <CounterEX:[id]>Set a counter.
 * [id]:Counter setting list ID or Counter name.
 * 
 * Counterattack (reflection) invalid tag
 * Skills, Item Notes
 * <[tag]:[rate]> Sets skills and items that do not affect the counter.
 * [tag]:Tag name entered as counterattack (reflection) invalid tag.
 * [rate]:Rate of invalidation.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 6/23/2023 Ver.1.0.0
 * first edition.
 * 
 * @param CounterData
 * @desc Set the counter.
 * @text Counter setting
 * @type struct<CounterList>[]
 * @default 
 * 
 */
/*~struct~CounterList:
 * 
 * @param CounterName
 * @desc Counter name.
 * @text Counter name.
 * @type string
 * @default
 * 
 * @param CounterTrigger
 * @desc Counter trigger.
 * @text Counter trigger
 * @type select[]
 * @option Always
 * @value 'Always'
 * @option Skill
 * @value 'Physical'
 * @option Magic
 * @value 'Magical'
 * @option Sure hit
 * @value 'Certain'
 * @option Use item
 * @value 'Item'
 * @default ["'Physical'"]
 * 
 * @param CounterSkills
 * @desc Set a skill that performs a counter. (Multiple settings possible)
 * @text Counter skill
 * @type struct<CounterSkillList>[]
 * @default 
 * 
 * @param CounterRate
 * @text Counter activation rate
 * @desc Counter activation rate.
 * @type number
 * @default 100
 * @min 0
 * 
 * @param CounterAnimation
 * @text Animation when the counter is activated
 * @desc Animation when the counter is activated.
 * @type animation
 * @default 0
 * 
 * @param CounterMessage
 * @text Message when counter is activated
 * @desc Message when counter is activated.
 * @type string
 * @default 
 * 
 * @param CondCounterSetting
 * @text Counter activation condition
 * @desc Set the counter activation conditions. If not set, the return value will be true.
 * @type struct<CounterCondBase>
 * @default 
 * 
 * @param CounterType
 * @desc Counter action.
 * @text Counter action.
 * @type select
 * @option Counterattack
 * @value 'Counter'
 * @option Reflection
 * @value 'Reflection'
 * @option Full reflection
 * @value 'ReflectionFullAction'
 * @default 'Counter'
 * 
 * @param CounterTiming
 * @desc Counter activation timing.
 * @text Activation timing
 * @type select
 * @option Per target
 * @value 'EndTarget'
 * @option After action
 * @value 'EndAction'
 * @default 'EndTarget'
 * 
 * @param CounterActionMode
 * @desc The counterattack (reflection) pattern of the counter.
 * @text Counter counterattack (reflection) pattern
 * @type select
 * @option Nullifies damage and counterattacks (reflection)
 * @value 'NotDamege'
 * @option Counterattack (reflection) after target attack
 * @value 'Action'
 * @option Counterattack after damage (reflection)
 * @value 'Damege'
 * @option Counterattack (reflection) when the attack misses
 * @value 'Miss'
 * @default 'NotDamege'
 * 
 * @param CounterSkillCost
 * @desc Enable skill cost.
 * @text Effective skill cost
 * @type boolean
 * @default false
 * 
 * @param NotRestriction
 * @desc It will counterattack (reflect) even when movement is restricted.
 * @text Action restriction invalid
 * @type boolean
 * @default false
 * 
 * @param ActionCancelCounter
 * @desc After counterattacking (reflecting), the action after that ends.
 * @text Action Cancellation
 * @type boolean
 * @default false
 * 
 * @param CounterSe
 * @text Plays counterattack (reflection) SE.
 * @desc SE playback
 * @type struct<CounterSe>
 * @dir audio/me
 * 
 * @param CounterEraseState
 * @desc Erases the specified state when counterattacking (reflecting).
 * @text Counterattack (reflection) state erase
 * @type state
 * @default 0
 * 
 * @param NoCounterTag
 * @desc Enter a tag to disable this counterattack (reflection).
 * @text Counterattack (reflection) invalid tag
 * @type string
 * @default 
 * 
 */
/*~struct~CounterSkillList:
 * 
 * @param CounterSkill
 * @desc Specifies the skill that counters when counterattacking.
 * @text Skill
 * @type skill
 * @default
 * 
 * @param CondCounter
 * @desc Enter the trigger condition with javascript. a: Actor game data
 * @text Trigger condition evaluation formula
 * @type combo
 * @option "a.actor()"
 * @option "$gameVariables.value(0);//game variable"
 * @option "$gameSwitches.value(0);//game switch"
 * @default 
 * 
 */
/*~struct~CounterCondBase:
 * 
 * @param SubjectCond
 * @desc A condition ID that is triggered when the attacking battler meets the specified ID conditions.
 * @text Attack Battler Condition ID.
 * @type string
 * @default
 * 
 * @param TargetCond
 * @desc A condition ID that is activated when the attacked battler meets the specified ID conditions.
 * @text Attacked battler condition ID.
 * @type string
 * @default
 * 
 * @param PartyCond
 * @desc A condition ID that is triggered when a party member meets the specified ID conditions.
 * @text Party member condition ID.
 * @type string
 * @default
 * 
 * @param TroopCond
 * @desc A condition ID that is triggered when a member of the enemy group meets the specified ID conditions.
 * @text Enemy group condition ID.
 * @type string
 * @default
 * 
 * @param CounterEXCondMode
 * @desc Conditional mode. ON: All match　OFF: Partial match
 * @text Conditional mode
 * @type boolean
 * @default false
 * 
 */
/*~struct~CounterSe:
 * 
 * @param name
 * @text SE File
 * @desc Specify SE.
 * @type file
 * @dir audio/se
 * 
 * @param volume
 * @text SE volume
 * @desc Set the volume to SE.
 * @default 90
 * @min 0
 * 
 * @param pitch
 * @text SE pitch
 * @desc Sets the pitch to SE.
 * @default 100
 * 
 * @param pan
 * @text Phase of SE
 * @desc Set the phase to SE.
 * @default 0
 * @max 100
 * @min -100
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc カウンター拡張
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * カウンターを拡張します。
 * 
 * カウンター発動トリガー
 * 常時:条件が一致したときに攻撃時の対象ではなくても反撃(反射)が可能です。
 * 特技：特技の時に反撃(反射)をします。
 * 魔法：魔法の時に反撃(反射)をします。
 * 必中：必中の時に反撃(反射)をします。
 * アイテム：アイテム使用時に反撃(反射)をします。
 * ※常時を指定してない場合は攻撃された対象のみ反撃対象になります。
 * アイテムを使用したときに反撃する場合は常時とアイテムを両方設定してください。
 * 
 * カウンタースキル
 * 複数指定の場合は条件に一致したスキルからランダムに一つ発動します。
 * 
 * カウンター行動
 * 反撃：攻撃を受けた時に指定のスキルで反撃します。なし指定の場合は通常攻撃で反撃します。
 * 反射：攻撃を受けた時に受けたスキルで発動者に対し反射します。
 * フル反射：攻撃を受けた時に受けたスキルで反射します。全体攻撃で受けた場合は相手に全体攻撃を与えます。
 * 
 * 発動タイミング
 * ターゲット毎：ターゲットにヒットした毎に反撃(反射)します。
 * アクション終了後：アクションが終わった時に反撃します。
 * 
 * カウンター発動条件
 * この機能を使うにはNUUN_ConditionsBase(Ver.1.2.0以降)が必要です。
 * プラグインパラメータのカウンター発動条件から設定します。
 * NUUN_ConditionsBaseのプラグインパラメータのリストIDを指定します。複数指定の場合は,で区切ります。
 * 
 * 反撃(反射)の設定
 * 特徴を有するメモ欄
 * <CounterEX:[id]>　カウンターを設定します。
 * [id]:カウンター設定のリストIDまたはカウンター名
 * 
 * 反撃(反射)無効タグ
 * スキル、アイテムのメモ欄
 * <[tag]:[rate]>　カウンターに影響しないスキル、アイテムを設定します。
 * [tag]:反撃(反射)無効タグで記入したタグ名。
 * [rate]:無効化する確率。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/6/23 Ver.1.0.0
 * 初版
 * 
 * @param CounterData
 * @desc カウンターの設定をします。
 * @text カウンター設定
 * @type struct<CounterList>[]
 * @default 
 * 
 */
/*~struct~CounterList:ja
 * 
 * @param CounterName
 * @desc カウンター名。
 * @text カウンター名
 * @type string
 * @default
 * 
 * @param CounterTrigger
 * @desc カウンター発動トリガー。
 * @text カウンター発動トリガー
 * @type select[]
 * @option 常時
 * @value 'Always'
 * @option 特技
 * @value 'Physical'
 * @option 魔法
 * @value 'Magical'
 * @option 必中
 * @value 'Certain'
 * @option アイテム使用
 * @value 'Item'
 * @default ["'Physical'"]
 * 
 * @param CounterSkills
 * @desc カウンターを行うスキルを設定します。(複数設定可能)
 * @text カウンタースキル
 * @type struct<CounterSkillList>[]
 * @default 
 * 
 * @param CounterRate
 * @text カウンター発動率
 * @desc カウンター発動率。0で反撃率(魔法反射率)
 * @type number
 * @default 100
 * @min 0
 * 
 * @param CounterAnimation
 * @text カウンター発動時アニメーション
 * @desc カウンター発動時のアニメーション
 * @type animation
 * @default 0
 * 
 * @param CounterMessage
 * @text カウンター発動時メッセージ
 * @desc カウンター発動時のメッセージ
 * @type string
 * @default 
 * 
 * @param CondCounterSetting
 * @text カウンター発動条件
 * @desc カウンター発動条件を設定します。未設定の場合は戻り値がtrueになります。
 * @type struct<CounterCondBase>
 * @default 
 * 
 * @param CounterType
 * @desc カウンターの行動。
 * @text カウンター行動
 * @type select
 * @option 反撃
 * @value 'Counter'
 * @option 反射
 * @value 'Reflection'
 * @option フル反射
 * @value 'ReflectionFullAction'
 * @default 'Counter'
 * 
 * @param CounterTiming
 * @desc カウンターの発動タイミング。
 * @text 発動タイミング
 * @type select
 * @option ターゲット毎
 * @value 'EndTarget'
 * @option アクション終了後
 * @value 'EndAction'
 * @default 'EndTarget'
 * 
 * @param CounterActionMode
 * @desc カウンターの反撃(反射)パターン。
 * @text カウンター反撃(反射)パターン
 * @type select
 * @option ダメージを無効にして反撃(反射)
 * @value 'NotDamege'
 * @option 対象攻撃後に反撃(反射)
 * @value 'Action'
 * @option ダメージ後に反撃(反射)
 * @value 'Damege'
 * @option 攻撃が外れた時に反撃(反射)
 * @value 'Miss'
 * @default 'NotDamege'
 * 
 * @param CounterSkillCost
 * @desc スキルコストを有効にします。
 * @text スキルコスト有効
 * @type boolean
 * @default false
 * 
 * @param NotRestriction
 * @desc 行動制限時でも反撃(反射)します。
 * @text 行動制限無効
 * @type boolean
 * @default false
 * 
 * @param ActionCancelCounter
 * @desc 反撃(反射)したらそれ以降の行動を終了します。
 * @text 行動打消し
 * @type boolean
 * @default false
 * 
 * @param CounterSe
 * @text 反撃(反射)のSEを再生します。
 * @desc SE再生
 * @type struct<CounterSe>
 * @dir audio/me
 * 
 * @param CounterEraseState
 * @desc 反撃(反射)成功時に指定のステートを消去します。
 * @text 反撃(反射)時ステート消去
 * @type state
 * @default 0
 * 
 * @param NoCounterTag
 * @desc この反撃(反射)を無効にするタグを記入します。
 * @text 反撃(反射)無効タグ
 * @type string
 * @default 
 * 
 */
/*~struct~CounterSkillList:ja
 * 
 * @param CounterSkill
 * @desc 反撃時にカウンターを行うスキルを指定します。
 * @text スキル
 * @type skill
 * @default
 * 
 * @param CondCounter
 * @desc 発動条件をjavascriptで記入します。a:アクターゲームデータ
 * @text 発動条件評価式
 * @type combo
 * @option "a.actor()"
 * @option "$gameVariables.value(0);//ゲーム変数"
 * @option "$gameSwitches.value(0);//スイッチ"
 * @default 
 * 
 */
/*~struct~CounterCondBase:ja
 * 
 * @param SubjectCond
 * @desc 攻撃したバトラーが指定したIDの条件を満たしたときに発動する条件ID。
 * @text 攻撃バトラー条件ID。
 * @type string
 * @default
 * 
 * @param TargetCond
 * @desc 攻撃を受けたバトラーが指定したIDの条件を満たしたときに発動する条件ID。
 * @text 被攻撃バトラー条件ID。
 * @type string
 * @default
 * 
 * @param PartyCond
 * @desc パーティメンバーが指定したIDの条件を満たしたときに発動する条件ID。
 * @text パーティメンバー条件ID。
 * @type string
 * @default
 * 
 * @param TroopCond
 * @desc 敵グループのメンバーが指定したIDの条件を満たしたときに発動する条件ID。
 * @text 敵グループ条件ID。
 * @type string
 * @default
 * 
 * @param CounterEXCondMode
 * @desc 条件モード。ON:全て一致　OFF:一部一致
 * @text 条件モード
 * @type boolean
 * @default false
 * 
 */
/*~struct~CounterSe:ja
 * 
 * @param name
 * @text SEファイル
 * @desc SEを指定します。
 * @type file
 * @dir audio/se
 * 
 * @param volume
 * @text SEの音量
 * @desc SEを音量を設定します。
 * @default 90
 * @min 0
 * 
 * @param pitch
 * @text SEのピッチ
 * @desc SEをピッチを設定します。
 * @default 100
 * 
 * @param pan
 * @text SEの位相
 * @desc SEを位相を設定します。
 * @default 0
 * @max 100
 * @min -100
 * 
 */

var Imported = Imported || {};
Imported.NUUN_CounterEX = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_CounterEX');
    const CounterData = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['CounterData'])) : [];

    class CounterActionEX {
        constructor(subject) {
            this._subject = subject;
        }

        setup(counter) {
            this._counter = counter;
        }

        getCounterSkills() {
            return this._counter.CounterSkills;
        }

        getDamageCancelCounter() {
            return this._counter.DamageCancelCounter;
        }

        isNotRestriction() {
            return this._counter.NotRestriction ? true : this._subject.canMove();
        };

        getCounterActionMode() {
            return this._counter.CounterActionMode;
        }

        getCondCounterSetting() {
            return this._counter.CondCounterSetting;
        }

        isCounterActionNoDamege() {
            return this.getCounterActionMode() === 'NotDamege';
        }

        isAfterCounter() {
            return this.getCounterActionMode() === 'Action';
        }

        isCounterActionOnDamege() {
            return this.getCounterActionMode() === 'Damege';
        }

        isCounterActionMiss() {
            return this.getCounterActionMode() === 'Miss';
        }

        isCounterTimingEndAction() {
            return this._counter.CounterTiming === 'EndAction';
        }

        getAttackedSkill() {
            return this._counter.AttackedSkill;
        }

        isCounterSubject() {
            return this._counter.CounterTarget === 'Subject';
        }

        isCounterTypeReflection() {
            return this._counter.CounterType === 'Reflection';
        }

        isCounterTypeReflectionFullAction() {
            return this._counter.CounterType === 'ReflectionFullAction';
        }

        isCounterReflection() {
            return this._counter.CounterType === 'ReflectionFullAction' || this._counter.CounterType === 'Reflection';
        }

        getCounterTarget() {
            return this._counter.CounterTarget;
        }

        isCounterSkillCost() {
            return this._counter.CounterSkillCost;
        }

        getCounterAnimation() {
            return this._counter.CounterAnimation;
        }

        getCounterSe() {
            return this._counter.CounterSe;
        }

        getCounterEraseState() {
            return this._counter.CounterEraseState;
        }

        getSubject() {
            return this._subject;
        }
    };

    class Game_CounterAction extends Game_Action {
        constructor(subject) {
            super(subject, false);
            this._reflectionSubject = null;
            this._isCounterEx = false;
        }

        setup(counter) {
            this._counterEx = counter;
            this._isCounterEx = true;
        }

        getCounterData() {
            return this._counterEx;
        }

        isCounterSkill() {
            return this._isCounterEx;
        }

        setReflection(subject) {
            this._reflectionSubject = subject;
        }

        getReflectionSubject() {
            return this._reflectionSubject;
        }
    };

    const _BattleManager_initMembers = BattleManager.initMembers;
    BattleManager.initMembers = function() {
        _BattleManager_initMembers.call(this);
        this._reflectionAction = false;
        this._counterBattlerList = [];
    };

    const _BattleManager_updateAction = BattleManager.updateAction;
    BattleManager.updateAction = function() {
        const counterSubject = this.setupCounterAction();
        if (!!counterSubject) {
            this._subject = counterSubject;
            counterSubject.onStartCounter = true;
            this.startAction(counterSubject);
            counterSubject.removeCounterAction();
        } else {
            _BattleManager_updateAction.call(this);
        }
    };

    const _BattleManager_endAction = BattleManager.endAction;
    BattleManager.endAction = function() {
        _BattleManager_endAction.call(this);
        const counterSubject =  this.setupCounterActionEnd();
        if (!!counterSubject) {
            this._subject = counterSubject;
            counterSubject.onStartCounter = true;
            this.startAction(counterSubject);
            counterSubject.removeCounterAction();
        }
    };

    BattleManager.setupCounterAction = function() {
        if (this._action.isCounterSkill() && !!this._targets[0]) {
            return null;
        }
        for (let i = 0; i < this._counterBattlerList.length; i++) {
            const action = this._counterBattlerList[i].currentCounterAction().getCounterData();
            if (!action.isCounterTimingEndAction()) {
                const battler = this._counterBattlerList.splice(i, 1)[0];
                if (!battler) {
                    return null;
                }
                if (battler.isBattleMember() && battler.isAlive()) {
                    return battler;
                }
            }
        }
        if (this._action.isCounterSkill() && !this._targets[0] && this._counterEvacuationAction) {
            this._subject = this._counterEvacuationSubject;
            this._targets = this._counterEvacuationTargets;
            this._action = this._counterEvacuationAction;
            this._counterEvacuationSubject = null;
            this._counterEvacuationTargets = null;
            this._counterEvacuationAction = null;
        }
        return null;
    };

    BattleManager.setupCounterActionEnd = function() {
        for (let i = 0; i < this._counterBattlerList.length; i++) {
            const action = this._counterBattlerList[i].currentCounterAction().getCounterData();
            if (action.isCounterTimingEndAction()) {
                const battler = this._counterBattlerList.splice(i, 1)[0];
                if (!battler) {
                    return null;
                }
                if (battler.isBattleMember() && battler.isAlive()) {
                    return battler;
                }
            }
        }
        return null;
    };

    const _BattleManager_startAction = BattleManager.startAction;
    BattleManager.startAction = function() {
        const subject = this._subject;
        const action = subject.currentAction();
        if (action.isCounterSkill()) {
            const targets = action.makeTargets();
            const counter = action.getCounterData();
            this._action = action;
            this._targets = targets;
            this._phase = "action";;
            subject.cancelMotionRefresh();
            if (counter.isCounterSkillCost()) {
                subject.useItem(action.item());
            }
            if (!!action.getReflectionSubject()) {
                action.setSubject(action.getReflectionSubject());
            }
            action.applyGlobal();
            if (counter.isCounterSubject()) {
                this._logWindow.displayCounterEx(subject, counter);
            } else {
                this._logWindow.displayReflectionEx(subject, counter);
            }
            this._logWindow.counter = counter;
            this._logWindow.startAction(subject, action, targets);
            subject.onStartCounter = false;
        } else {
            _BattleManager_startAction.call(this);
        }
    };
    
    const _BattleManager_invokeNormalAction = BattleManager.invokeNormalAction;
    BattleManager.invokeNormalAction = function(subject, target) {
        if (this._action.isCounterSkill()) {
            _BattleManager_invokeNormalAction.call(this, subject, target);
            const counter = this._action.getCounterData();
            if (counter.getCounterEraseState() > 0) {
                subject.removeState(counter.getCounterEraseState());
            }
            return;
        }
        this.condCounterActions(subject, target, 0);
        if (!this.isMembersCounterAction() && !this._reflectionAction) {
            _BattleManager_invokeNormalAction.call(this, subject, target);
        }
        this.condCounterActions(subject, target, 1);
        this.setCounterAction();
    };

    BattleManager.isMembersCounterAction = function() {
        return this._counterBattlerList.some(member => {
            const action = member.currentCounterAction();
            return action.getCounterData().isCounterActionNoDamege();
        });
    };

    const _BattleManager_invokeCounterAttack = BattleManager.invokeCounterAttack;
    BattleManager.invokeCounterAttack = function(subject, target) {
        if (this._action.isCounterSkill()) {
            _BattleManager_invokeNormalAction.call(this, subject, target);
        } else {
            _BattleManager_invokeCounterAttack.call(this, subject, target);
        }
    };
    
    const _BattleManager_invokeMagicReflection = BattleManager.invokeMagicReflection;
    BattleManager.invokeMagicReflection = function(subject, target) {
        if (this._action.isCounterSkill()) {
            _BattleManager_invokeNormalAction.call(this, subject, target);
        } else {
            _BattleManager_invokeMagicReflection.call(this, subject, target);
        }
    };

    BattleManager.condCounterAction = function(subject, battler, target, mode) {
        battler.traitObjects().some(trait => {
            const counterData = getCounterdata(trait);
            if (!!counterData && !noCounterTagItem(this._action, counterData) && this.isCounterActionMode(target, counterData, mode)) {
                if (battler === target) {
                    this.setCounterTriggers(battler, trait, subject, counterData);
                } else if (isCounterAlwaysTrigger(counterData)) {
                    this.setCounterTriggers(battler, trait, subject, counterData);
                }
            }
        });
    };

    BattleManager.isCounterActionMode = function(target, counter, mode) {
        if (mode === 0) {
            return counter.CounterActionMode === 'NotDamege';
        } else if (mode === 1) {
            switch (counter.CounterActionMode) {
                case 'Action':
                    return true;
                case 'Damege':
                    return target.result().isHit();
                case 'Miss':
                    return !target.result().isHit();
            }
            return false;
        }
    };

    BattleManager.setCounterTriggers = function(target, trait, subject, counter) {
        return counter.CounterTrigger.some(trigger => this.setCounterTrigger(target, trait, subject, counter, trigger));
    };

    BattleManager.setCounterTrigger = function(target, trait, subject, counter, trigger) {
        if (trigger === 'Physical' && Math.random() < this._action.itemCntEx(target, counter)) {
            if (this.isCounterAction(target, trait, subject, counter)) {
                this._counterBattlerList.push(target);
                return;
            };
        } else if (trigger === 'Magical' && Math.random() < this._action.itemMrfEx(target, counter)) {
            if (this.isCounterAction(target, trait, subject, counter)) {
                this._counterBattlerList.push(target);
                return;
            };
        } else if (trigger === 'Magical' && Math.random() < this._action.itemCertainEx(target, counter)) {
            if (this.isCounterAction(target, trait, subject, counter)) {
                this._counterBattlerList.push(target);
                return;
            };
        } else if (trigger === 'Item' && Math.random() < this._action.itemUseItemEx(target, counter)) {
            if (this.isCounterAction(target, trait, subject, counter)) {
                this._counterBattlerList.push(target);
                return;
            };
        }
    };

    BattleManager.isCounterAction = function(target, trait, subject, counter) {
        if (getCondCounter(counter, target, trait, subject, this._action)) {
            const counterData = new CounterActionEX(target);
            counterData.setup(counter);
            if (counterData.isCounterTypeReflection()) {
                this.invokeMagicReflection(subject, target);
                this._reflectionAction = true;
                return true;
            } else if (counterData.isCounterTypeReflectionFullAction()) {
                target.setupCounterReflectionAction(counterData, subject, this._action.item().id);
                this._reflectionAction = true;
                return target.currentCounterAction();
            } else {
                target.setupCounterAction(counterData, subject);
                return target.currentCounterAction();
            }
        }
        return false;
    };

    BattleManager.setCounterAction = function() {
        this._reflectionAction = false;
        const cancelCounter = this._counterBattlerList.some(battler => {
            const action = battler.currentCounterAction();
            const counter = action.getCounterData();
            return counter.getDamageCancelCounter();
        });
        if (cancelCounter) {
            this._targets = [];
        } else {
            this._counterEvacuationSubject = this._subject;
            this._counterEvacuationTargets = this._targets;
            this._counterEvacuationAction = this._action;      
        }
        this._reflectionAction = false;    
    };

    BattleManager.condCounterActions = function(subject, target, mode) {
        for (const member of this.allBattleMembers()) {
            this.condCounterAction(subject, member, target, mode);
        }
    };


    Game_Battler.prototype.setupCounterAction = function(counter, subject) {
        this.initCounterAction();
        const skill = this.makeCounterAction(counter);
        if (skill >= 0) {
            const action = new Game_CounterAction(this);
            action.setup(counter);
            action.setTarget(subject.index());
            action.setSkill(skill);
            this._counterActions.push(action);
        }
    };

    Game_Battler.prototype.setupCounterReflectionAction = function(counter, subject, skillId) {
        this.initCounterAction();
        if (skillId >= 0) {
            const action = new Game_CounterAction(this);
            action.setup(counter);
            if (skillId === 0) {
                action.setAttack();
            } else {
                action.setSkill(skillId);
            }
            action.setTarget(subject.index());
            action.setReflection(subject);
            this._counterActions.push(action);
        }
    };

    Game_Battler.prototype.makeCounterAction = function(counter) {
        const a = this;
        const list = counter.getCounterSkills().filter(skill => (skill.CondCounter ? eval(skill.CondCounter) : true));
        const id = Math.floor(Math.random() * list.length);
        return list[id].CounterSkill;
    };

    Game_Battler.prototype.initCounterAction = function() {
        if (!this._counterActions) {
            this._counterActions = [];
        }
    };

    Game_Battler.prototype.currentCounterAction = function() {
        return this._counterActions ? this._counterActions[0] : null;
    };

    Game_Battler.prototype.removeCounterAction = function() {
        this._counterActions.shift();
    };

    const _Game_Battler_currentAction = Game_Battler.prototype.currentAction;
    Game_Battler.prototype.currentAction = function() {
        if (this.currentCounterAction() && this.onStartCounter) {
            return this.currentCounterAction();
        }
        return _Game_Battler_currentAction.call(this);
    };


    Game_Action.prototype.itemCntEx = function(target, counterData) {
        if (this.isPhysical() && isNotRestriction(target, counterData)) {
            return counterData.CounterRate > 0 ? counterData.CounterRate / 100 : target.cnt;
        } else {
            return 0;
        }
    };

    Game_Action.prototype.itemMrfEx = function(target, counterData) {
        if (this.isMagical() && isNotRestriction(target, counterData)) {
            return counterData.CounterRate > 0 ? counterData.CounterRate / 100 : target.mrf;
        } else {
            return 0;
        }
    };

    Game_Action.prototype.itemCertainEx = function(target, counterData) {
        if (this.isCertainHit() && isNotRestriction(target, counterData)) {
            return counterData.CounterRate > 0 ? counterData.CounterRate / 100 : target.cnt;
        } else {
            return 0;
        }
    };

    Game_Action.prototype.itemUseItemEx = function(target, counterData) {
        if (this.isItem() && isNotRestriction(target, counterData)) {
            return counterData.CounterRate > 0 ? counterData.CounterRate / 100 : target.cnt;
        } else {
            return 0;
        }
    };

    Game_Action.prototype.getCounterData = function() {
        return false;
    };

    Game_Action.prototype.isCounterSkill = function() {
        return false;
    };


    Window_BattleLog.prototype.displayCounterEx = function(subject, counter) {
        if (counter.getCounterAnimation() > 0) {
            this.push("showCounterAnimation", subject, counter.getCounterAnimation());
            this.push("wait");
        }
        if (counter.getCounterSe()) {
            this.push("performCounterEx", counter.getCounterSe());
        }
        if (counter.CounterMessage) {
            this.push("addText", counter.CounterMessage.format(subject.name()));
        }
    };
    
    Window_BattleLog.prototype.displayReflectionEx = function(subject, counter) {
        if (counter.getCounterAnimation() > 0) {
            this.push("showCounterAnimation", subject, counter.getCounterAnimation());
            this.push("wait");
        }
        if (counter.getCounterSe()) {
            this.push("performCounterEx", counter.getCounterSe());
        }
        if (counter.CounterMessage) {
            this.push("addText", counter.CounterMessage.format(subject.name()));
        }
    };

    Window_BattleLog.prototype.showCounterAnimation = function(subject, animetionId) {
        this.showNormalAnimation([subject], animetionId, true);
    };

    Window_BattleLog.prototype.performCounterEx = function(se) {
        AudioManager.playSe(se);
    };

    const _Window_BattleLog_displayAction = Window_BattleLog.prototype.displayAction;
    Window_BattleLog.prototype.displayAction = function(subject, item) {
        if (this.counter) {
            if (this.counter.isCounterReflection()) {
                this.counter = null;
                this.push("wait");
                return;
            }
            this.counter = null;
        }
        _Window_BattleLog_displayAction.call(this, subject, item);
    };

    function getCounterdata(trait) {
        const data = trait.meta.CounterEX;
        if (!data) {
            return null;
        } else if (isNaN(data)) {
            return CounterData[getCounterNameIndex(data)];
        } else {
            return CounterData[Number(trait.meta.CounterEX) - 1];
        }
    };

    function getCounterNameIndex(name) {
        return CounterData.findIndex(data => data.CounterName === name);
    };

    function isCounterAlwaysTrigger(counter) {
        return counter.CounterTrigger.some(trigger => trigger === 'Always');
    };

    function getCondCounter(counter, target, trait, subject, action) {
        try {
            const cond = counter.CondCounterSetting;
        if (cond) {
            const mode = cond.CounterEXCondMode ? 1 : 0;
            return target.getTriggerConditionsParams(trait, subject, cond, action, $gameTemp.actionData.damage, mode);
        } else {
            return true;
        }    
        } catch (error) {
            return true;
        }
    };

    function noCounterTagItem(action, counter) {
        if (!action || !counter) {
            return true;
        }
        const item = action.item();
        if (!item) {
            return true;
        }
        return Number(item.meta[counter.NoCounterTag]) > Math.random() * 100;
    };

    function isNotRestriction(target, counterData) {
        return counterData.NotRestriction ? true : target.canMove();
    };


})();