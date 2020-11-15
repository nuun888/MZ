/*:-----------------------------------------------------------------------------------
 * NUUN_BattleStyleEX.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 更新履歴
 * 2020/11 Ver 1.0.0
 */ 
/*:ja
 * @target MZ
 * @plugindesc バトルスタイル拡張。
 * @author NUUN
 * 
 * @help
 * バトルスタイルに以下の機能を実装します。
 * 　アクターの立ち絵を表示できるようになります。
 * 　フロントビューバトルでもアニメーション、ダメージエフェクトを表示できるようになります。
 * 　アクターステータスの位置を変更することが出来ます。
 * 　戦闘不能時やダメージを受けた時、瀕死の時に顔グラフィック、立ち絵を変更することが出来ます。
 * 
 * 仕様
 * パーティコマンドは画面上部、画面上部からアクターステータス欄の中間、アクターステータス欄の上部
 * のいずれかから選択できます。TPBバトルでアクティブを選択している場合は、画面上部以外の選択を推奨いたします。
 * アクターコマンドは各アクターの上部に表示されます。
 * エネミーの座標によりダメージエフェクトがアクターのグラフィックに被り、表示が見えなくなる場合があります。
 * フロントビュー時のエフェクトはアクターのグラフィックの前面、アクターステータスの背面に表示されます。
 * 
 * 
 * 立ち絵を表示させたい場合は、プラグインパラメータから「アクターの画像設定」
 * を選択し、各アクターに表示させる画像を指定させてください。
 * デフォルトの画像が指定されてない場合は顔グラフィックが表示されます。
 * 
 * フロントビューでエフェクトを表示させたい場合は、エフェクト設定の「エフェクト」をtrueにしてください。
 * 
 * 戦闘不能時やダメージを受けた時、瀕死の時のグラフィックを切り替えたい場合は、
 * アクターの画像設定の「アクターグラフィックアニメ許可」をtrueにしてください。
 * 顔グラフィックが８を超える場合は、複数の顔グラフィック画像を１つのファイルに結合してください。
 * （データベースのアクター設定の顔グラフィックでも反映されます）
 * ＊＊＊＊　元の顔グラフィック画像
 * ＊＊＊＊
 *    +
 * ＊＊＊＊　追加の顔グラフィック画像
 * ＊＊＊＊
 *    +
 * 顔グラのインデックス番号は左上から順に0,1,2,3となっています。
 * 
 * 各ステータスの位置を変更したい場合は、各項目の「〇〇の座標変更」をtureにしてください。
 * 
 * エネミーのメモ欄
 * <AttackAnimation:11>
 * エネミーの通常攻撃時、11番のアニメーションが再生されます。
 * 
 * ステートのメモ欄
 * <FaceChangeId:1>
 * 被ステート時に顔グラまたは、グラフィック画像がID１の画像に変化します。
 * なお、「アクターグラフィックアニメ許可」をtrueにしているときののみ有効です。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * @param ActorImg
 * @text アクターの画像設定
 * 
 * @param ActorsImgList
 * @text 画像設定
 * @desc アクターの画像設定
 * @default []
 * @type struct<actorImgList>[]
 * @parent ActorImg
 * 
 * @param ActorAnimation
 * @desc アクターグラフィックのアニメーションを許可します。
 * @text アクターグラフィックアニメ許可
 * @type boolean
 * @default false
 * @parent ActorImg
 * 
 * @param damageImgFrame
 * @desc ダメージ時の画像変化フレーム。
 * @text ダメージ時変化フレーム
 * @type number
 * @default 30
 * @min 1
 * @parent ActorImg
 * 
 * @param dyingPercentage
 * @desc 瀕死とする残りHP％を指定します。
 * @text 瀕死とする残りHP％
 * @type number
 * @default 25
 * @min 0
 * @parent ActorImg
 * 
 * @param Window
 * @text ウィンドウ設定
 * 
 * @param WindowShow
 * @desc アクターウィンドウ画像を表示する。
 * @text アクターウィンドウ表示
 * @type boolean
 * @default true
 * @parent Window
 * 
 * @param WindowFrameShow
 * @desc アクターウィンドウ枠を表示する。
 * @text アクターウィンドウ枠表示
 * @type boolean
 * @default false
 * @parent Window
 * 
 * @param cursorBackShow
 * @desc カーソル背景を表示する。
 * @text カーソル背景表示
 * @type boolean
 * @default true
 * @parent Window
 * 
 * @param PartyCommand
 * @text パーティコマンド設定
 * 
 * @param PartyCommandPosition
 * @text パーティコマンドの表示位置
 * @desc パーティコマンドの表示位置を指定します。
 * @type select
 * @option 上部
 * @value 0
 * @option 中間
 * @value 1
 * @option アクターステータスウィンドウの上
 * @value 2
 * @desc エネミーのNo表示
 * @default 0
 * @parent PartyCommand
 * 
 * @param ActorCommand
 * @text アクターコマンド設定
 * 
 * @param ActorCommandMaxRow
 * @desc 表示するコマンド項目数。
 * @text 表示コマンド項目数
 * @type number
 * @default 4
 * @min 0
 * @parent ActorCommand
 * 
 * @param Effect
 * @text エフェクト設定
 * 
 * @param FrontViewActorEffect
 * @desc フロントビューでもエフェクトを表示する。
 * @text エフェクト
 * @type boolean
 * @default true
 * @parent Effect
 * 
 * @param ActorEffect_X
 * @desc アニメーションエフェクトのX座標（フロントビューはエフェクトモードがONの時のみ有効）
 * @text アニメーションエフェクトX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent Effect
 * 
 * @param ActorEffect_Y
 * @desc アニメーションエフェクトのY座標（フロントビューはエフェクトモードがONの時のみ有効）
 * @text アニメーションエフェクトY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent Effect
 * 
 * @param ActorDamage_X
 * @desc ダメージエフェクトのX座標（フロントビューはエフェクトモードがONの時のみ有効）
 * @text ダメージエフェクトX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent Effect
 * 
 * @param ActorDamage_Y
 * @desc ダメージエフェクトのY座標（フロントビューはエフェクトモードがONの時のみ有効）
 * @text ダメージエフェクトY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent Effect
 * 
 * 
 * @param ActorStatus
 * @text アクターステータス位置設定
 * 
 * @param ActorNameChangePosition
 * @text アクター名位置設定
 * @parent ActorStatus
 * 
 * @param NameChangePosition
 * @desc 名前の座標変更を許可する。
 * @text 名前の座標変更
 * @type boolean
 * @default false
 * @parent ActorNameChangePosition
 * 
 * @param ActorName_X
 * @desc 名前のX座標を設定します。名前の座標変更がTrueの場合のみ適用します。
 * @text 名前X座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorNameChangePosition
 * 
 * @param ActorName_Y
 * @desc 名前のY座標を設定します。名前の座標変更がTrueの場合のみ適用します。
 * @text 名前Y座標
 * @type number
 * @default 88
 * @min -9999
 * @parent ActorNameChangePosition
 * 
 * @param ActorImgChangePosition
 * @text アクターグラフィック位置設定
 * @parent ActorStatus
 * 
 * @param ActorImg_X
 * @desc 画像のオフセットX座標（基準位置からの相対座標となります）
 * @text 画像オフセットX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorImgChangePosition
 * 
 * @param ActorImg_Y
 * @desc 画像のオフセットY座標（基準位置からの相対座標となります）
 * @text 画像オフセットY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorImgChangePosition
 * 
 * @param ActorFeceChangePosition
 * @text 顔グラフィック位置設定
 * @parent ActorImgChangePosition
 * 
 * @param FaceChangePosition
 * @desc 顔グラフィックの座標変更を許可します。アクターのピクチャ設定がされてないアクターのみ適用されます。
 * @text 顔グラフィックの座標変更
 * @type boolean
 * @default false
 * @parent ActorFeceChangePosition
 * 
 * @param ActorFace_X
 * @desc 顔グラフィックのX座標を設定します。顔グラフィックの座標変更がTrueの場合のみ適用します。
 * @text 顔グラフィックX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorFeceChangePosition
 * 
 * @param ActorFace_Y
 * @desc 顔グラフィックのY座標を設定します。顔グラフィックの座標変更がTrueの場合のみ適用します。
 * @text 顔グラフィックY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorFeceChangePosition
 * 
 * @param ActorFace_Width
 * @desc 顔グラフィックの横幅（0でデフォルト設定となります）
 * @text 顔グラフィック横幅
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorImgChangePosition
 * 
 * @param ActorFace_Height
 * @desc 顔グラフィックの縦幅（0でデフォルト設定となります）
 * @text 顔グラフィック縦幅
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorImgChangePosition
 * 
 * @param GaugeWidth
 * @desc ゲージ横幅
 * @text HP,MP,TPゲージの横幅を指定します。
 * @type number
 * @default 128
 * @min 0
 * @parent ActorStatus
 * 
 * @param ActorHPChangePosition
 * @text HP位置設定
 * @parent ActorStatus
 * 
 * @param HPChangePosition
 * @desc HPの座標変更を許可します。
 * @text HPの座標変更
 * @type boolean
 * @default false
 * @parent ActorHPChangePosition
 * 
 * @param ActorHP_X
 * @desc HPのX座標を設定します。HPの座標変更がTrueの場合のみ適用します。
 * @text HP_X座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorHPChangePosition
 * 
 * @param ActorHP_Y
 * @desc HPのY座標を設定します。HPの座標変更がTrueの場合のみ適用します。
 * @text HP_Y座標
 * @type number
 * @default 112
 * @min -9999
 * @parent ActorHPChangePosition
 * 
 * @param ActorMPChangePosition
 * @text MP位置設定
 * @parent ActorStatus
 * 
 * @param MPChangePosition
 * @desc MPの座標変更を許可します。
 * @text MPの座標変更
 * @type boolean
 * @default false
 * @parent ActorMPChangePosition
 * 
 * @param ActorMP_X
 * @desc MPのX座標を設定します。MPの座標変更がTrueの場合のみ適用します。
 * @text MP_X座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorMPChangePosition
 * 
 * @param ActorMP_Y
 * @desc MPのY座標を設定します。MPの座標変更がTrueの場合のみ適用します。
 * @text MP_Y座標
 * @type number
 * @default 136
 * @parent ActorMPChangePosition
 * 
 * @param ActorTPChangePosition
 * @text TP位置設定
 * @parent ActorStatus
 * 
 * @param TPChangePosition
 * @desc TPの座標変更を許可します。
 * @text TPの座標変更
 * @type boolean
 * @default false
 * @parent ActorTPChangePosition
 * 
 * @param ActorTP_X
 * @desc TPのX座標を設定します。TPの座標変更がTrueの場合のみ適用します。
 * @text TP_X座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorTPChangePosition
 * 
 * @param ActorTP_Y
 * @desc TPのY座標を設定します。TPの座標変更がTrueの場合のみ適用します。
 * @text TP_Y座標
 * @type number
 * @default 160
 * @min -9999
 * @parent ActorTPChangePosition
 * 
 * @param ActorTPBChangePosition
 * @text TPB位置設定
 * @parent ActorStatus
 * 
 * @param TPBShow
 * @desc TPBゲージを表示します。
 * @text TPBゲージ表示
 * @type boolean
 * @default true
 * @parent ActorTPBChangePosition
 * 
 * @param TPBChangePosition
 * @desc TPBの座標変更を許可します。
 * @text TPBの座標変更
 * @type boolean
 * @default false
 * @parent ActorTPBChangePosition
 * 
 * @param ActorTPB_X
 * @desc TPBのX座標を設定します。TPBの座標変更がTrueの場合のみ適用します。
 * @text TPB_X座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorTPBChangePosition
 * 
 * @param ActorTPB_Y
 * @desc TPBのY座標を設定します。TPBの座標変更がTrueの場合のみ適用します。
 * @text TPB_Y座標
 * @type number
 * @default 88
 * @min -9999
 * @parent ActorTPBChangePosition
 * 
 * @param ActorStateChangePosition
 * @text State位置設定
 * @parent ActorStatus
 * 
 * @param StateChangePosition
 * @desc ステートの座標変更を許可します。
 * @text ステートの座標変更
 * @type boolean
 * @default false
 * @parent ActorStateChangePosition
 * 
 * @param ActorState_X
 * @desc ステートのX座標を設定します。ステートの座標変更がTrueの場合のみ適用します。
 * @text ステートX座標
 * @type number
 * @default 278
 * @min -9999
 * @parent ActorStateChangePosition
 * 
 * @param ActorState_Y
 * @desc ステートのY座標ステートの座標変更がTrueの場合のみ適用します。
 * @text ステートY座標
 * @type number
 * @default 20
 * @min -9999
 * @parent ActorStateChangePosition
 * 
 */
