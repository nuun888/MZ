/*:-----------------------------------------------------------------------------------
 * NUUN_SkillCostShowEX.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc Skill Cost Display Extension
 * @author NUUN
 * @version 1.2.0
 * @base NUUN_SkillCostEX
 * @orderAfter NUUN_SkillCostEX
 * 
 * @help
 * Extends the display of skill costs.
 * When setting costs other than HP, MP, TP, Gold, and Exp in the skill cost display order,
 * enter the tag name of the cost to be consumed in the cost display target, and configure it in the individual cost settings for costs other than HP, MP, TP, Gold, and Exp.
 * Enter the formula used to calculate the cost in the cost evaluation formula.
 * To display the party limit gauge cost, enter 'limitCost' in the cost display target,
 * and enter this._actor.skillLimitCost(skill) in the cost evaluation formula.
 * actor: Actor data
 * skill: Skill data to be activated
 * cost: Cost. Equipment consumption and evaluation formulas return true/false values.
 * 
 * For color settings, normally specify a system color, but you can also enter a color code from the Text tab.
 * 
 * Individual Display Cost Settings
 * Skill Note Tags
 * <SkillCostEval:[eval]> Defines the format used to display the cost.
 * [eval]: Evaluation formula
 * actor: Actor game data
 * skill: Skill data to be activated
 * cost: Cost. Equipment consumption and evaluation formulas return true/false values.
 * 
 * <SkillCostWidth:[string]> Specifies the cost display width using a string. The width of the specified string affects the width available for the skill name.
 * [string]:string
 * <SkillCostWidth:00000> Uses the width of "00000" as the cost display width.
 * 
 * Cost Data Reference
 * The following applies to both cost evaluation formulas and individual display cost settings.
 * HP, MP, TP, Gold, and Exp costs are retrieved as cost values.
 * For example, if the MP cost is 50, 50 is assigned to cost.
 * Other costs are retrieved as arrays.
 * cost[id]: Retrieves the value at position [id] from the tag. Values after the ":" are numbered from left to right starting at 0: 0, 1, 2...
 * For example, with an item cost tag such as <SkillItemCost:value0,value1,value2>, specifying cost[2] retrieves the consumption amount.
 * 
 * Prefixes and suffixes are not applied to cost skills that have a cost evaluation formula defined.
 * 
 * The Skill Learning Equipment plugin is required to set 'EquipSkillLearnSkill' as the cost display target.
 * https://github.com/nuun888/MZ/blob/master/README/EquipSkillLearning.md
 * 
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
 * 9/20/2026 Ver.1.2.0
 * Changed the specifications so that the plugin can run without NUUN_Base.
 * Fixed an issue where 0 could not be set for some plugin parameters.
 * Fixed an issue where the cost width of the previous skill was applied.
 * 1/22/2023 Ver.1.1.3
 * Added a function that allows you to specify the cost range for each skill.
 * 12/17/2022 Ver.1.1.2
 * Added a function that can display the points of "NUUN_EquipSkillLearning".
 * 12/6/2022 Ver.1.1.1
 * Changed the Type of color specification plug-in parameter to color. (Core script Ver.1.6.0 or later)
 * 12/4/2022 Ver.1.1.0
 * Changed the specifications of the cost evaluation formula for individual cost settings other than HP, MP, TP, Gold, and Exp.
 * Changed the specification of the cost display target in the order of skill cost display.
 * Applies cost evaluation formula to all consumption costs.
 * 11/25/2022 Ver.1.0.2
 * Fixed so that actor's game data acquisition parameter can be acquired by actor.
 * Changed the display in languages other than Japanese to English.
 * 1/3/2022 Ver.1.0.1
 * Fixed an issue where multiple tags not listed in the cost display target were not displayed correctly.
 * 12/5/2021 Ver.1.0.0
 * First edition.
 * 
 * @param CostOrderSetting
 * @text Display order of skill cost
 * @desc Set the display order of skill costs. Costs set at the top are displayed later.
 * @default ["{\"CostOrderSelect\":\"'Exp'\",\"CostTagSetting\":\"------------------------------\",\"CostColor\":\"0\",\"Prefix\":\"\",\"Suffix\":\"\",\"CostEval\":\"\"}","{\"CostOrderSelect\":\"'Gold'\",\"CostTagSetting\":\"------------------------------\",\"CostColor\":\"0\",\"Prefix\":\"\",\"Suffix\":\"\",\"CostEval\":\"\"}","{\"CostOrderSelect\":\"'TP'\",\"CostTagSetting\":\"------------------------------\",\"CostColor\":\"0\",\"Prefix\":\"\",\"Suffix\":\"\",\"CostEval\":\"\"}","{\"CostOrderSelect\":\"'MP'\",\"CostTagSetting\":\"------------------------------\",\"CostColor\":\"0\",\"Prefix\":\"\",\"Suffix\":\"\",\"CostEval\":\"\"}","{\"CostOrderSelect\":\"'HP'\",\"CostTagSetting\":\"------------------------------\",\"CostColor\":\"0\",\"Prefix\":\"\",\"Suffix\":\"\",\"CostEval\":\"\"}"]
 * @type struct<CostOrderSettingList>[]
 * 
 * @param CostWidth
 * @text cost range
 * @desc 1 cost range.
 * @type string
 * @default 000
 * 
 * @param Connection
 * @text Between cost characters
 * @desc Characters between costs.
 * @type string
 * @default /
 * 
 * @param PrefixFontSize
 * @desc Prefix font size.
 * @text Prefix font size
 * @type number
 * @default 20
 * @min 1
 * 
 * @param SuffixFontSize
 * @desc Suffix font size.
 * @text Suffix font size
 * @type number
 * @default 20
 * @min 1
 * 
 * @param ConnectionFontSize
 * @desc Font size for cost between characters.
 * @text Between-cost character font size
 * @type number
 * @default 26
 * @min 1
 * 
 * @param CostFontSize
 * @desc Cost font size.
 * @text Cost font size
 * @type number
 * @default 26
 * @min 1
 * 
 * @param PrefixY
 * @desc Y coordinate of the prefix.
 * @text Prefix Y coordinate
 * @type number
 * @default 2
 * @min -9999
 * 
 * @param SuffixY
 * @desc Y coordinate of the suffix.
 * @text Suffix Y coordinate
 * @type number
 * @default 2
 * @min -9999
 * 
 * @param ConnectionY
 * @desc Y coordinate of the cost-between character.
 * @text Y coordinate of letter between costs
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param CostY
 * @desc Y coordinate of the cost.
 * @text Cost Y coordinate
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param HPCostSetting
 * @text HP setting
 * @default ------------------------------
 * 
 * @param HPCostColor
 * @text HP cost color
 * @desc HP cost color.
 * @type color
 * @default 21
 * @parent HPCostSetting
 * 
 * @param HPPrefix
 * @text HP prefix
 * @desc HP prefix.
 * @type string
 * @default HP
 * @parent HPCostSetting
 * 
 * @param HPSuffix
 * @text HP suffix
 * @desc HP suffix.
 * @type string
 * @default 
 * @parent HPCostSetting
 * 
 * @param MPCostSetting
 * @text MP setting
 * @default ------------------------------
 * 
 * @param MPCostColor
 * @text MP cost color
 * @desc MP cost color.
 * @type color
 * @default 23
 * @parent MPCostSetting
 * 
 * @param MPPrefix
 * @text MP prefix
 * @desc Prefix for MP.
 * @type string
 * @default MP
 * @parent MPCostSetting
 * 
 * @param MPSuffix
 * @text MP suffix
 * @desc Suffix of MP.
 * @type string
 * @default
 * @parent MPCostSetting 
 * 
 * @param TPCostSetting
 * @text TP setting
 * @default ------------------------------
 * 
 * @param TPCostColor
 * @text TP cost color
 * @desc TP cost color.
 * @type color
 * @default 29
 * @parent TPCostSetting
 * 
 * @param TPPrefix
 * @text TP prefix
 * @desc Prefix for TP.
 * @type string
 * @default TP
 * @parent TPCostSetting
 * 
 * @param TPSuffix
 * @text TP suffix
 * @desc TP suffix.
 * @type string
 * @default
 * @parent TPCostSetting 
 * 
 * @param GoldCostSetting
 * @text Gold setting
 * @default ------------------------------
 * 
 * @param GoldCostColor
 * @text Money cost color
 * @desc The color of the money cost.
 * @type color
 * @default 17
 * @parent GoldCostSetting
 * 
 * @param GoldPrefix
 * @text Money prefix
 * @desc Money prefix.
 * @type string
 * @default 
 * @parent GoldCostSetting
 * 
 * @param GoldSuffix
 * @text Money suffix
 * @desc Money prefix.
 * @type string
 * @default G
 * @parent GoldCostSetting
 * 
 * @param ExpCostSetting
 * @text EXP setting
 * @default ------------------------------
 * 
 * @param ExpCostColor
 * @text Exp cost color
 * @desc Exp cost color.
 * @type color
 * @default 27
 * @parent ExpCostSetting
 * 
 * @param ExpPrefix
 * @text Exp prefix
 * @desc Exp prefix.
 * @type string
 * @default EXP
 * @parent ExpCostSetting
 * 
 * @param ExpSuffix
 * @text Exp suffix
 * @desc Exp suffix.
 * @type string
 * @default 
 * @parent ExpCostSetting
 * 
 * 
 */
