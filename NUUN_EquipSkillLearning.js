/*:-----------------------------------------------------------------------------------
 * NUUN_EquipSkillLearning.js
 * 
 * Copyright (C) 2022 NUUN
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc skill learning equip
 * @author NUUN
 * @version 1.2.0
 * 
 * @help
 * You can set the equipment that can learn skills.
 * Skills can be acquired when the points obtained while equipped reach the specified number of points.
 * 
 * Weapon and armor notes
 * <EquipSkillLearning:「id],[id]...> Set the skill to learn. It is possible to specify more than one.
 * [id]:Skill ID
 * 
 * Skill notes
 * <EquipSkillLearningPoint:「num]> Set the points required for learning.
 * [num]:Required points
 * 
 * Enemy notes
 * <EquipSkillLearningPoint:「num]> Set the points to earn. If not filled in, default acquisition points will be applied.
 * [num]:Gain point
 * 
 * Note with features
 * Set the amplification rate of points to be learned.
 * <EquipSkillLearningRate:「rate]>
 * <EquipSkillLearningRate:150>
 * If the acquisition point is 4, acquire 6 points with 150% effect.
 * 
 * Display costs with "NUUN_SkillCostShowEX"
 * You can display the learning progress as a skill cost by selecting EquipSkillLearnSkill as the cost display target in Skill Cost Display Order in the "NUUN_SkillCostShowEX" plugin parameters.
 * 
 * Terms of Use
 * Credit: Optional
 * Commercial use: Possible
 * Modifications: Possible
 * Redistribution: Possible
 * Support is not available for modified versions or downloads from sources other than https://github.com/nuun888/MZ, the official forum, or authorized retailers.
 * 
 * Log
 * 10/3/2026 Ver.1.2.0
 * Changed the specifications so that the plugin can run without NUUN_Base.
 * Fixed an issue where the default value was not applied when the points required to learn a skill were not specified.
 * Added support for NUUN_ResultEx.
 * Fixed an issue where 0 could not be specified for gauge colors.
 * 12/24/2022 Ver.1.1.1
 * Fixed an issue where skills could not be selected.
 * 12/24/2022 Ver.1.1.0
 * Added a function that allows you to set the amplification factor of acquisition points.
 * 12/17/2022 Ver.1.0.0
 * First edition.
 * 
 * @param EquipSkillLearningName
 * @desc Equipment Acquisition Point Name.
 * @text Equipment Acquisition Point Name
 * @type string
 * @default AP
 * 
 * @param DefaultGainPoint
 * @text Default acquisition point
 * @desc Set the default acquisition point when defeating an enemy.
 * @type number
 * @min 0
 * @default 1
 * 
 * @param EquipSkillLearningResultShow
 * @desc Show earned points in default results.
 * @text Result acquisition points display
 * @type boolean
 * @default true
 * 
 * @param EquipSkillLearningResult
 * @desc Acquisition text at the time of result %1: Equipment acquisition point name %2: Acquisition point
 * @text Result acquisition text
 * @type string
 * @default Gain %2 %1!
 * 
 * @param EquipSkillLearnUseSkill
 * @desc You can't use the skill until you master it.
 * @text Usable after learning
 * @type boolean
 * @default false
 * 
 * @param GaugeSetting
 * @text GaugeSetting
 * @default ------------------------------
 * 
 * @param EquipSkillLearningGaugeWidth
 * @text Gauge width
 * @desc Specifies the width of the gauge. (item width when 0 is specified)
 * @type number
 * @min 0
 * @default 0
 * @parent GaugeSetting
 * 
 * @param EquipSkillLearningGaugeX
 * @text Gauge X (Relative)
 * @desc Specifies the x-coordinate (relative) of the gauge.
 * @type number
 * @min 0
 * @default 0
 * @parent GaugeSetting
 * 
 * @param EquipSkillLearningGaugeY
 * @text Gauge Y (Relative)
 * @desc Specifies the y-coordinate (relative) of the gauge.
 * @type number
 * @min 0
 * @default 8
 * @parent GaugeSetting
 * 
 * @param EquipSkillLearningGaugeColor1
 * @desc Specifies color 1 of the gauge. (You can fill in the color code in the text tab)
 * @text Gauge color 1
 * @type color
 * @default 30
 * @parent GaugeSetting
 * 
 * @param EquipSkillLearningGaugeColor2
 * @desc Specifies color 2 of the gauge. (You can fill in the color code in the text tab)
 * @text Gauge color 2
 * @type color
 * @default 5
 * @parent GaugeSetting
 * 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc スキル習得装備
 * @author NUUN
 * @version 1.2.0
 * 
 * @help
 * スキルを習得できる装備を設定できます。
 * 装備中に得たポイントが指定のポイントまで取得したときにスキルを習得できます。
 * 
 * 武器、防具のメモ欄
 * <EquipSkillLearning:「id],[id]...> 習得するスキルを設定します。複数指定可能です。
 * [id]:スキルID
 * 
 * スキルのメモ欄
 * <EquipSkillLearningPoint:「num]> 習得に必要なポイントを設定します。
 * 未指定の場合は10になります。
 * [num]:必要ポイント
 * 
 * 敵キャラのメモ欄
 * <EquipSkillLearningPoint:「num]> 獲得するポイントを設定します。未記入の場合はデフォルトの取得ポイントが適用されます。
 * [num]:取得ポイント
 * 
 * 特徴を有するメモ欄
 * 習得するポイントの増幅率を設定します。
 * <EquipSkillLearningRate:「rate]>
 * <EquipSkillLearningRate:150>の場合は取得ポイントが4の場合、150%の効果で6ポイント取得します。
 * 
 * NUUN_SkillCostShowEXでコストを表示
 * NUUN_SkillCostShowEXのプラグインパラメータのスキルコストの表示順でコスト表示対象でEquipSkillLearnSkillを選択することでスキルコストに表示させることができます。
 * 
 * 利用規約
 * クレジット表記：任意
 * 商業利用：可能
 * 改変：可能
 * 再配布：可能
 * https://github.com/nuun888/MZ、公式フォーラム、正規販売サイト以外からのダウンロード、改変済みの場合はサポートは対象外となります。
 * 
 * 更新履歴
 * 2026/10/3 Ver.1.2.0
 * NUUN_Baseなしで実行できるように仕様を変更。
 * スキルに習得に必要なポイントが設定されていない場合、デフォルト値が設定されるように修正。
 * NUUN_ResultExに対応。
 * ゲージ色で0が指定できない問題を修正。
 * 2022/12/25 Ver.1.1.1
 * スキルを選択できなくなる問題を修正。
 * 2022/12/24 Ver.1.1.0
 * 取得ポイントの増幅率を設定できる機能を追加。
 * 2022/12/17 Ver.1.0.0
 * 初版
 * 
 * @param EquipSkillLearningName
 * @desc 装備取得ポイントの名称
 * @text 装備取得ポイント名称
 * @type string
 * @default AP
 * 
 * @param DefaultGainPoint
 * @text デフォルト取得ポイント
 * @desc モンスターを倒したときのデフォルトの取得ポイントを設定します。
 * @type number
 * @min 0
 * @default 1
 * 
 * @param EquipSkillLearningResultShow
 * @desc デフォルトのリザルトに取得ポイントを表示します。
 * @text リザルト取得ポイント表示
 * @type boolean
 * @default true
 * 
 * @param EquipSkillLearningResult
 * @desc リザルト時の取得テキスト %1:装備取得ポイント名称 %2:獲得ポイント
 * @text リザルト取得テキスト
 * @type string
 * @default %1を %2 獲得！
 * 
 * @param EquipSkillLearnUseSkill
 * @desc 習得するまではスキルを使用できません。
 * @text 習得後使用可能
 * @type boolean
 * @default false
 * 
 * @param GaugeSetting
 * @text ゲージ設定
 * @default ------------------------------
 * 
 * @param EquipSkillLearningGaugeWidth
 * @text ゲージ横幅
 * @desc ゲージの横幅を指定します。(0で項目横幅)
 * @type number
 * @min 0
 * @default 0
 * @parent GaugeSetting
 * 
 * @param EquipSkillLearningGaugeX
 * @text ゲージX(相対)
 * @desc ゲージのX座標(相対)を指定します。
 * @type number
 * @min 0
 * @default 0
 * @parent GaugeSetting
 * 
 * @param EquipSkillLearningGaugeY
 * @text ゲージY(相対)
 * @desc ゲージのY座標(相対)を指定します。
 * @type number
 * @min 0
 * @default 8
 * @parent GaugeSetting
 * 
 * @param EquipSkillLearningGaugeColor1
 * @desc ゲージの色1を指定します。（テキストタブでカラーコードを記入できます）
 * @text ゲージの色1
 * @type color
 * @default 30
 * @parent GaugeSetting
 * 
 * @param EquipSkillLearningGaugeColor2
 * @desc ゲージの色2を指定します。（テキストタブでカラーコードを記入できます）
 * @text ゲージの色2
 * @type color
 * @default 5
 * @parent GaugeSetting
 * 
 * 
 */

