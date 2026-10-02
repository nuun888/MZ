/*:-----------------------------------------------------------------------------------
 * NUUN_GoldEX.js
 * 
 * Copyright (C) 2021 NUUN
 * -------------------------------------------------------------------------------------
 * 
 */
/*:
 * @target MZ
 * @plugindesc  Gold EX
 * @author NUUN
 * @version 1.3.0
 * 
 * @help
 * Expand your money.
 * 
 * Main function
 * Can be separated by commas.
 * You can specify the maximum amount of money you have with a game variable.
 * You can change the maximum holding amount. 0: Default -1: Infinite 1 or more: Arbitrary upper limit (up to 1 quintillion)
 * 
 * plugin command
 * With the event command, you can only increase or decrease your money up to 9999999, but with this plug-in you can increase or decrease it beyond the upper limit.
 * 
 * If a maximum gold variable is specified and its value is set to -1 or lower, the maximum gold amount specified in the plugin parameters will be applied.
 * 
 * If the maximum amount of possession is less than the amount of money on hand, the current maximum value will be applied when increasing or decreasing the amount of money on hand.
 * In addition, the amount of money in your possession that exceeds the new maximum value will disappear.
 * 
 * Terms of Use
 * Credit: Optional
 * Commercial use: Possible
 * Modifications: Possible
 * Redistribution: Possible
 * Support is not available for modified versions or downloads from sources other than https://github.com/nuun888/MZ, the official forum, or authorized retailers.
 * 
 * Log
 * 10/3/2026 Ver.1.3.0
 * Changed the specifications so that the plugin can run without NUUN_Base.
 * Fixed the icon to be displayed in all windows when no icon display class is specified.
 * 12/10/2022 Ver.1.2.1
 * Changed the Type of icon specified plug-in parameter to icon. (Ver.1.6.0 or later)
 * 11/23/2022 Ver.1.2.0
 * Added a function to specify the maximum amount of money in the game with a game variable.
 * 6/4/2022 Ver.1.1.2
 * Added icon display class selection item for menu screen plug-in update.
 * 12/30/2021 Ver.1.1.1
 * Changed the class designation to display the money icon to the combo box.
 * 2/3/2021 Ver.1.1.0
 * Added a function to display the gold icon only for specific classes (default "Window_ShopNumber", "Window_Gold")
 * 1/24/2021 Ver.1.0.1
 * Fixed not to reflect the icon image on the save screen when applying "NUUN_SaveScreen".
 * 1/13/2021 Ver.1.0.0
 * first edition.
 * 
 * @param MaxGold
 * @desc Set the max amount of money you can have. 0: Default -1: No limit　1 or more: Arbitrary upper limit (up to 1 quintillion)
 * @text Max amount of possession
 * @type number
 * @default -1
 * @min -1
 * @max 10000000000000000
 * 
 * @param MaxGoldVariable
 * @type variable
 * @default 0
 * @text Max money variable
 * @desc A variable that stores the max amount of money you have. If none or the value of the variable is -1 or less, the setting in "Max amount of possession" will be applied.
 * 
 * @param GoldIcon
 * @desc Show gold icon. 0 to hide.
 * @text Icon index
 * @type icon
 * @default 0
 * 
 * @param GoldSeparation
 * @desc Separates the display of money in possession with a comma.
 * @text Separated by commas
 * @type boolean
 * @default true
 * 
 * @param IconShowClassData
 * @desc A class that displays an icon. (multiple can be specified)
 * @text Icon display class
 * @type combo[]
 * @option "Window_ShopNumber"
 * @option "Window_Gold"
 * @option "Window_InfoMenu"
 * @option "Window_InfoHeader1"
 * @option "Window_InfoHeader2"
 * @option "Window_InfoFooter"
 * @option "Window_InfoSide"
 * @default []
 * 
 * 
 * @command GetGold
 * @text Increase/decrease of money
 * @desc Increase/decrease of money
 * 
 * @arg Gold
 * @type number
 * @default 0
 * @text Increase/decrease amount of money in possession
 * @desc Increases or decreases possession money. Amounts above or below the event command limit are also possible. (up to 1 quintillion)
 * @min 0
 * @max 10000000000000000
 * 
 * @arg GoldMode
 * @text Increase/decrease processing
 * @desc Choose to process your money.
 * @type select
 * @option Gain
 * @value 0
 * @option Decrease
 * @value 1
 * @default 0
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc  所持金拡張
 * @author NUUN
 * @version 1.3.0
 * 
 * @help
 * 所持金を拡張します。
 * 
 * 主な機能
 * カンマ区切りに出来ます。
 * 所持金の最大数をゲーム変数で指定できます。
 * 最大所持金額を変更出来ます。0:デフォルト -1:無限　1以上:任意の上限（１京まで）
 * 
 * 
 * 
 * プラグインコマンド
 * イベントコマンドでは所持金を9999999までしか増減できませんが、このプラグインでは上限を超えて増減出来ます。
 * 
 * 最大所持金変数が設定されている場合、最大所持金変数に-1以下の数値を格納した場合は、プラグインパラメータの最大所持金額で設定した最大金額が適用されます。
 * 
 * 最大所持金額が手持ちの所持金を下回っていた場合、次の所持金の増減時に現在の最大値が適用されます。
 * なお新たな最大数の値を超えた金額の所持金は消滅します。
 * 
 * 利用規約
 * クレジット表記：任意
 * 商業利用：可能
 * 改変：可能
 * 再配布：可能
 * https://github.com/nuun888/MZ、公式フォーラム、正規販売サイト以外からのダウンロード、改変済みの場合はサポートは対象外となります。
 * 
 * 更新履歴
 * 2026/10/3 Ver.1.3.0
 * NUUN_Baseなしで実行できるように仕様を変更。
 * アイコン表示クラスが未指定ならすべてのウィンドウに適用するように修正。
 * 2022/12/10 Ver.1.2.1
 * アイコン指定のプラグインパラメータのTypeをiconに変更。(Ver.1.6.0以降)
 * 2022/11/23 Ver.1.2.0
 * 所持金の最大数をゲーム変数で指定する機能を追加。
 * 2022/6/4 Ver.1.1.2
 * メニュー画面プラグイン更新に対してのアイコン表示クラス選択項目の追加。
 * 2021/12/30 Ver.1.1.1
 * 所持金アイコンを表示させるクラス指定をコンボボックスに変更。
 * 2021/2/3 Ver.1.1.0
 * 特定のクラスのみ所持金のアイコンを表示させる機能を追加(デフォルトでは"Window_ShopNumber"、"Window_Gold")
 * 2021/1/24 Ver.1.0.1
 * 「セーブ画面拡張プラグインを使用時」、アイコン画像をセーブ画面に反映しないように修正。
 * 2021/1/13 Ver.1.0.0
 * 初版
 * 
 * @param MaxGold
 * @desc お金を所持できる最大金額を設定します。0:デフォルト -1:制限なし　1以上:任意の上限（１京まで）
 * @text 最大所持金額
 * @type number
 * @default -1
 * @min -1
 * @max 10000000000000000
 * 
 * @param MaxGoldVariable
 * @type variable
 * @default 0
 * @text 最大所持金変数
 * @desc 所持金の最大金額を格納する変数。なし及び変数の値が-1以下の場合は最大所持金額での設定が適用されます。
 * 
 * @param GoldIcon
 * @desc アイコンを表示します。0で非表示になります。
 * @text アイコンインデックス
 * @type icon
 * @default 0
 * 
 * @param GoldSeparation
 * @desc 所持金の表示をカンマ区切りにします。
 * @text カンマ区切り
 * @type boolean
 * @default true
 * 
 * @param IconShowClassData
 * @desc アイコンを表示させるクラス。(複数指定可能)
 * @text アイコン表示クラス
 * @type combo[]
 * @option "Window_ShopNumber"
 * @option "Window_Gold"
 * @option "Window_InfoMenu"
 * @option "Window_InfoHeader1"
 * @option "Window_InfoHeader2"
 * @option "Window_InfoFooter"
 * @option "Window_InfoSide"
 * @default []
 * 
 * 
 * @command GetGold
 * @text 所持金の増減。
 * @desc 所持金増減
 * 
 * @arg Gold
 * @type number
 * @default 0
 * @text 所持金増減金額
 * @desc 所持金を増減させます。イベントコマンドの上限を超える金額または下回る金額でも可能です。（１京まで）
 * @min 0
 * @max 10000000000000000
 * 
 * @arg GoldMode
 * @text 増減処理
 * @desc 所持金の処理を選択します。
 * @type select
 * @option 増加
 * @value 0
 * @option 減少
 * @value 1
 * @default 0
 * 
 */
