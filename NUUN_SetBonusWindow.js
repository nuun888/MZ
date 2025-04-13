/*:-----------------------------------------------------------------------------------
 * NUUN_SetBonusWindow.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Set bonus tooltip window
 * @author NUUN
 * @version 1.0.6
 * @base NUUN_Base
 * @base NUUN_SetBonusEquip
 * @orderAfter NUUN_Base
 * 
 * @help
 * Displays the set bonus currently applied to the equipment currently selected in the equipment slot on the equipment screen.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 4/13/2024 Ver.1.0.6
 * Fixed so that it will not be displayed if an ID that is not set is specified.
 * 8/20/2024 Ver.1.0.5
 * Added the ability to apply text codes to set bonus text and parameters.
 * 3/18/2023 Ver.1.0.4
 * Fixed not to process when invalid ID is specified.
 * 11/17/2022 Ver.1.0.3
 * Applied equipment set bonus Modified by changing the display setting method of the set bonus.
 * 10/8/2022 Ver.1.0.2
 * Fixed by changing set bonus definition.
 * 7/16/2022 Ver.1.0.1
 * Fixed tooltips appearing when hovering over gear without set bonuses.
 * 7/7/2022 Ver.1.0.0
 * first edition.
 * 
 * @param SetBonusFontSize
 * @text FontSize
 * @desc Font size (difference from main font)
 * @type number
 * @min -99
 * @default 0
 * 
 * @param SetBonusNameColor
 * @desc Text color for the set bonus name. You can enter the color code in the text tab.
 * @text Set bonus name text color
 * @type number
 * @default 16
 * @min 0
 * 
 * @param WindowDuration
 * @desc Number of frames to display.
 * @text Number of display waiting frames
 * @type number
 * @default 0
 * @min 0
 * 
 * @param WindowWidth
 * @desc WindowWidth.
 * @text WindowWidth
 * @type number
 * @default 400
 * @min 0
 * 
 * @param HelpOver
 * @desc Allows tooltip windows to be displayed on top of help windows.
 * @text Help window top display
 * @type boolean
 * @default false
 * 
 * @param IsTextCode
 * @desc Apply text codes to set bonus effect text.
 * @text Apply text code
 * @type boolean
 * @default false
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc セットボーナスツールチップウィンドウ
 * @author NUUN
 * @version 1.0.6
 * @base NUUN_Base
 * @base NUUN_SetBonusEquip
 * @orderAfter NUUN_Base
 * 
 * @help
 * 装備画面で装備スロット選択中の装備で現在適用しているセットボーナスを表示します。
 * 
 * 更新履歴
 * 2025/4/13 Ver.1.0.6
 * 設定されていないIDが指定されている場合は表示しないように修正。
 * 2024/8/20 Ver.1.0.5
 * セットボーナステキスト、パラメータに制御文字を適用できる機能を追加。
 * 2023/3/18 Ver.1.0.4
 * 無効なIDを指定したときに処理しないように修正。
 * 2022/11/17 Ver.1.0.3
 * 装備セットボーナスの適用セットボーナスの表示設定方法の仕様変更による修正。
 * 2022/10/8 Ver.1.0.2
 * セットボーナス定義変更による修正。
 * 2022/7/16 Ver.1.0.1
 * セットボーナスがない装備をマウスオーバーするとツールチップが表示されてしまう問題を修正。
 * 2022/7/7 Ver.1.0.0
 * 初版
 * 
 * @param SetBonusFontSize
 * @text フォントサイズ
 * @desc フォントサイズ(メインフォントからの差)
 * @type number
 * @min -99
 * @default 0
 * 
 * @param SetBonusNameColor
 * @desc セットボーナス名のテキストカラー。テキストタブでカラーコードを入力できます。
 * @text セットボーナス名テキストカラー
 * @type number
 * @default 16
 * @min 0
 * 
 * @param WindowDuration
 * @desc 表示までのフレーム数。
 * @text 表示待ちフレーム数
 * @type number
 * @default 0
 * @min 0
 * 
 * @param WindowWidth
 * @desc ウィンドウ横幅。
 * @text ウィンドウ横幅
 * @type number
 * @default 400
 * @min 0
 * 
 * @param HelpOver
 * @desc ツールチップウィンドウをヘルプウィンドウの上に表示を許可します。
 * @text ヘルプウィンドウ上表示
 * @type boolean
 * @default false
 * 
 * @param IsTextCode
 * @desc セットボーナス効果のテキストに制御文字を適用。
 * @text 制御文字適用
 * @type boolean
 * @default false
 * 
 */

