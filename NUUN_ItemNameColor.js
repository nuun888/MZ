/*:-----------------------------------------------------------------------------------
 * NUUN_ItemNameColor.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc  アイテム、スキル欄文字色個別変更
 * @author NUUN
 * @version 1.0.1
 * 
 * @help
 * アイテム、スキル欄の文字に色を指定できます。
 * 
 * <NameColor:[id]> アイテム、スキル名の文字色を変更します。[id]:カラーインデックス
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/2/7 Ver.1.0.1
 * テキストカラーを戻す処理のタイミングを変更。
 * 2021/2/6 Ver.1.0.0
 * 初版
 */
var Imported = Imported || {};
Imported.NUUN_ItemNameColor = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_ItemNameColor');
  
  const _Window_Base_initialize = Window_Base.prototype.initialize;
  Window_Base.prototype.initialize = function(rect) {
    _Window_Base_initialize.call(this, rect);
    this.nameColor = 0;
  };

  const _Window_Base_drawItemName = Window_Base.prototype.drawItemName;
  Window_Base.prototype.drawItemName = function(item, x, y, width) {
    if (item) {
      this.nameColor = this.changeNameColor(item);
      _Window_Base_drawItemName.call(this, item, x, y, width);
      this.nameColor = 0;
    }
  };

  const _Window_Base_drawText = Window_Base.prototype.drawText;
  Window_Base.prototype.drawText = function(text, x, y, maxWidth, align) {
    if (this.nameColor) {
      this.changeTextColor(this.nameColor);
    }
    _Window_Base_drawText.call(this, text, x, y, maxWidth, align);
    if (this.nameColor) {
      this.resetNameColor();
    }
  };

  Window_Base.prototype.changeNameColor = function(item) {
    const color = item.meta.NameColor ? item.meta.NameColor : 0;
    return ColorManager.textColor(color);
  };

  Window_Base.prototype.resetNameColor = function() {
    this.nameColor = 0;
    this.resetTextColor();
  };
})();
