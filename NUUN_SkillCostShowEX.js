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
 * @plugindesc スキルコスト表示拡張
 * @author NUUN
 * @version 1.0.1
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
 * skill：発動するスキルデータ
 * this._actor：アクターデータ
 * 
 * 色の設定は通常システムカラーを記入しますが、テキストタブからカラーコードを記入できます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/1/3 Ver.1.0.1
 * コスト表示対象でリストにないタグを複数指定したときに、正常に表示されない問題を修正。
 * 2021/12/5 Ver.1.0.0
 * 初版
 * 
 * @param CostOrderSetting
 * @text スキルコストの表示順
 * @desc スキルコストの表示順の設定を行います。上の設定ほど後ろに表示されます。
 * @default ["{\"CostOrderSelect\":\"[\\\"'Exp'\\\"]\"}","{\"CostOrderSelect\":\"[\\\"'Gold'\\\"]\"}","{\"CostOrderSelect\":\"[\\\"'TP'\\\"]\"}","{\"CostOrderSelect\":\"[\\\"'MP'\\\"]\"}","{\"CostOrderSelect\":\"[\\\"'HP'\\\"]\"}"]
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
 * @type number
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
 * @type number
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
 * @type number
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
 * @type number
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
 * @type number
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
/*~struct~CostOrderSettingList:
 * 
 * @param CostOrderSelect
 * @text コスト表示対象
 * @desc コストの表示対象を設定します。HP、MP、TP、Gold、Exp以外を指定する場合は該当のコストタグ名を記入してください。
 * @type combo[]
 * @option 'HP'
 * @option 'MP'
 * @option 'TP'
 * @option 'Gold'
 * @option 'Exp'
 * @option 'limitCost'
 * @default
 * 
 * @param CostTagSetting
 * @text HP、MP、TP、Gold、Exp以外のコスト個別設定
 * @default ------------------------------
 * 
 * @param CostColor
 * @text コストの色
 * @desc コストの色。
 * @type number
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
 * @type string
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
                x = this.drawHpCost(skill, x, y, width);
                count++;
            }
        } else if (type.CostOrderSelect == 'MP') {
            if (this._actor.skillMpCost(skill)) {
                x = this.drawMpCost(skill, x, y, width);
                count++;
            }
        } else if (type.CostOrderSelect == 'TP') {
            if (this._actor.skillTpCost(skill)) {
                x = this.drawTpCost(skill, x, y, width);
                count++;
            }
        } else if (type.CostOrderSelect == 'Gold') {
            if (this._actor.skillGoldCost(skill)) {
                x = this.drawGoldCost(skill, x, y, width);
                count++;
            }
        } else if (type.CostOrderSelect == 'Exp') {
            if (this._actor.skillExpCost(skill)) {
                x = this.drawExpCost(skill, x, y, width);
                count++;
            }
        } else if (type.CostOrderSelect) {
            if (skill.meta[type.CostOrderSelect]) {
                const cost = eval(type.CostEval);
                if (cost) {
                    x = this.drawOrderCost(skill, cost, type, x, y, width);
                    count++; 
                }
            }
        }
    });
};

Window_SkillList.prototype.drawHpCost = function(skill, x, y, width) {
    if (count > 0) {
        x -= this.drawCostConnection(x, y, width);
    }
    const cost = this._actor.skillHpCost(skill);
    this.setCostColor(HPCostColor);
    x -= this.drawCostSuffix(HPSuffix, x, y, width);
    this.contents.fontSize = CostFontSize;
    this.drawText(cost, x, y + CostY, width, "right");
    x -= this.textWidth(cost);
    x -= this.drawCostPrefix(HPPrefix, x, y, width);
    this.contents.fontSize = $gameSystem.mainFontSize();
    return x;
};

Window_SkillList.prototype.drawMpCost = function(skill, x, y, width) {
    if (count > 0) {
        x -= this.drawCostConnection(x, y, width);
    }
    const cost = this._actor.skillMpCost(skill);
    this.setCostColor(MPCostColor);
    x -= this.drawCostSuffix(MPSuffix, x, y, width);
    this.contents.fontSize = CostFontSize;
    this.drawText(cost, x, y + CostY, width, "right");
    x -= this.textWidth(cost);
    x -= this.drawCostPrefix(MPPrefix, x, y, width);
    this.contents.fontSize = $gameSystem.mainFontSize();
    return x;
};

Window_SkillList.prototype.drawTpCost = function(skill, x, y, width) {
    if (count > 0) {
        x -= this.drawCostConnection(x, y, width);
    }
    const cost = this._actor.skillTpCost(skill);
    this.setCostColor(TPCostColor);
    x -= this.drawCostSuffix(TPSuffix, x, y, width);
    this.contents.fontSize = CostFontSize;
    this.drawText(cost, x, y + CostY, width, "right");
    x -= this.textWidth(cost);
    x -= this.drawCostPrefix(TPPrefix, x, y, width);
    this.contents.fontSize = $gameSystem.mainFontSize();
    return x;
};

Window_SkillList.prototype.drawGoldCost = function(skill, x, y, width) {
    if (count > 0) {
        x -= this.drawCostConnection(x, y, width);
    }
    const cost = this._actor.skillGoldCost(skill);
    this.setCostColor(GoldCostColor);
    x -= this.drawCostSuffix(GoldSuffix, x, y, width);
    this.contents.fontSize = CostFontSize;
    this.drawText(cost, x, y + CostY, width, "right");
    x -= this.textWidth(cost);
    x -= this.drawCostPrefix(GoldPrefix, x, y, width);
    this.contents.fontSize = $gameSystem.mainFontSize();
    return x;
};

Window_SkillList.prototype.drawExpCost = function(skill, x, y, width) {
    if (count > 0) {
        x -= this.drawCostConnection(x, y, width);
    }
    const cost = this._actor.skillExpCost(skill);
    this.setCostColor(ExpCostColor);
    x -= this.drawCostSuffix(ExpSuffix, x, y, width);
    this.contents.fontSize = CostFontSize;
    this.drawText(cost, x, y + CostY, width, "right");
    x -= this.textWidth(cost);
    x -= this.drawCostPrefix(ExpPrefix, x, y, width);
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
