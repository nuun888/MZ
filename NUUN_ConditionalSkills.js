/*:-----------------------------------------------------------------------------------
 * NUUN_ConditionalSkills.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc 条件付きアイテム、スキル
 * @author NUUN
 * @version 1.2.0
 * @base NUUN_ConditionsBase
 * @orderAfter NUUN_ConditionsBase
 * 
 * @help
 * スキル、アイテムに使用条件を設定できます。
 * 【属性】【攻撃】【ダメージ】【使用アイテム、スキル】【反撃、魔法反射】及び敵の対象は設定できません。
 * 敵グループ指定の場合戦闘中のみ条件判定します。
 * コマンドメニューからは対応しておりません。
 * 
 * 
 * 使用条件
 * スキル。アイテムのメモ欄
 * <ConditionalSkill[Num]:[id],[id],[id]...>
 * 使用者に対し、指定したIDの条件を全て満たしたときに使用可能です。
 * <TargetConditionalSkill[Num]:[id],[id],[id]...>
 * 対象に対し、指定したIDの条件を全て満たしたときに使用可能です。戦闘中は判定されません。
 * <PartyConditionalSkill[Num]:[id],[id],[id]...>
 * パーティメンバーの指定したIDの条件を全て満たしたときに使用可能です。
 * <TroopConditionalSkill[Num]:[id],[id],[id]...>
 * 敵グループの指定したIDの条件を全て満たしたときに使用可能です。
 * 敵グループは戦闘中のみ判定します。
 * [Num]:識別ID (最初の識別IDは記入しません。ConditionalSkillと記入します)。
 * 2つ目以降の条件は識別IDを2から開始します。ConditionalSkill2
 * [id]:条件付きベースの適用条件のリストID
 * 
 * <MatchMode[Num]:[modeId]> 条件モード。
 * [Num]:識別ID (最初の識別IDは記入しません。MatchModeと記入します)。
 * 2つ目以降の条件は識別IDを2から開始します。MatchMode2
 * [modeId]:0 いずれかが一致　1：全て一致
 * 未記入の場合はいずれかが一致の場合条件を満たしたときになります。
 * 移動時の使用者は薬の知識が一番高いキャラになります。
 * 
 * ...ConditionalSkill2だけを指定しても条件が適用されません。
 * 複数の条件のいずれかが一致したときに適用されます。
 * 例
 * <TargetConditionalSkill:3,6>
 * <TargetConditionalSkill2:4,8>
 * <MatchMode:1>
 * 対象の条件ID3,6が全て一致または対象の条件4,8のいずれかが一致したときに適用されます。
 * 
 * このプラグインはNUUN_ConditionsBaseが必要です。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/3/12 Ver.1.2.0
 * 複数条件の機能拡張。
 * 2022/8/4 Ver.1.1.0
 * 対象を条件に指定できるように修正(移動時のみ)。
 * 2021/11/12 Ver.1.0.1
 * 条件付きベースの条件付きベースの定義変更による条件タグの設定方法を変更。
 * 2021/9/13 Ver.1.0.0
 * 初版
 * 
 * @param EnemyUseConditional
 * @text 敵使用条件適用
 * @desc 敵にもスキルの使用条件を適用
 * @type boolean
 * @default true
 * 
 */

var Imported = Imported || {};
Imported.NUUN_ConditionalSkills = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_ConditionalSkills');
  const EnemyUseConditional = eval(parameters['EnemyUseConditional'] || 'true');

  const _Scene_ItemBase_canUse = Scene_ItemBase.prototype.canUse;
  Scene_ItemBase.prototype.canUse = function() {
    $gameTemp.condTargets = this.itemTargetActors();
    return _Scene_ItemBase_canUse.call(this);
  };

  const _Game_BattlerBase_meetsSkillConditions = Game_BattlerBase.prototype.meetsSkillConditions;
  Game_BattlerBase.prototype.meetsSkillConditions = function(skill) {
    return this.itemConditionsEX(skill) && _Game_BattlerBase_meetsSkillConditions.call(this, skill);
  };

  const _Game_BattlerBase_meetsItemConditions = Game_BattlerBase.prototype.meetsItemConditions;
  Game_BattlerBase.prototype.meetsItemConditions = function(item) {
    return this.itemConditionsEX(item) && _Game_BattlerBase_meetsItemConditions.call(this, item);
  };

  Game_Actor.prototype.itemConditionsEX = function(item) {
    const targets = $gameTemp.condTargets || [];
    $gameTemp.condTargets = [];
    if (targets.length > 0) {
        let id = 1;
        while (true) {
            if (!checkTag(item, id)) {
                return id === 1;
            }
            const tagId = id > 1 ? id : '';
            const mode = (id > 1 ? Number(item.meta["MatchMode" +id]) : Number(item.meta.MatchMode)) || 0;
            for (const target of targets) {
                if (this.getTriggerConditions(item, target, 'ConditionalSkill'+ tagId, 'TargetConditionalSkill'+ tagId, 'PartyConditionalSkill'+ tagId, 'TroopConditionalSkill'+ tagId, null, null, mode)) {
                    return true;
                }
            }
            id++;
        }
    } else {
        let id = 1;
        while (true) {
            if (!checkTag(item, id)) {
                return id === 1;
            }
            const tagId = id > 1 ? id : '';
            const mode = (id > 1 ? Number(item.meta["MatchMode" +id]) : Number(item.meta.MatchMode)) || 0;
            if (this.getTriggerConditions(item, null, 'ConditionalSkill'+ tagId, null, 'PartyConditionalSkill'+ tagId, 'TroopConditionalSkill'+ tagId, null, null, mode)) {
                return true;
            }
            id++;
        }
    }
  };

  Game_Enemy.prototype.itemConditionsEX = function(item) {
    if (EnemyUseConditional) {
        $gameTemp.condTargets = [];
        let id = 1;
        while (true) {
            if (!checkTag(item, id)) {
                return id === 1;
            }
            const tagId = id > 1 ? id : '';
            const mode = (id > 1 ? Number(item.meta["MatchMode" +id]) : Number(item.meta.MatchMode)) || 0;
            if (this.getTriggerConditions(item, null, 'ConditionalSkill'+ tagId, null, 'PartyConditionalSkill'+ tagId, 'TroopConditionalSkill'+ tagId, null, null, mode)) {
                return true;
            }
            id++;
        }
    } else {
      return true;
    }
  };

  function checkTag(item, id) {
    const meta = item.meta;
    if (id === 1) {
        return (meta.ConditionalSkill || meta.TargetConditionalSkill || meta.PartyConditionalSkill || meta.TroopConditionalSkill);
    } else {
        return (meta["ConditionalSkill" +id] || meta["TargetConditionalSkill"+ id] || meta["PartyConditionalSkill]"+ id] || meta["TroopConditionalSkill"+ id]);
    }
  }

})();