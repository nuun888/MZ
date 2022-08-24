/*:-----------------------------------------------------------------------------------
 * NUUN_XPSelectWindow.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc XP風対象選択ウィンドウ
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.1.0
 * 
 * @help
 * 敵、味方の対象選択時のウィンドウをXP風に変更します。
 * 
 * 全体、ランダム、敵味方全体攻撃(Ver.1.6.0以降)でも対象選択と併用することで、全体、ランダム対象時の表示をすることができます。
 * 
 * アクター、敵キャラのメモ欄
 * <XPBattlerFace:[imgUrl], [indexId]> 表示する顔グラを指定します。アクターの場合は未指定の場合はデフォルトの顔グラまたは立ち絵、顔グラEXの顔グラが表示されます。
 * [imgUrl]:faceインデックス内のURL(拡張子なし)
 * [indexId]:顔グラのインデックスID
 * ※[]は記入しないでください。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/8/24 Ver.1.1.0
 * 敵対象選択時にスクロール選択出来る機能を追加。
 * 2022/6/5 Ver.1.0.5
 * 微修正。
 * 2022/4/2 Ver.1.0.4
 * 敵に顔グラを指定できる機能を追加。
 * 2022/4/1 Ver.1.0.3
 * 評価式のバトラーの取得する変数を変更。
 * 2022/3/31 Ver.1.0.2
 * 敵のデフォルトのステート表示が表示されないように修正。
 * 2022/3/30 Ver.1.0.1
 * 敵の対象選択時にアクターステータスウィンドウを表示するように修正。
 * アクター選択時の顔グラの表示を立ち絵、顔グラ表示EX設定に対応。
 * 2022/3/27 Ver.1.0.0
 * 初版
 * 
 * @param XPSelectPosition
 * @text 対象選択画面表示位置
 * @desc 対象選択画面の表示位置を指定します。
 * @type select
 * @option 上部
 * @value 'top'
 * @option 中間
 * @value 'middle'
 * @option アクターステータスウィンドウの上
 * @value 'under'
 * @default 'top'
 * 
 * @param AcrotXPSelect
 * @desc アクター対象選択画面をXPスタイルに変更します。
 * @text アクター対象選択画面XP有効
 * @type boolean
 * @default true
 * 
 * @param EnemyXPSelect
 * @desc 敵キャラ対象選択画面をXPスタイルに変更します。
 * @text 敵キャラ対象選択画面XP有効
 * @type boolean
 * @default true
 * 
 * @param ActorData
 * @text 表示アクターデータ
 * @desc 選択時に表示するアクターのデータを選択します。
 * @default ["{\"DataMode\":\"'Face'\",\"Contents_X\":\"0\",\"Contents_Width\":\"0\",\"Contents_Align\":\"'center'\",\"Contents_Eval\":\"\"}","{\"DataMode\":\"'name'\",\"Contents_X\":\"160\",\"Contents_Width\":\"600\",\"Contents_Align\":\"'left'\",\"Contents_Eval\":\"\"}"]
 * @type struct<DataList>[]
 * 
 * @param EnemyData
 * @text 表示エネミーデータ
 * @desc 選択時に表示する敵キャラのデータを選択します。顔グラは選択しても表示されません。
 * @default ["{\"DataMode\":\"'name'\",\"Contents_X\":\"0\",\"Contents_Width\":\"700\",\"Contents_Align\":\"'center'\",\"Contents_Eval\":\"\"}","{\"DataMode\":\"'State'\",\"Contents_X\":\"730\",\"Contents_Width\":\"128\",\"Contents_Align\":\"'center'\",\"Contents_Eval\":\"\"}"]
 * @type struct<DataList>[]
 * 
 * @param ActorSelect_X
 * @desc アクターコマンドウィンドウのX座標を指定します。
 * @text コマンドウィンドウX座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param ActorSelect_Y
 * @desc アクターコマンドウィンドウのY座標を指定します。
 * @text コマンドウィンドウY座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param ActorSelect_Width
 * @desc アクターコマンドウィンドウの横幅を指定します。0でUIサイズ 画面より大きい値にすると自動的に画面の横幅になります。
 * @text コマンドウィンドウの横幅
 * @type number
 * @default 0
 * @max 9999
 * @min 0
 * 
 * @param EnemySelect_X
 * @desc アクターコマンドウィンドウのX座標を指定します。
 * @text コマンドウィンドウX座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param EnemySelect_Y
 * @desc アクターコマンドウィンドウのY座標を指定します。
 * @text コマンドウィンドウY座標
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param EnemySelectd_Width
 * @desc アクターコマンドウィンドウの横幅を指定します。0でUIサイズ 画面より大きい値にすると自動的に画面の横幅になります。
 * @text コマンドウィンドウの横幅
 * @type number
 * @default 0
 * @max 9999
 * @min 0
 * 
 * @param ActorPictureSetting
 * @text 立ち絵、顔グラ表示EX設定
 * @default ------------------------------
 * 
 * @param DynamicFace
 * @desc 顔グラを条件による変化させます。（要立ち絵、顔グラ表示EX）
 * @text 条件顔グラ変化
 * @type boolean
 * @default true
 * @parent ActorPictureSetting
 * 
 */
