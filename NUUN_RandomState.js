/*:-----------------------------------------------------------------------------------
 * NUUN_RandomState.js
 * 
 * Copyright (C) 2024 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Random State
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * You can set the state to be randomly assigned.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 7/13/2024 Ver.1.0.0
 * First edition.
 * 
 * @param RandomStateList
 * @text Random State Settings
 * @desc Set the state to be randomly assigned.
 * @default []
 * @type struct<randomStateList>[]
 * 
 */
/*~struct~randomStateList:
 * 
 * @param State
 * @desc Specify the state ID. The specified state will be added randomly from the states set below.
 * @text State ID
 * @type state
 * @default 0
 * 
 * @param RandomState
 * @desc Specifies the ID of the state to be randomly added.
 * @text Random State
 * @type state[]
 * @default []
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc ランダムステート
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * ランダムに付与するステートを設定できます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/7/13 Ver.1.0.0
 * 初版
 * 
 * @param RandomStateList
 * @text ランダムステート設定
 * @desc ランダムに付与させるステートの設定を行います。
 * @default []
 * @type struct<randomStateList>[]
 * 
 * 
 */
/*~struct~randomStateList:ja
 * 
 * @param State
 * @desc ステートのIDを指定します。指定のステートは以下で設定したステートの中からランダムで付加されます。
 * @text ステートID
 * @type state
 * @default 0
 * 
 * @param RandomState
 * @desc ランダムに付加するステートのIDを指定します。
 * @text ランダムステート
 * @type state[]
 * @default []
 * 
 */


var Imported = Imported || {};
Imported.NUUN_RandomState = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    const parameters = PluginManager.parameters('NUUN_RandomState');

    const _Game_Battler_addState = Game_Battler.prototype.addState;
    Game_Battler.prototype.addState = function(stateId) {
        const randomState = getRandomState(stateId);
        if (randomState && !!randomState.RandomState) {
            stateId = randomState.RandomState[Math.randomInt(randomState.RandomState.length)] || 0;
        }
        _Game_Battler_addState.apply(this, arguments);
    };

    function getRandomState(stateId) {
        return params.RandomStateList.find(state => state.State === stateId);
    }

   
})();