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
 * @version 1.0.1
 * 
 * @help
 * Implement a save screen that adds one to the maximum number of save files when you save with the unsaved file at the bottom of the save screen.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 4/21/2024 Ver.1.0.1
 * Added a function that allows you to set the title name of a new slot to save.
 * 3/24/2024 Ver.1.0.0
 * First edition.
 * 
 * @param NewSaveFileName
 * @desc Set the title of the new slot to save. If not specified, the file name + number (default) will be displayed.
 * @text New save title name
 * @type string
 * @default New Save
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 可変最大セーブ数
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.1
 * 
 * @help
 * セーブ画面で一番下の未セーブファイルでセーブしたときに、最大セーブファイル数を1つ追加するセーブ画面を実装します。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/4/21 Ver.1.0.1
 * 新しくセーブするスロットのタイトル名を設定できる機能を追加。
 * 2024/3/24 Ver.1.0.0
 * 初版
 * 
 * @param NewSaveFileName
 * @desc 新しくセーブするスロットのタイトルを設定します。指定なしの場合はファイル名+番号(デフォルト)で表示されます。
 * @text 新セーブタイトル名
 * @type string
 * @default 新しくセーブ
 * 
 */

var Imported = Imported || {};
Imported.NUUN_VariableSaveFiles = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

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

    const _Window_SavefileList_drawTitle = Window_SavefileList.prototype.drawTitle;
    Window_SavefileList.prototype.drawTitle = function(savefileId, x, y, width, info, data) {
        if (!!params.NewSaveFileName && !DataManager.savefileInfo(savefileId) && $gameSystem.getVariableSaveFiles() <= savefileId) {
            this.drawText(params.NewSaveFileName, x, y, 180);
        } else {
            _Window_SavefileList_drawTitle.apply(this, arguments);
       }
    };

})();