var Imported = Imported || {};
Imported.NUUN_GoldEX = true;

(() => {
    class Nuun_PluginParams_GoldEX {
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

    window.Nuun_PluginParams_GoldEX = Nuun_PluginParams_GoldEX;

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
                return list.map(a => this.getTextCodeMeta(a));
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

    const params = Nuun_PluginParams_GoldEX.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;

    function NuunGoldEXManager() {
        throw new Error("This is a static class");
    }

    window.NuunGoldEXManager = NuunGoldEXManager;

    NuunGoldEXManager.goldEXParams = function(code) {
        switch (code) {
            case 0:
                return params.MaxGold || 0;
            case 1:
                return params.GoldIcon || 0;
            case 2:
                return params.MaxGoldVariable;
            case 3:
                return params.GoldSeparation;
            case 4:
                return params.IconShowClassData || [];
        }
    };

    NuunGoldEXManager.isGoldIcon = function() {
        return this.goldEXParams(1) > 0;
    };

    NuunGoldEXManager.isClassfilter = function() {
        return this.goldEXParams(4).length > 0;
    };

    PluginManager.registerCommand(pluginName, "GetGold", args => {
        if (Number(args.GoldMode) === 0) {
            $gameParty.gainGold(Number(args.Gold));
        } else {
            $gameParty.loseGold(Number(args.Gold));
        }
    });

    const _Game_Party_maxGold = Game_Party.prototype.maxGold;
    Game_Party.prototype.maxGold = function() {
        if (NuunGoldEXManager.goldEXParams(2) > 0) {
            const max = $gameVariables.value(NuunGoldEXManager.goldEXParams(2));
            if (max >= 0) return max;
        }
        switch (NuunGoldEXManager.goldEXParams(0)) {
            case -1:
                return Infinity;
            case 0:
                return _Game_Party_maxGold.apply(this, arguments);
            default:
                return NuunGoldEXManager.goldEXParams(0);
        }
    };


    const _Window_Base_drawCurrencyValue = Window_Base.prototype.drawCurrencyValue;
    Window_Base.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
        if (NuunGoldEXManager.goldEXParams(3)) {
            value = value.toLocaleString();
        }
        if (NuunGoldEXManager.isGoldIcon() && this.showGoldIconClass()) {
            const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
            const delta = (!!ImageManager.standardIconWidth ? (ImageManager.standardIconWidth - ImageManager.iconWidth) / 2 : 0);
            const textMargin = (!!ImageManager.standardIconWidth ? ImageManager.standardIconWidth : ImageManager.iconWidth) + 4;
            this.drawIcon(NuunGoldEXManager.goldEXParams(1), x + delta, iconY);
            x += textMargin;
            width = Math.max(0, width - textMargin);
        }
        _Window_Base_drawCurrencyValue.call(this, value, unit, x, y, width);
    };

    Window_Base.prototype.showGoldIconClass = function() {
        if (!NuunGoldEXManager.isClassfilter()) return true;
        const thisClass = String(this.constructor.name);
        return NuunGoldEXManager.goldEXParams(4).some(data => data === thisClass);
    };


})();