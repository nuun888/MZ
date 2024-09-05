/*:-----------------------------------------------------------------------------------
 * NUUN_Scope_confirmation.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc 全体、ランダム、敵味方全体攻撃でも対象選択
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_MenuStatusAllSelectFix
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_MenuStatusAllSelectFix
 * @version 1.6.3
 *            
 * @help  
 * 全体、ランダム、敵味方全体攻撃でも対象選択させます。
 * 
 * アイテム、スキルのメモ欄
 * <NoTargetSelect> このアイテム、スキルは対象選択しません。デフォルトと同様に省略されます。
 * 対象が全体、ランダム、敵味方全て、使用者のみ（対象使用者のみ選択表示をON）で有効です。
 * 以下のタグは範囲を全体、ランダム、敵味方全てにしたときに有効です。
 * 
 * 対象範囲が全体、ランダム、敵味方全体時のウィンドウカーソルの表示対象を独自に定義することが出来ます。
 * なおエネミー画像、SV画像、アクター画像には反映されません。また複数対象カーソル個別表示がONの時のみ有効です。
 * subject = 使用:者;
 * members = 対象のメンバー;
 * 取得するデータはカーソル表示させるメンバーを配列として取得します。
 * 例:members.filter(member => member.isAlive() && member !== subject)
 * 使用者以外にカーソルが表示させます。
 * 
 * タグはアイテム、スキルのメモ欄に記述します。
 * <[tag]> [tag]:全カーソル表示時対象設定で設定したタグ名
 * 例:<NotUserTarget> NotUserTargetは全カーソル表示時対象設定のタグ名を変更してない限り、使用者以外のカーソルを表示します。
 * 
 * 以下の機能はXPスタイル対象選択ウィンドウプラグインが必要です。
 * 敵味方対象選択時の表示名
 * %1:連続回数
 * %2:ランダム回数
 * 
 * デフォルト設定
 * <NotUserTarget> 使用者除外。
 * <DeathTarget> 戦闘不能者を含む。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 
 * 更新履歴
 * 2024/9/5 Ver.1.6.3
 * 防御コマンドでキャンセルを行うとコマンドカーソル位置が先頭に戻ってしまう問題を修正。
 * 2021/5/30 Ver.1.6.2
 * メニュー画面アクター全体選択時のカーソル不具合を別プラグイン化による定義修正。
 * 2021/3/27 Ver.1.6.1
 * XP風対象選択ウィンドウのプラグイン名が間違っていたので修正。
 * 2021/3/27 Ver.1.6.0
 * XPスタイル対象選択ウィンドウに対応するための定義追加。
 * 全カーソル表示で対象のカーソル表示を判定させる評価式の仕様を変更。
 * 2021/7/18 Ver.1.5.1
 * 全カーソル表示時対象設定で設定したタグが取得できていない問題を修正。
 * スクロールしたときに選択対象になっていないアクターにカーソルが表示されてしまう問題を修正。
 * 2021/7/17 Ver.1.5.0
 * 複数対象カーソル個別表示をメニューにも対応。
 * 2021/7/14 Ver.1.4.1
 * 敵の対象選択時にエラーが出る問題を修正。
 * カーソル選択中にモンスターが倒されるとエラーが出る問題を修正。
 * 2021/7/14 Ver.1.4.0
 * 全体カーソル表示時のウィンドウのカーソル表示対象指定を独自に定義できる機能を追加。
 * 2021/7/14 Ver.1.3.2
 * 味方に戦闘不能者がいるときに全体選択するとエラーが出る問題を修正。
 * 2021/7/10 Ver.1.3.1
 * 処理を一部変更。
 * 2021/7/8 Ver.1.3.0
 * 全体、ランダム攻撃対象選択を敵選択時のみ表示させる機能を追加。
 * 2021/7/7 Ver.1.2.0
 * 全体選択の時にカーソルを一つにまとめずに別々に表示する機能を追加。
 * 2021/7/6 Ver.1.1.0
 * 敵味方全体対象の時に味方にも点滅するように変更。
 * 対象選択の表示省略をアイテム、スキルごとに設定できる機能を追加。
 * 2021/7/5 Ver.1.0.2
 * カーソル全体選択時の処理を修正。
 * プラグインパラメータのパラメータが間違っていたので修正。
 * 2021/7/5 Ver.1.0.1
 * 味方が奇数の時にカーソル全選択時の表示が正常に表示されない問題を修正。
 * 2021/7/4 Ver.1.0.0
 * 初版
 * 
 * @param EnemyOnrySelect
 * @desc 全体、ランダム攻撃の対象選択を敵のみ表示にします。
 * @text 全体、ランダム攻撃対象選択敵のみ表示
 * @type boolean
 * @default false
 * 
 * @param ForUserSelect
 * @desc 対象が使用者のみの時に選択画面を表示する。
 * @text 対象使用者のみ選択表示
 * @type boolean
 * @default false
 * 
 * @param MultiCursorMode
 * @desc 複数対象選択の時にカーソルを個別に表示する。
 * @text 複数対象カーソル個別表示
 * @type boolean
 * @default true
 * 
 * @param UserSelectTasg
 * @desc 全カーソル表示時に表示するカーソル表示対象設定。（複数対象カーソル個別表示がONの時に有効）
 * @text 全カーソル表示時対象設定
 * @type struct<UserSelectTasList>[]
 * @default ["{\"UserTagName\":\"NotUserTarget\",\"UserTagEval\":\"members.filter(member => member.isAlive() && member !== subject)\"}","{\"UserTagName\":\"DeathTarget\",\"UserTagEval\":\"members\"}"]
 * 
 * 
 * @param XPSelectSetting
 * @text XPスタイル対象選択ウィンドウ設定(要XPスタイル対象選択ウィンドウ)
 * @default ------------------------------
 * 
 * @param TargetUser
 * @desc 対象が使用者の時の表示名。
 * @text 表示名
 * @type string
 * @default 使用者
 * 
 * @param TargetEveryone
 * @desc 対象が敵味方全体の時の表示名。
 * @text 表示名
 * @type string
 * @default 敵味方全体
 * 
 * @param TargetParty
 * @desc 対象が味方全体の時の表示名。
 * @text 表示名
 * @type string
 * @default 味方全体
 * 
 * @param TargetTroop
 * @desc 対象が敵全体の時の表示名。
 * @text 表示名
 * @type string
 * @default 敵全体
 * 
 * @param TargetTroopRandom
 * @desc 対象が敵にランダムの時の表示名。
 * @text 表示名
 * @type string
 * @default 敵ランダム %2回
 * 
 */
