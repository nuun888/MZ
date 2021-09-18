/*:-----------------------------------------------------------------------------------
 * NUUN_ResultSpriteHide.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc  リザルト時ウィンドウスプライト非表示
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_Result
 * @version 1.0.0
 * @orderAfter NUUN_Base
 * 
 * @help
 * リザルト時に非表示にするウィンドウまたはスプライトを非表示にします。
 * 指定できるメソッドはScene_Battleのウィンドウまたはスプライトのオブジェクト変数になります。
 * プラグインによってはこのプラグインを該当プラグインより下に配置する必要がある場合があります。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/9/18 Ver.1.1.0
 * 初版
 * 
 * @param SptiteHideObj
 * @text リザルト時非表示ウィンドウスプライト
 * @desc リザルト時に非表示にするウィンドウまたはスプライトのメソッドを指定します。
 * @type combo[]
 * @option 
 * @default 
 * @parent CommonSetting
 * 
 */
var Imported = Imported || {};
Imported.NUUN_ResultSpriteHide = true;

(() => {
const parameters = PluginManager.parameters('NUUN_ResultSpriteHide');
const SptiteHideObj = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['SptiteHideObj'])) : null) || [];

const _Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
  _Scene_Battle_update.call(this);
  if (SptiteHideObj && BattleManager._victoryOn) {
    SptiteHideObj.forEach(method => {
      this[method].visible = false;
    });
  }
};

})();