/*~struct~DataList:
 * 
 * @param DataMode
 * @text ウィンドウ基準表示位置
 * @desc アクターステータスウィンドウの基準表示位置
 * @type select
 * @option 名前(1)(2)(3)
 * @value 'name'
 * @option HPゲージ(1)(2)
 * @value 'HPGauge'
 * @option MPゲージ(1)(2)
 * @value 'MPGauge'
 * @option TPゲージ(1)(2)
 * @value 'TPGauge'
 * @option ステート(1)(2)
 * @value 'State'
 * @option 任意ステータス(1)(2)(3)(4)
 * @value 'original'
 * @option 顔グラ(1)(2)
 * @value 'Face'
 * @default 'name'
 * 
 * @param Contents_X
 * @desc コンテンツのX座標。
 * @text X座標(1)
 * @type number
 * @default 0
 * @max 9999
 * @min 0
 * 
 * @param Contents_Width
 * @desc コンテンツの横幅 0で画面サイズ。
 * @text コンテンツ横幅(2)
 * @type number
 * @default 0
 * @max 9999
 * @min 0
 * 
 * @param Contents_Align
 * @text 文字揃え(3)
 * @desc 文字揃え
 * @type select
 * @option 左
 * @value 'left'
 * @option 中央
 * @value 'center'
 * @option 右
 * @value 'right'
 * @default 'center'
 * 
 * @param Contents_Eval
 * @desc 評価式
 * @text 評価式(4)
 * @type combo
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option 'battler.turnCount()+"ターン";//ターン'
 * @default
 * 
 */
var Imported = Imported || {};
Imported.NUUN_XPSelectWindow = true;

(() => {
const parameters = PluginManager.parameters('NUUN_XPSelectWindow');
const XPSelectPosition = eval(parameters['AcrotXPSelectPosition']) || 'top';
const ActorXPSelect = eval(parameters['AcrotXPSelect'] || "true");
const EnemyXPSelect = eval(parameters['EnemyXPSelect'] || "true");
const ActorSelect_X = Number(parameters['ActorSelect_X'] || 0);
const ActorSelect_Y = Number(parameters['ActorSelect_Y'] || 0);
const ActorSelect_Width = Number(parameters['ActorSelect_Width'] || 0);
const EnemySelect_X = Number(parameters['EnemySelect_X'] || 0);
const EnemySelect_Y = Number(parameters['EnemySelect_Y'] || 0);
const EnemySelect_Width = Number(parameters['EnemySelect_Width'] || 0);
const ActorData = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ActorData'])) : null) || [];
const EnemyData = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['EnemyData'])) : null) || [];
const DynamicFace = eval(parameters['DynamicFace'] || "true");
let contentsWidth = 0;

function actorSelectWindowWidth() {
    return ActorSelect_Width > 0 ? Math.min(ActorSelect_Width, Graphics.width) : Graphics.boxWidth;
};

function enemySelectWindowWidth() {
    return EnemySelect_Width > 0 ? Math.min(EnemySelect_Width, Graphics.width) : Graphics.boxWidth;
};

