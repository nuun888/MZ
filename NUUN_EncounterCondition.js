/*:-----------------------------------------------------------------------------------
 * NUUN_EncounterCondition.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */
/*:
 * @target MZ
 * @plugindesc Encounter conditions
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 2.0.0
 * 
 * @help
 * Sets encounter conditions for enemy groups.
 * 
 * Please enter the following tags in the Comment on the first page of the enemy group.
 * <EncCond:[id]>
 * [id]: Encounter setting ID for plugin parameters
 * If multiple settings are made, it will only appear if all match.
 * 
 * If you want to set it from the encounter region ID, set the plugin parameter "Specify region ID" to true.
 * Specify the encounter setting ID from the plugin parameters as the region ID.
 * If this setting is set to friendly, the original region condition will be disabled. Use the region conditions in this plugin.
 * If multiple settings are set, it will appear only if all match.
 * 
 * Encounter Settings
 * You can set encounter conditions from regions, variables, switches, vehicles, autotiles, and evaluation expressions.
 * Multiple conditions can be set, and an encounter will occur if any of them are matched.
 * If multiple conditions are set (variables, vehicles are set), an encounter will occur if all are matched.
 * 
 * If <EncCond:1><EncCond:2> are specified, the encounter will occur if both match.
 * If multiple conditions of the same type for variables (region, switch, vehicle, autotile, evaluation expression) are set, the encounter will occur if any of them match.
 * If conditions of different types such as variables, switches, vehicles, etc. are set at the same time, the encounter will occur if all conditions match.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 4/20/2025 Ver.2.0.0
 * Changed the setting method to plugin parameters.
 * Added a function to specify the encounter region.
 * Added support for specifying additional regions and autotile IDs as encounter conditions.
 * 12/11/2022 Ver.1.2.2
 * Changed the display in languages other than Japanese to English.
 * 1/8/2022 Ver.1.2.1
 * Fixed the problem that the switch and variable conditions of the new condition definition were defined inversely.
 * 12/19/2021 Ver.1.2.0
 * Support for conditions by "NUUN_ConditionsBase".
 * 8/5/2021 Ver.1.1.0
 * Changed the tag description method for encounter conditions.
 * 1/4/2021 Ver.1.0.0
 * First edition.
 * 
 * @param EncountSetting
 * @desc Set up the encounter settings.
 * @text Encounter Settings
 * @type struct<EncountList>[]
 * @default 
 * 
 * @param RegionIDSetting
 * @text Specify region ID
 * @desc Specify the encounter setting ID by region.
 * @type boolean
 * @default false
 * 
 * 
 */
