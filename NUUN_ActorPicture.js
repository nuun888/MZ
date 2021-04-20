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
 * @plugindesc 立ち絵表示EX
 * @author NUUN
 * @base NUUN_Base
 * @version 1.0.1
 * 
 * @help
 * 立ち絵画像を表示します。
 * このプラグインは「バトルスタイル拡張」の立ち絵拡張プラグインです。
 * 
 * スイッチ、武器、防具、ステート、評価式による条件でアクター画像を変更できます。
 * スイッチがONのときに画像が切り替わります。
 * 特定の武器、または防具を装備している時に画像が切り替わります。
 * 特定のステートに掛かっている間、画像が切り替わります。
 * 評価式がtrueの時に画像が切り替わります。
 * 
 * スイッチ、武器、防具、ステート、評価式全てがtrueの時に画像が切り替わりますが、
 * スイッチ、武器、防具、ステートが0で設定されている又は、評価式が未記入の場合は判定しません。(trueで返します)
 * 評価式参照変数
 * actor:アクターのゲームデータ
 * s_actor:アクターのデータベースデータ
 * 
 * 現在対応しているプラグイン
 * 「バトルスタイル拡張」
 * 
 * 立ち絵設定または画像設定が設定されてない場合はデフォルトの顔グラフィックが表示されます。
 * 座標、拡大率は表示するプラグインで設定で行います。
 * 例：「バトルスタイル拡張」だと「バトルスタイル拡張設定用」のアクターの画像設定で座標、拡大率を設定。
 * 
 * ステートのメモ欄
 * <ChangeImgId:1>
 * 被ステート時に顔グラまたは、グラフィック画像がID１の画像に変化します。
 * 
 * このプラグインは「NUUN_Base」が必要です。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
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
 * @param actor
 * @text アクターID
 * @desc アクターIDを設定します。
 * @type actor
 * 
 * @param ButlerActorsImg
 * @text 表示設定
 * @desc アクターの表示設定します。
 * @type struct<ActorButlerSettingsList>[]
 * 
 */
