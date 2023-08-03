/*:-----------------------------------------------------------------------------------
 * NUUN_EnemyCondPicture.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc No window margins
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * Eliminates 4 pixels of margins on the screen and UI, and displays the UI size set in the database.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 8/3/2023 Ver.1.0.0
 * First edition.
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc ウィンドウの余白なし
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * 画面とUIの4ピクセルの余白を無くし、データベースで設定したUIサイズのまま表示します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/8/3 Ver.1.0.0
 * 初版
 * 
 */

var Imported = Imported || {};
Imported.NUUN_BoxMargin = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_BoxMargin');

    Scene_Boot.prototype.adjustBoxSize = function() {
        Graphics.boxWidth = $dataSystem.advanced.uiAreaWidth;
        Graphics.boxHeight = $dataSystem.advanced.uiAreaHeight;
    };
    
    
})();