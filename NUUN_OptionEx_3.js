/*:-----------------------------------------------------------------------------------
 * NUUN_OptionEx_3.js
 * 
 * Copyright (C) 2024 NUUN
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Option extension item style change
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_OptionEx
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_OptionEx
 * @url https://github.com/nuun888/MZ/blob/master/README/NUUN_OptionEx.md
 * @version 1.0.2
 * 
 * @help
 * Change the option items to selection type.
 * Volume, key and button settings will not be applied.
 * 
 * Terms of Use
 * Credit: Optional
 * Commercial use: Possible
 * Adult content: Possible
 * Modifications: Possible
 * Redistribution: Possible
 * Support is not available for modified versions or downloads from sources other than https://github.com/nuun888/MZ, the official forum, or authorized retailers.
 * 
 * Log
 * 2/16/2024 Ver.1.0.2
 * Added the ability to display non-selected items transparently.
 * 1/3/2024 Ver.1.0.1
 * Fixed an issue where touch controls on switches were not working.
 * 12/28/2024 Ver.1.0.0
 * First edition.
 * 
 * @param SelectValueColor
 * @text Item selected color
 * @desc Specifies the color of the selected item.
 * @type color
 * @default 17
 * @min 0
 * 
 * @param DeselectOpacity
 * @text Items not selected transparent
 * @desc Makes unselected text characters transparent.
 * @type boolean
 * @default false
 * @min 0
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc オプション拡張項目スタイル変更
 * @author NUUN
 * @base NUUN_Base
 * @base NUUN_OptionEx
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_OptionEx
 * @url https://github.com/nuun888/MZ/blob/master/README/NUUN_OptionEx.md
 * @version 1.0.2
 * 
 * @help
 * オプションの項目を選択式に変更します。
 * 音量、キー、ボタン設定は適用されません。
 * 
 * 利用規約
 * クレジット表記：任意
 * 商業利用：可能
 * 成人向け：可能
 * 改変：可能
 * 再配布：可能
 * https://github.com/nuun888/MZ、公式フォーラム、正規販売サイト以外からのダウンロード、改変済みの場合はサポートは対象外となります。
 * 
 * 更新履歴
 * 2025/2/16 Ver.1.0.2
 * 非選択項目を透明で表示させる機能を追加。
 * 2025/1/28 Ver.1.0.1
 * スイッチのタッチ操作が機能していなかった問題を修正。
 * 2024/12/28 Ver.1.0.0
 * 初版
 * 
 * @param SelectValueColor
 * @text 項目選択中色
 * @desc 選択中の項目の色を指定します。
 * @type color
 * @default 17
 * @min 0
 * 
 * @param DeselectOpacity
 * @text 項目選択外透明
 * @desc 選択以外のテキストの文字を透明化します。
 * @type boolean
 * @default false
 * @min 0
 * 
 */

