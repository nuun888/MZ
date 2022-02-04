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
 * @version 1.5.3
 * @base NUUN_Base
 * 
 * @help
 * パッシブスキルを実装します。
 * スキルを習得していれば指定した武器のステータスが反映されます。
 * 発動条件は指定することで特定の条件でのみ発動するパッシブスキルを作ることが出来ます。条件はプラグインパラメータで
 * 設定し、そのリストIDを指定することで判定します。条件は複数指定可能です。
 * 発動条件はPassiveMatchタグがない場合は、すべての条件が一致したときにパッシブスキルが適用されます。
 * 
 * スキルのメモ欄
 * <PassiveSkill:[id]> [id]:適用する武器ID
 * <PassiveSkill:10> 武器ID10番の武器のステータスが反映されます。
 * <PassiveMatch:[mode]> 条件判定するモードを指定します。[mode] 0:一部一致　1:全て 無記入の場合は全て一致で判定します。
 * <PassiveMatch:1> いずれかの条件が一致したときに反映します。
 * <PassiveMatch:0> 全ての条件が一致したときに反映します。
 * <PassiveConditions:[id],[id],....> [id]:発動条件で設定したリスト番号
 * <PassiveConditions:1> 発動条件リストID1番の条件が一致したときに発動します。
 * <PassiveConditions:1,2,3> 発動条件リストID1,2,3番の条件が全て一致したときに発動します。
 * 
 * 以下は条件付きベースで条件を設定するときのタグです。条件付きベースVer.1.1.3以降
 * <PassiveConditions:[id],[id],[id]...> 指定したIDの条件を全て満たしたときに使用可能です。
 * <PartyPassiveConditions:[id],[id],[id]...> パーティメンバーの指定したIDの条件を全て満たしたときに使用可能です。
 * <TroopPassiveConditions:[id],[id],[id]...> 敵グループの指定したIDの条件を全て満たしたときに使用可能です。
 * <PassiveMatch:[mode]> 条件判定するモードを指定します。[mode] 0:一部一致　1:全て 無記入の場合は全て一致で判定します。
 * 
 * 敵グループ指定の場合戦闘中のみ条件判定します。
 * 
 * [id]:条件付きベースの適用条件のリストID
 * <PassiveMatch:[mode]> 条件のモードを設定します。
 * <PassiveMatch:1> いずれかの条件が一致したときに反映します。
 * <PassiveMatch:0> 全ての条件が一致したときに反映します。
 * 未記入の場合は全ての条件を満たしたときになります。
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
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/2/4 Ver.1.1.2
 * 処理の修正。
 * 2022/1/3 Ver.1.5.2
 * Ver.1.5.0以降でこのプラグインで設定した条件武器、防具タイプ、乗り物を条件指定するとエラーが出る問題を修正。
 * 2021/12/31 Ver.1.5.1
 * 特徴で習得しているスキルからでも適用できるように修正。
 * 2021/12/31 Ver.1.5.0
 * 条件付きベースに対応。
 * 2021/12/31 Ver.1.4.1
 * 条件タグを指定してないときに、パッシブスキルが適用されていなかった問題を修正。
 * 2021/8/13 Ver.1.4.0
 * 条件に乗り物を追加。
 * 2021/8/6 Ver.1.3.0
 * 条件にバフ、デバフを追加。
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
 * @param CondBasePassive
 * @text 条件付きベース条件適用
 * @desc 条件付きベースで設定した条件を適用します。このプラグインで設定した条件は適用されません。
 * @type boolean
 * @default false
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
 * @param NameStr
 * @text 識別名
 * @desc 識別名
 * @type string
 * @default
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
 * @option バフ適用
 * @value 'Buff'
 * @option バフ除外
 * @value 'BuffR'
 * @option デバフ適用
 * @value 'Debuff'
 * @option デバフ除外
 * @value 'DebuffR'
 * @option 装備タイプ
 * @value 'Equip'
 * @option 乗り物
 * @value 'Vehicle'
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
 * @param BuffType
 * @text バフ
 * @desc バフを指定します。
 * @type select
 * @option HP上昇
 * @value 0
 * @option MP上昇
 * @value 1
 * @option 攻撃力上昇
 * @value 2
 * @option 防御力上昇
 * @value 3
 * @option 魔法力上昇
 * @value 4
 * @option 魔法防御上昇
 * @value 5
 * @option 敏捷性上昇
 * @value 6
 * @option 運上昇
 * @value 7
 * @default 0
 * 
 * @param DebuffType
 * @text デバフ
 * @desc デバフを指定します。
 * @type select
 * @option HP低下
 * @value 0
 * @option MP低下
 * @value 1
 * @option 攻撃力低下
 * @value 2
 * @option 防御力低下
 * @value 3
 * @option 魔法力低下
 * @value 4
 * @option 魔法防御低下
 * @value 5
 * @option 敏捷性低下
 * @value 6
 * @option 運低下
 * @value 7
 * @default 0
 * 
 * @param Vehicle
 * @text 乗り物
 * @desc デバフを指定します。(リスト１番目のみ反映)
 * @type combo[]
 * @option 'vehicle'
 * @option 'boat'
 * @option 'ship'
 * @option 'airship'
 * @default 'vehicle'
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
  const CondBasePassive = eval(parameters['CondBasePassive'] || "false");

  const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
  Game_Actor.prototype.initMembers = function() {
    _Game_Actor_initMembers.call(this);
    this._passiveSkillList = [];
  };

  Game_Actor.prototype.isPassiveSkill = function(item) {
    return !!item.meta.PassiveSkill;
  };

  Game_Actor.prototype.getPassiveSkillId = function(item) {
    return item.meta.PassiveSkill ? Number(item.meta.PassiveSkill) : 0;
  };

  Game_Actor.prototype.getPassiveConditions = function(item) {
    return item.meta.PassiveConditions ? item.meta.PassiveConditions.split(',').map(Number) : [];
  };

  Game_Actor.prototype.getPassiveMode = function(item) {
    return item.meta.PassiveMatch ? Number(item.meta.PassiveMatch) : 1;
  };

  const _Game_Actor_paramPlus = Game_Actor.prototype.paramPlus;
  Game_Actor.prototype.paramPlus = function(paramId) {
    let value = _Game_Actor_paramPlus.call(this, paramId);
    value += this.passiveParam(paramId);
    return value;
  };

  const _Game_Actor_traitObjects = Game_Actor.prototype.traitObjects;
  Game_Actor.prototype.traitObjects = function() {
    let objects = _Game_Actor_traitObjects.call(this);
    //パッシブスキルのオブジェクトを取得
    Array.prototype.push.apply(objects, this.passiveObject());
    //objects = objects.concat(this.passiveObject());
    return objects;
  };

  Game_Actor.prototype.passiveParam = function(paramId) {
    return this.getPassiveSkill(paramId);
  };

  Game_Actor.prototype.passiveObject = function() {
    return this.getPassiveObject(); 
  };

  Game_Actor.prototype.getPassiveSkill = function(paramId) {
    let value = 0;
    if (!this._passiveCalc) {
      this._passiveCalc = true;
      this.skills().forEach(skill => {
        if (this.isPassiveSkill(skill) && this.condPassiveSkill(skill)) {
          const weapon = this.getPassiveSkillWeapon(skill);
          if (weapon > 0) {
            value += $dataWeapons[weapon].params[paramId];
          }
        }
      });
      this._passiveCalc = false;
    }
    return value;
  };

  Game_Actor.prototype.getPassiveObject = function() {
    const passiveSkills = [];
    if (!this._passiveCalc) {
      this._passiveCalc = true;
      this.skills().forEach(skill => {
        if (this.isPassiveSkill(skill) && this.condPassiveSkill(skill)) {
          const weapon = this.getPassiveSkillWeapon(skill);
          if (weapon > 0) {
            Array.prototype.push.apply(passiveSkills, [$dataWeapons[weapon]]);
            //passiveSkills.push($dataWeapons[weapon]);
          }
        }
      });
      this._passiveCalc = false;
    }
    return passiveSkills;
  };

  Game_Actor.prototype.condPassiveSkill = function(skill) {
    if (Imported.NUUN_ConditionsBase && CondBasePassive) {
      return this.getCondition(skill);
    }
    let result = true;
    const conditions = this.getPassiveConditions(skill);
    if (conditions.length > 0) {
      const list = PassiveSkillConditions;
      if (this.getPassiveMode(skill) === 0) {
        result = conditions.some(id => this.skillConditions(list[id - 1]));
      } else {
        result = conditions.every(id => this.skillConditions(list[id - 1]));
      }
    }
    return result;
  };

  Game_Actor.prototype.getCondition = function(skill) {
    const condTag = "PassiveConditions";
    const action = $gameTemp.getActionData();
    return this.getTriggerConditions(skill, this, condTag , null, 'Party'+ condTag, 'Troop'+ condTag, action.action, action.damage, this.getPassiveMode(skill));
  };

  Game_Actor.prototype.getPassiveSkillWeapon = function(skill) {
    return this.getPassiveSkillId(skill);
  };
  
  const _Game_Actor_addedSkillTypes = Game_Actor.prototype.addedSkillTypes;
  Game_Actor.prototype.addedSkillTypes = function() {
    const traits = _Game_Actor_addedSkillTypes.call(this);
    if ($gameParty.inBattle()) {
      return traits.filter(id => id !== PassiveSkillType);
    }
    return traits;
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
      case 'Buff':
        return this._buffs[list.BuffType] > 0;
      case 'BuffR':
        return this._buffs[list.BuffType] === 0;
      case 'Debuff':
        return this._buffs[list.DebuffType] < 0;
      case 'DebuffR':
        return this._buffs[list.DebuffType] === 0;
      case 'Vehicle':
        return this.isVehicle(list.Vehicle[0]);
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

  Game_Actor.prototype.isVehicle = function(type) {
    if (type === 'boat') {
      return $gamePlayer.isInBoat();
    } else if (type === 'ship') {
      return $gamePlayer.isInShip();
    } else if (type === 'airship') {
      return $gamePlayer.isInAirship();
    } else {
      return $gamePlayer.isInVehicle();
    }
  };

  Game_Actor.prototype.isEquippedWeaponType = function(type) {
    return this.equips().some(equip => equip && equip.wtypeId === type);
  };

  Game_Actor.prototype.isEquippedArmorType = function(type) {
    return this.equips().some(equip => equip && equip.atypeId === type);
  };

})();