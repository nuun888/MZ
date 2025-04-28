/*:-----------------------------------------------------------------------------------
 * NUUN_EnemyLevel.js
 * 
 * Copyright (C) 2024 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc Enemy Level
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @author NUUN
 * @version 1.1.2
 * 
 * @help
 * Sets the enemy's level.
 * 
 * Required
 * Enemy's notes
 * <EnemyLevel:[Id]> This is the setting to apply the enemy level. Please be sure to fill it in.
 * [Id]:Enter the ID or name for the enemy level setting.
 * 
 * Arbitrary
 * Enemy's notes
 * <Level:[level], [variance]> You will start the battle at the specified level.
 * [level]:Level
 * [variance]:Variance
 * <EnemyLevelLearnSkill[skillId]:[minlevel],[maxLevel]> If the enemy level is between [minlevel] and [maxLevel], [skillId] will be added to the enemy's actions.
 * [maxLevel] can be omitted. In that case, if the enemy's level is [minlevel] or higher, [skillId] will be added to the enemy's action.
 * [skillId]:Skill Id
 * [minlevel]:Acquisition Level
 * [maxLevel]:Forgetting level
 * <EnemyLevelLearnSkill6:13> Skill ID 6 is added to enemy actions when the skill level is 13 or higher.
 * <EnemyLevelLearnSkill15:10,18> Skill ID 15 is added to enemy actions when the skill is between level 10 and level 18.
 * 
 * Map notes
 * <MapEnemyLevel[EnemyId]:[level], [variance]> You will start the battle at the specified level.
 * [EnemyId]:Ennemy level
 * [level]:Level
 * [variance]:Variance
 * 
 * The priority applied is
 * Enemy memo field > List data enemy level variable level > Overall enemy level variable level > Map level
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 4/28/2025 Ver.1.1.2
 * Fixed an issue where an error would occur when starting at a specified level.
 * Fixed an issue where an error would occur if "NUUN_EnemyBook" was installed.
 * 4/23/2025 Ver.1.1.1
 * Fixed an issue where an error would occur when starting a battle.
 * 12/16/2024 Ver.1.1.0
 * Fixed to display enemy levels in names.
 * 12/7/2024 Ver.1.0.1
 * Added the ability to disable level status and dispersion in the enemy book.
 * 11/9/2024 Ver.1.0.0
 * First edition.
 * 
 * @param EnemyLevelData
 * @desc Sets the enemy level.
 * @text Enemy level setting
 * @type struct<EnemyLevelDataList>[]
 * @default []
 * 
 * @param MaxLevel
 * @desc Max enemy level.
 * @text Maximum Level
 * @type number
 * @default 99
 * 
 * @param LevelName
 * @desc The level display name to be added to the enemy name. Leave blank for no display.
 * @text Enemy name level display name
 * @type string
 * @default Level
 * 
 * @param VariableSetting
 * @text Variable settings
 * @default ------------------------------
 * 
 * @param EnemyLevelVariable
 * @desc Variable to store the overall enemy level
 * @text Overall enemy level variable
 * @type variable
 * @default 0
 * @parent VariableSetting
 * 
 * @param EnemyBookSetting
 * @text Enemy book setting
 * @default ------------------------------
 * 
 * @param EnemyBookNoMapLevel
 * @type boolean
 * @default true
 * @text Enemy book map setting level invalid
 * @desc Disables the map setting level in the enemy book (NUUN_EnemyBook).
 * @parent OtherSetting
 * 
 * @param EnemyBookNoVariance
 * @type boolean
 * @default true
 * @text Enemy book Dispersion Ignored
 * @desc Disables the dispersion in the enemy book (NUUN_EnemyBook).
 * @parent OtherSetting
 * 
 */