/*~struct~EncountList:
 * 
 * @param Name
 * @text Distinguished name
 * @desc Distinguished name.
 * @type string
 * @default 
 * 
 * @param EncountRegion
 * @desc Set the region conditions.
 * @text Region encounter settings
 * @type number[]
 * @default 
 * 
 * @param EncountVariable
 * @desc Set the encounter conditions using variables.
 * @text Variable encounter settings
 * @type struct<encountVariable>[]
 * @default 
 * 
 * @param EncountSwitch
 * @desc Set the encounter conditions on the Switch.
 * @text switch encounter settings
 * @type struct<encountSwitch>[]
 * @default 
 * 
 * @param EncountVehicle
 * @desc Set the vehicle encounter conditions.
 * @text Vehicle encounter settings
 * @type struct<encountVehicle>[]
 * @default 
 * 
 * @param EncountFormula
 * @desc Sets encounter conditions using an evaluation formula.
 * @text Evaluate expression condition
 * @type combo[]
 * @option "$gameVariables.value(1) >= 10"
 * @option "$gamePlayer.isInShip()"
 * @default 
 * 
 * @param EncountAutotile
 * @desc Set the encounter conditions for autotile.
 * @text The autotile ID.
 * @type select[]
 * @option None
 * @value -1
 * @option AutotileID 0 (Sea)
 * @value 0
 * @option AutotileID 1 (Deep Sea)
 * @value 1
 * @option AutotileID 2 (Rock Shoal)
 * @value 2
 * @option AutotileID 3 (Icebergs)
 * @value 3
 * @option AutotileID 4 (Poison Swamp)
 * @value 4
 * @option AutotileID 5 (Dead Trees)
 * @value 5
 * @option AutotileID 6 (Lava)
 * @value 6
 * @option AutotileID 7 (Lava Bubbles)
 * @value 7
 * @option AutotileID 8 (Pond)
 * @value 8
 * @option AutotileID 9 (Boulder)
 * @value 9
 * @option AutotileID 10 (Frozen Sea)
 * @value 10
 * @option AutotileID 11 (Whirlpool)
 * @value 11
 * @option AutotileID 12 (Land's End)
 * @value 12
 * @option AutotileID 13 (Endless Waterfall)
 * @value 13
 * @option AutotileID 14 (Cloud (Land's End))
 * @value 14
 * @option AutotileID 15 (Cloud)
 * @value 15
 * @option AutotileID 16 (Grassland A)
 * @value 16
 * @option AutotileID 17 (Grassland A (Dark))
 * @value 17
 * @option AutotileID 18 (Grassland B)
 * @value 18
 * @option AutotileID 19 (Grassland B (Dark))
 * @value 19
 * @option AutotileID 20 (Forest)
 * @value 20
 * @option AutotileID 21 (Forest (Conifer))
 * @value 21
 * @option AutotileID 22 (Mountain (Grass))
 * @value 22
 * @option AutotileID 23 (Mountain (Dirt))
 * @value 23
 * @option AutotileID 24 (Wasteland A)
 * @value 24
 * @option AutotileID 25 (Wasteland B)
 * @value 25
 * @option AutotileID 26 (Dirt Field A)
 * @value 26
 * @option AutotileID 27 (Dirt Field B)
 * @value 27
 * @option AutotileID 28 (Forest (Dead Trees))
 * @value 28
 * @option AutotileID 29 (Road (Dirt))
 * @value 29
 * @option AutotileID 30 (Hill (Dirt))
 * @value 30
 * @option AutotileID 31 (Mountain (Sandstone))
 * @value 31
 * @option AutotileID 32 (Desert A)
 * @value 32
 * @option AutotileID 33 (Desert B)
 * @value 33
 * @option AutotileID 34 (Rocky Land A)
 * @value 34
 * @option AutotileID 35 (Rocky Land B (Lava))
 * @value 35
 * @option AutotileID 36 (Forest (Palm Trees))
 * @value 36
 * @option AutotileID 37 (Road (Paved))
 * @value 37
 * @option AutotileID 38 (Mountain (Rock))
 * @value 38
 * @option AutotileID 39 (Mountain (Lava))
 * @value 39
 * @option AutotileID 40 (Snowfield)
 * @value 40
 * @option AutotileID 41 (Mountain (Snow))
 * @value 41
 * @option AutotileID 42 (Clouds)
 * @value 42
 * @option AutotileID 43 (Large Clouds)
 * @value 43
 * @option AutotileID 44 (Forest (Snow))
 * @value 44
 * @option AutotileID 45 (Pit)
 * @value 45
 * @option AutotileID 46 (Hill (Sandstone))
 * @value 46
 * @option AutotileID 47 (Hill (Snow))
 * @value 47
 * @default 
 * 
 * @param EncountCondEx
 * @desc Sets the encounter conditions in NUUN_ConditionsBase.
 * @text Applicable condition ID of NUUN_ConditionsBase
 * @type number[]
 * @default 
 * 
 */
/*~struct~encountVariable:
 * 
 * @param VariableId
 * @text Variable
 * @desc Specify the variables.
 * @type variable
 * @default 0
 * 
 * @param ComparisonValue
 * @text The value to compare
 * @desc Specifies the value to compare.
 * @type number
 * @default 0
 * 
 * @param Inequality
 * @text Inequality
 * @desc Specifies the inequality sign.
 * @type select
 * @option Equal
 * @value 'equal'
 * @option Greater
 * @value 'greater'
 * @option Less
 * @value 'less'
 * @option GreaterEqual
 * @value 'greaterEqual'
 * @option LessEqual
 * @value 'lessEqual'
 * @default 'equal'
 * 
 */