function getFace(battler) {
    return battler.meta.XPBattlerFace ? battler.meta.XPBattlerFace.split(',') : null;
}

const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
    _Scene_Battle_createAllWindows.call(this);
    if (EnemyXPSelect) {
        this.createSelectEnemyWindow();
    }
};

const _Scene_Battle_createActorWindow = Scene_Battle.prototype.createActorWindow;
Scene_Battle.prototype.createActorWindow = function() {
    _Scene_Battle_createActorWindow.call(this);
    if (ActorXPSelect) {
        this.createSelectActorWindow();
    }
};

Scene_Battle.prototype.createSelectActorWindow = function() {
    const rect = this.actorSelectWindowRect();
    this._actorSelectWindow = new Window_BattleSelectActor(rect);
    this.addWindow(this._actorSelectWindow);
    this._actorWindow.selectActorWindow = this._actorSelectWindow;
};

Scene_Battle.prototype.createSelectEnemyWindow = function() {
    const rect = this.enemySelectWindowRect();
    this._enemySelectWindow = new Window_BattleSelectEnemy(rect);
    this.addWindow(this._enemySelectWindow);
    this._enemyWindow.selectEnemyWindow = this._enemySelectWindow;
};

Scene_Battle.prototype.actorSelectWindowRect = function() {
    const ww = actorSelectWindowWidth();
    const wx = ActorSelect_X;
    const wh = this.calcWindowHeight(1, true);
    const wy = this.XPActorSelectY();
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemySelectWindowRect = function() {
    const ww = enemySelectWindowWidth();
    const wx = EnemySelect_X;
    const wh = this.calcWindowHeight(1, true);
    const wy = this.XPEnemySelectY();
    return new Rectangle(wx, wy, ww, wh);
};

const _Scene_Battle_createEnemyWindow = Scene_Battle.prototype.createEnemyWindow;
Scene_Battle.prototype.createEnemyWindow = function() {
    _Scene_Battle_createEnemyWindow.call(this);
    if (EnemyXPSelect) {
        this._enemyWindow.y = Graphics.height;
    }
};

const _Scene_Battle_startEnemySelection = Scene_Battle.prototype.startEnemySelection;
Scene_Battle.prototype.startEnemySelection = function() {
    _Scene_Battle_startEnemySelection.call(this);
    if (EnemyXPSelect) {
        this._skillWindow.hide();
        this._itemWindow.hide();
        this._statusWindow.show();
        this._enemySelectWindow.open();
    }
};

const _Scene_Battle_startActorSelection = Scene_Battle.prototype.startActorSelection;
Scene_Battle.prototype.startActorSelection = function() {
    _Scene_Battle_startActorSelection.call(this);
    if (ActorXPSelect) {
        this._actorSelectWindow.open();
    }
};

const _Scene_Battle_onEnemyOk = Scene_Battle.prototype.onEnemyOk;
Scene_Battle.prototype.onEnemyOk = function() {
    _Scene_Battle_onEnemyOk.call(this);
    if (EnemyXPSelect) {
        this._enemySelectWindow.close();
    }
};

const _Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
    _Scene_Battle_onEnemyCancel.call(this);
    if (EnemyXPSelect) {
        this._enemySelectWindow.close();
    }
};

const _Scene_Battle_onActorOk = Scene_Battle.prototype.onActorOk;
Scene_Battle.prototype.onActorOk = function() {
    _Scene_Battle_onActorOk.call(this);
    if (ActorXPSelect) {
        this._actorSelectWindow.close();
    }
};

const _Scene_Battle_onActorCancel  =Scene_Battle.prototype.onActorCancel;
Scene_Battle.prototype.onActorCancel = function() {
    _Scene_Battle_onActorCancel.call(this);
    if (ActorXPSelect) {
        this._actorSelectWindow.close();
    }
};


Scene_Battle.prototype.XPActorSelectY = function() {
    switch (XPSelectPosition) {
        case 'top':
            return ActorSelect_Y;
        case 'under':
            return this._statusWindow.y - this.calcWindowHeight(1, true) + ActorSelect_Y - 6;
        case 'middle':
            return this._statusWindow.y / 2 - this.calcWindowHeight(1, true) / 2 + ActorSelect_Y;
    }
};

