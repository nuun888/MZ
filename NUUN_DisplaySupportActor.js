/*:-----------------------------------------------------------------------------------
 * NUUN_DisplaySupportActor.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc サポートアクターインジケータ（サポートアクター拡張）
 * @author NUUN
 * @version 1.4.0
 * @base NUUN_SupportActor
 * 
 * @help
 * 参加しているサポートアクターを表示させます。
 * このプラグインはサポートアクター（NUUN_SupportActor）の拡張機能です。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/5/15 Ver.1.4.0
 * 処理の改修。
 * ターン制でコマンド選択後サポートアクターの位置が戻らない問題を修正。
 * 2022/3/28 Ver.1.3.3
 * サポートアクター更新により定義変更。
 * 2022/1/4 Ver.1.3.2
 * サポートアクターがメンバーから離脱した後にエラーが出る問題を修正。
 * 2021/8/13 Ver.1.3.1
 * サポートアクターが追加されたときにサポートアクターウィンドウの動作がおかしくなる問題を修正。
 * サポートアクターが参加していない場合はコマンドに表示しないように修正。
 * 2021/8/13 Ver.1.3.0
 * サポートアクターウィンドウの初期表示を指定できる機能を追加。
 * 2021/8/12 Ver.1.2.0
 * サポートアクターウィンドウを非表示にする機能を追加。
 * 2021/8/12 Ver.1.1.0
 * ウィンドウの表示の仕様を変更。
 * 右側表示に対応。
 * 2021/8/11 Ver.1.0.0
 * 初版
 * 
 * @param WindowSetting
 * @text ウィンドウ設定
 * @default ------------------------------
 * 
 * @param Window_X
 * @text 基本サポートアクターウィンドウX
 * @desc 基準となるサポートアクターウィンドウX座標
 * @type number
 * @default 0
 * @parent WindowSetting
 * 
 * @param Window_Y
 * @text 基本サポートアクターウィンドウY
 * @desc 基準となるサポートアクターウィンドウY座標
 * @type number
 * @default 96
 * @parent WindowSetting
 * 
 * @param Window_Width
 * @text サポートアクターウィンドウ横幅
 * @desc サポートアクターウィンドウ横幅
 * @type number
 * @default 128
 * @parent WindowSetting
 * 
 * @param Window_Margin
 * @text サポートアクターウィンドウ間余白幅
 * @desc サポートアクターウィンドウ間の余白幅
 * @type number
 * @default 24
 * @parent WindowSetting
 * 
 * @param SupporterName
 * @text サポートアクター表示名
 * @desc サポートアクター表示名
 * @type string
 * @default Supporter
 * @parent WindowSetting
 * 
 * @param SummonName
 * @text 召喚アクター表示名(未実装)
 * @desc 召喚アクター表示名
 * @type string
 * @default Summon
 * @parent WindowSetting
 * 
 * @param InitSupport
 * @text サポートアクターウィンドウ初期表示状態
 * @desc サポートアクターウィンドウ初期表示状態を指定します。ONで表示します。
 * @type boolean
 * @default true
 * @parent WindowSetting
 * 
 * @param RightDisplay
 * @text 右側表示
 * @desc 右側表示
 * @type boolean
 * @default false
 * @parent WindowSetting
 * 
 * @param CommandSetting
 * @text コマンド設定
 * @default ------------------------------
 * 
 * @param CommandShow
 * @text コマンド表示
 * @desc サポートアクター表示コマンドをパーティコマンドに表示させます。
 * @type boolean
 * @default true
 * @parent CommandSetting
 * 
 * @param SupportShowName
 * @text サポートアクター表示コマンド名
 * @desc サポートアクター表示コマンド名
 * @type string
 * @default サポートアクター表示
 * @parent CommandSetting
 * 
 */
var Imported = Imported || {};
Imported.NUUN_DisplaySupportActor = true;

