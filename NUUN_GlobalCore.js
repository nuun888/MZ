/*:-----------------------------------------------------------------------------------
 * NUUN_GlobalCore.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc グローバル情報ベース
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * セーブ全体で共有するためのベースプラグインです。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/4/2 Ver.1.0.0
 * 初版
 * 
 */
var Imported = Imported || {};
Imported.NUUN_GlobalCore = true;

function Nuun_GlobalManager() {
    throw new Error("This is a static class");
};

(() => {
const parameters = PluginManager.parameters('NUUN_GlobalCore');
let bootStart = false;

const _Scene_Boot_loadPlayerData = Scene_Boot.prototype.loadPlayerData;
Scene_Boot.prototype.loadPlayerData = function() {
    _Scene_Boot_loadPlayerData.call(this);
    Nuun_GlobalManager.load();
};

const _Scene_Boot_isPlayerDataLoaded = Scene_Boot.prototype.isPlayerDataLoaded;
Scene_Boot.prototype.isPlayerDataLoaded = function() {
    return _Scene_Boot_isPlayerDataLoaded.call(this) && Nuun_GlobalManager.isLoaded();
};

const _Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
    _Scene_Boot_start.call(this);
    bootStart = true;
};


const _Scene_Map_create = Scene_Map.prototype.create;
Scene_Map.prototype.create = function() {
    _Scene_Map_create.call(this);
    if (bootStart) {
        Nuun_GlobalManager.load();
        bootStart = false;
    }
};

const _Scene_Save_onSaveSuccess = Scene_Save.prototype.onSaveSuccess;
Scene_Save.prototype.onSaveSuccess = function() {
    _Scene_Save_onSaveSuccess.call(this);
    Nuun_GlobalManager.save();
};

Nuun_GlobalManager.nuun_Global = {};
Nuun_GlobalManager._isLoaded = false;

Nuun_GlobalManager.load = function() {
    StorageManager.loadObject("nuun_Global")
        .then(nuunGlobal => this.loadGlobal(nuunGlobal || {}))
        .catch(() => 0)
        .then(() => {
            this._isLoaded = true;
            return 0;
        })
        .catch(() => 0);
};

Nuun_GlobalManager.loadGlobal = function(nuunGlobal) {
    
};

Nuun_GlobalManager.save = function() {
    StorageManager.saveObject("nuun_Global", this.makeData());
};

Nuun_GlobalManager.isLoaded = function() {
    return this._isLoaded;
};

Nuun_GlobalManager.makeData = function() {
    const global = Nuun_GlobalManager.nuun_Global || {};
    return global;
};

Nuun_GlobalManager.applyData = function(data) {

};

Nuun_GlobalManager.readFlag = function(data, name, defaultValue) {
    if (name in data) {
        return data[name];
    } else {
        return defaultValue;
    }
};

})();