/*~struct~ActorButlerSettingsList:
 * 
 * @param ImgName
 * @text アクター画像識別名
 * @desc アクター画像の識別名。
 * @type string
 * 
 * @param ButlerImgSettings
 * @text バトラー画像
 * 
 * @param defaultImg
 * @text デフォルト画像
 * @desc デフォルトの画像を表示します。
 * @type file
 * @dir img/nuun_actorpictures
 * @parent ButlerImgSettings
 * 
 * @param deathImg
 * @text 戦闘不能画像
 * @desc 戦闘不能になった時の画像を表示します。指定しない場合は戦闘不能時に画像が透明になります。
 * @type file
 * @dir img/nuun_actorpictures
 * @parent ButlerImgSettings
 * 
 * @param damageImg
 * @text ダメージ時画像
 * @desc ダメージを受けた時の画像を表示します。
 * @type file
 * @dir img/nuun_actorpictures
 * @parent ButlerImgSettings
 * 
 * @param dyingImg
 * @text 瀕死時画像
 * @desc 瀕死の時の画像を表示します。
 * @type file
 * @dir img/nuun_actorpictures
 * @parent ButlerImgSettings
 * 
 * @param victoryImg
 * @text 勝利時画像
 * @desc 勝利時の画像を表示します。
 * @type file
 * @dir img/nuun_actorpictures
 * @parent ButlerImgSettings
 * 
 * @param chantImg
 * @text 詠唱時画像
 * @desc 詠唱時の画像を表示します。
 * @type file
 * @dir img/nuun_actorpictures
 * @parent ButlerImgSettings
 * 
 * @param FaceSettings
 * @text 顔グラ画像
 * 
 * @param defaultFaceIndex
 * @text 顔グラフィックインデックスID
 * @desc アクターの顔グラのデフォルトインデックス番号。(-1でデフォルトの顔グラフィック)
 * @type number
 * @default -1
 * @min -1
 * @parent FaceSettings
 * 
 * @param deathFaceIndex
 * @desc 戦闘不能時のインデックス番号。
 * @text 戦闘不能時インデックス番号
 * @type number
 * @default -1
 * @min -1
 * @max 9999
 * @parent FaceSettings
 * 
 * @param damageFaceIndex
 * @desc ダメージ時のインデックス番号。
 * @text ダメージ時インデックス番号
 * @type number
 * @default -1
 * @min -1
 * @max 9999
 * @parent FaceSettings
 * 
 * @param dyingFaceIndex
 * @desc 瀕死時のインデックス番号。
 * @text 瀕死時インデックス番号
 * @type number
 * @default -1
 * @min -1
 * @max 9999
 * @parent FaceSettings
 * 
 * @param victoryFaceIndex
 * @desc 勝利時のインデックス番号。
 * @text 勝利時インデックス番号
 * @type number
 * @default -1
 * @min -1
 * @max 9999
 * @parent FaceSettings
 * 
 * @param chantFaceIndex
 * @desc 詠唱時のインデックス番号。
 * @text 詠唱時インデックス番号
 * @type number
 * @default -1
 * @min -1
 * @max 9999
 * @parent FaceSettings
 * 
 * @param stateImg
 * @text 被ステート時インデックス番号
 * @desc 被ステート時のインデックス番号。
 * @type struct<actorStateImgList>[]
 * 
 * @param ChangeSettings
 * @text 変化条件
 * 
 * @param ImgSwitch
 * @text スイッチ
 * @desc スイッチがONの時に変化します。
 * @type switch
 * @default 0
 * @parent ChangeSettings
 * 
 * @param ImgWeapon
 * @text 武器
 * @desc 武器を装備している時に変化します。
 * @type weapon
 * @default 0
 * @parent ChangeSettings
 * 
 * @param ImgArmor
 * @text 防具
 * @desc 防具を装備している時に変化します。
 * @type armor
 * @default 0
 * @parent ChangeSettings
 * 
 * @param ImgState
 * @text ステート
 * @desc 変化するステートのIDを指定します。ステートのメモ欄に<ChangeImgId:[id]>を記入してください。[id]:変化ID
 * @type state
 * @default 0
 * @parent ChangeSettings
 * 
 * @param ImgEval
 * @text 条件式
 * @desc 条件式
 * @type String
 * @default 
 * @parent ChangeSettings
 */
/*~struct~actorStateImgList:
 * 
 * @param actorStateImg
 * @text 被ステート時画像
 * @desc 被ステート時の画像を表示します。
 * @type file
 * @dir img/nuun_actorpictures
 * 
 * @param actorStateIndex
 * @text 被ステート時インデックス番号
 * @desc 被ステート時のインデックス番号。
 * @type number
 * @default -1
 * @min -1
 * @max 9999
 * 
 * @param stateImgId
 * @text 変化ID
 * @desc 変化するステートのIDを指定します。ステートのメモ欄に<ChangeImgId:[id]>を記入してください。[id]:変化ID
 * @type number
 * @min 0
 * @max 9999
 * 
 * @param Always
 * @desc 被ステート時画像変化。
 * @text 被ステート時の画像を戦闘不能以外変化しません。
 * @type boolean
 * @default false
 * 
 * @param priorityId
 * @text 表示優先度
 * @desc 表示優先度
 * @type number
 * @default 1
 * @min 0
 * @max 9999
 * 
 */

var Imported = Imported || {};
Imported.NUUN_ActorPicture = true;

(() => {
const parameters = PluginManager.parameters('NUUN_ActorPicture');

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
param.ButlerActors = param.ButlerActors || [];

Game_Temp.prototype.setButlerRefresh = function(flag) {
  return this._butlerRefresh = flag;
};

Game_Temp.prototype.isButlerRefresh = function() {
  return this._butlerRefresh || false;
};

const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
  _Game_Actor_initMembers.call(this);
  this.imgType = null;
  this._actorButler = new Game_ActorButler();
};

const _Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
  _Game_Actor_setup.call(this, actorId)
  this._actorButler.setup(this);
};

