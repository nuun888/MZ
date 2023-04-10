/*:-----------------------------------------------------------------------------------
 * NUUN_ContentsBackVisible.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Hide content background
 * @author NUUN
 * @version 1.1.2
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * I want to hide the content background (black background).
 * 
 * "Content background class setting" sets only the applicable window when "Hide content background" is OFF.
 * Specifies the class name of the window that is not applied when ON.
 * 
 * When specifying an arbitrary image for the content background with other plug-ins, do not apply the content background hide of the corresponding class.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 4/10/2022 Ver.1.1.2
 * Added processing of class specification by identification name specification.
 * 11/12/2022 Ver.1.1.1
 * Changed the display in languages other than Japanese to English.
 * 5/15/2022 Ver.1.1.0
 * Changed specification of applicable class.
 * Changed to reduce the line height when the content background is hidden.
 * 12/30/2021 Ver.1.0.0
 * first edition.
 * 
 * @param BackVisible
 * @text Hide content background
 * @desc Do not display the content background.
 * @type boolean
 * @default true
 * 
 * @param BackVisibleClass
 * @text Content background class setting
 * @desc Specifies the class (distinguished name) for applying or disabling the content background.
 * @type combo[]
 * @option 'Window_TitleCommand'
 * @option 'Window_Options'
 * @option 'Window_SavefileList'
 * @option 'Window_MenuCommand'
 * @option 'Window_MenuStatus'
 * @option 'Window_MenuActor'
 * @option 'Window_ItemCategory'
 * @option 'Window_ItemList'
 * @option 'Window_SkillType'
 * @option 'Window_SkillList'
 * @option 'Window_EquipCommand'
 * @option 'Window_EquipSlot'
 * @option 'Window_EquipItem'
 * @option 'Window_GameEnd'
 * @option 'Window_ShopCommand'
 * @option 'Window_ShopBuy'
 * @option 'Window_ShopSell'
 * @option 'Window_NumberInput'
 * @option 'Window_EventItem'
 * @option 'Window_ChoiceList'
 * @option 'Window_NameInput'
 * @option 'Window_BattleStatus'
 * @option 'Window_PartyCommand'
 * @option 'Window_ActorCommand'
 * @option 'Window_BattleSkill'
 * @option 'Window_BattleItem'
 * @option 'Window_BattleActor'
 * @option 'Window_BattleEnemy'
 * @option 'Window_BattleActorImges'
 * @option 'Window_BattleActorStatus'
 * @default ["'Window_SavefileList'","'Window_BattleStatus'","'Window_BattleActorImges'","'Window_BattleActorStatus'"]
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc コンテンツ背景非表示
 * @author NUUN
 * @version 1.1.2
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * コンテンツの背景（黒い背景）を表示しないようにします。
 * 
 * コンテンツ背景クラス設定はコンテンツ背景非表示がOFFの時は適用するウィンドウのみ設定します。
 * ONの時は適用しないウィンドウのクラス名を指定します。
 * 
 * 他のプラグインでコンテンツ背景に任意の画像を指定する場合、該当のクラスのコンテンツ背景非表示を適用しないようにしてください。
 * 
 * 更新履歴
 * 2022/4/10 Ver.1.1.2
 * 識別名指定によるクラス指定の処理を追加。
 * 2022/11/12 Ver.1.1.1
 * 日本語以外での表示を英語表示に変更。
 * 2022/5/15 Ver.1.1.0
 * 適用クラスの指定の仕様を変更。
 * コンテンツ背景非表示の時に行の高さを詰めるように変更。
 * 2021/12/30 Ver.1.0.0
 * 初版
 * 
 * @param BackVisible
 * @text コンテンツ背景非表示
 * @desc コンテンツ背景を表示しません。
 * @type boolean
 * @default true
 * 
 * @param BackVisibleClass
 * @text コンテンツ背景クラス設定
 * @desc コンテンツ背景の適用または無効のクラス(識別名)の指定をします。
 * @type combo[]
 * @option 'Window_TitleCommand'
 * @option 'Window_Options'
 * @option 'Window_SavefileList'
 * @option 'Window_MenuCommand'
 * @option 'Window_MenuStatus'
 * @option 'Window_MenuActor'
 * @option 'Window_ItemCategory'
 * @option 'Window_ItemList'
 * @option 'Window_SkillType'
 * @option 'Window_SkillList'
 * @option 'Window_EquipCommand'
 * @option 'Window_EquipSlot'
 * @option 'Window_EquipItem'
 * @option 'Window_GameEnd'
 * @option 'Window_ShopCommand'
 * @option 'Window_ShopBuy'
 * @option 'Window_ShopSell'
 * @option 'Window_NumberInput'
 * @option 'Window_EventItem'
 * @option 'Window_ChoiceList'
 * @option 'Window_NameInput'
 * @option 'Window_BattleStatus'
 * @option 'Window_PartyCommand'
 * @option 'Window_ActorCommand'
 * @option 'Window_BattleSkill'
 * @option 'Window_BattleItem'
 * @option 'Window_BattleActor'
 * @option 'Window_BattleEnemy'
 * @option 'Window_BattleActorImges'
 * @option 'Window_BattleActorStatus'
 * @default ["'Window_SavefileList'","'Window_BattleStatus'","'Window_BattleActorImges'","'Window_BattleActorStatus'"]
 * 
 */
