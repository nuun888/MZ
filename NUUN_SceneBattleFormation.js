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
 * @version 1.1.0
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
 * @param CommandIndex
 * @text 挿入インデックス番号
 * @desc 挿入するパーティコマンドインデックス番号。
 * @type number
 * @default 1
 * @min 0
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

const _Scene_Battle_createWindowLayer = Scene_Battle.prototype.createWindowLayer;
Scene_Battle.prototype.createWindowLayer = function() {
  this.createFormationMemberActor();
  _Scene_Battle_createWindowLayer.call(this);
};

Scene_Battle.prototype.createFormationMemberActor = function() {
  const sprite = new Sprite_FormationActor();
  this.addChild(sprite);
  this._formationSpriteActor = sprite;
  sprite.x = (Graphics.width - Graphics.boxWidth) / 2;
  sprite.y = (Graphics.height - Graphics.boxHeight) / 2;
  sprite.hide();
};

const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
  _Scene_Battle_createAllWindows.call(this);
  this.createFormationBattleMemberWindow();
  this.createFormationBattleMemberNameWindow();
  this.createFormationMemberWindow();
  this.createFormationMemberNameWindow();
  this.createFormationMemberStatusWindow();
};

Scene_Battle.prototype.createFormationBattleMemberNameWindow = function() {
  const rect = this.battleMemberFormationNameWindowRect();
  this._battleMemberFormationNameWindow = new Window_FormationBattleMemberName(rect);
  this._battleMemberFormationNameWindow.hide();
  this.addWindow(this._battleMemberFormationNameWindow);
};

Scene_Battle.prototype.createFormationMemberNameWindow = function() {
  const rect = this.memberNameFormationWindowRect();
  this._memberFormationNameWindow = new Window_FormationMemberName(rect);
  this._memberFormationNameWindow.hide();
  this.addWindow(this._memberFormationNameWindow);
};

Scene_Battle.prototype.createFormationBattleMemberWindow = function() {
  const rect = this.battleMemberFormationWindowRect();
  this._battleMemberFormationWindow = new Window_FormationBattleMember(rect);
  this._battleMemberFormationWindow.setHandler("ok", this.onBattleMemberFormationOk.bind(this));
  this._battleMemberFormationWindow.setHandler("cancel", this.onBattleMemberFormationCancel.bind(this));
  this._battleMemberFormationWindow.hide();
  this.addWindow(this._battleMemberFormationWindow);
  this.setFormationSpriteActor(this._battleMemberFormationWindow);
};

Scene_Battle.prototype.createFormationMemberWindow = function() {
  const rect = this.memberFormationWindowRect();
  this._memberFormationWindow = new Window_FormationMember(rect);
  this._memberFormationWindow.setHandler("ok", this.onMemberFormationOk.bind(this));
  this._memberFormationWindow.setHandler("cancel", this.onMemberFormationCancel.bind(this));
  this._memberFormationWindow.hide();
  this._battleMemberFormationWindow.setMemberWindow(this._memberFormationWindow);
  this._memberFormationWindow.setMemberWindow(this._battleMemberFormationWindow);
  this.addWindow(this._memberFormationWindow);
  this.setFormationSpriteActor(this._memberFormationWindow);
};

Scene_Battle.prototype.createFormationMemberStatusWindow = function() {
  const rect = this.memberFormationStatusWindowRect();
  this._memberFormationStatusWindow = new Window_FormationStatus(rect);
  this.addWindow(this._memberFormationStatusWindow);
  this._battleMemberFormationWindow.setMemberStatusWindow(this._memberFormationStatusWindow);
  this._memberFormationWindow.setMemberStatusWindow(this._memberFormationStatusWindow);
  this._memberFormationStatusWindow.hide();
  $gameTemp.changeCursor = false;
  $gameTemp.changeTouch = false;
};