Scene_Battle.prototype.XPEnemySelectY = function() {
    switch (XPSelectPosition) {
        case 'top':
            return EnemySelect_Y;
        case 'under':
            return this._statusWindow.y - this.calcWindowHeight(1, true) + EnemySelect_Y - 6;
        case 'middle':
            return this._statusWindow.y / 2 - this.calcWindowHeight(1, true) / 2 + EnemySelect_Y;
    }
};

function Window_BattleSelectBattler() {
    this.initialize(...arguments);
}

Window_BattleSelectBattler.prototype = Object.create(Window_StatusBase.prototype);
Window_BattleSelectBattler.prototype.constructor = Window_BattleSelectBattler;

Window_BattleSelectBattler.prototype.initialize = function(rect) {
    Window_StatusBase.prototype.initialize.call(this, rect);
    this.openness = 0;
    this._battler = null;
    this._targetSelect = null;
};

Window_BattleSelectBattler.prototype.colSpacing = function() {
    return 0;
};

Window_BattleSelectBattler.prototype.setBattler = function(battler) {
    this._battler = battler;
    this.refresh();
};

Window_BattleSelectBattler.prototype.battlerDataMode = function(data, x, y, width) {
    const mode = data.DataMode;
    contentsWidth = width;
    switch (mode) {   
        case 'name':
            this.placeBattlerName(this._battler, data, x, y);
            break;
        case 'HPGauge':
            this.placeGauge(this._battler, 'hp', x, y);
            break;
        case 'MPGauge':
            this.placeGauge(this._battler, 'mp', x, y);
            break;
        case 'TPGauge':
            this.placeGauge(this._battler, 'tp', x, y);
            break;
        case 'State':
            this.placeStateIcon(this._battler, x, y);
            break;
        case 'original':
            this.battlerOriginal(this._battler, data, x, y - 6, width);
            break;
        case 'Face':
            this.battlerFace(this._battler, data, x, y);
            break;
    }
};

Window_BattleSelectBattler.prototype.setForItem = function(text) {
    this._targetSelect = text;
};

Window_BattleSelectBattler.prototype.drawEXTargetSelect = function(x, y, width) {
    this.drawText(this._targetSelect, x, y, width, 'center');
};

function Window_BattleSelectActor() {
    this.initialize(...arguments);
}

Window_BattleSelectActor.prototype = Object.create(Window_BattleSelectBattler.prototype);
Window_BattleSelectActor.prototype.constructor = Window_BattleSelectActor;

Window_BattleSelectActor.prototype.initialize = function(rect) {
    Window_BattleSelectBattler.prototype.initialize.call(this, rect);
};

Window_BattleSelectActor.prototype.refresh = function() {
    Window_StatusBase.prototype.refresh.call(this);
    let bitmap = null;
    const battler = this._battler;
    if (battler) {
        const faceData = getFace(battler.actor());
        if (faceData) {
            bitmap = ImageManager.loadFace(faceData[0]);
        } else {
            if (Imported.NUUN_ActorPicture && DynamicFace) {
                this._battler.resetImgId();
                bitmap = ImageManager.loadFace(this._battler.getActorGraphicFace());
            } else {
                bitmap = ImageManager.loadFace(this._battler.faceName());
            }
        }
        if (!bitmap.isReady()) {
            bitmap.addLoadListener(this.drawListData.bind(this));
        } else {
            this.drawListData();
        }
    }
};

Window_BattleSelectActor.prototype.drawListData = function() {
    const rect = this.itemLineRect(0);
    if (this._targetSelect) {
        this.drawEXTargetSelect(rect.x, rect.y, rect.width);
    } else {
        ActorData.forEach(data => {
            const width = data.Contents_Width > 0 ? data.Contents_Width : rect.width;
            this.battlerDataMode(data, rect.x + data.Contents_X, rect.y + 6, width);
        });
    }
};

