/*:-----------------------------------------------------------------------------------
 * NUUN_SkillLearningPopUp.js
 * 
 * Copyright (C) 2025 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Skill Learning Popup
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_PopupEx
 * @base NUUN_SkillLearning
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_PopupEx
 * @version 1.0.0
 * 
 * @help
 * When a skill is acquired through skill learning, a popup will be displayed for the target who has learned the skill.
 * This plugin requires NUUN_PopupEx and NUUN_SkillLearning.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 3/29/2025 Ver.1.0.0
 * First edition.
 * 
 * @param PopUpSkillLearning
 * @text Pop-up setting when acquiring skills
 * @desc Set the popup that appears when acquiring a skill.
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
 * @plugindesc スキルラーニングポップアップ
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_PopupEx
 * @base NUUN_SkillLearning
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_PopupEx
 * @version 1.0.0
 * 
 * @help
 * スキルラーニングでスキル習得時に習得した対象にポップアップを表示させます。
 * このプラグインはNUUN_PopupEx、NUUN_SkillLearningが必要になります。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2025/3/29 Ver.1.0.0
 * 初版
 * 
 * @param PopUpSkillLearning
 * @text スキル習得時ポップアップ設定
 * @desc スキル習得時のポップアップ設定をします。
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
Imported.NUUN_SkillLearningPopUp = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    Window_BattleLog.prototype.displayAffectedSkillLearning = function(target, skills) {
        for (const skill of skills) {
            const popupData = new PopupData("learn");
            popupData.setupSteal(skill.target, skill);
            this.setupPopup(skill.target, popupData);
        }
    };

    NuunManager.getSkillLearningPopupParams = function() {
        return params.PopUpSkillLearning;
    };

    Game_Battler.prototype.shouldPopupSkillLearning = function() {
        return !!this._result.learningSkill;
    };

   
})();