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
 * @version 1.1.0
 * 
 * @help
 * 立ち絵画像を表示します。
 * このプラグインは「バトルスタイル拡張」の立ち絵拡張プラグインです。
 * 
 * スイッチ、武器、防具、ステートによる条件でアクター画像を変更できます。
 * スイッチがONのときに画像が切り替わります。
 * 特定の武器、または防具を装備している時に画像が切り替わります。
 * 特定のステートに掛かっている間、画像が切り替わります。
 * 
 * スイッチ、武器、防具、ステート全てがtrueの時に画像が切り替わりますが、
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
 * 仕様
 * 戦闘中に画像データが切り替わる際、新規に読み込む画像データがある場合状況によっては画像がちらつく場合がございます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
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
 * @text アクター画像識別名
 * @desc アクター画像の識別名。
 * @type string
 * 
 * @param ConditionsSetting
 * @text 表示条件
 * @default ------------------------------
 * 
 * @param ImgSwitch
 * @text スイッチ
 * @desc スイッチがONの時に変化します。
 * @type switch
 * @default 0
 * @parent ConditionsSetting
 * 
 * @param ImgWeapon
 * @text 武器
 * @desc 武器を装備している時に変化します。
 * @type weapon
 * @default 0
 * @parent ConditionsSetting
 * 
 * @param ImgArmor
 * @text 防具
 * @desc 防具を装備している時に変化します。
 * @type armor
 * @default 0
 * @parent ConditionsSetting
 * 
 * @param ImgState
 * @text ステート
 * @desc 指定したステートになっている時に変化します。
 * @type state
 * @default 0
 * @parent ConditionsSetting
 * 
 * @param ImgName
 * @text アクター画像識別名
 * @desc アクター画像の識別名。
 * @type string
 * 
 * @param ConditionsSetting
 * @text 表示条件
 * @default ------------------------------
 * 
 * @param ImgSwitch
 * @text スイッチ
 * @desc スイッチがONの時に変化します。
 * @type switch
 * @default 0
 * @parent ConditionsSetting
 * 
 * @param ImgWeapon
 * @text 武器
 * @desc 武器を装備している時に変化します。
 * @type weapon
 * @default 0
 * @parent ConditionsSetting
 * 
 * @param ImgArmor
 * @text 防具
 * @desc 防具を装備している時に変化します。
 * @type armor
 * @default 0
 * @parent ConditionsSetting
 * 
 * @param ImgState
 * @text ステート
 * @desc 指定したステートになっている時に変化します。
 * @type state
 * @default 0
 * @parent ConditionsSetting
 * 
 * @param DefaultSetting
 * @text デフォルト画像
 * @default ------------------------------
 * 
 * @param defaultImg
 * @text デフォルト画像（全）
 * @desc デフォルトの画像を表示します。
 * @type file[]
 * @dir img/
 * @parent DefaultSetting
 * 
 * @param defaultFaceIndex
 * @desc デフォルトのインデックス番号。
 * @text デフォルトインデックス番号。
 * @type number
 * @default -1
 * @min -1
 * @max 9999
 * @parent DefaultSetting
 * 
 * @param DeathSetting
 * @text 戦闘不能時画像
 * @default ------------------------------
 * 
 * @param deathImg
 * @text 戦闘不能画像（全）
 * @desc 戦闘不能になった時の画像を表示します。指定しない場合は戦闘不能時に画像が透明になります。
 * @type file[]
 * @dir img/
 * @parent DeathSetting
 * 
 * @param deathFaceIndex
 * @desc 戦闘不能時のインデックス番号。
 * @text 戦闘不能時インデックス番号（全）
 * @type number
 * @default -1
 * @min -1
 * @max 9999
 * @parent DeathSetting
 * 
 * @param DamageSetting
 * @text ダメージ時画像
 * @default ------------------------------
 * 
 * @param damageImg
 * @text ダメージ時画像（戦闘）
 * @desc ダメージを受けた時の画像を表示します。
 * @type file[]
 * @dir img/
 * @parent DamageSetting
 * 
 * @param damageFaceIndex
 * @desc ダメージ時のインデックス番号。
 * @text ダメージ時インデックス番号（戦闘）
 * @type number
 * @default -1
 * @min -1
 * @max 9999
 * @parent DamageSetting
 * 
 * @param recoveryDamageImg
 * @text 回復時画像（戦闘）
 * @desc 回復した時の画像を表示します。
 * @type file[]
 * @dir img/
 * @parent DamageSetting
 * 
 * @param recoveryDamageFaceIndex
 * @desc 回復時のインデックス番号。
 * @text 回復した時インデックス番号（戦闘）
 * @type number
 * @default -1
 * @min -1
 * @max 9999
 * @parent DamageSetting
 * 
 * @param DyingSetting
 * @text 瀕死時画像
 * @default ------------------------------
 * 
 * @param dyingImg
 * @text 瀕死時画像（戦闘）
 * @desc 瀕死の時の画像を表示します。
 * @type file[]
 * @dir img/
 * @parent DyingSetting
 * 
 * @param dyingFaceIndex
 * @desc 瀕死時のインデックス番号。
 * @text 瀕死時インデックス番号（戦闘）
 * @type number
 * @default -1
 * @min -1
 * @max 9999
 * @parent DyingSetting
 * 
 * @param VictorySetting
 * @text 勝利時画像
 * @default ------------------------------
 * 
 * @param victoryImg
 * @text 勝利時画像（戦闘）
 * @desc 勝利時の画像を表示します。
 * @type file[]
 * @dir img/
 * @parent VictorySetting
 * 
 * @param victoryFaceIndex
 * @desc 勝利時のインデックス番号。
 * @text 勝利時インデックス番号（戦闘）
 * @type number
 * @default -1
 * @min -1
 * @max 9999
 * @parent VictorySetting
 * 
 * @param ChantSetting
 * @text 詠唱時画像
 * @default ------------------------------
 * 
 * @param chantImg
 * @text 詠唱時画像（戦闘）
 * @desc 詠唱時の画像を表示します。
 * @type file[]
 * @dir img/
 * @parent ChantSetting
 * 
 * @param chantFaceIndex
 * @desc 詠唱時のインデックス番号。
 * @text 詠唱時インデックス番号（戦闘）
 * @type number
 * @default -1
 * @min -1
 * @max 9999
 * @parent ChantSetting
 * 
 * @param AttackSetting
 * @text 攻撃時画像
 * @default ------------------------------
 * 
 * @param attackImg
 * @text 攻撃、スキル使用時画像（戦闘）
 * @desc 攻撃、スキル使用時の画像を表示します。
 * @type file[]
 * @dir img/
 * @parent AttackSetting
 * 
 * @param itemImg
 * @text アイテム使用時画像（戦闘）
 * @desc アイテム使用時の画像を表示します。
 * @type file
 * @dir img/pictures
 * @parent AttackSetting
 * 
 * @param recoveryImg
 * @text 回復スキル使用時画像（戦闘）
 * @desc 回復スキル使用時の画像を表示します。
 * @type file[]
 * @dir img/
 * @parent AttackSetting
 * 
 * @param attackFaceIndex
 * @desc 攻撃、スキル使用時のインデックス番号。
 * @text 攻撃、スキル使用時インデックス番号（戦闘）
 * @type number
 * @default -1
 * @min -1
 * @max 9999
 * @parent AttackSetting
 * 
 * @param itemFaceIndex
 * @desc アイテム使用時のインデックス番号。
 * @text アイテム使用時インデックス番号（戦闘）
 * @type number
 * @default -1
 * @min -1
 * @max 9999
 * @parent AttackSetting
 * 
 * @param recoveryFaceIndex
 * @desc 回復スキル使用時のインデックス番号。
 * @text 回復スキル使用時インデックス番号（戦闘）
 * @type number
 * @default -1
 * @min -1
 * @max 9999
 * @parent AttackSetting
 * 
 * @param StateSetting
 * @text 被ステート時画像
 * @default ------------------------------
 * 
 * @param stateImg
 * @text 被ステート時画像
 * @desc 被ステート時の画像を設定します。
 * @type struct<actorStateImgList>[]
 * @parent StateSetting
 * 
 */
