/*:-----------------------------------------------------------------------------------
 * NUUN_SkillLearning.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Skill learning
 * @author NUUN
 * @version 1.1.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * You can learn skills used by your opponent.
 * 
 * This plug-in is compatible with "NUUN_Base" version 1.6.1 or later.
 * 
 * 
 * Learned when receiving or using a skill
 * Skill notes
 * <SkillLearning:[rate], [skill], [mode]> If it is a skill that can be learned when attacked, the skill will be learned with a probability.
 * Only battlers with the ability to learn skills will learn.
 * [rate]:Probability of learning (percentage)
 * [skill]:Acquisition skill 0: Acquire activation skill. 1 or more: Specified skill
 * [mode]:learning target 0: friend or foe 1: friend only 2: enemy only
 * Example: <SkillLearning:80, 0, 0> 80% chance to learn attack skills when attacked.
 * <SkillLearning:100, 52, 1> When attacked, 100% chance to learn Skill ID 52 if the learner is an ally.
 * 
 * <WatchingSkillLearning:[rate], [skill], [mode]> If the skill can be learned when the opponent uses the skill, the skill will be learned with probability.
 * Only battlers with the ability to learn skills will learn.
 * [rate]:Probability of learning (percentage)
 * [skill]:Acquisition skill 0: Acquire activation skill. 1 or more: Specified skill
 * [mode]:learning target 0: friend or foe 1: friend only 2: enemy only
 * 
 * Notes with features (including enemy)
 * Create a feature that learns a skill.
 * <SkillLearningAbility>
 * Learn skills if they can be learned when attacked.
 * <WatchingSkillLearningAbility>
 * If the skill can be learned when the opponent uses the skill, the skill will be learned.
 * 
 * 
 * Learn target skill when attacking
 * 
 * Skill notes
 * <AttackSkillLearning:[rate], [skill], [mode]> Learn target skill when attacking.
 * Only skills with the following tag (OnAttackSkillLearning) can be learned.
 * [rate]:Probability of learning (percentage))
 * [skill]:Learned skill　0: All skills 1: 1 random skill from all skills.
 * [mode]:learning mode 0: Hit 1: Defeat
 * 
 * <OnAttackSkillLearning:[mode]> Sets the skill that can be learned when attacking.
 * [mode]:learning target 0: friend or foe 1: friend only 2: enemy only
 * 
 * Common setting
 * 
 * Set skill acquisition correction probability
 * Notes with features
 * <SkillLearningCorrection:[rorrection]> Sets the skill acquisition correction probability.
 * [rorrection]:± Correction rate
 * 
 * The rating of all skills learned by the enemy is set at 5.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 12/25/2022 Ver.1.1.0
 * Added a function that allows you to learn the target skill when attacking.
 * 12/18/2022 Ver.1.0.2
 * Added a function to play SE when acquiring skills.
 * 12/17/2022 Ver.1.0.1
 * Added definitions by applying learning skills to enemy "use skills" in the enemy book.
 * 12/17/2022 Ver.1.0.0
 * First edition.
 * 
 * @param SkillLearningText
 * @desc Text when skill is acquired %1: Learner %2: Skill name
 * @text skill learning text
 * @type string
 * @default %1 learned %2!
 * 
 * @param SkillLearningSe
 * @text SE when learned
 * @desc Specify the SE at the time of acquisition.
 * @type struct<SkillLearningSE>
 * @default {"name":"","volume":"90","pitch":"100","pan":"0"}
 * 
 */
