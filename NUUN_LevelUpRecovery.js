/*:-----------------------------------------------------------------------------------
 * NUUN_ItemOverallEffect.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Recovery at level up
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * Restores specified stats when leveling up.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 7/8/2023 Ver.1.0.0
 * first edition.
 * 
 * @param LevelUpRecoveryData
 * @desc Set the recovery when leveling up.
 * @text Level up recovery settings
 * @type struct<LevelUpRecoveryList>[]
 * @default ["{\"LevelUpRecovery\":\"'HpRecovery'\",\"LevelUpFormula\":\"\",\"LevelUpStateRecovery\":\"[]\"}","{\"LevelUpRecovery\":\"'MpRecovery'\",\"LevelUpFormula\":\"\",\"LevelUpStateRecovery\":\"[]\"}","{\"LevelUpRecovery\":\"'StateRecovery'\",\"LevelUpFormula\":\"\",\"LevelUpStateRecovery\":\"[]\"}"]
 * 
 */
/*~struct~LevelUpRecoveryList:
 * 
 * @param LevelUpRecovery
 * @desc Specifies the recovery target when leveling up.
 * @text Recovery target when leveling up
 * @type select
 * @option HpRecovery
 * @value 'HpRecovery'
 * @option MpRecovery
 * @value 'MpRecovery'
 * @option TpRecovery
 * @value 'TpRecovery'
 * @option Full recovery of user parameters(1)
 * @value 'UserRecovery'
 * @option State recovery(2)
 * @value 'StateRecovery'
 * @default
 * 
 * @param LevelUpFormula
 * @desc Enter the processing of recovery at the time of level up in Javascript.
 * @text Evaluation formula(1)
 * @type combo
 * @option "this._hp = this.mhp"
 * @option "this._mp = this.mmp"
 * @option "this._tp = 100"
 * @default 
 * 
 * @param LevelUpStateRecovery
 * @desc Sets the state to recover. If not set, all states will be recovered.
 * @text State setting(2)
 * @type state[]
 * @default []
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc レベルアップ時回復
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * レベルアップ時に指定の能力値を回復します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/7/8 Ver.1.0.0
 * 初版
 * 
 * @param LevelUpRecoveryData
 * @desc レベルアップ時の回復の設定をします。
 * @text レベルアップ時回復設定
 * @type struct<LevelUpRecoveryList>[]
 * @default ["{\"LevelUpRecovery\":\"'HpRecovery'\",\"LevelUpFormula\":\"\",\"LevelUpStateRecovery\":\"[]\"}","{\"LevelUpRecovery\":\"'MpRecovery'\",\"LevelUpFormula\":\"\",\"LevelUpStateRecovery\":\"[]\"}","{\"LevelUpRecovery\":\"'StateRecovery'\",\"LevelUpFormula\":\"\",\"LevelUpStateRecovery\":\"[]\"}"]
 * 
 */
/*~struct~LevelUpRecoveryList:ja
 * 
 * @param LevelUpRecovery
 * @desc レベルアップ時の回復対象を指定します。
 * @text レベルアップ時回復対象
 * @type select
 * @option HP全回復
 * @value 'HpRecovery'
 * @option MP全回復
 * @value 'MpRecovery'
 * @option TP全回復
 * @value 'TpRecovery'
 * @option ユーザーパラメータ全回復(1)
 * @value 'UserRecovery'
 * @option ステート回復(2)
 * @value 'StateRecovery'
 * @default
 * 
 * @param LevelUpFormula
 * @desc レベルアップ時の回復の処理をJavascriptで記入します。
 * @text 評価式(1)
 * @type combo
 * @option "this._hp = this.mhp"
 * @option "this._mp = this.mmp"
 * @option "this._tp = 100"
 * @default 
 * 
 * @param LevelUpStateRecovery
 * @desc 回復するステートを設定します。未設定の場合は全てのステートを回復します。
 * @text ステート設定(2)
 * @type state[]
 * @default []
 * 
 */

var Imported = Imported || {};
Imported.NUUN_LevelUpRecovery = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_LevelUpRecovery');
    const LevelUpRecoveryData = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['LevelUpRecoveryData'])) : [];

    const _Game_Actor_levelUp = Game_Actor.prototype.levelUp;
    Game_Actor.prototype.levelUp = function() {
        _Game_Actor_levelUp.call(this);
        this.levelUpRecovery();
    };

    Game_Actor.prototype.levelUpRecovery = function() {
        for (const data of LevelUpRecoveryData) {
            switch (data.LevelUpRecovery) {
                case 'HpRecovery':
                    this.levelUpHpRecovery(data);
                    break;
                case 'MpRecovery':
                    this.levelUpMpRecovery(data);
                    break;
                case 'TpRecovery':
                    this.levelUpTpRecovery(data);
                    break;
                case 'UserRecovery':
                    this.levelUpUserRecovery(data);
                    break;
                case 'StateRecovery':
                    this.levelUpStateRecovery(data);
                    break;
            }
        }
    };

    Game_Actor.prototype.levelUpHpRecovery = function() {
        this._hp = this.mhp;
    };

    Game_Actor.prototype.levelUpMpRecovery = function() {
        this._mp = this.mmp;
    };

    Game_Actor.prototype.levelUpTpRecovery = function() {
        this._tp = 100;
    };

    Game_Actor.prototype.levelUpUserRecovery = function(data) {
        eval(data.LevelUpFormula);
    };

    Game_Actor.prototype.levelUpStateRecovery = function(data) {
        if (data.LevelUpStateRecovery && data.LevelUpStateRecovery.length > 0) {
            for (const state of data.LevelUpStateRecovery) {
                this.removeState(state);
            }
        } else {
            this.clearStates();
        }
    };
    
    
})();