Window_BattleSelectActor.prototype.placeBattlerName = function(battler, data, x, y) {
    const key = "ActorSelectName";
    const sprite = this.createInnerSprite(key, Sprite_BattlerName);
    sprite.setup(battler, data);
    sprite.move(x, y);
    sprite.show();
};

Window_BattleSelectActor.prototype.placeStateIcon = function(battler, x, y) {
    const key = "ActorSelectStateIcon";
    const sprite = this.createInnerSprite(key, Sprite_StateIcon);
    sprite.setup(battler);
    sprite.move(x + 8, y + 12);
    sprite.show();
};

Window_BattleSelectActor.prototype.placeGauge = function(battler, type, x, y) {
    if (Imported.NUUN_GaugeImage) {
        this.placeGaugeImg(actor, type, x, y);
    }
    const key = "ActorSelectGauge-%1".format(type);
    const sprite = this.createInnerSprite(key, Sprite_XPGauge);
    sprite.setup(battler, type);
    sprite.move(x, y);
    sprite.show();
};

Window_BattleSelectActor.prototype.battlerOriginal = function(battler, data, x, y, width) {
    if (battler) {
        const param = eval(data.Contents_Eval);
        this.drawText(param, x, y, width, data.Contents_Align);
    }
};

Window_BattleSelectActor.prototype.battlerFace = function(actor, data, x, y) {
    if (actor) {
        const width = ImageManager.faceWidth;
        y -= (ImageManager.faceHeight / 2) - 6;
        this.drawActorFace(actor, x, y, width);
    }
};

Window_BattleSelectActor.prototype.drawActorFace = function(actor, x, y, width, height) {
    const faceData = getFace(actor.actor());
    if (faceData) {
        this.drawFace(faceData[0], Math.max(faceData[1], 0), x, y, width, height);
    } else if (Imported.NUUN_ActorPicture && DynamicFace) {
        this.drawFace(actor.getActorGraphicFace(), actor.getActorGraphicFaceIndex(), x, y, width, height);
    } else {
        Window_StatusBase.prototype.drawActorFace.call(this, actor, x, y, width, height);
    }
};


function Window_BattleSelectEnemy() {
    this.initialize(...arguments);
}

Window_BattleSelectEnemy.prototype = Object.create(Window_BattleSelectBattler.prototype);
Window_BattleSelectEnemy.prototype.constructor = Window_BattleSelectEnemy;

Window_BattleSelectEnemy.prototype.initialize = function(rect) {
    Window_BattleSelectBattler.prototype.initialize.call(this, rect);
};

Window_BattleSelectEnemy.prototype.refresh = function() {
    Window_StatusBase.prototype.refresh.call(this);
    let bitmap = null;
    const battler = this._battler;
    if (battler) {
        const faceData = getFace(battler.enemy());
        if (faceData) {
            bitmap = ImageManager.loadFace(faceData[0]);
        }
        if (faceData && !bitmap.isReady()) {
            bitmap.addLoadListener(this.drawListData.bind(this));
        } else {
            this.drawListData();
        }
    }
};

Window_BattleSelectEnemy.prototype.drawListData = function() {
    const rect = this.itemLineRect(0);
    if (this._targetSelect) {
        this.drawEXTargetSelect(rect.x, rect.y, rect.width);
    } else {
        EnemyData.forEach(data => {
            const width = data.Contents_Width > 0 ? data.Contents_Width : rect.width;
            this.battlerDataMode(data, rect.x + data.Contents_X, rect.y + 6, width);
        });
    }
};

Window_BattleSelectEnemy.prototype.placeBattlerName = function(battler, data, x, y) {
    const key = "EnemySelectName";
    const sprite = this.createInnerSprite(key, Sprite_BattlerName);
    sprite.setup(battler, data);
    sprite.move(x, y);
    sprite.show();
};

Window_BattleSelectEnemy.prototype.placeStateIcon = function(battler, x, y) {
    const key = "EnemySelectStateIcon";
    const sprite = this.createInnerSprite(key, Sprite_StateIcon);
    sprite.setup(battler);
    sprite.move(x + 8, y + 12);
    sprite.show();
};

