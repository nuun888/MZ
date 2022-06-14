/*:-----------------------------------------------------------------------------------
 * NUUN_BattleStyleEX.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc バトルスタイル拡張
 * @author NUUN
 * @version 3.4.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_ActorPicture
 * 
 * @help
 * バトルスタイル拡張プラグインのベースプラグインです。単体では動作しません。
 * 
 * 更新履歴
 * 2022/6/15 Ver.3.4.0
 * パーティコマンド、アクターコマンド、アクターステータスウィンドウに任意のウィンドウスキンを設定できる機能を追加。
 * 2022/6/11 Ver.3.3.7
 * ステートエフェクトが画像の拡大率に依存してしまう問題を修正。
 * 2022/6/7 Ver.3.3.6
 * アクター画像の表示幅を指定すると行動時に画像が消える問題を修正。
 * アクター行動時にステートの表示がおかしくなる問題を修正。
 * アクター毎にステートエフェクトの座標を調整できる機能を追加。
 * 2022/6/5 Ver.3.3.5
 * アクター行動時のエフェクトがおかしくなる問題を修正。
 * 2022/6/4 Ver.3.3.4
 * アクター画像設定をなしに設定して戦闘を行うとアニメーション時にエラーが出る問題を修正。
 * 2022/6/2 Ver.3.3.3
 * 立ち絵の起点を下に設定したときに、画像の下部分がウィンドウの下側から表示されない問題を修正。
 * 2022/6/1 Ver.3.3.2
 * ２行目のアクターステータスの表示で表示揃えを適用できるように修正。
 * アクター画像（顔グラ）の設定方法に画像起点を追加。
 * 2022/5/31 Ver.3.3.1
 * 敵またはアクター対象選択をキャンセルしパーティコマンドまで戻った時に、操作を受け付けなくなる問題を修正。
 * 2022/5/26 Ver.3.3.0
 * アクターステータスの表示する方法に独自表示設定する機能を追加。
 * 上記の機能に独自パラメータ、独自ゲージを表示する機能を追加。
 * 2022/5/12 Ver.3.2.2
 * ステートアニメーションを表示させない機能を追加。
 * 2022/5/11 Ver.3.2.1
 * フロントビュー時のアクターのアニメーションをOFF、サイドビューバトル時でもステートアニメーションが適用してしまう問題を修正。
 * 2022/5/11 Ver.3.2.0
 * アクター画像にステート画像を表示する機能を追加。
 * パーティ、アクターコマンドの表示位置を指定できる機能を追加。
 * 2022/5/10 Ver.3.1.6
 * MVアニメーションを再生したときにエラーが起きる問題を修正。
 * 2022/5/10 Ver.3.1.5
 * アクター画像にエフェクト（アニメーション）を適用するように修正。
 * 2022/5/4 Ver.3.1.4
 * 攻撃時のスキルをなしに設定したときに画像が切り替わらない問題を修正。
 * 2022/5/3 Ver.3.1.3
 * 戦闘不能時の画像を設定しても戦闘不能時に画像が消えてしまう問題を修正。
 * 2022/5/2 Ver.3.1.2
 * エフェクトのプロパティを中間（アクター画像とステータスの間）か最前面に表示する機能を追加。
 * 2022/5/1 Ver.3.1.1
 * MP、TPゲージの座標変更許可時に座標が正常に適用されてなかった問題を修正。
 * 2022/4/10 Ver.3.1.0
 * アクター画像条件拡張による処理追加。
 * アクター画像設定のスキル、アイテム条件が適用されていなかった問題を修正。
 * 2022/4/4 Ver.3.0.7
 * アイコンステート枠内表示をOFFにした場合、ステートアイコンがアクター画像の背後に表示されてしまう問題を修正。
 * 2022/4/1 Ver.3.0.6
 * アクターコマンドの項目表示位置を中央にする機能の処理を追加。
 * 2022/3/29 Ver.3.0.5
 * アクターコマンドを各アクターの上指定時のサポートアクターのコマンド座標の処理を追加。
 * 2022/3/27 Ver.3.0.4
 * アニメーション、ダメージポップアップの表示がずれるため一時的にもとに戻す修正。
 * 2022/3/26 Ver.3.0.3
 * アクターウィンドウステータスのアクター配置を表示範囲可変表示にする機能を追加。
 * 2022/3/26 Ver.3.0.2
 * 敵選択ウィンドウのスキン非表示を設定する項目がなかった問題を修正。
 * 逃走失敗時にエラーが出る問題を修正。
 * 敵出現、勝利、敗北、逃走時に背景画像を指定したときに、背景のY座標が正常に適用していなかった問題を修正。
 * 2022/3/25 Ver.3.0.1
 * 立ち絵切り替え条件にスイッチ、武器、防具装備時、特定の職業を追加
 * プラグインコマンド「アクターステータスウィンドウ透明化表示」の表記が逆だった問題を修正。
 * 2022/3/24 Ver.3.0.0
 * リニューアル版初版
 * 
 * 
 * @command ActorStatusWindowOpacity
 * @desc アクターステータスウィンドウを透明化します。
 * @text アクターステータスウィンドウ透明化表示
 * 
 * @arg WindowOpacity
 * @type boolean
 * @default false
 * @text 不透明度表示
 * @desc ONの時、アクターステータスウィンドウが透明化します。(ONで透明化)
 * 
 * @arg WindowOpacityValue
 * @type number
 * @default 0
 * @text 不透明度
 * @desc 不透明度を指定します。0で非表示
 * 
 */
var Imported = Imported || {};
Imported.NUUN_BattleStyleEX = true;

(() => {
const parameters = PluginManager.parameters('NUUN_BattleStyleEX');
const params = NuunManager.getBattleStyleParams();
let statusData = null;

const pluginName = "NUUN_BattleStyleEX";

PluginManager.registerCommand(pluginName, 'ActorStatusWindowOpacity', args => {
  BattleManager.statusWindowOpacity(eval(args.WindowOpacity), Number(args.WindowOpacityValue));
});

function getActorData(actorId) {
  return params.ActorData.find(data => data.actorId === actorId);
};

function getActorPositionData(actorId) {
  const find = getActorData(actorId);
  if (find && !find.DefaultStatusPosition) {
      return find.StatusPositionData;
  } else {
      return params.DefaultStatusPositionData;
  }
};

function getActorImgData(actorId) {
  const find = getActorData(actorId);
  if (find) {
      return find.ActorImgSetting;
  } else {
      return params.DefaultActorImgData;
  }
};

function getActorWindowCenter() {
  return (Graphics.width - getActorWindowOrgWidth()) / 2;
};

function getActorWindowOrgWidth() {
  return (params.ActorStatusWindow_Width > 0 ? params.ActorStatusWindow_Width : Graphics.boxWidth);
};

function loadBackground(img) {
  if (img) {
    ImageManager.nuun_LoadPictures(img);
  }
}

function getStateAnimationShow() {
  return !$gameSystem.isSideView() && params.ActorEffectShow && params.StateAnimationShow;
}


const _BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
  _BattleManager_initMembers.call(this);
  this.actorStatusWindowOpacity = false;
  this.actorStatusWindowOpacityValue = false;
  this.battlerSprite = [];
};

BattleManager.statusWindowOpacity = function(flag, opacity) {
  this.actorStatusWindowOpacity = flag;
  this.actorStatusWindowOpacityValue = flag ? opacity : 255;
};

const _BattleManager_displayStartMessages = BattleManager.displayStartMessages;
BattleManager.displayStartMessages = function() {
  if (!params.AppearWindowVisible) {
    _BattleManager_displayStartMessages.call(this);
    this.setDisplayMessagePosition(params.AppearWindowAnchorMode);
    this.displayMessageType("Appear");
  }
};

const _BattleManager_displayVictoryMessage = BattleManager.displayVictoryMessage;
BattleManager.displayVictoryMessage = function() {
  _BattleManager_displayVictoryMessage.call(this);
  this.setDisplayMessagePosition(params.VictoryWindowAnchorMode);
  this.displayMessageType("Victory");
};

const _BattleManager_displayDefeatMessage = BattleManager.displayDefeatMessage;
BattleManager.displayDefeatMessage = function() {
  _BattleManager_displayDefeatMessage.call(this);
  this.setDisplayMessagePosition(params.LoseWindowAnchorMode);
  this.displayMessageType("Defeat");
};

const _BattleManager_displayEscapeSuccessMessage = BattleManager.displayEscapeSuccessMessage;
BattleManager.displayEscapeSuccessMessage = function() {
  _BattleManager_displayEscapeSuccessMessage.call(this);
  this.setDisplayMessagePosition(params.EscapeWindowAnchorMode);
  this.displayMessageType("Escape");
};

const _BattleManager_displayEscapeFailureMessage = BattleManager.displayEscapeFailureMessage;
BattleManager.displayEscapeFailureMessage = function() {
  _BattleManager_displayEscapeFailureMessage.call(this);
  this.setDisplayMessagePosition(params.EscapeWindowAnchorMode);
  this.displayMessageType("EscapeFailure");
};

BattleManager.setDisplayMessagePosition = function(type) {
  switch (type) {
    case 'top':
      $gameMessage.setPositionType(0);
      break;
    case 'center':
      $gameMessage.setPositionType(1);
      break;
    case 'under':
      $gameMessage.setPositionType(2);
      break;
  }
};

BattleManager.displayMessageType = function(type) {
  $gameMessage._messageType = type;
};

BattleManager.getDisplayMessageType = function() {
  return $gameMessage._messageType;
};

//Game_Temp
Game_Temp.prototype.setBattleStyleRefresh = function(flag) {
    this._battleStyleRefresh = flag;
};
  
Game_Temp.prototype.isBattleStyleRequested = function() {
    return this._battleStyleRefresh || false;
};

//Game_Actor
const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
  _Game_Actor_initMembers.call(this);
  this.nuun_bsUseItemId = -1;
  this._battleStyleGraphicIndex = -1;
  this._battleStyleGraphicName = null;
  this._actionActorImg = null;
  this._isEffectAction = false;
  this._onDamageEffect = false;
  this._isDeadImg = false;
  this._imgScenes = 'default';
};

const _Game_Actor_refresh = Game_Actor.prototype.refresh;
Game_Actor.prototype.refresh = function() {
  _Game_Actor_refresh.call(this);
  this.battleStyleImgRefresh();
};

const _Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
  _Game_Actor_setup.call(this, actorId);
  this.battleStyleImgRefresh();
};

Game_Actor.prototype.battleStyleImgRefresh = function() {
  this.setBattleStyleActorGraphicData();
};

Game_Actor.prototype.resetBattleStyleImgId = function() {
  this.onImgId = 0;
  this.battleStyleImgRefresh();
};

Game_Actor.prototype.setBattleStyleActorGraphicData = function() {
  let imgIndex = -1;
  let index = -1;
  this._isDeadImg = false;
  this._imgScenes = 'default';
  const actorId = this.actorId();
  const imgData = getActorImgData(actorId);
  const actorData = getActorData(actorId);
  this.bsImgMode = imgData ? imgData.ActorImgMode : 'face';
  this.faceMode = !(imgData && imgData.ActorImgMode !== 'face');
  if (Imported.NUUN_ActorPicture && params.OnActorPictureEX) {
    this.actorPictureActorGraphicData(imgData);
    return;
  } else if (imgData.ActorImgMode !== 'none' && actorData && actorData.ButlerActorImg) {
    index = actorData.ButlerActorImg.findIndex(data => {
      return this.battleStyleMatchConditions(data);
    });
    if (index >= 0) {
      const data = actorData.ButlerActorImg[index];
      this._battleStyleGraphicName = this.getBattleStyleImg(data);
      imgIndex = this.getBattleStyleImgIndex(data);
      this._isDeadImg = this.isBSActorGraphicDead(data);
    } else {
      this._battleStyleGraphicName = null;
    }
  } else {
    if (this.faceMode) {
      this._battleStyleGraphicName = this.faceName();
      imgIndex = this.faceIndex();
      index = 0;
    } else {
      this._battleStyleGraphicName = null;
    }
  }
  this._battleStyleGraphicIndex = index;
  this._battleStyleImgIndex = imgIndex;
};

Game_Actor.prototype.actorPictureActorGraphicData = function(imgData) {
  if (imgData.ActorImgMode === 'none') {
    this._battleStyleGraphicName = null;
    this._battleStyleGraphicIndex = -1;
    this._battleStyleImgIndex = -1;
  } else if (imgData.ActorImgMode === 'imges') {
    this._battleStyleGraphicName = this.getActorGraphicImg();
    this._battleStyleGraphicIndex = this._actorGraphicIndex;
    this._battleStyleImgIndex = -1;
  } else {
    this._battleStyleGraphicName = this.getActorGraphicFace();
    this._battleStyleGraphicIndex = Math.max(this._actorGraphicIndex, 0);
    this._battleStyleImgIndex = this.getActorGraphicFaceIndex();
  }
  const data = this.getActorGraphicData();
  if (data) {
    this._isDeadImg = this.isBSActorGraphicDead(data);
    this._imgScenes = data.ChangeGraphicScenes;
  }
};

Game_Actor.prototype.getBattleStyleImg = function(data) {
  return this.faceMode ? this.actorFaceName(data) : this.actorGraphicName(data);
};

Game_Actor.prototype.getBattleStyleImgIndex = function(data) {
  return this.faceMode ? this.actorFaceIndex(data) : this.actorImgIndex(data);
};

Game_Actor.prototype.actorFaceName = function(data) {
  return data && data.FaceImg ? data.FaceImg : this.faceName();
};

