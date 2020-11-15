/*:-----------------------------------------------------------------------------------
 * NUUN_EncounterCondition.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 更新履歴
 * 2020/11 Ver 1.0.0
 */ 
/*:
 * 
 * @target MZ
 * @plugindesc エンカウント条件
 * @author NUUN
 * 
 * @help
 * 敵グループに対してエンカウント条件を付けます。
 * 敵グループの１ページ目に注釈で以下のタグを記入してください。
 * 条件が複数の場合、全ての条件に合致した場合のみエンカウントします。
 * 
 * <Enc_Switch:3, true> スイッチのID３がtrueの時、エンカウントします。
 * <Enc_Val:3, 6, equal> 変数のID３の値が6と同じ場合、エンカウントします。
 * <Enc_Val:3, 6, greater> 変数のID３の値が6より大きい場合、エンカウントします。
 * <Enc_Val:3, 6, less> 変数のID３の値が6未満場合、エンカウントします。
 * <Enc_Val:3, 6, greaterEqual> 変数のID３の値が6以上場合、エンカウントします。
 * <Enc_Val:3, 6, lessEqual> 変数のID３の値が6以下場合、エンカウントします。
 * 演算識別がない場合は変数＞値で評価します。
 * <Enc_eval:条件式> 条件式に合致する場合、エンカウントします。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_EncounterCondition = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_EncounterCondition');
  const re1 = /<(?:Enc_Switch):\s*(.*)>/;
  const re2 = /<(?:Enc_Val):\s*(.*)>/;
  const re3 = /<(?:Enc_eval):\s*(.*)>/;

  const _Game_Player_meetsEncounterConditions = Game_Player.prototype.meetsEncounterConditions;
  Game_Player.prototype.meetsEncounterConditions = function(encounter) {
    let encount = _Game_Player_meetsEncounterConditions.call(this, encounter);
    if(encount) {
      encount = this.conditionsData(encounter);
    }
    return encount;
  };

  Game_Player.prototype.conditionsData = function(encounter) {
    const troop = $dataTroops[encounter.troopId];
    const conditionslist = this.encounterConditions(troop);
    let encount = true;
    conditionslist.forEach(list => {
			if(!this.conditionsEval(list)){
        encount = false;
        return this;
      }
    });
    return encount;
  };

  Game_Player.prototype.conditionsEval = function(conditions) {
    if(conditions.type === 0) {
      const switchId = Number(conditions.deta[0]);
      const a = conditions.deta[1] ? Boolean(conditions.deta[1]) : true;
      if(switchId > 0 && $gameSwitches.value(switchId) === a) {
        return true;
      }
    } else if(conditions.type === 1) {
      const valId = Number(conditions.deta[0]);
      const val = Number(conditions.deta[1]);
      const operator = conditions.deta[2] ? conditions.deta[2] : 'greater';
      if(valId > 0) {
        if(operator === 'greater') {
          return $gameVariables.value(valId) > val;
        } else if (operator === 'less') {
          return $gameVariables.value(valId) < val;
        } else if (operator === 'equal') {
          return $gameVariables.value(valId) === val;
        } else if (operator === 'greaterEqual') {
          return $gameVariables.value(valId) >= val;
        } else if (operator === 'lessEqual') {
          return $gameVariables.value(valId) <= val;
        }
      }
    } else if(conditions.type === 2) {
      return eval(conditions.deta);
    }
    return false;
  };

  Game_Player.prototype.encounterConditions = function(troop) {
    const pages = troop.pages[0];
    list = [];
    pages.list.forEach(function(tag) {
      if (tag.code === 108 || tag.code === 408) {
        let match1 = re1.exec(tag.parameters[0]);
        let match2 = re2.exec(tag.parameters[0]);
        let match3 = re3.exec(tag.parameters[0]);
        if (match1) {
          list.push({type: 0, deta: match1[1].split(',')});
        } else if (match2) {
          list.push({type: 1, deta: match2[1].split(',')});
        } else if (match3) {
          list.push({type: 2, deta: match3[1]});
        }
      }
    });
    return list;
  }
})();