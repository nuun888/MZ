/*:-----------------------------------------------------------------------------------
 * NUUN_Base.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc  NuuNBasePlugin
 * @author NUUN
 * @version 1.7.10
 * 
 * @help
 * This is a base plugin that performs common processing.
 * Place it above the plugin list.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 11/9/2024 Ver.1.0.0
 * Added a warning display process when entering [] when acquiring meta.
 * 9/28/2024 Ver.1.7.9
 * Added a process to get the file name.
 * 6/9/2024 Ver.1.7.8
 * Re-fixed APNG-related processing.
 * 6/8/2024 Ver.1.7.7
 * Fixes for APNG related processing.
 * 5/25/2024 Ver.1.7.6
 * Fixed some processing.
 * 5/20/2024 Ver.1.7.5
 * Add processing.
 * 5/11/2024 Ver.1.7.4
 * Modified to accommodate the diversity of acquisition parameters.
 * 5/4/2024 Ver.1.7.3
 * Corrected display of MV type gauge.
 * 5/3/2024 Ver.1.7.2
 * Added MV specification gauge processing.
 * Fixed some processing.
 * 3/17/2024 Ver.1.7.1
 * Added font handling for numbers and units.
 * 1/6/2023 Ver.1.7.0
 * Added plugin parameter acquisition processing. Newly released plug-ins after 2024 will be compatible with Ver.1.7.0 or later.
 * 7/1/2023 Ver.1.6.9
 * Added attack element processing.
 * 6/2/2023 Ver.1.6.8
 * Fixed processing related to overlay plugins.
 * 4/16/2023 Ver.1.6.7
 * Fixed filtering class handling.
 * 4/10/2023 Ver.1.6.6
 * Fixed filtering class handling.
 * 4/10/2023 Ver.1.6.5
 * Added filtering class handling.
 * 3/15/2023 Ver.1.6.4
 * Added error prevention processing for String input.
 * Added error proofing for eval input.
 * 2/7/2023 Ver.1.6.3
 * Added processing to call events with plugin commands.
 * 12/30/2022 Ver.1.6.2
 * Added exception handling when image could not be loaded.
 * Added content background processing definition.
 * 12/21/2022 Ver.1.6.1
 * Added definition of processing to add enemy use skills.
 * 11/13/2022 Ver.1.6.0
 * Added processing to display APNG.
 * 11/9/2022 Ver.1.5.2
 * Changed the display in languages other than Japanese to English.
 * 7/29/2022 Ver.1.5.1 
 * Added processing to specify the range.
 * 7/23/2022 Ver.1.5.0
 * 'NuunManager' also defines the process for specifying the range.
 * 6/15/2022 Ver.1.4.5
 * Fixed the problem that 'NaN' is displayed when entering a string.
 * 5/24/2022 Ver.1.4.4
 * Added processing to set sprite filtering window.
 * 2/12/2022 Ver.1.4.3
 * Fixed an issue where some variable names were wrong.
 * 1/12/2022 Ver.1.4.2
 * Added processing to apply enemy MP gauge and enemy TP gauge.
 * 1/9/2022 Ver.1.4.1
 * Added processing to round the decimal point.
 * 1/8/2022 Ver.1.4.0
 * Added color index acquisition process.
 * 12/12/2021 Ver.1.3.2
 * Added processing for applying enemy state display enhancements.
 * 11/7/2021 Ver.1.3.1
 * Added processing related to multiple attribute acquisition.
 * 8/22/2021 Ver.1.3.0
 * Added processing to 'Window_ItemList'.
 * 7/15/2021 Ver.1.2.0
 * Added common processing for gauges and name display plug-ins.
 * 5/15/2021 Ver.1.1.4
 * Added a process that can set the window skin for each window.
 * 5/8/2021 Ver.1.1.3
 * Fixed some processing.
 * 5/7/2021 Ver.1.1.2
 * Added structure acquisition processing.
 * 4/23/2021 Ver.1.1.1
 * Added processing for specifying a folder for images.
 * 3/14/2021 Ver.1.1.0
 * Added processing for specifying a folder for images.
 * 12/31/2020 Ver.1.0.0
 * first edition
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc  共通処理
 * @author NUUN
 * @version 1.7.10
 * 
 * @help
 * 共通処理を行うベースプラグインです。
 * プラグインリストの上に配置してください。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/11/9 Ver.1.7.10
 * メタ取得時の[]記入の警告表示処理を追加。
 * 2024/9/28 Ver.1.7.9
 * ファイル名を取得する処理を追加。
 * 2024/6/9 Ver.1.7.8
 * APNG関連の処理の再修正。
 * 2024/6/8 Ver.1.7.7
 * APNG関連の処理の修正。
 * 2024/5/25 Ver.1.7.6
 * 一部の処理を修正。
 * 2024/5/20 Ver.1.7.5
 * 処理の追加。
 * 2024/5/11 Ver.1.7.4
 * 取得パラメータの多様性に対応できるように修正。
 * 2024/5/4 Ver.1.7.3
 * MV式ゲージを表示を修正。
 * 2024/5/3 Ver.1.7.2
 * MV仕様のゲージ処理追加。
 * 一部処理の修正。
 * 2024/3/17 Ver.1.7.1
 * 数値と単位のフォント処理の追加。
 * 2024/1/6 Ver.1.7.0
 * プラグインのパラメータ取得処理の処理を追加。2024年以降の新規公開プラグインはVer.1.7.0以降の対応になります。
 * 2023/7/1 Ver.1.6.9
 * 攻撃属性の処理追加。
 * 2023/6/2 Ver.1.6.8
 * オーバレイプラグイン関連の処理の修正。
 * 2023/4/16 Ver.1.6.7
 * フィルタリングクラスの処理を修正。
 * 2023/4/10 Ver.1.6.6
 * フィルタリングクラスの処理を修正。
 * 2023/4/10 Ver.1.6.5
 * フィルタリングクラスの処理を追加。
 * 2023/3/15 Ver.1.6.4
 * string入力のエラー防止処理を追加。
 * eval入力のエラー防止処理を追加。
 * 2023/2/7 Ver.1.6.3
 * プラグインコマンドでイベントを呼び出すための処理の追加。
 * 2022/12/30 Ver.1.6.2
 * 画像が読み込めなかったときの例外処理を追加。
 * コンテンツ背景処理の定義を追加。
 * 2022/12/21 Ver.1.6.1
 * 敵の使用スキルの追加する処理の定義を追加。
 * 2022/11/13 Ver.1.6.0
 * APNGを表示するための処理を追加。
 * 2022/11/9 Ver.1.5.2
 * 日本語以外での表示を英語表示に変更。
 * 2022/7/29 Ver.1.5.1
 * -を元に配列を返す処理をNuunManagerでも定義。
 * 2022/7/23 Ver.1.5.0
 * -を元に配列を返す処理を追加。
 * 2022/7/23 Ver.1.4.5 2022/6/15 Ver.1.4.5
 * 文字列を記入したときにNaNと表示されてしまう問題を修正。
 * 2022/7/23 Ver.1.4.4 2022/5/24 Ver.1.4.4
 * スプライトのフィルタリングウィンドウを設定する処理を追加。
 * 2022/7/2 Ver.1.4.3 2022/2/12 Ver.1.4.3
 * 一部変数名が間違っていた問題を修正。
 * 2022/7/1 Ver.1.4.2 2022/1/12 Ver.1.4.2
 * 敵MPゲージ、敵TPゲージのゲージ適用するための処理の追加。
 * 2022/7/1 Ver.1.4.1 2022/1/9 Ver.1.4.1
 * 小数点を丸める処理を追加。
 * 2022/8/1 Ver.1.4.0 2022/1/8 Ver.1.4.0
 * カラーインデックス取得処理を追加。
 * 2021/12/12 Ver.1.3.2
 * 敵ステート表示拡張を適用するための処理を追加。
 * 2021/11/7 Ver.1.3.1
 * 複数属性取得に関しての処理追加。
 * 2021/8/22 Ver.1.3.0
 * Window_ItemListに処理を追加。
 * 2021/7/15 Ver.1.2.0
 * ゲージ、名前表示関連プラグインの共通処理を追加。
 * 2021/5/15 Ver.1.1.4
 * ウィンドウスキンをウィンドウ毎に設定できる処理を追加。
 * 2021/5/8 Ver.1.1.3
 * 処理を一部修正。
 * 2021/5/7 Ver.1.1.2
 * 構造体の取得処理を追加。
 * 2021/4/23 Ver.1.1.1
 * 画像のフォルダー指定の処理を追加。
 * 2021/3/14 Ver.1.1.0
 * 画像のフォルダー指定の処理を追加。
 * 2020/12/31 Ver.1.0.0
 * 初版
 * 
 */