Scene_Battle.prototype.battleMemberFormationNameWindowRect = function() {
  const wx = BattleMemberName_X + (WindowCenter ? (Graphics.boxWidth - this.memberWindowWidth()) / 2 : 0);
  const wy = BattleMemberName_Y;
  const ww = this.nameFormationWidth();
  const wh = this.calcWindowHeight(1, true);
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.memberNameFormationWindowRect = function() {
  const wx = MemberName_X + (WindowCenter ? (Graphics.boxWidth - this.memberWindowWidth()) / 2 : 0);
  const wy = MemberName_Y + (WindowZero ? 0 : this.memberFormationY());
  const ww = this.nameFormationWidth();
  const wh = this.calcWindowHeight(1, true);
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.battleMemberFormationWindowRect = function() {
  const wx = BattleMember_X + (WindowCenter ? (Graphics.boxWidth - this.memberWindowWidth()) / 2 : 0);
  const wy = BattleMember_Y + (WindowZero ? 0 : this.calcWindowHeight(1, true));
  const ww = $gameSystem.windowPadding() * 2 + $gameParty.defaultMaxBattleMembers() * 56;
  const wh = 80;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.memberFormationWindowRect = function() {
  const ww = this.memberWindowWidth();
  const wx = Member_X + (WindowCenter ? (Graphics.boxWidth - ww) / 2 : 0);
  const wy = Member_Y + (WindowZero ? 0: this.memberFormationY() + this.calcWindowHeight(1, true));
  const wh = 86 + (Member_Rows - 1) * 48;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.memberFormationStatusWindowRect = function() {
  const wx = Status_X;
  const wh = this.calcWindowHeight(5, true);
  const wy = Status_Y + (WindowZero ? 0 : Graphics.boxHeight - wh);
  const ww = Graphics.boxWidth;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.nameFormationWidth = function() {
  return 240;
};

Scene_Battle.prototype.memberWindowWidth = function() {
  return $gameSystem.windowPadding() * 2 + Member_Cols * 56;
};

Scene_Battle.prototype.memberFormationY = function() {
  return this._battleMemberFormationWindow.y + this._battleMemberFormationWindow.height + 12;
};

const _Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
  _Scene_Battle_update.call(this);
  this.formationUpddate();
};

Scene_Battle.prototype.formationUpddate = function() {
  if ($gameTemp.changeCursor || $gameTemp.changeTouch) {
    if (this._battleMemberFormationWindow._cursorMode === 'battle') {
      this.onChangeBattleMemberFormationOk();
    } else if (this._memberFormationWindow._cursorMode === 'member') {
      this.onChangeMemberFormationOk();
    }
  }
};

const _Scene_Battle_isAnyInputWindowActive = Scene_Battle.prototype.isAnyInputWindowActive;
Scene_Battle.prototype.isAnyInputWindowActive = function() {
  return (
    _Scene_Battle_isAnyInputWindowActive.call(this) ||
    this._battleMemberFormationWindow.active ||
    this._memberFormationWindow.active
  );
};

Scene_Battle.prototype.onChangeBattleMemberFormationOk = function() {
  this.setMemberFormationCursor();
  const selectIndex = Math.min(this._battleMemberFormationWindow.getSelectIndex(), $gameParty.standbyMembers().length - 1, Member_Cols);
  this._battleMemberFormationWindow.deselect();
  this._battleMemberFormationWindow.deactivate();
  this._memberFormationWindow.activate();
  if ($gameTemp.changeCursor) {
    this._memberFormationWindow.select(selectIndex);
    $gameTemp.changeCursor = false;
  } else {
    $gameTemp.changeTouch = false;
  }
};

Scene_Battle.prototype.onChangeMemberFormationOk = function() {
  this.setBattleMemberFormationCursor();
  const selectIndex = Math.min(this._memberFormationWindow.getSelectIndex(), $gameParty.maxFormationBattleMembers() - 1);
  this._memberFormationWindow.deselect();
  this._memberFormationWindow.deactivate();
  this._battleMemberFormationWindow.activate();
  if ($gameTemp.changeCursor) {
    this._battleMemberFormationWindow.select(selectIndex);
    $gameTemp.changeCursor = false;
  } else {
    $gameTemp.changeTouch = false;
  }
};

Scene_Battle.prototype.setMemberFormationCursor = function() {
  this._battleMemberFormationWindow._cursorMode = 'member';
  this._memberFormationWindow._cursorMode = 'member';
};

Scene_Battle.prototype.setBattleMemberFormationCursor = function() {
  this._battleMemberFormationWindow._cursorMode = 'battle';
  this._memberFormationWindow._cursorMode = 'battle';
};

Scene_Battle.prototype.onBattleMemberFormationOk = function() {
  const actorIndex = this._battleMemberFormationWindow.getSelectIndex();
  let pendingIndex = this._battleMemberFormationWindow.pendingIndex();
  let refreshMode = false;
  if (pendingIndex < 0) {
    pendingIndex = this._memberFormationWindow.pendingIndex();
    if (pendingIndex >= 0) {
      refreshMode = true;
    }
  }
  if (pendingIndex >= 0) {
    setPendingIndex = pendingIndex + (refreshMode ? $gameParty.maxFormationBattleMembers() : 0);
    //const actor = $gameParty.allMembers()[setPendingIndex];
    const maxMember = $gameParty.maxFormationBattleMembers();
    this.onFormationOk(actorIndex, setPendingIndex);
    let newMaxMember = $gameParty.maxFormationBattleMembers();
    if (actorIndex >= newMaxMember) {
      const selectIndex = Math.min(actorIndex, newMaxMember - 1);
      this._battleMemberFormationWindow.select(selectIndex);
    } else {
      this._battleMemberFormationWindow.redrawItem(actorIndex);
    }
    if (refreshMode) {
      this._memberFormationWindow.redrawItem(pendingIndex);
    } else {
      this._battleMemberFormationWindow.redrawItem(pendingIndex);
    }
    if ( maxMember !== newMaxMember) {
      this._memberFormationWindow.refresh();
      this._battleMemberFormationWindow.refresh();
    }
  } else {
    this._battleMemberFormationWindow.setPendingIndex(actorIndex);
    this._battleMemberFormationWindow.setActorStatus(actorIndex);
  }
  this._battleMemberFormationWindow.activate();
};

Scene_Battle.prototype.onMemberFormationOk = function() {
  const actorIndex = this._memberFormationWindow.getSelectIndex();
  let pendingIndex = this._battleMemberFormationWindow.pendingIndex();
  let refreshMode = false;
  if (pendingIndex < 0) {
    pendingIndex = this._memberFormationWindow.pendingIndex();
    if (pendingIndex >= 0) {
      refreshMode = true;
    }
  }
  if (pendingIndex >= 0) {
    setPendingIndex = pendingIndex + (refreshMode ? $gameParty.maxFormationBattleMembers() : 0);
    const maxMember = $gameParty.maxFormationBattleMembers();
    this.onFormationOk(actorIndex + $gameParty.maxFormationBattleMembers(), setPendingIndex);
    let newMaxMember = $gameParty.maxFormationBattleMembers();
    if (refreshMode) {
      this._memberFormationWindow.redrawItem(pendingIndex);
    } else {
      this._battleMemberFormationWindow.redrawItem(pendingIndex);
    }
    this._memberFormationWindow.redrawItem(actorIndex);
    if ( maxMember !== newMaxMember) {
      this._memberFormationWindow.refresh();
      this._battleMemberFormationWindow.refresh();
    }
  } else {
    this._memberFormationWindow.setPendingIndex(actorIndex);
    this._memberFormationWindow.setActorStatus(actorIndex);
  }
  this._memberFormationWindow.activate();
};

Scene_Battle.prototype.onBattleMemberFormationCancel = function() {
  if (this._battleMemberFormationWindow.pendingIndex() >= 0 || this._memberFormationWindow.pendingIndex() >= 0) {
    this._memberFormationWindow.setPendingIndex(-1);
    this._battleMemberFormationWindow.setPendingIndex(-1);
    this._battleMemberFormationWindow.activate();
  } else {
    this._memberFormationWindow.setPendingIndex(-1);
    this._battleMemberFormationWindow.setPendingIndex(-1);
    this.closeFormationWindow();
  }
};

Scene_Battle.prototype.onMemberFormationCancel = function() {
  if (this._battleMemberFormationWindow.pendingIndex() >= 0 || this._memberFormationWindow.pendingIndex() >= 0) {
    this._memberFormationWindow.setPendingIndex(-1);
    this._battleMemberFormationWindow.setPendingIndex(-1);
    this._memberFormationWindow.activate();
  } else {
    this._memberFormationWindow.setPendingIndex(-1);
    this._battleMemberFormationWindow.setPendingIndex(-1);
    this.closeFormationWindow();
  }
};

Scene_Battle.prototype.onFormationOk = function(index, pendingIndex) {
  $gameParty.swapOrder(index, pendingIndex);
  this._memberFormationWindow.setPendingIndex(-1);
  this._battleMemberFormationWindow.setPendingIndex(-1);
};

Scene_Battle.prototype.onAddActorFormationOk = function(index1, index2, mode) {
  if (mode === 'battle') {//戦闘メンバーと-を交換
    dir = -1;
  } else {
    dir =1;
  }
  //const dir = $gameParty.maxBattleMembers() 
  $gameParty.addFormationOrder(index1, dir);
  this._memberFormationWindow.setPendingIndex(-1);
  this._battleMemberFormationWindow.setPendingIndex(-1);
};

const _Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
Scene_Battle.prototype.createPartyCommandWindow = function() {
  _Scene_Battle_createPartyCommandWindow.call(this);
  this._partyCommandWindow.setHandler("formation", this.commandFormation.bind(this));
};

Scene_Battle.prototype.commandFormation = function() {
  this.openFormationWindow();
};

Scene_Battle.prototype.openFormationWindow = function() {
  this._battleMemberFormationNameWindow.open();
  this._memberFormationNameWindow.open();
  this._battleMemberFormationWindow.open();
  this._memberFormationWindow.open();
  this._memberFormationStatusWindow.open();
  this._battleMemberFormationNameWindow.show();
  this._memberFormationNameWindow.show();
  this._battleMemberFormationWindow.show();
  this._memberFormationWindow.show();
  this._memberFormationStatusWindow.show();
  this._battleMemberFormationWindow.refresh();
  this._memberFormationWindow.refresh();
  this._battleMemberFormationWindow.activate();
  this._battleMemberFormationWindow.select(0);
  this._formationSpriteActor.show();
  this.setBattleMemberFormationCursor();
};

Scene_Battle.prototype.closeFormationWindow = function() {
  $gameTemp.requestBattleRefresh();
  if (!BattleManager.isTpb()) {
    BattleManager.startInput();
  }
  this._battleMemberFormationNameWindow.close();
  this._memberFormationNameWindow.close();
  this._battleMemberFormationWindow.close();
  this._memberFormationWindow.close();
  this._memberFormationStatusWindow.close();
  this._memberFormationWindow.deselect();
  this._battleMemberFormationWindow.deselect();
  this._partyCommandWindow.activate();
};

Scene_Battle.prototype.setFormationSpriteActor = function(window) {
  window.setSpriteActor(this._formationSpriteActor);
};


const _Window_PartyCommand_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
Window_PartyCommand.prototype.makeCommandList = function() {
  _Window_PartyCommand_makeCommandList.call(this);
  this.addCommand(TextManager.formation, "formation", $gameParty.useFormation());
  this._list.splice(CommandIndex, 0, this._list.pop());
};

const _Window_FormationBattleMemberName_initialize = Window_FormationBattleMemberName.prototype.initialize;
Window_FormationBattleMemberName.prototype.initialize = function(rect) {
  _Window_FormationBattleMemberName_initialize.call(this, rect);
  if ($gameParty.inBattle()) {
    this.openness = 0;
  }
};

const _Window_FormationMemberName_initialize = Window_FormationMemberName.prototype.initialize;
Window_FormationMemberName.prototype.initialize = function(rect) {
  _Window_FormationMemberName_initialize.call(this, rect);
  if ($gameParty.inBattle()) {
    this.openness = 0;
  }
};

const _Window_FormationBattleMember_initialize = Window_FormationBattleMember.prototype.initialize;
Window_FormationBattleMember.prototype.initialize = function(rect) {
  _Window_FormationBattleMember_initialize.call(this, rect);
  if ($gameParty.inBattle()) {
    this.openness = 0;
  }
};

const _Window_FormationMember_initialize = Window_FormationMember.prototype.initialize;
Window_FormationMember.prototype.initialize = function(rect) {
  _Window_FormationMember_initialize.call(this, rect);
  if ($gameParty.inBattle()) {
    this.openness = 0;
  }
};

const _Window_FormationStatus_initialize = Window_FormationStatus.prototype.initialize;
Window_FormationStatus.prototype.initialize = function(rect) {
  _Window_FormationStatus_initialize.call(this, rect);
  if ($gameParty.inBattle()) {
    this.openness = 0;
  }
};

})();