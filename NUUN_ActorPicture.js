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
 * @version 1.3.2
 * 
 * @help
 * 立ち絵、顔グラ画像を表示します。
 * 立ち絵、顔グラは条件により自動的に変化させることができます。
 * 
 * 全条件一致
 * 全条件一致の条件がすべて一致したときに画像が表示されます。
 * 設定していない条件は判定されずtrueを返します。
 * 立ち絵、顔グラ表示の優先度は上から判定して最初に条件が一致した設定が適用されます。
 * 条件付きの立ち絵、顔グラ設定はリストの上のほうに設定してください。
 * 
 * 条件設定
 * 変化シーンでの一部の選択で設定します。
 * 
 * 顔グラのインデックス番号は左上から順に
 * 0 1 2 3
 * 4 5 6 7
 * 8 9 10 11
 * 12 13 14 15
 * となります。
 * 
 * このプラグインは「NUUN_Base」が必要です。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/5/7 Ver 1.3.2
 * 条件にステートを指定するとエラーが出る問題を修正。
 * 2022/5/6 Ver 1.3.1
 * スイッチで条件判定するとエラーが出る問題を修正。
 * 2022/4/10 Ver 1.3.0
 * アクター画像設定のスイッチ、武器、防具、ステートの条件に複数指定できるように変更。
 * アクター画像設定に残りHPの条件を追加。 
 * アクター画像設定のスキル、アイテム条件が適用されていなかった問題を修正。
 * 2022/3/24 Ver 1.2.5
 * ステート条件が取得できなかった問題を修正。
 * 画像指定の仕様を変更。
 * 2022/1/8 Ver 1.2.4
 * 説明文を修正。
 * ステートによる変化が適用されない問題を修正。
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
 * @type file
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
 * @desc 指定したスイッチが全てONの時に変化します。
 * @type switch[]
 * @default
 * @parent AllMatch
 * 
 * @param ImgWeapon
 * @text 武器
 * @desc 指定した武器を全て装備している時に条件を満たします。
 * @type weapon[]
 * @default 
 * @parent AllMatch
 * 
 * @param ImgArmor
 * @text 防具
 * @desc 指定した防具を全て装備している時に条件を満たします。
 * @type armor[]
 * @default 
 * @parent AllMatch
 * 
 * @param ImgClass
 * @text 職業
 * @desc 特定の職業なら条件を満たします。
 * @type class
 * @default 0
 * @parent AllMatch
 * 
 * @param ImgStateAll
 * @text ステート。
 * @desc 指定したステートに全てかかっている時に条件を満たします。
 * @type state[]
 * @default 
 * @parent AllMatch
 * 
 * @param ImgHP
 * @text 残りHP
 * @desc 残りHPが指定の範囲内または数値の時に変化します。
 * @type struct<CondValue>
 * @default {"CondValid":"false","UpLimit":"0","DwLimit":"0"}
 * @parent AllMatch
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
 * @option 攻撃スキル使用時(1)
 * @value 'attack'
 * @option 回復スキル使用時(1)
 * @value 'recoverySkill'
 * @option アイテム使用時(2)
 * @value 'item'
 * @option 詠唱時
 * @value 'chant'
 * @option 勝利時
 * @value 'victory'
 * @option 被ステート(3)
 * @value 'state'
 * @default 'default'
 * @parent AllMatch
 * 
 * @param CondSetting
 * @text 条件設定
 * @default ------------------------------
 * 
 * @param Skill
 * @text スキル(1)
 * @desc スキルを選択します。いずれかのスキル使用時に適用します。空白の場合は全てのスキルが対象です。スキルID0は通常攻撃です。
 * @type skill[]
 * @default
 * @parent CondSetting
 * 
 * @param Item
 * @text アイテム(2)
 * @desc アイテムを選択します。いずれかのアイテム使用時に適用します。空白の場合は全てのアイテムが対象です。
 * @type item[]
 * @default
 * @parent CondSetting
 * 
 * @param stateId
 * @text 被ステート(3)
 * @desc ステートを選択します。全てのステートにかかっている時に適用します。
 * @type state[]
 * @default 
 * @parent CondSetting
 * 
 */
/*~struct~CondValue:
 * 
 * @param CondValid
 * @desc HP条件を有効にします。
 * @text HP条件有効
 * @type boolean
 * @default false
 * 
 * @param UpLimit
 * @text 上限値
 * @desc 上限値
 * @type number
 * @default 0
 * 
 * @param DwLimit
 * @text 下限値
 * @desc 下限値
 * @type number
 * @default 0
 * 
 */

var Imported = Imported || {};
Imported.NUUN_ActorPicture = true;

(() => {
const parameters = PluginManager.parameters('NUUN_ActorPicture');
const ButlerActors = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ButlerActors'])) : null) || [];

NuunManager.setupClassName = function(className) {
  this._className = className;
};

NuunManager.getClassName = function() {
  return this._className;
};

const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
  _Game_Actor_initMembers.call(this);
  this.nuun_useItemId = -1;
  this._actorGraphicIndex = -1;
  this._actorGraphicName = null;
  this._actorGraphicFace = null;
  this.onImgId = 0;
};

const _Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
  _Game_Actor_setup.call(this, actorId);
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
  const data = this.getActorGraphicList();
  return data ? this.getActorGraphicList().ButlerActorImg[this._actorGraphicIndex] : null;
};

