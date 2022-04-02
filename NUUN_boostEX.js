/*:-----------------------------------------------------------------------------------
 * NUUN_boostEX.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc 行動時ブースト特徴
 * @author NUUN
 * @version 1.2.0
 * 
 * @help
 * 攻撃時に特定の行動によってダメージを補正する効果を得ることができます。
 * 
 * 特徴を有するメモ欄
 * <BoostEX:EL, [Id], [rate]>
 * 攻撃時の属性が[Id]の時にダメージを増幅させます。
 * <BoostEX:WT, [Id], [rate]>
 * 装備している武器のタイプが[Id]の時にダメージを増減させます。
 * <BoostEX:AT, [Id], [rate]>
 * 装備している防具のタイプが[Id]の時にダメージを増減させます。
 * <BoostEX:ITI, [Id], [rate]>
 * アイテム[Id]番のアイテム使用時にダメージを増幅させます。
 * <BoostEX:SKI, [Id], [rate]>
 * スキル[Id]番のスキル使用時にダメージを増幅させます。
 * <BoostEX:PH, [rate]>
 * 命中タイプが物理の時にダメージを増幅させます。
 * <BoostEX:MG, [rate]>
 * 命中タイプが魔法の時にダメージを増幅させます。
 * <BoostEX:CH, [rate]>
 * 命中タイプが必中の時にダメージを増幅させます。
 * <BoostEX:CR, [rate]>
 * クリティカル発生時にダメージを増幅させます。
 * <BoostEX:HE, [rate]>
 * ダメージタイプがHP回復、MP回復の時ににダメージを増幅させます。
 * <BoostEX:IT, [rate]>
 * アイテムを仕様時ににダメージを増幅させます。
 * <BoostEX:CNT, [rate]>
 * 反撃時にダメージを増幅させます。
 * <BoostEX:MRF, [rate]>
 * 魔法反射時にダメージを増幅させます。
 * <BoostEX:SMeta, [tag], [rate]>
 * 使用者のメモ欄に以下のタグがある場合にダメージを増幅させます。
 * <BoostEX:TMeta, [tag], [rate]>
 * 対象のメモ欄に以下のタグがある場合にダメージを増幅させます。
 * 
 * 以下は条件付きベースが必要です。
 * <BoostCond:[rate],[condMode]>
 * 条件付きベースの条件が一致した時にダメージを増幅させます。
 * 下記のタグがひとつもない場合はtrueを返します。
 *  <CondBoost:[id],[id]....> 
 *  <TargetCondBoost:[id],[id]....> 
 *  <PartyCondBoost:[id],[id]....> 
 *  <TroopCondBoost:[id],[id]....> 
 * 
 * [rate]:増幅率±(整数)
 * [condMode]：条件モード（省略可）0:一部一致 1:全て一致
 * 
 * ２つ以上該当する場合は加算した合計で算出されます。
 * 魔法属性+20%と炎属性+30の場合は50%ダメージが増幅されます。
 * 数値、文字列は[]は括らずに記入してください。　例:<BoostEX:CNT, [rate]> → <BoostEX:CNT, 50>
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/4/2 Ver.1.2.0
 * 条件にメモ欄に特定のタグが記入してあれば増幅する機能を追加。
 * 2021/11/13 Ver.1.1.2
 * 条件付きベースの条件が正常に取得できていなかった問題を修正。
 * 条件付きベースの定義変更による条件タグの設定方法を変更。
 * 2021/10/30 Ver.1.1.1
 * 属性ブーストの特徴を持つバトラーがスキル攻撃したときにエラーが出る問題を修正。
 * 2021/9/13 Ver.1.1.0
 * 条件付きベースに対応。
 * 2021/8/20 Ver.1.0.0
 * 初版
 * 
 */

var Imported = Imported || {};
Imported.NUUN_boostEX = true;

