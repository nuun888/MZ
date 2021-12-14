/*:-----------------------------------------------------------------------------------
 * NUUN_ActorPicture.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
 /*:
 * @target MZ
 * @plugindesc 立ち絵、顔グラ表示EX
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.2.3
 * 
 * @help
 * 立ち絵、顔グラ画像を表示します。
 * 立ち絵、顔グラは条件により自動的に変化させることができます。
 * 全条件一致の条件がすべて一致したときに画像が表示されます。
 * 設定していない条件は判定されずtrueを返します。
 * 立ち絵、顔グラ表示の優先度は上から判定して最初に条件が一致した設定が適用されます。
 * 条件付きの立ち絵、顔グラ設定はリストの上のほうに設定してください。
 * 
 * このプラグインは「NUUN_Base」が必要です。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/12/15 Ver 1.2.3
 * 一部処理の修正。
 * 2021/12/12 Ver 1.2.2
 * インデックスIDに-1を設定できるように変更。（-1:デフォルトのインデックスID）
 * 2021/12/11 Ver 1.2.1
 * 顔グラのインデックスIDが正常に取得できない問題を修正。
 * 2021/12/11 Ver 1.2.0
 * 立ち絵の設定方法を再度変更。
 * ステータス表示拡張に対応。
 * 2021/7/15 Ver 1.1.1
 * アイテム使用時の画像が取得できなかった問題を修正。
 * 2021/7/12 Ver 1.1.0
 * プラグインパラメータの仕様を大幅に見直し。
 * 戦闘を行うとセーブが出来なくなる問題を修正。
 * 2021/4/20 Ver 1.0.1
 * プラグイン導入後に戦闘を開始するとエラーが出る問題を修正。
 * 2021/3/26 Ver 1.0.0
 * 初版
 * 
 * @param ButlerActors
 * @text 表示アクター設定
 * @desc 画像を表示するアクターを指定します。
 * @type struct<ActorButlerList>[]
 * 
 */
/*~struct~ActorButlerList:
 * 
 * @param actorId
 * @text アクターID
 * @desc アクターIDを設定します。
 * @type actor
 * 
 * @param ImgName
 * @text アクター画像名称
 * @desc アクター画像を区別するための名称。
 * @type string
 * @default
 * 
 * @param ButlerActorImg
 * @text 画像設定
 * @desc 画像を指定します。
 * @type struct<ActorButlerImgList>[]
 * @default []
 * 
 */
/*~struct~ActorButlerImgList:
 * 
 * @param GraphicImg
 * @text アクター画像
 * @desc アクターの画像を設定します。
 * @type file[]
 * @dir img/
 * 
 * @param FaceImg
 * @text 顔グラ画像
 * @desc 顔グラ画像のスプライトシートを設定します。
 * @type file
 * @dir img/faces
 * 
 * @param FaceIndex
 * @text 顔グラのインデックスID
 * @desc 顔グラのインデックスID。
 * @type number
 * @default -1
 * @min -1
 * 
 * @param AllMatch
 * @text 全条件一致
 * @default ------------------------------
 * 
 * @param ImgSwitch
 * @text スイッチ
 * @desc スイッチがONの時に変化します。
 * @type switch
 * @default 0
 * 
 * @param ImgWeapon
 * @text 武器
 * @desc 武器を装備している時に条件を満たします。
 * @type weapon
 * @default 0
 * 
 * @param ImgArmor
 * @text 防具
 * @desc 防具を装備している時に条件を満たします。
 * @type armor
 * @default 0
 * 
 * @param ImgClass
 * @text 職業
 * @desc 特定の職業なら条件を満たします。
 * @type calss
 * @default 0
 * 
 * @param ImgStateAll
 * @text ステート。
 * @desc 指定したステートになっている時に条件を満たします
 * @type state
 * @default 0
 * 
 * @param ChangeGraphicScenes
 * @text 変化シーン
 * @desc グラフィックの変化シーンを選択します。
 * @type select
 * @option 通常
 * @value 'default'
 * @option 戦闘不能
 * @value 'death'
 * @option 瀕死
 * @value 'dying'
 * @option ダメージ時
 * @value 'damage'
 * @option 回復時
 * @value 'recovery'
 * @option 攻撃スキル使用時
 * @value 'attack'
 * @option 回復スキル使用時
 * @value 'recoverySkill'
 * @option アイテム使用時
 * @value 'item'
 * @option 詠唱時
 * @value 'chant'
 * @option 勝利時
 * @value 'victory'
 * @option 被ステート(1)
 * @value 'state'
 * @default 'default'
 * 
 * @param stateId
 * @text 被ステート(1)
 * @desc ステートを選択します。
 * @type state
 * @default 0
 */

var Imported = Imported || {};
Imported.NUUN_ActorPicture = true;

(() => {
const parameters = PluginManager.parameters('NUUN_ActorPicture');
const ButlerActors = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ButlerActors'])) : null) || [];

const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
  _Game_Actor_initMembers.call(this);
  this._actorGraphicData = {};
  this.onImgId = 0;
};

const _Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
  _Game_Actor_setup.call(this, actorId)
  this.imgRefresh();
};

Game_Actor.prototype.getActorGraphicList = function() {
  return ButlerActors.find(actorImg => actorImg.actorId === this.actorId());
};

Game_Actor.prototype.getActorGraphicIndex = function() {
  return ButlerActors.findIndex(actorImg => actorImg.actorId === this.actorId());
};