/*~struct~encountSwitch:
 * 
 * @param SwitchId
 * @text Switch
 * @desc Specifies the switch.
 * @type switch
 * @default 0
 * 
 * @param EncountBoolean
 * @text Flags
 * @desc Specifies flags.
 * @type boolean
 * @default true
 * 
 */
/*~struct~encountVehicle:
 * 
 * @param Vehicle
 * @text Vehicle Type
 * @desc Specifies the type of vehicle.
 * @type select
 * @option Boat
 * @value 'boat'
 * @option Ship
 * @value 'ship'
 * @option Airship
 * @value 'airship'
 * @option Vehicle
 * @value 'vehicle'
 * @option None
 * @value 'none'
 * @default 
 * 
 * @param EncountBoolean
 * @text Flags
 * @desc Specifies flags.
 * @type boolean
 * @default true
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc エンカウント条件
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 2.0.0
 * 
 * @help
 * 敵グループに対してエンカウント条件を付けます。
 * 
 * 
 * 敵グループの１ページ目に注釈で以下のタグを記入してください。
 * <EncCond:[id]>
 * [id]:プラグインパラメータのエンカウント設定ID
 * 複数設定されている場合は全て一致した場合に出現します。
 * 
 * エンカウントのリージョンIDから設定の場合は、プラグインパラメータのリージョンID指定をtrueに設定してください。
 * リージョンIDにプラグインパラメータのエンカウント設定IDを指定してください。
 * この設定を友好にした場合、元のリージョン条件は無効になります。当プラグイン内のリージョン条件を使用してください。
 * 複数設定されている場合は全て一致した場合に出現します。
 * 
 * エンカウント設定
 * リージョン、変数、スイッチ、乗り物、オートタイル、評価式からエンカウント条件を設定できます。
 * 各条件は複数設定でき、何れかが一致した場合にエンカウントします。
 * 条件が複合的に設定(変数、乗り物が設定)されている場合は全てが一致している場合にエンカウントします。
 * 
 * <EncCond:1><EncCond:2>と指定してある場合は両方一致している場合にエンカウント対象になります。
 * 変数(リージョン、スイッチ、乗り物、オートタイル、評価式)の同一タイプの条件が複数設定されている場合は何れかが一致したときにエンカウント対象になります。
 * 変数、スイッチ、乗り物等の別タイプの条件が同時に設定されている場合は全ての条件が一致した場合にエンカウント対象になります。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2025/4/20 Ver.2.0.0
 * 設定方法をプラグインパラメータでの設定方法に変更。
 * エンカウントのリージョンから指定できる機能を追加。
 * エンカウント条件に追加のリージョン、オートタイルIDを指定できるように対応。
 * 2022/12/11 Ver.1.2.2
 * 日本語以外での表示を英語表示に変更。
 * 2022/1/8 Ver.1.2.1
 * 新条件定義のスイッチと変数の条件が逆に定義されていた問題を修正。
 * 2021/12/19 Ver.1.2.0
 * 条件付きベースによる条件に対応。
 * 2021/8/5 Ver.1.1.0
 * エンカウント条件のタグ記述方式を変更。
 * 2021/1/4 Ver.1.0.0
 * 初版
 * 
 * @param EncountSetting
 * @desc エンカウントの設定を行います。
 * @text エンカウント設定
 * @type struct<EncountList>[]
 * @default 
 * 
 * @param RegionIDSetting
 * @text リージョンID指定
 * @desc エンカウント設定のIDをリージョンで指定します。
 * @type boolean
 * @default false
 * 
 */
