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
 * @version 2.5.4
 *            
 * @help バトルスタイル拡張プラグインのベースプラグインです。単体では動作しません。
 * 
 * 更新履歴
 * 2021/9/11 Ver 2.5.4
 * 全てのモードにおいてアクターコマンドを可変に表示できるように変更。
 * 2021/9/8 Ver 2.5.3
 * リングステートプラグインと併用するとステートアイコンの表示が正常に表示されない問題を修正。
 * 2021/7/23 Ver 2.5.2
 * 可変コマンド時にコマンドが表示されない問題を修正。
 * 2021/7/17 Ver 2.5.1
 * ポップアップ機能個別プラグイン化により処理を削除。
 * 2021/7/14 Ver 2.5.0
 * アクターコマンドモードにSVアクターの上、左、右に表示させる機能を追加。
 * 2021/7/14 Ver 2.4.11
 * スリップダメージ時にアクター画像がシェイクしてしまう問題を修正。
 * 2021/7/12 Ver 2.4.10
 * 復活時にアクター画像が反映されない問題を修正。
 * 2021/7/12 Ver 2.4.9
 * 立ち絵表示EX修正に関する処理の修正。
 * 2021/7/9 Ver 2.4.8
 * 回復した時の顔グラがダメージ時の顔グラが反映されてしまう問題を修正。
 * 2021/7/7 Ver 2.4.7
 * 対象選択時にヘルプウィンドウを表示したままにする機能を追加。
 * 2021/7/6 Ver 2.4.6
 * 戦闘開始前にダメージを受けるとアクターの震えが止まらなくなる問題を修正。
 * 2021/7/5 Ver 2.4.5
 * アクターステータスウィンドウのカーソル背景画像が表示されない問題を修正。
 * アイテム、スキル、敵選択のカーソル背景画像が表示されない問題を修正。
 * 2021/6/27 Ver 2.4.4
 * 戦闘中ではない時にアイテム、スキル画面を開くと項目の背景が表示されない問題を修正。
 * 2021/6/27 Ver 2.4.3
 * アクターコマンドの背景画像を設定していない時で、コマンドの表示を各アクターの上に設定するとエラーが出る問題を修正。
 * 2021/6/26 Ver 2.4.2
 * パーティ、アクターコマンドの背景画像を指定していないとエラーが出る問題を修正。
 * 2021/6/26 Ver 2.4.1
 * アイテム、スキル、モンスター対象選択ウィンドウ、ヘルプウィンドウ、メッセージウィンドウのウィンドウを表示しない機能及び背景画像を設定できる機能を追加。
 * 2021/6/20 Ver 2.4.0
 * アクターのダメージ時にアクター画像をシェイクする機能、行動時にズームする機能を追加しました。
 * パーティコマンド、アクターコマンドの背景を非表示にする機能を追加。
 * 2021/6/13 Ver 2.3.2
 * 疑似3Dバトル暫定競合対策。
 * 2021/6/6 Ver 2.3.1
 * アクター画像に回復をしたときの画像を追加。
 * 2021/6/5 Ver 2.3.0
 * アクター画像表示処理を大幅に修正。
 * 顔グラの0番が反映されなかった問題を修正。
 * 2021/5/21 Ver 2.2.3
 * 選択時ウィンドウ不透明度を0に設定すると不透明度が反映されない問題を修正。
 * 2021/4/20 Ver 2.2.2
 * 一部のプラグインパラメータでfalseに設定したときに設定が反映されない問題を修正。
 * 2021/4/11 Ver 2.2.1
 * ポップアップの表示間隔、解除時の不透明度を指定できる機能を追加。
 * 2021/4/5 Ver 2.2.0
 * ステート、バフをポップアップする機能を追加。
 * 2021/4/4 Ver 2.1.0
 * バトルスタイルレイアウトを選択できる機能を追加。
 * 顔グラを表示させない機能を追加。
 * 2021/3/28 Ver 2.0.10
 * NUUN_ActorPictureを導入してないとエラーが出る問題を修正。
 * 2021/3/27 Ver 2.0.9
 * 特定の条件でエラーが出る問題を修正。
 * 2021/3/27 Ver 2.0.8
 * フロントビュー時のエフェクト処理を改修。
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
param.PopUpBuff = param.PopUpBuff || [];
param.HPGaugeHeight = param.HPGaugeHeight || 12;
param.MPGaugeHeight = param.MPGaugeHeight || 12;
param.TPGaugeHeight = param.TPGaugeHeight || 12;
param.TPBGaugeHeight = param.TPBGaugeHeight || 12;
param.ActorWindowSelectOpacity = param.ActorWindowSelectOpacity === undefined ? 255 : param.ActorWindowSelectOpacity;
if (param.StyleMode === "MVStyle") {
  param.TPGaugeWidth = param.TPGaugeWidth || 96;
  param.TPBGaugeWidth = param.TPBGaugeWidth || 100;
  param.WindowShow = param.WindowShow === undefined ? true : param.WindowShow;
  param.WindowFrameShow = param.WindowFrameShow === undefined ? true : param.WindowFrameShow;
  param.cursorBackShow = param.cursorBackShow === undefined ? false : param.cursorBackShow;
  param.ActorFaceVisible = param.ActorFaceVisible === undefined ? false : param.ActorFaceVisible;
  param.GaugeWidth = param.GaugeWidth || 210;
} else {
  param.HPGaugeWidth = param.HPGaugeWidth || 128;
  param.MPGaugeWidth = param.MPGaugeWidth || 128;
  param.TPGaugeWidth = param.TPGaugeWidth || 128;
  param.TPBGaugeWidth = param.TPBGaugeWidth || 128;
  param.WindowShow = param.WindowShow === undefined ? true : param.WindowShow;
  param.WindowFrameShow = param.WindowFrameShow === undefined ? false : param.WindowFrameShow;
  param.cursorBackShow = param.cursorBackShow === undefined ? true : param.cursorBackShow;
  param.ActorFaceVisible = param.ActorFaceVisible === undefined ? true : param.ActorFaceVisible;
  param.GaugeWidth = param.GaugeWidth || 128;
}
param.actorBackground = param.actorBackground ? param.actorBackground[0] : null;
param.windowBackground = param.windowBackground ? param.windowBackground[0] : null;//メインウィンドウ
param.PartyCommandBackground = param.PartyCommandBackground ? param.PartyCommandBackground[0] : null;
param.ActorCommandBackground = param.ActorCommandBackground ? param.ActorCommandBackground[0] : null;
param.ItemWindowBackground = param.ItemWindowBackground ? param.ItemWindowBackground[0] : null;//アイテム
param.SkillWindowBackground = param.SkillWindowBackground ? param.SkillWindowBackground[0] : null;//スキル
param.EnemyWindowBackground = param.EnemyWindowBackground ? param.EnemyWindowBackground[0] : null;//対象
param.HelpWindowBackground = param.HelpWindowBackground ? param.HelpWindowBackground[0] : null;//ヘルプ
param.MessageWindowBackground = param.MessageWindowBackground ? param.MessageWindowBackground[0] : null;//メッセージ
loadNormalPicture(param.actorBackground);
loadNormalPicture(param.windowBackground);

BattleManager.NUUN_BattleStyleDate = param;

const pluginName = "NUUN_BattleStyleEX_Base";
PluginManager.registerCommand(pluginName, 'ActorStatusWindowVisible', args => {
  BattleManager.statusWindowVisible(eval(args.WindowVisible));
});

PluginManager.registerCommand(pluginName, 'ActorStatusWindowOpacity', args => {
  BattleManager.statusWindowOpacity(eval(args.WindowOpacity));
});

loadBattleStyleActorImg = function(filename) {
  return ImageManager.loadPicture(filename);
};

function nuun_loadPictures(img) {
  const imgUrl = getImg(img);
  return Imported.NUUN_ActorPicture ? loadNormalPicture(imgUrl) : loadBattleStyleActorImg(imgUrl);
}

function loadNormalPicture(filename) {
  return ImageManager.nuun_LoadPictures(filename);
}

function getImg(method) {
  return Imported.NUUN_ActorPicture ? method[0] : method;
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
  this._actionActorImg = null;
  this._isEffectAction = false;
  this._onDamageEffect = false;
};

const _Game_Actor_performDamage = Game_Actor.prototype.performDamage;
Game_Actor.prototype.performDamage = function() {
  _Game_Actor_performDamage.call(this);
  this._onDamageEffect = true;
  this._imgIndex = 3;
};