Game_Actor.prototype.actorGraphicName = function(data) {
  return data.GraphicImg;
};

Game_Actor.prototype.actorFaceIndex = function(data) {
  return data && data.ImgIndex >= 0 ? data.ImgIndex : this.faceIndex();
};

Game_Actor.prototype.actorImgIndex = function(data) {
  return -1;
  //return data && data.ImgIndex >= 0 ? data.ImgIndex : -1;
};

Game_Actor.prototype.getBSImgName = function() {
  return this._battleStyleGraphicName;
};

Game_Actor.prototype.getBSImgIndex = function() {
  return this._battleStyleImgIndex;
};

Game_Actor.prototype.getBSGraphicIndex = function() {
  return this._battleStyleGraphicIndex;
};

Game_Actor.prototype.isBSActorGraphicDead = function(data) {
  return data && (data.ChangeGraphicScenes === 'death' || data.ChangeGraphicScenes === 'state' && (data.stateId === this.deathStateId() || data.ImgStateAll === this.deathStateId()));
};

Game_Actor.prototype.getActorGraphicDead = function() {
  return this._isDeadImg;
};

Game_Actor.prototype.battleStyleMatchConditions = function(data) {
  if (data.ImgHP && data.ImgHP.CondValid && !conditionsParam(data.ImgHP, this.hp, this.param(0))) {
    return false;
  }
  if (data.ImgSwitch && !this.isBattleStyleSwitchImg(data)) {
    return false;
  }
  if (data.ImgWeapon && !this.isBattleStyleWeaponImg(data)) {
    return false;
  }
  if (data.ImgArmor && !this.isBattleStyleArmorImg(data)) {
    return false;
  }
  if (data.ImgStateAll && !this.isBattleStyleStateImg(data, data.ImgStateAll)) {
    return false;
  }
  if (data.ImgClass > 0 && !this.isBattleStyleClassImg(data)) {
    return false;
  }
  if (!this.battleStyleMatchChangeGraphic(data)) {
    return false;
  }
  return true;
};

Game_Actor.prototype.battleStyleMatchChangeGraphic = function(data) {
  const changeData = data.ChangeGraphicScenes;
  this._imgScenes = changeData;
  switch (changeData) {
    case 'default' :
      return true;
    case 'death' :
      return this.isDead();
    case 'dying' :
      return this.isDying();
    case 'damage' :
    return this.onImgId === 1;
    case 'recovery' :
      return this.onImgId === 2;
    case 'attack' :
      return this.onImgId === 10 && this.isBattleStyleUseItemImg(data.Skill);
    case 'recoverySkill' :
      return this.onImgId === 11 && this.isBattleStyleUseItemImg(data.Skill);
    case 'item' :
      return this.onImgId === 12 && this.isBattleStyleUseItemImg(data.Item);
    case 'chant' :
      return this.isChanting();
    case 'victory' :
      return this.onImgId === 20;
    case 'state' :
      return this.isBattleStyleStateImg(data, data.stateId);
  }
};

Game_Actor.prototype.isBattleStyleSwitchImg = function(data) {
  return data.ImgSwitch.every(id => $gameSwitches.value(id));
};

Game_Actor.prototype.isBattleStyleWeaponImg = function(data) {
  return data.ImgWeapon.every(id => this.isEquipped($dataWeapons[id]));
};

Game_Actor.prototype.isBattleStyleArmorImg = function(data) {
  return data.ImgArmor.every(id => this.isEquipped($dataArmors[id]));
};

Game_Actor.prototype.isBattleStyleStateImg = function(data, states) {
  return states.every(id => this.isStateAffected(id));
};

Game_Actor.prototype.isBattleStyleClassImg = function(data) {
  return data.ImgClass ? this._classId === data.ImgClass : true;
};

Game_Actor.prototype.isBattleStyleUseItemImg = function(item) {
  return item && item[0] > 0 ? item.includes(this.nuun_bsUseItemId) : true;
};

const _Game_Actor_isSpriteVisible = Game_Actor.prototype.isSpriteVisible;
Game_Actor.prototype.isSpriteVisible = function() {
    return !$gameSystem.isSideView() && params.ActorEffectShow && $gameParty.inBattle() ? true : _Game_Actor_isSpriteVisible.call(this);
};

const _Game_Actor_performDamage = Game_Actor.prototype.performDamage;
Game_Actor.prototype.performDamage = function() {
  _Game_Actor_performDamage.call(this);
  if (params.OnActorShake) {
    this._onDamageEffect = true;
  }
  this.setBattleImgId(1);
  this.battleStyleImgRefresh();
};

const _Game_Actor_performRecovery = Game_Actor.prototype.performRecovery;
Game_Actor.prototype.performRecovery = function() {
  _Game_Actor_performRecovery.call(this);
  this.setBattleImgId(2);
  this.battleStyleImgRefresh();
};

const _Game_Actor_performVictory = Game_Actor.prototype.performVictory;
Game_Actor.prototype.performVictory = function() {
  _Game_Actor_performVictory.call(this);
  this.setBattleImgId(20);
  this.battleStyleImgRefresh();
};

const _Game_Actor_performActionStart = Game_Actor.prototype.performActionStart;
Game_Actor.prototype.performActionStart = function(action) {
  _Game_Actor_performActionStart.call(this, action);
  if (params.OnActionZoom) {
    this._isEffectAction = true;
  }
  this.setBattleStyleAttackImgId(action);
};

Game_Actor.prototype.setBattleStyleAttackImgId = function(action) {
  if (action.isRecover()) {
    this.setBattleImgId(11, action.item().id);
    this.setBSActionActorImg("recovery");
  } else if (action.isAttack()) {
    this.setBattleImgId(10, action.item().id);
    this.setBSActionActorImg("attack");
  } else if (action.isMagicSkill()) {
    this.setBattleImgId(10, action.item().id);
    this.setBSActionActorImg("attack");
  } else if (action.isSkill()) {
    this.setBattleImgId(10, action.item().id);
    this.setBSActionActorImg("attack");
  } else if (action.isItem()) {
    this.setBattleImgId(12, action.item().id);
    this.setBSActionActorImg("item");
  } else {
    this.setBattleImgId(0, -1);
    this.setBSActionActorImg(null);
  }
  this.battleStyleImgRefresh();
};

Game_Actor.prototype.setBattleImgId = function(id, itemId) {
  if (itemId !== undefined) {
    this.nuun_bsUseItemId = itemId;
  }
  this.onImgId = id;
};

Game_Actor.prototype.resetBattleStyleImgId = function() {
  this.setBattleImgId(0, -1);
  this.battleStyleImgRefresh();
};

Game_Actor.prototype.getLoadBattleStyleImg = function() {
  return this.faceMode ? this.loadBattleStyleActorFace() : this.loadBattleStyleActorGraphic();
};

Game_Actor.prototype.loadBattleStyleActorGraphic = function() {
  return ImageManager.nuun_LoadPictures(this._battleStyleGraphicName);
};

Game_Actor.prototype.loadBattleStyleActorFace = function() {
  return ImageManager.loadFace(this._battleStyleGraphicName);
};

Game_Actor.prototype.isBSEffectAction = function() {
  return this._isEffectAction;
};

Game_Actor.prototype.isBSDamageEffect = function() {
  return this._onDamageEffect;
};

Game_Actor.prototype.setBSActionActorImg = function(state) {
  this._actionActorImg = state;
};

Game_Actor.prototype.isBSActionActorImg = function() {
  return this._actionActorImg;
};

//Game_Enemy
Game_Enemy.prototype.attackAnimation = function() {
    return this.bareHandsAnimationId();
};
  
Game_Enemy.prototype.bareHandsAnimationId = function() {
    return this.enemy().meta.AttackAnimation ? Number(this.enemy().meta.AttackAnimation) : params.EnemySkillAnimation;
};

//Scene_Battle
const _Scene_Battle_initialize = Scene_Battle.prototype.initialize;
Scene_Battle.prototype.initialize = function() {
  _Scene_Battle_initialize.call(this);
  this.loadBackgroundImg()
};

Scene_Battle.prototype.loadBackgroundImg = function() {
  loadBackground(params.AppearBackgroundImg);
  loadBackground(params.VictoryBackgroundImg);
  loadBackground(params.LoseBackgroundImg);
  loadBackground(params.EscapeBackgroundImg);
  loadBackground(params.EscapeFailureBackgroundImg);
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
  this._statusWindow.open();
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
    if (this._spriteset._battleEffects) {
      this._battleEffects = this._spriteset._battleEffects;
    }
    this.createBackgroundWindow();
    this.createHud();
    this.createActorSelectWindow();
    _Scene_Battle_createAllWindows.call(this);
};

Scene_Battle.prototype.createBackgroundWindow = function() {
  if (params.WindowBackground) {
    const bitmap = ImageManager.nuun_LoadPictures(params.WindowBackground);
    const sprite =  new Sprite(bitmap);
    this._battleHudBack.addChild(sprite);
    this._backgroundWindow = sprite;
  }
};

const _Scene_Base_createWindowLayer = Scene_Base.prototype.createWindowLayer;
Scene_Base.prototype.createWindowLayer = function() {
  const sprite =  new Sprite();
  this.addChild(sprite);
  this._itemBSBackgorundWindow = sprite;
  _Scene_Base_createWindowLayer.call(this);
};

if (params.CommandPosition !== 'default') {
  Scene_Battle.prototype.isRightInputMode = function() {
    return params.CommandPosition === 'right';
  };
}

Scene_Battle.prototype.createHud = function() {
    const rect = this.statusWindowRect();
    this._statusWindow = new Window_BattleStatus(rect);
    this._battleHudBack.addChild(this._statusWindow);
    this.setStatusWindow_Sprite();
    if (this._backgroundWindow) {
      this._backgroundWindow.x = this._statusWindow.x + params.WindowBackground_X;
      this._backgroundWindow.y = this._statusWindow.y + params.WindowBackground_Y;
    }
};

Scene_Battle.prototype.createActorSelectWindow = function() {
    const rect = this.actorWindowRect();
    this._actorWindow = new Window_BattleActor(rect);
    this._actorWindow.setHandler("ok", this.onActorOk.bind(this));
    this._actorWindow.setHandler("cancel", this.onActorCancel.bind(this));
    this._battleHudBack.addChild(this._actorWindow);
};

Scene_Battle.prototype.createStatusWindow = function() {
    const rect = this.statusWindowRect();
    this._actorImges = new Window_BattleActorImges(rect);
    this._actorStatus = new Window_BattleActorStatus(rect);
    this._battleHudBack.addChild(this._actorImges);
    this._battleHudFront.addChild(this._actorStatus);
    this._statusWindow.setActorWindow(this._actorImges, this._actorStatus);
};

const _Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
Scene_Battle.prototype.createPartyCommandWindow = function() {
  _Scene_Battle_createPartyCommandWindow.call(this);
    if (params.PartyCommandBackgroundImg) {
      const bitmap = ImageManager.nuun_LoadPictures(params.PartyCommandBackgroundImg);
      const sprite =  new Sprite(bitmap);
      this._battleHudFront.addChild(sprite);
      this._partyCommandBackgroundWindow = sprite;
      sprite.x = params.PartyBackground_X + this._partyCommandWindow.x + (Graphics.width - Graphics.boxWidth) / 2;
      sprite.y = params.PartyBackground_Y + this._partyCommandWindow.y + (Graphics.height - Graphics.boxHeight) / 2;
      sprite.hide();
    }
};

const _Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
  Scene_Battle.prototype.createActorCommandWindow = function() { 
    _Scene_Battle_createActorCommandWindow.call(this);
    this._actorCommandWindow.homeY = this.getActorCommandY();
    this._actorCommandWindow.SvActorData = (params.ActorCommandPosition === 'svtop' || params.ActorCommandPosition === 'svleft' || params.ActorCommandPosition === 'svright') ? this._spriteset._actorSprites : null;
    if (params.ActorCommandBackgroundImg) {
      const bitmap = ImageManager.nuun_LoadPictures(params.ActorCommandBackgroundImg);
      const sprite =  new Sprite(bitmap);
      this._battleHudFront.addChild(sprite);
      this._actorCommandBackgroundWindow = sprite;
      sprite.x = params.ActorBackground_X + this._actorCommandWindow.x + (Graphics.width - Graphics.boxWidth) / 2;
      sprite.y = params.ActorBackground_Y + this._actorCommandWindow.y + (Graphics.height - Graphics.boxHeight) / 2;
      sprite.hide();
    }
};

const _Scene_Battle_actorCommandWindowRect = Scene_Battle.prototype.actorCommandWindowRect;
Scene_Battle.prototype.actorCommandWindowRect = function() {
  const rect = _Scene_Battle_actorCommandWindowRect.call(this);
  rect.width = this.actorCommandWidth();
  rect.height = this.actorCommandHeight();
  rect.x = this.getActorCommandX();
  return rect;
};

Scene_Battle.prototype.actorCommandWidth = function() {
  return params.ActorCommand_Width > 0 ? Math.min(params.ActorCommand_Width, Graphics.width) : 192;
};

Scene_Battle.prototype.actorCommandHeight = function() {
  return this.calcWindowHeight(params.ActorCommandMaxRow, true);
};

Scene_Battle.prototype.getActorCommandX = function() {
  if (params.ActorCommandPosition === 'top' || params.ActorCommandPosition === 'middle' || params.ActorCommandPosition === 'under' || params.ActorCommandPosition === 'custom') {
    return params.ActorCommand_X + (params.ActorommandWindowCenter ? this.actorCommandCenter() : 0);
  } else if (params.ActorCommandPosition === 'default') {
    return this.isRightInputMode() ? Graphics.boxWidth - this.actorCommandWidth() : 0;
  } else {
    return params.ActorCommand_X;
  }
};