/*~struct~EncountList:ja
 * 
 * @param Name
 * @text 識別名
 * @desc 識別名
 * @type string
 * @default 
 * 
 * @param EncountRegion
 * @desc リージョンでの条件を設定します。
 * @text リージョンエンカウント設定
 * @type number[]
 * @default 
 * 
 * @param EncountVariable
 * @desc 変数での条件を設定します。
 * @text 変数エンカウント設定
 * @type struct<encountVariable>[]
 * @default 
 * 
 * @param EncountSwitch
 * @desc スイッチでの条件を設定します。
 * @text スイッチエンカウント設定
 * @type struct<encountSwitch>[]
 * @default 
 * 
 * @param EncountVehicle
 * @desc 乗り物での条件を設定します。
 * @text 乗り物エンカウント設定
 * @type struct<encountVehicle>[]
 * @default 
 * 
 * @param EncountFormula
 * @desc 評価式での条件を設定します。
 * @text 評価式条件
 * @type combo[]
 * @option "$gameVariables.value(1) >= 10"
 * @option "$gamePlayer.isInShip()"
 * @default 
 * 
 * @param EncountAutotile
 * @desc オートタイルでの条件を設定します。
 * @text オートタイルID
 * @type select[]
 * @option なし
 * @value -1
 * @option オートタイルID 0 （海）
 * @value 0
 * @option オートタイルID 1 （深い海）
 * @value 1
 * @option オートタイルID 2 （岩礁）
 * @value 2
 * @option オートタイルID 3 （氷山）
 * @value 3
 * @option オートタイルID 4 （毒の沼）
 * @value 4
 * @option オートタイルID 5 （枯れ木）
 * @value 5
 * @option オートタイルID 6 （溶岩）
 * @value 6
 * @option オートタイルID 7 （溶岩の泡）
 * @value 7
 * @option オートタイルID 8 （池）
 * @value 8
 * @option オートタイルID 9 （岩）
 * @value 9
 * @option オートタイルID 10 （凍った海）
 * @value 10
 * @option オートタイルID 11 （渦）
 * @value 11
 * @option オートタイルID 12 （大地の境界）
 * @value 12
 * @option オートタイルID 13 （下界に落ちる滝）
 * @value 13
 * @option オートタイルID 14 （雲（大地の境界））
 * @value 14
 * @option オートタイルID 15 （雲）
 * @value 15
 * @option オートタイルID 16 （草原A）
 * @value 16
 * @option オートタイルID 17 （草原A（濃））
 * @value 17
 * @option オートタイルID 18 （草原B）
 * @value 18
 * @option オートタイルID 19 （草原B（濃））
 * @value 19
 * @option オートタイルID 20 （森）
 * @value 20
 * @option オートタイルID 21 （森（針葉樹））
 * @value 21
 * @option オートタイルID 22 （山（草））
 * @value 22
 * @option オートタイルID 23 （山（土））
 * @value 23
 * @option オートタイルID 24 （荒れ地A）
 * @value 24
 * @option オートタイルID 25 （荒れ地B）
 * @value 25
 * @option オートタイルID 26 （土肌A）
 * @value 26
 * @option オートタイルID 27 （土肌B）
 * @value 27
 * @option オートタイルID 28 （森（枯れ木））
 * @value 28
 * @option オートタイルID 29 （道（土））
 * @value 29
 * @option オートタイルID 30 （丘（土））
 * @value 30
 * @option オートタイルID 31 （山（砂岩））
 * @value 31
 * @option オートタイルID 32 （砂漠A）
 * @value 32
 * @option オートタイルID 33 （砂漠B）
 * @value 33
 * @option オートタイルID 34 （岩地A）
 * @value 34
 * @option オートタイルID 35 （岩地B（溶岩））
 * @value 35
 * @option オートタイルID 36 （森（ヤシの木））
 * @value 36
 * @option オートタイルID 37 （道（舗装））
 * @value 37
 * @option オートタイルID 38 （山（岩））
 * @value 38
 * @option オートタイルID 39 （山（溶岩））
 * @value 39
 * @option オートタイルID 40 （雪原）
 * @value 40
 * @option オートタイルID 41 （山（雪））
 * @value 41
 * @option オートタイルID 42 （雲）
 * @value 42
 * @option オートタイルID 43 （大きな雲）
 * @value 43
 * @option オートタイルID 44 （森（雪））
 * @value 44
 * @option オートタイルID 45 （穴）
 * @value 45
 * @option オートタイルID 46 （丘（砂岩））
 * @value 46
 * @option オートタイルID 47 （丘（雪））
 * @value 47
 * @default 
 * 
 * @param EncountCondEx
 * @desc NUUN_ConditionsBaseでのエンカウント条件を設定します。
 * @text NUUN_ConditionsBaseの適用条件ID
 * @type number[]
 * @default 
 * 
 */
