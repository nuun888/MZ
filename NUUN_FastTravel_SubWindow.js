/*:-----------------------------------------------------------------------------------
 * NUUN_FastTravel_SubWindow.js
 * 
 * Copyright (C) 2025 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Fast Travel Subwindow
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_MenuParamListBase
 * @base NUUN_FastTravel
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_MenuParamListBase
 * @orderAfter NUUN_FastTravel
 * @version 1.0.0
 * 
 * @help
 * Displays a window that displays information about a specific location in FastTravel.
 * This plugin is an extension plugin for "NUUN_FastTravel".
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 5/17/2025 Ver.1.0.0
 * First edition.
 * 
 * @param FastTravelSubWindowSetting
 * @text Fast Travel Sub Window Settings
 * @default ------------------------------
 * 
 * @param FastTravelSubParamList
 * @desc Configure the items in the fast travel subwindow.
 * @text Fast Travel Sub-Item Settings
 * @type struct<FastTravelSub>[]
 * @default 
 * @parent FastTravelSubWindowSetting
 * 
 * @param FastTravelSubWindowX
 * @text Fast travel subwindow X coordinate
 * @desc Sets the X coordinate of the fast travel subwindow.
 * @type number
 * @default 0
 * @min -9999
 * @parent FastTravelSubWindowSetting
 * 
 * @param FastTravelSubWindowY
 * @desc Sets the Y coordinate of the fast travel subwindow.
 * @text Fast travel subwindow Y coordinate
 * @type number
 * @default 68
 * @min -9999
 * @parent FastTravelSubWindowSetting
 * 
 * @param FastTravelSubWindowWidth
 * @desc Sets the width of the fast travel subwindow.
 * @text Fast travel subwindow width
 * @type number
 * @default 240
 * @min 0
 * @parent FastTravelSubWindowSetting
 * 
 * @param FastTravelSubWindowRows
 * @desc Sets the number of rows in the fast travel subwindow.
 * @text Fast travel subwindow rows
 * @type number
 * @default 10
 * @min 1
 * @parent FastTravelSubWindowSetting
 * 
 * @param FastTravelSubWindowVisible
 * @text Fast travel window opacity
 * @desc Makes the fast travel window opaque.
 * @type boolean
 * @default true
 * @parent FastTravelSubWindowSetting
 * 
 */