var Imported = Imported || {};
Imported.NUUN_Base = true;
const NUUN_Base_Ver = 140;



function Sprite_NuunAPngImg() {
  this.initialize(...arguments);
}

Sprite_NuunAPngImg.prototype = Object.create(Sprite.prototype);
Sprite_NuunAPngImg.prototype.constructor = Sprite_NuunAPngImg;

(() => {
const parameters = PluginManager.parameters('NUUN_Base');

class Nuun_PluginParams {
    static getPluginParams(text) {//document.currentScript
        const name = String(Utils.extractFileName(text.src).split('.').shift());
        const params = PluginManager.parameters(name);
        if (params) {
            const pluginParam = new Nuun_PluginParamData(params);
            pluginParam.setPluginName(name);
            return pluginParam.getParameters();
        }
        return {pluginName: name};
    }
};

window.Nuun_PluginParams = Nuun_PluginParams;

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
                    if (code.indexOf("'") === 0 || code.indexOf('"' === 0)) {
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


class Nuun_TempParam {
    constructor() {
        this._data = null;
        this._exParams = null;
    }

    setGaugeData(data, type, exParams) {
        this._data = data;
        this._type = type;
        this._exParams = exParams;
    }

    setType(type) {
        this._type = type;
    }

    setData(data, exParams) {
        this._data = data;
        this._exParams = exParams;
    }

    getType() {
        return this._type || '';
    }

    getData() {
        return this._data;
    }

    getExParams() {
        return this._exParams;
    }

    clear() {
        this._data = null;
        this._type = "";
        this._exParams = null;
    }
};
window.Nuun_TempParam = Nuun_TempParam;

function structureData(params) {
    return JSON.parse(JSON.stringify(params, function(key, value) {
        try {
            return JSON.parse(value);
        } catch (e) {
            return NuunManager.getEvalCode(value);
        }
    }));
};

function stringCode(code) {
    try {
        if (code.indexOf("'") === 0 || code.indexOf('"' === 0)) {
            return eval(code);//'または"を外す。
        }
        return !!code ? String(code) : null;
    } catch (e) {
        return code;
    }
};


function nuun_GausePlugins() {
    return (
        Imported.NUUN_ButlerHPGauge || Imported.NUUN_EnemyMPGauge || Imported.NUUN_EnemyTPGauge || Imported.NUUN_ButlerName || Imported.NUUN_EnemyTpbGauge || Imported.NUUN_EnemyStateIconEX ||
        Imported.NUUN_BattlerMPGauge || Imported.NUUN_BattlerTPGauge || Imported.NUUN_BattlerTpbGauge
    )
}

function getDataSystemColor(data) {
    if (!!data.SystemNameColor) {
        return data.SystemNameColor;
    } else if (!!data.NameColor) {
        return data.NameColor;
    }
};

function getDataUnit(data) {
    if (!!data.paramUnit) {
        return data.paramUnit;
    }
};

function NuunManager() {
    throw new Error("This is a static class");
}

window.NuunManager = NuunManager;

NuunManager.isFilterClass = function(_class) {
    if (!!_class._classNameId) {
        return _class._classNameId;
    } else if (_class._data && _class._data.Id) {
        return _class._data.Id;
    } else {
        return String(_class.constructor.name);
    }
};

NuunManager.getColorCode = function(color) {
    if (typeof(color) === "string" && color.indexOf('#') === 0) {
        return color;
    }
    return ColorManager.textColor(color);
};

NuunManager.numPercentage = function(num, digits, mode) {
    if (isNaN(num)) { return num }
    return (mode ? Math.round(num * Math.pow(10, digits + 2)) : Math.floor(num * Math.pow(10, digits + 2))) / Math.pow(10, digits + 2);
};

NuunManager.nuun_getListIdData = function(id) {
  let newId = [];
  if (id.includes('-')) {
    const data = id.split('-').map(Number);
    for (let i = data[0]; i <= data[1]; i++) {
      Array.prototype.push.apply(newId, [i]);
    }
    return newId;
  } else {
    return [Number(id)];
  }
};

NuunManager.getStringCode = function(code) {
    if (!code) {
        return null;
    }
    return stringCode(code);
};

NuunManager.getEvalCode = function(code) {
    if (isNaN(code)) {
        if (!code) {
            return null;
        }
        return stringCode(code);
    } else {
        return String(code);
    }
};

NuunManager.stringCodeSplit = function(code, mode) {
    const list = code.split(',');
    for (let data of list) {
        if (code.indexOf("[") === 0) {
            data = data.slice(1, 2);
        }
    }
    return mode ? list.map(Number) : list;
};

NuunManager.paramClone = function(param) {
    return JSON.parse(JSON.stringify(param));
};

NuunManager.getMetaCode = function(object, method) {
    const meta = object.meta[method];
    if (!meta) return null;
    if (meta.indexOf('[') >= 0) {
        const log = ($gameSystem.isJapanese() ? "パラメータに[]が含まれています。[]を外して記入して下さい。" : "The parameter contains []. Please remove the [] and enter it.");
        throw ["ParameterError", log];
    }
    return meta;
};

NuunManager.getMetaCodeList = function(object, method) {
    const meta = object.meta[method];
    if (!meta) return null;
    if (meta.indexOf('[') >= 0) {
        const log = ($gameSystem.isJapanese() ? "パラメータに[]が含まれています。[]を外して記入して下さい。" : "The parameter contains []. Please remove the [] and enter it.");
        throw ["ParameterError", log];
    }
    return meta.split(',');
};

NuunManager.setMainFontFace = function(font) {
    this._mainFontFace = font ? font : null;
};

NuunManager.setNumberFontFace = function(font) {
    this._numberFontFace = font ? font : null;
};

NuunManager.resetFontFace = function() {
    this._mainFontFace = null;
    this._numberFontFace = null;
};

NuunManager.mainFontFace = function() {
    return this._mainFontFace || $gameSystem.mainFontFace();
};

NuunManager.numberFontFace = function() {
    return this._numberFontFace || $gameSystem.numberFontFace();
};

NuunManager.isFontFace = function() {
    return !!this._mainFontFace || !!this._numberFontFace;
};

const _Game_Interpreter_command357 = Game_Interpreter.prototype.command357;
Game_Interpreter.prototype.command357 = function(params) {
    PluginManager.setNuunEventData(this._eventId);
    return _Game_Interpreter_command357.call(this, params);
};

PluginManager.setNuunEventData = function(eventId) {
    this.nuunEvent = $gameMap ? $gameMap._events[eventId] : null;
};

DataManager.nuun_structureData = function(params){
  return params ? structureData(params) : [];
};

const _Scene_Boot_onDatabaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
Scene_Boot.prototype.onDatabaseLoaded = function() {
  _Scene_Boot_onDatabaseLoaded.call(this);
  DataManager.nuun_Data();
};

DataManager.nuun_Data = function(){
  DataManager.nuun_DataObject($dataActors, 1);
  DataManager.nuun_DataObject($dataEnemies, 7);
};

DataManager.nuun_DataObject = function(object, code){
  for(let i = 1; i <= object.length; i++){
    if (object[i]) {
      if(code === 1) {
        DataManager.nuun_loadDataActors(object[i]);
      } else if (code === 7) {
        DataManager.nuun_loadDataEnemies(object[i]);
      }
    }
  }
};

DataManager.nuun_loadDataActors = function(deta){
};

DataManager.nuun_loadDataEnemies = function(deta){
};

ImageManager.nuun_backGround = function(filename) {
  return this.loadBitmap("img/nuun_background/", filename);
};

ImageManager.nuun_actorPictures = function(filename) {
  return this.loadBitmap("img/nuun_actorpictures/", filename);
};

ImageManager.nuun_LoadPictures = function(filename) {
  const bitmap = this.loadBitmap("img/", filename);
  bitmap.nuun_LoadBitmap = true;
  return bitmap;
};

const _ImageManager_throwLoadError = ImageManager.throwLoadError;
ImageManager.throwLoadError = function(bitmap) {
    if (bitmap.nuun_LoadBitmap) {
        try {
            _ImageManager_throwLoadError.call(this, bitmap);
        } catch (e) {
            
        }
    } else {
        _ImageManager_throwLoadError.call(this, bitmap);
    }
};


const _Bitmap_isReady = Bitmap.prototype.isReady;
Bitmap.prototype.isReady = function() {
    if (this.nuun_LoadBitmap && this.isError()) {
        this._loadingState = "none";
    }
    return _Bitmap_isReady.call(this);
};


Bitmap.prototype.nuun_contentsBackBlt = function(source, sx, sy, sw, sh, dx, dy, dw, dh, pscale, mode) {
  let scale = pscale / 100;
  let scale2 = 100 / pscale;
  const scaleMode = source.width * scale < dw || source.height * scale < dh;
  if (scaleMode) {
    scale = 1.0;
    scale2 = Math.max(dw / source.width, dh / source.height);
  }
  const width = (scaleMode  ? source.width : sw * scale2);
  const height = (scaleMode ? source.height : sh) * scale2;
  const x = Math.floor((!mode && scaleMode ? 0 : (dw - source.width) / 2 * -1 * scale));
  const y = Math.floor((!mode ? 0 : (scaleMode ? (dh - source.height) / 2 * -1 * scale2 : (dh - source.height) / 2 * -1 * scale)));
  this.blt(source, x + sx, y + sy, width, height, dx, dy, dw, dh);
};


const _BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
  _BattleManager_initMembers.call(this);
  this.gaugeBaseSprite = null;
};


const _Window_Base_resetFontSettings = Window_Base.prototype.resetFontSettings;
Window_Base.prototype.resetFontSettings = function() {
    _Window_Base_resetFontSettings.call(this);
    NuunManager.resetFontFace();
};

Window_Base.prototype.nuun_DrawActorGauge = function(text, x, y, width, param, maxParam, color1, color2, sColor = ColorManager.systemColor(), status) {
    this.changeTextColor(sColor);
    this.nuun_setFontFace();
    this.contents.fontSize = $gameSystem.mainFontSize() - 2;
    this.nuun_DrawGauge(x, y, width, param / maxParam, color1, color2, status);
    this.drawText(text, x, y + 11, width, "left");
    this.resetTextColor();
    this.nuun_setValueFontFace();
    this.contents.fontSize = $gameSystem.mainFontSize() - 6;
    this.drawText(param, x, y + 8, width, "right");
};

Window_Base.prototype.nuun_DrawGauge = function(x, y, width, rate, color1, color2, status) {
    const labelWidth = status === "time" ? 0 : this.nuun_LabelWidth() + 6;
    const gaugeX = x + labelWidth;
    const gaugeY = y + this.lineHeight() - 10;
    width -= labelWidth;
    const fillW = Math.floor((width - 2) * rate);
    const fillH = 10;
    this.contents.fillRect(gaugeX, gaugeY, width, 12, ColorManager.gaugeBackColor());
    this.contents.gradientFillRect(gaugeX + 1, gaugeY + 1, fillW, fillH, color1, color2);
};

Window_Base.prototype.nuun_gaugeX = function(statusType) {
    if (statusType === "time") {
        return 0;
    } else {
        return this.nuun_LabelWidth() + 6;
    }
};

Window_Base.prototype.nuun_LabelWidth = function() {
    const labels = [TextManager.hpA, TextManager.mpA, TextManager.tpA];
    const widths = labels.map(str => this.textWidth(str));
    return Math.ceil(Math.max(...widths));
};

Window_Base.prototype.nuun_DrawContentsParamUnitText = function(text, data, x, y, width, unit) {
    const padding = this.itemPadding();
    unit = getDataUnit(data) || unit;
    const unitWidth = unit ? this.textWidth(unit) + padding : 0;
    if (NuunManager.isFontFace()) {
        isNaN(text) ? this.nuun_setFontFace() : this.nuun_setValueFontFace();
    }
    this.drawText(text, x, y, width - unitWidth, (data.Align || 'right'));
    if (unit) {
        this.changeTextColor(NuunManager.getColorCode(getDataSystemColor(data)));
        this.nuun_setFontFace();
        const textWidth = Math.min(this.textWidth(text), width - unitWidth);
        if (data.Align === 'left') {
            this.drawText(unit, x + textWidth + padding, y, width);
        } else if (data.Align === 'right') {
            this.drawText(unit, x + width - unitWidth + padding, y, width);
        } else if (data.Align === 'center') {
            this.drawText(unit, x + Math.floor(width / 2) + Math.floor(textWidth / 2) - padding, y, width);
        } else {
            this.drawText(unit, x + width - unitWidth + padding, y, width);
        }
    }
};

Window_Base.prototype.nuun_setFontFace = function() {
    this.contents.fontFace = NuunManager.mainFontFace();
};

Window_Base.prototype.nuun_setValueFontFace = function() {
    this.contents.fontFace = NuunManager.numberFontFace();
};

const _Window_Base_drawCurrencyValue = Window_Base.prototype.drawCurrencyValue;
Window_Base.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
    if (NuunManager.isFontFace()) {
        const unitWidth = Math.min(80, this.textWidth(unit));
        this.nuun_setValueFontFace();
        this.resetTextColor();
        this.drawText(value, x, y, width - unitWidth - 6, "right");
        this.changeTextColor(ColorManager.systemColor());
        this.nuun_setFontFace();
        this.drawText(unit, x + width - unitWidth, y, unitWidth, "right");
    } else {
        _Window_Base_drawCurrencyValue.call(this, value, unit, x, y, width);
    }
};

const _Window_addInnerChild = Window.prototype.addInnerChild;
Window.prototype.addInnerChild = function(child) {
    child.className = NuunManager.isFilterClass(this);
    return _Window_addInnerChild.call(this, child);
};


const _Window_Selectable_drawItemBackground = Window_Selectable.prototype.drawItemBackground;
Window_Selectable.prototype.drawItemBackground = function(index) {
  if (!this._contentsBackVisible) {
    _Window_Selectable_drawItemBackground.call(this, index);
  }
};

const _Window_Base_initialize = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function(rect) {
    _Window_Base_initialize.call(this, rect);
    this.createContentsExSprite();
    this._userWindowSkin = null;
};

Window_Base.prototype.createContentsExSprite = function() {
    this._contentsExSprite = new Sprite()
    const index = this._clientArea.children.indexOf(this._contentsSprite);
    this._clientArea.addChildAt(this._contentsExSprite, index);
};

const _Window_Base_loadWindowskin = Window_Base.prototype.loadWindowskin;
Window_Base.prototype.loadWindowskin = function() {
    if (this._userWindowSkin) {
        this.windowskin = ImageManager.loadSystem(this._userWindowSkin);
    } else {
        _Window_Base_loadWindowskin.call(this);
    }
};

Window_Base.prototype.nuun_addClientAreaSprite = function(sprite) {
    this._contentsExSprite.addChild(sprite);
};

Window_Base.prototype.nuun_getListIdData = function(id) {
    let newId = [];
    if (id.includes('-')) {
        const data = id.split('-').map(Number);
        for (let i = data[0]; i <= data[1]; i++) {
        Array.prototype.push.apply(newId, [i]);
        }
        return newId;
    } else {
        return [Number(id)];
    }
};


const _Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    _Spriteset_Battle_createLowerLayer.call(this);
    if (nuun_GausePlugins()) {
        this.createGaugeBase();
    }
};

