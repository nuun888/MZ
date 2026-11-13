/*:-----------------------------------------------------------------------------------
 * NUUN_ConsumptionItem.js
 * 
 * Copyright (C) 2020 NUUN
 * -------------------------------------------------------------------------------------
 * 
 */
/*:
 * @target MZ
 * @plugindesc  Item Consumption Rate
 * @author NUUN
 * @version 2.0.0
 * 
 * @help
 * You can create items that are consumed at a specified probability.
 * If the consumption rate is 50%, the item has a 50% chance of being consumed each time it is used.
 * If the consumption rate is 150%, one item is always consumed each time it is used, with an additional 50% chance of consuming one more item.
 * 
 * You can also set traits that reduce the item consumption rate.
 * On the map, the highest consumption reduction rate among party members is applied.
 * During battle, the consumption reduction rate of the item user is applied.
 * 
 * Item Note Tags
 * <ConsumptionItem:[id]> Sets the item consumption rate.
 * [id]: The list ID or identifier name specified in the "Consumption Items" plugin parameter.
 * 
 * <ConsumptionMessage:[Text]> Sets the message displayed in the battle log when an item is consumed.
 * [Text]: Message to display.
 * %1: User name
 * %2: Item name
 * Display priority: Note tag setting → Consumption Items setting → Default Consumption Message.
 * 
 * <ConsumptionSE:[name],[volume],[pitch],[pan]> Sets the SE played when an item is consumed.
 * <ConsumptionSE:Break, 90, 100, 50> Plays the "Break" SE when the item is consumed.
 * [name]: File name (without extension)
 * [volume]: Volume
 * [pitch]: Pitch
 * [pan]: Pan
 * Playback priority: Note tag setting → Consumption Items setting → Default SE.
 * When using legacy settings:
 * Playback priority: Note tag setting → Consumption Items setting → Legacy SE setting → Default SE.
 * 
 * Trait Note Tags
 * <ConsumptionRatio:[ratio]> Reduces the probability of item consumption.
 * [ratio]: Consumption rate modifier
 * <ConsumptionRatio:70> Reduces the consumption rate to 70% of its original value.
 * An item with a 50% consumption rate will have a 35% chance of being consumed.
 * This tag only applies to items with the ConsumptionRate tag.
 * 
 * <NoConsumptionRatio>
 * Disables consumption rate reduction for this item.
 * 
 * Text Control Characters
 * Control characters can be used in all consumption messages.
 * %1: User name (party leader on the map)
 * %2: Item name
 * 
 * Legacy Settings
 * 
 * Add <ConsumptionRate:[rate]> to the item's note box.
 * [rate]: Consumption probability
 * <ConsumptionRate:50> The item has a 50% chance of being consumed when used.
 * 
 * Log
 * 11/14/2026 Ver.2.0.0
 * Changed the configuration method to use plugin parameters. (Legacy settings are still supported.)
 * Added support for consumption rates exceeding 100%. (New settings only)
 * Added a plugin command to consume items with the consumption rate applied during events.
 * Changed the item user on the map to reference the party leader.
 * 11/6/2021 Ver.1.1.1
 * Added an option to set the default SE played when an item is consumed.
 * Added support for traits that reduce the item consumption rate.
 * 11/3/2021 Ver.1.1.0
 * Changed the message format.
 * 12/31/2020 Ver.1.0.0
 * First edition.
 * 
 * 
 * @command ConsumeItems
 * @text Consume Item with Consumption Rate
 * @desc Consumes an item using the specified consumption rate.
 *
 * @arg consumeItem
 * @type item
 * @default 0
 * @text Item
 * @desc Specifies the item to consume. The consumption rate is applied.
 * 
 * 
 * @param ConsumptionItemList
 * @text Consumption Items
 * @desc Sets the consumption rate, message, and SE for items.
 * @type struct<ConsumptionItem>[]
 * @default
 *
 * @param ConsumptionNoLog
 * @text Consumption Message
 * @desc Sets the default message displayed when an item is consumed.
 * @type string
 * @default
 *
 * @param ConsumptionItemSE_r
 * @text Consumption SE
 * @desc Sets the default SE played when an item is consumed.
 * @type struct<ConsumptionItemSEData>
 * @default
 * 
 * @param OldSetting
 * @text Legacy Settings
 * @default ------------------------------
 *
 * @param ConsumptionItemSE
 * @text Consumption SE
 * @desc Sets the SE played when an item with a consumption rate is consumed.
 * @type file
 * @dir audio/se/
 * @parent OldSetting
 *
 * @param volume
 * @text Volume
 * @desc Sets the SE volume.
 * @type number
 * @default 90
 * @parent OldSetting
 *
 * @param pitch
 * @text Pitch
 * @desc Sets the SE pitch.
 * @type number
 * @default 100
 * @parent OldSetting
 *
 * @param pan
 * @text Pan
 * @desc Sets the SE pan.
 * @type number
 * @default 0
 * @max 100
 * @min -100
 * @parent OldSetting
 * 
 */