(() => {
const parameters = PluginManager.parameters('NUUN_boostEX');

const _Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;
Game_Action.prototype.makeDamageValue = function(target, critical) {
  const value = _Game_Action_makeDamageValue.call(this, target, critical);
  return Math.round(value * Math.max((this.boostConditions(target, critical, value) + 100) / 100), 0.0);
};

Game_Action.prototype.boostConditions = function(target, critical, damage) {
  const item = this.item();
  const boostList = this.subject().boostAllTraits();
  return boostList.reduce((r, data) => r + this.isBoostConditions(data, item, target, critical, damage) , 0) + this.boostConditionsEX(target, damage);
};

Game_Action.prototype.boostConditionsEX = function(target, damage) {
  if (!Imported.NUUN_ConditionsBase) {
    return 0;
  }
  return this.subject().traitObjects().reduce((r, trait) => {
    if (trait.meta.BoostCond) {
      const cond = trait.meta.BoostCond.split(',').map(Number);
      const mode = cond[1] || 0;
      if (this.triggerConditions(trait, target, 'CondBoost', 'TargetCondBoost', 'PartyCondBoost', 'TroopCondBoost', damage, mode)) {
        return r + cond[0];
      }
    }
    return r;
  }, 0);
};

Game_Action.prototype.isBoostConditions = function(data, item, target, critical, damage) {
  if (data[0] === 'EL' && this.isBoostElement(Number(data[1]))) {
    return Number(data[2]);
  } else if (data[0] === 'PH' && this.isPhysical()) {
    return Number(data[1]);
  } else if (data[0] === 'MG' && this.isMagical()) {
    return Number(data[1]);
  } else if (data[0] === 'CH' && this.isCertainHit()) {
    return Number(data[1]);
  } else if (data[0] === 'CR' && critical) {
    return Number(data[1]);
  } else if (data[0] === 'HE' && this.isRecover()) {
    return Number(data[1]);
  } else if (data[0] === 'IT' && this.isItem()) {
    return Number(data[1]);
  } else if (data[0] === 'ITI' && this.isItem() && item.id === Number(data[1])) {
    return Number(data[2]);
  } else if (data[0] === 'SKI' && this.isSkill() && item.id === Number(data[1])) {
    return Number(data[2]);
  } else if (data[0] === 'WT' && this.isBoostWeaponType(Number(data[1]))) {
    return Number(data[2]);
  } else if (data[0] === 'AT' && this.isBoostArmorType(Number(data[1]))) {
    return Number(data[2]);
  } else if (data[0] === 'CNT' && this.isBoostCnt()) {
    return Number(data[1]);
  } else if (data[0] === 'MRF' && this.isBoostMrf()) {
    return Number(data[1]);
  } else if (data[0] === 'SMeta' && this.isBoostMeta(this._suject(), String(data[1]))) {
    return Number(data[2]);
  } else if (data[0] === 'TMeta' && this.isBoostMeta(target, String(data[1]))) {
    return Number(data[2]);
  } else {
    return 0;
  }
};

Game_Action.prototype.isBoostElement = function(id) {
  let elementsList = [];
  if (this.item().damage.elementId < 0) {
    if (Imported.NUUN_MultiElement) {
      elementsList = this.getAttackElements();
    } else {
      elementsList = this.subject().attackElements();
    }
  } else{
    if (Imported.NUUN_MultiElement) {
      elementsList = this.getItemElements();
    } else {
      elementsList = [this.item().damage.elementId];
    }
  } 
  return elementsList.some(elementId => elementId === id);
};

Game_Action.prototype.isBoostWeaponType = function(id) {
  return this.subject().isActor() ? this.subject().isWtypeEquipped(id) : false;
};

Game_Action.prototype.isBoostArmorType = function(id) {
  return this.subject().isActor() ? this.subject().armors().some(armor => armor.atypeId === id) : false;
};

Game_Action.prototype.isBoostCnt = function() {
  return BattleManager.boostCnt;
};

Game_Action.prototype.isBoostMrf = function() {
  return BattleManager.boostMrf;
};

Game_Action.prototype.isBoostMeta = function(target, tag) {
  return target.traitObjects().some(trait => {
    return trait.meta[tag.trim()]
  });
};

Game_Battler.prototype.boostAllTraits = function() {
  return this.traitObjects().reduce((r, trait) => {
    r.push(...this.boostNoteData(trait));
    return r;
  }, []);
};

Game_Battler.prototype.boostNoteData = function(traits) {
  const re = /<(?:BoostEX):\s*(.*)>/g;
  const data = [];
  while(true)  {
    let match = re.exec(traits.note);
    if (match) {
      data.push(match[1].split(','));
    } else {
      break;
    }
  }
  return data;
};

const _BattleManager_invokeAction = BattleManager.invokeAction;
BattleManager.invokeAction = function(subject, target) {
  this.boostCnt = false;
  this.boostMrf = false;
  _BattleManager_invokeAction.call(this, subject, target);
};

const _BattleManager_invokeCounterAttack = BattleManager.invokeCounterAttack;
BattleManager.invokeCounterAttack = function(subject, target) {
  this.boostCnt = true;
  _BattleManager_invokeCounterAttack.call(this, subject, target);
};

const _BattleManager_invokeMagicReflection = BattleManager.invokeMagicReflection;
BattleManager.invokeMagicReflection = function(subject, target) {
  this.boostMrf = true;
  _BattleManager_invokeMagicReflection.call(this, subject, target);
};

})();
