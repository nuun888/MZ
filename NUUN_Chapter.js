/*:-----------------------------------------------------------------------------------
 * NUUN_Chapter.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc チャプターテキスト
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * セーブ、メニュー画面に表示するチャプターテキストをプラグインパラメータで設定できるようにします。
 * 変更はプラグインコマンドで設定します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/7/4 Ver.1.0.0
 * 初版
 * 
 * @command SetChapter
 * @text チャプター変更
 * @desc 表示するチャプターテキストを変更します。
 *
 * @arg id
 * @text チャプターID
 * @desc チャプターテキスト設定のリストIDを指定します。
 * @type number
 * @default 0
 * 
 * 
 * @param ChapterList
 * @text チャプターテキスト設定
 * @desc チャプターテキストの設定を行います。
 * @default []
 * @type struct<Chapter>[]
 * 
 */
/*~struct~Chapter:
 * 
 * @param ChapterText
 * @text チャプターテキスト
 * @desc チャプターのテキストを記入します。（制御文字使用可能）
 * @default 
 * @type multiline_string
 * 
 */

var Imported = Imported || {};
Imported.NUUN_Chapter = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_Chapter');
    const ChapterList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ChapterList'])) : null) || [];
    
    const pluginName = "NUUN_Chapter";
    PluginManager.registerCommand(pluginName, 'SetChapter', args => {
        $gameSystem.setChapterId(Number(args.id));
    });

    Game_System.prototype.getChapterId = function() {
        return this._chapterId || 0;
    };

    Game_System.prototype.setChapterId = function(index) {
        this._chapterId = index;
    };

    Game_System.prototype.getChapter = function() {
        const data = ChapterList[this.getChapterId() - 1];
        return data ? data.ChapterText : null
    };

    Window_Base.prototype.getChapter = function() {
        const data = ChapterList[$gameSystem.getChapterId() - 1];
        return data ? data.ChapterText : null;
    };

})();