/*~struct~ConsumptionItem:
 * 
 * @param IdentifierName
 * @text Identifier Name
 * @desc Sets the identifier name.
 * @type string
 * @default
 *
 * @param ConsumptionRate
 * @text Consumption Rate
 * @desc Sets the probability that the item will be consumed after use.
 * @type number
 * @default 50
 *
 * @param ConsumptionNoLog
 * @text Consumption Message
 * @desc Sets the message displayed when an item is consumed.
 * @type string
 * @default
 *
 * @param ConsumptionItemSE
 * @text Consumption SE
 * @desc Sets the SE played when an item with a consumption rate is consumed.
 * @type struct<ConsumptionItemSEData>
 * @default
 * 
 */
/*~struct~ConsumptionItemSEData:
 * 
 * @param name
 * @text SE
 * @desc Sets the SE to play.
 * @type file
 * @dir audio/se/
 *
 * @param volume
 * @text Volume
 * @desc Sets the SE volume.
 * @type number
 * @default 90
 *
 * @param pitch
 * @text Pitch
 * @desc Sets the SE pitch.
 * @type number
 * @default 100
 *
 * @param pan
 * @text Pan
 * @desc Sets the SE pan.
 * @type number
 * @default 0
 * @max 100
 * @min -100
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc  アイテム消耗率
 * @author NUUN
 * @version 2.0.0
 * 
 * @help
 * アイテムに一定の確率で消費するアイテムを作ることが出来ます。
 * 消耗率が50%の場合は使用ごとに50%の確率でアイテムを消費します。
 * 消耗率が150%の場合は使用ごとにアイテムを1つ消費し、50%の確率でさらにアイテムを1つ消費します。
 * 
 * 消耗率を軽減できる特徴を設定できます。
 * なお、マップ上ではパーティメンバーの中で一番軽減率の高い数値で判定します。
 * 戦闘中では使用者の軽減率で判定します。
 * 
 * 
 * アイテムのメモ欄
 * <ConsumptionItem:[id]> アイテムに消耗率を設定します。
 * [id]:プラグインパラメータ「消耗時アイテム」のリストIDたは識別名。
 * 
 * <ConsumptionMessage:[Text]> 戦闘時のアイテム消耗時に表示するメッセージ（ログ）を表示します。
 * [Text]:表示メッセージ（ログ）
 * %1：使用者名
 * %2：アイテム名
 * 表示優先度はメモタグの設定→消耗時アイテムでの設定→消耗時テキストの順になります。
 * 
 * <ConsumptionSE:[name],[volume],[pitch],[pan]>アイテム消耗時に再生するSEを指定します。
 * <ConsumptionSE:Break, 90, 100, 50>アイテム消耗時に「Break」が再生されます。
 * [name]:ファイル名（拡張子なし）
 * [volume]:音量
 * [pitch]:ピッチ
 * [pan]:位相
 * 再生優先度はメモタグの設定→消耗時アイテムでの設定→デフォルトＳＥの順になります。
 * 旧設定の場合
 * 再生優先度はメモタグの設定→消耗時アイテムでの設定→旧設定でのＳＥ→デフォルトＳＥの順になります。
 * 
 * 特徴を持つメモ欄
 * <ConsumptionRatio:[ratio]> 消耗する確率を軽減します。
 * [ratio]：補正消耗率
 * <ConsumptionRatio:70> 消耗率が70%されます。消耗率50%のアイテムは35%の確率で消耗します。
 * このタグが有効なアイテムはConsumptionRateのタグが設定されたアイテムのみ適用されます。
 * 
 * <NoConsumptionRatio>
 * このアイテムには消耗率の軽減が適用されません。
 * 
 * テキストの制御文字
 * 消耗時テキストはいずれも制御文字が使用できます。
 * %1：使用者名(マップ上ではリーダー)
 * %2：アイテム名
 * 
 * 旧設定
 * 
 * アイテムのメモ欄に<ConsumptionRate:[rate]>を記入します。
 * [rate]:確率
 * <ConsumptionRate:50> アイテム使用時に50%の確率で消費します。
 * 
 * 更新履歴
 * 2026/11/14 Ver.2.0.0
 * プラグインパラメータで設定を行うように仕様変更。(旧設定は残しています)
 * 100％を超えて設定できる機能を追加。(新仕様のみ)
 * イベントでの消耗率を適用するアイテム消費を行うプラグインコマンドを追加。
 * マップ上では使用者をリーダーを参照するように修正。
 * 2021/11/6 Ver.1.1.1
 * 消耗時のデフォルトのSEを設定出来る項目を追加。
 * 消耗率を軽減出来る特徴を設定できる機能を追加。
 * 2021/11/3 Ver.1.1.0
 * メッセージのフォーマットを変更。
 * 2020/12/31 Ver.1.0.0
 * 初版
 * 
 * 
 * 
 * @command ConsumeItems
 * @text 消耗率適用アイテム消費
 * @desc アイテムを消費させます。消耗率が適用されます。
 * 
 * @arg consumeItem
 * @type item
 * @default 0
 * @text アイテム
 * @desc 消費させるアイテムを指定します。消耗率が適用されます。
 * 
 * 
 * @param ConsumptionItemList
 * @text 消耗時アイテム
 * @desc 消耗率が設定してあるアイテムが消耗したときのSEを設定します。
 * @type struct<ConsumptionItem>[]
 * @default 
 * 
 * @param ConsumptionNoLog
 * @text 消耗時テキスト
 * @desc アイテムを消耗した際のテキストを設定します。
 * @type string
 * @default 
 * 
 * @param ConsumptionItemSE_r
 * @text 消耗時SE
 * @desc 消耗率が設定してあるアイテムが消耗したときのSEを設定します。
 * @type struct<ConsumptionItemSEData>
 * @default 
 * 
 * @param OldSetting
 * @text 旧仕様設定
 * @default ------------------------------
 * 
 * @param ConsumptionItemSE
 * @text 消耗時SE
 * @desc 消耗率が設定してあるアイテムが消耗したときのSE
 * @type file
 * @dir audio/se/
 * @parent OldSetting
 * 
 * @param volume
 * @text 音量
 * @desc 音量。
 * @type number
 * @default 90
 * @parent OldSetting
 * 
 * @param pitch
 * @text ピッチ
 * @desc ピッチ。
 * @type number
 * @default 100
 * @parent OldSetting
 * 
 * @param pan
 * @text 位相
 * @desc 位相。
 * @type number
 * @default 0
 * @max 100
 * @min -100
 * @parent OldSetting
 * 
 */