/*~struct~UserSelectTasList:
 * 
 * @param UserTagName
 * @desc 全カーソル表示で表示させる対象を指定するタグ名。
 * @text タグ名
 * @type string
 * @default
 * 
 * @param UserTagEval
 * @desc 全カーソル表示で対象のカーソル表示を判定させる評価式。
 * @text 評価式
 * @type combo
 * @option members.filter(member => member.isAlive() && member !== subject);
 * @option members;
 * @default
 * 
 * @param TargetName
 * @desc 対象選択時の表示名。(要XPスタイル対象選択ウィンドウ)
 * @text 表示名(要XPスタイル対象選択ウィンドウ)
 * @type string
 * @default 
 *
 */
var Imported = Imported || {};
Imported.NUUN_Scope_confirmation = true;

(() => {
const parameters = PluginManager.parameters('NUUN_Scope_confirmation');
const ForUserSelect = eval(parameters['ForUserSelect'] || 'false');
const MultiCursorMode = eval(parameters['MultiCursorMode'] || 'true');
const EnemyOnrySelect = eval(parameters['EnemyOnrySelect'] || 'false');
const TargetUser = String(parameters['TargetUser'] || '使用者');
const TargetEveryone = String(parameters['TargetEveryone'] || '敵味方全体');
const TargetParty = String(parameters['TargetParty'] || '味方全体');
const TargetTroop = String(parameters['TargetTroop'] || '敵全体');
const TargetPartyRandom = String(parameters['TargetPartyRandom'] || '味方ランダム');
const TargetTroopRandom = String(parameters['TargetTroopRandom'] || '敵ランダム');
const UserSelectTasg = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['UserSelectTasg'])) : null) || [];

