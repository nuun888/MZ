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
 * @plugindesc コンテンツ背景非表示
 * @author NUUN
 * @version 1.0.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * コンテンツの背景を表示しないようにします。
 * コンテンツ背景クラス設定はコンテンツ背景非表示がOFFの時に適用します。
 * 
 * 
 * 更新履歴
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
 * @desc コンテンツ背景の表示をさせないクラスを指定します。リストにないクラスの場合、直接記入してください。(複数指定可)
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
 * @default
 * 
 */
var Imported = Imported || {};
Imported.NUUN_ContentsBackVisible = true;

(() => {
const parameters = PluginManager.parameters('NUUN_ContentsBackVisible');
const BackVisibleClass = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['BackVisibleClass'])) : null) || [];
const BackVisible = eval(parameters['BackVisible'] || 'true');

const _Window_Selectable_initialize = Window_Selectable.prototype.initialize;
Window_Selectable.prototype.initialize = function(rect) {
    _Window_Selectable_initialize.call(this, rect);
    const thisClass = String(this.constructor.name);
    this._contentsBackVisible = BackVisible || BackVisibleClass.some(_calss => _calss === thisClass);
};

})();