var Imported = Imported || {};
Imported.NUUN_OptionEx_3 = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);

    Window_Options.prototype.drawItemBackground = function(index) {
        const symbol = this.commandSymbol(index);
        if (this.isVolumeSymbol(symbol) || this.isKeyConfig() || this.isGamePadConfig() || this.isResetSymbol(symbol)) {
            Window_Selectable.prototype.drawItemBackground.apply(this, arguments);
            return;
        }
        const data = this.getExtData(symbol);
        for (let i = 0; i < this.maxItemCols(index, data); i++) {
            const rect = this.itemOptionRect(data, index, i);
            this.drawBackgroundRect(rect);
        }
    };

    const _Window_Options_drawItem = Window_Options.prototype.drawItem;
    Window_Options.prototype.drawItem = function(index) {
        if (this.isKeyConfig() || this.isGamePadConfig()) {
            _Window_Options_drawItem.apply(this, arguments);
        } else if (this.isReset(index)) {
            this.drawReset(index);
        } else {
            const symbol = this.commandSymbol(index);
            const data = this.getExtData(symbol);
            if (this.isVolumeSymbol(symbol) || this.isResetSymbol(symbol)) {
                _Window_Options_drawItem.apply(this, arguments);
            } else if (data && data.Var > 0) {
                this.drawItemOptionVar(data, index);
            } else if (data && data.Switch > 0) {
                this.drawItemOptionSwitch(data, index);
            } else {
                this.drawItemOption(data, index);
            }
        }
    };

    Window_Options.prototype.drawItemOption = function(data, index) {
        const title = this.commandName(index);
        const rect = this.itemLineRect(index);
        const symbol = this.commandSymbol(index);
        const value = this.getConfigValueEx(symbol, data);
        const enabled = this.isCommandEnabled(index);
        this.resetTextColor();
        this.changePaintOpacity(enabled);
        this.drawText(title, rect.x, rect.y, this.titleWidth(), "left");
        for (let i = 0; i < this.maxItemCols(index, data); i++) {
            const rect2 = this.itemOptionRect(data, index, i);
            const status = this.statusBooleanText(data, i);
            if (i === 0 && !value || i === 1 && value) {
                this.changeTextColor(NuunManager.getColorCode(params.SelectValueColor || 0));
            } else {
                this.resetTextColor();
                this.changePaintOpacity(!params.DeselectOpacity);
            }
            this.drawText(status, rect2.x, rect.y, rect2.width, "center");
            this.changePaintOpacity(enabled);
            this.optionHorzLine(rect2.x, rect.y, rect2.width, (i === 0 && !value || i === 1 && value));
        };
    };

    Window_Options.prototype.drawItemOptionSwitch = function(data, index) {
        const title = this.commandName(index);
        const rect = this.itemLineRect(index);
        const symbol = this.commandSymbol(index);
        const value = this.getConfigValueEx(symbol, data);
        const enabled = this.isCommandEnabled(index);
        this.resetTextColor();
        this.changePaintOpacity(enabled);
        this.drawText(title, rect.x, rect.y, this.titleWidth(), "left");
        for (let i = 0; i < this.maxItemCols(index, data); i++) {
            const rect2 = this.itemOptionRect(data, index, i);
            const status = this.statusBooleanText(data, i);
            if (i === 0 && !value || i === 1 && value) {
                this.changeTextColor(NuunManager.getColorCode(params.SelectValueColor || 0))
            } else {
                this.resetTextColor();
                this.changePaintOpacity(!params.DeselectOpacity);
            }
            this.drawText(status, rect2.x, rect.y, rect2.width, "center");
            this.changePaintOpacity(enabled);
            this.optionHorzLine(rect2.x, rect.y, rect2.width, (i === 0 && !value || i === 1 && value));
        }
    };

    Window_Options.prototype.drawItemOptionVar = function(data, index) {
        const padding = this.itemPadding();
        const title = this.commandName(index);
        const rect = this.itemLineRect(index);
        const symbol = this.commandSymbol(index);
        const value = this.getConfigValueEx(symbol, data) || 0;
        const enabled = this.isCommandEnabled(index);
        this.resetTextColor();
        this.changePaintOpacity(enabled);
        this.drawText(title, rect.x, rect.y, this.titleWidth(), "left");
        for (let i = 0; i < this.maxItemCols(index, data); i++) {
            const rect2 = this.itemOptionRect(data, index, i);
            const status = this.statusVariablesText(data, i);
            if (i ===  value) {
                this.changeTextColor(NuunManager.getColorCode(params.SelectValueColor || 0));
            } else {
                this.resetTextColor();
                this.changePaintOpacity(!params.DeselectOpacity);
            }
            this.drawText(status, rect2.x + padding, rect.y, rect2.width - padding * 2, "center");
            this.changePaintOpacity(enabled);
            this.optionHorzLine(rect2.x, rect.y, rect2.width, (i ===  value));
        }
    };

    Window_Options.prototype.maxItemCols = function(index, data) {
        if (this.isKeyConfig()) {
            return 1;
        } else if (this.isGamePadConfig()) {
            return 1;
        } else if (data && data.Var > 0) {
            return data.OptionsStringList.length;
        } else if (data && data.Switch > 0) {
            return 2;
        } else {
            return 2;
        }
    };

    Window_Options.prototype.itemOptionRect = function(data, index, i) {
        const rect = this.itemRect(index);
        rect.width = Math.floor((rect.width - this.titleWidth()) / this.maxItemCols(index, data));
        rect.x += this.titleWidth() + i * rect.width;
        rect.width -= this.colSpacing();
        return rect;
    };

    Window_Options.prototype.titleWidth = function() {
        return Math.floor(this.itemWidth() / 3);
    };

    Window_Options.prototype.optionHorzLine = function(x, y, width, mode) {
        const lineY = y + this.lineHeight() - this.rowSpacing();
        this.contents.paintOpacity = mode ? 255 : 64;
        this.contents.fillRect(x, lineY, width, 3, NuunManager.getColorCode(0));
        this.contents.paintOpacity = 255;
    };

    Window_Options.prototype.statusBooleanText = function(data, index) {
        this.setTempdata(data);
        return this.booleanStatusText(!!index);
    };

    Window_Options.prototype.statusVariablesText = function(data, index) {
        return data.OptionsStringList[index];
    };

    Window_Options.prototype.onTouchOk = function() {
        if (this.optionValueTouch()) return;
        Window_Selectable.prototype.onTouchOk.apply(this, arguments);
    };

    Window_Options.prototype.optionValueTouch = function() {
        if (this.isKeyConfig() || this.isGamePadConfig()) return false;
        const symbol = this.commandSymbol(this.index());
        if (this.isVolumeSymbol(symbol) || symbol === "reset") return false;
        const data = this.getExtData(symbol);
        const index = this.optionContentsTouchIndex(data);
        if (index >= 0) {
            if (data && data.Var > 0) {
                this.changeValue(symbol, index);
            } else if (data && data.Switch > 0) {
                this.changeValue(symbol, index > 0);
            } else {
                this.changeValue(symbol, index > 0);
            }
        }
        return true;
    };

    Window_Options.prototype.optionContentsTouchIndex = function(data) {
        const index = this.index();
        const touchPos = new Point(TouchInput.x, TouchInput.y);
        const localPos = this.worldTransform.applyInverse(touchPos);
        for (let i = 0; i < this.maxItemCols(index, data); i++) {
            const rect = this.itemOptionRect(data, index, i);
            const x = rect.x + this.colSpacing() + 4;
            const y = rect.y + this.rowSpacing() + 4;
            if (x <= localPos.x && x + rect.width >= localPos.x) {
                if (y <= localPos.y && y + rect.height >= localPos.y) {
                    return i;
                }
            }
        }
        return -1;
    };

})();