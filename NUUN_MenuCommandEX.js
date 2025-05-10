/*:-----------------------------------------------------------------------------------
 * NUUN_MenuCommandEX.js
 * 
 * Copyright (C) 2023 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Menu command display EX
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @url https://github.com/nuun888/MZ/blob/master/README/MenuCommandEX.md
 * @version 1.2.2
 * 
 * @help
 * Any background image or command image can be displayed on the menu command.
 * 
 * Prerequisite plugin
 * NUUN_MenuScreenEX or NUUN_MenuScreenEXBase
 * https://github.com/nuun888/MZ/blob/master/README/MenuScreen_default.md
 * Placed below the above plugins.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 5/11/2025 Ver.1.2.2
 * Fixed an issue where commands would not move if the movement frame count was set to 61 or more.
 * 8/19/2024 Ver.1.2.1
 * Fixed an issue where hiding the cursor when selecting a target was not working.
 * 8/18/2024 Ver.1.2.0
 * Added a function to specify an image when selection is disabled.
 * Added a function to set the opacity of the image when selection is disabled.
 * 1/7/2024 Ver.1.1.4
 * Fixed by updating menu screen Ver.3.0.0.
 * 2/24/2023 Ver.1.1.3
 * Fixed an issue where commands would move after selecting an actor and pressing cancel to return to menu commands.
 * 1/22/2023 Ver.1.1.2
 * Fixed to load all images when menu command is displayed.
 * 1/8/2023 Ver.1.1.1
 * Fixed the problem that command coordinates are displayed shifted when command sorting is enabled.
 * 1/4/2023 Ver.1.1.0
 * Added a function to adjust the width, height and coordinates of each content background image for each command.
 * 1/3/2023 Ver.1.0.1
 * Added command sort function.
 * 1/3/2023 Ver.1.0.0
 * First edition.
 * 
 * @param MenuCommandSetting
 * @text Menu command setting
 * @desc Set menu commands.
 * @type struct<MenuCommandList>[]
 * @default []
 * 
 * @param ContentsWidth
 * @desc Content width.
 * @text Content width
 * @type number
 * @default 0
 * 
 * @param ContentsHeight
 * @desc Content height.
 * @text Content height.
 * @type number
 * @default 0
 * 
 * @param SelectOnFlash
 * @text Hide cursor when target is selected
 * @desc Does not display the cursor when selecting targets.
 * @type boolean
 * @default false
 * 
 * @param HideCommandName
 * @text Hide command name
 * @desc Do not display command names.
 * @type boolean
 * @default false
 * 
 * @param CommandSort
 * @text Command sort enabled
 * @desc Display commands in order of setting.
 * @type boolean
 * @default false
 * 
 * @param CommandZeroPosition
 * @text command coordinate 0
 * @desc Makes all command coordinates from the index origin to the upper left origin of the window.
 * @type boolean
 * @default false
 * 
 * @param CommandEffectSetting
 * @text Command effect settings
 * @default ------------------------------
 * 
 * @param SelectContentsX
 * @desc The X coordinate of the command when the command is selected. (relative)
 * @text X coordinate when command is selected
 * @type number
 * @min -9999
 * @default 0
 * @parent CommandEffectSetting
 * 
 * @param SelectContentsY
 * @desc The Y coordinate of the command when the command is selected. (relative)
 * @text Y coordinate when command is selected
 * @type number
 * @min -9999
 * @default 0
 * @parent CommandEffectSetting
 * 
 * @param SelectContentsDuration
 * @desc The number of frames to move when selecting a command.
 * @text Number of moving frames
 * @type number
 * @min 1
 * @default 10
 * @parent CommandEffectSetting
 * 
 */
