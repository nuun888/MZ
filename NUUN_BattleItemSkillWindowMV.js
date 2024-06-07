/*:-----------------------------------------------------------------------------------
 * NUUN_BattleItemSkillWindowMV.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc  MV-style display of item and skill selection screen during battle
 * @author NUUN
 * @version 1.3.2
 * 
 * @help
 * The item and skill selection screen during battle will be changed to a MV style format.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * 
 * Log
 * 6/8/2024 Ver.1.3.2
 * Fixed an issue where the item screen was not displayed correctly when using the Battle Style Extension Plugin.
 * 8/27/2022 Ver.1.3.1
 * Processing fixes.
 * 6/5/2022 Ver.1.3.0
 * Added a feature to hide actor commands while selecting items and skills.
 * 3/17/2022 Ver.1.2.0
 * Added the ability to specify which columns to display.
 * 11/15/2021 Ver.1.1.3
 * Fixed an issue that caused the Cancel button to not display properly.
 * Fixed an issue where the item screen and skill screen remained displayed when selecting a target.
 * 11/14/2021 Ver.1.1.2
 * Fixed an issue where the actor window would not appear if you selected a skill or item, displayed the enemy selection screen, and then canceled.
 * 11/5/2021 Ver.1.1.1
 * Fixed an issue where the Cancel button would appear at the top even when the skill or item window was not open.
 * 11/5/2021 Ver.1.1.0
 * Added a feature that allows the display to reach the bottom of the screen.
 * Fixed so that one line is displayed when there are no skills or items in variable mode.
 * Changed the position of the cancel button.
 * 2/3/2021 Ver.1.0.2
 * Fixed an issue where the battle screen would be displayed when displaying the item or skill screen on the map.
 * 2/1/2021 Ver.1.0.1
 * Fixed the cancel button handling.
 * 1/31/2021 Ver.1.0.0
 * First edition.
 * 
 * @param ItemMaxRow
 * @desc The row to display.
 * @text Display rows
 * @type number
 * @default 6
 * @min 1
 * 
 * @param Cols
 * @desc The columns to display.
 * @text Display Cols
 * @type number
 * @default 2
 * @min 1
 * 
 * @param FullWindowHeight
 * @text Display to bottom of screen
 * @desc Allows the window to extend to the bottom of the screen (usually the actor window).
 * @type boolean
 * @default false
 * 
 * @param VariableHeight
 * @text Variable vertical width
 * @desc The vertical width changes depending on the number of items and skills.
 * @type boolean
 * @default false
 * 
 * @param ActorCommandVisible
 * @text Hide actor commands
 * @desc Hides actor commands when selecting items and skills.
 * @type boolean
 * @default false
 * 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc  戦闘中アイテム、スキル選択画面MV風表示
 * @author NUUN
 * @version 1.3.2
 * 
 * @help
 * 戦闘中のアイテム、スキル選択画面をMV風形式に変更させます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 
 * 更新履歴
 * 2024/6/8 Ver.1.3.2
 * バトルスタイル拡張プラグイン併用時にアイテム画面の表示が正常に表示されない問題を修正。
 * 2022/8/27 Ver.1.3.1
 * 処理の修正。
 * 2022/6/5 Ver.1.3.0
 * アイテム、スキル選択中にアクターコマンドを非表示にする機能を追加いたしました。
 * 2022/3/17 Ver.1.2.0
 * 表示する列を指定できる機能を追加。
 * 2021/11/15 Ver.1.1.3
 * キャンセルボタンの表示がおかしくなる問題を修正。
 * 対象選択時にアイテム画面、スキル画面が表示されたままだったのを修正。
 * 2021/11/14 Ver.1.1.2
 * スキル、アイテムを選択し敵の選択画面を表示した後にキャンセルするとアクターウィンドウが表示されない問題を修正。
 * 2021/11/5 Ver.1.1.1
 * キャンセルボタンの表示がスキル、アイテムウィンドウが開いていなくても一番上に表示されてしまう問題を修正。
 * 2021/11/5 Ver.1.1.0
 * 画面下まで表示できる機能を追加。
 * 可変モードでスキル及びアイテムが１つもない場合、１行分表示されるように修正。
 * キャンセルボタンの位置を変更。
 * 2021/2/3 Ver.1.0.2
 * マップ上でアイテム、スキル画面を表示した時、戦闘時の画面が表示されてしまう問題を修正。
 * 2021/2/1 Ver.1.0.1
 * キャンセルボタンの処理を修正。
 * 2021/1/31 Ver.1.0.0
 * 初版
 * 
 * @param ItemMaxRow
 * @desc 表示する行。
 * @text 表示行
 * @type number
 * @default 6
 * @min 1
 * 
 * @param Cols
 * @desc 表示する列。
 * @text 表示列
 * @type number
 * @default 2
 * @min 1
 * 
 * @param FullWindowHeight
 * @text 画面下まで表示
 * @desc ウィンドウを画面下まで表示出来るようにします。（通常はアクターウィンドウまで）
 * @type boolean
 * @default false
 * 
 * @param VariableHeight
 * @text 縦幅可変
 * @desc 縦幅をアイテム、スキルの個数によって高さを変えます。
 * @type boolean
 * @default false
 * 
 * @param ActorCommandVisible
 * @text アクターコマンド非表示
 * @desc アイテム、スキル選択時にアクターコマンドを非表示にします。
 * @type boolean
 * @default false
 * 
 * 
 */