/*~struct~ConsumptionItem:ja
 * 
 * @param IdentifierName
 * @text 識別名
 * @desc 識別名を設定します。
 * @type string
 * @default 
 * 
 * @param ConsumptionRate
 * @text 消耗率
 * @desc 使用後に消耗する確率を指定します。
 * @type number
 * @default 50
 * 
 * @param ConsumptionNoLog
 * @text 消耗時テキスト
 * @desc アイテムを消耗した際のテキストを設定します。
 * @type string
 * @default 
 * 
 * @param ConsumptionItemSE
 * @text 消耗時SE
 * @desc 消耗率が設定してあるアイテムが消耗したときのSEを設定します。
 * @type struct<ConsumptionItemSEData>
 * @default 
 * 
 */
/*~struct~ConsumptionItemSEData:ja
 * 
 * @param name
 * @text SE
 * @desc 再生するSEを指定します。
 * @type file
 * @dir audio/se/
 * 
 * @param volume
 * @text 音量
 * @desc 音量。
 * @type number
 * @default 90
 * 
 * @param pitch
 * @text ピッチ
 * @desc ピッチ。
 * @type number
 * @default 100
 * 
 * @param pan
 * @text 位相
 * @desc 位相。
 * @type number
 * @default 0
 * @max 100
 * @min -100
 * 
 */
var Imported = Imported || {};
Imported.NUUN_ConsumptionItem = true;