/*~struct~encountVariable:ja
 * 
 * @param VariableId
 * @text 変数
 * @desc 変数を指定します。
 * @type variable
 * @default 0
 * 
 * @param ComparisonValue
 * @text 比較する値
 * @desc 比較する値を指定します。
 * @type number
 * @default 0
 * 
 * @param Inequality
 * @text 不等号
 * @desc 不等号を指定します。
 * @type select
 * @option 等しい
 * @value 'equal'
 * @option より大きい
 * @value 'greater'
 * @option 未満
 * @value 'less'
 * @option 以上
 * @value 'greaterEqual'
 * @option 以下
 * @value 'lessEqual'
 * @default 'equal'
 * 
 */
/*~struct~encountSwitch:ja
 * 
 * @param SwitchId
 * @text スイッチ
 * @desc スイッチを指定します。
 * @type switch
 * @default 0
 * 
 * @param EncountBoolean
 * @text フラグ
 * @desc フラグを指定します。
 * @type boolean
 * @default true
 * 
 */
/*~struct~encountVehicle:ja
 * 
 * @param Vehicle
 * @text 乗り物タイプ
 * @desc 乗り物のタイプを指定します。
 * @type select
 * @option 小型船
 * @value 'boat'
 * @option 大型船
 * @value 'ship'
 * @option 飛行船
 * @value 'airship'
 * @option 乗り物
 * @value 'vehicle'
 * @option 乗り物なし
 * @value 'none'
 * @default 
 * 
 * @param EncountBoolean
 * @text フラグ
 * @desc フラグを指定します。
 * @type boolean
 * @default true
 * 
 */
