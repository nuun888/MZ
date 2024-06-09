/*:-----------------------------------------------------------------------------------
 * NUUN_SceneBattleFormation.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc メンバー変更画面(戦闘)
 * @author NUUN
 * @version 1.3.9
 * @base NUUN_SceneFormation
 * @orderAfter NUUN_SceneFormation
 * 
 * @help
 * 戦闘中にメンバーを変更できるようにします。
 * このプラグインはメンバー変更画面（NUUN_SceneFormation）の拡張機能です。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/6/9 Ver.1.3.9
 * ターン制で並び替えをアクターコマンドに指定した際に、メンバー交代後に前のアクターのコマンドが表示されたままになる問題を修正。
 * メンバー交代をした際に、コマンド選択が初期化されない問題を修正。
 * 2024/5/25 Ver.1.3.8
 * ターン制でメンバー変更画面を閉じた時に、行動回数が再設定される問題を修正。
 * 2023/8/8 Ver.1.3.7
 * メンバー入れ替え時にカーソルの位置がずれて表示される問題を修正。
 * 2023/8/6 Ver.1.3.6
 * アクターコマンドから選択できる条件を指定できる機能を追加。
 * 2023/7/24 Ver.1.3.5
 * 戦闘中の並び替えのコマンド名を指定できる機能を追加。
 * 処理の修正。
 * 2022/9/14 Ver.1.3.4
 * サポートアクターを呼び出した際にゲームが進行しなくなる問題を修正。
 * 2022/3/30 Ver.1.3.3
 * 戦闘メンバーの表示列、行数を設定できる機能を追加。
 * 2022/2/26 Ver.1.3.2
 * 戦闘中に画面を閉じるとアクター選択コマンドがキャンセル扱いにされる問題を修正。
 * メンバー入れ替え時のカーソルの処理を変更。
 * 2022/2/25 Ver.1.3.1
 * TPBが溜まっているアクターを交換するとアクターウィンドウがアクティブになる問題を修正。
 * 2022/2/23 Ver.1.3.0
 * 戦闘メンバー人数の可変対応による処理の変更。
 * 2021/11/27 Ver.1.2.0
 * 立ち絵を表示できる機能を追加。
 * 2021/11/15 Ver.1.1.0
 * ウィンドウの配置を戦闘用と別々に設定できるように変更。
 * 控えメンバーのウィンドウのX座標がある程度の座標で止まる問題を修正。
 * 2021/9/17 Ver.1.0.4
 * 戦闘メンバーから控えメンバーにカーソルが移るときに空白にカーソルが選択してしまう問題を修正。
 * 2021/8/24 Ver.1.0.3
 * パーティコマンドに表示させる位置を指定できる機能を追加。（1で逃げるより先に表示されます）
 * 2021/8/23 Ver.1.0.2
 * ターン制でメンバーを交代した後にコマンドで攻撃を選択するとエラーが出る問題を修正。
 * 2021/8/17 Ver.1.0.1
 * サポートアクターに対応。
 * アクター並び替え固定に対応。
 * 2021/8/15 Ver.1.0.0
 * 初版
 * 
 * @param BasicSetting
 * @text 基本設定
 * @default ------------------------------
 * 
 * @param WindowCenter
 * @text ウィンドウ中央自動調整
 * @desc ウィンドウを中央に自動調整します。待機メンバーウィンドウの横幅で調整されます。
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param WindowZero
 * @text ウィンドウ基準0
 * @desc すべてのウィンドウの座標基準を0,0にします。独自にレイアウトを変更したい場合に使用してください。
 * @type boolean
 * @default false
 * @parent BasicSetting
 * 
 * @param CommandShowMode
 * @text コマンド表示対象
 * @desc 並び替えをコマンドに表示させる対象。
 * @type select
 * @option なし
 * @value 'None'
 * @option パーティコマンド
 * @value 'Party'
 * @option アクターコマンド
 * @value 'Actor'
 * @default 'Party'
 * @parent BasicSetting
 * 
 * @param CommandIndex
 * @text 挿入インデックス番号
 * @desc 挿入するパーティコマンドインデックス番号。
 * @type number
 * @default 1
 * @min 0
 * @parent BasicSetting
 * 
 * @param BattleFormationCommandName
 * @text 並び替えコマンド名
 * @desc 並び替え(戦闘時のコマンド)のコマンド名を設定します。無記入の場合はデータベースの名称が適用されます。
 * @type string
 * @default 
 * @parent BasicSetting
 * 
 * @param CondFormationActor
 * @text アクターコマンドの並び替え条件
 * @desc アクターコマンドの並び替え画面を開ける条件を指定します。
 * @type combo
 * @option BattleManager.actor() === $gameParty.leader()://リーダーのみ
 * @default
 * @parent BasicSetting
 * 
 * @param BattleMemberNameSetting
 * @text 戦闘メンバー名称ウィンドウ設定
 * @default ------------------------------
 * 
 * @param BattleMemberName_X
 * @text 戦闘メンバー名称ウィンドウX座標
 * @desc 戦闘時の戦闘メンバー名称ウィンドウX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleMemberNameSetting
 * 
 * @param BattleMemberName_Y
 * @text 戦闘メンバー名称ウィンドウY座標（相対）
 * @desc 戦闘時の戦闘メンバー名称ウィンドウY座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleMemberNameSetting
 * 
 * @param MemberNameSetting
 * @text 待機メンバー名称ウィンドウ設定設定
 * @default ------------------------------
 * 
 * @param MemberName_X
 * @text 待機メンバー名称ウィンドウX座標
 * @desc 戦闘時の待機メンバー名称ウィンドウX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent MemberNameSetting
 * 
 * @param MemberName_Y
 * @text 待機メンバー名称ウィンドウY座標（相対）
 * @desc 戦闘時の待機メンバー名称ウィンドウY座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @parent MemberNameSetting
 * 
 * @param BattleMemberSetting
 * @text 戦闘メンバーウィンドウ設定
 * @default ------------------------------
 * 
 * @param BattleMember_Cols
 * @text 戦闘メンバー横表示数
 * @desc 戦闘メンバー横表示数(戦闘) 0で最大メンバー数に応じて表示幅が変わります。
 * @type number
 * @default 0
 * @min 0
 * @parent BattleMemberSetting
 * 
 * @param BattleMember_Rows
 * @text 戦闘メンバー縦表示数
 * @desc 戦闘メンバー縦表示数(戦闘)
 * @type number
 * @default 1
 * @min 1
 * @parent BattleMemberSetting
 * 
 * @param BattleMember_X
 * @text 戦闘メンバーウィンドウX座標
 * @desc 戦闘時の戦闘メンバーウィンドウX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleMemberSetting
 * 
 * @param BattleMember_Y
 * @text 戦闘メンバーウィンドウY座標（相対）
 * @desc 戦闘時の戦闘メンバーウィンドウY座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @parent BattleMemberSetting
 * 
 * @param MemberSetting
 * @text 待機メンバーウィンドウ設定
 * @default ------------------------------
 * 
 * @param Member_Cols
 * @text 待機メンバー横表示数
 * @desc 待機メンバー横表示数(戦闘)
 * @type number
 * @default 10
 * @min 0
 * @parent MemberSetting
 * 
 * @param Member_Rows
 * @text 待機メンバー縦表示数
 * @desc 待機メンバー縦表示数(戦闘)
 * @type number
 * @default 1
 * @parent MemberSetting
 * 
 * @param Member_X
 * @text 待機メンバーウィンドウX座標
 * @desc 戦闘時の待機メンバーウィンドウX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent MemberSetting
 * 
 * @param Member_Y
 * @text 待機メンバーウィンドウY座標（相対）
 * @desc 戦闘時の待機メンバーウィンドウY座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @parent MemberSetting
 * 
 * @param StatusSetting
 * @text ステータスウィンドウ設定
 * @default ------------------------------
 * 
 * @param Status_X
 * @text ステータスウィンドウX座標
 * @desc 戦闘時のステータスウィンドウX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent StatusSetting
 * 
 * @param Status_Y
 * @text ステータスウィンドウY座標（相対）
 * @desc 戦闘時のステータスウィンドウY座標（相対）
 * @type number
 * @default 0
 * @min -9999
 * @parent StatusSetting
 * 
 */