/*~struct~actorImgList:
 * 
 * @param actorId
 * @text アクター
 * @desc アクターを指定します。
 * @type actor
 * 
 * @param Actor_X
 * @desc 画像のX座標。
 * @text 画像X座標
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param Actor_Y
 * @desc 画像のY座標。
 * @text 画像Y座標
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param Actor_Scale
 * @desc 画像の拡大率。
 * @text 画像拡大率
 * @type number
 * @default 100
 * @min 0
 * 
 * @param ActorImgs
 * @text アクターグラフィック設定
 * 
 * @param defaultImg
 * @text デフォルト画像
 * @desc デフォルトの画像を表示します。
 * @type file
 * @dir img/pictures
 * @parent ActorImgs
 * 
 * @param deathImg
 * @text 戦闘不能画像
 * @desc 戦闘不能になった時の画像を表示します。指定しない場合は戦闘不能時に画像が透明になります。
 * @type file
 * @dir img/pictures
 * @parent ActorImgs
 * 
 * @param damageImg
 * @text ダメージ時画像
 * @desc ダメージを受けた時の画像を表示します。
 * @type file
 * @dir img/pictures
 * @parent ActorImgs
 * 
 * @param dyingImg
 * @text 瀕死時画像
 * @desc 瀕死の時の画像を表示します。
 * @type file
 * @dir img/pictures
 * @parent ActorImgs
 * 
 * @param stateImg
 * @text 被ステート時画像
 * @desc 被ステート時の画像を設定します。
 * @type struct<actorStateImgList>[]
 * @parent ActorImgs
 *  
 * @param ActorFace
 * @text 顔グラフィック設定
 * @desc アクターグラフィック設定時では表示されません。
 * 
 * @param deathFaceIndex
 * @desc 戦闘不能時のインデックス番号。
 * @text 戦闘不能時インデックス番号
 * @type number
 * @default -1
 * @min -1
 * @parent ActorFace
 * 
 * @param damageFaceIndex
 * @desc ダメージ時のインデックス番号。
 * @text ダメージ時インデックス番号
 * @type number
 * @default -1
 * @min -1
 * @parent ActorFace
 * 
 * @param dyingFaceIndex
 * @desc 瀕死時のインデックス番号。
 * @text 瀕死時インデックス番号
 * @type number
 * @default -1
 * @min -1
 * @parent ActorFace
 * 
 * @param stateFaceIndex
 * @text 被ステート時インデックス番号
 * @desc 被ステート時のインデックス番号。
 * @type struct<actorStateFaceIndexList>[]
 * @parent ActorFace
 * 
 * 
 * 
 */