const _Game_Actor_performRecovery = Game_Actor.prototype.performRecovery;
Game_Actor.prototype.performRecovery = function() {
  _Game_Actor_performRecovery.call(this);
  this._imgIndex = 10;
};

const _Game_Actor_performVictory = Game_Actor.prototype.performVictory;
Game_Actor.prototype.performVictory = function() {
  _Game_Actor_performVictory.call(this);
  this._imgIndex = 5;
};

const _Game_Actor_performActionStart = Game_Actor.prototype.performActionStart;
Game_Actor.prototype.performActionStart = function(action) {
  _Game_Actor_performActionStart.call(this, action);
  this.setAttackImg(action);
  this._isEffectAction = true;
};

Game_Actor.prototype.setAttackImg = function(action) {
  if (action.isRecover()) {
    this._actionActorImg = "recovery"
  } else if (action.isAttack()) {
    this._actionActorImg = "attack"
  } else if (action.isMagicSkill()) {
    this._actionActorImg = "attack"
  } else if (action.isSkill()) {
    this._actionActorImg = "attack"
  } else if (action.isItem()) {
    this._actionActorImg = "item"
  }
};

const _Game_Actor_refresh = Game_Actor.prototype.refresh;
Game_Actor.prototype.refresh = function() {
  _Game_Actor_refresh.call(this);
  if (Imported.NUUN_ActorPicture) {
    this.setButlerImg();
  }
};