/*~struct~MenuCommandList:
 * 
 * @param CommandName
 * @text Command name
 * @desc Specifies the name of the command to apply.
 * @type string
 * @default
 * 
 * @param CommandSymbol
 * @text Symbol name
 * @desc Specifies the command symbol name to apply.
 * @type combo
 * @default
 * 
 * @param ContentsX
 * @desc X coordinate of the command. (relative)
 * @text Command X coordinate
 * @type number
 * @min -9999
 * @default 0
 * 
 * @param ContentsY
 * @desc Y coordinate of the command. (relative)
 * @text Command Y coordinate
 * @type number
 * @min -9999
 * @default 0
 * 
 * @param EnabledOpacity
 * @desc Opacity when not selectable.
 * @text Unselectable Opacity
 * @type number
 * @default 255
 * 
 * @param ContentsBackSetting
 * @text Content background setting
 * @default ------------------------------
 * 
 * @param ContentsBackGroundImg
 * @desc Specifies the content background image file name.
 * @text Content background image
 * @type file
 * @dir img/
 * @default 
 * @parent ContentsBackSetting
 * 
 * @param SelectContentsBackGroundImg
 * @desc Specifies the content background image file name when the cursor is selected.
 * @text Content background image when cursor is selected
 * @type file
 * @dir img/
 * @default 
 * @parent ContentsBackSetting
 * 
 * @param NoSelectContentsBackGroundImg
 * @desc Specifies the file name of the background image for non-selectable content.
 * @text Unselectable content background image
 * @type file
 * @dir img/
 * @default 
 * @parent ContentsBackSetting
 * 
 * @param ContentsImgX
 * @desc X coordinate of command background image. (relative)
 * @text Command background image X coordinate
 * @type number
 * @min -9999
 * @default 0
 * 
 * @param ContentsImgY
 * @desc Y coordinate of command background image. (relative)
 * @text Command background image Y coordinate
 * @type number
 * @min -9999
 * @default 0
 * 
 * @param ContentsWidth
 * @desc Content width for each command.
 * @text Content width
 * @type number
 * @default 0
 * 
 * @param ContentsHeight
 * @desc Content height for each command.
 * @text Content height
 * @type number
 * @default 0
 * 
 * @param CommandImgSetting
 * @text Command image setting
 * @default ------------------------------
 * 
 * @param CommandImg
 * @desc Specifies the command image file name.
 * @text Command image
 * @type file
 * @dir img/
 * @default 
 * @parent CommandImgSetting
 * 
 * @param CommandImgX
 * @desc X coordinate of the command image. (relative)
 * @text Command image X coordinate
 * @type number
 * @min -9999
 * @default 0
 * @parent CommandImgSetting
 * 
 * @param CommandImgY
 * @desc Y coordinate of the command image. (relative)
 * @text Command image Y coordinate
 * @type number
 * @min -9999
 * @default 0
 * @parent CommandImgSetting
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc メニューコマンド表示EX
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @url https://github.com/nuun888/MZ/blob/master/README/MenuCommandEX.md
 * @version 1.2.2
 * 
 * @help
 * メニューコマンドに任意の背景画像、コマンド画像を表示することができます。
 * 
 * 前提プラグイン
 * NUUN_MenuScreenEXまたはNUUN_MenuScreenEXBase
 * https://github.com/nuun888/MZ/blob/master/README/MenuScreen_default.md
 * 上記プラグインよりも下に配置。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2025/5/11 Ver.1.2.2
 * 移動フレーム数を61以上に設定するとコマンドが移動しない問題を修正。
 * 2024/8/19 Ver.1.2.1
 * 対象選択時カーソル非表示が機能していなかった問題を修正。
 * 2024/8/18 Ver.1.2.0
 * 選択不可時の画像を指定できる機能を追加。
 * 選択不可時の画像の不透明度を設定できる機能を追加。
 * 2024/1/7 Ver.1.1.4
 * メニュー画面Ver.3.0.0更新による修正。
 * 2023/2/24 Ver.1.1.3
 * アクター選択後キャンセルを押しメニューコマンドに戻る際に、コマンドが動く問題を修正。
 * 2023/1/22 Ver.1.1.2
 * 画像を全てメニューコマンド表示時に読み込むように修正。
 * 2023/1/8 Ver.1.1.1
 * コマンドソート有効をONにしたときに、コマンドの座標がずれて表示される問題を修正。
 * 2023/1/4 Ver.1.1.0
 * コマンド毎に横幅、高さ及び各コンテンツ背景画像の座標を調整できる機能を追加。
 * 2023/1/3 Ver.1.0.1
 * コマンドのソート機能を追加。
 * 2023/1/3 Ver.1.0.0
 * 初版。
 * 
 * @param MenuCommandSetting
 * @text メニューコマンド設定
 * @desc メニューコマンドの設定を行います。
 * @type struct<MenuCommandList>[]
 * @default []
 * 
 * @param ContentsWidth
 * @desc コンテンツ横幅。
 * @text 横幅
 * @type number
 * @default 0
 * 
 * @param ContentsHeight
 * @desc コンテンツ縦幅。
 * @text 縦幅
 * @type number
 * @default 0
 * 
 * @param SelectOnFlash
 * @text 対象選択時カーソル非表示
 * @desc 対象選択時のカーソルを表示しません。
 * @type boolean
 * @default false
 * 
 * @param HideCommandName
 * @text コマンド名非表示
 * @desc コマンド名を表示させません。
 * @type boolean
 * @default false
 * 
 * @param CommandSort
 * @text コマンドソート有効
 * @desc コマンドを設定順に表示させます。
 * @type boolean
 * @default false
 * 
 * @param CommandZeroPosition
 * @text コマンド座標0
 * @desc 全てのコマンド座標をインデックス起点からウィンドウ左上起点にします。
 * @type boolean
 * @default false
 * 
 * @param EnabledOpacity
 * @desc 選択できない時の不透明度。
 * @text 選択不可時不透明度
 * @type number
 * @default 255
 * 
 * @param CommandEffectSetting
 * @text コマンドエフェクト設定
 * @default ------------------------------
 * 
 * @param SelectContentsX
 * @desc コマンド選択時のコマンドのX座標。(相対)
 * @text コマンド選択時X座標
 * @type number
 * @min -9999
 * @default 0
 * @parent CommandEffectSetting
 * 
 * @param SelectContentsY
 * @desc コマンド選択時のコマンドのY座標。(相対)
 * @text コマンド選択時Y座標
 * @type number
 * @min -9999
 * @default 0
 * @parent CommandEffectSetting
 * 
 * @param SelectContentsDuration
 * @desc コマンド選択時の移動フレーム数。
 * @text 移動フレーム数
 * @type number
 * @min 1
 * @default 10
 * @parent CommandEffectSetting
 * 
 */
