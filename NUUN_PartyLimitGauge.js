/*:-----------------------------------------------------------------------------------
 * NUUN_PartyLimitGauge.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc  パーティリミットゲージ
 * @author NUUN
 * @version 1.1.1
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_GaugeValueEX
 * 
 * @help
 * パーティメンバー、敵グループでそれぞれ共用するゲージを実装します。
 * ダメージを受けた時、撃破時、勝利時、敗北時、逃走時にリミットポイントがチャージします。
 * すべて評価式が使用可能です。
 * 
 * 色設定はテキストタブでカラーコードが入力できます。
 * 
 * 取得パラメータ
 * $gameParty._limitGauge　味方のリミットゲージ
 * $gameTroop._limitGauge　敵のリミットゲージ
 * 
 * スキルのメモ欄
 * <limitCost:10> スキルのコストとしてリミットゲージを１０を消費します。
 * 
 * ゲージ表示拡張プラグインと併用する場合
 * 以下のプラグインパラメータはゲージ表示拡張プラグインで設定してください。
 * ゲージの色1
 * ゲージの色2
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/6/11 Ver.1.1.1
 * パーティリミットが戦闘開始時にリセットされない問題を修正。
 * 2021/12/20 Ver.1.1.0
 * ゲージ画像化に対応。
 * 2021/12/19 Ver.1.0.4
 * ゲージ表示拡張併用時にエラーが出る問題を修正。
 * 2021/12/5 Ver.1.0.3
 * ゲージ表示拡張プラグインとの競合対策。
 * 2021/11/24 Ver.1.0.2
 * リミットポイントのコストと残りコストが同じ時にスキルが使えない問題を修正。
 * 2021/11/24 Ver.1.0.1
 * 戦闘勝利時、逃走時にエラーが出る問題を修正。
 * 2021/11/15 Ver.1.0.0
 * 初版
 * 
 * @param MaxLimitValue
 * @desc リミットゲージの最大値。
 * @text リミットゲージ最大値
 * @type number
 * @default 1000
 * 
 * @param BattleStartReset
 * @desc 戦闘開始時にパーティリミットゲージ値をリセットします。
 * @text 戦闘開始毎に初期化
 * @type boolean
 * @default false
 * 
 * @param GaugeSetting
 * @text ゲージ設定
 * @default ------------------------------
 * 
 * @param PartyGaugeVisible
 * @desc パーティリミットゲージを表示します。
 * @text ゲージ表示
 * @type boolean
 * @default true
 * @parent GaugeSetting
 * 
 * @param PartyGaugeShowSwitch
 * @desc パーティリミットゲージを表示するスイッチを指定します。非表示の時はゲージがたまりません。
 * @text 表示スイッチID
 * @type switch
 * @default 0
 * @parent GaugeSetting
 * 
 * @param PartyLimitValueVisible
 * @desc パーティリミットポイントを表示します。
 * @text リミットポイント表示
 * @type boolean
 * @default true
 * @parent GaugeSetting
 * 
 * @param PartyGaugeLabel
 * @desc パーティゲージのラベル。
 * @text パーティゲージラベル
 * @type string
 * @default 
 * @parent GaugeSetting
 * 
 * @param PartyGauge_LabelFontSize
 * @desc ラベルのフォントサイズ。（メインフォントからの差）
 * @text ラベルフォントサイズ
 * @type number
 * @default 0
 * @min -99
 * @parent GaugeSetting
 * 
 * @param PartyGauge_LabelColor
 * @desc ラベルの文字色。（テキストタブでカラーコードを記入できます）
 * @text ラベル文字色
 * @type number
 * @default 16
 * @min 0
 * @parent GaugeSetting
 * 
 * @param PartyGauge_X
 * @desc X座標を設定します。
 * @text X座標
 * @type number
 * @default 0
 * @min -9999
 * @parent GaugeSetting
 * 
 * @param PartyGauge_Y
 * @desc Y座標を設定します。
 * @text Y座標
 * @type number
 * @default 0
 * @min -9999
 * @parent GaugeSetting
 * 
 * @param PartyGauge_Width
 * @desc 横幅を設定します。
 * @text 横幅
 * @type number
 * @default 500
 * @min 0
 * @parent GaugeSetting
 * 
 * @param PartyGaugeColor1
 * @desc ゲージの色1を指定します。（テキストタブでカラーコードを記入できます）
 * @text ゲージの色1
 * @type number
 * @default 6
 * @parent GaugeSetting
 * 
 * @param PartyGaugeColor2
 * @desc ゲージの色2を指定します。（テキストタブでカラーコードを記入できます）
 * @text ゲージの色2
 * @type number
 * @default 14
 * @parent GaugeSetting
 * 
 * @param EnemyGaugeSetting
 * @text 敵のゲージ設定
 * @default ------------------------------
 * 
 * @param EnemyGaugeVisible
 * @desc 敵のパーティリミットゲージを表示します。
 * @text 敵ゲージ表示
 * @type boolean
 * @default true
 * @parent EnemyGaugeSetting
 * 
 * @param EnemyGaugeShowSwitch
 * @desc パーティリミットゲージを表示するスイッチを指定します。非表示の時はゲージがたまりません。
 * @text 表示スイッチID
 * @type switch
 * @default 0
 * @parent EnemyGaugeSetting
 * 
 * @param EnemyLimitValueVisible
 * @desc 敵のリミットポイントを表示します。
 * @text リミットポイント表示
 * @type boolean
 * @default false
 * @parent EnemyGaugeSetting
 * 
 * @param EnemyGaugeLabel
 * @desc 敵グループゲージのラベル。
 * @text 敵グループゲージラベル
 * @type string
 * @default 
 * @parent EnemyGaugeSetting
 * 
 * @param EnemyGauge_LabelFontSize
 * @desc ラベルのフォントサイズ。（メインフォントからの差）
 * @text ラベルフォントサイズ
 * @type number
 * @default 0
 * @min -99
 * @parent EnemyGaugeSetting
 * 
 * @param EnemyGauge_LabelColor
 * @desc ラベルの文字色。（テキストタブでカラーコードを記入できます）
 * @text ラベル文字色
 * @type number
 * @default 16
 * @min 0
 * @parent EnemyGaugeSetting
 * 
 * @param EnemyGauge_X
 * @desc X座標を設定します。
 * @text X座標
 * @type number
 * @default 0
 * @min -9999
 * @parent EnemyGaugeSetting
 * 
 * @param EnemyGauge_Y
 * @desc Y座標を設定します。
 * @text Y座標
 * @type number
 * @default 0
 * @min -9999
 * @parent EnemyGaugeSetting
 * 
 * @param EnemyGauge_Width
 * @desc 横幅を設定します。
 * @text 横幅
 * @type number
 * @default 500
 * @min 0
 * @parent EnemyGaugeSetting
 * 
 * @param EnemyGaugeColor1
 * @desc ゲージの色1を指定します。（テキストタブでカラーコードを記入できます）
 * @text ゲージの色1
 * @type number
 * @default 6
 * @parent EnemyGaugeSetting
 * 
 * @param EnemyGaugeColor2
 * @desc ゲージの色2を指定します。（テキストタブでカラーコードを記入できます）
 * @text ゲージの色2
 * @type number
 * @default 14
 * @parent EnemyGaugeSetting
 * 
 * @param ChargeSetting
 * @text チャージ設定
 * @default ------------------------------
 * 
 * @param DamageAmount
 * @desc 被ダメージ時の回復量。（評価式）a:被ダメージバトラーデータ　da：被ダメージバトラーデータベース　damage:ダメージ値
 * @text 被ダメージ時回復量
 * @type string
 * @default Math.floor(25 * damage / a.mhp)
 * @parent ChargeSetting
 * 
 * @param VictoryAmount
 * @desc 勝利時の回復量。
 * @text 勝利時回復量
 * @type string
 * @default 
 * @parent ChargeSetting
 * 
 * @param LoseAmount
 * @desc 敗北時の回復量。
 * @text 敗北時回復量
 * @type string
 * @default 
 * @parent ChargeSetting
 * 
 * @param EscapeAmount
 * @desc 逃走時の回復量。
 * @text 逃走時回復量
 * @type string
 * @default 
 * @parent ChargeSetting
 * 
 * @param DieAmount
 * @desc 撃破時の回復量。a:撃破されたバトラーデータ　da：撃破されたバトラーデータベース
 * @text 撃破時回復量
 * @type string
 * @default 
 * @parent ChargeSetting
 * 
 * @param CostSetting
 * @text コスト設定
 * @default ------------------------------
 * 
 * @param LimitCostColor
 * @desc 消費リミットゲージコストの色番号
 * @text 消費リミットゲージコスト色
 * @type number
 * @default 16
 * @parent CostSetting
 * 
 */
