/*:-----------------------------------------------------------------------------------
 * NUUN_CustomWindowFrame.js
 * Copyright (C) 2026 NUUN
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Custom Window Frame
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * You can customize window skins and use window images that do not follow the standard RPG Maker format.
 * Window skins and images can be specified for individual windows or scenes.
 * 
 * If neither the target window nor the target scene is specified, the settings will apply to all windows in all scenes.
 * If only the target window is specified, the settings will apply to the specified window class.
 * If only the target scene is specified, the settings will apply to all windows in the specified scene.
 * If both are specified, the settings will apply only to the specified window class in the specified scene.
 * Windows that do not match any of the above conditions will use the window skin specified in the database.
 * Window skins and images applied by this plugin cannot be changed using the "Change Window Color" event command.
 * Use the "Change Window Appearance" plugin command to change these settings.
 * 
 * If the desired class is not listed, enter the class name manually.
 * Example: Window_Base
 * 
 * Plugin Command
 * Change Window Appearance
 * Specify the identifier name or list ID from the Window Settings plugin parameter in Window Settings ID.
 * Changes will only apply to windows that match the conditions of the specified settings.
 * To reset all settings, leave Window Settings ID blank.
 * To reset the window color, clear the Window Color field (Delete key).
 * 
 * Terms of Use
 * Credit: Optional
 * Commercial use: Possible
 * Modifications: Possible
 * Redistribution: Possible
 * Support is not available for modified versions or downloads from sources other than https://github.com/nuun888/MZ, the official forum, or authorized retailers.
 * 
 * Log
 * 10/10/2026 Ver.1.0.0
 * First edition.
 * 
 * 
 * @command ChangeWindowAppearance
 * @text @text Change Window Appearance
 * @desc Changes the window skin, color tone, and frame image of the specified window.
 * 
 * @arg WindowSettingsId
 * @text Window Settings ID
 * @desc Specifies the list ID or identifier name of the window settings to change.
 * @type string
 * @default 
 *  
 * @arg WindowSkin
 * @desc Window Skin Image
 * @desc Specifies the window skin to change. Applies when the frame type is set to "Window Skin".
 * @type file
 * @dir img/system
 * @default 
 * 
 * @arg WindowColor
 * @text Window Color
 * @desc Sets the window color tone. Applies when the frame type is set to "Window Skin".
 * @default 
 * @type struct<WindowTone>
 * 
 * @arg WindowImage
 * @text Window Frame Image
 * @desc Specifies the frame image to change. Applies when the frame type is set to "Image".
 * @type file
 * @dir img/
 * @default
 * 
 * @param WindowImageSettings
 * @text Window Settings
 * @desc Configures the window settings.
 * @default []
 * @type struct<WindowSettingsList>[]
 * 
 */
/*~struct~WindowSettingsList:
 * 
 * @param IdentifierName
 * @text Identifier Name
 * @desc Sets an optional identifier name.
 * @type string
 * @default 
 * 
 * @param ClassName
 * @text Target Window
 * @desc Specifies the window class to apply the settings to.
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
 * @param ClassSceneName
 * @text Target Scene
 * @desc Specifies the scene class to apply the settings to.
 * @type combo
 * @option Scene_Title
 * @option Scene_Map
 * @option Scene_Battle
 * @option Scene_Menu
 * @option Scene_Item
 * @option Scene_Skill
 * @option Scene_Equip
 * @option Scene_Status
 * @option Scene_Save
 * @option Scene_Load
 * @option Scene_Shop
 * @option Scene_Options
 * @option Scene_Name
 * @option Scene_Gameover
 * @option Scene_SkillTree
 * @option Scene_AchievementSystem
 * @option Scene_EnemyBook
 * @option Scene_ItemBook
 * @option Scene_Formation
 * @option Scene_Result
 * @default
 * 
 * @param WindowImageMode
 * @text Window Frame Type
 * @desc Specifies how the window frame is displayed.
 * @type select
 * @option Window Skin
 * @value skin
 * @option Image
 * @value image
 * @default skin
 * 
 * @param WindowSkinSetting
 * @text Window Skin Settings
 * @default ------------------------------
 * 
 * @param WindowSkin
 * @desc Specifies the window skin.
 * @text Window Skin Image
 * @type file
 * @dir img/system
 * @default 
 * @parent WindowSkinSetting
 * 
 * @param WindowColor
 * @text Window Color
 * @desc Sets the window color tone.
 * @default {"red":"0","green":"0","bule":"0"}
 * @type struct<WindowTone>
 * @parent WindowSkinSetting
 * 
 * @param ImageSetting
 * @text Window Image Settings
 * @default ------------------------------
 * 
 * @param WindowImage
 * @text Window Frame Image
 * @desc Specifies the image to display as the window frame.
 * @type file
 * @dir img/
 * @default
 * @parent ImageSetting
 * 
 * @param WindowImageType
 * @text Frame Image Slicing Method
 * @desc Specifies how the window frame image is sliced and scaled.
 * @type select
 * @option Single Image
 * @value default
 * @option 3-Slice Image
 * @value 3slice
 * @option 9-Slice Image
 * @value 9slice
 * @default default
 * @parent ImageSetting
 * 
 */
