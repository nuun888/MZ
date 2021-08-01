/*:-----------------------------------------------------------------------------------
 * NUUN_PassiveSkill.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc パッシブスキル
 * @author NUUN
 * @version 1.2.1
 * @base NUUN_Base
 * 
 * @help
 * パッシブスキルを実装します。
 * スキルを習得していれば指定した武器のステータスが反映されます。
 * 発動条件は指定することで特定の条件でのみ発動するパッシブスキルを作ることが出来ます。条件はプラグインパラメータで
 * 設定し、そのリストIDを指定することで判定します。条件は複数指定可能です。
 * 
 * スキルのメモ欄
 * <PassiveSkill:[id]> [id]:適用する武器ID
 * <PassiveSkill:10> 武器ID10番の武器のステータスが反映されます。
 * <PassiveMatch:[mode]> 条件判定するモードを指定します。[mode] all:全て　partial:一部一致　無記入の場合は全て一致で判定します。
 * <PassiveMatch:partial> いずれかの条件が一致したときに反映します。
 * <PassiveMatch:all> 全ての条件が一致したときに反映します。
 * 
 * <PassiveConditions:[id],[id],....> [id]:発動条件で設定したリスト番号
 * <PassiveConditions:1> 発動条件リストID1番の条件が一致したときに発動します。
 * <PassiveConditions:1,2,3> 発動条件リストID1,2,3番の条件が全て一致したときに発動します。
 * 
 * 発動条件
 * 上限値　指定した数値以下の値なら反映されます。
 * 下限値　指定した数値以上の値なら反映されます。
 * 例
 * 対象:HP 上限値:30　下限値:0 ＨＰが３０％以下の時に反映します。
 * 対象:HP 上限値:80　下限値:30 ＨＰが３０％～８０％の時に反映します。
 * 対象:MP 上限値:0　下限値:80 ＭＰが８０％以上の時に反映します。
 * 対象:TP 上限値:0　下限値:100 ＴＰが１００％の時に反映します。
 * 対象:State ステートID:6 ステート６番のステートに掛かっている時に反映します。
 * 対象:StateR ステートID:5 ステート５番のステートに掛かっていない時に反映します。
 * 対象:Turn 上限値:0　下限値:10 １０ターン目以降に反映します。
 * 対象:Turn 上限値:3　下限値:0 ３ターン目まで反映します。
 * 対象:GVal ゲーム変数:5 上限値:30　下限値:10 ゲーム変数５番が１０以上３０以下の時に反映します。
 * 対象:GSwc ゲーム変数スイッチ:5 ゲームスイッチがtrueの時に反映します。
 * 対象:Equip 武器タイプ:10 武器タイプ10番の武器を装備しているに反映します。武器タイプを設定している場合は防具タイプの設定は無視されます。
 * 対象:Equip 防具タイプ:8 防具タイプ8番の武器を装備しているに反映します。
 * 
 * このプラグインはNUUN_Baseが必要です。
 * 
 * 仕様
 * 条件でHP、MPを判定する場合、最大HP,最大MPは「HP,MPで判定を行うパッシブスキル」以外から算出した数値となります。
 * HP、MP条件でHP、MPを増減させるパッシブスキルを覚えさせる場合はご注意ください。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/8/1 Ver.1.2.1
 * パッシブスキルの適用条件の仕様を変更。
 * 2021/7/31 Ver.1.2.0
 * 条件一致の判定方法を指定できる機能を追加。
 * 条件でHP、MPを判定するスキルを習得した場合、戦闘時に処理が重くなる問題を修正。
 * 2021/7/29 Ver.1.1.1
 * 処理の修正。
 * 2021/7/28 Ver.1.1.0
 * ステートに掛かっていない時に反映させる機能を追加。
 * 特定の武器、防具タイプを装備している時のみ反映させる機能を追加。
 * 特定の状況でステータスの表示がされていなかった問題を修正。
 * 2021/7/27 Ver.1.0.0
 * 初版
 * 
 * @param PassiveSkillConditions
 * @text 発動条件
 * @desc パッシブスキルを発動する条件を設定します。
 * @type struct<Conditions>[]
 * 
 * @param PassiveSkillType
 * @text パッシブスキルタイプID
 * @desc パッシブスキルのスキルタイプID。戦闘中のアクターコマンドに表示されなくします。
 * @type number
 * @default 0
 * 
 * 
 */