const _Scene_Battle_onSelectAction = Scene_Battle.prototype.onSelectAction;
Scene_Battle.prototype.onSelectAction = function() {
    this.resetCursor();
    const action = BattleManager.inputtingAction();
    const item = action.item();
    if (this.isTargetSelectForUser(action, item)) {
        this.setActorTargetSelectData(action, TargetUser);
        this.startActorSelection();
        this._actorWindow.selectForItem(action);
    } else if (this.isTargetSelectEveryone(action, item)) {
        this.setActorTargetSelectData(action, TargetEveryone);
        this.startEnemySelection();
        this._enemyWindow.selectForItem(action);
        this._actorWindow.selectForItem(action);
    } else if (this.isTargetSelectForRandom(action, item)) {
        if (action.isForOpponent()) {
        this.setActorTargetSelectData(action, TargetTroopRandom);
        this.startEnemySelection();
        this._enemyWindow.selectForItem(action);
        } else {
        this.setActorTargetSelectData(action, TargetPartyRandom);
        this.startActorSelection();
        this._actorWindow.selectForItem(action);
        }
    } else if (this.isTargetSelectisForAll(action, item)) {
        if (action.isForOpponent()) {
        this.setActorTargetSelectData(action, TargetTroop);
        this.startEnemySelection();
        this._enemyWindow.selectForItem(action);  
        } else {
        this.setActorTargetSelectData(action, TargetParty);
        this.startActorSelection();
        this._actorWindow.selectForItem(action);
        }
    } else {
        this.setActorTargetSelectData(action, null);
        _Scene_Battle_onSelectAction.call(this);
    }
};

Scene_Battle.prototype.setActorTargetSelectData = function(action, text) {
    const userTargetTag = UserSelectTasg.find(tag => action.item().meta[tag.UserTagName]);
    if (userTargetTag && userTargetTag.TargetName) {
        text = userTargetTag.TargetName;
    }
    if (Imported.NUUN_XPSelectWindow) {
        const window = action.isForOpponent() ? this._enemySelectWindow : this._actorSelectWindow;
        if (window) {
        if (text) {
            window.setForItem(text.format(action.item().repeats, action.numTargets()));
        } else {
            window.setForItem(null);
        } 
        }
    }//%1　連続回数　%2 ランダム回数 
};

Scene_Battle.prototype.isTargetSelectForUser = function(action, item) {
    return ForUserSelect && this.enemyOnrySelect(action) && !this.noTargetSelect(item) && action.isForUser();
};

Scene_Battle.prototype.isTargetSelectEveryone = function(action, item) {
    return !this.noTargetSelect(item) && action.isForEveryone();
};

Scene_Battle.prototype.isTargetSelectForRandom = function(action, item) {
    return this.enemyOnrySelect(action) && !this.noTargetSelect(item) && action.isForRandom();
};

Scene_Battle.prototype.isTargetSelectisForAll = function(action, item) {
    return this.enemyOnrySelect(action) && !this.noTargetSelect(item) && action.isForAll();
};

Scene_Battle.prototype.noTargetSelect = function(item) {
    return item.meta.NoTargetSelect;
};

Scene_Battle.prototype.enemyOnrySelect = function(action) {
    return !EnemyOnrySelect || (EnemyOnrySelect && action.isForOpponent());
};

Scene_Battle.prototype.resetCursor = function() {
    this._enemyWindow.setCursorAll(false);
    this._actorWindow.setCursorAll(false);
    this._actorWindow.setCursorFixed(false);
    this._enemyWindow.setMultiCursor(false);
    this._actorWindow.setMultiCursor(false);
};

const _Scene_Battle_onActorCancel = Scene_Battle.prototype.onActorCancel;
Scene_Battle.prototype.onActorCancel = function() {
    _Scene_Battle_onActorCancel.apply(this, arguments);
    switch (this._actorCommandWindow.currentSymbol()) {
        case "guard":
            this._statusWindow.show();
            this._actorCommandWindow.activate();
            break;
    }
};


const _Window_Selectable_paint = Window_Selectable.prototype.paint;
Window_Selectable.prototype.paint = function() {
    _Window_Selectable_paint.call(this);
    if (this.contents && this._multiCursor) {
        this.refreshCursorForAll();
    }
};

const _Window_Selectable_initialize = Window_Selectable.prototype.initialize;
Window_Selectable.prototype.initialize = function(rect) {
    this._multiCursor = false;
    _Window_Selectable_initialize.call(this, rect);
};

Window_Selectable.prototype.setMultiCursor = function(mode) {
    this._multiCursor = mode;
};

const _Window_Selectable_setCursorAll = Window_Selectable.prototype.setCursorAll;
Window_Selectable.prototype.setCursorAll = function(cursorAll) {
    _Window_Selectable_setCursorAll.call(this, cursorAll);
    const multiCursor = MultiCursorMode ? cursorAll : false;
    this.setMultiCursor(multiCursor);
};

Window_MenuActor.prototype.setUserTargetSubject = function(batler) {
    this._NUUN_subject = batler;
};

