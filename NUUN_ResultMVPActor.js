/*:-----------------------------------------------------------------------------------
 * NUUN_ResultMVPActor.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc MVPアクター
 * @author NUUN
 * @base NUUN_Result
 * @orderAfter NUUN_Result
 * @version 1.0.0
 * 
 * @help
 * 勝利後に表示されるリザルトにこの戦闘でのMVPアクターを表示します。
 * MVPアクターは与ダメージが一番高いアクターが選ばれます。
 * アクター毎に勝利ME、勝利BGMを指定する場合は、リザルトプラグインの表示アクター設定または立ち絵表示EX用画像設定
 * から勝利時ME、勝利時BGMから設定します。
 * 
 * このプラグインはリザルト(NUUN_Result)Ver.2.0.3以降の拡張プラグインです。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/9/11 Ver.1.0.0
 * 初版。
 * 
 * @param MVPVisibleSwitch
 * @text MVP表示スイッチID
 * @desc MVPを表示するスイッチID。0で常に表示します。
 * @type switch
 * @default 0
 * 
 */


var Imported = Imported || {};
Imported.NUUN_ResultMVPActor = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_ResultMVPActor');
    const MVPVisibleSwitch = Number(parameters['MVPVisibleSwitch'] || 0);
    
    const _Game_Action_executeHpDamage = Game_Action.prototype.executeHpDamage;
    Game_Action.prototype.executeHpDamage = function(target, value) {
        _Game_Action_executeHpDamage.call(this, target, value);
        this.subject().nuun_SetTotalDamege(value);
    };
    
    Game_BattlerBase.prototype.nuun_clearTotalDamege = function() {
        this._resultTotalDamege = 0;
    };

    Game_BattlerBase.prototype.nuun_SetTotalDamege = function(value) {
        this._resultTotalDamege += value;
    };

    Game_BattlerBase.prototype.nuun_GetTotalDamege = function() {
        return this._resultTotalDamege;
    };

    const _Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
    Game_Battler.prototype.onBattleStart = function(advantageous) {
        _Game_Battler_onBattleStart.call(this, advantageous);
        this.nuun_clearTotalDamege();
    };

    Game_Party.prototype.getMvpActor = function() {
        let mvpActor = null;
        for (const member of this.resultMembers()) {
            if(mvpActor && mvpActor.nuun_GetTotalDamege() < member.nuun_GetTotalDamege()) {
                mvpActor = member;
            } else if (!mvpActor && member.nuun_GetTotalDamege() > 0) {
                mvpActor = member;
            }
        }
        return mvpActor;
    };


    const _Scene_Battle_resultRefresh = Scene_Battle.prototype.resultRefresh;
    Scene_Battle.prototype.resultRefresh = function() {
        _Scene_Battle_resultRefresh.call(this);
        this._resultWindow.mvpActorRefresh();
    };


    const _Window_StatusBase_initialize = Window_StatusBase.prototype.initialize;
    Window_StatusBase.prototype.initialize = function(rect) {
        _Window_StatusBase_initialize.call(this, rect);
        const className = String(this.constructor.name);
        if (className === 'Window_Result') {
            this.setResultBaseActorSprite();
        }
    };

    Window_StatusBase.prototype.mvpActorRefresh = function() {
        if (MVPVisibleSwitch === 0 || MVPVisibleSwitch > 0 && $gameSwitches.value(MVPVisibleSwitch)) {
            const actor = $gameParty.getMvpActor();
            this.resultRefresh(actor);
        }
    };


    BattleManager.resultMVPActorMe = function() {
        if (MVPVisibleSwitch === 0 || MVPVisibleSwitch > 0 && $gameSwitches.value(MVPVisibleSwitch)) {
            const actor = $gameParty.getMvpActor();
            let victoryMe = null;
            if (actor) {
                const data = actor.getResultActorData();
                victoryMe = data && data.MVPActorVictoryMe ? data.MVPActorVictoryMe : null;
            }
            return victoryMe;
        }
        return null;
    };

    BattleManager.resultMVPActorBgm = function() {
        if (MVPVisibleSwitch === 0 || MVPVisibleSwitch > 0 && $gameSwitches.value(MVPVisibleSwitch)) {
            const actor = $gameParty.getMvpActor();
            let victoryBgm = null;
            if (actor) {
                const data = actor.getResultActorData();
                victoryBgm = data && data.MVPActorVictoryBGM ? data.MVPActorVictoryBGM : null;
            }
            return victoryBgm;
        }
        return null;
    };


})();