/*:-----------------------------------------------------------------------------------
 * NUUN_ActorFixed.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc Fixed actor formation
 * @author NUUN
 * @version 1.2.4
 * 
 * @help
 * Fixes the actor's formation.
 * Actor fixing can be set from the actor's memo field or plugin command.
 * 
 * Plugin command sorting Fixed party member destination index ID will force the fixed actor to move to the specified member position if it is among the party members.
 * Disabled by specifying 0.
 * Member indexes start from 1. The index of the first actor is 1.
 * Cannot be specified if the actor ID is specified as 0.
 * 
 * Actor's notes
 * <FixedActor> Fixes the movement of the actor.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 1/18/2026 Ver.1.2.4
 * Added definitions to reference plugin parameters from external plugins.
 * 12/15/2024 Ver.1.2.3
 * Fixed an issue where an error would occur when switching members if movement to fixed actor battle members was turned on.
 * 8/17/2021 Ver.1.0.0
 * First edition.
 * 
 * @command ActorFixed
 * @desc Fixed the formation.
 * @text Fixed formation
 * 
 * @arg ActorId
 * @type actor
 * @default 0
 * @text Actor ID
 * @desc Specify the actor ID. 0 for all actors
 * 
 * @arg memberIndex
 * @type number
 * @default 0
 * @text Party member destination index ID
 * @desc Specifies the index ID to move to the party member. Only valid when specifying an actor ID. 0 means no specification.
 * 
 * @command ActorFixedRelease
 * @desc Cancels the fixed formation.
 * @text Formation fixation release
 * 
 * @arg ActorId
 * @type actor
 * @default 0
 * @text Actor ID
 * @desc Specify the actor ID. 0 for all actors
 * 
 * 
 * @param ActorFixedMovable
 * @text Can be moved to fixed actor battle members
 * @desc Allows moving fixed actors to battle members. Also, the moved actor can move within the battle members.
 * @type boolean
 * @default false
 * @parent ActorFixedSetting
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc アクター並び替え固定
 * @author NUUN
 * @version 1.2.4
 * 
 * @help
 * アクターの並び替えを固定します。
 * アクターの固定はアクターのメモ欄またはプラグインコマンドから設定します。
 * 
 * プラグインコマンドの並び替え固定のパーティメンバー移動先インデックスIDは固定したアクターがパーティメンバー内にいれば
 * 強制的に指定先のメンバー位置に移動させることができます。0を指定することで無効になります。
 * メンバーインデックスは1から始まります。一番最初のアクターのインデックスは1になります。
 * アクターIDを0に指定している場合は指定できません。
 * 
 * アクターのメモ欄
 * <FixedActor> アクターを固定します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2026/1/18 Ver.1.2.4
 * プラグインパラメータを外部プラグインから参照させるための定義を追加。
 * 2024/10/22 Ver.1.2.3
 * 固定アクター戦闘メンバーへの移動可をONにしている場合、メンバー交代時にエラーが起きる問題を修正。
 * 2024/10/22 Ver.1.2.2
 * NUUN_SceneFormationを使用していない場合に、エラーが出る問題を修正。
 * 2023/7/24 Ver.1.2.1
 * 処理の修正。
 * 2022/2/23 Ver.1.2.0
 * 固定アクター設定時に指定先のメンバーインデックスに移動させる機能を追加。
 * メンバー変更画面処理変更により定義修正。
 * 2021/9/22 Ver.1.1.4
 * 固定アクターの移動が正常に行えていなかった問題を修正。
 * 2021/9/21 Ver.1.1.3
 * メンバー変更画面の固定アクター戦闘メンバーへの移動可対応による処理の追加。
 * 2021/9/18 Ver.1.1.2
 * 一部処理を変更。
 * 2021/9/8 Ver.1.1.1
 * 固定アクターを戦闘メンバー内でも入れ替えできるように修正。
 * 2021/8/25 Ver.1.1.0
 * 固定したメンバーを控えメンバーに移動させない機能を追加。
 * 2021/8/17 Ver.1.0.0
 * 初版
 * 
 * @command ActorFixed
 * @desc 並び替えを固定します。
 * @text 並び替え固定
 * 
 * @arg ActorId
 * @type actor
 * @default 0
 * @text アクターID
 * @desc アクターIDを指定します。0で全アクター
 * 
 * @arg memberIndex
 * @type number
 * @default 0
 * @text パーティメンバー移動先インデックスID
 * @desc パーティメンバーに移動させるインデックスIDを指定します。アクターIDを指定している時のみ有効です。　0で指定なし
 * 
 * @command ActorFixedRelease
 * @desc 並び替え固定を解除します。
 * @text 並び替え固定解除
 * 
 * @arg ActorId
 * @type actor
 * @default 0
 * @text アクターID
 * @desc アクターIDを指定します。0で全アクター
 * 
 * 
 * @param ActorFixedMovable
 * @text 固定アクター戦闘メンバーへの移動可
 * @desc 固定アクターの戦闘メンバーへの移動を許可します。また移動したアクターは戦闘メンバー内であれば移動可能です。
 * @type boolean
 * @default false
 * @parent ActorFixedSetting
 * 
 */
