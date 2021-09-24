/*:-----------------------------------------------------------------------------------
 * NUUN_BeforeCore_1_3_2Patch.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc コアスクリプトVer.1.3.2以前パッチ
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * コアスクリプトVer.1.3.2以前のバージョン用パッチです。
 * プラグインリストの上のほうに配置してください。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/9/24 Ver.1.0.0
 * 初版
 * 
 */

var Imported = Imported || {};
Imported.NUUN_BeforeCore_1_3_2Patch = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_BeforeCore_1_3_2Patch');

  Sprite_Gauge.prototype.textHeight = function() {
    return 24;
  };
})();