const _Window_MenuActor_select = Window_MenuActor.prototype.select;
Window_MenuActor.prototype.select = function(index) {
    if (this.cursorAll()) {
        Window_Selectable.prototype.select.call(this, index);
        let activeMember = [];
        if (this._userTargetTag && this._userTargetTag.UserTagEval) {
            const subject = this._NUUN_subject;
            const members = $gameParty.members();
            activeMember = eval(this._userTargetTag.UserTagEval);
        } else {
            activeMember = $gameParty.aliveMembers();
        }
        $gameParty.targetSelect(activeMember);
        this.refreshCursor();
    } else {
        _Window_MenuActor_select.call(this, index);
    }
};

const _Window_MenuActor_selectForItem = Window_MenuActor.prototype.selectForItem;
Window_MenuActor.prototype.selectForItem = function(item) {
    this.setCursorNotUserTarget(item);
    this.setMultiCursor(false);
    _Window_MenuActor_selectForItem.call(this, item);
};

Window_MenuActor.prototype.setCursorNotUserTarget = function(item) {
    this._userTargetTag = UserSelectTasg.find(tag => item.meta[tag.UserTagName]);
    const actor = $gameParty.menuActor();
    this.setUserTargetSubject(actor);
};


Window_BattleActor.prototype.setCursorNotUserTarget = function(action) {
    Window_Selectable.prototype.setCursorNotUserTarget.call(this, action);
    this.setUserTargetSubject(action.subject());
};

Window_Selectable.prototype.setCursorNotUserTarget = function(action) {
    const item = action.item().meta;
    this._userTargetTag = UserSelectTasg.find(tag => item[tag.UserTagName]);
};

Window_BattleActor.prototype.setUserTargetSubject = function(batler) {
    this._NUUN_subject = batler;
};

Window_BattleActor.prototype.selectForItem = function(action) {
    if (action.isForUser()) {
        this.forceSelect(BattleManager.actor().index());
        this.setCursorFixed(true);
    } else if (action.isForAll()) {
        this.setCursorAll(true);
        this.setCursorNotUserTarget(action);
        this.forceSelect(0);
    } else if (action.isForRandom()) {
        this.setCursorAll(true);
        this.setCursorNotUserTarget(action);
        this.forceSelect(0);
    }
};

Window_MenuActor.prototype.selectTarget = function(index) {
    const actor = $gameParty.members()[index];
    return actor ? actor.isSelected() : false;
};

const _Window_BattleEnemy_initialize = Window_BattleEnemy.prototype.initialize;
Window_BattleEnemy.prototype.initialize = function(rect) {
    _Window_BattleEnemy_initialize.call(this, rect);
    this._forEveryoneSelect = false;
};

Window_BattleEnemy.prototype.selectForItem = function(action) {
    if (action.isForEveryone()) {
        this.setCursorAll(true);
        this.forceSelect(0);
        this._forEveryoneSelect = true;
    } else if (action.isForAll()) {
        this.setCursorAll(true);
        this.setCursorNotUserTarget(action);
        this.forceSelect(0);
    } else if (action.isForRandom()) {
        this.setCursorAll(true);
        this.setCursorNotUserTarget(action);
        this.forceSelect(0);
    }
};

Window_Base.prototype.cursorAllUserSelect = function(index, unit) {
    let activeMember = [];
    if (this._userTargetTag && this._userTargetTag.UserTagEval) {
        const subject = this._NUUN_subject;
        const members = unit.members();
        activeMember = eval(this._userTargetTag.UserTagEval);
    } else {
        activeMember = unit.aliveMembers();
    }
    unit.targetSelect(activeMember);
    this.refreshCursor();
};

const _Window_BattleActor_select = Window_BattleActor.prototype.select;
Window_BattleActor.prototype.select = function(index) {
    if (this.cursorAll()) {
        Window_Selectable.prototype.select.call(this, index);
        this.cursorAllUserSelect(index, $gameParty);
    } else {
        _Window_BattleActor_select.call(this, index);
    }
};

const _Window_BattleEnemy_select = Window_BattleEnemy.prototype.select;
Window_BattleEnemy.prototype.select = function(index) {
    if (this.cursorAll()) {
        Window_Selectable.prototype.select.call(this, index);
        this.cursorAllUserSelect(index, $gameTroop);
    } else {
        _Window_BattleEnemy_select.call(this, index);
    }
};

const _Window_BattleEnemy_hide = Window_BattleEnemy.prototype.hide;
Window_BattleEnemy.prototype.hide = function() {
    _Window_BattleEnemy_hide.call(this);
    if (this._forEveryoneSelect) {
        $gameParty.select(null);
        this._forEveryoneSelect = false;
    }
};