Game_Actor.prototype.getActorGraphic = function() {
  const imgData = this.getActorGraphicList();
  return imgData ? imgData.ButlerActorImg.find(data => this.matchConditions(data)) : null;
};

Game_Actor.prototype.getActorGraphicData = function() {
  return this._actorGraphicData;
};

Game_Actor.prototype.setActorGraphicData = function() {
  const imgData = this.getActorGraphicList();
  const index = imgData ? imgData.ButlerActorImg.findIndex(data => this.matchConditions(data)) : -1;
  this._actorGraphicIndex = index;
  this._actorGraphicData = index >= 0 ? imgData.ButlerActorImg[index] : null;
};

Game_Actor.prototype.matchConditions = function(data) {
  if (data.ImgSwitch > 0 && !$gameSwitches.value(data.ImgSwitch)) {
    return false;
  }
  if (data.ImgWeapon > 0 && !this.isEquipped($dataWeapons[data.ImgWeapon])) {
    return false;
  }
  if (data.ImgArmor > 0 && !this.isEquipped($dataArmors[data.ImgArmor])) {
    return false;
  }
  if (data.ImgState > 0 && !this.isStateImg(data.ImgState)) {
    return false;
  }
  if (data.ImgClass > 0 && !this.isClassImg(data.ImgClass)) {
    return false;
  }
  if (!this.matchChangeGraphic(data.ChangeGraphicScenes)) {
    return false;
  }
  return true;
};

Game_Actor.prototype.matchChangeGraphic = function(data) {
  switch (data) {
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
      return this.onImgId === 10;
    case 'recoverySkill' :
      return this.onImgId === 11;
    case 'item' :
      return this.onImgId === 12;
    case 'chant' :
      return this.isChanting();
    case 'victory' :
      return this.onImgId === 20;
    case 'state' :
      return this.isStateImg(data.stateId);
  }
};

Game_Actor.prototype.isClassImg = function(classId) {
  return this._classId === classId;
};

Game_Actor.prototype.isStateImg = function(stateId) {
  return this._states.find(state => state === stateId);
};

const _Game_Actor_refresh = Game_Actor.prototype.refresh;
Game_Actor.prototype.refresh = function() {
  _Game_Actor_refresh.call(this);
  this.imgRefresh();
};

Game_Actor.prototype.imgRefresh = function() {
  this.setActorGraphicData();
  $gameTemp.actorGraphicRefresh = true;
};

Game_Actor.prototype.getActorGraphicImg = function() {
  return this._actorGraphicData && this._actorGraphicData.GraphicImg ? this._actorGraphicData.GraphicImg[0] : null;
};

Game_Actor.prototype.getActorGraphicFace = function() {
  return this._actorGraphicData && this._actorGraphicData.FaceImg ? this._actorGraphicData.FaceImg : this.faceName();
};

Game_Actor.prototype.getActorGraphicFaceIndex = function() {
  return this._actorGraphicData && this._actorGraphicData.FaceIndex >= 0 ? this._actorGraphicData.FaceIndex : this.faceIndex();
};

Game_Actor.prototype.getActorGraphicX = function() {
  return this._actorGraphicData.Actor_X;
};

Game_Actor.prototype.getActorGraphicY = function() {
  return this._actorGraphicData.Actor_Y;
};

Game_Actor.prototype.getActorGraphicScale = function() {
  return this._actorGraphicData.Actor_Scale / 100;
};

Game_Actor.prototype.getIsActorGraphicImg = function() {
  return this._actorGraphicData && this._actorGraphicData.GraphicImg;
};

const _Game_Actor_performDamage = Game_Actor.prototype.performDamage;
Game_Actor.prototype.performDamage = function() {
  _Game_Actor_performDamage.call(this);
  this.onImgId = 1;
  this.imgRefresh();
};

const _Game_Actor_performRecovery = Game_Actor.prototype.performRecovery;
Game_Actor.prototype.performRecovery = function() {
  _Game_Actor_performRecovery.call(this);
  this.onImgId = 2;
  this.imgRefresh();
};

const _Game_Actor_performVictory = Game_Actor.prototype.performVictory;
Game_Actor.prototype.performVictory = function() {
  _Game_Actor_performVictory.call(this);
  this.onImgId = 20;
  this.imgRefresh();
};

const _Game_Actor_performActionStart = Game_Actor.prototype.performActionStart;
Game_Actor.prototype.performActionStart = function(action) {
  _Game_Actor_performActionStart.call(this, action);
  this.setAttackImgId(action);
};

Game_Actor.prototype.setAttackImgId = function(action) {
  if (action.isRecover()) {
    this.onImgId = 11;
  } else if (action.isAttack()) {
    this.onImgId = 10;
  } else if (action.isMagicSkill()) {
    this.onImgId = 10;
  } else if (action.isSkill()) {
    this.onImgId = 10;
  } else if (action.isItem()) {
    this.onImgId = 12;
  }
  this.imgRefresh();
};

Game_Actor.prototype.resetImgId = function() {
  this.onImgId = 0;
  this.imgRefresh();
};

Game_Actor.prototype.loadActorGraphic = function() {
  return ImageManager.nuun_LoadPictures(this.getActorGraphicImg());
};

Game_Actor.prototype.loadActorFace = function() {
  return ImageManager.loadFace(this.getActorGraphicFace());
};

Game_Actor.prototype.isActorGraphicDead = function() {
  return this._actorGraphicData && ((this._actorGraphicData.stateChangeGraphicScenes === 'state' &&
  this._actorGraphicData.stateId === this.deathStateId()) || ImgStateAll === this.deathStateId());
};

})();