var Imported = Imported || {};
Imported.NUUN_PartyLimitGauge = true;

(() => {
const parameters = PluginManager.parameters('NUUN_PartyLimitGauge');
const MaxLimitValue = Number(parameters['MaxLimitValue'] || 1000);
const PartyGaugeVisible = eval(parameters['PartyGaugeVisible'] || 'true');//
const PartyGaugeShowSwitch = Number(parameters['PartyGaugeShowSwitch'] || 0);
const BattleStartReset = eval(parameters['BattleStartReset'] || "false");
const PartyLimitValueVisible = eval(parameters['PartyLimitValueVisible'] || "true");
const PartyGaugeIcon = Number(parameters['PartyGaugeIcon'] || 0);
const PartyGaugeLabel = String(parameters['PartyGaugeLabel'] || '');
const PartyGauge_LabelFontSize = Number(parameters['PartyGauge_LabelFontSize'] || 0);
const PartyGauge_X = Number(parameters['PartyGauge_X'] || 0);
const PartyGauge_Y = Number(parameters['PartyGauge_Y'] || 0);
const PartyGauge_Width = Number(parameters['PartyGauge_Width'] || 500);
const PartyGaugeColor1 = (DataManager.nuun_structureData(parameters['PartyGaugeColor1'])) || 6;
const PartyGaugeColor2 = (DataManager.nuun_structureData(parameters['PartyGaugeColor2'])) || 14;
const PartyGauge_LabelColor = (DataManager.nuun_structureData(parameters['PartyGauge_LabelColor'])) || 16;
const EnemyGaugeShowSwitch = Number(parameters['EnemyGaugeShowSwitch'] || 0);
const EnemyGaugeVisible = eval(parameters['EnemyGaugeVisible'] || 'true');
const EnemyLimitValueVisible = eval(parameters['EnemyLimitValueVisible'] || "false");
const EnemyGaugeIcon = Number(parameters['EnemyGaugeIcon'] || 0);
const EnemyGaugeLabel = String(parameters['EnemyGaugeLabel'] || '');
const EnemyGauge_LabelFontSize = Number(parameters['EnemyGauge_LabelFontSize'] || 0);
const EnemyGauge_X = Number(parameters['EnemyGauge_X'] || 0);
const EnemyGauge_Y = Number(parameters['EnemyGauge_Y'] || 0);
const EnemyGauge_Width = Number(parameters['EnemyGauge_Width'] || 500);
const EnemyGaugeColor1 = (DataManager.nuun_structureData(parameters['EnemyGaugeColor1'])) || 6;
const EnemyGaugeColor2 = (DataManager.nuun_structureData(parameters['EnemyGaugeColor2'])) || 14;
const EnemyGauge_LabelColor = (DataManager.nuun_structureData(parameters['EnemyGauge_LabelColor'])) || 16;
const DamageAmount = String(parameters['DamageAmount'] || 'Math.floor(25 * damage / a.mhp)');
const VictoryAmount = String(parameters['VictoryAmount'] || '');
const LoseAmount = String(parameters['LoseAmount'] || '');
const EscapeAmount = String(parameters['EscapeAmount'] || '');
const DieAmount = String(parameters['DieAmount'] || '');
const LimitCostColor = Number(parameters['LimitCostColor'] || 0);


const _BattleManager_setup = BattleManager.setup;
BattleManager.setup = function(troopId, canEscape, canLose) {
  _BattleManager_setup.call(this, troopId, canEscape, canLose);
  $gameParty.initPartyLimit();
  $gameTroop.initPartyLimit();
};

const _BattleManager_processDefeat = BattleManager.processDefeat;
BattleManager.processDefeat = function() {
  _BattleManager_processDefeat.call(this);
  setChargeLimit(LoseAmount);
};

const _BattleManager_gainRewards = BattleManager.gainRewards;
BattleManager.gainRewards = function() {
  _BattleManager_gainRewards.call(this);
  setChargeLimit(VictoryAmount);
};


const _BattleManager_onEscapeSuccess = BattleManager.onEscapeSuccess;
BattleManager.onEscapeSuccess = function() {
  setChargeLimit(EscapeAmount);
  _BattleManager_onEscapeSuccess.call(this);
};

Game_BattlerBase.prototype.skillLimitCost = function(skill) {
  if (skill.meta.limitCost) {
    return skill.meta.limitCost;
  }
  return null;
};

const _Game_BattleBase_canPaySkillCost = Game_BattlerBase.prototype.canPaySkillCost;
Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
  return this.canPaySkillLimitCost(skill) && _Game_BattleBase_canPaySkillCost.call(this, skill);
};

const _Game_BattlerBase_paySkillCost = Game_BattlerBase.prototype.paySkillCost;
Game_BattlerBase.prototype.paySkillCost = function(skill) {
  const cost = this.skillLimitCost(skill);
  if (cost > 0) {
    if (this.isActor()) {
      $gameParty._limitGauge -= cost;
    } else {
      $gameTroop._limitValue -= cost;
    }
  }
  _Game_BattlerBase_paySkillCost.call(this, skill);
};

const _Game_Battler_onDamage = Game_Battler.prototype.onDamage;
Game_Battler.prototype.onDamage = function(value) {
  _Game_Battler_onDamage.call(this, value);
  this.chargeLimitByDamage(DamageAmount, value);
};

Game_Battler.prototype.chargeLimitByDamage = function(evalStr, damage) {
  if (evalStr) {
    const a = this;
    const da = this.isActor() ? this.actor() : this.enemy();
    const val = Number(eval(evalStr));
    this.chargeLimit(val);
  }
};

Game_Actor.prototype.chargeLimit = function(value) {
  this.setLimitGauge($gameParty.isPartyLimitValue() + value);
};

Game_Enemy.prototype.chargeLimit = function(value) {
  this.setLimitGauge($gameTroop.isPartyLimitValue() + value);
};

Game_Actor.prototype.setLimitGauge = function(value) {
  $gameParty._limitGauge = Math.min(value, MaxLimitValue);
};

Game_Enemy.prototype.setLimitGauge = function(value) {
  $gameTroop._limitGauge = Math.min(value, MaxLimitValue);
};

Game_Actor.prototype.canPaySkillLimitCost = function(skill) {
  const cost = this.skillLimitCost(skill)
  if (cost !== null) {
    return $gameParty.isPartyLimitValue() >= cost;
  } else {
    return true;
  }
};

Game_Enemy.prototype.canPaySkillLimitCost = function(skill) {
  const cost = this.skillLimitCost(skill)
  if (cost !== null) {
    return $gameTroop.isPartyLimitValue() >= cost;
  } else {
    return true;
  }
};

const _Game_Enemy_die = Game_Enemy.prototype.die;
Game_Enemy.prototype.die = function() {
  _Game_Enemy_die.call(this);
  this.chargeLimitByDie(DieAmount);
};

const _Game_Actor_die = Game_Actor.prototype.die;
Game_Actor.prototype.die = function() {
  _Game_Actor_die.call(this);
  this.chargeLimitByDie(DieAmount);
};

Game_Enemy.prototype.chargeLimitByDie = function(evalStr) {
  if (evalStr) {
    const a = this;
    const da = this.enemy();
    const val = Number(eval(evalStr));
    $gameParty._limitGauge = Math.min($gameParty.isPartyLimitValue() + val, MaxLimitValue);
  }
};

Game_Actor.prototype.chargeLimitByDie = function(evalStr) {
  if (evalStr) {
    const a = this;
    const da = this.actor();
    const val = Number(eval(evalStr));
    $gameTroop._limitGauge = Math.min($gameTroop.isPartyLimitValue() + val, MaxLimitValue);
  }
};


const _Game_Unit_initialize = Game_Unit.prototype.initialize;
Game_Unit.prototype.initialize = function() {
  _Game_Unit_initialize.call(this);
  this._limitGauge = 0;
};

Game_Unit.prototype.isPartyLimitValue = function() {
  if (this._limitGauge === undefined) {
    this._limitGauge = 0;
  }
  return this._limitGauge;
};

Game_Party.prototype.initPartyLimit = function() {
  this._limitGauge = BattleStartReset ? 0 : this.isPartyLimitValue();
};

Game_Party.prototype.setPartyLimit = function(value) {
  if (onPartyChargeLimitGauge()) {
    this._limitGauge = value;
  }
};

Game_Troop.prototype.initPartyLimit = function() {
  this._limitGauge = 0;
};

Game_Troop.prototype.setPartyLimit = function(value) {
  if (onEnemyChargeLimitGauge()) {
    this._limitGauge = value;
  }
};


const _Scene_Battle_createSpriteset = Scene_Battle.prototype.createSpriteset;
Scene_Battle.prototype.createSpriteset = function() {
  _Scene_Battle_createSpriteset.call(this);
  if (PartyGaugeVisible) {
    this.createPartyGauge();
  }
  if (EnemyGaugeVisible) {
    this.createTroopGauge();
  }
};

Scene_Battle.prototype.createPartyGauge = function() {
  const x = PartyGauge_X;
  const y = PartyGauge_Y;
  if (Imported.NUUN_GaugeImage) {
    this.createSpriteGauge(this, 'limit', x, y);
  }
  const sprite = new Sprite_PartyGauge();
  this.addChild(sprite);
  sprite.setup('actor', 'limit');
  sprite.move(x, y);
  sprite.show();
  this._partyGauge = sprite;
};

Scene_Battle.prototype.createTroopGauge = function() {
  const x = EnemyGauge_X;
  const y = EnemyGauge_Y;
  if (Imported.NUUN_GaugeImage) {
    this.createSpriteGauge(this, 'limit', x, y);
  }
  const sprite = new Sprite_TroopGauge();
  this.addChild(sprite);
  sprite.setup('enemy', 'limit');
  sprite.move(x, y);
  sprite.show();
  this._troopGauge = sprite;
};


const _Window_SkillList_drawSkillCost = Window_SkillList.prototype.drawSkillCost;
Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
  const cost = this._actor.skillLimitCost(skill);
  if (cost !== null && cost > 0) {
    this.changeTextColor(getColorCode(LimitCostColor));
    this.drawText(cost, x, y, width, "right");
  }
  _Window_SkillList_drawSkillCost.call(this, skill, x, y, width);
};


