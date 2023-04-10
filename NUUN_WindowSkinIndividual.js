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
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.0.1
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
 * 2022/4/10 Ver.1.0.1
 * 識別名指定によるクラス指定の処理を追加。
 * 2022/6/15 Ver.1.0.0
 * 初版
 * 
 * @param WindowSkinIndividual
 * @text クラス毎ウィンドウスキン
 * @desc クラス毎のウィンドウスキンの設定をします。
 * @default []
 * @type struct<WindowSkinList>[]
 * 
 * 
 * @param StatusHelp
 * @text ステータスヘルウィンドウスキン設定
 * @default ------------------------------
 * 
 * @param StatusHelpWindowSkin
 * @desc ステータスヘルプウィンドウスキンを指定します。
 * @text ステータスヘルウィンドウスキン画像
 * @type file
 * @dir img/system
 * @default 
 * @parent StatusHelp
 * 
 * @param StatusHelpWindowColor
 * @text ステータスヘルウィンドウカラー
 * @desc ステータスヘルウィンドウの色の設定をします。
 * @default {"red":"0","green":"0","bule":"0"}
 * @type struct<WindowTone>
 * @parent StatusHelp
 * 
 * @param SaveHelp
 * @text セーブヘルウィンドウスキン設定
 * @default ------------------------------
 * 
 * @param SaveHelpWindowSkin
 * @desc セーブヘルプウィンドウスキンを指定します。
 * @text セーブヘルウィンドウスキン画像
 * @type file
 * @dir img/system
 * @default 
 * @parent SaveHelp
 * 
 * @param SaveHelpWindowColor
 * @text セーブヘルウィンドウカラー
 * @desc セーブヘルウィンドウの色の設定をします。
 * @default {"red":"0","green":"0","bule":"0"}
 * @type struct<WindowTone>
 * @parent SaveHelp
 * 
 * @param ItemHelp
 * @text アイテムヘルウィンドウスキン設定
 * @default ------------------------------
 * 
 * @param ItemHelpWindowSkin
 * @desc セーブヘルプウィンドウスキンを指定します。
 * @text セーブヘルウィンドウスキン画像
 * @type file
 * @dir img/system
 * @default 
 * @parent ItemHelp
 * 
 * @param ItemHelpWindowColor
 * @text セーブヘルウィンドウカラー
 * @desc セーブヘルウィンドウの色の設定をします。
 * @default {"red":"0","green":"0","bule":"0"}
 * @type struct<WindowTone>
 * @parent ItemHelp
 * 
 * @param SkillHelp
 * @text スキルヘルウィンドウスキン設定
 * @default ------------------------------
 * 
 * @param SkillHelpWindowSkin
 * @desc セーブヘルプウィンドウスキンを指定します。
 * @text セーブヘルウィンドウスキン画像
 * @type file
 * @dir img/system
 * @default 
 * @parent SkillHelp
 * 
 * @param SkillHelpWindowColor
 * @text セーブヘルウィンドウカラー
 * @desc セーブヘルウィンドウの色の設定をします。
 * @default {"red":"0","green":"0","bule":"0"}
 * @type struct<WindowTone>
 * @parent SkillHelp
 * 
 * @param EquiplHelp
 * @text 装備ヘルウィンドウスキン設定
 * @default ------------------------------
 * 
 * @param EquipHelpWindowSkin
 * @desc 装備ヘルプウィンドウスキンを指定します。
 * @text 装備ヘルウィンドウスキン画像
 * @type file
 * @dir img/system
 * @default 
 * @parent EquipHelp
 * 
 * @param EquipHelpWindowColor
 * @text 装備ヘルウィンドウカラー
 * @desc 装備ヘルウィンドウの色の設定をします。
 * @default {"red":"0","green":"0","bule":"0"}
 * @type struct<WindowTone>
 * @parent EquipHelp
 * 
 */
/*~struct~WindowSkinList:
 * 
 * @param ClassName
 * @text 変更ウィンドウ設定
 * @desc 変更するウィンドウクラス(識別名)を指定します。リストにないクラスは直接該当するクラスを記入してください。
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
    let sceneSkinMode = null;

    const _Window_Base_initialize = Window_Base.prototype.initialize;
    Window_Base.prototype.initialize = function(rect) {
        let className = null;
        try {
            className = NuunManager.isFilterClass(this);
        } catch (error) {
            className = String(this.constructor.name);
        }
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

    const _Window_Help_initialize = Window_Help.prototype.initialize;
    Window_Help.prototype.initialize = function(rect) {
        _Window_Help_initialize .call(this, rect);
        this._skinTone = getTone();
    };

    Window_Help.prototype.loadWindowskin = function() {
        if (sceneSkinMode) {
            this.windowskin = ImageManager.loadSystem(getSkin());
        } else {
            Window_Base.prototype.loadWindowskin.call(this);
        }
    };


    const _Window_Base_updateTone = Window_Base.prototype.updateTone;
    Window_Base.prototype.updateTone = function() {
        if (this._customWindowSkin && this._customWindowSkin.windowColor) {
            const tone = this._skinTone ? this._skinTone : this._customWindowSkin.windowColor;
            this.setTone(tone.red, tone.green, tone.bule);
        } else {
            _Window_Base_updateTone.call(this);
        }
    };


    const _Scene_Status_createProfileWindow = Scene_Status.prototype.createProfileWindow;
    Scene_Status.prototype.createProfileWindow = function() {
        sceneSkinMode = 'status';
        _Scene_Status_createProfileWindow.call(this);
        sceneSkinMode = null;
    };

    const _Scene_File_createHelpWindow = Scene_File.prototype.createHelpWindow;
    Scene_File.prototype.createHelpWindow = function() {
        sceneSkinMode = 'save';
        _Scene_File_createHelpWindow.call(this, rect);
        sceneSkinMode = null;
    };

    const _Scene_MenuBase_createHelpWindow = Scene_MenuBase.prototype.createHelpWindow;
    Scene_MenuBase.prototype.createHelpWindow = function() {
        sceneSkinMode = this.getSceneSkinMode();
        _Scene_MenuBase_createHelpWindow .call(this);
        sceneSkinMode = null;
    };

    Scene_MenuBase.prototype.getSceneSkinMode = function() {
        const className = String(this.constructor.name);
        switch (className) {
            case 'Scene_Item':
                return 'item'
            case 'Scene_Skill':
                return 'skill'
            case 'Scene_Equip':
                return 'equip' 
            default:
                return null;
        }
    };

    function getSkin() {
        switch (sceneSkinMode) {
            case 'status':
                return StatusHelpWindowSkin;
            case 'save':
                return SaveHelpWindowSkin;
            case 'item':
                return ItemHelpWindowSkin;
            case 'skill':
                return SkillHelpWindowSkin;
            case 'equip':
                return EquipHelpWindowSkin;
            default:
                return null;
        }
    };

    function getTone() {
        switch (sceneSkinMode) {
            case 'status':
                return StatusHelpWindowColor;
            case 'save':
                return SaveHelpWindowColor;
            case 'item':
                return ItemHelpWindowColor;
            case 'skill':
                return SkillHelpWindowColor;
            case 'equip':
                return EquipHelpWindowColor;
            default:
                return null;
        }
    };

})();