/*:-----------------------------------------------------------------------------------
 * NUUN_CommandIcon.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 更新履歴
 * 2020/11 Ver 1.0.0
 */ 
/*:ja
 * @target MZ
 * @plugindesc コマンドにアイコン追加
 * @author ヽ(´ω`)ノ
 * 
 * @help
 * コマンドメニューにアイコンを追加します。
 * 
 * プラグインパラメータのアイコンを表示させるコマンド名は
 * 各コマンドに表示されている文字列を記入してください。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 
 * @param CommadIcon
 * @text コマンドの設定をします。
 * @desc コマンド設定
 * @default []
 * @type struct<CommadIconList>[]
 * 
 */
/*~struct~CommadIconList:
 * 
 * @param CommadName
 * @text アイコンを表示するコマンド名
 * @desc コマンド名
 * @type string
 * 
 * @param iconId
 * @text アイコンのインデックス番号。
 * @desc アイコンインデックス番号
 * @type number
 * @default 0
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
  const found = param.CommadIcon.find(icons => (icons.CommadName === commadName) && icons.iconId > 0);
  if(found){
    const rect = this.itemLineRect(index);
    const align = this.itemTextAlign();
    const textMargin = ImageManager.iconWidth + 4;
    const textWidth = this.textWidth(commadName);
    const itemWidth = Math.max(0, rect.width - textMargin);
    const width = Math.min(itemWidth, textWidth);
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    if(align === 'center') {
      this.drawIcon(found.iconId, rect.x + (rect.width / 2 - width / 2) - textMargin / 2, rect.y + 2);
      this.drawText(commadName, rect.x + textMargin, rect.y, itemWidth, align);
    } else if (align === 'left') {
      this.drawIcon(found.iconId, rect.x - 4, rect.y + 2);
      this.drawText(commadName, rect.x + textMargin, rect.y, itemWidth, align);
    } else {
      this.drawIcon(found.iconId, rect.x + itemWidth - width, rect.y + 2);
      this.drawText(commadName, rect.x + textMargin, rect.y, itemWidth, align);
    }
  } else {
    _Window_Command_drawItem.call(this, index);
  }
};
})();