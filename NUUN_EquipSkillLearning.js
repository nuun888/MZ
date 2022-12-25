/*:-----------------------------------------------------------------------------------
 * NUUN_EquipSkillLearning.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc skill learning equip
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.1.1
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
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
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
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.1.1
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
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
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
    const parameters = PluginManager.parameters('NUUN_EquipSkillLearning');
    const EquipSkillLearningName = String(parameters['EquipSkillLearningName'] || 'AP');
    const EquipSkillLearningResult = String(parameters['EquipSkillLearningResult']);
    const EquipSkillLearningResultShow = eval(parameters['EquipSkillLearningResultShow'] || "true");
    const EquipSkillLearnUseSkill = eval(parameters['EquipSkillLearnUseSkill'] || "false");
    const EquipSkillLearningGaugeWidth = Number(parameters['EquipSkillLearningGaugeWidth'] || 0);
    const EquipSkillLearningGaugeX = Number(parameters['EquipSkillLearningGaugeX'] || 0);
    const EquipSkillLearningGaugeY = Number(parameters['EquipSkillLearningGaugeY'] || 8);
    const EquipSkillLearningGaugeColor1 = (DataManager.nuun_structureData(parameters['EquipSkillLearningGaugeColor1'])) || 30;
    const EquipSkillLearningGaugeColor2 = (DataManager.nuun_structureData(parameters['EquipSkillLearningGaugeColor2'])) || 5;
    const DefaultGainPoint = Number(parameters['DefaultGainPoint'] || 0);

    function getEquipSkillLearning(data) {
        return data.split(',').map(Number);
    }

    const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
    Game_Actor.prototype.initMembers = function() {
        _Game_Actor_initMembers.call(this);
        this.initEquipSkillLearning();
        this.equipSkillLearningNewSkill = [];
    };

    Game_Actor.prototype.initEquipSkillLearning = function() {
        if (!this._equipSkillLearning) {
            this._equipSkillLearning = [];
        }
    };

    Game_Actor.prototype.gainEquipSkillLearningPoint = function(id, num) {
        if (this.isEquipSkillLearning(id)) {
            return;
        }
        const skill = $dataSkills[id];
        const point = skill.meta.EquipSkillLearningPoint ? Number(skill.meta.EquipSkillLearningPoint) : 0;
        this.initEquipSkillLearning();
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
            return trait.meta.EquipSkillLearningRate ? (Number(trait.meta.EquipSkillLearningRate) / 100) * r : r;
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

    const _Game_Actor_findNewSkills = Game_Actor.prototype.findNewSkills;
    Game_Actor.prototype.findNewSkills = function(lastSkills) {
        const newSkills = _Game_Actor_findNewSkills.call(this, lastSkills);
        Array.prototype.push.apply(newSkills, this.equipSkillLearningNewSkill);
        return newSkills;
    };

    const _Game_BattlerBase_addedSkills = Game_BattlerBase.prototype.addedSkills;
    Game_BattlerBase.prototype.addedSkills = function() {
        const skills = _Game_BattlerBase_addedSkills.call(this);
        Array.prototype.push.apply(skills, this.getEquipSkillLearningList());
        return skills;
    };

    Game_BattlerBase.prototype.getEquipSkillLearningList = function() {
        const skillList = [];
        for (const item of this.equips()) {
            if (item) {
                if (item.meta.EquipSkillLearning) {
                    Array.prototype.push.apply(skillList, getEquipSkillLearning(item.meta.EquipSkillLearning));
                }
            }
        }
        return skillList;
    };

    Game_Enemy.prototype.equipSkillLearningPoint = function() {
        return this.enemy().meta.EquipSkillLearningPoint ? Number(this.enemy().meta.EquipSkillLearningPoint) : DefaultGainPoint;
    };

    Game_Troop.prototype.equipSkillLearningPointTotal = function() {
        const members = this.deadMembers();
        return members.reduce((r, enemy) => r + enemy.equipSkillLearningPoint(), 0);
    };


    const _Window_SkillList_initialize = Window_SkillList.prototype.initialize;
    Window_SkillList.prototype.initialize = function(rect) {
        _Window_SkillList_initialize.call(this, rect);
        this._equipSkillLearning = [];
    };

    const _Window_SkillList_refresh = Window_SkillList.prototype.refresh;
    Window_SkillList.prototype.refresh = function() {
        this.hideGaugeSprite();
        _Window_SkillList_refresh.call(this);
    };

    Window_SkillList.prototype.hideGaugeSprite = function() {
        for (const sprite of Object.values(this._equipSkillLearning)) {
            sprite.hide();
        }
    };

    const _Window_SkillList_isEnabled = Window_SkillList.prototype.isEnabled;
    Window_SkillList.prototype.isEnabled = function(item) {
        return _Window_SkillList_isEnabled.call(this, item) && this.isUseEquipSkillLearn(item);
    };

    Window_SkillList.prototype.isUseEquipSkillLearn = function(skill) {
        return EquipSkillLearnUseSkill ? actor.canUseEquipSkillLearn(skill) : true;
    };

    Window_SkillList.prototype.canUseEquipSkillLearn = function(skill) {
        const actor = this._actor;
        return actor._equipSkillLearning && actor._equipSkillLearning[skill.id] && actor._equipSkillLearning[skill.id] > 0 && actor.isEquipSkillLearning(skill.id);
    };

    Window_Base.prototype.getEquipSkillLearnPoint = function() {//獲得ポイント
        return $gameTroop.equipSkillLearningPointTotal();
    };

    Window_Base.prototype.equipSkillLearnSkill = function(skill) {//必要ポイント
        return skill.meta.EquipSkillLearningPoint ? Number(skill.meta.EquipSkillLearningPoint) : 0;
    };

    Window_Base.prototype.equipSkillLearnSkillText = function(skill) {//必要ポイントテキスト
        return skill.meta.EquipSkillLearningPoint ? this._actor.getEquipSkillLearningPoint(skill.id) +"/"+ this.equipSkillLearnSkill(skill) : '';
    };

    const _Window_SkillList_drawItem = Window_SkillList.prototype.drawItem;
    Window_SkillList.prototype.drawItem = function(index) {
        _Window_SkillList_drawItem.call(this, index);
        const skill = this.itemAt(index);
        const actor = this._actor;
        if (!actor.isEquipSkillLearning(skill.id) && skill.meta.EquipSkillLearningPoint && Number(skill.meta.EquipSkillLearningPoint) > 0) {
            const rect = this.itemLineRect(index);
            if (!this._equipSkillLearning[index]) {
                const width = (EquipSkillLearningGaugeWidth > 0 ? Math.min(rect.width, EquipSkillLearningGaugeWidth) : rect.width) - EquipSkillLearningGaugeX;
                const sprite = new Sprite_EquipSkillLearningGauge(width);
                this._contentsBackSprite.addChild(sprite);
                this._equipSkillLearning[index] = sprite;
            }
            this._equipSkillLearning[index].setup(actor, 'n_skill', skill);
            this._equipSkillLearning[index].move(rect.x + EquipSkillLearningGaugeX, rect.y + EquipSkillLearningGaugeY);
            this._equipSkillLearning[index].show();
        }
    };

    function Sprite_EquipSkillLearningGauge() {
        this.initialize(...arguments);
    }
      
    Sprite_EquipSkillLearningGauge.prototype = Object.create(Sprite_Gauge.prototype);
    Sprite_EquipSkillLearningGauge.prototype.constructor = Sprite_EquipSkillLearningGauge;
      
    Sprite_EquipSkillLearningGauge.prototype.initialize = function(width) {
        this._skillId = 0;
        this._maxEquipSkillLearningPoint = 0;
        this._gaugeWidth = width;
        Sprite_Gauge.prototype.initialize.call(this);
    };

    Sprite_EquipSkillLearningGauge.prototype.setup = function(battler, statusType, skill) {
        this._skillId = skill.id;
        this._maxEquipSkillLearningPoint = skill.meta.EquipSkillLearningPoint ? Number(skill.meta.EquipSkillLearningPoint) : 0;
        Sprite_Gauge.prototype.setup.call(this, battler, statusType);
    };

    Sprite_EquipSkillLearningGauge.prototype.bitmapWidth = function() {
        return this._gaugeWidth;
    };

    const _Sprite_Gauge_currentValue = Sprite_Gauge.prototype.currentValue;
    Sprite_Gauge.prototype.currentValue = function() {
        if (this._battler && this._statusType === 'n_skill') {
            return this._battler.getEquipSkillLearningPoint(this._skillId);
        } else {
            return _Sprite_Gauge_currentValue.call(this);
        }
    };
    
    const _Sprite_Gauge_currentMaxValue = Sprite_Gauge.prototype.currentMaxValue;
    Sprite_Gauge.prototype.currentMaxValue = function() {
        if (this._battler && this._statusType === 'n_skill') {
            return this._maxEquipSkillLearningPoint;
        } else {
            return _Sprite_Gauge_currentMaxValue.call(this);
        }
    };

    Sprite_EquipSkillLearningGauge.prototype.gaugeColor1 = function() {
        return NuunManager.getColorCode(EquipSkillLearningGaugeColor1);
    };
    
    Sprite_EquipSkillLearningGauge.prototype.gaugeColor2 = function() {
        return NuunManager.getColorCode(EquipSkillLearningGaugeColor2);
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
        if (Imported.NUUN_Result || !EquipSkillLearningResultShow) {
            return;
        }
        const equipSkillLearningPoint = this._rewards.equipSkillLearningPoint;
        if (equipSkillLearningPoint > 0) {
            const text = EquipSkillLearningResult.format(EquipSkillLearningName, equipSkillLearningPoint);
            $gameMessage.add("\\." + text);
        }
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

    
})();