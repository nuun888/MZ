/*:-----------------------------------------------------------------------------------
 * NUUN_BattleStyleEX_Base.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc バトルスタイル拡張ベース
 * @author NUUN
 * @version 2.0.7
 *            
 * @help バトルスタイル拡張プラグインのベースプラグインです。単体では動作しません。
 * 
 * 更新履歴
 * 2021/3/26 Ver 2.0.7
 * 立ち絵表示EXに対応。
 * 2021/3/22 Ver 2.0.6
 * プラグインコマンドにアクターウィンドウを非表示にする機能を追加。
 * プラグインコマンドにアクターウィンドウを不透明化にする機能を追加。
 * モンスターの出現メッセージをカットする機能を追加。
 * 2021/3/21 Ver 2.0.5
 * 戦闘開始時に立ち絵が切り替わらない問題を修正。
 * 2021/3/21 Ver 2.0.4
 * 立ち絵画像を取得できない問題を修正。
 * 2021/3/20 Ver 2.0.3
 * アクション開始時にパーティコマンドが一瞬表示される問題を修正。
 * リザルトプラグインの表示中はアクターステータスウィンドウを非表示に対応。
 * 2021/1/24 Ver 2.0.2
 * フロントビューでアクター側に「戦闘行動結果ポップアッププラグイン」が適用されるように対応。
 * 2021/1/17 Ver 2.0.1
 * ゲージの縦幅を指定できる機能を追加。
 * 2021/1/17 Ver 2.0.0
 * ベースプラグインとレイアウト設定用のプラグインを別々に分割。
 * 2021/1/12 Ver.1.5.2
 * アクターコマンドの設定によっては、コマンドが画面の端から見切れる問題を修正。
 * 2021/1/11 Ver.1.5.1
 * アクターステータス背景画像が指定されてない時に、アクター背景を表示するに設定しても背景が表示されない問題を修正。
 * 2021/1/11 Ver.1.5.0
 * アクターステータスに任意の背景画像を表示できる機能を追加。
 * 2021/1/10 Ver.1.4.2
 * アクターウィンドウ座標変更許可をtrueにした場合でもウィンドウを中央に配置できるように変更。
 * 特定の条件でアニメーションがずれる問題を修正。
 * 2021/1/2 Ver.1.4.1
 * NUUN_IconSideBySide対応
 * 2020/12/31 Ver.1.4.0
 * アクターウィンドウを自由に配置できる機能を追加。
 * アクターの配置をある程度設定できるように機能を追加。
 * フロントビューでエフェクトを表示させない機能を追加。
 * スキル、アイテム、エネミー選択画面の不透明度を個別に無効化できる機能を追加。
 * 各ゲージ長を個別に設定可能に変更。
 * 2020/12/29 Ver.1.3.4.1
 * ステート変化IDの説明が古いバージョンの記述法のままだったのを修正。
 * 2020/12/29 Ver.1.3.4
 * パーティコマンドを「アクターウィンドウの上」で表示された時、表示されない問題を修正。
 * 2020/12/28 Ver.1.3.3
 * 特定の条件下でアクター画像、顔グラがぼやけて表示される不具合を修正。
 * 被ステート時のグラフィックがステートのモーションが通常の時に、画像の変更が反映されない不具合を修正。
 * 被ステート時のグラフィックが変更後に別の被ステート時のグラフィックが変更されるときに正常に表示されない不具合を修正。
 * 2020/12/25 Ver.1.3.2
 * イベントコマンドでアニメーションを表示させるとエラーが出る不具合を修正。
 * 2020/12/23 Ver.1.3.1
 * アクター行動選択時に表示される背景画像の表示とアクター対象選択時に表示される背景画像を非表示に出来るように機能を追加。
 * 2020/12/21 Ver.1.3.0
 * 戦闘不能時のグラフィックを設定してない時に、戦闘不能時のアクター画像（顔グラ）を表示したままにするか選択できるようにしました。（従来の方法でも可能）
 * パーティコマンドの表示位置、行数、列数を指定できるように変更。
 * アクターコマンドに上、中間、アクターウィンドウの上に表示できる機能を追加。
 * アクターコマンドの表示位置、行数、列数を指定できるように変更。
 * エネミー出現、リザルト、敗北、逃走メッセージを画面上側か画面下側に表示を選択できる機能を追加。
 * メッセージウインドウを下側にも表示可能に修正。メッセージウィンドウが下側に表示された場合でも「選択時ウィンドウ不透明度」が適用されます。
 * 2020/12/19 Ver.1.2.0.1
 * アクターウィンドウ表示を非表示に設定しても表示してしまう不具合を修正。
 * 2020/12/19 Ver.1.2.0
 * アクター選択時にアクター画像（顔グラ）を点滅させる機能を追加。
 * 2020/12/17 Ver.1.1.3
 * メッセージウィンドウを下に表示（アクターウィンドウの前面）させないように修正。
 * （メッセージウィンドウを下に表示で設定した場合、バトル中のみ自動的に上に表示されます）Ver.1.3.0で下側にも表示できるようになりました。
 * 2020/12/16 Ver.1.1.2
 * エネミー、アイテム、スキル選択画面を表示している時のアクターウィンドウに不透明度を指定できる機能を追加。
 * 2020/12/9 Ver.1.1.1
 * 名前を非表示にできる機能を追加。
 * 2020/12/9 Ver.1.1.0
 * アクターステータスウィンドウの表示処理を見直し。
 * アクターステータスウィンドウに背景画像を指定出来る機能を追加。
 * 2020/12/8 Ver.1.0.2
 * 戦闘開始時に戦闘不能のアクター画像が一瞬表示されないように修正。
 * 2020/12/7 Ver.1.0.1
 * バトラーアニメーションに勝利、詠唱時の画像を変更する機能を追加。
 * 2020/12/6 Ver.1.0.0
 * 初版
 * 
 * @command ActorStatusWindowVisible
 * @desc アクターステータスの表示を切り替えます。
 * @text アクターステータス表示切替
 * 
 * @arg WindowVisible
 * @type boolean
 * @default false
 * @text 表示切替
 * @desc 表示の切り替えをします。(trueで表示)
 * 
 * @command ActorStatusWindowOpacity
 * @desc アクターステータスを不透明化します。
 * @text アクターステータス不透明化表示
 * 
 * @arg WindowOpacity
 * @type boolean
 * @default false
 * @text 不透明度表示
 * @desc ONのアクターステータスが不透明化します。(trueで不透明化)
 */
var Imported = Imported || {};
Imported.NUUN_BattleStyleEX_Base = true;

(() => {
let parameters = null;
if (Imported.NUUN_BattleStyleEX) {
  parameters = PluginManager.parameters('NUUN_BattleStyleEX');
}
if (parameters === null) {
  return;
}
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
BattleManager.NUUN_BattleStyleDate = param;

const pluginName = "NUUN_BattleStyleEX_Base";
PluginManager.registerCommand(pluginName, 'ActorStatusWindowVisible', args => {
  BattleManager.statusWindowVisible(eval(args.WindowVisible));
});

PluginManager.registerCommand(pluginName, 'ActorStatusWindowOpacity', args => {
  BattleManager.statusWindowOpacity(eval(args.WindowOpacity));
});

ImageManager.loadSystem(param.actorBackground);
ImageManager.loadSystem(param.windowBackground);

loadBattleStyleActorImg = function(filename) {
  return ImageManager.loadPicture(filename);
};

//Game_Temp
Game_Temp.prototype.setBattleEffectsRefresh = function(flag) {
  this._battleEffectRefresh = flag;
};

Game_Temp.prototype.isBattleEffectsRefresh = function() {
  return this._battleEffectRefresh || false;
};

//Game_Actor
const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
  _Game_Actor_initMembers.call(this);
  this._imgIndex = 0;
};

const _Game_Actor_performDamage = Game_Actor.prototype.performDamage;
Game_Actor.prototype.performDamage = function() {
  _Game_Actor_performDamage.call(this);
  this._imgIndex = 3;
};

const _Game_Actor_performVictory = Game_Actor.prototype.performVictory;
Game_Actor.prototype.performVictory = function() {
  _Game_Actor_performVictory.call(this);
  this._imgIndex = 5;
};

//Game_Enemy
Game_Enemy.prototype.attackAnimation = function() {
  return this.bareHandsAnimationId();
};

Game_Enemy.prototype.bareHandsAnimationId = function() {
  return $dataEnemies[this._enemyId].meta.AttackAnimation || 1;
};

//BattleManager
const _BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
  _BattleManager_initMembers.call(this);
  this.actorStatusWindowVisible = true;
  this.actorStatusWindowOpacity = false;
};

BattleManager.statusWindowVisible = function(args) {
  this.actorStatusWindowVisible = args;
};

BattleManager.statusWindowOpacity = function(args) {
  this.actorStatusWindowOpacity = args;
};

BattleManager.displayMessagePosition = function() {
  $gameMessage._positionType = param.MessageWindowPosition ? 0 : 2;
};

