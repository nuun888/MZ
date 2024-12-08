/*:-----------------------------------------------------------------------------------
 * NUUN_SupportActor.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc Supported Actor
 * @author NUUN
 * @version 2.0.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 *            
 * @help
 * Set the actor to support in battle.
 * Support Actors do not appear on the battle screen, do not appear in the Actor Status window, and cannot be attacked.
 * If all members except the support member are wiped out, the team will lose.
 * Please set the settings for auto-battle and experience point acquisition based on the actor's characteristics.
 * 
 * Actor's notes
 * <SupportActor> Actors with this tag are support actors.
 * 
 * Terms of Use
 * This plugin is distributed under the MIT license.
 * 
 * Log
 * 12/8/2024 Ver.2.0.0
 * Significant changes to processing methods
 * Added the ability to specify the maximum number of support actors.
 * 8/1/2021 Ver.1.0.0
 * First edition.
 * 
 * @command SupportActorSetting
 * @desc Set the actor to be made or removed as a support actor.
 * @text Support actor settings
 * 
 * @arg Actor
 * @text Actor
 * @desc Specify the actor.
 * @type actor
 * @default 0
 * 
 * @arg SupportActorsSwitch
 * @desc Support actor ON or OFF (ON makes him a support actor)
 * @text Support Actor Switch
 * @type boolean
 * @default true
 * 
 * @arg SupportActorTurn
 * @text Support Actor Turn
 * @desc Sets the turn the support actor is called for (-1 for unlimited, -2 for until the end of the battle).
 * @type number
 * @default -1
 * @min -2
 * 
 * 
 * @param SupportActorSV
 * @text Side view support actor settings
 * @desc Side view support actor coordinate settings.
 * @default []
 * @type struct<SupportActorSVList>[]
 * 
 * @param MaxSupportActor
 * @text Max number of support actors
 * @desc Number of members you can support during battle. 0 is unlimited
 * @type number
 * @default 0
 * 
 */
/*~struct~SupportActorSVList:
 * 
 * @param SupportActorSV_X
 * @text Support actor SV coordinate X
 * @desc Support actor SV coordinate X.
 * @type number
 * @min -9999
 * @default 0
 * 
 * @param SupportActorSV_Y
 * @text Support actor SV coordinate Y
 * @desc Support actor SV coordinate Y.
 * @type number
 * @min -9999
 * @default 96
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc サポートアクタープラグイン
 * @author NUUN
 * @version 2.0.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 *            
 * @help
 * 戦闘でサポートするアクターを設定します。
 * サポートアクターは戦闘画面に表示されずアクターステータスウィンドウにも表示されません。また攻撃対象にされません。
 * サポートメンバー以外のメンバーが全滅した場合、敗北となります。
 * 自動戦闘、経験値の入手に関して設定はアクターの特徴から設定してください。
 * 
 * アクターのメモ欄
 * <SupportActor> このタグがあるアクターはサポートアクターとなります。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2024/12/8 Ver.2.0.0
 * 処理方法を大幅に変更
 * サポートアクターの最大数を指定できる機能を追加。
 * 2023/11/23 Ver.1.4.5
 * 通常メンバー全員が行動不能になった時にサポートアクターがアイテムを使用すると、一覧に表示されない問題を修正。
 * 2023/4/9 Ver.1.4.4
 * 処理の修正。
 * 2022/10/8 Ver.1.4.3
 * 競合対策。
 * 2022/3/30 Ver.1.4.2
 * メンバー変更画面サポートアクター適用による定義追加。
 * 2022/3/29 Ver.1.4.1
 * サポートアクターインジケータが機能しない問題を修正。
 * パーティリーダーがサポートアクターの時に別のキャラのキャラチップが表示されてしまう問題を修正。
 * 2022/3/28 Ver.1.4.0
 * 処理の見直しにより定義修正。
 * 2021/12/30 Ver.1.3.5
 * ステータス画面を開くとエラーが出る問題を修正。
 * サポートアクターをパーティに加えた時に、TPBバトルだと動作しない問題を修正。
 * 2021/12/26 Ver.1.3.4
 * フロントビューで戦闘を開始するとエラーが出る問題を修正。
 * 2021/12/25 Ver.1.3.3
 * プラグインコマンド「サポートアクター設定」に戦闘中の呼び出しターンを指定する機能を追加。
 * 2021/12/24 Ver.1.3.2
 * 特定の条件下でアクターのコマンドが表示されなくなる問題を修正。
 * その他競合対策。
 * 機能していないプラグインパラメータを削除。
 * 2021/12/18 Ver.1.3.1
 * 特定条件下で戦闘中に攻撃コマンドを使用するとエラーが出る問題を修正。
 * 2021/11/3 Ver.1.3.0
 * プラグインコマンドからサポートアクターを設定できる機能を追加。
 * 2021/8/17 Ver.1.2.3
 * メンバー変更画面反映のための処理追加。
 * 2021/8/11 Ver.1.2.2
 * サイドビューに表示するサポートアクターの最大数を超えてサポートアクターがメンバーに追加されるとエラーが出る問題を修正。
 * 2021/8/11 Ver.1.2.1
 * 一部のプラグインパラメータの説明が別の説明になっていた問題を修正。
 * 2021/8/10 Ver.1.2.0
 * サイドビューアクターにサポートアクターを表示する機能を追加。
 * 2021/8/9 Ver.1.1.1
 * セーブ画面拡張でサポートアクターのレベル、サイドビューアクターが表示されなかった問題を修正。
 * 並び替えでサポートアクターを先頭にすると先頭の歩行グラが変わらない問題を修正。
 * 2021/8/9 Ver.1.1.0
 * サポートアクターがフォロワーに表示されていなかった問題を修正。
 * ターン制時のコマンドの処理を修正。
 * セーブ画面のアクター表示にサポートアクターを入れるかの可否する機能を追加。
 * 2021/8/1 Ver.1.0.0
 * 初版
 * 
 * @command SupportActorSetting
 * @desc サポートアクターにするまたは、解除するアクターを設定します。
 * @text サポートアクター設定
 * 
 * @arg Actor
 * @text アクター
 * @desc アクターを指定します。
 * @type actor
 * @default 0
 * 
 * @arg SupportActorsSwitch
 * @desc サポートアクターのONまたはOFF（ONでサポートアクター化）
 * @text サポートアクタースイッチ
 * @type boolean
 * @default true
 * 
 * @arg SupportActorTurn
 * @text サポートアクターターン
 * @desc サポートアクターを呼び出しているターンを設定します。(-1で無制限、-2で戦闘終了まで)
 * @type number
 * @default -1
 * @min -2
 * 
 * 
 * @param SupportActorSV
 * @text サイドビューサポートアクター設定
 * @desc サイドビューサポートアクター座標設定。
 * @default []
 * @type struct<SupportActorSVList>[]
 * 
 * @param MaxSupportActor
 * @text 最大サポートアクター数
 * @desc 戦闘中にサポートできるメンバー数。0で無制限
 * @type number
 * @default 0
 * 
 */