/*~struct~Conditions:
 * 
 * @param ParamConditions
 * @text 対象
 * @desc パラメータの対象を指定します。[上限値][下限値]　下限値0で[上限値]以上
 * @type select
 * @option HP
 * @value 'HP'
 * @option MP
 * @value 'MP'
 * @option TP
 * @value 'TP'
 * @option ステート適用
 * @value 'State'
 * @option ステート除外
 * @value 'StateR'
 * @option 装備タイプ
 * @value 'Equip'
 * @option ターン
 * @value 'Turn'
 * @option ゲーム変数
 * @value 'GVal'
 * @option スイッチ
 * @value 'GSwc'
 * @default 'HP'
 * 
 * @param UpLimit
 * @text 上限値
 * @desc 上限値
 * @type number
 * @default 100
 * 
 * @param DwLimit
 * @text 下限値
 * @desc 下限値
 * @type number
 * @default 0
 * 
 * @param EquipWeapon
 * @text 武器タイプ
 * @desc 武器タイプを指定します。指定した武器タイプを装備している時に反映します。(武器)
 * @type number
 * @default 0
 * 
 * @param EquipArmor
 * @text 防具タイプ
 * @desc 防具タイプを指定します。指定した防具タイプを装備している時に反映します。(武器)
 * @type number
 * @default 0
 * 
 * @param StateId
 * @text ステートID
 * @desc ステートIDを指定します。指定した状態に掛かっている時に反映します。
 * @type state
 * @default 0
 * 
 * @param VariableId
 * @text ゲーム変数
 * @desc ゲーム変数を指定します。[上限値][下限値]　下限値0で[上限値]以上（ゲーム変数）
 * @type variable
 * @default 0
 * 
 * @param SwitchId
 * @text ゲームスイッチ
 * @desc ゲームスイッチを指定します。trueの時に反映します。（スイッチ）
 * @type switch
 * @default 0
 * 
 */