const _BattleManager_displayStartMessages = BattleManager.displayStartMessages;
BattleManager.displayStartMessages = function() {
  if (!param.AppearWindowVisible) {
    _BattleManager_displayStartMessages.call(this);
    this.displayMessagePosition();
  }
};

const _BattleManager_displayVictoryMessage = BattleManager.displayVictoryMessage;
BattleManager.displayVictoryMessage = function() {
  _BattleManager_displayVictoryMessage.call(this);
  this.displayMessagePosition();
};

const _BattleManager_displayDefeatMessage = BattleManager.displayDefeatMessage;
BattleManager.displayDefeatMessage = function() {
  _BattleManager_displayDefeatMessage.call(this);
  this.displayMessagePosition();
};

const _BattleManager_displayEscapeSuccessMessage = BattleManager.displayEscapeSuccessMessage;
BattleManager.displayEscapeSuccessMessage = function() {
  _BattleManager_displayEscapeSuccessMessage.call(this);
  this.displayMessagePosition();
};

const _BattleManager_displayEscapeFailureMessage = BattleManager.displayEscapeFailureMessage;
BattleManager.displayEscapeFailureMessage = function() {
  _BattleManager_displayEscapeFailureMessage.call(this);
  this.displayMessagePosition();
};

//Scene_Battle
const _Scene_Battle_initialize = Scene_Battle.prototype.initialize;
Scene_Battle.prototype.initialize = function() {
  _Scene_Battle_initialize.call(this);
  this._onAction = false;
};

const _Scene_Battle_createSpriteset = Scene_Battle.prototype.createSpriteset;
Scene_Battle.prototype.createSpriteset = function() {
  _Scene_Battle_createSpriteset.call(this);
  this._spriteset.createStatusLayer();
  this.addChild(this._spriteset._battleHudBase);
};

const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
  this._battleHudBack = this._spriteset._battleHudBack;
  this._battleHudFront = this._spriteset._battleHudFront;
  this._battleEffects = this._spriteset._battleEffects;
  this.createHud();
  this.createActorSelectWindow();
  _Scene_Battle_createAllWindows.call(this);
  this.statusWindow_Top = this._statusWindow.y - this._messageWindow.height - (Graphics.height - Graphics.boxHeight) / 2;
  this.statusWindow_Under = this._statusWindow.y + this._statusWindow.height - (Graphics.height - Graphics.boxHeight) / 2;
};

Scene_Battle.prototype.createHud = function() {
  const rect = this.statusWindowRect();
  this._statusWindow = new Window_BattleStatus(rect);
  this._battleHudBack.addChild(this._statusWindow);
  this.setStatusWindow_Sprite();
  this._statusWindow.differenceX = this.differenceX();
  this._statusWindow.differenceY = this.differenceY();
  this._statusWindow.UI_Difference = (Graphics.width - Graphics.boxWidth) / 2;
};

Scene_Battle.prototype.createStatusWindow = function() {
  const rect = this.statusWindowRect();
  this._actorImges = new Window_BattleActorImges(rect);
  this._actorStatus = new Window_BattleActorStatus(rect);
  this._battleHudBack.addChild(this._actorImges);
  this._battleHudFront.addChild(this._actorStatus);
  this._statusWindow.setActorWindow(this._actorImges, this._actorStatus);
};

Scene_Battle.prototype.createActorSelectWindow = function() {
  const rect = this.actorWindowRect();
  this._actorWindow = new Window_BattleActor(rect);
  this._actorWindow.setHandler("ok", this.onActorOk.bind(this));
  this._actorWindow.setHandler("cancel", this.onActorCancel.bind(this));
  this._battleHudBack.addChild(this._actorWindow);
};

const _Scene_Battle_createActorWindow = Scene_Battle.prototype.createActorWindow;
Scene_Battle.prototype.createActorWindow = function() {
  //_Scene_Battle_createActorWindow.call(this);
};

const _Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
Scene_Battle.prototype.createActorCommandWindow = function() {
  _Scene_Battle_createActorCommandWindow.call(this);
  this._actorCommandWindow.setStatusWindow(this._statusWindow);
  this._actorCommandWindow.y = this.actorCommandY();
};

Scene_Battle.prototype.differenceX = function() {
  if (param.ActorStatusWindowOnPosition) {
    if (param.ActorStatusWindowCenter) {
      return (Graphics.boxWidth - this._statusWindow.width) / 2 + param.ActorStatusWindow_X;
    } else {
      return (Graphics.boxWidth - Graphics.width) / 2 + param.ActorStatusWindow_X;
    }
  }
  if (param.ActorStatusWindow_Width > 0) {
    return (Graphics.boxWidth - this._statusWindow.width) / 2;
  } else {
    return 0;
  }
};

Scene_Battle.prototype.differenceY = function() {
  if (param.ActorStatusWindowOnPosition) {
    return (Graphics.boxHeight - Graphics.height) / 2 + param.ActorStatusWindow_Y - 6;
  }
  return 0;
};

