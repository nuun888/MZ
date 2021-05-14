/*:-----------------------------------------------------------------------------------
 * NUUN_Base.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc  共通処理
 * @author NUUN
 * @version 1.1.4
 * 
 * @help
 * 共通処理を行うベースプラグインです。
 * プラグインリストの上に配置してください。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/5/15 Ver.1.1.4
 * ウィンドウスキンをウィンドウ毎に設定できる処理を追加。
 * 2021/5/8 Ver.1.1.3
 * 処理を一部修正。
 * 2021/5/7 Ver.1.1.2
 * 構造体の取得処理を追加。
 * 2021/4/23 Ver.1.1.1
 * 画像のフォルダー指定の処理を追加。
 * 2021/3/14 Ver.1.1.0
 * 画像のフォルダー指定の処理を追加。
 * 2020/12/31 Ver.1.0.0
 * 初版
 * 
 */
var Imported = Imported || {};
Imported.NUUN_Base = true;
const NUUN_Base_Ver = 114;

(() => {
const parameters = PluginManager.parameters('NUUN_Base');

function structureData(params) {
  return JSON.parse(JSON.stringify(params, function(key, value) {
    try {
        return JSON.parse(value);
    } catch (e) {
        try {
            return eval(value);
        } catch (e) {
            return value;
        }
    }
  }));
}

DataManager.nuun_structureData = function(params){
  return params ? structureData(params) : [];
};

const _Scene_Boot_onDatabaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
Scene_Boot.prototype.onDatabaseLoaded = function() {
  _Scene_Boot_onDatabaseLoaded.call(this);
  DataManager.nuun_Data();
};

DataManager.nuun_Data = function(){
  DataManager.nuun_DataObject($dataActors, 1);
  DataManager.nuun_DataObject($dataEnemies, 7);
};

DataManager.nuun_DataObject = function(object, code){
  for(let i = 1; i <= object.length; i++){
    if (object[i]) {
      if(code === 1) {
        DataManager.nuun_loadDataActors(object[i]);
      } else if (code === 7) {
        DataManager.nuun_loadDataEnemies(object[i]);
      }
    }
  }
};

DataManager.nuun_loadDataActors = function(deta){
};

DataManager.nuun_loadDataEnemies = function(deta){
};

ImageManager.nuun_backGround = function(filename) {
  return this.loadBitmap("img/nuun_background/", filename);
};

ImageManager.nuun_actorPictures = function(filename) {
  return this.loadBitmap("img/nuun_actorpictures/", filename);
};

ImageManager.nuun_LoadPictures = function(filename) {
  return this.loadBitmap("img/", filename);
};

const _Window_Selectable_drawItemBackground = Window_Selectable.prototype.drawItemBackground;
Window_Selectable.prototype.drawItemBackground = function(index) {
  if (!this._contentsBackVisible) {
    _Window_Selectable_drawItemBackground.call(this, index);
  }
};

const _Window_Base_initialize = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function(rect) {
  _Window_Base_initialize.call(this, rect);
  this._userWindowSkin = null;
};

const _Window_Base_loadWindowskin = Window_Base.prototype.loadWindowskin;
Window_Base.prototype.loadWindowskin = function() {
  if (this._userWindowSkin) {
    this.windowskin = ImageManager.loadSystem(this._userWindowSkin);
  } else {
    _Window_Base_loadWindowskin.call(this);
  } 
};

})();
