/*:-----------------------------------------------------------------------------------
 * NUUN_SaveVerification.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc セーブ上書き確認
 * @author NUUN
 * @version 1.0.0
 * @base NUUN_Base
 * 
 * @help
 * 
 * 仕様
 * セーブ時に上書き保存する場合に確認メッセージを表示します。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/9/11 Ver.1.0.0
 * 初版
 * 
 * @param Width
 * @text 横幅
 * @desc 横幅
 * @type number
 * @default 450
 * 
 * @param SaveVerificationMessage
 * @desc セーブ確認画面のメッセージ文章。
 * @text セーブ確認画面のメッセージ
 * @type string[]
 * @default ["このファイルに上書きしても","よろしいですか？"]
 * 
 * @param SaveVerificationYesText
 * @desc セーブ確認画面のセーブするときの確認テキスト。
 * @text セーブ実行時確認テキスト
 * @type string
 * @default はい
 * 
 * @param SaveVerificationNoText
 * @desc セーブ確認画面のセーブしないときの確認テキスト。
 * @text セーブしない時確認テキスト
 * @type string
 * @default いいえ
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_SaveVerification = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_SaveVerification');
  const SaveVerificationYesText = String(parameters['SaveVerificationYesText'] || 'はい');
  const SaveVerificationNoText = String(parameters['SaveVerificationNoText'] || 'いいえ');
  const SaveVerificationWidth = Number(parameters['Width'] || 450);
  const SaveVerificationMessage = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['SaveVerificationMessage'])) : [];

  const _Scene_Save_create = Scene_Save.prototype.create;
  Scene_Save.prototype.create = function() {
    _Scene_Save_create.call(this);
    this.createSaveVerificationMessage();
    this.createSaveVerification();
  };

  const _Scene_Save_onSavefileOk = Scene_Save.prototype.onSavefileOk;
  Scene_Save.prototype.onSavefileOk = function() {
    const savefileId = this.savefileId();
    if (DataManager.savefileInfo(savefileId)) {
      this.saveVerificationShow();
    } else {
      _Scene_Save_onSavefileOk.call(this);
    }
  };

  Scene_Save.prototype.createSaveVerification = function() {
    const rect = this.createSaveVerificationRect();
    this._saveVerificationWindow = new Window_SaveVerificationWindow(rect);
    this._saveVerificationWindow.setHandler("ok", this.onSaveVerificationOk.bind(this));
    this._saveVerificationWindow.setHandler("cancel", this.onSaveVerificationCancel.bind(this));
    this.addWindow(this._saveVerificationWindow);
  };

  Scene_Save.prototype.createSaveVerificationRect = function() {
    const wx = (Graphics.boxWidth - SaveVerificationWidth) / 2;
    const wy = (Graphics.boxHeight - this.saveVerificationHeight()) / 2 + this.calcWindowHeight(2, true);
    const ww = SaveVerificationWidth;
    const wh = this.calcWindowHeight(1, true);
    return new Rectangle(wx, wy, ww, wh);
  };

  Scene_Save.prototype.createSaveVerificationMessage = function() {
    const rect = this.createSaveVerificationMessageRect();
    this._saveVerificationMessageWindow = new Window_SaveVerificationMessageWindow(rect);
    this.addWindow(this._saveVerificationMessageWindow);
  };

  Scene_Save.prototype.createSaveVerificationMessageRect = function() {
    const wx = (Graphics.boxWidth - SaveVerificationWidth) / 2;
    const wy = (Graphics.boxHeight - this.saveVerificationHeight()) / 2;
    const ww = SaveVerificationWidth;
    const wh = this.calcWindowHeight(2, true);
    return new Rectangle(wx, wy, ww, wh);
  };

  Scene_Save.prototype.saveVerificationShow = function() {
    this._saveVerificationWindow.show();
    this._saveVerificationWindow.open();
    this._saveVerificationMessageWindow.show();
    this._saveVerificationMessageWindow.open();
    this._listWindow.deactivate();
    this._saveVerificationWindow.activate();
  };

  Scene_Save.prototype.onSaveVerificationOk = function() {
    _Scene_Save_onSavefileOk.call(this);
    this._saveVerificationMessageWindow.close();
    this._saveVerificationWindow.close();
  };

  Scene_Save.prototype.onSaveVerificationCancel = function() {
    this._saveVerificationMessageWindow.close();
    this._saveVerificationWindow.close();
    this._listWindow.activate();
  };

  Scene_Save.prototype.saveVerificationHeight = function() {
    return this.calcWindowHeight(2, true) + this.calcWindowHeight(1, true);
  };


  function Window_SaveVerificationWindow() {
    this.initialize(...arguments);
  }

  Window_SaveVerificationWindow.prototype = Object.create(Window_Command.prototype);
  Window_SaveVerificationWindow.prototype.constructor = Window_SaveVerificationWindow;

  Window_SaveVerificationWindow.prototype.initialize = function(rect) {
    Window_Command.prototype.initialize.call(this, rect);
    this.openness = 0;
    this.hide();
  };

  Window_SaveVerificationWindow.prototype.maxCols = function() {
    return 2;
  };

  Window_SaveVerificationWindow.prototype.makeCommandList = function() {
    this.addCommand(SaveVerificationYesText, "ok");
    this.addCommand(SaveVerificationNoText, "cancel");
  };


  function Window_SaveVerificationMessageWindow() {
    this.initialize(...arguments);
  }

  Window_SaveVerificationMessageWindow.prototype = Object.create(Window_Selectable.prototype);
  Window_SaveVerificationMessageWindow.prototype.constructor =Window_SaveVerificationMessageWindow;

  Window_SaveVerificationMessageWindow.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.openness = 0;
    this.hide();
    this.refresh();
  };

  Window_SaveVerificationMessageWindow.prototype.refresh = function() {
    SaveVerificationMessage.forEach((list, i) => {
      const rect = this.itemLineRect(i);
      this.drawText(list, rect.x, rect.y, rect.width);
    })
  };

})();