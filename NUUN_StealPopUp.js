/*:-----------------------------------------------------------------------------------
 * NUUN_StealPopUp.js
 * 
 * Copyright (C) 2025 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Steal skill popup
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_PopupEx
 * @base NUUN_StealableItems
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_PopupEx
 * @version 1.0.0
 * 
 * @help
 * popup will be displayed when stealing with "NUUN_StealableItems".
 * The supported version of "NUUN_StealableItems" is Ver.1.5.2 or later.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 3/21/2025 Ver.1.0.0
 * First edition.
 * 
 * @param PopUpSteal
 * @text Pop-up setting when stealing
 * @desc Sets the popup that appears when stealing an item.
 * @default 
 * @type struct<PopUpData>
 * 
 * @param PopUpGoldSteal
 * @text Pop-up settings when stealing money
 * @desc Set the popup that will appear when money is stolen.
 * @default 
 * @type struct<PopUpData>
 * 
 */
/*~struct~PopUpData:
 * 
 * @param PopUpText
 * @desc Popup text. %1: Status name to popup
 * @text Popup Text
 * @type string 
 * @default %1
 * 
 * @param StolenPopUpText
 * @desc Popup text when released or disappeared. %1: Status name to be displayed
 * @text Popup text when released or removed
 * @type string
 * @default %1
 * 
 * @param PopUpWidth
 * @desc Specify the popup message width. (Default: 240)
 * @text Message Width
 * @type number
 * @default 240
 * 
 * @param PopupColor
 * @desc Popup color. (System color or Color Code (Text tab))
 * @text Popup text color
 * @type color
 * @default 0
 * 
 * @param PopupIconIndex
 * @desc The icon ID of the popup.
 * @text Popup Icon ID
 * @type icon
 * @default 0
 * 
 * @param PopupFontSize
 * @desc Font size (difference from main font)
 * @text Font size
 * @type number
 * @default 4
 * @min -99
 * 
 * @param PopupFontFace
 * @desc Specify any font (without extension).
 * @text Text font
 * @type string
 * @default 
 * 
 * @param PopupMode
 * @text Popup plugins to apply
 * @desc Specify the popup plugin to be applied. If no plugin is found, the default will be used.
 * @type combo
 * @option 'Default'
 * @option 'LateralBoundPopUp'
 * @option 'UpFadeoutPopup'
 * @option 'SlideFadeoutPopup'
 * @default 'Default'
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc 盗みスキルのポップアップ
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_PopupEx
 * @base NUUN_StealableItems
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_PopupEx
 * @version 1.0.0
 * 
 * @help
 * NUUN_StealableItemsでの盗み時にポップアップを行います。
 * NUUN_StealableItemsの対応バージョンはVer.1.5.2以降です。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2025/3/21 Ver.1.0.0
 * 初版
 * 
 * @param PopUpSteal
 * @text 盗み時ポップアップ設定
 * @desc アイテム盗み時のポップアップ設定をします。
 * @default 
 * @type struct<PopUpData>
 * 
 * @param PopUpGoldSteal
 * @text お金盗み時ポップアップ設定
 * @desc お金盗み時のポップアップ設定をします。
 * @default 
 * @type struct<PopUpData>
 * 
 * 
 */
/*~struct~PopUpData:ja
 * 
 * @param PopUpText
 * @desc ポップアップテキスト。%1:ポップアップするステータス名
 * @text ポップアップテキスト
 * @type string 
 * @default %1
 * 
 * @param StolenPopUpText
 * @desc 解除時または消失時ポップアップテキスト。%1:ポップアップするステータス名
 * @text 解除時、消失時ポップアップテキスト
 * @type string
 * @default %1
 * 
 * @param PopUpWidth
 * @desc ポップアップメッセージ幅を指定します。（デフォルト240）
 * @text メッセージ幅
 * @type number
 * @default 240
 * 
 * @param PopupColor
 * @desc ポップアップカラー。(システムカラーまたはカラーコード(テキストタブ))
 * @text ポップアップ文字色
 * @type color
 * @default 0
 * 
 * @param PopupIconIndex
 * @desc ポップアップのアイコンID。
 * @text ポップアップアイコンID
 * @type icon
 * @default 0
 * 
 * @param PopupFontSize
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ
 * @type number
 * @default 4
 * @min -99
 * 
 * @param PopupFontFace
 * @desc 任意のフォントを指定します。(拡張子なし)
 * @text テキスト部のフォント
 * @type string
 * @default 
 * 
 * @param PopupMode
 * @text 適用するポップアッププラグイン
 * @desc 適用させるポップアッププラグインを指定をします。プラグインが見つからない場合はデフォルトになります。
 * @type combo
 * @option 'Default'
 * @option 'LateralBoundPopUp'
 * @option 'UpFadeoutPopup'
 * @option 'SlideFadeoutPopup'
 * @default 'Default'
 * 
 */

var Imported = Imported || {};
Imported.NUUN_StealPopUp = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    Window_BattleLog.prototype.stealPopup = function(target, steal) {
        const state = steal.type;
        const popupData = new PopupData(state);
        popupData.setupSteal(target, steal);
        this.setupPopup(target, popupData);
    };

    NuunManager.getStealPopupParams = function() {
        return params.PopUpSteal;
    };

    NuunManager.getStealGoldPopupParams = function() {
        return params.PopUpGoldSteal;
    };

   
})();