function Sprite_PartyGauge() {
  this.initialize(...arguments);
}

Sprite_PartyGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_PartyGauge.prototype.constructor = Sprite_PartyGauge;

Sprite_PartyGauge.prototype.initialize = function() {
  Sprite_Gauge.prototype.initialize.call(this);
};

Sprite_PartyGauge.prototype.initMembers = function() {
  Sprite_Gauge.prototype.initMembers.call(this);
};

Sprite_PartyGauge.prototype.bitmapWidth = function() {
  return PartyGauge_Width;
};

Sprite_PartyGauge.prototype.setup = function(unit, statusType) {
  this._unit = unit;
  Sprite_Gauge.prototype.setup.call(this, actor, statusType);
};

const _Sprite_Gauge_gaugeX = Sprite_Gauge.prototype.gaugeX;
Sprite_Gauge.prototype.gaugeX = function() {
  if (this._statusType === "limit") {
      return 0;
  } else {
      return _Sprite_Gauge_gaugeX.call(this);
  }
};

const _Sprite_Gauge_currentValue = Sprite_Gauge.prototype.currentValue;
Sprite_Gauge.prototype.currentValue = function() {
  if (this._statusType === 'limit') {
    if (this._unit === 'actor') {
      return $gameParty.isPartyLimitValue();
    } else {
      return $gameTroop.isPartyLimitValue();
    }
  } else {
    return _Sprite_Gauge_currentValue.call(this);
  }
};

