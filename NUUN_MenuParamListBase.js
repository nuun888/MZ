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
 * @version 1.0.0
 * 
 * @help
 * This is the base plugin for plugins that customize menu screens.
 * Please set it above a compatible plugin.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
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
 * @version 1.0.0
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
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

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
            this.language_Jp = $gameSystem.isJapanese();
            this.loadCheckBitmap();
        }
    
        setList(list) {
            this._list = list;
        }

        getStatusParamsList() {
            return [];
        }

        getActorsSettingList() {
            return this._params.ActorsImgList;
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
            return this._list;
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
            const data = this.getActorImgData(actor);
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

        drawItemImg(actor, index) {
            if (actor) {
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
                    this.drawActorGraphic(data, bitmap, index, rect.x, rect.y, rect.width, rect.height, actor);
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
                this.nuun_ActorFace(data, x, y, width, height, actor);
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

        getActorImgData(actor) {
            const list = this.getActorsSettingList();
            return list.find(data => this.condActorImg(data, actor));
        }

        condActorImg(data, actor) {
            if (this.isActorPictureEXApp()) {
                return data.actorId === actor.actorId();
            } else {
                if (data.ActorId === actor.actorId() && actor._classId === data.ClassId) {
                    return true;
                } else if (data.ClassId === 0 && data.ActorId === actor.actorId()) {
                    return true;
                } else if (data.ActorId === 0 && actor._classId === data.ClassId) {
                    return true;
                }
            }
            return false;
        }

        getFaceImg(actor) {
            return this.isActorPictureEXApp() ? actor.loadActorFace() : ImageManager.loadFace(actor.faceName());
        }

        getActorGraphicImg(data, actor) {
            return this.isActorPictureEXApp() ? actor.loadActorGraphic() : ImageManager.nuun_LoadPictures(data.ActorImg);
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
            loadBitmap = this.getFaceImg(actor);
            if (loadBitmap && !loadBitmap.isReady()) {
                bitmap = loadBitmap;
            }
            const data = this.getActorImgData(actor);
            if (data && this.getActorGraphicImg(data, actor)) {
                loadBitmap = this.getActorGraphicImg(data, actor);
                if (loadBitmap && !loadBitmap.isReady()) {
                    bitmap = loadBitmap;
                }
                loadBitmap = ImageManager.nuun_LoadPictures(data.ActorFrontImg);
                if (loadBitmap && !loadBitmap.isReady()) {
                    bitmap = loadBitmap;
                }
            }
            return bitmap;
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
                const width = Math.min(data.ItemWidth && data.ItemWidth > 0 ? Math.min(data.ItemWidth, itemWidth) : this.widthMode(data, itemWidth), rect.width - x);
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
                const width = Math.min(data.ItemWidth && data.ItemWidth > 0 ? Math.min(data.ItemWidth, itemWidth) : this.widthMode(data.WideMode, itemWidth), rect.width - x);
                data._width = data.ItemWidth && data.ItemWidth > 0 ? Math.min(data.ItemWidth, width) : Math.min(width, 128);
                this.nuun_DrawContentsBase(data, x + rect.x, y, width, actor);
            }
        }
    
        nuun_DrawContentsBase(data, x, y, width, actor) {
            if (this.nuun_IsContents(data, actor)) {
                this.setTepmData(data, this._exParams);
                const method = 'nuun_DrawContents' + data.DateSelect;
                //try {
                    this[method](data, x, y, width, actor);
                //} catch (error) {
                //    const log = ($gameSystem.isJapanese() ? "無効なIDが設定されています。" : "An invalid ID has been configured.") + data.DateSelect;
                //    throw ["DataError", log];
                //}
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
            this.nuun_setContentsFontFace(data);
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
                w.nuun_DrawContentsParamUnitText(eval(data.DetaEval), data, x + textWidth + padding, y, width - (textWidth + padding));
                //this.drawText(eval(data.DetaEval), x + textWidth + padding, y, width - (textWidth + padding), data.Align);
            }
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
    
        nuun_DrawContentsExpGauge(data, x, y, width, actor) {
            this.setTepmData("menuexp", this.getTempExParams());
            this.nuun_PlaceGauge(actor, "menuexp", x, y, "menuExp-%1");
        }

        nuun_DrawContentsHpCircularGauge(data, x, y, width, actor) {setTempExParams()
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
    
        nuun_DrawContentsExpCircularGauge(data, x, y, width, actor) {
            this.setTepmData("menuexp", this.getTempExParams());
            this.nuun_placeCircularGauge(actor, "menuexp", x, y, "menuExp-%1");
        }
    
        nuun_DrawContentsOrgGauge(data, x, y, width, actor) {
            this.setTempType(data.GaugeID);
            this.nuun_PlaceGauge(actor, data.GaugeID, x, y, "actor%1-gauge-%2");
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

        nuun_DrawContentsFreeText(data, x, y, width, actor) {
            this._window.drawTextEx(data.Text, x, y, width);
        }

        nuun_DrawContentsFace(data, x, y, width, actor) {
            let bitmap = null;
            if (this._window.isActorPictureEXApp()) {
                bitmap = actor.loadActorFace();
            } else {
                bitmap = ImageManager.loadFace(actor.faceName());
            }
            const rect = this._window.itemRect(0);
            bitmap.addLoadListener(function() {
                this.nuun_ActorFace(data, x, y, Math.min(width, ImageManager.faceWidth), Math.min(rect.height, ImageManager.faceHeight), actor);
            }.bind(this));
        };
    
        nuun_DrawContentsImges(data, x, y, width, actor) {
            this.nuun_DrawImg(data, x, y, actor);
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
            const textParam = (data.DetaEval ? eval(data.DetaEval) : actor.param(param));
            w.nuun_DrawContentsParamUnitText(textParam, data, x + textWidth + padding, y, width - (textWidth + padding));
        }
    
        nuun_DrawXParams(data, param, x, y, width, actor) {
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
    
        nuun_DrawSvActorImg(data, x, y, width, actor, fmt) {
            const key = fmt.format(actor.actorId());
            const sprite = this._window.createInnerSprite(key, Sprite_MenuSvActor);
            sprite.setup(actor, data);
            sprite.show();
            sprite.setHome(x + 64, y + 64);
            sprite.startMotion();
        }

        nuun_ActorFace(data, x, y, width, height, actor) {
            this._window.changePaintOpacity(this._window.isSubMemberOpacity(actor));
            if (this.isActorPictureEXApp()) {
                this._window.actorPictureEXDrawFace(actor, x, y, width, height);
            } else {
                if (actor.isRearguard && actor.isRearguard()) {
                    this._window += w.shiftWidth;
                }
                width = Math.min(ImageManager.faceWidth, width);
                this._window.drawActorFace(actor, x, y, width, height);
            }
            this._window.changePaintOpacity(true);
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
                const rect = w.itemRect(0);
                const bitmap = ImageManager.nuun_LoadPictures(data.ImgData);
                w.contents.blt(bitmap, 0, 0, rect.width, rect.height, x - w.colSpacing(), y - w.itemPadding());
            }
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
            this._window.contents.blt(bitmap, 0, 0, width, height, x, y);
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
        this._statusType = _tempParams.getType();
        this._paramData = _tempParams.getData();
        this._exParams = _tempParams.getExParams();
        Sprite_Gauge.prototype.initialize.call(this);
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
                    return  this._battler.isMaxLevel() ? this.currentMaxValue() : this._battler.currentExp() - this._battler.currentLevelExp();
                default:
                    return this._paramData.DateSelect === "OrgGauge" ? this.orgGaugeValue() : Sprite_Gauge.prototype.currentValue.call(this);
            }
        }
    };
      
    Sprite_NuunGauge.prototype.currentMaxValue = function() {
        if (this._battler) {
            switch (this._statusType) {
                case "menuexp":
                    return this._battler.nextLevelExp() - this._battler.currentLevelExp();
                default:
                    return this._paramData.DateSelect === "OrgGauge" ? this.orgGaugeMaxValue() : Sprite_Gauge.prototype.currentMaxValue.call(this);
            }
        }
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
        const actor = this._battler;
        return eval(this._paramData.DetaEval);
    };

    Sprite_NuunGauge.prototype.orgGaugeMaxValue = function() {
        const actor = this._battler;
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
        return this._params.ActorsImgList;
    };

    Sprite_NuunActor.prototype.drawContentsImage = function(data, actor) {
        let bitmap = null;
        if (isApng(data.ActorImg.split('pictures/')[1])) {
            this.createApngSprite(actor, data);
        } else {
            bitmap = this.getActorGraphicImg(data, actor);
            bitmap.addLoadListener(function() {
                this.drawActorGraphic(data, bitmap, actor);
            }.bind(this));
        }
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
        return this.isActorPictureEXApp() ? actor.loadActorGraphic() : ImageManager.nuun_LoadPictures(data.ActorImg);
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
        if (this.isActorPictureEXApp()) {
            return data.ActorId === actor.actorId();
        } else {
            if (data.ActorId === actor.actorId() && actor._classId === data.ClassId) {
                return true;
            } else if (data.ClassId === 0 && data.ActorId === actor.actorId()) {
                return true;
            } else if (data.ActorId === 0 && actor._classId === data.ClassId) {
                return true;
            }
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