/*~struct~WindowTone:
 * 
 * @param red
 * @desc Red
 * @text Red
 * @type number
 * @default 0
 * @max 255
 * @min -255
 *
 * @param green
 * @text Green
 * @desc Green
 * @type number
 * @default 0
 * @max 255
 * @min -255
 *
 * @param bule
 * @text Blue
 * @desc Blue
 * @type number
 * @default 0
 * @max 255
 * @min -255
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc カスタムウィンドウフレーム
 * @author NUUN
 * @version 1.0.0
 * 
 * @help
 * ウィンドウのスキンやツクール規格以外のウィンドウ画像を設定できます。
 * ウィンドウスキンやウィンドウ画像はウィンドウ毎またはシーン毎に指定できます。
 * 
 * 適用ウィンドウ設定と適用シーン設定がどちらも未指定の場合、すべてのシーンのすべてのウィンドウに適用されます。
 * 適用ウィンドウ設定のみ指定した場合、指定したウィンドウクラスに適用されます。
 * 適用シーン設定のみ指定した場合、指定したシーン内のすべてのウィンドウに適用されます。
 * 両方を指定した場合、指定したシーン内の指定したウィンドウクラスにのみ適用されます。
 * 上記の何れかの条件に当てはまらない場合はデータベースのウィンドウスキンが表示されます。
 * このプラグインで適用したウィンドウスキン及びウィンドウ画像はイベントコマンドのウィンドウカラーの変更での変更は行えません。
 * プラグインコマンドのウィンドウ、ウィンドウカラーの変更で変更を行ってください。
 * 
 * リストにないクラスは該当するクラスを直接記入してください。
 * 例:Window_Base
 * 
 * プラグインコマンド
 * ウィンドウ、ウィンドウカラーの変更
 * ウィンドウ設定IDにプラグインパラメータのウィンドウ設定の識別名またはリストIDを指定してください。
 * 変更対象は指定した設定の条件に一致したウィンドウのみ適用されます。
 * 初期化を行う場合はウィンドウ設定IDを空白にしてください。
 * ウィンドウカラーの初期化を行う場合はウィンドウカラーを空白(Deleteキー)にしてください。
 * 
 * 利用規約
 * クレジット表記：任意
 * 商業利用：可能
 * 改変：可能
 * 再配布：可能
 * ※https://github.com/nuun888/MZ、公式フォーラム、正規販売サイト以外からのダウンロード、改変済みの場合はサポートは対象外となります。
 * 
 * 更新履歴
 * 2026/10/10 Ver.1.0.0
 * 初版
 * 
 * 
 * @command ChangeWindowAppearance
 * @text ウィンドウ、ウィンドウカラーの変更
 * @desc 指定したウィンドウのスキン、色調、フレーム画像を変更します。
 * 
 * @arg WindowSettingsId
 * @text ウィンドウ設定ID
 * @desc 変更するウィンドウ設定のリストIDまたは識別名を指定します。
 * @type string
 * @default 
 *  
 * @arg WindowSkin
 * @desc 変更するウィンドウスキンを指定します。フレームタイプが「ウィンドウスキン」の場合に適用されます。
 * @text ウィンドウスキン画像
 * @type file
 * @dir img/system
 * @default 
 * 
 * @arg WindowColor
 * @text ウィンドウカラー
 * @desc 変更するウィンドウの色調を設定します。フレームタイプが「ウィンドウスキン」の場合に適用されます。
 * @default 
 * @type struct<WindowTone>
 * 
 * @arg WindowImage
 * @text ウィンドウフレーム画像
 * @desc 変更するフレーム画像を指定します。フレームタイプが「画像」の場合に適用されます。
 * @type file
 * @dir img/
 * @default
 * 
 * @param WindowImageSettings
 * @text ウィンドウ設定
 * @desc ウィンドウの設定をします。
 * @default []
 * @type struct<WindowSettingsList>[]
 * 
 */