const _Game_Actor_isSpriteVisible = Game_Actor.prototype.isSpriteVisible;
Game_Actor.prototype.isSpriteVisible = function() {
  return (!$gameSystem.isSideView() && param.ActorEffectShow) ? param.ActorEffectShow : _Game_Actor_isSpriteVisible.call(this);
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

BattleManager.displayMessageType = function(type) {
  $gameMessage._messageType = type;
};

BattleManager.getDisplayMessageType = function() {
  return $gameMessage._messageType;
};

const _BattleManager_displayStartMessages = BattleManager.displayStartMessages;
BattleManager.displayStartMessages = function() {
  if (!param.AppearWindowVisible) {
    _BattleManager_displayStartMessages.call(this);
    this.displayMessagePosition();
    this.displayMessageType("Appear");
  }
};

const _BattleManager_displayVictoryMessage = BattleManager.displayVictoryMessage;
BattleManager.displayVictoryMessage = function() {
  _BattleManager_displayVictoryMessage.call(this);
  this.displayMessagePosition();
  this.displayMessageType("Victory");
};

const _BattleManager_displayDefeatMessage = BattleManager.displayDefeatMessage;
BattleManager.displayDefeatMessage = function() {
  _BattleManager_displayDefeatMessage.call(this);
  this.displayMessagePosition();
  this.displayMessageType("Defeat");
};

const _BattleManager_displayEscapeSuccessMessage = BattleManager.displayEscapeSuccessMessage;
BattleManager.displayEscapeSuccessMessage = function() {
  _BattleManager_displayEscapeSuccessMessage.call(this);
  this.displayMessagePosition();
  this.displayMessageType("Escape");
};

const _BattleManager_displayEscapeFailureMessage = BattleManager.displayEscapeFailureMessage;
BattleManager.displayEscapeFailureMessage = function() {
  _BattleManager_displayEscapeFailureMessage.call(this);
  this.displayMessagePosition();
  this.displayMessageType("EscapeFailure");
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

const _Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
Scene_Battle.prototype.createPartyCommandWindow = function() {
  _Scene_Battle_createPartyCommandWindow.call(this);
  if (!param.PartyCommandWindowShow) {
    if (this._partyCommandWindow) {
      this._partyCommandWindow.opacity = 0;
    }
  }
  if (param.PartyCommandBackground) {
    const sprite = new Sprite(loadNormalPicture(param.PartyCommandBackground));
    sprite.anchor.y = param.PartyCommandBackgroundAnchorMode === 0 ? 0 : 1.0;
    sprite.x = this._partyCommandWindow.x + this._statusWindow.UI_Difference + param.PartyCommandBackground_X;
    sprite.y = this._partyCommandWindow.y + (param.PartyCommandBackgroundAnchorMode === 0 ? 0 : this._partyCommandWindow.height) + (Graphics.height - Graphics.boxHeight) / 2
                  param.PartyCommandBackground_Y;
    this._battleHudFront.addChild(sprite);
    this._partyCommandWindow.windowBackground = sprite;
  }
};

const _Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
Scene_Battle.prototype.createActorCommandWindow = function() {
  _Scene_Battle_createActorCommandWindow.call(this);
  this._actorCommandWindow.setStatusWindow(this._statusWindow);
  if (param.StyleMode === "XPStyle") {
    this._actorCommandWindow.y = this.actorCommandY();
  }
  if (param.ActorCommandMaxRow > param.ActorCommandMinRow) {
    this._actorCommandWindow.variable = true;
  }
  this._actorCommandWindow.SvActorData = (param.ActorCommandMode >= 4 && param.ActorCommandMode <= 6) ? this._spriteset._actorSprites : null;
  if (!param.ActorCommandWindowShow) {
    if (this._actorCommandWindow) {
      this._actorCommandWindow.opacity = 0;
    }
  }
  if (param.ActorCommandBackground) {
    const sprite = new Sprite(loadNormalPicture(param.ActorCommandBackground));
    sprite.anchor.y = param.ActorCommandBackgroundAnchorMode === 0 ? 0 : 1.0;
    sprite.x = this._actorCommandWindow.x + this._statusWindow.UI_Difference + param.ActorCommandBackground_X;
    sprite.y = this._actorCommandWindow.y + (param.ActorCommandBackgroundAnchorMode === 0 ? 0 : this._actorCommandWindow.height) + (Graphics.height - Graphics.boxHeight) / 2
                param.ActorCommandBackground_Y;
    this._battleHudFront.addChild(sprite);
    this._actorCommandWindow.windowBackground = sprite;
  }
};

const _Scene_Battle_createSkillWindow = Scene_Battle.prototype.createSkillWindow;
Scene_Battle.prototype.createSkillWindow = function() {
  _Scene_Battle_createSkillWindow.call(this);
  if (!param.SelectWindowShow) {
    if (this._skillWindow) {
      this._skillWindow.opacity = 0;
    }
  }
  if (param.SkillWindowBackground) {
    const sprite = new Sprite(loadNormalPicture(param.SkillWindowBackground));
    sprite.anchor.y = param.SkillBackgroundAnchorMode === 0 ? 0 : 1.0;
    sprite.x = this._skillWindow.x + this._statusWindow.UI_Difference + param.SkillBackground_X;
    sprite.y = this._skillWindow.y + (param.SkillBackgroundAnchorMode === 0 ? 0 : this._skillWindow.height) + (Graphics.height - Graphics.boxHeight) / 2 + param.SkillBackground_Y;
    this._battleHudFront.addChild(sprite);
    this._skillWindow.windowBackground = sprite;
  }
};

const _Scene_Battle_createItemWindow = Scene_Battle.prototype.createItemWindow;
Scene_Battle.prototype.createItemWindow = function() {
  _Scene_Battle_createItemWindow.call(this);
  if (!param.SelectWindowShow) {
    if (this._itemWindow) {
      this._itemWindow.opacity = 0;
    }
  }
  if (param.ItemWindowBackground) {
    const sprite = new Sprite(loadNormalPicture(param.ItemWindowBackground));
    sprite.anchor.y = param.ItemBackgroundAnchorMode === 0 ? 0 : 1.0;
    sprite.x = this._itemWindow.x + this._statusWindow.UI_Difference + param.ItemBackground_X;
    sprite.y = this._itemWindow.y + (param.ItemBackgroundAnchorMode === 0 ? 0 : this._itemWindow.height) + (Graphics.height - Graphics.boxHeight) / 2 + param.ItemBackground_Y;
    this._battleHudFront.addChild(sprite);
    this._itemWindow.windowBackground = sprite;
  }
};

const _Scene_Battle_createEnemyWindow = Scene_Battle.prototype.createEnemyWindow;
Scene_Battle.prototype.createEnemyWindow = function() {
  _Scene_Battle_createEnemyWindow.call(this);
  if (!param.SelectWindowShow) {
    if (this._enemyWindow) {
      this._enemyWindow.opacity = 0;
    }
  }
  if (param.EnemyWindowBackground) {
    const sprite = new Sprite(loadNormalPicture(param.EnemyWindowBackground));
    sprite.anchor.y = param.EnemyWindowBackground === 0 ? 0 : 1.0;
    sprite.x = this._enemyWindow.x + this._statusWindow.UI_Difference + param.EnemyBackground_X;
    sprite.y = this._enemyWindow.y + (param.EnemyWindowBackground === 0 ? 0 : this._enemyWindow.height) + (Graphics.height - Graphics.boxHeight) / 2 + param.EnemyBackground_Y;
    this._battleHudFront.addChild(sprite);
    this._enemyWindow.windowBackground = sprite;
  }
};

const _Scene_Battle_createHelpWindow = Scene_Battle.prototype.createHelpWindow;
Scene_Battle.prototype.createHelpWindow = function() {
  _Scene_Battle_createHelpWindow.call(this);
  if (!param.HelpWindowShow) {
    if (this._helpWindow) {
      this._helpWindow.opacity = 0;
    }
  }
  if (param.HelpWindowBackground) {
    const sprite = new Sprite(loadNormalPicture(param.HelpWindowBackground));
    sprite.anchor.y = param.HelpBackgroundAnchorMode === 0 ? 0 : 1.0;
    sprite.x = this._helpWindow.x + this._statusWindow.UI_Difference + param.HelpBackground_X;
    sprite.y = this._helpWindow.y + (param.HelpBackgroundAnchorMode === 0 ? 0 : this._helpWindow.height) + (Graphics.height - Graphics.boxHeight) / 2 + param.HelpBackground_Y;
    this._battleHudFront.addChild(sprite);
    this._helpWindow.windowBackground = sprite;
  }
};

const _Scene_Battle_createMessageWindow = Scene_Battle.prototype.createMessageWindow;
Scene_Battle.prototype.createMessageWindow = function() {
  _Scene_Battle_createMessageWindow.call(this);
  this.MessageWindowBackGround();
};

Scene_Battle.prototype.MessageWindowBackGround = function() {
  if (param.MessageWindowBackground) {
    const sprite = new Sprite(loadNormalPicture(param.MessageWindowBackground));
    sprite.anchor.y = param.MessageWindowVisibleSetting === 0 ? 0 : 1.0;
    this._battleHudFront.addChild(sprite);
    this._messageWindow.windowBackground = sprite;
  }
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

const _Scene_Battle_statusWindowRect = Scene_Battle.prototype.statusWindowRect
Scene_Battle.prototype.statusWindowRect = function() {
  const rect = _Scene_Battle_statusWindowRect.call(this);
  const extra = 10;
  if (param.StyleMode === "Default" || param.StyleMode === "MVStyle") {
    rect.x += (Graphics.width - Graphics.boxWidth) / 2;
    rect.y += ((Graphics.height - Graphics.boxHeight) / 2) + (param.WindowFrameShow ? 4 : 0);
    rect.height -= param.WindowFrameShow ? extra : 0;
  } else if (param.StyleMode === "XPStyle") {
    rect.width = param.ActorStatusWindow_Width > 0 ? param.ActorStatusWindow_Width - 8 : Graphics.boxWidth;
    rect.height = param.ActorStatusWindow_Height > 0 ? param.ActorStatusWindow_Height : this.windowAreaHeight() + extra - (param.WindowFrameShow ? 10 : 0);
    if (param.ActorStatusWindowOnPosition) {
      rect.x = (param.ActorStatusWindowCenter ? (Graphics.width - rect.width) / 2 : 0) + param.ActorStatusWindow_X;
      rect.y = param.ActorStatusWindow_Y;
    } else {
      rect.x = (Graphics.width - rect.width) / 2;
      rect.y = (Graphics.height - Graphics.boxHeight) / 2 + Graphics.boxHeight - rect.height + extra - (param.WindowFrameShow ? 6 : 0) - 4;
    }
  }
  return rect;
};

const _Scene_Battle_partyCommandWindowRect = Scene_Battle.prototype.partyCommandWindowRect;
Scene_Battle.prototype.partyCommandWindowRect = function() {
  const rect = _Scene_Battle_partyCommandWindowRect.call(this);
  if (param.StyleMode === "Default" || param.StyleMode === "MVStyle") {
  } else if (param.StyleMode === "XPStyle") {
    rect.width = param.PartyCommand_Width > 0 ? param.PartyCommand_Width : Graphics.boxWidth;
    rect.height = this.partyWindowAreaHeight();
    rect.x = param.PartyCommandCenter ? Graphics.boxWidth / 2 - rect.width / 2 : 0 + param.PartyCommand_X;
    rect.y = this.partyCommand_YPosition() + param.PartyCommand_Y;
    rect.statusWindowHeight = this._statusWindow.height;
  }
  return rect;
};

const _Scene_Battle_actorCommandWindowRect = Scene_Battle.prototype.actorCommandWindowRect;
Scene_Battle.prototype.actorCommandWindowRect = function() {
  const rect = _Scene_Battle_actorCommandWindowRect.call(this);
  if (param.StyleMode === "Default" || param.StyleMode === "MVStyle") {
    rect.height = this.actorCommandHeight();
  } else if (param.StyleMode === "XPStyle") {
    rect.width = this.actorCommandWidth(); 
    rect.height = this.actorCommandHeight();
    rect.x = this.actorCommandX();
    rect.y = 0;
  }
  return rect;
};

Scene_Battle.prototype.actorCommandWidth = function() {
  if (param.ActorCommand_Width > 0) {
    return param.ActorCommand_Width;
  }
  if (param.ActorCommandMode === 0 || (param.ActorCommandMode >= 4 && param.ActorCommandMode <= 6)) {
    return Math.min((param.ActorStatusWindow_Width > 0 ? param.ActorStatusWindow_Width : Graphics.boxWidth) / this._statusWindow.maxCols() - 12, 192);
  } else if (param.ActorCommandMode >= 1) {
    return Graphics.boxWidth;
  } else {
    return 0;
  }
};

Scene_Battle.prototype.actorCommandHeight = function() {
  return this.calcWindowHeight(param.ActorCommandMaxRow, true);
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

const _Scene_Battle_updateStatusWindowPosition = Scene_Battle.prototype.updateStatusWindowPosition;
Scene_Battle.prototype.updateStatusWindowPosition = function() {
  if (param.StyleMode === "Default" || param.StyleMode === "MVStyle") {
    const actorImges = this._actorImges;
    const actorStatus = this._actorStatus;
    const targetX = this.statusWindowX();
    _Scene_Battle_updateStatusWindowPosition.call(this);
    if (!$gameSystem.isSideView() && this._battleEffects) {
      const battleEffects = this._battleEffects;
      const EffectsX = this.effectsX(targetX);
      if (actorStatus.x < targetX) {
        battleEffects.x = Math.min(battleEffects.x + 16, EffectsX);
      }
      if (actorStatus.x > targetX) {
        battleEffects.x = Math.max(battleEffects.x - 16, EffectsX);
      }
    }
    if (actorStatus.x < targetX) {
      actorImges.x = Math.min(actorImges.x + 16, targetX);
      actorStatus.x = Math.min(actorStatus.x + 16, targetX);
    }
    if (actorStatus.x > targetX) {
      actorImges.x = Math.max(actorImges.x - 16, targetX);
      actorStatus.x = Math.max(actorStatus.x - 16, targetX);
    }
  }
};

Scene_Battle.prototype.statusWindowX = function() {
  if (this.isAnyInputWindowActive()) {
      return this.statusWindowRect().x;
  } else {
      return this.statusWindowRect().x + (this._partyCommandWindow.width / 2 * (this.isRightInputMode() ? 1 : -1));
  }
};

Scene_Battle.prototype.effectsX = function() {
  if (this.isAnyInputWindowActive()) {
     return (this._battleEffects.home_x + (this._partyCommandWindow.width / 2) * (this.isRightInputMode() ? -1 : 1));
  } else {
     return this._battleEffects.home_x;
  }
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
  this._skillWindow.selectionHide();
  this._itemWindow.selectionHide();
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
  this._skillWindow.selectionHide();
  this._itemWindow.selectionHide();
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
  this._statusWindow.opacity = param.WindowShow ? param.ActorWindowSelectOpacity : 0;
  this._battleHudBack.opacity = param.ActorWindowSelectOpacity;
  this._battleHudFront.opacity = param.ActorWindowSelectOpacity;
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
  this.updateBackground();
};

Scene_Battle.prototype.updateBackground = function() {
  if (param.PartyCommandBackground) {
    this._partyCommandWindow.windowBackground.visible = this._partyCommandWindow._commandOpen && this._partyCommandWindow.visible;
  }
  if (param.ActorCommandBackground) {
    this._actorCommandWindow.windowBackground.visible = this._actorCommandWindow._commandOpen && this._actorCommandWindow.visible;
  }
  if (param.ItemWindowBackground) {
    this._itemWindow.windowBackground.visible = this._itemWindow.visible;
  }
  if (param.SkillWindowBackground) {
    this._skillWindow.windowBackground.visible = this._skillWindow.visible;
  }
  if (param.EnemyWindowBackground) {
    this._enemyWindow.windowBackground.visible = this._enemyWindow.visible;
  }
  if (param.HelpWindowBackground) {
    this._helpWindow.windowBackground.visible = this._helpWindow.visible;
  }
  if (param.MessageWindowBackground) {
    this._messageWindow.windowBackground.visible = !BattleManager.getDisplayMessageType() && this._messageWindow.openness >= 200;
  }
  if (this._messageWindow.isClosing() && BattleManager.getDisplayMessageType()) {
    BattleManager.displayMessageType(null);
  }
}; 

Scene_Battle.prototype.activeWindow = function() {
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
  if ($gameParty.inBattle()) {
    this.onMessage = true;
    if (param.MessageWindowBackground) {
      this.windowBackground.x = this.x + (Graphics.width - Graphics.boxWidth) / 2 + param.MessageBackground_X;
      this.windowBackground.y = this.y + (param.MessageWindowVisibleSetting === 0 ? 0 : this.height) + (Graphics.height - Graphics.boxHeight) / 2 + param.MessageBackground_Y;
    }
  }
};

const _Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function() {
  _Window_Message_terminateMessage.call(this);
  if ($gameParty.inBattle()) {
    this.onMessage = false; 
  }
};

const _Window_Message_setBackgroundType = Window_Message.prototype.setBackgroundType;
Window_Message.prototype.setBackgroundType = function(type) {
  _Window_Message_setBackgroundType.call(this, type);
  if ($gameParty.inBattle() && !BattleManager.getDisplayMessageType() && !param.MessageWindowShow && type === 0) {
    this.opacity = 0;
  }
};

Window_BattleSkill.prototype.selectionHide = function() {
  if (param.HelpWindowSelectShow) {
    Window_SkillList.prototype.hide.call(this);
  } else {
    Window_BattleSkill.prototype.hide.call(this);
  }
};

Window_BattleItem.prototype.selectionHide = function() {
  if (param.HelpWindowSelectShow) {
    Window_ItemList.prototype.hide.call(this);
  } else {
    Window_SkillList.prototype.hide.call(this);
  }
};

//Window_PartyCommand
const _Window_PartyCommand_initialize = Window_PartyCommand.prototype.initialize;
Window_PartyCommand.prototype.initialize = function(rect) {
  _Window_PartyCommand_initialize.call(this, rect);
  this.statusWindowHeight = rect.statusWindowHeight;
};

Window_PartyCommand.prototype.maxCols = function() {
  return (param.StyleMode === "Default" || param.StyleMode === "MVStyle") ? 1 : Math.ceil((this._list ? Math.min(this._list.length, param.PartyCommandMaxCol) : param.PartyCommandMaxCol));
};

const _Window_PartyCommand_refresh = Window_PartyCommand.prototype.refresh;
Window_PartyCommand.prototype.refresh = function() {
  _Window_PartyCommand_refresh.call(this);
  const cols = Math.max(param.Default_PartyCommandMaxRow, Math.min(Math.ceil(this.maxItems() / param.PartyCommandMaxCol), param.PartyCommandMaxRow));
  this.height = this.fittingHeight(cols)
  if (param.StyleMode === "Default" || param.StyleMode === "MVStyle") {
    this.height = this.fittingHeight(param.Default_PartyCommandMaxRow);
  } else if (param.StyleMode === "XPStyle") {
    this.height = this.fittingHeight(Math.min(Math.ceil(this.maxItems() / param.PartyCommandMaxCol), param.PartyCommandMaxRow));
    if (param.PartyCommandPosition === 2) {
      this.y = Graphics.boxHeight - (this.height + this.statusWindowHeight) + (param.WindowFrameShow ? 0 : 6) + param.PartyCommand_Y;
    }
  }
};

const _Window_PartyCommand_drawItemBackground = Window_PartyCommand.prototype.drawItemBackground;
Window_PartyCommand.prototype.drawItemBackground = function(index) {
  if (param.PartyCommandCursorBackShow) {
    _Window_PartyCommand_drawItemBackground.call(this, index);
  }
};

const _Window_PartyCommand_open = Window_PartyCommand.prototype.open;
Window_PartyCommand.prototype.open = function() {
  if (!param.PartyCommandWindowShow) {
    this.openness = 255;
    this.show();
  }
  _Window_PartyCommand_open.call(this);
  this._commandOpen = true;
};

const _Window_PartyCommand_close = Window_PartyCommand.prototype.close;
Window_PartyCommand.prototype.close = function() {
  if (!param.PartyCommandWindowShow) {
    this.hide();
  }
  _Window_PartyCommand_close.call(this);
  this._commandOpen = false;
};

//Window_ActorCommand
const _Window_ActorCommand_initialize = Window_ActorCommand.prototype.initialize;
Window_ActorCommand.prototype.initialize = function(rect) {
  _Window_ActorCommand_initialize.call(this, rect);
  this.variable = false;
};

Window_ActorCommand.prototype.selectActor = function(actor) {
  const members = $gameParty.battleMembers();
  return members.indexOf(actor);
};

Window_ActorCommand.prototype.maxCols = function() {
  return (param.StyleMode === "Default" || param.StyleMode === "MVStyle") ? 1 : Math.ceil((this._list ? Math.min(this._list.length, param.ActorCommandMaxCol) : param.ActorCommandMaxCol));
};

Window_ActorCommand.prototype.setCommandHeight = function() {
  const cols = Math.ceil(this.maxItems() / param.ActorCommandMaxCol).clamp(param.ActorCommandMinRow, param.ActorCommandMaxRow);
  this.height = this.fittingHeight(cols);
};

const _Window_ActorCommand_paint = Window_ActorCommand.prototype.paint;
Window_ActorCommand.prototype.paint = function() {
  //可変コマンドなら高さを計算
  if (this.variable) {
    this.setCommandHeight();
  }
  _Window_ActorCommand_paint.call(this);
};

const _Window_ActorCommand_refresh = Window_ActorCommand.prototype.refresh;
Window_ActorCommand.prototype.refresh = function() {
  _Window_ActorCommand_refresh.call(this);
  const actorIndex = this.selectActor(this._actor);
  if (this._statusWindow) {
    const rect = this._statusWindow.itemRect(actorIndex);
    if (param.StyleMode === "Default" || param.StyleMode === "MVStyle") {
      if (actorIndex >= 0 || this._actor) {
        this.y = Graphics.boxHeight - this.height + (param.WindowFrameShow ? -4 : 2);
      }
    } else if (param.StyleMode === "XPStyle") {
      if (actorIndex >= 0 || this._actor) {
        if (param.ActorCommandMode === 0) {
          //this.height = this.fittingHeight(Math.min(Math.ceil(this.maxItems() / param.ActorCommandMaxCol), param.ActorCommandMaxRow));
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
          if (this.windowBackground) {
            this.windowBackground.x = this.x + this._statusWindow.UI_Difference + param.ActorCommandBackground_X;
            this.windowBackground.y = this.y + (param.ActorommandBackgroundAnchorMode === 0 ? 0 : this.height) + (Graphics.height - Graphics.boxHeight) / 2 + param.ActorCommandBackground_Y;
          }
        } else if ((param.ActorCommandMode >= 4 && param.ActorCommandMode <= 6)) {
          const data = this.SvActorData[actorIndex];
          this.width = param.ActorCommand_Width > 0 ? param.ActorCommand_Width : Math.min(this.width, rect.width);
          if (param.ActorCommandMode === 4) {
            this.x = data.x - (this.width + data.width + 32) / 2;
            this.y = data.y - (this.height + data.height + 48);
          } else if (param.ActorCommandMode === 5) {
            this.x = data.x - (this.width + data.width + 32);
            this.y = data.y - (this.height + data.height + 48) / 2;
          } else {
            this.x = data.x;
            this.y = data.y - (this.height + data.height + 48) / 2;
          }
          if (this.windowBackground) {
            this.windowBackground.x = this.x + this._statusWindow.UI_Difference + param.ActorCommandBackground_X;
            this.windowBackground.y = this.y + (param.ActorommandBackgroundAnchorMode === 0 ? 0 : this.height) + (Graphics.height - Graphics.boxHeight) / 2 + param.ActorCommandBackground_Y;
          }
        } else if (param.ActorCommandMode >= 1) {
          this.height = this.fittingHeight(Math.min(Math.ceil(this.maxItems() / param.ActorCommandMaxCol), param.ActorCommandMaxRow));
          if (param.ActorCommandMode === 3) {
            this.y = Graphics.boxHeight - (this.height + this._statusWindow.height) + (param.WindowFrameShow ? 0 : 6) + param.ActorCommand_Y;
          }
        }
      }
    }
  }
};

Window_ActorCommand.prototype.setStatusWindow = function(statusWindow) {
  this._statusWindow = statusWindow;
};

const _Window_ActorCommand_drawItemBackground = Window_ActorCommand.prototype.drawItemBackground;
Window_ActorCommand.prototype.drawItemBackground = function(index) {
  if (param.ActorCommandCursorBackShow) {
    _Window_ActorCommand_drawItemBackground.call(this, index);
  }
};

const _Window_ActorCommand_open = Window_ActorCommand.prototype.open;
Window_ActorCommand.prototype.open = function() {
  if (!param.ActorCommandWindowShow) {
    this.openness = 255;
    this.show();
  }
  this._commandOpen = true;
  _Window_ActorCommand_open.call(this);
};

const _Window_ActorCommand_close = Window_ActorCommand.prototype.close;
Window_ActorCommand.prototype.close = function() {
  if (!param.ActorCommandWindowShow) {
    this.hide();
  }
  _Window_ActorCommand_close.call(this);
  this._commandOpen = false;
};


const _Window_ItemList_drawItemBackground = Window_ItemList.prototype.drawItemBackground;
Window_ItemList.prototype.drawItemBackground = function(index) {
  if (!$gameParty.inBattle() || ($gameParty.inBattle() && param.SelectCursorBackShow)) {
    _Window_ItemList_drawItemBackground.call(this, index);
  }
};

const _Window_SkillList_drawItemBackground = Window_SkillList.prototype.drawItemBackground;
Window_SkillList.prototype.drawItemBackground = function(index) {
  if (!$gameParty.inBattle() || ($gameParty.inBattle() && param.SelectCursorBackShow)) {
    _Window_SkillList_drawItemBackground.call(this, index);
  }
};

const _Window_BattleEnemy_drawItemBackground = Window_BattleEnemy.prototype.drawItemBackground;
Window_BattleEnemy.prototype.drawItemBackground = function(index) {
  if (!$gameParty.inBattle() || ($gameParty.inBattle() && param.SelectCursorBackShow)) {
    _Window_BattleEnemy_drawItemBackground.call(this, index);
  }
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
  return param.StyleMode === "MVStyle" ? 1 : param.ActorMaxCol > 0 ? param.ActorMaxCol : Math.max($gameParty.maxBattleMembers(), 4);
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
  const bitmap = param.actorBackground ? loadNormalPicture(param.actorBackground) : null;
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
  if (param.StyleMode === "MVStyle") {

  } else if (param.StyleMode === "XPStyle" || param.StyleMode === "Default") {
    if (param.ActorStatusMode === 1) {
      rect.x += Math.floor((this.width / 2) - (itemWidth * maxCols / 2)) - this.itemPadding();
    } else if (param.ActorStatusMode === 2) {
      rect.x += this.width - (maxCols * itemWidth) - this.itemPadding() * 2;
    } else {
    }
  }
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
  const basicGaugesX = this.basicGaugesX(rect);
  const basicGaugesY = this.basicGaugesY(rect);
  if (param.TPBShow) {
    this.placeTimeGauge(actor, nameX, nameY);
  }
  if (param.StateVisible && !param.OutsideWindowVisible) {
    const stateIconX = this.stateIconX(rect);
    const stateIconY = this.stateIconY(rect);
    this.placeStateIcon(actor, stateIconX, stateIconY);
  }
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
  if (param.StyleMode === "MVStyle") {
    x2 = param.HPChangePosition ? param.ActorHP_X + this._rect.x : x;
    y2 = param.HPChangePosition ? param.ActorHP_Y + this._rect.y : y;
    this.placeGauge(actor, "hp", x2, y2);
    x2 = param.MPChangePosition ? param.ActorMP_X + this._rect.x : x + ($dataSystem.optDisplayTp ? 123 : 216);
    y2 = param.MPChangePosition ? param.ActorMP_Y + this._rect.y : y;
    this.placeGauge(actor, "mp", x2, y2);
    if ($dataSystem.optDisplayTp) {
      x2 = param.TPChangePosition ? param.ActorTP_X + this._rect.x : x + 234;
      y2 = param.TPChangePosition ? param.ActorTP_Y + this._rect.y : y;
      this.placeGauge(actor, "tp", x2, y2);
    }
  } else {
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
  }
};

const _Window_StatusBase_placeStateIcon = Window_StatusBase.prototype.placeStateIcon;
Window_StatusBase.prototype.placeStateIcon = function(actor, x, y) {
  _Window_StatusBase_placeStateIcon.call(this, actor, x, y);
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
  if (param.StyleMode === "MVStyle") {
    if (param.FaceChangePosition) {
      rect.x += param.ActorFace_X;
      rect.y += param.ActorFace_Y;
    } else {
      rect.x -= rect.width / 2 - ImageManager.faceWidth;
    }
    rect.height = this.itemHeight() - 6;
  } else if (param.FaceChangePosition) {
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

const _Window_BattleStatus_stateIconX = Window_BattleStatus.prototype.stateIconX;
Window_BattleStatus.prototype.stateIconX = function(rect) {
  if (param.StyleMode === "MVStyle") {
    return param.StateChangePosition ? param.ActorState_X + rect.x : rect.x + this.basicGaugesX(rect) - 32;
  }
  return param.StateChangePosition ? param.ActorState_X + rect.x : _Window_BattleStatus_stateIconX.call(this, rect);
};

const _Window_BattleStatus_stateIconY = Window_BattleStatus.prototype.stateIconY;
Window_BattleStatus.prototype.stateIconY = function(rect) {
  if (param.StyleMode === "MVStyle") {
    return param.StateChangePosition ? param.ActorState_Y + rect.y : rect.y + rect.height / 2;
  }
  return param.StateChangePosition ? param.ActorState_Y + rect.y : _Window_BattleStatus_stateIconY.call(this, rect);
};

const _Window_BattleStatus_nameY =Window_BattleStatus.prototype.nameY;
Window_BattleStatus.prototype.nameY = function(rect) {
  if (param.StyleMode === "MVStyle") {
    return rect.y + 10;
  }
  return _Window_BattleStatus_nameY.call(this, rect);
};

const _Window_BattleStatus_basicGaugesX = Window_BattleStatus.prototype.basicGaugesX;
Window_BattleStatus.prototype.basicGaugesX = function(rect) {
  return _Window_BattleStatus_basicGaugesX.call(this, rect) + (param.StyleMode === "MVStyle" ? rect.width - 338 : 0);
};

const _Window_BattleStatus_basicGaugesY = Window_BattleStatus.prototype.basicGaugesY;
Window_BattleStatus.prototype.basicGaugesY = function(rect) {
  if (param.StyleMode === "MVStyle") {
    return rect.y + 10;
  }
  return _Window_BattleStatus_basicGaugesY.call(this, rect);
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
  this.actorMainSprite = [];
  let bitmap = null;
  for (const actor of $gameParty.members()) {
    const dateIndex = this.battlreActorIndex(actor.actorId());
    const data = this.battlreActorImgesData(dateIndex, actor);
    if (data) {
      actor.battleActorFaceMode = data.defaultImg ? false : true;
      actor.butlerImgId = dateIndex;
    } else {
      actor.battleActorFaceMode = true;
      actor.butlerImgId = -1;
    }
    if (!actor.battleActorFaceMode) {
      bitmap = this.loadBitmap(data, actor);
    } else {
      bitmap = this.loadFace(actor, data);
    }
    this.actorMainSprite.push(bitmap);
    if(bitmap && !bitmap.isReady()){
      bitmap.addLoadListener(this.performPartyRefresh.bind(this, bitmap));
    } else {
      this.performPartyRefresh(bitmap);
    }
  }
};

Window_BattleActorImges.prototype.performPartyRefresh = function() {
  this._bitmapsReady++;
  if (this._bitmapsReady >= $gameParty.members().length) {
    if (Imported.NUUN_ActorPicture) {
      $gameTemp.setButlerRefresh(false);
    }
    this.refresh();
  }
};

Window_BattleActorImges.prototype.battlreActorIndex = function(id) {
  const actors = param.ActorsButlerList;
  return actors.findIndex(actor => actor.actorId === id);
};

Window_BattleActorImges.prototype.battlreActorImgesData = function(id, actor) {
  if (Imported.NUUN_ActorPicture) {
    const ExData = actor.getButlerGraphicData();
    if (ExData) {
      const data = param.ActorsButlerList[id];
      ExData.Actor_Scale = data.Actor_Scale || 100;
      ExData.Actor_X = data.Actor_X || 0;
      ExData.Actor_Y = data.Actor_Y || 0;
      return ExData;
    }
    return undefined;
  } else {
    return param.ActorsButlerList[id];
  }
};

Window_BattleActorImges.prototype.loadBitmap = function(data, actor) {
  if (!data) {
    return null;
  }
  data.stateBitmapIndex = [];
  const stateImgList = Imported.NUUN_ActorPicture ? actor.getStateData() : data.stateImg;
  const defaultBitmap = nuun_loadPictures(data.defaultImg);
  if (data.deathImg) {
    nuun_loadPictures(data.deathImg);
  }
  if (data.dyingImg) {
    nuun_loadPictures(data.dyingImg);
  }
  if (data.damageImg) {
    nuun_loadPictures(data.damageImg);
  }
  if (data.recoveryDamageImg) {
    nuun_loadPictures(data.recoveryDamageImg);
  }
  if (data.victoryImg) {
    (data.victoryImg);
  }
  if (data.chantImg) {
    nuun_loadPictures(data.chantImg);
  }
  if (data.attackImg) {
    nuun_loadPictures(data.attackImg);
  }
  if (data.itemImg) {
    nuun_loadPictures(data.itemImg);
  }
  if (data.recoveryImg) {
    nuun_loadPictures(data.recoveryImg);
  }
  if (stateImgList){
    stateImgList.forEach((listdeta, i) => {
      if(listdeta.actorStateImg && listdeta.stateImgId > 0){
        nuun_loadPictures(listdeta.actorStateImg);
        data.stateBitmapIndex[listdeta.stateImgId] = i;
      }
    });
  }
  return defaultBitmap;
};

Window_BattleActorImges.prototype.loadFace = function(actor, data) {
  if (data) {
    const stateImgList = Imported.NUUN_ActorPicture ? actor.getStateData() : data.stateImg;
    data.stateBitmapIndex = [];
    if (stateImgList){
      stateImgList.forEach((listdeta, i) => {
        if(listdeta.stateFaceIndex >= 0 && listdeta.stateImgId > 0){
          data.stateBitmapIndex[listdeta.stateImgId] = i; 
        }
      });
    }
  }
  return ImageManager.loadFace(actor.faceName());
};

Window_BattleActorImges.prototype.drawItem = function(index) {
  this.drawItemImage(index);
};

Window_BattleActorImges.prototype.drawItemImage = function(index) {
  const actor = this.actor(index);
  const data = this.battlreActorImgesData(actor.butlerImgId, actor);
  if (data && !actor.battleActorFaceMode) {
    this.drawItemButler(index, actor, data);
  } else if (param.ActorFaceVisible) {
    this.drawItemFace(index, actor, data);
  }
  if (param.StateVisible && param.OutsideWindowVisible) {
    const rect = this.itemRectWithPadding(index);
    const stateIconX = this.stateIconX(rect);
    const stateIconY = this.stateIconY(rect);
    this.placeStateIcon(actor, stateIconX, stateIconY);
  }
};

Window_BattleActorImges.prototype.placeStateIcon = function(actor, x, y) {
  const key = "actor%1-stateIcon".format(actor.actorId());
  const sprite = this.createActorImgSprite(key, Sprite_StateIcon);
  sprite.setup(actor);
  sprite.move(x, y);
  sprite.show();
};

Window_BattleActorImges.prototype.drawItemButler = function(index, actor, data) {
  const bitmap = this.actorMainSprite[index];
  const rect = this.itemRect(index);
  const key = "actor%1-img".format(actor.actorId());
  const sprite = this.createActorImgSprite(key, Sprite_ActorImges);
  sprite.setup(actor, data);
  const x = rect.x + Math.floor(this.itemWidth() / 2) + 4 + param.ActorImg_X + data.Actor_X;
  const y = rect.y + rect.height + this.itemPadding() + param.ActorImg_Y + data.Actor_Y;
  sprite.scale.x = data.Actor_Scale / 100;
  sprite.scale.y = data.Actor_Scale / 100;
  sprite.setHome(x, y);
  sprite.show();
};

Window_BattleActorImges.prototype.drawItemFace = function(index, actor, data) {
  const rect = this.faceRect(index);
  width = rect.width || ImageManager.faceWidth;
  height = rect.height || ImageManager.faceHeight;
  const key = "actor%1-img".format(actor.actorId());
  const sprite = this.createActorImgSprite(key, Sprite_ActorImges);
  const faceIndex = sprite._faceIndex >= 0 ? sprite._faceIndex : (data && data.defaultFaceIndex >= 0) ? data.defaultFaceIndex : actor.faceIndex();
  sprite.bitmap = ImageManager.loadFace(actor.faceName());
  sprite.setup(actor, data, faceIndex);
  const pw = ImageManager.faceWidth;
  const ph = ImageManager.faceHeight;
  const sw = Math.min(width, pw);
  const sh = Math.min(height, ph);
  const x = rect.x + Math.floor(this.itemWidth() / 2) + 4 + (data ? data.Actor_X : 0);
  const y = rect.y + sh + (data ? data.Actor_Y : 0);
  sprite.setHome(x, y);
  const sx = Math.floor((faceIndex % 4) * pw + (pw - sw) / 2);
  const sy = Math.floor(Math.floor(faceIndex / 4) * ph + (ph - sh) / 2);
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

const _Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome;
Sprite_Actor.prototype.setActorHome = function(index) {
  if($gameSystem.isSideView()){
    _Sprite_Actor_setActorHome.call(this, index);
  } else {
    this.actorHomeRefresh(index);
  }
};

const _Sprite_Actor_updateVisibility = Sprite_Actor.prototype.updateVisibility;
Sprite_Actor.prototype.updateVisibility = function() {
  _Sprite_Actor_updateVisibility.call(this);
  if (!$gameSystem.isSideView()) {
    this.visible = false;
  }
};

const _Sprite_Actor_startMove = Sprite_Actor.prototype.startMove;
Sprite_Actor.prototype.startMove = function(x, y, duration) {
  if (this.visible) {
    _Sprite_Actor_startMove.call(this, x, y, duration);
  }
};

const _Sprite_Actor_updateMotion = Sprite_Actor.prototype.updateMotion;
Sprite_Actor.prototype.updateMotion = function() {
  if (this.visible) {
    _Sprite_Actor_updateMotion.call(this);
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
    x = w_index * itemWidth + Math.floor(itemWidth / 2) + this.differenceX() + this._statusWindow.itemPadding();
  } else if (param.ActorStatusMode === 2) {
    x = (width - Math.min(this._statusWindow.maxItems(), maxCols) * itemWidth) + w_index * itemWidth + Math.floor(itemWidth / 2) + this.differenceX() - this._statusWindow.itemPadding();
  } else {
    x = (width / 2 - Math.min(this._statusWindow.maxItems(), maxCols) * itemWidth / 2) + w_index * itemWidth + Math.floor(itemWidth / 2) + this.differenceX();
  }
  y = (itemHeight * h_index) + (itemHeight / 2) + this.differenceY();
  if (param.StyleMode === "MVStyle") {
    x -= width / 2 - ImageManager.faceWidth - 12;
    y += itemHeight + 4;
  }
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
  this.anchor.x = 0.5;
  this.anchor.y = 1;
  this._battler = null;
  this._imgIndex = -1;
  this._durationOpacity = 0;
  this._updateCount = 0;
  this._changeStateImgId = 0;
  this._startUpdate = true;
  this._selectionEffectCount = 0;
  this._shake = 0;
  this._shakePower = param.ActorShakePower;
  this._shakeSpeed = param.ActorShakeSpeed;
  this._shakeDuration = 0;
  this._shakeDirection = 1;
  this._zoomDuration = 0;
  this._zoomScale = 1;
  this._zoomScaleTarget = 1.2;
  this._faceIndex = -1;
};

Sprite_ActorImges.prototype.setup = function(battler, data, index) {
  this._battler = battler;
  this._data = data;
  this._faceIndex = index;
  this.updateBitmap();
};

Sprite_ActorImges.prototype.setHome = function(x, y) {
  this._homeX = x;
  this._homeY = y;
  this._baseScale = this._data ? this._data.Actor_Scale / 100 : 1;
  this.move(x, y);
};

Sprite_ActorImges.prototype.update = function() {
  Sprite.prototype.update.call(this);
  if (this._battler) {
    if (Imported.NUUN_ActorPicture) {
      if (this._battler.imgChange && !$gameTemp.isButlerRefresh()) {
        this._imgIndex = -1;
        this._battler.imgChange = false;
      }
    }
    if (this._battler.actorId() === 10) {//デバック用
      //console.log(this._imgIndex)
    }
    if (!this._battler.isActing() && this._battler._actionActorImg) {
      this._battler._actionActorImg === null;
    }
    this.updateBitmap();
    this.updateMotion();
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
  this._faceIndex = faceIndex;
};

Sprite_ActorImges.prototype.updateBitmap = function() {
  const actor = this._battler;
  if (actor && this._data) {
    if (actor.isDead()) {
      this.changeBitmap("dead");
    } else if (actor.isAlive() && this._imgIndex === 1) {
      this.changeBitmap("revive");
    } else if (actor._states.length > 0 && this.stateImgCheck(true)) {
      this.changeBitmap("alwaysAbnormal");
    } else if (!actor.isInputting() && actor.isActing() && this.isAction(actor) && this.changeCheck("attack")) {
      this.changeBitmap("attack");
    } else if (!actor.isInputting() && actor.isActing() && this.isItem(actor) && this.changeCheck("item")) {
      this.changeBitmap("item");
    } else if (!actor.isInputting() && actor.isActing() && this.isRecovery(actor) && this.changeCheck("recovery")) {
      this.changeBitmap("recovery");
    } else if (this.checkVictory(actor) && this.changeCheck("victory")) {
      this.changeBitmap("victory");
    } else if (this.checkDamage(actor) && this.changeCheck("damage")) {
      this.changeBitmap("damage");
    } else if (this.checkRecoveryDamage(actor) && this.changeCheck("recoveryDamage")) {
      this.changeBitmap("recoveryDamage");
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

Sprite_ActorImges.prototype.updateMotion = function() {
  this.setupEffect();
  this.updateDamage();
  this.updateZoom()
};

Sprite_ActorImges.prototype.setupEffect = function() {
  if (this._battler._onDamageEffect) {
    this._shakeDuration = param.ActorShakeFlame;
    this._battler._onDamageEffect = false;
  }
  if (this._battler._isEffectAction) {
    this._zoomDuration = param.ActionZoomDuration;
    this._battler._isEffectAction = false;
  }
};

Sprite_ActorImges.prototype.updateDamage = function() {
  if (this._shakeDuration > 0 || this._shake !== 0) {
    const delta = (this._shakePower * this._shakeSpeed * this._shakeDirection) / 10;
    if (this._shakeDirection <= 1 && this._shake * (this._shake + delta) < 0) {
      this._shake = 0;
    } else {
      this._shake += delta;
    }
    if (this._shake > this._shakePower * 2) {
      this._shakeDirection = -1;
    }
    if (this._shake < -this._shakePower * 2) {
      this._shakeDirection = 1;
    }
    this._shakeDuration--;
    this.x += Math.round(this._shake);
  } else if (this.x !== this._homeX) {
    this.resetDamage();
  }
};

Sprite_ActorImges.prototype.updateZoom = function() {
  if (this._zoomDuration > 0) {
    const d = this._zoomDuration;
    const t = this._zoomDuration <= param.ActionZoomDuration / 2  ? 1 : this._zoomScaleTarget;
    this._zoomScale = ((this._zoomScale * (d - 1) + t) / d);
    this._zoomDuration--;
    this.scale.x = this._zoomScale * this._baseScale;
    this.scale.y = this._zoomScale * this._baseScale;
  } else if (this.scale.x !== this._baseScale) {
    this.resetZoom();
  }
};

Sprite_ActorImges.prototype.resetDamage = function() {
  this.x = this._homeX;
};

Sprite_ActorImges.prototype.resetZoom = function() {
  this.scale.x = this._baseScale;
  this.scale.y = this._baseScale;
};

Sprite_ActorImges.prototype.checkDamage = function(actor) {
  return actor._imgIndex === 3;
};

Sprite_ActorImges.prototype.checkRecoveryDamage = function(actor) {
  return actor._imgIndex === 10;
};

Sprite_ActorImges.prototype.checkVictory = function(actor) {
  return actor._imgIndex === 5;
};

Sprite_ActorImges.prototype.isAction = function(actor) {
  return actor._actionActorImg === "attack";
};

Sprite_ActorImges.prototype.isItem = function(actor) {
  return actor._actionActorImg === "item";
};

Sprite_ActorImges.prototype.isRecovery = function(actor) {
  return actor._actionActorImg === "recovery";
};

Sprite_ActorImges.prototype.setLoadBitmap = function() {
  if (this.loadBitmap && !this.loadBitmap.isReady()) {
    this.loadBitmap.addLoadListener(this.setBitmap.bind(this, this.loadBitmap));
  } else if (this.loadBitmap) {
    this.setBitmap(this.loadBitmap);
  }
};

Sprite_ActorImges.prototype.setBitmap = function(bitmap) {
  this.bitmap = bitmap;
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
        return this._data.damageFaceIndex >= 0 ? true : false;
      } else {
        return this._data.damageImg ? true : false;
      }
    case "recoveryDamage":
      if (mode) {
        return this._data.recoveryDamageFaceIndex >= 0 ? true : false;
      } else {
        return this._data.recoveryDamageImg ? true : false;
      }
    case "dying":
      if (mode) {
        return this._data.dyingFaceIndex >= 0 ? true : false;
      } else {
        return this._data.dyingImg ? true : false;
      }
    case "victory":
      if (mode) {
        return this._data.victoryFaceIndex >= 0 ? true : false;
      } else {
        return this._data.victoryImg ? true : false;
      }
    case "chant":
      if (mode) {
        return this._data.chantFaceIndex >= 0 ? true : false;
      } else {
        return this._data.chantImg ? true : false;
      }
    case "attack":
      if (mode) {
        return this._data.attackFaceIndex >= 0 ? true : false;
      } else {
        return this._data.attackImg ? true : false;
      }
    case "item":
      if (mode) {
        return this._data.itemFaceIndex >= 0 ? true : false;
      } else {
        return this._data.itemImg ? true : false;
      }
    case "recovery":
      if (mode) {
        return this._data.recoveryFaceIndex >= 0 ? true : false;
      } else {
        return this._data.recoveryImg ? true : false;
      }
  }
};

Sprite_ActorImges.prototype.changeBitmap = function(bitmapType) {
  this.loadBitmap = null;
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
    case "attack":
      if (this._imgIndex !== 6) {
        this.setAttack();
      }
      break;
    case "item":
      if (this._imgIndex !== 8) {
        this.setItem();
      }
      break;
    case "recovery":
      if (this._imgIndex !== 9) {
        this.setRecovery();
      }
      break;
    case "recoveryDamage":
        if (this._imgIndex !== 10) {
          this.setRecoveryDamage();
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
        faceIndex = this._data.deathFaceIndex;
        if (faceIndex >= 0) {
          this.faceRefresh(faceIndex);
        }
      } else {
        this.setLoadBitmap();
      }
    } else if (this._imgIndex === 2) { //瀕死
      if (mode) {
        faceIndex = this._data.dyingFaceIndex;
        this.faceRefresh(faceIndex);
      } else {
        this.setLoadBitmap();
      }
    } else if (this._imgIndex === 3) { //ダメージ
      if (mode) {
        faceIndex = this._data.damageFaceIndex;
        this.faceRefresh(faceIndex);
      } else {
        this.setLoadBitmap();
      }
    } else if (this._imgIndex === 4) { //詠唱
      if (mode) {
        faceIndex = this._data.chantFaceIndex;
        this.faceRefresh(faceIndex);
      } else {
        this.setLoadBitmap();
      }
    } else if (this._imgIndex === 5) { //勝利
      if (mode) {
        faceIndex = this._data.victoryFaceIndex;
        this.faceRefresh(faceIndex);
      } else {
        this.setLoadBitmap();
      }
    } else if (this._imgIndex === 6) { //攻撃時 
      if (mode) {
        faceIndex = this._data.attackFaceIndex;
        this.faceRefresh(faceIndex);
      } else {
        this.setLoadBitmap();
      }
    } else if (this._imgIndex === 8) { //アイテム使用時
      if (mode) {
        faceIndex = this._data.itemFaceIndex;
        this.faceRefresh(faceIndex);
      } else {
        this.setLoadBitmap();
      }
    } else if (this._imgIndex === 9) { //回復時
      if (mode) {
        faceIndex = this._data.recoveryFaceIndex;
        this.faceRefresh(faceIndex);
      } else {
        this.setLoadBitmap();
      }
    } else if (this._imgIndex === 10) { //回復した時
      if (mode) {
        faceIndex = this._data.recoveryDamageFaceIndex;
        this.faceRefresh(faceIndex);
      } else {
        this.setLoadBitmap();
      }
    } else if (this._imgIndex >= 1000) { //ステート
      if (mode) {
        faceIndex = this._data.stateImg[this._data.stateBitmapIndex[this._changeStateImgId]].stateFaceIndex;
        this.faceRefresh(faceIndex);
      } else {
        this.setLoadBitmap();
      }
    } else {
      if (mode) { //通常
        const faceIndex = this._data.defaultFaceIndex >= 0 ? this._data.defaultFaceIndex : this._battler.faceIndex();
        this.faceRefresh(faceIndex);
      } else {
        this.setLoadBitmap();
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
  if (((mode && this._data.deathFaceIndex <= 0) || (!mode && !this._data.deathImg)) && param.imgDeathHide) {
    this._updateCount = this.setDeadDuration();
    this._durationOpacity = 255;
  } else {
    this._updateCount = 1;
    if (!mode) {
      this.loadBitmap = nuun_loadPictures(this._data.deathImg);
    }
  }
  this._imgIndex = 1;
};

Sprite_ActorImges.prototype.setRevive = function(){
  const mode = this.faceMode();
  if (((mode && this._data.deathFaceIndex < 0) || (!mode && !this._data.deathImg)) && param.imgDeathHide) {
    this._updateCount = this.setDeadDuration();
    this._durationOpacity = -255;
  } else {
    this._updateCount = 1;
  }
  if (this._battler.isDying() && ((mode && this._data.dyingFaceIndex >= 0) || (!mode && this._data.dyingImg))) {
    this._imgIndex = 2;
    if (!mode) {
      this.loadBitmap = nuun_loadPictures(this._data.dyingImg);
    }
  } else {
    this._imgIndex = 0;
    if (!mode) {
      this.loadBitmap = nuun_loadPictures(this._data.defaultImg);
    }
  }
};

Sprite_ActorImges.prototype.setVictory = function(){
  const mode = this.faceMode();
  if ((mode && this._data.victoryFaceIndex >= 0) || (!mode && this._data.victoryImg)) {
    this._updateCount = Infinity;
    this._imgIndex = 5;
    if (!mode) {
      this.loadBitmap = nuun_loadPictures(this._data.victoryImg);
    }
  }
};

Sprite_ActorImges.prototype.setAttack = function(){
  const mode = this.faceMode();
  if ((mode && this._data.attackFaceIndex >= 0) || (!mode && this._data.attackImg)) {
    this._updateCount = 1;
    this._imgIndex = 6;
    if (!mode) {
      this.loadBitmap = nuun_loadPictures(this._data.attackImg);
    }
  }
};

Sprite_ActorImges.prototype.setItem = function(){
  const mode = this.faceMode();
  if ((mode && this._data.itemFaceIndex >= 0) || (!mode && this._data.itemImg)) {
    this._updateCount = 1;
    this._imgIndex = 8;
    if (!mode) {
      this.loadBitmap = nuun_loadPictures(this._data.itemImg);
    }
  }
};

Sprite_ActorImges.prototype.setRecovery = function(){
  const mode = this.faceMode();
  if ((mode && this._data.recoveryFaceIndex >= 0) || (!mode && this._data.recoveryImg)) {
    this._updateCount = 1;
    this._imgIndex = 9;
    if (!mode) {
      this.loadBitmap = nuun_loadPictures(this._data.recoveryImg);
    }
  }
};

Sprite_ActorImges.prototype.setChant = function(){
  const mode = this.faceMode();
  if ((mode && this._data.chantFaceIndex >= 0) || (!mode && this._data.chantImg) && this._updateCount <= 0) {
    this._updateCount = 1;
    this._imgIndex = 4;
    if (!mode) {
      this.loadBitmap = nuun_loadPictures(this._data.chantImg);
    }
  }
};

Sprite_ActorImges.prototype.setDying = function(){
  const mode = this.faceMode();
  if ((mode && this._data.dyingFaceIndex >= 0) || (!mode && this._data.dyingImg) && this._updateCount <= 0) {
    this._updateCount = 1;
    this._imgIndex = 2;
    if (!mode) {
      this.loadBitmap = nuun_loadPictures(this._data.dyingImg);
    }
  }
};

Sprite_ActorImges.prototype.setDamage = function(){
  const mode = this.faceMode();
  if ((mode && this._data.damageFaceIndex >= 0) || (!mode && this._data.damageImg)) {
    this._imgIndex = 3;
    this._updateCount = this.setDamageDuration();
    if (!mode) {
      this.loadBitmap = nuun_loadPictures(this._data.damageImg);
    }
  }
};

Sprite_ActorImges.prototype.setRecoveryDamage = function(){
  const mode = this.faceMode();
  if ((mode && this._data.recoveryDamageFaceIndex >= 0) || (!mode && this._data.recoveryDamageImg)) {
    this._imgIndex = 10;
    this._updateCount = this.setDamageDuration();
    if (!mode) {
      this.loadBitmap = nuun_loadPictures(this._data.recoveryDamageImg);
    }
  }
};

Sprite_ActorImges.prototype.setState = function(mode){
  const id = this._changeStateImgId;
  if (id > 0 && this._imgIndex !== (mode ? 2000 : 1000 ) + id && this._updateCount <= 0) {
    this._imgIndex = (mode ? 2000 : 1000 ) + id;
    this._updateCount = 1;
    if (!this.faceMode()) {
      this.loadBitmap = nuun_loadPictures(this._data.stateImg[this._data.stateBitmapIndex[id]].actorStateImg);
    }
  }
};

Sprite_ActorImges.prototype.setDefault = function(){
  if (this._updateCount <= 0) {
    this._imgIndex = 0;
    this._updateCount = 1;
    if (!this.faceMode()) {
      this.loadBitmap = nuun_loadPictures(this._data.defaultImg);
    }
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
    if (changeImgId > 0 && this._data.stateImg) {
      const imgIndex = this._data.stateBitmapIndex[changeImgId] || 0;
      const imgData = this._data.stateImg[imgIndex] || [];
      if (imgData.stateImgId > 0) {
        if (faceMode) {
          if (imgData && imgData.stateFaceIndex >= 0 && mode === imgData.Always) {
            priorityId = imgData.priorityId;
            if(priority < priorityId) {
              priority = priorityId;
              id = changeImgId;
            }
          }
        } else {
          if (imgData && imgData.actorStateImg && mode === imgData.Always) {
            priorityId = imgData.priorityId;
            if(priority < priorityId) {
              priority = priorityId;
              id = changeImgId;
            }
          }
        }
      }
    }
  }, this);
  return id;
};

Sprite_ActorImges.prototype.faceMode = function() {
  return this._battler.battleActorFaceMode;
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
  this._HPGaugeWidth = param.StyleMode === "MVStyle" ? (param.HPGaugeWidth || ($dataSystem.optDisplayTp ? 108 : 201)) : param.HPGaugeWidth;
  this._MPGaugeWidth = param.StyleMode === "MVStyle" ? (param.MPGaugeWidth || ($dataSystem.optDisplayTp ? 96 : 114)) : param.MPGaugeWidth;
  this._GaugeHeight = 0;
};

Sprite_BattleGauge.prototype.bitmapWidth = function() {
  switch (this._statusType) {
    case "hp":
      return this._HPGaugeWidth;
    case "mp":
      return this._MPGaugeWidth;
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
const _Spriteset_Battle_makeTargetSprites = Spriteset_Battle.prototype.makeTargetSprites;
Spriteset_Battle.prototype.makeTargetSprites = function(targets) {
  const targetSprites = _Spriteset_Battle_makeTargetSprites.call(this, targets);
  this._effectsContainer = this.animationTarget(targetSprites) ? this._effectsFrontContainer : this._effectsBackContainer;
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
  this.windowBackground = loadNormalPicture(param.windowBackground);
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
  sprite.home_x = x;
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

})();