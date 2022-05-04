/*:-----------------------------------------------------------------------------------
 * NUUN_ItemBook_Global.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc アイテム図鑑全セーブ共通
 * @author NUUN
 * @version 1.0.0
 * @base NUUN_GlobalCore
 * @base NUUN_ItemBook
 * @orderAfter NUUN_GlobalCore
 * @orderAfter NUUN_ItemBook
 * 
 * @help
 * アイテム図鑑のデータを全セーブデータで共用します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/5/4 Ver.1.0.0
 * 初版
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_ItemBook_Global = true;

(() => {
const parameters = PluginManager.parameters('NUUN_ItemBook_Global');
const GlobalName = 'ItemBookGlobal';

Nuun_GlobalManager.nuun_ItemBookGlobal = {};

Nuun_GlobalManager.loadItemBook = function(nuunGlobal) {
    this.applyItemBookData(nuunGlobal);
};

Nuun_GlobalManager.makeItemBookData = function() {
    const global = Nuun_GlobalManager.nuun_ItemBookGlobal || {};
    const itemBook = $gameSystem._itembookData;
    global.itembookItemData = itemBook._itembookItemData;
    global.itembookWeaponData = itemBook._itembookWeaponData;
    global.itembookArmorData = itemBook._itembookArmorData;
    global.itembookItemInfo = itemBook._itembookItemInfo;
    global.itembookWeaponInfo = itemBook._itembookWeaponInfo;
    global.itembookArmorInfo = itemBook._itembookArmorInfo;
    return global;
};

Nuun_GlobalManager.applyItemBookData = function(data) {
    const itemBook = $gameSystem._itembookData;
    itemBook._itembookItemData = this.readFlag(data, "itembookItemData", []);
    itemBook._itembookWeaponData = this.readFlag(data, "itembookWeaponData", []);
    itemBook._itembookArmorData = this.readFlag(data, "itembookArmorData", []);
    itemBook._itembookItemInfo = this.readFlag(data, "itembookItemInfo", []);
    itemBook._itembookWeaponInfo = this.readFlag(data, "itembookWeaponInfo", []);
    itemBook._itembookArmorInfo = this.readFlag(data, "itembookArmorInfo", []);
};

const _Nuun_GlobalManager_load = Nuun_GlobalManager.load;
Nuun_GlobalManager.load = function() {
    _Nuun_GlobalManager_load.call(this);
    this.globalLoad(GlobalName, 'loadItemBook');
};

const _Nuun_GlobalManager_save = Nuun_GlobalManager.save;
Nuun_GlobalManager.save = function() {
    _Nuun_GlobalManager_save.call(this);
    this.globalSave(GlobalName, 'makeItemBookData');
};
})();