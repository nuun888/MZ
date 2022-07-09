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
 * @version 1.0.0
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
 * 2022/7/9 Ver.1.0.0
 * 初版
 * 
 * 
 * @param Setting
 * @text 共通設定
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
 * @param ActionDuration
 * @desc アクション時の指定座標に移動するフレーム数。
 * @text アクション移動フレーム数
 * @type number
 * @default 0
 * @max 9999
 * @min 0
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
 * @text アクション部画像
 * @type file
 * @dir img/
 * @default 
 * @parent Setting
 * 
 * @param TPBTimeLineActionImg_X
 * @desc アクション部画像のX座標を指定します。
 * @text アクション部画像X座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * @parent Setting
 * 
 * @param TPBTimeLineActionImg_Y
 * @desc アクション部画像のY座標を指定します。
 * @text アクション部画像Y座標
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
 * @type number
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
 * @param ActorActionSetting
 * @text 行動時設定
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
 * @param EnemyActionSetting
 * @text 行動時設定
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
 * @param GaugeSetting
 * @text ゲージ設定(未実装)
 * @default ////////////////////////////////
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
const ActionDuration = Number(parameters['ActionDuration'] || 30);
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
const BattlerStatusShow = eval(parameters['BattlerStatusShow'] || "true");

const _Game_Temp_requestBattleRefresh = Game_Temp.prototype.requestBattleRefresh;
Game_Temp.prototype.requestBattleRefresh = function() {
    _Game_Temp_requestBattleRefresh.call(this);
    if ($gameParty.inBattle()) {
        this._needsTpbTimeLineRefresh = true;
    }
};

Game_Temp.prototype.clearTpbTimeLineRefreshRequest = function() {
    this._needsTpbTimeLineRefresh = false;
};

Game_Temp.prototype.isTpbTimeLineRefreshRequested = function() {
    return this._needsTpbTimeLineRefresh;
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

const _Spriteset_Battle_initialize = Spriteset_Battle.prototype.initialize;
Spriteset_Battle.prototype.initialize = function() {
    _Spriteset_Battle_initialize.call(this);
    this._tpbTimeLineActorMaxMembers = $gameParty.maxBattleMembers();
    this._tpbTimeLineEnemyMaxMembers = 8;//暫定
};

const _Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    _Spriteset_Battle_createLowerLayer.call(this);
    this.createTimeLineImg();
    this.createTimeLineActor();
    this.createTimeLineEnemy();
    this.createTimeLineActionImg();
};

Spriteset_Battle.prototype.createTimeLineImg = function() {
    const bitmap = ImageManager.nuun_LoadPictures(TPBTimeLineImg);
    const sprite = new Sprite(bitmap);
    sprite.x = TPBTimeLine_X;
    sprite.y = TPBTimeLine_Y;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0;
    this.addChild(sprite);
    this.timeLineSprite = sprite;
};

Spriteset_Battle.prototype.createTimeLineActionImg = function() {
    const bitmap = ImageManager.nuun_LoadPictures(TPBTimeLineActionImg);
    const sprite = new Sprite(bitmap);
    this.addChild(sprite);
    this.timeLineSprite = sprite;
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
    const members = $gameParty.battleMembers();
    this._tpbTimeLineActorMaxMembers = $gameParty.maxBattleMembers();console.log(this.timeLineActor)
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
    for (let i = 0; i < this._tpbTimeLineEnemyMaxMembers; i++) {
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
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this._homeX = 0;
    this._homeY = 0;
    this._offsetX = 0;
    this._offsetY = 0;
    this._targetOffsetX = NaN;
    this._targetOffsetY = NaN;
    this._battlerName = "";
    this._battlerHue = 0;
    this._battlerSprite = null;
    this._move = 0;
    this._duration = 0;
    this._chipMode = false;
    this._imgMode = 'chip'
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
    this.setHome();
};

Sprite_TimeLine.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (this._battler) {
        this.updateBitmap();
        this.updateCastIcon();
        this.updateTpbPosition();
        this.updatePosition();
    } else {
        this._battlerSprite.bitmap = null;
        this._castIconSprite.setIcon(0);
    }
};

Sprite_TimeLine.prototype.updateCastIcon = function() {
    const action = this._battler.currentAction();
    if (action && this._battler.tpbRequiredCastTime() > 0 && this._battler._tpbState === "casting") {
        if (CastIconId > 0) {
            this._castIconSprite.setIcon(CastIconId);
        } else {
            const item = action.item();
            if (item) {
                this._castIconSprite.setIcon(item.iconIndex);
            } else {
                this._castIconSprite.setIcon(0);
            }
        }
    } else {
        this._castIconSprite.setIcon(0);
    }
};

Sprite_TimeLine.prototype.updateTpbPosition = function() {
    this.updateMove();
};

