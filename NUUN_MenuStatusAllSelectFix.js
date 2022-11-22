/*:-----------------------------------------------------------------------------------
 * NUUN_MenuStatusAllSelectFix.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc メニュー画面の全体対象時のカーソル表示修正
 * @author NUUN
 * @version 1.0.1
 * 
 * @help
 * メニュー画面プラグインのアクターの表示列を２列にして味方全体対象アイテム、スキルを使用すると、
 * カーソルの表示がおかしくなる問題を修正します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/11/23 Ver.1.0.1
 * 全体選択時でアクター表示行が2列以上の時に表示が乱れる問題を修正。
 * 2022/5/29 Ver.1.0.0
 * 初版
 * 
 */

var Imported = Imported || {};
Imported.NUUN_MenuStatusAllSelectFix = true;

(() => {

Window_Selectable.prototype.refreshCursorForAll = function() {//再定義
    const maxItems = this.maxItems();
    if (maxItems > 0) {
        const items = maxItems > this.maxCols() ? (maxItems % this.maxCols() + 1) * this.maxCols() : maxItems;
        const rect = this.itemRect(0);
        rect.enlarge(this.itemRect(items - 1));
        this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
    } else {
        this.setCursorRect(0, 0, 0, 0);
    }
};

})();