var Imported = Imported || {};
Imported.NUUN_ActorFixed = true;

(() => {
const parameters = PluginManager.parameters('NUUN_ActorFixed');
const ActorFixedMovable = eval(parameters['ActorFixedMovable'] || 'false');
let cursorMode = null;
let pendingMode = null;
let onFixedMovable = false;

const pluginName = "NUUN_ActorFixed";

PluginManager.registerCommand(pluginName, 'ActorFixed', args => {
  const actorId = Number(args.ActorId);
  if (actorId > 0) {
    const actor = $gameActors.actor(actorId)
    actor.setFixed();
    const index = Number(args.memberIndex);
    if (index > 0) {
      const memberIndex = $gameParty.allMembers().indexOf(actor);
      if (memberIndex >= 0) {
        $gameParty._actors.splice(memberIndex, 1);
        $gameParty._actors.splice(index - 1, 0, actorId);
        $gamePlayer.refresh();
      }
    }
  } else {
    $gameParty.allMembers().forEach(actor => actor.setFixed());
  }
});

PluginManager.registerCommand(pluginName, 'ActorFixedRelease', args => {
  const actorId = Number(args.ActorId);
  if (actorId > 0) {
    $gameActors.actor(actorId).setFixedRelease();
  } else {
    $gameParty.allMembers().forEach(actor => actor.setFixedRelease());
  }
});

Game_Actor.prototype.setFixed = function() {
  this._fixed = true;
};

Game_Actor.prototype.setFixedRelease = function() {
  this._fixed = false;
};

Game_Actor.prototype.isFixed = function() {
  return this._fixed || this.actor().meta.FixedActor;
};

Game_Actor.prototype.isFixedMovable = function() {
    return ActorFixedMovable;
};

const _Game_Actor_isFormationChangeOk = Game_Actor.prototype.isFormationChangeOk;
Game_Actor.prototype.isFormationChangeOk = function() {
  return _Game_Actor_isFormationChangeOk.call(this) && (!this.isFixed() || onFixedMovable);
};


const _Scene_Menu_initialize = Scene_Menu.prototype.initialize;
Scene_Menu.prototype.initialize = function() {
  _Scene_Menu_initialize.call(this);
  cursorMode = 'battle'
  pendingMode = null;
};

const _Window_MenuStatus_setPendingIndex = Window_MenuStatus.prototype.setPendingIndex;
Window_MenuStatus.prototype.setPendingIndex = function(index) {
  _Window_MenuStatus_setPendingIndex.call(this, index);
  pendingMode = index >= $gameParty.maxBattleMembers() ? 'member' : 'battle';
};

const _Window_MenuStatus_update = Window_MenuStatus.prototype.update;
Window_MenuStatus.prototype.update = function() {
  _Window_MenuStatus_update.call(this);
  if (this._formationMode) {
    const index = this.index();
    cursorMode = index >= $gameParty.maxBattleMembers() ? 'member' : 'battle';
  }
};

const _Window_MenuStatus_isCurrentItemEnabled = Window_MenuStatus.prototype.isCurrentItemEnabled;
Window_MenuStatus.prototype.isCurrentItemEnabled = function() {
  if (this._formationMode) {
    onFixedMovable = ActorFixedMovable;
    const result = _Window_MenuStatus_isCurrentItemEnabled.call(this);
    onFixedMovable = false;
    return result && this.isCurrentActorFixedEnabled(cursorMode, pendingMode);
  } else {
    return _Window_MenuStatus_isCurrentItemEnabled.call(this);
  }
};

Window_StatusBase.prototype.isCurrentActorFixedEnabled = function(cursor, pending) {
  if (ActorFixedMovable) {
    const actor = this.getFormationActor(cursor);
    const pendingActor = this.getPendingActor(pending);
    if (pendingActor) {
      if (!pending && !actor) {
        return true;
      } else if (cursor === 'battle' && cursor === pending) {
        return true;
      } else if (cursor === 'battle' && cursor !== pending) {
        return !actor.isFixed();
      } else {
        return pendingActor ? !pendingActor.isFixed() : true;
      }
    } else {
      return true;
    }
  } else {
    return true;
  }
};

Window_MenuStatus.prototype.getFormationActor = function() {
    return this.actor(this.index());
};

Window_MenuStatus.prototype.getPendingActor = function() {
    return this.actor(this._pendingIndex);
};

if (Imported.NUUN_SceneFormation) {
    const _Window_FormationBattleMember_isCurrentItemEnabled = Window_FormationBattleMember.prototype.isCurrentItemEnabled;
    Window_FormationBattleMember.prototype.isCurrentItemEnabled = function() {
        return _Window_FormationBattleMember_isCurrentItemEnabled.call(this);
    };
    
    const _Window_FormationMember_isCurrentItemEnabled =Window_FormationMember.prototype.isCurrentItemEnabled;
    Window_FormationMember.prototype.isCurrentItemEnabled = function() {
        return _Window_FormationMember_isCurrentItemEnabled.call(this);
    };
    
    const _Window_FormationBattleMember_isChangeActorEnabled = Window_FormationBattleMember.prototype.isChangeActorEnabled;
    Window_FormationBattleMember.prototype.isChangeActorEnabled = function(actor, pendingActor) {
        return this.isChangeActorFixed(actor, pendingActor);
    };

    Window_FormationBattleMember.prototype.isChangeActorFixed = function(actor, pendingActor) {
        if (ActorFixedMovable && actor) {
            if (pendingActor) {
                return !pendingActor.isBattleMember() ? _Window_FormationBattleMember_isChangeActorEnabled.call(this, actor, pendingActor) : true;
            } else {
                return this._formation.isPendingBattleMode() || !this._formation.pendingMode ? true : _Window_FormationBattleMember_isChangeActorEnabled.call(this, actor, pendingActor);
            }
        } else if (actor) {
            return _Window_FormationBattleMember_isChangeActorEnabled.call(this, actor, pendingActor);
        } else {
            return true;
        }
    };
    
    const _Window_FormationMember_isChangeActorEnabled = Window_FormationMember.prototype.isChangeActorEnabled;
    Window_FormationMember.prototype.isChangeActorEnabled = function(actor, pendingActor) {
        return this.isChangeActorFixed(actor, pendingActor);
    };

    Window_FormationMember.prototype.isChangeActorFixed = function(actor, pendingActor) {
        if (!!pendingActor && pendingActor.isBattleMember()) {
            return _Window_FormationMember_isChangeActorEnabled.call(this, pendingActor);
        } else {
            return true;
        }
    };

    Window_FormationBattleMember.prototype.getFormationActor = function(cursor) {
        const index = (cursor === 'member' ? $gameParty.maxBattleMembers() : 0) + this.index();
        return $gameParty.allMembers()[index];
    };
      
    Window_FormationMember.prototype.getFormationActor = function(cursor) {
        const index = (cursor === 'member' ? $gameParty.maxBattleMembers() : 0) + this.index();
        return $gameParty.allMembers()[index];
    };

    Window_FormationBattleMember.prototype.getPendingActor = function(pending) {
        const index = (pending === 'member' ? $gameParty.maxBattleMembers() : 0) + this.formationPendingIndex();
        return $gameParty.allMembers()[index];
    };
      
    Window_FormationMember.prototype.getPendingActor = function(pending) {
        const index = (pending === 'member' ? $gameParty.maxBattleMembers() : 0) + this.formationPendingIndex();
        return $gameParty.allMembers()[index];
    };
}


})();