var Imported = Imported || {};
Imported.NUUN_EquipSkillLearning = true;

(() => {
    class Nuun_PluginParams_EquipSkillLearning {
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

    window.Nuun_PluginParams_EquipSkillLearning = Nuun_PluginParams_EquipSkillLearning;

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

    const params = Nuun_PluginParams_EquipSkillLearning.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;

    function NuunEquipSkillLearningManager() {
        throw new Error("This is a static class");
    }

    window.NuunEquipSkillLearningManager = NuunEquipSkillLearningManager;

    NuunEquipSkillLearningManager.getMetaCode = function(object, method) {
        if (!object || !object.meta[method]) return null;
        const meta = object.meta[method];
        if (meta === true) {
            return null;
        }
        if (meta.indexOf('[') >= 0) {
            const log = ($gameSystem.isJapanese() ? "パラメータに[]が含まれています。[]を外して記入して下さい。" : "The parameter contains []. Please remove the [] and enter it.");
            throw ["ParameterError", log];
        }
        return meta;
    };

    NuunEquipSkillLearningManager.getMetaCodeList = function(object, method) {
        const meta = object.meta[method];
        if (!meta || meta === true) return null;
        if (meta.indexOf('[') >= 0) {
            const log = ($gameSystem.isJapanese() ? "パラメータに[]が含まれています。[]を外して記入して下さい。" : "The parameter contains []. Please remove the [] and enter it.");
            throw ["ParameterError", log];
        }
        return meta.split(',');
    };

    NuunEquipSkillLearningManager.getColorCode = function(color) {
        if (typeof(color) === "string" && color.indexOf('#') === 0) {
            return color;
        }
        return ColorManager.textColor(color);
    };

    NuunEquipSkillLearningManager.LoadPictures = function(filename) {
        const bitmap = ImageManager.loadBitmap("img/", filename);
        return bitmap;
    };

    NuunEquipSkillLearningManager.setupGagueContents = function(data, width, ex, _class, type) {
        if (!this._gaugeContents) {
            this._gaugeContents = new GaugeContents();
        }
        this._gaugeContents.clear();
        this._gaugeContents.setup(data, width, ex, _class, type);
    }

    NuunEquipSkillLearningManager.getGaugeContents = function() {
        return this._gaugeContents;
    };

    NuunEquipSkillLearningManager.getLearningPoint = function(skill) {
        const point = NuunEquipSkillLearningManager.getMetaCode(skill, "EquipSkillLearningPoint");
        return !!point ? Number(point) : 10;
    };
    
    NuunEquipSkillLearningManager.equipSkillLearningParams = function(code) {
        switch (code) {
            case 0:
                return params.EquipSkillLearningName || 'AP';
            case 1:
                return params.EquipSkillLearningResult;
            case 2:
                return params.EquipSkillLearningResultShow;
            case 3:
                return params.EquipSkillLearnUseSkill;
            case 4:
                return params.EquipSkillLearningGaugeWidth || 0;
            case 5:
                return params.EquipSkillLearningGaugeX || 0;
            case 6:
                return params.EquipSkillLearningGaugeY || 0;
            case 7:
                return params.EquipSkillLearningGaugeColor1;
            case 8:
                return params.EquipSkillLearningGaugeColor2;
            case 9:
                return params.DefaultGainPoint;
        }
    };

    const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
    Game_Actor.prototype.initMembers = function() {
        _Game_Actor_initMembers.apply(this, arguments);
        this.initEquipSkillLearning();
        this.initEquipSkillNewSkill();
    };

    Game_Actor.prototype.initEquipSkillLearning = function() {
        if (!this._equipSkillLearning) {
            this._equipSkillLearning = [];
        }
    };

    Game_Actor.prototype.initEquipSkillNewSkill = function() {
        if (!this.equipSkillLearningNewSkill) {
            this.equipSkillLearningNewSkill = [];
        }
    };

    Game_Actor.prototype.gainEquipSkillLearningPoint = function(id, num) {
        if (this.isEquipSkillLearning(id)) {
            return;
        }
        const skill = $dataSkills[id];
        const point = NuunEquipSkillLearningManager.getLearningPoint(skill);
        this.initEquipSkillLearning();
        this.initEquipSkillNewSkill();
        if (this._equipSkillLearning[id] === undefined) {
            this._equipSkillLearning[id] = 0;
        }
        if (point < this._equipSkillLearning[id]) {
            return;
        }
        this._equipSkillLearning[id] += num * this.getEquipSkillLearningRate();
        this._equipSkillLearning[id] = this._equipSkillLearning[id].clamp(0, point);
        if (point <= this._equipSkillLearning[id]) {
            this.learnSkill(id);
            this.equipSkillLearningNewSkill.push(skill);
        }
    };

    Game_Actor.prototype.getEquipSkillLearningRate = function() {
        return this.traitObjects().reduce((r, trait) => {
            return trait.meta.EquipSkillLearningRate ? (Number(NuunEquipSkillLearningManager.getMetaCode(trait, "EquipSkillLearningRate")) / 100) * r : r;
        }, 1.0);
    };

    Game_Actor.prototype.getEquipSkillLearningPercentage = function() {
        return this.getEquipSkillLearningRate() * 100;
    };

    Game_Actor.prototype.getEquipSkillLearningPoint = function(id) {
        this.initEquipSkillLearning();
        return this._equipSkillLearning[id] || 0;
    };

    Game_Actor.prototype.isEquipSkillLearning = function(skillId) {
        return this.isLearnedSkill(skillId);
    };

     Game_Actor.prototype.isEquipSkillLearningSkill = function(skillId) {
        this.initEquipSkillLearning();
        return Number.isFinite(this._equipSkillLearning[skillId]);
    };

    const _Game_Actor_findNewSkills = Game_Actor.prototype.findNewSkills;
    Game_Actor.prototype.findNewSkills = function(lastSkills) {
        return this.findNewLearningSkills(_Game_Actor_findNewSkills.apply(this, arguments));
    };

    Game_Actor.prototype.findNewLearningSkills = function(newSkills) {
        Array.prototype.push.apply(newSkills, (this.equipSkillLearningNewSkill || []));
        return newSkills;
    };

    const _Game_BattlerBase_addedSkills = Game_BattlerBase.prototype.addedSkills;
    Game_BattlerBase.prototype.addedSkills = function() {
        return this.addLearningSkills(_Game_BattlerBase_addedSkills.apply(this, arguments));
    };

    Game_BattlerBase.prototype.addLearningSkills = function(skills) {
        return skills;
    };

    Game_Actor.prototype.addLearningSkills = function(skills) {
        Array.prototype.push.apply(skills, this.getEquipSkillLearningList());
        return skills;
    };

    Game_Actor.prototype.getEquipSkillLearningList = function() {
        const skillList = [];
        for (const item of this.equips()) {
            if (item) {
                if (!!item.meta.EquipSkillLearning) {
                    Array.prototype.push.apply(skillList, NuunEquipSkillLearningManager.getMetaCodeList(item, "EquipSkillLearning").map(Number));
                }
            }
        }
        return skillList;
    };

    Game_Enemy.prototype.equipSkillLearningPoint = function() {
        return this.enemy().meta.EquipSkillLearningPoint ? Number(NuunEquipSkillLearningManager.getMetaCode(this.enemy(), "EquipSkillLearningPoint")) : NuunEquipSkillLearningManager.equipSkillLearningParams(9);
    };

    Game_Troop.prototype.equipSkillLearningPointTotal = function() {
        const members = this.deadMembers();
        return members.reduce((r, enemy) => r + enemy.equipSkillLearningPoint(), 0);
    };


    const _Window_SkillList_initialize = Window_SkillList.prototype.initialize;
    Window_SkillList.prototype.initialize = function(rect) {
        _Window_SkillList_initialize.apply(this, arguments);
        this._equipSkillLearning = [];
    };

    const _Window_SkillList_refresh = Window_SkillList.prototype.refresh;
    Window_SkillList.prototype.refresh = function() {
        this.hideGaugeSprite();
        _Window_SkillList_refresh.apply(this, arguments)
    };

    Window_SkillList.prototype.hideGaugeSprite = function() {
        for (const sprite of Object.values(this._equipSkillLearning)) {
            sprite.hide();
        }
    };

    const _Window_SkillList_isEnabled = Window_SkillList.prototype.isEnabled;
    Window_SkillList.prototype.isEnabled = function(item) {
        return _Window_SkillList_isEnabled.apply(this, arguments) && this.isUseEquipSkillLearn(item);
    };

    Window_SkillList.prototype.isUseEquipSkillLearn = function(skill) {
        return NuunEquipSkillLearningManager.equipSkillLearningParams(3) ? this.canUseEquipSkillLearn(skill) : true;
    };

    Window_SkillList.prototype.canUseEquipSkillLearn = function(skill) {
        const actor = this._actor;
        return actor._equipSkillLearning && actor._equipSkillLearning[skill.id] && actor._equipSkillLearning[skill.id] > 0 && actor.isEquipSkillLearning(skill.id);
    };

    Window_Base.prototype.getEquipSkillLearnPoint = function() {//獲得ポイント
        return $gameTroop.equipSkillLearningPointTotal();
    };

    Window_Base.prototype.equipSkillLearnSkill = function(skill) {//必要ポイント
        return NuunEquipSkillLearningManager.getLearningPoint(skill);
    };

    Window_Base.prototype.equipSkillLearnSkillText = function(skill) {//必要ポイントテキスト
        return this._actor.isEquipSkillLearningSkill(skill.id) ? this._actor.getEquipSkillLearningPoint(skill.id) +"/"+ this.equipSkillLearnSkill(skill) : 0;
    };

    const _Window_SkillList_drawItem = Window_SkillList.prototype.drawItem;
    Window_SkillList.prototype.drawItem = function(index) {
        _Window_SkillList_drawItem.apply(this, arguments)
        this.drawEquipSkillLearningGauge(index);
    };

    Window_SkillList.prototype.drawEquipSkillLearningGauge = function(index) {
        const actor = this._actor;
        const skill = this.itemAt(index);
        const point = NuunEquipSkillLearningManager.getLearningPoint(skill);
        if (!actor || !skill || !!actor.isEquipSkillLearning(skill.id) || point === 0) return;
        const rect = this.itemLineRect(index);
        if (!this._equipSkillLearning[index]) {
            const width = (NuunEquipSkillLearningManager.equipSkillLearningParams(4) > 0 ? Math.min(rect.width, NuunEquipSkillLearningManager.equipSkillLearningParams(4)) : rect.width) - NuunEquipSkillLearningManager.equipSkillLearningParams(5);
            NuunEquipSkillLearningManager.setupGagueContents(null, width, null, this, "n_skill");
            const sprite = new Sprite_EquipSkillLearningGauge(width);
            this._contentsBackSprite.addChild(sprite);
            this._equipSkillLearning[index] = sprite;
        }
        this._equipSkillLearning[index].setup(actor, 'n_skill', skill);
        this._equipSkillLearning[index].move(rect.x + NuunEquipSkillLearningManager.equipSkillLearningParams(5), rect.y + NuunEquipSkillLearningManager.equipSkillLearningParams(6));
        this._equipSkillLearning[index].show();
    };

    function Sprite_EquipSkillLearningGauge() {
        this.initialize(...arguments);
    }
      
    Sprite_EquipSkillLearningGauge.prototype = Object.create(Sprite_Gauge.prototype);
    Sprite_EquipSkillLearningGauge.prototype.constructor = Sprite_EquipSkillLearningGauge;
      
    Sprite_EquipSkillLearningGauge.prototype.initialize = function() {
        this.setupGaugeContents();
        Sprite_Gauge.prototype.initialize.call(this);
    };

    Sprite_EquipSkillLearningGauge.prototype.initMembers = function() {
        Sprite_Gauge.prototype.initMembers.apply(this, arguments);
        this._skillId = 0;
        this._maxEquipSkillLearningPoint = 0;
    };

    Sprite_EquipSkillLearningGauge.prototype.setup = function(battler, statusType, skill) {
        this._skillId = skill.id;
        this._maxEquipSkillLearningPoint = NuunEquipSkillLearningManager.getLearningPoint(skill);
        Sprite_Gauge.prototype.setup.call(this, battler, statusType);
    };

    Sprite_EquipSkillLearningGauge.prototype.setupGaugeContents = function() {
        const gaugeContents = NuunEquipSkillLearningManager.getGaugeContents();
        this._gaugeWidth = gaugeContents.getWidth();
        this._gaugeHeight = gaugeContents.getHeight();
        this._data = gaugeContents.getEx();
    };

    Sprite_EquipSkillLearningGauge.prototype.bitmapWidth = function() {
        return this._gaugeWidth || Sprite_Gauge.prototype.bitmapWidth.apply(this, arguments);
    };

    Sprite_EquipSkillLearningGauge.prototype.gaugeHeight = function() {
        return this._gaugeHeight || Sprite_Gauge.prototype.gaugeHeight.apply(this, arguments);
    };
    
    Sprite_EquipSkillLearningGauge.prototype.currentValue = function() {
        return this._battler.getEquipSkillLearningPoint(this._skillId);
    };

    Sprite_EquipSkillLearningGauge.prototype.currentMaxValue = function() {
        return this._maxEquipSkillLearningPoint;
    };

    Sprite_EquipSkillLearningGauge.prototype.gaugeColor1 = function() {
        return NuunEquipSkillLearningManager.getColorCode(NuunEquipSkillLearningManager.equipSkillLearningParams(7));
    };
    
    Sprite_EquipSkillLearningGauge.prototype.gaugeColor2 = function() {
        return NuunEquipSkillLearningManager.getColorCode(NuunEquipSkillLearningManager.equipSkillLearningParams(8));
    };

    Sprite_EquipSkillLearningGauge.prototype.drawLabel = function() {
        
    };
    
    Sprite_EquipSkillLearningGauge.prototype.drawValue = function() {
        
    };


    const _BattleManager_displayRewards = BattleManager.displayRewards;
    BattleManager.displayRewards = function() {
        _BattleManager_displayRewards.call(this);
        this.displayEquipSkillLearningPoint();
    };

    BattleManager.displayEquipSkillLearningPoint = function() {
        if (this.isResultPlugin() || !NuunEquipSkillLearningManager.equipSkillLearningParams(2)) {
            return;
        }
        const equipSkillLearningPoint = this._rewards.equipSkillLearningPoint;
        if (equipSkillLearningPoint > 0) {
            const text = NuunEquipSkillLearningManager.equipSkillLearningParams(1).format(NuunEquipSkillLearningManager.equipSkillLearningParams(0), equipSkillLearningPoint);
            $gameMessage.add("\\." + text);
        }
    };

    BattleManager.isResultPlugin  = function() {
        return Imported.NUUN_Result || Imported.NUUN_ResultEx;
    };

    const _BattleManager_makeRewards = BattleManager.makeRewards;
    BattleManager.makeRewards = function() {
        _BattleManager_makeRewards.call(this);
        this._rewards.equipSkillLearningPoint = $gameTroop.equipSkillLearningPointTotal();
    };

    const _BattleManager_gainRewards = BattleManager.gainRewards;
    BattleManager.gainRewards = function() {
        this.gainEquipSkillLearningPoint();
        _BattleManager_gainRewards.call(this);
    };

    BattleManager.gainEquipSkillLearningPoint = function() {
        const equipSkillLearningPoint = this._rewards.equipSkillLearningPoint;
        for (const actor of $gameParty.allMembers()) {
            actor.equipSkillLearningNewSkill = [];
            for (const skillId of actor.getEquipSkillLearningList()) {
                actor.gainEquipSkillLearningPoint(skillId, equipSkillLearningPoint);
            }
        }
    };


    class GaugeContents {
        constructor() {
            this.clear();
        }

        clear() {
            this._data = null;
            this.width = 128;
            this.color = 0;
            this._ex = null;
            this._class = null;
            this._type = "";
        }

        setup(data, width, ex, _class, type) {
            this._data = data;
            this.width = width;
            this._ex = ex;
            this._class = _class;
            this._type = type;
        }

        getData() {
            return this._data;
        }

        getWidth() {
            return this.width;
        }

        getHeight() {
            return this._data ? this._data.GaugeHeight : 12;
        }

        getEx() {
            return this._ex;
        }

        getClass() {
            return this._class;
        }
    };

    
})();