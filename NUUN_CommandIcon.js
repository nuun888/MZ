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
 * @plugindesc コマンド、カテゴリー表示拡張
 * @author NUUN
 * @version 1.3.2
 * 
 * @help
 * コマンドメニューにアイコンを表示やコマンド名の文字色を変更できます。
 * コマンド名の位置を左揃え、中央揃え、右揃えから選べます。
 * 
 * コマンド名：コマンドメニューに表示される文字列をそのまま記入します。
 * コマンドの色：コマンド名の色を変更します。（システムカラーインデックス）　テキストタブでカラーコードを記入できます。
 * アイコンインデックス：アイコンを指定します。
 * フィルタリングクラス設定モード：下のフィルタリングを適用するか除外するか指定します。
 * フィルタリングクラス設定：設定を適用または除外するクラスを設定します。上から一番最初に条件一致した条件が適用されます。
 * 
 * フィルタリングクラス設定でリストにないクラスを記入する場合は必ず'または"で囲ってください。
 * フィルタリングクラス設定にないウィンドウで設定する場合は、テキストタブで直接該当クラスを''または""で囲って記入してください。
 * Window_Command.prototype.drawItem内にconsole.log(this)を記入することでクラス名が分かります。(F12)
 * 反映させられるクラスはWindow_Commandを継承しているクラスのみとなります。
 * 
 * Window_ItemBook_Category：アイテム図鑑カテゴリー
 * Window_SaveVerificationWindow：セーブ確認上書き画面選択肢
 * Window_EnemyBook_Category：モンスター図鑑敵カテゴリー
 * Window_EnemyBookPageCategory：モンスター図鑑情報ページ
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/4/10 Ver 1.3.2
 * クラス毎のコマンド名表示位置の設定が適用されていなかった問題を修正。
 * 2021/12/25 Ver 1.3.1
 * モンスター図鑑敵カテゴリーコマンド化によりフィルタリングクラスに項目追加。
 * 2021/11/14 Ver 1.3.0
 * クラス毎にテキストの位置を指定できる機能を追加。
 * 2021/11/7 Ver 1.2.5
 * カラーコードで指定できるように修正。
 * 2021/10/23 Ver 1.2.4
 * プラグインパラメータの説明を修正及びメニューコマンド内の項目のみ初期設定に追加。
 * 2021/9/11 Ver 1.2.3
 * フィルタリングクラスにセーブ上書き確認を追加（要NUUN_SaveVerification）
 * 2021/8/23 Ver 1.2.2
 * 適用除外クラス設定にアイテム図鑑カテゴリーを追加。(要NUUN_ItemBook)
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
 * @desc コマンドの色、アイコンの設定をします。
 * @default ["{\"CommadName\":\"アイテム\",\"CommadNameColor\":\"0\",\"iconId\":\"0\",\"CommandClassMode\":\"0\",\"CommandClass\":\"\"}","{\"CommadName\":\"スキル\",\"CommadNameColor\":\"0\",\"iconId\":\"0\",\"CommandClassMode\":\"0\",\"CommandClass\":\"\"}","{\"CommadName\":\"装備\",\"CommadNameColor\":\"0\",\"iconId\":\"0\",\"CommandClassMode\":\"0\",\"CommandClass\":\"\"}","{\"CommadName\":\"ステータス\",\"CommadNameColor\":\"0\",\"iconId\":\"0\",\"CommandClassMode\":\"0\",\"CommandClass\":\"\"}","{\"CommadName\":\"並び替え\",\"CommadNameColor\":\"0\",\"iconId\":\"0\",\"CommandClassMode\":\"0\",\"CommandClass\":\"\"}","{\"CommadName\":\"オプション\",\"CommadNameColor\":\"0\",\"iconId\":\"0\",\"CommandClassMode\":\"0\",\"CommandClass\":\"[\\\"'Window_MenuCommand'\\\"]\"}","{\"CommadName\":\"ゲーム終了\",\"CommadNameColor\":\"0\",\"iconId\":\"0\",\"CommandClassMode\":\"0\",\"CommandClass\":\"\"}"]
 * @type struct<CommadIconList>[]
 * 
 * @param CommandPosition
 * @text 縦方向コマンドのコマンド名表示位置
 * @desc 縦方向コマンドのコマンド名の表示位置を指定します。（メニュー画面など）
 * @type select
 * @option 左揃え
 * @value 'left'
 * @option 中央揃え
 * @value 'center'
 * @option 右揃え
 * @value 'right'
 * @default 'center'
 * 
 * @param HorzCommandPosition
 * @text 横方向コマンドのコマンド名表示位置
 * @desc 横方向コマンドのコマンド名の表示位置を指定します。（アイテム欄など）
 * @type select
 * @option 左揃え
 * @value 'left'
 * @option 中央揃え
 * @value 'center'
 * @option 右揃え
 * @value 'right'
 * @default 'center'
 * 
 * @param ClassCommandPosition
 * @text クラス毎のコマンド名表示位置
 * @desc クラス毎のコマンド名表示位置の設定をします。
 * @default []
 * @type struct<ClassCommandList>[]
 * 
 */