(() => {
    class Nuun_PluginParams_ConsumptionItem {
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

    window.Nuun_PluginParams_ConsumptionItem = Nuun_PluginParams_ConsumptionItem;

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

    const params = Nuun_PluginParams_ConsumptionItem.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;

    function NuunConsumptionItemManager() {
        throw new Error("This is a static class");
    }

    window.NuunConsumptionItemManager = NuunConsumptionItemManager;

    NuunConsumptionItemManager.useActor = null;
    NuunConsumptionItemManager.consumptionMessage = false;
    NuunConsumptionItemManager.eventConsumptionMessage = false;

    NuunConsumptionItemManager.consumptionItemParams = function(code) {
        switch (code) {
            case 0:
                return params.ConsumptionNoLog;
            case 1:
                return params.ConsumptionItemSE_r;
            case 10:
                return params.ConsumptionItemList || [];
            case 100:
                return params.ConsumptionItemSE;
            case 101:
                return params.volume;
            case 102:
                return params.pitch;
            case 103:
                return params.pan;
        }
    };

    NuunConsumptionItemManager.getMetaCode = function(object, method) {
        const meta = object.meta[method];
        if (!meta) return null;
        if (meta === true) {
            return null;
        }
        if (meta.indexOf('[') >= 0) {
            const log = ($gameSystem.isJapanese() ? "パラメータに[]が含まれています。[]を外して記入して下さい。" : "The parameter contains []. Please remove the [] and enter it.");
            throw ["ParameterError", log];
        }
        return meta;
    };

    NuunConsumptionItemManager.getMetaCodeList = function(object, method) {
        const meta = object.meta[method];
        if (!meta) return null;
        if (meta === true) {
            return null;
        }
        if (meta.indexOf('[') >= 0) {
            const log = ($gameSystem.isJapanese() ? "パラメータに[]が含まれています。[]を外して記入して下さい。" : "The parameter contains []. Please remove the [] and enter it.");
            throw ["ParameterError", log];
        }
        return meta;
    };

    NuunConsumptionItemManager.getConsumptionItemSE = function(item, data) {
        const tagSe = this.getTagConsumptionItemSE(item);
        if (!!tagSe) return tagSe;
        if (!!data && !!data.ConsumptionItemSE && !!data.ConsumptionItemSE.name) return data.ConsumptionItemSE;
        const se = this.consumptionItemParams(1);
        if (!!se && se.name) return se;
        const name = this.consumptionItemParams(100);
        if (!name) return null;
        return {"name":name,"volume":this.consumptionItemParams(101), "pitch":this.consumptionItemParams(102),"pan":this.consumptionItemParams(103)};
    };

    NuunConsumptionItemManager.getTagConsumptionItemSE = function(item) {
        if (!item.meta.ConsumptionSE) return null;
        const detas = NuunConsumptionItemManager.getMetaCode(item, "ConsumptionSE");
        const date = detas.split(',');
        return {"name":date[0],"volume":Number(date[1] || 0),"pitch":Number(date[2] || 0),"pan":Number(date[3] || 0)};
    };

    NuunConsumptionItemManager.getConsumptionMessage = function(item) {
        const text = this.getMetaCode(item, "ConsumptionMessage");
        if (!!text) return text;
        const data = !!item.meta.ConsumptionItem ? this.consumptionItemParams(10)[this.getConsumptionId(this.getMetaCode(item, "ConsumptionItem"))] : null;
        if (!!data && !!data.ConsumptionNoLog) return data.ConsumptionNoLog;
        return this.consumptionItemParams(0);
    };

    NuunConsumptionItemManager.getConsumptionId = function(id) {
        if (isNaN(id)) {
            return this.consumptionItemParams(10).findIndex(data => data.IdentifierName === id);
        } else {
            return Number(id) - 1;
        }
    };

    NuunConsumptionItemManager.isConsumptionMessage = function() {
        return this.consumptionMessage;
    };

    NuunConsumptionItemManager.isEventConsumptionMessage = function() {
        return this.eventConsumptionMessage;
    };


    PluginManager.registerCommand(pluginName, "ConsumeItems", args => {
        $gameParty.eventConsumeItem(Number(args.consumeItem));
    });


    const _Game_Battler_consumeItem = Game_Battler.prototype.consumeItem;
    Game_Battler.prototype.consumeItem = function(item) {
        NuunConsumptionItemManager.useActor = this;
        _Game_Battler_consumeItem.apply(this, arguments);
    };

    const _Game_Party_consumeItem = Game_Party.prototype.consumeItem;
    Game_Party.prototype.consumeItem = function(item) {
        let num = NaN;
        if (!!item && $dataItems[item.id] === item && item.consumable) {
            num = this.isItemConsumption(item);
        }
        this.clearConsumeItemUseActor();
        if (isNaN(num) || num === 1) {
            _Game_Party_consumeItem.apply(this, arguments);
        } else if (num > 1) {
            this.loseItem(item, num);
        }
    };

    Game_Party.prototype.isItemConsumption = function(item) {
        if (!item.meta.ConsumptionRate && !item.meta.ConsumptionItem) {
            return NaN;
        };
        if (!!item.meta.ConsumptionRate) {
            const reslit = this.consumeRate(item);
            return !!reslit ? 1 : 0;
        }
        const data = NuunConsumptionItemManager.consumptionItemParams(10)[NuunConsumptionItemManager.getConsumptionId(NuunConsumptionItemManager.getMetaCode(item, "ConsumptionItem"))];
        if (!data) {
            return 1;
        }
        const rate = (data.ConsumptionRate - 1) % 100 + 1;
        const consumptionNum = Math.max(Math.ceil(data.ConsumptionRate / 100) - 1, 0);
        const reslit = Math.random() * 100 < (item.meta.NoConsumptionRatio ? rate : this.consumptionItemRatio(rate));
        if (!!reslit) {
            this.consumptionMessage(item, data);
            this.consumptionSe(NuunConsumptionItemManager.getConsumptionItemSE(item, data)); 
        }
        return consumptionNum + (!!reslit ? 1 : 0);
    };

    Game_Party.prototype.consumeRate = function(item) {
        const data = NuunConsumptionItemManager.getMetaCode(item, "ConsumptionRate");
        const rate = Math.min((Number(data || 0) ? Number(data) : 100), 100);
        const reslit = Math.random() * 100 < (item.meta.NoConsumptionRatio ? rate : this.consumptionItemRatio(rate));
        if (!!reslit) {
            this.consumptionMessage(item);
            this.consumptionSe(NuunConsumptionItemManager.getConsumptionItemSE(item));
        }
        return reslit;
    };

    Game_Party.prototype.consumptionItemRatio = function(rate) {
        return rate * (this.inBattle() ? this.consumptionRatioInBattle() : this.consumptionRatioMembers());
    };

    Game_Party.prototype.consumptionRatioInBattle = function() {
        const actor = NuunConsumptionItemManager.useActor;
        return actor ? this.consumptionRatio(actor) : 1.0;
    };

    Game_Party.prototype.consumptionRatioMembers = function(item) {
        return this.battleMembers().reduce((r, member) => {
            const rate = this.consumptionRatio(member);
            if (r > rate) {
                r = rate;
            }
            return r;
        }, 1.0);
    };

    Game_Party.prototype.consumptionRatio = function(member) {
        return member.traitObjects().reduce((r, obj) => {
            if (obj.meta.ConsumptionRatio) {
                return r * Number(NuunConsumptionItemManager.getMetaCode(obj, "ConsumptionRatio") || 100) / 100;
            } else {
                return r;
            }
        }, 1.0);
    };

    Game_Party.prototype.consumptionMessage = function(item, data) {
        const text = NuunConsumptionItemManager.getConsumptionMessage(item);
        if (!text) return;
        if (!this.inBattle() && NuunConsumptionItemManager.isEventConsumptionMessage()) {
            $gameMessage.add(text.format(this.leader()?.name() ?? "", item.name));
        } else if (this.inBattle()) {
            NuunConsumptionItemManager.consumptionMessage = true;
        }
    };

    Game_Party.prototype.consumptionSe = function(se) {
        if (!!se && !!se.name) {
            AudioManager.playSe(se);
        }
    };

    Game_Party.prototype.clearConsumeItemUseActor = function(item) {
        NuunConsumptionItemManager.useActor = null;
    };

    Game_Party.prototype.eventConsumeItem = function(id) {
        const item = $dataItems[id];
        if (!!item && this.numItems(item) > 0) {
            NuunConsumptionItemManager.eventConsumptionMessage = true;
            NuunConsumptionItemManager.useActor = this.leader();
            this.consumeItem(item);
        }
        NuunConsumptionItemManager.eventConsumptionMessage = false;
    };

    const _BattleManager_initMembers = BattleManager.initMembers;
    BattleManager.initMembers = function() {
        _BattleManager_initMembers.call(this);
        NuunConsumptionItemManager.consumptionMessage = false;
    };

    const _Window_BattleLog_displayItemMessage = Window_BattleLog.prototype.displayItemMessage;
    Window_BattleLog.prototype.displayItemMessage = function(fmt, subject, item) {
        _Window_BattleLog_displayItemMessage.call(this, fmt, subject, item);
        if (NuunConsumptionItemManager.isConsumptionMessage()) {
            this.push("pushBaseLine");
            this.displayConsumption(subject, item);
            NuunConsumptionItemManager.consumptionMessage = false;
        }
    };

    Window_BattleLog.prototype.displayConsumption = function(subject, item) {
        const text = NuunConsumptionItemManager.getConsumptionMessage(item);
        if (!text) return;
        this.push("addText", text.format(subject.name(), item.name));
    };


})();