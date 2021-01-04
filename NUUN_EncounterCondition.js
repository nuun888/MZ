/*:-----------------------------------------------------------------------------------
 * NUUN_EncounterCondition.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 更新履歴
 * 2021/1/4 Ver.1.0.0
 * 初版
 */ 
/*:
 * @target MZ
 * @plugindesc エンカウント条件
 * @author NUUN
 * 
 * @help
 * 敵グループに対してエンカウント条件を付けます。
 * 敵グループの１ページ目に注釈で以下のタグを記入してください。
 * 条件が複数の場合、全ての条件に合致した場合のみエンカウント候補になります。
 * 
 * <Enc_Switch:[id], [flags]>　[id]:スイッチID、[flags]true及びfalse
 * <Enc_Switch:3, true> スイッチのID３がtrueの時、エンカウントします。
 * 
 * <Enc_Val:[id], [value], [Inequality]>　[id]:　変数ID, [value]:数値, [Inequality]:不等号
 * <Enc_Val:3, 6, equal> 変数のID３の値が6と同じ場合、エンカウントします。
 * <Enc_Val:3, 6, greater> 変数のID３の値が6より大きい場合、エンカウントします。
 * <Enc_Val:3, 6, less> 変数のID３の値が6未満場合、エンカウントします。
 * <Enc_Val:3, 6, greaterEqual> 変数のID３の値が6以上場合、エンカウントします。
 * <Enc_Val:3, 6, lessEqual> 変数のID３の値が6以下場合、エンカウントします。
 * 不等号識別がない場合は変数＞値で評価します。
 * 
 * <Enc_eval:[eval]> 条件式に合致する場合、エンカウントします。[eval]:条件式
 * <Enc_eval:$gamePlayer.isInShip()>プレイヤーが大型船に乗っている時のみエンカウントします。
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

  const _Game_Player_meetsEncounterConditions = Game_Player.prototype.meetsEncounterConditions;
  Game_Player.prototype.meetsEncounterConditions = function(encounter) {
    let encount = _Game_Player_meetsEncounterConditions.call(this, encounter);
    if(encount) {
      encount = this.conditionsData(encounter);
    }
    return encount;
  };

  Game_Player.prototype.conditionsData = function(encounter) {
    const conditionslist = $gameMap._encounterConditions[encounter.troopId];
    let encount = true;
    conditionslist.forEach(list => {
			if(!this.conditionsEval(list)){
        encount = false;
        return;
      }
    });
    return encount;
  };

  Game_Player.prototype.conditionsEval = function(conditions) {
    if(conditions.type === 0) {
      const switchId = Number(conditions.deta[0]);
      const flag = conditions.deta[1] ? Boolean(conditions.deta[1]) : true;
      if(switchId > 0 && $gameSwitches.value(switchId) === flag) {
        return true;
      }
    } else if(conditions.type === 1) {
      const valId = Number(conditions.deta[0]);
      const val = Number(conditions.deta[1]);
      const operator = conditions.deta[2] ? String(conditions.deta[2]).trim() : "greater";
      if(valId > 0) {
        switch (operator) {
          case "greater":
            return $gameVariables.value(valId) > val;
          case "less":
            return $gameVariables.value(valId) < val;
          case "equal":
            return $gameVariables.value(valId) === val;
          case "greaterEqual":
            return $gameVariables.value(valId) >= val;
          case "lessEqual": 
          return $gameVariables.value(valId) <= val;
        }
      }
    } else if(conditions.type === 2) {
      return eval(conditions.deta);
    }
    return false;
  };

  const _Game_Map_setup = Game_Map.prototype.setup;
  Game_Map.prototype.setup = function(mapId) {
    _Game_Map_setup.call(this, mapId);
    this.encounterConditionsSetup();
  };

  Game_Map.prototype.encounterConditionsSetup = function() {
    this._encounterConditions = [];
    for (const encounter of this.encounterList()) {
      const troop = $dataTroops[encounter.troopId];
      this._encounterConditions[encounter.troopId] = this.encounterConditions(troop);
    }
  };

  Game_Map.prototype.encounterConditions = function(troop) {
    const pages = troop.pages[0];
    list = [];
    const re1 = /<(?:Enc_Switch):\s*(.*)>/;
    const re2 = /<(?:Enc_Val):\s*(.*)>/;
    const re3 = /<(?:Enc_eval):\s*(.*)>/;
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
  };
})();