Scene_Battle.prototype.getActorCommandY = function() {
  switch (params.ActorCommandPosition) {
    case 'default':
      return this._statusWindow.y + this._statusWindow.height - 6 + (Graphics.boxHeight - Graphics.height) / 2 - (params.WindowFrameShow ? -6 : 0);
    case 'top':
    case 'svtop':
    case 'svleft':
    case 'svright':
    case 'custom':
      return params.ActorCommand_Y + (Graphics.boxHeight - Graphics.height) / 2 + 4;
    case 'middle':
      return this._statusWindow.y / 2 + (Graphics.boxHeight - Graphics.height) / 2 + params.ActorCommand_Y;
    case 'under':
    case 'actor':
      return this._statusWindow.y - 4 + (Graphics.boxHeight - Graphics.height) / 2 + params.ActorCommand_Y;
  }
};

Scene_Battle.prototype.actorCommandCenter = function() {
  return (Graphics.boxWidth - this.actorCommandWidth()) / 2;
};

Scene_Battle.prototype.actorWindowAreaHeight = function() {
  return this.calcWindowHeight(params.ActorCommandMaxRow, true);
};

const _Scene_Battle_createActorWindow = Scene_Battle.prototype.createActorWindow;
Scene_Battle.prototype.createActorWindow = function() {
    //独自に定義するので処理しない
    //_Scene_Battle_createActorWindow.call(this);
};

const _Scene_Battle_createItemWindow = Scene_Battle.prototype.createItemWindow;
Scene_Battle.prototype.createItemWindow = function() {
  _Scene_Battle_createItemWindow.call(this);
  if (params.ItemWindowBackgroundImg) {
    const x = params.ItemBackground_X + this._itemWindow.x + (Graphics.width - Graphics.boxWidth) / 2;
    const y = params.ItemBackground_Y + this._itemWindow.y + (Graphics.height - Graphics.boxHeight) / 2;
    const background = this.setBackgroundWindow(params.ItemWindowBackgroundImg, x, y);
    this._itemWindow.setBSBackground(background);
  }
};

const _Scene_Battle_createSkillWindow = Scene_Battle.prototype.createSkillWindow;
Scene_Battle.prototype.createSkillWindow = function() {
  _Scene_Battle_createSkillWindow.call(this);
  if (params.SkillWindowBackgroundImg) {
    const x = params.SkillBackground_X + this._skillWindow.x + (Graphics.width - Graphics.boxWidth) / 2;
    const y = params.SkillBackground_Y + this._skillWindow.y + (Graphics.height - Graphics.boxHeight) / 2;
    const background = this.setBackgroundWindow(params.SkillWindowBackgroundImg, x, y);
    this._skillWindow.setBSBackground(background);
  }
};

const _Scene_Battle_createEnemyWindow = Scene_Battle.prototype.createEnemyWindow;
Scene_Battle.prototype.createEnemyWindow = function() {
  _Scene_Battle_createEnemyWindow.call(this);
  if (params.EnemyWindowBackgroundImg) {
    const x = params.EnemyWindowBackground_X + this._enemyWindow.x + (Graphics.width - Graphics.boxWidth) / 2;
    const y = params.EnemyWindowBackground_Y + this._enemyWindow.y + (Graphics.height - Graphics.boxHeight) / 2;
    const background = this.setBackgroundWindow(params.EnemyWindowBackgroundImg, x, y);
    this._enemyWindow.setBSBackground(background);
  }
};

const _Scene_Battle_createHelpWindow = Scene_Battle.prototype.createHelpWindow;
Scene_Battle.prototype.createHelpWindow = function() {
  _Scene_Battle_createHelpWindow.call(this);
  if (params.HelpWindowBackgroundImg) {
    const x = params.HelpBackground_X + this._helpWindow.x + (Graphics.width - Graphics.boxWidth) / 2;
    const y = params.HelpBackground_Y + this._helpWindow.y + (Graphics.height - Graphics.boxHeight) / 2;
    const background = this.setBackgroundWindow(params.HelpWindowBackgroundImg, x, y);
    this._helpWindow.setBSBackground(background);
  }
};

const _Scene_Battle_createMessageWindow = Scene_Battle.prototype.createMessageWindow;
Scene_Battle.prototype.createMessageWindow = function() {
  _Scene_Battle_createMessageWindow.call(this);
  this.MessageWindowBackGround();
};

