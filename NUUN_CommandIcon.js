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
 * @plugindesc コマンド拡張
 * @author NUUN
 * @version 1.2.1
 * 
 * @help
 * コマンドメニューにアイコンを表示やコマンド名の文字色を変更できます。
 * コマンド名の位置を左揃え、中央揃え、右揃えから選べます。
 * 
 * 適用クラス設定でリストにないクラスを記入する場合は必ず'または"で囲ってください。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/5/22 Ver 1.2.1
 * 設定を反映するウィンドウを適用モードか除外モードかを選択できる機能を追加。
 * 2021/5/21 Ver 1.2.0
 * 設定を反映するウィンドウを指定できる機能を追加。
 * 2020/11/22 Ver 1.1.1
 * コマンド名を左揃え、中央揃え、右揃えから選べる機能を追加。
 * 2020/11/21 Ver 1.1.0
 * コマンド名に色を付ける機能を追加。
 * 2020/11/20 Ver 1.0.2
 * 日本語版しかヘルプやプラグインパラメータが表示されなかった問題を修正。
 * 2020/11/20 Ver 1.0.1
 * プラグインパラメータのCommadIconが空白だった場合、エラーが出る問題を修正。
 * 2020/11/19 Ver 1.0.0
 * 初版
 * 
 * @param CommadIcon
 * @text コマンドアイコン設定
 * @desc コマンドに表示するアイコンを設定します。
 * @default []
 * @type struct<CommadIconList>[]
 * 
 * @param CommandPosition
 * @text 縦方向コマンドのコマンド名表示位置
 * @desc 縦方向コマンドのコマンド名の表示位置を指定します。（メニュー画面など）
 * @type select
 * @option 左揃え
 * @value 0
 * @option 中央揃え
 * @value 1
 * @option 右揃え
 * @value 2
 * @default 1
 * 
 * @param HorzCommandPosition
 * @text 横方向コマンドのコマンド名表示位置
 * @desc 横方向コマンドのコマンド名の表示位置を指定します。（アイテム欄など）
 * @type select
 * @option 左揃え
 * @value 0
 * @option 中央揃え
 * @value 1
 * @option 右揃え
 * @value 2
 * @default 1
 * 
 */
/*~struct~CommadIconList:ja
 * 
 * @param CommadName
 * @text コマンド名
 * @desc アイコンを表示するコマンド名（表示するコマンド名と同じ名前にしてください）
 * @type string
 * @default 
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
 * @param CommandClassMode
 * @text 適用除外クラス設定モード
 * @desc 適用除外クラス設定のモードを指定します。
 * @type select
 * @option 適用
 * @value 0
 * @option 除外
 * @value 1
 * @default 0
 * 
 * @param CommandClass
 * @text 適用除外クラス設定
 * @desc 適用、除外するクラスを指定します。無指定の場合は全てのコマンドで反映されます。
 * @type combo[]
 * @option 'Window_MenuCommand'
 * @option 'Window_ItemCategory'
 * @option 'Window_SkillType'
 * @option 'Window_EquipCommand'
 * @option 'Window_ShopCommand'
 * @option 'Window_PartyCommand'
 * @option 'Window_ActorCommand'
 * @option 'Window_TitleCommand'
 * @option 'Window_GameEnd'
 * @option 'Window_ChoiceList'
 * @option 'Window_Options'
 * @default
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

const _Window_Command_itemTextAlign = Window_Command.prototype.itemTextAlign;
Window_Command.prototype.itemTextAlign = function() {
  switch (param.CommandPosition) {
    case 0:
      return "left";
    case 1:
      return _Window_Command_itemTextAlign.call(this);
    case 2:
      return "right";
  }
};

const _Window_HorzCommand_itemTextAlign = Window_HorzCommand.prototype.itemTextAlign;
Window_HorzCommand.prototype.itemTextAlign = function() {
  switch (param.HorzCommandPosition) {
    case 0:
      return "left";
    case 1:
      return _Window_HorzCommand_itemTextAlign.call(this);
    case 2:
      return "right";
  }
};

const _Window_Command_drawItem = Window_Command.prototype.drawItem;
Window_Command.prototype.drawItem = function(index) {
  const commadName = this.commandName(index);
  const foundIndex = param.CommadIcon ? param.CommadIcon.findIndex(Commad => (Commad.CommadName === commadName) && this.isClass(Commad.CommandClass, Commad.CommandClassMode)) : null;
  if(foundIndex >= 0) {
    const commadData = param.CommadIcon[foundIndex];
    const rect = this.itemLineRect(index);
    const align = this.itemTextAlign();
    const iconY = rect.y + (this.lineHeight() - ImageManager.iconHeight) / 2;
    const textMargin = commadData.iconId > 0 ? ImageManager.iconWidth + 4 : 0;
    const textWidth = this.textWidth(commadName);
    const itemWidth = Math.max(0, rect.width - textMargin);
    const width = Math.min(itemWidth, textWidth);
    const color = commadData.CommadNameColor ? commadData.CommadNameColor : 0;
    this.changeTextColor(ColorManager.textColor(color));
    this.changePaintOpacity(this.isCommandEnabled(index));
    if(commadData.iconId > 0) {
      if(align === 'center') {
        this.drawIcon(commadData.iconId, rect.x + (rect.width / 2 - width / 2) - textMargin / 2, iconY);
      } else if (align === 'left') {
        this.drawIcon(commadData.iconId, rect.x, iconY);
      } else {
        this.drawIcon(commadData.iconId, rect.x + itemWidth - width, iconY);
      }
    }
    this.drawText(commadName, rect.x + textMargin, rect.y, itemWidth, align);
    this.resetTextColor();
  } else {
    _Window_Command_drawItem.call(this, index);
  }
};

Window_Command.prototype.isClass = function(Command, mode) {
  if (Command && Command.length > 0) {
    const className = String(this.constructor.name);
    const result = Command.some(_Class => _Class === className);
    if (mode === 0 || mode === undefined) {
      return result;
    } else {
      return result ? false : true;
    }
  }
  return true;
};
})();
