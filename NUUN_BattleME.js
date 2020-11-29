/*:-----------------------------------------------------------------------------------
 * NUUN_BattleME.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 更新履歴
 * 2020/11/29 Ver 1.0.0
 */ 
/*:
 * @target MZ
 * @plugindesc 敵グループの個別戦闘勝利敗北ME
 * @author NUUN
 * 
 * @help
 * 敵グループごとに戦闘勝利敗北MEを設定できます。
 * 
 * 敵グループのバトルイベントの１ページ目に注釈で記入してください。
 * 
 * 戦闘勝利時のME
 * <battleVictoryME:[name],[volume],[pitch],[pan],[eval]> [name]で指定したMEが再生られます。
 *  ※[eval]は省略できます。
 * 
 * 戦闘敗北時のME
 * <battleDefeatME:[name],[volume],[pitch],[pan],[eval]> [name]で指定したMEが再生られます。
 *  ※[eval]は省略できます。
 * 
 * [name]:MEファイル名（拡張子なし）
 * [volume]:音量
 * [pitch]:ピッチ
 * [pan]:位相
 * [eval]:再生条件（評価式）
 * 
 * 例
 * <battleVictoryME:Victory2, 90, 100, 50> 勝利時のMEがVictory2になります。
 * <battleDefeatME:Defeat2, 90, 100, 50> 敗北時のMEがDefeat2になります。
 * <battleVictoryME:Victory3, 90, 100, 50, $gameSwitches.value(3)> スイッチID３番がTrueの時、勝利時のMEがVictory3になります。
 * 
 * 条件付きのMEはなるべく優先度の高い順に上から記入してください。
 * 仕様上、一番最初に再生可能なMEが見つかったらそのMEが再生されます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 
 */ 
var Imported = Imported || {};
Imported.NUUN_BattleME = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_BattleME');
  const reVictory = /<(?:battleVictoryME):\s*(.*)>/;
  const reDefeat = /<(?:battleDefeatME):\s*(.*)>/;

  const _Game_Troop_setup = Game_Troop.prototype.setup;
  Game_Troop.prototype.setup = function(troopId) {
    _Game_Troop_setup.call(this, troopId);
    const victoryME = this.battleVictoryMESetup();
    $gameSystem.setVictoryMe(victoryME);
    const defeatME = this.battleDefeatMESetup();
    $gameSystem.setDefeatMe(defeatME);
  };

  Game_Troop.prototype.battleVictoryMESetup = function() {
    const pages = this.troop().pages[0];
    let list = null;
    pages.list.forEach(tag => {
      if ((tag.code === 108 || tag.code === 408) && !list) {
        let match = reVictory.exec(tag.parameters[0]);
        if (match) {
          list = this.battleVictoryMERequest(match[1]);
        }
      }
    });
    return list;
  };

  Game_Troop.prototype.battleDefeatMESetup = function() {
    const pages = this.troop().pages[0];
    let list = null;
    pages.list.forEach(tag => {
      if ((tag.code === 108 || tag.code === 408) && !list) {
        let match = reDefeat.exec(tag.parameters[0]);
        if (match) {
          list = this.battleDefeatMERequest(match[1]);
        }
      }
    });
    return list;
  };

  Game_Troop.prototype.battleMEConditions = function(conditions) {
    return conditions ? eval(conditions) : true;
  };

  Game_Troop.prototype.battleVictoryMERequest = function(data) {
    const list = data.split(',');
    if(this.battleMEConditions(list[4])){
      return {name:list[0],volume:list[1],pitch:list[2],pan:list[3]};
    }
    return null;
  };

  Game_Troop.prototype.battleDefeatMERequest = function(data) {
    const list = data.split(',');
    if(this.battleMEConditions(list[4])){
      return {name:list[0],volume:list[1],pitch:list[2],pan:list[3]};
    }
    return null;
  };

})();