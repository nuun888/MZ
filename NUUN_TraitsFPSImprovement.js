/*:-----------------------------------------------------------------------------------
 * NUUN_TraitsFPSImprovement.js
 * 
 * Copyright (C) 2025 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Traits FPS improvement
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * Improves performance when processing data with traits.
 * Make sure it's at the top of your plugin list.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 8/15/2025 Ver.1.6.1
 * First edition.
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 特徴パフォーマンス改善
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * 特徴を持つデータの処理のパフォーマンスを向上させます。
 * プラグインリストの一番上に設定してください。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2025/8/15 Ver.1.4.0
 * 初版。
 * 
 */

var Imported = Imported || {};
Imported.NUUN_TraitsFPSImprovement = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    Game_BattlerBase.prototype.allTraits = function() {
        return this.traitObjects().reduce((r, obj) => {
            Array.prototype.push.apply(r, obj.traits);
            return r;
        }, []);
    };

    Game_BattlerBase.prototype.traitsSet = function(code) {
        return this.traits(code).reduce((r, trait) => {
            Array.prototype.push.apply(r, [trait.dataId]);
            return r;
        }, []);
    };


})();