var Imported = Imported || {};
Imported.NUUN_PassiveSkill = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_PassiveSkill');
  const PassiveSkillConditions = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['PassiveSkillConditions'])) : null) || [];
  const PassiveSkillType = Number(parameters['PassiveSkillType'] || 0);

  Game_Actor.prototype.getPassiveSkill = function(item) {
    return item.meta.PassiveSkill ? Number(item.meta.PassiveSkill) : 0;
  };

  Game_Actor.prototype.getPassiveConditions = function(item) {
    return item.meta.PassiveConditions ? item.meta.PassiveConditions.split(',') : [];
  };

  Game_Actor.prototype.getPassiveMode = function(item) {
    return item.meta.PassiveMatch ? item.meta.PassiveMatch : 'all';
  };

  Game_Actor.prototype.isParamConditions = function(data) {
    return data.ParamConditions === 'HP' || data.ParamConditions === 'MP';
  };

  Game_Actor.prototype.isPassiveSkill = function(item, mode) {
    const passive = this.getPassiveSkill(item);
    let result;
    if (passive > 0) {
      const conditions = this.getPassiveConditions(item);
      if (conditions.length > 0) {
        const list = PassiveSkillConditions;
        result = conditions.some(id => this.isParamConditions(list[Number(id.trim()) - 1]));
        if (mode === 0) {
          if (result) {
            return 0;
          }
        } else if (mode === 1) {
          if (!result) {
            return 0;
          }
        }
        result = null;
        if (this.getPassiveMode(item).trim() === 'all') {
          result = conditions.every(id => this.skillConditions(list[Number(id.trim()) - 1]));
        } else {
          result = conditions.some(id => this.skillConditions(list[Number(id.trim()) - 1]));
        }
        if (result) {
          return passive;
        }
      }
      return 0;
    }
    return passive;
  };

  Game_Actor.prototype.skillConditions = function(list) {
    if (!list) {
      return true;
    }
    switch (list.ParamConditions) {
      case 'HP':
        return this.hp >= this.mhp * list.DwLimit / 100 && (list.UpLimit > 0 ? (this.hp <= this.mhp * list.UpLimit / 100) : true);
      case 'MP':
        return this.mp >= this.mmp * list.DwLimit / 100 && (list.UpLimit > 0 ? (this.mp <= this.mmp * list.UpLimit / 100) : true);
      case 'TP':
        return this.tp >= this.maxTp() * list.DwLimit / 100 && (list.UpLimit > 0 ? this.tp <= this.maxTp() * list.UpLimit / 100 : true);
      case 'State':
        return this._states.find(id => id === list.StateId);
      case 'StateR':
        return !(this._states.some(id => id === list.StateId));
      case 'Equip':
        return list.EquipWeapon > 0 ? this.isEquippedWeaponType(list.EquipWeapon) : this.isEquippedArmorType(list.EquipWeapon);
      case 'Turn':
        return this.turnCount() >= list.DwLimit && (list.UpLimit > 0 ? this.turnCount() <= list.UpLimit : true);
      case 'GVal':
        return $gameVariables.value(list.VariableId) >= list.DwLimit &&
         (list.UpLimit > 0 ? $gameVariables.value(list.VariableId) <= list.UpLimit : true);
      case 'GSwc':
        return $gameSwitches.value(list.SwitchId);
    }
    return false;
  };

  Game_Actor.prototype.isEquippedWeaponType = function(type) {
    return this.equips().some(equip => equip && equip.wtypeId === type);
  };

  Game_Actor.prototype.isEquippedArmorType = function(type) {
    return this.equips().some(equip => equip && equip.atypeId === type);
  };

  Game_Actor.prototype.setPassiveSkill = function(mode) {
    const passiveSkills = [];
    const passiveSkillList = this._skills.filter(item => this.getPassiveSkill($dataSkills[item]));
    passiveSkillList.forEach(itemId => {
      const item = $dataSkills[itemId];
      const weapon = this.isPassiveSkill(item, mode);
      if (weapon > 0) {
        passiveSkills.push($dataWeapons[weapon]);
      }
    });
    return passiveSkills;
  };

  Game_Actor.prototype.paramPassive = function(paramId, mode) {
    let value = 0;
    for (const item of this.setPassiveSkill(mode)) {
      if (item) {
        value += item.params[paramId];
      }
    }
    return value;
  };

  const _Game_Actor_paramPlus = Game_Actor.prototype.paramPlus;
  Game_Actor.prototype.paramPlusDirect = function(paramId) {
    return _Game_Actor_paramPlus.call(this, paramId);
  };

  Game_Actor.prototype.paramPlus = function(paramId) {
    let value = this.paramPlusDirect(paramId);
    value += this.passiveNormal(paramId);
    value += this.passivePlus(paramId);
    return value;
  };

  const _Game_Actor_traitObjects = Game_Actor.prototype.traitObjects;
  Game_Actor.prototype.traitObjects = function() {
    let objects = _Game_Actor_traitObjects.call(this);
    objects = objects.concat(this.passiveTraitsNormal());
    objects = objects.concat(this.passiveTraitsPlus());
    return objects;
  };

  const _Game_Actor_addedSkillTypes = Game_Actor.prototype.addedSkillTypes;
  Game_Actor.prototype.addedSkillTypes = function() {
    const traits = _Game_Actor_addedSkillTypes.call(this);
    if ($gameParty.inBattle()) {
      return traits.filter(id => id !== PassiveSkillType);
    }
    return traits;
  };

  Game_Actor.prototype.passiveNormal = function(paramId) {
    if (this._passiveNormalCalc) {
      return 0;
    }
    this._passiveNormalCalc = true;
    const value = this.paramPassive(paramId, 0);
    this._passiveNormalCalc = false;
    return value;
  };

  Game_Actor.prototype.passivePlus = function(paramId) {
    if (this._passiveCalc) {
      return 0;
    }
    this._passiveCalc = true;
    const value = this.paramPassive(paramId, 1);
    this._passiveCalc = false;
    return value;
  };

  Game_Actor.prototype.passiveTraitsNormal = function() {
    if (this._passiveNormalCalc) {
      return [];
    }
    this._passiveNormalCalc = true;
    const object = this.setPassiveSkill(0);
    this._passiveNormalCalc = false;
    return object;
  };

  Game_Actor.prototype.passiveTraitsPlus = function() {
    if (this._passiveCalc) {
      return [];
    }
    this._passiveCalc = true;
    const object = this.setPassiveSkill(1);
    this._passiveCalc = false;
    return object;
  };

})();