/*:-----------------------------------------------------------------------------------
 * NUUN_MaxBattleMembers.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc 戦闘メンバー数変更プラグイン
 * @author NUUN
 * @version 1.0.4
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * 戦闘参加メンバーの人数を変更します。またゲーム途中で最大バトルメンバー数を変更できます。
 * 
 * 仕様
 * 最大戦闘メンバー数を前の数値より高く変更した場合、セーブ後のデータでは前の最大戦闘メンバー数よりフォロワーの画像が表示されません。
 * 
 * 更新履歴
 * 2022/7/31 Ver.1.0.4
 * 戦闘メンバーが５人以上の時にゲージがはみ出さないように修正。
 * 2022/2/27 Ver.1.0.3
 * 戦闘中に最大メンバーの増減をさせるとエラーがでる問題を修正。
 * 2022/2/11 Ver.1.0.2
 * 戦闘中に最大メンバー数を変更すると表示が乱れる問題を修正。
 * 2021/9/18 Ver.1.0.1
 * 戦闘開始時にエラーが出る問題を修正。
 * 2021/8/28 Ver.1.0.0
 * 初版
 * 
 * @command SetMaxBattleMember
 * @desc 最大戦闘人数を変更します。
 * @text 最大戦闘人数変更
 * 
 * @arg maxBattleMember
 * @text 最大戦闘メンバー数
 * @desc 最大戦闘メンバー数を設定します。設定できるメンバー数はプラグインパラメータの最大戦闘メンバー数以下となります。
 * @type number
 * @default 0
 * 
 * 
 * @param MaxBattleMemberNum
 * @text 最大戦闘メンバー数
 * @desc 最大戦闘メンバー数を設定します。
 * @type number
 * @default 4
 * @min 1
 * 
 * 
 */

var Imported = Imported || {};
Imported.NUUN_MaxBattleMembers = true;

(() => {
const parameters = PluginManager.parameters('NUUN_MaxBattleMembers');
const MaxBattleMemberNum = Number(parameters['MaxBattleMemberNum'] || 4);
let membersRefresh = false;

const pluginName = "NUUN_MaxBattleMembers";
PluginManager.registerCommand(pluginName, 'SetMaxBattleMember', args => {
  $gameParty.setMaxBattleMembers(Number(args.maxBattleMember));
});

const _Game_Party_initialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
  _Game_Party_initialize.call(this);
  this._maxBattleMembers = MaxBattleMemberNum;
};

Game_Party.prototype.maxBattleMembers = function() {//再定義
  if (this._maxBattleMembers === undefined) {
    this.setMaxBattleMembers(MaxBattleMemberNum);
  }
  return this._maxBattleMembers;
};

Game_Party.prototype.setMaxBattleMembers = function(num) {
  this._maxBattleMembers = num;
  if (this.inBattle()) {
    $gameTemp.requestBattleRefresh();
    membersRefresh = true;
  }
  $gamePlayer.refresh();
};


const _Window_BattleStatus_initialize = Window_BattleStatus.prototype.initialize;
Window_BattleStatus.prototype.initialize = function(rect) {
  _Window_BattleStatus_initialize.call(this, rect);
  BattleManager.rectMaxWidth = this.itemRectWithPadding(0).width;
};

Window_BattleStatus.prototype.maxCols = function() {//再定義
  return $gameParty._maxBattleMembers;
};

const _Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
  _Scene_Battle_update.call(this);
  if (BattleManager.isTpb() && membersRefresh && !$gameTemp.isBattleRefreshRequested() && this._actorCommandWindow.actor()) {
    membersRefresh = false;
    const index = $gameParty.battleMembers().indexOf(this._actorCommandWindow.actor());
    if (index >= 0) {
      this._statusWindow.select(index);
    } else {
      this.commandCancel();
    }
  }
};


Sprite.prototype.gaugeFixWidthClass = function() {
  switch (this.className) {
    case 'Window_BattleStatus':
    case 'Window_BattleActor':
      return true;
  }
  return false;
};


const _Sprite_Gauge_initMembers = Sprite_Gauge.prototype.initMembers;
Sprite_Gauge.prototype.initMembers = function() {
  _Sprite_Gauge_initMembers.call(this);
  this._gaugeWidth = null;
};

const _Sprite_Gauge_setup = Sprite_Gauge.prototype.setup;
Sprite_Gauge.prototype.setup = function(battler, statusType) {
  _Sprite_Gauge_setup.call(this, battler, statusType);
  if (this.gaugeFixWidthClass()) {
    const width = BattleManager.rectMaxWidth;
    if (this.bitmapWidth() !== width) {
      this._gaugeWidth = width;
      this.redraw();
    }
  }
};

const _Sprite_Gauge_bitmapWidth = Sprite_Gauge.prototype.bitmapWidth
Sprite_Gauge.prototype.bitmapWidth = function() {
  return this._gaugeWidth ? this._gaugeWidth : _Sprite_Gauge_bitmapWidth.call(this);
};


const _Sprite_Name_initMembers = Sprite_Name.prototype.initMembers;
Sprite_Name.prototype.initMembers = function() {
  _Sprite_Name_initMembers.call(this);
  this._nameWidth = null;
};

const _Sprite_Name_setup = Sprite_Name.prototype.setup;
Sprite_Name.prototype.setup = function(battler) {
  if (this.gaugeFixWidthClass()) {
    const width = BattleManager.rectMaxWidth;
    if (this.bitmapWidth() !== width) {
      this._nameWidth = width;
      this.redraw();
    }
  }
  _Sprite_Name_setup.call(this, battler);
};

const _Sprite_NamebitmapWidth = Sprite_Name.prototype.bitmapWidth;
Sprite_Name.prototype.bitmapWidth = function() {
  return this._nameWidth ? this._nameWidth : _Sprite_NamebitmapWidth.call(this);
};

})();