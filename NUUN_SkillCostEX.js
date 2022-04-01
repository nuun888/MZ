/*:-----------------------------------------------------------------------------------
 * NUUN_SkillCostEX.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc スキルコスト拡張
 * @author NUUN
 * @version 1.1.0
 * 
 * @help
 * スキルコストにさまざまなコストを設定できます。
 * 
 * スキルのメモ欄
 * HP消費スキル
 * <SkillHPCost:150> コストとしてHPを１５０消費します。
 * <SkillHPCostMR:30> コストとして最大HPの３０％を消費します。
 * <SkillHPCostR:30> コストとして残りHPの３０％を消費します。
 * <HPCostDead> 消費による戦闘不能を許可します。
 * MP消費スキル
 * <SkillMPCostMR:30> コストとして最大MPの３０％を消費します。
 * <SkillMPCostR:30> コストとして残りMPの３０％を消費します。
 * <MPCostNoMcr> ＭＰ消費率の効果を適用しません。
 * TP消費スキル
 * <SkillTPCostR:50> コストとして残りTPの５０％を消費します。
 * 所持金消費スキル
 * <SkillGoldCost:1000>　コストとして所持金を１０００G消費します。
 * <SkillGoldCostR:30> コストとして所持金の３０％を消費します。
 * 経験値消費スキル
 * <SkillExpCost:300>　コストとして経験値を３００失います。
 * <SkillLavelExpCost> 現在のレベルの獲得経験値から消費させます。
 * <SkillExpCostR:50> 次のレベルの経験値までの獲得経験値の５０％を消費します。
 * アイテム消費スキル
 * <SkillItemCost:[itemType],[itemId],[num]> コストとしてアイテム、武器、防具を消費します。
 * 複数指定する場合はすべてのアイテムがある場合、使用することができます。
 * [itemType]:アイテムタイプ　I アイテム　W 武器　A 防具
 * [itemId]:アイテム、武器、防具ID
 * [num]:消費個数
 * 装備品消費スキル
 * <SkillEquipCost:[itemType],[itemId],[num]> コストとして装備中の武器、防具を消費します。
 * [itemType]:アイテムタイプ　W 武器　A 防具
 * [itemId]:武器、防具ID
 * [num]:0で消費なし、1で消失
 * ゲーム変数消費スキル
 * <SkillVarCost:[id],[cost]> ゲーム変数に設定した数値から消費します。
 * [id]:ゲーム変数ID
 * [cost]:消費コスト
 * 評価式
 * <SkillEvalCost:[eval]> 消費を判定するための評価式を記入します。
 * <SkillEvalCons:[eval]> 消費するための評価式を記入します。
 * ※[]は記入しないでください。
 * 
 * 取得パラメータ
 * this.consBHp:消費前の発動者のHPを格納します。
 * this.consBMp:消費前の発動者のMPを格納します。
 * this.consBTp:消費前の発動者のTPを格納します。
 * this.consBGold:消費前の発動者の所持金を格納します。
 * this.consBExp:消費前の発動者の現レベルの獲得経験値を格納します。
 * 
 * スキルのダメージの計算式に
 * a.consBMp * 1.5 と記入することで消費前のMPの1.5倍のダメージを与えることができます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/4/2 Ver.1.1.0
 * 装備中の武器、防具を消費して発動するスキルを設定できる機能を追加。
 * 2021/12/5 Ver.1.0.0
 * 初版
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_SkillCostEX = true;

(() => {
const parameters = PluginManager.parameters('NUUN_SkillCostEX');

const _Game_Battler_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
    _Game_Battler_initMembers.call(this);
    this.consBHp = 0;
    this.consBMp = 0;
    this.consBTp = 0;
    this.consBGold = 0;
    this.consBExp = 0;
    this._canCost = true;
};

Game_Battler.prototype.setBCostParam = function() {
    this.consBHp = this._hp;
    this.consBMp = this._mp;
    this.consBTp = this._tp;
    if (this.isActor()) {
        this.consBGold = $gameParty.gold();
        this.consBExp = this.currentExp() - this.currentLevelExp();
    }
};

Game_BattlerBase.prototype.skillMpCost = function(skill) {//再定義
    let cost = skill.mpCost;
    cost += skill.meta.SkillMPCostMR ? Math.floor(this.mmp * Number(skill.meta.SkillMPCostMR) / 100) : 0;
    cost += skill.meta.SkillMPCostR ? Math.floor(this._mp * Number(skill.meta.SkillMPCostR) / 100) : 0;
    return skill.meta.MPCostNoMcr ? cost : Math.floor(cost * this.mcr);
};

Game_BattlerBase.prototype.skillHpCost = function(skill) {
    let cost = skill.meta.SkillHPCost ? Number(skill.meta.SkillHPCost) : 0;
    cost += skill.meta.SkillHPCostMR ? Math.floor(this.mhp * Number(skill.meta.SkillHPCostMR) / 100) : 0;
    cost += skill.meta.SkillHPCostR ? Math.floor(this._hp * Number(skill.meta.SkillHPCostR) / 100) : 0;
    return cost;
};

Game_BattlerBase.prototype.skillTpCost = function(skill) {//再定義
    let cost = skill.tpCost;
    cost += skill.meta.SkillTPCostR ? Math.floor(this._tp * Number(skill.meta.SkillTPCostR) / 100) : 0;
    return cost;
};

Game_BattlerBase.prototype.skillGoldCost = function(skill) {
    let cost = 0;
    if (!this.isEnemy()) {
        cost += skill.meta.SkillGoldCost ? Number(skill.meta.SkillGoldCost) : 0;
        cost += skill.meta.SkillGoldCostR ? Math.floor($gameParty.gold() * Number(skill.meta.SkillGoldCostR) / 100) : 0;
    }
    return cost;
};

Game_BattlerBase.prototype.skillVarCost = function(skill) {
    return skill.meta.SkillVarCost ? skill.meta.SkillVarCost.split(',').map(Number) : null;
};

Game_BattlerBase.prototype.skillExpCost = function(skill) {
    let cost = 0;
    if (this.isActor()) {
        cost += skill.meta.SkillExpCost ? Number(skill.meta.SkillExpCost) : 0;
        cost += skill.meta.SkillExpCostR ? (this.currentExp() - this.currentLevelExp()) * Number(skill.meta.SkillExpCostR) / 100 : 0;
    }
    return cost;
};

Game_BattlerBase.prototype.skillItemCost = function(skill) {
    if (this.isActor() && skill) {
        return getCostItems(skill);
    } else {
        return [];
    }
};

Game_BattlerBase.prototype.skillEquipCost = function(skill) {
    if (this.isActor() && skill) {
        return getCostEquip(skill);
    } else {
        return [];
    }
};

const _Game_BattlerBase_canPaySkillCost = Game_BattlerBase.prototype.canPaySkillCost;
Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
    return (
        _Game_BattlerBase_canPaySkillCost.call(this, skill) &&
        this.canSkillHpCost(skill) &&
        this.canSkillGoldCost(skill) &&
        this.canSkillExpCost(skill) &&
        this.canSkillItemCost(skill) &&
        this.canSkillEquipCost(skill) &&
        this.canSkillVarCost(skill) && 
        this.canSkillEvalCost(skill))
};

Game_BattlerBase.prototype.canSkillHpCost = function(skill) {
    if (skill.meta.HPCostDead) {
        return this._hp >= this.skillHpCost(skill);
    } else {
        return this._hp > this.skillHpCost(skill);
    }
};

Game_BattlerBase.prototype.canSkillGoldCost = function(skill) {
    return $gameParty.gold() >= this.skillGoldCost(skill);
};

Game_BattlerBase.prototype.canSkillExpCost = function(skill) {
    if (this.isActor()) {
        if (skill.meta.SkillLavelExpCost) {
            return this.currentExp() - this.skillExpCost(skill) >= this.currentLevelExp();
        } else {
            return this.currentExp() >= this.skillExpCost(skill);
        }
    }
    return true;
};

Game_BattlerBase.prototype.canSkillItemCost = function(skill) {
    const items = this.skillItemCost(skill);
    return this.skillItemCost(skill).every(cost => $gameParty.numItems(cost.item) >= cost.quantity);
};

Game_BattlerBase.prototype.canSkillEquipCost = function(skill) {
    return this.skillEquipCost(skill).every(cost => {
        if(DataManager.isWeapon(cost.item)) {
            return this.hasWeapon(cost.item);
        } else if (DataManager.isArmor(cost.item)) {
            return this.hasArmor(cost.item);
        } else {
            return false;
        }
    });
};

Game_BattlerBase.prototype.canSkillVarCost = function(skill) {
    const cost = this.skillVarCost(skill);
    return cost ? $gameVariables.value(cost[0]) >= cost[1] : true;
};

Game_BattlerBase.prototype.canSkillEvalCost = function(skill) {
    return skill.meta.SkillEvalCost ? eval(skill.meta.SkillEvalCost) : true;
};

const _Game_BattlerBase_paySkillCost = Game_BattlerBase.prototype.paySkillCost;
Game_BattlerBase.prototype.paySkillCost = function(skill) {
    this.setBCostParam();
    _Game_BattlerBase_paySkillCost.call(this, skill);
    this._hp -= this.skillHpCost(skill);
    $gameParty.loseGold(this.skillGoldCost(skill));
    this.paySkillExpCost(skill);
    this.paySkillItemCost(skill);
    this.paySkillEquipCost(skill);
    this.paySkillVarCost(skill);
    this.paySkillEvalCost(skill);
};

Game_BattlerBase.prototype.paySkillExpCost = function(skill) {
    if (this.isActor()) {
        this.changeExp(this.currentExp() - this.skillExpCost(skill), this.shouldDisplayLevelUp());
    }
};

Game_BattlerBase.prototype.paySkillItemCost = function(skill) {
    this.skillItemCost(skill).forEach(cost => {
        $gameParty.loseItem(cost.item, cost.quantity, false);
    });
};

Game_BattlerBase.prototype.paySkillEquipCost = function(skill) {
    this.skillEquipCost(skill).forEach(cost => { 
        if (cost.quantity > 0)  {
            this.discardEquip(cost.item);
        }
    });
};

Game_BattlerBase.prototype.paySkillVarCost = function(skill) {
    const cost = this.skillVarCost(skill);
    if (cost) {
        const val = $gameVariables.value(cost[0]) - cost[1];
        $gameVariables.setValue(cost[0], val);
    }
};

Game_BattlerBase.prototype.paySkillEvalCost = function(skill) {
    if (skill.meta.SkillEvalCons) {
        eval(skill.meta.SkillEvalCons);
    }
};

function getCostItems(skill) {
    const list = [];
    if (skill.meta.SkillItemCost) {
        const re = /<(?:SkillItemCost):\s*(.*)>/g;
        while(true) {
            let match = re.exec(skill.note);
            if (match) {
                let data = match[1].split(',');
                switch (data[0]) {
                    case 'I':
                        list.push({item: $dataItems[parseInt(data[1])], quantity: parseInt(data[2])});
                        break;
                    case 'W':
                        list.push({item: $dataWeapons[parseInt(data[1])], quantity: parseInt(data[2])});
                        break;
                    case 'A':
                        list.push({item: $dataArmors[parseInt(data[1])], quantity: parseInt(data[2])});
                        break;
                }
            } else {
                return list;
            }
        }
    }
    return list;
};

function getCostEquip(skill) {
    const list = [];
    if (skill.meta.SkillEquipCost) {
        const re = /<(?:SkillEquipCost):\s*(.*)>/g;
        while(true) {
            let match = re.exec(skill.note);
            if (match) {
                let data = match[1].split(',');
                switch (data[0]) {
                    case 'W':
                        list.push({item: $dataWeapons[parseInt(data[1])], quantity: parseInt(data[2])});
                        break;
                    case 'A':
                        list.push({item: $dataArmors[parseInt(data[1])], quantity: parseInt(data[2])});
                        break;
                }
            } else {
                return list;
            }
        }
    }
    return list;
};

})();
