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
 * @plugindesc Skill cost display EX
 * @author NUUN
 * @version 1.1.2
 * @base NUUN_Base
 * @base NUUN_SkillCostEX
 * @orderAfter NUUN_Base
 * @orderAfter NUUN_SkillCostEX
 * 
 * @help
 * Extends the display of skill costs.
 * When setting costs other than HP, MP, TP, Gold, and Exp in the display order of skill costs, enter the tag name of the cost to be consumed in the cost display target, and the costs other than HP, MP, TP, Gold, and Exp Please set in individual settings.
 * or Cost evaluation formula, enter the cost evaluation formula.
 * To display the cost of the party limit gauge, enter 'limitCost' in the cost display target and enter "this._actor.skillLimitCost(skill)" in the cost evaluation formula.
 * skill：Skill data to activate
 * actor:Actor game data
 * cost:Cost(Equipment consumption and evaluation formulas are returned as true/false values.)
 * 
 * For the color setting, normally enter the system color.
 * You can enter the color code from the text tab.
 * 
 * Individual display cost settings.
 * skill notes
 * <SkillCostEval:[eval]> You can define the format to display.
 * [eval]:Evaluation formula
 * actor:Actor game data
 * skill:Activated skill data
 * cost:Cost(Equipment consumption and evaluation formulas are returned as true/false values.)
 * 
 * Cost data reference
 * HP, MP, TP, Gold, Exp are obtained by cost value.
 * If the consumption MP is 50, 50 will be substituted for the cost value.
 * Other costs are retrieved in an array.
 * cost[id]: Get the value of the [id] number of the acquisition tag.
 * From the : of each tag, the order is 0, 1, 2... from the left.
 * In the case of item consumption <SkillItemCost: No.0, No.1, No.2> If you specify cost[2], you will get the number of consumption.
 * 
 * Prefixes and suffixes are not applied to consumption skills that have a cost evaluation formula defined.
 * 
 * "NUUN_EquipSkillLearning" is required to set 'EquipSkillLearnSkill' for "Cost display target".
 * https://github.com/nuun888/MZ/blob/master/README/EquipSkillLearning.md
 * 
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
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
 * @desc Set the display target of the cost. When specifying other than HP, MP, TP, Gold, Exp, please enter the corresponding cost tag name.
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
 * @version 1.1.2
 * @base NUUN_Base
 * @base NUUN_SkillCostEX
 * @orderAfter NUUN_Base
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
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
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
const parameters = PluginManager.parameters('NUUN_SkillCostShowEX');
const CostWidth = String(parameters['CostWidth'] || '000');
const Connection = String(parameters['Connection'] || '/');
const PrefixFontSize = Number(parameters['PrefixFontSize'] || 20);
const SuffixFontSize = Number(parameters['SuffixFontSize'] || 20);
const ConnectionFontSize = Number(parameters['ConnectionFontSize'] || 26);
const CostFontSize = Number(parameters['CostFontSize'] || 26);
const PrefixY = Number(parameters['PrefixY'] || 4);
const SuffixY = Number(parameters['SuffixY'] || 4);
const ConnectionY = Number(parameters['ConnectionY'] || 0);
const CostY = Number(parameters['CostY'] || 0);
const HPCostColor = (DataManager.nuun_structureData(parameters['HPCostColor'])) || 21;
const MPCostColor = (DataManager.nuun_structureData(parameters['MPCostColor'])) || 23;
const TPCostColor = (DataManager.nuun_structureData(parameters['TPCostColor'])) || 29;
const GoldCostColor = (DataManager.nuun_structureData(parameters['GoldCostColor'])) || 17;
const ExpCostColor = (DataManager.nuun_structureData(parameters['ExpCostColor'])) || 0;
const HPPrefix = String(parameters['HPPrefix'] || 'HP');
const HPSuffix = String(parameters['HPSuffix'] || '');
const MPPrefix = String(parameters['MPPrefix'] || 'MP');
const MPSuffix = String(parameters['MPSuffix'] || '');
const TPPrefix = String(parameters['TPPrefix'] || 'TP');
const TPSuffix = String(parameters['TPSuffix'] || '');
const GoldPrefix = String(parameters['GoldPrefix'] || '');
const GoldSuffix = String(parameters['GoldSuffix'] || 'G');
const ExpPrefix = String(parameters['ExpPrefix'] || 'EXP');
const ExpSuffix = String(parameters['ExpSuffix'] || '');
const CostOrderSetting = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['CostOrderSetting'])) : null) || [];
let count = 0;

Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {//再定義
    count = 0;
    CostOrderSetting.forEach(type => {
        if (type.CostOrderSelect == 'HP') {
            if (this._actor.skillHpCost(skill)) {
                x = this.drawHpCost(skill, x, y, width, type);
                count++;
            }
        } else if (type.CostOrderSelect == 'MP') {
            if (this._actor.skillMpCost(skill)) {
                x = this.drawMpCost(skill, x, y, width, type);
                count++;
            }
        } else if (type.CostOrderSelect == 'TP') {
            if (this._actor.skillTpCost(skill)) {
                x = this.drawTpCost(skill, x, y, width, type);
                count++;
            }
        } else if (type.CostOrderSelect == 'Gold') {
            if (this._actor.skillGoldCost(skill)) {
                x = this.drawGoldCost(skill, x, y, width, type);
                count++;
            }
        } else if (type.CostOrderSelect == 'Exp') {
            if (this._actor.skillExpCost(skill)) {
                x = this.drawExpCost(skill, x, y, width, type);
                count++;
            }
        } else if (Imported.NUUN_EquipSkillLearning && type.CostOrderSelect == 'EquipSkillLearnSkill') {
            if (this.equipSkillLearnSkill(skill) > 0) {
                x = this.drawEquipSkillLearnSkill(skill, x, y, width, type);
                count++;
            }
        } else if (type.CostOrderSelect) {
            if (skill.meta[type.CostOrderSelect]) {
                const actor = this._actor;
                const cost = this.getEvalCost(actor, String(type.CostOrderSelect), skill);
                const evalData = skill.meta.SkillCostEval ? skill.meta.SkillCostEval : type.CostEval;
                const costText = eval(evalData);
                if (costText) {
                    x = this.drawOrderCost(skill, costText, type, x, y, width);
                    count++; 
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
    if (count > 0) {
        x -= this.drawCostConnection(x, y, width);
    }
    const cost = this._actor.skillHpCost(skill);
    this.setCostColor(HPCostColor);
    const evalCost = skill.meta.SkillCostEval ? skill.meta.SkillCostEval : type.CostEval;
    if (evalCost) {
        const actor = this._actor;
        const costText = eval(evalCost);
        this.drawText(costText, x, y + CostY, width, "right");
        x -= this.textWidth(costText);
    } else {
        x -= this.drawCostSuffix(HPSuffix, x, y, width);
        this.contents.fontSize = CostFontSize;
        this.drawText(cost, x, y + CostY, width, "right");
        x -= this.textWidth(cost);
        x -= this.drawCostPrefix(HPPrefix, x, y, width);
    }
    this.contents.fontSize = $gameSystem.mainFontSize();
    return x;
};

Window_SkillList.prototype.drawMpCost = function(skill, x, y, width, type) {
    if (count > 0) {
        x -= this.drawCostConnection(x, y, width);
    }
    const cost = this._actor.skillMpCost(skill);
    this.setCostColor(MPCostColor);
    const evalCost = skill.meta.SkillCostEval ? skill.meta.SkillCostEval : type.CostEval;
    if (evalCost) {
        const actor = this._actor;
        const costText = eval(evalCost);
        this.drawText(costText, x, y + CostY, width, "right");
        x -= this.textWidth(costText);
    } else {
        x -= this.drawCostSuffix(MPSuffix, x, y, width);
        this.contents.fontSize = CostFontSize;
        this.drawText(cost, x, y + CostY, width, "right");
        x -= this.textWidth(cost);
        x -= this.drawCostPrefix(MPPrefix, x, y, width);
    }
    this.contents.fontSize = $gameSystem.mainFontSize();
    return x;
};

Window_SkillList.prototype.drawTpCost = function(skill, x, y, width, type) {
    if (count > 0) {
        x -= this.drawCostConnection(x, y, width);
    }
    const cost = this._actor.skillTpCost(skill);
    this.setCostColor(TPCostColor);
    const evalCost = skill.meta.SkillCostEval ? skill.meta.SkillCostEval : type.CostEval;
    if (evalCost) {
        const actor = this._actor;
        const costText = eval(evalCost);
        this.drawText(costText, x, y + CostY, width, "right");
        x -= this.textWidth(costText);
    } else {
        x -= this.drawCostSuffix(TPSuffix, x, y, width);
        this.contents.fontSize = CostFontSize;
        this.drawText(cost, x, y + CostY, width, "right");
        x -= this.textWidth(cost);
        x -= this.drawCostPrefix(TPPrefix, x, y, width);
    }
    this.contents.fontSize = $gameSystem.mainFontSize();
    return x;
};

Window_SkillList.prototype.drawGoldCost = function(skill, x, y, width, type) {
    if (count > 0) {
        x -= this.drawCostConnection(x, y, width);
    }
    const cost = this._actor.skillGoldCost(skill);
    this.setCostColor(GoldCostColor);
    const evalCost = skill.meta.SkillCostEval ? skill.meta.SkillCostEval : type.CostEval;
    if (evalCost) {
        const actor = this._actor;
        const costText = eval(evalCost);
        this.drawText(costText, x, y + CostY, width, "right");
        x -= this.textWidth(costText);
    } else {
        x -= this.drawCostSuffix(GoldSuffix, x, y, width);
        this.contents.fontSize = CostFontSize;
        this.drawText(cost, x, y + CostY, width, "right");
        x -= this.textWidth(cost);
        x -= this.drawCostPrefix(GoldPrefix, x, y, width);
    }
    this.contents.fontSize = $gameSystem.mainFontSize();
    return x;
};

Window_SkillList.prototype.drawExpCost = function(skill, x, y, width, type) {
    if (count > 0) {
        x -= this.drawCostConnection(x, y, width);
    }
    const cost = this._actor.skillExpCost(skill);
    this.setCostColor(ExpCostColor);
    const evalCost = skill.meta.SkillCostEval ? skill.meta.SkillCostEval : type.CostEval;
    if (evalCost) {
        const actor = this._actor;
        const costText = eval(evalCost);
        this.drawText(costText, x, y + CostY, width, "right");
        x -= this.textWidth(costText);
    } else {
        x -= this.drawCostSuffix(ExpSuffix, x, y, width);
        this.contents.fontSize = CostFontSize;
        this.drawText(cost, x, y + CostY, width, "right");
        x -= this.textWidth(cost);
        x -= this.drawCostPrefix(ExpPrefix, x, y, width);
    }
    this.contents.fontSize = $gameSystem.mainFontSize();
    return x;
};

Window_SkillList.prototype.drawEquipSkillLearnSkill = function(skill, x, y, width, type) {
    if (count > 0) {
        x -= this.drawCostConnection(x, y, width);
    }
    const cost = this.equipSkillLearnSkillText(skill);
    this.setCostColor(type.CostColor);
    const evalCost = skill.meta.SkillCostEval ? skill.meta.SkillCostEval : type.CostEval;
    if (evalCost) {
        const actor = this._actor;
        const costText = eval(evalCost);
        this.drawText(costText, x, y + CostY, width, "right");
        x -= this.textWidth(costText);
    } else {
        x -= this.drawCostSuffix(type.Suffix, x, y, width);
        this.contents.fontSize = CostFontSize;
        this.drawText(cost, x, y + CostY, width, "right");
        x -= this.textWidth(cost);
        x -= this.drawCostPrefix(type.Prefix, x, y, width);
    }
    this.contents.fontSize = $gameSystem.mainFontSize();
    return x;
};

Window_SkillList.prototype.drawOrderCost = function(skill, cost, data, x, y, width) {
    if (count > 0) {
        x -= this.drawCostConnection(x, y, width);
    }
    this.setCostColor(data.CostColor);
    x -= this.drawCostSuffix(data.Suffix, x, y, width);
    this.contents.fontSize = CostFontSize;
    this.drawText(cost, x, y + CostY, width, "right");
    x -= this.textWidth(cost);
    x -= this.drawCostPrefix(data.Prefix, x, y, width);
    this.contents.fontSize = $gameSystem.mainFontSize();
    return x;
};

Window_SkillList.prototype.drawCostSuffix = function(suffix, x, y, width) {
    if (suffix) {
        this.contents.fontSize = SuffixFontSize;
        this.drawText(suffix, x, y + SuffixY, width, "right");
        return this.textWidth(suffix);
    } else {
        return 0;
    }
};

Window_SkillList.prototype.drawCostPrefix = function(prefix, x, y, width) {
    if (prefix) {
        this.contents.fontSize = PrefixFontSize;
        this.drawText(prefix, x, y + PrefixY, width, "right");
        return this.textWidth(prefix);
    } else {
        return 0;
    }
};

Window_SkillList.prototype.drawCostConnection = function(x, y, width) {
    this.resetTextColor();
    this.contents.fontSize = ConnectionFontSize;
    this.drawText(Connection, x, y + ConnectionY, width, "right");
    return this.textWidth(Connection);
};

Window_SkillList.prototype.setCostColor = function(costColor) {
    this.changeTextColor(getColorCode(costColor));
};

Window_SkillList.prototype.costWidth = function() {//再定義
    return this.textWidth(CostWidth);
};

function getColorCode(color) {
    if (typeof(color) === "string") {
      return color;
    }
    return ColorManager.textColor(color);
}

})();