/*~struct~SupportActorSVList:ja
 * 
 * @param SupportActorSV_X
 * @text サポートアクターSV座標X
 * @desc サポートアクターSV座標X
 * @type number
 * @min -9999
 * @default 0
 * 
 * @param SupportActorSV_Y
 * @text サポートアクターSV座標Y
 * @desc サポートアクターSV座標Y
 * @type number
 * @min -9999
 * @default 96
 * 
 */
var Imported = Imported || {};
Imported.NUUN_SupportActor = true;

(() => {
    const params = Nuun_PluginParams.getPluginParams(document.currentScript);
    const pluginName = params.pluginName;
    const SupportActorSV = params.SupportActorSV || [];
    
    PluginManager.registerCommand(pluginName, 'SupportActorSetting', args => {
        const actorId = Number(args.Actor);
        if (actorId > 0) {
            const actor = $gameActors.actor(actorId);
            if (!!actor) {
                actor.setAddSupportActor(args);
            }
        }
    });


    const _Game_Action_makeTargets = Game_Action.prototype.makeTargets;
    Game_Action.prototype.makeTargets = function() {
        this.isSupportActorSpecialAttack();
        const targets = _Game_Action_makeTargets.apply(this, arguments);
        $gameTemp.omitSupportMember = false;
        return targets;
    };

    Game_Action.prototype.isSupportActorSpecialAttack = function() {
        $gameTemp.supportMemberAttack = false;
        if (this.item().meta.SupportActorAttack) {
            $gameTemp.supportMemberAttack = true;
        } else {
            $gameTemp.omitSupportMember = true;//サポートアクターはターゲットにしない
        }
    };


    const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
    Game_Actor.prototype.initMembers = function() {
        _Game_Actor_initMembers.call(this);
        this._supportActorTurn = -1;
        this._supportActorCallActor = 0;
        this._supportActorDeadCallActor = false;
        this._supportActor = false;
    };

    const _Game_Actor_setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function(actorId) {
        _Game_Actor_setup.call(this, actorId);
        this._supportActor = this.isSupportActor();
    };
  
    Game_Actor.prototype.setAddSupportActor = function(args) {
        if ($gameParty.isAddSupportActor()) {
            const flag = eval(args.SupportActorsSwitch);
            this.setSupportActor(flag);
            this.setSupportActorTurn(Number(args.SupportActorTurn));
        }
    };

    Game_Actor.prototype.updateSupportActorTurn = function() {
        if (this._supportActorTurn > 0) {
            this._supportActorTurn--;
        }
    };
    
    Game_Actor.prototype.setSupportActorTurn = function(turn) {
        this._supportActorTurn = turn;
    };
    
    Game_Actor.prototype.getSupportActorTurn = function() {
        return this._supportActorTurn;
    };
  
    Game_Actor.prototype.setSupportActor = function(flag) {
        this._supportActor = flag;
    };
  
    Game_Actor.prototype.isSupportActor = function() {
        return !!this.actor().meta.SupportActor;
    };

    Game_Actor.prototype.getSupportActor = function() {
        if (!this._supportActor) {
            this._supportActor = this.isSupportActor();
        }
        return this._supportActor;
    };
  
    Game_Actor.prototype.supportActorindex = function() {
        return $gameParty.supportActorMembers().indexOf(this);
    };
    
    Game_Actor.prototype.setSupportActorCallActor = function(actorId) {
        this._supportActorCallActor = actorId;
    };
    
    Game_Actor.prototype.getSupportActorCallActor = function() {
        return this._supportActorCallActor;
    };
    
    Game_Actor.prototype.setSupportActorDeahCall = function(flag) {
        this._supportActorDeadCallActor = !!flag;
    };
    
    Game_Actor.prototype.getSupportActorDeahCall = function() {
        return this._supportActorDeadCallActor;
    };
    
    Game_Actor.prototype.updateRemoveSupportActor = function() {
        if (this._supportActorTurn === 0) {
            this.removeSupportActor();
        }
    };
  
    Game_Actor.prototype.supportActorDeathCallActor = function() {
        if (this._supportActorDeadCallActor) {
          if (this._supportActorCallActor > 0 && $gameActors.actor(this.getSupportActorCallActor()).isDead()) {
            this.removeSupportActor();
          }
        }
    };
    
    const _Game_Actor_onTurnEnd = Game_Actor.prototype.onTurnEnd;
    Game_Actor.prototype.onTurnEnd = function() {
        _Game_Actor_onTurnEnd.call(this);
        this.updateSupportActorTurn();
        this.updateRemoveSupportActor();
    };
    
    const _Game_Actor_onBattleEnd = Game_Actor.prototype.onBattleEnd;
    Game_Actor.prototype.onBattleEnd = function() {
        _Game_Actor_onBattleEnd.call(this);
        const turn = this.getSupportActorTurn();
        if (turn === -2 || turn >= 0) {
            this.removeSupportActor();
        }
    };
  
    Game_Actor.prototype.removeSupportActor = function() {
        $gameParty.removeActor(this.actorId());
        this._supportActorCallActor = 0;
        this._supportActorDeadCallActor =false;
        if (!this.getSupportActor()) {
            this._supportActor = false;
        }
    };

    const _Game_Actor_index = Game_Actor.prototype.index;
    Game_Actor.prototype.index = function() {
        if ($gameParty.inBattle()) {
            $gameTemp.omitSupportMember = true;
        }
        return _Game_Actor_index.apply(this, arguments)
    };


    Game_Party.prototype.allBattleMembers = function() {//再定義
        const members = [];
        let i = 0;
        for (const member of this.allMembers()) {
            if (i >= this.maxBattleMembers()) {
                break;
            }
            if (!member || !member.getSupportActor()) {
                i++;
            }
            members.push(member);
        }
        return members;
    };

    //サポートアクター 戦闘画面から省く 攻撃対象にされない コマンド選択は並び順通り
    const _Game_Party_battleMembers = Game_Party.prototype.battleMembers;
    Game_Party.prototype.battleMembers = function() {
        return this.battleOmitSupportMembers(_Game_Party_battleMembers.apply(this, arguments));
    };
  
    Game_Party.prototype.battleOmitSupportMembers = function(members) {
        const omitSupportMember = $gameTemp.omitSupportMember;
        $gameTemp.omitSupportMember = false;
        if (!omitSupportMember) return members;
        return members.filter(member => {
            return !member.getSupportActor();
        });
    };

    const _Game_Unit_aliveMembers = Game_Unit.prototype.aliveMembers;
    Game_Unit.prototype.aliveMembers = function() {
        if (!!this._actors) {
            $gameTemp.omitSupportMember = !$gameTemp.supportMemberAttack;
        }
        return _Game_Unit_aliveMembers.apply(this, arguments);
    };
    
    const _Game_Unit_deadMembers = Game_Unit.prototype.deadMembers;
    Game_Unit.prototype.deadMembers = function() {
        if (!!this._actors) {
            $gameTemp.omitSupportMember = !$gameTemp.supportMemberAttack;
        }
        return _Game_Unit_deadMembers.apply(this, arguments);
    };

    Game_Party.prototype.supportActorMembers = function() {//全てのサポートアクターを取得
        return this.allMembers().filter(member => member.getSupportActor());
    };
    
    Game_Party.prototype.supportActorWithinMembers = function() {//バトルメンバー内のサポートアクターを取得
        return this.battleMembers().filter(member => member.getSupportActor());
    };

    Game_Party.prototype.maxSupportActor = function() {
        const max = params.MaxSupportActor > 0 ? params.MaxSupportActor : Infinity;
        return $gameSystem.isSideView() ? Math.min(SupportActorSV.length, max) : max;
    };

    Game_Party.prototype.isAddSupportActor = function() {
        return this.supportActorWithinMembers().length < this.maxSupportActor();
    };

    const _Game_Party_addActor = Game_Party.prototype.addActor;
    Game_Party.prototype.addActor = function(actorId) {
        const inc = !this._actors.includes(actorId);
        _Game_Party_addActor.apply(this, arguments);
        if (inc && this._actors.includes(actorId)) {
            if (this.inBattle()) {
                const actor = $gameActors.actor(actorId);
                if (this.supportActorMembers().includes(actor)) {
                    actor.onBattleStart();
                }
            }
        }
    };
  

    const _Window_BattleStatus_maxItems = Window_BattleStatus.prototype.maxItems;
    Window_BattleStatus.prototype.maxItems = function() {
        $gameTemp.omitSupportMember = true;
        return _Window_BattleStatus_maxItems.apply(this, arguments);
    };

    const _Window_BattleStatus_actor = Window_BattleStatus.prototype.actor;
    Window_BattleStatus.prototype.actor = function(index) {
        $gameTemp.omitSupportMember = true;
        return _Window_BattleStatus_actor.apply(this, arguments);
    };
    
    const _Window_BattleStatus_selectActor = Window_BattleStatus.prototype.selectActor;
    Window_BattleStatus.prototype.selectActor = function(actor) {
        $gameTemp.omitSupportMember = true;
        _Window_BattleStatus_selectActor.apply(this, arguments);
    };



    const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _Scene_Battle_createAllWindows.apply(this, arguments);
        this.createSupportActorWindow();
    };

    Scene_Battle.prototype.createSupportActorWindow = function() {

    };


    const _Spriteset_Battle_createActors = Spriteset_Battle.prototype.createActors;
    Spriteset_Battle.prototype.createActors = function() {
        _Spriteset_Battle_createActors.apply(this, arguments);
        if (SupportActorSV.length > 0 && $gameSystem.isSideView()) {
            for (let i = 0; i < $gameParty.maxSupportActor(); i++) {
                const sprite = new Sprite_Actor();
                this._actorSprites.push(sprite);
                this._battleField.addChild(sprite);
            }
            //this._battleField.children.sort(this.nuun_sortActor.bind(this));
        }
    };

    const _Spriteset_Battle_updateActors = Spriteset_Battle.prototype.updateActors;
    Spriteset_Battle.prototype.updateActors = function() {
        _Spriteset_Battle_updateActors.apply(this, arguments);
    };

    Spriteset_Battle.prototype.nuun_sortActor = function(a, b) {
        if (a.onSupportActor && b.onSupportActor) {
            if (a.y !== b.y) {
                return a.y - b.y;
            }
        }
    };


    const _Sprite_Actor_initialize = Sprite_Actor.prototype.initialize;
    Sprite_Actor.prototype.initialize = function(battler) {
        _Sprite_Actor_initialize.call(this, battler);
        this.onSupportActor = true;
        this._sIndex = -1;
    };

    const _Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome;
    Sprite_Actor.prototype.setActorHome = function(index) {
        this._sIndex = -1;
        if (this._actor && this._actor.getSupportActor()) {
            index = this._actor.supportActorindex();
            if (!SupportActorSV[index]) {
                return;
            }
            this._sIndex = index;
        }
        _Sprite_Actor_setActorHome.apply(this, arguments);
    };

    const _Sprite_Actor_setHome = Sprite_Actor.prototype.setHome;
    Sprite_Actor.prototype.setHome = function(x, y) {
        if (this._actor && this._actor.getSupportActor() && this._sIndex >= 0) {
            x += SupportActorSV[this._sIndex].SupportActorSV_X;
            y += SupportActorSV[this._sIndex].SupportActorSV_Y;
        }
        _Sprite_Actor_setHome.apply(this, arguments);
    };

})();