var Imported = Imported || {};
Imported.NUUN_SceneBattleFormation = true;

(() => {
const parameters = PluginManager.parameters('NUUN_SceneBattleFormation');
const parameters2 = PluginManager.parameters('NUUN_SceneFormation');
const Member_Cols = Number(parameters2['Member_Cols'] || 10);
const Member_Rows = Number(parameters2['Member_Rows'] || 1);
const BattleMemberName_X = Number(parameters['BattleMemberName_X'] || 0);
const BattleMemberName_Y = Number(parameters['BattleMemberName_Y'] || 0);
const MemberName_X = Number(parameters['MemberName_X'] || 0);
const MemberName_Y = Number(parameters['MemberName_Y'] || 0);
const BattleMember_X = Number(parameters['BattleMember_X'] || 0);
const BattleMember_Y = Number(parameters['BattleMember_Y'] || 0);
const Member_X = Number(parameters['Member_X'] || 0);
const Member_Y = Number(parameters['Member_Y'] || 0);
const Status_X = Number(parameters['Status_X'] || 0);
const Status_Y = Number(parameters['Status_Y'] || 0);
const WindowZero = eval(parameters['WindowZero'] || "false");
const WindowCenter = eval(parameters['WindowCenter'] || "true");
const CommandIndex = Number(parameters['CommandIndex'] || 1);
const CommandShowMode = eval(parameters['CommandShowMode']) || 'Party';
const BattleFormationCommandName = String(parameters['BattleFormationCommandName'] || "");
const CondFormationActor = String(parameters['CondFormationActor']);

function getBattleFormationCommandName() {
    return BattleFormationCommandName ? BattleFormationCommandName : TextManager.formation;
}

const _Game_Temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _Game_Temp_initialize.call(this);
    this.formationRefresh = false;
};

Game_Party.prototype.formationMakeActions = function() {
    if ($gameTemp.formationRefresh) {
        if (Imported.NUUN_SupportActor) {
            $gameParty.setWithSupportActorMember();
        }
        for (const member of this.members()) {
            member._actionInputIndex = 0;
            if (member._actions.length === 0) {
                member.makeActions();
            }
        }
    }
};

Window_Command.prototype.addFormationCommand = function() {
    this.addCommand(getBattleFormationCommandName(), "formation", $gameParty.useFormation());
    this._list.splice(CommandIndex, 0, this._list.pop());
};

Window_Command.prototype.addFormationActorCommand = function() {
    this.addCommand(getBattleFormationCommandName(), "formation", $gameParty.useFormationActor());
    this._list.splice(CommandIndex, 0, this._list.pop());
};

const _Window_PartyCommand_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
Window_PartyCommand.prototype.makeCommandList = function() {
    _Window_PartyCommand_makeCommandList.call(this);
    if (CommandShowMode === "Party")
    this.addFormationCommand();
};

const _Window_ActorCommand_makeCommandList = Window_ActorCommand.prototype.makeCommandList;
Window_ActorCommand.prototype.makeCommandList = function() {
    _Window_ActorCommand_makeCommandList.call(this);
    if (this._actor && CommandShowMode === "Actor") {
        this.addFormationActorCommand();
    }
};

const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
    _Scene_Battle_createAllWindows.call(this);
    this._formation = this.setNuun_Formation(true);
    this._formation.create();
};

