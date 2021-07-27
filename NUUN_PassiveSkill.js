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
 * @version 1.0.0
 * @base NUUN_Base
 * 
 * @help
 * パッシブスキルを実装します。
 * スキルを習得していれば指定した武器のステータスが反映されます。
 * 発動条件は指定することで特定の条件でのみ発動するパッシブスキルを作ることが出来ます。条件はプラグインパラメータで
 * 設定し、そのリストIDを指定することで判定します。条件は複数指定可能です。すべての条件が一致した時にパッシブスキルが反映されます。
 * 
 * スキルのメモ欄
 * <PassiveSkill:[id]> [id]:適用する武器ID
 * <PassiveSkill:10> 武器ID10番の武器のステータスが反映されます。
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
 * 対象:Turn 上限値:0　下限値:10 １０ターン目以降に反映します。
 * 対象:Turn 上限値:3　下限値:0 ３ターン目まで反映します。
 * 対象:GVal ゲーム変数:5 上限値:30　下限値:10 ゲーム変数５番が１０以上３０以下の時に反映します。
 * 対象:GSwc ゲーム変数スイッチ:5 ゲームスイッチがtrueの時に反映します。
 * 
 * 武器のメモ欄に記入するタイプのプラグインであればそのプラグインの効果によるパッシブスキルも製作できます。
 * 
 * このプラグインはNUUN_Baseが必要です。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
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
 * @desc パッシブスキルのスキルタイプID。
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
 * @option ステート
 * @value 'State'
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
 * @param StateImgId
 * @text ステートID
 * @desc ステートIDを指定します。指定した状態に掛かっている時に反映します。
 * @type state
 * @default 0
 * 
 * @param VariableId
 * @text ゲーム変数
 * @desc ゲーム変数を指定します。[上限値][下限値]　下限値0で[上限値]以上
 * @type variable
 * @default 0
 * 
 * @param SwitchId
 * @text ゲームスイッチ
 * @desc ゲームスイッチを指定します。trueの時に反映します。
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

  const _Game_Actor_refresh = Game_Actor.prototype.refresh;
  Game_Actor.prototype.refresh = function() {
    _Game_Actor_refresh.call(this);
    this.passiveRefresh();
  };

  const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
  Game_Actor.prototype.initMembers = function() {
    _Game_Actor_initMembers.call(this);
    this._passiveWeapon = [];
  };

  Game_Actor.prototype.passiveRefresh = function() {
    this._passiveWeapon = this.setPassiveSkill();
  };

  Game_Actor.prototype.getPassiveWeapon = function() {
    return this._passiveWeapon || [];
  };

  Game_Actor.prototype.getPassiveSkill = function(item) {
    return item.meta.PassiveSkill ? Number(item.meta.PassiveSkill) : 0;
  };

  Game_Actor.prototype.getPassiveConditions = function(item) {
    return item.meta.PassiveConditions ? item.meta.PassiveConditions.split(',') : [];
  };

  Game_Actor.prototype.isPassiveSkill = function(item) {
    const passive = this.getPassiveSkill(item);
    if (passive > 0) {
      const conditions = this.getPassiveConditions(item);
      const list = PassiveSkillConditions;
      this.setPassive = true;
      const every = conditions.every(id => this.skillConditions(list[Number(id.trim()) - 1]));
      this.setPassive = false;
      if (every) {
        return passive;
      }
      return 0;
    }
    return passive;
  };

  Game_Actor.prototype.skillConditions = function(list) {
    switch (list.ParamConditions) {
      case 'HP':
        return this.hp >= this.mhp * list.DwLimit / 100 && (list.UpLimit > 0 ? (this.hp <= this.mhp * list.UpLimit / 100) : true);
      case 'MP':
        return this.mp >= this.mmp * list.DwLimit / 100 && (list.UpLimit > 0 ? (this.mp <= this.mmp * list.UpLimit / 100) : true);
      case 'TP':
        return this.tp >= this.maxTp() * list.DwLimit / 100 && (list.UpLimit > 0 ? this.tp <= this.maxTp() * list.UpLimit / 100 : true);
      case 'State':
        return this._states.find(id => id === list.StateImgId);
      case 'Turn':
        return this.turnCount() >= list.DwLimit && (list.UpLimit > 0 ? this.turnCount() <= list.UpLimit : true);
      case 'GVal':
        return $gameVariables.value(list.VariableId) >= list.DwLimit &&
         (list.UpLimit > 0 ? $gameVariables.value(list.VariableId) <= list.UpLimit : true);
      case 'GSwc':
        return $gameSwitches.value(list.SwitchId);
    }
  };

  Game_Actor.prototype.setPassiveSkill = function() {
    const passiveSkills = [];
    const passiveSkillList = this._skills.filter(item => this.getPassiveSkill($dataSkills[item]));
    passiveSkillList.forEach(itemId => {
      const item = $dataSkills[itemId];
      const weapon = this.isPassiveSkill(item);
      if (weapon > 0) {
        passiveSkills.push($dataWeapons[weapon]);
      }
    });
    return passiveSkills;
  };

  const _Game_Actor_paramBasePlus = Game_Actor.prototype.paramBasePlus;
  Game_Actor.prototype.paramBasePlus = function(paramId) {
    return Math.max(0, _Game_Actor_paramBasePlus.call(this, paramId) + this.paramPassive(paramId));
  };

  Game_Actor.prototype.paramPassive = function(paramId) {
    let value = 0;
    for (const item of this.getPassiveWeapon()) {
      if (item) {
        value += item.params[paramId];
      }
    }
    return value;
  };

  const _Game_Actor_traitObjects = Game_Actor.prototype.traitObjects;
  Game_Actor.prototype.traitObjects = function() {
    const objects = _Game_Actor_traitObjects.call(this);
    return objects.concat(this.getPassiveWeapon());
  };

  const _Game_Actor_addedSkillTypes = Game_Actor.prototype.addedSkillTypes;
  Game_Actor.prototype.addedSkillTypes = function() {
    const traits = _Game_Actor_addedSkillTypes.call(this);
    if ($gameParty.inBattle()) {
      return traits.filter(id => id !== PassiveSkillType);
    }
    return traits;
  };

  const _Game_Variables_onChange = Game_Variables.prototype.onChange;
  Game_Variables.prototype.onChange = function() {
    _Game_Variables_onChange.call(this);
    $gameParty.passiveRefresh();
  };

  const _Game_SelfSwitches_onChange = Game_SelfSwitches.prototype.onChange;
  Game_SelfSwitches.prototype.onChange = function() {
    _Game_SelfSwitches_onChange.call(this);
    $gameParty.passiveRefresh();
  };

  Game_Party.prototype.passiveRefresh = function() {
    this.allMembers().forEach(actor => actor.passiveRefresh());
  };

})();