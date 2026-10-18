/*:-----------------------------------------------------------------------------------
 * NUUN_SkillLearning.js
 * 
 * Copyright (C) 2022 NUUN
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Skill learning
 * @author NUUN
 * @version 1.2.0
 * 
 * @help
 * You can learn skills used by your opponent.
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
 * Primarily used for support and healing skills.
 * 
 * Notes for objects with traits
 * Create a trait that allows battlers to learn skills.
 * <SkillLearningAbility>
 * Allows battlers to learn skills when attacked.
 * If the used skill has the SkillLearning tag, battlers with this tag will learn the skill when its effect is applied to them.
 * If the used skill has the WatchingSkillLearning tag, battlers will learn the skill when they use it and its effect is applied.
 * 
 * <WatchingSkillLearningAbility>
 * Allows battlers to learn skills when an opponent uses them.
 * If the used skill has the SkillLearning or WatchingSkillLearning tag, battlers will learn the skill when they use it and its effect is applied.
 * 
 * The above tags can also be applied to enemies.
 * 
 * Learn target skill when attacking
 * Skill notes
 * <AttackSkillLearning:[rate], [skill], [mode]> When attacking, learns skills that have the "OnAttackSkillLearning[skillId]" tag.
 * By adding the "OnAttackSkillLearning" tag to a skill's note box, you can specify which battlers can learn that skill.
 * Only skills with the following tag (OnAttackSkillLearning) can be learned.
 * [rate]:Probability of learning (percentage))
 * [skill]:Learned skill　0: All skills 1: 1 random skill from all skills.
 * [mode]:learning mode 0: Hit 1: Defeat
 * 
 * <AttackSkillLearning:50, 0, 0>
 * When an attack hits, learns an eligible skill from the target with a 50% chance.
 * Enter numbers only. Using brackets such as [1] will cause an error.
 * 
 * Enemy, Class notes
 * <OnAttackSkillLearning[SkillId]> Set skills that can be learned from already learned skills or action skills when attacking.
 * [SkillId]:SkillId
 * <OnAttackSkillLearning13> If a skill with skill ID 13 has been acquired (if it is an enemy, it has been set) for a class or enemy action, that skill will be acquired.
 * 
 * <OnAttackSkillLearning:[mode]> Sets the skill that can be learned when attacking.
 * [mode]:learning target 0: friend or foe 1: friend only 2: enemy only
 * 
 * Common setting
 * 
 * Set the skill learning correction rate
 * Notes with features
 * <SkillLearningCorrection:[rorrection]> Set the skill learning correction rate.
 * [rorrection]:± Correction rate
 * 
 * The rating of all skills learned by the enemy is set at 5.
 * 
 * Terms of Use
 * Credit: Optional
 * Commercial use: Possible
 * Modifications: Possible
 * Redistribution: Possible
 * Support is not available for modified versions or downloads from sources other than https://github.com/nuun888/MZ, the official forum, or authorized retailers.
 * 
 * Log
 * 10/18/2026 Ver.1.2.0
 * Changed the plugin to work without NUUN_Base.
 * Fixed an issue where the OnAttackSkillLearning tag could not distinguish between allies and enemies.
 * Added a feature to store the number of skills learned through skill learning in a variable.
 * Added a feature to store the number of skills learned through attack skill learning in a variable.
 * 3/29/2025 Ver.1.1.3
 * Fixed to support NUUN_PopupEx.
 * Fixed the popup display target.
 * 12/28/2022 Ver.1.1.2
 * Added definitions for popup support.
 * 12/27/2022 Ver.1.1.1
 * Added a function that allows you to specify the skills that can be acquired for each enemy and occupation.
 * Fixed an issue where an error would occur when the target to acquire the skill was an ally.
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
 * @param SkillLearningNumVariable
 * @text Skill Learning Count Variable
 * @desc Specifies the variable that stores the number of skills learned through skill learning.
 * @type variable
 * @default 0
 * 
 * @param AttackSkillLearningNumVariable
 * @text Attack Skill Learning Count Variable
 * @desc Specifies the variable that stores the number of skills learned through attack skill learning.
 * @type variable
 * @default 0
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
 * @version 1.2.0
 * 
 * @help
 * 相手の使用するスキルを習得することができます。
 * 
 * スキルを受けた時または使用したときに習得
 * 
 * スキルのメモ欄
 * <SkillLearning:[rate], [skill], [mode]> 攻撃を受けた時に習得可能スキルならスキルを確率で習得します。
 * スキルを習得する特徴があるバトラーのみ習得します。
 * [rate]:習得確率(百分率)
 * [skill]:習得スキル　0:発動スキルを習得します。 1以上:指定のスキル
 * [mode]:習得対象 0:敵味方　1:味方のみ　2:敵のみ
 * 例:<SkillLearning:80, 0, 0> 攻撃を受けた時80%の確率で攻撃スキルを習得します。
 * <SkillLearning:100, 52, 1> 攻撃を受けた時100%の確率で習得者が味方ならスキルID52番のスキルを習得します。
 * 
 * <WatchingSkillLearning:[rate], [skill], [mode]> 相手がスキルを使用した時に習得可能スキルならスキルを確率で習得します。
 * スキルを習得する特徴があるバトラーのみ習得します。
 * [rate]:習得確率(百分率)
 * [skill]:習得スキル　0で発動スキルを習得します。 1以上:指定のスキル
 * [mode]:習得対象 0:敵味方　1:味方のみ　2:敵のみ
 * 主に補助系や回復スキルなどに設定します。
 * 
 * 特徴を持つメモ欄
 * スキルを習得する特徴を作る。
 * <SkillLearningAbility>
 * 攻撃を受けたときに習得可能スキルならスキルを習得します。
 * 使用スキルでSkillLearningタグがある場合、このタグを持つバトラーが効果が適用されたときにスキルを習得します。
 * 使用スキルでWatchingSkillLearningタグがある場合、使用して効果が適用されたときにスキルを習得します。
 * 
 * <WatchingSkillLearningAbility>
 * 相手がスキルを使用したときに習得可能スキルならスキルを習得します。
 * 使用スキルでSkillLearning、WatchingSkillLearningタグがある場合、使用して効果が適用されたときにスキルを習得します。
 * 
 * 上記のタグは敵キャラにも設定できます。
 * 
 * 攻撃をしたときに対象のスキルを習得
 * スキルのメモ欄
 * <AttackSkillLearning:[rate], [skill], [mode]> 攻撃を与えた時に対象にOnAttackSkillLearning[skillId]タグのあるスキルの中からスキルを習得します。
 * スキルのメモ欄にOnAttackSkillLearningタグを記入することでスキルを習得することができる対象を選択できます。
 * 下記のタグ(OnAttackSkillLearning)があるスキルのみ習得出来ます。
 * [rate]:習得確率(百分率)
 * [skill]:習得スキル　0:全てのスキル 1:全てのスキルから１つランダム。
 * [mode]:習得モード 0:ヒット　1:撃破
 * <AttackSkillLearning:50, 0, 0>
 * 攻撃成功時に50%の確率で対象の習得できるスキルを習得します。[1]と記入した場合、エラーが表示されますので数値のみ記入してください。
 * 
 * スキルのメモ欄
 * <OnAttackSkillLearning:[mode]> 攻撃時に習得可能にするスキルを設定します。
 * [mode]:習得対象 0:敵味方　1:味方のみ　2:敵のみ
 * 
 * 敵キャラ、職業のメモ欄
 * <OnAttackSkillLearning[SkillId]> 攻撃時に習得済みのスキルまたは行動スキルから習得可能にするスキルを設定します。
 * [SkillId]:スキルID
 * <OnAttackSkillLearning13> 職業または敵の行動にスキルID13番のスキルが習得(敵の場合は設定済み)している場合、そのスキルを習得します。
 * 
 * 共通設定
 * 
 * スキル習得補正率を設定
 * 特徴を持つメモ欄
 * <SkillLearningCorrection:[rorrection]> スキル習得補正率を設定します。
 * [rorrection]:±補正率
 * 
 * 敵が習得したスキルのレーティングは全て5で設定されます。
 * 
 * 利用規約
 * クレジット表記：任意
 * 商業利用：可能
 * 改変：可能
 * 再配布：可能
 * https://github.com/nuun888/MZ、公式フォーラム、正規販売サイト以外からのダウンロード、改変済みの場合はサポートは対象外となります。
 * 
 * 更新履歴
 * 2026/10/18 Ver.1.2.0
 * NUUN_Baseなしで実行できるように仕様を変更。
 * スキル設定でのOnAttackSkillLearningで敵味方で設定できない問題を修正。
 * スキルーラーニング習得数を変数に格納する機能を追加。
 * 攻撃でのスキルーラーニング習得数に格納する機能を追加。
 * 2025/3/29 Ver.1.1.3
 * NUUN_PopupEx対応のための修正。
 * ポップアップの表示対象を修正。
 * 2022/12/28 Ver.1.1.2
 * ポップアップ対応による定義追加。
 * 2022/12/27 Ver.1.1.1
 * 敵、職業毎に習得できるスキルを指定できる機能を追加。
 * 取得対象が味方の時にエラーが出る問題を修正。
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
 * @param SkillLearningNumVariable
 * @text スキルラーニング習得回数変数
 * @desc スキルラーニング習得回数を格納する変数を指定します。
 * @type variable
 * @default 0
 * 
 * @param AttackSkillLearningNumVariable
 * @text 攻撃スキルラーニング習得数変数
 * @desc 攻撃でのスキルラーニング習得数を格納する変数を指定します。
 * @type variable
 * @default 0
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
    class Nuun_PluginParams_SkillLearning {
        static getPluginParams(text) {//document.currentScript
            try {
                const name = String(Utils.extractFileName(text.src).split('.').shift());
                const params = PluginManager.parameters(name);
                if (params) {
                    const pluginParam = new Nuun_PluginParamData(params);
                    pluginParam.setPluginName(name);
                    return pluginParam.getParameters();
                }
                return {pluginName: name};
            } catch (error) {
                const log = ($gameSystem.isJapanese() ? "コアスクリプトをVer.1.3.2以降に更新してください。" : "Please update the core script to version 1.3.2 or later.");
                throw ["ParameterError", log];
            }
        }
    };

    window.Nuun_PluginParams_SkillLearning = Nuun_PluginParams_SkillLearning;

    class Nuun_PluginParamData {
        constructor(text) {
            this._parameters = JSON.parse(JSON.stringify(text, this._convertParams)) || {};
        }

        _convertParams(key, code) {
            try {
                return JSON.parse(code);
            } catch (e) {
                if (isNaN(code)) {
                    if (!code) {
                        return null;
                    }
                    try {
                        if (code.indexOf("'") === 0 || code.indexOf('"') === 0) {
                            return eval(code);//'または"を外す。
                        }
                        return !!code ? String(code) : null;
                    } catch (e) {
                        if (typeof {} === "object") {
                            return code;
                        }
                        return !!code ? String(code) : null;
                    }
                } else {
                    return String(code);
                }
            }
        }

        getParameters() {
            return this._parameters;
        }

        setPluginName(name) {
            this._parameters.pluginName = name;
        }


        getMetaTag(object, code) {
            const data = object.meta[code];
            let list = [];
            if (data !== undefined) {
                try {
                    list = data.split(',');
                } catch (error) {
                    return this.getTextCodeMeta(data);
                }
                return list.map(a => this.getTextCodeMeta(a));
            } else {
                return undefined;
            }
        }

        getTextCodeMeta(text) {
            if (isNaN(text)) {
                return text;
            } else {
                return Number(text);
            }
        }
        
    };

    const params = Nuun_PluginParams_SkillLearning.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;

    function NuunSkillLearningManager() {
        throw new Error("This is a static class");
    }

    window.NuunSkillLearningManager = NuunSkillLearningManager;


    NuunSkillLearningManager.getMetaCode = function(object, method) {
        const meta = object.meta[method];
        if (!meta) return null;
        if (meta === true) {
            return null;
        }
        if (meta.indexOf('[') >= 0) {
            const log = ($gameSystem.isJapanese() ? "パラメータに[]が含まれています。[]を外して記入して下さい。" : "The parameter contains []. Please remove the [] and enter it.");
            throw ["ParameterError", log];
        }
        return meta;
    };

    NuunSkillLearningManager.getMetaCodeList = function(object, method) {
        const meta = object.meta[method];
        if (!meta) return null;
        if (meta === true) {
            return null;
        }
        if (meta.indexOf('[') >= 0) {
            const log = ($gameSystem.isJapanese() ? "パラメータに[]が含まれています。[]を外して記入して下さい。" : "The parameter contains []. Please remove the [] and enter it.");
            throw ["ParameterError", log];
        }
        return meta.split(',');
    };

    NuunSkillLearningManager.skillLearningParams = function(code) {
        switch (code) {
            case 0:
                return params.SkillLearningText;
            case 1:
                return params.SkillLearningSe || {"name":"","volume":"90","pitch":"100","pan":"0"};
            case 2:
                return params.SkillLearningNumVariable;
            case 3:
                return params.AttackSkillLearningNumVariable;
        }
    };

    NuunSkillLearningManager.isSkillLearningNumVariable = function() {
        return this.skillLearningParams(2) > 0;
    };

    NuunSkillLearningManager.isAttackSkillLearningNumVariable = function() {
        return this.skillLearningParams(3) > 0;
    };

    class LearningSkillData {
        constructor(target, id, skillName, iconIndex) {
            this.target = target;
            this.id = id;
            this.skillName = skillName;
            this.name = target.name();
            this.iconIndex = iconIndex;
        }
    };

    const _Game_Party_initialize = Game_Party.prototype.initialize;
    Game_Party.prototype.initialize = function() {
        _Game_Party_initialize.apply(this, arguments);
        this._skillLearning = [];
        this._attackSkillLearning = [];
    };

    Game_Party.prototype.setSkillLearning = function(skillId) {//習得したスキルでカウントする
        if (!this._skillLearning) {
            this._skillLearning = [];
        }
        if (this._skillLearning.includes(skillId)) return;//習得済みならカウントしない
        this._skillLearning.push(skillId);
        if (NuunSkillLearningManager.isSkillLearningNumVariable()) {
            $gameVariables.setValue(NuunSkillLearningManager.skillLearningParams(2), this._skillLearning.length);
        }
    };

    Game_Party.prototype.setAttackSkillLearning = function(skillId) {//習得したスキルでカウントする
        if (!this._attackSkillLearning) {
            this._attackSkillLearning = [];
        }
        if (this._attackSkillLearning.includes(skillId)) return;//習得済みならカウントしない
        this._attackSkillLearning.push(skillId);
        if (NuunSkillLearningManager.isAttackSkillLearningNumVariable()) {
            $gameVariables.setValue(NuunSkillLearningManager.skillLearningParams(3), this._attackSkillLearning.length);
        }
    };

    const _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
    Game_Action.prototype.applyItemUserEffect = function(target) {
        _Game_Action_applyItemUserEffect.apply(this, arguments);
        this.skillLearning(target);
        this.watchingSkillLearning(target);
        this.attackSkillLearning(target);
    };

    Game_Action.prototype.skillLearning = function(target) {
        const skill = this.item();
        if (!skill) return;
        if (skill.meta.SkillLearning) {
            const members = this.subject().isEnemy() ? $gameParty.members() : $gameTroop.members();
            const list = NuunSkillLearningManager.getMetaCodeList(skill, "SkillLearning");
            if (!list) return;
            const data = list.map(Number);
            const skillId = data[1] && data[1] > 0 ? data[1] : skill.id;
            if (data[2] && data[2] === 1 && this.subject().isActor()) {
                return;
            } else if (data[2] && data[2] === 2 && this.subject().isEnemy()) {
                return;
            }
            const learningSkill = $dataSkills[skillId];
            for (const battler of members) {
                if ((battler === target && battler.isSkillLearningAbility()) || battler.isWatchingSkillLearningAbility()) {
                    if (!this.isSkillLearningSkill(battler, skillId) && Math.random() < battler.skillLearningRate(data[0])) {
                        battler.skillLearning(skillId);
                        const learning = new LearningSkillData(battler, skillId, learningSkill.name, learningSkill.iconIndex);
                        this.setSkillLearningLog(target, learning);
                        this.setSkillLearningNum(battler, skillId);
                    }
                }
            }
        }
    };

    Game_Action.prototype.watchingSkillLearning = function(target) {
        const skill = this.item();
        if (skill.meta.WatchingSkillLearning) {
            const members = this.subject().isEnemy() ? $gameParty.members() : $gameTroop.members();
            const list = NuunSkillLearningManager.getMetaCodeList(skill, "WatchingSkillLearning");
            if (!list) return;
            const data = list.map(Number);
            const skillId = data[1] && data[1] > 0 ? data[1] : skill.id;
            if (data[2] && data[2] === 1 && this.subject().isActor()) {
                return;
            } else if (data[2] && data[2] === 2 && this.subject().isEnemy()) {
                return;
            }
            const learningSkill = $dataSkills[skillId];
            for (const battler of members) {
                if (battler.isAllSkillLearningAbility()) {
                    if (!this.isSkillLearningSkill(battler, skillId) && Math.random() < battler.skillLearningRate(data[0])) {
                        battler.skillLearning(skillId);
                        const learning = new LearningSkillData(battler, skillId, learningSkill.name, learningSkill.iconIndex);
                        this.setSkillLearningLog(target, learning);
                        this.setSkillLearningNum(battler, skillId);
                    }
                }
            }
        }
    };

    Game_Action.prototype.attackSkillLearning = function(target) {
        const skill = this.item();
        if (skill.meta.AttackSkillLearning) {
            const list = NuunSkillLearningManager.getMetaCodeList(skill, "AttackSkillLearning");
            if (!list) return;
            const data = list.map(Number);
            if (data[2] === 0) {
                this.setAttackSkillLearning(target, data);
            } else if (data[2] === 1 && target.isDead()) {
                this.setAttackSkillLearning(target, data);
            }
        }
    };

    Game_Action.prototype.setAttackSkillLearning = function(target, data) {
        const subject = this.subject();
        const object = target.isActor() ? target.currentClass() : target.enemy();
        const skills = target.attackSkillLearningList().filter(skillId => !this.isSkillLearningSkill(subject, skillId) && this.isOnAttackSkillLearning(skillId, subject, target, object));
        if (skills.length > 0 && Math.random() < subject.skillLearningRate(data[0])) {
            if (data[1] === 0) {
                for (const id of skills) {
                    subject.skillLearning(id);
                    const skill = $dataSkills[id];
                    const learning = new LearningSkillData(subject, skill.id, skill.name, skill.iconIndex);
                    this.setSkillLearningLog(target, learning);
                    this.setAttackSkillLearningNum(subject, id);
                }
            } else if (data[1] === 1) {
                const id = skills[Math.floor(Math.random() * skills.length)];
                subject.skillLearning(id);
                const skill = $dataSkills[id];
                const learning = new LearningSkillData(subject, skill.id, skill.name, skill.iconIndex);
                this.setSkillLearningLog(target, learning);
                this.setAttackSkillLearningNum(subject, id);
            }
            this.makeSuccess(target);
        }
    };

    Game_Action.prototype.setSkillLearningNum = function(target, skillId) {
        if (target.isEnemy()) return;
        $gameParty.setSkillLearning(skillId);
    };

    Game_Action.prototype.setAttackSkillLearningNum = function(target, skillId) {
        if (target.isEnemy()) return;
        $gameParty.setAttackSkillLearning(skillId);
    };

    Game_Action.prototype.isOnAttackSkillLearning = function(skillId, subject, target, object) {
        const skill = $dataSkills[skillId];
        let result = false;
        if (skill.meta.OnAttackSkillLearning) {
            const data = NuunSkillLearningManager.getMetaCode(skill, "OnAttackSkillLearning");
            if (!!data) {
                const mode = Number(data);
                if (mode === 1) {
                    result = subject.isActor();
                } else if (mode === 2) {
                    result = subject.isEnemy();
                } else {
                    result = true;
                }
            }
        }
        return result || this.isOnTargetAttackSkillLearning(skillId, object);
    };


    Game_Action.prototype.isOnTargetAttackSkillLearning = function(skillId, object) {
        const tag = 'OnAttackSkillLearning' + skillId;
        return !!object.meta[tag];
    };

    Game_Action.prototype.isSkillLearningSkill = function(battler, skillId) {
        return battler.isActor() ? battler.isLearnedSkill(skillId) : battler.isEnemyLearningSkills(skillId);
    };

    Game_Action.prototype.setSkillLearningLog = function(target, learning) {
        const result = target.result();
        result.isSkillLearning = true;
        result.learningSkill.push(learning);
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
        return this.skills().map(skill => skill.id);
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
            if (!trait.meta.SkillLearningCorrection) return r;
            return r + Number(NuunSkillLearningManager.getMetaCode(trait, "SkillLearningCorrection") || 0);
        }, 0);
    };


    const _Game_Enemy_initMembers = Game_Enemy.prototype.initMembers;
    Game_Enemy.prototype.initMembers = function() {
        _Game_Enemy_initMembers.call(this);
        this._learningSkills = [];
    };

    Game_Enemy.prototype.isEnemyLearningSkills = function(skillId) {
        return this.enemy().actions.some(action => action.skillId === skillId) || this._learningSkills.some(action => action.skillId === skillId);
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
                this.push("addText", NuunSkillLearningManager.skillLearningParams(0).format(skill.name, skill.skillName));
            }
            this.playSkillLearningSe();
        }
    };

    const _Window_BattleLog_displayFailure = Window_BattleLog.prototype.displayFailure;
    Window_BattleLog.prototype.displayFailure = function(target) {
        _Window_BattleLog_displayFailure.call(this, target);
        this.displaySkillLearning(target);
    };

    const _Window_BattleLog_displayActionResults = Window_BattleLog.prototype.displayActionResults;
    Window_BattleLog.prototype.displayActionResults = function(subject, target) {
        const result = target.result();
        if (result.used && result.isSkillLearning) {
            if (_isPopup() && !!target.shouldPopupSkillLearning && target.shouldPopupSkillLearning()) {
                this.displayAffectedSkillLearning(target, result.learningSkill);
            }
        }
        _Window_BattleLog_displayActionResults.call(this, subject, target);
    };

    Window_BattleLog.prototype.playSkillLearningSe = function() {
        const data = NuunSkillLearningManager.skillLearningParams(1);
        if (data && data.name) {
            AudioManager.playSe(data);
        }
    };

    function _isPopup() {
        return Imported.NUUN_popUp || Imported.NUUN_PopupEx;
    }
    
    
})();