/*~struct~WindowSettingsList:ja
 * 
 * @param IdentifierName
 * @text 識別名
 * @desc 任意の識別名を設定します。
 * @type string
 * @default 
 * 
 * @param ClassName
 * @text 適用ウィンドウ設定
 * @desc 適用するウィンドウクラスを指定します。
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
 * @param ClassSceneName
 * @text 適用シーン設定
 * @desc 適用するシーンクラスを指定します。
 * @type combo
 * @option Scene_Title
 * @option Scene_Map
 * @option Scene_Battle
 * @option Scene_Menu
 * @option Scene_Item
 * @option Scene_Skill
 * @option Scene_Equip
 * @option Scene_Status
 * @option Scene_Save
 * @option Scene_Load
 * @option Scene_Shop
 * @option Scene_Options
 * @option Scene_Name
 * @option Scene_Gameover
 * @option Scene_SkillTree
 * @option Scene_AchievementSystem
 * @option Scene_EnemyBook
 * @option Scene_ItemBook
 * @option Scene_Formation
 * @option Scene_Result
 * @default
 * 
 * @param WindowImageMode
 * @text ウィンドウフレームタイプ
 * @desc ウィンドウフレームの表示方法を指定します。
 * @type select
 * @option ウィンドウスキン
 * @value skin
 * @option 画像
 * @value image
 * @default skin
 * 
 * @param WindowSkinSetting
 * @text ウィンドウスキン設定
 * @default ------------------------------
 * 
 * @param WindowSkin
 * @desc ウィンドウスキンを指定します。
 * @text ウィンドウスキン画像
 * @type file
 * @dir img/system
 * @default 
 * @parent WindowSkinSetting
 * 
 * @param WindowColor
 * @text ウィンドウカラー
 * @desc ウィンドウの色調を設定します。
 * @default {"red":"0","green":"0","bule":"0"}
 * @type struct<WindowTone>
 * @parent WindowSkinSetting
 * 
 * @param ImageSetting
 * @text ウィンドウ画像設定
 * @default ------------------------------
 * 
 * @param WindowImage
 * @text ウィンドウフレーム画像
 * @desc ウィンドウフレームとして表示する画像を指定します。
 * @type file
 * @dir img/
 * @default
 * @parent ImageSetting
 * 
 * @param WindowImageType
 * @text フレーム画像の分割方式
 * @desc  ウィンドウフレーム画像の分割・拡縮方式を指定します。
 * @type select
 * @option 一枚画像
 * @value default
 * @option 3スライス画像
 * @value 3slice
 * @option 9スライス画像
 * @value 9slice
 * @default default
 * @parent ImageSetting
 * 
 */