var Imported = Imported || {};
Imported.NUUN_ContentsBackVisible = true;

(() => {
const parameters = PluginManager.parameters('NUUN_ContentsBackVisible');
const BackVisibleClass = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['BackVisibleClass'])) : null) || [];
const BackVisible = eval(parameters['BackVisible'] || 'true');
//const ItemHeightAdjust = eval(parameters['ItemHeightAdjust'] || 'false');
const ItemHeightAdjust = false;

function getContentsBackClass(thisClass) {
    return BackVisibleClass.some(_calss => _calss === thisClass);
}

const _Window_Selectable_initialize = Window_Selectable.prototype.initialize;
Window_Selectable.prototype.initialize = function(rect) {
    this._contentsBackVisible = this.isContentsBack();
    _Window_Selectable_initialize.call(this, rect);
};

Window_Selectable.prototype.isContentsBack = function() {
    let thisClass = null;
    try {
        thisClass = NuunManager.isFilterClass(this);
    } catch (error) {
        thisClass = String(this.constructor.name);
    }
    if (BackVisible) {//表示しない場合
        return !getContentsBackClass(thisClass);//除外
    } else {//表示する場合
        return getContentsBackClass(thisClass);//適用
    }
};

const _Window_Selectable_itemHeight = Window_Selectable.prototype.itemHeight;
Window_Selectable.prototype.itemHeight = function() {
    return ItemHeightAdjust && this.isContentsBack() ? Window_Scrollable.prototype.itemHeight.call(this) : _Window_Selectable_itemHeight.call(this);
};

const _Window_Selectable_itemRect = Window_Selectable.prototype.itemRect;
Window_Selectable.prototype.itemRect = function(index) {
    const rect = _Window_Selectable_itemRect.call(this, index);
    if (ItemHeightAdjust && this.isContentsBack()) {
        const maxCols = this.maxCols();
        const row = Math.floor(index / maxCols);
        rect.y = row * this.itemHeight() - this.scrollBaseY();
        rect.height += this.rowSpacing();
    }
    return rect;
};

const _Window_NameInput_itemRect = Window_NameInput.prototype.itemRect;
Window_NameInput.prototype.itemRect = function(index) {
    const rect = _Window_NameInput_itemRect.call(this, index);
    if (ItemHeightAdjust && this.isContentsBack()) {
        rect.y = Math.floor(index / 10) * this.itemHeight();
        rect.height += this.rowSpacing();
    }
    return rect;
};

const _Window_Selectable_fittingHeight = Window_Selectable.prototype.fittingHeight;
Window_Selectable.prototype.fittingHeight = function(numLines) {
    return ItemHeightAdjust && this._contentsBackVisible ? (numLines * this.lineHeight() + $gameSystem.windowPadding() * 2) : _Window_Selectable_fittingHeight.call(this, numLines);
};

})();