/*~struct~CommadIconList:
 * 
 * @param CommadName
 * @text コマンド名
 * @desc アイコンを表示するコマンド名（表示するコマンド名と同じ名前にしてください）
 * @type string
 * @default 
 * 
 * @param CommadNameColor
 * @text コマンド名の色
 * @desc コマンド名のカラーインデックス番号。テキストタブでカラーコードが入力できます。
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
 * @text フィルタリングクラス設定モード
 * @desc 適用除外クラス設定のモードを指定します。
 * @type select
 * @option 適用
 * @value 0
 * @option 除外
 * @value 1
 * @default 0
 * 
 * @param CommandClass
 * @text フィルタリングクラス設定
 * @desc 適用、除外するクラスを指定します。無指定の場合は全てのコマンドで反映されます。(リスト番号１のみ)
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
 * @option 'Window_ItemBook_Category'
 * @option 'Window_SaveVerificationWindow'
 * @option 'Window_EnemyBook_Category'
 * @option 'Window_EnemyBookPageCategory'
 * @default
 * 
 */
/*~struct~ClassCommandList:
 * 
 * @param CommandClass
 * @text フィルタリングクラス設定
 * @desc 適用するクラスを指定します。
 * @type combo
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
 * @option 'Window_ItemBook_Category'
 * @option 'Window_SaveVerificationWindow'
 * @option 'Window_EnemyBook_Category'
 * @option 'Window_EnemyBookPageCategory'
 * @default
 * 
 * @param CommandPosition
 * @text コマンド名表示位置
 * @desc コマンド名の表示位置を指定します。
 * @type select
 * @option 左揃え
 * @value 'left'
 * @option 中央揃え
 * @value 'center'
 * @option 右揃え
 * @value 'right'
 * @default 'center'
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

const _Window_Command_initialize = Window_Command.prototype.initialize;
Window_Command.prototype.initialize = function(rect) {
  this._classAlign = this.itemTextAlignClass();
  this._commadName = null;
  _Window_Command_initialize.call(this, rect);
};

const _Window_Command_itemTextAlign = Window_Command.prototype.itemTextAlign;
Window_Command.prototype.itemTextAlign = function() {
  if (this._classAlign) {
    return this._classAlign;
  } else {
    return param.CommandPosition;
  }
};

const _Window_HorzCommand_itemTextAlign = Window_HorzCommand.prototype.itemTextAlign;
Window_HorzCommand.prototype.itemTextAlign = function() {
  if (this._classAlign) {
    return this._classAlign;
  } else {
    return param.HorzCommandPosition;
  }
};

Window_Command.prototype.itemTextAlignClass = function() {
  param.ClassCommandPosition = param.ClassCommandPosition || [];
  const className = String(this.constructor.name);
  const result = param.ClassCommandPosition.find(_Class => _Class.CommandClass === className);
  return result ? result.CommandPosition : null;
};

const _Window_Command_drawText = Window_Command.prototype.drawText;
Window_Command.prototype.drawText = function(text, x, y, maxWidth, align) {
  const commadName = this._commadName;
  const foundIndex = param.CommadIcon ? param.CommadIcon.findIndex(Commad => (Commad.CommadName === commadName) && this.isClass(Commad.CommandClass, Commad.CommandClassMode)) : null;
  if (foundIndex >= 0) {
    const commadData = param.CommadIcon[foundIndex];
    const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
    const textMargin = commadData.iconId > 0 ? ImageManager.iconWidth + 4 : 0;
    const textWidth = this.textWidth(commadName);
    const itemWidth = Math.max(0, maxWidth - textMargin);
    width = Math.min(itemWidth, textWidth);
    const color = commadData.CommadNameColor ? commadData.CommadNameColor : 0;
    let colorCode = null;
    if (color && typeof(color) === "string" && color.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/) !== null) {
      colorCode = color;
    } else {
      colorCode = ColorManager.textColor(color);
    }
    this.changeTextColor(colorCode);
    if(commadData.iconId > 0) {
      if(align === 'center') {
        this.drawIcon(commadData.iconId, x + (maxWidth / 2 - width / 2) - textMargin / 2, iconY);
      } else if (align === 'left') {
        this.drawIcon(commadData.iconId, x, iconY);
      } else {
        this.drawIcon(commadData.iconId, x + itemWidth - width, iconY);
      }
    }
    x += textMargin;
    maxWidth = itemWidth;
  }
  _Window_Command_drawText.call(this, text, x, y, maxWidth, align);
};

const _Window_Command_drawItem = Window_Command.prototype.drawItem;
Window_Command.prototype.drawItem = function(index) {
  this._commadName = this.commandName(index);
  _Window_Command_drawItem.call(this, index);
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