Window_BattleSelectEnemy.prototype.placeGauge = function(battler, type, x, y) {
    if (Imported.NUUN_GaugeImage) {
        this.placeGaugeImg(actor, type, x, y);
    }
    const key = "EnemySelectGauge-%1".format(type);
    const sprite = this.createInnerSprite(key, Sprite_XPGauge);
    sprite.setup(battler, type);
    sprite.move(x, y);
    sprite.show();
};

Window_BattleSelectEnemy.prototype.battlerOriginal = function(battler, data, x, y, width) {
    if (battler) {
        const param = eval(data.Contents_Eval);
        this.drawText(param, x, y, width, data.Contents_Align);
    }
};

Window_BattleSelectEnemy.prototype.battlerFace = function(enemy, data, x, y) {
    if (enemy) {
        const width = ImageManager.faceWidth;
        y -= (ImageManager.faceHeight / 2) - 6;
        this.drawEnemyFace(enemy, x, y, width);
    }
};

Window_BattleSelectEnemy.prototype.drawEnemyFace = function(enemy, x, y, width, height) {
    const faceData = getFace(enemy.enemy());
    if (faceData) {
        this.drawFace(faceData[0], Math.max(faceData[1], 0), x, y, width, height);
    }
};


const _Window_BattleActor_select = Window_BattleActor.prototype.select;
Window_BattleActor.prototype.select = function(index) {
    _Window_BattleActor_select.call(this, index);
    if (this.selectActorWindow) {
        this.selectActorWindow.setBattler(this.actor(index));
    }
};


const _Window_BattleEnemy_select = Window_BattleEnemy.prototype.select;
Window_BattleEnemy.prototype.select = function(index) {
    _Window_BattleEnemy_select.call(this, index);
    if (this.selectEnemyWindow) {
        this.selectEnemyWindow.setBattler(this.enemy());
    }
};

Window_BattleEnemy.prototype.maxCols = function() {
    return this.maxItems();
};

Window_BattleEnemy.prototype.processWheelScroll = function() {
    if (this.isWheelScrollEnabled()) {
        const threshold = 20;
        const oldIndex = this.index();
        if (TouchInput.wheelY >= threshold) {
            this.cursorRight(Input.isTriggered("right"));
            if (this.index() !== oldIndex) {
                this.playCursorSound();
            }
        }
        if (TouchInput.wheelY <= -threshold) {
            this.cursorLeft(Input.isTriggered("left"));
            if (this.index() !== oldIndex) {
                this.playCursorSound();
            }
        }
    }
};

function Sprite_BattlerName() {
    this.initialize(...arguments);
}

Sprite_BattlerName.prototype = Object.create(Sprite_Name.prototype);
Sprite_BattlerName.prototype.constructor = Sprite_BattlerName;

Sprite_BattlerName.prototype.initialize = function() {
    this._nameWidth = contentsWidth;
    Sprite_Name.prototype.initialize.call(this);
    this._align = 'center'
};

Sprite_BattlerName.prototype.bitmapWidth = function() {
    return this._nameWidth || 128;
};

Sprite_BattlerName.prototype.setup = function(battler, data) {
    this._align = data.Contents_Align || 'center';
    this._battler = battler;
    this.updateBitmap();
};

Sprite_BattlerName.prototype.redraw = function() {
    const name = this.name();
    const width = this.bitmapWidth();
    const height = this.bitmapHeight();
    this.setupFont();
    this.bitmap.clear();
    this.bitmap.drawText(name, 0, 0, width, height, this._align);
};


function Sprite_XPGauge() {
    this.initialize(...arguments);
}

Sprite_XPGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_XPGauge.prototype.constructor = Sprite_XPGauge;

Sprite_XPGauge.prototype.initialize = function() {
    this._gaugeWidth = contentsWidth;
    Sprite_Gauge.prototype.initialize.call(this);
};

Sprite_XPGauge.prototype.bitmapWidth = function() {
    return this._gaugeWidth || 128;
};


const _Sprite_Enemy_updateStateSprite = Sprite_Enemy.prototype.updateStateSprite;
Sprite_Enemy.prototype.updateStateSprite = function() {
    _Sprite_Enemy_updateStateSprite.call(this);
    this._stateIconSprite.visible = false;
};

})();