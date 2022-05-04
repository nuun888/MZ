/*:-----------------------------------------------------------------------------------
 * NUUN_EnemyBook_Global.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc モンスター図鑑全セーブ共通
 * @author NUUN
 * @version 1.0.1
 * @base NUUN_GlobalCore
 * @base NUUN_EnemyBook
 * @orderAfter NUUN_GlobalCore
 * @orderAfter NUUN_EnemyBook
 * 
 * @help
 * モンスター図鑑のデータを全セーブデータで共用します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/5/4 Ver.1.0.1
 * 処理の修正。
 * 2022/4/2 Ver.1.0.0
 * 初版
 * 
 * @param GlobalName
 * @desc 出力するファイル名。(Ver.1.0.0から使用の場合はnuun_Globalと記入してください)
 * @text 出力ファイル名
 * @type string
 * @default EnemyBook_Global
 * 
 */
var Imported = Imported || {};
Imported.NUUN_EnemyBook_Global = true;

(() => {
const parameters = PluginManager.parameters('NUUN_EnemyBook_Global');
const GlobalName = String(parameters['GlobalName'] || 'EnemyBook_Global');

Nuun_GlobalManager.nuun_Global = {};

Nuun_GlobalManager.loadEnemyBook = function(nuunGlobal) {
    this.applyEnemyBookData(nuunGlobal.enemyBook);
};

Nuun_GlobalManager.makeEnemyBookData = function() {
    const global = Nuun_GlobalManager.nuun_Global || {};
    global.enemyBook = {};
    global.enemyBook.enemyBookFlags = $gameSystem._enemyBookFlags;
    global.enemyBook.enemyBookStatusFlags = $gameSystem._enemyBookStatusFlags;
    global.enemyBook.defeatNumber = $gameSystem._defeatNumber;
    global.enemyBook.itemDorps = $gameSystem._itemDorps;
    global.enemyBook.condItemDorps = $gameSystem._condItemDorps;
    global.enemyBook.stealItem = $gameSystem._stealItem;
    global.enemyBook.enemyBookElementFlags = $gameSystem._enemyBookElementFlags;
    global.enemyBook.enemyBookStateFlags = $gameSystem._enemyBookStateFlags;
    global.enemyBook.enemyBookDebuffFlags = $gameSystem._enemyBookDebuffFlags;
    global.enemyBook.enemyBookActionFlags = $gameSystem._enemyBookActionFlags;
    return global;
};

Nuun_GlobalManager.applyEnemyBookData = function(data) {
    $gameSystem._enemyBookFlags = this.readFlag(data, "enemyBookFlags", []);
    $gameSystem._enemyBookStatusFlags = this.readFlag(data, "enemyBookStatusFlags", []);
    $gameSystem._defeatNumber = this.readFlag(data, "defeatNumber", []);
    $gameSystem._itemDorps = this.readFlag(data, "itemDorps", []);
    $gameSystem._condItemDorps = this.readFlag(data, "condItemDorps", []);
    $gameSystem._stealItem = this.readFlag(data, "stealItem", []);
    $gameSystem._enemyBookElementFlags = this.readFlag(data, "enemyBookElementFlags", []);
    $gameSystem._enemyBookStateFlags = this.readFlag(data, "enemyBookStateFlags", []);
    $gameSystem._enemyBookDebuffFlags = this.readFlag(data, "enemyBookDebuffFlags", []);
    $gameSystem._enemyBookActionFlags = this.readFlag(data, "enemyBookActionFlags", []);
};

const _Nuun_GlobalManager_load = Nuun_GlobalManager.load;
Nuun_GlobalManager.load = function() {
    _Nuun_GlobalManager_load.call(this);
    this.globalLoad(GlobalName, 'loadEnemyBook');
};

const _Nuun_GlobalManager_save = Nuun_GlobalManager.save;
Nuun_GlobalManager.save = function() {
    _Nuun_GlobalManager_save.call(this);
    this.globalSave(GlobalName, 'makeEnemyBookData');
};

})();