/*~struct~CostOrderSettingList:
 * 
 * @param CostOrderSelect
 * @text Cost display target
 * @desc Set the cost to display. For other costs, enter the cost tag name.
 * @type combo
 * @option 'HP'
 * @option 'MP'
 * @option 'TP'
 * @option 'Gold'
 * @option 'Exp'
 * @option 'limitCost'
 * @option 'EquipSkillLearnSkill'
 * @default
 * 
 * @param CostTagSetting
 * @text Individual cost settings other than HP, MP, TP, Gold, Exp
 * @default ------------------------------
 * 
 * @param CostColor
 * @text Cost color
 * @desc Cost color.
 * @type color
 * @default 0
 * 
 * @param Prefix
 * @text Prefix
 * @desc Prefix.
 * @type string
 * @default 
 * 
 * @param Suffix
 * @text Suffix
 * @desc Suffix.
 * @type string
 * @default
 * 
 * @param CostEval
 * @text Cost evaluation formula
 * @desc An evaluation formula for calculating the cost. Specify a function to get the cost.
 * @type combo
 * @option 'skill.meta.SkillItemCost.split(',')[2];//Consumed items'
 * @option '$gameParty.numItems(actor.skillItemCost(skill)[0].item);//Possession of consumable items'
 * @option 'actor.getSkillVarCost(skill);//Consumed number of game variables'
 * @option 'actor.getSkillVarCostR(skill);//Percentage consumption of game variables'
 * @option '$gameVariables.value(0)'
 * @default 
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc スキルコスト表示拡張
 * @author NUUN
 * @version 1.2.0
 * @base NUUN_SkillCostEX
 * @orderAfter NUUN_SkillCostEX
 * 
 * @help
 * スキルコストの表示を拡張します。
 * スキルコストの表示順でHP、MP、TP、Gold、Exp以外のコストを設定する場合は
 * 消費するコストのタグ名をコスト表示対象に記入し、HP、MP、TP、Gold、Exp以外のコスト個別設定で設定してください。
 * コスト評価式はコストの評価式を記入します。
 * パーティリミットゲージのコストを表示する場合はコスト表示対象に'limitCost'を記入し、
 * コスト評価式にthis._actor.skillLimitCost(skill)と記入してください。
 * actor：アクターデータ
 * skill：発動するスキルデータ
 * cost:コスト　装備消費と評価式は真偽値で返します。
 * 
 * 色の設定は通常システムカラーを記入しますが、テキストタブからカラーコードを記入できます。
 * 
 * 表示コストの個別設定。
 * スキルのメモ欄
 * <SkillCostEval:[eval]> 表示するフォーマットを定義できます。
 * [eval]:評価式
 * actor:アクターのゲームデータ
 * skill:発動するスキルデータ
 * cost:コスト　装備消費と評価式は真偽値で返します。
 * 
 * <SkillCostWidth:[string]> コストの表示幅を文字列で指定します。指定した文字列の横幅がスキル名の横幅に影響します。
 * [string]:文字列
 * <SkillCostWidth:00000> コストの表示幅として00000の長さが設定させます。
 * 
 * コストのデータ参照　コスト評価式及び表示コストの個別設定共通
 * HP、MP、TP、Gold、Expはコスト値で取得されます。
 * 消費MPが50の場合は、costの値に50が代入されます。
 * それ以外のコストは配列で取得されます。
 * cost[id]:取得タグの[id]番の値を取得します。各タグの:から左から順位0,1,2...となります。
 * アイテム消費の場合は<SkillItemCost:0番,1番,2番> cost[2]を指定した場合は消費個数を取得します。
 * 
 * コストの評価式が定義してある消費スキルは接頭語、接尾語が適用されません。
 * 
 * コスト表示対象の'EquipSkillLearnSkill'の設定するにはスキル習得装備プラグインが必要です。
 * https://github.com/nuun888/MZ/blob/master/README/EquipSkillLearning.md
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
 * 2026/9/20 Ver.1.2.0
 * NUUN_Baseなしで実行できるように仕様を変更。
 * 一部のプラグインパラメータで0が設定できない問題を修正。
 * コストの幅が前のスキルのコスト幅が適用されてしまう問題を修正。
 * 2023/1/22 Ver.1.1.3
 * スキル毎にコスト幅を指定できる機能を追加。
 * 2022/12/17 Ver.1.1.2
 * スキル習得装備プラグインのポイントを表示できる機能を追加。
 * 2022/12/6 Ver.1.1.1
 * カラー指定のプラグインパラメータのTypeをcolorに変更。(コアスクリプトVer.1.6.0以降)
 * 2022/12/4 Ver.1.1.0
 * HP、MP、TP、Gold、Exp以外のコスト個別設定のコスト評価式の仕様を変更。
 * スキルコスト表示順のコスト表示対象の仕様を変更。
 * コスト評価式の適用を全ての消費コストに適用。
 * 2022/11/25 Ver.1.0.2
 * アクターのゲームデータの取得パラメータをactorで取得できるように修正。
 * 日本語以外での表示を英語表示に変更。
 * 2022/1/3 Ver.1.0.1
 * コスト表示対象でリストにないタグを複数指定したときに、正常に表示されない問題を修正。
 * 2021/12/5 Ver.1.0.0
 * 初版
 * 
 * @param CostOrderSetting
 * @text スキルコストの表示順
 * @desc スキルコストの表示順の設定を行います。上の設定ほど後ろに表示されます。
 * @default ["{\"CostOrderSelect\":\"'Exp'\",\"CostTagSetting\":\"------------------------------\",\"CostColor\":\"0\",\"Prefix\":\"\",\"Suffix\":\"\",\"CostEval\":\"\"}","{\"CostOrderSelect\":\"'Gold'\",\"CostTagSetting\":\"------------------------------\",\"CostColor\":\"0\",\"Prefix\":\"\",\"Suffix\":\"\",\"CostEval\":\"\"}","{\"CostOrderSelect\":\"'TP'\",\"CostTagSetting\":\"------------------------------\",\"CostColor\":\"0\",\"Prefix\":\"\",\"Suffix\":\"\",\"CostEval\":\"\"}","{\"CostOrderSelect\":\"'MP'\",\"CostTagSetting\":\"------------------------------\",\"CostColor\":\"0\",\"Prefix\":\"\",\"Suffix\":\"\",\"CostEval\":\"\"}","{\"CostOrderSelect\":\"'HP'\",\"CostTagSetting\":\"------------------------------\",\"CostColor\":\"0\",\"Prefix\":\"\",\"Suffix\":\"\",\"CostEval\":\"\"}"]
 * @type struct<CostOrderSettingList>[]
 * 
 * @param CostWidth
 * @text コストの幅
 * @desc １コストの幅。
 * @type string
 * @default 000
 * 
 * @param Connection
 * @text コスト間文字
 * @desc コスト間の文字。
 * @type string
 * @default /
 * 
 * @param PrefixFontSize
 * @desc 接頭語のフォントサイズ。
 * @text 接頭語フォントサイズ
 * @type number
 * @default 20
 * @min 1
 * 
 * @param SuffixFontSize
 * @desc 接尾語のフォントサイズ。
 * @text 接尾語フォントサイズ
 * @type number
 * @default 20
 * @min 1
 * 
 * @param ConnectionFontSize
 * @desc コスト間文字のフォントサイズ。
 * @text コスト間文字フォントサイズ
 * @type number
 * @default 26
 * @min 1
 * 
 * @param CostFontSize
 * @desc コストのフォントサイズ。
 * @text コストフォントサイズ
 * @type number
 * @default 26
 * @min 1
 * 
 * @param PrefixY
 * @desc 接頭語のY座標。
 * @text 接頭語Y座標
 * @type number
 * @default 2
 * @min -9999
 * 
 * @param SuffixY
 * @desc 接尾語のY座標。
 * @text 接尾語Y座標
 * @type number
 * @default 2
 * @min -9999
 * 
 * @param ConnectionY
 * @desc コスト間文字のY座標。
 * @text コスト間文字Y座標
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param CostY
 * @desc コストのY座標。
 * @text コストY座標
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param HPCostSetting
 * @text HP設定
 * @default ------------------------------
 * 
 * @param HPCostColor
 * @text HPコストの色
 * @desc HPのコストの色。
 * @type color
 * @default 21
 * @parent HPCostSetting
 * 
 * @param HPPrefix
 * @text HP接頭語
 * @desc HPの接頭語。
 * @type string
 * @default HP
 * @parent HPCostSetting
 * 
 * @param HPSuffix
 * @text HP接尾語
 * @desc HPの接尾語。
 * @type string
 * @default 
 * @parent HPCostSetting
 * 
 * @param MPCostSetting
 * @text MP設定
 * @default ------------------------------
 * 
 * @param MPCostColor
 * @text MPコストの色
 * @desc MPのコストの色。
 * @type color
 * @default 23
 * @parent MPCostSetting
 * 
 * @param MPPrefix
 * @text MP接頭語
 * @desc MPの接頭語。
 * @type string
 * @default MP
 * @parent MPCostSetting
 * 
 * @param MPSuffix
 * @text MP接尾語
 * @desc MPの接尾語。
 * @type string
 * @default
 * @parent MPCostSetting 
 * 
 * @param TPCostSetting
 * @text TP設定
 * @default ------------------------------
 * 
 * @param TPCostColor
 * @text TPコストの色
 * @desc TPのコストの色。
 * @type color
 * @default 29
 * @parent TPCostSetting
 * 
 * @param TPPrefix
 * @text TP接頭語
 * @desc TPの接頭語。
 * @type string
 * @default TP
 * @parent TPCostSetting
 * 
 * @param TPSuffix
 * @text TP接尾語
 * @desc TPの接尾語。
 * @type string
 * @default
 * @parent TPCostSetting 
 * 
 * @param GoldCostSetting
 * @text 所持金設定
 * @default ------------------------------
 * 
 * @param GoldCostColor
 * @text 所持金コストの色
 * @desc 所持金のコストの色。
 * @type color
 * @default 17
 * @parent GoldCostSetting
 * 
 * @param GoldPrefix
 * @text 所持金接頭語
 * @desc 所持金の接頭語。
 * @type string
 * @default 
 * @parent GoldCostSetting
 * 
 * @param GoldSuffix
 * @text 所持金接尾語
 * @desc 所持金の接尾語。
 * @type string
 * @default G
 * @parent GoldCostSetting
 * 
 * @param ExpCostSetting
 * @text 経験値設定
 * @default ------------------------------
 * 
 * @param ExpCostColor
 * @text 経験値コストの色
 * @desc 経験値のコストの色。
 * @type color
 * @default 27
 * @parent ExpCostSetting
 * 
 * @param ExpPrefix
 * @text 経験値接頭語
 * @desc 経験値の接頭語。
 * @type string
 * @default EXP
 * @parent ExpCostSetting
 * 
 * @param ExpSuffix
 * @text 経験値接尾語
 * @desc 経験値の接尾語。
 * @type string
 * @default 
 * @parent ExpCostSetting
 * 
 * 
 */
