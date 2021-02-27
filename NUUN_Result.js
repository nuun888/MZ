/*:-----------------------------------------------------------------------------------
 * NUUN_Result.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc  リザルト
 * @author NUUN
 * @version 1.0.1
 * 
 * @help
 * 戦闘終了時にリザルト画面を表示します。
 * 各キャラクターの戦闘終了後のレベル、EXPとドロップアイテムが表示されます。
 * アクターのレベルが上がったら別画面でステータスの差分と習得スキルが表示されます。
 * 
 * 仕様
 * 獲得金額の名称のみ未記入にすると金額のみ表示することが出来ます。
 * 所持金拡張プラグインで所持金のアイコンを表示させたい場合はアイコンの表示クラスに"Window_Result"を記入してください。（必ず'及び"で囲む）
 * 
 * 
 * 操作
 * エンター　切り替え、画面を閉じる 右クリック
 * ←→　ドロップアイテム、習得スキルページ切り替え
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/2/28 Ver.1.0.2
 * アクター画像の設置方法を変更。
 * レベルアップ画面のアクター名がシステムカラーになっていたので修正。
 * ゲージの更新フレーム時間を設定できる機能を追加。
 * 2021/2/27 Ver.1.0.1
 * レベルの表示幅を修正。
 * レベルアップステータスのレベルアップ後のステータスに色付け。
 * 右クリックでページ送りを出来るように変更。
 * 2021/2/27 Ver.1.0.0
 * 初版。
 * 
 * @param ResultWidth
 * @desc ウィンドウの横幅。(0でUI横幅)デフォルト:808
 * @text ウィンドウ横幅
 * @type number
 * @default 808
 * @min 0
 * 
 * @param ResultHeight
 * @desc ウィンドウの縦幅。(0でUI縦幅)デフォルト:616
 * @text ウィンドウ縦幅
 * @type number
 * @default 616
 * @min 0
 * 
 * @param ActorShow
 * @desc アクターの画像を表示します。
 * @text アクター表示
 * @type select
 * @option 表示なし
 * @value 0
 * @option 顔グラを表示
 * @value 1
 * @option キャラチップを表示
 * @value 2
 * @default 1
 * 
 * @param FaceWidth
 * @desc 顔グラ、キャラチップ表示の横幅。
 * @text 顔グラの横幅
 * @type number
 * @default 144
 * 
 * @param FaceHeight
 * @desc １キャラ当たりの縦幅。
 * @text １キャラ当たりの縦幅
 * @type number
 * @default 120
 * 
 * @param FaceScale
 * @desc 顔グラの拡大率。（顔グラのみ）
 * @text 拡大率
 * @type number
 * @default 100
 * 
 * @param GaugeRefreshFrame
 * @desc EXPゲージの更新フレーム
 * @text EXPゲージ更新フレーム
 * @type number
 * @default 100
 * 
 * @param NameSetting
 * @text 名称設定
 * 
 * @param ResultName
 * @text 戦闘結果の名称
 * @desc 戦闘結果の名称を設定します。
 * @type string
 * @default 戦闘結果
 * @parent NameSetting
 * 
 * @param GetGoldName
 * @text 獲得金額の名称
 * @desc 獲得金額の名称を設定します。
 * @type string
 * @default 獲得金額
 * @parent NameSetting
 * 
 * @param GetEXPName
 * @text 獲得経験値の名称
 * @desc 獲得経験値の名称を設定します。
 * @type string
 * @default 経験値
 * @parent NameSetting
 * 
 * @param GetItemName
 * @text 入手アイテムの名称
 * @desc 入手アイテムの名称を設定します。
 * @type string
 * @default 入手アイテム
 * @parent NameSetting
 * 
 * @param LevelUpName
 * @text レベルアップの名称
 * @desc レベルアップの名称を設定します。
 * @type string
 * @default LEVEL UP
 * @parent NameSetting
 * 
 * @param learnSkillName
 * @text 習得スキルの名称
 * @desc 習得スキルの名称を設定します。
 * @type string
 * @default 習得スキル
 * @parent NameSetting
 * 
 * @param SESetting
 * @text SE設定
 * 
 * @param LevelUpSe
 * @text レベルアップ時のSE
 * @desc レベルアップ時のSEを指定します。
 * @type file
 * @dir audio/se
 * @parent SESetting
 * 
 * @param volume
 * @text SEの音量
 * @desc SEを音量を設定します。
 * @default 90
 * @parent SESetting
 * 
 * @param pitch
 * @text SEのピッチ
 * @desc SEをピッチを設定します。
 * @default 100
 * @parent SESetting
 * 
 * @param pan
 * @text SEの位相
 * @desc SEを位相を設定します。
 * @default 0
 * @parent SESetting
 * 
 */

