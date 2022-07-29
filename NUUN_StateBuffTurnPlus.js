/*:-----------------------------------------------------------------------------------
 * NUUN_StateBuffTurnPlus.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc ステート、バフターン数増減特徴
 * @author NUUN
 * @version 1.1.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * ステート、バフ付加時の効果ターンが増加、減少する特徴を設定できます。
 * 
 * 特徴を持つメモ欄
 * <StateTurn[stateId]:[turn]> 指定のステートのターンが[Turn]増加します。
 * <BuffTurn[BuffId]:[turn]> 指定のバフのターンが[Turn]増加します。
 * <DebuffTurn[BuffId]:[turn]> 指定のデバフのターンが[Turn]増加します。
 * [stateId]:ステートID
 * [BuffId]:バフID 0:HP 1:MP 2:攻撃力 3:防御力 4:魔法力 5:魔法防御 6:敏捷性 7:運
 * [turn]:±ターン数
 * <StateTurn4:2> ステート４番のターンが２ターン増加します。
 * <BuffTurn3:3> 攻撃力上昇のバフの
 * 効果が３ターン増加します。
 * <DebuffTurn5:-2> 魔法力低下のデバフの効果が２ターン減少します。
 * 加算ターンと付与するターンのターンが0を下回った場合は最低１ターン効果が適用されます。
 * 
 * <MemberTurnPlus[mode]:[id],[id]...>
 * パーティメンバーの誰かがこの特徴を持つときに、ステート、バフ、デバフの効果が延長されます。なお必ず上記とステート、バフの効果が増減するタグを記入してください。
 * [id]:アクターID
 * 0:全てのメンバー
 * 1以上:アクターID
 * 1-5:アクターID1～5までのアクター
 * 
 * <EnemyTurnPlus:[id],[id]...>
 * 敵グループの誰かがこの特徴を持つときに、ステート、バフ、デバフの効果が延長されます。なお必ず上記とステート、バフの効果が増減するタグを記入してください。
 * 0:全てのバトルエネミー
 * 1以上:モンスターID
 * 3-8:モンスターID3～8までのモンスター
 * 
 * 更新履歴
 * 2022/7/29 Ver.1.1.0
 * パーティ、敵グループの誰かが特徴を持っていればターンが増減する機能を追加。
 * 2022/1/15 Ver.1.0.0
 * 初版
 * 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_StateBuffTurnPlus = true;

(() => {
const parameters = PluginManager.parameters('NUUN_StateBuffTurnPlus');

Game_BattlerBase.prototype.getStateTurnPlus = function(stateId, sujectId, index) {
    return this.traitObjects().reduce((r, trait) => {
        if (this.getMembersTurnPlusTag(trait)) {
            if (!this.getBattlerTurnPlus(trait, sujectId)) {
                return r;
            }
        } else if (this.isActor() && this.actorId() !== sujectId) {
            return r;
        } else if (this.isEnemy() && this.index() !== index) {
            return r;
        }
        const tag = 'StateTurn' + stateId;
        const data = trait.meta[tag];
        return r + (data && data !== 0 ? Number(data) : 0);
    }, 0);
};

Game_BattlerBase.prototype.getBuffTurnPlus = function(buffId, sujectId, index) {
    return this.traitObjects().reduce((r, trait) => {
        if (this.getMembersTurnPlusTag(trait)) {
            if (!this.getBattlerTurnPlus(trait, sujectId)) {
                return r;
            }
        } else if (this.isActor() && this.actorId() !== sujectId) {
            return r;
        } else if (this.isEnemy() && this.index() !== index) {
            return r;
        }
        const tag = 'BuffTurn' + buffId;
        const data = trait.meta[tag];
        return r + (data && data !== 0 ? Number(data) : 0);
    }, 0);
};

Game_BattlerBase.prototype.getDebuffTurnPlus = function(buffId, sujectId, index) {
    return this.traitObjects().reduce((r, trait) => {
        if (this.getMembersTurnPlusTag(trait)) {
            if (!this.getBattlerTurnPlus(trait, sujectId)) {
                return r;
            }
        } else if (this.isActor() && this.actorId() !== sujectId) {
            return r;
        } else if (this.isEnemy() && this.index() !== index) {
            return r;
        }
        const tag = 'DebuffTurn' + buffId;
        const data = trait.meta[tag];
        return r + (data && data !== 0 ? Number(data) : 0);
    }, 0);
};

const _Game_BattlerBase_resetStateCounts = Game_BattlerBase.prototype.resetStateCounts;
Game_BattlerBase.prototype.resetStateCounts = function(stateId) {
    _Game_BattlerBase_resetStateCounts.call(this, stateId);
    this._stateTurns[stateId] = Math.max(this._stateTurns[stateId] + this.getMembersTurnPlus(stateId), 1);
};

const _Game_BattlerBase_overwriteBuffTurns = Game_BattlerBase.prototype.overwriteBuffTurns;
Game_BattlerBase.prototype.overwriteBuffTurns = function(paramId, turns) {
    const newTurn = Math.max(turns + (this.isBuffAffected(paramId) ? this.getMembersBuffTurnPlus(paramId) : this.getMembersDebuffTurnPlus(paramId)), 1);
    _Game_BattlerBase_overwriteBuffTurns.call(this, paramId, newTurn);
};

Game_Actor.prototype.getMembersTurnPlus = function(stateId) {
    return $gameParty.battleMembers().reduce((r, member) => {
        return r + member.getStateTurnPlus(stateId, this.actorId());
    }, 0);
};

Game_Enemy.prototype.getMembersTurnPlus = function(stateId) {
    const index = this.index();
    return $gameTroop.battleMembers().reduce((r, member) => {
        return r + member.getStateTurnPlus(stateId, this.enemyId(), index);
    }, 0);
};

Game_Actor.prototype.getMembersBuffTurnPlus = function(paramId) {
    return $gameParty.battleMembers().reduce((r, member) => {
        return r + member.getBuffTurnPlus(paramId, this.actorId());
    }, 0);
};

Game_Actor.prototype.getMembersDebuffTurnPlus = function(paramId) {
    return $gameParty.battleMembers().reduce((r, member) => {
        return r + member.getDebuffTurnPlus(paramId, this.actorId());
    }, 0);
};

Game_Enemy.prototype.getMembersBuffTurnPlus = function(paramId) {
    const index = this.index();
    return $gameParty.battleMembers().reduce((r, member) => {
        return r + member.getBuffTurnPlus(paramId, this.enemyId(), index);
    }, 0);
};

Game_Enemy.prototype.getMembersDebuffTurnPlus = function(paramId) {
    const index = this.index();
    return $gameTroop.members().reduce((r, member) => {
        return r + member.getDebuffTurnPlus(paramId, this.enemyId(), index);
    }, 0);
};

Game_Actor.prototype.getBattlerTurnPlus = function(trait, sujectId) {
    let list = [];
    const data = trait.meta.MemberTurnPlus.split(',');
    for (const id of data) {
        Array.prototype.push.apply(list, NuunManager.nuun_getListIdData(id));
    }
    if (list[0] === 0) {
        return true;
    } else {
        return list.some(id => id === sujectId);
    }
};

Game_Enemy.prototype.getBattlerTurnPlus = function(trait, sujectId) {
    let list = [];
    const data = trait.meta.EnemyTurnPlus.split(',');
    for (const id of data) {
        Array.prototype.push.apply(list, NuunManager.nuun_getListIdData(id));
    }
    if (list[0] === 0) {
        return true;
    } else {
        return list.some(id => id === sujectId);
    }
};

Game_Actor.prototype.getMembersTurnPlusTag = function(trait) {
    return !!trait.meta.MemberTurnPlus;
};

Game_Enemy.prototype.getMembersTurnPlusTag = function(trait) {
    return !!trait.meta.EnemyTurnPlus;
};

})();