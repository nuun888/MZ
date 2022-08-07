/*:-----------------------------------------------------------------------------------
 * NUUN_KeepRestrictedTPB.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc 行動制限TPB初期化無効ステート
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * 通常は行動制限があるステートにかかると、TPBゲージが初期化してしまいます。
 * このプラグインでは初期化されないステートを作ることができます。
 * 
 * ステートのメモ欄
 * <RestrictedKeepTpb:[ratio]> このタグがあるステートはTPBが初期化されません。
 * [ratio]:付加時のTPB変化割合 ※省略可能
 * <RestrictedKeepTpb> 初期化無効
 * <RestrictedKeepTpb:50> 現TPBの50%に減少 複数の場合はさらに乗算
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/8/7 Ver.1.0.0
 * 初版
 * 
 */

var Imported = Imported || {};
Imported.NUUN_KeepRestrictedTPB = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_KeepRestrictedTPB');

    const _Game_Battler_initMembers = Game_Battler.prototype.initMembers;
    Game_Battler.prototype.initMembers = function() {
        _Game_Battler_initMembers.call(this);
        this._keepTpb = 0;
        this._keepTpbState = null;
    };
    
    const _Game_BattlerBase_addNewState = Game_BattlerBase.prototype.addNewState;
    Game_BattlerBase.prototype.addNewState = function(stateId) {
        const state = $dataStates[stateId];
        const restricted = this.isStateRestrictedKeepTpb(state);
        if (!!state.meta.RestrictedKeepTpb && restricted) {
            if (this._tpbState !== "casting" && this._tpbState !== "acting") {
                this._keepTpb = this.getRestrictedKeepTpb(state.meta.RestrictedKeepTpb);
                this._keepTpbState = this._keepTpb < 1 && this._tpbState !== "charging" ? "charging" : this._tpbState;
            }
        }
        _Game_BattlerBase_addNewState.call(this, stateId);
        if (!!state.meta.RestrictedKeepTpb && restricted && (this._keepTpb !== 0 || this._keepTpbState)) {
            this._tpbChargeTime = this._keepTpb;
            this._tpbState = this._keepTpbState;
        }
    };

    const _Game_Battler_updateTpbChargeTime = Game_Battler.prototype.updateTpbChargeTime;
    Game_Battler.prototype.updateTpbChargeTime = function() {
        if (this._keepTpb !== 0 || this._keepTpbState ) {
            this._tpbChargeTime = this._keepTpb;
            this._tpbState = this._keepTpbState;
            this._keepTpb = 0;
            this._keepTpbState = null;
        }
        _Game_Battler_updateTpbChargeTime.call(this);
    };

    Game_Battler.prototype.isStateRestrictedKeepTpb = function(state) {
        return state.restriction > 0;
    };

    Game_Battler.prototype.getRestrictedKeepTpb = function(data) {
        const str = String(data)
        if (str === 'true') {
            return this._tpbChargeTime;
        } else {
            return this._tpbChargeTime * Number(data) / 100;
        }
    };

})();