Game_Actor.prototype.setActorButler = function() {
  if (!this._actorButler || Object.keys(this._actorButler._actorImgDate).length === 0) {
    this._actorButler = new Game_ActorButler();
    this._actorButler.setup(this);
  }
  this._actorButler.setActorImgDate(this);
};

Game_Actor.prototype.getActorButlerList = function() {
  return this._actorButler._actorImgDate;
};


function Game_ActorButler() {
  this.initialize(...arguments);
}

Game_ActorButler.prototype.initialize = function() {
  this._actorImgList = null;
  this._actorImgDate = {};
  this.imgChange = false;
};

Game_ActorButler.prototype.setup = function(actor) {
  this.initActorImg(actor);
};

Game_ActorButler.prototype.initActorImg = function(actor) {
  const actorId = actor.actorId();
  const list = param.ButlerActors.find(actors => actors.actor === actorId);
  if (list) {
    this._actorImgList = list;
  }
};

Game_ActorButler.prototype.getActorImg = function(actor) {
  this.setActorImgDate(actor);
  return this.getImgType(actor);
};

Game_ActorButler.prototype.setActorImgDate = function(actor) {
  const list = this._actorImgList || this.nanDate(actor);
  if (list) {
    let i = 0;
    for (const imgList of list.ButlerActorsImg) {
      i++;
      if (this.getConditions(imgList, actor)) {
        if (this._actorImgDate.index !== i) {
          this._actorImgDate = imgList;
          this._actorImgDate.id = actor.actorId();
          this._actorImgDate.index = i;
          this.imgChange = true;
          $gameTemp.setButlerRefresh(true);
          return;
        } else {
          return;
        }
      }
    }
  }
};

Game_ActorButler.prototype.nanDate = function(_actor) {
  return {actor: _actor.actorId(), ButlerActorsImg: [{
    ImgArmor: 0,
    ImgState: 0,
    ImgSwitch: 0,
    ImgWeapon: 0,
    chantFaceIndex: -1,
    damageFaceIndex: -1,
    deathFaceIndex: -1,
    defaultFaceIndex: -1,
    dyingFaceIndex: -1,
    victoryFaceIndex: -1}]};
};

Game_ActorButler.prototype.getConditions = function(imgList, actor) {
  return this.switcheConditions(imgList) && this.weaponConditions(imgList, actor) && this.armorConditions(imgList, actor) && 
          this.stateConditions(imgList, actor) && this.evalConditions(imgList, actor);
};

Game_ActorButler.prototype.switcheConditions = function(imgList) {
  return imgList.ImgSwitch > 0 ? $gameSwitches.value(imgList.ImgSwitch) : true;
};

Game_ActorButler.prototype.weaponConditions = function(imgList, actor) {
  if (imgList.ImgWeapon > 0) {
    const item = $dataWeapons[imgList.ImgWeapon];
    return actor.isEquipped(item);
  }
  return true;
};

Game_ActorButler.prototype.armorConditions = function(imgList, actor) {
  if (imgList.ImgArmor > 0) {
    const item = $dataWeapons[imgList.ImgArmor];
    return actor.isEquipped(item);
  }
  return true;
};

Game_ActorButler.prototype.stateConditions = function(imgList, actor) {
  if (imgList.ImgState > 0) {
    const state = actor._states.find(stateId => stateId === imgList.ImgState);
    return state ? true : false;
  }
  return true;
};

Game_ActorButler.prototype.evalConditions = function(imgList, actor) {
  const s_actor = actor.actor();
  return imgList.ImgEval ? eval(imgList.ImgEval) : true;
};

})();