Scene_Battle.prototype.statusWindowRect = function() {
  const extra = 10;
  const ww = param.ActorStatusWindow_Width > 0 ? param.ActorStatusWindow_Width - 8 : Graphics.boxWidth;
  const wh = param.ActorStatusWindow_Height > 0 ? param.ActorStatusWindow_Height : this.windowAreaHeight() + extra - (param.WindowFrameShow ? 10 : 0);
  if (param.ActorStatusWindowOnPosition) {
    wx = (param.ActorStatusWindowCenter ? (Graphics.width - ww) / 2 : 0) + param.ActorStatusWindow_X;
    wy = param.ActorStatusWindow_Y;
  } else {
    wx = (Graphics.width - ww) / 2;
    wy = (Graphics.height - Graphics.boxHeight) / 2 + Graphics.boxHeight - wh + extra - (param.WindowFrameShow ? 6 : 0) - 4;
  }
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.partyCommandWindowRect = function() {
  const ww = param.PartyCommand_Width > 0 ? param.PartyCommand_Width : Graphics.boxWidth;
  const wh = this.partyWindowAreaHeight();
  const wx = param.PartyCommandCenter ? Graphics.boxWidth / 2 - ww / 2 : 0 + param.PartyCommand_X;
  const wy = this.partyCommand_YPosition() + param.PartyCommand_Y;
  const rect = new Rectangle(wx, wy, ww, wh);
  rect.statusWindowHeight = this._statusWindow.height;
  return rect;
};

Scene_Battle.prototype.actorCommandWindowRect = function() {
  const ww = this.actorCommandWidth(); 
  const wh = this.actorCommandHeight();
  const wx = this.actorCommandX();
  const wy = 0;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.actorCommandWidth = function() {
  if (param.ActorCommand_Width > 0) {
    return param.ActorCommand_Width;
  }
  if (param.ActorCommandMode === 0) {
    return Math.min((param.ActorStatusWindow_Width > 0 ? param.ActorStatusWindow_Width : Graphics.boxWidth) / this._statusWindow.maxCols() - 12, 192);
  } else if (param.ActorCommandMode >= 1) {
    return Graphics.boxWidth;
  } else {
    return 0;
  }
};

Scene_Battle.prototype.actorCommandHeight = function() {
  if (param.ActorCommandMode === 0) {
    return this.windowAreaHeight();
  } else if (param.ActorCommandMode >= 1) {
    return this.calcWindowHeight(param.ActorCommandMaxRow, true);
  } else {
    return 0;
  }
};

Scene_Battle.prototype.actorCommandX = function() {
  if (param.ActorCommandMode === 0) {
    return 0;
  } else if (param.ActorCommandMode >= 1) {
    return (param.ActorCommandCenter ? Graphics.boxWidth / 2 - this.actorCommandWidth() / 2 : 0) + param.ActorCommand_X;
  } else {
    return 0;
  }
};

Scene_Battle.prototype.actorCommandY = function() {
  if (param.ActorCommandMode === 0) {
    return 0;
  } else if (param.ActorCommandMode >= 1) {
    return this.actorCommand_YPosition() + param.ActorCommand_Y;
  } else {
    return 0;
  }
};

const _Scene_Battle_enemyWindowRect = Scene_Battle.prototype.enemyWindowRect;
Scene_Battle.prototype.enemyWindowRect = function() {
  const rect = _Scene_Battle_enemyWindowRect.call(this);
  rect.x = 0;
  rect.width = Graphics.boxWidth;
  return rect;
};

Scene_Battle.prototype.partyWindowAreaHeight = function() {
  return this.calcWindowHeight(param.PartyCommandMaxRow, true);
};

Scene_Battle.prototype.actorWindowAreaHeight = function() {
  return this.calcWindowHeight(param.ActorCommandMaxRow, true);
};

Scene_Battle.prototype.updateStatusWindowPosition = function() {
  
};

Scene_Battle.prototype.partyCommand_YPosition = function() {
  if (param.PartyCommandPosition === 0) {
    return 0;
  } else if (param.PartyCommandPosition === 1) {
    return this._statusWindow.y / 2 - (this.partyWindowAreaHeight() / 2);
  } else {
    return Graphics.boxHeight - this.windowAreaHeight() - this.partyWindowAreaHeight();
  }
};

Scene_Battle.prototype.actorCommand_YPosition = function() {
  if (param.ActorCommandMode === 1) {
    return 0;
  } else if (param.ActorCommandMode === 2) {
    return this._statusWindow.y / 2 - (this.actorWindowAreaHeight() / 2);
  } else if (param.ActorCommandMode === 3){
    return Graphics.boxHeight - this.windowAreaHeight() - this.actorWindowAreaHeight();
  }
  return 0;
};

Scene_Battle.prototype.setStatusWindow_Sprite = function() {
  if (param.ActorEffectShow) {
    for (const sprite of this._spriteset._actorSprites) {
      sprite._statusWindow = this._statusWindow;
    }
  }
};

const _Scene_Battle_start = Scene_Battle.prototype.start;
Scene_Battle.prototype.start = function() {
  _Scene_Battle_start.call(this);
  this._actorImges.refresh();
  this._actorStatus.refresh();
};

const _Scene_Battle_updateStatusWindowVisibility = Scene_Battle.prototype.updateStatusWindowVisibility;
Scene_Battle.prototype.updateStatusWindowVisibility = function() {
  _Scene_Battle_updateStatusWindowVisibility.call(this);
  if (this.shouldOpenStatusWindow()) {
    this._statusWindow.open();
  }
};

const _Scene_Battle_commandSkill = Scene_Battle.prototype.commandSkill;
Scene_Battle.prototype.commandSkill = function() {
  _Scene_Battle_commandSkill.call(this);
  this._statusWindow.show();
};

const _Scene_Battle_commandItem = Scene_Battle.prototype.commandItem;
Scene_Battle.prototype.commandItem = function() {
  _Scene_Battle_commandItem.call(this);
  this._statusWindow.show();
};

const _Scene_Battle_startActorSelection = Scene_Battle.prototype.startActorSelection;
Scene_Battle.prototype.startActorSelection = function() {
  _Scene_Battle_startActorSelection.call(this);
  this._skillWindow.hide();
  this._itemWindow.hide();
  this._statusWindow.deselect();
};

const _Scene_Battle_onActorCancel = Scene_Battle.prototype.onActorCancel;
Scene_Battle.prototype.onActorCancel = function() {
  _Scene_Battle_onActorCancel.call(this);
  this._statusWindow.selectActor(BattleManager.actor());
};

const _Scene_Battle_startEnemySelection = Scene_Battle.prototype.startEnemySelection;
Scene_Battle.prototype.startEnemySelection = function() {
  _Scene_Battle_startEnemySelection.call(this);
  this._statusWindow.show();
  this._skillWindow.hide();
  this._itemWindow.hide();
  this._actorCommandWindow.hide();
};

const _Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
  _Scene_Battle_onEnemyCancel.call(this);
  switch (this._actorCommandWindow.currentSymbol()) {
    case "attack":
      this._actorCommandWindow.show();
      break;
  }
};

const _Scene_Battle_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
Scene_Battle.prototype.startPartyCommandSelection = function() {
  if (this._onAction) {
    this._partyCommandWindow.hide();
  }
  _Scene_Battle_startPartyCommandSelection.call(this);
};

const _Scene_Battle_selectPreviousCommand = Scene_Battle.prototype.selectPreviousCommand;
Scene_Battle.prototype.selectPreviousCommand = function() {
  _Scene_Battle_selectPreviousCommand.call(this);
  this._onAction = false;
  this._partyCommandWindow.show();
};

const _Scene_Battle_onSelectAction = Scene_Battle.prototype.onSelectAction;
Scene_Battle.prototype.onSelectAction = function() {
  this._onAction = BattleManager.isTpb();
  _Scene_Battle_onSelectAction.call(this);
};

const _Scene_Battle_endCommandSelection = Scene_Battle.prototype.endCommandSelection;
Scene_Battle.prototype.endCommandSelection = function() {
  _Scene_Battle_endCommandSelection.call(this);
  this._onAction = false;
};

Scene_Battle.prototype.actorWindowOpacity = function() {
  this._statusWindow.opacity = param.WindowShow ? param.ActorWindowSelectOpacity || 255 : 0;
  this._battleHudBack.opacity = param.ActorWindowSelectOpacity || 255;
  this._battleHudFront.opacity = param.ActorWindowSelectOpacity || 255;
};

Scene_Battle.prototype.actorWindowResetOpacity = function() {
  this._statusWindow.opacity = param.WindowShow ? 255 : 0;
  this._battleHudBack.opacity = 255;
  this._battleHudFront.opacity = 255;
};

const _Scene_Battle_update  = Scene_Battle.prototype.update ;
Scene_Battle.prototype.update = function() {
  _Scene_Battle_update.call(this);
  if(this._statusWindow._CommandRefresh) {
    const index = this._actorCommandWindow.selectActor(this._actor);
    if(index < 0 && this._actorCommandWindow._actor) {
      this.commandCancel();
    }
    this._actorCommandWindow.refresh();
    this._statusWindow._CommandRefresh = false;
  }
  this._statusWindow.visible = BattleManager.actorStatusWindowVisible;
  this._actorImges.visible = BattleManager.actorStatusWindowVisible;
  this._actorStatus.visible = BattleManager.actorStatusWindowVisible;
  if (this.activeWindow()) {
    this.actorWindowOpacity();
  } else{
    this.actorWindowResetOpacity();
  }
  if (Imported.NUUN_ActorPicture && $gameTemp.isButlerRefresh()) {
    this._actorImges.preparePartyRefresh();
  }
};

Scene_Battle.prototype.activeWindow = function() {//SkillWindowOpacity
  return this.opacityskillWindow() || this.opacityItemWindow() || this.opacityEnemyWindow() || this.opacityMessageWindow() || BattleManager.actorStatusWindowOpacity;
};

Scene_Battle.prototype.opacityskillWindow = function() {
  return this._skillWindow.active && !param.SkillWindowOpacity;
};

Scene_Battle.prototype.opacityItemWindow = function() {
  return this._itemWindow.active && !param.ItemWindowOpacity;
};

Scene_Battle.prototype.opacityEnemyWindow = function() {
  return this._enemyWindow.active && !param.EnemyWindowOpacity;
};

Scene_Battle.prototype.opacityMessageWindow = function() {
  return this.statusWindow_Top <= this._messageWindow.y && this.statusWindow_Under >= this._messageWindow.y && this._messageWindow.onMessage;
};

//Window_Message
const _Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
Window_Message.prototype.updatePlacement = function() {
  _Window_Message_updatePlacement.call(this);
  this.onMessage = true;
};

const _Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function() {
  _Window_Message_terminateMessage.call(this);
  this.onMessage = false;
};

//Window_PartyCommand
const _Window_PartyCommand_initialize = Window_PartyCommand.prototype.initialize;
Window_PartyCommand.prototype.initialize = function(rect) {
  _Window_PartyCommand_initialize.call(this, rect);
  this.statusWindowHeight = rect.statusWindowHeight;
};

Window_PartyCommand.prototype.maxCols = function() {
  return Math.ceil((this._list ? Math.min(this._list.length, param.PartyCommandMaxCol) : param.PartyCommandMaxCol));
};

const _Window_PartyCommand_refresh = Window_PartyCommand.prototype.refresh;
Window_PartyCommand.prototype.refresh = function() {
  _Window_PartyCommand_refresh.call(this);
  this.height = this.fittingHeight(Math.min(Math.ceil(this.maxItems() / param.PartyCommandMaxCol), param.PartyCommandMaxRow));
  if (param.PartyCommandPosition === 2) {
    this.y = Graphics.boxHeight - (this.height + this.statusWindowHeight) + (param.WindowFrameShow ? 0 : 6) + param.PartyCommand_Y;
  }
};

//Window_ActorCommand
Window_ActorCommand.prototype.selectActor = function(actor) {
  const members = $gameParty.battleMembers();
  return members.indexOf(actor);
};

Window_ActorCommand.prototype.maxCols = function() {
  return Math.ceil((this._list ? Math.min(this._list.length, param.ActorCommandMaxCol) : param.ActorCommandMaxCol));
};

const _Window_ActorCommand_refresh = Window_ActorCommand.prototype.refresh;
Window_ActorCommand.prototype.refresh = function() {
  _Window_ActorCommand_refresh.call(this);
  const actorIndex = this.selectActor(this._actor);
  if ((actorIndex >= 0 || this._actor) && param.ActorCommandMode === 0) {
    const rect = this._statusWindow.itemRect(actorIndex);
    this.height = this.fittingHeight(Math.min(Math.ceil(this.maxItems() / param.ActorCommandMaxCol), param.ActorCommandMaxRow));
    this.width = param.ActorCommand_Width > 0 ? param.ActorCommand_Width : Math.min(this.width, rect.width);
    this.x = Math.max(-this._statusWindow.UI_Difference + 4, ((rect.width - this.width) / 2) + rect.x + this.itemPadding() + Math.max(param.ActorCommand_X, 0) + this._statusWindow.differenceX);
    this.x = Math.min(this.x, Graphics.boxWidth + this._statusWindow.UI_Difference - this.width - 4);
    let zeroPosition = 0;
    if (param.ActorStatusWindowOnPosition) {
      this.y = this._statusWindow.differenceY - this.height + param.ActorCommand_Y + rect.y;
      zeroPosition = (Graphics.boxHeight - Graphics.height) / 2;
    } else {
      this.y = Graphics.boxHeight - (this.height + this._statusWindow.height) + param.ActorCommand_Y + rect.y;
    }
    if (this.y <= zeroPosition) {
      this.y += this.height + this._statusWindow.itemHeight() + this.itemPadding() * 2 + (param.WindowFrameShow ? 6 : 0);
    } else {
      this.y += (param.WindowFrameShow ? 0 : 6);
    }
  } else if ((actorIndex >= 0 || this._actor) && param.ActorCommandMode >= 1) {
    this.height = this.fittingHeight(Math.min(Math.ceil(this.maxItems() / param.ActorCommandMaxCol), param.ActorCommandMaxRow));
    if (param.ActorCommandMode === 3) {
      this.y = Graphics.boxHeight - (this.height + this._statusWindow.height) + (param.WindowFrameShow ? 0 : 6) + param.ActorCommand_Y;
    }
  }
};

Window_ActorCommand.prototype.setStatusWindow = function(statusWindow) {
  this._statusWindow = statusWindow;
};

//Window_BattleStatus
const _Window_BattleStatus_initialize = Window_BattleStatus.prototype.initialize;
Window_BattleStatus.prototype.initialize = function(rect) {
  _Window_BattleStatus_initialize.call(this, rect);
  this.frameVisible = param.WindowFrameShow ? true : false;
  this.opacity = param.WindowShow ? 255 : 0;
  this._opening = true;
  this.visible = true;
  if (BattleManager.isBattleTest()) {
    console.log("アクターステータス横幅 "+ (this.itemWidth() - this.colSpacing()) +" アクターステータス縦幅 "+ (this.itemHeight() - this.rowSpacing()))
  }
};

Window_BattleStatus.prototype.maxCols = function() {
  return param.ActorMaxCol > 0 ? param.ActorMaxCol : Math.max($gameParty.maxBattleMembers(), 4);
};

const _Window_BattleStatus_itemHeight = Window_BattleStatus.prototype.itemHeight;
Window_BattleStatus.prototype.itemHeight = function() {
  const row = param.ActorMaxRow > 0 ? param.ActorMaxRow : Math.ceil($gameParty.maxBattleMembers() / this.maxCols());
  return Math.floor(_Window_BattleStatus_itemHeight.call(this) / row);
};

const _Window_BattleStatus_rowSpacing = Window_BattleStatus.prototype.rowSpacing;
Window_BattleStatus.prototype.rowSpacing = function() {
  return Math.ceil($gameParty.maxBattleMembers() / this.maxCols()) > 1 ? 4 : _Window_BattleStatus_rowSpacing.call(this);
};

Window_BattleStatus.prototype.drawItemBackground = function(index) {
  const rect = this.itemRect(index);
  if (this._actorBack[index]){
    this.actorBackGround(index, rect.x, rect.y);
  } else if((param.WindowShow && param.cursorBackShow) || param.cursorBackShow) {
    this.drawBackgroundRect(rect);
  }
};

Window_BattleStatus.prototype.open = function() {
  Window_Base.prototype.open.call(this);
  this._window_battleActorImges.open();
  this._window_BattleActorStatus.open();
};

Window_BattleStatus.prototype.close = function() {
  Window_Base.prototype.close.call(this);
  this._window_battleActorImges.close();
  this._window_BattleActorStatus.close();
};

Window_BattleStatus.prototype.preparePartyRefresh = function() {
  this._bitmapsReady = 0;
  this._actorBack = [];
  const bitmap = param.actorBackground ? ImageManager.loadSystem(param.actorBackground) : null;
  for (let i = 0; i < $gameParty.members().length; i++) {
    this._actorBack[i] = bitmap;
    if (bitmap && !bitmap.isReady()) {
      bitmap.addLoadListener(this.performPartyRefresh.bind(this));
    } else {
      this.performPartyRefresh();
    }
  }
};

Window_BattleStatus.prototype.performPartyRefresh = function() {
  this._bitmapsReady++;
  if (this._bitmapsReady >= $gameParty.members().length) {
    this.refresh();
    this.commandRefresh();
    this.battleEffectsRefresh();
  }
};

Window_BattleStatus.prototype.commandRefresh = function() {
  this._CommandRefresh = true;
};

Window_BattleStatus.prototype.battleEffectsRefresh = function() {
  if (!$gameSystem.isSideView()) {
    $gameTemp.setBattleEffectsRefresh(true);
  }
};

Window_BattleStatus.prototype.drawItem = function(index) {

};

const _Window_BattleStatus_refreshCursor = Window_BattleStatus.prototype.refreshCursor;
Window_BattleStatus.prototype.refreshCursor = function() {
  if ((param.SelectBackShow && this.constructor === Window_BattleStatus) || (param.ActorSelectBackShow && this.constructor === Window_BattleActor)) {
    _Window_BattleStatus_refreshCursor.call(this);
  } else {
    this.setCursorRect(0, 0, 0, 0);
  }
};

Window_BattleStatus.prototype.statusPosition = function(index, rect) {
  const itemWidth = this.itemWidth();
  const maxCols = Math.min(this.maxItems(), this.maxCols());
  if (param.ActorStatusMode === 1) {
    rect.x += Math.floor((this.width / 2) - (itemWidth * maxCols / 2)) - this.itemPadding();
  } else if (param.ActorStatusMode === 2) {
    rect.x += this.width - (maxCols * itemWidth) - this.itemPadding() * 2;
  } else {
    //x = rect.x;
  }
  //rect.x = x + width * index;
  return rect;
};

Window_BattleStatus.prototype.itemRect = function(index) {
  let rect = Window_Selectable.prototype.itemRect.call(this, index);
  rect = this.statusPosition(index, rect);
  return rect;
};

Window_BattleStatus.prototype.drawItemImage = function(index) {

};

Window_BattleStatus.prototype.drawItemStatus = function(index) {
  const actor = this.actor(index);
  const rect = this.itemRectWithPadding(index);
  this._rect = rect;
  const nameX = this.nameX(rect);
  const nameY = this.nameY(rect);
  const stateIconX = this.stateIconX(rect);
  const stateIconY = this.stateIconY(rect);
  const basicGaugesX = this.basicGaugesX(rect);
  const basicGaugesY = this.basicGaugesY(rect);
  if (param.TPBShow) {
    this.placeTimeGauge(actor, nameX, nameY);
  }
  this.placeStateIcon(actor, stateIconX, stateIconY);
  if (param.NameShow) {
    this.placeActorName(actor, nameX, nameY);
  }
  this.placeBasicGauges(actor, basicGaugesX, basicGaugesY);
};

const _Window_BattleStatus_placeTimeGauge = Window_BattleStatus.prototype.placeTimeGauge;
Window_BattleStatus.prototype.placeTimeGauge = function(actor, x, y) {
  if (BattleManager.isTpb() && param.TPBChangePosition) {
    x = param.ActorTPB_X + this._rect.x;
    y = param.ActorTPB_Y + this._rect.y;
  }
  _Window_BattleStatus_placeTimeGauge.call(this, actor, x, y);
};

Window_BattleStatus.prototype.placeBasicGauges = function(actor, x, y) {
    x2 = param.HPChangePosition ? param.ActorHP_X + this._rect.x : x;
    y2 = param.HPChangePosition ? param.ActorHP_Y + this._rect.y : y;
  this.placeGauge(actor, "hp", x2, y2);
  x2 = param.MPChangePosition ? param.ActorMP_X + this._rect.x : x;
  y2 = param.MPChangePosition ? param.ActorMP_Y + this._rect.y : y + this.gaugeLineHeight();
  this.placeGauge(actor, "mp", x2, y2);
  if ($dataSystem.optDisplayTp) {
    x2 = param.TPChangePosition ? param.ActorTP_X + this._rect.x : x;
    y2 = param.TPChangePosition ? param.ActorTP_Y + this._rect.y : y + this.gaugeLineHeight() * 2;
    this.placeGauge(actor, "tp", x2, y2);
  }
};

const _Window_BattleStatus_placeStateIcon = Window_BattleStatus.prototype.placeStateIcon;
Window_BattleStatus.prototype.placeStateIcon = function(actor, x, y) {
  if (param.StateChangePosition) {
    x = param.ActorState_X + this._rect.x;
    y = param.ActorState_Y + this._rect.y;
  }
  _Window_BattleStatus_placeStateIcon.call(this, actor, x, y);
};

const _Window_BattleStatus_placeActorName = Window_BattleStatus.prototype.placeActorName;
Window_BattleStatus.prototype.placeActorName = function(actor, x, y) {
  if (param.NameChangePosition) {
    x = param.ActorName_X + this._rect.x;
    y = param.ActorName_Y + this._rect.y;
  }
  _Window_BattleStatus_placeActorName.call(this, actor, x, y);
};

Window_BattleStatus.prototype.faceRect = function(index) {
  const rect = this.itemRect(index);
  rect.pad(-1);
  if (param.FaceChangePosition) {
    rect.x += param.ActorFace_X;
    rect.y += param.ActorFace_Y;
    rect.height = this.itemHeight() - 6;
  } else {
    rect.height = this.nameY(rect) + this.gaugeLineHeight() / 2 - rect.y;
  }
  rect.y += 8;
  rect.width = param.ActorFace_Width > 0 ? param.ActorFace_Width : rect.width;
  rect.height = param.ActorFace_Height > 0 ? param.ActorFace_Height : rect.height;
  return rect;
};

Window_BattleStatus.prototype.placeGauge = function(actor, type, x, y) {
  const key = "actor%1-gauge-%2".format(actor.actorId(), type);
  const sprite = this.createInnerSprite(key, Sprite_BattleGauge);
  sprite.setup(actor, type);
  sprite.move(x, y);
  sprite.show();
};

Window_BattleStatus.prototype.actorBackGround = function(index, x, y) {
  const actor = this.actor(index);
  const key = "actor%1-back-%2".format(actor.actorId());
  const sprite = this.createInnerSprite(key, Sprite);
  sprite.bitmap = this._actorBack[index];
  sprite.move(x, y);
  sprite.show();
};

Window_BattleStatus.prototype.battlreActorImges = function(id) {
  const actors = param.ActorsButlerList;
  const deta = actors.find(actor => actor.actorId === id);
  return deta ? deta : this.undefinedDeta(id, deta);
};

Window_BattleStatus.prototype.setActorWindow = function(Window_battleActorImges, Window_BattleActorStatus) {
  this._window_battleActorImges = Window_battleActorImges;
  this._window_BattleActorStatus = Window_BattleActorStatus;
};

//Window_BattleActorImges
function Window_BattleActorImges() {
  this.initialize(...arguments);
}

Window_BattleActorImges.prototype = Object.create(Window_BattleStatus.prototype);
Window_BattleActorImges.prototype.constructor =　Window_BattleActorImges;

Window_BattleActorImges.prototype.initialize = function(rect) {
  Window_StatusBase.prototype.initialize.call(this, rect);
  this.openness = 0;
  this._bitmapsReady = 0;
  this.opacity = 0;
  this._opening = true;
  this.visible = true;
  const sprite = new Sprite();
  this.addChild(sprite);
  this._actorImgBaseSprite = sprite;
  this.preparePartyRefresh();
  this._actorImgBaseSprite.hide();
};

Window_BattleActorImges.prototype.drawItemBackground = function(index) {
};

Window_BattleActorImges.prototype.preparePartyRefresh = function() {
  this._bitmapsReady = 0;
  this.actorSpriteDeta = [];
  for (const actor of $gameParty.members()) {
    let date;
    if (Imported.NUUN_ActorPicture) {
      actor.setActorButler();
      date = actor.getActorButlerList();
      const date2 = this.battlreActorImges(actor._actorId);//座標拡大率取得用
      date.Actor_X = date2.Actor_X;
      date.Actor_Y = date2.Actor_Y;
      date.Actor_Scale = date2.Actor_Scale;
    } else {
      date = this.battlreActorImges(actor._actorId);
    }
    if(date.defaultImg) {
      date._onFace = false;
      this.loadBitmap(date);
    } else {
      date._onFace = true;
      this.loadFace(actor, date);
    }
    this.actorSpriteDeta.push(date);
    if(date.defaultBitmap && !date.defaultBitmap.isReady()){
      date.defaultBitmap.addLoadListener(this.performPartyRefresh.bind(this));
    } else {
      this.performPartyRefresh(this);
    }
  }
};

Window_BattleActorImges.prototype.performPartyRefresh = function() {
  this._bitmapsReady++;
  if (this._bitmapsReady >= $gameParty.members().length) {
    $gameTemp.setButlerRefresh(false);
    this.refresh();
  }
};

Window_BattleActorImges.prototype.battlreActorImges = function(id) {
  const actors = param.ActorsButlerList;
  const deta = actors.find(actor => actor.actorId === id);
  return deta ? deta : this.undefinedDeta(id, deta);
};

Window_BattleActorImges.prototype.undefinedDeta = function(id, deta) {
  deta = {};
  deta.id = id;
  deta.Actor_X = 0;
  deta.Actor_Y = 0;
  deta.Actor_Scale = 100;
  deta.deathFaceIndex = -1;
  deta.damageFaceIndex = -1;
  deta.dyingFaceIndex = -1;
  deta.victoryFaceIndex = -1;
  deta.chantFaceIndex = -1;
  deta.stateBitmap = [];
  return deta;
};

Window_BattleActorImges.prototype.loadBitmap = function(deta) {
  deta.stateBitmap = [];
  deta.defaultBitmap = Imported.NUUN_ActorPicture ? ImageManager.nuun_actorPictures(deta.defaultImg) : loadBattleStyleActorImg(deta.defaultImg);
  if (deta.deathImg) {
    deta.deathBitmap = Imported.NUUN_ActorPicture ? ImageManager.nuun_actorPictures(deta.deathImg) : loadBattleStyleActorImg(deta.deathImg);
  }
  if (deta.dyingImg) {
    deta.dyingBitmap = Imported.NUUN_ActorPicture ? ImageManager.nuun_actorPictures(deta.dyingImg) : loadBattleStyleActorImg(deta.dyingImg);
  }
  if (deta.damageImg) {
    deta.damageBitmap = Imported.NUUN_ActorPicture ? ImageManager.nuun_actorPictures(deta.damageImg) : loadBattleStyleActorImg(deta.damageImg);
  }
  if (deta.victoryImg) {
    deta.victoryBitmap = Imported.NUUN_ActorPicture ? ImageManager.nuun_actorPictures(deta.victoryImg) : loadBattleStyleActorImg(deta.victoryImg);
  }
  if (deta.chantImg) {
    deta.chantBitmap = Imported.NUUN_ActorPicture ? ImageManager.nuun_actorPictures(deta.chantImg) : loadBattleStyleActorImg(deta.chantImg);
  }
  if (deta.stateImg){
    for (const listdeta of deta.stateImg) {
      if(listdeta.actorStateImg && listdeta.stateImgId > 0){
        deta.stateBitmap[listdeta.stateImgId] = {};
        deta.stateBitmap[listdeta.stateImgId].imges = Imported.NUUN_ActorPicture ? ImageManager.nuun_actorPictures(listdeta.actorStateImg) : loadBattleStyleActorImg(listdeta.actorStateImg);
        deta.stateBitmap[listdeta.stateImgId].always = listdeta.Always ? true : false;
        deta.stateBitmap[listdeta.stateImgId].priorityId = listdeta.priorityId;
      }
    }
  }
};

Window_BattleActorImges.prototype.loadFace = function(actor,deta) {
  deta.stateBitmap = [];
  deta.defaultBitmap = ImageManager.loadFace(actor.faceName());
  if(deta.stateFaceIndex){
    for (const listdeta of deta.stateFaceIndex) {
      if(listdeta.actorStateIndex >= 0 && listdeta.stateFaceId > 0){
        deta.stateBitmap[listdeta.stateFaceId] = {};
        deta.stateBitmap[listdeta.stateFaceId].FaceId = listdeta.actorStateIndex;
        deta.stateBitmap[listdeta.stateFaceId].always = listdeta.Always ? true : false;
        deta.stateBitmap[listdeta.stateFaceId].priorityId = listdeta.priorityId;
      }
    }
  }
};

Window_BattleActorImges.prototype.drawItem = function(index) {
  this.drawItemImage(index);
};

Window_BattleActorImges.prototype.drawItemImage = function(index) {
  const actor = this.actor(index);
  const deta = this.actorSpriteDeta[index];
  if(!deta._onFace) {
    this.drawItemButler(index, actor, deta);
  } else {
    this.drawItemFace(index, actor, deta);
  }
};

Window_BattleActorImges.prototype.drawItemButler = function(index, actor, deta) {
  const rect = this.itemRect(index);
  const key = "actor%1-img".format(actor.actorId());
  const sprite = this.createActorImgSprite(key, Sprite_ActorImges);
  sprite.setup(actor, deta);
  const x = rect.x + Math.floor((this.itemWidth() - (sprite.bitmap.width * deta.Actor_Scale / 100)) / 2) + 4 + param.ActorImg_X + deta.Actor_X;
  const y = rect.y + rect.height - Math.floor(sprite.bitmap.height * deta.Actor_Scale / 100) + 7 + param.ActorImg_Y + deta.Actor_Y;
  sprite.scale.x = deta.Actor_Scale / 100;
  sprite.scale.y = deta.Actor_Scale / 100;
  sprite.move(x, y);
  sprite.show();
};

Window_BattleActorImges.prototype.drawItemFace = function(index, actor, deta) {
  const rect = this.faceRect(index);
  width = rect.width || ImageManager.faceWidth;
  height = rect.height || ImageManager.faceHeight;
  const key = "actor%1-img".format(actor.actorId());
  const sprite = this.createActorImgSprite(key, Sprite_ActorImges);
  sprite.bitmap = ImageManager.loadFace(actor.faceName());
  sprite.setup(actor, deta);
  const pw = ImageManager.faceWidth;
  const ph = ImageManager.faceHeight;
  const sw = Math.min(width, pw);
  const sh = Math.min(height, ph);
  sprite.x = Math.floor(rect.x + Math.max(width - pw, 0) / 2) + 8;
  sprite.y = Math.floor(rect.y + Math.max(height - ph, 0) / 2);
  const sx = Math.floor((actor.faceIndex() % 4) * pw + (pw - sw) / 2);
  const sy = Math.floor(Math.floor(actor.faceIndex() / 4) * ph + (ph - sh) / 2);
  sprite.setFrame(sx, sy, sw, sh);
  sprite._rectWidth = rect.width;
  sprite._rectHeight = rect.height;
  sprite.show();
};

Window_BattleActorImges.prototype.createActorImgSprite = function(key, spriteClass) {
  const dict = this._additionalSprites;
  if (dict[key]) {
      return dict[key];
  } else {
      const sprite = new spriteClass();
      dict[key] = sprite;
      this._actorImgBaseSprite.addChild(sprite);
      return sprite;
  }
};

Window_BattleActorImges.prototype.open = function() {
  Window_Base.prototype.open.call(this);
  this._actorImgBaseSprite.show();
};

Window_BattleActorImges.prototype.close = function() {
  Window_Base.prototype.close.call(this);
  this._actorImgBaseSprite.hide();
};


//Window_BattleActorStatus
function Window_BattleActorStatus() {
  this.initialize(...arguments);
}

Window_BattleActorStatus.prototype = Object.create(Window_BattleStatus.prototype);
Window_BattleActorStatus.prototype.constructor =　Window_BattleActorStatus;

Window_BattleActorStatus.prototype.initialize = function(rect) {
  Window_StatusBase.prototype.initialize.call(this, rect);
  this.openness = 0;
  this._bitmapsReady = 0;
  this.opacity = 0;
  this._opening = true;
  this.visible = true;
  this.preparePartyRefresh();
};

Window_BattleActorStatus.prototype.preparePartyRefresh = function() {
  $gameTemp.clearBattleRefreshRequest();
  this.refresh();
};

Window_BattleActorStatus.prototype.drawItemBackground = function(index) {
};

Window_BattleActorStatus.prototype.drawItem = function(index) {
  this.drawItemStatus(index);
};

Window_BattleActorStatus.prototype.open = function() {
  Window_Base.prototype.open.call(this);
};

Window_BattleActorStatus.prototype.close = function() {
  Window_Base.prototype.close.call(this);
};

//NUUN_IconSideBySide併用
Window_BattleActorStatus.prototype.refreshContentsDraw = function() {
  this.contents.clear();
  for (const actor of $gameParty.members()) {
    const index = actor.index();
    const rect = this.itemRectWithPadding(index);
    const stateIconX = param.StateChangePosition ? param.ActorState_X + rect.x : this.stateIconX(rect);
    const stateIconY = param.StateChangePosition ? param.ActorState_Y + rect.y : this.stateIconY(rect);
    this.drawStateIcon(actor, stateIconX, stateIconY);
  }
};

//Window_BattleActor
const _Window_BattleActor_initialize = Window_BattleActor.prototype.initialize;
Window_BattleActor.prototype.initialize = function(rect) {
  _Window_BattleActor_initialize.call(this, rect);
  this.opacity = 0;
};

Window_BattleActor.prototype.drawItemBackground = function(index) {

};

Window_BattleActor.prototype.preparePartyRefresh = function() {
  this.refresh();
};

Window_BattleActor.prototype.drawItem = function(index) {

};

//Window_BattleLog
const _Window_BattleLog_showEnemyAttackAnimation = Window_BattleLog.prototype.showEnemyAttackAnimation;
Window_BattleLog.prototype.showEnemyAttackAnimation = function(subject, targets) {
  this.showNormalAnimation(targets, subject.attackAnimation(), false);
};


//Sprite_Battler
const _Sprite_Battler_setupDamagePopup = Sprite_Battler.prototype.setupDamagePopup;
Sprite_Battler.prototype.setupDamagePopup = function() {
  if(this._battler.isDamagePopupRequested()) {
    if(!this._battler.isSpriteVisible()) {
      this.createDamageSprite();
    }
  }
  _Sprite_Battler_setupDamagePopup.call(this);
};

const _Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome;
Sprite_Actor.prototype.setActorHome = function(index) {
  if($gameSystem.isSideView()){
    _Sprite_Actor_setActorHome.call(this, index);
  } else {
    this.actorHomeRefresh(index);
  }
};

Sprite_Actor.prototype.statusPosition = function(index, rect) {
  const itemWidth = this.itemWidth();
  const maxCols = Math.min(this.maxItems(), this.maxCols());
  if (param.ActorStatusMode === 1) {
    rect.x += Math.floor((this.width / 2) - (itemWidth * maxCols / 2)) - this.itemPadding();
  } else if (param.ActorStatusMode === 2) {
    rect.x += this.width - (maxCols * itemWidth) - this.itemPadding() * 2;
  } else {
    //x = rect.x;
  }
  //rect.x = x + width * index;
  return rect;
};

Sprite_Actor.prototype.actorHomeRefresh = function(index) {
  let x = 0;
  let y = 0;
  const maxCols = this._statusWindow.maxCols();
  const w_index = index % maxCols;
  const h_index = Math.floor(index / maxCols);
  const width = this._statusWindow.width;
  const itemWidth = this._statusWindow.itemWidth();
  const itemHeight = this._statusWindow.itemHeight();
  if (param.ActorStatusMode === 0) {
    x = w_index * itemWidth + Math.floor(itemWidth / 2) + this.differenceX() + 4;
  } else if (param.ActorStatusMode === 2) {
    x = (width - Math.min(this._statusWindow.maxItems(), maxCols) * itemWidth) + w_index * itemWidth + Math.floor(itemWidth / 2) + this.differenceX() - this._statusWindow.itemPadding() * 2 + 4;
  } else {
    x = (width / 2 - Math.min(this._statusWindow.maxItems(), maxCols) * itemWidth / 2) + w_index * itemWidth + Math.floor(itemWidth / 2) + this.differenceX() - this._statusWindow.itemPadding() + 4;
  }
  y = (itemHeight * h_index) + (itemHeight / 2) + this.differenceY();
  this.setHome(x + param.ActorEffect_X, y + param.ActorEffect_Y);
};

Sprite_Actor.prototype.differenceX = function() {
  if (param.ActorStatusWindowOnPosition) {
    if (param.ActorStatusWindowCenter) {
      return (Graphics.boxWidth - this._statusWindow.width) / 2 + param.ActorStatusWindow_X;
    } else {
      return (0 + (Graphics.boxWidth - Graphics.width) / 2) + param.ActorStatusWindow_X;
    }
  }
  return (Graphics.boxWidth - this._statusWindow.width) / 2;
};

Sprite_Actor.prototype.differenceY = function() {
  if (param.ActorStatusWindowOnPosition) {
    return ((Graphics.boxHeight - Graphics.height) / 2) + param.ActorStatusWindow_Y;
  }
  return Graphics.boxHeight - this._statusWindow.height;
};

Sprite_Actor.prototype.maxCols = function() {
  return param.ActorMaxCol > 0 ? param.ActorMaxCol : Math.max($gameParty.maxBattleMembers(), 4);
};

const _Sprite_Actor_setBattler = Sprite_Actor.prototype.setBattler;
Sprite_Actor.prototype.setBattler = function(battler) {
  _Sprite_Actor_setBattler.call(this, battler);
  if (battler && battler === this._actor && !$gameSystem.isSideView() && $gameTemp.isBattleEffectsRefresh() && param.ActorEffectShow) {
    this.setActorHome(battler.index());
    $gameTemp.setBattleEffectsRefresh(false);
  }
};

const _Sprite_Actor_damageOffsetX = Sprite_Actor.prototype.damageOffsetX;
Sprite_Actor.prototype.damageOffsetX = function() {
  return ($gameSystem.isSideView() ? _Sprite_Actor_damageOffsetX.call(this) : Sprite_Battler.prototype.damageOffsetX.call(this)) + param.ActorDamage_X;
};

const _Sprite_Actor_damageOffsetY　= Sprite_Actor.prototype.damageOffsetY;
Sprite_Actor.prototype.damageOffsetY = function() {
  return ($gameSystem.isSideView() ? 0 : 0) + _Sprite_Actor_damageOffsetY.call(this) + param.ActorDamage_Y;
};

//Sprite_ActorImges
function Sprite_ActorImges() {
  this.initialize(...arguments);
}

Sprite_ActorImges.prototype = Object.create(Sprite.prototype);
Sprite_ActorImges.prototype.constructor = Sprite_ActorImges;

Sprite_ActorImges.prototype.initialize = function() {
  Sprite.prototype.initialize.call(this);
  this.initMembers();
};

Sprite_ActorImges.prototype.initMembers = function() {
  this._battler = null;
  this._imgIndex = -1;
  this._durationOpacity = 0;
  this._updateCount = 0;
  this._changeStateImgId = 0;
  this._startUpdate = true;
  this._selectionEffectCount = 0;
};

Sprite_ActorImges.prototype.setup = function(battler, deta) {
  this._battler = battler;
  this._deta = deta;
  if (Imported.NUUN_ActorPicture) {
    this._actorButler = this._battler._actorButler;
  }
  this.updateBitmap();
};

Sprite_ActorImges.prototype.update = function() {
  Sprite.prototype.update.call(this);
  if (this._battler) {
    if (Imported.NUUN_ActorPicture) {
      this._battler.setActorButler();
      if (this._actorButler.imgChange && !$gameTemp.isButlerRefresh()) {
        this._imgIndex = -1;console.log(this._actorButler)
        this._actorButler.imgChange = false;
      }
    }
    this.updateBitmap();
    this.updateSelectionEffect();
  } else {
    this.bitmap = null;
  }
};

Sprite_ActorImges.prototype.faceRefresh = function(faceIndex) {
  const pw = ImageManager.faceWidth;
  const ph = ImageManager.faceHeight;
  const sw = Math.min(this._rectWidth, pw);
  const sh = Math.min(this._rectHeight, ph);
  const sx = Math.floor((faceIndex % 4) * pw + (pw - sw) / 2);
  const sy = Math.floor(Math.floor(faceIndex / 4) * ph + (ph - sh) / 2);
  this.setFrame(sx, sy, sw, sh);
};

Sprite_ActorImges.prototype.updateBitmap = function() {
  const actor = this._battler;
  if (actor) {
    if (actor.isDead()) {
      this.changeBitmap("dead");   
    } else if (!actor.isDead() && this._imgIndex === 1) {
      this.changeBitmap("revive");
    } else if (actor._states.length > 0 && this.stateImgCheck(true)) {
      this.changeBitmap("alwaysAbnormal");
    } else if (actor._imgIndex === 5 && this.changeCheck("victory")) {
      this.changeBitmap("victory");
    } else if (actor._imgIndex === 3 && this.changeCheck("damage")) {
      this.changeBitmap("damage");
    } else if (actor.isChanting() && this.changeCheck("chant")) {
      this.changeBitmap("chant");
    } else if (actor._states.length > 0 && this.stateImgCheck(false)) {
      this.changeBitmap("abnormal");
    } else if (actor.isDying() && this.changeCheck("dying")) {
      this.changeBitmap("dying");
    } else {
      this.changeBitmap("normal");
    }
    this.refreshBitmap();
    actor._imgIndex = 0;
    if (this._startUpdate) {
      this._startUpdate = false;
    }
  }
};

Sprite_ActorImges.prototype.stateImgCheck = function(mode){
  this._changeStateImgId = 0;
  const id = this.stateImg(mode);
  if (id > 0) {
    this._changeStateImgId = id;
    return true;
  }
  return false;
};

Sprite_ActorImges.prototype.changeCheck = function(bitmapType){
  const mode = this.faceMode();
  switch (bitmapType) {
    case "damage":
      if (mode) {
        return this._deta.damageFaceIndex > 0 ? true : false;
      } else {
        return this._deta.damageBitmap ? true : false;
      }
    case "dying":
      if (mode) {
        return this._deta.dyingFaceIndex > 0 ? true : false;
      } else {
        return this._deta.dyingBitmap ? true :false;
      }
    case "victory":
      if (mode) {
        return this._deta.victoryFaceIndex > 0 ? true : false;
      } else {
        return this._deta.victoryBitmap ? true :false;
      }
    case "chant":
      if (mode) {
        return this._deta.chantFaceIndex > 0 ? true : false;
      } else {
        return this._deta.chantBitmap ? true :false;
      }
  }
};

Sprite_ActorImges.prototype.changeBitmap = function(bitmapType) {
  switch (bitmapType) {
    case "dead":
      if(this._imgIndex !== 1) {
        this.setDead();
      }
      break;
    case "revive":
      if(this._imgIndex !== 0) {
        this.setRevive();
      }
      break;
    case "dying":
      if(this._imgIndex !== 2) {
        this.setDying();
      }
      break;
    case "damage":
      if(this._imgIndex !== 3) {
        this.setDamage();
      }
      break;
    case "chant":
      if(this._imgIndex !== 4) {
        this.setChant();
      }
      break;
    case "victory":
      if (this._imgIndex !== 5) {
        this.setVictory();
      }
      break;
    case "alwaysAbnormal":
      if (this._imgIndex !== this._changeStateImgId + 2000) {
        this.setState(true);
      }
      break;
    case "abnormal":
      if (this._imgIndex !== this._changeStateImgId + 1000) {
        this.setState(false);
      }
      break;
    case "normal":
      if (this._imgIndex !== 0) {
        this.setDefault();
      }
      break;
  }
};

Sprite_ActorImges.prototype.refreshBitmap = function() {
  if (this._updateCount > 0) {
    const mode = this.faceMode();
    if (this._imgIndex === 1) { //戦闘不能
      if (mode) {
        faceIndex = this._deta.deathFaceIndex;
        if (faceIndex > 0) {
          this.faceRefresh(faceIndex);
        }
      } else {
        if (this._deta.deathBitmap) {
          this.bitmap = this._deta.deathBitmap;
        }
      }
    } else if (this._imgIndex === 2) { //瀕死
      if (mode) {
        faceIndex = this._deta.dyingFaceIndex;
        this.faceRefresh(faceIndex);
      } else {
        this.bitmap = this._deta.dyingBitmap;
      }
    } else if (this._imgIndex === 3) { //ダメージ
      if (mode) {
        faceIndex = this._deta.damageFaceIndex;
        this.faceRefresh(faceIndex);
      } else {
        this.bitmap = this._deta.damageBitmap;
      }
    } else if (this._imgIndex === 4) { //詠唱
      if (mode) {
        faceIndex = this._deta.chantFaceIndex;
        this.faceRefresh(faceIndex);
      } else {
        this.bitmap = this._deta.chantBitmap;
      }
    } else if (this._imgIndex === 5) { //勝利
      if (mode) {
        faceIndex = this._deta.victoryFaceIndex;
        this.faceRefresh(faceIndex);
      } else {
        this.bitmap = this._deta.victoryBitmap;
      }
    } else if (this._imgIndex >= 1000) { //ステート
      if (mode) {
        faceIndex = this._deta.stateBitmap[this._changeStateImgId].FaceId;
        this.faceRefresh(faceIndex);
      } else {
        this.bitmap = this._deta.stateBitmap[this._changeStateImgId].imges;
      }
    } else {
      if (mode) { //通常
        this.faceRefresh(this._battler.faceIndex());
      } else {
        this.bitmap = this._deta.defaultBitmap;
      }
    }
    this.updateAnimation();
  }
};

Sprite_ActorImges.prototype.updateAnimation = function(){
  if (this._updateCount > 0) {
    this._updateCount--;
    if(this._durationOpacity > 0){
      this.opacity -= 255 / this.setDeadDuration();
      this.opacity = Math.max(this.opacity, 0);
      this._durationOpacity = this.opacity;
    } else if (this._durationOpacity < 0) {
      this.opacity += 255 / this.setDeadDuration();
      this.opacity = Math.min(this.opacity, 255);
      this._durationOpacity = this.opacity - 255;
    }
  }
};

Sprite_ActorImges.prototype.setDead = function(){
  const mode = this.faceMode();
  if (((mode && this._deta.deathFaceIndex < 0) || (!mode && !this._deta.deathBitmap)) && param.imgDeathHide) {
    this._updateCount = this.setDeadDuration();
    this._durationOpacity = 255;
  } else {
    this._updateCount = 1;
  }
  this._imgIndex = 1;
};

Sprite_ActorImges.prototype.setRevive = function(){
  const mode = this.faceMode();
  if (((mode && this._deta.deathFaceIndex < 0) || (!mode && !this._deta.deathBitmap)) && param.imgDeathHide) {
    this._updateCount = this.setDeadDuration();
    this._durationOpacity = -255;
  } else {
    this._updateCount = 1;
  }
  if (this._battler.isDying() && ((mode && this._deta.dyingFaceIndex > 0) || (!mode && this._deta.dyingBitmap))) {
    this._imgIndex = 2;
  } else {
    this._imgIndex = 0;
  }
};

Sprite_ActorImges.prototype.setVictory = function(){
  const mode = this.faceMode();
  if ((mode && this._deta.victoryFaceIndex > 0) || (!mode && this._deta.victoryBitmap)) {
    this._updateCount = Infinity;
    this._imgIndex = 5;
  }
};

Sprite_ActorImges.prototype.setChant = function(){
  const mode = this.faceMode();
  if ((mode && this._deta.chantFaceIndex > 0) || (!mode && this._deta.chantBitmap) && this._updateCount <= 0) {
    this._updateCount = 1;
    this._imgIndex = 4;
  }
};

Sprite_ActorImges.prototype.setDying = function(){
  const mode = this.faceMode();
  if ((mode && this._deta.dyingFaceIndex > 0) || (!mode && this._deta.dyingBitmap) && this._updateCount <= 0) {
    this._updateCount = 1;
    this._imgIndex = 2;
  }
};

Sprite_ActorImges.prototype.setDamage = function(){
  const mode = this.faceMode();
  if ((mode && this._deta.damageFaceIndex > 0) || (!mode && this._deta.damageBitmap)) {
    this._imgIndex = 3;
    this._updateCount = this.setDamageDuration();
  }
};

Sprite_ActorImges.prototype.setState = function(mode){
  const id = this._changeStateImgId;
  if (id > 0 && this._imgIndex !== (mode ? 2000 : 1000 ) + id && this._updateCount <= 0) {
    this._imgIndex = (mode ? 2000 : 1000 ) + id;
    this._updateCount = 1;
  }
};

Sprite_ActorImges.prototype.setDefault = function(){
  if (this._updateCount <= 0) {
    this._imgIndex = 0;
    this._updateCount = 1;
  }
};

Sprite_ActorImges.prototype.setDeadDuration = function(){
  return this._startUpdate ? 1 : 30;
};

Sprite_ActorImges.prototype.setDamageDuration = function(){
  return param.damageImgFrame;
};

Sprite_ActorImges.prototype.stateImg = function(mode){
  const actor = this._battler;
  let id = -1;
  let priority = 0;
  let priorityId = 0;
  const faceMode = this.faceMode();
  actor._states.forEach(function(stateId) {
    const state = $dataStates[stateId];
    const changeImgId = state.meta.ChangeImgId ? Number(state.meta.ChangeImgId) : 0;
    if (faceMode) {
      if(this._deta.stateBitmap[changeImgId] && this._deta.stateBitmap[changeImgId].FaceId >= 0 && mode === this._deta.stateBitmap[changeImgId].always){
        priorityId = this._deta.stateBitmap[changeImgId].priorityId;
        if(priority < priorityId) {
          priority = priorityId;
          id = changeImgId;
        }
      }
    } else {
      if (this._deta.stateBitmap[changeImgId] && this._deta.stateBitmap[changeImgId].imges && mode === this._deta.stateBitmap[changeImgId].always) {
        priorityId = this._deta.stateBitmap[changeImgId].priorityId;
        if(priority < priorityId) {
          priority = priorityId;
          id = changeImgId;
        }
      }
    }
  }, this);
  return id;
};

Sprite_ActorImges.prototype.faceMode = function() {
  return this._deta._onFace ? true : false;
};

Sprite_ActorImges.prototype.updateSelectionEffect = function() {
  if (!param.ActorFlash) {
    return;
  }
  const target = this;
  if (this._battler.isSelected()) {
      this._selectionEffectCount++;
      if (this._selectionEffectCount % 30 < 15) {
          target.setBlendColor([255, 255, 255, 64]);
      } else {
          target.setBlendColor([0, 0, 0, 0]);
      }
  } else if (this._selectionEffectCount > 0) {
      this._selectionEffectCount = 0;
      target.setBlendColor([0, 0, 0, 0]);
  }
};

function Sprite_BattleGauge() {
  this.initialize(...arguments);
}

//Sprite_BattleGauge
Sprite_BattleGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_BattleGauge.prototype.constructor = Sprite_BattleGauge;

Sprite_BattleGauge.prototype.initialize = function() {
  Sprite_Gauge.prototype.initialize.call(this);
  this._GaugeHeight = 0;
};

Sprite_BattleGauge.prototype.bitmapWidth = function() {
  switch (this._statusType) {
    case "hp":
      return param.HPGaugeWidth;
    case "mp":
      return param.MPGaugeWidth;
    case "tp":
      return param.TPGaugeWidth;
    case "time":
    case "cast":
      return param.TPBGaugeWidth;
    default:
      return param.GaugeWidth;
  }
};

Sprite_BattleGauge.prototype.bitmapHeight = function() {
  switch (this._statusType) {
    case "hp":
      this._GaugeHeight = param.HPGaugeHeight;
      break;
    case "mp":
      this._GaugeHeight = param.MPGaugeHeight;
      break;
    case "tp":
      this._GaugeHeight = param.TPGaugeHeight;
      break;
    case "time":
    case "cast":
      this._GaugeHeight = param.TPBGaugeHeight;
      break;
    default:
      this._GaugeHeight = 12;
      break;
  }
  return Sprite_Gauge.prototype.bitmapHeight.call(this);
};

Sprite_BattleGauge.prototype.gaugeHeight = function() {
  return this._GaugeHeight;
};

//Spriteset_Base
const _Spriteset_Base_makeTargetSprites = Spriteset_Base.prototype.makeTargetSprites;
Spriteset_Base.prototype.makeTargetSprites = function(targets) {
  const targetSprites = _Spriteset_Base_makeTargetSprites.call(this, targets);
  if (this.constructor === Spriteset_Battle) {
    this._effectsContainer = this.animationTarget(targetSprites) ? this._effectsFrontContainer : this._effectsBackContainer;
  }
  return targetSprites;
};

Spriteset_Base.prototype.animationTarget = function(targetSprites){
  if(!$gameSystem.isSideView() && param.ActorEffectShow) {
    const target = targetSprites.find(targets => (targets.constructor === Sprite_Actor));
    return target ? true : false;
  }
  return false;
};

//Spriteset_Battle
const _Spriteset_Battle_initialize = Spriteset_Battle.prototype.initialize;
Spriteset_Battle.prototype.initialize = function() {
  _Spriteset_Battle_initialize.call(this);
  this._backgroundVisible = false;
};

const _Spriteset_Battle_loadSystemImages = Spriteset_Battle.prototype.loadSystemImages;
Spriteset_Battle.prototype.loadSystemImages = function() {
  _Spriteset_Battle_loadSystemImages.call(this);
  this.windowBackground = ImageManager.loadSystem(param.windowBackground);
};

Spriteset_Battle.prototype.createStatusLayer = function() {
  this.createBattleHud();
  this.createBackgroundStatus();
  this.createHudBack();
  this.createEffects();
  this.createHudStatus();
  this.createFrontActors();
};

Spriteset_Battle.prototype.createBattleHud = function() {
  this._baseStatusSprite = new Sprite();
  this.addChild(this._baseStatusSprite);
  this._battleHudBase = this._baseStatusSprite;
};

Spriteset_Battle.prototype.createHudBack = function() {
  const sprite = new Sprite();
  this._battleHudBase.addChild(sprite);
  this._battleHudBack = sprite;
};

Spriteset_Battle.prototype.createBackgroundStatus = function() {
  const sprite = new Sprite();
  this._battleHudBase.addChild(sprite);
  sprite.bitmap = this.windowBackground;
  this._backgroundSprite = sprite;
};

Spriteset_Battle.prototype.createHudStatus = function() {
  const sprite = new Sprite();
  this._battleHudBase.addChild(sprite);
  this._battleHudFront = sprite;
};

Spriteset_Battle.prototype.createEffects = function() {
  const sprite = this.setBattleBase();
  this._battleHudBase.addChild(sprite);
  this._battleEffects = sprite;
  this._effectsFrontContainer = sprite;
};

Spriteset_Battle.prototype.setBattleBase = function() {
  const width = Graphics.boxWidth;
  const height = Graphics.boxHeight;
  const x = (Graphics.width - width) / 2;
  const y = (Graphics.height - height) / 2;
  const sprite = new Sprite();
  sprite.setFrame(0, 0, width, height);
  sprite.x = x;
  sprite.y = y - this.battleFieldOffsetY();
  return sprite;
};

Spriteset_Battle.prototype.createFrontActors = function() {
  if(!$gameSystem.isSideView() && param.ActorEffectShow) {
    this._actorSprites = [];
    for (let i = 0; i < $gameParty.maxBattleMembers(); i++) {
      const sprite = new Sprite_Actor();
      this._actorSprites.push(sprite);
      this._battleEffects.addChild(sprite);
    }
  }
};

const _Spriteset_Battle_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
  _Spriteset_Battle_update.call(this);
  if (!this._backgroundVisible) {
    this.updateBackground();
  }
};

Spriteset_Battle.prototype.updateBackground = function() {
  this._backgroundSprite.x = 0;
  this._backgroundSprite.y = Graphics.height - this._backgroundSprite.bitmap.height;
  this._backgroundVisible = true;
};


const _Spriteset_Battle_createBattleField = Spriteset_Battle.prototype.createBattleField;
Spriteset_Battle.prototype.createBattleField = function() {
  _Spriteset_Battle_createBattleField.call(this);
  this._effectsBackContainer = this._battleField;
};

//BattleEffectPopup対応
const _Sprite_Battler_setupMessagePopup = Sprite_Battler.prototype.setupMessagePopup;
Sprite_Battler.prototype.setupMessagePopup = function() {
  if (this._battler.isMessagePopupRequested()) {
    if (!this._battler.isSpriteVisible() && param.ActorEffectShow) {
      this.createMessagePopup();
    }
  }
  _Sprite_Battler_setupMessagePopup.call(this);
};

})();