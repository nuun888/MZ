/*:-----------------------------------------------------------------------------------
 * NUUN_RemoveStatesByDamageEX.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc State damage removal extension
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * Extend the "Remove by Damage" state.
 * 
 * State Notes
 * <RemoveByEx:[id]> Sets the specified Remove by damage pattern set in the plugin parameters.
 * [id]:List ID of plugin parameter "Setting to release state by damage"
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 6/24/2023 Ver.1.0.0
 * first edition.
 * 
 * @param RemoveByData
 * @desc Set the release pattern by damage.
 * @text Setting to release state by damage
 * @type struct<RemoveByDataList>[]
 * @default 
 * 
 */
/*~struct~RemoveByDataList:
 * 
 * @param RemoveByName
 * @desc Name.
 * @text Name
 * @type string
 * @default
 * 
 * @param RemoveByTrigger
 * @desc Damage release trigger.
 * @text Damage release trigger
 * @type select[]
 * @option Skill damage
 * @value Physical
 * @option Magic damage
 * @value Magical
 * @option Certain hit damage
 * @value Certain
 * @option Specified skill damage (1)
 * @value Skill
 * @default ["Physical"]
 * 
 * @param RemoveByRate
 * @text Damage release rate
 * @desc Release rate
 * @type number
 * @default 100
 * @min 0
 * 
 * @param RemoveByDamage
 * @desc Specify the condition by damage.
 * @text Damage condition
 * @type struct<RemoveByDamageList>
 * @default 
 * 
 * @param RemoveBySkills
 * @desc Set the skill for which the state is to be released. (Multiple settings possible)
 * @text State release skills (1)
 * @type skill[]
 * @default 
 * 
 */
/*~struct~RemoveByDamageList:
 * 
 * @param Mode
 * @desc Specifies the processing mode.
 * @text processing mode
 * @type select
 * @option Fixed value
 * @value 'Fixed value'
 * @option Rate
 * @value 'Rate'
 * @default 'Fixed value'
 * 
 * @param DamageValue
 * @text Value condition
 * @desc value. Fixed value is greater than or equal to value. The ratio is greater than or equal to the maximum HP ratio.
 * @type number
 * @default 0
 * @min 0
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc ステートダメージ解除拡張
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * ステートのダメージで解除を拡張します。
 * 
 * ステートのメモ欄
 * <RemoveByEx:[id]> プラグインパラメータで設定した指定のダメージで解除パターンを設定します。
 * [id]:プラグインパラメータ[ダメージで解除設定]のリストID
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/6/24 Ver.1.0.0
 * 初版
 * 
 * @param RemoveByData
 * @desc ダメージで解除のパターンを設定をします。
 * @text ダメージで解除設定
 * @type struct<RemoveByDataList>[]
 * @default 
 * 
 */
/*~struct~RemoveByDataList:ja
 * 
 * @param RemoveByName
 * @desc 識別名。
 * @text 識別名
 * @type string
 * @default
 * 
 * @param RemoveByTrigger
 * @desc ダメージの解除トリガー。
 * @text ダメージ解除トリガー
 * @type select[]
 * @option 特技ダメージ
 * @value Physical
 * @option 魔法ダメージ
 * @value Magical
 * @option 必中ダメージ
 * @value Certain
 * @option 指定のスキルダメージ(1)
 * @value Skill
 * @default ["Physical"]
 * 
 * @param RemoveByRate
 * @text ダメージ解除率
 * @desc 解除率
 * @type number
 * @default 100
 * @min 0
 * 
 * @param RemoveByDamage
 * @desc ダメージで条件を指定します。
 * @text ダメージ条件
 * @type struct<RemoveByDamageList>
 * @default 
 * 
 * @param RemoveBySkills
 * @desc 解除対象となるスキルを設定します。(複数設定可能)
 * @text 解除対象スキル(1)
 * @type skill[]
 * @default 
 * 
 */
/*~struct~RemoveByDamageList:ja
 * 
 * @param Mode
 * @desc 処理モードを指定します。
 * @text 処理モード
 * @type select
 * @option 固定値
 * @value 'Fixed value'
 * @option 割合
 * @value 'Rate'
 * @default 'Fixed value'
 * 
 * @param DamageValue
 * @text 値条件
 * @desc 値。固定値の場合は指定の数位以上のダメージ。割合の場合は最大HPの割合以上のダメージ。
 * @type number
 * @default 0
 * @min 0
 * 
 */

var Imported = Imported || {};
Imported.NUUN_BattleAnimationEX = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_RemoveStatesByDamageEX');
    const RemoveByData = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['RemoveByData'])) : [];
    let damage = 0;

    const _Game_Battler_onDamage = Game_Battler.prototype.onDamage;
    Game_Battler.prototype.onDamage = function(value) {
        damage = value;
        _Game_Battler_onDamage.call(this, value);
    };

    const _Game_Battler_removeStatesByDamage = Game_Battler.prototype.removeStatesByDamage;
    Game_Battler.prototype.removeStatesByDamage = function() {
        for (const state of this.states()) {
            this.removeStatesByDamageEx(state);
        }
        _Game_Battler_removeStatesByDamage.call(this);
    };

    Game_Battler.prototype.removeStatesByDamageEx = function(state) {
        if (state.meta.RemoveByEx) {
            const data = getRemoveBydata(state);
            if (data && this.isRemoveByTriggeres(data) && Math.randomInt(100) < data.RemoveByRate && this.isRemoveByDamage(data)) {
                this.removeState(state.id);
            }
        }
        _Game_Battler_removeStatesByDamage.call(this);
    };

    Game_Battler.prototype.isRemoveByTriggeres = function(data) {
        return data.RemoveByTrigger.some(trigger => this.isRemoveByTrigger(data, trigger));
    };

    Game_Battler.prototype.isRemoveByTrigger = function(data, trigger) {
        switch (trigger) {
            case "Physical":
                return BattleManager._action.isPhysical();
            case "Magical":
                return BattleManager._action.isMagical();
            case "Certain":
                return BattleManager._action.isCertainHit();
            case 'Skill':
                return BattleManager._action.isSkill() && BattleManager._action.isSkillRemove(data);
        }
        return false;
    };

    Game_Battler.prototype.isRemoveByDamage = function(data) {
        const removeByDamage = data.RemoveByDamage;
        if (!removeByDamage || removeByDamage.DamageValue === 0) {
            return true;
        }
        if (removeByDamage.Mode === 'Fixed value') {
            return damage > removeByDamage.DamageValue;
        } else if (removeByDamage.Mode === 'Rate') {
            return (damage / this._hp) * 100 > removeByDamage.DamageValue;
        }
    };

    Game_Action.prototype.isSkillRemove = function(data) {
        return data.RemoveBySkills.some(skill => skill === this.item().id);
    };

    function getRemoveBydata(state) {
        const data = state.meta.RemoveByEx;
        if (!data) {
            return null;
        } else if (isNaN(data)) {
            return RemoveByData[getRemoveByNameIndex(data)];
        } else {
            return RemoveByData[Number(state.meta.RemoveByEx) - 1];
        }
    };

    function getRemoveByNameIndex(name) {
        return RemoveByData.findIndex(data => data.CounterName === name);
    };
    
})();