/*~struct~FastTravelSub:
 *
 * @param DateSelect
 * @text Status to display
 * @desc Specifies the status to display.
 * @type select
 * @option None
 * @value None
 * @option Nane(1)(2)(3)(4)(5)(7)(8)(9)(11)(12)(14)(15)
 * @value Name
 * @option Map name(1)(2)(3)(4)(5)(7)(8)(9)(11)(12)(14)(15)
 * @value MapName
 * @option Variable(1)(2)(3)(4)(5)(9)(11)(12)(13)(14)(15)(17)
 * @value Variable
 * @option Original parameter(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(17)(18)
 * @value OrgParam
 * @option Image (common image)(1)(2)(3)(4)(25)(26)
 * @value Imges
 * @option Free text(1)(2)(3)(4)(35)
 * @value Freetext
 * @option Sub text(1)(2)(3)(4)
 * @value SubText
 * @option Line(1)(2)(3)(4)(5)(8)
 * @value HorzLine
 * @default None
 * 
 * @param X_Position
 * @text X display col position(1)
 * @desc X display col position
 * @type number
 * @default 1
 * @min 1
 * @max 1
 * 
 * @param Y_Position
 * @desc Y display row position
 * @text Y display row position(2)
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * 
 * @param X_Coordinate
 * @text X coordinate (relative)(3)
 * @desc X coordinate (relative coordinate from X display col position)
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param Y_Coordinate
 * @text Y coordinate (relative)(4)
 * @desc Y coordinate (relative coordinate from Y display row position)
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param ItemWidth
 * @desc Item, gauge width(0 for default width)
 * @text Item, gauge width(5)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param SystemItemWidth
 * @desc Width of item name (default width at 0)
 * @text Width of item name(6)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param ParamName
 * @desc Set the item name.
 * @text Name(7)
 * @type string
 * @default
 * 
 * @param NameColor
 * @desc System color ID for system items. You can enter the color code in the text tab.
 * @text Name color(8)
 * @type color
 * @default 16
 * @min 0
 * 
 * @param Align
 * @desc Align.
 * @text Align(9)
 * @type select
 * @option Left
 * @value 'left'
 * @option Right
 * @value 'right'
 * @option Center
 * @value 'center'
 * @default 'left'
 * 
 * @param paramUnit
 * @desc Set the units.
 * @text Unit(10)
 * @type string
 * @default 
 * 
 * @param FontSize
 * @desc Font size (difference from main font)
 * @text Font size(11)
 * @type number
 * @default 0
 * @min -99
 * 
 * @param FontFace
 * @desc Sets the font for item names.
 * @text Item name font(12)
 * @type string
 * @default 
 * 
 * @param ValueFontFace
 * @desc Sets the font for parameter text.
 * @text Parameter font(13)
 * @type string
 * @default 
 * 
 * @param Icon
 * @desc Set the icon.
 * @text Icon(14)
 * @type icon
 * @default 0
 * 
 * @param IconY
 * @desc Specifies the Y coordinate to adjust the icon (relative).
 * @text Icon adjustment Y coordinate(15)
 * @type number
 * @default 2
 * @min -99
 * 
 * @param DetaEval
 * @desc Enter an evaluation formula or string.
 * @text Evaluation formula or string(javaScript)(16)
 * @type combo
 * @option '$gameVariables.value(0);//Variable'
 * @option 'item;//Item data'
 * @default 
 * 
 * @param VariableId
 * @desc Specify the variable ID.
 * @text Variable(17)
 * @type variable
 * @default 0
 * 
 * @param Decimal
 * @text Number of decimal places(18)
 * @desc The number of decimal places that can be displayed.
 * @type number
 * @default 0
 * @min 0
 * @max 99
 * 
 * @param ImgSetting
 * @text Image settings
 * @default ------------------------------
 * 
 * @param ImgData
 * @desc Specifies the image to display.
 * @text Image(25)
 * @type file
 * @dir img/
 * @default 
 * @parent ImgSetting
 * 
 * @param ImgMaxHeight
 * @desc Maximum image height (specified in number of lines) 0 for no shrinking
 * @text Maximum image height(26)
 * @type number
 * @default 0
 * @min 0
 * @parent ImgSetting
 * 
 * @param OtherSetting
 * @text Other settings
 * @default ------------------------------
 * 
 * @param Text
 * @desc Enter the text of the free text. (Text code can be used)
 * @text Free text text(35)
 * @type multiline_string
 * @default
 * @parent OtherSetting
 * 
 * @param CondSetting
 * @text Display condition settings
 * @default ------------------------------
 * 
 * @param Conditions
 * @desc Specify the conditions under which the item will be displayed. (JavaScript)
 * @text Item Conditions(all)
 * @type combo
 * @option '$gameVariables.value(0);//Variables'
 * @default 
 *
 */
