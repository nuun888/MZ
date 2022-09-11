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
 * @version 1.1.0
 * 
 * @help
 * 勝利後に表示されるリザルトにこの戦闘でのMVPアクターを表示します。
 * MVPアクターは与ダメージが一番高いアクターが選ばれます。
 * アクター毎に勝利ME、勝利BGMを指定する場合は、リザルトプラグインの表示アクター設定または立ち絵表示EX用画像設定
 * から勝利時ME、勝利時BGMから設定します。
 * バトルボイス再生機能は別途BattleVoiceMZ(神無月サスケ氏)が必要となります。
 * 
 * ※アクター画像を設定しなくてもSE,BGM,バトルボイスを再生できます。
 * 
 * このプラグインはリザルト(NUUN_Result)Ver.2.0.3以降の拡張プラグインです。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/9/11 Ver.1.1.0
 * BattleVoiceMZによるMVPアクターのみボイスを再生する機能を追加。(要BattleVoiceMZ)
 * 2022/9/11 Ver.1.0.1
 * リザルトプラグイン修正による処理修正。
 * 2022/9/11 Ver.1.0.0
 * 初版。
 * 
 * @param MVPVisibleSwitch
 * @text MVP表示スイッチID
 * @desc MVPを表示するスイッチID。0で常に表示します。
 * @type switch
 * @default 0
 * 
 * @param ExternalPluginSetting
 * @text 外部プラグイン設定
 * @default ------------------------------
 * 
 * @param OnMVPBattleVoice
 * @text MVPアクターボイス再生(要BattleVoiceMZ)
 * @desc BattleVoiceMZでの戦闘処理時のボイス再生をMVPアクターのみ再生するようにします。
 * @type boolean
 * @default true
 * @parent ExternalPluginSetting
 * 
 */


var Imported = Imported || {};
Imported.NUUN_ResultMVPActor = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_ResultMVPActor');
    const MVPVisibleSwitch = Number(parameters['MVPVisibleSwitch'] || 0);
    const OnMVPBattleVoice = eval(parameters['OnMVPBattleVoice'] || 'true');
    const battleVoiceParameters = PluginManager.parameters('BattleVoiceMZ');
    const battleVoiceParam = !!battleVoiceParameters["Battle Voice Name at Option"];
    const playSwitchId = battleVoiceParam ? Number(battleVoiceParameters['ON switch ID'] || 1) : 0;
    const pitch = battleVoiceParam ? Number(battleVoiceParameters['pitch'] || 100) : 100;
    const volume = battleVoiceParam ? Number(battleVoiceParameters['volume'] || 90) : 90;
    const pan = battleVoiceParam ? Number(battleVoiceParameters['pan'] || 0) : 0;
    let battleVoiceSwitch = false;
    
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

    function isMVPActor() {
        return MVPVisibleSwitch === 0 || (MVPVisibleSwitch > 0 && $gameSwitches.value(MVPVisibleSwitch));
    }

    function isMVPBattleVoice() {
        return isMVPActor() && OnMVPBattleVoice && battleVoiceParam && $gameSwitches.value(playSwitchId);
    }

    Window_StatusBase.prototype.mvpActorRefresh = function() {OnMVPBattleVoice
        if (isMVPActor()) {
            const actor = $gameParty.getMvpActor();
            this.resultRefresh(actor);
        }
    };

    const _BattleManager_resultUserData = BattleManager.resultUserData;
    BattleManager.resultUserData = function() {
        _BattleManager_resultUserData.call(this);
        if (isMVPBattleVoice()) {
            battleVoiceSwitch = $gameSwitches.value(playSwitchId);
            $gameSwitches.setValue(playSwitchId, false);
            this.resultMVPActorBatteleVoice();
        }
    };

    const _BattleManager_resultEndUserData = BattleManager.resultEndUserData;
    BattleManager.resultEndUserData = function() {
        _BattleManager_resultEndUserData.call(this);
        if (playSwitchId > 0) {
            $gameSwitches.setValue(playSwitchId, battleVoiceSwitch);
        }
    };

    BattleManager.resultMVPActorMe = function() {
        if (isMVPActor()) {
            const actor = $gameParty.getMvpActor();
            let victoryMe = null;
            if (actor) {
                const data = actor.getResultActor();
                victoryMe = data && data.MVPActorVictoryMe ? data.MVPActorVictoryMe : null;
            }
            return victoryMe;
        }
        return null;
    };

    BattleManager.resultMVPActorBgm = function() {
        if (isMVPActor()) {
            const actor = $gameParty.getMvpActor();
            let victoryBgm = null;
            if (actor) {
                const data = actor.getResultActor();
                victoryBgm = data && data.MVPActorVictoryBGM ? data.MVPActorVictoryBGM : null;
            }
            return victoryBgm;
        }
        return null;
    };

    BattleManager.resultMVPActorBatteleVoice = function() {//以下は神無月サスケ氏から
        const actor = $gameParty.getMvpActor();
        if (actor.actor().meta.victoryVoice || (actor.battleVoices && actor.battleVoices.victory)) {
            const data = (actor.battleVoices ? actor.battleVoices.victory : null) || actor.actor().meta.victoryVoice;
            if (data) {
                const names = data.split(',');
                const name = names[Math.randomInt(names.length)];
                if (name && name !== "$") {
                    const audio = {name:name, pitch:pitch, volume:volume, pan:pan};
                    AudioManager.playSe(audio);
                }
            }
        }
    };

})();