var Imported = Imported || {};
Imported.NUUN_EncounterCondition = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;

    const _Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(mapId) {
        _Game_Map_setup.apply(this, arguments);
        this.encounterConditionsSetup();
    };

    Game_Map.prototype.encounterConditionsSetup = function() {
        this._encounterConditions = [];
        for (const encounter of this.encounterList()) {
            const troop = $dataTroops[encounter.troopId];
            this._encounterConditions[encounter.troopId] = this.encounterConditions(troop);
        }
    };

    Game_Map.prototype.encounterConditions = function(troop) {
        const pages = troop.pages[0];
        const list = [];
        const re = /<(?:EncCond):\s*(.*)>/;
        pages.list.forEach(tag => {
            if (tag.code === 108 || tag.code === 408) {
                const match = re.exec(tag.parameters[0]);
                if (match) {
                    list.push(match[1]);
                }
            }
        });
        return list;
    };

    const _Game_Player_meetsEncounterConditions = Game_Player.prototype.meetsEncounterConditions;
    Game_Player.prototype.meetsEncounterConditions = function(encounter) {
        const encount = _Game_Player_meetsEncounterConditions.apply(this, arguments);
        if (params.RegionIDSetting) {
            return this.conditionsRegionData(encounter);
        }
        return encount && this.conditionsData(encounter);
    };

    Game_Player.prototype.conditionsRegionData = function(encounter) {
        return encounter.regionSet.every(id => id === 0 || this.conditionsEncount(params.EncountSetting[id - 1]));
    };

    Game_Player.prototype.conditionsData = function(encounter) {
        const conditionslist = $gameMap._encounterConditions[encounter.troopId] || [];
        return conditionslist.every(id => this.conditionsEncount(params.EncountSetting[_getEncountData(id)]));
    };

    Game_Player.prototype.conditionsEncount = function(conditions) {
        if (conditions === null) return false;
        if (conditions.EncountRegion && conditions.EncountRegion.length > 0) {
            if (!this.conditionsRegion(conditions)) {
                return false;
            }
        }
        if (conditions.EncountVariable && conditions.EncountVariable.length > 0) {
            if (!this.conditionsVariable(conditions)) {
                return false;
            }
        }
        if (conditions.EncountSwitch && conditions.EncountSwitch.length > 0) {
            if (!this.conditionsSwitch(conditions)) {
                return false;
            }
        }
        if (conditions.EncountVehicle && conditions.EncountVehicle.length > 0) {
            if (!this.conditionsVehicle(conditions)) {
                return false;
            }
        }
        if (conditions.EncountFormula && conditions.EncountFormula.length > 0) {
            if (!this.conditionsFormula(conditions)) {
                return false;
            }
        }
        if ($gameMap.isOverworld() && conditions.EncountAutotile && conditions.EncountAutotile.length > 0) {
            if (!this.conditionsAutotile(conditions)) {
                return false;
            }
        }
        if (conditions.EncountCondEx && conditions.EncountCondEx > 0) {
            if (!this.conditionsEx(conditions)) {
                return false;
            }
        }
        return true;
    };

    Game_Player.prototype.conditionsRegion = function(conditions) {
        return conditions.includes(this.regionId());
    };

    Game_Player.prototype.conditionsVariable = function(conditions) {
        return conditions.EncountVariable.some(data => {
            return data.VariableId > 0 && _getEncountInequality(data);
        });
    };

    Game_Player.prototype.conditionsSwitch = function(conditions) {
        return conditions.EncountSwitch.some(data => {
            return data.SwitchId > 0 && _getEncountSwitch(data);
        });
    };

    Game_Player.prototype.conditionsVehicle = function(conditions) {
        return conditions.EncountVehicle.some(data => {
            return _getEncountVehicle(data);
        });
    };

    Game_Player.prototype.conditionsFormula = function(conditions) {
        return conditions.EncountFormula.some(data => {
            return eval(data);
        });
    };

    Game_Player.prototype.conditionsAutotile = function(conditions) {
        return conditions.EncountAutotile.some(data => {
            return data === this.encountAutotileType(0) || data === this.encountAutotileType(1);
        });
    };

    Game_Player.prototype.conditionsEx = function(conditions) {
        return conditions.EncountCondEx.some(data => {
            return this.getTriggerConditions(data, false);
        });
    };

    Game_Player.prototype.encountAutotileType = function(z) {
        return $gameMap.autotileType(this.x, this.y, z);
    };


    const _Game_Interpreter_command301 = Game_Interpreter.prototype.command301;
    Game_Interpreter.prototype.command301 = function(params) {
        if (!$gameParty.inBattle()) {
            $gamePlayer.interpreterEncountEventId = this.eventId();
        }
        return _Game_Interpreter_command301.apply(this, arguments);
    };

    function _getEncountData(id) {
        if (isNaN(id)) {
            return params.EncountSetting.findIndex(data => data.Name === id);
        }
        return Number(id) - 1;
    };

    function _getEncountInequality(conditions) {
        switch (conditions.Inequality) {
            case 'equal':
                return $gameVariables.value(conditions.VariableId) === conditions.ComparisonValue;
            case 'greater':
                return $gameVariables.value(conditions.VariableId) > conditions.ComparisonValue;
            case 'less':
                return $gameVariables.value(conditions.VariableId) < conditions.ComparisonValue;
            case 'greaterEqual':
                return $gameVariables.value(conditions.VariableId) >= conditions.ComparisonValue;
            case 'lessEqual':
                return $gameVariables.value(conditions.VariableId) <= conditions.ComparisonValue;
        }
    };

    function _getEncountSwitch(conditions) {
        return $gameSwitches.value(conditions.SwitchId) === conditions.EncountBoolean;
    };

    function _getEncountVehicle(conditions) {
        switch (conditions.Vehicle) {
            case "boat":
                return $gamePlayer.isInBoat() === conditions.EncountBoolean;
            case "ship":
                return $gamePlayer.isInShip() === conditions.EncountBoolean;
            case "airship":
                return $gamePlayer.isInAirship() === conditions.EncountBoolean;
            case 'vehicle':
                return $gamePlayer.isInVehicle() === conditions.EncountBoolean;
            default:
                return $gamePlayer.isNormal() === conditions.EncountBoolean;
        }
    };

})();