var Imported = Imported || {};
Imported.NUUN_SetBonusWindow = true;

(() => {
const parameters = PluginManager.parameters('NUUN_SetBonusWindow');
const SetBonusFontSize = Number(parameters['SetBonusFontSize'] || 0);
const SetBonusNameColor = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['SetBonusNameColor'])) : 16);
const WindowDuration = Number(parameters['WindowDuration'] || 0);
const WindowWidth = Number(parameters['WindowWidth'] || 400);
const HelpOver = eval(parameters['HelpOver'] || 'false');
const IsTextCode = eval(parameters['IsTextCode'] || 'false');

const _Scene_Equip_create = Scene_Equip.prototype.create;
Scene_Equip.prototype.create = function() {
    _Scene_Equip_create.call(this);
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
    const ww = WindowWidth;
    const wh = Graphics.boxHeight;
    return new Rectangle(wx, wy, ww, wh);
};


Window_EquipSlot.prototype.setSetBounsEquipWindow = function(setBonusWindow) {
    this._setBonusWindow = setBonusWindow;
};

const _Window_EquipSlot_update = Window_EquipSlot.prototype.update;
Window_EquipSlot.prototype.update = function() {
    _Window_EquipSlot_update.call(this);
    if (this._setBonusWindow) {
        this._setBonusWindow.setEquip(this.item(), this._actor, this.active);
        if (this._setBonusWindow.getOnRefresh()) {
            const rect = this.itemLineRect(this.index());
            this._setBonusWindow.x = this.x + rect.x + (Graphics.width - Graphics.boxWidth) / 2 + this.itemPadding();
            this._setBonusWindow.y = this.y + rect.y + this.itemHeight() + this.itemPadding() * 2 + (Graphics.height - Graphics.boxHeight) / 2;
            if (this._setBonusWindow.y + this._setBonusWindow.height > this.setBounsEquipWindowHelpOver()) {
                this._setBonusWindow.y += (this._setBonusWindow.height + this.itemHeight() + this.itemPadding() * 2) * -1;
            }
            this._setBonusWindow.clearOnRefresh();
        }
    }
};

Window_EquipSlot.prototype.setBounsEquipWindowHelpOver = function() {
    return HelpOver ? Graphics.boxHeight : this.y + this.height;
};


function Window_SetBounsEquip() {
    this.initialize(...arguments);
}

Window_SetBounsEquip.prototype = Object.create(Window_Selectable.prototype);
Window_SetBounsEquip.prototype.constructor = Window_SetBounsEquip;

Window_SetBounsEquip.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._equip = null;
    this._actor = null;
    this._onRefresh = false;
    this._duration = 0;
};

Window_SetBounsEquip.prototype.setEquip = function(equip, actor, active) {
    if (!active) {
        equip = null;
        this._duration = 0;
    }
    if (this._equip !== equip || this._actor !== actor) {
        this._duration = 0;
        this._equip = equip;
        this._actor = actor;
        this.refresh();
        this.hide();
        if (this._equip) {
            this._duration = WindowDuration;
        }
    }
};

Window_SetBounsEquip.prototype.getOnRefresh = function() {
    return this._onRefresh;
};

Window_SetBounsEquip.prototype.clearOnRefresh = function() {
    return this._onRefresh;
};

Window_SetBounsEquip.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    if (!this._equip || !this.isSetBonus()) {
        this.hide();
        return;
    }
    if (this._duration > 0) {
        this._duration--;
        if (this._duration === 0) {
            this.show();
        }
    } else if (this._equip && WindowDuration === 0) {
        this.show();
    }
};

Window_SetBounsEquip.prototype.isSetBonus = function() {
    const bounu = NuunManager.getMetaCodeList(this._equip, "SetBonus");
    if (!bounu) return false;
    return bounu.some(id => {
        return (isNaN(id) ? NuunManager.getSetBonusDataName(id) : NuunManager.getSetBonusData(Number(id)));
    })
};