/*~struct~WindowTone:ja
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
Imported.NUUN_CustomWindowFrame = true;

(() => {
    class Nuun_PluginParams_CustomWindowFrame {
        static getPluginParams(text) {//document.currentScript
            try {
                const name = String(Utils.extractFileName(text.src).split('.').shift());
                const params = PluginManager.parameters(name);
                if (params) {
                    const pluginParam = new Nuun_PluginParamData(params);
                    pluginParam.setPluginName(name);
                    return pluginParam.getParameters();
                }
                return {pluginName: name};
            } catch (error) {
                const log = ($gameSystem.isJapanese() ? "コアスクリプトをVer.1.3.2以降に更新してください。" : "Please update the core script to version 1.3.2 or later.");
                throw ["ParameterError", log];
            }
        }
    };

    window.Nuun_PluginParams_CustomWindowFrame = Nuun_PluginParams_CustomWindowFrame;

    class Nuun_PluginParamData {
        constructor(text) {
            this._parameters = JSON.parse(JSON.stringify(text, this._convertParams)) || {};
        }

        _convertParams(key, code) {
            try {
                return JSON.parse(code);
            } catch (e) {
                if (isNaN(code)) {
                    if (!code) {
                        return null;
                    }
                    try {
                        if (code.indexOf("'") === 0 || code.indexOf('"') === 0) {
                            return eval(code);//'または"を外す。
                        }
                        return !!code ? String(code) : null;
                    } catch (e) {
                        if (typeof {} === "object") {
                            return code;
                        }
                        return !!code ? String(code) : null;
                    }
                } else {
                    return String(code);
                }
            }
        }

        getParameters() {
            return this._parameters;
        }

        setPluginName(name) {
            this._parameters.pluginName = name;
        }


        getMetaTag(object, code) {
            const data = object.meta[code];
            let list = [];
            if (data !== undefined) {
                try {
                    list = data.split(',');
                } catch (error) {
                    return this.getTextCodeMeta(data);
                }
                list.forEach(a => {
                    a = this.getTextCodeMeta(a);
                });
                return list;
            } else {
                return undefined;
            }
        }

        getTextCodeMeta(text) {
            if (isNaN(text)) {
                return text;
            } else {
                return Number(text);
            }
        }
    };

    const params = Nuun_PluginParams_CustomWindowFrame.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;

    PluginManager.registerCommand(pluginName, 'ChangeWindowAppearance', args => {
        if (!String(args.WindowSettingsId)) {
            $gameSystem.customWindowFrame = {};
            return;
        }
        const customWindowFrame = {};
        customWindowFrame.WindowSkin = String(args.WindowSkin);
        customWindowFrame.WindowImage = String(args.WindowImage);
        const windowColor = NuunCustomWindowFrameManager.structureData(args.WindowColor);
        customWindowFrame.WindowColor = !!windowColor ? windowColor : null;
        if (!!customWindowFrame.WindowSkin) {
            ImageManager.loadSystem(customWindowFrame.WindowSkin);
        }
        if (!!customWindowFrame.WindowImage) {
            NuunCustomWindowFrameManager.LoadPictures(customWindowFrame.WindowImage);
        }
        $gameSystem.setCustomWindowFrame(String(args.WindowSettingsId), customWindowFrame);
    });


    function NuunCustomWindowFrameManager() {
        throw new Error("This is a static class");
    }

    window.NuunCustomWindowFrameManager = NuunCustomWindowFrameManager;

    NuunCustomWindowFrameManager.scene = null;

    NuunCustomWindowFrameManager.structureData = function(params){
        return JSON.parse(JSON.stringify(params, function(key, value) {
            try {
                return JSON.parse(value);
            } catch (e) {
                return NuunCustomWindowFrameManager.getEvalCode(value);
            }
        }));
    };

    NuunCustomWindowFrameManager.getEvalCode = function(code) {
        if (isNaN(code)) {
            if (!code) {
                return null;
            }
            return this.stringCode(code);
        } else {
            return String(code);
        }
    };

    NuunCustomWindowFrameManager.stringCode = function(code){
        try {
            if (code.indexOf("'") === 0 || code.indexOf('"') === 0) {
                return eval(code);//'または"を外す。
            }
            return !!code ? String(code) : null;
        } catch (e) {
            return code;
        }
    };

    NuunCustomWindowFrameManager.LoadPictures = function(filename) {
        return ImageManager.loadBitmap("img/", filename);
    };

    NuunCustomWindowFrameManager.windowCustomWindowFrameParams = function(code) {
        switch (code) {
            case 0:
                return params.WindowImageSettings || [];
        }
    };

    NuunCustomWindowFrameManager.getWindowImageSettingsId = function(id) {
        if (isNaN(id)) {
            return this.windowCustomWindowFrameParams(0).findIndex(data => data.IdentifierName === id);
        } else {
            return Number(id) - 1;
        }
    };

    
    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.apply(this, arguments);
        this.customWindowFrame = {};
    };

    Game_System.prototype.setCustomWindowFrame = function(method, data) {
        if (!this.customWindowFrame) {
            this.customWindowFrame = {};
        }
        this.customWindowFrame[method] = data;
    };

    Game_System.prototype.getCustomWindowFrame = function(method) {
        if (!this.customWindowFrame) return null;
        return this.customWindowFrame[method];
    };


    const _Scene_Base_initialize = Scene_Base.prototype.initialize;
    Scene_Base.prototype.initialize = function() {
        _Scene_Base_initialize.apply(this, arguments);
        NuunCustomWindowFrameManager.scene = String(this.constructor.name);
        this.nuun_loadWindowImage();
    };

    Scene_Base.prototype.nuun_loadWindowImage = function() {
        for (const data of NuunCustomWindowFrameManager.windowCustomWindowFrameParams(0)) {
            if (!data) continue;
            if (data.WindowImageMode === "skin") {
                ImageManager.loadSystem(data.WindowSkin);
            } else {
                NuunCustomWindowFrameManager.LoadPictures(data.WindowImage);
            }
        }
    };

    const _Window_createFrameSprite = Window.prototype._createFrameSprite;
    Window.prototype._createFrameSprite = function() {
        if (!!this._skinData && this._skinData.WindowImageMode === "image") {
            this._frameSprite = new Sprite();
            const count = this.frameSpriteWindowImageCount();
            for (let i = 0; i < count; i++) {
                this._frameSprite.addChild(new Sprite());
            }
            this._container.addChild(this._frameSprite);
        } else {
            _Window_createFrameSprite.apply(this, arguments);//ウィンドウスキン
        }
    };

    Window.prototype.frameSpriteWindowImageCount = function() {
        switch (this._skinData.WindowImageType) {
            case "3slice":
                return 3;
            case "9slice":
                return 9;
            default:
                return 1;
        }
    };

    const _Window_Base_initialize = Window_Base.prototype.initialize;
    Window_Base.prototype.initialize = function(rect) {
        this.customWindowFrame = null;
        this.nuun_SetupWindowSkin();
        _Window_Base_initialize.apply(this, arguments);
    };

    Window_Base.prototype.nuun_SetupWindowSkin = function() {
        this._skinData = null;
        const className = String(this.constructor.name);
        const index = NuunCustomWindowFrameManager.windowCustomWindowFrameParams(0).findIndex(data => {
            return !!data && (!data.ClassName || className === data.ClassName) && (!data.ClassSceneName || NuunCustomWindowFrameManager.scene === data.ClassSceneName);
        });
        const data = NuunCustomWindowFrameManager.windowCustomWindowFrameParams(0)[index];
        if (!data) return;
        this._skinData = data;
        const method = data.IdentifierName ? data.IdentifierName : String(index + 1);
        const customWindowFrame = $gameSystem.getCustomWindowFrame(method);
        if (!!customWindowFrame) {
            this.customWindowFrame = customWindowFrame;
        }
        this.loadWindowImage();
    };

    const _Window_Base_loadWindowskin = Window_Base.prototype.loadWindowskin;
    Window_Base.prototype.loadWindowskin = function() {
        _Window_Base_loadWindowskin.apply(this, arguments);
        if (!!this._skinData) {
            if (this._skinData.WindowImageMode === "skin" && !!this._skinData.WindowSkin) {
                const windowSkin = this.customWindowFrame && !!this.customWindowFrame.WindowSkin ? this.customWindowFrame.WindowSkin : this._skinData.WindowSkin;
                this.windowskin = ImageManager.loadSystem(windowSkin);
            }
        } 
    };

    Window_Base.prototype.loadWindowImage = function() {
        if (!!this._skinData && this._skinData.WindowImageMode === "image") {
            const windowImage = this.customWindowFrame && !!this.customWindowFrame.WindowImage ? this.customWindowFrame.WindowImage : this._skinData.WindowImage;
            this.windowImage = NuunCustomWindowFrameManager.LoadPictures(windowImage);
        }
    };
    
    const _Window_Base_updateTone = Window_Base.prototype.updateTone;
    Window_Base.prototype.updateTone = function() {
        if (!!this._skinData && this._skinData.WindowColor) {
            const windowColor = this.customWindowFrame && !!this.customWindowFrame.WindowColor ? this.customWindowFrame.WindowColor : this._skinData.WindowColor;
            const tone = windowColor;
            this.setTone(tone.red, tone.green, tone.bule);
        } else {
            _Window_Base_updateTone.apply(this, arguments);
        }
    };

    const _Window_refreshBack = Window.prototype._refreshBack;
    Window.prototype._refreshBack = function() {
        if (!!this._skinData && !!this.windowImage) return;
        _Window_refreshBack.apply(this, arguments);
    };

    const _Window_refreshFrame = Window.prototype._refreshFrame;
    Window.prototype._refreshFrame = function() {
        if (!!this._skinData && !!this.windowImage) {
            const drect = { x: 0, y: 0, width: this._width, height: this._height };
            const srect = { x: 0, y: 0, width: this.windowImage.width, height: this.windowImage.height };
            for (const child of this._frameSprite.children) {
                child.bitmap = this.windowImage;
            }
            switch (this._skinData.WindowImageType) {
                case "default":
                    this._setRectParts1slice(this.windowImage, srect, drect);
                    break;
                case "3slice":
                    this._setRectParts3slice(this.windowImage, srect, drect);
                    break;
                case "9slice":
                    this._setRectParts9slice(this.windowImage, srect, drect);
                    break;
            }
        } else {
            _Window_refreshFrame.apply(this, arguments);
        }
    };

    Window_Base.prototype._setRectParts1slice = function(bitmap, srect, drect) {
        const sprite = this._frameSprite;
        const children = sprite.children;
        const sx = srect.x;
        const sy = srect.y;
        const sw = srect.width;
        const sh = srect.height;
        const dx = drect.x;
        const dy = drect.y;
        const dw = drect.width;
        const dh = drect.height;
        sprite.setFrame(0, 0, dw, dh);
        sprite.move(dx, dy);
        children[0].bitmap = bitmap;
        children[0].setFrame(sx, sy, sw, sh);
        children[0].move(0, 0);
        children[0].visible = dw > 0 && dh > 0;
    };

    Window_Base.prototype._setRectParts3slice = function(bitmap, srect, drect) {
        const sprite = this._frameSprite;
        const children = sprite.children;
        const sx = srect.x;
        const sy = srect.y;
        const sw = srect.width;
        const sh = srect.height;
        const dx = drect.x;
        const dy = drect.y;
        const dw = drect.width;
        const dh = drect.height;
        const m = sw / 3;
        const smw = sw - m * 2;
        const dmw = dw - m * 2;
        sprite.setFrame(0, 0, dw, dh);
        sprite.move(dx, dy);
        children[0].setFrame(sx, sy, m, sh);
        children[0].move(0, 0);
        children[1].setFrame(sx + m, sy, smw, sh);
        children[1].move(m, 0);
        children[1].scale.x = dmw / smw;
        children[1].scale.y = 1;
        children[2].setFrame(sx + sw - m, sy, m, sh);
        children[2].move(dw - m, 0);
        for (const child of children) {
            child.visible = dw > 0 && dh > 0;
        }
    };

    Window_Base.prototype._setRectParts9slice = function(bitmap, srect, drect) {
        const sprite = this._frameSprite;
        const children = sprite.children;
        const sx = srect.x;
        const sy = srect.y;
        const sw = srect.width;
        const sh = srect.height;
        const dx = drect.x;
        const dy = drect.y;
        const dw = drect.width;
        const dh = drect.height;
        const mw = sw / 3;
        const mh = sh / 3;
        const smw = sw - mw * 2;
        const smh = sh - mh * 2;
        const dmw = dw - mw * 2;
        const dmh = dh - mh * 2;
        sprite.setFrame(0, 0, dw, dh);
        sprite.move(dx, dy);
        children[0].setFrame(sx, sy, mw, mh);
        children[0].move(0, 0);
        children[2].setFrame(sx + sw - mw, sy, mw, mh);
        children[2].move(dw - mw, 0);
        children[6].setFrame(sx, sy + sh - mh, mw, mh);
        children[6].move(0, dh - mh);
        children[8].setFrame(sx + sw - mw, sy + sh - mh, mw, mh);
        children[8].move(dw - mw, dh - mh);
        children[1].setFrame(sx + mw, sy, smw, mh);
        children[1].move(mw, 0);
        children[1].scale.x = dmw / smw;
        children[3].setFrame(sx, sy + mh, mw, smh);
        children[3].move(0, mh);
        children[3].scale.y = dmh / smh;
        children[5].setFrame(sx + sw - mw, sy + mh, mw, smh);
        children[5].move(dw - mw, mh);
        children[5].scale.y = dmh / smh;
        children[7].setFrame(sx + mw, sy + sh - mh, smw, mh);
        children[7].move(mw, dh - mh);
        children[7].scale.x = dmw / smw;
        children[4].setFrame(sx + mw, sy + mh, smw, smh);
        children[4].move(mw, mh);
        children[4].scale.x = dmw / smw;
        children[4].scale.y = dmh / smh;
        for (const child of children) {
            child.visible = dw > 0 && dh > 0;
        }
    };


})();