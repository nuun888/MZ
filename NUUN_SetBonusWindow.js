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
 * @plugindesc セットボーナスツールチップウィンドウ
 * @author NUUN
 * @version 1.0.0
 * @base NUUN_Base
 * @base NUUN_SetBonusEquip
 * @orderAfter NUUN_Base
 * 
 * @help
 * 装備画面で装備スロット選択中の装備で現在適用しているセットボーナスを表示します。
 * 
 * 更新履歴
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
 * @param SetBonusParamText
 * @text パラメータテキスト設定
 * @desc パラメータテキストの設定を行います。
 * @type struct<textsList>
 * @default {"HPName":"HP","MPName":"MP","ATKName":"ATK","DEFName":"DEF","MATName":"MAT","MDFName":"MDF","AGIName":"AGI","LukName":"LUK"}
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
 */
/*~struct~textsList:
 * 
 * @param HPName
 * @text セットボーナス名称
 * @desc セットボーナスを区別するための名称。
 * @type string
 * @default HP
 * 
 * @param MPName
 * @text セットボーナス名称
 * @desc セットボーナスを区別するための名称。
 * @type string
 * @default MP
 * 
 * @param ATKName
 * @text セットボーナス名称
 * @desc セットボーナスを区別するための名称。
 * @type string
 * @default ATK
 * 
 * @param DEFName
 * @text セットボーナス名称
 * @desc セットボーナスを区別するための名称。
 * @type string
 * @default DEF
 * 
 * @param MATName
 * @text セットボーナス名称
 * @desc セットボーナスを区別するための名称。
 * @type string
 * @default MAT
 * 
 * @param MDFName
 * @text セットボーナス名称
 * @desc セットボーナスを区別するための名称。
 * @type string
 * @default MDF
 * 
 * @param AGIName
 * @text セットボーナス名称
 * @desc セットボーナスを区別するための名称。
 * @type string
 * @default AGI
 * 
 * @param LukName
 * @text セットボーナス名称
 * @desc セットボーナスを区別するための名称。
 * @type string
 * @default LUK
 * 
 */
var Imported = Imported || {};
Imported.NUUN_SetBonusWindow = true;

(() => {
const parameters = PluginManager.parameters('NUUN_SetBonusWindow');
const SetBonusParamText = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['SetBonusParamText'])) : null) || [];
const SetBonusFontSize = Number(parameters['SetBonusFontSize'] || 0);
const SetBonusNameColor = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['SetBonusNameColor'])) : 16);
const WindowDuration = Number(parameters['WindowDuration'] || 0);
const WindowWidth = Number(parameters['WindowWidth'] || 400);
const HelpOver = eval(parameters['HelpOver'] || 'false');

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
    if (this._duration > 0) {
        this._duration--;
        if (this._duration === 0) {
            this.show();
        }
    } else if (this._equip && WindowDuration === 0) {
        this.show();
    }
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
        const list = this._equip.meta.SetBonus.split(',').map(Number);
        list.forEach(setBonusId => {
            const data = NuunManager.getSetBonusData(setBonusId);
            setBonusSum = this._actor.getTotalSetBonus(data);
            const name = data.SetBonusName;
            this.changeTextColor(NuunManager.getColorCode(SetBonusNameColor));
            this.drawSetBonusName(name, rect.x, rect.y, rect.width);
            this.resetTextColor();
            y += lineHeight;
            this.horzLine(rect.x, y, rect.width);
            data.SetBonusNumberEquipment.forEach(numberEquip => {
                if (setBonusSum >= numberEquip.SetNumberEquip) {
                    y += lineHeight;
                    contentsRows++;
                    this.drawSetBonusNumberEquipment(numberEquip, rect.x, y, rect.width);
                }
            });
            if (data.SetBonusEquip.length === setBonusSum) {
                y += lineHeight;
                contentsRows++;
                this.drawSetBonusParam(data, rect.x, y, rect.width);
            }
        });
        this.height = this.fittingHeight(contentsRows + 2);
        this._onRefresh = true;
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
        if (data.SetBonusText) {
            this.changeTextColor(this.systemColor());
            this.drawText(data.SetBonusText, x, y, width);
            const textWidth = this.textWidth(data.SetBonusText);
            x += textWidth  + this.itemPadding();
        }
        let text = this.getSetBonusParam(equip);
        if (data.SetBonusParamText) {
            text += text ? ','+ data.SetBonusParamText : data.SetBonusParamText;
        }
        this.resetTextColor();
        this.drawText(text, x, y, width);
    }
};

Window_SetBounsEquip.prototype.drawSetBonusNumberEquipment = function(data, x, y, width) {
    const equip = this.getSetBonusEquip(data.SetNumberEquipWeaponData, data.SetNumberEquipArmorData);
    if (equip) {
        if (data.SetBonusText) {
            this.changeTextColor(this.systemColor());
            this.drawText(data.SetBonusText, x, y, width);
            const textWidth = this.textWidth(data.SetBonusText);
            x += textWidth  + this.itemPadding();
        }
        let text = this.getSetBonusParam(equip);
        if (data.SetBonusParamText) {
            text += text ? ','+ data.SetBonusParamText : data.SetBonusParamText;
        }
        this.resetTextColor();
        this.drawText(text, x, y, width);
    }
};

Window_SetBounsEquip.prototype.fittingHeight = function(numLines) {
    return numLines * this.getFontSize() + $gameSystem.windowPadding() * 2 + (this.itemHeight() - this.getFontSize());
};

Window_SetBounsEquip.prototype.getParamText = function(paramId) {
    switch (paramId) {
        case 0:
            return SetBonusParamText.HPName;
        case 1:
            return SetBonusParamText.MPName;
        case 2:
            return SetBonusParamText.ATKName;
        case 3:
            return SetBonusParamText.DEFName;
        case 4:
            return SetBonusParamText.MATName;
        case 5:
            return SetBonusParamText.MDFName;
        case 6:
            return SetBonusParamText.AGIName;
        case 7:
            return SetBonusParamText.LUKName;
    }
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

Window_SetBounsEquip.prototype.getSetBonusParam = function(equip) {
    let text = '';
    for (i = 0; i < 8; i++) {
        const param = equip.params[i];
        if (param !== 0) {
            if (text) {
                text += ',';
            }
            text += this.getParamText(i) + (param > 0 ? '+' : '-') + param;
        }
    }
    return text;
};

Window_SetBounsEquip.prototype.getFontSize = function() {
    return $gameSystem.mainFontSize() + SetBonusFontSize;
};

})();