/*:-----------------------------------------------------------------------------------
 * NUUN_BattleStyleEX.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 更新履歴
 * 2020/12/6 Ver 1.0.0
 * 
 * 2020/12/7 Ver 1.0.1
 * バトラーアニメーションに勝利、詠唱時の画像を変更する機能を追加。
 */ 
/*:
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
 * <ChangeImgId:1>
 * 被ステート時に顔グラまたは、グラフィック画像がID１の画像に変化します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 
 * @parent ActorsButlers
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
 * @desc 背景を表示する。
 * @text 背景表示
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
 * @param ActorEffect_X
 * @desc アニメーションエフェクトのX座標
 * @text アニメーションエフェクトX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent Effect
 * 
 * @param ActorEffect_Y
 * @desc アニメーションエフェクトのY座標
 * @text アニメーションエフェクトY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent Effect
 * 
 * @param ActorDamage_X
 * @desc ダメージエフェクトのX座標
 * @text ダメージエフェクトX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent Effect
 * 
 * @param ActorDamage_Y
 * @desc ダメージエフェクトのY座標
 * @text ダメージエフェクトY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent Effect
 * 
 * 
 * @param ActorStatus
 * @text アクター設定
 * 
 * @param ActorsButlers
 * @text アクターの画像設定
 * @parent ActorStatus
 * 
 * @param ActorsButlerList
 * @text 画像設定
 * @desc アクターの画像設定
 * @default []
 * @type struct<actorsButlerList>[]
 * @parent ActorsButlers
 * 
 * @param damageImgFrame
 * @desc ダメージ時の画像変化フレーム。
 * @text ダメージ時変化フレーム
 * @type number
 * @default 30
 * @min 1
 * @parent ActorsButlers
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
/*~struct~actorsButlerList:
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
 * @param ActorButlers
 * @text アクターグラフィック設定
 * 
 * @param defaultImg
 * @text デフォルト画像
 * @desc デフォルトの画像を表示します。
 * @type file
 * @dir img/pictures
 * @parent ActorButlers
 * 
 * @param deathImg
 * @text 戦闘不能画像
 * @desc 戦闘不能になった時の画像を表示します。指定しない場合は戦闘不能時に画像が透明になります。
 * @type file
 * @dir img/pictures
 * @parent ActorButlers
 * 
 * @param damageImg
 * @text ダメージ時画像
 * @desc ダメージを受けた時の画像を表示します。
 * @type file
 * @dir img/pictures
 * @parent ActorButlers
 * 
 * @param dyingImg
 * @text 瀕死時画像
 * @desc 瀕死の時の画像を表示します。
 * @type file
 * @dir img/pictures
 * @parent ActorButlers
 * 
 * @param victoryImg
 * @text 勝利時画像
 * @desc 勝利時の画像を表示します。
 * @type file
 * @dir img/pictures
 * @parent ActorButlers
 * 
 * @param chantImg
 * @text 詠唱時画像
 * @desc 詠唱時の画像を表示します。
 * @type file
 * @dir img/pictures
 * @parent ActorButlers
 * 
 * @param stateImg
 * @text 被ステート時画像
 * @desc 被ステート時の画像を設定します。
 * @type struct<actorStateImgList>[]
 * @parent ActorButlers
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
 * @param victoryFaceIndex
 * @desc 勝利時のインデックス番号。
 * @text 勝利時インデックス番号
 * @type number
 * @default -1
 * @min -1
 * @parent ActorFace
 * 
 * @param chantFaceIndex
 * @desc 詠唱時のインデックス番号。
 * @text 詠唱時インデックス番号
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

//Scene_Battle
const _Scene_Battle_initialize = Scene_Battle.prototype.initialize;
Scene_Battle.prototype.initialize = function() {
  _Scene_Battle_initialize.call(this);
  this._battleMember = 0;
};

const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
  this._battleHudBack = this._spriteset._battleHudBack;
  this._battleHudFront = this._spriteset._battleHudFront;
  this._battleEffects = this._spriteset._battleEffects;
  this.createHud();
  this.createActorSelectWindow();
  _Scene_Battle_createAllWindows.call(this);
};

Scene_Battle.prototype.createHud = function() {
  const rect = this.statusWindowRect();
  this._statusWindow = new Window_BattleStatus(rect);
  this._battleHudBack.addChild(this._statusWindow);
};

Scene_Battle.prototype.createStatusWindow = function() {
  const rect = this.statusWindowRect();
  this._actorImges = new Window_BattleActorImges(rect);
  this._actorStatus = new Window_BattleActorStatus(rect);
  this._battleHudBack.addChild(this._actorImges);
  this._battleHudFront.addChild(this._actorStatus);
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
};

Scene_Battle.prototype.statusWindowRect = function() {
  const extra = 10;
  const ww = Graphics.boxWidth;
  const wh = this.windowAreaHeight() + extra - (param.WindowFrameShow ? 10 : 0);
  const wx = (Graphics.width - ww) / 2;
  const wy = (Graphics.height - Graphics.boxHeight) / 2 + Graphics.boxHeight - wh + extra - (param.WindowFrameShow ? 6 : 0) - 4;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.partyCommandWindowRect = function() {
  const ww = Graphics.boxWidth;
  const wh = this.partyWindowAreaHeight();
  const wx = 0;
  const wy = this.partyCommand_YPosition();
  return new Rectangle(wx, wy, ww, wh);
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

Scene_Battle.prototype.partyCommand_YPosition = function() {
  if (param.PartyCommandPosition === 0) {
    return 0;
  } else if (param.PartyCommandPosition === 1) {
    return this._statusWindow.y / 2 - (this.partyWindowAreaHeight() / 2);
  } else {
    return Graphics.boxHeight - this.windowAreaHeight() - this.partyWindowAreaHeight();
  }
};

const _Scene_Battle_start = Scene_Battle.prototype.start;
Scene_Battle.prototype.start = function() {
  _Scene_Battle_start.call(this);
  this._actorImges.refresh();
  this._actorStatus.refresh();
};

const _Scene_Battle_stop = Scene_Battle.prototype.stop;
Scene_Battle.prototype.stop = function() {
  _Scene_Battle_stop.call(this);
  this._actorImges.close();
  this._actorStatus.close();
};

Scene_Battle.prototype.updateStatusWindowVisibility = function() {
  this._statusWindow.open();
  this._actorImges.open();
  this._actorStatus.open();
  this.updateStatusWindowPosition();
};

const _Scene_Battle_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
Scene_Battle.prototype.startPartyCommandSelection = function() {
  _Scene_Battle_startPartyCommandSelection.call(this)
  this._actorImges.show();
  this._actorImges.open();
  this._actorStatus.show();
  this._actorStatus.open();
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

const _Scene_Battle_selectPreviousCommand = Scene_Battle.prototype.selectPreviousCommand;
Scene_Battle.prototype.selectPreviousCommand = function() {
  _Scene_Battle_selectPreviousCommand.call(this);
  this._partyCommandWindow.opacity = 255;
};

const _Scene_Battle_onSelectAction = Scene_Battle.prototype.onSelectAction;
Scene_Battle.prototype.onSelectAction = function() {
  _Scene_Battle_onSelectAction.call(this);
  if(BattleManager.isTpb()){
    this._partyCommandWindow.opacity = 0;
  }
};

const _Scene_Battle_endCommandSelection = Scene_Battle.prototype.endCommandSelection;
Scene_Battle.prototype.endCommandSelection = function() {
  _Scene_Battle_endCommandSelection.call(this);
  this._partyCommandWindow.opacity = 255;
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
};

//Window_PartyCommand
Window_PartyCommand.prototype.maxCols = function() {
  return (this._list ? Math.min(this._list.length, 4) : 4);
};

//Window_ActorCommand
Window_ActorCommand.prototype.selectActor = function(actor) {
  const members = $gameParty.battleMembers();
  return members.indexOf(actor);
};

const _Window_ActorCommand_refresh = Window_ActorCommand.prototype.refresh;
Window_ActorCommand.prototype.refresh = function() {
  _Window_ActorCommand_refresh.call(this);
  const actorIndex = this.selectActor(this._actor);
  if (actorIndex >= 0 || this._actor) {
    const rect = this._statusWindow.itemRect(actorIndex);
    this.height = this.fittingHeight(Math.min(this.maxItems(), param.ActorCommandMaxRow));
    this.width = Math.min(this.width, rect.width);
    this.x = ((rect.width - this.width) / 2) + rect.x + this.itemPadding();
    this.y = Graphics.boxHeight - (this.height + this._statusWindow.height) + (param.WindowFrameShow ? 0 : 6);
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
};

Window_BattleStatus.prototype.maxCols = function() {
  return Math.max($gameParty.maxBattleMembers(), 4);
};

Window_BattleStatus.prototype.drawItemBackground = function(index) {
  const rect = this.itemRect(index);
  if((param.WindowShow && param.cursorBackShow) || param.cursorBackShow) {
    this.drawBackgroundRect(rect);
  }
};

Window_BattleStatus.prototype.preparePartyRefresh = function() {
  this.refresh();
  this.commandRefresh();
  this.battleEffectsRefresh();
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

Window_BattleStatus.prototype.statusPosition = function(index) {
  const UiWidth = Graphics.boxWidth + 8;
  const width = this.itemWidth();
  const padding = this.colSpacing() / 2 - this.scrollBaseX();
  const x = Math.floor((UiWidth / 2) - ((UiWidth / this.maxCols()) * this.maxItems() / 2)) + padding;
  return x + width * index;
};

Window_BattleStatus.prototype.itemRect = function(index) {
  const rect = Window_Selectable.prototype.itemRect.call(this, index);
  rect.x = this.statusPosition(index);
  return rect;
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

const _Window_BattleStatus_faceRect = Window_BattleStatus.prototype.faceRect;
Window_BattleStatus.prototype.faceRect = function(index) {
  const rect = _Window_BattleStatus_faceRect.call(this,index);
  rect.x = param.FaceChangePosition ? param.ActorFace_X + rect.x : rect.x;
  rect.y = (param.FaceChangePosition ? param.ActorFace_Y + rect.y : rect.y) + 8;
  rect.width = param.ActorFace_Width > 0 ? param.ActorFace_Width : rect.width;
  rect.height = param.ActorFace_Height > 0 ? param.ActorFace_Height : rect.height;
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

Window_BattleStatus.prototype.placeGauge = function(actor, type, x, y) {
  const key = "actor%1-gauge-%2".format(actor.actorId(), type);
  const sprite = this.createInnerSprite(key, Sprite_BattleGauge);
  sprite.setup(actor, type);
  sprite.move(x, y);
  sprite.show();
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
  const sprite = new Sprite();
  this.addChild(sprite);
  this._actorImgBaseSprite = sprite;
  this.preparePartyRefresh();
};

Window_BattleActorImges.prototype.drawItemBackground = function(index) {
};

Window_BattleActorImges.prototype.preparePartyRefresh = function() {
  this._bitmapsReady = 0;
  this.actorSpriteDeta = [];
  for (const actor of $gameParty.members()) {
    const deta = this.battlreActorImges(actor._actorId);
    if(deta.defaultImg) {
      deta._onFace = false;
      this.loadBitmap(deta);
    } else {
      deta._onFace = true;
      this.loadFace(actor, deta);
    }
    this.actorSpriteDeta.push(deta);
    if(deta.defaultBitmap && !deta.defaultBitmap.isReady()){
      deta.defaultBitmap.addLoadListener(this.performPartyRefresh.bind(this));
    } else {
      this.performPartyRefresh(this);
    }
  }
};

Window_BattleActorImges.prototype.performPartyRefresh = function() {
  this._bitmapsReady++;
  if (this._bitmapsReady >= $gameParty.members().length) {
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
  deta.defaultBitmap = ImageManager.loadPicture(deta.defaultImg);
  if (deta.deathImg) {
    deta.deathBitmap = ImageManager.loadPicture(deta.deathImg);
  }
  if (deta.dyingImg) {
    deta.dyingBitmap = ImageManager.loadPicture(deta.dyingImg);
  }
  if (deta.damageImg) {
    deta.damageBitmap = ImageManager.loadPicture(deta.damageImg);
  }
  if (deta.victoryImg) {
    deta.victoryBitmap = ImageManager.loadPicture(deta.victoryImg);
  }
  if (deta.chantImg) {
    deta.chantBitmap = ImageManager.loadPicture(deta.chantImg);
  }
  if (deta.stateImg){
    for (const listdeta of deta.stateImg) {
      if(listdeta.actorStateImg && listdeta.stateImgId > 0){
        deta.stateBitmap[listdeta.stateImgId] = {};
        deta.stateBitmap[listdeta.stateImgId].imges = ImageManager.loadPicture(listdeta.actorStateImg);
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
  sprite.bitmap = deta.defaultBitmap;
  const x = rect.x + (this.itemWidth() - (sprite.bitmap.width * deta.Actor_Scale / 100)) / 2 + 4 + param.ActorImg_X + deta.Actor_X;
  const y = rect.y + rect.height - (sprite.bitmap.height * deta.Actor_Scale / 100) + 7 + param.ActorImg_Y + deta.Actor_Y;
  sprite.scale.x = deta.Actor_Scale / 100;
  sprite.scale.y = deta.Actor_Scale / 100;
  sprite._imgIndex = 0;
  sprite._battler = actor;
  sprite._deta = deta;
  sprite.setup();
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
  const pw = ImageManager.faceWidth;
  const ph = ImageManager.faceHeight;
  const sw = Math.min(width, pw);
  const sh = Math.min(height, ph);
  sprite.x = Math.floor(rect.x + Math.max(width - pw, 0) / 2) + 8;
  sprite.y = Math.floor(rect.y + Math.max(height - ph, 0) / 2);
  const sx = (actor.faceIndex() % 4) * pw + (pw - sw) / 2;
  const sy = Math.floor(actor.faceIndex() / 4) * ph + (ph - sh) / 2;
  sprite.setFrame(sx, sy, sw, sh);
  sprite._imgIndex = 0;
  sprite._battler = actor;
  sprite._deta = deta;
  sprite._rectWidth = rect.width;
  sprite._rectHeight = rect.height;
  sprite.setup();
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

Sprite_Actor.prototype.actorHomeRefresh = function(index) {
  const width = Graphics.boxWidth / Math.max($gameParty.maxBattleMembers(), 4) - 4;
  let x = (Graphics.boxWidth / 2) - ((width / 2) * ($gameParty.battleMembers().length - 1));
  this.setHome(index * width + x + param.ActorEffect_X, Graphics.boxHeight - 50 + param.ActorEffect_Y);
};

const _Sprite_Actor_setBattler = Sprite_Actor.prototype.setBattler;
Sprite_Actor.prototype.setBattler = function(battler) {
  _Sprite_Actor_setBattler.call(this, battler);
  if (battler && battler === this._actor && !$gameSystem.isSideView() && $gameTemp.isBattleEffectsRefresh()) {
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
  return ($gameSystem.isSideView() ? 0 : -50) + _Sprite_Actor_damageOffsetY.call(this) + param.ActorDamage_Y;
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
  this._imgIndex = 0;
  this._durationOpacity = 0;
  this._updateCount = 0;
  this._changeStateImgId = 0;
};

Sprite_ActorImges.prototype.setup = function() {
  this.updateBitmap();
};

Sprite_ActorImges.prototype.update = function() {
  Sprite.prototype.update.call(this);
  this.updateBitmap();
};

Sprite_ActorImges.prototype.faceRefresh = function(faceIndex) {
  const pw = ImageManager.faceWidth;
  const ph = ImageManager.faceHeight;
  const sw = Math.min(this._rectWidth, pw);
  const sh = Math.min(this._rectHeight, ph);
  const sx = (faceIndex % 4) * pw + (pw - sw) / 2;
  const sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
  this.setFrame(sx, sy, sw, sh);
};

Sprite_ActorImges.prototype.updateBitmap = function() {
  const actor = this._battler;
  if (actor) {
    const stateMotion = actor.stateMotionIndex();
    if (stateMotion === 3) {
      this.changeBitmap("dead");   
    } else if (stateMotion !== 3 && this._imgIndex === 1) {
      this.changeBitmap("revive");
    } else if ((stateMotion === 1 || stateMotion === 2) && this.stateImgCheck(true)) {
      this.changeBitmap("alwaysAbnormal");
    } else if (actor._imgIndex === 5 && this.changeCheck("victory")) {
      this.changeBitmap("victory");
    } else if (actor._imgIndex === 3 && this.changeCheck("damage")) {
      this.changeBitmap("damage");
    } else if (actor.isChanting() && this.changeCheck("chant")) {
      this.changeBitmap("chant");
    } else if ((stateMotion === 1 || stateMotion === 2) && this.stateImgCheck(false)) {
      this.changeBitmap("abnormal");
    } else if (actor.isDying() && this.changeCheck("dying")) {
      this.changeBitmap("dying");
    } else {
      this.changeBitmap("normal");
    }
    this.refreshBitmap();
    actor._imgIndex = 0;
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
    case "alwaysAbnormal":
      if (this._imgIndex < 2000) {
        this.setState(true);
        break;
      }
    case "abnormal":
      if (this._imgIndex < 1000) {
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

Sprite_ActorImges.prototype.setDead = function(){
  const mode = this.faceMode();
  if ((mode && this._deta.deathFaceIndex < 0) || (!mode && !this._deta.deathBitmap)) {
    this._updateCount = this.setDeadDuration();
    this._durationOpacity = 255;
  } else {
    this._updateCount = 1;
  }
  this._imgIndex = 1;
};

Sprite_ActorImges.prototype.setRevive = function(){
  const mode = this.faceMode();
  if ((mode && this._deta.deathFaceIndex < 0) || (!mode && !this._deta.deathBitmap)) {
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
  return 30;
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


function Sprite_BattleGauge() {
  this.initialize(...arguments);
}

//Sprite_BattleGauge
Sprite_BattleGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_BattleGauge.prototype.constructor = Sprite_BattleGauge;

Sprite_BattleGauge.prototype.initialize = function() {
  Sprite_Gauge.prototype.initialize.call(this);
};

Sprite_BattleGauge.prototype.bitmapWidth = function() {
  return param.GaugeWidth;
};

//Spriteset_Base
const _Spriteset_Base_makeTargetSprites = Spriteset_Base.prototype.makeTargetSprites;
Spriteset_Base.prototype.makeTargetSprites = function(targets) {
  const targetSprites = _Spriteset_Base_makeTargetSprites.call(this, targets);
  this._effectsContainer = this.animationTarget(targetSprites) ? this._effectsFrontContainer : this._effectsBackContainer;
  return targetSprites;
};

Spriteset_Base.prototype.animationTarget = function(targetSprites){
  if(!$gameSystem.isSideView()) {
    const target = targetSprites.find(targets => (targets.constructor === Sprite_Actor));
    return target ? true : false;
  }
  return false;
};

//Spriteset_Battle
const _Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
  _Spriteset_Battle_createLowerLayer.call(this);
  this.createBattleHud();
  this.createHudBack();
  this.createEffects();
  this.createHudStatus();
  this.createFrontActors();
};

Spriteset_Battle.prototype.createBattleHud = function() {
  const sprite = new Sprite();
  this._baseSprite.addChild(sprite);
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
  if(!$gameSystem.isSideView()) {
    this._actorSprites = [];
    for (let i = 0; i < $gameParty.maxBattleMembers(); i++) {
      const sprite = new Sprite_Actor();
      this._actorSprites.push(sprite);
      this._battleEffects.addChild(sprite);
    }
  }
};

const _Spriteset_Battle_createBattleField = Spriteset_Battle.prototype.createBattleField;
Spriteset_Battle.prototype.createBattleField = function() {
  _Spriteset_Battle_createBattleField.call(this);
  this._effectsBackContainer = this._battleField;
};

})();
