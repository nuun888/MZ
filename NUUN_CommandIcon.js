/*:-----------------------------------------------------------------------------------
 * NUUN_CommandIcon.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc CommadIcon
 * @author NUUN
 * 
 * @help
 * Display the icon in the command menu.
 * If you are using a version other than the Japanese version,
 * Enter the name displayed in the command menu in "Command Name".
 * 
 * Terms of service
 * This plugin is distributed under the MIT license.
 * 
 * Change log
 * 11/19/2020 Ver 1.0.0
 * 
 * 11/20/2020 Ver 1.0.1
 *  Fixed an issue that caused an error if the plugin parameter CommadIcon was blank.
 * 
 * 11/20/2020 Ver 1.0.2
 *  Fixed because it was not multilingual.
 * 
 * 11/21/2020 Ver 1.1.0
 *  Added the function to color the command name.
 * 
 * @param CommadIcon
 * @text Command icon settings
 * @desc Set the icon to be displayed in the command.
 * @default []
 * @type struct<CommadIconList>[]
 * 
 */
/*~struct~CommadIconList:
 * 
 * @param CommadName
 * @text Command name
 * @desc Command name to display the icon (Please use the same name as the command name to be displayed)
 * @type string
 * 
 * @param CommadNameColor
 * @text Command name color
 * @desc Command name color index number.
 * @type number
 * @default 0
 * @min 0
 * 
 * @param iconId
 * @text Icon index number
 * @desc The index number of the icon.
 * @type number
 * @default 0
 * @min 0
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc コマンドアイコン
 * @author NUUN
 * 
 * @help
 * コマンドメニューにアイコンを表示します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2020/11/19 Ver 1.0.0
 *  初版
 * 
 * 2020/11/20 Ver 1.0.1
 *  プラグインパラメータのCommadIconが空白だった場合、エラーが出る問題を修正。
 * 
 * 2020/11/20 Ver 1.0.2
 *  多言語対応ではなかったため修正。
 * 
 * 2020/11/21 Ver 1.1.0
 *  コマンド名に色を付ける機能を追加。
 * 
 * @param CommadIcon
 * @text コマンドアイコン設定
 * @desc コマンドに表示するアイコンを設定します。
 * @default []
 * @type struct<CommadIconList>[]
 * 
 */
/*~struct~CommadIconList:ja
 * 
 * @param CommadName
 * @text コマンド名
 * @desc アイコンを表示するコマンド名（表示するコマンド名と同じ名前にしてください）
 * @type string
 * 
 * @param CommadNameColor
 * @text コマンド名の色
 * @desc コマンド名のカラーインデックス番号。
 * @type number
 * @default 0
 * @min 0
 * 
 * @param iconId
 * @text アイコンインデックス番号
 * @desc アイコンのインデックス番号。
 * @type number
 * @default 0
 * @min 0
 * 
 */
var Imported = Imported || {};
Imported.NUUN_CommandIcon = true;

(() => {
const parameters = PluginManager.parameters('NUUN_CommandIcon');
const param = JSON.parse(JSON.stringify(parameters, function(key, value) {
  try {
      return JSON.parse(value);
  } catch (e) {
      try {
          return eval(value);
      } catch (e) {
          return value;
      }
  }
}));

const _Window_Command_drawItem = Window_Command.prototype.drawItem;
Window_Command.prototype.drawItem = function(index) {
  const commadName = this.commandName(index);
  const foundIndex = param.CommadIcon.findIndex(Commad => (Commad.CommadName === commadName));
  if(foundIndex >= 0) {
    const commadData = param.CommadIcon[foundIndex];
    const color = commadData.CommadNameColor ? commadData.CommadNameColor : 0;
    this.changeTextColor(ColorManager.textColor(color));
    const rect = this.itemLineRect(index);
    const align = this.itemTextAlign();
    const textMargin = commadData.iconId > 0 ? ImageManager.iconWidth + 4 : 0;
    const textWidth = this.textWidth(commadName);
    const itemWidth = Math.max(0, rect.width - textMargin);
    const width = Math.min(itemWidth, textWidth);
    this.changePaintOpacity(this.isCommandEnabled(index));
    if(commadData.iconId > 0) {
      if(align === 'center') {
        this.drawIcon(commadData.iconId, rect.x + (rect.width / 2 - width / 2) - textMargin / 2, rect.y + 2);
      } else if (align === 'left') {
        this.drawIcon(commadData.iconId, rect.x - 4, rect.y + 2);
      } else {
        this.drawIcon(commadData.iconId, rect.x + itemWidth - width, rect.y + 2);
      }
    }
    this.drawText(commadName, rect.x + textMargin, rect.y, itemWidth, align);
    this.resetTextColor();
  } else {
    _Window_Command_drawItem.call(this, index);
  }
};
})();