/*:ja
 * @target MZ
 * @plugindesc ファストトラベルサブウィンドウ
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_MenuParamListBase
 * @base NUUN_FastTravel
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_MenuParamListBase
 * @orderAfter NUUN_FastTravel
 * @version 1.0.0
 * 
 * @help
 * ファストラベルに特定の場所の情報を表示するウィンドウを表示します。
 * このプラグインはNUUN_FastTravelの拡張プラグインです。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2025/5/17 Ver.1.0.0
 * 初版
 * 
 * @param FastTravelSubWindowSetting
 * @text ファストトラベルサブウィンドウ設定
 * @default ------------------------------
 * 
 * @param FastTravelSubParamList
 * @desc ファストトラベルサブウィンドウの項目を設定します。
 * @text ファストトラベルサブ項目設定
 * @type struct<FastTravelSub>[]
 * @default 
 * @parent FastTravelSubWindowSetting
 * 
 * @param FastTravelSubWindowX
 * @text ファストトラベルサブウィンドウX座標
 * @desc ファストトラベルサブウィンドウのX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent FastTravelSubWindowSetting
 * 
 * @param FastTravelSubWindowY
 * @desc ファストトラベルサブウィンドウのY座標
 * @text ファストトラベルサブウィンドウY座標
 * @type number
 * @default 68
 * @min -9999
 * @parent FastTravelSubWindowSetting
 * 
 * @param FastTravelSubWindowWidth
 * @desc ファストトラベルサブウィンドウの横幅。
 * @text ファストトラベルサブウィンドウ横幅
 * @type number
 * @default 240
 * @min 0
 * @parent FastTravelSubWindowSetting
 * 
 * @param FastTravelSubWindowRows
 * @desc ファストトラベルサブウィンドウの行数。
 * @text ファストトラベルサブウィンドウ行数
 * @type number
 * @default 10
 * @min 1
 * @parent FastTravelSubWindowSetting
 * 
 * @param FastTravelSubWindowVisible
 * @text ファストトラベルウィンドウ不透明化
 * @desc ファストトラベルウィンドウを不透明化する。
 * @type boolean
 * @default true
 * @parent FastTravelSubWindowSetting
 * 
 */
/*~struct~FastTravelSub:ja
 *
 * @param DateSelect
 * @text 表示する項目
 * @desc 表示する項目を指定します。
 * @type select
 * @option なし
 * @value None
 * @option 名称のみ(1)(2)(3)(4)(5)(7)(8)(9)(11)(12)(14)(15)
 * @value Name
 * @option マップ名(1)(2)(3)(4)(5)(7)(8)(9)(11)(12)(14)(15)
 * @value MapName
 * @option 変数(1)(2)(3)(4)(5)(9)(11)(12)(13)(14)(15)(17)
 * @value Variable
 * @option 独自パラメータ(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)(12)(13)(14)(15)(16)(18)
 * @value OrgParam
 * @option 画像（共通画像）(1)(2)(3)(4)(25)(26)
 * @value Imges
 * @option フリーテキスト(1)(2)(3)(4)(35)
 * @value Freetext
 * @option サブテキスト(1)(2)(3)(4)
 * @value SubText
 * @option ライン(1)(2)(3)(4)(5)(8)
 * @value HorzLine
 * @default None
 * 
 * @param X_Position
 * @text X表示列位置(1)
 * @desc X表示列位置
 * @type number
 * @default 1
 * @min 1
 * @max 4
 * 
 * @param Y_Position
 * @desc Y表示行位置
 * @text Y表示行位置(2)
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * 
 * @param X_Coordinate
 * @text X座標（相対）(3)
 * @desc X座標（X表示列位置からの相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param Y_Coordinate
 * @text Y座標（相対）(4)
 * @desc Y座標（Y表示行位置からの相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param ItemWidth
 * @desc 項目、ゲージ横幅（0でデフォルト幅）
 * @text 項目、ゲージ横幅(5)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param SystemItemWidth
 * @desc 項目名称の横幅（0でデフォルト幅）
 * @text 項目名称横幅(6)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param ParamName
 * @desc 項目の名称を設定します。
 * @text 名称(7)
 * @type string
 * @default
 * 
 * @param NameColor
 * @desc 項目名称のシステムカラーID。テキストタブでカラーコードを入力できます。
 * @text 項目名称文字色(8)
 * @type color
 * @default 16
 * @min 0
 * 
 * @param Align
 * @desc 文字揃え。
 * @text 文字揃え(9)
 * @type select
 * @option 左
 * @value 'left'
 * @option 右
 * @value 'right'
 * @option 中央
 * @value 'center'
 * @default 'left'
 * 
 * @param paramUnit
 * @desc 単位を設定します。
 * @text 単位(10)
 * @type string
 * @default 
 * 
 * @param FontSize
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ(11)
 * @type number
 * @default 0
 * @min -99
 * 
 * @param FontFace
 * @desc 項目名称のフォントを設定します。
 * @text 項目名称フォント(12)
 * @type string
 * @default 
 * 
 * @param ValueFontFace
 * @desc 数値のフォントを設定します。
 * @text 数値フォント(13)
 * @type string
 * @default 
 * 
 * @param Icon
 * @desc アイコンを設定します。
 * @text アイコン(14)
 * @type icon
 * @default 0
 * 
 * @param IconY
 * @desc アイコンを調整するY座標を指定します。(相対)
 * @text アイコン調整Y座標(15)
 * @type number
 * @default 2
 * @min -99
 * 
 * @param DetaEval
 * @desc 評価式または文字列を記入します。
 * @text 評価式or文字列(javaScript)(16)
 * @type combo
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option 'item;//アイテムデータ'
 * @default 
 * 
 * @param VariableId
 * @desc 変数IDを指定します。
 * @text 変数(17)
 * @type variable
 * @default 0
 * 
 * @param Decimal
 * @text 小数点桁数(18)
 * @desc 表示出来る小数点桁数。
 * @type number
 * @default 0
 * @min 0
 * @max 99
 * 
 * @param ImgSetting
 * @text 画像設定
 * @default ------------------------------
 * 
 * @param ImgData
 * @desc 表示する画像を指定します。
 * @text 画像(25)
 * @type file
 * @dir img/
 * @default 
 * @parent ImgSetting
 * 
 * @param ImgMaxHeight
 * @desc 画像の最大縦幅（行数で指定）0で縮小無し
 * @text 画像の最大縦幅(26)
 * @type number
 * @default 0
 * @min 0
 * @parent ImgSetting
 * 
 * @param OtherSetting
 * @text その他設定
 * @default ------------------------------
 * 
 * @param Text
 * @desc フリーテキストのテキストを記入します。(制御文字使用可能)
 * @text フリーテキストのテキスト(35)
 * @type multiline_string
 * @default
 * @parent OtherSetting
 * 
 * @param CondSetting
 * @text 表示条件設定
 * @default ------------------------------
 * 
 * @param Conditions
 * @desc 項目が表示される条件を指定します。(JavaScript)
 * @text 項目条件(all)
 * @type combo
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @default 
 *
 */

