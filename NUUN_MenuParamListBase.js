/*:-----------------------------------------------------------------------------------
 * NUUN_MenuParamListBase.js
 * 
 * Copyright (C) 2024 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Status item base plugin
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.1.5
 * 
 * @help
 * This is the base plugin for plugins that customize menu screens.
 * Please set it above a compatible plugin.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 9/28/2024 Ver.1.1.5
 * Processing fixes.
 * Fixed an issue where the EXP gauge width setting was not working.
 * 9/22/2024 Ver.1.1.4
 * Fixed an issue where an error would occur when selecting free text in the description field.
 * 9/8/2024 Ver.1.1.3
 * Fixed an issue where the description field was not working.
 * Fixed an issue where arbitrary evaluation expressions were not working in dynamic parameters.
 * Added definitions for enemy parameters.
 * 7/28/2024 Ver.1.1.2
 * Fixed an issue that would cause an error when setting ability scores.
 * Fixed an issue that would cause an error when an actor without an image set was selected.
 * 7/27/2024 Ver.1.1.1
 * Modified to allow decimal points to be applied to original parameters and ability values.
 * 7/21/2024 Ver.1.1.0
 * Fixed an issue where an error would occur when specifying a name.
 * 7/13/2024 Ver.1.0.2
 * Fixed the issue where the settings in "NUUN_ActorPicture" were not applied.
 * 6/22/2024 Ver.1.0.1
 * Fixed an issue where item width was not applied wider than the width of a single item.
 * Fixed actor front image image to fit item width.
 * 6/9/2024 Ver.1.0.0
 * First edition.
 * 
 * @param NoActorHpColor
 * @text Actor name color fixed
 * @desc The text color of the actor name will no longer be linked to HP color.
 * @type boolean
 * @default false
 * 
 * @param EquipSetting
 * @text Equipment Settings
 * @default If there is a setting in the corresponding plug-in, that will take priority.
 * 
 * @param EquipNameVisible
 * @text Equipment part name display
 * @desc Specify the equipment part name to be displayed.
 * @type select
 * @option None
 * @value None
 * @option Parts only
 * @value Name
 * @option Iicon only
 * @value Icon
 * @option Icon, Part
 * @value IconName
 * @default Name
 * @parent EquipSetting
 * 
 * @param EquipIcons
 * @type struct<EquipIconsData>[]
 * @text Equipment icon
 * @desc Equipment icon set. The ID is the same as the equipment slot number.
 * @default []
 * @parent EquipSetting
 * 
 * @param InvalidSlotHide
 * @text Hide sealed equipment
 * @desc Equipment sealed with features will not be displayed.
 * @type boolean
 * @default false
 * @parent EquipSetting
 * 
 * @param ExpgaugeSetting
 * @text Experience Gauge Settings
 * @default If there is a setting in the corresponding plug-in, that will take priority.
 * 
 * @param ExpDisplayMode
 * @text Display of exp gauge
 * @desc Specifies the display of the experience value gauge.
 * @type select
 * @option None
 * @value 0
 * @option Required experience to next level
 * @value 1
 * @option Current experience gained
 * @value 2
 * @option Current Acquisition Percentage Display
 * @value 3
 * @option Level display(Circle gauge only)
 * @value 4
 * @default 1
 * @parent ExpgaugeSetting
 * 
 * @param LabelShow
 * @text Label display
 * @desc Show label.
 * @type boolean
 * @default true
 * @parent ExpgaugeSetting
 * 
 * @param EXPDecimal
 * @text Decimal place number
 * @desc The number of decimal places that can be displayed.
 * @type number
 * @default 2
 * @min 0
 * @max 99
 * @parent ExpgaugeSetting
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc ステータス項目ベースプラグイン
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 1.1.5
 * 
 * @help
 * メニュー系の画面をカスタマイズするプラグインのベースプラグインになります。
 * 対応しているプラグインよりも上に設定してください。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/9/28 Ver.1.1.5
 * 処理の修正。
 * EXPゲージの横幅の設定が機能していなかった問題を修正。
 * 2024/9/22 Ver.1.1.4
 * 記述欄、フリーテキストを選択したときにエラーが出る問題を修正。
 * 2024/9/8 Ver.1.1.3
 * 記述欄が機能していない問題を修正。
 * 動的パラメータで任意の評価式が機能していなかった問題を修正。
 * 敵のパラメータの定義追加。
 * 2024/7/28 Ver.1.1.2
 * 能力値を設定するとエラーが出る問題を修正。
 * 画像が未設定のアクターが選択されるとエラーが出る問題を修正。
 * 2024/7/27 Ver.1.1.1
 * オリジナルパラメータ、能力値に小数点数を適用できるように修正。
 * 2024/7/21 Ver.1.1.0
 * 名称のみを指定するとエラーが出る問題を修正。
 * 2024/7/13 Ver.1.0.2
 * 立ち絵、顔グラ共通プラグインでの設定が適用されなかった問題を修正。
 * 2024/6/22 Ver.1.0.1
 * 項目の横幅が1項目の横幅より広く適用されない問題を修正。
 * アクターの前面画像の画像を項目幅にフィットするように修正。
 * 2024/6/9 Ver.1.0.0
 * 初版
 * 
 * @param NoActorHpColor
 * @text アクター名色固定
 * @desc アクター名の文字色をHPカラーと連動させないようにします。
 * @type boolean
 * @default false
 * 
 * @param EquipSetting
 * @text 装備設定
 * @default 対応プラグインで設定がある場合はそちらが優先。
 * 
 * @param EquipNameVisible
 * @text 装備部位名表示
 * @desc 表示する装備部位名を指定します。
 * @type select
 * @option なし
 * @value None
 * @option 部位のみ
 * @value Name
 * @option アイコンのみ
 * @value Icon
 * @option アイコン、部位
 * @value IconName
 * @default Name
 * @parent EquipSetting
 * 
 * @param EquipIcons
 * @type struct<EquipIconsData>[]
 * @text 装備アイコン
 * @desc 装備アイコンを設定します。IDは装備スロットの番号と同じです。
 * @default []
 * @parent EquipSetting
 * 
 * @param InvalidSlotHide
 * @text 封印装備非表示
 * @desc 特徴で封印されている装備を表示しません。
 * @type boolean
 * @default false
 * @parent EquipSetting
 * 
 * @param ExpgaugeSetting
 * @text 経験値ゲージ設定
 * @default 対応プラグインで設定がある場合はそちらが優先。
 * 
 * @param ExpDisplayMode
 * @text 経験値ゲージの表示
 * @desc 経験値ゲージの表示を指定します。
 * @type select
 * @option 表示なし
 * @value 0
 * @option 次のレベルまでの必要経験値
 * @value 1
 * @option 現在の獲得経験値
 * @value 2
 * @option 現在の獲得経験値の百分率表示
 * @value 3
 * @option レベル表示(サークルゲージのみ)
 * @value 4
 * @default 1
 * @parent ExpgaugeSetting
 * 
 * @param LabelShow
 * @text ラベル表示
 * @desc ラベルを表示します
 * @type boolean
 * @default true
 * @parent ExpgaugeSetting
 * 
 * @param EXPDecimal
 * @text 経験値小数点桁数
 * @desc 経験値の表示出来る小数点桁数。
 * @type number
 * @default 2
 * @min 0
 * @max 99
 * @parent ExpgaugeSetting
 * 
 * 
 */