const _Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
Scene_Battle.prototype.createPartyCommandWindow = function() {
    _Scene_Battle_createPartyCommandWindow.call(this);
    this._partyCommandWindow.setHandler("formation", this.commandFormation.bind(this));
};

const _Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
Scene_Battle.prototype.createActorCommandWindow = function() {
    _Scene_Battle_createActorCommandWindow.call(this);
    this._actorCommandWindow.setHandler("formation", this.actorCommandFormation.bind(this));
};

Scene_Battle.prototype.commandFormation = function() {
    this._formation.setCommand(this._partyCommandWindow);
    this._formation.open();
};

Scene_Battle.prototype.actorCommandFormation = function() {
    this._formation.setCommand(this._actorCommandWindow);
    this._formation.open();
};

const _Scene_Battle_isAnyInputWindowActive = Scene_Battle.prototype.isAnyInputWindowActive;
Scene_Battle.prototype.isAnyInputWindowActive = function() {
    return (_Scene_Battle_isAnyInputWindowActive.call(this) ||
    this._formation._battleMemberWindow.active ||
    this._formation._memberWindow.active);
};

const _Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    _Scene_Battle_update.call(this);
    this._formation.update();
};

Scene_Battle.prototype.isFormationActive = function() {
    return this._formation._battleMemberWindow.active || this._formation._memberWindow.active;
};

const _Scene_Battle_needsInputWindowChange = Scene_Battle.prototype.needsInputWindowChange;
Scene_Battle.prototype.needsInputWindowChange = function() {
    return _Scene_Battle_needsInputWindowChange.call(this) && !this.isFormationActive();
};

const _Scene_Battle_hideSubInputWindows = Scene_Battle.prototype.hideSubInputWindows;
Scene_Battle.prototype.hideSubInputWindows = function() {
    _Scene_Battle_hideSubInputWindows.call(this);
    this._formation._battleMemberWindow.deactivate();
    this._formation._memberWindow.deactivate();
    this._formation._battleMemberNameWindow.hide();
    this._formation._memberNameWindow.hide();
    this._formation._battleMemberWindow.hide();
    this._formation._memberWindow.hide();
    this._formation._memberStatusWindow.hide();
};


Game_Party.prototype.useFormationActor = function() {
    return (CondFormationActor ? eval(CondFormationActor) : true) && this.useFormation();
};

BattleManager.battleCommandRefresh = function() {
    if ($gameTemp.formationRefresh) {
        $gameTemp.formationRefresh = false;
        if (this.isTpb()) {
            if (this._currentActor) {
                if (Imported.NUUN_SupportActor) {
                    $gameParty.setWithSupportActorMember();
                }
                const index = $gameParty.battleMembers().indexOf(this._currentActor);
                if (index >= 0) {
                    SceneManager._scene._statusWindow.selectActor(this._currentActor);
                } else {
                    this._currentActor = null;
                }
            }
        } else {
            this._currentActor = null;
        }
    }  
};

})();