Sprite_TimeLine.prototype.updateMove = function() {
    const state = this._battler.getTimeLineTpbState();
    const x = this.getOffSetX();
    const y = this.getOffSetY();
    if (state !== 'action') {
        this.targetOffsetReset();
    }
    if (state === 'action') {
        if (this.getActionOffSetX() === 0 && this.getActionOffSetY() === 0) {
            this.updateCharged(x, y);
        } else {
            this.updateAction(x, y);
        }
    } else if (state === 'charged') {
        this.updateCharged(x, y);
    } else if (state === 'charge') {
        this.updateCharge(x, y);
    } else if (state === 'casting') {
        this.updateCasting(x, y);
    } else {
        
    }
};

Sprite_TimeLine.prototype.updatePosition = function() {
    this.x = this._homeX + this._offsetX;
    this.y = this._homeY + this._offsetY;
};

Sprite_TimeLine.prototype.updateCharged = function(x, y) {
    if (TimeLineDirection === 'up') {
        this._offsetY = y;
        this._offsetX = x;
    } else if (TimeLineDirection === 'down') {
        this._offsetY = y + (TPBTimeLineLength * 1);
        this._offsetX = x;
    } else if (TimeLineDirection === 'right') {
        this._offsetX = x + (TPBTimeLineLength * 1);
        this._offsetY = y;
    } else if (TimeLineDirection === 'left') {
        this._offsetX = x;
        this._offsetY = y;
    }
};

Sprite_TimeLine.prototype.updateCharge = function(x, y) {
    if (TimeLineDirection === 'up') {
        this._offsetX = x;
        this._offsetY = TPBTimeLineLength - (TPBTimeLineLength * this.getTpbTime()) + y;
    } else if (TimeLineDirection === 'down') {
        this._offsetX = x;
        this._offsetY = TPBTimeLineLength * this.getTpbTime() + y;
    } else if (TimeLineDirection === 'right') {
        this._offsetX = TPBTimeLineLength * this.getTpbTime() + x;
        this._offsetY = y;
    } else if (TimeLineDirection === 'left') {
        this._offsetX = TPBTimeLineLength - (TPBTimeLineLength * this.getTpbTime()) + x;
        this._offsetY = y;
    }
};

Sprite_TimeLine.prototype.updateCasting = function(x, y) {
    const requiredCastTime = this._battler.tpbRequiredCastTime();
    const cast = requiredCastTime > 0 ? TPBTimeLineLength * (this.getCastTime() / requiredCastTime) : (TPBTimeLineLength * 1);
    if (TimeLineDirection === 'up') {
        this._offsetX = x;
        this._offsetY = TPBTimeLineLength - cast + y;
    } else if (TimeLineDirection === 'down') {
        this._offsetX = x;
        this._offsetY = cast + y;
    } else if (TimeLineDirection === 'right') {
        this._offsetX = cast + x;
        this._offsetY = y;
    } else if (TimeLineDirection === 'left') {
        this._offsetX = TPBTimeLineLength - cast + x;
        this._offsetY = y;
    }
};

Sprite_TimeLine.prototype.updateAction = function(x, y) {
    if (isNaN(this._targetOffsetX) && isNaN(this._targetOffsetY)) {
        this._duration = ActionDuration;
        this._targetOffsetX = this.getActionOffSetX();
        this._targetOffsetY = this.getActionOffSetY();
    } else if (this._duration > 0) {
        this._duration--;
        const d = ActionDuration - this._duration;
        this._offsetX = (this._targetOffsetX / ActionDuration) * d + x;
        this._offsetY = (this._targetOffsetY / ActionDuration) * d + y;
        if (TimeLineDirection === 'down') {
            this._offsetY += (TPBTimeLineLength * 1);
        } else if (TimeLineDirection === 'right') {
            this._offsetX += (TPBTimeLineLength * 1);
        } else if (TimeLineDirection === 'left') {
            
        }
    }
};

Sprite_TimeLine.prototype.targetOffsetReset = function() {
    if (!isNaN(this._targetOffsetX) || !isNaN(this._targetOffsetY)) {
        this._targetOffsetX = NaN;
        this._targetOffsetY = NaN;
    }
    if (this._duration > 0) {
        this._duration = 0;
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
    return this._battler.tpbChargeTime();
};

Sprite_TimeLine.prototype.getCastTime = function() {
    return this._battler._tpbCastTime || 0;
};

Sprite_TimeLine.prototype.isDirectionUpDown = function() {
    return TimeLineDirection === 'up' || TimeLineDirection === 'down';
};

Sprite_TimeLine.prototype.initVisibility = function() {
    this._appeared = this._battler.isAlive();
    if (!this._appeared) {
        this.opacity = 0;
    } else {
        this.opacity = 255;
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
    if (this._battlerName !== name || this._battlerHue !== hue) {
        this._battlerName = name;
        this._battlerHue = hue;
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
    const img = this._battler.actor().meta.TimeLineImg;
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
    const text = this.getEnemyLetter();
    const width = this.bitmapWidth();
    const height = this.textHeight();
    this._textSprite.bitmap.drawText(text, 0, 0, width, height, "left");
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


})();