(() => {
const parameters = PluginManager.parameters('NUUN_DisplaySupportActor');
const Window_X = Number(parameters['Window_X'] || 0);
const Window_Y = Number(parameters['Window_Y'] || 96);
const Window_Width = Number(parameters['Window_Width'] || 128);
const Window_Margin = Number(parameters['Window_Margin'] || 24);
const SupporterName = String(parameters['SupporterName'] || 'Supporter');
const SummonName = String(parameters['SummonName'] || 'Summon');
const SupportShowName = String(parameters['SupportShowName'] || "サポートアクター表示");
const InitSupport = eval(parameters['InitSupport'] || 'true');
const RightDisplay = eval(parameters['RightDisplay'] || 'false');
const CommandShow = eval(parameters['CommandShow'] || 'true');


const _Scene_Battle_initialize = Scene_Battle.prototype.initialize;
Scene_Battle.prototype.initialize = function() {
  _Scene_Battle_initialize.call(this);
  this._supportActorWindowEX = [];
};

const _Scene_Battle_createSpriteset = Scene_Battle.prototype.createSpriteset;
Scene_Battle.prototype.createSpriteset = function() {
  _Scene_Battle_createSpriteset.call(this);
  this.createSupportActorBaseSprite();
};

Scene_Battle.prototype.createSupportActorBaseSprite = function() {
  if (!this._supportActorBaseSprite) {
    const baseSprite = new Sprite();
    this.addChild(baseSprite);
    this._supportActorBaseSprite = baseSprite;
  }
};

const _Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
  _Scene_Battle_update.call(this);
  this.updateSupportActor();
};

Scene_Battle.prototype.updateSupportActor = function() {
  if ($gameTemp.isSupportActorRefreshRequested()) {
    this._supportActorWindowEX.forEach(window => {
      window._actor = null;
      window.hide();
    });
    this.refreshSupportActorWindow();
    $gameTemp.clearSupportActorRequest();
  }
};

Scene_Battle.prototype.refreshSupportActorWindow = function() {
  const members = $gameParty.supportActorMembers();
  members.forEach((member, i) => {
    this.setRefreshSupportActorWindow(member, i);
  });
};

Scene_Battle.prototype.setSupportActorWindow = function(actor, index) {
  if (!this._supportActorWindowEX[index]) {
    const rect = this.supportActorWindowRect(index);
    const supportActorWindow = new Window_SupportActorEX(rect);
    this._supportActorBaseSprite.addChild(supportActorWindow);
    this._supportActorWindowEX[index] = supportActorWindow;
    this._supportActorWindowEX[index].initPosition(true);
  }
  const window = this._supportActorWindowEX[index];
  window.setup(actor);
  window.show();
};

Scene_Battle.prototype.setRefreshSupportActorWindow = function(actor, index) {
  if (!this._supportActorWindowEX[index]) {
    const rect = this.supportActorWindowRect(index);
    const supportActorWindow = new Window_SupportActorEX(rect);
    this._supportActorBaseSprite.addChild(supportActorWindow);
    this._supportActorWindowEX[index] = supportActorWindow;
    this._supportActorWindowEX[index].initPosition(false);
  }
  const window = this._supportActorWindowEX[index];
  window.setup(actor);
  if (BattleManager.displayStartSupport) {
    window.setMove(0, 20);
  }
  window.show();
};


Scene_Battle.prototype.createSupportActorWindow = function() {
  const members = $gameParty.supportActorMembers();
  members.forEach((member, i) => {
    this.setSupportActorWindow(member, i);
  });
  $gameTemp.clearSupportActorRequest();
};

Scene_Battle.prototype.supportActorWindowRect = function(index) {
  const ww = Window_Width + 40;
  const wh = this.calcWindowHeight(1, true);
  const wx = Window_X + (RightDisplay ? Graphics.width - Window_Width : -40) ;
  const wy = Window_Y + (wh + Window_Margin) * index;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.commandStartActor = function() {
  if (BattleManager.displayStartSupport) {
    this.supportActorHide();
    this._partyCommandWindow.activate();
  } else {
    this.supportActorShow();
    this._partyCommandWindow.activate();
  }
};

Scene_Battle.prototype.supportActorShow = function() {
  for (const window of this._supportActorWindowEX) {
    window.displayShow();
  }
  BattleManager.displayStartSupport = true;
};

Scene_Battle.prototype.supportActorHide = function() {
  for (const window of this._supportActorWindowEX) {
    window.displayHide();
  }
  BattleManager.displayStartSupport = false;
};


function Window_SupportActorEX() {
  this.initialize(...arguments);
}

Window_SupportActorEX.prototype = Object.create(Window_Selectable.prototype);
Window_SupportActorEX.prototype.constructor = Window_SupportActorEX;

Window_SupportActorEX.prototype.initialize = function(rect) {
  Window_Selectable.prototype.initialize.call(this, rect);
  this._actor = null;
  this._speed = 1;
  this._move_x = 0;
  this._moveOn = false;
  this._homeX = this.x;
};

Window_SupportActorEX.prototype.setup = function(actor) {
  this._actor = actor;
  this.refresh();
};

Window_SupportActorEX.prototype.colSpacing = function() {
  return 0;
};

Window_SupportActorEX.prototype.setMove = function(x, speed) {
  const a = (RightDisplay ? -1 : 1);
  this._move_x = x * a;
  this._speed = (speed || 0) * a;
  this._moveOn = true;
};

Window_SupportActorEX.prototype.initPosition = function(mode) {
  if (mode) {
    this.x = this._homeX + (BattleManager.displayStartSupport ? 0 : Window_Width * (RightDisplay ? 1 : -1));
  } else {
    this.x = this._homeX + Window_Width * (RightDisplay ? 1 : -1);
  }
};

const _Window_SupportActorEX_update = Window_SupportActorEX.prototype.update;
Window_SupportActorEX.prototype.update = function() {
  _Window_SupportActorEX_update.call(this);
  this.updateSupportActor();
  this.updateMove();
};

Window_SupportActorEX.prototype.updateSupportActor = function() {
  if (!this._moveOn && BattleManager.actor() === this._actor) {
    if (this.x !== this._homeX + 30 * (RightDisplay ? -1 : 1)) {
      const speed = BattleManager.displayStartSupport ? 5 : 20;
      this.setMove(30, speed);
    }
  } else if (!this._moveOn && this.x !== this._homeX &&  BattleManager.actor() !== this._actor) {
    if (!BattleManager.displayStartSupport) {
      this.displayHide();
    } else {
      this.setMove(0, -5);
    }
  }
};

Window_SupportActorEX.prototype.updateMove = function() {
  if (this._moveOn) {
    const move_x = this._homeX + this._move_x;
    this.x += this._speed;
    if (this._speed === 0) {
      this.x = move_x;
    } else if (this._speed > 0) {
      this.x = Math.min(this.x, move_x);
    } else if (this._speed < 0) {
      this.x = Math.max(this.x, move_x);
    }
    if (this.x === move_x) {
      this._moveOn = false;
    }
  }
};

Window_SupportActorEX.prototype.refresh = function() {
  const rect = this.itemLineRect(0);
  this.contents.clear();
  this.drawActorCharacter(rect.x, rect.y, rect.width);
  this.drawName(rect.x, rect.y, rect.width);
  this.drawSupporterName(rect.x, rect.y, rect.width);
};

Window_SupportActorEX.prototype.drawName = function(x, y, width) {
  this.contents.fontSize += -4;
  const a = RightDisplay ? 0 : 72;
  const align = RightDisplay ? 'right' : 'left';
  this.drawText(this._actor.name(), x + a, y + 6, width - 72, align);
  this.contents.fontSize = $gameSystem.mainFontSize();
};

Window_SupportActorEX.prototype.drawSupporterName = function(x, y, width) {
  const summon = this._actor._summonActor;
  const text = summon ? SummonName : SupporterName;
  if (text) {
    this.contents.fontSize += -12;
    if (summon) {
      this.changeTextColor(ColorManager.textColor(18));
    } else {
      this.changeTextColor(ColorManager.textColor(5));
    }
    this.contents.outlineColor = 'rgba(64, 32, 128, 0.6)';
    const a = RightDisplay ? 0 : 72;
    const align = RightDisplay ? 'right' : 'left';
    this.drawText(text, x + a, y - 14, width - 72, align);
    this.resetTextColor();
    this.contents.fontSize = $gameSystem.mainFontSize();
  }
};

Window_SupportActorEX.prototype.drawActorCharacter = function(x, y, width) {
  x += RightDisplay ? this.itemWidth() - 62 : 48;
  y += 46;
  const bitmap = ImageManager.loadCharacter(this._actor.characterName());
  if (!bitmap.isReady()) {
    bitmap.addLoadListener(this.drawCharacter.bind(this, this._actor.characterName(), this._actor.characterIndex(), x, y));
  } else {
    this.drawCharacter(this._actor.characterName(), this._actor.characterIndex(), x, y);
  }
};

Window_SupportActorEX.prototype.displayShow = function() {
  if (this.visible && this._actor) {
    if (BattleManager.actor() == this._actor) {
      this.setMove(30, 20);
    } else {
      this.setMove(0, 20);
    }
  }
};

Window_SupportActorEX.prototype.displayHide = function() {
  if (this.visible && this._actor) {
    this.setMove(Window_Width * -1, -20);
  }
};


const _Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
Scene_Battle.prototype.createPartyCommandWindow = function() {
  _Scene_Battle_createPartyCommandWindow.call(this);
  this._partyCommandWindow.setHandler("startActor", this.commandStartActor.bind(this));
};

const _Window_PartyCommand_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
Window_PartyCommand.prototype.makeCommandList = function() {
  _Window_PartyCommand_makeCommandList.call(this);
  if (CommandShow && $gameParty.supportActorMembers().length > 0) {
    this.addCommand(SupportShowName, "startActor");
  }
};



const _Game_Temp_requestBattleRefresh = Game_Temp.prototype.requestBattleRefresh;
Game_Temp.prototype.requestBattleRefresh = function() {
  _Game_Temp_requestBattleRefresh.call(this);
  this.requestSupportActorRefresh();
};

Game_Temp.prototype.requestSupportActorRefresh = function() {
  this._needsSupportActorRefresh = true;
};

Game_Temp.prototype.clearSupportActorRequest = function() {
  this._needsSupportActorRefresh = false;
};

Game_Temp.prototype.isSupportActorRefreshRequested = function() {
  return this._needsSupportActorRefresh;
};


const _BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
  _BattleManager_initMembers.call(this);
  this.displayStartSupport = InitSupport;
};

})();