Window_SetBounsEquip.prototype.refresh = function() {
    this.contents.clear();
    const rect = this.itemLineRect(0);
    let y = rect.y;
    const lineHeight = this.getFontSize();
    let contentsRows = 0;
    let setBonusSum = 0;
    this.contents.fontSize = this.getFontSize();
    if (this._equip && this._equip.meta.SetBonus) {
        const list = NuunManager.getMetaCodeList(this._equip, "SetBonus") || [];
        list.forEach(setBonusId => {
            const data = isNaN(setBonusId) ? NuunManager.getSetBonusDataName(setBonusId) : NuunManager.getSetBonusData(Number(setBonusId));
            if (data) {
                setBonusSum = this._actor.getTotalSetBonus(data);
                const name = data.SetBonusName;
                this.changeTextColor(NuunManager.getColorCode(SetBonusNameColor));
                this.drawSetBonusName(name, rect.x, rect.y, rect.width);
                this.resetTextColor();
                y += lineHeight;
                this.horzLine(rect.x, y, rect.width);
                y += lineHeight;
                data.SetBonusNumberEquipment.forEach(numberEquip => {
                    if (data.SetBonusEquip && data.SetBonusEquip.length > 1 && numberEquip.SetNumberEquip <= setBonusSum) {
                        y += lineHeight * this.drawSetBonusNumberEquipment(numberEquip, rect.x, y, rect.width);
                        contentsRows++;
                    } else if (!(data.SetBonusEquip && data.SetBonusEquip.length > 1) && numberEquip.SetNumberEquip <= setBonusSum) {
                        y += lineHeight * this.drawSetBonusNumberEquipment(numberEquip, rect.x, y, rect.width);
                        contentsRows++;
                    }
                });
                if (data.SetBonusEquip && data.SetBonusEquip.length > 1 && data.SetBonusEquip.length === setBonusSum) {
                    y += lineHeight * this.drawSetBonusParam(data, rect.x, y, rect.width);
                    contentsRows++;
                }
                this.height = this.fittingHeight(contentsRows + 2);
                
            } else {
                console.log("無効なIDが設定されています。");
            }
            this._onRefresh = true;
        });
    }
    this.contents.fontSize = $gameSystem.mainFontSize();
};

Window_SetBounsEquip.prototype.horzLine = function(x, y, width) {
    const lineY = y + this.lineHeight() / 2 - 1;
    this.contents.paintOpacity = 48;
    this.contents.fillRect(x, lineY, width, 2, ColorManager.normalColor());
    this.contents.paintOpacity = 255;
};

Window_SetBounsEquip.prototype.drawSetBonusName = function(name, x, y, width) {
    this.drawText(name, x, y, width);
};

Window_SetBounsEquip.prototype.drawSetBonusParam = function(data, x, y, width) {
    const equip = this.getSetBonusEquip(data.SetBonusWeaponData, data.SetBonusArmorData);
    if (equip) {
        let text = '';
        let textWidth = 0;
        if (data.SetBonusText) {
            this.changeTextColor(this.systemColor());
            this.drawText(data.SetBonusText, x, y, width);
            textWidth = this.textWidth(data.SetBonusText) + this.itemPadding();
        }
        this.resetTextColor();
        const setBonusParamText = data.SetBonusParamText || [];
        setBonusParamText.forEach(textData => {
            if (textData) {
                text += text ? ','+ textData : textData;
            }
            if (!!text) {
                if (IsTextCode) {
                    this.drawTextEx(text, x + textWidth, y, width - textWidth);
                } else {
                    this.drawText(text, x + textWidth, y, width - textWidth);
                }
            }
        });
    }
    return 1;
};

Window_SetBounsEquip.prototype.drawSetBonusNumberEquipment = function(data, x, y, width) {
    const equip = this.getSetBonusEquip(data.SetNumberEquipWeaponData, data.SetNumberEquipArmorData);
    if (equip) {
        let text = '';
        let textWidth = 0;
        if (data.SetBonusText) {
            this.changeTextColor(this.systemColor());
            this.drawText(data.SetBonusText, x, y, width);
            textWidth = this.textWidth(data.SetBonusText) + this.itemPadding();
        }
        this.resetTextColor();
        const setBonusParamText = data.SetBonusParamText || [];
        setBonusParamText.forEach(textData => {
            if (textData) {
                text += text ? ','+ textData : textData;
            }
            if (!!text) {
                if (IsTextCode) {
                    this.drawTextEx(text, x + textWidth, y, width - textWidth);
                } else {
                    this.drawText(text, x + textWidth, y, width - textWidth);
                }
            }
        });
    }
    return 1;
};

Window_SetBounsEquip.prototype.fittingHeight = function(numLines) {
    return numLines * this.getFontSize() + $gameSystem.windowPadding() * 2 + (this.itemHeight() - this.getFontSize());
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
    return $gameSystem.mainFontSize() + SetBonusFontSize;
};

})();