Game_Actor.prototype.setActorGraphicData = function() {
  const imgData = this.getActorGraphicList();
  const index = imgData ? imgData.ButlerActorImg.findIndex(data => this.matchConditions(data)) : -1;
  this._actorGraphicIndex = index;
  if (index >= 0) {
    const data = imgData.ButlerActorImg[index];
    this._actorGraphicName = data.GraphicImg;
    this._actorGraphicFace = data.FaceImg || this.faceName();
    this._actorImgIndex = data.FaceIndex >= 0 ? data.FaceIndex : this.faceIndex();
  } else {
    this._actorGraphicName = null;
    this._actorGraphicFace = this.faceName();
    this._actorImgIndex = this.faceIndex();
  }
};

Game_Actor.prototype.matchConditions = function(data) {
  if (data.ImgHP && data.ImgHP.CondValid && !conditionsParam(data.ImgHP, this.hp, this.param(0))) {
    return false;
  }
  if (data.ImgSwitch > 0 && !this.isCondSwitchImg(data)) {
    return false;
  }
  if (data.ImgWeapon > 0 && !this.isCondWeaponImg(data)) {
    return false;
  }
  if (data.ImgArmor > 0 && !this.isCondArmorImg(data)) {
    return false;
  }
  if (data.ImgState > 0 && !this.isCondStateImg(data, data.ImgState)) {
    return false;
  }
  if (data.ImgClass > 0 && !this.isCondClassImg(data)) {
    return false;
  }
  if (!this.matchChangeGraphic(data)) {
    return false;
  }
  return true;
};

Game_Actor.prototype.matchChangeGraphic = function(data) {
  const changeData = data.ChangeGraphicScenes;
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
      return this.onImgId === 10 && this.isCondUseItemImg(data.Skill);
    case 'recoverySkill' :
      return this.onImgId === 11 && this.isCondUseItemImg(data.Skill);
    case 'item' :
      return this.onImgId === 12 && this.isCondUseItemImg(data.Item);
    case 'chant' :
      return this.isChanting();
    case 'victory' :
      return this.onImgId === 20;
    case 'state' :
      return this.isCondStateImg(data, data.stateId);
  }
};

Game_Actor.prototype.isCondSwitchImg = function(data) {
  return data.ImgSwitch.every(id => $gameSwitches.value(id));
};

Game_Actor.prototype.isCondWeaponImg = function(data) {
  return data.ImgWeapon.every(id => this.isEquipped($dataWeapons[id]));
};

Game_Actor.prototype.isCondArmorImg = function(data) {
  return data.ImgArmor.every(id => this.isEquipped($dataArmors[id]));
};

Game_Actor.prototype.isCondStateImg = function(data, states) {
  return states.every(id => this.isStateAffected(id));
};

Game_Actor.prototype.isCondClassImg = function(data) {
  return data.ImgClass ? this._classId === data.ImgClass : true;
};

Game_Actor.prototype.isCondUseItemImg = function(data) {
  return data ? data.includes(this.nuun_useItemId) : true;
};

Game_Actor.prototype.isClassNameImg = function(data) {
  const className = NuunManager.getClassName();
  return data.some(name => className === name);
};

const _Game_Actor_refresh = Game_Actor.prototype.refresh;
Game_Actor.prototype.refresh = function() {
  _Game_Actor_refresh.call(this);
  this.imgRefresh();
};

Game_Actor.prototype.imgRefresh = function() {
  this.setActorGraphicData();
};

Game_Actor.prototype.getActorGraphicImg = function() {
  return this._actorGraphicName;
};

Game_Actor.prototype.getActorGraphicFace = function() {
  return this._actorGraphicFace || this.faceName();
};

Game_Actor.prototype.getActorGraphicFaceIndex = function() {
  return this._actorImgIndex || this.faceIndex();
};

Game_Actor.prototype.getIsActorGraphicImg = function() {
  return !!this._actorGraphicName;
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
    this.nuun_useItemId = action.item().id;
  } else if (action.isAttack()) {
    this.onImgId = 10;
    this.nuun_useItemId = action.item().id;
  } else if (action.isMagicSkill()) {
    this.onImgId = 10;
    this.nuun_useItemId = action.item().id;
  } else if (action.isSkill()) {
    this.onImgId = 10;
    this.nuun_useItemId = action.item().id;
  } else if (action.isItem()) {
    this.onImgId = 12;
    this.nuun_useItemId = action.item().id;
  } else {
    this.nuun_useItemId = -1;
  }
  this.imgRefresh();
};

Game_Actor.prototype.resetImgId = function() {
  this.onImgId = 0;
  this.nuun_useItemId = -1;
  this.imgRefresh();
};

Game_Actor.prototype.loadActorGraphic = function() {
  return ImageManager.nuun_LoadPictures(this.getActorGraphicImg());
};

Game_Actor.prototype.loadActorFace = function() {
  return ImageManager.loadFace(this.getActorGraphicFace());
};

Game_Actor.prototype.isActorGraphicDead = function(data) {
  return data && ((data.stateChangeGraphicScenes === 'state' &&
  data.stateId === this.deathStateId()) || data.ImgStateAll === this.deathStateId());
};

function conditionsParam(data, param, maxParam) {
  return (param >= maxParam * data.DwLimit / 100 && (data.UpLimit > 0 ? (param <= maxParam * data.UpLimit / 100) : true));
};

})();
