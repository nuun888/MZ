/*:-----------------------------------------------------------------------------------
 * NUUN_EncounterCondition.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc エンカウント条件
 * @author NUUN
 * @version 1.2.1
 * 
 * @help
 * 敵グループに対してエンカウント条件を付けます。
 * 敵グループの１ページ目に注釈で以下のタグを記入してください。
 * 条件が複数の場合、全ての条件に合致した場合のみエンカウント候補になります。
 * 
 * 変数
 * <Enc_Cond:[type],[id],[val][Inequality]>
 * スイッチ
 * <Enc_Cond:[type],[id],[flags]>
 * 乗り物
 * <Enc_Cond:[type],[vehicle],[flags]>
 * 条件式
 * <Enc_Cond:[type],[code]>
 * 条件付きベースでの条件
 * <Enc_Cond:[type], [mode], [condid], [condid], ...>
 * 
 * [type]:数値で指定
 * 0:変数　1:スイッチ　2:乗り物　10:評価式 20:条件付きベース条件
 * [id]:ゲーム変数、スイッチのID(１以上の整数)
 * [val]:比較する数値（数値)
 * [Inequality]:不等号
 * equal:等しい　greater:より大きい　less:未満　greaterEqual:以上　lessEqual:以下
 * [flags]:フラグ　trueまたはfalse
 * [vehicle]:乗り物　boat:小型船　ship:大型船　airship:飛行船　vehicle:乗り物
 * [mode]:条件モード　0 いずれかが一致　1：全て一致　※要条件付きベース
 * [condid]:条件付きベースで設定したリストID　※要条件付きベース
 * 
 * 
 * <Enc_Cond:0, 3, 6, equal> 変数のID３の値が6と同じ場合、エンカウントします。
 * <Enc_Cond:0, 3, 6, greater> 変数のID３の値が6より大きい場合、エンカウントします。
 * <Enc_Cond:0, 3, 6, less> 変数のID３の値が6未満場合、エンカウントします。
 * <Enc_Cond:0, 3, 6, greaterEqual> 変数のID３の値が6以上場合、エンカウントします。
 * <Enc_Cond:0, 3, 6, lessEqual> 変数のID３の値が6以下場合、エンカウントします。
 * 不等号識別がない場合は変数＞値で評価します。
 * <Enc_Cond:1, 3, true> スイッチのID３がtrueの時、エンカウントします。
 * <Enc_Cond:2, boat, true> ボートに乗っている場合のみエンカウントします。
 * <Enc_Cond:2, vehicle, false> 乗り物に乗っていない場合のみエンカウントします。
 * <Enc_Cond:10, 条件式> 条件式に合致する場合、エンカウントします。
 * 
 * 条件付きベースでの条件はパーティのみの判定になります。
 * <Enc_Cond:20, 7> 条件付きベースで設定したリストの条件に合致する場合、エンカウントします。
 * 
 * 旧方式
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
 * <Enc_eval:$gameVariables.value(1) >= 10>ゲーム変数１が１０以上ならエンカウントします。
 * <Enc_eval:$gamePlayer.isInShip()>プレイヤーが大型船に乗っている時のみエンカウントします。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/1/8 Ver.1.2.1
 * 新条件定義のスイッチと変数の条件が逆に定義されていた問題を修正。
 * 2021/12/19 Ver.1.2.0
 * 条件付きベースによる条件に対応。
 * 2021/8/5 Ver.1.1.0
 * エンカウント条件のタグ記述方式を変更。
 * 2021/1/4 Ver.1.0.0
 * 初版
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
    return conditionslist.every(list => this.conditionsEval(list));
  };

  Game_Player.prototype.conditionsEval = function(conditions) {
    if (conditions === null) {
      return false;
    }
    if(conditions.type === 0) {
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
    } else if(conditions.type === 1) {
      const switchId = Number(conditions.deta[0]);
      const flag = conditions.deta[1] ? eval(conditions.deta[1]) : true;
      if(switchId > 0 && $gameSwitches.value(switchId) === flag) {
        return true;
      }
    } else if (conditions.type === 2) {
      return eval(conditions.deta);
    } else if (conditions.type === 3) {
      return this.enc_vehicleConditions(conditions.deta);
    } else if (Imported.NUUN_ConditionsBase && conditions.type === 10) {
      return this.enc_ConditionsEx(conditions.deta, conditions.mode);
    }
    return false;
  };

  Game_Player.prototype.enc_vehicleConditions = function(data) {
    const booleanValue = data[1] ? eval(data[1]) : true;
    const vehicle = data[0].trim();
    if (vehicle === "boat") {
      return this.isInBoat() === booleanValue;
    } else if (vehicle === "ship") {
      return this.isInShip() === booleanValue;
    } else if (vehicle=== "airship") {
      return this.isInAirship() === booleanValue;
    } else if (vehicle === "vehicle") {
      return this.isInVehicle() === booleanValue;
    }
    return false;
  };

  Game_Player.prototype.enc_ConditionsEx = function(data, mode) {
    return this.getTriggerConditions(data, mode);
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
    const re4 = /<(?:Enc_Cond):\s*(.*)>/;
    const re1 = /<(?:Enc_Switch):\s*(.*)>/;
    const re2 = /<(?:Enc_Val):\s*(.*)>/;
    const re3 = /<(?:Enc_eval):\s*(.*)>/;
    pages.list.forEach(tag => {
      if (tag.code === 108 || tag.code === 408) {
        let match1 = re1.exec(tag.parameters[0]);
        let match2 = re2.exec(tag.parameters[0]);
        let match3 = re3.exec(tag.parameters[0]);
        let match4 = re4.exec(tag.parameters[0]);
        if (match4) {
          list.push(this.getConditionsData(match4[1].split(',')));
        } else if (match1) {
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

  Game_Map.prototype.getConditionsData = function(encData) {
    const encType = Number(encData[0]);
    if (encType === 0) {
      return {type: 0, deta: [encData[1], encData[2], encData[3]]};
    } else if (encType === 1) {
      return {type: 1, deta: [encData[1], encData[2]]};
    } else if (encType === 2) {
      return {type: 3, deta: [encData[1], encData[2]]};
    } else if (encType === 10) {
      return {type: 2, deta: encData[1]};
    } else if (encType === 20) {
      return {type: 10, deta: setCondBase(encData), mode: encData[1]};
    }
    return null;
  };

  function setCondBase(data) {
    return data.slice(2);
  }
})();