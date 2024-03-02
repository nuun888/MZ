/*:-----------------------------------------------------------------------------------
 * NUUN_EnemyBookEX_2.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc 条件付きドロップアイテム図鑑適用（モンスター図鑑拡張）
 * @author NUUN
 * @version 1.1.0
 * @base NUUN_EnemyBook
 * @base NUUN_ConditionalDrops
 * @orderAfter NUUN_EnemyBook
 * @orderAfter NUUN_ConditionalDrops
 * 
 * @help
 * モンスター図鑑に条件付きドロップアイテムを適用させます。
 * 未確認条件ドロップアイテム名をONにするとまだドロップしていない条件付きドロップアイテムの表示を隠すことができます。
 * 隠す文字の設定はモンスター図鑑プラグインのステータス情報未登録時アイテム、スキル表示名で設定してください。
 * 未確認条件ドロップアイテム名をOFFにした場合、途中で設定をONにしても今までの獲得したアイテムは反映されません。
 * 
 * このプラグインはモンスター図鑑（NUUN_EnemyBook）の拡張機能です。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/3/2 Ver.1.1.0
 * 条件付きドロップアイテムを入手済みまたは、未入手済みにするプラグインコマンドを追加。
 * 2021/12/25 Ver.1.0.1
 * 敵の情報を登録済みにするプラグインコマンドを使用したときにエラーが出る問題を修正。
 * 2021/12/22 Ver.1.0.0
 * 初版
 * 
 * @param CondDropItemData
 * @text 条件ドロップアイテム設定
 * @default ------------------------------
 * 
 * @param ShowCondDropItemName
 * @desc 未確認の条件ドロップアイテムを隠す。(ステータス情報登録をしてもドロップアイテムを確認するまでは表示されません)
 * @text 未確認条件ドロップアイテム名
 * @type boolean
 * @default false
 * @parent CondDropItemData
 * 
 * @param CondDropItemMultiCol
 * @desc ワイドモード２列表示以上時の複数列表示。
 * @text ワイドモード時の複数列表示
 * @type boolean
 * @default false
 * @parent CondDropItemData
 * 
 * 
 * @command EnemyBookGetCondDropItem
 * @desc モンスターの条件付きドロップアイテムを取得済みにします。
 * @text 条件付きドロップアイテム取得済み
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg dropListId
 * @type number
 * @default 0
 * @text ドロップアイテムリストID
 * @desc ドロップアイテムリストIDを指定します。（0ですべて取得済みにします）
 * 
 * 
 * @command EnemyBookRemoveCondDropItem
 * @desc モンスターの条件付きドロップアイテムを未収得にします。
 * @text 条件付きドロップアイテム未収得
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg dropListId
 * @type number
 * @default 0
 * @text ドロップアイテムリストID
 * @desc ドロップアイテムリストIDを指定します。（0ですべて未取得済みにします）
 * 
 */
var Imported = Imported || {};
Imported.NUUN_EnemyBookEX_2 = true;

(() => {
const parameters = PluginManager.parameters('NUUN_EnemyBookEX_2');
const ShowCondDropItemName = eval(parameters['ShowCondDropItemName'] || 'false');
const CondDropItemMultiCol = eval(parameters['CondDropItemMultiCol'] || 'false');
const pluginName = "NUUN_EnemyBookEX_2";

PluginManager.registerCommand(pluginName, 'EnemyBookGetCondDropItem', args => {
    $gameSystem.condDropItemListFlag(Number(args.enemyId), Number(args.dropListId) - 1, true, Number(args.dropListId) > 0);
});
      
PluginManager.registerCommand(pluginName, 'EnemyBookRemoveCondDropItem', args => {
    $gameSystem.dropItemListFlag(Number(args.enemyId), Number(args.dropListId) - 1, false, Number(args.dropListId) > 0);
});

Window_Selectable.prototype.getShowCondDropItemName = function() {
  return ShowCondDropItemName;
};

Window_Selectable.prototype.getCondDropItemMultiCol = function() {
  return CondDropItemMultiCol;
};


Game_System.prototype.clearCondDropItem = function() {
	this._condItemDorps = [];
};

Game_System.prototype.setCondDropItemFlag = function(enemyId, dropId, flag) {
  if (!ShowCondDropItemName) {
    return;
  }
	if (!this._condItemDorps) {
		this.clearCondDropItem();
  }
  this._condItemDorps[enemyId] = this._condItemDorps[enemyId] || [];
  this._condItemDorps[enemyId][dropId] = flag;
};

Game_System.prototype.getCondDropItemFlag = function(enemyId, dropId) {
  
  if(!this._condItemDorps || !this._condItemDorps[enemyId] || !this._condItemDorps[enemyId][dropId]) {
    return false;
  }
  return this._condItemDorps[enemyId][dropId];
};

Game_System.prototype.condDropItemListFlag = function(enemyId, dropListId, mode, Individual) {
	if(ShowCondDropItemName && enemyId > 0){
    if(Individual){
      this.setCondDropItemFlag(enemyId, dropListId, mode);
    } else {
      let itemList = this.getconditionalDrops($dataEnemies[enemyId]);
       for(let i = 0; itemList.length > i; i++){
        this.setCondDropItemFlag(enemyId, i, mode);
      }
    }
  }
};

Game_System.prototype.condDorpItemAcquired = function(switchId, enemyId, dropId) {
  if (dropId > 0) {
    drop = this.getCondDropItemFlag(enemyId, dropId);
  } else {
    drop = false;
    const itemList = this.getconditionalDrops($dataEnemies[enemyId]);
    if (itemList) {
      itemList.some((item, r) => {
        if (item.kind > 0) {
          drop = this.getCondDropItemFlag(enemyId, r);
        }
        return drop;
      })
    }
  }
  if (switchId > 0) {
    $gameSwitches.setValue(switchId, drop);
  } else {
    return drop;
  }
};


const _Game_Enemy_getCondDropItem = Game_Enemy.prototype.getCondDropItem;
Game_Enemy.prototype.getCondDropItem = function(condDrop, r) {
  const item = _Game_Enemy_getCondDropItem.call(this, condDrop, r);
  $gameSystem.setCondDropItemFlag(this.enemyId(), r, true);
  return item;
};

Game_Enemy.prototype.consDropItemFlag = function(drop) {
  const di = this.conditionalDropsSetup();
  drop.forEach(item => {
    di.forEach((diItem, r) => {
      if (item.id === diItem.dataId) {
        switch (diItem.kind) {
          case 1:
            if(DataManager.isItem(item)){
              $gameSystem.setCondDropItemFlag(this._enemyId, r, true);
            }
            break;
          case 2:
            if(DataManager.isWeapon(item)){
              $gameSystem.setCondDropItemFlag(this._enemyId, r, true);
            }
            break;
          case 3:
            if(DataManager.isArmor(item)){
              $gameSystem.setCondDropItemFlag(this._enemyId, r, true);
            }
            break;
          }
      }
    })
  })
};

})();