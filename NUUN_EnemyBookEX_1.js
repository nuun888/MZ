/*:-----------------------------------------------------------------------------------
 * NUUN_EnemyBookEX_1.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Resistance Display Mask (NUUN_EnemyBook Expansion)
 * @author NUUN
 * @version 1.1.0
 * @base NUUN_EnemyBook
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_EnemyBook
 * @orderAfter NUUN_MultiElement
 * 
 * @help
 * The display of attributes, states, and debuff resistance invalid weaknesses in the monster encyclopedia will only display attributes, states, and debuffs that have been received.
 * 
 * This plug-in is an extended function of Monster Encyclopedia (NUUN_EnemyBook).
 * This plugin requires "NUUN_Base" Ver.1.6.9 or later.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 5/27/2025 Ver.1.1.0
 * Added a function that allows you to specify the timing for registering resistances and weaknesses.
 * 7/1/2023 Ver.1.0.2
 * Correction of processing regarding the addition of multiple attribute functions.
 * 11/17/2021 Ver.1.0.1
 * Changed handling of getting multiple attributes.
 * 8/13/2021 Ver.1.0.0
 * First edition.
 * 
 * @param RegistrationTiming
 * @desc Set how resistances and weaknesses are registered.
 * @text Resistance and weakness registration settings
 * @type struct<RegistrationTimingList>[]
 * @default ["{\"RegistrationTiming\":\"0\"}"]
 * 
 */
/*~struct~RegistrationTimingList:
 * 
 * @param RegistrationTiming
 * @text Registration timing
 * @desc Timing for registering resistances and weaknesses. Multiple settings can be specified.
 * @type select
 * @option Applicable
 * @value 0
 * @option Defeated(All registrations)
 * @value 1
 * @option Analysis(All registrations)
 * @value 2
 * @default 0
 * 
 * 
 */
/*:
 * @target MZ
 * @plugindesc 耐性表示マスク（モンスター図鑑拡張）
 * @author NUUN
 * @version 1.1.0
 * @base NUUN_EnemyBook
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_EnemyBook
 * @orderAfter NUUN_MultiElement
 * 
 * @help
 * モンスター図鑑の属性、ステート、デバフ耐性無効弱点の表示を、受けた事のある属性、ステート、デバフのみ表示するようにします。
 * 
 * このプラグインはモンスター図鑑（NUUN_EnemyBook）の拡張機能です。
 * このプラグインはNUUN_Base Ver.1.6.9以降が必要です。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2025/5/27 Ver.1.1.0
 * 耐性、弱点の登録のタイミングを指定できる機能を追加。
 * 2023/7/1 Ver.1.0.2
 * 複数属性機能追加に関しての処理修正。
 * 2021/11/7 Ver.1.0.1
 * 複数属性取得に関しての処理の変更。
 * 2021/8/13 Ver.1.0.0
 * 初版
 * 
 * @param RegistrationTiming
 * @desc 耐性、弱点の登録方法を設定します。
 * @text 耐性、弱点登録設定
 * @type struct<RegistrationTimingList>[]
 * @default ["{\"RegistrationTiming\":\"0\"}"]
 * 
 */
/*~struct~RegistrationTimingList:ja
 * 
 * @param RegistrationTiming
 * @text 登録タイミング
 * @desc 耐性、弱点の登録タイミング。複数指定できます。
 * @type select
 * @option 該当
 * @value 0
 * @option 撃破時(全登録)
 * @value 1
 * @option アナライズ成功時(全登録)
 * @value 2
 * @default 0
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_EnemyBookEX_1 = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    const _Game_Action_calcElementRate = Game_Action.prototype.calcElementRate;
    Game_Action.prototype.calcElementRate = function(target) {
        if (this.item().damage.elementId < 0) {
            this._multiElements = this.subject().attackElements();
        } else {
            this._multiElements = [this.item().damage.elementId];
        }
        const rate = _Game_Action_calcElementRate.call(this, target);
        if (target.isEnemy() && $gameSystem.iconRegistrationTiming(0)) {
            this.enemyBookAttackElementDate(target, this._multiElements);
        }
        return rate;
    };

    Game_Action.prototype.enemyBookAttackElementDate = function(target, element) {
        for (const elementId of element) {
            $gameSystem.setEnemyBookElementFlag(target.enemyId(), elementId, true);
        }
    };


    const _Game_Action_itemEffectAddState = Game_Action.prototype.itemEffectAddState;
    Game_Action.prototype.itemEffectAddState = function(target, effect) {
        _Game_Action_itemEffectAddState.call(this, target, effect);
        if (target.isEnemy() && $gameSystem.iconRegistrationTiming(0)) {
            if (effect.dataId === 0) {
                this.enemyBookAttackStateDate(target);
            } else {
                $gameSystem.setEnemyBookStateFlag(target.enemyId(), effect.dataId, true);
            }
        }
    };

    Game_Action.prototype.enemyBookAttackStateDate = function(target) {
        for (const stateId of this.subject().attackStates()) {
            $gameSystem.setEnemyBookStateFlag(target.enemyId(), stateId, true);
        }
    };


    const _Game_Action_itemEffectAddDebuff = Game_Action.prototype.itemEffectAddDebuff;
    Game_Action.prototype.itemEffectAddDebuff = function(target, effect) {
        _Game_Action_itemEffectAddDebuff.call(this, target, effect);
        if (target.isEnemy() && $gameSystem.iconRegistrationTiming(0)) {
            $gameSystem.setEnemyBookDebuffFlag(target.enemyId(), effect.dataId, true);
        }
    };

    const _Game_BattlerBase_dieSetEnemyBook = Game_BattlerBase.prototype.dieSetEnemyBook;
    Game_BattlerBase.prototype.dieSetEnemyBook = function() {
        const enemyId = this.enemyId();
        _Game_BattlerBase_dieSetEnemyBook.apply(this, arguments);
        if ($gameSystem.iconRegistrationTiming(1)) {
            $gameSystem.iconAllRegistration(this.enemyId());
        }
    };

    const _Game_Action_successAnalyze = Game_Action.prototype.successAnalyze;
    Game_Action.prototype.successAnalyze = function(target) {
        _Game_Action_successAnalyze.apply(this, arguments);
        if ($gameSystem.iconRegistrationTiming(2)) {
            $gameSystem.iconAllRegistration(target.enemyId());
        }
    };

    Game_System.prototype.iconAllRegistration = function(id) {
        this.enemyBookElementList(id, 0, false, true);
        this.enemyBookStateList(id, 0, false, true);
        this.enemyBookDebuffList(id, 0, false, true);
    };

    Game_System.prototype.iconRegistrationTiming = function(mode) {
        return params.RegistrationTiming.some(data => data.RegistrationTiming === mode);
    };

})();