var Imported = Imported || {};
Imported.NUUN_Result = true;

(() => {
const parameters = PluginManager.parameters('NUUN_Result');
const ActorShow = Number(parameters['ActorShow'] || 1);
const ResultWidth = Number(parameters['ResultWidth'] || 808);
const ResultHeight = Number(parameters['ResultHeight'] || 616);
const FaceWidth = Number(parameters['FaceWidth'] || 144);
const FaceHeight = Number(parameters['FaceHeight'] || 120);
const FaceScale = Number(parameters['FaceScale'] || 100);
const GaugeRefreshFrame = Number(parameters['GaugeRefreshFrame'] || 100);
const ResultName = String(parameters['ResultName'] || "戦闘結果");
const GetGoldName = String(parameters['GetGoldName'] || "");
const GetEXPName = String(parameters['GetEXPName'] || "経験値");
const GetItemName = String(parameters['GetItemName'] || "入手アイテム");
const LevelUpName = String(parameters['LevelUpName'] || "LEVEL UP");
const learnSkillName = String(parameters['learnSkillName'] || "習得スキル");
const LevelUpSe = String(parameters['LevelUpSe'] || "");
const volume = String(parameters['volume'] || 90);
const pitch = String(parameters['pitch'] || 100);
const pan = String(parameters['pan'] || 0);
let gaugeWidth = 300;

const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
  _Scene_Battle_createAllWindows.call(this);
  this.createResultHelpWindow();
  this.createResultWindow();
  this.createResultDropItemWindow();
  this.createResultButtons();
};

Scene_Battle.prototype.createResultHelpWindow = function() {
  const rect = this.resultHelpWindowRect();
  this._resultHelpWindow = new Window_ResultHelp(rect);
  this._resultHelpWindow.hide();
  this.addWindow(this._resultHelpWindow);
};

Scene_Battle.prototype.resultHelpWindowRect = function() {
  const wx = ResultWidth > 0 ? (Graphics.boxWidth - ResultWidth) / 2 : 0;
  const wy = this.resultHelpAreaTop();
  const ww = ResultWidth > 0 ? ResultWidth : Graphics.boxWidth;
  const wh = this.resultHelpAreaHeight();
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.createResultWindow = function() {
  const rect = this.resultWindowRect();
  this._resultWindow = new Window_Result(rect);
  this._resultWindow.setHandler("ok", this.onResultOk.bind(this));
  this._resultWindow.setHandler("cancel", this.onResultOk.bind(this));
  this._resultWindow.hide();
  this.addWindow(this._resultWindow);
};

Scene_Battle.prototype.resultWindowRect = function() {
  const wx = ResultWidth > 0 ? (Graphics.boxWidth - ResultWidth) / 2 : 0;
  const wy = this._resultHelpWindow.y + this.resultHelpAreaHeight();
  const ww = ResultWidth > 0 ? ResultWidth : Graphics.boxWidth;
  const wh = (ResultHeight > 0 ? ResultHeight : Graphics.boxHeight) - wy;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.createResultDropItemWindow = function() {
  const rect = this.resultDropItemWindowRect();
  this._resultDropItemWindow = new Window_ResultDropItem(rect);
  this._resultDropItemWindow.hide();
  this.addChild(this._resultDropItemWindow);
  this._resultDropItemWindow.setWindowResult(this._resultWindow);
};

Scene_Battle.prototype.resultDropItemWindowRect = function() {
  const wx = (ResultWidth > 0 ? (Graphics.width - ResultWidth) / 2 : 0) + (Graphics.width - Graphics.boxWidth) / 2;
  const wy = (Graphics.height - Graphics.boxHeight) / 2 + this._resultHelpWindow.y + this.resultHelpAreaHeight();
  const ww = this._resultWindow.width;
  const wh = this._resultWindow.height;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.createResultButtons = function() {
  if (ConfigManager.touchUI) {
      this.createResultButton();
  }
};

Scene_Battle.prototype.createResultButton = function() {
  this._okResultButton = new Sprite_Button("ok");
  this._okResultButton.x = Graphics.boxWidth - this._okResultButton.width - 4;
  this._okResultButton.y = this.resultbuttonY();
  this.addWindow(this._okResultButton);
  this._downResultButton = new Sprite_Button("pagedown");
  this._downResultButton.x = this._okResultButton.x - (24 + this._downResultButton.width);
  this._downResultButton.y = this.resultbuttonY();
  this._upResultButton = new Sprite_Button("pageup");
  this._upResultButton.x = this._downResultButton.x - this._downResultButton.width - 4;
  this._upResultButton.y = this.resultbuttonY();
  this.addWindow(this._upResultButton);
  this.addWindow(this._downResultButton);
  this._upResultButton.setClickHandler(this.updateDorpItemPageup.bind(this));
  this._downResultButton.setClickHandler(this.updateDorpItemPagedown.bind(this));
};

Scene_Battle.prototype.resultHelpAreaHeight = function() {
  return this.calcWindowHeight(1, false);
};

Scene_Battle.prototype.resultHelpAreaTop = function() {
  return this.buttonAreaHeight();
};

Scene_Battle.prototype.onResultOk = function() {
  if (this._resultWindow.actorLevelUp.length > 0 && this._resultWindow.page < this._resultWindow.actorLevelUp.length) {
    this._resultWindow.page++;
    this._resultDropItemWindow.page = 0;
    this._resultWindow.refresh();
    this._resultDropItemWindow.refresh();
    this._resultWindow.activate();
  } else {
    this._resultHelpWindow.close();
    this._resultWindow.close();
    this._resultDropItemWindow.hide();
  }
};

Scene_Battle.prototype.resultOpen = function() {
  this._resultWindow.activate();
  this._resultHelpWindow.show();
  this._resultWindow.show();
  this._resultDropItemWindow.show();
  this._resultHelpWindow.open();
  this._resultWindow.open();
  this._resultWindow.refresh();
  this._resultDropItemWindow.refresh();
};

const _Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
  _Scene_Battle_update.call(this);
  if (this._resultWindow.active) {
    if (Input.isTriggered('left')) {
      this.updateDorpItemPageup();
    } else if (Input.isTriggered('right')){
      this.updateDorpItemPagedown();
    }
  }
};

Scene_Battle.prototype.updateDorpItemPagedown = function() {
  const maxPage = this._resultDropItemWindow.maxPages();
  if (maxPage > 1) {
    SoundManager.playCursor();
    this._resultDropItemWindow.page = (this._resultDropItemWindow.page + 1) % maxPage;
    this._resultDropItemWindow.refresh();
    this._resultWindow.activate();
  }
};

Scene_Battle.prototype.updateDorpItemPageup = function() {
  const maxPage = this._resultDropItemWindow.maxPages();
  if (maxPage > 1) {
    SoundManager.playCursor();
    this._resultDropItemWindow.page = (this._resultDropItemWindow.page + (maxPage - 1)) % maxPage;
    this._resultDropItemWindow.refresh();
    this._resultWindow.activate();
  }
};

const _Scene_Battle_updateVisibility = Scene_Battle.prototype.updateVisibility;
Scene_Battle.prototype.updateVisibility = function() {
  _Scene_Battle_updateVisibility.call(this);
  this.updateResultButton();
};

Scene_Battle.prototype.updateResultButton = function() {
  if (this._okResultButton) {
      this._okResultButton.visible = this._resultWindow.active;
  }
  if (this._upResultButton && this._downResultButton) {
    this._upResultButton.visible = this._resultWindow.active && this._resultDropItemWindow.maxPages() > 1;
    this._downResultButton.visible = this._resultWindow.active && this._resultDropItemWindow.maxPages() > 1;
  }
};

Scene_Battle.prototype.resultbuttonY = function() {
  const y = Scene_Battle.prototype.buttonY.call(this);
  return y - this._helpWindow.height;
};

function Window_ResultHelp() {
  this.initialize(...arguments);
}

Window_ResultHelp.prototype = Object.create(Window_Help.prototype);
Window_ResultHelp.prototype.constructor = Window_ResultHelp;

Window_ResultHelp.prototype.initialize = function(rect) {
  Window_Help.prototype.initialize.call(this, rect);
  this.openness = 0;
  this.refresh();
};

Window_ResultHelp.prototype.refresh = function() {
  const rect = this.baseTextRect();
  this.contents.clear();
  this.drawText(ResultName, rect.x, rect.y, rect.width,"center");
};

function Window_Result() {
  this.initialize(...arguments);
}

Window_Result.prototype = Object.create(Window_StatusBase.prototype);
Window_Result.prototype.constructor = Window_Result;

Window_Result.prototype.initialize = function(rect) {
  Window_StatusBase.prototype.initialize.call(this, rect);
  this._levelUp = false;
  this.openness = 0;
  this.actorLevelUp = [];
  this.actorOldStatus = [];
  this.page = 0;
  this._actor = null;
  this.refresh();
};

Window_Result.prototype.itemHeight = function() {
  return ImageManager.faceHeight;
};

Window_Result.prototype.actor = function(index) {
  return $gameParty.battleMembers()[index];
};

Window_Result.prototype.actorMembers = function() {
  return $gameParty.battleMembers().length;
};

Window_Result.prototype.refresh = function() {
  this.contents.clear();
  const scale = FaceScale / 100;
  const rect = this.itemRect(0);
  const lineHeight = this.lineHeight();
  const itemPadding = this.itemPadding();
  if (this.page === 0) {
    const height = Math.floor(FaceHeight * scale);
    const faceArea = rect.x + Math.floor(FaceWidth * scale) + itemPadding;
    const x2 = rect.x + (rect.width - Math.floor(rect.width / 2.6));
    gaugeWidth = rect.width - Math.floor(rect.width / 2.6) - faceArea - 40;
    for (let i = 0; this.actorMembers() > i; i++) {
      this._actor = this.actor(i);
      this._actor._learnSkill = [];
      this._actor._oldStatus = [];
      let y = i * height + rect.y;
      if (ActorShow === 2) {
        this.drawActorCharacter(rect.x + FaceWidth / 2, y + 60);
      } else if (ActorShow === 1) {
        this.drawActorFace(rect.x, y, FaceWidth, FaceHeight);
      }
      this.drawActorName(rect.x + faceArea, y, rect.width - (rect.width - x2) - faceArea - 112);
      this.drawActorLevel(rect.x + x2 - 100, y);
      this.drawLevelUp(rect.x, y);
      this.drawExpGauge(rect.x + x2 - (gaugeWidth + 30), y + lineHeight * 1.3);
      this.drawGetEXP(rect.x + faceArea, y + lineHeight * 0.8);
    }
    this.drawGetGold(x2, rect.y, rect.width - x2);
    this.drawHorzLine(x2, rect.y + lineHeight, rect.width - x2);
  } else {
    for (let i = 0; this.actorMembers() > i; i++) {
      this.removeExpGauge(this.actor(i));
    }
    this._actor = this.actorLevelUp[this.page - 1];
    this.drawActorFace(rect.x, rect.y, ImageManager.faceWidth, ImageManager.faceHeight);
    this.drawActorStatusName(rect.x + 152, rect.y, rect.width - 550);
    this.drawActorStatusLevel(rect.x + 400, rect.y);
    this.drawActorStatus(rect.x, rect.y + lineHeight * 3.5, rect.width / 2 - itemPadding);
  }
};

Window_Result.prototype.drawActorFace = function(x, y, width, height) {
  this.drawFace(this._actor.faceName(), this._actor.faceIndex(), x, y, width, height);
};

Window_Result.prototype.drawExpGauge = function(x, y) {
  this.placeExpGauge(this._actor, x, y);
};

Window_Result.prototype.drawActorName = function(x, y, width) {
  this.contents.fontSize = 22;
  this.drawText(this._actor.name(), x, y, width);
  this.contents.fontSize = $gameSystem.mainFontSize();
};

Window_Result.prototype.drawActorStatusName = function(x, y, width) {
  this.drawText(this._actor.name(), x, y, width);
};

Window_Result.prototype.drawActorLevel = function(x, y) {
  const exp = BattleManager._rewards.exp;
  const actor = this._actor;
  if (exp) {
    const level = actor.resultGainExp(exp);
    const oldStatus = [];
    this.contents.fontSize = 22;
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(TextManager.levelA, x, y, 48);
    if (level > actor._level) {
      this._levelUp = true;
      for (let i = 0; i < 8; i++) {
        oldStatus[i] = actor.param(i);
      }
      oldStatus.push(actor._level);
      this.actorOldStatus.push(oldStatus);
      this.changeTextColor(ColorManager.textColor(17));
      this.actorLevelUp.push(actor);
    } else {
      this.resetTextColor();
    }
    this.drawText(level, x + 30, y, 70 - 30, "right");
    this.contents.fontSize = $gameSystem.mainFontSize();
    this.resetTextColor();
  }
};

Window_Result.prototype.drawLevelUp = function(x, y) {
  if (this._levelUp) {
    this.changeTextColor(ColorManager.textColor(17));
    this.drawText(LevelUpName, x, y, FaceWidth, "center");
    this.resetTextColor();
    this._levelUp = false;
  }
};

Window_Result.prototype.drawGetItems = function(x, y, width) {
  const items = BattleManager._rewards.items;
  const lineHeight = this.lineHeight();
  this.drawText(GetItemName, x, y, width, "left");
  if (items) {
    for (let i = 0; items.length > i; i++) {
      let y2 = y + lineHeight * (i + 1);
      this.drawItemName(items[i], x, y2, width);
    }
  }
};

Window_Result.prototype.drawGetGold = function(x, y, width) {
  const gold = BattleManager._rewards.gold;
  if (gold) {
    this.changeTextColor(ColorManager.systemColor());
    if (GetGoldName) {
      this.drawText(GetGoldName, x, y, 120, "left");
    }
    this.resetTextColor();
    this.drawCurrencyValue(gold, this.currencyUnit(), x + 120, y, width - 120);
    this.resetTextColor();
  }
};

Window_Result.prototype.drawGetEXP = function(x, y, width) {
  const exp = Math.round(BattleManager._rewards.exp * this._actor.finalExpRate());
  if (exp) {
    const textWidth = this.textWidth(GetEXPName);
    this.contents.fontSize = 22;
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(GetEXPName, x, y, width, "left");
    this.resetTextColor();
    this.drawText("+"+ exp, x + textWidth, y, width, "left");
    this.contents.fontSize = $gameSystem.mainFontSize();
  }
};

Window_Result.prototype.drawActorStatusLevel = function(x, y) {
  const oldStatus = this.actorOldStatus[this.page - 1];
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(TextManager.levelA, x, y, 48);
  this.resetTextColor();
  this.drawText(oldStatus[oldStatus.length - 1] +" → " +this._actor._level, x + 48, y, 100, "right");
};

Window_Result.prototype.drawActorStatus = function(x, y, width) {
  const lineHeight = this.lineHeight();
  const oldStatus = this.actorOldStatus[this.page - 1];
  for (let i = 0; i < oldStatus.length - 1; i++) {
    y += lineHeight;
    const name = TextManager.param(i);
    const oldValue = oldStatus[i];
    const value = this._actor.param(i);
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(name, x, y, width - 200);
    this.resetTextColor();
    this.drawText(oldValue, x + (width - 200), y, 60, "left");
    this.changeTextColor(ColorManager.systemColor());
    this.drawText("→", x + (width - 110), y, width - 160, "left");
    if (oldValue < value) {
      this.changeTextColor(ColorManager.textColor(24));
    }
    this.drawText(value, x + width - 60, y, 60, "right");
    this.resetTextColor();
  }
};

Window_Result.prototype.currencyUnit = function() {
  return TextManager.currencyUnit;
};

Window_Result.prototype.drawFace = function(faceName, faceIndex, x, y, width, height) {
  width = width || ImageManager.faceWidth;
  height = height || ImageManager.faceHeight;
  const scale = FaceScale / 100;
  const bitmap = ImageManager.loadFace(faceName);
  const pw = ImageManager.faceWidth;
  const ph = ImageManager.faceHeight;
  const sw = Math.min(width, pw);
  const sh = Math.min(height, ph);
  const dy = Math.floor(y + Math.max(height - ph, 0) / 2);
  const sx = Math.floor((faceIndex % 4) * pw + (pw - sw) / 2);
  const sy = Math.floor(Math.floor(faceIndex / 4) * ph + (ph - sh) / 2);
  const dw = Math.floor(sw * scale);
  const dh = Math.floor(sh * scale);
  this.contents.blt(bitmap, sx, sy, sw, sh, x, dy, dw, dh);
};

Window_Result.prototype.drawActorCharacter = function(x, y) {
  this.drawCharacter(this._actor.characterName(), this._actor.characterIndex(), x, y);
};

Window_Result.prototype.placeExpGauge = function(actor, x, y) {
  const type = 'result_exp'
  const key = "resultActor%1-gauge-%2".format(actor.actorId(), type);
  const sprite = this.createInnerSprite(key, Sprite_ResultExpGauge);
  sprite.setup(actor, type);
  sprite.move(x, y);
  sprite.show();
};

Window_Result.prototype.removeExpGauge = function(actor) {
  const type = 'result_exp'
  const key = "resultActor%1-gauge-%2".format(actor.actorId(), type);
  const dict = this._additionalSprites;
  if (dict[key]) {
    this._clientArea.removeChild(dict[key]);
    dict[key] = null;
  }
};

Window_Result.prototype.drawHorzLine = function(x, y, width) {
  const lineY = y + this.lineHeight() / 2 - 1;
  this.contents.paintOpacity = 48;
  this.contents.fillRect(x, lineY, width, 2, ColorManager.normalColor());
  this.contents.paintOpacity = 255;
};

Window_Result.prototype.onTouchCancel = function() {
  if (this.isCancelEnabled()) {
      this.processOk();
  }
};

function Window_ResultDropItem() {
  this.initialize(...arguments);
}

Window_ResultDropItem.prototype = Object.create(Window_StatusBase.prototype);
Window_ResultDropItem.prototype.constructor = Window_ResultDropItem;

Window_ResultDropItem.prototype.initialize = function(rect) {
  Window_StatusBase.prototype.initialize.call(this, rect);
  this.page = 0;
  this.maxPage = 0;
  this.dropItemRows = Math.floor((this.innerHeight - this.lineHeight() * 3) / this.lineHeight());
  this.skillRows = Math.floor((this.innerHeight - this.lineHeight() * 5.5) / this.lineHeight());
  this.opacity = 0;
  this.frameVisible = false;
};

Window_ResultDropItem.prototype.setWindowResult = function(windowResult) {
  this._windowResult = windowResult;
};

Window_ResultDropItem.prototype.maxPages = function() {
  if (this._windowResult.page > 0) {
    return Math.ceil(this._windowResult._actor._learnSkill.length / this.skillRows)
  } else {
    return Math.ceil(BattleManager._rewards.items.length / this.dropItemRows);
  }
};

Window_ResultDropItem.prototype.refresh = function() {
  this.contents.clear();
  const rect = this.itemRect(0);
  const lineHeight = this.lineHeight();
  const itemPadding = this.itemPadding();
  const x = rect.x + (rect.width - Math.floor(rect.width / 2.6));
  if (this._windowResult.page > 0) {
    const actor = this._windowResult._actor;
    this.drawLearnSkill(actor, rect.x + rect.width / 2 + itemPadding, rect.y + lineHeight * 4.5, rect.width / 2 - itemPadding);
  } else {
    this.drawGetItems(x, rect.y + lineHeight * 2, rect.width - x);
  }
};

Window_ResultDropItem.prototype.drawGetItems = function(x, y, width) {
  const items = BattleManager._rewards.items;
  const lineHeight = this.lineHeight();
  const maxPage = this.maxPages();
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(GetItemName, x, y, width - 48, "left");
  this.resetTextColor();
  if (items) {
    const index = this.dropItemRows * this.page;
    const maxItems = Math.min(this.dropItemRows, items.length - index);
    if (maxPage > 1) {
      this.drawText(this.page + 1 +"/"+maxPage, x, y, width, "right");
    }
    for (let i = 0; maxItems > i; i++) {
      let y2 = y + lineHeight * (i + 1);
      this.drawItemName(items[i + index], x, y2, width);
    }
  }
};

Window_ResultDropItem.prototype.drawLearnSkill = function(actor, x, y, width) {
  const lineHeight = this.lineHeight();
  const learnSkill = actor._learnSkill;
  const maxPage = this.maxPages();
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(learnSkillName, x, y, width - 48, "left");
  this.resetTextColor();
  if (learnSkill) {
    const index = this.skillRows * this.page;
    const maxItems = Math.min(this.skillRows, learnSkill.length - index);
    if (maxPage > 1) {
      this.drawText(this.page + 1 +"/"+maxPage, x, y, width, "right");
    }
    for (let i = 0; i < maxItems; i++) {
      let y2 = y + lineHeight * (i + 1);
      const skill =  $dataSkills[learnSkill[i + index]];
      this.drawItemName(skill, x, y2, width);
    }
  }
};


const _BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
  _BattleManager_initMembers.call(this);
  this.onResult = false;
};

BattleManager.displayVictoryMessage = function() {
};

BattleManager.displayRewards = function() {
  SceneManager._scene.resultOpen();
  this.onResult = true;
};

const _BattleManager_gainRewards = BattleManager.gainRewards;
BattleManager.gainRewards = function() {
  _BattleManager_gainRewards.call(this);
  this.onResult = false;
};

const _BattleManager_isBusy = BattleManager.isBusy;
BattleManager.isBusy = function() {
  return SceneManager._scene._resultWindow.active || _BattleManager_isBusy.call(this);
};

function Sprite_ResultExpGauge() {
  this.initialize(...arguments);
}

Sprite_ResultExpGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_ResultExpGauge.prototype.constructor = Sprite_ResultExpGauge;

Sprite_ResultExpGauge.prototype.initialize = function() {
  Sprite_Gauge.prototype.initialize.call(this);
  this._currentExp = 0;
  this._startCurrentExp = 0;
};

Sprite_ResultExpGauge.prototype.bitmapWidth = function() {
  return gaugeWidth;
};

Sprite_ResultExpGauge.prototype.setup = function(battler, statusType) {
  this._nowLevel = battler._level;
  Sprite_Gauge.prototype.setup.call(this, battler, statusType);
  this._instant = false;
  this._startCurrentExp = battler.currentExp() - battler.currentLevelExp();
};

const _Sprite_Gauge_drawValue = Sprite_Gauge.prototype.drawValue;
Sprite_Gauge.prototype.drawValue = function() {
  if (this._statusType === "result_exp") {
    let currentValue = 0;
    const width = this.bitmapWidth();
    const height = this.bitmapHeight();
    this.setupValueFont();
    //currentValue = this._battler.isMaxLevel() ? "-------" : this.currentValue();
    //this.bitmap.drawText(currentValue, width - 100, 0, 100, height, "right");
  } else {
    _Sprite_Gauge_drawValue.call(this);
  }
};

const _Sprite_Gauge_currentValue = Sprite_Gauge.prototype.currentValue;
Sprite_Gauge.prototype.currentValue = function() {
  return this._battler && this._statusType === "result_exp" ? 
  Math.min(this._battler.currentExp() - this._battler.expForLevel(this._nowLevel), this.currentMaxValue()) : _Sprite_Gauge_currentValue.call(this);
};

const _Sprite_Gauge_currentMaxValue = Sprite_Gauge.prototype.currentMaxValue;
Sprite_Gauge.prototype.currentMaxValue = function() {
  return this._battler && this._statusType === "result_exp" ? this._battler.expForLevel(this._nowLevel + 1) - this._battler.expForLevel(this._nowLevel) :
    _Sprite_Gauge_currentMaxValue.call(this);
};

Sprite_ResultExpGauge.prototype.updateTargetValue = function(value, maxValue) {
  if (this._instant) {
    this._startCurrentExp = 0;
  }
  Sprite_Gauge.prototype.updateTargetValue.call(this, value, maxValue);
};

Sprite_ResultExpGauge.prototype.updateGaugeAnimation = function() {
  if (this._instant) {
    this._value = 0;
    this._maxValue = this._targetMaxValue;
    if (Imported.NUUN_GaugeValueAnimation) {
      this._moveValue = 0;
    }
    this.redraw();
    this._instant = false;
  } else {
    Sprite_Gauge.prototype.updateGaugeAnimation.call(this);
  }
  if (this._nowLevel < this._battler._level && this._duration === 0) {
    this._nowLevel++;
    this._instant = true;
    AudioManager.playSe({"name":LevelUpSe,"volume":volume,"pitch":pitch,"pan":pan});
  }
};

Sprite_ResultExpGauge.prototype.smoothSpeed = function() {
  return (this.currentValue() - this._startCurrentExp) / BattleManager._rewards.exp;
};

Sprite_ResultExpGauge.prototype.smoothness = function() {
  return Math.max(Math.floor(Sprite_Gauge.prototype.smoothness.call(this) * this.smoothSpeed()), 1);
};

const _Sprite_Gauge_smoothness = Sprite_Gauge.prototype.smoothness;
Sprite_Gauge.prototype.smoothness = function() {
  return this._statusType === "result_exp" ? GaugeRefreshFrame : _Sprite_Gauge_smoothness.call(this);
};

Sprite_ResultExpGauge.prototype.currentPercent = function() {
  return (this._battler.currentExp() - this._battler.currentLevelExp()) / (this._battler.nextLevelExp() - this._battler.currentLevelExp()) * 100;
};

Sprite_ResultExpGauge.prototype.currentDecimal = function(val) {
  if (param.DecimalMode) {
    return Math.round(val * (param.Decimal > 0 ? Math.pow(10, param.Decimal) : 1)) / (param.Decimal > 0 ? Math.pow(10, param.Decimal) : 1);
  } else {
    return Math.floor(val * (param.Decimal > 0 ? Math.pow(10, param.Decimal) : 1)) / (param.Decimal > 0 ? Math.pow(10, param.Decimal) : 1);
  }
};

const _Sprite_Gauge_gaugeColor1 = Sprite_Gauge.prototype.gaugeColor1;
Sprite_Gauge.prototype.gaugeColor1 = function() {
  return this._statusType === "result_exp" ? ColorManager.expGaugeColor1() : _Sprite_Gauge_gaugeColor1.call(this);
};

const _Sprite_Gauge_gaugeColor2 = Sprite_Gauge.prototype.gaugeColor2;
Sprite_Gauge.prototype.gaugeColor2 = function() {
  return this._statusType === "result_exp" ? ColorManager.expGaugeColor2() : _Sprite_Gauge_gaugeColor2.call(this);
};

Sprite_ResultExpGauge.prototype.gaugeColor1 = function() {
  return ColorManager.expGaugeColor1();
};

Sprite_ResultExpGauge.prototype.gaugeColor2 = function() {
  return ColorManager.expGaugeColor2();
};

ColorManager.expGaugeColor1 = function() {
  return this.textColor(17);
};

ColorManager.expGaugeColor2 = function() {
  return this.textColor(6);
};

Game_Actor.prototype.resultGainExp = function(exp) {
  const newExp = Math.max(this.currentExp() + Math.round(exp * this.finalExpRate()), 0);
  let level = this._level;
  while (!this.resultIsMaxLevel(level) && newExp >= this.resultNextLevelExp(level)) {
    level++;
  }
  return level;
};

Game_Actor.prototype.resultIsMaxLevel = function(level) {
  return level >= this.maxLevel();
};

Game_Actor.prototype.resultNextLevelExp = function(level) {
  return this.expForLevel(level + 1);
};

const _Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
Game_Actor.prototype.learnSkill = function(skillId) {
  if (!this.isLearnedSkill(skillId) && this._learnSkill && BattleManager.onResult) {
    this._learnSkill.push(skillId);
  }
  _Game_Actor_learnSkill.call(this, skillId);
};

const _Game_Actor_shouldDisplayLevelUp = Game_Actor.prototype.shouldDisplayLevelUp;
Game_Actor.prototype.shouldDisplayLevelUp = function() {
  return BattleManager.onResult ? false : _Game_Actor_shouldDisplayLevelUp.call(this);
};

})();