Game_Unit.prototype.targetSelect = function(activeMember) {
    if (activeMember && activeMember[0]) {
        for (const member of this.members()) {
        const find = activeMember.find(target => member === target);
            if (find) {
                member.select();
            } else {
                member.deselect();
            }
        }
    } else {
        for (const member of this.members()) {
        member.deselect();
        }
    }
};

Game_Unit.prototype.select = function(target) {
  activeMember = [];
  activeMember.push(target);
  this.targetSelect(activeMember);
};

const _Window_Selectable_refreshCursorForAll = Window_Selectable.prototype.refreshCursorForAll;
Window_Selectable.prototype.refreshCursorForAll = function() {
    const maxItems = this.maxItems();
    if (maxItems > 0) {
        if (this._multiCursor) {
        this.setCursorRect(0, 0, 0, 0);
        for (let i = 0; maxItems > i; i++) {
            const target = this.selectTarget(i);
            if (target) {
            const rect = this.itemRect(i);
            this.setCursorRects(rect.x, rect.y, rect.width, rect.height, i);
            }
        } 
        } else {
            _Window_Selectable_refreshCursorForAll.call(this);
        }
    } else {
        this.setCursorRect(0, 0, 0, 0);
    }
};

Window_BattleEnemy.prototype.selectTarget = function(index) {
    const enemy = $gameTroop.aliveMembers()[index];
    return enemy ? enemy.isSelected() : false;
};

Window_BattleActor.prototype.selectTarget = function(index) {
    const actor = $gameParty.members()[index];
    return actor ? actor.isSelected() : false;
};


const _Window_initialize = Window.prototype.initialize;
Window.prototype.initialize = function() {
    _Window_initialize.call(this);
    this._multiCursorRect = [];
    this._multiCursorSprite = [];
    this._cursorIndex = 0;
};

Window.prototype.setCursorRects = function(x, y, width, height, index) {
    this._createCursorSprites(index);
    this._cursorIndex = index;
    const cw = Math.floor(width || 0);
    const ch = Math.floor(height || 0);
    this._multiCursorRect[index].x = Math.floor(x || 0);
    this._multiCursorRect[index].y = Math.floor(y || 0);
    if (this._multiCursorRect[index].width !== cw || this._multiCursorRect[index].height !== ch) {
        this._multiCursorRect[index].width = cw;
        this._multiCursorRect[index].height = ch;
        this._multiRefreshCursor(index);
    }
};

const _Window_setCursorRect = Window.prototype.setCursorRect;
Window.prototype.setCursorRect = function(x, y, width, height) {
    _Window_setCursorRect.call(this, x, y, width, height);
    this._multiCursorSprite.forEach((sprite, i) => {
        if (sprite.width > 0 && sprite.height > 0) {
        this.setCursorRects(0, 0, 0, 0, i);
        }
    });
};

Window.prototype._createCursorSprites = function(index) {
    if (!this._multiCursorSprite[index]) {
        const cursorSprite = new Sprite();
        for (let i = 0; i < 9; i++) {
            cursorSprite.addChild(new Sprite());
        }
        this._clientArea.addChildAt(cursorSprite, 1);
        this._multiCursorSprite[index] = cursorSprite;
        this._multiCursorRect[index] = new Rectangle();
    }
};

Window.prototype._multiRefreshCursor = function(index) {
    const drect = this._multiCursorRect[index].clone();
    const srect = { x: 96, y: 96, width: 48, height: 48 };
    const m = 4;
    for (const child of this._multiCursorSprite[index].children) {
        child.bitmap = this._windowskin;
    }
    this._setRectPartsGeometry(this._multiCursorSprite[index], srect, drect, m);
};

const _Window_refreshCursor = Window.prototype._refreshCursor;
Window.prototype._refreshCursor = function() {
    _Window_refreshCursor.call(this);
    if (this._multiCursor) {
        this._multiCursorSprite.forEach((sprite, i) => {
        const drect = this._multiCursorRect[i].clone();
        const srect = { x: 96, y: 96, width: 48, height: 48 };
        const m = 4;
        for (const child of sprite.children) {
            child.bitmap = this._windowskin;
        }
        this._setRectPartsGeometry(sprite, srect, drect, m);
        });
    }
};

const _Window_updateCursor = Window.prototype._updateCursor;
Window.prototype._updateCursor = function() {
    _Window_updateCursor.call(this);
    if (this._multiCursor) {
        this._multiCursorSprite.forEach((sprite, i) => {
        sprite.alpha = this._makeCursorAlpha();
        sprite.visible = this.isOpen() && this.cursorVisible;
        sprite.x = this._multiCursorRect[i].x;
        sprite.y = this._multiCursorRect[i].y;
        });
    }
};

})();