Spriteset_Battle.prototype.createGaugeBase = function() {
  if (!this._battlerGaugeBase) {
    const sprite = new Sprite();
    this.addChild(sprite);
    this._battlerGaugeBase = sprite;
    BattleManager.gaugeBaseSprite = sprite;
  }
};

const _Spriteset_Battle_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
    _Spriteset_Battle_update.call(this);
    this.updateBattlerGauge();
};

Spriteset_Battle.prototype.updateBattlerGauge = function() {
    if (this._battlerGaugeBase) {
        for (const sprite of this._battlerGaugeBase.children) {
            const spriteData = this._enemySprites.some(enemy => enemy.spriteId === sprite.enemySpriteId);
        if (!spriteData) {
            this._battlerGaugeBase.removeChild(sprite);
        }
        }
    }
};

const _Window_ItemList_initialize  = Window_ItemList.prototype.initialize;
Window_ItemList.prototype.initialize = function(rect) {
    _Window_ItemList_initialize.call(this, rect);
    this._className = NuunManager.isFilterClass(this);
};

Window_ItemList.prototype.isConstructor = function() {
    return false;
};


const _Game_Action_clear = Game_Action.prototype.clear;
Game_Action.prototype.clear = function() {
    _Game_Action_clear.call(this);
    this._multiElements = [];
};
//以下2つは新バージョンでは必要なし。
Game_Action.prototype.getAttackElementsList = function() {
    return Imported.NUUN_MultiElement ? this.getAttackElements() : this.subject().attackElements();
};

