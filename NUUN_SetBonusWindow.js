/*:-----------------------------------------------------------------------------------
 * NUUN_SetBonusWindow.js
 * 
 * Copyright (C) 2026 NUUN
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Set bonus tooltip window
 * @author NUUN
 * @version 1.0.0
 * @base NUUN_EquipSetBonus
 * @orderAfter NUUN_EquipSetBonus
 * 
 * @help
 * Displays a tooltip for set bonuses related to the equipment currently selected in the equipment slot on the Equip screen.
 * This plugin is an extension plugin for Equip Set Bonus Plugin Ver. 2.
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
 * 9/23/2026 Ver.1.0.0
 * Updated to support NUUN_EquipSetBonus Ver.2.0.0. (Not compatible with Ver.1.)
 * 
 * @param WindowSetting
 * @text Window settings
 * @default ------------------------------
 * 
 * @param WindowWidth
 * @desc Specifies the width of the tooltip window.
 * @text Tooltip window width
 * @type number
 * @default 400
 * @min 0
 * @parent WindowSetting
 * 
 * @param HelpOver
 * @desc Allows the tooltip window to be displayed over the Help window.
 * @text Display over Help window
 * @type boolean
 * @default false
 * @parent WindowSetting
 * 
 * @param WindowDuration
 * @desc Specifies the number of frames before the tooltip window is displayed.
 * @text Display delay frames
 * @type number
 * @default 60
 * @min 0
 * @parent WindowSetting
 * 
 * @param TextSetting
 * @text Text settings
 * @default ------------------------------
 * 
 * @param SetBonusFontSize
 * @text Font size
 * @desc Specifies the font size. (Difference from the main font size)
 * @type number
 * @min -99
 * @default 0
 * @parent TextSetting
 * 
 * @param SetBonusNameColor
 * @desc Specifies the text color of the set bonus name. You can enter a color code in the Text tab.
 * @text Set bonus name text color
 * @type color
 * @default 16
 * @min 0
 * @parent TextSetting
 * 
 * @param IsTextCode
 * @desc Applies control characters to the set bonus effect text.
 * @text Apply control characters
 * @type boolean
 * @default false
 * @parent TextSetting
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc セットボーナスツールチップウィンドウ
 * @author NUUN
 * @version 2.0.0
 * @base NUUN_EquipSetBonus
 * @orderAfter NUUN_EquipSetBonus
 * 
 * @help
 * 装備画面で、装備スロットで選択中の装備に関連するセットボーナスをツールチップで表示します。
 * このプラグインは装備セットボーナスプラグイン（NUUN_EquipSetBonus）の拡張プラグインです。
 * 
 * 利用規約
 * クレジット表記：任意
 * 商業利用：可能
 * 成人向け：可能
 * 改変：可能
 * 再配布：可能
 * ※https://github.com/nuun888/MZ、公式フォーラム、正規販売サイト以外からのダウンロード、改変済みの場合はサポートは対象外となります。
 * 
 * 更新履歴
 * 2026/9/23 Ver.2.0.0
 * NUUN_EquipSetBonus Ver.2.0.0更新によるアップデート。(Ver1では使用できません)
 * 
 * @param WindowSetting
 * @text ウィンドウ設定
 * @default ------------------------------
 * 
 * @param WindowWidth
 * @desc ウィンドウ横幅。
 * @text ツールチップウィンドウのウィンドウ横幅を指定します。
 * @type number
 * @default 400
 * @min 0
 * @parent WindowSetting
 * 
 * @param HelpOver
 * @desc ツールチップウィンドウをヘルプウィンドウの上に表示を許可します。
 * @text ヘルプウィンドウ上表示
 * @type boolean
 * @default false
 * @parent WindowSetting
 * 
 * @param WindowDuration
 * @desc 表示までのフレーム数を指定します。
 * @text 表示待ちフレーム数
 * @type number
 * @default 60
 * @min 0
 * @parent WindowSetting
 * 
 * @param TextSetting
 * @text テキスト設定
 * @default ------------------------------
 * 
 * @param SetBonusFontSize
 * @text フォントサイズ
 * @desc フォントサイズを指定します。(メインフォントからの差)
 * @type number
 * @min -99
 * @default 0
 * @parent TextSetting
 * 
 * @param SetBonusNameColor
 * @desc セットボーナス名のテキストカラー。テキストタブでカラーコードを入力できます。
 * @text セットボーナス名テキストカラー
 * @type color
 * @default 16
 * @min 0
 * @parent TextSetting
 * 
 * @param IsTextCode
 * @desc セットボーナス効果のテキストに制御文字を適用。
 * @text 制御文字適用
 * @type boolean
 * @default false
 * @parent TextSetting
 * 
 */