/*~struct~EnemyLevelDataList:
 *
 * @param Name
 * @desc Name
 * @text Name
 * @type string
 * @default 
 * 
 * @param HpSetting
 * @text HP settings
 * @default ------------------------------
 * 
 * @param FixedHpIncrease
 * @desc Enter the fixed increase in HP per level.
 * @text Fixed HP increase
 * @type number
 * @default 50
 * @parent HpSetting
 * 
 * @param HpIncreaseRate
 * @desc Enter the percentage increase in HP per level.
 * @text HP increase percentage value.
 * @type number
 * @default 100
 * @parent HpSetting
 * 
 * @param MpSetting
 * @text MP settings
 * @default ------------------------------
 * 
 * @param FixedMpIncrease
 * @desc Enter the fixed increase in MP per level.
 * @text Fixed MP increase
 * @type number
 * @default 10
 * @parent MpSetting
 * 
 * @param MpIncreaseRate
 * @desc Enter the percentage increase in MP per level.
 * @text MP increase percentage value.
 * @type number
 * @default 100
 * @parent MpSetting
 * 
 * @param AtkSetting
 * @text Attack setting
 * @default ------------------------------
 * 
 * @param FixedAtkIncrease
 * @desc Enter the fixed increase in attack per level.
 * @text Fixed attack increase
 * @type number
 * @default 2
 * @parent AtkSetting
 * 
 * @param AtkIncreaseRate
 * @desc Enter the percentage increase in attack per level.
 * @text Attack increase percentage value
 * @type number
 * @default 100
 * @parent AtkSetting
 * 
 * @param DefSetting
 * @text Defense setting
 * @default ------------------------------
 * 
 * @param FixedDefIncrease
 * @desc Enter the fixed increase in defense per level.
 * @text Fixed defense increase
 * @type number
 * @default 2
 * @parent DefSetting
 * 
 * @param DefIncreaseRate
 * @desc Enter the percentage increase in defense per level.
 * @text Defense increase percentage value
 * @type number
 * @default 100
 * @parent DefSetting
 * 
 * @param MatSetting
 * @text Magic setting
 * @default ------------------------------
 * 
 * @param FixedMatIncrease
 * @desc Enter the fixed increase in magic per level.
 * @text Fixed magic increase
 * @type number
 * @default 2
 * @parent MatSetting
 * 
 * @param MatIncreaseRate
 * @desc Enter the percentage increase in magic per level.
 * @text Magic increase percentage value
 * @type number
 * @default 100
 * @parent MatSetting
 * 
 * @param MdfSetting
 * @text Magic defense setting
 * @default ------------------------------
 * 
 * @param FixedMdfIncrease
 * @desc Enter the fixed increase in magic defense per level.
 * @text Fixed magic defense increase
 * @type number
 * @default 2
 * @parent MdfSetting
 * 
 * @param MdfIncreaseRate
 * @desc Enter the percentage increase in magic defense per level.
 * @text Magic defense increase percentage value
 * @type number
 * @default 100
 * @parent MdfSetting
 * 
 * @param AgiSetting
 * @text Agile setting
 * @default ------------------------------
 * 
 * @param FixedAgiIncrease
 * @desc Enter the fixed increase in agile per level.
 * @text Fixed agile increase
 * @type number
 * @default 2
 * @parent AgiSetting
 * 
 * @param AgiIncreaseRate
 * @desc Enter the percentage increase in agile per level.
 * @text Agile increase percentage value
 * @type number
 * @default 100
 * @parent AgiSetting
 * 
 * @param LukSetting
 * @text Luck setting
 * @default ------------------------------
 * 
 * @param FixedLukIncrease
 * @desc Enter the fixed increase in luck per level.
 * @text Fixed luck increase
 * @type number
 * @default 2
 * @parent LukSetting
 * 
 * @param LukIncreaseRate
 * @desc Enter the percentage increase in luck per level.
 * @text Luck increase percentage value
 * @type number
 * @default 100
 * @parent LukSetting
 * 
 * @param ExpSetting
 * @text Experience points setting
 * @default ------------------------------
 * 
 * @param FixedExpIncrease
 * @desc Enter the fixed increase in experience points per level.
 * @text Fixed experience points Increase
 * @type number
 * @default 10
 * @parent ExpSetting
 * 
 * @param ExpIncreaseRate
 * @desc Enter the percentage increase in experience points per level.
 * @text Experience points increase percentage value
 * @type number
 * @default 100
 * @parent ExpSetting
 * 
 * @param GoldSetting
 * @text Gold setting
 * @default ------------------------------
 * 
 * @param FixedGoldIncrease
 * @desc Enter the fixed increase in gold per level.
 * @text Fixed gold Increase
 * @type number
 * @default 10
 * @parent GoldSetting
 * 
 * @param GoldIncreaseRate
 * @desc Enter the percentage increase in gold per level.
 * @text Gold increase percentage value
 * @type number
 * @default 100
 * @parent GoldSetting
 * 
 * @param VariableSetting
 * @text Variable settings
 * @default ------------------------------
 * 
 * @param EnemyLevelVariable
 * @desc Variable to store enemy level
 * @text Enemy Level Variable
 * @type variable
 * @default 0
 * @parent VariableSetting
 * 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 敵レベル
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @author NUUN
 * @version 1.1.2
 * 
 * @help
 * 敵にレベルを設定します。
 * 
 * 必須
 * 敵のメモ欄
 * <EnemyLevel:[Id]> 敵レベルを適用する設定です。必ず記入して下さい。
 * [Id]:敵レベル設定のID又は識別名を記入します。
 * 
 * 任意
 * 敵のメモ欄
 * <Level:[level], [variance]> 戦闘開始時に指定のレベルで開始します。
 * [level]:レベル
 * [variance]:分散度
 * <EnemyLevelLearnSkill[skillId]:[minlevel],[maxLevel]> 敵のレベルが[minlevel]以上[maxLevel]以下なら[skillId]が敵の行動に追加されます。
 * [maxLevel]は省略できます。その場合、敵のレベルが[minlevel]以上なら[skillId]が敵の行動に追加されます。
 * [skillId]:スキルID
 * [minlevel]:習得レベル
 * [maxLevel]:忘却レベル
 * <EnemyLevelLearnSkill6:13> スキルID6番のスキルはレベルが13以上の時に敵の行動に追加されます。
 * <EnemyLevelLearnSkill15:10,18> スキルID15番のスキルはレベルが10以上でレベルが18以下の時に敵の行動に追加されます。
 * 
 * マップのメモ欄
 * <MapEnemyLevel[EnemyId]:[level], [variance]> 戦闘開始時に指定のレベルで開始します。
 * [EnemyId]:敵ID
 * [level]:レベル
 * [variance]:分散度
 * 
 * 適用される優先度は
 * 敵のメモ欄 > リストデータの敵レベル変数のレベル > 全体の敵レベル変数のレベル > マップで設定したレベル
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2025/4/28 Ver 1.1.2
 * 指定のレベルで開始させるとエラーが出る問題を修正。
 * NUUN_EnemyBookを導入している場合、エラーが出る問題を修正。
 * 2025/4/23 Ver 1.1.1
 * 戦闘開始時にエラーが出る問題を修正。
 * 2024/12/16 Ver 1.1.0
 * 敵名にレベルを表示出来るように修正。
 * 2024/12/7 Ver 1.0.1
 * モンスター図鑑でレベルステータス、分散を無効にする機能を追加。
 * 2024/11/9 Ver 1.0.0
 * 初版
 * 
 * @param EnemyLevelData
 * @desc 敵レベルの設定を行います。
 * @text 敵レベル設定
 * @type struct<EnemyLevelDataList>[]
 * @default []
 * 
 * @param MaxLevel
 * @desc 敵の最大レベル。
 * @text 最大レベル
 * @type number
 * @default 99
 * 
 * @param LevelName
 * @desc 敵名の後につけるレベル表示名。指定の文字の後にレベル数が追加されます。空白で表示なし
 * @text 敵名後レベル表示名
 * @type string
 * @default Level
 * 
 * @param VariableSetting
 * @text 変数設定
 * @default ------------------------------
 * 
 * @param EnemyLevelVariable
 * @desc 全体での敵レベルを格納する変数
 * @text 全体敵レベル変数
 * @type variable
 * @default 0
 * @parent VariableSetting
 * 
 * @param EnemyBookSetting
 * @text モンスター図鑑設定
 * @default ------------------------------
 * 
 * @param EnemyBookNoMapLevel
 * @type boolean
 * @default true
 * @text モンスター図鑑マップ設定レベル無効
 * @desc モンスター図鑑(NUUN_EnemyBook)でのマップ設定レベルを無効にします。
 * @parent OtherSetting
 * 
 * @param EnemyBookNoVariance
 * @type boolean
 * @default true
 * @text モンスター図鑑分散無効
 * @desc モンスター図鑑(NUUN_EnemyBook)での分散度を無効にします。
 * @parent OtherSetting
 * 
 */