/*~struct~actorStateImgList:
 * 
 * @param actorStateImg
 * @text 被ステート時画像
 * @desc 被ステート時の画像を表示します。
 * @type file[]
 * @dir img/
 * 
 * @param stateFaceIndex
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
const ButlerActors = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ButlerActors'])) : null) || [];

const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
  _Game_Actor_initMembers.call(this);
  this._actorImgIndex = NaN;
  this.imgChange = false;
};

const _Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
  _Game_Actor_setup.call(this, actorId)
  this.setButlerImg();
};

Game_Actor.prototype.setButlerImg = function() {
  const index = this.isButlerImg();
  if (index !== this._actorImgIndex) {
    this._actorImgIndex = index;
    $gameTemp.setButlerRefresh(true);
    this.imgChange = true;
  }
};

Game_Actor.prototype.isButlerImg = function(index) {
  const actorId = this.actorId();
  return ButlerActors.findIndex(data => {
    if (data.actorId === actorId) {
      if (data.ImgSwitch > 0 && !$gameSwitches.value(data.ImgSwitch)) {
        return false;
      }
      if (data.ImgWeapon > 0 && !this.isEquipped($dataWeapons[data.ImgWeapon])) {
        return false;
      }
      if (data.ImgArmor > 0 && !this.isEquipped($dataArmors[data.ImgArmor])) {
        return false;
      }
      if (data.ImgState > 0 && !this.stateConditions(data.ImgState)) {
        return false;
      }
      return true;
    }
    return false;
  });
};

Game_Actor.prototype.stateConditions = function(imgStateId) {
  return this._states.find(stateId => stateId === imgStateId);
};

Game_Actor.prototype.getStateData = function() {
  return ButlerActors[this._actorImgIndex].stateImg;
};

Game_Actor.prototype.getButlerGraphicData = function() {
  return ButlerActors[this._actorImgIndex];
};

Game_Temp.prototype.setButlerRefresh = function(flag) {
  return this._butlerRefresh = flag;
};

Game_Temp.prototype.isButlerRefresh = function() {
  return this._butlerRefresh || false;
};

})();