/*~struct~SkillLearningSE:
 * 
 * @param name
 * @text SE file
 * @desc Specify SE.
 * @type file
 * @dir audio/se
 * 
 * @param volume
 * @text SE volume
 * @desc Set the SE volume.
 * @default 90
 * @min 0
 * 
 * @param pitch
 * @text SE Pitch
 * @desc Sets the pitch of SE.
 * @default 100
 * 
 * @param pan
 * @text SE pan
 * @desc Set the pan to SE.
 * @default 0
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc スキルラーニング
 * @author NUUN
 * @version 1.1.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * 相手の使用するスキルを習得することができます。
 * 
 * このプラグインはNUUN_Baseプラグインのバージョンが1.6.1以降での対応です。
 * 
 * スキルを受けた時または使用したときに習得
 * 
 * スキルのメモ欄
 * <SkillLearning:[rate], [skill], [mode]> 攻撃を受けた時に習得可能スキルならスキルを確率で習得します。
 * スキルを習得する特徴があるバトラーのみ習得します。
 * [rate]:習得確率(百分率)
 * [skill]:習得スキル　0:発動スキルを習得します。 １以上:指定のスキル
 * [mode]:習得対象 0:敵味方　1:味方のみ　2:敵のみ
 * 例:<SkillLearning:80, 0, 0> 攻撃を受けた時80%の確率で攻撃スキルを習得します。
 * <SkillLearning:100, 52, 1> 攻撃を受けた時100%の確率で習得者が味方ならスキルID52番のスキルを習得します。
 * 
 * <WatchingSkillLearning:[rate], [skill], [mode]> 相手がスキルを使用した時に習得可能スキルならスキルを確率で習得します。
 * スキルを習得する特徴があるバトラーのみ習得します。
 * [rate]:習得確率(百分率)
 * [skill]:習得スキル　0で発動スキルを習得します。 １以上:指定のスキル
 * [mode]:習得対象 0:敵味方　1:味方のみ　2:敵のみ
 * 
 * 特徴を持つメモ欄(敵キャラを含む)
 * スキルを習得する特徴を作る。
 * <SkillLearningAbility>
 * 攻撃を受けたときに習得可能スキルならスキルを習得します。
 * <WatchingSkillLearningAbility>
 * 相手がスキルを使用したときに習得可能スキルならスキルを習得します。
 * 
 * 
 * 攻撃をしたときに対象のスキルを習得
 * 
 * スキルのメモ欄
 * <AttackSkillLearning:[rate], [skill], [mode]> 攻撃を与えた時に対象のスキルを習得します。
 * 下記のタグ(OnAttackSkillLearning)があるスキルのみ習得出来ます。
 * [rate]:習得確率(百分率)
 * [skill]:習得スキル　0:全てのスキル 1:全てのスキルから１つランダム。
 * [mode]:習得モード 0:ヒット　1:撃破
 * 
 * <OnAttackSkillLearning:[mode]> 攻撃時に習得可能にするスキルを設定します。
 * [mode]:習得対象 0:敵味方　1:味方のみ　2:敵のみ
 * 
 * 共通設定
 * 
 * スキル習得補正確率を設定
 * 特徴を持つメモ欄
 * <SkillLearningCorrection:[rorrection]> スキル習得補正確率を設定します。
 * [rorrection]:±補正率
 * 
 * 敵が習得したスキルのレーティングは全て5で設定されます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/12/25 Ver.1.1.0
 * 攻撃時に対象のスキルを習得できる機能を追加。
 * 2022/12/18 Ver.1.0.2
 * スキル習得時にSEを再生する機能を追加。
 * 2022/12/17 Ver.1.0.1
 * モンスター図鑑の敵の使用スキル適用による定義追加。
 * 2022/12/17 Ver.1.0.0
 * 初版
 * 
 * @param SkillLearningText
 * @desc スキル習得時のテキスト %1:習得者 %2:スキル名
 * @text スキル習得テキスト
 * @type string
 * @default %1は %2 を習得した！
 * 
 * @param SkillLearningSe
 * @text 習得時SE
 * @desc 習得時のSEを指定します。
 * @type struct<SkillLearningSE>
 * @default {"name":"","volume":"90","pitch":"100","pan":"0"}
 * 
 */
/*~struct~SkillLearningSE:ja
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
 * 
 */

