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
 * @plugindesc  アイテム、スキルネームカラー
 * @author NUUN
 * @version 1.1.1
 * 
 * @help
 * アイテム、スキル欄の文字に色を指定できます。
 * 
 * <NameColor:[id]> アイテム、スキル名の文字色を変更します。[id]:カラーインデックス
 * 例：<NameColor:17> アイテム、スキルの文字色がカラーインデックス17番の色になります。
 * <NameColor:#RRGGBB> カラーコードを指定します。
 * 例：<NameColor:#00bfff>
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/5/10 Ver.1.1.1
 * EquipScene_Extension併用時装備画面で装備を選択するとエラーが出る問題を修正。
 * 2021/3/10 Ver.1.1.0
 * カラーコードに対応。
 * 2021/3/6 Ver.1.0.2
 * すでに別プラグインでテキストカラーが変更していた場合は処理しないように変更。
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
    this.nameColor = null;
  };

  const _Window_Base_drawItemName = Window_Base.prototype.drawItemName;
  Window_Base.prototype.drawItemName = function(item, x, y, width) {
    if (item && item.id > 0) {
      if (this.nameColor === null) {
        this.nameColor = this.changeNameColor(item);
      }
      _Window_Base_drawItemName.call(this, item, x, y, width);
      this.nameColor = null;
    }
  };

  const _Window_Base_drawText = Window_Base.prototype.drawText;
  Window_Base.prototype.drawText = function(text, x, y, maxWidth, align) {
    if (this.nameColor !== null) {
      this.changeTextColor(this.nameColor);
    }
    _Window_Base_drawText.call(this, text, x, y, maxWidth, align);
    if (this.nameColor !== null) {
      this.resetNameColor();
    }
  };

  Window_Base.prototype.changeNameColor = function(item) {
    const color = item.meta.NameColor;
    if (color) {
      if (typeof(color) === "string" && color.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/) !== null) {
        return color;
      }
      return ColorManager.textColor(Number(item.meta.NameColor));
    }
    return null;
  };

  Window_Base.prototype.resetNameColor = function() {
    this.nameColor = null;
    this.resetTextColor();
  };

  //const _ColorManager_textColor = ColorManager.textColor;
  //ColorManager.textColor = function(n) {
  //  if (typeof(n) === "string" && n.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/) !== null) {
  //    return n;
  //  }
  //  return _ColorManager_textColor.call(this, n);
  //};
})();