const _Sprite_Gauge_currentMaxValue = Sprite_Gauge.prototype.currentMaxValue;
Sprite_Gauge.prototype.currentMaxValue = function() {
  if (this._statusType === 'limit') {
    return MaxLimitValue;
  } else {
    return _Sprite_Gauge_currentMaxValue.call(this);
  }
};

const _Sprite_Gauge_drawValue =Sprite_Gauge.prototype.drawValue;
Sprite_Gauge.prototype.drawValue = function() {
  if (this._statusType === 'limit') {
    if ((this._unit === 'actor' && PartyLimitValueVisible) || (this._unit === 'enemy' && EnemyLimitValueVisible)) {
      _Sprite_Gauge_drawValue.call(this);
    }
  } else {
    _Sprite_Gauge_drawValue.call(this);
  }
};

Sprite_PartyGauge.prototype.label = function() {
  return PartyGaugeLabel;
};

Sprite_PartyGauge.prototype.labelFontSize = function() {
  return $gameSystem.mainFontSize() + PartyGauge_LabelFontSize;
};

Sprite_PartyGauge.prototype.gaugeColor1 = function() {
  return this._isGaugeData ? getColorCode(this.changeGaugeColor1()) : getColorCode(PartyGaugeColor1);
};

Sprite_PartyGauge.prototype.gaugeColor2 = function() {
  return this._isGaugeData ? getColorCode(this.changeGaugeColor2()) : getColorCode(PartyGaugeColor2);
};