/*~struct~EnemyLevelDataList:ja
 *
 * @param Name
 * @desc 識別名
 * @text 識別名
 * @type string
 * @default 
 * 
 * @param HpSetting
 * @text HP設定
 * @default ------------------------------
 * 
 * @param FixedHpIncrease
 * @desc 1レベルごとのHPの固定増加値を記入します。
 * @text HP増加固定値
 * @type number
 * @default 50
 * @parent HpSetting
 * 
 * @param HpIncreaseRate
 * @desc 1レベルごとのHPの増加割合値を記入します。
 * @text HP増加割合値
 * @type number
 * @default 100
 * @parent HpSetting
 * 
 * @param MpSetting
 * @text MP設定
 * @default ------------------------------
 * 
 * @param FixedMpIncrease
 * @desc 1レベルごとのMPの固定増加値を記入します。
 * @text MP増加固定値
 * @type number
 * @default 10
 * @parent MpSetting
 * 
 * @param MpIncreaseRate
 * @desc 1レベルごとのMPの増加割合値を記入します。
 * @text MP増加割合値
 * @type number
 * @default 100
 * @parent MpSetting
 * 
 * @param AtkSetting
 * @text 攻撃力設定
 * @default ------------------------------
 * 
 * @param FixedAtkIncrease
 * @desc 1レベルごとの攻撃力の固定増加値を記入します。
 * @text 攻撃力増加固定値
 * @type number
 * @default 2
 * @parent AtkSetting
 * 
 * @param AtkIncreaseRate
 * @desc 1レベルごとの攻撃力の増加割合値を記入します。
 * @text 攻撃力増加割合値
 * @type number
 * @default 100
 * @parent AtkSetting
 * 
 * @param DefSetting
 * @text 防御力設定
 * @default ------------------------------
 * 
 * @param FixedDefIncrease
 * @desc 1レベルごとの防御力の固定増加値を記入します。
 * @text 防御力増加固定値
 * @type number
 * @default 2
 * @parent DefSetting
 * 
 * @param DefIncreaseRate
 * @desc 1レベルごとの防御力の増加割合値を記入します。
 * @text 防御力増加割合値
 * @type number
 * @default 100
 * @parent DefSetting
 * 
 * @param MatSetting
 * @text 魔法力設定
 * @default ------------------------------
 * 
 * @param FixedMatIncrease
 * @desc 1レベルごとの魔法力の固定増加値を記入します。
 * @text 魔法力増加固定値
 * @type number
 * @default 2
 * @parent MatSetting
 * 
 * @param MatIncreaseRate
 * @desc 1レベルごとの魔法力の増加割合値を記入します。
 * @text 魔法力増加割合値
 * @type number
 * @default 100
 * @parent MatSetting
 * 
 * @param MdfSetting
 * @text 魔法防御設定
 * @default ------------------------------
 * 
 * @param FixedMdfIncrease
 * @desc 1レベルごとの魔法防御の固定増加値を記入します。
 * @text 魔法防御増加固定値
 * @type number
 * @default 2
 * @parent MdfSetting
 * 
 * @param MdfIncreaseRate
 * @desc 1レベルごとの魔法防御の増加割合値を記入します。
 * @text 魔法防御増加割合値
 * @type number
 * @default 100
 * @parent MdfSetting
 * 
 * @param AgiSetting
 * @text 敏捷性設定
 * @default ------------------------------
 * 
 * @param FixedAgiIncrease
 * @desc 1レベルごとの敏捷性の固定増加値を記入します。
 * @text 敏捷性増加固定値
 * @type number
 * @default 2
 * @parent AgiSetting
 * 
 * @param AgiIncreaseRate
 * @desc 1レベルごとの敏捷性の増加割合値を記入します。
 * @text 敏捷性増加割合値
 * @type number
 * @default 100
 * @parent AgiSetting
 * 
 * @param LukSetting
 * @text 運設定
 * @default ------------------------------
 * 
 * @param FixedLukIncrease
 * @desc 1レベルごとの運の固定増加値を記入します。
 * @text 運増加固定値
 * @type number
 * @default 2
 * @parent LukSetting
 * 
 * @param LukIncreaseRate
 * @desc 1レベルごとの運の増加割合値を記入します。
 * @text 運増加割合値
 * @type number
 * @default 100
 * @parent LukSetting
 * 
 * @param ExpSetting
 * @text 経験値設定
 * @default ------------------------------
 * 
 * @param FixedExpIncrease
 * @desc 1レベルごとの経験値の固定増加値を記入します。
 * @text 経験値増加固定値
 * @type number
 * @default 10
 * @parent ExpSetting
 * 
 * @param ExpIncreaseRate
 * @desc 1レベルごとの経験値の増加割合値を記入します。
 * @text 経験値増加割合値
 * @type number
 * @default 100
 * @parent ExpSetting
 * 
 * @param GoldSetting
 * @text 金額設定
 * @default ------------------------------
 * 
 * @param FixedGoldIncrease
 * @desc 1レベルごとの金額の固定増加値を記入します。
 * @text 金額増加固定値
 * @type number
 * @default 10
 * @parent GoldSetting
 * 
 * @param GoldIncreaseRate
 * @desc 1レベルごとの金額の増加割合値を記入します。
 * @text 金額増加割合値
 * @type number
 * @default 100
 * @parent GoldSetting
 * 
 * @param VariableSetting
 * @text 変数設定
 * @default ------------------------------
 * 
 * @param EnemyLevelVariable
 * @desc 敵レベルを格納する変数
 * @text 敵レベル変数
 * @type variable
 * @default 0
 * @parent VariableSetting
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_EnemyLevel = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;

    function _getParams(id) {
        if (isNaN(id)) {
            return params.EnemyLevelData.findIndex(data => data.Name === id) + 1;
        } else {
            return Number(id);
        }
    }

    const _Game_Enemy_initMembers = Game_Enemy.prototype.initMembers;
    Game_Enemy.prototype.initMembers = function() {
        _Game_Enemy_initMembers.call(this);
        this._levelData = 0;
        this._level = 1;
    };

    const _Game_Enemy_setup = Game_Enemy.prototype.setup
    Game_Enemy.prototype.setup = function(enemyId, x, y) {
        this.setupLevelData(enemyId);
        this.setupLevel(enemyId);
        _Game_Enemy_setup.apply(this, arguments);
    };

    Game_Enemy.prototype.setupLevelData = function(enemyId) {
        const enemy = $dataEnemies[enemyId];
        if (!enemy) return;
        const dataId = _getParams(NuunManager.getMetaCode(enemy, "EnemyLevel"));
        if (!dataId && !params.EnemyLevelData[dataId - 1]) return;
        this._levelData = dataId;
    };

    Game_Enemy.prototype.setupLevel = function(enemyId) {
        if (this._levelData === 0) return;
        const data = params.EnemyLevelData[this._levelData - 1];
        const enemy = $dataEnemies[enemyId];
        let level = 1;
        if (enemy && enemy.meta.Level) {
            level = this.getIndividualEnemyLevel(enemy);
        } else if (data.EnemyLevelVariable > 0) {
            level = $gameVariables.value(data.EnemyLevelVariable) || 1;
        } else if (params.EnemyLevelVariable > 0) {
            level = $gameVariables.value(params.EnemyLevelVariable) || 1;
        } else {
            level = this.mapEnemyLevel();
        }
        this._level = level.clamp(1, this.maxLevel());
    };

    Game_Enemy.prototype.maxLevel = function() {
        return params.MaxLevel;
    };

    const _Game_Enemy_paramBase = Game_Enemy.prototype.paramBase;
    Game_Enemy.prototype.paramBase = function(paramId) {
        const base = _Game_Enemy_paramBase.apply(this, arguments);
        return base + this.getParamEnemyLevel(base, paramId);
    };

    Game_Enemy.prototype.getParamEnemyLevel = function(base, paramId) {
        if (this._levelData === 0) return 0;
        const data = params.EnemyLevelData[this._levelData - 1];
        
        switch (paramId) {
            case 0:
                return (base * (data.HpIncreaseRate / 100) - base) * (this._level - 1) + data.FixedHpIncrease * (this._level - 1);
            case 1:
                return (base * (data.MpIncreaseRate / 100) - base) * (this._level - 1) + data.FixedMpIncrease * (this._level - 1);
            case 2:
                return (base * (data.AtkIncreaseRate / 100) - base) * (this._level - 1) + data.FixedAtkIncrease * (this._level - 1);
            case 3:
                return (base * (data.DefIncreaseRate / 100) - base) * (this._level - 1) + data.FixedDefIncrease * (this._level - 1);
            case 4:
                return (base * (data.MatIncreaseRate / 100) - base) * (this._level - 1) + data.FixedMdfIncrease * (this._level - 1);
            case 5:
                return (base * (data.MdfIncreaseRate / 100) - base) * (this._level - 1) + data.FixedMatIncrease * (this._level - 1);
            case 6:
                return (base * (data.AgiIncreaseRate / 100) - base) * (this._level - 1) + data.FixedAgiIncrease * (this._level - 1);
            case 7:
                return (base * (data.LukIncreaseRate / 100) - base) * (this._level - 1) + data.FixedLukIncrease * (this._level - 1);
            default:
                break;
        }
    };

    const _Game_Enemy_exp = Game_Enemy.prototype.exp;
    Game_Enemy.prototype.exp = function() {
        const base = _Game_Enemy_exp.apply(this, arguments);
        return base + this.getExpEnemyLevel(base);
    };
    
    const _Game_Enemy_gold = Game_Enemy.prototype.gold;
    Game_Enemy.prototype.gold = function() {
        const base = _Game_Enemy_gold.apply(this, arguments);
        return base + this.getGoldEnemyLevel(base);
    };

    const _Game_Enemy_meetsCondition = Game_Enemy.prototype.meetsCondition;
    Game_Enemy.prototype.meetsCondition = function(action) {
        return _Game_Enemy_meetsCondition.apply(this, arguments) && this.meetsLevelCondition(action);
    };

    Game_Enemy.prototype.meetsLevelCondition = function(action) {
        const tag = "EnemyLevelLearnSkill" + action.skillId;
        const data = NuunManager.getMetaCodeList(this.enemy(), tag);
        if (!data) return true;
        return Number(data[0]) <= this._level && (data[1] ? Number(data[1]) <= this._level : true);
    };

    const _Game_Enemy_allSkillActions = Game_Enemy.prototype.allSkillActions;
    Game_Enemy.prototype.allSkillActions = function(actionList) {
        return _Game_Enemy_allSkillActions.apply(this, arguments).filter(action => this.meetsLevelCondition(action));
    };

    Game_Enemy.prototype.getExpEnemyLevel = function(base) {
        if (this._levelData === 0) return 0;
        const data = params.EnemyLevelData[this._levelData - 1];
        return (base * (data.ExpIncreaseRate / 100) - base) * (this._level - 1) + data.FixedExpIncrease * (this._level - 1);
    };

    Game_Enemy.prototype.getGoldEnemyLevel = function(base) {
        if (this._levelData === 0) return 0;
        const data = params.EnemyLevelData[this._levelData - 1];
        return (base * (data.GoldIncreaseRate / 100) - base) * (this._level - 1) + data.FixedGoldIncrease * (this._level - 1);
    };

    Game_Enemy.prototype.getIndividualEnemyLevel = function(enemy) {
        const data = NuunManager.getMetaCodeList(enemy, "Level");//レベル, 分散度
        if (!data) return 1;
        return this.enemyLevelVariance(Number(data[0]), Number(data[1]));
    };

    Game_Enemy.prototype.mapEnemyLevel = function() {
        if (params.EnemyBookNoMapLevel && this.isEnemybookLevelStatus()) return 1;
        const map = $dataMap;
        if (!map) return 1;
        const tag = 'MapEnemyLevel' + this.enemyId();
        const data = NuunManager.getMetaCodeList(map, tag);//レベル, 分散度
        if (!data) return 1;
        return this.enemyLevelVariance(Number(data[0]), Number(data[1]));
    };

    Game_Enemy.prototype.enemyLevelVariance = function(level, variance = 0) {
        if (params.EnemyBookNoVariance && this.isEnemybookLevelStatus()) return level;
        const amp = Math.floor(Math.max((Math.abs(level) * variance) / 100, 0));
        const v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;
        return level >= 0 ? level + v : level - v;
    };

    Game_Enemy.prototype.isEnemybookLevelStatus = function() {
        if (!Imported.NUUN_EnemyBook) return false;
        if ($gameParty.inBattle() && String(SceneManager._scene.constructor.name) === 'Scene_Battle') {
            return BattleManager.isOpenEnemyBook();
        } else {
            return String(SceneManager._scene.constructor.name) === 'Scene_EnemyBook';
        }
    };

    const _Game_Enemy_name = Game_Enemy.prototype.name;
    Game_Enemy.prototype.name = function() {
        return _Game_Enemy_name.apply(this, arguments) + this.getNameLevel();
    };

    Game_Enemy.prototype.getNameLevel = function() {
        return this.enemy().meta.EnemyLevel && !!params.LevelName ? " "+ params.LevelName + String(this._level) : "";
    };

 
})();