Game_Action.prototype.getItemElementsList = function() {
    return Imported.NUUN_MultiElement ? this.getItemElements() : [this.item().damage.elementId];
};



Sprite_NuunAPngImg.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.initMembers();
};

Sprite_NuunAPngImg.prototype.initMembers = function() {
    this._battler = null;
    this._apngMode = null;
    this._data = null;
    this._pictureName = null;
};

Sprite_NuunAPngImg.prototype.setup = function(battler, data, name, mode) {
    this._battler = battler;
    this._data = data;
    this._pictureName = name.split('pictures/')[1];
    this._actorPictureEXApp = mode;
    this.refresh();
};

Sprite_NuunAPngImg.prototype.refresh = function() {
    if (this.addApngChild && this.loadApngSprite(this._pictureName)) {
        this.addApngChild(this._pictureName);
        this._apngMode = true;
    }
};

Sprite_NuunAPngImg.prototype.destroy = function() {
    this.resetApngImg();
    Sprite.prototype.destroy.call(this);
};

Sprite_NuunAPngImg.prototype.resetApngImg = function() {
    this._battler = null;
    if (this._apngMode) {
        this.destroyApngIfNeed();
        this._apngMode = null;
    }
};

Sprite_NuunAPngImg.prototype.isActorPictureEXApp = function() {
    return this._actorPictureEXApp;
};

Sprite_NuunAPngImg.prototype.loadApngSprite = function(name) {
    return Sprite_Picture.prototype.loadApngSprite.call(this, name);
};


Game_Enemy.prototype.allSkillActions = function(actionList) {
    return actionList;
};



})();