var Imported = Imported || {};
Imported.NUUN_SkillLearning = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_SkillLearning');
    const SkillLearningText = String(parameters['SkillLearningText']);
    const SkillLearningSe = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['SkillLearningSe'])) : null;

    const _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
    Game_Action.prototype.applyItemUserEffect = function(target) {
        _Game_Action_applyItemUserEffect.call(this, target);
        this.skillLearning(target);
        this.watchingSkillLearning(target);
        this.attackSkillLearning(target);
    };

    Game_Action.prototype.skillLearning = function(target) {
        const skill = this.item();
        if (skill.meta.SkillLearning) {
            const members = this.subject().isEnemy() ? $gameParty.members() : $gameTroop.members();
            const data = skill.meta.SkillLearning.split(',').map(Number);
            const skillId = data[1] && data[1] > 0 ? data[1] : skill.id;
            if (data[2] && data[2] === 1 && this.subject().isActor()) {
                return;
            } else if (data[2] && data[2] === 2 && this.subject().isEnemy()) {
                return;
            }
            for (const battler of members) {
                if ((battler === target && battler.isSkillLearningAbility()) || battler.isWatchingSkillLearningAbility()) {
                    if (!this.isSkillLearningSkill(battler, skillId) && Math.random() < battler.skillLearningRate(data[0])) {
                        battler.skillLearning(skillId);
                        this.setSkillLearningLog(target, battler.name(), skill.name);
                    }
                }
            }
        }
    };

    Game_Action.prototype.watchingSkillLearning = function(target) {
        const skill = this.item();
        if (skill.meta.WatchingSkillLearning) {
            const members = this.subject().isEnemy() ? $gameParty.members() : $gameTroop.members();
            const data = skill.meta.WatchingSkillLearning.split(',').map(Number);
            const skillId = data[1] && data[1] > 0 ? data[1] : skill.id;
            if (data[2] && data[2] === 1 && this.subject().isActor()) {
                return;
            } else if (data[2] && data[2] === 2 && this.subject().isEnemy()) {
                return;
            }
            for (const battler of members) {
                if (battler.isAllSkillLearningAbility()) {
                    if (!this.isSkillLearningSkill(battler, skillId) && Math.random() < battler.skillLearningRate(data[0])) {
                        battler.skillLearning(skillId);
                        this.setSkillLearningLog(target, battler.name(), skill.name);
                    }
                }
            }
        }
    };

    Game_Action.prototype.attackSkillLearning = function(target) {
        const skill = this.item();
        if (skill.meta.AttackSkillLearning) {
            const data = skill.meta.AttackSkillLearning.split(',').map(Number);
            if (data[2] === 0) {
                this.setAttackSkillLearning(target, data);
            } else if (data[2] === 1 && target.isDead()) {
                this.setAttackSkillLearning(target, data);
            }
        }
    };

    Game_Action.prototype.setAttackSkillLearning = function(target, data) {
        const subject = this.subject();
        const skills = target.attackSkillLearningList().filter(skillId => !this.isSkillLearningSkill(subject, skillId) && this.isOnAttackSkillLearning($dataSkills[skillId], subject));
        if (skills.length > 0 && Math.random() < subject.skillLearningRate(data[0])) {
            if (data[1] === 0) {
                for (const id of skills) {
                    subject.skillLearning(id);
                    this.setSkillLearningLog(target, subject.name(), $dataSkills[id].name);
                }
            } else if (data[1] === 1) {
                const id = skills[Math.floor(Math.random() * skills.length)];
                subject.skillLearning(id);
                this.setSkillLearningLog(target, subject.name(), $dataSkills[id].name);
            }
            this.makeSuccess(target);
        }
    };

    Game_Action.prototype.isOnAttackSkillLearning = function(skill, subject) {
        if (skill.meta.OnAttackSkillLearning) {
            const mode = Number(skill.meta.OnAttackSkillLearning);
            if (mode === 1) {
                return subject.isActor();
            } else if (mode === 2) {
                return subject.isEnemy();
            } else {
                return true;
            }
        }
        return false;
    };

    Game_Action.prototype.isSkillLearningSkill = function(battler, skillId) {
        return battler.isActor() ? battler.isLearnedSkill(skillId) : battler.isEnemyLearningSkills(skillId);
    };

    Game_Action.prototype.setSkillLearningLog = function(target, name, skillName) {
        const result = target.result();
        result.isSkillLearning = true;
        result.learningSkill.push({skillName:skillName, name:name});
    };

    Game_Enemy.prototype.skillLearning = function(skillId) {
        this.pushEnemyLearningSkills(skillId)
    };

    Game_Actor.prototype.skillLearning = function(skillId) {
        this.learnSkill(skillId);
    };

    Game_Enemy.prototype.attackSkillLearningList = function() {
        return this.enemy().actions.map(action => action.skillId);
    };

    Game_Actor.prototype.attackSkillLearningList = function() {
        return this.skills();
    };
    
    Game_BattlerBase.prototype.skillLearningRate = function(rate) {
        return (rate + this.getSkillLearningCorrection()) / 100;
    };

    Game_BattlerBase.prototype.isSkillLearningAbility = function() {
        return this.traitObjects().some(trait => !!trait.meta.SkillLearningAbility);
    };

    Game_BattlerBase.prototype.isWatchingSkillLearningAbility = function() {
        return this.traitObjects().some(trait => !!trait.meta.WatchingSkillLearningAbility);
    };

    Game_BattlerBase.prototype.isAllSkillLearningAbility = function() {
        return this.traitObjects().some(trait => !!trait.meta.SkillLearningAbility || !!trait.meta.WatchingSkillLearningAbility);
    };

    Game_BattlerBase.prototype.getSkillLearningCorrection = function() {
        return this.traitObjects().reduce((r, trait) => {
            return r + (trait.meta.SkillLearningCorrection ? Number(trait.meta.SkillLearningCorrection) : 0);
        }, 0);
    };

    const _Game_Enemy_initMembers = Game_Enemy.prototype.initMembers;
    Game_Enemy.prototype.initMembers = function() {
        _Game_Enemy_initMembers.call(this);
        this._learningSkills = [];
    };

    Game_Enemy.prototype.isEnemyLearningSkills = function(skillId) {
        const actionList = this.enemy().actions;
        Array.prototype.push.apply(actionList, this._learningSkills);
        return actionList.some(action => action.skillId === skillId);
    };

    Game_Enemy.prototype.pushEnemyLearningSkills = function(skillId) {
        const actionData = {skillId: skillId, rating: 5, conditionType: 0, conditionParam1: 0, conditionParam2: 0};
        this._learningSkills.push(actionData);
    };

    const _Game_Enemy_selectAllActions = Game_Enemy.prototype.selectAllActions;
    Game_Enemy.prototype.selectAllActions = function(actionList) {
        Array.prototype.push.apply(actionList, this.learningSkillActionValid());
        _Game_Enemy_selectAllActions.call(this, actionList);
    };

    Game_Enemy.prototype.learningSkillActionValid = function() {
        return this._learningSkills.filter(a => this.isActionValid(a));
    };

    const _Game_Enemy_allSkillActions = Game_Enemy.prototype.allSkillActions;
    Game_Enemy.prototype.allSkillActions = function(actionList) {
        actionList = _Game_Enemy_allSkillActions.call(this, actionList);
        Array.prototype.push.apply(actionList, this._learningSkills);
        return actionList;
    };

    Game_Enemy.prototype.getLearningSkillActions = function(actionList) {
        Array.prototype.push.apply(actionList, this._learningSkills);
        return actionList;
    };

    const _Game_ActionResult_clear = Game_ActionResult.prototype.clear
    Game_ActionResult.prototype.clear = function() {
        _Game_ActionResult_clear.call(this);
        this.isSkillLearning = false;
        this.learningSkill = [];
    };

    Window_BattleLog.prototype.displaySkillLearning = function(target) {
        const result = target.result();
        if (result.isSkillLearning) {
            for (const skill of result.learningSkill) {
                this.push("addText", SkillLearningText.format(skill.name, skill.skillName));
            }
            this.playSkillLearningSe();
        }
    };

    const _Window_BattleLog_displayFailure = Window_BattleLog.prototype.displayFailure;
    Window_BattleLog.prototype.displayFailure = function(target) {
        _Window_BattleLog_displayFailure.call(this, target);
        this.displaySkillLearning(target);
    };

    Window_BattleLog.prototype.playSkillLearningSe = function() {
        if (SkillLearningSe && SkillLearningSe.name) {
            AudioManager.playSe(SkillLearningSe);
        }
    };
    
})();