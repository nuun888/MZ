/*:-----------------------------------------------------------------------------------
 * NUUN_VariableSaveFiles.js
 * 
 * Copyright (C) 2024 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Variable maximum save number
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * Implement a save screen that adds one to the maximum number of save files when you save with the unsaved file at the bottom of the save screen.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 3/24/2024 Ver.1.0.0
 * First edition.
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 可変最大セーブ数
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.0
 * 
 * @help
 * セーブ画面で一番下の未セーブファイルでセーブしたときに、最大セーブファイル数を1つ追加するセーブ画面を実装します。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/3/24 Ver.1.0.0
 * 初版
 * 
 */

var Imported = Imported || {};
Imported.NUUN_VariableSaveFiles = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_VariableSaveFiles');

    const _DataManager_maxSavefiles = DataManager.maxSavefiles;
    DataManager.maxSavefiles = function() {
        return $gameSystem.getVariableSaveFiles();
        //return Math.min(_DataManager_maxSavefiles.call(this), $gameSystem.getVariableSaveFiles());
    };


    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this.initVariableSaveFiles();
    };

    Game_System.prototype.getVariableSaveFiles = function() {
        return this._variableSaveFiles;
    };

    Game_System.prototype.countVariableSaveFiles = function() {
        this._variableSaveFiles++;
    };

    Game_System.prototype.initVariableSaveFiles = function() {
        this._variableSaveFiles = Math.max(1, this.maxSaveFileId() + 1);
    };

    Game_System.prototype.maxSaveFileId = function() {
        const globalInfo = DataManager._globalInfo;
        return globalInfo.reduce((r, info, i) => {
            return r = i;
        }, 0);
    };


    const _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        _DataManager_extractSaveContents.call(this, contents);
        $gameSystem.initVariableSaveFiles();
    };


    const _Scene_Save_onSavefileOk = Scene_Save.prototype.onSavefileOk;
    Scene_Save.prototype.onSavefileOk = function() {
        _Scene_Save_onSavefileOk.call(this);
        const savefileId = this.savefileId();
        if (!DataManager.savefileInfo(savefileId) && $gameSystem.getVariableSaveFiles() <= savefileId) {
            $gameSystem.countVariableSaveFiles();
        }
    };


    const _Window_SavefileList_maxItems = Window_SavefileList.prototype.maxItems;
    Window_SavefileList.prototype.maxItems = function() {
        return _Window_SavefileList_maxItems.call(this) + (this._mode === "save" ? 1 : 0);
    };
    
})();