var Imported = Imported || {};
Imported.NUUN_SetBonusWindow = true;

(() => {
    const params = Nuun_PluginParams_EquipSetBonus.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;

    NuunEquipSetBonusManager.equipSetBonusTooltipsParams = function(code) {
        switch (code) {
            case 0:
                return params.WindowWidth || 320;
            case 1:
                return params.HelpOver;
            case 2:
                return params.WindowDuration || 0;
            case 3:
                return params.SetBonusFontSize || 0;
            case 4:
                return params.SetBonusNameColor || 0;
            case 5:
                return params.IsTextCode || 0;
        }
    };

    const _Scene_Equip_createSlotWindow = Scene_Equip.prototype.createSlotWindow;
    Scene_Equip.prototype.createSlotWindow = function() {
        _Scene_Equip_createSlotWindow.apply(this, arguments);
        this.createSetBonusWindow();
    };

    Scene_Equip.prototype.createSetBonusWindow = function() {
        const rect = this.setBonusWindowRect();
        this._setBonusWindow = new Window_SetBounsEquip(rect);
        this.addChild(this._setBonusWindow);
        this._setBonusWindow.hide();
        this._slotWindow.setSetBounsEquipWindow(this._setBonusWindow);
    };

    Scene_Equip.prototype.setBonusWindowRect = function() {
        const wx = 0;
        const wy = 0;
        const ww = NuunEquipSetBonusManager.equipSetBonusTooltipsParams(0);
        const wh = Graphics.boxHeight;
        return new Rectangle(wx, wy, ww, wh);
    };

    const _Scene_Equip_refreshActor = Scene_Equip.prototype.refreshActor;
    Scene_Equip.prototype.refreshActor = function() {
        _Scene_Equip_refreshActor.apply(this, arguments);
        if (this._setBonusWindow) {
            const actor = this.actor();
            this._setBonusWindow.setActor(actor);
        }
    };


    Window_EquipSlot.prototype.setSetBounsEquipWindow = function(setBonusWindow) {
        this._setBonusWindow = setBonusWindow;
    };

    const _Window_EquipSlot_update = Window_EquipSlot.prototype.update;
    Window_EquipSlot.prototype.update = function() {
        _Window_EquipSlot_update.apply(this, arguments);
        if (!this.active) {
            this._setBonusWindow.setEquip(null);
        }
        if (this._setBonusWindow) {
            this.updateSetBonusTooltips();
        }
    };

    Window_EquipSlot.prototype.callUpdateHelp = function() {
        Window_Selectable.prototype.callUpdateHelp.apply(this, arguments);
        if (this.active) {
            this.updateSetBonusWindow();
        }
    };

    Window_EquipSlot.prototype.updateSetBonusWindow = function() {
        const index = this.index();
        this._setBonusWindow.setEquip(this.itemAt(index));
    };

    Window_EquipSlot.prototype.updateSetBonusTooltips = function() {
        const tooltipsWindow = this._setBonusWindow;
        const rect = this.itemLineRect(this.index());
        const colSpacing = this.colSpacing();
        const tooltipsX = Math.floor(tooltipsWindow.width / 2);
        const boxMarginWidth = (Graphics.width - Graphics.boxWidth) / 2;
        const boxMarginHeight = (Graphics.height - Graphics.boxHeight) / 2;
        const rectX = Math.floor(rect.width / 2);
        const x = Math.max(boxMarginWidth, this.x + rect.x + this.scrollTooltipsX() + rectX + colSpacing + boxMarginWidth - tooltipsX);
        const y = Math.max(boxMarginHeight, this.y + rect.y + this.scrollTooltipsY() + this.itemHeight() + boxMarginHeight);
        tooltipsWindow.x = Math.min(x, Graphics.boxWidth - tooltipsWindow.width + boxMarginWidth);
        tooltipsWindow.y = y;
        if (tooltipsWindow.y + tooltipsWindow.height > this.setBounsEquipWindowHelpOver()) {
            tooltipsWindow.y += (tooltipsWindow.height + this.itemHeight() + this.itemPadding() / 2) * -1;
        }
    };

    Window_EquipSlot.prototype.scrollTooltipsX = function() {
        return this.scrollBaseX() - this.scrollX();
    };

    Window_EquipSlot.prototype.scrollTooltipsY = function() {
        return this.scrollBaseY() - this.scrollY();
    };

    Window_EquipSlot.prototype.setBounsEquipWindowHelpOver = function() {
        return NuunEquipSetBonusManager.equipSetBonusTooltipsParams(1) ? Graphics.boxHeight : this.y + this.height;
    };


    function Window_SetBounsEquip() {
        this.initialize(...arguments);
    }

    Window_SetBounsEquip.prototype = Object.create(Window_Selectable.prototype);
    Window_SetBounsEquip.prototype.constructor = Window_SetBounsEquip;

    Window_SetBounsEquip.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this._actor = null;
        this.initSetBonusData();
    };

    Window_SetBounsEquip.prototype.initSetBonusData = function() {
        this._setBonus = [];
        this._setBonusData = [];
        this._equip = null;
        this.hide();
    };

    Window_SetBounsEquip.prototype.setActor = function(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.initSetBonusData();
        }
    };

    Window_SetBounsEquip.prototype.setSetBonusData = function(equip) {
        this._setBonusData = [];
        if (!equip) return;
        if (!this._setBonus) return;
        for (const setBonus of this._setBonus) {
            if (!!setBonus && setBonus.isSetBonusItem(equip)) {
                this._setBonusData.push(setBonus);
            }
        }
    };

    Window_SetBounsEquip.prototype.setSetBonus = function() {
        if (!this._actor) return;
        this._setBonus = this._actor.getSetBonusList();
        this.setSetBonusData(this._equip);
    };

    Window_SetBounsEquip.prototype.setEquip = function(equip, x = 0, y = 0) {
        if (this._equip !== equip) {
            this._duration = 0;
            this._equip = equip;
            this.setSetBonus();
            this.refresh();
            this.hide();
            this.x = x;
            this.y = y;
            if (!!this._equip) {
                this._duration = NuunEquipSetBonusManager.equipSetBonusTooltipsParams(2);
            }
        }
    };

    Window_SetBounsEquip.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);
        if (this.height === 0 || !this._equip || !this.isSetBonus()) {
            this.hide();
            return;
        }
        if (this._duration > 0) {
            this._duration--;
            if (this._duration === 0) {
                this.show();
            }
        } else if (!!this._equip && NuunEquipSetBonusManager.equipSetBonusTooltipsParams(2) === 0) {
            this.show();
        }
    };

    Window_SetBounsEquip.prototype.isSetBonus = function() {
        return this._setBonusData.length > 0;
    };

    Window_SetBounsEquip.prototype.refresh = function() {
        this.contents.clear();
        if (!this._equip) {
            this.hide();
            return;
        }
        const list = this._setBonusData || [];
        if (list.length === 0) return;
        this.drawSetBouns(list);
    };

    Window_SetBounsEquip.prototype.drawSetBouns = function(list) {
        const rect = this.itemRect(0);
        const lineHeight = this.tooltipsHeight();//ツールチップ全体の高さ
        this.contents.fontSize = this.getFontSize();
        let contentsRows = 0;
        let y = rect.y;
        for (let i = 0; i < list.length; i++) {
            const setBonus = list[i];
            const data = setBonus.getData();
            if (!!data) {
                const setBonusSum = setBonus.getEquipsNum();
                this.drawSetBonusName(data.SetBonusName, rect.x, y, rect.width);
                y += lineHeight;
                contentsRows++;
                this.horzLine(rect.x, y, rect.width);
                y += lineHeight;
                contentsRows++;
                for (const equip of data.SetBonusNumberEquipment || []) {
                    if (NuunEquipSetBonusManager.getSetBonusEquipMaxNum(data) > 1 && equip.SetNumberEquip <= setBonusSum) {
                        const rows = this.drawSetBonusNumberEquipment(equip, rect.x, y, rect.width);
                        y += lineHeight * rows;
                        contentsRows += rows;
                    }
                }
                if (NuunEquipSetBonusManager.getSetBonusEquipMaxNum(data) > 1 && NuunEquipSetBonusManager.getSetBonusEquipMaxNum(data) <= setBonusSum) {
                    const rows = this.drawSetBonusParam(data, rect.x, y, rect.width);
                    y += lineHeight * rows;
                    contentsRows += rows;
                }
                this.height = this.fittingHeight(contentsRows);
            } else {
                console.log("無効なIDが設定されています。");
            }
        }
        this.contents.fontSize = $gameSystem.mainFontSize();
    };

    Window_SetBounsEquip.prototype.drawSetBonusName = function(name, x, y, width) {
        this.changeTextColor(NuunEquipSetBonusManager.getColorCode(NuunEquipSetBonusManager.equipSetBonusTooltipsParams(4)));
        this.drawText(name, x, y, width);
        this.resetTextColor();
    };

    Window_SetBounsEquip.prototype.drawSetBonusParam = function(data, x, y, width) {
        const equip = this.getSetBonusEquip(data.SetBonusWeaponData, data.SetBonusArmorData);
        let line = 0;
        if (equip) {
            let textWidth = 0;
            const lineHeight = this.getFontSize();
            if (data.SetBonusText) {
                this.changeTextColor(this.systemColor());
                this.drawText(data.SetBonusText, x, y, width);
                textWidth = this.textWidth(data.SetBonusText) + this.itemPadding();
            }
            this.resetTextColor();
            const setBonusParamText = data.SetBonusParamText || [];
            for (const textData of setBonusParamText) {
                if (textData) {
                    if (NuunEquipSetBonusManager.equipSetBonusTooltipsParams(5)) {
                        this.drawTextEx(textData, x + textWidth, y + lineHeight * line, width - textWidth);
                    } else {
                        this.drawText(textData, x + textWidth, y + lineHeight * line, width - textWidth);
                    }
                    line++;
                }
            }
        }
        return line;
    };

    Window_SetBounsEquip.prototype.drawSetBonusNumberEquipment = function(data, x, y, width) {
        const equip = this.getSetBonusEquip(data.SetNumberEquipWeaponData, data.SetNumberEquipArmorData);
        let line = 0;
        if (equip) {
            let textWidth = 0;
            const lineHeight = this.getFontSize();//セットボーナス効果の高さ
            if (data.SetBonusText) {
                this.changeTextColor(this.systemColor());
                this.drawText(data.SetBonusText, x, y, width);
                textWidth = this.textWidth(data.SetBonusText) + this.itemPadding();
            }
            this.resetTextColor();
            const setBonusParamText = data.SetBonusParamText || [];
            for (const textData of setBonusParamText) {
                if (textData) {
                    if (NuunEquipSetBonusManager.equipSetBonusTooltipsParams(5)) {
                        this.drawTextEx(textData, x + textWidth, y + lineHeight * line, width - textWidth);
                    } else {
                        this.drawText(textData, x + textWidth, y + lineHeight * line, width - textWidth);
                    }
                    line++;
                }
            }
        }
        return line;
    };      

    Window_SetBounsEquip.prototype.horzLine = function(x, y, width) {
        const lineY = y + this.lineHeight() / 2 - 1;
        this.contents.paintOpacity = 48;
        this.contents.fillRect(x, lineY, width, 2, ColorManager.normalColor());
        this.contents.paintOpacity = 255;
    };

    Window_SetBounsEquip.prototype.getSetBonusEquip = function(weaponId, armorId) {
        if (weaponId > 0) {
            return $dataWeapons[weaponId];
        } else if (armorId > 0) {
            return $dataArmors[armorId];
        } else {
            return null;
        }
    };

    Window_SetBounsEquip.prototype.getFontSize = function() {
        return $gameSystem.mainFontSize() + NuunEquipSetBonusManager.equipSetBonusTooltipsParams(3);
    };

    Window_SetBounsEquip.prototype.fittingHeight = function(numLines) {
        return numLines * this.tooltipsHeight() + $gameSystem.windowPadding() * 2;
    };

    Window_SetBounsEquip.prototype.tooltipsHeight = function() {
        return this.lineHeight() + NuunEquipSetBonusManager.equipSetBonusTooltipsParams(3);
    };


})();