var Imported = Imported || {};
Imported.NUUN_BattleItemSkillWindowMV = true;

(() => {
const parameters = PluginManager.parameters('NUUN_BattleItemSkillWindowMV');
const VariableHeight = eval(parameters['VariableHeight'] || "false");
const FullWindowHeight = eval(parameters['FullWindowHeight'] || "false");
const ItemMaxRow = Number(parameters['ItemMaxRow'] || 6);
const Cols = Number(parameters['Cols'] || 2);
const ActorCommandVisible = eval(parameters['ActorCommandVisible'] || "false");
let maxHeight = 0;

const _Scene_Battle_initialize = Scene_Battle.prototype.initialize;
Scene_Battle.prototype.initialize = function() {
    _Scene_Battle_initialize.call(this);
    $gameTemp.openItemSkillWindow = false;
};

const _Scene_Battle_skillWindowRect = Scene_Battle.prototype.skillWindowRect;
Scene_Battle.prototype.skillWindowRect = function() {
    const rect = _Scene_Battle_skillWindowRect.call(this);
    rect.y = this._helpWindow.height + this.itemSkillWindowButtonAreaHeight();
    maxHeight = this.itemSkillWindowMaxHeight(rect.y)
    rect.height = Math.min(this.calcWindowHeight(ItemMaxRow, true), maxHeight);
    return rect;
};

Scene_Battle.prototype.itemWindowRect = function() {
    return this.skillWindowRect();//強制的に再定義
};

const _Scene_Battle_helpWindowRect = Scene_Battle.prototype.helpWindowRect;
Scene_Battle.prototype.helpWindowRect = function() {
    const rect = _Scene_Battle_helpWindowRect.call(this);
    rect.y = this.itemSkillWindowButtonAreaHeight();
    return rect;
};

Scene_Battle.prototype.itemSkillWindowButtonAreaHeight = function() {
    return ConfigManager.touchUI ? this.buttonAreaHeight() - Math.floor((this.buttonAreaHeight() - 48) / 2) : 0;
};

Scene_Battle.prototype.itemSkillWindowMaxHeight = function(y) {
    if (FullWindowHeight) {
        return Graphics.boxHeight - y;
    } else {
        return Graphics.boxHeight - y - this.windowAreaHeight();
    }
};

const _Scene_Battle_createCancelButton = Scene_Battle.prototype.createCancelButton;
Scene_Battle.prototype.createCancelButton = function() {
    _Scene_Battle_createCancelButton.call(this);
    this._biswMV_cancelButton = new Sprite_Button("cancel");
    this._biswMV_cancelButton.x = Graphics.boxWidth - this._biswMV_cancelButton.width - 4;
    this._biswMV_cancelButton.y = 0;
    this.addWindow(this._biswMV_cancelButton);
};

const _Scene_Battle_updateCancelButton = Scene_Battle.prototype.updateCancelButton;
Scene_Battle.prototype.updateCancelButton = function() {
    _Scene_Battle_updateCancelButton.call(this);
    this.biswMVUpdateCancelButtonPosition();
};

Scene_Battle.prototype.biswMVUpdateCancelButtonPosition = function() {
    if (this._biswMV_cancelButton) {
        this._biswMV_cancelButton.visible = $gameTemp.openItemSkillWindow;
        if ($gameTemp.openItemSkillWindow) {
        this._cancelButton.visible = false;
        }
    }
};

const _Scene_Battle_commandSkill = Scene_Battle.prototype.commandSkill;
Scene_Battle.prototype.commandSkill = function() {
    _Scene_Battle_commandSkill.call(this);
    if (!this._statusWindow.visible) {
        this._statusWindow.show();
    }
    if (!ActorCommandVisible && !this._actorCommandWindow.visible) {
        this._actorCommandWindow.show();
    }
};

const _Scene_Battle_commandItem = Scene_Battle.prototype.commandItem;
Scene_Battle.prototype.commandItem = function() {
    _Scene_Battle_commandItem.call(this);
    if (!this._statusWindow.visible) {
        this._statusWindow.show();
    }
    if (!ActorCommandVisible && !this._actorCommandWindow.visible) {
        this._actorCommandWindow.show();
    }
};

const _Scene_Battle_startActorSelection = Scene_Battle.prototype.startActorSelection;
Scene_Battle.prototype.startActorSelection = function() {
    _Scene_Battle_startActorSelection.call(this);
    this._itemWindow.hide();
    this._skillWindow.hide();
};

const _Scene_Battle_startEnemySelection = Scene_Battle.prototype.startEnemySelection;
Scene_Battle.prototype.startEnemySelection = function() {
    _Scene_Battle_startEnemySelection.call(this);
    this._itemWindow.hide();
    this._skillWindow.hide();
};

const _Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
    _Scene_Battle_onEnemyCancel.call(this);
    switch (this._actorCommandWindow.currentSymbol()) {
        case "skill":
        case "item":
        this._statusWindow.show();
        break;
    }
};


const _Window_Selectable_hideHelpWindow = Window_Selectable.prototype.hideHelpWindow;
Window_Selectable.prototype.hideHelpWindow = function() {
    if (this._helpWindow && $gameTemp.openItemSkillWindow) {
        $gameTemp.openItemSkillWindow = false;
    }
    _Window_Selectable_hideHelpWindow.call(this);

};

const _Window_Selectable_paint = Window_Selectable.prototype.paint;
Window_Selectable.prototype.paint = function() {
    const className = String(this.constructor.name);
    if (className === 'Window_BattleSkill') {
        this.setItemHeight();
    } else if (className === 'Window_BattleItem') {
        this.setItemHeight();
    }
    _Window_Selectable_paint.call(this);
};

Window_Selectable.prototype.setItemHeight = function() {
    if (VariableHeight) {
        const row = Math.max(Math.ceil(this.maxItems() / this.maxCols()), 1);
        this.height = Math.min(maxHeight, this.fittingHeight(row));
    }
};


Window_BattleSkill.prototype.maxCols = function() {
    return Cols;
};

const _Window_BattleSkill_show = Window_BattleSkill.prototype.show;
Window_BattleSkill.prototype.show = function() {
    _Window_BattleSkill_show.call(this);
    $gameTemp.openItemSkillWindow = true;
};

Window_BattleItem.prototype.maxCols = function() {
    return Cols;
};

const _Window_BattleItem_show = Window_BattleItem.prototype.show;
Window_BattleItem.prototype.show = function() {
    _Window_BattleItem_show.call(this);
    $gameTemp.openItemSkillWindow = true;
};

})();