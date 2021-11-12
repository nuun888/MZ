/*:-----------------------------------------------------------------------------------
 * NUUN_ConditionalDrops.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc 条件付きドロップ
 * @author NUUN
 * @version 1.0.2
 * @base NUUN_ConditionsBase
 * 
 * @help
 * 
 * 敵のメモ欄
 * <CondDropItem:[item],[id],[rate],[condNameTag],[CondMode]>
 * [item]:
 * I:アイテム W：武器 A：防具
 * [id]：アイテムID
 * [rate]：確率
 * [condNameTag]：任意の条件タグ名（省略可）省略した場合はConditionalDropが指定されます。
 * [condMode]：条件モード（省略可）0:一部一致 1:全て一致
 * 
 * <Drop[condNameTag]:[id],[id],[id]...> 攻撃して倒したアクターが指定したIDの条件を満たしたときにドロップします。
 * <TargetDrop[condNameTag]:[id],[id],[id]...> 倒された敵が指定したIDの条件を全て満たしたときにドロップします。
 * <PartyDrop[condNameTag]:[id],[id],[id]...> パーティメンバーの指定したIDの条件を全て満たしたときにドロップします。
 * <TroopDrop[condNameTag]:[id],[id],[id]...> 敵グループの指定したIDの条件を全て満たしたときにドロップします。
 * [id]:条件付きベースの適用条件のリストID
 * 例
 * <CondDropItem:I,16,50,cond1> 条件cond1が一致したときにアイテム番号16番のアイテムが５０％の確率でドロップします。
 * <DropCond1:1>上記の条件を参照するためのタグでリスト番号１番の条件を判定します。
 * 
 * このプラグインはNUUN_ConditionsBaseが必要です。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/11/12 Ver.1.0.2
 * 条件付きベースの定義変更による条件タグの設定方法を変更。
 * ターゲットデータが取得できない問題を修正。
 * 2021/10/24 Ver.1.0.1
 * 条件タグにスペースを入れると条件が判定されない問題を修正。
 * 2021/10/22 Ver.1.0.0
 * 初版
 * 
 * 
 */

var Imported = Imported || {};
Imported.NUUN_ConditionalDrops = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_ConditionalDrops');
  let conditionalDropItems = [];

  const _Game_Enemy_setup = Game_Enemy.prototype.setup;
  Game_Enemy.prototype.setup = function(enemyId, x, y) {
    _Game_Enemy_setup.call(this, enemyId, x, y);
    conditionalDropItems = this.conditionalDropsSetup();
  };

  const _Game_Enemy_die = Game_Enemy.prototype.die;
  Game_Enemy.prototype.die = function() {
    this.getConditionalDrops();
    _Game_Enemy_die.call(this);
  };

  Game_Enemy.prototype.getConditionalDrops = function() {
    this._getCondDropList = [];
    const enemy = this.enemy()
    conditionalDropItems.forEach(condDrop => {
      const condTag = "Drop" + String(condDrop[3]).trim() || 'DropCond';
      const action = $gameTemp.getActionData();
      const mode = condDrop[4] || 0;
      if (action.subject.getTriggerConditions(enemy, this, condTag, 'Target' + condTag, 'Party' + condTag, 'Troop' + condTag, action.action, action.damage, mode) && this.condDropRate(condDrop)) {
        const drop = this.getCondDropItem(condDrop);
        if (drop) {
          this._getCondDropList.push(drop);
        }
      }
    });
  };

  Game_Enemy.prototype.getCondDropItem = function(condDrop) {
    const item = condDrop[0];
    if (item === 'I') {
      return $dataItems[Number(condDrop[1])];
    } else if (item === 'W') {
      return $dataWeapons[Number(condDrop[1])];
    } else if (item === 'A') {
      return $dataArmors[Number(condDrop[1])];
    } else {
      return null;
    }
  };

  Game_Enemy.prototype.condDropRate = function(condDrop) {
    return Math.random() * 100 < Number(condDrop[2]);
  };

  Game_Enemy.prototype.conditionalDropsSetup = function() {
	  const re = /<(?:CondDropItem):\s*(.*)>/g;
    const data = [];
    while(true)  {
      let match = re.exec(this.enemy().note);
      if (match) {
        data.push(match[1].split(','))
      } else {
        break;
      }
    }
    return data;
  };

  const _Game_Enemy_makeDropItems = Game_Enemy.prototype.makeDropItems;
  Game_Enemy.prototype.makeDropItems = function() {
    return _Game_Enemy_makeDropItems.call(this).concat(this._getCondDropList);
  };

})();