/*~struct~MenuCommandList:ja
 * 
 * @param CommandName
 * @text コマンド名
 * @desc 適用させるコマンド名を指定します。
 * @type string
 * @default
 * 
 * @param CommandSymbol
 * @text シンボル名
 * @desc 適用させるコマンドシンボル名を指定します。
 * @type combo
 * @default
 * 
 * @param ContentsX
 * @desc コマンドのX座標。(相対)
 * @text コマンドX座標
 * @type number
 * @min -9999
 * @default 0
 * 
 * @param ContentsY
 * @desc コマンドのY座標。(相対)
 * @text コマンドY座標
 * @type number
 * @min -9999
 * @default 0
 * 
 * @param ContentsBackSetting
 * @text コンテンツ背景設定
 * @default ------------------------------
 * 
 * @param ContentsBackGroundImg
 * @desc コンテンツ背景画像ファイル名を指定します。
 * @text コンテンツ背景画像
 * @type file
 * @dir img/
 * @default 
 * @parent ContentsBackSetting
 * 
 * @param SelectContentsBackGroundImg
 * @desc カーソル選択時のコンテンツ背景画像ファイル名を指定します。
 * @text カーソル選択時コンテンツ背景画像
 * @type file
 * @dir img/
 * @default 
 * @parent ContentsBackSetting
 * 
 * @param NoSelectContentsBackGroundImg
 * @desc 選択不可のコンテンツ背景画像ファイル名を指定します。
 * @text 選択不可コンテンツ背景画像
 * @type file
 * @dir img/
 * @default 
 * @parent ContentsBackSetting
 * 
 * @param ContentsImgX
 * @desc コマンド背景画像のX座標。(相対)
 * @text コマンド背景画像X座標
 * @type number
 * @min -9999
 * @default 0
 * 
 * @param ContentsImgY
 * @desc コマンド背景画像のY座標。(相対)
 * @text コマンド背景画像Y座標
 * @type number
 * @min -9999
 * @default 0
 * 
 * @param ContentsWidth
 * @desc コマンド毎のコンテンツ横幅。
 * @text 横幅
 * @type number
 * @default 0
 * 
 * @param ContentsHeight
 * @desc コマンド毎のコンテンツ縦幅。
 * @text 縦幅
 * @type number
 * @default 0
 * 
 * @param CommandImgSetting
 * @text コマンド画像設定
 * @default ------------------------------
 * 
 * @param CommandImg
 * @desc コマンド画像ファイル名を指定します。
 * @text コマンド画像
 * @type file
 * @dir img/
 * @default 
 * @parent CommandImgSetting
 * 
 * @param CommandImgX
 * @desc コマンド画像のX座標。(相対)
 * @text コマンド画像X座標
 * @type number
 * @min -9999
 * @default 0
 * @parent CommandImgSetting
 * 
 * @param CommandImgY
 * @desc コマンド画像のY座標。(相対)
 * @text コマンド画像Y座標
 * @type number
 * @min -9999
 * @default 0
 * @parent CommandImgSetting
 * 
 */