/*~struct~CostOrderSettingList:ja
 * 
 * @param CostOrderSelect
 * @text コスト表示対象
 * @desc コストの表示対象を設定します。HP、MP、TP、Gold、Exp以外を指定する場合は該当のコストタグ名を記入してください。
 * @type combo
 * @option 'HP'
 * @option 'MP'
 * @option 'TP'
 * @option 'Gold'
 * @option 'Exp'
 * @option 'limitCost'
 * @option 'EquipSkillLearnSkill'
 * @default
 * 
 * @param CostTagSetting
 * @text HP、MP、TP、Gold、Exp以外のコスト個別設定
 * @default ------------------------------
 * 
 * @param CostColor
 * @text コストの色
 * @desc コストの色。
 * @type color
 * @default 0
 * 
 * @param Prefix
 * @text 接頭語
 * @desc 接頭語。
 * @type string
 * @default 
 * 
 * @param Suffix
 * @text 接尾語
 * @desc 接尾語。
 * @type string
 * @default
 * 
 * @param CostEval
 * @text コスト評価式
 * @desc コストを算出するための評価式。コストを取得する関数を指定してください。
 * @type combo
 * @option 'skill.meta.SkillItemCost.split(",")[2];//消費アイテム数'
 * @option '$gameParty.numItems(actor.skillItemCost(skill)[0].item);//消費アイテムの所持数'
 * @option 'actor.getSkillVarCost(skill);//ゲーム変数の消費数'
 * @option 'actor.getSkillVarCostR(skill);//ゲーム変数の割合消費'
 * @option '$gameVariables.value(0)'
 * @default 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_SkillCostShowEX = true;

(() => {
    const params = Nuun_PluginParams_SkillCost.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;

    NuunSkillCostManager.count = 0;

    NuunSkillCostManager.skillCostShowParams = function(code) {
        switch (code) {
            case 0:
                return params.CostWidth || "000";
            case 1:
                return params.Connection || '/';
            case 2:
                return params.PrefixFontSize || 20;
            case 3:
                return params.SuffixFontSize || 20;
            case 4:
                return params.ConnectionFontSize || 26;
            case 5:
                return params.CostFontSize || 26;
            case 6:
                return params.PrefixY || 0;
            case 7:
                return params.SuffixY || 0;
            case 8:
                return params.ConnectionY || 0;
            case 9:
                return params.CostY || 0;
            case 10:
                return params.HPCostColor || 0;
            case 11:
                return params.MPCostColor || 0;
            case 12:
                return params.TPCostColor || 0;
            case 13:
                return params.GoldCostColor || 0;
            case 14:
                return params.ExpCostColor || 0;
            case 15:
                return params.HPPrefix || '';
            case 16:
                return params.HPSuffix || '';
            case 17:
                return params.MPPrefix || '';
            case 18:
                return params.MPSuffix || '';
            case 19:
                return params.TPPrefix || '';
            case 20:
                return params.TPSuffix || '';
            case 21:
                return params.GoldPrefix || '';
            case 22:
                return params.GoldSuffix || '';
            case 23:
                return params.ExpPrefix || '';
            case 24:
                return params.ExpSuffix || '';
            case 25:
                return params.CostOrderSetting || [];
        }
    };

    NuunSkillCostManager.getEvalCost = function(battler, cost, skill, param) {
        const v = $gameVariables._data;
        const actor = battler.isActor() ? battler : null;
        const enemy = battler.isEnemy() ? battler : null;
        try {
            if (!!actor && actor[param] !== undefined) {
                return actor[param];
            } else if (!!enemy && enemy[param] !== undefined) {
                return enemy[param];
            } else {
                return eval(param);
            }
        } catch (error) {
            return 0;
        }
    };

    const _Window_SkillList_initialize = Window_SkillList.prototype.initialize;
    Window_SkillList.prototype.initialize = function(rect) {
        this.skillCostWidth = null;
        _Window_SkillList_initialize.apply(this, arguments);
    };

    const _Window_SkillList_drawItem = Window_SkillList.prototype.drawItem;
    Window_SkillList.prototype.drawItem = function(index) {
        const skill = this.itemAt(index);
        this.skillCostWidth = skill && skill.meta.SkillCostWidth ? NuunSkillCostManager.getMetaCode(skill, "SkillCostWidth") : NuunSkillCostManager.skillCostShowParams(0);
        _Window_SkillList_drawItem.apply(this, arguments);
    };

    Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {//再定義
        NuunSkillCostManager.count = 0;
        NuunSkillCostManager.skillCostShowParams(25).forEach(type => {
            if (type.CostOrderSelect == 'HP') {
                if (this._actor.skillHpCost(skill)) {
                    x = this.drawHpCost(skill, x, y, width, type);
                    NuunSkillCostManager.count++;
                }
            } else if (type.CostOrderSelect == 'MP') {
                if (this._actor.skillMpCost(skill)) {
                    x = this.drawMpCost(skill, x, y, width, type);
                    NuunSkillCostManager.count++;
                }
            } else if (type.CostOrderSelect == 'TP') {
                if (this._actor.skillTpCost(skill)) {
                    x = this.drawTpCost(skill, x, y, width, type);
                    NuunSkillCostManager.count++;
                }
            } else if (type.CostOrderSelect == 'Gold') {
                if (this._actor.skillGoldCost(skill)) {
                    x = this.drawGoldCost(skill, x, y, width, type);
                    NuunSkillCostManager.count++;
                }
            } else if (type.CostOrderSelect == 'Exp') {
                if (this._actor.skillExpCost(skill)) {
                    x = this.drawExpCost(skill, x, y, width, type);
                    NuunSkillCostManager.count++;
                }
            } else if (Imported.NUUN_EquipSkillLearning && type.CostOrderSelect == 'EquipSkillLearnSkill') {
                if (!this._actor.isEquipSkillLearning(skill.id) && this.equipSkillLearnSkill(skill) > 0) {
                    x = this.drawEquipSkillLearnSkill(skill, x, y, width, type);
                    NuunSkillCostManager.count++;
                }
            } else if (type.CostOrderSelect) {
                if (skill.meta[type.CostOrderSelect]) {
                    const cost = this.getEvalCost(this._actor, String(type.CostOrderSelect), skill);
                    const evalData = skill.meta.SkillCostEval ? NuunSkillCostManager.getMetaCode(skill, "SkillCostEval") : type.CostEval;
                    const costText = NuunSkillCostManager.getEvalCost(this._actor, cost, skill, evalData);
                    if (costText) {//0は表示しない
                        x = this.drawOrderCost(skill, costText, type, x, y, width);
                        NuunSkillCostManager.count++; 
                    }
                }
            }
        });
    };

    Window_SkillList.prototype.getEvalCost = function(actor, tag, skill) {
        switch (tag) {
            case 'SkillItemCost':
            return actor.skillItemCost(skill);
            case 'SkillEquipCost':
                return actor.skillEquipCost(skill);
            case 'SkillVarCost':
                return actor.skillVarCost(skill);
            case 'SkillVarCostR':
                return actor.skillVarCostR(skill);
            case 'SkillEvalCost':
                return actor.canSkillEvalCost(skill);
        }
    };

    Window_SkillList.prototype.drawHpCost = function(skill, x, y, width, type) {
        if (NuunSkillCostManager.count > 0) {
            x -= this.drawCostConnection(x, y, width);
        }
        const cost = this._actor.skillHpCost(skill);
        this.setCostColor(NuunSkillCostManager.skillCostShowParams(10));
        const evalCost = skill.meta.SkillCostEval ? NuunSkillCostManager.getMetaCode(skill, "SkillCostEval") : type.CostEval;
        if (evalCost) {
            const costText = NuunSkillCostManager.getEvalCost(this._actor, cost, skill, evalCost);
            this.drawText(costText, x, y + NuunSkillCostManager.skillCostShowParams(9), width, "right");
            x -= this.textWidth(costText);
        } else {
            x -= this.drawCostSuffix(NuunSkillCostManager.skillCostShowParams(16), x, y, width);
            this.contents.fontSize = NuunSkillCostManager.skillCostShowParams(5);
            this.drawText(cost, x, y + NuunSkillCostManager.skillCostShowParams(9), width, "right");
            x -= this.textWidth(cost);
            x -= this.drawCostPrefix(NuunSkillCostManager.skillCostShowParams(15), x, y, width);
        }
        this.contents.fontSize = $gameSystem.mainFontSize();
        return x;
    };

    Window_SkillList.prototype.drawMpCost = function(skill, x, y, width, type) {
        if (NuunSkillCostManager.count > 0) {
            x -= this.drawCostConnection(x, y, width);
        }
        const cost = this._actor.skillMpCost(skill);
        this.setCostColor(NuunSkillCostManager.skillCostShowParams(11));
        const evalCost = skill.meta.SkillCostEval ? NuunSkillCostManager.getMetaCode(skill, "SkillCostEval") : type.CostEval;
        if (evalCost) {
            const costText = NuunSkillCostManager.getEvalCost(this._actor, cost, skill, evalCost);
            this.drawText(costText, x, y + NuunSkillCostManager.skillCostShowParams(9), width, "right");
            x -= this.textWidth(costText);
        } else {
            x -= this.drawCostSuffix(NuunSkillCostManager.skillCostShowParams(18), x, y, width);
            this.contents.fontSize = NuunSkillCostManager.skillCostShowParams(5);
            this.drawText(cost, x, y + NuunSkillCostManager.skillCostShowParams(9), width, "right");
            x -= this.textWidth(cost);
            x -= this.drawCostPrefix(NuunSkillCostManager.skillCostShowParams(17), x, y, width);
        }
        this.contents.fontSize = $gameSystem.mainFontSize();
        return x;
    };

    Window_SkillList.prototype.drawTpCost = function(skill, x, y, width, type) {
        if (NuunSkillCostManager.count > 0) {
            x -= this.drawCostConnection(x, y, width);
        }
        const cost = this._actor.skillTpCost(skill);
        this.setCostColor(NuunSkillCostManager.skillCostShowParams(12));
        const evalCost = skill.meta.SkillCostEval ? NuunSkillCostManager.getMetaCode(skill, "SkillCostEval") : type.CostEval;
        if (evalCost) {
            const costText = NuunSkillCostManager.getEvalCost(this._actor, cost, skill, evalCost);
            this.drawText(costText, x, y + NuunSkillCostManager.skillCostShowParams(9), width, "right");
            x -= this.textWidth(costText);
        } else {
            x -= this.drawCostSuffix(NuunSkillCostManager.skillCostShowParams(20), x, y, width);
            this.contents.fontSize = NuunSkillCostManager.skillCostShowParams(5);
            this.drawText(cost, x, y + NuunSkillCostManager.skillCostShowParams(9), width, "right");
            x -= this.textWidth(cost);
            x -= this.drawCostPrefix(NuunSkillCostManager.skillCostShowParams(19), x, y, width);
        }
        this.contents.fontSize = $gameSystem.mainFontSize();
        return x;
    };

    Window_SkillList.prototype.drawGoldCost = function(skill, x, y, width, type) {
        if (NuunSkillCostManager.count > 0) {
            x -= this.drawCostConnection(x, y, width);
        }
        const cost = this._actor.skillGoldCost(skill);
        this.setCostColor(NuunSkillCostManager.skillCostShowParams(13));
        const evalCost = skill.meta.SkillCostEval ? NuunSkillCostManager.getMetaCode(skill, "SkillCostEval") : type.CostEval;
        if (evalCost) {
            const costText = NuunSkillCostManager.getEvalCost(this._actor, cost, skill, evalCost);
            this.drawText(costText, x, y + NuunSkillCostManager.skillCostShowParams(9), width, "right");
            x -= this.textWidth(costText);
        } else {
            x -= this.drawCostSuffix(NuunSkillCostManager.skillCostShowParams(22), x, y, width);
            this.contents.fontSize = NuunSkillCostManager.skillCostShowParams(5);
            this.drawText(cost, x, y + NuunSkillCostManager.skillCostShowParams(9), width, "right");
            x -= this.textWidth(cost);
            x -= this.drawCostPrefix(NuunSkillCostManager.skillCostShowParams(21), x, y, width);
        }
        this.contents.fontSize = $gameSystem.mainFontSize();
        return x;
    };

    Window_SkillList.prototype.drawExpCost = function(skill, x, y, width, type) {
        if (NuunSkillCostManager.count > 0) {
            x -= this.drawCostConnection(x, y, width);
        }
        const cost = this._actor.skillExpCost(skill);
        this.setCostColor(NuunSkillCostManager.skillCostShowParams(14));
        const evalCost = skill.meta.SkillCostEval ? NuunSkillCostManager.getMetaCode(skill, "SkillCostEval") : type.CostEval;
        if (evalCost) {
            const costText = NuunSkillCostManager.getEvalCost(this._actor, cost, skill, evalCost);
            this.drawText(costText, x, y + NuunSkillCostManager.skillCostShowParams(9), width, "right");
            x -= this.textWidth(costText);
        } else {
            x -= this.drawCostSuffix(NuunSkillCostManager.skillCostShowParams(24), x, y, width);
            this.contents.fontSize = NuunSkillCostManager.skillCostShowParams(5);
            this.drawText(cost, x, y + NuunSkillCostManager.skillCostShowParams(9), width, "right");
            x -= this.textWidth(cost);
            x -= this.drawCostPrefix(NuunSkillCostManager.skillCostShowParams(23), x, y, width);
        }
        this.contents.fontSize = $gameSystem.mainFontSize();
        return x;
    };

    Window_SkillList.prototype.drawEquipSkillLearnSkill = function(skill, x, y, width, type) {
        if (NuunSkillCostManager.count > 0) {
            x -= this.drawCostConnection(x, y, width);
        }
        const cost = this.equipSkillLearnSkillText(skill);
        this.setCostColor(type.CostColor);
        const evalCost = skill.meta.SkillCostEval ? NuunSkillCostManager.getMetaCode(skill, "SkillCostEval") : type.CostEval;
        if (evalCost) {
            const costText = NuunSkillCostManager.getEvalCost(this._actor, cost, skill, evalCost);
            this.drawText(costText, x, y + NuunSkillCostManager.skillCostShowParams(9), width, "right");
            x -= this.textWidth(costText);
        } else {
            x -= this.drawCostSuffix(type.Suffix, x, y, width);
            this.contents.fontSize = NuunSkillCostManager.skillCostShowParams(5);
            this.drawText(cost, x, y + NuunSkillCostManager.skillCostShowParams(9), width, "right");
            x -= this.textWidth(cost);
            x -= this.drawCostPrefix(type.Prefix, x, y, width);
        }
        this.contents.fontSize = $gameSystem.mainFontSize();
        return x;
    };

    Window_SkillList.prototype.drawOrderCost = function(skill, cost, data, x, y, width) {
        if (NuunSkillCostManager.count > 0) {
            x -= this.drawCostConnection(x, y, width);
        }
        this.setCostColor(data.CostColor);
        x -= this.drawCostSuffix(data.Suffix, x, y, width);
        this.contents.fontSize = NuunSkillCostManager.skillCostShowParams(5);
        this.drawText(cost, x, y + NuunSkillCostManager.skillCostShowParams(9), width, "right");
        x -= this.textWidth(cost);
        x -= this.drawCostPrefix(data.Prefix, x, y, width);
        this.contents.fontSize = $gameSystem.mainFontSize();
        return x;
    };

    Window_SkillList.prototype.drawCostSuffix = function(suffix, x, y, width) {
        if (suffix) {
            this.contents.fontSize = NuunSkillCostManager.skillCostShowParams(3);
            this.drawText(suffix, x, y + NuunSkillCostManager.skillCostShowParams(7), width, "right");
            return this.textWidth(suffix);
        } else {
            return 0;
        }
    };

    Window_SkillList.prototype.drawCostPrefix = function(prefix, x, y, width) {
        if (prefix) {
            this.contents.fontSize = NuunSkillCostManager.skillCostShowParams(2);
            this.drawText(prefix, x, y + NuunSkillCostManager.skillCostShowParams(6), width, "right");
            return this.textWidth(prefix);
        } else {
            return 0;
        }
    };

    Window_SkillList.prototype.drawCostConnection = function(x, y, width) {
        this.resetTextColor();
        this.contents.fontSize = NuunSkillCostManager.skillCostShowParams(4);
        this.drawText(NuunSkillCostManager.skillCostShowParams(1), x, y + NuunSkillCostManager.skillCostShowParams(8), width, "right");
        return this.textWidth(NuunSkillCostManager.skillCostShowParams(1));
    };

    Window_SkillList.prototype.setCostColor = function(costColor) {
        this.changeTextColor(NuunSkillCostManager.getColorCode(costColor));
    };

    const _Window_SkillList_costWidth = Window_SkillList.prototype.costWidth;
    Window_SkillList.prototype.costWidth = function() {
        return !!this.skillCostWidth ? this.textWidth(this.skillCostWidth) : _Window_SkillList_costWidth.apply(this, arguments);
    };


})();