var Imported = Imported || {};
Imported.NUUN_FastTravel_SubWindow = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    const _Scene_Map_createFastTravel = Scene_Map.prototype.createFastTravel;
    Scene_Map.prototype.createFastTravel = function() {
        _Scene_Map_createFastTravel.apply(this, arguments);
        this.createFastTravelSubWindow();
    };

    Scene_Map.prototype.createFastTravelSubWindow = function() {
        const rect = this.fastTravelSubWindowRect();
        this._fastTravelSubWindow = new Window_FastTravelSub(rect);
        this.addWindow(this._fastTravelSubWindow);
        this._fastTravel.setSubWindow(this._fastTravelSubWindow);
    };

    Scene_Map.prototype.fastTravelSubWindowRect = function() {
        const wx = params.FastTravelSubWindowX;
        const wy = params.FastTravelSubWindowY;
        const ww = params.FastTravelSubWindowWidth > 0 ? Math.min(params.FastTravelSubWindowWidth, Graphics.boxWidth - wx) : Graphics.boxWidth;
        const wh = this.calcWindowHeight(params.FastTravelSubWindowRows, true);
        return new Rectangle(wx, wy, ww, wh);
    };


    Window_FastTravel.prototype.setFastTravelSubWindow = function(fastTravel) {
        if (this._setSubWindow) {
            this._setSubWindow.setFastTravel(fastTravel);
        }
    };


    function Window_FastTravelSub() {
        this.initialize(...arguments);
    }
    
    Window_FastTravelSub.prototype = Object.create(Window_Selectable.prototype);
    Window_FastTravelSub.prototype.constructor = Window_FastTravelSub;
    
    Window_FastTravelSub.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this.opacity = params.FastTravelSubWindowVisible ? 255 : 0;
        this._contentsData = new Nuun_DrawFastTravelListData(this, params);
    };

    Window_FastTravelSub.prototype.setFastTravel = function(fastTravel) {
        this.contentsBack.clear();
        this.contents.clear();
        if (fastTravel) {
            this._contentsData.setItem(fastTravel);
            this.contentsBack.clear();
            if (fastTravel.SubImgSetting) {
                this.fastTravelSunImg(fastTravel.SubImgSetting)
            }
            this.refresh();
        }
    };

    Window_FastTravelSub.prototype.fastTravelSunImg = function(list) {
        list.forEach(img => {
            if (img.SubImage) {
                const bitmap = ImageManager.nuun_LoadPictures(img.SubImage);
                bitmap.addLoadListener(function() {
                    this.drawSunImg(bitmap, img);
                }.bind(this));
            }
        });
    };

    Window_FastTravelSub.prototype.drawSunImg = function(bitmap, data) {
        if (data.SubImageHeight > 0) {
            const width = this.innerWidth - data.SubImageX;
            const height = Math.min(data.SubImageHeight, this.innerHeight - data.SubImageY);
            const scalex = Math.min(1.0, width / bitmap.width);
            const scaley = Math.min(1.0, height / bitmap.height);
            const scale = scalex > scaley ? scaley : scalex;
            const dw = Math.floor(bitmap.width * scale);
            const dh = Math.floor(bitmap.height * scale);
            const x = Math.floor(width / 2 - dw / 2) + data.SubImageX;
            const y = data.SubImageY;
            this.contentsBack.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, dw, dh);
        } else {
            this.contentsBack.blt(bitmap, 0, 0, bitmap.width, bitmap.height, data.SubImageX, data.SubImageY);
        }   
    };

    Window_FastTravelSub.prototype.refresh = function() {
        this.contents.clear();
        this._contentsData.refresh();
    };

    class Nuun_DrawFastTravelListData extends Nuun_DrawListData {
        constructor(_window, param) {
            super(_window, param);
            this._item = null;
            this._list = params.FastTravelSubParamList;
        }
    
        nuun_MaxContentsCols() {
            return 1;
        }
    
        setItem(item) {
               this._item = item;
        }
    
        refresh() {
            this.drawStatusContents(this._item);
        }
    
        drawItemImg(actor, index) {
                
        }
    
        nuun_DrawContentsMapName(data, x, y, width) {
            const w = this._window;
            if (this._item.IconIndex && this._item.IconIndex > 0) {
                const iconY = y + (w.lineHeight() - ImageManager.iconHeight) / 2;
                w.drawIcon(this._item.IconIndex, x, y + (iconY || 0));
                const iconWidth = ImageManager.iconWidth + 4;
                x += iconWidth;
                width -= iconWidth;
            }
            w.changeTextColor(NuunManager.getColorCode(data.NameColor));
            const nameText = data.ParamName ? data.ParamName : this._item.FastTravelName;
            this.nuun_SetContentsFontFace(data);
            w.drawText(nameText, x, y, width, data.Align);
        }
    
        nuun_DrawContentsOrgParam(data, x, y, width) {
            const map = $dataMap;
            const w = this._window;
            w.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
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

        nuun_DrawContentsVariable(data, x, y, width, actor) {
            const map = $dataMap;
            const w = this._window;
            w.contents.fontSize = $gameSystem.mainFontSize() + (data.FontSize || 0);
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
            if (data.VariableId > 0) {
                this.nuun_SetContentsValueFontFace(data);
                const padding = textWidth > 0 ? w.itemPadding() : 0;
                const textParam = $gameVariables.value(data.VariableId);
                if (isNaN(textParam)) {
                    w.nuun_DrawContentsParamUnitText(textParam, data, x + textWidth + padding, y, width - (textWidth + padding));
                } else {
                    const value = NuunManager.numPercentage(textParam, (data.Decimal - 2) || 0, true);
                    w.nuun_DrawContentsParamUnitText(value, data, x + textWidth + padding, y, width - (textWidth + padding));
                }       
            }
        }

        nuun_DrawContentsSubText(data, x, y, width, actor) {
            this._window.drawTextEx(this._item.SubText, x, y, width);
        }
    }
    
})();