/*~struct~actorStateImgList:
 * 
 * @param actorStateImg
 * @text 被ステート時画像
 * @desc 被ステート時の画像を表示します。
 * @type file
 * @dir img/pictures
 * 
 * @param stateImgId
 * @text 変化ID
 * @desc 変化するステートのIDを指定します。ステートのメモ欄に<faceChangeId:[id]>を記入してください。[id]:変化ID
 * @type number
 * 
 * @param Always
 * @desc 被ステート時画像変化。
 * @text 被ステート時の画像を戦闘不能以外変化しません。
 * @type boolean
 * @default false
 * 
 * @param priorityId
 * @text プロパティID
 * @desc プロパティID
 * @type number
 * @default 1
 * @min 0
 * 
 */
/*~struct~actorStateFaceIndexList:
 * 
 * @param actorStateIndex
 * @text 被ステート時インデックス番号
 * @desc 被ステート時のインデックス番号。
 * @type number
 * @default -1
 * @min -1
 * 
 * @param stateFaceId
 * @text 変化ID
 * @desc 変化するステートのIDを指定します。ステートのメモ欄に<faceChangeId:[id]>を記入してください。[id]:変化ID
 * @type number
 * @default 0
 * 
 * @param Always
 * @desc 被ステート時画像変化。
 * @text 被ステート時の画像を戦闘不能以外変化しません。
 * @type boolean
 * @default false
 * 
 * @param priorityId
 * @text プロパティID
 * @desc プロパティID
 * @type number
 * @default 1
 * @min 0
 * 
 */

var Imported = Imported || {};
Imported.NUUN_BattleStyleEX = true;

(() => {
const parameters = PluginManager.parameters('NUUN_BattleStyleEX');
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
const ActorCommandMode = true;
let onActorCommandRefresh = false;

const _BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
  _BattleManager_initMembers.call(this);
  this._actorIndex = -1;
};

BattleManager.selectActorIndex = function(index) {
  this._actorIndex = index;
};

const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
  _Game_Actor_initMembers.call(this);
  this._actorDamage = false;
}

Game_Actor.prototype.onDamage = function(value) {
  Game_Battler.prototype.onDamage.call(this, value)
  this._actorDamage = true;
};

Game_Enemy.prototype.attackAnimation = function() {
  return this.bareHandsAnimationId();
};

Game_Enemy.prototype.bareHandsAnimationId = function() {
  return $dataEnemies[this._enemyId].meta.AttackAnimation || 1;
};

const _Window_BattleLog_showEnemyAttackAnimation = Window_BattleLog.prototype.showEnemyAttackAnimation;
Window_BattleLog.prototype.showEnemyAttackAnimation = function(subject, targets) {
  this.showNormalAnimation(targets, subject.attackAnimation(), false);
};

const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
  this.createBackWindow();
  this.createActorSelectWindow();
  _Scene_Battle_createAllWindows.call(this);
};

const _Scene_Base_createWindowLayer = Scene_Base.prototype.createWindowLayer;
Scene_Base.prototype.createWindowLayer = function() {
  this._backLayer = new Window_BattleStatusLayer();
  this.addChild(this._backLayer);
  _Scene_Base_createWindowLayer.call(this);
};

Scene_Battle.prototype.createBackWindow = function() {
  const rect = this.statusWindowRect();
  this._statusWindow = new Window_BattleStatus(rect);
  this._backLayer.addChild(this._statusWindow);
};

Scene_Battle.prototype.createActorSelectWindow = function() {
  if (ActorCommandMode) {
    const rect = this.actorWindowRect();
    this._actorWindow = new Window_BattleActor(rect);
    this._actorWindow.setHandler("ok", this.onActorOk.bind(this));
    this._actorWindow.setHandler("cancel", this.onActorCancel.bind(this));
    this._backLayer.addChild(this._actorWindow);
  }
};

const _Scene_Battle_createActorWindow = Scene_Battle.prototype.createActorWindow;
Scene_Battle.prototype.createActorWindow = function() {
  if(!ActorCommandMode){
    _Scene_Battle_createActorWindow.call(this);
  }
};

Scene_Battle.prototype.createStatusWindow = function() {
  const rect = this.statusWindowRect();
  this._actorImgStatus = new Window_BattleActorImgStatus(rect);
  this._actorsStatus = new Window_BattleActorStatus(rect);
  this._backLayer.addChild(this._actorImgStatus);
  this.createFrontActors();
  this._backLayer.addChild(this._actorsStatus);
  this._statusWindow.setBattleActorImgStatus(this._actorImgStatus);
  this._statusWindow.setBattleActorStatus(this._actorsStatus);
};

const _Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
Scene_Battle.prototype.createActorCommandWindow = function() {
  _Scene_Battle_createActorCommandWindow.call(this);
  this._actorCommandWindow.setStatusWindow(this._statusWindow);
};