Scene_Battle.prototype.enemyWindowRect = function() {//再定義
  const wx = params.EnemyWindow_X + (params.EnemyWindowMode ? this._statusWindow.x : (this._statusWindow.x - Graphics.width) / 2);
  const ww = this.enemyWindowWidth();
  const wh = this.enemyWindowAreaHeight();
  const wy = (params.EnemyWindowMode ? Graphics.boxHeight - wh : 0) + params.EnemyWindow_Y;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyWindowWidth = function() {
  return params.EnemyWindow_Width > 0 ? Math.min(params.EnemyWindow_Width, Graphics.width) : this._statusWindow.width;
};

Scene_Battle.prototype.enemyWindowAreaHeight = function() {
  return this.calcWindowHeight(params.EnemyMaxRow, true);
};

const _Scene_Battle_partyCommandWindowRect = Scene_Battle.prototype.partyCommandWindowRect;
Scene_Battle.prototype.partyCommandWindowRect = function() {
  const rect = _Scene_Battle_partyCommandWindowRect.call(this);
  if (params.PartyCommandPosition === 'default') {
    rect.width = this.partyCommandWidth(1);
    rect.x = this.isRightInputMode() ? Graphics.boxWidth - this.partyCommandWidth(1) : 0;
    rect.y = this.partyCommand_YPosition(0);
  } else if (params.PartyCommandPosition === 'custom') {
    rect.width = this.partyCommandWidth(1);
    rect.x = this.getPartyCommandX();
    rect.y = this.partyCommand_YPosition(10);
  } else if (params.PartyCommandPosition === 'top') {
    rect.width = this.partyCommandWidth(0);
    rect.x = this.getPartyCommandX();
    rect.y = this.partyCommand_YPosition(1);
  } else if (params.PartyCommandPosition === 'middle') {
    rect.width = this.partyCommandWidth(0);
    rect.x = this.getPartyCommandX();
    rect.y = this.partyCommand_YPosition(2);
  } else if (params.PartyCommandPosition === 'under') {
    rect.width = this.partyCommandWidth(0);
    rect.x = this.getPartyCommandX();
    rect.y = this.partyCommand_YPosition(3);
  }
  rect.height = this.partyWindowAreaHeight();
  return rect;
};

Scene_Battle.prototype.statusWindowRect = function() {
    let ww = this.getActorWindowWidth();
    let wh = this.getActorWindowHeight();
    let wx = this.getActorWindowX() + (this.isRightInputMode() ? 0 : Graphics.boxWidth - ww);
    let wy = this.getActorWindowY();
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.setBackgroundWindow = function(background, x, y) {
  const bitmap = ImageManager.nuun_LoadPictures(background);
  const sprite =  new Sprite(bitmap);
  this._itemBSBackgorundWindow.addChild(sprite);
  sprite.x = x;
  sprite.y = y;
  return sprite;
};

const _Scene_Battle_updateStatusWindowPosition = Scene_Battle.prototype.updateStatusWindowPosition;
Scene_Battle.prototype.updateStatusWindowPosition = function() {
    if (!params.ActorStatusWindowLock) {
        const statusWindowX = this._statusWindow.x;
        const targetX = this.statusWindowX();
        const battleEffects = this._battleEffects;
        _Scene_Battle_updateStatusWindowPosition.call(this);
        if (statusWindowX < targetX) {
            if (!$gameSystem.isSideView() && battleEffects) {
                battleEffects.x = Math.min(battleEffects.x + 16, targetX);
            }
            this._actorImges.x = Math.min(this._actorImges.x + 16, targetX);
            this._actorStatus.x = Math.min(this._actorStatus.x + 16, targetX);
            if (this._backgroundWindow) {
              this._backgroundWindow.x = this._statusWindow.x + params.WindowBackground_X;
            }
        }
        if (statusWindowX > targetX) {
            if (!$gameSystem.isSideView() && battleEffects) {
                battleEffects.x = Math.max(battleEffects.x - 16, targetX);
            }
            this._actorImges.x = Math.max(this._actorImges.x - 16, targetX);
            this._actorStatus.x = Math.max(this._actorStatus.x - 16, targetX);
            if (this._backgroundWindow) {
              this._backgroundWindow.x = this._statusWindow.x + params.WindowBackground_X;
            }
        }
    }
};

const _Scene_Battle_update  = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
  _Scene_Battle_update.call(this);
  if (this._statusWindow.isCommandRefresh() && !$gameTemp.isBattleRefreshRequested() && this._actorCommandWindow.actor()) {
    this._statusWindow.commandRefresh(false);
    const index = $gameParty.battleMembers().indexOf(this._actorCommandWindow.actor());
    if (index >= 0) {
      this._statusWindow.select(index);
    } else {
      this.commandCancel();
    }
    this._actorCommandWindow.refresh();
  }
  if (params.ActorCommandBackgroundImg) {
    this._actorCommandBackgroundWindow.x = params.ActorBackground_X + this._actorCommandWindow.x + (Graphics.width - Graphics.boxWidth) / 2;
    this._actorCommandBackgroundWindow.y = params.ActorBackground_Y + this._actorCommandWindow.y + (Graphics.height - Graphics.boxHeight) / 2;
    this._actorCommandBackgroundWindow.visible = this._actorCommandWindow.visible && this._actorCommandWindow.active && this._actorCommandWindow.openness > 0;
  }
  if (this._partyCommandBackgroundWindow) {
    this._partyCommandBackgroundWindow.visible = this._partyCommandWindow.visible && this._partyCommandWindow.active;
  }
  this._enemyWindow.bsUpdateBackground();
  this._itemWindow.bsUpdateBackground();
  this._skillWindow.bsUpdateBackground();
  this._helpWindow.bsUpdateBackground();
  this.bsMessageBackground();
  this.actorStatusWindowOpacity();
};

Scene_Battle.prototype.bsMessageBackground = function() {
  if (BattleManager.getDisplayMessageType() === "Appear" && params.AppearBackgroundImg) {
    this._messageBackground.bitmap = ImageManager.nuun_LoadPictures(params.AppearBackgroundImg);
    this._messageBackground.x = this._messageWindow.x + params.AppearBackground_X + (Graphics.width - Graphics.boxWidth) / 2;
    this._messageBackground.y = this._messageWindow.y + params.AppearBackground_Y + (Graphics.height - Graphics.boxHeight) / 2;
  } else if (BattleManager.getDisplayMessageType() === "Victory" && params.VictoryBackgroundImg) {
    this._messageBackground.bitmap = ImageManager.nuun_LoadPictures(params.VictoryBackgroundImg);
    this._messageBackground.x = this._messageWindow.x + params.VictoryBackground_X + (Graphics.width - Graphics.boxWidth) / 2;
    this._messageBackground.y = this._messageWindow.y + params.VictoryBackground_Y + (Graphics.height - Graphics.boxHeight) / 2;
  } else if (BattleManager.getDisplayMessageType() === "Defeat" && params.LoseBackgroundImg) {
    this._messageBackground.bitmap = ImageManager.nuun_LoadPictures(params.LoseBackgroundImg);
    this._messageBackground.x = this._messageWindow.x + params.LoseBackground_X + (Graphics.width - Graphics.boxWidth) / 2;
    this._messageBackground.y = this._messageWindow.y + params.LoseBackground_Y + (Graphics.height - Graphics.boxHeight) / 2;
  } else if (BattleManager.getDisplayMessageType() === "Escape" && params.EscapeBackgroundImg) {
    this._messageBackground.bitmap = ImageManager.nuun_LoadPictures(params.EscapeBackgroundImg);
    this._messageBackground.x = this._messageWindow.x + params.EscapeBackground_X + (Graphics.width - Graphics.boxWidth) / 2;
    this._messageBackground.y = this._messageWindow.y + params.EscapeBackground_Y + (Graphics.height - Graphics.boxHeight) / 2;
  } else if (BattleManager.getDisplayMessageType() === "EscapeFailure" && params.EscapeFailureBackgroundImg) {
    this._messageBackground.bitmap = ImageManager.nuun_LoadPictures(params.EscapeFailureBackgroundImg);
    this._messageBackground.x = this._messageWindow.x + params.EscapeFailureBackground_X + (Graphics.width - Graphics.boxWidth) / 2;
    this._messageBackground.y = this._messageWindow.y + params.EscapeFailureBackground_Y + (Graphics.height - Graphics.boxHeight) / 2;
  } else {
    this._messageBackground.bitmap = null;
    this._messageBackground.x = this._messageWindow.x;
    this._messageBackground.y = this._messageWindow.y;
  }
};

Scene_Battle.prototype.actorStatusWindowOpacity = function() {
  if (BattleManager.actorStatusWindowOpacity) {
    this.setActorStatusWindowOpacity(BattleManager.actorStatusWindowOpacityValue);
  } else if (this._skillWindow.active) {
    this.setActorStatusWindowOpacity(params.SkillWindowOpacity);
  } else if (this._itemWindow.active) {
    this.setActorStatusWindowOpacity(params.ItemWindowOpacity);
  } else if (this._enemyWindow.active) {
    this.setActorStatusWindowOpacity(params.EnemyWindowOpacity);
  } else if ($gameMessage.isBusy() && BattleManager.getDisplayMessageType() === "Appear" && $gameMessage.positionType() === 2) {
    this.setActorStatusWindowOpacity(params.AppearWindowOpacity);
  } else if ($gameMessage.isBusy() && BattleManager.getDisplayMessageType() === "Victory" && $gameMessage.positionType() === 2) {
    this.setActorStatusWindowOpacity(params.VictoryWindowOpacity);
  } else if ($gameMessage.isBusy() && BattleManager.getDisplayMessageType() === "Defeat" && $gameMessage.positionType() === 2) {
    this.setActorStatusWindowOpacity(params.LoseWindowOpacity);
  } else if ($gameMessage.isBusy() && BattleManager.getDisplayMessageType() === "Escape" && $gameMessage.positionType() === 2) {
    this.setActorStatusWindowOpacity(params.EscapeWindowOpacity);
  } else if ($gameMessage.isBusy() && BattleManager.getDisplayMessageType() === "EscapeFailure" && $gameMessage.positionType() === 2) {
    this.setActorStatusWindowOpacity(params.EscapeWindowOpacity);
  } else if ($gameMessage.isBusy() && $gameMessage.positionType() === 2) {
    this.setActorStatusWindowOpacity(params.MessageWindowOpacity);
  } else {
    this.setActorStatusWindowOpacity(255);
    if (!$gameMessage.isBusy()) {
      BattleManager.displayMessageType(null);
    }
  }
};

Scene_Battle.prototype.setActorStatusWindowOpacity = function(opacity) {
  this._battleHudBack.opacity = opacity;
  this._battleHudFront.opacity = opacity;
};

Scene_Battle.prototype.statusWindowX = function() {//再定義
    if (this.isAnyInputWindowActive()) {
        return this.statusWindowRect().x;
    } else {
        return this._partyCommandWindow.width / 2;
    }
};

Scene_Battle.prototype.getActorWindowX = function() {
    if (params.ActorStatusWindowCenter) {
        return getActorWindowCenter() + params.ActorStatusWindow_X;
    } else {
        return params.ActorStatusWindow_X;
    }
};

Scene_Battle.prototype.getActorWindowY = function() {
    if (params.ActorStatusWindowPosition === 'ui_under') {
        return Graphics.boxHeight - this.getActorWindowHeight() + 6 + params.ActorStatusWindow_Y + (Graphics.height - Graphics.boxHeight) / 2 + (params.WindowFrameShow ? -6 : 0);
    } else if (params.ActorStatusWindowPosition === 'under') {
        return Graphics.height - this.getActorWindowHeight() + params.ActorStatusWindow_Y + (params.WindowFrameShow ? -6 : 0);
    } else {
        return params.ActorStatusWindow_Y;
    }
};

Scene_Battle.prototype.setStatusWindow_Sprite = function() {
    statusData = this._statusWindow;
};

Scene_Battle.prototype.MessageWindowBackGround = function() {
  this._messageBackground = this.setBackgroundWindow(null, 0, 0);
};

Scene_Battle.prototype.getActorWindowWidth = function() {
  return (params.ActorStatusWindow_Width > 0 ? params.ActorStatusWindow_Width : Graphics.boxWidth) - (params.WidthWithCommand ? this.partyCommandWidth() : 0);
};

Scene_Battle.prototype.getActorWindowHeight = function() {
    return params.ActorStatusWindow_Height > 0 ? params.ActorStatusWindow_Height : this.windowAreaHeight() + (params.WindowFrameShow ? 0 : 10);
};

Scene_Battle.prototype.getPartyCommandX = function() {
  return params.PartyCommand_X + (params.PartyCommandWindowCenter ? this.partyCommandCenter() : 0);
};

Scene_Battle.prototype.partyCommandCenter = function() {
  return (Graphics.boxWidth - this.partyCommandWidth(0)) / 2;
};

Scene_Battle.prototype.partyCommand_YPosition = function(mode) {
  if (mode === 0) {//デフォルト
    return this._statusWindow.y + (Graphics.boxHeight - Graphics.height) / 2 + (params.WindowFrameShow ? 0 : 4);
  } else if (mode === 10) {//カスタム
    return params.PartyCommand_Y;
  } else if (mode === 1) {//上部
    return params.PartyCommand_Y + (Graphics.boxHeight - Graphics.height) / 2 + 4;
  } else if (mode === 2) {//中間
    return this._statusWindow.y / 2 - (this.partyWindowAreaHeight() / 2) + (Graphics.boxHeight - Graphics.height) / 2 + params.PartyCommand_Y;
  } else if (mode === 3) {//アクターステータス上
    return this._statusWindow.y - this.partyWindowAreaHeight() + (Graphics.boxHeight - Graphics.height) / 2 + params.PartyCommand_Y;
  }
};

Scene_Battle.prototype.partyCommandWidth = function(mode) {
  return params.PartyCommand_Width > 0 ? Math.min(params.PartyCommand_Width, Graphics.width) : (mode === 0 ? Graphics.boxWidth : 192);
};

Scene_Battle.prototype.partyWindowAreaHeight = function() {
  return this.calcWindowHeight(params.PartyCommandMaxRow, true);
};

const _Scene_Battle_startActorSelection = Scene_Battle.prototype.startActorSelection;
Scene_Battle.prototype.startActorSelection = function() {
  _Scene_Battle_startActorSelection.call(this);
  this._skillWindow.hide();
  this._itemWindow.hide();
  this._statusWindow.deselect();
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
  $gameTemp.onBSAction = false;
  switch (this._actorCommandWindow.currentSymbol()) {
    case "attack":
    case "special":
      this._actorCommandWindow.show();
      break;
  }
};

const _Scene_Battle_onActorCancel = Scene_Battle.prototype.onActorCancel;
Scene_Battle.prototype.onActorCancel = function() {
  _Scene_Battle_onActorCancel.call(this);
  $gameTemp.onBSAction = false;
};

const _Scene_Battle_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
Scene_Battle.prototype.startPartyCommandSelection = function() {
  _Scene_Battle_startPartyCommandSelection.call(this);
  $gameTemp.onBSAction = false;
};

const _Scene_Battle_selectPreviousCommand = Scene_Battle.prototype.selectPreviousCommand;
Scene_Battle.prototype.selectPreviousCommand = function() {
  _Scene_Battle_selectPreviousCommand.call(this);
  $gameTemp.onBSAction = false;
  this._partyCommandWindow.show();
};

const _Scene_Battle_onSelectAction = Scene_Battle.prototype.onSelectAction;
Scene_Battle.prototype.onSelectAction = function() {
  $gameTemp.onBSAction = BattleManager.isTpb();
  _Scene_Battle_onSelectAction.call(this);
};

const _Scene_Battle_endCommandSelection = Scene_Battle.prototype.endCommandSelection;
Scene_Battle.prototype.endCommandSelection = function() {
  _Scene_Battle_endCommandSelection.call(this);
  $gameTemp.onBSAction = false;
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

//Window_Base
Window_Base.prototype.setBSBackground = function(background) {
  this._bsBackground = background;
};

Window_Base.prototype.bsUpdateBackground = function() {
  if (this._bsBackground) {
    this._bsBackground.visible = this.visible;
  }
};

//Window_PartyCommand
const _Window_PartyCommand_initialize = Window_PartyCommand.prototype.initialize;
Window_PartyCommand.prototype.initialize = function(rect) {
  _Window_PartyCommand_initialize.call(this, rect);
  this.windowColor = null;
  this.opacity = params.PartyCommandWindowShow ? 255 : 0;
};

Window_PartyCommand.prototype.loadWindowskin = function() {
  if (params.PartyCommandWindowSkin) {
    this.windowskin = ImageManager.loadSystem(params.PartyCommandWindowSkin);
    this.windowColor = params.ActorStatusWindowColor;
  } else {
    Window_Base.prototype.loadWindowskin.call(this);
  }
};

Window_PartyCommand.prototype.updateTone = function() {
  if (params.PartyCommandWindowColor) {
    const tone = params.PartyCommandWindowColor;
    this.setTone(tone.red, tone.green, tone.bule);
  } else {
    Window_Base.prototype.updateTone.call(this);
  }
};

Window_PartyCommand.prototype.maxCols = function() {;
  return params.PartyCommandMode ? params.PartyCommandMaxCol : Math.min((this._list ? this.maxItems() : params.PartyCommandMaxCol), params.PartyCommandMaxCol);
};

const _Window_PartyCommand_itemRect = Window_PartyCommand.prototype.itemRect;
Window_PartyCommand.prototype.itemRect = function(index) {
  const rect = _Window_PartyCommand_itemRect.call(this, index);
  if (params.PartyCommandMode) {
    rect.x += this.itemWidth() / 2 * (this.maxCols() - Math.min(this.maxItems(), this.maxCols()));
  }
  return rect;
};

const _Window_PartyCommand_setup = Window_PartyCommand.prototype.setup;
Window_PartyCommand.prototype.setup = function() {
  if (!$gameTemp.onBSAction) {
    _Window_PartyCommand_setup.call(this);
  } else {
    $gameTemp.onBSAction = false;
  } 
};


//Window_ActorCommand
const _Window_ActorCommand_initialize = Window_ActorCommand.prototype.initialize;
Window_ActorCommand.prototype.initialize = function(rect) {
  _Window_ActorCommand_initialize.call(this, rect);
  this.opacity = params.ActorCommandWindowShow ? 255 : 0;
};

Window_ActorCommand.prototype.loadWindowskin = function() {
  if (params.ActorCommandWindowSkin) {
    this.windowskin = ImageManager.loadSystem(params.ActorCommandWindowSkin);
  } else {
    Window_Base.prototype.loadWindowskin.call(this);
  }
};

Window_ActorCommand.prototype.setWindowSkin = function(data) {
  if (data.WindowSkin) {
    this.windowskin = ImageManager.loadSystem(data.WindowSkin);
    this.windowColor = data.WindowColor;
  } else {
    this.loadWindowskin();
    this.windowColor = null;
  }
};

Window_ActorCommand.prototype.updateTone = function() {
  if (this.windowColor) {
    const tone = this.windowColor;
    this.setTone(tone.red, tone.green, tone.bule);
  } else {
    Window_Base.prototype.updateTone.call(this);
  }
};

Window_ActorCommand.prototype.maxCols = function() {
  return params.ActorCommandMode ? params.ActorCommandMaxCol : Math.min((this._list ? this.maxItems() : params.ActorCommandMaxCol), params.ActorCommandMaxCol);
  //return Math.min((this._list ? this.maxItems() : params.ActorCommandMaxCol), params.ActorCommandMaxCol);
};

Window_ActorCommand.prototype.setCommandHeight = function() {
  const maxCols = params.ActorCommandVariable ? Math.ceil(this.maxItems() / params.ActorCommandMaxCol) : params.ActorCommandMaxRow;
  const cols = params.ActorCommandVariable ? maxCols.clamp(params.ActorCommandMinRow, params.ActorCommandMaxRow) : maxCols;
  this.height = this.fittingHeight(cols);
};

Window_ActorCommand.prototype.selectActor = function(actor) {
  const members = $gameParty.battleMembers();
  return members.indexOf(actor);
};

const _Window_ActorCommand_itemRect = Window_ActorCommand.prototype.itemRect;
Window_ActorCommand.prototype.itemRect = function(index) {
  const rect = _Window_ActorCommand_itemRect.call(this, index);
  if (params.ActorCommandMode) {
    rect.x += this.itemWidth() / 2 * (this.maxCols() - Math.min(this.maxItems(), this.maxCols()));
  }
  return rect;
};

const _Window_ActorCommand_refresh = Window_ActorCommand.prototype.refresh;
Window_ActorCommand.prototype.refresh = function() {
    _Window_ActorCommand_refresh.call(this);
    const actorIndex = this.selectActor(this._actor);
    if (statusData && this._actor || actorIndex >= 0) {
      const data = getActorPositionData( this._actor.actorId());
      this.setWindowSkin(data);
      const rect = statusData.itemRect(actorIndex);
      this.setCommandHeight();
      if (params.ActorCommandPosition === 'actor') {
        if (Imported.NUUN_SupportActor && this._actor.getSupportActor()) {
          this.x = params.SupportActorCommand_X;
          this.y = params.SupportActorCommand_Y;
        } else {
          this.x = rect.x + statusData.itemPadding() + ((rect.width - this.width) / 2) + params.ActorCommand_X;
          this.y = this.homeY - this.height + rect.y;
        }
      } else if (params.ActorCommandPosition === 'svtop') {
        data = this.SvActorData[actorIndex];
        this.x = data.x - (this.width + data.width) / 2 + 32 + params.ActorCommand_X;
        this.y = data.y - (this.height + data.height + 48) + params.ActorCommand_Y;
      } else if (params.ActorCommandPosition === 'svleft') {
        data = this.SvActorData[actorIndex];
        this.x = data.x - this.width - 32 + params.ActorCommand_X;
        this.y = data.y - (this.height + data.height + 48) / 2 + params.ActorCommand_Y;
      } else if (params.ActorCommandPosition === 'svright') {
        data = this.SvActorData[actorIndex];
        this.x = data.x + 32 + params.ActorCommand_X;
        this.y = data.y - (this.height + data.height + 48) / 2 + params.ActorCommand_Y;
      } else if (params.ActorCommandPosition === 'top') {
        this.y = this.homeY;
      } else if (params.ActorCommandPosition === 'middle') {
        this.y = this.homeY - Math.floor(this.height / 2);
      } else {
        this.y = this.homeY - this.height;
      }
    }
};


//Window_BattleStatus
const _Window_BattleStatus_initialize = Window_BattleStatus.prototype.initialize;
Window_BattleStatus.prototype.initialize = function(rect) {
  _Window_BattleStatus_initialize.call(this, rect);
  this.frameVisible = params.WindowFrameShow;
  this.opacity = params.WindowShow ? 255 : 0;
  this._opening = true;
  this.visible = true;
  $gameTemp.actorData = null;
};

Window_BattleStatus.prototype.loadWindowskin = function() {
  if (params.ActorStatusWindowSkin) {
    this.windowskin = ImageManager.loadSystem(params.ActorStatusWindowSkin);
  } else {
    Window_Base.prototype.loadWindowskin.call(this);
  }
};

Window_BattleStatus.prototype.updateTone = function() {
  if (params.ActorStatusWindowColor) {
    const tone = params.ActorStatusWindowColor;
    this.setTone(tone.red, tone.green, tone.bule);
  } else {
    Window_Base.prototype.updateTone.call(this);
  }
};

const _Window_BattleStatus_maxCols = Window_BattleStatus.prototype.maxCols;
Window_BattleStatus.prototype.maxCols = function() {
  return params.ActorStatusVariable ? Math.min($gameParty.battleMembers().length, _Window_BattleStatus_maxCols.call(this), params.ActorMaxCol) : params.ActorMaxCol;
};

const _Window_BattleStatus_itemHeight = Window_BattleStatus.prototype.itemHeight;
Window_BattleStatus.prototype.itemHeight = function() {
  const row = params.ActorMaxRow > 0 ? params.ActorMaxRow : Math.ceil($gameParty.battleMembers().length / this.maxCols());
  return Math.floor(_Window_BattleStatus_itemHeight.call(this) / row);
};

const _Window_BattleStatus_rowSpacing = Window_BattleStatus.prototype.rowSpacing;
Window_BattleStatus.prototype.rowSpacing = function() {
  return Math.ceil($gameParty.battleMembers().length / this.maxCols()) > 1 ? 4 : _Window_BattleStatus_rowSpacing.call(this);
};

Window_BattleStatus.prototype.itemRect = function(index) {
    let rect = Window_Selectable.prototype.itemRect.call(this, index);
    rect = this.statusPosition(index, rect);
    return rect;
};

Window_BattleStatus.prototype.faceRect = function(index) {//再定義
    const rect = this.itemRect(index);
    rect.pad(-1);
    let height;
    if (params.bsMode === "Standard") {
      height = params.FaceHeight > 0 ? Math.min(params.FaceHeight, ImageManager.faceHeight) : ImageManager.faceHeight;
      rect.height = params.FaceHeightOnWindow ? Math.min(rect.height, height) : height;
      rect.x -= Math.floor((rect.width / 2) - (ImageManager.faceWidth / 2));
    } else if (params.bsMode === "Type4") {
      height = params.FaceHeight > 0 ? Math.min(params.FaceHeight, ImageManager.faceHeight) : ImageManager.faceHeight;
      rect.height = params.FaceHeightOnWindow ? Math.min(rect.height, height) : height;
    } else {
      height = params.FaceHeight > 0 ? Math.min(params.FaceHeight, ImageManager.faceHeight) : this.basicGaugesY(rect) - this.gaugeLineHeight() + this.gaugeLineHeight() / 2 - rect.y;
      rect.height = params.FaceHeightOnWindow ? Math.min(rect.height, height) : height;
    }
    rect.y += this.colSpacing();
    return rect;
};

Window_BattleStatus.prototype.preparePartyRefresh = function() {
    this.performPartyRefresh();
};

Window_BattleStatus.prototype.performPartyRefresh = function() {
    $gameTemp.setBattleStyleRefresh(true);
    this.refresh();
    this.commandRefresh(true);
};

Window_BattleStatus.prototype.commandRefresh = function(flag) {
    this._commandRefresh = flag;
};

Window_BattleStatus.prototype.isCommandRefresh = function() {
    return this._commandRefresh;
};

Window_BattleStatus.prototype.setActorWindow = function(battleActorImges, BattleActorStatus) {
    this._window_battleActorImges = battleActorImges;
    this._window_BattleActorStatus = BattleActorStatus;
};

const _Window_BattleStatus_refreshCursor = Window_BattleStatus.prototype.refreshCursor;
Window_BattleStatus.prototype.refreshCursor = function() {
  if (params.SelectBackShow) {
    _Window_BattleStatus_refreshCursor.call(this);
  } else {
    this.setCursorRect(0, 0, 0, 0);
  }
};

Window_BattleStatus.prototype.statusPosition = function(index, rect) {
    const itemWidth = this.itemWidth();
    const maxCols = Math.min(this.maxItems() - (Math.floor(index / this.maxCols()) * this.maxCols()), this.maxCols(), this.maxItems());
    if (params.ActorStatusMode === 'center') {
        rect.x += Math.floor((this.width / 2) - (itemWidth * maxCols / 2)) - this.itemPadding();
    } else if (params.ActorStatusMode === 'raigt') {
        rect.x += this.width - (maxCols * itemWidth) - this.itemPadding() * 2;
    } else if (params.ActorStatusMode === 'triangle') {
      //const topCol = this.maxItems() % maxCols;
      //console.log(topCol)
      if (index < topCol) {
        rect.x += Math.floor((this.width / 2) - (itemWidth * topCol / 2)) - this.itemPadding();
      } else {
        rect.x += Math.floor((this.width / 2) - (itemWidth * maxCols / 2)) - this.itemPadding();
      }
    } else if (params.ActorStatusMode === 'Inverted_triangle') {

    }
    return rect;
};

Window_BattleStatus.prototype.drawItem = function(index) {
  
};

Window_BattleStatus.prototype.drawItemBackground = function(index) {
  const actor = this.actor(index);
  const data = getActorPositionData(actor.actorId());
  if (data.ActorBackground) {
    const rect = this.itemRect(index);
    const bitmap = ImageManager.nuun_LoadPictures(data.ActorBackground);
    this.actorBackGround(actor, bitmap, rect.x, rect.y, rect.width, rect.height);
  } else if (params.CursorBackShow) {
    Window_Selectable.prototype.drawItemBackground.call(this, index);
  }
};

Window_BattleStatus.prototype.drawItemStatus = function(index) {//再定義
  const actor = this.actor(index);
  $gameTemp.actorData = getActorPositionData(actor.actorId());
  const statusData = $gameTemp.actorData.StatusListData;
    if (statusData && statusData.length > 0) {
      this.drawStatusListData(actor, statusData, index);
    } else { 
      const rect = this.itemRectWithPadding(index);
      const stateIconX = this.stateIconX(rect);
      const stateIconY = this.stateIconY(rect);
      if (params.StateVisible && !params.OutsideWindowVisible) {
        this.placeStateIcon(actor, stateIconX, stateIconY);
      }
      if (params.TPBShow) {
          const timeX = this.timeX(rect);
          const timeY = this.timeY(rect);
          this.placeTimeGauge(actor, timeX, timeY);
      }
      if (params.NameShow) {
          const nameX = this.nameX(rect);
          const nameY = this.nameY(rect);
          this.placeActorName(actor, nameX, nameY);
      }
      const basicGaugesX = this.basicGaugesX(rect);
      const basicGaugesY = this.basicGaugesY(rect);
      this.placeBasicGauges(actor, basicGaugesX, basicGaugesY, rect);
    }
};

Window_BattleStatus.prototype.drawStatusListData = function(actor, list, index) {
  const rect = this.itemRectWithPadding(index);
  list.forEach(data => {
    $gameTemp.userStatusParam = data;
    switch (data.Status) {
      case 'hpgauge':
        this.placeGauge(actor, "hp", rect.x + data.PositionX, rect.y + data.PositionY);
        break;
      case 'mpgauge':
        this.placeGauge(actor, "mp", rect.x + data.PositionX, rect.y + data.PositionY);
        break;
      case 'tpgauge':
        this.placeGauge(actor, "tp", rect.x + data.PositionX, rect.y + data.PositionY);
        break;
      case 'tpb':
        this.placeTimeGauge(actor, rect.x + data.PositionX, rect.y + data.PositionY);
        break;
      case 'state':
        if (!params.OutsideWindowVisible) {
          this.placeStateIcon(actor, rect.x + data.PositionX, rect.y + data.PositionY);
        }
        break;
      case 'name':
        this.placeActorName(actor, rect.x + data.PositionX, rect.y + data.PositionY);
        break;
      case 'lv':
        this.drawLevel(actor, data, rect.x + data.PositionX, rect.y + data.PositionY, Math.min(rect.width, data.Width));
        break;
      case 'param':
        this.drawUserParam(actor, data, rect.x + data.PositionX, rect.y + data.PositionY, Math.min(rect.width, data.Width));
        break;
      case 'usergauge':
        this.placeGauge(actor, data.UserParamID, rect.x + data.PositionX, rect.y + data.PositionY);
        break;
      case 'dparam':
        this.placeUserParam(actor, data.UserParamID, rect.x + data.PositionX, rect.y + data.PositionY, Math.min(rect.width, data.Width));
        break;
      default:
        break;
    }
  });
  $gameTemp.userStatusParam = null;
};

Window_BattleStatus.prototype.drawLevel = function(actor, data, x, y, width) {
  this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
  this.changeTextColor(ColorManager.systemColor());
  const nameText = data.ParamName ? data.ParamName : TextManager.levelA;
  const textWidth = this.textWidth(nameText);
  this.drawText(nameText, x, y, textWidth);
  this.resetTextColor();
  this.drawText(actor.level, x + textWidth + 8, y, width - (textWidth + 8), "right");
  this.contents.fontSize = $gameSystem.mainFontSize();
};

Window_BattleStatus.prototype.drawUserParam = function(actor, data, x, y, width) {
  this.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
  const a = actor;
  const d = actor.actor();
  const nameText = data.ParamName ? data.ParamName : '';
  const textWidth = Math.max(60 , this.textWidth(nameText));
  this.changeTextColor(ColorManager.systemColor());
  if (nameText) {
    this.drawText(nameText, x + textWidth, y, width - textWidth);
  }
  this.resetTextColor();
  if (data.DetaEval) {
      this.drawText(eval(data.DetaEval), x + textWidth + 8, y, width - (textWidth + 8), 'right');
  }
  this.contents.fontSize = $gameSystem.mainFontSize();
};

Window_BattleStatus.prototype.placeUserParam = function(actor, data, x, y) {
  const key = "actor%1-userParam%2".format(actor.actorId(), data.UserParamID || 'dparam');
  const sprite = this.createInnerSprite(key, Sprite_NuunUserParam);
  sprite.setup(actor);
  sprite.move(x, y);
  sprite.show();
};

Window_BattleStatus.prototype.placeBasicGauges = function(actor, x, y, rect) {
    let x2 = $gameTemp.actorData.HPChangePosition ? $gameTemp.actorData.ActorHP_X + rect.x : this.defaultGaugeX(x, 'hp');
    let y2 = $gameTemp.actorData.HPChangePosition ? $gameTemp.actorData.ActorHP_Y + rect.y : this.defaultGaugeY(y, 'hp');
    this.placeGauge(actor, "hp", x2, y2);
    x2 = $gameTemp.actorData.MPChangePosition ? $gameTemp.actorData.ActorMP_X + rect.x : this.defaultGaugeX(x, 'mp');
    y2 = $gameTemp.actorData.MPChangePosition ? $gameTemp.actorData.ActorMP_Y + rect.y : this.defaultGaugeY(y, 'mp');
    this.placeGauge(actor, "mp", x2, y2);
    if ($dataSystem.optDisplayTp) {
        x2 = $gameTemp.actorData.TPChangePosition ? $gameTemp.actorData.ActorTP_X + rect.x : this.defaultGaugeX(x, 'tp');
        y2 = $gameTemp.actorData.TPChangePosition ? $gameTemp.actorData.ActorTP_Y + rect.y : this.defaultGaugeY(y, 'tp');
        this.placeGauge(actor, "tp", x2, y2);
    }
};

Window_BattleStatus.prototype.defaultGaugeX = function(x, type) {
  switch (type) {
    case 'hp':
      return params.bsMode === 'Standard' ? x : x;
    case 'mp':
      return params.bsMode === 'Standard' ? x + 134: x;
    case 'tp':
      return params.bsMode === 'Standard' ? x + 268: x;
    case 'time':
      return 
  }
};

Window_BattleStatus.prototype.defaultGaugeY = function(y, type) {
  switch (type) {
    case 'hp':
      return params.bsMode === 'Standard' ? y : y;
    case 'mp':
      return params.bsMode === 'Standard' ? y : y + this.gaugeLineHeight();
    case 'tp':
      return params.bsMode === 'Standard' ? y : y + this.gaugeLineHeight() * 2;
    case 'time':
      return params.bsMode === 'Standard' ? y : y;
  }
};

Window_BattleStatus.prototype.placeGauge = function(actor, type, x, y) {
  $gameTemp.bsGaugeType = type;
  if (Imported.NUUN_GaugeImage) {
    this.placeGaugeImg(actor, type, x, y);
  }
  const key = "actor%1-gauge-%2".format(actor.actorId(), type);
  const sprite = this.createInnerSprite(key, Sprite_BSGauge);
  sprite.setup(actor, type);
  sprite.move(x, y);
  sprite.show();
};

const _Window_BattleStatus_nameX = Window_BattleStatus.prototype.nameX;
Window_BattleStatus.prototype.nameX = function(rect) {
  if (params.bsMode === 'Standard') {
    return $gameTemp.actorData.NameChangePosition ? $gameTemp.actorData.ActorName_X + rect.x : rect.x;
  } else {
    return $gameTemp.actorData.NameChangePosition ? $gameTemp.actorData.ActorName_X + rect.x : _Window_BattleStatus_nameX.call(this, rect);
  }
};

const _Window_BattleStatus_nameY = Window_BattleStatus.prototype.nameY;
Window_BattleStatus.prototype.nameY = function(rect) {
  if (params.bsMode === 'Standard') {
    return $gameTemp.actorData.NameChangePosition ? $gameTemp.actorData.ActorName_Y + rect.y : rect.y + 10;
  } else {
    return $gameTemp.actorData.NameChangePosition ? $gameTemp.actorData.ActorName_Y + rect.y : _Window_BattleStatus_nameY.call(this, rect);;
  }
};

const _Window_BattleStatus_basicGaugesX = Window_BattleStatus.prototype.basicGaugesX;
Window_BattleStatus.prototype.basicGaugesX = function(rect) {
  if (params.bsMode === 'Standard') {
    return rect.x + 180;
  } else {
    return _Window_BattleStatus_basicGaugesX.call(this, rect);
  }
};

const _Window_BattleStatus_basicGaugesY = Window_BattleStatus.prototype.basicGaugesY;
Window_BattleStatus.prototype.basicGaugesY = function(rect) {
  if (params.bsMode === 'Standard') {
    return rect.y + 8;
  } else {
    return _Window_BattleStatus_basicGaugesY.call(this, rect);
  }
};

const _Window_BattleStatus_stateIconX = Window_BattleStatus.prototype.stateIconX;
Window_BattleStatus.prototype.stateIconX = function(rect) {
  if (params.bsMode === 'Standard') {
    return $gameTemp.actorData.StateChangePosition ? $gameTemp.actorData.ActorState_X + rect.x : rect.x + 156;
  } else {
    return $gameTemp.actorData.StateChangePosition ? $gameTemp.actorData.ActorState_X + rect.x : _Window_BattleStatus_stateIconX.call(this, rect);
  }
};

const _Window_BattleStatus_stateIconY = Window_BattleStatus.prototype.stateIconY;
Window_BattleStatus.prototype.stateIconY = function(rect) {
  if (params.bsMode === 'Standard') {
    return $gameTemp.actorData.StateChangePosition ? $gameTemp.actorData.ActorState_Y + rect.y : rect.y + 22;
  } else {
    return $gameTemp.actorData.StateChangePosition ? $gameTemp.actorData.ActorState_Y + rect.y : _Window_BattleStatus_stateIconY.call(this, rect);
  }
};

Window_BattleStatus.prototype.timeX = function(rect) {
  if (params.bsMode === 'Standard') {
    return $gameTemp.actorData.TPBChangePosition ? $gameTemp.actorData.ActorTPB_X + rect.x : rect.x;
  } else {
    return $gameTemp.actorData.TPBChangePosition ? $gameTemp.actorData.ActorTPB_X + rect.x : rect.x;
  }
};

Window_BattleStatus.prototype.timeY = function(rect) {
  if (params.bsMode === 'Standard') {
    return $gameTemp.actorData.TPBChangePosition ? $gameTemp.actorData.ActorTPB_Y + rect.y : rect.y + 12;
  } else {
    return $gameTemp.actorData.TPBChangePosition ? $gameTemp.actorData.ActorTPB_Y + rect.y : this.basicGaugesY(rect) - this.gaugeLineHeight();
  }
};

Window_BattleStatus.prototype.actorBackGround = function(actor, bitmap, x, y, width, height) {
  this.contentsBack.blt(bitmap, 0, 0, width, height, x, y);
};

Window_BattleStatus.prototype.open = function() {
    Window_Base.prototype.open.call(this);
    if (this._window_battleActorImges) {
        this._window_battleActorImges.open();
        this._window_BattleActorStatus.open();
    }
};
  
Window_BattleStatus.prototype.close = function() {
    Window_Base.prototype.close.call(this);
    if (this._window_battleActorImges) {
        this._window_battleActorImges.close();
        this._window_BattleActorStatus.close();
    }
};

const _Window_BattleStatus_show = Window_BattleStatus.prototype.show;
  Window_BattleStatus.prototype.show = function() {
    _Window_BattleStatus_show.call(this);
    if (this._window_battleActorImges) {
      this._window_battleActorImges.show();
      this._window_BattleActorStatus.show();
    }
};

const _Window_BattleStatus_hide = Window_BattleStatus.prototype.hide;
Window_BattleStatus.prototype.hide = function() {
    _Window_BattleStatus_hide.call(this);
    if (this._window_battleActorImges) {
      this._window_battleActorImges.hide();
      this._window_BattleActorStatus.hide();
    }
};

//Window_BattleActorImges
function Window_BattleActorImges() {
    this.initialize(...arguments);
}
  
Window_BattleActorImges.prototype = Object.create(Window_BattleStatus.prototype);
Window_BattleActorImges.prototype.constructor = Window_BattleActorImges;

Window_BattleActorImges.prototype.initialize = function(rect) {
    Window_StatusBase.prototype.initialize.call(this, rect);
    this.openness = 0;
    this.opacity = 0;
    this._opening = true;
    this.visible = true;
    this._bitmapsReady = 0;
    this.setActorBaseSprite();
    this.preparePartyRefresh();  
};

Window_BattleActorImges.prototype.setActorBaseSprite = function() {
  const sprite = new Sprite();
  this._actorImgBaseSprite = sprite;
  this.addChild(sprite);
  sprite.hide();
};

Window_BattleActorImges.prototype.drawItem = function(index) {
  this.drawItemImage(index);
  this.drawStatusBack(index);
};

Window_BattleActorImges.prototype.drawStatusBack = function(index) {
  if (this._bitmapsReady >= $gameParty.members().length) {
    const actor = this.actor(index);
    const data = getActorPositionData(actor.actorId());
    if (data.ActorFrontBackground) {
      const rect = this.itemRect(index);
      const bitmap = ImageManager.nuun_LoadPictures(data.ActorFrontBackground);
      this.actorFrontBackGround(actor, bitmap, rect.x, rect.y, rect.width, rect.height);
    }
  }
};

Window_BattleActorImges.prototype.actorFrontBackGround = function(actor, bitmap, x, y, width, height) {
  const key = "actor%1-Frontback-%2".format(actor.actorId());
  const sprite = this.createActorImgSprite(key, Sprite);
  sprite.bitmap = bitmap;
  sprite.move(x + this.colSpacing(), y + 8);
  sprite.width = width;
  sprite.height = height;
  sprite.show();
};

Window_BattleActorImges.prototype.drawItemBackground = function(index) {

};

Window_BattleActorImges.prototype.preparePartyRefresh = function() {
  this._bitmapsReady = 0;
  this.actorMainSprite = [];
  let bitmap = null;
  for (const actor of $gameParty.members()) {
    actor.battleStyleImgRefresh();
    bitmap = actor.getLoadBattleStyleImg();
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
      this.refresh();
  }
};

Window_BattleActorImges.prototype.drawItemImage = function(index) {
  const actor = this.actor(index);
  if (actor.bsImgMode !== 'none' && actor.faceMode) {
    this.drawItemFace(index, actor);
  } else if (actor.bsImgMode !== 'none') {
    this.drawItemButler(index, actor);
  }
  if ($gameTemp.actorData && params.StateVisible && params.OutsideWindowVisible) {
    const rect = this.itemRectWithPadding(index);
    const statusData = $gameTemp.actorData.StatusListData;
    if (statusData) {
      const find = statusData.find(data => data.Status === 'state');
      if (find) {
        this.placeStateIcon(actor, rect.x + find.PositionX, rect.y + find.PositionY);
      }
    } else {
      const stateIconX = this.stateIconX(rect);
      const stateIconY = this.stateIconY(rect);
      this.placeStateIcon(actor, stateIconX, stateIconY);
    }
  }
};

Window_BattleActorImges.prototype.drawItemButler = function(index, actor) {
  const bitmap = this.actorMainSprite[index];
  const actorId = actor.actorId();
  const positionData = getActorPositionData(actorId);
  const actorImgData = getActorImgData(actorId);
  const rect = this.itemRect(index);
  let stateSprite = null;
  if (bitmap) {
    const key = "actor%1-BSImg".format(actor.actorId());
    const sprite = this.createActorImgSprite(key, Sprite_ActorImges);
    const imgIndex = actor.getBSImgIndex();
    if (!sprite._stateSprite && getStateAnimationShow()) {
      stateSprite = new Sprite_StateOverlay();
      this.addChild(stateSprite);
    }
    sprite.setup(actor, actorImgData, imgIndex, stateSprite);
    const x = rect.x + (actorImgData.ActorImgHPosition === 'center' ? Math.floor(this.itemWidth() / 2) + 4 : 4) + (positionData.ImgChangePosition ? positionData.ActorImg_X : 0) + (actorImgData ? actorImgData.Actor_X : 0);
    //const x = rect.x + (positionData.ImgChangePosition ? positionData.ActorImg_X : Math.floor(this.itemWidth() / 2) + 4) + (actorImgData ? actorImgData.Actor_X : 0);
    const y = rect.y + (actorImgData.ActorImgVPosition === 'under' ? this.height : 0) + (positionData.ImgChangePosition ? positionData.ActorImg_Y : 0) + this.itemPadding() + (actorImgData ? actorImgData.Actor_Y : 0);
    const scale = actorImgData.Actor_Scale / 100;
    sprite.scale.x = scale;
    sprite.scale.y = scale;
    sprite._rectWidth = bitmap.width;
    sprite._rectHeight = bitmap.height;
    sprite.setHome(x, y);
    sprite.show();
    if (params.Img_SW > 0 || params.Img_SH > 0) {
      const oriScale = 1 / scale;
      const sw = (params.Img_SW || Infinity) * oriScale;
      const sh = (params.Img_SH || Infinity) * oriScale;
      const sx = (actorImgData.Img_SX || 0) * oriScale + (actorImgData.ActorImgHPosition === 'center' ? (bitmap.width - sw) / 2 : 0);
      const sy = (actorImgData.Img_SY || 0) * oriScale;
      sprite.setFrame(sx, sy, sw, sh);
    }
    BattleManager.battlerSprite[index] = sprite;
  }
};

Window_BattleActorImges.prototype.drawItemFace = function(index, actor) {
  const actorId = actor.actorId();
  const positionData = getActorPositionData(actorId);
  const actorImgData = getActorImgData(actorId);
  const rect = this.faceRect(index);
  let stateSprite = null;
  let width = rect.width || ImageManager.faceWidth;
  let height = rect.height || ImageManager.faceHeight;
  const key = "actor%1-BSImg".format(actor.actorId());
  const sprite = this.createActorImgSprite(key, Sprite_ActorImges);
  const imgIndex = actor.getBSImgIndex();
  if (!sprite._stateSprite && getStateAnimationShow()) {
    stateSprite = new Sprite_StateOverlay();
    this.addChild(stateSprite);
  }
  sprite.setup(actor, actorImgData, imgIndex, stateSprite);
  const scale = actorImgData.Actor_Scale / 100;
  sprite.scale.x = scale;
  sprite.scale.y = scale;
  const pw = ImageManager.faceWidth;
  const ph = ImageManager.faceHeight;
  const sw = Math.min(width, pw);
  const sh = Math.min(height, ph);
  const x = rect.x + (actorImgData.ActorImgHPosition === 'center' ? Math.floor(this.itemWidth() / 2) + 4 : 4) + (positionData.ImgChangePosition ? positionData.ActorImg_X : 0) + (actorImgData ? actorImgData.Actor_X : 0);
  //const x = rect.x + (positionData.ImgChangePosition ? positionData.ActorImg_X : Math.floor(this.itemWidth() / 2) + 4) + (actorImgData ? actorImgData.Actor_X : 0);
  const y = rect.y + (actorImgData.ActorImgVPosition === 'under' ? sh : 0) + (positionData.ImgChangePosition ? positionData.ActorImg_Y : 0) + (actorImgData ? actorImgData.Actor_Y : 0);
  sprite.setHome(x, y);
  const sx = Math.floor((imgIndex % 4) * pw + (pw - sw) / 2);
  const sy = Math.floor(Math.floor(imgIndex / 4) * ph + (ph - sh) / 2);
  sprite.setFrame(sx, sy, sw, sh);
  sprite._rectWidth = rect.width;
  sprite._rectHeight = rect.height;
  sprite.show();
  BattleManager.battlerSprite[index] = sprite;
};

Window_BattleActorImges.prototype.placeStateIcon = function(actor, x, y) {
  const key = "actor%1-stateIcon".format(actor.actorId());
  const sprite = this.createActorImgSprite(key, Sprite_StateIcon);
  sprite.setup(actor);
  sprite.move(x, y);
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
Window_BattleActorStatus.prototype.constructor = Window_BattleActorStatus;

Window_BattleActorStatus.prototype.initialize = function(rect) {
    Window_StatusBase.prototype.initialize.call(this, rect);
    this.openness = 0;
    this.opacity = 0;
    this._opening = true;
    this.visible = true;
    this.preparePartyRefresh();
};

Window_BattleActorStatus.prototype.preparePartyRefresh = function() {
    $gameTemp.clearBattleRefreshRequest();
    this.performPartyRefresh();
};

Window_BattleActorStatus.prototype.performPartyRefresh = function() {
    this.refresh();
};

Window_BattleActorStatus.prototype.drawItemBackground = function(index) {

};

Window_BattleActorStatus.prototype.drawItem = function(index) {
    this.drawItemStatus(index);
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

const _Window_BattleActor_refreshCursor = Window_BattleActor.prototype.refreshCursor;
Window_BattleActor.prototype.refreshCursor = function() {
  if (params.ActorSelectBackShow) {
    _Window_BattleActor_refreshCursor.call(this);
  } else {
    this.setCursorRect(0, 0, 0, 0);
  }
};

//Window_BattleEnemy
const _Window_BattleEnemy_initialize = Window_BattleEnemy.prototype.initialize;
Window_BattleEnemy.prototype.initialize = function(rect) {
  _Window_BattleEnemy_initialize.call(this, rect);
  this._bsBackground = null;
  this.opacity = params.EnemyWindowShow ? 255 : 0;
};

Window_BattleEnemy.prototype.maxCols = function() {
  return params.EnemyMaxCol;
};

//Window_BattleSkill
const _Window_BattleSkill_initialize = Window_BattleSkill.prototype.initialize;
Window_BattleSkill.prototype.initialize = function(rect) {
  _Window_BattleSkill_initialize.call(this, rect);
  this._bsBackground = null;
  this.opacity = params.SkillWindowShow ? 255 : 0;
};

//Window_BattleItem
const _Window_BattleItem_initialize =Window_BattleItem.prototype.initialize;
Window_BattleItem.prototype.initialize = function(rect) {
  _Window_BattleItem_initialize.call(this, rect);
  this._bsBackground = null;
  this.opacity = params.ItemWindowShow ? 255 : 0;
};

//Window_Help
const _Window_Help_initialize = Window_Help.prototype.initialize;
Window_Help.prototype.initialize = function(rect) {
  _Window_Help_initialize.call(this, rect);
  this._bsBackground = null;
  this.opacity = params.HelpWindowShow ? 255 : 0;
};

//Window_BattleLog
const _Window_BattleLog_showEnemyAttackAnimation = Window_BattleLog.prototype.showEnemyAttackAnimation;
  Window_BattleLog.prototype.showEnemyAttackAnimation = function(subject, targets) {
    const id = subject.attackAnimation();
    if (id > 0) {
      this.showNormalAnimation(targets, id, false);
    } else {
      _Window_BattleLog_showEnemyAttackAnimation.call(this);
    }
};

//Window_Message
const _Window_Message_updateBackground = Window_Message.prototype.updateBackground;
Window_Message.prototype.updateBackground = function() {
  _Window_Message_updateBackground.call(this);
  if (BattleManager.getDisplayMessageType() === "Appear" && params.AppearBackgroundImg) {
    this.opacity = 0;
  } else if (BattleManager.getDisplayMessageType() === "Victory" && params.VictoryBackgroundImg) {
    this.opacity = 0;
  } else if (BattleManager.getDisplayMessageType() === "Defeat" && params.LoseBackgroundImg) {
    this.opacity = 0;
  } else if (BattleManager.getDisplayMessageType() === "Escape" && params.EscapeBackgroundImg) {
    this.opacity = 0;
  } else if (BattleManager.getDisplayMessageType() === "EscapeFailure" && params.EscapeFailureBackgroundImg) {
    this.opacity = 0;
  }
};

//Sprite_Actor
const _Sprite_Actor_initMembers = Sprite_Actor.prototype.initMembers;
  Sprite_Actor.prototype.initMembers = function() {
    _Sprite_Actor_initMembers.call(this);
    this.viewFrontActor = (!$gameSystem.isSideView() && params.ActorEffectShow);
    this.bsSprite = null;
};

const _Sprite_Actor_updateVisibility = Sprite_Actor.prototype.updateVisibility;
Sprite_Actor.prototype.updateVisibility = function() {
    _Sprite_Actor_updateVisibility.call(this);
    if (this.viewFrontActor) {
        this.visible = false;
    }
};

const _Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome;
Sprite_Actor.prototype.setActorHome = function(index) {
    if(this.viewFrontActor){
        this.actorHomeRefresh(index);
    } else {
        _Sprite_Actor_setActorHome.call(this, index);  
    }
};

Sprite_Actor.prototype.actorHomeRefresh = function(index) {
    const rect = statusData.itemRectWithPadding(index);
    let x = rect.x + Math.floor(rect.width / 2) + statusData.itemPadding();
    let y = rect.y + statusData.y + Math.floor(rect.height / 2);
    if (params.StyleMode === "Standard") {
      x -= Math.floor(ImageManager.faceWidth / 2);
    }
    this.setHome(x + params.ActorEffect_X, y + params.ActorEffect_Y);
};

const _Sprite_Actor_setBattler = Sprite_Actor.prototype.setBattler;
Sprite_Actor.prototype.setBattler = function(battler) {
  _Sprite_Actor_setBattler.call(this, battler);
  const index = battler ? battler.index() : -1;
  if (battler && battler === this._actor && this.viewFrontActor && $gameTemp.isBattleStyleRequested() && params.ActorEffectShow) {
    this.setActorHome(index);
  }
  if (battler) {
    this.bsSprite = BattleManager.battlerSprite[index];
  }
  $gameTemp.setBattleStyleRefresh(false);
};

const _Sprite_Battler_startMove = Sprite_Battler.prototype.startMove;
Sprite_Battler.prototype.startMove = function(x, y, duration) {
    if (!this.viewFrontActor) {
       _Sprite_Battler_startMove.call(this, x, y, duration);
    }
};

const _Sprite_Actor_updateMotion = Sprite_Actor.prototype.updateMotion;
Sprite_Actor.prototype.updateMotion = function() {
    if (!this.viewFrontActor) {
       _Sprite_Actor_updateMotion.call(this);
    }
};

const _Sprite_Actor_update = Sprite_Actor.prototype.update;
Sprite_Actor.prototype.update = function() {
  _Sprite_Actor_update.call(this);
  if (this._actor) {
      this.updateFrontActor();
  }
};

Sprite_Actor.prototype.updateFrontActor = function() {
    if (this.viewFrontActor && $gameTemp.isBattleStyleRequested()) {
      this.setActorHome(this._actor.index());
    }
};

const _Sprite_Actor_damageOffsetX = Sprite_Actor.prototype.damageOffsetX;
Sprite_Actor.prototype.damageOffsetX = function() {
  return (this.viewFrontActor ? Sprite_Battler.prototype.damageOffsetX.call(this) : _Sprite_Actor_damageOffsetX.call(this)) + params.ActorDamage_X;
};

const _Sprite_Actor_damageOffsetY = Sprite_Actor.prototype.damageOffsetY;
Sprite_Actor.prototype.damageOffsetY = function() {
  return (this.viewFrontActor ? 0 : 0) + _Sprite_Actor_damageOffsetY.call(this) + params.ActorDamage_Y;
};


const _Sprite_Animation_updateFlash = Sprite_Animation.prototype.updateFlash;
Sprite_Animation.prototype.updateFlash = function() {
  const t = this._targets;
  if (!$gameSystem.isSideView() && params.ActorEffectShow) {
    this._targets = this._targets.map(sprite => sprite._actor && sprite.bsSprite ? sprite.bsSprite : sprite);
  }
  _Sprite_Animation_updateFlash.call(this);
  this._targets = t;
};

const _Sprite_AnimationMV_updateFlashMV = Sprite_AnimationMV.prototype.updateFlash;
Sprite_AnimationMV.prototype.updateFlash = function() {
  const t = this._targets;
  if (!$gameSystem.isSideView() && params.ActorEffectShow) {
    this._targets = this._targets.map(sprite => sprite._actor && sprite.bsSprite ? sprite.bsSprite : sprite);
  }
  _Sprite_AnimationMV_updateFlashMV.call(this);
  this._targets = t;
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
  this._data = null;
  this._imgScenes = 'default';
  this._imgIndex = -1;
  this._selectionEffectCount = 0;
  this._shake = 0;
  this._shakePower = params.ActorShakePower;
  this._shakeSpeed = params.ActorShakeSpeed;
  this._shakeDuration = 0;
  this._shakeDirection = 1;
  this._zoomDuration = 0;
  this._zoomScale = 1;
  this._zoomScaleTarget = 1.2;
  this._updateCount = 0;
  this._imgListId = -1;
  this._durationOpacity = 0;
  this._startUpdate = true;
  this._zoomEffect = false;
};

Sprite_ActorImges.prototype.setup = function(battler, data, index, stateSprite) {
  this._battler = battler;
  this._data = data;
  this.anchor.x = data.ActorImgHPosition === 'center' ? 0.5 : 0.0 ;
  this.anchor.y = data.ActorImgVPosition === 'top' ? 0.0 : 1.0;
  this._imgIndex = index;
  battler.resetBattleStyleImgId();
  this.updateActorGraphic();
  this._stateSprite = stateSprite || this._stateSprite;
  if (this._stateSprite && getStateAnimationShow()) {
    this._stateSprite.setup(battler);
    this._stateSprite.anchor.y = 0.5;
    this._stateSprite.x = this.x + this.getStateRectX() + this.getStatePositionX();
    this._stateSprite.y = this.y + this.getStateRectY() + this.getStatePositionY();
    
  }
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
    this.updateActorGraphic();
    this.updateMotion();
    this.updateSelectionEffect();
  } else {
    this.bitmap = null;
  }
};

Sprite_ActorImges.prototype.updateMotion = function() {
  this.setupEffect();
  this.updateDamage();
  this.updateZoom()
};

Sprite_ActorImges.prototype.setupEffect = function() {
  if (params.OnActorShake && this._battler.isBSDamageEffect()) {
    this._shakeDuration = params.ActorShakeFlame;
    this._battler._onDamageEffect = false;
  }
  if (params.OnActionZoom && this._battler.isBSEffectAction()) {
    this._zoomDuration = params.ActionZoomDuration;
    this._zoomEffect = true;
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
    this.anchor.y = 0.5;
    this.anchor.x = 0.5;
    const d = this._zoomDuration;
    const t = this._zoomDuration <= params.ActionZoomDuration / 2 ? 1 : this._zoomScaleTarget;
    this._zoomScale = ((this._zoomScale * (d - 1) + t) / d);
    this._zoomDuration--;
    const scale = this._zoomScale * this._baseScale;
    this.scale.x = scale;
    this.scale.y = scale;
    if (this.x === this._homeX) {
      this.x = this._homeX + (this._data.ActorImgHPosition === 'left' ? this._rectWidth / 2 * scale : 0);
    }
    if (this.y === this._homeY) {
      this.y = this._homeY - (this._rectHeight / 2) * scale * (this._data.ActorImgVPosition === 'top' ? -1 : 1);
    }
    if (getStateAnimationShow()) {
      //this._stateSprite.x = params.ActorState_X;
      //this._stateSprite.y = params.ActorState_Y + (this._rectHeight / 2) * (this._data.ActorImgVPosition === 'top' ? -1 : 1) + this.getStatePositionY();
    }
  } else {
    if (this.scale.x !== this._baseScale) {
      this.resetZoom();
    }
    if (this._zoomEffect) {
      this._zoomEffect = false;
      this.y = this._homeY;
      this.x = this._homeX;
      this.anchor.x = this._data.ActorImgHPosition === 'left' ? 0.0 : 0.5;
      this.anchor.y = this._data.ActorImgVPosition === 'top' ? 0.0 : 1.0;
      if (getStateAnimationShow()) {
        //this._stateSprite.x = this.getStateRectX() + this.getStatePositionX();
        //this._stateSprite.y = this.getStateRectY() + this.getStatePositionY();
      }
    }
  }
};

Sprite_ActorImges.prototype.getStateRectX = function() {
  //const tag = 'BSStateA_X' + this._stateSprite._overlayIndex;
  return params.ActorState_X + this._data.ActorState_X;// + (Number(this._battler.actor().meta[tag]) || 0);
};

Sprite_ActorImges.prototype.getStateRectY = function() {
  //const tag = 'BSStateA_Y' + this._stateSprite._overlayIndex;console.log(tag)
  return params.ActorState_Y + this._data.ActorState_Y;// + (Number(this._battler.actor().meta[tag]) || 0);
};

Sprite_ActorImges.prototype.getStatePositionX = function() {
  return this._data.ActorImgHPosition === 'left' ? this.width / 2 : 0;
};

Sprite_ActorImges.prototype.getStatePositionY = function() {
  return this._data.ActorImgVPosition === 'under' ? this._rectHeight * -1 : 0;
};

Sprite_ActorImges.prototype.resetDamage = function() {
  this.x = this._homeX;
};

Sprite_ActorImges.prototype.resetZoom = function() {
  this.scale.x = this._baseScale;
  this.scale.y = this._baseScale;
};

Sprite_ActorImges.prototype.updateSelectionEffect = function() {
  if (!params.ActorFlash) {
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

Sprite_ActorImges.prototype.updateActorGraphic = function() {
  const actor = this._battler;
  if (actor) {
    if (actor.isDead() && !this.isDead()) {
      this.setDeadUpdateCount();
    } else if (actor.isAlive() && this.isDead()) {
      this.setReviveUpdateCount();
    } else if (actor.getBSImgName() && this._imgListId !== actor.getBSGraphicIndex()) {
      if (actor.onImgId === 1 || actor.onImgId === 2) {
        this._updateCount = this.setDamageDuration();
      } else if (actor.onImgId === 20) {
        this._updateCount = Infinity;
      } else {
        this._updateCount = 1;
      }
    }
  }
  this.refreshActorGraphic(actor);
  if (this._startUpdate) {
    this._startUpdate = false;
  }
};

Sprite_ActorImges.prototype.refreshActorGraphic = function(actor) {
  if (actor && actor.getBSImgName()) {
    if (this._imgListId !== actor.getBSGraphicIndex() && this._updateCount > 0) {
      const bitmap = actor.getLoadBattleStyleImg();
      if (bitmap && !bitmap.isReady()) {
        bitmap.addLoadListener(this.setActorGraphic.bind(this, actor, bitmap));
      } else if (bitmap) {
        this.setActorGraphic(actor, bitmap);
      }
      this._imgScenes = this.getImgScenes(actor);
      this._imgListId = actor.getBSGraphicIndex();
    }
  }
  this.updateAnimation();
  if (this._imgScenes === 'chant' && !actor.isChanting()) {
    actor.resetBattleStyleImgId();
  } else if (actor.isBSActionActorImg()) {
    if (!actor.isActing()) {
      actor.setBSActionActorImg(null);
      actor.resetBattleStyleImgId();
    }
  } else if (this._updateCount === 0) {
    actor.resetBattleStyleImgId();
  }
};

Sprite_ActorImges.prototype.setActorGraphic = function(actor, bitmap) {
  this.bitmap = bitmap;
  if (actor.faceMode) {
    this.faceRefresh(actor.getBSImgIndex());
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

Sprite_ActorImges.prototype.getImgScenes = function(actor) {
  return actor._imgScenes;
};

Sprite_ActorImges.prototype.faceRefresh = function(faceIndex) {
  const pw = ImageManager.faceWidth;
  const ph = ImageManager.faceHeight;
  const sw = Math.min(this._rectWidth, pw);
  const sh = Math.min(this._rectHeight, ph);
  const sx = Math.floor((faceIndex % 4) * pw + (pw - sw) / 2);
  const sy = Math.floor(Math.floor(faceIndex / 4) * ph + (ph - sh) / 2);
  this.setFrame(sx, sy, sw, sh);
  this._imgIndex = faceIndex;
};

Sprite_ActorImges.prototype.setDeadUpdateCount = function() {
  if (!params.ImgDeathHide || this.isActorGraphicDead()) {
    this._updateCount = 1;
  } else {
    this._updateCount = this.setDeadDuration();
    this._durationOpacity = 255;
  }
  this.setActorDead(true);
};

Sprite_ActorImges.prototype.setReviveUpdateCount = function(){
  this._updateCount = this.setDeadDuration();
  this._durationOpacity = -255;
  this.setActorDead(false);
};

Sprite_ActorImges.prototype.isActorGraphicDead = function() {
  return this._battler.getActorGraphicDead();
};

Sprite_ActorImges.prototype.setDeadDuration = function(){
  return this._startUpdate ? 1 : 30;
};

Sprite_ActorImges.prototype.setDamageDuration = function(){
  return params.DamageImgFrame;
};

Sprite_ActorImges.prototype.setActorDead = function(flag){
  this._isDead = flag;
};

Sprite_ActorImges.prototype.isDead = function(){
  return this._isDead;
};

//Sprite_BSGauge
function Sprite_BSGauge() {
  this.initialize(...arguments);
}

Sprite_BSGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_BSGauge.prototype.constructor = Sprite_BSGauge;

Sprite_BSGauge.prototype.initialize = function() {
  this._statusType = $gameTemp.bsGaugeType;
  this.userStatusParam = $gameTemp.userStatusParam;
  this._gaugeWidth = this.getGBSGaugeWidth();
  this._gaugeHeight = this.getGBSGaugeHeight();
  Sprite_Gauge.prototype.initialize.call(this);
};

Sprite_BSGauge.prototype.bitmapWidth = function() {
  return this._gaugeWidth;
};

Sprite_BSGauge.prototype.gaugeHeight = function() {
  return this._gaugeHeight;
};

Sprite_BSGauge.prototype.getGBSGaugeWidth = function() {
  switch (this._statusType) {
    case 'hp':
      return this.userStatusParam ? this.userStatusParam.Width : $gameTemp.actorData.HPGaugeWidth;
    case 'mp':
      return this.userStatusParam ? this.userStatusParam.Width : $gameTemp.actorData.MPGaugeWidth;
    case 'tp':
      return this.userStatusParam ? this.userStatusParam.Width : $gameTemp.actorData.TPGaugeWidth;
    case 'time':
      return this.userStatusParam ? this.userStatusParam.Width : $gameTemp.actorData.TPBGaugeWidth;
    default:
      return this.userStatusParam ? this.userStatusParam.Width : 128;
  }
};

Sprite_BSGauge.prototype.getGBSGaugeHeight = function() {
  switch (this._statusType) {
    case 'hp':
      return this.userStatusParam ? this.userStatusParam.Height : $gameTemp.actorData.HPGaugeHeight;
    case 'mp':
      return this.userStatusParam ? this.userStatusParam.Height : $gameTemp.actorData.MPGaugeHeight;
    case 'tp':
      return this.userStatusParam ? this.userStatusParam.Height : $gameTemp.actorData.TPGaugeHeight;
    case 'time':
      return this.userStatusParam ? this.userStatusParam.Height : $gameTemp.actorData.TPBGaugeHeight;
    default:
      return this.userStatusParam ? this.userStatusParam.Height : 12;
  }
};

Sprite_BSGauge.prototype.currentValue = function() {
  if (this._battler && this.userStatusParam) {
    switch (this._statusType) {
      case "hp":
      case "mp":
      case "tp":
      case "time":
        return Sprite_Gauge.prototype.currentValue.call(this);
      default:
        return eval(this.userStatusParam.DetaEval1);
    }
  } else {
    return Sprite_Gauge.prototype.currentValue.call(this);
  }
};

Sprite_BSGauge.prototype.currentMaxValue = function() {
  if (this._battler && this.userStatusParam) {
    switch (this._statusType) {
      case "hp":
      case "mp":
      case "tp":
      case "time":
        return Sprite_Gauge.prototype.currentMaxValue.call(this);
      default:
        return eval(this.userStatusParam.DetaEval2);
    }
  } else {
    return Sprite_Gauge.prototype.currentMaxValue.call(this);
  }
};

Sprite_BSGauge.prototype.label = function() {
  if (this._battler && this.userStatusParam) {
    switch (this._statusType) {
      case "hp":
      case "mp":
      case "tp":
      case "time":
        return Sprite_Gauge.prototype.label.call(this);
      default:
        return this.userStatusParam.ParamName;
  }
  } else {
    return Sprite_Gauge.prototype.label.call(this);
  }
};

Sprite_BSGauge.prototype.gaugeColor1 = function() {
  if (this._battler && this.userStatusParam) {
    switch (this._statusType) {
      case "hp":
      case "mp":
      case "tp":
      case "time":
          return Sprite_Gauge.prototype.gaugeColor1.call(this);
      default:
        return NuunManager.getColorCode(this.userStatusParam.Color1);
    }
  } else {
    return Sprite_Gauge.prototype.gaugeColor1.call(this);
  }
};

Sprite_BSGauge.prototype.gaugeColor2 = function() {
  if (this._battler && this.userStatusParam) {
    switch (this._statusType) {
      case "hp":
      case "mp":
      case "tp":
      case "time":
          return Sprite_Gauge.prototype.gaugeColor2.call(this);
      default:
        return NuunManager.getColorCode(this.userStatusParam.Color2);
    }
  } else {
    return Sprite_Gauge.prototype.gaugeColor2.call(this);
  }
};

//Sprite_NuunUserParam
function Sprite_NuunUserParam() {
  this.initialize(...arguments);
}

Sprite_NuunUserParam.prototype = Object.create(Sprite.prototype);
Sprite_NuunUserParam.prototype.constructor = Sprite_NuunUserParam;

Sprite_NuunUserParam.prototype.initialize = function() {
  Sprite.prototype.initialize.call(this);
  this.initMembers();
  this.createBitmap();
};

Sprite_NuunUserParam.prototype.initMembers = function() {
  this._battler = null;
  this._textColor = "";
  this.userStatusParam = $gameTemp.userStatusParam;
  this._gaugeWidth = this.userStatusParam.Width;
  this._gaugeHeight = this.userStatusParam.Height;
};

Sprite_NuunUserParam.prototype.setup = function(battler) {
  this._battler = battler;
  this._paramData = null;
  this.updateBitmap();
};

Sprite_NuunUserParam.prototype.destroy = function(options) {
  this.bitmap.destroy();
  Sprite.prototype.destroy.call(this, options);
};

Sprite_NuunUserParam.prototype.update = function() {
  Sprite.prototype.update.call(this);
  this.updateBitmap();
};


Sprite_NuunUserParam.prototype.createBitmap = function() {
  const width = this.bitmapWidth();
  const height = this.bitmapHeight();
  this.bitmap = new Bitmap(width, height);
};

Sprite_NuunUserParam.prototype.bitmapWidth = function() {
  return this._gaugeWidth;
};

Sprite_NuunUserParam.prototype.bitmapHeight = function() {
  return this._gaugeHeight;
};

Sprite_NuunUserParam.prototype.updateBitmap = function() {
  const _param = eval(this.userStatusParam.DetaEval1);
  if (this._paramData !== _param) {
    this._paramData = _param;
    this.redraw();
  }
};

Sprite_NuunUserParam.prototype.redraw = function() {
  const paramName = this.userStatusParam.ParamName ? this.userStatusParam.ParamName : '';
  const width = this.bitmapWidth();
  const height = this.bitmapHeight();
  this.setupFont();
  this.bitmap.clear();
  this.bitmap.textColor = ColorManager.systemColor();
  const textWidth = Math.max(60 , this.bitmap.measureTextWidth(paramName));
  this.bitmap.drawText(paramName, 0, 0, width - textWidth, height);
  this.bitmap.textColor = ColorManager.normalColor();
  this.bitmap.drawText(this._paramData, textWidth + 8, 0, width - (textWidth + 8), height, 'right');
};

Sprite_NuunUserParam.prototype.fontSize = function() {
  return $gameSystem.mainFontSize() +  (this.userStatusParam.FontSize || 0);
};

Sprite_NuunUserParam.prototype.setupFont = function() {
  this.bitmap.fontSize = this.fontSize();
};

//Spriteset_Base
const _Spriteset_Battle_makeTargetSprites = Spriteset_Battle.prototype.makeTargetSprites;
Spriteset_Battle.prototype.makeTargetSprites = function(targets) {
  const targetSprites = _Spriteset_Battle_makeTargetSprites.call(this, targets);
  if (Imported.NUUN_BSEX_Animation_KK_SSBattle) {
    this._nuun_targetSprites = targetSprites;
  }
  this._effectsContainer = this.animationTarget(targetSprites) ? this._effectsFrontContainer : this._effectsBackContainer;
  return targetSprites;
};

Spriteset_Base.prototype.animationTarget = function(targetSprites){
    if(!$gameSystem.isSideView()) {
      const target = targetSprites.find(targets => (targets.constructor === Sprite_Actor));
      return target && target.viewFrontActor ? true : false;
    }
    return false;
};
  
const _Spriteset_Base_animationShouldMirror = Spriteset_Base.prototype.animationShouldMirror;
Spriteset_Base.prototype.animationShouldMirror = function(target) {
    return params.ActorsMirror ? _Spriteset_Base_animationShouldMirror.call(this, target) : false;
};

//Spriteset_Battle
const _Spriteset_Battle_initialize = Spriteset_Battle.prototype.initialize;
Spriteset_Battle.prototype.initialize = function() {
  _Spriteset_Battle_initialize.call(this);
  
};

Spriteset_Battle.prototype.createStatusLayer = function() {
    this.createBattleHud();//ベーススプライト
    this.createHudBack();//ウィンドウ、アクターグラフィック
    if (params.EffectPriority === 'middle') {
      this.createEffects();
    }
    this.createHudStatus();//ステータス
    if (params.EffectPriority === 'top') {
      this.createEffects();
    }
    this.createFrontActors();
    
};

Spriteset_Battle.prototype.createBattleHud = function() {
    const sprite = new Sprite();
    this.addChild(sprite);
    this._battleHudBase = sprite;
};

Spriteset_Battle.prototype.createHudBack = function() {
    const sprite = new Sprite();
    this._battleHudBase.addChild(sprite);
    this._battleHudBack = sprite;
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
    const width = (params.ActorStatusWindow_Width > 0 ? params.ActorStatusWindow_Width : Graphics.boxWidth);
    const height = Graphics.boxHeight;
    const x = (params.ActorStatusWindowCenter ? getActorWindowCenter() : 0) + params.ActorStatusWindow_X;
    const y = 0;
    const sprite = new Sprite();
    sprite.setFrame(0, 0, width, height);
    sprite.x = x;
    sprite.y = y - this.battleFieldOffsetY();
    sprite.home_x = x;
    return sprite;
};

Spriteset_Battle.prototype.createFrontActors = function() {
    if (!$gameSystem.isSideView() && params.ActorEffectShow) {
      this._actorSprites = [];
      for (let i = 0; i < $gameParty.maxBattleMembers(); i++) {
        const sprite = new Sprite_Actor();
        this._actorSprites.push(sprite);
        //this._battleHudFront.addChild(sprite);
        this._battleEffects.addChild(sprite);
      }
    }
};

const _Spriteset_Battle_createBattleField = Spriteset_Battle.prototype.createBattleField;
Spriteset_Battle.prototype.createBattleField = function() {
  _Spriteset_Battle_createBattleField.call(this);
  this._effectsBackContainer = this._battleField;
};

function conditionsParam(data, param, maxParam) {
  return (param >= maxParam * data.DwLimit / 100 && (data.UpLimit > 0 ? (param <= maxParam * data.UpLimit / 100) : true));
};

})();