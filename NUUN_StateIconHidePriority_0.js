/*:-----------------------------------------------------------------------------------
 * NUUN_StateIconHidePriority_0.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Hide priority 0 in state icons
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * Hides states with priority 0 from the displayed state icons.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc ステートアイコンで優先度0を非表示
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * 表示されるステートアイコンから優先度0のステートを非表示にします。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 
 */

var Imported = Imported || {};
Imported.NUUN_StateIconHidePriority_0 = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_StateIconHidePriority_0');
    
    Game_BattlerBase.prototype.stateIcons = function() {
        return this.states().filter(state => state.priority > 0 && state.iconIndex > 0).map(state => state.iconIndex);
    };
    
    
})();