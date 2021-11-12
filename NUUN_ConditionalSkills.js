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
 * @version 1.0.2
 * @base NUUN_ConditionsBase
 * @orderAfter NUUN_ConditionsBase
 * 
 * @help
 * スキル、アイテムに使用条件を設定できます。
 * 【属性】【攻撃】【ダメージ】【使用アイテム、スキル】【反撃、魔法反射】及び敵の対象は設定できません。
 * 敵グループ指定の場合戦闘中のみ条件判定します。
 * 
 * スキル。アイテムのメモ欄
 * <ConditionalSkill:[id],[id],[id]...> 指定したIDの条件を全て満たしたときに使用可能です。
 * <PartyConditionalSkill:[id],[id],[id]...> パーティメンバーの指定したIDの条件を全て満たしたときに使用可能です。
 * <TroopConditionalSkill:[id],[id],[id]...> 敵グループの指定したIDの条件を全て満たしたときに使用可能です。
 * 敵グループは戦闘中のみ判定します。
 * [id]:条件付きベースの適用条件のリストID
 * <MatchMode:[modeId]> [modeId]:0 いずれかが一致　1：全て一致
 * 未記入の場合はいずれかが一致の場合条件を満たしたときになります。
 * 
 * このプラグインはNUUN_ConditionsBaseが必要です。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
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

  const _Game_BattlerBase_meetsSkillConditions = Game_BattlerBase.prototype.meetsSkillConditions;
  Game_BattlerBase.prototype.meetsSkillConditions = function(skill) {
    return this.itemConditionsEX(skill) && _Game_BattlerBase_meetsSkillConditions.call(this, skill);
  };

  const _Game_BattlerBase_meetsItemConditions = Game_BattlerBase.prototype.meetsItemConditions;
  Game_BattlerBase.prototype.meetsItemConditions = function(item) {
    return this.itemConditionsEX(item) && _Game_BattlerBase_meetsItemConditions.call(this, item);
  };

  Game_BattlerBase.prototype.itemConditionsEX = function(item) {
    if (this.isActor() || EnemyUseConditional) {
      const mode = Number(item.meta.MatchMode) || 0;
      return this.getTriggerConditions(item, null, 'ConditionalSkill', null, 'PartyConditionalSkill', 'TroopConditionalSkill', null, null, mode);
    } else {
      return true;
    }
  };
})();