var Imported = Imported || {};
Imported.NUUN_MenuCommandEX = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const parameters = PluginManager.parameters('NUUN_MenuCommandEX');

    const _Window_MenuCommand_initialize = Window_MenuCommand.prototype.initialize;
    Window_MenuCommand.prototype.initialize = function(rect) {
        if (Imported.NUUN_MenuScreenEX || Imported.NUUN_MenuScreenEXBase) {
            
        } else {
            const log = ($gameSystem.isJapanese() ? "NUUN_MenuScreenEXまたはNUUN_MenuScreenEXBaseが見つかりません。" : "NUUN_MenuScreenEX or NUUN_MenuScreenEXBase not found.");
            throw ["PluginError", log];
        }
        this._commandSprite = [];
        this.loadCommandBitmap();
        _Window_MenuCommand_initialize.call(this, rect);
    };

    Window_MenuCommand.prototype.loadCommandBitmap = function() {
        for (const data of params.MenuCommandSetting) {
            if (data.ContentsBackGroundImg) {
                ImageManager.nuun_LoadPictures(data.ContentsBackGroundImg)
            }
            if (data.SelectContentsBackGroundImg) {
                ImageManager.nuun_LoadPictures(data.SelectContentsBackGroundImg)
            }
            if (data.NoSelectContentsBackGroundImg) {
                ImageManager.nuun_LoadPictures(data.NoSelectContentsBackGroundImg)
            }
            if (data.CommandImg) {
                ImageManager.nuun_LoadPictures(data.CommandImg)
            }
        }
    };

    Window_MenuCommand.prototype.getMenuCommandEX = function(index) {
        return params.MenuCommandSetting.find(data => data.CommandName === this.commandName(index));
    };

    Window_MenuCommand.prototype.itemWidth = function() {
        return params.ContentsWidth > 0 ? params.ContentsWidth : Window_Selectable.prototype.itemWidth.call(this);
    };
    
    Window_MenuCommand.prototype.itemHeight = function() {
        return params.ContentsHeight > 0 ? params.ContentsHeight : Window_Selectable.prototype.itemHeight.call(this);
    };

    Window_MenuCommand.prototype.menuCommandExData = function(index) {
        return params.MenuCommandSetting[this._list[index].commandEXId];
    };

    Window_MenuCommand.prototype.isCurrentCommandEx = function(index) {
        return this.commandSymbol(index) === this.currentSymbol();
    };

    Window_MenuCommand.prototype.select = function(index) {
        Window_Selectable.prototype.select.call(this, index);
        this.refresh();
    };

    const _Window_MenuCommand_makeCommandList = Window_MenuCommand.prototype.makeCommandList;
    Window_MenuCommand.prototype.makeCommandList = function() {
        _Window_MenuCommand_makeCommandList.call(this);
        //this.refreshCommandList();
    };

    Window_MenuCommand.prototype.refreshCommandList = function() {
        const newList = [];
        const normalList = [];
        this._list.forEach((data, index) => {
            const find = params.MenuCommandSetting.findIndex(command => command.CommandName === data.name || command.CommandSymbol === data.symbol);
            data.commandEXId = find;
            if (params.CommandSort) {
                if (find >= 0) {
                    newList[find] = data;
                } else {
                    normalList.push(data);
                }
            }
        });
        if (params.CommandSort) {
            this._list = newList.concat(normalList).filter(list => !!list);
        }
        this.setCommandSprite();
    };

    Window_MenuCommand.prototype.setCommandSprite = function() {
        this._list.forEach((data, index) => {
            if (!this._commandSprite[index]) {
                const sprite = new Sprite_MenuCommand(this.menuCommandExData(index));
                this._contentsBackSprite.addChild(sprite);
                this._commandSprite[index] = sprite;
            }
            if (this._commandSprite[index]) {
                const lastSymbol = Window_MenuCommand._lastCommandSymbol;
                const rect = this.itemRect(index);
                this._commandSprite[index].setup(rect.x, rect.y, this.menuCommandExData(index), this.currentSymbol(), lastSymbol);
            }
        });
    };

    const _Window_Selectable_paint = Window_Selectable.prototype.paint;
    Window_Selectable.prototype.paint = function() {
        const className = String(this.constructor.name);
        if (className === 'Window_MenuCommand') {
            this.refreshCommandList();
        }
        _Window_Selectable_paint.call(this);
    };

    Window_MenuCommand.prototype.hideGaugeSprite = function() {
        for (const sprite of Object.values(this._commandSprite)) {
            sprite.hide();
        }
    };

    Window_MenuCommand.prototype.itemRect = function(index) {
        const rect = Window_Selectable.prototype.itemRect.call(this, index);
        const data = this.menuCommandExData(index);
        if (data) {
            rect.x = (params.CommandZeroPosition ? 0 : rect.x) + data.ContentsX;
            rect.y = (params.CommandZeroPosition ? 0 : rect.y) + data.ContentsY;
            rect.width = data.ContentsWidth > 0 ? data.ContentsWidth - this.colSpacing() : rect.width;
            rect.height = data.ContentsHeight > 0 ? data.ContentsHeight - this.rowSpacing() : rect.height;
        }
        return rect;
    };

    Window_MenuCommand.prototype.drawItem = function(index) {
        const data = this.menuCommandExData(index);
        if (!data || data && !params.HideCommandName) {
            Window_Command.prototype.drawItem.call(this, index);
        }
        if (data) {
            this.drawItemImg(data, index);
        }
    };

    Window_MenuCommand.prototype.drawItemImg = function(data, index) {
        const img = data.CommandImg;
        if (img) {
            const bitmap = ImageManager.nuun_LoadPictures(img);
            bitmap.addLoadListener(function() {
                this.drawContentsItemImg(bitmap, data, index);
            }.bind(this));
        }
    };

    Window_MenuCommand.prototype.drawContentsItemImg = function(bitmap, data, index) {
        const rect = this.itemRect(index);
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.contents.blt(bitmap, 0, 0, rect.width, rect.height, rect.x + (data.CommandImgX || 0), rect.y + (data.CommandImgY || 0));
    };

    Window_MenuCommand.prototype.drawItemBackground = function(index) {
        const sprite = this._commandSprite[index];
        const image = this.getBackgroundImg(index);
        if (sprite) {
            const rect = this.itemRect(index);
            sprite.setBitmap(ImageManager.nuun_LoadPictures(image));
            sprite.setPosition(rect.x, rect.y);
            if (this.isCurrentCommandEx(index)) {
                sprite.moveCommand();
            } else {
                sprite.resetMoveCommand();
            }
            sprite.opacity = this.isCommandEnabled(index) ? 255 : params.EnabledOpacity;
        }
        if (!image) {
            Window_Selectable.prototype.drawItemBackground.call(this, index);
        }
    };

    Window_MenuCommand.prototype.getBackgroundImg = function(index) {
        const data = this.menuCommandExData(index);
        if (data) {
            if (!this.isCommandEnabled(index) && data.NoSelectContentsBackGroundImg) {
                return data.NoSelectContentsBackGroundImg;
            } else if (this.isCurrentCommandEx(index) && data.SelectContentsBackGroundImg) {
                return data.SelectContentsBackGroundImg;
            } else if (data.ContentsBackGroundImg) {
                return data.ContentsBackGroundImg;
            }
        }
        return null;
    };

    Window_MenuCommand.prototype.refreshCursor = function() {
        if (!params.SelectOnFlash) {
            Window_Selectable.prototype.refreshCursor.call(this);
        }
    };


    function Sprite_MenuCommand() {
        this.initialize(...arguments);
    }
    
    Sprite_MenuCommand.prototype = Object.create(Sprite.prototype);
    Sprite_MenuCommand.prototype.constructor = Sprite_MenuCommand;
    
    Sprite_MenuCommand.prototype.initialize = function(data) {
        Sprite.prototype.initialize.call(this);
        this._data = data;
        this.backgroundImgSprite = null;
        this._duration = 0;
        this._flashColor = [0, 0, 0, 0];
        this._flashDuration = 0;
        this._anchor.x = 0.0;
        this._anchor.y = 0.0;
        this._moveX = 0;
        this._moveY = 0;
        this._targetX = 0;
        this._targetY = 0;
        this._cursorOn = false;
        this._isMoveing = false;
    };
    
    Sprite_MenuCommand.prototype.bitmapWidth = function() {
        return this._data && this._data.ContentsWidth > 0 ? this._data.ContentsWidth : params.ContentsWidth;
    };
    
    Sprite_MenuCommand.prototype.bitmapHeight = function() {
        return this._data && this._data.ContentsHeight > 0 ? this._data.ContentsHeight : params.ContentsHeight;
    };

    Sprite_MenuCommand.prototype.setup = function(x, y, data, symbol, lastSymbol) {
        this._data = data;
        this.setPosition(x, y, symbol, lastSymbol);
    };

    Sprite_MenuCommand.prototype.setBitmap = function(bitmap) {
        if (!this.backgroundImgSprite && bitmap) {
            const sprite = new Sprite();
            this.addChild(sprite);
            this.backgroundImgSprite = sprite;
        }
        if (this.backgroundImgSprite) {
            this.backgroundImgSprite.bitmap = null;
            if (bitmap) {
                this.backgroundImgSprite.bitmap = bitmap;
            }
        }
    };

    Sprite_MenuCommand.prototype.setPosition = function(x, y, symbol, lastSymbol) {
        if (symbol !== lastSymbol) {
            x += (this._data ? this._data.ContentsImgX : 0) || 0;
            y += (this._data ? this._data.ContentsImgY : 0) || 0;
            this._homeX = x;
            this._homeY = y;
            this.x = x;
            this.y = y;
        }
    };

    Sprite_MenuCommand.prototype.moveCommand = function() {
        this._targetX = params.SelectContentsX;
        this._targetY = params.SelectContentsY;
        this._isMoveing = params.SelectContentsX !== 0 || params.SelectContentsY !== 0;
        this._cursorOn = true;
    };

    Sprite_MenuCommand.prototype.resetMoveCommand = function() {
        if (this._cursorOn) {
            this._targetX = 0;
            this._targetY = 0;
            this._isMoveing = true;
        }
        this._cursorOn = false;
    };

    Sprite_MenuCommand.prototype.isMovingDuration = function() {
        return params.SelectContentsDuration;
    };

    Sprite_MenuCommand.prototype.update = function() {
        Sprite.prototype.update.call(this);
        this.updateMoveing();
    };

    Sprite_MenuCommand.prototype.updateMoveing = function() {
        if (this._isMoveing) {
            if (this._cursorOn) {
                this._moveX = this._moveX + Math.ceil(params.SelectContentsX / this.isMovingDuration());
                this._moveY = this._moveY + Math.ceil(params.SelectContentsY / this.isMovingDuration());
                this.x = this._homeX + this._moveX;
                this.y = this._homeY + this._moveY;
                if (params.SelectContentsX > 0 && this.x >= this._homeX + this._targetX) {
                    this.x = Math.min(this.x, this._homeX + this._targetX);
                } else if (params.SelectContentsX < 0 && this.x <= this._homeX + this._targetX) {
                    this.x = Math.max(this.x, this._homeX + this._targetX);
                }
                if (params.SelectContentsY > 0 && this.y >= this._homeY + this._targetY) {
                    this.y = Math.min(this.y, this._homeY + this._targetY);
                } else if (params.SelectContentsY < 0 && this.y <= this._homeY + this._targetY) {
                    this.y = Math.max(this.y, this._homeY + this._targetY);
                }
                if (this.x === this._homeX + this._targetX && this.y === this._homeY + this._targetY) {
                    this._isMoveing = false;
                }
            } else {
                this._moveX = this._moveX - Math.ceil(params.SelectContentsX / this.isMovingDuration());
                this._moveY = this._moveY - Math.ceil(params.SelectContentsY / this.isMovingDuration());
                this.x = this._homeX + this._moveX;
                this.y = this._homeY + this._moveY;
                if (params.SelectContentsX > 0 && this.x <= this._homeX) {
                    this.x = Math.max(this.x, this._homeX);
                } else if (params.SelectContentsX < 0 && this.x >= this._homeX) {
                    this.x = Math.min(this.x, this._homeX);
                }
                if (params.SelectContentsY < 0 && this.y >= this._homeY) {
                    this.y = Math.min(this.y, this._homeY);
                } else if (params.SelectContentsY > 0 && this.y <= this._homeY) {
                    this.y = Math.max(this.y, this._homeY);
                }
                if (this.x === this._homeX && this.y === this._homeY) {
                    this._isMoveing = false;
                }
            }
        }
    };
    
})();