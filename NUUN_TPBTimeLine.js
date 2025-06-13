/*:-----------------------------------------------------------------------------------
 * NUUN_TPBTimeLine.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc TPBタイムライン
 * @author NUUN
 * @version 1.1.9
 * 
 * @help
 * 戦闘画面にTPBタイムラインを表示します。
 * バトラーが移動する方向は、上から下、下から上、左から右、右から左の4パターンから選択できます。
 * 
 * アクター、敵キャラのメモ欄
 * <TimeLineImg:[img]> 画像タイプを画像に指定したときに表示する画像ファイル名を設定します。未指定の場合はキャラチップが表示されます。
 * [img]:イメージファイル(拡張子なし)
 * 
 * 敵キャラのメモ欄
 * <TpbTimeLineCharacter:[img], [index]> 画像タイプをキャラチップに指定したときに表示する画像ファイル名を設定します。未指定の場合はモンスター画像で表示されます。
 * [img]:characters直下のイメージファイル(拡張子なし)
 * [index]:インデックス
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2025/6/14 Ver.1.1.9
 * サポートアクターVer.2に対応。
 * 2023/7/17 Ver.1.1.8
 * キャストアイコンが表示されない問題を修正。
 * 2023/7/15 Ver.1.1.7
 * 競合対策表示モードを追加。
 * 2023/2/25 Ver.1.1.6
 * バトラーが増えた時の処理を修正。
 * 2023/1/29 Ver.1.1.5
 * 逃走に失敗するとタイムラインからに大きくはみ出る問題を修正。
 * 2023/1/8 Ver.1.1.4
 * 横方向のタイムラインのアンカーを修正。
 * 2022/12/25 Ver.1.1.3
 * フレーム設定の説明を修正。
 * 2022/11/2 Ver.1.1.2
 * 同一敵が複数いるときに表示されるアルファベットの表示をON、OFFする機能を追加。
 * 2022/10/28 Ver.1.1.1
 * 対象選択時のアクターまたは敵のアイコンをフラッシュするように修正。
 * 2022/10/27 Ver.1.1.0
 * タイムラインの動作処理を修正。
 * 2022/7/10 Ver.1.0.1
 * 敵の画像設定を画像に指定すると戦闘開始時にエラーが出る問題を修正。
 * タイムラインの画面上の基本位置を設定する機能を追加。
 * 2022/7/9 Ver.1.0.0
 * 初版
 * 
 * 
 * @param Setting
 * @text 基本設定
 * @default ////////////////////////////////
 * 
 * @param TPBTimeLineImg
 * @desc タイムライン画像。
 * @text タイムライン画像
 * @type file
 * @dir img/
 * @default 
 * @parent Setting
 * 
 * @param TPBTimeLine_X
 * @desc タイムラインのX座標を指定します。
 * @text タイムラインX座標
 * @type number
 * @default 60
 * @max 9999
 * @min -9999
 * @parent Setting
 * 
 * @param TPBTimeLine_Y
 * @desc タイムラインのY座標を指定します。
 * @text タイムラインY座標
 * @type number
 * @default 20
 * @max 9999
 * @min -9999
 * @parent Setting
 * 
 * @param TPBTimeLineLength
 * @desc タイムラインの長さを指定します。
 * @text タイムライン長
 * @type number
 * @default 300
 * @max 9999
 * @min 0
 * @parent Setting
 * 
 * @param TimeLineDirection
 * @text タイムライン方向
 * @desc タイムライン上のバトラーを動かす方向を指定します。
 * @type select
 * @option 上から下
 * @value 'down'
 * @option 下から上
 * @value 'up'
 * @option 左から右
 * @value 'right'
 * @option 右から左
 * @value 'left'
 * @default 'up'
 * @parent Setting
 * 
 * @param TPBTimeLineBattlerHeight
 * @desc バトラーの表示高さを指定します。
 * @text バトラー表示高さ
 * @type number
 * @default 48
 * @max 9999
 * @min 0
 * @parent Setting
 * 
 * @param TimeLinePosition
 * @text タイムライン基本位置
 * @desc タイムラインの画面上に表示する基本位置を指定します。
 * @type select
 * @option 左
 * @value 'left'
 * @option 右
 * @value 'right'
 * @option 中央
 * @value 'center'
 * @default 'left'
 * @parent Setting
 * 
 * @param BattlerStatusShow
 * @text バトラーステータス非表示
 * @desc バトラーステータスの元のTPBゲージを表示しません。
 * @type boolean
 * @default true
 * @parent Setting
 * 
 * @param TPBTimeLineActionImg
 * @desc アクション部分の画像。(手前に表示されます)
 * @text アクション画像
 * @type file
 * @dir img/
 * @default 
 * @parent Setting
 * 
 * @param TPBTimeLineActionImg_X
 * @desc アクション部分画像のX座標を指定します。
 * @text アクション画像X座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent Setting
 * 
 * @param TPBTimeLineActionImg_Y
 * @desc アクション部分画像のY座標を指定します。
 * @text アクション画像Y座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent Setting
 * 
 * @param CastIconSetting
 * @text キャスト時のアイコン設定
 * @default ////////////////////////////////
 * 
 * @param CastIconId
 * @desc キャストタイム中に表示するアイコンIDを指定します。0に指定した場合はスキル、アイテムのアイコンが表示されます。
 * @text キャストタイムアイコンID
 * @type icon
 * @default 0
 * @parent CastIconSetting
 * 
 * @param CastIconScale
 * @desc キャストタイム中に表示するアイコンの拡大率(百分率)を指定します。
 * @text キャストタイムアイコン拡大率
 * @type number
 * @default 50
 * @parent CastIconSetting
 * 
 * @param FlameSetting
 * @text 移動フレーム設定
 * @default ////////////////////////////////
 * 
 * 
 * @param ActionDuration
 * @desc アクションの指定座標に移動するフレーム数。
 * @text アクション移動フレーム数
 * @type number
 * @default 60
 * @max 9999
 * @min 0
 * @parent Setting
 * 
 * @param ActionReturnDuration
 * @desc 初期位置の座標に戻る時の移動フレーム数。
 * @text 初期位置移動フレーム数
 * @type number
 * @default 3
 * @max 9999
 * @min 0
 * @parent Setting
 * 
 * @param ActionResetDuration
 * @desc アクション終了後チャージ完了時の座標に戻る時の移動フレーム数。
 * @text アクション終了後移動フレーム数
 * @type number
 * @default 6
 * @max 9999
 * @min 0
 * @parent Setting
 * 
 * @param ActorSetting
 * @text アクター設定
 * @default ////////////////////////////////
 * 
 * @param TimeLineActorImgMode
 * @text 表示アクター画像タイプ
 * @desc 表示するアクターの画像タイプを指定します。
 * @type select
 * @option キャラチップ
 * @value 'chip'
 * @option 画像
 * @value 'imges'
 * @default 'chip'
 * @parent ActorSetting
 * 
 * @param ActorImgDirekutoriy
 * @desc アクター表示画像のimgファイル直下のディレクトリを指定します。例:pictures またはpictures/sub
 * @text アクター表示画像ディレクトリファイル
 * @type string
 * @default pictures
 * @parent ActorSetting
 * 
 * @param TPBTimeLineActor_X
 * @desc タイムライン上アクターのX座標を指定します。(タイムラインX座標からの相対)
 * @text タイムラインアクターX座標
 * @type number
 * @default -30
 * @max 9999
 * @min -9999
 * @parent ActorSetting
 * 
 * @param TPBTimeLineActor_Y
 * @desc タイムライン上アクターのY座標を指定します。(タイムラインY座標からの相対)
 * @text タイムラインアクターY座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent ActorSetting
 * 
 * @param ActorCastTimeSetting
 * @text キャストタイム時設定
 * @default ////////////////////////////////
 * @parent ActorSetting
 * 
 * @param TPBTimeLineActorCastTimeImg
 * @desc キャストタイム時の画像。(アクター背後されます)
 * @text キャストタイム時画像
 * @type file
 * @dir img/
 * @default 
 * @parent ActorCastTimeSetting
 * 
 * @param ActorChargedSetting
 * @text チャージ完了時設定
 * @default ////////////////////////////////
 * @parent ActorSetting
 * 
 * @param ActorCharged
 * @desc チャージ完了時の座標を指定します。
 * @text チャージ完了時座標
 * @type number
 * @default 60
 * @max 9999
 * @min -9999
 * @parent ActorChargedSetting
 * 
 * @param ActorActionSetting
 * @text アクション時設定
 * @default ////////////////////////////////
 * @parent ActorSetting
 * 
 * @param TPBTimeLineActionActor_X
 * @desc アクション時のX座標を指定します。(タイムラインX座標からの相対)
 * @text アクション時X座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent ActorActionSetting
 * 
 * @param TPBTimeLineActionActor_Y
 * @desc アクション時のY座標を指定します。(タイムラインY座標からの相対)
 * @text アクション時Y座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent ActorActionSetting
 * 
 * 
 * @param EnemySetting
 * @text 敵キャラ設定
 * @default ////////////////////////////////
 * 
 * @param TimeLineEnemyImgMode
 * @text 表示敵キャラ画像タイプ
 * @desc 表示する敵キャラの画像タイプを指定します。
 * @type select
 * @option モンスター画像
 * @value 'enemy'
 * @option キャラチップ
 * @value 'chip'
 * @option 画像
 * @value 'imges'
 * @default 'enemy'
 * @parent EnemySetting
 * 
 * @param EnemyImgDirekutoriy
 * @desc 表示敵キャラ画像タイプが画像の時の敵キャラ表示画像のimgファイル直下のディレクトリを指定します。例:pictures またはpictures/sub
 * @text 敵キャラ表示画像ディレクトリファイル
 * @type string
 * @default pictures
 * @parent EnemySetting
 * 
 * @param TPBTimeLineEnemy_X
 * @desc タイムライン上敵キャラのX座標を指定します。
 * @text タイムライン敵キャラX座標
 * @type number
 * @default 30
 * @max 9999
 * @min -9999
 * @parent EnemySetting
 * 
 * @param TPBTimeLineEnemy_Y
 * @desc タイムライン上敵キャラのY座標を指定します。
 * @text タイムライン敵キャラY座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent EnemySetting
 * 
 * @param EnemyLetterShow
 * @text 敵アルファベット表示
 * @desc 同一敵が複数いるときに表示されるアルファベットを表示します。
 * @type boolean
 * @default true
 * @parent EnemySetting
 * 
 * @param EnemyCastTimeSetting
 * @text キャストタイム時設定
 * @default ////////////////////////////////
 * @parent ActorSetting
 * 
 * @param TPBTimeLineEnemyCastTimeImg
 * @desc キャストタイム時の画像。(敵キャラ画像背後されます)
 * @text キャストタイム時画像
 * @type file
 * @dir img/
 * @default 
 * @parent EnemyCastTimeSetting
 * 
 * @param EnemyChargedSetting
 * @text チャージ完了時時設定
 * @default ////////////////////////////////
 * @parent EnemySetting
 * 
 * @param EnemyCharged
 * @desc チャージ完了時の座標を指定します。
 * @text チャージ完了時座標
 * @type number
 * @default 60
 * @max 9999
 * @min -9999
 * @parent EnemySetting
 * 
 * @param EnemyActionSetting
 * @text アクション時設定
 * @default ////////////////////////////////
 * @parent EnemySetting
 * 
 * @param TPBTimeLineActionEnemy_X
 * @desc アクション時のX座標を指定します。(タイムラインX座標からの相対)
 * @text アクション時X座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent EnemyActionSetting
 * 
 * @param TPBTimeLineActionEnemy_Y
 * @desc アクション時のY座標を指定します。(タイムラインY座標からの相対)
 * @text アクション時Y座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent EnemyActionSetting
 * 
 * @param Anti-conflictSettings
 * @text 競合対策設定
 * @default ////////////////////////////////
 * 
 * @param TimeLineDisplayMode
 * @text タイムライン表示モード
 * @desc タイムラインの表示モードを指定します。
 * @type select
 * @option Sprite
 * @value 'Sprite'
 * @option Scene_Battle
 * @value 'Scene_Battle'
 * @default 'Sprite'
 * @parent Anti-conflictSettings
 * 
 * @param ShowSupportActor
 * @desc タイムラインにサポートアクターを表示します。(Ver.2.0.0以降)
 * @text サポートアクター表示
 * @type boolean
 * @default false
 * @parent Anti-conflictSettings
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_NUUN_TPBTimeLine = true;

(() => {
const parameters = PluginManager.parameters('NUUN_TPBTimeLine');

const TPBTimeLineImg = String(parameters['TPBTimeLineImg']);
const TPBTimeLineActionImg = String(parameters['TPBTimeLineActionImg']);
const TPBTimeLineActionImg_X = Number(parameters['TPBTimeLineActionImg_X'] || 0);
const TPBTimeLineActionImg_Y = Number(parameters['TPBTimeLineActionImg_Y'] || 0);
const TPBTimeLine_X= Number(parameters['TPBTimeLine_X'] || 60);
const TPBTimeLine_Y = Number(parameters['TPBTimeLine_Y'] || 20);
const CastIconId = Number(parameters['CastIconId'] || 0);
const CastIconScale = Number(parameters['CastIconScale'] || 50);
const TPBTimeLineLength = Number(parameters['TPBTimeLineLength'] || 300);
const ActorImgDirekutoriy = String(parameters['ActorImgDirekutoriy'] || 'pictures');
const EnemyImgDirekutoriy = String(parameters['EnemyImgDirekutoriy'] || 'pictures');
const TPBTimeLineBattlerHeight = Number(parameters['TPBTimeLineBattlerHeight'] || 48);
const ActionDuration = Number(parameters['ActionDuration'] || 60);
const ActionReturnDuration = Number(parameters['ActionReturnDuration'] || 3);
const ActionResetDuration = Number(parameters['ActionResetDuration'] || 6);
const TimeLineDirection = eval(parameters['TimeLineDirection']) || 'up';
const TimeLineActorImgMode = eval(parameters['TimeLineActorImgMode']) || 'chip';
const TimeLineEnemyImgMode = eval(parameters['TimeLineEnemyImgMode']) || 'enemy';
const TPBTimeLineActor_X = Number(parameters['TPBTimeLineActor_X'] || -30);
const TPBTimeLineActor_Y = Number(parameters['TPBTimeLineActor_Y'] || 0);
const TPBTimeLineActionActor_X = Number(parameters['TPBTimeLineActionActor_X'] || 0);
const TPBTimeLineActionActor_Y = Number(parameters['TPBTimeLineActionActor_Y'] || 0);
const TPBTimeLineEnemy_X= Number(parameters['TPBTimeLineEnemy_X'] || 30);
const TPBTimeLineEnemy_Y = Number(parameters['TPBTimeLineEnemy_Y'] || 0);
const TPBTimeLineActionEnemy_X = Number(parameters['TPBTimeLineActionEnemy_X'] || 0);
const TPBTimeLineActionEnemy_Y = Number(parameters['TPBTimeLineActionEnemy_Y'] || 0);
const TimeLinePosition = eval(parameters['TimeLinePosition']) || 'left';
const BattlerStatusShow = eval(parameters['BattlerStatusShow'] || "true");
const EnemyLetterShow = eval(parameters['EnemyLetterShow'] || "true");
const ActorCharged = Number(parameters['ActorCharged'] || 0);
const EnemyCharged = Number(parameters['EnemyCharged'] || 0);
const TimeLineDisplayMode = eval(parameters['TimeLineDisplayMode']) || 'Sprite';
const ShowSupportActor = eval(parameters['ShowSupportActor'] || "true");

function isDirectionUpDown() {
    return TimeLineDirection === 'up' || TimeLineDirection === 'down';
};

function _isShowSupportActor() {
    return Imported.NUUN_SupportActor && !!$gameParty.battleOmitSupportMembers && ShowSupportActor;
};

const _Game_Temp_requestBattleRefresh = Game_Temp.prototype.requestBattleRefresh;
Game_Temp.prototype.requestBattleRefresh = function() {
    _Game_Temp_requestBattleRefresh.call(this);
    if ($gameParty.inBattle()) {
        this.onTpbTimeLineRefreshRequest();
    }
};

Game_Temp.prototype.onTpbTimeLineRefreshRequest = function() {
    this._needsTpbTimeLineRefresh = true;
};

Game_Temp.prototype.clearTpbTimeLineRefreshRequest = function() {
    this._needsTpbTimeLineRefresh = false;
};

Game_Temp.prototype.isTpbTimeLineRefreshRequested = function() {
    return this._needsTpbTimeLineRefresh;
};


const _Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
Sprite_Enemy.prototype.setBattler = function(battler) {
    _Sprite_Enemy_setBattler.call(this, battler);
    $gameTemp.onTpbTimeLineRefreshRequest();
};


Game_Battler.prototype.getTimeLineTpbState = function() {
    if (this.isTpbCharged()) {
        return 'charged'
    } else if (this._tpbState === "acting") {
        return BattleManager._subject === this ? 'action' : 'charged';
    } else if (this._tpbState === "casting") {
        return 'casting'
    } else {
        return 'charge'
    }
};

const _Scene_Battle_createSpriteset = Scene_Battle.prototype.createSpriteset;
Scene_Battle.prototype.createSpriteset = function() {
    _Scene_Battle_createSpriteset.call(this);
    if (TimeLineDisplayMode === 'Scene_Battle') {
        this.addChild(this._spriteset.timeLineSprite);
    }
};

const _Spriteset_Battle_initialize = Spriteset_Battle.prototype.initialize;
Spriteset_Battle.prototype.initialize = function() {
    _Spriteset_Battle_initialize.call(this);
    this._tpbTimeLineActorMaxMembers = $gameParty.maxBattleMembers();
    this._tpbTimeLineEnemyMaxMembers = 8;//暫定
};

const _Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    _Spriteset_Battle_createLowerLayer.call(this);
    this.createTimeLine();
};

Spriteset_Battle.prototype.createTimeLine = function() {
    this.createTimeLineBase();
    this.createTimeLineGauge();
    this.createTimeLineImg();
    this.createTimeLineActor();
    this.createTimeLineEnemy();
    this.createTimeLineActionImg();
};

Spriteset_Battle.prototype.createTimeLineBase = function() {
    const sprite = new Sprite();
    this.addChild(sprite);
    sprite.x = TPBTimeLine_X + this.getTimeLinePosition();
    sprite.y = TPBTimeLine_Y;
    this.timeLineSprite = sprite;
};

Spriteset_Battle.prototype.createTimeLineGauge = function() {
    return;
    const sprite = new Sprite_TpbTimeLineGauge();
    this.addChild(sprite);
    sprite.setup(null, 'timeline');
    sprite.move(TPBTimeLine_X + this.getTimeLinePosition(), TPBTimeLine_Y);
};

Spriteset_Battle.prototype.createTimeLineImg = function() {
    const bitmap = ImageManager.nuun_LoadPictures(TPBTimeLineImg);
    const sprite = new Sprite(bitmap);
    sprite.anchor.x = getTimeLineAnchor();
    sprite.anchor.y = 0;
    this.timeLineSprite.addChild(sprite);
};

Spriteset_Battle.prototype.createTimeLineActionImg = function() {
    const bitmap = ImageManager.nuun_LoadPictures(TPBTimeLineActionImg);
    const sprite = new Sprite(bitmap);
    this.timeLineSprite.addChild(sprite);
    this.timeLineActionSprite = sprite;
    sprite.x = TPBTimeLineActionImg_X;
    sprite.y = TPBTimeLineActionImg_Y;
};

Spriteset_Battle.prototype.createTimeLineActor = function() {
    if (!this.timeLineBattler) {
        const sprite = new Sprite();
        this.timeLineSprite.addChild(sprite);
        this.timeLineBattler = sprite;
    }
    this.timeLineActor = [];
    if (!_isShowSupportActor()) {
        $gameTemp.omitSupportMember = true;
    }
    const members = $gameParty.battleMembers();
    for (let i = 0; i < members.length; i++) {
        const sprite = new Sprite_TimeLineActor();
        this.timeLineActor.push(sprite);
        this.timeLineBattler.addChild(sprite);
        sprite.setup(members[i]);
    }
    this._tpbTimeLineActorMaxMembers = this.timeLineActor.length;
};

Spriteset_Battle.prototype.createTimeLineEnemy = function() {
    if (!this.timeLineBattler) {
        const sprite = new Sprite();
        this.timeLineSprite.addChild(sprite);
        this.timeLineBattler = sprite;
    }
    this.timeLineEnemy = [];
    for (const enemy of this._enemySprites) {
        const sprite = new Sprite_TimeLineEnemy();
        this.timeLineEnemy.push(sprite);
        this.timeLineBattler.addChild(sprite);
        sprite.setup(enemy._battler);
    }
    this._tpbTimeLineEnemyMaxMembers = this.timeLineEnemy.length;
};

Spriteset_Battle.prototype.updateTimeLineActor = function() {
    for (let actor of this.timeLineActor) {
        actor.setup(null);
        actor._battlerName = null;
    }
    if (!_isShowSupportActor()) {
        $gameTemp.omitSupportMember = true;
    }
    const members = $gameParty.battleMembers();
    this._tpbTimeLineActorMaxMembers = members.length;
    for (let i = 0; i < this._tpbTimeLineActorMaxMembers; i++) {
        if (!this.timeLineActor[i]) {
            const sprite = new Sprite_TimeLineActor();
            this.timeLineActor.push(sprite);
            this.timeLineBattler.addChild(sprite);
        }
        this.timeLineActor[i].setup(members[i]);
    }
    this._tpbTimeLineActorMaxMembers = this.timeLineActor.length;
};

Spriteset_Battle.prototype.updateTimeLineEnemy = function() {
    const troop = this._enemySprites;
    const leng = troop > this._tpbTimeLineEnemyMaxMembers ? troop.length : this._tpbTimeLineEnemyMaxMembers;
    for (let i = 0; i < leng; i++) {
        if (!this.timeLineEnemy[i]) {
            const sprite = new Sprite_TimeLineEnemy();
            this.timeLineEnemy.push(sprite);
            this.timeLineBattler.addChild(sprite);
        }
        if (troop[i]) {
            this.timeLineEnemy[i].setup(troop[i]._battler);
        }
    }
    this._tpbTimeLineEnemyMaxMembers = this.timeLineEnemy.length;
};

Spriteset_Battle.prototype.updateTimeLineZ = function() {
    if (this.timeLineBattler) {
        if (TimeLineDirection === 'up') {
            this.timeLineBattler.children.sort(this.sortTimeLineUp.bind(this));
        } else if (TimeLineDirection === 'down') {
            this.timeLineBattler.children.sort(this.sortTimeLineDown.bind(this));
        } else if (TimeLineDirection === 'right') {
            this.timeLineBattler.children.sort(this.sortTimeLineRight.bind(this));
        } else if (TimeLineDirection === 'left') {
            this.timeLineBattler.children.sort(this.sortTimeLineLeft.bind(this));
        }
    }
};

Spriteset_Battle.prototype.sortTimeLineUp = function(a, b) {
    if (a.y !== b.y) {
        return b.y - a.y;
    } else {
        return b.spriteId - a.spriteId;
    }
};

Spriteset_Battle.prototype.sortTimeLineDown = function(a, b) {
    if (a.y !== b.y) {
        return a.y - b.y;
    } else {
        return b.spriteId - a.spriteId;
    }
};

Spriteset_Battle.prototype.sortTimeLineRight = function(a, b) {
    if (a.x !== b.x) {
        return a.x - b.x;
    } else {
        return b.spriteId - a.spriteId;
    }
};

Spriteset_Battle.prototype.sortTimeLineLeft = function(a, b) {
    if (a.x !== b.x) {
        return b.x - a.x;
    } else {
        return b.spriteId - a.spriteId;
    }
};

const _Spriteset_Battle_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
    _Spriteset_Battle_update.call(this);
    this.updateTpbTimeLine();
};

Spriteset_Battle.prototype.updateTpbTimeLine = function() {
    if ($gameTemp.isTpbTimeLineRefreshRequested()) {
        this.updateTimeLineActor();
        this.updateTimeLineEnemy();
        $gameTemp.clearTpbTimeLineRefreshRequest();
    }
    this.updateTimeLineZ();
};

Spriteset_Battle.prototype.getTimeLinePosition = function() {
    if (TimeLinePosition === 'left') {
        return 0;
    } else if (TimeLinePosition === 'right') {
        return Graphics.width;
    } else if (TimeLinePosition === 'center') {
        return Math.floor(Graphics.width / 2 - (isDirectionUpDown() ? 0 : TPBTimeLineLength / 2));
    }
};

function Sprite_TimeLine() {
    this.initialize(...arguments);
}

Sprite_TimeLine.prototype = Object.create(Sprite.prototype);
Sprite_TimeLine.prototype.constructor = Sprite_TimeLine;

Sprite_TimeLine.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.initMembers();
    this.createBitmap();
    this.setBattlerSprite();
    this.createText();
    this.createCastIcon();
};

Sprite_TimeLine.prototype.initMembers = function() {
    this.anchor.x = this.isVertical() ? 0.5 : 0.0;
    this.anchor.y = this.isVertical() ? 0.0 : 0.5;
    this._homeX = this.getTimeLineDefaultHomeX();
    this._homeY = this.getTimeLineDefaultHomeY();
    this._offsetX = 0;
    this._offsetY = 0;
    this._oldOffsetX = 0;
    this._oldOffsetY = 0;
    this._battler = null;
    this._battlerName = "";
    this._battlerHue = 0;
    this._battlerSprite = null;
    this._chipMode = false;
    this._imgMode = 'chip'
    this._return = false;
    this._duration = 0;
    this._durationFlame = 0;
    this._tpbState = '';
    this._targetX = 0;
    this._targetY = 0;
    this._selectionEffectCount = 0;
    this._action = null;
    this._castIcon = 0;
};

Sprite_TimeLine.prototype.isVertical = function() {
    return TimeLineDirection === 'up' || TimeLineDirection === 'down';
};

Sprite_TimeLine.prototype.isVerticalUp = function() {
    return TimeLineDirection === 'up';
};

Sprite_TimeLine.prototype.createBitmap = function() {
    const width = this.bitmapWidth();
    const height = this.bitmapHeight();
    this.bitmap = new Bitmap(width, height);
};

Sprite_TimeLine.prototype.bitmapWidth = function() {
    return 48;
};

Sprite_TimeLine.prototype.bitmapHeight = function() {
    return 48;
};

Sprite_TimeLine.prototype.textHeight = function() {
    return 24;
};

Sprite_TimeLine.prototype.initTpbBattlerPosition = function() {
    if (!this._battler) {
        this.x = this._homeX;
        this.y = this._homeY;
        this._tpbState = 'none';
        return;
    } else if (TimeLineDirection === 'up') {
        this.x = this._homeX + this.getOffSetX();
        this.y = this._homeY - (TPBTimeLineLength * this.getTimeLineRatio()) + this.getOffSetY();
    } else if (TimeLineDirection === 'down') {
        this.x = this._homeX + this.getOffSetX();
        this.y = this._homeY + TPBTimeLineLength * this.getTimeLineRatio() + this.getOffSetY();
    } else if (TimeLineDirection === 'right') {
        this.x = this._homeX + TPBTimeLineLength * this.getTimeLineRatio() + this.getOffSetY();
        this.y = this._homeY + this.getOffSetY();
    } else if (TimeLineDirection === 'left') {
        this.x = this._homeX - (TPBTimeLineLength * this.getTimeLineRatio()) + this.getOffSetX();
        this.y = this._homeY + this.getOffSetY();
    }
    this._tpbState = this.getTpbState();
};

Sprite_TimeLine.prototype.createText = function() {
    const sprite = new Sprite();
    this.addChild(sprite);
    this._textSprite = sprite;
    sprite.anchor.x = 0.0;
    sprite.anchor.y = 0.0;
    sprite.x -= this.bitmapWidth() / 2;
    this._textSprite.bitmap = new Bitmap(48, 48);
};

Sprite_TimeLine.prototype.createCastIcon = function() {
    const sprite = new Sprite_CastIcon();
    this._castIconSprite = sprite;
    this.addChild(sprite);
    sprite.x -= this.bitmapWidth() / 2;
    sprite.y -= this.bitmapHeight() / 2;
};

Sprite_TimeLine.prototype.setup = function(battler) {
    this._battler = battler;
    this.initTpbBattlerPosition();
};

Sprite_TimeLine.prototype.getTpbState = function() {
    const tpbState = this._battler._tpbState;
    if (this._return) {
        return 'return';
    } else if (tpbState === 'acting' && this.getTpbTime() < 1.0) {
        return 'charging';
    } else if (tpbState === 'casting' && this._battler.tpbRequiredCastTime() === 0) {
        return 'charged';
    }  else {
       return this._battler._tpbState;
    }
};

Sprite_TimeLine.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (this._battler) {
        this.updateBitmap();
        this.updateMove();
        this.updateCastIcon();
        this.updatePosition();
        this.updateSelectionEffect();
    } else {
        this._battlerSprite.bitmap = null;
        this._castIconSprite.setIcon(0);
    }
};

Sprite_TimeLine.prototype.updateCastIcon = function() {
    const action = this._battler.currentAction();
    if (action) {
        const item = action.item();
        this._castIcon = item ? item.iconIndex : 0;
    }
    if (this._battler.tpbRequiredCastTime() > 0 && this.isCasting()) {
        if (CastIconId > 0) {
            this._castIconSprite.setIcon(CastIconId);
        } else {
            this._castIconSprite.setIcon(this._castIcon);
        }
    } else if (this._tpbState === 'acting') {
        this._castIconSprite.setIcon(this._castIcon);
    } else {
        this._castIconSprite.setIcon(0);
    }
};

Sprite_TimeLine.prototype.updateTpbState = function() {
    if (!this._tpbState) {
        this.initTpbBattlerPosition();
    }
    const state = this.getTpbState();
    if (state !== this._tpbState) {
        if (this._tpbState === 'acting' && state !== 'acting') {
            this._duration = ActionResetDuration;
            this._durationFlame = ActionResetDuration;
            this._targetX = this.getOffSetX() + (this.isVertical() ? 0 : (this.getTimeLineDirection() > 0 ? TPBTimeLineLength : 0) + this.getChargedOffSet());
            this._targetY = this.getOffSetY() + (this.isVertical() ? (this.getTimeLineDirection() > 0 ? TPBTimeLineLength : 0) + this.getChargedOffSet() : 0);
            this._return = true;
        } else if (state === 'casting') {
            this._duration = ActionReturnDuration;
            this._durationFlame = ActionReturnDuration;
            this._targetX = this.getOffSetX() + this._homeX;
            this._targetY = this.getOffSetY() + this._homeY;
            this._return = false;
        } else if (state === 'return') {
            this._duration = ActionReturnDuration;
            this._durationFlame = ActionReturnDuration;
            this._targetX = this.getOffSetX() + this._homeX;
            this._targetY = this.getOffSetY() + this._homeY;
            this._return = false;
        } else if (state === 'acting') {
            this._duration = ActionDuration;
            this._durationFlame = ActionDuration;
            this._targetX = this.getOffSetX() + this.getActionOffSetX() + (!this.isVertical() && this.getTimeLineDirection() > 0 ? TPBTimeLineLength + this.getChargedOffSet() : 0);
            this._targetY = this.getOffSetY() + Math.floor(TPBTimeLineBattlerHeight / 2) + this.getActionOffSetY() + (this.isVertical() && this.getTimeLineDirection() > 0 ? TPBTimeLineLength + this.getChargedOffSet() : 0);
            this._return = false;
        } else {
            this._targetX = this.getOffSetX() + this._homeX;
            this._targetY = this.getOffSetY() + this._homeY;
        }
        this._tpbState = this.getTpbState();
        this._oldOffsetX = this.x;
        this._oldOffsetY = this.y;
    }
};

Sprite_TimeLine.prototype.updateMove = function() {
    this.updateTpbState();
    switch (this._tpbState) {
        case 'charging':
        case 'charged':
        case 'ready':
            this.updateCharge();
            break;
        case 'casting':
            this.updateCasting();
            break;
        case 'acting':
            this.updateAction();
            break;
        case 'return':
            this.updateActionReturn();
            break;
    }
};

Sprite_TimeLine.prototype.getReturnActionFlame = function() {
    return Math.max(Math.floor(ActionReturnDuration / (TPBTimeLineLength / Math.max(this.getActionOffSetX(), this.getActionOffSetY()))), 1)
};

Sprite_TimeLine.prototype.getTimeLineRatio = function() {
    return this.isCasting() || this.isTpbReady() ? this.getCastTime() / this._battler.tpbRequiredCastTime() : this.getTpbTime();
};

Sprite_TimeLine.prototype.getTimeLineDirection = function() {
    return TimeLineDirection === 'up' || TimeLineDirection === 'left' ? -1 : 1;
};

Sprite_TimeLine.prototype.isCharging = function() {
    return this.getTpbState() === 'charging';
};

Sprite_TimeLine.prototype.isCharged = function() {
    return this._battler.isTpbCharged();
};

Sprite_TimeLine.prototype.isCasting = function() {
    return this.getTpbState() === 'casting';
};

Sprite_TimeLine.prototype.isAction = function() {
    return this.getTpbState() === 'acting';
};

Sprite_TimeLine.prototype.isTpbReady = function() {
    return this._battler.isTpbReady();
};

Sprite_TimeLine.prototype.getTimeLineDefaultHomeX = function() {
    switch (TimeLineDirection) {
        case 'up':
        case 'down':
        case 'right':
            return 0;
        case 'left':
            return TPBTimeLineLength + this.getChargedOffSet();
    }
};

Sprite_TimeLine.prototype.getTimeLineDefaultHomeY = function() {
    switch (TimeLineDirection) {
        case 'up':
            return TPBTimeLineLength + Math.floor(TPBTimeLineBattlerHeight / 2) + this.getChargedOffSet();
        case 'down':
            return Math.floor(TPBTimeLineBattlerHeight / 2);
        case 'right':
        case 'left':
            return Math.floor(TPBTimeLineBattlerHeight / 2);
    }
};

Sprite_TimeLine.prototype.isReturnPosition = function() {
    if (TimeLineDirection === 'up') {
        return this.y < this._offsetY;
    } else if (TimeLineDirection === 'down') {
        return this.y > this._offsetY;
    } else if (TimeLineDirection === 'right') {
        return this.x > this._offsetX;
    } else if (TimeLineDirection === 'left') {
        return this.x < this._offsetX;
    }
};

Sprite_TimeLine.prototype.updateCharge = function() {
    let x = this.getOffSetX() + this._homeX;
    let y = this.getOffSetY() + this._homeY;
    if (TimeLineDirection === 'up') {
        x += 0;
        y += TPBTimeLineLength * this.getTimeLineRatio() * this.getTimeLineDirection();  
    } else if (TimeLineDirection === 'down') {
        x += 0;
        y += TPBTimeLineLength * this.getTpbTime() * this.getTimeLineDirection();
    } else if (TimeLineDirection === 'right') {
        x += TPBTimeLineLength * this.getTpbTime() * this.getTimeLineDirection();
        y += 0;
    } else if (TimeLineDirection === 'left') {
        x += TPBTimeLineLength * this.getTpbTime() * this.getTimeLineDirection();
        y += 0;
    }
    this._offsetX = x;
    this._offsetY = y;
    if (this.isReturnPosition() && this._duration === 0) {
        this._duration = ActionReturnDuration;
        this._durationFlame = ActionReturnDuration;
        this._targetX = this.getOffSetX() + this._homeX;
        this._targetY = this.getOffSetY() + this._homeY;
        this._oldOffsetX = this.x;
        this._oldOffsetY = this.y;
    }
};

Sprite_TimeLine.prototype.updateCasting = function() {
    let x = this.getOffSetX() + this._homeX;
    let y = this.getOffSetY() + this._homeY;
    const requiredCastTime = this._battler.tpbRequiredCastTime();
    const cast = requiredCastTime > 0 ? TPBTimeLineLength * (this.getCastTime() / requiredCastTime) : (TPBTimeLineLength * this.getTpbTime());
    if (TimeLineDirection === 'up') {
        x += 0;
        y += cast * this.getTimeLineDirection();
    } else if (TimeLineDirection === 'down') {
        x += 0;
        y += cast * this.getTimeLineDirection();
    } else if (TimeLineDirection === 'right') {
        x += cast * this.getTimeLineDirection();
        y += 0;
    } else if (TimeLineDirection === 'left') {
        x += cast * this.getTimeLineDirection();
        y += 0;
    }
    this._offsetX = x;
    this._offsetY = y;
    if (this.isReturnPosition() && this._duration === 0) {
        this._duration = ActionReturnDuration;
        this._durationFlame = ActionReturnDuration;
        this._targetX = this.getOffSetX() + this._homeX;
        this._targetY = this.getOffSetY() + this._homeY;
        this._oldOffsetX = this.x;
        this._oldOffsetY = this.y;
    }
};

Sprite_TimeLine.prototype.updateAction = function() {
    let x = this.getOffSetX();
    let y = this.getOffSetY() + Math.floor(TPBTimeLineBattlerHeight / 2);
    if (TimeLineDirection === 'up') {
        x += this.getActionOffSetX();
        y += this.getActionOffSetY();
    } else if (TimeLineDirection === 'down') {
        x += this.getActionOffSetX();
        y += this.getActionOffSetY() + TPBTimeLineLength + this.getChargedOffSet();
    } else if (TimeLineDirection === 'right') {
        x += this.getActionOffSetX() + TPBTimeLineLength + this.getChargedOffSet();
        y += this.getActionOffSetY();
    } else if (TimeLineDirection === 'left') {
        x += this.getActionOffSetX();
        y += this.getActionOffSetY();
    }
    this._offsetX = x;
    this._offsetY = y;
};

Sprite_TimeLine.prototype.updateActionReturn = function() {
    let x = 0;
    let y = 0;
    if (TimeLineDirection === 'up') {
        x = 0;
        y = TPBTimeLineLength * this.getTimeLineDirection();
    } else if (TimeLineDirection === 'down') {
        x = 0;
        y = TPBTimeLineLength * this.getTimeLineDirection();
    } else if (TimeLineDirection === 'right') {
        x = TPBTimeLineLength  * this.getTimeLineDirection();
        y = 0;
    } else if (TimeLineDirection === 'left') {
        x = TPBTimeLineLength * this.getTimeLineDirection();
        y = 0;
    }
    this._offsetX = x + this.getOffSetX() + this._homeX;
    this._offsetY = y + this.getOffSetY() + this._homeY;
};

Sprite_TimeLine.prototype.updatePosition = function() {
    if (this._duration > 0) {
        this.x += (this._targetX - this._oldOffsetX) / this._durationFlame;
        this.y += (this._targetY - this._oldOffsetY) / this._durationFlame;
        this.positionX();
        this.positionY();
        this._duration--;
        if (this._duration === 0) {
            this._return = false;
        }
    } else {
        this.x = this._offsetX;
        this.y = this._offsetY;
    }
};

Sprite_TimeLine.prototype.positionX = function() {
    if (this._oldOffsetX > this._targetX) {
        this.x = Math.max(this.x, this._offsetX);
    } else {
        this.x = Math.min(this.x, this._offsetX);
    }
};

Sprite_TimeLine.prototype.positionY = function() {
    if (this._oldOffsetY > this._targetY) {
        this.y = Math.max(this.y, this._offsetY);
    } else {
        this.y = Math.min(this.y, this._offsetY);

    }
};

Sprite_TimeLine.prototype.patternWidth = function() {
    return this._isBigCharacter ? this._battlerSprite.bitmap.width / 3 : this._battlerSprite.bitmap.width / 12;
};

Sprite_TimeLine.prototype.patternHeight = function() {
    return this._isBigCharacter ? this._battlerSprite.bitmap.height / 4 : this._battlerSprite.bitmap.height / 8;
};

Sprite_TimeLine.prototype.characterFrame = function() {
    const pw = this.patternWidth();
    const ph = this.patternHeight();
    const sx = (this.characterBlockX() + 0) * pw;
    const sy = (this.characterBlockY() + 0) * ph;
    this._battlerSprite.setFrame(sx, sy, pw, ph);
};

Sprite_TimeLine.prototype.getTpbTime = function() {
    return Math.max(this._battler.tpbChargeTime(), 0);
};

Sprite_TimeLine.prototype.getCastTime = function() {
    return this._battler._tpbCastTime || 0;
};

Sprite_TimeLine.prototype.initVisibility = function() {
    this._appeared = this._battler.isAlive();
    if (!this._appeared) {
        this.opacity = 0;
    } else {
        this.opacity = 255;
    }
};

Sprite_TimeLine.prototype.updateSelectionEffect = function() {
    if (this._battler.isSelected()) {
        this._selectionEffectCount++;
        if (this._selectionEffectCount % 30 < 15) {
            this.setBlendColor([255, 255, 255, 64]);
        } else {
            this.setBlendColor([0, 0, 0, 0]);
        }
    } else if (this._selectionEffectCount > 0) {
        this._selectionEffectCount = 0;
        this.setBlendColor([0, 0, 0, 0]);
    }
};


function Sprite_TimeLineActor() {
    this.initialize(...arguments);
}

Sprite_TimeLineActor.prototype = Object.create(Sprite_TimeLine.prototype);
Sprite_TimeLineActor.prototype.constructor = Sprite_TimeLineActor;

Sprite_TimeLineActor.prototype.initialize = function() {
    Sprite_TimeLine.prototype.initialize.call(this);
    this._isBigCharacter = false;
};

Sprite_TimeLineActor.prototype.updateBitmap = function() {
    this.updateActor();
    this.initVisibility();
};

Sprite_TimeLineActor.prototype.setHome = function() {
    this._homeX = 0;
    this._homeY = Math.floor(TPBTimeLineBattlerHeight / 2);
};

Sprite_TimeLineActor.prototype.getOffSetX = function() {
    return TPBTimeLineActor_X;
};

Sprite_TimeLineActor.prototype.getOffSetY = function() {
    return TPBTimeLineActor_Y;
};

Sprite_TimeLineActor.prototype.getActionOffSetX = function() {
    return TPBTimeLineActionActor_X;
};

Sprite_TimeLineActor.prototype.getActionOffSetY = function() {
    return TPBTimeLineActionActor_Y;
};

Sprite_TimeLineActor.prototype.getChargedOffSet = function() {
    return ActorCharged;
};

Sprite_TimeLineActor.prototype.setBattlerSprite = function() {
    const sprite = new Sprite();
    this.addChild(sprite);
    this._battlerSprite = sprite;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
};

Sprite_TimeLineActor.prototype.updateActor = function() {
    const name = this._battler.name();
    if (this._battlerName !== name) {
        this._battlerName = name;
        this.loadActorBitmap(name);
    }
};

Sprite_TimeLineActor.prototype.loadActorBitmap = function(name) {
    let bitmap = null;
    if (TimeLineActorImgMode === 'chip') {
        bitmap = this.getCharacterBitmap();
    } else if (TimeLineActorImgMode === 'imges') {
        bitmap = this.getLoadBitmap();
    }
    if (bitmap && !bitmap.isReady()) {
        bitmap.addLoadListener(this.setBitmap.bind(this, bitmap));
    } else if (bitmap) {
        this.setBitmap(bitmap)
    } else {
        this._battlerSprite.bitmap = null;
    }
};

Sprite_TimeLineActor.prototype.setBitmap = function(bitmap) {
    this._battlerSprite.bitmap = bitmap;
    let height = TPBTimeLineBattlerHeight;
    if (this._imgMode === 'chip') {
        height *= this._isBigCharacter ? 4 : 8;
        this.characterFrame();
    }
    const scale = Math.min(height / this._battlerSprite.bitmap.height, 1.0);
    this._battlerSprite.scale.x = scale;
    this._battlerSprite.scale.y = scale;
};

Sprite_TimeLineActor.prototype.getCharacterBitmap = function() {
    const characterName = this._battler.characterName();
    bitmap = ImageManager.loadCharacter(characterName);
    this._isBigCharacter = ImageManager.isBigCharacter(characterName);
    this._imgMode = 'chip';
    return bitmap;
};

Sprite_TimeLineActor.prototype.getLoadBitmap = function() {
    const img = this._battler.actor().meta.TimeLineImg;
    if (img) {
        this._imgMode = 'img';
        const url = ActorImgDirekutoriy + '/' + img;
        return ImageManager.nuun_LoadPictures(url);
    } else {
        return this.getCharacterBitmap();
    }
};

Sprite_TimeLineActor.prototype.characterBlockX = function() {
    if (this._isBigCharacter) {
        return 0;
    } else {
        const index = this._battler.characterIndex();
        return (index % 4) * 3;
    }
};

Sprite_TimeLineActor.prototype.characterBlockY = function() {
    if (this._isBigCharacter) {
        return 0;
    } else {
        const index = this._battler.characterIndex();
        return Math.floor(index / 4) * 4;
    }
};

function Sprite_TimeLineEnemy() {
    this.initialize(...arguments);
}

Sprite_TimeLineEnemy.prototype = Object.create(Sprite_TimeLine.prototype);
Sprite_TimeLineEnemy.prototype.constructor = Sprite_TimeLineEnemy;

Sprite_TimeLineEnemy.prototype.initialize = function() {
    Sprite_TimeLine.prototype.initialize.call(this);
    this._chipIndex = -1;
};

Sprite_TimeLineEnemy.prototype.updateBitmap = function() {
    this.updateEnemy();
    this.initVisibility();
};

Sprite_TimeLineEnemy.prototype.setHome = function() {
    this._homeX = 0;
    this._homeY = Math.floor(TPBTimeLineBattlerHeight / 2);
};

Sprite_TimeLineEnemy.prototype.getOffSetX = function() {
    return TPBTimeLineEnemy_X;
};

Sprite_TimeLineEnemy.prototype.getOffSetY = function() {
    return TPBTimeLineEnemy_Y;
};

Sprite_TimeLineEnemy.prototype.getActionOffSetX = function() {
    return TPBTimeLineActionEnemy_X;
};

Sprite_TimeLineEnemy.prototype.getActionOffSetY = function() {
    return TPBTimeLineActionEnemy_Y;
};

Sprite_TimeLineEnemy.prototype.getChargedOffSet = function() {
    return EnemyCharged;
};

Sprite_TimeLineEnemy.prototype.setBattlerSprite = function() {
    const sprite = new Sprite();
    this.addChild(sprite);
    this._battlerSprite = sprite;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
};

Sprite_TimeLineEnemy.prototype.updateEnemy = function() {
    const name = this._battler.battlerName();
    const hue = this._battler.battlerHue();
    const letter = this.getEnemyLetter();
    if (this._battlerName !== name || this._battlerHue !== hue || this._battlerLetter !== letter) {
        this._battlerName = name;
        this._battlerHue = hue;
        this._battlerLetter = letter;
        this.loadEnemyBitmap(name);
        if (this._imgMode === 'enemy') {
            this.setHue(hue);
        }
    }
};

Sprite_TimeLineEnemy.prototype.loadEnemyBitmap = function(name) {
    let bitmap = null;
    if (TimeLineEnemyImgMode === 'enemy') {
        bitmap = this.getEnemyBitmap(name);
    } else if (TimeLineEnemyImgMode === 'chip') {
        bitmap = this.getCharacterBitmap(name);
    } else if (TimeLineEnemyImgMode === 'imges') {
        bitmap = this.getEnemyImgBitmap(name);
    }
    if (bitmap && !bitmap.isReady()) {
        bitmap.addLoadListener(this.setBitmap.bind(this, bitmap));
    } else if (bitmap) {
        this.setBitmap(bitmap)
    } else {
        this._battlerSprite.bitmap = null;
    }
};

Sprite_TimeLineEnemy.prototype.getEnemyBitmap = function(name) {
    this._imgMode = 'enemy';
    if ($gameSystem.isSideView()) {
        return ImageManager.loadSvEnemy(name);
    } else {
        return ImageManager.loadEnemy(name);
    }
};

Sprite_TimeLineEnemy.prototype.getEnemyImgBitmap = function(name) {
    const img = this._battler.enemy().meta.TimeLineImg;
    if (img) {
        this._imgMode = 'img';
        const url = EnemyImgDirekutoriy + '/' + img;
        return ImageManager.nuun_LoadPictures(url);
    } else {
        return this.getEnemyBitmap(name);
    }
};

Sprite_TimeLineEnemy.prototype.getCharacterBitmap = function(name) {
    const data = this._battler.enemy().meta.TpbTimeLineCharacter;
    if (data) {
        const url = data.split(',');
        bitmap = ImageManager.loadCharacter(url[0]);
        this._isBigCharacter = ImageManager.isBigCharacter(url[0]);
        this._imgMode = 'chip';
        this._chipIndex = Number(url[1]);
        return bitmap;
    } else {
        return this.getEnemyBitmap(name);
    }
};

Sprite_TimeLineEnemy.prototype.setHue = function(hue) {
    Sprite_Battler.prototype.setHue.call(this, hue);
};

Sprite_TimeLineEnemy.prototype.setBitmap = function(bitmap) {
    this._battlerSprite.bitmap = bitmap;
    const bitmapWidth = bitmap.width;
    const bitmapHeight = bitmap.height;
    let height = TPBTimeLineBattlerHeight;
    let width = 60;
    if (this._imgMode === 'chip') {
        height *= this._isBigCharacter ? 4 : 8;
        width *= this._isBigCharacter ? 3 : 12;
        this.characterFrame();
    }
    const scaleW = Math.min((width / bitmapWidth), 1.0);
    const scaleH = Math.min((height / bitmapHeight), 1.0);
    const scale = scaleW < scaleH ? scaleW : scaleH;
    this._battlerSprite.scale.x = scale;
    this._battlerSprite.scale.y = scale;
    this.drawLetter();
};

Sprite_TimeLineEnemy.prototype.drawLetter = function() {
    if (EnemyLetterShow) {
        const text = this.getEnemyLetter();
        const width = this.bitmapWidth();
        const height = this.textHeight();
        this._textSprite.bitmap.drawText(text, 0, 0, width, height, "left");
    }
};

Sprite_TimeLineEnemy.prototype.getEnemyLetter = function() {
    return (this._battler._plural ? this._battler._letter : "");
};

Sprite_TimeLineEnemy.prototype.getCastIconIndex = function() {
    return this._castIconIndex;
};

Sprite_TimeLineEnemy.prototype.characterBlockX = function() {
    if (this._isBigCharacter) {
        return 0;
    } else {
        const index = this._chipIndex;
        return (index % 4) * 3;
    }
};

Sprite_TimeLineEnemy.prototype.characterBlockY = function() {
    if (this._isBigCharacter) {
        return 0;
    } else {
        const index = this._chipIndex;
        return Math.floor(index / 4) * 4;
    }
};


function Sprite_CastIcon() {
    this.initialize(...arguments);
}

Sprite_CastIcon.prototype = Object.create(Sprite.prototype);
Sprite_CastIcon.prototype.constructor = Sprite_CastIcon;

Sprite_CastIcon.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.initMembers();
    this.loadBitmap();
};

Sprite_CastIcon.prototype.initMembers = function() {
    this._iconIndex = 0;
    this.anchor.x = 0;
    this.anchor.y = 0;
    this.scale.x = CastIconScale / 100;
    this.scale.y = CastIconScale / 100;
};

Sprite_CastIcon.prototype.loadBitmap = function() {
    this.bitmap = ImageManager.loadSystem("IconSet");
    this.setFrame(0, 0, 0, 0);
};

Sprite_CastIcon.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateFrame();
};

Sprite_CastIcon.prototype.updateFrame = function() {
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (this._iconIndex % 16) * pw;
    const sy = Math.floor(this._iconIndex / 16) * ph;
    this.setFrame(sx, sy, pw, ph);
};

Sprite_CastIcon.prototype.setIcon = function(id) {
    this._iconIndex = id;
};

if (BattlerStatusShow) {
    const _Window_StatusBase_placeTimeGauge = Window_StatusBase.prototype.placeTimeGauge;
    Window_StatusBase.prototype.placeTimeGauge = function(actor, x, y) {
        if (String(this.constructor.name) === 'Window_BattleStatus') {
            if (!BattlerStatusShow) {
               _Window_StatusBase_placeTimeGauge.call(this, actor, x, y);
            }
        }
    };
};

function getTimeLineAnchor() {
    switch (TimeLineDirection) {
        case 'up':
        case 'down':
            return 0.5;
        case 'right':
            return 0.0;
        case 'left': 
        return 1.0;
    }
};


})();