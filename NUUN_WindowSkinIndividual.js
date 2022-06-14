/*:-----------------------------------------------------------------------------------
 * NUUN_WindowSkinIndividual.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc ウィンドウスキン個別設定
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * ウィンドウスキンをウィンドウ毎に設定できます。
 * リストにないクラスは該当するクラスをテキストタブで直接記入してください。
 * 例:Window_Base
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/6/15 Ver.1.0.0
 * 初版
 * 
 * @param WindowSkinIndividual
 * @text クラス毎ウィンドウスキン
 * @desc クラス毎のウィンドウスキンの設定をします。
 * @default []
 * @type struct<WindowSkinList>[]
 * 
 */
/*~struct~WindowSkinList:
 * 
 * @param ClassName
 * @text 変更ウィンドウ設定
 * @desc 変更するウィンドウクラスを指定します。リストにないクラスは直接該当するクラスを記入してください。
 * @type combo
 * @option 'Window_TitleCommand'
 * @option 'Window_Options'
 * @option 'Window_Help'
 * @option 'Window_SavefileList'
 * @option 'Window_MapName'
 * @option 'Window_Message'
 * @option 'Window_ScrollText'
 * @option 'Window_Gold'
 * @option 'Window_NameBox'
 * @option 'Window_ChoiceList'
 * @option 'Window_NumberInput'
 * @option 'Window_EventItem'
 * @option 'Window_MenuCommand'
 * @option 'Window_MenuStatus'
 * @option 'Window_ItemCategory'
 * @option 'Window_ItemList'
 * @option 'Window_MenuActor'
 * @option 'Window_SkillType'
 * @option 'Window_SkillStatus'
 * @option 'Window_SkillList'
 * @option 'Window_MenuActor'
 * @option 'Window_EquipStatus'
 * @option 'Window_EquipCommand'
 * @option 'Window_EquipSlot'
 * @option 'Window_EquipItem'
 * @option 'Window_Status'
 * @option 'Window_StatusParams'
 * @option 'Window_StatusEquip'
 * @option 'Window_GameEnd'
 * @option 'Window_BattleStatus'
 * @option 'Window_PartyCommand'
 * @option 'Window_ActorCommand'
 * @option 'Window_BattleSkill'
 * @option 'Window_BattleItem'
 * @option 'Window_BattleActor'
 * @option 'Window_BattleEnemy'
 * @option 'Window_ShopBuy'
 * @option 'Window_ShopSell'
 * @default
 * 
 * @param WindowSkin
 * @desc ウィンドウスキンを指定します。
 * @text ウィンドウスキン画像
 * @type file
 * @dir img/system
 * @default 
 * 
 * @param WindowColor
 * @text ウィンドウカラー
 * @desc ウィンドウの色の設定をします。
 * @default {"red":"0","green":"0","bule":"0"}
 * @type struct<WindowTone>
 * 
 */
/*~struct~WindowTone:
 * 
 * @param red
 * @desc 赤
 * @text 赤
 * @type number
 * @default 0
 * @max 255
 * @min -255
 * 
 * @param green
 * @text 緑
 * @desc 緑
 * @type number
 * @default 0
 * @max 255
 * @min -255
 * 
 * @param bule
 * @text 青
 * @desc 青
 * @type number
 * @default 0
 * @max 255
 * @min -255
 * 
 */

var Imported = Imported || {};
Imported.NUUN_WindowSkinIndividual = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_WindowSkinIndividual');
    const WindowSkinIndividual = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['WindowSkinIndividual'])) : null) || [];

    const _Window_Base_initialize = Window_Base.prototype.initialize;
    Window_Base.prototype.initialize = function(rect) {
        const className = String(this.constructor.name);
        this._customWindowSkin = WindowSkinIndividual.find(data => data.ClassName === className);
        _Window_Base_initialize.call(this, rect);
    };

    const _Window_Base_loadWindowskin = Window_Base.prototype.loadWindowskin;
    Window_Base.prototype.loadWindowskin = function() {
        if (this._customWindowSkin && this._customWindowSkin.WindowSkin) {
            this.windowskin = ImageManager.loadSystem(this._customWindowSkin.WindowSkin);
        } else {
            _Window_Base_loadWindowskin.call(this);
        }
    };

    const _Window_Base_updateTone = Window_Base.prototype.updateTone;
    Window_Base.prototype.updateTone = function() {
        if (this._customWindowSkin && this._customWindowSkin.windowColor) {
            const tone = this._customWindowSkin.windowColor;
            this.setTone(tone.red, tone.green, tone.bule);
        } else {
            _Window_Base_updateTone.call(this);
        }
    };

})();