Sprite_PartyGauge.prototype.labelColor = function() {
  return getColorCode(PartyGauge_LabelColor);
};

function Sprite_TroopGauge() {
  this.initialize(...arguments);
}

Sprite_TroopGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_TroopGauge.prototype.constructor = Sprite_TroopGauge;

Sprite_TroopGauge.prototype.initialize = function() {
  Sprite_Gauge.prototype.initialize.call(this);
};

Sprite_TroopGauge.prototype.initMembers = function() {
  Sprite_Gauge.prototype.initMembers.call(this);
};

Sprite_TroopGauge.prototype.bitmapWidth = function() {
  return EnemyGauge_Width;
};

Sprite_PartyGauge.prototype.setup = function(unit, statusType) {
  this._unit = unit;
  Sprite_Gauge.prototype.setup.call(this, unit, statusType);
};

Sprite_TroopGauge.prototype.label = function() {
  return EnemyGaugeLabel;
};

Sprite_TroopGauge.prototype.labelFontSize = function() {
  return $gameSystem.mainFontSize() + EnemyGauge_LabelFontSize;
};

Sprite_TroopGauge.prototype.gaugeColor1 = function() {
  return getColorCode(EnemyGaugeColor1);
};

Sprite_TroopGauge.prototype.gaugeColor2 = function() {
  return getColorCode(EnemyGaugeColor2);
};

Sprite_TroopGauge.prototype.labelColor = function() {
  return getColorCode(EnemyGauge_LabelColor);
};


function getColorCode(color) {
  if (typeof(color) === "string") {
    return color;
  }
  return ColorManager.textColor(color);
}

function setChargeLimit(evalStr) {
  if (evalStr) {
    const val = Number(eval(evalStr));
    $gameParty._limitGauge = Math.min($gameParty.isPartyLimitValue() + val, MaxLimitValue);
  }
}

function onPartyChargeLimitGauge() {
  return PartyGaugeShowSwitch === 0 || $gameSwitches.value(PartyGaugeShowSwitch);
}

function onEnemyChargeLimitGauge() {
  return EnemyGaugeShowSwitch === 0 || $gameSwitches.value(EnemyGaugeShowSwitch);
}

})();