Scene_Battle.prototype.statusWindowRect = function() {
  const extra = 10;
  const ww = Graphics.boxWidth;
  const wh = this.windowAreaHeight() + extra - (param.WindowFrameShow ? 10 : 0);
  const wx = (Graphics.width - Graphics.boxWidth) / 2;
  const wy = Graphics.boxHeight - wh + extra - (param.WindowFrameShow ? 6 : 0);
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.partyCommandWindowRect = function() {
  const ww = Graphics.boxWidth;
  const wh = this.partyWindowAreaHeight();
  const wx = 0;
  const wy = this.partyCommand_YPosition();
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.partyCommand_YPosition = function() {
  if (param.PartyCommandPosition === 0) {
    return 0;
  } else if (param.PartyCommandPosition === 1) {
    return this._statusWindow.y / 2 - (this.partyWindowAreaHeight() / 2);
  } else {
    return Graphics.boxHeight - this.windowAreaHeight() - this.partyWindowAreaHeight() - 10;
  }
};

Scene_Battle.prototype.actorCommandWindowRect = function() {
  const ww = Math.min(Graphics.boxWidth / this._statusWindow.maxCols() - 12, 192);
  const wh = this.windowAreaHeight();
  const wx = 0;
  const wy = 0;
  return new Rectangle(wx, wy, ww, wh);
};

const _Scene_Battle_enemyWindowRect = Scene_Battle.prototype.enemyWindowRect;
Scene_Battle.prototype.enemyWindowRect = function() {
  const rect = _Scene_Battle_enemyWindowRect.call(this);
  rect.x = 0;
  return rect;
};

Scene_Battle.prototype.partyWindowAreaHeight = function() {
  return this.calcWindowHeight(1, true);
};

Scene_Battle.prototype.updateStatusWindowPosition = function() {
};

Scene_Battle.prototype.createFrontActors = function() {
  if (!$gameSystem.isSideView() && param.FrontViewActorEffect) {
    this._spriteset._actorSprites = [];
    this._frontSprite = new Sprite();
    this._backLayer.addChild(this._frontSprite);
    for (let i = 0; i < $gameParty.maxBattleMembers(); i++) {
      const sprite = new Sprite_Actor();
      this._spriteset._actorSprites.push(sprite);
      this._spriteset._battleFront.addChild(sprite);
    }
    this._frontSprite.addChild(this._spriteset._battleFront);
  }
};

const _Scene_Battle_start = Scene_Battle.prototype.start;
Scene_Battle.prototype.start = function() {
  _Scene_Battle_start.call(this);
  this._actorImgStatus.refresh();
  this._actorsStatus.refresh();
};

Scene_Battle.prototype.updateStatusWindowVisibility = function() {
    this._statusWindow.open();
    this.updateStatusWindowPosition();
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

const _Scene_Battle_onActorCancel = Scene_Battle.prototype.onActorCancel;
Scene_Battle.prototype.onActorCancel = function() {
  _Scene_Battle_onActorCancel.call(this);
  this._statusWindow.selectActor(BattleManager.actor());
};

const _Scene_Battle_startEnemySelection = Scene_Battle.prototype.startEnemySelection;
Scene_Battle.prototype.startEnemySelection = function() {
  _Scene_Battle_startEnemySelection.call(this);
  this._skillWindow.hide();
  this._itemWindow.hide();
  this._statusWindow.show();
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

const _Scene_Battle_startActorSelection = Scene_Battle.prototype.startActorSelection;
Scene_Battle.prototype.startActorSelection = function() {
  _Scene_Battle_startActorSelection.call(this);
  this._skillWindow.hide();
  this._itemWindow.hide();
  this._statusWindow.deselect();
};

const _Scene_Battle_selectPreviousCommand = Scene_Battle.prototype.selectPreviousCommand;
Scene_Battle.prototype.selectPreviousCommand = function() {
  _Scene_Battle_selectPreviousCommand.call(this);
  this._partyCommandWindow.opacity = 255;
};

const _Scene_Battle_endCommandSelection = Scene_Battle.prototype.endCommandSelection;
Scene_Battle.prototype.endCommandSelection = function() {
  _Scene_Battle_endCommandSelection.call(this);
  this._partyCommandWindow.opacity = 255;
};

const _Scene_Battle_onSelectAction = Scene_Battle.prototype.onSelectAction;
Scene_Battle.prototype.onSelectAction = function() {
  _Scene_Battle_onSelectAction.call(this);
  if(BattleManager.isTpb()){
    this._partyCommandWindow.opacity = 0;
  }
};


const _Sprite_Battler_setupDamagePopup = Sprite_Battler.prototype.setupDamagePopup;
Sprite_Battler.prototype.setupDamagePopup = function() {
  if(this._battler.isDamagePopupRequested()) {
    if(param.FrontViewActorEffect && !this._battler.isSpriteVisible()) {
      this.createDamageSprite();
    }
  }
  _Sprite_Battler_setupDamagePopup.call(this);
};

const _Sprite_Actor_initMembers = Sprite_Actor.prototype.initMembers;
Sprite_Actor.prototype.initMembers = function() {
  _Sprite_Actor_initMembers.call(this);
  this._spriteIndex = 0;
};

const _Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome;
Sprite_Actor.prototype.setActorHome = function(index) {
  if($gameSystem.isSideView()){
    _Sprite_Actor_setActorHome.call(this, index);
  } else {
    this.setHome(0, Graphics.boxHeight);
    this._spriteIndex = index;
  }
};

const _Sprite_Actor_update = Sprite_Actor.prototype.update;
Sprite_Actor.prototype.update = function() {
  _Sprite_Actor_update.call(this);
  if(!$gameSystem.isSideView()) {
    const width = Graphics.boxWidth / Math.max($gameParty.maxBattleMembers(), 4) - 4;
    const x = (Graphics.boxWidth / 2) - ((width / 2) * ($gameParty.battleMembers().length - 1)) + param.ActorEffect_X;
    this.setHome(this._spriteIndex * width + x, Graphics.boxHeight - 50 + param.ActorEffect_Y);
  }
};

const _Sprite_Actor_damageOffsetX = Sprite_Actor.prototype.damageOffsetX;
Sprite_Actor.prototype.damageOffsetX = function() {
  return ($gameSystem.isSideView() ? _Sprite_Actor_damageOffsetX.call(this) : Sprite_Battler.prototype.damageOffsetX.call(this)) + param.ActorDamage_X;
};

const _Sprite_Actor_damageOffsetY　= Sprite_Actor.prototype.damageOffsetY;
Sprite_Actor.prototype.damageOffsetY = function() {
  return (!$gameSystem.isSideView() ? -50 : 0) + _Sprite_Actor_damageOffsetY.call(this) + param.ActorDamage_Y;
};

const _Spriteset_Battle_createBattleField = Spriteset_Battle.prototype.createBattleField;
Spriteset_Battle.prototype.createBattleField = function() {
  _Spriteset_Battle_createBattleField.call(this);
  if(!$gameSystem.isSideView() && param.FrontViewActorEffect) {
    this._battleFront = new Sprite();
    this._battleFront.setFrame(0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this._battleFront.x = this._battleField.x;
    this._battleFront.y = this._battleField.y;
    this._effectsContainerFront = this._battleFront;
  }
};

const _Spriteset_Base_createAnimationSprite = Spriteset_Base.prototype.createAnimationSprite;
Spriteset_Base.prototype.createAnimationSprite = function(targets, animation, mirror, delay) {
  const mv = this.isMVAnimation(animation);
  const sprite = new (mv ? Sprite_AnimationMV : Sprite_Animation)();
  const targetSprites = this.makeTargetSprites(targets);
  const baseDelay = this.animationBaseDelay();
  const previous = delay > baseDelay ? this.lastAnimationSprite() : null;
  if (this.animationShouldMirror(targets[0])) {
      mirror = !mirror;
  }
  sprite.targetObjects = targets;
  sprite.setup(targetSprites, animation, mirror, delay, previous);
  const targetSprite = this.animationTarget(targetSprites);
  if(this._effectsContainerFront) {
    this._effectsContainer.effect = (targetSprite > 0 ? this._effectsContainerFront : this._effectsContainer);
  } else {
    this._effectsContainer.effect = this._effectsContainer;
  }
  this._effectsContainer.effect.addChild(sprite);
  this._animationSprites.push(sprite);
};

Spriteset_Base.prototype.removeAnimation = function(sprite) {
  this._animationSprites.remove(sprite);
  this._effectsContainer.effect.removeChild(sprite);
  for (const target of sprite.targetObjects) {
      if (target.endAnimation) {
          target.endAnimation();
      }
  }
  sprite.destroy();
};

Spriteset_Base.prototype.animationTarget = function(targetSprites){
  let a = 0;
  targetSprites.forEach(target => {
    if(target.constructor === Sprite_Actor) {
      a = 1;
    }
  });
  return a;
};


Window_PartyCommand.prototype.maxCols = function() {
  return (this._list ? Math.min(this._list.length, 4) : 4);
};

const _Window_ActorCommand_setup = Window_ActorCommand.prototype.setup;
Window_ActorCommand.prototype.setup = function(actor) {
  BattleManager.selectActorIndex(this.selectActor(actor));
  _Window_ActorCommand_setup.call(this, actor);
};

Window_ActorCommand.prototype.selectActor = function(actor) {
  const members = $gameParty.battleMembers();
  return members.indexOf(actor);
};

Window_ActorCommand.prototype.setStatusWindow = function(statusWindow) {
  this._statusWindow = statusWindow;
};

const _Window_ActorCommand_refresh = Window_ActorCommand.prototype.refresh;
Window_ActorCommand.prototype.refresh = function() {
  _Window_ActorCommand_refresh.call(this);
  if (BattleManager._actorIndex >= 0){
    const rect = this._statusWindow.itemRect(BattleManager._actorIndex);
    this.height = this.fittingHeight(Math.min(this.maxItems(), param.ActorCommandMaxRow));
    this.x = ((rect.width - this.width) / 2) + rect.x + this.itemPadding();
    this.y = Graphics.boxHeight - (this.height + this._statusWindow.height) - (param.WindowFrameShow ? 6 : 0);
    this.width = Math.min(this.width, rect.width);
  }
};

Window_ActorCommand.prototype.update = function() {
  Window_Selectable.prototype.update.call(this);
  if (BattleManager._actorIndex >= 0 && onActorCommandRefresh){
    this.refresh();
  }
  onActorCommandRefresh = false;
};

const _Window_BattleStatus_initialize = Window_BattleStatus.prototype.initialize;
Window_BattleStatus.prototype.initialize = function(rect) {
  this._nowActor = -1;
  this._actorImgSprite = [];
  _Window_BattleStatus_initialize.call(this, rect);
  this.frameVisible = param.WindowFrameShow ? true : false;
  this.opacity = param.WindowShow ? 255 : 0;
 };

 Window_BattleStatus.prototype.drawItemBackground = function(index) {
  const rect = this.itemRect(index);
  rect.x = this.drawItemStatusPosition(index);
  if((param.WindowShow && param.cursorBackShow) || param.cursorBackShow) {
    this.drawBackgroundRect(rect);
  }
};

Window_BattleStatus.prototype.preparePartyRefresh = function() {
  this.actorCursorRefresh();
  this._cursorRect.x = this.drawItemStatusPosition(BattleManager._actorIndex);
  this.refresh();
};

Window_BattleActor.prototype.preparePartyRefresh = function() {
  this.refresh();
};

Window_BattleStatus.prototype.actorCursorRefresh = function() {
  if($gameTemp.isBattleRefreshRequested()) {
    for(let i = 0; i < this.maxItems(); i++){
      if(this._nowActor === $gameParty._actors[i]){
        BattleManager.selectActorIndex(i);
      }
    }
  }
};

Window_BattleStatus.prototype.maxCols = function() {
  return Math.max($gameParty.maxBattleMembers(), 4);
};

Window_BattleStatus.prototype.select = function(index) {
  Window_Selectable.prototype.select.call(this, index);
  this._cursorRect.x = this.drawItemStatusPosition(index);
  this._nowActor = $gameParty._actors[index];
};

Window_BattleStatus.prototype.drawItem = function(index) {
  
};

Window_BattleStatus.prototype.drawItemStatusPosition = function(index) {
  const width = this.itemWidth();
  const Padding = this.colSpacing() / 2 - this.scrollBaseX();
  return Math.floor(this.innerWidth / 2) - (width * this.maxItems() / 2) + width * index + Padding;
};

Window_BattleStatus.prototype.placeGauge = function(actor, type, x, y) {
  const key = "actor%1-gauge-%2".format(actor.actorId(), type);
  const sprite = this.createInnerSprite(key, Sprite_BattleGauge);
  sprite.setup(actor, type);
  sprite.move(x, y);
  sprite.show();
};

Window_BattleStatus.prototype.drawItemStatus = function(index) { 
  const actor = this.actor(index);
  const rect = this.itemRectWithPadding(index);
  const nameX = param.NameChangePosition ? param.ActorName_X + rect.x : this.nameX(rect);
  const nameY = param.NameChangePosition ? param.ActorName_Y + rect.y : this.nameY(rect);
  const stateIconX = param.StateChangePosition ? param.ActorState_X + rect.x : this.stateIconX(rect);
  const stateIconY = param.StateChangePosition ? param.ActorState_Y + rect.y : this.stateIconY(rect);
  const timeX = param.TPBChangePosition ? param.ActorTPB_X + rect.x : nameX;
  const timeY = param.TPBChangePosition ? param.ActorTPB_Y + rect.y : nameY;
  if(param.TPBShow){
    this.placeTimeGauge(actor, timeX, timeY);
  }
  this.placeActorName(actor, nameX, nameY);
  this.placeStateIcon(actor, stateIconX, stateIconY);
  this.placeStatusGauges(actor, rect);
};

Window_BattleStatus.prototype.faceRect = function(index) {
  const rect = this.itemRect(index);
  rect.pad(-1);
  rect.x = param.FaceChangePosition ? param.ActorFace_X + rect.x : rect.x;
  rect.y = (param.FaceChangePosition ? param.ActorFace_Y + rect.y : rect.y) + 8;
  rect.width = param.ActorFace_Width > 0 ? param.ActorFace_Width : rect.width;
  rect.height = param.ActorFace_Height > 0 ? param.ActorFace_Height : this.nameY(rect) + this.gaugeLineHeight() / 2 - rect.y;
  return rect;
};

Window_BattleStatus.prototype.placeStatusGauges = function(actor, rect) {
  const basicGaugesX = this.basicGaugesX(rect);
  const basicGaugesY = this.basicGaugesY(rect);
  let x2 = param.HPChangePosition ? param.ActorHP_X + rect.x : basicGaugesX;
  let y2 = param.HPChangePosition ? param.ActorHP_Y + rect.y : basicGaugesY;
  this.placeGauge(actor, "hp", x2, y2);
  x2 = param.MPChangePosition ? param.ActorMP_X + rect.x : basicGaugesX;
  y2 = param.MPChangePosition ? param.ActorMP_Y + rect.y : basicGaugesY + this.gaugeLineHeight();
  this.placeGauge(actor, "mp", x2, y2);
  if ($dataSystem.optDisplayTp) {
    x2 = param.TPChangePosition ? param.ActorTP_X + rect.x : basicGaugesX;
    y2 = param.TPChangePosition ? param.ActorTP_Y + rect.y : basicGaugesY + this.gaugeLineHeight() * 2;
    this.placeGauge(actor, "tp", x2, y2);
  }
};

Window_BattleStatus.prototype.itemRect = function(index) {
  let rect = Window_Selectable.prototype.itemRect.call(this, index);
  const maxCols = this.maxCols();
  const padding = this.colSpacing() / 2 - this.scrollBaseX();
  const itemWidth = this.itemWidth();
  const col = index % maxCols;
  rect.x = (Math.floor(this.innerWidth / 2) - (itemWidth * this.maxItems() / 2)) + (itemWidth * col) + padding;
  return rect;
};

Window_BattleStatus.prototype.open = function() {
  Window_Base.prototype.open.call(this);
  Window_Base.prototype.open.call(this._battleActorStatus);
  Window_Base.prototype.open.call(this._battleActorImgStatus);
};

Window_BattleStatus.prototype.show = function() {
  Window_Base.prototype.show.call(this);
  Window_Base.prototype.show.call(this._battleActorStatus);
  Window_Base.prototype.show.call(this._battleActorImgStatus);
};

Window_BattleStatus.prototype.close = function() {
  Window_Base.prototype.close.call(this);
  Window_Base.prototype.close.call(this._battleActorStatus);
  Window_Base.prototype.close.call(this._battleActorImgStatus);
  //this._actorImgBaseSprite.visible = false;
};

Window_BattleStatus.prototype.hide = function() {
  Window_Base.prototype.hide.call(this);
  Window_Base.prototype.hide.call(this._battleActorStatus);
  Window_Base.prototype.hide.call(this._battleActorImgStatus);
};

Window_BattleStatus.prototype.setBattleActorStatus = function(actorStatus) {
  this._battleActorStatus = actorStatus;
};

Window_BattleStatus.prototype.setBattleActorImgStatus = function(actorImgStatus) {
  this._battleActorImgStatus = actorImgStatus;
};

function Window_BattleActorImgStatus() {
  this.initialize(...arguments);
}

Window_BattleActorImgStatus.prototype = Object.create(Window_BattleStatus.prototype);
Window_BattleActorImgStatus.prototype.constructor =　Window_BattleActorImgStatus;

Window_BattleActorImgStatus.prototype.initialize = function(rect) {
  Window_StatusBase.prototype.initialize.call(this, rect);
  this.openness = 0;
  this._bitmapsReady = 0;
  this.opacity = 0;
  this._additionalSprites = {};
  this._actorImgBaseSprite = new Sprite();
  this.addChild(this._actorImgBaseSprite);
  this.preparePartyRefresh();
};

Window_BattleActorImgStatus.prototype.drawItemBackground = function(index) {
};

Window_BattleActorImgStatus.prototype.preparePartyRefresh = function() {
  this._bitmapsReady = 0;
  this.actorImgDeta = [];
  for (const actor of $gameParty.members()) {
    let deta = this.battlreActorImgDeta(actor._actorId);
    deta.stateBitmap = [];
    if(deta.defaultImg) {
      deta.defaultBitmap = ImageManager.loadPicture(deta.defaultImg);
      bitmap = deta.defaultBitmap;
      if(deta.deathImg && param.ActorAnimation){
        deta.deathBitmap = ImageManager.loadPicture(deta.deathImg);
      }
      if(deta.damageImg && param.ActorAnimation){
        deta.damageBitmap = ImageManager.loadPicture(deta.damageImg);
      }
      if(deta.dyingImg && param.ActorAnimation){
        deta.dyingBitmap = ImageManager.loadPicture(deta.dyingImg);
      }
      if(deta.stateImg && param.ActorAnimation){
        for (const listdeta of deta.stateImg) {
          if(listdeta.actorStateImg && listdeta.stateImgId > 0){
            deta.stateBitmap[listdeta.stateImgId] = {};
            deta.stateBitmap[listdeta.stateImgId].deta = ImageManager.loadPicture(listdeta.actorStateImg);
            deta.stateBitmap[listdeta.stateImgId].always = listdeta.Always ? true : false;
            deta.stateBitmap[listdeta.stateImgId].priorityId = listdeta.priorityId;
          }
        }
      }
    } else {
      bitmap = ImageManager.loadFace(actor.faceName());
      if(deta.stateFaceIndex && param.ActorAnimation){
        for (const listdeta of deta.stateFaceIndex) {
          if(listdeta.actorStateIndex >= 0 && listdeta.stateFaceId > 0){
            deta.stateBitmap[listdeta.stateFaceId] = {};
            deta.stateBitmap[listdeta.stateFaceId].deta = listdeta.actorStateIndex;
            deta.stateBitmap[listdeta.stateFaceId].always = listdeta.Always ? true : false;
            deta.stateBitmap[listdeta.stateFaceId].priorityId = listdeta.priorityId;
          }
        }
      }
    }
    this.actorImgDeta.push(deta);
    bitmap.addLoadListener(this.performPartyRefresh.bind(this));
  }
};

Window_BattleActorImgStatus.prototype.drawItemImage = function(index) {
  const actor = $gameActors._data[$gameParty._actors[index]];
  const deta = this.actorImgDeta[index];
  if(deta.defaultImg) {
    const rect = this.itemRect(index);
    const key = "actor%1-img".format(actor.actorId());
    const sprite = this.createActorImgSprite(key, Sprite_ActorImg);
    sprite.bitmap = deta.defaultBitmap;
    x = rect.x - ((sprite.bitmap.width * deta.Actor_Scale / 100) - this.itemWidth())
    / 2 + param.ActorImg_X + deta.Actor_X + 12;
    y = rect.y + rect.height - (sprite.bitmap.height * deta.Actor_Scale / 100) + 20 + param.ActorImg_Y + deta.Actor_Y;
    sprite.scale.x = deta.Actor_Scale / 100;
    sprite.scale.y = deta.Actor_Scale / 100;
    sprite._imgIndex = 0;
    sprite._battler = actor;
    sprite._deta = deta;
    sprite.setup();
    sprite.move(x, y);
    sprite.show();
  } else {
    const rect = this.faceRect(index);
    const faceSprite = this.NUUN_drawFace(actor.actorId(), actor.faceName(), actor.faceIndex(), rect.x, rect.y, rect.width, rect.height);
    faceSprite._battler = actor;
    faceSprite._deta = deta;
    faceSprite._rectWidth = rect.width;
    faceSprite._rectHeight = rect.height;
    faceSprite.setup();
    faceSprite.show();
  }
};

Window_BattleActorImgStatus.prototype.NUUN_drawFace = function(actorId, faceName, faceIndex, x, y, width, height) {
  width = width || ImageManager.faceWidth;
  height = height || ImageManager.faceHeight;
  const key = "actor%1-img".format(actorId);
  const sprite = this.createActorImgSprite(key, Sprite_ActorImg);
  sprite.bitmap = ImageManager.loadFace(faceName);
  const pw = ImageManager.faceWidth;
  const ph = ImageManager.faceHeight;
  const sw = Math.min(width, pw);
  const sh = Math.min(height, ph);
  sprite.x = Math.floor(x + Math.max(width - pw, 0) / 2) + 8;
  sprite.y = Math.floor(y + Math.max(height - ph, 0) / 2);
  const sx = (faceIndex % 4) * pw + (pw - sw) / 2;
  const sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
  sprite.setFrame(sx, sy, sw, sh);
  sprite._imgIndex = 0;
  return sprite;
};

Window_BattleActorImgStatus.prototype.createActorImgSprite = function(key, spriteClass) {
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

Window_BattleActorImgStatus.prototype.battlreActorImgDeta = function(id) {
  const actors = param.ActorsImgList;
  const deta = actors.find(actor => actor.actorId === id);
  return deta ? deta : {actorId: id};
};

Window_BattleActorImgStatus.prototype.update = function() {
  Window_StatusBase.prototype.update.call(this);
  if ($gameTemp.isBattleRefreshRequested()) {
    this.preparePartyRefresh();
  }
};

Window_BattleActorImgStatus.prototype.drawItem = function(index) {
  this.drawItemImage(index);
};

Window_BattleActorImgStatus.prototype.open = function() {
  Window_Base.prototype.open.call(this);
  this._actorImgBaseSprite.visible = true;
};

Window_BattleActorImgStatus.prototype.close = function() {
  Window_Base.prototype.close.call(this);
  this._actorImgBaseSprite.visible = false;
};

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
  this.preparePartyRefresh();
};

Window_BattleActorStatus.prototype.preparePartyRefresh = function() {
  onActorCommandRefresh = true;
  $gameTemp.clearBattleRefreshRequest();
  this.refresh();
};

Window_BattleActorStatus.prototype.drawItemBackground = function(index) {
};

Window_BattleActorStatus.prototype.update = function() {
  Window_StatusBase.prototype.update.call(this);
  if ($gameTemp.isBattleRefreshRequested()) {
      this.preparePartyRefresh();
  }
};

Window_BattleActorStatus.prototype.drawItem = function(index) {
  this.drawItemStatus(index);
};


function Window_BattleStatusLayer() {
  this.initialize(...arguments);
}

Window_BattleStatusLayer.prototype = Object.create(Window.prototype);
Window_BattleStatusLayer.prototype.constructor = Window_BattleStatusLayer;

Window_BattleStatusLayer.prototype.initialize = function() {
  Window.prototype.initialize.call(this);

};


function Sprite_ActorImg() {
  this.initialize(...arguments);
}

Sprite_ActorImg.prototype = Object.create(Sprite.prototype);
Sprite_ActorImg.prototype.constructor = Sprite_ActorImg;

Sprite_ActorImg.prototype.initialize = function() {
  Sprite.prototype.initialize.call(this);
  this.initMembers();
};

Sprite_ActorImg.prototype.initMembers = function() {
  this._battler = null;
  this._imgIndex = 0;
  this._duration = 0;
  this._durationOpacity = 0;
};

Sprite_ActorImg.prototype.setup = function() {
  this.updateBitmap();
};

Sprite_ActorImg.prototype.update = function() {
  Sprite.prototype.update.call(this);
  this.updateBitmap();
};

Sprite_ActorImg.prototype.updateBitmap = function() {
  if(param.ActorAnimation){
    const actor = this._battler;
    const faceMode = this._deta.defaultImg ? false : true;
    let setOn = false;
    //console.log(actor.name()+" "+this._imgIndex)
    if(!setOn && actor.isDead()) {
      if(this._imgIndex !== 1) {
        this.setDead(actor, faceMode);
        setOn = true;
      }
    } else {
      if(!setOn && this._imgIndex === 1) {
        this.setRevive(actor);
        setOn = true;
      }
      if(!setOn && this.stateImgCheck(actor, faceMode, true)) {
        this.setState(actor, true, this.imgStockId);
        setOn = true;
      }
      if(!setOn && actor._actorDamage && this._imgIndex !== 3 && this._imgIndex < 2000) {
        this.setDamage(actor);
        setOn = true;
      }
      if(!setOn && this.stateImgCheck(actor, faceMode, false) && this._imgIndex !== 3) {
        this.setState(actor, false, this.imgStockId);
        setOn = true;
      }
      if(!setOn && this.dyingHp(actor) && this._imgIndex !== 2 && this._imgIndex !== 3 && this._imgIndex < 1000) {
        this.setDying(actor);
        setOn = true;
      }
      if(!setOn && this._imgIndex !== 0) {
        this.setDefaultImg(actor, faceMode);
        setOn = true;
      }
    }
    
    if(setOn){
      this.setDrawImg(actor, faceMode);
    }
    this.animationFrame();
  }
};

Sprite_ActorImg.prototype.setDead = function(actor, faceMode){
  if(faceMode && this._deta.deathFaceIndex < 0 || !faceMode && !this._deta.deathBitmap){
    this.setDeadDuration();
    this._durationOpacity = 255;
  }
  this._imgIndex = 1;
  actor._actorDamage = false;
};

Sprite_ActorImg.prototype.setRevive = function(actor){
  this.setDeadDuration();
  this._durationOpacity = -255;
  this._imgIndex = 0;
};

Sprite_ActorImg.prototype.setDamage = function(actor){
  this._imgIndex = 3;
  this.setDamageDuration();
  actor._actorDamage = false;
};

Sprite_ActorImg.prototype.setDying = function(actor){
  this._imgIndex = 2;
};

Sprite_ActorImg.prototype.setState = function(actor, mode, id){
  this._imgIndex = (mode ? 2000 : 1000 ) + Number(id);
};

Sprite_ActorImg.prototype.setDefaultImg = function(actor){
  if(this.getDuration() === 0){
    this._imgIndex = (this.dyingHp(actor) ? 2 : 0);
  }
};

Sprite_ActorImg.prototype.dyingHp = function(actor){
  return actor._hp <= param.dyingPercentage * actor.mhp / 100;
};

Sprite_ActorImg.prototype.stateImgCheck = function(actor, FaceMode, mode){
  this.imgStockId = -1;
  const deta = this.StateImg(actor, FaceMode, mode);
  if(this._imgIndex === (mode ? 2000 : 1000 ) + deta || deta <= 0){
    return false;
  }
  this.imgStockId = deta;
  return true;
};

Sprite_ActorImg.prototype.setDeadDuration = function(){
  this._duration = 30;
};

Sprite_ActorImg.prototype.setDamageDuration = function(){
  this._duration = param.damageImgFrame;
};

Sprite_ActorImg.prototype.getDuration = function(){
  return this._duration;
};

Sprite_ActorImg.prototype.faceRefresh = function(faceIndex) {
  const pw = ImageManager.faceWidth;
  const ph = ImageManager.faceHeight;
  const sw = Math.min(this._rectWidth, pw);
  const sh = Math.min(this._rectHeight, ph);
  const sx = (faceIndex % 4) * pw + (pw - sw) / 2;
  const sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
  this.setFrame(sx, sy, sw, sh);
};

Sprite_ActorImg.prototype.StateImg = function(actor, FaceMode, mode){
  let id = -1;
  let priority = 0;
  let priorityId = 0;
  if((FaceMode && !this._deta.stateFaceIndex) || (!FaceMode && !this._deta.stateImg)) {
    return -1;
  }
  actor._states.forEach(function(stateId) {
    const state = $dataStates[stateId];
    const faceChangeId = state.meta.FaceChangeId ? state.meta.FaceChangeId : 0;
    if(FaceMode) {
      if(faceChangeId > 0 && this._deta.stateBitmap[faceChangeId].deta >= 0 && mode === this._deta.stateBitmap[faceChangeId].always){
        priorityId = this._deta.stateBitmap[faceChangeId].priorityId;
        if(priority < priorityId) {
          priority = priorityId;
          id = faceChangeId;
        }
      }
    } else {
      if(faceChangeId > 0 && this._deta.stateBitmap[faceChangeId].deta && mode === this._deta.stateBitmap[faceChangeId].always){
        priorityId = this._deta.stateBitmap[faceChangeId].priorityId;
        if(priority < priorityId) {
          priority = priorityId;
          id = faceChangeId;
        }
      }
    }
  }, this);
  return id;
};

Sprite_ActorImg.prototype.setDrawImg = function(actor ,FaceMode){
  if(this._imgIndex === 1) {//戦闘不能
    if(FaceMode) {
      faceIndex = this._deta.deathFaceIndex;
      if(faceIndex >= 0) {
        this.faceRefresh(faceIndex);
      }
    } else {
      actorImg = this._deta.deathBitmap;
      if(actorImg) {
        this.bitmap = actorImg;
      }
    }
  } else if(this._imgIndex === 2) {//溺死
    if(FaceMode) {
      faceIndex = this._deta.dyingFaceIndex;
      if(faceIndex >= 0){
        this.faceRefresh(faceIndex);
      }
    } else {
      actorImg = this._deta.dyingBitmap;
      if(actorImg) {
        this.bitmap = actorImg;
      }
    }
  } else if(this._imgIndex === 3) {//ダメージ
    if(FaceMode) {
      faceIndex = this._deta.damageFaceIndex;
      if(faceIndex >= 0){
        this.faceRefresh(faceIndex);
      }
    } else {
      actorImg = this._deta.damageBitmap;
      if(actorImg) {
        this.bitmap = actorImg;
      }
    }
  } else if(this._imgIndex >= 1000) {//ステート
    if(this._deta.stateBitmap[this.imgStockId]) {
      if(FaceMode) {
        faceIndex = this._deta.stateBitmap[this.imgStockId].deta;
        if(faceIndex >= 0 && this._deta.stateBitmap[this.imgStockId].deta){
          this.faceRefresh(faceIndex);
        }
      } else {
        actorImg = this._deta.stateBitmap[this.imgStockId].deta;
        if(actorImg) {
          this.bitmap = actorImg;
        }
      }
    }
    this.imgStock = null;
  }else {
    if(FaceMode) {
      this.faceRefresh(actor.faceIndex());
    } else {
      this.bitmap = this._deta.defaultBitmap;
    }
  }
};

Sprite_ActorImg.prototype.animationFrame = function(){
  if(this.getDuration() > 0){
    this._duration -= 1;
    if(this._durationOpacity > 0){
      this.opacity -= 8.5;
      this.opacity = Math.max(this.opacity, 0);
      this._durationOpacity = this.opacity;
    } else if (this._durationOpacity < 0) {
      this.opacity += 8.5;
      this.opacity = Math.min(this.opacity, 255);
      this._durationOpacity = this.opacity - 255;
    }
  }
};

function Sprite_BattleGauge() {
  this.initialize(...arguments);
}

Sprite_BattleGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_BattleGauge.prototype.constructor = Sprite_BattleGauge;

Sprite_BattleGauge.prototype.initialize = function() {
  Sprite_Gauge.prototype.initialize.call(this);
};

Sprite_BattleGauge.prototype.bitmapWidth = function() {
  return param.GaugeWidth;
};

})();
