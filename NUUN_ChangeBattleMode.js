/*:-----------------------------------------------------------------------------------
 * NUUN_ChangeBattleMode.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Front view side view change
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * You can switch between front view and side view even during the game.
 * Monster coordinates are applied in the battle screen mode set in the editor.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 4/8/2023 Ver.1.0.0
 * First edition.
 * 
 * @command ChangeBattleSVMode
 * @desc Change combat mode to side view.
 * @text Battle mode side view change
 * 
 * @command ChangeBattleFrontMode
 * @desc Change combat mode to front view.
 * @text Battle mode front view change
 * 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc フロントビューサイドビュー変更
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * ゲーム途中でもフロントビューとサイドビューを切り替えさせることができます。
 * モンスターの座標はエディタでの設定した戦闘画面モードで適用されます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/4/8 Ver.1.0.0
 * 初版。
 * 
 * @command ChangeBattleSVMode
 * @desc 戦闘モードをサイドビューに変更します。
 * @text 戦闘モードサイドビュー変更
 * 
 * @command ChangeBattleFrontMode
 * @desc 戦闘モードをフロントビューに変更します。
 * @text 戦闘モードフロントビュー変更
 * 
 * 
 */

var Imported = Imported || {};
Imported.NUUN_BattleStyle = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_ChangeBattleMode');
    const pluginName = "NUUN_ChangeBattleMode";

    PluginManager.registerCommand(pluginName, 'ChangeBattleSVMode', args => {
        $gameSystem.setBsSideView(true);
    });

    PluginManager.registerCommand(pluginName, 'ChangeBattleFrontMode', args => {
        $gameSystem.setBsSideView(false);
    });

    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this._isBsSideView = $dataSystem.optSideView;
    };
    
    const _Game_System_isSideView = Game_System.prototype.isSideView;
    Game_System.prototype.isSideView = function() {
        return _Game_System_isSideView.call(this) || this.isBsSideView();
    };
    
    Game_System.prototype.isBsSideView = function() {
        return this._isBsSideView;
    };
    
    Game_System.prototype.setBsSideView = function(flag) {
        if (!$gameParty.inBattle()) {
            this._isBsSideView = flag;
        }
    };
    

})();