var Imported = Imported || {};
Imported.NUUN_MenuParamListBase = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);//params.pluginName

    const parameters = PluginManager.parameters('NUUN_MenuParamListBase');
    const _tempParams = new Nuun_TempParam();

    function isApng(name) {
        return SceneManager._apngLoaderPicture && SceneManager._apngLoaderPicture.isApng(name);
    }

    class Nuun_DrawListData {
        constructor(_window, params) {
            this._window = _window;
            this._params = params;
            this._list = [];
            this._actorBitmap = null;
            this._actorImgData = this.isActorPictureEXApp() ? new Nuun_ActorGraphics(_window) : null;
            this.language_Jp = $gameSystem.isJapanese();
        }
    
        setList(list) {
            this._list = list;
        }

        getStatusParamsList() {
            return [];
        }

        getActorsList() {
            return this._params.ActorsImgList;
        }

        getActorsSettingList() {
            return this.isActorPictureEXApp() ? NuunManager.getBattlerActors() : this.getActorsList();
        }
    
        nuun_MaxContentsCols() {
            return 1;
        }
    
        nuun_ItemContentsWidth(width) {
            return Math.floor(width / this.nuun_MaxContentsCols()) - this._window.colSpacing() - 4;
        }

        nuun_ItemWidth(width) {
            return Math.floor(width / this.nuun_MaxContentsCols());
        }
    
        nuun_SystemWidth(swidth, width) {
            return swidth > 0 ? swidth : Math.floor(width / 3);
        }
    
        getParamsList() {
            return this._list || [];
        }
    
        getDecimalMode() {
            return true;
        }

        setTempType(type) {
            _tempParams.setType(type);
        }

        setTepmData(data, exParams) {
            _tempParams.setData(data, exParams);
        }
    
        nuun_LoadContentsImg(data) {
            return ImageManager.nuun_LoadPictures(data.ImgData);
        }

        contensX(x) {
            return x + (this._window.itemPadding() / 2); 
        }

        contensWidth(width) {
            return width - this._window.itemPadding();
        }

        isActorPictureEXApp() {
            return Imported.NUUN_ActorPicture && this._params.ActorPictureEXApp;
        }

        getGraphicMode() {
            return this._params.GraphicMode;
        }

        drawItemBackground(index) {
            const actor = this._window.actor(index);
            const data = this.getActorImgData(actor, true);
            if (data && data.ActorBackImg) {
                const bitmap = ImageManager.nuun_LoadPictures(data.ActorBackImg);
                if (bitmap) {
                    bitmap.addLoadListener(this.drawActorBack.bind(this, bitmap, index));
                } else {
                    return true;
                }
            } else {
                return true;
            }
        }

        drawActorBack(bitmap, index) {
            const rect = this._window.itemRect(index);
            this._window.contentsBack.nuun_contentsBackBlt(bitmap, 0, 0, rect.width, rect.height, rect.x + 1, rect.y + 1, rect.width - 2, rect.height - 2, 100, true);
        }

        drawItemContents(index) {
            const unLoadBitmap = this.loadCheckBitmap(this._window.actor(index));
            if(unLoadBitmap){
                unLoadBitmap.addLoadListener(this.drawItemContents.bind(this, index));//再トライ
            } else {
                this.drawItemContentsImg(index);
                this.drawItemContentsParams(index);
            }
        }

        drawStatusContents(actor) {
            const unLoadBitmap = this.loadCheckBitmap(actor);
            if(unLoadBitmap){
                unLoadBitmap.addLoadListener(this.drawStatusContents.bind(this, actor));//再トライ
            } else {
                this.drawItemImg(actor, -1);
                this.drawItemParams(actor);
            }
        }

        drawItemContentsImg(index) {
            const actor = this._window.actor(index);
            this.drawItemImg(actor, index);
        }

        imgSetup(actor) {
            if (!!this._actorImgData) {
                this._actorImgData.setup(actor);
            }
        }

        drawItemImg(actor, index) {
            if (actor && actor.isActor()) {
                const data = this.getActorImgData(actor);
                if (!data) {
                    this._graphicMode = this._window.defaultGraphicMode();
                    if (this._graphicMode !== 'none') {
                        this.drawContentsImage(_initNoData(actor), actor, index);
                    }
                } else {
                    this._graphicMode = this.getGraphicMode();
                    if (this._graphicMode !== 'none' && this._graphicMode !== 's_img') {
                        this.drawContentsImage(data, actor, index);
                    }
                }
            }
        }

        drawContentsImage(data, actor, index) {
            let bitmap = null;
            const w = this._window;
            const rect = w.itemRect(index >= 0 ? index : 0);
            if (this._graphicMode !== 'none') {
                if (this._graphicMode === 'face') {
                    bitmap = this.getFaceImg(actor);
                } else {
                    if (isApng(data.ActorImg.split('pictures/')[1])) {
                        this.createApngSprite(data, actor, index);
                    } else {
                        bitmap = this.getActorGraphicImg(data, actor);
                    }
                }
            }
            if (bitmap) {
                bitmap.addLoadListener(function() {
                    this.drawActorGraphic(data, bitmap, index, rect.x, rect.y, rect.width, rect.height , actor);
                }.bind(this));
            }
        }

        createApngSprite(data, actor, index) {
            if (!this._actorBitmap) {
                const sprite = new Sprite_NuunAPngImg();
                this._window.nuun_addClientAreaSprite(sprite);
                this._actorBitmap = sprite;
            }
            const rect = this._window.itemRect(index);
            const sprite = this._actorBitmap;
            sprite.setup(actor, data, data.ActorImg, !!this.isActorPictureEXApp());
            sprite.move(rect.x + 50 + data.Actor_X + this._params.ActorImg_X, rect.y + data.Actor_Y + this._params.ActorImg_Y, rect.width, rect.height);
        }
        
        drawActorGraphic(data, bitmap, index, x, y, width, height, actor) {
            if (this._graphicMode === 'face') {
                x += data.Actor_X + this._params.ActorImg_X;
                y += data.Actor_Y + this._params.ActorImg_Y;
                this.nuun_ActorFace(data, x, y, width - 2, height - 2, actor);
            } else {
                this.nuun_drawActorGraphic(actor, data, bitmap, index, x, y, width, height);
            }
        }

        nuun_drawActorGraphic(actor, data, bitmap, index, x, y, width, height) {
            const w = this._window;
            w.changePaintOpacity(w.isSubMemberOpacity(actor));
            const ww = Math.min(width + (index >= 0 ? -2 : 0), bitmap.width);
            const wh = Math.min(height + (index >= 0 ? -2 : 0), bitmap.height);
            const scale = (data.Actor_Scale || 100) / 100;
            const sw = width * scale;
            const sh = height * scale;
            const sx = data.Img_SX || 0;
            const sy = data.Img_SY || 0;
            x += data.Actor_X + this._params.ActorImg_X + (index >= 0 ? 1 : this.getActorGraphicPosition(bitmap));
            y += data.Actor_Y + this._params.ActorImg_Y + (index >= 0 ? 1 : (this._window.innerHeight - bitmap.height));
            w.contents.blt(bitmap, sx, sy, ww, wh, x, y, ww, wh);
            w.changePaintOpacity(true);
        }

        getActorGraphicPosition(bitmap) {
            switch (this._params.ActorPosition) {
                case 'Left':
                    return 0;
                case 'Center':
                    return Math.floor(this._window.innerWidth / 2 - ((bitmap.width) / 2));
                case 'Right':
                    return this._window.innerWidth - (bitmap.width);
                default:
                    return this._window.innerWidth - (bitmap.width);
            }
        }

        getActorImgData(actor, mode) {
            const list = mode ? this.getActorsList() : this.getActorsSettingList();
            return list.find(data => this.condActorImg(data, actor, mode));
        }

        condActorImg(data, actor, mode) {
            if (data[this.getActorId(mode)] === actor.actorId() && actor._classId === data.ClassId) {
                return true;
            } else if (data.ClassId === 0 && data[this.getActorId(mode)] === actor.actorId()) {
                return true;
            } else if (data[this.getActorId(mode)] === 0 && actor._classId === data.ClassId) {
                return true;
            }
            return false;
        }

        getActorId(mode) {
            return this.isActorPictureEXApp() && !mode ? 'actorId' : 'ActorId';
        }

        getFaceImg(actor) {
            return this.isActorPictureEXApp() ? this._actorImgData.loadActorFace() : ImageManager.loadFace(actor.faceName());
        }

        getActorGraphicImg(data, actor) {
            return this.isActorPictureEXApp() ? this._actorImgData.loadActorGraphic() : ImageManager.nuun_LoadPictures(data.ActorImg);
        }

        setTextMode(align) {
            this._window.nuunExTextMode = true;
            this._window.nuunAlign = align;
        }

        textModeClear() {
            this._window.nuunExTextMode = false;
            this._window.nuunAlign = null;
        }
    
        loadCheckBitmap(actor) {
            if (!actor) {
                return;
            }
            const list = this.getParamsList();
            let data = null;
            let bitmap = null;
            let loadBitmap = null;
            for (const data of list) {
                switch (data.DateSelect) {
                    case "Imges":
                        loadBitmap = this.nuun_LoadContentsImg(data);
                        if (loadBitmap && !loadBitmap.isReady()) {
                            bitmap = loadBitmap;
                        }
                        break;
                    case "IndividualImges":
                        const dataImg = this.getItemImg(data, this.getObject(actor));
                        if (dataImg) {
                            loadBitmap = ImageManager.nuun_LoadPictures(dataImg[0])
                            if (loadBitmap && !loadBitmap.isReady()) {
                                bitmap = loadBitmap;
                            }
                        }
                        break;
                    case "Charchip":
                        loadBitmap = ImageManager.loadCharacter(actor.characterName());
                        if (loadBitmap && !loadBitmap.isReady()) {
                            bitmap = loadBitmap;
                        }
                        break;
                    case "SvActor":
                        loadBitmap = ImageManager.loadSvActor(actor.battlerName());
                        if (loadBitmap && !loadBitmap.isReady()) {
                            bitmap = loadBitmap;
                        }
                        break;
                    }
            }
            if (actor && this.isActor(actor)) {//test
                return bitmap;
            }
            loadBitmap = this.getFaceImg(actor);
            if (loadBitmap && !loadBitmap.isReady()) {
                bitmap = loadBitmap;
            }
            data = this.getActorImgData(actor);
            if (data && this.getActorGraphicImg(data, actor)) {
                loadBitmap = this.getActorGraphicImg(data, actor);
                if (loadBitmap && !loadBitmap.isReady()) {
                    bitmap = loadBitmap;
                }
            }
            if (this.isActorPictureEXApp()) {
                data = this.getActorImgData(actor, true);
            }
            if (data && data.ActorFrontImg) {
                loadBitmap = ImageManager.nuun_LoadPictures(data.ActorFrontImg);
                if (loadBitmap && !loadBitmap.isReady()) {
                    bitmap = loadBitmap;
                }
            }
            return bitmap;
        }

        isActor(actor) {
            return !actor.isActor || !actor.isActor();
        }
    
        drawItemContentsParams(index) {//コンテンツ背景内の項目用
            const w = this._window;
            const actor = w.actor(index);
            const rect = w.itemRect(index);
            this.drawActorFront(actor, rect);//背景画像などはActorsSettingList 
            const itemWidth = this.nuun_ItemContentsWidth(rect.width);
            const lineHeight = w.lineHeight();
            const colSpacing = w.colSpacing();
            const list = this.getStatusParamsList();
            for (const data of list) {
                w.resetFontSettings();
                const x_Position = data.X_Position;
                const y_Position = data.Y_Position;
                const position = Math.min(x_Position, this.nuun_MaxContentsCols());
                const x = (data.X_Coordinate || 0) + (itemWidth + colSpacing) * (position - 1) + colSpacing;
                const y = (y_Position - 1) * lineHeight + rect.y + (data.Y_Coordinate || 0) + w.itemPadding();
                const width = Math.min(data.ItemWidth && data.ItemWidth > 0 ? Math.min(data.ItemWidth, rect.width - x) : this.widthMode(data, itemWidth), rect.width - x);
                data._width = data.ItemWidth && data.ItemWidth > 0 ? Math.min(data.ItemWidth, width) : Math.min(width, 128);
                this.nuun_DrawContentsBase(data, x + rect.x, y, width - colSpacing / 2, actor);
            }
        }

        drawItemParams(actor) {
            const w = this._window;
            const rect = w.itemRect(0);
            const itemWidth = this.nuun_ItemWidth(rect.width);
            const lineHeight = w.lineHeight();
            const colSpacing = w.colSpacing();
            const list = this.getParamsList();
            for (const data of list) {
                w.resetFontSettings();
                const x_Position = data.X_Position;
                const y_Position = data.Y_Position;
                const position = Math.min(x_Position, this.nuun_MaxContentsCols());
                const x = (data.X_Coordinate || 0) + (itemWidth + colSpacing) * (position - 1);
                const y = (y_Position - 1) * lineHeight + rect.y + (data.Y_Coordinate || 0);
                const width = Math.min(data.ItemWidth && data.ItemWidth > 0 ? Math.min(data.ItemWidth, rect.width - x) : this.widthMode(data.WideMode, itemWidth), rect.width - x);
                data._width = data.ItemWidth && data.ItemWidth > 0 ? Math.min(data.ItemWidth, width) : Math.min(width, 128);
                this.nuun_DrawContentsBase(data, x + rect.x, y, width, actor);
            }
        }
    
        nuun_DrawContentsBase(data, x, y, width, actor) {
            if (actor && this.nuun_IsContents(data, actor)) {
                this.setTepmData(data, this._exParams);
                const method = 'nuun_DrawContents' + data.DateSelect;
                if (this[method] === undefined) return;
                try {
                    this[method](data, x, y, width, actor);
                } catch (error) {
                    const log = ($gameSystem.isJapanese() ? "無効なIDが設定されています。" : "An invalid ID has been configured.") + data.DateSelect;
                    throw ["DataError", log];
                }
            }
        }
    
        nuun_IsContents(data, actor) {
            if (!!data.Conditions) {
                return eval(data.Conditions);
            }
            return true;
        }
    
        widthMode(mode, width) {
            if (mode) {
                width = width * 2 + this._window.colSpacing();
            }
            return width;
        }
    
        nuun_ParamNameData(data, param) {
            if (data.ParamName) {
                return data.ParamName;
            }
            switch (param) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    return TextManager.param(param);
                case 10:
                case 11:
                    return TextManager.param(param - 2);
                case 12:
                    return this.language_Jp ? "会心率" : 'Critcal Rate';
                case 13:
                    return this.language_Jp ? "会心回避率" : 'Critical Evade';
                case 14:
                    return this.language_Jp ? "魔法回避率" : 'Magic Evade';
                case 15:
                    return this.language_Jp ? "魔法反射率" : 'Magic Reflect';
                case 16:
                    return this.language_Jp ? "反撃率" : 'Counter';
                case 17:
                    return this.language_Jp ? "HP再生率" : 'HP Regen';
                case 18:
                    return this.language_Jp ? "MP再生率" : 'MP Regen';
                case 19:
                    return this.language_Jp ? "TP再生率" : 'TP Regen';
                case 20:
                    return this.language_Jp ? "狙われ率" : 'Aggro';
                case 21:
                    return this.language_Jp ? "防御効果率" : 'Guard';
                case 22:
                    return this.language_Jp ? "回復効果率" : 'Recovery';
                case 23:
                    return this.language_Jp ? "薬の知識" : 'Item Effect';
                case 24:
                    return this.language_Jp ? "MP消費率" : 'MP Cost';
                case 25:
                    return this.language_Jp ? "TPチャージ率" : 'TP Charge';
                case 26:
                    return this.language_Jp ? "物理ダメージ率" : 'Physical Damage';
                case 27:
                    return this.language_Jp ? "魔法ダメージ率" : 'Magical Damage';
                case 28:
                    return this.language_Jp ? "床ダメージ率" : 'Floor Damage';
                case 29:
                    return this.language_Jp ? "獲得経験率" : 'EXP Gain';
                case 42:
                    return TextManager.param(0);
                case 43:
                    return TextManager.param(1);
                default:
                    return null;
            }
        }
    
        nuun_DrawContentsNone(data, x, y, width) {
    
        }

        nuun_DrawContentsName(data, x, y, width, actor) {
            const w = this._window;
            if (data.Icon && data.Icon > 0) {
                w.drawIcon(data.Icon, x, y + (data.IconY || 0));
                const iconWidth = ImageManager.iconWidth + 4;
                x += iconWidth;
                width -= iconWidth;
            }
            w.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
            w.changeTextColor(NuunManager.getColorCode(data.NameColor));
            const nameText = data.ParamName ? data.ParamName : '';
            this.nuun_SetContentsFontFace(data);
            w.drawText(nameText, x, y, width, data.Align);
        }

        nuun_DrawContentsHorzLine(x, y, width, data) {
            const w = this._window;
            const lineY = y + w.lineHeight() / 2 - 1;
            w.contents.paintOpacity = 48;
            w.contents.fillRect(x, lineY, width, 2, NuunManager.getColorCode(data.NameColor));
            w.contents.paintOpacity = 255;
        }
    
        nuun_DrawContentsActorName(data, x, y, width, actor) {
            const w = this._window;
            w.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
            this.nuun_SetContentsFontFace(data);
            this.setTextMode(data.Align);
            if (params.NoActorHpColor && data.NameColor >= 0) {
                w.changeTextColor(NuunManager.getColorCode(data.NameColor));
            } else {
                w.changeTextColor(ColorManager.hpColor(actor));
            }
            w.drawActorName(actor, x, y, width);
            this.textModeClear();
        }

        nuun_DrawContentsEnemyName(data, x, y, width, enemy) {
            if (!enemy.isEnemy()) return;
            const w = this._window;
            w.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
            this.nuun_SetContentsFontFace(data);
            w.changeTextColor(ColorManager.hpColor(enemy));
            w.drawText(enemy.enemy().name, x, y, width, data.Align);
        }
    
        nuun_DrawContentsNickname(data, x, y, width, actor) {
            const w = this._window;
            w.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
            w.changeTextColor(NuunManager.getColorCode(data.NameColor));
            this.nuun_SetContentsFontFace(data);
            w.drawText(actor.nickname(), x, y, width, data.Align);
        }
    
        nuun_DrawContentsClass(data, x, y, width, actor) {
            const w = this._window;
            w.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
            w.changeTextColor(NuunManager.getColorCode(data.NameColor));
            this.nuun_SetContentsFontFace(data);
            w.drawText(actor.currentClass().name, x, y, width, data.Align);
        }
    
        nuun_DrawContentsLevel(data, x, y, width, actor) {
            const w = this._window;
            const nameText = data.ParamName ? data.ParamName : TextManager.levelA;
            w.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
            this.nuun_SetContentsFontFace(data);
            w.changeTextColor(NuunManager.getColorCode(data.NameColor));
            const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? w.textWidth(nameText) : this.nuun_SystemWidth(data.SystemItemWidth, width);
            w.drawText(nameText, x, y, textWidth);//48
            w.resetTextColor();
            this.nuun_SetContentsValueFontFace(data);
            w.drawText(actor.level, x + textWidth + 12, y, width - (textWidth + 12), data.Align);
        }
    
        nuun_DrawContentsState(data, x, y, width, actor) {
            const w = this._window;
            let icons = [];
            let states = [];
            const iconWidth = ImageManager.iconWidth;
            const dataEval = data.DetaEval;
            if (dataEval) {
                const stateList = dataEval.split(',');
                for (const id of stateList) {
                    Array.prototype.push.apply(states, w.nuun_getListIdData(id));
                }
                icons = actor.allIcons().filter(icon => states.some(i => $dataStates[i].iconIndex === icon)).slice(0, Math.floor(width / iconWidth));
                let iconX = x;
                for (const icon of icons) {
                    w.drawIcon(icon, iconX, y + 2);
                    iconX += iconWidth;
                }
            } else {
                w.drawActorIcons(actor, x, y, width);
            }
        }
    
        nuun_DrawContentsState2(data, x, y, width, actor) {
            const hw = Math.floor(ImageManager.iconWidth / 2);
            this._window.placeStateIcon(actor, x + hw, y + hw);
        }
    
        nuun_DrawContentsOrgParam(data, x, y, width, actor) {
            const enemy = actor.isEnemy() ? actor : null;
            const w = this._window;
            w.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
            if (data.Back) {
                w.drawContentsBackground(x, y, width);
                x = this.contensX(x);
                width = this.contensWidth(width);
            }
            if (data.Icon && data.Icon > 0) {
                w.drawIcon(data.Icon, x, y + (data.IconY || 0));
                const iconWidth = ImageManager.iconWidth + 4;
                x += iconWidth;
                width -= iconWidth;
            }
            w.changeTextColor(NuunManager.getColorCode(data.NameColor));
            this.nuun_SetContentsFontFace(data);
            const nameText = data.ParamName ? data.ParamName : '';
            const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? w.textWidth(nameText) : this.nuun_SystemWidth(data.SystemItemWidth, width);
            w.drawText(nameText, x, y, textWidth);
            w.resetTextColor();
            if (data.DetaEval) {
                this.nuun_SetContentsValueFontFace(data);
                const padding = textWidth > 0 ? w.itemPadding() : 0;
                const textParam = this.getStatusEvalParam(param, actor, enemy);
                if (isNaN(textParam)) {
                    w.nuun_DrawContentsParamUnitText(textParam, data, x + textWidth + padding, y, width - (textWidth + padding));
                } else {
                    const value = NuunManager.numPercentage(textParam, (data.Decimal - 2) || 0, true);
                    w.nuun_DrawContentsParamUnitText(value, data, x + textWidth + padding, y, width - (textWidth + padding));
                }       
            }
        }

        nuun_DrawContentsTurn(data, x, y, width, actor) {
            const w = this._window;
            w.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
            if (data.Back) {
                w.drawContentsBackground(x, y, width);
                x = this.contensX(x);
                width = this.contensWidth(width);
            }
            if (data.Icon && data.Icon > 0) {
                w.drawIcon(data.Icon, x, y + (data.IconY || 0));
                const iconWidth = ImageManager.iconWidth + 4;
                x += iconWidth;
                width -= iconWidth;
            }
            w.changeTextColor(NuunManager.getColorCode(data.NameColor));
            this.nuun_SetContentsFontFace(data);
            const nameText = data.ParamName ? data.ParamName : '';
            const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? w.textWidth(nameText) : this.nuun_SystemWidth(data.SystemItemWidth, width);
            w.drawText(nameText, x, y, textWidth);
            w.resetTextColor();
            this.nuun_SetContentsValueFontFace(data);
            const padding = textWidth > 0 ? w.itemPadding() : 0;
            w.nuun_DrawContentsParamUnitText(actor.turnCount(), data, x + textWidth + padding, y, width - (textWidth + padding));
        }

        nuun_DrawContentsDynamicName(data, x, y, width, actor) {
            const key = "actor%1-name".format(actor.actorId());
            _tempParams.setData(data);
            const sprite = this._window.createInnerSprite(key, Sprite_DynamicName);
            sprite.setup(actor);
            sprite.move(x, y);
            sprite.show();
        }

        nuun_DrawContentsDynamicOrgParam(data, x, y, width, actor) {
            const key = "actor%1-param%2".format(actor.actorId(), data.GaugeID);
            const status = this.getStatusEval(param, actor);
            this.setTempType(status);
            this.setTepmData(data)
            const sprite = this._window.createInnerSprite(key, Sprite_DynamicParam);
            sprite.setup(actor);
            sprite.move(x, y);
            sprite.show();
        }
    
        nuun_DrawContentsHpGauge(data, x, y, width, actor) {
            this.setTempType("hp");
            this.nuun_PlaceGauge(actor, "hp", x, y, "actor%1-gauge-%2");
        }
    
        nuun_DrawContentsMpGauge(data, x, y, width, actor) {
            this.setTempType("mp");
            this.nuun_PlaceGauge(actor, "mp", x, y, "actor%1-gauge-%2");
        }
    
        nuun_DrawContentsTpGauge(data, x, y, width, actor) {
            if ($dataSystem.optDisplayTp) {
                this.setTempType("tp");
                this.nuun_PlaceGauge(actor, "tp", x, y, "actor%1-gauge-%2");
            }
        }

        nuun_DrawContentsTpbGauge(data, x, y, width, actor) {
            if (BattleManager.isTpb()) {
                this.setTempType("time");
                this.nuun_PlaceGauge(actor, "time", x, y, "actor%1-gauge-%2");
            }
        }
    
        nuun_DrawContentsExpGauge(data, x, y, width, actor) {
            this.setTempType("menuexp");
            this.setTepmData(data, this.getTempExParams());
            this.nuun_PlaceGauge(actor, "menuexp", x, y, "menuExp-%1");
        }

        nuun_DrawContentsHpCircularGauge(data, x, y, width, actor) {
            this.setTempType("hp");
            this.nuun_placeCircularGauge(actor, "hp", x, y, "actor%1-gauge-%2");
        }
    
        nuun_DrawContentsMpCircularGauge(data, x, y, width, actor) {
            this.setTempType("mp");
            this.nuun_placeCircularGauge(actor, "mp", x, y, "actor%1-gauge-%2");
        }
    
        nuun_DrawContentsTpCircularGauge(data, x, y, width, actor) {
            if ($dataSystem.optDisplayTp) {
                this.setTempType("tp");
                this.nuun_placeCircularGauge(actor, "tp", x, y, "actor%1-gauge-%2");
            }
        }

        nuun_DrawContentsTpbCircularGauge(data, x, y, width, actor) {
            if (BattleManager.isTpb()) {
                this.setTempType("time");
                this.nuun_placeCircularGauge(actor, "time", x, y, "actor%1-gauge-%2");
            }
        }
    
        nuun_DrawContentsExpCircularGauge(data, x, y, width, actor) {
            this.setTempType("menuexp");
            this.setTepmData(data, this.getTempExParams());
            this.nuun_placeCircularGauge(actor, "menuexp", x, y, "menuExp-%1");
        }
    
        nuun_DrawContentsOrgGauge(data, x, y, width, actor) {
            this.setTempType(data.GaugeID || data.ParamID);
            this.nuun_PlaceGauge(actor, data.GaugeID || data.ParamID, x, y, "actor%1-gauge-%2");
        }
    
        nuun_DrawContentsExpInfo(data, x, y, width, actor) {
            const w = this._window;
            const padding = w.itemPadding();
            w.changeTextColor(NuunManager.getColorCode(data.NameColor));
            const nameText = data.ParamName ? data.ParamName : TextManager.expTotal.format(TextManager.exp);
            const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? w.textWidth(nameText) : this.nuun_SystemWidth(data.SystemItemWidth, width);
            w.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
            this.nuun_SetContentsFontFace(data);
            w.drawText(nameText, x, y, textWidth);
            w.resetTextColor();
            this.nuun_SetContentsValueFontFace(data);
            w.nuun_DrawContentsParamUnitText(this.nuun_ExpTotalValue(actor), data, x + textWidth + padding, y, width - (textWidth + padding));
        }
    
        nuun_DrawContentsExp(data, x, y, width, actor) {
            const w = this._window;
            const padding = w.itemPadding();
            w.changeTextColor(NuunManager.getColorCode(data.NameColor));
            const nameText = data.ParamName ? data.ParamName : 'NextLv';
            w.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
            this.nuun_SetContentsFontFace(data);
            const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? w.textWidth(nameText) : this.nuun_SystemWidth(data.SystemItemWidth, width);
            w.drawText(nameText, x, y, textWidth);
            w.resetTextColor();
            this.nuun_SetContentsValueFontFace(data);
            let textParam = (data.DetaEval ? eval(data.DetaEval) : this.nuun_ExpNextValue(actor));
            w.nuun_DrawContentsParamUnitText(textParam, data, x + textWidth + padding, y, width - (textWidth + padding));
        }
    
        nuun_DrawContentsCharchip(data, x, y, width, actor) {
            this.nuun_ActorCharacterChip(actor, data, x + 24, y + 48, "actor%1-menuStatusCharacter");
        }
    
        nuun_DrawContentsSvActor(data, x, y, width, actor) {
            this.nuun_drawSvActorImg(data, x, y, width, actor, "actor%1-menuStatusSvActor");
        }

        nuun_DrawContentsFreetext(data, x, y, width, actor) {
            this._window.drawTextEx(data.Text, x, y, width);
        }

        nuun_DrawContentsFace(data, x, y, width, actor) {
            if (actor.isEnemy()) {
                this.nuun_DrawEnemyFace(data, x, y, width, actor);
                return;
            }
            let bitmap = null;
            if (this._window.isActorPictureEXApp()) {
                bitmap = this._actorImgData.loadActorFace();
            } else {
                bitmap = ImageManager.loadFace(actor.faceName());
            }
            const rect = this._window.itemRect(0);
            bitmap.addLoadListener(function() {
                this.nuun_ActorFace(data, x, y, Math.min(width, ImageManager.faceWidth), Math.min(rect.height - 2, ImageManager.faceHeight), actor);
            }.bind(this));
        }

        nuun_DrawEnemyFace(data, x, y, width, enemy) {
            const faceData = this.getBattlerFace(enemy);
            if (!faceData) return;
            const bitmap = ImageManager.loadFace(faceData[0]);
            const rect = this._window.itemRect(0);
            bitmap.addLoadListener(function() {
                this.nuun_EnemyFace(data, faceData, x, y, Math.min(width, ImageManager.faceWidth), Math.min(rect.height - 2, ImageManager.faceHeight), enemy);
            }.bind(this));
        }

        nuun_DrawContentsImges(data, x, y, width, actor) {
            this.nuun_DrawImg(data, x, y, actor);
        }

        nuun_DrawContentsIndividualImges(data, x, y, width, actor) {
            this.nuun_DrawItemImg(data, x, y, width, actor);
        }
    
        nuun_DrawContentsHp(data, x, y, width, actor) {
            this.nuun_DrawParams(data, 0, x, y, width, actor);
        }
    
        nuun_DrawContentsMp(data, x, y, width, actor) {
            this.nuun_DrawParams(data, 1, x, y, width, actor);
        }
    
        nuun_DrawContentsAtk(data, x, y, width, actor) {
            this.nuun_DrawParams(data, 2, x, y, width, actor);
        }
    
        nuun_DrawContentsDef(data, x, y, width, actor) {
            this.nuun_DrawParams(data, 3, x, y, width, actor);
        }
    
        nuun_DrawContentsMat(data, x, y, width, actor) {
            this.nuun_DrawParams(data, 4, x, y, width, actor);
        }
    
        nuun_DrawContentsMdf(data, x, y, width, actor) {
            this.nuun_DrawParams(data, 5, x, y, width, actor);
        }
    
        nuun_DrawContentsAgi(data, x, y, width, actor) {
            this.nuun_DrawParams(data, 6, x, y, width, actor);
        }
    
        nuun_DrawContentsLuk(data, x, y, width, actor) {
            this.nuun_DrawParams(data, 7, x, y, width, actor);
        }
    
        nuun_DrawContentsHit(data, x, y, width, actor) {
            this.nuun_DrawXParams(data, 0, x, y, width, actor);
        }
    
        nuun_DrawContentsEVAsion(data, x, y, width, actor) {
            this.nuun_DrawXParams(data, 1, x, y, width, actor);
        }
    
        nuun_DrawContentsEva(data, x, y, width, actor) {//旧
            this.nuun_DrawXParams(data, 1, x, y, width, actor);
        }
    
        nuun_DrawContentsCri(data, x, y, width, actor) {
            this.nuun_DrawXParams(data, 2, x, y, width, actor);
        }
    
        nuun_DrawContentsCritcalEvade(data, x, y, width, actor) {
            this.nuun_DrawXParams(data, 3, x, y, width, actor);
        }
    
        nuun_DrawContentsMagicEvade(data, x, y, width, actor) {
            this.nuun_DrawXParams(data, 4, x, y, width, actor);
        }
    
        nuun_DrawContentsMagicrEflect(data, x, y, width, actor) {
            this.nuun_DrawXParams(data, 5, x, y, width, actor);
        }
    
        nuun_DrawContentsCounter(data, x, y, width, actor) {
            this.nuun_DrawXParams(data, 6, x, y, width, actor);
        }
    
        nuun_DrawContentsHpRegen(data, x, y, width, actor) {
            this.nuun_DrawXParams(data, 7, x, y, width, actor);
        }
    
        nuun_DrawContentsMpRegen(data, x, y, width, actor) {
            this.nuun_DrawXParams(data, 8, x, y, width, actor);
        }
    
        nuun_DrawContentsTpRegen(data, x, y, width, actor) {
            this.nuun_DrawXParams(data, 9, x, y, width, actor);
        }
    
        nuun_DrawContentsAggro(data, x, y, width, actor) {
            this.nuun_DrawSParams(data, 0, x, y, width, actor);
        }
    
        nuun_DrawContentsGuard(data, x, y, width, actor) {
            this.nuun_DrawSParams(data, 1, x, y, width, actor);
        }
    
        nuun_DrawContentsRecovery(data, x, y, width, actor) {
            this.nuun_DrawSParams(data, 2, x, y, width, actor);
        }
    
        nuun_DrawContentsItemEffect(data, x, y, width, actor) {
            this.nuun_DrawSParams(data, 3, x, y, width, actor);
        }
    
        nuun_DrawContentsMpCost(data, x, y, width, actor) {
            this.nuun_DrawSParams(data, 4, x, y, width, actor);
        }
    
        nuun_DrawContentsTpCharge(data, x, y, width, actor) {
            this.nuun_DrawSParams(data, 5, x, y, width, actor);
        }
    
        nuun_DrawContentsPhysicalDamage(data, x, y, width, actor) {
            this.nuun_DrawSParams(data, 6, x, y, width, actor);
        }
    
        nuun_DrawContentsMagicalDamage(data, x, y, width, actor) {
            this.nuun_DrawSParams(data, 7, x, y, width, actor);
        }
    
        nuun_DrawContentsFloorDamage(data, x, y, width, actor) {
            this.nuun_DrawSParams(data, 8, x, y, width, actor);
        }
    
        nuun_DrawContentsGainExpRate(data, x, y, width, actor) {
            this.nuun_DrawSParams(data, 9, x, y, width, actor);
        }

        nuun_DrawContentsEquip(data, x, y, width, actor) {
            const w = this._window;
            const equipNameVisible = this.getEquipNameVisible();
            const lineHeight = w.lineHeight();
            const equips = actor.equips();
            const showEquips = this.getMenuStatusShowEquipList(actor);
            const e1uipsLength = data.EquipNum > 0 ? data.EquipNum : equips.length;
            w.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
            let x2 = x;
            let y2 = y;
            let width2 = width;
            w.changeTextColor(NuunManager.getColorCode(data.NameColor));
            this.nuun_SetContentsFontFace(data);
            const nameText = data.ParamName;
            if (nameText) {
                w.drawText(nameText, x + 0, y, width);
                y2 += lineHeight;
            }
            let contentsY = y2;
            for (let i = 0; i < e1uipsLength; i++) {
                const index = i + (data.EquipStartIndex || 0);
                const slotName = w.actorSlotName(actor, index);
                if (slotName && this.isShowSlot(actor, index) && (!showEquips || (showEquips && showEquips.some(data => data === slotName)))) {
                    let sw = 0;
                    let iconWidth = 0;
                    const item = equips[index];
                    if (equipNameVisible === "IconName" || equipNameVisible === "Icon") {//アイコン表示
                        const iconId = this.getEquipIconId(index);
                        if (iconId > 0) {
                            w.drawIcon(iconId, x, contentsY + 2);
                        }
                        iconWidth = ImageManager.iconWidth + (equipNameVisible === "Icon" ? 24 : 4);
                    }
                    if (data.Back) {
                        w.drawContentsBackground(x, contentsY, width);
                        x2 = this.contensX(x);
                        width2 = this.contensWidth(width);
                    }
                    if (equipNameVisible === "Name" || equipNameVisible === "IconName") {//デフォルト
                        sw += this.nuun_SystemWidth(data.SystemItemWidth, width2);
                        w.changeTextColor(NuunManager.getColorCode(data.NameColor));
                        w.drawText(slotName, x2 + iconWidth, contentsY, sw);
                    }
                    sw += iconWidth;
                    w.resetTextColor();
                    w.drawItemName(item, x2 + sw, contentsY, width2 - sw);
                    contentsY += lineHeight;
                }
            }
        }

        getMenuStatusShowEquipList(actor) {
            if (actor.actor().meta.MenuShowEquips) {
                return actor.actor().meta.MenuShowEquips.split(',');
            } else if (actor.currentClass().meta.MenuShowEquips) {
                return actor.currentClass().meta.MenuShowEquips.split(',');
            } else {
                return null;
            }
        }
    
        nuun_PlaceGauge(actor, type, x, y, fmt) {
            if (Imported.NUUN_GaugeImage) {
                this._window.placeGaugeImg(actor, type, x, y);
            }
            const key = fmt.format(actor.actorId(), type);
            const sprite = this._window.createInnerSprite(key, Sprite_NuunGauge);
            sprite.setup(actor, type);
            sprite.move(x, y);
            sprite.show();
            _tempParams.clear();
        }

        nuun_placeCircularGauge(actor, type, x, y, fmt) {
            if (!Imported.NUUN_CircularGauge) {
                _tempParams.clear();
                return;
            }
            const find = this._window.getCircularGaugeData(type);
            if (!!find) {
                this.nuun_drawCircularMenuGauge(find, actor, type, find.GaugeX + x, find.GaugeY + y);
            }
            _tempParams.clear();
        }

        nuun_drawCircularMenuGauge(data, actor, type, x, y) {
            this._window.setCircularTempData(type, data);
            const key = "resultActor%1-gauge-%2".format(actor.actorId(), type)
            const sprite = this._window.createInnerSprite(key, Sprite_NuunCircularGauge);
            sprite.setup(actor, type);
            sprite.move(x, y);
            sprite.show();
        }
    
        nuun_DrawParams(data, param, x, y, width, actor) {
            const enemy = actor.isEnemy() ? actor : null;
            const w = this._window;
            const padding = w.itemPadding();
            if (data.Back) {
                w.drawContentsBackground(x, y, width);
                x = this.contensX(x);
                width = this.contensWidth(width);
            }
            if (data.Icon && data.Icon > 0) {
                w.drawIcon(data.Icon, x, y + (data.IconY || 0));
                const iconWidth = ImageManager.iconWidth + 4;
                x += iconWidth;
                width -= iconWidth;
            }
            w.changeTextColor(NuunManager.getColorCode(data.NameColor));
            const nameText = this.nuun_ParamNameData(data, param);
            w.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
            this.nuun_SetContentsFontFace(data);
            const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? w.textWidth(nameText) : this.nuun_SystemWidth(data.SystemItemWidth, width);
            w.drawText(nameText, x, y, textWidth);
            w.resetTextColor();
            this.nuun_SetContentsValueFontFace(data);
            let textParam = (data.DetaEval ? eval(data.DetaEval) : actor.param(param));
            textParam = NuunManager.numPercentage(textParam, (data.Decimal - 2) || 0, true);
            w.nuun_DrawContentsParamUnitText(textParam, data, x + textWidth + padding, y, width - (textWidth + padding));
        }
    
        nuun_DrawXParams(data, param, x, y, width, actor) {
            const enemy = actor.isEnemy() ? actor : null;
            const w = this._window;
            const padding = w.itemPadding();
            if (data.Back) {
                w.drawContentsBackground(x, y, width);
                x = this.contensX(x);
                width = this.contensWidth(width);
            }
            if (data.Icon && data.Icon > 0) {
                w.drawIcon(data.Icon, x, y + (data.IconY || 0));
                const iconWidth = ImageManager.iconWidth + 4;
                x += iconWidth;
                width -= iconWidth;
            }
            w.changeTextColor(NuunManager.getColorCode(data.NameColor));
            const nameText = this.nuun_ParamNameData(data, param + 10);
            w.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
            this.nuun_SetContentsFontFace(data);
            const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? w.textWidth(nameText) : this.nuun_SystemWidth(data.SystemItemWidth, width);
            w.drawText(nameText, x, y, textWidth);
            w.resetTextColor();
            this.nuun_SetContentsValueFontFace(data);
            let textParam = (data.DetaEval ? eval(data.DetaEval) : actor.xparam(param) * 100);
            textParam = NuunManager.numPercentage(textParam, (data.Decimal - 2) || 0, true);
            w.nuun_DrawContentsParamUnitText(textParam, data, x + textWidth + padding, y, width - (textWidth + padding));
        }
    
        nuun_DrawSParams(data, param, x, y, width, actor) {
            const enemy = actor.isEnemy() ? actor : null;
            const w = this._window;
            const padding = w.itemPadding();
            if (data.Back) {
                w.drawContentsBackground(x, y, width);
                x = this.contensX(x);
                width = this.contensWidth(width);
            }
            if (data.Icon && data.Icon > 0) {
                w.drawIcon(data.Icon, x, y + (data.IconY || 0));
                const iconWidth = ImageManager.iconWidth + 4;
                x += iconWidth;
                width -= iconWidth;
            }
            w.changeTextColor(NuunManager.getColorCode(data.NameColor));
            const nameText = this.nuun_ParamNameData(data, param + 20);
            w.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
            this.nuun_SetContentsFontFace(data);
            const textWidth = data.Align === 'left' && data.SystemItemWidth === 0 ? w.textWidth(nameText) : this.nuun_SystemWidth(data.SystemItemWidth, width);
            w.drawText(nameText, x, y, textWidth);
            w.resetTextColor();
            this.nuun_SetContentsValueFontFace(data);
            let textParam = (data.DetaEval ? eval(data.DetaEval) : actor.sparam(param) * 100);
            textParam = NuunManager.numPercentage(textParam, (data.Decimal - 2) || 0, true);
            w.nuun_DrawContentsParamUnitText(textParam, data, x + textWidth + padding, y, width - (textWidth + padding));
        }

        nuun_DrawContentsDesc(data, x, y, width, battler) {
            const w = this._window;
            const nameText = data.paramName;
            const obj = this.getObj(battler);
            if (nameText) {
                w.changeTextColor(NuunManager.getColorCode(data.NameColor));
                w.drawText(nameText, x, y);
                y += w.lineHeight();
            }
            w.resetTextColor();
            let text = "";
            const method = data.TextMethod;
            if (method) {
                text = obj.meta[method];
            }
            if (text){
                w.drawTextEx(text, x, y, width);
            }
        }
    
        nuun_DrawSvActorImg(data, x, y, width, actor, fmt) {
            const key = fmt.format(actor.actorId());
            const sprite = this._window.createInnerSprite(key, Sprite_MenuSvActor);
            sprite.setup(actor, data);
            sprite.show();
            sprite.setHome(x + 64, y + 64);
            sprite.startMotion();
        }

        nuun_ActorFace(data, x, y, width, height, actor) {
            const opacityMode = this._window.isSubMemberOpacity ? true : false;
            if (opacityMode) {
                this._window.changePaintOpacity(this._window.isSubMemberOpacity(actor));
            }
            width = Math.min(ImageManager.faceWidth, width);
            height = Math.min(ImageManager.faceHeight, height);
            if (this.isActorPictureEXApp()) {
                this._window.actorPictureEXDrawFace(actor, x + 1, y + 1, width, height);
            } else {
                if (actor.isRearguard && actor.isRearguard()) {
                    this._window += this._window.shiftWidth;
                }
                this._window.drawActorFace(actor, x + 1, y + 1, width, height);
            }
            if (opacityMode) {
                this._window.changePaintOpacity(true);
            }
        }

        nuun_EnemyFace(data, faceData, x, y, width, height, enemy) {
            width = Math.min(ImageManager.faceWidth, width);
            height = Math.min(ImageManager.faceHeight, height);
            this._window.drawFace(faceData[0], Number(faceData[1]), x + 1, y + 1, width, height);
        }
        
        nuun_ActorCharacterChip(actor, data, x, y, fmt) {
            const key = fmt.format(actor.actorId());
            const sprite = this._window.createInnerSprite(key, Sprite_MenuCharacter);
            sprite.setup(actor, data);
            sprite._character.setPosition(0, 0);
            sprite.move(x, y);
            sprite.show();
        }
    
        nuun_DrawImg(data, x, y, actor) {
            const w = this._window;
            if (data.ImgData) {
                const bitmap = ImageManager.nuun_LoadPictures(data.ImgData);
                if (data.ImgMaxHeight && data.ImgMaxHeight > 0) {
                    this.drawImg(bitmap, data, x, y, width);
                } else {
                    const rect = w.itemRect(0);
                    w.contents.blt(bitmap, 0, 0, rect.width, rect.height, x - w.colSpacing(), y - w.itemPadding());
                }
            }
        }

        nuun_DrawItemImg(data, x, y, width, actor) {
            const dataImg = this.getItemImg(data, this.getObject(actor));
            if (dataImg) {
                const w = this._window;
                const bitmap = ImageManager.nuun_LoadPictures(dataImg[0]);
                x += Number(dataImg[1]) || 0;
                y += Number(dataImg[2]) || 0;
                if (data.ImgMaxHeight > 0) {
                    this.drawImg(bitmap, data, x, y, width);
                } else {
                    const rect = w.itemRect(0);
                    w.contents.blt(bitmap, 0, 0, rect.width, rect.height, x - w.colSpacing(), y - w.itemPadding());
                }
            }
        }
 
        drawImg(bitmap, data, x, y, width) {
            const w = this._window;
            const rect = w.itemRect(0);
            const height = (data.ImgMaxHeight * w.lineHeight()) || rect.height;
            const scalex = Math.min(1.0, width / bitmap.width);
            const scaley = Math.min(1.0, height / bitmap.height);
            const scale = scalex > scaley ? scaley : scalex;
            const dw = Math.floor(bitmap.width * scale);
            const dh = Math.floor(bitmap.height * scale);
            x += Math.floor(width / 2 - dw / 2);
            w.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, dw, dh);
        }

        getObject(actor) {
            return actor.actor();
        }

        getItemImg(data, object) {
            if (object && object.meta[data.TextMethod]) {
                const arr = object.meta[data.TextMethod].split(',');
                arr[0] = "pictures" +"/"+ arr[0].trim();
                return arr;
            }
            return null;
        }

        drawActorFront(actor, rect) {
            const data = this.getActorImgData(actor);
            const frontBitmapImg = data && data.ActorFrontImg ? data.ActorFrontImg : null;
            if (frontBitmapImg) {
                const frontBitmap = ImageManager.nuun_LoadPictures(frontBitmapImg);
                frontBitmap.addLoadListener(function() {
                    this.drawContentsActorFront(frontBitmap, rect.x, rect.y, rect.width, rect.height);
                }.bind(this));
            }
        }

        drawContentsActorFront(bitmap, x, y, width, height) {
            this._window.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, width, height);
        }
    
        nuun_ExpTotalValue(actor) {
            if (actor.isMaxLevel()) {
                return "-------";
            } else {
                return actor.currentExp();
            }
        }
    
        nuun_ExpNextValue(actor) {
            if (actor.isMaxLevel()) {
                return "-------";
            } else {
                return actor.nextRequiredExp();
            }
        }
    
        nuun_SetContentsFontFace(data) {
            this._window.contents.fontFace = data.FontFace ? data.FontFace : $gameSystem.mainFontFace();
        }
    
        nuun_SetContentsValueFontFace(data) {
            this._window.contents.fontFace = data.ValueFontFace ? data.ValueFontFace : $gameSystem.mainFontFace();
        }

        getEquipNameVisible() {
            return params.EquipNameVisible;
        }

        getEquipIconId(index) {
            return params.EquipIcons && params.EquipIcons[index] ? params.EquipIcons[index].EquipIconId : 0;
        }
    
        isShowSlot(actor, index) {
            if (params.InvalidSlotHide) {
                return !actor.isEquipTypeSealed(actor.equipSlots()[index]);
            } else {
                return true;
            }
        }

        getDecimalMode() {
            return true;
        }

        getTempExParams() {
            return null;
        }

        tempParamsClear() {
            _tempParams.clear();
        }

        getBattlerFace(battler) {
            return null;
        }

        getStatusEval(param, actor) {
            try {
                return actor[param] ? 'detaEvalEx' : 'detaEval';
            } catch (error) {
                return 'detaEval';
            }
        }

        getStatusEvalParam(param, actor, enemy) {
            try {
                return actor[param] ? actor[param] : eval(param);
            } catch (error) {
                return eval(param);
            }
        }

        getObj(obj) {
            try {
                return obj.isActor() ? obj.actor() : obj.enemy();
            } catch (error) {
                return obj;
            }
        }

    };
    
    window.Nuun_DrawListData = Nuun_DrawListData;

    const _Window_StatusBase_drawActorName = Window_StatusBase.prototype.drawActorName;
    Window_StatusBase.prototype.drawActorName = function(actor, x, y, width) {
        if (this.nuunExTextMode) {
            this.drawText(actor.name(), x, y, width, this.nuunAlign);
        } else {
            _Window_StatusBase_drawActorName.apply(this, arguments);
        }
    };

    const _Window_Selectable_paint = Window_Selectable.prototype.paint;//修正予定
    Window_Selectable.prototype.paint = function() {
        if (this._contentsData) {
            this.clearApngImg();
        }
        _Window_Selectable_paint.apply(this, arguments);
    };

    const _Window_StatusBase_refresh = Window_StatusBase.prototype.refresh;
    Window_StatusBase.prototype.refresh = function() {
        this.setupActorImg();
        _Window_StatusBase_refresh.apply(this, arguments);
    };

    Window_StatusBase.prototype.setupActorImg = function() {
        
    };

    Window_StatusBase.prototype.clearApngImg= function() {
        try {
            for (const data of this._contentsData) {
                if (data._actorBitmap) {
                    data._actorBitmap.resetApngImg();
                }
            }
        } catch (error) {
            if (this._contentsData._actorBitmap) {
                this._contentsData._actorBitmap.resetApngImg();
            }
        }
    };

    Window_StatusBase.prototype.drawContentsBackground = function(x, y, width) {
        const rect = this.contentsRect(x, y, width);
        this.drawContentsBackgroundRect(rect);
    };
    
    Window_StatusBase.prototype.contentsRect = function(x, y, width) {
      const height = this.lineHeight() - this.rowSpacing();
      return new Rectangle(x, y + 2, width, height);
    };
      
    Window_StatusBase.prototype.drawContentsBackgroundRect = function(rect) {
      const c1 = ColorManager.itemBackColor1();
      const c2 = ColorManager.itemBackColor2();
      const x = rect.x;
      const y = rect.y;
      const w = rect.width;
      const h = rect.height;
      this.contents.gradientFillRect(x, y, w, h, c1, c2, true);
      this.contents.strokeRect(x, y, w, h, c1);
    };


    function Sprite_NuunGauge() {
        this.initialize(...arguments);
    }
      
    Sprite_NuunGauge.prototype = Object.create(Sprite_Gauge.prototype);
    Sprite_NuunGauge.prototype.constructor = Sprite_NuunGauge;
    window.Sprite_NuunGauge = Sprite_NuunGauge;
      
    Sprite_NuunGauge.prototype.initialize = function() {
        const statusType = _tempParams.getType();
        this._statusType = statusType;
        this._paramData = _tempParams.getData();
        this._exParams = _tempParams.getExParams();
        Sprite_Gauge.prototype.initialize.call(this);
        this._statusType = statusType;//再度代入
    };

    Sprite_NuunGauge.prototype.bitmapWidth = function() {
        return this._paramData._width || 128;
    };

    Sprite_NuunGauge.prototype.gaugeHeight = function() {
        return this._paramData.GaugeHeight > 0 ? this._paramData.GaugeHeight : 12;
    };

    Sprite_NuunGauge.prototype.gaugeColor1 = function() {
        switch (this._statusType) {
            case "menuexp":
                return this._paramData.Color1 >= 0 ? NuunManager.getColorCode(this._paramData.Color1) : NuunManager.getColorCode(17);
            default:
                return this._paramData.Color1 >= 0 ? NuunManager.getColorCode(this._paramData.Color1) : Sprite_Gauge.prototype.gaugeColor1.call(this);
        }
    };
      
    Sprite_NuunGauge.prototype.gaugeColor2 = function() {
        switch (this._statusType) {
            case "menuexp":
                return this._paramData.Color2 >= 0 ? NuunManager.getColorCode(this._paramData.Color2) : NuunManager.getColorCode(6);
            default:
                return this._paramData.Color2 >= 0 ? NuunManager.getColorCode(this._paramData.Color2) : Sprite_Gauge.prototype.gaugeColor2.call(this);
        }
    };

    Sprite_NuunGauge.prototype.currentValue = function() {
        if (this._battler) {
            switch (this._statusType) {
                case "menuexp":
                    return this.currentExpValue();
                default:
                    return this._paramData.DateSelect === "OrgGauge" ? this.orgGaugeValue() : Sprite_Gauge.prototype.currentValue.call(this);
            }
        }
    };
      
    Sprite_NuunGauge.prototype.currentMaxValue = function() {
        if (this._battler) {
            switch (this._statusType) {
                case "menuexp":
                    return this.currentExpMaxValue();
                default:
                    return this._paramData.DateSelect === "OrgGauge" ? this.orgGaugeMaxValue() : Sprite_Gauge.prototype.currentMaxValue.call(this);
            }
        }
    };

    Sprite_Gauge.prototype.currentExpValue = function() {
        return this._battler.isMaxLevel() ? this.currentMaxValue() : this._battler.currentExp() - this._battler.currentLevelExp();
    };

    Sprite_Gauge.prototype.currentExpMaxValue = function() {
        return this._battler.nextLevelExp() - this._battler.currentLevelExp();
    };

    Sprite_NuunGauge.prototype.label = function() {
        switch (this._statusType) {
            case "menuexp":
                return this.expLabel();
            default:
                return this._paramData.DateSelect === "OrgGauge" ? this._paramData.ParamName : Sprite_Gauge.prototype.label.call(this);
        }
    };

    Sprite_NuunGauge.prototype.drawValue = function() {
        if (this.setMoveMode) {
            this.setMoveMode();
        }
        if (this._statusType === "menuexp") {
            this.drawValueExp();
        } else {
            Sprite_Gauge.prototype.drawValue.call(this);
        }
    };

    Sprite_NuunGauge.prototype.drawValueExp = function() {
        const mode = this.expDisplayModeParam();
        if (mode === 0) {
            return;
        }
        let text = this.displyaExp();
        if (mode === 3) {
            text = this._battler.isMaxLevel() ? "100%" : text +"%";
        } else {
            text = this._battler.isMaxLevel() ? "-------" : text;
        }
        const width = this.bitmapWidth();
        const height = this.textHeight();
        this.setupValueFont();
        this.bitmap.drawText(text, 0, 0, width, height, "right");
    };

    Sprite_NuunGauge.prototype.displyaExp = function() {
        const mode = this.expDisplayModeParam();
        if (mode === 1) {
            return this._battler.nextRequiredExp();
        } else if (mode === 2) {
            return this.currentValue();
        } else if (mode === 3) {
            return NuunManager.numPercentage(this.currentValue() / this.currentMaxValue() * 100, this.expDecimalParam(), this.decimalModeParam());
        }
        return this._battler.currentExp() - this._battler.currentLevelExp();
    };

    Sprite_NuunGauge.prototype.orgGaugeValue = function() {
        const actor = this._battler.isActor() ? this._battler : null;
        const enemy = this._battler.isEnemy() ? this._battler : null;
        return eval(this._paramData.DetaEval);
    };

    Sprite_NuunGauge.prototype.orgGaugeMaxValue = function() {
        const actor = this._battler.isActor() ? this._battler : null;
        const enemy = this._battler.isEnemy() ? this._battler : null;
        return eval(this._paramData.DetaEval2);
    };

    Sprite_NuunGauge.prototype.decimalModeParam = function() {
        return true;
    };

    Sprite_NuunGauge.prototype.expDecimalParam = function() {
        return this._exParams && this._exParams.expDecimal ? this._exParams.expDecimal : params.ExpDecimal;
    };

    Sprite_NuunGauge.prototype.expDisplayModeParam = function() {
        return this._exParams && this._exParams.expDisplayMode ? this._exParams.expDisplayMode : params.ExpDisplayMode;
    };

    Sprite_NuunGauge.prototype.expLabelShowParam = function() {
        return this._exParams && this._exParams.labelShow ? this._exParams.labelShow : params.LabelShow;
    };

    Sprite_NuunGauge.prototype.expLabel = function() {
        return this.expLabelShowParam() ? this._paramData.ParamName ? this._paramData.ParamName : TextManager.expA : '';
    };

    function Sprite_NuunCircularGauge() {
        this.initialize(...arguments);
    }
      
    Sprite_NuunCircularGauge.prototype = Object.create(Sprite_NuunGauge.prototype);
    Sprite_NuunCircularGauge.prototype.constructor = Sprite_NuunCircularGauge;
    window.Sprite_NuunCircularGauge = Sprite_NuunCircularGauge;
      
    Sprite_NuunCircularGauge.prototype.initialize = function() {
        this.setCircularData();
        Sprite_NuunGauge.prototype.initialize.call(this);
    };

    Sprite_NuunCircularGauge.prototype.drawValueExp = function() {
        const mode = this.expDisplayModeParam();
        if (mode === 0) {
            return;
        }
        let text = this.displyaExp();
        if (mode === 3) {
            //text = this._battler.isMaxLevel() ? "100%" : text +"%";
            text = this._battler.isMaxLevel() ? "100" : text;
        } else if (mode === 4) {
            text = this._battler._level;
        } else {
            text = this._battler.isMaxLevel() ? "---" : text;
        }
        const width = this.circularSprite[1] ? this._circularBitmap.width : this.circularBitmapWidth();
        const height = this.circularSprite[1] ? this._circularBitmap.height : this.circularBitmapHeight();
        this.setupValueFont();
        const y = this._circularData.ShowLabel ? 6 : 0;
        this.bitmap.drawText(text, 0, y, width, height, "center");
    };

    Sprite_NuunCircularGauge.prototype.expLabel = function() {
        if (this.expLabelShowParam()) {
            return this.expDisplayModeParam() === 4 ? (this._paramData.ParamName ? this._paramData.ParamName : TextManager.levelA) : Sprite_NuunGauge.prototype.expLabel.call(this);
        } else {
            return '';
        }
    };


    function Sprite_MenuCharacter() {
        this.initialize(...arguments);
    }
      
    Sprite_MenuCharacter.prototype = Object.create(Sprite_Character.prototype);
    Sprite_MenuCharacter.prototype.constructor = Sprite_MenuCharacter;
    window.Sprite_MenuCharacter = Sprite_MenuCharacter;
      
    Sprite_MenuCharacter.prototype.initialize = function(character) {
        Sprite_Character.prototype.initialize.call(this, character);
        this._data = null;
        this._actor = null;
    };

    Sprite_MenuCharacter.prototype.setup = function(battler, data) {
        const character = new Game_Character(battler);
        const characterName = battler.characterName();
        const characterIndex = battler.characterIndex();
        character.setImage(characterName, characterIndex);
        character.setStepAnime(true);
        this._data = data;
        this._actor = battler;
        this.setCharacter(character);
    };
      
    Sprite_MenuCharacter.prototype.update = function() {
        if (this.visible) {
          Sprite_Character.prototype.update.call(this);
          this._character.updateAnimation();
          this.changePaintOpacity();
        }
    };

    Sprite_MenuCharacter.prototype.changePaintOpacity = function() {
        const battleMemberOpacity = this._data.BattleMemberOpacity !== undefined ? this._data.BattleMemberOpacity : true;
        if (battleMemberOpacity) {
            this.opacity = this._actor.isBattleMember() ? 255 : Window_Base.prototype.translucentOpacity.call(this);
        }
    };

    Sprite_MenuCharacter.prototype.updatePosition = function() {

    };
    

    function Sprite_MenuSvActor() {
        this.initialize(...arguments);
    }
      
    Sprite_MenuSvActor.prototype = Object.create(Sprite_Actor.prototype);
    Sprite_MenuSvActor.prototype.constructor = Sprite_MenuSvActor;
    window.Sprite_MenuSvActor = Sprite_MenuSvActor;
      
    Sprite_MenuSvActor.prototype.updateVisibility = function() {
        Sprite_Clickable.prototype.updateVisibility.call(this);
    };
      
    Sprite_MenuSvActor.prototype.initialize = function(battler) {
    Sprite_Actor.prototype.initialize.call(this, battler);
        this._data = null;
    };

    Sprite_MenuSvActor.prototype.setup = function(battler, data) {
        this.setBattler(battler);
        this._data = data;
    };
      
    Sprite_MenuSvActor.prototype.moveToStartPosition = function() {
        this.startMove(0, 0, 0);
    };
      
    Sprite_MenuSvActor.prototype.updateMain = function() {
        this.updateBitmap();
        this.updateFrame();
        this.updateMove();
        this.changePaintOpacity();
    };

    Sprite_MenuSvActor.prototype.changePaintOpacity = function() {
        const battleMemberOpacity = this._data.BattleMemberOpacity !== undefined ? this._data.BattleMemberOpacity : true;
        if (battleMemberOpacity) {
            this.opacity = this._actor.isBattleMember() ? 255 : Window_Base.prototype.translucentOpacity.call(this);
        }
    };
    
    Sprite_MenuSvActor.prototype.startMotion = function() {
        if (this._actor.isDead()) {
            motionType = 'dead';
        } else {
            motionType = 'walk';
        }
        Sprite_Actor.prototype.startMotion.call(this, motionType);
    };
      
    Sprite_MenuSvActor.prototype.setupWeaponAnimation = function() {
        
    };


    function Sprite_NuunActor() {
    this.initialize(...arguments);
    }
    
    Sprite_NuunActor.prototype = Object.create(Sprite.prototype);
    Sprite_NuunActor.prototype.constructor = Sprite_NuunActor;

    Sprite_NuunActor.prototype.initialize = function(_class, params) {
    Sprite.prototype.initialize.call(this);
        this._class = _class;
        this._params = params;
        this._actorImgData = new Nuun_ActorGraphics(_class);
        this.initMembers();
    };

    Sprite_NuunActor.prototype.initMembers = function() {
        this._data = null;
        this._actor = null;
        this.anchor.x = 0.5;
        this.anchor.y = 1.0;
    };

    Sprite_NuunActor.prototype.setPosition = function(x, y) {
        this.x = x + (Graphics.width - Graphics.boxWidth) / 2 + this._params.ActorImg_X + (this._data.Actor_X || 0);
        this.y = y + (Graphics.height - Graphics.boxHeight) / 2 + this._params.ActorImg_Y + (this._data.Actor_Y || 0);
    };

    Sprite_NuunActor.prototype.setup = function(actor) {
        this._actor = actor;
        this.imgSetup(actor);
        this.refresh();
    };

    Sprite_NuunActor.prototype.refresh = function() {
        this.bitmap = null;
        if (this._actorBitmap) {
            this._actorBitmap.resetApngImg();
        }
        if (this._actor) {
            this._data = this.getActorImgData(this._actor);
            if (this._data) {
                this.drawContentsImage(this._data, this._actor);
            }
        }
    };

    Sprite_NuunActor.prototype.isActorPictureEXApp = function() {
        return Imported.NUUN_ActorPicture && this._params.ActorPictureEXApp;
    };

    Sprite_NuunActor.prototype.getActorsSettingList = function() {
        return this.isActorPictureEXApp() ? NuunManager.getBattlerActors() : this._params.ActorsImgList;
    };

    Sprite_NuunActor.prototype.imgSetup = function(actor) {
        this._actorImgData.setup(actor);
    };

    Sprite_NuunActor.prototype.getGraphicName = function(data) {
        return this.isActorPictureEXApp() ? this._actorImgData.getActorGraphicImg() : data.ActorImg;
    };

    Sprite_NuunActor.prototype.drawContentsImage = function(data, actor) {
        let bitmap = null;
        if (this.isApngGraphic(data)) {
            this.createApngSprite(actor, data);
        } else {
            bitmap = this.getActorGraphicImg(data, actor);
            bitmap.addLoadListener(function() {
                this.drawActorGraphic(data, bitmap, actor);
            }.bind(this));
        }
    };

    Sprite_NuunActor.prototype.isApngGraphic = function(data) {
        const name = this.getGraphicName(data);
        return name ? isApng(name.split('pictures/')[1]) : false;
    };

    Sprite_NuunActor.prototype.createApngSprite = function(actor, data) {
        if (!this._actorBitmap) {
            const sprite = new Sprite_NuunAPngImg();
            this.addChild(sprite);
            this._actorBitmap = sprite;
        }
        const sprite = this._actorBitmap;
        sprite.setup(actor, data, data.ActorImg, this._mode);
        this.setPosition(0, 0);
    };

    Sprite_NuunActor.prototype.drawActorGraphic = function(data, bitmap, actor) {
        this.changePaintOpacity(this.isSubMemberOpacity(actor));
        this.nuun_ContentsDrawActorGraphic(data, bitmap, actor);
        this.changePaintOpacity(true);
    };

    Sprite_NuunActor.prototype.nuun_ContentsDrawActorGraphic = function(data, bitmap, actor) {
        this.bitmap = bitmap;
        this.setPosition(this.getActorPosition(), Graphics.height);
    };

    Sprite_NuunActor.prototype.getActorGraphicImg = function(data, actor) {
        return this.isActorPictureEXApp() ? this._actorImgData.loadActorGraphic() : ImageManager.nuun_LoadPictures(data.ActorImg);
    };

    Sprite_NuunActor.prototype.getActorId = function() {
        return this.isActorPictureEXApp() ? 'actorId' : 'ActorId';
    };

    Sprite_NuunActor.prototype.changePaintOpacity = function(enabled) {
        this.paintOpacity = enabled ? 255 : Window_Base.prototype.translucentOpacity.call(this);
    };

    Sprite_NuunActor.prototype.isSubMemberOpacity = function(actor) {
        return this._class.isSubMemberOpacity ? this._class.isSubMemberOpacity(actor) : true;
    };

    Sprite_NuunActor.prototype.getActorImgData = function(actor) {
        const list = this.getActorsSettingList();
        return list.find(data => this.condActorImg(data, actor));
    };
    
    Sprite_NuunActor.prototype.condActorImg = function(data, actor) {
        if (data[this.getActorId()] === actor.actorId() && actor._classId === data.ClassId) {
            return true;
        } else if (data.ClassId === 0 && data[this.getActorId()] === actor.actorId()) {
            return true;
        } else if (data[this.getActorId()] === 0 && actor._classId === data.ClassId) {
            return true;
        }
        return false;
    };
    
    Sprite_NuunActor.prototype.getActorPosition = function() {
        switch (this._params.ActorPosition) {
            case 'Left':
                return 0;
            case 'Center':
                return Math.floor(Graphics.width / 2);
            case 'Right':
                return Graphics.width;
            default:
                return 0;
        }
    };

    window.Sprite_NuunActor = Sprite_NuunActor;

    function Sprite_DynamicName() {
        this.initialize(...arguments);
    }
      
    Sprite_DynamicName.prototype = Object.create(Sprite_Name.prototype);
    Sprite_DynamicName.prototype.constructor = Sprite_DynamicName;
      
    Sprite_DynamicName.prototype.initialize = function() {
        this._paramData = _tempParams.getData();
        Sprite_Name.prototype.initialize.call(this);
    };
      
    Sprite_DynamicName.prototype.bitmapWidth = function() {
        return this._paramData.ItemWidth > 0 ? this._paramData.ItemWidth : 128;
    };
      
    Sprite_DynamicName.prototype.bitmapHeight = function() {
        return 26;
    };
      
    Sprite_DynamicName.prototype.fontSize = function() {
        return $gameSystem.mainFontSize() +  (this._paramData.FontSize || 0);
    };
      
    Sprite_DynamicName.prototype.fontFace = function() {
        return this._paramData.FontFace ? this._paramData.FontFace : Sprite_Name.prototype.fontFace.call(this);
    };
      
    Sprite_DynamicName.prototype.redraw = function() {
        const name = this.name();
        const width = this.bitmapWidth();
        const height = this.bitmapHeight();
        this.setupFont();
        this.bitmap.clear();
        this.bitmap.drawText(name, 0, 0, width, height, (this._paramData.Align || 'left'));
    };

    window.Sprite_DynamicName = Sprite_DynamicName;

    function Sprite_DynamicParam() {
        this.initialize(...arguments);
    }
      
    Sprite_DynamicParam.prototype = Object.create(Sprite.prototype);
    Sprite_DynamicParam.prototype.constructor = Sprite_DynamicParam;
      
    Sprite_DynamicParam.prototype.initialize = function() {
        this._type = _tempParams.getType();
        this._paramData = _tempParams.getData();
        Sprite.prototype.initialize.call(this);
        this.initMembers();
        this.createBitmap();
    };
      
    Sprite_DynamicParam.prototype.initMembers = function() {
        this._battler = null;
        this._textColor = "";
    };
      
    Sprite_DynamicParam.prototype.setup = function(battler) {
        this._battler = battler;
        this.updateBitmap();
    };
      
    Sprite_DynamicParam.prototype.destroy = function(options) {
        this.bitmap.destroy();
        Sprite.prototype.destroy.call(this, options);
    };
      
    Sprite_DynamicParam.prototype.update = function() {
        Sprite.prototype.update.call(this);
        this.updateBitmap();
    };
      
      
    Sprite_DynamicParam.prototype.createBitmap = function() {
        const width = this.bitmapWidth();
        const height = this.bitmapHeight();
        this.bitmap = new Bitmap(width, height);
    };
      
    Sprite_DynamicParam.prototype.bitmapWidth = function() {
        return this._paramData.ItemWidth > 0 ? this._paramData.ItemWidth : 128;
    };
      
    Sprite_DynamicParam.prototype.bitmapHeight = function() {
        return 26;
    };

    Sprite_DynamicParam.prototype.currentValue = function() {
        switch (this._type) {
            case "detaEvalEx":
                return this._battler[DetaEval1];
            case "detaEval":
                const acotr = this._battler.isActor() ? this._battler : null;
                const enemy = this._battler.isEnemy() ? this._battler : null;
                return eval(this._paramData.DetaEval1);
            case "turn":
                return Math.max(1, this._battler.turnCount());
        }
    };
      
    Sprite_DynamicParam.prototype.updateBitmap = function() {
        const _param = eval(this.currentValue());
        if (this._paramValue !== _param) {
            this._paramValue = _param;
            this.redraw();
        }
    };
      
    Sprite_DynamicParam.prototype.redraw = function() {
        const paramName = this._paramData.ParamName ? this._paramData.ParamName : '';
        const width = this.bitmapWidth();
        const height = this.bitmapHeight();
        this.bitmap.clear();
        this.setupNameFont();
        const textWidth = Math.max(60 , this.bitmap.measureTextWidth(paramName));
        this.bitmap.drawText(paramName, 0, 0, width - textWidth, height);
        this.setupValueFont();
        this.bitmap.drawText(this.currentValue(), textWidth + 8, 0, width - (textWidth + 8), height, 'right');
    };

    Sprite_DynamicParam.prototype.setupNameFont = function() {
        this.bitmap.fontFace = this.nameFontFace();
        this.bitmap.fontSize = this.nameFontSize();
        this.bitmap.textColor = this.systemColor();
    };

    Sprite_DynamicParam.prototype.setupValueFont = function() {
        this.bitmap.fontFace = this.valueFontFace();
        this.bitmap.fontSize = this.nameFontSize();
        this.bitmap.textColor = this.valueColor();
    };

    Sprite_DynamicParam.prototype.systemColor = function() {
        return NuunManager.getColorCode(this._paramData.NameColor);
    };
      
    Sprite_DynamicParam.prototype.nameFontSize = function() {
        return $gameSystem.mainFontSize() +  (this._paramData.FontSize || 0);
    };
      
    Sprite_DynamicParam.prototype.nameFontFace = function() {
        return this._paramData.FontFace ? this._paramData.FontFace : Sprite_Name.prototype.fontFace.call(this);
    };
    
    Sprite_DynamicParam.prototype.valueColor = function() {
        return ColorManager.normalColor();
    };
    
    Sprite_DynamicParam.prototype.valueFontFace = function() {
        return this._paramData.alueFontFace ? this._paramData.alueFontFace : $gameSystem.mainFontFace();
    };

    window.Sprite_DynamicParam = Sprite_DynamicParam;

    const _Window_createContentsSprite = Window.prototype._createContentsSprite;
    Window.prototype._createContentsSprite = function() {
        this._nuunGraphicsSprite = new Sprite();
        this._clientArea.addChild(this._nuunGraphicsSprite);
        _Window_createContentsSprite.apply(this, arguments);
    };

    function _initNoData(actor) {
        return {
            Actor_X: 0, 
            Actor_Y: 0, 
            Actor_Scale: 100, 
            ActorBackImg: null,
            ActorFrontImg: null, 
            ActorImg: null,
            FaceIndex : actor.faceIndex(),
            FaceImg: actor.faceName()
        }
    }
    
})();